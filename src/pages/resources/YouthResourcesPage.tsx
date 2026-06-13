import { ArrowLeft, Shield, Phone, Globe, Heart, BookOpen, Users } from 'lucide-react';

const resources = [
  {
    icon: Phone,
    title: 'Childline Ireland',
    description: 'Free, confidential helpline for children and young people up to age 18. Available 24/7.',
    contact: '1800 66 66 66',
    website: 'https://www.childline.ie',
    tag: 'Helpline',
  },
  {
    icon: Heart,
    title: 'BeLonG To Youth Services',
    description: 'National organisation supporting LGBTQ+ young people in Ireland aged 14–23.',
    contact: '01 670 6223',
    website: 'https://www.belongto.org',
    tag: 'Support',
  },
  {
    icon: Users,
    title: 'SpunOut.ie',
    description: 'Ireland\'s youth information website — mental health, relationships, identity, and more.',
    website: 'https://spunout.ie',
    tag: 'Information',
  },
  {
    icon: BookOpen,
    title: 'Youth Work Ireland',
    description: 'Connecting young people to local youth services, clubs, and community programmes nationwide.',
    website: 'https://www.youthworkireland.ie',
    tag: 'Community',
  },
  {
    icon: Globe,
    title: 'Jigsaw',
    description: 'Free mental health support for young people aged 12–25, with centres across Ireland.',
    website: 'https://ie.jigsaw.ie',
    tag: 'Mental Health',
  },
  {
    icon: Shield,
    title: 'Safe Streets Ireland — Youth Programme',
    description: 'Our on-the-ground youth outreach programme connects at-risk young people with mentors and safe spaces.',
    tag: 'Safe Streets',
  },
];

const tagColors: Record<string, string> = {
  Helpline: 'bg-red-100 text-red-700',
  Support: 'bg-pink-100 text-pink-700',
  Information: 'bg-blue-100 text-blue-700',
  Community: 'bg-green-100 text-green-700',
  'Mental Health': 'bg-purple-100 text-purple-700',
  'Safe Streets': 'bg-orange-100 text-orange-700',
};

export default function YouthResourcesPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-charcoal text-white">
        <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />
        <div className="max-w-5xl mx-auto px-5 py-10 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-charcoal text-white pb-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Youth Resources</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            A curated list of trusted services and organisations supporting young people across Ireland — from mental health to crisis support.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="bg-white rounded-2xl border border-warm-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[r.tag]}`}>{r.tag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
                </div>
                <div className="mt-auto flex flex-col gap-1.5 text-sm">
                  {r.contact && (
                    <a href={`tel:${r.contact.replace(/\s/g, '')}`} className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                      {r.contact}
                    </a>
                  )}
                  {r.website && (
                    <a href={r.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors truncate">
                      {r.website.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-extrabold mb-2">Need Immediate Help?</h2>
          <p className="text-orange-100 mb-5">If you or someone you know is in danger, contact the emergency services immediately.</p>
          <a href="tel:999" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-7 py-3 rounded-full hover:bg-orange-50 transition-colors">
            <Phone className="w-4 h-4" />
            Call 999
          </a>
        </div>
      </div>
    </div>
  );
}
