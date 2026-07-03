# Notion database schema

Create these three databases in Notion, then share each with your integration
(see `docs/CREDENTIALS.md#notion`) and copy their IDs into `.env`.

## Clients (`NOTION_CLIENTS_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Name | Title | Client/company name |
| Status | Select | Lead / Active / Paused / Past |
| Contact Email | Email | |
| Fathom Call Log | Relation or URL list | Link to Fathom call summaries |
| Notes | Text | Free-form |
| Next Action | Text | Synced from Fathom action items |

## Content Calendar (`NOTION_CONTENT_CALENDAR_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Title | Title | Working title of the piece |
| Status | Select | New / Drafted / Approved / Scheduled / Published |
| Source | Select | Tella / Manual / Repurposed |
| Source Recording | URL | Tella link |
| Transcript | Text | Pulled in for Claude Code to draft from |
| Script | Text | Claude Code output |
| Captions | Text | Per-platform captions, Claude Code output |
| Platforms | Multi-select | IG / TikTok / YouTube / LinkedIn / X / etc. |
| Publish Date | Date | |
| Published At | Date | Set by n8n after Blotato confirms |
| Blotato Post ID | Text | For traceability |
| Performance Notes | Text | Filled in from Windsor AI pulls |

## SOPs (`NOTION_SOPS_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Title | Title | SOP name |
| Category | Select | Content / Client Ops / Email / Research |
| Body | Page content | Step-by-step instructions |
| Last Updated | Date | |
| Owner | Person/Text | |

## Optional: Performance & Competitor Research

If you want dedicated staging areas instead of overloading Content Calendar:

- **Performance** — Platform, Metric, Value, Period, Pulled At (Windsor AI landing zone)
- **Competitor Research** — Competitor, Post URL, Metric snapshot, Trend Flag, Pulled At (Apify landing zone)
