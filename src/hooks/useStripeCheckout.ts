import { useState } from 'react';
import { stripeProducts } from '../stripe-config';

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    setLoading(true);
    
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/`,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkoutDonation = () => {
    const donationProduct = stripeProducts.find(p => p.name === 'DONATIONS');
    if (donationProduct) {
      createCheckoutSession(donationProduct.priceId);
    }
  };

  return {
    loading,
    checkoutDonation,
    createCheckoutSession,
  };
}