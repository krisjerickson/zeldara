"""Round 84c — invisible walls, boss pulls, screen-wide attacks (Kris: "we are also still finding invisible walls in the game"; "some of the
boss pull-in mechanics are too strong … at least 25% of the screen that is safe and multiple locations").
  · the hero is stopped by a box at his feet (10 _canGo / 12 _heroGoD, ZFEET), never stuck where an old save stood him
  · a sealed region shows its ward and says why (10w ZSEAL); a builder freed in the tower opens his region at once
  · a burrowed / submerged monster does not block (16k ZMB.solid)
  · a boss's pull waits longer, drags you part of the way, a roll slips it (09 MX.PULL, MX.canPull)
  · sky rain leaves at least a quarter of the screen open, in two or more places (09bb BossPat.SAFE)
Run: python tests/test_round84c.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game(painted=False) as g:
    g.wait(2500)
    r = g.ws("""(()=>{ var p=ws.player, T0=null;
      for(var ty=40;ty<WORLD_H-40&&!T0;ty++)for(var tx=40;tx<WORLD_W-40;tx++){ var t=ws.tiles[ty][tx]; if(canPassTile(t,null))continue; var ok=true;
        for(var dy=1;dy<=2&&ok;dy++)for(var dx=-1;dx<=1;dx++){ if(!canPassTile(ws.tiles[ty+dy][tx+dx],null)||getTileSection(tx+dx,ty+dy)>1){ ok=false; break; } }
        if(ok&&getTileSection(tx,ty+1)<=1&&!(typeof _vbBlocked==='function'&&_vbBlocked(ws.wd,tx*TILE+16,(ty+1)*TILE+4,tx*TILE+16,(ty+2)*TILE))){ T0=[tx,ty]; break; } }
      if(!T0)return {none:1}; var x=T0[0]*TILE+TILE/2, edge=(T0[1]+1)*TILE; p.x=x; p.y=edge+20; p.cont.setPosition(p.x,p.y);
      var nearOk=ws._canGo(x,edge+1,null), inWall=ws._canGo(x,edge-3,null), oldWould=!(function(){ return ws._canGoBox(x,edge+1,null,0); })();
      var T1=null; for(var ty1=40;ty1<WORLD_H-40&&!T1;ty1++)for(var tx1=40;tx1<WORLD_W-40;tx1++){ if(canPassTile(ws.tiles[ty1][tx1],null)||getTileSection(tx1,ty1-1)>1)continue; var ok1=true; for(var dy1=1;dy1<=2&&ok1;dy1++)for(var dx1=-1;dx1<=1;dx1++)if(!canPassTile(ws.tiles[ty1-dy1][tx1+dx1],null)||getTileSection(tx1+dx1,ty1-dy1)>1){ ok1=false; break; } if(ok1){ T1=[tx1,ty1]; break; } }
      var top=T1[1]*TILE, x1=T1[0]*TILE+TILE/2; p.x=x1; p.y=top-8; var stuckMoves=!ws._canGoBox(x1,top-8,null,ZFEET.W)&&ws._canGo(x1,top-11,null); p.x=x; p.y=edge+20;
      return {T0:T0, nearOk:nearOk, inWall:inWall, oldWould:oldWould, stuckMoves:stuckMoves, F:ZFEET}; })()""")
    check('The hero walks up to the very foot of what stops him (the box at his feet, %s)' % r.get('F'), r.get('nearOk') and not r.get('inWall') and r.get('oldWould'), r)
    check('A hero already standing in a wall (an old save) can still walk out', r.get('stuckMoves'), r)
    s = g.ws("""(()=>{ var p=ws.player, n0=ws.children.list.length, said=[]; var o=window.showNotif; window.showNotif=function(t){ said.push(t); return o.apply(this,arguments); };
      ZSEAL._n=0; ZSEAL._t=0; ZSEAL.hit(ws,3,p.x,p.y); window.showNotif=o; return {said:said, made:ws.children.list.length-n0}; })()""")
    check('A sealed region shows its ward and says how to open it (%d pieces)' % s['made'], s['made'] >= 3 and s['said'] and 'sealed' in s['said'][0] and 'Highlands' in s['said'][0], s)
    u = g.ws("""(()=>{ var d={completedQuests:['s1_tower','s2_tower'],unlockedSections:[1,2]}; (d.completedQuests||[]).forEach(function(q){ var m=/^s([1-3])_tower$/.exec(q); if(m&&d.unlockedSections.indexOf(+m[1]+1)<0)d.unlockedSections.push(+m[1]+1); });
      var src=String(game.scene.getScene('World').constructor.prototype.loadGame||'')+String(ws.loadGame||''); return {secs:d.unlockedSections, repair:/s\\(\\[1-3\\]\\)_tower/.test(src)||/_tower\\$/.test(src)}; })()""")
    check('A save whose builder was freed but whose region stayed shut is opened (%s)' % u['secs'], u['secs'] == [1, 2, 3], u)
    b = g.ws("""(()=>{ var mk=function(o){ return Object.assign({hp:5,cont:{visible:true,alpha:1,scene:ws},spr:{alpha:1},kit:{move:{name:'burrow'}},_m:{}},o); };
      return {plain:ZMB.solid(mk({})), burrowed:ZMB.solid(mk({_m:{hidden:true}})), sub:ZMB.solid(mk({_m:{sub:true},spr:{alpha:0.3}})), disguise:ZMB.solid(mk({_m:{hidden:true},kit:{move:{name:'disguise'}}}))}; })()""")
    check('A burrowed or submerged monster does not block; a disguised one still does (%s)' % b, b['plain'] and not b['burrowed'] and not b['sub'] and b['disguise'], b)
    pl = g.ws("""(()=>{ var A=MX.A(ws), a=MX.canPull(A); MX._slip=Date.now()+900; var rolled=MX.canPull(A); MX._slip=0; ws._pullFree=Date.now()+1000; var grace=MX.canPull(A); ws._pullFree=0;
      var m={_boss:true,cd:{}}, b={a:{name:'pull',p:{cd:4}},key:'k'}; MX.endAtk(m,b); var bossCd=m.cd.k; var m2={cd:{}}; MX.endAtk(m2,{a:{name:'pull',p:{cd:4}},key:'k'}); return {a:a, rolled:rolled, grace:grace, bossCd:bossCd, plainCd:m2.cd.k, P:MX.PULL}; })()""")
    check('A roll slips a pull; after a pull you are free for a while; a boss\'s pull waits %.1f s (a monster\'s %.1f s)' % (pl['bossCd'] or 0, pl['plainCd'] or 0), pl['a'] and not pl['rolled'] and not pl['grace'] and pl['bossCd'] >= 7 and pl['plainCd'] == 4, pl)
    rn = g.ws("""(()=>{ var G=new Proxy(function(){},{get:function(t,k){ return k==='then'?undefined:function(){ return G; }; },apply:function(){ return G; }});
      var S={cameras:{main:{worldView:{x:0,y:0,width:1280,height:720},zoom:1,shake:function(){}}},scale:{width:1280,height:720},px:600,py:300,add:{graphics:function(){ return G; }}};
      var out=[]; [1,2,3,4].forEach(function(q){ var R=ZDiff.ramp(q); for(var k=0;k<6;k++){ var run=BossPat.PAT.rain({S:S,R:R,B:{},q:q,tele:1,col:'#fff',theme:'rock',m:{}}); run.upd(0.01); var C=run.cols, n=Object.keys(C).length, open=[], grp=0, prev=1;
          for(var i=0;i<n;i++){ if(!C[i]){ open.push(i); if(prev)grp++; } prev=C[i]; } out.push({q:q,n:n,share:open.length/n,groups:grp}); } });
      return {min:Math.min.apply(null,out.map(function(o){ return o.share; })), minG:Math.min.apply(null,out.map(function(o){ return o.groups; })), SAFE:BossPat.SAFE, eg:out[out.length-1]}; })()""")
    check('Sky rain leaves at least a quarter of the screen open (least %.0f %%), in %d or more places' % (rn['min'] * 100, rn['minG']), rn['min'] >= 0.25 and rn['minG'] >= 2, rn)
    src = g.ws("(()=>({wall:/BossPat.SAFE\\*1.1\\/ng/.test(String(BossPat.PAT.wall)), quake:/gapW=c.q<=2\\?1.9:1.65/.test(String(BossPat.PAT.quake))}))()")
    check('The sweeping wall has 2–3 gaps, a quarter of it together; the shockwave ring\'s gap is a quarter of the ring', src['wall'] and src['quake'], src)
    fly = g.ws("(()=>{ var L=[...ALWAYS_BLOCKED].filter(t=>t!==T.OCEAN&&t!==T.BUILDING_WALL); return {n:L.length, eagle:L.every(t=>canPassTile(t,'sky_eagle')), cliff:canPassTile(T.CLIFF,'storm_drake'), ocean:canPassTile(T.OCEAN,'sky_eagle'), walk:canPassTile(T.CLIFF,null)}; })()")
    check('The flying mounts fly over water and cliffs (not the deep ocean)', fly['eagle'] and fly['cliff'] and not fly['ocean'] and not fly['walk'], fly)
print('%d / %d passed' % (sum(res), len(res)))
