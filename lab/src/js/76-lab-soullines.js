// ═══════════════════════════════════════════════════════════════════════
// ║ 76-lab-soullines.js — round 67: SOUL-LINES, Lab round A — the tattoo over the whole land (doc 30).
// ║ Kris: "each of the bound spirits that you release ... soul-lines that are our bright light blue color of the runes get traced into the
// ║ ground in the region around the freed spirit and the attached rune ... when you zoom out and start to look at the entire world map, you
// ║ eventually realize that they make a pattern like norse tattoo ... across the entire map". Card: try all four designs on the real island.
// ║  · Each design is one original knot drawing laid over the game's own map (buildWorldMap, the same island), passing every zone's rune.
// ║    It is cut into 40 pieces — each bit of line belongs to the nearest zone — so freeing a spirit lights its piece; neighbours join up.
// ║  · The slider frees spirits 0 → 40 (realm by realm, or scattered as in play); the newest piece traces out from its rune.
// ║  · Hints (Kris's card): once a realm is 8/10 freed, its missing pieces show as faint dotted ghosts.
// ║  · Knotwork: wherever lines cross, they weave over and under (a gap in the line underneath).
// ║ Kris's tattoo pictures are style only — nothing is copied from them, and there is no valknut.
// ═══════════════════════════════════════════════════════════════════════
var LSL=(function(){ if(typeof LBR==='undefined'||typeof buildWorldMap==='undefined'||typeof LabMap==='undefined')return null;
  var S={ N:40, order:'realm', hints:true, play:false, litAt:{}, cache:{}, G:null, D:{} };
  var TAU=Math.PI*2, COL='#6fe3f5', GLOW='rgba(111,227,245,', INK='rgba(4,16,24,';
  var rnd=function(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; };
  // ── the island: the village, the 40 zone runes, a smooth ring inside the coast ──
  S.geo=function(){ if(S.G)return S.G; var M=LabMap.build(), W=M.W, C={x:M.village.x,y:M.village.y}, Z=WMAP_ZONES.map(function(z,i){ return {x:z.x,y:z.y,r:z.r,i:i,id:z.id}; });
    var sea=function(x,y){ x=Math.round(x); y=Math.round(y); if(x<0||y<0||x>=W||y>=M.H)return true; var c=M.cls[y*W+x]; return c===WM.OCEAN||c===WM.SHALLOW; };
    var rc=[]; for(var k=0;k<180;k++){ var a=k/180*TAU, r=40, last=40, run=0; for(r=40;r<760;r+=3){ if(sea(C.x+Math.cos(a)*r,C.y+Math.sin(a)*r)){ run++; if(run>8)break; } else { run=0; last=r; } } rc.push(last); }
    var sm=rc.map(function(_,k){ var s=0; for(var j=-6;j<=6;j++)s+=rc[(k+j+180)%180]; return s/13; });
    var ring=function(f,off){ return sm.map(function(r,k){ var a=k/180*TAU; return {x:C.x+Math.cos(a)*(r*f+(off||0)),y:C.y+Math.sin(a)*(r*f+(off||0))}; }); };
    var reg={}; [1,2,3,4].forEach(function(q){ var L=Z.filter(function(z){ return z.r===q; }), x=0, y=0; L.forEach(function(z){ x+=z.x; y+=z.y; }); x/=L.length; y/=L.length; reg[q]={x:x,y:y,a:Math.atan2(y-C.y,x-C.x),L:L}; });
    return (S.G={M:M,C:C,Z:Z,ring:ring,sm:sm,reg:reg}); };
  // ── curve helpers ──
  var cat=function(P,closed,step){ var out=[], n=P.length, g=function(i){ return closed?P[(i+n)%n]:P[Math.max(0,Math.min(n-1,i))]; }; step=step||8;
    for(var i=0;i<(closed?n:n-1);i++){ var p0=g(i-1), p1=g(i), p2=g(i+1), p3=g(i+2), d=Math.hypot(p2.x-p1.x,p2.y-p1.y), m=Math.max(2,Math.ceil(d/step));
      for(var j=0;j<m;j++){ var t=j/m, t2=t*t, t3=t2*t; out.push({x:0.5*((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),y:0.5*((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3)}); } }
    if(!closed)out.push(P[n-1]); else out.push(out[0]); return out; };
  var bez=function(a,b,bulge,step){ var mx=(a.x+b.x)/2, my=(a.y+b.y)/2, dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1, cx=mx-dy/L*bulge*L, cy=my+dx/L*bulge*L, n=Math.max(3,Math.ceil(L/(step||7))), out=[];
    for(var i=0;i<=n;i++){ var t=i/n, u=1-t; out.push({x:u*u*a.x+2*u*t*cx+t*t*b.x,y:u*u*a.y+2*u*t*cy+t*t*b.y}); } return out; };
  var norm=function(P,i){ var a=P[Math.max(0,i-1)], b=P[Math.min(P.length-1,i+1)], dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1; return {x:-dy/L,y:dx/L}; };
  // a cord of two strands twisting round each other (they cross every half wave — knotwork)
  var twist=function(P,amp,wave,ph){ var A=[], B=[], s=0; for(var i=0;i<P.length;i++){ if(i)s+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y); var n=norm(P,i), o=amp*Math.sin(s/wave*TAU+(ph||0)); A.push({x:P[i].x+n.x*o,y:P[i].y+n.y*o}); B.push({x:P[i].x-n.x*o,y:P[i].y-n.y*o}); } return [A,B]; };
  var circ=function(c,r,n,a0){ var out=[]; n=n||Math.max(16,Math.round(r*1.2)); for(var i=0;i<=n;i++){ var a=(a0||0)+i/n*TAU; out.push({x:c.x+Math.cos(a)*r,y:c.y+Math.sin(a)*r}); } return out; };
  var spiral=function(c,r,turns,a0,dir){ var out=[], n=Math.round(24*turns); for(var i=0;i<=n;i++){ var t=i/n, a=a0+dir*t*turns*TAU, rr=r*(1-0.8*t); out.push({x:c.x+Math.cos(a)*rr,y:c.y+Math.sin(a)*rr}); } return out; };
  // a triquetra rosette at a rune (three interlaced loops in a ring) — not a valknut
  var rosette=function(c,r,a0){ var L=[circ(c,r,40,a0)]; for(var k=0;k<3;k++){ var a=a0+k/3*TAU; L.push(circ({x:c.x+Math.cos(a)*r*0.42,y:c.y+Math.sin(a)*r*0.42},r*0.5,28,a)); } return L; };
  var nearest=function(P,q){ var b=0, bd=1e9; P.forEach(function(p,i){ var d=Math.hypot(p.x-q.x,p.y-q.y); if(d<bd){ bd=d; b=i; } }); return {i:b,p:P[b],d:bd}; };
  // ── the four designs: each returns a list of strands {pts, w} ──
  var DES={
    sl_tree:function(G){ var C=G.C, out=[], add=function(p,w){ out.push({pts:p,w:w||1}); };
      circ(C,34).length; add(circ(C,34),1.3); add(circ(C,44),1);
      [1,2,3,4].forEach(function(q){ var R=G.reg[q], a=R.a, base={x:C.x+Math.cos(a)*44,y:C.y+Math.sin(a)*44}, mid={x:(base.x+R.x)/2,y:(base.y+R.y)/2};
        var bough=cat([base,{x:mid.x+Math.cos(a+1.2)*30,y:mid.y+Math.sin(a+1.2)*30},{x:R.x,y:R.y}],false,6); twist(bough,9,130,q).forEach(function(s){ add(s,1.1); });
        var nodes=[{x:R.x,y:R.y}], left=R.L.slice(), rr=rnd(q*977);
        while(left.length){ var best=null, bd=1e9, bn=null; left.forEach(function(z){ nodes.forEach(function(n){ var d=Math.hypot(n.x-z.x,n.y-z.y); if(d<bd){ bd=d; best=z; bn=n; } }); });
          var br=bez(bn,best,(rr()<0.5?-1:1)*(0.18+rr()*0.12)); add(br,0.8); add(spiral(best,14,1.2,Math.atan2(best.y-bn.y,best.x-bn.x),rr()<0.5?-1:1),0.6); nodes.push(best); nodes.push(br[Math.floor(br.length/2)]); left.splice(left.indexOf(best),1); } });
      twist(cat(G.ring(0.9),true,8),8,150,0).forEach(function(s){ add(s,0.9); });      // the roots knotted round the coast
      return out; },
    sl_serpent:function(G){ var C=G.C, out=[], add=function(p,w){ out.push({pts:p,w:w||1}); }, ring=cat(G.ring(0.88),true,8);
      twist(ring,11,170,0).forEach(function(s){ add(s,1.2); }); add(circ(C,40),1.2);
      var h=ring[Math.floor(ring.length*0.75)], hn=norm(ring,Math.floor(ring.length*0.75));      // the head (north), biting the tail
      add([{x:h.x-hn.x*22,y:h.y-hn.y*22},{x:h.x+18,y:h.y-6},{x:h.x+hn.x*22,y:h.y+hn.y*22}],1); add(circ({x:h.x+4,y:h.y-hn.y*4},5,14),0.7);
      [1,2,3,4].forEach(function(q){ var R=G.reg[q], L=R.L.slice().sort(function(a,b){ return Math.atan2(a.y-C.y,a.x-C.x)-Math.atan2(b.y-C.y,b.x-C.x); });
        var i0=nearest(ring,{x:C.x+Math.cos(R.a-0.35)*900,y:C.y+Math.sin(R.a-0.35)*900}).p, i1=nearest(ring,{x:C.x+Math.cos(R.a+0.35)*900,y:C.y+Math.sin(R.a+0.35)*900}).p;
        var inner={x:C.x+Math.cos(R.a)*40,y:C.y+Math.sin(R.a)*40}, half=Math.ceil(L.length/2), A=L.slice(0,half).sort(function(a,b){ return Math.hypot(b.x-C.x,b.y-C.y)-Math.hypot(a.x-C.x,a.y-C.y); }), B=L.slice(half).sort(function(a,b){ return Math.hypot(a.x-C.x,a.y-C.y)-Math.hypot(b.x-C.x,b.y-C.y); });
        add(cat([i0].concat(A).concat([inner]).concat(B).concat([i1]),false,7),1); });
      return out; },
    sl_beasts:function(G){ var C=G.C, out=[], add=function(p,w){ out.push({pts:p,w:w||1}); }; add(circ(C,36),1.2);
      [1,2,3,4].forEach(function(q){ var R=G.reg[q], L=R.L.slice(), far=L.slice().sort(function(a,b){ return Math.hypot(b.x-C.x,b.y-C.y)-Math.hypot(a.x-C.x,a.y-C.y); })[0], path=[far], cur=far; L.splice(L.indexOf(far),1);
        while(L.length){ var nx=L.slice().sort(function(a,b){ return (Math.hypot(a.x-cur.x,a.y-cur.y)+Math.hypot(a.x-C.x,a.y-C.y)*0.45)-(Math.hypot(b.x-cur.x,b.y-cur.y)+Math.hypot(b.x-C.x,b.y-C.y)*0.45); })[0]; path.push(nx); L.splice(L.indexOf(nx),1); cur=nx; }
        var ta=R.a+1.3, tail=spiral(C,58,0.6,ta,1); path.push(tail[0]); var body=cat(path,false,6).concat(tail);
        twist(body,9,120,q).forEach(function(s){ add(s,1.05); });
        var hd=far, a=Math.atan2(hd.y-C.y,hd.x-C.x), f=function(d,s){ d*=1.7; return {x:hd.x+Math.cos(a+s)*d,y:hd.y+Math.sin(a+s)*d}; };
        if(q===1){ [-1,1].forEach(function(s){ add([f(6,0.0),f(30,s*0.5),f(46,s*0.35)],0.8); add([f(30,s*0.5),f(40,s*0.85)],0.6); }); }                       // the stag's antlers
        else if(q===2){ add([f(0,0),f(26,0),f(36,0.25)],0.8); add([f(26,0),f(36,-0.25)],0.8); add(circ(f(14,0.4),4,12),0.6); }                         // the serpent's forked tongue
        else if(q===3){ [-1,1].forEach(function(s){ add(cat([f(4,0),f(34,s*1.1),f(58,s*0.8),f(70,s*0.55)],false,5),0.9); }); add([f(4,0),f(20,0.15),f(16,-0.15)],0.8); }   // the eagle's wings and beak
        else { [-1,1].forEach(function(s){ add(cat([f(4,s*0.3),f(24,s*0.6),f(36,s*0.3)],false,5),0.8); }); for(var k=1;k<4;k++)add([f(k*12,0.05),f(k*12+6,0.0)],0.6); } }); // the wyrm's horns and spines
      return out; },
    sl_wheel:function(G){ var C=G.C, out=[], add=function(p,w){ out.push({pts:p,w:w||1}); }, r1=cat(G.ring(0.9),true,8), r2=cat(G.ring(0.9,-26),true,8);
      add(r1,1.1); add(r2,1.1); add(circ(C,40),1.2); add(circ(C,52),1);
      var rr=rnd(5);      // runes between the two rings
      for(var k=0;k<r1.length;k+=11){ var p=r1[k], q=r2[Math.min(r2.length-1,k)], m={x:(p.x+q.x)/2,y:(p.y+q.y)/2}, dx=p.x-q.x, dy=p.y-q.y, L=Math.hypot(dx,dy)||1, ux=dx/L*7, uy=dy/L*7, vx=-uy, vy=ux, t=Math.floor(rr()*4);
        add([{x:m.x-ux,y:m.y-uy},{x:m.x+ux,y:m.y+uy}],0.5); if(t===0)add([{x:m.x,y:m.y},{x:m.x+ux*0.8+vx*0.8,y:m.y+uy*0.8+vy*0.8}],0.5); else if(t===1)add([{x:m.x-ux,y:m.y-uy},{x:m.x+vx,y:m.y+vy},{x:m.x+ux,y:m.y+uy}],0.5); else if(t===2)add([{x:m.x+ux,y:m.y+uy},{x:m.x+ux*0.2+vx,y:m.y+uy*0.2+vy},{x:m.x-ux*0.2,y:m.y-uy*0.2}],0.5); else add([{x:m.x-ux*0.6+vx*0.6,y:m.y-uy*0.6+vy*0.6},{x:m.x+ux*0.6-vx*0.6,y:m.y+uy*0.6-vy*0.6}],0.5); }
      for(var s=0;s<8;s++){ var a=s/8*TAU+TAU/16, end=nearest(r2,{x:C.x+Math.cos(a)*900,y:C.y+Math.sin(a)*900}).p, st={x:C.x+Math.cos(a)*52,y:C.y+Math.sin(a)*52}; twist(cat([st,{x:(st.x+end.x)/2+Math.cos(a+1.57)*18,y:(st.y+end.y)/2+Math.sin(a+1.57)*18},end],false,6),7,110,s).forEach(function(x){ add(x,0.95); }); }
      G.Z.forEach(function(z){ var sp=[]; out.forEach(function(o){ if(o.w>=0.95)sp=sp.concat(o.pts); }); var n=nearest(sp,z); if(n.d>24)add(bez(n.p,z,0.25),0.7); });
      return out; }
  };
  // ── build a design: strands → pieces (nearest zone), crossings → over / under ──
  S.build=function(id){ if(S.D[id])return S.D[id]; var G=S.geo(), St=DES[id](G), Zs=G.Z;
    Zs.forEach(function(z,i){ rosette(z,11,i*0.7).forEach(function(p){ St.push({pts:p,w:0.6,own:i}); }); });      // each rune's rosette
    St.forEach(function(s,si){ s.id=si; s.owner=s.pts.map(function(p){ if(s.own!==undefined)return s.own; if(Math.hypot(p.x-G.C.x,p.y-G.C.y)<60)return -1; var b=0, bd=1e9; for(var i=0;i<Zs.length;i++){ var d=(p.x-Zs[i].x)*(p.x-Zs[i].x)+(p.y-Zs[i].y)*(p.y-Zs[i].y); if(d<bd){ bd=d; b=i; } } return b; }); s.gap=s.pts.map(function(){ return 0; }); });
    // crossings (bucketed)
    var B={}, BS=24, seg=[]; St.forEach(function(s){ for(var i=0;i<s.pts.length-1;i++){ var a=s.pts[i], b=s.pts[i+1], k=seg.length; seg.push([s.id,i,a,b]);
      var x0=Math.floor(Math.min(a.x,b.x)/BS), x1=Math.floor(Math.max(a.x,b.x)/BS), y0=Math.floor(Math.min(a.y,b.y)/BS), y1=Math.floor(Math.max(a.y,b.y)/BS); for(var x=x0;x<=x1;x++)for(var y=y0;y<=y1;y++){ var kk=x+','+y; (B[kk]||(B[kk]=[])).push(k); } } });
    var X=[], seen={}; Object.keys(B).forEach(function(k){ var L=B[k]; for(var u=0;u<L.length;u++)for(var v=u+1;v<L.length;v++){ var p=seg[L[u]], q=seg[L[v]]; if(p[0]===q[0]&&Math.abs(p[1]-q[1])<4)continue; var key=L[u]+'_'+L[v]; if(seen[key])continue; seen[key]=1;
      var a=p[2], b=p[3], c=q[2], d=q[3], den=(b.x-a.x)*(d.y-c.y)-(b.y-a.y)*(d.x-c.x); if(Math.abs(den)<1e-6)continue; var t=((c.x-a.x)*(d.y-c.y)-(c.y-a.y)*(d.x-c.x))/den, w=((c.x-a.x)*(b.y-a.y)-(c.y-a.y)*(b.x-a.x))/den; if(t<0||t>1||w<0||w>1)continue;
      X.push({s1:p[0],i1:p[1],s2:q[0],i2:q[1],x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}); } });
    var par={}; X.sort(function(a,b){ return a.s1-b.s1||a.i1-b.i1; }).forEach(function(x){ var o=(par[x.s1]=(par[x.s1]||0)+1)%2; var under=o?x.s2:x.s1, ui=o?x.i2:x.i1, g=St[under].gap; for(var k=-1;k<=1;k++)if(ui+k>=0&&ui+k<g.length)g[ui+k]=1; });      // a gap a little wider than the ribbon
    var D={St:St,X:X.length,G:G}; S.D[id]=D; return D; };
  // the order spirits are freed in
  S.order=function(){ var Z=S.geo().Z, r=rnd(41); if(S.ord&&S.ord.k===S.order_)return S.ord.L; var L=Z.map(function(z){ return {i:z.i,k:S.order_==='scattered'?z.r+r()*2.4:z.r*100+z.i}; }).sort(function(a,b){ return a.k-b.k; }).map(function(o){ return o.i; }); S.ord={k:S.order_,L:L}; return L; };
  S.order_='realm';
  // ── drawing ──
  S.paint=function(c,D,lit,ghost,sc,ox,oy,only,frac){ var G=D.G, Zp=only!==undefined?G.Z[only]:null;
    var pass=function(width,style,dash){ c.strokeStyle=style; c.lineWidth=width; c.setLineDash(dash||[]); c.lineCap='round'; c.lineJoin='round';
      D.St.forEach(function(s){ var on=false; c.beginPath(); for(var i=0;i<s.pts.length;i++){ var o=s.owner[i], ok=only!==undefined?(o===only&&Math.hypot(s.pts[i].x-Zp.x,s.pts[i].y-Zp.y)<=frac):(ghost?ghost[o]:(o===-1||lit[o])); if(ok&&!s.gap[i]){ var x=ox+s.pts[i].x*sc, y=oy+s.pts[i].y*sc; if(on)c.lineTo(x,y); else { c.moveTo(x,y); on=true; } } else on=false; } c.stroke(); }); c.setLineDash([]); };
    if(ghost){ pass(Math.max(1,1.4*sc*1.6),GLOW+'0.45)',[3,4]); return; }
    // a ribbon, as in carved knotwork: a dark edge, two rune-blue edges, a dark core — and a soft glow round it
    var k=sc*1.7; pass(Math.max(3,11*k),GLOW+'0.16)'); pass(Math.max(3,7.5*k),INK+'0.85)'); pass(Math.max(2,5.6*k),COL); pass(Math.max(1,2.4*k),'rgba(6,30,40,.92)'); };
  S.render=function(id,W,H,n){ var key=id+'|'+W+'x'+H+'|'+n+'|'+S.order_+'|'+S.hints; if(S.cache[key])return S.cache[key]; Object.keys(S.cache).length>24&&(S.cache={});
    var D=S.build(id), G=D.G, M=G.M, cv=document.createElement('canvas'); cv.width=W; cv.height=H; var c=cv.getContext('2d'), sc=Math.min(W/M.W,H/M.H), ox=(W-M.W*sc)/2, oy=(H-M.H*sc)/2;
    c.fillStyle='#03080e'; c.fillRect(0,0,W,H); c.drawImage(LabMap.base,ox,oy,M.W*sc,M.H*sc); c.fillStyle='rgba(2,10,18,.42)'; c.fillRect(0,0,W,H);
    var ord=S.order(), lit={}, cnt={1:0,2:0,3:0,4:0}; ord.slice(0,n).forEach(function(i){ lit[i]=1; cnt[G.Z[i].r]++; });
    if(S.hints){ var gh={}, any=false; G.Z.forEach(function(z,i){ if(!lit[i]&&cnt[z.r]>=8){ gh[i]=1; any=true; } }); if(any)S.paint(c,D,null,gh,sc,ox,oy); }
    S.paint(c,D,lit,null,sc,ox,oy);
    G.Z.forEach(function(z,i){ var x=ox+z.x*sc, y=oy+z.y*sc; c.fillStyle=lit[i]?'#e8fdff':'rgba(160,170,180,.55)'; c.beginPath(); c.arc(x,y,Math.max(1.6,2.6*sc*1.6),0,TAU); c.fill(); });
    S.cache[key]=cv; return cv; };
  S.draw=function(cv,c,W,H,t,full,id){ var n=S.N; c.drawImage(S.render(id,W,H,n),0,0);
    var D=S.build(id), G=D.G, M=G.M, sc=Math.min(W/M.W,H/M.H), ox=(W-M.W*sc)/2, oy=(H-M.H*sc)/2, ord=S.order();
    if(n>0){ var last=ord[n-1], age=(performance.now()-(S.litT||0))/1000, f=Math.min(1,age/2.4)*160+4;      // the newest piece traces out from its rune
      if(age<3.2){ c.save(); c.shadowColor=COL; c.shadowBlur=12; S.paint(c,D,null,null,sc,ox,oy,last,f); c.restore(); var z=G.Z[last]; c.strokeStyle='rgba(255,255,255,'+(0.8*(1-age/3.2))+')'; c.lineWidth=2; c.beginPath(); c.arc(ox+z.x*sc,oy+z.y*sc,6+age*14,0,TAU); c.stroke(); } }
    var cnt={1:0,2:0,3:0,4:0}; ord.slice(0,n).forEach(function(i){ cnt[G.Z[i].r]++; });
    c.fillStyle='rgba(3,10,18,.75)'; c.fillRect(8,8,full?330:250,full?66:52); c.fillStyle='#bff6ff'; c.font='600 '+(full?18:14)+'px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(n+' / 40 spirits freed',16,full?32:27);
    c.font=(full?14:11)+'px "Segoe UI",sans-serif'; c.fillStyle='#9fc8d8'; c.fillText('Grass '+cnt[1]+' · Wet '+cnt[2]+' · High '+cnt[3]+' · Ash '+cnt[4],16,full?56:45); };
  LBR.drawers.soullines=S.draw;
  var CARDS=[
    {id:'sl_tree',name:'The World-Tree',desc:'The trunk rises from the village circle; four great boughs reach into the four realms and branch through every zone, each branch ending in a curl at its rune; the roots knot round the coast as a twisted ring.'},
    {id:'sl_serpent',name:'The World-Serpent',desc:'A knotwork serpent rings the coast and bites its tail in the north; four loops dive from the ring into each realm, through its runes, and touch the village circle.'},
    {id:'sl_beasts',name:'The Four Beasts',desc:'Four interlaced creatures, one per realm — a stag (Grasslands), a serpent (Wetlands), an eagle (Highlands), a wyrm (Ashlands): heads at the coast, knotted bodies winding through their runes, tails curling round the village.'},
    {id:'sl_wheel',name:'The Rune Wheel',desc:'A great rune ring round the coast and eight knotted spokes from the village circle; every rune gets a rosette and a line to the nearest spoke.'}];
  S.bind=function(){ var r=document.getElementById('sl-n'), o=document.getElementById('sl-ord'), h=document.getElementById('sl-hint'), p=document.getElementById('sl-play'), v=document.getElementById('sl-v');
    if(!r)return; var set=function(n){ n=Math.max(0,Math.min(40,n)); if(n>S.N)S.litT=performance.now(); S.N=n; r.value=n; v.textContent=n; };
    r.oninput=function(){ set(+r.value); }; o.onchange=function(){ S.order_=o.value; S.ord=null; S.cache={}; }; h.onchange=function(){ S.hints=h.checked; S.cache={}; };
    p.onclick=function(){ if(S.play){ clearInterval(S.play); S.play=null; p.textContent='▶ Play 0 → 40'; return; } set(0); p.textContent='■ Stop'; S.play=setInterval(function(){ if(S.N>=40){ clearInterval(S.play); S.play=null; p.textContent='▶ Play 0 → 40'; return; } set(S.N+1); },1700); }; };
  LAB_TABS.push({ id:'soullines', name:'Soul-lines',
    blurb:'<b>Round 67 — the tattoo over the land (Lab round A).</b> Every freed spirit traces <b>soul-lines</b> in rune-blue round its rune; seen whole they become one Norse tattoo over the island. Here are the four designs you asked to try, drawn on the game\'s real island (the village circle at the heart, the 40 zone runes as dots). Move the slider (or ▶ Play) to free the spirits one by one: the newest piece traces out from its rune, and once a realm is 8/10 freed its missing pieces show as faint dotted ghosts (your card). Lines weave over and under where they cross. ☆ the one(s) to take forward — mixing is fine — and say what to change in the notes. The line\'s close-up look (knot band, rune vein, mote stitch, carved groove) is round B.',
    designs:CARDS.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); S.bind(); },0);
      return '<div class="sl-bar"><label>Spirits freed <input id="sl-n" type="range" min="0" max="40" value="'+S.N+'"> <b id="sl-v">'+S.N+'</b> / 40</label><button class="vbtn" id="sl-play">▶ Play 0 → 40</button>'+
        '<label>Order <select id="sl-ord"><option value="realm"'+(S.order_==='realm'?' selected':'')+'>realm by realm</option><option value="scattered"'+(S.order_==='scattered'?' selected':'')+'>scattered, as in play</option></select></label>'+
        '<label><input type="checkbox" id="sl-hint"'+(S.hints?' checked':'')+'> late hints (8/10 in a realm)</label></div>'+
        LBR.sec('Four tattoos for the land','pick any · ⛶ for full screen')+'<div class="br-grid sl-grid">'+CARDS.map(function(d,i){ return LBR.card('soullines',d,i,640,640,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('soullines'); LBR.TABS.push('soullines');
  var st=document.createElement('style'); st.textContent='.sl-bar{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:8px 0 4px;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:rgba(111,227,245,.05)}.sl-bar input[type=range]{width:260px;vertical-align:middle}.sl-bar select{background:transparent;color:var(--text);border:1px solid var(--line);border-radius:6px;padding:3px 6px}.sl-bar select option{background:#0d1420}.sl-grid{grid-template-columns:repeat(auto-fill,minmax(520px,1fr))}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'soullines',label:'✦ Soul-lines — pick a tattoo for the land',where:'Soul-lines tab · 4 designs over the real island',done:function(){ return CARDS.some(function(d){ return LBR.picked('soullines',d.id); }); },go:function(){ LTODO.goTo('soullines','.sl-bar',0); }});
  return S; })();
