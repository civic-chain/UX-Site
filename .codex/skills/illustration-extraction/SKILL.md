---
name: illustration-extraction
description: Use when extracting CivicChain landing illustrations from section generated.png screenshots into clean reusable assets. Requires the full generated.png path, a prompt naming exactly what the image model should isolate, and an output path; uses imagegen to create a new complete high-quality isolated illustration on green chroma-key, then only post-processes that draft into transparent PNG plus WebP. Skip simple icons or elements better built as code/SVG.
---

# Illustration Extraction

Project-local workflow for turning section `generated.png` screenshots into reusable
illustration assets. The image generation model performs the visual extraction:
it receives the full screenshot, understands what to isolate, rebuilds missing
parts, and generates a new complete subject on green chroma-key. Python is only
post-processing for that generated draft: remove green, trim transparency, and
write WebP.

## Required Input

Do not start without all three:

- Reference image path: the full section `generated.png` screenshot to give to
  the image model. Do not use `reference.png` as the extraction source.
- Extraction prompt: the exact subject or group the image model should isolate.
- Output path: final transparent, trimmed `.png`; save sibling `.webp` at
  quality `80`.

If the prompt names an icon, line divider, arrow, button, text, or UI card that
can be built as code/SVG, stop and route it back to code-native work.

## Extraction Rules

- Use the system `imagegen` skill for generation/editing mechanics.
- Do not crop, mask, segment, detect edges, or manually cut the subject out of
  the screenshot with Python. The source screenshot goes to `imagegen`; the
  model creates the isolated illustration draft itself. Python never performs
  semantic extraction.
- Prefer the highest available image quality. Do not lower generation quality
  to save time unless the user explicitly asks for a rough draft.
- Generate the subject on a perfectly flat green chroma-key background
  (`#00ff00`). Do not use purple, magenta, white, gray, gradients, shadows, or
  any other background color.
- The extracted subject must be complete and isolated. If the screenshot crops
  part of the subject, instruct the model to reconstruct the missing parts in
  the same style instead of preserving the crop.
- Allow only small visual repairs: cleaner edges, clearer silhouettes, fixed
  AI artifacts, and tiny style-consistency fixes. Do not redesign the subject.
- Preserve text that is physically inside the extracted illustration object
  itself, such as text on a board, sign, document, table, or label. Remove only
  unrelated page UI text, buttons, email addresses, watermarks, or text outside
  the extracted subject.
- Keep enough visual breathing room during generation, then trim empty
  transparent space after background removal with medium tolerance and `5px`
  padding from the last opaque contact.

## Prompt Shape

Use a compact prompt with these parts:

```text
Use case: background-extraction
Reference image: <full section generated.png path and role; give the complete image to the model>
Extract: <exact subject/group the image model should isolate and regenerate>
Complete subject rule: reconstruct any cropped or hidden parts in the same style; do not leave the subject cut off.
Style lock: match the reference's warm civic editorial illustration style, palette, line weight, paper texture, and lighting.
Repair allowance: only minor cleanup of AI artifacts, edges, proportions, and silhouette clarity.
Backdrop: perfectly flat solid #00ff00 green chroma-key background. Green is mandatory; do not use purple/magenta.
Text rule: preserve text physically inside the extracted illustration object; remove unrelated page UI text, buttons, watermarks, and email addresses.
Constraints: no shadows, no floor plane, no gradients, no texture in the background, no watermark, no unrelated extra text.
Output: isolated full subject with enough breathing room for clean trim.
```

## Micro Reports

Keep reports tiny:

- Before `imagegen`: `Starting imagegen: max quality, green background, may take a couple of minutes.`
- After it returns: `Done: <draft path>. Background removal can continue.`
- After finish script: `PNG/WebP ready: <final path>, <webp path>.`

Do not imply live progress or percentages; the official `imagegen` call does
not expose them here. Do not promise an automatic hook after generation; the
agent may be blocked while the official image call is running.

## Save And Finish

1. After `imagegen` returns the new green-background draft, save it near the
   section's ignored draft mirror, for example
   `.ignore/visual-drafts/_workspace/landing-page/<section>/extract/_drafts/<name>-green.png`.
2. Run:

   ```bash
   <python-with-pillow> .codex/skills/illustration-extraction/scripts/finish_extraction.py \
     --input <green-source.png> \
     --out <final.png>
   ```

3. The script must create:
   - `<final>.png` with alpha;
   - sibling `<final>.webp` at quality `80`;
   - transparent-space trim before WebP conversion;
   - failure if the draft source is not predominantly green chroma-key;
   - no resampling or downscaling; dimensions may shrink only by trimming empty
     transparent borders.
4. Never run this script on the original screenshot as a substitute for
   `imagegen`; it is only for the generated green-background draft.
5. Put selected working outputs under `_workspace/landing-page/<section>/extract/`.
   Copy only final runtime assets later to `public/landing/<section>/...`.

Use the bundled Codex Python from `load_workspace_dependencies` when normal
`python3` lacks Pillow.

## Done When

- Reference, extraction prompt, green draft, final PNG, and WebP paths are known.
- Final PNG has alpha and transparent corners.
- PNG and WebP dimensions match each other after trim; neither is resampled.
- The subject is complete, not cropped.
- No runtime code references `_docs/**` or `_workspace/**`.
