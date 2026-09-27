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
function drawTileToCtx(ctx,px,py,tv,pal,vi){
  vi=vi||0;
  const ts=TILE;
  const _pc=(pal&&pal[tv]!==undefined)?pal[tv]:TILE_COLORS[tv];
  const col=_pc!==undefined?_pc:0x222222;
  const toH=c=>'#'+c.toString(16).padStart(6,'0');
  // pv = pattern variant 0-3, sv = shade variant 0-2
  const pv=vi%4, sv=Math.floor(vi/4);
  const ltM=[1.40,1.58,1.22][sv], dkM=[0.65,0.72,0.55][sv];
  const dk=c=>((Math.floor(((c>>16)&0xff)*dkM)<<16)|(Math.floor(((c>>8)&0xff)*dkM)<<8)|Math.floor((c&0xff)*dkM))>>>0;
  const lt=c=>((Math.min(255,Math.floor(((c>>16)&0xff)*ltM))<<16)|(Math.min(255,Math.floor(((c>>8)&0xff)*ltM))<<8)|Math.min(255,Math.floor((c&0xff)*ltM)))>>>0;
  const dc=dk(col),lc=lt(col);
  // Gradient helpers
  function rg(cx2,cy2,r1,r2,ci,co,a){var g=ctx.createRadialGradient(px+cx2,py+cy2,r1,px+cx2,py+cy2,r2);g.addColorStop(0,ci);g.addColorStop(1,co);ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(px,py,ts,ts);}
  function lg(x1,y1,x2,y2,c1,c2,a){var g=ctx.createLinearGradient(px+x1,py+y1,px+x2,py+y2);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(px,py,ts,ts);}
  // Base fill
  ctx.globalAlpha=1;ctx.fillStyle=toH(col);ctx.fillRect(px,py,ts,ts);

  if(tv===T.GRASS||tv===T.GRASS2){
    // Radial highlight shifted by variant
    var gcx=[ts*.38,ts*.58,ts*.32,ts*.62][pv], gcy=[ts*.38,ts*.32,ts*.60,ts*.50][pv];
    rg(gcx,gcy,0,ts*.65,toH(lc)+'55','transparent',.22);
    // Bottom-edge shadow strip for subtle ground depth
    lg(0,ts*.6,0,ts,toH(dc),'transparent',.10);
    // Blade patterns (5 blades, 4 positions sets)
    var blades=[[[4,8],[14,5],[22,12],[8,20],[18,18]],
                [[2,6],[12,3],[24,10],[6,22],[20,16]],
                [[6,10],[16,7],[20,14],[10,18],[22,22]],
                [[8,4],[18,9],[26,8],[4,24],[14,20]]][pv];
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.32+sv*.06;
    blades.forEach(function(b){ctx.fillRect(px+b[0],py+b[1],2,3+sv);});

  } else if(tv===T.TREE){
    var cW=[28,26,30,24][pv], cH=[26,28,22,30][pv], cOff=[0,1,-1,2][pv];
    // Drop shadow
    ctx.fillStyle='rgba(0,0,0,.18)';ctx.globalAlpha=1;
    ctx.beginPath();ctx.ellipse(px+ts/2+2,py+cH+4,cW/2,5,0,0,Math.PI*2);ctx.fill();
    // Canopy with top-to-bottom gradient
    var tg=ctx.createLinearGradient(px,py,px,py+cH);
    tg.addColorStop(0,toH(lc));tg.addColorStop(1,toH(dc));
    ctx.fillStyle=tg;ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(px+ts/2+cOff,py+2);ctx.lineTo(px+(ts-cW)/2,py+cH);ctx.lineTo(px+(ts+cW)/2,py+cH);ctx.closePath();ctx.fill();
    // Highlight spot on canopy
    rg(ts/2+cOff-4,8,0,7,toH(lc)+'99','transparent',.3);
    // Trunk
    ctx.fillStyle=toH(dk(dc));ctx.globalAlpha=1;
    ctx.fillRect(px+ts/2-3+cOff,py+cH-2,6,ts-cH+2);

  } else if(tv===T.ROCK){
    var rX=[5,6,4,7][pv],rY=[7,8,6,9][pv],rW=[14,12,16,13][pv],rH=[10,12,9,11][pv];
    ctx.fillStyle='rgba(0,0,0,.2)';ctx.globalAlpha=1;
    ctx.beginPath();ctx.ellipse(px+ts/2+1,py+rY+rH+2,rW/2+1,3,0,0,Math.PI*2);ctx.fill();
    var rgrad=ctx.createRadialGradient(px+rX+3,py+rY+3,1,px+rX+rW/2,py+rY+rH/2,rW/2+2);
    rgrad.addColorStop(0,toH(lc));rgrad.addColorStop(1,toH(dc));
    ctx.fillStyle=rgrad;ctx.globalAlpha=1;ctx.fillRect(px+rX,py+rY,rW,rH);
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.55;ctx.fillRect(px+rX,py+rY+rH-2,rW,2);

  } else if(tv===T.FLOWER){
    var fp=[[8,10,20,20],[6,8,22,18],[10,12,18,22],[8,14,22,16]][pv];
    ctx.globalAlpha=.65;
    ctx.strokeStyle='rgba(80,150,40,.55)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(px+fp[0],py+fp[1]+3);ctx.lineTo(px+fp[0],py+ts-5);ctx.stroke();
    ctx.beginPath();ctx.moveTo(px+fp[2],py+fp[3]+3);ctx.lineTo(px+fp[2],py+ts-5);ctx.stroke();
    ctx.fillStyle='rgba(255,238,68,.75)';ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(px+fp[0],py+fp[1],3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,136,204,.75)';
    ctx.beginPath();ctx.arc(px+fp[2],py+fp[3],3,0,Math.PI*2);ctx.fill();

  } else if(tv===T.VILLAGE_FLOOR||tv===T.STONE_FLOOR||tv===T.STABLES_FLOOR){
    // Diagonal depth gradient
    lg(0,0,ts,ts,toH(lc),toH(dc),.11);
    // Grout lines with per-variant offsets
    var gOff=[0,1,2,-1][pv];
    ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.13;
    [0,ts/2].forEach(function(ox){[0,ts/2].forEach(function(oy){ctx.strokeRect(px+ox+gOff,py+oy,ts/2,ts/2);});});
    // Checkerboard shade
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.09+sv*.03;
    ctx.fillRect(px,py,ts/2,ts/2);ctx.fillRect(px+ts/2,py+ts/2,ts/2,ts/2);
    // Worn spot
    var wsX=[ts*.3,ts*.6,ts*.45,ts*.55][pv], wsY=[ts*.5,ts*.35,ts*.65,ts*.4][pv];
    ctx.beginPath();ctx.arc(px+wsX,py+wsY,2+sv,0,Math.PI*2);
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.07;ctx.fill();

  } else if(tv===T.BUILDING_WALL){
    // Top-lit gradient
    lg(0,0,0,ts,toH(lc),toH(dc),.14);
    // Brick rows with 4 offset variants
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.42;
    var bOff=[0,8,4,12][pv];
    for(var bx=0;bx<2;bx++){for(var by=0;by<3;by++){
      var rowOff=(by%2===0?bOff:bOff/2);
      ctx.fillRect(px+2+bx*15+rowOff,py+3+by*10,12,8);
    }}
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.09;ctx.fillRect(px,py,ts,2);

  } else if(tv===T.DOOR){
    var dg=ctx.createLinearGradient(px+8,py,px+8,py+ts);
    dg.addColorStop(0,toH(dk(col)));dg.addColorStop(.5,toH(col));dg.addColorStop(1,toH(lc));
    ctx.fillStyle=dg;ctx.globalAlpha=1;ctx.fillRect(px+8,py,16,ts);
    // Panels
    ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.4;
    ctx.strokeRect(px+10,py+4,12,ts*.4-2);ctx.strokeRect(px+10,py+ts*.5,12,ts*.35);
    ctx.fillStyle='#ffcc44';ctx.globalAlpha=1;
    ctx.beginPath();ctx.arc(px+20,py+ts/2,2,0,Math.PI*2);ctx.fill();

  } else if(tv===T.PATH||tv===T.DIRT){
    rg(ts/2,ts/2,0,ts*.65,toH(lc),'transparent',.11);
    lg(0,0,0,ts,toH(lc),toH(dc),.07);
    var pebbles=[[[5,10,2],[15,20,2],[24,8,1],[10,26,2]],
                 [[3,15,2],[18,8,1],[26,22,2],[8,5,2]],
                 [[7,6,1],[20,16,2],[12,24,2],[26,10,2]],
                 [[4,20,2],[22,6,1],[14,14,2],[28,24,2]]][pv];
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.22;
    pebbles.forEach(function(p){ctx.beginPath();ctx.arc(px+p[0],py+p[1],p[2],0,Math.PI*2);ctx.fill();});

  } else if(tv===T.CLIFF){
    // Border cliff / ridge: layered rock strata with a lit top edge
    lg(0,0,0,ts,toH(lc),toH(dc),.55);
    ctx.globalAlpha=.45;ctx.fillStyle=toH(dk(dc));
    [5,13,22].forEach(function(y0,ii){ctx.fillRect(px,py+y0+((pv+ii)%3),ts,2);});
    ctx.globalAlpha=.35;ctx.fillStyle=toH(lc);
    [9,18,27].forEach(function(y0,ii){ctx.fillRect(px+((pv*7+ii*11)%20),py+y0,10,1);});
    ctx.globalAlpha=.5;ctx.strokeStyle=toH(dk(dc));ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(px+[6,20,12,26][pv],py);ctx.lineTo(px+[10,16,8,22][pv],py+ts*.5);ctx.lineTo(px+[7,19,13,24][pv],py+ts);ctx.stroke();
  } else if(tv===T.BRIDGE){
    // Plank deck with dark gaps and rail posts
    ctx.globalAlpha=1;ctx.fillStyle=toH(dc);
    for(var bi=0;bi<ts;bi+=6)ctx.fillRect(px,py+bi,ts,1);
    ctx.globalAlpha=.35;ctx.fillStyle=toH(lc);
    for(var bj=2;bj<ts;bj+=6)ctx.fillRect(px+((pv*5+bj)%9),py+bj,ts-10,1);
    ctx.globalAlpha=.6;ctx.fillStyle=toH(dk(dc));
    ctx.fillRect(px+3,py+14,2,2);ctx.fillRect(px+ts-5,py+20,2,2);
  } else if(tv===T.REEF){
    // Sunlit shallows over sand: lighter water, sandy speckle, soft wave lines
    lg(0,0,0,ts,'rgba(120,200,230,.25)','rgba(20,70,130,.35)',.9);
    ctx.fillStyle='rgba(230,215,160,.18)';ctx.globalAlpha=1;
    [[5,7],[19,4],[12,20],[25,24],[8,27]].forEach(function(q,ii){if((ii+pv)%2)ctx.fillRect(px+q[0],py+q[1],3,2);});
    ctx.fillStyle='rgba(200,240,255,.28)';
    var rOff=[0,ts*.12,ts*.06,ts*.18][pv];
    [.28,.66].forEach(function(fy){ctx.fillRect(px+4,py+fy*ts+rOff,ts-8,1.5);});
  } else if(tv===T.OCEAN){
    lg(0,0,0,ts,'rgba(30,80,160,.3)','rgba(6,24,90,.5)',.9);
    ctx.fillStyle='rgba(120,180,255,.22)';ctx.globalAlpha=1;
    var wOff=[0,ts*.15,ts*.08,ts*.2][pv];
    [.3,.62].forEach(function(fy){ctx.fillRect(px,py+fy*ts+wOff,ts,2+pv%2);});

  } else if(tv===T.BEACH){
    lg(0,0,ts,0,toH(lc),toH(col),.22);
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.18+sv*.04;
    ctx.fillRect(px+2,py+2,ts-4,4+pv);

  } else if(tv===T.SHALLOW_WATER){
    lg(0,0,0,ts,'rgba(170,220,255,.28)','rgba(70,150,210,.12)',.85);
    ctx.fillStyle='rgba(200,235,255,.22)';ctx.globalAlpha=1;
    var swOff=[0,ts*.1,ts*.05,ts*.15][pv];
    ctx.fillRect(px,py+ts*.3+swOff,ts,3);ctx.fillRect(px,py+ts*.65+swOff,ts,2);

  } else if(tv===T.DEEP_WATER){
    lg(0,0,0,ts,'rgba(18,48,110,.38)','rgba(4,16,60,.58)',.9);
    ctx.fillStyle='rgba(25,65,150,.3)';ctx.globalAlpha=1;
    var dwOff=[0,ts*.1,ts*.06,ts*.16][pv];
    [.35,.66].forEach(function(fy){ctx.fillRect(px,py+fy*ts+dwOff,ts,3+pv%2);});

  } else if(tv===T.THIN_MAGMA){
    lg(0,ts,0,0,'rgba(255,80,0,.38)','rgba(255,160,0,.18)',.8);
    ctx.fillStyle='rgba(255,110,0,.38)';ctx.globalAlpha=1;
    [.3,.65].forEach(function(fy){ctx.fillRect(px,py+fy*ts,ts,3+pv%2);});

  } else if(tv===T.DEEP_MAGMA){
    lg(0,ts,0,0,'rgba(180,0,0,.48)','rgba(255,50,0,.28)',.9);
    ctx.fillStyle='rgba(220,20,0,.45)';ctx.globalAlpha=1;
    [.25,.54,.76].forEach(function(fy){ctx.fillRect(px,py+fy*ts,ts,3+pv%2);});

  } else if(tv===T.LARGE_BOULDER){
    ctx.fillStyle='rgba(0,0,0,.22)';ctx.globalAlpha=1;
    ctx.beginPath();ctx.ellipse(px+ts/2+2,py+ts*.78,13,5,0,0,Math.PI*2);ctx.fill();
    var bg=ctx.createRadialGradient(px+8,py+9,1,px+ts/2,py+ts/2,15);
    bg.addColorStop(0,toH(lc));bg.addColorStop(1,toH(dc));
    ctx.fillStyle=bg;ctx.globalAlpha=1;ctx.fillRect(px+3,py+6,24,20);
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.85;ctx.fillRect(px+3,py+24,24,2);

  } else if(tv===T.SMALL_BOULDER){
    ctx.fillStyle='rgba(0,0,0,.18)';ctx.globalAlpha=1;
    ctx.beginPath();ctx.ellipse(px+ts/2+1,py+ts*.74,8,3,0,0,Math.PI*2);ctx.fill();
    var sbg=ctx.createRadialGradient(px+10,py+12,1,px+16,py+16,8);
    sbg.addColorStop(0,toH(lc));sbg.addColorStop(1,toH(dc));
    ctx.fillStyle=sbg;ctx.globalAlpha=1;ctx.fillRect(px+8,py+10,14,10);
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.42;ctx.fillRect(px+8,py+19,14,2);

  } else if(tv===T.SAND){
    // Diagonal light-shift + subtle wind-ripple marks
    lg(0,0,ts,ts,toH(lc),toH(dc),.15);
    var sOff=[0,2,-1,3][pv];
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.14+sv*.04;
    [ts*.32,ts*.58,ts*.78].forEach(function(fy){ctx.fillRect(px+2,py+fy+sOff,ts-4,1+(pv%2));});
    // Tiny sparkle specks
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.22+sv*.04;
    [[ts*.2,ts*.3],[ts*.7,ts*.55],[ts*.45,ts*.7],[ts*.8,ts*.2]][pv].forEach(function(pt){ctx.fillRect(px+pt[0],py+pt[1],1,1);});

  } else if(tv===T.REED){
    // Water-tint base + vertical reed stalks with fluffy tips
    ctx.fillStyle='rgba(38,90,55,.4)';ctx.globalAlpha=1;ctx.fillRect(px,py,ts,ts);
    var reedsX=[[4,11,18,24],[3,12,20,26],[6,13,22,28],[5,10,19,25]][pv];
    ctx.globalAlpha=1;
    reedsX.forEach(function(rx,ri){
      var rh=ts*.6+sv*2;
      // Stalk
      ctx.fillStyle=toH(lc);ctx.globalAlpha=.88;
      ctx.fillRect(px+rx,py+ts-rh,2,rh);
      // Shade side
      ctx.fillStyle=toH(dc);ctx.globalAlpha=.45;
      ctx.fillRect(px+rx+1,py+ts-rh+2,1,rh-2);
      // Bulrush tip
      ctx.fillStyle=toH(dk(col));ctx.globalAlpha=.95;
      ctx.fillRect(px+rx-1,py+ts*.12+ri*2,4,7+sv);
      // Highlight top of tip
      ctx.fillStyle=toH(lc);ctx.globalAlpha=.3;
      ctx.fillRect(px+rx-1,py+ts*.12+ri*2,4,2);
    });

  } else if(tv===T.MUD){
    // Mucky base gradient + puddle ring details
    lg(0,0,ts,ts,toH(dc),toH(col),.14);
    var mudPts=[[ts*.28,ts*.38],[ts*.64,ts*.24],[ts*.44,ts*.66],[ts*.22,ts*.60]][pv];
    mudPts.forEach(function(pt,mi){
      var r=3+sv+(mi%2);
      // Puddle fill
      ctx.beginPath();ctx.arc(px+pt[0],py+pt[1],r,0,Math.PI*2);
      ctx.fillStyle=toH(lc);ctx.globalAlpha=.18;ctx.fill();
      // Ring edge
      ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.22;ctx.stroke();
      // Inner shine
      ctx.beginPath();ctx.arc(px+pt[0]-1,py+pt[1]-1,1,0,Math.PI*2);
      ctx.fillStyle='rgba(200,180,140,.3)';ctx.globalAlpha=1;ctx.fill();
    });

  } else if(tv===T.LILY){
    // Water-tint base + floating lily pads
    ctx.fillStyle='rgba(38,110,72,.48)';ctx.globalAlpha=1;ctx.fillRect(px,py,ts,ts);
    lg(0,0,ts,ts,'rgba(60,140,90,.22)','rgba(20,80,50,.12)',.7);
    var lpX=[ts*.38,ts*.54,ts*.26,ts*.60][pv], lpY=[ts*.44,ts*.34,ts*.54,ts*.50][pv];
    // Main pad
    ctx.beginPath();ctx.arc(px+lpX,py+lpY,7+sv,0,Math.PI*2);
    ctx.fillStyle=toH(col);ctx.globalAlpha=.95;ctx.fill();
    ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.38;ctx.stroke();
    // Centre vein lines
    ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.22;
    ctx.beginPath();ctx.moveTo(px+lpX,py+lpY-6-sv);ctx.lineTo(px+lpX,py+lpY+6+sv);ctx.stroke();
    ctx.beginPath();ctx.moveTo(px+lpX-5,py+lpY);ctx.lineTo(px+lpX+5,py+lpY);ctx.stroke();
    // Flower dot
    ctx.beginPath();ctx.arc(px+lpX,py+lpY,2,0,Math.PI*2);
    ctx.fillStyle='#ffeecc';ctx.globalAlpha=.9;ctx.fill();
    // Second smaller pad
    var lp2X=lpX+[9,-10,11,-9][pv], lp2Y=lpY+[-6,8,-5,7][pv];
    ctx.beginPath();ctx.arc(px+lp2X,py+lp2Y,4+sv%2,0,Math.PI*2);
    ctx.fillStyle=toH(lt(col));ctx.globalAlpha=.72;ctx.fill();

  } else if(tv===T.ROCKY_GROUND){
    // Coarse terrain — scattered pebble impressions
    lg(0,0,ts,ts,toH(lc),toH(dc),.11);
    var rpSets=[[[4,12,20,8,24],[6,18,4,24,14]],
                [[3,14,22,10,26],[8,20,6,22,16]],
                [[6,10,18,26,4],[4,16,26,8,18]],
                [[2,16,24,8,20],[10,4,22,18,28]]][pv];
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.22;
    rpSets[0].forEach(function(rx,i){ctx.beginPath();ctx.arc(px+rx,py+rpSets[1][i],1+sv*.6,0,Math.PI*2);ctx.fill();});
    // Larger surface crack
    ctx.strokeStyle=toH(dc);ctx.lineWidth=1;ctx.globalAlpha=.14;
    ctx.beginPath();ctx.moveTo(px+[6,10,4,14][pv],py+8);ctx.lineTo(px+[20,24,18,26][pv],py+20+sv);ctx.stroke();

  } else if(tv===T.GRAVEL){
    // Fine aggregate — dense tiny dot scatter + highlight specks
    lg(0,0,0,ts,toH(lc),toH(dc),.10);
    var gX=[[2,8,14,20,26,5,11,17,23],[1,7,13,19,25,4,10,16,22],[3,9,15,21,5,11,17,23,27],[4,10,16,22,6,12,18,24,2]][pv];
    var gY=[[4,10,6,14,4,20,16,24,12],[6,12,8,16,6,22,18,26,14],[8,4,14,6,24,18,10,22,16],[6,14,8,18,2,24,16,10,28]][pv];
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.26;
    gX.forEach(function(gvx,i){ctx.fillRect(px+gvx,py+gY[i],1+sv%2,1+sv%2);});
    // Highlight micro-specks
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.12;
    gX.slice(0,5).forEach(function(gvx,i){ctx.fillRect(px+gvx+1,py+gY[i]+1,1,1);});

  } else if(tv===T.DRY_GRASS){
    // Pale sun-bleached tufts on baked earth
    rg(ts*.5,ts*.5,0,ts*.62,toH(lc),'transparent',.10);
    var dgBX=[[4,20,14,8,24],[3,22,16,10,26],[5,18,22,8,28],[2,16,20,12,24]][pv];
    var dgBY=[[ts*.62,ts*.5,ts*.75,ts*.44,ts*.66],[ts*.56,ts*.7,ts*.42,ts*.60,ts*.78],
              [ts*.50,ts*.66,ts*.42,ts*.72,ts*.58],[ts*.60,ts*.45,ts*.70,ts*.55,ts*.80]][pv];
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.55+sv*.08;
    dgBX.forEach(function(bx2,i){
      // Main blade
      ctx.fillRect(px+bx2,py+dgBY[i],2,ts*.20+sv);
      // Side blade lean
      ctx.fillRect(px+bx2+2,py+dgBY[i]+2,1,ts*.12);
    });
    // Pale tip highlights
    ctx.fillStyle='rgba(220,210,160,.35)';ctx.globalAlpha=1;
    dgBX.slice(0,3).forEach(function(bx2,i){ctx.fillRect(px+bx2,py+dgBY[i],2,2);});

  } else if(tv===T.DARK_ROCK){
    // Deep volcanic rock — very dark with heat crack veins
    lg(0,0,ts,ts,toH(dk(col)),toH(col),.14);
    ctx.strokeStyle=toH(lc);ctx.lineWidth=1;ctx.globalAlpha=.10+sv*.03;
    var crSets=[[[0,14,8,20],[6,2,18,14]],
                [[4,18,2,22],[8,4,20,16]],
                [[2,16,10,24],[4,16,8,22]],
                [[6,12,20,4],[10,6,24,12]]][pv];
    crSets[0].forEach(function(cx2,i){
      ctx.beginPath();ctx.moveTo(px+cx2,py+crSets[1][i]);
      ctx.lineTo(px+cx2+5+sv,py+crSets[1][i]+5+sv);ctx.stroke();
    });
    // Orange heat glow at base
    ctx.fillStyle='rgba(160,40,0,.10)';ctx.globalAlpha=1;
    ctx.fillRect(px,py+ts-4,ts,4);

  } else if(tv===T.ASH_GROUND){
    // Pale grey ash — soft drift ripples + speck scatter
    lg(0,0,0,ts,toH(lc),toH(dc),.11);
    var ashOff=[0,1,-1,2][pv];
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.14+sv*.04;
    [ts*.26,ts*.50,ts*.72].forEach(function(fy){ctx.fillRect(px+3,py+fy+ashOff,ts-6,1+(pv%2));});
    // Dark ash specks
    ctx.fillStyle=toH(dc);ctx.globalAlpha=.20;
    [[ts*.22,ts*.32],[ts*.70,ts*.52],[ts*.40,ts*.70],[ts*.80,ts*.22]][pv]
      .forEach(function(pt){ctx.fillRect(px+pt[0],py+pt[1],2,2);});
    // Faint top highlight (fine ash layer)
    ctx.fillStyle=toH(lc);ctx.globalAlpha=.08;
    ctx.fillRect(px,py,ts,4+sv);

  } else if(tv===T.OBSIDIAN){
    // Near-black glassy surface with sharp reflective sheen
    lg(0,0,ts*.4,ts*.6,toH(lt(lc)),toH(dc),.38);
    // Glassy highlight streak (diagonal)
    ctx.fillStyle=toH(lt(lc));ctx.globalAlpha=.20+sv*.05;
    var osX=[4,6,3,7][pv];
    ctx.fillRect(px+osX,py+2,3+sv,ts-5);
    // Sharp top bevel
    ctx.fillStyle=toH(lt(lc));ctx.globalAlpha=.12;
    ctx.fillRect(px,py,ts,2);
    // Fracture crack
    ctx.strokeStyle='rgba(80,30,50,.50)';ctx.lineWidth=1;ctx.globalAlpha=1;
    ctx.beginPath();ctx.moveTo(px+[18,14,20,16][pv],py+2);
    ctx.lineTo(px+[14,18,16,20][pv],py+ts*.5);
    ctx.lineTo(px+[22,16,24,20][pv],py+ts-2);ctx.stroke();
  }
  ctx.globalAlpha=1;
}

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

