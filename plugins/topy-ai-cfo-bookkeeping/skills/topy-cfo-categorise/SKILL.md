---
name: topy-cfo-categorise
description: How a UK bookkeeper categorises a small company's transactions — which account, the tax effect, and when to ask — with suppliers created in QuickBooks. Use when the user says things like "what category is this?"; "how do I book this payment?"; "is this an expense?"; "categorise my transactions"; "where does this go in the accounts?"; "is this tax deductible?". Uses TOPY when it is connected.
license: MIT
metadata:
  category: bookkeeping
  tier: connected
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-categorise/SKILL.md
---
# Categorise transactions (UK)

The category decides the profit, the tax and what the founder sees. A good bookkeeper never guesses: known suppliers
follow the table, unclear ones are asked about once and then become a rule.

## When to use
- A new supplier or a one-off in the bank feed; "where does this go?". Not for Stripe activity (`stripe-to-books`).

## Before you start
- `qbo_accounts_list` (use the company's own chart; create an account only when nothing fits) and `qbo_vendors_list`.

## Workflow
1. Identify the supplier from the bank text. Card descriptors can be addresses: check the full bank text
   ("Lincoln House" was OVHcloud).
2. Pick the account:

| What | Account | Tax |
|---|---|---|
| Stripe fees, bank and card fees, FX fees | Bank charges | deductible |
| Hosting, domains, APIs, cloud | Computer running costs | deductible |
| Software subscriptions | Subscriptions | deductible |
| Companies House fees, accountants, legal | Legal and professional fees | deductible |
| Promotional events, ads, marketing material | Advertising | deductible |
| Food or drink for clients or prospects | Entertaining | **not deductible** — added back |
| Team events and meals | Staff welfare and entertaining | deductible (occasional events) |
| Bank interest received | Bank interest – received (other income) | taxable, not trading income |
| A refund from a supplier | The account of the original cost | reduces the cost |
| Shareholders paying for shares | Called up share capital not paid | equity, not income |
| A director's personal spend on the company card | Director's current account | owed by the director |

3. Unclear purpose (an event, food, a transfer from a person) → ask one question; the answer changes the tax.
4. New supplier → `qbo_vendor_create`; missing account → `qbo_account_create` (preview first).
5. Recurring → write a rule spec and `qbo_bank_rule_save` (status proposed), then `qbo-bank-rules`.

## Output
`<date> <description> £<amount> → <account>, supplier <name>, <tax effect>` and, if recurring, the rule spec.

## Quality bar
- Every category matches the table or a founder's answer; nothing guessed.
- Tax effect stated for anything not plainly deductible.

## Guardrails
- Writes to QuickBooks take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- The standard UK treatment, not tax advice; unusual items go to an accountant.

## Related skills
- `qbo-bank-rules` — turn a category into a rule. `topy-cfo-month-end-close` — clearing the month.
