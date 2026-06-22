import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

const topSocials = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590416144888' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/safestreetsireland/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/133773929/' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Events', href: '#events' },
  { label: 'Get Involved', href: '#get-involved' },
  { label: 'Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenDonate: () => void;
}

export default function Navbar({ onOpenDonate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact + social bar */}
      <div
        className={`bg-charcoal overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0' : 'max-h-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
          {/* Contact info */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:info@safestreetsireland.ie"
              className="flex items-center gap-1.5 text-white/75 text-xs hover:text-white transition-colors duration-200"
            >
              <Mail className="w-3 h-3" />
              info@safestreetsireland.ie
            </a>
            <a
              href="tel:+35312345678"
              className="hidden sm:flex items-center gap-1.5 text-white/75 text-xs hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3 h-3" />
              +353 1 234 5678
            </a>
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-1">
            {topSocials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-orange-500 rounded-full transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/SSI_LOGO_TRANSPARENT.png"
              alt="Safe Streets Ireland"
              className="h-10 w-auto transition-all duration-300 group-hover:opacity-80"
            />
            <div>
              <span
                className={`font-black text-base leading-none block transition-colors duration-300 italic ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                Safe Streets
              </span>
              <span
                className={`font-bold text-xs leading-none block transition-colors duration-300 italic ${
                  scrolled ? 'text-orange-500' : 'text-orange-300'
                }`}
              >
                Ireland
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold transition-colors duration-200 ${
                  scrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
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
            <button
              type="button"
              onClick={onOpenDonate}
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              Donate
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-semibold py-3 px-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile socials */}
          <div className="flex items-center gap-3 py-3 px-2 border-t border-gray-100 mt-1">
            {topSocials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a
              href="mailto:info@safestreetsireland.ie"
              className="ml-auto flex items-center gap-1.5 text-gray-500 text-xs hover:text-orange-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              info@safestreetsireland.ie
            </a>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <a
              href="#get-involved"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center btn-outline-orange text-sm py-3"
            >
              Get Involved
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenDonate();
              }}
              className="flex-1 text-center btn-primary text-sm py-3"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
