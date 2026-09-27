// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD PAINT (Phase 3 · step 2) — the in-game world drawn with the
// ║ Design Lab engine (07f-world-engine.js + the 40 designs in 07g–07j):
// ║   • every tile carries a Lab terrain "kind" (wd.kind, index into WK_REG)
// ║   • chunks of 32×32 tiles are painted like a Lab sample: a crisp,
// ║     noise-warped field (organic edges, no tile grid), soft blends,
// ║     rims (foam, kerbs, wet bands), built-surface patterns, 3/4 walls,
// ║     per-tile decoration, flowing lava, ley lines
// ║   • props (trees, stones, crystals, ruins…) are depth-sorted sprites
// ║ Painting is split into small steps so chunks stream in without hitches.
// ═══════════════════════════════════════════════════════════════════════
var WCH=32;                 // tiles per render chunk (1024 px)
var WP_S=12;                // field samples per tile (Lab: 16 → 2 px; here ~2.7 px, smoothed)

// ── Kind registry: shared world kinds + every design's kinds ───────────
var WK_REG={list:[],ready:false};
function _wkReg(k){ if(k._gi!==undefined)return k._gi; k._gi=WK_REG.list.length; k._a=k._a||hexToRgb(k.a); k._b=k._b||hexToRgb(k.b||k.a); if(k.rim)k._rim=hexToRgb(k.rim); if(k.shore)k._shore=hexToRgb(k.shore);
  if(k.wall){ k._top=hexToRgb(shade(k.wall.top,0.04)); k._top2=hexToRgb(shade(k.wall.top,-0.16)); k._face=hexToRgb(k.wall.face||k.wall.top); k._face2=hexToRgb(shade(k.wall.face||k.wall.top,-0.42)); } WK_REG.list.push(k); return k._gi; }
