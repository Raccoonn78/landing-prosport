// Сжатие фотографий для сайта (аналог TinyJPG / TinyPNG).
//
// Исходники лежат в папке photos/ (по разделам сайта), готовые сжатые WebP
// складываются в src/assets/photos/ — их и подключает сайт.
// Запуск: npm run photos  (или в Docker: docker compose run --rm photos)
//
// Чтобы заменить фото, положите новый файл в нужную папку photos/<раздел>/
// и запустите скрипт ещё раз — сайт подхватит его автоматически.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'photos';
const OUT = 'src/assets/photos';
const INPUT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

// Настройки по разделам: максимальный размер и качество.
// small — уменьшенная копия для превью и телефонов.
const presets = {
  hero: { width: 1600, quality: 74, small: { width: 760, quality: 72 } },
  about: { width: 1000, quality: 74, small: { width: 560, quality: 70 } },
  'gallery/life': { width: 1280, quality: 74, small: { width: 480, quality: 64 } },
  'gallery/fun': { width: 1280, quality: 74, small: { width: 480, quality: 64 } },
  club: { width: 900, quality: 76 },
  coaches: { width: 600, quality: 82 },
  bob: { height: 520, quality: 86, alphaQuality: 90, small: { height: 240, quality: 86, alphaQuality: 90 } },
  brand: { width: 420, quality: 90, alphaQuality: 95 },
};

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} КБ`;

async function listImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && INPUT.test(e.name)).map((e) => e.name).sort();
  } catch {
    return [];
  }
}

async function encode(input, output, { width, height, quality, alphaQuality = 100 }, sourceSize = Infinity) {
  const render = (q) =>
    sharp(input)
      .rotate() // учитываем EXIF-ориентацию с телефона
      .resize({ width, height, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: q, alphaQuality, effort: 6, smartSubsample: true })
      .toFile(output);

  // Если исходник уже был хорошо сжат, понижаем качество ступенями,
  // пока файл не станет заметно легче оригинала (но не ниже 60).
  let q = quality;
  let info = await render(q);
  while (info.size > sourceSize * 0.85 && q > 60) {
    q -= 6;
    info = await render(q);
  }
  return info;
}

const manifest = {};
let before = 0;
let after = 0;

await fs.rm(OUT, { recursive: true, force: true });

for (const [section, preset] of Object.entries(presets)) {
  const srcDir = path.join(SRC, section);
  const outDir = path.join(OUT, section);
  const files = await listImages(srcDir);
  if (!files.length) continue;
  await fs.mkdir(outDir, { recursive: true });

  for (const file of files) {
    const name = path.parse(file).name;
    const input = path.join(srcDir, file);
    const size = (await fs.stat(input)).size;

    // Уже сжатые WebP не пережимаем сильнее — только приводим к размеру
    const sourceSize = /\.webp$/i.test(file) ? Infinity : size;
    const main = await encode(input, path.join(outDir, `${name}.webp`), preset, sourceSize);
    let total = main.size;
    if (preset.small) {
      const small = await encode(input, path.join(outDir, `${name}-sm.webp`), preset.small);
      total += small.size;
    }

    manifest[`${section}/${name}`] = { width: main.width, height: main.height };
    before += size;
    after += main.size;
    console.log(`${section}/${file}: ${kb(size)} → ${kb(main.size)}${preset.small ? ` (+ превью, всего ${kb(total)})` : ''}`);
  }
}

await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

// Картинка для превью ссылки в соцсетях и мессенджерах — первое фото первого экрана
const [ogSource] = await listImages(path.join(SRC, 'hero'));
if (ogSource) {
  await sharp(path.join(SRC, 'hero', ogSource))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile('public/og-image.jpg');
  console.log(`og-image.jpg ← hero/${ogSource}`);
}
console.log(`\nГотово: ${Object.keys(manifest).length} фото, ${kb(before)} → ${kb(after)} (−${Math.round((1 - after / before) * 100)}%)`);
