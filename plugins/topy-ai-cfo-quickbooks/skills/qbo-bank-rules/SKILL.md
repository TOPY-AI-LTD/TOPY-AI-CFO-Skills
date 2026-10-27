---
name: qbo-bank-rules
description: Creates QuickBooks bank rules in Chrome from the CFO's rule list — supplier, account, conditions, auto-post — testing each rule's match count before saving, so recurring transactions post themselves correctly. Use when the user says things like "create bank rules"; "set up rules for my suppliers"; "auto-categorise my bank feed"; "make a rule for this supplier"; "stop me categorising the same thing"; "set up the rule for Tide fees". Needs the TOPY MCP server.
license: MIT
metadata:
  category: quickbooks
  tier: core
  version: 0.1.0
  docs: https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/plugins/topy-ai-cfo-quickbooks/skills/qbo-bank-rules/SKILL.md
---
# Bank rules (Chrome)

A bank rule turns a categorisation decision into something QuickBooks does on its own. Rules have no API, so they are
created in QuickBooks' page — and tested first, because a rule that matches more than expected books the wrong things.

## When to use
- A supplier that recurs, or a batch of known one-offs. Not for transfers or Stripe payouts (`qbo-bank-feed-match`).

## Before you start
- `qbo_bank_rules_list` (rules already kept) and `qbo_bank_rules_suggest` (suppliers worth a rule). Agree each spec with the founder
  (`topy-cfo-categorise` for the account); missing suppliers → `qbo_vendor_create`. Save each spec with `qbo_bank_rule_save` (proposed).
- One-offs: add an exact-amount condition so the rule can't catch future payments.
- The founder signs in to QuickBooks in Chrome. Paste `references/rule-helpers.js` (`cfo-cli chrome-kit rules`).

## Workflow
1. Accounting → Rules → New rule. Name; Money out / Money in; the bank account only (untick the others).
2. Conditions: Bank text contains <text> (and Amount equals <x> for one-offs); All or Any.
3. **Test rule.** The count must equal `expected_matches`. Different → don't save; look at the lines (a descriptor can be an
   address: "Lincoln House" was OVHcloud) and fix the spec first.
4. Category: type the account name and pick the **existing** account (never "Add new account"). Payee: pick the existing supplier.
   Auto-post on.
5. `__cfoRule()`: every field and the test count must be right. Then Save.
6. `qbo_bank_rule_save` with status applied. Check the posted lines with `qbo_transactions_list` (supplier, account, total).

## Output
| Rule | Conditions | Account | Payee | Tested | Posted |
|---|---|---|---|---|---|

## Quality bar
- Every rule tested before saving; posted totals checked through the API afterwards.

## Guardrails
- Cancel any unexpected panel (a "New account" form means a wrong click); start the rule again rather than patch it.
- The founder signs in; never type passwords. Stop after 3 failed tries.
- Saving a spec takes two calls: a preview, then `confirm: true` with the `confirmation` after the founder agrees.

## Related skills
- `topy-cfo-categorise`, `qbo-bank-feed-match`.
