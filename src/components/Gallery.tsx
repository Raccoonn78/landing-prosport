import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryTabs } from '../data/content';
import { photosIn, srcSet } from '../data/photos';
import { SectionHead } from './SectionHead';
import './Gallery.css';

type TabId = (typeof galleryTabs)[number]['id'];

const albums = Object.fromEntries(galleryTabs.map((t) => [t.id, photosIn(`gallery/${t.id}`)])) as Record<
  TabId,
  ReturnType<typeof photosIn>
>;

export function Gallery() {
  const [tab, setTab] = useState<TabId>(galleryTabs[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const photos = albums[tab];
  const tabLabel = galleryTabs.find((t) => t.id === tab)?.label ?? '';

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
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

  const current = open === null ? null : photos[open];

  return (
    <section className="section section--tint gallery" id="gallery">
      <div className="container">
        <SectionHead
          belt="blue"
          tag="Галерея"
          title="Жизнь клуба: тренировки, турниры, сборы"
          lead="Аттестации, соревнования, выездные сборы зимой и летом — и дружная команда, которая всегда поддержит."
        />

        <div className="gallery__tabs" role="tablist" aria-label="Альбомы" data-reveal>
          {galleryTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              <span>{albums[t.id].length}</span>
            </button>
          ))}
        </div>

        <div className="gallery__grid" role="tabpanel" aria-label={tabLabel} key={tab}>
          {photos.map((p, i) => (
            <button
              key={p.key}
              type="button"
              className="gallery__item"
              style={{ animationDelay: `${Math.min(i, 12) * 0.04}s` }}
              onClick={() => setOpen(i)}
              aria-label={`Открыть фото ${i + 1} из ${photos.length}`}
            >
              <img
                src={p.srcSm ?? p.src}
                alt=""
                width={p.width}
                height={p.height}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {current && open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${tabLabel}, фото ${open + 1}`} onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img
              key={current.key}
              src={current.src}
              srcSet={srcSet(current)}
              sizes="100vw"
              alt=""
              width={current.width}
              height={current.height}
            />
            <figcaption>
              {tabLabel} · {open + 1} / {photos.length}
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
