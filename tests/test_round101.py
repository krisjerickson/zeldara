"""Round 101: the last pixel art and the fixes found on the way (doc 53).
  - the Dev panel's painted-art switches are gone; a stored 'off' is ignored (?sprites=0 / ?scenery=0 stay for tests)
  - no emoji under painted buildings; a late scenery load repaints the chunks (cfg.scnV)
  - a boss far away fetches its painted pages and never shows the drawn stand-in
  - the world's region name hides inside sites
  - sky port: the galleon no longer breaks the formation's march; the formation stays on screen
  - the Lab: the recovered sound picks, the Painted & polish tab, the Mechanics guide
python tests/test_round101.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"
src = open(os.path.join(R, 'src', 'body.html'), encoding='utf-8').read()
check('The Dev panel has no painted sprites / scenery switches', 'sb-sprites' not in src and 'sb-scenery' not in src)
with game(painted=True, w=1280, h=720) as g:
    g.wait(3000)
    em = g.ws("ws.children.list.filter(o=>o.type==='Text'&&/🍺|🛒|⚒️|📜|🐎|⚔️|🧥|💍|🔮|🍞|📚/.test(o.text||'')).length")
    tot = g.ws("ws.children.list.filter(o=>o.type==='Text').length")
    check('No emoji drawn under the painted buildings (%d of %d texts)' % (em, tot), em == 0 and tot > 0, (em, tot))
    cfg = g.js("typeof ZWP!=='undefined'&&ZWP.cfg?ZWP.cfg():null")
    check('The paint jobs carry the scenery version (a late load repaints): %s' % (cfg and cfg.get('scnV')), cfg is not None and 'scnV' in cfg, cfg)
    g.js("%s.playerState.godMode=true" % WS)
    g.js("""(()=>{var ws=%s;var site=ws.wd.sites.find(s=>s.type==='dungeon'&&s.section===1); var mf=site.floors||3; ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:'dungeon',bossPhase:1});})()""" % WS)
    g.wait(6000)
    rp = g.js("document.getElementById('region-panel').style.visibility")
    check('Inside a dungeon the world\'s region name is hidden (%r)' % rp, rp == 'hidden', rp)
    b = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), out=null; var pp=CHX.ppos(S); var walk=function(L){ L.forEach(function(x){ if(x.list)walk(x.list); if(x._rig&&!out){ var R=x._rig, m=R.mon; out={far:m?Math.round(Math.hypot(pp.x-m.x,pp.y-m.y)):null, vis:x.visible, za:!!(m&&m._za), key:String(x.texture.key), st:ZAtlas.state(ZAtlas.monCh(m||{},x)||'')}; } }); }; walk(S.children.list); return out; })()""")
    check('A boss far away: its drawn stand-in is hidden and its painted pages are fetched (%s)' % b, b and (b['za'] or (not b['vis'] and b['st'] in ('ok', 'load'))), b)
    g.js("(()=>{ var S=game.scene.getScene('Dungeon'); S.scene.stop(); var ws=%s; ws.scene.wake('World'); })()" % WS); g.wait(1500)
    rp2 = g.js("document.getElementById('region-panel').style.visibility")
    check('Back in the world it shows again (%r)' % rp2, rp2 == '', rp2)
    g.js("(()=>{ var ws=%s; ws.playerState.unlockedSections=[1,2,3,4]; var s=ws.wd.sites.find(x=>x.type==='skyport'&&x.section===1); ws._enterSite(s); })()" % WS)
    g.wait(3000)
    g.js("(()=>{ var b=[...document.querySelectorAll('button')].find(x=>/launch|begin|start|defend|fly/i.test(x.textContent)&&x.offsetParent); if(b)b.click(); })()")
    g.wait(2000)
    g.js("(()=>{ var S=game.scene.getScene('Sky'); if(S)S.motherT=0; })()")
    xs = []
    for t in range(12):
        g.wait(1000)
        xs.append(g.js("(()=>{ var S=game.scene.getScene('Sky'); if(!S||!S.sys.isActive())return null; var al=S.enemies.filter(e=>!e.dead&&!e.mother&&!e.boss); return {mn:Math.min.apply(null,al.map(e=>e.cont.x)), mx:Math.max.apply(null,al.map(e=>e.cont.x)), W:S.W, mother:!!S._mother||S.enemies.some(e=>e.mother), nan:S.enemies.some(e=>!e.dead&&isNaN(e.cont.x))}; })()"))
    xs = [x for x in xs if x]
    ok = xs and all(x['mn'] >= 0 and x['mx'] <= x['W'] and not x['nan'] for x in xs) and any(x['mother'] for x in xs)
    check('Sky port: with the galleon crossing, the formation stays on screen for 12 s (%s)' % [(round(x['mn']), round(x['mx'])) for x in xs[::3]], ok, xs[-3:])
    st = g.js("(()=>{ localStorage.setItem('zeldara_sprites','off'); localStorage.setItem('zeldara_scenery','off'); return 1; })()")
    g.page.reload(); g.wait(4000)
    off = g.js("[typeof ZAtlas!=='undefined'&&ZAtlas.off, typeof ZScn!=='undefined'&&ZScn.off, localStorage.getItem('zeldara_sprites'), typeof sbSprites, typeof sbScenery]")
    check('A stored "off" no longer turns the paintings off, and is cleared (%s)' % off, off[0] is False and off[1] is False and off[2] is None and off[3] == 'undefined' and off[4] == 'undefined', off)
    check('No page errors', not [e for e in g.errs if '404' not in e and 'decode' not in e], g.errs[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript") if os.path.exists(PH) else r.abort())
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    k = pg.evaluate("[ZAUD.KEPT93.sfx_sword_swing, ZAUD.SRC101.sfx_sword_swing]")
    check('Sound picks recovered: sword swing keeps n2, l4, l6 (%s)' % k, all(x in k[0] for x in ('n2', 'l4', 'l6')) and k[1].get('n2'), k)
    pg.evaluate("LTODO.goTo('sfxpick','.s89-t',0)"); pg.wait_for_timeout(1500)
    r = pg.evaluate("""(()=>{ var tr=document.querySelector('.s89-r[data-id="sfx_sword_swing"]'); var n=[].slice.call(document.querySelectorAll('.s89-r')).map(function(t){ return t.querySelectorAll('.s89-k').length; });
      return {kept:tr?[].slice.call(tr.querySelectorAll('.s89-k.kept .s89-v')).map(function(b){ return b.dataset.k+(b.getAttribute('aria-pressed')==='true'?'★':''); }):null, min:Math.min.apply(null,n), rows:n.length, tag:tr?tr.querySelector('.s89-tag').textContent:''}; })()""")
    check('Lab → Sound effects: the recovered takes are shown ★ and every effect has at least 5 to choose from (%s)' % r, r['kept'] and all(x + '★' in r['kept'] for x in ('n2', 'l4', 'l6')) and r['min'] >= 5 and 'in the game' in r['tag'], r)
    pg.evaluate("LTODO.goTo('polish','#pz-lv',0)"); pg.wait_for_timeout(1500)
    t = pg.evaluate("""(()=>{ var n=function(){ var m=document.querySelector('.pz-mock[data-kind="hp"][data-id="teal"]'); return m?m.querySelectorAll('.pz-hp').length:0; }; var a=n(); var s=document.getElementById('pz-lv'); s.value=20; s.dispatchEvent(new Event('input',{bubbles:true})); var b2=n();
      return {a:a,b:b2, sec:document.querySelectorAll('.br-h, .sec-h, h3').length, shots:document.querySelectorAll('.pz-where').length, spells:document.querySelectorAll('.tl tbody tr').length, todo:LTODO.open().map(function(o){ return o.id; }).filter(function(i){ return /^pol|^guide/.test(i); })}; })()""")
    check('Lab → Painted & polish: the hearts grow with the level (%d → %d), 15 special shots, the open asks %s' % (t['a'], t['b'], t['todo']), t['b'] > t['a'] >= 3 and t['shots'] == 15 and len(t['todo']) >= 7, t)
    pg.evaluate("document.querySelector('.pz-pk[data-g=\"hp\"][data-id=\"teal\"]').click()"); pg.wait_for_timeout(200)
    v = pg.evaluate("(LabApp.picks['pol-hp_teal']||{}).verdict")
    check('A pick is kept (%s)' % v, v == 'pick', v)
    pg.evaluate("LTODO.goTo('guide','.gd-imp',0)"); pg.wait_for_timeout(1200)
    gd = pg.evaluate("({rows:document.querySelectorAll('.gd-t tbody tr').length, imp:document.querySelectorAll('.gd-imp tr').length})")
    check('Lab → Mechanics guide: %d mechanics, %d improvements' % (gd['rows'], gd['imp']), gd['rows'] >= 30 and gd['imp'] >= 12, gd)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
