# The Caregiver Wellbeing Journey — Project Handover

*Compiled 21 July 2026 for a handover to ChatGPT / a new assistant. This is a
summary-of-record pulled from the live repo and its own docs — every claim
below was checked against the actual code, git history, or a live-tested
automation, not carried over from an older status note.*

---

## 1. What this project is

An 8-week self-directed digital wellbeing course for family caregivers of
people with rare diseases, monetised two ways: **$97 self-pay** or a
**$200 industry-sponsored seat** (pharma/med-device companies sponsor seats as
a measurable, direct-impact alternative to diffuse donations). Brand name:
**The Caregiver Wellbeing Journey**. Visual brand: **Sky & Tide** (soft
blue/teal, Newsreader serif + Hanken Grotesk sans).

Full business-model detail (personas, pricing rationale, sponsor packaging,
impact-report deliverable) lives in
[`../CAREGIVER-WELLBEING-JOURNEY-ARCHITECTURE.md`](../CAREGIVER-WELLBEING-JOURNEY-ARCHITECTURE.md)
— read this first if you need the "why", not just the "what."

---

## 2. Where everything lives

- **Repo:** `krispconsulting-eng/KrisPierce` on GitHub.
- **Default branch:** `claude/eloquent-curie-4jElo` — an auto-generated name
  that has stuck as the de facto `main`. All finished work merges here. **If
  you rename or replace it, also update `.github/workflows/deploy-pages.yml`**
  (its `branches:` trigger list hardcodes this name).
- **Project folder:** everything below is under `caregiver-wellness-course/`
  in the repo root (the repo also hosts unrelated projects — SCN2A, other
  Kris Pierce Consulting work — this course is self-contained in its own
  folder).

```
caregiver-wellness-course/
├── app/            React 19 + Vite app — the actual 64-question assessment
│                   + 8-week plan a caregiver uses
├── website/        Static, zero-build marketing site (landing, sponsor
│                   pitch, scholarship application, supporters page).
│                   Links to the built app at website/app/.
├── framework/      The written 8-week curriculum content (evidence +
│                   reflection + tiny-steps action, per week)
├── design/         Design-handoff reference bundles (not live code)
├── README.md, STATUS.md, STACK-AND-CONNECTIONS.md, COURSE-CONTENT-OUTLINE.md
└── HANDOVER.md     this file
```

- **Live site:** `https://krispconsulting-eng.github.io/KrisPierce/` —
  GitHub Pages, auto-deploys via `.github/workflows/deploy-pages.yml` on
  every push to the default branch that touches `website/**` or `app/**`.
  Confirmed working in a real browser (desktop + mobile), most recently
  redeployed successfully on 21 July 2026.

---

## 3. What's actually live right now

- **The marketing website** — homepage, sponsor pitch (`sponsors.html`),
  scholarship application (`apply.html`), public supporters page
  (`supporters.html`, currently empty pending the first completed sponsor
  seat), and a privacy statement (`privacy.html`).
- **The Wellbeing Journey app** (`app/`, built into `website/app/`): a
  64-question reflection across 8 wellbeing dimensions (Social, Occupational,
  Environmental, Intellectual, Spiritual, Emotional, Physical, Financial).
  Results are shown as **words, not scores** (Nourished / Cared For / Steady
  / Stretched Thin) — deliberately not framed as a test. Animated results
  wheel. An 8-week self-directed plan (3 small steps/week, mood check-ins,
  points/streaks/badges). A week-8 look-back with a before/after comparison,
  also in words. Fully self-directed — no cohorts, no partner/buddy feature.
  Phone-preferred (PWA manifest + icons, installable to a home screen).
- **Privacy model:** everything lives in the browser's local storage by
  default; nothing is sent anywhere unless the caregiver explicitly adds an
  email at sign-up (opt-in, off by default, format-validated).
- **The written curriculum**: all 8 weeks exist in full in
  `framework/weeks/WEEK-01.md` through `WEEK-08.md` (~1,400–1,900 words
  each), following the brief in `framework/CAREGIVER-WELLBEING-FRAMEWORK.md`
  (30% evidence / 50% reflection / 20% action) and
  `framework/TINY-STEPS-METHODOLOGY.md`. *(Note: `STATUS.md`, last touched
  6 July, says weeks 2–8 are unwritten — that's now stale. They were written
  in a later commit, `2c07729`, "Course activation: privacy statement, weeks
  2-8 content, evidence-safe marketing copy." Trust this handover doc and the
  files themselves over `STATUS.md` on that point.)*
- **The visual brand** across the whole site and app is **Sky & Tide**
  (merged 4 July 2026, commit `5d4a069`) — this is what's actually live
  today, not the placeholder colours described in older docs.

---

## 4. What's built but NOT live — the two things to watch

### 4.1 The automation stack (n8n + Notion) — built, blocked on one manual step

Four n8n workflows exist against the live n8n instance
(`scn2a-krispierce.app.n8n.cloud`), all live-tested (real executions, live
Notion schema fetches), all currently blocked by the same issue:

| Workflow | Does | Status |
|---|---|---|
| Website Form Intake | Routes waitlist/sponsor/scholarship form POSTs into Notion | **Active**, but every Notion write 404s |
| App Events | Consent-first enrolment + wheel-result sync from the app | **Published**, same blocker |
| Weekly Check-in Email | Monday email per caregiver, timed off their own Enrolled Date | Built, inactive |
| Week 8 Reassessment Invite | Invites caregivers at week 8 to look back | Built, inactive |
| Sponsor Impact Report | Monthly per-sponsor rollup of anonymised wheel deltas | Built, inactive |

