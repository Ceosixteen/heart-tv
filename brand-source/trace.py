import subprocess, re, os
from PIL import Image, ImageChops, ImageFilter, ImageDraw

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "heart-tv-logo-source.jpg")
OUT = os.path.dirname(os.path.abspath(__file__))

# Modal colour of each solid region, sampled from the official file.
INKS = [("navy", (8, 1, 133)), ("royal", (2, 8, 182)), ("azure", (46, 191, 244))]
CORE_TOL = 22    # navy and royal sit only 49 apart per channel, so keep cores tight
CHROMA   = 66    # ~half the chroma of the least saturated ink: the 50% blend contour
GROW     = 10    # dilation passes, enough to reach across the anti-aliased rim
UP       = 6     # trace at 6x
BLUR     = 1.0   # light touch-up only; the coverage ramp does the real smoothing
TERR     = 7     # territory padding; generous so it never clips the coverage edge
ALPHAMAX = os.environ.get("ALPHAMAX", "0.55")  # low => potrace keeps corners sharp

img = Image.open(SRC).convert("RGB")
bbox = img.point(lambda v: 255 - v).convert("L").point(lambda v: 255 if v > 12 else 0).getbbox()
raw = img.crop(bbox)
W, H = raw.size
print(f"trimmed to {W}x{H} at {bbox}")

def chroma_of(im):
    r, g, b = im.split()
    mx = ImageChops.lighter(ImageChops.lighter(r, g), b)
    mn = ImageChops.darker(ImageChops.darker(r, g), b)
    return ImageChops.subtract(mx, mn)

# Classification runs on a median-filtered copy: median is edge preserving, so it
# flattens JPEG ringing without moving the letterforms. That ringing is what
# leaked royal-blue stroke edges into the navy class.
med = raw.filter(ImageFilter.MedianFilter(5))
mr, mg, mb = med.split()
chroma_raw = chroma_of(raw)          # keeps the anti-aliased ramp -> sub-pixel edges
ink = chroma_of(med).point(lambda v: 255 if v >= CHROMA else 0)

def core(rgb):
    d = [ImageChops.difference(ch, Image.new("L", (W, H), v)) for ch, v in zip((mr, mg, mb), rgb)]
    cheb = ImageChops.lighter(ImageChops.lighter(d[0], d[1]), d[2])
    m = cheb.point(lambda v: 255 if v <= CORE_TOL else 0)
    return ImageChops.multiply(m, ink).filter(ImageFilter.ModeFilter(3))

masks = {n: core(c) for n, c in INKS}
for n, _ in INKS:
    print(f"  core {n}: {masks[n].histogram()[255]} px")

# The roundel is the only navy in the artwork, so pin navy to that disc. Erode
# hard first to shed the thin fringes JPEG ringing set along the royal strokes,
# leaving a bounding box that describes the disc alone.
ERODE, SS = 12, 8
er = masks["navy"]
for _ in range(ERODE):
    er = er.filter(ImageFilter.MinFilter(3))
bb = er.getbbox()
CX, CY = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
RAD = ((bb[2] - bb[0]) + (bb[3] - bb[1])) / 4 + ERODE
big = Image.new("L", (W * SS, H * SS), 0)
ImageDraw.Draw(big).ellipse([(CX - RAD) * SS, (CY - RAD) * SS,
                             (CX + RAD) * SS, (CY + RAD) * SS], fill=255)
DISC = big.resize((W, H), Image.LANCZOS)
inside = DISC.point(lambda v: 255 if v > 8 else 0)
before = masks["navy"].histogram()[255]
masks["navy"] = ImageChops.multiply(masks["navy"], inside)
print(f"  roundel r={RAD:.1f} at ({CX:.1f},{CY:.1f}); "
      f"navy outside disc dropped: {before - masks['navy'].histogram()[255]} px")

# Grow each core through the anti-aliased rim. Rim pixels go to whichever solid
# region is spatially nearest, never to whichever ink is nearest in RGB -- a 40%
# royal-to-white blend is closer to azure than it is to royal.
claimed = masks["navy"]
for n, _ in INKS[1:]:
    claimed = ImageChops.lighter(claimed, masks[n])

for _ in range(GROW):
    for n, _ in INKS:
        gain = ImageChops.multiply(masks[n].filter(ImageFilter.MaxFilter(3)),
                                   ImageChops.subtract(ink, claimed))
        if n == "navy":
            gain = ImageChops.multiply(gain, inside)
        masks[n] = ImageChops.lighter(masks[n], gain)
        claimed = ImageChops.lighter(claimed, gain)
print(f"ink px: {ink.histogram()[255]}, unassigned: {ImageChops.subtract(ink, claimed).histogram()[255]}")


covs = {}
for n, rgb in INKS:
    solid = max(rgb) - min(rgb)                      # chroma of this ink at full strength
    cov = chroma_raw.point(lambda v, s=solid: min(255, round(v * 255 / s)))
    # Territory dilated so the ink's own edge ramp is inside it; layers are separated
    # by wide white gaps, so this cannot bleed into a neighbouring letter.
    terr = masks[n]
    for _ in range(TERR):
        terr = terr.filter(ImageFilter.MaxFilter(3))
    covs[n] = ImageChops.multiply(cov, terr)

