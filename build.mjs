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
// painted-sprite atlases (assets/atlas/, made by tools/sprites/intake.py --atlas): the index goes into the page, the pages are files beside it
let atlasMeta = '{"pages":{},"chars":{},"frames":{}}'; try { atlasMeta = fs.readFileSync(path.join(ROOT, 'assets/atlas/index.json'), 'utf8').trim(); JSON.parse(atlasMeta); } catch (e) { atlasMeta = '{"pages":{},"chars":{},"frames":{}}'; }
let scnMeta = '{"pages":[],"items":{},"tex":{}}'; try { scnMeta = fs.readFileSync(path.join(ROOT, 'assets/scenery/index.json'), 'utf8'); } catch (e) {}   // painted scenery (round 30)
const js = 'var ZATLAS_META=' + atlasMeta + ';\nvar ZSCN_META=' + scnMeta + ';\n' + minify(jsFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join(''), 'game JS');

// Engine switch (round 18): Phaser 3.60 is the default. `node build.mjs --engine=4` (or ZELDARA_ENGINE=4)
// makes Phaser 4 the default; any built page also accepts ?engine=3 or ?engine=4 in its address.
const ENGINES = { '3': 'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js', '4': 'https://cdn.jsdelivr.net/npm/phaser@4.2.1/dist/phaser.min.js' };
const ENGINE_ARG = (process.argv.find(a => a.startsWith('--engine=')) || '').split('=')[1] || process.env.ZELDARA_ENGINE || '3';
if (!ENGINES[ENGINE_ARG]) throw new Error('Unknown engine "' + ENGINE_ARG + '" (use 3 or 4)');
const engineLoader = def => `<script>(function(){var m=/[?&]engine=([34])(?![0-9])/.exec(location.search),v=m?m[1]:(window.ZELDARA_ENGINE||'${def}');window.ZELDARA_ENGINE=v;document.write('<script src="'+(v==='4'?'${ENGINES['4']}':'${ENGINES['3']}')+'"><\\/script>');})();</script>`;
const engineStatic = def => `<script src="${ENGINES[def]}"></script>`;   // artifact pages: no document.write
const withEngine = (html, def, fixed) => html.replace('{{ENGINE}}', () => fixed ? engineStatic(def) : engineLoader(def));   // html still holds the {{ENGINE}} marker

// 3. Fill the template (function replacers so `$` in code is never special)
const outRaw = r('src/index.template.html')
  .replace('{{CSS}}', () => r('src/styles.css'))
  .replace('{{BODY}}', () => r('src/body.html'))
  .replace('{{JS}}', () => js)
  .replace('{{BODY_END}}', () => r('src/body-end.html'));
const out = withEngine(outRaw, ENGINE_ARG, false);

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
// Artifact variant of the game (published to claude.ai): head without <meta>, body, fixed engine tag
{ const oa = withEngine(outRaw, ENGINE_ARG, true), t = oa.match(/<title>[\s\S]*?<\/title>/)[0];
  fs.writeFileSync(path.join(ROOT, 'zeldara.artifact.html'), t + oa.slice(oa.indexOf('</title>') + 8, oa.indexOf('</head>')).replace(/<meta[^>]*>\s*/g, '') + oa.slice(oa.indexOf('<body>') + 6, oa.lastIndexOf('</body>'))); }
console.log(`✓ index.html  ${(out.length / 1024).toFixed(0)} KB  from ${jsFiles.length} JS files`);

