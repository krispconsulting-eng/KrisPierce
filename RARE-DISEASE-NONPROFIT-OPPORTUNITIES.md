# Where Rare Disease Nonprofits Need Help (Beyond Drug Development)

**A market map for Rare Intelligence — five problem areas, fifty service ideas, mapped to Kris's skill set.**

Status: research complete, decision-ready. Last updated: 2026-07-02.

---

## 0. The 30-second version

Rare disease patient organisations are almost all tiny, volunteer-run, and drowning — not in science, but in **admin, content, fundraising, and data they don't have the hands to manage.** Drug development gets the funding and attention. Everything else — the newsletter, the grant application, the intake spreadsheet, the burnt-out board — is held together by unpaid parents doing it at 11pm.

That's the gap. Big consultancies don't want $2–15k engagements. Generic AI-for-nonprofits tools don't understand genetic disease, HTA submissions, or what it's like to run an org while parenting a child with the condition. You sit exactly in that gap: you've *been* the exhausted founder, you know the researchers and the policy bodies, and you already use the tools (Claude, n8n, Notion) that would fix this for other people, right now, in your own business.

This document identifies **five evidenced problem areas**, **ten concrete service ideas in each (50 total)**, and maps every one to your specific background — with honest pros and cons — so you can pick where to start.

---

## 1. Evidence base: what's actually documented

