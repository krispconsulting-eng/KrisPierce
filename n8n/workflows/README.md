# n8n workflows

Import these via **Workflows → Import from File**, then open each node
that needs auth and point it at the credential you set up per
`docs/CREDENTIALS.md`. These are intentionally minimal skeletons — extend
them in the n8n editor rather than hand-editing the JSON.

| File | Trigger | Purpose |
|---|---|---|
| `new-recording-to-notion.json` | Webhook (manual POST when you upload a file) | New recording → transcribe via Whisper → create Content Calendar row |
| `publish-on-approval.json` | Notion status poll | Content Calendar row set to Approved → post directly to Meta/YouTube/TikTok/LinkedIn → mark Published |
| `analytics-pull.json` | Schedule (daily/weekly) | Pull each platform's own analytics API → write to Notion Performance |
| `apify-competitor-scan.json` | Schedule (weekly) | Run Apify actor(s) → write results to Notion Competitor Research |

There is no Flodesk/email workflow yet — that flow is deferred until you
pick a free-tier ESP (see `docs/ARCHITECTURE.md`, Flow 4).

Since there's no Tella webhook anymore, `new-recording-to-notion.json`
expects you (or a simple folder-watch script) to POST the recording's file
location to its webhook URL after you upload it wherever you keep source
video.
