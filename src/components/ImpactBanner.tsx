import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ImpactBanner() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && entry.target.classList.add('visible'),
      { threshold: 0.2 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 speckle relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-4xl mx-auto px-5 text-center relative" ref={revealRef}>
        <div className="reveal">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight mb-5">
            Together, We Can{' '}
            <span className="gradient-text">End the Cycle.</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Violence is not inevitable. Change is possible. It starts right here, in our communities, with people like you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#get-involved"
              className="btn-primary text-base flex items-center gap-2 group"
            >
              Take Action Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-outline-orange text-base">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
