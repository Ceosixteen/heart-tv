import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Prophet Peter A.D. and Stone International Church — a mission of hope, healing and transformation born in South Sudan.",
};

/* ─── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-28 pt-40 text-white">
      <AmbientBackground variant="navy" orbs />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Founded 29 May 2009
        </p>
        <h1 className="display text-[clamp(2.4rem,5.5vw,4rem)] leading-tight">
          A mission born in suffering,<br className="hidden sm:block" /> sustained by love.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
          Stone International Church and Heart TV exist for one purpose — to
          bring healing, hope and salvation to South Sudan and the world,
          through the Word of God and the power of the Holy Spirit.
        </p>
        <p className="mt-8 text-base font-semibold tracking-wide text-gold">
          "Let love lead."
        </p>
      </div>
    </section>
  );
}

/* ─── Story ─────────────────────────────────────────────────────── */
function Story() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24">
      <AmbientBackground variant="light" orbs={false} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image stack */}
          <Reveal>
            <div className="relative h-[420px] sm:h-[500px]">
              <div className="absolute left-0 top-0 h-4/5 w-3/4 overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/ministry-among-children.jpg"
                  alt="Ministry among children in South Sudan"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 80vw, 40vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-3/5 w-2/3 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white">
                <Image
                  src="/images/children-gathering-field.jpg"
                  alt="Children gathering at a field outreach"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 60vw, 30vw"
                />
              </div>
              {/* Badge */}
              <div className="absolute -right-2 top-8 rounded-xl bg-navy-deep px-4 py-3 text-center text-white shadow-lg sm:right-4">
                <p className="text-2xl font-bold text-gold">2009</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                  Founded
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal>
            <p className="eyebrow text-blue">Our Story</p>
            <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
              From 22 people in Khartoum to a movement across the continent.
            </h2>
            <p className="mt-6 leading-relaxed text-navy/70">
              Stone International Church was born on 29 May 2009 in Khartoum,
              Sudan — not as a church, but as a prayer group. Twenty-two
              faithful hearts gathered under the name "Miracle Prayer Group for
              the Government of South Sudan," interceding for their war-torn
              homeland.
            </p>
            <p className="mt-4 leading-relaxed text-navy/70">
              What began in a rented room grew into a congregation that crossed
              borders. When South Sudan gained independence, the ministry
              relocated to Juba — setting roots in Gudele Block 4 — and turned
              its prayers into action: scholarships for orphans, food for
              families, healing crusades, and a television channel that carries
              the Gospel into the most remote corners of the nation.
            </p>
            <p className="mt-4 leading-relaxed text-navy/70">
              Today Stone International Church welcomes believers from every
              tribe, nation and background. The only qualification for
              membership is a heart that wants to encounter God.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Prophet ───────────────────────────────────────────────────── */
