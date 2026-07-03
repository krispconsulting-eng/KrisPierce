import { useState, useEffect, useRef } from "react";

// ─── ICONS ───────────────────────────────────────────────────────────────────
// Hand-drawn line icons, matching the marketing site's icon set 1:1 (same
// path data) so the tool and the site read as one product. No emoji.
const ICON_PATHS = {
  social: <g><circle cx="9" cy="9.5" r="3.6"/><circle cx="15.5" cy="12.5" r="2.7"/><path d="M4.4 19.2c0.7-3 2.6-4.6 4.9-4.6 2.1 0 3.7 1.2 4.5 3.2"/><path d="M14.2 19.4c0.5-2 1.7-3.2 3.2-3.2 1.6 0 2.8 1.1 3.3 3"/></g>,
  occupational: <g><rect x="3.6" y="9" width="16.8" height="10.4" rx="2"/><path d="M8.6 9V7.2c0-1 0.8-1.8 1.8-1.8h3.2c1 0 1.8 0.8 1.8 1.8V9"/><path d="M3.6 13.4h16.8"/><path d="M10.7 13.4v2.2h2.6v-2.2"/></g>,
  environmental: <g><path d="M18.8 6.4c0.9 5.7-2 10.4-7.3 11.4-2.7-4.9-1.7-9.9 2.6-12.7 1.6 0.2 3.2 0.6 4.7 1.3z"/><path d="M11.5 17.8c-2.2 0.7-4.4 1-6.7 0.9"/><path d="M13.7 10.2c-1.9 1.6-3.2 3.6-3.9 6"/></g>,
  intellectual: <g><path d="M12 3.6c-3 0-5.4 2.3-5.4 5.4 0 2 1.1 3.3 2.1 4.2 0.6 0.6 1 1.1 1 1.8v0.6h4.6v-0.6c0-0.7 0.4-1.2 1-1.8 1-0.9 2.1-2.2 2.1-4.2 0-3.1-2.4-5.4-5.4-5.4z"/><path d="M9.7 18v0.6c0 0.8 0.6 1.4 1.4 1.4h1.8c0.8 0 1.4-0.6 1.4-1.4V18"/><path d="M12 6.6c-1.6 0-2.7 1.1-2.7 2.7"/></g>,
  spiritual: <g><path d="M12 20.4c-4-1.6-6.4-4.4-6.4-8.2 2.8 0.4 4.8 1.8 6.4 4.2 1.6-2.4 3.6-3.8 6.4-4.2 0 3.8-2.4 6.6-6.4 8.2z"/><path d="M12 16.4c-1.6-3.4-1.6-6.6 0-10.8 1.6 4.2 1.6 7.4 0 10.8z"/></g>,
  emotional: <path d="M12 19.4c-3.6-2.5-7.2-5.5-7.2-9.5 0-2.5 2-4.4 4.4-4.4 1.3 0 2.5 0.6 3.3 1.6 1.1-1.4 2.6-1.9 3.9-1.7 2.4 0.3 4 2.4 3.7 4.9-0.5 4-4.4 6.7-8.1 9.1z"/>,
  physical: <path d="M3.4 12.6h3.2l1.7-3.6 2.7 7.6 2.1-5.4 1.4 3h5.7"/>,
  financial: <g><path d="M4 17.4l4.4-4.6 3.3 2.6 5.2-6"/><path d="M14 9.4h3v3"/></g>,
  leaf: <g><path d="M18.8 6.4c0.9 5.7-2 10.4-7.3 11.4-2.7-4.9-1.7-9.9 2.6-12.7 1.6 0.2 3.2 0.6 4.7 1.3z"/><path d="M11.5 17.8c-2.2 0.7-4.4 1-6.7 0.9"/></g>,
  plant: <g><path d="M12 20.4V11"/><path d="M12 13.4c0-3.4-2.2-5.6-5.6-6 0.2 3.6 2.2 5.8 5.6 6z"/><path d="M12 11c0-3.8 2.4-6.2 6.2-6.6-0.2 4-2.4 6.4-6.2 6.6z"/><path d="M8.4 20.4h7.2"/></g>,
  flame: <path d="M12 3.8c1.4 2.6 0.6 4-0.6 5.4-1.4 1.7-2.4 3-2.4 5 0 3.3 2.7 5.6 6 4.9-1.3-0.6-2-1.7-2-3 0-1.6 1.1-2.4 2-3.6 0.7 1 1 1.9 1 3 0 1.1-0.4 1.9-1 2.6 2.7-0.4 4.6-2.6 4.6-5.5 0-4.1-3.4-6.3-6.6-8.8z"/>,
  moon: <path d="M17.4 14.2c-3.9 1.8-8-1.3-7.7-5.5 0.2-2.5 1.7-4.4 3.7-5.3-4.4 0.1-8 3.7-8 8.2 0 4.5 3.7 8.2 8.2 8.2 3.4 0 6.3-2 7.5-5-1.2 0.2-2.5 0-3.7-0.6z"/>,
  sparkle: <g><path fill="currentColor" stroke="none" d="M12 3.4c0.5 3.6 1.7 5.9 5.6 6.6-3.9 0.7-5.1 3-5.6 6.6-0.5-3.6-1.7-5.9-5.6-6.6 3.9-0.7 5.1-3 5.6-6.6z"/></g>,
  medal: <g><path d="M8.6 3.6l-2.3 6 3.9 2.6 3.9-2.6-2.3-6z"/><circle cx="12" cy="14.6" r="5.8"/><path d="M12 11.4l1.1 2.3 2.5 0.3-1.8 1.7 0.4 2.5-2.2-1.2-2.2 1.2 0.4-2.5-1.8-1.7 2.5-0.3z"/></g>,
  mark: <g><path d="M12 12c0-3.6 1.6-6.6 4.6-8.2 1 3.8-0.2 7.2-2.6 9.4"/><path d="M12 12c3.1-1.9 6.4-2.1 9.4-0.4-1.8 3.3-5 4.9-8.6 4.6"/><path d="M12 12c-1.1 3.5-3.6 5.9-7.2 6.8-1-3.8 0.4-7.1 3.1-9.1"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></g>,
  chart: <g><path d="M4 20.4V6.4"/><path d="M4 20.4h16.4"/><path d="M7.2 17.4v-4.6"/><path d="M11.6 17.4v-8"/><path d="M16 17.4v-5.8"/><path d="M20.4 17.4v-10"/></g>,
  partnership: <g><path d="M4 13.6c0-4 2.7-7.6 6.6-8.8 0.9 3.9-0.4 7.4-3.4 9.8"/><path d="M20 13.6c0-4-2.7-7.6-6.6-8.8-0.9 3.9 0.4 7.4 3.4 9.8"/><path d="M7.6 15c1.4 2.3 2.8 3.6 4.4 4.4 1.6-0.8 3-2.1 4.4-4.4"/></g>,
  document: <g><path d="M6.4 3.6h8l4.2 4.2v12.6H6.4z"/><path d="M14.4 3.6v4.2h4.2"/><path d="M9 13h6M9 16.2h6M9 9.8h2.4"/></g>,
  target: <g><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"/></g>,
  check: <path d="M4.4 12.6l4.8 4.8L19.6 6.8" strokeWidth="1.9"/>,
  arrowRight: <path d="M4.4 12h15M13.6 6.2l5.8 5.8-5.8 5.8" strokeWidth="1.8"/>,
};
function Icon({ name, size = 18, color = "currentColor", style }) {
  const glyph = ICON_PATHS[name];
  if (!glyph) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }}>
      {glyph}
    </svg>
  );
}

// ─── THEME ───────────────────────────────────────────────────────────────────
const WEDGE_CONFIG = {
  Social:        { color: "#3C6B4A", light: "#E8F0EA", icon: "social" },
  Occupational:  { color: "#6BAA75", light: "#EBF4EC", icon: "occupational" },
  Environmental: { color: "#8CAE93", light: "#F0F6EF", icon: "environmental" },
  Intellectual:  { color: "#5B8DB8", light: "#E8F1F8", icon: "intellectual" },
  Spiritual:     { color: "#7B9E87", light: "#EDF3EF", icon: "spiritual" },
  Emotional:     { color: "#C17A5A", light: "#F7EDE6", icon: "emotional" },
  Physical:      { color: "#A85D39", light: "#F9EEE5", icon: "physical" },
  Financial:     { color: "#8F6F35", light: "#F0EBE3", icon: "financial" },
};
const WEDGES = Object.keys(WEDGE_CONFIG);

