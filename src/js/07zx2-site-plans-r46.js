// ═══════════════════════════════════════════════════════════════════════
// ║ 07zx2-site-plans-r46.js — round 46: Kris's Site review (Lab sreview-*, Oct 11).
// ║ Kris: "1. Reusing the old designs should only be done once for each adventure site type 2. The design elements from the old adventure sites,
// ║ like the book shelves, then entry spaces, fountains, rugs and all the cool interior stuff should be reused wherever possible in the new
// ║ adventure sites [07zy ZSPP.furnish] 3. When i say "this is bad..." for the site, look at all the things i liked from your new designs as well
// ║ as the previous designs you had in the last adventure site rebuild and take elements from all of these to fill in where i didn't select things".
// ║   • old layouts, one per site type: Sunken Courtyard (dungeon), Thorn bailey castle_q1_b (castle; harder stairs, more rooms), Rime Spire (mage;
// ║     first stairs harder to find — his card). No tower and no island crypt keeps an old layout (he called all of those bad).
// ║   • the sites he called bad use their picks from the last Lab again; the ones whose layout repeated another's type borrow from the designs he
// ║     loved — Pillared Hall's bridged platforms, Spiral Chasm's ring hubs, Isle 1's sea caves, Castle Q2-c's abbey wings of rooms, Crimson
// ║     Spire's rooms within rings (layouts below, marked "mix").
// ║   • his notes: Q4-b stairs at the end of the arms; Conductor, Frozen Belfry, Ember Observatory more complex and larger; Drowned Lighthouse
// ║     less simple; Lightning Rod more rooms and stairs hard to find; Monolith bigger, sections joined by hallways (vertical and horizontal).
// ║ ZSP.hideDown: the way on sits in a small vault behind a hidden door (a crack and a draft, 12-scene-dungeon _zspSecrets).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSP==='undefined')return; var T=ZSP.T;
  ZSP.OLD={sunken_courtyard:1,castle_q1_b:1,mage_rime_spire:1};
  ZSP.HARD_OLD={castle_q1_b:{rooms:1,stairs:1},mage_rime_spire:{stairs:1,first:1}};      // used by 07d for the old builder (more rooms, the stairs in the farthest room)
  var D=function(id,n,d,o,gen){ T[id]=Object.assign({n:n,d:d,gen:gen},o||{}); };
  // ── helpers ──
  var hallMaze=function(c,cx,cy,r){ var s=Math.floor(r*1.25), x0=Math.round(cx-s/2), y0=Math.round(cy-s/2); var M=c.maze(x0,y0,s,s,2,1,0.12,1); c.disc(cx,cy,r,2,0); return M; };
  var join=function(c,a,b,wd,wig){ if(wig)c.wiggle(a[0],a[1],b[0],b[1],wd,1,wig,2); else { c.line(a[0],a[1],b[0],b[1],wd+2,2,0); c.line(a[0],a[1],b[0],b[1],wd,1); } };

  // ── Kris's notes on the new designs ──
  D('mage_conductor','Five halls, mazed','Five halls joined by crooked passages (Kris: "this is ok, but it needs to be more complex maze and larger"): every hall is a small maze of its own, two of them so big they hold a second maze inside, the way in and the way out in different halls.',{built:1,s:function(){ return [64,60]; },near:0.9},function(c){ var R=c.R; c.fill(0);
    var P=[[c.W*0.22,c.H*0.22,11,1],[c.W*0.76,c.H*0.2,8,0],[c.W*0.5,c.H*0.52,8,0],[c.W*0.22,c.H*0.78,8,0],[c.W*0.77,c.H*0.77,12,1]];
    // each hall: a maze over its whole round floor, clipped to the circle, a ring walk inside its wall; the two big halls hold a walled inner court
    P.forEach(function(p){ var r=p[2], x0=Math.round(p[0]-r), y0=Math.round(p[1]-r); c.maze(x0,y0,2*r+1,2*r+1,2,1,0.14,1);
      for(var y=y0-1;y<=y0+2*r+1;y++)for(var x=x0-1;x<=x0+2*r+1;x++){ var d=Math.hypot(x+0.5-p[0],y+0.5-p[1]); if(d>r+0.5)c.set(x,y,0,2); else if(d>r-0.5)c.set(x,y,2); else if(d>r-1.6)c.set(x,y,1); }
      if(p[3]){ c.box(Math.round(p[0]-3),Math.round(p[1]-3),7,7,5); c.set(Math.round(p[0]),Math.round(p[1]+3),1); } else c.disc(p[0],p[1],1.6,5); });
    [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4],[0,3]].forEach(function(e){ if(e[0]===0&&e[1]===3&&R.chance(0.5))return; var a=P[e[0]], b=P[e[1]], ang=Math.atan2(b[1]-a[1],b[0]-a[0]), sa=[a[0]+Math.cos(ang)*(a[2]-1.2),a[1]+Math.sin(ang)*(a[2]-1.2)], sb=[b[0]-Math.cos(ang)*(b[2]-1.2),b[1]-Math.sin(ang)*(b[2]-1.2)];
      c.line(sa[0],sa[1],sb[0],sb[1],4,2,0); c.wiggle(sa[0],sa[1],sb[0],sb[1],2,1,2); });
    c.hints.up=[P[0][0],P[0][1]]; c.hints.down=[P[4][0],P[4][1],P[4][2]]; });
  D('mage_frozen_belfry','Bell maze','A grid of bell-rooms, sixteen of them, each with walls of its own inside, joined by a maze of short stairs (Kris: "more complex maze and larger"); the great bell chamber in the middle.',{built:1,s:function(){ return [60,60]; },near:0.9},function(c){ var R=c.R; c.fill(0); var s=11, gap=3, n=4, x0=Math.floor((c.W-(n*(s+gap)-gap))/2), y0=Math.floor((c.H-(n*(s+gap)-gap))/2), C=[];
    for(var j=0;j<n;j++)for(var i=0;i<n;i++){ var x=x0+i*(s+gap), y=y0+j*(s+gap), mid=(i===1||i===2)&&(j===1||j===2); c.box(x,y,s,s,1); if(!mid){ var hz=R.chance(0.5); for(var q=0;q<2;q++){ var at=R.i(3,s-4); if(hz)c.rect(x+1,y+at,s-2-R.i(2,4),1,2); else c.rect(x+at,y+1,1,s-2-R.i(2,4),2); } } else c.disc(x+(i===1?s:-1),y+(j===1?s:-1),3,5); C.push([x,y,i,j]); }
    // a spanning maze of short stairs between neighbouring rooms, plus a few loops
    var seen={}, st=[0]; seen[0]=1; var link=function(a,b){ var A=C[a], B=C[b]; if(A[2]!==B[2]){ var y=Math.max(A[1],B[1])+R.i(2,s-3); c.rect(Math.min(A[0],B[0])+s-1,y,gap+2,2,1); } else { var x=Math.max(A[0],B[0])+R.i(2,s-3); c.rect(x,Math.min(A[1],B[1])+s-1,2,gap+2,1); } };
    while(st.length){ var q2=st[st.length-1], nb=[[1,0],[-1,0],[0,1],[0,-1]].map(function(d){ var i=C[q2][2]+d[0], j=C[q2][3]+d[1]; return i>=0&&j>=0&&i<n&&j<n?j*n+i:-1; }).filter(function(k){ return k>=0&&!seen[k]; }); if(!nb.length){ st.pop(); continue; } var k2=nb[R.i(0,nb.length-1)]; seen[k2]=1; link(q2,k2); st.push(k2); }
    for(var e=0;e<4;e++){ var a=R.i(0,n*n-2), b=a+(R.chance(0.5)?1:n); if(b<n*n&&(C[b][3]===C[a][3]||C[b][2]===C[a][2]))link(a,b); }
    c.hints.up=[C[0][0]+s/2,C[0][1]+s/2]; c.hints.down=[C[n*n-1][0]+s/2,C[n*n-1][1]+s/2,s]; });
  D('mage_ember_observatory','Bridged lattice, wide','Six clusters of diamond crystal rooms float apart over the glow, each cluster a small maze, bridges between them in a maze of crossings (Kris: "more complex and larger").',{built:1,liq:'chasm',s:function(){ return [66,58]; },near:0.9},function(c){ var R=c.R; c.fill(3); var K=[];
    for(var j=0;j<2;j++)for(var i=0;i<3;i++)K.push([c.W*(0.18+i*0.32)+R.i(-2,2),c.H*(0.27+j*0.46)+R.i(-2,2)]);
    K.forEach(function(k){ var n=R.i(5,7); for(var q=0;q<n;q++){ var x=k[0]+R.i(-7,7), y=k[1]+R.i(-6,6); c.diamond(x,y,R.i(3,4),R.chance(0.3)?5:1); } c.diamond(k[0],k[1],2,5); });
    for(var y=0;y<c.H;y++)for(var x=0;x<c.W;x++)if(c.get(x,y)===0)c.set(x,y,3);
    var E=[[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]], keep=E.filter(function(e,i){ return i<5||R.chance(0.5); }); keep.forEach(function(e){ c.line(K[e[0]][0],K[e[0]][1],K[e[1]][0],K[e[1]][1],2,4,3); });
    c.hints.up=K[0]; c.hints.down=[K[5][0],K[5][1],9]; });
  D('mage_drowned_lighthouse','Lighthouse archipelago','Six ringed lamp-halls standing in the sea, each ring with its gate on another side (circle to find it), joined by sea-walls with side branches out to pillar platforms (Kris: "ok, but bit too simple").',{built:1,liq:'water',s:function(){ return [60,56]; },near:0.88},function(c){ var R=c.R; c.fill(3); var P=[];
    for(var j=0;j<2;j++)for(var i=0;i<3;i++)P.push([c.W*(0.17+i*0.33)+R.i(-2,2),c.H*(0.26+j*0.48)+R.i(-2,2)]); if(R.chance(0.5))P=[P[0],P[3],P[4],P[1],P[2],P[5]];
    P.forEach(function(p){ var r=R.i(7,8); c.disc(p[0],p[1],r,2); c.disc(p[0],p[1],r-1,1); for(var k=1;k<=2;k++){ var rr=r-1-k*2; c.ring(p[0],p[1],rr,rr,1,2); var a=R.f()*Math.PI*2; c.disc(p[0]+Math.cos(a)*(rr-0.5),p[1]+Math.sin(a)*(rr-0.5),1.2,1,2); } c.disc(p[0],p[1],1.5,5); });
    for(var k2=1;k2<P.length;k2++){ var a2=P[k2-1], b=P[k2]; c.line(a2[0],a2[1],b[0],b[1],4,2,3); c.line(a2[0],a2[1],b[0],b[1],2,1); var mx=(a2[0]+b[0])/2, my=(a2[1]+b[1])/2, side=R.chance(0.5)?1:-1, px=mx+side*R.i(5,8), py=my+(R.chance(0.5)?6:-6); c.line(mx,my,px,py,1,4,3); c.rect(Math.round(px)-2,Math.round(py)-2,5,5,1,3); c.set(Math.round(px),Math.round(py),6); }
    c.hints.up=P[0]; c.hints.down=[P[5][0],P[5][1],6]; });
  D('mage_lightning_rod','Storm field','Stars of three, four and six points, each with a hall-room at every tip and rooms between the rays (Kris: "there need to be more rooms, and the stairs need to be more difficult to find"): the way on is in a vault behind a hidden door.',{built:1,s:function(){ return [56,54]; },hideDown:1,secrets:1},function(c){ var R=c.R; c.fill(0); var S=[[c.W*0.26,c.H*0.26,3,9],[c.W*0.74,c.H*0.3,4,9.5],[c.W*0.5,c.H*0.72,6,11]];
    S.forEach(function(s){ c.star(s[0],s[1],s[2],s[3],2,R.f()*Math.PI,3.2); for(var p=0;p<s[2];p++){ var a=p*Math.PI*2/s[2]+Math.PI/s[2]+R.f()*0.3; var bx=s[0]+Math.cos(a)*s[3]*0.62, by=s[1]+Math.sin(a)*s[3]*0.62; if(c.get(Math.round(bx),Math.round(by))===0){ c.box(Math.round(bx)-2,Math.round(by)-2,5,5,1); c.line(s[0],s[1],bx,by,1,1); } } });
    for(var k=0;k<3;k++){ var a=S[k], b=S[(k+1)%3], P=[[a[0],a[1]]]; for(var z=1;z<4;z++){ var t=z/4; P.push([a[0]+(b[0]-a[0])*t+R.i(-3,3),a[1]+(b[1]-a[1])*t+R.i(-3,3)]); } P.push([b[0],b[1]]); c.path(P,4,2,0); c.path(P,2,1); } });
  D('mage_monolith','Monolith blocks','The monolith grown into six great blocks of halls in two rows (Kris: "it needs to be bigger, with more sections connected by hallways so you need to go vertical as well as horizontal to progress"): long hallways join the blocks in a zigzag — along, down, back along — so the way runs both ways.',{built:1,s:function(){ return [92,64]; },near:0.92},function(c){ var R=c.R; c.fill(0); var bw=24, bh=24, gx=[4,34,64], gy=[4,36], B=[];
    gy.forEach(function(y,j){ gx.forEach(function(x,i){ c.box(x,y,bw,bh,1); var mid=Math.floor(bh/2); c.rect(x+1,y+mid-1,bw-2,1,2); c.rect(x+1,y+mid+1,bw-2,1,2); for(var q=x+3;q<x+bw-3;q+=5){ c.set(q,y+mid-1,1); c.set(q+2,y+mid+1,1); } c.rect(x+R.i(3,8),y+3,1,mid-5,2); c.rect(x+bw-R.i(4,9),y+mid+3,1,mid-5,2); for(var p=x+3;p<x+bw-3;p+=6){ c.set(p,y+2,6); c.set(p,y+bh-3,6); } B.push([x,y,i,j]); }); });
    var hall=function(a,b){ var A=B[a], Bb=B[b]; if(A[3]===Bb[3]){ var y=A[1]+R.i(5,bh-6); c.rect(A[0]+bw-1,y,Bb[0]-A[0]-bw+2,3,1); c.rect(A[0]+bw-1,y+1,Bb[0]-A[0]-bw+2,1,5); } else { var x=A[0]+R.i(5,bw-6); c.rect(x,A[1]+bh-1,3,Bb[1]-A[1]-bh+2,1); c.rect(x+1,A[1]+bh-1,1,Bb[1]-A[1]-bh+2,5); } };
    // zigzag: 0 → 1 → 2 → (down) 5 → 4 → 3, plus one cross hall that is a dead end of a loop
    hall(0,1); hall(1,2); hall(2,5); hall(4,5); hall(3,4); if(R.chance(0.6))hall(1,4);
    c.hints.up=[B[0][0]+bw/2,B[0][1]+bh/2]; c.hints.down=[B[3][0]+bw/2,B[3][1]+bh/2,10]; });
  D('castle_q4_b','Obsidian star-wings','Three to six wings round a great hall that grows; the way in at the end of one wing and the way on at the end of another (Kris: "the stairs need to be at the end of each arm instead of part way through it").',{built:1},function(c,fi){ var R=c.R; c.fill(0); var n=[3,5,6,4][(fi+R.i(0,3))%4], big=R.chance(0.5), gr=Math.min(c.W,c.H)*(big?0.24:0.15), L=Math.min(c.W,c.H)*0.46, tips=[];
    for(var p=0;p<n;p++){ var a=p/n*Math.PI*2+R.f()*0.5, ex=c.cx+Math.cos(a)*L*c.W/c.H, ey=c.cy+Math.sin(a)*L, ww=R.i(7,10); c.line(c.cx,c.cy,ex,ey,ww,2,0); c.line(c.cx,c.cy,ex,ey,ww-2,1);
      for(var t=0.45;t<0.95;t+=0.18){ var px=c.cx+(ex-c.cx)*t, py=c.cy+(ey-c.cy)*t; c.line(px+Math.cos(a+Math.PI/2)*(ww/2-1),py+Math.sin(a+Math.PI/2)*(ww/2-1),px-Math.cos(a+Math.PI/2)*(ww/2-1),py-Math.sin(a+Math.PI/2)*(ww/2-1),1,2,1); c.set(px+Math.cos(a+Math.PI/2)*R.i(-2,2),py+Math.sin(a+Math.PI/2)*R.i(-2,2),1); } c.room(ex,ey,ww/2+1,R.chance(0.5)?5:1); tips.push([ex,ey,ww/2]); }
    c.disc(c.cx,c.cy,gr+1,2); c.disc(c.cx,c.cy,gr,1); c.disc(c.cx,c.cy,gr*0.5,5); for(var q=0;q<n;q++){ var a2=q/n*Math.PI*2+0.3; c.set(c.cx+Math.cos(a2)*gr*0.75,c.cy+Math.sin(a2)*gr*0.75,6); }
    var i0=R.i(0,n-1), i1=(i0+Math.floor(n/2))%n; c.hints.up=[tips[i0][0],tips[i0][1]]; c.hints.down=[tips[i1][0],tips[i1][1],tips[i1][2]+1]; });

  // ── sites he called bad whose layout repeated another's type: borrowing from the ones he loved ("mix") ──
  D('observatory','Orrery hubs','Mix — Spiral Chasm\'s ring hubs as an orrery: a sun hub of rings in the middle and planet hubs riding round it on an orbit walk, each hub a ring round its own dark well; you work out from hub to hub.',{built:1,liq:'chasm',near:0.9},function(c,fi){ var R=c.R; c.fill(3); var r0=Math.min(c.W,c.H)/2-2, n=4+(fi%2), H=[];
    c.ring(c.cx,c.cy,r0,r0,3,1); var hub=function(x,y,r){ c.disc(x,y,r,1); c.disc(x,y,r-2,2); c.disc(x,y,r-3,1); c.disc(x,y,r*0.38,3); for(var g=0;g<3;g++){ var a=g*2.1+R.f(); c.line(x+Math.cos(a)*(r*0.38+0.5),y+Math.sin(a)*(r*0.38+0.5),x+Math.cos(a)*(r-1),y+Math.sin(a)*(r-1),1,1); } };
    hub(c.cx,c.cy,9); for(var k=0;k<n;k++){ var a=k/n*Math.PI*2+R.f()*0.4+fi, x=c.cx+Math.cos(a)*(r0-1.5), y=c.cy+Math.sin(a)*(r0-1.5); hub(x,y,6); H.push([x,y]); }
    var sp=R.i(0,n-1); c.line(c.cx,c.cy,H[sp][0],H[sp][1],2,4,3); c.line(c.cx,c.cy,H[(sp+2)%n][0],H[(sp+2)%n][1],2,4,3);
    c.hints.up=H[(sp+1)%n]; c.hints.center=[c.cx,c.cy]; });
  D('hyrule_keep','Ward keep and wings','Mix — Castle Q2-c\'s abbey wings round the old ward keep: a square keep in the middle with its gatehouse, and four wings of small rooms round it, each wing its own little maze of doors.',{built:1},function(c,fi){ var R=c.R; c.fill(0); var kw=Math.round(c.W*0.34), kh=Math.round(c.H*0.36), kx=Math.round(c.cx-kw/2), ky=Math.round(c.cy-kh/2);
    var wing=function(x,y,w,h){ c.rect(x,y,w,h,2); c.rooms(x+1,y+1,w-2,h-2,3,0.25); c.doors(0.5); };
    wing(2,2,c.W-4,ky-1); wing(2,ky+kh+1,c.W-4,c.H-ky-kh-3); wing(2,ky-1,kx-1,kh+2); wing(kx+kw+1,ky-1,c.W-kx-kw-3,kh+2);
    c.box(kx,ky,kw,kh,1); c.box(kx+3,ky+3,kw-6,kh-6,5); var gs=[[kx+Math.round(kw/2),ky],[kx+Math.round(kw/2),ky+kh-1],[kx,ky+Math.round(kh/2)],[kx+kw-1,ky+Math.round(kh/2)]], g0=fi%4; c.rect(gs[g0][0]-1,gs[g0][1]-1,3,3,1); var g1=(g0+2)%4, gi=gs[g1]; c.rect(gi[0]-1,gi[1]-1,3,3,1);
    c.set(kx+Math.round(kw/2),ky+3,1); c.set(kx+Math.round(kw/2),ky+kh-4,1); c.hints.center=[c.cx,c.cy]; });
  D('sky_cloister','Cloister islands','Mix — Pillared Hall\'s platforms in a cloister: a square cloister walk round the edge, and in its open court a dozen pillared platforms floating over the sky, bridged one to the next.',{built:1,liq:'chasm',near:0.88},function(c){ var R=c.R; c.fill(3); c.ring(c.cx,c.cy,c.W/2-1.5,c.H/2-1.5,0.1,2);
    c.rect(1,1,c.W-2,c.H-2,2); c.rect(2,2,c.W-4,4,1); c.rect(2,c.H-6,c.W-4,4,1); c.rect(2,2,4,c.H-4,1); c.rect(c.W-6,2,4,c.H-4,1); for(var x=3;x<c.W-3;x+=4){ c.set(x,5,6); c.set(x,c.H-6,6); } c.rect(6,6,c.W-12,c.H-12,3);
    var cs=8, gw=Math.floor((c.W-14)/cs), gh=Math.floor((c.H-14)/cs), P=[]; for(var j=0;j<gh;j++)for(var i=0;i<gw;i++){ var px=8+i*cs+R.i(0,1), py=8+j*cs+R.i(0,1), s=R.i(4,5); c.rect(px,py,s,s,R.chance(0.3)?5:1); if(s===5)c.set(px+2,py+2,6); P.push([px+s/2,py+s/2,i,j]); }
    var seen={0:1}, st=[0]; while(st.length){ var q=st[st.length-1], nb=[[1,0],[-1,0],[0,1],[0,-1]].map(function(d){ var i=P[q][2]+d[0], j=P[q][3]+d[1]; return i>=0&&j>=0&&i<gw&&j<gh?j*gw+i:-1; }).filter(function(k){ return k>=0&&!seen[k]; }); if(!nb.length){ st.pop(); continue; } var k2=nb[R.i(0,nb.length-1)]; seen[k2]=1; c.line(P[q][0],P[q][1],P[k2][0],P[k2][1],1,4,3); st.push(k2); }
    [[0,0],[gw-1,gh-1]].forEach(function(e){ var p=P[e[1]*gw+e[0]]; var ex=e[0]===0?4:c.W-5, ey=p[1]; c.line(p[0],p[1],ex,ey,1,4,3); }); });
  D('mage_mire_tower','Mire caves','Mix — Isle 1\'s sea caves inside the tower: a round wall, inside it a flooded cave of channels with plank docks reaching across and a dry ring of chambers round the edge.',{built:1,liq:'swamp'},function(c){ var R=c.R; c.fill(0); var r=Math.min(c.W,c.H)/2-1.5; c.disc(c.cx,c.cy,r,2); c.cave(3,3,c.W-6,c.H-6,0.42,4); for(var y=0;y<c.H;y++)for(var x=0;x<c.W;x++){ var d=Math.hypot(x+0.5-c.cx,y+0.5-c.cy); if(d>r-0.5)c.set(x,y,d>r+0.5?0:2); }
    c.ring(c.cx,c.cy,r-1,r-1,2.2,1); for(var k=0;k<3;k++){ var y0=R.i(8,c.H-9); for(var x2=2;x2<c.W-2;x2++){ var yy=Math.round(y0+Math.sin(x2*0.2+k*2)*3); for(var t=0;t<2;t++)if(c.get(x2,yy+t)===1&&Math.hypot(x2-c.cx,yy+t-c.cy)<r-3)c.set(x2,yy+t,3); } }
    for(var p=0;p<8;p++){ var px=R.i(5,c.W-6), py=R.i(5,c.H-6); if(c.get(px,py)!==3)continue; var d2=R.chance(0.5)?1:-1; for(var s=0;s<5;s++){ if(c.get(px,py+s*d2)===3)c.set(px,py+s*d2,4); } } c.disc(c.cx,c.cy,2.5,5); });
  D('dawn_sanctum','Sunburst halls','Mix — Crimson Spire\'s rooms within the rays: eight rays from a sun-altar, the long ones lined with chapels and cells on both sides, the short ones ending in a domed shrine.',{built:1},function(c){ var R=c.R; c.fill(0); var r=Math.min(c.W,c.H)/2-2;
    for(var p=0;p<8;p++){ var a=p*Math.PI/4+R.f()*0.1, long=p%2===0, L=long?r:r*0.62, ex=c.cx+Math.cos(a)*L, ey=c.cy+Math.sin(a)*L, ww=long?7:4; c.line(c.cx,c.cy,ex,ey,ww,2,0); c.line(c.cx,c.cy,ex,ey,long?3:2,1);
      if(long)for(var t=0.35;t<0.95;t+=0.2){ var px=c.cx+Math.cos(a)*L*t, py=c.cy+Math.sin(a)*L*t, nx=Math.cos(a+Math.PI/2), ny=Math.sin(a+Math.PI/2); [1,-1].forEach(function(sd){ var rx=px+nx*sd*3.2, ry=py+ny*sd*3.2; c.disc(rx,ry,1.6,1); c.line(px,py,rx,ry,1,1); }); }
      c.room(ex,ey,long?3.5:2.8,long?1:5); }
    c.room(c.cx,c.cy,6,1); c.disc(c.cx,c.cy,2.4,5); });
  D('mage_rootspire','Root labyrinth ring','Mix — Hollow Spire\'s ring round a heart with Root Hollow\'s labyrinth: a ring walk round the seed-chamber, the space between them a maze of roots, side burrows ending in seed-pods.',{built:1},function(c){ var R=c.R; c.fill(0); var r=Math.min(c.W,c.H)/2-1.5; c.disc(c.cx,c.cy,r,2);
    var s=Math.floor(r*1.4), M=c.maze(Math.round(c.cx-s/2),Math.round(c.cy-s/2),s,s,2,1,0.15,1); for(var y=0;y<c.H;y++)for(var x=0;x<c.W;x++){ var d=Math.hypot(x+0.5-c.cx,y+0.5-c.cy); if(d>r-0.5)c.set(x,y,d>r+0.5?0:2); }
    c.ring(c.cx,c.cy,r-1,r-1,2,1); c.room(c.cx,c.cy,4.5,5); for(var k=0;k<4;k++){ var a=k*Math.PI/2+R.f()*0.6; c.line(c.cx+Math.cos(a)*4,c.cy+Math.sin(a)*4,c.cx+Math.cos(a)*6,c.cy+Math.sin(a)*6,1,1); } });
  D('castle_q2_b','Lotus pond court','Mix — Pillared Hall\'s platforms as lotus pads: halls in a ring round a great pond, and in the pond a scatter of round pads joined by stepping bridges to a pavilion at its heart.',{built:1,liq:'water'},function(c){ var R=c.R; c.fill(0); c.box(1,1,c.W-2,c.H-2,2); c.rooms(2,2,c.W-4,c.H-4,4,0.2); c.doors(0.5);
    var rx=c.W*0.3, ry=c.H*0.3; c.ell(c.cx,c.cy,rx+1,ry+1,2); c.ell(c.cx,c.cy,rx,ry,3); var P=[[c.cx,c.cy]]; c.disc(c.cx,c.cy,3.5,5);
    for(var k=0;k<9;k++){ var a=R.f()*Math.PI*2, d=0.35+R.f()*0.5, x=c.cx+Math.cos(a)*rx*d, y=c.cy+Math.sin(a)*ry*d; c.disc(x,y,R.i(2,3),1); P.push([x,y]); }
    for(var k2=1;k2<P.length;k2++){ var best=0, bd=1e9; for(var j=0;j<k2;j++){ var dd=Math.hypot(P[j][0]-P[k2][0],P[j][1]-P[k2][1]); if(dd<bd){ bd=dd; best=j; } } c.line(P[best][0],P[best][1],P[k2][0],P[k2][1],1,4,3); }
    [0,Math.PI].forEach(function(a){ c.line(c.cx+Math.cos(a)*(rx-2),c.cy,c.cx+Math.cos(a)*(rx+2),c.cy,2,1); c.line(c.cx+Math.cos(a)*(rx-1),c.cy,c.cx,c.cy,1,4,3); }); });
  D('bone_pit','Bone field and chasm','Mix — Isle 1\'s channels in the open bone field: a wide pit floor (still open, as he liked the old ones) cut by two winding chasms, rib-arch bridges over them, bone heaps to weave between.',{liq:'chasm'},function(c){ var R=c.R; c.fill(2); c.cave(1,1,c.W-2,c.H-2,0.3,3);
    for(var k=0;k<2;k++){ var y0=R.i(10,c.H-11); for(var x=1;x<c.W-1;x++){ var yy=Math.round(y0+Math.sin(x*0.12+k*3)*4); for(var t=0;t<2;t++)if(c.get(x,yy+t)===1)c.set(x,yy+t,3); } for(var b=0;b<4;b++){ var bx=R.i(4,c.W-5); for(var yb=y0-6;yb<y0+7;yb++)if(c.get(bx,yb)===3){ c.set(bx,yb,4); c.set(bx+1,yb,4); } } }
    c.scatter(6,140,1,true); for(var q=0;q<6;q++)c.disc(R.i(6,c.W-7),R.i(6,c.H-7),R.i(1,2),3,1); });
  D('boulder_field','Boulder rings','Mix — Spiral Chasm\'s ring hubs in the open boulder field: one huge cave floor strewn with boulders, and three great rings of standing stones round dark sinkholes to work your way round.',{liq:'chasm'},function(c){ var R=c.R; c.fill(2); c.cave(1,1,c.W-2,c.H-2,0.28,3); c.scatter(6,170,1,true);
    for(var k=0;k<3;k++){ var x=c.W*(0.22+k*0.28)+R.i(-3,3), y=c.H*(k%2?0.68:0.32)+R.i(-3,3), r=R.i(7,9); c.disc(x,y,r,1); c.ring(x,y,r-1,r-1,1,6); for(var g=0;g<3;g++){ var a=g*2.1+R.f(); c.disc(x+Math.cos(a)*(r-1),y+Math.sin(a)*(r-1),1.2,1); } c.disc(x,y,r*0.4,3); } });

  // ── the way on behind a hidden door ──
  ZSP.hideDown=function(F,R){ if(!F.down)return; var W=F.w, H=F.h, g=F.g, Dd=ZSP.bfs(F,F.up), mx=0; for(var k=0;k<W*H;k++)if(Dd[k]>mx)mx=Dd[k];
    for(var t=0;t<2500;t++){ var rw=3, rh=3, x0=R.i(3,W-rw-4), y0=R.i(3,H-rh-4), ok=true; for(var y=y0-1;y<=y0+rh&&ok;y++)for(var x=x0-1;x<=x0+rw;x++)if(g[y*W+x]!==2&&g[y*W+x]!==0){ ok=false; break; } if(!ok)continue;
      var dx=x0+1, dy=y0+rh+1, side=1; if(!(ZSP.w(g[dy*W+dx])&&Dd[dy*W+dx]>=mx*0.6)){ dy=y0-2; side=-1; if(!(dy>0&&ZSP.w(g[dy*W+dx])&&Dd[dy*W+dx]>=mx*0.6))continue; }
      for(var yy=y0;yy<y0+rh;yy++)for(var xx=x0;xx<x0+rw;xx++)g[yy*W+xx]=1; for(var y2=y0-1;y2<=y0+rh;y2++)for(var x2=x0-1;x2<=x0+rw;x2++)if(g[y2*W+x2]===0)g[y2*W+x2]=2;
      var door=side>0?[dx,y0+rh]:[dx,y0-1]; g[door[1]*W+door[0]]=7; F.down=[x0+1,y0+1]; F.secrets=(F.secrets||[]).concat([[door[0],door[1],'room',[x0+1,y0+1]]]); F.hiddenDown=1; return true; }
    return false; };
  var _design=ZSP.design; ZSP.design=function(id,nfl){ var key=id+'|'+nfl, had=ZSP._d&&ZSP._d[key], D=_design.call(ZSP,id,nfl); if(!D||had)return D; var T0=ZSP.T[id]; if(T0&&T0.hideDown){ var R=rngOf(ZSD.seed(id)*17+3); D.floors.forEach(function(F){ if(F.down)ZSP.hideDown(F,R); }); } return D; };
})();
