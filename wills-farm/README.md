# Will and the Missing Highland Cow

A calm, cosy adventure game set on an Australian coastal farm — the Phase 1
web prototype from the game design document (v0.2), built for one particular
young man on the Sunshine Coast, and for everyone who plays like he does.

Rocky, the farm's golden escape artist, has done it again. Will — the boy who
notices things — sets out with Cleo the dog, Freddie the loyal Highland cow
and Pearl the pelican to bring him home. No timers, no losing, no reading
required.

## Play it

It's a fully static web app: no build step, no dependencies, no network calls.

```bash
cd wills-farm
python3 -m http.server 8000
# open http://localhost:8000 — best on an iPad in landscape
```

Or deploy the `wills-farm/` folder to any static host.

## How it plays

The whole game runs on a two-tap sentence that mirrors AAC structure:
**who, then what**.

- Tap **Will**, then the **gate** — Will walks over and opens it.
- Tap **Cleo**, then the **bushes** — she flushes out a clue.
- Tap **Pearl**, then the **water** — she dives for fish.
- One tap always gets a response. Nothing requires dragging, gestures,
  speed or holding. There is no way to do any of it wrong.

The story: the farm (Rocky's spot is empty…), the paddock gate, the creek,
the orchard, the headland (with Ella's cameo — the one branch two taps can't
move), and the beach reunion. Afterwards the whole farm stays open for free
play: Ella's outdoor gym appears, Freddie loves being brushed, Rocky licks
the screen, and the sticker book keeps the five found things.

## Access is the default state

- Direct touch, all targets comfortably over 75pt, forgiving hitboxes.
- One tap always answers; the consistent two-tap grammar does the rest.
- No reading in play. Will speaks in single AAC core words (*go, look, open,
  found, home, help*), each paired with its symbol on screen.
- Fully playable with sound off; every sound is soft and naturalistic
  (synthesised in WebAudio — no sudden loud events).
- Nothing flashes, ever. Scene changes are slow cross-fades over one second.
  The idle shimmer pulses well under once per second.
- `prefers-reduced-motion` is honoured; a grown-ups area (press-and-hold the
  corner button) has independent sliders for background sound, effects/voice
  and animation intensity, plus larger shimmer cues.
- Keyboard / switch-style access: every interactive element is focusable and
  activates with Enter or Space; VoiceOver-style labels on everything.
- No ads, no notifications, no streaks, no timers, nothing to buy. Progress
  and stickers save locally and resume automatically.

## Structure

```
wills-farm/
  index.html        shell, HUD, overlays (sticker book, farm map, grown-ups)
  css/style.css     palette + hard animation rules (epilepsy-safe, calm)
  js/audio.js       WebAudio synth: cow lows, bill-claps, water, the thump
  js/art.js         SVG builders for the cast, props, symbols and stickers
  js/engine.js      the two-tap grammar, walking, bubbles, shimmer, saves
  js/scenes.js      the six scenes and their story beats
  js/main.js        title screen, settings, overlays wiring
```

Character canon follows the picture-book sheet: Rocky is the escape artist
(wild fringe, one crooked horn, unrepentant), Freddie is the loyal one who
travels with Will, Cleo supervises everyone, Pearl delivers the news in
bill-pictures, and nobody reacts to anybody's thing — it's simply part of
their silhouette.
