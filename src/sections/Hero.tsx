import { site } from '../data/site';
import { AnimatedTitle } from '../components/AnimatedTitle';

export function Hero() {
  return (
    <section id="about" className="hero" data-section="about">
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
          <span className="hero__index" aria-hidden="true">01</span>
          <p className="hero__intro">
            I build identities, interfaces and production artwork designed to survive the real world.
          </p>
          <a className="hero__contact" href="#work">
            View selected work <span aria-hidden="true">↘</span>
          </a>
        </div>

        <figure className="hero__portrait">
          <img
            src="/assets/images/joe-browne-portrait-1400.webp"
            srcSet="/assets/images/joe-browne-portrait-800.webp 800w, /assets/images/joe-browne-portrait-1400.webp 1400w"
            sizes="(max-width: 760px) 100vw, 50vw"
            width="1400"
            height="1400"
            alt="Joe Browne, studio artworker and designer"
            fetchPriority="high"
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