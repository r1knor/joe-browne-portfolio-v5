import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(disabled: boolean, onScroll?: (scroll: number) => void) {
  const onScrollRef = useRef(onScroll);

  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
    const update = (time: number) => lenis.raf(time * 1000);

    if (document.body.classList.contains('hero-intro-locked')) {
      lenis.stop();
    }

    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update();
      onScrollRef.current?.(scroll);
    });
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleAnchor = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.15, offset: 0 });
    };

    const handleIntroRelease = () => {
      const target = document.querySelector<HTMLElement>('#work');
      if (!target) return;
      lenis.start();
      lenis.scrollTo(target, {
        duration: 1.75,
        offset: 0,
        easing: (time) => 1 - Math.pow(1 - time, 5),
      });
    };

    document.addEventListener('click', handleAnchor);
    window.addEventListener('hero-intro-release', handleIntroRelease);
    return () => {
      document.removeEventListener('click', handleAnchor);
      window.removeEventListener('hero-intro-release', handleIntroRelease);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [disabled]);
}
