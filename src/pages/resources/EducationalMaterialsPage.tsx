import { ArrowLeft, Shield, BookOpen, Download, ExternalLink, FileText, Video, Users, Rocket } from 'lucide-react';

const materials = [
  {
    icon: FileText,
    title: 'Understanding County Lines & Knife Crime',
    description: 'A plain-language guide for parents, teachers, and community workers explaining how criminal networks target young people.',
    type: 'Guide',
    audience: 'Adults',
    href: 'https://www.tusla.ie/children-first/what-is-child-abuse/types-of-abuse/',
    source: 'tusla.ie',
  },
  {
    icon: Video,
    title: 'Safe Streets Awareness Video',
    description: 'Short educational video highlighting the warning signs of gang involvement and how to intervene early.',
    type: 'Video',
    audience: 'All Ages',
    href: 'https://www.youtube.com/@GardaSiochana',
    source: 'youtube.com',
  },
  {
    icon: BookOpen,
    title: 'School Safeguarding Toolkit',
    description: 'Practical resources for secondary school staff to identify, support, and report concerns about at-risk students.',
    type: 'Toolkit',
    audience: 'Schools',
    href: 'https://www.gov.ie/en/publication/115e6-child-safeguarding-statement/',
    source: 'gov.ie',
  },
  {
    icon: Users,
    title: 'Community Bystander Training',
    description: 'Step-by-step programme teaching community members how to safely intervene or report when they witness violence.',
    type: 'Programme',
    audience: 'Community',
    href: 'https://www.hse.ie/eng/services/list/4/mental-health-services/connect/resources/',
    source: 'hse.ie',
  },
  {
    icon: FileText,
    title: 'Talking to Your Child About Violence',
    description: 'Age-appropriate conversation starters and guidance for parents to discuss peer pressure, gangs, and personal safety.',
    type: 'Guide',
    audience: 'Parents',
    href: 'https://www.barnardos.ie/learning-development/students-researchers/research-library/documents/barnardos-lets-talk-guide.pdf',
    source: 'barnardos.ie',
  },
  {
    icon: Download,
    title: 'Youth Safety Pledge',
    description: 'A printable pledge card for young people committing to non-violence and mutual respect in their communities.',
    type: 'Printable',
    audience: 'Youth',
    href: 'https://spunout.ie/life/article/personal-safety-young-people',
    source: 'spunout.ie',
  },
  {
    icon: Rocket,
    title: 'Superteam Ireland',
    description: 'A non-profit accelerator funded by Solana offering grants, workshops, and a safe space at Dogpatch Labs. Talent Hubs run every Friday — open to students and builders looking to grow their start-up and get educated in Web3.',
    type: 'Accelerator',
    audience: 'Students & Builders',
    href: 'https://superteam.fun/ireland',
    source: 'superteam.fun/ireland',
  },
];

const typeColors: Record<string, string> = {
  Guide: 'bg-blue-100 text-blue-700',
  Video: 'bg-purple-100 text-purple-700',
  Toolkit: 'bg-green-100 text-green-700',
  Programme: 'bg-yellow-100 text-yellow-700',
  Printable: 'bg-pink-100 text-pink-700',
  Accelerator: 'bg-teal-100 text-teal-700',
};

const audienceColors: Record<string, string> = {
  Adults: 'text-gray-500',
  'All Ages': 'text-gray-500',
  Schools: 'text-gray-500',
  Community: 'text-gray-500',
  Parents: 'text-gray-500',
  Youth: 'text-gray-500',
  'Students & Builders': 'text-gray-500',
};

export default function EducationalMaterialsPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Educational Materials</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Free resources for schools, families, and communities to raise awareness, build resilience, and prevent youth violence.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="bg-white rounded-2xl border border-warm-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[m.type] ?? 'bg-gray-100 text-gray-600'}`}>{m.type}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{m.source}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-warm-200">
                  <span className={`text-xs font-medium ${audienceColors[m.audience]}`}>For: {m.audience}</span>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Resource
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Request CTA */}
        <div className="mt-14 bg-white rounded-2xl border border-warm-200 p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-orange-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request a Workshop</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Safe Streets Ireland can deliver in-person or virtual educational sessions for schools, youth groups, or community organisations.</p>
          <a
            href="mailto:info@safestreetsireland.ie"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
