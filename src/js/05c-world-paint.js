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
  (typeof ISLAND_DESIGNS!=='undefined'?ISLAND_DESIGNS:[]).concat(typeof EMBER_CAVE_DESIGNS!=='undefined'?[]:[]).forEach(function(Z){ _wkReg(Z.ground); (Z.kinds||[]).forEach(_wkReg); });   // round 6 islands
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

// ── The field (samples → kinds → colours) as a pure function over plain data,
// so it can run in a Web Worker (off the main thread) or in slices here.
var WP_KT=null;    // kinds as flat typed tables (shared with the worker)
function _wpKindTables(){
  if(WP_KT&&WP_KT.n===WK_REG.list.length)return WP_KT;
  var L=WK_REG.list, n=L.length, T8=function(){ return new Uint8Array(n); }, F=function(m){ return new Float32Array(n*(m||1)); };
  var t={n:n,soft:T8(),nowarp:T8(),pat:T8(),wall:T8(),noFace:T8(),liquid:T8(),road:T8(),strata:T8(),flat:T8(),rimW:T8(),hasRim:T8(),hasShore:T8(),sc:F(),A:F(3),B:F(3),face:F(3),face2:F(3),rim:F(3),shore:F(3)};
  L.forEach(function(k,i){ t.soft[i]=k.soft?1:0; t.nowarp[i]=k.nowarp?1:0; t.pat[i]=k.pattern?1:0; t.wall[i]=k.wall?1:0; t.noFace[i]=k.wall&&k.wall.noFace?1:0; t.liquid[i]=k.liquid?1:0; t.road[i]=k.roadish?1:0; t.strata[i]=k.wall&&k.wall.strata?1:0; t.flat[i]=k.flat?1:0;
    t.sc[i]=k.sc||0.18; var A=k.wall?k._top:k._a, B=k.wall?k._top2:k._b; for(var c=0;c<3;c++){ t.A[i*3+c]=A[c]; t.B[i*3+c]=B[c]; if(k.wall){ t.face[i*3+c]=k._face[c]; t.face2[i*3+c]=k._face2[c]; } if(k._rim)t.rim[i*3+c]=k._rim[c]; if(k._shore)t.shore[i*3+c]=k._shore[c]; }
    t.hasRim[i]=k._rim?1:0; t.rimW[i]=k.rimW||1; t.hasShore[i]=k._shore?1:0; });
  WP_KT=t; return t;
}
// D: {S,GW,SW,tx0,ty0,wx0,wy0,WW,kwin,zwin,hills(Float32 256*2),lines(Float32 x,y,r),seaK,seed,KT}; out: D.kb, D.px
function _wpField(D,stage,r0,r1){
  var S=D.S, SW=D.SW, GW=D.GW, tx0=D.tx0, ty0=D.ty0, KT=D.KT, kb=D.kb, px=D.px;
  if(!D.N){ var sd=D.seed; D.N={w:vnoise(sd+1301),w2:vnoise(sd+1306),c:vnoise(sd+1302),v:vnoise(sd+1303),h:vnoise(sd+1304),h2:vnoise(sd+1305)};
    // bucket road/trail centre-lines by 2-tile cells
    var LG=Math.ceil(GW/2), cells=new Array(LG*LG), LP=D.lines; D.LG=LG; D.cells=cells;
    for(var li=0;li<LP.length;li+=3){ var lxp=LP[li]-tx0, lyp=LP[li+1]-ty0, lr=LP[li+2];
      for(var gy=Math.floor((lyp-lr)/2);gy<=Math.floor((lyp+lr)/2);gy++)for(var gx=Math.floor((lxp-lr)/2);gx<=Math.floor((lxp+lr)/2);gx++){ if(gx<0||gy<0||gx>=LG||gy>=LG)continue; var ci=gy*LG+gx; (cells[ci]||(cells[ci]=[])).push(li); } } }
  var N=D.N, WW=D.WW, kwin=D.kwin, zwin=D.zwin, wx0=D.wx0, wy0=D.wy0, LP2=D.lines, cells2=D.cells, LG2=D.LG;
  var kAt=function(x,y){ x-=wx0; y-=wy0; if(x<0||y<0||x>=WW||y>=WW)return D.seaK; return kwin[y*WW+x]; };
  if(stage===0){
    var lineAt=function(fx,fy){ var gx=Math.floor((fx-tx0)/2), gy=Math.floor((fy-ty0)/2); if(gx<0||gy<0||gx>=LG2||gy>=LG2)return -1; var Lc=cells2[gy*LG2+gx]; if(!Lc)return -1; var best=-1, bd=1;
      for(var i=0;i<Lc.length;i++){ var q=Lc[i], dx=fx-LP2[q], dy=fy-LP2[q+1], r=LP2[q+2], dd=(dx*dx+dy*dy)/(r*r); if(dd<bd){ bd=dd; best=q; } } return best; };
    var NB=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[2,0],[-2,0],[0,2],[0,-2]];
    var under=function(tx,ty){ for(var i=0;i<NB.length;i++){ var kq=kAt(tx+NB[i][0],ty+NB[i][1]); if(!KT.road[kq])return kq; } return kAt(tx,ty); };
    for(var py=r0;py<r1;py++)for(var pxx=0;pxx<SW;pxx++){
      var fx=(pxx+0.5)/S+tx0, fy=(py+0.5)/S+ty0, ku=kAt(fx|0,fy|0), lq=lineAt(fx,fy);
      if(lq>=0){ var kl=kAt(LP2[lq]|0,LP2[lq+1]|0); if(KT.road[kl]){ kb[py*SW+pxx]=kl; continue; } }
      if(KT.road[ku])ku=under(fx|0,fy|0);
      var dwx=(N.w(fx*0.55,fy*0.55)-0.5)*1.25+(N.w2(fx*1.9,fy*1.9)-0.5)*0.32, dwy=(N.w(fx*0.55+40,fy*0.55+40)-0.5)*1.25+(N.w2(fx*1.9+17,fy*1.9+17)-0.5)*0.32;
      var kw=kAt(Math.floor(fx+dwx),Math.floor(fy+dwy));
      if(KT.pat[ku]||KT.wall[ku]||KT.pat[kw]||KT.wall[kw])kw=kAt(Math.floor(fx+dwx*0.45),Math.floor(fy+dwy*0.45));
      if(KT.road[kw])kw=ku;
      kb[py*SW+pxx]=(KT.nowarp[ku]||KT.nowarp[kw])?ku:kw; }
    return;
  }
  var FH=Math.round(S*0.75), A=KT.A, B=KT.B, sc=KT.sc;
  var col=[0,0,0], colK=function(k,fx,fy,o){ var n=N.c(fx*sc[k],fy*sc[k]), tt=n*1.15-0.05; tt=tt<0?0:tt>1?1:tt; var i3=k*3; o[0]=A[i3]+(B[i3]-A[i3])*tt; o[1]=A[i3+1]+(B[i3+1]-A[i3+1])*tt; o[2]=A[i3+2]+(B[i3+2]-A[i3+2])*tt; return o; };
  var cc=[0,0,0];
  for(var py2=r0;py2<r1;py2++)for(var px2=0;px2<SW;px2++){
    var ki=kb[py2*SW+px2], fx2=(px2+0.5)/S+tx0, fy2=(py2+0.5)/S+ty0; colK(ki,fx2,fy2,col); var r=col[0], g=col[1], b=col[2];
    if(KT.soft[ki]){ var x0=Math.floor(fx2-0.5), y0=Math.floor(fy2-0.5), ax=fx2-0.5-x0, ay=fy2-0.5-y0, c0r=r, c0g=g, c0b=b; r=0;g=0;b=0;
      for(var j=0;j<2;j++)for(var i=0;i<2;i++){ var kk2=kAt(x0+i,y0+j), wgt=(i?ax:1-ax)*(j?ay:1-ay); if(KT.soft[kk2]){ colK(kk2,fx2,fy2,cc); r+=cc[0]*wgt; g+=cc[1]*wgt; b+=cc[2]*wgt; } else { r+=c0r*wgt; g+=c0g*wgt; b+=c0b*wgt; } } }
    var f=1+(N.v(fx2*0.9,fy2*0.9)-0.5)*0.12;
    if(!KT.liquid[ki]&&!KT.flat[ki]){ var zx=(fx2|0)-wx0, zy=(fy2|0)-wy0, zi=(zx<0||zy<0||zx>=WW||zy>=WW)?255:zwin[zy*WW+zx];
      if(zi!==255&&D.hills[zi*2]>0){ var hs=D.hills[zi*2], hk=D.hills[zi*2+1];
        var h1=N.h((fx2-0.6)*hs,(fy2-0.6)*hs)+N.h2((fx2-0.6)*hs*2.3,(fy2-0.6)*hs*2.3)*0.35, h2=N.h((fx2+0.6)*hs,(fy2+0.6)*hs)+N.h2((fx2+0.6)*hs*2.3,(fy2+0.6)*hs*2.3)*0.35; f*=1+(h1-h2)*hk; } }
    if(KT.wall[ki]){ var rel=N.h(fx2*0.6,fy2*0.6)-N.h(fx2*0.6+0.3,fy2*0.6+0.3); f*=1+rel*1.1+(N.v(fx2*2.6,fy2*2.6)-0.5)*0.22;
      if(!KT.noFace[ki]){ for(var qf=1;qf<=FH;qf++){ var yb=py2+qf; if(yb>=SW)break; if(!KT.wall[kb[yb*SW+px2]]){ var tf=1-qf/FH, i3=ki*3;
          r=KT.face[i3]+(KT.face2[i3]-KT.face[i3])*tf; g=KT.face[i3+1]+(KT.face2[i3+1]-KT.face[i3+1])*tf; b=KT.face[i3+2]+(KT.face2[i3+2]-KT.face[i3+2])*tf;
          if(KT.strata[ki]&&((Math.floor(fy2*S)+(fx2*0.7|0))%5===0)){ r*=0.8; g*=0.8; b*=0.8; } if(qf===FH){ r*=1.18; g*=1.18; b*=1.18; } break; } } } }
    else { for(var qs=1;qs<=3;qs++){ var ya=py2-qs; if(ya<0)break; var kaq=kb[ya*SW+px2]; if(KT.wall[kaq]&&!KT.noFace[kaq]){ var sh=0.62+qs*0.1; r*=sh; g*=sh; b*=sh; break; } } }
    var edgeK=-1, dist=9;
    for(var q=1;q<=3&&edgeK<0;q++){ for(var e=0;e<4;e++){ var ex=px2+(e===0?q:e===1?-q:0), ey=py2+(e===2?q:e===3?-q:0); if(ex<0||ey<0||ex>=SW||ey>=SW)continue; var kn=kb[ey*SW+ex]; if(kn!==ki&&!(KT.soft[ki]&&KT.soft[kn])){ edgeK=kn; dist=q; break; } } }
    if(edgeK>=0){ var i3b=ki*3;
      if(KT.liquid[ki]&&!KT.liquid[edgeK]&&KT.hasShore[ki]&&dist<=2){ var e1=dist===1?0.7:0.35; r+=(KT.shore[i3b]-r)*e1; g+=(KT.shore[i3b+1]-g)*e1; b+=(KT.shore[i3b+2]-b)*e1; }
      else if(!KT.liquid[ki]&&KT.liquid[edgeK]&&dist<=3){ f*=0.72+0.09*dist; }
      else if(KT.hasRim[ki]&&dist<=KT.rimW[ki]){ r=KT.rim[i3b]; g=KT.rim[i3b+1]; b=KT.rim[i3b+2]; }
      else if(!KT.soft[ki]&&dist===1){ f*=0.82; } }
    var i4=(py2*SW+px2)*4; r*=f; g*=f; b*=f; px[i4]=r>255?255:r; px[i4+1]=g>255?255:g; px[i4+2]=b>255?255:b; px[i4+3]=255; }
}
// One Web Worker paints fields off the main thread; if workers aren't allowed
// here, the same function runs in small slices on the main thread instead.
var _WPW={w:null,tried:false,seq:0,cb:{},kt:null};
function _wpWorker(){
  if(_WPW.tried)return _WPW.w; _WPW.tried=true;
  try{
    var src='var vnoise='+vnoise.toString()+';\nvar _wpField='+_wpField.toString()+';\nvar KT=null;\n'+
      'onmessage=function(e){ var D=e.data; if(D.kt){ KT=D.kt; return; } D.KT=KT; var t0=performance.now(); _wpField(D,0,0,D.SW); var t1=performance.now(); _wpField(D,1,0,D.SW); postMessage({id:D.id,kb:D.kb,px:D.px,ms:[t1-t0,performance.now()-t1]},[D.kb.buffer,D.px.buffer]); };';
    var w=new Worker(URL.createObjectURL(new Blob([src],{type:'text/javascript'})));
    w.onmessage=function(e){ var cb=_WPW.cb[e.data.id]; delete _WPW.cb[e.data.id]; if(cb)cb(e.data); };
    w.onerror=function(ev){ _WPW.err=ev&&ev.message; _WPW.w=null; Object.keys(_WPW.cb).forEach(function(id){ var cb=_WPW.cb[id]; delete _WPW.cb[id]; cb(null); }); };
    _WPW.w=w;
  }catch(e){ _WPW.w=null; }
  return _WPW.w;
}

