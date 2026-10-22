import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// В Docker на Windows/macOS изменения файлов через volume не всегда
// доходят до контейнера как события — включаем опрос файловой системы.
const usePolling = process.env.CHOKIDAR_USEPOLLING === 'true';

export default defineConfig({
  base: '/landing-prosport/', 
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: usePolling ? { usePolling: true, interval: 300 } : undefined,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
