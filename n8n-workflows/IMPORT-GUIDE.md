# Import Guide — Calendar → Meeting Notes

The MCP link between Claude and n8n kept dropping, so here's the workflow as a
file you import yourself. ~5 minutes. You've got this.

File to import: **`calendar-to-meeting-notes.json`** (in this folder)

---

## Step 1 — Import the workflow
1. In **n8n**, top-left **Workflows** → **Add workflow** (or the **•••** menu) → **Import from File**
2. Choose **`calendar-to-meeting-notes.json`**
3. You'll see 2 connected nodes: **New Calendar Event → Create Meeting Note in Notion**

## Step 2 — Attach your credentials (they show as "not found" after import — normal)
1. Click **New Calendar Event** node → in **Credential**, pick your **Google Calendar** account → close
2. Click **Create Meeting Note in Notion** node → in **Credential**, pick your **Notion** account → close

## Step 3 — Confirm the pickers resolved
1. In **New Calendar Event**: the **Calendar** field should show **krispconsulting@gmail.com** (if blank, pick it)
2. In **Create Meeting Note in Notion**: the **Database** field should show **📅 All Meetings** (if blank, search and pick it)
   - Then check the **Properties** section maps **Date** → the event's start. If a field looks off, fix it from the dropdown.

## Step 4 — Test it (this is the real test)
1. Open the **Create Meeting Note in Notion** node and click **Execute step** once (or click **Test workflow** at the bottom)
   - *Tip:* first put a test event on your Google Calendar — title **`TEST — meeting note`**, any time tomorrow — so there's something to pull in.
2. Open **📅 All Meetings** in Notion → a note **"TEST — meeting note"** should appear with the date filled in ✅

## Step 5 — Turn it on
- Top-right toggle → **Active**. Done. New gmail calendar events now auto-create meeting notes.

---

## If something errors

- **"Could not find database" / 404 from Notion** → you didn't connect the integration to the page. In Notion: open **🏠 Daily Dashboard** → **•••** → **Connections** → **Connect to** → **n8n**. Re-run.
- **Google "insufficient permissions"** → reconnect the Google Calendar credential and make sure calendar read scope was granted.
- **Note created but Date is empty** → the event was all-day; the workflow already handles both, but if it misses, tell me and I'll tweak the date expression.
- **Anything else** → copy the red error text and send it to me; I'll pinpoint the fix.

---

## What to tell me
- ✅ "it worked" → I'll move to Wave 2 (the Microsoft 365 calendars: scn2a + krispierce)
- ⚠️ paste any error → I'll fix the file and you re-import

> Note: this file has the gmail calendar + the All Meetings database already
> filled in. For Wave 2 I'll generate one of these per Microsoft calendar, each
> pre-set to auto-tag its stream.
