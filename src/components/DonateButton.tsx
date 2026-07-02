import { useEffect } from 'react';

const SCRIPT_SRC = 'https://fundraisely-staging.up.railway.app/embed/donate.js';
const CLUB_ID = '8fe572df-ef63-4559-9816-d084ad85c314';

interface DonateButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DonateButton({ className, children = 'Donate' }: DonateButtonProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <button
      type="button"
      data-fundraisely-donate=""
      data-club-id={CLUB_ID}
      data-title="Donate"
      className={className}
    >
      {children}
    </button>
  );
}
