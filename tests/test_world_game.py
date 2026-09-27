"""Phase 3 in game: the 1200x1200 continent, 12 crossings, mount terrain,
waystone travel, hidden caches, minimap + Full World Map, save migration."""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)

# Flood fill over game tiles from the village with a given mount (null = on foot).
FLOOD="""(mount)=>{ var ws=game.scene.getScene('World'), T2=ws.tiles, W=WORLD_W, H=WORLD_H, seen=new Uint8Array(W*H), q=[CENTER_Y*W+CENTER_X]; seen[q[0]]=1;
  var ok=function(k){ return canPassTile(T2[(k/W)|0][k%W],mount); };
  for(var i=0;i<q.length;i++){ var k=q[i], x=k%W; if(x>0&&!seen[k-1]&&ok(k-1)){seen[k-1]=1;q.push(k-1);} if(x<W-1&&!seen[k+1]&&ok(k+1)){seen[k+1]=1;q.push(k+1);} if(k>=W&&!seen[k-W]&&ok(k-W)){seen[k-W]=1;q.push(k-W);} if(k<W*(H-1)&&!seen[k+W]&&ok(k+W)){seen[k+W]=1;q.push(k+W);} }
  var regs={}; for(var j=0;j<W*H;j++)if(seen[j])regs[_WREG[j]]=1;
  var at=function(x,y){ return !!seen[y*W+x]; };
  return {regions:Object.keys(regs).map(Number).filter(function(r){return r>0;}).sort(),
    sites:ws.sites.filter(function(s){return !at(s.tx+1,s.ty+3)&&!at(s.tx+1,s.ty-1)&&!at(s.tx-1,s.ty+1)&&!at(s.tx+3,s.ty+1);}).map(function(s){return s.id;}),
    ways:ws.wd.waystones.filter(function(w){return !at(w.x,w.y+2);}).map(function(w){return w.id;}),
    caches:ws.wd.caches.map(function(c){return [c.region,at(c.x,c.y)];})}; }"""

