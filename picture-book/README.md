# Will and the Missing Highland Cow — digital picture-book edition

The complete digital edition of the 14-spread picture book: manuscript
draft 6 (locked, from the project handover pack) set over full-bleed vector
illustrations built from the character design brief's canon and palette.

This is the **digital dummy edition**: a working proof for Will's sign-off,
the sensitivity read, and the illustrator commission. The print edition
follows the handover pack's gated process.

## View it

```bash
cd picture-book
python3 -m http.server 8000   # open http://localhost:8000
```

or open `dist/index.html` — a single self-contained file (no network
needed). Arrow keys, the on-screen arrows, or a swipe turn the pages.
Printing (Ctrl/Cmd-P) produces a one-spread-per-page landscape PDF proof.

## Structure

```
art.js        BookArt — character + scenery SVG library (canon & palette)
BRIEFS.md     spread-by-spread art direction (from the sample-spread brief)
scenes-a.js   cover + spreads 1–4
scenes-b.js   spreads 5–8
scenes-c.js   spreads 9–11 (incl. the dam reveal, the commissioning sample)
scenes-d.js   spreads 12–14
book.js       manuscript text (draft 6, verbatim), alt text, page runtime
index.html    shell: typography, navigation, print CSS, back matter
fonts.css     Literata + Archivo, inlined as data URIs (self-contained)
build.mjs     bundles everything into dist/index.html
render.html   dev harness (gutter guides) — node shot.mjs [scene…]
```

## The rules the art follows

From the character design brief and language framework (handover pack):
pair test (Rocky vs Freddie instant, even in silhouette), Will's rules
(the stillest figure, phone-on-lanyard as unremarked silhouette, never
fragile), expression arc (smug → deflated → scared → unrepentant), one
cool accent (Cleo's collar), no coastline/landmarks/signage, nothing
flashes, `prefers-reduced-motion` honoured, alt text on every spread.
