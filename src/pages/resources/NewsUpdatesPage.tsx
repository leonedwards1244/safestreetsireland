import { ArrowLeft, Shield, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';

const articles = [
  {
    date: 'June 2025',
    title: 'Safe Streets Ireland Expands to Limerick',
    excerpt: 'Following the success of our Dublin and Cork programmes, we are proud to announce the launch of our community outreach initiative in Limerick city.',
    category: 'Organisation News',
    readTime: '3 min read',
  },
  {
    date: 'May 2025',
    title: 'New Partnership with An Garda Síochána Community Policing Units',
    excerpt: 'A formal memorandum of understanding has been signed, enabling closer cooperation between Safe Streets volunteers and local community policing teams.',
    category: 'Partnerships',
    readTime: '4 min read',
  },
  {
    date: 'April 2025',
    title: 'Youth Violence Summit 2025 — Key Takeaways',
    excerpt: 'Our team attended and presented at the national Youth Violence Summit, sharing data from our frontline work and advocating for increased early intervention funding.',
    category: 'Events',
    readTime: '6 min read',
  },
  {
    date: 'March 2025',
    title: '200 Young People Engaged in Q1 2025',
    excerpt: 'Our first quarter impact figures show significant growth — 200 young people participated in Safe Streets programmes between January and March.',
    category: 'Impact',
    readTime: '2 min read',
  },
  {
    date: 'February 2025',
    title: 'Understanding County Lines: What Parents Need to Know',
    excerpt: 'A detailed explainer on how criminal networks recruit vulnerable young people in Irish towns and cities, and how families can spot the warning signs early.',
    category: 'Education',
    readTime: '7 min read',
  },
  {
    date: 'January 2025',
    title: 'Safe Streets Ireland — 2024 Annual Impact Report',
    excerpt: 'Our full annual report is now available. Read about the lives changed, the communities strengthened, and the challenges we overcame in 2024.',
    category: 'Reports',
    readTime: '10 min read',
  },
];

const categoryColors: Record<string, string> = {
  'Organisation News': 'bg-blue-100 text-blue-700',
  Partnerships: 'bg-green-100 text-green-700',
  Events: 'bg-purple-100 text-purple-700',
  Impact: 'bg-orange-100 text-orange-700',
  Education: 'bg-yellow-100 text-yellow-700',
  Reports: 'bg-gray-100 text-gray-700',
};

export default function NewsUpdatesPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">News &amp; Updates</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            The latest from Safe Streets Ireland — campaign updates, community stories, and important news about youth safety across Ireland.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-14">
        {/* Featured article */}
        <div className="bg-white rounded-2xl border border-warm-200 p-8 mb-8 hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[articles[0].category]}`}>{articles[0].category}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{articles[0].date}</span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{articles[0].readTime}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{articles[0].title}</h2>
          <p className="text-gray-500 leading-relaxed mb-4">{articles[0].excerpt}</p>
          <button className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">
            Read More <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rest of articles */}
        <div className="grid md:grid-cols-2 gap-5">
          {articles.slice(1).map((a) => (
            <div key={a.title} className="bg-white rounded-2xl border border-warm-200 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[a.category] ?? 'bg-gray-100 text-gray-600'}`}>{a.category}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug">{a.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{a.excerpt}</p>
              <div className="flex items-center justify-between pt-2 border-t border-warm-200">
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</span>
                <button className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-semibold text-xs transition-colors">
                  Read More <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-14 bg-orange-500 rounded-2xl p-8 text-white text-center">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Tag className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Stay Informed</h2>
          <p className="text-orange-100 mb-5 max-w-md mx-auto">Get our latest updates delivered directly to your inbox. No spam — just the news that matters.</p>
          <a href="/#newsletter" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-7 py-3 rounded-full hover:bg-orange-50 transition-colors">
            Subscribe to Our Newsletter
          </a>
        </div>
      </div>
    </div>
  );
}
