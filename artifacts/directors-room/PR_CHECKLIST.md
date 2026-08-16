## Pre-PR validation checklist

- [x] `lib/types.ts` present and exports `Project`, `Shot`, `SceneLayer`, `SceneManifest`, `CameraRig`
- [x] Nested `<button>` in `LayerSidebar` removed (outer element is now a `role="button"` div with keyboard support; inner visibility toggle is the only real `<button>`) 
- [x] `app/globals.css` present and includes `@tailwind base/components/utilities`
- [ ] `npm run build` run locally with zero type errors *(run this yourself and check the box)*
- [ ] Manually tested in dev server:
  - [ ] `/layers` — layer toggle, transform ranges, keyboard nav on layer list
  - [ ] `/studio` and `/studio/proj-001` — edit shot, add shot
  - [ ] `/preview/proj-001` and `/generate/image`, `/generate/video` — job/status flow
- [x] ARIA improvements added:
  - [x] `aria-live="polite"` on job/status messages (`PromptForm`, `ShotCard`)
  - [x] `aria-label` on previously unlabeled inputs (range sliders, prompt textareas, shot title)
  - [x] `aria-pressed` / `aria-checked` on toggle buttons (`LayerSidebar` visibility, `CameraRigSelector`)
  - [x] `aria-expanded` + `aria-controls` on expand/collapse (`ShotCard`)
- [x] Dependencies confirmed in `package.json`: `konva`, `react-konva`, `use-image`
- [x] Demo assets degrade gracefully to gradient/text placeholders when missing (`MediaFrame`, `ProjectCard`, `LayerCanvas`)

### Notes for reviewers
Type checking and interactive testing (unchecked boxes above) should be run locally before merge — they can't be verified by static code generation alone.
