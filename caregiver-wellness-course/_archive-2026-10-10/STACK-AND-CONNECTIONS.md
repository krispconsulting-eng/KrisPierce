# Caregiver Wellbeing Course: Stack and Connections

A single, honest map of the whole system: what each piece is, where the data
actually flows, what is live right now, and the short list of steps only you
can complete (they need interactive sign-in that an automated session cannot
do for you).

Last traced and **live-tested**: 6 July 2026, against the live n8n instance
`scn2a-krispierce.app.n8n.cloud` and the repo on branch
`claude/caregiver-wellness-course-arch-vqurrm`. Test method: real production
executions of the intake workflow, a manual execution of the weekly email
workflow, and schema fetches of the live Notion databases.

---

## 1. The picture in one glance

```
  CAREGIVER (phone or computer)
        │
        ├─ uses ─────────────►  THE APP  (Wellbeing Journey)
        │                       React + Vite, static files under website/app/
        │                       Saves progress in the browser (local storage).
        │                       Optional Supabase sync (not configured yet).
        │                          │
        │                          │ ONLY if the caregiver opts in to email
        │                          │ check-ins on sign-up (off by default)
        │                          ▼
        │              n8n WEBHOOK "App Events"  ● built + published
        │              /webhook/caregiver-course-app-events
        │                 enrolled      → Participant + Enrollment (Enrolled
        │                                 Date = today) + Week 1 Baseline
        │                                 wheel submission in Notion
        │                 reassessment  → Week 8 submission + Enrollment
        │                                 marked Completed
        │
        └─ fills a form ───────►  WEBSITE FORMS  (waitlist / sponsor / apply)
                                     │  POST JSON
                                     ▼
                          n8n WEBHOOK  "Website Form Intake"   ● receives + routes OK
                          /webhook/caregiver-course-intake
                                     │  creates a page
                                     ▼
                                 NOTION  (the CRM)              ⚠ BLOCKED: DBs not yet
                          Participants DB / Sponsors DB           shared with the "n8n"
                                                                  integration (one step)

  SCHEDULED (n8n, on a timer, reading Notion)                 ○ BUILT, NOT ON
     Weekly Check-in Email  ─┐
     Week 8 Reassessment    ─┼─ read Enrollments ─► send Gmail ─► caregiver / sponsor
     Sponsor Impact Report  ─┘
```

Legend: ● live and running · ○ built but switched off (see §6 for why).

---

## 2. The app (Wellbeing Journey)

- **What it is:** a React 19 + Vite build. Source in `app/src/`, built into
  `website/app/` so the marketing site links straight to it. Installable to a
  phone home screen (PWA manifest, icons, theme colour all in place).
  Fully self-directed: no cohorts, no partner/buddy features; a caregiver does
  the whole course on their own, on phone or computer.
- **Where a caregiver's data lives:** their own browser, via local storage.
  Progress (reflection answers, plan, check-ins, badges) survives a reload with
  no account needed.
- **Optional cloud sync:** the code path for Supabase exists
  (`app/src/supabaseClient.js`, `app/.env.example`, `app/supabase/schema.sql`).
  It is dormant until you set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
  and run the schema. Until then the app is fully functional on local storage.
- **Consent-first CRM bridge:** by default the app is self-contained and posts
  nothing anywhere. On the sign-up screen there is an optional email field;
  leaving it blank keeps everything on the device. If the caregiver adds an
  email, the app calls the **App Events** webhook
  (`/webhook/caregiver-course-app-events`, workflow `onnVc7WnOSEokgmP`), which
  creates their Participant, an Enrollment with today as the Enrolled Date
  (feeding the weekly emails), and their Week 1 Baseline wheel submission. At
  the week-8 look-back it records the Week 8 submission (feeding the sponsor
  impact report) and marks the Enrollment completed. All calls are
  fire-and-forget: offline or failed requests never affect the app.