// ── Design Lab (Phase 2): lab/src → lab/index.html (+ lab/lab.artifact.html for publishing)
// Reuses the game's hero sprites + hero API so the lab walks with the real hero.
if (fs.existsSync(path.join(ROOT, 'lab/src/lab.template.html'))) {
  // 03-data (items, monsters, spells) + 09b (boss phases) feed the Bosses / Mage Towers tabs;
  // the Lab has no monster engine, so 09b gets a stub MX to hang its helpers on.
  const sharedFiles = ['00-header.js', '00a-engine.js', '01-sprite-data.js', '02-hero-api.js', '03-data.js']
    .concat(jsFiles.filter(f => /^07/.test(f)));
  const shared = sharedFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('')
    + '\nif(typeof MX==="undefined"){ var MX={KITS:(typeof MON_KIT_SRC!=="undefined"?MON_KIT_SRC:{})}; }'
    + '\nif(typeof MON_BY_ID==="undefined"){ var MON_BY_ID={}; (typeof MON_ROSTER!=="undefined"?MON_ROSTER:[]).forEach(function(R){ MON_BY_ID[R.id]=R; }); }\n'
    + fs.readFileSync(path.join(jsDir, '09b-boss-phases.js'), 'utf8');
  const labDir = path.join(ROOT, 'lab/src/js');
  const labFiles = fs.readdirSync(labDir).filter(f => f.endsWith('.js')).sort();
  // which sprite sheets have arrived (sprites/incoming/<request id>.png) — shown as "received" in the Sprite Library tab
  let incoming = []; try { incoming = fs.readdirSync(path.join(ROOT, 'sprites/incoming')).filter(f => /\.png$/i.test(f)).map(f => f.replace(/\.png$/i, '')); } catch (e) {}
  // previews made by tools/sprites/intake.py: frame strips packed into pages per wave (sprites/preview/w*.webp + index.json).
  // The index goes into the Lab's code; the pages are copied next to the Lab (lab/preview/) and loaded from there.
  let previews = {}; try { previews = JSON.parse(r('sprites/preview/index.json')); for (const id of Object.keys(previews)) if (!incoming.includes(id)) incoming.push(id);
    fs.mkdirSync(path.join(ROOT, 'lab/preview'), { recursive: true }); for (const f of fs.readdirSync(path.join(ROOT, 'sprites/preview')).filter(f => /\.webp$/.test(f))) fs.copyFileSync(path.join(ROOT, 'sprites/preview', f), path.join(ROOT, 'lab/preview', f)); } catch (e) {}
  const labJs = minify(shared + 'var ZSPR_INCOMING=' + JSON.stringify(incoming) + ', ZSPR_PREVIEW=' + JSON.stringify(previews) + ';\n' + labFiles.map(f => fs.readFileSync(path.join(labDir, f), 'utf8')).join(''), 'lab JS');
  if (/<\/script>/i.test(labJs)) throw new Error('Literal </script> in lab JS');
  const labRaw = r('lab/src/lab.template.html').replace('{{JS}}', () => labJs), lab = withEngine(labRaw, ENGINE_ARG, false);
  if (process.argv.includes('--check')) {
    const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g; let m;
    while ((m = re.exec(lab))) new Function(m[1]);
  }
  fs.writeFileSync(path.join(ROOT, 'lab/index.html'), lab);
  // Artifact variant: no doctype/html/head/body wrappers (the host adds them)
  const title = labRaw.match(/<title>[\s\S]*?<\/title>/)[0];
  const head = labRaw.slice(labRaw.indexOf('</title>') + 8, labRaw.indexOf('</head>'));
  const body = labRaw.slice(labRaw.indexOf('<body>') + 6, labRaw.lastIndexOf('</body>'));
  fs.writeFileSync(path.join(ROOT, 'lab/lab.artifact.html'), withEngine(title + head.replace(/<meta[^>]*>\s*/g, '') + body, ENGINE_ARG, true));
  console.log(`✓ lab/index.html  ${(lab.length / 1024).toFixed(0)} KB  from ${labFiles.length} lab files`);
}

