# Other Pages Visual Cycle

Repeatable cycle for related pages `/about` and `/contact`.

## Folders

- `about/` - current working version of `/about`.
- `contact/` - current working version of `/contact`.
- In each folder:
  - `reference.png` - desktop screenshot of `main`.
  - `reference-mobile.png` - mobile screenshot of `main`.
  - `subagent-notes.md` - full design-subagent critique plus short fixes.
  - `imagegen-prompt.md` - prompt for page-level direction.
  - `generated.png` - current imagegen output.
  - `build-map.md` - code / icons / illustrations / decorations / do-not-copy.
  - `extract/` - extracted illustrations for the page.

## Cycle

1. Capture a focused screenshot of `main` without header, footer, or browser chrome.
2. Send the page to a design subagent: one agent per page.
3. Save the full response in `subagent-notes.md`.
4. Extract one `imagegen-prompt.md` for the page.
5. Generate `generated.png` through `imagegen`.
6. Create `build-map.md`.
7. Extract only complex illustrations into `extract/`.
8. Implement fixes through the shared design system.

## Important Rules

- Do not change live copy, `public/brand/`, or Justin canonical.
- Do not create a separate CSS layer for `/about` or `/contact`.
- Page-level generation sets direction; it is not a pixel-perfect layout.
- Simple icons stay code-native.
- Code does not reference `_docs/other-pages/**`; final assets are copied to `public/landing/other-pages/<page>/`.
