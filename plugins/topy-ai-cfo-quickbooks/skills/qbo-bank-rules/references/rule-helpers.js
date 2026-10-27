// Paste into QuickBooks Rules (the list, or with the Create rule panel open). Generated from @topy-ai/cfo-cli chrome-kit.
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
// Accounting → Rules: every rule as QuickBooks shows it, to compare with qbo_bank_rules_list (read only).
window.__cfoRules = () => {
  const headRow = [...document.querySelectorAll('tr')].find(r => /Rule name/.test(r.innerText) && /Conditions/.test(r.innerText));
  if (!headRow) return 'no rules table (open Accounting → Rules)';
  const head = [...headRow.children].map(h => h.innerText.replace(/\s+/g, ' ').trim());
  const at = (name) => head.findIndex(h => h.startsWith(name));
  const text = (c) => (c ? (c.getAttribute('title') || c.innerText) : '').replace(/\s+/g, ' ').trim();
  const full = (c) => (c && [...c.querySelectorAll('[title]')].map(x => x.getAttribute('title')).find(Boolean)) || text(c);
  return [...document.querySelectorAll('tr')]
    .filter(r => r !== headRow && r.children.length === head.length && /^\d+$/.test(text(r.children[at('Priority')])))
    .map(r => {
      const c = [...r.children];
      return { priority: Number(text(c[at('Priority')])), name: full(c[at('Rule name')]), applied_to: full(c[at('Applied to')]),
               conditions: full(c[at('Conditions')]), settings: full(c[at('Settings')]),
               auto_post: !!(c[at('Auto-post')] && c[at('Auto-post')].querySelector('svg, img, [class*="check" i]')), status: text(c[at('Status')]) };
    });
};
'ready to use: __cfoRule() before pressing Save; __cfoRules() on the Rules list'
