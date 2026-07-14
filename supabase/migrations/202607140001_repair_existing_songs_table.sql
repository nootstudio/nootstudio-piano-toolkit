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
