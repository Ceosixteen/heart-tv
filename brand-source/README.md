# Logo source

`heart-tv-logo-source.jpg` is the official logo exactly as supplied: a 1080x1080
JPEG, flat colour on white paper.

Everything in `public/brand/` is derived from it by these two scripts, so the
artwork can be regenerated rather than hand-patched.

```bash
pip install pillow && brew install potrace librsvg
python3 trace.py    # separates the inks and traces the vector lockups
python3 build.py    # writes the PNGs, roundel, app icons and social card
```

`trace.py` classifies every pixel into paper, navy, royal or azure, then grows each
solid core outward through the anti-aliased rim. It assigns rim pixels by which solid
region is spatially nearest rather than by which ink is nearest in RGB, because a 40%
royal-to-white blend is closer to azure than it is to royal. The traced masks come
from the continuous coverage ramp, not a 1-bit threshold, so the curves keep
sub-pixel accuracy instead of magnifying a staircase.

If the designer's original vector file turns up, prefer it over this reconstruction.
