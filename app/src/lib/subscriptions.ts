import type { SubscriptionGroup, Transaction } from "../types";

function normalizeDescription(desc: string): string {
  return desc
    .toLowerCase()
    .replace(/\d{4,}/g, "") // strip long reference numbers
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function daysBetween(a: string, b: string): number {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86_400_000;
}

/**
 * Detects likely recurring subscriptions: same normalized merchant name,
 * similar amount, recurring roughly monthly (24-36 day spacing), at least
 * two occurrences.
 */
export function detectSubscriptions(txns: Transaction[]): SubscriptionGroup[] {
  const spend = txns.filter((t) => t.amount < 0);
  const groups = new Map<string, Transaction[]>();

  for (const t of spend) {
    const key = normalizeDescription(t.description);
    if (!key) continue;
    const arr = groups.get(key) ?? [];
    arr.push(t);
    groups.set(key, arr);
  }

  const result: SubscriptionGroup[] = [];
  for (const [key, group] of groups) {
    if (group.length < 2) continue;
    const sorted = [...group].sort((a, b) => a.date.localeCompare(b.date));
    const amounts = sorted.map((t) => Math.abs(t.amount));
    const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const amountsConsistent = amounts.every(
      (a) => Math.abs(a - avgAmount) / avgAmount < 0.15
    );
    if (!amountsConsistent) continue;

    const intervals: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      intervals.push(daysBetween(sorted[i - 1].date, sorted[i].date));
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const looksRecurring = avgInterval >= 20 && avgInterval <= 40;
    if (!looksRecurring) continue;

    const firstAmount = Math.abs(sorted[0].amount);
    const lastAmount = Math.abs(sorted[sorted.length - 1].amount);

    result.push({
      key,
      description: sorted[sorted.length - 1].description,
      amounts,
      firstAmount,
      lastAmount,
      occurrences: sorted.map((t) => ({ date: t.date, amount: Math.abs(t.amount) })),
      avgIntervalDays: Math.round(avgInterval),
      annualCost: Math.round((lastAmount * 365) / avgInterval),
      priceIncreased: lastAmount > firstAmount * 1.02,
    });
  }

  return result.sort((a, b) => b.annualCost - a.annualCost);
}
