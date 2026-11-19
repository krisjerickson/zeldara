"""Round 114b: your bed — taught once two hearts are gone and the fight is over, and Oswin's own version after your first fall; the Lab's
  "Missing lessons" review. Kris: "sleeping in your bed to fully restore your health. This can be a pop-up once you've lost your first 2 hearts.
  It should also not pop-up until your out of combat. If you die, it can be a different pop-up that explains that you can heal by sleeping."
python tests/test_round114b.py   (after node build.mjs)"""
import sys, os, re; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
SETUP = """var ws=%s, ps=ws.playerState; ZLES.on=true; ZDLG.on=true; ps._lesInit=1; ps.lessonsOff=0; var S=ZLES.seen(ps); delete S.bed; delete S.bed_fall; ps.slept=0; ZLES._died=0; ZLES._dT=0; ZLES._lastT=0; ps.lesQ=[];
  var said=[], d0=ZDLG.say; ZDLG.say=function(w,l){ said.push(l); }; """ % WS
with game(painted=True) as g:
    g.wait(3000)
    a = g.js("(()=>{ " + SETUP + """ var mx=ps.maxHp, per=ZLES.per(mx); ps.hp=mx-Math.round(per*2.5); ZLES._hp=ps.hp; ZLES._hurtT=0;
      var m={x:ws.player.x+40,y:ws.player.y,state:'chase',aggro:true,dead:false}; ws.worldMonsters.push(m); ZLES.tick(); var inFight=!!S.bed;
      m.dead=true; ZLES._hurtT=Date.now(); ZLES.tick(); var justHit=!!S.bed; ZLES._hurtT=0; ZLES.tick(); var calm=!!S.bed;
      ZDLG.say=d0; ps.hp=mx; return {inFight:inFight, justHit:justHit, calm:calm, said:said.length&&said[0]}; })()""")
    check('Two hearts gone: no bed lesson mid-fight, nor right after a hit — then, once calm, Oswin tells you about your bed (%s)' % a,
          a['inFight'] is False and a['justHit'] is False and a['calm'] is True and 'bed' in (a['said'] or ''), a)
    b = g.js("(()=>{ " + SETUP + """ var mx=ps.maxHp; ps.hp=mx-10; ZLES._hp=ps.hp; ZLES._hurtT=0; ZLES.tick(); var one=!!S.bed; ps.hp=mx; ZDLG.say=d0; return {one:one}; })()""")
    check('One heart gone is not enough (%s)' % b, b['one'] is False, b)
    c = g.js("(()=>{ " + SETUP + """ ps.slept=1; var mx=ps.maxHp; ps.hp=mx-40; ZLES._hp=ps.hp; ZLES._hurtT=0; ZLES.tick(); var r=!!S.bed; ps.hp=mx; ps.slept=0; ZDLG.say=d0; return {after_sleeping:r}; })()""")
    check('Not shown if you have already slept in your bed (%s)' % c, c['after_sleeping'] is False, c)
    d = g.js("(()=>{ " + SETUP + """ ZLES._died=1; ZLES._hurtT=0; ZLES.tick(); var first=!!S.bed_fall; ZLES._dT=Date.now()-2000; ZLES.tick(); ZDLG.say=d0;
      return {wait:first, fall:!!S.bed_fall, bed:!!S.bed, said:said.join(' ').slice(0,80)}; })()""")
    check('After your first fall: a moment later, Oswin\'s own "go home to bed" (and the first bed lesson is then not needed) (%s)' % d,
          d['wait'] is False and d['fall'] and d['bed'] and 'fell' in d['said'], d)
    e = g.js("""(()=>{ var L=ZLES.byId('rest'), B=ZLES.byId('bed'), F=ZLES.byId('bed_fall'); return {rest:L&&L[5], bed:!!B&&B[3]===1, fall:!!F&&F[3]===1, n:ZLES.L.length}; })()""")
    check('The tavern has its own lesson now; both bed lessons are shown on every difficulty (%s)' % e, e['bed'] and e['fall'] and 'tavern' in e['rest'] and 'bed' not in e['rest'].lower() and e['n'] == 40, e)
    # round 114c — Kris ✓ the rules: lessons wait until the fight is over (except the fight ones) and come one at a time
    r = g.js("(()=>{ " + SETUP + """ delete S.camp; delete S.potion; delete S.shield; ZLES._hurtT=0; ZLES._hp=ps.hp;
      var m={x:ws.player.x+40,y:ws.player.y,state:'chase',aggro:true,dead:false}; ws.worldMonsters.push(m);
      ZLES.teach('camp'); var inFight={shown:!!S.camp, queued:(ps.lesQ||[]).slice()};
      ZLES.teach('shield'); var fight=!!S.shield;
      m.dead=true; ZLES._lastT=0; ZLES.tick(); var afterCalm=!!S.camp;
      ZLES.teach('potion'); var tooSoon=!!S.potion, q=(ps.lesQ||[]).slice(); ZLES._lastT=Date.now()-21000; ZLES.tick(); var later=!!S.potion;
      ZDLG.say=d0; return {inFight:inFight, fight:fight, afterCalm:afterCalm, tooSoon:tooSoon, q:q, later:later, said:said.length}; })()""")
    check('Lessons wait until the fight is over (queued, then shown in order); the shield lesson still comes mid-fight; one at a time, 20 s apart (%s)' % r,
          r['inFight']['shown'] is False and 'camp' in r['inFight']['queued'] and r['fight'] and r['afterCalm'] and r['tooSoon'] is False and 'potion' in r['q'] and r['later'], r)
    g.js("ZLES.on=false")

from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('trainrev','.tr-c',0)"); pg.wait_for_timeout(1500)
    t = pg.evaluate("""({cards:document.querySelectorAll('.tr-c').length, says:document.querySelectorAll('.tr-say').length, important:document.querySelectorAll('.tr-p').length, todo:LTODO.L.some(x=>x.id==='trainrev')})""")
    check('Lab → Missing lessons: the bed lessons to check, two rules, and the mechanics never taught, each with when, who and the words (%s)' % t, t['cards'] >= 20 and t['says'] >= 18 and (t['todo'] or 'trainrev' in pg.evaluate('LTODO.RETIRED')), t)      # round 117: picked, so retired from the asks
    pg.locator('.tr-c').nth(3).screenshot(path='/tmp/claude-0/lab_train.png')
    pg.evaluate("LTODO.goTo('series','.ss-tops',0)"); pg.wait_for_timeout(1500)
    s = pg.evaluate("""({next:!!document.querySelector('.ss-next'), opening:ZSS.AUTO.some(r=>r.scene==='opening'), cmd:[].slice.call(document.querySelectorAll('.ss-planT code')).slice(0,1).map(c=>c.textContent)[0]})""")
    check('Shot series: the opening left out (it will be a real video), the next steps spelt out, and the lists numbered as on disk (%s)' % s, s['next'] and not s['opening'] and 'r114_02_spirit' in (s['cmd'] or ''), s)
    check('No Lab script errors', not errs, errs[:3])
    b.close()
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
