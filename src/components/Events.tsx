import { useEffect, useRef } from 'react';
import { Calendar, MapPin, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 'padel-2026',
    tag: 'Fundraiser',
    tagColor: 'bg-orange-500',
    category: 'Padel Tournament',
    title: 'Safe Streets Ireland — Padel Fundraiser',
    description:
      'Join us for an exciting padel tournament in support of Safe Streets Ireland. Play a sport you love while helping build safer communities for young people across Ireland. All proceeds go directly to our prevention and support programmes.',
    date: 'Register Now',
    location: 'Ireland',
    image:
      'https://images.pexels.com/photos/8007094/pexels-photo-8007094.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/events/safe-streets-ireland-padel#tickets',
    cta: 'Register & Donate',
    featured: true,
  },
  {
    id: 'boxing-2026',
    tag: 'Fundraiser',
    tagColor: 'bg-charcoal',
    category: 'Boxing Tournament',
    title: 'Safe Streets Ireland — Boxing Fundraiser',
    description:
      'Step into the ring for safer streets. A boxing tournament in support of Safe Streets Ireland — date, venue and ticket details to be announced. Follow along or donate today to support the campaign.',
    date: 'TBA',
    location: 'Ireland',
    image: '/images/events/AA13AD4F-A151-4B32-8694-6154F53E32F5.PNG',
    href: '/events/safe-streets-ireland-boxing',
    cta: 'Coming Soon',
    featured: false,
  },
];

function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal card overflow-hidden p-0 group"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span
          className={`absolute top-3 left-3 ${event.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
        >
          {event.tag}
        </span>
        {event.featured && (
          <span className="absolute top-3 right-3 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-2">
          {event.category}
        </div>
        <h3 className="text-xl font-extrabold text-charcoal mb-3 leading-snug">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {event.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            {event.date}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {event.location}
          </div>
        </div>

        <Link
          to={event.href}
          className="inline-flex items-center gap-2 btn-primary text-sm group/btn"
        >
          {event.cta}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function Events() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="events" className="py-24 bg-warm-50 speckle">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-5 border border-orange-100">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </div>
          <h2 className="section-heading mb-4">
            Events &amp; <span className="gradient-text">Fundraisers</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Support Safe Streets Ireland by taking part in our fundraising events. Every ticket, every entry, every donation helps protect young lives.
          </p>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}

          {/* "More coming soon" placeholder */}
          <div className="reveal card border-2 border-dashed border-orange-200 bg-orange-50/50 flex flex-col items-center justify-center text-center p-10 min-h-[300px]"
            style={{ transitionDelay: '240ms' }}>
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7 text-orange-400" />
            </div>
            <h3 className="text-lg font-extrabold text-charcoal mb-2">More Events Coming</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              We're planning more fundraisers and community events. Follow us on social media for announcements.
            </p>
            <a
              href="https://www.instagram.com/safestreetsireland/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-500 text-sm font-bold hover:text-orange-600 transition-colors"
            >
              Follow for Updates
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white splatter">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Want to Organise an Event?</h3>
          <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
            If you'd like to run a fundraiser or community event in support of Safe Streets Ireland, we'd love to hear from you.
          </p>
          <a
            href="#contact"
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-300 hover:shadow-lg inline-block"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
