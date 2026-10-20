"""Round 71 — the font, round two (Lab → Fonts: six gold, all-caps title pages beside today's), and THE LAST SAGA (doc 30 §15): the feast
hall after Solmyrk (walk in, Godsbane into the joined orbs, Odin and Freya free, the truth), the rune circle waiting for the gods, the gods at
the Bifröst, the village moment (lightning, vines, the land green), the celebration, the credits; the sandbox's new arc; the art ordered.
Run: python tests/test_round71.py"""
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
FAST = "ZCUT.HOLD=250; ZCINE.panel=function(id,cap,ms,cb){ if(cb)cb(); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    a = g.js("""(()=>{ var o={}; o.gods=['god_odin','god_freya'].filter(function(id){ return CHAR_BY_ID[id]&&CHAR_BY_ID[id].sub==='Gods'; }).length;
      o.sets=Object.keys(ZLAST_SETS).length; o.ids=ZLS.ids({hero:'f'}); o.both=o.ids.filter(function(i){ return /_f$/.test(i); }).length;
      o.scene=!!game.scene.getScene('FeastHall'); o.arc=SBSAGA.ARCS().some(function(A){ return A.name==='The last saga'&&A.rows.length===5&&A.rows.every(function(r){ return r.b.every(function(b){ return !b.todo; }); }); });
      o.glimpse=!!(ZSAGA_SETS.orbs&&ZSAGA_SETS.tattoo); o.fz2=ZBrand.FZ2.length;
      o.word=ZBrand.WORDMARK; o.faces=['Eagle Lake','Uncial Antiqua'].filter(function(f){ return document.fonts.check('400 20px "'+f+'"'); }).length; o.css=getComputedStyle(document.documentElement).getPropertyValue('--zf-label')+'|'+getComputedStyle(document.documentElement).getPropertyValue('--zf-title'); o.tags=(ZBrand.TAGLINES||[]).length; return o; })()""")
    check('Kris\'s pick is the title: %s, its faces in the game, carrying the labels and titles (%s); ten taglines to choose from' % (a['word'], a['css'][:60]), a['word'] == 'fz2_eag_unc' and a['faces'] == 2 and 'Eagle Lake' in a['css'] and 'Uncial' in a['css'] and a['tags'] == 10, a)
    check('Odin and Freya are characters; the last saga has %d panel sets (%d panels, the hero ones in both twins)' % (a['sets'], len(a['ids'])), a['gods'] == 2 and a['sets'] >= 12 and len(a['ids']) == 20 and a['both'] == 3 and a['scene'], a)
    check('The sandbox\'s Spirit saga has the new arc, every button working; the 30th and 40th glimpses exist; six new wordmarks', a['arc'] and a['glimpse'] and a['fz2'] == 6, a)
    f = g.js("""(async()=>{ %s %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; if(typeof ZFT!=='undefined')ZFT.on=false;
      ps.grimnirDown=1; ps.godsFree=0; ps.inventory.push('lodestar');
      // the rune circle points to the feast hall while the gods are bound
      var H=ZASG.heart(ws); ws.player.x=H.x; ws.player.y=H.y+10; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(1500); o.circle=ws._interactPrompt&&ws._interactPrompt.text||'';
      ZFEAST.enter(ws,'World'); await w(2500); var fh=game.scene.getScene('FeastHall'); o.on=game.scene.isActive('FeastHall'); o.worldAsleep=game.scene.isSleeping('World'); o.orbs=!!fh._orbIm; o.bg=!!fh._bgIm;
      // walk to the orbs and cast
      fh.bx=fh.ox; fh.by=fh.oy+110; fh.bCont.setPosition(fh.bx,fh.by); await w(600); o.prompt=fh.prompt.text; fh._cast();
      for(var i=0;i<60&&!ps.godsFree;i++){ await w(250); var z=document.getElementById('zcut'); if(z)z.click(); }
      o.free=ps.godsFree; await w(2500); for(var j=0;j<30&&!document.getElementById('fairy-talk');j++){ await w(250); var z2=document.getElementById('zcut'); if(z2)z2.click(); }
      o.gods=fh._gods?Object.keys(fh._gods).length:0; var ft=document.getElementById('fairy-talk'); o.talk=!!(ft&&ft.style.display!=='none'); o.line=ft?ft.textContent.slice(0,140):'';
      for(var k=1;k<6;k++)fh._talk(k); fh._goAhead(); o.told=ps.godsTold; await w(400);
      fh.by=ZFEAST.H; fh.update(0,16); await w(800); o.back=game.scene.isActive('World')&&!game.scene.isActive('FeastHall'); return o; })()""" % (W, FAST))
    check('While the gods are bound, the rune circle sends you to the feast hall (%s)' % f['circle'], 'feast hall' in f['circle'], f)
    check('The feast hall: a walk-in room with the joined orbs floating in it', f['on'] and f['worldAsleep'] and f['orbs'] and f['bg'], f)
    check('[Tab] at the orbs with the Lodestar casts Godsbane; they burst and Odin and Freya stand free (%s)' % f['prompt'], 'Godsbane' in f['prompt'] and f['free'] == 1 and f['gods'] == 2, f)
    check('They tell the truth about the twins, then go ahead to the heart of the city; you walk back out', f['talk'] and 'came' in f['line'] and f['told'] == 1 and f['back'], f)
    e = g.js("""(async()=>{ %s %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godsFree=1; ps.godsTold=1; ps.spiritsHome=0; ps.creditsSeen=0;
      var H=ZASG.heart(ws); ws.player.x=H.x; ws.player.y=H.y+10; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(1200); o.circle=ws._interactPrompt&&ws._interactPrompt.text||'';
      ZEND.play(ws); await w(2500); o.gods=ZEND._gods?Object.keys(ZEND._gods).length:0;
      for(var i=0;i<240&&!document.getElementById('zls-credits');i++){ await w(250); var z=document.getElementById('zcut'); if(z)z.click(); }
      o.credits=!!document.getElementById('zls-credits'); o.home=ps.spiritsHome; o.atVillage=Math.hypot(ws.player.x/TILE-CENTER_X,ws.player.y/TILE-CENTER_Y)<10;
      o.roll=document.getElementById('zls-credits')?document.querySelector('#zls-credits .zls-roll').textContent:''; if(ZLS._credEnd)ZLS._credEnd();
      for(var j=0;j<40&&!ps.creditsSeen;j++){ await w(250); var z2=document.getElementById('zcut'); if(z2)z2.click(); }
      await w(1500); o.seen=ps.creditsSeen; o.busy=!!ws._endBusy; o.seenSets=(ps.lastSeen||[]).join(','); return o; })()""" % (W, FAST))
    check('With the gods free, the circle is the Lodestar\'s again, and the gods stand by it (%s)' % e['circle'], 'Raise the Lodestar' in e['circle'] and e['gods'] == 2, e)
    check('After the Bifröst: the village moment — you are at the village, the land turns green (%s)' % e['seenSets'], e['atVillage'] and e['home'] == 1 and all(k in e['seenSets'] for k in ['gods_home', 'vil_lightning', 'vil_vines', 'vil_land', 'celebrate']), e)
    check('The credits roll (the spirits named), then the last picture, and you play on', e['credits'] and 'Kris Erickson' in e['roll'] and 'Asa' in e['roll'] and e['seen'] == 1 and not e['busy'], e)
    s = g.js("""(()=>{ var ps={spiritsFreed:new Array(30).fill('x'),sagaSeen:['gate']}, got=null, p0=ZSAGA.play, r0=ZSAGA.ready; ZSAGA.ready=function(){ return true; }; ZSAGA.play=function(ps,k){ got=k; return true; };
      var ws=game.scene.getScene('World'), c0=ZSPIRIT.count; ZSPIRIT.count=function(){ return 3; }; var fake={playerState:ps}; ZSAGA.afterTrace(fake,{q:1});
      return new Promise(function(r){ setTimeout(function(){ ZSAGA.play=p0; ZSAGA.ready=r0; ZSPIRIT.count=c0; r(got); },1200); }); })()""")
    check('The 30th spirit shows the two orbs in the dark (the 20th\'s gate already seen): %s' % s, s == 'orbs', s)
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
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html"); pg.wait_for_timeout(2000)
    t = pg.evaluate("LTODO.open().map(function(o){ return o.id; }).concat(LTODO.RETIRED||[])")
    pg.evaluate("LTODO.goTo('zfonts','.zf-one',0)"); pg.wait_for_timeout(2500)
    n = pg.evaluate("document.querySelectorAll('.zf-one canvas.br-cv[data-id^=\"pg_\"]').length"); ntg = pg.evaluate("document.querySelectorAll('.zf-one canvas.br-cv[data-id^=\"tg_\"]').length")
    lit = []
    for i in ['pg_current', 'pg_fz2_uncial', 'pg_fz2_eag_unc']:
        pg.evaluate("document.querySelector('canvas.br-cv[data-id=\"%s\"]').scrollIntoView()" % i); pg.wait_for_timeout(1500)
        lit.append(pg.evaluate("(()=>{ var c=document.querySelector('canvas.br-cv[data-id=\"%s\"]'), d=c.getContext('2d').getImageData(c.width*0.3|0,c.height*0.4|0,c.width*0.4|0,c.height*0.3|0).data, n=0; for(var i=0;i<d.length;i+=16)if(d[i]>200&&d[i+1]>150&&d[i+2]<140)n++; return n; })()" % i))
    check('Lab → Fonts opens with today\'s title page and the six new ones, whole pages with the gold lettering (%s); and the eleven tagline pages; it asks for a tagline' % lit, n == 7 and ntg == 11 and all(x > 300 for x in lit) and 'taglines' in t, (n, ntg, lit, t))
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
