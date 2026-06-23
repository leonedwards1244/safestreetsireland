import { ArrowDown, Heart, Users, HandHeart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

interface Stat {
  icon: React.ElementType;
  raw: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Users,     raw: 100, suffix: '+', label: 'Communities Reached' },
  { icon: Heart,     raw: 200, suffix: '+', label: 'Families Supported Goal' },
  { icon: HandHeart, raw: 100, suffix: '+', label: 'Active Volunteers' },
  { icon: Users,     raw: 32,  suffix: '',  label: 'Partner Organisations' },
];

function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.raw, 1800, animate);
  return (
    <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 transition-all duration-300">
      <stat.icon className="w-7 h-7 text-orange-200 mx-auto mb-2" />
      <div className="text-2xl font-extrabold text-white tabular-nums">
        {animate ? `${count.toLocaleString()}${stat.suffix}` : `0${stat.suffix}`}
      </div>
      <div className="text-white/75 text-xs font-medium leading-tight mt-1">{stat.label}</div>
    </div>
  );
}

interface HeroProps {
  onOpenDonate?: () => void;
}

export default function Hero({ }: HeroProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />

      {/* Orange gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/80 to-orange-700/85" />

      {/* Paint splatter dots */}
      <div className="absolute inset-0 splatter opacity-40" />

      {/* Warm subtle shapes */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-36 pb-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left text block */}
        <div className="flex-1 text-center lg:text-left">
          {/* Campaign badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse-slow" />
            Community-Led Campaign
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
            Safer Streets.<br />
            <span className="text-orange-200">Stronger</span><br />
            Communities.<br />
            <span className="text-orange-200">Brighter Futures.</span>
          </h1>

          <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
            Safe Streets Ireland is a community-led campaign working to reduce youth violence and knife crime through prevention, education, community action, and opportunity.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a href="#get-involved" className="btn-outline text-base">
              Get Involved
            </a>
            <button
              type="button"
              data-fundraisely-donate=""
              data-club-id="8fe572df-ef63-4559-9816-d084ad85c314"
              data-title="Donate"
              className="bg-white text-[#ffa200] font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-orange-50 hover:shadow-lg hover:-translate-y-0.5 text-base"
            >
              Donate
            </button>
            <a href="#volunteer" className="btn-outline text-base">
              Volunteer
            </a>
            <a href="#partner" className="btn-outline text-base">
              Partner With Us
            </a>
          </div>

          {/* Stand with us */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white/80 text-sm font-medium hover:text-white transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-white"
          >
            <Heart className="w-4 h-4" />
            Stand With Safe Streets Ireland
          </a>
        </div>

        {/* Right impact cards */}
        <div ref={gridRef} className="flex-shrink-0 grid grid-cols-2 gap-4 max-w-sm w-full">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-scroll-bounce" />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 48C120 36 240 12 360 6C480 0 600 12 720 24C840 36 960 48 1080 48C1200 48 1320 36 1380 30L1440 24V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
