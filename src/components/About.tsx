import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const highlights = [
  'Community-led and grassroots',
  'Focused on prevention and early intervention',
  'Supporting families affected by violence',
  'Creating positive pathways for young people',
  'Working with schools, youth groups, and local leaders',
];

export default function About() {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => {
    if (el) revealRefs.current[i] = el;
  };

  return (
    <section id="about" className="py-24 bg-white speckle">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={(el) => addRef(el, 0)}
            className="reveal order-2 lg:order-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Community members coming together"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-orange-500 text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-extrabold">Since</div>
              <div className="text-xl font-bold">2023</div>
            </div>

            {/* Accent shape */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-orange-100 -z-10" />
          </div>

          {/* Text */}
          <div
            ref={(el) => addRef(el, 1)}
            className="reveal order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-orange-100">
              About Our Campaign
            </div>

            <h2 className="section-heading mb-6">
              About{' '}
              <span className="gradient-text">Safe Streets Ireland</span>
            </h2>

            <div className="space-y-5 text-gray-600 text-base leading-relaxed mb-8">
              <p>
                Safe Streets Ireland is a community-led campaign dedicated to reducing youth violence, knife crime, and the devastating impact these issues have on families and communities across Ireland.
              </p>
              <p>
                We believe every young person deserves to grow up feeling safe, valued, and supported. No family should have to experience the loss, trauma, or fear caused by violence.
              </p>
              <p>
                Our campaign aims to raise awareness, support prevention initiatives, encourage positive opportunities for young people, and bring communities together to create safer streets for everyone.
              </p>
              <p className="font-semibold text-charcoal">
                Violence is not inevitable. Through education, community action, youth engagement, and support for affected families, we can help build a future where young people choose opportunity, respect, and hope over violence.
              </p>
            </div>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a href="#mission" className="btn-primary">
                Our Mission
              </a>
              <a href="#get-involved" className="btn-outline-orange">
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
