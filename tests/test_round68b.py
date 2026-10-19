"""Round 68b — the soul-lines in the game (Kris: "Straight into the game"): the World-Tree drawn as the rune vein into the ground chunks,
the trace + pull-back on freeing a spirit, the motes, the map page (newest glowing, ghosts at 8/10), the paths after the gods, the hamlets
in the rings; the ground's paint queue (the black screen); the Lab's "Soul-lines in the game" tab.
Run: python tests/test_round68b.py"""
import re, os, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; if(typeof ZFT!=='undefined')ZFT.on=false;
      var D=ZSLW.data(ws), S=ZSPIRIT.shrines(ws); o.zones=D.G.Z.length; o.pieces=D.reach.filter(function(r){ return r>12; }).length; o.X=D.X.length; o.runes=D.runes.length; o.idx=Object.keys(D.idx).length;
      var s=S[0]; ws.player.x=s.x+60; ws.player.y=s.y+40; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(2500);
      ZSPIRIT.free(ws,s); o.seen0=ps.slSeen.indexOf(s.id); o.mapNew=ps.slMapNew; await w(300); FairyTalk.close(); await w(2600); o.tracing=!!ws._zslT; o.zoomOut=ws.cameras.main.zoom<1.39;
      await w(5000); o.seen1=ps.slSeen.indexOf(s.id)>=0; o.ch=Object.keys(ws._zslC.m).length; o.sig=Object.keys(ws._zslC.m).map(function(k){ return ws._zslC.m[k].sig; })[0]||'';
      o.motes=ws._zslM?ws._zslM.p.filter(function(m){ return m.im.visible; }).length:0; o.zoomBack=Math.abs(ws.cameras.main.zoom-1.4)<0.02;
      // a spirit freed far away waits (map page flash), and traces when you walk near
      var f=S[30]; ZSPIRIT.free(ws,f); FairyTalk.close(); o.pend=ZSLW.pending(ws).indexOf(f.id)>=0; o.mapNew2=ps.slMapNew===f.id; await w(1200); o.notYet=!ws._zslT;
      ws.player.x=f.x+60; ws.player.y=f.y+40; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(2500); o.nearTrace=!!ws._zslT||ps.slSeen.indexOf(f.id)>=0;
      // an old save: what was freed before soul-lines counts as already drawn
      var ps2={spiritsFreed:['a','b']}; o.old=ZSLW.seen(ps2).length;
      // the map: a realm at 8/10 shows its missing pieces as ghosts
      var g1=S.filter(function(q){ return q.q===2; }).slice(0,8).map(function(q){ return q.id; }); ps.spiritsFreed=ps.spiritsFreed.concat(g1); ps.slSeen=ps.slSeen.concat(g1);
      var cv=document.createElement('canvas'); cv.width=cv.height=600; var calls=0, ctx=cv.getContext('2d'), sd=ctx.setLineDash.bind(ctx); ctx.setLineDash=function(a){ if(a&&a.length)calls++; sd(a); };
      ZSLW.drawMap(ctx,{x:0,y:0,w:1200,h:1200},0.5,ws,{full:true}); o.ghostPass=calls>0;
      // after the gods: paths of grass and stone, no motes; the hamlets stand in the rings
      ps.spiritsHome=1; ws.player.x=s.x+40; ws.player.y=s.y+160; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(3500);
      o.green=Object.keys(ws._zslC.m).some(function(k){ return ws._zslC.m[k].sig.indexOf('green')===0; }); o.motesOff=!ws._zslM||ws._zslM.p.every(function(m){ return !m.im.visible; });
      o.ham=(ws._zslH[s.id]||[]).length; o.trade=ZSLW.tradeId(s);
      o.qmax=typeof WP_QMAX!=='undefined'?WP_QMAX:null; o.busy=_WPW.pool.map(function(x){ return x._busy; }); o.under=!!(ws._wrUnder&&ws._wrUnder.scene);
      return o; })()""" % W)
    check('The World-Tree is cut into 40 pieces, one per runestone (%d zones, %d pieces, %d crossings woven, %d runes)' % (r['zones'], r['pieces'], r['X'], r['runes']), r['zones'] == 40 and r['pieces'] == 40 and r['idx'] == 40 and r['X'] > 100 and r['runes'] > 1000, r)
    check('Freeing a spirit near its stone traces its piece while the camera eases back', r['seen0'] < 0 and r['tracing'] and r['zoomOut'], r)
    check('…then the piece is in the ground pictures, motes run along it, and the camera comes back (%d chunks, %d motes)' % (r['ch'], r['motes']), r['seen1'] and r['ch'] > 0 and r['sig'].startswith('vein') and r['motes'] > 5 and r['zoomBack'], r)
    check('A spirit freed far away waits, glowing on the map, and traces when you walk near (answer G2)', r['pend'] and r['mapNew2'] and r['notYet'] and r['nearTrace'], r)
    check('Spirits freed before this round count as already drawn (old saves)', r['old'] == 2, r)
    check('The map page shows faint dotted ghosts once a realm is 8/10 freed', r['ghostPass'], r)
    check('After the gods the lines become paths of grass and stone, and the motes stop', r['green'] and r['motesOff'], r)
    check('The hamlet stands in the ring after the gods (%d pieces; its workshop: %s)' % (r['ham'], r['trade']), r['ham'] >= 4 and r['trade'].startswith('hw_'), r)
    check('The ground painter never queues more than 2 fields per worker (the black screen) and the land shows under chunks still painting (busy %s)' % r['busy'], r['qmax'] == 2 and all(b <= 2 for b in r['busy']) and r['under'], r)
    z = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; var pt=ZCUT.painted; ZCUT.on=true;
      o.notYet=ZSAGA.ready('realm4'); ZCUT.painted=function(id){ return /^pn_saga_/.test(id)?'data:image/gif;base64,R0lGODlhAQABAAAAACw=':pt(id); };
      ps.sagaSeen=[]; o.first=ZSAGA.play(ps,'realm4'); o.open=ZCUT.isOpen(); o.again=ZSAGA.play(ps,'realm4'); var el=document.getElementById('zcut'); if(el)el.remove();
      var q4=ZSPIRIT.shrines(ws).filter(function(s){ return s.q===4; }); ps.spiritsFreed=q4.map(function(s){ return s.id; }); ps.sagaSeen=[]; var called=null, p0=ZSAGA.play; ZSAGA.play=function(ps,k){ called=k; return true; };
      ZSAGA.afterTrace(ws,q4[0]); return new Promise(function(r){ setTimeout(function(){ o.realm=called; ZSAGA.play=p0; ZCUT.painted=pt; ZCUT.on=false; r(o); },1200); }); })()""")
    check('The saga panels play once each, only when painted: the Ashlands\' tenth spirit tells the Ash Night (%s)' % z, (not z['notYet']) and z['first'] and z['open'] and not z['again'] and z['realm'] == 'realm4', z)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html"); pg.wait_for_timeout(1500)
    t = pg.evaluate("LTODO.open().map(function(o){ return o.id; })")
    check('"Waiting for your picks" asks for the runestone ring (%s)' % t, 'soulgame' in t)
    pg.evaluate("LTODO.goTo('soulgame','.sg-bar',0)"); pg.wait_for_timeout(4000)
    lit = []
    for sel in range(2):
        pg.evaluate("[...document.querySelectorAll('.sl-grid')][%d].scrollIntoView()" % sel); pg.wait_for_timeout(3000)
        lit += pg.evaluate("""[...document.querySelectorAll('.sl-grid')][%d].querySelectorAll('canvas').length ? [...[...document.querySelectorAll('.sl-grid')][%d].querySelectorAll('canvas')].map(function(c){ var d=c.getContext('2d').getImageData(0,0,c.width,c.height).data, n=0; for(var i=0;i<d.length;i+=64)if(d[i+2]>200&&d[i+1]>200)n++; return n; }) : []""" % (sel, sel))
    check('The "Soul-lines in the game" tab draws the reveal, three rings, the map and after the gods (%s)' % lit, len(lit) == 6 and sum(1 for n in lit[:5] if n > 10) == 5, lit)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
