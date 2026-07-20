import { FUNDRAISELY_CLUB_ID } from '../lib/fundraisely';

interface DonateButtonProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
}

const DONATE_URL = `https://fundraisely.ie/embed/donate/${FUNDRAISELY_CLUB_ID}`;

export default function DonateButton({
  className = '',
  children,
  title = 'Donate',
  onClick,
}: DonateButtonProps) {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
