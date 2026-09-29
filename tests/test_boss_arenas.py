import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(ok); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''))

LAUNCH = """(([typ,sec,done])=>{var ws=game.scene.getScene('World');var ps=ws.playerState;
  ps.completedQuests=done?['s'+sec+'_'+typ]:[];
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec);
  var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World');
  ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon'});})"""
REACH = """(()=>{var d=game.scene.getScene('Dungeon');var b=d.monsters.find(m=>m.isBoss);if(!b)return {boss:false};
  var t=d.dtiles,W=DW,H=DH;var sx=Math.floor(d.px/TILE),sy=Math.floor(d.py/TILE);
  var seen=new Set([sy*W+sx]),q=[[sx,sy]];
  while(q.length){var [x,y]=q.shift();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{var nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)return;if(t[ny][nx]===DNG.WALL)return;var k=ny*W+nx;if(!seen.has(k)){seen.add(k);q.push([nx,ny]);}});}
  var bx=Math.floor(b.x/TILE),by=Math.floor(b.y/TILE);
  return {pd:Math.round(Math.hypot(d.px-d.bossChestTile.x*TILE,d.py-d.bossChestTile.y*TILE)/TILE),spawn:Math.abs(Math.floor(d.bossSpawnX/TILE)-d.bossChestTile.x)+Math.abs(Math.floor(d.bossSpawnY/TILE)-d.bossChestTile.y),boss:true,name:b.def.name,hp:b.maxHp,reach:seen.has(by*W+bx),chestReach:seen.has(d.bossChestTile.y*W+d.bossChestTile.x),
          dist:Math.abs(bx-d.bossChestTile.x)+Math.abs(by-d.bossChestTile.y)};})()"""

with game() as g:
    for typ in ['dungeon','tower']:
        for sec in [1,2,3,4]:
            for done in [False, True]:
                g.js(LAUNCH+"(%s)" % ('["%s",%d,%s]' % (typ,sec,'true' if done else 'false')))
                g.wait(1300)
                r=g.js(REACH)
                ok=r.get('boss') and r['reach'] and r['chestReach'] and r['spawn']<=5 and ((' (Rematch)' in r['name'])==done)
                check(f'{typ} s{sec} {"rematch" if done else "first"}: boss reachable & guarding portal', ok, r)
                g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(600)
    # Kill boss -> portal opens -> claim -> back to World
    g.js(LAUNCH+'(["dungeon",1,false])'); g.wait(1300)
    # ★ bosses have phases (round 4): keep felling whatever boss stands until the fight is over
    for _ in range(12):
        if g.js("!!game.scene.getScene('Dungeon')._bossDefeated"): break
        g.js("var d=game.scene.getScene('Dungeon');var b=d.monsters.find(m=>m.isBoss&&!m.dead);if(b){b.hp=0;if(!b.dead)d._monsterDied(b);}"); g.wait(1800)
    check('Portal unlocked after boss', g.js("game.scene.getScene('Dungeon').interactables.find(i=>i.type==='boss_chest').locked===false"))
    g.js("var d=game.scene.getScene('Dungeon');var c=d.interactables.find(i=>i.type==='boss_chest');d.px=c.x;d.py=c.y;d._interact()"); g.wait(2000)
    for _ in range(30):
        if g.js("game.scene.isActive('World')"): break
        g.wait(250)
    check('Claim returns to World with quest done', g.js("game.scene.isActive('World')") and g.ws("ps.completedQuests.includes('s1_dungeon') && ps.ownedMounts.includes('alligator')"), g.active())
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
