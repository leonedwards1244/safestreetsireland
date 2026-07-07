import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DONATE_URL = 'https://fundraisely.ie/events/safe-streets-ireland-padel';

interface DonateButtonProps {
  children?: React.ReactNode;
  className?: string;
}

function DonateModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#ffa200] flex-shrink-0">
          <span className="font-bold text-white text-base tracking-wide">Support Safe Streets Ireland</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* iframe */}
        <iframe
          src={DONATE_URL}
          title="Donate to Safe Streets Ireland"
          className="flex-1 w-full border-0"
          allow="payment"
        />
      </div>
    </div>
  );
}

export default function DonateButton({ children = 'Donate Now', className }: DonateButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {children}
      </button>

      {open && <DonateModal onClose={() => setOpen(false)} />}
    </>
  );
}
