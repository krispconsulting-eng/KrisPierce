import { useMemo } from "react";
import type { Transaction } from "../types";
import { detectSubscriptions } from "../lib/subscriptions";
import { formatCurrency, formatDate } from "../lib/format";
import KpiCard from "./KpiCard";

interface Props {
  transactions: Transaction[];
}

export default function Subscriptions({ transactions }: Props) {
  const subs = useMemo(() => detectSubscriptions(transactions), [transactions]);
  const annualTotal = subs.reduce((s, g) => s + g.annualCost, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <KpiCard label="Recurring subscriptions found" value={String(subs.length)} />
        <KpiCard
          label="Estimated annual cost"
          value={formatCurrency(annualTotal)}
          tone={annualTotal > 0 ? "bad" : "neutral"}
        />
        <KpiCard
          label="Price increases detected"
          value={String(subs.filter((s) => s.priceIncreased).length)}
          tone={subs.some((s) => s.priceIncreased) ? "bad" : "good"}
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">
          Detected recurring charges — review each: Keep / Cancel / Downgrade / Move to business
        </h3>
        {subs.length === 0 ? (
          <p className="text-sm text-slate-500">
            No recurring charges detected yet. Needs at least 2 similarly-priced charges from the
            same merchant roughly a month apart.
          </p>
        ) : (
          <div className="space-y-2">
            {subs.map((g) => (
              <div
                key={g.key}
                className="border border-slate-100 dark:border-slate-800 rounded p-3 flex flex-wrap justify-between gap-2"
              >
                <div>
                  <div className="font-medium">{g.description}</div>
                  <div className="text-xs text-slate-500">
                    {g.occurrences.length} charges, ~every {g.avgIntervalDays} days · last:{" "}
                    {formatDate(g.occurrences[g.occurrences.length - 1].date)}
                    {g.priceIncreased && (
                      <span className="ml-2 text-amber-600 font-medium">
                        price increased ({formatCurrency(g.firstAmount)} → {formatCurrency(g.lastAmount)})
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(g.lastAmount)}/charge</div>
                  <div className="text-xs text-slate-500">
                    ≈ {formatCurrency(g.annualCost)}/yr
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
