# Caregiver Wellness Course — Architecture

**Status:** 📋 Updated 2026-07-04. Course length is now **8 weeks**. It was briefly run at 6 weeks (to match the tool as originally built, rather than fabricate content), but the tool has since been genuinely extended: two more real weeks of activities were written for all 8 dimensions, so the course now runs the full 8 weeks with a second Wellness Wheel assessment at week 8, not a shortcut back to the old plan. A separate, broader-audience "women 40+" wellness-wheel side hustle was scoped and explicitly **parked** — not part of this project; this document is about the rare-disease caregiver course only.

---

## 0. What changed this round

- **The cohort model is removed (2026-07-04).** The course is now fully self-directed and start-anytime: each caregiver's 8 weeks begin the day they enroll, done on their phone or computer (phone preferred). No fixed rounds, no weekly live group session. The aim is unchanged and sharper: improve caregiver wellbeing by giving caregivers genuinely low-lift time for themselves.

- The **Wellness Wheel is a real, working asset**, not a placeholder — now a proper Vite + React app (assessment → report → gamified plan → reassessment) with 8 dimensions, 64 questions, 192 weekly activities, a full points/badges/levels system, and a before/after comparison view. It's built for a genuine **8-week** plan: the earlier 6-week cut was a temporary match to what existed at the time, not a permanent scope decision, and weeks 7–8 now have real, caregiver-specific content rather than being force-fit.
- The tool also gained real persistence: progress (scores, points, badges, streaks, check-ins) now survives a reload via local storage, with an optional Supabase adapter (magic-link auth + Postgres) ready to activate once a real project is connected.
- The Wellness Wheel is **personalised per participant** (each person picks their own 2–3 lowest-scoring focus areas after the baseline assessment, and their weekly activities are generated from that). The course's **weekly curriculum** (one self-guided theme per week) is a separate layer that sits alongside it — see §4.2 for how the two connect.
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

Content is built once and reused by every participant, so marginal delivery cost per seat is very low (hosting and admin; no per-round facilitator time in the self-directed model). The **spread between the $200 sponsor price and actual delivery cost** is what funds:
- Scholarship-pool seats for caregivers who can't pay $97 either,
- Course upkeep/iteration,
- Your margin.

Self-pay at $97 isn't meant to be the main revenue engine — it's the low-friction door for a caregiver who doesn't want to wait on an application. Sponsorship is the engine.

### 3.3 Sponsorship packaging (so it's easy for industry to say yes)

| Tier | Commitment | What sponsor gets |
|---|---|---|
| **Supporter** | 1–9 seats, one-off | Named on the public Supporters page (opt-in), a seat-completion confirmation. |
| **Champion** | 10+ seats, one-off or annual (e.g. "10 spots a year") | Above + an **impact report** on the seats they fund (see 3.4), logo on the Supporters page. |
| **Founding Partner** | 25+ seats/year, ongoing | Above + first right to co-brand an enrollment round, priority reporting cadence. |

Volume discounting is a later lever, not a launch requirement — keep $200/seat flat at first so the pitch stays a one-line quote ("$200 sponsors one caregiver through the full 8 weeks"). Revisit tiers once you have real completion data.

### 3.4 Impact reporting (the sponsor deliverable)

For every sponsor, as the participants they fund complete their 8 weeks, auto-assemble a report containing:
- **Wellness wheel delta** — aggregate, anonymised before/after scores across the 8 dimensions (this is a native feature of the built tool — see §4.2).
- **Completion & engagement rate** for the seats they funded.
- **Opt-in testimonials/quotes** from caregivers (collected via a short end-of-course prompt).
- **Public acknowledgment** — sponsor logo + seat count on a "Our Supporters" page on your website, refreshed as results accumulate.

This report is a natural n8n job (pull Notion data → assemble via a doc/deck tool → deliver) — see §8.

---

## 4. Course architecture

### 4.1 Structure

- **8 self-paced weeks, start any day.** Each participant's week 1 begins the day they enroll; their weekly rhythm is theirs alone. No fixed rounds and no live group sessions — the course must be doable at 11pm on a hospital chair, on a phone.
- **Fully self-directed delivery.** Weekly themes ship as short recorded pieces (audio/video + a reflection prompt) the participant opens whenever it suits them. No facilitator is required to run a week, which is also what makes the unit economics work.
- Each week has a **curriculum theme** (see §4.4 for the theme mapping) alongside the personalised activity plan from the Wellness Wheel.

### 4.2 The Wellness Wheel: how it plugs into the 8-week structure

The Wellness Wheel is a self-contained Vite + React app covering the full arc: assessment → personalised report → sign-up → 8-week gamified plan → reassessment → before/after comparison. It runs two layers at once:

