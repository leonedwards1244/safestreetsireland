import React from 'react';
import { useAuth } from '../lib/auth';
import { SubscriptionStatus } from '../components/stripe/SubscriptionStatus';
import { ProductCard } from '../components/stripe/ProductCard';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { Button } from '../components/ui/Button';
import { LogOut, User } from 'lucide-react';

export function DashboardPage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STRIPE_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            <div>
              <SubscriptionStatus />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}