---
name: topy-cfo-brief
description: The founder's daily money check in five lines — cash in the banks and Stripe, runway, last month's close, the next deadline, anything failed or disputed — silent when nothing changed. Use when the user says things like "how much cash do we have?"; "daily CFO check"; "anything I need to know about money today?"; "what's our runway?"; "CFO brief"; "money update". Needs the TOPY MCP server.
license: MIT
metadata:
  category: core
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo/skills/topy-cfo-brief/SKILL.md
---
# Daily CFO brief

A good CFO looks at cash every day and bothers the founder only when something changed. This skill reads the CFO's
deterministic brief and turns it into at most five lines, each with its source.

## When to use
- Every morning (the OneMan routine `cfo-daily-cash` runs it), or "how much cash do we have?".
- Not for: the month-end close (`topy-cfo-month-end-close`) or a runway plan (`topy-cfo-runway`).

## Before you start
- `cfo_brief` does the work: cash per bank account and Stripe, runway from the last three months, last month's close status,
  the next deadline, alerts and the health of each CFO goal.

## Workflow
1. `cfo_brief`. If it reports QuickBooks or Stripe not connected, say so and point to `topy-cfo-connect`.
2. `stripe_failed_payments` (last 7 days) and `stripe_disputes_list`: count anything new.
3. Decide what is news: cash moved more than 10% or £1,000; runway amber/red; last month not closed after the 5th working day;
   a deadline within 30 days; a new failed payment or dispute; a goal turned amber or red.
4. Nothing is news → one line: "Cash £x (banks £y + Stripe £z), nothing needs you."
5. Otherwise up to five lines, most important first, and at most one action, tied to a CFO goal.

## Output
```
Cash £<total> (banks £<b>, Stripe £<s>) · runway <n months | not burning>
<news line> — source
Do: <one action> (goal: <cash safety | books closed | compliance | unit economics>)
```

## Quality bar
- Every figure is from `cfo_brief` or a Stripe tool, with its source; nothing estimated.
- No more than five lines; no action without a goal.

## Guardrails
- Read-only skill. Money moves only through Stripe's own tools, by the founder.
- Never invent a number to fill a gap: say which source is missing.

## Related skills
- `topy-cfo-month-end-close` — when last month isn't closed.
- `stripe-revenue-ops` — failed payments and disputes in detail.
- `topy-cfo-runway` — when runway turns amber or red.
