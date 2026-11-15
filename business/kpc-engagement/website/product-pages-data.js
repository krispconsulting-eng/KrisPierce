/* Kris Pierce Consulting: product page content. DRAFT for Kris's approval.
   Nothing in this file is live. It is not loaded by the site until Kris approves it.

   What it is
   Copy for the six priced offers on krispierce.com.au, in the same format as the
   live service-pages-data.js, so service-pages.jsx can render it with small changes.

   How it maps to the live file
   Each object carries the live PROGRAM_PAGES fields unchanged in name and type:
     slug, eyebrow, titleLead, titleAccent (renders in teal, weight 600), lede,
     metaDescription, who, delivers[], how, why.
   It adds fields the renderer can adopt:
     price, priceNote, duration, includes[], notIncluded[], steps[{title, text}],
     faq[{q, a}], ctaLabel, ctaHref, next, proof.
   A program page that ignores the added fields still renders correctly from the
   live fields alone.

   Which live entries it would replace
   Three objects here reuse live slugs and would replace the matching entries in
   window.PROGRAM_PAGES in service-pages-data.js:
     'strategic-advisory-sprint'   (lede replaced: the live lede uses a banned word)
     'consumer-engagement-design'  (live lede kept)
     'ongoing-strategic-advisor'   (live lede kept)
   Three are new and need new entry HTML files under /advisory/:
     'ceof-diagnostic', 'diagnostic-debrief', 'co-design-training'.
   The fourth live program entry (the alignment program) is not one of these six
   and is left as it is.

   Rules this copy follows
   Australian English. First person singular. No em or en dashes. Prices in AUD,
   excluding GST. No invented clients or results: each "proof" field is a marked
   slot and should not render until Kris fills it. Text in square brackets that
   starts with "Kris:" is a question for Kris, not copy.

   PRODUCT_PAGES_SHARED holds lines that appear once per page, in the footer area. */

window.PRODUCT_PAGES_SHARED = {
  gstNote: 'All prices are in Australian dollars and exclude GST.',
  charityRate: 'Charity rate: organisations with annual revenue under $1 million receive 25% off the Strategic Advisory Sprint and the in-house co-design training. Places are limited each quarter.',
  independence: 'My government advisory appointments are held independently of this practice. Clients receive no access to those bodies or their deliberations.',
  medicalNote: 'Nothing on this page is medical advice.',
};

