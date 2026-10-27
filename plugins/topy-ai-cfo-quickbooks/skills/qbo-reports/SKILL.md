---
name: qbo-reports
description: Reads QuickBooks' reports — profit and loss, balance sheet, cash flow, trial balance, general ledger, aged debtors and creditors — and explains them in plain words with the figures behind them. Use when the user says things like "show me the P&L"; "balance sheet"; "trial balance"; "who owes us money?"; "what did we spend on hosting?"; "general ledger for an account". Needs the TOPY MCP server.
license: MIT
metadata:
  category: quickbooks
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-quickbooks/skills/qbo-reports/SKILL.md
---
# QuickBooks reports

The source of truth for the books is QuickBooks' own reports. This skill reads them and explains what they say.

## When to use
- Any question about the books' figures. For the monthly pack use `topy-cfo-management-accounts`.

## Before you start
- The period. Reports: ProfitAndLoss, BalanceSheet, CashFlow, TrialBalance, GeneralLedger, AgedReceivables, AgedPayables.

## Workflow
1. `qbo_report` with name, start and end. Read sections, rows and totals.
2. A question about one account → `qbo_transactions_list` for the lines behind it.
3. Explain: the totals, the 3 largest items, what changed against the previous period, anything odd (an Uncategorised balance,
   a negative bank, a debtor older than 60 days).

## Output
The report as a short table plus 3–5 plain-words points, each with its figure.

## Quality bar
- Figures copied from the report, never recomputed by hand.

## Guardrails
- Read-only. Corrections go through `topy-cfo-journals` with a preview.

## Related skills
- `topy-cfo-management-accounts`, `topy-cfo-journals`.
