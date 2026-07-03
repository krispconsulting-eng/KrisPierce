# Product

## Register

brand

## Users

Two distinct audiences, one shared surface:

- **The Caregiver.** Family/informal caregiver (parent, partner, sibling) of someone with a rare disease. Time-poor, often financially stretched, emotionally depleted. Skeptical of generic wellness content that wasn't built for a life organised around someone else's medical needs. Arrives tired, possibly mid-crisis-adjacent, looking for permission to prioritise themselves without guilt, and proof this is different before committing any money or time.
- **The Sponsor.** A pharma/biotech CSR lead, patient advocacy partner, or organisation with a stake in a rare disease community. Needs to feel this is a credible, professional, measurable investment they can defend internally and report on externally, not a soft, unaccountable gesture.
- **The Applicant.** A caregiver who can't self-pay and isn't named by a sponsor, applying for a no-cost scholarship seat. Needs the same credibility as the paying path, without feeling like a lesser tier.

## Product Purpose

A standalone marketing site (landing page, sponsor pitch, scholarship application, public supporters page) plus one embedded interactive tool (the Wellness Wheel: a 64-question assessment, personalised report, and 6-week gamified plan) that together sell and deliver a 6-week wellbeing course for family caregivers of people with rare diseases. Success looks like: a caregiver completes the free assessment and either self-pays or applies for sponsorship; a sponsor reads the pitch page and commits to funding seats. The whole surface, marketing pages and embedded tool alike, is one continuous brand experience, not a plain marketing shell wrapped around a generic app.

## Brand Personality

Grounded, nurturing, quietly premium. Calm confidence rather than energy or hype. Premium reads through restraint and craft: considered spacing, a real custom icon/graphic system, refined motion, careful typography, not through loud gradients, gold foil, or luxury signifiers. Warmth is earned through specificity and care in the details, not through cheerfulness or exclamation. Never patronising, never clinical, never gamey-loud.

## Anti-references

- Clinical/hospital blue-and-white "medical app" aesthetic.
- Patronising or childish tone/visuals (rounded bubble fonts, cartoon mascots, exclamation-heavy copy).
- Loud, candy-colored gamification (bright badge-farm visuals, confetti, leaderboards).
- Generic cream-and-card SaaS template look (identical icon-in-a-box card grids, tiny uppercase eyebrows on every section, gradient-text headings).
- Emoji standing in for iconography anywhere in the shipped product.

## Design Principles

1. **Premium through craft, not through volume.** Every custom graphic, icon, and animation should look intentionally designed, not templated. If it looks like a stock icon set or an AI-default pattern, redo it.
2. **Nurturing, not gamey.** Gamification (badges, streaks, levels, the wellness wheel itself) should feel like a calm companion tracking real progress, not a game layered on top of a health product.
3. **One continuous brand, two surfaces.** The marketing pages and the embedded Wellness Wheel tool must feel like the same product designed by the same hand, not a polished shell around a plainer app.
4. **Low ongoing lift for the owner.** Stays a zero-build static site (plain HTML/CSS/JS plus the existing React component). Richness comes from design quality, not from added tooling or maintenance surface.
5. **Respect the reader's state.** The audience is often tired or emotionally stretched. Motion, copy density, and visual noise should never demand more energy than the reader has to give, even while looking premium.

## Accessibility & Inclusion

WCAG AA minimum contrast on all text (already validated in the existing token set). Full `prefers-reduced-motion` support on every animation (crossfade/instant fallback, no animation gated behind a class that never fires for reduced-motion users or headless renderers). Standard premium-site motion intensity is acceptable as a default (per explicit user confirmation), with reduced-motion as the accommodation path rather than a gentler default for everyone.
