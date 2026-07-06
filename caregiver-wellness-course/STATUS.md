# Caregiver Wellness Course — Where We're At

*Last updated: 6 July 2026, branch `claude/caregiver-wellness-course-arch-vqurrm`.*

A snapshot for picking this back up: what's built, what's live-tested, what's
still blocked, and the short list of things only you can do.

---

## 1. The app

**Wellness Wheel** — a Vite + React 19 app at `app/`, built into `website/app/`.

- 64-question reflection across 8 wellbeing dimensions (Social, Occupational,
  Environmental, Intellectual, Spiritual, Emotional, Physical, Financial).
- Results are shown as **words, not percentages** (Nourished / Cared For /
  Steady / Stretched Thin) — deliberately not a test, not a score.
- The report wheel **animates**: wedges fill to their level with a staggered,
  eased motion (respects `prefers-reduced-motion`); colours match the domains.
- An **8-week self-directed plan**: 3 small steps a week, weekly mood
  check-ins, optional extras, points/levels/badges (11, "Better Together" /
  accountability-partner badge removed along with the feature itself).
- A **week-8 look-back**: same reflection, before/after comparison shown in
  words with gentle movement phrases, not percentage deltas.
- **Fully self-directed**: no cohorts, no partner-invite feature, done
  individually on phone or computer, phone-preferred (PWA manifest + icons,
  installable to a home screen).
- **Private by default**: everything lives in local storage; nothing is sent
  anywhere unless the caregiver explicitly adds an email on sign-up.
- Voice pass applied throughout: Australian English, no em dashes, no
  motivational/productivity clichés, validating rather than clinical tone.

## 2. The consent-first CRM bridge (new this round)

On the sign-up screen, the email field is optional and off by default:

- **Blank → nothing leaves the device**, exactly as before.
- **Filled in (format-validated)** → the app calls a new n8n webhook, **App
  Events** (published, `onnVc7WnOSEokgmP`), which:
  - creates the caregiver's Notion Participant + an Enrollment with today as
    the Enrolled Date (this is what the weekly email automation reads), and
    a Week 1 Baseline wheel submission;
  - at the week-8 look-back, records the Week 8 submission and marks the
    Enrollment Completed (this is what the sponsor impact report aggregates).
- The consent copy is explicit about what's actually shared (name, email,
  and wellbeing results — not just "check-in emails"), and says plainly that
  there's no unsubscribe link yet (email the course inbox instead).
- If the first send fails (offline, or the pending Notion-share step below),
  the opt-in is **kept and retried automatically** next time the caregiver
  opens the app — not silently dropped.

## 3. The marketing website + forms

Static site at `website/`: landing, sponsor pitch, scholarship application,
public supporters page, all linking to the built app.

- Waitlist / sponsor / scholarship forms POST to an n8n webhook ("Website
  Form Intake", **active**) that routes to the matching Notion database.
- A **GitHub Actions deploy workflow** (`.github/workflows/deploy-pages.yml`)
  now builds the app and publishes `website/` to GitHub Pages on push —
  not yet turned on (see §5).

## 4. The automation stack (n8n + Notion)

Four n8n workflows exist, all **built and either published or ready to
activate**, all currently blocked on one shared step:

| Workflow | What it does | Status |
|---|---|---|
| Website Form Intake | Routes form submissions into Notion | **Active**, but Notion writes 404 (see §5) |
| App Events | Consent-first enrolment + wheel-result sync from the app | **Published**, same blocker |
| Weekly Check-in Email | Monday email to each active caregiver, timed off their own Enrolled Date | Built, inactive (needs Notion share + email credential) |
| Week 8 Reassessment Invite | Invites caregivers who've reached week 8 to look back | Built, inactive, same needs |
| Sponsor Impact Report | Monthly per-sponsor rollup of anonymised wheel deltas | Built, inactive, same needs |

**Everything here was live-tested against the real n8n instance and Notion
workspace**, not just read from code — including firing real executions and
fetching live database schemas. See `STACK-AND-CONNECTIONS.md` for the full,
tested map (webhook URLs, database IDs, exact error messages).

## 5. The one real blocker

Every Notion write across all four workflows fails with:

> *404 — Could not find database with ID: ... Make sure the relevant pages
> and databases are shared with your integration "n8n".*

**The fix is one step, about 30 seconds, and only you can do it:**
Notion → open **🌿 Caregiver Wellness Course** → **⋯ → Connections → add
"n8n"**. All four databases live under that page, so this single share
unblocks every workflow at once.

## 6. What's left for you (the activation checklist)

1. **Share the Notion page with the n8n integration** (§5) — unblocks forms,
   the app's opt-in bridge, and every scheduled email.
2. **Add a Gmail (or SMTP) credential in n8n** and attach it to the three
   email workflows' send nodes — nothing can email until this exists.
3. **Toggle the three email workflows Active** (App Events and the intake
   webhook are already published/active).
4. **Enable GitHub Pages** (Settings → Pages → Source: "GitHub Actions") so
   the site is actually reachable — or point Cloudflare Pages/Netlify at
   `website/` if the repo needs to stay private.
5. **Decide on Supabase** — deliberately skipped for the pilot; local storage
   plus the opt-in webhook covers it without account complexity. Revisit
   only when cross-device sync genuinely matters.
6. **Re-source the marketing site's caregiver statistics** to Australian
   evidence (ABS, AIHW, Carer Wellbeing Survey) instead of the current
   US-sourced 2015/2020 figures — ties into the framework's evidence
   standards below.

## 7. The Caregiver Wellbeing Framework (content, separate track)

A `framework/` folder holds the start of a broader evidence-informed
programme, written to your brief (30% evidence / 50% reflection / 20% action,
Australian-first evidence, Tiny Steps methodology, no em dashes, warm and
validating, never implies grading):

- `CAREGIVER-WELLBEING-FRAMEWORK.md` — the master philosophy and design doc.
- `TINY-STEPS-METHODOLOGY.md` — the behaviour-change methodology with 10
  worked examples across the 8 wellness dimensions.
- `weeks/WEEK-01.md` — Week 1 fully written as the 7-part session template
  (welcome → caregiver story → evidence → reflection → one small step →
  wheel check-in → looking ahead), with a composite Australian caregiver
  story and evidence claims flagged `[VERIFY: ...]` against real sources
  rather than inventing statistics.

Weeks 2–8 are not yet written; this exists as the template and proof of
voice/structure, paused per your "hold off on content" instruction earlier
in this round.

## 8. Quality bar this round

Every change in this update went through an adversarial multi-agent review
(19 sub-agents across correctness, privacy/consent, docs-accuracy, and
CI-deploy dimensions, each finding independently refuted-or-confirmed) before
being called done. 14 real issues were found and every one was fixed and
re-verified in a live browser — including a genuine privacy gap (consent
copy underselling what data was actually shared), two silent-data-loss bugs,
a stale-state migration bug, three stale documentation claims, and a deploy
workflow that would never have fired because it targeted the wrong branch.

## 9. Everything is committed and pushed

Branch `claude/caregiver-wellness-course-arch-vqurrm`, latest commit
`3b70b1a`. Nothing is sitting uncommitted.
