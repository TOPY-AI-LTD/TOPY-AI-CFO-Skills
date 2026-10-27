---
name: qbo-close-books
description: After a close, sets QuickBooks' closing date in Chrome (with the founder's yes) so nobody changes a reported month by accident. Use when the user says things like "lock the books"; "set the closing date"; "stop changes to last month"; "close the period in QuickBooks"; "lock October". Needs the TOPY MCP server.
license: MIT
metadata:
  category: quickbooks
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-quickbooks/skills/qbo-close-books/SKILL.md
---
# Lock a closed month

Once a month is closed and reported, its numbers should not change. QuickBooks' closing date protects them.

## When to use
- Right after `topy-cfo-month-end-close` is all green, and only with the founder's yes.

## Before you start
- `cfo_close_status` for the month: every check must be green; `books_locked` shows the current closing date.

## Workflow
1. Ask the founder: lock up to <month end>? Optionally with a password they set themselves.
2. In Chrome: Settings (gear) → Account and settings → Advanced → Accounting → Close the books: on; closing date = the month end; Save.
3. `cfo_close_status` again: `books_locked` must be true.

## Output
`Books locked up to <date>` (or why not).

## Quality bar
- Only after a green close; confirmed through `cfo_close_status`.

## Guardrails
- Founder's yes first; the founder sets any password; never type passwords for them.

## Related skills
- `topy-cfo-month-end-close`.
