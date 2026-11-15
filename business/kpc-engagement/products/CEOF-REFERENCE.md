# CEOF reference: the facts every product draws on

Source: Kris's own n8n workflows "CEOF: Diagnostic Report Engine" and "CEOF: Lead Capture" (read 15 November 2026, not changed). Use these names exactly. Do not invent alternatives.

## Name

Community Engagement Operating Framework (CEOF). The diagnostic is the CEOF Diagnostic.

## The seven domains, with the first move for each

| # | Domain | Suggested first move (from the workflow) |
|---|---|---|
| 1 | Purpose and Governance | Take a one-page proposal to the next board meeting: why the organisation involves its community, who is accountable, and what it needs. |
| 2 | Voice and Representation | Stand up one small advisory group with clear terms of reference and one real decision on its agenda. |
| 3 | Capability and Culture | Build a simple induction for community members and a one-session briefing for staff. |
| 4 | Engagement Practice | Add one question to project planning: what decision is this, and what involvement does it warrant? |
| 5 | Safety, Ethics and Recognition | Adopt and publish a recognition and payment policy for community members, even a modest one. |
| 6 | Feedback and Learning | Close one loop this month: go back to the last group consulted and tell them what happened to their input. |
| 7 | Outcomes and Impact | Ask the community one question: what outcome would tell you we are doing our job? Start measuring it. |

## The five maturity levels

| Level | Name | Meaning |
|---|---|---|
| 1 | Ad hoc | Engagement happens when someone thinks of it. |
| 2 | Emerging | Genuine activity, disconnected from decisions. |
| 3 | Structured | Reliable mechanisms exist but involvement does not yet shape plans. |
| 4 | Embedded | Community involvement is part of how decisions get made. |
| 5 | Community-led | Community shares power over direction, priorities and resources. |

## How it scores

Each domain gets a score from 0 to 5 (one decimal). Overall is the mean of the seven. The level is the overall score rounded to the nearest whole number. The three lowest domains are the priorities. A low score is framed as a starting line, not a verdict. Re-assessment is suggested at 12 months.

## What the workflow does

A web form posts `organisation`, `contact`, `email` and `d1` to `d7` to a webhook. The workflow scores, logs the result to a Notion database ("CEOF Diagnostic Results"), drafts a 900 to 1,200 word report with Claude, and emails it. Leads go to a second Notion database ("CEOF Leads") with organisation size (1-5, 6-20, 21-50, 51+) and source.

## State of the build (findings)

- Both workflows are inactive. The report-drafting and email nodes are disabled, waiting on an API key and SMTP.
- No question set or web form exists in the site repository. `products/01-ceof-diagnostic/` in this folder supplies both.
- The webhook runs on `flows.scn2aaustralia.org`, the charity's automation server. A Kris Pierce Consulting product should not run on SCN2A Australia infrastructure.
- The report prompt is written for "small not-for-profit organisations". Research teams and companies need their own wording.
- The report points to an "implementation toolkit" that was not found.
- The email signs off "KrispConsulting" from kris@krispierce.com.au; the brand name is Kris Pierce Consulting and the public contact is info@krispierce.com.au.
