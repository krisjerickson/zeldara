// ═══════════════════════════════════════════════════════════════════════
// ║ GAME WORLD BUILD (Phase 3) — turns the 1200 × 1200 world map
// ║ (07e-world-map.js) into the playable world, dressed by the Design Lab:
// ║   • gameplay grid wd.tiles (T.*): what blocks, what is slow, mounts
// ║   • look grid wd.kind: a Lab terrain kind per tile (05c paints it)
// ║   • each zone's Lab sample is stamped at the zone's heart (its landmark)
// ║   • everywhere else the zone's design dresses the land: its ground,
// ║     its noise kinds, and its own props at the Lab's density
// ║   • signature terrain (≈35% of each region; slow on foot, full speed on
// ║     its mount) is drawn with the zone's own water / boulders / lava
// ║   • village, 32 sites, harbors, 17 waystones, 18 caches, 12 crossings
// ═══════════════════════════════════════════════════════════════════════
//   Wetlands  water & marsh  (deep water blocked)     → Alligator
//   Highlands boulder fields (large boulders blocked) → Battle Boar
//   Ashlands  lava crust     (deep lava blocked)      → Lava Unicorn
// The Ash Dragon crosses all of it; the Horse is just faster.
var WZ_SIGNATURE={2:{name:'water & marsh',tile:'SHALLOW_WATER',deep:'DEEP_WATER',cov:0.33,sc:17,mount:'alligator'},
  3:{name:'boulder fields',tile:'SMALL_BOULDER',deep:'LARGE_BOULDER',cov:0.4,sc:11,mount:'boar'},
  4:{name:'lava crust',tile:'THIN_MAGMA',deep:'DEEP_MAGMA',cov:0.37,sc:14,mount:'lava_unicorn'}};
// How much signature terrain each zone gets (1 = the region's average)
var WZ_SIG={lantern_lilies:1.2,rune_stepping:1.2,sunken_spires:1.1,glowfrog_pools:1.1,willow_cathedral:0.8,glow_mangroves:1.1,wisp_cattails:0.9,turtle_isles:1.2,drowned_village:1.0,stilt_walkways:1.3,
  dwarven_stairs:1.0,golem_graveyard:1.2,runic_mesas:0.8,petrified_forest:0.8,herder_terraces:0.6,windharp_ridges:1.0,geode_canyons:1.2,glacier_peaks:0.9,giants_chessboard:0.7,starfall_crater:1.2,
  emberflower_fields:0.8,burned_cathedral:0.7,obsidian_glass:1.0,sulfur_geysers:0.6,forge_ruins:1.1,ashsnow_forest:0.7,magma_channels:1.4,basalt_forest:0.9,dragon_valley:1.1,chained_rocks:1.4};
var WZ_AMB_DENS=0.8;       // ambient prop density vs the Lab samples
var WZ_GROUND_T={0:T.GRASS,1:T.GRASS,2:T.GRASS,3:T.ROCKY_GROUND,4:T.DARK_ROCK};
if(T.PROP===undefined){ T.PROP=26; ALWAYS_BLOCKED.add(T.PROP); PROJ_WALL_TILES.add(T.PROP); TILE_COLORS[T.PROP]=0x3a5a2a; }

// Gate tiles: shut = the border itself, open = what the craftsman builds
function _wgGateTile(g,orig,open){
  if(!open)return orig===WM.RIVER?T.DEEP_WATER:orig===WM.CHASM?T.DEEP_MAGMA:T.CLIFF;
  return g.kind==='lift'?T.STONE_FLOOR:g.kind==='pass'?T.GRAVEL:T.BRIDGE;
}
function _wgGateKind(g,orig,open){
  if(!open)return (orig===WM.RIVER?WSK.lake:orig===WM.CHASM?WSK.lava:orig===WM.RIDGE?WSK.ridge:WSK.cliff)._gi;
  return (g.kind==='lift'?WSK.lift:g.kind==='pass'?WSK.pass:g.kind==='iron'?WSK.iron:(g.dir==='v'?WSK.bridgev:WSK.bridge))._gi;
}
function _gateOpenFor(g,ps){
  if(!ps)return false;
  if((ps.rescued||[]).indexOf(g.craftsman)>=0)return true;
  // the chain borders also open once the region beyond is unlocked (sandbox, old saves)
  return g.border!=='ember'&&(ps.unlockedSections||[]).indexOf(g.craftsman+1)>=0;
}
// Apply open/closed state to every crossing. Returns the gates that changed.
function _wgApplyGates(wd,ps){
  var changed=[];
  wd.gates.forEach(function(g){
    var open=_gateOpenFor(g,ps); if(g.open===open)return;
    g.open=open; changed.push(g);
    g.cells.forEach(function(c){ var k=c[0], x=k%WORLD_W, y=(k/WORLD_W)|0; wd.tiles[y][x]=_wgGateTile(g,c[1],open); if(wd.kind)wd.kind[k]=_wgGateKind(g,c[1],open); });
  });
  if(changed.length)wd.baseVer=(wd.baseVer||0)+1;
  return changed;
}
// Gameplay tile for a Lab kind
function _wgKindT(k,r){
  if(k.lava)return T.DEEP_MAGMA;
  if(k.liquid&&k.solid)return T.DEEP_WATER;
  if(k.liquid||k.id==='shallow')return T.SHALLOW_WATER;
  if(k.solid)return T.PROP;
  return WZ_GROUND_T[r]||T.GRASS;
}

