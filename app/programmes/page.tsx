import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import ProgrammeSchedule from "@/components/ProgrammeSchedule";
import Reveal from "@/components/Reveal";
import { getLiveStatus } from "@/lib/live";
import { SITE } from "@/lib/site";
import media from "@/content/media.json";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Explore Heart TV services, teachings, testimonies, worship and stories of love in action from Peter AD Ministries.",
};

export const dynamic = "force-dynamic";

const PROGRAMMES = [
  {
    title: "Sunday Live Service",
    category: "Live worship",
    description: "Join Stone International Church for worship, prayer and the ministry of the Word from Juba.",
    image: "/images/prophet-peter-ad-preaching.jpg",
    href: "/live",
    label: "Watch live",
  },
  {
    title: "Prophetic Service",
    category: "Ministry",
    description: "Messages of faith, prayer and prophetic ministry with Prophet Peter A.D.",
    image: "/images/prophet-peter-ad-teaching.jpg",
    href: "/live#videos",
    label: "Watch messages",
  },
  {
    title: "Prayer & Deliverance",
    category: "Prayer",
    description: "Moments of prayer and deliverance centred on the finished work of Jesus Christ.",
    image: "/images/prophet-peter-ad-welcome.jpg",
    href: "https://www.youtube.com/@peteradministries/videos",
    label: "Explore videos",
  },
  {
    title: "Let Love Lead",
    category: "Humanitarian stories",
    description: "Witness faith expressed through food support, scholarships and practical care for families.",
    image: "/images/children-meal-let-love-lead.jpg",
    href: "/partnership#where",
    label: "See the impact",
  },
  {
    title: "Faith Teachings",
    category: "The Word",
    description: "Biblical encouragement to help believers carry the Word into everyday life.",
    image: "/images/prophet-peter-ad-outreach.jpg",
    href: "/live#sermons",
    label: "Read teaching notes",
  },
  {
    title: "Testimonies of Hope",
    category: "Testimonies",
    description: "Stories of changed lives, renewed hope and communities strengthened by compassion.",
    image: "/images/families-seated-with-parcels.jpg",
    href: "/live#pictures",
    label: "Discover stories",
  },
];

const youtube = SITE.socials.find((social) => social.label === "YouTube")?.href ?? "#";