1. **Curriculum layer (the course):** every participant gets the same weekly theme content, worked through in their own time — see §4.4.
2. **Personalised layer (the tool):** at intake, each participant takes the 64-question assessment (8 questions × 8 dimensions: Social, Occupational, Environmental, Intellectual, Spiritual, Emotional, Physical, Financial), gets a scored wheel + report, then picks their own 2–3 lowest-scoring focus areas. Their week-by-week activity plan (3 activities/week, drawn from `ACTIVITIES[dimension][week]`) is generated from those focus areas — so two people in the same week number may be working on different dimensions day to day, even while the curriculum theme for that week is the same.

Timing:
- **Week 1:** baseline assessment (also the sponsor impact-report starting data point).
- **Weeks 1–8:** gamified plan running in parallel with the shared curriculum (points, streaks, badges — see §4.3).
- **Week 8:** reassessment (same 64 questions) → before/after wheel comparison, shown to the participant and aggregated (anonymised) for sponsor reporting.

**Persistence — done:** the tool now has real persistence. Progress (scores, completed activities, points, badges, streak, check-ins) saves automatically to local storage, so it survives a reload with no account needed. A Supabase adapter (magic-link auth + Postgres, RLS'd per user) is built and ready — it activates automatically once a real Supabase project is connected (env vars + running `app/supabase/schema.sql`), and local storage stays the fallback either way.

**Still open:** there's no event coming out of the app yet for n8n/Notion to react to (badge earned, week completed, reassessment submitted) — see §8. (The accountability-partner invite has been removed entirely: the course is fully self-directed, done individually on the app/website.)

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
| **1 — Orientation** | Welcome, the reality of an invisible workload, baseline assessment | Sets up all 8 | *Self-Care for the Caregiver* intro; the "worse health than 2015" AARP/NAC stat |
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
          │  course content)   │   │  (optional community       │
          │  - Sponsors DB     │   │   group, weekly live    │
          │  - Participants DB │   │   session)              │
          │  - Cohorts DB (deprecated)      │   └──────────────────────┘
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
7. Impact reporting begins as their sponsored participants complete (see §8.1).

### 6.2 Caregiver onboarding — three entry paths converge to one flow
1. **Self-pay:** checkout on website → payment confirmed.
2. **Sponsored, named:** receives a redemption link/code from the sponsor or you → redeems, no payment.
3. **Applied for scholarship:** submits application → reviewed → approved → allocated a pool seat.

All three then:
4. **Participants DB** entry created, linked to their **Enrollment** (entry path, sponsor if any, enrolled date — the date that anchors their 8 weeks) →
5. Welcome sequence (email) →
6. Account created in the Wellness Wheel app (Supabase) + **Week-1 baseline assessment** →
7. They start immediately: week 1 begins the day they enroll.

---

## 7. Customer management — Notion data model (extends your existing business system)

