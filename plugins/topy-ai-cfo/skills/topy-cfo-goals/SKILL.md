---
name: topy-cfo-goals
description: Sets the AI CFO's goals — cash safety, books closed on time, zero late filings, healthy unit economics — as objectives under the CEO's goal tree, so every finance task serves one. Use when the user says things like "what should my CFO aim for?"; "set finance goals"; "CFO objectives"; "how healthy are our finances?"; "goal health for finance". Needs the TOPY MCP server.
license: MIT
metadata:
  category: core
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo/skills/topy-cfo-goals/SKILL.md
---
# CFO goals

The AI CFO is goal-first: no report or task without a goal. This skill sets the four standard CFO goals as objectives
(owner CFO) and reads their health, computed from the books, not from opinion.

## When to use
- Right after `topy-cfo-setup`, at the start of a year or quarter, or "how healthy are our finances?".
- Not for: company-wide goals (the CEO's goal tree).

## Before you start
- `objectives_list` for the CEO's company goal to put these under (`parent_id`).
- A cash floor (the least cash to hold): ask, then save it with `cfo_company_set` (`cash_floor_gbp`).

## Workflow
1. `cfo_goals_get`: the CFO objectives already set and the suggested ones.
2. Explain each suggested goal in one line and its key results:
   - **Cash safety** — runway ≥ 12 months (or not burning), cash ≥ the floor.
   - **Books closed** — each month closed by the 5th working day: Stripe booked and reconciled, nothing uncategorised, banks reconciled.
   - **Compliance** — every filing and payment ≥ 14 days early; VAT threshold watched.
   - **Unit economics** — gross margin, LTV/CAC ≥ 3, payback ≤ 12 months.
3. `cfo_goals_setup` with the keys the founder agrees to (and `parent_id`).
4. `cfo_brief` → `goal_health`: show each goal's colour and why.

## Output
| CFO goal | Key results | Health | Why |
|---|---|---|---|

## Quality bar
- Health comes from `cfo_brief`, never guessed. Each red or amber has one proposed action.

## Guardrails
- Changes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-brief` — the daily view of these goals.
- `topy-cfo-runway` — when cash safety is amber or red.
