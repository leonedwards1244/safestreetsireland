import React, { useState, useEffect } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface SubscriptionInfo {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  payment_method_brand?: string;
  payment_method_last4?: string;
}

export const UserSubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .single();

        if (!error && data) {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!user || !subscription) {
    return null;
  }

  const isActive = subscription.subscription_status === 'active';
  const isPastDue = subscription.subscription_status === 'past_due';
  const willCancel = subscription.cancel_at_period_end;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Crown className={`w-5 h-5 mr-2 ${isActive ? 'text-yellow-500' : 'text-gray-400'}`} />
          <span className="font-medium text-gray-900">
            {isActive ? 'Active Subscription' : 'Subscription Status'}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-green-100 text-green-800' 
            : isPastDue 
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {subscription.subscription_status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {isActive && (
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {willCancel ? 'Ends on' : 'Renews on'} {formatDate(subscription.current_period_end)}
            </span>
          </div>
          
          {subscription.payment_method_brand && subscription.payment_method_last4 && (
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>
                {subscription.payment_method_brand.toUpperCase()} ****{subscription.payment_method_last4}
              </span>
            </div>
          )}

          {willCancel && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs">
              Your subscription will not renew automatically
            </div>
          )}
        </div>
      )}
    </div>
  );
};