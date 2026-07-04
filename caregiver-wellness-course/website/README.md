# Caregiver Wellness Course — Website

A standalone, zero-build marketing site. Open `index.html` directly in a browser, or serve the folder with any static file server, no npm install and no bundler required.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Main landing page for caregivers: hero, problem/reframe, 6-week overview, three ways to join, waitlist, FAQ |
| `sponsors.html` | Industry/partner pitch page: how sponsorship works, tiers, impact reporting, enquiry form |
| `apply.html` | Application for a no-cost sponsored/scholarship spot |
| `supporters.html` | Public acknowledgment page (honestly empty pre-launch, ready to populate after the first cohort) |
| `app/` | The built Wellness Wheel app (assessment → report → 6-week gamified plan) — see below |

## Design system

Full spec lives in `/DESIGN.md` and `/PRODUCT.md` at the repo root (written via the `impeccable` design skill). Short version: **"The Steady Hand"** — a grounded, quietly premium feel built from restraint and craft rather than loud color or decoration.

- **Colors:** Cedar green (primary) + warm clay (secondary, the sponsor/scholarship thread) + a reserved Antique Brass accent that appears *only* at genuine achievement moments in the Wellness Wheel (see the Earned Gold Rule in `DESIGN.md`). Warm Linen neutral background, one deliberate full-bleed dark "drenched" section per page for visual rhythm.
- **Type:** Literata (display, chosen over generic AI-default serifs like Lora/Fraunces/Playfair for its calmer, built-for-reading character) + Raleway (body).
- **Icons:** A hand-built inline SVG sprite (`assets/icons.svg`, ~28 icons, consistent stroke/weight), not emoji and not a stock icon package. Injected into every page by `assets/inject-icons.py` (see below) so the site stays a zero-build static site.
- **Motion:** Scroll-reveal via IntersectionObserver, with a safety-net timeout so content never gets stuck invisible for a full-page screenshot tool, print view, or a user who never scrolls (see `assets/site.js`).
- **Section rhythm:** Deliberately varied (feature-rows, borderless icon columns, a timeline, a card grid only where options are genuinely parallel) rather than repeating the same icon-card-grid template on every section.

No Tailwind CDN: hand-written CSS keeps the site fast and dependency-light, since a JIT-compiling CDN isn't meant for production.

### Updating the icon set

`assets/icons.svg` is the single source of truth. It's inlined into every HTML page (between `<!-- ICON_SPRITE:START -->` / `:END -->` markers) so pages work standalone over `file://` with no `fetch()` call. After editing `icons.svg`, re-run:

```bash
python3 assets/inject-icons.py
```

## The Wellness Wheel app

The Wellness Wheel is a real Vite + React 19 app, developed at `../app/` (its own `package.json`, source in `../app/src/`) and built into `app/` in this folder so the marketing site can link straight to it with no separate deploy target.

`../app/vite.config.js` sets `outDir: '../website/app'`, so:

```bash
cd ../app
npm install    # first time only
npm run build
```

...regenerates everything under `website/app/` from source. Don't hand-edit files inside `website/app/` — they're build output and will be overwritten.

**Persistence:** progress (assessment scores, points, badges, streaks, check-ins) is saved to the browser's local storage automatically, so a caregiver's plan survives a reload with no account needed. If a real Supabase project is connected (`../app/.env.example` documents `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, and `../app/supabase/schema.sql` has the table + RLS policy), the same data also syncs to their account. Local storage is always the fallback, so the app is fully functional with zero backend configured.

## Forms are front-end only

The waitlist, sponsor enquiry, and application forms all show a real success state on submit but don't send anywhere yet (see `assets/site.js`, marked with `TODO`). Wire them to the n8n webhooks described in `../../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md` §8 before launch.

## Verified

All 5 marketing pages, plus the built app at `app/`, were checked in a real browser (Playwright + Chromium): page load, console errors, mobile responsiveness (390px viewport, nav toggle), and the app's full click-through (landing → 64-question assessment → report → sign-up → gamified 6-week plan → badge unlock), including a page-reload test confirming progress survives via the local-storage fallback. Google Fonts requires normal internet access; it's expected to fail in network-restricted environments but degrades gracefully (system font fallback) rather than breaking the page.
