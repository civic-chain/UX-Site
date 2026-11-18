# Command: изолированная иллюстрация

Use for a reusable isolated CivicChain illustration: scene, object group,
small-card art, stamp-like insert, or transparent cutout. The model owns the
visual clarity. Code owns only packaging.

## Inputs

- Final destination or draft destination. If absent, use
  `_workspace/design-assets/_drafts-gen-ai/` for drafts.
- Subject block or user brief.
- Target folder owner. For `scenes-colored`, read
  `_workspace/design-assets/scenes-colored/AGENTS.md` and start from
  `_workspace/design-assets/scenes-colored/GENERATION-PROMPT.md`.

## Workflow

1. Generate the first source image on a pure white background using the approved
   CivicChain prompt for the target family. The subject must be centered,
   isolated, and not touching canvas edges. For card illustrations, generate
   real whitespace inside the image; do not repair a clipped source by padding.
2. Inspect the white source. Reject and regenerate if the subject is clipped,
   touches an edge, has the wrong scene, leaks a reference-only subject, or
   contains unsafe/gibberish text.
3. Crop only the extra white background and leave exactly `10px` white padding
   around the detected drawing. This crop is packaging, not quality repair.
4. Use the cropped white PNG as the only edit target. Ask the image model to
   regenerate the same illustration with:
   - sharper and clearer model-rendered linework;
   - higher-resolution visual detail from generation, not code filters;
   - the same subject, composition, and safe margins;
   - a flat solid `#00ff00` chroma-key background.
5. Recover the fresh model PNG from the current session. If native imagegen is
   chat-visible but has no handle, use the current child/session id under
   `~/.codex/generated_images/<session-id>/`; never copy a stale newest file.
6. If the model produced near-green, normalize only edge-connected key-like
   background to exact `(0,255,0)`. Do not globally replace greens inside trees,
   clothing, domes, icons, or civic details.
7. Remove the green background from the PNG source with the installed system
   chroma helper. Validate RGBA output, transparent corners, transparent border,
   plausible alpha bbox, and no visible green halo.
8. Export sibling WebP at quality `80` from the transparent PNG. Do not resample
   unless the user explicitly asks.

## Prompt Core

For the white source:

```text
Create one isolated CivicChain illustration on a pure white background.
Center the subject with comfortable generated whitespace. The full subject must
be visible and must not touch or approach any canvas edge. Use airy civic
watercolor and pencil/ink linework, muted municipal colors, sparse readable
safe text only when useful, no logos, no real seals, no private data, no
watermark, no UI screenshot.

Primary request: <subject block>.
```

For the green regeneration:

```text
Edit the provided cropped white-background illustration as the only target.
Regenerate the same subject and composition, making the illustration sharper,
clearer, and higher-resolution through the image model itself: cleaner
pencil/ink lines, clearer details, refined watercolor edges, less blur.
Replace the white background with a perfectly flat solid #00ff00 chroma-key
green background. Preserve the existing subject placement, scale, aspect ratio,
safe margins, and style. Do not add people, UI, logos, seals, metrics,
captions, or a different scene. Output one image only.
```

## Packaging Commands

White crop should leave exactly `10px` padding. The crop must not enlarge,
resample, or sharpen.

```bash
python - <<'PY'
from pathlib import Path
from PIL import Image

src = Path("<white-source.png>")
dst = Path("<cropped-white.png>")
padding = 10
image = Image.open(src).convert("RGB")
pixels = image.load()
xs = []
ys = []

for y in range(image.height):
    for x in range(image.width):
        r, g, b = pixels[x, y]
        if not (r >= 248 and g >= 248 and b >= 248):
            xs.append(x)
            ys.append(y)

if not xs:
    raise SystemExit("no non-white subject found")

box = (
    max(0, min(xs) - padding),
    max(0, min(ys) - padding),
    min(image.width, max(xs) + 1 + padding),
    min(image.height, max(ys) + 1 + padding),
)
cropped = image.crop(box)
dst.parent.mkdir(parents=True, exist_ok=True)
cropped.save(dst)
print(f"saved {dst} {cropped.width}x{cropped.height}")
PY
```

Green removal should use the installed helper:

```bash
python "${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/remove_chroma_key.py" \
  --input <green-source.png> \
  --out <transparent.png> \
  --key-color "#00ff00" \
  --auto-key border \
  --soft-matte \
  --transparent-threshold 12 \
  --opaque-threshold 220 \
  --despill \
  --force
```

WebP export:

```bash
python - <<'PY'
from pathlib import Path
from PIL import Image
src = Path("<transparent.png>")
dst = src.with_suffix(".webp")
Image.open(src).convert("RGBA").save(dst, "WEBP", quality=80, method=6)
PY
```

## Done Check

- White source exists and opens.
- Cropped white source has `10px` padding and no clipped subject.
- Chroma PNG exists, is RGB, and has exact green corners/border after
  edge-connected normalization if needed.
- Transparent PNG is RGBA with transparent corners and transparent border.
- WebP quality `80` exists and has the same dimensions as the transparent PNG.
- Contact sheet or direct visual check shows same subject, no green halo, and no
  unwanted added scene.
