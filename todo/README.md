# Kris Pierce Command Centre (to-do app)

A private, PIN-locked to-do dashboard for Kris, deployed on Vercel and styled
with the krispierce.com.au brand (Archivo + Space Grotesk, zinc neutrals,
electric-blue accent).

## What it does

- **Dashboard** (`/`) — traffic-light board (🔴 Do now / 🟡 This week /
  🟢 On track), quick-add bar, and all projects grouped by stream
  (SCN2A Australia, KrisPierce Consulting, UNSW, Committees, Rare
  Intelligence, Caregiver, Personal).
- **Today** (`/today`) — a sticky-note view of exactly what matters today:
  urgent items, this week, meetings.
- **Caregiver** (`/caregiver`) — dedicated page for The Caregiver Wellbeing
  Journey: live links, activation checklist, business model, build status.
- **Login** (`/login`) — 6-digit PIN; sets a signed httpOnly cookie for
  180 days. Everything (pages and API) is locked behind it except
  `/api/health`, which returns only a row count.

## Where the data lives

Tasks are stored in an **n8n Data Table** (`kp_tasks`) in Kris's n8n cloud
instance, accessed through the published **KP To-Do API** webhook workflow
(action: list / create / update / delete, guarded by an API key). The app's
server-side code (`lib/store.js`) is the only thing that talks to it — the
key never reaches the browser.

The daily 6am scan (Claude routine) writes newly triaged email/calendar items
into the same table, so the app, the sticky email, and the routine all share
one database.

## Configuration

No secrets are committed. `lib/config.js` resolves, in order:

1. Environment variables — `KP_PIN`, `KP_COOKIE_SECRET`, `KP_N8N_WEBHOOK_URL`,
   `KP_N8N_API_KEY` (set them in Vercel → Project → Settings → Environment
   Variables), then
2. `lib/secrets.local.js` — an untracked file (see `todo/.gitignore`); copy
   `lib/secrets.example.js` and fill it in.

If neither is present the app fails closed: login is disabled and no data
is served. Rotate a secret by changing it in either place and redeploying
(the n8n API key must also be updated inside the "KP To-Do API" workflow).

## Development

```bash
cd todo
npm install
npm run dev
```

Deployed via Vercel with the root `vercel.json` (`@vercel/next` build of
`todo/package.json`).
