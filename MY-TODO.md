# ✅ MY TO-DO — Wave 1 (Calendar → Meeting Notes)

Just the steps **you** do. ~10 minutes, one time. Tick as you go.
Full detail is in `automation-setup.md` if you want the extra hand-holding.

---

## Part A — Connect Notion to n8n

- [ ] 1. Go to **notion.so/my-integrations** → **+ New integration** → name it **`n8n`** → workspace **Kris Pierce's Space** → **Save**
- [ ] 2. **Show** + **Copy** the *Internal Integration Secret* (long code, starts `ntn_` or `secret_`)
- [ ] 3. ⚠️ Open your **🏠 Daily Dashboard** in Notion → **•••** (top right) → **Connections** → **Connect to** → **n8n**
      *(this shares the dashboard + all its databases with n8n)*
- [ ] 4. In **n8n** → **Credentials** → **+ Add credential** → **Notion API** → paste the secret → **Save**

## Part B — Connect Google Calendar (gmail) to n8n

- [ ] 5. In **n8n** → **Credentials** → **+ Add credential** → **Google Calendar OAuth2 API**
- [ ] 6. Click **Sign in with Google** → choose **krispconsulting@gmail.com** → **Allow**
      *(No "Sign in with Google" button? Tell me "I'm self-hosted")*

## Part C — Tell me

- [ ] 7. Reply **"accounts connected"**

---

# 🧪 THE TEST (after I build the workflow)

Once you say "accounts connected," I build the automation. Then **you run this test**:

- [ ] 1. Open **Google Calendar** (krispconsulting@gmail.com)
- [ ] 2. Create a test event: title **`TEST — meeting note`**, any time tomorrow
- [ ] 3. Wait ~1 minute (or tell me and I'll trigger it)
- [ ] 4. Open **📅 All Meetings** in Notion
- [ ] 5. ✅ A note titled **"TEST — meeting note"** should appear, with the date filled in
- [ ] 6. Tell me if it showed up (or didn't) — then we either celebrate or I fix it

---

**That's it.** Everything else (building, wiring, testing logic) is on me.
You connect 2 accounts and run 1 test event. 🎯
