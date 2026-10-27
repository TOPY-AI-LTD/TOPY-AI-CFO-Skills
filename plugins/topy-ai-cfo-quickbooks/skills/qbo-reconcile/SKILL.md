---
name: qbo-reconcile
description: Reconciles each bank account to its statement — record the statement balance, compare it with QuickBooks, find the difference — and, with the founder, completes QuickBooks' own Reconcile in Chrome. Use when the user says things like "reconcile the bank"; "do the books match the bank?"; "bank reconciliation"; "why is QuickBooks different from my bank?"; "reconcile Tide". Needs the TOPY MCP server.
license: MIT
metadata:
  category: quickbooks
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-quickbooks/skills/qbo-reconcile/SKILL.md
---
# Reconcile a bank account

The books are right only when each bank account equals the bank. This skill compares them at a date and, if they
differ, finds why.

## When to use
- At the month end (part of the close), or "QuickBooks says £x but the bank says £y".

## Before you start
- The statement balance at the month end for each account (from the founder, or the "Bank" figure on QuickBooks' bank
  transactions page read in Chrome).

## Workflow
1. `cfo_bank_balance_record` for each account and date.
2. `cfo_close_status`: each `bank_reconciled:<account>` shows the books' balance at that date and the difference.
3. Difference ≠ 0 → find it: lines still pending in the feed (`qbo-bank-feed-match`, `qbo-bank-rules`); a transaction dated in the
   wrong month (`qbo_transactions_list` around the month end); a duplicate (same amount and date twice); a missing opening balance.
4. Fix the cause, never journal the difference away; record and check again.
5. Optional, with the founder: QuickBooks' Accounting → Reconcile in Chrome, statement date and ending balance, tick to a difference of 0, finish.

## Output
| Account | Statement | Books | Difference | Cause |
|---|---|---|---|---|

## Quality bar
- Difference 0, or its cause named with a fix.

## Guardrails
- Writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- In Chrome the founder signs in; never type passwords.

## Related skills
- `topy-cfo-month-end-close`, `qbo-bank-feed-match`.
