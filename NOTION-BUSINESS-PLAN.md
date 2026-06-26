# Kris Pierce — Notion Business System

**A plan to run your whole work-life out of one place, without it falling apart.**

Status: 📋 **PLAN — nothing built yet.** Read this, tell me what to change, then we build in order.
Last updated: 2026-06-26

---

## 0. Read this first (the 30-second version)

You do four kinds of work: **consulting, clinical research, content, and building software.** Right now it lives in your head and across a dozen apps. That's the problem — not laziness, just too many open loops.

This plan builds **one brain (Notion)** that everything feeds into, while **you keep using Todoist for tasks** (so you don't relearn anything). You **capture by voice**, you **look at one screen a day**, and over time the boring copy-paste work gets automated away.

We build it in **small phases**. Each phase is tested before the next one starts. Nothing goes live until it actually works. That's the "foolproof" part.

**Your job right now:** read sections 1–3, then react. You don't need to read the whole thing.

---

## 1. The three rules this whole system obeys

These are the ADHD-proofing rules. Everything below follows them.

1. **One way in.** You capture thoughts ONE way (voice). Never decide "where does this go?" in the moment — that decision is what kills systems. Dump now, sort later.
2. **One place to look.** You open ONE dashboard per mode (Work, Life). It shows you what matters today. You never go hunting.
3. **Build trust before building features.** A small system you actually use beats a big system you abandon. We add a layer only after the previous one is a habit.

If anything we build later breaks these rules, we cut it.

---

## 2. What "the brain" looks like (plain English)

Think of Notion as a set of connected lists. Here are the lists (Notion calls them *databases*) and what each one is for:

| The list | What goes in it | Why you need it |
|---|---|---|
| **📥 Inbox** | Raw voice dumps, before sorting | So you never have to decide where something goes in the moment |
| **👤 Contacts** | People & companies | Know who's who, who owes you, who to follow up |
| **📂 Projects** | The hub — every piece of work | The center everything else links to |
| **🗓️ Meetings** | Notes + action items from every call | So follow-ups never get lost |
| **💰 Money** | Invoices, what's billed, what's paid | So you actually get paid on time |
| **📚 Research** | Papers, trials, sources | A searchable library instead of 40 browser tabs |
| **🎬 Content** | Ideas → script → record → publish | So content stops dying at the "idea" stage |

**Tasks are NOT in this table on purpose.** Tasks live in **Todoist** (your existing habit). Notion *shows* your tasks but doesn't replace Todoist. You keep one task app. No double-entry. (More in §4.)

**How they connect (the magic part):**
Open a **Project** and you instantly see — the client, every meeting note, the invoices, the content tied to it, and the research you saved for it. One click, full picture. That's what relations do.

```
                 ┌─────────────┐
                 │   PROJECT   │  ← the hub
                 └──────┬──────┘
       ┌───────┬────────┼────────┬─────────┐
   Contact  Meetings   Money   Content   Research
   (client) (notes)  (invoices)(pipeline)(library)
```

---

## 3. How you'll actually use it day to day

This is the part that has to feel effortless. Three moments:

### ☀️ Morning (1 minute)
Open your **Work dashboard**. It shows:
- 🔥 What's hot today (tasks due, from Todoist)
- 🗓️ Today's meetings
- 📥 Anything in your Inbox to sort (usually 30 seconds)
- 💰 Anyone overdue on payment

You see the day in one screen. Close it. Go.

### 🧠 During the day (capture in one tap)
A thought hits — a task, an idea, "remember to email Dana," a content concept. You **say it out loud into your phone.** It lands in your Inbox (or Todoist if it's a clear task). You don't stop what you're doing. You don't file it. **Dump and move on.**

### 🌙 End of day (2 minutes, optional)
Quick glance at the Inbox: each dump gets a home (turn into a project, a task, a research note, delete). This is the only "filing" you do, and it's tiny because the system sorts most of it for you.

### 🏠 Life mode
A **separate Life dashboard** — personal tasks, appointments, errands. Kept apart so work doesn't bleed in and overwhelm you. Same capture, different view.

---

## 4. The two decisions that keep this from breaking

### Decision A: Tasks stay in Todoist. Notion mirrors them.
You already live in Todoist. Forcing tasks into Notion would mean relearning a habit and risking double-entry (the classic way these systems die). So:
- **Todoist = the source of truth for tasks.** Quick-add, voice-add, reminders — all stay exactly as they are.
- **Notion = shows a read-only view** of relevant Todoist tasks on your dashboards, linked to the right project.
- You tag a Todoist task with a project name; it shows up under that project in Notion automatically (via automation, Phase 5).

### Decision B: Voice capture — the simplest pipe (my recommendation)
You said "recommend simplest." Here it is, lowest friction, no new app:

- **Tasks** → speak into **Todoist quick-add** (tap, hold mic, talk). You already have this.
- **Non-task thoughts** (ideas, notes, "save this") → speak into the **same Todoist inbox**, but start with a trigger word like **"NOTE:"** or **"IDEA:"**.
- An automation (Phase 5) reads those trigger words and **routes them into the right Notion list** automatically. No second app, no decision in the moment.

> If you'd rather use a dedicated voice-note app (e.g. a recorder that transcribes), we can swap that in — but the above means **one app, one tap**, which is the ADHD-safe default.

---

## 5. ⚠️ Risks I'm flagging before we touch Notion

You said "not sure" on sensitive data, so I designed the safe version. Read these — they matter.

1. **🟢 Health data — RESOLVED.** You confirmed: **no patient-level health data** goes in the system, only **names and addresses** (contact info). That means **no HIPAA constraint** — good, it keeps things simple. We still treat names/addresses as private personal data: they live in restricted spaces, never in any public or shared-link page. The rule stays on the books as a guardrail: *if that ever changes and real patient data enters the picture, it does NOT go in Notion* (Notion isn't HIPAA-compliant without Enterprise + a signed BAA).
2. **🟠 Client confidentiality.** No strict NDAs flagged, but client work still goes in a **restricted Notion teamspace** that only you (and named collaborators) can see. "Me + a few people" means we set permissions per space, not all-or-nothing.
3. **🟠 The "few people" on your team.** Each person gets access only to what they need. We design this from day one so it doesn't become a cleanup job later.
4. **🟡 Automation tokens.** The API connections use access keys. We store them safely (never in Notion, never in this repo) and connect one service at a time so a single bad key can't expose everything.
5. **🟡 Don't boil the ocean.** Your honest "all of the above" answer is the biggest risk. If we build all 7 lists + all automations at once, you'll bounce off it. The phased plan below is deliberately slow on purpose.

**Please confirm #1 and #2** before we build — they decide the whole privacy structure.

---

## 6. What "the API" actually does here

You asked "what and how." The Notion **API** is just the wiring that lets your other apps put things into Notion automatically, so you stop copy-pasting. Examples of what we'll wire:

- 📅 **Calendar event → Meeting note** auto-created in Notion, pre-linked to the project.
- 📧 **Important client email → a follow-up** logged so it can't be forgotten.
- ✅ **Meeting action items → Todoist tasks** with the right project tag.
- 📚 **A paper/trial you found → saved to Research** with one command.
- 💰 **Invoice marked unpaid for 30 days → a reminder** surfaces on your dashboard.
- 🎬 **Content moves a stage → the next step appears** as a task.

**How the wiring runs:** ✅ **Decided — we use [n8n](https://n8n.io) as the automation hub.** It's visual, always-on, and you can pause any single piece if it misbehaves. It connects to Notion, Todoist, Calendar, Gmail, etc., and we add one workflow at a time. (n8n can be self-hosted for full data control, or run on n8n Cloud — we'll pick when we get to Phase 5.) For anything n8n can't do, we fall back to a small custom script.

We'll only switch on automations in Phase 5, one at a time, each tested before the next.

---

## 7. The build order (phases — this is the plan)

Each phase has a **Definition of Done** and a **Foolproof check** (how we *prove* it works before moving on). We do not skip ahead.

### Phase 0 — Approve this plan ← *you are here*
- **Done when:** you've read §1–§5 and told me what to change.
- **Check:** you can explain the system in one sentence back to me.

### Phase 1 — The skeleton (no automation)
Build the 7 lists, the relations between them, and the **Work + Life dashboards**. Enter 3–4 *real* items by hand (one real client, one real project) so it's not empty and abstract.
- **Done when:** you can open the Work dashboard and see a real project with its client, a note, and a task linked.
- **Foolproof check:** you add one real project yourself in under 2 minutes without asking me how.

### Phase 2 — Capture (the most important phase)
Set up the voice → Inbox pipe and the 2-minute triage habit. Get this rock-solid before anything else, because capture is the foundation.
- **Done when:** a voice dump reliably lands somewhere you trust.
- **Foolproof check:** for 3 days straight, nothing you think of gets lost.

### Phase 3 — Money + Meetings
Invoice tracker (billed / paid / overdue) and Calendar → Meeting-note automation. These two stop the most expensive leaks: unpaid invoices and dropped follow-ups.
- **Done when:** every meeting auto-logs and you can see who owes you at a glance.
- **Foolproof check:** an overdue invoice shows up on your dashboard on its own.

### Phase 4 — Research + Content
The Research library (PubMed / Clinical Trials / Scholar saves) and the Content pipeline (idea → publish).
- **Done when:** you can save a source in one step and move a content idea down the pipeline.
- **Foolproof check:** one piece of content goes from idea to "scheduled" entirely inside the system.

### Phase 5 — Automation layer
Turn on the wiring from §6, **one integration at a time.** Test each for a day before adding the next. If one misbehaves, we pause just that one.
- **Done when:** the copy-paste work you do today is gone.
- **Foolproof check:** you go a full day without manually moving info between two apps.

### Phase 6 — Polish + review
Trim anything you don't use. Tighten the dashboards. Write a one-page "how my system works" cheat sheet (for you and the team).
- **Done when:** the system feels lighter than when we started, not heavier.
- **Foolproof check:** two weeks of real use with no abandoned pieces.

---

## 8. What I need from you to start Phase 1

**✅ Answered:**
- Privacy: no patient health data, only names & addresses → no HIPAA constraint. No strict NDAs.
- Automation hub: **n8n**.

**Still need from you (short answers fine):**
1. **The team:** Roughly how many people, and what should they NOT be able to see?
2. **Anything in §2's list of 7 you DON'T want?** (Fewer is better if you're unsure.)
3. **Voice trigger words:** happy with "NOTE:" / "IDEA:" or want different ones?

Answer those and I'll start Phase 1 — and still **nothing goes live in Notion until you've seen the skeleton and approved it.**

---

## 9. Quick glossary (no jargon left behind)

- **Database / list** — a smart table in Notion (your Projects, Contacts, etc.).
- **Relation** — a link between two lists (a Project linked to its Client).
- **Dashboard** — a single page that pulls in what matters so you don't go hunting.
- **API** — the wiring that lets apps talk to each other automatically.
- **Automation hub (Make.com / n8n)** — the traffic controller that runs the wiring.
- **BAA** — the legal agreement required for software to legally hold health data.
- **Source of truth** — the ONE official place a type of info lives (Todoist for tasks).

---

*Next step: you react to §8. I update this doc. Then Phase 1. Slow is smooth, smooth is fast.*
