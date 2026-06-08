import React, { useState } from 'react';
import { StripeProduct } from '../../stripe-config';
import { createCheckoutSession } from '../../lib/stripe';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

interface ProductCardProps {
  product: StripeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async () => {
    setLoading(true);
    setError('');

    try {
      const { url } = await createCheckoutSession({
        price_id: product.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: window.location.href,
        mode: product.mode,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout process');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {product.name}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {product.description}
      </p>

      {product.price_per_unit && product.currency_symbol && (
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {product.currency_symbol}{product.price_per_unit}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-500 ml-1">/month</span>
          )}
        </div>
      )}

      {error && (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Button
        onClick={handlePurchase}
        loading={loading}
        className="w-full"
      >
        {product.mode === 'subscription' ? 'Subscribe' : 'Donate Now'}
      </Button>
    </div>
  );
}