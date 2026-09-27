// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD SELECTOR (Phase 2 · D1) — walkable 60 × 60-tile quadrant samples
// ║ Terrain is painted as smooth fields (soft blended edges, D4), then
// ║ props become depth-sorted sprites. Runic theme (D3 "medium"): runes on
// ║ stones and ruins that pulse and brighten as you walk near, ley lines
// ║ between landmarks, motes, and a night mode (N) where they glow brighter.
// ═══════════════════════════════════════════════════════════════════════

// ── Runes: a small angular alphabet (unit-square line segments) ──────
var RUNE_GLYPHS=[
  [[.5,0,.5,1],[.5,.2,.85,0],[.5,.45,.85,.25]],            // ᚠ
  [[.3,0,.3,1],[.3,0,.75,.35],[.75,.35,.3,.6]],             // ᚦ-ish
  [[.5,0,.5,1],[.2,.25,.8,.6],[.8,.25,.2,.6]],              // ᛉ/ᛟ blend
  [[.25,0,.25,1],[.75,0,.75,1],[.25,.3,.75,.6]],            // ᚺ
  [[.5,0,.5,1],[.2,.2,.5,.45],[.8,.2,.5,.45]],              // ᛉ
  [[.3,0,.3,1],[.3,.5,.75,.1],[.3,.5,.75,.9]],              // ᚲ/ᛒ
  [[.2,.2,.8,.8],[.8,.2,.2,.8],[.5,0,.5,.2],[.5,.8,.5,1]],  // ᛝ-ish
  [[.5,0,.2,.5],[.2,.5,.5,1],[.5,1,.8,.5],[.8,.5,.5,0]],    // ᛜ (diamond)
  [[.3,0,.3,1],[.3,.15,.75,.35],[.75,.35,.3,.55],[.3,.55,.75,.8]], // ᛒ
  [[.5,0,.5,1],[.5,.35,.2,.1],[.5,.35,.8,.1]]               // ᛘ
];
function drawRune(ctx,cx,cy,size,col,idx,glow){
  var g=RUNE_GLYPHS[((idx%RUNE_GLYPHS.length)+RUNE_GLYPHS.length)%RUNE_GLYPHS.length];
  ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round';
  if(glow!==false){ ctx.shadowColor=col; ctx.shadowBlur=size*0.6; }
  ctx.strokeStyle=col; ctx.lineWidth=Math.max(1.2,size*0.12);
  ctx.beginPath(); g.forEach(function(s){ ctx.moveTo(cx+(s[0]-.5)*size*.7,cy+(s[1]-.5)*size); ctx.lineTo(cx+(s[2]-.5)*size*.7,cy+(s[3]-.5)*size); }); ctx.stroke();
  ctx.restore();
}
function runeRing(ctx,cx,cy,r,col,R,n){
  ctx.save(); ctx.strokeStyle=rgba(col,0.55); ctx.lineWidth=2; ctx.shadowColor=col; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(cx,cy,r*0.72,0,Math.PI*2); ctx.stroke(); ctx.restore();
  n=n||8; for(var i=0;i<n;i++){ var a=i/n*Math.PI*2; drawRune(ctx,cx+Math.cos(a)*r*0.86,cy+Math.sin(a)*r*0.86,r*0.2,col,R.i(0,9)); }
}