// ─── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = {
  Social: ["I have people in my life I can be completely honest with.","I regularly make time for friendships outside of family and work.","I feel I belong to a community or group that matters to me.","I set healthy boundaries in my relationships.","I reach out to others when I'm struggling, rather than withdrawing.","I feel seen and valued in my closest relationships.","I have at least one friendship I've invested in this month.","My social life feels like a source of energy, not obligation."],
  Occupational: ["My work (paid or unpaid) feels meaningful to me.","I have opportunities to use my strengths most days.","I feel in control of my workload and priorities.","I can set boundaries around work hours and commitments.","I feel recognised or appreciated for my contributions.","I'm growing professionally or developing new skills.","My work aligns with my values.","I leave work feeling accomplished more often than depleted."],
  Environmental: ["My home environment feels calm and restorative.","I spend meaningful time in nature each week.","My living space supports my health and wellbeing.","I feel safe and secure in my physical environment.","I'm aware of how my environment affects my mood.","I have a space that is just for me, even if small.","My environment is organised enough to reduce daily stress.","I feel connected to the place where I live."],
  Intellectual: ["I regularly engage with ideas that challenge or interest me.","I make time to learn something new each week.","I have creative outlets that I actively pursue.","I feel mentally stimulated in my daily life.","I engage in conversations that stretch my thinking.","I read, listen to, or watch content that expands my perspective.","I solve problems with curiosity rather than anxiety.","My intellectual life feels rich and not just reactive."],
  Spiritual: ["I have a clear sense of my personal values.","I feel connected to something larger than myself.","I make time for reflection, meditation, or quiet.","I live in alignment with what matters most to me.","I have practices that ground me when life is difficult.","I feel a sense of purpose in how I spend my time.","I allow myself to sit with uncertainty without panic.","My inner life is something I tend to, not ignore."],
  Emotional: ["I can name and express my emotions without judgement.","I have healthy ways to process difficult feelings.","I bounce back from setbacks within a reasonable timeframe.","I'm not carrying unresolved grief, anger, or resentment.","I talk kindly to myself, especially when I make mistakes.","I allow myself to feel joy and pleasure without guilt.","I ask for support when my emotional load is heavy.","I feel emotionally stable more often than not."],
  Physical: ["I move my body in ways I enjoy at least 3 times a week.","I sleep 7–9 hours most nights and wake feeling rested.","I eat in a way that energises rather than depletes me.","I attend to preventive health care (check-ups, screenings).","I listen to my body's signals: pain, fatigue, hunger.","I manage chronic conditions or symptoms proactively.","I limit alcohol, caffeine, or other substances mindfully.","My energy levels feel adequate for the life I want to live."],
  Financial: ["I know where my money goes each month.","I have savings or a financial buffer for emergencies.","Financial stress doesn't dominate my thinking.","I feel in control of my financial decisions.","I'm on track (or have a plan) for retirement or future security.","I spend in line with my values, not just habits.","I can talk about money without anxiety or shame.","I feel financially secure enough to make choices freely."],
};

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
const ACTIVITIES = {
  Social: [["Schedule a coffee catch-up with someone you've been meaning to see","Send a voice note instead of a text to someone you care about","Join one group activity this week (class, walk, club, event)"],["Have one device-free conversation","Write a card or letter to someone who matters to you","Introduce yourself to one new person"],["Share something honest with a close friend","Do something kind for a neighbour or colleague","Revisit a lapsed friendship with a simple message"],["Spend quality time with family with phones away","Say yes to one social invitation you'd normally decline","Create a ritual with someone: weekly walk, shared meal"],["Tell someone specifically what you appreciate about them","Attend a community event or gathering","Start or join a book club, group or class"],["Reflect: who energises you? Plan time with them","Set a boundary in one relationship that needs it","Celebrate a friendship milestone or anniversary"]],
  Occupational: [["Identify your three most meaningful tasks and protect time for them","Tidy your workspace so it reflects who you want to be","Have one conversation about your growth or development"],["Block 90 minutes of focus time daily, notifications off","Identify one task you can delegate, automate or drop","Acknowledge one accomplishment out loud or in writing"],["Learn one new skill or tool relevant to your work","Set clear start and end times for work each day","Identify what's draining you at work and name it"],["Do something this week that uses your core strengths","Have a direct conversation about workload or expectations","Create a 'done' list alongside your to-do list"],["Explore one new idea or direction in your field","Ask for feedback from someone you trust professionally","Protect your lunch break every day this week"],["Write a short vision statement for your work in 12 months","Identify one thing in your work you want to change","Celebrate a professional milestone, however small"]],
  Environmental: [["Declutter one drawer, shelf or surface","Spend 20 minutes outside every day this week","Add one plant, candle or element of beauty to your space"],["Create a morning ritual that starts in your physical environment","Do a digital declutter: inbox, desktop or photo library","Find a new outdoor spot and visit it twice this week"],["Deep-clean one room or space that's been bothering you","Reduce one source of environmental noise or clutter","Identify what your ideal home environment feels like and take one step toward it"],["Set up a dedicated space for rest or reading","Spend time in nature with no agenda","Make one eco-conscious swap in your weekly routine"],["Refresh your bedroom for better sleep: temperature, dark, tidy","Visit a farmers market, garden or natural space","Reorganise one area to better serve your daily routine"],["Do a seasonal clear-out of clothes, pantry or digital files","Invest in one thing that makes your environment more beautiful","Reflect: does where you live support who you're becoming?"]],
  Intellectual: [["Read for 20 minutes every day this week","Listen to a podcast on a topic outside your usual interests","Start a journal or thinking log"],["Learn one new skill: YouTube tutorial, app, class","Have a conversation with someone whose views differ from yours","Solve a puzzle, play a strategy game or do a crossword"],["Read one long-form article or essay, start to finish","Watch a documentary or lecture on something unfamiliar","Write for 15 minutes with no agenda"],["Start a creative project: drawing, cooking, writing, crafting","Revisit a subject you loved and abandoned","Teach someone something you know well"],["Read a book outside your usual genre","Attend a talk, workshop or webinar","Write down 10 questions you're genuinely curious about"],["Reflect on what you've learned in the past 6 weeks","Identify your next intellectual challenge","Share an idea you're excited about with someone"]],
  Spiritual: [["Spend 10 minutes in silence each morning","Write down your three core values and reflect on them","Do one thing this week that is purely for joy"],["Start a gratitude practice: three things each evening","Spend time in nature with intention, not exercise","Identify one area where your life and values are misaligned"],["Meditate or breathe intentionally for 10 minutes daily","Read or listen to something that nourishes your inner life","Let go of one obligation that no longer serves you"],["Create a personal ritual: morning, evening or weekly","Reflect on what gives your life meaning right now","Do something generous with no expectation of return"],["Write a letter to your future self","Sit with a difficult question and resist rushing to an answer","Spend time doing nothing: no screen, no task, no purpose"],["Identify what you want your legacy to be","Revisit your values: do your daily choices reflect them?","Create a simple intention statement for the next chapter"]],
  Emotional: [["Name your emotional state each morning in your journal","Identify one feeling you've been avoiding and acknowledge it","Do one thing today purely because it makes you happy"],["Set aside 15 minutes for a gentle activity you love","Tell someone how you're actually feeling","Identify your emotional triggers and write them down"],["Practice self-compassion: write yourself a letter after a hard day","Reduce one source of unnecessary stress","Do something playful or silly this week"],["Identify a pattern in how you respond to conflict","Allow yourself to grieve, laugh, or feel something fully","Ask for help with something you've been carrying alone"],["Create an emotional first aid kit: music, walks, rituals that help","Acknowledge one strength you often overlook in yourself","Have one honest conversation you've been postponing"],["Reflect on your emotional growth over the past 6 weeks","Identify one belief about yourself that you want to update","Celebrate how far you've come, not just how far to go"]],
  Physical: [["Move your body for 30 minutes in a way you genuinely enjoy","Drink 8 glasses of water every day this week","Go to bed 30 minutes earlier than usual"],["Try one new form of movement: dance, swim, hike, yoga","Eat one more vegetable per day than usual","Have one screen-free hour before bed each night"],["Walk outside every day this week, even for 10 minutes","Prepare one nourishing meal from scratch","Book a health check-up you've been putting off"],["Stretch or do mobility work for 10 minutes daily","Reduce alcohol or caffeine by one serving per day","Track your sleep for the week and identify what helps"],["Increase incidental movement: stairs, walk further, stand more","Eat slowly and without screens for at least one meal a day","Do one restorative practice: bath, massage, yoga nidra"],["Reflect on how your body feels compared to 6 weeks ago","Identify one physical habit you want to keep permanently","Do something that celebrates what your body can do"]],
  Financial: [["Review your last month of spending with curiosity, not judgement","Identify three non-essential expenses and categorise them","Set one small savings goal for this week"],["Create or review your monthly budget","Automate one saving or bill payment","Have an honest conversation about money with someone you trust"],["Read or listen to one piece of financial education content","Identify one financial decision you've been avoiding","Cancel one subscription you don't use"],["Review your superannuation or retirement savings","Identify one way to reduce a regular expense","Write down what financial security means to you personally"],["Make a plan for one financial goal: holiday, emergency fund, debt","Check your credit score or financial health","Identify one money belief you inherited that may be holding you back"],["Celebrate one financial win from the past 6 weeks","Set a quarterly financial intention","Reflect: does your spending reflect your values?"]],
};

