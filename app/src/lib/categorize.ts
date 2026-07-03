import type { CategoryRule, EntityId, Transaction } from "../types";

// Sensible starting keyword rules per entity, editable/extendable by the user
// afterwards via the Rules Editor. These are intentionally broad first guesses.
const DEFAULT_RULES: Record<EntityId, [string, string][]> = {
  personal: [
    ["unsw", "Wages"],
    ["salary", "Wages"],
    ["woolworths", "Groceries"],
    ["coles", "Groceries"],
    ["aldi", "Groceries"],
    ["uber eats", "Dining & Takeaway"],
    ["menulog", "Dining & Takeaway"],
    ["cafe", "Dining & Takeaway"],
    ["restaurant", "Dining & Takeaway"],
    ["fuel", "Fuel & Transport"],
    ["bp ", "Fuel & Transport"],
    ["shell", "Fuel & Transport"],
    ["opal", "Fuel & Transport"],
    ["uber", "Fuel & Transport"],
    ["energy", "Utilities"],
    ["agl", "Utilities"],
    ["origin", "Utilities"],
    ["telstra", "Utilities"],
    ["optus", "Utilities"],
    ["internet", "Utilities"],
    ["insurance", "Insurance"],
    ["medicare", "Health"],
    ["pharmacy", "Health"],
    ["chemist", "Health"],
    ["netflix", "Subscriptions"],
    ["spotify", "Subscriptions"],
    ["xero", "Subscriptions"],
    ["adobe", "Subscriptions"],
    ["amazon prime", "Subscriptions"],
    ["disney", "Subscriptions"],
    ["gym", "Subscriptions"],
    ["fee", "Fees & Charges"],
    ["charge", "Fees & Charges"],
    ["dishonour", "Fees & Charges"],
    ["offset", "Home Loan Offset"],
    ["home loan", "Home Loan Offset"],
    ["transfer", "Transfers"],
  ],
  business: [
    ["invoice", "Sales Income"],
    ["stripe", "Sales Income"],
    ["xero", "Software & Subscriptions"],
    ["hubdoc", "Software & Subscriptions"],
    ["adobe", "Software & Subscriptions"],
    ["microsoft", "Software & Subscriptions"],
    ["google workspace", "Software & Subscriptions"],
    ["contractor", "Contractors"],
    ["officeworks", "Office & Supplies"],
    ["qantas", "Travel"],
    ["hotel", "Travel"],
    ["facebook ads", "Marketing"],
    ["google ads", "Marketing"],
    ["ato", "Tax / ATO"],
    ["fee", "Fees & Charges"],
    ["charge", "Fees & Charges"],
    ["insurance", "Insurance"],
    ["transfer", "Transfers"],
  ],
  household: [
    ["salary", "Wages / Income"],
    ["wage", "Wages / Income"],
    ["home loan", "Home Loan Repayment"],
    ["mortgage", "Home Loan Repayment"],
    ["woolworths", "Groceries"],
    ["coles", "Groceries"],
    ["energy", "Utilities"],
    ["agl", "Utilities"],
    ["origin", "Utilities"],
    ["telstra", "Utilities"],
    ["insurance", "Insurance"],
    ["fuel", "Fuel & Transport"],
    ["netflix", "Subscriptions"],
    ["spotify", "Subscriptions"],
    ["fee", "Fees & Charges"],
    ["charge", "Fees & Charges"],
    ["transfer", "Transfers"],
  ],
  charity: [
    ["donation", "Donations"],
    ["donat", "Donations"],
    ["grant", "Grants"],
    ["fundrais", "Fundraising Income"],
    ["xero", "Admin Expenses"],
    ["hubdoc", "Admin Expenses"],
    ["insurance", "Admin Expenses"],
    ["fee", "Fees & Charges"],
    ["charge", "Fees & Charges"],
    ["transfer", "Transfers"],
  ],
};

export function defaultRulesFor(entity: EntityId): CategoryRule[] {
  return DEFAULT_RULES[entity].map(([match, category], i) => ({
    id: `default-${entity}-${i}`,
    entity,
    match,
    category,
  }));
}

const FEE_KEYWORDS = [
  "fee",
  "charge",
  "dishonour",
  "account keeping",
  "package fee",
  "monthly fee",
  "od fee",
  "late fee",
  "annual fee",
];

export function isFeeDescription(description: string): boolean {
  const d = description.toLowerCase();
  return FEE_KEYWORDS.some((k) => d.includes(k));
}

export function categorize(
  description: string,
  amount: number,
  rules: CategoryRule[]
): string {
  const d = description.toLowerCase();
  for (const r of rules) {
    if (d.includes(r.match.toLowerCase())) return r.category;
  }
  return amount >= 0 ? "Other" : "Other";
}

export function applyCategorization(
  txns: Transaction[],
  rules: CategoryRule[]
): Transaction[] {
  return txns.map((t) => ({
    ...t,
    category: categorize(t.description, t.amount, rules),
    isFee: isFeeDescription(t.description),
  }));
}
