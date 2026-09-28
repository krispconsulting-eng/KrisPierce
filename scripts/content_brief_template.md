# Content brief template (transcript -> scripts/captions)

When a new Content Calendar row lands with status `New` and a filled-in
`Transcript` field (from Whisper), Claude Code turns it into drafts using
this brief.

## Inputs

- `transcript`: Whisper output
- `voice_notes`: short description of your tone/voice (keep a running one
  in the SOPs database and reuse it here)
- `platforms`: target platforms for this piece (from the Notion row)

## Output format

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

1. Read the transcript and extract the single core idea — don't try to cover everything.
2. Match `voice_notes` for tone.
3. Keep hooks in the first line.
4. Tailor caption length/format per platform.
5. Write the output back into the Notion row's `Script` and `Captions` fields, then set `Status` to `Drafted`.
