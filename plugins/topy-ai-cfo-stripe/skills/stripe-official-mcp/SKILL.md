---
name: stripe-official-mcp
description: When money must move in Stripe — a refund, a payment link, a subscription change — the CFO drafts it and the founder does it through Stripe's official MCP server or dashboard, never through TOPY's read-only key. Use when the user says things like "refund this customer"; "create a payment link"; "cancel a subscription"; "change a customer's plan"; "connect Stripe's MCP". Uses TOPY when it is connected.
license: MIT
metadata:
  category: stripe
  tier: connected
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-stripe/skills/stripe-official-mcp/SKILL.md
---
# Stripe's official MCP (money moves)

TOPY keeps a read-only Stripe key on purpose: an AI CFO should never move money on its own. Money moves through
Stripe's own tools, approved by the founder there.

## When to use
- Refunds, payment links, subscription or price changes. Not for reading Stripe (`stripe-revenue-ops`).

## Before you start
- Stripe's official MCP server: remote `https://mcp.stripe.com` (OAuth, or a restricted key), or local `npx -y @stripe/mcp`.
  The founder adds it to their own client and approves each action there. `stripe_overview` shows the same pointers.

## Workflow
1. Draft the action: customer, amount, reason, and the effect on the month (`stripe_revenue_summary`).
2. If Stripe's MCP is connected in this client, call its tool and let the founder approve it there; otherwise give the exact
   steps in the Stripe dashboard.
3. Afterwards: the refund appears in next month's Stripe journal (`stripe-to-books`); note it for the CRO and CPO reports.

## Output
`Action: <refund £x to customer y | link | change> · why · effect on the month · approve in: <Stripe MCP | dashboard path>`

## Quality bar
- The founder approves every money movement in Stripe itself.

## Guardrails
- Never use TOPY's key to move money; never ask for a Stripe secret key in chat.

## Related skills
- `stripe-revenue-ops`, `stripe-to-books`.
