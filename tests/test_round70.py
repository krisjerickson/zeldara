"""Round 70 — a mixed Runeheim and the children (Kris: "we need to get more mixed race for the NPCs and groups in the scenes … We also need
to come up with children to populate the world after the spirit cycle has begun again"), and round 70b — a better font (the Lab's Fonts tab).
Run: python tests/test_round70.py"""
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
    r = g.js("""(()=>{ var o={}; o.kids=ZKIDS.L.length; o.chars=ZKIDS.L.filter(function(K){ return CHAR_BY_ID[K[0]]&&CHAR_BY_ID[K[0]].kid; }).length;
      o.mixed=ZKIDS.L.filter(function(K){ return K[4]>=0&&K[4]<10&&ZHERIT.LOOKS[K[4]][0].indexOf('white')<0; }).length;
      o.kin=ZHAM.KIN.filter(function(K,i){ return !!CHAR_BY_ID[ZHAM.kinId(i)].heritage; }).length; o.vill=ZHERIT.VILLAGE.filter(function(id){ return CHAR_BY_ID[id]&&CHAR_BY_ID[id].heritage; }).length;
      var sp=(typeof ZSPR!=='undefined'&&ZSPR.list?ZSPR.list():[]); o.look=(ZSPR.byId?((ZSPR.byId('hk_'+ZHAM.KIN[1][0]+'.core.f')||{}).look||''):'');
      var sets={}; for(var n=0;n<40;n++){ var t=[1,2,3].map(function(j){ return ZHAMW.home(null,n,j); }); sets[t.sort().join()]=1; } o.homes=Object.keys(sets);
      o.pool=ZKIDW.pool().length; o.k3=ZKIDW.kidsFor(3).length; o.k4=ZKIDW.kidsFor(4).length; return o; })()""")
    check('24 children, each a character (a painted sheet each), about half of them of a mixed or non-white heritage (%d)' % r['mixed'], r['kids'] == 24 and r['chars'] == 24 and 9 <= r['mixed'] <= 15, r)
    check('20 of the kin and 11 village folk carry a heritage look for the redraw (%d, %d)' % (r['kin'], r['vill']), r['kin'] == 20 and r['vill'] == 11, r)
    check('Every hamlet has one home of each kind (cottage, longhouse, stone cottage)', r['homes'] == ['hh_new_a,hh_new_b,hh_new_c'], r)
    check('The hamlets share the 15 children who are not in the village band, 2–3 to each hamlet', r['pool'] == 15 and r['k3'] == 3 and r['k4'] == 2, r)
    k = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; if(typeof ZFT!=='undefined')ZFT.on=false; ps.hero='f';
      o.before=!(ws._zkG||[]).some(function(x){ return x.on; }); ps.spiritsHome=1;
      var H=ZHAMW.plan(ws)[3]; ws.player.x=(H.cx+6)*TILE; ws.player.y=(H.cy+12)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(3500); for(var i=0;i<60&&!(ws._zkG&&ws._zkG.some(function(x){ return x.key==='h3'&&x.on; }));i++)await w(250);      /* a slow frame here: wait for the group to be made */
      var G=(ws._zkG||[]).find(function(x){ return x.key==='h3'; }); o.on=!!(G&&G.on); o.n=G?G.kids.length:0; o.game=G&&G.game; o.ims=G?G.kids.filter(function(k){ return k.im&&k.im.scene; }).length:0;
      var p0=G?G.kids.map(function(k){ return [k.x,k.y]; }):[]; await w(4000); o.moved=G?G.kids.filter(function(k,i){ return Math.hypot(k.x-p0[i][0],k.y-p0[i][1])>4; }).length:0;
      var npc=(ws._villageNPCs||[]).filter(function(n){ return n.kid; }); o.npcs=npc.length; var a=npc[0]; o.l1=a&&a.line; o.l2=a&&a.line; var nm=ZKIDW.names(ps); o.tw=ZKIDW.TWIN.some(function(t){ return t.replace(/\{h\}/g,nm.h).replace(/\{o\}/g,nm.o)===o.l2; }); o.named=ZKIDW.TWIN.filter(function(t){ return /\{h\}/.test(t); }).length;
      // the village band: near the green and the pier
      ws.player.x=CENTER_X*TILE; ws.player.y=(CENTER_Y+6)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(2000); for(var i=0;i<60&&!(ws._zkG&&ws._zkG.some(function(x){ return x.n<0&&x.on; }));i++)await w(250);
      o.village=(ws._zkG||[]).filter(function(x){ return x.n<0&&x.on; }).map(function(x){ return x.game+':'+x.kids.length; });
      // far away: the hamlet's children go
      o.far=!G.on; ps.spiritsHome=0; await w(800); o.gone=!ws._zkG||!ws._zkG.some(function(x){ return x.on; }); ps.spiritsHome=1; return o; })()""" % W)
    check('Before the gods no children; after, the hamlet\'s children are there when you come near (%d, playing %s)' % (k['n'], k['game']), k['before'] and k['on'] and k['n'] == 3 and k['ims'] == 3, k)
    check('They play: they move about in their game (%d of 3 moved)' % k['moved'], k['moved'] >= 2 or k['game'] in ('swing',), k)
    check('[Tab] by a child: their own line, then one about the twins (most say your name) (%s / %s)' % (k['l1'], k['l2']), k['npcs'] >= 3 and k['l1'] != k['l2'] and k['tw'] and k['named'] >= 4, k)
    check('The village has its band: tag on the green, a ring, fishing at the pier (%s)' % k['village'], len(k['village']) >= 2 and any(v.startswith('tag:') for v in k['village']), k)
    check('Far from a hamlet its children go; before the gods there are none', k['far'] and k['gone'], k)
    m = g.js("""(()=>{ var n=ZHAM.ORDER.indexOf('midwife'), i=-1; for(var j=0;j<40;j++)if(ZHAM.trade(j)==='midwife'){ i=j; break; } ZHAM.interior(i); var L=INTERIOR_LAYOUTS['ham_'+i]; return {i:i, cr:L.props.filter(function(p){ return p[5]&&/^hb_cradle_/.test(p[5].pid||''); }).length}; })()""")
    check('The midwife\'s workshop has two cradles with newborns (%d)' % m['cr'], m['i'] >= 0 and m['cr'] == 2, m)
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
    t = pg.evaluate("({sets:ZBrand.FONTSETS.length, fz:ZBrand.FZ.length, todo:LTODO.open().map(function(o){ return o.id; }).concat(LTODO.RETIRED||[]), fonts:ZBrand.FONTSETS.filter(function(D){ return document.fonts.check(D.wt+' 20px \"'+D.fam+'\"'); }).length})")
    check('Twelve font sets, 24 title panels; "Waiting for your picks" asks for a font (%s)' % t, t['sets'] == 12 and t['fz'] == 24 and 'zfonts' in t['todo'] and t['fonts'] == 12, t)
    pg.evaluate("LTODO.goTo('zfonts','.br-grid',0)"); pg.wait_for_timeout(2500); pg.evaluate("document.querySelectorAll('details.br-ref').forEach(function(d){ d.open=true; })"); pg.wait_for_timeout(800)   # round 71: round 70's sets are a reference section
    lit = []
    for i in ['fz_uncial_p', 'fz_italiana_e', 'fz_grenze_e', 'abc_caveat']:
        pg.evaluate("document.querySelector('canvas.br-cv[data-id=\"%s\"]').scrollIntoView()" % i); pg.wait_for_timeout(1500)
        lit.append(pg.evaluate("(()=>{ var c=document.querySelector('canvas.br-cv[data-id=\"%s\"]'), d=c.getContext('2d').getImageData(0,0,c.width*0.56|0,c.height).data, n=0; for(var i=0;i<d.length;i+=32)if(d[i]>180&&d[i+1]>120)n++; return n; })()" % i))
    n = pg.evaluate("[...document.querySelectorAll('canvas.br-cv[data-tab=\"zfonts\"]')].filter(function(c){ return !/^(pg|tg)_/.test(c.dataset.id); }).length")
    check('The Fonts tab: 36 cards (each set\'s plain, elaborate and alphabets), the lettering drawn (%s)' % lit, n == 36 and all(x > 200 for x in lit), lit)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
