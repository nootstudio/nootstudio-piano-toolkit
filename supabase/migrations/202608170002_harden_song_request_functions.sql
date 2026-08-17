alter function public.song_requests_set_updated_at()
  set search_path = pg_catalog, public;

alter function public.can_manage_song_requests()
  set search_path = pg_catalog, public;

revoke all on function public.song_requests_set_updated_at() from public, anon, authenticated;
revoke all on function public.can_manage_song_requests() from public, anon;
grant execute on function public.can_manage_song_requests() to authenticated;
