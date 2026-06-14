import React from 'react';
import { DonationCard } from '../components/DonationCard';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { Heart, Users, Shield } from 'lucide-react';

export function DonatePage() {
  const { loading, checkoutDonation } = useStripeCheckout();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6 mx-auto">
            <Heart className="w-10 h-10 text-rose-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your donation helps us support families and youth affected by crime and violence, 
            creating safer communities and brighter futures for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Families</h3>
            <p className="text-gray-600">
              Provide essential resources and counseling to families affected by youth crime.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prevention Programs</h3>
            <p className="text-gray-600">
              Fund education and intervention programs that prevent youth involvement in crime.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Healing</h3>
            <p className="text-gray-600">
              Support rehabilitation and reintegration efforts for youth and their communities.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <DonationCard 
            onCheckout={checkoutDonation} 
            loading={loading} 
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Your donation is secure and processed through Stripe. 
            You'll receive a confirmation email after your contribution.
          </p>
        </div>
      </div>
    </div>
  );
}