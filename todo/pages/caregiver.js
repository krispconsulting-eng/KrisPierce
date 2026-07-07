import { useState } from "react";
import Layout from "../components/Layout";
import TaskRow from "../components/TaskRow";

const { requireAuthSSR } = require("../lib/auth");
const store = require("../lib/store");

const PROJECT = "The Caregiver Wellbeing Journey";

export async function getServerSideProps(ctx) {
  const gate = requireAuthSSR(ctx);
  if (gate) return gate;
  let rows = [];
  try {
    rows = await store.listTasks();
  } catch {
    rows = [];
  }
  return { props: { rows: rows.filter((r) => r.stream === "Caregiver") } };
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

export default function Caregiver({ rows: initialRows }) {
  const [rows, setRows] = useState(initialRows);
  const checklist = rows.filter((r) => r.kind === "task");
  const doneCount = checklist.filter((t) => t.status === "done").length;

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

  return (
    <Layout>
      <div className="cg-hero">
        <div className="badge-live">
          <span className="pulse" /> Site live
        </div>
        <h1>🌿 The Caregiver Wellbeing Journey</h1>
        <p>
          An 8-week, self-directed wellbeing course for family caregivers of people with rare
          diseases. The assessment app, gamified plan, marketing site, forms and automations are
          all built — the course is one 30-second Notion click away from fully operational.
        </p>
        <div className="cg-links">
          <a href="https://krispconsulting-eng.github.io/KrisPierce/" target="_blank" rel="noreferrer">
            🌐 Marketing site
          </a>
          <a href="https://krispconsulting-eng.github.io/KrisPierce/app/" target="_blank" rel="noreferrer">
            🧭 Wellbeing Journey app
          </a>
          <a href="https://scn2a-krispierce.app.n8n.cloud" target="_blank" rel="noreferrer">
            ⚙️ n8n automations
          </a>
        </div>
      </div>

      <div className="cg-grid">
        <div className="card">
          <h2>
            🚀 Activation checklist{" "}
            <span className="count">
              {doneCount}/{checklist.length}
            </span>
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--brand-500)", marginTop: 0 }}>
            In order. The first one unblocks everything else.
          </p>
          {checklist
            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
            .map((t) => (
              <TaskRow key={t.id} task={t} onToggle={toggle} onDelete={remove} />
            ))}
        </div>

        <div>
          <div className="card" style={{ marginBottom: 18 }}>
            <h2>💰 The model</h2>
            <div className="price-row">
              <div className="price">
                <div className="amount">$97</div>
                <div className="label">Self-pay caregiver</div>
              </div>
              <div className="price hero">
                <div className="amount">$200</div>
                <div className="label">Sponsored seat</div>
              </div>
            </div>
            <div className="stat-note">
              Sponsorship is the engine: the spread between the $200 seat and delivery cost funds
              scholarship-pool places, upkeep, and margin. Tiers: Supporter (1–9 seats) · Champion
              (10+, impact report) · Founding Partner (25+/yr, co-brand).
            </div>
          </div>

          <div className="card">
            <h2>✅ What&apos;s already built</h2>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "var(--brand-600)", lineHeight: 1.8 }}>
              <li>64-question assessment across 8 wellbeing dimensions, results in words not scores</li>
              <li>8-week gamified plan: 192 activities, points, 11 badges, week-8 look-back</li>
              <li>Free/paid gate: report ends the free part; $97 self-pay or sponsored application</li>
              <li>Consent-first CRM bridge into Notion (email optional, nothing leaves device by default)</li>
              <li>Marketing site + waitlist, sponsor, and scholarship forms — deployed on GitHub Pages</li>
              <li>4 n8n workflows: form intake, app events, weekly emails, sponsor impact reports</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
