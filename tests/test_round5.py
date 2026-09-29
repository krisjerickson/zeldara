"""Round 5: parked mounts + Call Mount, camp loot on Tab + guards stay home, fairies (5 looks per
quadrant, angelic monarchs), trial realm, castles, mage towers + spells, Lab picks.
Run from the repo root after `node build.mjs`: python tests/test_round5.py [section ...]"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
ONLY = set(sys.argv[1:])
def until(g, expr, ms=20000):
    for _ in range(ms // 500):
        if g.ws(expr): return True
        g.wait(500)
    return False
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
def want(sec): return not ONLY or sec in ONLY

TP = "(x,y)=>{ ws.player.x=x; ws.player.y=y; ws.player.cont.setPosition(x,y); }"
with game(new=True) as g:
    g.wait(500)
    g.ws(f"(()=>{{ window._tp={TP}; ps.godMode=true; }})()")
    # ── mounts ──
    if want('mounts'):
        r = g.ws("""(()=>{ var C=ws._camps.filter(c=>c.sec===1); var spot=null; for(var i=0;i<400&&!spot;i++){ var x=CENTER_X*TILE+(Math.random()-0.5)*TILE*140, y=CENTER_Y*TILE+(Math.random()-0.5)*TILE*140; var tx=Math.floor(x/TILE),ty=Math.floor(y/TILE);
            if(getTileSection(tx,ty)===1&&ws._mountSafeTile(tx,ty)&&ws._mountSafeTile(tx+8,ty)&&ws._mountSafeTile(tx+1,ty))spot={x:tx*TILE+16,y:ty*TILE+16}; }
          window._spot=spot; ps.ownedMounts=['horse','alligator']; ps.mount='horse'; ps.parkedMount=null; _tp(spot.x,spot.y); ws.worldAtkTimer=0; ws._worldAttack(); return {spot:spot, mount:ps.mount, parked:ps.parkedMount&&ps.parkedMount.id, spr:!!ws._pm}; })()""")
        check('Attacking on a mount makes you jump off; the mount waits', r['spot'] and r['mount'] is None and r['parked'] == 'horse', r)
        g.wait(1500)
        g.ws("_tp(_spot.x+TILE*8,_spot.y)"); g.wait(600)
        g.key('m'); g.wait(600)
        r = g.js("({open:document.getElementById('modal-mounts').style.display, call:!!document.querySelector('#mounts-content .call-mount')})")
        check('The mount menu offers Call Mount! while your mount waits', r['open'] == 'flex' and r['call'], r)
        g.js("document.querySelector('#mounts-content .call-mount').click()")
        ok = until(g, "ps.mount==='horse'", 15000)
        check('Call Mount! — it gallops to you and you ride again', ok and g.ws("!ps.parkedMount && !ws._pm"), g.ws("[ps.mount, ps.parkedMount, ws._pm&&ws._pm.goal]"))
        g.ws("(()=>{ ws.worldAtkTimer=0; ws._worldAttack(); })()"); g.wait(1500)
        g.ws("(()=>{ var P=ps.parkedMount; _tp(P.x+10,P.y); })()"); g.wait(900)
        g.key('m'); g.wait(600)
        check('[M] next to your waiting mount puts you back on it', g.ws("ps.mount==='horse' && !ps.parkedMount") and g.js("document.getElementById('modal-mounts').style.display!=='flex'"), g.ws("[ps.mount, ps.parkedMount]"))
        r = g.ws("""(()=>{ var w=null; for(var y=0;y<WORLD_H&&!w;y+=2)for(var x=0;x<WORLD_W;x+=2){ if(ws.tiles[y][x]===T.DEEP_WATER&&getTileSection(x,y)===2){ w={x:x*TILE+16,y:y*TILE+16}; break; } }
          ps.mount='alligator'; ps.unlockedSections=[1,2,3,4]; _tp(w.x,w.y); ws.worldAtkTimer=0; ws._worldAttack(); var m=ps.mount; ps.mount=null; _tp(_spot.x,_spot.y); return m; })()""")
        check('…but not over deep water (you stay on the Alligator)', r == 'alligator', r)
        r = g.ws("""(()=>{ var L=null; for(var y=0;y<WORLD_H&&!L;y+=2)for(var x=0;x<WORLD_W;x+=2){ if(ws.tiles[y][x]===T.SHALLOW_WATER&&getTileSection(x,y)===2){ L={x:x*TILE+16,y:y*TILE+16}; break; } }
          var s=ws._mountSafeNear(L.x,L.y,14); return s?ws._mountSafeTile(Math.floor(s.x/TILE),Math.floor(s.y/TILE)):false; })()""")
        check('A mount left in water walks to the nearest safe ground', r, r)
    # ── camps ──
    if want('camps'):
        r = g.ws("""(()=>{ var C=ws._camps.find(c=>c.state==='guarded'&&c.T.r.k==='food'&&c.sec===1); window._C=C; _tp(C.x,C.y+TILE*2.5);
          C.guards.forEach(m=>{ m.dead=true; m._hp=0; if(m.cont)m.cont.setVisible(false); }); ws._campCleared(C); return C.loot.length; })()""")
        g.wait(1200)
        inv0 = g.ws("(ps.inventory||[]).length")
        r2 = g.js("(document.querySelector('.dom-text, [data-domtext]')||{}).textContent||''")
        g.key('Tab'); g.wait(800)
        r3 = g.ws("({left:_C.loot.length, inv:(ps.inventory||[]).length})")
        check('A cleared camp\'s loot is collected with one [Tab]', r >= 2 and r3['left'] == 0 and r3['inv'] - inv0 == r, (r, inv0, r3))
        r = g.ws("""(()=>{ var C=ws._camps.find(c=>c.state==='guarded'&&c.sec===1&&c!==_C&&c.guards.some(m=>!m.dead)); window._C2=C; var m=C.guards.find(m=>!m.dead); window._gm=m; ps.godMode=true;
          _tp(C.x+TILE*3,C.y); m._m.aggro=true; m._m.hurtT=2; return !!m.campHome; })()""")
        g.wait(1500)
        g.ws("_tp(_C2.x+TILE*24,_C2.y)")
        ok = until(g, "Math.hypot(_gm.x-_C2.x,_gm.y-_C2.y)<130 && !_gm._m.aggro", 20000)
        check('Camp guards give up the chase and walk back to their camp', r and ok, g.ws("[Math.round(Math.hypot(_gm.x-_C2.x,_gm.y-_C2.y)), _gm._m.aggro]"))
    # ── fairies + monarchs ──
    if want('fairies'):
        r = g.ws("""(()=>{ var out={}; [1,2,3,4].forEach(q=>{ var F=ws._fairies.filter(f=>f.q===q); out[q]={n:F.length, looks:new Set(F.map(f=>f.F.id)).size}; }); return out; })()""")
        check('Every quadrant has 5 fairies, each with its own look', all(v['n'] == 5 and v['looks'] == 5 for v in r.values()), r)
        r = g.js("[FAIRY_DESIGNS.length, new Set(FAIRY_DESIGNS.map(F=>F.id)).size, FAIRY_MONARCHS.length]")
        check('100 fairy looks and 9 monarchs to pick from', r[0] >= 100 and r[0] == r[1] and r[2] == 9, r)
        r = g.ws("""(()=>{ return ws._kings.map(K=>{ var t=_kingTex(ws,K.q); return {q:K.q, tex:t, h:ws.textures.get(t).get('0').height*1.25}; }); })()""")
        check('Monarchs (Q2–4) are big angelic beings', len(r) == 3 and all(k['tex'].startswith('fairymonarch_') and k['h'] > 150 for k in r), r)
    # ── castles ──
    if want('castles'):
        r = g.js("""(()=>CASTLE_STYLES.map(S=>{ var site={id:'c_'+S.id,type:'tower',design:S.id}; var plans=[0,1,2,3].map(f=>_siteFloorSpec(site,f,4).plan);
            return {id:S.id, plans:plans.join(','), dark:S.dark}; }))()""")
        check('All 12 castles: gatehouse → great hall → round chapel → throne room',
              len(r) == 12 and all(c['plans'] == 'castle_gate,castle_hall,castle_chapel,castle_throne' for c in r), r[:2])
        check('Castles are dark stone (darkness 30%+)', all(c['dark'] >= 0.3 for c in r), [c['dark'] for c in r])
        g.js("""(()=>{ var ws=game.scene.getScene('World'); var S=CASTLE_STYLES[0]; var site={id:'c_test',type:'tower',design:S.id,name:'Test keep',section:1,floors:3};
            ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:1,maxFloors:3,worldScene:ws,theme:'tower'}); })()""")
        for _ in range(30):
            g.wait(400)
            if g.js("!!(game.scene.isActive('Dungeon')&&game.scene.getScene('Dungeon')._labDark!==undefined)"): break
        r = g.js("(()=>{ var d=game.scene.getScene('Dungeon'); return {dark:d._labDark, rt:!!d._darkRT}; })()")
        check('A castle floor builds and is lit by torches in the dark', r['dark'] and r['dark'] >= 0.3, r)
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(1500)
    # ── mage towers + spells ──
    if want('mage'):
        r = g.ws("""(()=>{ var S=ws.wd.sites.filter(s=>s.mage); var per={}; S.forEach(s=>{ per[s.section]=(per[s.section]||0)+1; });
            var tomes=new Set(S.map(s=>MAGE_BY_KEY[s.mage].spell)); return {n:S.length, per:per, tomes:tomes.size, fl:S.map(s=>s.floors)}; })()""")
        check('16 mage towers, 4 in each quadrant, each teaching a different spell', r['n'] == 16 and all(v == 4 for v in r['per'].values()) and r['tomes'] == 16, r)
        r = g.js("Object.keys(ITEMS).filter(k=>ITEMS[k].spellId).map(k=>[k,ITEMS[k].sell||0,ITEMS[k].price||ITEMS[k].buy||0,ITEMS[k].secReq])")
        check('Spells can\'t be bought or sold', all(x[1] == 0 and x[2] == 0 for x in r), [x for x in r if x[1] or x[2]])
        r = g.js("(()=>{ var n={}; MAGE_TOWERS.forEach(M=>{ var q=ITEMS[M.spell].secReq; n[q]=(n[q]||0)+1; if(q!==M.q)n.bad=(n.bad||0)+1; }); return n; })()")
        check('Tower spells are tiered to their quadrant', not r.get('bad') and all(r.get(str(q)) == 4 for q in range(1, 5)), r)
        # world casting of every spell
        errs0 = len(g.errs)
        r = g.ws("""(()=>{ var bad=[]; ps.unlockedSections=[1,2,3,4]; MAGE_TOWERS.forEach(M=>{ ps.equip.spell=M.spell; ps.mana=999; ws._spellCd=0; try{ ws._castSpell(); }catch(e){ bad.push(M.spell+': '+e.message); } }); return bad; })()""")
        g.wait(3000)
        check('All 16 spells cast in the overworld', not r and len(g.errs) == errs0, (r, g.errs[errs0:errs0+3]))
        # boss tower: last floor spawns the master, claim teaches the spell
        g.js("""(()=>{ var ws=game.scene.getScene('World'); var ps=ws.playerState; ps.equip.spell=null; ps.mageDone=[]; ps.spellsLearned=[]; var site=ws.wd.sites.find(s=>s.mage==='hearthfire'); window._mageSite=site;
            ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:site.floors-1,maxFloors:site.floors,worldScene:ws,theme:'tower'}); })()""")
        for _ in range(30):
            g.wait(400)
            if g.js("!!(game.scene.getScene('Dungeon')&&game.scene.getScene('Dungeon')._bossGroup)"): break
        r = g.js("(()=>{ var d=game.scene.getScene('Dungeon'), B=d._bossGroup&&d._bossGroup[0]; return B?{id:B.bossKey, boss:B.isBoss, others:d.monsters.filter(m=>!m.dead&&m!==B).length}:null; })()")
        check('The top floor holds the tower master (and no other monsters)', r and r['id'] == 'mg_hearthfire' and r['others'] == 0, r)
        errs0 = len(g.errs)
        r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), ps=d.worldScene.playerState, bad=[]; MAGE_TOWERS.forEach(M=>{ ps.equip.spell=M.spell; ps.mana=999; _heroSpellCdUntil=0; try{ _heroCastSpell(d); }catch(e){ bad.push(M.spell+': '+e.message); } }); ps.equip.spell=null; return bad; })()""")
        g.wait(3000)
        check('All 16 spells cast inside a tower', not r and len(g.errs) == errs0, (r, g.errs[errs0:errs0+3]))
        g.js("(()=>{ var d=game.scene.getScene('Dungeon'); d._openBossChest(); })()"); g.wait(600)
        r = g.ws("({done:ps.mageDone, learned:ps.spellsLearned, eq:ps.equip.spell})")
        check('Beating the master teaches (and equips) the tower\'s spell', r['done'] == ['hearthfire'] and 'fireball_tome' in r['learned'] and r['eq'] == 'fireball_tome', r)
        until(g, "!game.scene.isActive('Dungeon') && game.scene.isActive('World')", 8000)
        # the master's tricks: slip + blind statuses apply to the hero
        r = g.ws("""(()=>{ var A={scene:ws, p:()=>({x:ws.player.x,y:ws.player.y}), float:()=>{}}; MX.status(A,'slip',2); var S=MX.S(ws); return {slip:S.slipT}; })()""")
        check('Ice magic makes you slip', r['slip'] and r['slip'] > 1, r)
        r = g.js("MAGE_TOWERS.map(M=>MX.KITS[M.rid]).filter(k=>!k).length")
        check('Every tower master has a combat kit', r == 0, r)
    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No page errors', not errs, errs[:5])
print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
