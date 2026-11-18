# Landing Page Visual Cycle

Repeatable cycle for visual iteration of landing-page sections.

## Folders

- `01-hero/` ... `08-faq/` - current working version of each section.
- In each section:
  - `reference.png` - source screenshot for the section.
  - `subagent-notes.md` - full design-subagent critique plus short fixes.
  - `generated.png` - current imagegen output for this iteration.
  - `build-map.md` - short map: code / icons / illustrations / decorations / do-not-copy.
  - `extract/` - extracted illustrations for this section.
- `_drafts/` - previous generations, old notes, and temporary text artifacts.

## Cycle

1. Capture or choose a focused screenshot of the section.
2. Send the screenshot to a design subagent.
3. The subagent must first complete the full visual question set instead of jumping straight to "what to change."
4. At the end, the subagent returns:
   - `What To Improve` - 3-5 concrete visual fixes.
   - `Main Fix` - one sentence.
   - `Imagegen Brief` - short generation prompt.
5. Save the full response in `subagent-notes.md`.
6. Generate `generated.png` through the official `imagegen`, attaching `reference.png` as visual reference.
7. Create or update `build-map.md`: what is code, icon, illustration, decoration, and do-not-copy.
8. Use `build-map.md` to extract needed illustrations into `extract/`.
9. If a section is regenerated, first move old `generated.png`, `subagent-notes.md`, `build-map.md`, and temporary extract versions into `_drafts/<date-cycle>/<section>/`.

## Important Rules

- Do not change live code, copy, or `public/brand/` in this cycle.
- Do not give imagegen rigid proportions if the new composition needs to choose its own height.
- For `how-it-works`, do not compress vertical steps into a narrow strip; the prompt must allow natural section height.
- The subagent does not generate images or write files; it only studies the screenshot and thinks as a designer.
- Code does not reference `_docs/landing-page/**`; final runtime assets are copied to `public/landing/<section>/...`.