// Returns a job: call job.step(budgetMs) until it returns true; then job.out.
function wpChunkJob(wd,cx,cy){
  _wkInit(); var skins=_wzSkins(), N=_wpNoise(), KL=WK_REG.list, W=WORLD_W, H=WORLD_H, kind=wd.kind, zone=wd.zone, KT=_wpKindTables();
  var MG=1, GW=WCH+2*MG, S=WP_S, SW=GW*S, tx0=cx*WCH-MG, ty0=cy*WCH-MG, ox=tx0*LT, oy=ty0*LT;
  var kAt=function(tx,ty){ if(tx<0||ty<0||tx>=W||ty>=H)return WSK.sea._gi; return kind[ty*W+tx]; };
  var cv=mkCanvas(WCH*LT,WCH*LT), ctx=cv.getContext('2d'), pq=null, kb=null, texOf={};
  ctx.translate(-MG*LT,-MG*LT);   // draw in margin coordinates; the margin itself is clipped away
  var out={cx:cx,cy:cy,canvas:null,sprites:[],lights:[],particles:[],lavaMask:null,ley:null}, phase=0, row=0, waiting=false, glowCells={};
  // field input: a window of the kind/zone grids (chunk + 4-tile margin), nearby road lines, zone hills
  var MW=4, WW=GW+2*MW, wx0=tx0-MW, wy0=ty0-MW, kwin=new Uint16Array(WW*WW), zwin=new Uint8Array(WW*WW);
  for(var yy=0;yy<WW;yy++)for(var xx=0;xx<WW;xx++){ var X=wx0+xx, Y=wy0+yy; kwin[yy*WW+xx]=kAt(X,Y); zwin[yy*WW+xx]=(X<0||Y<0||X>=W||Y>=H)?255:zone[Y*W+X]; }
  var lines=[]; if(wd.lines){ var LP=wd.lines; for(var li=0;li<LP.length;li+=3){ var lxp=LP[li]-tx0, lyp=LP[li+1]-ty0, lr=LP[li+2]; if(lxp<-lr-1||lyp<-lr-1||lxp>GW+lr+1||lyp>GW+lr+1)continue; lines.push(LP[li],LP[li+1],lr); } }
  if(!_WPW.hills){ var hl=new Float32Array(512); skins.forEach(function(s,i){ if(s.hills){ hl[i*2]=s.hills.sc; hl[i*2+1]=s.hills.k; } }); _WPW.hills=hl; }
  var D={S:S,GW:GW,SW:SW,tx0:tx0,ty0:ty0,wx0:wx0,wy0:wy0,WW:WW,kwin:kwin,zwin:zwin,hills:_WPW.hills,lines:new Float32Array(lines),seaK:WSK.sea._gi,seed:WORLD_SEED,
    kb:new Uint16Array(SW*SW),px:new Uint8ClampedArray(SW*SW*4)};
  var finishField=function(){ var lo=mkCanvas(SW,SW), lx=lo.getContext('2d'), img=lx.createImageData(SW,SW); img.data.set(D.px); lx.putImageData(img,0,0);
    ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='medium'; ctx.drawImage(lo,0,0,GW*LT,GW*LT); kb=D.kb; phase=2; };
  var job={out:out,phase:function(){return phase;},step:function(budget){
    var t0=performance.now();
    while(performance.now()-t0<budget){
      if(phase===0){ // 1–2. the field: in the worker if we can, else in slices here
        var wk=_wpWorker();
        if(wk){ if(!waiting){ waiting=true; var id=++_WPW.seq; if(_WPW.kt!==KT){ wk.postMessage({kt:KT}); _WPW.kt=KT; }
            _WPW.cb[id]=function(res){ waiting=false; if(!res){ phase=0.5; row=0; D.KT=KT; return; } D.kb=res.kb; D.px=res.px; _WPW.ms=res.ms; var tf=performance.now(); finishField(); _WPW.finMs=performance.now()-tf; };
            D.id=id; var msg={}; for(var k0 in D)if(k0!=='KT'&&k0!=='N'&&k0!=='cells')msg[k0]=D[k0]; wk.postMessage(msg,[msg.kb.buffer,msg.px.buffer]); }
          return false; }
        phase=0.5; row=0; D.KT=KT; continue; }
      if(phase===0.5){ _wpField(D,0,row,Math.min(SW,row+12)); row+=12; if(row>=SW){ phase=1; row=0; } continue; }
      if(phase===1){ _wpField(D,1,row,Math.min(SW,row+8)); row+=8; if(row>=SW)finishField(); continue; }
      if(phase===2){ // 3. built-surface patterns: cached world-aligned tiles, clipped to each kind
        if(!pq){ pq=[]; var bb={};
          for(var sy=0;sy<SW;sy++)for(var sx=0;sx<SW;sx++){ var kq=kb[sy*SW+sx], kd=KL[kq]; if(!kd.pattern||!WPATTERN[kd.pattern])continue; var b0=bb[kq]||(bb[kq]=[sx,sy,sx,sy]); if(sx<b0[0])b0[0]=sx; if(sy<b0[1])b0[1]=sy; if(sx>b0[2])b0[2]=sx; if(sy>b0[3])b0[3]=sy; }
          Object.keys(bb).forEach(function(kq){ pq.push([+kq,bb[kq]]); });
          // painted ground textures (04h, round 30): the kinds that have one get its marks laid over their generated colour
          var Zs=_scn(), tb={}; if(Zs){ for(var sy2=0;sy2<SW;sy2+=2)for(var sx2=0;sx2<SW;sx2+=2){ var kt=kb[sy2*SW+sx2], tid=texOf[kt]; if(tid===undefined)tid=texOf[kt]=Zs.ground(KL[kt].id)||0; if(!tid)continue; var b1=tb[kt]||(tb[kt]=[sx2,sy2,sx2,sy2]); if(sx2<b1[0])b1[0]=sx2; if(sy2<b1[1])b1[1]=sy2; if(sx2+1>b1[2])b1[2]=Math.min(SW-1,sx2+1); if(sy2+1>b1[3])b1[3]=Math.min(SW-1,sy2+1); }
            Object.keys(tb).forEach(function(kq){ pq.push([+kq,tb[kq],texOf[kq]]); }); } }
        if(!pq.length){ phase=3; row=0; continue; }
        var item=pq.shift(); if(item[2])_wpTexFill(ctx,kb,SW,S,GW,ox,oy,item[0],item[1],item[2]); else _wpPatternFill(ctx,kb,SW,S,GW,ox,oy,item[0],item[1]);
        continue; }
      if(phase===3){ // 4. per-tile decoration, liquid glints, kind glows, walls
        var fake=_wpFakeC(wd,out,ox,oy);
        for(var ty=row;ty<GW&&ty<row+8;ty++)for(var tx=0;tx<GW;tx++){
          var wtx=tx0+tx, wty=ty0+ty, kk=KL[kAt(wtx,wty)], p4x=tx*LT, p4y=ty*LT, R=rngOf(_wpHash(wtx,wty,3));
          if(kk.deco&&!texOf[kAt(wtx,wty)])kk.deco(ctx,p4x,p4y,R,N.c(wtx*0.2,wty*0.2),tx,ty,fake);   // textured ground needs no drawn blades
          if(kk.liquid&&R.chance(0.08)){ ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(p4x+R.f()*20,p4y+R.f()*26,8+R.f()*8,1.5); }
          var inner=tx>=MG&&ty>=MG&&tx<GW-MG&&ty<GW-MG;
          var gcell=((ty>>3)*8+(tx>>3));
          if(inner&&kk.glow&&!glowCells[gcell]&&R.chance(1/(kk.glow.every||6))&&(glowCells[gcell]=1))out.lights.push({x:ox+p4x+16,y:oy+p4y+16,r:kk.glow.r||90,col:kk.glow.col,a:kk.glow.a||0.35,pulse:0.3,period:1800+R.i(0,1500),depth:-4,_w:1});
          if(kk.wall&&!kk.wall.noFace)_wpWall(ctx,kk,KL,kAt,wtx,wty,p4x,p4y,R,fake);
        }
        out.lights.forEach(function(L){ if(!L._w){ L.x+=ox; L.y+=oy; L._w=1; } }); out.particles.forEach(function(P){ if(!P._w&&P.area){ P.area=Object.assign({},P.area,{x:P.area.x+ox,y:P.area.y+oy}); P._w=1; } });
        row+=8; if(row>=GW){ phase=4; } continue; }
      if(phase===4){ // 5. props anchored in this chunk (flat ones paint; tall ones become sprites)
        var list=(wd.propsByChunk&&wd.propsByChunk[cx+'_'+cy])||[], fk=_wpFakeC(wd,out,ox,oy);
        list.forEach(function(p){ var Z=p.Z||(p.zi>=0&&p.zi!==255?skins[p.zi].Z:null), fn=WPROP[p.prop]||(Z&&Z.draw&&Z.draw[p.prop]); if(!fn)return;
          fk.R=rngOf(_wpHash(p.x,p.y,11)); var n0=out.sprites.length, nl=out.lights.length;
          try{ fn(fk,ctx,(p.x-tx0)*LT,(p.y-ty0)*LT,p.w*LT,p.h*LT,p.o||{},(Z&&Z.pal)||{}); }catch(e){ var ek=p.prop+': '+e.message; WP_ERR[ek]=(WP_ERR[ek]||0)+1; }
          if(Math.floor(p.x/WCH)!==cx||Math.floor(p.y/WCH)!==cy)out.sprites.length=n0;   // tall parts belong to the anchor chunk
          for(var si=n0;si<out.sprites.length;si++){ var sp=out.sprites[si]; sp.x+=ox; sp.y+=oy; if(sp.depth!==undefined&&sp.depth<7000)sp.depth+=oy; }
          for(var li=nl;li<out.lights.length;li++){ var L=out.lights[li]; L.zi=p.zi; if(!L._w){ L.x+=ox; L.y+=oy; L._w=1; } } });
        out.lights.forEach(function(L){ if(!L._w){ L.x+=ox; L.y+=oy; L._w=1; } }); out.particles.forEach(function(P){ if(!P._w&&P.area){ P.area=Object.assign({},P.area,{x:P.area.x+ox,y:P.area.y+oy}); P._w=1; } });
        phase=5; continue; }
      if(phase===5){ // 6. lava flow mask + ley lines, then crop the margin
        var lavaS=null; for(var q2=0;q2<kb.length;q2++){ if(KL[kb[q2]].lava){ lavaS=true; break; } }
        var inW=WCH*LT; out.canvas=cv;
        if(lavaS){ out.lavaCells=[]; for(var ly2=0;ly2<WCH;ly2++)for(var lx2=0;lx2<WCH;lx2++){ if(KL[kAt(cx*WCH+lx2,cy*WCH+ly2)].lava&&((lx2*7+ly2*13)%5===0))out.lavaCells.push([(cx*WCH+lx2)*LT,(cy*WCH+ly2)*LT]); } }
        if(lavaS){ var mc=mkCanvas(SW,SW), mx=mc.getContext('2d'), im=mx.createImageData(SW,SW), dd=im.data; for(var i8=0;i8<SW*SW;i8++)if(KL[kb[i8]].lava)dd[i8*4+3]=255; mx.putImageData(im,0,0);
          var mask=mkCanvas(inW,inW), mk=mask.getContext('2d'); mk.imageSmoothingEnabled=true; mk.drawImage(mc,MG*S,MG*S,WCH*S,WCH*S,0,0,inW,inW); out.lavaMask=mask; }
        var ley=(wd.ley||[]).filter(function(L){ return L.bx1>=cx*WCH-4&&L.bx0<=(cx+1)*WCH+4&&L.by1>=cy*WCH-4&&L.by0<=(cy+1)*WCH+4; });
        if(ley.length){ var lc=mkCanvas(inW,inW), l2=lc.getContext('2d'); l2.lineCap='round'; l2.lineJoin='round';
          ley.forEach(function(L){ [[14,0.10],[7,0.22],[2.5,0.75]].forEach(function(st){ l2.strokeStyle=rgba(L.col,st[1]); l2.lineWidth=st[0]; l2.beginPath(); L.pts.forEach(function(p,i){ var X=(p[0]-cx*WCH)*LT+16,Y=(p[1]-cy*WCH)*LT+16; if(i)l2.lineTo(X,Y); else l2.moveTo(X,Y); }); l2.stroke(); }); });
          out.ley=lc;
          // pulsing glow beads along each ley line (as in the Lab); the chunk filter below keeps ours
          ley.forEach(function(L){ for(var q6=0;q6<L.pts.length-1;q6++){ var a6=L.pts[q6], b6=L.pts[q6+1]; for(var u=0.25;u<1;u+=0.5)out.lights.push({x:(a6[0]+(b6[0]-a6[0])*u)*LT+16,y:(a6[1]+(b6[1]-a6[1])*u)*LT+16,r:50,col:L.col,a:0.28,pulse:0.5,period:2400,depth:-4,noCut:true,_w:1}); } }); }
        // keep lights/sprites anchored inside this chunk only (the margin repeats neighbours)
        var inC=function(x,y){ return x>=cx*WCH*LT&&x<(cx+1)*WCH*LT&&y>=cy*WCH*LT&&y<(cy+1)*WCH*LT; };
        out.lights=out.lights.filter(function(L){ return inC(L.x,L.y); });
        out.particles=out.particles.filter(function(P){ return P.area&&inC(P.area.x+P.area.w/2,P.area.y+P.area.h/2); });
        (wd.stampParts||[]).forEach(function(P){ if(inC(P.area.x+P.area.w/2,P.area.y+P.area.h/2))out.particles.push(P); });
        out.shafts=(wd.shafts||[]).filter(function(sh){ return inC(sh.x+sh.canvas.width/2,sh.y); });
        phase=6; continue; }
      if(phase===6){ // 7. pack tall sprites into one atlas canvas (so mounting is just an upload)
        if(out.sprites.length){ var AW=2048, ax=0, ay=0, rowH=0, pos=[];
          out.sprites.forEach(function(sp){ var w=sp.canvas.width, h=sp.canvas.height; if(ax+w>AW){ ax=0; ay+=rowH+2; rowH=0; } pos.push([ax,ay]); ax+=w+2; rowH=Math.max(rowH,h); });
          var AH=Math.min(8192,ay+rowH+2), atlas=mkCanvas(ax>0&&ay===0?Math.min(AW,ax):AW,AH), ag=atlas.getContext('2d');
          out.sprites.forEach(function(sp,i){ if(pos[i][1]+sp.canvas.height<=AH){ ag.drawImage(sp.canvas,pos[i][0],pos[i][1]); sp.ap=pos[i]; } sp.aw=sp.canvas.width; sp.ah=sp.canvas.height; });
          out.atlas=atlas; }
        phase=7; return true; }
      return true;
    }
    return false; }};
  return job;
}
// Built-surface patterns from cached tiles: each patterned kind is drawn once
// into a repeating tile (periods chosen so rows line up across the repeat),
// then laid on a world-aligned grid and clipped to where that kind is.
var _WPC={}, WP_ERR={};   // WP_ERR: prop draw failures (audited by tests/audit_lab_world.py)
function _wpWarmPatterns(){ _wkInit(); var KL=WK_REG.list; for(var i=0;i<KL.length;i++){ if(KL[i].pattern&&WPATTERN[KL[i].pattern]&&!_WPC[i])_wpPatTile(i); } }   // all (Lab/tests)
// Lazy pattern warming (perf): a pattern tile costs ~25 ms and ~1 MB, and most patterned kinds
// are nowhere near the player (42 of 78 are not on the mainland at all). So only the kinds of the
// chunks around a point are made up front; chunk jobs make any other on demand (_wpPatternFill →
// _wpPatTile), and _wpWarmAhead() makes those of the next ring of chunks while the painter is idle.
var _WPISPAT=null;
function _wpIsPat(){ if(!_WPISPAT||_WPISPAT.length!==WK_REG.list.length){ var KL=WK_REG.list; _WPISPAT=new Uint8Array(KL.length); for(var i=0;i<KL.length;i++)_WPISPAT[i]=KL[i].pattern&&WPATTERN[KL[i].pattern]?1:0; } return _WPISPAT; }
// patterned kinds not yet made in the chunks cx0..cx1 × cy0..cy1 (+ the field's 5-tile window)
function _wpPatKindsIn(wd,cx0,cy0,cx1,cy1){ _wkInit(); var P=_wpIsPat(), kind=wd.kind, W=WORLD_W, H=WORLD_H, seen={}, out=[];
  var x0=Math.max(0,cx0*WCH-5), y0=Math.max(0,cy0*WCH-5), x1=Math.min(W-1,(cx1+1)*WCH+4), y1=Math.min(H-1,(cy1+1)*WCH+4);
  for(var y=y0;y<=y1;y++){ var r=y*W; for(var x=x0;x<=x1;x++){ var ki=kind[r+x]; if(P[ki]&&!_WPC[ki]&&!seen[ki]){ seen[ki]=1; out.push(ki); } } }
  return out; }
