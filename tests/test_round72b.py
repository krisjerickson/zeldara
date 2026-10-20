"""Round 72b — while Kris reviews the saga: the feast hall polish (no action bar in the hall, a wider view, the gods walk to their high
seats) and the world after the end (16t-after-the-end.js: Asgard sinks to its spires, the forges sink, the monsters fade and nothing
spawns again, the familiars have gone home; the sandbox can wind it back). Run: python tests/test_round72b.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
FAST = "ZCUT.HOLD=250; ZCINE.panel=function(id,cap,ms,cb){ if(cb)cb(); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    f = g.js("""(async()=>{ %s %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; if(typeof ZFT!=='undefined')ZFT.on=false;
      ps.grimnirDown=1; ps.godsFree=0; ps.inventory.push('lodestar'); var bar=document.getElementById('action-bar'); o.bar0=bar?getComputedStyle(bar).display:'none';
      ZFEAST.enter(ws,'World'); await w(2500); var fh=game.scene.getScene('FeastHall'); o.zoom=fh.cameras.main.zoom; o.barIn=bar?getComputedStyle(bar).display:'none';
      fh.bx=fh.ox; fh.by=fh.oy+110; fh.bCont.setPosition(fh.bx,fh.by); await w(600); fh._cast();
      for(var i=0;i<60&&!ps.godsFree;i++){ await w(250); var z=document.getElementById('zcut'); if(z)z.click(); }
      for(var j=0;j<50&&!document.getElementById('fairy-talk');j++){ await w(250); var z2=document.getElementById('zcut'); if(z2)z2.click(); }
      var G=fh._gods||{}; o.seats=Object.keys(G).map(function(k){ return [k,Math.round(G[k].x/ZFEAST.W*100)/100,Math.round((G[k].y-12)/ZFEAST.H*100)/100]; });
      o.talk=!!document.getElementById('fairy-talk'); for(var k=1;k<6;k++)fh._talk(k); fh._goAhead(); await w(400);
      fh.by=ZFEAST.H; fh.update(0,16); await w(900); o.back=game.scene.isActive('World'); o.barOut=bar?getComputedStyle(bar).display:'none'; return o; })()""" % (W, FAST))
    check('The feast hall: a wider view (zoom %s), no action bar inside, back when you leave (%s → %s → %s)' % (f['zoom'], f['bar0'], f['barIn'], f['barOut']), f['zoom'] == 1.5 and f['barIn'] == 'none' and f['barOut'] == f['bar0'] and f['back'], f)
    check('Freed, Odin and Freya walk up to stand before their high seats, then talk (%s)' % f['seats'], len(f['seats']) == 2 and all(abs(s[2] - 0.34) < 0.03 and abs(s[1] - (0.44 if s[0] == 'odin' else 0.56)) < 0.03 for s in f['seats']) and f['talk'], f)
    a = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, wd=ws.wd, o={}; ps.godMode=true; ps.spiritsHome=0;
      ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower'].forEach(function(k){ if(ps.completedQuests.indexOf(k)<0)ps.completedQuests.push(k); });
      ps.asgardDown=1; ps.bifrost=1; ps.muspSunk=1; ps.ownedFamiliars=['fam_grass']; ps.familiar='fam_grass'; await w(4000);
      var H=ZASG.heart(ws), ht=function(){ return wd.tiles[Math.floor(H.y/TILE)][Math.floor(H.x/TILE)]; }, F=_volcanoSiteDefs().filter(function(d){ return ZAFTER.FORGES.indexOf(d.id)>=0; }), ft=function(){ return F.map(function(d){ return wd.tiles[d.ty+1][d.tx+1]; }); };
      var fsites=function(){ return wd.sites.filter(function(s){ return ZAFTER.FORGES.indexOf(s.id)>=0; }).length; };
      o.b={heart:ht()===T.STONE_FLOOR, forges:fsites(), mons:ws.worldMonsters.length, guarded:(ws._camps||[]).filter(function(C){ return C.state==='guarded'; }).length, fams:_heroActiveFamiliars(ps).length, dress:(ws._asgDress||[]).length};
      ps.spiritsHome=1; await w(3500); if(typeof FairyTalk!=='undefined')try{ FairyTalk.close(); }catch(e){} var ftl=document.getElementById('fairy-talk'); if(ftl)ftl.style.display='none'; if(typeof _pauseSync==='function')try{ _pauseSync(); }catch(e){} await w(1000);
      o.a={heart:ht()===T.DEEP_WATER, ft:ft().every(function(t){ return t===T.OCEAN; }), forges:fsites(), icons:(ws.siteObjs||[]).filter(function(s){ return ZAFTER.FORGES.indexOf(s.s.id)>=0; }).length, spires:(ws._zaSp||[]).length, dress:(ws._asgDress||[]).length,
        mons:ws.worldMonsters.length, guarded:(ws._camps||[]).filter(function(C){ return C.state==='guarded'; }).length, fams:_heroActiveFamiliars(ps).length, famVis:Object.keys(ws._famVisuals||{}).length,
        spawn:ws._spawnRosterMon(MON_ROSTER[0].id,ws.player.x+200,ws.player.y,1,new PRNG(1),{}), bif:(wd._bifCells||[]).filter(function(c){ return wd.tiles[c[1]][c[0]]===T.BRIDGE; }).length};
      var fake={worldScene:{playerState:ps},monsters:null}; DungeonScene.prototype._spawnMonsters.call(fake); o.a.site=Array.isArray(fake.monsters)&&fake.monsters.length===0;
      ps.spiritsHome=0; await w(2500); o.u={heart:ht()===T.STONE_FLOOR, forges:fsites(), ft:ft().every(function(t){ return t!==T.OCEAN; }), spires:!ws._zaSp, dress:(ws._asgDress||[]).length};
      ps.spiritsHome=1; await w(2500); o.again=ht()===T.DEEP_WATER&&fsites()===0; return o; })()""" % W)
    b, af, u = a['b'], a['a'], a['u']
    check('Before the end: Asgard stands on the lake, four forges, monsters roam and guard camps, a familiar follows (%s)' % b, b['heart'] and b['forges'] == 4 and b['mons'] > 50 and b['guarded'] > 20 and b['fams'] == 1 and b['dress'] > 10, a)
    check('After: Asgard has sunk, %d spires above the water, the Bifröst gone (%d bridge tiles left)' % (af['spires'], af['bif']), af['heart'] and af['spires'] >= 10 and af['dress'] == 0 and af['bif'] <= 5, a)
    check('After: the four forges and their islands are under the sea, off the map', af['ft'] and af['forges'] == 0 and af['icons'] == 0, a)
    check('After: no monster in the world, no guarded camp, nothing spawns — not in the world, not in a site', af['mons'] == 0 and af['guarded'] == 0 and af['spawn'] is None and af['site'], a)
    check('After: the familiars have gone home with the spirits', af['fams'] == 0 and af['famVis'] == 0, a)
    check('The sandbox winds the end back: Asgard and the forges come up again; and sink again (%s)' % u, u['heart'] and u['forges'] == 4 and u['ft'] and u['spires'] and u['dress'] > 10 and a['again'], a)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
