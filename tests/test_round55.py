"""Rounds 54c + 55 — the spirits move (digging rhythm, floating, the Green where they wander and gather into groups) and the Forges of Muspelheim
remade: floor 1 the old challenge (no key — the way down), floors 2–3 mine galleries with chained spirits to free, a three-phase forge-master
warded by Muspelheim, the hearth that makes Heartglass, and the key from the portal chest.
Run: python tests/test_round55.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

with game(new=True, painted=True) as g:
    g.wait(4000)
    # ── a bound spirit at its stone: it digs (its pose changes through the stroke) ──
    r = g.js("""(async()=>{ var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; var s=ZSPIRIT.shrines(ws)[3];
      ws.player.x=s.x+150; ws.player.y=s.y+60; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(2500); var V=s._v, C=V&&V.sp, m=C&&C._m, rs=[];
      for(var i=0;i<14;i++){ if(m)rs.push(Math.round(m.B.rotation*1000)); await w(110); } return {live:!!m, mode:m&&m.mode, rots:rs, uniq:new Set(rs).size}; })()""")
    check('A bound spirit digs: its own picture, cut at the waist, leaning back and striking (%d different poses in 1.5 s)' % r['uniq'], r['live'] and r['mode'] == 'bound' and r['uniq'] >= 6, r)
    # ── the Green with all forty free ──
    r = g.js("""(async()=>{ var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var ws=game.scene.getScene('World'), ps=ws.playerState; ps.spiritsFreed=ZSPIRIT.shrines(ws).map(function(s){ return s.id; });
      ws.player.x=CENTER_X*TILE+16; ws.player.y=(CENTER_Y+11)*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(3000);
      var S=ws._zg, keys=Object.keys(S.sp), p0=keys.map(function(k){ var o=S.sp[k].o; return [o.x,o.y]; }); await w(9000);
      var moved=keys.filter(function(k,i){ var o=S.sp[k].o; return Math.hypot(o.x-p0[i][0],o.y-p0[i][1])>4; }).length; await w(14000);
      return {n:keys.length, live:keys.filter(function(k){ return !!S.sp[k].o._m; }).length, moved:moved, groups:S.groups.map(function(G){ return [G.g[0],G.stage,!!G.im]; }), spots:ZGREEN.spots(ws).length, kinds:ZGREEN.GROUPS.length}; })()""")
    check('All forty freed spirits are on the Green as themselves (%d living pictures), and they wander (%d moved in 9 s)' % (r['live'], r['moved']), r['n'] == 40 and r['live'] == 40 and r['moved'] >= 15, r)
    held = [x for x in r['groups'] if x[1] == 'held' and not x[2]]      # round 59 (Kris): the forty gather as themselves — no group pictures on the Green
    check('They gather in little groups of themselves at the green\'s spots (%s) — no group pictures on the Green (kept for the ending: %d)' % (r['groups'], r['kinds']), len(held) >= 1 and len(r['groups']) >= 2 and not any(x[2] for x in r['groups']) and r['kinds'] >= 17, r)
    # ── the forge: floor 1 → the way down ──
    r = g.js("""(async()=>{ var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var ws=game.scene.getScene('World'), ps=ws.playerState;
      ps.soulGems={1:1,2:1,3:1,4:1}; ps.completedQuests=['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower']; ps.rescued=[1,2,3,4]; ps.unlockedSections=[1,2,3,4]; _wgApplyGates(ws.wd,ps); await w(2500); if(typeof FairyTalk!=='undefined')FairyTalk.close(); await w(400);
      var site=ws.wd.sites.find(function(s){ return s.id==='volcano_n'; }); ws._enterSite(site); await w(1500); var vm=game.scene.getScene('VolcanoMaze');
      vm._grantKey(); var o={noKey:ps.inventory.indexOf('volcano_key_n')<0, down:!!vm._forgeDown}; vm._exitToWorld(); await w(4500);
      var D=game.scene.getScene('Dungeon'); o.forge=D._forge; o.floor=D.floor; o.running=D.sys.settings.status===5; o.title=document.getElementById('dng-title').textContent; o.sp=(D._forgeSp||[]).length;
      var s0=D._forgeSp[0]; D.px=s0.x; D.py=s0.y; D._interact(); o.freed=(ps.forgeFreed||[]).length; o.vis=!!(s0.vis&&s0.vis._m); return o; })()""")
    check('Floor 1\'s chest no longer holds the key — it opens the way down into "%s" (%d chained spirits)' % (r['title'], r['sp']), r['noKey'] and r['down'] and r['forge'] and r['running'] and r['floor'] == 1 and 'Ember Forge' in r['title'] and r['sp'] == 5, r)
    check('[Tab] by a chained spirit breaks its chains (it digs as a living picture until then)', r['freed'] == 1 and r['vis'], r)
    r = g.js("""(async()=>{ var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }; var ws=game.scene.getScene('World'), ps=ws.playerState; game.scene.stop('Dungeon'); await w(500);
      game.scene.start('Dungeon',{site:ZFORGE.site('volcano_n'),floor:2,maxFloors:3,worldScene:ws,theme:'volcano',forgeKey:'volcano_key_n',forgeKeyName:'Ember Key'}); await w(5000);
      var D=game.scene.getScene('Dungeon'), B=D._bossGroup[0], o={last:D.isLastFloor, sp:(D._forgeSp||[]).length, hearth:!!D._forgeHearth, boss:B.def.name, ward:!!B.sovWard, phases:BossPhases.count(D._bossKey)};
      var e0=JSON.stringify(ps.equip||{}); ps.equip=ps.equip||{}; ps.equip.lHand='flame_iron'; o.plain=ZHit.dmg(D,B,50,'melee',{pure:true,noProc:true}); ps.equip.lHand='sov_axe'; o.sov=ZHit.dmg(D,B,50,'melee',{pure:true,noProc:true}); ps.equip=JSON.parse(e0);
      D.px=D._forgeHearth.x; D.py=D._forgeHearth.y; D._interact(); o.early=(ps.inventory||[]).indexOf('heartglass_1')>=0;
      var ph=[]; for(var k=0;k<3;k++){ var b=D._bossGroup[0]; ph.push(D._bossPhase); b.hp=0; D._monsterDied(b); await w(2200); } o.ph=ph; o.def=!!D._bossDefeated;
      D._interact(); o.missing=(ps.inventory||[]).indexOf('heartglass_1')>=0; ps.inventory.push('soulglass_lattice_1','hearth_tray_1'); D._interact(); o.hg=ps.inventory.indexOf('heartglass_1')>=0&&ps.inventory.indexOf('hearth_tray_1')<0;
      var bc=D.interactables.find(function(i){ return i.type==='boss_chest'; }); D.px=bc.x; D.py=bc.y; D._interact(); await w(2600);
      o.key=ps.inventory.indexOf('volcano_key_n')>=0; o.done=ps.forgesDone; o.world=game.scene.isActive('World'); o.s4=(ps.completedQuests||[]).filter(function(q){ return q==='s4_dungeon'; }).length;
      var d=document.createElement('div'); d.innerHTML=ZROLL.questHTML(ps); o.j=/The Forges of Muspelheim/.test(d.textContent)&&/Ember Forge ✓/.test(d.textContent); return o; })()""")
    check('Floor 3: five more spirits, the hearth, and %s — three phases, warded (a fire blade %d, Sovereign %d)' % (r['boss'], r['plain'], r['sov']), r['last'] and r['sp'] == 5 and r['hearth'] and r['ward'] and r['phases'] == 3 and r['sov'] > r['plain'] * 4, r)
    check('The phases run in place (%s), then the forge-master falls' % r['ph'], r['ph'] == [1, 2, 3] and r['def'], r)
    check('The hearth waits for the forge-master, then needs the lattice AND the tray — and makes the Ember Heartglass', not r['early'] and not r['missing'] and r['hg'], r)
    check('The portal chest gives the key to the next forge and takes you out (the s4 quest is not touched); the journal lists the forge', r['key'] and r['done'] == ['volcano_n'] and r['world'] and r['s4'] == 1 and r['j'], r)
    r = g.js("(()=>{ var ids=[]; ZSCN.SHEETS.filter(function(S){ return S.wave===56||S.wave===57; }).forEach(function(S){ ids.push(S.id); }); return ids; })()")
    check('Waves 56–57 ordered: ten sheets of group loops, the forge hearths and Heartglass icons (%d sheets)' % len(r), len(r) == 12, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
