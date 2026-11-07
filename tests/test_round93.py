"""Round 93 — thematic sound takes: five to choose from for every effect (tools/audio/sfx93_words.py → src/js/07zau7-sfx93.js), the library
catalogue with its tags (lib_catalog.py), fresh thematic library takes (lib93.py), and Lab → Sound effects → Round 93. Run: python tests/test_round93.py"""
import os, re, sys, json
from playwright.sync_api import sync_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..'); PHASER = os.path.join(HERE, '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]), flush=True)
sys.path.insert(0, os.path.join(R, 'tools', 'audio')); import sfx93_words as W
A = [c for c in json.load(open(os.path.join(R, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues'] if c['kind'] == 'sfx']
check('Every effect has what it stands for and five thematic takes (%d)' % len(W.W), len(W.W) == len(A) == 147 and all(len(v) == 5 and len(set(v)) == 5 for v in W.W.values()) and all(W.MEAN.get(c['id']) for c in A))
T = lambda i, rx: all(re.search(rx, w, re.I) for w in W.W[i])
check('Lightning sounds like lightning; Starfall like shooting stars; the meteor falls; thunder thunders',
      T('sfx_lightning', r'lightning|thunder|electric') and T('sfx_sp_chain_lightning', r'lightning|electric') and T('sfx_sp_starfall', r'star|comet') and T('sfx_sk_meteor', r'meteor|comet|flaming rock|from the sky') and T('sfx_thunder', r'thunder|lightning'))
check('Fire sounds like fire, frost like ice, water like water', T('sfx_fire', r'fire|flame') and T('sfx_sp_fireball', r'fire|flam') and T('sfx_frost', r'ice|icicle|frozen|freez') and T('sfx_sp_tidal_wave', r'wave|water') and T('sfx_water', r'water|wave'))
total = {c['id']: len(c.get('kept93') or []) + len(c.get('v93') or []) for c in A}
lib = json.load(open(os.path.join(R, 'tools', 'audio', 'lib93_map.json')))
bad = {k: v for k, v in total.items() if v + (1 if k in lib else 0) != 5}
check('Five to choose from for every effect: kept + library + new = 5', not bad, bad)
check('The library keeps only truly thematic finds (%d)' % len(lib), 'sfx_sp_starfall' in lib and 'sfx_chop' not in lib and 'sfx_page' not in lib)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 900}); errs = []
    pg.on("pageerror", lambda e: errs.append("PAGEERR " + str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PHASER, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    html = open(os.path.join(R, 'lab', 'index.html'), encoding='utf-8').read()
    pg.route("http://lab.test/**", lambda r: r.fulfill(body=html, content_type="text/html") if r.request.url.split('?')[0].endswith(('/', '.html')) else r.fulfill(status=404, body=''))
    pg.goto("http://lab.test/?tabs=all"); pg.wait_for_timeout(1500)
    pg.click('.lab-tab[data-tab="sfxpick"]'); pg.wait_for_timeout(1500)
    t = pg.evaluate("({rows:document.querySelectorAll('.s89-r').length, mean:document.querySelectorAll('.s93-mean').length, h:document.body.textContent.indexOf('Round 93')>=0, lib:document.querySelectorAll('.s89-k.new').length, todo:(LTODO.L||[]).some(function(x){ return x.id==='sfx93'; })})")
    check('Lab → Sound effects → Round 93: a row per effect, each with what it stands for (%s)' % t, t['rows'] == 147 and t['mean'] == 147 and t['h'] and t['todo'], t)
    check('No Lab script errors', not errs, errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
