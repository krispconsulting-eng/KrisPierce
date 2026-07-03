# Workflow architecture

## Roles

| Tool | Role |
|---|---|
| Claude Code | Hub: turns transcripts into scripts/captions, writes automations, generates images via OpenAI API |
| Fathom | Records/transcribes client calls, produces summaries + action items |
| n8n | Scheduling/triggering glue between every other tool |
| Tella | Records screen+webcam, auto-edits |
| Gamma | Text → slide decks / one-page sites |
| Notion | System of record: Clients, Content Calendar, SOPs |
| Blotato | One post/video → many social platforms |
| Windsor AI | Aggregated social analytics |
| Flodesk | Email marketing |
| Apify | Competitor content/comment scraping |
| OpenAI API | Image generation only (thumbnails, graphics, mockups) |

## Flow 1 — Content pipeline

```
Tella recording finished
   -> n8n: Tella webhook trigger
   -> n8n: fetch transcript, create "Content Calendar" row in Notion (status: New)
   -> Claude Code: read transcript, draft scripts/captions in the user's voice,
      write drafts back into the Notion row (status: Drafted)
   -> user approves in Notion (status: Approved)
   -> n8n: on status change to Approved, send video + captions to Blotato
   -> Blotato publishes across platforms
   -> n8n: update Notion row (status: Published, published_at)
```

## Flow 2 — Analytics feedback loop

```
n8n: scheduled (e.g. daily/weekly)
   -> pull Windsor AI aggregated analytics
   -> write/append to a Notion "Performance" view or database
   -> Claude Code: summarize what's performing, suggest what to make more of
      (posted back into Notion or delivered as a digest)
```

## Flow 3 — Competitor research

```
n8n: scheduled (e.g. weekly)
   -> run Apify actor(s) against tracked competitor accounts/posts
   -> store results in Notion (or a staging DB)
   -> Claude Code: flag trends worth reacting to, propose content ideas
```

## Flow 4 — Email strategy

```
n8n: scheduled
   -> pull Flodesk campaign performance
   -> Claude Code: analyze open/click data, suggest next campaign angle/segment
   -> (optional) Claude Code drafts the next email, human sends via Flodesk
```

## Flow 5 — Slide decks / one-pagers

```
User or Claude Code has a text brief (e.g. client proposal, lead magnet)
   -> Gamma API generates a deck or one-page site
   -> link stored on the relevant Notion page (client or content record)
```

## Flow 6 — Images on demand

```
Claude Code needs a thumbnail/graphic/mockup
   -> calls OpenAI Images API directly (scripts/generate_image.py or inline)
   -> saves output, attaches to the relevant Notion record
```

## Notion as system of record

Every flow above reads or writes to Notion so state never lives only inside
n8n or a chat transcript. See `notion/DATABASE_SCHEMA.md` for the three
databases and the exact fields each workflow expects.
