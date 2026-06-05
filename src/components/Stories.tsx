import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const stories = [
  {
    name: 'Sarah O\'Brien',
    role: 'Community Volunteer, Dublin',
    quote:
      'After losing my nephew to knife crime, I felt completely helpless. Safe Streets Ireland gave me somewhere to channel that grief into action. Now I mentor young people every week and I see the difference it makes. They just need someone to show up for them.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
    tag: 'Volunteer Story',
  },
  {
    name: 'Marcus Daly',
    role: 'Youth Worker, Cork',
    quote:
      'I grew up in a community where violence felt normal. Safe Streets Ireland helped our youth club get funding, training, and a network of support. Our young people now have options, goals, and hope for the future. That is everything.',
    image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=300',
    tag: 'Youth Worker',
  },
  {
    name: 'Aoife Murphy',
    role: 'Parent & Campaigner, Limerick',
    quote:
      'I joined Safe Streets Ireland because I was scared for my children every day. This campaign brought our neighbourhood together. We don\'t just talk about the problem anymore — we\'re actually fixing it together. I feel proud of our community again.',
    image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=300',
    tag: 'Community Champion',
  },
];

export default function Stories() {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => {
    if (el) revealRefs.current[i] = el;
  };

  return (
    <section id="stories" className="py-24 bg-warm-50 speckle">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={(el) => addRef(el, 0)} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-5 border border-orange-100">
            Real People. Real Impact.
          </div>
          <h2 className="section-heading mb-4">
            Community <span className="gradient-text">Stories</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Behind every campaign is a human story. These are the voices of people who have been touched by violence — and who are now part of building the solution.
          </p>
        </div>

        {/* Story cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map(({ name, role, quote, image, tag }, i) => (
            <div
              key={name}
              ref={(el) => addRef(el, i + 1)}
              className="reveal bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                  {tag}
                </span>
              </div>

              <Quote className="w-8 h-8 text-orange-300 mb-4 flex-shrink-0" />

              <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1 italic">
                "{quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={image}
                  alt={name}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-charcoal text-sm">{name}</div>
                  <div className="text-gray-500 text-xs">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo grid */}
        <div ref={(el) => addRef(el, 4)} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square">
              <img
                src={src}
                alt="Community action"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