| Finding | Source |
|---|---|
| Funding (83%) and public awareness (72%) are the top two challenges reported by rare disease patient advocacy group (PAG) leaders — well ahead of drug-development-specific barriers | Survey of 159 PAG leaders, *Ther Adv Rare Dis* 2023 ([PMC10184204](https://pmc.ncbi.nlm.nih.gov/articles/PMC10184204/)) |
| 47% of rare disease PAGs have **no paid staff at all**; most common annual budgets are $10k–$50k or $100k–$200k; funding comes mainly from donations (93%), events (74%), corporate sponsors (52%) | Same survey |
| RDPO leaders describe themselves as overstretched — "it's like drinking from a firehose... you pick and choose your battles" — with workload precluding collaboration | Qualitative interview study, *PMC9700154* |
| 19/20 leaders see filtering/simplifying complex information for families as core work; 8/20 explicitly want a centralised, independent information resource | Same study |
| Nearly all RDPOs (97%) aim to provide information/education to patients and families; 90% provide social support/networking; 79% had disseminated research information — near-universal, unpaid content workload | Australian mixed-methods study, *PMC4709899* |
| Most Australian RDPOs are tiny: ~a third have ≤60 members, over a quarter had budgets ≤AU$10,000 (2012–13), more than half have zero paid staff, only ~23% have a paid leader | Same study |
| Insufficient funding and organisational capacity — not scientific barriers — were the most common reasons RDPO leaders gave for not reaching their goals (~two-thirds of open responses) | Same study |
| Only 38% of reviewed rare disease registries consulted patient orgs during design, despite 57% collecting patient-reported outcomes; ~half don't document quality-management or maintenance processes | *Orphanet J Rare Dis* registry review, 2023 |
| Registries carry real ongoing costs (IT, hosting, moderation, recruitment) with no free option once you're past a certain scale, and grant-funded registries often collapse onto volunteer goodwill once the grant ends | *J Patient Prefer Adherence*, 2023 (10.1007/s40271-023-00619-w) |
| CZI's Rare As One Network funds patient-led orgs specifically for finance, operations, and major-donor fundraising capacity building — i.e. Silicon Valley philanthropy has already identified these (not science) as the bottleneck | [CZI](https://chanzuckerberg.com/blog/international-rare-disease-organizations-czi-science/) |
| ~50% of surveyed rare disease patients/caregivers report feeling overwhelmed by care-management demands | NORD Rare Disease Diagnostic Coalition survey, 2024 |
| Nonprofits with budgets over $1M adopt AI at roughly **twice the rate** of smaller orgs (66% vs 34%) — small patient groups are the underserved side of a growing AI divide | TechSoup/Tapp *State of AI in Nonprofits 2025* |
| 92% of nonprofits use AI in some capacity, but only 7% report major capability improvement — an "efficiency plateau." 81% use AI ad hoc; only 4% have documented, repeatable workflows | NonProfitPro, reporting on the same benchmark |
| 85.6% of nonprofits are exploring generative AI, but only 24% have a formal AI strategy, and 47% have no AI governance policy at all | Same source |
| Current nonprofit AI use concentrates on grant writing (24.6%) and content marketing (33%) — these are the highest-traction, lowest-resistance entry points | Same source |
| Rare Voices Australia runs a membership model (200+ member RDPOs) and offers advocacy mentoring, but has no comparable "AI/operations capacity building" offer — that gap is open | RVA site review |
| 82% of nonprofit leaders report burnout symptoms; 85% cite low funding as the top driver; nonprofit staff turnover (19%) runs ~58% higher than other sectors | Nonprofit workforce burnout literature, 2023–24 |
| Free/near-free registry infrastructure already exists (NORD IAMRARE, CoRDS/Sanford — 2,242+ diseases, 20,000+ participants; REDCap free for nonprofits) — meaning the gap isn't "build us a registry," it's **which platform, and who configures/runs it** | NORD, CoRDS, REDCap program pages |

**Bottom line:** this is not a "nonprofits don't have AI" problem. It's an **implementation and workflow-design gap** — they have tool access (ChatGPT, Canva, free registry platforms) but no one to turn ad hoc use into a repeatable system that survives when the one engaged volunteer burns out. That's a services gap, not a tools gap — which is exactly what a consultant, not a SaaS product, fills.

*Confidence note: the six claims above marked with a specific vote in the underlying research were adversarially cross-checked against their source text. The rest come from primary/peer-reviewed sources with direct quotes extracted, but didn't get a second independent verification pass (the research run hit an account spend cap mid-verification). Treat them as well-sourced but not triple-checked — I'd sanity-check any single number before quoting it externally (e.g. in a pitch deck).*

---

## 2. The five areas

1. **Fundraising, Grants & Donor Operations**
2. **Volunteer, Board & Organisational Capacity**
3. **Patient Registries & Research Data**
4. **Communications, Content & Public Awareness**
5. **Family & Patient Navigation Support**

*(Advocacy/policy — HTA submissions, MSAC engagement, government consultations — is deliberately not one of the five "generic" areas below, because it isn't a gap for you to fill: it's already your strongest personal differentiator, and it should be woven through your positioning rather than sold as a standalone AI-automation service. More on this in §5.)*

Legend for each idea: **Effort** = your time to build/deliver once productized · **Revenue potential** = realistic pricing for this specific market · **Repeatability** = how easily this becomes a template you resell vs. bespoke work every time.

---

### Area 1 — Fundraising, Grants & Donor Operations

*(83% of PAG leaders cite funding as their #1 challenge; grant writing is already the single most common nonprofit AI use case.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 1.1 | **Grant-matching + drafting workflow** (n8n pulls new grant listings from GrantConnect/Philanthropy Australia/global registries, Claude drafts a first-pass application from your org's boilerplate) | Direct n8n + Claude fit; you already know what a rare-disease grant narrative needs | High demand (grant writing is the #1 AI use case); clear ROI story ("we found and drafted for X grants") | Grant bodies vary hugely in format; drafting quality still needs a human edit — don't oversell "AI writes your grant" |
| 1.2 | **Donor/CRM cleanup + automated thank-you & receipt workflows** | n8n + whatever free CRM (Zoho, HubSpot free tier) they already limp along with | Low cognitive load to build once, template-able across orgs | Not glamorous; some orgs resist touching donor data without a person they trust |
| 1.3 | **Monthly "funding radar" report** — curated, AI-summarised list of open grants/awards relevant to their disease area, delivered as a retainer | Positions you as ongoing advisor, not one-off | Recurring revenue, low delivery effort once the n8n pipeline exists | Requires you to maintain a good source list per disease area; commoditisable if a big org does it first |
| 1.4 | **Corporate sponsorship pitch-deck generator** (Claude + your Canva/Gamma tooling) templated per org | Leverages your comms/content instincts plus Gamma/Canva MCP access | Fast to deliver, visually impressive output, easy upsell from grant work | Sponsorship landscape is relationship-driven — AI can't replace the ask itself |
| 1.5 | **Peer-to-peer fundraising campaign kit** (auto-generated social posts, email sequences, thank-you flows for a GoFundMe/appeal) | Content generation + your podcast/webinar production experience | Seasonal demand (End-of-financial-year, Rare Disease Day) creates natural sales windows | Highly seasonal — lumpy revenue if this is your only offer |
| 1.6 | **Automated grant-reporting/acquittal assistant** — pulls activities from Notion/Todoist into funder report format | Directly reuses the Notion system you're already building for yourself | High pain relief (acquittals are dreaded); sticky once adopted | Every funder template differs; setup cost per client is real |
| 1.7 | **"Which grants are we actually eligible for" eligibility screener** (a short questionnaire + Claude cross-referencing criteria) | Simple, high-value triage tool; matches your research-literacy skills | Cheap to build, easy to demo, low ongoing cost | Value is front-loaded — hard to justify as a retainer alone |
| 1.8 | **Major-donor research briefing** — AI-assisted prospect research summarised into a one-pager before an ask | CZI explicitly flags major-donor fundraising as a funded capacity gap — direct evidence of demand | Feels bespoke/high-touch, commands higher price | Needs careful handling of personal data — reputational risk if done sloppily |
| 1.9 | **Australian grant-landscape explainer + template pack** (productized guide: NDIS ILC grants, MRFF, state health grants, philanthropic foundations, structured for RDPOs) | Your NDIS/Rare Voices/government-committee knowledge is a genuine moat here — few AI consultants have it | Sellable once, reusable forever (a true digital product, not services) | One-time revenue per buyer unless bundled into a subscription |
| 1.10 | **"Fundraising health check" audit** (1–2 hour paid diagnostic: donor data quality, channel mix, funder pipeline, quick wins) | Natural first engagement — low commitment, builds trust before bigger asks | Great top-of-funnel offer; cheap for you to deliver repeatedly | Underpriced if you're not careful — audits tend to get seen as "free" |

---

### Area 2 — Volunteer, Board & Organisational Capacity

*(47% no paid staff; 82% leader burnout; CZI already pays specifically for finance/ops capacity building.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 2.1 | **"One brain" Notion + Todoist ops system for solo/small-team RDPOs** (literally your own NOTION-BUSINESS-PLAN.md system, productized) | You've already designed and are building this for yourself — near zero extra R&D | Extremely high-fit, provable case study (your own org), directly reusable template | Every org's workflow quirks differ — some customisation always needed |
| 2.2 | **Volunteer onboarding + task-routing automation** (n8n form → Notion/Todoist → auto-assigned welcome sequence) | Straightforward n8n build; solves the #1 volunteer-management pain (orientation load) | Clear time-savings story for burnt-out coordinators | Low willingness-to-pay for pure volunteer admin unless bundled |
| 2.3 | **Board meeting → minutes → action items automation** (transcription + Claude summarisation + Todoist task creation) | Direct fit with your governance-committee experience (you know what a good board pack looks like) | High-frequency pain, fast to demo value in one meeting | Sensitive content (board discussions) — needs a clear privacy/confidentiality framing |
| 2.4 | **Succession/knowledge-capture toolkit** — structured Claude-assisted interviews with outgoing leaders, converted into a handover doc | Rare, high-value niche; matches leadership-turnover pain point (12% of PAGs cite it) | Very little competition; emotionally resonant, good story | Hard to productize — always a bit bespoke, longer delivery time |
| 2.5 | **AI governance policy template** for nonprofits (47% have none) — a fill-in-the-blanks policy + short advisory session | Cheap to build once (you already think in policy/committee terms from HTA work), sells to a wide market beyond rare disease | Fast, scalable, low delivery cost, positions you as the "responsible AI" advisor | Commoditisable — templates like this get copied/shared for free easily |
| 2.6 | **Burnout/workload audit + redistribution plan** (structured review of who does what, flags single points of failure) | Lived-experience credibility — you know what founder burnout looks like from the inside | Deeply resonant offer for this specific audience, strong word-of-mouth potential | Emotionally loaded work; requires care, not something to run at high volume |
| 2.7 | **Meeting-notes-to-action-items pipeline** across all org meetings (not just board — family support groups, research committees) | n8n + Claude, same pattern as 2.3 applied broadly | Simple to build once, sells as "never lose a follow-up again" | Overlaps with 2.3 — bundle rather than sell separately |
| 2.8 | **Standard operating procedures (SOPs) library generator** — Claude interviews the founder, produces documented processes for core org functions | Matches your instinct for structure (you're building this for your own business right now) | Builds real organisational resilience; strong case for grant funders who want sustainability plans | Requires real interview time per client — not a "set and forget" product |
| 2.9 | **Committee/AGM pack automation** (agenda, prior minutes, financial summary auto-assembled from Notion) | Governance-pack fluency from your own committee/board experience | Reduces a recurring, dreaded admin task | Needs integration with whatever accounting tool they use — variable per org |
| 2.10 | **"Micro-fractional COO" retainer** — a few hours/month of ops triage + automation maintenance, positioned as ongoing support rather than a project | Natural evolution of 2.1–2.9 into recurring revenue | Highest-value, most defensible offer in this whole list — recurring, relationship-based, hard to replace | Time-capped — this is the one offer that doesn't scale without eventually hiring |

---

### Area 3 — Patient Registries & Research Data

*(Only 38% of registries consult patient orgs in design; registries frequently die when grant funding ends; free platforms exist but need configuration/ongoing management.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 3.1 | **"Build, buy, or borrow" registry decision consult** — a structured advisory session mapping an org's needs against NORD IAMRARE, CoRDS/Sanford, REDCap, or a bespoke build | Your clinical research + SCN2A registry experience is directly relevant; this is a genuinely underserved decision-support gap | High credibility ask, clear one-off deliverable, prevents costly mistakes (real reputational upside for you) | Requires staying current on the registry-platform landscape — some maintenance overhead |
| 3.2 | **Registry sustainability/costing plan** (what ongoing IT, hosting, moderation actually costs — funders now require these) | Matches funder expectations you already understand from grant/HTA work | Directly answers a documented, named gap (grant funders demanding sustainability plans) | Numbers are platform-specific — needs real research per engagement, not just a template |
| 3.3 | **Patient-reported outcome (PRO) survey design + Claude-assisted analysis pipeline** | Clinical research literacy (PubMed, trial design) is a strong differentiator here | High scientific credibility; could lead to co-authorship/publication opportunities that build your reputation | PRO instrument design has real methodological rigor requirements — can't be rushed |
| 3.4 | **Registry recruitment content kit** (AI-drafted patient-facing explainer, consent-adjacent plain-language material, social assets to drive sign-ups) | Combines your content/comms skill with registry domain knowledge | Fast to build, reusable across disease areas, clear metric (enrolments) | Recruitment content still needs ethics/consent review by someone qualified — scope your role carefully |
| 3.5 | **Natural-language registry query assistant** (Claude layer over an org's existing REDCap/CoRDS export so non-technical staff can ask questions of their own data) | Genuine automation differentiator — most competitors won't build this | Technically impressive, strong "wow" factor for a funder demo | Real build effort; needs careful handling given patient data sensitivity |
| 3.6 | **Data-quality audit** (spot missing fields, duplicate entries, undocumented processes — addressing the "half don't document QM" gap) | Structured, checklist-driven — fits a research-trained mindset | Concrete, scoped deliverable; easy to price as a fixed-fee audit | Not recurring revenue unless bundled into an ongoing data-steward retainer |
| 3.7 | **Consent & governance document templates** for patient registries (plain-language, aligned to what HTA/ethics bodies expect) | Your HTA/MSAC governance background is a real edge — most AI consultants have zero exposure to this | High trust signal, differentiates you sharply from generic "AI agency" competitors | Legally adjacent — be explicit this isn't legal advice; get review from a lawyer before selling broadly |
| 3.8 | **Registry-to-researcher matchmaking brief** — summarise what data an org holds into a one-pager researchers can quickly assess for collaboration potential | Draws on your UNSW research-engagement role directly | Strengthens the org's research relationships, which is core to your own mission | Only valuable to orgs who already have a live registry — smaller addressable market |
| 3.9 | **Multi-registry landscape map** for a disease area (what registries exist globally, overlap, gaps) — as a paid research brief | PubMed/clinical-trials literacy + your international network (Global Genes Leadership Council, GETA) | Unique output only you (or a handful of people) could credibly produce; strong PR/thought-leadership value | Time-intensive to research well; hard to fully productize |
| 3.10 | **Grant-funded "registry health check" package** — bundle 3.1, 3.2, 3.6 into a single fundable deliverable orgs can put in a grant application | Positions the whole registry offer as something funders will actually pay for, not an out-of-pocket cost for volunteer-run orgs | Solves the "who pays for this" problem directly — ties into your grant-writing offer (Area 1) | Requires you to help write the very grant that funds your own engagement — needs careful framing |

---

### Area 4 — Communications, Content & Public Awareness

*(72% cite public awareness as a top challenge; 97% see info/education as core work; content marketing is the #2 nonprofit AI use case; 40% of leaders want a centralised information resource.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 4.1 | **Newsletter automation pipeline** (Claude drafts from a content calendar, n8n schedules/sends via Mailchimp/Substack) | Directly reuses your SCN2A Insights podcast/newsletter production experience | Fast to build, obvious time savings, easy to demo in a single session | Content still needs a human voice check — can't fully "set and forget" for a community that knows the founder's voice |
| 4.2 | **Social media content batch-generation + scheduling** (disease-awareness calendar, Rare Disease Day content, patient-story templates) | Your content background + design-skill exposure (Canva/Figma tooling) | High-frequency need, easy upsell from newsletter work, visually satisfying deliverable | Crowded market — many generic "social media AI" tools compete here; differentiation must be disease-specific |
| 4.3 | **Plain-language medical/genetics explainer library** (Claude-drafted, clinician/patient-reviewed, templated per condition) | This is close to exactly what you already built for SCN2A Australia — direct, provable case study | Addresses the explicitly-named "centralised information resource" demand (40% of leaders want this) | Needs a review/fact-check step by someone credentialed per disease — you can do it for epilepsy, but scaling to other diseases needs a reviewer network |
| 4.4 | **Website content refresh + AI-search-optimisation** (make the org's site actually answerable by Google's AI overviews and ChatGPT) | Direct fit with your React/HTML/Vercel build skills already demonstrated across krispierce1, unsw, scn2a, rareintelligence | Concrete, visible deliverable; plays to your strongest technical skill | Web build work is time-intensive and harder to fully productize than a template |
| 4.5 | **Podcast/webinar production support** (transcription, show notes, clip generation via Descript + Claude) | You already run SCN2A Insights — this is literally your own workflow, packaged for others | High credibility, direct proof-of-concept from your own show | Production support is more hands-on/service-heavy than pure automation |
| 4.6 | **Media/press kit + journalist pitch generator** for Rare Disease Day and awareness campaigns | Your advocacy media experience (Rare Revolution, Epilepsy Sparks features) gives you real insight into what press wants | High seasonal demand around Rare Disease Day (Feb) and disease-specific awareness days | Very seasonal — needs to be bundled with other offers to avoid dead months |
| 4.7 | **Multilingual translation workflow** (addressing the 26% who cite resource distribution/language translation as a significant challenge) | Claude's translation quality + your international network (GETA, Global Genes) makes this credible | Named, evidenced pain point with real global demand (many rare disease families are geographically scattered) | Medical translation carries real accuracy risk — needs disclaimers and, ideally, native-speaker review |
| 4.8 | **"Ask the community" FAQ chatbot** trained on an org's existing resources (Notion/website content) for family-support queries | Combines your Notion system-building with your family-support/education background | Strong "wow" factor, directly reduces the info-request burden on volunteers | Needs careful scoping so it doesn't give clinical advice — liability-sensitive, must be designed conservatively |
| 4.9 | **Annual report / impact report generator** (pulls the year's data from Notion/donor records into a funder-ready, well-designed report) | Combines your ops-system build (Area 2) with your design/content skills | Funders and boards genuinely value this; strong renewal trigger each year | Only useful once a year per client — needs to be one line in a broader retainer, not a standalone offer |
| 4.10 | **Personal-story/patient-voice content coaching** — help families/patients turn their story into shareable, ethically-handled content for campaigns | Deep personal relevance — you are both a subject and a facilitator of these stories | Emotionally resonant, differentiates you from any generic agency, builds strong community trust | Time-intensive, hard to templatize, requires real sensitivity and cannot be rushed or run at volume |

---

### Area 5 — Family & Patient Navigation Support

*(~50% of caregivers report feeling overwhelmed by care-management demands; this is patient/family-facing rather than org-operations-facing, but the org is usually the one expected to provide it.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 5.1 | **"New diagnosis" onboarding pathway** — a structured, AI-assisted intake that routes a newly diagnosed family to the right resources, community, and next steps | This is literally the founding purpose of SCN2A Australia — you built this once already, informally | Deepest personal credibility of anything on this list; directly addresses the #1 caregiver overwhelm stat | Emotionally high-stakes — must never feel like a chatbot replacing human contact at diagnosis; positioning has to be careful |
| 5.2 | **Care-coordination checklist/tracker template** (appointments, NDIS plan items, school/therapy follow-ups) built in Notion | Your RN background + NDIS/Rare NSW experience gives you real clinical-navigation credibility | Strong practical value, easy to demo, reusable across conditions | Close to "medical advice" territory — needs clear scoping as an organisational tool, not clinical guidance |
| 5.3 | **NDIS navigation explainer + application support content** (Australia-specific, high search demand, high family stress) | Direct fit with Rare NSW/RVA policy exposure | Extremely high-value, high-search-volume topic in Australia specifically — strong SEO/content opportunity | NDIS rules change often — content needs regular maintenance to stay accurate |
| 5.4 | **Peer-mentor matching system** (connect new families to an experienced parent/mentor via a simple form + Notion database) | Mirrors your own mentoring of regional SCN2A advocates internationally | Low build cost, high emotional value, strengthens community retention | Requires ongoing moderation/vetting of mentors — not fully "automatable" |
| 5.5 | **Clinical-trial/research-opportunity matching digest** for families (Claude summarises ClinicalTrials.gov listings relevant to their condition) | Your clinical-trials literacy (and access to trial-search tooling) is a direct match | Clear, tangible value; taps into the "information overload" pain point named in the research | Risk of raising false hope if trial eligibility isn't communicated very carefully — needs conservative, accurate framing |
| 5.6 | **School/education advocacy toolkit** (template letters, IEP/education-plan language generator for rare-disease-specific needs) | Parent-advocate lived experience gives this real authority | Addresses a near-universal but under-served need for families of kids with complex/rare conditions | Education systems vary a lot by state/country — templates need real localisation |
| 5.7 | **"Ask a nurse-advocate" triage FAQ** — an AI-assisted first-line resource (clearly scoped, non-diagnostic) pointing families to the right next step | Your RN credential adds real legitimacy here, if scoped carefully | Differentiator — very few competitors could credibly offer "built by an actual nurse-advocate" | Highest liability-sensitivity item on this whole list — needs a lawyer's eyes on scope/disclaimers before launch |
| 5.8 | **Genetic-counselling-adjacent plain-language variant/report explainer** (helps families understand a genetic report in accessible language) | Direct overlap with your genomics/HTA/Genomics Australia Advisory Council experience | Extremely high-value, poorly served market; strong differentiation | Must be explicitly positioned as educational, not diagnostic/counselling — regulatory and ethical care required |
| 5.9 | **Respite/support-service directory automation** (aggregates and keeps current a list of local respite, therapy, and support services) | Directly useful, matches your care-navigation and NDIS knowledge | Practical, evergreen value; can be built once and licensed/reused across multiple orgs | Directories go stale fast — needs a maintenance workflow (n8n re-check pipeline), not a one-off build |
| 5.10 | **Sibling/family mental-health resource hub** (curated, Claude-organised content addressing the whole-family impact of rare disease, not just the patient) | Your MWellness qualification is a direct, differentiated credential here | Underserved niche — most rare disease orgs focus only on the diagnosed individual | Smaller, harder-to-monetise audience directly; better framed as a value-add within a broader retainer than a standalone paid product |

---

## 3. What they're searching for on Google (honest confidence levels)

**High confidence** (backed by published keyword/benchmark research and direct source review):
- "AI grant writing tools for nonprofits" / "best AI tools for nonprofits [year]" — a genuinely saturated, high-volume search category; dozens of "best AI tools for nonprofits" listicles rank for it (Grantable, Instrumentl, Bloomerang, Virtuous, FreeWill, etc.). **This tells you the generic version of this query is already crowded — you cannot win on "AI tools for nonprofits" broadly.** Your wedge is the disease-specific, lived-experience angle these generic tools can't touch.
- "REDCap alternative" / "patient registry software cost" — active search category; free options (REDCap, CoRDS, NORD IAMRARE) already dominate, so paid tool sales aren't the opportunity — **advisory on which one, and how to run it, is.**
- "NDIS + [condition]" navigation queries — very high search intent in the Australian context specifically; this is a known high-traffic zone for rare disease families.
- "Nonprofit burnout" / "volunteer burnout" — well-documented as a widely searched, widely written-about pain point (82% of leaders report symptoms).

**Medium confidence** (plausible based on adjacent evidence, not directly confirmed by keyword data):
- "[disease name] + support group" / "[disease name] + registry" — long-tail, disease-specific searches families and clinicians run; low volume per term but you can dominate a small pond per condition, which is exactly the SCN2A Australia playbook already proven to work.
- "How to write a grant for a small charity Australia" — plausible high-intent query given the evidenced funding pain point, but not independently confirmed in this research pass.
- "AI governance policy nonprofit template" — plausible given 47% of nonprofits have no AI policy, but this is an inferred gap, not a confirmed search term.

**Low confidence / unconfirmed:** anything about specific autocomplete strings or "People Also Ask" boxes — this research pass didn't have live SERP-scraping access, so treat any specific phrasing claims elsewhere as directional, not literal.

**The pattern that matters most:** broad "AI for nonprofits" is saturated. Nobody has claimed **"AI for rare disease patient organisations"** specifically. That's a wide-open, low-competition niche you can own outright — and it's a niche where generic AI consultants structurally cannot compete with you, because they don't have the clinical/governance/lived-experience credibility.

---

## 4. Gap analysis: where demand is real and supply is thin

Cross-referencing "evidenced pain" against "who's already serving it":

| Pain point | Who's serving it now | Gap for you |
|---|---|---|
| Grant writing/fundraising | Generic AI grant tools (Instrumentl, Grantable) + CZI (for the ~20 orgs it funds) | Thin for the other ~thousands of small orgs globally; near-zero AU-specific + disease-specific competition |
| Registry build/run decisions | NORD, CoRDS offer free platforms but not advisory on *which* to pick or how to sustain it | Wide open — this is a genuine, named, unfilled niche |
| Ops/automation for volunteer-run orgs | Nobody, structurally — too small for consultancies, too complex for a template alone | Wide open, and your own Notion/n8n system is a ready-made proof of concept |
| Content/awareness | Crowded generically (every nonprofit content agency claims this) | Thin specifically for rare disease — plain-language genetics/medical content requires domain credibility most agencies lack |
| Family navigation | Individual patient orgs do this ad hoc; no productized cross-disease offer exists | Wide open, but the highest-liability area — must be scoped very carefully |
| AI governance/policy for nonprofits | A handful of larger-nonprofit consultancies (Candid, TechSoup) at scale, nothing rare-disease-specific | Moderate gap — an easy add-on, not a lead offer |

---

## 5. Recommended shortlist — where to actually start

Ranked by **lowest effort to first sale × highest credibility fit × clearest path to repeat/recurring revenue.**

1. **2.1 — "One brain" ops system for solo RDPOs.** You're already building it for yourself. Turn your own build into Client #1's build. Fastest path to a real case study.
2. **1.1 + 1.6 — Grant-matching/drafting + acquittal automation.** Highest documented pain point (83%), fastest to demonstrate ROI, and it's the single most "already normalised" AI use case in this sector — lowest resistance to adopt.
3. **3.1 — Registry "build/buy/borrow" decision consult.** Zero real competition, high credibility, positions you as the trusted independent voice (not a vendor pushing their own platform).
4. **4.3 — Plain-language explainer library.** You've already done this exact work for SCN2A. Package it, and it becomes both a lead magnet (SEO-friendly, demonstrates expertise for free) and a paid product for other disease communities.
5. **2.10 — Micro-fractional COO retainer.** Not a starting offer, but the destination: once 2.1, 1.1, and 3.1 prove out with a few clients, bundle into an ongoing retainer. This is where actual recurring revenue lives.

**Positioning line to test:** *"AI and automation built by someone who's run a rare disease charity from the kitchen table — not a generic nonprofit tech vendor."* Your unfair advantages — RN/MHSc/MWellness credentials, HTA/MSAC/Genomics Australia governance seats, SCN2A Australia founder track record, UNSW research engagement, and hands-on Claude/n8n/Notion fluency — are a combination literally no competitor in this space has. Lead with lived experience + governance credibility; let the AI/automation be *how* you deliver, not *what* you're selling.

**What to deliberately not lead with:** area 5 (family navigation) items involving anything clinical-adjacent (5.1, 5.7, 5.8) — huge trust value, but get a lawyer's eyes on scope and disclaimers before offering these publicly, given the liability profile. Start with the operational/back-office offers (Areas 1–3) where the downside of getting it wrong is "an inefficient workflow," not "a family made a decision based on bad medical framing."

---

## 6. Caveats on this research

- Six claims above were adversarially cross-checked against source text (3-vote verification). The remaining ~19 sourced claims have direct quotes from primary/peer-reviewed sources but did not get an independent second-pass verification, because the research run hit an account spend limit mid-verification. Numbers worth quoting externally (in a deck, a grant application, a pitch) should get a quick independent check first.
- Live Google autocomplete/"People Also Ask" data wasn't directly scraped — the search-demand section above is built from published keyword-research articles and inference from documented pain points, and is flagged by confidence level throughout.
- Full-page fetches were blocked for several government/RVA/candid.org pages during this research pass (network policy in this environment), so the Australian-specific section leans more on search snippets than full-document extraction. Worth a manual follow-up read of the Rare Voices Australia NDIS/advocacy pages directly.
