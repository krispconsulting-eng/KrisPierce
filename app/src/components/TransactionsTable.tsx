import { useMemo, useState } from "react";
import type { EntityConfig, Transaction } from "../types";
import { formatCurrency, formatDate } from "../lib/format";

interface Props {
  transactions: Transaction[];
  entityConfig: EntityConfig;
  onUpdateCategory: (id: string, category: string) => void;
  onDelete: (ids: string[]) => void;
}

export default function TransactionsTable({
  transactions,
  entityConfig,
  onUpdateCategory,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
      .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, search, categoryFilter]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-3">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search description..."
            className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-950"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-950"
          >
            <option value="all">All categories</option>
            {entityConfig.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs text-slate-500">{filtered.length} transactions</span>
      </div>

      <div className="max-h-[32rem] overflow-auto text-sm">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-500 uppercase sticky top-0 bg-white dark:bg-slate-900">
            <tr>
              <th className="py-1 pr-2">Date</th>
              <th className="py-1 pr-2">Description</th>
              <th className="py-1 pr-2">Category</th>
              <th className="py-1 pr-2 text-right">Amount</th>
              <th className="py-1 pr-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-1 pr-2 whitespace-nowrap">{formatDate(t.date)}</td>
                <td className="py-1 pr-2">
                  {t.description}
                  {t.isFee && (
                    <span className="ml-2 text-[10px] uppercase bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded">
                      fee
                    </span>
                  )}
                </td>
                <td className="py-1 pr-2">
                  <select
                    value={t.category}
                    onChange={(e) => onUpdateCategory(t.id, e.target.value)}
                    className="border border-slate-200 dark:border-slate-700 rounded px-1 py-0.5 text-xs bg-transparent"
                  >
                    {entityConfig.categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td
                  className={`py-1 pr-2 text-right whitespace-nowrap ${
                    t.amount < 0 ? "text-red-600" : "text-emerald-600"
                  }`}
                >
                  {formatCurrency(t.amount)}
                </td>
                <td className="py-1 pr-2 text-right">
                  <button
                    onClick={() => onDelete([t.id])}
                    className="text-xs text-slate-400 hover:text-red-600"
                    title="Delete"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400">
                  No transactions match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
