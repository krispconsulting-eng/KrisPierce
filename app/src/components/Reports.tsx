import { useMemo, useState } from "react";
import type { EntityConfig, Transaction } from "../types";
import { formatCurrency, monthKey, monthLabel } from "../lib/format";
import { detectSubscriptions } from "../lib/subscriptions";

interface Props {
  transactions: Transaction[];
  entityConfig: EntityConfig;
}

export default function Reports({ transactions, entityConfig }: Props) {
  const months = useMemo(() => {
    const set = new Set(transactions.map((t) => monthKey(t.date)));
    return Array.from(set).sort().reverse();
  }, [transactions]);

  const [month, setMonth] = useState<string>(months[0] ?? "");
  const inMonth = transactions.filter((t) => monthKey(t.date) === month);

  const income = inMonth.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = inMonth.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const fees = inMonth.filter((t) => t.isFee).reduce((s, t) => s + Math.abs(t.amount), 0);
  const subs = detectSubscriptions(transactions);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of inMonth) {
      if (t.amount >= 0) continue;
      map.set(t.category, (map.get(t.category) ?? 0) + Math.abs(t.amount));
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [inMonth]);

  const actions: string[] = [];
  if (fees > 0) actions.push(`Query ${inMonth.filter((t) => t.isFee).length} fee transaction(s) totalling ${formatCurrency(fees)} with the bank.`);
  const increased = subs.filter((s) => s.priceIncreased);
  if (increased.length) actions.push(`Review ${increased.length} subscription(s) with a recent price increase.`);
  if (income - expenses < 0) actions.push("Net cash flow was negative this month — review discretionary categories.");
  if (actions.length === 0) actions.push("No flags this month — keep the current settings.");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 no-print">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-900"
        >
          {months.length === 0 && <option value="">No data</option>}
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </select>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white text-sm font-medium px-3 py-1.5 rounded"
        >
          Print / Save as PDF
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{entityConfig.label} — Monthly Report</h2>
          <p className="text-sm text-slate-500">{month ? monthLabel(month) : "No data yet"}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-slate-500">Income</div>
            <div className="text-lg font-semibold text-emerald-600">{formatCurrency(income)}</div>
          </div>
          <div>
            <div className="text-slate-500">Expenses</div>
            <div className="text-lg font-semibold text-red-600">{formatCurrency(expenses)}</div>
          </div>
          <div>
            <div className="text-slate-500">Net</div>
            <div className="text-lg font-semibold">{formatCurrency(income - expenses)}</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Expenses by category
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {byCategory.map(([cat, total]) => (
                <tr key={cat} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1">{cat}</td>
                  <td className="py-1 text-right">{formatCurrency(total)}</td>
                </tr>
              ))}
              {byCategory.length === 0 && (
                <tr>
                  <td className="py-2 text-slate-400">No expenses this month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Actions for next month
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
