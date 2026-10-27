<div align="center">
  <p>
    <img src="https://www.topy.ai/long_logo.svg" alt="TOPY AI CFO" width="420" />
  </p>
  <h1>TOPY AI CFO Skills</h1>
  <p><strong>22 skills that make your coding agent a small company's AI CFO, accountant and bookkeeper: Stripe into QuickBooks, bank feed matching and bank rules, month-end close, management accounts, reports to the other c-levels, runway and UK compliance — on the TOPY.AI CFO MCP server.</strong></p>
  <p>
    <a href="https://www.npmjs.com/package/@topy-ai/cfo-skills"><img alt="npm" src="https://img.shields.io/npm/v/@topy-ai/cfo-skills?style=for-the-badge&color=ff1212" /></a>
    <a href="https://github.com/TOPY-AI-LTD/TOPY-AI-CFO-Skills/blob/main/LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-111827?style=for-the-badge" /></a>
    <a href="https://topy.ai/developers"><img alt="MCP" src="https://img.shields.io/badge/MCP-topy.ai%2Fmcp%2Fcfo-0f172a?style=for-the-badge" /></a>
  </p>
</div>

---

The AI CFO is goal-first. It keeps four standing goals — **cash safety** (runway above the floor), **books closed**
(every month closed and reconciled by the 10th), **compliance** (no deadline missed) and **unit economics** — and
every routine below exists to move one of them.

- **Core** (`topy-ai-cfo`): connect, the daily brief, the CFO's goals, first-time setup.
- **Bookkeeping**: categorising transactions (UK treatment), the month-end close, journals, share capital.
- **Stripe** (service agent): Stripe into the books (monthly journals + payout transfers that reconcile to Stripe's
  balance), revenue operations (failed payments, disputes), and money moves through Stripe's official MCP.
- **QuickBooks** (service agent): bank-feed matching and bank rules **driven in Chrome** where QuickBooks has no API,
  reconciliation, locking a closed month, reports.
- **Reporting**: management accounts, one-screen reports for the CEO, CMO, CTO, CRO, CPO, COO, CSO and the board, runway.
- **Compliance (UK)**: Companies House and HMRC deadlines (including the split first CT period), the VAT threshold, year-end.

Every change in TOPY, QuickBooks or Stripe takes two calls: a preview the agent shows you, then a confirmed call after
you say yes. Skills never confirm for you, never move money, and never type your passwords.

## Install

```sh
npx @topy-ai/cfo-skills install                  # this project, for the agents set up here
npx @topy-ai/cfo-skills install -g --mcp         # your user, plus the MCP server
npx @topy-ai/cfo-skills install --category stripe,quickbooks
npx @topy-ai/cfo-skills list
```

Claude Code plugins: `/plugin marketplace add TOPY-AI-LTD/TOPY-AI-CFO-Skills`, then `/plugin install topy-ai-cfo-all@topy-ai-cfo`.
Codex: `codex plugin marketplace add TOPY-AI-LTD/TOPY-AI-CFO-Skills`. Pi: `pi install npm:@topy-ai/cfo-skills`.
See the [installer README](packages/skills/README.md).

## Connect TOPY.AI

`https://topy.ai/mcp/cfo` — OAuth with your TOPY.AI account (the same one as the AI CEO). Connect Stripe (a read-only
restricted key) and QuickBooks once in the TOPY.AI dashboard.

| Client | How |
|---|---|
| Claude, ChatGPT (web, desktop) | custom connector `https://topy.ai/mcp/cfo` |
| Claude Code | `claude mcp add --transport http topy-cfo https://topy.ai/mcp/cfo` |
| Codex | `codex mcp add topy-cfo --url https://topy.ai/mcp/cfo` |
| Clients that only start a command | `npx -y @topy-ai/cfo-mcp` after `npx @topy-ai/cfo-mcp login` |
| Terminal and scripts | `npm i -g @topy-ai/cfo-cli && cfo-cli login`; `cfo-cli brief`, `cfo-cli close 2026-10`, `cfo-cli chrome-kit` |

## How the skills fit together

```
topy-cfo-connect ─▶ topy-cfo-setup ─▶ topy-cfo-goals
                          │
   daily: topy-cfo-brief · stripe-revenue-ops
                          │
   monthly: stripe-to-books ─▶ qbo-bank-feed-match ─▶ qbo-bank-rules / topy-cfo-categorise
              ─▶ qbo-reconcile ─▶ topy-cfo-month-end-close ─▶ qbo-close-books
              ─▶ topy-cfo-management-accounts ─▶ topy-cfo-clevel-reports · topy-cfo-runway
                          │
   compliance: topy-cfo-uk-deadlines · topy-cfo-vat-watch ─▶ topy-cfo-year-end
```

