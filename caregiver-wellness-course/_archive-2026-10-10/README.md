# The Caregiver Wellbeing Journey

The 8-week digital wellbeing course for family caregivers of people with rare diseases, sold to industry as sponsored seats and to individuals as self-pay.

- **Architecture (business model, CRM, onboarding, n8n automation):** [`../CAREGIVER-WELLBEING-JOURNEY-ARCHITECTURE.md`](../CAREGIVER-WELLBEING-JOURNEY-ARCHITECTURE.md)
- **Content outline (weekly themes, research grounding):** [`COURSE-CONTENT-OUTLINE.md`](COURSE-CONTENT-OUTLINE.md)
- **Wellbeing Journey app, real Vite build:** [`app/`](app/) — `npm install && npm run build`, see `app/README.md`
- **Standalone marketing website:** [`website/`](website/) — open `website/index.html` in a browser, no build step; links to the built app at `website/app/`

## What's built vs. what's still needed

**Built and working:**
- The Wellbeing Journey app, a real Vite + React 19 build (`app/`) — 64-question reflection across 8 dimensions, personalised report (expressed in words, not scores), animated wheel, 8-week self-directed plan (points, streaks, badges), weekly check-ins, and a before/after week-8 comparison. Fully self-directed and private: progress persists automatically to local storage (survives a reload, no account needed), with an optional Supabase adapter for accounts + cross-device sync once a project is connected (see `app/.env.example` and `app/supabase/schema.sql`). Installable to a phone home screen (PWA manifest + icons).
- A standalone, zero-build marketing website (`website/`): landing page, sponsor pitch page, scholarship application, public supporters page, all linking to the built Wellbeing Journey app. Verified end-to-end in-browser (desktop + mobile), no console errors. See `website/README.md` for details.
- Website forms and the app's consent-first sign-up both POST to n8n webhooks that create records in the Notion CRM, and three n8n email automations are built (weekly check-in, week-8 reassessment invite, monthly sponsor impact report). **None of these can write to Notion yet**: the Notion databases have never been shared with the n8n integration, so every Notion write currently fails 404. See `STACK-AND-CONNECTIONS.md` for the full map, the live-tested status, and the one-step fix.
- A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) builds the app and deploys the website to GitHub Pages on push, once Pages is enabled in repo settings.

**Still needed before real participants can run:**
1. Share the Notion workspace page with the "n8n" integration — the single blocker for all four n8n workflows (see `STACK-AND-CONNECTIONS.md` §6, step 1).
2. An email (Gmail/SMTP) credential in n8n, attached to the three send nodes, then all four workflows switched on — see the activation checklist in `STACK-AND-CONNECTIONS.md`.
3. Enable GitHub Pages (or point Cloudflare Pages/Netlify at `website/`) so the site is actually reachable by a real visitor.
4. Connect a real Supabase project (env vars + running the `app/supabase/schema.sql` migration) if cross-device accounts are wanted — deliberately skipped for the pilot; the code path exists and degrades gracefully to local storage until then.
5. The 8 weekly curriculum modules written in full against the scaffold in `COURSE-CONTENT-OUTLINE.md` and the framework in `framework/`.

See the architecture doc's §10 phased build plan for sequencing.
