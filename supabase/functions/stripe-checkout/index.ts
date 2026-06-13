import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: { name: 'Bolt Integration', version: '1.0.0' },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await req.json();
    const { price_id, success_url, cancel_url, mode, amount_cents, guest_email, guest_name } = body;

    if (!success_url || typeof success_url !== 'string') {
      return jsonResponse({ error: 'Missing required parameter: success_url' }, 400);
    }
    if (!cancel_url || typeof cancel_url !== 'string') {
      return jsonResponse({ error: 'Missing required parameter: cancel_url' }, 400);
    }
    if (!mode || !['payment', 'subscription'].includes(mode)) {
      return jsonResponse({ error: 'Parameter mode must be payment or subscription' }, 400);
    }

    // Auth is optional — guest donations are allowed
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      userId = data?.user?.id ?? null;
    }

    // Build line items — custom amount takes priority, then price_id
    let lineItems;
    if (typeof amount_cents === 'number' && amount_cents >= 100) {
      lineItems = [
        {
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(amount_cents),
            product_data: {
              name: 'Donation — Safe Streets Ireland',
              description: 'Supporting families and youths affected by youth crime and violence',
            },
          },
          quantity: 1,
        },
      ];
    } else if (price_id && typeof price_id === 'string') {
      lineItems = [{ price: price_id, quantity: 1 }];
    } else {
      return jsonResponse({ error: 'Either price_id or amount_cents (minimum €1) is required' }, 400);
    }

    // Look up or create Stripe customer for authenticated users
    let customerId: string | undefined;
    if (userId) {
      const { data: existing } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .maybeSingle();

      if (existing?.customer_id) {
        customerId = existing.customer_id;
      } else {
        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        const customer = await stripe.customers.create({
          email: userData?.user?.email,
          metadata: { userId },
        });
        await supabase.from('stripe_customers').insert({ user_id: userId, customer_id: customer.id });
        customerId = customer.id;
      }
    }

    // Omitting payment_method_types lets Stripe Checkout automatically enable
    // all payment methods configured in the Dashboard — including Apple Pay,
    // Google Pay, cards, and any other region-appropriate methods.
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: lineItems,
      mode,
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else {
      if (guest_email && typeof guest_email === 'string') {
        sessionParams.customer_email = guest_email.trim().toLowerCase();
      }
      if (guest_name && typeof guest_name === 'string') {
        sessionParams.metadata = { donor_name: guest_name.trim() };
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      return jsonResponse({ error: 'Stripe did not return a checkout URL' }, 500);
    }

    return jsonResponse({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('stripe-checkout error:', err.message);
    // Surface the raw Stripe error so the frontend can display it clearly
    return jsonResponse({ error: err.message ?? 'Unexpected error creating checkout session' }, 500);
  }
});
