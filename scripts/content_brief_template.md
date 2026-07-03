# Content brief template (Tella transcript -> scripts/captions)

When a new Content Calendar row lands with status `New` and a filled-in
`Transcript` field, Claude Code should turn it into drafts using this brief.
This is a prompting template, not executable code — use it directly in a
Claude Code session or wire it into an n8n "Claude Code" / HTTP step that
calls the API.

## Inputs

- `transcript`: raw Tella transcript text
- `voice_notes`: short description of the user's tone/voice (keep a running
  one in the SOPs database and reuse it here)
- `platforms`: target platforms for this piece (from the Notion row)

## Output format

Produce exactly these sections so they map 1:1 to Notion fields:

```
## Script
<full spoken script / voiceover, ready to read>

## Captions
### Instagram
<caption + hashtags>
### TikTok
<caption + hashtags>
### LinkedIn
<caption, no hashtags spam>
### YouTube
<title + description>
```

## Instructions to give Claude Code

1. Read the transcript and extract the single core idea — don't try to cover everything the speaker touched on.
2. Match `voice_notes` for tone; do not default to generic marketing voice.
3. Keep hooks in the first line — assume no context from a thumbnail.
4. Tailor caption length/format per platform (short + punchy for TikTok/IG, more context for LinkedIn, keyword-rich title/description for YouTube).
5. Write the output back into the Notion row's `Script` and `Captions` fields, then set `Status` to `Drafted`.
