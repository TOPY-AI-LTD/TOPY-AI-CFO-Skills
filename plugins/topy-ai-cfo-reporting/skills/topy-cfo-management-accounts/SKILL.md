---
name: topy-cfo-management-accounts
description: The month's management accounts in one page — P&L against last month, cash and runway, balance sheet highlights, KPIs and the CFO's commentary — built from QuickBooks and Stripe after the close. Use when the user says things like "management accounts for last month"; "monthly finance pack"; "how did we do last month?"; "month-end numbers"; "P&L versus last month"; "finance summary for the month". Needs the TOPY MCP server.
license: MIT
metadata:
  category: reporting
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-reporting/skills/topy-cfo-management-accounts/SKILL.md
---
# Management accounts

Management accounts answer "how did the month go, and what changed?" in numbers the founder trusts. They come after the
close: numbers from an open month are labelled provisional.

## When to use
- After `topy-cfo-month-end-close`, or whenever the founder asks how a month went.

## Before you start
- `cfo_close_status` for the month. Not closed → say the figures are provisional and what's still open.

## Workflow
1. `cfo_management_accounts` for the month: P&L (revenue, costs by group, net), the previous month, cash, runway, balance sheet lines.
2. Revenue check: `stripe_revenue_summary` for the month should agree with sales in the P&L (gross, before fees). A difference → name it.
3. Commentary — three to five points, each with its figure: what drove revenue, the biggest cost movement, cash and runway,
   anything one-off (an event, a refund), and what to watch next month.
4. KPIs: if the project tracks MRR, net burn or cash (`kpis_list`), record the month's values with `kpi_value_record`.

## Output
```
<Month> management accounts (closed | provisional)
Revenue £x (±% vs last) · Costs £y · Net £z · Cash £c · Runway <n months | not burning>
Costs by group: …
Commentary: 1… 2… 3…
Watch next month: …
```

## Quality bar
- Every figure from a tool; P&L revenue agrees with Stripe or the difference is explained.

## Guardrails
- Provisional months are labelled. KPI writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-month-end-close`, `topy-cfo-clevel-reports`, `qbo-reports`.
