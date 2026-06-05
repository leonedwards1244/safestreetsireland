import { useEffect, useRef } from 'react';
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  BookOpen,
  Star,
  Handshake,
  Lightbulb,
} from 'lucide-react';

const missionPoints = [
  { icon: Shield, text: 'Reduce youth violence and knife crime across Ireland' },
  { icon: Heart, text: 'Support families affected by violence and crime' },
  { icon: BookOpen, text: 'Promote education, prevention, and early intervention' },
  { icon: Lightbulb, text: 'Encourage positive pathways for young people through community engagement' },
  { icon: Star, text: 'Raise awareness about the consequences of violence' },
  { icon: Handshake, text: 'Work alongside youth organisations, community groups, schools, and local leaders' },
];

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    desc: 'Every person affected by violence deserves empathy, dignity, and unconditional support.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Change happens from the ground up. We amplify the power of communities working together.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Shield,
    title: 'Prevention First',
    desc: 'We invest in stopping violence before it happens, not just responding after the fact.',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    icon: Star,
    title: 'Hope & Opportunity',
    desc: 'We create pathways to brighter futures for young people — opportunity over violence.',
    color: 'bg-green-50 text-green-500',
  },
  {
    icon: BookOpen,
    title: 'Education',
    desc: 'Knowledge and awareness are the most powerful tools in breaking cycles of violence.',
    color: 'bg-amber-50 text-amber-500',
  },
  {
    icon: Handshake,
    title: 'Accountability',
    desc: 'We hold ourselves to the highest standards of transparency, integrity, and impact.',
    color: 'bg-teal-50 text-teal-500',
  },
];

export default function MissionVisionValues() {
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
    <section id="mission" className="py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div ref={(el) => addRef(el, 0)} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-5 border border-orange-200">
            Mission, Vision & Values
          </div>
          <h2 className="section-heading mb-4">
            What Drives <span className="gradient-text">Our Campaign</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            We are united by a shared belief that safer streets, stronger communities, and brighter futures are not only possible — they are achievable.
          </p>
        </div>

        {/* Mission + Vision side by side */}
        <div ref={(el) => addRef(el, 1)} className="reveal grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-orange-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-charcoal">Our Mission</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Safe Streets Ireland exists to protect young lives, support affected families, and create lasting change in communities across Ireland through prevention, education, and collective action.
            </p>
            <ul className="space-y-4">
              {missionPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-10 shadow-lg text-white splatter relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold">Our Vision</h3>
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold leading-snug text-white mb-8">
              "A safer Ireland where every young person has the opportunity to thrive — free from violence, fear, intimidation, and crime."
            </blockquote>
            <p className="text-white/80 text-base leading-relaxed">
              We envision an Ireland where communities are strong, young people are valued, and the cycle of violence is permanently broken — replaced by a culture of respect, opportunity, and hope.
            </p>

            {/* Decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Values */}
        <div ref={(el) => addRef(el, 2)} className="reveal">
          <h3 className="text-2xl font-extrabold text-charcoal text-center mb-10">Our Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${color} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-charcoal mb-2">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
