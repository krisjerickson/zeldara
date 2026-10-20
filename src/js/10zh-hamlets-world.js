// ═══════════════════════════════════════════════════════════════════════
// ║ 10zh-hamlets-world.js — round 69: THE HAMLETS AFTER THE GODS, IN THE WORLD.
// ║ Kris: "hamlet buildings should work like normal buildings, you shouldn't be able to walk through them. Also, you should be able to go into
// ║ them using tab" — and: "all of the land inbetween the circle rune lines needs to turn into grassland that you can walk on. also make a small
// ║ area around the circular runelines grassland … as well as on the roads - underlying terrain should be grassland, with a little outside of
// ║ the road also grassland".
// ║  · carve: once the spirits have gone home (ps.spiritsHome), on every load: inside each hamlet's ring road and a little beyond, and along the
// ║    roads that join them, the ground becomes walkable grassland (trees, rocks, water and cliffs there are cleared). The village, the
// ║    adventure sites, the waystones and the crossings keep their own ground.
// ║  · every hamlet building is solid (its footprint blocks the way); the workshop's door opens with [Tab] (BuildingScene 'ham_<n>', 07zh).
// ║  · inside, the spirit's kin keeps the workshop and talks of the spirit, the trade and the realm (ZHAM.lines).
// ═══════════════════════════════════════════════════════════════════════
var ZHAMW={ on:true, MARGIN:2.6, ROADW:2.4,
  STAND:{work:['vh_timber_b','vh_stone_b'],home:['vh_round','vh_wood','vh_timber_a','vh_stone','vh_thatch'],well:['vp_well'],yard:[],cart:[]},
  DEPTH:{work:3,home:2,well:1,yard:1,cart:1},      // rows of tiles each piece blocks, up from its foot
  // the pieces of every hamlet: what stands where (tiles), with the painted picture's width
  plan:function(ws){ var wd=ws.wd; if(wd._hamPlan)return wd._hamPlan; var Z=typeof _scn==='function'?_scn():null, out=[];
    (ZSPIRIT.shrines(ws)||[]).forEach(function(s){ var n=s.n||0, H={n:n,s:s,cx:s.tx+0.5,cy:s.ty+0.5,pieces:[]};
      ZSL.HAM.spots.forEach(function(h,j){ var kind=h[0], id=kind==='work'?'hw_'+ZHAM.trade(n):kind==='home'?['hh_new_a','hh_new_b','hh_new_c'][(n+j)%3]:'hh_'+kind;
        if(!Z||!Z.has(id)){ var L=(ZHAMW.STAND[kind]||[]).filter(function(k){ return Z&&Z.has(k); }); id=L.length?L[(n+j)%L.length]:null; } if(!id)return;
        var sz=Z.size(id,0), fx=H.cx+h[1], fy=H.cy+h[2], wT=sz?sz.w*Z.K/TILE:3; H.pieces.push({kind:kind,id:id,fx:fx,fy:fy,w:wT,x0:Math.round(fx-wT*0.42),x1:Math.round(fx+wT*0.42)-1,y1:Math.floor(fy-0.3),y0:Math.floor(fy-0.3)-(ZHAMW.DEPTH[kind]||1)+1}); });
      out.push(H); });
    return (wd._hamPlan=out); },
  grass:function(ws){ var wd=ws.wd; if(wd._hamGrass)return wd._hamGrass; for(var r=34;r<80;r++)for(var a=0;a<24;a++){ var x=Math.round(CENTER_X+Math.cos(a/24*Math.PI*2)*r), y=Math.round(CENTER_Y+Math.sin(a/24*Math.PI*2)*r);
      if(wd.tiles[y]&&wd.tiles[y][x]===T.GRASS)return (wd._hamGrass={t:T.GRASS,k:wd.kind[y*WORLD_W+x]}); } return (wd._hamGrass={t:T.GRASS,k:wd.kind[CENTER_Y*WORLD_W+CENTER_X]}); },
  KEEP:null,
  carve:function(ws){ var wd=ws.wd, D=ZSLW.data(ws); if(wd._hamDone||!D)return; var G=ZHAMW.grass(ws), P=ZHAMW.plan(ws), W=WORLD_W, ch=[], cut={}, mark=function(x,y){ cut[y*W+x]=1; };
    var keepT={}; [T.BUILDING_WALL,T.DOOR,T.STONE_FLOOR,T.VILLAGE_FLOOR,T.BRIDGE].forEach(function(t){ if(t!==undefined)keepT[t]=1; });
    var avoid=[]; (wd.sites||[]).forEach(function(S){ avoid.push([S.tx+1.5,S.ty+1.5,5]); }); (wd.waystones||[]).forEach(function(w){ avoid.push([w.x,w.y,3]); }); (wd.gates||[]).forEach(function(g){ avoid.push([g.x,g.y,4]); });
    var ok=function(x,y){ if(x<1||y<1||x>=W-1||y>=WORLD_H-1)return false; if(Math.hypot(x-CENTER_X,y-CENTER_Y)<34)return false; var t=wd.tiles[y][x]; if(keepT[t])return false; for(var i=0;i<avoid.length;i++)if(Math.hypot(x-avoid[i][0],y-avoid[i][1])<avoid[i][2])return false; return true; };
    var R=ZSL.HAM.ring+1+ZHAMW.MARGIN; P.forEach(function(H){ for(var y=Math.floor(H.cy-R);y<=H.cy+R;y++)for(var x=Math.floor(H.cx-R);x<=H.cx+R;x++)if(Math.hypot(x+0.5-H.cx,y+0.5-H.cy)<=R)mark(x,y); });
    var rw=ZHAMW.ROADW/2+ZHAMW.MARGIN*0.6; (D.roads||[]).forEach(function(r){ r.pts.forEach(function(p,i){ if(r.cut[i]&&Math.hypot(p.x-CENTER_X,p.y-CENTER_Y)<34)return; for(var y=Math.floor(p.y-rw);y<=p.y+rw;y++)for(var x=Math.floor(p.x-rw);x<=p.x+rw;x++)if(Math.hypot(x+0.5-p.x,y+0.5-p.y)<=rw)mark(x,y); }); });
    // the wild dressing (trees, rocks, ruins) standing there goes
    var gone=new Set(); wd.props=(wd.props||[]).filter(function(p){ if(p.vill)return true; var hit=false, px0=Math.floor(p.x), py0=Math.floor(p.y); for(var j=-1;j<=Math.ceil(p.h||1)&&!hit;j++)for(var i=-1;i<=Math.ceil(p.w||1);i++)if(cut[(py0+j)*W+px0+i]){ hit=true; break; } if(hit)gone.add(p); return !hit; });
    if(wd.propsByChunk&&gone.size)Object.keys(wd.propsByChunk).forEach(function(k){ wd.propsByChunk[k]=wd.propsByChunk[k].filter(function(p){ return !gone.has(p); }); });      // the chunk painter reads these
    wd._hamPropsCut=gone.size;
    Object.keys(cut).forEach(function(k){ var x=k%W, y=(k/W)|0; if(!ok(x,y))return; wd.tiles[y][x]=G.t; wd.kind[k]=G.k; ch.push([x,y]); });
    // the hamlet buildings are solid (their ground stays grass)
    P.forEach(function(H){ H.pieces.forEach(function(q){ for(var y=q.y0;y<=q.y1;y++)for(var x=q.x0;x<=q.x1;x++){ if(!wd.tiles[y])continue; if(!ok(x,y)&&!cut[y*W+x])continue; wd.tiles[y][x]=T.BUILDING_WALL; ch.push([x,y]); } }); });
    wd._hamDone=true; wd.baseVer=(wd.baseVer||0)+1; if(typeof ZESC!=='undefined'&&ZESC.refresh)ZESC.refresh(ws,ch); else ch.forEach(function(c){ if(ws._refreshChunkAt)ws._refreshChunkAt(c[0],c[1]); }); },
  // the workshops' doors, with the village's buildings ([Tab] Enter …)
  doors:function(ws){ var B=ws.buildings||(ws.buildings=[]); if(B.some(function(b){ return b.ham!==undefined; }))return;
    ZHAMW.plan(ws).forEach(function(H){ var q=H.pieces.find(function(p){ return p.kind==='work'; }); if(!q)return; var S=ZHAM.spirit(H.n);
      B.push({type:'ham_'+H.n,name:S.name+'\'s workshop',ham:H.n,w:3,h:3,worldX:(Math.round(q.fx)-1)*TILE,worldY:(q.y1-2)*TILE}); }); },
  // the pictures, near you
  show:function(ws){ var Z=typeof _scn==='function'?_scn():null, IM=ws._hamIm||(ws._hamIm={}), px=ws.player.x/TILE, py=ws.player.y/TILE; if(!Z)return;
    ZHAMW.plan(ws).forEach(function(H){ var d=Math.hypot(H.cx-px,H.cy-py), have=IM[H.n];
      if(d<60&&!have)IM[H.n]=H.pieces.map(function(q){ var im=Z.image(ws,q.id,q.fx*TILE,q.fy*TILE,Z.K,WR_DEPTH(q.fy*TILE)); if(im)im._zslHam=1; return im; }).filter(Boolean);
      else if(d>80&&have){ have.forEach(function(im){ if(im&&im.scene)im.destroy(); }); delete IM[H.n]; } }); },
  clear:function(ws){ var IM=ws._hamIm; if(IM)Object.keys(IM).forEach(function(k){ IM[k].forEach(function(im){ if(im&&im.scene)im.destroy(); }); }); ws._hamIm={}; },
  tick:function(ws){ if(!ZHAMW.on||typeof ZHAM==='undefined')return; var ps=ws.playerState; if(!ps.spiritsHome){ ZHAMW.clear(ws); return; }
    ZHAMW.carve(ws); ZHAMW.doors(ws); ZHAMW.show(ws); },
  // inside: talking with the kin ([Tab] again for more)
  talk:function(scene,n){ var K=ZHAM.KIN[n], S=ZHAM.spirit(n), L=ZHAM.lines(n), i=scene._hamLine||0, ch=ZHAM.kinId(n); scene._hamLine=(i+1)%L.length;
    var draw=function(x,t){ if(typeof ZAtlas!=='undefined'&&ZAtlas.drawTo(x,ch,['talk','idle'],'f',t,4,2,88,92))return; var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[ch]; if(R&&typeof chFrames==='function'){ try{ var fr=chFrames(R); x.imageSmoothingEnabled=false; x.drawImage(fr[(t>>2)%fr.length],8,8,80,80); }catch(e){} } };
    ZSPIRIT.talk(K[1]+' — '+S.name+'\'s '+K[2].replace(/^(her|his) /,''),'#e8c878',L[i],[{t:i+1<L.length?'More…':'Goodbye',f:i+1<L.length?function(){ ZHAMW.talk(scene,n); }:null}],draw); }
};
// [Tab] Talk inside a hamlet workshop (11-scene-building) — its _npcInteract knows the village's own buildings; this adds the workshops
setTimeout(function(){ if(typeof BuildingScene==='undefined'||BuildingScene.prototype._hamWrapped)return; BuildingScene.prototype._hamWrapped=true; var _hamNpc=BuildingScene.prototype._npcInteract;
  BuildingScene.prototype._npcInteract=function(){ var t=this.building&&this.building.type; if(/^ham_/.test(t||'')){ this._hamLine=0; ZHAMW.talk(this,+t.slice(4)); return; } return _hamNpc.apply(this,arguments); }; },0);
