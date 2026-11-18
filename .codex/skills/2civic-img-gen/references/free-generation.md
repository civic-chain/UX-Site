# Command: свободная генерация

Use when the request is image generation but not clearly an isolated
illustration or texture, or when the user is exploring options and has not named
a strict asset pipeline.

## Tool Route

- Use the system `imagegen` skill for native image generation/editing and for
  current transparency limitations.
- Use CLI fallback only when the user explicitly asks for CLI/API/model control
  or when the system `imagegen` workflow says to ask and the user confirms.
- The fallback script is:

```bash
python "${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/image_gen.py" ...
```

- The chroma-removal helper is:

```bash
python "${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/remove_chroma_key.py" ...
```

## Destinations

- User-named destination wins.
- Drafts default to `_workspace/design-assets/_drafts-gen-ai/`.
- Final reusable design assets live under `_workspace/design-assets/` owner
  folders such as `bg-textures/`, `bg-scenes-square/`, `bg-scenes-wide/`,
  `stamps/`, or `scenes-colored/`.
- `public/**` is a publish target. Write there only when the user says publish,
  replace, wire, prepare runtime assets, or equivalent.

## Recovery

Native imagegen can show a chat image without exposing a local path. For
project-bound work:

1. Snapshot or note current `~/.codex/generated_images`.
2. Generate the image.
3. Recover only a fresh file from the current session. Prefer
   `~/.codex/generated_images/<session-id>/*.png` when using child `codex exec`.
4. Inspect the recovered file before copying it into the project.
5. Never choose a stale file merely because it is newest after unrelated tools.

For isolated local-file edits, run child `codex exec --image <one-input-file>`
when the main chat context contains too many images and could confuse the edit
target. Attach only the intended source image.

For multi-file packs, saved review folders, sheet splitting, restyling old local
images, or repeated missing-file recovery, switch to
[project-asset-recovery.md](project-asset-recovery.md).

## Prompt Rules

- For GPT Image 2, write the prompt as a skimmable production brief in a stable
  order: intended use, subject/scene, style or medium, composition/framing,
  background, exact text, then constraints. Use short labeled lines when the
  prompt must be reused or tuned.
- Prefer concrete positive instructions over long negative lists. Name what the
  model should render: medium, line weight, color density, object count,
  whitespace, camera/framing, and which elements are focal or background.
- Sharpness, clarity, detail, and resolution are prompt/model requirements.
  Do not apply code sharpen/upscale unless the user explicitly asks for that
  mechanical operation.
- Preserve the recovered native PNG dimensions for ordinary draft/review
  exports. WebP quality `80` should keep the same width and height as the PNG;
  do not make CSS-slot, retina, thumbnail, cropped, or downscaled exports unless
  the user explicitly asks for that packaging.
- For chroma-key requests, prompt for flat `#00ff00` unless the subject itself
  conflicts with green. If the model returns near-green, normalize only the
  edge-connected background before alpha removal.
- Text-bearing labels are allowed when the user wants them or when the asset
  needs sparse civic labels. Verify visually and selectively regenerate weak
  text instead of banning text by default.
- Do not copy user meta-critique into the image prompt. Convert it into a clean
  production brief. Preserve the user's visual judgment as direct art direction
  and remove planning chatter, uncertainty, and self-referential wording.

## Closeout

Report:

- final paths;
- whether the output is draft, final workspace asset, or public runtime asset;
- generation route used: native imagegen, child session recovery, or explicit
  CLI fallback;
- source and final pixel dimensions;
- packaging performed, if any, including whether dimensions changed;
- visual or mechanical checks;
- any residual risk such as weak text, near-green normalized, or unreviewed
  variants.
