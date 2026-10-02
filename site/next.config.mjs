// The Zeldara home page. It is exported as plain static files (site/out), which build.mjs copies into dist/
// next to the game (/play) and the Design Lab (/lab) — so hosting stays "serve the dist folder".
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
export default {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  turbopack: { root: path.join(here, '..') },
};
