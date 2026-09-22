import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 800,
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: true,
      },
      rollupOptions: {
        output: {
          // Stable hashed asset names for long-term Vercel CDN cache
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('motion')) return 'motion';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('react-dom') || id.includes('/react/')) return 'react';
            }
          },
        },
      },
    },
  };
});
