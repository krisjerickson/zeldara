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
      ZSL.HAM.spots.forEach(function(h,j){ var kind=h[0], id=kind==='work'?'hw_'+ZHAM.trade(n):kind==='home'?ZHAMW.home(Z,n,j):'hh_'+kind;
        if(!Z||!Z.has(id)){ var L=(ZHAMW.STAND[kind]||[]).filter(function(k){ return Z&&Z.has(k); }); id=L.length?L[(n+j)%L.length]:null; } if(!id)return;
        var sz=Z.size(id,0), fx=H.cx+h[1], fy=H.cy+h[2], wT=sz?sz.w*Z.K/TILE:3; H.pieces.push({kind:kind,id:id,fx:fx,fy:fy,w:wT,x0:Math.round(fx-wT*0.42),x1:Math.round(fx+wT*0.42)-1,y1:Math.floor(fy-0.3),y0:Math.floor(fy-0.3)-(ZHAMW.DEPTH[kind]||1)+1}); });
      out.push(H); });
    return (wd._hamPlan=out); },
  // round 70 (Kris on hh_new_a: "only have one cottage, longhouse or stone cottage per hamlet, and we should change some of the coloration for
  // variety"): the three homes of a hamlet are one of each kind (j = 1…3 → (n+j)%3), each in one of its colourings (wave 80: _2, _3) once painted
  home:function(Z,n,j){ var b=['hh_new_a','hh_new_b','hh_new_c'][(n+j)%3], v=(n*2+j*5)%3, id=v?b.replace(/hh_new_(\w)/,'hh_new_$1'+(v+1)):b; return Z&&Z.has(id)?id:b; },
  grass:function(ws){ var wd=ws.wd; if(wd._hamGrass)return wd._hamGrass; for(var r=34;r<80;r++)for(var a=0;a<24;a++){ var x=Math.round(CENTER_X+Math.cos(a/24*Math.PI*2)*r), y=Math.round(CENTER_Y+Math.sin(a/24*Math.PI*2)*r);
      if(wd.tiles[y]&&wd.tiles[y][x]===T.GRASS)return (wd._hamGrass={t:T.GRASS,k:wd.kind[y*WORLD_W+x]}); } return (wd._hamGrass={t:T.GRASS,k:wd.kind[CENTER_Y*WORLD_W+CENTER_X]}); },
  KEEP:null,
  carve:function(ws){ var wd=ws.wd, D=ZSLW.data(ws); if(wd._hamDone||!D)return; var G=ZHAMW.grass(ws), P=ZHAMW.plan(ws), W=WORLD_W, ch=[], cut={}, mark=function(x,y){ cut[y*W+x]=1; };
    var keepT={}; [T.BUILDING_WALL,T.DOOR,T.STONE_FLOOR,T.VILLAGE_FLOOR,T.BRIDGE].forEach(function(t){ if(t!==undefined)keepT[t]=1; });
    var avoid=[]; (wd.sites||[]).forEach(function(S){ avoid.push([S.tx+1.5,S.ty+1.5,5]); }); (wd.waystones||[]).forEach(function(w){ avoid.push([w.x,w.y,3]); }); (wd.gates||[]).forEach(function(g){ avoid.push([g.x,g.y,4]); });
    var ok=function(x,y){ if(x<1||y<1||x>=W-1||y>=WORLD_H-1)return false; if(Math.hypot(x-CENTER_X,y-CENTER_Y)<34)return false; var t=wd.tiles[y][x]; if(keepT[t])return false; if(ZHAMW.inLake(ws,x,y))return false;      /* round 72: Mirror Lake stays water — Asgard sinks into it (16t) */ for(var i=0;i<avoid.length;i++)if(Math.hypot(x-avoid[i][0],y-avoid[i][1])<avoid[i][2])return false; return true; };
    // round 72g (Kris: "impassable terrain items in the roads once you have beat the game … roads should be cleared of obstacles"):
    // a road that ran to Asgard stops at Mirror Lake's shore (Asgard has sunk); the road's own cells are cleared of rocks, cliffs and trees
    // even beside a gate, a site or a waystone (the gate's crossing strip and buildings are left alone)
    ZHAMW.wetCut(ws,D); var NAT={}, roadC={}; [T.TREE,T.ROCK,T.SMALL_BOULDER,T.LARGE_BOULDER,T.CLIFF,T.PROP,T.REED,T.MUD].forEach(function(t){ if(t!==undefined)NAT[t]=1; });
    var strip={}; (wd.gates||[]).forEach(function(g){ for(var d=-20;d<=20;d++)for(var w=-2;w<=2;w++){ var gx=g.dir==='v'?g.x+w:g.x+d, gy=g.dir==='v'?g.y+d:g.y+w; strip[gy*W+gx]=1; } });
    var R=ZSL.HAM.ring+1+ZHAMW.MARGIN; P.forEach(function(H){ for(var y=Math.floor(H.cy-R);y<=H.cy+R;y++)for(var x=Math.floor(H.cx-R);x<=H.cx+R;x++)if(Math.hypot(x+0.5-H.cx,y+0.5-H.cy)<=R)mark(x,y); });
    var rw=ZHAMW.ROADW/2+ZHAMW.MARGIN*0.6, rw0=ZHAMW.ROADW/2+0.6; (D.roads||[]).forEach(function(r){ r.pts.forEach(function(p,i){ if(r.cut[i]&&(Math.hypot(p.x-CENTER_X,p.y-CENTER_Y)<34||(r.wet&&r.wet[i])))return; for(var y=Math.floor(p.y-rw);y<=p.y+rw;y++)for(var x=Math.floor(p.x-rw);x<=p.x+rw;x++){ var dd=Math.hypot(x+0.5-p.x,y+0.5-p.y); if(dd<=rw)mark(x,y); if(dd<=rw0)roadC[y*W+x]=1; } }); });
    // the wild dressing (trees, rocks, ruins) standing there goes
    var gone=new Set(), onRoad=function(p){ var x0=Math.floor(p.x), y0=Math.floor(p.y); for(var j=0;j<Math.max(1,Math.round(p.h||1));j++)for(var i=0;i<Math.max(1,Math.round(p.w||1));i++){ var k=(y0+j)*W+x0+i; if(roadC[k]&&!strip[k]&&wd.tiles[y0+j]&&wd.tiles[y0+j][x0+i]===T.PROP)return true; } return false; };
    // round 72g: the town wall opens where a road leaves the village (07l reads VR_EXTRA.roadGaps; the village is laid out again)
    var gaps={}, ng=0; (D.roads||[]).forEach(function(r){ r.pts.forEach(function(p,i){ if(r.wet&&r.wet[i])return; var d=Math.hypot(p.x-CENTER_X,p.y-CENTER_Y); if(d<24||d>44)return; for(var y=Math.floor(p.y-2.5);y<=p.y+2.5;y++)for(var x=Math.floor(p.x-2.5);x<=p.x+2.5;x++)if(Math.hypot(x+0.5-p.x,y+0.5-p.y)<=2.5){ var key=(x-CENTER_X)+','+(y-CENTER_Y); if(!gaps[key]){ gaps[key]=1; ng++; } } }); });
    if(typeof VR_EXTRA!=='undefined'&&ng){ VR_EXTRA.roadGaps=gaps; if(typeof villageApply==='function'&&wd.villageStage)villageApply(wd,wd.villageStage).forEach(function(q){ if(ws._refreshChunkAt)ws._refreshChunkAt(q[0]*WCH,q[1]*WCH); }); }
    wd.props=(wd.props||[]).filter(function(p){ if(p.vill)return true; var hit=false, px0=Math.floor(p.x), py0=Math.floor(p.y); for(var j=-1;j<=Math.ceil(p.h||1)&&!hit;j++)for(var i=-1;i<=Math.ceil(p.w||1);i++)if(cut[(py0+j)*W+px0+i]){ hit=true; break; } if(hit)gone.add(p); return !hit; });
    if(wd.propsByChunk&&gone.size)Object.keys(wd.propsByChunk).forEach(function(k){ wd.propsByChunk[k]=wd.propsByChunk[k].filter(function(p){ return !gone.has(p); }); });      // the chunk painter reads these
    wd._hamPropsCut=gone.size;
    Object.keys(cut).forEach(function(k){ var x=k%W, y=(k/W)|0; if(!ok(x,y)){ if(!(roadC[k]&&!strip[k]&&wd.tiles[y]&&NAT[wd.tiles[y][x]]))return; } wd.tiles[y][x]=G.t; wd.kind[k]=G.k; ch.push([x,y]); });
    // the hamlet buildings are solid (their ground stays grass)
    P.forEach(function(H){ H.pieces.forEach(function(q){ for(var y=q.y0;y<=q.y1;y++)for(var x=q.x0;x<=q.x1;x++){ if(!wd.tiles[y])continue; if(!ok(x,y)&&!cut[y*W+x])continue; wd.tiles[y][x]=T.BUILDING_WALL; ch.push([x,y]); } }); });
    wd._hamDone=true; wd.baseVer=(wd.baseVer||0)+1; if(typeof ZESC!=='undefined'&&ZESC.refresh)ZESC.refresh(ws,ch); else ch.forEach(function(c){ if(ws._refreshChunkAt)ws._refreshChunkAt(c[0],c[1]); }); },
  // Mirror Lake: its whole body of water (flooded from round its middle), not only a circle — the roads stop at its shore
  inLake:function(ws,x,y){ var wd=ws.wd; if(typeof ZASG==='undefined')return false; var M=wd._lakeM; if(!M){ var W=WORLD_W, H=WORLD_H, L=ZASG.LAKE, R=150, q=[]; M=wd._lakeM=new Uint8Array(W*H);
      for(var yy=L.y-64;yy<=L.y+64;yy++)for(var xx=L.x-64;xx<=L.x+64;xx++){ if(Math.hypot(xx-L.x,yy-L.y)>64||!wd.tiles[yy])continue; if(ZASG.water(wd.tiles[yy][xx])){ M[yy*W+xx]=1; q.push(yy*W+xx); } }
      while(q.length){ var k=q.pop(), cx=k%W, cy=(k/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=cx+d[0], ny=cy+d[1], nk=ny*W+nx; if(nx<0||ny<0||nx>=W||ny>=H||M[nk]||Math.hypot(nx-L.x,ny-L.y)>R)return; if(ZASG.water(wd.tiles[ny][nx])){ M[nk]=1; q.push(nk); } }); } }
    return !!M[y*WORLD_W+x]; },
  // the road points in Mirror Lake or on Asgard's isle (which sinks once the spirits are home) are left out: not drawn, not carved
  wetCut:function(ws,D){ if(!D||!D.roads||typeof ZASG==='undefined')return; var wd=ws.wd, W=WORLD_W, isl=null, bif={}; try{ var PL=ZASG.plan(ws); isl=PL.isl; (PL.cells||[]).forEach(function(c){ bif[c[1]*W+c[0]]=1; }); }catch(e){}      /* everything that sinks: the isle's cells and the Bifröst */
    (wd._bifCells||[]).forEach(function(c){ bif[c[1]*W+c[0]]=1; });      /* the Bifröst sinks with Asgard (16t) */
    D.roads.forEach(function(r){ r.wet=r.pts.map(function(p,i){ if(r.wet&&r.wet[i])return 1; var x=Math.floor(p.x), y=Math.floor(p.y), k=y*W+x, t=wd.tiles[y]&&wd.tiles[y][x]; var nb=false; for(var dy=-2;dy<=2&&!nb;dy++)for(var dx=-2;dx<=2;dx++)if(bif[k+dy*W+dx]){ nb=true; break; } return (isl&&isl[k])||nb||ZHAMW.inLake(ws,x,y)?1:0; });
      r.wet.forEach(function(w,i){ if(w)r.cut[i]=1; }); }); },
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
  tick:function(ws){ if(!ZHAMW.on||typeof ZHAM==='undefined')return; var ps=ws.playerState; if(!ps.spiritsHome){ ZHAMW.clear(ws); if(typeof ZKIDW!=='undefined')ZKIDW.clear(ws); if(typeof VR_EXTRA!=='undefined')VR_EXTRA.roadGaps=null; return; }
    ZHAMW.carve(ws); ZHAMW.doors(ws); ZHAMW.show(ws); if(typeof ZKIDW!=='undefined')ZKIDW.manage(ws); },      // round 70: the children at play (10zk)
  // inside: talking with the kin ([Tab] again for more)
  talk:function(scene,n){ var K=ZHAM.KIN[n], S=ZHAM.spirit(n), L=ZHAM.lines(n), i=scene._hamLine||0, ch=ZHAM.kinId(n); scene._hamLine=(i+1)%L.length;
    var draw=function(x,t){ if(typeof ZAtlas!=='undefined'&&ZAtlas.drawTo(x,ch,['talk','idle'],'f',t,4,2,88,92))return; var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[ch]; if(R&&typeof chFrames==='function'){ try{ var fr=chFrames(R); x.imageSmoothingEnabled=false; x.drawImage(fr[(t>>2)%fr.length],8,8,80,80); }catch(e){} } };
    ZSPIRIT.talk(K[1]+' — '+S.name+'\'s '+K[2].replace(/^(her|his) /,''),'#e8c878',L[i],[{t:i+1<L.length?'More…':'Goodbye',f:i+1<L.length?function(){ ZHAMW.talk(scene,n); }:null}],draw); }
};
// [Tab] Talk inside a hamlet workshop (11-scene-building) — its _npcInteract knows the village's own buildings; this adds the workshops
setTimeout(function(){ if(typeof BuildingScene==='undefined'||BuildingScene.prototype._hamWrapped)return; BuildingScene.prototype._hamWrapped=true; var _hamNpc=BuildingScene.prototype._npcInteract;
  BuildingScene.prototype._npcInteract=function(){ var t=this.building&&this.building.type; if(/^ham_/.test(t||'')){ this._hamLine=0; ZHAMW.talk(this,+t.slice(4)); return; } return _hamNpc.apply(this,arguments); }; },0);
