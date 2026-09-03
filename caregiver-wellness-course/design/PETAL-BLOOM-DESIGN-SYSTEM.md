# Petal Bloom — design system

The only design system maintained for the Caregiver Wellbeing Journey. Everything else
(Steady Hand, Sky & Tide, Aurora Glow, Held Space) is retired; the Sky & Tide document is not on this branch; it survives only in earlier branch history, and the rest survive
only as legacy variable names in `styles.css`.

Source of truth for values: `website/assets/styles.css` (`:root`) and
`website/assets/wellness-wheel.js` (`DIMS`). This document explains them.
The mark has its own spec: `design/brand/PETAL-BLOOM-MARK.md`. The interactive board
is `design/brand-board.html`.

## Colour

### Eight dimensions
One petal per wellbeing dimension. Wheel order runs clockwise from the top. These are
the fills for the Wellness Wheel wedges, dimension chips and single-dimension tiles.
Ink `#0E3F4E` sits on every one of them at 5.8:1 or better, so each can carry a label.

| Dimension | Hex | Petal on the mark sheet |
|---|---|---|
| Social | `#A5D8C6` | 8 |
| Occupational | `#B4B4E6` | 2 |
| Environmental | `#C2DFAC` | 7 |
| Intellectual | `#F7C69B` | 5 |
| Spiritual | `#CDBBE4` | 3 |
| Emotional | `#F2B4BC` | 4 |
| Physical | `#9CC8F0` | 1 |
| Financial | `#F5DE9A` | 6 |

The mark's own petal order (01–08 clockwise from the flat top petal) does not match
wheel order; each dimension keeps the hue it already had, which is why the mapping is
not 1–8 in sequence. Adjacent petals sit at 1.0–1.2:1 against each other: colour never
separates wedges on its own, the gap does, and a label always accompanies a colour.

### Neutrals and actions
| Role | Token (legacy name) | Hex | Contrast |
|---|---|---|---|
| Page | `--linen-deep` | `#EFF5F8` | |
| Paper | `--linen` | `#F7FAFB` | |
| Surface | `--paper` | `#FFFFFF` | |
| Ink | `--bark-ink`, `--cedar-900` | `#0E3F4E` | 10.4:1 on page |
| Soft ink | `--bark-soft` | `#4B6771` | 5.5:1 on page |
| Muted | `--stone` | `#516C76` | 5.1:1 on page |
| Link, primary action | `--cedar-700`, `--cedar-500` | `#16697F` | white on it 6.3:1 |
| Secondary action | `--clay-700` | `#0E3F4E` | white on it 11.4:1 |
| Soft wash, hairline | `--cedar-100`, `--hairline` | `#DCE7EC` | decorative |
| Quiet warm accent | `--brass-600` | `#806116` | 5.8:1 on white; achievement only |

The sheet's own muted `#5B7A85` was not adopted: it reaches only 4.2:1 on the page
colour. `#516C76` is the nearest value that clears 4.5:1 on page, paper and white.

### Drenched sections
One per page. Ground is `--hero-gradient`, ink to teal (`#0E3F4E` → `#16697F`); white
text holds 6.2:1 or better across the run and `--cedar-100` highlights hold 9:1.
Glass elements may only sit over this.

### What Petal Bloom does not have
No gradient accents, no glow, no glass as a language. The `--glow-*`, `--glass-*` and
`--hero-gradient` tokens remain because rules reference them; they are set to quiet
ink-tinted values so nothing breaks and nothing shines. `--cedar-500` equals
`--cedar-700`, so the old cyan-tipped button gradient is now flat teal.

## Type
Newsreader (display, headings, the wordmark) and Hanken Grotesk (everything else),
loaded in `styles.css`. Unchanged.

## The mark
See `design/brand/PETAL-BLOOM-MARK.md`. Full colour at 32px and above; the one-colour
ink cut below that, and always for the favicon and avatars.

## Dark mode
Kept, because the site had one. Page `#0F2A33`, ink `#EAF3F6` (13.3:1), muted
`#93B0B9` (6.5:1). The light-mode teal `#16697F` reaches only 2.4:1 on the dark page,
so the dark block overrides `--cedar-700`/`--cedar-500` to `#5FB8C9`.

## Open
- The Wellness Wheel is still an autoplay showcase. Its form (closed ring or balance
  wheel) is a separate decision; only its colours changed here.
- The mark's centre is as supplied. See the mark spec.
