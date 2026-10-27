---
name: stripe-revenue-ops
description: The CFO's watch on Stripe — balance and payouts, the month's sales, refunds and fees, failed payments and disputes — with the chasing handed to the CRO. Use when the user says things like "how did sales do this month?"; "any failed payments?"; "chargebacks"; "when is the next payout?"; "Stripe fees this month"; "refunds this month". Needs the TOPY MCP server.
license: MIT
metadata:
  category: stripe
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-stripe/skills/stripe-revenue-ops/SKILL.md
---
# Stripe revenue operations

Revenue is only real once collected. This skill reads Stripe for the month and the money at risk — failed payments,
open invoices, disputes — and hands each to the right person.

## When to use
- Weekly, or "how did sales do?", "any failed payments?". Not for booking (`stripe-to-books`).

## Before you start
- The Stripe connection is read-only; `stripe_overview` confirms it and shows the balance.

## Workflow
1. `stripe_revenue_summary` for the month (and the previous one): gross sales, refunds, fees, payouts, new customers.
2. `stripe_failed_payments`: open and overdue invoices, failed charges. List them for the CRO to chase; Stripe keeps retrying on its own.
3. `stripe_disputes_list`: open disputes and their evidence deadline — a missed deadline loses the money.
4. `stripe_payouts_list`: the next arrivals (cash planning).
5. Flags: refunds over 5% of sales; fees over 4% of sales; any dispute; failed payments over 5% of invoices.

## Output
```
<month>: sales £x (last month £y), refunds £r, fees £f, net £n · new customers k
At risk: <n> invoices £a (oldest …) · disputes <d> (evidence due …)
Next payouts: …
```

## Quality bar
- Every figure from the Stripe tools; flags carry an owner (CRO for chasing, founder for disputes).

## Guardrails
- Read-only. Refunds, payment links and subscription changes are done in Stripe's dashboard or its official MCP (`stripe-official-mcp`).

## Related skills
- `stripe-to-books`, `topy-cfo-clevel-reports`, `stripe-official-mcp`.
