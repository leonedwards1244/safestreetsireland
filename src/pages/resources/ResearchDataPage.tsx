import { ArrowLeft, Shield, BarChart2, FileText, ExternalLink, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';

const stats = [
  { value: '42%', label: 'of knife crime victims in Ireland are under 25', source: 'CSO 2023' },
  { value: '1 in 4', label: 'young people report witnessing violence in their community', source: 'ESRI 2022' },
  { value: '68%', label: 'reduction in reoffending linked to early intervention programmes', source: 'Dept. of Justice 2023' },
  { value: '€2.3B', label: 'estimated annual cost of youth crime to the Irish economy', source: 'NUIG Research 2021' },
];

const reports = [
  {
    icon: FileText,
    title: 'Youth Crime & Violence in Ireland — Annual Overview 2023',
    org: 'Central Statistics Office',
    year: '2023',
    website: 'https://www.cso.ie',
  },
  {
    icon: BookOpen,
    title: 'At-Risk Youth: Early Intervention Outcomes',
    org: 'Economic & Social Research Institute',
    year: '2022',
    website: 'https://www.esri.ie',
  },
  {
    icon: BarChart2,
    title: 'Knife Crime Trends — A Five-Year Analysis',
    org: 'An Garda Síochána',
    year: '2023',
    website: 'https://www.garda.ie',
  },
  {
    icon: TrendingUp,
    title: 'Community Safety Partnerships: Evidence Base',
    org: 'Department of Justice',
    year: '2023',
    website: 'https://www.justice.ie',
  },
  {
    icon: AlertTriangle,
    title: 'County Lines Expansion in Irish Urban Centres',
    org: 'UCD School of Criminology',
    year: '2022',
    website: 'https://www.ucd.ie',
  },
  {
    icon: FileText,
    title: 'Safe Streets Ireland — Impact Report 2024',
    org: 'Safe Streets Ireland',
    year: '2024',
    tag: 'Our Research',
  },
];

export default function ResearchDataPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Research &amp; Data</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Evidence-based research, statistics, and reports shaping our understanding of youth violence in Ireland.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-14">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-warm-200 p-6 text-center">
              <div className="text-4xl font-extrabold text-orange-500 mb-2">{s.value}</div>
              <p className="text-gray-600 text-sm leading-snug mb-2">{s.label}</p>
              <span className="text-xs text-gray-400">{s.source}</span>
            </div>
          ))}
        </div>

        {/* Reports */}
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Reports &amp; Publications</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {reports.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="bg-white rounded-2xl border border-warm-200 p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{r.title}</h3>
                    {r.tag && (
                      <span className="flex-shrink-0 text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{r.tag}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{r.org} &mdash; {r.year}</p>
                  {r.website && (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 text-xs font-semibold mt-2 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Source
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 bg-charcoal rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-extrabold mb-2">Collaborate With Us</h2>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">Are you a researcher, academic, or institution interested in partnering on youth safety research in Ireland?</p>
          <a
            href="mailto:research@safestreetsireland.ie"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-colors"
          >
            Contact Our Research Team
          </a>
        </div>
      </div>
    </div>
  );
}
