import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery } from '../data/content';
import { delay } from '../utils/reveal';
import { SectionHead } from './SectionHead';
import './Gallery.css';

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  return (
    <section className="section section--tint gallery" id="gallery">
      <div className="container">
        <SectionHead
          belt="red"
          tag="Галерея"
          title="Жизнь клуба: тренировки, турниры, сборы"
          lead="Аттестации, соревнования, выездные сборы зимой и летом — и дружная команда, которая всегда поддержит."
        />

        <div className="gallery__grid">
          {gallery.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={`gallery__item gallery__item--${i + 1}`}
              onClick={() => setOpen(i)}
              data-reveal
              style={delay(0.05 * i)}
            >
              <img src={item.src} alt={item.text} loading="lazy" />
              <span className="gallery__caption">
                <strong>{item.caption}</strong>
                <span>{item.text}</span>
              </span>
            </button>
          ))}

          <div className="gallery__quote" data-reveal style={delay(0.2)}>
            <p className="gallery__quote-num">1 = 2</p>
            <p>«1 неделя тренировок на сборах заменяет 2 месяца занятий в группе»</p>
          </div>

          <div className="gallery__cta" data-reveal style={delay(0.25)}>
            <p>Хотите увидеть всё своими глазами?</p>
            <span>Приходите на тренировку — познакомим с тренером и командой.</span>
            <a className="btn btn--sun" href="#signup">
              Записаться
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[open].caption} onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={gallery[open].src} alt={gallery[open].text} />
            <figcaption>
              <strong>{gallery[open].caption}</strong> — {gallery[open].text}
            </figcaption>
          </figure>
          <button type="button" className="lightbox__close" aria-label="Закрыть" onClick={close} autoFocus>
            <X size={24} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Предыдущее фото"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Следующее фото"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
