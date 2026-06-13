import { STRIPE_PRODUCTS } from '../stripe-config';

export interface CheckoutRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export const createCheckoutSession = async (
  amount: number,
  donorName?: string,
  message?: string
): Promise<{ url: string }> => {
  const donationProduct = STRIPE_PRODUCTS.find(p => p.name === 'DONATIONS');
  
  if (!donationProduct) {
    throw new Error('Donation product not found');
  }

  const metadata: Record<string, string> = {
    amount: (amount * 100).toString(), // Convert to cents
    currency: 'EUR'
  };

  if (donorName) metadata.donor_name = donorName;
  if (message) metadata.message = message;

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: donationProduct.priceId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: window.location.origin,
      metadata
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const data = await response.json();
  return data;
};