import { useEffect, useState } from 'react';
import { loadDonateScript, FUNDRAISELY_CLUB_ID } from '../lib/fundraisely';

interface DonateButtonProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

const DONATE_DIRECT_URL = `https://fundraisely.ie/embed/donate/${FUNDRAISELY_CLUB_ID}`;

export default function DonateButton({
  className = '',
  children,
  title = 'Donate',
  onClick,
}: DonateButtonProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadDonateScript()
      .then(() => checkDomainAllowed())
      .then((allowed) => !cancelled && setAuthorized(allowed))
      .catch(() => !cancelled && setAuthorized(false));
    return () => {
      cancelled = true;
    };
  }, []);

  function handleClick() {
    onClick?.();
    if (authorized === false) {
      window.open(DONATE_DIRECT_URL, '_blank', 'noopener,noreferrer');
    }
  }

  const disabled = authorized === false;

  return (
    <button
      type="button"
      data-fundraisely-donate
      data-club-id={FUNDRAISELY_CLUB_ID}
      data-title={title}
      className={className}
      onClick={handleClick}
      style={disabled ? { opacity: 1, cursor: 'pointer' } : undefined}
    >
      {children}
    </button>
  );
}

async function checkDomainAllowed(): Promise<boolean> {
  try {
    const res = await fetch(
      `https://fundraisely.ie/api/donations/${FUNDRAISELY_CLUB_ID}/domain-check?hostname=${encodeURIComponent(window.location.hostname)}`,
    );
    const data = await res.json();
    return !!(data && data.allowed);
  } catch {
    return false;
  }
}
