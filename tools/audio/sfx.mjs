#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════
// Zeldara ambience + sound effects → ElevenLabs Sound Effects API → audio/incoming/<id>.mp3   (round 72, doc 32 §3.2; Kris's answer M2)
//
//   1. node build.mjs                    (writes sprites/requests/audio.json from src/js/07zau-audio-cues.js)
//   2. the key for this window only:    PowerShell: $env:ELEVENLABS_API_KEY = "..."   (tools\audio\audio1.ps1 asks for it)
//   3. node tools/audio/sfx.mjs --dry-run           (lists what would be sent, and the credits)
//      node tools/audio/sfx.mjs                      (sends them)
//
// Options
//   --tier 1|2|3|all    which wave (default 1 — the first wave)
//   --kind amb|sfx|sting|all   (default amb,sfx — stingers are music: Suno by hand; add --kind all to have this script make them too)
//   --ids a,b           only these ids
//   --takes 2           takes of each (the second is saved as <id>.b.mp3; the Lab and the intake let you pick) — default 2
//   --concurrency 2     requests in flight at once
//   --force             redo a sound whose file already exists (the old one is kept as .prev.mp3)
//   --dry-run           print the plan and the credits, send nothing
// It is safe to stop and restart: a sound whose file already exists is skipped (nothing is paid for twice).
// The key is read from the environment only. It is never written to disk or printed.
// ═══════════════════════════════════════════════════════════════════════
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (name, def) => { const i = process.argv.indexOf('--' + name); if (i < 0) return def; const v = process.argv[i + 1]; return !v || v.startsWith('--') ? true : v; };
const DRY = !!arg('dry-run', false), FORCE = !!arg('force', false), TAKES = Math.max(1, Math.min(4, +arg('takes', 2))), CONC = Math.max(1, Math.min(4, +arg('concurrency', 2)));
const TIER = String(arg('tier', '1')), KIND = String(arg('kind', 'amb,sfx')), IDS = arg('ids', '') ? String(arg('ids', '')).split(',') : null;
const J = JSON.parse(fs.readFileSync(path.join(ROOT, 'sprites', 'requests', 'audio.json'), 'utf8'));
const OUT = path.join(ROOT, 'audio', 'incoming'); fs.mkdirSync(OUT, { recursive: true });
const kindOf = c => c.kind === 'music' ? (c.group === 'sting' ? 'sting' : 'music') : c.kind;
const want = J.cues.filter(c => (IDS ? IDS.includes(c.id) : (TIER === 'all' || String(c.tier) === TIER) && (KIND === 'all' || KIND.split(',').includes(kindOf(c)))) && kindOf(c) !== 'music');
const file = (c, t) => path.join(OUT, c.id + (t ? '.' + 'bcd'[t - 1] : '') + '.mp3');
const jobs = []; want.forEach(c => { for (let t = 0; t < TAKES; t++) if (FORCE || !fs.existsSync(file(c, t))) jobs.push({ c, t }); });
const secs = c => Math.max(0.5, Math.min(30, c.secs));
const credits = jobs.reduce((a, j) => a + Math.ceil(secs(j.c) * 40), 0);
console.log(`${want.length} sounds (${KIND}, wave ${TIER}) × ${TAKES} take(s): ${jobs.length} to make, about ${credits.toLocaleString()} credits (40 a second)`);
if (DRY) { jobs.forEach(j => console.log(`  ${j.c.id}${j.t ? ' (take ' + (j.t + 1) + ')' : ''}  ${secs(j.c)} s${j.c.loop ? ' loop' : ''}  — ${j.c.request.slice(0, 110)}…`)); process.exit(0); }
const KEY = process.env.ELEVENLABS_API_KEY; if (!KEY) { console.error('No ELEVENLABS_API_KEY in this window — run tools\\audio\\audio1.ps1, which asks for it.'); process.exit(1); }
let ok = 0, bad = 0;
async function one(j) {
  const c = j.c, body = { text: c.request, duration_seconds: secs(c), prompt_influence: 0.5, model_id: 'eleven_text_to_sound_v2' };
  if (c.loop) body.loop = true;
  for (let tries = 1; tries <= 3; tries++) {
    try {
      const r = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', { method: 'POST', headers: { 'xi-api-key': KEY, 'content-type': 'application/json', accept: 'audio/mpeg' }, body: JSON.stringify(body) });
      if (r.status === 429 || r.status >= 500) { await new Promise(s => setTimeout(s, 4000 * tries)); continue; }
      if (!r.ok) { const t = await r.text(); throw new Error(r.status + ' ' + t.slice(0, 200)); }
      const buf = Buffer.from(await r.arrayBuffer()), f = file(c, j.t);
      if (fs.existsSync(f)) fs.renameSync(f, f.replace(/\.mp3$/, '.prev.mp3'));
      fs.writeFileSync(f, buf); ok++; console.log(`✓ ${path.basename(f)}  ${(buf.length / 1024).toFixed(0)} KB`); return;
    } catch (e) { if (tries === 3) { bad++; console.log(`X ${c.id}${j.t ? ' take ' + (j.t + 1) : ''}: ${e.message}`); return; } await new Promise(s => setTimeout(s, 2000 * tries)); }
  }
  bad++; console.log(`X ${c.id}: the service stayed busy — run again to retry`);
}
const q = jobs.slice(); await Promise.all(Array.from({ length: CONC }, async () => { while (q.length) await one(q.shift()); }));
console.log(`\nDone: ${ok} made, ${bad} failed. Files: audio\\incoming\\  — then run: python tools/audio/intake_audio.py`);
