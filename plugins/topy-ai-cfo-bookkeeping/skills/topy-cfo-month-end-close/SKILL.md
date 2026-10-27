---
name: topy-cfo-month-end-close
description: Closes a month the way a senior accountant does — Stripe booked and reconciled, bank feed cleared, nothing uncategorised, every bank reconciled to its statement — then management accounts and the c-level reports. Use when the user says things like "close last month"; "month-end close"; "are the books closed?"; "reconcile the month"; "do the monthly books"; "close October". Needs the TOPY MCP server.
license: MIT
metadata:
  category: bookkeeping
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-month-end-close/SKILL.md
---
# Month-end close

Done by the 5th working day: Stripe in the books, the bank feed empty, nothing uncategorised, every bank account equal
to its statement. Then the numbers are fit to report.

## When to use
- The first working days of a month (routine `cfo-monthly-close`), or "close last month". Not for the year end (`topy-cfo-year-end`).

## Before you start
- `cfo_close_status` for the month: the checklist with how to fix each item.

## Workflow
1. **Stripe** (`stripe_booked`, `stripe_reconciled`): `books_stripe_preview`, show entries and reconciliation, `books_stripe_apply`
   with the approved `plan_hash` (see `stripe-to-books`).
2. **Bank feed** (`bank_feed_empty`, checked in Chrome): `qbo_bank_feed_expectations` → `qbo-bank-feed-match`; new suppliers →
   `topy-cfo-categorise` and `qbo-bank-rules`.
3. **Uncategorised** (`no_uncategorised`): recategorise each item; never leave a balance in an Uncategorised account.
4. **Reconcile** (`bank_reconciled:*`): ask for each statement balance at the month end (or read the bank's figure in Chrome)
   and `cfo_bank_balance_record`; the difference must be 0. If not, `qbo-reconcile`.
5. Run `cfo_close_status` again until every check is green.
6. `cfo_management_accounts`, then `cfo_report` with audience ceo; offer the other reports.
7. Offer to lock the month (`qbo-close-books`), only with the founder's yes.

## Output
| Check | Status | Detail |
|---|---|---|
then the month's headline: income, net profit, cash, runway.

## Quality bar
- Every check green, or each remaining item named with its owner. No report before the books are closed.

## Guardrails
- Writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- Chrome work follows the checks in `qbo-bank-feed-match`; the founder signs in.

## Related skills
- `stripe-to-books`, `qbo-bank-feed-match`, `qbo-bank-rules`, `qbo-reconcile`, `topy-cfo-management-accounts`.