Try: *"Book Stripe into QuickBooks"*, *"Match my Stripe payouts in the bank feed"*, *"Close October"*,
*"How long will our cash last?"*, *"What are my filing deadlines?"*

## Packages

| Package | What it is |
|---|---|
| [`@topy-ai/cfo-skills`](https://www.npmjs.com/package/@topy-ai/cfo-skills) | these skills, installed into ~20 agents (`cfo-skills`) |
| [`@topy-ai/cfo-mcp`](https://www.npmjs.com/package/@topy-ai/cfo-mcp) | a local stdio MCP server for clients that only run local servers (`cfo-mcp`) |
| [`@topy-ai/cfo-cli`](https://www.npmjs.com/package/@topy-ai/cfo-cli) | the AI CFO in the terminal, with the Chrome kit for QuickBooks (`cfo-cli`) |

## Repository structure

```
plugins/
  topy-ai-cfo/               core skills + .mcp.json (Claude Code) and mcp.json (Codex)
  topy-ai-cfo-bookkeeping/   topy-ai-cfo-stripe/   topy-ai-cfo-quickbooks/
  topy-ai-cfo-reporting/     topy-ai-cfo-compliance/
  topy-ai-cfo-all/           bundle that depends on all six
.claude-plugin/marketplace.json     Claude Code marketplace
.agents/plugins/marketplace.json    Codex marketplace
skills.json                         machine-readable catalogue
packages/skills/                    the @topy-ai/cfo-skills installer
```

The skills are generated from a source catalogue kept next to TOPY.AI's MCP server; the build checks every tool a
skill names against the CFO server's tool list. Please open an issue rather than editing a `SKILL.md`.

Not tax, legal or investment advice: filings and money movements stay with the founder or their accountant.

## License

MIT © TOPY AI LTD. Privacy: [topy.ai/privacy](https://topy.ai/privacy).

## Skills

<!-- skills:start -->

**22 skills in 6 plugins**, plus the `topy-ai-cfo-all` bundle. Generated from the source catalogue: please open an issue rather than editing a `SKILL.md`.

### AI CFO core (MCP) · `topy-ai-cfo`

| Skill | Tier | What it does |
|---|---|---|
| [`topy-cfo-brief`](plugins/topy-ai-cfo/skills/topy-cfo-brief/SKILL.md) | core | The founder's daily money check in five lines — cash in the banks and Stripe, runway, last month's close, the next deadline, anything failed or disputed — silent when nothing changed. |
| [`topy-cfo-connect`](plugins/topy-ai-cfo/skills/topy-cfo-connect/SKILL.md) | core | Connects the founder's AI CFO — the TOPY CFO MCP server, Stripe (read-only key), QuickBooks (sign in with Intuit) and the company facts from Companies House. |
| [`topy-cfo-goals`](plugins/topy-ai-cfo/skills/topy-cfo-goals/SKILL.md) | core | Sets the AI CFO's goals — cash safety, books closed on time, zero late filings, healthy unit economics — as objectives under the CEO's goal tree, so every finance task serves one. |
| [`topy-cfo-setup`](plugins/topy-ai-cfo/skills/topy-cfo-setup/SKILL.md) | core | The first set-up of a small UK company's books with the AI CFO — company facts, share capital as Companies House shows it, Stripe booked month by month, bank transfers paired, suppliers and bank rules — until every bank and Stripe account equals reality. |

### Bookkeeping & close · `topy-ai-cfo-bookkeeping`

| Skill | Tier | What it does |
|---|---|---|
| [`topy-cfo-categorise`](plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-categorise/SKILL.md) | connected | How a UK bookkeeper categorises a small company's transactions — which account, the tax effect, and when to ask — with suppliers created in QuickBooks. |
| [`topy-cfo-journals`](plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-journals/SKILL.md) | core | Books the journals a bookkeeper needs — accruals, prepayments, reclassifications, corrections — balanced, numbered once and previewed before they reach QuickBooks. |
| [`topy-cfo-month-end-close`](plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-month-end-close/SKILL.md) | core | Closes a month the way a senior accountant does — Stripe booked and reconciled, bank feed cleared, nothing uncategorised, every bank reconciled to its statement — then management accounts and the c-level reports. |
| [`topy-cfo-share-capital`](plugins/topy-ai-cfo-bookkeeping/skills/topy-cfo-share-capital/SKILL.md) | core | Keeps share capital as Companies House shows it — shares issued at their nominal value, what each shareholder still owes, and their payments booked against it, not as income. |

### Stripe service agent · `topy-ai-cfo-stripe`

| Skill | Tier | What it does |
|---|---|---|
| [`stripe-official-mcp`](plugins/topy-ai-cfo-stripe/skills/stripe-official-mcp/SKILL.md) | connected | When money must move in Stripe — a refund, a payment link, a subscription change — the CFO drafts it and the founder does it through Stripe's official MCP server or dashboard, never through TOPY's read-only key. |
| [`stripe-revenue-ops`](plugins/topy-ai-cfo-stripe/skills/stripe-revenue-ops/SKILL.md) | core | The CFO's watch on Stripe — balance and payouts, the month's sales, refunds and fees, failed payments and disputes — with the chasing handed to the CRO. |
| [`stripe-to-books`](plugins/topy-ai-cfo-stripe/skills/stripe-to-books/SKILL.md) | core | Books Stripe in QuickBooks the way an accountant does — one journal per month (sales by plan, refunds, fees) and one transfer per payout — so the Stripe account always equals Stripe's balance and each payout matches the bank. |

### QuickBooks service agent · `topy-ai-cfo-quickbooks`

| Skill | Tier | What it does |
|---|---|---|
| [`qbo-bank-feed-match`](plugins/topy-ai-cfo-quickbooks/skills/qbo-bank-feed-match/SKILL.md) | core | Matches QuickBooks' bank feed in Chrome — Stripe payouts to their transfers, transfers between the company's own accounts paired — acting only where the date and amount match exactly, with every key press checked first. |
| [`qbo-bank-rules`](plugins/topy-ai-cfo-quickbooks/skills/qbo-bank-rules/SKILL.md) | core | Creates QuickBooks bank rules in Chrome from the CFO's rule list — supplier, account, conditions, auto-post — testing each rule's match count before saving, so recurring transactions post themselves correctly. |
| [`qbo-close-books`](plugins/topy-ai-cfo-quickbooks/skills/qbo-close-books/SKILL.md) | core | After a close, sets QuickBooks' closing date in Chrome (with the founder's yes) so nobody changes a reported month by accident. |
| [`qbo-reconcile`](plugins/topy-ai-cfo-quickbooks/skills/qbo-reconcile/SKILL.md) | core | Reconciles each bank account to its statement — record the statement balance, compare it with QuickBooks, find the difference — and, with the founder, completes QuickBooks' own Reconcile in Chrome. |
| [`qbo-reports`](plugins/topy-ai-cfo-quickbooks/skills/qbo-reports/SKILL.md) | core | Reads QuickBooks' reports — profit and loss, balance sheet, cash flow, trial balance, general ledger, aged debtors and creditors — and explains them in plain words with the figures behind them. |

### Reporting & runway · `topy-ai-cfo-reporting`

| Skill | Tier | What it does |
|---|---|---|
| [`topy-cfo-clevel-reports`](plugins/topy-ai-cfo-reporting/skills/topy-cfo-clevel-reports/SKILL.md) | core | One-screen finance reports for each AI cofounder — CEO, CMO, CTO, CRO, CPO, COO, CSO — and the board, each with the numbers that role owns, its flags, and the questions the CFO needs that role to answer. |
| [`topy-cfo-management-accounts`](plugins/topy-ai-cfo-reporting/skills/topy-cfo-management-accounts/SKILL.md) | core | The month's management accounts in one page — P&L against last month, cash and runway, balance sheet highlights, KPIs and the CFO's commentary — built from QuickBooks and Stripe after the close. |
| [`topy-cfo-runway`](plugins/topy-ai-cfo-reporting/skills/topy-cfo-runway/SKILL.md) | core | How long the cash lasts, the cash floor, and what to do about it — from real monthly net in QuickBooks and Stripe's pending balance, with three costed options when runway is under 12 months. |

### UK compliance · `topy-ai-cfo-compliance`

| Skill | Tier | What it does |
|---|---|---|
| [`topy-cfo-uk-deadlines`](plugins/topy-ai-cfo-compliance/skills/topy-cfo-uk-deadlines/SKILL.md) | core | Every UK company deadline in one list — annual accounts, Corporation Tax payment and CT600 (split when the first period is over 12 months), confirmation statement — from Companies House, with days left and who does it. |
| [`topy-cfo-vat-watch`](plugins/topy-ai-cfo-compliance/skills/topy-cfo-vat-watch/SKILL.md) | core | Watches taxable turnover over the rolling 12 months against the UK VAT registration threshold (£90,000) and warns early, so the company registers on time — or confirms it doesn't need to. |
| [`topy-cfo-year-end`](plugins/topy-ai-cfo-compliance/skills/topy-cfo-year-end/SKILL.md) | core | Gets a financial year ready for the statutory accounts and the CT600 — every month closed, trial balance, year-end adjustments, tax add-backs — as a checklist with figures for the founder or their accountant. |

<!-- skills:end -->
