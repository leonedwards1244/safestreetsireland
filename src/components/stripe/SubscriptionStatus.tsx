import React, { useEffect, useState } from 'react';
import { getUserSubscription } from '../../lib/stripe';
import { getProductByPriceId } from '../../stripe-config';
import { Alert } from '../ui/Alert';

interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
}

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const data = await getUserSubscription();
      setSubscription(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error">
        {error}
      </Alert>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Subscription Status
        </h3>
        <p className="text-gray-600">No active subscription</p>
      </div>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  const isActive = subscription.subscription_status === 'active';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Subscription Status
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Plan:</span>
          <span className="font-medium">
            {product?.name || 'Unknown Plan'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
            {subscription.subscription_status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        
        {subscription.current_period_end && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              {subscription.cancel_at_period_end ? 'Expires:' : 'Renews:'}
            </span>
            <span className="font-medium">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {subscription.cancel_at_period_end && (
          <Alert type="warning" className="mt-4">
            Your subscription will not renew and will expire on{' '}
            {subscription.current_period_end && 
              new Date(subscription.current_period_end * 1000).toLocaleDateString()
            }.
          </Alert>
        )}
      </div>
    </div>
  );
}