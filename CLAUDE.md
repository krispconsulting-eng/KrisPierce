# CLAUDE.md

Guidance for Claude Code when working in this repository.

## UI/UX Pro Max Skill

This repo has the **UI/UX Pro Max** design-intelligence skill installed at
`.claude/skills/ui-ux-pro-max/`. Use it for any UI/UX work: planning, building,
designing, reviewing, or refining interfaces, components, layouts, color
palettes, typography, charts, and accessibility.

The `ui-ux-pro-max` skill loads automatically when relevant. To query the
searchable databases directly:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain> [-n <max_results>]
```

**Domains:** `product`, `style`, `typography`, `color`, `landing`, `chart`, `ux`
(omit `--domain` to auto-detect).

**Stack-specific guidance:**

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack <stack>
```

Stacks: `html-tailwind` (default), `react`, `nextjs`, `astro`, `vue`, `nuxtjs`,
`nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`,
`jetpack-compose`.

**Prerequisite:** Python 3.x (no external dependencies).

### Workflow for UI tasks

1. Identify the product type and stack.
2. Query the relevant domains (`style`, `color`, `typography`, `landing`, `ux`).
3. Apply the recommended styles, palettes, fonts, spacing, and best practices.
4. Follow the accessibility and performance notes returned by the search.

## Writing style

- Never add opinions, claims, or colour I haven't explicitly stated.
- Don't invent authority or experience I haven't told you I have.
- If I'm sharing someone else's content, keep it to: here's the thing, it matters, go look.
- No inspirational filler. No generic closing statements.
- When in doubt, write less.
