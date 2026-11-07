"""Round 93: a catalogue of the sound library with its tags (Kris: "see if there are any tags in the sound effect libraries i've provided").

For every recording in audio/library/*.zip (read in place, never unpacked): its pack, its name, and every tag the file carries —
  · the UCS category in its name (e.g. MAGSpel_, WEAPSwrd_, THUNCrack_ — the Universal Category System most Sonniss packs use)
  · the BWF 'bext' description, the iXML <NOTE>/<KEYWORDS>/<CATEGORY> fields, and the RIFF LIST/INFO comment, keywords and genre
  · the length (from the WAV header)
→ audio/library/catalog.json  (one zip at a time; a zip already catalogued is skipped unless it changed)   python tools/audio/lib_catalog.py [--zip N]
"""
import os, sys, json, zipfile, struct, re, glob, time
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
LIB = os.path.join(ROOT, 'audio', 'library'); OUT = os.path.join(LIB, 'catalog.json')
CAT = json.load(open(OUT, encoding='utf-8')) if os.path.isfile(OUT) else {'zips': {}, 'files': []}
UCS = re.compile(r'^([A-Z]{3,6}[A-Z][a-z]+)_')
def clean(b): return re.sub(r'\s+', ' ', re.sub(r'[^\x20-\x7e]+', ' ', b.decode('latin1', 'ignore'))).strip()
def meta(z, info):
    tags, secs = [], 0
    try:
        with z.open(info) as f: b = f.read(262144)
    except Exception: return tags, secs
    if b[:4] != b'RIFF' or b[8:12] != b'WAVE': return tags, secs
    i, rate = 12, 0
    while i + 8 <= len(b):
        cid = b[i:i + 4]; sz = struct.unpack('<I', b[i + 4:i + 8])[0]; body = b[i + 8:i + 8 + min(sz, 65536)]
        if cid == b'fmt ' and len(body) >= 12: rate = struct.unpack('<I', body[8:12])[0]
        elif cid == b'bext': d = clean(body[:256]); tags += [d] if d else []
        elif cid == b'iXML':
            x = body.decode('utf-8', 'ignore')
            for k in ('NOTE', 'KEYWORDS', 'CATEGORY', 'SUBCATEGORY', 'DESCRIPTION', 'FXNAME', 'CATID', 'LIBRARY'):
                for m in re.findall(r'<%s>(.*?)</%s>' % (k, k), x, re.S): m = re.sub(r'\s+', ' ', m).strip(); tags += [m] if m else []
        elif cid == b'LIST' and body[:4] == b'INFO':
            j = 4
            while j + 8 <= len(body):
                k = body[j:j + 4]; s2 = struct.unpack('<I', body[j + 4:j + 8])[0]; v = clean(body[j + 8:j + 8 + s2])
                if k in (b'ICMT', b'IKEY', b'IGNR', b'INAM', b'ISBJ') and v: tags.append(v)
                j += 8 + s2 + (s2 & 1)
        elif cid == b'data':
            if rate: secs = round(sz / max(1, rate * 4), 2)      # a rough length (stereo 16-bit); the cutter measures it properly
            break
        i += 8 + sz + (sz & 1)
    out = []
    for t in tags:
        if t not in out and len(t) < 600: out.append(t)
    return out, secs
def main():
    zips = sorted(glob.glob(os.path.join(LIB, '*.zip'))); only = int(sys.argv[sys.argv.index('--zip') + 1]) if '--zip' in sys.argv else None
    t0 = time.time()
    for n, zp in enumerate(zips):
        if only is not None and n != only: continue
        key = os.path.basename(zp); st = os.stat(zp); sig = '%d-%d' % (st.st_size, int(st.st_mtime))
        if CAT['zips'].get(key) == sig: continue
        if time.time() - t0 > 140: print('… time is up; run again for the rest'); break
        CAT['files'] = [f for f in CAT['files'] if f['zip'] != key]
        z = zipfile.ZipFile(zp); k = 0
        for info in z.infolist():
            nm = info.filename
            if not nm.lower().endswith(('.wav', '.flac', '.aif', '.aiff', '.mp3', '.ogg')): continue
            base = os.path.basename(nm); pack = nm.split('/')[0] if '/' in nm else ''
            tags, secs = meta(z, info) if nm.lower().endswith('.wav') else ([], 0)
            m = UCS.match(base)
            CAT['files'].append({'zip': key, 'path': nm, 'pack': pack, 'name': os.path.splitext(base)[0], 'ucs': m.group(1) if m else '', 'tags': tags, 'secs': secs, 'mb': round(info.file_size / 1e6, 1)})
            k += 1
        CAT['zips'][key] = sig; print('%-50s %5d recordings' % (key, k))
        json.dump(CAT, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False)
    F = CAT['files']; print('\n%d recordings in %d zips; %d with tags in the file, %d with a UCS category' % (len(F), len(CAT['zips']), sum(1 for f in F if f['tags']), sum(1 for f in F if f['ucs'])))
if __name__ == '__main__': main()