// ─── Island Tile Generator ────────────────────────────────────────────────
function generateIsland(sec,seed){
  var rng=new PRNG((seed||WORLD_SEED)^(sec*0x9e3779b9));
  var tiles=[];
  for(var y=0;y<ISL_H;y++)tiles.push(new Uint8Array(ISL_W));

  // Per-section terrain generators
  var genBySec={
    1:function(x,y){var n1=noise(x,y,6,100+sec),n2=noise(x,y,3,200+sec);return n1>.78?T.TREE:n1>.68?T.ROCK:n2>.85?T.FLOWER:n2<.12?T.DIRT:T.GRASS;},
    2:function(x,y){var n1=noise(x,y,8,100+sec),n2=noise(x,y,4,200+sec);return n1<.28?T.DEEP_WATER:n1<.42?T.SHALLOW_WATER:n1<.50?T.REED:n2>.78?T.MUD:T.GRASS;},
    3:function(x,y){var n1=noise(x,y,9,100+sec),n2=noise(x,y,4,200+sec);return n1<.20?T.DEEP_MAGMA:n1<.38?T.THIN_MAGMA:n2>.80?T.OBSIDIAN:T.DARK_ROCK;},
    4:function(x,y){var n1=noise(x,y,8,100+sec),n2=noise(x,y,4,200+sec);return n1>.76?T.LARGE_BOULDER:n1>.60?T.SMALL_BOULDER:n2>.78?T.GRAVEL:T.ROCKY_GROUND;},
  };
  var genFn=genBySec[sec]||genBySec[1];
  var ALWAYS_BLK_ISL=new Set([T.OCEAN,T.DEEP_WATER,T.ROCK,T.LARGE_BOULDER,T.DEEP_MAGMA,T.TREE]);

  for(var ty=0;ty<ISL_H;ty++){
    for(var tx=0;tx<ISL_W;tx++){
      var d=Math.hypot(tx-ISL_CX,ty-ISL_CY);
      if(d>ISL_R){tiles[ty][tx]=T.OCEAN;continue;}
      var dEdge=ISL_R-d;
      if(dEdge<4){tiles[ty][tx]=T.SAND;continue;}
      if(d<ISL_VIL_R){tiles[ty][tx]=T.GRASS;continue;}
      tiles[ty][tx]=genFn(tx,ty);
    }
  }

  // Village cross paths
  for(var dx=-ISL_VIL_R;dx<=ISL_VIL_R;dx++){var bx=ISL_CX+dx;if(bx>=0&&bx<ISL_W)tiles[ISL_CY][bx]=T.PATH;}
  for(var dy2=-ISL_VIL_R;dy2<=ISL_VIL_R;dy2++){var by2=ISL_CY+dy2;if(by2>=0&&by2<ISL_H)tiles[by2][ISL_CX]=T.PATH;}
  // Widen south path 3 tiles to ensure harbor approach is always clear of trees/rocks
  for(var hy3=ISL_CY;hy3<=ISL_CY+ISL_VIL_R;hy3++){
    for(var hx3=ISL_CX-1;hx3<=ISL_CX+1;hx3++){
      if(hx3>=0&&hx3<ISL_W&&hy3>=0&&hy3<ISL_H){
        var _ht=tiles[hy3][hx3];
        if(_ht===T.TREE||_ht===T.ROCK||_ht===T.LARGE_BOULDER||_ht===T.SMALL_BOULDER)tiles[hy3][hx3]=T.GRASS;
      }
    }
  }

  // Helper: place a small building
  function placeIslBuilding(bx,by,bw,bh){
    for(var dy3=0;dy3<bh;dy3++)for(var dx3=0;dx3<bw;dx3++)tiles[by+dy3][bx+dx3]=T.STONE_FLOOR;
    for(var dx3=0;dx3<bw;dx3++)tiles[by][bx+dx3]=T.BUILDING_WALL;
    for(var dy3=1;dy3<bh-1;dy3++){tiles[by+dy3][bx]=T.BUILDING_WALL;tiles[by+dy3][bx+bw-1]=T.BUILDING_WALL;}
    var doorX=bx+Math.floor(bw/2);
    for(var dx3=0;dx3<bw;dx3++)tiles[by+bh-1][bx+dx3]=(bx+dx3===doorX)?T.DOOR:T.BUILDING_WALL;
  }

  // Harbor (south of village center — leads back to main world)
  placeIslBuilding(ISL_CX-2, ISL_CY+10, 5, 4);
  // Shop (west of center)
  placeIslBuilding(ISL_CX-12, ISL_CY-6, 5, 4);
  // Healing well: just stone tiles (no full building)
  for(var wy=-1;wy<=1;wy++)for(var wx=-1;wx<=1;wx++)tiles[ISL_CY-6+wy][ISL_CX+8+wx]=T.STONE_FLOOR;

  // Adventure spot (clear a small area, east-northeast of center)
  var advX=ISL_CX+10, advY=ISL_CY-10;
  for(var ay=-2;ay<=2;ay++)for(var ax=-2;ax<=2;ax++){
    var atx=advX+ax,aty=advY+ay;
    if(atx>=0&&atx<ISL_W&&aty>=0&&aty<ISL_H)tiles[aty][atx]=T.STONE_FLOOR;
  }

  // Determine blocked set for monster spawn collision
  return{
    tiles:tiles,
    spawnX:(ISL_CX)*TILE, spawnY:(ISL_CY-3)*TILE,
    harborPos:{tx:ISL_CX, ty:ISL_CY+8},   // tile coords of harbor exit (on cross path, before building wall)
    shopPos:{tx:ISL_CX-9, ty:ISL_CY-4},   // tile coords of shop NPC
    wellPos:{tx:ISL_CX+8, ty:ISL_CY-6},   // tile coords of healing well
    advPos:{tx:advX, ty:advY},              // adventure spot tile coords
    blockedFn:function(tx,ty){
      if(tx<0||ty<0||tx>=ISL_W||ty>=ISL_H)return true;
      var t=tiles[ty][tx];
      return ALWAYS_BLK_ISL.has(t)||t===T.BUILDING_WALL;
    },
  };
}

