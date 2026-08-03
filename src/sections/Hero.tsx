import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { site } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const reduced = useReducedMotion();
  const [compactMotion, setCompactMotion] = useState(
    () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px), (pointer: coarse)');
    const update = () => setCompactMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduced || compactMotion) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!section || !video || !progress) return;

    let tween: gsap.core.Tween | undefined;

    const createSequence = () => {
      video.pause();
      video.currentTime = 0.001;
      gsap.set(progress, { scaleX: 0 });

      tween = gsap.to(video, {
        currentTime: Math.max(0.01, video.duration - 1 / 24),
        filter: 'grayscale(1) saturate(0.4) contrast(1.12) brightness(0.64)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2.4, 1800)}`,
          pin: true,
          scrub: 0.18,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // This pin is created after the section triggers (it waits on video
          // metadata); without re-sorting, triggers below the hero compute
          // their start positions ignoring the pin's added scroll distance.
          refreshPriority: 1,
          onUpdate: ({ progress: scrollProgress }) => {
            gsap.set(progress, { scaleX: scrollProgress });
          },
        },
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      createSequence();
    } else {
      video.addEventListener('loadedmetadata', createSequence, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', createSequence);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [compactMotion, reduced]);

  return (
    <section ref={sectionRef} id="about" className="hero" data-section="about">
      <div className="hero__stage">
        <div className="hero__meta" aria-label="Portfolio introduction">
          <span>{site.location}</span>
          <span>Nine years / design and production</span>
        </div>

        <div className="hero__identity">
          <AnimatedTitle as="h1">Joe Browne</AnimatedTitle>
          <span>{site.title}</span>
        </div>

        <div className="hero__copy">
          <span className="hero__index" aria-hidden="true">
            01
          </span>
          <p className="hero__intro">
            I build identities, interfaces and production artwork{' '}
            <em>designed to survive the real world.</em>
          </p>
          <a className="hero__contact" href="#work">
            View selected work <span aria-hidden="true">↘</span>
          </a>
        </div>

        <figure className="hero__portrait" aria-label="Joe Browne, studio artworker and designer">
          <video
            ref={videoRef}
            src="/assets/videos/output-hero.mp4"
            poster="/assets/images/joe-browne-portrait-1400.webp"
            width="960"
            height="960"
            muted
            playsInline
            preload={compactMotion || reduced ? 'none' : 'metadata'}
            aria-hidden="true"
          />
          <div className="hero__scrub-meter" aria-hidden="true">
            <span ref={progressRef} />
          </div>
        </figure>

        <nav className="hero__routes" aria-label="Featured portfolio routes">
          <a href="#work">Selected work</a>
          <a href="#timeline">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="hero__scroll"
          href="#work"
          aria-label="Skip the video and continue to selected work"
        >
          <span aria-hidden="true" />
          Scroll to play
        </a>
      </div>
    </section>
  );
}
