const supporters = [
  {
    name: 'An Garda Síochána',
    abbr: 'AGS',
    color: '#003DA5',
    bg: '#EEF3FB',
    domain: 'garda.ie',
  },
  {
    name: 'Tusla',
    abbr: 'TUSLA',
    color: '#00A550',
    bg: '#E6F7EE',
    domain: 'tusla.ie',
  },
  {
    name: 'GAA',
    abbr: 'GAA',
    color: '#009B48',
    bg: '#E6F5EE',
    domain: 'gaa.ie',
  },
  {
    name: 'FAI',
    abbr: 'FAI',
    color: '#006400',
    bg: '#EAF4EA',
    domain: 'fai.ie',
  },
  {
    name: 'AIB',
    abbr: 'AIB',
    color: '#1B4A92',
    bg: '#EDF2FB',
    domain: 'aib.ie',
  },
  {
    name: 'Bank of Ireland',
    abbr: 'BOI',
    color: '#0042A5',
    bg: '#EEF3FB',
    domain: 'bankofireland.com',
  },
  {
    name: 'RTÉ',
    abbr: 'RTÉ',
    color: '#CC0000',
    bg: '#FBEEEE',
    domain: 'rte.ie',
  },
  {
    name: 'Vodafone',
    abbr: 'VDF',
    color: '#E60000',
    bg: '#FBEEEE',
    domain: 'vodafone.ie',
  },
  {
    name: 'Dublin City Council',
    abbr: 'DCC',
    color: '#003580',
    bg: '#EEF2FB',
    domain: 'dublincity.ie',
  },
  {
    name: 'IRFU',
    abbr: 'IRFU',
    color: '#00703C',
    bg: '#E6F4ED',
    domain: 'irishrugby.ie',
  },
  {
    name: 'Dept. of Justice',
    abbr: 'DOJ',
    color: '#1A3A5C',
    bg: '#EDF1F7',
    domain: 'gov.ie',
  },
  {
    name: 'Energia',
    abbr: 'ENR',
    color: '#E87722',
    bg: '#FDF3EA',
    domain: 'energia.ie',
  },
  {
    name: 'Irish Times',
    abbr: 'IT',
    color: '#1C1C1C',
    bg: '#F2F2F2',
    domain: 'irishtimes.com',
  },
  {
    name: 'Lidl Ireland',
    abbr: 'LIDL',
    color: '#0050AA',
    bg: '#EEF3FB',
    domain: 'lidl.ie',
  },
  {
    name: 'Kerry Group',
    abbr: 'KRY',
    color: '#C8102E',
    bg: '#FBEEEE',
    domain: 'kerrygroup.com',
  },
];

function LogoTile({ name, abbr, color, bg, domain }: (typeof supporters)[number]) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 mx-6 w-36"
    >
      {/* Logo image with text fallback */}
      <div
        className="w-24 h-14 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: bg, border: `1.5px solid ${color}22` }}
      >
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="w-16 h-10 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full h-full items-center justify-center text-sm font-black tracking-wide"
          style={{ color }}
        >
          {abbr}
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-500 text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[8rem]">
        {name}
      </span>
    </div>
  );
}

export default function SupportedBy() {
  // Duplicate array for seamless infinite loop
  const doubled = [...supporters, ...supporters];

  return (
    <section className="py-14 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
          Proudly Supported By
        </p>
        <div className="mx-auto w-12 h-0.5 bg-orange-400 rounded-full" />
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track flex items-start">
          {doubled.map((s, i) => (
            <LogoTile key={`${s.domain}-${i}`} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
