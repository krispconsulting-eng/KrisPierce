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
        ├─ uses ─────────────►  THE APP  (Wellness Wheel)
        │                       React + Vite, static files under website/app/
        │                       Saves progress in the browser (local storage).
        │                       Optional Supabase sync (not configured yet).
        │                       Does NOT talk to n8n or Notion at all.
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

## 2. The app (Wellness Wheel)

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
- **Important:** the app is self-contained. It does **not** post anything to
  n8n or Notion. Completing the reflection in the app does not, by itself,
  create any record in the CRM. See the gap in §7.

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
| Participants | `48c6cd4d8ded4b4eb495d110909b2f41` | Intake (waitlist + scholarship) | you, manually; Enrollments link |
| Sponsors | `b4f23c8ce0c045c186e51c3f284cac68` | Intake (sponsor enquiries) | Sponsor Impact Report |
| Enrollments | `437394770dc44d33970e349433d75384` | (currently manual, see §7) | all three email workflows |

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

1. **App completion does not create an Enrollment.** A caregiver can finish the
   reflection and plan in the app, but nothing writes them into the Notion
   Enrollments DB that the weekly emails read. Right now enrolment is a manual
   step (you create the Enrollment with an Enrolled Date). Options: keep it
   manual for the pilot; or add a small "start my plan" call from the app to a
   new n8n webhook that creates the Enrollment. Deciding this depends on whether
   you want accounts (Supabase) or want to stay account-free.
2. **Nothing writes to the Wellness Wheel Submissions database.** The sponsor
   impact report reads baseline/week-8 wheel results from a Submissions DB
   (`81d5e53cdf7d4707af1da562a3ee2b71`), but the app never sends results
   anywhere, so the report would always show "n/a" changes. This resolves
   together with gap 1 (the same app→n8n webhook can record wheel results,
   anonymised, at baseline and week 8).
3. **The website is not publicly hosted yet.** The site is a folder in the repo
   (plus claude.ai mock-up artifacts). Until it is deployed somewhere public
   (any static host works: GitHub Pages, Netlify, Cloudflare Pages, all free),
   no real visitor can reach the forms at all.
4. **Supabase is not connected.** Until it is, progress is per-browser only (no
   cross-device, no real accounts). Fine for a pilot; needed before you want
   people picking the course back up on another device.
5. **Marketing-site statistics are US-sourced.** A couple of figures on the home
   page cite 2015/2020 US caregiver data. The new framework wants Australian
   evidence first (ABS, AIHW, Carer Wellbeing Survey). Re-sourcing these should
   use verified Australian figures rather than swapping in unverified numbers,
   so it is parked with the framework's `[VERIFY]` items.

---

## 8. Activation checklist (the steps only you can do)

When you come back, this is the whole list to make forms and emails live:

1. **Share the Notion workspace page with n8n** (fixes the forms immediately):
   in Notion, open **🌿 Caregiver Wellness Course** → ⋯ → Connections → add
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
5. Toggle each workflow **Active**.
6. Deploy the website to a public host (see §7.3) so real visitors can reach it.
7. Decide on the §7.1 question: manual enrolment for the pilot, or wire the app
   to create Enrollments automatically.

Everything upstream of this (forms, routing, Notion writes, the week-timing
logic, the email content) is already built and waiting on these steps.
