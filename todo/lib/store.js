const config = require("./config");

async function callApi(payload) {
  const res = await fetch(config.N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: config.N8N_API_KEY, ...payload }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Store API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

const FIELDS = [
  "title",
  "notes",
  "stream",
  "kind",
  "priority",
  "status",
  "due",
  "source",
  "source_ref",
  "project",
  "sort",
];

// Every write sends the complete row (the n8n update maps all columns),
// so normalise partial input against sensible defaults / the existing row.
function fullRow(data, base) {
  const src = base || {};
  const out = {};
  for (const f of FIELDS) {
    out[f] = data[f] !== undefined ? data[f] : src[f] !== undefined ? src[f] : f === "sort" ? 0 : "";
  }
  if (!out.kind) out.kind = "task";
  if (!out.priority) out.priority = "yellow";
  if (!out.status) out.status = "open";
  if (!out.source) out.source = "manual";
  if (!out.stream) out.stream = "Personal";
  return out;
}

async function listTasks() {
  const data = await callApi({ action: "list" });
  const rows = Array.isArray(data) ? data : data.rows || [];
  return rows.filter((r) => r && r.id != null);
}

async function createTask(data) {
  return callApi({ action: "create", data: fullRow(data) });
}

async function updateTask(id, data) {
  const rows = await listTasks();
  const existing = rows.find((r) => String(r.id) === String(id));
  if (!existing) throw new Error(`Task ${id} not found`);
  return callApi({ action: "update", id: String(id), data: fullRow(data, existing) });
}

async function deleteTask(id) {
  return callApi({ action: "delete", id: String(id) });
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
