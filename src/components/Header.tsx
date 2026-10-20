import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { club, nav } from '../data/content';
import { useActiveSection, useScrollProgress } from '../hooks/useScrollEffects';
import { Emblem } from './Emblem';
import './Header.css';

const sectionIds = nav.map((item) => item.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const active = useActiveSection(sectionIds);
  const scrolled = progress > 0.005;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="header__bar container">
        <a className="header__logo" href="#top" onClick={() => setOpen(false)} aria-label="ПРОСПОРТ — на главную">
          <Emblem size={44} />
          <span className="header__logo-text">
            <strong>{club.name}</strong>
            <small>клуб тхэквон-до</small>
          </span>
        </a>

        <nav className="header__nav" aria-label="Основное меню">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={club.phoneHref}>
            <Phone size={18} />
            <span>{club.phone}</span>
          </a>
          <a className="btn btn--primary header__cta" href="#signup" onClick={() => setOpen(false)}>
            Записаться
          </a>
          <button
            className="header__burger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Полоса прогресса в виде пояса: от белого к чёрному по мере прокрутки */}
      <div className="belt-progress" aria-hidden="true">
        <div className="belt-progress__fill" style={{ clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }} />
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container" aria-label="Мобильное меню">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary" href="#signup" onClick={() => setOpen(false)}>
            Записаться на тренировку
          </a>
          <a className="btn btn--ghost" href={club.phoneHref}>
            <Phone size={18} /> {club.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
