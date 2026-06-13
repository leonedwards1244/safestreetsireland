import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

function corsResponse(body: string | object | null, status = 200) {
  if (status === 204) {
    return new Response(null, { status, headers: corsHeaders });
  }
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return corsResponse(null, 204);
  }

  if (req.method !== 'POST') {
    return corsResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const { price_id, success_url, cancel_url, mode, amount_cents, guest_email, guest_name } = await req.json();

    if (!success_url || typeof success_url !== 'string') {
      return corsResponse({ error: 'Missing required parameter success_url' }, 400);
    }
    if (!cancel_url || typeof cancel_url !== 'string') {
      return corsResponse({ error: 'Missing required parameter cancel_url' }, 400);
    }
    if (!mode || !['payment', 'subscription'].includes(mode)) {
      return corsResponse({ error: 'Expected parameter mode to be one of payment, subscription' }, 400);
    }

    // Auth is optional — donations work as guest
    const authHeader = req.headers.get('Authorization');
    let user = null;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user: authUser } } = await supabase.auth.getUser(token);
      user = authUser;
    }

    // Build line items — support custom amount for donations
    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    if (amount_cents && typeof amount_cents === 'number' && amount_cents >= 100) {
      lineItems = [
        {
          price_data: {
            currency: 'eur',
            unit_amount: amount_cents,
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
      return corsResponse({ error: 'Either price_id or amount_cents (min 100) is required' }, 400);
    }

    // For authenticated users, look up or create Stripe customer
    let customerId: string | undefined;
    if (user) {
      const { data: customer } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .maybeSingle();

      if (customer?.customer_id) {
        customerId = customer.customer_id;
      } else {
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: { userId: user.id },
        });
        await supabase.from('stripe_customers').insert({
          user_id: user.id,
          customer_id: newCustomer.id,
        });
        customerId = newCustomer.id;
      }
    }

    // Use automatic_payment_methods so Stripe enables all eligible methods
    // including Apple Pay, Google Pay, and card — based on device & browser
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      automatic_payment_methods: { enabled: true },
      line_items: lineItems,
      mode,
      success_url,
      cancel_url,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    } else {
      // Prefill email if provided; pass name via metadata for receipt
      if (guest_email && typeof guest_email === 'string') {
        sessionParams.customer_email = guest_email;
      }
      if (guest_name && typeof guest_name === 'string') {
        sessionParams.metadata = { donor_name: guest_name };
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
    return corsResponse({ error: error.message }, 500);
  }
});
