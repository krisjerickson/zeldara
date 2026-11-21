// ═══════════════════════════════════════════════════════════════════════
// ║ omni.mjs — round 125: CUT-SCENE VIDEOS FROM THE SCRIPT, the way Kris's best one was made (Kris: "if we can script this, that would be
// ║ ideal, i got a great output from this one 04_bram_zeldara_p1 … Let's set that up").
// ║ That video (made in Google Flow) is five 4-second clips, one per painting, each starting exactly on its painting, joined with hard
// ║ cuts. Flow has no API; its video model does, through the Gemini API's Interactions API (Veo 3.1 Preview was shut down there on
// ║ 22 Oct 2026; Gemini Omni Flash replaced it). Request shape taken from Google's own SDK (google-genai 3.6.1):
// ║   POST https://generativelanguage.googleapis.com/v1beta/interactions   header x-goog-api-key
// ║   {model, background:true, input:[{type:'image',mime_type,data}, {type:'text',text}], generation_config:{video_config:{task:'image_to_video'}},
// ║    response_format:{type:'video', aspect_ratio:'16:9', duration:'4s', resolution:'720p', delivery:'inline'}}
// ║   then GET …/v1beta/interactions/{id} until status 'completed'; the clip is in output_video (data, or a uri to download).
// ║
// ║   node tools/video/omni.mjs --folder 04_bram_zeldara_p1 [--shots 2,5] [--model gemini-omni-1.2-flash] [--secs 4] [--res 720p] [--dry]
// ║ Each shot: video_requests/<folder>/clips/shotNN.mp4 (a shot already made is kept — run again to redo only what is missing; delete or
// ║ rename a clip to make it again). When every shot is in, the clips are joined (hard cuts, no sound — the game plays its music) into the
// ║ folder's "SAVE AS <name>.mp4", which tools/video/intake_video.py takes in like any Kling download. The key comes from GEMINI_API_KEY
// ║ (tools/video/omni.ps1 asks for it in the window) and is never written anywhere.
// ═══════════════════════════════════════════════════════════════════════
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const has = k => process.argv.includes('--' + k);
const FOLDER = arg('folder'); if (!FOLDER) { console.log('Give --folder <name in video_requests>'); process.exit(1); }
const DIR = path.join(ROOT, 'video_requests', FOLDER); if (!fs.existsSync(DIR)) { console.log('No folder ' + DIR); process.exit(1); }
const MODELS = (arg('model', 'gemini-omni-1.2-flash,gemini-omni-1.1-flash')).split(',');
const SECS = +arg('secs', 4), RES = arg('res', '720p'), DRY = has('dry');
const ONLY = arg('shots') ? arg('shots').split(',').map(Number) : null;
const KEY = process.env.GEMINI_API_KEY;
const BASE = 'https://generativelanguage.googleapis.com/v1beta';
if (!KEY && !DRY) { console.log('No GEMINI_API_KEY — run tools\\video\\omni.ps1, which asks for it.'); process.exit(1); }

