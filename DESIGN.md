# Design System

## Concept

**Night-shift production archive.** A creative director reviews Joe's work on a dark monitor after hours: large proofs sit on a black field, registration marks and job-ticket annotations create rhythm, and a controlled coral signal identifies the active route. The signature is a persistent vertical **index rail** that moves from professional archive to Riknor signal room.

## Color

Restrained dark strategy; the user-specified coral overrides the generic palette seed.

```css
--color-black: oklch(0.075 0 0);
--color-ink: oklch(0.965 0.004 60);
--color-graphite: oklch(0.16 0.006 25);
--color-panel: oklch(0.115 0.004 20);
--color-muted: oklch(0.67 0.01 30);
--color-coral: oklch(0.655 0.205 27);
```

Coral is limited to active navigation, focus, section progress, playback state, and key metadata. It should remain below roughly ten percent of the visible surface.

## Typography

- Display: Clash Display, carried forward from v4 for identity continuity; weights 500–700.
- Body: Satoshi, carried forward from v4; weights 400–700.
- Utility: JetBrains Mono for job numbers, dates, tools, controls, and track information.
- Display sizes use `clamp()` and never exceed 6rem. Body copy stays within 70 characters.

## Layout

- Desktop: 12-column editorial grid with a 72px persistent rail, large negative space, and deliberate overlap between image, title, and metadata.
- Portfolio: one project proof per long visual beat; landscape work uses a wide stage while portrait work is contained without upscaling.
- Tablet: rail becomes a slim top system bar and compositions shift to 8 columns.
- Mobile: hierarchy remains art-directed—metadata precedes imagery selectively, project indices stay visible, and controls retain 44px targets.

## Components

- IndexRail: six direct section links, active marker, and page progress.
- SectionFrame: semantic section wrapper with large background index used as compositional depth.
- ProjectSequence: alternating proof stages driven by central project data.
- Timeline: chronological list with scroll-linked progress and expandable details.
- SignalRoom: Riknor artwork, verified source claims, lazy SoundCloud player, and a restrained graphite disc scene.
- ContactTerminal: real contact links, copy-email feedback, and a backend-ready validated form.

## Motion

Lenis provides one smooth-scroll system; GSAP ScrollTrigger handles progress, image masks, and timeline drawing. Motion uses weighted expo/quart easing, pauses when hidden, and becomes near-instant under reduced motion. Content is visible by default before enhancement.

## WebGL

React Three Fiber supplies purpose-built graphite material studies in the hero and Music section. Scenes cap DPR, pause offscreen, use ambient plus directional/spot lighting, and expose a static CSS fallback.
