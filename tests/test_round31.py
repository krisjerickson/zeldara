"""Round 31 — ready for the full painted scenery: every remaining object, furnishing, entrance and ground texture is wired
to its painted picture before the sheets arrive. The game is opened with ?scenery=fake, which fills every unpainted object and
texture with a labelled stand-in of the ordered size, so the wiring can be checked now. Also: buildings at 115 %, familiars a
fifth larger, and a mount left behind moves while it waits.   Run: python tests/test_round31.py"""
import sys, os, json, re, glob
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, ENGINE
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:460] if info != '' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False
# ── the manifest against the code: which ordered objects does the game use? ──
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json')))
ids = {i['id']: q['id'] for q in J['requests'] for i in q['items']}
src = ''.join(open(f, encoding='utf-8').read() for f in glob.glob(os.path.join(R, 'src', 'js', '*.js')) if '07zt-' not in f)
quoted = set(re.findall(r"'([a-z]{2}_[a-z0-9_]+)'", src))
built = {i for i in ids if (i.startswith('if_') or i.startswith('cp_') or i.startswith('iw_') or i.startswith('it_') or re.match(r'en_(dng|twr)_\d', i) or i.startswith('en_mage_') or i.startswith('en_castle_'))}   # ids put together in code ('if_'+kind …)
used = (quoted & set(ids)) | built
unused = sorted(set(ids) - used)
check('The game has a place for at least 460 of the %d ordered objects and textures (the rest are listed in docs/16: pieces to be placed once their art is seen)' % len(ids), len(used) >= 460, [len(used), len(unused)])
if '--unused' in sys.argv: print(' '.join(unused))
with game(painted=True, query='?scenery=fake') as g:
    check('World starts; anything not painted yet gets a stand-in (every sheet is in now, so there may be none)', to_world(g) and g.js("ZScn.faked>=0"), g.js("ZScn.faked")); g.wait(1500)
    r = g.js("({kb:ZScn.KB,k:ZScn.K,fam:FAM_SC})")
    check('Sizes Kris chose: buildings 115 %, objects 100 %; familiars a fifth larger (0.3)', r == {'kb': 1.15, 'k': 1, 'fam': 0.3}, r)
    r = g.js("ZSCN.items().map(function(i){return i.id;}).filter(function(id){ return !(ZScn.has(id)||ZScn.timg[id]||ZScn.SKIP[id]); })")
    check('Every ordered object and texture has a picture or a stand-in', r == [], r[:10])
    # one canvas per kind and size, however many are placed; sizes go in 6 % steps
    r = g.js("(()=>{ var m={sprites:[],lights:[]}; ZScn.sprite(m,'tr_pine_a',0,0,136); ZScn.sprite(m,'tr_pine_a',50,0,137); ZScn.sprite(m,'tr_pine_a',90,0,170); var s=m.sprites; return [s.length,s[0].canvas===s[1].canvas,s[0].canvas===s[2].canvas,s[0].res]; })()")
    check('Painted objects of one kind and size share one canvas (a forest is one picture, not one per tree)', r == [3, True, False, 2], r)
    # every indoor builder, with every furnishing painted
    r = g.js("""(()=>{ var out={err:[],miss:{},n:0,flat:0,under:0}; var cnt=function(m){ out.n+=m.sprites.filter(function(s){return s.res;}).length; out.flat+=m.sprites.filter(function(s){return s.flat;}).length; out.under+=m.sprites.filter(function(s){return s.under;}).length; };
      var run=function(n,f){ try{ f(); }catch(e){ out.err.push(n+': '+e.message); } };
      var oT=_twrPainted; _twrPainted=function(m,it,S,R2){ var ok=oT(m,it,S,R2); if(!ok)out.miss[it.type]=1; return ok; };
      INTERIOR_TYPES.forEach(function(t){ run('int_'+t,function(){ cnt(buildInterior(t)); }); });
      TOWER_STYLES.forEach(function(S){ run('twr_'+S.id,function(){ (S.floorPlans?S.floorPlans(5):Object.keys(TOWER_PLANS).slice(0,4)).forEach(function(p){ cnt(buildTower(S,p,7,{})); }); }); });
      MAGE_STYLES.forEach(function(S){ run('mag_'+S.id,function(){ S.floorPlans(3).forEach(function(p){ cnt(buildTower(S,p,7,{})); }); }); });
      DUNGEON_DESIGNS.concat(EMBER_CAVE_DESIGNS).forEach(function(D){ run('dng_'+D.id,function(){ cnt(buildCavern(D,5,{game:true})); }); });
      Object.keys(BOSS_ARENAS).forEach(function(k){ run('arena_'+k,function(){ cnt(buildCavern(BOSS_ARENAS[k],5,{game:true,last:true})); }); });
      _twrPainted=oT; out.miss=Object.keys(out.miss); return out; })()""")
    check('Shops, towers, castles, mage towers, dungeons and boss arenas all build with painted pieces and no errors', not r['err'] and r['n'] > 5000 and r['flat'] > 100 and r['under'] >= 12, {k: (v if k != 'err' else v[:3]) for k, v in r.items()})
    check('Every tower, castle and mage-tower furnishing has a painted piece', r['miss'] == [], r['miss'])
    r = g.js("""(()=>{ var m=buildInterior('tavern'), ws=game.scene.getScene('World'); var lights=function(S,type){ var mm={sprites:[],lights:[]}; _twrPainted(mm,{type:type,x:3,y:3,w:type==='hearth'?4:1,h:1},S,rngOf(1)); return [mm.sprites.length,mm.lights.length]; };
      var S=CASTLE_STYLES[0]; return {top:m.sprites.filter(function(s){ return s.res&&s.canvas.width<60&&!s.flat; }).length, hearth:lights(S,'hearth'), torch:lights(S,'great_torch'), pillar:lights(S,'pillar_massive')}; })()""")
    check('Things on tables are painted too, and a painted hearth or torch keeps its glow', r['top'] >= 4 and r['hearth'] == [1, 1] and r['torch'] == [1, 1] and r['pillar'] == [1, 0], r)
    # entrances
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), S=ws.wd.sites, o={}; S.forEach(function(s){ var k=s.mage?'mage':s.type; if(k==='dungeon')return; var id=_wsPaintedId(s,s.section||1); o[k]=o[k]||[0,0]; o[k][id&&ZScn.has(id)?0:1]++; });
      var c=Object.keys(CASTLE_ISLANDS).map(function(k){ return _wsCastleId(CASTLE_ISLANDS[k]); }); return {sites:o,castles:c.filter(function(x){ return x&&ZScn.has(x); }).length,way:ZScn.has('rn_waystone_on')&&ZScn.has('rn_waystone_off')}; })()""")
    check('Every tower, mage tower, camp, harbor, sky port, volcano door, castle and waystone has its painted entrance', all(v[1] == 0 and v[0] > 0 for v in r['sites'].values()) and r['castles'] == 12 and r['way'] and 'mage' in r['sites'], r)
    # the world around the start
    for _ in range(60):
        g.wait(500)
        if g.js("game.scene.getScene('World')._wr.chunks.size>=4"): break
    g.wait(2500)
    r = g.js("({err:Object.keys(WP_ERR),ground:[ZScn.ground('path','cobble'),ZScn.ground('road','flag'),ZScn.ground('sand'),ZScn.ground('water'),ZScn.ground('bridgev','planks'),ZScn.ground('lava')],a:[ZScn.texa('tx_grass')[0],ZScn.texa('tx_cobble')[0]]})")
    check('The world paints with every prop wired and no prop errors; built ground and bare ground both get their texture', r['err'] == [] and r['ground'] == ['tx_cobble', 'tx_flag', 'tx_sand', 'tx_water', 'tx_planks', 'tx_lava'] and r['a'][0] < r['a'][1], r)
    r = g.js("""(()=>{ var c={m:{sprites:[],lights:[]},R:rngOf(3)}, x=mkCanvas(64,64).getContext('2d'), o={}; ['column','wall','hut','arch','brazier','golem','geode','bush','reeds','statue','stall','cart','tower','boathouse','lighthouse','boatv','windmill','kite','floatrock','balloondock','mushring','fence','rail','vdress'].forEach(function(k){ var n=c.m.sprites.length; try{ WPROP[k](c,x,0,0,64,64,k==='vdress'?{id:'vp_bench'}:{},{}); o[k]=c.m.sprites.slice(n).filter(function(s){ return s.res; }).length; }catch(e){ o[k]='ERR '+e.message; } }); return o; })()""")
    check('World props (ruins, landmarks, plants, village and harbour pieces, fences) each draw their painted piece', all(isinstance(v, int) and v >= 1 for v in r.values()), {k: v for k, v in r.items() if not (isinstance(v, int) and v >= 1)})
    r = g.js("(()=>{ var c={m:{sprites:[],lights:[]},R:rngOf(3)}, x=mkCanvas(64,64).getContext('2d'), o={}; ['willow','pine','mangrove','dead','ash','stone','blossom','round'].forEach(function(k){ var n=c.m.sprites.length; WPROP.tree(c,x,0,0,64,64,{kind:k,col:'#3f7a3a'},{}); o[k]=c.m.sprites.slice(n).filter(function(s){ return s.res; }).length; }); return o; })()")
    check('Every kind of tree is painted', all(v == 1 for v in r.values()), r)
    check('No page errors with stand-ins', not g.errs, g.errs[:3])
with game(painted=True) as g:
    check('World starts (painted, no stand-ins)', to_world(g)); g.wait(1200)
    # the mount left behind is alive: it turns, shuffles and strolls near where it was left, and looks at the hero when he is close
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, spot=null; for(var i=0;i<600&&!spot;i++){ var x=CENTER_X*TILE+(Math.random()-0.5)*TILE*120, y=CENTER_Y*TILE+(Math.random()-0.5)*TILE*120, tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), ok=true; for(var a=-3;a<=3&&ok;a++)for(var b=-3;b<=3&&ok;b++)ok=ws._mountSafeTile(tx+a,ty+b); if(ok)spot={x:tx*TILE+16,y:ty*TILE+16}; }
      if(!spot)return null; ps.godMode=true; ps.ownedMounts=['horse']; ps.mount='horse'; ps.parkedMount=null; ws.player.x=spot.x; ws.player.y=spot.y; ws.player.cont.setPosition(spot.x,spot.y); ws.worldAtkTimer=0; ws._worldAttack();
      var P=ps.parkedMount; if(!P)return {parked:false}; ws._parkedTick(0.016); var M=ws._pm, home={x:M.home.x,y:M.home.y};
      ws.player.x=spot.x+TILE*9; ws.player.cont.setPosition(ws.player.x,ws.player.y);      // the hero walks off
      var dirs={}, far=0, moved=0, strolls=0, lx=P.x, ly=P.y; for(var t=0;t<60*90;t++){ ws._parkedTick(1/60); dirs[M.dir]=1; far=Math.max(far,Math.hypot(P.x-home.x,P.y-home.y)); moved+=Math.hypot(P.x-lx,P.y-ly); lx=P.x; ly=P.y; if(M.goal&&M.goal.stroll)strolls++; }
      ws.player.x=P.x+20; ws.player.y=P.y; ws.player.cont.setPosition(ws.player.x,ws.player.y); M.goal=null; M.it=0; var x0=P.x; for(var t2=0;t2<60*6;t2++)ws._parkedTick(1/60);
      return {parked:true,dirs:Object.keys(dirs).length,far:Math.round(far),moved:Math.round(moved),strolls:strolls,look:M.dir,stay:Math.abs(P.x-x0)<0.01,safe:ws._mountSafeTile(Math.floor(P.x/TILE),Math.floor(P.y/TILE))}; })()""")
    check('A mount left behind turns and strolls near its spot (never far), and stands looking at the hero when he comes close', r and r.get('parked') and r['dirs'] >= 2 and 5 < r['far'] <= 64 and r['moved'] > 20 and r['strolls'] > 0 and r['look'] == 'right' and r['stay'] and r['safe'], r)
    check('No page errors', not g.errs, g.errs[:3])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