// make the patterns of every chunk within `ring` chunks of world point (px,py) now
function _wpWarmNear(wd,px,py,ring){ var cx=Math.floor(px/(WCH*TILE)), cy=Math.floor(py/(WCH*TILE)), r=ring===undefined?2:ring;
  _wpPatKindsIn(wd,cx-r,cy-r,cx+r,cy+r).forEach(function(ki){ _wpPatTile(ki); }); }
// idle look-ahead: make at most ONE missing pattern of the chunks within `ring` of (px,py); true if one was made
function _wpWarmAhead(wd,px,py,ring){ var cx=Math.floor(px/(WCH*TILE)), cy=Math.floor(py/(WCH*TILE)), r=ring||3;
  var L=_wpPatKindsIn(wd,cx-r,cy-r,cx+r,cy+r); if(!L.length)return false; _wpPatTile(L[0]); return true; }
var WP_TILE={cobble:[528,506],flag:[512,510],brick:[512,512],tier:[504,512],hex:[500.56,510],scute:[478,414],planks:[512,512]};
function _wpPatTile(ki){
  if(_WPC[ki])return _WPC[ki]; var k=WK_REG.list[ki], sz=WP_TILE[k.pattern]||[512,512];
  if(k.pattern==='slab'){ var z=k.slabSize||LT; sz=[z*Math.max(1,Math.round(512/z)),z*Math.max(1,Math.round(512/z))]; }
  var tw=Math.round(sz[0]), th=Math.round(sz[1]), nt=Math.ceil(Math.max(tw,th)/LT)+2, c={W:nt,H:nt,S:1,kb:new Uint16Array(nt*nt).fill(ki),K:WK_REG.list,ox:0,oy:0,salt:0};
  var big=mkCanvas(nt*LT,nt*LT), bg=big.getContext('2d'); WPATTERN[k.pattern](bg,c,ki,k);
  var t=mkCanvas(tw,th); t.getContext('2d').drawImage(big,0,0,tw,th,0,0,tw,th); _WPC[ki]={cv:t,w:tw,h:th}; return _WPC[ki];
}
// A painted texture over one kind of ground: the same world-aligned fill and kind mask as a pattern, laid on with 'overlay'
// (light and dark only), so each zone keeps its own grass colour.
function _wpTexFill(ctx,kb,SW,S,GW,ox,oy,ki,b,tid){
  var Zs=_scn(), tile=Zs&&Zs.detail(tid,128,0.9); if(!tile)return;
  var bx=Math.max(0,Math.floor(b[0]/S)-1), by=Math.max(0,Math.floor(b[1]/S)-1), bw=Math.min(GW,Math.ceil((b[2]+1)/S)+1)-bx, bh=Math.min(GW,Math.ceil((b[3]+1)/S)+1)-by; if(bw<=0||bh<=0)return;
  var W2=bw*LT, H2=bh*LT, lay=mkCanvas(W2,H2), g=lay.getContext('2d'), P={w:tile.width,h:tile.height};
  g.fillStyle=g.createPattern(tile,'repeat'); var wx=ox+bx*LT, wy=oy+by*LT, sx=((wx%P.w)+P.w)%P.w, sy=((wy%P.h)+P.h)%P.h;
  g.save(); g.translate(-sx,-sy); g.fillRect(0,0,W2+sx,H2+sy); g.restore();
  var mc=mkCanvas(bw*S,bh*S), mx=mc.getContext('2d'), im=mx.createImageData(bw*S,bh*S), dd=im.data;
  for(var yy=0;yy<bh*S;yy++)for(var xx=0;xx<bw*S;xx++){ if(kb[(yy+by*S)*SW+xx+bx*S]===ki)dd[(yy*bw*S+xx)*4+3]=255; }
  mx.putImageData(im,0,0); g.globalCompositeOperation='destination-in'; g.imageSmoothingEnabled=true; g.drawImage(mc,0,0,W2,H2);
  ctx.save(); ctx.globalCompositeOperation='overlay'; ctx.globalAlpha=Math.min(1,Zs.GRASS*2); ctx.drawImage(lay,bx*LT,by*LT); ctx.restore();
}
function _wpPatternFill(ctx,kb,SW,S,GW,ox,oy,ki,b){
  var bx=Math.max(0,Math.floor(b[0]/S)-1), by=Math.max(0,Math.floor(b[1]/S)-1), bw=Math.min(GW,Math.ceil((b[2]+1)/S)+1)-bx, bh=Math.min(GW,Math.ceil((b[3]+1)/S)+1)-by;
  var P=_wpPatTile(ki), W2=bw*LT, H2=bh*LT, lay=mkCanvas(W2,H2), g=lay.getContext('2d');
  g.fillStyle=g.createPattern(P.cv,'repeat'); var wx=ox+bx*LT, wy=oy+by*LT, sx=((wx%P.w)+P.w)%P.w, sy=((wy%P.h)+P.h)%P.h;
  g.save(); g.translate(-sx,-sy); g.fillRect(0,0,W2+sx,H2+sy); g.restore();
  var mc=mkCanvas(bw*S,bh*S), mx=mc.getContext('2d'), im=mx.createImageData(bw*S,bh*S), dd=im.data;
  for(var yy=0;yy<bh*S;yy++)for(var xx=0;xx<bw*S;xx++){ if(kb[(yy+by*S)*SW+xx+bx*S]===ki)dd[(yy*bw*S+xx)*4+3]=255; }
  mx.putImageData(im,0,0); g.globalCompositeOperation='destination-in'; g.imageSmoothingEnabled=true; g.drawImage(mc,0,0,W2,H2);
  ctx.drawImage(lay,bx*LT,by*LT);
}
// A stand-in for the Lab builder context, enough for props and deco to draw.
function _wpFakeC(wd,out,ox,oy){
  return {m:{sprites:out.sprites,lights:out.lights,particles:out.particles,labels:[],shafts:[]},R:rngOf(1),W:WORLD_W,H:WORLD_H,
    get:function(){return -1;},is:function(){return false;}};
}
function _wpWall(ctx,kw,KL,kAt,x5,y5,p5x,p5y,R,fake){
  // the field already paints tops and faces; add rock texture on the top surface
  for(var q=0;q<3;q++){ if(!R.chance(0.6))continue; ctx.fillStyle=rgba(shade(kw.wall.top,R.chance(0.5)?0.16:-0.28),0.5); ctx.fillRect(p5x+R.f()*26,p5y+R.f()*20,3+R.f()*5,2); }
  if(R.chance(0.25)){ ctx.strokeStyle=rgba(shade(kw.wall.top,-0.4),0.45); ctx.lineWidth=1; ctx.beginPath(); var x=p5x+R.f()*30, y=p5y+R.f()*20; ctx.moveTo(x,y); ctx.lineTo(x+R.f()*12-6,y+R.f()*10); ctx.stroke(); }
  if(kw.wall.runes&&R.chance(kw.wall.runes)&&!KL[kAt(x5,y5+1)].wall){ drawRune(ctx,p5x+16,p5y+LT-8,11,'#6fe3f5',R.i(0,9)); addLight(fake.m,p5x+16,p5y+LT-8,56,'#6fe3f5',0.35,{react:true,rune:true}); }
}
// Average colour of a kind (world map / minimap)
function _wkAvg(ki){ var k=WK_REG.list[ki]; if(!k)return [0,0,0]; if(!k._avg){ var a=k._a,b=k._b, f=k.wall?0.8:1; k._avg=[(a[0]+b[0])/2*f,(a[1]+b[1])/2*f,(a[2]+b[2])/2*f]; } return k._avg; }
