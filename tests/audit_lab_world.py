"""Audit: every element of each Lab world design shows up in the real world.

For each of the 40 zone designs, compares the Lab sample (buildWorld at the
design's seed) with the game world: prop types, landmarks, ley lines, light
shafts, zone particles, prop particles, rune lights, lava flows, kinds.
Prints a table and a list of gaps; exits 1 if any element is missing.
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game

JS = r"""(()=>{
  _worldData=null; var wd=generateWorld(), skins=_wzSkins(), W=WORLD_W, out=[];
  _WPW.tried=true; _WPW.w=null;   // paint synchronously here
  var zoneTiles=new Int32Array(256), zoneKinds={};
  for(var k=0;k<W*WORLD_H;k++){ var z=wd.zone[k]; if(z===255)continue; zoneTiles[z]++; var ki=wd.kind[k]; (zoneKinds[z]||(zoneKinds[z]={}))[ki]=1; }
  skins.forEach(function(s,zi){ var Z=s.Z, z=s.z;
    // Lab sample
    var lab=buildWorld(Z,Z.seed), labC=buildWorld(Z,Z.seed,{layoutOnly:true});
    var labProps={}; labC.obst.forEach(function(o){ labProps[o.prop]=(labProps[o.prop]||0)+1; });
    var zp=Z.particles||[], labAreaParts=lab.particles.filter(function(p){return p.area&&zp.indexOf(p)<0;}).length;
    var labRunes=lab.lights.filter(function(L){return L.rune||L.react;}).length;
    var labKinds={}; [Z.ground].concat(Z.kinds||[]).forEach(function(k){ labKinds[k.id]=1; });
    // World
    var wProps={}; wd.props.forEach(function(p){ if(p.zi===zi)wProps[p.prop]=(wProps[p.prop]||0)+1; });
    var wLand=wd.landmarks.filter(function(L){return L.zone===z.id;}).length;
    var wLey=wd.ley.filter(function(L){ var x=L.pts[0][0], y=L.pts[0][1]; return wd.zone[y*W+x]===zi; }).length;
    var wShaft=(wd.shafts||[]).filter(function(sh){ var x=(sh.x/LT)|0, y=(sh.y/LT)|0; return wd.zone[Math.min(WORLD_H-1,y+3)*W+x]===zi; }).length;
    // paint the chunk(s) covering the zone's heart (the stamp) and count what mounts there
    var wRunes=0, wAreaParts=0, wLava=0, wSprites=0, cx0=Math.floor((z.x-30)/WCH), cy0=Math.floor((z.y-30)/WCH), cx1=Math.floor((z.x+30)/WCH), cy1=Math.floor((z.y+30)/WCH);
    for(var cy=cy0;cy<=cy1;cy++)for(var cx=cx0;cx<=cx1;cx++){ var j=wpChunkJob(wd,cx,cy); while(!j.step(1e9)){}
      j.out.lights.forEach(function(L){ var lz=L.zi!==undefined?L.zi:wd.zone[((L.y/LT)|0)*W+((L.x/LT)|0)]; if((L.rune||L.react)&&lz===zi)wRunes++; });
      j.out.particles.forEach(function(P){ if(P.area&&wd.zone[(((P.area.y+P.area.h/2)/LT)|0)*W+(((P.area.x+P.area.w/2)/LT)|0)]===zi)wAreaParts++; });
      if(j.out.lavaMask)wLava++; wSprites+=j.out.sprites.length; }
    var kindIds={}; Object.keys(zoneKinds[zi]||{}).forEach(function(ki){ kindIds[WK_REG.list[ki].id]=1; });
    out.push({zi:zi,id:Z.id,name:Z.name,region:z.r,tiles:zoneTiles[zi],
      lab:{props:labProps,land:labC.landmarks.length,ley:labC.ley.length,shafts:(labC.m.shafts||[]).length,zoneParts:(Z.particles||[]).length,areaParts:labAreaParts,runes:labRunes,lava:!!lab.flows,kinds:Object.keys(labKinds)},
      world:{props:wProps,land:wLand,ley:wLey,shafts:wShaft,zoneParts:(WZ_DESIGN[Z.id].particles||[]).length,areaParts:wAreaParts,runes:wRunes,lava:wLava>0,kinds:Object.keys(kindIds)}});
  });
  return {rows:out, errs:WP_ERR}; })()"""

with game(new=None) as g:
    R = g.js(JS); rows=R['rows']
print('prop draw errors:', R['errs'])
json.dump(rows, open(os.path.join(os.path.dirname(__file__), '..', 'audit_lab_world.json'), 'w'), indent=1)
gaps = []
for r in rows:
    L, Wd = r['lab'], r['world']
    miss = [p for p in L['props'] if not Wd['props'].get(p)]
    if miss: gaps.append((r['name'], 'props', miss))
    for k in ['land', 'ley', 'shafts', 'areaParts']:
        if L[k] and not Wd[k]: gaps.append((r['name'], k, f"lab {L[k]} / world 0"))
    if L['runes'] and not Wd['runes']: gaps.append((r['name'], 'rune lights', f"lab {L['runes']} / world 0"))
    if L['lava'] and not Wd['lava']: gaps.append((r['name'], 'lava flow', 'missing'))
    mk = [k for k in L['kinds'] if k not in Wd['kinds']]
    if mk: gaps.append((r['name'], 'kinds', mk))
    print(f"R{r['region']} {r['name'][:26]:26} tiles {r['tiles']:6}  props {sum(Wd['props'].values()):4} ({len([p for p in L['props'] if Wd['props'].get(p)])}/{len(L['props'])} types)"
          f"  land {Wd['land']}/{L['land']}  ley {Wd['ley']}/{L['ley']}  shafts {Wd['shafts']}/{L['shafts']}  pfx {Wd['areaParts']}/{L['areaParts']}  runes {Wd['runes']}/{L['runes']}  lava {int(Wd['lava'])}/{int(L['lava'])}")
print('\nGAPS:' if gaps else '\nNo gaps: every Lab element appears in the world.')
for gp in gaps: print('  ', gp)
sys.exit(1 if gaps or R['errs'] else 0)
