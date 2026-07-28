// api/create-checkout-session.js
// Vercel serverless function — Stripe Checkout Session
// Creates a hosted Checkout session with 30-day trial for the requested plan tier.
// Deploy: commit + push to main — Vercel auto-deploys.
// Env vars required (Vercel dashboard → Settings → Environment Variables):
//   STRIPE_SECRET_KEY          sk_test_... (test) / sk_live_... (live)
//   STRIPE_PRICE_SOLO          price_... from Stripe dashboard
//   STRIPE_PRICE_PROFESSIONAL  price_...
//   STRIPE_PRICE_TEAM          price_...
//   STRIPE_PRICE_ENTERPRISE    price_...

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  solo:         process.env.STRIPE_PRICE_SOLO,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  team:         process.env.STRIPE_PRICE_TEAM,
  enterprise:   process.env.STRIPE_PRICE_ENTERPRISE,
};

module.exports = async function handler(req, res) {
  // CORS — allow bobert.ai and localhost for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { plan, email } = req.body;

  if (!plan || !PRICE_IDS[plan]) {
    return res.status(400).json({ error: `Invalid plan: ${plan}. Valid: solo, professional, team, enterprise` });
  }

  if (!PRICE_IDS[plan]) {
    return res.status(500).json({ error: `Price ID for plan "${plan}" not configured. Set STRIPE_PRICE_${plan.toUpperCase()} in Vercel env vars.` });
  }

  try {
    const sessionParams = {
      mode: 'subscription',
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 30,
        metadata: {
          plan: plan,
        },
      },
      // Pre-fill email if passed from the frontend (e.g. from Brevo beta signup)
      ...(email && { customer_email: email }),
      // After successful checkout → /success?session_id={CHECKOUT_SESSION_ID}
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://bobert.ai'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL || 'https://bobert.ai'}/upgrade`,
      // Collect billing address (required for tax calculation later)
      billing_address_collection: 'required',
      // Allow promo codes — easy to add later without code changes
      allow_promotion_codes: true,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout-session] Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
