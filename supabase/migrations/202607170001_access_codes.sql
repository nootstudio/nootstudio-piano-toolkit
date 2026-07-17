create extension if not exists citext;

alter table public.profiles
  add column if not exists last_seen_at timestamptz;

update public.profiles
set role = 'admin'
where lower(email) = 'ruben@nootstudio.nl';

create table if not exists public.access_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  product_id uuid references public.products(id) on delete set null,
  max_uses integer,
  expires_at timestamptz not null,
  active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint access_codes_code_not_blank check (length(trim(code)) >= 3),
  constraint access_codes_max_uses_positive check (max_uses is null or max_uses > 0)
);

create table if not exists public.access_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  access_code_id uuid not null references public.access_codes(id) on delete cascade,
  email citext not null,
  user_id uuid references auth.users(id) on delete set null,
  entitlement_id uuid references public.entitlements(id) on delete set null,
  claimed_at timestamptz not null default now(),
  last_seen_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  unique (access_code_id, email)
);

create index if not exists access_code_redemptions_email_idx
  on public.access_code_redemptions (email);

create index if not exists access_code_redemptions_code_idx
  on public.access_code_redemptions (access_code_id);

create or replace function public.access_codes_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists access_codes_set_updated_at on public.access_codes;
create trigger access_codes_set_updated_at
before update on public.access_codes
for each row execute function public.access_codes_set_updated_at();

create or replace function public.touch_profile_last_seen()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_email citext;
begin
  if auth.uid() is null then
    return;
  end if;

  select email into current_email
  from public.profiles
  where user_id = auth.uid();

  update public.profiles
  set last_seen_at = now(),
      updated_at = now()
  where user_id = auth.uid();

  if current_email is not null then
    update public.access_code_redemptions
    set user_id = auth.uid(),
        last_seen_at = now()
    where lower(email::text) = lower(current_email::text)
      and (user_id is null or user_id = auth.uid());
  end if;
end;
$$;

grant execute on function public.touch_profile_last_seen() to authenticated;

alter table public.access_codes enable row level security;
alter table public.access_code_redemptions enable row level security;

drop policy if exists "Admins can manage access codes" on public.access_codes;
create policy "Admins can manage access codes"
on public.access_codes
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage access code redemptions" on public.access_code_redemptions;
create policy "Admins can manage access code redemptions"
on public.access_code_redemptions
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