window.PRODUCT_PAGES = [
  {
    slug: 'ceof-diagnostic',
    eyebrow: 'Diagnostic · Free',
    titleLead: 'CEOF',
    titleAccent: 'Diagnostic',
    lede: 'See where your consumer engagement stands, in about ten minutes, before you speak to anyone.',
    metaDescription: 'A free, self-serve diagnostic of your consumer engagement across seven domains. About ten minutes, an instant result and a written report. Kris Pierce Consulting.',
    who: 'Patient organisations, research teams, companies and agencies that are expected to show how consumers shaped their decisions, and want an honest read of where they stand first.',
    delivers: [
      'An overall maturity level, from Ad hoc to Community-led',
      'A result for each of the seven domains',
      'Your three priority domains, each with a first move',
      'A written report sent to you by email',
    ],
    how: 'You rate about 28 statements across seven domains. Your result appears on screen as soon as you finish, and the written report follows by email. There is no call to book and nothing to pay.',
    why: 'Most organisations cannot say where their engagement is strong and where it is thin. A result you can read in ten minutes gives the next conversation something specific to work from.',
    price: 'Free',
    priceNote: 'No payment details and no call required.',
    duration: 'About ten minutes',
    includes: [
      'The Community Engagement Operating Framework (CEOF) Diagnostic: about 28 statements across seven domains',
      'An instant on-screen result with your overall level: Ad hoc, Emerging, Structured, Embedded or Community-led',
      'A result for each domain: Purpose and Governance; Voice and Representation; Capability and Culture; Engagement Practice; Safety, Ethics and Recognition; Feedback and Learning; Outcomes and Impact',
      'Three priorities, drawn from your three lowest domains, with a first move for each',
      'A written report by email',
    ],
    notIncluded: [
      'A conversation with me about the results. That is the Diagnostic Debrief.',
      'An audit or accreditation. The result reflects your own answers.',
      'Advice on any product-specific submission to a health technology assessment committee. I do not offer that work.',
    ],
    steps: [
      { title: 'Answer', text: 'Rate about 28 statements about how your organisation involves consumers. It takes about ten minutes.' },
      { title: 'See your result', text: 'Your overall level, seven domain results and three priorities appear on screen straight away.' },
      { title: 'Read your report', text: 'A written report arrives by email, with a first move for each priority.' },
      { title: 'Decide what is next', text: 'Act on the first moves yourself, or book a Diagnostic Debrief to turn the result into a 90-day plan.' },
    ],
    faq: [
      { q: 'Who should complete it?', a: 'The person closest to how engagement runs in your organisation. It works well completed with one or two colleagues in the room, so the answers reflect more than one view.' },
      { q: 'Is it really free?', a: 'Yes. You receive your result and your report without paying and without speaking to anyone.' },
      { q: 'What happens to my answers?', a: 'They are stored to produce your report. They are used in de-identified form for a sector benchmark only if you give consent. They are never sold.' },
      { q: 'What if my result is low?', a: 'A low level is a starting line, not a verdict. The report names the three domains to work on first and one move for each. I suggest taking the diagnostic again in 12 months.' },
    ],
    ctaLabel: 'Take the free diagnostic',
    ctaHref: '/diagnostic',
    next: 'Most people who want help acting on the result book a Diagnostic Debrief.',
    proof: '[Kris: add a named client result, with consent]',
  },
  {
    slug: 'diagnostic-debrief',
    eyebrow: 'Diagnostic · Debrief',
    titleLead: 'Diagnostic',
    titleAccent: 'Debrief',
    lede: 'Turn your diagnostic result into a 90-day plan.',
    metaDescription: 'A 90-minute working session on your CEOF Diagnostic results, plus a written action plan within five working days. $1,500 excluding GST. Kris Pierce Consulting.',
    who: 'Leaders who have completed the CEOF Diagnostic and want to decide what to do about it, with the people who will carry the plan in the room.',
    delivers: [
      'A 90-minute working session with me on your seven domain results',
      'Three agreed priorities',
      'A clear list of what to stop',
      'A written action plan of up to six pages, within five working days',
    ],
    how: 'I read your results before the session, so there is nothing to prepare. You and I work through the seven domains, agree three priorities and agree what to stop. The written plan follows within five working days.',
    why: 'A diagnostic tells you where you stand. It does not decide what to do first. The debrief makes that decision while the result is fresh.',
    price: '$1,500',
    priceNote: 'Excluding GST. Credited in full against a Strategic Advisory Sprint booked within 60 days.',
    duration: '90 minutes, plus a written plan within five working days',
    includes: [
      'My review of your diagnostic results before the session',
      'A 90-minute working session for you and up to three colleagues',
      'A written action plan of up to six pages, within five working days',
      'Three priorities, what to stop, and what to do in the next 90 days',
      'The fee credited against a Strategic Advisory Sprint booked within 60 days',
    ],
    notIncluded: [
      'Carrying out the plan. That is your team, or a sprint.',
      'Interviews with consumers or staff. The session works from your diagnostic results.',
      'Product-specific work on any submission to a health technology assessment committee. I do not offer that work.',
    ],
    steps: [
      { title: 'Complete the diagnostic', text: 'The debrief works from your results, so the CEOF Diagnostic comes first. It is free and takes about ten minutes.' },
      { title: 'Book a time', text: 'Tell me the decision or deadline behind the booking and who will join.' },
      { title: 'Work through the results', text: 'For 90 minutes, you and I go through the seven domains, agree three priorities and agree what to stop.' },
      { title: 'Receive your plan', text: 'Within five working days you have a written action plan of up to six pages, with what to do in the next 90 days.' },
    ],
    faq: [
      { q: 'Do I need to complete the diagnostic first?', a: 'Yes. The session works from your seven domain results. The diagnostic is free and takes about ten minutes.' },
      { q: 'Who should attend?', a: 'You, and up to three colleagues who are involved in the decisions the plan will touch.' },
      { q: 'How does the credit work?', a: 'If you book a Strategic Advisory Sprint within 60 days of your debrief, the $1,500 fee is taken off the sprint price.' },
      { q: 'Can the debrief cover a PBAC or MSAC submission?', a: 'No. I do not work on product-specific submissions or advise on how a committee is likely to respond. The debrief is about your organisation\'s general engagement capability.' },
    ],
    ctaLabel: 'Book a debrief',
    ctaHref: '/contact?offer=diagnostic-debrief',
    next: 'Where one priority needs more than a plan, the debrief leads to a Strategic Advisory Sprint, with the fee credited.',
    proof: '[Kris: add a named client result, with consent]',
  },
  {
    slug: 'strategic-advisory-sprint',
    eyebrow: 'Advisory · Sprint',
    titleLead: 'Strategic Advisory',
    titleAccent: 'Sprint',
    lede: 'Four weeks on one decision, ending with a paper your leadership team can act on.',
    metaDescription: 'Four weeks on one decision. A decision paper and a leadership briefing at the end. $12,000 excluding GST. Strategic advisory from Kris Pierce Consulting.',
    who: 'Leaders and teams with one engagement decision in front of them and a date by which it has to be made.',
    delivers: [
      'A clear read on where the decision stands now',
      'Options set out, with a recommendation and its rationale',
      'A written decision paper',
      'A briefing to your leadership team',
    ],
    how: 'A short, structured engagement on one decision. Targeted conversations, focused analysis, and a written paper. No long discovery cycles. No padded deliverables.',
    why: 'When direction is unclear, decisions stall. A sprint puts one decision in front of the people who own it, with what they need to make it.',
    price: '$12,000',
    priceNote: 'Excluding GST. A Diagnostic Debrief fee is credited if the sprint is booked within 60 days. Charity rate: $9,000 for organisations with annual revenue under $1 million, limited places each quarter.',
    duration: 'Four weeks',
    includes: [
      'Four weeks of my time on one decision: a consumer evidence plan, an engagement strategy, a trial-readiness review or a partnership approach',
      'A conflict check before the proposal is accepted',
      'Targeted conversations with the people who hold the decision',
      'Review of the documents that bear on it',
      'A written decision paper',
      'A briefing to your leadership team',
    ],
    notIncluded: [
      'More than one decision. A second decision is a second sprint.',
      'Co-design sessions with consumers. That is Consumer Engagement Design.',
      'Carrying out the decision after the briefing. An ongoing arrangement covers that.',
      'Product-specific work on any submission to a health technology assessment committee, including drafting, review or coaching. I do not offer that work.',
    ],
    steps: [
      { title: 'Week one: frame the decision', text: 'You and I agree the one decision, who owns it, and what the paper has to answer.' },
      { title: 'Week two: gather what bears on it', text: 'I read the relevant documents and speak with the people closest to the decision.' },
      { title: 'Week three: test the options', text: 'I set out the options and test a draft recommendation with you.' },
      { title: 'Week four: decide', text: 'You receive the decision paper, and I brief your leadership team.' },
    ],
    faq: [
      { q: 'What kinds of decisions suit a sprint?', a: 'A consumer evidence plan, an engagement strategy, a trial-readiness review or a partnership approach. The test is whether it can be put as one decision with a named owner.' },
      { q: 'What do you need from me?', a: 'A named decision owner, the documents that bear on the decision, and time with the few people closest to it. A date for the leadership briefing is set at the start.' },
      { q: 'Do I need to take the diagnostic or a debrief first?', a: 'No. If you already know the decision, start here. If you have had a Diagnostic Debrief in the past 60 days, its fee is credited against the sprint.' },
      { q: 'Is there a charity rate?', a: 'Yes. Organisations with annual revenue under $1 million receive 25% off. I offer a limited number of charity-rate places each quarter.' },
    ],
    ctaLabel: 'Book a sprint',
    ctaHref: '/contact?offer=strategic-advisory-sprint',
    next: 'A sprint often leads to Consumer Engagement Design where the decision calls for it, or to an ongoing advisory arrangement.',
    proof: '[Kris: add a named client result, with consent]',
  },
  {
    slug: 'consumer-engagement-design',
    eyebrow: 'Advisory · Engagement',
    titleLead: 'Consumer Engagement',
    titleAccent: 'Design',
    lede: 'Engagement approaches that influence decisions and withstand scrutiny.',
    metaDescription: 'Consumer engagement designed and delivered: discovery, co-design with consumers, synthesis, and a framework you can run. From $18,000 excluding GST.',
    who: 'Organisations that need consumer engagement to be more than a box-tick: engagement that holds up under regulatory, clinical, and policy scrutiny.',
    delivers: [
      'An engagement approach designed for the specific decision context',
      'Co-design sessions with consumers, run by me',
      'A synthesis of what was heard and what it means for the decision',
      'A framework your organisation can run without me',
    ],
    how: 'Engagement is designed from the decision backwards: starting with what the organisation needs to know, and building the approach that gets there credibly.',
    why: 'Poor engagement creates risk. Strong engagement creates confidence, internally, externally, and in the decisions that follow.',
    price: 'Focused $18,000. Standard $30,000. Full $45,000.',
    priceNote: 'Excluding GST. The proposal fixes the size and the figure before you commit. Consumer payments are at published rates and are costed as a separate line.',
    duration: 'Set in the proposal, by size',
    includes: [
      'Discovery: the decisions the engagement has to inform and who needs to be involved',
      'Co-design sessions with consumers',
      'Synthesis of what was heard, written so it can be used in a decision',
      'A framework your organisation can run',
      'A conflict check before the proposal is accepted',
      'Three sizes. Focused: one program or decision, with one consumer group. Standard: one organisation or program, with more than one consumer group. Full: several programs, sites or partner organisations.',
    ],
    notIncluded: [
      'Payments to consumers. These are made at published rates and shown as a separate line in the proposal, so you can see what goes to the people who take part.',
      'Running the framework after handover. An ongoing arrangement or training covers that.',
      'Ethics applications, unless scoped in the proposal.',
      'Consumer evidence tied to a live application before a health technology assessment committee, or any product-specific submission work. I do not offer that work.',
    ],
    steps: [
      { title: 'Discovery', text: 'I establish the decisions the engagement has to inform, what is already known, and who needs to be in the room.' },
      { title: 'Co-design', text: 'I run sessions with consumers, who are paid at published rates for their time.' },
      { title: 'Synthesis', text: 'I bring what was heard into a form your decision-makers can use, and test it with the people who contributed.' },
      { title: 'Framework and handover', text: 'You receive a framework your organisation can run, and I walk your team through it.' },
    ],
    faq: [
      { q: 'Which size do I need?', a: 'It depends on how many decisions, groups and sites are involved. Focused suits one program or decision. Full suits work across several programs or organisations. The proposal fixes the size and the price before you commit.' },
      { q: 'How are consumers paid?', a: 'At published rates, in every project. Consumer payments are costed and shown as a separate line in the proposal.' },
      { q: 'Can this be costed into a grant application?', a: 'Yes. The proposal gives a fixed figure for my work and a separate line for consumer payments, and both can be written into a grant budget.' },
      { q: 'Do you work with pharmaceutical and biotech companies?', a: 'Yes, under a written agreement, at fair market value for the work done, and within the Medicines Australia Code of Conduct. I do not design consumer evidence tied to a live application.' },
    ],
    ctaLabel: 'Discuss an engagement design',
    ctaHref: '/contact?offer=consumer-engagement-design',
    next: 'Once the framework is running, clients usually either train their team to run co-design in-house or keep me on as an ongoing adviser.',
    proof: '[Kris: add a named client result, with consent]',
  },
  {
    slug: 'ongoing-strategic-advisor',
    eyebrow: 'Advisory · Ongoing',
    titleLead: 'Ongoing Strategic',
    titleAccent: 'Advisor',
    lede: 'Consistent strategic input at the point decisions are made.',
    metaDescription: 'A retained adviser on consumer engagement: monthly working session, document review and on-call advice. From $3,500 a month excluding GST. Six-month minimum.',
    who: 'Executives, boards, and leadership teams who need a senior strategic perspective available consistently, not just at the start of a project.',
    delivers: [
      'A monthly working session on the decisions in front of you',
      'Review of documents before they go to a board, funder or partner',
      'On-call advice between sessions',
      'Continuity of thinking across initiatives',
    ],
    how: 'A retained arrangement structured around your decision rhythm. The cadence is set to fit how decisions actually get made, not an arbitrary schedule.',
    why: 'The most consequential decisions rarely arrive on a tidy timeline. An ongoing arrangement means the advice is there when the decision is.',
    price: '$3,500 a month for 1.5 days, or $6,500 a month for 3 days',
    priceNote: 'Excluding GST. Six-month minimum.',
    duration: 'Six-month minimum',
    includes: [
      'A monthly working session',
      'Document review',
      'On-call advice between sessions',
      'Either 1.5 days or 3 days of my time each month',
      'A conflict check before the arrangement starts, repeated when the work changes',
    ],
    notIncluded: [
      'Project delivery, such as co-design sessions with consumers. That is scoped separately as Consumer Engagement Design.',
      'Representing your organisation to any government body or committee.',
      'Product-specific work on any submission to a health technology assessment committee, or advice on how a committee is likely to respond. I do not offer that work.',
    ],
    steps: [
      { title: 'Set the rhythm', text: 'You and I agree the level, the day of the monthly session and the decisions coming up.' },
      { title: 'Monthly working session', text: 'Each month, you and I work on the decisions in front of you, not a standing agenda.' },
      { title: 'Between sessions', text: 'Send documents for review and call when a decision arrives early.' },
      { title: 'Six-month review', text: 'At six months, you and I look at what the advice has changed and decide whether to continue.' },
    ],
    faq: [
      { q: 'What is the difference between the two levels?', a: 'Time. $3,500 a month covers 1.5 days of my time. $6,500 a month covers 3 days, which suits organisations with more documents to review or more than one program in play.' },
      { q: 'Why a six-month minimum?', a: 'Because the value is in continuity. It takes a few months for an adviser to know your organisation well enough to be useful quickly.' },
      { q: 'What counts as on-call advice?', a: 'A question that cannot wait for the monthly session: a call or an email when a decision arrives early. It comes out of the same monthly days.' },
      { q: 'Do you take on company clients?', a: 'Yes, under a written agreement, at fair market value, and within the Medicines Australia Code of Conduct. Every arrangement goes through a conflict check first.' },
    ],
    ctaLabel: 'Discuss an ongoing arrangement',
    ctaHref: '/contact?offer=ongoing-strategic-advisor',
    next: 'An ongoing arrangement usually follows a sprint or a design project. Where a larger piece of work emerges, it is scoped as its own project.',
    proof: '[Kris: add a named client result, with consent]',
  },
  {
    slug: 'co-design-training',
    eyebrow: 'Training · In-house',
    titleLead: 'In-house co-design',
    titleAccent: 'training',
    lede: 'One day that leaves your team able to run co-design with consumers themselves.',
    metaDescription: 'One-day in-house co-design training for up to 12 people, with a workbook and a 30-day follow-up call. $9,500 excluding GST. Kris Pierce Consulting.',
    who: 'Teams in patient organisations, research groups, companies and agencies who are expected to involve consumers and have not been shown how to do it well.',
    delivers: [
      'One day of training for up to 12 people',
      'A workbook for each participant',
      'Practice on a real decision from your own work',
      'A follow-up call 30 days later',
    ],
    how: 'I run one day with your team, at your organisation. The examples are drawn from your own work, not a generic case. Thirty days later, a follow-up call looks at what the team has tried and where it stalled.',
    why: 'Engagement that depends on an outside adviser stops when the adviser leaves. A team that can run co-design keeps going.',
    price: '$9,500',
    priceNote: 'Excluding GST. Charity rate: $7,125 for organisations with annual revenue under $1 million, limited places each quarter.',
    duration: 'One day, plus a follow-up call 30 days later',
    includes: [
      'One day of in-house training',
      'Up to 12 participants',
      'A workbook for each participant',
      'A follow-up call 30 days after the training day',
    ],
    notIncluded: [
      'More than 12 participants. A larger group is a second day.',
      'Venue and catering, which your organisation provides.',
      'Travel and accommodation outside [Kris: confirm home city], quoted at cost.',
      'Running a live co-design project for you. That is Consumer Engagement Design.',
      'Coaching on any product-specific submission to a health technology assessment committee. I do not offer that work.',
    ],
    steps: [
      { title: 'Brief', text: 'Before the day, you tell me who is coming and one real decision the team is working on.' },
      { title: 'Training day', text: 'One day with up to 12 people, working from the workbook and from your own decision.' },
      { title: 'Apply', text: 'Your team uses what it learned on that decision over the following month.' },
      { title: 'Follow-up call', text: 'Thirty days later, a call covers what worked, what stalled and what to do next.' },
    ],
    faq: [
      { q: 'Who should be in the room?', a: 'The people who plan and run engagement, and at least one person with the authority to change how projects are planned.' },
      { q: 'Why is it capped at 12?', a: 'So everyone practises. Above 12, people watch instead of doing. A larger team is better served by a second day.' },
      { q: 'What does the follow-up call cover?', a: 'What the team has tried in the 30 days since the training day, where it stalled, and what to change.' },
      { q: 'Is there a charity rate?', a: 'Yes. Organisations with annual revenue under $1 million receive 25% off. I offer a limited number of charity-rate places each quarter.' },
    ],
    ctaLabel: 'Book a training day',
    ctaHref: '/contact?offer=co-design-training',
    next: 'Teams that want a framework designed with consumers move to Consumer Engagement Design; teams that want a standing second opinion keep me on as an ongoing adviser.',
    proof: '[Kris: add a named client result, with consent]',
  },
];
