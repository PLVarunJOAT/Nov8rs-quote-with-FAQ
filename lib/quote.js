/* Server-side quote helpers: one engine instance, answer cleanup, plain-text summary. */
const { COMPANY, createEngine, checkoutPlan } = require('../quote-engine.js');
const E = createEngine(COMPANY);

/* Only keep real answers (no internal "_" keys), and only the question ids the form knows. */
function cleanAnswers(a) {
  const out = {};
  if (!a || typeof a !== 'object') return out;
  for (const k of Object.keys(E.Q).concat(['billing', 'platform_plan'])) {
    const v = a[k];
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) out[k] = v.map(String).slice(0, 20);
    else if (typeof v === 'boolean') out[k] = v;
    else out[k] = String(v).slice(0, 1000);
  }
  return out;
}

function summary(a) {
  const r = E.build(a);
  const T = E.totals(r, a.billing);
  const text = r.lines.map(l => `- ${l.name}${l.included ? ' (included)' : ''}`).join('\n');
  return { r, T, text, plan: checkoutPlan(E, r, a.billing) };
}

function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${req.headers['x-forwarded-host'] || req.headers.host}`;
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return null; } }
  return null;
}

module.exports = { E, COMPANY, checkoutPlan, cleanAnswers, summary, siteUrl, readJson };
