---
name: topy-cfo-runway
description: How long the cash lasts, the cash floor, and what to do about it — from real monthly net in QuickBooks and Stripe's pending balance, with three costed options when runway is under 12 months. Use when the user says things like "how long will our cash last?"; "runway"; "can we afford to hire?"; "when do we run out of money?"; "cash plan"; "are we burning cash?". Needs the TOPY MCP server.
license: MIT
metadata:
  category: reporting
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-reporting/skills/topy-cfo-runway/SKILL.md
---
# Runway and cash plan

Runway is cash divided by average monthly net burn over the last three closed months. Not burning is a valid answer.
The cash floor (from the company facts) is the amount the founder never wants to go below.

## When to use
- Monthly, before a hire or a big spend, or when runway drops under 12 months (the cash safety goal).

## Before you start
- `cfo_brief` (cash across banks and Stripe, runway); `cfo_goals_get` for the cash safety target.

## Workflow
1. `cfo_management_accounts` for the last closed month; `runway_get` and `plan_vs_actual_get` if a forecast exists.
2. Burning: months of runway, the month cash reaches the floor, and three options with numbers — cut (which costs),
   grow (revenue needed), raise (amount and when to start, 6 months before the floor).
3. Not burning: cash free above the floor and what it could fund.
4. A planned spend: model it as a scenario (`financial_scenarios_list`, `financial_scenario_create`) and show runway with and without.

## Output
`Cash £c · floor £f · net/month £n (3-month avg) · runway <m months | not burning> · reaches the floor <month>` + options.

## Quality bar
- Average of closed months only; the scenario named so it can be revisited.

## Guardrails
- Not financial advice on investments; the decisions are the founder's. Scenario writes take two calls: a preview, then
  `confirm: true` with the `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-goals`, `topy-cfo-management-accounts`.
