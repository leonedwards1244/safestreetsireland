import { useEffect, useRef, useState } from 'react';
import { Mail, Send, CheckCircle, Phone, MapPin, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && entry.target.classList.add('visible'),
      { threshold: 0.1 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from('campaign_signups')
      .insert({ name: name.trim(), email: email.trim().toLowerCase(), interest: interest || null });

    setLoading(false);

    if (dbError) {
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div ref={revealRef} className="reveal grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-orange-100">
              Stay Connected
            </div>
            <h2 className="section-heading mb-5">
              Join the <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Sign up to receive campaign updates, community news, opportunities to get involved, and stories of impact from across Ireland.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: Mail, label: 'info@safestreetsireland.ie' },
                { icon: Phone, label: '+353 1 234 5678' },
                { icon: MapPin, label: 'Nationwide — Ireland' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{label}</span>
                </div>
              ))}
            </div>

            {/* Partners row */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Supported By</p>
              <div className="flex flex-wrap gap-3">
                {['Garda Síochána', 'Irish Youth Foundation', 'Tusla', 'An Cosan', 'Youth Work Ireland'].map((org) => (
                  <span key={org} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-warm-50 rounded-3xl p-8 md:p-10 border border-warm-200">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-charcoal mb-3">You're In!</h3>
                <p className="text-gray-600 leading-relaxed">
                  Thank you for joining Safe Streets Ireland. Together, we'll build safer communities and protect young lives across Ireland.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold text-charcoal mb-2">Stay Updated</h3>
                <p className="text-gray-500 text-sm mb-7">
                  Join thousands of community supporters receiving campaign updates.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      I want to <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="volunteer">Volunteer my time</option>
                      <option value="donate">Make a donation</option>
                      <option value="partner">Partner with Safe Streets</option>
                      <option value="chapter">Start a chapter in my area</option>
                      <option value="updates">Just receive updates</option>
                    </select>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Stand With Safe Streets Ireland
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
