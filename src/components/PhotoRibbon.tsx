import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '../data/photos';
import { srcSet } from '../data/photos';
import { usePrefersReducedMotion } from '../hooks/useScrollEffects';
import './PhotoRibbon.css';

type Props = {
  photos: Photo[];
  /** Интервал автопрокрутки, мс */
  interval?: number;
  label: string;
};

/**
 * Лента фотографий: листается сама, свайпается пальцем, на активном кадре —
 * медленное «наплывание» камеры (эффект Кена Бёрнса).
 */
export function PhotoRibbon({ photos, interval = 5000, label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + photos.length) % photos.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
    },
    [photos.length, reduced],
  );

  // Активный кадр определяем по положению прокрутки — так работает и свайп
  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    if (paused || reduced || photos.length < 2) return;
    const id = window.setTimeout(() => go(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, interval, go, photos.length]);

  if (!photos.length) return null;

  return (
    <div
      className="ribbon"
      role="region"
      aria-roledescription="карусель"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 4000)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ribbon__track" ref={track} onScroll={onScroll}>
        {photos.map((p, i) => (
          <figure
            key={p.key}
            className={`ribbon__slide ${i === index ? 'is-active' : ''}`}
            aria-label={`${i + 1} из ${photos.length}`}
            aria-hidden={i !== index}
          >
            <img
              src={p.src}
              srcSet={srcSet(p, 760)}
              sizes="(max-width: 1020px) 100vw, 600px"
              alt=""
              width={p.width}
              height={p.height}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : undefined}
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <div className="ribbon__ui">
        <span className="ribbon__count">
          {String(index + 1).padStart(2, '0')} <span>/ {String(photos.length).padStart(2, '0')}</span>
        </span>
        <div className="ribbon__dots">
          {photos.map((p, i) => (
            <button
              key={p.key}
              type="button"
              className={i === index ? 'is-active' : undefined}
              aria-label={`Фото ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
            >
              {/* Полоска заполняется, пока идёт таймер автопрокрутки */}
              <span style={{ animationDuration: `${interval}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
            </button>
          ))}
        </div>
        <div className="ribbon__arrows">
          <button type="button" aria-label="Предыдущее фото" onClick={() => go(index - 1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Следующее фото" onClick={() => go(index + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
