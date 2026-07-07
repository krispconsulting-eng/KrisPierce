# Getting every email and calendar into one place

Goal: everything lands where Claude can see it — the **krispconsulting@gmail.com**
inbox and its Google Calendar — so the daily 6am scan and sticky email cover
all three worlds:

| Account | System | Route it via |
|---|---|---|
| Work (UNSW / kristine.pierce@unsw.edu.au) | Outlook | Forwarding rule + published calendar |
| SCN2A (kris@scn2aaustralia.org) | Outlook | Forwarding rule + published calendar |
| Personal / consulting | Gmail + Google Calendar | Already connected ✅ |

**Heads-up first:** Louise Fisher reported on 7 July that mail to
`kris@scn2aaustralia.org` is **bouncing** since "the changes". Fix that
before setting up forwarding, or forwarded mail will have nothing to forward.
Check the domain's MX records / mailbox status in the SCN2A email admin.

---

## Part 1 — Email: auto-forward both Outlook accounts to Gmail

### SCN2A (Outlook / Microsoft 365 — you control this one)

1. Open **outlook.office.com** signed in as kris@scn2aaustralia.org.
2. ⚙️ Settings → **Mail → Forwarding**.
3. Enable forwarding → `krispconsulting@gmail.com` → tick **Keep a copy of
   forwarded messages** → Save.
4. If the toggle is greyed out: Microsoft 365 admin center →
   Users → kris@ → Mail tab → **Manage email forwarding**. You may also need
   to allow external forwarding under Security → Anti-spam outbound policy.

### Work / UNSW (IT policy usually blocks auto-forwarding)

Universities almost always block rule-based external forwarding. Try, in order:

1. **Try the same Settings → Mail → Forwarding path.** If it saves, done.
2. **If blocked** — create an Outlook **rule** instead (Settings → Mail →
   Rules): *condition:* "I'm on the To line" or flagged; *action:* Forward to
   krispconsulting@gmail.com. Some tenants allow rules where they block
   account-level forwarding.
3. **If that's blocked too** (silent non-delivery is common — send yourself a
   test!), fall back to the calendar-only route below plus a habit: flag
   anything actionable, and add it to the app with the quick-add bar (10
   seconds) or tell Claude in chat, which files it into the database.

> Never forward OFFICIAL/sensitive government committee material
> (MSAC/HTA/[SEC=OFFICIAL] threads) to personal email — those already reach
> you at Gmail directly when the secretariat includes krispconsulting@, and
> the ones sent only to UNSW should stay there under their handling rules.

## Part 2 — Calendar: subscribe Google Calendar to both Outlook calendars

This is the reliable one — IT rarely blocks calendar publishing, and it gives
you **one merged view** in Google Calendar (and one place Claude reads).

For **each** Outlook account:

1. outlook.office.com → ⚙️ Settings → **Calendar → Shared calendars**.
2. Under **Publish a calendar**: pick your Calendar → "Can view all details"
   → **Publish**.
3. Copy the **ICS** link it generates.
4. Google Calendar (calendar.google.com) → left sidebar → **Other calendars →
   + → From URL** → paste the ICS link → Add.
5. Name them "UNSW (Outlook)" and "SCN2A (Outlook)" and give each a colour.

Notes:
- Google refreshes ICS subscriptions every few hours (not instant). Fine for
  a daily digest; don't rely on it for same-hour invites.
- If UNSW blocks publishing: in new Outlook you can instead **share** the
  calendar directly to krispconsulting@gmail.com ("Can view all details") —
  Google can subscribe to the sharing invitation link the same way.
- Once added, tell Claude and the daily scan will include both feeds.

## Part 3 — What the daily 6am routine then covers

1. Gmail inbox (which now includes both Outlook streams) — new actionable
   items get triaged 🔴/🟡/🟢 into the to-do database.
2. Google Calendar + the two subscribed Outlook calendars — today's and this
   week's meetings.
3. The sticky-note email lands in your inbox; the same list is always live at
   the app's **/today** page.
