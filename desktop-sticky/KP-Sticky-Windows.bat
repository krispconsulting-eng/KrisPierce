@echo off
rem Kris's desktop sticky note (work PC) - double-click to open.
set URL=https://scn2a-krispierce.app.n8n.cloud/webhook/kp-sticky-9f27?k=PASTE_KEY_HERE
start "" msedge --app="%URL%" --window-size=420,640 --window-position=40,60
rem To auto-start at login: press Win+R, type  shell:startup  and copy this file there.
