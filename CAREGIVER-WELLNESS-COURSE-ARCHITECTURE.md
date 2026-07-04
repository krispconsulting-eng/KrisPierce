# Caregiver Wellness Course — Architecture

**Status:** 📋 Updated 2026-07-04. Course length is now **8 weeks**. It was briefly run at 6 weeks (to match the tool as originally built, rather than fabricate content), but the tool has since been genuinely extended: two more real weeks of activities were written for all 8 dimensions, so the course now runs the full 8 weeks with a second Wellness Wheel assessment at week 8, not a shortcut back to the old plan. A separate, broader-audience "women 40+" wellness-wheel side hustle was scoped and explicitly **parked** — not part of this project; this document is about the rare-disease caregiver course only.

---

## 0. What changed this round

- The **Wellness Wheel is a real, working asset**, not a placeholder — now a proper Vite + React app (assessment → report → gamified plan → reassessment) with 8 dimensions, 64 questions, 192 weekly activities, a full points/badges/levels system, and a before/after comparison view. It's built for a genuine **8-week** plan: the earlier 6-week cut was a temporary match to what existed at the time, not a permanent scope decision, and weeks 7–8 now have real, caregiver-specific content rather than being force-fit.
- The tool also gained real persistence: progress (scores, points, badges, streaks, check-ins) now survives a reload via local storage, with an optional Supabase adapter (magic-link auth + Postgres) ready to activate once a real project is connected.
- The Wellness Wheel is **personalised per participant** (each person picks their own 2–3 lowest-scoring focus areas after the baseline assessment, and their weekly activities are generated from that). The course's **shared curriculum** (one theme per week, the live session, community discussion) is a separate layer that sits alongside it — see §4.2 for how the two connect.
- Content sourcing: the **NAC/Global Genes Circle of Care Guidebook** (89-page reference on caregiving for children with rare/serious illness) is now the primary research base for weekly teaching content — see §4.4 and the **IP note** below.
- Voice/tone rules (below) are adopted from separate brand-voice work you'd done, because they're genuinely good caregiver-audience writing rules independent of which venture they were drafted for.

**IP note:** the Guidebook is © National Alliance for Caregiving / Global Genes, produced with Mallinckrodt Pharmaceuticals sponsorship. It's excellent, well-cited background research (stats, structure, what caregivers actually report) — use it to **ground and fact-check** your own teaching content and cite it where you use a specific stat, but don't lift its paragraphs into your paid product. The course's actual words need to be yours; that's the IP you're selling.

---

## 1. What this is

An 8-week digital wellbeing course for **family/informal caregivers** of people with rare diseases (parents, partners, siblings — unpaid carers, not paid support workers). You own the content as IP. Delivery is a **hybrid**: your website is the storefront and pitch surface, Notion (+ a community space) is where participants actually do the course, n8n is the glue that moves people and data between the two automatically. The Wellness Wheel tool is the assessment, gamification, and outcome-measurement engine embedded inside it.

Two buyer types, one product:
- **Industry** (pharma, biotech, patient-org partners) sponsors seats — this is also your **fundraising mechanism**, not just a sales channel.
- **Individuals** can self-pay at a lower, accessible price.

### Voice & tone for all course content

- Plain English, short sentences, common words.
- Direct without being harsh; validating without being saccharine.
- Never effusive, never performative. Acknowledge the invisible labour without dramatising it.
- Light humour is fine when it fits, never forced.
- No em dashes in participant-facing copy — commas, colons, semicolons instead.

---

## 2. Personas

| Persona | Who | What they want |
|---|---|---|
| **The Caregiver** | Family carer of a rare disease patient. Time-poor, often financially stretched, emotionally depleted. | Practical relief, to feel less alone, permission to prioritise themselves without guilt. |
| **The Sponsor** | Pharma/biotech CSR lead, patient advocacy partner, or an org that works with a specific rare disease community. | A measurable, reportable impact story tied to a community they already care about (or want visibility with). |
| **The Applicant** | A caregiver who can't self-pay and isn't named by a sponsor. | A no-cost way in, via a scholarship pool funded by sponsorship surplus. |

---

## 3. Business model & pricing architecture

$200/seat is right for a sponsor but too high for an individual paying themselves, and sponsorship should double as fundraising. Here's the model that reconciles both:

### 3.1 Three ways in

