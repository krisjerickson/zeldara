"""Round 34 — Kris's combat choices: armor takes a share of each hit (per difficulty); a boss's hit always costs a set share of max health;
familiars follow the hero's lead; a ward absorbs a share of max health (at most 40 %); shield block capped at 50 %; familiars do less to
bosses (per difficulty); the death screen is the rune of return.   Run: python tests/test_round34.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:460] if info != '' else ''), flush=True)
with game(painted=False, lead=True) as g:
    g.wait(1500)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; o.tab=ZDIFF.map(function(D){ return [D.armorK,D.bossHit,D.famBoss]; });
      o.share=[24,42,62,85].map(function(d){ return Math.round(ZDiff.armor(100,d)); }); o.weak=ZDiff.hit(3,85,215,0); o.none=ZDiff.hit(20,0,100,0);
      o.boss=[1,1.3,0.25,9].map(function(m){ return ZDiff.hit(28*m,90,215,m); }); o.bossNaked=ZDiff.hit(9,0,56,1);
      o.lv=[0,1,2,3].map(function(L){ ps.difficulty=L; return [ZDiff.hit(28,85,215,0),ZDiff.hit(28,85,215,1)]; }); ps.difficulty=1; return o; })()""")
    check('Difficulty table: armor counts for less and a boss hit for more as the level rises; familiars do less to bosses', r['tab'] == [[2, 0.07, 0.6], [1.5, 0.1, 0.5], [1.2, 0.13, 0.4], [1, 0.16, 0.3]], r['tab'])
    check('Armor takes a share: the best armor of realms 1–4 lets 74 / 61 / 52 / 44 % through (Wayfarer); a weak monster still hurts a hero in the best armor; no armor = full damage', r['share'] == [74, 61, 52, 44] and r['weak'] >= 1 and r['none'] == 20, r)
    check('A boss hit costs at least 10 % of max health on Wayfarer, heavier attacks in proportion, aura ticks a quarter; a hit that is bigger than the floor after armor is not reduced to it', r['boss'] == [22, 28, 5, 107] and r['bossNaked'] == 9, r)
    check('Per difficulty: the same hit through the same armor grows from Hearthside to Ragnarök, and so does the boss floor', [x[0] for x in r['lv']] == sorted(x[0] for x in r['lv']) and r['lv'][0][0] < r['lv'][3][0] and [x[1] for x in r['lv']] == [15, 22, 28, 34], r['lv'])
    # the real path: a monster's hit through A.hurt
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, A=MX.A(ws), P=ws.player; ps.maxHp=200; ps.hp=200; ps.def=80; ws.worldIFrames=0;
      var m=MX.spawn(ws,'thistle_hog',P.x+60,P.y,{q:1,temp:true}); ws.worldMonsters.push(m); m._m.aggro=true; var atk=m.def.atk;
      MX._cur=m; A.hurt(atk,'','#fff'); MX._cur=null; var lost=200-ps.hp, eng=!!m._engT, foe=ps._lastFoe;
      ps.hp=200; ws.worldIFrames=0; A.setIfr(0); m.isBoss=true; MX._cur=m; A.hurt(atk*1.3,'','#fff'); MX._cur=null; var lostB=200-ps.hp; m.isBoss=false; window._m34=m; ps.def=0; ps.hp=ps.maxHp;
      return {atk:atk,lost:lost,eng:eng,foe:foe,lostB:lostB,striker:MX.striker(A)===m}; })()""")
    check('In play: a thistle hog hits a hero with 80 defense for a share of its attack (not 1 by rule), is marked as engaged and named; as a boss its slam costs 13 % of max health', 1 <= r['lost'] <= r['atk'] and r['lost'] == max(1, round(r['atk'] * 100 / 220)) and r['eng'] and r['foe'] and r['lostB'] == 26 and r['striker'], r)
    # follow my lead
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, P=ws.player, c=_heroCtx(ws), m=window._m34, o={on:FAM_LEAD.on};
      var far=MX.spawn(ws,'thistle_hog',P.x+300,P.y,{q:1,temp:true}); ws.worldMonsters.push(far); var idle=MX.spawn(ws,'thistle_hog',P.x-70,P.y,{q:1,temp:true}); ws.worldMonsters.push(idle); c=_heroCtx(ws);
      delete m._engT; o.none=_famTargets(c).length;
      _heroHitMonster(ws,m,1,{}); o.afterHeroHit=_famTargets(c).indexOf(m)>=0; o.idleLeft=_famTargets(c).indexOf(idle)<0;
      var hp0=idle._hp; _famHit(ws,'fam_grass',{key:'grass',col:'#fff'},{kind:'proj'},idle,1,{}); o.famHitDoesNotEngage=!idle._engT;
      m._engT=Date.now()-6000; o.lapsed=_famTargets(c).indexOf(m)<0;
      far._engT=Date.now(); o.tooFar=_famTargets(c).indexOf(far)<0; far.x=P.x+200; o.inRange=_famTargets(c).indexOf(far)>=0;
      m.isBoss=true; m._engT=Date.now()-60000; o.bossStays=_famTargets(c).indexOf(m)>=0; m.isBoss=false;
      FAM_LEAD.on=false; o.offAll=_famTargets(c).length>=3; FAM_LEAD.on=true; window._far=far; window._idle=idle; return o; })()""")
    check('Follow my lead: familiars have no target until the hero strikes; then only that monster; a familiar\'s own hit engages nothing', r['on'] and r['none'] == 0 and r['afterHeroHit'] and r['idleLeft'] and r['famHitDoesNotEngage'], r)
    check('Engagement lapses after 5 s without an exchange; a target must be within 220 px of the hero; a boss stays engaged for the fight; the switch restores the old free-for-all', r['lapsed'] and r['tooFar'] and r['inRange'] and r['bossStays'] and r['offAll'], r)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, c=_heroCtx(ws), m=window._m34, E={key:'grass',col:'#80ff90',core:'#fff'}, S={name:'Thorn',kind:'nova',cd:5,dmg:4,radius:150};
      [m,window._far,window._idle].forEach(function(x){ delete x._engT; x._hp=x.maxHp; }); ps.familiar='fam_grass'; ps.ownedFamiliars=['fam_grass'];
      var a=_famCast(ws,'fam_grass',S,{x:c.x,y:c.y},c,ps,1,E); m._engT=Date.now(); var b=_famCast(ws,'fam_grass',S,{x:c.x,y:c.y},_heroCtx(ws),ps,1,E);
      return {idleCast:a,cast:b,hurtM:m._hp<m.maxHp,idleUntouched:window._idle._hp===window._idle.maxHp}; })()""")
    check('An area skill does not fire with nothing engaged, and when it fires it hurts only the engaged monster', not r['idleCast'] and r['cast'] and r['hurtM'] and r['idleUntouched'], r)
    # familiar damage to bosses
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, m=window._m34, E={key:'grass',col:'#fff'}, out=[]; m.monDef=0; if(m.def)m.def.def=0;
      [1,3].forEach(function(L){ ps.difficulty=L; [false,true].forEach(function(b){ m.isBoss=b; m.maxHp=5000; m._hp=5000; if(m.hp!==undefined)m.hp=5000; _famHit(ws,'fam_grass',E,{kind:'area'},m,100,{pure:true}); out.push(5000-(m._hp!==undefined?m._hp:m.hp)); }); }); ps.difficulty=1; m.isBoss=false; return out; })()""")
    check('A familiar\'s 100 damage does 100 to a monster and 50 to a boss on Wayfarer, 30 to a boss on Ragnarök', abs(r[0] - 100) <= 3 and abs(r[1] - 50) <= 2 and abs(r[2] - 100) <= 3 and abs(r[3] - 30) <= 2, r)
    # ward
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, c=_heroCtx(ws), o={}; var W=FAM_SKILLS.grass.filter(function(s){ return s.kind==='ward'; })[0], i=FAM_SKILLS.grass.indexOf(W);
      ps.famLevels={fam_grass:1}; o.p1=_famWardPct(ps,'fam_grass',W); ps.famLevels={fam_grass:6}; o.p6=_famWardPct(ps,'fam_grass',W); o.cap=Object.keys(FAM_SKILLS).every(function(el){ return FAM_SKILLS[el].every(function(S){ return S.kind!=='ward'||_famWardPct({famLevels:{fam_grass:6,fam_water:6,fam_earth:6,fam_fire:6}},'fam_'+el,S)<=0.4; }); }); o.i=i;
      ps.maxHp=100; ps.hp=100; ps._famWard={fam_grass:{ready:true,col:'#fff',name:'Bark Ward',pct:0.3}}; ps._famLastHp=100; ps.familiar='fam_grass'; ps.ownedFamiliars=['fam_grass'];
      var st=_famSt('fam_grass'); st.ko=0; var as=_famActiveSkills; _famActiveSkills=function(){ return [{S:W,i:i}]; }; ps.hp=30; _famWardTick(ws,c,ps,0.016); o.afterBig=ps.hp;
      ps._famWard.fam_grass.ready=true; ps.hp=100; ps._famLastHp=100; ps.hp=90; _famWardTick(ws,c,ps,0.016); o.afterSmall=ps.hp; _famActiveSkills=as; delete ps._famWard; ps.hp=ps.maxHp; return o; })()""")
    check('Ward: absorbs a share of max health that grows with the familiar\'s level and never passes 40 %; a 70-point hit through a 30 % ward costs 40, a small hit is absorbed whole', abs(r['p1'] - (0.15 + 0.02 * r['i'])) < 1e-6 and r['p6'] > r['p1'] and r['p6'] <= 0.4 and r['cap'] and r['afterBig'] == 60 and r['afterSmall'] == 100, r)
    # shield
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, n=0, N=4000; ps.equip.shield='aegis'; ws._shielding=true; var rnd=Math.random, seq=0; Math.random=function(){ seq=(seq+0.6180339887)%1; return seq; };
      for(var i=0;i<N;i++){ if(ws._applyShieldToDmg(10)===0)n++; } var a=n/N; n=0; for(var j=0;j<N;j++){ if(_heroApplyShield(ws,ps,10,0,0)===0)n++; } Math.random=rnd; ws._shielding=false; delete ps.equip.shield; return [a,n/N,ITEMS.aegis.def]; })()""")
    check('Shield: the best shield (Aegis, 16 defense: 47 % by the formula) and any stronger one never block more than half the hits', 0.44 <= r[0] <= 0.5 and 0.44 <= r[1] <= 0.5, r)
    check('Death screen: the rune of return is the one in use', g.js("ZDeath.pick===6&&ZDeath.look().id==='rune'"))
    check('No page errors', not g.errs, g.errs[:3])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
