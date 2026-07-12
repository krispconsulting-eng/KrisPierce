import Layout from "../components/Layout";
import { brisbaneToday, niceDate } from "../lib/ui";

const { requireAuthSSR } = require("../lib/auth");
const store = require("../lib/store");

export async function getServerSideProps(ctx) {
  const gate = requireAuthSSR(ctx);
  if (gate) return gate;
  let rows = [];
  try {
    rows = await store.listTasks();
  } catch {
    rows = [];
  }
  return { props: { rows } };
}

export default function Today({ rows }) {
  const today = brisbaneToday();
  const open = rows.filter((r) => r.status !== "done" && r.kind !== "project");

  const meetings = open
    .filter((r) => r.kind === "event" && r.due === today)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const upcomingMeetings = open
    .filter((r) => r.kind === "event" && r.due > today)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 4);

  const reds = open.filter(
    (r) => r.kind === "task" && (r.priority === "red" || (r.due && r.due < today))
  );
  const yellows = open.filter(
    (r) => r.kind === "task" && r.priority === "yellow" && !reds.includes(r)
  );
  const greens = open
    .filter((r) => r.kind === "task" && r.priority === "green" && !reds.includes(r))
    .slice(0, 4);

  const dateLine = new Date().toLocaleDateString("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      <div className="stickywrap">
        <div className="stickynote">
          <h1>Today&apos;s note 📌</h1>
          <div className="subdate">{dateLine}</div>

          <div className="s-section">
            <h3 style={{ color: "var(--red)" }}>
              <span className="dot red" /> Do these first
            </h3>
            {reds.length === 0 ? <div className="s-empty">Nothing urgent. Enjoy it.</div> : null}
            {reds.map((t) => (
              <div className="s-item" key={t.id}>
                <span>🔴</span>
                <span>
                  {t.title}
                  {t.due && t.due < today ? <strong style={{ color: "var(--red)" }}> (overdue)</strong> : null}
                </span>
              </div>
            ))}
          </div>

          <div className="s-section">
            <h3 style={{ color: "var(--yellow)" }}>
              <span className="dot yellow" /> This week
            </h3>
            {yellows.length === 0 ? <div className="s-empty">All caught up.</div> : null}
            {yellows.map((t) => (
              <div className="s-item" key={t.id}>
                <span>🟡</span>
                <span>
                  {t.title}
                  {t.due ? <span style={{ color: "var(--brand-500)" }}> · {niceDate(t.due)}</span> : null}
                </span>
              </div>
            ))}
          </div>

          {greens.length > 0 ? (
            <div className="s-section">
              <h3 style={{ color: "var(--green)" }}>
                <span className="dot green" /> When there&apos;s a quiet moment
              </h3>
              {greens.map((t) => (
                <div className="s-item" key={t.id}>
                  <span>🟢</span>
                  <span>{t.title}</span>
                </div>
              ))}
            </div>
          ) : null}

          <div className="s-section" style={{ marginBottom: 0 }}>
            <h3 style={{ color: "var(--brand-600)" }}>📅 Meetings</h3>
            {meetings.length === 0 ? <div className="s-empty">No meetings logged for today.</div> : null}
            {meetings.map((m) => (
              <div className="s-item" key={m.id}>
                <span className="when">today</span>
                <span>{m.title}</span>
              </div>
            ))}
            {upcomingMeetings.map((m) => (
              <div className="s-item" key={m.id} style={{ opacity: 0.75 }}>
                <span className="when">{niceDate(m.due)}</span>
                <span>{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
