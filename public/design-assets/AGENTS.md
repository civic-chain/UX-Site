# Public Design Assets Instructions

This folder is the committed runtime asset bank for reusable CivicChain art.
Runtime code may reference these files directly; `_workspace/design-assets/`
remains the generation/source workspace.

## Folder Rules

- `scenes-colored/` contains transparent foreground illustrations. Render them
  directly, without a backing panel, image frame, outline, padding wrapper, or
  fake card around the image. Preserve the intrinsic aspect ratio with
  `object-contain`; verify the artwork is not cropped, stretched, or pushed
  outside its card.
- `bg-textures/` contains surface textures. Use them only as semi-transparent
  background overlays with `mix-blend-mode: overlay`, normally through
  `SurfaceCard material`, on a visible tinted or colored surface. Do not use
  them as standalone images or on plain white backgrounds where the texture
  disappears.
- `bg-scenes-wide/` and `bg-scenes-square/` contain decorative scene washes.
  Place them as background art with `mix-blend-mode: multiply` and about 50%
  opacity. They may sit at the bottom, side, or corner; cropping, bleeding, and
  sizing slightly beyond the surface are allowed because these assets are
  atmospheric, not foreground illustrations.
- When a scene wash is absolutely positioned at the bottom of a card, reserve
  its visual height with an empty in-flow spacer. Do not rely on padding alone:
  the card should stay tall because the layout owns the image slot, while the
  image itself remains bottom-pinned.

## Check Before Done

For every asset use, check the rendered desktop and mobile card: foreground
illustrations keep their proportions and remain fully visible; background
scenes stay behind content; textures are visible but quiet.
