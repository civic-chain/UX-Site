# Command: asset pack / восстановление файлов

Use when CivicChain image work must become durable project files, not just a
chat-visible preview. This covers scene/stamp packs, colored reference-led
assets, old local image restyling, Creative Production saved runs, sheet
splitting, and repeated missing-file recovery.

## Owner Boundary

This reference owns project asset recovery and packaging. It does not own UI
prompt writing, brand-design laws, Codex login/model/config repair, or Mac
permission troubleshooting.

If generation fails before an image exists because of model/auth/config/tooling,
fix that in the runtime owner. Do not change the image prompt unless the visual
content itself is wrong.

## Fresh Source Recovery

Never copy a stale "latest" generated image.

1. Snapshot or note `~/.codex/generated_images` before generation.
2. Generate or edit the image.
3. Recover only a source PNG created by the current attempt:
   - explicit runner output;
   - before/after generated-images diff;
   - child session lookup under `~/.codex/generated_images/<session-id>/*.png`.
4. If several files match, inspect dimensions and content before choosing.
5. Copy the recovered source into the requested workspace/source folder before
   deterministic packaging.

Observable check: the recovered file is new for this attempt, opens locally, and
matches the prompt subject.

## Durable Pack Pattern

1. Keep source generations under the requested source folder or saved run
   folder.
2. Keep final reusable files in the requested project folder.
3. Treat the recovered native PNG dimensions as the source of truth. Default
   WebP export is quality `80` at the same pixel dimensions; it compresses file
   weight, not canvas size. Do not downscale to a display slot, retina target,
   or thumbnail unless the user explicitly asks.
4. Apply deterministic packaging only after source recovery:
   - split sheets;
   - trim white;
   - add requested padding;
   - normalize edge-connected chroma;
   - remove alpha only when not requested;
   - export stable PNG/WebP filenames;
   - write manifests/contact sheets when a pack has many files.
5. Verify count, source and final dimensions, file existence, color mode, and a
   visual/contact sheet when useful.

Do not leave project-bound assets only in `~/.codex/generated_images`.

## Sheet Cropping And Padding

Use sheets or grids only for early exploration, contact-sheet ideation, or when
the user accepts quadrant quality. For production-quality assets after softness
or resolution loss, generate one final asset per image.

Packaging checks:

- `Image.thumbnail()` never upscales. A small quadrant cannot honestly become a
  crisp large production file.
- Preserve native resolution by default. Crop, split, padding, and fixed-size
  export are dimension-changing packaging steps; use them only when requested
  or required by the active command reference, and report before/after sizes.
- If fixed-size export is explicitly required and source is large enough,
  resize to contain with scale capped at `1` when preserving native quality.
- For pale watercolor or paper textures, use thresholded bbox checks. A loose
  near-white threshold may preserve a fake square around a horizontal subject.
- Verify wide assets by content bbox aspect ratio, not only final canvas size.

Observable check: final WebP dimensions match the source PNG unless a named
packaging step changed them; margins match requested padding, wide assets have
a wide content bbox, and final files were not enlarged from tiny cropped
quadrants.

## Colored Reference-Led Packs

Colored packs are not grayscale overlay textures.

- Keep final assets in RGB unless transparency is requested.
- Do not grayscale/desaturate or use `nonGrayPixels == 0` as a success test.
- State reference roles in the generation brief: subject/composition, brushwork,
  paper texture, color handling, or forbidden transfer.
- Keep warm-white or cream background for reusable marketing art unless the
  user asked for transparency or chroma.
- Keep subjects isolated with comfortable margins. Do not crop to a tight
  sticker unless requested.
- Text-bearing labels are allowed when intentional and sparse. Avoid real agency
  names, private data, exact metrics, certifications, partner logos, and
  unsupported claims.

Observable check: contact sheet shows a coherent CivicChain color/style family,
comfortable margins, and no accidental reference-only subjects or text.

## Restyling Old Local Images

When restyling existing generated images, treat old files as subject/story
references, not final quality sources unless exact preservation is requested.

1. Inspect old images before prompting.
2. Convert each old image into a clean production brief that preserves useful
   subject/story and drops artifacts: gibberish text, unwanted people, fake
   seals, hard UI panels, black previews, or overly realistic detail.
3. Generate a new image per old image. Do not just filter, upscale, recolor, or
   compress the old output unless the user explicitly requested an edit.
4. Save old source path, new source path, final output path, and visual notes in
   a manifest when the pack has more than a few files.

Observable check: the regenerated asset matches the business use case, belongs
to the requested style/background contract, and any dropped elements are noted.

## Closeout

Report source recovery route, final paths, counts, dimensions, packaging steps,
visual/contact-sheet checks, and remaining risks such as weak generated text,
near-green normalization, small native source, or unreviewed variants.
