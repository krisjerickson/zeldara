#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════
// Zeldara sprite requests → OpenAI image API → sprites/incoming/<request id>.png
//
//   1. node build.mjs                      (writes sprites/requests/requests.json)
//   2. set your key for this terminal only:
//        PowerShell:  $env:OPENAI_API_KEY = "sk-..."
//        bash:        export OPENAI_API_KEY=sk-...
//   3. node tools/sprites/generate.mjs --wave 1 --dry-run      (lists what would be sent)
//      node tools/sprites/generate.mjs --wave 1                (sends them)
//
// Options
//   --wave 1,1.5        waves to send (see sprites/requests/*.md; 0 = the pilot)
//   --ids a.core.s,b    only these request ids
//   --group monster     only this group (hero, rider, mount, monster, boss, npc, familiar, fairy, animal, vehicle)
//   --tier core|extra|all   default all (round 21: special-move and death sheets go in the same pass)
//   --limit 20          stop after this many images
//   --model <id>        default gpt-image-2.5-sunburst
//   --quality medium    low | medium | high (default medium: about a quarter of the cost of high; the frames are shrunk to game size anyway)
//   --concurrency 2     requests in flight at once
//   --force             redo requests whose file already exists (the old file is kept as .prev.png)
//   --dry-run           print the plan, send nothing
//
// It is safe to stop and restart: a request whose PNG already exists is skipped.
// A request that needs another sheet as a reference (a hero's model sheet, a
// character's first sheet) waits until that file is in sprites/incoming/.
// The key is read from the environment only. It is never written to disk or printed.
// ═══════════════════════════════════════════════════════════════════════
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (name, def) => { const i = process.argv.indexOf('--' + name); if (i < 0) return def; const v = process.argv[i + 1]; return !v || v.startsWith('--') ? true : v; };
const DRY = !!arg('dry-run', false), FORCE = !!arg('force', false);
const MODEL = arg('model', 'gpt-image-2.5-sunburst'), QUALITY = arg('quality', 'medium');
const LIMIT = +arg('limit', 1e9), CONC = Math.max(1, Math.min(6, +arg('concurrency', 2)));
const TIER = arg('tier', 'all');
const waves = arg('wave', null) === null ? null : String(arg('wave')).split(',').map(Number);
const ids = arg('ids', null) ? String(arg('ids')).split(',') : null;
const group = arg('group', null);

const reqFile = path.join(ROOT, 'sprites', 'requests', 'requests.json');
if (!fs.existsSync(reqFile)) { console.error('sprites/requests/requests.json is missing — run "node build.mjs" first.'); process.exit(1); }
const J = JSON.parse(fs.readFileSync(reqFile, 'utf8'));
const IN = path.join(ROOT, 'sprites', 'incoming'), REF = path.join(ROOT, 'sprites', 'reference');
fs.mkdirSync(IN, { recursive: true });
const outPath = id => path.join(IN, id + '.png');
const refPath = r => (r === 'style_hero' || r === 'style_centaur') ? path.join(REF, r + '.png') : outPath(r);
const fullPrompt = q => q.body + '\n' + J.style + '\n' + J.rules + '\n' + J.bgAlpha;

if (!waves && !ids && !group) { console.error('Say what to send: --wave N, --ids a,b or --group name. Add --dry-run to preview.'); process.exit(1); }
let todo = J.requests.filter(q => (!waves || waves.includes(q.wave)) && (!ids || ids.includes(q.id)) && (!group || q.group === group) && (ids || TIER === 'all' || q.tier === TIER));
const skipped = todo.filter(q => fs.existsSync(outPath(q.id)) && !FORCE).length;
todo = todo.filter(q => FORCE || !fs.existsSync(outPath(q.id))).slice(0, LIMIT);
console.log(`${todo.length} request(s) to send, ${skipped} already in sprites/incoming/ (model ${MODEL}, quality ${QUALITY})`);
if (DRY) { for (const q of todo) console.log(`  ${q.id}  [wave ${q.wave}, ${q.tier}]  ${q.size}  ${q.poses.length} poses  refs: ${q.refs.join(', ')}${q.refs.some(r => !fs.existsSync(refPath(r))) ? '  (waits for a reference)' : ''}`); process.exit(0); }
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('OPENAI_API_KEY is not set in this terminal. See the top of this file.'); process.exit(1); }
for (const r of ['style_hero', 'style_centaur']) if (!fs.existsSync(refPath(r))) { console.error('Missing reference image sprites/reference/' + r + '.png'); process.exit(1); }