**The blocker, for all four:** every Notion write fails with `404 — Could
not find database with ID: ... Make sure the relevant pages and databases
are shared with your integration "n8n"`. **The fix (one step, ~30 seconds,
only the account owner can do it):** in Notion, open **🌿 The Caregiver
Wellbeing Journey** → **⋯ → Connections → add "n8n"**. All four databases
live under that one page, so this single share unblocks every workflow at
once.

Once that's done, the three email workflows still need a Gmail/SMTP
credential added in n8n and attached to their send nodes, then all three
toggled Active. Full webhook URLs, Notion database IDs, and the exact
end-to-end architecture are in
[`STACK-AND-CONNECTIONS.md`](STACK-AND-CONNECTIONS.md) — that doc is the
source of truth for the automation layer, last live-tested 6 July 2026.

### 4.2 The Aurora Glow Wellness Wheel redesign — deliberately unpublished preview

Merged into the default branch 21 July 2026 (PR #21, commit `58bfc0c`), but
**intentionally not wired into the live site**:

- New, isolated files: `website/assets/wellness-wheel-aurora.css`,
  `website/assets/wellness-wheel-aurora.js`, and `website/wheel-preview.html`
  (titled *"Wheel Redesign Preview (Aurora Glow) — not yet live"*, tagged
  `noindex, nofollow`, not linked from anywhere on the live site).
- Recolours the 8 wedges to an indigo/violet/cyan sweep, adds glass-style
  wedge borders and a glow on the active wedge, smoother spin easing.
- The real Wellness Wheel component the app actually uses
  (`app/src/components.jsx` and friends) was **not touched** — this exists
  only as a standalone static-HTML preview, separate from the React app.
- **Known issue, not yet fixed:** in review, the wedge colours read as too
  low-contrast against the dark indigo/teal background — hard to tell the 8
  segments apart at a glance, which undercuts the stated goal of the
  redesign. Worth a pass on contrast/opacity before anyone signs off on it.
- Per the PR description, swapping it into the live homepage once approved
  is small: two stylesheet/script tags and the wheel markup in `index.html`.

The **hero section polish** from that same PR (soft aurora backdrop, an
optional caregiving-illustration layer, floating animation on the hero
wheel graphic) **is live** — it was wired directly into `index.html`.

### 4.3 Sky & Tide design bundle — reference only, already applied

`design/sky-and-tide/` is a design-handoff package (tokens, type scale,
component specs, a detailed Wellness Wheel SVG geometry spec) that was used
as the source of truth for the July 4 rebrand. It's kept in the repo as a
reference/spec, not as code to run — the actual brand is already live across
the app and site. No action needed here unless extending the brand further.

---

## 5. Technical architecture, in brief

- **App:** React 19 + Vite 8 (`app/`), builds via `npm ci && npm run build`
  into `website/app/`. No test suite; lint via `oxlint`. State persists to
  `localStorage` by default (survives reload, no account). Optional Supabase
  cloud sync exists as dormant code (`app/src/supabaseClient.js`,
  `app/.env.example`, `app/supabase/schema.sql`) — **deliberately not
  connected for the pilot**; revisit only if cross-device sync becomes a
  real need.
- **Website:** zero-build static HTML/CSS/vanilla JS (`website/`). Forms
  POST JSON to the n8n intake webhook (`assets/site.js`).
- **Deploy:** GitHub Actions (`.github/workflows/deploy-pages.yml`) builds
  the app and publishes `website/` to GitHub Pages on every push to the
  default branch touching `website/**` or `app/**`. Pages is enabled and
  confirmed working. Note in the workflow file: on a free GitHub plan, Pages
  requires the repo to be public; if it must go private, point Cloudflare
  Pages or Netlify at the same folder instead.
- **CRM/automation:** Notion (4 databases: Participants, Sponsors,
  Enrollments, Wheel Submissions) + n8n (4 workflows, see §4.1). Full map,
  database IDs, and webhook URLs in `STACK-AND-CONNECTIONS.md`.

---

## 6. Git / repo hygiene notes for whoever picks this up

- Nothing is sitting uncommitted anywhere as of this handover — working tree
  clean, default branch matches origin exactly.
- **Do not rebuild on top of merged PRs.** Branch fresh off
  `claude/eloquent-curie-4jElo` for new work; PR #11, #16, #20, #21 are all
  finished and merged.
- The default branch's odd auto-generated name (`claude/eloquent-curie-4jElo`
  instead of `main`) is a known quirk, not a mistake — just be aware any
  tooling (like the Pages workflow) that hardcodes it will need updating if
  it's ever renamed.

---

## 7. The honest punch list (what's actually left)

1. **Share the Notion workspace page with the n8n integration** — single
   highest-leverage step, unblocks all four automations at once (§4.1).
2. **Add a Gmail/SMTP credential in n8n**, attach it to the three email
   workflows' send nodes, toggle them active.
3. **Decide on the Aurora Glow wheel redesign** — fix the wedge-contrast
   issue, then either wire it into `index.html` for real or shelve it.
4. **Re-source the marketing site's caregiver statistics** to Australian
   evidence (ABS, AIHW, Carer Wellbeing Survey) — currently cites
   2015/2020 US-sourced figures. Ties into the framework's own `[VERIFY]`
   items in `framework/weeks/WEEK-01.md`.
5. Everything else (app, 8-week content, site, deploy pipeline) is built,
   live-tested, and live.