function _buildGameWorld(){
  var t0=Date.now(), tm={};
  _wkInit(); var skins=_wzSkins(), G=function(k){ return k._gi; };
  var M=buildWorldMap(WORLD_SEED), W=M.W, H=M.H, N=W*H, cls=M.cls, region=M.region, zone=M.zone;
  _WREG=region; _WZONE=zone; _WCLS=cls; tm.map=Date.now()-t0;
  var tiles=[]; for(var y=0;y<H;y++)tiles.push(new Uint8Array(W));
  var kind=new Uint16Array(N), reserved=new Uint8Array(N);
  var setTK=function(x,y,t,k){ tiles[y][x]=t; kind[y*W+x]=k; };
  var hsh=function(x,y,s){ var n=(x*374761393+y*668265263+s*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0)/4294967296; };
  // signature field (two octaves; thresholds from its sampled distribution)
  var fS1=vnoise(WORLD_SEED+606), fS2=vnoise(WORLD_SEED+707), fC=vnoise(WORLD_SEED+505);
  var sigF=function(x,y,sc){ return fS1(x/sc,y/sc)*0.7+fS2(x/(sc*0.4)+11,y/(sc*0.4)+7)*0.3; };
  var SQ={}; [2,3,4].forEach(function(r){ var sc=WZ_SIGNATURE[r].sc, vals=[], rr=rngOf(r*77+5); for(var i=0;i<6000;i++)vals.push(sigF(rr.f()*W,rr.f()*H,sc)); vals.sort(function(a,b){return a-b;}); SQ[r]=vals; });
  var quant=function(r,q){ var v=SQ[r]; return v[Math.max(0,Math.min(v.length-1,Math.floor(q*v.length)))]; };
  var ZT=skins.map(function(s){ var r=s.z.r, sg=WZ_SIGNATURE[r], m=WZ_SIG[s.z.id]===undefined?1:WZ_SIG[s.z.id];
    var o={thr:2,thrDeep:2}; if(sg){ var cov=Math.min(0.6,sg.cov*m); o.thr=quant(r,1-cov); o.thrDeep=quant(r,1-cov*0.22); } return o; });
  var sigKinds=function(s,deep){ var r=s.z.r; if(r===2)return deep?s.deep:s.shallow; if(r===3)return deep?s.rock:WSK.scree; if(r===4)return deep?s.lava:WSK.crust; return null; };
  // ── 1. terrain from the map ──
  for(var y1=0;y1<H;y1++)for(var x1=0;x1<W;x1++){ var k=y1*W+x1, c=cls[k], r=region[k];
    switch(c){
      case WM.OCEAN: setTK(x1,y1,T.OCEAN,G(WSK.sea)); break;
      case WM.SHALLOW: setTK(x1,y1,T.REEF,G(WSK.reef)); break;
      case WM.BEACH: setTK(x1,y1,T.BEACH,G(r===4?WSK.ashsand:WSK.sand)); break;
      case WM.LAND: { var zi=zone[k];
        if(zi===255){ setTK(x1,y1,WZ_GROUND_T[r]||T.GRASS,G(WSK.vgrass)); break; }
        var s=skins[zi], zt=ZT[zi], kk=s.ground, t=WZ_GROUND_T[r];
        var sv=WZ_SIGNATURE[r]?sigF(x1,y1,WZ_SIGNATURE[r].sc):0;
        if(sv>zt.thrDeep){ kk=sigKinds(s,true); t=T[WZ_SIGNATURE[r].deep]; }
        else if(sv>zt.thr){ kk=sigKinds(s,false); t=T[WZ_SIGNATURE[r].tile]; }
        else {
          for(var ni=0;ni<s.noise.length;ni++){ var q=s.noise[ni], f=q[3]===1?s.nz:s.nz2; if(f(x1*q[1],y1*q[1])>q[2]){ kk=q[0]; } }
          if(s.chess&&fC(x1/40,y1/40)>0.62){ kk=(((Math.floor(x1/6)+Math.floor(y1/6))&1)?s.chessK[1]:s.chessK[0])||kk; }
        }
        setTK(x1,y1,t,G(kk)); break; }
      case WM.PEAK: setTK(x1,y1,T.ROCK,G(WSK.mtn[r]||WSK.mtn[1])); break;
      case WM.LAKE: setTK(x1,y1,T.DEEP_WATER,G(r===2&&zone[k]!==255?skins[zone[k]].deep:WSK.lake)); break;
      case WM.RIVER: setTK(x1,y1,T.DEEP_WATER,G(WSK.lake)); break;
      case WM.CLIFF: setTK(x1,y1,T.CLIFF,G(WSK.cliff)); break;
      case WM.RIDGE: setTK(x1,y1,T.CLIFF,G(WSK.ridge)); break;
      case WM.CHASM: setTK(x1,y1,T.DEEP_MAGMA,G(WSK.lava)); break;
      case WM.ROAD: setTK(x1,y1,T.PATH,G(WSK.road[r]||WSK.road[1])); break;
      case WM.BRIDGE: setTK(x1,y1,T.BRIDGE,G(WSK.bridge)); break;
      case WM.VILLAGE: setTK(x1,y1,T.GRASS,G(WSK.vgrass)); break;
      default: setTK(x1,y1,T.GRASS,G(WSK.vgrass));
    } }
  // bridges run along their road: vertical planks for north–south spans
  for(var y2=1;y2<H-1;y2++)for(var x2=1;x2<W-1;x2++){ var k2=y2*W+x2; if(cls[k2]!==WM.BRIDGE)continue; var hz=(cls[k2-1]===WM.BRIDGE)+(cls[k2+1]===WM.BRIDGE), vt=(cls[k2-W]===WM.BRIDGE)+(cls[k2+W]===WM.BRIDGE); if(vt>hz)kind[k2]=G(WSK.bridgev); }
  // shallow rims on the Wetlands' inner lakes (never on Mirror Lake or the borders)
  for(var y3=1;y3<H-1;y3++)for(var x3=1;x3<W-1;x3++){ var k3=y3*W+x3; if(cls[k3]!==WM.LAKE||region[k3]!==2||zone[k3]===255)continue;
    if(cls[k3-1]===WM.LAND||cls[k3+1]===WM.LAND||cls[k3-W]===WM.LAND||cls[k3+W]===WM.LAND)setTK(x3,y3,T.SHALLOW_WATER,G(skins[zone[k3]].shallow)); }
  tm.terrain=Date.now()-t0;
  var trailK=function(k){ var zi=zone[k]; if(zi!==255&&skins[zi].path)return G(skins[zi].path); return G(WSK.trail[region[k]]||WSK.trail[1]); };
  // ── 2. crossings: shut until their craftsman is freed; approaches paved ──
  var gates=M.gates.map(function(g){ return Object.assign({},g,{open:null}); });
  gates.forEach(function(g){ for(var d=-20;d<=20;d++)for(var w=-2;w<=2;w++){ var gx=g.dir==='v'?g.x+w:g.x+d, gy=g.dir==='v'?g.y+d:g.y+w; if(gx<0||gy<0||gx>=W||gy>=H)continue; var kk=gy*W+gx;
      if(cls[kk]===WM.LAND||cls[kk]===WM.BEACH||cls[kk]===WM.PEAK){ setTK(gx,gy,T.PATH,G(WSK.road[region[kk]]||WSK.road[1])); reserved[kk]=1; } } });
  // ── 3. village ──
  var buildings=buildVillage(tiles);
  for(var y4=CENTER_Y-VILLAGE_RADIUS-2;y4<=CENTER_Y+VILLAGE_RADIUS+2;y4++)for(var x4=CENTER_X-VILLAGE_RADIUS-2;x4<=CENTER_X+VILLAGE_RADIUS+2;x4++){ var k4=y4*W+x4, t4=tiles[y4][x4]; reserved[k4]=1;
    if(t4===T.BUILDING_WALL)kind[k4]=G(WSK.wall); else if(t4===T.PATH||t4===T.DOOR)kind[k4]=G(WSK.vpave); else if(t4===T.STONE_FLOOR||t4===T.STABLES_FLOOR)kind[k4]=G(WSK.plaza); else if(t4===T.VILLAGE_FLOOR)kind[k4]=G(WSK.vgrass); }  // lighter village: cobbles only on the streets
  // ── 4. zone landmarks: each zone's Lab sample stamped at its heart ──
  var props=[], landmarks=[], ley=[], shafts=[], stampParts=[], nzs=vnoise(WORLD_SEED+818), stampSpawns=[];
  var addProp=function(p){ props.push(p); };
  skins.forEach(function(s,zi){ var z=s.z, Z=s.Z, c;
    try{ c=buildWorld(Z,Z.seed,{layoutOnly:true}); }catch(e){ return; }
    var ox=z.x-30, oy=z.y-30, K=c.K, applied=new Uint8Array(3600);
    for(var ly=0;ly<60;ly++)for(var lx=0;lx<60;lx++){ var wx=ox+lx, wy=oy+ly; if(wx<1||wy<1||wx>=W-1||wy>=H-1)continue; var wk=wy*W+wx, wc=cls[wk];
      if(region[wk]!==z.r||!(wc===WM.LAND||wc===WM.ROAD||wc===WM.PEAK||wc===WM.BEACH))continue; if(reserved[wk])continue;
      var dd=Math.hypot(lx-29.5,ly-29.5)+(nzs(wx*0.15,wy*0.15)-0.5)*7; if(dd>28.5)continue;
      var sk=K[c.t[ly*60+lx]]; setTK(wx,wy,_wgKindT(sk,z.r),G(sk)); applied[ly*60+lx]=1; reserved[wk]=2; }
    // props: keep the Lab layout; a set piece that falls off the land (coast,
    // region edge) slides to the nearest spot inside the stamp, and its
    // landmark moves with it, so every Lab feature exists somewhere.
    var used=new Uint8Array(3600), moved=[];
    var fits=function(x,y,w,h){ if(x<0||y<0||x+w>60||y+h>60)return false; for(var a=0;a<h;a++)for(var b=0;b<w;b++){ var q=(y+a)*60+x+b; if(!applied[q]||used[q])return false; } return true; };
    var take=function(x,y,w,h){ for(var a=0;a<h;a++)for(var b=0;b<w;b++)used[(y+a)*60+x+b]=1; };
    var big=function(ob){ return ob.w*ob.h>=6||/runecircle|skull|altar|shrine|statue|arch|tower|temple|mushring/.test(ob.prop); };
    c.obst.forEach(function(ob){ var x=ob.x, y=ob.y;
      if(!fits(x,y,ob.w,ob.h)){ if(!big(ob))return; var best=null;
        for(var r=1;r<=18&&!best;r++)for(var dy=-r;dy<=r&&!best;dy++)for(var dx=-r;dx<=r;dx++){ if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue; if(fits(ob.x+dx,ob.y+dy,ob.w,ob.h)){ best=[dx,dy]; break; } }
        if(!best)return; x=ob.x+best[0]; y=ob.y+best[1]; moved.push({x:ob.x,y:ob.y,w:ob.w,h:ob.h,dx:best[0],dy:best[1]}); }
      if(ob.o.solid!==false||ob.o.claim)take(x,y,ob.w,ob.h);
      addProp({prop:ob.prop,x:ox+x,y:oy+y,w:ob.w,h:ob.h,o:ob.o,zi:zi});
      if(ob.o.solid!==false)for(var a2=0;a2<ob.h;a2++)for(var b2=0;b2<ob.w;b2++){ var X=ox+x+b2, Y=oy+y+a2; if(!ALWAYS_BLOCKED.has(tiles[Y][X]))tiles[Y][X]=T.PROP; } });
    c.landmarks.forEach(function(L){ var lx=L.x, ly=L.y; moved.some(function(mv){ if(L.x<mv.x+mv.w&&L.x+L.w>mv.x&&L.y<mv.y+mv.h&&L.y+L.h>mv.y){ lx+=mv.dx; ly+=mv.dy; return true; } return false; });
      landmarks.push({x:(ox+lx)*LT,y:(oy+ly)*LT,w:L.w*LT,h:L.h*LT,text:L.text.replace(/^Press M: /,'Seen from above (world map, B): '),zone:z.id}); });
    // particles the design emits from its layout (e.g. the Starfall crater's sparks)
    (c.m.particles||[]).forEach(function(P){ if(!P.area)return; var ax=P.area.x/LT, ay=P.area.y/LT; var q=Math.floor(ay+P.area.h/LT/2)*60+Math.floor(ax+P.area.w/LT/2); if(q<0||q>=3600||!applied[q])return;
      stampParts.push(Object.assign({},P,{area:{x:P.area.x+ox*LT,y:P.area.y+oy*LT,w:P.area.w,h:P.area.h},_w:1})); });
    c.ley.forEach(function(L){ var pts=L.pts.map(function(p){return [ox+p[0],oy+p[1]];}), xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
      ley.push({pts:pts,col:L.col,bx0:Math.min.apply(null,xs),bx1:Math.max.apply(null,xs),by0:Math.min.apply(null,ys),by1:Math.max.apply(null,ys)}); });
    (c.m.shafts||[]).forEach(function(sh){ shafts.push({canvas:sh.canvas,x:sh.x+ox*LT,y:sh.y+oy*LT,a:sh.a,sway:sh.sway}); });
    stampSpawns.push({x:ox+c.sp.x,y:oy+c.sp.y,zi:zi,zone:z.id}); });
  tm.stamps=Date.now()-t0;
  // ── 5. trails: carve from a point to the nearest road, staying in its region ──
  var BUILT=new Set([T.BUILDING_WALL,T.DOOR,T.STONE_FLOOR,T.STABLES_FLOOR,T.VILLAGE_FLOOR]);
  var BLOCKY=new Set([T.ROCK,T.LARGE_BOULDER,T.SMALL_BOULDER,T.DEEP_WATER,T.SHALLOW_WATER,T.DEEP_MAGMA,T.THIN_MAGMA,T.TREE,T.REED,T.MUD,T.LILY,T.PROP]);
  // BFS to the nearest road: first over walkable ground only (then it just
  // paints a visible trail), else carving straight through what blocks.
  var bfs=function(sx,sy,R,walkOnly){
    var rg=region[sy*W+sx], prev=new Map(), q=[sy*W+sx], hit=-1; prev.set(q[0],-1);
    var ok=function(k){ var c=cls[k]; if(!((region[k]===rg||c===WM.VILLAGE)&&(c===WM.LAND||c===WM.BEACH||c===WM.ROAD||c===WM.BRIDGE||c===WM.VILLAGE)))return false; var tt=tiles[(k/W)|0][k%W]; if(BUILT.has(tt))return false; return !(walkOnly&&ALWAYS_BLOCKED.has(tt)); };
    for(var i=0;i<q.length&&hit<0;i++){ var k=q[i], x=k%W, y=(k/W)|0; if(i>0&&(cls[k]===WM.ROAD||cls[k]===WM.VILLAGE)&&reserved[k]!==2){hit=k;break;}
      var nb=[k-1,k+1,k-W,k+W]; for(var n=0;n<4;n++){ var kn=nb[n], xn=kn%W, yn=(kn/W)|0; if(Math.abs(xn-x)>1||yn<0||yn>=H)continue; if(Math.abs(xn-sx)>R||Math.abs(yn-sy)>R)continue; if(prev.has(kn)||!ok(kn))continue; prev.set(kn,k); q.push(kn); } }
    return hit<0?null:{hit:hit,prev:prev,rg:rg};
  };
  var trailLines=[];
  var trail=function(sx,sy,maxR){
    var R=maxR||110, res=bfs(sx,sy,R,true)||bfs(sx,sy,R,false); if(!res)return false;
    var line=[]; for(var kl=res.hit;kl>=0;kl=res.prev.get(kl))line.push([kl%W+1,((kl/W)|0)+1]); trailLines.push(line);
    for(var kc=res.hit;kc>=0;kc=res.prev.get(kc)){ var cx=kc%W, cy=(kc/W)|0;
      for(var oy2=0;oy2<=1;oy2++)for(var ox2=0;ox2<=1;ox2++){ var tx=cx+ox2, ty=cy+oy2; if(tx>=W||ty>=H)continue; var kt=ty*W+tx; if(region[kt]!==res.rg||cls[kt]!==WM.LAND||BUILT.has(tiles[ty][tx]))continue;
        if(reserved[kt]===2){ if(BLOCKY.has(tiles[ty][tx])&&ox2===0&&oy2===0)setTK(tx,ty,T.PATH,trailK(kt)); continue; }   // inside a landmark: only open what blocks
        if(BLOCKY.has(tiles[ty][tx])||(ox2===0&&oy2===0)){ setTK(tx,ty,T.PATH,trailK(kt)); }
        if(!reserved[kt])reserved[kt]=3; } }
    return true;
  };
  stampSpawns.forEach(function(sp){ trail(sp.x,sp.y,120); });
  var clearAround=function(cx,cy,r){ for(var dy=-r;dy<=r;dy++)for(var dx=-r;dx<=r;dx++){ var x=cx+dx,y=cy+dy; if(x<0||y<0||x>=W||y>=H)continue; var kk=y*W+x; if(cls[kk]!==WM.LAND)continue; reserved[kk]=reserved[kk]||4; if(BLOCKY.has(tiles[y][x]))setTK(x,y,WZ_GROUND_T[region[kk]]||T.GRASS,zone[kk]!==255?G(skins[zone[kk]].ground):G(WSK.vgrass)); } };
  // ── 6. sites ──
  var sites=[], roster={};
  [1,2,3,4].forEach(function(sec){ _rosterSitesFor(sec).forEach(function(r){ roster[r.design]=r; }); });
  var harborBuild=function(tx,ty,ang){
    var hoDx=Math.round(Math.cos(ang)),hoDy=Math.round(Math.sin(ang));
    for(var dy2=0;dy2<3;dy2++)for(var dx2=0;dx2<3;dx2++){ var hft=tiles[ty+dy2][tx+dx2]; if(hft!==T.OCEAN&&hft!==T.REEF)setTK(tx+dx2,ty+dy2,T.STONE_FLOOR,G(WSK.plaza)); }
    if(Math.abs(hoDy)>=Math.abs(hoDx)){
      if(hoDy>0){ for(var a=0;a<3;a++)tiles[ty][tx+a]=T.BUILDING_WALL; tiles[ty+2][tx+1]=T.DOOR; }
      else { for(var b=0;b<3;b++)tiles[ty+2][tx+b]=T.BUILDING_WALL; tiles[ty][tx+1]=T.DOOR; }
    } else {
      if(hoDx>0){ for(var c2=0;c2<3;c2++)tiles[ty+c2][tx]=T.BUILDING_WALL; tiles[ty+1][tx+2]=T.DOOR; }
      else { for(var d2=0;d2<3;d2++)tiles[ty+d2][tx+2]=T.BUILDING_WALL; tiles[ty+1][tx]=T.DOOR; }
    }
    for(var st=1;st<=4;st++){ var pdx=Math.round(tx+1+hoDx*(2+st)),pdy=Math.round(ty+1+hoDy*(2+st));
      for(var pw=-1;pw<=1;pw++){ var px2=pdx+pw*Math.abs(hoDy),py2=pdy+pw*Math.abs(hoDx); if(px2>=0&&px2<W&&py2>=0&&py2<H&&(tiles[py2][px2]===T.OCEAN||tiles[py2][px2]===T.REEF||tiles[py2][px2]===T.BEACH))setTK(px2,py2,T.BRIDGE,G(Math.abs(hoDy)>=Math.abs(hoDx)?WSK.bridgev:WSK.bridge)); } }
  };
  M.sites.forEach(function(S){
    var tx=S.x-1, ty=S.y-1, obj;
    if(S.kind==='harbor'){
      var isl=S.isle&&S.isle!=='a'?S.isle:''; obj={type:'harbor',section:S.section,tx:tx,ty:ty,id:'s'+S.section+'_harbor'+(isl?'_'+isl:''),isle:isl||'a',castle:isl?'q'+S.section+'_'+isl:null,zone:S.zone,angle:S.angle||0};
      clearAround(S.x,S.y,3); harborBuild(tx,ty,S.angle||0); trail(S.x,S.y);
    } else {
      if(S.kind==='tower'||S.kind==='dungeon')obj=Object.assign({},roster[S.design],{tx:tx,ty:ty,zone:S.zone});
      else obj={type:S.kind,section:S.section,tx:tx,ty:ty,id:'s'+S.section+'_'+S.kind,zone:S.zone};
      clearAround(S.x,S.y+1,4);
      for(var dy=-1;dy<=3;dy++)for(var dx=-1;dx<=3;dx++){ var X=tx+dx, Y=ty+dy; if(cls[Y*W+X]===WM.LAND)kind[Y*W+X]=G(WSK.plaza); }
      for(var dy1=0;dy1<3;dy1++)for(var dx1=0;dx1<3;dx1++)tiles[ty+dy1][tx+dx1]=T.STONE_FLOOR;
      for(var dx3=0;dx3<3;dx3++)tiles[ty][tx+dx3]=T.BUILDING_WALL;
      tiles[ty+2][tx+1]=T.DOOR;
      trail(tx+1,ty+4);
    }
    sites.push(obj);
  });
  // ── 6b. mage towers (round 5): 4 per quadrant on open land, well away from the other sites ──
  if(typeof MAGE_TOWERS!=='undefined'){ var rmg=rngOf(WORLD_SEED+4242), magePos=[];
    [1,2,3,4].forEach(function(r){ var list=MAGE_TOWERS.filter(function(M){ return M.q===r; }), got=0;
      for(var at=0;at<9000&&got<list.length;at++){ var x=Math.floor(rmg.f()*W), y=Math.floor(rmg.f()*H), k=y*W+x; if(region[k]!==r)continue;
        var ok=true; for(var dy=-3;dy<=5&&ok;dy++)for(var dx=-3;dx<=3;dx++){ var xx=x+dx,yy=y+dy; if(xx<2||yy<2||xx>=W-2||yy>=H-2){ ok=false; break; } var kk=yy*W+xx; if(cls[kk]!==WM.LAND||reserved[kk]||region[kk]!==r){ ok=false; break; } }
        if(!ok)continue; var far=at>6500?14:22;
        if(sites.some(function(s){ return Math.abs(s.tx+1-x)<far&&Math.abs(s.ty+1-y)<far; })||magePos.some(function(p){ return Math.hypot(p.x-x,p.y-y)<40; }))continue;
        if(Math.hypot(x-CENTER_X,y-CENTER_Y)<VILLAGE_RADIUS+30)continue;
        var M=list[got], tx=x-1, ty=y-1, zi=zone[k];
        var obj={type:'tower',section:r,tx:tx,ty:ty,id:'mage_'+M.key,mage:M.key,design:_mageBg(M),name:M.name,floors:M.floors,zone:(WMAP_ZONES[zi]||{}).id};
        clearAround(x,y+1,4);
        for(var dy2=-1;dy2<=3;dy2++)for(var dx2=-1;dx2<=3;dx2++){ var X=tx+dx2, Y=ty+dy2; if(cls[Y*W+X]===WM.LAND)kind[Y*W+X]=G(WSK.plaza); }
        for(var dy1=0;dy1<3;dy1++)for(var dx1=0;dx1<3;dx1++)tiles[ty+dy1][tx+dx1]=T.STONE_FLOOR;
        for(var dx3=0;dx3<3;dx3++)tiles[ty][tx+dx3]=T.BUILDING_WALL;
        tiles[ty+2][tx+1]=T.DOOR; trail(tx+1,ty+4);
        sites.push(obj); magePos.push({x:x,y:y}); got++; } }); }
  var rank=function(s){ return s.boss?0:(s.type==='camp'||s.type==='harbor'||s.type==='skyport')?1:2; };
  sites.sort(function(a,b){ return a.section-b.section||rank(a)-rank(b); });
  // ── 7. waystones: a small plaza + trail ──
  var waystones=M.waystones.map(function(w){ return Object.assign({},w); });
  waystones.forEach(function(w){ if(w.region===0)return; clearAround(w.x,w.y,3);
    for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++)setTK(w.x+dx,w.y+dy,T.STONE_FLOOR,G(WSK.plaza)); trail(w.x,w.y+2); });
  // ── 8. hidden caches: an islet ringed by the region's signature terrain ──
  var caches=[], CACHE_N={1:3,2:5,3:5,4:5}, rc=rngOf(WORLD_SEED+909);
  var ringT={1:T.DEEP_WATER,2:T.DEEP_WATER,3:T.LARGE_BOULDER,4:T.THIN_MAGMA}, ringR={1:3.5,2:3.5,3:3.5,4:5.5};
  var ringK=function(r,zi){ var s=skins[zi]; return r===1?WSK.lake:r===2?s.deep:r===3?s.rock:WSK.crust; };
  var farFrom=function(x,y){ for(var i=0;i<sites.length;i++)if(Math.abs(sites[i].tx+1-x)<24&&Math.abs(sites[i].ty+1-y)<24)return false; for(var j=0;j<waystones.length;j++)if(Math.abs(waystones[j].x-x)<24&&Math.abs(waystones[j].y-y)<24)return false; for(var q=0;q<caches.length;q++)if(Math.hypot(caches[q].x-x,caches[q].y-y)<70)return false; return Math.hypot(x-CENTER_X,y-CENTER_Y)>60; };
  var solidLand=function(x,y,R){ for(var dy=-R;dy<=R;dy++)for(var dx=-R;dx<=R;dx++){ var xx=x+dx,yy=y+dy; if(xx<1||yy<1||xx>=W-1||yy>=H-1)return false; var kk=yy*W+xx; if(cls[kk]!==WM.LAND||reserved[kk])return false; } return true; };
  [1,2,3,4].forEach(function(r){ var got=0;
    for(var at=0;at<5000&&got<CACHE_N[r];at++){ var x=Math.floor(rc.f()*W), y=Math.floor(rc.f()*H), k=y*W+x;
      if(region[k]!==r||zone[k]===255)continue; if(!solidLand(x,y,Math.ceil(ringR[r])+3))continue; if(!farFrom(x,y))continue;
      if(r>1&&at<3500){ var t0c=tiles[y][x]; if(t0c!==T[WZ_SIGNATURE[r].tile]&&t0c!==T[WZ_SIGNATURE[r].deep])continue; }
      var R=ringR[r], zi=zone[k];
      for(var dy=-Math.ceil(R)-1;dy<=Math.ceil(R)+1;dy++)for(var dx=-Math.ceil(R)-1;dx<=Math.ceil(R)+1;dx++){ var d=Math.hypot(dx,dy), kk=(y+dy)*W+x+dx; if(d>R+1)continue; reserved[kk]=5; if(d>R)continue;
        if(d<1.6)setTK(x+dx,y+dy,WZ_GROUND_T[r],G(skins[zi].ground)); else setTK(x+dx,y+dy,ringT[r],G(ringK(r,zi))); }
      caches.push({id:'cache_'+r+'_'+got,region:r,x:x,y:y,zone:WMAP_ZONES[zi].id}); got++; } });
  // ── 9. endgame volcano anchors: nearest reachable shore in the volcano's region ──
  var anchors={};
  M.volcanoes.forEach(function(v){ var best=null,bd=1e18;
    for(var y=0;y<H;y+=3)for(var x=0;x<W;x+=3){ var kk=y*W+x; if(region[kk]!==v.section)continue; var c=cls[kk]; if(c!==WM.BEACH&&c!==WM.LAND)continue; var dd=(x-v.x)*(x-v.x)+(y-v.y)*(y-v.y); if(dd<bd){bd=dd;best={x:x,y:y};} }
    if(best){ anchors[v.id]=best; trail(best.x,best.y,160); } });
  tm.pois=Date.now()-t0;
  // ── 10. ambient props: each zone's own Lab props at the Lab's density ──
  _wgAmbientProps({W:W,H:H,cls:cls,region:region,zone:zone,tiles:tiles,kind:kind,reserved:reserved,skins:skins,addProp:addProp});
  tm.props=Date.now()-t0;
  // each prop is listed in every chunk its footprint (+2 tiles) touches: the ground
  // part and lights are painted where they fall; tall sprites only in the anchor chunk
  var byChunk={}; props.forEach(function(p){ var c0=Math.floor((p.x-2)/WCH), c1=Math.floor((p.x+p.w+1)/WCH), r0=Math.floor((p.y-2)/WCH), r1=Math.floor((p.y+p.h+1)/WCH);
    for(var cy=r0;cy<=r1;cy++)for(var cx=c0;cx<=c1;cx++){ var key=cx+'_'+cy; (byChunk[key]=byChunk[key]||[]).push(p); } });
  // props sort by foot so flat ones paint in order
  // smooth centre-lines for roads, bridges and trails (painted as curves, not tile steps)
  var lines=[]; for(var ri=0;ri<M.roadPts.length;ri+=2)lines.push(M.roadPts[ri],M.roadPts[ri+1],1.75);
  gates.forEach(function(g){ for(var d=-20;d<=20;d+=0.5)lines.push(g.dir==='v'?g.x+0.5:g.x+d+0.5, g.dir==='v'?g.y+d+0.5:g.y+0.5, 2.6); });
  trailLines.forEach(function(L){ for(var i=0;i<L.length;i++){ var sx=0,sy=0,n=0; for(var j=Math.max(0,i-3);j<=Math.min(L.length-1,i+3);j++){ sx+=L[j][0]; sy+=L[j][1]; n++; } lines.push(sx/n,sy/n,1.1); } });
  var wd={tiles:tiles,kind:kind,buildings:buildings,lines:new Float32Array(lines),sites:sites,gates:gates,waystones:waystones,caches:caches,volcanoAnchors:anchors,
    props:props,propsByChunk:byChunk,landmarks:landmarks,runeSpots:stampSpawns,ley:ley,shafts:shafts,stampParts:stampParts,
    map:M,region:region,zone:zone,cls:cls,baseVer:0,
    spawnX:CENTER_X*TILE+TILE/2, spawnY:CENTER_Y*TILE+TILE/2};
  _wgApplyGates(wd,{rescued:[],unlockedSections:[1]});
  // Free the world map's build-only scratch grids (height 5.8 MB, gateAt 1.4 MB: nothing reads them
  // after this; gates carry their own cells). coastDist is only read by the map base image
  // (21-ui.js, clamped at 120 tiles), so a clamped byte per tile is exact for it (5.8 → 1.4 MB).
  M.height=null; M.gateAt=null; M.coastDist=new Uint8ClampedArray(M.coastDist);
  wd.buildMs=Date.now()-t0; wd.buildTimes=tm;
  return wd;
}

