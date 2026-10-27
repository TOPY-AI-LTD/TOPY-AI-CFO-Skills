---
name: topy-cfo-clevel-reports
description: One-screen finance reports for each AI cofounder — CEO, CMO, CTO, CRO, CPO, COO, CSO — and the board, each with the numbers that role owns, its flags, and the questions the CFO needs that role to answer. Use when the user says things like "send the finance update to the team"; "what does the CMO need to know about spend?"; "board finance update"; "report to the CEO"; "cost report for the CTO"; "c-level finance reports". Needs the TOPY MCP server.
license: MIT
metadata:
  category: reporting
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-reporting/skills/topy-cfo-clevel-reports/SKILL.md
---
# Finance reports for the c-levels

Each cofounder sees the money they control, not the whole ledger. The CFO's report to a role is short, sourced, and ends
with what the CFO needs back.

| Audience | Gets | CFO asks back |
|---|---|---|
| CEO | cash, runway, net, goals, decisions | priorities that change spend |
| CMO | marketing spend, CAC inputs, revenue by plan | planned campaigns and their budget |
| CTO | hosting, AI/API and tooling costs, cost per user | upcoming infrastructure changes |
| CRO | revenue, new customers, failed payments, disputes | who chases which invoice; pricing changes |
| CPO | revenue by plan, refunds, churn signals | plan or price changes coming |
| COO | suppliers, recurring costs, deadlines | new suppliers, contracts |
| CSO | security tooling spend, payment risk (disputes) | incidents with a cost |
| Board | P&L, cash, runway, cap table, compliance | — |

## When to use
- After the management accounts each month, or when a role asks.

## Before you start
- `cfo_management_accounts` for the month (closed, or labelled provisional).

## Workflow
1. `cfo_report` for each audience requested (ceo, cmo, cto, cro, cpo, coo, cso, board).
2. For each: headline, metrics with source, breakdown, flags with a suggested action, questions for that role.
3. Board: offer `investor_update_draft` from the board report; sending is the founder's call.

## Output
One block per audience, one screen each.

## Quality bar
- Each metric names its source (QuickBooks, Stripe); each flag has an owner and an action.

## Guardrails
- Never send anything on the founder's behalf; investor updates take two calls: a preview, then `confirm: true` with the
  `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-management-accounts`, `topy-cfo-runway`.
