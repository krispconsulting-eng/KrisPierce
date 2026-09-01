# Petal Bloom — brand mark v1.0

The mark for the Caregiver Wellbeing Journey. Eight petals, one for each dimension of
the Wellness Wheel, overlapping at the centre so the whole reads before the parts.

This supersedes every earlier mark: the three-petal pinwheel that was in `icons.svg`,
the Held Space logo directions, and the v0.2 Open Shelter proposal. None of those are
in use anywhere.

## Construction

| | |
|---|---|
| Grid | 120 × 120, centre 60 / 60 |
| Petal | `M60,12 C72,12 78,26 78,38 C78,52 70,64 60,64 C50,64 42,52 42,38 C42,26 48,12 60,12 Z` |
| Simplified petal | `M60,13 C68,13 71,26 71,38 C71,49 66.5,55 60,55 C53.5,55 49,49 49,38 C49,26 52,13 60,13 Z` |
| Repeat | 8 × 45° about 60,60 |
| Blend | Multiply, 92% opacity (full colour only) |
| Clear space | `x` on all sides, where `x` is one quarter of the mark's width |

Nothing in the mark is straight and nothing comes to a point.

## Colour

Petal order runs clockwise from the flat top petal. Petals are never recoloured
individually.

| Petal | Hex | Token |
|---|---|---|
| 1 | `#9CC8F0` | `--petal-1` |
| 2 | `#B4B4E6` | `--petal-2` |
| 3 | `#CDBBE4` | `--petal-3` |
| 4 | `#F2B4BC` | `--petal-4` |
| 5 | `#F7C69B` | `--petal-5` |
| 6 | `#F5DE9A` | `--petal-6` |
| 7 | `#C2DFAC` | `--petal-7` |
| 8 | `#A5D8C6` | `--petal-8` |

One-colour cut: `#0E3F4E` (`--mark-ink`). Reversed cut: `#F7FAFB`.

## Files

| File | Use |
|---|---|
| `website/assets/brand/petal-bloom.svg` | Primary, full colour |
| `website/assets/brand/petal-bloom-mono.svg` | One colour, inherits `currentColor` |
| `website/assets/brand/petal-bloom-reversed.svg` | Dark grounds |
| `website/assets/favicon.svg` | Browser tab, ink, simplified geometry |
| `website/assets/brand/sprite-symbol.html` | Source of the `#icon-mark` symbol in `icons.svg` |

`#icon-mark` lives in `website/assets/icons.svg` and is inlined into every page by
`website/assets/inject-icons.py`. **Edit `icons.svg`, then re-run the injector.**
Editing a page's inlined sprite directly is wiped on the next run.

## Minimum sizes

The spec sheet the mark shipped with states 24px for the primary and 16px with the
simplified cut. Rendered at those sizes, neither holds: below roughly 32px the
overlaps compound and the petal count stops being legible, and at 16px the colour
version is a smudge.

| Use | Size | Cut |
|---|---|---|
| Full colour | 32px and above | Primary |
| Below 32px | any | One-colour ink cut |
| Favicon, avatar | 16–24px | One-colour ink cut, simplified geometry |

The site header uses full colour at 36px. Everything smaller is the ink cut.

## Don't

- **Don't outline it.** No silhouette keyline, no per-petal hairline. The softness is
  the point.
- **Don't rotate or tilt it.** The flat top petal is the mark's orientation.
- **Don't recolour the petals.** Eight fixed colours, or one of the approved cuts.
- **Don't place full colour on a saturated or dark ground.** Multiply drives every
  petal toward black. Use the reversed cut. This is why `.brand-mark` no longer sits
  in a coloured tile.
- **Don't sit it beside the Wellness Wheel at a similar size.** Both are eight-part
  radial forms; at similar scale a reader tries to match petals to wedges. Mark in the
  chrome, wheel in the content.

## Open

The centre. Eight pastels multiplied at 92% resolve to `#2E2C22`, which is 13.5:1
against the page and darker than the brand's own ink, in a colour that appears in no
palette. Shortening the petal from `y=64` to about `y=56` opens the core and lifts the
overlap to a soft mid-tone. That change is **not** applied here: the mark is
implemented exactly as supplied. Raise it with the mark's owner before the next round.
