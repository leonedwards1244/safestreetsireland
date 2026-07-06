import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, Mail, CalendarDays } from 'lucide-react';

const topSocials = [
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61590416144888' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/safestreetsireland/' },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/133773929/' },
  { icon: Youtube,   label: 'YouTube',   href: null },
  { icon: Mail,      label: 'Email',     href: 'mailto:info@safestreetsireland.ie' },
];

const navLinks = [
  { label: 'About',       href: '#about' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Events',      href: '#events' },
  { label: 'Get Involved',href: '#get-involved' },
  { label: 'Stories',     href: '#stories' },
  { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top utility bar ───────────────────────────────────────────── */}
      <div className="bg-charcoal border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          {/* Logo + name */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <img
              src="/SSI_LOGO_TRANSPARENT.png"
              alt="Safe Streets Ireland"
              className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-white text-sm font-bold tracking-wide group-hover:text-orange-300 transition-colors hidden sm:block">
              Safe Streets Ireland
            </span>
          </a>

          {/* Right side: Events tab + socials */}
          <div className="flex items-center gap-1">
            {/* Events pill */}
            <a
              href="#events"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-base font-extrabold px-6 py-2.5 rounded-full mr-3 transition-colors duration-200 shadow-lg shadow-orange-500/30 tracking-wide"
            >
              <CalendarDays className="w-5 h-5" />
              Events
            </a>

            {/* Divider */}
            <div className="w-px h-4 bg-white/20 mx-1" />

            {/* Social icons */}
            {topSocials.map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-orange-500 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  key={label}
                  aria-label={label}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-white/30 cursor-default"
                  disabled
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Main navigation bar ───────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/SSI_LOGO_TRANSPARENT.png"
              alt="Safe Streets Ireland"
              className="h-9 w-auto transition-all duration-300 group-hover:opacity-80"
            />
            <div>
              <span className={`font-black text-base leading-none block transition-colors duration-300 italic ${scrolled ? 'text-charcoal' : 'text-white'}`}>
                Safe Streets
              </span>
              <span className={`font-bold text-xs leading-none block transition-colors duration-300 italic ${scrolled ? 'text-orange-500' : 'text-orange-300'}`}>
                Ireland
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold transition-colors duration-200 ${
                  link.label === 'Events'
                    ? scrolled
                      ? 'text-orange-500 hover:text-orange-600'
                      : 'text-orange-300 hover:text-orange-200'
                    : scrolled
                    ? 'text-gray-700 hover:text-orange-500'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href="#get-involved"
              className={`text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 ${
                scrolled
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-orange-600'
              }`}
            >
              Get Involved
            </a>
            <a
              href="https://fundraisely.ie/events/safe-streets-ireland-padel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-[#ffa200] text-white hover:bg-[#e69200] shadow-sm hover:shadow-md transition-all duration-300"
            >
              Donate
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-semibold py-3 px-2 rounded-lg transition-colors ${
                link.label === 'Events'
                  ? 'text-orange-500 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2'
                  : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {link.label === 'Events' && <CalendarDays className="w-4 h-4" />}
              {link.label}
            </a>
          ))}

          {/* Mobile social row */}
          <div className="flex items-center gap-2 py-3 px-2 border-t border-gray-100 mt-1">
            <span className="text-xs text-gray-400 font-medium mr-1">Follow us:</span>
            {topSocials.map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : null
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <a
              href="#get-involved"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center btn-outline-orange text-sm py-3"
            >
              Get Involved
            </a>
            <a
              href="https://fundraisely.ie/events/safe-streets-ireland-padel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center btn-primary text-sm py-3"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