// ── The builder ─────────────────────────────────────────────────────────
// Z = { id, name, quad, seed, ground:{kind}, kinds:[{kind}], layout(c), props(c), particles:[], night, hills, extra(c) }
// kind = { id, a, b, c?, sc?, solid?, liquid?, wall?:{top,face}, shore?, deco(ctx,px,py,R,n,x,y,c)?, glow?:{col,a,every} }
function buildWorld(Z, seed){
  var W=Z.w||60, H=Z.h||60, R=rngOf(seed*7919+Z.id.length*131), nz=vnoise(seed*13+7), nz2=vnoise(seed*29+3), m=newMap(W,H);
  var K=[Z.ground].concat(Z.kinds||[]), kidx={}; K.forEach(function(k,i){ kidx[k.id]=i; k._a=hexToRgb(k.a); k._b=hexToRgb(k.b||k.a); });
  var t=new Uint8Array(W*H), c={W:W,H:H,R:R,nz:nz,nz2:nz2,m:m,t:t,K:K,obst:[],ley:[],landmarks:[],occ:new Uint8Array(W*H)};
  c.k=function(id){ return kidx[id]; };
  c.get=function(x,y){ return (x<0||y<0||x>=W||y>=H)?-1:t[y*W+x]; };
  c.is=function(x,y,id){ return c.get(x,y)===kidx[id]; };
  c.set=function(x,y,id,only){ if(x<0||y<0||x>=W||y>=H)return; if(only!==undefined&&!(Array.isArray(only)?only.some(function(o){return c.is(x,y,o);}):c.is(x,y,only)))return; t[y*W+x]=typeof id==='number'?id:kidx[id]; };
  c.solidAt=function(x,y){ var v=c.get(x,y); return v<0||!!K[v].solid; };
  c.blob=function(id,cx,cy,r,jit,only,ry){ ry=ry||r; for(var y=Math.floor(cy-ry-2);y<=cy+ry+2;y++)for(var x=Math.floor(cx-r-2);x<=cx+r+2;x++){ var d=Math.hypot((x-cx)/r,(y-cy)/ry)+(nz(x*0.35,y*0.35)-0.5)*(jit===undefined?0.5:jit); if(d<1)c.set(x,y,id,only); } };
  c.rect=function(id,x0,y0,w,h,only){ for(var y=y0;y<y0+h;y++)for(var x=x0;x<x0+w;x++)c.set(x,y,id,only); };
  c.line=function(id,pts,w,wob,only){ for(var i=0;i<pts.length-1;i++){ var a=pts[i],b=pts[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(L*4);
      for(var s=0;s<=n;s++){ var u=s/n, x=a[0]+(b[0]-a[0])*u, y=a[1]+(b[1]-a[1])*u, px=-(b[1]-a[1])/(L||1), py=(b[0]-a[0])/(L||1), o=(nz(x*0.12+i,y*0.12)-0.5)*(wob||0);
        x+=px*o; y+=py*o; var r=w/2; for(var yy=Math.floor(y-r);yy<=y+r;yy++)for(var xx=Math.floor(x-r);xx<=x+r;xx++){ if(Math.hypot(xx+0.5-x,yy+0.5-y)<=r)c.set(xx,yy,id,only); } } } };
  c.noise=function(id,scale,thr,only,which){ var f=which===1?nz:nz2; for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(f(x*scale,y*scale)>thr)c.set(x,y,id,only); };
  c.ring=function(id,cx,cy,r,w,only){ for(var y=Math.floor(cy-r-w);y<=cy+r+w;y++)for(var x=Math.floor(cx-r-w);x<=cx+r+w;x++){ var d=Math.hypot(x+0.5-cx,y+0.5-cy); if(Math.abs(d-r)<=w/2)c.set(x,y,id,only); } };
  c.open=function(x,y){ return x>=0&&y>=0&&x<W&&y<H&&!K[t[y*W+x]].solid&&!c.occ[y*W+x]; };
  // ── layout ──
  if(Z.layout)Z.layout(c);
  for(var i=0;i<W*H;i++)m.solid[i]=K[t[i]].solid?1:0;
  // spawn: open tile nearest the requested point (default: centre-south)
  var sp=null, want=Z.spawnAt||[W>>1,Math.floor(H*0.62)];
  for(var rr0=0;rr0<30&&!sp;rr0++)for(var yy=want[1]-rr0;yy<=want[1]+rr0&&!sp;yy++)for(var xx=want[0]-rr0;xx<=want[0]+rr0&&!sp;xx++){ if(c.open(xx,yy)&&c.open(xx+1,yy)&&c.open(xx,yy-1))sp={x:xx,y:yy}; }
  if(!sp)sp={x:W>>1,y:H>>1};
  c.sp=sp; m.spawn={x:sp.x*LT+LT/2,y:sp.y*LT+LT-4};
  (function(){ var r0=floodReach(m,sp.x,sp.y); for(var k=0;k<W*H;k++)if(!m.solid[k]&&!r0[k])m.solid[k]=1; })();
  // ── props (placed before painting; reachability kept) ──
  var reachAll=function(){ var s=floodReach(m,sp.x,sp.y); for(var k=0;k<W*H;k++)if(!m.solid[k]&&!s[k])return false; return true; };
  c.place=function(prop,x,y,w,h,o){
    o=o||{}; w=w||1; h=h||1; var solid=o.solid!==false, on=o.on;
    for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){ var X=x+xx,Y=y+yy; if(X<0||Y<0||X>=W||Y>=H)return false;
      if(c.occ[Y*W+X])return false; if(!o.any&&(m.solid[Y*W+X]||K[t[Y*W+X]].solid))return false;
      if(on!==undefined&&!(Array.isArray(on)?on.some(function(q){return c.is(X,Y,q);}):c.is(X,Y,on)))return false;
      if(solid&&Math.abs(X-sp.x)<3&&Math.abs(Y-sp.y)<3)return false; }
    if(solid){ for(var a=0;a<h;a++)for(var b=0;b<w;b++)m.solid[(y+a)*W+x+b]=1;
      if(!o.noReach&&!reachAll()){ for(var a2=0;a2<h;a2++)for(var b2=0;b2<w;b2++)m.solid[(y+a2)*W+x+b2]=0; return false; } }
    if(o.claim!==false)for(var a3=0;a3<h;a3++)for(var b3=0;b3<w;b3++)c.occ[(y+a3)*W+x+b3]=1;
    c.obst.push({prop:prop,x:x,y:y,w:w,h:h,o:o}); return true;
  };
  c.randomOpen=function(on,tries){ for(var q=0;q<(tries||300);q++){ var x=R.i(1,W-2),y=R.i(1,H-2); if(!c.open(x,y)||m.solid[y*W+x])continue; if(on!==undefined&&!(Array.isArray(on)?on.some(function(z){return c.is(x,y,z);}):c.is(x,y,on)))continue; return {x:x,y:y}; } return null; };
  c.scatter=function(prop,n,o){ o=o||{}; var got=0; for(var q=0;q<n*6&&got<n;q++){ var p=c.randomOpen(o.on); if(!p)continue; if(o.away&&Math.hypot(p.x-o.away[0],p.y-o.away[1])<o.away[2])continue; if(c.place(prop,p.x,p.y,o.w||1,o.h||1,Object.assign({},o,{v:R.f()})))got++; } return got; };
  c.landmark=function(x,y,w,h,text){ c.landmarks.push({x:x,y:y,w:w,h:h,text:text}); };
  c.leyLine=function(pts,col){ c.ley.push({pts:pts,col:col||Z.runeCol||'#6fe3f5'}); };
  if(Z.props)Z.props(c);
  // ── paint: ground field at 4 samples/tile, upscaled smoothly → soft terrain edges ──
  var S=8, lo=mkCanvas(W*S,H*S), lx=lo.getContext('2d'), img=lx.createImageData(W*S,H*S), d=img.data, hills=Z.hills;
  var hgt=hills?function(x,y){ return nz(x*hills.sc,y*hills.sc)+nz2(x*hills.sc*2.3,y*hills.sc*2.3)*0.35; }:null;
  // Soft, organic terrain edges: warp the lookup with noise, then blend the 4 nearest
  // tile colours bilinearly. Liquids get a pale shoreline where they meet land.
  var tcol=new Float32Array(W*H*3), liq=new Float32Array(W*H);
  var colAt=function(k,fx,fy){ var n=nz(fx*(k.sc||0.18),fy*(k.sc||0.18)), tt=Math.min(1,Math.max(0,n*1.15-0.05)); return [k._a[0]+(k._b[0]-k._a[0])*tt,k._a[1]+(k._b[1]-k._a[1])*tt,k._a[2]+(k._b[2]-k._a[2])*tt]; };
  for(var py=0;py<H*S;py++)for(var px=0;px<W*S;px++){
    var fx=px/S, fy=py/S, wx=fx+(nz2(fx*0.55,fy*0.55)-0.5)*1.3-0.5, wy=fy+(nz2(fx*0.55+40,fy*0.55+40)-0.5)*1.3-0.5;
    var x0=Math.floor(wx), y0=Math.floor(wy), ax=wx-x0, ay=wy-y0, r=0,g=0,b=0,wl=0, shoreCol=null;
    for(var j=0;j<2;j++)for(var i=0;i<2;i++){
      var X=Math.min(W-1,Math.max(0,x0+i)), Y=Math.min(H-1,Math.max(0,y0+j)), wgt=(i?ax:1-ax)*(j?ay:1-ay), k=K[t[Y*W+X]], cc=colAt(k,fx,fy);
      r+=cc[0]*wgt; g+=cc[1]*wgt; b+=cc[2]*wgt; if(k.liquid){ wl+=wgt; if(k.shore)shoreCol=k._shore||(k._shore=hexToRgb(k.shore)); }
    }
    var n2=nz2(fx*0.9,fy*0.9), f=1+(n2-0.5)*0.12;
    if(hgt&&wl<0.5){ var sh=(hgt(fx-0.6,fy-0.6)-hgt(fx+0.6,fy+0.6))*hills.k; f*=1+sh; }
    if(shoreCol&&wl>0.3&&wl<0.7){ var e=1-Math.abs(wl-0.5)/0.2; e=Math.max(0,Math.min(1,e))*0.55; r+=(shoreCol[0]-r)*e; g+=(shoreCol[1]-g)*e; b+=(shoreCol[2]-b)*e; }
    var i4=(py*W*S+px)*4; d[i4]=Math.min(255,r*f); d[i4+1]=Math.min(255,g*f); d[i4+2]=Math.min(255,b*f); d[i4+3]=255;
  }
  lx.putImageData(img,0,0);
  var cv=mkCanvas(W*LT,H*LT), ctx=cv.getContext('2d');
  ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high'; ctx.drawImage(lo,0,0,W*LT,H*LT);
  // per-tile decoration + liquids' shorelines
  for(var y4=0;y4<H;y4++)for(var x4=0;x4<W;x4++){
    var kk=K[t[y4*W+x4]], p4x=x4*LT, p4y=y4*LT;
    if(kk.deco)kk.deco(ctx,p4x,p4y,R,nz(x4*0.2,y4*0.2),x4,y4,c);
    if(kk.liquid){
      var nb=[[0,-1],[0,1],[-1,0],[1,0]].filter(function(q){ var v=c.get(x4+q[0],y4+q[1]); return v>=0&&!K[v].liquid; });
      if(false&&nb.length&&kk.shore){ ctx.strokeStyle=rgba(kk.shore,0.55); ctx.lineWidth=2; nb.forEach(function(q){ ctx.beginPath(); if(q[1]===-1){ctx.moveTo(p4x+2,p4y+3);ctx.lineTo(p4x+LT-2,p4y+3);} else if(q[1]===1){ctx.moveTo(p4x+2,p4y+LT-3);ctx.lineTo(p4x+LT-2,p4y+LT-3);} else if(q[0]===-1){ctx.moveTo(p4x+3,p4y+2);ctx.lineTo(p4x+3,p4y+LT-2);} else {ctx.moveTo(p4x+LT-3,p4y+2);ctx.lineTo(p4x+LT-3,p4y+LT-2);} ctx.stroke(); }); }
      if(R.chance(0.08)){ ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(p4x+R.f()*20,p4y+R.f()*26,8+R.f()*8,1.5); }
    }
    if(kk.glow&&R.chance(1/(kk.glow.every||6))&&m.lights.length<220)addLight(m,p4x+16,p4y+16,kk.glow.r||90,kk.glow.col,kk.glow.a||0.35,{pulse:0.3,period:1800+R.i(0,1500),depth:-4,noCut:!!kk.glow.noCut});
  }
  // walls: 3/4 view top + face
  for(var y5=0;y5<H;y5++)for(var x5=0;x5<W;x5++){
    var kw=K[t[y5*W+x5]]; if(!kw.wall)continue;
    var p5x=x5*LT, p5y=y5*LT, below=c.get(x5,y5+1), faceOpen=below>=0&&!K[below].wall, top=faceOpen?10:LT;
    var edge=false; for(var j5=-1;j5<=1&&!edge;j5++)for(var i5=-1;i5<=1;i5++){ var v5=c.get(x5+i5,y5+j5); if(v5>=0&&!K[v5].wall){edge=true;break;} }
    if(!edge){ var nn=nz(x5*0.25,y5*0.25); ctx.fillStyle=shade(kw.wall.top,-0.1+nn*0.12); ctx.fillRect(p5x,p5y,LT,LT); for(var q6=0;q6<3;q6++){ ctx.fillStyle=rgba(shade(kw.wall.top,R.chance(0.5)?0.15:-0.25),0.45); ctx.fillRect(p5x+R.f()*28,p5y+R.f()*28,4,2); } continue; }
    var gg=ctx.createLinearGradient(p5x,p5y,p5x,p5y+top); gg.addColorStop(0,shade(kw.wall.top,0.12)); gg.addColorStop(1,kw.wall.top); ctx.fillStyle=gg; ctx.fillRect(p5x,p5y,LT,top);
    for(var q5=0;q5<3;q5++){ ctx.fillStyle=rgba(shade(kw.wall.top,R.chance(0.5)?0.2:-0.2),0.5); ctx.fillRect(p5x+R.f()*28,p5y+R.f()*Math.max(1,top-3),4,2); }
    if(faceOpen){ var fg=ctx.createLinearGradient(p5x,p5y+top,p5x,p5y+LT); fg.addColorStop(0,kw.wall.face); fg.addColorStop(1,shade(kw.wall.face,-0.38)); ctx.fillStyle=fg; ctx.fillRect(p5x,p5y+top,LT,LT-top);
      if(kw.wall.strata){ ctx.fillStyle=rgba(shade(kw.wall.face,-0.3),0.5); ctx.fillRect(p5x,p5y+top+6,LT,2); ctx.fillRect(p5x,p5y+top+14,LT,1); }
      var sg=ctx.createLinearGradient(0,p5y+LT,0,p5y+LT+12); sg.addColorStop(0,'rgba(0,0,0,.32)'); sg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=sg; ctx.fillRect(p5x,p5y+LT,LT,12);
      if(kw.wall.runes&&R.chance(kw.wall.runes)){ drawRune(ctx,p5x+16,p5y+top+(LT-top)/2,12,Z.runeCol||'#6fe3f5',R.i(0,9)); addLight(m,p5x+16,p5y+top+(LT-top)/2,56,Z.runeCol||'#6fe3f5',0.35,{react:true,rune:true}); }
    }
  }
  // ley lines (one additive overlay, gently pulsing)
  if(c.ley.length){
    var lc=mkCanvas(W*LT,H*LT), l2=lc.getContext('2d'); l2.lineCap='round'; l2.lineJoin='round';
    c.ley.forEach(function(L){ [[14,0.10],[7,0.22],[2.5,0.75]].forEach(function(s){ l2.strokeStyle=rgba(L.col,s[1]); l2.lineWidth=s[0]; l2.beginPath(); L.pts.forEach(function(p,i){ var X=p[0]*LT+16,Y=p[1]*LT+16; if(i)l2.lineTo(X,Y); else l2.moveTo(X,Y); }); l2.stroke(); });
      for(var q6=0;q6<L.pts.length-1;q6++){ var a6=L.pts[q6],b6=L.pts[q6+1]; for(var u=0.25;u<1;u+=0.5)addLight(m,(a6[0]+(b6[0]-a6[0])*u)*LT+16,(a6[1]+(b6[1]-a6[1])*u)*LT+16,50,L.col,0.28,{pulse:0.5,period:2400,depth:-4,noCut:true}); } });
    m.shafts.push({canvas:lc,x:0,y:0,a:0.85,sway:true});
  }
  // obstacles / props
  var P=Z.pal||{};
  c.obst.forEach(function(ob){ var fn=WPROP[ob.prop]||(Z.draw&&Z.draw[ob.prop]); if(fn)fn(c,ctx,ob.x*LT,ob.y*LT,ob.w*LT,ob.h*LT,ob.o,P); });
  c.landmarks.forEach(function(L){ addLabel(m,L.x,L.y,L.w,L.h,L.text); });
  if(Z.extra)Z.extra(c,ctx);
  (Z.particles||[]).forEach(function(p){ m.particles.push(p); });
  m.base=cv; m.bg=Z.bg||'#0b0e1a'; m.dark=0; m.night={a:Z.nightA||0.62,col:Z.nightCol||'#060a1c'};
  m.heroLight=Z.heroLight||190; m.heroLightCol=Z.heroLightCol||'#ffd9a0';
  var openN=0; for(var k7=0;k7<W*H;k7++)if(!m.solid[k7])openN++;
  m.stats={open:openN,props:c.obst.length,runes:m.lights.filter(function(L){return L.rune;}).length};
  m.tick=Z.tick||null;
  return m;
}

