# Caregiver Wellness Course — Architecture

**Status:** 📋 Draft architecture, built from your answers on 2026-07-02. Waiting on: the 8-week content, the wellness wheel (you have a partial build), and sign-off on the pricing numbers below.

---

## 1. What this is

An 8-week digital wellbeing course for **family/informal caregivers** of people with rare diseases (parents, partners, siblings — unpaid carers, not paid support workers). You own the content as IP. Delivery is a **hybrid**: your website is the storefront and pitch surface, Notion (+ a community space) is where participants actually do the course, n8n is the glue that moves people and data between the two automatically.

Two buyer types, one product:
- **Industry** (pharma, biotech, patient-org partners) sponsors seats — this is also your **fundraising mechanism**, not just a sales channel.
- **Individuals** can self-pay at a lower, accessible price.

---

## 2. Personas

| Persona | Who | What they want |
|---|---|---|
| **The Caregiver** | Family carer of a rare disease patient. Time-poor, often financially stretched, emotionally depleted. | Practical relief, to feel less alone, permission to prioritise themselves without guilt. |
| **The Sponsor** | Pharma/biotech CSR lead, patient advocacy partner, or an org that works with a specific rare disease community. | A measurable, reportable impact story tied to a community they already care about (or want visibility with). |
| **The Applicant** | A caregiver who can't self-pay and isn't named by a sponsor. | A no-cost way in, via a scholarship pool funded by sponsorship surplus. |

---

## 3. Business model & pricing architecture

You flagged $200/seat is right for a sponsor but too high for an individual paying themselves, and that sponsorship should double as fundraising. Here's the model that reconciles both:

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
- **Wellness wheel delta** — aggregate, anonymised before/after scores across the dimensions.
- **Completion & engagement rate** for the seats they funded.
- **Opt-in testimonials/quotes** from caregivers (collected via a short end-of-course prompt).
- **Public acknowledgment** — sponsor logo + seat count on a "Our Supporters" page on your website, refreshed per cohort.

This report is a natural n8n job (pull Notion data → assemble via a doc/deck tool → deliver) — see §8.

---

## 4. Course architecture

### 4.1 Structure

- **8 fixed-cohort weeks.** Everyone sponsored/enrolled into a given round starts and moves together — enables a shared community and a clean "Q3 cohort" unit to sell.
- **One live group session per week**, alongside async content. Host TBD (you, or a trained facilitator later) — architecture treats "Session Host" as a swappable role, not hardcoded to you, so this doesn't block launch.
- Each week = a module (video/audio + reflection prompt + a small gamified action) built around a theme — final theme-per-week mapping comes from your content once shared, ideally aligned to the wellness wheel's dimensions.

### 4.2 Wellness wheel

- Taken **at week 1 (intake) and week 8 (completion)** — a clean before/after metric.
- Doubles as: (a) personal reflection tool for the caregiver, (b) the core data source for sponsor impact reports.
- Once you share your existing partial build, it slots in as a short form (Notion form / Tally / Typeform) whose submissions write straight into each participant's CRM record.

### 4.3 Gamification

Three reinforcing mechanics (not a competitive leaderboard — deliberately, given the audience):
1. **Progress streaks & completion badges** — per-module completion, milestone badges at week 4 and week 8.
2. **Wellness wheel improvement** — the "your wellbeing went up" reframe, visualised for the participant at week 8.
3. **Community/peer engagement** — light recognition for showing up to the live session and engaging in the community space.

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
                    └────────────┬─────────────┘
                                 │  (Stripe checkout / form submit)
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
```

**Why this shape:** the website never has to become a full LMS (cheap, fast to build). Notion is already where your business brain lives (per `NOTION-BUSINESS-PLAN.md`), so the course CRM extends it rather than duplicating it. n8n is the only thing that has to know about both sides.

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
6. Week-1 wellness wheel intake →
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
| **Wellness Wheel Submissions** | Participant, timepoint (week 1 / week 8), per-dimension scores | → Participants |

Money (existing) gains entries per sponsor payment; Contacts (existing) gains sponsor org records — this is deliberately additive to what's in `NOTION-BUSINESS-PLAN.md`, not a parallel system.

---

## 8. Workflow automation map (n8n)

| Trigger | Action |
|---|---|
| Stripe checkout completes (self-pay) | Create Participant + Enrollment → send welcome email → queue week-1 wellness wheel |
| Sponsor redemption link used | Same as above, tagged to that sponsor |
| Scholarship application submitted | Notify you for review → on approval, same as above |
| Cohort start date reached | Release week 1 content (unlock Notion page/view) + send community invite |
| Each subsequent week (7 more times) | Release that week's content + reminder + live session calendar detail |
| Module marked complete | Update badge/streak field → trigger badge email if milestone hit |
| Week-1 / week-8 wellness wheel form submitted | Write scores to Wellness Wheel Submissions → (at week 8) compute delta |
| Cohort end date reached | Assemble sponsor impact report (aggregate + anonymised) → deliver to sponsor → update public Supporters page data → issue completion certificates |

---

## 9. Open decisions & risks to close out before launch

1. **Live session host** — you vs. trained facilitator vs. TBD-per-cohort. Doesn't block architecture (built as a swappable role) but blocks scaling past what your own calendar allows.
2. **Not therapy — say so explicitly.** This is a wellbeing/peer-support course, not clinical mental health treatment. Put a plain disclaimer on the sales page and in onboarding, and have a simple "if you're in crisis" signpost (e.g. local crisis line) in the welcome material — standard duty-of-care practice for this kind of content.
3. **Wellness wheel data is sensitive, even though it's not clinical patient data.** It's self-reported personal wellbeing data. Same posture as the privacy guardrails already set in `NOTION-BUSINESS-PLAN.md` (restricted spaces, never public) — aggregate and anonymise anything that leaves your Notion for a sponsor report.
4. **Exact self-pay price ($97 proposed)** — sanity-check against what a caregiver in this community would actually pay; open to a pay-what-you-can band instead of a fixed number if that fits your brand better.
5. **Facilitator/session cost** isn't yet netted against the $200 margin — worth a rough cost-per-cohort model once you know who's hosting.

---

## 10. Phased build plan

| Phase | Deliverable | Depends on |
|---|---|---|
| **0 — Content intake** | You share the 8-week content and the wellness wheel build | You |
| **1 — Notion skeleton** | 5 new databases (§7), linked into existing business system, one test cohort seeded | Phase 0 partial (structure only) |
| **2 — Website surfaces** | Sales page, sponsor pitch page, self-pay checkout, "apply for sponsorship" form, public Supporters page | Pricing sign-off (§3) |
| **3 — n8n automations** | Enrollment routing, drip release, reminders, wellness wheel scoring, one working end-to-end test cohort | Phases 1 + 2 |
| **4 — Pilot cohort** | Run one real cohort (even with a friendly sponsor or free seats) to prove the loop before selling hard | Phase 3 |
| **5 — Impact reporting + iterate** | First sponsor report generated, feed learnings back into pricing/tiers | Phase 4 |

---

## 11. What's needed from you next

- The 8-week content (as promised — this determines the week-by-week theme mapping and content-release structure).
- Your existing wellness wheel build (dimensions, questions, scoring) so it can be wired in rather than redesigned.
- A gut-check on the $97 self-pay / $200 sponsor numbers in §3.
- A steer on the live-session host question (§9.1) whenever you're ready — not urgent for Phase 0–1.