// ─── BONUS CHALLENGES ─────────────────────────────────────────────────────────
// Icon is drawn from the challenge's own wedge (WEDGE_CONFIG) at render time,
// keeping every icon in the tool traceable to the same 8-dimension system.
const BONUS_CHALLENGES = [
  { id: "b1", wedge: "Physical", text: "Complete a 7-day movement streak — any movement, every day.", points: 50 },
  { id: "b2", wedge: "Social", text: "Host or organise a gathering for 3 or more people you care about.", points: 40 },
  { id: "b3", wedge: "Emotional", text: "Write a 500-word letter of forgiveness — to yourself or someone else. You don't have to send it.", points: 45 },
  { id: "b4", wedge: "Financial", text: "Go one full week without any non-essential spending.", points: 50 },
  { id: "b5", wedge: "Intellectual", text: "Finish an entire book this week.", points: 40 },
  { id: "b6", wedge: "Spiritual", text: "Spend 30 minutes every day this week in intentional silence or meditation.", points: 45 },
  { id: "b7", wedge: "Environmental", text: "Spend a full day outdoors — no screens, no obligations.", points: 40 },
  { id: "b8", wedge: "Occupational", text: "Take one full day completely off work and genuinely rest.", points: 50 },
];

// ─── BADGES ──────────────────────────────────────────────────────────────────
// Each badge is a hand-drawn medallion (see BadgeMedallion below), locked in
// muted stone tones and switching to the Antique Brass "earned" treatment
// only once unlocked — the achievement color is reserved for this moment.
const BADGES = [
  { id: "first_step",  name: "First Step",      icon: "leaf", desc: "Completed the assessment" },
  { id: "week1",       name: "One Week Strong",  icon: "target", desc: "Completed all Week 1 activities" },
  { id: "streak3",     name: "On a Roll",        icon: "flame", desc: "3-day activity streak" },
  { id: "halfway",     name: "Halfway There",    icon: "moon", desc: "Completed Week 3" },
  { id: "all_wedges",  name: "Full Circle",      icon: "mark", desc: "Completed an activity in every wedge" },
  { id: "finisher",    name: "Journey Complete", icon: "medal", desc: "Completed all 6 weeks" },
  { id: "streak7",     name: "Unstoppable",      icon: "sparkle", desc: "7-day activity streak" },
  { id: "inner3",      name: "Inner Work",       icon: "spiritual", desc: "Completed 3 Spiritual or Emotional activities" },
  { id: "bonus1",      name: "Over-Achiever",    icon: "sparkle", desc: "Completed a bonus challenge" },
  { id: "buddy",       name: "Better Together",  icon: "partnership", desc: "Shared your wheel with an accountability partner" },
  { id: "check_in6",   name: "Honest Reflection", icon: "document", desc: "Completed 6 weekly check-ins" },
  { id: "reassessed",  name: "Growth Visible",   icon: "chart", desc: "Completed the 6-week reassessment" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function scoreWedge(answers) {
  return Math.round((answers.reduce((a,b)=>a+b,0) / (answers.length * 5)) * 100);
}
function getLevel(score) {
  if (score >= 80) return { label: "Thriving",         color: "#3C6B4A" };
  if (score >= 60) return { label: "Growing",          color: "#6BAA75" };
  if (score >= 40) return { label: "Developing",       color: "#C17A5A" };
  return            { label: "Needs Attention",  color: "#A85D39" };
}
const LEVEL_THRESHOLDS = [
  { min: 0,   label: "Seed",     icon: "leaf",    color: "#8CAE93" },
  { min: 100, label: "Sprout",   icon: "plant",   color: "#6BAA75" },
  { min: 250, label: "Bloom",    icon: "spiritual", color: "#3C6B4A" },
  { min: 500, label: "Flourish", icon: "sparkle", color: "#C9A15A" },
  { min: 800, label: "Radiant",  icon: "medal",   color: "#8F6F35" },
];
function getUserLevel(pts) {
  return LEVEL_THRESHOLDS.reduce((l,t) => pts >= t.min ? t : l, LEVEL_THRESHOLDS[0]);
}

// ─── WHEEL SVG ────────────────────────────────────────────────────────────────
function WellnessWheelSVG({ scores = {}, size = 300 }) {
  const cx = size/2, cy = size/2, r = size*0.42, innerR = size*0.14;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }}>
      {WEDGES.map((wedge, i) => {
        const sa = (i/8)*2*Math.PI - Math.PI/2;
        const ea = ((i+1)/8)*2*Math.PI - Math.PI/2;
        const score = scores[wedge] ?? 0;
        const fillR = innerR + ((r-innerR)*score/100);
        const cfg = WEDGE_CONFIG[wedge];
        const p = (a,rr) => [cx+rr*Math.cos(a), cy+rr*Math.sin(a)];
        const [x1,y1]=p(sa,r), [x2,y2]=p(ea,r), [xi1,yi1]=p(sa,innerR), [xi2,yi2]=p(ea,innerR);
        const [fx1,fy1]=p(sa,fillR), [fx2,fy2]=p(ea,fillR);
        const mid = (sa+ea)/2;
        const [lx,ly] = p(mid, r+size*0.055);
        const bgPath = `M${xi1},${yi1}L${x1},${y1}A${r},${r},0,0,1,${x2},${y2}L${xi2},${yi2}A${innerR},${innerR},0,0,0,${xi1},${yi1}Z`;
        const fillPath = score>0 ? `M${xi1},${yi1}L${fx1},${fy1}A${fillR},${fillR},0,0,1,${fx2},${fy2}L${xi2},${yi2}A${innerR},${innerR},0,0,0,${xi1},${yi1}Z` : null;
        return (
          <g key={wedge}>
            <path d={bgPath} fill={cfg.light} stroke="white" strokeWidth="2"/>
            {fillPath && <path d={fillPath} fill={cfg.color} opacity="0.88" stroke="white" strokeWidth="2"/>}
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={size*0.033} fontWeight="600" fill={cfg.color} fontFamily="Literata,Georgia,serif">{wedge}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR} fill="white"/>
      <text x={cx} y={cy-size*0.022} textAnchor="middle" fontSize={size*0.036} fontWeight="700" fill="#3a3a3a" fontFamily="Literata,Georgia,serif">Wellness</text>
      <text x={cx} y={cy+size*0.022} textAnchor="middle" fontSize={size*0.036} fontWeight="700" fill="#3a3a3a" fontFamily="Literata,Georgia,serif">Wheel</text>
    </svg>
  );
}

function ProgressRing({ score, color, size=60 }) {
  const r=size/2-6, circ=2*Math.PI*r, dash=(score/100)*circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#eee" strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={circ*0.25} strokeLinecap="round"
        style={{transition:"stroke-dasharray 0.8s ease"}}/>
      <text x={size/2} y={size/2+4} textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="Literata,Georgia,serif">{score}%</text>
    </svg>
  );
}

// ─── BADGE MEDALLION ──────────────────────────────────────────────────────────
// The Earned Gold Rule: locked badges sit in muted stone tones; unlocked
// badges alone get the Antique Brass fill plus the achievement glow, so
// brass reads as "earned" rather than decorative.
function BadgeMedallion({ iconName, unlocked, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: unlocked ? "#FBF3E1" : "#F1EEE6",
      color: unlocked ? "#8F6F35" : "#A6A395",
      boxShadow: unlocked
        ? "0 0 0 1px rgba(201,161,90,0.35), 0 8px 28px rgba(201,161,90,0.28)"
        : "none",
      transition: "all 320ms cubic-bezier(0.165,0.84,0.44,1)",
      flexShrink: 0,
    }}>
      <Icon name={iconName} size={Math.round(size * 0.42)} />
    </div>
  );
}

