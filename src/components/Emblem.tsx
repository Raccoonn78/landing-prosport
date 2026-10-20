import './Emblem.css';

type Props = {
  size?: number;
  /** dark — чёрная эмблема для светлого фона, light — белая для тёмного */
  tone?: 'dark' | 'light';
  spin?: boolean;
  className?: string;
};

/** Эмблема клуба из оригинальных файлов: кольцо с надписью + знак в центре. */
export function Emblem({ size = 48, tone = 'dark', spin = false, className = '' }: Props) {
  return (
    <span
      className={`emblem emblem--${tone} ${spin ? 'emblem--spin' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img className="emblem__ring" src="/images/brand/emblem-ring.webp" alt="" width={420} height={420} />
      <img className="emblem__mark" src="/images/brand/emblem-mark.webp" alt="" width={176} height={176} />
    </span>
  );
}
