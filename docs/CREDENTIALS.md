# Credentials setup (no-subscription version)

You obtain and enter every credential yourself — nothing goes through
chat. Two storage locations:

1. **n8n's built-in credential vault** — for anything an n8n node talks to
   directly. Encrypted at rest with `N8N_ENCRYPTION_KEY`.
2. **This project's `.env`** (git-ignored, copy from `.env.example`) — for
   local scripts and n8n's own runtime config.

---

## OpenAI (Whisper transcription + image generation)

- https://platform.openai.com/api-keys → create a key. This is
  pay-as-you-go billing, separate from any ChatGPT Plus/Pro subscription —
  add a payment method at platform.openai.com if you haven't.
- Store as `OPENAI_API_KEY` in `.env`.
- Cost is per-token/per-image — a few cents per transcript or image, not a
  monthly fee.

## Notion (free tier is fine)

- https://www.notion.so/my-integrations → **New integration** → copy the
  **Internal Integration Secret** → `NOTION_API_KEY`.
- Create the databases in `notion/DATABASE_SCHEMA.md`, share each with the
  integration (`...` menu → Connections), copy each database ID into
  `.env`.

## n8n (self-hosted, free)

- Generate an encryption key once: `openssl rand -hex 32` →
  `N8N_ENCRYPTION_KEY` in `.env`.
- Run it yourself (Docker/VPS) — no subscription needed. n8n Cloud is an
  alternative but costs money; skip it unless you want the convenience.

## Apify (free tier to start)

- Apify Console → **Settings → Integrations** → copy your personal API
  token → `APIFY_API_TOKEN` in `.env`, and/or add as an n8n credential.
- Free tier includes a monthly compute-unit allowance; you'll only need to
  pay if your scraping volume grows past it.

## Meta Graph API (Instagram + Facebook — replaces Blotato/Windsor for these platforms)

- Go to https://developers.facebook.com → create an app (type: Business).
- Add the **Instagram Graph API** and **Facebook Login** products.
- Generate a long-lived Page/Instagram access token via the Graph API
  Explorer or OAuth flow — this requires your Instagram account to be a
  Business/Creator account linked to a Facebook Page.
- Permissions needed: `instagram_content_publish`, `pages_read_engagement`,
  `pages_manage_posts`, `instagram_manage_insights`. Posting/insights
  permissions require Meta's App Review — expect this to take some time
  and require a screencast demo.
- Store the access token as an n8n HTTP Header Auth credential.

## YouTube Data API v3 + YouTube Analytics API

- https://console.cloud.google.com → create a project → enable **YouTube
  Data API v3** and **YouTube Analytics API**.
- Create OAuth 2.0 credentials (Desktop or Web app type) → complete the
  OAuth consent flow once to get a refresh token.
- Add as an n8n Google OAuth2 credential (n8n has a native YouTube node
  that uses this).
- Free — Google's quota system just limits daily request volume, no
  billing unless you request a quota increase for heavy use.

## TikTok Content Posting API + Display API

- https://developers.tiktok.com → register an app.
- Content Posting API (for publishing) requires app review; Display API
  (for basic metrics) is more accessible.
- Store the resulting access token as an n8n credential.
- Expect the review process here to be the slowest of the four platforms —
  plan for it, or start with manual posting to TikTok while the others are
  automated.

## LinkedIn Marketing/Share API

- https://www.linkedin.com/developers → create an app, request access to
  the **Share on LinkedIn** and/or **Marketing Developer Platform**
  products (Marketing API access requires an application/review for
  analytics; basic share posting is more accessible).
- Store the OAuth token as an n8n credential.

## Recording tools (no credential needed)

- **OBS Studio** (screen/webcam recording) — free, no account/API needed,
  just install it.
- **Zoom/Google Meet** built-in call recording — already part of tools you
  likely use; no extra credential.

## Email marketing (deferred)

Flodesk has no free tier, so this is on hold. When you're ready, pick a
free-tier ESP with API access (Brevo or MailerLite both qualify) and this
doc will get a section for it — same pattern as the others.

---

## Rotation & safety

- `.env` is git-ignored; never commit it.
- Prefer the narrowest OAuth scopes/permissions each platform offers.
- Expect Meta, TikTok, and LinkedIn's posting-permission app reviews to be
  the long pole here — start those applications early, since they can take
  days to weeks, independent of everything else you set up.
