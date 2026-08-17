create table if not exists public.song_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  student_name text,
  title text not null,
  artist text,
  notes text,
  status text not null default 'nieuw'
    check (status in ('nieuw', 'bekeken', 'in_behandeling', 'toegevoegd', 'afgewezen')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  handled_at timestamptz,
  handled_by uuid references auth.users(id) on delete set null
);

create or replace function public.song_requests_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists song_requests_set_updated_at on public.song_requests;
create trigger song_requests_set_updated_at
before update on public.song_requests
for each row execute function public.song_requests_set_updated_at();

create or replace function public.can_manage_song_requests()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.role = 'admin'
  );
$$;

grant execute on function public.can_manage_song_requests() to authenticated;

alter table public.song_requests enable row level security;

drop policy if exists "song_requests_select_own_or_admin" on public.song_requests;
create policy "song_requests_select_own_or_admin"
on public.song_requests
for select
to authenticated
using (auth.uid() = user_id or public.can_manage_song_requests());

drop policy if exists "song_requests_insert_own" on public.song_requests;
create policy "song_requests_insert_own"
on public.song_requests
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "song_requests_admin_update" on public.song_requests;
create policy "song_requests_admin_update"
on public.song_requests
for update
to authenticated
using (public.can_manage_song_requests())
with check (public.can_manage_song_requests());

drop policy if exists "song_requests_admin_delete" on public.song_requests;
create policy "song_requests_admin_delete"
on public.song_requests
for delete
to authenticated
using (public.can_manage_song_requests());

grant select, insert, update, delete on public.song_requests to authenticated;

create index if not exists song_requests_status_idx on public.song_requests(status);
create index if not exists song_requests_created_at_idx on public.song_requests(created_at desc);
create index if not exists song_requests_email_idx on public.song_requests(lower(email));