# The "tv" reversed out of the roundel, as a shape in its own right. The knockout
# lockup leaves these as holes, which means whatever sits behind the logo shows
# through them; tracing them lets a variant paint them opaque instead, so the
# roundel stays readable on a photograph.
rim = inside
for _ in range(3):
    rim = rim.filter(ImageFilter.MinFilter(3))
covs["tv"] = ImageChops.multiply(ImageChops.invert(covs["navy"]), rim)

paths = {}
for n in [k for k, _ in INKS] + ["tv"]:
    alpha = covs[n]
    # Resample the continuous coverage, THEN threshold: the anti-aliased ramp
    # carries sub-pixel edge positions, so the 6x mask lands on smooth curves
    # instead of a magnified 1-bit staircase.
    m = alpha.resize((W * UP, H * UP), Image.LANCZOS)
    m = m.filter(ImageFilter.GaussianBlur(BLUR)).point(lambda v: 255 if v >= 128 else 0)
    pad = Image.new("L", (W * UP + 12, H * UP + 12), 0)
    pad.paste(m, (6, 6))
    pbm, svg = f"{OUT}/{n}.pbm", f"{OUT}/{n}.svg"
    pad.point(lambda v: 0 if v else 255).convert("1").save(pbm)   # potrace traces black
    subprocess.run(["potrace", "-b", "svg", "-a", ALPHAMAX, "-O", "0.2",
                    "-t", "120", "-u", "10", "-o", svg, pbm], check=True)
    s = open(svg).read()
    paths[n] = (re.findall(r'\sd="([^"]+)"', s), re.search(r'transform="([^"]+)"', s).group(1))
    print(f"  {n}: {len(paths[n][0])} path(s)")

# Re-measure the disc from the finished coverage rather than the eroded core:
# the erosion estimate is a couple of pixels shy of the true edge.
_b = covs["navy"].point(lambda v: 255 if v > 128 else 0).getbbox()
CX, CY = (_b[0] + _b[2]) / 2, (_b[1] + _b[3]) / 2
RAD = ((_b[2] - _b[0]) + (_b[3] - _b[1])) / 4
print(f"  disc measured from coverage: r={RAD:.1f} at ({CX:.1f},{CY:.1f})")

# The roundel is a true circle, so draw it as one rather than reusing the traced
# outline: a <circle> gives a cleaner edge than any curve fit to it.
DISC_SVG = f'<circle cx="{CX * UP + 6:.1f}" cy="{CY * UP + 6:.1f}" r="{RAD * UP:.1f}"'

# potrace's viewBox is the bitmap size; its group transform already scales the
# 10x path coordinates back down into that space.
VW, VH = W * UP + 12, H * UP + 12
COLOR = dict(navy="#080185", royal="#0208B6", azure="#2EBFF4")

def build(fill, title):
    body = []
    for n, _ in INKS:
        ds, t = paths[n]
        body.append(f'<g transform="{t}" fill="{fill[n]}" fill-rule="evenodd">')
        body += [f'<path d="{d}"/>' for d in ds]
        body.append("</g>")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" '
            f'role="img" aria-label="{title}">\n<title>{title}</title>\n'
            + "\n".join(body) + "\n</svg>\n")

def build_solid(word, disc, letters, title):
    """Opaque lockup: nothing behind it shows through the roundel."""
    body = [f'{DISC_SVG} fill="{disc}"/>']
    for n in ("royal", "azure"):
        ds, t = paths[n]
        body.append(f'<g transform="{t}" fill="{word}" fill-rule="evenodd">')
        body += [f'<path d="{d}"/>' for d in ds]
        body.append("</g>")
    ds, t = paths["tv"]
    body.append(f'<g transform="{t}" fill="{letters}" fill-rule="evenodd">')
    body += [f'<path d="{d}"/>' for d in ds]
    body.append("</g>")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" '
            f'role="img" aria-label="{title}">\n<title>{title}</title>\n'
            + "\n".join(body) + "\n</svg>\n")

open(f"{OUT}/heart-tv-logo.svg", "w").write(build(COLOR, "Heart.tv"))
# Solid white: wordmark and roundel in white, "tv" opaque navy underneath.
open(f"{OUT}/heart-tv-logo-solid-white.svg", "w").write(
    build_solid("#FFFFFF", "#FFFFFF", "#080185", "Heart.tv"))
open(f"{OUT}/heart-tv-logo-white.svg", "w").write(
    build(dict(navy="#FFFFFF", royal="#FFFFFF", azure="#FFFFFF"), "Heart.tv"))
open(f"{OUT}/heart-tv-logo-onblue.svg", "w").write(
    build(dict(navy="#FFFFFF", royal="#FFFFFF", azure="#2EBFF4"), "Heart.tv"))
print(f"viewBox 0 0 {VW} {VH}")
