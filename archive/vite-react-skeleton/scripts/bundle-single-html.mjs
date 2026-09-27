// ─── bundle-single-html (V4) ──────────────────────────────────────────────────
// Post-build step: collapses Vite's multi-file dist/ output (index.html + the
// per-hash assets/*.js + assets/*.css) into a single self-contained
// dist/game.html.
//
// Vite is configured (see vite.config.js) to:
//   1. Mark Phaser as external — loaded from CDN via a <script> tag in
//      index.html, kept intact in the bundled game.html.
//   2. Emit the app code as an IIFE (rollup output.format='iife') so the
//      inlined <script> can run as a CLASSIC script. ES modules require CORS
//      headers and don't load from `file://` in Chrome — but the user opens
//      game.html by double-clicking it, so we need a non-module script.
//
// This script therefore:
//   - Inlines every local <script src="./assets/*.js"> as a classic <script>
//     (stripping `type="module"` and `crossorigin` if present).
//   - Inlines every <link rel="stylesheet"> (the IIFE bundle injects styles
//     at runtime, so usually nothing to inline — kept for safety).
//   - LEAVES the CDN <script src="https://..."> tag untouched.
//
// Run with: node scripts/bundle-single-html.mjs   (after `npm run build`)
// Or one-shot: `npm run build:html`.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

function log(msg) { process.stdout.write(`[bundle] ${msg}\n`); }
function die(msg) { process.stderr.write(`[bundle] ❌ ${msg}\n`); process.exit(1); }

if (!existsSync(DIST_DIR)) die('dist/ does not exist — run `npm run build` first.');

const htmlPath = join(DIST_DIR, 'index.html');
if (!existsSync(htmlPath)) die('dist/index.html missing — vite build did not finish.');

let html = readFileSync(htmlPath, 'utf8');

// Inline LOCAL scripts (assets/*.js) and MOVE them to the end of <body>.
// Vite's default emits <script type="module"> in <head>, which is fine
// because modules are deferred. We strip type="module" so the script becomes
// a CLASSIC script (works from file://) — but classic scripts in <head>
// run BEFORE the body parses, so `document.getElementById("root")` returns
// null and React's createRoot throws (#299). Moving the inline script to
// just before </body> ensures the DOM is parsed first.
//
// Replacer is a function (not a string) so $&/$1 inside the bundle aren't
// expanded as String.replace special patterns.
const scriptRe = /<script[^>]*\ssrc=["']\.?\/?(assets\/[^"']+\.js)["'][^>]*><\/script>/g;
const inlinedScripts = [];
const collectedTags = [];
html = html.replace(scriptRe, (_match, relPath) => {
  const abs = join(DIST_DIR, relPath);
  if (!existsSync(abs)) {
    log(`⚠️  script not found, leaving tag in place: ${relPath}`);
    return _match;
  }
  const js = readFileSync(abs, 'utf8').replace(/<\/script>/gi, '<\\/script>');
  inlinedScripts.push({ relPath, bytes: js.length });
  collectedTags.push(`<script>\n${js}\n</script>`);
  return ''; // strip from current location (typically <head>)
});

// Re-emit collected scripts immediately before </body>.
if (collectedTags.length) {
  const closing = '</body>';
  const idx = html.lastIndexOf(closing);
  if (idx === -1) die('No </body> tag found in index.html');
  html = html.slice(0, idx) + collectedTags.join('\n') + '\n' + html.slice(idx);
}

// Inline any <link rel="stylesheet"> from the assets dir. With the current
// IIFE config CSS is bundled into the JS, so this typically matches nothing.
const cssRe = /<link[^>]*\srel=["']stylesheet["'][^>]*\shref=["']\.?\/?(assets\/[^"']+\.css)["'][^>]*\/?>/g;
const inlinedCss = [];
html = html.replace(cssRe, (_match, relPath) => {
  const abs = join(DIST_DIR, relPath);
  if (!existsSync(abs)) {
    log(`⚠️  stylesheet not found, leaving link in place: ${relPath}`);
    return _match;
  }
  const css = readFileSync(abs, 'utf8');
  inlinedCss.push({ relPath, bytes: css.length });
  return `<style>\n${css}\n</style>`;
});

const outPath = join(DIST_DIR, 'game.html');
writeFileSync(outPath, html, 'utf8');

const sizeKB = (html.length / 1024).toFixed(0);
log(`✅ Wrote dist/game.html (${sizeKB} KB)`);
log(`   Inlined ${inlinedScripts.length} script(s), ${inlinedCss.length} stylesheet(s).`);
log(`   Phaser CDN <script> tag preserved — game.html requires internet at first load.`);
