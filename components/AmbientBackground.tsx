/**
 * Purely decorative background layer: a texture plus, on dark grounds, two or
 * three slow-drifting light orbs. Server component — everything here is CSS
 * (`@keyframes` in globals.css), so no client JS or hooks are needed, and
 * `prefers-reduced-motion` is already handled globally, freezing the drift.
 */
export default function AmbientBackground({
  variant = "navy",
  orbs = true,
}: {
  /** "navy" gets scanlines + drifting orbs; "light" gets a static dot texture. */
  variant?: "navy" | "light";
  /** Set false when the section already carries its own texture (e.g. `.grain`). */
  orbs?: boolean;
}) {
  if (variant === "light") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="dot-grid absolute inset-0" />
        {orbs && (
          <div
            className="orb orb-c absolute -right-[15%] top-1/3 h-[46vw] max-h-[420px] w-[46vw] max-w-[420px] bg-azure/[0.07]"
          />
        )}
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="scanlines absolute inset-0" />
      {orbs && (
        <>
          <div className="orb orb-a absolute -left-[12%] -top-[22%] h-[58vw] max-h-[540px] w-[58vw] max-w-[540px] bg-azure/[0.22]" />
          <div className="orb orb-b absolute -bottom-[26%] -right-[12%] h-[50vw] max-h-[460px] w-[50vw] max-w-[460px] bg-gold/[0.14]" />
        </>
      )}
    </div>
  );
}
