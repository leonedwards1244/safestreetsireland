import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const EMBED_URL = 'https://fundraisely.ie/embed/donate/8fe572df-ef63-4559-9816-d084ad85c314';

export default function DonateModal({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
           style={{ height: 'min(680px, 90vh)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 text-lg">♥</span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-900">Make a Donation</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* iframe */}
        <div className="flex-1 relative">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
              <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
              <p className="text-sm text-gray-500">Loading donation form…</p>
            </div>
          )}
          <iframe
            src={EMBED_URL}
            title="Donate to Safe Streets Ireland"
            className="w-full h-full border-0"
            onLoad={() => setLoaded(true)}
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
