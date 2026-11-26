"""Round 136: the stinger picks (effects, the fall's stinger), the seasons on the land and the festival dressings, the forty spirits talk on
the Green, the take-5 pictures in the Lab.   python tests/test_round136.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
src = open(os.path.join(R, 'src', 'js', '21w4-0-npc-lines.js'), encoding='utf-8').read()
Z = json.loads(src.split('var ZNPC=', 1)[1].rstrip().rstrip(';'))
S = [k for k, v in Z.items() if v['group'] == 'spirits']
check('The forty spirits: five lines each, ten from each realm (%d)' % len(S), len(S) == 40 and all(len(Z[k]['lines'].get('life', [])) == 5 for k in S) and sorted(Z[k]['realm'] for k in S) == [1]*10 + [2]*10 + [3]*10 + [4]*10)
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("['ZEV','ZDAY','ZFEST','ZSLAND','ZSPT','ZECHO'].forEach(function(k){ if(window[k])window[k].on=true; });")
    a = g.js("(()=>{ var q=ZAUDIO.play('st_quest'), b=ZAUDIO.play('st_boss_down'); var ws=%s, ps=ws.playerState; ZAHOOK.last.sfx_camp=0; _completeQuest(ps,'zz_test_quest'); return {q:q, b:b, keep:ZSTING.ok('st_death'), camp:ZAHOOK.last.sfx_camp>0||!ZAUDIO.has('sfx_camp')}; })()" % WS)
    check('Stingers stay silent except the fall; a quest done plays the fanfare (%s)' % a, a['q'] is False and a['b'] is False and a['keep'] and a['camp'], a)
    l = g.js("(()=>{ var ws=%s, ld=s=>new Promise(r=>{ ZSEASON.force=s; ZSEASON.set(s); ZSEASON.loadArt(()=>setTimeout(r,200)); }); return ld('au').then(()=>{ ZSLAND.tick(); var au=(ws._zsl||[]).length, ids=(ws._zsl||[]).map(o=>o.texture.key); ZSEASON.force='su'; ZSEASON.set('su'); ZSLAND.tick(); var su=(ws._zsl||[]).length; return ld('wi').then(()=>{ ZSLAND.tick(); return {au:au, su:su, wi:(ws._zsl||[]).length, harvest:ids.some(k=>/lh_/.test(k))}; }); }); })()" % WS)
    check('The land in each season: the harvest in autumn, Yule in winter, summer as it is (%s)' % l, l['au'] >= 8 and l['wi'] >= 8 and l['su'] == 0 and l['harvest'], l)
    d = g.js("(()=>{ ZSEASON.force=null; var ws=%s, ps=ws.playerState; ps.seasNow='wi'; ps.seasStart=Math.floor(ps.gday||0); ZSLAND.tick(); var n=(ws._zsd||[]).length, ids=(ws._zsd||[]).map(o=>o.texture.key); ps.seasStart=-10; ZSLAND.tick(); return {n:n, yule:ids.some(k=>/fd_wi_/.test(k)), after:(ws._zsd||[]).length}; })()" % WS)
    check('Festival days dress the village doors; they come down after (%s)' % d, d['n'] >= 4 and d['yule'] and d['after'] == 0, d)
    t = g.js("""(()=>{ var ws=%s, ps=ws.playerState, S=ZSPIRIT.shrines(ws); ps.spiritsFreed=S.slice(0,3).map(s=>s.id); ps.npcHeard={}; var C=ZFEST.centre(ws); ws.player.x=C.x-2*TILE; ws.player.y=C.y-TILE; Z3.tab=null; ZSPT.tick(); var tab=!!Z3.tab; ZSPT.talk(); var el=document.getElementById('fairy-talk'); var r={tab:tab, open:el&&el.style.display, who:el&&el.querySelector('.ft-name').textContent, txt:el&&el.querySelector('.ft-text').textContent}; FairyTalk.close(); return r; })()""" % WS)
    check('By the Green\'s stone, [Tab] and a freed spirit talks about their own town (%s)' % t, t['tab'] and t['open'] == 'flex' and t['who'] and len(t['txt'] or '') > 30, t)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('worldlook5','.w4-c',0)"); pg.wait_for_timeout(700)
    c = pg.evaluate("({ban:[...document.querySelectorAll('.w5-bp img')].filter(i=>/_blob/.test(i.getAttribute('src'))).length, lm:[...document.querySelectorAll('.w5-two img')].filter(i=>/_blob/.test(i.getAttribute('src'))).length})")
    check('Lab → The world, revamped 5: the 20 banners and 4 landmarks (today and repainted) from the asset store (%s)' % c, c['ban'] == 20 and c['lm'] == 8, c)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
