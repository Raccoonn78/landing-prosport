import type { BeltColor } from '../data/content';

type Props = {
  color: BeltColor;
  size?: number;
  className?: string;
};

/** Завязанный пояс — сквозной мотив сайта: каждый раздел отмечен «своим» поясом. */
export function BeltKnot({ color, size = 40, className }: Props) {
  const isWhite = color === 'white';
  return (
    <svg
      className={className}
      width={size}
      height={(size * 40) / 64}
      viewBox="0 0 64 40"
      aria-hidden="true"
      style={{ color: `var(--belt-${color})` }}
    >
      <g
        fill="currentColor"
        stroke={isWhite ? 'var(--line-strong)' : 'none'}
        strokeWidth={isWhite ? 1.5 : 0}
        strokeLinejoin="round"
      >
        <rect x="2" y="12" width="60" height="10" rx="2.5" />
        <path d="M27.5 19 L18.5 37.5 L26 38.5 L32.5 23 Z" />
        <path d="M36.5 19 L45.5 37.5 L38 38.5 L31.5 23 Z" />
        <rect x="24.5" y="8.5" width="15" height="17" rx="3.5" />
      </g>
      <rect x="24.5" y="8.5" width="15" height="17" rx="3.5" fill="#000" opacity="0.1" />
    </svg>
  );
}
