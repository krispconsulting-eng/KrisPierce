# Notion database schema

Create these three databases in Notion, then share each with your
integration (see `docs/CREDENTIALS.md`) and copy their IDs into `.env`.

## Clients (`NOTION_CLIENTS_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Name | Title | Client/company name |
| Status | Select | Lead / Active / Paused / Past |
| Contact Email | Email | |
| Call Summary | Text | Whisper transcript + Claude Code summary |
| Notes | Text | Free-form |
| Next Action | Text | From call summaries |

## Content Calendar (`NOTION_CONTENT_CALENDAR_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Title | Title | Working title |
| Status | Select | New / Drafted / Approved / Scheduled / Published |
| Source Recording | URL/Text | Where the raw video lives |
| Transcript | Text | Whisper output |
| Script | Text | Claude Code output |
| Captions | Text | Per-platform captions |
| Platforms | Multi-select | IG / TikTok / YouTube / LinkedIn |
| Publish Date | Date | |
| Published At | Date | Set by n8n after each platform confirms |
| Instagram Post ID | Text | |
| YouTube Video ID | Text | |
| TikTok Post ID | Text | |
| LinkedIn Post ID | Text | |
| Performance Notes | Text | From analytics pulls |

## SOPs (`NOTION_SOPS_DB_ID`)

| Property | Type | Notes |
|---|---|---|
| Title | Title | SOP name |
| Category | Select | Content / Client Ops / Research |
| Body | Page content | Step-by-step instructions |
| Last Updated | Date | |

## Optional staging tables

- **Performance** — Platform, Metric, Value, Period, Pulled At
- **Competitor Research** — Competitor, Post URL, Metric Snapshot, Trend Flag, Pulled At
