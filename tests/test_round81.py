"""Round 81 — the twin's library (16v-twin-library.js, 07l, 05 worldgen, 10zt) and picking the gentle sounds (Lab → Music & sound,
tools/audio/eth_preview.py, pick_sounds.py). Run: python tests/test_round81.py"""
import os, sys, re, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game(painted=True) as g:
    g.wait(2500)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, b=ws.buildings.find(b=>b.type==='library'), h=ws.buildings.find(b=>b.type==='house');
      var ov=[]; ws.buildings.forEach(function(a){ if(a===b)return; if(a.dx<b.dx+b.w&&b.dx<a.dx+a.w&&a.dy<b.dy+b.h&&b.dy<a.dy+a.h)ov.push(a.type); });
      var door=ws.tiles[CENTER_Y+b.dy+b.h-1][CENTER_X+b.dx+2]===T.DOOR, step=[0,1].every(function(j){ var t=ws.tiles[CENTER_Y+b.dy+b.h+j][CENTER_X+b.dx+2]; return canPassTile(t,null); });
      var st={}; [1,5].forEach(function(s){ villageApply(ws.wd,s); st[s]=ws.wd.props.filter(function(p){ return p.prop==='vbuild'&&p.o&&p.o.core==='library'; }).length; });
      return {b:[b.dx,b.dy,b.name], dist:Math.hypot(b.dx+2-(h.dx+2),b.dy+b.h-(h.dy+h.h)), ov:ov, door:door, step:step, st:st, pid:VB_PAINTED.library, outside:!!ws._twin, where:ZTWIN.where(ps,ws)}; })()""")
    check('The library stands in the village near your Home (%s, %.1f tiles from its door), its own ground, a door with open ground in front, at every stage' % (r['b'], r['dist']),
          r['b'][2] == 'The Library' and r['dist'] < 12 and not r['ov'] and r['door'] and r['step'] and r['st'] == {'1': 1, '5': 1} and r['pid'] == 'vb_library_a', r)
    check('By day the twin is not outside the Home any more — they are in the library', not r['outside'] and r['where'] == 'library', r)
    g.js("(()=>{ var ws=game.scene.getScene('World'), b=ws.buildings.find(b=>b.type==='library'); ws.player.x=b.worldX+2*TILE+16; ws.player.y=b.worldY+(b.h)*TILE+8; })()"); g.wait(600)
    pr = g.js("(()=>{ var ws=game.scene.getScene('World'); return ws._interactPrompt&&ws._interactPrompt.text; })()")
    check('At its door: "%s"' % pr, pr and 'Library' in pr)
    def inside(kind, night, x, y):
        g.js("(n=>{ var ws=game.scene.getScene('World'); ws._forceNight=n; ws._night=n; ws._enterBuilding(ws.buildings.find(b=>b.type==='%s')); })(%d)" % (kind, night)); g.wait(2200)
        g.js("(()=>{ var s=game.scene.getScene('Building'); s.bx=%s*TILE; s.by=%s*TILE; })()" % (x, y)); g.wait(500)
        o = g.js("""(()=>{ var s=game.scene.getScene('Building'), m=s._imap; return {name:m.theme.name, here:m.twinHere, tb:m.twinBed, p:s.interactPrompt.visible&&s.interactPrompt.text, n:m.sprites.length, pids:INTERIOR_LAYOUTS['%s'].props.map(function(p){ return p[5]&&p[5].pid; }).filter(Boolean)}; })()""" % kind)
        return o
    d = inside('library', 0, 3, 6.6)
    check('Inside by day: the twin at their desk, [Tab] talks to them (%s)' % d['p'], d['name'] == 'The Library' and d['here'] and d['p'] == '[Tab] Talk to Zeldara' and 'twin_study_f' in d['pids'] and 'if_saga_lectern' in d['pids'] and d['n'] > 15, d)
    t = g.js("""(()=>{ var s=game.scene.getScene('Building'), got=null, z0=ZSPIRIT.talk, ps=s.worldScene.playerState; ps.inventory=(ps.inventory||[]).concat(['lodestar']); ps.godsbane=0;
      var c0=ZCUT.painted; ZCUT.painted=function(){ return false; }; ZSPIRIT.talk=function(n,c,h,opts){ got={n:n,opts:(opts||[]).map(function(o){ return o.t; })}; }; try{ s._npcInteract(); }finally{ ZSPIRIT.talk=z0; ZCUT.painted=c0; } return got; })()""")
    check('With the Lodestar in hand, the twin in the library teaches Godsbane (%s)' % t, t and t['n'] == 'Zeldara' and '✦ Godsbane' in t['opts'], t)
    g.js("(()=>{ game.scene.getScene('Building')._exitBuilding(); })()"); g.wait(700)
    h = inside('house', 0, 6, 5.8)
    check('Your Home has a second bed — empty by day', h['tb'] and not h['tb']['asleep'] and 'if_bed_twin' in h['pids'] and not h['p'], h)
    g.js("(()=>{ game.scene.getScene('Building')._exitBuilding(); })()"); g.wait(700)
    h2 = inside('house', 1, 6, 5.8)
    check('At night the twin sleeps in it (%s) — and the Lodestar wakes them for the lesson' % h2['p'], h2['tb']['asleep'] and 'twin_sleep_f' in h2['pids'] and h2['p'] == '[Tab] Wake Zeldara', h2)
    g.js("(()=>{ game.scene.getScene('Building')._exitBuilding(); })()"); g.wait(700)
    n = inside('library', 1, 7, 5)
    check('At night the library\'s desk is empty and the lectern reads the old sagas (%s)' % n['p'], not n['here'] and n['p'] == '[Tab] Read the saga', n)
    g.js("(()=>{ game.scene.getScene('Building')._exitBuilding(); })()"); g.wait(700)
    o = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ws._forceNight=0; ws._night=0; ps.spiritsHome=1; ZTWIN.tick(); return new Promise(function(res){ setTimeout(function(){ ZTWIN.tick(); res({out:!!ws._twin, where:ZTWIN.where(ps,ws), npc:(ws._villageNPCs||[]).some(function(n){ return n.id==='vf_twin'; })}); },600); }); })()""")
    check('After the end, by day, the twin is out with everyone again', o['out'] and o['where'] == 'out' and o['npc'], o)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x]
    check('No game script errors', not errs, errs[:3])
