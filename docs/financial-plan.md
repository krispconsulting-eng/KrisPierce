# Financial Tracking & Optimisation Plan

Status: living document. Update as accounts/tools change. This is general
guidance based on what you've described, not licensed financial advice —
run the account-structure and loan decisions past your accountant/broker
before acting, especially anything with tax or lending-contract implications.

## 1. Entities (kept fully separate)

| Entity | Bank | Bookkeeping | Notes |
|---|---|---|---|
| Personal | Commonwealth Bank | Xero + Hubdoc | Your wage (UNSW) currently lands in the home loan **offset** account |
| Business | Commonwealth Bank | Xero + Hubdoc | Currently same bank as personal — see §2 |
| Household | ANZ | — | Everyday Account + her home loan, both ANZ |
| Charity (SCN2A) | ANZ | Xero + Hubdoc | Fully separate process, §5 |

The app treats these as **separate ledgers** (separate data namespaces, separate
imports, separate reports). Nothing is ever merged across entities except the
optional combined household view (personal + household).

## 2. Should you separate the CommBank personal/business accounts?

**Yes — separate them if they're currently co-mingled.** You said you already
have a spare account you could repurpose, so this is low-effort:

- **Legal/tax reason**: co-mingled personal and business transactions make
  Xero reconciliation error-prone and make it harder to substantiate expense
  claims at tax time (ATO expects a clean audit trail for a business/sole
  trader or company account).
- **Practical reason**: Hubdoc/Xero bank rules and auto-categorisation work
  far better against a single-purpose account — one stray personal coffee in
  the business feed breaks batch rules.
- **Fee reason**: check whether the business account has monthly account fees
  or transaction fees that don't apply to a personal account (or vice versa) —
  CommBank business transaction accounts commonly carry a monthly fee
  ($10–$20/mo range) that a personal Smart Access account doesn't. If the spare
  account is a personal-fee-free account, don't just move business banking
  onto it — check whether that breaches the account's terms of use for
  business activity first.

**Action**: move all business income/expenses to the dedicated account this
month, update Xero bank feed rules, and stop new business transactions from
touching the personal account. Keep a 1-month overlap for outstanding
cheques/direct debits before fully cutting over.

## 3. Fee audit checklist (run monthly, see §6 for automation)

For each account (CommBank personal, CommBank business, ANZ Everyday, ANZ home
loans ×2, ANZ charity):

- [ ] Monthly account-keeping fee — is it waived by a minimum deposit/balance
      you're already meeting? If not, ask the bank to waive it or switch to a
      fee-free equivalent product.
- [ ] Overdrawn/dishonour fees in the last 12 months — usually avoidable by
      linking to the offset for auto-buffer.
- [ ] International/FX fees, card replacement fees, paper statement fees.
- [ ] Loan fees: annual package fee (e.g. CommBank Wealth Package / ANZ
      Breakfree) — confirm the bundled discounts (offset, fee waivers, rate
      discount) are still worth the annual fee versus a basic no-fee loan at
      the current balance.
- [ ] Business account transaction fees (per-transaction or tiered) — compare
      volume against a flat-fee business plan.
- [ ] Xero subscription plan — confirm you're not paying for a tier (e.g.
      multi-currency, projects, expenses) you don't use, across 3 orgs
      (personal/business/charity). Xero has a **Not-For-Profit discount** —
      confirm the charity org is on it.
- [ ] Hubdoc — included free with most Xero plans; confirm you're not paying
      for it separately.

The app's **Fee Finder** view auto-flags transactions matching fee keywords
(`fee`, `charge`, `dishonour`, `package fee`, `account keeping`) per entity so
this checklist takes minutes, not hours.

## 4. Paying off the home loan faster (ANZ, her loan; offset holds your wage)

Core lever: **maximise offset balance, minimise loan term extension risk.**

1. **Confirm 100% offset**, not a redraw facility — offset directly reduces
   interest daily; redraw doesn't unless drawn down.
2. **Route all spare cash through the offset**, not into a separate savings
   account earning taxable interest — offset "interest saved" is effectively
   tax-free, savings interest is taxed at your marginal rate.