// Ambient dressing: run each zone design's own props() over the land it
// covers, one 32×32 chunk at a time, keeping only its randomly placed
// props (scatters, random rings, kites, floating rocks…) at the Lab density.
// Fixed set pieces stay in the zone's stamped landmark.
function _wgAmbientProps(A){
  var W=A.W, H=A.H, KL=WK_REG.list, occ=new Uint8Array(W*H);
  var nCh=Math.ceil(W/WCH);
  for(var cy=0;cy<nCh;cy++)for(var cx=0;cx<nCh;cx++){
    var cnt={}, x0=cx*WCH, y0=cy*WCH;
    for(var y=y0;y<y0+WCH&&y<H;y++)for(var x=x0;x<x0+WCH&&x<W;x++){ var k=y*W+x; if(A.cls[k]!==WM.LAND||A.reserved[k]||A.zone[k]===255)continue; cnt[A.zone[k]]=(cnt[A.zone[k]]||0)+1; }
    Object.keys(cnt).forEach(function(zs){ var zi=+zs, n=cnt[zi]; if(n<40)return; _wgAmbientZone(A,occ,zi,x0,y0,n/3600*WZ_AMB_DENS,rngOf((cx*7919+cy*104729+zi*31)>>>0)); });
  }
}
function _wgAmbientZone(A,occ,zi,x0,y0,scale,R){
  var W=A.W, H=A.H, s=A.skins[zi], Z=s.Z, KL=WK_REG.list, byId={}; [Z.ground].concat(Z.kinds||[]).forEach(function(k){ byId[k.id]=byId[k.id]||k; });
  var wk=function(x,y){ var X=x0+x, Y=y0+y; if(X<0||Y<0||X>=W||Y>=H)return null; return KL[A.kind[Y*W+X]]; };
  var matches=function(x,y,on){ if(on===undefined)return true; var k=wk(x,y); if(!k)return false; var ids=Array.isArray(on)?on:[on]; for(var i=0;i<ids.length;i++){ var id=ids[i]; if(k.id===id)return true; if(id===Z.ground.id&&k===s.ground)return true; } return false; };
  var eligible=function(x,y,any){ var X=x0+x, Y=y0+y; if(X<1||Y<1||X>=W-1||Y>=H-1)return false; var k=Y*W+X; if(A.zone[k]!==zi||A.cls[k]!==WM.LAND||A.reserved[k]||occ[k])return false; if(any)return true; var t=A.tiles[Y][X]; return !ALWAYS_BLOCKED.has(t)&&t!==T.SHALLOW_WATER&&t!==T.THIN_MAGMA&&t!==T.SMALL_BOULDER; };
  var last=null, fixed=0;
  var c={W:WCH,H:WCH,R:R,nz:s.nz,nz2:s.nz2,m:newMap(1,1),t:new Uint8Array(1),K:[Z.ground].concat(Z.kinds||[]),obst:[],ley:[],landmarks:[],occ:new Uint8Array(1),sp:{x:-99,y:-99},isl:[],cr:[]};
  c.k=function(id){ return 0; }; c.get=function(x,y){ var k=wk(x,y); return k?c.K.indexOf(k):-1; }; c.is=function(x,y,id){ return matches(x,y,id); }; c.solidAt=function(x,y){ var k=wk(x,y); return !k||!!k.solid; };
  ['set','rect','line','blob','ring','raise','cutStairs','landmark','leyLine','noise'].forEach(function(f){ c[f]=function(){}; });
  c.open=function(x,y){ return eligible(x,y); };
  var rawOpen=function(on,tries,any){ for(var q=0;q<(tries||60);q++){ var x=R.i(0,WCH-1), y=R.i(0,WCH-1); if(!eligible(x,y,any&&on!==undefined))continue; if(!matches(x,y,on))continue; return {x:x,y:y}; } return null; };
  c.randomOpen=function(on,tries){ if(R.f()>scale)return null; var p=rawOpen(on,tries); if(p)last=p; return p; };
  c.place=function(prop,x,y,w,h,o,viaScatter){ o=o||{}; w=w||1; h=h||1;
    if(!viaScatter){ if(!last||Math.abs(x-last.x)>3||Math.abs(y-last.y)>3){ fixed++; return false; } }
    for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){ if(!eligible(x+xx,y+yy,o.any))return false; if(o.on!==undefined&&!matches(x+xx,y+yy,o.on))return false; }
    var solid=o.solid!==false;
    for(var a=0;a<h;a++)for(var b=0;b<w;b++){ var X=x0+x+b, Y=y0+y+a, k=Y*W+X; if(o.claim!==false||solid)occ[k]=1; if(solid)A.tiles[Y][X]=T.PROP; }
    A.addProp({prop:prop,x:x0+x,y:y0+y,w:w,h:h,o:Object.assign({},o,{v:R.f()}),zi:zi}); return true; };
  c.scatter=function(prop,n,o){ o=o||{}; var want=n*scale, m=Math.floor(want)+(R.f()<want-Math.floor(want)?1:0), got=0;
    for(var q=0;q<m*6&&got<m;q++){ var p=rawOpen(o.on,30,o.any); if(!p)continue; if(c.place(prop,p.x,p.y,o.w||1,o.h||1,o,true))got++; } return got; };
  try{ if(Z.props)Z.props(c); }catch(e){}
  try{ if(s.extra)s.extra(c); }catch(e){}
}