var WSK=null;               // shared kinds
function _wkInit(){
  if(WK_REG.ready)return; WK_REG.ready=true;
  var rip=WDECO.ripple('#ffffff');
  var screeDeco=function(ctx,px,py,R){ for(var i=0;i<4;i++){ if(!R.chance(0.7))continue; var x=px+R.f()*28+2, y=py+R.f()*26+4, r=2+R.f()*4; ctx.fillStyle='rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x+1,y+r*0.6,r,r*0.45,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle=R.pick(['#8a8276','#9a9286','#6e685e','#a8a092']); ctx.beginPath(); ctx.ellipse(x,y,r,r*0.75,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(x-r*0.5,y-r*0.6,r*0.8,1.5); } };
  WSK={
    sea:WK('sea','#0f3764','#16487c',{solid:true,liquid:true,shore:'#d8eef4',sc:0.04,deco:rip}),
    reef:WK('reef','#28779e','#3a8fb2',{solid:true,liquid:true,shore:'#eef8f6',sc:0.08,deco:rip}),
    sand:WK('sand','#d4c28c','#e4d4a2',{sc:0.25,deco:WDECO.dots(['#c2b07a','#f0e4b8'],0.35)}),
    ashsand:WK('sand','#4a4240','#5c5452',{sc:0.25,deco:WDECO.dots(['#3a3230','#6a6260'],0.35)}),
    lake:WK('water','#1d5878','#2a6f92',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.06,deco:rip}),
    wshallow:W_SHALLOW('#3a6c66','#4a7e76'),
    wdeep:W_DEEP('#15454a','#1f5a5e'),
    lava:A_LAVA(),
    crust:WK('lavacrust','#2c211e','#3c2a24',{sc:0.2,deco:WDECO.glowCracks('#ff6a20',0.42)}),
    scree:WK('scree','#7c7468','#8c8478',{sc:0.3,deco:screeDeco}),
    cliff:WK('cliff','#6a6056','#7a7064',{solid:true,wall:{top:'#9a8e7e',face:'#6a5e50',strata:true}}),
    ridge:WK('ridge','#3a302c','#4a403c',{solid:true,wall:{top:'#4e4440',face:'#2a2220',strata:true,runes:0.02}}),
    mtn:{1:H_ROCK('#9a9a8a','#6e6c62'),2:H_ROCK('#6e7a6a','#4a564a'),3:H_ROCK('#a09482','#6e6252'),4:H_ROCK('#4e4644','#2e2826')},
    road:{0:WK('road','#b0a892','#c4bca6',{pattern:'flag',grout:'#5a5242',rim:'#6e6656',rimW:1,flat:true}),
          1:WK('road','#a09a8a','#b8b2a0',{pattern:'flag',grout:'#4a443a',rim:'#6a6458',rimW:1,flat:true,moss:true}),
          2:WK('road','#8e8672','#a29a84',{pattern:'cobble',grout:'#3a3428',flat:true}),
          3:WK('road','#9a9486','#b0aa9a',{pattern:'flag',grout:'#4a463e',rim:'#6a665c',rimW:1,flat:true}),
          4:WK('road','#5a504a','#6e645c',{pattern:'flag',soot:true,grout:'#1e1612',flat:true})},
    trail:{0:WK('trail','#a08c68','#b09c78',{sc:0.3}),1:WK('trail','#9a8660','#aa9670',{sc:0.3,deco:WDECO.dots(['#8a7650','#b8a888'],0.3)}),2:WK('trail','#6e5e40','#7e6e4c',{sc:0.3}),3:WK('trail','#a09078','#b0a088',{sc:0.3}),4:WK('trail','#4e4440','#5e5450',{sc:0.3})},
    bridge:WK('bridge','#8a6a44','#9a7a50',{pattern:'planks',flat:true}),
    bridgev:WK('bridgev','#8a6a44','#9a7a50',{pattern:'planks',vert:true,flat:true}),
    iron:WK('ironbridge','#5e5e66','#74747e',{pattern:'brick',grout:'#26262c',flat:true}),
    lift:WK('lift','#a89c86','#b8ac96',{pattern:'slab',flat:true}),
    pass:WK('pass','#6a5e56','#7a6e64',{pattern:'flag',grout:'#2a2220',flat:true}),
    plaza:WK('plaza','#b4ac98','#c6beaa',{pattern:'slab',flat:true}),
    vgrass:WK('grass','#6a9a48','#84b05a',{sc:0.12,deco:WDECO.grass('rgba(50,90,35,.5)',0.35)}),
    vpave:WK('vpave','#b8aa8c','#ccbea0',{pattern:'cobble',grout:'#6a5c44',flat:true}),
    wall:WK('bwall','#8a7a64','#9a8a74',{solid:true,wall:{top:'#a08c70',face:'#6a5a46'}})
  };
  Object.keys(WSK).forEach(function(n){ var v=WSK[n]; if(v&&v.id)_wkReg(v); else for(var r in v)_wkReg(v[r]); });
  [WSK.bridge,WSK.bridgev,WSK.iron,WSK.lift,WSK.pass].forEach(function(k){ k.roadish=true; }); for(var r0 in WSK.road){ WSK.road[r0].roadish=true; WSK.trail[r0].roadish=true; }
  WORLD_DESIGNS.forEach(function(Z){ _wkReg(Z.ground); (Z.kinds||[]).forEach(_wkReg); });
}

// ── Zone skins: how each zone's design dresses the world ───────────────
// g: ambient ground kind (id in the design, or a kind object) when the Lab
// ground is water/lava; k: extra noise kinds [id, scale, threshold, which];
// p(c): extra props for zones whose Lab character comes from fixed layouts.
var WZ_SKIN={
  windmill_hills:{k:[['crop',0.07,0.68,1]],p:function(c){ c.scatter('windmill',1,{w:2,h:2,rune:'#ffd27a'}); }},
  giant_bones:{k:[['moss',0.08,0.62,1]],p:function(c){ c.scatter('rib',3,{moss:true,s:1.2}); c.scatter('rock',3,{col:'#ddd2b8',moss:'#6a9a50'}); }},
  standing_stones:{p:function(c){ c.scatter('stone',3,{rune:'#7fe8ff',tall:50}); }},
  blossom_terraces:{p:function(c){ c.scatter('tree',50,{kind:'blossom',col:'#e889b0',col2:'#ffc6de',trunk:'#5b3a2a',s:0.8}); c.scatter('lantern',2,{col:'#ffc0e0'}); }},
  amphitheatre:{p:function(c){ c.scatter('column',4,{broken:true,moss:true,col:'#cfc6b2'}); c.scatter('block',3,{rune:'#8fe8ff'}); }},
  waystone_road:{p:function(c){ c.scatter('stone',2,{rune:'#6fe3f5',tall:46,col:'#9a9690'}); }},
  firefly_river:{},
  lantern_lilies:{p:function(c){ c.scatter('lanternlily',10,{on:'deep',solid:false,any:true}); }},
  turtle_isles:{g:'sand',k:[['shell',0.07,0.7,1]]},
  stilt_walkways:{g:W_MUD},
  sunken_spires:{g:'isle',k:[['paving',0.1,0.72,1]]},
  wisp_cattails:{k:[['cattail',0.16,0.68,2]]},
  drowned_village:{},
  petrified_forest:{k:[['grass',0.08,0.64,1]]},
  glacier_peaks:{k:[['ice',0.1,0.72,1]]},
  starfall_crater:{k:[['bowl',0.09,0.7,1]]},
  giants_chessboard:{chess:true},
  burned_cathedral:{k:[['nave',0.09,0.72,1]]},
  chained_rocks:{g:'isle'},
  forge_ruins:{g:'rubble',k:[['street',0.08,0.6,1]]},
  basalt_forest:{}
};
var WZ_DESIGN={};          // zone id → design
var WZ_Z=null;             // per zone index: resolved skin
function _wzSkins(){
  if(WZ_Z)return WZ_Z; _wkInit();
  WORLD_DESIGNS.forEach(function(Z){ WZ_DESIGN[Z.id]=Z; });
  WZ_Z=WMAP_ZONES.map(function(z,zi){
    var Z=WZ_DESIGN[z.id], S=WZ_SKIN[z.id]||{}, K=[Z.ground].concat(Z.kinds||[]), byId={}; K.forEach(function(k){ if(!byId[k.id])byId[k.id]=k; });
    var pick=function(v){ return v&&v.id?v:(v?byId[v]:null); };
    var ground=pick(S.g)||Z.ground; if(ground.solid||ground.liquid)ground=K.find(function(k){return !k.solid&&!k.liquid&&!k.pattern;})||WSK.vgrass;
    // noise kinds: recorded from the design's own layout (ambient-safe), plus skin extras
    var noise=[], rec={W:60,H:60,R:rngOf(Z.seed*7919+Z.id.length*131),nz:vnoise(Z.seed*13+7),nz2:vnoise(Z.seed*29+3),m:newMap(60,60),t:new Uint8Array(3600),K:K,obst:[],ley:[],landmarks:[],occ:new Uint8Array(3600)};
    ['set','rect','line','blob','ring','raise','cutStairs','landmark','leyLine'].forEach(function(f){ rec[f]=function(){}; });
    rec.k=function(){return 0;}; rec.get=function(){return -1;}; rec.is=function(){return false;}; rec.solidAt=function(){return true;};
    rec.noise=function(id,scale,thr,only,which){ if(byId[id]&&!byId[id].liquid&&!byId[id].solid)noise.push([byId[id],scale,thr,which===1?1:2]); };
    try{ if(Z.layout)Z.layout(rec); }catch(e){}
    (S.k||[]).forEach(function(q){ if(byId[q[0]])noise.push([byId[q[0]],q[1],q[2],q[3]||1]); });
    var liquidK=K.filter(function(k){return k.liquid&&!k.lava;}), lavaK=K.find(function(k){return k.lava;});
    var deep=liquidK.find(function(k){return k.solid;}), shallow=liquidK.find(function(k){return !k.solid;});
    var rock=K.find(function(k){return k.wall&&!k.wall.noFace&&k.id==='rock';});
    var path=K.find(function(k){return k.id==='path'||k.id==='road';});
    if(path){ path=Object.assign({},path); delete path._gi; path.roadish=true; _wkReg(path); }   // trails in this zone: its own path look, drawn as smooth curves
    return {z:z,Z:Z,ground:ground,noise:noise,nz:rec.nz,nz2:rec.nz2,
      deep:deep||WSK.wdeep, shallow:shallow||WSK.wshallow, lava:lavaK||WSK.lava, rock:rock||WSK.mtn[z.r], path:path||null,
      hills:Z.hills||null, chess:!!S.chess, extra:S.p||null,
      chessK:S.chess?[byId.light,byId.darksq]:null};
  });
  return WZ_Z;
}

// ── Chunk painting ─────────────────────────────────────────────────────
var _WPN=null;   // global noise for the painter (warp, colour, variation, hills)
function _wpNoise(){ if(!_WPN)_WPN={w2:vnoise(WORLD_SEED+1306),w:vnoise(WORLD_SEED+1301),c:vnoise(WORLD_SEED+1302),v:vnoise(WORLD_SEED+1303),h:vnoise(WORLD_SEED+1304),h2:vnoise(WORLD_SEED+1305)}; return _WPN; }
function _wpHash(x,y,s){ var n=(x*374761393+y*668265263+(s||0)*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0); }

// Returns a job: call job.step(budgetMs) until it returns true; then job.out.
function wpChunkJob(wd,cx,cy){
  _wkInit(); var skins=_wzSkins(), N=_wpNoise(), KL=WK_REG.list, W=WORLD_W, H=WORLD_H, kind=wd.kind, zone=wd.zone;
  var MG=1, GW=WCH+2*MG, S=WP_S, SW=GW*S, tx0=cx*WCH-MG, ty0=cy*WCH-MG, ox=tx0*LT, oy=ty0*LT;
  var kAt=function(tx,ty){ if(tx<0||ty<0||tx>=W||ty>=H)return WSK.sea._gi; return kind[ty*W+tx]; };
  var kb=new Uint16Array(SW*SW), cv=mkCanvas(WCH*LT,WCH*LT), ctx=cv.getContext('2d'), pq=null, lo=mkCanvas(SW,SW), lx=lo.getContext('2d'), img=lx.createImageData(SW,SW), d=img.data;
  ctx.translate(-MG*LT,-MG*LT);   // draw in margin coordinates; the margin itself is clipped away
  var out={cx:cx,cy:cy,canvas:null,sprites:[],lights:[],lavaMask:null,ley:null}, phase=0, row=0;
  // smooth roads/trails: centre-line points near this chunk, bucketed in 2-tile cells
  var LG=Math.ceil(GW/2), lcell=null, LP=wd.lines;
  if(LP){ for(var li=0;li<LP.length;li+=3){ var lxp=LP[li]-tx0, lyp=LP[li+1]-ty0, lr=LP[li+2]; if(lxp<-lr-1||lyp<-lr-1||lxp>GW+lr+1||lyp>GW+lr+1)continue;
      if(!lcell)lcell=new Array(LG*LG); for(var gy=Math.floor((lyp-lr)/2);gy<=Math.floor((lyp+lr)/2);gy++)for(var gx=Math.floor((lxp-lr)/2);gx<=Math.floor((lxp+lr)/2);gx++){ if(gx<0||gy<0||gx>=LG||gy>=LG)continue; var ci=gy*LG+gx; (lcell[ci]||(lcell[ci]=[])).push(li); } } }
  var lineAt=function(fx,fy){ if(!lcell)return -1; var gx=Math.floor((fx-tx0)/2), gy=Math.floor((fy-ty0)/2); if(gx<0||gy<0||gx>=LG||gy>=LG)return -1; var L=lcell[gy*LG+gx]; if(!L)return -1; var best=-1, bd=1;
    for(var i=0;i<L.length;i++){ var q=L[i], dx=fx-LP[q], dy=fy-LP[q+1], r=LP[q+2], d=(dx*dx+dy*dy)/(r*r); if(d<bd){ bd=d; best=q; } } return best; };
  var under=function(tx,ty){ var nb=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[2,0],[-2,0],[0,2],[0,-2]]; for(var i=0;i<nb.length;i++){ var kq=kAt(tx+nb[i][0],ty+nb[i][1]); if(!KL[kq].roadish)return kq; } return kAt(tx,ty); };
  var colK=function(k,fx,fy){ var n=N.c(fx*(k.sc||0.18),fy*(k.sc||0.18)), tt=Math.min(1,Math.max(0,n*1.15-0.05)); var A=k.wall?k._top:k._a, B=k.wall?k._top2:k._b; return [A[0]+(B[0]-A[0])*tt,A[1]+(B[1]-A[1])*tt,A[2]+(B[2]-A[2])*tt]; };
  var FH=Math.round(S*0.75);   // cliff face height in samples (~24 px)
  var hill=function(tx,ty){ var zi=(tx<0||ty<0||tx>=W||ty>=H)?255:zone[ty*W+tx]; return zi===255?null:skins[zi].hills; };
  var job={out:out,step:function(budget){
    var t0=performance.now();
    while(performance.now()-t0<budget){
      if(phase===0){ // 1. kind per sample (noise-warped lookup → organic edges)
        for(var py=row;py<SW&&py<row+12;py++)for(var px=0;px<SW;px++){
          var fx=(px+0.5)/S+tx0, fy=(py+0.5)/S+ty0, ku=kAt(fx|0,fy|0);
          var lq=lineAt(fx,fy);
          if(lq>=0){ var kl=kAt(LP[lq]|0,LP[lq+1]|0); if(KL[kl].roadish){ kb[py*SW+px]=kl; continue; } }
          if(KL[ku].roadish)ku=under(fx|0,fy|0);
          var dwx=(N.w(fx*0.55,fy*0.55)-0.5)*1.25+(N.w2(fx*1.9,fy*1.9)-0.5)*0.32, dwy=(N.w(fx*0.55+40,fy*0.55+40)-0.5)*1.25+(N.w2(fx*1.9+17,fy*1.9+17)-0.5)*0.32;
          var kw=kAt(Math.floor(fx+dwx),Math.floor(fy+dwy));
          if(KL[ku].pattern||KL[ku].wall||KL[kw].pattern||KL[kw].wall)kw=kAt(Math.floor(fx+dwx*0.45),Math.floor(fy+dwy*0.45));   // built things & walls keep their shape
          if(KL[kw].roadish)kw=ku;
          kb[py*SW+px]=(KL[ku].nowarp||KL[kw].nowarp)?ku:kw; }
        row+=12; if(row>=SW){ phase=1; row=0; } continue; }
      if(phase===1){ // 2. colour: palette noise, soft blends, hills, rims, wet bands
        for(var py2=row;py2<SW&&py2<row+8;py2++)for(var px2=0;px2<SW;px2++){
          var ki=kb[py2*SW+px2], k=KL[ki], fx2=(px2+0.5)/S+tx0, fy2=(py2+0.5)/S+ty0, c0=colK(k,fx2,fy2), r=c0[0], g=c0[1], b=c0[2];
          if(k.soft){ var x0=Math.floor(fx2-0.5), y0=Math.floor(fy2-0.5), ax=fx2-0.5-x0, ay=fy2-0.5-y0; r=0;g=0;b=0;
            for(var j=0;j<2;j++)for(var i=0;i<2;i++){ var kk2=KL[kAt(x0+i,y0+j)], wgt=(i?ax:1-ax)*(j?ay:1-ay), cc=kk2.soft?colK(kk2,fx2,fy2):c0; r+=cc[0]*wgt; g+=cc[1]*wgt; b+=cc[2]*wgt; } }
          var f=1+(N.v(fx2*0.9,fy2*0.9)-0.5)*0.12;
          if(!k.liquid&&!k.flat){ var hl=hill(fx2|0,fy2|0); if(hl){ var hg=function(x,y){ return N.h(x*hl.sc,y*hl.sc)+N.h2(x*hl.sc*2.3,y*hl.sc*2.3)*0.35; }; f*=1+(hg(fx2-0.6,fy2-0.6)-hg(fx2+0.6,fy2+0.6))*hl.k; } }
          if(k.wall){ var rel=N.h(fx2*0.6,fy2*0.6)-N.h(fx2*0.6+0.3,fy2*0.6+0.3); f*=1+rel*1.1+(N.v(fx2*2.6,fy2*2.6)-0.5)*0.22; }
          if(k.wall&&!k.wall.noFace){ // 3/4 cliff face where the wall meets open ground below (follows the warped edge)
            for(var qf=1;qf<=FH;qf++){ var yb=py2+qf; if(yb>=SW)break; var kbq=KL[kb[yb*SW+px2]]; if(!kbq.wall){ var tf=1-qf/FH, fr=k._face, f2=k._face2;
              r=fr[0]+(f2[0]-fr[0])*tf; g=fr[1]+(f2[1]-fr[1])*tf; b=fr[2]+(f2[2]-fr[2])*tf; if(k.wall.strata&&((Math.floor(fy2*S)+(fx2*0.7|0))%5===0)){ r*=0.8; g*=0.8; b*=0.8; } if(qf===FH){ r*=1.18; g*=1.18; b*=1.18; } break; } } }
          else if(!k.wall){ for(var qs=1;qs<=3;qs++){ var ya=py2-qs; if(ya<0)break; var kaq=KL[kb[ya*SW+px2]]; if(kaq.wall&&!kaq.wall.noFace){ r*=0.62+qs*0.1; g*=0.62+qs*0.1; b*=0.62+qs*0.1; break; } } }
          var edgeK=-1, dist=9;
          for(var q=1;q<=3&&edgeK<0;q++){ for(var e=0;e<4;e++){ var ex=px2+(e===0?q:e===1?-q:0), ey=py2+(e===2?q:e===3?-q:0); if(ex<0||ey<0||ex>=SW||ey>=SW)continue; var kn=kb[ey*SW+ex]; if(kn!==ki&&!(k.soft&&KL[kn].soft)){ edgeK=kn; dist=q; break; } } }
          if(edgeK>=0){ var o=KL[edgeK];
            if(k.liquid&&!o.liquid&&k._shore&&dist<=2){ var e1=dist===1?0.7:0.35; r+=(k._shore[0]-r)*e1; g+=(k._shore[1]-g)*e1; b+=(k._shore[2]-b)*e1; }
            else if(!k.liquid&&o.liquid&&dist<=3){ f*=0.72+0.09*dist; }
            else if(k._rim&&dist<=(k.rimW||1)){ r=k._rim[0]; g=k._rim[1]; b=k._rim[2]; }
            else if(!k.soft&&dist===1){ f*=0.82; } }
          var i4=(py2*SW+px2)*4; d[i4]=Math.min(255,r*f); d[i4+1]=Math.min(255,g*f); d[i4+2]=Math.min(255,b*f); d[i4+3]=255; }
        row+=8; if(row>=SW){ lx.putImageData(img,0,0); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='medium'; ctx.drawImage(lo,0,0,GW*LT,GW*LT); phase=2; } continue; }
      if(phase===2){ // 3. built-surface patterns (world-aligned), one kind per step, clipped to its bounding box
        if(!pq){ pq=[]; var bb={};
          for(var sy=0;sy<SW;sy++)for(var sx=0;sx<SW;sx++){ var kq=kb[sy*SW+sx], kd=KL[kq]; if(!kd.pattern||!WPATTERN[kd.pattern])continue; var b0=bb[kq]||(bb[kq]=[sx,sy,sx,sy]); if(sx<b0[0])b0[0]=sx; if(sy<b0[1])b0[1]=sy; if(sx>b0[2])b0[2]=sx; if(sy>b0[3])b0[3]=sy; }
          Object.keys(bb).forEach(function(kq){ pq.push([+kq,bb[kq]]); }); }
        if(!pq.length){ phase=3; row=0; continue; }
        var item=pq.shift(), kq2=item[0], b=item[1], bx=Math.max(0,Math.floor(b[0]/S)-1), by=Math.max(0,Math.floor(b[1]/S)-1), bw=Math.min(GW,Math.ceil((b[2]+1)/S)+1)-bx, bh=Math.min(GW,Math.ceil((b[3]+1)/S)+1)-by;
        var sub=new Uint16Array(bw*S*bh*S); for(var yy=0;yy<bh*S;yy++)for(var xx=0;xx<bw*S;xx++)sub[yy*bw*S+xx]=kb[(yy+by*S)*SW+xx+bx*S];
        var pc={W:bw,H:bh,S:S,kb:sub,K:KL,ox:ox+bx*LT,oy:oy+by*LT,salt:(cx*73856093^cy*19349663)&0xffff,smoothMask:true};
        ctx.save(); ctx.translate(bx*LT,by*LT); WPATTERN[KL[kq2].pattern](ctx,pc,kq2,KL[kq2]); ctx.restore();
        continue; }
      if(phase===3){ // 4. per-tile decoration, liquid glints, kind glows, walls
        var fake=_wpFakeC(wd,out,ox,oy);
        for(var ty=row;ty<GW&&ty<row+8;ty++)for(var tx=0;tx<GW;tx++){
          var wtx=tx0+tx, wty=ty0+ty, kk=KL[kAt(wtx,wty)], p4x=tx*LT, p4y=ty*LT, R=rngOf(_wpHash(wtx,wty,3));
          if(kk.deco)kk.deco(ctx,p4x,p4y,R,N.c(wtx*0.2,wty*0.2),tx,ty,fake);
          if(kk.liquid&&R.chance(0.08)){ ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(p4x+R.f()*20,p4y+R.f()*26,8+R.f()*8,1.5); }
          var inner=tx>=MG&&ty>=MG&&tx<GW-MG&&ty<GW-MG;
          if(inner&&kk.glow&&R.chance(1/(kk.glow.every||6)))out.lights.push({x:ox+p4x+16,y:oy+p4y+16,r:kk.glow.r||90,col:kk.glow.col,a:kk.glow.a||0.35,pulse:0.3,period:1800+R.i(0,1500),depth:-4,_w:1});
          if(kk.wall&&!kk.wall.noFace)_wpWall(ctx,kk,KL,kAt,wtx,wty,p4x,p4y,R,fake);
        }
        out.lights.forEach(function(L){ if(!L._w){ L.x+=ox; L.y+=oy; L._w=1; } });
        row+=8; if(row>=GW){ phase=4; } continue; }
      if(phase===4){ // 5. props anchored in this chunk (flat ones paint; tall ones become sprites)
        var list=(wd.propsByChunk&&wd.propsByChunk[cx+'_'+cy])||[], fk=_wpFakeC(wd,out,ox,oy);
        list.forEach(function(p){ var Z=p.zi>=0?skins[p.zi].Z:null, fn=WPROP[p.prop]||(Z&&Z.draw&&Z.draw[p.prop]); if(!fn)return;
          fk.R=rngOf(_wpHash(p.x,p.y,11)); var n0=out.sprites.length, nl=out.lights.length;
          try{ fn(fk,ctx,(p.x-tx0)*LT,(p.y-ty0)*LT,p.w*LT,p.h*LT,p.o||{},(Z&&Z.pal)||{}); }catch(e){}
          for(var si=n0;si<out.sprites.length;si++){ var sp=out.sprites[si]; sp.x+=ox; sp.y+=oy; if(sp.depth!==undefined&&sp.depth<7000)sp.depth+=oy; }
          for(var li=nl;li<out.lights.length;li++){ var L=out.lights[li]; if(!L._w){ L.x+=ox; L.y+=oy; L._w=1; } } });
        phase=5; continue; }
      if(phase===5){ // 6. lava flow mask + ley lines, then crop the margin
        var lavaS=null; for(var q2=0;q2<kb.length;q2++){ if(KL[kb[q2]].lava){ lavaS=true; break; } }
        var inW=WCH*LT; out.canvas=cv;
        if(lavaS){ var mc=mkCanvas(SW,SW), mx=mc.getContext('2d'), im=mx.createImageData(SW,SW), dd=im.data; for(var i8=0;i8<SW*SW;i8++)if(KL[kb[i8]].lava)dd[i8*4+3]=255; mx.putImageData(im,0,0);
          var mask=mkCanvas(inW,inW), mk=mask.getContext('2d'); mk.imageSmoothingEnabled=true; mk.drawImage(mc,MG*S,MG*S,WCH*S,WCH*S,0,0,inW,inW); out.lavaMask=mask; }
        var ley=(wd.ley||[]).filter(function(L){ return L.bx1>=cx*WCH-4&&L.bx0<=(cx+1)*WCH+4&&L.by1>=cy*WCH-4&&L.by0<=(cy+1)*WCH+4; });
        if(ley.length){ var lc=mkCanvas(inW,inW), l2=lc.getContext('2d'); l2.lineCap='round'; l2.lineJoin='round';
          ley.forEach(function(L){ [[14,0.10],[7,0.22],[2.5,0.75]].forEach(function(st){ l2.strokeStyle=rgba(L.col,st[1]); l2.lineWidth=st[0]; l2.beginPath(); L.pts.forEach(function(p,i){ var X=(p[0]-cx*WCH)*LT+16,Y=(p[1]-cy*WCH)*LT+16; if(i)l2.lineTo(X,Y); else l2.moveTo(X,Y); }); l2.stroke(); }); });
          out.ley=lc; }
        // keep lights/sprites anchored inside this chunk only (the margin repeats neighbours)
        out.lights=out.lights.filter(function(L){ return L.x>=cx*WCH*LT&&L.x<(cx+1)*WCH*LT&&L.y>=cy*WCH*LT&&L.y<(cy+1)*WCH*LT; });
        phase=6; return true; }
      return true;
    }
    return false; }};
  return job;
}
// A stand-in for the Lab builder context, enough for props and deco to draw.
function _wpFakeC(wd,out,ox,oy){
  return {m:{sprites:out.sprites,lights:out.lights,particles:[],labels:[],shafts:[]},R:rngOf(1),W:WORLD_W,H:WORLD_H,
    get:function(){return -1;},is:function(){return false;}};
}
function _wpWall(ctx,kw,KL,kAt,x5,y5,p5x,p5y,R,fake){
  // the field already paints tops and faces; add rock texture on the top surface
  for(var q=0;q<3;q++){ if(!R.chance(0.6))continue; ctx.fillStyle=rgba(shade(kw.wall.top,R.chance(0.5)?0.16:-0.28),0.5); ctx.fillRect(p5x+R.f()*26,p5y+R.f()*20,3+R.f()*5,2); }
  if(R.chance(0.25)){ ctx.strokeStyle=rgba(shade(kw.wall.top,-0.4),0.45); ctx.lineWidth=1; ctx.beginPath(); var x=p5x+R.f()*30, y=p5y+R.f()*20; ctx.moveTo(x,y); ctx.lineTo(x+R.f()*12-6,y+R.f()*10); ctx.stroke(); }
  if(kw.wall.runes&&R.chance(kw.wall.runes*0.5)&&!KL[kAt(x5,y5+1)].wall)drawRune(ctx,p5x+16,p5y+LT-8,10,'#6fe3f5',R.i(0,9));
}
// Average colour of a kind (world map / minimap)
function _wkAvg(ki){ var k=WK_REG.list[ki]; if(!k)return [0,0,0]; if(!k._avg){ var a=k._a,b=k._b, f=k.wall?0.8:1; k._avg=[(a[0]+b[0])/2*f,(a[1]+b[1])/2*f,(a[2]+b[2])/2*f]; } return k._avg; }
