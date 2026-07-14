# Piano Akkoorden online zetten

Aanbevolen URL:

- `akkoorden.nootstudio.nl`

Andere goede opties:

- `piano.nootstudio.nl`
- `app.nootstudio.nl`
- `leerlingen.nootstudio.nl`

## Snelste route

Gebruik Netlify, Cloudflare Pages of Vercel en publiceer deze map:

`outputs/piano-akkoorden-app`

Als je vanuit de hoofdmap publiceert, staat er alvast een `netlify.toml` klaar die Netlify naar de juiste map wijst.

## Wat ik nodig heb om dit echt online te zetten

1. Een hostingaccount, bijvoorbeeld Netlify of Cloudflare Pages.
2. Toegang tot de domeinnaam/DNS van `nootstudio.nl`.
3. De gewenste URL, bijvoorbeeld `akkoorden.nootstudio.nl`.

Stuur geen wachtwoorden. Beter is:

- nodig mij uit als beheerder/collaborator in Netlify, GitHub of Cloudflare, of
- log zelf in en laat mij stap voor stap meekijken wat je moet klikken.

## Belangrijk voor liedjes en audio

De huidige app werkt lokaal goed, maar zelf toegevoegde mp3's worden nu opgeslagen in de browser van dat apparaat. Een mp3 die op de iMac is toegevoegd, verschijnt dus niet automatisch op iPhone of iPad.

Voor een echte leerlingversie moeten liedjes, MusicXML en audio uiteindelijk centraal opgeslagen worden:

- simpel: bestanden in de app-map en `songs.json` bijwerken;
- professioneel: database + opslag, bijvoorbeeld Supabase of Cloudflare D1/R2.

Deze versie ondersteunt Supabase als centrale liedjesbibliotheek. Zie:

`CENTRALE_BIBLIOTHEEK.md`

Audio kan ook op je eigen server staan. Plak dan bij een liedje de directe mp3/m4a/wav-link in het veld `Audio-link`.
