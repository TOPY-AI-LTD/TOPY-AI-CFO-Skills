---
name: stripe-to-books
description: Books Stripe in QuickBooks the way an accountant does — one journal per month (sales by plan, refunds, fees) and one transfer per payout — so the Stripe account always equals Stripe's balance and each payout matches the bank. Use when the user says things like "book Stripe in QuickBooks"; "get Stripe into the accounts"; "match my Stripe payouts"; "reconcile Stripe"; "import all of Stripe"; "book October so far". Needs the TOPY MCP server.
license: MIT
metadata:
  category: stripe
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-stripe/skills/stripe-to-books/SKILL.md
---
# Stripe into the books

Stripe is a bank account in the books ("Stripe"). Each month's sales, refunds and fees go into it as one journal; each
payout is a transfer from it to the bank, on the day it arrived, for exactly what arrived. Then the Stripe account equals
Stripe's balance and every payout in the bank feed has a ready match.

## When to use
- Monthly (part of the close), first set-up, or "book Stripe so far" mid-month (`through` = yesterday).
- Not for refunds or payment links: those go through Stripe's official MCP (`stripe-official-mcp`).

## Before you start
- `stripe_overview` for the live balance; `qbo_accounts_list` for Sales, Bank charges and the bank Stripe pays into.

## Workflow
1. `books_stripe_preview` (`books_start` the first time; `through` yesterday for a part month). Read:
   - the accounts it uses or will create ("Stripe" bank account);
   - each monthly journal: sales by plan, refunds, fees (card, Billing, payout fees), net — each must balance;
   - each payout transfer with its date and amount; `totals.reconciles` must be true.
2. Blocked (activity before the books start, no bank account) or anything `unclassified`: explain and stop.
3. Show it to the founder. First run: `books_stripe_apply` with `max_writes` 2 and ask them to look at it in QuickBooks; then the rest.
4. `books_stripe_apply` with the approved `plan_hash` (and the same `through`). A changed plan is refused: preview again.
5. Check: the Stripe account in QuickBooks = Stripe's balance less anything not booked yet.
6. The bank feed: `qbo_bank_feed_expectations` → `qbo-bank-feed-match` for each payout. A payout's bank text may be the statement
   descriptor, not "Stripe" — match on date and amount.

## Output
| Month | Sales | Refunds | Fees | To Stripe account | Status |
|---|---|---|---|---|---|
Payout transfers · reconciliation · what's left.

## Quality bar
- Never booked twice (journal numbers STRIPE-YYYY-MM or STRIPE-YYYY-MM-DD; transfers name their payout).
- The Stripe account reconciles; unfinished months wait for their end or a part-month `through`.

## Guardrails
- Writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees, then the `plan_hash` apply.
- Revenue gross with no VAT split only for a company that isn't VAT-registered; ask otherwise.

## Related skills
- `qbo-bank-feed-match`, `topy-cfo-month-end-close`, `stripe-revenue-ops`.