- **Consent copy is explicit about what is sent**: name, email and wellbeing
  check-in results (not just "check-in emails"), that week-8 results feed
  combined/de-identified sponsor reporting, and that there is no unsubscribe
  link yet (email the course inbox to be removed). The email field is
  format-validated before it can be submitted (a typo can't silently create a
  CRM record nobody will ever see). If the first send fails (e.g. the Notion
  share below isn't done yet, or the caregiver was briefly offline), the
  opt-in is kept and retried automatically the next time they open the app,
  rather than being silently and permanently lost.

---

## 3. Where the forms go (webhook live; Notion write blocked, see §6)

All three website forms submit the same way: `assets/site.js` collects the
fields and POSTs JSON to one n8n webhook.

- **Endpoint:** `https://scn2a-krispierce.app.n8n.cloud/webhook/caregiver-course-intake`
- **Workflow:** "Caregiver Course - Website Form Intake" (n8n id `NNwZQpTpj12niO9m`) — **active**.
- It reads `formType`, routes on it, and creates the matching Notion page.

| Form | Page | `formType` | Lands in Notion | Notion DB id |
|---|---|---|---|---|
| Waitlist (home page) | `index.html` | `waitlist` | Participants | `48c6cd4d8ded4b4eb495d110909b2f41` |
| Sponsor enquiry | `sponsors.html` | `sponsor` | Sponsors | `b4f23c8ce0c045c186e51c3f284cac68` |
| Scholarship application | `apply.html` | `apply` | Participants (Entry Path = Scholarship) | `48c6cd4d8ded4b4eb495d110909b2f41` |

An unknown `formType` returns a 400 so nothing silently disappears. The forms
show a success or error state to the caregiver based on the webhook response.

---

## 4. Where the emails go (built, not yet sending)

Three scheduled workflows do the outbound email. Each one runs on a timer,
reads Notion, works out timing from each participant's own **Enrolled Date**
(the self-directed model, no cohorts), and sends through a **Gmail** node.

| Workflow | n8n id | Runs | Reads | Sends to | Status |
|---|---|---|---|---|---|
| Weekly Check-in Email | `EAJiUxr7PmcQmSAD` | Mondays 9am | Enrollments (`In Progress`) | each caregiver, that week's theme | ○ inactive |
| Week 8 Reassessment Invite | `TjjnyLql1ujJ1f53` | weekly | Enrollments at their week 8 | each caregiver, once | ○ inactive |
| Sponsor Impact Report | `hzyoWVhFrH1Jjp8I` | 1st of month, 8am | Sponsors + completed enrollments | each sponsor, cumulative impact | ○ inactive |

- **From address:** whatever Google account you connect to the Gmail node in
  n8n (the natural choice is the course's own mailbox, e.g. the
  `info@scn2aaustralia.org` account n8n already runs under, or
  krispconsulting@gmail.com).
- **To address:** the participant's or sponsor-contact's email, read from
  Notion.
- The Enrollments DB the weekly email reads is `437394770dc44d33970e349433d75384`.

---

## 5. Notion (the CRM)

| Database | id | Written by | Read by |
|---|---|---|---|
| Participants | `48c6cd4d8ded4b4eb495d110909b2f41` | Intake (waitlist + scholarship); App Events (opt-in enrolment) | you, manually; Enrollments link |
| Sponsors | `b4f23c8ce0c045c186e51c3f284cac68` | Intake (sponsor enquiries) | Sponsor Impact Report |
| Enrollments | `437394770dc44d33970e349433d75384` | App Events (opt-in enrolment), or you manually | all three email workflows |
| Wheel Submissions | `81d5e53cdf7d4707af1da562a3ee2b71` | App Events (baseline + week-8, opt-in only) | Sponsor Impact Report |

The Enrollments records carry the `Enrolled Date` that every email timer is
based on, plus rollups for participant name, email and completion status.

---

## 6. What is live vs what is switched off, and why

**Verified by live test (6 July 2026)**
- The intake webhook is registered and active; a real production execution
  showed the webhook, normalise and route steps all succeed.
- **But the Notion write fails**: `404 object_not_found ... Make sure the
  relevant pages and databases are shared with your integration "n8n"`. The
  Notion databases have never been shared with the n8n integration, so form
  submissions currently die at the final step (and the visitor sees the form's
  error message). This is the single blocker for all Notion reads and writes
  across all four workflows.
- The fix is one step in Notion, ~30 seconds: open the **🌿 Caregiver Wellness
  Course** page → ⋯ menu → Connections → add the **n8n** connection. All four
  databases live under that page, so one share covers everything.
- The database IDs and property names in every workflow were checked against
  the live Notion schemas: all correct, no mismatches.
- The Notion credential ("Notion account", `Hf9NTdK7UrSSnCTu`) is now attached
  to every Notion node in all four workflows (the three scheduled ones were
  missing it; fixed and re-verified by execution).

**Still switched off** (the three email/report workflows). Two things remain,
both needing your interactive sign-in:

1. **The Notion share above.**
2. **No email credential in n8n yet.** The account has Notion and Google
   Calendar credentials, but **no Gmail (or SMTP) credential**. The send nodes
   cannot deliver mail until one exists and is attached; creating it is an
   OAuth sign-in only you can approve.

Once both are done, each workflow just needs its toggle set to active. They
were deliberately not forced on: a workflow whose Gmail node has no credential
would simply fail on its first run.

---

## 7. Open connections worth deciding on

These are genuine gaps in the wiring, not bugs. Flagging them so they are a
choice, not a surprise.

1. ~~App completion does not create an Enrollment~~ **Resolved (pending the
   Notion share):** the consent-first App Events webhook now creates the
   Participant + Enrollment when a caregiver opts in with an email on sign-up.
   Caregivers who leave email blank stay fully private and off the CRM, which
   is by design.
2. ~~Nothing writes to the Wellbeing Journey Submissions database~~ **Resolved
   (pending the Notion share):** the same webhook records the Week 1 Baseline
   and Week 8 Reassessment submissions for opted-in caregivers, which is what
   the sponsor impact report aggregates.
3. **The website is not publicly hosted yet, but the deploy is ready.** A
   GitHub Pages workflow now lives at `.github/workflows/deploy-pages.yml`; it
   deploys `caregiver-wellness-course/website/` on every push to the default
   branch once you flip Settings → Pages → Source to "GitHub Actions". Note:
   on a free plan GitHub Pages needs the repo public; if it must stay private,
   point Cloudflare Pages or Netlify (free) at the same folder.
4. **Supabase is not connected, and the recommendation is to skip it for the
   pilot.** Local storage plus the optional enrolment webhook covers the pilot
   without account complexity; revisit only when cross-device sync genuinely
   matters.
5. **Marketing-site statistics are US-sourced.** A couple of figures on the home
   page cite 2015/2020 US caregiver data. The new framework wants Australian
   evidence first (ABS, AIHW, Carer Wellbeing Survey). Re-sourcing these should
   use verified Australian figures rather than swapping in unverified numbers,
   so it is parked with the framework's `[VERIFY]` items.

---

## 8. Activation checklist (the steps only you can do)

When you come back, this is the whole list to make forms and emails live:

1. **Share the Notion workspace page with n8n** (fixes the forms immediately):
   in Notion, open **🌿 The Caregiver Wellbeing Journey** → ⋯ → Connections → add
   **n8n**. This unblocks all four workflows' Notion steps at once.
2. In n8n, add a **Gmail** credential (or SMTP), signing in with the mailbox the
   course should send from.
3. Open each of the three email workflows and attach that credential to the
   **Send** node (the Notion nodes are already done):
   - Weekly Check-in Email (`EAJiUxr7PmcQmSAD`) → "Send Check-in Email"
   - Week 8 Reassessment Invite (`TjjnyLql1ujJ1f53`) → "Send Reassessment Invite"
   - Sponsor Impact Report (`hzyoWVhFrH1Jjp8I`) → "Send Impact Report Email"
4. Send yourself a test: submit the waitlist form (or re-run the intake
   workflow) and check a record appears in Participants; run the weekly email
   workflow once against a test Enrollment with an Enrolled Date in week 1 and
   check the email lands.
5. Toggle each workflow **Active**. (The App Events workflow
   `onnVc7WnOSEokgmP` is already published; it starts working the moment the
   Notion share is done.)
6. Enable GitHub Pages (Settings → Pages → Source: "GitHub Actions") so the
   deploy workflow in `.github/workflows/deploy-pages.yml` can publish the
   site, or point Cloudflare Pages/Netlify at
   `caregiver-wellness-course/website/` if the repo stays private.

Everything upstream of this (forms, routing, Notion writes, the week-timing
logic, the email content) is already built and waiting on these steps.
