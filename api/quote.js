/* POST /api/quote
   Called when the client submits the form. Creates the private quote link and sends everything
   to the HighLevel workflow (Inbound Webhook trigger), which emails the link to the client.
   The client never sees prices on the form: the only way in is the link in the email. */
const { sign } = require('../lib/token');
const { cleanAnswers, summary, siteUrl, readJson } = require('../lib/quote');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const hook = process.env.GHL_WEBHOOK_URL;
  if (!hook) return res.status(500).json({ error: 'GHL_WEBHOOK_URL is not set' });

  const body = await readJson(req);
  if (!body) return res.status(400).json({ error: 'Invalid JSON' });
  const a = cleanAnswers(body.answers);
  const c = body.consent || {};
  if (!/^\S+@\S+\.\S+$/.test(a.email || '')) return res.status(400).json({ error: 'A valid email is required' });
  if (!c.email) return res.status(400).json({ error: 'Email consent is required' });

  const quote_id = 'NV-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
  let token, s;
  try {
    s = summary(a);
    token = sign({ v: 1, id: quote_id, iat: Date.now(), a });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
  const quote_link = `${siteUrl(req)}/q/?t=${token}`;
  const list = v => (Array.isArray(v) ? v.join(', ') : v || '');

  /* Flat fields map easily in a GHL workflow: {{inboundWebhookRequest.quote_link}} etc. */
  const payload = {
    quote_id, quote_link,
    email: a.email, first_name: a.fname || '', last_name: a.lname || '',
    full_name: [a.fname, a.lname].filter(Boolean).join(' '),
    phone: a.phone || '', company_name: a.biz || '',
    services: list(a.services), timeline: a.timeline || '',
    products: s.text,
    due_to_start: s.r ? '$' + Math.round(s.T.due).toLocaleString('en-US') : '',
    recurring: s.T.text,
    needs_review: s.r.review.length ? 'yes' : 'no',
    enterprise: s.r.ent ? 'yes' : 'no',
    pay_online: s.plan.payable ? 'yes' : 'no',
    offer_shown: body.offer?.shown || '', offer_accepted: body.offer?.accepted || '',
    email_consent: 'yes', email_consent_text: c.email_text || '',
    sms_consent: c.sms ? 'yes' : 'no', sms_consent_text: c.sms_text || '',
    consent_at: c.at || '', page: body.page || '', submitted_at: new Date().toISOString(),
    answers: a
  };

  try {
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!r.ok) return res.status(502).json({ error: 'CRM rejected the quote (' + r.status + ')' });
  } catch {
    return res.status(502).json({ error: 'Could not reach the CRM' });
  }
  /* The link is NOT returned to the browser: it only goes out by email. */
  return res.status(200).json({ quote_id, status: 'sent' });
};
