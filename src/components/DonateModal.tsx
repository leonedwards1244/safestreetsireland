import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { X, Heart } from 'lucide-react';

export interface DonateModalHandle {
  open: () => void;
}

const DonateModal = forwardRef<DonateModalHandle, Record<string, never>>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  // Inject the Fundraisely script each time the modal opens so it can
  // initialise against the button rendered in this container.
  // Clean up on close so re-opening gets a fresh execution.
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://fundraisely.ie/embed/donate.js';
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isOpen]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ffa200] to-[#e6920a] px-6 pt-6 pb-5">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Make a Donation</h2>
              <p className="text-white/80 text-sm">Safe Streets Ireland</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Every contribution helps us protect young lives, build safer communities,
            and break the cycle of violence across Ireland.
          </p>

          {/* Fundraisely embed container */}
          <div ref={containerRef} className="flex justify-center">
            <button
              type="button"
              data-fundraisely-donate=""
              data-club-id="8fe572df-ef63-4559-9816-d084ad85c314"
              data-title="Donate"
              style={{
                background: '#ffa200',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 18px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Donate now
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            Payments are processed securely via Fundraisely.
          </p>
        </div>
      </div>
    </div>
  );
});

DonateModal.displayName = 'DonateModal';
export default DonateModal;
