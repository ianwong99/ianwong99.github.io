import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'carbon-src',
  base: '/carbon/',
  publicDir: '../public',
  plugins: [react()],
  build: {
    outDir: '../carbon',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']
        }
      }
    }
  }
});
