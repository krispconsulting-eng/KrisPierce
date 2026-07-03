# Caregiver Wellness Course

The 6-week digital wellbeing course for family caregivers of people with rare diseases, sold to industry as sponsored seats and to individuals as self-pay.

- **Architecture (business model, CRM, onboarding, n8n automation):** [`../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md`](../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md)
- **Content outline (weekly themes, research grounding):** [`COURSE-CONTENT-OUTLINE.md`](COURSE-CONTENT-OUTLINE.md)
- **Wellness Wheel app (assessment + gamified plan):** [`wellness-wheel.jsx`](wellness-wheel.jsx)

## What's built vs. what's still needed

**Built and working:** the Wellness Wheel React app — 64-question assessment across 8 dimensions, personalised report, 6-week gamified plan (points, streaks, 12 badges), weekly check-ins, accountability partner invite, and a before/after reassessment comparison. Runs today as a Claude/React artifact or a Vite app; state is in-memory only (resets on reload).

**Still needed before a real cohort can run:**
1. User accounts + persistence (Supabase Auth + Postgres recommended) so progress survives a reload and syncs across devices.
2. Real email sending for the accountability-partner invite (currently UI-only).
3. The 6 weekly curriculum modules written in full (scripts/video/audio) against the scaffold in `COURSE-CONTENT-OUTLINE.md`.
4. The Notion CRM databases and n8n automations described in the architecture doc.
5. The website surfaces (sales page, sponsor pitch page, checkout, "apply for sponsorship" form).

See the architecture doc's §10 phased build plan for sequencing.