with game(new=True) as g:
    g.wait(600)
    r=g.ws("{W:WORLD_W,H:WORLD_H,ms:ws.wd.buildMs,px:Math.floor(ws.player.x/TILE),py:Math.floor(ws.player.y/TILE),sites:ws.sites.length,gates:ws.wd.gates.length,open:ws.wd.gates.filter(g=>g.open).length,ways:ws.wd.waystones.length,caches:ws.wd.caches.length,act:ps.activatedWaystones}")
    check('Game world is the 1200x1200 continent, built in < 6 s', r['W']==1200 and r['H']==1200 and r['ms']<6000, r['ms'])
    check('New game starts in the village with only the village waystone active', (r['px'],r['py'])==(690,520) and r['act']==['ws_village'], (r['px'],r['py'],r['act']))
    check('32 sites, 12 crossings (all shut), 17 waystones, 18 hidden caches', r['sites']==32 and r['gates']==12 and r['open']==0 and r['ways']==17 and r['caches']==18, r)
    f=g.js(f"({FLOOD})(null)")
    check('On foot at the start, the borders keep you in the Grasslands', f['regions']==[1], f['regions'])
    # signature terrain coverage per region (share of the region's land tiles)
    cov=g.ws("""(function(){ var sig={2:[T.SHALLOW_WATER,T.DEEP_WATER,T.REED,T.MUD,T.LILY],3:[T.SMALL_BOULDER,T.LARGE_BOULDER],4:[T.THIN_MAGMA,T.DEEP_MAGMA]}, deep={2:[T.DEEP_WATER],3:[T.LARGE_BOULDER],4:[T.DEEP_MAGMA]}, out={};
      [2,3,4].forEach(function(r){ var n=0,s=0,d=0; for(var k=0;k<WORLD_W*WORLD_H;k+=3){ if(_WREG[k]!==r||_WCLS[k]!==WM.LAND)continue; n++; var t=ws.tiles[(k/WORLD_W)|0][k%WORLD_W]; if(sig[r].indexOf(t)>=0)s++; if(deep[r].indexOf(t)>=0)d++; } out[r]=[+(s/n).toFixed(3),+(d/n).toFixed(3)]; }); return out; })()""")
    check('Each region is ~30-40% signature terrain (water / boulders / lava crust)', all(0.28<=cov[k][0]<=0.45 for k in cov), cov)
    check('Only the deepest part is impassable on foot (< 12% of the land)', all(cov[k][1]<0.12 for k in cov), cov)
    m=g.js("""({footShallow:terrainSpeedMult(T.SHALLOW_WATER,null), gatorShallow:terrainSpeedMult(T.SHALLOW_WATER,'alligator'), horseShallow:terrainSpeedMult(T.SHALLOW_WATER,'horse'),
      footBoulder:terrainSpeedMult(T.SMALL_BOULDER,null), boarBoulder:terrainSpeedMult(T.SMALL_BOULDER,'boar'), footCrust:terrainSpeedMult(T.THIN_MAGMA,null), uniCrust:terrainSpeedMult(T.THIN_MAGMA,'lava_unicorn'),
      ashAll:[T.SHALLOW_WATER,T.SMALL_BOULDER,T.THIN_MAGMA,T.MUD].map(t=>terrainSpeedMult(t,'ash_salamander')),
      pass:{footDeep:canPassTile(T.DEEP_WATER,null),gatorDeep:canPassTile(T.DEEP_WATER,'alligator'),footSmall:canPassTile(T.SMALL_BOULDER,null),footLarge:canPassTile(T.LARGE_BOULDER,null),boarLarge:canPassTile(T.LARGE_BOULDER,'boar'),
        footCrust:canPassTile(T.THIN_MAGMA,null),footLava:canPassTile(T.DEEP_MAGMA,null),uniLava:canPassTile(T.DEEP_MAGMA,'lava_unicorn'),ashLava:canPassTile(T.DEEP_MAGMA,'ash_salamander'),ashCliff:canPassTile(T.CLIFF,'ash_salamander')},
      name:MOUNTS.ash_salamander.n, horse:MOUNTS.horse.spdMult})""")
    p=m['pass']
    check('On foot: water, boulders and lava crust are slow (~30-35%), not blocked', m['footShallow']<=0.4 and m['footBoulder']<=0.35 and m['footCrust']<=0.35 and p['footSmall'] and p['footCrust'], m)
    check('On foot: deep water, large boulders and deep lava are blocked', not p['footDeep'] and not p['footLarge'] and not p['footLava'], p)
    check('Alligator / Boar / Unicorn cross their terrain at full speed', m['gatorShallow']==1 and m['boarBoulder']==1 and m['uniCrust']==1 and p['gatorDeep'] and p['boarLarge'], m)
    check('Ash Dragon: full speed on every signature terrain + deep lava (not border cliffs)', m['name']=='Ash Dragon' and m['ashAll']==[1,1,1,1] and p['ashLava'] and not p['ashCliff'] and not p['uniLava'], m)
    check('Horse is a pure speed boost (no terrain bonus)', m['horse']>1 and m['horseShallow']==m['footShallow'])
    # open every crossing
    g.js("sbUnlockAll()"); g.wait(1200)
    f2=g.js(f"({FLOOD})(null)")
    check('With every crossing open, all four regions are reachable on foot', f2['regions']==[1,2,3,4], f2['regions'])
    check('Every site and waystone is reachable on foot (roads + trails)', not f2['sites'] and not f2['ways'], (f2['sites'],f2['ways']))
    locked=[c for c in f2['caches'] if c[0] in (1,2,3) and c[1]]
    check('Hidden caches in Grasslands/Wetlands/Highlands are sealed off on foot', not locked, f2['caches'])
    fa=g.js(f"({FLOOD})('alligator')"); fb=g.js(f"({FLOOD})('boar')"); fu=g.js(f"({FLOOD})('lava_unicorn')")
    ok_c=all(c[1] for c in fa['caches'] if c[0] in (1,2)) and all(c[1] for c in fb['caches'] if c[0]==3) and all(c[1] for c in fu['caches'] if c[0]==4)
    check('...and each opens up with the right mount (Alligator / Boar / Unicorn)', ok_c, (fa['caches'],fb['caches'],fu['caches']))
    # waystone activation via Tab + travel costs
    g.js("(()=>{var ws=game.scene.getScene('World'); ws.playerState.activatedWaystones=['ws_village']; ws._syncGates&&ws._syncGates(true); Object.values(ws._wsObjs||{}).forEach(o=>ws._drawWaystone(o.w));})()")  # Unlock All (above) now also lights every waystone
    g.js("(()=>{var ws=game.scene.getScene('World'),w=ws.wd.waystones.find(q=>q.region===1); ws.player.x=w.x*TILE+16; ws.player.y=(w.y+1)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y);})()")
    g.wait(500); g.key('Tab',120); g.wait(400)
    r=g.ws("{act:ps.activatedWaystones.length, id:ws.wd.waystones.find(q=>q.region===1).id, on:ps.activatedWaystones.indexOf(ws.wd.waystones.find(q=>q.region===1).id)>=0}")
    check('[Tab] at a waystone activates it', r['on'] and r['act']==2, r)
    g.key('Tab',120); g.wait(500)
    r=g.js("({open:document.getElementById('modal-map').style.display!=='none', travel:WMAP.travel, rows:document.querySelectorAll('#wmap-side .wm-ws').length})")
    check('[Tab] again opens the travel map with the active waystones', r['open'] and r['travel'] and r['rows']==2, r)
    g.js("sbAllWaystones(); var ws=game.scene.getScene('World'); ws.playerState.gold=1000;")
    c=g.ws("(function(){ var W2=ws.wd.waystones, f=W2.find(q=>q.region===1), same=W2.filter(q=>q.region===1)[2], other=W2.find(q=>q.region===3), home=W2.find(q=>q.region===0); return [_wmCost(ws,f,same),_wmCost(ws,f,home),_wmCost(ws,f,other),_wmCost(ws,other,home),_wmCost(ws,home,W2.find(q=>q.region===1))]; })()")
    check('Travel cost: free inside a region and home; gold to cross into another region', c[0]==0 and c[1]==0 and c[2]>0 and c[3]==0 and c[4]==0, c)
    g.js("(()=>{var ws=game.scene.getScene('World'); WMAP.travel=ws.wd.waystones.find(q=>q.region===1).id; ws._travelTo(ws.wd.waystones.find(q=>q.region===3).id);})()")
    g.wait(1500)
    r=g.ws("{gold:ps.gold, sec:ws.currentSection(), open:document.getElementById('modal-map').style.display}")
    check('Travelling moves you there and charges the fare', r['sec']==3 and r['gold']==1000-c[2] and r['open']=='none', (r,c[2]))
    # minimap + full map
    g.wait(400)
    r=g.js("""(()=>{ var cv=document.getElementById('minimap-hud-canvas'), d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data, lit=0; for(var i=0;i<d.length;i+=4*37)if(d[i]+d[i+1]+d[i+2]>60)lit++;
      return {lit:lit, zone:document.getElementById('mmh-zone').textContent, btn:!!document.getElementById('mmh-full'), hud:document.getElementById('minimap-hud').style.display}; })()""")
    check('HUD minimap draws the ~150 tiles around you, with the zone name', r['lit']>100 and len(r['zone'].strip())>2 and r['btn'] and r['hud']!='none', r)
    g.js("document.getElementById('mmh-full').click()"); g.wait(600)
    r=g.js("({open:document.getElementById('modal-map').style.display, travel:WMAP.travel, legend:document.querySelectorAll('#wmap-side .wm-lg').length})")
    check('The 🗺 button opens the Full World Map (legend + crossings)', r['open']=='flex' and not r['travel'] and r['legend']>=10, r)
    g.key('Escape'); g.wait(300)
    # fog: a fresh map shows only what you've seen
    fog=g.ws("(function(){ var e=0; for(var i=0;i<ps.exploredGrid.length;i++)e+=ps.exploredGrid[i]; return [e, ps.exploredGrid.length]; })()")
    check('Fog grid covers the new world (150x150 cells) and only explored cells are lit', fog[1]==150*150 and 0<fog[0]<fog[1], fog)
    # save + reload keeps waystones / caches / zones
    g.ws("ws._save()")
    sv=g.js("JSON.parse(localStorage.getItem('qoz_v2'))")
    check('Save keeps waystones, visited zones and opened caches (save v5)', sv['saveVersion']==5 and len(sv['activatedWaystones'])==17 and isinstance(sv.get('visitedZones'),list) and isinstance(sv.get('openedCaches'),list), sv['saveVersion'])
    errs=list(g.errs)

