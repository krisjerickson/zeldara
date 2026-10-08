"""Phase 3 site expansion: 20 Lab-design sites (5 per quadrant), 4–8 floors each,
boss vs bonus endings, craftsmen, island dungeons → familiars."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)

LAUNCH = """(([id,floor])=>{var ws=game.scene.getScene('World');
  var site=ws.wd.sites.find(s=>s.id===id);
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon')){game.scene.getScene('Dungeon').scene.restart(data);return;}
  if(game.scene.isActive('World'))ws.scene.sleep('World');
  ws.scene.launch('Dungeon',data);})"""
INFO = """(()=>{var d=game.scene.getScene('Dungeon'); if(!d||!d._ready||!game.scene.isActive('Dungeon'))return {ready:false};
  var t=d.dtiles,W=DW,H=DH; var en=d.stairsUpTile; var seen=new Uint8Array(W*H),q=[[en.x,en.y]]; seen[en.y*W+en.x]=1;
  while(q.length){var [x,y]=q.shift();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{var nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)return;if(t[ny][nx]===DNG.WALL)return;var k=ny*W+nx;if(!seen[k]){seen[k]=1;q.push([nx,ny]);}});}
  var ex=d.isLastFloor?d.bossChestTile:d.stairsDownTile;
  var ptx=Math.floor(d.px/TILE),pty=Math.floor(d.py/TILE);
  var b=d.monsters.find(m=>m.isBoss), bad=d.monsters.filter(m=>t[Math.floor(m.y/TILE)][Math.floor(m.x/TILE)]===DNG.WALL).length;
  return {ready:true,lab:!!d._lab,W:W,H:H,exitReach:!!(ex&&seen[ex.y*W+ex.x]),playerOk:t[pty][ptx]!==DNG.WALL&&!!seen[pty*W+ptx],
    mons:d.monsters.filter(m=>!m.isBoss).length,bad:bad,boss:b?b.def.name:null,bossReach:b?!!seen[Math.floor(b.y/TILE)*W+Math.floor(b.x/TILE)]:null,
    chests:d.interactables.filter(i=>i.type==='chest').length,last:d.isLastFloor,title:document.getElementById('dng-title').textContent,
    captive:!!d._captive,sid:d.siteId,floor:d.floor};})()"""

with game() as g:
    sites=g.js("game.scene.getScene('World').wd.sites.filter(s=>s.design&&!s.mage).map(s=>({id:s.id,type:s.type,sec:s.section,boss:s.boss,floors:s.floors,name:s.name,design:s.design}))")
    check('20 Lab-design sites in the world', len(sites)==20, len(sites))
    for sec in [1,2,3,4]:
        ss=[s for s in sites if s['sec']==sec]
        check(f'Q{sec}: 5 sites, 1 boss tower + 1 boss dungeon', len(ss)==5 and sum(1 for s in ss if s['boss'] and s['type']=='tower')==1 and sum(1 for s in ss if s['boss'] and s['type']=='dungeon')==1, [s['name'] for s in ss])
        lo,hi={1:(4,5),2:(5,6),3:(6,7),4:(7,8)}[sec]
        check(f'Q{sec}: floors in {lo}-{hi}, boss sites {hi}', all(lo<=s['floors']<=hi for s in ss) and all(s['floors']==hi for s in ss if s['boss']), [s['floors'] for s in ss])
    allsites=g.js("game.scene.getScene('World').wd.sites.filter(s=>s.type!=='harbor'&&!s.mage).length")
    check('All 28 dungeon/tower sites placed (7 per quadrant; harbors + mage towers are separate)', allsites==28, allsites)
    check('All 20 designs used once', len(set(s['design'] for s in sites))==20)
    bad=[]; n=0
    for s in sites:
        for f in range(s['floors']):
            g.js(LAUNCH+"(%s)"%json.dumps([s['id'],f])); g.wait(350)
            r=None
            for _ in range(20):
                r=g.js(INFO)
                if r.get('ready') and r.get('sid')==s['id'] and r.get('floor')==f: break
                g.wait(250)
            n+=1
            ok=r.get('ready') and r['lab'] and r['exitReach'] and r['playerOk'] and r['bad']==0 and r['mons']>=(2 if (r.get('last') and not s['boss']) else 5)
            if r.get('last'): ok=ok and r['boss'] and r['bossReach'] and (((('Elite' in r['boss']) or r['boss'] in ('Barrow Wight','Draugr Champion','Bog Troll Chieftain','Mud Troll Brute','Runic Stone Golem','Crystal Golem','Ash Wraith Lord','Cinder Hound Alpha'))!=bool(s['boss'])))      # painted elites carry their own names
            if r.get('last') and s['boss'] and s['type']=='tower': ok=ok and r['captive']
            if not ok: bad.append((s['id'],f,r))
    check(f'Every floor of every site builds, is walkable end-to-end, has monsters ({n} floors)', not bad, bad[:3])
    g.js("game.scene.stop('Dungeon');game.scene.wake('World')"); g.wait(400)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors while building floors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
