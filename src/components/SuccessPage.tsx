import React from 'react';
import { CheckCircle, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="w-5 h-5 text-rose-500" />
            <p className="text-lg text-gray-600">Your donation was successful</p>
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 leading-relaxed">
              Your generous contribution will help support families and youth affected by crime and violence. 
              You'll receive an email confirmation shortly.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-sm text-gray-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}