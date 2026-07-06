# Caregiver Wellness Course

The 8-week digital wellbeing course for family caregivers of people with rare diseases, sold to industry as sponsored seats and to individuals as self-pay.

- **Architecture (business model, CRM, onboarding, n8n automation):** [`../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md`](../CAREGIVER-WELLNESS-COURSE-ARCHITECTURE.md)
- **Content outline (weekly themes, research grounding):** [`COURSE-CONTENT-OUTLINE.md`](COURSE-CONTENT-OUTLINE.md)
- **Legacy single-file prototype (outdated, kept for history only):** [`wellness-wheel.jsx`](wellness-wheel.jsx) — the real source of truth is `app/src/`
- **Wellness Wheel app, real Vite build:** [`app/`](app/) — `npm install && npm run build`, see `app/README.md`
- **Standalone marketing website:** [`website/`](website/) — open `website/index.html` in a browser, no build step; links to the built app at `website/app/`

## What's built vs. what's still needed

**Built and working:**
- The Wellness Wheel app, a real Vite + React 19 build (`app/`) — 64-question reflection across 8 dimensions, personalised report (expressed in words, not scores), animated wheel, 8-week self-directed plan (points, streaks, badges), weekly check-ins, and a before/after week-8 comparison. Fully self-directed and private: progress persists automatically to local storage (survives a reload, no account needed), with an optional Supabase adapter for accounts + cross-device sync once a project is connected (see `app/.env.example` and `app/supabase/schema.sql`). Installable to a phone home screen (PWA manifest + icons).
- A standalone, zero-build marketing website (`website/`): landing page, sponsor pitch page, scholarship application, public supporters page, all linking to the built Wellness Wheel app. Verified end-to-end in-browser (desktop + mobile), no console errors. See `website/README.md` for details.
- Website forms wired live: waitlist, sponsor and scholarship forms POST to an n8n webhook that creates the matching record in the Notion CRM. See `STACK-AND-CONNECTIONS.md` for the full map.
- Three n8n email automations built (weekly check-in, week-8 reassessment invite, monthly sponsor impact report) — inactive until an email credential is added (see `STACK-AND-CONNECTIONS.md` §8).

**Still needed before real participants can run:**
1. An email (Gmail/SMTP) credential in n8n, attached to the three send nodes, then the workflows switched on — see the activation checklist in `STACK-AND-CONNECTIONS.md`.
2. Connect a real Supabase project (env vars + running the `app/supabase/schema.sql` migration) if cross-device accounts are wanted — the code path exists and degrades gracefully to local storage until then.
3. The 8 weekly curriculum modules written in full against the scaffold in `COURSE-CONTENT-OUTLINE.md` and the framework in `framework/`.

See the architecture doc's §10 phased build plan for sequencing.
