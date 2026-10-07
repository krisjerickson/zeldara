// ═══════════════════════════════════════════════════════════════════════
// ║ DUNGEON SELECTOR (Phase 2 · C1) — 10 "Open Cavern" layouts
// ║ Wide open floors broken up by obstacles you walk around, with room for
// ║ ~2× the monsters of a classic room-and-corridor floor. Red rings show
// ║ where monsters would spawn; the sealed portal marks the guardian arena.
// ═══════════════════════════════════════════════════════════════════════
var DG={ROCK:1,OPEN:0};

function vnoise(seed){ var h=function(x,y){ var n=(x*374761393+y*668265263+seed*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0)/4294967296; };
  return function(x,y){ var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi, s=function(t){return t*t*(3-2*t);};
    var a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1), u=s(xf),v=s(yf); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }; }

// Cellular-automata cave: returns Uint8Array (1 rock, 0 open), largest region kept.
function caveGrid(W,H,R,fill,iters,shape){
  var g=new Uint8Array(W*H);
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){
    var edge=x<2||y<2||x>=W-2||y>=H-2;
    var dx=(x-W/2)/(W/2), dy=(y-H/2)/(H/2), r=Math.sqrt(dx*dx+dy*dy);
    var f=fill+(shape==='round'?Math.max(0,r-0.72)*2.2:Math.max(0,Math.max(Math.abs(dx),Math.abs(dy))-0.8)*2);
    g[y*W+x]=edge||R.f()<f?1:0;
  }
  for(var it=0;it<iters;it++){
    var n=new Uint8Array(W*H);
    for(var y2=0;y2<H;y2++)for(var x2=0;x2<W;x2++){
      if(x2<1||y2<1||x2>=W-1||y2>=H-1){n[y2*W+x2]=1;continue;}
      var c=0; for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++)c+=g[(y2+j)*W+x2+i];
      n[y2*W+x2]=c>=5?1:0;
    }
    g=n;
  }
  // keep largest open region
  var lab=new Int32Array(W*H).fill(-1), best=-1, bestN=0, id=0;
  for(var k=0;k<W*H;k++){ if(g[k]||lab[k]>=0)continue; var q=[k],n2=0; lab[k]=id;
    for(var qi=0;qi<q.length;qi++){ var c2=q[qi],cx=c2%W,cy=(c2/W)|0; n2++;
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var nx=cx+d[0],ny=cy+d[1]; if(nx<0||ny<0||nx>=W||ny>=H)return; var kk=ny*W+nx; if(!g[kk]&&lab[kk]<0){lab[kk]=id;q.push(kk);} }); }
    if(n2>bestN){bestN=n2;best=id;} id++; }
  for(var k2=0;k2<W*H;k2++)if(!g[k2]&&lab[k2]!==best)g[k2]=1;
  return g;
}

