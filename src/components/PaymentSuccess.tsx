import React, { useEffect, useState } from 'react';
import { CheckCircle, Heart, Home } from 'lucide-react';

interface PaymentSuccessProps {
  onReturn: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onReturn }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onReturn();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReturn]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Your Donation!
        </h1>
        
        <div className="mb-6">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">
            Your generous contribution will help support families and youths affected by youth crime and violence.
          </p>
          <p className="text-sm text-gray-500">
            You should receive a confirmation email shortly with your donation receipt.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Returning to homepage in <span className="font-medium text-gray-900">{countdown}</span> seconds
          </p>
        </div>

        <button
          onClick={onReturn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center mx-auto"
        >
          <Home className="w-4 h-4 mr-2" />
          Return Home Now
        </button>
      </div>
    </div>
  );
};