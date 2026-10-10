---
name: The Caregiver Wellbeing Journey
description: A grounded, quietly premium wellbeing course for family caregivers of people with rare diseases
colors:
  cedar-900: "#16281C"
  cedar-700: "#3C6B4A"
  cedar-500: "#6BAA75"
  cedar-100: "#E8F0EA"
  clay-700: "#A85D39"
  clay-500: "#C17A5A"
  clay-100: "#F7EDE6"
  brass-600: "#8F6F35"
  brass-300: "#C9A15A"
  brass-100: "#FBF3E1"
  linen: "#FDFBF7"
  linen-deep: "#F5F1E8"
  bark-ink: "#2A2A28"
  bark-soft: "#454540"
  stone: "#54534E"
  hairline: "#E5E0D5"
  paper: "#FFFFFF"
typography:
  display:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)"
    fontWeight: 500
    lineHeight: 1.22
  title:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Raleway, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Raleway, -apple-system, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "88px"
components:
  button-primary:
    backgroundColor: "{colors.cedar-700}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-primary-hover:
    backgroundColor: "{colors.cedar-500}"
  button-secondary:
    backgroundColor: "{colors.clay-700}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bark-ink}"
    rounded: "{rounded.pill}"
    padding: "13px 28px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.bark-soft}"
    rounded: "{rounded.md}"
    padding: "28px"
  badge-medallion:
    backgroundColor: "{colors.brass-100}"
    textColor: "{colors.brass-600}"
    rounded: "{rounded.pill}"
---

> **SUPERSEDED (2026-07-04):** the brand direction has moved to **Sky & Tide**
> (light Sky blue + Tide teal, Newsreader + Hanken Grotesk), per the client's
> uploaded design handoff. The canonical spec now lives at
> `caregiver-wellness-course/design/sky-and-tide/`. The named rules below
> (Earned Gold Rule, One Accent Rule, Drenched Beat Rule, No-Eyebrow Rule)
> carry over into Sky & Tide; the palette and typefaces in this file do not.


# Design System: The Caregiver Wellbeing Journey

## 1. Overview

**Creative North Star: "The Steady Hand"**

This is what it feels like to be the reliable one, finally offered something reliable in return. The system rejects two default temptations at once: the clinical calm of a healthcare product (cold blues, sterile whites, certificate badges) and the loud, cheerful gamification of a consumer wellness app (candy colors, confetti, exclamation-point copy). Instead: a grounded, natural palette carried with restraint, a real hand-built icon and graphic system in place of emoji or stock icon packs, and motion that feels considered rather than decorative. Premium here means craft you can feel in the details, not luxury signifiers layered on top.

The site is not a plain marketing shell wrapped around a plainer tool. The embedded Wellbeing Journey assessment inherits the same palette, type, iconography, and elevation language as the marketing pages: one product, two moments in the same journey.

Density stays generous. This audience is often depleted; the design should never ask for more attention than it's willing to reward with clarity. Rhythm varies deliberately: not every three-things-to-say becomes a card grid, not every section opens with an eyebrow. Sameness is the failure mode this system is built to avoid.

**Key Characteristics:**
- A grounded natural palette (cedar green, warm clay) carried with restraint, not saturation.
- A dedicated, sparingly-used "achievement" color (antique brass) that only ever appears at real milestone moments.
- Hand-built line iconography and organic graphic motifs standing in for every emoji currently in the product.
- Varied section rhythm: alternating layouts, not a repeating eyebrow-heading-card-grid template.
- One deliberate deep-cedar "drenched" moment per major page, for visual contrast and gravity, not colour for its own sake.

## 2. Colors

The palette is restrained and earthbound: two natural hues (cedar green, warm clay) doing almost all the work, a warm paper neutral for rest, and one reserved accent that appears only when something has genuinely been earned.

### Primary
- **Cedar Green** (`#3C6B4A`): The primary brand color. Headings' accent moments, primary buttons, active nav state, the "grounded" half of the personality. Used with intention, not wallpapered across every icon.
- **Meadow** (`#6BAA75`): Cedar's lighter step. Hover states, secondary chart/wheel fills, growth-adjacent moments (progress bars filling, a badge that's about consistency rather than achievement).
- **Cedar Deep** (`#16281C`): Near-black green, reserved for the system's "drenched" sections: one full-bleed dark band per page (a closing CTA, a brand-statement moment) that gives the palette gravity instead of letting every section sit on the same pale neutral.

