insert into public.profiles (user_id, email, role, updated_at)
select id, email, 'admin', now()
from auth.users
where lower(email::text) = lower('ruben@nootstudio.nl')
on conflict (user_id) do update
set email = excluded.email,
    role = 'admin',
    updated_at = now();
