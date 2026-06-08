import React, { useState, useEffect, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Activity,
  Heart,
  BookOpen,
  Users,
  Sparkles,
  Briefcase,
  Home,
  Wallet,
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  Circle,
  Star,
  Award,
  TrendingUp,
  CalendarCheck,
  UserPlus,
  RefreshCw,
  GitCompareArrows,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * KRIS PIERCE — WELLNESS WHEEL (prototype)
 * Single-file React app. Self-contained, localStorage-backed.
 * See wellness-wheel-handoff.docx for the full developer brief.
 * ------------------------------------------------------------------ */

/* ----------------------------- Brand tokens ----------------------- *
 * Kris Pierce Consulting — warm, restorative wellness identity.
 * Light theme: sage green primary, clay accent, warm cream surfaces.
 * (Deliberately distinct from the Rare Intelligence "Deep Signal"
 *  cool-blue/navy brand — this is a separate product.)
 * Keys are kept stable; values map to roles via the comments below.
 * ------------------------------------------------------------------ */
const C = {
  teal: "#4F7C6B",   // PRIMARY accent — sage green (progress, earned, CTAs)
  aqua: "#C99A3F",   // intellectual dimension — warm gold
  seafoam: "#7E6191", // spiritual dimension — soft plum
  mint: "#34604F",   // active-nav text on sage tint — deep sage
  ghost: "#34302B",  // PRIMARY text — warm ink
  cobalt: "#C97C5D", // gradient partner + occupational dim — clay
  ocean: "#A9742F",  // financial dimension — bronze
  indigo: "#6E5568", // depth accent — muted plum
  navy: "#FBF6EF",   // page background AND text-on-accent — warm cream
  card: "#FFFFFF",   // card surface
  lift: "#F3EADF",   // inputs, track fills — warm sand
  hairline: "#E6DACB", // borders, dividers
  grey: "#8A7D6E",   // muted / secondary text — warm grey
};

/* Type: warm serif for headings, humanist sans for UI/body. */
const SERIF = "'Fraunces', 'Iowan Old Style', Georgia, serif";
const SANS = "'Inter', -apple-system, system-ui, sans-serif";

/* ----------------------------- Dimensions ------------------------- */
const DIMENSIONS = [
  { key: "physical", name: "Physical", Icon: Activity, color: C.teal },
  { key: "emotional", name: "Emotional", Icon: Heart, color: "#C76B7A" },
  { key: "intellectual", name: "Intellectual", Icon: BookOpen, color: C.aqua },
  { key: "social", name: "Social", Icon: Users, color: "#D98C5A" },
  { key: "spiritual", name: "Spiritual", Icon: Sparkles, color: C.seafoam },
  { key: "occupational", name: "Occupational", Icon: Briefcase, color: C.cobalt },
  { key: "environmental", name: "Environmental", Icon: Home, color: "#6E8B4A" },
  { key: "financial", name: "Financial", Icon: Wallet, color: C.ocean },
];

/* ----------------------------- Questions (64) --------------------- */
const QUESTIONS = {
  physical: [
    "I get enough quality sleep most nights.",
    "I move my body or exercise regularly.",
    "I eat nourishing food that fuels me.",
    "I stay well hydrated through the day.",
    "I have the energy to do what I want each day.",
    "I listen to my body's signals (rest, hunger, pain).",
    "I keep up with preventive health care.",
    "I limit habits that harm my health.",
  ],
  emotional: [
    "I can name and understand my emotions.",
    "I manage stress in healthy ways.",
    "I'm kind to myself when things go wrong.",
    "I can set boundaries when I need to.",
    "I bounce back from setbacks.",
    "I make time to process my feelings.",
    "I feel generally optimistic about life.",
    "I ask for help when I'm struggling.",
  ],
  intellectual: [
    "I regularly learn new things.",
    "I feel mentally stimulated and curious.",
    "I make time to read or study.",
    "I challenge my own assumptions.",
    "I engage in creative or problem-solving activities.",
    "I have conversations that stretch my thinking.",
    "I pursue interests beyond work.",
    "My mind feels like it's growing, not stagnant.",
  ],
  social: [
    "I have people I can rely on.",
    "I feel connected to my community.",
    "I make time for the relationships that matter.",
    "I can be my authentic self with others.",
    "I give and receive support in balance.",
    "I handle conflict in healthy ways.",
    "I feel a sense of belonging.",
    "I reach out instead of isolating.",
  ],
  spiritual: [
    "I have a sense of purpose.",
    "I live in line with my values.",
    "I make time for reflection or stillness.",
    "I feel connected to something larger than myself.",
    "I experience moments of awe or gratitude.",
    "I feel at peace with who I am.",
    "I act with compassion toward others.",
    "I feel my life has meaning.",
  ],
  occupational: [
    "I find my work meaningful.",
    "I have a healthy work-life balance.",
    "I feel competent and effective at what I do.",
    "I'm growing toward my career goals.",
    "I feel recognized for my contributions.",
    "I can manage my workload without burning out.",
    "I have good relationships at work.",
    "My work aligns with my values.",
  ],
  environmental: [
    "My home feels calm and organized.",
    "My spaces support my wellbeing.",
    "I spend enough time in nature.",
    "I live sustainably where I can.",
    "My environment is free of clutter that drains me.",
    "I feel safe in my surroundings.",
    "I have a space that feels truly mine.",
    "My digital environment feels under control.",
  ],
  financial: [
    "I feel in control of my finances.",
    "I spend in line with my values.",
    "I have savings for emergencies.",
    "I'm not overly stressed about money.",
    "I have a plan for my financial future.",
    "I understand where my money goes.",
    "I'm making progress on my financial goals.",
    "I could handle an unexpected expense.",
  ],
};

/* ----------------------------- Activities (144) ------------------- */
const A = (t, p) => ({ t, p });
const ACTIVITIES = {
  physical: [
    A("Drink 8 glasses of water", 5), A("Take a 30-minute walk", 8),
    A("Do a strength workout", 10), A("Get 8 hours of sleep", 8),
    A("Cook a vegetable-forward meal", 8), A("10-minute morning stretch", 5),
    A("Take the stairs all day", 5), A("No screens 1 hour before bed", 8),
    A("Try a new fitness class", 12), A("Meal-prep for the week", 10),
    A("Hit 10,000 steps", 10), A("Do a yoga session", 8),
    A("Cut added sugar for a day", 8), A("Schedule a health check-up", 12),
    A("Dance for 15 minutes", 5), A("Foam-roll or do mobility work", 5),
    A("Walk outside on your lunch break", 5), A("Hydrate before your coffee", 5),
  ],
  emotional: [
    A("Journal for 10 minutes", 8), A("Name 3 things you're grateful for", 5),
    A("5-minute breathing exercise", 5), A("Identify and label an emotion", 8),
    A("Say no to something draining", 10), A("Take a self-compassion break", 8),
    A("Limit doomscrolling to 15 min", 8), A("Write a letter you won't send", 8),
    A("Attend a therapy or coaching session", 15), A("Do a midday mood check-in", 5),
    A("Do something purely for joy", 8), A("Set one boundary", 10),
    A("Forgive yourself for one thing", 8), A("Meditate for 10 minutes", 8),
    A("Reflect on a recent win", 5), A("Let an emotion fully out", 5),
    A("Reframe one negative thought", 8), A("Take a tech-free hour", 8),
  ],
  intellectual: [
    A("Read 20 pages", 8), A("Listen to an educational podcast", 5),
    A("Learn 5 new words", 5), A("Do a puzzle or brain game", 5),
    A("Watch a documentary", 8), A("Take an online lesson", 10),
    A("Write a short reflection", 8), A("Have a deep conversation", 8),
    A("Practice a new skill for 30 min", 10), A("Visit a museum or gallery", 12),
    A("Practice a language", 8), A("Read outside your field", 8),
    A("Teach someone something", 10), A("Start a new book", 8),
    A("Solve a logic or coding challenge", 8), A("Attend a talk or webinar", 10),
    A("Journal one new idea", 5), A("Organize your notes", 5),
  ],
  social: [
    A("Call a friend", 8), A("Send an appreciation text", 5),
    A("Schedule a meetup", 10), A("Share a meal with someone", 8),
    A("Compliment a stranger", 5), A("Reconnect with an old friend", 10),
    A("Join a group or club activity", 12), A("Listen actively, phone away", 8),
    A("Host a small gathering", 12), A("Help someone unprompted", 8),
    A("Write a thank-you note", 5), A("Check in on someone struggling", 8),
    A("Share a recipe or photo", 5), A("Make a new acquaintance", 10),
    A("Plan a future trip with friends", 8), A("Resolve a small conflict", 10),
    A("Have a family video call", 8), A("Give a genuine apology", 8),
  ],
  spiritual: [
    A("Meditate for 10 minutes", 8), A("Spend 15 minutes in nature", 8),
    A("Practice a gratitude reflection", 5), A("Read something inspirational", 5),
    A("Set an intention for the day", 5), A("Volunteer or do an act of service", 12),
    A("Sit in silence for 5 minutes", 5), A("Journal about your values", 8),
    A("Attend a service or gathering", 10), A("Eat one meal mindfully", 8),
    A("Watch a sunrise or sunset", 5), A("Declutter for mental clarity", 8),
    A("Reflect on what matters most", 8), A("Forgive someone", 10),
    A("Create art or music freely", 8), A("Do a breathwork session", 8),
    A("Light a candle and reflect", 5), A("Take a half-day digital sabbath", 12),
  ],
  occupational: [
    A("Set 3 priorities for the day", 5), A("Tackle your hardest task first", 8),
    A("Take a real lunch break", 5), A("Tidy your workspace", 5),
    A("Learn a tool or shortcut", 8), A("Ask for feedback", 10),
    A("Update your resume or portfolio", 10), A("Network with one person", 10),
    A("Block uninterrupted focus time", 8), A("Celebrate a work win", 5),
    A("Set a career goal", 10), A("Mentor or be mentored", 10),
    A("Say no to scope creep", 8), A("Log off on time", 8),
    A("Reflect on what energizes you", 5), A("Automate a repetitive task", 10),
    A("Read industry news", 5), A("Plan tomorrow before logging off", 5),
  ],
  environmental: [
    A("Declutter one drawer or shelf", 5), A("Make your bed", 5),
    A("Add a plant to your space", 8), A("Recycle or compost today", 5),
    A("Deep-clean one room", 10), A("Skip single-use plastic", 8),
    A("Open windows for fresh air", 5), A("Create a calming corner", 8),
    A("Organize your digital files", 5), A("Walk or bike instead of drive", 8),
    A("Donate items you don't use", 10), A("Reduce your energy use today", 5),
    A("Carry a reusable bottle or bag", 5), A("Tidy up before bed", 5),
    A("Spend time in a green space", 8), A("Fix something instead of tossing it", 10),
    A("Meal-plan to cut food waste", 8), A("Create a no-phone zone at home", 8),
  ],
  financial: [
    A("Track today's spending", 5), A("Review your budget", 8),
    A("Have a no-spend day", 8), A("Automate a savings transfer", 10),
    A("Cancel an unused subscription", 10), A("Check your account balances", 5),
    A("Pack lunch instead of buying", 5), A("Read one finance article", 5),
    A("Set a savings goal", 10), A("Review a recurring bill", 8),
    A("Make an extra debt payment", 12), A("Plan meals to cut grocery cost", 8),
    A("Compare prices before a purchase", 5), A("Sell something unused", 10),
    A("Learn about investing for 20 min", 8), A("Check your emergency fund", 10),
    A("Negotiate a bill", 12), A("Reflect on a money value", 5),
  ],
};

/* ----------------------------- Bonus challenges (8) --------------- */
const BONUS = [
  { dim: "physical", title: "7-Day Movement Streak", desc: "Move your body every day for a week.", points: 45 },
  { dim: "emotional", title: "Boundary Week", desc: "Set and hold one new boundary for 7 days.", points: 45 },
  { dim: "intellectual", title: "Finish a Book", desc: "Read a book cover to cover.", points: 50 },
  { dim: "social", title: "Reconnect Five", desc: "Reach out to 5 people you've lost touch with.", points: 45 },
  { dim: "spiritual", title: "10-Day Stillness", desc: "Meditate or sit in silence daily for 10 days.", points: 50 },
  { dim: "occupational", title: "Deep-Work Sprint", desc: "Protect 5 days of focus blocks in a row.", points: 45 },
  { dim: "environmental", title: "Declutter a Room", desc: "Fully clear and reset one room.", points: 40 },
  { dim: "financial", title: "30-Day Money Map", desc: "Track every dollar for a month.", points: 50 },
];

/* ----------------------------- Levels ----------------------------- */
const LEVELS = [
  { name: "Seedling", min: 0 },
  { name: "Sprout", min: 100 },
  { name: "Bloom", min: 300 },
  { name: "Flourish", min: 600 },
  { name: "Radiant", min: 1000 },
];
const levelFor = (pts) => {
  let lvl = LEVELS[0], idx = 0;
  LEVELS.forEach((l, i) => { if (pts >= l.min) { lvl = l; idx = i; } });
  const next = LEVELS[idx + 1];
  return { name: lvl.name, index: idx + 1, next, progress: next ? (pts - lvl.min) / (next.min - lvl.min) : 1 };
};

/* ----------------------------- Badges (12) ------------------------ */
const BADGES = [
  { id: "first_steps", name: "First Steps", desc: "Complete your first assessment.", Icon: Star,
    check: (s) => s.baseline },
  { id: "wheel_turner", name: "Wheel Turner", desc: "Complete 10 activities.", Icon: RefreshCw,
    check: (s) => s.doneActivities.length >= 10 },
  { id: "balanced", name: "Balanced", desc: "Do at least one activity in every dimension.", Icon: Target,
    check: (s) => DIMENSIONS.every((d) => s.doneActivities.some((id) => id.startsWith(d.key + ":"))) },
  { id: "centurion", name: "Centurion", desc: "Earn 100 points.", Icon: Award,
    check: (s) => s.points >= 100 },
  { id: "high_five", name: "High Five", desc: "Earn 500 points.", Icon: Trophy,
    check: (s) => s.points >= 500 },
  { id: "level_up", name: "Level Up", desc: "Reach Level 3 (Bloom).", Icon: TrendingUp,
    check: (s) => levelFor(s.points).index >= 3 },
  { id: "challenger", name: "Challenger", desc: "Complete a bonus challenge.", Icon: Flame,
    check: (s) => s.doneBonus.length >= 1 },
  { id: "overachiever", name: "Overachiever", desc: "Complete all 8 bonus challenges.", Icon: Trophy,
    check: (s) => s.doneBonus.length >= 8 },
  { id: "honest", name: "Honest With Herself", desc: "Complete a weekly check-in.", Icon: CalendarCheck,
    check: (s) => s.checkins.length >= 1 },
  { id: "on_a_roll", name: "On a Roll", desc: "Reach a 3-week check-in streak.", Icon: Flame,
    check: (s) => s.streak >= 3 },
  { id: "together", name: "Better Together", desc: "Add an accountability partner.", Icon: UserPlus,
    check: (s) => !!s.partnerEmail },
  { id: "growth", name: "Growth Visible", desc: "Reassess and improve your overall score.", Icon: GitCompareArrows,
    check: (s) => s.current && s.baseline && avg(scores(s.current)) > avg(scores(s.baseline)) },
];

/* ----------------------------- Helpers ---------------------------- */
const scores = (answers) => {
  const out = {};
  DIMENSIONS.forEach((d) => {
    const a = answers?.[d.key] || [];
    const filled = a.filter((x) => x > 0);
    out[d.key] = filled.length ? Math.round((filled.reduce((s, x) => s + x, 0) / filled.length / 5) * 100) : 0;
  });
  return out;
};
const avg = (obj) => {
  const v = Object.values(obj);
  return v.length ? Math.round(v.reduce((s, x) => s + x, 0) / v.length) : 0;
};

const STORAGE_KEY = "kp_wellness_wheel_v1";
const loadState = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
};

