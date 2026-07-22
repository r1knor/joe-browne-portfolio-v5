import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSectionMotion(disabled: boolean) {
  useLayoutEffect(() => {
    if (disabled) return;

    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        if (element.matches('.section-frame__head')) return;
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

      document.querySelectorAll<HTMLElement>('[data-section-title]').forEach((title) => {
        const words = title.querySelectorAll<HTMLElement>('.section-title__word > span');
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
            scrollTrigger: { trigger: title, start: 'top 88%', once: true },
          },
        );
      });

      const portfolio = document.querySelector<HTMLElement>('[data-portfolio]');
      const portfolioPin = document.querySelector<HTMLElement>('[data-portfolio-pin]');
      if (portfolio && portfolioPin && window.matchMedia('(min-width: 961px)').matches) {
        ScrollTrigger.create({
          trigger: portfolio,
          start: 'top top',
          end: 'bottom bottom',
          pin: portfolioPin,
          pinSpacing: false,
        });
      }

      document.querySelectorAll<HTMLElement>('[data-project-stage]').forEach((stage) => {
        const media = stage.querySelector<HTMLElement>('[data-project-media]');
        const link = media?.querySelector<HTMLElement>('a');
        const cursor = media?.querySelector<HTMLElement>('.project-stage__cursor');
        if (!media) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top 92%',
            end: 'bottom 8%',
            scrub: 0.75,
          },
        })
          .fromTo(
            media,
            { scale: 0.84, opacity: 0.28, clipPath: 'inset(9% 9% 9% 9%)' },
            { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.46, ease: 'none' },
          )
          .to(media, { scale: 0.95, opacity: 0.24, duration: 0.32, ease: 'none' }, 0.68);

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

      const timelineSection = document.querySelector<HTMLElement>('.timeline');

      const timelineIntro = document.querySelector<HTMLElement>('[data-timeline-intro]');
      const timelineRoles = gsap.utils.toArray<HTMLElement>('[data-timeline-role]');

      if (timelineSection && timelineIntro) {
        gsap.fromTo(
          timelineIntro,
          { opacity: 0.08, y: 42, clipPath: 'inset(0 0 100% 0)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineSection,
              start: 'top 62%',
              end: 'top 18%',
              scrub: 0.7,
            },
          },
        );
      }

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