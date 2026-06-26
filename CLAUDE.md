# CLAUDE.md

Guidance for Claude Code when working in this repository.

## 🗂️ Filing Discipline — ASK before every save/push (ACTIVE RULE)

**Status: ACTIVE — confirm on EVERYTHING.** Kris is building this habit. Until
Kris explicitly says *"I've mastered filing"* / *"drop the filing rule,"* this
applies to **every** save, push, create, or export — no exceptions — including
routine git commits, file writes, Notion pages, n8n workflows, designs, Drive
uploads, Slack canvases, and more.

**Before creating / saving / pushing anything, STOP and confirm with Kris:**
1. **What** it is (type of artifact)
2. **Name / label** — clear and consistent
3. **Exact location** — which repo/branch/folder, which Notion teamspace/parent/
   database, which n8n project, which Drive folder, etc.

Ask clarifying questions until you are **certain** it's the right place and name.
While this rule is active, never silently assume a default.

**Applies across:** Claude Code, Cowork, GitHub, Notion, n8n, design tools
(Figma / Canva / Gamma), Google Drive, Slack, Todoist, and any other destination.

**Use + maintain the Filing Map below:** when something matches an existing entry,
*propose* that location ("I'll save X to Y — confirm?") instead of asking
open-ended. When Kris agrees a new location, **add it to the map**. This makes
filing faster over time.

**Exit condition:** when Kris says she's mastered it, switch to
*silent-follow-the-map* — follow the map without asking, and only ask when the
destination is genuinely **new or ambiguous**.

### 📍 Filing Map (where things go — keep this updated)

| Type of thing | Goes to |
|---|---|
| System planning / strategy docs | repo `KrisPierce`, branch `claude/notion-api-business-plan-wyooor`, root (e.g. `NOTION-BUSINESS-PLAN.md`) |
| Setup / how-to guides | repo root (e.g. `automation-setup.md`, `MY-TODO.md`) |
| n8n workflow export files | repo folder `n8n-workflows/` |
| Notion — tasks | `✅ All Tasks` database |
| Notion — projects | `📁 All Projects` |
| Notion — quick capture / ideas | `💡 Ideas & Capture` |
| Notion — people & orgs | `👥 All Contacts` |
| Notion — meetings | `📅 All Meetings` |
| Notion — invoices / money | `💰 Money / Invoices` |
| Notion — papers / sources | `🔬 Research Library` |
| Notion — content | `🎬 Content Pipeline` |
| Notion — old / superseded | `🗄️ Archive (old …)` page |
| n8n — workflows | `Personal` project (for now). **Name:** `<Function> — <Account/Stream>` (e.g. `Calendar → Meeting Notes — Gmail`, `— SCN2A`, `— Consulting`, `— UNSW`). **Tag** same-family workflows so they group (e.g. `Calendar→Notes`). |
| Stream tag (on most items) | SCN2A Australia · UNSW · KrisPierce Consulting · Committees · Rare Intelligence · Personal/Life |

*(Add rows as new conventions are agreed. This map is the source of truth for "where things go.")*

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
