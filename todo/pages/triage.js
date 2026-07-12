import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { STREAMS, streamColor, brisbaneToday, niceDate } from "../lib/ui";
import {
  BANDS,
  MODE,
  MODEL,
  triage as triageOf,
  nextMonday,
  labelDate,
} from "../lib/triage";

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

const MODEL_CLASS = { haiku: "m-haiku", sonnet: "m-sonnet", opus: "m-opus" };

function TriageCard({ task, t }) {
  return (
    <div className="tri-item">
      <span className="dot" style={{ background: streamColor(task.stream) }} />
      <div className="t-main">
        <div className="t-title">{task.title}</div>
        {task.notes ? <div className="t-notes">{task.notes}</div> : null}
        <div className="t-meta">
          <span className="chip" style={{ background: streamColor(task.stream) }}>
            {task.stream}
          </span>
          <span className={"chip mode " + t.mode}>{MODE[t.mode].label}</span>
          <span className={"chip model " + MODEL_CLASS[t.model]}>{MODEL[t.model].label}</span>
          {t.fable ? <span className="chip fable">✦ Fable-able</span> : null}
          {task.due ? (
            <span className={"due" + (task.due <= brisbaneToday() ? " overdue" : "")}>
              {task.due <= brisbaneToday() ? "⚠ " : ""}
              {niceDate(task.due)}
            </span>
          ) : null}
          <span className="est">{t.est}</span>
        </div>
      </div>
    </div>
  );
}

export default function Triage({ initialRows, loadError }) {
  const [streamFilter, setStreamFilter] = useState("All");
  const today = brisbaneToday();
  const monday = nextMonday(today);

  const openTasks = useMemo(
    () => initialRows.filter((r) => r.kind !== "project" && r.kind !== "event" && r.status !== "done"),
    [initialRows]
  );

  const tagged = useMemo(
    () =>
      openTasks
        .map((task) => ({ task, t: triageOf(task, today) }))
        .filter((x) => streamFilter === "All" || x.task.stream === streamFilter),
    [openTasks, streamFilter, today]
  );

  const bands = { urgent: [], intermediate: [], soon: [] };
  for (const x of tagged) (bands[x.t.band] || bands.soon).push(x);
  for (const k of Object.keys(bands)) {
    bands[k].sort((a, b) => (a.task.due || "9999").localeCompare(b.task.due || "9999"));
  }

  // Monday-morning Fable batch: Fable-able tasks, quickest first.
  const fableBatch = tagged
    .filter((x) => x.t.fable)
    .sort((a, b) => (a.t.mode === "fast" ? -1 : 1) - (b.t.mode === "fast" ? -1 : 1));

  const streamsPresent = STREAMS.filter((s) => openTasks.some((t) => t.stream === s.name));

  return (
    <Layout>
      <section className="tri-head card" style={{ marginTop: 16 }}>
        <div>
          <h1>Weekly triage</h1>
          <p className="tri-sub">
            Every open task, banded by urgency with the Claude mode &amp; model best suited to it.
            Refreshed automatically each <strong>Friday 5pm</strong> · Brisbane.
          </p>
        </div>
        <div className="tri-counts">
          {Object.values(BANDS).map((b) => (
            <div key={b.key} className="tri-count" style={{ color: b.color }}>
              <span className="n">{bands[b.key].length}</span>
              <span className="l">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {loadError ? (
        <div className="card" style={{ borderColor: "var(--red-border)", background: "var(--red-soft)", marginTop: 16 }}>
          Couldn&apos;t reach the task database: {loadError}
        </div>
      ) : null}

      <div className="tri-filter">
        <button className={"pill" + (streamFilter === "All" ? " on" : "")} onClick={() => setStreamFilter("All")}>
          All streams
        </button>
        {streamsPresent.map((s) => (
          <button
            key={s.name}
            className={"pill" + (streamFilter === s.name ? " on" : "")}
            onClick={() => setStreamFilter(s.name)}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      {Object.values(BANDS).map((b) => (
        <section key={b.key} className={"tri-band " + b.key}>
          <h2>
            <span className="dot" style={{ background: b.color }} />
            {b.label}
            <span className="band-blurb">{b.blurb}</span>
            <span className="band-n">{bands[b.key].length}</span>
          </h2>
          {bands[b.key].length === 0 ? (
            <div className="s-empty">Nothing here. Lovely.</div>
          ) : (
            bands[b.key].map((x) => <TriageCard key={x.task.id} task={x.task} t={x.t} />)
          )}
        </section>
      ))}

      <section className="fable-batch">
        <div className="fable-inner">
          <div className="fable-title">
            <span className="fable-mark">✦</span>
            <div>
              <h2>Fable morning batch</h2>
              <p>
                Quick, well-scoped wins you can knock out on <strong>{labelDate(monday)}</strong> before 3pm —
                low-stakes, fast, Fable&nbsp;5 handles them.
              </p>
            </div>
          </div>
          {fableBatch.length === 0 ? (
            <div className="s-empty" style={{ color: "rgba(255,255,255,0.7)" }}>
              No Fable-able tasks queued. Enjoy the quiet start.
            </div>
          ) : (
            <ol className="fable-list">
              {fableBatch.map((x) => (
                <li key={x.task.id}>
                  <span className="fb-title">{x.task.title}</span>
                  <span className="fb-stream">{x.task.stream}</span>
                  <span className="fb-est">{x.t.est}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="tri-legend card">
        <h3>How to read this</h3>
        <div className="legend-grid">
          <div>
            <h4>Mode</h4>
            <p><strong>Fast</strong> — {MODE.fast.blurb}</p>
            <p><strong>Slow</strong> — {MODE.slow.blurb}</p>
          </div>
          <div>
            <h4>Model</h4>
            <p><strong>Haiku / Fable 5</strong> — {MODEL.haiku.blurb}</p>
            <p><strong>Sonnet</strong> — {MODEL.sonnet.blurb}</p>
            <p><strong>Opus</strong> — {MODEL.opus.blurb}</p>
          </div>
          <div>
            <h4>✦ Fable-able</h4>
            <p>Fast + routine + low-stakes. Safe to batch through Fable 5 while you keep the deep work for yourself.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
