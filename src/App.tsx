import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useSectionMotion } from './hooks/useSectionMotion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ProjectDetail } from './ProjectDetail';
import { Contact } from './sections/Contact';
import { Hero } from './sections/Hero';
import { Music } from './sections/Music';
import { Portfolio } from './sections/Portfolio';
import { Skills } from './sections/Skills';
import { Timeline } from './sections/Timeline';

function Landing() {
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState('about');
  const [progress, setProgress] = useState(0);

  const updateScrollState = useCallback((scrollPosition: number) => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    const activationPoint = scrollPosition + window.innerHeight * 0.35;
    let nextSection = sections[0]?.dataset.section ?? 'about';

    for (const section of sections) {
      if (section.offsetTop > activationPoint) break;
      nextSection = section.dataset.section ?? nextSection;
    }

    setActiveSection(nextSection);

    const range = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(range > 0 ? Math.min(1, Math.max(0, scrollPosition / range)) : 0);
  }, []);

  useSmoothScroll(reduced, updateScrollState);
  useSectionMotion(reduced);

  useEffect(() => {
    let frame = 0;

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateScrollState(window.scrollY);
      });
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [updateScrollState]);

  return (
    <>
      <Navigation activeSection={activeSection} progress={progress} />
      <main id="main" className="site-main">
        <Hero />
        <Portfolio />
        <Skills />
        <Timeline />
        <Music />
        <Contact />
      </main>
    </>
  );
}

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}
