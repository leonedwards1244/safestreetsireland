import { useEffect, useState } from 'react';
import { ArrowDown, Shield, Users, Heart } from 'lucide-react';

const slides = [
  '/SSI_STREETS_WORK.png',
  '/SSI_WORK_2.png',
  '/ChatGPT_Image_Jun_11,_2026,_07_56_00_PM.png',
];

const stats = [
  { icon: Shield, value: '100+', label: 'Communities Reached' },
  { icon: Users, value: '500+', label: 'Volunteers' },
  { icon: Heart, value: '1,000+', label: 'Families Supported' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
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
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/85 via-charcoal/70 to-orange-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-orange-400 w-8' : 'bg-white/40 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-36 pb-24">
        {/* Orange decorative orb */}
        <div className="absolute -top-20 -right-32 w-[520px] h-[520px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 backdrop-blur-sm text-orange-300 text-sm font-bold px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse-slow" />
            Community-Led Movement
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Safer Streets.
            <br />
            <span className="text-orange-400">Stronger</span>
            <br />
            Communities.
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Safe Streets Ireland is a grassroots campaign working to reduce youth
            violence and knife crime — supporting families, empowering young people,
            and building safer communities across Ireland.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a href="#get-involved" className="btn-primary text-base shadow-xl shadow-orange-500/30">
              Get Involved
            </a>
            <a href="#about" className="btn-outline text-base backdrop-blur-sm">
              Learn More
            </a>
            <a
              href="https://fundraisely.ie/embed/donate/8fe572df-ef63-4559-9816-d084ad85c314"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffa200] hover:bg-[#e69200] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-base shadow-xl shadow-amber-500/30"
            >
              Donate Now
            </a>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap gap-8 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-xl leading-none">{value}</div>
                  <div className="text-white/55 text-xs font-medium mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-scroll-bounce" />
      </a>
    </section>
  );
}