// ─── BADGE MODAL ──────────────────────────────────────────────────────────────
function BadgeModal({ badgeId, onClose }) {
  const b = BADGES.find(x=>x.id===badgeId);
  if (!b) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(22,40,28,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:20,padding:"40px 32px",textAlign:"center",maxWidth:320,width:"100%",animation:"popIn 0.4s cubic-bezier(0.165,0.84,0.44,1)"}}>
        <style>{`@keyframes popIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}} @media (prefers-reduced-motion: reduce){[style*="popIn"]{animation:none !important}}`}</style>
        <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><BadgeMedallion iconName={b.icon} unlocked size={84}/></div>
        <div style={{fontSize:12,fontWeight:700,color:"#8F6F35",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Badge Earned</div>
        <h2 style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",marginBottom:8,fontSize:22}}>{b.name}</h2>
        <p style={{color:"#777",fontSize:14,marginBottom:28,lineHeight:1.5}}>{b.desc}</p>
        <button onClick={onClose} style={{padding:"12px 28px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:15}}>
          Keep going
        </button>
      </div>
    </div>
  );
}

// ─── ASSESSMENT ───────────────────────────────────────────────────────────────
function Assessment({ onComplete }) {
  const [cW,setCW]=useState(0), [cQ,setCQ]=useState(0), [answers,setAnswers]=useState({}), [sel,setSel]=useState(null);
  const wedge=WEDGES[cW], cfg=WEDGE_CONFIG[wedge], qs=QUESTIONS[wedge];
  const total=64, done=cW*8+cQ, pct=Math.round(done/total*100);
  const labels=["Never","Rarely","Sometimes","Often","Always"];

  function next() {
    if(sel===null) return;
    const na={...answers,[`${wedge}_${cQ}`]:sel};
    setAnswers(na); setSel(null);
    if(cQ<7){setCQ(cQ+1);}
    else if(cW<7){setCW(cW+1);setCQ(0);}
    else {
      const scores={};
      WEDGES.forEach(w=>{scores[w]=scoreWedge(Array.from({length:8},(_,i)=>na[`${w}_${i}`]??0));});
      onComplete(scores);
    }
  }

  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:13,color:"#888",fontFamily:"Raleway,sans-serif"}}>{done} of {total}</span>
          <span style={{fontSize:13,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={15} color={cfg.color}/> {wedge}</span>
        </div>
        <div style={{background:"#f0f0f0",borderRadius:99,height:6,overflow:"hidden"}}>
          <div style={{width:`${pct}%`,background:cfg.color,height:"100%",transition:"width 0.3s",borderRadius:99}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:24}}>
        {WEDGES.map((w,i)=>{
          const isDone=i<cW; const isActive=i===cW;
          return <div key={w} style={{padding:"4px 10px",borderRadius:99,fontSize:11,background:isDone?WEDGE_CONFIG[w].color:isActive?WEDGE_CONFIG[w].light:"#f5f5f5",color:isDone?"white":isActive?WEDGE_CONFIG[w].color:"#bbb",fontWeight:isActive||isDone?700:400,border:`1.5px solid ${isActive||isDone?WEDGE_CONFIG[w].color:"#eee"}`,transition:"all 0.3s",fontFamily:"Raleway,sans-serif",display:"inline-flex",alignItems:"center",gap:4}}>{isDone?<Icon name="check" size={11}/>:<Icon name={WEDGE_CONFIG[w].icon} size={11}/>}{w}</div>;
        })}
      </div>
      <div style={{background:"white",borderRadius:16,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",borderTop:`4px solid ${cfg.color}`,marginBottom:20}}>
        <div style={{fontSize:11,color:cfg.color,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:"Raleway,sans-serif"}}>{wedge} · Q{cQ+1} of 8</div>
        <p style={{fontSize:17,fontWeight:600,color:"#2a2a2a",lineHeight:1.55,marginBottom:28,fontFamily:"Literata,Georgia,serif"}}>{qs[cQ]}</p>
        <div style={{display:"flex",gap:8}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setSel(v)} style={{flex:1,padding:"12px 4px",borderRadius:10,border:`2px solid ${sel===v?cfg.color:"#e8e8e8"}`,background:sel===v?cfg.color:"white",color:sel===v?"white":"#555",cursor:"pointer",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <span style={{fontSize:18,fontWeight:700}}>{v}</span>
              <span style={{fontSize:10}}>{labels[v-1]}</span>
            </button>
          ))}
        </div>
      </div>
      <button onClick={next} disabled={sel===null} style={{width:"100%",padding:"14px",background:sel!==null?cfg.color:"#ccc",color:"white",border:"none",borderRadius:999,fontSize:15,fontWeight:700,cursor:sel!==null?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif",transition:"background 180ms"}}>
        {cW===7&&cQ===7?"See My Results →":"Next →"}
      </button>
    </div>
  );
}

// ─── REPORT ───────────────────────────────────────────────────────────────────
function Report({ scores, onSignUp }) {
  const sorted=[...WEDGES].sort((a,b)=>scores[a]-scores[b]);
  const lowest=sorted.slice(0,3), highest=sorted.slice(-3).reverse();
  const overall=Math.round(WEDGES.reduce((s,w)=>s+scores[w],0)/8);
  const lvl=getLevel(overall);

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h1 style={{fontFamily:"Literata,Georgia,serif",fontSize:27,color:"#2a2a2a",marginBottom:8}}>Your Wellness Report</h1>
        <p style={{color:"#666",fontSize:15}}>Overall: <strong style={{color:lvl.color}}>{overall}% · {lvl.label}</strong></p>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:32}}><div style={{width:280}}><WellnessWheelSVG scores={scores}/></div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>
        {WEDGES.map(w=>{
          const cfg=WEDGE_CONFIG[w], sc=scores[w], lv=getLevel(sc);
          return <div key={w} style={{background:"white",borderRadius:12,padding:"14px 16px",border:"1px solid #eee",display:"flex",alignItems:"center",gap:12}}>
            <ProgressRing score={sc} color={cfg.color} size={52}/>
            <div><div style={{fontWeight:700,fontSize:14,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",display:"flex",alignItems:"center",gap:6}}><Icon name={cfg.icon} size={14} color={cfg.color}/> {w}</div><div style={{fontSize:11,color:lv.color,fontWeight:600}}>{lv.label}</div></div>
          </div>;
        })}
      </div>
      <div style={{background:"#F7EDE6",borderRadius:14,padding:"20px",marginBottom:16,border:"1px solid #EEDCCB"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",color:"#A85D39",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#A85D39"/> Your Focus Areas</h3>
        <p style={{fontSize:13,color:"#777",marginBottom:12}}>Your lowest three scores. These are your biggest growth opportunity.</p>
        {lowest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</strong><span style={{color:"#aaa",fontSize:13}}>· {scores[w]}%</span></div>)}
      </div>
      <div style={{background:"#E8F0EA",borderRadius:14,padding:"20px",marginBottom:28,border:"1px solid #D3E3D7"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",color:"#3C6B4A",marginBottom:12,fontSize:16,display:"flex",alignItems:"center",gap:8}}><Icon name="sparkle" size={17} color="#3C6B4A"/> Your Strengths</h3>
        <p style={{fontSize:13,color:"#777",marginBottom:12}}>Your strongest foundations. Build from here.</p>
        {highest.map(w=><div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Icon name={WEDGE_CONFIG[w].icon} size={19} color={WEDGE_CONFIG[w].color}/><strong style={{fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</strong><span style={{color:"#aaa",fontSize:13}}>· {scores[w]}%</span></div>)}
      </div>
      <button onClick={onSignUp} style={{width:"100%",padding:"16px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",transition:"background 180ms"}}>
        Start My 6-Week Wellness Plan →
      </button>
    </div>
  );
}

// ─── SIGN UP ──────────────────────────────────────────────────────────────────
function SignUp({ scores, onStart }) {
  const [name,setName]=useState(""), [focus,setFocus]=useState([]);
  const suggested=[...WEDGES].sort((a,b)=>scores[a]-scores[b]).slice(0,3);
  const toggle=w=>focus.includes(w)?setFocus(focus.filter(x=>x!==w)):focus.length<3?setFocus([...focus,w]):null;
  const ok=name.trim()&&focus.length>=2;

  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Icon name="mark" size={40} color="#3C6B4A"/></div>
        <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:25,color:"#2a2a2a",marginBottom:8}}>Build Your Plan</h2>
        <p style={{color:"#777",fontSize:14,lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>3 activities per week for 6 weeks. Earn points, build streaks, unlock badges as you go.</p>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:20}}>
        <label style={{display:"block",fontSize:13,fontWeight:700,color:"#555",marginBottom:6,fontFamily:"Literata,Georgia,serif"}}>Your first name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="First name" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:15,fontFamily:"Raleway,sans-serif",boxSizing:"border-box"}}/>
      </div>
      <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:700,color:"#555",marginBottom:4,fontFamily:"Literata,Georgia,serif"}}>Choose 2–3 focus areas</div>
        <div style={{fontSize:12,color:"#aaa",marginBottom:16,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>Suggested: {suggested.map((w,i)=><span key={w} style={{display:"inline-flex",alignItems:"center",gap:4}}><Icon name={WEDGE_CONFIG[w].icon} size={13} color={WEDGE_CONFIG[w].color}/>{w}{i<suggested.length-1?",":""}</span>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],active=focus.includes(w);return(
            <button key={w} onClick={()=>toggle(w)} style={{padding:"10px 12px",borderRadius:10,border:`2px solid ${active?cfg.color:"#e8e8e8"}`,background:active?cfg.light:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"}}>
              <Icon name={cfg.icon} size={17} color={cfg.color}/>
              <div style={{textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:active?cfg.color:"#444",fontFamily:"Literata,Georgia,serif"}}>{w}</div><div style={{fontSize:11,color:"#aaa"}}>{scores[w]}%</div></div>
              {active&&<span style={{marginLeft:"auto",color:cfg.color,fontWeight:700}}><Icon name="check" size={14} color={cfg.color}/></span>}
            </button>
          );})}
        </div>
      </div>
      <button onClick={()=>ok&&onStart(name,focus)} style={{width:"100%",padding:"16px",background:ok?"#3C6B4A":"#ddd",color:ok?"white":"#aaa",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:ok?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif"}}>
        Begin My Journey →
      </button>
    </div>
  );
}

// ─── GAMIFIED PLAN (main feature) ────────────────────────────────────────────
function GamifiedPlan({ scores: initialScores, userName, focusAreas }) {
  const [completed,setCompleted]=useState({});
  const [bonusDone,setBonusDone]=useState({});
  const [points,setPoints]=useState(50);
  const [badges,setBadges]=useState(["first_step"]);
  const [badgeModal,setBadgeModal]=useState(null);
  const [streak,setStreak]=useState(0);
  const [lastActiveDate,setLastActiveDate]=useState(null);
  const [currentWeek,setCurrentWeek]=useState(1);
  const [tab,setTab]=useState("plan");
  const [buddyEmail,setBuddyEmail]=useState("");
  const [buddyShared,setBuddyShared]=useState(false);
  const [checkIns,setCheckIns]=useState({});
  const [showCheckIn,setShowCheckIn]=useState(false);
  const [checkInWeek,setCheckInWeek]=useState(null);
  const [reassessMode,setReassessMode]=useState(false);
  const [reassessScores,setReassessScores]=useState(null);
  const [scores,setScores]=useState(initialScores);

  // Build plan: 3 activities per week per focus area (trimmed to exactly 3/week total across focus areas)
  const plan = Array.from({length:6},(_,wi)=>{
    const week=wi+1;
    const acts=[];
    focusAreas.forEach((wedge,fi)=>{
      const weekActs=ACTIVITIES[wedge][wi]??ACTIVITIES[wedge][0];
      weekActs.forEach((text,ai)=>acts.push({id:`w${week}_${wedge}_${ai}`,wedge,text,week,points:10+week*2}));
    });
    return {week, activities: acts.slice(0, 3 * focusAreas.length)};
  });

  const totalActs=plan.reduce((s,w)=>s+w.activities.length,0);
  const doneCount=Object.values(completed).filter(Boolean).length;
  const progressPct=Math.round(doneCount/totalActs*100);
  const userLevel=getUserLevel(points);
  const nextLevel=LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(userLevel)+1];
  const levelPct=nextLevel?Math.round((points-userLevel.min)/(nextLevel.min-userLevel.min)*100):100;

  function awardBadge(id) {
    if(!badges.includes(id)){setBadges(b=>[...b,id]);setBadgeModal(id);}
  }

  function toggleActivity(id,wedge,pts) {
    const was=completed[id];
    const nc={...completed,[id]:!was};
    setCompleted(nc);
    let np=points+(was?-pts:pts);

    if(!was){
      // streak
      const today=new Date().toDateString();
      const yesterday=new Date(Date.now()-86400000).toDateString();
      let ns=streak;
      if(lastActiveDate===yesterday){ns=streak+1;}
      else if(lastActiveDate!==today){ns=1;}
      setStreak(ns); setLastActiveDate(today);
      if(ns>=3) awardBadge("streak3");
      if(ns>=7) awardBadge("streak7");

      // week complete bonus
      const wplan=plan.find(p=>p.week===currentWeek);
      if(wplan?.activities.every(a=>nc[a.id])){
        np+=25;
        if(currentWeek===1) awardBadge("week1");
        if(currentWeek===3) awardBadge("halfway");
        if(currentWeek===6) awardBadge("finisher");
      }

      // all wedges
      const wedgesUsed=new Set(Object.keys(nc).filter(k=>nc[k]).map(k=>k.split("_")[1]));
      if(wedgesUsed.size>=8) awardBadge("all_wedges");

      // inner work
      const innerDone=Object.keys(nc).filter(k=>nc[k]&&(k.includes("Spiritual")||k.includes("Emotional"))).length;
      if(innerDone>=3) awardBadge("inner3");
    }
    setPoints(np);
  }

  function toggleBonus(id,pts) {
    const was=bonusDone[id];
    setBonusDone({...bonusDone,[id]:!was});
    setPoints(p=>p+(was?-pts:pts));
    if(!was) awardBadge("bonus1");
  }

  function shareWithBuddy() {
    if(!buddyEmail.trim()) return;
    setBuddyShared(true);
    awardBadge("buddy");
  }

  function submitCheckIn(week, mood, note) {
    const nci={...checkIns,[week]:{mood,note,date:new Date().toLocaleDateString()}};
    setCheckIns(nci);
    if(Object.keys(nci).length>=6) awardBadge("check_in6");
    setShowCheckIn(false);
  }

  function handleReassessComplete(newScores) {
    setReassessScores(newScores);
    setReassessMode(false);
    awardBadge("reassessed");
    setTab("compare");
  }

  const MOOD_LABELS=["Struggling","Flat","Okay","Good","Great"];

  if(reassessMode) return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"16px"}}>
      <div style={{textAlign:"center",padding:"20px",background:"#3C6B4A",borderRadius:16,color:"white",marginBottom:20}}>
        <h2 style={{fontFamily:"Literata,Georgia,serif",margin:0,fontSize:20}}>6-Week Reassessment</h2>
        <p style={{margin:"8px 0 0",fontSize:13,opacity:0.9}}>Same 64 questions. See how far you've come.</p>
      </div>
      <Assessment onComplete={handleReassessComplete}/>
    </div>
  );

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"16px"}}>
      {badgeModal && <BadgeModal badgeId={badgeModal} onClose={()=>setBadgeModal(null)}/>}
      {showCheckIn && <WeeklyCheckIn week={checkInWeek} existing={checkIns[checkInWeek]} onSubmit={submitCheckIn} onClose={()=>setShowCheckIn(false)}/>}

      {/* Header */}
      <div style={{background:"#16281C",borderRadius:20,padding:"22px 18px",color:"white",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:220,height:220,borderRadius:"50%",top:-90,right:-70,background:"radial-gradient(circle,rgba(107,170,117,0.35),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,position:"relative"}}>
          <div>
            <div style={{fontSize:12,opacity:0.8,marginBottom:3}}>Welcome back,</div>
            <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:21,margin:0,display:"flex",alignItems:"center",gap:8}}>{userName} <Icon name={userLevel.icon} size={19}/></h2>
            <div style={{fontSize:13,opacity:0.9,marginTop:3}}>{userLevel.label} · <strong>{points}</strong> pts</div>
          </div>
          <div style={{textAlign:"right",fontSize:13,opacity:0.9,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="flame" size={13}/> {streak}-day streak</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="medal" size={13}/> {badges.length} badges</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><Icon name="check" size={13}/> {doneCount}/{totalActs} done</div>
          </div>
        </div>
        {/* Level bar */}
        <div style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.85,marginBottom:3}}>
            <span>{userLevel.label}</span>
            {nextLevel&&<span>Next: {nextLevel.label} ({nextLevel.min-points} pts)</span>}
          </div>
          <div style={{background:"rgba(255,255,255,0.3)",borderRadius:99,height:6}}>
            <div style={{width:`${levelPct}%`,background:"white",height:"100%",borderRadius:99,transition:"width 0.5s"}}/>
          </div>
        </div>
        {/* Progress bar */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.85,marginBottom:3}}>
            <span>6-Week Journey</span><span>{progressPct}% complete</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.3)",borderRadius:99,height:6}}>
            <div style={{width:`${progressPct}%`,background:"rgba(255,255,255,0.9)",height:"100%",borderRadius:99,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {[["plan","document","Plan"],["bonus","sparkle","Bonus"],["checkin","document","Check-in"],["buddy","partnership","Buddy"],["badges","medal","Badges"],["wheel","target","Wheel"],[reassessScores?"compare":"reassess","chart",reassessScores?"Compare":"Week 6"]].map(([t,icon,label])=>(
          <button key={t} onClick={()=>t==="reassess"?setReassessMode(true):setTab(t)} style={{flexShrink:0,padding:"8px 14px",borderRadius:999,border:"1.5px solid",borderColor:tab===t?"#3C6B4A":"#e8e8e8",background:tab===t?"#E8F0EA":"white",color:tab===t?"#3C6B4A":"#888",fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:12,transition:"all 180ms",display:"inline-flex",alignItems:"center",gap:6}}>
            <Icon name={icon} size={14}/>{label}
          </button>
        ))}
      </div>

      {/* ── PLAN TAB ── */}
      {tab==="plan" && (
        <div>
          <div style={{display:"flex",gap:8,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {[1,2,3,4,5,6].map(w=>{
              const wp=plan.find(p=>p.week===w);
              const wDone=wp?.activities.filter(a=>completed[a.id]).length??0;
              const wTotal=wp?.activities.length??0;
              const full=wDone===wTotal;
              const ci=checkIns[w];
              return <button key={w} onClick={()=>setCurrentWeek(w)} style={{minWidth:72,padding:"8px 6px",borderRadius:12,border:"1.5px solid",borderColor:currentWeek===w?"#3C6B4A":full?"#6BAA75":"#e8e8e8",background:currentWeek===w?"#E8F0EA":full?"#EBF4EC":"white",cursor:"pointer",textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:11,fontWeight:700,color:currentWeek===w?"#3C6B4A":full?"#6BAA75":"#888",fontFamily:"Literata,Georgia,serif"}}>Week {w}</div>
                <div style={{fontSize:10,color:"#aaa"}}>{wDone}/{wTotal}</div>
                <div style={{display:"flex",justifyContent:"center",marginTop:2,height:14}}>{full?<Icon name="check" size={13} color="#6BAA75"/>:ci?<Icon name="document" size={13} color="#bbb"/>:null}</div>
              </button>;
            })}
          </div>

          {plan.find(p=>p.week===currentWeek)?.activities.map(act=>{
            const cfg=WEDGE_CONFIG[act.wedge], done=completed[act.id];
            return <div key={act.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#eee"}`,boxShadow:done?"none":"0 1px 3px rgba(22,40,28,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleActivity(act.id,act.wedge,act.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#ddd"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={14} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif"}}>{act.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:11,color:done?cfg.color:"#bbb",fontWeight:600}}>+{act.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#888":"#2a2a2a",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{act.text}</p>
              </div>
            </div>;
          })}

          <div style={{marginTop:16}}>
            {!checkIns[currentWeek]&&<button onClick={()=>{setCheckInWeek(currentWeek);setShowCheckIn(true);}} style={{width:"100%",padding:"12px",background:"white",color:"#7B9E87",border:"1.5px solid #7B9E87",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Icon name="document" size={15}/> Log Week {currentWeek} Check-in
            </button>}
            {checkIns[currentWeek]&&<div style={{background:"#EDF3EF",borderRadius:12,padding:"12px 16px",border:"1px solid #C8D8CC"}}>
              <div style={{fontSize:13,fontWeight:700,color:"#7B9E87",marginBottom:4,fontFamily:"Literata,Georgia,serif"}}>Week {currentWeek} check-in logged · {MOOD_LABELS[checkIns[currentWeek].mood-1]}</div>
              {checkIns[currentWeek].note&&<p style={{fontSize:13,color:"#666",margin:0}}>{checkIns[currentWeek].note}</p>}
            </div>}
          </div>
        </div>
      )}

      {/* ── BONUS TAB ── */}
      {tab==="bonus" && (
        <div>
          <div style={{background:"#F7EDE6",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #EEDCCB"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#A85D39",marginBottom:4,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="sparkle" size={15} color="#A85D39"/> Bonus Challenges</div>
            <p style={{fontSize:13,color:"#888",margin:0,lineHeight:1.6}}>Optional harder activities worth 40–50 pts each. Complete them any time during your 6 weeks.</p>
          </div>
          {BONUS_CHALLENGES.map(bc=>{
            const cfg=WEDGE_CONFIG[bc.wedge], done=bonusDone[bc.id];
            return <div key={bc.id} style={{background:done?cfg.light:"white",borderRadius:14,padding:"16px 18px",marginBottom:12,border:`1px solid ${done?"transparent":"#eee"}`,boxShadow:done?"none":"0 1px 3px rgba(22,40,28,0.05)",display:"flex",alignItems:"flex-start",gap:14,transition:"all 220ms",opacity:done?0.82:1}}>
              <button onClick={()=>toggleBonus(bc.id,bc.points)} style={{width:28,height:28,borderRadius:8,border:`2px solid ${done?cfg.color:"#ddd"}`,background:done?cfg.color:"white",cursor:"pointer",flexShrink:0,marginTop:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {done&&<Icon name="check" size={14} color="white"/>}
              </button>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                  <Icon name={cfg.icon} size={16} color={cfg.color}/>
                  <span style={{fontSize:11,fontWeight:700,color:cfg.color,fontFamily:"Literata,Georgia,serif"}}>{bc.wedge}</span>
                  <span style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:done?cfg.color:"#A85D39"}}>+{bc.points} pts</span>
                </div>
                <p style={{fontSize:14,color:done?"#888":"#2a2a2a",lineHeight:1.5,margin:0,textDecoration:done?"line-through":"none"}}>{bc.text}</p>
              </div>
            </div>;
          })}
        </div>
      )}

      {/* ── CHECK-IN TAB ── */}
      {tab==="checkin" && (
        <div>
          <div style={{background:"#EDF3EF",borderRadius:12,padding:"14px 16px",marginBottom:20,border:"1px solid #C8D8CC"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#7B9E87",marginBottom:4,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="document" size={15} color="#7B9E87"/> Weekly Check-ins</div>
            <p style={{fontSize:13,color:"#777",margin:0,lineHeight:1.6}}>One quick check-in per week. Mood + an optional note. Complete 6 to earn the Honest Reflection badge.</p>
          </div>
          {[1,2,3,4,5,6].map(w=>{
            const ci=checkIns[w];
            return <div key={w} style={{background:"white",borderRadius:12,padding:"16px",marginBottom:10,border:`1.5px solid ${ci?"#7B9E87":"#e8e8e8"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:700,fontSize:14,fontFamily:"Literata,Georgia,serif",color:ci?"#7B9E87":"#aaa"}}>Week {w} {ci?`· ${MOOD_LABELS[ci.mood-1]}`:""}</div>
                {ci?<span style={{fontSize:11,color:"#aaa"}}>{ci.date}</span>:<button onClick={()=>{setCheckInWeek(w);setShowCheckIn(true);}} style={{padding:"6px 14px",background:"#EDF3EF",color:"#7B9E87",border:"1.5px solid #7B9E87",borderRadius:999,fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"Raleway,sans-serif"}}>Log</button>}
              </div>
              {ci?.note&&<p style={{fontSize:13,color:"#666",margin:"8px 0 0",lineHeight:1.5}}>{ci.note}</p>}
            </div>;
          })}
        </div>
      )}

      {/* ── BUDDY TAB ── */}
      {tab==="buddy" && (
        <div>
          <div style={{background:"white",borderRadius:14,padding:"24px",border:"1px solid #eee",marginBottom:20}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Icon name="partnership" size={40} color="#3C6B4A"/></div>
              <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:18,color:"#2a2a2a",marginBottom:8}}>Accountability Partner</h3>
              <p style={{fontSize:14,color:"#777",lineHeight:1.6}}>Research is clear: people who have an accountability partner are significantly more likely to follow through. Invite someone to do this alongside you: a partner, a friend, another caregiver in your cohort.</p>
            </div>
            {!buddyShared?<>
              <label style={{display:"block",fontSize:13,fontWeight:700,color:"#555",marginBottom:6,fontFamily:"Literata,Georgia,serif"}}>Partner's email</label>
              <input value={buddyEmail} onChange={e=>setBuddyEmail(e.target.value)} placeholder="partner@example.com" style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:15,fontFamily:"Raleway,sans-serif",boxSizing:"border-box",marginBottom:16}}/>
              <button onClick={shareWithBuddy} style={{width:"100%",padding:"12px",background:buddyEmail.trim()?"#3C6B4A":"#ddd",color:buddyEmail.trim()?"white":"#aaa",border:"none",borderRadius:999,fontWeight:700,cursor:buddyEmail.trim()?"pointer":"not-allowed",fontFamily:"Raleway,sans-serif",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                Send Invitation &amp; Earn Badge <Icon name="arrowRight" size={15} color={buddyEmail.trim()?"white":"#aaa"}/>
              </button>
            </>:<div style={{textAlign:"center",padding:"20px",background:"#E8F0EA",borderRadius:12}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><Icon name="partnership" size={32} color="#3C6B4A"/></div>
              <div style={{fontWeight:700,fontFamily:"Literata,Georgia,serif",color:"#3C6B4A",marginBottom:4}}>Invitation sent to {buddyEmail}</div>
              <div style={{fontSize:13,color:"#888"}}>You earned the Better Together badge.</div>
            </div>}
          </div>
          <div style={{background:"#F7EDE6",borderRadius:12,padding:"16px",border:"1px solid #EEDCCB"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#A85D39",marginBottom:8,fontFamily:"Literata,Georgia,serif",display:"flex",alignItems:"center",gap:6}}><Icon name="sparkle" size={15} color="#A85D39"/> What good accountability looks like</div>
            <div style={{fontSize:13,color:"#777",lineHeight:1.7}}>
              A brief check-in once a week. "Did you do your three activities?" "How was your mood?" That's it. You don't need to share your scores, talk through your feelings, or do it together. You just need someone who will ask.
            </div>
          </div>
        </div>
      )}

      {/* ── BADGES TAB ── */}
      {tab==="badges" && (
        <div>
          <p style={{fontSize:14,color:"#888",marginBottom:20}}>{badges.length} of {BADGES.length} earned.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
            {BADGES.map(b=>{const earned=badges.includes(b.id);return(
              <div key={b.id} style={{background:earned?"white":"#FAFAF7",borderRadius:14,padding:"18px 14px",textAlign:"center",border:`1px solid ${earned?"transparent":"#eee"}`,boxShadow:earned?"0 1px 3px rgba(22,40,28,0.06)":"none",transition:"all 320ms cubic-bezier(0.165,0.84,0.44,1)"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:10}}><BadgeMedallion iconName={b.icon} unlocked={earned}/></div>
                <div style={{fontSize:13,fontWeight:700,fontFamily:"Literata,Georgia,serif",color:earned?"#2a2a2a":"#bbb",marginBottom:4}}>{b.name}</div>
                <div style={{fontSize:11,color:"#aaa",lineHeight:1.4}}>{b.desc}</div>
                {earned&&<div style={{marginTop:8,fontSize:11,color:"#8F6F35",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><Icon name="check" size={12} color="#8F6F35"/> Earned</div>}
              </div>
            );})}
          </div>
          <div style={{background:"white",borderRadius:14,padding:"20px",border:"1px solid #eee"}}>
            <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:15,color:"#2a2a2a",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="target" size={17} color="#3C6B4A"/> Point guide</h3>
            {[["Complete an activity","10–22 pts"],["Full week complete","+25 bonus pts"],["Bonus challenge","40–50 pts"],["3-day streak","Streak badge"],["7-day streak","Unstoppable badge"],["Invite an accountability partner","Better Together badge"],["Complete 6 check-ins","Honest Reflection badge"],["Complete 6-week reassessment","Growth Visible badge"]].map(([a,r])=>(
              <div key={a} style={{display:"flex",justifyContent:"space-between",paddingBottom:8,marginBottom:8,borderBottom:"1px solid #f0f0f0",fontSize:13}}>
                <span style={{color:"#444"}}>{a}</span><span style={{fontWeight:700,color:"#4A7C59"}}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── WHEEL TAB ── */}
      {tab==="wheel" && (
        <div>
          <p style={{fontSize:14,color:"#888",marginBottom:16,lineHeight:1.6}}>Your baseline assessment. Come back after 6 weeks to compare.</p>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}><div style={{width:300}}><WellnessWheelSVG scores={scores}/></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {WEDGES.map(w=>{const cfg=WEDGE_CONFIG[w],sc=scores[w],lv=getLevel(sc),active=focusAreas.includes(w);return(
              <div key={w} style={{background:active?cfg.light:"#f9f9f9",borderRadius:10,padding:"12px",border:`1.5px solid ${active?cfg.color:"#e8e8e8"}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <Icon name={cfg.icon} size={15} color={active?cfg.color:"#999"}/>
                  <span style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:active?cfg.color:"#666"}}>{w}</span>
                  {active&&<span style={{marginLeft:"auto",fontSize:10,color:cfg.color,fontWeight:700}}>FOCUS</span>}
                </div>
                <div style={{background:"#e8e8e8",borderRadius:99,height:5}}><div style={{width:`${sc}%`,background:cfg.color,height:"100%",borderRadius:99}}/></div>
                <div style={{fontSize:11,color:lv.color,marginTop:4,fontWeight:600}}>{sc}% · {lv.label}</div>
              </div>
            );})}
          </div>
          {!reassessScores&&<button onClick={()=>setReassessMode(true)} style={{width:"100%",marginTop:24,padding:"14px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <Icon name="chart" size={16}/> Take the 6-Week Reassessment
          </button>}
        </div>
      )}

      {/* ── COMPARE TAB ── */}
      {tab==="compare" && reassessScores && (
        <div>
          <div style={{textAlign:"center",marginBottom:24}}>
            <h2 style={{fontFamily:"Literata,Georgia,serif",fontSize:22,color:"#2a2a2a",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Icon name="chart" size={22} color="#3C6B4A"/> Before &amp; After</h2>
            <p style={{fontSize:14,color:"#777"}}>Six weeks of real effort, made visible.</p>
          </div>
          <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:28,flexWrap:"wrap"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#aaa",marginBottom:8,fontFamily:"Raleway,sans-serif"}}>Week 1 Baseline</div><WellnessWheelSVG scores={scores} size={240}/></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:13,color:"#3C6B4A",marginBottom:8,fontFamily:"Raleway,sans-serif",fontWeight:700}}>Week 6 Reassessment</div><WellnessWheelSVG scores={reassessScores} size={240}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {WEDGES.map(w=>{
              const cfg=WEDGE_CONFIG[w], before=scores[w], after=reassessScores[w], diff=after-before;
              return <div key={w} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #eee"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <Icon name={cfg.icon} size={15} color={cfg.color}/>
                  <span style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a"}}>{w}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:13,color:"#aaa"}}>{before}%</span>
                  <span style={{fontSize:12,color:"#ccc"}}>→</span>
                  <span style={{fontSize:15,fontWeight:700,color:cfg.color}}>{after}%</span>
                  <span style={{marginLeft:"auto",fontSize:13,fontWeight:700,color:diff>0?"#4A7C59":diff<0?"#C17A5A":"#aaa"}}>
                    {diff>0?"+":""}{diff}%
                  </span>
                </div>
              </div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WEEKLY CHECK-IN MODAL ────────────────────────────────────────────────────
function WeeklyCheckIn({ week, existing, onSubmit, onClose }) {
  const [mood,setMood]=useState(existing?.mood??3);
  const [note,setNote]=useState(existing?.note??"");
  // A colour ramp instead of face emoji: clay (struggling) through to cedar (great).
  const moodColors=["#A85D39","#C17A5A","#C9A15A","#6BAA75","#3C6B4A"];
  const moodLabels=["Struggling","Flat","Okay","Good","Great"];

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(22,40,28,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9998,padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:20,padding:"32px 24px",maxWidth:380,width:"100%"}}>
        <h3 style={{fontFamily:"Literata,Georgia,serif",fontSize:20,color:"#2a2a2a",marginBottom:6}}>Week {week} Check-in</h3>
        <p style={{fontSize:14,color:"#888",marginBottom:20,lineHeight:1.5}}>How are you feeling this week, overall?</p>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[1,2,3,4,5].map(v=>(
            <button key={v} onClick={()=>setMood(v)} style={{flex:1,padding:"12px 4px",borderRadius:12,border:`1.5px solid ${mood===v?moodColors[v-1]:"#e8e8e8"}`,background:mood===v?"#FAFAF7":"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 180ms"}}>
              <span style={{width:16,height:16,borderRadius:"50%",background:moodColors[v-1],opacity:mood===v?1:0.35,transition:"opacity 180ms"}}/>
              <span style={{fontSize:10,color:mood===v?moodColors[v-1]:"#aaa",fontWeight:600}}>{moodLabels[v-1]}</span>
            </button>
          ))}
        </div>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Anything to note this week? (optional)" rows={3} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1.5px solid #e0e0e0",fontSize:14,fontFamily:"Raleway,sans-serif",resize:"vertical",boxSizing:"border-box",marginBottom:16}}/>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"12px",background:"#f5f5f5",color:"#888",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif"}}>Cancel</button>
          <button onClick={()=>onSubmit(week,mood,note)} style={{flex:2,padding:"12px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>Save Check-in <Icon name="check" size={15} color="white"/></button>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"32px 16px",textAlign:"center"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><WellnessWheelSVG/></div>
      <h1 style={{fontFamily:"Literata,Georgia,serif",fontSize:28,color:"#2a2a2a",marginBottom:10,lineHeight:1.3}}>Your Caregiver Wellness Wheel</h1>
      <p style={{color:"#666",fontSize:15,lineHeight:1.7,marginBottom:28,maxWidth:420,margin:"0 auto 28px"}}>Built for family caregivers of someone with a rare disease. Eight dimensions of wellbeing. A 64-question assessment, a personalised report, and a gamified 6-week plan built around your actual life, not someone else's.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28,textAlign:"left"}}>
        {[["document","64-question assessment","8 questions across all 8 dimensions"],["chart","Personalised report","Scores, strengths, and focus areas"],["target","6-week plan","3 activities per week, your focus areas"],["medal","Points, badges & levels","Gamified progress that keeps you going"],["partnership","Accountability partner","Invite someone to keep you on track"],["moon","Weekly check-ins","Track your mood alongside your actions"],["sparkle","Bonus challenges","Optional harder activities, more points"],["chart","Before & after comparison","Reassess at week 6 to see your growth"]].map(([icon,title,desc],i)=>(
          <div key={i} style={{background:"white",borderRadius:12,padding:"14px",border:"1px solid #eee"}}>
            <div style={{marginBottom:8,color:"#3C6B4A"}}><Icon name={icon} size={22}/></div>
            <div style={{fontWeight:700,fontSize:13,fontFamily:"Literata,Georgia,serif",color:"#2a2a2a",marginBottom:3}}>{title}</div>
            <div style={{fontSize:11,color:"#888",lineHeight:1.4}}>{desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart} style={{width:"100%",padding:"16px",background:"#3C6B4A",color:"white",border:"none",borderRadius:999,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Raleway,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        Begin My Assessment <Icon name="arrowRight" size={17} color="white"/>
      </button>
      <p style={{fontSize:12,color:"#aaa",marginTop:12}}>Takes about 10 minutes. No account needed to start.</p>
      <p style={{fontSize:11,color:"#bbb",marginTop:20,lineHeight:1.6,maxWidth:420,marginLeft:"auto",marginRight:"auto"}}>This is a wellbeing programme, not a substitute for medical or mental health care. If you're in crisis, please contact a crisis line or your GP.</p>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage,setStage]=useState("landing");
  const [scores,setScores]=useState({});
  const [userName,setUserName]=useState("");
  const [focusAreas,setFocusAreas]=useState([]);

  return (
    <div style={{minHeight:"100vh",background:"#FDFBF7",fontFamily:"Raleway,sans-serif"}}>
      <div style={{background:"rgba(253,251,247,0.92)",backdropFilter:"blur(8px)",borderBottom:"1px solid #E5E0D5",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"#3C6B4A",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}><Icon name="mark" size={18}/></div>
          <div><div style={{fontWeight:700,fontSize:14,color:"#2a2a2a",fontFamily:"Literata,Georgia,serif"}}>Wellness Wheel</div><div style={{fontSize:10,color:"#aaa"}}>For family caregivers</div></div>
        </div>
        {stage!=="landing"&&<div style={{display:"flex",gap:6}}>
          {["assessment","report","plan"].map((s,i)=>{const stages=["assessment","report","signup","plan"];const done=stages.indexOf(stage)>i;const current=stage===s||(s==="report"&&stage==="signup");return <div key={s} style={{width:24,height:6,borderRadius:3,background:done?"#3C6B4A":current?"#6BAA75":"#e0e0e0",transition:"background 0.3s"}}/>;})}
        </div>}
      </div>
      <div style={{paddingBottom:48}}>
        {stage==="landing"&&<Landing onStart={()=>setStage("assessment")}/>}
        {stage==="assessment"&&<Assessment onComplete={s=>{setScores(s);setStage("report");}}/>}
        {stage==="report"&&<Report scores={scores} onSignUp={()=>setStage("signup")}/>}
        {stage==="signup"&&<SignUp scores={scores} onStart={(name,focus)=>{setUserName(name);setFocusAreas(focus);setStage("plan");}}/>}
        {stage==="plan"&&<GamifiedPlan scores={scores} userName={userName} focusAreas={focusAreas}/>}
      </div>
    </div>
  );
}
