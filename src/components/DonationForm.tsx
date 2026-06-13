import React, { useState } from 'react';
import { Heart, CreditCard, Loader2 } from 'lucide-react';
import { STRIPE_PRODUCTS } from '../stripe-config';

interface DonationFormProps {
  onCheckout: (amount: number, donorName?: string, message?: string) => Promise<void>;
  isLoading: boolean;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onCheckout, isLoading }) => {
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);

  const donationProduct = STRIPE_PRODUCTS.find(p => p.name === 'DONATIONS');
  
  if (!donationProduct) return null;

  const presetAmounts = [10, 25, 50, 100];

  const handleAmountChange = (value: number) => {
    setAmount(value);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(numValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      await onCheckout(amount, donorName || undefined, message || undefined);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Make a Donation</h2>
        <p className="text-gray-600 text-sm">{donationProduct.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount (€)
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                onClick={() => handleAmountChange(presetAmount)}
                className={`p-3 text-center rounded-lg border-2 transition-colors ${
                  amount === presetAmount && !isCustom
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                €{presetAmount}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message of support..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || amount <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Donate €{amount.toFixed(2)}
            </>
          )}
        </button>
      </form>
    </div>
  );
};