3. **Keep everyday spending on a card with a ~55 day interest-free period**
   and pay it off in full monthly from the offset — this keeps money in the
   offset longer before it's spent, reducing average daily balance faster.
4. **Round-up / sweep rule**: at each pay cycle, sweep any balance above a
   defined buffer (e.g. $3–5k) from the Everyday Account into the offset.
5. **Extra repayments vs offset**: if the loan is genuinely 100% offset,
   putting extra cash in the offset is equivalent to extra repayment but stays
   liquid — prefer the offset over locking extra repayments into the loan
   unless there's a rate/behavioural reason not to.
6. **Model it**: the app's **Debt Payoff Calculator** takes loan balance, rate,
   minimum repayment, and current/extra offset balance and shows: revised
   payoff date, total interest saved, and effect of a proposed extra monthly
   sweep amount.
7. **Annual check-in**: refinance/repricing check — ring the bank (or use a
   broker) yearly to ask for a rate match against current new-customer rates.

## 5. Charity (SCN2A) — separate process

Kept **entirely separate** from personal/business:

- Own ledger in the app (`entity: charity`), own ANZ account, own Xero org,
  own Hubdoc inbox.
- **Never** mix charity funds with personal/business cash flow modelling —
  charity money is held in trust for its purpose, not part of "your" net
  worth or savings rate.
- Monthly reconciliation: import ANZ CSV → match against Xero → any unmatched
  item gets flagged in the app's **Unreconciled** view for that entity.
- Reporting cadence: monthly financial summary (income, expenses, balance)
  suitable for board/committee reporting — the app's Reports tab has a
  charity-specific template (income by source: donations/grants/fundraising;
  expenses by program vs admin, matching typical ACNC reporting categories).
- Compliance reminder: if SCN2A is ACNC-registered, note the Annual
  Information Statement due date and keep a standing checklist item for it
  (not automated by this app — a calendar reminder is more reliable).

## 6. Subscriptions & regular spending audit

The app's **Subscriptions** view detects recurring transactions automatically
(same/similar description + similar amount recurring on a ~monthly cycle) per
entity, and flags:

- **Overlaps**: e.g. two cloud storage subscriptions, both a personal and
  business Xero/Adobe/etc where one could be consolidated or expensed
  properly to the business instead of paid personally.
- **Unused/likely-forgotten**: subscriptions with no matching usage signal
  you provide (a manual "still using this?" tag you set quarterly).
- **Price creep**: same subscription, amount increased since last import.

Process: on each monthly import, review the Subscriptions view, tag each
line "Keep / Cancel / Downgrade / Move to business", action it, note the
outcome. Running total of "saved per year" is shown at the top of the view.

## 7. Monthly automation loop

Because there's no live bank feed (by design — no credentials stored), the
monthly cycle is:

1. Export CSV from CommBank (personal), CommBank (business), ANZ (household),
   ANZ (charity) — last calendar month.
2. Export a matching period from Xero (each org) if reconciling against Xero
   categorisation.
3. Import all 4 (or 5 with Xero) into the app under their entity tab.
4. App auto-categorises using saved rules, flags new/unmatched merchants for
   one-time categorisation (rule is remembered for next time).
5. Review: Fee Finder, Subscriptions, Unreconciled, Debt Payoff progress.
6. Generate the Monthly Report (PDF/print) per entity — for the charity, this
   is the board-ready version.
7. Take the "Actions this month" checklist the report generates (e.g. "3 fee
   transactions to query with bank", "1 subscription price increase to
   review") and action before next cycle.

Total time target once rules are trained: **15–20 minutes/month** across all
four entities.

## 8. Open questions to raise with your accountant/broker

- Whether business banking should move to a business transaction account with
  ABN attached vs a repurposed personal account.
- Whether an offset-linked basic loan product beats the current packaged loan
  once the annual package fee is netted out.
- Optimal structure for UNSW wage / any business income split for tax
  purposes (this app does not give tax advice).
- ACNC/charity-specific reporting obligations and deadlines for SCN2A.
