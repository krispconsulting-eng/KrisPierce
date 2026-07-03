# KrisPierce Financial Tracker

A local-only, no-bank-credentials-required tracker covering four separate
ledgers: **Personal** (CommBank), **Business** (CommBank), **Household**
(ANZ), and **SCN2A Charity** (ANZ). See `../docs/financial-plan.md` for the
full strategy this app supports.

## Run it

```bash
npm install
npm run dev
```

## How it works

- **Import**: upload or paste a CSV export from CommBank/ANZ. Columns are
  detected by content (date/amount/description), not by header name, since
  bank exports vary.
- **Rules**: keyword → category rules per entity, seeded with sensible
  defaults, fully editable. Re-categorising rules retroactively re-tags
  already-imported transactions.
- **Dashboard**: income/expenses/net/fees KPIs and a spend-by-category chart,
  filterable by month.
- **Fee Finder**: auto-flags fee-like transactions for the monthly fee audit.
- **Subscriptions**: detects recurring charges (same merchant, similar
  amount, ~monthly cadence) and flags price increases.
- **Debt Payoff**: offset-account amortisation model — compare minimum
  repayments vs. an extra monthly sweep into the offset.
- **Reports**: printable monthly summary per entity with an auto-generated
  action checklist.

## Data storage

Everything is stored in the browser's `localStorage`, namespaced per entity.
No bank credentials, API keys, or network calls are involved — import/export
a JSON backup from the header bar to move data between devices.