| Path | Price | Mechanism |
|---|---|---|
| **A — Self-pay** | **$97** one-time (or 2×$49) | Caregiver buys direct off the website. Accessible price point, no waiting on anyone. |
| **B — Sponsored, named** | $200/seat, paid by sponsor | Sponsor pre-identifies who the seats are for (e.g. a pharma company sponsoring caregivers in the patient community they serve). Sponsor sends a list or a redemption link; each named caregiver enrolls free to them. |
| **C — Sponsored, scholarship pool** | $200/seat, paid by sponsor | Sponsor donates seats with no names attached ("we'll sponsor 10 spots a year"). Caregivers **apply** via a form on the website; you (or a small review step) allocate pool seats. |

### 3.2 Why $200 sponsor / $97 self-pay works as fundraising

Content is built once and reused every cohort, so marginal delivery cost per seat is low (hosting, admin, a slice of facilitator time). The **spread between the $200 sponsor price and actual delivery cost** is what funds:
- Scholarship-pool seats for caregivers who can't pay $97 either,
- Course upkeep/iteration,
- Your margin.

Self-pay at $97 isn't meant to be the main revenue engine — it's the low-friction door for a caregiver who doesn't want to wait on an application. Sponsorship is the engine.

### 3.3 Sponsorship packaging (so it's easy for industry to say yes)

| Tier | Commitment | What sponsor gets |
|---|---|---|
| **Supporter** | 1–9 seats, one-off | Named on the public Supporters page (opt-in), a seat-completion confirmation. |
| **Champion** | 10+ seats, one-off or annual (e.g. "10 spots a year") | Above + an **impact report** per cohort they fund (see 3.4), logo on the Supporters page. |
| **Founding Partner** | 25+ seats/year, ongoing | Above + first right to co-brand a cohort round, priority reporting cadence. |

Volume discounting is a later lever, not a launch requirement — keep $200/seat flat at first so the pitch stays a one-line quote ("$200 sponsors one caregiver through the full 8 weeks"). Revisit tiers once you have a few cohorts of data.

### 3.4 Impact reporting (the sponsor deliverable)

For every sponsor, after their cohort(s) complete, auto-assemble a report containing:
- **Wellness wheel delta** — aggregate, anonymised before/after scores across the 8 dimensions (this is a native feature of the built tool — see §4.2).
- **Completion & engagement rate** for the seats they funded.
- **Opt-in testimonials/quotes** from caregivers (collected via a short end-of-course prompt).
- **Public acknowledgment** — sponsor logo + seat count on a "Our Supporters" page on your website, refreshed per cohort.

This report is a natural n8n job (pull Notion data → assemble via a doc/deck tool → deliver) — see §8.

---

## 4. Course architecture

### 4.1 Structure