// ── Sprite library (round 18): run the manifest (src/js/07zs-sprites.js) without a browser and write every
// ChatGPT request to sprites/requests/ — requests.json for the feeding script, one .md per wave to read or paste, survey.md.
try {
  const vm = await import('node:vm');
  const files = ['00-header.js', '03-data.js'].concat(jsFiles.filter(f => /^07/.test(f)), ['09b-boss-phases.js']);
  const parts = files.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8'));
  const pre = parts.slice(0, -1).join('\n') + '\nvar MX={KITS:(typeof MON_KIT_SRC!=="undefined"?MON_KIT_SRC:{})}; var MON_BY_ID={}; MON_ROSTER.forEach(function(R){ MON_BY_ID[R.id]=R; });\n' + parts[parts.length - 1];
  const stub = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : stub), apply: () => stub, construct: () => stub });
  const ctx = { console, document: stub, navigator: { userAgent: '' }, localStorage: { getItem() { return null; }, setItem() {} }, Phaser: stub, performance: { now: () => 0 }, Image: stub, requestAnimationFrame() {}, setTimeout, clearTimeout, location: { search: '', href: '' } };
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.runInNewContext(pre + '\n;globalThis.__spr=JSON.stringify({stats:ZSPR.stats(),req:ZSPR.requests(),waves:ZSPR.WAVES,pilot:ZSPR.PILOT,style:ZSPR.STYLE,rules:ZSPR.RULES,bgAlpha:ZSPR.BG_ALPHA,bgKey:ZSPR.bgKey("{KEY}"),chars:ZSPR.all().map(function(e){ return {id:e.id,group:e.group,sub:e.sub,name:e.name,q:e.q,facings:e.facings,scale:e.scale,kit:e.kit||"",anims:e.anims.map(function(a){ return a.label+" ×"+a.n+(a.why?" ("+a.why+")":""); }),sheets:e.sheets.map(function(s){ return s.id; })}; })});', ctx, { timeout: 120000 });
  const S = JSON.parse(ctx.__spr), out = path.join(ROOT, 'sprites', 'requests');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'requests.json'), JSON.stringify({ made: 'build.mjs from src/js/07zs-sprites.js — do not edit by hand', how: 'full request text = body + style + rules + (bgAlpha for the API, or bgKey with {KEY} = the request key colour when pasting by hand)', stats: S.stats, pilot: S.pilot, waves: S.waves, style: S.style, rules: S.rules, bgAlpha: S.bgAlpha, bgKey: S.bgKey, requests: S.req }, null, 0));
  const byWave = {}; S.req.forEach(q => (byWave[q.wave] = byWave[q.wave] || []).push(q));
  for (const w of Object.keys(byWave)) {
    const name = 'wave-' + String(w).replace('.', '_') + '-' + String(S.waves[w] || 'other').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md';
    fs.writeFileSync(path.join(out, name), '# ' + (S.waves[w] || 'Wave ' + w) + ' — ' + byWave[w].length + ' requests\n\nSave each result as `sprites/incoming/<request id>.png`.\n\n' +
      byWave[w].map(q => '## ' + q.id + '\n\n' + q.name + ' · ' + q.title + ' · ' + q.poses.length + ' poses, ' + q.cols + ' × ' + q.rows + ' · ' + q.size + ' · ' + q.tier + '\n\nAttach: ' + q.refs.join(', ') + '\n\n```\n' + q.body + '\n' + S.style + '\n' + S.rules + '\n' + S.bgKey.replace('{KEY}', q.key) + '\n```\n').join('\n'));
  }
  fs.writeFileSync(path.join(out, 'survey.md'), '# Character survey — ' + S.stats.chars + ' characters, ' + S.stats.sheets + ' sheets (' + S.stats.core + ' core), ' + S.stats.poses + ' poses\n\nMade by build.mjs from the game data. Kit modules with no animation mapping: ' + (S.stats.unknown.length ? S.stats.unknown.join('; ') : 'none') + '.\n\n| Group | Characters | Sheets | Core sheets | Poses |\n|---|---|---|---|---|\n' +
    Object.keys(S.stats.byGroup).map(g => '| ' + g + ' | ' + S.stats.byGroup[g].chars + ' | ' + S.stats.byGroup[g].sheets + ' | ' + S.stats.byGroup[g].core + ' | ' + S.stats.byGroup[g].poses + ' |').join('\n') +
    '\n\n| Id | Name | Group | Facings | Moves it must show | Sheets |\n|---|---|---|---|---|---|\n' + S.chars.map(c => '| ' + c.id + ' | ' + c.name.replace(/\|/g, '/') + ' | ' + c.sub + ' | ' + c.facings.join(' ') + ' | ' + c.anims.join('; ').replace(/\|/g, '/') + ' | ' + c.sheets.length + ' |').join('\n') + '\n');
  if (S.stats.unknown.length) console.warn('! sprite manifest: kit modules without an animation: ' + S.stats.unknown.join('; '));
  console.log(`✓ sprites/requests/  ${S.stats.chars} characters, ${S.stats.sheets} sheets (${S.stats.core} core)`);
} catch (e) { console.warn('! sprite requests not exported: ' + e.message); }

