# Handoff: Sky & Tide — Caregiver Retreat Design System & Wellness Wheel

## Overview
Sky & Tide is a calm, light brand system for a **caregiver course / online retreat**. Its flagship, interactive asset is the **Caregiver Wellness Wheel**: an eight-dimension radial self-check scored 0–5. This package covers the full design system (colour, type, components) and the wheel, plus an applied retreat landing page.

The system is a deliberate **sibling to the existing Kris Pierce Consulting brand**: same blue-and-teal co-lead logic and cream-paper restraint, lifted lighter and gentler for a self-care context.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, **not production code to copy directly**. They are authored in a lightweight in-house template runtime (`.dc.html`), so do not lift their markup verbatim.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established patterns, component library, and tokens. If no environment exists yet, choose the most appropriate framework for the project and implement there. Everything needed to rebuild is described in this README; the HTML is a visual reference only.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, and interactions. Recreate the UI pixel-perfectly using the codebase's existing libraries and patterns. All hex values, font weights, and sizes below are canonical.

---

## Design Tokens

### Colour — core palette
| Token | Hex | Role |
|---|---|---|
| `--sky` (lead) | `#7CA7C4` | Hero panels, overlines, links |
| `--tide` (partner) | `#5FA0A0` | Accents, chips, secondary marks |
| `--deep` | `#4A7690` | Primary buttons, text accents |
| `--deep-ink` | `#2C4652` | Dark surfaces/footers, secondary-button outline |
| `--ink` | `#20303A` | Headings and body text |
| `--sand` | `#E4D9C6` | Quiet warm accent, chips |
| `--paper` | `#F7F8F6` | Page and card background |
| `--sky-mist` | `#DCE8EF` | Soft blue section background |
| `--tide-mist` | `#D9E8E5` | Soft teal section background |
| `--page-bg` | `#EDEFEA` | Outer canvas behind the max-width column |

Text tints used: muted body `#5c6b72`, caption/label grey `#8593a0` / `#93a0a6`.

### Colour — Wellness Wheel dimensions
Eight dimensions, each a colour + a chip tint. All muted at similar lightness so the wheel reads harmonious.

| # | Dimension | Colour | Tint | Icon (Lucide) |
|---|---|---|---|---|
| 1 | Rest & sleep | `#7CA7C4` | `#DCE8EF` | moon |
| 2 | Body & energy | `#5FA0A0` | `#D9E8E5` | activity |
| 3 | Emotions | `#C98F97` | `#F0DEE0` | heart |
| 4 | Connection | `#8E9AC8` | `#E4E4EF` | users |
| 5 | Boundaries | `#6E8570` | `#DFE7DC` | shield |
| 6 | Purpose | `#4A7690` | `#D6E2EA` | compass |
| 7 | Joy & play | `#CDA66B` | `#F0E6D2` | sun |
| 8 | Support | `#8093A6` | `#E1E5EC` | hand-heart |

### Typography
- **Display — Newsreader** (serif). Weights: Light 300 (hero + section), Regular 400, plus *italic* for emphasis. Tracking ~-0.01em on large sizes.
- **Text — Hanken Grotesk** (sans). Weights: Regular 400 (body), Medium 500 (UI), SemiBold 600 (labels).
- **Overline:** Hanken Grotesk, 11px, uppercase, letter-spacing `0.24em`, colour `--deep` `#4A7690`.

Type scale (px / line-height):
| Role | Font | Size | LH | Weight |
|---|---|---|---|---|
| Hero | Newsreader | 44–56 | 1.03 | 300 |
| Section title | Newsreader | 30–38 | 1.12 | 300 |
| Card title | Newsreader | 19–21 | 1.2 | 400 |
| Body | Hanken Grotesk | 14–16 | 1.6–1.7 | 400 |
| UI / button | Hanken Grotesk | 13–14 | 1 | 500 |
| Caption / hex | Hanken Grotesk / mono | 11–12.5 | 1.5 | 400 |

### Spacing
4px base scale. Common: card padding 20–30px, panel padding 34–48px, section gaps 16–24px, hero padding 60–64px. Max content column **1040–1120px**, centred.

### Radius
Cards 16–18px · panels 22–26px · buttons & chips full pill `999px` · icon chip circle 46px.

### Shadow
Soft, diffuse, ink-tinted (never pure black):
- Card: `0 1px 0 rgba(32,48,58,.05), 0 14px 30px -22px rgba(32,48,58,.3)`
- Panel/hero: `0 1px 2px rgba(30,40,45,.06), 0 20px 50px -30px rgba(30,40,45,.34)`
- Hairline border: `rgba(32,48,58,.07–.12)`

### Gradient
`linear-gradient(150deg, #4A7690, #5FA0A0)` — hero panels, module-card headers, photo scrims.