E = json.load(open(os.path.join(R, 'lab', 'preview', 'audio', 'eth.json')))
check('The gentle sounds are joined for the Lab: %d effects, all with both options' % len(E['items']), len(E['items']) >= 147 and all('e1' in v and 'e2' in v for v in E['items'].values()) and all(os.path.isfile(os.path.join(R, 'lab', 'preview', 'audio', 'eth_%s.mp3' % k)) for k in ('cur', 'e1', 'e2')))
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript") if os.path.exists(PH) else r.abort())
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('audio','.sfp-t',0)"); pg.wait_for_timeout(1500)
    t = pg.evaluate("""(()=>({rows:document.querySelectorAll('.sfp-r').length, plays:document.querySelectorAll('.sfp-play').length, todo:LTODO.open().map(function(o){ return o.id; })}))()""")
    check('Lab → Music & sound: a row per effect (%d) with today\'s take where there is one and both options to play' % t['rows'], t['rows'] >= 147 and t['plays'] >= 147 * 2 + 60 and 'sfxpick' in t['todo'] and 'library' in t['todo'], t)
    pg.evaluate("document.querySelector('.sfp-r[data-id=\"sfx_page\"] .sfp-play[data-k=\"e1\"]').click()"); pg.wait_for_timeout(2500)
    pl = pg.evaluate("(()=>{ var b=document.querySelector('.sfp-r[data-id=\"sfx_page\"] .sfp-play[data-k=\"e1\"]'); return b.className+' '+b.textContent; })()")
    pg.evaluate("document.querySelector('.sfp-r[data-id=\"sfx_page\"] .sfp-v[data-v=\"both\"]').click()"); pg.wait_for_timeout(300)
    k = pg.evaluate("(()=>({v:(LabApp.picks['sfxpick-sfx_page']||{}).verdict, n:document.getElementById('sfp-n').textContent, done:document.querySelector('.sfp-r[data-id=\"sfx_page\"]').classList.contains('done')}))()")
    check('▶ plays a piece of the joined file (%s); a pick is kept (%s)' % (pl.strip(), k), 'not found' not in pl and k['v'] == 'both' and k['done'] and k['n'].startswith('1 of'), (pl, k))
    pg.evaluate("LTODO.goTo('library','.br-grid',0)"); pg.wait_for_timeout(2500)
    lc = pg.evaluate("document.querySelectorAll('canvas.br-cv[data-tab=\"library\"]').length")
    check('Lab → Library: the two paintings of the saga-hall to ☆ (%d)' % lc, lc == 2)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
