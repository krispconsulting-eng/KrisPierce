# Wellness Wheel App

A Vite + React 19 build of the Wellness Wheel: a 64-question assessment across 8 wellbeing dimensions, a personalised report, and a gamified 6-week plan (points, streaks, 12 badges, weekly check-ins, an accountability-partner invite, and a before/after reassessment), built for family caregivers of someone with a rare disease.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`vite.config.js` outputs straight into `../website/app` — the marketing site (a plain static folder with no server of its own) links to `app/` and serves this build directly, so there's no separate deploy target to manage.

## Source layout

- `src/data.js` — the 8 dimensions, 64 assessment questions, 6-week activity plan, bonus challenges, badges, and level thresholds
- `src/icons.jsx` — the hand-drawn line-icon set (shared visually with the marketing site's icon sprite)
- `src/components.jsx` — `WellnessWheelSVG`, `ProgressRing`, `BadgeMedallion`, `BadgeModal`
- `src/screens.jsx` — `Landing`, `Assessment`, `Report`, `SignUp`, `GamifiedPlan`, `WeeklyCheckIn`
- `src/App.jsx` — stage routing (landing → assessment → report → sign-up → plan) + persistence hydration
- `src/persistence.js` / `src/supabaseClient.js` — dual-adapter save/load (see below)

## Persistence: local storage, with optional real accounts

By default the app saves all progress (scores, points, badges, streaks, check-ins) to the browser's local storage — no account needed, works fully offline, survives a reload.

To add real accounts and cross-device sync:

1. Create a Supabase project and run `supabase/schema.sql` against it (a `wellness_state` table with row-level security so each caregiver only ever sees their own data).
2. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
3. Rebuild. `src/supabaseClient.js` picks up the env vars automatically; `src/persistence.js` then reads/writes Supabase for a signed-in user in addition to local storage, and falls back to local storage alone whenever no user is signed in or Supabase isn't configured.

No auth UI is wired up yet (`persistence.js` exports `signInWithMagicLink`/`signOut`/`getCurrentUser` ready to use) — today the app is fully functional and self-contained without one.
