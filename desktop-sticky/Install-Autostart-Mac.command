#!/bin/bash
# One-time: make the sticky note open automatically every time you log in.

URL="https://scn2a-krispierce.app.n8n.cloud/webhook/kp-sticky-9f27?k=PASTE_KEY_HERE"
PLIST="$HOME/Library/LaunchAgents/com.krispierce.sticky.plist"

mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.krispierce.sticky</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Applications/Google Chrome.app/Contents/MacOS/Google Chrome</string>
    <string>--app=$URL</string>
    <string>--window-size=420,640</string>
    <string>--window-position=40,60</string>
  </array>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
EOF

launchctl unload "$PLIST" 2>/dev/null
launchctl load "$PLIST"
echo "Done — your sticky note will now appear every time you log in."
echo "(To remove:  launchctl unload \"$PLIST\" && rm \"$PLIST\")"
