import type { Metadata } from "next";
import Image from "next/image";
import AmbientBackground from "@/components/AmbientBackground";
import GiveGallery from "@/components/GiveGallery";
import HeroVideo from "@/components/HeroVideo";
import PartnershipForm from "@/components/PartnershipForm";
import Reveal from "@/components/Reveal";
import { getPartnershipContent } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Partner with Heart TV. Your giving funds scholarships, meets basic needs and carries a message of hope to souls, nations and the world.",
};

const WHY = [
  {
    title: "Because a soul is worth the reach",
    body:
      "Every naira and every dollar buys airtime, translation and signal — so someone with no church, no hope and no one to call hears that they are not forgotten.",
  },
  {
    title: "Because a child should not lose a year",
    body:
      "Scholarships keep bright children in the classroom when a parent falls ill, a job disappears or the fees arrive before the harvest does.",
  },
  {
    title: "Because need does not wait for Sunday",
    body:
      "Food, water, medicine and rent do not keep office hours. Partners let us answer in days, not quarters.",
  },
  {
    title: "Because giving reshapes the giver",
    body:
      "Partnership is not a transaction. What leaves your hand changes the person it reaches — and it changes you first.",
  },
];

const ALLOCATION = [
  { pct: 40, label: "Scholarships & education", detail: "Tuition, books, uniforms, exam fees" },
  { pct: 30, label: "Basic needs & relief", detail: "Food, water, medical, emergency housing" },
  { pct: 20, label: "Broadcast & outreach", detail: "Production, uplink, translation, crusades" },
  { pct: 10, label: "Stewardship & operations", detail: "Audit, safeguarding, partner care" },
];

const BENEFITS = [
  {
    title: "Your personal partner number",
    body: "A single identity that follows every gift you make and every request you send us.",
    icon: "id",
  },
  {
    title: "A dedicated prayer line",
    body: `A partner-only counselling and prayer number, answered ${SITE.partnerLineHours}.`,
    icon: "phone",
  },
  {
    title: "The monthly impact report",
    body: "Names, places and numbers — what your giving actually did, sent to your inbox.",
    icon: "chart",
  },
  {
    title: "First notice of crusades & events",
    body: "Partners are told first, and seated first, at every Peter AD Ministries gathering.",
    icon: "calendar",
  },
  {
    title: "Partner-only broadcasts",
    body: "Teaching, testimonies and behind-the-scenes films released to partners ahead of air.",
    icon: "play",
  },
  {
    title: "Nominate someone for help",
    body: "Partners can put forward a scholarship or relief case for our welfare team to review.",
    icon: "hand",
  },
];

const STEPS = [
  { n: "01", title: "Sign up", body: "Fill the partnership form below. It takes about two minutes." },
  { n: "02", title: "Give", body: "We send you the giving channels available in your country." },
  { n: "03", title: "Notify us", body: "Tell us it's done, and your partner number is issued." },
];

