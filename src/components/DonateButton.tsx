import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://fundraisely.ie/embed/donate.js';
const CLUB_ID = '8fe572df-ef63-4559-9816-d084ad85c314';

interface DonateButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DonateButton({ className, children = 'Donate' }: DonateButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

    if (existing) {
      // Script already loaded — manually open the modal via the global the
      // Fundraisely script exposes, if available.
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Once the button is in the DOM and the script is loaded, click handling is
  // done entirely by the Fundraisely script via data attributes.
  // As a fallback, open the hosted donation page directly.
  const handleClick = () => {
    const w = window as unknown as Record<string, unknown>;
    if (typeof w.FundRaisely === 'function') {
      (w.FundRaisely as (id: string) => void)(CLUB_ID);
      return;
    }
    if (typeof w.fundraisely === 'object' && w.fundraisely !== null) {
      const fr = w.fundraisely as { open?: (id: string) => void; init?: () => void };
      if (typeof fr.open === 'function') {
        fr.open(CLUB_ID);
        return;
      }
    }
    // Hard fallback: open the donation page in a new tab.
    window.open(
      `https://fundraisely.ie/embed/donate/${CLUB_ID}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <button
      ref={btnRef}
      type="button"
      data-fundraisely-donate=""
      data-club-id={CLUB_ID}
      data-title="Donate"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
