# Archive, 10 October 2026

Superseded Caregiver Wellbeing Journey build, archived under the decisions register of 10 October 2026. Nothing here is current. Files were moved with git, so full history is kept, and nothing was deleted.

Do not build from, deploy or copy wording from this folder. Current rules are in ../DECISIONS.md.

Parts that may be reused after a test against the new design:

- app/src/events.js (consent-first event pattern)
- app/supabase/schema.sql (wellness_state with row-level security)
- app/public/manifest.webmanifest (PWA manifest)
- app/src/persistence.js (localStorage persistence)

Moved here: the React app, the static Journey website, the Petal Bloom design files, the old status, handover, stack and outline documents, the Journey architecture, the old DESIGN.md and PRODUCT.md, vercel.json and the GitHub Pages deploy workflow (so neither builds from this repository any more).

Still in place: ../framework/ (the framework and eight lessons), kept as source material only, not approved. They still use the old Tiny Steps name and are being rewritten.

Related outside this repository: the Vercel project and GitHub Pages site built from the old code need to be disconnected or deleted in their own settings. Until then they keep serving the last build.
