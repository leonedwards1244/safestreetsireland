import React, { useState } from 'react';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';

interface DonationCardProps {
  onCheckout: () => void;
  loading: boolean;
}

export function DonationCard({ onCheckout, loading }: DonationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-6 mx-auto">
        <Heart className="w-8 h-8 text-rose-600" />
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Support Families & Youth</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Make a donation to support families and youths affected by youth crime and violence. 
          Your contribution makes a real difference in our community.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Donation Amount</p>
          <p className="text-lg font-medium text-gray-700">Any amount you choose</p>
        </div>
        
        <button
          onClick={onCheckout}
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Donate Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}