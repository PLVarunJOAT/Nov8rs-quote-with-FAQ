/* POST /api/stripe-webhook  (add this URL in Stripe → Developers → Webhooks,
   event: checkout.session.completed). Tells HighLevel the client paid, via a second
   Inbound Webhook (GHL_PAID_WEBHOOK_URL), so a "paid" workflow can tag them, move the
   opportunity and send onboarding. Needs STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET. */
const Stripe = require('stripe');

const raw = req => new Promise((ok, fail) => {
  const chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', () => ok(Buffer.concat(chunks)));
  req.on('error', fail);
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(await raw(req), req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).send('Bad signature');
  }
  if (event.type === 'checkout.session.completed' && process.env.GHL_PAID_WEBHOOK_URL) {
    const s = event.data.object;
    const m = s.metadata || {};
    await fetch(process.env.GHL_PAID_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quote_id: m.quote_id || s.client_reference_id || '', email: s.customer_details?.email || m.email || '',
        full_name: s.customer_details?.name || m.name || '', company_name: m.company || '',
        amount_paid: ((s.amount_total || 0) / 100).toFixed(2), currency: (s.currency || '').toUpperCase(),
        mode: s.mode, stripe_customer: s.customer || '', stripe_subscription: s.subscription || '',
        paid_at: new Date((event.created || Date.now() / 1000) * 1000).toISOString()
      })
    }).catch(() => {});
  }
  return res.status(200).json({ received: true });
};
module.exports.config = { api: { bodyParser: false } };
