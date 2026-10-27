---
name: topy-cfo-journals
description: Books the journals a bookkeeper needs — accruals, prepayments, reclassifications, corrections — balanced, numbered once and previewed before they reach QuickBooks. Use when the user says things like "post a journal"; "accrue this cost"; "move this to another account"; "fix a wrong category"; "prepayment adjustment"; "correct the books". Needs the TOPY MCP server.
license: MIT
metadata:
  category: bookkeeping
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-journals/SKILL.md
---
# Journals and adjustments

A journal changes the books without money moving. Each one must balance, say why, and be booked once.

## When to use
- Accruals (a cost incurred, not yet billed), prepayments (a year's fee paid up front), reclassifying a wrong category,
  share capital entries. Not for bank transactions (the bank feed) or Stripe (`stripe-to-books`).

## Before you start
- `qbo_accounts_list` for exact account names; `qbo_transactions_list` / `qbo_report` GeneralLedger to see what is there now.
- Materiality: below about £100 a month, an adjustment is usually not worth it for a small company; say so.

## Workflow
1. Write the entry as a table: date, account, debit, credit, description; total debits = total credits.
2. Number it so it can never be booked twice: ACC-YYYY-MM-<n>, PRE-…, RCL-…, REV-… (reversals).
3. `qbo_journal_create` → show the preview (accounts, amounts) → `confirm: true` after the founder agrees.
4. Accruals and prepayments: book the reversal or the monthly release too, with its own number.
5. Check with `qbo_report` (ProfitAndLoss or BalanceSheet) that the effect is what was intended.

## Output
| Date | Account | Debit | Credit | Description |
|---|---|---|---|---|
Number, reason, the effect on profit.

## Quality bar
- Balanced; one reason per journal; the number is unique; the effect checked in a report afterwards.

## Guardrails
- Writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- Never journal around a reconciliation difference: find its cause.

## Related skills
- `topy-cfo-month-end-close`, `topy-cfo-year-end`.
