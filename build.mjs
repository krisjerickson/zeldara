#!/usr/bin/env node
// Zeldara build: src/ + assets/ -> index.html (one self-contained file, opens from file://).
//
//   node build.mjs            build index.html (JS minified with esbuild if it is installed:
//                             npm install — see package.json; otherwise unminified + a warning)
//   node build.mjs --dev      build unminified (readable JS in index.html / the Lab)
//   node build.mjs --check    build and verify every inline script parses
//
// Source layout
//   src/index.template.html   page shell with {{CSS}} {{BODY}} {{JS}} {{BODY_END}}
//   src/styles.css            all CSS
//   src/body.html, body-end.html   DOM (HUD, modals, panels)
//   src/js/NN-*.js            classic (non-module) scripts, concatenated in filename order.
//                             They share one global scope exactly as the old single file did.
//   assets/manifest.json      hero sprite arrays -> generated as src/js/01-sprite-data.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

// Minify (perf round): whitespace + syntax only, in SCRIPT mode — no identifier renaming at all, so
// top-level names, function/class names, stack traces and Function#toString (05c builds its worker
// from vnoise/_wpField source) are untouched. Full identifier renaming saves only ~2% more gzip.
const DEV = process.argv.includes('--dev');
let esbuild = null;
if (!DEV) {
  try { esbuild = await import('esbuild'); }
  catch (e) { console.warn('! esbuild not installed (npm install) — building unminified'); }
}
const minify = (code, label) => {
  if (!esbuild) return code;
  const t = Date.now();
  let out;
  try { out = esbuild.transformSync(code, { minifyWhitespace: true, minifySyntax: true, target: 'esnext', charset: 'utf8', legalComments: 'none' }).code; }
  catch (e) { console.warn('! esbuild failed (' + String(e.message).split('\n')[0] + ') — building unminified'); esbuild = null; return code; }
  console.log(`  minified ${label}: ${(code.length / 1024).toFixed(0)} KB → ${(out.length / 1024).toFixed(0)} KB (${Date.now() - t} ms)`);
  return out;
};

// 1. Generate sprite data from assets (base64-inlined so file:// keeps working)
const manifest = JSON.parse(r('assets/manifest.json'));
let sprite = '';
for (const b of manifest.blocks) {
  if (b.type === 'raw') { sprite += b.text + '\n'; continue; }
  sprite += `const ${b.name}=[\n`;
  for (const f of b.files) {
    const data = fs.readFileSync(path.join(ROOT, 'assets', f.file)).toString('base64');
    sprite += `  "data:${f.mime};base64,${data}",\n`;
  }
  sprite += '];\n';
}
fs.writeFileSync(path.join(ROOT, 'src/js/01-sprite-data.js'),
  sprite);

