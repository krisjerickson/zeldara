"""Round 73 (answer C1: short AI video clips) — the cut-scene panels brought to life with Google's Gemini Omni Flash (image → video).
Each clip starts from the painted panel (assets/scenery/rooms/<id>.webp, cropped to 16:9); the request (src/js/07zvc-video-clips.js,
exported by build.mjs to sprites/requests/video.json) says how it moves. Clips land in sprites/video_incoming/<id>.mp4; a clip already
there is skipped, so nothing is paid for twice and it is safe to run again. Then: python tools/video/intake_video.py (→ assets/video).

The key is read from the environment (GEMINI_API_KEY — tools/video/video1.ps1 asks for it in the window) and never written to disk.

  python tools/video/clips.py --wave 1 --dry-run     what would be sent, and roughly what it costs
  python tools/video/clips.py --wave 1               send wave 1 (the pilot, 5 clips)
  python tools/video/clips.py --only pn_world_tree --res 360p     one clip, as a cheap draft
"""
import os, sys, json, base64, io, time, argparse, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
REQ = os.path.join(ROOT, 'sprites', 'requests', 'video.json')
OUT = os.path.join(ROOT, 'sprites', 'video_incoming')
API = os.environ.get('ZVIDEO_API', 'https://generativelanguage.googleapis.com/v1beta')
MODEL = os.environ.get('ZVIDEO_MODEL', 'gemini-omni-1.1-flash')
PER_SEC = {'360p': 0.035, '720p': 0.10, '1080p': 0.12}        # rough US$ per second of video (Sept 2026 prices; check Google's pricing page)
SECS = 8                                                        # about how long a clip runs

def frame_jpeg(path):
    from PIL import Image
    im = Image.open(path).convert('RGB'); w, h = im.size; th = round(w * 9 / 16)
    if th < h:                                                  # 3:2 panel → 16:9: keep the middle (a little above centre, where the faces usually are)
        top = max(0, min(h - th, round((h - th) * 0.4))); im = im.crop((0, top, w, top + th))
    b = io.BytesIO(); im.save(b, 'JPEG', quality=92); return base64.b64encode(b.getvalue()).decode('ascii')

def call(method, url, key, body=None, timeout=900, raw=False):
    data = json.dumps(body).encode('utf-8') if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={'x-goog-api-key': key, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(r, timeout=timeout) as f:
        b = f.read(); return b if raw else json.loads(b.decode('utf-8'))

def find_video(resp):
    for st in resp.get('steps') or []:
        if st.get('type') != 'model_output': continue
        for c in st.get('content') or []:
            if c.get('type') == 'video': return c
    for c in resp.get('outputs') or []:                         # in case the answer is shaped a little differently
        if c.get('type') == 'video': return c
    return None

def make(c, key, res):
    out = os.path.join(OUT, c['id'] + '.mp4')
    body = {'model': MODEL, 'input': [{'type': 'image', 'data': frame_jpeg(os.path.join(ROOT, c['frame'])), 'mime_type': 'image/jpeg'},
                                      {'type': 'text', 'text': '<FIRST_FRAME> ' + c['request']}],
            'response_format': {'type': 'video', 'aspect_ratio': '16:9', 'resolution': res, 'delivery': 'uri'}}
    t0 = time.time(); resp = call('POST', API + '/interactions', key, body)
    v = find_video(resp)
    if not v: raise RuntimeError('no video in the answer: ' + json.dumps(resp)[:400])
    if v.get('data'): blob = base64.b64decode(v['data'])
    else:
        uri = v.get('uri') or ''; fid = uri.split('files/', 1)[1].split(':')[0].split('?')[0] if 'files/' in uri else None
        if not fid: raise RuntimeError('no file in the answer: ' + json.dumps(v)[:300])
        for _ in range(120):                                    # wait for the file (up to 10 minutes)
            st = call('GET', API + '/files/' + fid, key, timeout=60).get('state', 'ACTIVE')
            if st == 'ACTIVE': break
            if st == 'FAILED': raise RuntimeError('the video failed on Google\'s side')
            time.sleep(5)
        blob = call('GET', API + '/files/' + fid + ':download?alt=media', key, timeout=300, raw=True)
    open(out + '.part', 'wb').write(blob); os.replace(out + '.part', out)
    return '%s  %.1f MB in %d s' % (c['id'], len(blob) / 1e6, time.time() - t0)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--wave', type=int); ap.add_argument('--only'); ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--res', default='720p', choices=sorted(PER_SEC)); ap.add_argument('--concurrency', type=int, default=2)
    a = ap.parse_args()
    if not os.path.isfile(REQ): sys.exit('No sprites/requests/video.json - run  node build.mjs  first.')
    C = json.load(open(REQ, encoding='utf-8'))['clips']
    if a.only: ids = a.only.split(','); C = [c for c in C if c['id'] in ids]
    elif a.wave: C = [c for c in C if c['wave'] == a.wave]
    os.makedirs(OUT, exist_ok=True); todo = []
    for c in C:
        if os.path.isfile(os.path.join(OUT, c['id'] + '.mp4')): print('  have  ' + c['id']); continue
        if not os.path.isfile(os.path.join(ROOT, c['frame'])): print('  ..    %s - its painted panel is not in yet (%s)' % (c['id'], c['frame'])); continue
        todo.append(c)
    cost = len(todo) * SECS * PER_SEC[a.res]
    print('\n%d clip(s) to make at %s - roughly US$%.2f (about %d s each at ~$%.3f/s; Google bills the real length)' % (len(todo), a.res, cost, SECS, PER_SEC[a.res]))
    for c in todo: print('  ->  %-22s %s' % (c['id'], c['request'].rsplit('no new characters. ', 1)[-1][:110]))
    if a.dry_run or not todo: return
    key = os.environ.get('GEMINI_API_KEY', '').strip()
    if not key: sys.exit('No key: set GEMINI_API_KEY (tools/video/video1.ps1 asks for it).')
    def one(c):
        try: return 'OK  ' + make(c, key, a.res)
        except urllib.error.HTTPError as e:
            try: msg = e.read().decode('utf-8', 'replace')[:500]
            except Exception: msg = ''
            return 'X   %s  HTTP %s %s' % (c['id'], e.code, msg)
        except Exception as e: return 'X   %s  %s' % (c['id'], str(e)[:500])
    with ThreadPoolExecutor(max(1, a.concurrency)) as ex:
        for line in ex.map(one, todo): print(line, flush=True)

if __name__ == '__main__': main()
