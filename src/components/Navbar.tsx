import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'The Problem', href: '#problem' },
  { label: 'Get Involved', href: '#get-involved' },
  { label: 'Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
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
            <span className={`font-black text-base leading-none block transition-colors duration-300 italic ${scrolled ? 'text-charcoal' : 'text-white'}`}>
              Safe Streets
            </span>
            <span className={`font-bold text-xs leading-none block transition-colors duration-300 italic ${scrolled ? 'text-orange-500' : 'text-orange-300'}`}>
              Ireland
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* CTA */}
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
          <a
            href="#donate"
            className="text-sm font-bold px-5 py-2.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-300"
          >
            Donate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
          <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
            <a href="#get-involved" onClick={() => setMenuOpen(false)} className="flex-1 text-center btn-outline-orange text-sm py-3">
              Get Involved
            </a>
            <a href="#donate" onClick={() => setMenuOpen(false)} className="flex-1 text-center btn-primary text-sm py-3">
              Donate
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
