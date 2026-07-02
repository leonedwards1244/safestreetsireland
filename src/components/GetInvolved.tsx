import { useEffect, useRef } from 'react';
import { Heart, HandHeart, Handshake, Users, ArrowRight } from 'lucide-react';
import { type ModalType } from './ActionModals';
import DonateButton from './DonateButton';

const actions: Array<{
  id: NonNullable<ModalType>;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  cta: string;
  color: string;
  light: string;
  accent: string;
  border: string;
  featured?: boolean;
}> = [
  {
    id: 'volunteer',
    icon: HandHeart,
    title: 'Volunteer',
    subtitle: 'Give Your Time',
    description:
      'Join hundreds of dedicated volunteers across Ireland. Whether you can spare a few hours a week or just occasionally, your time makes a real difference to young people in your community.',
    points: [
      'Youth mentorship and support programmes',
      'Community outreach and awareness events',
      'School visits and education initiatives',
      'Family support coordination',
    ],
    cta: 'Become a Volunteer',
    color: 'bg-orange-500',
    light: 'bg-orange-50',
    accent: 'text-orange-600',
    border: 'border-orange-200',
  },
  {
    id: 'donate',
    icon: Heart,
    title: 'Donate',
    subtitle: 'Fund the Change',
    description:
      'Your donation directly funds prevention programmes, community events, youth mentorship, and family support services across Ireland. Every contribution — no matter the size — saves lives.',
    points: [
      '€10 funds youth workshop materials',
      '€25 supports a family counselling session',
      '€50 runs a community safety event',
      '€100 funds a month of youth outreach',
    ],
    cta: 'Make a Donation',
    color: 'bg-red-500',
    light: 'bg-red-50',
    accent: 'text-red-600',
    border: 'border-red-200',
    featured: true,
  },
  {
    id: 'partner',
    icon: Handshake,
    title: 'Partner With Us',
    subtitle: 'Institutional Impact',
    description:
      'Schools, businesses, councils, sports clubs, faith organisations, and community groups — join the Safe Streets Ireland partner network and help amplify our reach across communities.',
    points: [
      'Corporate social responsibility programmes',
      'Workplace awareness and fundraising',
      'School and youth club partnerships',
      'Council and community organisation alignment',
    ],
    cta: 'Become a Partner',
    color: 'bg-blue-500',
    light: 'bg-blue-50',
    accent: 'text-blue-600',
    border: 'border-blue-200',
  },
  {
    id: 'chapter',
    icon: Users,
    title: 'Community Action',
    subtitle: 'Local Leadership',
    description:
      'Start a Safe Streets chapter in your area. We provide the tools, training, and support you need to lead community-level change and make your streets safer for everyone.',
    points: [
      'Training and leadership resources',
      'Community event planning support',
      'Access to national Safe Streets network',
      'Guidance from experienced campaigners',
    ],
    cta: 'Start a Chapter',
    color: 'bg-green-500',
    light: 'bg-green-50',
    accent: 'text-green-600',
    border: 'border-green-200',
  },
];

interface GetInvolvedProps {
  activeModal: ModalType;
  onOpenModal: (type: ModalType) => void;
  onCloseModal: () => void;
}

export default function GetInvolved({ onOpenModal }: GetInvolvedProps) {
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => {
    if (el) revealRefs.current[i] = el;
  };

  return (
    <>
      <section id="get-involved" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          {/* Header */}
          <div ref={(el) => addRef(el, 0)} className="reveal text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-5 border border-orange-100">
              Take Action Today
            </div>
            <h2 className="section-heading mb-4">
              Get <span className="gradient-text">Involved</span>
            </h2>
            <p className="section-subheading max-w-2xl mx-auto">
              There are many ways to support Safe Streets Ireland. Every action you take — big or small — contributes to safer communities and brighter futures for young people across Ireland.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {actions.map(({ id, icon: Icon, title, subtitle, description, points, cta, color, accent, border, featured }, i) => (
              <div
                key={id}
                ref={(el) => addRef(el, i + 1)}
                className={`reveal card relative overflow-hidden border ${border} ${featured ? 'ring-2 ring-red-200' : ''}`}
              >
                {featured && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Needed
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className={`text-xs font-bold uppercase tracking-wider ${accent} mb-1`}>{subtitle}</div>
                <h3 className="text-2xl font-extrabold text-charcoal mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>

                <ul className="space-y-2 mb-7">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${color} flex-shrink-0 mt-2`} />
                      <span className="text-gray-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>

                {id === 'donate' ? (
                  <DonateButton
                    className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full ${color} text-white hover:opacity-90 hover:shadow-md transition-all duration-300 group`}
                  >
                    {cta}
                  </DonateButton>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenModal(id)}
                    className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full ${color} text-white hover:opacity-90 hover:shadow-md transition-all duration-300 group`}
                  >
                    {cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div ref={(el) => addRef(el, 5)} className="reveal mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white splatter">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Not Sure Where to Start?</h3>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
              Reach out to our team. We'll help you find the right way to get involved based on your skills, time, and location.
            </p>
            <a href="#contact" className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-all duration-300 hover:shadow-lg inline-block">
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