---

## Screens / Views

### View A — Wellness Wheel design-system page (`Wellness Wheel.dc.html`)
**Purpose:** the interactive self-check plus its full asset kit.

**Layout:** single centred column, max-width 1040px, page bg `#EDEFEA`, sections stacked with 20–44px gaps.

**Components, top to bottom:**
1. **Masthead** — overline "SKY & TIDE · DESIGN SYSTEM"; hero title "The Caregiver *Wellness Wheel*" (Newsreader 44px/300, "Wellness Wheel" italic 400); intro paragraph (`#5c6b72`, max 520px); right-aligned meta caption.
2. **Hero card** — paper `#F7F8F6`, radius 26px, panel shadow, padding 38–40px. Two columns: `400px` wheel + flexible legend.
   - **Wheel** (see "Wellness Wheel component" below), 400×400.
   - Below wheel: two pill buttons — **Sample reading** (primary: `#4A7690` fill, white, 11×18px, pill) and **Clear** (secondary: transparent, 1.5px `#2C4652` outline, `#2C4652` text). Helper caption underneath.
   - **Legend** — 8 rows, each: 16px colour dot (SVG circle, dimension colour) · dimension name (Hanken 14/500 `#20303A`) · five 15px score dots (filled = dimension colour, empty = `#E4EAED`, clickable) · score number (Hanken 14/500 `#4A7690`, 22px wide, right-aligned). Row divider `rgba(32,48,58,.07)`.
3. **Anatomy** — 3 equal cards (Hub / Wedge / Depth), paper, radius 16px, title 13/500 + description 12.5/400 `#5c6b72`.
4. **Dimension assets** — overline + 4-column grid of 8 cards. Each: 46px icon chip (bg = tint, ~1.9px-stroke line icon in dimension colour, 23px), name (15/500), description (12.5/400 `#5c6b72`), hex label (11px mono `#93a0a6`).
5. **Score scale** — panel bg `#DCE8EF`, radius 22px. Overline + Newsreader 26/300 heading. 6-column grid, each cell: paper `#F7F9FA`, radius 14px, big number (Newsreader 26 `#4A7690`), a 6px bar in a graded blue, and a label. Scale below.
6. **Tokens + Type** — two columns. Left: "Core colour tokens", 3-col grid of swatches (52px, radius 11px, inset hairline) with name + hex. Right: "Type" — Newsreader 36/300 and Hanken Grotesk 30/500 specimens with weight notes.

### View B — Retreat landing page (`Retreat Brand Directions.dc.html`, option `5a`)
**Purpose:** marketing/enrol page for the retreat ("Still Waters retreat" is placeholder copy).

**Layout:** single board, width 1120px, paper bg, panel shadow.

**Sections:**
1. **Nav** — wordmark "Still Waters *retreat*" (Newsreader 22, italic accent `#4A7690`); 3 text links (Hanken 13/500 `#4a5760`) + primary pill "Join the next intake".
2. **Hero** — full-width rounded panel (radius 24px) in the `#4A7690→#5FA0A0` gradient. Overline (`#DCE8EF`); title "Rest is part of the *care*." (Newsreader 56/300, white, italic accent); paragraph (`#EAF2F6`, max 470px); white primary button "Reserve your place" + supporting text. Floating **glass stat card** bottom-right: `rgba(255,255,255,.16)` + `blur(16px)`, "6 weeks / 12 short sessions".
3. **Three pillars** — centred overline + Newsreader 34/300 heading; 3 white cards, each with a numbered circular chip (tinted per pillar: sky-mist, tide-mist, sand), Newsreader 19 title, body copy.
4. **Sessions list** — panel bg `#DCE8EF`, radius 24px. Heading + "See the full outline" pill. 4 rows on `#F7F9FA`: number (Newsreader 16 `#4A7690`) · theme (Hanken 15/500) · "2 sessions" caption.
5. **Guide/facilitator** — 2-col; left a gradient photo placeholder (radius 22px, 300px) with a glass caption pill; right overline `#3C7373`, Newsreader 32/300 heading, body, primary button + text link.
6. **Testimonial** — panel bg `#D9E8E5`, radius 24px, centred Newsreader 27/300 quote with italic emphasis + attribution (Hanken 13/500 `#3C7373`).
7. **Enrol CTA** — centred Newsreader 38/300 with `#4A7690` italic accent; primary + secondary buttons; fine print `#8593a0`.
8. **Footer** — `#2C4652` bar; wordmark (white, `#7CA7C4` italic accent) + contact caption `#B8C6CE`.

### View C — Exploration boards (`Retreat Brand Directions.dc.html`, turns 1–4)
Reference only: palette/type direction explorations, lead-colour options, and the Sky & Tide style guide (turn 4). Not required for implementation but useful context for why the palette landed where it did.

