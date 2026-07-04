# Caregiver Wellness Course

The 8-week digital wellbeing course for family caregivers of people with rare diseases, sold to industry as sponsored seats and to individuals as self-pay.

- **Architecture (business model, CRM, onboarding, n8n automation):** [`../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md`](../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md)
- **Content outline (weekly themes, research grounding):** [`COURSE-CONTENT-OUTLINE.md`](COURSE-CONTENT-OUTLINE.md)
- **Wellness Wheel app source (canonical single-file reference):** [`wellness-wheel.jsx`](wellness-wheel.jsx)
- **Wellness Wheel app, real Vite build:** [`app/`](app/) — `npm install && npm run build`, see `app/README.md`
- **Standalone marketing website:** [`website/`](website/) — open `website/index.html` in a browser, no build step; links to the built app at `website/app/`

## What's built vs. what's still needed

**Built and working:**
- The Wellness Wheel app, now a real Vite + React 19 build (`app/`) — 64-question assessment across 8 dimensions, personalised report, 8-week gamified plan (points, streaks, 12 badges), weekly check-ins, accountability partner invite, and a before/after reassessment comparison. Progress persists automatically to local storage (survives a reload, no account needed), with an optional Supabase adapter for real accounts + cross-device sync once a project is connected (see `app/.env.example` and `app/supabase/schema.sql`).
- A standalone, zero-build marketing website (`website/`): landing page, sponsor pitch page, scholarship application, public supporters page, all linking to the built Wellness Wheel app. Verified end-to-end in-browser (desktop + mobile, full assessment → report → sign-up → gamified plan → badge unlock click-through, plus a reload-persistence check), no console errors. See `website/README.md` for details.

**Still needed before real participants can run:**
1. Connect a real Supabase project (env vars + running the `app/supabase/schema.sql` migration) so accounts and persistence work across devices — the code path exists and degrades gracefully to local storage until then.
2. Real email sending for the accountability-partner invite (currently UI-only).
3. The 8 weekly curriculum modules written in full (scripts/video/audio) against the scaffold in `COURSE-CONTENT-OUTLINE.md`.
4. The Notion CRM databases and n8n automations described in the architecture doc.
5. Wiring the website's waitlist/sponsor/application forms to those automations (currently front-end only, see `website/README.md`).

See the architecture doc's §10 phased build plan for sequencing.
