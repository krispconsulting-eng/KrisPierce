const store = require("../../lib/store");

// Unauthenticated liveness probe: confirms the app and its database link
// work, without exposing any task data.
export default async function handler(req, res) {
  try {
    const rows = await store.listTasks();
    return res.status(200).json({ ok: true, tasks: rows.length });
  } catch (err) {
    return res.status(502).json({ ok: false, error: String((err && err.message) || err) });
  }
}
