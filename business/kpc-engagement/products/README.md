# Kris Pierce Consulting: the six products

Each folder holds everything needed to deliver one offer the same way every time. Website copy for all six is in `../website/`. All of it is draft for Kris's approval; nothing is published. Site in scope: krispierce.com.au only.

| # | Product | Price (AUD, ex GST) | Kris's time | Folder | What is in it |
|---|---|---|---|---|---|
| 1 | CEOF Diagnostic | Free | None | `01-ceof-diagnostic/` | Working diagnostic page, 28-statement question set, scoring, go-live steps |
| 2 | Diagnostic Debrief | $1,500 | 0.6 day | `02-diagnostic-debrief/` | Pre-session questionnaire, 90-minute session guide, six-page action plan template, emails |
| 3 | Strategic Advisory Sprint | $12,000 | 5 days | `03-advisory-sprint/` | Four-week plan, kickoff agenda, interview guide, decision paper template, leadership briefing outline, emails |
| 4 | Consumer Engagement Design | $18,000, $30,000 or $45,000 | 8, 12 or 18 days | `04-engagement-design/` | Three fixed sizes, phase plan, recruitment and payment kit, three session plans, synthesis method, framework template, emails |
| 5 | Ongoing Strategic Advisor | $3,500 or $6,500 a month | 1.5 or 3 days a month | `05-retained-adviser/` | Two tiers, onboarding kit, monthly rhythm, quarterly review, conflict and boundaries, emails |
| 6 | In-house co-design training | $9,500 | 2 days | `06-co-design-training/` | Full-day run sheet, participant workbook, pre-work, 30-day follow-up |

`CEOF-REFERENCE.md` holds the seven domains, five levels and first moves, taken from Kris's own n8n workflows. Every product uses those names.

## Website copy (`../website/`)

| File | Use |
|---|---|
| `product-pages-data.js` | Six pages in the live site's data format (`window.PRODUCT_PAGES`), with added price, inclusions, steps and FAQ fields |
| `product-pages-copy.md` | The same six pages as readable copy |
| `offers-index-section.md` | "Ways to work with me" section for the home and work-with-me pages |
| `diagnostic-landing-copy.md` | Landing copy, consent wording and result copy for the diagnostic |
| `implementation-notes.md` | Which live files change, new entry pages, markup, pre-publish checklist |

## The path a client takes

Diagnostic (free) → Debrief ($1,500, credited against a sprint within 60 days) → Sprint ($12,000) → Engagement Design, Ongoing Advisor or training.

## What still needs Kris

See "Product and website decisions" in `../../DECISIONS-FOR-KRIS.md`.

## Working documents by offer

Every file below is a draft for Kris's approval. Decision trees are drawn as flowcharts and also written as numbered steps; all 19 were checked to parse. One page shows them all: `00-decision-trees/decision-trees.html`.


### Every enquiry

- **Decision trees:** `DECISION-TREES.md`, `decision-trees.html`

### 1. Engagement Review (CEOF Diagnostic)

- **Product definition:** `AUDIENCE-VERSIONS.md`, `PRODUCT.md`
- **The working review:** `diagnostic.html`
- **Decision trees:** `result-routing-decision-tree.md`
- **Templates, guides and forms:** `report-prompt-charity.md`, `report-prompt-pharma.md`, `report-template-charity.md`, `report-template-pharma.md`, `two-respondent-comparison-worksheet.md`

### 2. Diagnostic Debrief

- **Product definition:** `PRODUCT.md`
- **Decision trees:** `debrief-to-next-step-decision-tree.md`, `priority-decision-tree.md`
- **Templates, guides and forms:** `action-plan-template.md`, `intake-and-conflict-check-form.md`, `pre-session-questionnaire.md`, `session-guide.md`, `session-questions-pharma.md`
- **Worked examples (illustrative, not real clients):** `action-plan-example-charity.md`, `action-plan-example-pharma.md`
- **Emails:** `emails.md`

### 3. Strategic Advisory Sprint

- **Product definition:** `PRODUCT.md`
- **Decision trees:** `sprint-type-decision-tree.md`
- **Templates, guides and forms:** `change-request-template.md`, `close-out-checklist.md`, `decision-paper-template.md`, `interview-guide.md`, `interview-synthesis-grid.md`, `kickoff-agenda.md`, `leadership-briefing-outline.md`, `one-page-quote-template.md`, `options-appraisal-template.md`, `scoping-checklist-and-go-no-go.md`, `sprint-plan.md`
- **Emails:** `emails.md`

### 4. Consumer Engagement Design

- **Product definition:** `PRODUCT.md`
- **Decision trees:** `consumer-payment-decision-tree.md`, `level-of-involvement-decision-tree.md`, `method-selection-decision-tree.md`, `size-decision-tree.md`
- **Templates, guides and forms:** `change-request-template.md`, `close-out-checklist.md`, `co-design-session-plans.md`, `consumer-recruitment-and-payment-kit.md`, `engagement-framework-template.md`, `one-page-quote-template.md`, `phase-plan.md`, `risk-and-safeguarding-log.md`, `session-record-template.md`, `synthesis-method.md`
- **Emails:** `emails.md`
- **Trackers and logs:** `project-tracker.csv`

### 5. Ongoing Strategic Advisor

- **Product definition:** `PRODUCT.md`
- **Decision trees:** `conflict-check-decision-tree.md`, `fit-decision-tree.md`, `renewal-decision-tree.md`, `request-triage-decision-tree.md`
- **Templates, guides and forms:** `conflict-and-boundaries.md`, `decision-log-template.md`, `monthly-rhythm.md`, `onboarding-kit.md`, `one-page-agreement-summary.md`, `quarterly-review-template.md`
- **Emails:** `emails.md`
- **Trackers and logs:** `time-and-advice-log.csv`

### 6. In-house co-design training

- **Product definition:** `PRODUCT.md`
- **Decision trees:** `format-decision-tree.md`
- **Templates, guides and forms:** `booking-form.md`, `certificate-of-completion-template.md`, `facilitator-checklist.md`, `follow-up.md`, `one-page-quote-template.md`, `participant-evaluation-form.md`, `pre-work.md`, `run-sheet.md`, `slide-outline.md`, `workbook.md`
