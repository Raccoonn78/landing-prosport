import { useEffect, useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';
import type { BeltColor } from '../data/content';
import { club, mailto, nav } from '../data/content';
import { useScrollProgress } from '../hooks/useScrollEffects';
import { BeltKnot } from './BeltKnot';
import { Emblem } from './Emblem';
import './Header.css';

type Props = {
  /** Активный раздел страницы — для подсветки меню */
  active: string | null;
  /** Пояс активного раздела — в этот цвет перекрашивается полоска под шапкой */
  belt: BeltColor;
};

export function Header({ active, belt }: Props) {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
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
          <Emblem size={48} spin />
          <span className="header__logo-text">
            <strong>{club.name}</strong>
            <small>{club.motto}</small>
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
          <a className="btn btn--primary header__cta" href={mailto()}>
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

      {/* Пояс под шапкой: перекрашивается по разделам, узел едет по ходу прокрутки */}
      <div className={`belt-bar belt-bar--${belt}`} aria-hidden="true">
        <div className="belt-bar__band" />
        <div className="belt-bar__knot" style={{ left: `calc(${progress} * (100% - 40px))` }}>
          <BeltKnot color={belt} size={40} />
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container" aria-label="Мобильное меню">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary" href={mailto()}>
            <Mail size={18} />
            Записаться на тренировку
          </a>
          <p className="mobile-menu__note">
            Пишите нам: <a href={`mailto:${club.email}`}>{club.email}</a>
          </p>
        </nav>
      </div>
    </header>
  );
}
