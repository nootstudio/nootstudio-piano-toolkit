# Centrale liedjesbibliotheek

De app kan centraal liedjes opslaan via Supabase. Zonder configuratie blijft alles lokaal werken.

## 1. Supabase project maken

1. Maak een nieuw project aan op Supabase.
2. Open de SQL editor.
3. Voer dit script uit:

```sql
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  library_label text not null,
  song_key text not null,
  title text not null,
  artist text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (library_label, song_key)
);

alter table public.songs enable row level security;

create policy "Iedereen mag liedjes lezen"
on public.songs for select
using (true);

create policy "Iedereen mag liedjes toevoegen"
on public.songs for insert
with check (true);

create policy "Iedereen mag liedjes aanpassen"
on public.songs for update
using (true)
with check (true);

create policy "Iedereen mag liedjes verwijderen"
on public.songs for delete
using (true);

create table if not exists public.student_favorites (
  id uuid primary key default gen_random_uuid(),
  student_code text not null,
  song_key text not null,
  title text not null default '',
  artist text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_code, song_key)
);

alter table public.student_favorites enable row level security;

create policy "Iedereen mag favorieten lezen"
on public.student_favorites for select
using (true);

create policy "Iedereen mag favorieten toevoegen"
on public.student_favorites for insert
with check (true);

create policy "Iedereen mag favorieten aanpassen"
on public.student_favorites for update
using (true)
with check (true);

create policy "Iedereen mag favorieten verwijderen"
on public.student_favorites for delete
using (true);
```

Dit is bewust eenvoudig voor de ontwikkelfase. Later kunnen we dit beveiligen met een admin-login.

## 2. Audio op eigen server

Je kunt mp3/m4a/wav-bestanden op je eigen server plaatsen en in de app bij `Audio-link` de directe URL plakken, bijvoorbeeld:

```text
https://jouwdomein.nl/audio/piano-man.mp3
```

De Nootstudio speler gebruikt die link direct. Zorg dat het echt een directe audiolink is, niet een downloadpagina.

Belangrijk: de audio-link maakt alleen het audiobestand bereikbaar. De liedkaart zelf moet nog steeds centraal opgeslagen worden via Supabase. Anders ziet alleen het apparaat waarop je het liedje toevoegt de nieuwe kaart.

## 3. App configureren

Vul in `app-config.js` je Supabase gegevens in:

```js
window.NOOTSTUDIO_CONFIG = {
  supabaseUrl: "https://jouw-project.supabase.co",
  supabaseAnonKey: "jouw-anon-key",
  songsTable: "songs",
  favoritesTable: "student_favorites",
  mediaBucket: "song-media"
};
```

Als je audio op je eigen server zet, hoef je de `mediaBucket` voorlopig niet te gebruiken.

Je weet dat de centrale bibliotheek actief is als de app na toevoegen meldt:

```text
... is online bijgewerkt
```

Als de app meldt `alleen op dit apparaat opgeslagen`, dan is `app-config.js` nog leeg of niet goed ingevuld.

## 4. Werking

- Een liedje toevoegen met bestaande titel + artiest werkt als update.
- Nieuwe liedjes verschijnen op alle apparaten zodra de centrale configuratie actief is.
- Audio via `Audio-link` werkt op desktop, tablet en telefoon.
- Leerlingen kunnen favorieten bewaren met een leerlingcode, bijvoorbeeld `emma2012`. De favorieten worden centraal opgeslagen in `student_favorites` en komen terug op andere apparaten met dezelfde code.
