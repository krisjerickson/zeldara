"""Round 72 (P2, 05e-world-prebuilt.js): bake the world once — generate it in the page (exactly as New Game does), write it to
assets/world/world.bin.gz with the build's ZWORLD_HASH, then check that a page loading the file gets the very same world.
Run after node build.mjs:  python tests/bake_world.py      (re-run whenever the code changes — the test suite checks the file is current)"""
import os, sys, re, gzip, base64, json, hashlib
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from harness import PHASER, INDEX
ROOT = os.path.join(HERE, '..'); OUT = os.path.join(ROOT, 'assets', 'world', 'world.bin.gz')
# a fingerprint of a world: every typed array and the JSON of everything else (props, sites, gates…), in a fixed order
FP = r"""(wd=>{ var parts=[], walk=function(v,p){ if(v===null||v===undefined){ parts.push(p+'=null'); return; } if(ArrayBuffer.isView(v)){ var s=0; for(var i=0;i<v.length;i++)s=(s*31+(v[i]*1000|0))|0; parts.push(p+'#'+v.length+':'+s); return; }
    if(Array.isArray(v)){ parts.push(p+'['+v.length); v.forEach(function(x,i){ walk(x,p+'.'+i); }); return; } if(typeof v==='object'){ Object.keys(v).sort().forEach(function(k){ if(k==='buildMs'||k==='buildTimes')return; walk(v[k],p+'.'+k); }); return; }
    if(typeof v==='function')return; parts.push(p+'='+(typeof v==='number'?Math.round(v*1000)/1000:v)); };
  walk(wd,'w'); var h=0, s=parts.join('|'); for(var i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))|0; return [parts.length,h]; })"""
def page(p, query):
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    html = open(INDEX, encoding='utf-8').read(); root = os.path.dirname(os.path.abspath(INDEX))
    def _serve(r):
        u = r.request.url.split('zeldara.test/', 1)[1].split('?')[0]; f = os.path.join(root, u)
        if u.startswith('assets/'): return r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
        return r.fulfill(body=html, content_type="text/html")
    pg.route("http://zeldara.test/**", _serve); pg.goto("http://zeldara.test/index.html" + query)
    pg.wait_for_function("typeof game!=='undefined'&&game.scene&&game.scene.isActive('Title')", timeout=180000)
    return b, pg, errs
with sync_playwright() as p:
    b, pg, errs = page(p, '?world=gen')
    r = pg.evaluate("(()=>{ var t0=performance.now(), wd=generateWorld(), ms=performance.now()-t0, buf=ZWORLD.encode(wd,ZWORLD.hash()), u8=new Uint8Array(buf), s=''; for(var i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000)); return {ms:Math.round(ms), hash:ZWORLD.hash(), b64:btoa(s), fp:(" + FP + ")(wd)}; })()")
    raw = base64.b64decode(r['b64']); os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT, 'wb').write(gzip.compress(raw, compresslevel=9, mtime=0))
    print('baked: generated in %d ms, %.1f MB raw, %.2f MB gzipped, hash %s, fingerprint %s' % (r['ms'], len(raw) / 1048576, os.path.getsize(OUT) / 1048576, r['hash'], r['fp']), flush=True)
    b.close()
    b, pg, errs2 = page(p, '')
    pg.wait_for_function("ZWORLD.state!=='loading'", timeout=60000)
    s = pg.evaluate("(()=>({state:ZWORLD.state, why:ZWORLD.why, ms:ZWORLD.ms, fp:ZWORLD.data?(" + FP + ")(ZWORLD.data):null}))()")
    print('loaded: %s %s in %d ms, fingerprint %s' % (s['state'], s['why'], s['ms'], s['fp']), flush=True)
    ok = s['state'] == 'ready' and s['fp'] == r['fp']
    print('SAME WORLD' if ok else 'DIFFERENT — do not ship', flush=True); b.close()
    if errs or errs2: print('errors:', (errs + errs2)[:3])
    sys.exit(0 if ok else 1)
