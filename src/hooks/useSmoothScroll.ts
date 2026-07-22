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

    document.addEventListener('click', handleAnchor);
    return () => {
      document.removeEventListener('click', handleAnchor);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [disabled]);
}