// ── the shots, from the folder's pictures and its PROMPT.txt (the Locked Shot List) ──
const P = fs.readFileSync(path.join(DIR, 'PROMPT.txt'), 'utf8');
const LOOK = (P.match(/^LOOK: (.*)$/m) || [])[1] || 'the hand-painted Norse fantasy storybook style of the pictures';
const imgs = fs.readdirSync(DIR).filter(f => /^image\d+\.png$/.test(f)).sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)));
function shotText(n) {
  const line = (P.match(new RegExp('^SHOT ' + n + ' — .*$', 'm')) || [''])[0];
  const title = (line.match(/s — ([^.]+)\. START/) || [])[1] || '';
  const start = ((line.match(/START: exactly @image\d+ \((.*?)\)\. ACTION/) || [])[1] || '').replace(/[;,]\s*(with|and)\s*$/, '');
  const act = (line.match(/ACTION, in order: (.*?)(?: SPECIAL CAMERA[^.]*\.)? END FRAME/) || [])[1] || '';
  const cam = (line.match(/SPECIAL CAMERA, this shot only: ([^.]*)\./) || [])[1];
  const end = (line.match(/END FRAME: (.*?)\. NOT IN THIS SHOT/) || [])[1] || '';
  const not = (line.match(/NOT IN THIS SHOT: (.*)$/) || [])[1] || '';
  // the NOT list said the other way round, so nothing unwanted is named: a bridge not built yet means open water
  const keep = /bridge/i.test(not) ? 'The water stays open from bank to bank with nothing built over or in it, exactly as painted. ' : '';
  // no "NOT IN THIS SHOT" list: a video model reads the things named there as things to show (doc 62)
  return 'A single continuous ' + SECS + '-second cinematic shot, 16:9, brought to life from this painting: the first frame is exactly this picture. ' +
    'Style: ' + LOOK + ' Keep it painted, not photographic or 3D. ' +
    (title ? 'THE SHOT: ' + title.toLowerCase() + '. ' : '') + (start ? 'In the picture: ' + start + '. ' : '') +
    (act ? 'What happens, in order: ' + act + ' ' : '') + (end ? 'It ends on: ' + end + '. ' : '') + keep +
    'Camera: ' + (cam || 'one smooth, clear move — a push-in, a tilt or a slow drift') + '. Strong, clear, energetic motion of the characters and the world (cloth, hair, light, water, aurora). ' +
    'The same people, faces, hair, clothes and colours as painted; whatever someone holds stays in their hands. No cuts, no new people or creatures, no text or logos, no speech.';
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function call(url, opt) {
  const r = await fetch(url, { ...opt, headers: { 'x-goog-api-key': KEY, 'Content-Type': 'application/json', ...(opt && opt.headers) } });
  const t = await r.text(); let j = null; try { j = JSON.parse(t); } catch (e) {}
  if (!r.ok) { const e = new Error('HTTP ' + r.status + ': ' + (j && j.error && j.error.message || t.slice(0, 300))); e.status = r.status; throw e; }
  return j;
}

async function makeShot(n, file, out) {
  const data = fs.readFileSync(path.join(DIR, file)).toString('base64');
  for (const model of MODELS) {
    for (const dur of [SECS + 's', String(SECS)]) {
      const body = { model, background: true, input: [{ type: 'image', mime_type: 'image/png', data }, { type: 'text', text: shotText(n) }],
        generation_config: { video_config: { task: 'image_to_video' } },
        response_format: { type: 'video', aspect_ratio: '16:9', duration: dur, resolution: RES, delivery: 'inline' } };
      if (DRY) { console.log(JSON.stringify({ ...body, input: [{ ...body.input[0], data: '<' + data.length + ' base64 chars>' }, body.input[1]] }, null, 1)); return; }
      let it;
      try { it = await call(BASE + '/interactions', { method: 'POST', body: JSON.stringify(body) }); }
      catch (e) {
        if (e.status === 400 && /duration/i.test(e.message) && dur.endsWith('s')) continue;      // the duration's format, the other way
        if ((e.status === 404 || e.status === 400) && /model/i.test(e.message)) { console.log('  ' + model + ': ' + e.message + ' — trying the next model'); break; }
        throw e;
      }
      const t0 = Date.now();
      while (!['completed', 'failed', 'cancelled', 'incomplete', 'budget_exceeded'].includes(it.status)) {
        if (Date.now() - t0 > 12 * 60e3) throw new Error('shot ' + n + ': no video after 12 minutes (interaction ' + it.id + ')');
        await sleep(8000); process.stdout.write('.');
        it = await call(BASE + '/interactions/' + encodeURIComponent(it.id), { method: 'GET' });
      }
      process.stdout.write('\n');
      if (it.status !== 'completed') throw new Error('shot ' + n + ': ' + it.status + ' — ' + JSON.stringify(it.errors || it.error || '').slice(0, 300));
      const v = it.output_video || (it.steps || []).map(s => s.output_video || s.video).find(Boolean);
      if (!v) throw new Error('shot ' + n + ': finished but no video in the answer (keys: ' + Object.keys(it).join(', ') + ')');
      if (v.data) fs.writeFileSync(out, Buffer.from(v.data, 'base64'));
      else if (v.uri) { const r = await fetch(v.uri, { headers: { 'x-goog-api-key': KEY } }); if (!r.ok) throw new Error('download ' + r.status); fs.writeFileSync(out, Buffer.from(await r.arrayBuffer())); }
      console.log('  ✓ shot ' + n + ' (' + model + ') → clips\\' + path.basename(out));
      return;
    }
  }
  throw new Error('shot ' + n + ': none of the models (' + MODELS.join(', ') + ') took the request');
}

const CL = path.join(DIR, 'clips'); fs.mkdirSync(CL, { recursive: true });
const want = imgs.map((f, i) => [i + 1, f]).filter(([n]) => !ONLY || ONLY.includes(n));
console.log(FOLDER + ': ' + imgs.length + ' pictures, ' + want.length + ' shot(s) to check · ' + SECS + ' s each at ' + RES + ' · about $' + (want.length * SECS * 0.1).toFixed(2) + ' if all are made (Omni Flash ~$0.10 a second at 720p; check your Google bill)');
let made = 0, failed = 0;
for (const [n, f] of want) {
  const out = path.join(CL, 'shot' + String(n).padStart(2, '0') + '.mp4');
  if (fs.existsSync(out) && !DRY) { console.log('  · shot ' + n + ' already made'); continue; }
  console.log('Shot ' + n + ' — from ' + f);
  try { await makeShot(n, f, out); if (!DRY) made++; } catch (e) { failed++; console.log('  ✗ ' + e.message); }
}
if (DRY) process.exit(0);
const clips = imgs.map((f, i) => path.join(CL, 'shot' + String(i + 1).padStart(2, '0') + '.mp4'));
if (clips.every(c => fs.existsSync(c))) {
  const save = (fs.readdirSync(DIR).find(f => f.startsWith('SAVE AS ')) || 'SAVE AS ' + FOLDER + '.mp4').slice(8);
  const list = path.join(CL, 'list.txt'); fs.writeFileSync(list, clips.map(c => "file '" + c.replace(/\\/g, '/').replace(/'/g, "'\\''") + "'").join('\n'));
  // the same size and speed for every clip, hard cuts, no sound (the game plays its own music under every cut-scene)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(DIR, save)]);
  console.log('\n✓ All ' + clips.length + ' shots in — joined into ' + FOLDER + '\\' + save + '. Tell Claude (or run: python tools/video/intake_video.py).');
} else console.log('\n' + made + ' made now, ' + failed + ' failed; ' + clips.filter(c => !fs.existsSync(c)).length + ' still to make. Run the same command again — it only makes what is missing.');
