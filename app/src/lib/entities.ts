import type { EntityConfig, EntityId } from "../types";

export const ENTITIES: EntityConfig[] = [
  {
    id: "personal",
    label: "Personal",
    bank: "Commonwealth Bank",
    bookkeeping: "Xero + Hubdoc",
    categories: [
      "Wages",
      "Groceries",
      "Dining & Takeaway",
      "Fuel & Transport",
      "Utilities",
      "Insurance",
      "Health",
      "Subscriptions",
      "Fees & Charges",
      "Home Loan Offset",
      "Shopping",
      "Entertainment",
      "Transfers",
      "Other",
    ],
  },
  {
    id: "business",
    label: "Business",
    bank: "Commonwealth Bank",
    bookkeeping: "Xero + Hubdoc",
    categories: [
      "Sales Income",
      "Software & Subscriptions",
      "Contractors",
      "Office & Supplies",
      "Travel",
      "Marketing",
      "Fees & Charges",
      "Tax / ATO",
      "Insurance",
      "Transfers",
      "Other",
    ],
  },
  {
    id: "household",
    label: "Household (ANZ)",
    bank: "ANZ",
    bookkeeping: "—",
    categories: [
      "Wages / Income",
      "Home Loan Repayment",
      "Groceries",
      "Utilities",
      "Insurance",
      "Fuel & Transport",
      "Fees & Charges",
      "Subscriptions",
      "Transfers",
      "Other",
    ],
  },
  {
    id: "charity",
    label: "SCN2A Charity",
    bank: "ANZ",
    bookkeeping: "Xero + Hubdoc",
    categories: [
      "Donations",
      "Grants",
      "Fundraising Income",
      "Program Expenses",
      "Admin Expenses",
      "Fees & Charges",
      "Subscriptions",
      "Transfers",
      "Other",
    ],
  },
];

export function entityConfig(id: EntityId): EntityConfig {
  const e = ENTITIES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown entity ${id}`);
  return e;
}
