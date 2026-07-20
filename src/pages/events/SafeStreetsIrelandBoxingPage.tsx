// src/pages/events/SafeStreetsIrelandBoxingPage.tsx
import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Copy,
  CreditCard,
  Dumbbell,
  ExternalLink,
  Facebook,
  HandHeart,
  HeartHandshake,
  Info,
  Instagram,
  Linkedin,
  MapPin,
  Megaphone,
  Navigation,
  Shield,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

import FundraiselyDonateButton from "../../components/DonateButton";

const EVENT_SLUG = "/events/safe-streets-ireland-boxing";
const EVENT_NAME = "Safe Streets Ireland Boxing Tournament";
const EVENT_DATE = "TBA";
const EVENT_YEAR = "2026";
const EVENT_TIME = "TBA";
const EVENT_LOCATION = "TBA";
const EVENT_ADDRESS = "TBA";
const EVENT_FULL_ADDRESS = "TBA";

const SAFE_STREETS_URL = "https://safestreetsireland.com/";
const SAFE_STREETS_INSTAGRAM_URL = "https://www.instagram.com/safestreetsireland/";
const SAFE_STREETS_LINKEDIN_URL = "https://www.linkedin.com/company/safe-streets-ireland/";
const SAFE_STREETS_FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61590416144888";
const SUPERTEAM_URL = "https://x.com/superteamIE";
const FUNDRAISELY_URL = "https://fundraisely.ie";

const SAFE_STREETS_LOGO = "/SSI_LOGO_TRANSPARENT.png";
const SUPERTEAM_LOGO = "/superteam_ireland_logo.jpeg";
const FUNDRAISELY_LOGO = "/fundraisely.png";

const HERO_IMAGE_SRC = "/images/events/AA13AD4F-A151-4B32-8694-6154F53E32F5.PNG";

