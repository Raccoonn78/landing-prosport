// Фотографии подключаются автоматически из src/assets/photos/ — туда их кладёт
// скрипт сжатия (npm run photos) из исходников в папке photos/.
// Добавили или заменили файл в photos/<раздел>/ → запустили скрипт → фото на сайте.

import manifest from '../assets/photos/manifest.json';
import type { BeltColor } from './content';

export type Photo = {
  /** Ключ вида "gallery/life/01" */
  key: string;
  src: string;
  /** Уменьшенная копия (для превью и телефонов), если она есть */
  srcSm?: string;
  width: number;
  height: number;
};

const files = import.meta.glob('../assets/photos/**/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sizes = manifest as Record<string, { width: number; height: number }>;

const keyOf = (file: string) => file.replace('../assets/photos/', '').replace(/\.webp$/, '');

const all: Photo[] = Object.entries(files)
  .filter(([file]) => !file.endsWith('-sm.webp'))
  .map(([file, src]) => {
    const key = keyOf(file);
    const size = sizes[key] ?? { width: 0, height: 0 };
    return { key, src, srcSm: files[file.replace(/\.webp$/, '-sm.webp')], ...size };
  })
  .sort((a, b) => a.key.localeCompare(b.key, 'ru', { numeric: true }));

/** Все фото из папки (без подпапок), по имени файла. */
export const photosIn = (folder: string) =>
  all.filter((p) => p.key.startsWith(`${folder}/`) && !p.key.slice(folder.length + 1).includes('/'));

/** Одно фото по ключу, например photo('club/trainings'). */
export const photo = (key: string) => all.find((p) => p.key === key);

/** Зайчик Боб нужного пояса. */
export const bobPhoto = (belt: BeltColor) => photo(`bob/${belt}`);

/** srcset из двух размеров, если есть уменьшенная копия. */
export const srcSet = (p: Photo, smWidth = 560) =>
  p.srcSm ? `${p.srcSm} ${smWidth}w, ${p.src} ${p.width}w` : undefined;
