---
name: topy-cfo-share-capital
description: Keeps share capital as Companies House shows it — shares issued at their nominal value, what each shareholder still owes, and their payments booked against it, not as income. Use when the user says things like "book my share capital"; "how much do shareholders still owe?"; "money from a shareholder"; "shares not paid up"; "cofounder paid for his shares"; "share capital in the books". Needs the TOPY MCP server.
license: MIT
metadata:
  category: bookkeeping
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-share-capital/SKILL.md
---
# Share capital

The books must show the share capital registered at Companies House. If shareholders haven't paid for all their shares,
the unpaid part is an asset — money they owe the company — and their payments reduce it. Never income.

## When to use
- Setting up the books, a shareholder paying in, or "how much do they still owe?". Not for a new funding round (the CEO's cap table).

## Before you start
- The statement of capital on Companies House: classes, number of shares, nominal value, holders.
- `cfo_share_capital`: is it tracked, and what does each shareholder owe now? `cap_table_get` if the cap table exists.

## Workflow
1. Not tracked → one journal on the incorporation date with `qbo_journal_create`: credit Ordinary share capital (shares × nominal);
   debit "Called up share capital not paid" for each shareholder (as a customer). Shares issued above nominal → the excess to Share premium.
2. Each payment from a shareholder → booked against "Called up share capital not paid" with the shareholder's name; a recurring
   reference (e.g. "Share Capital") becomes a money-in rule (`qbo_bank_rule_save`, then `qbo-bank-rules`).
3. `cfo_share_capital` again: the amount each still owes.
4. If the company won't collect the rest: only a capital reduction (special resolution, solvency statement, SH19) removes it;
   a buy-back needs fully paid shares. Point to an accountant or solicitor.

## Output
| Shareholder | Shares | Due | Paid | Still owed |
|---|---|---|---|---|

## Quality bar
- Share capital in QuickBooks = Companies House. Payments are not in Sales.

## Guardrails
- Writes take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- Standard UK accounting treatment, not legal advice.

## Related skills
- `topy-cfo-setup`, `qbo-bank-rules`.
