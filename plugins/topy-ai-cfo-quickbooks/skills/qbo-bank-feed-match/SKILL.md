---
name: qbo-bank-feed-match
description: Matches QuickBooks' bank feed in Chrome — Stripe payouts to their transfers, transfers between the company's own accounts paired — acting only where the date and amount match exactly, with every key press checked first. Use when the user says things like "match the Stripe payouts"; "match my bank transactions"; "pair the transfers between my accounts"; "clear the For review list"; "do the matching for me"; "bank feed matching". Needs the TOPY MCP server.
license: MIT
metadata:
  category: quickbooks
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-quickbooks/skills/qbo-bank-feed-match/SKILL.md
---
# Match the bank feed (Chrome)

QuickBooks' bank feed has no API, so matching is done in its web page. A wrong match books money to the wrong place, so
this skill matches only what the books expect, line by line, checking every target before pressing.

## When to use
- After `stripe-to-books`, after booking transfers, or when the For review list has payouts or own-account transfers.
- Not for categorising suppliers (`qbo-bank-rules`).

## Before you start
- `qbo_bank_feed_expectations`: each transfer (date, amount, from, to, the feed it shows in). This is the only list you match.
- The founder opens QuickBooks in Chrome and signs in to the right company (check the company name); never type a password.
- Paste the helpers in `references/feed-helpers.js` (also `cfo-cli chrome-kit feed`) with the page's JavaScript tool.

## Workflow
1. Accounting → Bank transactions → the bank account. Search "stripe" (or the amount; a payout's text may be the statement descriptor).
2. Read the lines (`__cfo.rows()`) and compare with the expectations: list what will be matched, and anything that doesn't line up.
3. For each expected Stripe payout: `__cfo.match('DD/MM/YYYY', '123.45')`. Only when it returns `ready`, press Enter.
   Then wait ~10 seconds and check `__cfo.pending()` dropped by 1. A press can take effect late: wait, never press again.
4. Transfers between the company's own accounts show PAIR: `__cfo.pair('DD/MM/YYYY', '300.00', '<other account>')` → `ready` → Enter.
   "2 suggested pairs found" → open the line and choose the other account's line with the same date, or ask the founder.
5. Anything not `ready` (rows≠1, suggestion differs): skip it and report it. Three failures in a row: stop and ask.
6. Verify: the Posted tab shows "Matched Transfer" for each; `qbo_accounts_list` — each bank account equals the bank's figure.

## Output
| Date | Amount | Feed line | Matched to | Result |
|---|---|---|---|---|
plus anything skipped and why.

## Quality bar
- Only exact date + amount matches; Pending dropped by exactly the number matched; nothing else touched.

## Guardrails
- The founder signs in; never type passwords or approve OAuth for them.
- Check before every press (`ready`); when a check fails the helper moves the focus away, so Enter does nothing.
- Cancel any unexpected dialog; stop after 3 failed tries. A match can be undone from the Posted tab.

## Related skills
- `stripe-to-books`, `qbo-bank-rules`, `topy-cfo-month-end-close`.
