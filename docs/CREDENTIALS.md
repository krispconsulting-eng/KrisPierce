# Credentials setup

You obtain and enter every secret yourself. Nothing below asks you to paste a
key into chat. Two storage locations are used:

1. **n8n's built-in credential vault** — for anything an n8n node talks to
   directly (Fathom, Tella, Gamma, Blotato, Windsor AI, Flodesk, Apify,
   Notion, OpenAI). n8n encrypts these at rest with `N8N_ENCRYPTION_KEY` and
   they never touch this repo.
2. **This repo's `.env`** (git-ignored, copy from `.env.example`) — only for
   values a local script needs outside of n8n, and for n8n's own runtime
   config if you self-host it from this repo.

General rule: if a workflow step runs inside n8n, add the credential in the
n8n UI (**Credentials → New**) the first time you configure that node. If a
script in `scripts/` needs it directly, put it in `.env`.

---

## n8n (self-hosted)

- Generate an encryption key once: `openssl rand -hex 32` → `N8N_ENCRYPTION_KEY` in `.env`.
- If you want scripts or CI to manage workflows via the n8n REST API: n8n UI → **Settings → n8n API → Create an API key** → `N8N_API_KEY` in `.env`.
- All downstream service credentials (Fathom, Blotato, etc.) are entered directly in the n8n UI when you build each node — not in `.env`.

## Fathom

- Fathom → **Settings → Integrations → API** → generate a key.
- Enter it in n8n as an **HTTP Header Auth** credential (or Fathom's native n8n node if installed), used by the "New call recorded" trigger workflow.
- Also stored as `FATHOM_API_KEY` in `.env` only if a local script needs to poll Fathom directly.

## Tella

- Tella → **Settings → Integrations** → enable Webhooks (or API access if your plan includes it).
- Copy the webhook signing secret → `TELLA_WEBHOOK_SECRET` in `.env` (used to verify inbound webhook payloads if you build a receiver outside n8n) and/or paste into the n8n Webhook node's validation step.
- If Tella exposes a REST API on your plan, generate an API key the same way → `TELLA_API_KEY`.

## Gamma

- Gamma → workspace **Settings → Developer/API** → create an API key.
- Add as an n8n **HTTP Request** credential (Header Auth, `Authorization: Bearer ...`) for the deck/one-pager generation step.

## Notion

- Go to https://www.notion.so/my-integrations → **New integration** → copy the **Internal Integration Secret** → `NOTION_API_KEY`.
- In Notion, open each database (Clients, Content Calendar, SOPs) → **...** menu → **Connections** → add your integration so it can read/write that database.
- Copy each database's ID from its URL into `.env`: `NOTION_CLIENTS_DB_ID`, `NOTION_CONTENT_CALENDAR_DB_ID`, `NOTION_SOPS_DB_ID`.
- Same secret is entered as a Notion credential inside n8n and in Claude Code's Notion MCP connector if you use that instead of raw API calls.

## Blotato

- Blotato → **Settings → API** → generate a key.
- Add as an n8n credential (Header Auth) used by the "publish everywhere" workflow. Connect your individual social accounts (IG, TikTok, YouTube, LinkedIn, etc.) directly inside Blotato's own dashboard — Blotato holds those OAuth tokens, not n8n.

## Windsor AI

- Windsor AI dashboard → **API Access** → copy your API key.
- Connect each social platform's analytics source inside Windsor's own dashboard (it handles those OAuth connections). n8n only needs the single Windsor API key to pull the aggregated data on a schedule.
- Add as an n8n HTTP credential; optionally also `WINDSOR_API_KEY` in `.env` if a local script queries it.

## Flodesk

- Flodesk → **Settings → Integrations → API Key** → generate one.
- This same key is used both by the n8n Flodesk node/HTTP credential and by the Flodesk MCP connector if you connect it to Claude Code (Claude Code → connector settings → Flodesk → paste key into the connector's own secure credential store, not into chat).

## Apify

- Apify Console → **Settings → Integrations** → copy your personal API token.
- Add as an n8n Apify credential (native node or HTTP Header Auth) used by the scheduled competitor-scraping workflow. Note the actor ID(s) you use for scraping in the workflow's parameters.

## OpenAI (image generation only)

- https://platform.openai.com/api-keys → create a key scoped to this use only if you use project-scoped keys.
- Store as `OPENAI_API_KEY` in `.env` for `scripts/generate_image.py`, and/or as an n8n OpenAI credential if image generation is triggered from an n8n workflow instead of a local script.

---

## Rotation & safety

- Treat every key above as sensitive: `.env` is git-ignored (see `.gitignore`); never commit it.
- Prefer the narrowest scope/plan tier each tool offers for API access.
- Rotate a key immediately if it's ever pasted somewhere outside its tool's own settings UI or this repo's `.env`.
