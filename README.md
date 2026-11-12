# NOV8RS Quote Builder

How it works:

1. The client fills in the form at `/`. They **never see prices on the form**. At the end they get a
   thank-you screen: "Your quote is on its way to your email."
2. `api/quote.js` creates a **private, signed quote link** and sends it, with the client's details, to
   your **HighLevel workflow**. HighLevel creates the contact and emails the link.
3. The link opens `/q/`, a **personalised quote page** built from the services they picked, with
   full pricing and a **Pay with Stripe** button.
4. After paying, Stripe sends them to `/q/paid.html`. `api/stripe-webhook.js` tells HighLevel they paid.

No database: the link itself carries the client's answers with a tamper-proof signature, and prices are
always recalculated from the catalog in `quote-engine.js`, so nobody can edit a link to change a price.

## Files

```
index.html            the form (ends on the thank-you screen)
q/index.html          the personalised quote page (opened from the email link)
q/paid.html           shown after a successful payment
quote-engine.js       catalog, prices, questions and pricing rules (shared by pages and server)
styles.css            shared styles
brand/                logo, mark, favicon
api/quote.js          form submit → signed link → HighLevel
api/quote-view.js     checks a link and returns the quote
api/checkout.js       opens Stripe Checkout
api/stripe-webhook.js Stripe "paid" → HighLevel
lib/                  link signing + server helpers
package.json          installs Stripe on Vercel
```

**Must be hosted on Vercel** (GitHub Pages can't run the `api/` functions).

## Editing FAQs and use cases

All help content lives in `quote-engine.js` under **HELP CONTENT**:
- `faq`: 12 questions and answers per topic (Branding, Website, Paid Ads, Social Media, Cold Email,
  GAS-EO, AI & Automation, Pricing & Billing). Each entry is `['Question','Answer']`. Entries ending
  in `,1` depend on company policy (ownership, timelines, contracts) and should be confirmed.
- `insights`: the right-hand panel per topic: "Good choice if", "This can lead to", and recommended
  pairings (each with a one-click **+ Add** button).

The form shows the FAQs for whatever service the client just clicked, under every step. The emailed
quote page shows FAQs for the services on that client's quote, plus Pricing & Billing.

## Mascot assistant

The NOV8RS robot in the bottom-right corner greets clients, reacts to their choices, highlights services
that pair well, and shares one "Did you know?" tip at a time (never repeating a tip in the same visit).

- Pose images: `brand/mascot/mascot-{idle,wave,hug,think,celebrate}.webp` (background removed).
- Tips (60) and reactions: `quote-engine.js` → `tips` and `reactions`. Each tip is tagged with a topic so it
  matches the step the client is on; "Tell me more" opens that topic's FAQs.
- Pairing highlights ("Pairs well"): `quote-engine.js` → `suggest` and `suggestWhy`.
- Clients can close a tip or choose "Hide tips"; that choice is remembered on their device.
- Trust signals under the first question: add real figures to `brand.proof` in `quote-engine.js`
  (left empty on purpose until you have numbers you can stand behind).

## Sending the quote email by SMTP (later)

`api/quote.js` currently hands the quote and its private link to your HighLevel workflow, which sends the
email. To send it straight from your own mail server instead, replace the `fetch(hook, …)` call in
`api/quote.js` with an SMTP send (for example with the `nodemailer` package) using the same `payload`
fields (`email`, `first_name`, `quote_link`, `products`, …). The front end doesn't need to change.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | What it is |
|---|---|
| `QUOTE_SECRET` | Any long random string (40+ characters). Signs the quote links. Never change it once live, or old links stop working. |
| `GHL_WEBHOOK_URL` | The Inbound Webhook URL from your HighLevel "Quote submitted" workflow. |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret key (`sk_test_…` to test, `sk_live_…` to go live). |
| `STRIPE_WEBHOOK_SECRET` | From the Stripe webhook you add (starts `whsec_…`). |
| `GHL_PAID_WEBHOOK_URL` | Optional. Inbound Webhook URL of a second HighLevel workflow for "Paid". |
| `SITE_URL` | Optional. e.g. `https://quote.nov8rs.io`. Used to build links; defaults to the current domain. |
| `QUOTE_LINK_DAYS` | Optional. How long a quote link works. Default 30. |
| `STRIPE_CURRENCY` | Optional. Default `usd`. |

After adding or changing variables, redeploy (Deployments → ⋯ → Redeploy).

## HighLevel: "Quote submitted" workflow

1. Automation → Workflows → Create → Start from scratch.
2. Trigger: **Inbound Webhook**. Copy its URL into `GHL_WEBHOOK_URL`, redeploy, then submit one test
   quote so HighLevel can see a sample, and click **Save trigger**.
3. Action: **Create/Update Contact**. Map email, first name, last name, phone, company name from
   `inboundWebhookRequest`.
4. Optional actions: add tags (e.g. `quote-sent`), create an opportunity, save `quote_link` to a
   custom contact field so your team can open it later.
5. Action: **Send Email**. Subject e.g. "Your NOV8RS quote is ready". Add a button
   **View my quote** linking to `{{inboundWebhookRequest.quote_link}}`.
6. Publish the workflow.

Fields available: `quote_id, quote_link, email, first_name, last_name, full_name, phone, company_name,
services, timeline, products, due_to_start, recurring, needs_review, enterprise, pay_online,
email_consent, sms_consent, consent_at, submitted_at`.

## Stripe

1. Add `STRIPE_SECRET_KEY` (start with the test key).
2. Stripe → Developers → Webhooks → Add endpoint: `https://<your-domain>/api/stripe-webhook`,
   event `checkout.session.completed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
3. Test with card `4242 4242 4242 4242`, any future date and any CVC.

Checkout rules (in `quote-engine.js` → `checkoutPlan`):
- One-time items + the first month of monthly items are charged today; monthly items then renew automatically.
- Items that start in month 2 (cold email management, ad management after a launch) are **not** charged
  at checkout; they show on the quote as "starts month 2" and need adding to the subscription later.
- Per-lead fees are never charged at checkout.
- Quotes with "needs review", "from" prices or Enterprise show **Book a call** instead of a pay button.
- Yearly billing is offered only when every recurring item has a yearly price (Stripe can't mix monthly
  and yearly in one subscription).

## Testing

- Design check without any setup: open `/q/?demo=1`.
- Open the form with `#rules` to see the branch rule on each question, or `#prices` to see the old
  on-screen priced quote (internal only).
