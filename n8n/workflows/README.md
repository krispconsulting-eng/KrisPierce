# n8n workflows

These are skeleton exports (JSON) you import into n8n via **Workflows → Import
from File**. Each one has placeholder credential names — after import, open
every node that needs auth and point it at the matching credential you set up
per `docs/CREDENTIALS.md`.

| File | Trigger | Purpose |
|---|---|---|
| `tella-to-notion.json` | Tella webhook | New recording → create Content Calendar row with transcript |
| `publish-on-approval.json` | Notion status change (poll) | Content Calendar row set to Approved → send to Blotato → mark Published |
| `windsor-analytics-pull.json` | Schedule (daily) | Pull Windsor AI analytics → write to Notion Performance |
| `apify-competitor-scan.json` | Schedule (weekly) | Run Apify actor(s) → write results to Notion Competitor Research |
| `flodesk-performance-pull.json` | Schedule (weekly) | Pull Flodesk campaign stats → write to Notion for review |

All workflows are intentionally minimal skeletons (trigger → HTTP/service
node → Notion write) so you can extend them in the n8n editor rather than
hand-editing JSON.
