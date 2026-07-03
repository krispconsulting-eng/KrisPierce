interface Props {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "bad";
  sub?: string;
}

const toneClasses: Record<string, string> = {
  neutral: "border-l-slate-400",
  good: "border-l-emerald-500",
  bad: "border-l-red-500",
};

export default function KpiCard({ label, value, tone = "neutral", sub }: Props) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 border-l-4 ${toneClasses[tone]} p-4 min-w-[220px] flex-1`}
    >
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="text-3xl font-semibold mt-1 text-slate-900 dark:text-slate-50">
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}
