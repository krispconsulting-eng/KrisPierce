# Content & client-ops automation — architecture (no-subscription version)

This stack deliberately avoids recurring SaaS subscriptions (Fathom, Tella,
Gamma, Blotato, Windsor AI, Flodesk). Everything is either **free**, a
**free tier**, or **pay-per-use API billing** (OpenAI). The tradeoff: more
setup work per social platform (each has its own developer app + approval
process) instead of one abstraction layer doing it for you.

## Roles

| Tool | Role | Cost |
|---|---|---|
| Claude Code | Hub: drafts scripts/captions/summaries in your voice, writes automations, builds decks directly (pptx/docx skill) | Included in your Claude usage |
| OpenAI API | Whisper transcription + image generation | Pay-per-use, pennies per call |
| n8n (self-hosted) | Scheduling/triggering glue between everything | Free (your own server/Docker) |
| Notion | System of record: Clients, Content Calendar, SOPs | Free tier |
| Apify | Competitor content/comment scraping | Free tier to start |
| Meta Graph API | Direct publish + insights for Instagram/Facebook | Free (developer app + review) |
| YouTube Data API v3 | Direct upload + YouTube Analytics API for stats | Free (Google Cloud project) |
| TikTok Content Posting API / Display API | Direct publish + metrics | Free (developer app + review) |
| LinkedIn Marketing/Share API | Direct publish + analytics | Free (developer app + review) |
| Recording | OBS Studio or your OS's built-in screen recorder | Free |
| Call recording | Zoom/Google Meet's built-in recorder | Free (already part of those tools) |
| Email marketing | Deferred — pick a free-tier ESP (e.g. Brevo, MailerLite) when needed | Free tier, TBD |

## Flow 1 — Content pipeline

```
Record locally (OBS/native recorder)
   -> upload the file wherever you keep source video (Drive, local, etc.)
   -> n8n: on new file, create a Content Calendar row in Notion (status: New)
   -> OpenAI Whisper API transcribes the video/audio
   -> Claude Code: draft scripts + per-platform captions in your voice,
      write into the Notion row (status: Drafted)
   -> you approve in Notion (status: Approved)
   -> n8n: on Approved, publish directly per platform:
        - Meta Graph API (Instagram/Facebook)
        - YouTube Data API (upload)
        - TikTok Content Posting API
        - LinkedIn Share API
   -> n8n: update Notion row (status: Published, per-platform post IDs)
```

## Flow 2 — Analytics feedback loop

```
n8n: scheduled (e.g. daily/weekly), one pull per platform:
   - Meta Graph API insights
   - YouTube Analytics API
   - TikTok Display API metrics
   - LinkedIn analytics API
-> normalize + write to a Notion Performance view
-> Claude Code summarizes what's performing and what to make more of
```

## Flow 3 — Competitor research (unchanged)

```
n8n: scheduled (e.g. weekly)
   -> Apify actor(s) scrape tracked competitor accounts/posts
   -> store results in Notion
   -> Claude Code flags trends worth reacting to
```

## Flow 4 — Email strategy (deferred)

Flodesk has no free tier, so this flow is on hold until you pick a
free-tier ESP with API access (Brevo and MailerLite both qualify). Once
chosen, the pattern is identical to Flow 2: scheduled pull of campaign
stats -> Notion -> Claude Code suggests the next angle/segment.

## Flow 5 — Slide decks / one-pagers

Claude Code builds the deck directly using the pptx/docx skill instead of
calling Gamma's API — no separate subscription or API credits needed.

## Flow 6 — Images on demand (unchanged)

Claude Code calls the OpenAI Images API directly
(`scripts/generate_image.py`) for thumbnails/graphics/mockups.

## Flow 7 — Client call summaries

```
Record the call with Zoom/Google Meet's built-in recorder (free)
   -> OpenAI Whisper API transcribes it
   -> Claude Code drafts a summary + action items
   -> written into the relevant Notion Clients row
```

## Why this costs more setup time

Each social platform's own API requires you to register a developer app
and, for posting permissions specifically, often go through an app review
(Meta and TikTok are the strictest; LinkedIn and YouTube are more
straightforward). This replaces the single Blotato/Windsor AI integration
with 3-4 separate integrations. It's more work up front but has no
recurring cost and no dependency on a third party's uptime or pricing
changes.
