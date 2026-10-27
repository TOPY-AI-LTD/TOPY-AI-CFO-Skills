// Paste into QuickBooks Bank transactions (the page JavaScript tool). Generated from @topy-ai/cfo-cli chrome-kit.
window.__cfo = {
  pending: () => (document.body.innerText.match(/Pending \((\d+)\)/) || [])[1],
  rows: () => [...document.querySelectorAll('[role="row"], tr')].filter(r => /\d\d\/\d\d\/\d{4}/.test(r.innerText))
    .map(r => r.innerText.replace(/\s+/g, ' ').trim()),
  _focus: (date, amount, want, button) => {
    const bail = (why) => { if (document.activeElement) document.activeElement.blur(); return why; };
    const rows = [...document.querySelectorAll('[role="row"], tr')]
      .filter(r => r.innerText.includes(date) && r.innerText.includes(amount));
    if (rows.length !== 1) return bail('rows=' + rows.length);
    const t = rows[0].innerText;
    if (!want(t)) return bail('suggestion does not match: ' + t.replace(/\s+/g, ' ').slice(0, 160));
    const b = [...rows[0].querySelectorAll('button')].find(x => x.innerText.trim() === button);
    if (!b) return bail('no ' + button + ' button');
    b.focus();
    return document.activeElement === b ? 'ready' : bail('focus failed');
  },
  // A Stripe payout (or any transfer we booked): QuickBooks must suggest "Transfer - <same date>" with the same amount.
  match: (date, amount) => window.__cfo._focus(date, amount,
    t => t.includes('Transfer - ' + date) && (t.match(new RegExp(amount.replace('.', '\\.'), 'g')) || []).length >= 2, 'Match'),
  // A transfer between two of the company's own connected accounts: QuickBooks shows PAIR with the other account.
  pair: (date, amount, otherAccount) => window.__cfo._focus(date, amount,
    t => /PAIR/.test(t) && t.includes(otherAccount) && !/suggested pairs/.test(t), 'Post'),
};
'ready to use: __cfo.pending(), __cfo.rows(), __cfo.match(date, amount), __cfo.pair(date, amount, account)'
