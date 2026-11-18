---
name: 2civic-img-gen
description: >
  Project-local CivicChain image-generation router. Use automatically for any
  CivicChain raster image generation, regeneration, image edit, illustration,
  texture, background, chroma-key, transparent PNG, WebP export, asset pack, or
  saved image workflow in civicchain-v2. Routes image work to the local command
  references: isolated illustration, texture, or free generation. Coordinates
  with the system imagegen skill but owns CivicChain destinations, approved
  prompts, chroma/alpha packaging, resolution-preserving export, and
  verification. Brand-design laws, palette/composition judgment, and on-brand
  critique stay in $2civic-design. Skip only code-native SVG/CSS/icon work when
  the user is not asking for a generated raster image.
---

# Civic Image Generation Router

This skill is a router for CivicChain project image work. Keep this file small:
choose the command, read exactly that reference, then use the system `imagegen`
skill for generation mechanics.

## Owner Boundary

This skill owns generated raster assets: prompts as production instructions,
model-generation flow, recovery, chroma/alpha cleanup, export format,
destinations, and verification. It does not own CivicChain brand-design laws.
For palette, composition, type rhythm, proof hierarchy, or on-brand judgment,
use `$2civic-design`, then return here for the image file workflow.

## First Move

Read `_workspace/design-assets/AGENTS.md` before writing any design asset. Also
read the local target folder `AGENTS.md` when one exists. User-named destination
wins over defaults.

## Commands

- `изолированная иллюстрация`:
  read [references/isolated-illustration.md](references/isolated-illustration.md)
  for centered white-background illustration, 10px trim padding, green sharpen
  regeneration, alpha PNG, and WebP 80.
- `текстура`:
  read [references/texture.md](references/texture.md) for black-and-white
  full-canvas texture generation and WebP 80 export.
- `свободная генерация`:
  read [references/free-generation.md](references/free-generation.md) for
  general CivicChain imagegen routing, recovery, destinations, and closeout.
- `asset pack / восстановление файлов`:
  read [references/project-asset-recovery.md](references/project-asset-recovery.md)
  when a project-bound pack needs durable saved files, generated files appear in
  chat but not on disk, stale generated-image cache is a risk, sheets need
  splitting/cropping/padding, or old local images are being regenerated into a
  reusable CivicChain asset folder.

If a task starts as one command and turns into another, stop, name the switch,
and read the new command reference before continuing.

## Non-Negotiables

- Put requested sharpness, clarity, and resolution in the image-generation
  prompt. Do not fake them with code sharpening or code upscaling.
- Preserve the model's native pixel dimensions by default. WebP quality `80`
  is a byte-weight compression strategy, not permission to crop, downscale,
  thumbnail, or make fixed-size/retina exports. Any pixel-dimension change must
  be explicitly requested by the user or required by the loaded command
  reference, and must be named in closeout.
- Code may handle packaging only: file recovery, white crop, edge-connected
  chroma normalization, alpha removal, conversion, contact sheets, manifests,
  and verification.
- A chat-visible image is not done. A project-bound image is done only when the
  file exists at the owner path and has been visually or mechanically checked.
- Recover native imagegen outputs from the current session, not from a stale
  newest file under `~/.codex/generated_images`.
- Write to `public/**` only when the user explicitly asks to publish, replace,
  wire, or prepare runtime assets.

## Closeout

Report changed paths, generated counts, source and final pixel dimensions,
whether any dimensions changed, verification commands/checks, and any remaining
visual risk. Keep prompt text available when it materially affects future
regeneration.
