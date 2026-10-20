import type { CSSProperties } from 'react';

/** Задержка появления блока с data-reveal, в секундах. */
export const delay = (seconds: number) => ({ '--reveal-delay': `${seconds}s` }) as CSSProperties;