### Secondary
- **Warm Clay** (`#C17A5A`): The human-warmth half of the personality. Icons, illustrative accents, the sponsor/scholarship path. Never paired with white text directly (fails contrast at normal sizes).
- **Clay Ember** (`#A85D39`): Clay's darker step, the one that IS safe for white text (4.9:1). Secondary buttons, the "apply/scholarship" CTA family.

### Tertiary
- **Antique Brass** (`#C9A15A` accent / `#8F6F35` text-safe): The achievement color. Reserved exclusively for milestone moments inside the Wellbeing Journey: a badge unlocking, a level advancing, the week-6 reassessment reveal. **The Earned Gold Rule.** Brass never appears as decoration and never covers more than roughly 10% of any screen; if it shows up, the user just accomplished something real. This is what separates "premium achievement" from "gamified badge farm."

### Neutral
- **Linen** (`#FDFBF7`): The resting background. Warm, not sterile, not a generic AI-cream default; it's the one deliberate warm neutral in the system, always paired against a Cedar Deep or Clay Ember moment somewhere on the same page so the page never reads as cream-section-after-cream-section.
- **Linen Deep** (`#F5F1E8`): One step warmer/darker, for alternating section backgrounds and subtle content separation without a hard border.
- **Bark Ink** (`#2A2A28`): Primary text and headings. 13.9:1 against Linen.
- **Bark Soft** (`#454540`): Body copy default.
- **Stone** (`#54534E`): Muted/secondary text, captions. 7.5:1 against Linen; never lighter than this, this audience should never have to strain to read a caption.
- **Hairline** (`#E5E0D5`): Borders, dividers. Always 1px, never a colored accent border.
- **Paper** (`#FFFFFF`): Card surfaces sitting on Linen, for the rare cases a genuine surface lift is needed.

### Named Rules
**The One Accent Rule.** Cedar carries the page. Clay appears second, for warmth and the sponsor/scholarship thread. Brass appears last and rarest, only at achievement moments. If a screen has all three fighting for attention, something's wrong.

**The Drenched Beat Rule.** Every page gets exactly one full-bleed Cedar Deep section. It's the page's structural downbeat: a place the eye rests and the voice drops, not a decoration repeated section after section.

## 3. Typography

**Display Font:** Literata (with Georgia, serif fallback)
**Body Font:** Raleway (with system sans-serif fallback)

**Character:** Literata was built for comfortable long-form reading (it's Google Play Books' text face), which gives it a settled, unhurried warmth that generic display serifs (Lora, Fraunces, Playfair, Cormorant) don't carry, those read as "designed for a hero banner," Literata reads as "designed to be sat with." That's the right metaphor for a course that asks someone exhausted to actually stay a while. Raleway's elegant geometric simplicity keeps body copy calm and easy to scan. The pairing is deliberately a serif/sans contrast, not two similar faces competing.

### Hierarchy
- **Display** (600, `clamp(2.25rem, 4.5vw, 3.4rem)`, 1.12 line-height, -0.01em tracking): Page-level hero headlines only. `text-wrap: balance`.
- **Headline** (600, `clamp(1.6rem, 3vw, 2.2rem)`, 1.22): Section headings.
- **Title** (600, 1.3rem, 1.35): Card/component-level headings.
- **Body** (400, 1rem, 1.65): Default copy. Capped at 65–75ch measure. `text-wrap: pretty` on longer paragraphs.
- **Label** (600, 0.85rem, 1.4): Nav items, button labels, form labels. Not uppercase-tracked by default (see Named Rule below).

### Named Rules
**The No-Eyebrow Rule.** Small uppercase tracked "kickers" above every section heading are banned as a default rhythm device; they're the single most recognizable AI-generated-landing-page tell. At most one section per page may use one, and only when it's doing real labeling work (e.g. distinguishing "For Caregivers" content from "For Sponsors" content), never as decorative rhythm.

## 4. Elevation

Flat and tonal by default. Depth is conveyed through Linen/Linen Deep/Paper layering and the occasional Cedar Deep drenched section, not through drop shadows scattered across every card. Shadows exist, but they're a response to interaction (hover, focus), not an ambient decoration applied at rest.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 3px rgba(22,40,28,0.06)`): The bare minimum lift for a card sitting on Linen, barely visible, there to separate not to announce.
- **Hover bloom** (`box-shadow: 0 12px 32px rgba(22,40,28,0.14)`): Appears only on hover/focus of an interactive card or button, paired with a small `translateY(-3px)`. This is where "premium" shows up: a soft, confident lift, never a static heavy shadow sitting under everything by default.
- **Achievement glow** (`box-shadow: 0 0 0 1px rgba(201,161,90,0.35), 0 8px 28px rgba(201,161,90,0.28)`): Reserved for the Antique Brass achievement moments (badge unlock, level-up). The one place a glow effect is allowed, because it's earned and rare.

