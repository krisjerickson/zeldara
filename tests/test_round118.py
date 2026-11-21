"""Round 118: the first spirit freed, cut from its shot series as a video (tools/video/series_cut.py → assets/video/sb_spirit_m.mp4,
16w3 ZSC.CLIPS): paced to the words, a camera move per shot, Zeldor's version; and the seasons' wave S2 (the village) requested.
python tests/test_round118.py   (after node build.mjs)"""
import sys, os, time, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
def until(g, expr, ms=15000):
    t = time.time()
    while (time.time() - t) * 1000 < ms:
        if g.js(expr): return True
        g.wait(200)
    return False
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ed = json.load(open(os.path.join(R, 'assets', 'video', 'sb_spirit_m.json')))
words = lambda c: len(c.split())
ok = all(f['dur'] >= 1.4 + 0.36 * words(f['cap']) for f in ed['frames'])
check('The edit: every frame lasts at least as long as its line takes to read (%s)' % [(f['n'], f['dur']) for f in ed['frames']], ok)
fr = {f['n']: f for f in ed['frames']}
PK = json.load(open(os.path.join(R, 'sprites', 'requests', 'series_picks.json')))
check('…the shots Kris kept, in his order, every frame (%s)' % [[s['k'] for s in f['shots']] for f in ed['frames']],
      all([s['k'] for s in f['shots']] == PK['spirit_%02d' % f['n']]['keep'] for f in ed['frames']))
flat = [s for f in ed['frames'] for s in f['shots']]
SC = {'xwide': 0, 'wide': 0, 'track': 1, 'ots': 1.5, 'low': 1.5, 'two': 1.5, 'pov': 2.2, 'react': 2.5, 'close': 3, 'ecu': 4}
moves = [s['move'] for s in flat]
check('…the camera moves cinematically (round 121): %d kinds of move, never the same twice in a row except a shake (%s)' % (len(set(moves)), moves), len(set(moves)) >= 7 and all(a != b or a == 'shake' for a, b in zip(moves, moves[1:])))
check('…the chains breaking cuts quicker (%.1f s a shot) than the frames around it (%.1f s)' % (fr[6]['dur'] / len(fr[6]['shots']), fr[5]['dur'] / len(fr[5]['shots'])), fr[6]['dur'] / len(fr[6]['shots']) < min(fr[5]['dur'] / len(fr[5]['shots']), fr[7]['dur'] / len(fr[7]['shots'])))
ST = """(()=>{ var el=document.getElementById('zcut'); if(!el)return null; var v=el.querySelector('.zsc-vid'), cap=el.querySelector('.zcut-cap');
  return {vid:!!(v&&v.style.display!=='none'&&v.style.opacity==='1'), src:v?v.getAttribute('src'):'', t:v?Math.round(v.currentTime*100)/100:null, paused:v?v.paused:null, words:cap?cap.querySelectorAll('.zsc-w').length:0, cap:cap?cap.textContent:'', key:ZCUT._key}; })()"""
with game(painted=True, w=1280, h=720) as g:
    g.wait(3500)
    g.js("(()=>{ ZCUT.on=true; var ps=game.scene.getScene('World').playerState; ps.hero='m'; ZCUT.play('saga','firstfree'); })()")
    ok = until(g, "(()=>{ var v=document.querySelector('#zcut .zsc-vid'); return !!(v&&v.style.opacity==='1'&&!v.paused&&v.currentTime>0.3); })()", 20000)
    a = g.js(ST)
    check('In the game (Zeldor): after its first line, the first spirit freed plays as the cut video (%s)' % a, ok and a and 'sb_spirit_m' in a['src'], a)
    ok2 = until(g, "(()=>{ var v=document.querySelector('#zcut .zsc-vid'); return v&&v.currentTime>%f; })()" % (ed['cuts'][1] + 0.5), 25000)
    g.wait(1500); b = g.js(ST)
    check('…frame 2 plays its part, its words building under it (%s)' % b, ok2 and b['words'] > 0 and 'Binder' in b['cap'], b)
    g.shot('/tmp/claude-0/r118_cut.png')
    g.js("(()=>{ if(ZCUT.isOpen())ZCUT.close&&ZCUT.close(); var el=document.getElementById('zcut'); if(el)el.remove(); ZCUT._open=false; })()"); g.wait(500)
    f = g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.hero='f'; var L=ZSFR.frames(ZSFR.MAP['saga_firstfree']); return L?ZSC.seg(L[1][0]):'nolist'; })()")
    check("Zeldara's frames are not given Zeldor's video (they stay paintings until hers is cut) (%s)" % f, f is None, f)
    s = g.js("""(()=>{ var S=ZSCN.SHEETS.filter(function(x){ return x.wave===118||(x.wave===121&&/^sc_seas_wi_/.test(x.id)); }); return {n:S.length, bld:S.filter(function(x){ return x.season&&/vill_/.test(x.src); }).length, fest:S.filter(function(x){ return x.fam==='fest'; }).length, body:/A MILD WINTER in the village/.test(ZSCN.body(S.find(function(x){ return x.id==='sc_seas_wi_vill_core_1'; })))}; })()""")
    check('Seasons wave S2: %d sheets — %d village building repaints, %d festival dressings and set-pieces, the village look in the request (%s)' % (s['n'], s['bld'], s['fest'], s), s['n'] == 29 and s['bld'] == 10 and s['fest'] == 10 and s['body'], s)
    it = g.js("(()=>{ ZSEASON.set('wi'); var r=ZSEASON.item('vb_tavern'); ZSEASON.set('su'); return r; })()")
    check('A village building with no winter painting yet is drawn as it is (no tint for buildings) (%s)' % it, it is None, it)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'decode audio' not in x]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
