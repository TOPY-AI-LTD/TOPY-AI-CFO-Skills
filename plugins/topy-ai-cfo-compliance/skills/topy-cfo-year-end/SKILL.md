---
name: topy-cfo-year-end
description: Gets a financial year ready for the statutory accounts and the CT600 — every month closed, trial balance, year-end adjustments, tax add-backs — as a checklist with figures for the founder or their accountant. Use when the user says things like "prepare for year end"; "get ready for the accounts"; "what does my accountant need?"; "year-end checklist"; "prepare the CT600"; "close the financial year". Needs the TOPY MCP server.
license: MIT
metadata:
  category: compliance
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-compliance/skills/topy-cfo-year-end/SKILL.md
---
# Year-end preparation

Year end is twelve month-ends plus the adjustments only made once a year. A clean year-end pack makes the accounts cheap
and the tax right.

## When to use
- In the month after the year end, and no later than 3 months before the accounts are due.

## Before you start
- `cfo_deadlines` for the year end and the filing dates.

## Workflow
1. `cfo_close_status` for every month of the year: each must be closed first (`topy-cfo-month-end-close`).
2. `qbo_report` TrialBalance and BalanceSheet at the year end, ProfitAndLoss for the year.
3. Adjustments to consider (each as a journal via `topy-cfo-journals`, after the founder agrees):
   - accruals (costs incurred, not yet billed) and prepayments (paid in advance) over £100;
   - unpaid share capital — a debtor (`cfo_share_capital`);
   - the director's loan account: any amount a director owes at the year end and not repaid within 9 months carries s455 tax;
   - fixed assets and depreciation (or the annual investment allowance for tax).
4. Tax notes: client entertaining is added back; staff entertaining (a team event) is allowable; a first period over
   12 months is two CT periods.
5. The pack: trial balance, the adjustments made, open questions, deadlines.

## Output
Checklist: | Item | Figure | Source | Done |, then open questions and the deadlines.

## Quality bar
- Every month closed; every adjustment has a reason and a journal number.

## Guardrails
- Journals take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- Filing is the founder's or their accountant's; this is preparation, not a signed set of accounts.

## Related skills
- `topy-cfo-month-end-close`, `topy-cfo-uk-deadlines`, `topy-cfo-journals`.