### Named Rules
**The Earned Shadow Rule.** No element gets both a visible border AND a heavy resting shadow. Pick one: a hairline border for a flat card, or a resting shadow for a lifted one, never both at rest.

## 5. Components

### Buttons
- **Shape:** Full pill (`border-radius: 999px`).
- **Primary:** Cedar Green fill, Paper text, 15px/30px padding. Reserved for the single most important action per section.
- **Secondary:** Clay Ember fill, Paper text. Used for the scholarship/apply thread specifically, so its warmth carries meaning (this is the "if cost is the barrier" path), not just visual variety.
- **Ghost:** Transparent, Hairline border, Bark Ink text; border shifts to Cedar Green and text to Cedar Green on hover.
- **Hover/Focus:** `translateY(-2px)` plus a soft Hover Bloom shadow in the button's own hue; no bounce, ease-out-quart timing (`cubic-bezier(0.165, 0.84, 0.44, 1)`), 200ms.

### Cards / Containers
- **Corner style:** 14px radius. Never larger; this system does not go full-rounded on containers.
- **Background:** Paper on a Linen/Linen Deep page background.
- **Shadow strategy:** Resting shadow only, Hover Bloom on interactive cards, never a border + heavy shadow combination (Earned Shadow Rule).
- **Not the default answer.** Before reaching for a card grid to present "three things," consider an alternative: an alternating text+graphic row, a single illustrated diagram, a horizontal flowing list. Cards earn their place when items are genuinely comparable, parallel options (like the three enrollment paths), not as the default container for any group of ideas.

### Inputs / Fields
- **Style:** Paper background, Hairline border (1.5px), 8px radius.
- **Focus:** Border shifts to Cedar Green, plus a soft `0 0 0 3px` ring in Cedar-100.

### Navigation
- Sticky, translucent Linen background with a subtle blur (the one legitimate use of `backdrop-filter` in this system: functional readability over scrolling content, not decorative glass-card styling). Hairline bottom border. Active link in Cedar Green, weight 700.

### Wellbeing Journey (signature component)
The centerpiece graphic and the assessment/plan tool share one visual language: gradient-filled wedges in Cedar/Meadow/Clay tones (never flat single-tone fills), a soft ambient glow behind the wheel rather than a hard drop shadow, and gentle continuous motion (a slow breathing scale, ~4s ease-in-out loop) on the hero wheel graphic specifically, to signal "alive" without being distracting. Badges are custom-drawn medallions (a circular seal with an inset icon), not emoji, and only ever render in Bark Ink/Cedar tones by default, switching to the full Antique Brass treatment plus the Achievement Glow at the moment they unlock.

## 6. Do's and Don'ts

### Do:
- **Do** build every icon as a hand-drawn inline SVG in the system's line-icon language (consistent 1.75px stroke, rounded caps, Cedar/Clay/Bark Ink coloring). Every icon in the shipped product should look like it belongs to one family.
- **Do** vary section rhythm across a page: alternate card grids with text+graphic rows, single diagrams, and asymmetric feature spotlights.
- **Do** reserve Antique Brass strictly for earned achievement moments (per the Earned Gold Rule).
- **Do** include one Cedar Deep drenched section per page for structural contrast (per the Drenched Beat Rule).
- **Do** use ease-out-quart/quint timing for all transitions; every animation needs a `prefers-reduced-motion` crossfade fallback.

### Don't:
- **Don't** use emoji anywhere in the shipped product, per PRODUCT.md's anti-references; every emoji currently in the site or the Wellbeing Journey component is a placeholder to replace.
- **Don't** open more than one section per page with a small uppercase tracked eyebrow (the No-Eyebrow Rule); this is the single most common AI-landing-page tell and the current site over-uses it.
- **Don't** repeat the identical icon-in-a-rounded-box, three-up card grid as the default answer for every "here are three things" moment; the current site does this seven times across four pages.
- **Don't** pair a visible 1px border with a shadow of 16px blur or more on the same element (the Earned Shadow Rule); pick one.
- **Don't** use border-radius above 20px on any card, section, or input; full-pill is reserved for buttons and tags.
- **Don't** use `background-clip: text` gradient headings; emphasis comes from weight, size, or color, never gradient text.
- **Don't** reach for glassmorphism as decoration; the sticky nav's blur is the one functional exception, not a precedent for glass cards elsewhere.
- **Don't** design the Wellbeing Journey app as a plainer "app register" experience; it carries the same premium visual language as the marketing pages (per PRODUCT.md's "one continuous brand, two surfaces" principle).
