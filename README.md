# KrisPierce Content & Client-Ops Automation

Automation scaffold connecting Claude Code, Fathom, n8n, Tella, Gamma,
Notion, Blotato, Windsor AI, Flodesk, Apify, and the OpenAI API into one
content + client-ops pipeline.

## Start here

1. Read **`docs/ARCHITECTURE.md`** — how the tools fit together and what
   each automated flow does.
2. Read **`docs/CREDENTIALS.md`** — exactly what API key/OAuth connection
   you need for each tool and exactly where to enter it (n8n's credential
   vault or this repo's `.env`). No secrets are ever pasted into chat.
3. Copy `.env.example` to `.env` and fill in the values that belong there
   (most service credentials live in n8n itself, not in this file).
4. Create the three Notion databases described in
   **`notion/DATABASE_SCHEMA.md`** and share them with your Notion
   integration.
5. Import the workflow skeletons in **`n8n/workflows/`** into your n8n
   instance and wire up credentials per node.

## Layout

```
docs/                  architecture + credential setup guides
notion/                database schema for Clients / Content Calendar / SOPs
n8n/workflows/          importable n8n workflow skeletons (trigger -> service -> Notion)
scripts/                local helpers (image generation, content-brief template)
.env.example            template for the few secrets used outside n8n
```

## Day-to-day flow (short version)

Record in Tella → n8n creates a Content Calendar row in Notion with the
transcript → Claude Code drafts scripts/captions in your voice → you approve
in Notion → n8n publishes via Blotato → Windsor AI and Apify feed scheduled
pulls back into Notion so Claude Code can tell you what's performing and
what competitors are doing → Flodesk performance feeds email strategy
suggestions → images are generated on demand via the OpenAI API instead of
switching apps.

See `docs/ARCHITECTURE.md` for the full diagram of each flow.
