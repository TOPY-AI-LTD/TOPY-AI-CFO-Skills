// Paste into QuickBooks Rules with the Create rule panel open. Generated from @topy-ai/cfo-cli chrome-kit.
window.__cfoRule = () => {
  const p = [...document.querySelectorAll('div')].find(d => d.innerText && d.innerText.startsWith('Create rule') && d.querySelector('input'));
  if (!p) return 'no Create rule panel';
  const acct = (p.innerText.match(/in\s*\n?\s*(Tide [A-Za-z ]+Account|All bank accounts|[A-Z][\w ]+Account)/) || [])[1];
  const matched = (document.body.innerText.match(/apply to (\d+) currently/) || [])[1];
  const fields = [...p.querySelectorAll('input, [role=combobox], button[aria-haspopup]')]
    .map(e => (e.getAttribute('aria-label') || e.name || e.placeholder || '') + '=' + (e.type === 'checkbox' ? e.checked : (e.value || e.innerText || '').slice(0, 40)))
    .filter(s => !s.endsWith('='));
  return { test_rule_matches: matched ? Number(matched) : null, account: acct, fields };
};
'ready to use: __cfoRule() before pressing Save'
