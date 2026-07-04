# Sky & Tide — Caregiver Retreat Design System

A calm, light design system for a caregiver course and online retreat. It is a **sibling to Kris Pierce Consulting**: it keeps the same blue-and-teal co-lead logic and cream-paper restraint, then lifts everything lighter and airier so it stands on its own. Australian/British spelling; warm, quiet, human voice; no em dashes.

Flagship asset: **the Caregiver Wellness Wheel** (`Wellness Wheel.dc.html`).

---

## 1. Brand relationship

| | Kris Pierce Consulting | Sky & Tide (this system) |
|---|---|---|
| Lead | Deep teal + blue over forest green | Light **Sky** blue + **Tide** teal over airy paper |
| Feel | Cool editorial minimalism | The same, lifted lighter and gentler |
| Type | Outfit + Archivo | Newsreader + Hanken Grotesk |
| Use | Consultancy, business | Retreat, self-care, reflection |

The connective thread is the **blue + teal duet**. Sky & Tide is clearly of the same family, unmistakably its own.

---

## 2. Colour

### Core palette
| Token | Hex | Role |
|---|---|---|
| Sky (lead) | `#7CA7C4` | Hero panels, overlines, links |
| Tide (partner) | `#5FA0A0` | Accents, chips, secondary marks |
| Deep | `#4A7690` | Body text accents, primary buttons |
| Deep ink | `#2C4652` | Dark surfaces, footers, secondary button outline |
| Ink | `#20303A` | Headings and body text |
| Warm sand | `#E4D9C6` | Quiet warm accent, chips |
| Paper | `#F7F8F6` | Page and card background |
| Sky mist | `#DCE8EF` | Soft blue section background |
| Tide mist | `#D9E8E5` | Soft teal section background |

### Wellness-wheel dimension colours
Each of the eight dimensions has a colour and a matching tint (for icon chips). All are muted and sit at similar lightness so the wheel reads as one harmonious family.

| # | Dimension | Colour | Tint |
|---|---|---|---|
| 1 | Rest & sleep | `#7CA7C4` | `#DCE8EF` |
| 2 | Body & energy | `#5FA0A0` | `#D9E8E5` |
| 3 | Emotions | `#C98F97` | `#F0DEE0` |
| 4 | Connection | `#8E9AC8` | `#E4E4EF` |
| 5 | Boundaries | `#6E8570` | `#DFE7DC` |
| 6 | Purpose | `#4A7690` | `#D6E2EA` |
| 7 | Joy & play | `#CDA66B` | `#F0E6D2` |
| 8 | Support | `#8093A6` | `#E1E5EC` |

---

## 3. Typography

- **Display — Newsreader** (serif). Light 300 for large statements, Regular 400 and *italic* for gentle emphasis. Tight tracking (~-0.01em), relaxed line-height.
- **Text — Hanken Grotesk** (sans). Regular 400 body, Medium 500 UI, SemiBold 600 labels.
- **Overlines** — Hanken Grotesk, 11px, uppercase, `0.24em` tracking, in Deep `#4A7690`.

Suggested scale: Hero 44–56px / Section 30–38px / Card title 19–21px / Body 14–16px / Caption 12–13px.

---

## 4. Shape, elevation, motion

- **Radii:** cards 16–18px, panels 22–26px, buttons and chips full pills (999px).
- **Shadows:** soft, diffuse, ink-tinted, never pure black. e.g. `0 14px 30px -22px rgba(32,48,58,.3)`.
- **Borders:** hairline `rgba(32,48,58,.07–.12)`.
- **Glass:** `backdrop-filter: blur(16px)` frosted pills and stat cards, used **only over the blue/teal hero gradient**, never on plain paper.
- **Gradient:** `linear-gradient(150deg, #4A7690, #5FA0A0)` for hero panels and photo scrims.
- **Motion:** restrained; gentle fades and 1–2px hover lifts. No bounce, no loops.

---

## 5. The Caregiver Wellness Wheel

A reflective instrument: eight dimensions of a caring life, each scored **0 to 5**.

**Anatomy**
- **Hub** — overall balance, the average of all eight, shown as a single number.
- **Wedge** — one dimension, its own colour and 45° slice.
- **Depth** — the score, how far the fill reaches from the centre (depleted) to the rim (nourished).

**Score scale**
| Score | Meaning |
|---|---|
| 0 | Empty |
| 1 | Depleted |
| 2 | Low |
| 3 | Steady |
| 4 | Cared for |
| 5 | Nourished |

**Interaction** — click a wedge to cycle its score, or click the dots in the legend to set it directly. "Sample reading" seeds an example; "Clear" resets to zero.

**Tweaks** — `showRings` (concentric grid rings on/off) and `labelStyle` (`numbers` / `none`).

---

## 6. Components in the kit

- **Buttons** — primary (Deep fill, white text, pill), secondary (Deep 1.5px outline, ink text).
- **Chips** — Tide chip (`#D9E8E5` bg, `#3C7373` text), Sand chip (`#E4D9C6` bg, warm text).
- **Icon chips** — 46px circle in the dimension's tint, holding a ~1.9px-stroke line icon in the dimension's colour.
- **Cards** — white or paper surface, hairline, soft shadow, 16–18px radius.
- **Module card** — blue/teal gradient header with a glass overline pill, white body, title + primary button.
- **Stat card** — glass panel over the hero gradient.

Icons follow a **Lucide-style** line set (~1.9px stroke, round caps). Eight are defined for the wheel dimensions (moon, activity, heart, users, shield, compass, sun, hand-heart).

---

## 7. Voice

Warm, unhurried, honest. Speak to the carer as a whole person, not a role. No em dashes; use commas, colons or semicolons. Australian/British spelling. No exclamation marks, no urgency, no jargon.

- Say: "Rest is part of the care." / "Let this be the one thing that looks after you."
- Not: "Boost your self-care 10x!" / "Don't miss out, limited spots!"

---

## 8. Files

- `Wellness Wheel.dc.html` — the interactive wheel + full asset kit (dimensions, score scale, tokens, type).
- `Retreat Brand Directions.dc.html` — the exploration canvas: palette/type directions, lead-colour options, the Sky & Tide style guide, and the applied landing page.
