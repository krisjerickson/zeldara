// ═══════════════════════════════════════════════════════════════════════
// ║ 07zsl-soullines.js — round 68: THE SOUL-LINES, shared by the game and the Lab (doc 30 §2).
// ║ Kris's picks: the World-Tree design (Lab round A) drawn as the rune vein with a wave of light motes running along it (round B);
// ║ the ring round each runestone is also the outline of an end-game hamlet. Painted pieces: scenery wave 74 (sl_rune_*, sl_seed,
// ║ sl_ring_a/b, sl_mote_*).
// ║  · ZSL.build(src) — the tattoo as strands of points in map tiles, each point owned by the nearest zone (40 zones = 40 spirits; -1 near
// ║    the village), the crossings woven over and under, runes stamped along the strands, a seed and a ring at every zone's runestone.
// ║    src = {cls, W, H, C:{x,y} the village, at(z) → {x,y} where a zone's runestone stands (default: the zone's centre)}.
// ║  · ZSL.paint(ctx, D, V, o) — draws it: o.style 'vein' (the light) or 'green' (after the gods: paths of grass and stone), o.lit(owner),
// ║    o.img(id) → [image, sx, sy, sw, sh] for the painted pieces (procedural stand-ins when missing).
// ║ The geometry is the Lab round A World-Tree, unchanged, so the Lab and the game draw the same tattoo.
// ═══════════════════════════════════════════════════════════════════════
var ZSL=(function(){
  var TAU=Math.PI*2, S={ RUNE_STEP:4.2, RING_R:11, RING:'vein' };      // RING: 'vein' (the ring drawn as the line itself) or 'painted' (sl_ring_a)
  var rnd=function(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; };
  // ── curve helpers (as in the Lab, round 67) ──
  var cat=function(P,closed,step){ var out=[], n=P.length, g=function(i){ return closed?P[(i+n)%n]:P[Math.max(0,Math.min(n-1,i))]; }; step=step||8;
    for(var i=0;i<(closed?n:n-1);i++){ var p0=g(i-1), p1=g(i), p2=g(i+1), p3=g(i+2), d=Math.hypot(p2.x-p1.x,p2.y-p1.y), m=Math.max(2,Math.ceil(d/step));
      for(var j=0;j<m;j++){ var t=j/m, t2=t*t, t3=t2*t; out.push({x:0.5*((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),y:0.5*((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3)}); } }
    if(!closed)out.push(P[n-1]); else out.push(out[0]); return out; };
  var bez=function(a,b,bulge,step){ var mx=(a.x+b.x)/2, my=(a.y+b.y)/2, dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1, cx=mx-dy/L*bulge*L, cy=my+dx/L*bulge*L, n=Math.max(3,Math.ceil(L/(step||7))), out=[];
    for(var i=0;i<=n;i++){ var t=i/n, u=1-t; out.push({x:u*u*a.x+2*u*t*cx+t*t*b.x,y:u*u*a.y+2*u*t*cy+t*t*b.y}); } return out; };
  var norm=function(P,i){ var a=P[Math.max(0,i-1)], b=P[Math.min(P.length-1,i+1)], dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1; return {x:-dy/L,y:dx/L}; };
  var twist=function(P,amp,wave,ph){ var A=[], B=[], s=0; for(var i=0;i<P.length;i++){ if(i)s+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y); var n=norm(P,i), o=amp*Math.sin(s/wave*TAU+(ph||0)); A.push({x:P[i].x+n.x*o,y:P[i].y+n.y*o}); B.push({x:P[i].x-n.x*o,y:P[i].y-n.y*o}); } return [A,B]; };
  var circ=function(c,r,n,a0){ var out=[]; n=n||Math.max(16,Math.round(r*1.2)); for(var i=0;i<=n;i++){ var a=(a0||0)+i/n*TAU; out.push({x:c.x+Math.cos(a)*r,y:c.y+Math.sin(a)*r}); } return out; };
  var spiral=function(c,r,turns,a0,dir){ var out=[], n=Math.round(24*turns); for(var i=0;i<=n;i++){ var t=i/n, a=a0+dir*t*turns*TAU, rr=r*(1-0.8*t); out.push({x:c.x+Math.cos(a)*rr,y:c.y+Math.sin(a)*rr}); } return out; };
  // a rosette at a rune: the ring (kind 'ring' — the hamlet's outline at the end) and three interlaced loops inside it (not a valknut)
  var rosette=function(c,r,a0){ var L=[{pts:circ(c,r,40,a0),ring:1}]; for(var k=0;k<3;k++){ var a=a0+k/3*TAU; L.push({pts:circ({x:c.x+Math.cos(a)*r*0.42,y:c.y+Math.sin(a)*r*0.42},r*0.5,28,a)}); } return L; };
  // ── the island: the village, the 40 runestones, a smooth ring inside the coast ──
  S.geo=function(src){ var W=src.W, H=src.H, cls=src.cls, C={x:src.C.x,y:src.C.y}, SEA0=(typeof WM!=='undefined'?WM.OCEAN:0), SEA1=(typeof WM!=='undefined'?WM.SHALLOW:1);
    var Z=WMAP_ZONES.map(function(z,i){ var p=src.at?src.at(z):null; return {x:p?p.x:z.x,y:p?p.y:z.y,r:z.r,i:i,id:z.id}; });
    var sea=function(x,y){ x=Math.round(x); y=Math.round(y); if(x<0||y<0||x>=W||y>=H)return true; var c=cls[y*W+x]; return c===SEA0||c===SEA1; };
    var rc=[]; for(var k=0;k<180;k++){ var a=k/180*TAU, r=40, last=40, run=0; for(r=40;r<760;r+=3){ if(sea(C.x+Math.cos(a)*r,C.y+Math.sin(a)*r)){ run++; if(run>8)break; } else { run=0; last=r; } } rc.push(last); }
    var sm=rc.map(function(_,k){ var s=0; for(var j=-6;j<=6;j++)s+=rc[(k+j+180)%180]; return s/13; });
    var ring=function(f,off){ return sm.map(function(r,k){ var a=k/180*TAU; return {x:C.x+Math.cos(a)*(r*f+(off||0)),y:C.y+Math.sin(a)*(r*f+(off||0))}; }); };
    var reg={}; [1,2,3,4].forEach(function(q){ var L=Z.filter(function(z){ return z.r===q; }), x=0, y=0; L.forEach(function(z){ x+=z.x; y+=z.y; }); x/=L.length; y/=L.length; reg[q]={x:x,y:y,a:Math.atan2(y-C.y,x-C.x),L:L}; });
    return {W:W,H:H,C:C,Z:Z,ring:ring,reg:reg}; };
  // ── the World-Tree (Kris's pick, round 68) ──
  var tree=function(G){ var C=G.C, out=[], add=function(p,w){ out.push({pts:p,w:w||1}); }, rd=out.roads=[];      // rd: the roads after the gods (round 69)
    add(circ(C,34),1.3); add(circ(C,44),1);
    [1,2,3,4].forEach(function(q){ var R=G.reg[q], a=R.a, base={x:C.x+Math.cos(a)*44,y:C.y+Math.sin(a)*44}, mid={x:(base.x+R.x)/2,y:(base.y+R.y)/2};
      var bough=cat([base,{x:mid.x+Math.cos(a+1.2)*30,y:mid.y+Math.sin(a+1.2)*30},{x:R.x,y:R.y}],false,6); twist(bough,9,130,q).forEach(function(s){ add(s,1.1); }); rd.push([{x:C.x+Math.cos(a)*31,y:C.y+Math.sin(a)*31}].concat(bough));
      var nodes=[{x:R.x,y:R.y}], left=R.L.slice(), rr=rnd(q*977);
      while(left.length){ var best=null, bd=1e9, bn=null; left.forEach(function(z){ nodes.forEach(function(n){ var d=Math.hypot(n.x-z.x,n.y-z.y); if(d<bd){ bd=d; best=z; bn=n; } }); });
        var br=bez(bn,best,(rr()<0.5?-1:1)*(0.18+rr()*0.12)); add(br,0.8); rd.push(br); add(spiral(best,14,1.2,Math.atan2(best.y-bn.y,best.x-bn.x),rr()<0.5?-1:1),0.6); nodes.push(best); nodes.push(br[Math.floor(br.length/2)]); left.splice(left.indexOf(best),1); } });
    twist(cat(G.ring(0.9),true,8),8,150,0).forEach(function(s){ add(s,0.9); });      // the roots knotted round the coast
    return out; };
  // ── the hamlet in each ring, after the gods (round 69 — Kris: "Make a smaller zeldara rune logo around the center rune, similar to the one in
  //    the original village, and then make roads that are more organized like a village immediately around the logo"). Tiles from the stone. ──
  S.HAM={ logo:3.7, plaza:4.8, ring:12, lane:1.6,
    spots:[['work',-6.3,-3.7],['home',6.3,-3.7],['home',-6.4,8.5],['home',6.4,8.5],['well',3.1,-6.6],['yard',-14.6,2.6],['cart',14.4,3.4]] };
  // ── build: owners, crossings (over/under), runes, seeds, rings, chunk buckets ──
  S.build=function(src){ var G=S.geo(src), St=tree(G), Zs=G.Z, RD=St.roads||[];
    Zs.forEach(function(z,i){ rosette(z,S.RING_R,i*0.7).forEach(function(r){ St.push({pts:r.pts,w:0.6,own:i,ring:r.ring?i:undefined}); }); });
    St.forEach(function(s,si){ s.id=si; s.owner=s.pts.map(function(p){ if(s.own!==undefined)return s.own; if(Math.hypot(p.x-G.C.x,p.y-G.C.y)<60)return -1; var b=0, bd=1e9; for(var i=0;i<Zs.length;i++){ var d=(p.x-Zs[i].x)*(p.x-Zs[i].x)+(p.y-Zs[i].y)*(p.y-Zs[i].y); if(d<bd){ bd=d; b=i; } } return b; }); s.gap=s.pts.map(function(){ return 0; }); });
    var B={}, BS=24, seg=[]; St.forEach(function(s){ for(var i=0;i<s.pts.length-1;i++){ var a=s.pts[i], b=s.pts[i+1], k=seg.length; seg.push([s.id,i,a,b]);
      var x0=Math.floor(Math.min(a.x,b.x)/BS), x1=Math.floor(Math.max(a.x,b.x)/BS), y0=Math.floor(Math.min(a.y,b.y)/BS), y1=Math.floor(Math.max(a.y,b.y)/BS); for(var x=x0;x<=x1;x++)for(var y=y0;y<=y1;y++){ var kk=x+','+y; (B[kk]||(B[kk]=[])).push(k); } } });
    var X=[], seen={}; Object.keys(B).forEach(function(k){ var L=B[k]; for(var u=0;u<L.length;u++)for(var v=u+1;v<L.length;v++){ var p=seg[L[u]], q=seg[L[v]]; if(p[0]===q[0]&&Math.abs(p[1]-q[1])<4)continue; var key=L[u]+'_'+L[v]; if(seen[key])continue; seen[key]=1;
      var a=p[2], b=p[3], c=q[2], d=q[3], den=(b.x-a.x)*(d.y-c.y)-(b.y-a.y)*(d.x-c.x); if(Math.abs(den)<1e-6)continue; var t=((c.x-a.x)*(d.y-c.y)-(c.y-a.y)*(d.x-c.x))/den, w=((c.x-a.x)*(b.y-a.y)-(c.y-a.y)*(b.x-a.x))/den; if(t<0||t>1||w<0||w>1)continue;
      X.push({s1:p[0],i1:p[1],s2:q[0],i2:q[1],x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}); } });
    var par={}; X.sort(function(a,b){ return a.s1-b.s1||a.i1-b.i1; }).forEach(function(x){ var o=(par[x.s1]=(par[x.s1]||0)+1)%2; var under=o?x.s2:x.s1, ui=o?x.i2:x.i1, g=St[under].gap; for(var k=-1;k<=1;k++)if(ui+k>=0&&ui+k<g.length)g[ui+k]=1; });
    // runes stamped along the strands (both sides in turn), away from the gaps and the rings (the painted ring carries its own)
    var runes=[], n=0; St.forEach(function(s){ var acc=S.RUNE_STEP*0.5; for(var i=1;i<s.pts.length;i++){ var a=s.pts[i-1], b=s.pts[i], d=Math.hypot(b.x-a.x,b.y-a.y);
      while(acc<=d){ var u=d?acc/d:0, ang=Math.atan2(b.y-a.y,b.x-a.x), side=(n%2?1:-1)*0.72; if(!s.gap[i]&&!s.gap[i-1])runes.push({x:a.x+(b.x-a.x)*u-Math.sin(ang)*side,y:a.y+(b.y-a.y)*u+Math.cos(ang)*side,o:s.owner[i],k:n%8,s:s.id,i:i,ring:s.ring!==undefined}); n++; acc+=S.RUNE_STEP; } acc-=d; } });
    // each zone's piece: its farthest point from the runestone (the trace runs out to it)
    var reach=Zs.map(function(){ return 12; }); St.forEach(function(s){ s.pts.forEach(function(p,i){ var o=s.owner[i]; if(o<0)return; var d=Math.hypot(p.x-Zs[o].x,p.y-Zs[o].y); if(d>reach[o])reach[o]=d; }); });
    // chunk buckets (CH tiles), so a ground chunk only looks at what crosses it
    // the roads after the gods: each point owned like the lines; the bit inside a hamlet's ring road is left out (the hamlet has its own lanes)
    var roads=RD.map(function(P,ri){ var own=[], cut=[]; P.forEach(function(p){ var b=-1, bd=1e9; for(var i=0;i<Zs.length;i++){ var d=Math.hypot(p.x-Zs[i].x,p.y-Zs[i].y); if(d<bd){ bd=d; b=i; } }
      own.push(Math.hypot(p.x-G.C.x,p.y-G.C.y)<60?-1:b); cut.push(bd<S.HAM.ring-0.2||Math.hypot(p.x-G.C.x,p.y-G.C.y)<29?1:0); }); return {id:ri,pts:P,owner:own,cut:cut}; });
    var CH=src.CH||32, cb={}, put=function(x0,y0,x1,y1,kind,id){ for(var cx=Math.floor(x0/CH);cx<=Math.floor(x1/CH);cx++)for(var cy=Math.floor(y0/CH);cy<=Math.floor(y1/CH);cy++){ var k=cx+'_'+cy, e=cb[k]||(cb[k]={st:[],z:[],ru:[],rd:[]}); if(e[kind].indexOf(id)<0)e[kind].push(id); } };
    roads.forEach(function(r){ r.pts.forEach(function(p){ put(p.x-2,p.y-2,p.x+2,p.y+2,'rd',r.id); }); });
    St.forEach(function(s){ for(var i=0;i<s.pts.length;i++){ var p=s.pts[i]; put(p.x-2,p.y-2,p.x+2,p.y+2,'st',s.id); } });
    Zs.forEach(function(z,i){ var R=S.HAM.ring+2; put(z.x-R,z.y-R,z.x+R,z.y+R,'z',i); });
    runes.forEach(function(r,i){ put(r.x-1,r.y-1,r.x+1,r.y+1,'ru',i); });
    return {St:St,X:X,G:G,runes:runes,reach:reach,cb:cb,CH:CH,roads:roads}; };
  // ── drawing ──
  // V: {x0,y0} the tile at the canvas origin, k pixels per tile; o: {lit(owner), ok(s,i) (the trace), style 'vein'|'green', night, img(id), only:[strand ids] (a chunk's list), zones:[zone ids]}
  S.paint=function(ctx,D,V,o){ o=o||{}; var k=V.k, X=function(x){ return (x-V.x0)*k; }, Y=function(y){ return (y-V.y0)*k; }, lit=o.lit||function(){ return true; }, ok=o.ok||null, green=o.style==='green';
    var img=o.img||function(){ return null; }, ringImg=!green&&(o.ring||S.RING)==='painted'&&img(o.ringId||'sl_ring_a'), L=o.only?o.only.map(function(i){ return D.St[i]; }):D.St;
    var on=function(s,i){ var w=s.owner[i]; return lit(w)&&(!ok||ok(s,i)); };
    var pass=function(width,style,useGap,skipRing){ ctx.strokeStyle=style; ctx.lineWidth=width; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath();
      L.forEach(function(s){ if(skipRing&&s.ring!==undefined)return; var dn=false; for(var i=0;i<s.pts.length;i++){ var p=s.pts[i]; if(on(s,i)&&!(useGap&&s.gap[i])){ var x=X(p.x), y=Y(p.y); if(dn)ctx.lineTo(x,y); else { ctx.moveTo(x,y); dn=true; } } else dn=false; } });
      ctx.stroke(); };
    ctx.save();
    if(green){      // after the gods (round 69): roads joining the hamlets along where the lines ran, and each hamlet's own lanes round its rune
      var tex=o.tex||function(){ return null; }, pat=function(id,fb){ var im=tex(id); if(!im)return fb; try{ var P=ctx.createPattern(im,'repeat'); if(P&&P.setTransform&&typeof DOMMatrix!=='undefined')P.setTransform(new DOMMatrix().translateSelf(-V.x0*k,-V.y0*k).scaleSelf(3*k/(im.width||256),3*k/(im.width||256))); return P||fb; }catch(e){ return fb; } };
      var DIRT=pat('tx_dirt','#9b8460')/* one texture = 4 × 4 tiles, as on the ground */, COB=pat('tx_cobble','#a8a294'), H=S.HAM;
      var RL=o.roads?o.roads.map(function(i){ return D.roads[i]; }):(D.roads||[]);
      var road=function(width,style){ ctx.strokeStyle=style; ctx.lineWidth=width; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath();
        RL.forEach(function(r){ var dn=false; for(var i=0;i<r.pts.length;i++){ var p=r.pts[i]; if(lit(r.owner[i])&&!r.cut[i]){ var x=X(p.x), y=Y(p.y); if(dn)ctx.lineTo(x,y); else { ctx.moveTo(x,y); dn=true; } } else dn=false; } }); ctx.stroke(); };
      if(o.grassUnder){ var GR=pat('tx_grass','#5d8a4c'); road((2.4+3.2)*k,GR); (o.zones?o.zones:D.G.Z.map(function(z,i){ return i; })).forEach(function(i){ var z=D.G.Z[i]; if(!lit(i))return; ctx.fillStyle=GR; ctx.beginPath(); ctx.arc(X(z.x),Y(z.y),(H.ring+3.6)*k,0,TAU); ctx.fill(); }); }      // the Lab: the land under the hamlets and roads turns to grass (the game carves it, 10zh)
      road(3.0*k,'rgba(60,50,32,.32)'); road(2.4*k,DIRT); road(2.4*k,'rgba(120,96,60,.16)');
      var Zh=o.zones?o.zones:D.G.Z.map(function(z,i){ return i; });
      Zh.forEach(function(i){ var z=D.G.Z[i]; if(!lit(i))return; var cx=X(z.x), cy=Y(z.y);
        ctx.lineCap='butt'; ctx.strokeStyle='rgba(60,50,32,.32)'; ctx.lineWidth=2.5*k; ctx.beginPath(); ctx.arc(cx,cy,H.ring*k,0,TAU); ctx.stroke();      // the ring road (the soul ring Kris kept)
        ctx.strokeStyle=DIRT; ctx.lineWidth=2.0*k; ctx.beginPath(); ctx.arc(cx,cy,H.ring*k,0,TAU); ctx.stroke();
        ctx.strokeStyle='rgba(50,44,36,.35)'; ctx.lineWidth=(H.lane+0.4)*k; ctx.beginPath(); [[0,-1],[1,0],[0,1],[-1,0]].forEach(function(d){ ctx.moveTo(cx+d[0]*H.plaza*k,cy+d[1]*H.plaza*k); ctx.lineTo(cx+d[0]*H.ring*k,cy+d[1]*H.ring*k); }); ctx.stroke();
        ctx.strokeStyle=COB; ctx.lineWidth=H.lane*k; ctx.stroke();      // four lanes, north, east, south and west
        ctx.strokeStyle='rgba(50,44,36,.35)'; ctx.lineWidth=1.9*k; ctx.beginPath(); ctx.arc(cx,cy,H.plaza*k,0,TAU); ctx.stroke(); ctx.strokeStyle=COB; ctx.lineWidth=1.5*k; ctx.stroke();      // the little square round the rune
        var lg=img('rn_green'); if(lg){ var w=2*H.logo*k; ctx.drawImage(lg[0],lg[1],lg[2],lg[3],lg[4],cx-w/2,cy-w/2,w,w*lg[4]/lg[3]); }
        else { ctx.fillStyle='rgba(111,227,245,.35)'; ctx.beginPath(); ctx.arc(cx,cy,H.logo*k,0,TAU); ctx.fill(); } });
      ctx.restore(); return; }
    var nt=!!o.night, sb=Math.max(2,k*(nt?0.44:0.26));
    pass(1.3*k,'rgba(111,227,245,'+(nt?0.22:0.13)+')',true,!!ringImg);
    pass(0.5*k,'rgba(4,22,30,'+(nt?0.2:0.32)+')',true,!!ringImg);
    ctx.save(); ctx.shadowColor='#6fe3f5'; ctx.shadowBlur=sb; pass(0.26*k,'#d8fbff',true,!!ringImg); ctx.restore();
    // the runes beside the vein
    var R=o.runes?o.runes.map(function(i){ return D.runes[i]; }):D.runes, rs=0.9*k;
    R.forEach(function(r){ var s=D.St[r.s]; if(!on(s,r.i)||(r.ring&&ringImg))return; var im=img('sl_rune_'+'abcdefgh'[r.k]), x=X(r.x), y=Y(r.y);
      if(im){ var h=rs, w=h*im[3]/im[4], gr=ctx.createRadialGradient(x,y,0,x,y,h*0.9); gr.addColorStop(0,'rgba(111,227,245,'+(nt?0.5:0.32)+')'); gr.addColorStop(1,'rgba(111,227,245,0)'); ctx.fillStyle=gr; ctx.fillRect(x-h,y-h,h*2,h*2); ctx.drawImage(im[0],im[1],im[2],im[3],im[4],x-w/2,y-h/2,w,h); }
      else { ctx.strokeStyle='#8ff0ff'; ctx.lineWidth=Math.max(1,0.08*k); ctx.beginPath(); ctx.moveTo(x,y-rs*0.4); ctx.lineTo(x,y+rs*0.4); ctx.moveTo(x,y-rs*0.15); ctx.lineTo(x+rs*0.3,y-rs*0.4); ctx.stroke(); } });
    // the ring and the seed at each lit runestone
    var Zl=o.zones?o.zones:D.G.Z.map(function(z,i){ return i; });
    Zl.forEach(function(i){ var z=D.G.Z[i]; if(!lit(i)||(ok&&!ok(null,i)))return; var x=X(z.x), y=Y(z.y);
      if(ringImg){ var w=2*S.RING_R*k*ringImg[3]/(ringImg[3]*0.86), h=w*ringImg[4]/ringImg[3]; ctx.drawImage(ringImg[0],ringImg[1],ringImg[2],ringImg[3],ringImg[4],x-w/2,y-h/2,w,h); }
      var sd=img('sl_seed'); if(sd){ var ws=3*k; ctx.drawImage(sd[0],sd[1],sd[2],sd[3],sd[4],x-ws/2,y-ws/2,ws,ws*sd[4]/sd[3]); } });
    ctx.restore(); };
  // a point at distance d along a strand from index i (for the motes)
  S.along=function(s,i,d){ var p=s.pts; while(i<p.length-1){ var a=p[i], b=p[i+1], L=Math.hypot(b.x-a.x,b.y-a.y); if(d<=L){ var u=L?d/L:0; return {x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u,i:i}; } d-=L; i++; } return null; };
  return S; })();
