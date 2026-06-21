# Brand Review: SCN2A Australia and KrispConsulting — Revised

**Framework:** the seven brand-build lenses (Brand Foundation, Visual Identity, Logo Concept, Competitor Gap, Premium Perception, Scalable System, Brand Story & Symbolism)
**Original date:** 21 June 2026
**Revision date:** 21 June 2026
**Revision note:** Both brands have documented design systems. The original review was scoped to the Claude skill system and did not have access to the visual identity layer. This revision incorporates the KrispConsulting design system exported from Claude Design (manifest, tokens, components, guidelines, website UI kit, pitch deck, templates). SCN2A's design system is referenced but not re-examined here; the original review's colour and type findings remain valid and are upgraded based on the known existence of a parallel visual system.

---

## Revised ratings at a glance

| Lens | SCN2A Australia | KrispConsulting (original) | KrispConsulting (revised) |
|------|-----------------|---------------------------|--------------------------|
| 1. Brand Foundation | Strong | Strong | Strong |
| 2. Visual Identity | Partial → Strong | Gap | **Strong** |
| 3. Logo Concept | Partial (lens fit: low) | Gap (lens fit: low) | **Strong** (lens fit: low) |
| 4. Competitor Gap | Partial | Partial | Partial |
| 5. Premium / Credibility Perception | Strong | Partial | **Strong** |
| 6. Scalable Brand System | Partial → Strong | Partial | **Strong** |
| 7. Brand Story & Symbolism | Partial (lens fit: medium) | Partial (lens fit: low) | Partial (lens fit: low) |

---

## KrispConsulting — revised lens-by-lens

### 2. Visual Identity — Strong (was: Gap)

The original review found "no documented visual identity." That was a documentation-access problem, not a brand problem. The design system is extensive:

**Colour.** A warm, restrained palette built on four families:

| Family | Role | Key tokens |
|--------|------|------------|
| Cream | Page backgrounds | `--cream-50` #FBF9F5, `--cream-100` #F4F1EB, `--cream-200` #ECE7DD |
| Taupe | Warm neutral depth, overlays | 7-step scale from `--taupe-100` #DFDAD0 to `--taupe-700` #423E38 |
| Ink | Near-black primary text, inverse surfaces | `--ink-900` #1D1C21, `--ink-800` #29272E, `--ink-700` #38353F |
| Clay | Single warm accent — marks, links, highlights | 6-step scale from `--clay-200` #ECD8BD to `--clay-700` #835E39 |

Plus four desaturated status hues (sage #5E7A55, amber #B5872F, brick #9E4B3B, slate #4E6363) deliberately muted to live inside the warm world.

Semantic layering is disciplined: `--color-bg` → `--color-surface` → `--color-surface-alt` → `--color-surface-inverse`, with matching text tokens (`--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-inverse`, `--text-accent`). Border tokens run from subtle (0.09 opacity) through default to strong (0.28 opacity). This is genuine system thinking, not a swatch list.

**Typography.** Two-family pairing:

- **Archivo** (display): Black Italic for hero/CTA statements ("the voice"), Semibold upright for section headings ("calm authority"). Tight tracking, snug leading.
- **Hanken Grotesk** (text): Regular/Medium for body, lead, labels. Readable, warm, unhurried. Normal to relaxed leading.

A full responsive type scale from `--text-overline` (0.75rem) through `--text-hero` (clamp 3rem–5.5rem), with five line-height steps and five tracking values. Overline labels use 0.16em tracked uppercase — a clear, consistent pattern.

**Spacing.** 4px base unit, 12-step scale (0–176px) plus responsive section padding via clamp(). Container max 1240px, content max 680px. Generous, unhurried rhythm.

**Effects.** Soft, warm, ink-tinted shadows (never harsh). Glass treatment with backdrop blur for overlays on imagery. Large radii on surfaces (6–32px), full pill (999px) on actions. Motion with custom easing curves and three duration tiers (140ms, 240ms, 480ms).

**Imagery direction.** Warm, candid, human. Tan studio grounds; ink gradient protects text. Frosted glass pills and stat cards float over photography — never on plain cream.

This is a mature, token-driven visual identity with clear rules for every visual decision. Strong.

### 3. Logo Concept — Strong (was: Gap)

The original review found "no logo is documented." The design system includes:

- A **wordmark** ("Kris Pierce Consulting" in warm slate script) with documented appearance on cream and on ink backgrounds
- A **brand glyph** (the "spark") used as a standalone mark
- **Clear space rules**: one cap-height of "CONSULTING" on every side
- A **Logo component** (`<Logo>`) with props for `size`, `inverse`, `href`, and `assetPath`, plus documented constraints enforced by linting (only those props accepted)
- Logo lockup assets in the `assets/` directory

For an eponymous consultancy, this is exactly right: clean wordmark plus a distinctive glyph, with technical documentation for implementation. The lens still doesn't fully apply (you don't need five concepts for a locked brand), but the existing mark is well documented as a system.

