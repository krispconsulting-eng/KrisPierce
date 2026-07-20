export const STREAMS = [
  { name: "SCN2A Australia", color: "var(--stream-scn2a)", emoji: "🟢" },
  { name: "KrisPierce Consulting", color: "var(--stream-kpc)", emoji: "🔵" },
  { name: "UNSW", color: "var(--stream-unsw)", emoji: "🟣" },
  { name: "Committees", color: "var(--stream-committees)", emoji: "🟠" },
  { name: "Rare Intelligence", color: "var(--stream-rare)", emoji: "🔴" },
  { name: "Caregiver", color: "var(--stream-caregiver)", emoji: "🌿" },
  { name: "Personal", color: "var(--stream-personal)", emoji: "⚪" },
];

export function streamColor(name) {
  const s = STREAMS.find((x) => x.name === name);
  return s ? s.color : "var(--stream-personal)";
}

export const PRIORITY_LABELS = {
  red: "Do now",
  yellow: "This week",
  green: "On track",
};

export function brisbaneToday() {
  // en-CA gives YYYY-MM-DD
  return new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Brisbane" });
}

export function niceDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
}

export function dueClass(iso) {
  if (!iso) return "";
  return iso < brisbaneToday() ? "overdue" : "";
}
