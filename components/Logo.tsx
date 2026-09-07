import Image from "next/image";

// Intrinsic size of the traced artwork in public/brand.
const LOGO = { w: 5226, h: 1278 };
const MARK = { w: 216, h: 216 };

type LogoProps = {
  /** Rendered height in px; width follows the artwork's own ratio. */
  height?: number;
  /**
   * "white" is the solid reversed lockup: the roundel is painted, not knocked
   * out, so nothing behind the logo shows through its "tv" and it stays legible
   * on photography. "color" is the full-colour mark for light grounds.
   */
  variant?: "white" | "color";
  /** Pass "" when an ancestor link or heading already names the brand. */
  alt?: string;
  priority?: boolean;
  className?: string;
};

/**
 * The official Heart.tv lockup. These are vectors, so they are served as-is
 * rather than through the image optimiser -- resizing them gains nothing and
 * a raster round-trip would only cost sharpness.
 */
export default function Logo({
  height = 34,
  variant = "white",
  alt = "Heart.tv",
  priority = false,
  className,
}: LogoProps) {
  return (
    <Image
      src={
        variant === "white"
          ? "/brand/heart-tv-logo-solid-white.svg"
          : "/brand/heart-tv-logo.svg"
      }
      alt={alt}
      width={Math.round((height * LOGO.w) / LOGO.h)}
      height={height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}

/** The roundel on its own, for square slots: seals, avatars, channel bugs. */
export function LogoMark({
  size = 40,
  variant = "color",
  alt = "Heart.tv",
  className,
}: {
  size?: number;
  /** "color" is navy-on-white for light grounds, "white" the reverse. */
  variant?: "color" | "white";
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={
        variant === "white"
          ? "/brand/heart-tv-mark-white.png"
          : "/brand/heart-tv-mark.png"
      }
      alt={alt}
      width={MARK.w}
      height={MARK.h}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
