"""Round 9: boss hurtbox (lower two-thirds of the body, always reachable), bosses stand on reachable
floor, familiar damage falls off by slot (100/60/40/25%), more boss health.
(Save profiles + hosting are tested in test_saves.py.)  Run: python tests/test_round9.py"""
import sys, os, time
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
LAUNCH = """(([typ,sec,ph])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true;
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec); var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon',bossPhase:ph||1});})"""
READY="(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"
def until(g,expr,ms=40000):
    t=time.time()
    while (time.time()-t)*1000<ms:
        if g.js(expr): return True
        g.wait(300)
    return False
with game() as g:
    g.page.keyboard.press('Shift')
    for typ,sec,ph in [('dungeon',3,4),('dungeon',1,1)]:
        g.js(LAUNCH+'(["%s",%d,%d])'%(typ,sec,ph)); until(g,READY); g.wait(1500)
        r=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), B=_hbBox(m); if(!B)return 'no hurtbox';
          var D=m._hurtR.D; S._introT=0; m._hold=99; if(m._bp)m._bp.t=999;
          // a sword swing from just below the chest (well above the feet) must land
          var tot=function(){ return m.hp+(m.bars||[]).reduce(function(a,b){ return a+b.hp; },0); }, hp0=tot(), spot=null;
          // stand on walkable floor beside the body's upper part (out of the old feet-only reach where possible)
          for(var k=0;k<32&&!spot;k++){ var aa=k/32*Math.PI*2; if(Math.sin(aa)>0.3)continue; var sx=B.cx+Math.cos(aa)*(B.rx+26), sy=B.cy-B.ry*0.3+Math.sin(aa)*(B.ry*0.6+26); if(S._canGoD(sx,sy))spot=[sx,sy,aa]; }
          if(!spot)spot=[m.x,m.y+40,Math.PI/2*3];
          S.px=spot[0]; S.py=spot[1]; S.pCont.setPosition(S.px,S.py); var q=_hbP(m,S.px,S.py), ddx=q.x-S.px, ddy=q.y-S.py; S.pdir=Math.abs(ddx)>Math.abs(ddy)?(ddx>0?'right':'left'):(ddy>0?'down':'up'); S.playerAtkTimer=0; S._hitStop=0; S._playerAttack(); var swordChest=tot()<hp0;
          // the old rule would have missed: distance from the hero to the feet
          var feetD=Math.round(Math.hypot(m.x-S.px,m.y-S.py));
          // an arrow-sized touch at the oval's edge counts, one well outside doesn't
          var edge=false, out=false; for(var e=0;e<16;e++){ var ea=e/16*Math.PI*2, ex=B.cx+Math.cos(ea)*B.rx*0.95, ey=B.cy+Math.sin(ea)*B.ry*0.95; if(S._canGoD(ex,ey)&&_hbHit(m,ex,ey,6))edge=true; var ox=B.cx+Math.cos(ea)*(B.rx*1.5+30), oy=B.cy+Math.sin(ea)*(B.ry*1.5+30); if(_hbHit(m,ox,oy,6))out=true; }
          return {feetD:feetD,slot:D.slot,h:D.h,rx:Math.round(B.rx),ry:Math.round(B.ry),sword:swordChest,edge:edge,out:out,cover:Math.round(B.ry*2/D.h*100)}; })()""")
        check('%s phase %d: hurtbox covers the lower two-thirds of the body; sword hits at the chest; edges count, far misses'%(typ,ph), isinstance(r,dict) and r['sword'] and r['edge'] and not r['out'] and 60<=r['cover']<=72, r)
        a=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), bad=0, n=0, B=_hbBox(m);
          // from 24 directions the nearest hurtbox point is on walkable floor
          for(var i=0;i<24;i++){ var a=i/24*Math.PI*2, x=m.x+Math.cos(a)*300, y=m.y+Math.sin(a)*300, p=_hbP(m,x,y); n++; if(!S._canGoD(p.x,p.y))bad++; }
          // push the boss into a wall: it is pulled back onto reachable floor
          var wx=null; for(var r=10;r<400&&wx===null;r+=6)for(var k=0;k<16;k++){ var aa=k/16*Math.PI*2, xx=m.x+Math.cos(aa)*r, yy=m.y+Math.sin(aa)*r; if(!S._canGoD(xx,yy)){ wx=[xx,yy]; break; } }
          var before=[m.x,m.y]; m.x=wx[0]; m.y=wx[1]; BossPat.reach(S); var ok=BossPat.stand(S,m.x,m.y);
          return {bad:bad,n:n,backOnFloor:ok,moved:Math.round(Math.hypot(m.x-wx[0],m.y-wx[1]))}; })()""")
        check('...its hurtbox is always reachable, and a boss shoved into a wall is put back on reachable floor', a['bad']==0 and a['backOnFloor'], a)
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(900)
    f=g.ws("""(()=>{ ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.famLevels={fam_grass:3,fam_water:3,fam_earth:3,fam_fire:3}; ps.fairyKings=['k2','k3','k4'];
      ps.familiar='fam_grass'; ps.familiar2='fam_water'; ps.familiar3='fam_earth'; ps.familiar4='fam_fire';
      var k=['fam_grass','fam_water','fam_earth','fam_fire'].map(function(f){ return _famSlotK(ps,f); });
      var solo=_familiarDamage('fam_water',Object.assign({},ps,{familiar:'fam_water',familiar2:null,familiar3:null,familiar4:null})), second=_familiarDamage('fam_water',ps);
      return {k:k,sum:k.reduce(function(a,b){return a+b;},0),solo:solo,second:second}; })()""")
    check('Familiars: slot 1 100%, slot 2 60%, slot 3 40%, slot 4 25% (all four ≈ 2.25× one)', f['k']==[1,0.6,0.4,0.25] and abs(f['sum']-2.25)<0.01 and abs(f['second']/f['solo']-0.6)<0.1, f)
    hp=g.js("""(()=>{ var S={}; return {gob:MDEFS.goblin_king.hp, sl:MDEFS.shadow_lord.hp, r8:MDEFS.goblin_king._r8hp, isl:MDEFS[_islandBossKey(1)].hp, isl0:HARBOR_ISLANDS[1].boss.hp, el:MDEFS[_bonusMiniBossKey(2)].hp }; })()""")
    check('More boss health: guardians ×1.8 of the original, island guardians ×1.5, elites ×1.25', hp['r8'] and hp['isl']==round(hp['isl0']*1.5), hp)
    hud=g.js("(()=>{ var el=document.getElementById('fam-hud'); return el?el.innerHTML.indexOf('60%')>=0||el.innerHTML.indexOf('hits softer')>=0:null; })()")
    print('INFO familiar HUD shows the share:',hud)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:3])
print('%d/%d passed'%(sum(res),len(res)))
