import { useState } from "react";
import Layout from "../components/Layout";
import TaskRow from "../components/TaskRow";
import { STREAMS, streamColor, PRIORITY_LABELS, brisbaneToday } from "../lib/ui";

const { requireAuthSSR } = require("../lib/auth");
const store = require("../lib/store");

export async function getServerSideProps(ctx) {
  const gate = requireAuthSSR(ctx);
  if (gate) return gate;
  let rows = [];
  let loadError = null;
  try {
    rows = await store.listTasks();
  } catch (err) {
    loadError = String((err && err.message) || err);
  }
  return { props: { initialRows: rows, loadError } };
}

async function api(body) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("save failed");
  return res.json();
}

export default function Dashboard({ initialRows, loadError }) {
  const [rows, setRows] = useState(initialRows);
  const [showDone, setShowDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: "", stream: "Personal", priority: "yellow", due: "" });

  const tasks = rows.filter((r) => r.kind !== "project");
  const projects = rows.filter((r) => r.kind === "project");
  const openTasks = tasks.filter((t) => t.status !== "done");
  const doneTasks = tasks.filter((t) => t.status === "done");

  async function toggle(task) {
    const status = task.status === "done" ? "open" : "done";
    setRows((rs) => rs.map((r) => (r.id === task.id ? { ...r, status } : r)));
    try {
      await api({ op: "update", id: task.id, data: { status } });
    } catch {
      setRows((rs) => rs.map((r) => (r.id === task.id ? { ...r, status: task.status } : r)));
    }
  }

  async function remove(task) {
    if (!confirm(`Delete "${task.title}"?`)) return;
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== task.id));
    try {
      await api({ op: "delete", id: task.id });
    } catch {
      setRows(prev);
    }
  }

  async function add(e) {
    e.preventDefault();
    if (!form.title.trim() || busy) return;
    setBusy(true);
    try {
      await api({
        op: "create",
        data: { ...form, title: form.title.trim(), kind: "task", status: "open", source: "manual" },
      });
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setRows(data.rows || []);
      setForm({ ...form, title: "", due: "" });
    } finally {
      setBusy(false);
    }
  }

  const today = brisbaneToday();
  const focusCount = openTasks.filter(
    (t) => t.priority === "red" || (t.due && t.due <= today)
  ).length;

  return (
    <Layout>
      {loadError ? (
        <div className="card" style={{ borderColor: "var(--red-border)", background: "var(--red-soft)", marginTop: 16 }}>
          Couldn&apos;t reach the task database: {loadError}
        </div>
      ) : null}

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Add something</h2>
        <form className="quickadd" onSubmit={add}>
          <input
            type="text"
            placeholder="What needs doing?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <select value={form.stream} onChange={(e) => setForm({ ...form, stream: e.target.value })}>
            {STREAMS.map((s) => (
              <option key={s.name} value={s.name}>
                {s.emoji} {s.name}
              </option>
            ))}
          </select>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option value="red">🔴 Do now</option>
            <option value="yellow">🟡 This week</option>
            <option value="green">🟢 On track</option>
          </select>
          <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
          <button className="btn blue" disabled={busy}>
            {busy ? "Adding…" : "Add"}
          </button>
        </form>
      </section>

      <div className="board">
        {["red", "yellow", "green"].map((p) => {
          const list = openTasks
            .filter((t) => t.priority === p)
            .sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
          return (
            <div key={p} className={"lane " + p}>
              <h3>
                <span className={"dot " + p} /> {PRIORITY_LABELS[p]} <span style={{ opacity: 0.6 }}>({list.length})</span>
              </h3>
              {list.length === 0 ? <div className="s-empty">Nothing here. Lovely.</div> : null}
              {list.map((t) => (
                <TaskRow key={t.id} task={t} onToggle={toggle} onDelete={remove} />
              ))}
            </div>
          );
        })}
      </div>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20 }}>
          Projects{" "}
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--brand-400)" }}>
            {projects.filter((p) => p.status !== "done").length} active across {" "}
            {new Set(projects.map((p) => p.stream)).size} streams · {focusCount} need attention today
          </span>
        </h2>
        <div className="streams">
          {STREAMS.filter((s) => projects.some((p) => p.stream === s.name)).map((s) => {
            const list = projects
              .filter((p) => p.stream === s.name)
              .sort((a, b) => "red yellow green".indexOf(a.priority) - "red yellow green".indexOf(b.priority));
            return (
              <div key={s.name} className="card stream-card" style={{ borderTopColor: streamColor(s.name) }}>
                <h2>
                  {s.emoji} {s.name} <span className="count">{list.filter((p) => p.status !== "done").length}</span>
                </h2>
                {list.map((p) => (
                  <div key={p.id} className={"proj" + (p.status === "done" ? " done" : "")}>
                    <button
                      className={"tick" + (p.status === "done" ? " on" : "")}
                      onClick={() => toggle(p)}
                      style={{ cursor: "pointer" }}
                      aria-label="Toggle project"
                    >
                      {p.status === "done" ? "✓" : ""}
                    </button>
                    <span className={"dot " + (p.priority || "green")} />
                    <div className="t-main">
                      <div className="t-title">{p.title}</div>
                      {p.notes ? <div className="t-notes">{p.notes}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <button
          className="btn"
          style={{ background: "var(--brand-100)", color: "var(--brand-600)" }}
          onClick={() => setShowDone(!showDone)}
        >
          {showDone ? "Hide" : "Show"} completed ({doneTasks.length})
        </button>
        {showDone
          ? doneTasks.map((t) => <TaskRow key={t.id} task={t} onToggle={toggle} onDelete={remove} />)
          : null}
      </section>
    </Layout>
  );
}
