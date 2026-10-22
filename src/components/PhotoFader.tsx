import { useEffect, useState } from 'react';
import type { Photo } from '../data/photos';
import { srcSet } from '../data/photos';
import { usePrefersReducedMotion } from '../hooks/useScrollEffects';
import './PhotoFader.css';

type Props = {
  photos: Photo[];
  /** Интервал смены, мс */
  interval?: number;
  /** Задержка первой смены — чтобы соседние окна менялись не синхронно */
  offset?: number;
  sizes?: string;
  className?: string;
};

/** Окно с плавно сменяющимися фотографиями. */
export function PhotoFader({ photos, interval = 6000, offset = 0, sizes = '50vw', className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || photos.length < 2) return;
    let timer = window.setTimeout(function tick() {
      setIndex((i) => (i + 1) % photos.length);
      timer = window.setTimeout(tick, interval);
    }, interval + offset);
    return () => window.clearTimeout(timer);
  }, [photos.length, interval, offset, reduced]);

  return (
    <div className={`fader ${className}`}>
      {photos.map((p, i) => (
        <img
          key={p.key}
          className={i === index ? 'is-active' : undefined}
          src={p.src}
          srcSet={srcSet(p)}
          sizes={sizes}
          alt=""
          width={p.width}
          height={p.height}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}
