Rules for driving QuickBooks in Chrome
1. The user signs in to QuickBooks; never type a password. If the wrong company is open, stop and ask.
2. Read first: list the pending lines (date, description, amount, QuickBooks' suggestion) before acting.
3. Act only where the date and the amount match the expected transfer exactly (qbo_bank_feed_expectations).
4. Before every key press run the check helper; press only when it returns "ready".
5. One line per step; afterwards check the Pending count dropped by one. A press may take effect late: wait, never press again.
6. Bank rules: run Test rule; save only when the count equals expected_matches. Otherwise find out why (a card descriptor
   can be an address: "Lincoln House" was OVHcloud).
7. Cancel any unexpected dialog (e.g. "New account"). Stop after 3 failed tries and tell the user.
8. Afterwards verify with the API: qbo_transactions_list, qbo_accounts_list (bank balances), qbo_bank_rule_save status applied.

Match a Stripe payout (or another booked transfer)
1. qbo_bank_feed_expectations → the transfers with date and amount (kind stripe_payout).
2. Open QuickBooks → Accounting → Bank transactions → the bank account; search "stripe" (or the amount).
3. Paste BANK_FEED_HELPERS. For each expected transfer: __cfo.match('DD/MM/YYYY', '123.45') → only if "ready", press Enter.
4. Wait ~10 s; __cfo.pending() must drop by 1. Then the next one. The Posted tab shows "Matched Transfer".

Pair a transfer between the company's own accounts
1. Search the description (e.g. "Savings") on the paying account.
2. __cfo.pair('DD/MM/YYYY', '300.00', 'Tide Saver Account') → "ready" → Enter. When QuickBooks found 2 suggested pairs,
   open the line and pick the other account's line with the same date by hand (or ask the user).
