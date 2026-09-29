// ─── PRNG & Noise ────────────────────────────────
class PRNG{
  constructor(s){this.s=(s>>>0)||1}
  next(){this.s^=this.s<<13;this.s^=this.s>>>17;this.s^=this.s<<5;return(this.s>>>0)/0xFFFFFFFF}
  r(a,b){return a+this.next()*(b-a)}
  i(a,b){return Math.floor(this.r(a,b+1))}
  at(x,y){let s=(x*1619+y*31337+WORLD_SEED*6971)>>>0;s^=s<<13;s^=s>>>17;s^=s<<5;return(s>>>0)/0xFFFFFFFF}
}
function noise(x,y,scale,seed){
  seed=seed||WORLD_SEED;
  const rng=new PRNG(seed),ix=Math.floor(x/scale),iy=Math.floor(y/scale),fx=(x/scale)-ix,fy=(y/scale)-iy;
  const v00=rng.at(ix,iy),v10=rng.at(ix+1,iy),v01=rng.at(ix,iy+1),v11=rng.at(ix+1,iy+1);
  const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);
  return v00+(v10-v00)*sx+(v01-v00)*sy+(v00-v10-v01+v11)*sx*sy;
}

// ─── Canvas2D Tile Drawing — with 12 micro-variants + gradients ──────────
// (the old per-tile painter drawTileToCtx and generateIsland were removed in round 6: islands use the world painter)

// ─── World Generation ─────────
// Phase 3: the 1200 × 1200 continent is built from the world map
// (07e-world-map.js) by _buildGameWorld() in 05b-world-build.js.
var _worldData=null;
function generateWorld(){
  if(_worldData)return _worldData;
  _worldData=_buildGameWorld();
  return _worldData;
}

function buildVillage(tiles){
  var vx=CENTER_X,vy=CENTER_Y;
  // Village floor area
  for(var dy=-VILLAGE_RADIUS+2;dy<=VILLAGE_RADIUS-2;dy++){
    for(var dx=-VILLAGE_RADIUS+2;dx<=VILLAGE_RADIUS-2;dx++){
      if(Math.hypot(dx,dy)<VILLAGE_RADIUS-1){
        tiles[vy+dy][vx+dx]=T.VILLAGE_FLOOR;
      }
    }
  }
  // Cross paths
  for(var dx=-VILLAGE_RADIUS;dx<=VILLAGE_RADIUS;dx++){if(vx+dx>=0&&vx+dx<WORLD_W)tiles[vy][vx+dx]=T.PATH;}
  for(var dy=-VILLAGE_RADIUS;dy<=VILLAGE_RADIUS;dy++){if(vy+dy>=0&&vy+dy<WORLD_H)tiles[vy+dy][vx]=T.PATH;}

  var bdefs=[
    {dx:-12,dy:-12,w:5,h:4,type:'tavern'},
    {dx: 7, dy:-12,w:5,h:4,type:'shop'},
    {dx:-12,dy: 6, w:4,h:4,type:'house'},
    {dx: 8, dy: 6, w:4,h:4,type:'forge'},
    {dx:-4, dy:-14,w:4,h:3,type:'guild'},
    {dx:14, dy:-4, w:6,h:5,type:'stables'},
    // New specialized shops — spaced away from core buildings
    {dx:-20,dy:-8, w:5,h:4,type:'armory'},   // moved left, away from tavern
    {dx:-20,dy: 4, w:5,h:4,type:'clothing'}, // moved left, away from house
    {dx: 0, dy:14, w:5,h:4,type:'jeweler'},
    {dx:10, dy:14, w:6,h:4,type:'apothecary'},
    {dx: 9, dy:-19,w:5,h:4,type:'merchant'}, // moved up, away from shop
  ];
  bdefs.forEach(function(b){
    var bx=vx+b.dx,by=vy+b.dy;
    for(var dy2=0;dy2<b.h;dy2++){
      for(var dx2=0;dx2<b.w;dx2++){
        tiles[by+dy2][bx+dx2]=b.type==='stables'?T.STABLES_FLOOR:T.STONE_FLOOR;
      }
    }
    for(var dx2=0;dx2<b.w;dx2++)tiles[by][bx+dx2]=T.BUILDING_WALL;
    for(var dy2=1;dy2<b.h-1;dy2++){tiles[by+dy2][bx]=T.BUILDING_WALL;tiles[by+dy2][bx+b.w-1]=T.BUILDING_WALL;}
    var doorX=bx+Math.floor(b.w/2);
    for(var dx2=0;dx2<b.w;dx2++)tiles[by+b.h-1][bx+dx2]=(bx+dx2===doorX)?T.DOOR:T.BUILDING_WALL;
  });
  return bdefs.map(function(b){return Object.assign({},b,{worldX:(vx+b.dx)*TILE,worldY:(vy+b.dy)*TILE});});
}

function canPassTile(t,mount){
  // Dragon (all quests) flies over everything except the sea and walls
  if(mount==='dragon'){
    if(t===T.OCEAN||t===T.REEF||t===T.BUILDING_WALL)return false;
    return true;
  }
  var md=mount&&MOUNTS[mount];
  if(md&&Array.isArray(md.canCross)&&md.canCross.indexOf(t)>=0)return true;
  if(ALWAYS_BLOCKED.has(t))return false;
  return true;   // slow tiles (FOOT_SLOW) are walkable, just slow
}


