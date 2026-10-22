import type { BeltColor } from '../data/content';

type Props = {
  color: BeltColor;
  size?: number;
  className?: string;
};

/** Завязанный пояс — сквозной мотив сайта: каждый раздел отмечен «своим» поясом. */
export function BeltKnot({ color, size = 40, className }: Props) {
  const isWhite = color === 'white' || color === 'white-orange';
  const fill = isWhite ? 'var(--belt-white)' : `var(--belt-${color})`;
  return (
    <svg className={className} width={size} height={(size * 40) / 64} viewBox="0 0 64 40" aria-hidden="true">
      <g
        fill={fill}
        stroke={isWhite ? 'var(--line-strong)' : 'none'}
        strokeWidth={isWhite ? 1.5 : 0}
        strokeLinejoin="round"
      >
        <rect x="2" y="12" width="60" height="10" rx="2.5" />
        <path d="M27.5 19 L18.5 37.5 L26 38.5 L32.5 23 Z" />
        <path d="M36.5 19 L45.5 37.5 L38 38.5 L31.5 23 Z" />
        <rect x="24.5" y="8.5" width="15" height="17" rx="3.5" />
      </g>
      {/* Белый пояс с оранжевой полоской */}
      {color === 'white-orange' && (
        <g fill="var(--belt-orange)">
          <rect x="3" y="15.5" width="21" height="3" />
          <rect x="40" y="15.5" width="21" height="3" />
          <path d="M24.2 26.6 L21.4 32.6 L23.8 32.9 L26.4 27.2 Z" />
          <path d="M39.8 26.6 L42.6 32.6 L40.2 32.9 L37.6 27.2 Z" />
        </g>
      )}
      <rect x="24.5" y="8.5" width="15" height="17" rx="3.5" fill="#000" opacity="0.1" />
    </svg>
  );
}
