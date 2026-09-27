#!/usr/bin/env node
// Zeldara build: src/ + assets/ -> index.html (one self-contained file, opens from file://).
//
//   node build.mjs            build index.html
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
const js = jsFiles.map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('');

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
  const shared = ['00-header.js', '01-sprite-data.js', '02-hero-api.js']
    .map(f => fs.readFileSync(path.join(jsDir, f), 'utf8')).join('');
  const labDir = path.join(ROOT, 'lab/src/js');
  const labFiles = fs.readdirSync(labDir).filter(f => f.endsWith('.js')).sort();
  const labJs = shared + labFiles.map(f => fs.readFileSync(path.join(labDir, f), 'utf8')).join('');
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
