interface Supporter {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

const supporters: Supporter[] = [
  {
    id: 'garda',
    name: 'An Garda Síochána',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Garda_S%C3%ADoch%C3%A1na_logo.svg/320px-Garda_S%C3%ADoch%C3%A1na_logo.svg.png',
    websiteUrl: 'https://www.garda.ie',
  },
  {
    id: 'tusla',
    name: 'Tusla',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Tusla_logo.svg/320px-Tusla_logo.svg.png',
    websiteUrl: 'https://www.tusla.ie',
  },
  {
    id: 'gaa',
    name: 'GAA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Gaelic_Athletic_Association_logo.svg/240px-Gaelic_Athletic_Association_logo.svg.png',
    websiteUrl: 'https://www.gaa.ie',
  },
  {
    id: 'fai',
    name: 'Football Association of Ireland',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/FAI_Badge.svg/240px-FAI_Badge.svg.png',
    websiteUrl: 'https://www.fai.ie',
  },
  {
    id: 'aib',
    name: 'AIB',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/AIB_logo.svg/320px-AIB_logo.svg.png',
    websiteUrl: 'https://www.aib.ie',
  },
  {
    id: 'boi',
    name: 'Bank of Ireland',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Bank_of_Ireland_logo.svg/320px-Bank_of_Ireland_logo.svg.png',
    websiteUrl: 'https://www.bankofireland.com',
  },
  {
    id: 'rte',
    name: 'RTÉ',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/RT%C3%89_logo_2019.svg/320px-RT%C3%89_logo_2019.svg.png',
    websiteUrl: 'https://www.rte.ie',
  },
  {
    id: 'vodafone',
    name: 'Vodafone Ireland',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/240px-Vodafone_icon.svg.png',
    websiteUrl: 'https://www.vodafone.ie',
  },
  {
    id: 'dcc',
    name: 'Dublin City Council',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Dublin_City_Council_logo.svg/240px-Dublin_City_Council_logo.svg.png',
    websiteUrl: 'https://www.dublincity.ie',
  },
  {
    id: 'irfu',
    name: 'IRFU',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/IrishRFU.svg/240px-IrishRFU.svg.png',
    websiteUrl: 'https://www.irishrugby.ie',
  },
  {
    id: 'doj',
    name: 'Dept. of Justice',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Coat_of_arms_of_Ireland.svg/200px-Coat_of_arms_of_Ireland.svg.png',
    websiteUrl: 'https://www.gov.ie/justice',
  },
  {
    id: 'energia',
    name: 'Energia',
    logoUrl: 'https://logo.clearbit.com/energia.ie',
    websiteUrl: 'https://www.energia.ie',
  },
  {
    id: 'irishtimes',
    name: 'The Irish Times',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/The_Irish_Times_Logo.svg/320px-The_Irish_Times_Logo.svg.png',
    websiteUrl: 'https://www.irishtimes.com',
  },
  {
    id: 'lidl',
    name: 'Lidl Ireland',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/320px-Lidl-Logo.svg.png',
    websiteUrl: 'https://www.lidl.ie',
  },
  {
    id: 'kerry',
    name: 'Kerry Group',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Kerry_Group_logo.svg/320px-Kerry_Group_logo.svg.png',
    websiteUrl: 'https://www.kerrygroup.com',
  },
];

function SupporterTile({ supporter }: { supporter: Supporter }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://placehold.co/96x48/f3f4f6/9ca3af?text=${encodeURIComponent(supporter.name)}`;
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-2.5 px-8 py-1 group">
      <div className="w-24 h-12 flex items-center justify-center">
        <img
          src={supporter.logoUrl}
          alt={`${supporter.name} logo`}
          onError={handleError}
          className="max-h-12 max-w-[96px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
      <span className="text-[11px] font-semibold text-gray-400 group-hover:text-orange-500 whitespace-nowrap transition-colors duration-300">
        {supporter.name}
      </span>
    </div>
  );

  if (supporter.websiteUrl) {
    return (
      <a
        href={supporter.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${supporter.name}`}
        className="flex-shrink-0"
      >
        {content}
      </a>
    );
  }

  return <div className="flex-shrink-0">{content}</div>;
}

// Duplicate the array so the marquee loops seamlessly
const doubled = [...supporters, ...supporters];

export default function SupportedBy() {
  return (
    <section className="py-14 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Proudly Supported By
        </p>
        <div className="mx-auto w-12 h-0.5 bg-orange-400 rounded-full" />
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track flex items-center">
          {doubled.map((s, i) => (
            <SupporterTile key={`${s.id}-${i}`} supporter={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
