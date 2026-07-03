import type { LoanScenario } from "../types";

export interface PayoffPoint {
  month: number;
  balance: number;
  offset: number;
  interestPaidCumulative: number;
}

export interface PayoffResult {
  months: number;
  totalInterest: number;
  schedule: PayoffPoint[];
}

/**
 * Simple offset-account amortisation model: interest each month is charged
 * on (loan balance - offset balance), minimum repayment reduces the loan
 * balance by (repayment - interest), and the offset grows each month by the
 * extra sweep amount (capped so it never exceeds the remaining loan balance,
 * since offset above the loan balance earns no further interest benefit).
 */
export function simulatePayoff(scenario: LoanScenario, maxMonths = 600): PayoffResult {
  const monthlyRate = scenario.annualRatePct / 100 / 12;
  let balance = scenario.balance;
  let offset = scenario.offsetBalance;
  let totalInterest = 0;
  const schedule: PayoffPoint[] = [];

  for (let month = 1; month <= maxMonths; month++) {
    const effectiveBalance = Math.max(balance - offset, 0);
    const interest = effectiveBalance * monthlyRate;
    totalInterest += interest;

    const principalPortion = scenario.minMonthlyRepayment - interest;
    balance = Math.max(balance - principalPortion, 0);

    offset = Math.min(offset + scenario.extraMonthlySweep, balance);

    schedule.push({
      month,
      balance: Math.round(balance),
      offset: Math.round(offset),
      interestPaidCumulative: Math.round(totalInterest),
    });

    if (balance <= 0) {
      return { months: month, totalInterest: Math.round(totalInterest), schedule };
    }
  }

  return { months: maxMonths, totalInterest: Math.round(totalInterest), schedule };
}

export function compareScenarios(base: LoanScenario, withExtra: LoanScenario) {
  const a = simulatePayoff(base);
  const b = simulatePayoff(withExtra);
  return {
    base: a,
    withExtra: b,
    monthsSaved: a.months - b.months,
    interestSaved: a.totalInterest - b.totalInterest,
  };
}