# an old v4 save (old 600x600 world) migrates: back at the village, fresh map, progress kept
old=json.dumps({'saveVersion':4,'gold':321,'level':3,'px':9000,'py':9000,'unlockedSections':[1,2],'completedQuests':['s1_tower'],'rescued':[1],'exploredGridArr':[1]*(75*75),'ownedMounts':[],'inventory':[]})
with game(new=False, save=old) as g:
    g.wait(600)
    r=g.ws("{gold:ps.gold, px:Math.floor(ws.player.x/TILE), py:Math.floor(ws.player.y/TILE), exp:Array.from(ps.exploredGrid).reduce((a,b)=>a+b,0), silver:ws.wd.gates.filter(g=>g.border==='silverrun'&&g.open).length, scarp:ws.wd.gates.filter(g=>g.border==='scarp'&&g.open).length, act:ps.activatedWaystones}")
    check('v4 save migrates: gold kept, back at the village, fresh fog', r['gold']==321 and (r['px'],r['py'])==(690,520) and r['exp']<200, r)
    check("...and Bram's 3 Silverrun bridges are already built (s1 tower done), the Scarp is still shut", r['silver']==3 and r['scarp']==0, r)
    errs+=g.errs
check('No JS errors', not errs, errs[:4])
print('%d/%d'%(sum(res),len(res)))
import sys; sys.exit(0 if all(res) else 1)