// 2. Concatenate JS in filename order
const jsDir = path.join(ROOT, 'src/js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).sort();
const js = minify(jsFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join(''), 'game JS');

// 3. Fill the template (function replacers so `$` in code is never special)
const out = r('src/index.template.html')
  .replace('{{CSS}}', () => r('src/styles.css'))
  .replace('{{BODY}}', () => r('src/body.html'))
  .replace('{{JS}}', () => js)
  .replace('{{BODY_END}}', () => r('src/body-end.html'));

if (/<\/script>/i.test(js)) {
  // A literal </script> inside JS would end the inline block early.
  const bad = js.split('\n').findIndex(l => /<\/script>/i.test(l));
  throw new Error('Literal </script> in JS at combined line ' + (bad + 1) + ' — escape it as <\\/script>');
}

if (process.argv.includes('--check')) {
  const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
  let m, n = 0;
  while ((m = re.exec(out))) { new Function(m[1]); n++; }
  console.log(`✓ ${n} inline script(s) parse`);
}

fs.writeFileSync(path.join(ROOT, 'index.html'), out);
console.log(`✓ index.html  ${(out.length / 1024).toFixed(0)} KB  from ${jsFiles.length} JS files`);

// ── Design Lab (Phase 2): lab/src → lab/index.html (+ lab/lab.artifact.html for publishing)
// Reuses the game's hero sprites + hero API so the lab walks with the real hero.
if (fs.existsSync(path.join(ROOT, 'lab/src/lab.template.html'))) {
  // 03-data (items, monsters, spells) + 09b (boss phases) feed the Bosses / Mage Towers tabs;
  // the Lab has no monster engine, so 09b gets a stub MX to hang its helpers on.
  const sharedFiles = ['00-header.js', '01-sprite-data.js', '02-hero-api.js', '03-data.js']
    .concat(jsFiles.filter(f => /^07/.test(f)));
  const shared = sharedFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('')
    + '\nif(typeof MX==="undefined"){ var MX={KITS:(typeof MON_KIT_SRC!=="undefined"?MON_KIT_SRC:{})}; }'
    + '\nif(typeof MON_BY_ID==="undefined"){ var MON_BY_ID={}; (typeof MON_ROSTER!=="undefined"?MON_ROSTER:[]).forEach(function(R){ MON_BY_ID[R.id]=R; }); }\n'
    + fs.readFileSync(path.join(jsDir, '09b-boss-phases.js'), 'utf8');
  const labDir = path.join(ROOT, 'lab/src/js');
  const labFiles = fs.readdirSync(labDir).filter(f => f.endsWith('.js')).sort();
  const labJs = minify(shared + labFiles.map(f => fs.readFileSync(path.join(labDir, f), 'utf8')).join(''), 'lab JS');
  if (/<\/script>/i.test(labJs)) throw new Error('Literal </script> in lab JS');
  const lab = r('lab/src/lab.template.html').replace('{{JS}}', () => labJs);
  if (process.argv.includes('--check')) {
    const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g; let m;
    while ((m = re.exec(lab))) new Function(m[1]);
  }
  fs.writeFileSync(path.join(ROOT, 'lab/index.html'), lab);
  // Artifact variant: no doctype/html/head/body wrappers (the host adds them)
  const title = lab.match(/<title>[\s\S]*?<\/title>/)[0];
  const head = lab.slice(lab.indexOf('</title>') + 8, lab.indexOf('</head>'));
  const body = lab.slice(lab.indexOf('<body>') + 6, lab.lastIndexOf('</body>'));
  fs.writeFileSync(path.join(ROOT, 'lab/lab.artifact.html'), title + head.replace(/<meta[^>]*>\s*/g, '') + body);
  console.log(`✓ lab/index.html  ${(lab.length / 1024).toFixed(0)} KB  from ${labFiles.length} lab files`);
}

// ── Hosting: dist/ = what gets deployed — the home page at /, the game at /play, the Design Lab at /lab
// (vercel.json: buildCommand "npm run build", outputDirectory "dist")
{
  const { spawnSync } = await import('node:child_process');
  const D = (...a) => path.join(ROOT, ...a);
  const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const e of fs.readdirSync(from, { withFileTypes: true })) { const a = path.join(from, e.name), b = path.join(to, e.name); if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b); } };
  try { fs.rmSync(D('dist'), { recursive: true, force: true }); } catch (e) { /* folder where deleting is not allowed: the files below are overwritten in place */ }
  fs.mkdirSync(D('dist', 'lab'), { recursive: true }); fs.mkdirSync(D('dist', 'play'), { recursive: true });
  fs.copyFileSync(D('index.html'), D('dist', 'play', 'index.html'));
  if (fs.existsSync(D('lab/index.html'))) fs.copyFileSync(D('lab/index.html'), D('dist', 'lab', 'index.html'));
  // the home page (Next.js, site/): it paints the brand with the game's own brand code
  let home = false;
  if (fs.existsSync(D('site', 'app'))) {
    const brand = jsFiles.filter(f => /^07z[yz]-brand/.test(f)).map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('\n');
    fs.mkdirSync(D('site', 'public'), { recursive: true });
    fs.writeFileSync(D('site', 'public', 'brand.js'), minify(brand, 'brand JS (home page)'));
    const nextBin = D('node_modules', 'next', 'dist', 'bin', 'next');
    if (fs.existsSync(nextBin)) {
      const r = spawnSync(process.execPath, [nextBin, 'build', 'site'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } });
      if (r.status === 0 && fs.existsSync(D('site', 'out', 'index.html'))) { copyDir(D('site', 'out'), D('dist')); home = true; }
      else console.log('! home page build failed — using the plain fallback page\n' + String(r.stderr || '').split('\n').slice(-12).join('\n'));
    } else console.log('! next not installed (npm install) — using the plain fallback page for /');
  }
  if (!home) fs.writeFileSync(D('dist', 'index.html'), '<!doctype html><meta charset="utf-8"><title>Zeldara</title><meta http-equiv="refresh" content="0;url=/play"><body style="background:#000;color:#63f2dc;font-family:sans-serif"><p style="padding:2em">Zeldara — <a style="color:#63f2dc" href="/play">play</a></p>');
  console.log('✓ dist/ ready for hosting: ' + (home ? 'home page (Next.js) at /' : 'fallback page at /') + ', game at /play, Lab at /lab');
}
