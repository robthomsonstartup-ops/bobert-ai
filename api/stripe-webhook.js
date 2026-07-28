// api/stripe-webhook.js
// Vercel serverless function — Stripe Webhook Handler
// Listens for Stripe events and updates subscription state.
// IMPORTANT: This function needs the raw request body to verify the Stripe signature.
// See vercel.json for the bodyParser: false config required for this route.
//
// Env vars required:
//   STRIPE_SECRET_KEY       sk_test_... / sk_live_...
//   STRIPE_WEBHOOK_SECRET   whsec_... (from Stripe dashboard → Webhooks → Signing secret)
//
// Webhook events to register in Stripe dashboard:
//   checkout.session.completed
//   customer.subscription.updated
//   customer.subscription.deleted

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Disable Vercel's default body parser — Stripe needs the raw body to verify signature
export const config = {
  api: {
    bodyParser: false,
  },
};

// Read raw body from the request stream
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('[stripe-webhook] Missing signature or webhook secret');
    return res.status(400).json({ error: 'Missing stripe-signature header or STRIPE_WEBHOOK_SECRET env var' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  console.log(`[stripe-webhook] Received event: ${event.type} — id: ${event.id}`);

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object;
        // Trial has started — customer has entered card details.
        // They are NOT charged yet. Charge happens after 30-day trial.
        console.log('[stripe-webhook] Trial started:', {
          customerId:     session.customer,
          subscriptionId: session.subscription,
          customerEmail:  session.customer_email,
          plan:           session.metadata?.plan,
          status:         'trialing',
        });
        // TODO (post-beta): write to user DB — mark account as trialing
        // await db.users.upsert({ stripeCustomerId: session.customer, status: 'trialing', plan: session.metadata?.plan })
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const status = subscription.status;
        // status values: trialing → active (trial converts to paid), past_due, canceled, etc.
        console.log('[stripe-webhook] Subscription updated:', {
          customerId:     subscription.customer,
          subscriptionId: subscription.id,
          status:         status,
          plan:           subscription.metadata?.plan,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        });
        // Key transition: trialing → active = first charge successful, user is now paid
        if (status === 'active') {
          console.log('[stripe-webhook] ✓ Trial converted to paid — customer:', subscription.customer);
          // TODO: update user DB to paid status, send welcome/paid confirmation email
        }
        if (status === 'past_due') {
          console.log('[stripe-webhook] ⚠ Payment past due — customer:', subscription.customer);
          // TODO: trigger dunning email via Brevo
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log('[stripe-webhook] Subscription canceled:', {
          customerId:     subscription.customer,
          subscriptionId: subscription.id,
          canceledAt:     new Date(subscription.canceled_at * 1000).toISOString(),
        });
        // TODO: update user DB to canceled, restrict access
        break;
      }

      default:
        // Unhandled event type — log and return 200 so Stripe doesn't retry
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[stripe-webhook] Handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