/* ================================================================== *
 * APP
 * ================================================================== */
export default function WellnessWheel() {
  const persisted = loadState();
  const [tab, setTab] = useState(persisted.baseline ? "wheel" : "assessment");
  const [baseline, setBaseline] = useState(persisted.baseline || null);
  const [current, setCurrent] = useState(persisted.current || null);
  const [doneActivities, setDoneActivities] = useState(persisted.doneActivities || []);
  const [doneBonus, setDoneBonus] = useState(persisted.doneBonus || []);
  const [checkins, setCheckins] = useState(persisted.checkins || []);
  const [partnerEmail, setPartnerEmail] = useState(persisted.partnerEmail || "");
  const [seenBadges, setSeenBadges] = useState(persisted.seenBadges || []);
  const [toast, setToast] = useState(null);

  // points = activities + bonus + check-ins (5 each)
  const points = useMemo(() => {
    let p = 0;
    doneActivities.forEach((id) => {
      const [dim, i] = id.split(":");
      p += ACTIVITIES[dim]?.[+i]?.p || 0;
    });
    doneBonus.forEach((dim) => {
      const b = BONUS.find((x) => x.dim === dim);
      p += b ? b.points : 0;
    });
    p += checkins.length * 5;
    return p;
  }, [doneActivities, doneBonus, checkins]);

  const streak = useMemo(() => computeStreak(checkins), [checkins]);

  const stateForBadges = { baseline, current, doneActivities, doneBonus, checkins, partnerEmail, points, streak };
  const earned = useMemo(
    () => BADGES.filter((b) => b.check(stateForBadges)).map((b) => b.id),
    [baseline, current, doneActivities, doneBonus, checkins, partnerEmail, points, streak]
  );

  // persist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ baseline, current, doneActivities, doneBonus, checkins, partnerEmail, seenBadges })
    );
  }, [baseline, current, doneActivities, doneBonus, checkins, partnerEmail, seenBadges]);

  // badge unlock toast
  useEffect(() => {
    const fresh = earned.filter((id) => !seenBadges.includes(id));
    if (fresh.length) {
      const b = BADGES.find((x) => x.id === fresh[0]);
      setToast(`Badge unlocked — ${b.name}!`);
      setSeenBadges((s) => [...new Set([...s, ...earned])]);
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [earned]); // eslint-disable-line

  const toggleActivity = (dim, i) => {
    const id = `${dim}:${i}`;
    setDoneActivities((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  };
  const toggleBonus = (dim) =>
    setDoneBonus((d) => (d.includes(dim) ? d.filter((x) => x !== dim) : [...d, dim]));

  const lvl = levelFor(points);
  const liveScores = current ? scores(current) : baseline ? scores(baseline) : null;

  const TABS = [
    { key: "assessment", label: "Assessment", Icon: ClipboardList },
    { key: "wheel", label: "My Wheel", Icon: Target, gate: !!baseline },
    { key: "activities", label: "Activities", Icon: CheckCircle2, gate: !!baseline },
    { key: "bonus", label: "Bonus", Icon: Flame, gate: !!baseline },
    { key: "checkin", label: "Check-in", Icon: CalendarCheck, gate: !!baseline },
    { key: "partner", label: "Partner", Icon: UserPlus, gate: !!baseline },
    { key: "reassess", label: "Reassess", Icon: RefreshCw, gate: !!baseline },
    { key: "compare", label: "Compare", Icon: GitCompareArrows, gate: !!current },
  ];

  return (
    <div style={{ background: C.navy, color: C.ghost, minHeight: "100vh", fontFamily: SANS }}>
      {/* Sticky header */}
      <header
        style={{
          position: "sticky", top: 0, zIndex: 30, background: "rgba(251,246,239,0.92)",
          backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.hairline}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${C.teal}, ${C.cobalt})` }} />
            <strong style={{ letterSpacing: 0.3, fontFamily: SERIF, fontWeight: 600, fontSize: 18 }}>Wellness Wheel</strong>
          </div>
          {baseline && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18, fontSize: 13 }}>
              <Stat label="Level" value={`${lvl.index} · ${lvl.name}`} />
              <Stat label="Points" value={points} icon={<Star size={14} color={C.teal} />} />
              <Stat label="Streak" value={`${streak} wk`} icon={<Flame size={14} color="#C97C5D" />} />
            </div>
          )}
        </div>
        {baseline && (
          <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "0 12px 10px", display: "flex", gap: 6, overflowX: "auto" }}>
            {TABS.filter((t) => t.gate !== false).map((t) => {
              const disabled = t.gate === false;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  disabled={disabled}
                  onClick={() => setTab(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                    padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                    border: `1px solid ${active ? C.teal : C.hairline}`,
                    background: active ? "rgba(79,124,107,0.14)" : "transparent",
                    color: active ? C.mint : disabled ? C.grey : C.ghost,
                    opacity: disabled ? 0.4 : 1, cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <t.Icon size={15} /> {t.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
        {tab === "assessment" && (
          <Assessment
            mode="baseline"
            onComplete={(answers) => {
              setBaseline(answers);
              setCurrent(null);
              setTab("wheel");
            }}
          />
        )}
        {tab === "reassess" && (
          <Assessment
            mode="reassess"
            onComplete={(answers) => {
              setCurrent(answers);
              setTab("compare");
            }}
          />
        )}
        {tab === "wheel" && liveScores && (
          <Wheel scores={liveScores} points={points} lvl={lvl} earned={earned} />
        )}
        {tab === "activities" && (
          <Activities done={doneActivities} onToggle={toggleActivity} />
        )}
        {tab === "bonus" && <BonusChallenges done={doneBonus} onToggle={toggleBonus} />}
        {tab === "checkin" && (
          <CheckIn checkins={checkins} streak={streak} onAdd={(c) => setCheckins((x) => [...x, c])} />
        )}
        {tab === "partner" && (
          <Partner email={partnerEmail} onSave={setPartnerEmail} />
        )}
        {tab === "compare" && baseline && current && (
          <Compare baseline={scores(baseline)} current={scores(current)} />
        )}
        {tab === "compare" && !current && <ReassessPrompt onGo={() => setTab("reassess")} />}
      </main>

      {toast && (
        <div
          style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${C.teal}, ${C.cobalt})`, color: C.navy,
            padding: "12px 22px", borderRadius: 999, fontWeight: 700, zIndex: 50,
            boxShadow: "0 10px 30px rgba(79,124,107,0.35)", display: "flex", gap: 8, alignItems: "center",
          }}
        >
          <Trophy size={18} /> {toast}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Small UI bits ---------------------- */
function Stat({ label, value, icon }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <span style={{ color: C.grey, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700 }}>{icon}{value}</span>
    </div>
  );
}
const cardStyle = {
  background: C.card, border: `1px solid ${C.hairline}`, borderRadius: 16, padding: 20,
  boxShadow: "0 6px 20px rgba(52,48,43,0.06)",
};
function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 600, fontFamily: SERIF }}>{children}</h2>
      {sub && <p style={{ margin: "6px 0 0", color: C.grey, fontSize: 14 }}>{sub}</p>}
    </div>
  );
}

