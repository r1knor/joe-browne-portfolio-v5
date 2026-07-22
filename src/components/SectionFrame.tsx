import type { ReactNode } from 'react';
import { AnimatedTitle } from './AnimatedTitle';

type Props = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ id, number, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`section-frame ${className}`} data-section={id}>
      <span className="section-frame__ghost" aria-hidden="true">{number}</span>
      <header className="section-frame__head" data-reveal>
        <AnimatedTitle>{title}</AnimatedTitle>
      </header>
      {children}
    </section>
  );
}