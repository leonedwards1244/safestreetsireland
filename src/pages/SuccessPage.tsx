import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center px-5 py-16">
      {/* Logo */}
      <a href="/" className="mb-10 flex items-center gap-3 group">
        <img src="/SSI_LOGO_TRANSPARENT.png" alt="Safe Streets Ireland" className="h-14 w-auto" />
        <div>
          <div className="font-black text-lg leading-none italic text-gray-900">Safe Streets</div>
          <div className="font-bold text-sm leading-none italic text-orange-500">Ireland</div>
        </div>
      </a>

      {/* Card */}
      <div
        className={`bg-white rounded-3xl shadow-xl border border-orange-100 max-w-md w-full p-10 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-orange-500" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Thank You!
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Your donation has been processed successfully. Your generosity helps us protect young lives and build safer communities across Ireland.
        </p>

        <div className="flex items-center justify-center gap-2 text-orange-500 text-sm font-semibold mb-8">
          <Heart className="w-4 h-4 fill-orange-500" />
          Together we make Ireland safer
        </div>

        {sessionId && (
          <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 font-mono mb-8 break-all">
            Ref: {sessionId}
          </div>
        )}

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Safe Streets Ireland
        </a>

        <p className="text-xs text-gray-400 mt-5">A confirmation email will be sent to you shortly.</p>
      </div>
    </div>
  );
}