export default async function PartnershipPage() {
  const content = await getPartnershipContent();

  return (
    <>
      <HeroVideo hero={content.hero} />

      {/* ---------------------------------------------------------------- WHY */}
      <section id="why" className="relative overflow-hidden bg-cloud py-24 sm:py-32">
        <AmbientBackground variant="light" orbs={false} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-blue">Why become a partner?</p>
              <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-navy">
                A partner is not a donor. A partner is a shoulder.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/70">
                Heart TV partners have decided to commit themselves to the cause of{" "}
                {SITE.parent} — telling the story of hope to a troubled world, and
                backing that story with bread, books and boldness. You are not funding a
                television station. You are standing behind a mission to change souls,
                nations and the world.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <figure className="relative mt-14 overflow-hidden rounded-[1.75rem]">
              <div className="relative aspect-[21/10] w-full">
                <Image
                  src="/images/children-meal-let-love-lead.jpg"
                  alt="Children seated together on the ground, sharing a meal at a Heart TV outreach"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <p className="max-w-2xl font-display text-xl text-white sm:text-2xl">
                  A meal on the ground, shared by hundreds of children — the ordinary
                  arithmetic of partnership.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full rounded-[1.5rem] border border-navy/10 bg-white p-8 transition hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_28px_60px_-40px_rgb(18_16_94/0.55)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue/10 font-display text-lg font-bold text-blue">
                    {i + 1}
                  </span>
                  <h3 className="display mt-5 text-2xl text-navy">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy/70">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- QUOTE */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-20 sm:py-28">
        <Image
          src="/images/ministry-among-children.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy-deep/88" />
        <AmbientBackground variant="navy" />
        <Reveal>
          <figure className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <svg viewBox="0 0 24 24" className="mx-auto h-9 w-9 text-gold" fill="currentColor" aria-hidden>
              <path d="M9.5 5C6.5 6.6 5 9.2 5 12.8V19h6.6v-6.4H8.3c0-2.3.9-3.9 2.7-4.9L9.5 5Zm9 0c-3 1.6-4.5 4.2-4.5 7.8V19H20v-6.4h-3.3c0-2.3.9-3.9 2.7-4.9L18.5 5Z" />
            </svg>
            <blockquote className="display mt-7 text-[clamp(1.75rem,4vw,3rem)] text-white">
              &ldquo;You cannot give what you do not have.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              T.B. Joshua
            </figcaption>
            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-white/60">
              Partnership begins with what you have already received. Hope, once it has
              reached you, is not meant to stop with you.
            </p>
          </figure>
        </Reveal>
      </section>

      {/* ------------------------------------------------- WHERE THE MONEY GOES */}
      <section id="where" className="relative overflow-hidden bg-mist/60 py-24 sm:py-32">
        <AmbientBackground variant="light" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-blue">Where does your money go?</p>
              <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-navy">
                Straight into hands that are open.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/70">
                Nothing disappears into an envelope. Every partnership gift is committed
                to one of four places, reported monthly and audited yearly.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.55fr_1fr]">
            <Reveal>
              <GiveGallery slides={content.gallery} />
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[1.75rem] border border-navy/10 bg-white p-7 sm:p-9">
                <h3 className="display text-2xl text-navy">How every gift is split</h3>
                <ul className="mt-7 space-y-6">
                  {ALLOCATION.map((row) => (
                    <li key={row.label}>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-semibold text-navy">{row.label}</span>
                        <span className="font-display text-xl font-bold text-blue">
                          {row.pct}%
                        </span>
                      </div>
                      <div
                        className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-navy/10"
                        role="img"
                        aria-label={`${row.pct} percent to ${row.label}`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-navy via-blue to-azure"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <p className="mt-2 text-sm text-muted">{row.detail}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-navy/10 pt-6 text-sm leading-relaxed text-navy/65">
                  Annual accounts are independently reviewed and available to any partner
                  on request. Ask us — we will send them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- BENEFITS */}
      <section id="benefits" className="relative overflow-hidden bg-cloud py-24 sm:py-32">
        <AmbientBackground variant="light" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-blue">Benefits of partnership</p>
              <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-navy">
                As a Heart TV partner, you will receive:
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/70">
                You give to the mission. The mission gives back to you — in access, in
                covering, and in the joy of watching it work.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <article className="group h-full rounded-[1.5rem] border border-navy/10 bg-white p-7 transition hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_28px_60px_-40px_rgb(18_16_94/0.55)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-gold transition group-hover:bg-blue group-hover:text-white">
                    <BenefitIcon name={b.icon} />
                  </span>
                  <h3 className="display mt-5 text-xl text-navy">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy/70">{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <figure className="mt-16 rounded-[1.5rem] border border-gold/40 bg-gold/10 p-8 text-center sm:p-12">
              <blockquote className="display text-[clamp(1.4rem,3vw,2.2rem)] text-navy">
                &ldquo;The way up is down.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                T.B. Joshua
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- JOIN */}
      <section id="join" className="relative overflow-hidden bg-navy py-24 grain sm:py-32">
        {/* Grain is already on the section; orbs add drift without a second
            scanline layer stacking on top of it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="orb orb-b absolute -left-[10%] top-[10%] h-[46vw] max-h-[440px] w-[46vw] max-w-[440px] bg-azure/[0.16]" />
          <div className="orb orb-c absolute -bottom-[20%] right-[10%] h-[40vw] max-h-[380px] w-[40vw] max-w-[380px] bg-gold/[0.12]" />
        </div>
        {/* Oversized wordmark bled off the corner, faint enough to read as texture. */}
        <Image
          src="/brand/heart-tv-logo-solid-white.svg"
          alt=""
          aria-hidden
          width={5226}
          height={1278}
          unoptimized
          className="pointer-events-none absolute -bottom-10 -right-28 w-[760px] max-w-none opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-gold">Fill the partnership form</p>
                <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-white">
                  Three steps, and you are in.
                </h2>
                <p className="mt-6 leading-relaxed text-white/70">
                  No payment is taken here. Tell us who you are, and our partner care team
                  will send your giving options and your personal partner number.
                </p>

                <ol className="mt-10 space-y-6">
                  {STEPS.map((s) => (
                    <li key={s.n} className="flex gap-5">
                      <span className="font-display text-2xl font-bold text-gold">{s.n}</span>
                      <span>
                        <span className="block font-semibold text-white">{s.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/60">
                          {s.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <figure className="relative mt-12 overflow-hidden rounded-[1.5rem]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/woman-carrying-food-home.jpg"
                      alt="A woman lifting a sack of maize flour onto her head to carry it home"
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <blockquote className="font-display text-xl text-white">
                      &ldquo;Distance is not a barrier.&rdquo;
                    </blockquote>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      T.B. Joshua
                    </p>
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <PartnershipForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-cloud py-24 sm:py-32">
        <AmbientBackground variant="light" orbs={false} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-blue">Talk to the team</p>
              <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)] text-navy">
                Rather speak to a human first?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy/70">
                Our partner care team answers questions about giving, scholarships,
                nominations and prayer. No form required — reach us directly.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <Reveal>
              <ContactCard
                label="Call partner care"
                icon="phone"
                lines={[SITE.phonePrimary, SITE.phoneSecondary]}
                note={SITE.partnerLineHours}
                href={`tel:${SITE.phonePrimary.replace(/[^\d+]/g, "")}`}
                cta="Call now"
              />
            </Reveal>
            <Reveal delay={80}>
              <ContactCard
                label="WhatsApp us"
                icon="chat"
                lines={["Fastest for quick questions", "Voice notes welcome"]}
                note="Typical reply within a few hours"
                href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                cta="Open WhatsApp"
              />
            </Reveal>
            <Reveal delay={160}>
              <ContactCard
                label="Email the office"
                icon="mail"
                lines={[SITE.email]}
                note={SITE.address}
                href={`mailto:${SITE.email}`}
                cta="Send an email"
              />
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-navy p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h3 className="display text-2xl text-white">Not ready to commit today?</h3>
                <p className="mt-2 max-w-xl text-white/65">
                  Join the mailing list and watch the work for a while. Partnership is a
                  decision worth making with your eyes open.
                </p>
              </div>
              <a
                href={`mailto:${SITE.email}?subject=Add%20me%20to%20the%20Heart%20TV%20mailing%20list`}
                className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Keep me updated
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  label,
  lines,
  note,
  href,
  cta,
  icon,
}: {
  label: string;
  lines: string[];
  note: string;
  href: string;
  cta: string;
  icon: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-navy/10 bg-white p-8">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue/10 text-blue">
        <BenefitIcon name={icon} />
      </span>
      <h3 className="display mt-5 text-xl text-navy">{label}</h3>
      <div className="mt-3 space-y-1 text-navy/75">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">{note}</p>
      <a
        href={href}
        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue transition hover:gap-3"
      >
        {cta}
        <span aria-hidden>&rarr;</span>
      </a>
    </article>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "phone":
      return <svg {...common}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4Z" /></svg>;
    case "chart":
      return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M4 20h16" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
    case "play":
      return <svg {...common}><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M10 8.5l4.5 2.5-4.5 2.5z" /><path d="M8 21h8" /></svg>;
    case "hand":
      return <svg {...common}><path d="M12 20a6 6 0 0 0 6-6V9a1.4 1.4 0 0 0-2.8 0V7a1.4 1.4 0 0 0-2.8 0V6a1.4 1.4 0 0 0-2.8 0v6l-1.6-1.8a1.5 1.5 0 0 0-2.3 2L9 18Z" /></svg>;
    case "chat":
      return <svg {...common}><path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    default:
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10h4M7 14h7" /></svg>;
  }
}
