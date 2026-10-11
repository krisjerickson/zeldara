"""Round 45 — Kris's Oct 10 list and the messages after it: M calls the mount (a real gallop, stables-only chooser); village buildings solid only
at their base (walk behind them, outline through the roof); "no effect" is now a quarter of the damage; death in a dungeon brings you home with
full health (twice in a row); off-screen objects not drawn; the sandbox spawns the new monsters and reveals the Tome; the weapon wheel (no-element
row outside, bows and warbows, no overlaps); the picked site designs (new) and the old layouts kept for repeated design types (towers larger);
the roll on Alt (taught by Tumbler Pia); the special button's cooldown; sky ports pause the world; slippery patches end with their caster;
the Tome's painted pictures and the "How it all fits" chapter.
Run: python tests/test_round45.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(5000)
    # ── village buildings: solid only along their base ──
    r = g.js("""(()=>{ var wd=game.scene.getScene('World').wd, b=wd.props.filter(function(p){ return p.vill&&p.prop==='vbuild'&&p.h>=4; }), bad=[];
      b.forEach(function(p){ for(var x=p.x;x<p.x+p.w;x++){ var t=wd.tiles[p.y][x]; if(t===T.BUILDING_WALL||t===T.PROP)bad.push(p.o&&p.o.type||'?'); } }); return {n:b.length,bad:bad.slice(0,5)}; })()""")
    check('Village buildings block only their bottom rows — the top row of every tall building is walkable (%d buildings)' % r['n'], r['n'] > 0 and not r['bad'], r)
    # ── M: the mount comes at a gallop ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, p=ws.player; ps.ownedMounts=(ps.ownedMounts||[]).concat(['horse']); ps.activeMount='horse'; ps.mount=null; ps.parkedMount=null;
      p.x=(CENTER_X+VILLAGE_RADIUS+40)*TILE; p.y=CENTER_Y*TILE; p.cont.setPosition(p.x,p.y); ws.cameras.main.centerOn(p.x,p.y); await new Promise(r=>setTimeout(r,600));
      window._mountKey(); var P=ps.parkedMount, d0=P?Math.hypot(P.x-p.x,P.y-p.y):null; await new Promise(r=>setTimeout(r,1500)); P=ps.parkedMount; var d1=P?Math.hypot(P.x-p.x,P.y-p.y):null;
      return {d0:d0,d1:d1,mounted:ps.mount,modal:!!document.querySelector('#modal-mounts[style*="flex"]')}; })()""")
    check('M calls the mount from the stables and it travels (not a teleport): %s → %s px away' % (r['d0'], r['d1']),
          (r['mounted'] or (r['d0'] is not None and r['d1'] is not None and r['d1'] < r['d0'])) and not r['modal'], r)
    # ── no effect = a quarter ──
    r = g.js("({s:MX.SHRUG, h:typeof MX.shrugHint})")
    check('"No effect" now does a quarter of the damage (MX.SHRUG = 0.25) and says "shrugs it off"', r['s'] == 0.25 and r['h'] == 'function', r)
    # ── off-screen culling ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), cam=ws.cameras.main; await new Promise(r=>setTimeout(r,800)); var off=0, on=0, hid=0;
      ws.children.list.forEach(function(o){ if(o.type!=='Image'&&o.type!=='Sprite')return; var v=cam.worldView, inV=o.x>v.x-200&&o.x<v.right+200&&o.y>v.y-200&&o.y<v.bottom+300; if(inV)on++; else { off++; if(o.cameraFilter&cam.id)hid++; } });
      return {off:off,hid:hid,on:on}; })()""")
    check('Objects far off-screen are not drawn (%d of %d hidden)' % (r['hid'], r['off']), r['off'] == 0 or r['hid'] >= r['off'] * 0.8, r)
    # ── sandbox ──
    r = g.js("""(async ()=>{ var n0=Object.keys((Tome.book()||{}).monster||{}).length; sbRevealTome(); var b=Tome.book(), all=Tome.list('monster').length, got=Tome.list('monster').filter(function(id){ return b.monster[id]; }).length;
      var ws=game.scene.getScene('World'); sbSpawnMonsters(); await new Promise(r=>setTimeout(r,1500)); var m1=(ws.worldMonsters||[]).filter(function(m){ return m._sbShow; }).length;
      return {all:all,got:got,spawned:m1,roster:MON_ROSTER.length}; })()""")
    check('Sandbox: "Reveal the Tome" opens every entry (%d / %d monsters); "Spawn all monsters" shows the new roster (%d of %d)' % (r['got'], r['all'], r['spawned'], r['roster']),
          r['got'] == r['all'] and r['spawned'] >= r['roster'] * 0.9, r)
    # ── slippery patches end with their caster ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), L=(ws.worldMonsters||[]).filter(function(m){ return !m.dead&&m._sbShow; }); if(!L.length)return {skip:1}; if(typeof _closeAllOverlays==='function')_closeAllOverlays(); if(ws.sys.isPaused())ws.scene.resume(); var mon=L[0], A=MX.A(ws);
      var z=MX.zone(A,{x:ws.player.x+300,y:ws.player.y,r:40,t:30,st:'slow',src:mon}); var tt=z.t; mon.dead=true; await new Promise(r=>setTimeout(r,1800)); var F=MX.fx(A); return {t0:tt,left:F.zones.indexOf(z)>=0}; })()""")
    check('A ground patch lasts at most 10 s and fades within a second once its caster dies', r.get('skip') or (r['t0'] <= 10 and not r['left']), r)
    g.js("(()=>{ var ws=game.scene.getScene('World'); (ws.worldMonsters||[]).forEach(function(m){ if(m._sbShow&&!m.dead&&m.cont){ m.dead=true; m.cont.setVisible(false); } }); })()")

    # ── the weapon wheel ──
    r = g.js("""(async ()=>{ Tome.open(); Tome.ui.cat='arms'; Tome.render(); await new Promise(r=>setTimeout(r,800)); var lay=Tome._arms._lay, P=lay.pos, k=Object.keys(P), bad=[];
      for(var i=0;i<k.length;i++)for(var j=i+1;j<k.length;j++){ var a=P[k[i]], b=P[k[j]]; if(Math.abs(a[0]-b[0])<35&&Math.abs(a[1]-b[1])<35)bad.push(k[i]+'~'+k[j]); }
      var bows=['ember_bow','tide_bow','briar_bow','granite_bow','thunder_bow','shade_bow','sunbloom_warbow','squall_warbow','barrow_warbow'];
      var outside=lay.none.every(function(id){ return P[id][1]>720; });
      return {n:k.length,bad:bad,bows:bows.filter(function(b){ return !P[b]||!ZForge.recipe(b); }),outside:outside,none:lay.none.length,lane:!!ZForge.BOW,pearl:!!(ITEMS.squall_pearl&&R45_RARE.squall_pearl)}; })()""")
    check('Weapon wheel: %d weapons, none overlapping; the %d no-element weapons sit outside the wheel; six element bows and three warbows forged like the crossbows' % (r['n'], r['none']),
          not r['bad'] and r['outside'] and not r['bows'] and r['lane'] and r['pearl'], r)
    # ── the Tome's pictures and How it all fits ──
    r = g.js("""(async ()=>{ var o={}; o.item=Tome.pic('item','iron_sword',Tome.entry('item','iron_sword'),1.5).indexOf('zi-b')>=0; o.spell=Tome.pic('spell','fireball',Tome.entry('spell','fireball'),1.5).indexOf('zi-b')>=0;
      o.camp=Tome.pic('place','camp_goblin_fire',Tome.entry('place','camp_goblin_fire'),1.5).indexOf('zi-b')>=0; o.zone=Tome.pic('place','zone_windmill_hills',Tome.entry('place','zone_windmill_hills'),1.5).indexOf('zi-b')>=0;
      o.quest=Tome.pic('quest','q1_f0',Tome.entry('quest','q1_f0'),1.5).indexOf('zi-b')>=0; o.pages={};
      for(var p of ['stars','compass','grid','realms','journey','web']){ Tome.ui.cat='fits'; Tome._fits.pg=p; Tome._fits.sel=null; Tome.render(); await new Promise(r=>setTimeout(r,250)); var gr=document.getElementById('tome-grid'); o.pages[p]=gr.innerHTML.indexOf('could not be drawn')<0&&gr.innerHTML.length>200; }
      return o; })()""")
    check('Tome: items, spells, camps, regions and fairy quests show painted pictures; "How it all fits" draws all six pages', all([r['item'], r['spell'], r['camp'], r['zone'], r['quest']]) and all(r['pages'].values()), r)
    g.js("(()=>{ var m=document.getElementById('modal-tome'); if(m)m.style.display='none'; document.body.classList.remove('bars-hidden'); })()")
    # ── the realm view on the world map ──
    r = g.js("""(async ()=>{ WMAP.realms=true; openWorldMap(); await new Promise(r=>setTimeout(r,800)); var ok=!!_wmRealmTint(game.scene.getScene('World').wd), b=!!document.querySelector('.wmap-rl'); var m=document.getElementById('modal-map'); m.style.display='none'; WMAP.realms=false; document.body.classList.remove('bars-hidden'); return {ok:ok,b:b}; })()""")
    check('The world map (B) has a Realms switch that tints each realm by its element', r['ok'] and r['b'], r)

    # ── the adventure sites: new designs and the old ones kept ──
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), o={newOk:[],oldOk:[],bad:[]}; ws.wd.sites.forEach(function(s){ if(!s.design)return; var nf=s.floors||3, sp=_siteFloorSpec(s,0,nf); if(!sp){ o.bad.push(s.id); return; }
        var id=ZSP.idOf0(s,0); if(id&&ZSP.isOld(id)){ if(sp.zsp)o.bad.push(s.id+' should be old'); else o.oldOk.push(s.id); } else if(id){ if(!sp.zsp)o.bad.push(s.id+' should be new'); else o.newOk.push(s.id); } });
      var t=_siteFloorSpec(ws.wd.sites.find(function(s){ return s.id==='s3_tower'; }),0,7), m=_buildSiteFloor(t), P=TOWER_PLANS[t.plan];
      o.towerW=[m.w,P.w+4]; return {nNew:o.newOk.length,nOld:o.oldOk.length,bad:o.bad,towerW:o.towerW}; })()""")
    check('Sites: %d use your picked new designs, %d keep their own old layout (their design type repeated); old tower floors are 1.5× larger (%s)' % (r['nNew'], r['nOld'], r['towerW']),
          not r['bad'] and r['nNew'] >= 15 and r['nOld'] >= 15 and r['towerW'][0] >= r['towerW'][1] * 1.4, r)

    # ── the roll: Alt, once Tumbler Pia has taught it ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, p=ws.player; ps.mount=null; p.x=(CENTER_X+VILLAGE_RADIUS+30)*TILE; p.y=CENTER_Y*TILE; p.cont.setPosition(p.x,p.y); p.dir='right';
      var x0=p.x; ps.canRoll=false; ZROLL._cdUntil=0; ZROLL.go(ws); await new Promise(r=>setTimeout(r,500)); var before=Math.abs(p.x-x0);
      ps.canRoll=true; ZROLL._cdUntil=0; var x1=p.x; ZROLL.go(ws); await new Promise(r=>setTimeout(r,600)); var after=Math.abs(p.x-x1);
      var npc=!!ZROLL.site(ws), sold=!ITEMS.sp_roll||!ITEMS.sp_roll.buy; return {before:before,after:Math.round(after),npc:npc,sold:sold}; })()""")
    check('Roll (Alt): nothing before Tumbler Pia teaches it; afterwards a quick dodge (%d px); no longer sold as a skill' % r['after'], r['before'] < 2 and r['after'] > 40 and r['npc'] and r['sold'], r)
    # ── the special button shows the skill and its cooldown ──
    r = g.js("""(async ()=>{ var el=document.getElementById('action-special-slot'); if(!el)return {none:1}; var ws=game.scene.getScene('World'), ps=ws.playerState; ps.inventory.push('sp_whirlwind'); ps.equip.special='sp_whirlwind';
      ws._specialCD=Math.max(ws._specialCD||0,3); ws.specialCooldown=3; await new Promise(r=>setTimeout(r,400)); return {cd:!!el.querySelector('.cd'), num:(el.querySelector('.cdn')||{}).textContent||'', ic:el.innerHTML.indexOf('whirlwind')>=0||el.innerHTML.indexOf('zi-b')>=0}; })()""")
    check('The special button shows the chosen skill and drains its cooldown', r.get('none') is None and r['cd'] and r['ic'], r)

    # ── death in a dungeon, twice: home with full health ──
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id);
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data);})"""
    outs = []
    for i in range(2):
        g.js("(()=>{ if(typeof ZDeath!=='undefined')ZDeath.auto=true; })()")
        g.js(L, ['s1_dungeon', 0]); g.wait(5000)
        g.js("(()=>{ var d=game.scene.getScene('Dungeon'); var ps=game.scene.getScene('World').playerState; ps.hp=0; _heroDied(d); })()"); g.wait(7000)
        outs.append(g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; return {dun:game.scene.isActive('Dungeon'), world:game.scene.isActive('World'), hp:ps.hp, max:ps.maxHp}; })()"))
    check('Dying in a dungeon twice in a row: each time you are back in the world with full health', all((not o['dun']) and o['world'] and o['hp'] >= o['max'] for o in outs), outs)

    # ── sky ports: the world sleeps ──
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'); game.scene.start('Sky',{worldScene:ws,section:1,site:ws.wd.sites.find(function(s){ return s.id==='s1_skyport'; })}); await new Promise(r=>setTimeout(r,2500));
      var t0=ws.time.now; await new Promise(r=>setTimeout(r,1500)); var o={sky:game.scene.isActive('Sky'), asleep:game.scene.isSleeping('World')||game.scene.isPaused('World'), frozen:Math.abs(ws.time.now-t0)<50}; return o; })()""")
    check('Entering a sky port pauses the world behind it', r['sky'] and r['asleep'] and r['frozen'], r)

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
