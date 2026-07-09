#!/bin/bash
# Kris's desktop sticky note — double-click to open.
# Opens the live to-do sticky as a small chromeless window on your desktop.

URL="https://scn2a-krispierce.app.n8n.cloud/webhook/kp-sticky-9f27?k=PASTE_KEY_HERE"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
EDGE="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"

if [ -x "$CHROME" ]; then
  "$CHROME" --app="$URL" --window-size=420,640 --window-position=40,60 >/dev/null 2>&1 &
elif [ -x "$EDGE" ]; then
  "$EDGE" --app="$URL" --window-size=420,640 --window-position=40,60 >/dev/null 2>&1 &
else
  # Fallback: normal browser tab
  open "$URL"
fi
