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

Colors, type, and spacing are defined once in `assets/styles.css` as CSS custom properties, chosen via the repo's `ui-ux-pro-max` skill for a warm, wellbeing-oriented, non-clinical feel: sage green + terracotta on a cream background, Lora (headings) + Raleway (body). The palette deliberately matches `../wellness-wheel.jsx` so the marketing site and the in-course tool feel like one product. Includes a `prefers-color-scheme: dark` variant and meets WCAG AA contrast on all text/background pairs used.

No Tailwind CDN: hand-written CSS keeps the site fast and dependency-light, since a JIT-compiling CDN isn't meant for production.

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
