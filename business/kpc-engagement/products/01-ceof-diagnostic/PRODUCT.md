# Product 1: CEOF Diagnostic

Free. Self-serve. The front door to every other product. Draft for Kris's approval.

## Promise

In about ten minutes an organisation sees where its community engagement stands: a maturity level, a result for each of seven domains, its three priorities and a first move for each. A written report follows by email.

## Who it is for

Chief executives, research leads, patient engagement leads and program directors who suspect their engagement is thinner than it looks and want a starting point before they speak to anyone.

## What is in this folder

| File | What it is |
|---|---|
| `diagnostic.html` | The working diagnostic: intro, seven steps, instant result. Self-contained; Kris Pierce Consulting v3.0 colours and type. |
| `PRODUCT.md` | This file: the charity question set, scoring, the path to go live. |
| `AUDIENCE-VERSIONS.md` | The two versions: the Patient Engagement Review for pharmaceutical companies (statements, first moves, landing copy) and the Community Engagement Review for charities. |

The seven domains, five levels and first moves come from Kris's existing n8n workflows (see `../CEOF-REFERENCE.md`). The 28 statements and the answer scale are new and need Kris's approval, because no question set was found anywhere.

## The answer scale

| Value | Label | Meaning |
|---|---|---|
| 1 | Not in place | It does not happen, or only when someone thinks of it. |
| 2 | Starting | It happens sometimes and depends on individuals. |
| 3 | In place | A reliable process exists. |
| 4 | Shapes decisions | It is part of how decisions get made. |
| 5 | Shared | Community members hold real say over it. |

The five values line up with the five maturity levels, so a domain score reads directly as a level.

## The 28 statements (charity version)

The pharmaceutical version has its own 28 statements in `AUDIENCE-VERSIONS.md`.

**1. Purpose and Governance**
1. We have a written statement of why we involve our community and what we want it to change.
2. A named person on the board or leadership team is accountable for community engagement.
3. The board discusses community engagement as a standing item, not only when something goes wrong.
4. Time and money are set aside for engagement, even a small amount.

**2. Voice and Representation**
1. Community members have a standing way to advise us, such as an advisory group or panel, with clear terms of reference.
2. The people we hear from reflect the range of our community, including those who are harder to reach.
3. Community members sit where decisions are made, with a vote or an equivalent say.
4. We renew who is at the table, so the same few people are not carrying it.

**3. Capability and Culture**
1. Community members get an induction and support for the roles we ask them to take.
2. Staff and volunteers have been briefed to work well with community members.
3. Leaders ask who from the community has been involved before they approve a plan.
4. Engagement is written into roles and workloads, not added on top.

**4. Engagement Practice**
1. For each project we decide what level of involvement the decision warrants before we start.
2. Community members are involved early enough to change the plan.
3. We choose the method (survey, interviews, workshop, co-design) to fit the question.
4. Timing, format, language and technology are designed around the people taking part.

**5. Safety, Ethics and Recognition**
1. We pay or otherwise recognise community members for their time, under a written policy.
2. People give informed consent and know how their stories and information will be used.
3. We have a plan for when engagement is distressing, and people know who to contact.
4. We manage conflicts of interest and funder influence openly, including with industry partners.

**6. Feedback and Learning**
1. We tell people what happened to their input, including what we did not act on and why.
2. We ask community members how the engagement itself went, and change our practice in response.
3. We keep a record of what we have heard, so new staff and projects start from it.
4. We review our engagement approach at least once a year.

**7. Outcomes and Impact**
1. We can point to decisions that changed because of community input.
2. We measure outcomes that our community told us matter.
3. We report on engagement and its results to our board, funders and community.
4. Community members help decide what success looks like and judge whether we reached it.

## Scoring

- Domain score: the mean of its four answers, to one decimal (1.0 to 5.0).
- Overall: the mean of the seven domain scores.
- Level: the overall score rounded to the nearest whole number.
- Priorities: the three lowest domains; ties go to the earlier domain.
- The page posts `audience`, `organisation`, `contact`, `email`, `benchmarkConsent` and `d1` to `d7`, which is what the existing report workflow expects (the two extra fields are ignored until the workflow is updated).

Tested end to end in a browser on 15 November 2026: validation blocks an unanswered step, the scores and priorities compute correctly, and the page fits a phone screen. Not tested: posting to the webhook, because the workflow is inactive.

## What it leads to

The result page offers the Diagnostic Debrief ($1,500). The follow-up emails are in `../../assets/diagnostic-nurture-sequence.md`. Target: one in seven completions books a debrief.

## To go live

1. Kris approves or edits the 28 statements and the scale.
2. Move the two CEOF workflows off `flows.scn2aaustralia.org` to an automation account owned by Kris Pierce Consulting. A commercial product should not run on the charity's server.
3. In the report workflow: add the API credential and SMTP, enable the two disabled nodes, change the sign-off to Kris Pierce Consulting, and replace "small not-for-profit organisations" with wording driven by `audience`. Remove or write the "implementation toolkit" it refers to.
4. Add `audience` and `benchmarkConsent` to the Notion results database, and a second report prompt and set of first moves for companies.
5. Set `WEBHOOK_URL` and `DEBRIEF_URL` at the top of the script in `diagnostic.html`. Once the webhook is set, the page requires an email address.
6. Place the page at `/diagnostic` on krispierce.com.au, with the landing copy in `../../website/diagnostic-landing-copy.md` and the privacy wording.
7. Run one real submission through and read the emailed report before announcing it.

## Decisions for Kris

- Approve the statements. Should research teams and companies see reworded versions ("participants", "patients") or the same set?
- Confirm the CEOF is Kris's to commercialise. One Drive note says it was derived from work for the Epilepsy Foundation; check that contract's IP clause.
- Is the instant on-screen result enough at launch, with the emailed report added once the workflow is live?
- Benchmark: publish a "State of community engagement" note once 50 organisations have consented?

## Limits

It is a self-assessment. One person's answers reflect one person's view; the debrief exists partly to test that view. Do not describe the result as an audit, accreditation or assurance.
