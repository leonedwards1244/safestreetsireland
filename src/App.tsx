import React, { useState } from 'react';
import { Heart, LogIn, LogOut, User } from 'lucide-react';
import { DonationForm } from './components/DonationForm';
import { PaymentSuccess } from './components/PaymentSuccess';
import { UserSubscriptionStatus } from './components/UserSubscriptionStatus';
import { useAuth } from './hooks/useAuth';
import { createCheckoutSession } from './services/stripeService';

type AppView = 'home' | 'success';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleCheckout = async (amount: number, donorName?: string, message?: string) => {
    setIsCheckoutLoading(true);
    try {
      const { url } = await createCheckoutSession(amount, donorName, message);
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setAuthError(error.message);
      } else {
        setShowAuthModal(false);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setAuthError('An unexpected error occurred');
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const resetAuth = () => {
    setShowAuthModal(false);
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setAuthError('');
  };

  if (view === 'success') {
    return <PaymentSuccess onReturn={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Support Our Cause</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {authLoading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Help Support Families and Youths
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your donation helps support families and youths affected by youth crime and violence, 
              providing them with the resources and assistance they need during difficult times.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Donation Form */}
            <div className="flex justify-center">
              <DonationForm 
                onCheckout={handleCheckout} 
                isLoading={isCheckoutLoading}
              />
            </div>

            {/* User Info & Impact */}
            <div className="space-y-6">
              {user && <UserSubscriptionStatus />}
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      <strong>€25</strong> can provide a family with emergency support resources
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      <strong>€50</strong> can fund counseling sessions for affected youth
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">
                      <strong>€100</strong> can support community outreach programs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Safe & Secure</h3>
                <p className="text-sm text-blue-800">
                  All donations are processed securely through Stripe. You'll receive an email confirmation 
                  and receipt for your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
              </div>

              {authError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </div>

            <button
              onClick={resetAuth}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;