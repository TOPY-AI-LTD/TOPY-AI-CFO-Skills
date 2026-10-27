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

Create a bank rule
1. qbo_bank_rules_list / qbo_bank_rules_suggest → the rule spec (save it with qbo_bank_rule_save, status proposed).
2. Accounting → Rules → New rule: name; Money out/in; the bank account only (untick the others); conditions;
   All/Any; Test rule → must equal expected_matches.
3. Category: type the account name and pick the existing one (not "Add new account"); Payee: pick the existing supplier.
4. Paste RULE_FORM_HELPERS and run __cfoRule(): every field must be right. Save.
5. qbo_bank_rule_save again with status applied; check the posted expenses with qbo_transactions_list.