// Generic dungeon build: design supplies layout(ctx) + painters.
function buildCavern(D, seed, opts){
  opts=opts||{};
  var R=rngOf(seed*131+D.id.length*7), W=D.w||52, H=D.h||40, m=newMap(W,H);
  var g=D.layout?D.layout(W,H,R):caveGrid(W,H,R,D.fill||0.42,D.iters||5,D.shape);
  // hazard grid (lava/water/pit): solid but painted differently
  var hazard=new Uint8Array(W*H);
  var ctxInfo={W:W,H:H,R:R,g:g,hazard:hazard,m:m,obst:[]};
  if(D.hazards)D.hazards(ctxInfo);
  var open=function(x,y){ return x>=0&&y>=0&&x<W&&y<H&&!g[y*W+x]&&!hazard[y*W+x]; };
  // spawn: lowest open cell near the middle
  var sp=null; for(var y=H-3;y>2&&!sp;y--)for(var dx=0;dx<W/2&&!sp;dx++){ [W/2+dx|0,W/2-dx|0].forEach(function(x){ if(!sp&&open(x,y)&&open(x,y-1)&&open(x+1,y))sp={x:x,y:y}; }); }
  if(!sp)sp={x:W>>1,y:H>>1};
  for(var i=0;i<W*H;i++)m.solid[i]=(g[i]||hazard[i])?1:0;
  m.spawn={x:sp.x*LT+LT/2,y:sp.y*LT+LT-4};
  // Cells you can't walk to (islets in a lake, etc.) stay painted as floor but count as blocked.
  (function(){ var r0=floodReach(m,sp.x,sp.y); for(var k=0;k<W*H;k++)if(!m.solid[k]&&!r0[k])m.solid[k]=1; })();
  // obstacles (design places them via ctxInfo.place)
  var occ=new Uint8Array(W*H);
  var reachCount=function(){ var s=floodReach(m,sp.x,sp.y),n=0,o=0; for(var k=0;k<W*H;k++){ if(!m.solid[k]){o++; if(s[k])n++;} } return n===o; };
  ctxInfo.place=function(kind,x,y,w,h,opts){
    for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){ var X=x+xx,Y=y+yy; if(!open(X,Y)||occ[Y*W+X])return false; if(Math.abs(X-sp.x)<3&&Math.abs(Y-sp.y)<3)return false; }
    for(var yy2=0;yy2<h;yy2++)for(var xx2=0;xx2<w;xx2++)m.solid[(y+yy2)*W+x+xx2]=1;
    if(!(opts&&opts.skipReach)&&!reachCount()){ for(var yy3=0;yy3<h;yy3++)for(var xx3=0;xx3<w;xx3++)m.solid[(y+yy3)*W+x+xx3]=0; return false; }
    for(var yy4=0;yy4<h;yy4++)for(var xx4=0;xx4<w;xx4++)occ[(y+yy4)*W+x+xx4]=1;
    ctxInfo.obst.push(Object.assign({kind:kind,x:x,y:y,w:w,h:h},opts||{})); return true;
  };
  ctxInfo.randomOpen=function(tries){ for(var t=0;t<(tries||200);t++){ var x=R.i(2,W-3),y=R.i(2,H-3); if(open(x,y)&&!occ[y*W+x])return {x:x,y:y}; } return null; };
  if(D.obstacles)D.obstacles(ctxInfo);
  // ── paint ──
  var cv=mkCanvas(W*LT,H*LT), ctx=cv.getContext('2d'), P=D.pal, nz=vnoise(seed);
  ctx.fillStyle=P.void||'#07060a'; ctx.fillRect(0,0,W*LT,H*LT);
  for(var ty=0;ty<H;ty++)for(var tx=0;tx<W;tx++){
    var k=ty*W+tx, px=tx*LT, py=ty*LT;
    if(!g[k]){
      var n=nz(tx*0.15,ty*0.15), n2=nz(tx*0.6+50,ty*0.6+50);
      ctx.fillStyle=mix(P.floorA,P.floorB,n*0.8); ctx.fillRect(px,py,LT,LT);
      ctx.fillStyle=rgba(P.floorC||shade(P.floorA,-0.2),0.25+n2*0.25);
      for(var s=0;s<3;s++)ctx.fillRect(px+R.f()*LT,py+R.f()*LT,2,2);
      if(R.chance(0.06)){ ctx.strokeStyle=rgba(shade(P.floorA,-0.4),0.5); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(px+R.f()*LT,py+R.f()*LT); ctx.lineTo(px+R.f()*LT,py+R.f()*LT); ctx.stroke(); }
      if(D.floorDeco)D.floorDeco(ctx,px,py,tx,ty,R,n);
    }
  }
  if(D.paintHazards)D.paintHazards(ctx,ctxInfo,nz);
  // rock with 3/4 faces
  for(var ry=0;ry<H;ry++)for(var rx=0;rx<W;rx++){
    var kk=ry*W+rx; if(!g[kk])continue;
    var px2=rx*LT, py2=ry*LT, near=false;
    for(var j2=-1;j2<=1&&!near;j2++)for(var i2=-1;i2<=1;i2++){ var X=rx+i2,Y=ry+j2; if(X>=0&&Y>=0&&X<W&&Y<H&&!g[Y*W+X]&&!hazard[Y*W+X]){near=true;break;} }
    if(!near){ ctx.fillStyle=P.void||'#07060a'; ctx.fillRect(px2,py2,LT,LT); continue; }
    var faceOpen=ry+1<H&&!g[(ry+1)*W+rx]&&!hazard[(ry+1)*W+rx];
    var top=faceOpen?12:LT;
    var gg=ctx.createLinearGradient(px2,py2,px2,py2+top); gg.addColorStop(0,shade(P.rockTop,0.1)); gg.addColorStop(1,P.rockTop);
    ctx.fillStyle=gg; ctx.fillRect(px2,py2,LT,top);
    for(var q=0;q<4;q++){ ctx.fillStyle=rgba(shade(P.rockTop,R.chance(0.5)?0.2:-0.25),0.6); ctx.fillRect(px2+R.f()*28,py2+R.f()*(top-3),4,2); }
    if(faceOpen){ var fg=ctx.createLinearGradient(px2,py2+top,px2,py2+LT); fg.addColorStop(0,P.rockFace); fg.addColorStop(1,shade(P.rockFace,-0.35)); ctx.fillStyle=fg; ctx.fillRect(px2,py2+top,LT,LT-top);
      ctx.strokeStyle=rgba(shade(P.rockFace,-0.5),0.7); ctx.lineWidth=1; for(var c=0;c<2;c++){ var cx=px2+4+R.f()*24; ctx.beginPath(); ctx.moveTo(cx,py2+top+2); ctx.lineTo(cx+R.f()*6-3,py2+LT-2); ctx.stroke(); }
      var sg=ctx.createLinearGradient(0,py2+LT,0,py2+LT+10); sg.addColorStop(0,'rgba(0,0,0,.35)'); sg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=sg; ctx.fillRect(px2,py2+LT,LT,10); }
    if(D.rockDeco)D.rockDeco(ctx,px2,py2,rx,ry,R,faceOpen,m);
    // irregular rubble along exposed side edges
    [[-1,0],[1,0]].forEach(function(d){ var X=rx+d[0]; if(X<0||X>=W||g[ry*W+X]||hazard[ry*W+X])return; for(var b=0;b<3;b++){ var bx=d[0]<0?px2+R.f()*5:px2+LT-R.f()*5, by=py2+6+R.f()*(LT-10); ctx.fillStyle=shade(P.rockTop,-0.1+R.f()*0.2); ctx.beginPath(); ctx.arc(bx,by,3+R.f()*4,0,Math.PI*2); ctx.fill(); } });
  }
  // obstacles
  ctxInfo.obst.forEach(function(o){ var fn=D.draw[o.kind];
    // painted dungeon pieces (round 30): fitted to the tiles they block
    var Zs=_scn(), pid=o.kind==='shroom'?(o.big?'dg_shroom':'dg_shroom_b'):DNG_PAINTED[o.kind];
    if(Zs&&pid&&Zs.has(pid)){ var cx=(o.x+o.w/2)*LT, fy=(o.y+o.h)*LT-2, ok=o.kind==='boulder'?Zs.sprite(m,pid,cx,fy,0,{w:o.w*LT*1.12*Zs.K}):Zs.fit(m,pid,cx,fy,o.w*LT*1.35,{shw:0.36});
      if(ok){ if(o.kind==='crystal'||o.kind==='shroom')addLight(m,cx,fy-22,o.big?90:64,o.col||'#b58cff',0.35,{pulse:0.3,period:1800+R.i(0,1200)});
        else if(fn){ var fk={sprites:[],lights:[],shafts:[],particles:[],labels:[]}; try{ fn(fk,_dngNoCtx(),o.x*LT,o.y*LT,o.w*LT,o.h*LT,R,o,P); }catch(e){} fk.lights.forEach(function(l){ m.lights.push(l); }); }      // the drawn piece's glow is kept
        return; } }
    if(Zs&&o.kind==='puddle'&&Zs.decal(m,'dg_puddle',(o.x+o.w/2)*LT,(o.y+o.h/2)*LT,{w:o.w*LT*0.9}))return;
    if(fn)fn(m,ctx,o.x*LT,o.y*LT,o.w*LT,o.h*LT,R,o,P); });
  // stairs + sealed portal (farthest reachable point = guardian arena)
  var reach=floodReach(m,sp.x,sp.y), far=null, fd=-1;
  for(var y3=2;y3<H-2;y3++)for(var x3=2;x3<W-2;x3++){ if(!reach[y3*W+x3])continue; var d=Math.abs(x3-sp.x)+Math.abs(y3-sp.y); if(d>fd&&open(x3+1,y3)&&open(x3-1,y3)&&open(x3,y3-1)){fd=d;far={x:x3,y:y3};} }
  cavernMarkers(m,ctx,sp,far,P,opts);
  m.site={entry:{x:sp.x,y:sp.y}, exit:far};
  // monster spawn density
  var openN=0; for(var k3=0;k3<W*H;k3++)if(!m.solid[k3]&&reach[k3])openN++;
  var spawnN=Math.round(openN/(D.density||42));
  var placed=0, tries=0;
  while(placed<spawnN&&tries<4000){ tries++; var x4=R.i(2,W-3),y4=R.i(2,H-3); if(m.solid[y4*W+x4]||!reach[y4*W+x4])continue; if(Math.hypot(x4-sp.x,y4-sp.y)<7)continue;
    var px4=x4*LT+LT/2,py4=y4*LT+LT/2; if(opts.game){ placed++; continue; } ctx.strokeStyle='rgba(255,70,70,.55)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(px4,py4,9,0,Math.PI*2); ctx.stroke(); ctx.fillStyle='rgba(255,60,60,.18)'; ctx.fill(); placed++; }
  m.stats={spawns:placed,open:openN};
  m.base=cv; m.bg=P.void||'#07060a'; m.dark=Math.min(0.72,D.dark===undefined?0.72:D.dark); m.darkCol=P.darkCol||'#030205';
  m.heroLight=D.heroLight||215; m.heroLightCol=D.heroLightCol||'#ffc880';
  (D.particles||[]).forEach(function(p){ m.particles.push(p); });
  if(D.extra)D.extra(ctxInfo);
  addLabel(m,sp.x-1,sp.y,3,1,'Entrance — stairs back up.');
  if(far)addLabel(m,far.x-1,far.y-1,3,3,'Sealed exit portal — the guardian waits here on the last floor.');
  return m;
}
// Smooth hazard field: paint at 1/8 resolution and upscale with smoothing, so
// lava / water / pits get soft organic shorelines instead of square tiles.
function paintHazardField(ctx,c,colorFn){
  var S=4, W=c.W, H=c.H, lo=mkCanvas(W*S,H*S), lx=lo.getContext('2d'), img=lx.createImageData(W*S,H*S), d=img.data;
  for(var py=0;py<H*S;py++)for(var px=0;px<W*S;px++){
    var tx=(px/S)|0, ty=(py/S)|0; if(!c.hazard[ty*W+tx]||c.g[ty*W+tx])continue;
    var col=colorFn(px/S,py/S), i=(py*W*S+px)*4; d[i]=col[0]; d[i+1]=col[1]; d[i+2]=col[2]; d[i+3]=255;
  }
  lx.putImageData(img,0,0);
  ctx.save(); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high'; ctx.drawImage(lo,0,0,W*LT,H*LT); ctx.restore();
}
function cavernMarkers(m,ctx,sp,far,P,opts){
  var sx=sp.x*LT, sy=(sp.y+1)*LT-6;
  var Zs=_scn(); if(!(Zs&&Zs.decal(m,'dg_stairs_up',sx+LT/2,sy-10,{w:LT+14})))for(var i=0;i<4;i++){ ctx.fillStyle=shade(P.rockTop,0.1-i*0.08); ctx.fillRect(sx-4,sy-i*5,LT+8,5); }
  if(far&&opts&&opts.game&&!opts.last){
    // stairs leading down: dark steps receding into the floor
    var fx0=far.x*LT, fy0=far.y*LT;
    if(!(Zs&&Zs.decal(m,'dg_stairs_down',fx0+LT/2,fy0+LT/2,{w:LT+14}))){ for(var s=0;s<5;s++){ ctx.fillStyle=shade(P.floorA,-0.15-s*0.13); ctx.fillRect(fx0-4+s*2,fy0+2+s*5.5,LT+8-s*4,5.5); }
    ctx.fillStyle='rgba(255,220,150,.8)'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center'; ctx.fillText('▼',fx0+LT/2,fy0-2); }
    addLight(m,fx0+LT/2,fy0+LT/2,70,'#ffd9a0',0.3,{pulse:0.3,depth:-4});
    return;
  }
  if(far&&opts&&opts.game)return; // the game draws its own exit portal on the last floor
  if(far){
    var fx=far.x*LT+LT/2, fy=far.y*LT+LT/2;
    ctx.fillStyle='rgba(60,0,20,.8)'; ctx.beginPath(); ctx.arc(fx,fy,14,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#b0284a'; ctx.lineWidth=3; ctx.stroke();
    addLight(m,fx,fy,90,'#ff3a6a',0.45,{pulse:0.4,period:1400});
  }
}
// Obstacle sprite helpers
function rockBlob(ctx,cx,cy,r,col,R){ softShadow(ctx,cx,cy+r*0.55,r*1.1,r*0.4,0.45); var g=ctx.createRadialGradient(cx-r*0.35,cy-r*0.45,r*0.1,cx,cy,r*1.1); g.addColorStop(0,shade(col,0.25)); g.addColorStop(1,shade(col,-0.35)); ctx.fillStyle=g; ctx.beginPath(); for(var i=0;i<9;i++){ var a=i/9*Math.PI*2, rr2=r*(0.82+R.f()*0.3); ctx.lineTo(cx+Math.cos(a)*rr2,cy+Math.sin(a)*rr2*0.8); } ctx.closePath(); ctx.fill(); }

// ═══════════════════════════════════════════════════════════════════════
var DNG_PAINTED={boulder:'dg_boulder',column:'dg_column',rubble:'dg_rubble',crystal:'dg_crystal',obsidian:'dg_obsidian',statue:'dg_statue',ruinwall:'dg_ruinwall',rock:'dg_rock',rib:'dg_rib',skull:'dg_skull',stone:'dg_stone',
  stalagmite:'dg_stalagmite',basalt:'dg_basalt',vent:'dg_vent',fcrystal:'dg_fcrystal',hoist:'dg_hoist',spire:'dg_obsidian',anvil:'vp_anvil',pillar:'ar_pillar',barricade:'ar_barricade',gear:'ar_gear',mirror:'ar_mirror',brazier:'cf_brazier'};
function _dngNoCtx(){ return _dngNoCtx.c||(_dngNoCtx.c=mkCanvas(4,4).getContext('2d')); }
var DUNGEON_DESIGNS=[
  { id:'boulder_field', name:'Boulder Field', seed:3, tagline:'Wide cavern strewn with rock clusters',
    blurb:'A huge open cavern floor broken up by boulder clusters of every size. Easy to read and good for big fights: you kite monsters around the rocks.',
    fill:0.37, iters:5, density:40,
    pal:{floorA:'#4a3f36',floorB:'#5d5046',floorC:'#2e2620',rockTop:'#6d6258',rockFace:'#4a4038',void:'#0a0806'},
    obstacles:function(c){ for(var i=0;i<70;i++){ var p=c.randomOpen(); if(!p)continue; var big=c.R.chance(0.35); c.place('boulder',p.x,p.y,big?2:1,big?2:1); } },
    draw:{ boulder:function(m,ctx,x,y,w,h,R,o,P){ addSprite(m,x+w/2,y+h,w+16,h+30,function(c,cw,ch){ rockBlob(c,cw/2,ch-h/2-4,w/2+2,'#7a6e62',R); if(w>LT)rockBlob(c,cw/2+10,ch-h/2+4,w/4,'#6a5e52',R); }); } },
    extra:function(c){ var W=c.W,H=c.H,m=c.m; for(var i=0;i<14;i++){ var p=c.randomOpen(); if(p)addLight(m,p.x*LT+16,p.y*LT+16,110,'#ffb060',0.45,{flicker:0.4,depth:-4}); } },
    particles:[{col:'#c8b090',freq:160,scale:{start:0.25,end:0},alpha:{start:0.5,end:0},vy:{min:-4,max:4}}] },

  { id:'pillared_hall', name:'Pillared Hall', seed:5, tagline:'Grid of ancient columns, some fallen',
    blurb:'A vast underground hall held up by rows of stone columns. Some have collapsed into rubble, opening lanes and cover. Braziers burn along the aisles.',
    density:38,
    layout:function(W,H,R){ var g=new Uint8Array(W*H).fill(1); for(var y=3;y<H-3;y++)for(var x=3;x<W-3;x++){ var edge=(x<5||x>W-6||y<5||y>H-6)&&R.chance(0.35); g[y*W+x]=edge?1:0; } return g; },
    pal:{floorA:'#3c4458',floorB:'#4a5268',floorC:'#262c3a',rockTop:'#667088',rockFace:'#454c62',void:'#07080d'},
    floorDeco:function(ctx,px,py,tx,ty){ ctx.strokeStyle='rgba(0,0,0,.25)'; ctx.lineWidth=1; ctx.strokeRect(px+0.5,py+0.5,LT-1,LT-1); },
    obstacles:function(c){ for(var y=6;y<c.H-6;y+=4)for(var x=6;x<c.W-6;x+=5){ if(c.R.chance(0.2))c.place('rubble',x,y,2,1); else c.place('column',x,y,1,1); } },
    draw:{ column:function(m,ctx,x,y,w,h,R,o,P){ addSprite(m,x+w/2,y+h,40,110,function(c,cw,ch){ softShadow(c,cw/2,ch-4,15,5,0.45); var g=c.createLinearGradient(cw/2-11,0,cw/2+11,0); g.addColorStop(0,'#4a5268'); g.addColorStop(0.45,'#8a94ac'); g.addColorStop(1,'#3a4056'); c.fillStyle=g; c.fillRect(cw/2-11,ch-96,22,90); c.fillStyle='#7a849c'; c.fillRect(cw/2-14,ch-100,28,7); c.fillRect(cw/2-14,ch-10,28,6); }); addLight(m,x+w/2,y-8,70,'#ffa050',0.28,{flicker:0.3,depth:-4}); },
      rubble:function(m,ctx,x,y,w,h,R){ for(var i=0;i<4;i++)rockBlob(ctx,x+6+R.f()*(w-12),y+10+R.f()*10,7+R.f()*6,'#6a7288',R); } },
    particles:[{col:'#ffb070',freq:220,scale:{start:0.3,end:0},alpha:{start:0.7,end:0},vy:{min:-18,max:-6}}] },

  { id:'crystal_grotto', name:'Crystal Grotto', seed:7, tagline:'Glowing crystal clusters as cover',
    blurb:'Cyan and violet crystal clusters grow out of the floor and light the cave from within. The glow makes this the brightest open dungeon, and the clusters make natural cover.',
    fill:0.4, iters:5, density:42, dark:0.72,
    pal:{floorA:'#252a45',floorB:'#2f3658',floorC:'#141830',rockTop:'#454c78',rockFace:'#2c3158',void:'#05060f'},
    obstacles:function(c){ for(var i=0;i<46;i++){ var p=c.randomOpen(); if(p)c.place('crystal',p.x,p.y,1,1,{col:c.R.pick(['#6fe8ff','#b58cff','#8fb0ff'])}); } },
    draw:{ crystal:function(m,ctx,x,y,w,h,R,o){ addSprite(m,x+w/2,y+h,50,80,function(c,cw,ch){ softShadow(c,cw/2,ch-4,14,4,0.4); for(var i=0;i<4;i++){ var ox=(i-1.5)*7, hh=26+R.f()*30; var g=c.createLinearGradient(cw/2+ox-5,0,cw/2+ox+5,0); g.addColorStop(0,rgba(o.col,0.95)); g.addColorStop(0.5,'rgba(255,255,255,.95)'); g.addColorStop(1,rgba(shade(o.col,-0.3),0.95)); c.fillStyle=g; c.beginPath(); c.moveTo(cw/2+ox,ch-4-hh); c.lineTo(cw/2+ox+6,ch-10); c.lineTo(cw/2+ox,ch-3); c.lineTo(cw/2+ox-6,ch-10); c.closePath(); c.fill(); } }); addLight(m,x+w/2,y,100,o.col,0.55,{pulse:0.35,period:1600+R.i(0,900),depth:-4}); } },
    particles:[{col:'#9fe8ff',freq:90,scale:{start:0.4,end:0},alpha:{start:0.9,end:0},vy:{min:-10,max:-2}}] },

  { id:'mushroom_forest', name:'Mushroom Forest', seed:9, tagline:'Giant glowing fungi and spore light',
    blurb:'Giant mushrooms tower over a soft mossy floor. Their caps glow teal and violet, and spores drift everywhere. Walk between the stalks while monsters lurk under the caps.',
    fill:0.39, iters:5, density:44, dark:0.78,
    pal:{floorA:'#233224',floorB:'#2f4430',floorC:'#162016',rockTop:'#3e4a3a',rockFace:'#283224',void:'#050805'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if(R.chance(0.2)){ ctx.fillStyle='rgba(120,255,200,.25)'; ctx.fillRect(px+R.f()*28,py+R.f()*28,2,2);} },
    obstacles:function(c){ for(var i=0;i<42;i++){ var p=c.randomOpen(); if(p){ var big=c.R.chance(0.3); c.place('shroom',p.x,p.y,big?2:1,1,{col:c.R.pick(['#4fe0c0','#b07fff','#ff8fd0']),big:big}); } } },
    draw:{ shroom:function(m,ctx,x,y,w,h,R,o){ var s=o.big?1.7:1; addSprite(m,x+w/2,y+h,90*s,110*s,function(c,cw,ch){ softShadow(c,cw/2,ch-4,16*s,5*s,0.4); c.fillStyle='#e8e0cc'; c.beginPath(); c.moveTo(cw/2-6*s,ch-4); c.quadraticCurveTo(cw/2-2*s,ch-40*s,cw/2-5*s,ch-60*s); c.lineTo(cw/2+5*s,ch-60*s); c.quadraticCurveTo(cw/2+2*s,ch-40*s,cw/2+6*s,ch-4); c.fill(); var g=c.createRadialGradient(cw/2,ch-68*s,2,cw/2,ch-62*s,34*s); g.addColorStop(0,shade(o.col,0.4)); g.addColorStop(1,shade(o.col,-0.35)); c.fillStyle=g; c.beginPath(); c.ellipse(cw/2,ch-62*s,34*s,16*s,0,Math.PI,0); c.quadraticCurveTo(cw/2,ch-50*s,cw/2-34*s,ch-62*s); c.fill(); c.fillStyle='rgba(255,255,255,.6)'; for(var i=0;i<6;i++){ c.beginPath(); c.arc(cw/2-24*s+i*9*s,ch-68*s+Math.sin(i)*4,2*s,0,Math.PI*2); c.fill(); } }); addLight(m,x+w/2,y-30*s,90*s,o.col,0.45,{pulse:0.3,period:2200+R.i(0,1200),depth:-4}); } },
    particles:[{tints:['#7fffd0','#c8a0ff'],freq:50,scale:{start:0.35,end:0},alpha:{start:0.8,end:0},vx:{min:-6,max:6},vy:{min:-6,max:2},life:{min:4000,max:8000}}] },

  { id:'lava_archipelago', name:'Lava Archipelago', seed:13, tagline:'Rock islands linked by bridges over lava',
    blurb:'Islands of cooled rock float in a sea of lava, joined by narrow stone bridges. The lava lights everything orange; fights happen on the islands and the bridges are choke points.',
    density:40, dark:0.6,
    layout:function(W,H,R){ var g=new Uint8Array(W*H).fill(1); for(var y=2;y<H-2;y++)for(var x=2;x<W-2;x++)g[y*W+x]=0; return g; },
    hazards:function(c){ var W=c.W,H=c.H,R=c.R,hz=c.hazard; hz.fill(1); for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(c.g[y*W+x])hz[y*W+x]=0;
      var isl=[]; for(var i=0;i<11;i++){ isl.push({x:R.i(7,W-8),y:R.i(6,H-7),r:R.i(3,6)}); } isl.push({x:W>>1,y:H-6,r:5});
      isl.forEach(function(s){ for(var y=s.y-s.r-1;y<=s.y+s.r+1;y++)for(var x=s.x-s.r-1;x<=s.x+s.r+1;x++){ if(x<2||y<2||x>=W-2||y>=H-2)continue; if(Math.hypot((x-s.x)*1.0,(y-s.y)*1.2)<=s.r+R.f()*0.8)hz[y*W+x]=0; } });
      // bridges: connect each island to its nearest predecessor
      for(var a=1;a<isl.length;a++){ var b=0,bd=1e9; for(var j=0;j<a;j++){ var d=Math.hypot(isl[a].x-isl[j].x,isl[a].y-isl[j].y); if(d<bd){bd=d;b=j;} } var x0=isl[a].x,y0=isl[a].y,x1=isl[b].x,y1=isl[b].y; while(x0!==x1){ hz[y0*W+x0]=0; hz[(y0+1)*W+x0]=0; x0+=x0<x1?1:-1; } while(y0!==y1){ hz[y0*W+x0]=0; hz[y0*W+x0+1]=0; y0+=y0<y1?1:-1; } }
    },
    paintHazards:function(ctx,c,nz){ var A=hexToRgb('#ff5a10'),B=hexToRgb('#ffc848'),C=hexToRgb('#7a1200'); paintHazardField(ctx,c,function(x,y){ var n=nz(x*0.35,y*0.35), n2=nz(x*1.3+9,y*1.3+9); var t=Math.min(1,Math.max(0,n*1.3-0.15)); var col=[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t]; if(n2<0.28){ var k=(0.28-n2)*3; col=[col[0]+(C[0]-col[0])*k,col[1]+(C[1]-col[1])*k,col[2]+(C[2]-col[2])*k]; } return col; }); },
    pal:{floorA:'#3a2e2a',floorB:'#4a3a32',floorC:'#1e1612',rockTop:'#4a3a34',rockFace:'#2e221e',void:'#1a0600',darkCol:'#1a0500'},
    obstacles:function(c){ for(var i=0;i<22;i++){ var p=c.randomOpen(); if(p)c.place('obsidian',p.x,p.y,1,1); } },
    draw:{ obsidian:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,40,60,function(c,cw,ch){ softShadow(c,cw/2,ch-4,12,4,0.4); c.fillStyle='#161018'; c.beginPath(); c.moveTo(cw/2-10,ch-4); c.lineTo(cw/2-4,ch-40); c.lineTo(cw/2+3,ch-30); c.lineTo(cw/2+10,ch-4); c.fill(); c.strokeStyle='rgba(255,120,60,.6)'; c.beginPath(); c.moveTo(cw/2-4,ch-38); c.lineTo(cw/2-2,ch-10); c.stroke(); }); } },
    extra:function(c){ var m=c.m; for(var i=0;i<30;i++){ var x=c.R.i(2,c.W-3),y=c.R.i(2,c.H-3); if(c.hazard[y*c.W+x])addLight(m,x*LT+16,y*LT+16,150,'#ff6a20',0.35,{pulse:0.25,period:2000+i*90,depth:-4,cut:0.8}); } },
    particles:[{tints:['#ffb040','#ff6020'],freq:40,scale:{start:0.5,end:0},alpha:{start:1,end:0},vy:{min:-40,max:-15},vx:{min:-8,max:8},life:{min:1500,max:3000}}] },

  { id:'sunken_courtyard', name:'Sunken Courtyard', seed:17, tagline:'Ruined temple walls and statues',
    blurb:'An ancient temple courtyard swallowed by the earth: broken wall segments, toppled statues and puddles of rainwater under a mossy ceiling. The walls make a loose maze with lots of open ground.',
    fill:0.34, iters:5, density:40,
    pal:{floorA:'#4a4a3a',floorB:'#5a5a46',floorC:'#2a2a1e',rockTop:'#5f5f4c',rockFace:'#3e3e30',void:'#070705'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if((tx+ty)%2===0){ ctx.strokeStyle='rgba(0,0,0,.18)'; ctx.strokeRect(px+1,py+1,LT-2,LT-2);} if(R.chance(0.12)){ ctx.fillStyle='rgba(110,150,70,.4)'; ctx.fillRect(px+R.f()*20,py+R.f()*20,10,6);} },
    obstacles:function(c){ for(var i=0;i<24;i++){ var p=c.randomOpen(); if(!p)continue; var horiz=c.R.chance(0.5), len=c.R.i(3,6); var ok=c.place('ruinwall',p.x,p.y,horiz?len:1,horiz?1:len); } for(var j=0;j<16;j++){ var q=c.randomOpen(); if(q)c.place('statue',q.x,q.y,1,1); } for(var k=0;k<10;k++){ var r=c.randomOpen(); if(r)c.place('puddle',r.x,r.y,2,1,{skipReach:false}); } },
    draw:{ ruinwall:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,w+6,h+36,function(c,cw,ch){ var top=ch-h-30; c.fillStyle='#5a5a48'; c.fillRect(3,top+10,w,h+20); c.fillStyle='#7a7a62'; c.fillRect(3,top,w,h+10-0); for(var i=0;i<w;i+=LT/2){ c.fillStyle='rgba(0,0,0,.2)'; c.fillRect(3+i,top,1,h+30);} for(var j=0;j<5;j++){ c.fillStyle='rgba(100,150,70,.55)'; c.fillRect(3+R.f()*(w-8),top+R.f()*10,8,4);} c.clearRect(3+R.f()*w,top-2,10,8); }); },
      statue:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,40,70,function(c,cw,ch){ softShadow(c,cw/2,ch-4,12,4,0.4); c.fillStyle='#8a8a74'; c.fillRect(cw/2-10,ch-12,20,9); c.fillStyle='#9a9a82'; c.beginPath(); c.moveTo(cw/2-7,ch-12); c.lineTo(cw/2-5,ch-42); c.lineTo(cw/2+5,ch-42); c.lineTo(cw/2+7,ch-12); c.fill(); c.beginPath(); c.arc(cw/2,ch-47,6,0,Math.PI*2); c.fill(); c.fillStyle='rgba(100,150,70,.6)'; c.fillRect(cw/2-6,ch-30,5,8); }); },
      puddle:function(m,ctx,x,y,w,h,R){ ctx.fillStyle='rgba(90,140,170,.55)'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2,w/2-2,h/2-4,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.25)'; ctx.fillRect(x+w/2-8,y+h/2-2,10,1); addLight(m,x+w/2,y+h/2,50,'#a8d8ff',0.18,{pulse:0.5,depth:-4,noCut:true}); } },
    extra:function(c){ for(var i=0;i<10;i++){ var p=c.randomOpen(); if(p)addLight(c.m,p.x*LT+16,p.y*LT,95,'#ffbf70',0.4,{flicker:0.35,depth:-4}); } },
    particles:[{col:'#d8e0a0',freq:200,scale:{start:0.3,end:0},alpha:{start:0.5,end:0}}] },

  { id:'lake_ring', name:'Underground Lake Ring', seed:19, tagline:'Walkable shore around a dark lake',
    blurb:'A still black lake fills the middle of the cavern, and the fight happens on the wide shore that rings it, with a few rocky islets you can reach by stepping stones. Fireflies drift over the water.',
    density:40, shape:'round', fill:0.36, iters:5,
    hazards:function(c){ var W=c.W,H=c.H,R=c.R; var cx=W/2,cy=H/2-1; for(var y=0;y<H;y++)for(var x=0;x<W;x++){ var d=Math.hypot((x-cx)/(W*0.27),(y-cy)/(H*0.26)); if(d<1+(R.f()-0.5)*0.12&&!c.g[y*W+x])c.hazard[y*W+x]=1; }
      for(var s=0;s<5;s++){ var ang=s/5*Math.PI*2+0.3; var sx=Math.round(cx+Math.cos(ang)*W*0.2), sy=Math.round(cy+Math.sin(ang)*H*0.18); for(var yy=sy-1;yy<=sy+1;yy++)for(var xx=sx-1;xx<=sx+1;xx++)c.hazard[yy*W+xx]=0; } },
    paintHazards:function(ctx,c,nz){ var A=hexToRgb('#04101a'),B=hexToRgb('#123447'); paintHazardField(ctx,c,function(x,y){ var n=nz(x*0.3,y*0.3), sh=nz(x*2.5,y*0.6)>0.78?40:0; return [A[0]+(B[0]-A[0])*n+sh*0.6,A[1]+(B[1]-A[1])*n+sh,A[2]+(B[2]-A[2])*n+sh*1.2]; }); },
    pal:{floorA:'#3a3e3a',floorB:'#4a5048',floorC:'#1e221e',rockTop:'#555c52',rockFace:'#363c34',void:'#040606'},
    obstacles:function(c){ for(var i=0;i<30;i++){ var p=c.randomOpen(); if(p)c.place('rock',p.x,p.y,1,1); } },
    draw:{ rock:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,44,44,function(c,cw,ch){ rockBlob(c,cw/2,ch-18,14,'#6a7268',R); }); } },
    extra:function(c){ var m=c.m; m.particles.push({tints:['#e8ff80','#a8ff80'],freq:120,scale:{start:0.5,end:0.1},alpha:{start:1,end:0},vx:{min:-10,max:10},vy:{min:-10,max:10},life:{min:2500,max:5000},area:{x:c.W*LT*0.25,y:c.H*LT*0.25,w:c.W*LT*0.5,h:c.H*LT*0.5}}); addLight(m,c.W*LT/2,c.H*LT/2-LT,300,'#3a7aa8',0.3,{pulse:0.3,period:4000,depth:-4,noCut:true}); for(var i=0;i<10;i++){ var p=c.randomOpen(); if(p)addLight(m,p.x*LT+16,p.y*LT,90,'#ffc070',0.4,{flicker:0.35,depth:-4}); } } },

  { id:'bone_pit', name:'Bone Pit', seed:23, tagline:'Giant rib cages and skulls as obstacles',
    blurb:'The graveyard of something enormous. Giant rib cages arch over the floor like fences and skulls the size of houses block the way. Pale ghost-lights drift between the bones.',
    fill:0.38, iters:5, density:40, dark:0.82,
    pal:{floorA:'#3a3630',floorB:'#4a443a',floorC:'#221e1a',rockTop:'#5a544a',rockFace:'#3a3630',void:'#060504'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if(R.chance(0.1)){ ctx.fillStyle='rgba(230,220,190,.35)'; ctx.fillRect(px+R.f()*26,py+R.f()*26,6,2);} },
    obstacles:function(c){ for(var i=0;i<16;i++){ var p=c.randomOpen(); if(!p)continue; for(var r=0;r<5;r++)c.place('rib',p.x+r*2,p.y,1,1); } for(var j=0;j<6;j++){ var q=c.randomOpen(); if(q)c.place('skull',q.x,q.y,2,2); } },
    draw:{ rib:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,50,90,function(c,cw,ch){ c.strokeStyle='#e8e0cc'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.moveTo(cw/2-2,ch-4); c.quadraticCurveTo(cw/2-18,ch-50,cw/2+6,ch-80); c.stroke(); c.strokeStyle='rgba(0,0,0,.2)'; c.lineWidth=2; c.stroke(); }); },
      skull:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,90,80,function(c,cw,ch){ softShadow(c,cw/2,ch-6,34,8,0.45); c.fillStyle='#e6dcc4'; c.beginPath(); c.ellipse(cw/2,ch-34,32,26,0,0,Math.PI*2); c.fill(); c.fillRect(cw/2-20,ch-18,40,14); c.fillStyle='#1a1410'; c.beginPath(); c.ellipse(cw/2-12,ch-36,8,9,0,0,Math.PI*2); c.ellipse(cw/2+12,ch-36,8,9,0,0,Math.PI*2); c.fill(); for(var i=-3;i<=3;i++)c.fillRect(cw/2+i*5-1,ch-16,2,8); }); addLight(m,x+w/2-12,y+h-36,30,'#7fffd0',0.5,{pulse:0.5,depth:y+h+1}); } },
    extra:function(c){ var m=c.m; m.particles.push({col:'#9fffe0',freq:300,scale:{start:0.9,end:0.2},alpha:{start:0.5,end:0},vx:{min:-8,max:8},vy:{min:-8,max:2},life:{min:4000,max:7000}}); for(var i=0;i<12;i++){ var p=c.randomOpen(); if(p)addLight(m,p.x*LT+16,p.y*LT+16,80,'#8fffd8',0.3,{pulse:0.5,period:2600,depth:-4}); } } },

  { id:'root_hollow', name:'Root Hollow', seed:29, tagline:'Tangled roots make soft lanes',
    blurb:'The underside of an ancient tree. Thick roots snake across the floor in long curves and split the cave into winding lanes; amber sap glows in the bark and roots hang from above.',
    fill:0.36, iters:5, density:42, dark:0.8,
    pal:{floorA:'#3a2e22',floorB:'#4a3a2a',floorC:'#201810',rockTop:'#4e3e2c',rockFace:'#32281c',void:'#070504'},
    obstacles:function(c){ var W=c.W,H=c.H,R=c.R; for(var i=0;i<14;i++){ var x=R.i(4,W-5),y=R.i(4,H-5),a=R.f()*Math.PI*2,len=R.i(8,16); for(var s=0;s<len;s++){ a+=R.f()*0.6-0.3; x+=Math.round(Math.cos(a)); y+=Math.round(Math.sin(a)); c.place('root',x,y,1,1,{a:a}); } } },
    draw:{ root:function(m,ctx,x,y,w,h,R,o){ ctx.save(); ctx.translate(x+w/2,y+h/2); ctx.rotate(o.a); softShadow(ctx,0,8,20,6,0.35); var g=ctx.createLinearGradient(0,-10,0,10); g.addColorStop(0,'#8a6a44'); g.addColorStop(1,'#4a3420'); ctx.fillStyle=g; rr(ctx,-20,-11,40,22,11); ctx.fill(); ctx.strokeStyle='rgba(30,20,10,.6)'; ctx.lineWidth=1; for(var i=-15;i<15;i+=6){ ctx.beginPath(); ctx.moveTo(i,-9); ctx.lineTo(i+4,9); ctx.stroke(); } if(R.chance(0.15)){ ctx.fillStyle='#ffb040'; ctx.fillRect(-3,-3,6,3); } ctx.restore(); if(R.chance(0.08))addLight(m,x+w/2,y+h/2,50,'#ffb040',0.35,{pulse:0.5,depth:-4}); } },
    extra:function(c){ var m=c.m; for(var i=0;i<18;i++){ var p=c.randomOpen(); if(!p)continue; addSprite(m,p.x*LT+16,p.y*LT+10,20,70,function(cc,cw,ch){ cc.strokeStyle='#5a4028'; cc.lineWidth=3; cc.beginPath(); cc.moveTo(cw/2,0); cc.quadraticCurveTo(cw/2+6,ch/2,cw/2-2,ch-6); cc.stroke(); }); m.sprites[m.sprites.length-1].depth=8000; } m.particles.push({col:'#ffc060',freq:260,scale:{start:0.3,end:0},alpha:{start:0.7,end:0},vy:{min:4,max:12}}); } },

  { id:'spiral_chasm', name:'Spiral Chasm', seed:31, tagline:'Open floor spiralling around a pit',
    blurb:'A round chamber around a bottomless pit. The walkable floor spirals inward in a wide ramp to a central platform, where the guardian would stand. Wind howls up from below.',
    density:40, shape:'round', fill:0.3, iters:4, dark:0.78,
    hazards:function(c){ var W=c.W,H=c.H,cx=W/2,cy=H/2; for(var y=0;y<H;y++)for(var x=0;x<W;x++){ if(c.g[y*W+x])continue; var dx=x-cx,dy=(y-cy)*1.25, r=Math.hypot(dx,dy), a=Math.atan2(dy,dx); if(r<3.2||r>17)continue; var t=(a+Math.PI)/(Math.PI*2); var band=(r/4.2+t)%1; if(band<0.42)c.hazard[y*W+x]=1; } },
    paintHazards:function(ctx,c,nz){ var W=c.W,H=c.H; paintHazardField(ctx,c,function(x,y){ var n=nz(x*0.5,y*0.5); return [4+n*14,3+n*10,10+n*22]; }); for(var y2=0;y2<H;y2++)for(var x2=0;x2<W;x2++){ if(c.hazard[y2*W+x2]||c.g[y2*W+x2])continue; if(y2+1<H&&c.hazard[(y2+1)*W+x2]){ var fg=ctx.createLinearGradient(0,y2*LT+LT-10,0,y2*LT+LT+16); fg.addColorStop(0,'#3a3448'); fg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=fg; ctx.fillRect(x2*LT,y2*LT+LT-10,LT,26);} } },
    pal:{floorA:'#35303e',floorB:'#433c4e',floorC:'#1c1824',rockTop:'#514a5e',rockFace:'#332e3e',void:'#040308'},
    obstacles:function(c){ for(var i=0;i<12;i++){ var p=c.randomOpen(); if(p)c.place('stone',p.x,p.y,1,1); } },
    draw:{ stone:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,40,60,function(c,cw,ch){ softShadow(c,cw/2,ch-4,11,4,0.4); c.fillStyle='#6a6278'; c.fillRect(cw/2-7,ch-46,14,42); c.fillStyle='#8a80a0'; c.fillRect(cw/2-7,ch-46,14,4); c.fillStyle='#9ff0ff'; c.fillRect(cw/2-2,ch-36,4,10); }); addLight(m,x+w/2,y-20,60,'#9ff0ff',0.35,{pulse:0.5,depth:-4}); } },
    extra:function(c){ c.m.particles.push({col:'#c8c0ff',freq:80,scale:{start:0.3,end:0},alpha:{start:0.6,end:0},vy:{min:-50,max:-20},vx:{min:-10,max:10},life:{min:1500,max:3000},area:{x:c.W*LT*0.3,y:c.H*LT*0.3,w:c.W*LT*0.4,h:c.H*LT*0.4}}); addLight(c.m,c.W*LT/2,c.H*LT/2,120,'#b0a0ff',0.35,{pulse:0.3,depth:-4}); } },
];