---

## The Wellness Wheel component (detailed spec)

An SVG radial chart. **State:** `scores` — an array of 8 integers, each 0–5 (default sample `[4,2,3,5,2,4,3,4]`).

**Geometry** (viewBox `0 0 440 440`):
- Centre `cx=cy=220`. Inner hole radius `r0=60`. Outer radius `R=190`.
- 8 wedges of 45° each, starting at top (−90°), with `1.6°` padding between wedges.
- A wedge is an **annular sector** from `r0` to `r1`, where the filled `r1 = r0 + (R−r0) * score/5`.
- Behind each filled wedge, draw the full-height wedge track at `opacity 0.13` in the dimension colour. Filled portion at `opacity 0.92`.
- Optional concentric **grid rings** at each 1/5 step, stroke `rgba(32,48,58,.08)` (toggle `showRings`, default on).
- Optional **number labels** 1–8 at radius `R+16`, at each wedge's mid-angle, Hanken 12/600 in the dimension colour (toggle `labelStyle`: `numbers` | `none`, default `numbers`).
- **Hub:** white circle radius `r0−6` with `rgba(32,48,58,.1)` stroke. Inside: the average score (`total/8`, 1 decimal) in Newsreader 34/300 `#20303A`, and the word "BALANCE" (Hanken 8.5/600, letter-spacing .16em, `#8593a0`).

Annular-sector path helper (degrees; 0° at top):
```
polar(cx,cy,r,deg): a=(deg-90)*π/180 → [cx+r·cos a, cy+r·sin a]
sector(cx,cy,r0,r1,a0,a1):
  large-arc-flag = (a1-a0)>180 ? 1 : 0
  M (r1,a0) A r1 r1 0 laf 1 (r1,a1) L (r0,a1) A r0 r0 0 laf 0 (r0,a0) Z
```

**Score scale (hub/rim meaning):**
| Score | Label | Bar colour |
|---|---|---|
| 0 | Empty | `#E4EAED` |
| 1 | Depleted | `#C6D6DE` |
| 2 | Low | `#A9C2CE` |
| 3 | Steady | `#8CAEBE` |
| 4 | Cared for | `#6C97AB` |
| 5 | Nourished | `#4A7690` |

---

## Interactions & Behaviour
- **Click a wedge:** cycles that dimension's score `(score + 1) % 6` (0→1→…→5→0).
- **Click a legend dot** at position `d` (1–5): sets score to `d`; clicking the dot equal to the current score decrements to `d−1` (so you can reach 0).
- **Sample reading** button: sets `scores = [4,2,3,5,2,4,3,4]`.
- **Clear** button: sets all scores to 0.
- **Hub** recomputes the average live on any change.
- Buttons/cards: gentle hover lift 1–2px, press scale ~0.985, ~150–200ms ease-out. No bounce, no infinite loops.
- Glass elements only ever sit over the blue/teal gradient, never on paper.

## State Management
- `scores: number[8]` (0–5 each) — the only runtime state for the wheel.
- Derived: `average = sum(scores)/8` (1 dp) for the hub.
- Per-dimension render data: `{ name, color, tint, icon, desc, score, dots[5] }` where each dot has `{ filled: d<=score, onClick: set(i,d) }`.
- Config props (design-time toggles): `showRings: boolean = true`, `labelStyle: 'numbers'|'none' = 'numbers'`.
- No data fetching. If persisting a user's reading, store the 8-int array (e.g. per user/session).

## Assets
- **Fonts:** Newsreader + Hanken Grotesk (Google Fonts). Load the weights listed above.
- **Icons:** Lucide line set (~1.9px stroke, round caps/joins) — moon, activity, heart, users, shield, compass, sun, hand-heart. Use the codebase's existing Lucide/icon library rather than the inline SVG paths in the prototype.
- **Photography:** the landing page uses gradient **placeholders** for the facilitator photo and hero — swap in real candid, natural-light photography of caregivers.
- **Wordmark:** "Still Waters retreat" is placeholder text set in Newsreader; replace with the real retreat name/logo.
- No raster assets are shipped in this bundle.

## Files
- `Wellness Wheel.dc.html` — the interactive wheel + full asset kit (View A).
- `Retreat Brand Directions.dc.html` — exploration boards + Sky & Tide style guide (turn 4) + applied landing page (turn 5 / option 5a) (Views B & C).
- `Sky-and-Tide-Design-System.md` — the written design-system spec.
- `README.md` — this document.

## Relationship to the existing brand
This system intentionally harmonises with **Kris Pierce Consulting** (blue + teal co-lead, cream paper). If the target codebase already implements that brand's tokens, extend them: add the lighter Sky/Tide leads and the eight wheel-dimension colours as a themed extension rather than a parallel system.
