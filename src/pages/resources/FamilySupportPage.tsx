import { ArrowLeft, Shield, Phone, Heart, Users, BookOpen, HelpCircle } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'Tusla — Child and Family Agency',
    description: 'The State agency responsible for child protection and welfare. Contact if you have concerns about a child\'s safety.',
    contact: '01 771 8500',
    website: 'https://www.tusla.ie',
    tag: 'Child Protection',
  },
  {
    icon: Heart,
    title: 'Family Support Line',
    description: 'Confidential listening support for parents and families dealing with a child\'s problem behaviour or substance use.',
    contact: '1800 111 888',
    website: 'https://www.drugs.ie/family',
    tag: 'Helpline',
  },
  {
    icon: Users,
    title: 'Barnardos Ireland',
    description: 'Therapeutic and family support services for children and families experiencing difficulties.',
    contact: '01 453 0355',
    website: 'https://www.barnardos.ie',
    tag: 'Support',
  },
  {
    icon: BookOpen,
    title: 'Parents Plus',
    description: 'Evidence-based parenting programmes and resources to build positive family relationships.',
    website: 'https://www.parentsplus.ie',
    tag: 'Programmes',
  },
  {
    icon: HelpCircle,
    title: 'Family Resource Centres',
    description: 'Community-based centres providing a range of family and social services across Ireland.',
    website: 'https://www.familyresource.ie',
    tag: 'Community',
  },
  {
    icon: Shield,
    title: 'Safe Streets — Family Support',
    description: 'We work directly with families affected by youth violence, offering guidance, signposting, and peer support groups.',
    tag: 'Safe Streets',
  },
];

const tagColors: Record<string, string> = {
  'Child Protection': 'bg-red-100 text-red-700',
  Helpline: 'bg-pink-100 text-pink-700',
  Support: 'bg-blue-100 text-blue-700',
  Programmes: 'bg-green-100 text-green-700',
  Community: 'bg-yellow-100 text-yellow-700',
  'Safe Streets': 'bg-orange-100 text-orange-700',
};

export default function FamilySupportPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      <div className="bg-charcoal text-white">
        <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
        <div className="max-w-5xl mx-auto px-5 py-10">
          <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </div>

      <div className="bg-charcoal text-white pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Family Support</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Guidance and services to help families navigate difficult times — from parenting programmes to crisis intervention.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white rounded-2xl border border-warm-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[s.tag]}`}>{s.tag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                </div>
                <div className="mt-auto flex flex-col gap-1.5 text-sm">
                  {s.contact && (
                    <a href={`tel:${s.contact.replace(/\s/g, '')}`} className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                      {s.contact}
                    </a>
                  )}
                  {s.website && (
                    <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors truncate">
                      {s.website.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 bg-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-extrabold mb-2">Is Your Family in Crisis?</h2>
          <p className="text-orange-100 mb-5">If there is immediate risk to a child or family member, contact emergency services or Tusla without delay.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:999" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-7 py-3 rounded-full hover:bg-orange-50 transition-colors">
              <Phone className="w-4 h-4" />
              Call 999
            </a>
            <a href="tel:0761803100" className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-7 py-3 rounded-full hover:bg-orange-700 transition-colors">
              Tusla Duty Social Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
