import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { site } from '../data/site';

function shouldPlayHeroIntro() {
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.scrollY < 4 &&
    !window.location.hash &&
    sessionStorage.getItem('hero-intro-seen') !== 'true'
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introPlaying, setIntroPlaying] = useState(shouldPlayHeroIntro);

  const releaseIntro = useCallback((shouldContinue = true) => {
    document.body.classList.remove('hero-intro-locked');
    videoRef.current?.pause();
    setIntroPlaying(false);
    sessionStorage.setItem('hero-intro-seen', 'true');

    if (shouldContinue) {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hero-intro-release'));
      }, 260);
    }
  }, []);

  useEffect(() => {
    if (!introPlaying) return;

    document.body.classList.add('hero-intro-locked');

    const safetyRelease = window.setTimeout(() => releaseIntro(false), 9000);
    const play = videoRef.current?.play();
    play?.catch(() => releaseIntro(false));

    return () => {
      window.clearTimeout(safetyRelease);
      document.body.classList.remove('hero-intro-locked');
    };
  }, [introPlaying, releaseIntro]);

  return (
    <section
      id="about"
      className={`hero${introPlaying ? ' hero--intro-playing' : ' hero--intro-complete'}`}
      data-section="about"
    >
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
            I build identities, interfaces and production artwork designed to survive the real
            world.
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
            autoPlay={introPlaying}
            preload="auto"
            aria-hidden="true"
            onEnded={() => releaseIntro(introPlaying)}
            onError={() => releaseIntro(false)}
          />
        </figure>

        <nav className="hero__routes" aria-label="Featured portfolio routes">
          <a href="#work">Selected work</a>
          <a href="#timeline">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="hero__scroll" href="#work" aria-label="Continue to selected work">
          <span aria-hidden="true" />
          Scroll
        </a>
      </div>
    </section>
  );
}
