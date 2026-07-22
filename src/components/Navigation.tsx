import { useEffect, useRef, useState } from 'react';
import { navigation } from '../data/site';

type Props = { activeSection: string; progress: number };

export function Navigation({ activeSection, progress }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const close = () => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  return (
    <>
      <aside className="index-rail" aria-label="Portfolio sections">
        <a href="#about" className="index-rail__brand" aria-label="Joe Browne, back to top">
          JB
        </a>
        <nav className="index-rail__nav">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={activeSection === item.id ? 'is-active' : undefined}
              aria-current={activeSection === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="index-rail__meter" aria-hidden="true">
          <span style={{ transform: `scaleY(${progress})` }} />
        </div>
        <span className="index-rail__place">SALFORD / 53.48°N</span>
      </aside>

      <header className="mobile-bar">
        <a href="#about" className="mobile-bar__brand">
          JB
        </a>
        <span>{navigation.find((item) => item.id === activeSection)?.label ?? 'About'}</span>
        <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">
          Index
        </button>
      </header>

      <dialog ref={dialogRef} className="mobile-menu" onClose={() => setOpen(false)}>
        <div className="mobile-menu__top">
          <span>Joe Browne / index</span>
          <button type="button" onClick={close} aria-label="Close section menu">
            Close
          </button>
        </div>
        <nav>
          {navigation.map((item) => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={activeSection === item.id ? 'is-active' : undefined}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={close}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}
