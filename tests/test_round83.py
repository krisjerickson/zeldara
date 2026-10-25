"""Round 83 — no more wearing a boss down from afar (Kris: "we need to fix being able to range attack bosses from afar with spells to
slowly kill the bosses"): a boss struck from beyond 5 tiles charges in (04j ZHit.range, 09 MX.tick); spells from beyond 6 tiles are
warded (−40 %), arrows hit in full; mana comes back at 1.5 mp/s in a fight, 4 out of one, gear +2.5 at most (09-hero-core ZMREGEN);
mana draughts are cheaper, 5 of each in their own bag, 4 s between drinks, Shift+P (22h). Run: python tests/test_round83.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game(painted=False) as g:
    g.wait(2500)
    r = g.ws("""(()=>{ var ps=ws.playerState; ps.maxHp=ps.hp=99999;
      var w=ws.worldMonsters.find(m=>m.mx&&!m.campId&&!m.temp&&!m.dead&&m.section>=1); ws.player.x=w.spawnX; ws.player.y=w.spawnY; ws.player.cont.setPosition(ws.player.x,ws.player.y);
      ws.worldMonsters.forEach(function(m){ if(m!==w&&Math.hypot(m.x-ws.player.x,m.y-ws.player.y)<700){ m.dead=true; m.cont.setVisible(false); } }); w.dead=true; w.cont.setVisible(false);
      var p=ws.player, m=MX.spawn(ws,'thistle_hog',p.x+8,p.y,{q:1}); m.section=1; m.isBoss=true; m.maxHp=m._hp=5000; m._m.aggro=true; m._m.stunT=0; ws.worldMonsters.push(m);
      var near={spell:ZHit.dmg(ws,m,100,'spell',{pure:true,el:[]}), ranged:ZHit.dmg(ws,m,100,'ranged',{pure:true,el:[]})}, chNear=m._m.charge||0;
      m.x=p.x+300; m.cont.setPosition(m.x,m.y);
      var far={spell:ZHit.dmg(ws,m,100,'spell',{pure:true,el:[]}), ranged:ZHit.dmg(ws,m,100,'ranged',{pure:true,el:[]})};
      var n=MX.spawn(ws,'thistle_hog',p.x-300,p.y,{q:1}); n.section=1; n.maxHp=n._hp=5000; ws.worldMonsters.push(n);
      var plain={spell:ZHit.dmg(ws,n,100,'spell',{pure:true,el:[]})}; window._b=m; window._n=n;
      return {near:near, far:far, plain:plain, chNear:chNear, ch:m._m.charge, nch:n._m.charge||0, d0:Math.round(Math.hypot(m.x-p.x,m.y-p.y))}; })()""")
    check('Close in, a boss takes spells and arrows in full (%s)' % r['near'], r['near']['spell'] == r['near']['ranged'] == 100 and not r['chNear'], r)
    check('From beyond 6 tiles a spell is warded (−40 %%), an arrow still hits in full (%s)' % r['far'], r['far']['spell'] == 60 and r['far']['ranged'] == 100, r)
    check('An ordinary monster is not warded', r['plain']['spell'] == 100, r)
    check('A boss struck from afar charges (%.1f s); an ordinary monster does not' % (r['ch'] or 0), r['ch'] > 3 and not r['nch'], r)
    g.wait(1800)
    d1 = g.ws("(()=>Math.round(Math.hypot(_b.x-ws.player.x,_b.y-ws.player.y)))()")
    check('The boss comes straight at you (%d → %d px)' % (r['d0'], d1), d1 < r['d0'] - 60, d1)
    k = g.ws("""(()=>{ var m=_b; m.x=ws.player.x+330; m.y=ws.player.y; m.cont.setPosition(m.x,m.y); m._m.charge=0; m.kit=Object.assign({},m.kit,{move:{name:'still',p:{}}});
      var x0=ws.player.x; ZHit.dmg(ws,m,10,'ranged',{pure:true,el:[]}); window._x0=x0; return m._m.charge; })()""")
    g.wait(1500)
    pull = g.ws("(()=>Math.round(ws.player.x-_x0))()")
    check('A boss rooted in place pulls you in instead (%d px)' % pull, k > 3 and pull > 20, pull)
    # ── mana ──
    m = g.ws("""(()=>{ var ps=ws.playerState; _b.dead=true; _b.cont.setVisible(false); _n.dead=true; _n.cont.setVisible(false);
      ps._cbT=0; ps._hurtAt=0; ps._mbT=0; ps._mhp=ps.hp; var rest=ZMREGEN.rate(ws,ps,0);
      ps._cbT=Date.now(); var fight=ZMREGEN.rate(ws,ps,0), gear=ZMREGEN.rate(ws,ps,9);
      ps._cbT=0; ps.hp-=5; var hurt=ZMREGEN.rate(ws,ps,0); ps._hurtAt=0; ps.hp+=5; ps._mhp=ps.hp;
      return {rest:rest, fight:fight, gear:gear, hurt:hurt, cap:ws.calcPlayerStats().manaRegen<=2.5}; })()""")
    check('Mana: 4 mp/s out of a fight, 1.5 in one, gear at most +2.5 (%s)' % m, m['rest'] == 4 and m['fight'] == 1.5 and m['gear'] == 4 and m['hurt'] == 1.5 and m['cap'], m)
    g.wait(300)
    q = g.ws("""(()=>{ var ps=ws.playerState; ps.inventory=(ps.inventory||[]).filter(function(i){ return ITEMS[i]&&ITEMS[i].slot!=='use'; });
      for(var i=0;i<5;i++)ps.inventory.push('pot_heal1'); ps.gold=9999; var before=ps.inventory.length; _buyItem('pot_mana',ITEMS.pot_mana.buy); var bought=ps.inventory.length-before;
      for(var j=0;j<6;j++)_buyItem('pot_mana',ITEMS.pot_mana.buy); var nm=ps.inventory.filter(function(i){ return i==='pot_mana'; }).length;
      ps.mana=0; ps._manaPotT=0; ZPOT.manaKey(); var m1=ps.mana, n1=ps.inventory.filter(function(i){ return i==='pot_mana'; }).length; ZPOT.manaKey(); var m2=ps.mana, n2=ps.inventory.filter(function(i){ return i==='pot_mana'; }).length;
      return {cost:ITEMS.pot_mana.buy, cost2:ITEMS.pot_mana2.buy, bought:bought, nm:nm, m1:m1, n1:n1, m2:m2, n2:n2}; })()""")
    check('Mana draughts are cheaper (%d g, %d g)' % (q['cost'], q['cost2']), q['cost'] < 25 and q['cost2'] < 90, q)
    check('A full healing bag still takes mana draughts, up to 5 of them (%d)' % q['nm'], q['bought'] == 1 and q['nm'] == 5, q)
    check('Shift+P drinks one; a second straight after waits (%s)' % q, q['m1'] >= 40 and q['n1'] == 4 and q['m2'] == q['m1'] and q['n2'] == 4, q)
    g.page.keyboard.down('Shift'); g.page.keyboard.press('p'); g.page.keyboard.up('Shift'); g.wait(300)
    s = g.ws("(()=>{ var ps=ws.playerState; return ps.inventory.filter(function(i){ return i==='pot_mana'; }).length; })()")
    check('The key itself is wired (still waiting: %d left)' % s, s == 4, s)
    # ── walls (Kris: "monsters that create walls or barriers that stop your movement can't be cast on top of you") ──
    w = g.ws("""(()=>{ var A=MX.A(ws), P=A.p(), F=MX.fx(A); F.walls.forEach(function(o){ o.g.destroy(); }); F.walls.length=0;
      var on=MX.wall(A,P.x,P.y,30,30,6), near=MX.wall(A,P.x+20,P.y+10,30,30,6), ok=MX.wall(A,P.x+80,P.y,30,30,6);
      var mon=MX.spawn(ws,'thistle_hog',P.x+200,P.y,{q:1}); mon.section=1; ws.worldMonsters.push(mon); mon._m.stunT=5;
      for(var k=0;k<6;k++){ var dirs=[[1,0],[-1,0],[0,1],[0,-1],[0.7,0.7],[-0.7,0.6]][k]; mon.x=P.x+dirs[0]*200; mon.y=P.y+dirs[1]*200; MX.ATK.wall.fire(A,mon,mon._m,A.p(),{dur:6}); }
      var hit=F.walls.filter(function(o){ return Math.abs(P.x-o.x)<o.w/2+10&&Math.abs(P.y-o.y)<o.h/2+10; }).length;
      F.walls.push({x:P.x,y:P.y,w:30,h:30,t:3,g:ws.add.rectangle(P.x,P.y,30,30,0,0.1)});      /* a wall already on you (any older one) */
      var free=!MX.blocked(ws,P.x+8,P.y)&&!MX.blocked(ws,P.x-8,P.y+8), still=MX.blocked(ws,P.x+80,P.y);
      mon.dead=true; mon.cont.setVisible(false); var n=F.walls.length; F.walls.forEach(function(o){ o.g.destroy(); }); F.walls.length=0;
      return {on:on, near:near, ok:ok, hit:hit, n:n, free:free, still:still}; })()""")
    check('No wall block is raised on you, or a step from you (%s)' % w, w['on'] is False and w['near'] is False and w['ok'] is True and w['hit'] == 0 and w['n'] > 10, w)
    check('A wall you stand in never holds you; the others still block (%s)' % w, w['free'] and w['still'], w)
    # ── push-back (Kris: "limit how much you can push back monsters, and should be less for bigger monsters and bosses") ──
    k = g.ws("""(()=>{ var P=ws.player, out={};
      var mk=function(id,boss){ var m=MX.spawn(ws,id,P.x+60,P.y,{q:1}); m.section=1; m._m.stunT=9; if(boss)m.isBoss=true; ws.worldMonsters.push(m); return m; };
      var sm=mk('thistle_hog'), big=Object.keys(MON_BY_ID).map(function(i){ return MX.spawn(ws,i,P.x+60,P.y+40,{q:1}); }).filter(Boolean).sort(function(a,b){ return b.def.r-a.def.r; })[0], bo=mk('thistle_hog',true);
      var mv=function(m){ var x0=m.x, y0=m.y, L=[]; for(var i=0;i<4;i++){ m._kbT=0; m._kbN=0; L.push(Math.round(ZKB.push(ws,m,1,0,30))); m.x=x0; m.y=y0; } m._kbT=0; m._kbN=0; var tot=0; for(var j=0;j<6;j++)tot+=ZKB.push(ws,m,1,0,30); m.x=x0; m.y=y0; return {one:L[0], six:Math.round(tot)}; };
      out.small=mv(sm); out.big=mv(big); out.big.r=big.def.r; out.boss=mv(bo);
      [sm,bo].forEach(function(m){ m.dead=true; m.cont.setVisible(false); }); return out; })()""")
    check('A small monster takes the full push, a big one less, a boss a quarter (%s)' % k, k['small']['one'] == 30 and k['big']['one'] < 22 and k['boss']['one'] <= 8, k)
    check('Push-back is limited: six Tidal Waves in a row push at most 60 px, a boss at most 15 (%s)' % k, k['small']['six'] <= 60 and k['boss']['six'] <= 15, k)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x]
    check('No game script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
