import { useEffect, useState } from 'react';
import { XCircle, ArrowLeft, Heart } from 'lucide-react';

export function CancelPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex flex-col items-center justify-center px-5 py-16">
      <a href="/" className="mb-10 flex items-center gap-3 group">
        <img src="/SSI_LOGO_TRANSPARENT.png" alt="Safe Streets Ireland" className="h-14 w-auto" />
        <div>
          <div className="font-black text-lg leading-none italic text-gray-900">Safe Streets</div>
          <div className="font-bold text-sm leading-none italic text-orange-500">Ireland</div>
        </div>
      </a>

      <div
        className={`bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md w-full p-10 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-gray-400" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-6">
          No worries — your payment was not processed and no charges were made. You can donate any time you're ready.
        </p>

        <div className="flex items-center justify-center gap-2 text-orange-500 text-sm font-semibold mb-8">
          <Heart className="w-4 h-4 fill-orange-500" />
          Every contribution — big or small — makes a difference
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full hover:border-gray-300 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </a>
          <a
            href="/#get-involved"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Donate Again
          </a>
        </div>
      </div>
    </div>
  );
}
