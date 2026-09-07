import type { Metadata } from "next";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Heart TV and Peter AD Ministries — partnership enquiries, prayer requests, media and general questions.",
};

/* ─── Icons ────────────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12 19.79 19.79 0 0 1 1.17 3.18 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" strokeLinecap="round" />
  </svg>
);

/* ─── Social icons ─────────────────────────────────────────── */
function YTIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2.1c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2.1C23.3 9.1 23 7 23 7zM9.7 15.5V8l6.5 3.7-6.5 3.8z" />
    </svg>
  );
}
function FBIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
function IGIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "YouTube", icon: <YTIcon />, href: "https://www.youtube.com/@peteradministries" },
  { label: "Facebook", icon: <FBIcon />, href: "https://www.facebook.com/peteradministries" },
  { label: "Instagram", icon: <IGIcon />, href: "https://www.instagram.com/peteradministries" },
];

/* ─── Contact cards ────────────────────────────────────────── */
const CARDS = [
  {
    icon: <PhoneIcon />,
    label: "Phone",
    lines: [SITE.phonePrimary, SITE.phoneSecondary].filter(Boolean),
    href: `tel:${SITE.phonePrimary.replace(/\s/g, "")}`,
    cta: "Call us",
  },
  {
    icon: <WhatsAppIcon />,
    label: "WhatsApp",
    lines: [SITE.phonePrimary],
    href: `https://wa.me/${SITE.whatsapp}`,
    cta: "Message on WhatsApp",
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    lines: [SITE.email, SITE.emailGeneral],
    href: `mailto:${SITE.email}`,
    cta: "Send an email",
  },
  {
    icon: <MapPinIcon />,
    label: "Address",
    lines: [SITE.address],
    href: "https://maps.google.com/?q=Gudele+Block+4+Juba+South+Sudan",
    cta: "Open in Maps",
  },
  {
    icon: <ClockIcon />,
    label: "Partner line hours",
    lines: [SITE.partnerLineHours],
    href: null,
    cta: null,
  },
];

/* ─── Page ─────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep pb-24 pt-40 text-white">
        <AmbientBackground variant="navy" orbs />
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Get in touch
          </p>
          <h1 className="display text-[clamp(2.4rem,5vw,3.8rem)] leading-tight text-white">
            We'd love to hear from you.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Whether you have a prayer request, a partnership enquiry, a media
            question, or simply want to say hello — our team is here.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="relative overflow-hidden bg-cloud py-16">
        <AmbientBackground variant="light" orbs={false} />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <div
                key={c.label}
                className="group flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition hover:border-azure hover:shadow-md"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy group-hover:bg-azure group-hover:text-white transition">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {c.label}
                  </p>
                  {c.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm font-medium text-navy break-words">
                      {line}
                    </p>
                  ))}
                  {c.href && c.cta && (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-2 inline-block text-xs font-semibold text-azure transition hover:text-blue"
                    >
                      {c.cta} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <div>
              <p className="eyebrow text-blue">Send a message</p>
              <h2 className="display mt-3 text-3xl text-navy">
                Write to us directly.
              </h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                Prayer requests, partnership questions, media interviews,
                volunteer opportunities — use this form and we'll reply within
                2 working days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Map + directions */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="eyebrow text-blue">Find us</p>
                <h2 className="display mt-3 text-3xl text-navy">
                  Stone International Church
                </h2>
                <p className="mt-3 text-navy/65">{SITE.address}</p>
                <a
                  href="https://maps.google.com/?q=Gudele+Block+4+Juba+South+Sudan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-azure transition hover:text-blue"
                >
                  Get directions →
                </a>
              </div>

              {/* Map embed */}
              <div className="h-72 overflow-hidden rounded-2xl border border-navy/10 shadow-sm lg:flex-1 lg:h-auto lg:min-h-[320px]">
                <iframe
                  title="Stone International Church location"
                  src="https://maps.google.com/maps?q=Gudele+Block+4+Juba+South+Sudan&output=embed&z=14"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Service notice */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 px-6 py-5">
                <p className="text-sm font-semibold text-navy">Partner care line</p>
                <p className="mt-1 text-sm text-navy/70">
                  {SITE.partnerLineHours}
                </p>
                <p className="mt-3 text-sm text-navy/65">
                  For urgent prayer needs, reach us on WhatsApp anytime at{" "}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    className="font-semibold text-navy underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {SITE.phonePrimary}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social strip */}
      <section className="relative overflow-hidden bg-navy-deep py-16 text-white">
        <AmbientBackground variant="navy" orbs={false} />
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="eyebrow mb-4 text-gold">Follow us</p>
          <h2 className="display text-2xl text-white">
            Stay connected with Heart TV.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Daily devotionals, live broadcasts, testimonies and ministry
            updates — all on our social channels.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="text-sm text-white/50">
              Not a partner yet?{" "}
              <Link
                href="/partnership#join"
                className="font-semibold text-gold transition hover:text-white"
              >
                Become one today →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