export default async function ProgrammesPage() {
  const live = await getLiveStatus();

  return (
    <>
      <section className="relative isolate min-h-[72vh] overflow-hidden bg-navy-deep text-white">
        <Image
          src="/images/prophet-peter-ad-preaching.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="programme-hero-zoom -z-20 object-cover object-[center_24%] opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/25" />
        <AmbientBackground variant="navy" orbs />
        <div className="mx-auto flex min-h-[72vh] max-w-7xl items-end px-5 pb-20 pt-40 sm:px-8 sm:pb-24">
          <div className="max-w-3xl">
            <p className="programme-rise eyebrow text-gold">Heart TV Programmes</p>
            <h1 className="programme-rise programme-rise-2 display mt-6 text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.98]">
              The Word for today.<br />Hope for every home.
            </h1>
            <p className="programme-rise programme-rise-3 mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Discover worship, teaching, prayer, testimonies and stories of love in action from Peter AD Ministries.
            </p>
            <div className="programme-rise programme-rise-4 mt-10 flex flex-wrap gap-4">
              <Link href="/live" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:bg-white">
                Watch Heart TV Live
              </Link>
              <a href="#schedule" className="rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/10">
                View the schedule
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-blue py-3 text-white" aria-label="Heart TV programme themes">
        <div className="programme-ticker flex w-max items-center whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {["Live Worship", "Prophetic Ministry", "Faith Teachings", "Prayer", "Testimonies", "Let Love Lead"].map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-6 px-6 text-xs font-bold uppercase tracking-[0.2em]">
                  {item}<span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden bg-cloud py-20">
        <AmbientBackground variant="light" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl bg-navy-deep text-white shadow-xl lg:grid-cols-[0.72fr_1.28fr]">
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${live.isLive ? "bg-red-500 shadow-[0_0_0_6px_rgb(239_68_68/0.15)]" : "bg-white/35"}`} />
                  <p className="eyebrow text-white/55">{live.isLive ? "On air now" : "Heart TV broadcast"}</p>
                </div>
                <h2 className="display mt-6 text-3xl sm:text-4xl">
                  {live.isLive ? live.title ?? "Heart TV Live" : "The next live broadcast will appear here."}
                </h2>
                <p className="mt-5 leading-relaxed text-white/65">
                  {live.isLive ? "The broadcast is live. Join the service and worship with viewers around the world." : "We are currently off air. Follow Peter AD Ministries for the next service announcement."}
                </p>
                <Link href="/live" className="mt-8 inline-flex rounded-full bg-azure px-6 py-3 font-semibold text-ink transition hover:bg-white">
                  {live.isLive ? "Watch now" : "Open Heart TV Live"} &rarr;
                </Link>
              </div>
              <div className="programme-float relative min-h-72 lg:min-h-full">
                <Image src="/images/prophet-peter-ad-welcome.jpg" alt="Prophet Peter A.D. welcoming viewers" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/55 to-transparent lg:from-navy-deep/30" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-blue">Featured programmes</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
              <h2 className="display max-w-2xl text-3xl text-navy sm:text-5xl">Something for every season of faith.</h2>
              <p className="max-w-md leading-relaxed text-muted">Programme titles will be refined as Heart TV publishes its official broadcast catalogue.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PROGRAMMES.map((programme) => (
              <Reveal key={programme.title}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-navy/10 bg-cloud transition duration-500 hover:-translate-y-2 hover:border-azure/40 hover:shadow-xl">
                  <span className="pointer-events-none absolute -left-2/3 top-0 z-20 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[420%]" aria-hidden />
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <Image src={programme.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue">{programme.category}</span>
                  </div>
                  <div className="p-7">
                    <h3 className="display text-2xl text-navy">{programme.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{programme.description}</p>
                    {programme.href.startsWith("http") ? (
                      <a href={programme.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-semibold text-blue hover:underline">{programme.label} &rarr;</a>
                    ) : (
                      <Link href={programme.href} className="mt-6 inline-block font-semibold text-blue hover:underline">{programme.label} &rarr;</Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="relative overflow-hidden bg-mist/60 py-24">
        <AmbientBackground variant="light" orbs={false} />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow text-blue">Weekly guide</p>
              <h2 className="display mt-4 text-3xl text-navy sm:text-5xl">Plan your week with Heart TV.</h2>
              <p className="mt-5 leading-relaxed text-muted">All times will be shown in East Africa Time once the official broadcast timetable is confirmed.</p>
            </div>
          </Reveal>
          <ProgrammeSchedule />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-blue">Watch on demand</p>
              <h2 className="display mt-4 text-3xl text-navy sm:text-5xl">Recent messages.</h2>
            </div>
            <a href={`${youtube}/videos`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-navy/15 px-6 py-3 font-semibold text-navy hover:bg-mist">All videos on YouTube &rarr;</a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {media.videos.map((video) => (
              <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-3xl border border-navy/10 bg-cloud">
                <div className="relative aspect-video overflow-hidden bg-navy-deep">
                  <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  <span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-white text-blue shadow-xl" aria-hidden>▶</span></span>
                </div>
                <div className="p-7">
                  <p className="eyebrow text-blue">{video.category}</p>
                  <h3 className="display mt-3 text-2xl text-navy">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cloud py-24">
        <AmbientBackground variant="light" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-[0_30px_80px_-40px_rgb(18_16_94/0.35)] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[420px] overflow-hidden bg-navy-deep lg:min-h-full">
                <Image
                  src="/images/prophet-peter-ad-preaching.jpg"
                  alt="Prophet Peter A.D. ministering at Stone International Church"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-top transition duration-1000 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
                  <p className="eyebrow text-gold">You are welcome here</p>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-white/80">
                    Come expecting worship, the Word of God and a family ready to receive you.
                  </p>
                </div>
              </div>

              <div className="p-8 sm:p-12 lg:p-14">
                <p className="eyebrow text-blue">Plan your visit</p>
                <h2 className="display mt-5 text-3xl text-navy sm:text-5xl">Visit Stone International Church.</h2>
                <p className="mt-5 leading-relaxed text-muted">
                  Whether you are travelling from within South Sudan or joining us from abroad, our team can help you prepare for your visit to the ministry headquarters.
                </p>

                <div className="mt-9 space-y-5 border-y border-navy/10 py-8">
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue">Location</p>
                    <p className="font-semibold leading-relaxed text-navy">Stone International Church, Gudele 2, Block 4, Juba, South Sudan</p>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue">Call</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-semibold text-navy">
                      <a href="tel:+211923764777" className="hover:text-blue">+211 923 764 777</a>
                      <a href="tel:+211916222122" className="hover:text-blue">+211 916 222 122</a>
                    </div>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue">Email</p>
                    <a href="mailto:info@peteradministries.org" className="font-semibold text-navy hover:text-blue">info@peteradministries.org</a>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfOCQwFSfCJ49mUqm0As8eOUEvzqp47hkRpHwz7Lxcg7XPzwQ/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-blue px-6 py-3.5 font-semibold text-white transition hover:bg-navy"
                  >
                    Complete visit form &rarr;
                  </a>
                  <a
                    href="https://wa.me/211916222122?text=Hello%21%20I%20would%20love%20to%20plan%20a%20visit%20to%20Stone%20International%20Church."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-navy/15 px-6 py-3.5 font-semibold text-navy transition hover:border-azure hover:bg-mist"
                  >
                    Ask on WhatsApp
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Stone+International+Church+Gudele+2+Block+4+Juba+South+Sudan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-4 py-3.5 font-semibold text-blue hover:underline"
                  >
                    Get directions ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-20 text-white">
        <AmbientBackground variant="navy" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="eyebrow text-gold">Never miss a programme</p>
          <h2 className="display mt-5 text-3xl sm:text-5xl">Stay close to the broadcast.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">Subscribe on YouTube and follow Facebook for live alerts, new teachings and programme announcements.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href={`${youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gold px-7 py-3.5 font-semibold text-ink hover:bg-white">Subscribe on YouTube</a>
            <a href="https://www.facebook.com/peteradministries" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-7 py-3.5 font-semibold hover:bg-white/10">Follow on Facebook</a>
          </div>
        </div>
      </section>
    </>
  );
}
