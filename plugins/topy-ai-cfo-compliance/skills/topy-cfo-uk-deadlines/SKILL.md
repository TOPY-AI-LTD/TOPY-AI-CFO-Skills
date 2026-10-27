---
name: topy-cfo-uk-deadlines
description: Every UK company deadline in one list — annual accounts, Corporation Tax payment and CT600 (split when the first period is over 12 months), confirmation statement — from Companies House, with days left and who does it. Use when the user says things like "what are my filing deadlines?"; "when are the accounts due?"; "when do I pay Corporation Tax?"; "confirmation statement due date"; "compliance calendar"; "am I late for anything?". Needs the TOPY MCP server.
license: MIT
metadata:
  category: compliance
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-compliance/skills/topy-cfo-uk-deadlines/SKILL.md
---
# UK filing deadlines

Late filing costs money automatically (Companies House penalties start at £150; HMRC charges interest from the day after
CT is due). This skill keeps the dates in front of the founder.

## When to use
- At setup, monthly in the compliance check, and whenever a date is within 30 days.

## Before you start
- `cfo_company_get`. No company number, or facts over a month old → `cfo_company_set` with the number to refresh from Companies House.

## Workflow
1. `cfo_deadlines`: each deadline with date, days left, what it is, who files it.
2. Rules it applies:
   - first accounts: 21 months after incorporation; later: 9 months after the year end;
   - a first period longer than 12 months is two CT periods: the first 12 months, then the rest; each CT payment is due
     9 months and 1 day after its period ends, each CT600 12 months after;
   - confirmation statement: the date Companies House shows, 14 days to file.
3. Flag anything within 30 days, and say what's needed (closed books, the year-end pack, a Government Gateway login).

## Output
| Deadline | Date | Days left | Who | Needs |
|---|---|---|---|---|

## Quality bar
- Dates from Companies House where it publishes them; computed dates show the rule.

## Guardrails
- Filing is the founder's (or their accountant's); never file or sign in to HMRC or Companies House for them.
  `cfo_company_set` takes two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-year-end`, `topy-cfo-vat-watch`.
