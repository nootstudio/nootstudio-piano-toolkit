# Shopify + Supabase setup voor Nootstudio Akkoorden

Deze setup maakt van de huidige statische app een betaalde app met:

- Supabase Auth voor individuele accounts.
- Supabase PostgreSQL voor liedjes, favorieten, producten en entitlements.
- Shopify als betaalbron voor 1 product.
- Netlify Function voor veilige Shopify webhookverwerking.

## 1. Supabase database

Voer de migratie uit:

```text
supabase/migrations/202607130001_commerce_auth_entitlements.sql
```

Als je nog geen Supabase CLI gebruikt, kun je de inhoud van dit bestand in de Supabase SQL editor uitvoeren.

De migratie maakt onder andere:

- `profiles`
- `products`
- `entitlements`
- `songs`
- `favorites`
- `shopify_webhook_events`
- `shopify_orders`

Alle relevante tabellen hebben Row Level Security aan.

## 2. Admin-account

Maak of bevestig eerst een Supabase Auth account met:

```text
ruben@nootstudio.nl
```

Zet daarna dit account op admin:

```sql
update public.profiles
set role = 'admin'
where lower(email::text) = 'ruben@nootstudio.nl';
```

Alleen admin-gebruikers mogen straks liedjes beheren.

## 3. Netlify environment variables

Zet deze waarden in Netlify bij het project:

```text
SUPABASE_URL=https://jouw-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
SHOPIFY_WEBHOOK_SECRET=...
SHOPIFY_PRODUCT_ID=...
```

Belangrijk:

- `SUPABASE_SERVICE_ROLE_KEY` mag nooit in `app-config.js` of andere frontend-bestanden.
- `SHOPIFY_WEBHOOK_SECRET` mag alleen server-side in Netlify staan.
- `SHOPIFY_PRODUCT_ID` is het Shopify product dat levenslange toegang geeft.

Frontend/public configuratie blijft beperkt tot:

```js
window.NOOTSTUDIO_CONFIG = {
  supabaseUrl: "...",
  supabaseAnonKey: "...",
  songsTable: "songs",
  favoritesTable: "favorites",
  mediaBucket: "song-media"
};
```

## 4. Shopify webhook

Maak in Shopify een webhook aan:

- Event/topic: `orders/paid`
- URL:

```text
https://jouw-netlify-site.netlify.app/.netlify/functions/shopify-webhook
```

De Netlify Function:

- verifieert Shopify HMAC op de raw request body;
- verwerkt alleen `orders/paid`;
- is idempotent via `shopify_webhook_events.shopify_webhook_id`;
- maakt of hergebruikt het product;
- maakt een levenslange entitlement aan;
- koppelt de entitlement aan een bestaand Supabase account als het e-mailadres al bestaat;
- laat de entitlement pending op e-mailadres als het account later wordt aangemaakt.

## 5. Volgende implementatiefase

De huidige frontend gebruikt nog niet actief Supabase Auth en entitlement-gating. De volgende fase is:

1. Login/logout UI toevoegen.
2. Supabase Auth client toevoegen.
3. Entitlement claimen na login via `claim_entitlements_for_current_user()`.
4. App pas tonen als `has_active_entitlement()` true is.
5. Admin-only UI maken voor liedjes toevoegen/verwijderen.
6. Oude `student_code` favorieten vervangen door user-based `favorites`.

