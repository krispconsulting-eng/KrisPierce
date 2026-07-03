# Caregiver Wellness Course — Website

A standalone, zero-build marketing site. Open `index.html` directly in a browser, or serve the folder with any static file server, no npm install and no bundler required.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Main landing page for caregivers: hero, problem/reframe, 6-week overview, three ways to join, waitlist, FAQ |
| `sponsors.html` | Industry/partner pitch page: how sponsorship works, tiers, impact reporting, enquiry form |
| `apply.html` | Application for a no-cost sponsored/scholarship spot |
| `supporters.html` | Public acknowledgment page (honestly empty pre-launch, ready to populate after the first cohort) |
| `assessment.html` | The live Wellness Wheel app (assessment → report → 6-week gamified plan) |

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

## The assessment page

`assessment.html` runs the Wellness Wheel as a classic, zero-build React setup: React 18 UMD + Babel standalone from a CDN, transforming `assets/wellness-wheel.browser.jsx` in the browser at load time.

`assets/wellness-wheel.browser.jsx` is a **generated adaptation** of `../wellness-wheel.jsx` (the canonical source), not a fork to edit separately. The only two changes:
- `import { useState, useEffect, useRef } from "react";` → `const { useState, useEffect, useRef } = React;`
- `export default function App()` → `function App()`

This is needed because classic `<script type="text/babel">` tags share one global scope and don't support ES module `import`/`export`; that's what lets the page run with no build step at all.

**If you edit `../wellness-wheel.jsx`, regenerate this file** with the same two substitutions:

```bash
python3 -c "
src = open('../wellness-wheel.jsx').read()
out = src.replace(
    'import { useState, useEffect, useRef } from \"react\";',
    'const { useState, useEffect, useRef } = React;'
).replace('export default function App()', 'function App()')
open('assets/wellness-wheel.browser.jsx', 'w').write(out)
"
```

**Before a real cohort launches:** replace the CDN/Babel-standalone setup with a proper Vite or CRA build (better load performance, and the auth/persistence work described in the architecture doc's §4.2 rebuild note needs a real bundler anyway).

## Forms are front-end only

The waitlist, sponsor enquiry, and application forms all show a real success state on submit but don't send anywhere yet (see `assets/site.js`, marked with `TODO`). Wire them to the n8n webhooks described in `../../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md` §8 before launch.

## Verified

All 5 pages were checked in a real browser (Playwright + Chromium) for: page load, console errors, mobile responsiveness (390px viewport, nav toggle), and the assessment app's full click-through (landing → assessment question). Google Fonts and the CDN React/Babel scripts require normal internet access; they're expected to fail in network-restricted environments but degrade gracefully (system font fallback) rather than breaking the page.
