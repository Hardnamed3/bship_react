import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',   // or 'brotliCompress' for brotli compression
      ext: '.gz',          // The file extension for the compressed files
      threshold: 10240,    // Only compress files larger than 10kb
    }),
  ],
  base : './',
})
