# Content & client-ops automation (no-subscription version)

Automation for a solo/small business content + client-ops pipeline, built
with **zero recurring SaaS subscriptions**. Everything is free, a free
tier, or pay-per-use API billing (OpenAI).

This intentionally does *not* use Fathom, Tella, Gamma, Blotato, Windsor
AI, or Flodesk — see `docs/ARCHITECTURE.md` for what replaces each one and
why.

## Start here

1. Read **`docs/ARCHITECTURE.md`** — how the pieces fit together.
2. Read **`docs/CREDENTIALS.md`** — exactly what to obtain from each
   platform and where to enter it. The social platform integrations
   (Meta, YouTube, TikTok, LinkedIn) require developer app registration
   and, for posting permissions, an app review — start those early, they
   take the longest.
3. Copy `.env.example` to `.env` and fill in the values that belong there.
4. Create the three Notion databases in `notion/DATABASE_SCHEMA.md`.
5. Import the workflow skeletons in `n8n/workflows/` into your self-hosted
   n8n instance.

## Layout

```
docs/                  architecture + credential setup guides
notion/                database schema
n8n/workflows/          importable n8n workflow skeletons
scripts/                local helpers (image gen, transcription, content-brief template)
.env.example            template for local secrets
```

## Day-to-day flow (short version)

Record with a free tool (OBS/native recorder) → upload → n8n creates a
Content Calendar row in Notion → OpenAI Whisper transcribes it → Claude
Code drafts scripts/captions in your voice → you approve in Notion → n8n
publishes directly to Instagram/YouTube/TikTok/LinkedIn via each
platform's own API → each platform's own analytics API feeds back into
Notion on a schedule → Apify's free tier tracks competitor content → Claude
Code tells you what's performing and what to make more of. Images are
generated on demand via the OpenAI API. Email marketing is deferred until
you pick a free-tier ESP.

See `docs/ARCHITECTURE.md` for the full flow diagrams.
