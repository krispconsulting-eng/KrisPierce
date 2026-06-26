# Automation Setup — Connecting Accounts to n8n

This is your one-time setup checklist so n8n can run your automations.
Do it once, tell me "done," and I'll build + test the first automation live.

**For the first automation (Calendar → Meeting notes) you need 2 connections:**
1. 🟦 **Notion** — so n8n can create meeting notes in your workspace
2. 🟩 **Google Calendar** — so n8n can see new events

Take your time. Each step says exactly what to click. ☕

---

## 🟦 Part 1 — Connect Notion (≈5 min)

n8n writes into Notion using a free "internal integration." You create it, copy
its secret key, share your dashboard with it, then paste the key into n8n.

### A. Create the integration
1. Go to **https://www.notion.so/my-integrations**
2. Click **+ New integration**
3. Name it **`n8n`**
4. Under "Associated workspace," pick **Kris Pierce's Space**
5. Click **Save**
6. On the next screen, find **Internal Integration Secret** → click **Show** → **Copy** it.
   (It's a long string starting with `ntn_` or `secret_`. Keep it somewhere safe for a moment — you'll paste it into n8n in step C.)

### B. Give the integration access to your pages ⚠️ (the step people forget)
1. In Notion, open your **🏠 Daily Dashboard** page.
2. Top-right **•••** (More) → scroll to **Connections** → **Connect to** → choose **n8n**.
3. Confirm. This shares the Daily Dashboard **and everything under it** (All Meetings, All Tasks, Contacts, Money, Research, Content, Capture) with n8n in one move.

> Without step B, n8n can't see your databases even with the key. If a workflow later says "could not find database," it's almost always this.

### C. Add the key to n8n
1. In **n8n**, go to **Credentials** (left sidebar) → **+ Add credential**
2. Search for **Notion API** → select it
3. Paste your **Internal Integration Secret** into the **API Key** field
4. Click **Save**. If it says "Connection tested successfully," ✅ you're done with Notion.

---

## 🟩 Part 2 — Connect Google Calendar (≈3–10 min)

How easy this is depends on whether your n8n is **Cloud** or **self-hosted**.
Try Path A first; if you don't see a "Sign in with Google" button, use Path B.

### Path A — n8n Cloud (easy, most common)
1. In **n8n**: **Credentials** → **+ Add credential**
2. Search **Google Calendar OAuth2 API** → select it
3. Click **Sign in with Google**
4. Choose **krispconsulting@gmail.com** and **Allow** the calendar permissions
5. It returns to n8n and says connected ✅

### Path B — Self-hosted n8n (if Path A had no Google sign-in button)
This needs a free Google Cloud OAuth client. Tell me "I'm self-hosted" and I'll
give you the exact Google Cloud Console steps (create OAuth client, copy the
redirect URL from n8n, paste Client ID + Secret). It's ~10 minutes; I'll walk
each click.

---

## ✅ When you're done

Reply with **"accounts connected"** (and tell me if Google was Path A or B).
Then I'll:
1. Build the **Calendar → Meeting notes** workflow in your n8n
2. Run a live test with a real/test calendar event
3. Show you the meeting note it created in Notion
4. Only then turn it on for good

---

## What this automation will do (so you know what you're switching on)

> When a new event appears on your Google Calendar, n8n automatically creates a
> matching note in your **📅 All Meetings** database — pre-filled with the title,
> date, and a notes template — so you're never scrambling to set up a meeting
> note. You just open it and type. (Later we can auto-link it to the right
> stream/project and turn its action items into tasks.)

---

## Accounts you'll add later (not needed yet)

- **Todoist** — for the voice-capture automation (just an API token, very quick)
- **Gmail** — if we automate client-email follow-ups

We'll do those when we get to those automations. One at a time.
