# Joe Browne portfolio v5

A new, standalone portfolio for Joe Browne and Riknor. The project was rebuilt from the read-only `portfolio v4` source as a Vite + React + TypeScript application.

## Location

`C:\Users\Joe Browne\Documents\Claude Code\portfolio v5`

## Run locally

```powershell
pnpm install
pnpm dev
```

Then open the local URL printed by Vite.

Production checks:

```powershell
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

`npm install` and the equivalent `npm run ...` scripts are also supported by the project. On the machine used for this build, the user-level npm shim points to a missing npm CLI, so the bundled pnpm runtime was used for validation.

## Stack

- Vite 8, React 19 and TypeScript 6
- React Router for source-backed project routes and browser history
- Three.js, React Three Fiber and Drei for the hero production-drum and Riknor disc scenes
- GSAP ScrollTrigger and Lenis for one coordinated scroll/motion system
- Hand-written responsive CSS using an OKLCH token palette
- ESLint and Prettier

## Content editing

- Site identity, contact details and navigation: `src/data/site.ts`
- Skills and capability groups: `src/data/skills.ts`
- Work and education chronology: `src/data/experience.ts`
- Portfolio projects, metadata and gallery paths: `src/data/projects.ts`
- Riknor track, SoundCloud embed and artwork archive: `src/data/music.ts`

All layout components read from these files. Unavailable metadata is omitted instead of rendering empty labels.

## Assets

- Web-ready responsive images: `public/assets/images`
- Selected source-quality originals retained for future editing: `src/assets/originals`
- Source audit and content inventory: `audit/CONTENT-INVENTORY.md`

The production build references only assets inside v5. It has no runtime dependency on `portfolio v4`.

## Audio behavior

No local audio files existed in v4. The Music section therefore uses one verified SoundCloud track, `Dubby Riddim`, behind an explicit `Load player` action. It never autoplays. Add future real tracks in `src/data/music.ts`; local-audio controls should only be added when source audio files are supplied.

## Contact behavior

The contact form validates locally and opens a pre-addressed draft in the visitor's email application. It stores and transmits no form data by itself. A hosted form endpoint can be connected later in `src/sections/Contact.tsx`.

## Known limitations

- The lazy WebGL bundle is the largest JavaScript chunk. DPR is capped and adaptive, scenes pause offscreen, and reduced-motion/static fallbacks are included.
- WebGL scenes require browser WebGL support; the CSS fallback preserves composition when unavailable.
- SoundCloud playback and the externally hosted Fontshare/Google font files require a network connection. System font fallbacks are defined.
- `sainsburys-corrie-elevation.png` is 983 px wide and should not be used beyond its current contained presentation without a higher-resolution replacement.
- Project years, tools and longer case-study narratives were absent from the source and remain intentionally omitted.
- A canonical domain and production form endpoint still need to be supplied before deployment.

## Source protection

`portfolio v4` was audited as read-only. The integrity checksum recorded before implementation is stored in `audit/CONTENT-INVENTORY.md`; the same checksum is verified again at handoff.