function useEventSeo() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const title = `${EVENT_NAME} | Coming Soon | FundRaisely`;
    const description =
      "Safe Streets Ireland boxing tournament — details to be announced. Register your interest and support the campaign with a card, Apple Pay, Google Pay or Solana crypto donation.";

    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setPropertyMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta(
      "keywords",
      "Safe Streets Ireland, boxing tournament, youth crime prevention Ireland, knife crime prevention Ireland, community fundraiser, FundRaisely, Superteam Ireland",
    );

    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description);
    setPropertyMeta("og:type", "event");
    setPropertyMeta("og:image", SAFE_STREETS_LOGO);
    setPropertyMeta("og:url", `${window.location.origin}${EVENT_SLUG}`);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${EVENT_SLUG}`);

    return () => {};
  }, []);
}

export default function SafeStreetsIrelandBoxingPage() {
  useEventSeo();
  const noop = () => {};

  const eventPageUrl =
    typeof window !== "undefined" ? `${window.location.origin}${EVENT_SLUG}` : "";

  const scrollToTickets = () => {
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    const mobileEl = document.getElementById("event-tickets-mobile");
    const desktopEl = document.getElementById("event-tickets");
    const el = isDesktop ? desktopEl : mobileEl || desktopEl;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#f8f3ea] text-[#17120d]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#17120d] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#17120d]/92 via-[#1f1a14]/90 to-[#0c0a07]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(223,116,29,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex flex-col gap-4 pt-5 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <a
              href={SAFE_STREETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full min-w-0 items-center justify-center sm:w-auto sm:justify-start"
              aria-label="Visit Safe Streets Ireland"
            >
              <img
                src={SAFE_STREETS_LOGO}
                alt="Safe Streets Ireland logo"
                className="h-14 max-w-full object-contain sm:h-20 lg:h-24"
              />
            </a>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 xs:flex xs:flex-wrap xs:items-center xs:justify-center sm:w-auto sm:justify-end sm:gap-3">
              <span className="inline-flex min-w-0 items-center justify-center rounded-full bg-white/12 px-4 py-3 text-xs font-black text-white ring-1 ring-white/25 backdrop-blur sm:px-5 sm:text-sm">
                Details TBA
              </span>
              <DonateButton className="w-full xs:w-auto" onClick={noop} />
            </div>
          </div>

          <div className="grid min-w-0 gap-8 pb-20 pt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 lg:pb-28 lg:pt-4">
            <div className="min-w-0">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white/18 px-4 py-2 text-xs font-black ring-1 ring-white/25 backdrop-blur sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#df741d]" />
                <span className="min-w-0">Community-Led Campaign</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Step into
                <span className="block">the ring for</span>
                <span className="block">safer streets.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/92 sm:mt-6 sm:text-lg">
                Join <span className="font-black">Safe Streets Ireland</span> for a
                boxing tournament in support of the campaign. Date, venue and ticket
                details are <span className="font-black">to be announced</span> —
                register your interest and follow along, or donate today to support
                a community-led campaign working to reduce youth violence through
                prevention, education, action and opportunity.
              </p>

              <div className="mt-7 grid min-w-0 gap-3 sm:grid-cols-3">
                <FactCard icon={<CalendarDays className="h-5 w-5" />} label="Date" value={EVENT_DATE} />
                <FactCard icon={<Clock className="h-5 w-5" />} label="Time" value={EVENT_TIME} />
                <FactCard icon={<MapPin className="h-5 w-5" />} label="Location" value={EVENT_LOCATION} />
              </div>

              <div className="mt-6 flex min-w-0 flex-wrap gap-3">
                <Badge>Tickets: TBA</Badge>
                <Badge>Format: TBA</Badge>
              </div>

              <div className="mt-5 max-w-2xl">
                <DonationPaymentCard tone="hero" onDonateClick={noop} />
              </div>
            </div>

            <div className="min-w-0 space-y-5 lg:pl-12">
              <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/18 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.14)] backdrop-blur">
                <img
                  src={HERO_IMAGE_SRC}
                  alt="Safe Streets Ireland boxing tournament"
                  className="h-[240px] w-full rounded-[1.5rem] object-cover sm:h-[420px]"
                />
              </div>

              <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/18 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/75">
                  Event partners
                </p>

                <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-3">
                  <PartnerLogoCard imgSrc={SAFE_STREETS_LOGO} name="Safe Streets Ireland" href={SAFE_STREETS_URL} />
                  <PartnerLogoCard imgSrc={SUPERTEAM_LOGO} name="Superteam Ireland" href={SUPERTEAM_URL} fallback="Superteam Ireland" />
                  <PartnerLogoCard imgSrc={FUNDRAISELY_LOGO} name="FundRaisely" href={FUNDRAISELY_URL} fallback="FundRaisely" />
                </div>

                <div className="mt-5 min-w-0 rounded-2xl border border-white/20 bg-white/12 p-4">
                  <SafeStreetsSocialLinks tone="hero" />
                </div>
              </div>

              <div id="event-tickets-mobile" className="min-w-0 scroll-mt-4 lg:hidden">
                <MobileTicketPanel />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 92"
            preserveAspectRatio="none"
            className="h-16 w-full fill-[#f8f3ea] sm:h-20"
            aria-hidden="true"
          >
            <path d="M0,70 C240,20 480,20 720,50 C960,80 1200,80 1440,42 L1440,92 L0,92 Z" />
          </svg>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start xl:grid-cols-[minmax(0,1fr)_560px]">
          <div className="min-w-0 space-y-8">
            <SectionCard eyebrow="Event details" title="Boxing, purpose and community action">
              <div className="grid min-w-0 gap-4 md:grid-cols-3">
                <InfoPanel icon={<CalendarDays className="h-6 w-6" />} title="When" text="Date and time to be announced. Follow Safe Streets Ireland on social media for the latest updates." />
                <InfoPanel icon={<MapPin className="h-6 w-6" />} title="Where" text="Venue to be announced. Once confirmed, full address and travel guidance will be published here." />
                <InfoPanel icon={<Ticket className="h-6 w-6" />} title="Tickets" text="Ticket types and prices to be announced. In the meantime, you can support the campaign with a donation." />
              </div>

              <div className="mt-6 rounded-2xl border border-[#eabf99] bg-[#fff6ed] p-5">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#df741d] text-white">
                    <Info className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-[#17120d]">
                      Details coming soon — you can still support today.
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#5f5044]">
                      The boxing tournament is being planned. Once the date, venue and
                      ticket types are confirmed, they will be published here. If you
                      would like to support the campaign before then, you can make a
                      donation online.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Ticket types" title="Choose how you want to take part">
              <div className="grid min-w-0 gap-4">
                <TicketTypeCard
                  icon={<Trophy className="h-6 w-6" />}
                  name="Tournament Entry"
                  price="TBA"
                  description="For boxers who want to compete in the organised tournament. Full format and weight categories to be announced."
                  bullets={[
                    "Compete in the tournament",
                    "Full event access to be confirmed",
                    "Best for boxers who want the full event experience",
                  ]}
                  highlight
                />
                <TicketTypeCard
                  icon={<Dumbbell className="h-6 w-6" />}
                  name="Supporter Ticket"
                  price="TBA"
                  description="For supporters who want to attend and back the campaign without competing in the ring."
                  bullets={[
                    "Watch and support the tournament",
                    "No competition entry",
                    "Good for friends, family and community supporters",
                  ]}
                />
              </div>

              <div className="mt-6">
                <DonationSupportCard onDonateClick={noop} />
              </div>

              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={SAFE_STREETS_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#df741d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#c96316]"
                >
                  Follow for updates
                  <ArrowRight className="h-4 w-4" />
                </a>
                <DonateButton onClick={noop} />
              </div>
            </SectionCard>

            <SectionCard eyebrow="Why it matters" title="A community event for safer streets and brighter futures">
              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <FeatureCard icon={<Shield className="h-6 w-6" />} title="Prevention first" text="Safe Streets Ireland is focused on preventing youth violence and knife crime before more families and communities are affected." />
                <FeatureCard icon={<HeartHandshake className="h-6 w-6" />} title="Support and opportunity" text="The campaign promotes education, community action, youth engagement and positive pathways for young people." />
              </div>

              <div className="mt-4 rounded-2xl border border-[#eabf99] bg-[#fff6ed] p-5">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#df741d] text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-[#17120d]">
                      Sport, community and action in one event.
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#5f5044]">
                      This boxing fundraiser brings people together around a positive
                      message: safer communities are possible when people show up,
                      support each other and create better choices for young people.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Event format" title="Competition and community, side by side">
              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <InfoPanel icon={<Trophy className="h-6 w-6" />} title="The tournament" text="Boxers compete in an organised tournament. The exact format, weight categories and bout structure will be confirmed closer to the event." />
                <InfoPanel icon={<Users className="h-6 w-6" />} title="Supporters and community" text="Supporter tickets make it easy for friends, family and the wider community to attend, watch and back the campaign." />
              </div>
            </SectionCard>

            <SectionCard eyebrow="What to expect" title="A serious cause, a positive atmosphere">
              <p className="mb-6 text-base leading-8 text-[#5f5044]">
                This is a chance to bring people together in a positive setting, support
                the Safe Streets Ireland campaign, and show that community action can be
                active, social and hopeful.
              </p>

              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <FeatureCard icon={<Trophy className="h-6 w-6" />} title="A friendly competition" text="The tournament gives boxers something to compete in, while keeping the event welcoming and community-focused." />
                <FeatureCard icon={<Users className="h-6 w-6" />} title="Room for supporters" text="Supporter tickets make it easy for the whole community to take part without pressure." />
                <FeatureCard icon={<HeartHandshake className="h-6 w-6" />} title="Showing young people better paths" text="Sport creates connection, confidence and belonging. This fundraiser supports the idea that young people need positive spaces, role models and real alternatives." />
                <FeatureCard icon={<HandHeart className="h-6 w-6" />} title="Support that goes beyond the day" text="Every ticket and share helps raise awareness for Safe Streets Ireland's wider work around prevention, education, community action and opportunity." />
              </div>
            </SectionCard>

            <SectionCard eyebrow="Campaign storytelling" title="More than a fundraiser">
              <p className="mb-6 text-base leading-8 text-[#5f5044]">
                Safe Streets Ireland is not just asking people to attend an event. The
                campaign is inviting people to stand behind a message: violence is not
                inevitable, and communities can help create better choices for young
                people.
              </p>

              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <FeatureCard icon={<Megaphone className="h-6 w-6" />} title="A clear message" text="The event gives supporters a simple way to share the campaign's message: safer streets, stronger communities and brighter futures." />
                <FeatureCard icon={<Shield className="h-6 w-6" />} title="Prevention before crisis" text="The focus is on early action, education and community support before young people are pulled further into violence, fear or pressure." />
                <FeatureCard icon={<Users className="h-6 w-6" />} title="People coming together" text="Fundraisers like this create space for conversations between families, supporters, community leaders, local businesses and organisations that want change." />
                <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Hope, not fear" text="The tone of the campaign is positive and practical: highlighting the problem while also showing that better futures are possible." />
              </div>
            </SectionCard>

            <SectionCard eyebrow="Campaign message" title="Violence is not inevitable">
              <div className="rounded-[1.75rem] bg-[#17120d] p-6 text-white sm:p-8">
                <p className="text-lg leading-8 text-white/92">
                  Safe Streets Ireland's message is rooted in prevention, education,
                  community action and hope. This event is one way for supporters to
                  stand with the campaign and help create positive opportunities for
                  young people.
                </p>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                  <a
                    href={SAFE_STREETS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#17120d] transition hover:bg-white/90"
                  >
                    Back to Safe Streets Ireland
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <DonateButton onClick={noop} />
                </div>
              </div>
            </SectionCard>

            <div className="rounded-[2rem] border border-[#e5d4c2] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#df741d]">
                Ticketing &amp; donations
              </p>

              <div className="mt-2 flex items-center gap-3">
                <img src={FUNDRAISELY_LOGO} alt="FundRaisely logo" className="h-8 w-auto object-contain" />
                <h2 className="text-2xl font-black leading-tight text-[#17120d]">
                  Powered by FundRaisely
                </h2>
              </div>

              <p className="mt-4 text-base leading-8 text-[#5f5044]">
                Donations for this event are handled securely by FundRaisely, a platform
                built for clubs, charities and community groups running fundraising
                events. Ticket sales will open once event details are confirmed.
              </p>

              <a
                href={FUNDRAISELY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#17120d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#2a2119]"
              >
                Visit FundRaisely
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* DESKTOP SIDEBAR */}
          <aside
            id="event-tickets"
            className="hidden w-full min-w-0 scroll-mt-6 lg:sticky lg:top-6 lg:block lg:self-start"
          >
            <DesktopTicketPanel />
            <QuickDetailsCard />
            <div className="mt-4">
              <DonationPaymentCard onDonateClick={noop} />
            </div>
            <ShareEventCard eventPageUrl={eventPageUrl} />
          </aside>
        </div>
      </main>
    </div>
  );
}

function FactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[1.75rem] border border-white/25 bg-white p-5 text-[#17120d] shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0df] text-[#df741d]">
        {icon}
      </div>
      <div className="text-xs font-black uppercase tracking-[0.14em] text-[#7d7890]">{label}</div>
      <div className="mt-2 break-words text-lg font-black text-[#17120d]">{value}</div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="max-w-full rounded-full border border-white/40 bg-white px-5 py-3 text-sm font-black text-[#242045] shadow-sm">
      {children}
    </span>
  );
}

function SmallPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#fff6ed] px-3 py-1 text-xs font-bold text-[#9f4d10] ring-1 ring-[#eabf99]">
      {children}
    </span>
  );
}

function SectionCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-[2rem] border border-[#e5d4c2] bg-white p-5 shadow-sm sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#df741d]">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#17120d] sm:text-3xl">{title}</h2>
      <div className="mt-6 min-w-0">{children}</div>
    </section>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#eadccc] bg-[#fffaf4] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0df] text-[#df741d]">
        {icon}
      </div>
      <h3 className="text-lg font-black text-[#17120d]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#5f5044]">{text}</p>
    </div>
  );
}

function InfoPanel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#eadccc] bg-[#fffdf9] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0df] text-[#df741d]">
        {icon}
      </div>
      <h3 className="text-lg font-black text-[#17120d]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#5f5044]">{text}</p>
    </div>
  );
}

function TicketTypeCard({
  icon,
  name,
  price,
  description,
  bullets,
  highlight = false,
}: {
  icon: React.ReactNode;
  name: string;
  price: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-[1.75rem] border p-5 sm:p-6 ${
        highlight ? "border-[#df741d] bg-[#fff6ed] shadow-sm" : "border-[#eadccc] bg-[#fffdf9]"
      }`}
    >
      <div className="grid min-w-0 gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
        <div className="min-w-0">
          <div className="flex min-w-0 items-start justify-between gap-4 md:block">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0df] text-[#df741d]">
              {icon}
            </div>
            <div className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-[#17120d] ring-1 ring-[#eadccc] md:mt-5 md:inline-flex">
              {price}
            </div>
          </div>
          <h3 className="mt-5 break-words text-2xl font-black text-[#17120d] md:max-w-[190px]">
            {name}
          </h3>
        </div>
        <div className="min-w-0">
          <p className="text-sm leading-7 text-[#5f5044] md:text-base md:leading-8">{description}</p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#5f5044] md:text-[15px]">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#df741d]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function QuickDetailsCard() {
  return (
    <div className="mt-4 min-w-0 rounded-[1.75rem] border border-[#e5d4c2] bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#df741d]">
        Event quick details
      </p>

      <div className="mt-4 space-y-3 text-sm leading-6 text-[#5f5044]">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#df741d]" />
          <span>
            <strong className="text-[#17120d]">Date:</strong> {EVENT_DATE} {EVENT_YEAR}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#df741d]" />
          <span>
            <strong className="text-[#17120d]">Time:</strong> {EVENT_TIME}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#df741d]" />
          <span className="min-w-0 break-words">
            <strong className="text-[#17120d]">Venue:</strong> {EVENT_FULL_ADDRESS}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#df741d]" />
          <span>
            <strong className="text-[#17120d]">Tickets:</strong> To be announced.
          </span>
        </div>
      </div>

      <a
        href={SAFE_STREETS_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d4c2] bg-[#fffaf4] px-5 py-3 text-sm font-black text-[#17120d] transition hover:bg-[#fff3e3]"
      >
        Follow for updates
        <Navigation className="h-4 w-4" />
      </a>
    </div>
  );
}

function PartnerLogoCard({
  imgSrc,
  name,
  href,
  fallback,
}: {
  imgSrc: string;
  name: string;
  href?: string;
  fallback?: string;
}) {
  const [failed, setFailed] = React.useState(false);

  const content = (
    <div className="flex min-h-[112px] min-w-0 items-center justify-center rounded-2xl border border-white/20 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:shadow-sm">
      {failed ? (
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#17120d]">{fallback || name}</p>
      ) : (
        <img src={imgSrc} alt={name} onError={() => setFailed(true)} className="max-h-16 max-w-full object-contain" />
      )}
    </div>
  );

  if (!href) return content;
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link to={href} aria-label={`Open ${name}`} className="min-w-0">
        {content}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`} className="min-w-0">
      {content}
    </a>
  );
}

function MobileTicketPanel() {
  return (
    <div className="min-w-0 overflow-hidden rounded-[1.75rem] border border-white/25 bg-white p-3 text-[#17120d] shadow-[0_18px_45px_rgba(0,0,0,0.16)] sm:p-4">
      <TicketIntroCard />
      <div className="min-w-0">
        <ComingSoonCard />
      </div>
    </div>
  );
}

function DesktopTicketPanel() {
  return (
    <>
      <TicketIntroCard />
      <ComingSoonCard />
    </>
  );
}

function TicketIntroCard() {
  return (
    <div className="mb-4 min-w-0 rounded-[1.75rem] border border-[#e5d4c2] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#df741d]">
        Reserve your place
      </p>
      <h3 className="mt-2 text-2xl font-black text-[#17120d]">Get your event ticket</h3>
      <p className="mt-2 text-sm leading-7 text-[#5f5044]">
        Tickets for the Safe Streets Ireland boxing tournament will go on sale once
        event details are confirmed.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <SmallPill>{EVENT_DATE}</SmallPill>
        <SmallPill>{EVENT_TIME}</SmallPill>
        <SmallPill>Details TBA</SmallPill>
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div className="min-w-0 rounded-[1.75rem] border border-[#e5d4c2] bg-[#fffaf4] p-5 shadow-sm">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#df741d] text-white">
          <Info className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black text-[#17120d]">Tickets coming soon</h3>
          <p className="mt-2 text-sm leading-7 text-[#5f5044]">
            Date, venue and ticket types for the boxing tournament are being finalised.
            Follow Safe Streets Ireland on social media for the announcement, or support
            the campaign with a donation today.
          </p>
          <a
            href={SAFE_STREETS_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#c96316] hover:text-[#9f4d10]"
          >
            Follow for updates
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function DonationPaymentCard({
  tone = "light",
  onDonateClick,
}: {
  tone?: "light" | "hero";
  onDonateClick: () => void;
}) {
  const isHero = tone === "hero";

  return (
    <div
      className={`min-w-0 rounded-[1.75rem] border p-5 shadow-sm ${
        isHero
          ? "border-white/25 bg-white/16 text-white backdrop-blur"
          : "border-[#e5d4c2] bg-white text-[#17120d]"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className={`text-xs font-black uppercase tracking-[0.18em] ${isHero ? "text-white/75" : "text-[#df741d]"}`}>
            Donations welcome
          </p>
          <h3 className="mt-2 text-xl font-black">Can't attend? You can still support the campaign.</h3>
          <p className={`mt-2 text-sm leading-7 ${isHero ? "text-white/86" : "text-[#5f5044]"}`}>
            Donate by card through Stripe, including Apple Pay and Google Pay where
            available, or donate with crypto on Solana.
          </p>
        </div>
        <div className="shrink-0">
          <DonateButton label="Donate now" onClick={onDonateClick} className="w-full sm:w-auto" />
        </div>
      </div>

      <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
        <div className={`flex min-w-0 items-center gap-3 rounded-2xl border p-3 ${isHero ? "border-white/20 bg-white/12" : "border-[#eadccc] bg-[#fffaf4]"}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#42368f]">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black">Card payments</p>
            <p className={`text-xs ${isHero ? "text-white/75" : "text-[#7a6758]"}`}>Stripe, Apple Pay, Google Pay</p>
          </div>
        </div>
        <div className={`flex min-w-0 items-center gap-3 rounded-2xl border p-3 ${isHero ? "border-white/20 bg-white/12" : "border-[#eadccc] bg-[#fffaf4]"}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#17120d]">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black">Crypto donations</p>
            <p className={`text-xs ${isHero ? "text-white/75" : "text-[#7a6758]"}`}>Accepted on Solana</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonationSupportCard({ onDonateClick }: { onDonateClick: () => void }) {
  return (
    <div className="min-w-0 rounded-[1.75rem] border border-[#d8d1ff] bg-[#f7f5ff] p-5">
      <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#42368f] text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-black text-[#17120d]">Want to support but not compete?</h3>
            <p className="mt-2 text-sm leading-7 text-[#5f5044]">
              You can make a donation instead. The donation button supports card
              payments, Apple Pay, Google Pay and crypto donations on Solana.
            </p>
          </div>
        </div>
        <DonateButton label="Donate instead" onClick={onDonateClick} className="w-full md:w-auto" />
      </div>
    </div>
  );
}

function SafeStreetsSocialLinks({ tone = "dark", showLabel = true }: { tone?: "hero" | "dark"; showLabel?: boolean }) {
  const links = [
    { label: "Instagram", href: SAFE_STREETS_INSTAGRAM_URL, icon: <Instagram className="h-4 w-4" /> },
    { label: "LinkedIn", href: SAFE_STREETS_LINKEDIN_URL, icon: <Linkedin className="h-4 w-4" /> },
    { label: "Facebook", href: SAFE_STREETS_FACEBOOK_URL, icon: <Facebook className="h-4 w-4" /> },
  ];

  const labelClass = tone === "hero" ? "text-white/75" : "text-[#7a6758]";
  const linkClass =
    tone === "hero"
      ? "border-white/30 bg-white/12 text-white hover:bg-white/22"
      : "border-[#e5d4c2] bg-[#fffaf4] text-[#17120d] hover:bg-[#fff3e3]";

  return (
    <div className="min-w-0">
      {showLabel && (
        <p className={`text-xs font-black uppercase tracking-[0.18em] ${labelClass}`}>
          Follow Safe Streets Ireland
        </p>
      )}
      <div className={showLabel ? "mt-3 flex min-w-0 flex-wrap gap-2" : "flex min-w-0 flex-wrap items-center gap-2"}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Safe Streets Ireland on ${link.label}`}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition ${linkClass}`}
          >
            {link.icon}
            <span className={showLabel ? "" : "sr-only"}>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ShareEventCard({ eventPageUrl }: { eventPageUrl: string }) {
  const [copied, setCopied] = React.useState(false);

  const copyEventLink = async () => {
    if (!eventPageUrl) return;
    try {
      await navigator.clipboard.writeText(eventPageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-4 min-w-0 rounded-[1.75rem] border border-[#e5d4c2] bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#df741d]">Share event</p>
      <h3 className="mt-2 text-lg font-black text-[#17120d]">Send this page to supporters</h3>
      <p className="mt-2 text-sm leading-7 text-[#5f5044]">
        Share the event page with players, supporters, partners and anyone who wants to
        support Safe Streets Ireland.
      </p>
      <button
        type="button"
        onClick={copyEventLink}
        disabled={!eventPageUrl}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d4c2] bg-white px-5 py-3 text-sm font-bold text-[#17120d] transition hover:bg-[#fff6ed] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? "Copied" : "Copy event link"}
        <Copy className="h-4 w-4" />
      </button>
      {eventPageUrl && (
        <p className="mt-3 break-all text-center text-xs leading-6 text-[#7a6758]">{eventPageUrl}</p>
      )}
    </div>
  );
}

function DonateButton({
  label = "Donate now",
  className = "",
  onClick,
}: {
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <FundraiselyDonateButton
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#42368f] px-[18px] py-3 text-center text-sm font-black text-white shadow-sm transition hover:brightness-110 ${className}`}
      title={label}
    >
      {label}
    </FundraiselyDonateButton>
  );
}