✅ **Built.** Live under the [🌿 Caregiver Wellness Course](https://app.notion.com/p/393a5163e45d81fe823ac06a628016bd) hub page in your workspace, as its own hub (parallel to 🟢 SCN2A Australia, 🟣 UNSW, 🔵 KrisPierce Consulting, 🟠 Committees) since this is a distinct IP product line, not client-services work:

| Database | Key fields | Relations |
|---|---|---|
| **[Sponsors](https://app.notion.com/p/b4f23c8ce0c045c186e51c3f284cac68)** | Org name, contact, tier, total seats purchased, annual commitment (checkbox), public opt-in | ↔ Enrollments |
| **[Cohorts](https://app.notion.com/p/9200d2124e67426f843482a61359bd30)** | ⚠️ Deprecated with the move to self-directed delivery — kept only as an optional grouping label for enrollment rounds; nothing operational reads it any more. `Enrolled Date` on Enrollments is now the anchor for all timing. |
| **[Participants](https://app.notion.com/p/48c6cd4d8ded4b4eb495d110909b2f41)** | Name, email, entry path (self-pay/sponsored-named/scholarship), testimonial + data-sharing consent flags | ↔ Enrollments, ↔ Wellness Wheel Submissions |
| **[Enrollments](https://app.notion.com/p/437394770dc44d33970e349433d75384)** | Participant ↔ Sponsor (if any), payment status, completion status, badges earned, **Enrolled Date (the anchor for each participant's own 8-week clock)**, plus convenience fields for the automations in §8: `Participant Name`/`Participant Email`/`Sponsor Contact Email` (rollups, so n8n doesn't need extra lookups per row), `Reassessment Invite Sent` (checkbox, prevents duplicate sends). The old Cohort relation and `Cohort Start Date` rollup remain but are no longer read. | hub record — links everything |
| **[Wellness Wheel Submissions](https://app.notion.com/p/81d5e53cdf7d4707af1da562a3ee2b71)** | Participant, timepoint (week 1 baseline / week 8 reassessment), per-dimension scores (to be synced from the app via n8n — not yet built, see §8) | → Participants |

(Cohorts previously carried `Report Sent` / `Impact Report Summary` for the cohort-end report; superseded by the per-sponsor periodic report in §8.1.)

This sits alongside, not inside, your existing Projects/Contacts/Money master databases — a deliberate call given this is Kris's own IP business rather than a consulting client, so it gets its own hub rather than living inside `🧩 Client Framework & CRM`. **Website form submissions now populate this** (§8); the Wellness Wheel app still doesn't sync its own submissions here (needs the app to emit events, not yet built).

---

## 8. Workflow automation map (n8n)

✅ **Row 1 built:** website form submissions now create real Notion records. The **[Caregiver Course - Website Form Intake](https://scn2a-krispierce.app.n8n.cloud/workflow/NNwZQpTpj12niO9m)** n8n workflow is live: a webhook (`https://scn2a-krispierce.app.n8n.cloud/webhook/caregiver-course-intake`) receives all three website forms (waitlist, sponsor enquiry, scholarship application), routes by form type, and creates the matching Participant or Sponsor record in Notion. `website/assets/site.js` now POSTs real form data to it instead of showing a fake success state.

**⚠️ One manual step still needed:** the workflow's Notion writes currently 404 with *"Make sure the relevant pages and databases are shared with your integration 'n8n'"*. Notion integrations only see pages explicitly shared with them — open the [🌿 Caregiver Wellness Course](https://app.notion.com/p/393a5163e45d81fe823ac06a628016bd) page in Notion, click **"•••" → "Connections"**, and add the **n8n** integration. Once that's done, the workflow works with no further changes.

| Trigger | Action |
|---|---|
| ✅ Website form submitted (waitlist / sponsor enquiry / scholarship application) | Create Participant or Sponsor record in Notion — **built**, pending the Notion sharing step above |
| Stripe checkout completes (self-pay) | Create Participant + Enrollment → send welcome email → provision Wellness Wheel account |
| Sponsor redemption link used | Same as above, tagged to that sponsor |
| Scholarship application submitted | Notify you for review → on approval, create Enrollment (currently just creates the Participant record; approval routing not yet built) |
| Enrollment created | Prompt baseline assessment + welcome email; week 1 starts immediately |
| Each week of a participant's own 8 weeks | Their weekly theme + reminder, timed off their Enrolled Date (see §8.1) |
| Wellness Wheel: activity/badge/week completed | Sync progress into the Enrollment record; trigger badge-earned email on milestones. Not yet built — the app doesn't emit any event today (local storage / Supabase only). |
| Wellness Wheel: baseline or reassessment submitted | Write scores to Wellness Wheel Submissions → (at week 8) compute delta. Not yet built, same reason. |
| ✅ Weekly (every Monday) | Send every actively-enrolled caregiver a check-in email referencing their actual current week's curriculum theme, computed from their own Enrolled Date — **built**, see below |
| ✅ Weekly (every Monday) | Invite anyone who's reached week 8 (from their Enrolled Date) to retake the Wellness Wheel, once, then mark it sent — **built**, see below |
| ✅ Monthly | Assemble each sponsor's impact report (aggregate + anonymised wellness-wheel delta, completion rate across all their funded participants to date) → email to the sponsor — **built**, see below. Public Supporters page update and completion certificates are not yet part of this. |

### 8.1 Weekly automations (built)

Two more n8n workflows, both on the **same weekly Monday 9am schedule** (deliberately weekly, not daily, so each participant gets exactly one email per week without needing a "was this sent" flag for the check-in one):

- **[Caregiver Course - Weekly Check-in Email](https://scn2a-krispierce.app.n8n.cloud/workflow/EAJiUxr7PmcQmSAD)** — for every Enrollment with Completion Status "In Progress", computes their current week from their own `Enrolled Date` (self-directed: everyone is on their own clock) and sends a short, warm email referencing that week's actual curriculum theme (§4.4), not a generic blast.
- **[Caregiver Course - Week 8 Reassessment Invite](https://scn2a-krispierce.app.n8n.cloud/workflow/TjjnyLql1ujJ1f53)** — for every Enrollment that's reached week 8 and hasn't been invited yet (`Reassessment Invite Sent` checkbox, new on Enrollments), sends the retake-the-wheel invite and marks it sent so it never repeats.
- **[Caregiver Course - Sponsor Impact Report](https://scn2a-krispierce.app.n8n.cloud/workflow/hzyoWVhFrH1Jjp8I)** — monthly, for each sponsor with completed funded participants: pulls those participants' baseline and reassessment Wellness Wheel Submissions, computes an anonymised aggregate delta per dimension plus a completion rate across everything they've funded to date, and emails it to the sponsor contact.

**Two things need to happen before these can actually send anything:**
1. The same Notion-sharing step from above (all three read/write the CRM databases).
2. **Connect a Gmail account to n8n.** None of the three has a real Gmail credential yet — in the n8n editor, open any of the three workflows, click the Gmail node, and sign in. All three share the same credential once connected.

These three are **not yet activated** (left as drafts) on purpose: with zero real participants enrolled today, an active weekly/daily schedule would just fail silently every run. Publish them once real participants are enrolling and Gmail is connected — ping me and I'll do it, or use the n8n editor's Activate toggle yourself.

---

## 9. Open decisions & risks to close out before launch

1. ~~Live session host~~ — resolved by the move to fully self-directed delivery: there are no live sessions to host. If optional community calls are ever added back, they're an add-on, not a dependency.
2. **Not therapy — say so explicitly.** This is a wellbeing/peer-support course, not clinical mental health treatment. Put a plain disclaimer on the sales page and in onboarding, and have a simple "if you're in crisis" signpost (e.g. local crisis line) in the welcome material — standard duty-of-care practice for this kind of content.
3. **Wellness wheel data is sensitive, even though it's not clinical patient data.** It's self-reported personal wellbeing data. Same posture as the privacy guardrails already set in `NOTION-BUSINESS-PLAN.md` (restricted spaces, never public) — aggregate and anonymise anything that leaves your Notion for a sponsor report.
4. **Exact self-pay price ($97 proposed)** — sanity-check against what a caregiver in this community would actually pay; open to a pay-what-you-can band instead of a fixed number if that fits your brand better.
5. ~~Facilitator/session cost~~ — moot in the self-directed model; delivery cost is hosting + admin only.
6. **Guidebook attribution** — decide how you want to credit the NAC/Global Genes Guidebook as a research source (a line in course materials, a resources page) if you draw statistics or structure from it, per the IP note in §0.

---

## 10. Phased build plan

| Phase | Deliverable | Depends on |
|---|---|---|
| **0 — Content intake** | ✅ Done — Wellness Wheel tool received and integrated, Guidebook received as research source, weekly theme scaffold drafted (§4.4) | — |
| **1 — Write the real curriculum** | Turn the 8 weekly-theme scaffolds into actual scripts/modules in your voice (§1 voice rules) | You + this doc |
| **2 — Notion skeleton** | ✅ Built — 5 databases (§7) live under the 🌿 Caregiver Wellness Course hub (Cohorts now deprecated). Populated only by form intake so far; nothing else writes real participants/sponsors yet. | — |
| **3 — Wellness Wheel backend** | 🔶 Partially done — local-storage persistence is live (survives a reload, no account needed) and the Supabase adapter (magic-link auth + Postgres, RLS'd) is built and ready; still needed: connect a real Supabase project (§4.2) | — |
| **4 — Website surfaces** | ✅ Built — sales page, sponsor pitch page, "apply for sponsorship" form, public Supporters page, and the Wellness Wheel as a real Vite app the site links to (see `caregiver-wellness-course/website/` and `caregiver-wellness-course/app/`). Forms now submit to Notion (see §8); no real checkout yet since pricing isn't finalised. | Pricing sign-off (§3) for real checkout |
| **5 — n8n automations** | 🔶 Started — website form intake, weekly check-in email, week-8 reassessment invite, and sponsor impact report are all built (§8). The last three are left unpublished (draft) since there's no real participant yet to run against, and no Gmail credential connected. Still needed: enrollment routing past intake (Stripe/redemption-link flows), drip curriculum release, wellness wheel sync (needs the app to emit events — see §4.2). | Phases 2–4 |
| **6 — Pilot participants** | Run a handful of real self-directed participants (even with a friendly sponsor or free seats) to prove the loop before selling hard. This is also when the 3 draft automations get connected (Gmail) and activated for the first time. | Phase 5 |
| **7 — Impact reporting + iterate** | First sponsor report generated, feed learnings back into pricing/tiers | Phase 6 |

---

## 11. What's needed from you next

- Write (or record) the actual weekly modules against the §4.4 scaffold — that's the one piece only you can do.
- A gut-check on the $97 self-pay / $200 sponsor numbers in §3.
- A steer on the live-session host question (§9.1) whenever you're ready — not urgent for Phase 1–2.
- A decision on Guidebook attribution (§9.6).
