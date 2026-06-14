import React, { useEffect, useState } from 'react';
import { Crown, Clock, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface SubscriptionData {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-800">No Active Subscription</p>
            <p className="text-xs text-blue-600">Consider subscribing for additional features</p>
          </div>
        </div>
      </div>
    );
  }

  const isActive = subscription.subscription_status === 'active';
  const endDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className={`border rounded-lg p-4 ${isActive ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
      <div className="flex items-center space-x-3">
        {isActive ? (
          <Crown className="w-5 h-5 text-green-600" />
        ) : (
          <Clock className="w-5 h-5 text-yellow-600" />
        )}
        <div className="flex-1">
          <p className={`text-sm font-medium ${isActive ? 'text-green-800' : 'text-yellow-800'}`}>
            Subscription: {subscription.subscription_status.charAt(0).toUpperCase() + subscription.subscription_status.slice(1)}
          </p>
          <p className={`text-xs ${isActive ? 'text-green-600' : 'text-yellow-600'}`}>
            {isActive ? 'Renews' : 'Ends'} on {endDate.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}