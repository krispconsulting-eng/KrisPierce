import { useMemo, useState } from "react";
import type { Transaction } from "../types";
import { formatCurrency, monthKey, monthLabel } from "../lib/format";
import KpiCard from "./KpiCard";
import CategoryChart from "./CategoryChart";

interface Props {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: Props) {
  const months = useMemo(() => {
    const set = new Set(transactions.map((t) => monthKey(t.date)));
    return Array.from(set).sort().reverse();
  }, [transactions]);

  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const filtered = useMemo(() => {
    if (selectedMonth === "all") return transactions;
    return transactions.filter((t) => monthKey(t.date) === selectedMonth);
  }, [transactions, selectedMonth]);

  const income = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = filtered
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const net = income - expenses;
  const fees = filtered.filter((t) => t.isFee).reduce((s, t) => s + Math.abs(t.amount), 0);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of filtered) {
      if (t.amount >= 0) continue;
      map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount));
    }
    return Array.from(map.entries())
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm text-slate-600 dark:text-slate-400">Period:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-900"
        >
          <option value="all">All time</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </select>
        {!transactions.length && (
          <span className="text-sm text-slate-500">No transactions imported yet.</span>
        )}
      </div>

      <div className="flex gap-4 flex-wrap">
        <KpiCard label="Income" value={formatCurrency(income)} tone="good" />
        <KpiCard label="Expenses" value={formatCurrency(expenses)} tone="bad" />
        <KpiCard
          label="Net Savings"
          value={formatCurrency(net)}
          tone={net >= 0 ? "good" : "bad"}
        />
        <KpiCard label="Fees Paid" value={formatCurrency(fees)} tone={fees > 0 ? "bad" : "neutral"} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Spending by category
        </h3>
        <CategoryChart data={byCategory} />
      </div>
    </div>
  );
}
