import { useMemo, useState } from "react";
import type { LoanScenario } from "../types";
import { compareScenarios } from "../lib/debtPayoff";
import { formatCurrency } from "../lib/format";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import KpiCard from "./KpiCard";

const STORAGE_KEY = "kp.loanScenario";

function loadInitial(): LoanScenario {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      /* fall through */
    }
  }
  return {
    balance: 550000,
    annualRatePct: 6.0,
    minMonthlyRepayment: 3300,
    offsetBalance: 40000,
    extraMonthlySweep: 500,
  };
}

export default function DebtPayoffCalculator() {
  const [scenario, setScenario] = useState<LoanScenario>(loadInitial);

  function update<K extends keyof LoanScenario>(key: K, value: number) {
    const next = { ...scenario, [key]: value };
    setScenario(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const comparison = useMemo(() => {
    const base = { ...scenario, extraMonthlySweep: 0 };
    return compareScenarios(base, scenario);
  }, [scenario]);

  const chartData = useMemo(() => {
    const len = Math.max(comparison.base.schedule.length, comparison.withExtra.schedule.length);
    const data = [];
    for (let i = 0; i < len; i += 3) {
      data.push({
        month: i,
        "Minimum repayments only": comparison.base.schedule[i]?.balance ?? 0,
        "With your extra sweep": comparison.withExtra.schedule[i]?.balance ?? 0,
      });
    }
    return data;
  }, [comparison]);

  const fields: { key: keyof LoanScenario; label: string; step?: number }[] = [
    { key: "balance", label: "Current loan balance ($)" },
    { key: "annualRatePct", label: "Interest rate (% p.a.)", step: 0.05 },
    { key: "minMonthlyRepayment", label: "Minimum monthly repayment ($)" },
    { key: "offsetBalance", label: "Current offset balance ($)" },
    { key: "extraMonthlySweep", label: "Extra monthly sweep into offset ($)" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Home loan payoff scenario (ANZ, 100% offset)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fields.map((f) => (
            <label key={f.key} className="text-sm">
              <span className="block text-slate-600 dark:text-slate-400 mb-1">{f.label}</span>
              <input
                type="number"
                step={f.step ?? 1}
                value={scenario[f.key]}
                onChange={(e) => update(f.key, Number(e.target.value))}
                className="w-full border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-950"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <KpiCard
          label="Payoff time (minimum only)"
          value={`${(comparison.base.months / 12).toFixed(1)} yrs`}
        />
        <KpiCard
          label="Payoff time (with your sweep)"
          value={`${(comparison.withExtra.months / 12).toFixed(1)} yrs`}
          tone="good"
        />
        <KpiCard
          label="Time saved"
          value={`${(comparison.monthsSaved / 12).toFixed(1)} yrs`}
          tone="good"
        />
        <KpiCard
          label="Interest saved"
          value={formatCurrency(comparison.interestSaved)}
          tone="good"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Projected loan balance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" label={{ value: "Months", position: "insideBottom", offset: -5 }} fontSize={12} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} fontSize={12} width={90} />
            <Tooltip formatter={(v) => formatCurrency(Number(v))} />
            <Legend />
            <Line type="monotone" dataKey="Minimum repayments only" stroke="#94A3B8" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="With your extra sweep" stroke="#22C55E" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
