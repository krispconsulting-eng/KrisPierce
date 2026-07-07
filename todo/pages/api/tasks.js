const { isAuthed } = require("../../lib/auth");
const store = require("../../lib/store");

export default async function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: "unauthorised" });

  try {
    if (req.method === "GET") {
      const rows = await store.listTasks();
      return res.status(200).json({ rows });
    }
    if (req.method === "POST") {
      const { op, id, data } = req.body || {};
      if (op === "create") {
        const created = await store.createTask(data || {});
        return res.status(200).json({ ok: true, created });
      }
      if (op === "update") {
        await store.updateTask(id, data || {});
        return res.status(200).json({ ok: true });
      }
      if (op === "delete") {
        await store.deleteTask(id);
        return res.status(200).json({ ok: true });
      }
      return res.status(400).json({ error: "unknown op" });
    }
    return res.status(405).json({ error: "method" });
  } catch (err) {
    return res.status(502).json({ error: String((err && err.message) || err) });
  }
}