// Scenery requests (round 28): src/js/07zt-scenery.js → sprites/requests/scenery.json + scenery.md (the list to read).
try {
  const vm = await import('node:vm'); const ctx = {}; ctx.globalThis = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(jsDir, '07zt-scenery.js'), 'utf8') + '\n;globalThis.__scn=JSON.stringify({stats:ZSCN.stats(),req:ZSCN.requests(),waves:ZSCN.WAVES,style:ZSCN.STYLE,rules:ZSCN.RULES,rulesTex:ZSCN.RULES_TEX,bgAlpha:ZSCN.BG_ALPHA,bgTex:ZSCN.BG_TEX});', ctx, { timeout: 20000 });
  const S = JSON.parse(ctx.__scn), out = path.join(ROOT, 'sprites', 'requests'); fs.mkdirSync(out, { recursive: true });
  const ids = {}; S.req.forEach(q => q.items.forEach(it => { if (ids[it.id]) throw new Error('scenery id used twice: ' + it.id); ids[it.id] = 1; }));
  S.req.forEach(q => { if (q.items.length > q.cols * q.rows) throw new Error(q.id + ': ' + q.items.length + ' items do not fit ' + q.cols + '×' + q.rows); });
  fs.writeFileSync(path.join(out, 'scenery.json'), JSON.stringify({ made: 'build.mjs from src/js/07zt-scenery.js — do not edit by hand', how: 'full request text = body + style + (rules + bgAlpha for objects, rulesTex + bgTex for ground textures)', stats: S.stats, waves: S.waves, style: S.style, rules: S.rules, rulesTex: S.rulesTex, bgAlpha: S.bgAlpha, bgTex: S.bgTex, requests: S.req }, null, 0));
  const full = q => q.body + '\n' + S.style + '\n' + (q.tail === 'tex' ? S.rulesTex + '\n' + S.bgTex : S.rules + '\n' + S.bgAlpha);
  fs.writeFileSync(path.join(out, 'scenery.md'), '# Scenery — ' + S.stats.sheets + ' sheets, ' + S.stats.items + ' objects and textures (' + S.stats.pilot + ' sheets in the pilot)\n\nMade by build.mjs from `src/js/07zt-scenery.js`. Send with `tools\\sprites\\scenery.ps1`; results go to `sprites/incoming/<sheet id>.png`.\n\n| Wave | What | Sheets | Items |\n|---|---|---|---|\n' +
    Object.keys(S.stats.byWave).map(w => '| ' + w + ' | ' + S.stats.byWave[w].name + ' | ' + S.stats.byWave[w].sheets + ' | ' + S.stats.byWave[w].items + ' |').join('\n') + '\n\n' +
    S.req.map(q => '## ' + q.id + (q.pilot ? ' (pilot)' : '') + '\n\n' + q.title + ' · wave ' + q.wave + ' · ' + q.items.length + ' items, ' + q.cols + ' × ' + q.rows + ' · ' + q.size + '\n\n' + q.items.map(it => '- `' + it.id + '` ' + it.name + ' — ' + it.w + ' × ' + it.h + ' px').join('\n') + '\n\nAttach: ' + q.refs.join(', ') + '\n\n```\n' + full(q) + '\n```\n').join('\n'));
  console.log(`✓ sprites/requests/scenery.json  ${S.stats.sheets} scenery sheets, ${S.stats.items} items (${S.stats.pilot} pilot sheets)`);
} catch (e) { console.warn('! scenery requests not exported: ' + e.message); }

// ── Hosting: dist/ = what gets deployed — the home page at /, the game at /play, the Design Lab at /lab
// (vercel.json: buildCommand "npm run build", outputDirectory "dist")
{
  const { spawnSync } = await import('node:child_process');
  const D = (...a) => path.join(ROOT, ...a);
  const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const e of fs.readdirSync(from, { withFileTypes: true })) { const a = path.join(from, e.name), b = path.join(to, e.name); if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b); } };
  try { fs.rmSync(D('dist'), { recursive: true, force: true }); } catch (e) { /* folder where deleting is not allowed: the files below are overwritten in place */ }
  fs.mkdirSync(D('dist', 'lab'), { recursive: true }); fs.mkdirSync(D('dist', 'play'), { recursive: true });
  fs.copyFileSync(D('index.html'), D('dist', 'play', 'index.html'));
  // the same game with the other engine as its default, so both can be tried from one deploy: /play4 (Phaser 4), /play3 (Phaser 3.60)
  for (const v of ['3', '4']) { fs.mkdirSync(D('dist', 'play' + v), { recursive: true }); fs.writeFileSync(D('dist', 'play' + v, 'index.html'), withEngine(outRaw, v, false)); }
  if (fs.existsSync(D('assets', 'atlas'))) for (const v of ['', '3', '4']) copyDir(D('assets', 'atlas'), D('dist', 'play' + v, 'assets', 'atlas'));
  if (fs.existsSync(D('assets', 'scenery'))) for (const v of ['', '3', '4']) copyDir(D('assets', 'scenery'), D('dist', 'play' + v, 'assets', 'scenery'));   // painted scenery (round 30)
  if (fs.existsSync(D('lab/index.html'))) fs.copyFileSync(D('lab/index.html'), D('dist', 'lab', 'index.html'));
  if (fs.existsSync(D('lab/preview'))) copyDir(D('lab/preview'), D('dist', 'lab', 'preview'));
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
