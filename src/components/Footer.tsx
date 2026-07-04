import { Shield, Facebook, Linkedin, Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Campaign: [
    { label: 'About Us', href: '#' },
    { label: 'Our Mission', href: '#' },
    { label: 'Our Team', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Annual Report', href: '#' },
  ],
  'Get Involved': [
    { label: 'Volunteer', href: '#' },
    { label: 'Donate', href: '#' },
    { label: 'Partner With Us', href: '#' },
    { label: 'Start a Chapter', href: '#' },
    { label: 'Corporate Support', href: '#' },
  ],
  Resources: [
    { label: 'Youth Resources', href: '/resources/youth-resources' },
    { label: 'Family Support', href: '/resources/family-support' },
    { label: 'Educational Materials', href: '/resources/educational-materials' },
    { label: 'Research & Data', href: '/resources/research-data' },
    { label: 'News & Updates', href: '/resources/news-updates' },
  ],
  Support: [
    { label: 'Contact Us', href: '#' },
    { label: 'Crisis Support', href: '#' },
    { label: 'Garda Information', href: '#' },
    { label: 'Tusla Services', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590416144888' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/133773929/admin/dashboard/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/safestreetsireland/' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Mail, label: 'Email' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-charcoal text-white">
      {/* Orange top accent */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-base leading-none text-white">Safe Streets</div>
                <div className="text-orange-400 text-xs font-semibold leading-none mt-0.5">Ireland</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building safer communities. Protecting young lives. Ending the cycle of violence across Ireland.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link
                        to={href}
                        className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Safe Streets Ireland. All rights reserved.
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>Registered Charity</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>CHY 12345</span>
            <button
              onClick={scrollToTop}
              className="ml-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
