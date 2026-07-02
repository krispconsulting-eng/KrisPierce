# Where Rare Disease Nonprofits Need Help (Beyond Drug Development)

**A market map for Rare Intelligence — five problem areas, fifty service ideas, mapped to Kris's skill set.**

Status: research complete, decision-ready, fully verified. Last updated: 2026-07-02.

---

## 0. The 30-second version

Rare disease patient organisations are almost all tiny, volunteer-run, and drowning — not in science, but in **admin, content, fundraising, and data they don't have the hands to manage.** Drug development gets the funding and attention. Everything else — the newsletter, the grant application, the intake spreadsheet, the burnt-out board — is held together by unpaid parents doing it at 11pm.

That's the gap. Big consultancies don't want $2–15k engagements. Generic AI-for-nonprofits tools don't understand genetic disease, HTA submissions, or what it's like to run an org while parenting a child with the condition. You sit exactly in that gap: you've *been* the exhausted founder, you know the researchers and the policy bodies, and you already use the tools (Claude, n8n, Notion) that would fix this for other people, right now, in your own business.

This document identifies **five evidenced problem areas**, **ten concrete service ideas in each (50 total)**, and maps every one to your specific background — with honest pros and cons — so you can pick where to start.

---

## 1. Evidence base: what's actually documented

*Fully adversarially verified — every claim below survived three-vote cross-checking against primary source text (2nd research pass, 103 agents, 25 claims tested: 14 confirmed, 11 explicitly refuted and dropped).*

