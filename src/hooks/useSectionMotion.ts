import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSectionMotion(disabled: boolean) {
  useLayoutEffect(() => {
    if (disabled) return;

    const cleanups: Array<() => void> = [];
    const isDesktop = window.matchMedia('(min-width: 961px)').matches;

    const context = gsap.context(() => {
      // Generic once-reveals; intros and heads get richer scrub treatments below.
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (element.matches('.section-frame__head, .skills__lead, .portfolio__intro, .music__intro')) return;
        gsap.fromTo(
          element,
          { y: 28, clipPath: 'inset(0 0 14% 0)' },
          {
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.05,
            ease: 'expo.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });

      // Section titles: hero plays on load; the rest scrub in word by word.
      document.querySelectorAll<HTMLElement>('[data-section-title]').forEach((title) => {
        const words = title.querySelectorAll<HTMLElement>('.section-title__word > span');
        if (title.closest('.hero')) {
          gsap.fromTo(
            words,
            { yPercent: 112, opacity: 0.12, filter: 'blur(8px)' },
            {
              yPercent: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.92,
              stagger: 0.07,
              ease: 'expo.out',
              delay: 0.15,
            },
          );
          return;
        }
        gsap.fromTo(
          words,
          { yPercent: 112, opacity: 0.1, filter: 'blur(6px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: title, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
          },
        );
      });

      // Section intros: rise + unclip tied to scroll, both directions.
      document
        .querySelectorAll<HTMLElement>(
          '.skills__lead, .portfolio__intro, [data-timeline-intro], .music__intro > p',
        )
        .forEach((intro) => {
          gsap.fromTo(
            intro,
            { opacity: 0.06, y: 44, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              ease: 'none',
              scrollTrigger: { trigger: intro, start: 'top 88%', end: 'top 48%', scrub: 0.7 },
            },
          );
        });

      // Ghost numerals drift with each section's scroll range.
      document.querySelectorAll<HTMLElement>('.section-frame__ghost, .portfolio__index').forEach((ghost) => {
        const section = ghost.closest('section');
        if (!section) return;
        gsap.fromTo(
          ghost,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      // Work: pinned horizontal showcase on desktop, vertical reveals on mobile.
      const portfolio = document.querySelector<HTMLElement>('[data-portfolio]');
      const sequence = portfolio?.querySelector<HTMLElement>('.portfolio__sequence') ?? null;
      const stages = gsap.utils.toArray<HTMLElement>('[data-project-stage]');
      let horizontal: gsap.core.Tween | undefined;

      if (portfolio && sequence && isDesktop) {
        const distance = () => Math.max(0, sequence.scrollWidth - window.innerWidth);
        horizontal = gsap.to(sequence, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: portfolio,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      stages.forEach((stage) => {
        const media = stage.querySelector<HTMLElement>('[data-project-media]');
        const link = media?.querySelector<HTMLElement>('a');
        const cursor = media?.querySelector<HTMLElement>('.project-stage__cursor');
        if (!media) return;

        if (horizontal) {
          gsap.fromTo(
            media,
            { scale: 0.9, opacity: 0.45, clipPath: 'inset(6% 6% 6% 6%)' },
            {
              scale: 1,
              opacity: 1,
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                containerAnimation: horizontal,
                start: 'left 100%',
                end: 'left 52%',
                scrub: true,
              },
            },
          );
        } else {
          gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: 'top 92%',
              end: 'top 38%',
              scrub: 0.75,
            },
          })
            .fromTo(
              media,
              { scale: 0.84, clipPath: 'inset(9% 9% 9% 9%)' },
              { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.46, ease: 'none' },
            );
        }

        if (link && cursor && window.matchMedia('(hover: hover)').matches) {
          gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.68, opacity: 0 });
          const moveX = gsap.quickTo(cursor, 'x', { duration: 0.36, ease: 'power3.out' });
          const moveY = gsap.quickTo(cursor, 'y', { duration: 0.36, ease: 'power3.out' });

          const onMove = (event: PointerEvent) => {
            const bounds = link.getBoundingClientRect();
            moveX(event.clientX - bounds.left);
            moveY(event.clientY - bounds.top);
          };
          const onEnter = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.28, ease: 'power3.out' });
          const onLeave = () => gsap.to(cursor, { scale: 0.68, opacity: 0, duration: 0.22, ease: 'power2.out' });

          link.addEventListener('pointermove', onMove);
          link.addEventListener('pointerenter', onEnter);
          link.addEventListener('pointerleave', onLeave);
          cleanups.push(() => {
            link.removeEventListener('pointermove', onMove);
            link.removeEventListener('pointerenter', onEnter);
            link.removeEventListener('pointerleave', onLeave);
          });
        }
      });

      const timelineRoles = gsap.utils.toArray<HTMLElement>('[data-timeline-role]');
      timelineRoles.forEach((role, index) => {
        gsap.fromTo(
          role,
          { opacity: 0.18, y: 52 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.03,
            ease: 'expo.out',
            scrollTrigger: { trigger: role, start: 'top 88%', once: true },
          },
        );
      });

      const timeline = document.querySelector<HTMLElement>('[data-timeline]');
      const progress = document.querySelector<HTMLElement>('[data-timeline-progress]');
      if (timeline && progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: timeline, start: 'top 65%', end: 'bottom 65%', scrub: 0.5 },
          },
        );
      }
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [disabled]);
}
