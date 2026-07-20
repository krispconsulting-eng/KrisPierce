# Desktop sticky note

A real sticky note on your desktop showing today's to-dos, live from the
database (red / yellow / green + meetings). It's a tiny chromeless browser
window pointed at a page served by your n8n ("KP Sticky Page" workflow), and
it refreshes itself every 5 minutes — whatever the daily 6am scan adds shows
up automatically.

## Mac (your laptop)

1. Download `KP-Sticky-Mac.command` (or pull this repo).
2. First time only: right-click → Open (to get past Gatekeeper). If macOS
   says it can't verify the developer: System Settings → Privacy & Security →
   "Open Anyway". Or in Terminal: `chmod +x KP-Sticky-Mac.command` first.
3. A little yellow sticky window appears. Drag it wherever you like.
4. Want it there every morning without thinking? Double-click
   `Install-Autostart-Mac.command` once — it opens at every login.

## Windows (work PC)

1. Copy `KP-Sticky-Windows.bat` anywhere and double-click it.
2. To auto-start: Win+R → type `shell:startup` → Enter → copy the .bat file
   into that folder.

## Notes

- The page URL contains a private key — treat it like a password (anyone
  with the exact link can read your to-do list). To get your copy, use the ready-made files Claude sent you in chat (they contain the real key), or replace PASTE_KEY_HERE with the key from the "KP Sticky Page" workflow in n8n. To rotate it, change the
  key in the "KP Sticky Page" n8n workflow and in these launcher files.
- Ticking things off happens in the app (or tell Claude); the sticky is a
  read-only glanceable view by design.
