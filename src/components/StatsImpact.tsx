import { useEffect, useRef, useState } from 'react';
import { MapPin, Users, Star } from 'lucide-react';

const STATS = [
  { icon: MapPin,  target: 100, label: 'Communities Reached',              delay: 0   },
  { icon: Users,   target: 50,  label: 'Volunteers & Families Supported',  delay: 120 },
  { icon: Star,    target: 100, label: 'Followers Accounted',              delay: 240 },
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
  const count = useCountUp(target, 1600, triggered);

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setTriggered(true), delay);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, delay]);

  return (
    <div
      className={`flex flex-col items-center gap-5 px-8 py-10 rounded-3xl border border-white/15 bg-white/8 backdrop-blur-md
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-orange-500/25 border border-orange-400/40 flex items-center justify-center">
        <Icon className="w-7 h-7 text-orange-300" />
      </div>
      <div className="text-center">
        <div className="text-6xl sm:text-7xl font-black text-white tracking-tight leading-none tabular-nums">
          {count}<span className="text-orange-400">+</span>
        </div>
        <div className="mt-3 text-base font-medium text-white/65 leading-snug max-w-[160px] mx-auto">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function StatsImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/SSI_STREETS_WORK.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-charcoal/75" />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/60 via-charcoal/40 to-charcoal/80" />

      {/* Subtle orange edge glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-sm font-bold px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Real Change.<br />
            <span className="text-orange-400">Real Numbers.</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
