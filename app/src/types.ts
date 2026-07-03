export type EntityId = "personal" | "business" | "household" | "charity";

export interface EntityConfig {
  id: EntityId;
  label: string;
  bank: string;
  bookkeeping: string;
  categories: string[];
}

export interface Transaction {
  id: string;
  entity: EntityId;
  date: string; // ISO yyyy-mm-dd
  description: string;
  amount: number; // negative = money out, positive = money in
  balance?: number;
  category: string;
  isFee: boolean;
  source: string; // filename / import batch label
}

export interface CategoryRule {
  id: string;
  entity: EntityId;
  match: string; // lowercase substring to match against description
  category: string;
}

export interface LoanScenario {
  balance: number;
  annualRatePct: number;
  minMonthlyRepayment: number;
  offsetBalance: number;
  extraMonthlySweep: number;
}

export interface SubscriptionGroup {
  key: string;
  description: string;
  amounts: number[];
  lastAmount: number;
  firstAmount: number;
  occurrences: { date: string; amount: number }[];
  avgIntervalDays: number;
  annualCost: number;
  priceIncreased: boolean;
}
