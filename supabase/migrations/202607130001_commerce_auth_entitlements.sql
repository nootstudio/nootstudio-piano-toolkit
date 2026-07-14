create extension if not exists pgcrypto;
create extension if not exists citext;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email citext not null unique,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do update
    set email = excluded.email,
        updated_at = now();

  update public.entitlements
  set user_id = new.id,
      updated_at = now()
  where user_id is null
    and lower(customer_email::text) = lower(new.email);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.current_user_email()
returns citext
language sql
stable
as $$
  select nullif(auth.jwt() ->> 'email', '')::citext;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shopify_product_id text unique,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  customer_email citext not null,
  source text not null default 'shopify',
  source_order_id text not null,
  source_line_item_id text,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, source_order_id, product_id)
);

create index if not exists entitlements_user_id_idx on public.entitlements(user_id);
create index if not exists entitlements_customer_email_idx on public.entitlements(customer_email);
create index if not exists entitlements_product_id_idx on public.entitlements(product_id);

drop trigger if exists entitlements_set_updated_at on public.entitlements;
create trigger entitlements_set_updated_at
before update on public.entitlements
for each row execute function public.set_updated_at();

create or replace function public.has_active_entitlement(target_product_id uuid default null)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.entitlements e
    join public.products p on p.id = e.product_id
    where p.active = true
      and e.revoked_at is null
      and (e.expires_at is null or e.expires_at > now())
      and (target_product_id is null or e.product_id = target_product_id)
      and (
        e.user_id = auth.uid()
        or (
          e.user_id is null
          and e.customer_email = public.current_user_email()
        )
      )
  );
$$;

create or replace function public.claim_entitlements_for_current_user()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed_count integer;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  update public.entitlements
  set user_id = auth.uid(),
      updated_at = now()
  where user_id is null
    and customer_email = public.current_user_email();

  get diagnostics claimed_count = row_count;
  return claimed_count;
end;
$$;

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  library_label text not null,
  song_key text not null,
  title text not null,
  artist text not null,
  data jsonb not null default '{}'::jsonb,
  visibility text not null default 'global' check (visibility in ('global', 'private')),
  owner_user_id uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (library_label, song_key)
);

alter table public.songs
  add column if not exists visibility text not null default 'global',
  add column if not exists owner_user_id uuid references auth.users(id) on delete set null,
  add column if not exists created_by uuid references auth.users(id) on delete set null,
  add column if not exists updated_by uuid references auth.users(id) on delete set null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'songs_visibility_check'
      and conrelid = 'public.songs'::regclass
  ) then
    alter table public.songs
      add constraint songs_visibility_check check (visibility in ('global', 'private'));
  end if;
end;
$$;

create index if not exists songs_library_label_idx on public.songs(library_label);
create index if not exists songs_title_artist_idx on public.songs(title, artist);

drop trigger if exists songs_set_updated_at on public.songs;
create trigger songs_set_updated_at
before update on public.songs
for each row execute function public.set_updated_at();

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  song_key text not null,
  title text not null default '',
  artist text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, song_key)
);

drop trigger if exists favorites_set_updated_at on public.favorites;
create trigger favorites_set_updated_at
before update on public.favorites
for each row execute function public.set_updated_at();

create table if not exists public.shopify_webhook_events (
  id uuid primary key default gen_random_uuid(),
  shopify_webhook_id text not null unique,
  topic text not null,
  shop_domain text,
  status text not null default 'received' check (status in ('received', 'processed', 'ignored', 'failed')),
  payload jsonb not null default '{}'::jsonb,
  error text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create table if not exists public.shopify_orders (
  id uuid primary key default gen_random_uuid(),
  shopify_order_id text not null unique,
  customer_email citext not null,
  product_id uuid references public.products(id) on delete set null,
  entitlement_id uuid references public.entitlements(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists shopify_orders_set_updated_at on public.shopify_orders;
create trigger shopify_orders_set_updated_at
before update on public.shopify_orders
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.entitlements enable row level security;
alter table public.songs enable row level security;
alter table public.favorites enable row level security;
alter table public.shopify_webhook_events enable row level security;
alter table public.shopify_orders enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (
  user_id = auth.uid()
  and role = (select role from public.profiles where user_id = auth.uid())
  or public.is_admin()
);

drop policy if exists "products_select_authenticated" on public.products;
create policy "products_select_authenticated"
on public.products for select
to authenticated
using (active = true or public.is_admin());

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "entitlements_select_own_or_admin" on public.entitlements;
create policy "entitlements_select_own_or_admin"
on public.entitlements for select
to authenticated
using (
  public.is_admin()
  or user_id = auth.uid()
  or (user_id is null and customer_email = public.current_user_email())
);

drop policy if exists "entitlements_admin_write" on public.entitlements;
create policy "entitlements_admin_write"
on public.entitlements for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "songs_select_entitled_or_admin" on public.songs;
create policy "songs_select_entitled_or_admin"
on public.songs for select
to authenticated
using (
  public.is_admin()
  or (visibility = 'global' and public.has_active_entitlement())
  or (visibility = 'private' and owner_user_id = auth.uid())
);

drop policy if exists "songs_admin_write" on public.songs;
create policy "songs_admin_write"
on public.songs for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own"
on public.favorites for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own"
on public.favorites for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "favorites_update_own" on public.favorites;
create policy "favorites_update_own"
on public.favorites for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
on public.favorites for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "shopify_webhook_events_admin_select" on public.shopify_webhook_events;
create policy "shopify_webhook_events_admin_select"
on public.shopify_webhook_events for select
to authenticated
using (public.is_admin());

drop policy if exists "shopify_orders_admin_select" on public.shopify_orders;
create policy "shopify_orders_admin_select"
on public.shopify_orders for select
to authenticated
using (public.is_admin());
