// ═══════════════════════════════════════════════════════════════════════
// ║ 07zy3-site-backdrop.js — round 109: the adventure sites' backdrops (Lab › Site backdrops; Kris picked all seven fixes).
// ║ What was wrong: hard square edges, floors with no thickness, backdrops too big and too close, floor and void alike, blank wall tops.
// ║  · rim     A built edge on every floor: a stone lip along the floor's edge, a cliff or wall face hanging below it (the site's own stone),
// ║            a soft shadow on the backdrop under it, and the tile steps' outer corners rounded off. (Painted faces: sc_r109_edges.)
// ║  · far     The backdrop far away: the seas (clouds, waves, lava, treetops, stars) at a third of the size, darker, slower, under a haze.
// ║  · layers  Two moving layers for every kind: the far sea, and a nearer one drifting past (cloud wisps, spray, embers, leaves, dust, mist).
// ║  · tower   Inside a tower: an upper floor of a tower, mage tower or castle is ringed by the tower's own wall with arched windows,
// ║            the sky and the land far below seen through them. (Painted wall: sc_r109_tower tx_tw_wall / tx_tw_wall_mage.)
// ║  · island  Floating islands on purpose: floors over the stars or an abyss hang as islands of rock with roots under them, and small
// ║            islands drift far off.
// ║  · caps    Wall tops painted: the round-103 bricks (or the painted caps, sc_r109_tower) and a little moss, no blank blocks.
// ║  · clear   Where the void and the floor shared a look (stars, clouds, storm), the floor gets solid stone and the void stays darker.
// ║ Hooks: 07zy-site-paint (cap, solidFloor, edge), 07zy2-site-void (pick, apply, _size). ZBD.on: the switch (ZBD.OFF.<fix> for one).
// ═══════════════════════════════════════════════════════════════════════
var ZBD={ on:true, OFF:{}, FAR:1/3,
  EDGE:{grass:'tx_ed_mossy',water:'tx_ed_wet',earth:'tx_ed_stone',fire:'tx_ed_basalt',storm:'tx_ed_crystal',shadow:'tx_ed_shadow'},
  SOLID:{stars:1,clouds:1,storm:1},
  HAZE:{clouds:'#c8d8f0',storm:'#38404c',stars:'#05060f',lava:'#2a0c04',deep:'#04121e',canopy:'#0c1e10',abyss:'#06080c'},
  rq:function(seed){ var s0=(seed>>>0)||1, f=function(){ s0=(s0*1664525+1013904223)>>>0; return s0/4294967296; }; return {f:f, chance:function(p){ return f()<p; }, i:function(a,b){ return a+Math.floor(f()*(b-a+1)); }}; },
  ok:function(f){ return ZBD.on&&!ZBD.OFF[f]; },
  kind:function(V){ return V?(V.k==='sea'?V.sea:V.k):null; },
  pat:function(id,px){ var Z=typeof ZScn!=='undefined'?ZScn:null; return Z&&!Z.off&&Z.timg&&Z.timg[id]&&Z.tile?Z.tile(id,px||128):null; },
  solid:function(V){ return ZBD.ok('clear')&&!!V&&!!ZBD.SOLID[ZBD.kind(V)]; },
  island:function(V){ var k=ZBD.kind(V); return ZBD.ok('island')&&!!V&&!V.tower&&(k==='stars'||k==='abyss'); },
  shade:function(hex,f){ var c=typeof _scnRGB==='function'?_scnRGB(hex):[90,90,90], m=function(v){ return Math.max(0,Math.min(255,Math.round(f<0?v*(1+f):v+(255-v)*f))); }; return 'rgb('+m(c[0])+','+m(c[1])+','+m(c[2])+')'; },
  // ── the floor picture (07zy ZSPP.paint) ──
  // a wall top: painted bricks and a little moss over the flat colour
  cap:function(ctx,px,py,LT,top,P,R0,built,el){ if(!ZBD.ok('caps')||top<4)return; var R=ZBD.rq(px*7+py*131+3);      /* its own random numbers (the floor's own stay as they were) */ var pt=ZBD.pat(el==='fire'?'tx_cap_basalt':built?'tx_cap_brick':'tx_cap_stone',96)||(typeof ZScn!=='undefined'&&ZScn.detail&&ZScn.detail('tx_dng_wall',LT*2,1.2));
    if(pt){ ctx.save(); ctx.globalAlpha=0.55; ctx.fillStyle=pt; ctx.fillRect(px,py,LT,top); ctx.restore(); }
    { ctx.save(); var bh=Math.max(5,Math.min(9,Math.round(top/2))), bw=LT/2, mo=ZBD.shade(P.wallTop,-0.5);      /* bricks: rows, staggered joints, each brick a shade lighter or darker */
      for(var r=0,yy=py;yy<py+top;r++,yy+=bh){ var hh=Math.min(bh,py+top-yy), off=(r%2)*bw/2; for(var xx=px-off;xx<px+LT;xx+=bw){ var x0=Math.max(px,xx), x1=Math.min(px+LT,xx+bw); if(x1<=x0)continue;
          ctx.globalAlpha=0.14; ctx.fillStyle=R&&R.chance(0.5)?'#ffffff':'#000000'; ctx.fillRect(x0+1,yy+1,x1-x0-1.5,hh-1.5); ctx.globalAlpha=0.55; ctx.fillStyle=mo; if(xx>=px)ctx.fillRect(xx,yy,1.2,hh); }
        ctx.globalAlpha=0.55; ctx.fillStyle=mo; ctx.fillRect(px,yy+hh-1.2,LT,1.2); } ctx.restore(); }
    ctx.fillStyle='rgba(255,255,255,.12)'; ctx.fillRect(px,py,LT,1);
    if(el!=='fire'&&R&&R.chance(built?0.3:0.55)){ var n=1+(R.chance(0.5)?1:0); for(var i=0;i<n;i++){ ctx.fillStyle='rgba('+(70+R.i(0,30))+','+(120+R.i(0,40))+','+(50+R.i(0,20))+',0.55)'; ctx.beginPath(); ctx.ellipse(px+R.f()*LT,py+1+R.f()*Math.min(4,top-2),2+R.f()*3,1+R.f()*1.2,0,0,Math.PI*2); ctx.fill(); } } },
  // a floor cell: solid stone, so it never looks like the void round it
  solidFloor:function(ctx,px,py,LT){ var pt=(typeof ZScn!=='undefined'&&ZScn.detail&&ZScn.detail('tx_dng_floor',LT*4,1.25))||ZBD.pat('tx_flagstone',128)||ZBD.pat('tx_cobble',128); if(!pt)return; ctx.save(); ctx.globalAlpha=0.55; ctx.fillStyle=pt; ctx.fillRect(px,py,LT,LT); ctx.restore(); },
  // the floor's edge where it meets the backdrop: rounded corners, a lip, a face hanging below, a shadow under it
  edge:function(ctx,o){ if(!ZBD.ok('rim')||!o||!o.V||!o.clr)return; var V=o.V, k=ZBD.kind(V), W=o.W, H=o.H, LT=o.LT, P=o.P, R=ZBD.rq(o.W*977+o.H*31+7), clr=o.clr,
      G=o.g, wk=o.walk, dark=new Uint8Array(W*H), at=function(x,y){ return x<0||y<0||x>=W||y>=H?0:G[y*W+x]; };
    /* the dark mass: wall far from any floor (a built site keeps it, painted near-black) — the floor's edge meets it as it meets the void */
    if(G&&wk)for(var yd=0;yd<H;yd++)for(var xd=0;xd<W;xd++){ var kd=yd*W+xd; if(clr[kd]||G[kd]!==2)continue; var nr=false; for(var j0=-1;j0<=1&&!nr;j0++)for(var i0=-1;i0<=1;i0++){ var a0=at(xd+i0,yd+j0); if(wk(a0)||a0===3||a0===6){ nr=true; break; } } if(!nr)dark[kd]=1; }
    var C=function(x,y){ if(x<0||y<0||x>=W||y>=H)return true; var k0=y*W+x; return !!(clr[k0]||dark[k0]); }, T0=function(x,y){ if(x<0||y<0||x>=W||y>=H)return true; return !!clr[y*W+x]; }, dkc=ZBD.shade(P.void||'#000000',0.03), isl=ZBD.island(V), tw=!!V.tower&&ZBD.ok('tower'),
      hF=k==='terrain'&&!tw?LT*0.34:k==='rock'?LT*0.42:isl?LT*1.75:tw?LT*0.95:LT*1.15, rr=LT*0.4, ep=ZBD.pat(ZBD.EDGE[V.el]||'tx_ed_stone',128)||o.wt, S=ZBD.shade;
    // 1. round off the floor's outer corners (the tile steps)
    ctx.save();
    var cut=function(cx,cy,sx,sy,tr){ ctx.globalCompositeOperation=tr?'destination-out':'source-over'; ctx.fillStyle=tr?'#000':dkc; var ox=cx+sx*rr, oy=cy+sy*rr; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ox,cy); var a0=sy>0?-Math.PI/2:Math.PI/2, a1=sx>0?Math.PI:0; ctx.arc(ox,oy,rr,a0,a1,(sx>0)===(sy>0)); ctx.closePath(); ctx.fill(); };
    for(var y=0;y<H;y++)for(var x=0;x<W;x++){ if(C(x,y))continue; var px=x*LT, py=y*LT, u=C(x,y-1), d=C(x,y+1), l=C(x-1,y), r=C(x+1,y);
      if(u&&l&&C(x-1,y-1))cut(px,py,1,1,T0(x,y-1)&&T0(x-1,y)&&T0(x-1,y-1)); if(u&&r&&C(x+1,y-1))cut(px+LT,py,-1,1,T0(x,y-1)&&T0(x+1,y)&&T0(x+1,y-1)); if(d&&l&&C(x-1,y+1))cut(px,py+LT,1,-1,T0(x,y+1)&&T0(x-1,y)&&T0(x-1,y+1)); if(d&&r&&C(x+1,y+1))cut(px+LT,py+LT,-1,-1,T0(x,y+1)&&T0(x+1,y)&&T0(x+1,y+1)); }
    ctx.restore();
    // 2. the faces hanging under the floor's lower edges (and their shadow on the backdrop)
    for(var y2=1;y2<H;y2++)for(var x2=0;x2<W;x2++){ if(!C(x2,y2)||C(x2,y2-1))continue; var px2=x2*LT, top=y2*LT, h=C(x2,y2+1)?hF:Math.min(hF,LT*0.6), inL=C(x2-1,y2-1)?rr*0.7:0, inR=C(x2+1,y2-1)?rr*0.7:0, tp=isl?LT*0.3:LT*0.12;
      var xs=[px2+inL,px2+LT-inR,px2+LT-inR-(inR?tp:0),px2+inL+(inL?tp:0)];
      ctx.save(); ctx.beginPath(); ctx.moveTo(xs[0],top); ctx.lineTo(xs[1],top);
      if(isl){ var n=4, w=(xs[2]-xs[3]); ctx.lineTo(xs[2],top+h*0.62); for(var j=n;j>=0;j--){ var jx=xs[3]+w*j/n, jy=top+h*(0.62+0.38*((j+x2)%2?R.f()*0.6+0.4:R.f()*0.3)); ctx.lineTo(jx,jy); } ctx.lineTo(xs[3],top+h*0.62); }
      else { ctx.lineTo(xs[2],top+h); ctx.lineTo(xs[3],top+h); }
      ctx.closePath(); ctx.clip();
      var fg=ctx.createLinearGradient(0,top,0,top+h); fg.addColorStop(0,S(P.wall,-0.05)); fg.addColorStop(0.55,S(P.wall,-0.42)); fg.addColorStop(1,S(P.wall,-0.75)); ctx.fillStyle=fg; ctx.fillRect(px2-1,top,LT+2,h+2);
      if(ep){ ctx.globalAlpha=0.5; ctx.fillStyle=ep; ctx.fillRect(px2-1,top,LT+2,h+2); ctx.globalAlpha=1; }
      if(tw){ ctx.fillStyle='rgba(0,0,0,.25)'; for(var b=top+6;b<top+h;b+=7)ctx.fillRect(px2,b,LT,1); }      /* the gallery's masonry */
      var dk=ctx.createLinearGradient(0,top,0,top+5); dk.addColorStop(0,'rgba(0,0,0,.45)'); dk.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=dk; ctx.fillRect(px2,top,LT,5);
      ctx.restore();
      if(isl){ ctx.save(); ctx.strokeStyle='rgba(92,64,38,.85)'; ctx.lineWidth=1.2; for(var q=0;q<2;q++){ var rx=px2+inL+4+R.f()*(LT-inL-inR-8), ry=top+h*0.5, rl=LT*0.5+R.f()*LT*0.8; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.quadraticCurveTo(rx+(R.f()-0.5)*10,ry+rl*0.5,rx+(R.f()-0.5)*6,ry+rl); ctx.stroke(); } ctx.restore(); }
      if(C(x2,y2+1)||h<LT){ var sy0=top+h, sg=ctx.createLinearGradient(0,sy0,0,sy0+16); sg.addColorStop(0,'rgba(0,0,0,'+(k==='terrain'?0.28:0.38)+')'); sg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=sg; ctx.fillRect(px2+inL+2,sy0-2,LT-inL-inR-4,16); } }
    // 3. the stone lip along every edge of the floor
    ctx.save(); ctx.globalAlpha=0.75; var lip=S(P.wallTop,0.15), dkl='rgba(0,0,0,.4)';
    for(var y3=0;y3<H;y3++)for(var x3=0;x3<W;x3++){ if(C(x3,y3))continue; var px3=x3*LT, py3=y3*LT, cu=C(x3,y3-1), cd=C(x3,y3+1), cl=C(x3-1,y3), cr=C(x3+1,y3), iL=cl?rr*0.7:0, iR=cr?rr*0.7:0, iU=cu?rr*0.7:0, iD=cd?rr*0.7:0;
      ctx.fillStyle=lip; if(cd)ctx.fillRect(px3+(cl?rr*0.7:0),py3+LT-3,LT-(cl?rr*0.7:0)-(cr?rr*0.7:0),3); if(cu)ctx.fillRect(px3+(cl?rr*0.7:0),py3,LT-(cl?rr*0.7:0)-(cr?rr*0.7:0),2);
      if(cl)ctx.fillRect(px3,py3+iU,2,LT-iU-iD); if(cr)ctx.fillRect(px3+LT-2,py3+iU,2,LT-iU-iD);
      ctx.fillStyle=dkl; if(cu)ctx.fillRect(px3+(cl?rr*0.7:0),py3+2,LT-(cl?rr*0.7:0)-(cr?rr*0.7:0),1); if(cl)ctx.fillRect(px3+2,py3+iU,1,LT-iU-iD); if(cr)ctx.fillRect(px3+LT-3,py3+iU,1,LT-iU-iD); }
    ctx.restore(); },
  // ── the layers behind the floor (07zy2 ZVOID.apply) ──
  _c:{},
  wrap:function(S,f){ [-S,0,S].forEach(function(dx){ [-S,0,S].forEach(function(dy){ f(dx,dy); }); }); },
  // the near layer: what drifts past between you and the far sea
  nearTile:function(kind){ if(ZBD._c['n_'+kind])return ZBD._c['n_'+kind]; var S=256, cv=mkCanvas(S,S), g=cv.getContext('2d'), R=rngOf(kind.length*131+17), W=ZBD.wrap;
    var blob=function(x,y,rx,ry,col,a){ W(S,function(dx,dy){ g.save(); g.translate(x+dx,y+dy); g.scale(1,ry/rx); var gr=g.createRadialGradient(0,0,0,0,0,rx); gr.addColorStop(0,'rgba('+col+','+a+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,rx,0,Math.PI*2); g.fill(); g.restore(); }); };
    var dot=function(x,y,r,col){ W(S,function(dx,dy){ g.fillStyle=col; g.beginPath(); g.arc(x+dx,y+dy,r,0,Math.PI*2); g.fill(); }); };
    if(kind==='clouds'||kind==='storm'){ for(var i=0;i<7;i++)blob(R.f()*S,R.f()*S,26+R.f()*40,6+R.f()*8,kind==='storm'?'150,160,175':'255,255,255',kind==='storm'?0.22:0.3); }
    else if(kind==='deep'){ for(var j=0;j<26;j++){ var x=R.f()*S, y=R.f()*S; W(S,function(dx,dy){ g.strokeStyle='rgba(220,240,255,'+(0.2+R.f()*0.25)+')'; g.lineWidth=1; g.beginPath(); g.moveTo(x+dx,y+dy); g.lineTo(x+dx+6+R.f()*8,y+dy-1); g.stroke(); }); } }
    else if(kind==='lava'){ for(var k=0;k<22;k++)dot(R.f()*S,R.f()*S,0.8+R.f()*1.3,'rgba(255,'+(140+R.i(0,80))+',60,'+(0.5+R.f()*0.4)+')'); }
    else if(kind==='canopy'){ for(var l=0;l<14;l++){ var lx=R.f()*S, ly=R.f()*S, a=R.f()*Math.PI, c=R.chance(0.3)?'200,170,60':'90,150,60'; W(S,function(dx,dy){ g.save(); g.translate(lx+dx,ly+dy); g.rotate(a); g.fillStyle='rgba('+c+',0.7)'; g.beginPath(); g.ellipse(0,0,3.5,1.6,0,0,Math.PI*2); g.fill(); g.restore(); }); } }
    else if(kind==='stars'){ for(var s=0;s<40;s++)dot(R.f()*S,R.f()*S,0.4+R.f()*0.6,'rgba(220,230,255,'+(0.25+R.f()*0.4)+')'); for(var s2=0;s2<3;s2++)blob(R.f()*S,R.f()*S,30,30,'140,120,220',0.06); }
    else { for(var m=0;m<6;m++)blob(R.f()*S,R.f()*S,18+R.f()*26,10+R.f()*12,'200,210,220',0.1); }
    ZBD._c['n_'+kind]=cv; return cv; },
  NEAR:{clouds:[0.9,22,3,1,null],storm:[0.9,30,5,1,null],deep:[0.95,10,4,0.9,null],lava:[0.92,4,-9,1,'add'],canopy:[0.92,12,6,0.9,null],stars:[0.6,2,0,0.9,'add'],abyss:[0.85,7,-2,0.9,'screen'],rock:[0.97,3,1,0.6,'screen'],terrain:[0.97,0,0,0,null]},
  // the tower's own wall, with arched windows the sky shows through
  towerTile:function(el,mage){ var key='tw_'+el+(mage?'_m':''); if(ZBD._c[key])return ZBD._c[key]; var S=256, cv=mkCanvas(S,S), g=cv.getContext('2d'), R=rngOf(key.length*71+3), pt=ZBD.pat(mage?'tx_tw_wall_mage':'tx_tw_wall',S);
    var base={fire:'#4a3530',water:'#3a4652',earth:'#5a5046',storm:'#4a4e5a',shadow:'#3a3448',grass:'#4c5244'}[el]||'#504a46'; if(mage)base='#463c58';
    g.fillStyle=base; g.fillRect(0,0,S,S); if(pt){ g.globalAlpha=0.85; g.fillStyle=pt; g.fillRect(0,0,S,S); g.globalAlpha=1; }
    else { var bh=16; for(var y=0;y<S;y+=bh){ var off=(y/bh)%2?20:0; for(var x=-40;x<S;x+=40){ var v=R.f()*0.16-0.08; g.fillStyle=ZBD.shade(base,v); g.fillRect(x+off+1,y+1,38,bh-2); } } g.fillStyle='rgba(0,0,0,.35)'; for(var y1=0;y1<S;y1+=bh)g.fillRect(0,y1,S,1); }
    var win=function(cx,top,w,h){ g.save(); g.fillStyle='rgba(0,0,0,.45)'; g.beginPath(); g.moveTo(cx-w/2-5,top+h+6); g.lineTo(cx-w/2-5,top+w/2); g.arc(cx,top+w/2,w/2+5,Math.PI,0); g.lineTo(cx+w/2+5,top+h+6); g.closePath(); g.fill();
      g.fillStyle=ZBD.shade(base,0.25); g.beginPath(); g.moveTo(cx-w/2-4,top+h+5); g.lineTo(cx-w/2-4,top+w/2); g.arc(cx,top+w/2,w/2+4,Math.PI,0); g.lineTo(cx+w/2+4,top+h+5); g.closePath(); g.fill();
      g.globalCompositeOperation='destination-out'; g.beginPath(); g.moveTo(cx-w/2,top+h); g.lineTo(cx-w/2,top+w/2); g.arc(cx,top+w/2,w/2,Math.PI,0); g.lineTo(cx+w/2,top+h); g.closePath(); g.fill(); g.restore();
      g.fillStyle=ZBD.shade(base,0.35); g.fillRect(cx-w/2-6,top+h,w+12,4); };
    win(64,40,46,96); win(192,150,46,96);
    var sh=g.createLinearGradient(0,0,0,S); sh.addColorStop(0,'rgba(0,0,0,0)'); sh.addColorStop(1,'rgba(0,0,0,.12)'); g.globalCompositeOperation='source-atop'; g.fillStyle=sh; g.fillRect(0,0,S,S); g.globalCompositeOperation='source-over';
    ZBD._c[key]=cv; return cv; },
  // small islands drifting far off
  islesTile:function(){ if(ZBD._c.isles)return ZBD._c.isles; var S=512, cv=mkCanvas(S,S), g=cv.getContext('2d'), R=rngOf(4411);
    var isle=function(cx,cy,w){ var h=w*0.9; g.save(); g.fillStyle='#2a2630'; g.beginPath(); g.moveTo(cx-w/2,cy); for(var i=0;i<=6;i++){ var t=i/6; g.lineTo(cx-w/2+w*t,cy+h*(0.35+0.65*Math.sin(Math.PI*t))*(0.7+R.f()*0.3)); } g.lineTo(cx+w/2,cy); g.closePath(); g.fill();
      g.fillStyle='#4a6a3a'; g.beginPath(); g.ellipse(cx,cy,w/2+2,w*0.14,0,0,Math.PI*2); g.fill(); g.fillStyle='rgba(255,255,255,.08)'; g.beginPath(); g.ellipse(cx-w*0.12,cy-w*0.04,w*0.22,w*0.05,0,0,Math.PI*2); g.fill(); g.restore(); };
    isle(110,150,46); isle(380,330,30); isle(250,450,20); ZBD._c.isles=cv; return cv; },
  vigTile:function(){ if(ZBD._c.vig)return ZBD._c.vig; var c=mkCanvas(256,256), g=c.getContext('2d'), gr=g.createRadialGradient(128,128,40,128,128,181); gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(0.6,'rgba(0,0,0,.35)'); gr.addColorStop(1,'rgba(0,0,0,.85)'); g.fillStyle=gr; g.fillRect(0,0,256,256); ZBD._c.vig=c; return c; },
  tex:function(scene,key,cv){ if(!scene.textures.exists(key))scene.textures.addCanvas(key,cv); return key; },
  grey:function(v){ v=Math.max(0,Math.min(255,Math.round(255*v))); return Phaser.Display.Color.GetColor(v,v,v); },
  layers:function(scene,m){ var S=scene._zv, V=m&&m.zvoid; if(!S||!V||!ZBD.on)return; var k=ZBD.kind(V), tw=!!V.tower&&ZBD.ok('tower'), sea=k!=='terrain'&&k!=='rock', dim=1-Math.min(0.6,m.dark||0)*0.7, solid=ZBD.solid(V), cam=scene.cameras.main;
    // far: the seas a third of the size, darker and slower
    if(ZBD.ok('far')&&(sea||tw)){ var dv=dim*(solid?0.55:0.72); S.L.forEach(function(l,i){ var o=l.o; if(!o||!o.setTileScale)return; o.setTileScale(ZBD.FAR,ZBD.FAR); l.pf=Math.min(l.pf,i===0?0.32:0.45); l.vx*=ZBD.FAR; l.vy*=ZBD.FAR; o.setTint(ZBD.grey(dv)); });
      (S.dr||[]).forEach(function(d){ if(!d.o||!d.o.setScale)return; d.o.setScale(d.o.scaleX*0.45,d.o.scaleY*0.45); d.w*=0.45; d.h*=0.45; d.pf=Math.min(d.pf,0.35); try{ d.o.setTint(ZBD.grey(dv)); }catch(e){} }); }
    S.bd=[];
    var add=function(key,cv,depth,pf,vx,vy,a,blend){ var ts=scene.add.tileSprite(0,0,8,8,ZBD.tex(scene,key,cv)).setOrigin(0.5,0.5).setScrollFactor(0).setDepth(depth).setAlpha(a); if(blend==='add')ts.setBlendMode(Phaser.BlendModes.ADD); else if(blend==='screen')ts.setBlendMode(Phaser.BlendModes.SCREEN); var L={o:ts,pf:pf,vx:vx,vy:vy}; S.L.push(L); S.bd.push(L); return ts; };
    // island: small islands far off
    if(ZBD.island(V))add('zbd_isles',ZBD.islesTile(),-11.75,0.22,3,0,0.75);
    // layers: the near drift
    var N=ZBD.NEAR[k]; if(ZBD.ok('layers')&&N&&N[3]>0&&sea)add('zbd_near_'+k,ZBD.nearTile(k),-10.9,N[0],N[1],N[2],N[3]*(solid?0.7:1),N[4]);
    // tower: its wall all round, windows open on the sky
    if(tw)add('zbd_tw_'+(V.el||'earth')+(m._mage?'_m':''),ZBD.towerTile(V.el||'earth',!!m._mage),-10.6,0.96,0,0,1).setTint(ZBD.grey(0.62*dim));      /* the wall stands back: darker than the floor */
    // haze and a darker edge on the backdrop only (under the floor), so the floor stands out
    if(ZBD.ok('far')&&(sea||tw)){ var hz=ZBD.HAZE[k]||'#06080c', hv=scene.add.rectangle(0,0,8,8,Phaser.Display.Color.HexStringToColor(hz).color,solid?0.32:0.2).setOrigin(0.5,0.5).setScrollFactor(0).setDepth(-10.4); S.bdHaze=hv;
      S.bdVig=scene.add.image(0,0,ZBD.tex(scene,'zbd_vig',ZBD.vigTile())).setScrollFactor(0).setDepth(-10.35).setAlpha(solid?0.85:0.55); }
    ZVOID._size(scene); },
  size:function(scene){ var S=scene._zv; if(!S)return; var cam=scene.cameras.main, z=cam.zoom||1, w=cam.width/z+96, h=cam.height/z+96;
    if(S.bdHaze)S.bdHaze.setPosition(cam.width/2,cam.height/2).setSize(w,h); if(S.bdVig)S.bdVig.setPosition(cam.width/2,cam.height/2).setDisplaySize(w,h); },
  drop:function(scene){ var S=scene._zv; if(!S)return; if(S.bdHaze&&S.bdHaze.destroy)S.bdHaze.destroy(); if(S.bdVig&&S.bdVig.destroy)S.bdVig.destroy(); S.bdHaze=S.bdVig=null; }
};
(function(){ if(typeof ZVOID==='undefined')return;
  var p0=ZVOID.pick; ZVOID.pick=function(site,T,fi,nf){ var V=p0.apply(this,arguments); try{ if(V&&ZBD.ok('tower')&&site&&(site.type==='tower'||site.type==='castle')&&fi>0)V.tower=true; }catch(e){} return V; };      /* the upper floors of towers, mage towers and castles */
  var a0=ZVOID.apply; ZVOID.apply=function(scene,m){ var r=a0.apply(this,arguments); try{ if(m&&m.zvoid&&scene._zv){ m._mage=!!(scene._mage||(scene._site&&scene._site.mage)); ZBD.layers(scene,m); } }catch(e){ if(!ZBD._w){ ZBD._w=1; console.warn('backdrop',e); } } return r; };
  var s0=ZVOID._size; ZVOID._size=function(scene){ var r=s0.apply(this,arguments); try{ ZBD.size(scene); }catch(e){} return r; };
  var d0=ZVOID.drop; ZVOID.drop=function(scene){ try{ ZBD.drop(scene); }catch(e){} return d0.apply(this,arguments); };
})();
