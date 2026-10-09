"""Round 6: familiar specials (1 basic + 1 chosen special), line of sight for everyone, crowd-control
diminishing returns, monster counters to familiars (spirit ward, mirror, null aura, resist, banish),
familiar knock-outs. Later sections: old cave removal, islands.
Run from the repo root after `node build.mjs`: python tests/test_round6.py [section ...]"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
ONLY = set(sys.argv[1:])
def until(g, expr, ms=20000, js=False):
    for _ in range(max(1, ms // 400)):
        if (g.js(expr) if js else g.ws(expr)): return True
        g.wait(400)
    return False
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
def want(sec): return not ONLY or sec in ONLY
D = "game.scene.getScene('Dungeon')"
LAUNCH = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id);
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon')){game.scene.getScene('Dungeon').scene.restart(data);return;}
  if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
ALL4 = "ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.famLevels={fam_grass:6,fam_water:6,fam_earth:6,fam_fire:6}; ps.fairyKings=['k2','k3','k4']; ps.familiar='fam_grass'; ps.familiar2='fam_water'; ps.familiar3='fam_earth'; ps.familiar4='fam_fire';"
NOFAM = "ps.familiar=null; ps.familiar2=null; ps.familiar3=null; ps.familiar4=null;"

with game(new=True) as g:
    g.wait(500)
    g.ws("(()=>{ ps.godMode=true; ps.unlockedSections=[1,2,3,4]; })()")
    # ── familiar specials ──
    if want('specials'):
        g.ws("(()=>{ " + ALL4 + " ps.famSpecial={}; })()"); g.wait(1500)
        r = g.ws("['fam_grass','fam_water','fam_earth','fam_fire'].map(f=>_famActiveSkills(ps,f).map(o=>o.S.name))")
        check('Each familiar runs its basic attack + ONE special (default: the newest)', all(len(x) == 2 for x in r) and r[0] == ['Thorn Dart', 'Wild Growth'], r)
        g.js("showFamiliarInfo('fam_grass')"); g.wait(300)
        r = g.js("[...document.querySelectorAll('#familiar-info-modal .fam-pick')].map(b=>b.textContent)")
        check('The familiar card lets you pick the special from the skills it has learned', len(r) == 5 and r.count('✔ Special') == 1, r)
        g.js("[...document.querySelectorAll('#familiar-info-modal .fam-pick')].find(b=>/Use/.test(b.textContent)&&b.closest('.fam-sk').textContent.includes('Vine Snare')).click()"); g.wait(300)
        r = g.ws("[ps.famSpecial.fam_grass, _famActiveSkills(ps,'fam_grass').map(o=>o.S.name)]")
        check('Picking Vine Snare makes it the special (saved in famSpecial)', r[0] == 2 and r[1] == ['Thorn Dart', 'Vine Snare'], r)
        g.js("document.getElementById('familiar-info-modal').style.display='none'"); g.wait(600)
        until(g, "/Vine Snare/.test((document.getElementById('fam-hud')||{}).innerText||'')&&/Inferno/.test(document.getElementById('fam-hud').innerText)", 8000, js=True)   # round 40: the HUD refreshes every 0.2 s of game time, slower in a busy headless browser
        r = g.js("(document.getElementById('fam-hud')||{}).innerText||''")
        check('Familiar HUD shows one chip per familiar with its special + cooldown', 'Vine Snare' in r and 'Tidal Wave' in r and 'Avalanche' in r and 'Inferno' in r, r)
        # only the chosen skills are ever cast
        g.ws("""(()=>{ window._casts={}; if(!window._fc0){ window._fc0=_famCast; } _famCast=function(scene,fid,S){ var ok=window._fc0.apply(this,arguments); if(ok)(window._casts[fid]=window._casts[fid]||{})[S.name]=1; return ok; };
          var p=ws.player; window._dummies=[]; for(var i=0;i<6;i++){ var m=MX.spawn(ws,'thistle_hog',p.x+60+i*14,p.y+(i%2?30:-30),{q:1}); m.section=1; m.maxHp=m._hp=9999; m._m.stunT=99; ws.worldMonsters.push(m); window._dummies.push(m); } ps.hp=ps.maxHp*0.2; })()""")
        g.wait(9000)
        r = g.ws("window._casts")
        allowed = {'fam_grass': {'Thorn Dart', 'Vine Snare'}, 'fam_water': {'Water Bolt', 'Tidal Wave'}, 'fam_earth': {'Stone Shard', 'Avalanche'}, 'fam_fire': {'Ember Bolt', 'Inferno'}}
        ok = r and all(set(v.keys()) <= allowed[k] for k, v in r.items()) and sum(len(v) for v in r.values()) >= 4
        check('Only the basic attack and the chosen special are ever cast (no heals/wards/others)', ok, r)
        g.ws("(()=>{ _famCast=window._fc0; window._dummies.forEach(m=>{ m._hp=0; ws._worldMonsterDied(m); }); ps.hp=ps.maxHp; })()")
    # ── crowd control diminishing returns ──
    if want('cc'):
        r = g.ws("""(()=>{ var p=ws.player, m=MX.spawn(ws,'thistle_hog',p.x+400,p.y,{q:1}); ws.worldMonsters.push(m); var out=[]; out.push(_ccDur(m,2)); out.push(_ccDur(m,2)); out.push(_ccDur(m,2));
          var c=m._cc; m._m.t=c.until+0.5; out.push(_ccDur(m,2)); m._m.t=c.until+3.2; out.push(_ccDur(m,2)); m.isBoss=true; m._m.t=c.until+3.5; out.push(_ccDur(m,2)); m._hp=0; ws._worldMonsterDied(m); return out; })()""")
        check('Holds halve while a monster is held, then 3 s immunity, then fresh; bosses take half', r[:3] == [2, 1, 0.5] and r[3] == 0 and r[4] == 2 and r[5] == 1, r)
    # ── line of sight ──
    if want('los'):
        r = g.ws("""(()=>{ var out={wall:null,water:null}; for(var y=40;y<WORLD_H-40&&(!out.wall||!out.water);y+=3)for(var x=40;x<WORLD_W-40;x+=3){ var t=ws.tiles[y][x], L=ws.tiles[y][x-2], R=ws.tiles[y][x+2];
            if(!out.wall&&(t===T.ROCK||t===T.PROP)&&ws.tiles[y][x-1]===t&&canPassTile(L)&&canPassTile(R))out.wall=_heroLOS(ws,(x-2)*TILE+16,y*TILE+16,(x+2)*TILE+16,y*TILE+16);
            if(!out.water&&t===T.DEEP_WATER&&ws.tiles[y][x-1]===T.DEEP_WATER&&ws.tiles[y][x+1]===T.DEEP_WATER&&canPassTile(ws.tiles[y][x-3])&&canPassTile(ws.tiles[y][x+3]))out.water=_heroLOS(ws,(x-3)*TILE+16,y*TILE+16,(x+3)*TILE+16,y*TILE+16); }
          return out; })()""")
        check('Overworld sight: rocks/trees/props block, water does not (shoot across a river)', r['wall'] is False and r['water'] is True, r)
        g.js(LAUNCH + '(["s1_dungeon",0])')
        until(g, f"!!({D}&&{D}._ready&&game.scene.isActive('Dungeon'))", 15000, js=True); g.wait(800)
        r = g.js(f"""(()=>{{ var d={D}; d.monsters.forEach(m=>{{ if(!m.dead){{ m._hp=0; m.dead=true; if(m.cont)m.cont.setVisible(false); }} }}); d.monsters=[];
            var W=d.dtiles[0].length, H=d.dtiles.length, fl=[]; for(var y=1;y<H-1;y++)for(var x=1;x<W-1;x++)if(d.dtiles[y][x]!==DNG.WALL)fl.push([x*TILE+16,y*TILE+16]);
            for(var i=0;i<fl.length;i+=3)for(var j=0;j<fl.length;j+=5){{ var a=fl[i], b=fl[j], dd=Math.hypot(a[0]-b[0],a[1]-b[1]); if(dd>120&&dd<200&&!_heroLOS(d,a[0],a[1],b[0],b[1])){{
              var c=null; for(var k=0;k<fl.length&&!c;k++){{ var e=fl[k], de=Math.hypot(e[0]-b[0],e[1]-b[1]); if(de>90&&de<180&&_heroLOS(d,e[0],e[1],b[0],b[1])&&_heroLOS(d,b[0],b[1]-6,e[0],e[1]-6))c=e; }}
              if(c){{ window._P1=a; window._P2=b; window._P3=c; return [a,b,c]; }} }} }}
            return null; }})()""")
        ok_setup = bool(r)
        g.js(f"""(()=>{{ var d={D}, ps=d.worldScene.playerState; ps.godMode=true; {NOFAM} d.px=_P1[0]; d.py=_P1[1]; d.pCont.setPosition(d.px,d.py);
            var m=MX.spawn(d,'dwarf_crossbow',_P2[0],_P2[1],{{q:3}}); m.kit={{move:{{name:'still',p:{{}}}},atk:m.kit.atk,def:m.kit.def}}; m._m.aggro=true; m.maxHp=m._hp=9999; d.monsters.push(m); window._xb=m; MX.log={{}}; }})()""")
        g.wait(4500)
        blind = g.js("((MX.log||{}).dwarf_crossbow||{}).atk_shoot||0")
        g.js(f"(()=>{{ var d={D}; d.px=_P3[0]; d.py=_P3[1]; d.pCont.setPosition(d.px,d.py); _xb._m.aggro=true; }})()")
        seen = until(g, "((MX.log||{}).dwarf_crossbow||{}).atk_shoot>0", 8000, js=True)
        check('Dungeon: a crossbowman behind a wall never shoots; with a clear line it does', ok_setup and blind == 0 and seen, (r, blind, seen))
        # familiars need sight too
        g.js(f"""(()=>{{ var d={D}, ps=d.worldScene.playerState; {ALL4} d.px=_P1[0]; d.py=_P1[1]; d.pCont.setPosition(d.px,d.py); _xb._m.stunT=999; _xb._hp=9999; window._hp0=_xb._hp; }})()""")
        g.wait(5000)
        hid = g.js("window._hp0-_xb._hp")
        g.js(f"(()=>{{ var d={D}; d.px=_P3[0]; d.py=_P3[1]; d.pCont.setPosition(d.px,d.py); window._hp1=_xb._hp; }})()")
        hit = until(g, "window._hp1-_xb._hp>0", 8000, js=True)
        check('Familiars can\'t hit a monster behind a wall; in sight they do', hid == 0 and hit, (hid, hit))
        r = g.js(f"""(()=>{{ var d={D}, A=MX.A(d), m=_xb; var L=0; var P=A.p(); MX.ATK.beam.fire(A,m,m._m,{{x:_P1[0],y:_P1[1]}},{{len:340}},{{a0:Math.atan2(_P1[1]-m.y,_P1[0]-m.x)}}); return true; }})()""")
        check('Beams can be fired toward a wall without errors (they stop at it)', r and not [e for e in g.errs if 'GL Driver' not in e], g.errs[-3:])
        g.js(f"{D}._exitToWorld(null)"); until(g, "game.scene.isActive('World')&&!game.scene.isActive('Dungeon')", 8000, js=True); g.wait(800)
    # ── counters ──
    if want('counters'):
        g.ws("(()=>{ " + ALL4 + " })()")
        r = g.ws("""(()=>{ var p=ws.player, mk=function(id,q){ var m=MX.spawn(ws,id,p.x+500,p.y+500,{q:q}); ws.worldMonsters.push(m); m._m.stunT=99; m.maxHp=m._hp=9999; return m; };
          var hog=mk('thistle_hog',1), br=mk('magma_brute',4), gl=mk('crystal_golemling',3), tr=mk('cave_troll',3);
          var E=SPIRIT_ELEMENTS; var d0=hog._hp; _famHit(ws,'fam_fire',E.fire,{kind:'nova'},hog,40,{pure:true}); var dh=d0-hog._hp;
          d0=br._hp; _famHit(ws,'fam_fire',E.fire,{kind:'nova'},br,40,{pure:true}); var db=d0-br._hp;
          d0=br._hp; _famHit(ws,'fam_water',E.water,{kind:'nova'},br,40,{pure:true}); var dbw=d0-br._hp;
          FAM_ST.fam_water={stag:0,ko:0}; d0=gl._hp; _famHit(ws,'fam_water',E.water,{kind:'proj'},gl,40,{pure:true}); var dg=d0-gl._hp, stag=FAM_ST.fam_water.stag;
          d0=tr._hp; _famHit(ws,'fam_earth',E.earth,{kind:'nova'},tr,40,{pure:true}); var dt0=d0-tr._hp;
          for(var i=0;i<3;i++){ MX._src='melee'; tr.hp-=1; MX._src=null; } d0=tr._hp; _famHit(ws,'fam_earth',E.earth,{kind:'nova'},tr,40,{pure:true}); var dt1=d0-tr._hp;
          [hog,br,gl,tr].forEach(m=>{ m._hp=0; ws._worldMonsterDied(m); }); FAM_ST.fam_water={stag:0,ko:0};
          return {hog:dh, brute_fire:db, brute_water:dbw, mirror:dg, stag:stag, ward:dt0, ward_after_3_sword_hits:dt1}; })()""")
        check('Resist: a fire monster shrugs off fire familiars (-75%) but not water', r['brute_fire'] <= 40 * 0.3 and r['brute_water'] >= 40 * 0.9 and r['hog'] == 48, r)      # round 37: the hog (grass) is Weak to the fire familiar (40 × 1.2); water on a fire-and-earth brute cancels out
        check('Mirror shell: familiar projectiles do nothing and daze the familiar (+60 stagger)', r['mirror'] == 0 and r['stag'] >= 59, r)
        check('Spirit ward: blocks familiar damage until 3 sword hits break it', r['ward'] == 0 and r['ward_after_3_sword_hits'] > 20, r)      # round 37: an earth familiar on an earth troll is resisted (40 × 0.6)
        g.ws("(()=>{ var p=ws.player; var m=MX.spawn(ws,'void_scholar',p.x+40,p.y,{q:3}); m.section=3; ws.worldMonsters.push(m); m._m.stunT=99; m.maxHp=m._hp=9999; window._vs=m; })()")
        g.wait(1500)
        r = g.js("(document.getElementById('fam-hud')||{}).innerText||''")
        check('Null aura: familiars near a Void Scholar fall silent', r.count('silenced') >= 3, r)
        g.ws("(()=>{ _vs._hp=0; ws._worldMonsterDied(_vs); })()")
    # ── knock-outs ──
    if want('ko'):
        g.ws("(()=>{ " + ALL4 + " Object.keys(FAM_ST).forEach(k=>FAM_ST[k]={stag:0,ko:0}); })()"); g.wait(800)
        g.ws("(()=>{ var v=ws._famVisuals.fam_fire; _famStaggerAt(ws,v.x,v.y,10,55,'slam'); _famStaggerAt(ws,v.x,v.y,10,55,'slam'); })()"); g.wait(400)
        r = g.ws("[FAM_ST.fam_fire.ko, FAM_ST.fam_grass.ko]")
        check('Two slams on a familiar knock it out (8–15 s); the others keep going', 7 <= r[0] <= 15.1 and r[1] == 0, r)
        r = g.js("(document.getElementById('fam-hud')||{}).innerText||''")
        check('The HUD shows the knocked-out familiar with its countdown', '💫' in r, r)
        g.ws("(()=>{ FAM_ST.fam_fire.ko=1; })()")
        ok = until(g, "FAM_ST.fam_fire.ko<=0", 6000)
        check('It comes back when the countdown ends', ok)
        g.ws("""(()=>{ for(var i=0;i<600;i++){ var tx=Math.floor(CENTER_X+(Math.random()-0.5)*160), ty=Math.floor(CENTER_Y+(Math.random()-0.5)*160); if(getTileSection(tx,ty)===1&&ws._mountSafeTile(tx,ty)&&ws._mountSafeTile(tx+5,ty)&&_heroLOS(ws,tx*TILE+16,ty*TILE+16,(tx+5)*TILE+16,ty*TILE+16)){ ws.player.x=tx*TILE+16; ws.player.y=ty*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); break; } } })()"""); g.wait(1500)
        g.ws("(()=>{ var p=ws.player; var m=MX.spawn(ws,'chainmaster',p.x+150,p.y,{q:4}); m.section=4; ws.worldMonsters.push(m); m._m.aggro=true; m.maxHp=m._hp=9999; m.kit={move:{name:'still',p:{}},atk:m.kit.atk.filter(a=>a.name==='banish'),def:[]}; window._cm=m; })()")
        ok = until(g, "Object.keys(FAM_ST).some(k=>FAM_ST[k].ko>5)", 25000)
        check('A Chainmaster Warlock banishes one of your familiars', ok, g.ws("JSON.stringify(FAM_ST)"))
        g.ws("(()=>{ _cm._hp=0; ws._worldMonsterDied(_cm); })()")
        r = g.js("_tomeDefLines('cave_troll').map(l=>l[1]).join(' ')")
        check('The Tome explains the counters (Spirit Ward on the Cave Troll)', 'Spirit Ward' in r, r)
    # ── the old cave is gone; Ember Cave is an island dungeon ──
    if want('cave'):
        r = g.js("({cave:!!game.scene.getScene('Cave'), adv:ISL_ADV[3].type, design:(_dungeonDesignById(ISL_ADV[3].design)||{}).id, looks:EMBER_CAVE_DESIGNS.length})")
        check('No old Cave scene; Ember Cave = island dungeon with a Lab look (3 to pick)', not r['cave'] and r['adv'] == 'dungeon' and r['design'] == g.js("EMBER_CAVE_PICK") and r['looks'] == 3, r)
        r = g.js("(()=>{ var d={completedIslands:[1,2,3,4],completedQuests:['s1_tower'],saveVersion:6}; _migrateSave(d); return d.completedQuests.filter(q=>/harbor/.test(q)).length; })()")
        check('Old saves: cleared islands count for the harbor quests (the Dragon is reachable again)', r == 4, r)
    # ── islands on the world pipeline ──
    if want('islands'):
        IS = "game.scene.getScene('Island')"
        def sail(key, arrive='dock'):
            g.ws(f"ws._sailTo('{key}','{arrive}')")
            ok = until(g, f"!!({IS}&&{IS}._ready&&game.scene.isActive('Island')&&{IS}.islKey==='{key}')", 20000, js=True); g.wait(800); return ok
        ok = sail('2a')
        r = g.js(f"""(()=>{{ var I={IS}, p=I.player; return {{design:I.wd.design.id, pick:ISLAND_PICK['2a'], mx:I.worldMonsters.filter(m=>m.kit).length, all:I.worldMonsters.length, camps:I._camps.length, npcs:I._islNPCs.length, way:I.wd.waystones[0].id,
            sec:getTileSection(Math.floor(p.x/TILE),Math.floor(p.y/TILE)), site:I.sites[0].id, hud:document.getElementById('hud').style.display, mm:document.getElementById('minimap-hud').style.display}}; }})()""")
        check('Sailing to Mangrove Isle opens the island on the world pipeline (Lab look, engine monsters, 2 camps, village, waystone)',
              ok and r['design'] == r['pick'] and r['all'] >= 10 and r['mx'] == r['all'] and r['camps'] == 2 and r['npcs'] == 4 and r['way'] == 'wsi_2a' and r['site'] == 'isl_adv_2_volcano' and r['hud'] != 'none', r)
        painted = until(g, f"{IS}._wr&&{IS}._wr.chunks.size>0", 40000, js=True)
        check('The island is painted by the world renderer', painted)
        g.js(f"(()=>{{ var I={IS}; I._activateWaystone(I.wd.waystones[0]); }})()")
        check('Its waystone joins the travel network', g.ws("ps.activatedWaystones.indexOf('wsi_2a')>=0") and g.js("_wmAllWaystones(game.scene.getScene('World').wd).some(w=>w.id==='wsi_2a')"))
        g.js(f"(()=>{{ var I={IS}, A=I.sites[0]; I.player.x=(A.tx+1.5)*TILE; I.player.y=(A.ty+4)*TILE; I.player.cont.setPosition(I.player.x,I.player.y); I._enterSite(A); }})()")
        inD = until(g, "!!(game.scene.isActive('Dungeon')&&game.scene.getScene('Dungeon')._ready)", 20000, js=True)
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)")
        back = until(g, "game.scene.isActive('Island')", 10000, js=True)
        check('The adventure entrance leads to the island dungeon and back to the island', inD and back)
        g.js(f"(()=>{{ var I={IS}; I._exitToWorld(); }})()")
        home = until(g, "game.scene.isActive('World')&&!game.scene.isActive('Island')", 10000, js=True)
        check('The dock sails you home; the island\'s map is kept', home and g.ws("!!(ps.islFog&&ps.islFog['2a']&&ps.islFog['2a'].indexOf('1')>=0)"), g.ws("ps.islFog"))
        g.ws("(()=>{ WMAP.travel='ws_village'; ps.gold=500; ws._travelTo('wsi_2a'); })()")
        ok = until(g, f"!!({IS}&&{IS}._ready&&game.scene.isActive('Island'))", 20000, js=True); g.wait(600)
        r = g.js(f"(()=>{{ var I={IS}, w=I.wd.waystones[0]; return Math.hypot(I.player.x/TILE-w.x,I.player.y/TILE-w.y); }})()")
        check('Waystone travel from the mainland lands you at the island waystone', ok and r < 5, r)
        g.js(f"(()=>{{ WMAP.travel='wsi_2a'; game.scene.getScene('World')._travelTo('ws_village'); }})()")
        ok = until(g, "game.scene.isActive('World')&&!game.scene.isActive('Island')", 10000, js=True); g.wait(1500)
        r = g.ws("Math.hypot(ws.player.x/TILE-ws.wd.waystones.find(w=>w.id==='ws_village').x, ws.player.y/TILE-ws.wd.waystones.find(w=>w.id==='ws_village').y)")
        check('…and from the island back to a mainland waystone', ok and r < 6, r)
        ok = sail('1b')
        r = g.js(f"({IS}.sites[0].id)")
        check('Castle islands use the same pipeline (castle gate as the entrance)', ok and r == 'isl_castle_q1_b', r)
        g.js(f"(()=>{{ var I={IS}; var n=I._islNPCs.find(n=>n.kind==='trader'); I.player.x=n.x; I.player.y=n.y+8; I.player.cont.setPosition(I.player.x,I.player.y); openIslandShop(I.islData,I.playerState,I); }})()"); g.wait(300)
        check('The island trader uses the shared shop window', g.js("document.getElementById('modal-camp').style.display==='flex' && document.querySelectorAll('#camp-content .shop-item').length>=3"))
        g.js("closeModal('camp')"); g.wait(300)
        g.js(f"(()=>{{ var I={IS}; I.playerState.godMode=false; I.playerState.hp=1; MX.A(I).hurt(50,'test'); }})()")
        died = until(g, "game.scene.isActive('World')&&!game.scene.isActive('Island')", 10000, js=True)
        check('Falling on an island sends you home to the village like anywhere else', died, g.js("[game.scene.isActive('World'),game.scene.isActive('Island')]"))
        g.ws("(()=>{ ps.godMode=true; ps.hp=ps.maxHp; })()")
    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No page errors', not errs, errs[:5])
print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