/* ----------------------------- Assessment ------------------------- */
function Assessment({ mode, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const a = {};
    DIMENSIONS.forEach((d) => (a[d.key] = Array(8).fill(0)));
    return a;
  });
  const dim = DIMENSIONS[step];
  const qs = QUESTIONS[dim.key];
  const dimAnswers = answers[dim.key];
  const allAnswered = dimAnswers.every((x) => x > 0);
  const totalAnswered = Object.values(answers).flat().filter((x) => x > 0).length;

  const setAnswer = (i, val) =>
    setAnswers((a) => ({ ...a, [dim.key]: a[dim.key].map((x, idx) => (idx === i ? val : x)) }));

  return (
    <div>
      <SectionTitle sub={`${mode === "reassess" ? "6-week reassessment" : "Baseline assessment"} · 64 questions across 8 dimensions`}>
        {mode === "reassess" ? "Reassess Your Wheel" : "Discover Your Wellness Wheel"}
      </SectionTitle>

      {/* progress */}
      <div style={{ height: 8, background: C.lift, borderRadius: 999, overflow: "hidden", marginBottom: 22 }}>
        <div style={{ width: `${(totalAnswered / 64) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.cobalt})`, transition: "width .3s" }} />
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: dim.color + "22", display: "grid", placeItems: "center" }}>
            <dim.Icon size={22} color={dim.color} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{dim.name}</div>
            <div style={{ color: C.grey, fontSize: 13 }}>Dimension {step + 1} of 8</div>
          </div>
        </div>

        {qs.map((q, i) => (
          <div key={i} style={{ padding: "14px 0", borderTop: i ? `1px solid ${C.hairline}` : "none" }}>
            <div style={{ marginBottom: 10, fontSize: 15 }}>{q}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => setAnswer(i, v)}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, fontWeight: 700,
                    border: `1px solid ${dimAnswers[i] === v ? dim.color : C.hairline}`,
                    background: dimAnswers[i] === v ? dim.color : "transparent",
                    color: dimAnswers[i] === v ? C.navy : C.ghost, cursor: "pointer",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: C.grey, fontSize: 11, marginTop: 6 }}>
              <span>Strongly disagree</span><span>Strongly agree</span>
            </div>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{ ...ghostBtn, opacity: step === 0 ? 0.4 : 1 }}
          >
            Back
          </button>
          {step < 7 ? (
            <button onClick={() => setStep((s) => s + 1)} disabled={!allAnswered} style={{ ...primaryBtn, opacity: allAnswered ? 1 : 0.5 }}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={() => onComplete(answers)} disabled={totalAnswered < 64} style={{ ...primaryBtn, opacity: totalAnswered < 64 ? 0.5 : 1 }}>
              See my wheel <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Wheel ------------------------------ */
function Wheel({ scores: sc, points, lvl, earned }) {
  const data = DIMENSIONS.map((d) => ({ dim: d.name, score: sc[d.key] }));
  const overall = avg(sc);
  return (
    <div>
      <SectionTitle sub={`Overall balance score: ${overall}/100`}>My Wellness Wheel</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={cardStyle}>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke={C.hairline} />
              <PolarAngleAxis dataKey="dim" tick={{ fill: C.grey, fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fill: C.grey, fontSize: 10 }} stroke={C.hairline} />
              <Radar dataKey="score" stroke={C.teal} strokeWidth={2.5} fill={C.teal} fillOpacity={0.55} dot={{ r: 3, fill: C.teal }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>Level {lvl.index} · {lvl.name}</strong>
              <span style={{ color: C.teal, fontWeight: 700 }}>{points} pts</span>
            </div>
            <div style={{ height: 8, background: C.lift, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${Math.round(lvl.progress * 100)}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.cobalt})` }} />
            </div>
            {lvl.next && <div style={{ color: C.grey, fontSize: 12, marginTop: 6 }}>{lvl.next.min - points} pts to {lvl.next.name}</div>}
          </div>
          <div style={cardStyle}>
            <strong>Dimension scores</strong>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
              {DIMENSIONS.map((d) => (
                <div key={d.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <d.Icon size={15} color={d.color} />
                  <span style={{ width: 96, fontSize: 13 }}>{d.name}</span>
                  <div style={{ flex: 1, height: 6, background: C.lift, borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${sc[d.key]}%`, height: "100%", background: d.color }} />
                  </div>
                  <span style={{ width: 28, textAlign: "right", fontSize: 13, fontWeight: 700 }}>{sc[d.key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BadgeShelf earned={earned} />
    </div>
  );
}

function BadgeShelf({ earned }) {
  return (
    <div style={{ marginTop: 22 }}>
      <SectionTitle sub={`${earned.length} of ${BADGES.length} earned`}>Badges</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
        {BADGES.map((b) => {
          const has = earned.includes(b.id);
          return (
            <div key={b.id} style={{ ...cardStyle, padding: 14, opacity: has ? 1 : 0.45, borderColor: has ? C.teal : C.hairline }}>
              <b.Icon size={22} color={has ? C.teal : C.grey} />
              <div style={{ fontWeight: 700, marginTop: 8, fontSize: 14 }}>{b.name}</div>
              <div style={{ color: C.grey, fontSize: 12, marginTop: 3 }}>{b.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Activities ------------------------- */
function Activities({ done, onToggle }) {
  const [open, setOpen] = useState(DIMENSIONS[0].key);
  return (
    <div>
      <SectionTitle sub="144 small actions, 18 per dimension. Tick what you complete to earn points.">
        Activity Library
      </SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DIMENSIONS.map((d) => {
          const list = ACTIVITIES[d.key];
          const doneCount = list.filter((_, i) => done.includes(`${d.key}:${i}`)).length;
          const isOpen = open === d.key;
          return (
            <div key={d.key} style={cardStyle}>
              <button
                onClick={() => setOpen(isOpen ? "" : d.key)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", color: C.ghost, cursor: "pointer" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: d.color + "22", display: "grid", placeItems: "center" }}>
                  <d.Icon size={19} color={d.color} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{d.name}</span>
                <span style={{ marginLeft: "auto", color: C.grey, fontSize: 13 }}>{doneCount}/{list.length}</span>
                <ChevronRight size={18} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: ".2s" }} />
              </button>
              {isOpen && (
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
                  {list.map((act, i) => {
                    const id = `${d.key}:${i}`;
                    const checked = done.includes(id);
                    return (
                      <button
                        key={i}
                        onClick={() => onToggle(d.key, i)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", textAlign: "left",
                          borderRadius: 10, border: `1px solid ${checked ? d.color : C.hairline}`,
                          background: checked ? d.color + "1A" : "transparent", color: C.ghost, cursor: "pointer",
                        }}
                      >
                        {checked ? <CheckCircle2 size={18} color={d.color} /> : <Circle size={18} color={C.grey} />}
                        <span style={{ flex: 1, fontSize: 14 }}>{act.t}</span>
                        <span style={{ color: checked ? d.color : C.grey, fontWeight: 700, fontSize: 13 }}>+{act.p}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Bonus ------------------------------ */
function BonusChallenges({ done, onToggle }) {
  return (
    <div>
      <SectionTitle sub="One optional stretch challenge per dimension — bigger effort, bigger reward.">
        Bonus Challenges
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {BONUS.map((b) => {
          const d = DIMENSIONS.find((x) => x.key === b.dim);
          const checked = done.includes(b.dim);
          return (
            <div key={b.dim} style={{ ...cardStyle, borderColor: checked ? d.color : C.hairline }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <d.Icon size={18} color={d.color} />
                <strong style={{ fontSize: 15 }}>{b.title}</strong>
              </div>
              <p style={{ color: C.grey, fontSize: 13, margin: "0 0 14px" }}>{b.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: d.color, fontWeight: 800 }}>+{b.points} pts</span>
                <button onClick={() => onToggle(b.dim)} style={checked ? { ...ghostBtn } : { ...primaryBtn }}>
                  {checked ? "Completed ✓" : "Mark complete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Check-in --------------------------- */
const MOODS = ["😞", "😕", "😐", "🙂", "😄"];
function CheckIn({ checkins, streak, onAdd }) {
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");
  const thisWeek = isoWeek(new Date());
  const already = checkins.some((c) => c.week === thisWeek);

  return (
    <div>
      <SectionTitle sub={`Current streak: ${streak} week${streak === 1 ? "" : "s"} · +5 pts per check-in`}>
        Weekly Check-in
      </SectionTitle>
      <div style={{ ...cardStyle, maxWidth: 560 }}>
        {already ? (
          <p style={{ color: C.teal }}>You've checked in this week. See you next week 🌱</p>
        ) : (
          <>
            <div style={{ marginBottom: 8, fontSize: 15 }}>How has this week felt?</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {MOODS.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setMood(i + 1)}
                  style={{
                    flex: 1, fontSize: 26, padding: "10px 0", borderRadius: 12, cursor: "pointer",
                    border: `1px solid ${mood === i + 1 ? C.teal : C.hairline}`,
                    background: mood === i + 1 ? "rgba(79,124,107,0.14)" : "transparent",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything you want to note about this week? (optional)"
              rows={3}
              style={{ width: "100%", boxSizing: "border-box", background: C.lift, border: `1px solid ${C.hairline}`, borderRadius: 10, color: C.ghost, padding: 12, fontSize: 14, resize: "vertical" }}
            />
            <button
              disabled={!mood}
              onClick={() => { onAdd({ week: thisWeek, mood, note, date: new Date().toISOString() }); setMood(0); setNote(""); }}
              style={{ ...primaryBtn, marginTop: 14, opacity: mood ? 1 : 0.5 }}
            >
              Save check-in
            </button>
          </>
        )}
      </div>

      {checkins.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <strong>History</strong>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {[...checkins].reverse().map((c, i) => (
              <div key={i} style={{ ...cardStyle, padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>{MOODS[c.mood - 1]}</span>
                <div>
                  <div style={{ fontSize: 13, color: C.grey }}>{c.week} · {new Date(c.date).toLocaleDateString()}</div>
                  {c.note && <div style={{ fontSize: 14 }}>{c.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Partner ---------------------------- */
function Partner({ email, onSave }) {
  const [val, setVal] = useState(email);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  return (
    <div>
      <SectionTitle sub="Share your journey with someone who keeps you honest. Unlocks the “Better Together” badge.">
        Accountability Partner
      </SectionTitle>
      <div style={{ ...cardStyle, maxWidth: 520 }}>
        {email ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, color: C.teal }}>
            <UserPlus size={18} /> Partner set: <strong>{email}</strong>
          </div>
        ) : null}
        <label style={{ fontSize: 13, color: C.grey }}>Partner's email</label>
        <input
          type="email"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="partner@email.com"
          style={{ width: "100%", boxSizing: "border-box", marginTop: 6, background: C.lift, border: `1px solid ${C.hairline}`, borderRadius: 10, color: C.ghost, padding: 12, fontSize: 14 }}
        />
        <button disabled={!valid} onClick={() => onSave(val)} style={{ ...primaryBtn, marginTop: 14, opacity: valid ? 1 : 0.5 }}>
          {email ? "Update partner" : "Add partner"}
        </button>
        <p style={{ color: C.grey, fontSize: 12, marginTop: 12 }}>
          In production this triggers a weekly summary email to your partner. (Wire up the email API — see handoff doc §5.)
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- Compare ---------------------------- */
function Compare({ baseline, current }) {
  const data = DIMENSIONS.map((d) => ({ dim: d.name, Before: baseline[d.key], After: current[d.key] }));
  const beforeAvg = avg(baseline), afterAvg = avg(current);
  return (
    <div>
      <SectionTitle sub={`Overall: ${beforeAvg} → ${afterAvg} (${afterAvg - beforeAvg >= 0 ? "+" : ""}${afterAvg - beforeAvg})`}>
        Before &amp; After
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={cardStyle}>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke={C.hairline} />
              <PolarAngleAxis dataKey="dim" tick={{ fill: C.grey, fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fill: C.grey, fontSize: 10 }} stroke={C.hairline} />
              <Radar name="Before" dataKey="Before" stroke={C.grey} strokeWidth={2} fill={C.grey} fillOpacity={0.18} />
              <Radar name="After" dataKey="After" stroke={C.teal} strokeWidth={2.5} fill={C.teal} fillOpacity={0.5} dot={{ r: 3, fill: C.teal }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={cardStyle}>
          <strong>Per-dimension change</strong>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 9 }}>
            {DIMENSIONS.map((d) => {
              const delta = current[d.key] - baseline[d.key];
              const up = delta >= 0;
              return (
                <div key={d.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <d.Icon size={15} color={d.color} />
                  <span style={{ flex: 1, fontSize: 14 }}>{d.name}</span>
                  <span style={{ color: C.grey, fontSize: 13 }}>{baseline[d.key]} → {current[d.key]}</span>
                  <span style={{ width: 46, textAlign: "right", fontWeight: 800, color: up ? C.teal : "#C76B7A" }}>
                    {up ? "+" : ""}{delta}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReassessPrompt({ onGo }) {
  return (
    <div style={{ ...cardStyle, textAlign: "center", maxWidth: 520, margin: "40px auto" }}>
      <GitCompareArrows size={32} color={C.teal} />
      <h3 style={{ margin: "12px 0 6px" }}>No comparison yet</h3>
      <p style={{ color: C.grey, fontSize: 14 }}>Complete a reassessment after ~6 weeks to see how your wheel has changed.</p>
      <button onClick={onGo} style={{ ...primaryBtn, margin: "8px auto 0" }}>Start reassessment</button>
    </div>
  );
}

/* ----------------------------- Button styles ---------------------- */
const primaryBtn = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 999,
  border: "none", background: `linear-gradient(135deg, ${C.teal}, ${C.cobalt})`, color: C.navy,
  fontWeight: 700, cursor: "pointer", fontSize: 14,
};
const ghostBtn = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 999,
  border: `1px solid ${C.hairline}`, background: "transparent", color: C.ghost, fontWeight: 700,
  cursor: "pointer", fontSize: 14,
};

/* ----------------------------- Date utils ------------------------- */
function isoWeek(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function computeStreak(checkins) {
  if (!checkins.length) return 0;
  const weeks = [...new Set(checkins.map((c) => c.week))].sort().reverse();
  let streak = 1;
  for (let i = 1; i < weeks.length; i++) {
    if (consecutive(weeks[i], weeks[i - 1])) streak++;
    else break;
  }
  return streak;
}
function consecutive(earlier, later) {
  const p = (w) => { const [y, wk] = w.split("-W").map(Number); return y * 53 + wk; };
  return p(later) - p(earlier) === 1;
}
