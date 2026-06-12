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
    name: 'Department of Justice',
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

function LogoCard({ supporter }: { supporter: Supporter }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://placehold.co/150x80/f3f4f6/9ca3af?text=${encodeURIComponent(supporter.name)}`;
  };

  const inner = (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 shadow-sm hover:shadow-md hover:border-orange-200 hover:scale-105 transition-all duration-300 cursor-pointer">
      <img
        src={supporter.logoUrl}
        alt={`${supporter.name} logo`}
        onError={handleError}
        className="max-h-12 max-w-full w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
      />
      <span className="text-[10px] font-semibold text-gray-400 group-hover:text-orange-500 text-center leading-tight transition-colors duration-300 line-clamp-2">
        {supporter.name}
      </span>
    </div>
  );

  if (supporter.websiteUrl) {
    return (
      <a href={supporter.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${supporter.name}`}>
        {inner}
      </a>
    );
  }

  return inner;
}

export default function SupportedBy() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Proudly Supported By
          </p>
          <div className="mx-auto w-12 h-0.5 bg-orange-400 rounded-full" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {supporters.map((s) => (
            <LogoCard key={s.id} supporter={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
