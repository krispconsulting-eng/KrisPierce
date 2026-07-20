// ————— Weekly triage logic —————
// Shared between the /triage page and the Friday 5pm routine so both band and
// tag tasks the same way. Everything derives from the existing kp_tasks fields
// (priority, due, kind, stream, title, notes); if a row already carries an
// explicit triage/mode/model/fable value (set by the Friday routine), that
// override wins.

import { brisbaneToday } from "./ui";

export const BANDS = {
  urgent: {
    key: "urgent",
    label: "Urgent",
    blurb: "Requires completion to work — blocks other things.",
    color: "var(--red)",
    soft: "var(--red-soft)",
    border: "var(--red-border)",
    emoji: "🔴",
  },
  intermediate: {
    key: "intermediate",
    label: "Intermediate",
    blurb: "High priority — land it this week.",
    color: "var(--yellow)",
    soft: "var(--yellow-soft)",
    border: "var(--yellow-border)",
    emoji: "🟡",
  },
  soon: {
    key: "soon",
    label: "Soon",
    blurb: "On the radar — next couple of weeks.",
    color: "var(--green)",
    soft: "var(--green-soft)",
    border: "var(--green-border)",
    emoji: "🟢",
  },
};

export const MODE = {
  fast: { key: "fast", label: "Fast", blurb: "Quick, well-scoped, no deep reasoning" },
  slow: { key: "slow", label: "Slow", blurb: "Complex — needs thought & verification" },
};

export const MODEL = {
  haiku: { key: "haiku", label: "Haiku / Fable 5", blurb: "Routine, deterministic work" },
  sonnet: { key: "sonnet", label: "Sonnet", blurb: "Balanced default for most work" },
  opus: { key: "opus", label: "Opus", blurb: "Architecture, novel problems, design" },
};

// Word signals. "Slow" wins over "fast" when both appear.
const FAST_WORDS = /\b(reply|respond|email|send|book|schedule|confirm|rsvp|update|check|review|read|file|log|forward|remind|call|ping|approve|sign|pay|invoice|order|share|post)\b/i;
const SLOW_WORDS = /\b(draft|write|design|plan|strategy|proposal|grant|report|analy|research|build|architect|framework|submission|budget|roadmap|deck|paper|manuscript|policy|review\s+of|scope|synthesi)\b/i;

// Streams where a miss is costly — never auto-route to Fable/Haiku.
const HIGH_STAKES = new Set(["SCN2A Australia", "UNSW", "Committees", "Rare Intelligence"]);

function has(v) {
  return v !== undefined && v !== null && String(v).trim() !== "";
}

export function deriveBand(task, today) {
  if (has(task.triage)) return String(task.triage).toLowerCase();
  const t = today || brisbaneToday();
  const due = task.due || "";
  if (task.priority === "red" || (due && due <= t)) return "urgent";
  if (task.priority === "yellow" || (due && due <= addDays(t, 7))) return "intermediate";
  return "soon";
}

export function deriveMode(task) {
  if (has(task.mode)) return String(task.mode).toLowerCase();
  const text = `${task.title || ""} ${task.notes || ""}`;
  if (SLOW_WORDS.test(text)) return "slow";
  if (FAST_WORDS.test(text)) return "fast";
  // Short, unadorned titles tend to be quick admin actions.
  return (task.title || "").trim().split(/\s+/).length <= 4 ? "fast" : "slow";
}

export function deriveModel(task, mode) {
  if (has(task.model)) return String(task.model).toLowerCase();
  const m = mode || deriveMode(task);
  if (m === "slow") return HIGH_STAKES.has(task.stream) ? "opus" : "sonnet";
  // fast:
  return HIGH_STAKES.has(task.stream) ? "sonnet" : "haiku";
}

export function isFable(task, mode, model) {
  if (has(task.fable)) return /^(1|true|yes|y)$/i.test(String(task.fable));
  const md = model || deriveModel(task, mode);
  const mo = mode || deriveMode(task);
  return mo === "fast" && md === "haiku";
}

export function estimate(task, mode) {
  if (has(task.est)) return String(task.est);
  return (mode || deriveMode(task)) === "fast" ? "~15 min" : "~45 min";
}

// Full triage record for a task.
export function triage(task, today) {
  const band = deriveBand(task, today);
  const mode = deriveMode(task);
  const model = deriveModel(task, mode);
  return { band, mode, model, fable: isFable(task, mode, model), est: estimate(task, mode) };
}

// ————— date helpers (string YYYY-MM-DD, no Date math traps) —————
export function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// The coming Monday (or today if today is Monday) in Brisbane.
export function nextMonday(today) {
  const t = today || brisbaneToday();
  const d = new Date(t + "T00:00:00Z");
  const dow = d.getUTCDay(); // 0 Sun … 1 Mon
  const delta = dow === 1 ? 0 : (8 - dow) % 7;
  return addDays(t, delta);
}

export function labelDate(iso) {
  if (!iso) return "";
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
