---
name: topy-cfo-connect
description: Connects the founder's AI CFO — the TOPY CFO MCP server, Stripe (read-only key), QuickBooks (sign in with Intuit) and the company facts from Companies House. Use when the user says things like "connect my CFO"; "set up the AI CFO"; "connect Stripe and QuickBooks"; "is my accounting connected?"; "use topy as my CFO"; "add my company number". Needs the TOPY MCP server.
license: MIT
metadata:
  category: core
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo/skills/topy-cfo-connect/SKILL.md
---
# Connect the AI CFO

The AI CFO works from the founder's own systems: Stripe for sales, QuickBooks for the books, Companies House for the
company's legal dates. This skill gets all three connected once, with the least access each needs, under the founder's
TOPY account.

## When to use
- First contact with the AI CFO, or "is everything connected?".
- After a reconnect alert (QuickBooks asked to sign in again).
- Not for: setting up the books themselves (`topy-cfo-setup`).

## Before you start
- The CFO MCP server is `https://topy.ai/mcp/cfo` (remote) or `npx @topy-ai/cfo-mcp` (local); the CLI is `npx @topy-ai/cfo-cli`.
  All sign in with the founder's TOPY account. `account_get` confirms who is signed in.
- Never ask for a Stripe secret key, a QuickBooks or bank password in chat: connections are made in the TOPY dashboard.

## Workflow
1. `integrations_list`: which of Stripe and QuickBooks are connected, their status and last sync.
2. Missing or `reconnect_required` → `integration_connect_link` for each and tell the founder what to do there:
   - Stripe: create a **restricted key with read access only** (Balance, Balance transactions, Payouts, Charges, Invoices,
     Customers, Subscriptions, Products, Disputes) and paste it in the dashboard. TOPY never moves money.
   - QuickBooks: "Sign in with QuickBooks" and pick the company; the founder must be a QuickBooks admin.
3. Ask for the Companies House number; `cfo_company_set` with it (it reads incorporation date, next accounts and confirmation
   statement), plus whether the company is VAT-registered, when the books start (the first bank day) and a cash floor.
4. `cfo_deadlines`: show the next three deadlines so the founder sees the CFO is live.

## Output
```
Connected: Stripe ✅ (read-only, last sync …) · QuickBooks ✅ (<company>) · Companies House ✅ (<number>, incorporated …)
Next deadlines: …
Next: topy-cfo-setup (first time) or topy-cfo-brief (every day)
```

## Quality bar
- Every connection's status comes from `integrations_list`, not from memory.
- The founder knows Stripe access is read-only and where money moves (Stripe's own MCP or dashboard).

## Guardrails
- Changes take two calls: a preview first, then `confirm: true` with the `confirmation` after the founder agrees.
- Never handle passwords, secret keys or bank logins; never type them into a browser.

## Related skills
- `topy-cfo-setup` — the first set-up of the books.
- `topy-cfo-brief` — the daily check once connected.
