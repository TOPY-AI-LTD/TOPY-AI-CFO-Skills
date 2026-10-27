# Changelog

## v0.1.1 — 2026-10-27

Chrome kit checked read-only against a live QuickBooks Online company: `__cfo.accounts()` (each account's bank vs
posted balance) in `qbo-bank-feed-match`, `__cfoRules()` (the rules QuickBooks already has, to compare with the CFO's
rule list) in `qbo-bank-rules`, and the first-time Reconcile page noted in `qbo-reconcile`.

## v0.1.0 — 2026-10-27

First release: 22 skills in six plugins (core, bookkeeping, stripe, quickbooks, reporting, compliance) on
`https://topy.ai/mcp/cfo`, with the Stripe and QuickBooks service agents and the Chrome kit for QuickBooks' bank
feed and bank rules. Packages: `@topy-ai/cfo-skills`, `@topy-ai/cfo-mcp`, `@topy-ai/cfo-cli` 0.1.0.
