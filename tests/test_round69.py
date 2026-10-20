"""Round 69 — the hamlets after the gods (Kris's note: a small Zeldara rune, village lanes, roads joining the hamlets; grassland under them;
solid buildings; workshops to enter with [Tab]; the spirits' kin inside); the saga panels redone without the hero; the hamlet folk ordered;
the fairies smaller and painted in their talk box; the Lab's Saga panels & hamlets tab.
Run: python tests/test_round69.py"""
import re, os, sys, json
from playwright.sync_api import sync_playwright
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
sc = json.load(open(os.path.join(R, 'sprites/requests/scenery.json')))
ids = [r['id'] for r in sc['requests']]
check('Ordered: the five saga panels without the hero (wave 77), the twenty trades\' furniture (78) and the forty keepsakes (79)',
      sum(1 for i in ids if re.match(r'sc_pn_saga_\w+_b$', i)) == 5 and sum(1 for i in ids if i.startswith('sc_hf_')) == 20 and sum(1 for i in ids if i.startswith('sc_hk_')) == 5)
ch = open(os.path.join(R, 'sprites/requests/requests.json'), encoding='utf-8').read()
check('Ordered: a painted sheet for each of the forty hamlet folk', len(set(re.findall(r'"(hk_\w+)\.core\.f"', ch))) == 40)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; if(typeof ZFT!=='undefined')ZFT.on=false;
      o.sets=Object.keys(ZSAGA_SETS).map(function(k){ return ZSAGA_SETS[k].map(function(p){ return p[0]; }).join(','); }).join('|');
      o.kin=ZHAM.KIN.length; o.ch=ZHAM.KIN.every(function(K,i){ return !!CHAR_BY_ID[ZHAM.kinId(i)]; }); o.line=ZHAM.lines(6)[0];
      var f=ws._fairies[0], fx=f.home&&f.home.ws?f.home.x*TILE+16:f.x, fy=f.home&&f.home.ws?f.home.y*TILE+16:f.y; ws.player.x=fx+40; ws.player.y=fy+60; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(4500);
      o.fairyH=f.spr?Math.round(f.spr.displayHeight):-1; o.heroH=63;
      var cv=document.createElement('canvas'); cv.width=cv.height=96; o.fairyPainted=ZAtlas.drawTo(cv.getContext('2d'),'fairy_'+f.F.id,['float','idle','move'],'q',0,4,2,88,92);
      var S=ZSPIRIT.shrines(ws), s=S[12]; ps.spiritsFreed=S.map(function(q){ return q.id; }); ZSLW.seen(ps); ps.slSeen=ps.spiritsFreed.slice(); ps.spiritsHome=1; ps.sagaSeen=['opening'];
      ws.player.x=s.x+16; ws.player.y=s.y+150; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(4500);
      var H=ZHAMW.plan(ws).find(function(h){ return h.n===s.n; }), q=H.pieces.find(function(p){ return p.kind==='work'; }), bad=0, tot=0;
      for(var y=Math.floor(H.cy-13);y<=H.cy+13;y++)for(var x=Math.floor(H.cx-13);x<=H.cx+13;x++){ if(Math.hypot(x+0.5-H.cx,y+0.5-H.cy)>12.5)continue; tot++; var t=ws.wd.tiles[y][x]; if(!canPassTile(t)&&t!==T.BUILDING_WALL)bad++; }
      o.walk=[bad,tot]; o.solid=!canPassTile(ws.wd.tiles[q.y1][Math.round(q.fx)]); o.doors=ws.buildings.filter(function(b){ return b.ham!==undefined; }).length; o.props=ws.wd._hamPropsCut;
      var D=ZSLW.data(ws), rp=D.roads.filter(function(r){ return r.owner.some(function(x){ return x>=0; }); })[3], mid=rp.pts[Math.floor(rp.pts.length/2)], rt=ws.wd.tiles[Math.floor(mid.y)][Math.floor(mid.x)]; o.roadGrass=rt===T.GRASS||rt===T.BUILDING_WALL||Math.hypot(mid.x-CENTER_X,mid.y-CENTER_Y)<40;
      o.pics=(ws._hamIm[s.n]||[]).length;
      var B=ws.buildings.find(function(b){ return b.ham===s.n; }); o.bname=B&&B.name; ws._enterBuilding(B); await w(4000);
      var bs=game.scene.getScene('Building'); o.inside=bs.sys.isActive()&&bs.building.type==='ham_'+s.n; o.npc=bs._imap.npc.id; o.room=bs._imap.theme.name; o.furn=INTERIOR_LAYOUTS['ham_'+s.n].props.filter(function(p){ return p[5]&&p[5].pid; }).map(function(p){ return p[5].pid; });
      o.painted=[ZAtlas.has('hk_nanna'),_scn().has('hf_midwife_cradle'),_scn().has('hk_nanna')];
      bs._npcInteract(); await w(800); o.talk=(document.querySelector('#fairy-talk .ft-text')||{}).textContent||''; return o; })()""" % W)
    check('The redone panels (no hero) are the ones the game plays', '_b' in r['sets'] and 'pn_saga_storm_b' in r['sets'] and 'pn_saga_storm,' not in r['sets'], r['sets'])
    check('Forty kin, each a character, each with their own words (%s)' % r['line'], r['kin'] == 40 and r['ch'] and 'Hallveig' in r['line'], r)
    check('The fairies are about half the hero\'s height again (%d px) and painted in their talk box' % r['fairyH'], 25 <= r['fairyH'] <= 45 and r['fairyPainted'], r)
    check('After the gods the hamlet\'s ring and a little beyond are walkable grass (%s blocked of %s), the wild dressing cleared (%s)' % (r['walk'][0], r['walk'][1], r['props']), r['walk'][0] == 0 and r['props'] > 50 and r['roadGrass'], r)
    check('Its buildings are solid and stand there (%d pictures); every workshop has a door (%d)' % (r['pics'], r['doors']), r['solid'] and r['pics'] >= 5 and r['doors'] == 40, r)
    check('[Tab] at %s goes inside: %s, its four trade pieces (%s), the kin %s' % (r['bname'], r['room'], ','.join(r['furn']), r['npc']), r['inside'] and r['npc'] == 'hk_nanna' and len([f for f in r['furn'] if f.startswith('hf_midwife_')]) == 4 and all(f.startswith('hf_midwife_') or f.startswith('hb_cradle_') for f in r['furn']), r)
    check('…who talks of the spirit (%s)' % r['talk'][:60], 'Nanna' in r['talk'], r)
    check('Round 73 is in: Inga is painted, and so are the midwife\'s furniture and Nanna\'s keepsake (%s)' % r['painted'], all(r['painted']), r)
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
    pg.evaluate("LTODO.goTo('hamlets','.br-grid',0)"); pg.wait_for_timeout(4000)
    n = pg.evaluate("(()=>{ var g=document.querySelectorAll('.br-grid'); return [g[0]?g[0].querySelectorAll('canvas').length:0, g[1]?g[1].querySelectorAll('canvas').length:0, LabApp.tab, g[2]?g[2].querySelectorAll('canvas').length:0]; })()")
    check('The Lab\'s "Saga panels & hamlets" tab shows the 11 panels, the 36 buildings (round 70: the home colourings and the cradles) and the 40 hamlet folk in their workshops (%s)' % n, n == [11, 36, 'hamlets', 40], n)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
