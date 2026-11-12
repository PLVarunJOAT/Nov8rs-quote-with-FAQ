/* POST /api/checkout  { t: <quote token>, billing: 'monthly' | 'yearly' }
   Recalculates the quote from the catalog and opens a Stripe Checkout page.
   Needs STRIPE_SECRET_KEY in Vercel. Uses subscription mode when there is anything recurring
   (one-time items are added to the first invoice), payment mode otherwise. */
const Stripe = require('stripe');
const { verify, expired } = require('../lib/token');
const { summary, siteUrl, readJson } = require('../lib/quote');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'STRIPE_SECRET_KEY is not set' });

  const body = await readJson(req);
  const p = body && verify(String(body.t || ''));
  if (!p) return res.status(404).json({ error: 'This quote link is not valid.' });
  if (expired(p)) return res.status(410).json({ error: 'This quote link has expired.' });

  const a = { ...p.a, billing: body.billing === 'yearly' ? 'yearly' : 'monthly' };
  const { plan } = summary(a);
  if (!plan.payable) return res.status(409).json({ error: 'This quote needs a quick review before it can be paid online.' });

  const currency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase();
  const recurring = plan.items.some(i => i.interval);
  const line_items = plan.items.map(i => ({
    quantity: 1,
    price_data: {
      currency,
      unit_amount: Math.round(i.amount * 100),
      product_data: { name: i.name },
      ...(i.interval ? { recurring: { interval: i.interval } } : {})
    }
  }));
  const meta = { quote_id: p.id, email: a.email || '', name: [a.fname, a.lname].filter(Boolean).join(' '), company: a.biz || '' };
  const base = siteUrl(req);

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: recurring ? 'subscription' : 'payment',
      line_items,
      customer_email: a.email || undefined,
      client_reference_id: p.id,
      metadata: meta,
      ...(recurring ? { subscription_data: { metadata: meta } } : { payment_intent_data: { metadata: meta }, invoice_creation: { enabled: true } }),
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${base}/q/paid.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/q/?t=${encodeURIComponent(body.t)}`
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    return res.status(502).json({ error: 'Payment page could not be opened: ' + (e.message || 'Stripe error') });
  }
};
