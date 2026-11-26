"""Round 133: the waystone fairies speak (src/npcs → ZNPC, 21w4), the mage-tower scene after the fight, the Lab's "written so far".
python tests/test_round133.py   (after node build.mjs)"""
import sys, os, re, json, subprocess; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
out = subprocess.run([sys.executable, os.path.join(R, 'tools', 'voices', 'build_npcs.py')], capture_output=True, text=True)
check('The NPC stories build: no repeated line, no god named before the end (%s)' % out.stdout.strip().split('\n')[-1], out.returncode == 0, out.stdout[-400:])
src = open(os.path.join(R, 'src', 'js', '21w4-0-npc-lines.js'), encoding='utf-8').read()
Z = json.loads(src.split('var ZNPC=', 1)[1].rstrip().rstrip(';'))
F = [k for k, v in Z.items() if v['group'] == 'fairies']
check('20 fairies, five a realm, each keeping two spirits of her own realm', len(F) == 20 and all(len(Z[k]['spirits']) == 2 for k in F) and sorted(Z[k]['realm'] for k in F) == [1]*5 + [2]*5 + [3]*5 + [4]*5)
check('16 mage-tower masters, each with a scene ordered (sc_pn_mg_*)', len([k for k in Z if Z[k]['group'] == 'mages' and Z[k].get('scene')]) == 16 and len(open(os.path.join(R, 'sprites', 'requests', 'r133_scenes.txt')).read().split('sc_pn_mg_')) == 17)
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js("ZNPCT.on=true; ZMSCENE.on=true;")
    a = g.js("""(()=>{ var ws=%s, f=ws._fairies.find(x=>x.q===1&&x.i===0), ps=ws.playerState; ps.spiritsFreed=[]; ps.npcHeard={}; var k=ZNPCT.fairy(f);
      var L1=ZNPCT.line(ws,k), b=ZNPCT.bound(ws,ps,ZNPC[k].spirits); var S=ZSPIRIT.shrines(ws); ZNPC[k].spirits.forEach(function(nm){ var s=S.find(x=>x.spirit===nm); if(s)ps.spiritsFreed.push(s.id); });
      var b2=ZNPCT.bound(ws,ps,ZNPC[k].spirits); ps.npcHeard={}; var seen={}; for(var i=0;i<12;i++){ var t=ZNPCT.line(ws,k); seen[t]=1; }
      var hasAfter=ZNPC[k].lines.after.some(t=>seen[t]), hasBefore=ZNPC[k].lines.before.some(t=>seen[t]);
      return {k:k, b:b, b2:b2, hasAfter:hasAfter, hasBefore:hasBefore, n:Object.keys(seen).length}; })()""" % WS)
    check('Primrose keeps Asa and Bersi: while bound she talks of them; once free, of them free — never her "before" lines then; no repeats (%s)' % a, a['k'] == 'primrose' and a['b'] == ['Asa', 'Bersi'] and a['b2'] == [] and a['hasAfter'] and not a['hasBefore'] and a['n'] >= 11, a)      # (11 lines open to her once they are free in Gildenmark's first part)
    t = g.js("""(()=>{ var ws=%s, f=ws._fairies.find(x=>x.q===1&&x.i===2); ws._talkFairy(f); var el=document.getElementById('fairy-talk'); return {open:el&&el.style.display, txt:el&&el.textContent.slice(0,200), btn:[...el.querySelectorAll('.ft-btns button')].map(b=>b.textContent)}; })()""" % WS)
    check('Tab at a fairy with no lesson for you: she talks, with "Tell me more" (%s)' % t, t['open'] == 'flex' and 'Tell me more' in t['btn'], t)
    g.js("FairyTalk.close()")
    m = g.js("(()=>{ var ps=%s.playerState; MageRun.learn(ps,'sky_storm_tome'); var d=document.querySelector('.zmage-scene'); return {d:!!d, txt:d&&d.textContent.slice(0,160)}; })()" % WS)
    check('A mage-tower master beaten: the scene of who they were, with their words (%s)' % m, m['d'] and 'Quillon' in m['txt'] and 'before the dark' in m['txt'], m)
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
    pg.evaluate("LTODO.goTo('npcs2','.ns-c',0)"); pg.wait_for_timeout(700)
    c = pg.evaluate("({rows:document.querySelectorAll('.ns-t tr').length, reads:document.querySelectorAll('.ns-one').length, hm:/only appear after the end/.test((document.querySelector('.ns-hm')||{}).textContent||'')})")
    check('Lab → Backstories: "written so far" — nine groups, 36 stories to read, the hamlets answered (%s)' % c, c['rows'] == 10 and c['reads'] >= 36 and c['hm'], c)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
