// src/components/DonateButton.tsx
//
// Drop-in replacement for the old:
//   <a href="https://fundraisely.ie/embed/donate/<clubId>" target="_blank">
//
// Renders the real FundRaisely embed trigger -- a <button
// data-fundraisely-donate data-club-id="..."> -- and makes sure
// donate.js is loaded so that button actually does something. See
// src/lib/fundraisely.ts for why the script is loaded this way instead
// of a plain <script> tag in index.html.
//
// Usage is just like a normal button -- pass whatever className and
// children you need to match the surrounding design:
//
//   <DonateButton className="btn-primary">Donate Now</DonateButton>

import { useEffect } from 'react';
import { loadDonateScript, FUNDRAISELY_CLUB_ID } from '../lib/fundraisely';

interface DonateButtonProps {
  className?: string;
  children: React.ReactNode;
  /** Sets data-title, which donate.js uses as the modal's heading. */
  title?: string;
  /** Optional extra handler -- e.g. closing a mobile nav menu on click.
   *  This fires alongside (not instead of) donate.js's own click
   *  handler, since they're two separate listeners on the same button. */
  onClick?: () => void;
}

export default function DonateButton({
  className = '',
  children,
  title = 'Donate',
  onClick,
}: DonateButtonProps) {
  useEffect(() => {
    // Fire-and-forget: any load failure is logged, not thrown, so a
    // network hiccup on this script can't crash the rest of the page.
    loadDonateScript().catch((err) => console.error(err));
  }, []);

  return (
    <button
      type="button"
      data-fundraisely-donate
      data-club-id={FUNDRAISELY_CLUB_ID}
      data-title={title}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}