- **8 fixed-cohort weeks.** Everyone sponsored/enrolled into a given round starts and moves together — enables a shared community and a clean "Q3 cohort" unit to sell.
- **One live group session per week**, alongside async content. Host TBD (you, or a trained facilitator later) — architecture treats "Session Host" as a swappable role, not hardcoded to you, so this doesn't block launch.
- Each week has a **shared curriculum theme** (video/audio + reflection prompt, same for the whole cohort, discussed in that week's live session) — see §4.4 for the theme mapping.

### 4.2 The Wellness Wheel: how it plugs into the 8-week structure

The Wellness Wheel is a self-contained Vite + React app covering the full arc: assessment → personalised report → sign-up → 8-week gamified plan → reassessment → before/after comparison. It runs two layers at once:

1. **Shared layer (the course):** everyone in a cohort gets the same weekly theme, same live session, same community conversation — see §4.4.
2. **Personalised layer (the tool):** at intake, each participant takes the 64-question assessment (8 questions × 8 dimensions: Social, Occupational, Environmental, Intellectual, Spiritual, Emotional, Physical, Financial), gets a scored wheel + report, then picks their own 2–3 lowest-scoring focus areas. Their week-by-week activity plan (3 activities/week, drawn from `ACTIVITIES[dimension][week]`) is generated from those focus areas — so two people in the same cohort, same week, may be working on different dimensions day to day, even while the shared curriculum theme is the same for everyone.

Timing:
- **Week 1:** baseline assessment (also the sponsor impact-report starting data point).
- **Weeks 1–8:** gamified plan running in parallel with the shared curriculum (points, streaks, badges — see §4.3).
- **Week 8:** reassessment (same 64 questions) → before/after wheel comparison, shown to the participant and aggregated (anonymised) for sponsor reporting.

**Persistence — done:** the tool now has real persistence. Progress (scores, completed activities, points, badges, streak, check-ins) saves automatically to local storage, so it survives a reload with no account needed. A Supabase adapter (magic-link auth + Postgres, RLS'd per user) is built and ready — it activates automatically once a real Supabase project is connected (env vars + running `app/supabase/schema.sql`), and local storage stays the fallback either way.

**Still open:** the accountability-partner invite is UI-only (no real email sends yet), and there's no event coming out of the app yet for n8n/Notion to react to (badge earned, week completed, reassessment submitted) — see §8.

### 4.3 Gamification (as built)

Already implemented in the tool, not just planned:
- **Points:** 10–26 pts per activity (scaling up each week), +25 bonus for a fully completed week, 40–50 pts for optional bonus challenges (one per dimension).
- **Levels:** Seed (0) → Sprout (100) → Bloom (250) → Flourish (500) → Radiant (800).
- **12 badges**, including streak badges (3-day, 7-day), "Halfway There" (week 4), "Journey Complete" (week 8), "Full Circle" (an activity in every dimension), and "Growth Visible" (completing the reassessment).
- **Accountability partner** — invite one person to check in with you weekly (needs real email sending wired up — see §4.2).
- **Weekly mood check-in** — 1–5 scale + optional note, separate from the activity plan.

Deliberately no competitive leaderboard, consistent with the original design call for this audience.

### 4.4 Weekly curriculum themes (shared layer)

A first-draft structure, sourced from the NAC/Global Genes Guidebook's *Self-Care for the Caregiver* section plus its broader caregiving-journey content (see IP note in §0 — use as research grounding, write the actual teaching content yourself). Each week pairs a curriculum theme with the Wellness Wheel dimensions it most naturally supports:

| Week | Theme | Wheel dimensions | Guidebook grounding |
|---|---|---|---|
| **1 — Orientation** | Welcome, the reality of an invisible workload, baseline assessment, meet your cohort | Sets up all 8 | *Self-Care for the Caregiver* intro; the "worse health than 2015" AARP/NAC stat |
| **2 — Body & Space** | Physical health on no time; your home as a restorative (not just functional) base; respite basics | Physical, Environmental | *Physical Health* tips; *Respite* section |
| **3 — Feeling It** | Naming grief, anticipatory grief, guilt, and isolation; anchoring spiritual practices | Emotional, Spiritual | *Emotional Health*; *Spiritual Health* (incl. the 94.7% spirituality-among-caregivers stat); *Bereavement and Grief Support* |
| **4 — Money & Work** *(halfway)* | The real economic impact of caregiving; navigating assistance programs; work/career identity shifts | Financial, Occupational | *Economic Impact of Caregiving*; career-adaptation notes in *Self-Care* intro |
| **5 — People & Mind** | Rebuilding your support system; partnership and sibling dynamics; staying an informed advocate without burning out | Social, Intellectual | *Achieving Quality-of-Life as a Family* (marriage, siblings, extended family); *Getting Accurate Information* |
| **6 — Steadying the System** | Consolidating what's actually worked so far; catching the mid-programme plateau or backslide before it takes hold; protecting the boundaries and spaces you've built | Occupational, Environmental | *Self-Care for the Caregiver* (sustaining practice); *Respite* section |
| **7 — Voice & Advocacy** | Turning your caregiving experience into agency, not just endurance; getting accurate information; becoming your family's informed advocate without it consuming you | Intellectual, Social | *Getting Accurate Information*; *Getting Involved in Caregiving Advocacy* |
| **8 — Looking Ahead** *(finisher)* | Reassessment, before/after review, what comes next | All 8, reassessment | *Life Transitions and Future Care* |

This is a scaffold for you to write the real scripts/modules against, not the modules themselves.

---

## 5. Technical / system architecture

```
                    ┌─────────────────────────┐
                    │   YOUR WEBSITE           │  ← storefront + pitch
                    │  - Course sales page      │
                    │  - Sponsor pitch page      │
                    │  - Self-pay checkout       │
                    │  - "Apply for a sponsored  │
                    │     spot" form             │
                    │  - Public Supporters page  │
                    │  - Embedded Wellness Wheel │
                    │     app (assessment/plan)  │
                    └────────────┬─────────────┘
                                 │  (Stripe checkout / form submit / wheel events)
                                 ▼
                    ┌─────────────────────────┐
                    │        n8n               │  ← the automation layer
                    │  - enrollment routing     │
                    │  - drip content release   │
                    │  - reminders + badges     │
                    │  - wellness wheel scoring │
                    │  - impact report assembly │
                    └───┬─────────────────┬─────┘
                        ▼                 ▼
          ┌───────────────────┐   ┌──────────────────────┐
          │  NOTION (CRM +     │   │  COMMUNITY SPACE       │
          │  course content)   │   │  (per-cohort channel/   │
          │  - Sponsors DB     │   │   group, weekly live    │
          │  - Participants DB │   │   session)              │
          │  - Cohorts DB      │   └──────────────────────┘
          │  - Enrollments DB  │
          │  - Wellness Wheel  │
          │    submissions     │
          │  - Weekly content  │
          │    (unlocked on    │
          │    schedule)       │
          └───────────────────┘
                        ▲
                        │ (persisted user state: scores, completed
                        │  activities, points, badges, streak)
          ┌───────────────────┐
          │  SUPABASE          │  ← Wellness Wheel's own backend
          │  (auth + Postgres)  │     (see §4.2 rebuild note)
          └───────────────────┘
```

**Why this shape:** the website never has to become a full LMS (cheap, fast to build). Notion is already where your business brain lives (per `NOTION-BUSINESS-PLAN.md`), so the course CRM extends it rather than duplicating it. The Wellness Wheel needs its own lightweight backend (Supabase) for per-user state, since that's real interactive app state, not documents — but its *summary* data (baseline/reassessment scores, completion, badges) syncs into Notion via n8n so it lives alongside everything else about that participant.

---

## 6. Onboarding flows

### 6.1 Sponsor onboarding
1. Inquiry (from pitch page or direct outreach) →
2. Sponsorship offer sent (seats × $200, named or pool, one-off or annual) →
3. Agreement + invoice (Stripe or manual) →
4. Payment recorded → **Sponsors DB** entry created, **Money** entry logged (existing Notion system) →
5. Seats allocated: either sponsor supplies names, or seats go to the **scholarship pool** →
6. Sponsor added to public Supporters page (if opted in) →
7. Impact report scheduled for post-cohort delivery.

### 6.2 Caregiver onboarding — three entry paths converge to one flow
1. **Self-pay:** checkout on website → payment confirmed.
2. **Sponsored, named:** receives a redemption link/code from the sponsor or you → redeems, no payment.
3. **Applied for scholarship:** submits application → reviewed → approved → allocated a pool seat.

All three then:
4. **Participants DB** entry created, linked to their **Enrollment** (which cohort, which path, which sponsor if any) →
5. Welcome sequence (email) →
6. Account created in the Wellness Wheel app (Supabase) + **Week-1 baseline assessment** →
7. Cohort start info + community invite sent ahead of Day 1.

---

## 7. Customer management — Notion data model (extends your existing business system)

New databases, sitting alongside your existing Projects/Contacts/Money:

| Database | Key fields | Relations |
|---|---|---|
| **Sponsors** | Org name, contact, tier, total seats purchased, annual commitment (y/n), logo/opt-in status | → Money, → Enrollments |
| **Cohorts** | Start date, end date, status, facilitator/host, seats total, seats filled | → Enrollments |
| **Participants** | Name, contact, entry path (self-pay/sponsored-named/scholarship), consent flags | → Enrollments, → Wellness Wheel |
| **Enrollments** | Participant ↔ Cohort ↔ Sponsor (if any) ↔ payment status ↔ completion status ↔ badges earned | hub record — links everything |
| **Wellness Wheel Submissions** | Participant, timepoint (week 1 baseline / week 6 reassessment), per-dimension scores (synced from Supabase via n8n) | → Participants |

Money (existing) gains entries per sponsor payment; Contacts (existing) gains sponsor org records — this is deliberately additive to what's in `NOTION-BUSINESS-PLAN.md`, not a parallel system.

---

## 8. Workflow automation map (n8n)

| Trigger | Action |
|---|---|
| Stripe checkout completes (self-pay) | Create Participant + Enrollment → send welcome email → provision Wellness Wheel account |
| Sponsor redemption link used | Same as above, tagged to that sponsor |
| Scholarship application submitted | Notify you for review → on approval, same as above |
| Cohort start date reached | Release week 1 curriculum content (unlock Notion page/view) + send community invite + prompt baseline assessment |
| Each subsequent week (5 more times) | Release that week's curriculum content + reminder + live session calendar detail |
| Wellness Wheel: activity/badge/week completed (Supabase webhook) | Sync progress into the Enrollment record; trigger badge-earned email on milestones |
| Wellness Wheel: baseline or reassessment submitted | Write scores to Wellness Wheel Submissions → (at week 6) compute delta |
| Cohort end date reached | Assemble sponsor impact report (aggregate + anonymised) → deliver to sponsor → update public Supporters page data → issue completion certificates |

---

## 9. Open decisions & risks to close out before launch

1. **Live session host** — you vs. trained facilitator vs. TBD-per-cohort. Doesn't block architecture (built as a swappable role) but blocks scaling past what your own calendar allows.
2. **Not therapy — say so explicitly.** This is a wellbeing/peer-support course, not clinical mental health treatment. Put a plain disclaimer on the sales page and in onboarding, and have a simple "if you're in crisis" signpost (e.g. local crisis line) in the welcome material — standard duty-of-care practice for this kind of content.
3. **Wellness wheel data is sensitive, even though it's not clinical patient data.** It's self-reported personal wellbeing data. Same posture as the privacy guardrails already set in `NOTION-BUSINESS-PLAN.md` (restricted spaces, never public) — aggregate and anonymise anything that leaves your Notion for a sponsor report.
4. **Exact self-pay price ($97 proposed)** — sanity-check against what a caregiver in this community would actually pay; open to a pay-what-you-can band instead of a fixed number if that fits your brand better.
5. **Facilitator/session cost** isn't yet netted against the $200 margin — worth a rough cost-per-cohort model once you know who's hosting.
6. **Guidebook attribution** — decide how you want to credit the NAC/Global Genes Guidebook as a research source (a line in course materials, a resources page) if you draw statistics or structure from it, per the IP note in §0.

---

## 10. Phased build plan

| Phase | Deliverable | Depends on |
|---|---|---|
| **0 — Content intake** | ✅ Done — Wellness Wheel tool received and integrated, Guidebook received as research source, weekly theme scaffold drafted (§4.4) | — |
| **1 — Write the real curriculum** | Turn the 8 weekly-theme scaffolds into actual scripts/modules in your voice (§1 voice rules) | You + this doc |
| **2 — Notion skeleton** | 5 new databases (§7), linked into existing business system, one test cohort seeded | Phase 1 partial (structure only) |
| **3 — Wellness Wheel backend** | 🔶 Partially done — local-storage persistence is live (survives a reload, no account needed) and the Supabase adapter (magic-link auth + Postgres, RLS'd) is built and ready; still needed: connect a real Supabase project, and wire the accountability-partner invite to a real email send (§4.2) | — |
| **4 — Website surfaces** | ✅ Built — sales page, sponsor pitch page, "apply for sponsorship" form, public Supporters page, and the Wellness Wheel as a real Vite app the site links to (see `caregiver-wellness-course/website/` and `caregiver-wellness-course/app/`). Forms are front-end only; no real checkout yet since pricing isn't finalised. | Pricing sign-off (§3) for real checkout |
| **5 — n8n automations** | Enrollment routing, drip release, reminders, wellness wheel sync, one working end-to-end test cohort | Phases 2–4 |
| **6 — Pilot cohort** | Run one real cohort (even with a friendly sponsor or free seats) to prove the loop before selling hard | Phase 5 |
| **7 — Impact reporting + iterate** | First sponsor report generated, feed learnings back into pricing/tiers | Phase 6 |

---

## 11. What's needed from you next

- Write (or record) the actual weekly modules against the §4.4 scaffold — that's the one piece only you can do.
- A gut-check on the $97 self-pay / $200 sponsor numbers in §3.
- A steer on the live-session host question (§9.1) whenever you're ready — not urgent for Phase 1–2.
- A decision on Guidebook attribution (§9.6).