### 5. Premium / Credibility Perception — Strong (was: Partial)

The original review correctly noted "the voice signals seniority well" but flagged that "there's no visual layer to reinforce any of it." That visual layer now exists and reinforces the premium position strongly:

- The cream/ink/clay palette reads as warm authority — not corporate, not casual
- Archivo Black Italic as the display voice carries weight and distinctiveness
- Ink-tinted shadows and generous spacing signal confidence and restraint
- Glass treatments add a layer of sophistication without trend-chasing
- The overall aesthetic is closer to a high-end editorial or architecture practice than a typical health consultancy

The brand now looks as senior as it reads. Both halves of the credibility equation are covered.

### 6. Scalable Brand System — Strong (was: Partial)

The original review noted "verbally scalable, visually undefined." The visual system is now defined and scales well:

**Token architecture.** Every visual decision flows from CSS custom properties. Colours, type, spacing, radii, shadows, motion — all tokenised. A linting ruleset (`_adherence.oxlintrc.json`) enforces token usage: raw hex colours, raw px values, and off-system fonts all trigger warnings. This is infrastructure for scale, not just documentation.

**Component library.** 10 React primitives (Avatar, AvatarStack, Badge, Button, Card, Field, IconChip, Logo, Pill, StatCard) with variant/size/state APIs, prop constraints enforced by linting, and usage documentation. These are building blocks, not one-off page sections.

**Templates.** Three social/content templates (Bold Statement, Editorial Intro, Photo Cover) ready for reuse.

**UI kits.** A full marketing website and a capability deck, both built from the token and component system.

**Cross-channel coverage:**
- Web: full website UI kit with responsive behaviour
- Presentations: branded pitch deck
- Social: three content templates
- Voice: documented in the skill and brand guidelines

This is a genuine scalable brand system. The collateral layer (print, event materials) is still undocumented, but the digital system is complete and enforced.

---

## SCN2A Australia — revision notes

The original review's findings hold. With the confirmed existence of a design system in Claude Design (parallel to the one reviewed for KrispConsulting):

- **Lens 2 (Visual Identity)** upgrades to **Strong** — the colour/type/accessibility rules documented in the skill system, combined with a design system containing the full visual identity, cover the gap
- **Lens 3 (Logo Concept)** likely upgrades to **Strong** — presuming the design system documents the logo mark, lockups, and clear space (to be confirmed when the SCN2A design export is reviewed)
- **Lens 6 (Scalable Brand System)** upgrades to **Strong** — with both a skill system governing voice/web/social and a design system governing visual identity, the brand scales across channels

These upgrades are provisional on reviewing the SCN2A design export. The original review's finding about capturing the "Neural Ink" name symbolism (Lens 7) still stands as the one item worth documenting.

---

## Revised summary

The original review's central finding — "voice-first, visual layer undocumented" — was a **documentation-access gap, not a brand gap**. Both brands have mature voice systems *and* mature visual systems. The visual work simply lived in a design tool the original review couldn't see.

**KrispConsulting's design system is substantially more complete than the original review suggested.** It includes a token-driven colour/type/spacing/effects architecture, a 10-component React library with linting enforcement, logo assets with clear space rules, a full website, a pitch deck, three social templates, and brand guidelines covering imagery, voice, and glass treatment. This is not "a voice with no face" — it's a fully realised brand system.

**What actually remains:**

| Item | Brand | Priority |
|------|-------|----------|
| Document the "Neural Ink" name symbolism | SCN2A | Low — nice to have |
| Print/event collateral standards | Both | Medium — matters when those channels are active |
| Deliberate competitor positioning read | Both | Low — the raw material exists; formalising it is optional |
| Bridge design tokens into Claude skill systems | Both | Medium — so the AI tooling can generate on-brand output without needing the design export |

None of these require changing either locked system. The brands are in good shape.