| Finding | Confidence | Source |
|---|---|---|
| Funding (83%) and public awareness (72%) are, by a wide margin, the two most commonly reported challenges for rare disease patient advocacy group (PAG) leaders — well ahead of patient engagement (41%) and healthcare professional engagement (32%). Independently corroborated by a separate Australian study with the same top-two ranking | High | Survey of 159 PAG leaders, *Ther Adv Rare Dis* 2023 ([PMC10184204](https://pmc.ncbi.nlm.nih.gov/articles/PMC10184204/)) |
| Most rare disease patient orgs are volunteer/family-led, not staffed by paid professionals. In Australia specifically: 56% of RDPOs have **no paid staff at all**, only ~23% have a paid leader, and an estimated three-quarters are led by volunteers who are themselves patients or family members — a pattern tied to smaller size, younger org age, and lower budgets | High | *Orphanet J Rare Dis* 2016 mixed-methods study of 61 AU orgs ([PMC4709899](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4709899/)); corroborated by a 2022 review and a 2023 US survey (47% no paid staff) |
| RDPO leaders themselves identify **capacity/sophistication gaps between organisations** — some have mature systems and strong stakeholder relationships, others (typically newer/smaller) don't — as a real barrier to collaboration, and explicitly call for capacity-building support to close that gap | High | Qualitative study of 20 RDPO leaders, *Health Expectations* 2022 (PMC9700154) |
| Secondary but concrete operational pain points beyond funding/awareness: resource distribution & language/translation issues (26%, relevant to orgs working internationally), leadership turnover/voids (12%), international policy restrictions (11%), and structural competition between orgs for scarce funding (coded as a systemic funding problem, not a personality conflict) | Medium | Same two studies above |
| **Patient registries are the single most concrete, multi-source-corroborated opportunity cluster.** They're common (64% of research-active PAGs built one) but systematically under-resourced: only 38% of reviewed registries consulted patient orgs during design despite 57% collecting patient-reported outcomes; only ~51% documented a quality-management process and ~46% a maintenance/sustainability plan; only 22–24% used a standardised core dataset or coding ontology (limiting interoperability); running one requires ongoing multi-role staff time (dev, QA, moderation, marketing, hosting) with **no truly free option**; and grant-funded registries are structurally unsustainable once the grant ends — data capture either stops or falls onto unpaid volunteer labour | High | Systematic review of 37 registries, *Orphanet J Rare Dis* 2023 + practitioner guide, *The Patient* 2023 (10.1007/s40271-023-00619-w) + PMC10184204 |
| A meaningful minority of RDPO leaders (4 of 20 studied, **all parents of an affected child**) report a distinct **emotional/mental-health toll from doing advocacy work itself** — separate from the well-studied need for family/patient support — despite most leaders scoring in the normal range on standardised depression/anxiety/stress measures. The study's own authors frame this as a "new concern" | Medium | *Health Expectations* 2022 (PMC9700154) |
| CZI's Rare As One Network funds patient-led orgs specifically for finance, operations, and major-donor fundraising capacity building, plus mentorship and peer networking — i.e. major philanthropy has already identified these (not science) as the bottleneck worth funding | High (org self-report) | [CZI](https://chanzuckerberg.com/blog/international-rare-disease-organizations-czi-science/) |
| Nearly all RDPOs see information/education provision as core, near-universal, unpaid work (single-pass sourced, not re-verified this round) | Moderate | *PMC4709899* |
| ~50% of surveyed rare disease patients/caregivers report feeling overwhelmed by care-management demands (single-pass sourced) | Moderate | NORD Rare Disease Diagnostic Coalition survey, 2024 |
| Free/near-free registry infrastructure already exists (NORD IAMRARE, CoRDS/Sanford — 2,242+ diseases, 20,000+ participants; REDCap free for nonprofits) — meaning the gap isn't "build us a registry," it's **which platform, who decides, and who configures/runs it** | Moderate (direct program-page review) | NORD, CoRDS, REDCap program pages |
| General (not rare-disease-specific) nonprofit AI-adoption context: 92% of nonprofits use AI in some capacity but only 7% report major capability improvement; 85.6% are exploring generative AI but only 24% have a formal strategy; 47% have no AI governance policy; current use concentrates on grant writing and content marketing | Moderate (general nonprofit sector, not rare-disease-specific; not part of the verified claim set) | TechSoup/Tapp *State of AI in Nonprofits 2025*; NonProfitPro |

**Bottom line:** this is not a "nonprofits don't have AI" problem. It's an **implementation and workflow-design gap** — they have tool access (ChatGPT, Canva, free registry platforms) but no one to turn ad hoc use into a repeatable system that survives when the one engaged volunteer burns out. That's a services gap, not a tools gap — which is exactly what a consultant, not a SaaS product, fills.

*What got corrected between the first and second research pass: a batch of plausible-sounding stats did **not** survive the full adversarial re-check and have been removed from this document, including "47% no paid staff funded overwhelmingly by grassroots donations" (the 47% stat is accurate in isolation but the funding-mix framing overreached), a specific AU budget breakdown (≤$10k for over a quarter of orgs), "insufficient funding as the top reason leaders don't reach their goals," the "drinking from a firehose / operationally overwhelmed" causal framing I'd originally cited as confirmed evidence of burnout risk, a 41%-mandatory-field-omission registry data-quality stat, a registry-funding-source split whose numbers didn't even add to 100%, and a claim that RDPO leaders broadly lack financial/governance expertise. None of those are used above. This is a normal part of adversarial verification catching overreach — not a sign the underlying research area is weak, just that specific numbers needed to be more conservative.*

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

*(56% of AU RDPOs have no paid staff; leaders report capacity/sophistication gaps between orgs and a distinct emotional toll from the advocacy work itself; CZI already pays specifically for finance/ops capacity building.)*

| # | Idea | Mapped to you | Pros | Cons |
|---|---|---|---|---|
| 2.1 | **"One brain" Notion + Todoist ops system for solo/small-team RDPOs** (literally your own NOTION-BUSINESS-PLAN.md system, productized) | You've already designed and are building this for yourself — near zero extra R&D | Extremely high-fit, provable case study (your own org), directly reusable template | Every org's workflow quirks differ — some customisation always needed |
| 2.2 | **Volunteer onboarding + task-routing automation** (n8n form → Notion/Todoist → auto-assigned welcome sequence) | Straightforward n8n build; solves the #1 volunteer-management pain (orientation load) | Clear time-savings story for burnt-out coordinators | Low willingness-to-pay for pure volunteer admin unless bundled |
| 2.3 | **Board meeting → minutes → action items automation** (transcription + Claude summarisation + Todoist task creation) | Direct fit with your governance-committee experience (you know what a good board pack looks like) | High-frequency pain, fast to demo value in one meeting | Sensitive content (board discussions) — needs a clear privacy/confidentiality framing |
| 2.4 | **Succession/knowledge-capture toolkit** — structured Claude-assisted interviews with outgoing leaders, converted into a handover doc | Rare, high-value niche; matches leadership-turnover pain point (12% of PAGs cite it) | Very little competition; emotionally resonant, good story | Hard to productize — always a bit bespoke, longer delivery time |
| 2.5 | **AI governance policy template** for nonprofits — a fill-in-the-blanks policy + short advisory session | Cheap to build once (you already think in policy/committee terms from HTA work), sells to a wide market beyond rare disease | Fast, scalable, low delivery cost, positions you as the "responsible AI" advisor | Commoditisable — templates like this get copied/shared for free easily |
| 2.6 | **Leader wellbeing / workload audit + redistribution plan** (structured review of who does what, flags single points of failure) — grounded in the verified finding that a real subset of RDPO leaders (all parents of an affected child) carry a distinct emotional toll from advocacy work itself, separate from family-support needs | Lived-experience credibility — you know what founder burnout looks like from the inside | Deeply resonant offer for this specific audience, backed by a genuinely evidenced (if minority) finding, strong word-of-mouth potential | Emotionally loaded work; requires care, not something to run at high volume; the underlying evidence is a small sample (4/20 leaders), so frame as "some leaders" not "most leaders" |
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

## 6. Peer and market evidence that this is worth building and selling — not just useful

Section 1 establishes the pain is real. This section is different: it's evidence bearing on whether patient organisations would actually **pay** for outside help, whether capacity-building/digital-transformation support is already validated as worth funding by peer bodies, and what adjacent paid services already charge.

**Peer/institutional validation that capacity-building support is wanted and worth funding:**
- CZI's Rare As One Network doesn't just fund research — it explicitly funds organisational capacity building (finance, ops, major-donor fundraising) as its own valued deliverable. Grantee feedback describes the program as making them "feel validated and heard" and reinforcing that "their work is essential," and the GLUT1 Deficiency Foundation reports it "continues to benefit from the experience daily" — i.e. the capacity-building itself, not just the funding cheque, is what grantees credit. ([CZI](https://chanzuckerberg.com/blog/international-rare-disease-organizations-czi-science/), [GLUT1 Deficiency Foundation](https://www.g1dfoundation.org/rare-as-one-network-impact-report/))
- **EURORDIS** — the largest European rare disease umbrella body, entirely independent of CZI — runs **Rare!Together**, a program whose sole purpose is capacity building for rare disease patient organisation federations: training, close mentoring, networking, and fundraising guidance. Two major, independent funder/peer bodies on two continents have each built a dedicated program on the premise that patient orgs need, and will use, exactly this kind of external capacity-building support. ([EURORDIS Rare!Together](https://raretogether.eurordis.org/project-aims/))
- A 2025 peer-reviewed study in the *Journal of Medical Internet Research* (37 interviews + 2 focus groups with German patient organisations) found POs currently use only "basic digital tools," cite resource constraints and complexity as their top barriers to digital transformation, and that a third of interviewees (15/46) say POs carry a growing responsibility to support members' digital literacy they aren't resourced for. The authors' own recommendation — that POs need **governance frameworks**, i.e. a clear plan for digital projects — is close to a direct, peer-reviewed validation of idea 2.5 (AI governance policy template) and the "basic tools, no strategy" framing already in §1. ([JMIR 2025, e62750](https://www.jmir.org/2025/1/e62750))

**Evidence that adjacent paid services already have a real market** (proof there's a budget line for this kind of help, even in cash-poor orgs):
- Freelance/agency grant writers charge **$2,500–$6,000** for a single proposal, **$3,000–$6,000** for a reusable "template" proposal, and **$7,000–$10,000** for a complex federal grant — a real, established market already exists for paid help with the #1 documented pain point (funding, cited by 83%). ([Funding for Good](https://fundingforgood.org/how-to-determine-grant-writing-fees/))
- NORD's IAMRARE registry platform waives implementation fees but still charges roughly **$3,000/year** in ongoing maintenance — direct evidence that rare disease orgs already budget real cash for registry infrastructure, supporting willingness-to-pay for the Area 3 registry-advisory ideas.
- General AI/automation consultants charge **$600–$1,200/day** freelance, **$150–350/hour**, or **$5,000–$25,000/project**; small-org workflow-automation packages run **$8,000–$35,000** depending on scope. These are general market rates — **not rare-disease-specific, and likely too high for most $10k–$200k-budget RDPOs as a first purchase** — but they set a ceiling, and give you an anchor for premium offers like 2.10 (fractional COO retainer) or 3.9 (multi-registry landscape brief) once you're selling to better-funded orgs or networks. ([Layer3 Labs pricing guide](https://www.layer3labs.io/guides/ai-consulting-rates-pricing))
- A documented (general, not disease-specific) n8n nonprofit case study shows the exact automation pattern behind Areas 1–2 already working: donation-triggered donor updates, campaign-progress dashboards, automated event-registration follow-ups — described as freeing staff for "relationships, storytelling, and community impact" rather than replacing judgement calls. Proof the underlying pattern is proven, not speculative — just not yet proven specifically for rare disease orgs.

**What this does and doesn't establish:** this confirms that (a) major funders and peer bodies already treat capacity-building/digital-transformation support as worth building entire programs around, and (b) adjacent paid services (grant writing, registry hosting, general AI consulting) have real, established price points. It does **not** establish that a rare disease patient org would pay *you specifically* at a given price — no source here surveys willingness-to-pay for a solo rare-disease-specialist AI consultant, because that market doesn't have public pricing data yet (it's the gap you're filling). Treat the pricing figures as anchors to calibrate against, not proof of what your market will bear; the §5 shortlist remains the right place to test actual willingness-to-pay directly and cheaply before building anything elaborate.

---

## 7. Caveats on this research

The evidence base was re-run to completion with full three-vote adversarial verification (§1 reflects the corrected, final state — see the "what got corrected" note at the end of that section for exactly what was dropped and why). Remaining limits, straight from the verification run itself:

- **Sample and geographic skew.** The strongest quantitative evidence comes from two studies: a US-centric survey (n=158 PAG leaders, recruited via NORD/RDCRN/CZI, English-only) and an Australian mixed-methods study (n=61 RDPOs, data from **2012–13** — now 10–13 years old). Org structure changes slowly, so it's likely still directionally accurate, but treat any AU-specific number as dated. The leader-psychosocial-toll finding is a single-disease-area, single-country sample of 20 — directionally useful, not statistically generalisable.
- **No direct evidence on search behaviour.** Nothing in the verified claim set directly measures what nonprofit leaders type into Google (no Keyword Planner, Ahrefs, or autocomplete data was pulled) — §3's search-demand section is inference from published keyword-research articles and the documented organisational-challenges literature, not a direct measurement. Treat it as directional.
- **No direct evidence on willingness-to-pay.** The research establishes that these problems are real and unresolved in the literature — it does not establish what these orgs actually spend, or would spend, on external help. Pricing in §2's idea tables is my judgement calibrated against typical small-nonprofit consulting rates, not sourced data.
- **No competitive-landscape mapping.** The research confirms the *problems* are real; it doesn't fully map which of the 50 ideas are already being addressed by existing players (NORD IAMRARE, CoRDS, Rare Voices Australia programs, CZI Rare As One) versus genuinely open. §4's gap analysis is my own assessment layered on top of the verified evidence, not itself independently verified.
- Full-page fetches were blocked for several government/RVA pages during this research pass (network policy in this environment), so the Australian-specific section leans partly on search snippets rather than full-document extraction. Worth a manual follow-up read of the Rare Voices Australia NDIS/advocacy pages directly if you want AU-specific numbers refreshed.
