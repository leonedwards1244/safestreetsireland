import { useEffect, useRef, useState } from 'react';
import { TrendingUp, AlertTriangle, Users, MapPin } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 65,
    suffix: '%',
    label: 'Rise in knife crime incidents across Ireland in the last 5 years',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Users,
    value: 73,
    suffix: '%',
    label: 'Of those involved in violent incidents are under 25 years of age',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: AlertTriangle,
    value: 1,
    prefix: '1 in ',
    suffix: '3',
    label: 'Young people in urban areas report feeling unsafe in their community',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: MapPin,
    value: 40,
    suffix: '+',
    label: 'Communities across Ireland directly impacted by antisocial violence',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
];

function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold">
      {prefix}{count}{suffix}
    </div>
  );
}

export default function TheProblem() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && entry.target.classList.add('visible'),
      { threshold: 0.1 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" className="py-24 bg-charcoal relative overflow-hidden splatter">
      {/* Subtle orange gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={revealRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-bold px-4 py-2 rounded-full mb-5 border border-orange-500/30">
            The Reality We Face
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            The Problem Is <span className="text-orange-400">Real.</span><br />
            The Time to Act Is <span className="text-orange-400">Now.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Youth violence and knife crime are tearing apart families and communities across Ireland. These are not statistics — these are real lives, real families, real futures.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, suffix, prefix, label, color, bg }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/8 hover:border-orange-500/30 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`${color} mb-3`}>
                <Counter target={value} suffix={suffix} prefix={prefix} />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{label}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-5">
            "Every single statistic represents a son, a daughter, a friend, a neighbour. Behind every number is a life changed forever."
          </blockquote>
          <p className="text-orange-400 font-semibold text-sm">Safe Streets Ireland</p>
          <div className="mt-8">
            <a href="#get-involved" className="btn-primary text-base">
              Be Part of the Solution
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
