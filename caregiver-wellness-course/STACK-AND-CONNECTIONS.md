# Caregiver Wellbeing Course: Stack and Connections

A single, honest map of the whole system: what each piece is, where the data
actually flows, what is live right now, and the short list of steps only you
can complete (they need interactive sign-in that an automated session cannot
do for you).

Last traced: 5 July 2026, against the live n8n instance
`scn2a-krispierce.app.n8n.cloud` and the repo on branch
`claude/caregiver-wellness-course-arch-vqurrm`.

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
                          n8n WEBHOOK  "Website Form Intake"   ● LIVE
                          /webhook/caregiver-course-intake
                                     │  creates a page
                                     ▼
                                 NOTION  (the CRM)
                          Participants DB / Sponsors DB

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

## 3. Where the forms go (this is live)

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

**Live now**
- Website forms → n8n intake → Notion Participants/Sponsors. Working end to end.
- The Notion credential ("Notion account", n8n id `Hf9NTdK7UrSSnCTu`) exists and
  the intake workflow uses it successfully.

**Built but switched off** (the three email/report workflows). Two things hold
them back, and both need your interactive sign-in, which is why they are left
for you rather than flipped on blindly:

1. **No email credential in n8n yet.** The account currently has a Notion
   credential and three Google **Calendar** credentials, but **no Gmail (or
   SMTP) credential**. The send nodes cannot deliver mail until one exists and
   is attached. Creating it is an OAuth sign-in that only you can approve.
2. **The workflows are inactive.** Once the email credential is attached and the
   Notion databases are confirmed shared with the Notion integration, each
   workflow just needs its toggle set to active.

I deliberately did **not** force these on: activating a workflow whose Gmail
node has no credential would simply fail on its first run, which is not a real
"done".

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
2. **The accountability-partner invite is screen-only.** In the app, "Send the
   invitation" marks it done and awards the badge, but no email is actually
   sent. Wiring it would need the same email credential as §6, plus a tiny
   webhook the app can call.
3. **Supabase is not connected.** Until it is, progress is per-browser only (no
   cross-device, no real accounts). Fine for a pilot; needed before you want
   people picking the course back up on another device.
4. **Marketing-site statistics are US-sourced.** A couple of figures on the home
   page cite 2015/2020 US caregiver data. The new framework wants Australian
   evidence first (ABS, AIHW, Carer Wellbeing Survey). Re-sourcing these should
   use verified Australian figures rather than swapping in unverified numbers,
   so it is parked with the framework's `[VERIFY]` items.

---

## 8. Activation checklist (the steps only you can do)

When you come back, this is the whole list to make the email side live:

1. In n8n, add a **Gmail** credential (or SMTP), signing in with the mailbox the
   course should send from.
2. Open each of the three email workflows and attach that credential to the
   **Send** node:
   - Weekly Check-in Email (`EAJiUxr7PmcQmSAD`) → "Send Check-in Email"
   - Week 8 Reassessment Invite (`TjjnyLql1ujJ1f53`) → its send node
   - Sponsor Impact Report (`hzyoWVhFrH1Jjp8I`) → "Send Impact Report Email"
3. Confirm the three Notion databases (Participants, Sponsors, Enrollments) are
   **shared with the Notion integration** tied to the "Notion account"
   credential.
4. Send yourself a test: use each workflow's "execute" once with a test
   Enrollment whose Enrolled Date puts it in week 1, and check the email lands.
5. Toggle each workflow **Active**.
6. Decide on the §7.1 question: manual enrolment for the pilot, or wire the app
   to create Enrollments automatically.

Everything upstream of this (forms, routing, Notion writes, the week-timing
logic, the email content) is already built and waiting on these steps.
