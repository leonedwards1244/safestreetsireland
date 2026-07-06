import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Shield, Users, Star } from 'lucide-react';

const slides = [
  '/SSI_STREETS_WORK.png',
  '/SSI_WORK_2.png',
  '/ChatGPT_Image_Jun_11,_2026,_07_56_00_PM.png',
];

const STATS = [
  { icon: Shield, target: 100, label: 'Communities Reached',             delay: 200 },
  { icon: Users,  target: 50,  label: 'Volunteers & Families Supported', delay: 380 },
  { icon: Star,   target: 100, label: 'Followers Accounted',             delay: 560 },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

interface StatCardProps {
  icon: React.ElementType;
  target: number;
  label: string;
  delay: number;
  active: boolean;
}

function StatCard({ icon: Icon, target, label, delay, active }: StatCardProps) {
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(target, 1800, triggered);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setTriggered(true), delay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, delay]);

  return (
    <div
      className={`relative flex items-center gap-4 bg-white/8 backdrop-blur-md border border-white/12 rounded-2xl px-6 py-5 transition-all duration-500
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-orange-500" />

      <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-400/25 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-orange-400" />
      </div>
      <div>
        <div className="text-4xl font-black text-white leading-none tabular-nums tracking-tight">
          {count}<span className="text-orange-400">+</span>
        </div>
        <div className="text-white/50 text-xs font-medium mt-1 leading-snug">{label}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
    // Trigger stats shortly after load since they're visible above the fold
    const t = setTimeout(() => setStatsActive(true), 600);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background slideshow */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 via-charcoal/75 to-orange-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'bg-orange-400 w-8' : 'bg-white/30 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-40 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: copy ── */}
          <div>
            {/* Tag */}
            <div
              className={`inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full mb-7 tracking-widest uppercase transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-slow" />
              Community-Led Movement
            </div>

            {/* Headline — smaller, monolithic */}
            <h1
              className={`text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-5 transition-all duration-700 delay-100 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Safer Streets.
              <br />
              <span className="text-orange-400">Stronger</span>
              <br />
              Communities.
            </h1>

            {/* Subtext — tighter and smaller */}
            <p
              className={`text-sm text-white/60 leading-relaxed max-w-md mb-10 transition-all duration-700 delay-200 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Safe Streets Ireland is a grassroots campaign working to reduce youth
              violence and knife crime — supporting families, empowering young people,
              and building safer communities across Ireland.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a href="#get-involved" className="btn-primary text-sm shadow-lg shadow-orange-500/25">
                Get Involved
              </a>
              <a href="#about" className="btn-outline text-sm backdrop-blur-sm">
                Learn More
              </a>
              <a
                href="https://fundraisely.ie/embed/donate/8fe572df-ef63-4559-9816-d084ad85c314"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffa200] hover:bg-[#e69200] text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm shadow-lg shadow-amber-500/25"
              >
                Donate Now
              </a>
            </div>
          </div>

          {/* ── RIGHT: stats ── */}
          <div ref={statsRef} className="flex flex-col gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} active={statsActive} />
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-scroll-bounce" />
      </a>
    </section>
  );
}
