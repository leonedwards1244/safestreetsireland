import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DonateButton from './DonateButton';

const IMAGES = [
  '/SSI_STREETS_WORK.png',
  '/SSI_WORK_2.png',
  '/ChatGPT_Image_Jun_11,_2026,_07_56_00_PM.png',
  '/SSI_LOGO_TRANSPARENT.png',
  '/SSI_STREETS_WORK.png',
  '/SSI_WORK_2.png',
];

const STATS = [
  { value: '500+', label: 'Young People Supported' },
  { value: '12', label: 'Communities Reached' },
  { value: '3', label: 'Years of Impact' },
];

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background grid */}
      <div ref={gridRef} className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20 will-change-transform">
        {IMAGES.map((src, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ transform: i % 2 === 0 ? 'scale(1.1)' : 'scale(1.05)' }}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-gray-950/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 lg:py-40">
        <div
          className={`transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-[#ffa200] text-sm font-bold uppercase tracking-widest mb-6 border border-[#ffa200]/40 px-4 py-1.5 rounded-full">
            Community-Led Action
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6 max-w-4xl">
            Building Safer Communities.{' '}
            <span className="text-[#ffa200]">Protecting Young Lives.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Safe Streets Ireland works to reduce youth violence and knife crime through
            prevention, education, and community action — giving every young person a
            safer future.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#get-involved"
              className="inline-flex items-center gap-2 bg-[#ffa200] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-[#e69200] hover:shadow-lg hover:-translate-y-0.5 text-base group"
            >
              Get Involved
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <DonateButton className="bg-white text-[#ffa200] font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-orange-50 hover:shadow-lg hover:-translate-y-0.5 text-base">
              Donate
            </DonateButton>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
