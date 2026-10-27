---
name: topy-cfo-vat-watch
description: Watches taxable turnover over the rolling 12 months against the UK VAT registration threshold (£90,000) and warns early, so the company registers on time — or confirms it doesn't need to. Use when the user says things like "do I need to register for VAT?"; "how close are we to the VAT threshold?"; "VAT"; "should I charge VAT?"; "rolling 12 month turnover". Needs the TOPY MCP server.
license: MIT
metadata:
  category: compliance
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-compliance/skills/topy-cfo-vat-watch/SKILL.md
---
# VAT threshold watch

A UK business must register for VAT within 30 days of the end of the month in which its taxable turnover for the last 12
months went over £90,000 (or if it expects to go over it in the next 30 days alone).

## When to use
- Monthly in the compliance check; when sales jump; when the founder asks about VAT.

## Before you start
- `cfo_company_get`: already VAT-registered → this skill becomes "file returns on time" (out of scope; say so).

## Workflow
1. `cfo_vat_watch`: rolling 12-month turnover by month, the threshold, headroom.
2. Status: under 75% → fine; 75–100% → warn and estimate the month it crosses at the current growth;
   over → register within 30 days of that month's end, and note prices may need VAT added.
3. Note the place-of-supply caveat: sales to overseas business customers may be outside UK VAT; digital services to
   overseas consumers have their own rules — confirm with an accountant before relying on it.

## Output
`Rolling 12 months £x of £90,000 (y%) · headroom £h · crosses around <month> · action`

## Quality bar
- Turnover from the books; the crossing month shown with its assumption.

## Guardrails
- Registering is the founder's; this is not tax advice beyond the threshold rule.

## Related skills
- `topy-cfo-uk-deadlines`.
