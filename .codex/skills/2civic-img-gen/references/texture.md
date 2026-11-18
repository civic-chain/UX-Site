# Command: текстура

Use for generated CivicChain background textures, paper/line texture, pattern
overlays, or other non-subject raster textures. This command is the opposite of
isolated illustration: the texture must fill the whole canvas.

## Workflow

1. Generate one texture image from a text prompt. Use the system `imagegen`
   skill for generation mechanics.
2. Prompt for a black-and-white texture on a white background that fills the
   entire canvas edge to edge. The lines must be crisp and readable; no isolated
   centered subject, no empty border, no vignette, no colored wash.
3. Save the project-bound PNG in the user-named folder. If no final destination
   is named, save drafts under `_workspace/design-assets/_drafts-gen-ai/` or
   ask for the owner folder when publication matters.
4. Inspect the texture. Reject and regenerate if it has margins, blank edges,
   a central object, color, text, logos, watermarks, or soft blurry linework.
5. Export WebP at quality `80`. Do not add alpha. Do not resample unless the
   user asks for a specific size.

## Prompt Core

```text
Create a black-and-white CivicChain background texture on a white background.
The texture must fill the entire canvas edge to edge with crisp clear linework.
Use only black, white, and subtle gray line variation. No centered object, no
empty margins, no border, no vignette, no color, no text, no logo, no watermark.
Make the linework sharp and suitable for a web background overlay.
```

## WebP Export

```bash
python - <<'PY'
from pathlib import Path
from PIL import Image
src = Path("<texture.png>")
dst = src.with_suffix(".webp")
Image.open(src).convert("RGB").save(dst, "WEBP", quality=80, method=6)
PY
```

## Done Check

- PNG exists and opens.
- Texture visibly fills the full canvas.
- Image is black-and-white or grayscale, with crisp linework.
- WebP quality `80` exists.
- No alpha unless the user explicitly asked for it.