function Prophet() {
  const timeline = [
    { year: "2001", text: "Accepts Christ in Khartoum while working to fund his studies." },
    { year: "2004", text: "Admitted to the University of Juba College of Medicine." },
    { year: "2009", text: "Leaves medical school, founds Stone International Church on 29 May. Meets Prophet T.B. Joshua." },
    { year: "2012", text: "Undertakes a 133-day fast (21 Aug – 31 Dec). Receives a vision of becoming 'a mighty international prophet.'" },
    { year: "2015", text: "Deepens biblical and theological training, expanding the ministry's global reach." },
    { year: "Today", text: "Oversees Heart TV, a scholarship programme hosting over 2,000 children, and crusades across South Sudan." },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <AmbientBackground variant="navy" orbs />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
          {/* Text side */}
          <Reveal>
            <p className="eyebrow text-gold">The Vision Bearer</p>
            <h2 className="display mt-4 text-3xl text-white sm:text-4xl">
              Prophet Peter A.D.
            </h2>
            <p className="mt-6 leading-relaxed text-white/70">
              Prophet Peter Ayuel Deng was born into a family marked by loss —
              his parents had buried child after child before him, and his own
              birth was considered miraculous. At fourteen he watched the
              Second Sudanese Civil War displace everything he knew.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              Those early years of suffering did not break him; they shaped a
              compassion that would eventually reach millions. He relocated to
              Khartoum, worked to fund his education, and was admitted to study
              medicine — until God called him out of the lecture theatre and
              into the nations.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              Trained in the prophetic under the late Senior Prophet T.B.
              Joshua, he carries the same conviction that faith must be made
              visible in deeds — in a child fed, a student equipped, a sick
              body healed. He is married to Awur Kuol Nyok.
            </p>

            {/* Pull-quote */}
            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="text-lg leading-relaxed text-white/85 italic">
                "I got to know that my villagers know what I'm doing in Juba,
                so they told me — Servant of God, you are now helping the whole
                of South Sudan, but we don't see ourselves in the picture."
              </p>
              <cite className="mt-3 block text-sm font-semibold not-italic text-gold">
                Prophet Peter A.D.
              </cite>
            </blockquote>
          </Reveal>

          {/* Timeline side */}
          <Reveal>
            <p className="eyebrow mb-8 text-white/50">Timeline</p>
            <ol className="relative space-y-0 border-l border-white/15 pl-8">
              {timeline.map((item) => (
                <li key={item.year} className="relative pb-9 last:pb-0">
                  {/* Dot */}
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-gold bg-navy-deep" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
                    {item.year}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Vision ────────────────────────────────────────────────────── */
function Vision() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24">
      <AmbientBackground variant="light" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-blue">Our Vision</p>
          <h2 className="display mt-6 text-[clamp(1.5rem,3.5vw,2.4rem)] leading-snug text-navy">
            "Claim South Sudan for Jesus Christ by preaching the Word of God
            under the prophetic anointing that delivers, heals and blesses —
            for the salvation of souls through the finished work of our Lord
            Jesus Christ."
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-navy/65">
            This is not a local church vision. It is a national calling — and
            through Heart TV, a global one. Every broadcast, every scholarship,
            every meal is a word made tangible.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Three pillars ─────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
        <rect x="4" y="10" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 10V7a6 6 0 0 1 12 0v3" stroke="currentColor" strokeWidth="2" />
        <path d="M20 19v6M17 22h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "The Church",
    title: "Stone International Church",
    body:
      "A congregation open to every tribe, language and background — gathered around the Word of God, the Holy Spirit and the belief that one encounter with Jesus changes everything. Services are held weekly in Gudele Block 4, Juba.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
        <rect x="4" y="8" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 28l-2 4h12l-2-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M28 12l2-2M28 24l2 2M12 12l-2-2M12 24l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "The Broadcast",
    title: "Heart TV",
    body:
      "A television and digital ministry carrying sermons, healing services, prophetic messages and humanitarian stories to South Sudan and beyond. Heart TV is how the church reaches every corner it cannot physically enter.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
        <path d="M20 6C13.37 6 8 11.37 8 18c0 4.5 2.44 8.44 6.09 10.66L13 36h14l-.91-7.22A12 12 0 0 0 32 18c0-6.63-5.37-12-12-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M15 36h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "The Outreach",
    title: "Scholarships & Humanitarian Work",
    body:
      "Over 2,000 children — orphans and unaccompanied minors from across South Sudan — are housed, educated and cared for by the church. The ministry runs a school from nursery to secondary level and extends disaster relief, food and medical support to vulnerable communities.",
  },
];

function Pillars() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 max-w-xl">
            <p className="eyebrow text-blue">What We Do</p>
            <h2 className="display mt-4 text-3xl text-navy sm:text-4xl">
              Three expressions of one calling.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <Reveal key={p.label}>
              <div className="group rounded-2xl border border-navy/10 bg-cloud p-8 transition hover:border-azure hover:shadow-md">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy group-hover:bg-azure group-hover:text-white transition">
                  {p.icon}
                </span>
                <p className="eyebrow mb-1 text-muted">{p.label}</p>
                <h3 className="display text-xl text-navy">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-navy/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Impact numbers ────────────────────────────────────────────── */
const STATS = [
  { value: "2,000+", label: "Children in care", sub: "housed, fed and educated" },
  { value: "2009", label: "Year founded", sub: "Khartoum, Sudan" },
  { value: "22", label: "Founding members", sub: "a prayer group that became a movement" },
  { value: "133", label: "Days of fasting", sub: "the prophetic breakthrough of 2012" },
];

function Impact() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <AmbientBackground variant="navy" orbs={false} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="display mb-14 text-center text-3xl sm:text-4xl">
            The work in numbers.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="flex flex-col items-center bg-navy-deep px-6 py-10 text-center">
                <p className="display text-4xl font-bold text-gold sm:text-5xl">{s.value}</p>
                <p className="mt-3 text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-xs text-white/50">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Outreach gallery ──────────────────────────────────────────── */
const GALLERY = [
  { src: "/images/families-with-maize-flour.jpg", alt: "Families receiving maize flour" },
  { src: "/images/mothers-receiving-supplies.jpg", alt: "Mothers receiving supplies" },
  { src: "/images/volunteers-carrying-food-sacks.jpg", alt: "Volunteers carrying food" },
  { src: "/images/children-meal-let-love-lead.jpg", alt: "Children sharing a meal" },
  { src: "/images/father-and-child-support.jpg", alt: "Father and child receiving support" },
  { src: "/images/woman-carrying-food-home.jpg", alt: "Woman carrying food home" },
];

function Gallery() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24">
      <AmbientBackground variant="light" orbs={false} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-blue">Outreach</p>
              <h2 className="display mt-2 text-3xl text-navy">Love made visible.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-navy/60">
              From food distributions to school enrolments — every picture is a
              life touched by the ministry's generosity.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {GALLERY.map((img, i) => (
            <Reveal key={img.src}>
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 sm:col-span-1 row-span-2 h-[360px] sm:h-full" : "h-[170px]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width:640px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <AmbientBackground variant="navy" />
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mb-4 text-gold">Join the mission</p>
          <h2 className="display text-3xl sm:text-4xl">
            Every partner adds a life to the picture.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-white/65">
            Whether you give monthly or make a one-off gift, your support
            keeps children in school, families fed, and the broadcast of hope
            on air across South Sudan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/partnership#join"
              className="inline-flex items-center gap-2 rounded-full bg-azure px-8 py-4 text-base font-semibold text-ink shadow-[0_16px_36px_-16px_rgb(36_170_245/0.7)] transition hover:bg-white"
            >
              Become a Partner
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Prophet />
      <Vision />
      <Pillars />
      <Impact />
      <Gallery />
      <CTA />
    </>
  );
}