const log = line => fs.appendFileSync(path.join(IN, '_log.jsonl'), JSON.stringify(line) + '\n');
const sleep = ms => new Promise(r => setTimeout(r, ms));
let done = 0, failed = 0, tokens = 0, stop = false;

async function send(q) {
  const form = new FormData();
  form.append('model', MODEL); form.append('prompt', fullPrompt(q)); form.append('size', q.size); form.append('quality', QUALITY);
  form.append('background', 'transparent'); form.append('output_format', 'png'); form.append('n', '1');
  for (const r of q.refs) form.append('image[]', new Blob([fs.readFileSync(refPath(r))], { type: 'image/png' }), r.replace(/[^a-z0-9_.-]/gi, '_') + '.png');
  for (let attempt = 1; attempt <= 4; attempt++) {
    let res, body;
    try { res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: 'Bearer ' + KEY }, body: form }); body = await res.json(); }
    catch (e) { if (attempt === 4) throw e; await sleep(4000 * attempt); continue; }
    if (res.ok && body.data && body.data[0] && body.data[0].b64_json) {
      const file = outPath(q.id); if (fs.existsSync(file)) fs.renameSync(file, file.replace(/\.png$/, '.prev.png'));
      fs.writeFileSync(file, Buffer.from(body.data[0].b64_json, 'base64'));
      const t = (body.usage && body.usage.total_tokens) || 0; tokens += t; log({ id: q.id, at: new Date().toISOString(), model: MODEL, quality: QUALITY, size: q.size, usage: body.usage || null });
      return;
    }
    const msg = (body && body.error && body.error.message) || ('HTTP ' + res.status);
    if (res.status === 401 || res.status === 403) { stop = true; throw new Error(msg + ' — check the key, and that your OpenAI organization is verified for image models.'); }
    if (res.status === 429 || res.status >= 500) { await sleep(8000 * attempt); continue; }
    throw new Error(msg);
  }
  throw new Error('gave up after 4 attempts');
}

// Requests wait for their reference sheets; each pass sends everything whose references exist.
let pending = todo.slice();
while (pending.length && !stop) {
  const ready = pending.filter(q => q.refs.every(r => fs.existsSync(refPath(r))));
  if (!ready.length) { console.log(`\n${pending.length} request(s) are waiting for a reference sheet that is not in sprites/incoming/ yet:`); for (const q of pending.slice(0, 12)) console.log('  ' + q.id + '  needs  ' + q.refs.filter(r => !fs.existsSync(refPath(r))).join(', ')); break; }
  pending = pending.filter(q => !ready.includes(q));
  let i = 0;
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (i < ready.length && !stop) { const q = ready[i++];
      try { await send(q); done++; console.log(`✓ ${q.id}  (${done}/${todo.length})`); }
      catch (e) { failed++; console.error(`✗ ${q.id}: ${e.message}`); log({ id: q.id, at: new Date().toISOString(), error: String(e.message) }); } }
  }));
}
console.log(`\nDone: ${done} saved, ${failed} failed, ${todo.length - done - failed} not sent. Tokens used: ${tokens}. Log: sprites/incoming/_log.jsonl`);
console.log('Next: tell Claude the wave is in (or run: python tools/sprites/intake.py).');
