# DEE Disability-Impact Infographic

An accessible awareness graphic for **Developmental & Epileptic Encephalopathies (DEE)**,
built to make one message visually unmistakable:

> One diagnosis — **multiple disabilities at once**, reaching across **every body system**
> and **every stage of life**.

## What it shows

The visual is organised around two explicit axes:

1. **Disability across body systems** — a radial "one person → five systems" diagram plus
   detailed cards for each domain:
   - Cognitive & Intellectual
   - Motor & Physical
   - Communication & Sensory
   - Medical & Systemic
   - Behavioural & Psychiatric
   - …and how these impairments *compound* one another.
2. **Disability across the lifespan** — a timeline from infancy to adulthood showing how the
   disability burden emerges, deepens and persists, under a constant, heightened risk to life.

## Files

| File | Use |
|------|-----|
| `index.html` | Interactive, self-contained web version (print / "Save as PDF" built in). |
| `assets/dee-impact.png` | High-resolution raster (2480 px wide) — drop into slides, social, docs. |
| `assets/dee-impact.svg` | Fully self-contained vector (text outlined to paths) — scales to any print size. |
| `assets/dee-impact-grant.png` | **Grant-submission figure** — compact landscape ("envelope") layout, no branding: areas of impact → how they compound → across the life course. 3040 px wide. |
| `assets/dee-impact-grant.svg` | Vector version of the grant figure (text outlined). |

## Design notes

- **Style:** clean, flat medical/Swiss-grid aesthetic (calm, trustworthy, not alarmist).
- **Accessibility:** WCAG-minded — every colour-coded system is *also* labelled with an icon
  and text, so meaning never depends on colour alone; high-contrast ink on light surfaces.
- **Type:** Figtree + Noto Sans in the web version; DejaVu Sans (outlined) in the exported assets.

## Regenerating the PNG/SVG

The exported assets are produced by a small, browser-free generator
(`opentype.js` for exact text measurement + `@resvg/resvg-js` for rasterising; all text is
outlined to vector paths so the SVG needs no fonts):

```bash
cd scripts
npm install
npm run build          # writes ../assets/dee-impact.png and ../assets/dee-impact.svg
```

```bash
npm run build:grant    # writes ../assets/dee-impact-grant.png and .svg
```

Requires Node 18+ and the DejaVu Sans fonts (standard on Debian/Ubuntu, at
`/usr/share/fonts/truetype/dejavu/`). Edit the content arrays in
`scripts/generate-assets.js` (full poster) or `scripts/generate-grant.js` (grant figure)
and re-run the matching build to refresh the assets.

---

*Educational summary compiled for awareness purposes. The presentation of impairments varies
by individual and underlying genetic cause; this is not medical advice.*
