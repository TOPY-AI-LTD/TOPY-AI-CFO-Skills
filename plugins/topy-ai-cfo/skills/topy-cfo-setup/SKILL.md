---
name: topy-cfo-setup
description: The first set-up of a small UK company's books with the AI CFO — company facts, share capital as Companies House shows it, Stripe booked month by month, bank transfers paired, suppliers and bank rules — until every bank and Stripe account equals reality. Use when the user says things like "set up my books"; "my QuickBooks is a mess"; "start bookkeeping from scratch"; "get my accounts in order"; "first time with the CFO"; "catch up on the books". Needs the TOPY MCP server.
license: MIT
metadata:
  category: core
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo/skills/topy-cfo-setup/SKILL.md
---
# First set-up of the books

The order a senior bookkeeper uses to bring a young company's books up to date, tested on a real UK company: equity
first, then Stripe, then the bank feed, then rules. Done when each bank and Stripe account in QuickBooks equals reality.

## When to use
- A new company, or books that were never kept. Not for a single month's close (`topy-cfo-month-end-close`).

## Before you start
- `cfo_company_get`: incorporation date and books start (the bank account's first day). Missing → `topy-cfo-connect`.
- `qbo_accounts_list`: the bank accounts and whether a "Stripe" bank account or "Called up share capital not paid" exist.

## Workflow
1. **Share capital.** `cfo_share_capital`. If not tracked, read the statement of capital on Companies House (shares × nominal
   value, per shareholder). Book it with `qbo_journal_create` on the incorporation date: credit Ordinary share capital,
   debit "Called up share capital not paid" per shareholder (customers named after the shareholders). Money they paid in
   later is booked against that account (`topy-cfo-share-capital`).
2. **Stripe.** `stripe-to-books`: `books_stripe_preview` with the books start, check it reconciles, `books_stripe_apply`
   (first run `max_writes` 2, check in QuickBooks, then the rest).
3. **Match what was booked.** `qbo_bank_feed_expectations` → `qbo-bank-feed-match` in Chrome for every Stripe payout;
   pair transfers between the company's own accounts.
4. **Suppliers and rules.** `qbo_bank_rules_suggest`; ask about anything unclear (see the table in `topy-cfo-categorise`);
   `qbo-bank-rules` to create each rule in Chrome. One-offs get an exact-amount condition.
5. **Money in that isn't sales.** Interest → Bank interest received; shareholder payments → share capital; refunds → the cost they reverse.
6. **Check.** `cfo_close_status` for each month since the books started; each bank account must equal the bank's figure.

## Output
| Account | In QuickBooks | Reality | ✅ |
|---|---|---|---|
plus the profit and loss since the books started, and the open questions.

## Quality bar
- Every bank and Stripe account equals reality to the penny. Every rule was tested (match count = expected) before saving.
- Nothing categorised by guess: unclear items were asked.

## Guardrails
- Writes to QuickBooks take two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.
- In Chrome the founder signs in; never type a password; follow the checks in `qbo-bank-feed-match` and `qbo-bank-rules`.
- Tax treatment is the standard UK one, not advice.

## Related skills
- `stripe-to-books`, `qbo-bank-feed-match`, `qbo-bank-rules`, `topy-cfo-share-capital`, `topy-cfo-categorise`.
