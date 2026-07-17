// src/lib/fundraisely.ts
//
// Shared config + script loader for the FundRaisely donate.js widget.
//
// Why this file exists: donate.js scans the page for
// [data-fundraisely-donate] buttons and wires click handlers onto them
// when it runs. If we just dropped a <script> tag into index.html, we'd
// be trusting that it happens to load/execute after React has rendered
// every donate button on the page -- a race we can't guarantee, and the
// exact kind of timing bug that broke this before.
//
// Instead we load the script ourselves, from inside a useEffect (see
// DonateButton.tsx). Effects only run after React has committed the
// DOM, so by the time this function is called for the first time, every
// DonateButton already exists on the page. donate.js's scan will find
// all of them, first try, every time.
//
// The `scriptPromise` cache means it doesn't matter that Hero, Navbar,
// Footer, and GetInvolved all mount their own <DonateButton> at once --
// the <script> tag itself only ever gets added to the page once.

export const FUNDRAISELY_CLUB_ID = '8fe572df-ef63-4559-9816-d084ad85c314';

const DONATE_SCRIPT_SRC = 'https://fundraisely.ie/embed/donate.js';

let scriptPromise: Promise<void> | null = null;

export function loadDonateScript(): Promise<void> {
  // Second+ call (from the 2nd, 3rd... DonateButton to mount): reuse the
  // same in-flight/completed promise instead of adding another <script>.
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    // Belt-and-braces: if something else already added this script
    // (e.g. hot-reload during dev, or it's also in index.html), don't
    // add a second copy.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${DONATE_SCRIPT_SRC}"]`
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = DONATE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      // donate.js almost certainly wires its buttons on 'DOMContentLoaded'
      // (or possibly window 'load') -- the normal assumption for a script
      // meant to be pasted directly into a static page's HTML. But we're
      // injecting it late, from inside a React effect, well after this
      // page's real DOMContentLoaded/load already fired. Re-dispatching
      // both here invokes any listener still registered for them, even
      // though the browser's own firing already happened -- so whichever
      // one donate.js is actually listening for still reaches it.
      document.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('load'));
      resolve();
    };
    script.onerror = () =>
      reject(new Error('Failed to load FundRaisely donate.js'));

    document.body.appendChild(script);
  });

  return scriptPromise;
}