import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build strategy:
//   - Phaser is BUNDLED inline (no CDN). Earlier we tried externalizing it to
//     shrink the bundle, but the IIFE ends with `})(Phaser);` and any failure
//     to load the CDN script (offline, ad-blocker, network hiccup) made
//     `Phaser` undefined and the whole bundle crashed before drawing anything
//     — user got a blank black page. Self-contained > small.
//   - Output format is IIFE so the inlined <script> can run as a CLASSIC
//     script. ES modules require CORS headers and don't load from `file://`
//     in Chrome; the user opens game.html by double-clicking it.
//   - `inlineDynamicImports: true` collapses every chunk into the entry so
//     the post-build bundler in scripts/bundle-single-html.mjs only has one
//     <script> tag to inline.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'QozApp',
        inlineDynamicImports: true,
      },
    },
  },
});
