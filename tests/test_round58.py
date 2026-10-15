"""Round 57–58 — Muspelheim remade (16c): the gate and the four keys; the Chain Lifts (lifts carry you, a freed spirit locks its lift into a bridge),
the Lava Rafts, the Ash-warden Fortress (gates and levers, the wardens come), the Falling Bridges (they crack and fall behind you), two old volcano bosses
guarding each hall's way down; the Throne — Surtharn's six phases, the great hearth (Sovereign staff + four Heartglasses → the Lodestar), the reward.
Also: the Sovereign staff at the forge, the title page rebalanced, and Muspelheim's sandbox buttons.
Run: python tests/test_round58.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"

with game(new=True, painted=True) as g:
    g.wait(4000)
    # ── the gate ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ps.soulGems={1:1,2:1,3:1,4:1};
      ps.completedQuests=['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower']; ps.rescued=[1,2,3,4]; ps.unlockedSections=[1,2,3,4]; _wgApplyGates(ws.wd,ps); await w(2500); if(typeof FairyTalk!=='undefined')FairyTalk.close();
      var site=ws.wd.sites.find(function(s){ return s.type==='volcano_main'; }); ws._enterSite(site); await w(600); var locked=!game.scene.isActive('Dungeon');
      ps.inventory.push('volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w'); ws._enterSite(site); await w(5500);
      var D=game.scene.getScene('Dungeon'); return {locked:locked, run:game.scene.isActive('Dungeon'), musp:D._musp, floor:D.floor, title:document.getElementById('dng-title').textContent}; })()""" % W)
    check('The gate of Muspelheim stays shut without the four keys; with them it opens onto the first hall ("%s")' % r['title'], r['locked'] and r['run'] and r['musp'] and r['floor'] == 0, r)
    # ── 1 the Chain Lifts ──
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), M=D._mm, P=M.plats[0];
      var Q=M.plats[1]; Q.u=1; Q.x=Q.b.x; Q.y=Q.b.y; Q.v.setPosition(Q.x,Q.y); Q.wait=60; var lk=Q.tiles[0], lp=ZMUSP.T2P(lk), blocked=!D._canGoD(lp.x,lp.y)||!!ZMUSP.onPlat(D,lp.x,lp.y);
      P.u=0; P.dir=1; P.wait=0; P.x=P.a.x; P.y=P.a.y; D.px=P.x; D.py=P.y; var x0=D.px; await w(2500); var carried=Math.abs(D.px-x0), onIt=!!ZMUSP.onPlat(D,D.px,D.py);
      Q.wait=60; D.px=lp.x; D.py=lp.y; M.safe={x:D.stairsUpTile.x*TILE+16,y:D.stairsUpTile.y*TILE+16}; M._fallT=0; await w(300);
      var back=Math.hypot(D.px-M.safe.x,D.py-M.safe.y)<4;
      return {lifts:M.plats.length, lava:Object.keys(M.lava).length, blocked:blocked, carried:Math.round(carried), onIt:onIt, back:back}; })()""" % W)
    check('The Chain Lifts: %d lifts over the lava; the lava stops you, a lift carries you across (%d px), stepping into the fire throws you back' % (r['lifts'], r['carried']), r['lifts'] == 3 and r['blocked'] and r['carried'] > 60 and r['onIt'] and r['back'], r)
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), M=D._mm, S=D._muspSp.find(function(o){ return o.lift!==undefined; }); if(!S)return {none:true}; var P=M.plats[S.lift], n0=Object.keys(M.lava).length;
      D.px=S.x; D.py=S.y; D._interact(); await w(300); return {held:P.held, n0:n0, n1:Object.keys(M.lava).length, freed:(D.worldScene.playerState.muspFreed||[]).length}; })()""" % W)
    check('The spirit at a lift’s winch: break its chains and the lift locks into a bridge (lava tiles %s → %s)' % (r.get('n0'), r.get('n1')), r.get('held') and r['n1'] < r['n0'] and r['freed'] == 1, r)
    r = g.js("""(async()=>{ %s var D=game.scene.getScene('Dungeon'), ps=D.worldScene.playerState, s=D.interactables.find(function(i){ return i.type==='stairs_down'; }); D.px=s.x; D.py=s.y; var f0=D.floor; D._interact(); await w(400);
      var stillHere=game.scene.getScene('Dungeon').floor===f0, guard=D._muspGuard, names=D._bossGroup.map(function(m){ return m.def.name; });
      D._bossGroup.slice().forEach(function(m){ m.hp=0; D._monsterDied(m); }); await w(500); return {stillHere:stillHere, guard:guard, names:names, open:!D._muspGuard, saved:(ps.muspGuards||[]).slice()}; })()""" % W)
    check('Two old volcano bosses guard the way down (%s) — the stairs stay shut until both fall' % ' & '.join(r['names']), r['stillHere'] and r['guard'] and len(r['names']) == 2 and r['open'] and r['saved'] == ['musp_g1'], r)
    # ── 2 the Lava Rafts ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'); ZMUSP.enter(ws,1); await w(5500); var D=game.scene.getScene('Dungeon'), M=D._mm, p0=M.plats.map(function(P){ return [P.x,P.y]; }); await w(2500);
      return {rafts:M.plats.length, kinds:M.plats.map(function(P){ return P.k; }), moved:M.plats.filter(function(P,i){ return Math.hypot(P.x-p0[i][0],P.y-p0[i][1])>10; }).length, lava:Object.keys(M.lava).length}; })()""" % W)
    check('The Lava Rafts: %d rafts drifting shore to shore over the river (%d moved)' % (r['rafts'], r['moved']), r['rafts'] == 3 and all(k == 'raft' for k in r['kinds']) and r['moved'] >= 2 and r['lava'] > 20, r)
    # ── 3 the Ash-warden Fortress ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'); ZMUSP.enter(ws,2); await w(5500); var D=game.scene.getScene('Dungeon'), M=D._mm, G=M.gates[0], shut=!D._canGoD(G.x,G.y), m0=D.monsters.filter(function(m){ return !m.dead; }).length;
      D.px=G.lever.x; D.py=G.lever.y; D._interact(); await w(1200); var wardens=D.monsters.filter(function(m){ return !m.dead&&m.def&&m.def.name==='Ash-warden'; }).length;
      return {gates:M.gates.length, shut:shut, open:G.open&&D._canGoD(G.x,G.y), wardens:wardens}; })()""" % W)
    check('The Ash-warden Fortress: %d gates, each shut until its lever is pulled — and the lever calls %d ash-wardens' % (r['gates'], r['wardens']), r['gates'] == 3 and r['shut'] and r['open'] and r['wardens'] >= 3, r)
    # ── 4 the Falling Bridges ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'); ZMUSP.enter(ws,3); await w(5500); var D=game.scene.getScene('Dungeon'), M=D._mm, k=+Object.keys(M.crumb)[5], p=ZMUSP.T2P(k);
      M.safe={x:D.stairsUpTile.x*TILE+16,y:D.stairsUpTile.y*TILE+16}; D.px=p.x; D.py=p.y; await w(400); var cracked=M.crumb[k].st===1; await w(1200);
      var fell=!!M.hole[k], back=Math.hypot(D.px-M.safe.x,D.py-M.safe.y)<4; return {n:Object.keys(M.crumb).length, cracked:cracked, fell:fell, back:back}; })()""" % W)
    check('The Falling Bridges: %d slabs; one cracks under you and falls — you scramble back to the rock' % r['n'], r['n'] > 40 and r['cracked'] and r['fell'] and r['back'], r)
    # ── 5 the Throne: Surtharn, the great hearth ──
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ZMUSP.enter(ws,4); await w(6000); var D=game.scene.getScene('Dungeon'), B=D._bossGroup[0], o={boss:B.def.name, ward:!!B.sovWard, phases:BossPhases.count('surtharn'), hearth:!!D._muspHearth, ph:[]};
      for(var k=0;k<6;k++){ var b=D._bossGroup[0]; o.ph.push(D._bossPhase+':'+(b&&b.def.name)); b.hp=0; D._monsterDied(b); await w(2400); } o.def=!!D._bossDefeated;
      var H=D._muspHearth; D.px=H.x; D.py=H.y; D._interact(); o.early=(ps.inventory||[]).indexOf('lodestar')>=0;
      ps.inventory.push('sov_staff','heartglass_1','heartglass_2','heartglass_3','heartglass_4'); D._interact(); o.lode=ps.inventory.indexOf('lodestar')>=0; o.used=['sov_staff','heartglass_1','heartglass_4'].every(function(i){ return ps.inventory.indexOf(i)<0; });
      var bc=D.interactables.find(function(i){ return i.type==='boss_chest'; }); D.px=bc.x; D.py=bc.y; D._interact(); await w(2800);
      o.quests=['muspelheim','volcano_lord'].every(function(q){ return ps.completedQuests.indexOf(q)>=0; }); await w(3000); var D2=game.scene.getScene('Dungeon'); o.world=game.scene.isActive('World')||!!(D2&&D2._escRun);      /* round 59: with the Lodestar made, Muspelheim falls — the escape run begins */ o.sov=ZEL.isSov(ITEMS.lodestar); return o; })()""" % W)
    check('The Throne: %s, warded, %d phases fought in place (%s)' % (r['boss'], r['phases'], ' → '.join(x.split(':')[1].replace('Surtharn, ', '') for x in r['ph'])), r['ward'] and r['phases'] == 6 and [x.split(':')[0] for x in r['ph']] == ['1', '2', '3', '4', '5', '6'] and r['def'], r)
    check('The great hearth: nothing without the staff and the four Heartglasses; with them — the Lodestar (Sovereign), the staff and glasses used', not r['early'] and r['lode'] and r['used'] and r['sov'], r)
    check('The portal chest: Surtharn’s reward, Muspelheim done — and (round 59) with the Lodestar made, the escape begins', r['quests'] and r['world'], r)
    # ── kits, the forge, the title, the sandbox ──
    r = g.js("""(()=>{ var bad=[]; Object.keys(BOSS_PHASES).filter(function(k){ return BOSS_PHASES[k].musp; }).forEach(function(k){ BOSS_PHASES[k].phases.forEach(function(P){ [[P.rid,P.kit]].concat((P.allies||[]).map(function(a){ return [a.rid,a.kit]; })).forEach(function(x){ var mods=String(x[1]).split('|').map(function(t){ return t.trim().split(/\\s+/)[0]; }); var unk=mods.filter(function(m,i){ return !(MX.ATK[m]||MX.DEF[m]||(i===0&&MX.MOVE[m])); }); if(!MX.kit(x[0])||unk.length)bad.push(x[0]+': '+unk.join(',')); }); }); }); return bad; })()""")
    check('Every guard and Surtharn phase uses only known attacks', not r, r)
    r = g.js("""(()=>{ var ps=game.scene.getScene('World').playerState, R=ZForge.recipe('sov_staff'), html=ZForge.html(ps); var cfg=ZBrand.HOMES.find(function(x){ return x.id===ZBrand.HOME; }), c2=ZBrand.homeCfg(cfg,1280,800), L=ZBrand.homeLayout(cfg,1280,800,{btns:['NEW GAME']});
      return {recipe:!!R, stage:ZForge.STAGE.sov_staff, lane:/The Sovereign staff/.test(html), bs:c2.bs, bh:Math.round(L[0].h), sr:c2.sr}; })()""")
    check('The Sovereign staff at the forge once the forges rise (%s), in its own lane; the title rebalanced (buttons ×%s, %d px tall; tree radius %s)' % (r['stage'], r['bs'], r['bh'], r['sr']), r['recipe'] and r['stage'] == 'forges' and r['lane'] and r['bs'] < 1 and r['bh'] < 70 and r['sr'] > 0.085, r)
    r = g.js("""(()=>{ SBSAGA.show(); var A=document.querySelectorAll('#modal-saga .sbs-arc')[5], n=A.querySelectorAll('button[data-k]:not(.sbs-todo)').length; closeModal('saga'); return n; })()""")
    check('The Spirit Saga sandbox: Muspelheim’s buttons are wired (%d)' % r, r >= 7, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