// ── Shared painters ─────────────────────────────────────────────────────
function wTree(c,x,y,w,h,o){
  var m=c.m, R=c.R, kind=o.kind||'round', s=o.s||(0.9+(o.v||0.5)*0.4), col=o.col||'#3f7a3a', col2=o.col2||shade(col,0.25), cw=Math.round(110*s), ch=Math.round(150*s);
  addSprite(m,x+w/2,y+h,cw,ch,function(ctx,W,H){
    softShadow(ctx,W/2,H-6,30*s,9*s,0.35);
    var tr=o.trunk||'#5b4028';
    if(kind==='dead'||kind==='ash'){ ctx.strokeStyle=tr; ctx.lineCap='round'; var br=function(x0,y0,a,l,wd,dep){ if(dep>4||l<6)return; var x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l; ctx.lineWidth=wd; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y1); ctx.stroke(); br(x1,y1,a-0.45-R.f()*0.2,l*0.72,wd*0.65,dep+1); br(x1,y1,a+0.4+R.f()*0.2,l*0.68,wd*0.65,dep+1); }; br(W/2,H-6,-Math.PI/2,42*s,8*s,0);
      if(kind==='ash'){ ctx.fillStyle='rgba(220,220,225,.6)'; for(var i=0;i<14;i++){ ctx.fillRect(W/2-30*s+R.f()*60*s,H-110*s+R.f()*70*s,4,2); } } return; }
    if(kind==='stone'){ ctx.fillStyle='#8d8a84'; ctx.fillRect(W/2-6*s,H-60*s,12*s,56*s); ctx.strokeStyle='#6e6b66'; ctx.lineWidth=5*s; ctx.beginPath(); ctx.moveTo(W/2,H-50*s); ctx.lineTo(W/2-26*s,H-92*s); ctx.moveTo(W/2,H-58*s); ctx.lineTo(W/2+24*s,H-100*s); ctx.moveTo(W/2,H-62*s); ctx.lineTo(W/2+4*s,H-118*s); ctx.stroke(); ctx.fillStyle='rgba(60,58,54,.5)'; for(var q=0;q<6;q++)ctx.fillRect(W/2-6*s,H-60*s+q*9*s,12*s,2); return; }
    if(kind==='mangrove'){ ctx.strokeStyle=tr; ctx.lineWidth=3*s; for(var r=0;r<6;r++){ ctx.beginPath(); ctx.moveTo(W/2,H-40*s); ctx.quadraticCurveTo(W/2+(r-2.5)*14*s,H-30*s,W/2+(r-2.5)*16*s,H-4); ctx.stroke(); } ctx.fillStyle=tr; ctx.fillRect(W/2-5*s,H-70*s,10*s,32*s);
      if(o.glowRoots){ ctx.strokeStyle=rgba(o.glowRoots,0.8); ctx.lineWidth=1.5; ctx.shadowColor=o.glowRoots; ctx.shadowBlur=8; for(var r2=0;r2<6;r2++){ ctx.beginPath(); ctx.moveTo(W/2,H-38*s); ctx.quadraticCurveTo(W/2+(r2-2.5)*14*s,H-28*s,W/2+(r2-2.5)*16*s,H-6); ctx.stroke(); } ctx.shadowBlur=0; } }
    else { ctx.fillStyle=tr; ctx.beginPath(); ctx.moveTo(W/2-6*s,H-4); ctx.lineTo(W/2-3*s,H-60*s); ctx.lineTo(W/2+3*s,H-60*s); ctx.lineTo(W/2+6*s,H-4); ctx.fill(); }
    if(kind==='pine'){ for(var p=0;p<4;p++){ var yy=H-40*s-p*22*s, ww=(34-p*7)*s; ctx.fillStyle=p%2?col:col2; ctx.beginPath(); ctx.moveTo(W/2,yy-30*s); ctx.lineTo(W/2+ww,yy); ctx.lineTo(W/2-ww,yy); ctx.fill(); } return; }
    if(kind==='willow'){ var g=ctx.createRadialGradient(W/2,H-100*s,4,W/2,H-90*s,52*s); g.addColorStop(0,col2); g.addColorStop(1,col); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(W/2,H-96*s,50*s,30*s,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=rgba(col,0.9); ctx.lineWidth=2; for(var v=0;v<22;v++){ var vx=W/2-46*s+v*4.4*s; ctx.beginPath(); ctx.moveTo(vx,H-90*s); ctx.quadraticCurveTo(vx+3,H-50*s,vx+R.f()*6-3,H-(18+R.f()*22)*s); ctx.stroke(); } return; }
    // round / blossom / mangrove canopy: clustered puffs
    var cy=kind==='mangrove'?H-84*s:H-82*s;
    for(var b=0;b<7;b++){ var bx=W/2+(R.f()-0.5)*56*s, by=cy+(R.f()-0.5)*34*s, br2=(20+R.f()*12)*s, gr=ctx.createRadialGradient(bx-br2*0.3,by-br2*0.4,2,bx,by,br2); gr.addColorStop(0,col2); gr.addColorStop(1,col); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(bx,by,br2,0,Math.PI*2); ctx.fill(); }
    if(kind==='blossom'){ for(var f=0;f<40;f++){ ctx.fillStyle=R.chance(0.5)?'#ffd6e8':'#ff9fc8'; ctx.beginPath(); ctx.arc(W/2+(R.f()-0.5)*80*s,cy+(R.f()-0.5)*50*s,2.2,0,Math.PI*2); ctx.fill(); } }
    if(o.fruitGlow){ for(var fg=0;fg<6;fg++){ ctx.fillStyle=o.fruitGlow; ctx.beginPath(); ctx.arc(W/2+(R.f()-0.5)*60*s,cy+(R.f()-0.3)*40*s,2.5,0,Math.PI*2); ctx.fill(); } }
  });
  if(o.glowRoots)addLight(m,x+w/2,y+h-4,70*s,o.glowRoots,0.4,{pulse:0.35,period:2000+R.i(0,1500),depth:-4});
}
function wStone(c,x,y,w,h,o){ // runic standing stone
  var m=c.m,R=c.R, col=o.col||'#8b8f96', rc=o.rune||'#6fe3f5', hh=(o.tall||60)+R.i(0,24), ri=R.i(0,9);
  addSprite(m,x+w/2,y+h,40,hh+20,function(ctx,W,H){ softShadow(ctx,W/2,H-5,15,5,0.4);
    var g=ctx.createLinearGradient(W/2-12,0,W/2+12,0); g.addColorStop(0,shade(col,0.12)); g.addColorStop(1,shade(col,-0.3)); ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(W/2-12,H-4); ctx.lineTo(W/2-9,H-hh+6); ctx.quadraticCurveTo(W/2,H-hh-4,W/2+9,H-hh+8); ctx.lineTo(W/2+12,H-4); ctx.fill();
    ctx.fillStyle='rgba(90,130,70,.45)'; ctx.fillRect(W/2-12,H-14,24,6);
    drawRune(ctx,W/2,H-hh*0.55,16,rc,ri); });
  addLight(m,x+w/2,y+h-hh*0.55,64,rc,0.38,{react:true,rune:true});
}
function wRuneCircle(c,ctx,x,y,w,h,o){ var cx=x+w/2, cy=y+h/2, r=Math.min(w,h)/2-4, col=o.col||'#6fe3f5'; runeRing(ctx,cx,cy,r,col,c.R,o.n||8); addLight(c.m,cx,cy,r*1.6,col,0.35,{react:true,rune:true,depth:-4}); }
function wRock(c,x,y,w,h,o){ var m=c.m,R=c.R,col=o.col||'#7b7468', rad=Math.max(w,h)/2; addSprite(m,x+w/2,y+h,w+24,h+30,function(ctx,W,H){ rockBlob(ctx,W/2,H-rad*0.75-4,rad+2,col,R); if(o.moss){ ctx.fillStyle=rgba(o.moss,0.55); ctx.beginPath(); ctx.ellipse(W/2-4,H-rad*1.3,rad*0.6,rad*0.25,0,0,Math.PI*2); ctx.fill(); } if(o.rune)drawRune(ctx,W/2,H-rad*0.9,rad*0.7,o.rune,R.i(0,9)); }); if(o.rune)addLight(m,x+w/2,y+h-rad,50,o.rune,0.3,{react:true,rune:true}); }
function wCrystal(c,x,y,w,h,o){ var m=c.m,R=c.R,col=o.col||'#8fdcff', s=o.s||1; addSprite(m,x+w/2,y+h,50*s,90*s,function(ctx,W,H){ softShadow(ctx,W/2,H-4,14*s,4,0.4); for(var i=0;i<4;i++){ var ox=(i-1.5)*7*s, hh=(24+R.f()*34)*s; var g=ctx.createLinearGradient(W/2+ox-5,0,W/2+ox+5,0); g.addColorStop(0,rgba(col,0.95)); g.addColorStop(0.5,'rgba(255,255,255,.95)'); g.addColorStop(1,rgba(shade(col,-0.3),0.95)); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(W/2+ox,H-4-hh); ctx.lineTo(W/2+ox+6*s,H-10); ctx.lineTo(W/2+ox,H-3); ctx.lineTo(W/2+ox-6*s,H-10); ctx.closePath(); ctx.fill(); } }); addLight(m,x+w/2,y+h-20*s,90*s,col,0.45,{pulse:0.35,period:1700+R.i(0,1200)}); }
function wFlat(fn){ return function(c,ctx,x,y,w,h,o,P){ fn(ctx,x,y,w,h,o,c.R,c,P); }; }
function wSprite(fn,wpad,hpad){ return function(c,ctx,x,y,w,h,o,P){ addSprite(c.m,x+w/2,y+h,w+(wpad||20),h+(hpad||60),function(g,W,H){ fn(g,W,H,w,h,o,c.R,P); }); }; }
function wColumn(c,x,y,w,h,o){ var col=o.col||'#cfc8b8', br=o.broken?30+c.R.i(0,30):96; addSprite(c.m,x+w/2,y+h,40,120,function(ctx,W,H){ softShadow(ctx,W/2,H-4,15,5,0.4); var g=ctx.createLinearGradient(W/2-10,0,W/2+10,0); g.addColorStop(0,shade(col,-0.2)); g.addColorStop(0.45,shade(col,0.15)); g.addColorStop(1,shade(col,-0.35)); ctx.fillStyle=g; ctx.fillRect(W/2-10,H-br-4,20,br); ctx.fillStyle=shade(col,0.05); ctx.fillRect(W/2-13,H-10,26,6); if(!o.broken){ ctx.fillRect(W/2-13,H-br-10,26,7);} else { ctx.fillStyle=shade(col,-0.1); ctx.beginPath(); ctx.moveTo(W/2-10,H-br-4); ctx.lineTo(W/2-2,H-br-12); ctx.lineTo(W/2+4,H-br-2); ctx.lineTo(W/2+10,H-br-8); ctx.lineTo(W/2+10,H-br-4); ctx.fill(); } if(o.moss){ ctx.fillStyle='rgba(90,140,70,.55)'; ctx.fillRect(W/2-10,H-br*0.4,20,6);} if(o.rune)drawRune(ctx,W/2,H-br*0.55,12,o.rune,c.R.i(0,9)); }); if(o.rune)addLight(c.m,x+w/2,y+h-br*0.55,50,o.rune,0.3,{react:true,rune:true}); }
function wWall(c,x,y,w,h,o){ var col=o.col||'#a59c88', R=c.R; addSprite(c.m,x+w/2,y+h,w+6,h+44,function(ctx,W,H){ var top=H-h-38; ctx.fillStyle=shade(col,-0.25); ctx.fillRect(3,top+12,w,h+24); ctx.fillStyle=shade(col,0.05); ctx.fillRect(3,top,w,14); for(var i=0;i<w;i+=16){ ctx.fillStyle='rgba(0,0,0,.18)'; ctx.fillRect(3+i,top+12,1,h+24);} for(var j=0;j<3;j++)ctx.clearRect(3+R.f()*w,top-2,8+R.f()*10,6+R.f()*8); if(o.moss){ for(var k=0;k<5;k++){ ctx.fillStyle='rgba(90,140,70,.5)'; ctx.fillRect(3+R.f()*(w-8),top+R.f()*10,10,4);} } if(o.char){ ctx.fillStyle='rgba(20,10,5,.55)'; ctx.fillRect(3,top,w,h+36); } if(o.rune)drawRune(ctx,3+w/2,top+18,12,o.rune,R.i(0,9)); }); if(o.rune)addLight(c.m,x+w/2,y-8,50,o.rune,0.3,{react:true,rune:true}); }
function wBoneRib(c,x,y,w,h,o){ var s=o.s||1; addSprite(c.m,x+w/2,y+h,70*s,130*s,function(ctx,W,H){ ctx.strokeStyle=o.col||'#e6dcc4'; ctx.lineWidth=7*s; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(W/2-2,H-4); ctx.quadraticCurveTo(W/2-(o.flip?-22:22)*s,H-70*s,W/2+(o.flip?-8:8)*s,H-118*s); ctx.stroke(); if(o.moss){ ctx.strokeStyle='rgba(95,150,80,.65)'; ctx.lineWidth=4*s; ctx.beginPath(); ctx.moveTo(W/2-4,H-20*s); ctx.quadraticCurveTo(W/2-(o.flip?-18:18)*s,H-60*s,W/2-(o.flip?-14:14)*s,H-80*s); ctx.stroke(); } }); }
function wSkull(c,x,y,w,h,o){ var s=o.s||1.4, col=o.col||'#e6dcc4'; addSprite(c.m,x+w/2,y+h,110*s,90*s,function(ctx,W,H){ softShadow(ctx,W/2,H-6,40*s,9*s,0.45); ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(W/2,H-36*s,34*s,27*s,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(W/2-20*s,H-20*s,40*s,15*s); ctx.fillStyle='#1a1410'; ctx.beginPath(); ctx.ellipse(W/2-13*s,H-38*s,8*s,9*s,0,0,Math.PI*2); ctx.ellipse(W/2+13*s,H-38*s,8*s,9*s,0,0,Math.PI*2); ctx.fill(); for(var i=-3;i<=3;i++)ctx.fillRect(W/2+i*5*s-1,H-17*s,2,8*s); if(o.moss){ ctx.fillStyle='rgba(95,150,80,.6)'; ctx.beginPath(); ctx.ellipse(W/2-8*s,H-58*s,20*s,8*s,0,0,Math.PI*2); ctx.fill(); } }); if(o.eye)addLight(c.m,x+w/2-13*s,y+h-38*s,34,o.eye,0.55,{pulse:0.5}); }
function wHut(c,x,y,w,h,o){ var R=c.R, roof=o.roof||'#7a4b32', wall=o.wall||'#b89a72'; addSprite(c.m,x+w/2,y+h+(o.stilts?10:0),w+20,h+80,function(ctx,W,H){ var bh=H-(o.stilts?22:6); if(o.stilts){ ctx.fillStyle='#4a3622'; for(var i=0;i<4;i++)ctx.fillRect(10+i*(W-24)/3,bh,4,20); } softShadow(ctx,W/2,bh,W/2-6,7,0.3); ctx.fillStyle=wall; ctx.fillRect(10,bh-h+10,W-20,h-12); ctx.fillStyle=shade(wall,-0.35); ctx.fillRect(W/2-6,bh-22,12,20); ctx.fillStyle='#ffd27a'; ctx.fillRect(16,bh-h+20,8,8); ctx.fillStyle=roof; ctx.beginPath(); ctx.moveTo(2,bh-h+14); ctx.lineTo(W/2,bh-h-28); ctx.lineTo(W-2,bh-h+14); ctx.fill(); ctx.fillStyle=shade(roof,-0.25); ctx.fillRect(2,bh-h+12,W-4,4); }); if(o.lit!==false)addLight(c.m,x+16,y+h-h*0.4,50,'#ffc870',0.35,{flicker:0.3}); }
function wLantern(c,x,y,w,h,o){ var col=o.col||'#ffcf70'; addSprite(c.m,x+w/2,y+h,20,70,function(ctx,W,H){ ctx.fillStyle='#3a3026'; ctx.fillRect(W/2-1.5,H-60,3,56); ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(W/2,H-60,5,7,0,0,Math.PI*2); ctx.fill(); }); addLight(c.m,x+w/2,y+h-60,80,col,0.45,{flicker:0.25}); }
function wParticlesAt(c,x,y,w,h,p){ c.m.particles.push(Object.assign({area:{x:x,y:y,w:w,h:h}},p)); }
var WPROP={
  tree:function(c,ctx,x,y,w,h,o){ wTree(c,x,y,w,h,o); },
  stone:function(c,ctx,x,y,w,h,o){ wStone(c,x,y,w,h,o); },
  rock:function(c,ctx,x,y,w,h,o){ wRock(c,x,y,w,h,o); },
  crystal:function(c,ctx,x,y,w,h,o){ wCrystal(c,x,y,w,h,o); },
  column:function(c,ctx,x,y,w,h,o){ wColumn(c,x,y,w,h,o); },
  wall:function(c,ctx,x,y,w,h,o){ wWall(c,x,y,w,h,o); },
  rib:function(c,ctx,x,y,w,h,o){ wBoneRib(c,x,y,w,h,o); },
  skull:function(c,ctx,x,y,w,h,o){ wSkull(c,x,y,w,h,o); },
  hut:function(c,ctx,x,y,w,h,o){ wHut(c,x,y,w,h,o); },
  lantern:function(c,ctx,x,y,w,h,o){ wLantern(c,x,y,w,h,o); },
  runecircle:function(c,ctx,x,y,w,h,o){ wRuneCircle(c,ctx,x,y,w,h,o); },
  runeglyph:wFlat(function(ctx,x,y,w,h,o,R,c){ drawRune(ctx,x+w/2,y+h/2,o.size||18,o.col||'#6fe3f5',R.i(0,9)); addLight(c.m,x+w/2,y+h/2,o.r||48,o.col||'#6fe3f5',0.33,{react:true,rune:true,depth:-4}); }),
  flowers:wFlat(function(ctx,x,y,w,h,o,R){ var cols=o.cols||['#ffd6e8','#fff3a8','#c9b8ff']; for(var i=0;i<(o.n||14)*w/LT;i++){ ctx.fillStyle=R.pick(cols); var fx=x+R.f()*w, fy=y+R.f()*h; ctx.beginPath(); ctx.arc(fx,fy,2+R.f()*1.5,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,230,120,.8)'; ctx.fillRect(fx-0.5,fy-0.5,1,1);} }),
  tuft:wFlat(function(ctx,x,y,w,h,o,R){ ctx.strokeStyle=o.col||'#5e9a48'; ctx.lineWidth=1.5; for(var i=0;i<9;i++){ var bx=x+6+R.f()*(w-12), by=y+h-6; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx+R.f()*6-3,by-8-R.f()*8); ctx.stroke(); } }),
  pebbles:wFlat(function(ctx,x,y,w,h,o,R){ for(var i=0;i<6;i++){ ctx.fillStyle=R.pick(o.cols||['#8a8378','#6f695f','#a39b8e']); ctx.beginPath(); ctx.ellipse(x+R.f()*w,y+R.f()*h,2+R.f()*3,1.5+R.f()*2,0,0,Math.PI*2); ctx.fill(); } }),
  planks:wFlat(function(ctx,x,y,w,h,o,R){ var col=o.col||'#8a6a44'; for(var i=0;i<(o.vert?h:w);i+=8){ ctx.fillStyle=shade(col,(R.f()-0.5)*0.25); if(o.vert)ctx.fillRect(x+3,y+i,w-6,7); else ctx.fillRect(x+i,y+3,7,h-6); } ctx.fillStyle='rgba(0,0,0,.25)'; if(o.vert){ ctx.fillRect(x+2,y,2,h); ctx.fillRect(x+w-4,y,2,h);} else { ctx.fillRect(x,y+2,w,2); ctx.fillRect(x,y+h-4,w,2);} }),
  lilypad:wFlat(function(ctx,x,y,w,h,o,R){ for(var i=0;i<(o.n||3);i++){ var cx=x+6+R.f()*(w-12), cy=y+6+R.f()*(h-12), r=5+R.f()*6; ctx.fillStyle=R.pick(['#3f7a3a','#4f8a44','#356a32']); ctx.beginPath(); ctx.arc(cx,cy,r,0.3,Math.PI*2); ctx.lineTo(cx,cy); ctx.fill(); } }),
  mushring:function(c,ctx,x,y,w,h,o){ var cx=x+w/2, cy=y+h/2, r=Math.min(w,h)/2-6, n=o.n||12, col=o.col||'#e8a6ff', R=c.R; ctx.strokeStyle=rgba('#1e3a1c',0.35); ctx.lineWidth=6; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); if(o.rune)runeRing(ctx,cx,cy,r*0.62,o.rune,R,6);
    for(var i=0;i<n;i++){ var a=i/n*Math.PI*2, mx=cx+Math.cos(a)*r, my=cy+Math.sin(a)*r*0.9; addSprite(c.m,mx,my+8,36,40,function(g,W,H){ g.fillStyle='rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(W/2,H-3,9,3,0,0,Math.PI*2); g.fill(); g.fillStyle='#efe6d2'; g.fillRect(W/2-3,H-18,6,16); var gr=g.createRadialGradient(W/2-3,H-22,1,W/2,H-18,14); gr.addColorStop(0,shade(col,0.45)); gr.addColorStop(1,col); g.fillStyle=gr; g.beginPath(); g.ellipse(W/2,H-18,13,8,0,Math.PI,0); g.fill(); g.fillStyle='rgba(255,255,255,.7)'; g.beginPath(); g.arc(W/2-5,H-22,1.6,0,Math.PI*2); g.arc(W/2+4,H-24,1.3,0,Math.PI*2); g.fill(); }); addLight(c.m,mx,my,30,col,0.35,{pulse:0.5,period:1500+i*90,depth:-4}); }
    addLight(c.m,cx,cy,r*1.4,o.rune||col,0.3,{react:true,rune:true,depth:-4}); },
  reeds:function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,w+10,70,function(g,W,H){ for(var i=0;i<(o.n||10);i++){ var bx=5+R.f()*(W-10), hh=30+R.f()*30; g.strokeStyle=R.pick(['#6d8a44','#7f9a4e','#5b7a3a']); g.lineWidth=2; g.beginPath(); g.moveTo(bx,H-3); g.quadraticCurveTo(bx+R.f()*6-3,H-hh/2,bx+R.f()*8-4,H-hh); g.stroke(); if(o.cattail&&R.chance(0.6)){ g.fillStyle='#6a4428'; g.fillRect(bx-2,H-hh-2,4,10);} } }); if(o.wisp&&R.chance(0.3))addLight(c.m,x+w/2,y-10,40,o.wisp,0.45,{pulse:0.6,period:1300+R.i(0,1600)}); },
  bush:function(c,ctx,x,y,w,h,o){ var R=c.R,col=o.col||'#3e6e36'; addSprite(c.m,x+w/2,y+h,w+24,h+30,function(g,W,H){ softShadow(g,W/2,H-4,W/2-8,5,0.3); for(var i=0;i<5;i++){ var bx=W/2+(R.f()-0.5)*(W-24), by=H-14-R.f()*10, r=9+R.f()*6, gr=g.createRadialGradient(bx-3,by-4,1,bx,by,r); gr.addColorStop(0,shade(col,0.25)); gr.addColorStop(1,col); g.fillStyle=gr; g.beginPath(); g.arc(bx,by,r,0,Math.PI*2); g.fill(); } if(o.berry){ for(var j=0;j<5;j++){ g.fillStyle=o.berry; g.beginPath(); g.arc(W/2+(R.f()-0.5)*(W-30),H-14-R.f()*12,2,0,Math.PI*2); g.fill(); } } }); if(o.glow)addLight(c.m,x+w/2,y+h-12,50,o.glow,0.35,{pulse:0.4,depth:-4}); },
  shadowblob:wFlat(function(ctx,x,y,w,h){ softShadow(ctx,x+w/2,y+h/2,w/2,h/3,0.35); })
};
