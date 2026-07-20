import { streamColor, niceDate, dueClass } from "../lib/ui";

export default function TaskRow({ task, onToggle, onDelete }) {
  const done = task.status === "done";
  return (
    <div className={"task" + (done ? " done" : "")}>
      <button
        className={"tick" + (done ? " on" : "")}
        onClick={() => onToggle(task)}
        aria-label={done ? "Mark not done" : "Mark done"}
        style={{ cursor: "pointer" }}
      >
        {done ? "✓" : ""}
      </button>
      <div className="t-main">
        <div className="t-title">{task.title}</div>
        {task.notes ? <div className="t-notes">{task.notes}</div> : null}
        <div className="t-meta">
          <span className="chip" style={{ background: streamColor(task.stream) }}>
            {task.stream}
          </span>
          {task.project ? <span className="chip outline">{task.project}</span> : null}
          {task.kind === "event" ? <span className="chip outline">📅 meeting</span> : null}
          {task.due ? (
            <span className={"due " + dueClass(task.due)}>
              {dueClass(task.due) === "overdue" ? "⚠ " : ""}
              {niceDate(task.due)}
            </span>
          ) : null}
        </div>
      </div>
      <button className="t-del" onClick={() => onDelete(task)} aria-label="Delete">
        ✕
      </button>
    </div>
  );
}
