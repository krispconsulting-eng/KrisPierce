import { useMemo } from "react";
import type { Transaction } from "../types";
import { formatCurrency, formatDate } from "../lib/format";
import KpiCard from "./KpiCard";

interface Props {
  transactions: Transaction[];
}

export default function FeeFinder({ transactions }: Props) {
  const fees = useMemo(
    () => transactions.filter((t) => t.isFee).sort((a, b) => b.date.localeCompare(a.date)),
    [transactions]
  );
  const total = fees.reduce((s, t) => s + Math.abs(t.amount), 0);
  const annualisedEstimate = useMemo(() => {
    const months = new Set(fees.map((f) => f.date.slice(0, 7))).size || 1;
    return (total / months) * 12;
  }, [fees, total]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <KpiCard label="Total fees found" value={formatCurrency(total)} tone="bad" />
        <KpiCard
          label="Estimated annual run-rate"
          value={formatCurrency(annualisedEstimate)}
          tone="bad"
          sub="Based on months with data so far"
        />
        <KpiCard label="Fee transactions" value={String(fees.length)} tone="neutral" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Every fee/charge auto-detected — use this for the monthly fee audit checklist
        </h3>
        {fees.length === 0 ? (
          <p className="text-sm text-slate-500">
            No fee-like transactions found yet (keywords: fee, charge, dishonour, account
            keeping...).
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 uppercase">
              <tr>
                <th className="py-1 pr-2">Date</th>
                <th className="py-1 pr-2">Description</th>
                <th className="py-1 pr-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1 pr-2 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="py-1 pr-2">{t.description}</td>
                  <td className="py-1 pr-2 text-right text-red-600">
                    {formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
