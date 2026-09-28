// ═══════════════════════════════════════════════════════════════════════
// ║ MONSTER SELECTOR — basic pixel sprites (32×32), generated from a small
// ║ spec: body plan + palette + features + attack animation. These are only
// ║ stand-ins for choosing; the picked monsters get ChatGPT sprites later.
// ║   spec = {plan, anim, pal:[body, dark, accent, eye], feat:'horns,club'}
// ║   frames: 0/1 idle (bob), 2 wind-up, 3 strike (attack effect)
// ═══════════════════════════════════════════════════════════════════════
var MS_OUT='#16110d';
function _msGrid(){
  var G={c:new Array(1024).fill(null),o:new Array(1024).fill(null)};
  var put=function(arr,x,y,col){ x=Math.round(x); y=Math.round(y); if(x<0||y<0||x>31||y>31||!col)return; arr[y*32+x]=col; };
  G.p=function(x,y,c){ put(G.c,x,y,c); };
  G.r=function(x,y,w,h,c){ for(var j=0;j<h;j++)for(var i=0;i<w;i++)put(G.c,x+i,y+j,c); };
  G.e=function(cx,cy,rx,ry,c){ for(var y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(var x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){ var dx=(x-cx)/(rx+0.35), dy=(y-cy)/(ry+0.35); if(dx*dx+dy*dy<=1)put(G.c,x,y,c); } };
  G.l=function(x0,y0,x1,y1,c,arr){ x0=Math.round(x0); y0=Math.round(y0); x1=Math.round(x1); y1=Math.round(y1); var dx=Math.abs(x1-x0), dy=-Math.abs(y1-y0), sx=x0<x1?1:-1, sy=y0<y1?1:-1, er=dx+dy;
    for(var n=0;n<80;n++){ put(arr||G.c,x0,y0,c); if(x0===x1&&y0===y1)break; var e2=2*er; if(e2>=dy){er+=dy;x0+=sx;} if(e2<=dx){er+=dx;y0+=sy;} } };
  G.tri=function(ax,ay,bx,by,cx,cy,c){ var minx=Math.min(ax,bx,cx),maxx=Math.max(ax,bx,cx),miny=Math.min(ay,by,cy),maxy=Math.max(ay,by,cy);
    var s=function(px,py,qx,qy,rx,ry){ return (px-rx)*(qy-ry)-(qx-rx)*(py-ry); };
    for(var y=Math.floor(miny);y<=Math.ceil(maxy);y++)for(var x=Math.floor(minx);x<=Math.ceil(maxx);x++){ var d1=s(x,y,ax,ay,bx,by),d2=s(x,y,bx,by,cx,cy),d3=s(x,y,cx,cy,ax,ay); if(!((d1<0||d2<0||d3<0)&&(d1>0||d2>0||d3>0)))put(G.c,x,y,c); } };
  // overlay (not outlined / shaded): eyes, glows, effects
  G.op=function(x,y,c){ put(G.o,x,y,c); };
  G.or=function(x,y,w,h,c){ for(var j=0;j<h;j++)for(var i=0;i<w;i++)put(G.o,x+i,y+j,c); };
  G.ol=function(x0,y0,x1,y1,c){ G.l(x0,y0,x1,y1,c,G.o); };
  G.oe=function(cx,cy,rx,ry,c,ring){ for(var y=Math.floor(cy-ry-1);y<=Math.ceil(cy+ry+1);y++)for(var x=Math.floor(cx-rx-1);x<=Math.ceil(cx+rx+1);x++){ var dx=(x-cx)/(rx+0.35), dy=(y-cy)/(ry+0.35), d=dx*dx+dy*dy; if(ring?(d<=1&&d>=0.62):d<=1)put(G.o,x,y,c); } };
  return G;
}
function _msShadeOutline(G){
  var c=G.c, out=c.slice();
  for(var y=0;y<32;y++)for(var x=0;x<32;x++){ var k=y*32+x, v=c[k]; if(!v)continue;
    var up=y>0?c[k-32]:null, dn=y<31?c[k+32]:null, lf=x>0?c[k-1]:null, rt=x<31?c[k+1]:null;
    if(v.charAt(0)!=='#')continue;
    if(!up)out[k]=shade(v,0.24); else if(!dn||!rt)out[k]=shade(v,-0.26); else if(!lf)out[k]=shade(v,0.1); }
  for(var y2=0;y2<32;y2++)for(var x2=0;x2<32;x2++){ var k2=y2*32+x2; if(c[k2])continue;
    if((y2>0&&c[k2-32])||(y2<31&&c[k2+32])||(x2>0&&c[k2-1])||(x2<31&&c[k2+1]))out[k2]=MS_OUT; }
  G.c=out;
}
function _msHas(F,f){ return F.indexOf(','+f+',')>=0; }

// ── body plans ──────────────────────────────────────────────────────────
// pose: {dy, lx (lean), step (0/1 legs), wing (0 up / 1 down), atk (0 idle, 1 wind-up, 2 strike)}
var MS_PLANS={
  biped:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    if(_msHas(F,'cape'))G.r(x-5,13+y,10,12,a);
    if(_msHas(F,'wings')){ G.tri(x-3,14+y,x-12,6+y+(o.wing?6:0),x-5,21+y,shade(d,0.2)); }
    if(_msHas(F,'stilts')){ G.r(x-3,24+y,1,6,'#6a4a2a'); G.r(x+2,24+y,1,6,'#6a4a2a'); G.r(x-3,21+y,2,4,d); G.r(x+1,21+y,2,4,d); }
    else { G.r(x-3,22+y+(o.step?1:0),2,6-(o.step?1:0),d); G.r(x+1,22+y+(o.step?0:1),2,6-(o.step?0:1),d); }
    G.r(x-4,14+y,8,9,_msHas(F,'armor')?'#8a8e96':d); G.r(x-4,14+y,8,2,b);
    var ay=o.atk===1?-3:0; G.r(x-6,15+y,2,6,b); G.r(x+4,15+y+ay,2,6,b);
    var ears=_msHas(F,'ears'); G.e(x,9+y,4,4,_msHas(F,'skull')?'#e8e0cc':b); if(ears){ G.tri(x-4,8+y,x-8,5+y,x-4,11+y,b); G.tri(x+4,8+y,x+8,5+y,x+4,11+y,b); }
    if(_msHas(F,'hood')){ G.e(x,8+y,5,5,d); G.e(x+1,10+y,3,3,b); }
    if(_msHas(F,'helmet')){ G.r(x-4,4+y,9,4,'#8a8e96'); G.p(x,3+y,a); }
    if(_msHas(F,'horns')){ G.l(x-3,6+y,x-6,1+y,'#e8dcc0'); G.l(x+3,6+y,x+6,1+y,'#e8dcc0'); }
    if(_msHas(F,'crown')){ G.r(x-3,3+y,7,2,'#e8c040'); G.p(x-3,2+y,'#e8c040'); G.p(x,2+y,'#e8c040'); G.p(x+3,2+y,'#e8c040'); }
    if(_msHas(F,'hat')){ G.tri(x-6,6+y,x+6,6+y,x+2,-4+y,d); G.r(x-6,5+y,13,2,d); }
    if(_msHas(F,'mushcap')){ G.e(x,5+y,7,3,a); G.op(x-3,4+y,'#fff4e0'); G.op(x+2,3+y,'#fff4e0'); }
    if(_msHas(F,'shield'))G.r(x-9,14+y,4,7,a);
    var hx=x+5, hy=18+y+ay;
    if(_msHas(F,'sword')||_msHas(F,'dagger'))G.l(hx,hy,hx+(o.atk===2?7:3),hy-(o.atk===2?1:6),'#dfe6ee');
    if(_msHas(F,'club')){ G.l(hx,hy,hx+3,hy-7,'#6a4a2a'); G.e(hx+3,hy-8,2,2,'#7a5a3a'); }
    if(_msHas(F,'spear'))G.l(hx-1,hy+4,hx+(o.atk===2?9:3),hy-(o.atk===2?4:10),'#9a8a70');
    if(_msHas(F,'axe')){ G.l(hx,hy,hx+2,hy-7,'#6a4a2a'); G.r(hx+2,hy-9,3,4,'#c8ccd4'); }
    if(_msHas(F,'hammer')){ G.l(hx,hy,hx+2,hy-7,'#6a4a2a'); G.r(hx,hy-10,6,3,a); }
    if(_msHas(F,'bow')){ G.l(hx+2,hy-7,hx+2,hy+3,'#7a5a3a'); G.ol(hx+1,hy-6,hx+1,hy+2,'#e8e0d0'); }
    if(_msHas(F,'sling')||_msHas(F,'rock'))G.e(hx+1,hy-1,1,1,'#8a8478');
    if(_msHas(F,'staff')){ G.l(hx+1,hy+8,hx+1,hy-10,'#6a4a2a'); G.oe(hx+1,hy-11,1.4,1.4,a); }
    if(_msHas(F,'lantern')){ G.l(hx,hy,hx,hy+3,'#3a3026'); G.oe(hx,hy+5,1.4,1.6,'#ffd070'); }
    if(_msHas(F,'net'))G.ol(hx,hy-3,hx+4,hy+2,'#d8d0b0');
    G.op(x+1,9+y,P[3]); G.op(x+3,9+y,P[3]);
    if(_msHas(F,'tusks')){ G.op(x+1,12+y,'#fff4e0'); G.op(x+3,12+y,'#fff4e0'); }
  },
  brute:function(G,P,F,o){ var x=15+o.lx, y=o.dy+(o.atk===2&&o.anim==='slam'?1:0), b=P[0], d=P[1], a=P[2];
    G.r(x-6,23+y,4,6,d); G.r(x+2,23+y,4,6,d);
    G.e(x,17+y,9,7,b); if(_msHas(F,'moss')){ G.e(x-3,12+y,5,2,'#5a8a3a'); } if(_msHas(F,'belly'))G.e(x+1,19+y,5,4,shade(b,0.15));
    var ay=o.atk===1?-6:o.atk===2?2:0; G.r(x-11,13+y+ay,4,11,b); G.r(x+8,13+y+ay,4,11,b);
    G.e(x+1,10+y,4,3.5,b);
    if(_msHas(F,'mushcap')){ G.e(x+1,6+y,9,4,a); G.op(x-3,5+y,'#fff4e0'); G.op(x+2,4+y,'#fff4e0'); G.op(x+6,6+y,'#fff4e0'); }
    if(_msHas(F,'horns')){ G.l(x-2,8+y,x-5,4+y,'#e8dcc0'); G.l(x+4,8+y,x+7,4+y,'#e8dcc0'); }
    if(_msHas(F,'club')){ G.l(x+10,22+y+ay,x+13,10+y+ay,'#6a4a2a'); G.e(x+13,9+y+ay,2.5,2.5,'#7a5a3a'); }
    if(_msHas(F,'spikes'))for(var i=0;i<4;i++)G.tri(x-6+i*4,11+y,x-4+i*4,6+y,x-2+i*4,11+y,a);
    if(_msHas(F,'shell'))G.e(x-2,15+y,7,5,a);
    if(_msHas(F,'glowcore'))G.oe(x,17+y,2,2,a);
    G.op(x,10+y,P[3]); G.op(x+3,10+y,P[3]); if(_msHas(F,'tusks')){ G.op(x-1,13+y,'#fff4e0'); G.op(x+4,13+y,'#fff4e0'); }
  },
  quad:function(G,P,F,o,small){ var s=small?0.7:1, x=15+o.lx, y=o.dy+(small?4:0), b=P[0], d=P[1], a=P[2];
    var lg=function(px,ph){ G.r(px,22+y+(ph?1:0),2,(small?4:6)-(ph?1:0),d); };
    lg(x-6*s,o.step); lg(x-3*s,!o.step); lg(x+3*s,o.step); lg(x+6*s,!o.step);
    if(_msHas(F,'tail'))G.l(x-8*s,19+y,x-12*s,15+y,b);
    if(_msHas(F,'wings')){ G.tri(x-2,17+y,x-10,5+y+(o.wing?7:0),x+4,15+y,shade(d,0.25)); }
    G.e(x,19+y,8*s,4.5*s,b);
    if(_msHas(F,'spikes')||_msHas(F,'mane'))for(var i=0;i<5;i++)G.tri(x-6*s+i*3*s,16+y,x-5*s+i*3*s,12+y,x-4*s+i*3*s,16+y,_msHas(F,'mane')?d:a);
    if(_msHas(F,'shell'))G.e(x-1,16+y,7*s,4*s,a);
    if(_msHas(F,'crystals'))for(var j=0;j<3;j++)G.tri(x-4+j*4,16+y,x-3+j*4,9+y,x-1+j*4,16+y,a);
    var hx=x+(9+(o.atk===2?3:0))*s, hy=15+y+(o.atk===1?2:0);
    G.e(hx,hy,4*s,3.5*s,b); G.r(hx+2*s,hy+1,3*s,2*s,shade(b,-0.1));
    if(_msHas(F,'ears')){ G.tri(hx-2,hy-2,hx-3,hy-(small?9:7),hx,hy-2,b); G.tri(hx,hy-2,hx+1,hy-(small?9:7),hx+2,hy-2,b); }
    if(_msHas(F,'horns')){ G.l(hx-1,hy-3,hx-3,hy-8,'#e8dcc0'); G.l(hx+1,hy-3,hx+3,hy-8,'#e8dcc0'); }
    if(_msHas(F,'antlers')){ G.l(hx,hy-3,hx-2,hy-9,'#c8b088'); G.l(hx-2,hy-7,hx-5,hy-8,'#c8b088'); G.l(hx+1,hy-3,hx+3,hy-9,'#c8b088'); }
    if(_msHas(F,'tusks'))G.op(hx+4*s,hy+2,'#fff4e0');
    G.op(hx+1,hy-1,P[3]);
  },
  small:function(G,P,F,o){ MS_PLANS.quad(G,P,F,o,true); },
  serpent:function(G,P,F,o){ var x=14+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2], st=o.atk===2?4:o.atk===1?-2:0;
    G.e(x,25+y,9,3,b); G.e(x+1,22+y,6,2.5,b); G.e(x+4,19+y,3,2.5,b); G.e(x+6+st*0.5,15+y,2.5,3,b);
    if(_msHas(F,'hood'))G.e(x+7+st*0.5,11+y,4,3,a);
    G.e(x+8+st,10+y-(st>0?1:0),3.5,2.5,b);
    for(var i=0;i<4;i++)G.p(x-6+i*4,24+y,d);
    if(_msHas(F,'fins')){ G.tri(x-4,23+y,x-2,19+y,x,23+y,a); G.tri(x+2,20+y,x+4,16+y,x+5,20+y,a); }
    if(_msHas(F,'water')){ G.or(1,27,30,1,'rgba(120,200,255,.55)'); G.or(4,28,24,1,'rgba(120,200,255,.35)'); }
    G.op(x+9+st,9+y,P[3]); if(o.atk===2)G.ol(x+12+st,11+y,x+14+st,12+y,'#ff6070');
  },
  bird:function(G,P,F,o){ var x=16+o.lx, y=o.dy-2+(o.atk===2&&o.anim==='dive'?4:0), b=P[0], d=P[1], a=P[2];
    var wu=o.wing?7:-2;
    G.tri(x-2,14+y,x-13,6+y+wu,x-3,19+y,d); G.tri(x+1,14+y,x+11,4+y+wu,x+3,19+y,shade(d,0.15));
    G.e(x,16+y,5,4.5,b); G.tri(x-4,18+y,x-9,22+y,x-3,20+y,d);
    if(_msHas(F,'harpy')){ G.e(x+3,10+y,3,3,'#e8c0a0'); G.r(x,7+y,6,2,a); G.r(x,8+y,2,5,a); }
    else { G.e(x+4,11+y,3,3,b); G.tri(x+6,11+y,x+10,12+y,x+6,13+y,a); }
    if(_msHas(F,'talons')){ G.l(x-1,20+y,x-1,23+y,'#d8c080'); G.l(x+2,20+y,x+2,23+y,'#d8c080'); }
    if(_msHas(F,'stone')){ G.p(x-1,15+y,shade(b,-0.3)); G.p(x+2,17+y,shade(b,-0.3)); }
    if(_msHas(F,'flames'))for(var i=0;i<4;i++)G.op(x-6+i*2,20+y+(i%2),'#ffb040');
    G.op(x+5,11+y,P[3]);
  },
  insect:function(G,P,F,o){ var x=15+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    for(var i=0;i<3;i++){ G.l(x-3+i*4,21+y,x-5+i*4+(o.step&&i%2?1:0),27+y,d); }
    if(_msHas(F,'wings')){ G.e(x-2,12+y-(o.wing?2:0),5,3,'rgba(220,240,255,.7)'); G.e(x+3,11+y-(o.wing?2:0),4,3,'rgba(220,240,255,.6)'); }
    G.e(x-5,20+y,5,4,b); if(_msHas(F,'stripes')){ G.r(x-7,18+y,1,5,d); G.r(x-4,17+y,1,7,d); }
    G.e(x+1,19+y,3,3,d); G.e(x+6,17+y,3,3,b);
    if(_msHas(F,'scythes')){ var ra=o.atk===2?4:0; G.l(x+4,17+y,x+8+ra,10+y,a); G.l(x+8+ra,10+y,x+10+ra,14+y,a); }
    if(_msHas(F,'mandibles')){ G.p(x+9,19+y,a); G.p(x+10,18+y,a); }
    if(_msHas(F,'stinger'))G.tri(x-10,20+y,x-14+(o.atk===2?-2:0),22+y,x-10,22+y,a);
    if(_msHas(F,'antennae')){ G.l(x+6,15+y,x+9,10+y,d); G.l(x+7,15+y,x+11,11+y,d); }
    if(_msHas(F,'ball')){ G.e(x-9+(o.atk===2?-4:0),20+y,5,5,'#7a5a3a'); }
    G.op(x+7,16+y,P[3]);
  },
  spider:function(G,P,F,o){ var x=15+o.lx, y=o.dy, b=P[0], d=P[1];
    for(var i=0;i<4;i++){ var k=(o.step?1:-1)*(i%2?1:-1); G.l(x-2+i*2,20+y,x-10+i*2,14+y+k,d); G.l(x-10+i*2,14+y+k,x-12+i*3,26+y,d); G.l(x+2+i*1,20+y,x+10+i*1,14+y-k,d); G.l(x+10+i,14+y-k,x+13+i,26+y,d); }
    G.e(x-3,20+y,6,5,b); G.e(x+4,20+y,3,3,b); if(_msHas(F,'crystals'))G.tri(x-6,17+y,x-4,11+y,x-2,17+y,P[2]);
    G.op(x+5,19+y,P[3]); G.op(x+6,20+y,P[3]); G.op(x+4,20+y,P[3]);
  },
  blob:function(G,P,F,o){ var x=16+o.lx, sq=o.atk===2?1.25:o.dy?0.9:1, b=P[0], a=P[2];
    G.e(x,28-6/sq,9*sq,6/sq,b); G.r(x-9*sq,26,18*sq,3,b);
    if(_msHas(F,'clover')){ G.e(x-1,19,1.5,1.5,a); G.e(x+2,19,1.5,1.5,a); G.e(x-1,16,1.5,1.5,a); G.e(x+2,16,1.5,1.5,a); }
    if(_msHas(F,'crown')){ G.r(x-3,20-4/sq,7,2,'#e8c040'); }
    if(_msHas(F,'flames'))for(var i=0;i<5;i++)G.op(x-6+i*3,21-6/sq-(i%2),'#ffb040');
    G.op(x-4,24-3/sq,'rgba(255,255,255,.55)'); G.op(x-3,23-3/sq,'rgba(255,255,255,.55)');
    G.op(x+1,24,P[3]); G.op(x+4,24,P[3]);
  },
  wisp:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2, a=P[2];
    G.oe(x,14+y,9,9,rgba(a,0.18)); G.oe(x,14+y,7,7,rgba(a,0.28));
    G.e(x,14+y,5,5,P[0]); for(var i=0;i<4;i++)G.p(x-2+i+(o.step?1:0),20+y+i,P[1]);
    if(_msHas(F,'wings')){ G.e(x-6,11+y-(o.wing?2:0),3,2,'rgba(230,240,255,.8)'); G.e(x+6,11+y-(o.wing?2:0),3,2,'rgba(230,240,255,.8)'); }
    if(_msHas(F,'lantern')){ G.r(x-3,8+y,7,2,'#3a3026'); G.r(x-3,19+y,7,2,'#3a3026'); }
    if(_msHas(F,'candle')){ G.r(x-2,14+y,5,9,'#f0e8d0'); G.oe(x,11+y,1.5,2.5,'#ffc040'); }
    G.op(x-2,13+y,P[3]); G.op(x+2,13+y,P[3]);
  },
  caster:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    if(_msHas(F,'wings'))G.tri(x-3,13+y,x-13,4+y+(o.wing?6:0),x-4,22+y,shade(a,0.3));
    G.tri(x-8,29+y,x+8,29+y,x,11+y,d); G.r(x-7,26+y,14,3,d);
    if(_msHas(F,'belt'))G.r(x-4,19+y,8,1,a);
    G.e(x,9+y,3.5,3.5,b);
    if(_msHas(F,'hood')||!_msHas(F,'hat')){ G.e(x,8+y,5,4.5,d); G.e(x+1,10+y,2.5,2.5,b); }
    if(_msHas(F,'hat')){ G.tri(x-7,6+y,x+7,6+y,x+3,-5+y,d); G.r(x-7,5+y,15,2,d); G.p(x+3,-3+y,a); }
    if(_msHas(F,'horns')){ G.l(x-3,5+y,x-6,1+y,'#e8dcc0'); G.l(x+3,5+y,x+6,1+y,'#e8dcc0'); }
    if(_msHas(F,'crown'))G.r(x-3,4+y,7,1,'#e8c040');
    if(_msHas(F,'beard'))G.tri(x-2,11+y,x+3,11+y,x+1,17+y,'#e8e4dc');
    var ay=o.atk>=1?-4:0;
    if(_msHas(F,'book')){ G.r(x-9,15+y,5,4,a); G.p(x-7,15+y,'#fff'); }
    if(_msHas(F,'staff')){ G.l(x+7,27+y,x+7,6+y+ay,'#6a4a2a'); G.oe(x+7,5+y+ay,1.6,1.6,a); }
    else if(_msHas(F,'wand'))G.ol(x+5,16+y+ay,x+9,12+y+ay,a);
    else { G.r(x+5,15+y+ay,2,5,b); G.oe(x+7,13+y+ay,1.8,1.8,a); }
    if(_msHas(F,'cauldron')){ G.e(x-9,26,4,3,'#2a2a30'); G.oe(x-9,23,3,1,'#80ff60'); }
    if(_msHas(F,'mask'))G.r(x-1,8+y,5,3,'#e8e0cc');
    if(_msHas(F,'plague')){ G.tri(x+2,10+y,x+8,12+y,x+2,12+y,'#e8e0cc'); }
    G.op(x+1,9+y,P[3]); G.op(x+3,9+y,P[3]);
    if(_msHas(F,'runes'))for(var i=0;i<3;i++)G.op(x-8+i*8,3+y+(o.step?1:0)+(i%2),a);
  },
  plant:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    if(_msHas(F,'vines')){ var r=o.atk===2?6:0; G.l(x-3,24+y,x-10-r,18+y,d); G.l(x+3,24+y,x+10+r,17+y,d); }
    G.r(x-3,17+y,6,11,b); G.r(x-6,27,12,2,d);
    if(_msHas(F,'flower')){ for(var i=0;i<6;i++){ var an=i/6*Math.PI*2; G.e(x+Math.cos(an)*5,12+y+Math.sin(an)*5,2.5,2.5,a); } G.e(x,12+y,3,3,P[1]); }
    else if(_msHas(F,'bulb')){ G.e(x,13+y,6,5,a); if(o.atk===2)G.or(x+2,12+y,5,2,'#301010'); }
    else { G.e(x,13+y,9,5,a); G.op(x-4,11+y,'#fff4e0'); G.op(x+3,10+y,'#fff4e0'); G.op(x+6,13+y,'#fff4e0'); }
    if(_msHas(F,'thorns'))for(var t=0;t<3;t++){ G.p(x-4,19+y+t*3,'#e8dcc0'); G.p(x+3,20+y+t*3,'#e8dcc0'); }
    G.op(x-1,20+y,P[3]); G.op(x+2,20+y,P[3]);
    if(_msHas(F,'spores')&&o.atk===2)for(var s=0;s<8;s++)G.op(x-9+s*2.5,8+(s%3)*3,rgba(a,0.8));
  },
  tree:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    G.r(x-4,13+y,8,16,b); G.r(x-6,27,12,2,b); var r=o.atk===2?5:0;
    G.l(x-3,15+y,x-11-r,9+y,b); G.l(x+3,14+y,x+11+r,8+y,b);
    G.e(x,8+y,9,6,a); if(_msHas(F,'moss'))for(var i=0;i<4;i++)G.l(x-6+i*4,12+y,x-6+i*4,16+y+(i%2)*2,'#6a9a4a');
    G.or(x-2,17+y,4,1,'#1a1008'); G.op(x-2,15+y,P[3]); G.op(x+1,15+y,P[3]);
  },
  crab:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2], cl=o.atk===2?3:0;
    for(var i=0;i<3;i++){ G.l(x-5+i*2,23+y,x-9+i*2,28+y,d); G.l(x+5-i*2,23+y,x+9-i*2,28+y,d); }
    G.e(x-9-cl,16+y,3,2.5,b); G.e(x+9+cl,16+y,3,2.5,b); G.l(x-6,20+y,x-8-cl,18+y,b); G.l(x+6,20+y,x+8+cl,18+y,b);
    G.e(x,21+y,8,5,b); if(_msHas(F,'crystals'))for(var j=0;j<4;j++)G.tri(x-6+j*4,18+y,x-5+j*4,11+y,x-3+j*4,18+y,a);
    if(_msHas(F,'shell'))G.e(x,19+y,6,3,a);
    G.l(x-2,16+y,x-2,14+y,d); G.l(x+2,16+y,x+2,14+y,d); G.op(x-2,13+y,P[3]); G.op(x+2,13+y,P[3]);
  },
  frog:function(G,P,F,o){ var x=15+o.lx, y=o.dy*2, b=P[0], d=P[1], a=P[2];
    G.e(x-4,26+y,4,2,d); G.e(x+4,26+y,4,2,d);
    G.e(x,22+y,8,5,b); G.e(x,24+y,5,3,shade(b,0.25)); G.e(x-4,16+y,2.5,2.5,b); G.e(x+4,16+y,2.5,2.5,b);
    if(_msHas(F,'spots'))for(var i=0;i<4;i++)G.p(x-5+i*3,20+y+(i%2),a);
    if(_msHas(F,'glow'))G.oe(x,21+y,3,2,rgba(a,0.6));
    G.op(x-4,16+y,P[3]); G.op(x+4,16+y,P[3]);
    if(o.atk===2)G.ol(x+6,21+y,x+15,20+y,'#ff7090');
  },
  golem:function(G,P,F,o){ var x=16+o.lx, y=o.dy+(o.atk===2&&o.anim==='slam'?1:0), b=P[0], d=P[1], a=P[2], ay=o.atk===1?-5:o.atk===2?2:0;
    G.r(x-6,23+y,4,6,d); G.r(x+2,23+y,4,6,d);
    G.r(x-8,12+y,16,11,b); G.r(x-4,5+y,8,7,b);
    G.r(x-12,12+y+ay,4,11,b); G.r(x+8,12+y+ay,4,11,b);
    if(_msHas(F,'crystals')){ G.tri(x-10,12+y,x-8,5+y,x-6,12+y,a); G.tri(x+6,12+y,x+8,4+y,x+10,12+y,a); }
    if(_msHas(F,'moss')){ G.r(x-8,12+y,7,2,'#5a8a3a'); G.r(x-4,5+y,4,1,'#5a8a3a'); }
    if(_msHas(F,'columns'))for(var i=0;i<3;i++)G.r(x-7+i*5,13+y,1,9,shade(b,-0.3));
    if(_msHas(F,'rivets'))for(var j=0;j<4;j++)G.p(x-6+j*4,13+y,'#d8dce4');
    if(_msHas(F,'chess')){ G.r(x-4,2+y,8,3,b); G.p(x-4,1+y,b); G.p(x,1+y,b); G.p(x+3,1+y,b); }
    G.oe(x,17+y,2,2,a); G.op(x-2,8+y,P[3]); G.op(x+1,8+y,P[3]);
  },
  wraith:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2-1, b=P[0], d=P[1], a=P[2];
    G.e(x,17+y,6,6,d); G.e(x-1,22+y,4,3,d); G.e(x-2,25+y,2.5,2,d); G.p(x-3+(o.step?1:0),28+y,d);
    G.e(x,9+y,5,5,d); G.e(x+1,10+y,3,3,'#0a0810');
    var ay=o.atk>=1?-3:0; G.l(x-5,15+y,x-10,19+y+ay,d); G.l(x+5,15+y,x+10+(o.atk===2?3:0),18+y+ay,d);
    if(_msHas(F,'chains')){ G.ol(x-7,20+y,x-10,26+y,'#9a9aa4'); }
    if(_msHas(F,'crown'))G.r(x-3,4+y,7,1,'#e8c040');
    if(_msHas(F,'flames'))for(var i=0;i<5;i++)G.op(x-4+i*2,3+y+(i%2),'#ffb040');
    G.oe(x,17+y,7,7,rgba(a,0.15)); G.op(x,10+y,P[3]); G.op(x+2,10+y,P[3]);
  },
  drake:function(G,P,F,o){ MS_PLANS.quad(G,P,','+F.slice(1)+'wings,tail,spikes,horns,',o); if(o.atk===2&&o.anim!=='breath'){} },
  construct:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
    G.r(x-5,24+y,3,5,d); G.r(x+2,24+y,3,5,d); G.r(x-7,12+y,14,12,b); G.r(x-4,6+y,8,6,b); G.r(x-4,8+y,8,2,'#1a1a20');
    var ay=o.atk===1?-4:0; G.r(x-10,13+y+ay,3,9,d); G.r(x+7,13+y+ay,3,9,d);
    if(_msHas(F,'hammer')){ G.l(x+8,21+y+ay,x+11,9+y+ay,'#5a4a3a'); G.r(x+9,5+y+ay,6,4,a); }
    if(_msHas(F,'drill')){ G.tri(x+9,15+y,x+9,21+y,x+16,18+y,a); }
    if(_msHas(F,'gears'))G.oe(x,17+y,3,3,a,true); else G.oe(x,17+y,2,2,a);
    if(_msHas(F,'vents'))for(var i=0;i<3;i++)G.op(x-4+i*3,4+y-(o.step?1:0),'rgba(220,220,220,.6)');
    G.op(x-2,8+y,P[3]); G.op(x+1,8+y,P[3]);
  },
  bat:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2-3, b=P[0], d=P[1], wu=o.wing?5:-3;
    G.tri(x-2,14+y,x-14,8+y+wu,x-4,18+y,d); G.tri(x+2,14+y,x+14,8+y+wu,x+4,18+y,d);
    G.e(x,15+y,3.5,3.5,b); G.tri(x-3,12+y,x-2,8+y,x-1,12+y,b); G.tri(x+1,12+y,x+2,8+y,x+3,12+y,b);
    if(_msHas(F,'crystals'))G.tri(x-1,18+y,x,23+y,x+1,18+y,P[2]);
    G.op(x-1,14+y,P[3]); G.op(x+1,14+y,P[3]);
  },
  eel:function(G,P,F,o){ var x=o.lx, y=o.dy, b=P[0], a=P[2], ph=o.step?1:0;
    for(var i=0;i<22;i++){ var yy=20+Math.round(Math.sin((i+ph*2)*0.5)*3)+y-(o.atk===2&&i>16?(i-16):0); G.r(4+i+x,yy,1,3,b); if(i%3===0)G.p(4+i+x,yy+1,a); }
    G.e(27+x,17+y-(o.atk===2?5:0),3,2.5,b);
    if(_msHas(F,'water')||_msHas(F,'lava')){ var wc=_msHas(F,'lava')?'rgba(255,140,40,.7)':'rgba(120,200,255,.55)'; G.or(1,25,30,1,wc); G.or(4,26,24,1,wc); }
    G.op(28+x,16+y-(o.atk===2?5:0),P[3]);
  },
  turtle:function(G,P,F,o){ var x=15+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2], hide=o.atk===1;
    G.r(x-7,24+y,3,3,b); G.r(x+4,24+y,3,3,b);
    G.e(x,19+y,9,6,a); for(var i=0;i<3;i++)G.r(x-5+i*4,16+y,2,2,shade(a,-0.25));
    if(!hide){ G.e(x+10+(o.atk===2?2:0),19+y,3,2.5,b); G.op(x+11+(o.atk===2?2:0),18+y,P[3]); }
  },
  swarm:function(G,P,F,o){ var R=rngOf(7+(o.step?3:0)+o.atk*11), n=_msHas(F,'many')?22:14;
    for(var i=0;i<n;i++){ var px=6+R.f()*20+(o.atk===2?4:0), py=8+R.f()*16; G.p(px,py,P[0]); G.p(px+1,py,P[1]); G.op(px,py-1,rgba(P[2],0.7)); } },
  book:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2, f=o.wing?3:0;
    G.tri(x,16+y,x-11,10+y+f,x-10,20+y,P[0]); G.tri(x,16+y,x+11,10+y+f,x+10,20+y,P[0]);
    G.tri(x,17+y,x-9,12+y+f,x-8,19+y,'#f0e8d8'); G.tri(x,17+y,x+9,12+y+f,x+8,19+y,'#f0e8d8');
    G.op(x-4,14+y,P[3]); G.op(x+4,14+y,P[3]); for(var i=0;i<3;i++)G.op(x-6+i*6,23+y+(i%2),rgba(P[2],0.8));
  },
  eye:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2;
    if(_msHas(F,'crystals'))for(var i=0;i<6;i++){ var an=i/6*Math.PI*2; G.tri(x+Math.cos(an)*6,14+y+Math.sin(an)*6,x+Math.cos(an)*11,14+y+Math.sin(an)*11,x+Math.cos(an+0.3)*6,14+y+Math.sin(an+0.3)*6,P[2]); }
    if(_msHas(F,'tentacles'))for(var t=0;t<4;t++)G.l(x-4+t*3,19+y,x-5+t*3+(o.step?1:-1),27+y,P[1]);
    G.e(x,14+y,7,7,P[0]); G.e(x+1,14+y,4,4,P[2]); G.op(x+2,14+y,'#101010'); G.op(x+2,13+y,'#101010'); G.op(x-1,11+y,'rgba(255,255,255,.8)');
    if(o.atk===1)G.r(x-7,8+y,15,4,P[1]);
  },
  orb:function(G,P,F,o){ var x=16+o.lx, y=o.dy*2;
    G.oe(x,14+y,10,10,rgba(P[2],0.5),true); G.e(x,14+y,6,6,P[0]); G.r(x-6,14+y,13,1,P[1]);
    for(var i=0;i<4;i++){ var an=i/4*Math.PI*2+(o.step?0.4:0); G.op(x+Math.cos(an)*9,14+y+Math.sin(an)*9,P[2]); }
    G.op(x,13+y,P[3]); G.op(x+1,13+y,P[3]);
  },
  chesspiece:function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], a=P[2];
    G.r(x-7,25+y,14,4,b); G.r(x-5,21+y,10,4,b); G.r(x-4,13+y,8,8,b);
    if(_msHas(F,'rook')){ G.r(x-6,7+y,12,6,b); G.r(x-6,5+y,3,2,b); G.r(x-1,5+y,3,2,b); G.r(x+4,5+y,3,2,b); }
    else { G.tri(x-5,13+y,x+1,3+y,x+7,11+y,b); G.r(x+4,9+y,4,3,b); G.p(x,4+y,a); }
    G.oe(x,17+y,1.5,1.5,a); G.op(x+2,8+y,P[3]);
  }
};
// ── effects on the strike frame ────────────────────────────────────────
var MS_FX={
  lunge:function(G,P){ for(var i=0;i<7;i++){ var an=-1.1+i*0.35; G.op(20+Math.cos(an)*9,16+Math.sin(an)*9,i%2?'#ffffff':P[2]); } },
  shoot:function(G,P){ G.or(26,14,3,3,P[2]); G.ol(20,15,25,15,rgba(P[2],0.5)); G.op(29,15,'#ffffff'); },
  spit:function(G,P){ G.oe(27,12,2,2,P[2]); G.op(24,14,rgba(P[2],0.6)); G.op(22,16,rgba(P[2],0.4)); },
  cast:function(G,P){ G.oe(16,15,13,13,rgba(P[2],0.85),true); for(var i=0;i<6;i++){ var an=i/6*Math.PI*2; G.op(16+Math.cos(an)*9,15+Math.sin(an)*9,'#ffffff'); } },
  slam:function(G,P){ for(var i=0;i<12;i++){ G.op(3+i*2.3,30-(i%2),'rgba(210,200,180,.9)'); } G.oe(16,29,14,2,'rgba(210,200,180,.35)',true); },
  breath:function(G,P){ for(var i=0;i<14;i++){ var d=i*0.55; G.or(23+i*0.6,13-d*0.45,1,Math.max(1,d),i%3?P[2]:'#ffe080'); } },
  burrow:function(G,P){ for(var k=22*32;k<1024;k++){ G.c[k]=null; } for(var x=2;x<30;x++){ var h=Math.round(3-Math.abs(x-16)/6); if(h>0)G.or(x,28-h,1,h+1,'#6a4a2a'); } },
  blink:function(G,P){ for(var y=0;y<32;y++)for(var x=0;x<32;x++)if((x+y)%2&&G.c[y*32+x])G.c[y*32+x]=null; for(var i=0;i<6;i++)G.op(6+i*4,6+(i%3)*8,'#ffffff'); },
  spin:function(G,P){ G.oe(16,17,12,6,'rgba(255,255,255,.7)',true); },
  dive:function(G,P){ for(var i=0;i<4;i++)G.ol(4+i*3,6+i*2,8+i*3,10+i*2,'rgba(255,255,255,.7)'); },
  pulse:function(G,P){ G.oe(16,17,14,10,rgba(P[2],0.75),true); G.oe(16,17,9,6,rgba(P[2],0.45),true); },
  summon:function(G,P){ G.oe(26,26,4,1.5,rgba(P[2],0.9),true); G.or(25,21,3,4,rgba(P[2],0.6)); },
  beam:function(G,P){ G.or(20,14,12,2,P[2]); G.or(20,13,12,1,rgba(P[2],0.4)); G.or(20,16,12,1,rgba(P[2],0.4)); },
  lob:function(G,P){ G.oe(24,6,2,2,P[2]); G.op(21,8,rgba(P[2],0.5)); G.oe(28,28,3,1,rgba(P[2],0.5),true); }
};
function msPaint(spec,frame){
  var G=_msGrid(), F=','+(spec.feat||'')+',', P=spec.pal;
  var o={dy:frame===1?-1:0, lx:frame===2?-1:frame===3&&(spec.anim==='lunge'||spec.anim==='dive')?2:0, step:frame%2, wing:frame===1||frame===3?1:0, atk:frame===2?1:frame===3?2:0, anim:spec.anim};
  (MS_PLANS[spec.plan]||MS_PLANS.biped)(G,P,F,o);
  _msShadeOutline(G);
  if(frame===2&&(spec.anim==='cast'||spec.anim==='shoot'||spec.anim==='beam'))G.oe(16,15,4,4,rgba(P[2],0.45));
  if(frame===3&&MS_FX[spec.anim])MS_FX[spec.anim](G,P);
  var cv=mkCanvas(32,32), x=cv.getContext('2d');
  x.fillStyle='rgba(0,0,0,.28)'; x.beginPath(); x.ellipse(16,29.5,9,2,0,0,Math.PI*2); x.fill();
  for(var k=0;k<1024;k++){ var c=G.c[k]; if(c){ x.fillStyle=c; x.fillRect(k%32,(k/32)|0,1,1); } }
  for(var k2=0;k2<1024;k2++){ var c2=G.o[k2]; if(c2){ x.fillStyle=c2; x.fillRect(k2%32,(k2/32)|0,1,1); } }
  return cv;
}
function msFrames(spec){ if(!spec._fr)spec._fr=[0,1,2,3].map(function(f){ return msPaint(spec,f); }); return spec._fr; }

// ── roster helper (43–46: one file per quadrant) ────────────────────────
// seg: main (mainland) · dun (dungeon: role melee/ranged) · tow (tower: magic)
// tags: pack · night · T:<where it spawns>   reuse: existing game monster id
var MON_ROSTER=[];
function MON(q,seg,role,tier,id,name,spr,tags,look,move,atk,def,sp,reuse){
  var pal=spr[2].split(',');
  MON_ROSTER.push({q:q,seg:seg,role:role||(seg==='tow'?'magic':seg==='main'?'mainland':''),tier:tier,id:id,name:name,
    spec:{plan:spr[0],anim:spr[1],pal:pal,feat:spr[3]||''},tags:tags?tags.split('|'):[],look:look,move:move,atk:atk,def:def,sp:sp,reuse:reuse||null});
}
