import { photo } from '../data/photos';
import './Emblem.css';

type Props = {
  size?: number;
  /** dark — чёрная эмблема для светлого фона, light — белая для тёмного */
  tone?: 'dark' | 'light';
  spin?: boolean;
  className?: string;
};

const ring = photo('brand/emblem-ring');
const mark = photo('brand/emblem-mark');

/** Эмблема клуба из оригинальных файлов: кольцо с надписью + знак в центре. */
export function Emblem({ size = 48, tone = 'dark', spin = false, className = '' }: Props) {
  return (
    <span
      className={`emblem emblem--${tone} ${spin ? 'emblem--spin' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {ring && <img className="emblem__ring" src={ring.src} alt="" width={ring.width} height={ring.height} />}
      {mark && <img className="emblem__mark" src={mark.src} alt="" width={mark.width} height={mark.height} />}
    </span>
  );
}
