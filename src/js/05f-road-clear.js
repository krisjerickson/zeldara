// ═══════════════════════════════════════════════════════════════════════
// ║ 05f-road-clear.js — round 72g (Kris: "there are sometimes impassable terrain items in the roads … roads should be cleared of obstacles").
// ║ A solid prop (a rock, a stump, a tree) that the world builder stood on a road cell blocks the road. Once per world (it is part of the
// ║ baked world too): every solid prop whose footprint covers a road cell is taken away, and its cells walkable again — the road's own
// ║ cells as road, the rest as the ground beneath. Village pieces and see-through props stay. (The roads that join the hamlets after the
// ║ end are cleared by 10zh's carve.)
// ═══════════════════════════════════════════════════════════════════════
var ZROADCLR={ on:true,
  run:function(wd){ if(!ZROADCLR.on||!wd||wd._roadClear||!wd.props||!wd.tiles||!wd.kind)return 0; wd._roadClear=1; if(typeof _wkInit==='function')_wkInit();
    var W=WORLD_W, KL=WK_REG.list;
    var isRoad=function(x,y){ var t=wd.tiles[y]&&wd.tiles[y][x]; if(t===T.PATH||t===T.BRIDGE)return true; var k=KL[wd.kind[y*W+x]]; return !!(k&&(k.roadish||k.id==='road'||k.id==='path')); };
    var gone=new Set();
    wd.props=wd.props.filter(function(p){ if(p.vill||(p.o&&p.o.solid===false))return true; var x0=Math.floor(p.x), y0=Math.floor(p.y), w=Math.max(1,Math.round(p.w||1)), h=Math.max(1,Math.round(p.h||1)), hit=false;
      for(var j=0;j<h&&!hit;j++)for(var i=0;i<w;i++){ var X=x0+i, Y=y0+j; if(wd.tiles[Y]&&wd.tiles[Y][X]===T.PROP&&isRoad(X,Y)){ hit=true; break; } }
      if(!hit)return true;
      gone.add(p);
      for(var j2=0;j2<h;j2++)for(var i2=0;i2<w;i2++){ var X2=x0+i2, Y2=y0+j2; if(!wd.tiles[Y2]||wd.tiles[Y2][X2]!==T.PROP)continue; wd.tiles[Y2][X2]=isRoad(X2,Y2)?T.PATH:(typeof _wgKindT==='function'?_wgKindT(KL[wd.kind[Y2*W+X2]]||{},getTileSection(X2,Y2)):T.GRASS); if(wd.tiles[Y2][X2]===T.PROP)wd.tiles[Y2][X2]=T.GRASS; }
      return false; });
    if(gone.size&&wd.propsByChunk)Object.keys(wd.propsByChunk).forEach(function(k){ wd.propsByChunk[k]=wd.propsByChunk[k].filter(function(p){ return !gone.has(p); }); });
    wd._roadPropsCut=gone.size; return gone.size; }
};
(function(){ if(typeof generateWorld!=='function')return; var g0=generateWorld; generateWorld=function(){ var wd=g0.apply(this,arguments); try{ ZROADCLR.run(wd); }catch(e){} return wd; }; })();
