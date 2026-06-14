import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DonatePage } from './pages/DonatePage';
import { SuccessPage } from './components/SuccessPage';
import { SubscriptionStatus } from './components/SubscriptionStatus';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-6xl mx-auto">
              <SubscriptionStatus />
            </div>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<DonatePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;