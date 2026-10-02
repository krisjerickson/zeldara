// ═══════════════════════════════════════════════════════════════════════
// ║ ZELDARA BRAND, round 11 — the second pass Kris asked for:
// ║  • Logos: his 8 picks redone at three levels of richness (A elaborate,
// ║    B ornate with knotwork, C fractal) + 8 new ones — all light glowing teal.
// ║  • Wordmarks: 10 gold ones built on his two picks, with war axes.
// ║  • Home pages: 6 that combine his three picks (top aurora, glowing side
// ║    rune columns, teal rune frame) with knotwork borders on the buttons.
// ║ New drawing blocks (our own, in the spirit of Norse / Celtic art): braided
// ║ knot bands, meander (key) borders, rune bands, fractal trees, ribbon-dragon
// ║ heads, war axes. Round-1 designs stay (gen 1) for reference.
// ═══════════════════════════════════════════════════════════════════════
ZBrand.TEAL='#63f2dc'; ZBrand.GOLD='#f2c14e';
ZBrand.SYMBOLS.forEach(function(S){ S.gen=1; }); ZBrand.WORDS.forEach(function(S){ S.gen=1; }); ZBrand.HOMES.forEach(function(S){ S.gen=1; });
(function(){ var P0=ZBrand.P, PI=Math.PI;
  ZBrand.ring=function(r,a0){ return function(u){ var a=(a0===undefined?-PI/2:a0)+u*PI*2; return [Math.cos(a)*r,Math.sin(a)*r,Math.cos(a),Math.sin(a)]; }; };
  ZBrand.arc=function(cx,cy,r,a0,a1){ return function(u){ var a=a0+(a1-a0)*u; return [cx+Math.cos(a)*r,cy+Math.sin(a)*r,Math.cos(a),Math.sin(a)]; }; };
  ZBrand.seg=function(x0,y0,x1,y1){ var l=Math.hypot(x1-x0,y1-y0)||1, nx=-(y1-y0)/l, ny=(x1-x0)/l; return function(u){ return [x0+(x1-x0)*u,y0+(y1-y0)*u,nx,ny]; }; };
  ZBrand.P=function(c,L,k){ var P=P0(c,L,k);
    // two-strand braid along a path f(u) → [x,y,nx,ny]; m crossings; strands pass over / under in turn
    P.braid=function(f,m,amp){ var n=8, pt=function(u,s){ var q=f(u), o=amp*Math.sin(PI*m*u)*s; return [q[0]+q[2]*o,q[1]+q[3]*o]; }, strand=function(s,u0,u1){ c.beginPath(); for(var i=0;i<=n;i++){ var p=pt(u0+(u1-u0)*i/n,s); if(i)c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); } };
      for(var j=0;j<=m;j++){ var u0=Math.max(0,(j-0.5)/m), u1=Math.min(1,(j+0.5)/m), ov=j%2?1:-1; if(u1<=u0)continue; strand(-ov,u0,u1); c.stroke();
        var lw=c.lineWidth, d=(u1-u0)*0.2; c.save(); c.globalCompositeOperation='destination-out'; c.lineWidth=lw*2.4; strand(ov,u0+d,u1-d); c.stroke(); c.restore(); strand(ov,u0,u1); c.stroke(); } return P; };
    P.rail=function(f,off,n){ n=n||48; c.beginPath(); for(var i=0;i<=n;i++){ var q=f(i/n), x=q[0]+q[2]*off, y=q[1]+q[3]*off; if(i)c.lineTo(x,y); else c.moveTo(x,y); } c.stroke(); return P; };
    // angular key / meander border along a path
    P.meander=function(f,n,h){ var U=[[0,-1],[0,1],[0.72,1],[0.72,-0.25],[0.36,-0.25],[0.36,0.4]]; c.beginPath(); for(var i=0;i<n;i++){ U.forEach(function(v,j){ var q=f((i+v[0])/n), x=q[0]+q[2]*v[1]*h, y=q[1]+q[3]*v[1]*h; if(j)c.lineTo(x,y); else c.moveTo(x,y); }); } c.stroke(); return P.rail(f,-h,n*3).rail(f,h*1.0001,n*3); };
    P.band=function(f,n,h,seed){ for(var i=0;i<n;i++){ var q=f((i+0.5)/n); P.rune(q[0],q[1],h,i*3+(seed||0),Math.atan2(q[3],q[2])+PI/2); } return P; };
    // fractal tree: every branch forks into smaller copies of itself; tips curl
    P.ftree=function(depth,roots){ var br=function(x,y,a,len,d){ var x1=x+Math.cos(a)*len, y1=y+Math.sin(a)*len, bend=(d%2?1:-1)*0.18; P.w(0.28+0.2*d); c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo((x+x1)/2+Math.cos(a+PI/2)*len*bend,(y+y1)/2+Math.sin(a+PI/2)*len*bend,x1,y1); c.stroke();
          if(d>0){ br(x1,y1,a-0.46,len*0.74,d-1); br(x1,y1,a+0.46,len*0.74,d-1); } else { c.beginPath(); c.arc(x1+Math.cos(a+1.2)*len*0.3,y1+Math.sin(a+1.2)*len*0.3,len*0.3,a-2,a+1.6); c.stroke(); } };
      P.w(1.7).ln([0,0.42,0,-0.02]); br(0,0,-PI/2,0.27,depth-1); br(0,0.04,-PI/2-0.85,0.3,depth-2); br(0,0.04,-PI/2+0.85,0.3,depth-2);
      var rd=Math.max(1,(roots===undefined?depth-3:roots)); [-1,1].forEach(function(s){ br(0,0.4,PI/2+s*0.95,0.26,rd); br(0,0.42,PI/2+s*0.35,0.2,rd-1); }); P.w(1); return P; };
    // ribbon-dragon head in profile, facing +x
    P.dragon=function(x,y,s,rot,flip){ P.w(1); var b=c.lineWidth/s, w=function(m){ c.lineWidth=b*m; }; c.save(); c.translate(x,y); c.rotate(rot||0); c.scale(s*(flip?-1:1),s);
      w(0.8); P.qd([-1,-0.3,-0.5,-0.55,-0.1,-0.5,0.5,-0.45,1.05,-0.16,1.2,-0.04,1.0,0.04]); P.ln([1.0,0.04,0.1,0.06,-0.15,0.14]); P.qd([-0.15,0.14,0.5,0.22,0.95,0.3,0.9,0.5,0.2,0.52,-0.5,0.5,-1,0.3]);
      w(0.4); for(var t=0;t<3;t++){ P.ln([0.3+t*0.22,0.06,0.38+t*0.22,0.18,0.46+t*0.22,0.06]); } c.beginPath(); c.arc(0.05,-0.22,0.1,0,PI*2); c.fill(); w(0.6); P.qd([-0.2,-0.5,-0.7,-0.7,-1.25,-1.05]); P.qd([-0.45,-0.52,-0.9,-0.5,-1.3,-0.72]); P.qd([0.9,0.3,1.3,0.32,1.38,0.12,1.3,0.02,1.22,0.1]); c.restore(); P.w(1); return P; };
    // a bearded war axe: haft vertical, blade to the right, centred at x,y, total length len
    P.axe=function(x,y,len,rot,flip){ P.w(1); var b=c.lineWidth/len, w=function(m){ c.lineWidth=b*m; }; c.save(); c.translate(x,y); c.rotate(rot||0); c.scale(len*(flip?-1:1),len);
      w(0.9); P.ln([-0.022,0.5,-0.022,-0.5]).ln([0.022,0.5,0.022,-0.5]); w(0.5); for(var i=0;i<6;i++)P.ln([-0.03,0.12+i*0.06,0.03,0.15+i*0.06]); P.ci(0,0.535,0.035); P.ln([-0.03,-0.52,0,-0.62,0.03,-0.52],true);
      w(1); P.qd([0.022,-0.43,0.2,-0.48,0.4,-0.6,0.5,-0.3,0.36,0.0,0.22,-0.16,0.022,-0.2],true); w(0.45); P.qd([0.08,-0.38,0.22,-0.42,0.34,-0.48,0.41,-0.3,0.33,-0.12,0.2,-0.22,0.08,-0.25],true);
      c.save(); c.translate(0.24,-0.32); c.scale(0.075,0.075); c.lineWidth=b*0.4/0.075; P.rot(3,function(){ c.beginPath(); c.moveTo(0,0.12); c.quadraticCurveTo(-0.6,-0.32,0,-0.94); c.quadraticCurveTo(0.6,-0.32,0,0.12); c.stroke(); }); c.restore();
      w(0.8); P.ln([-0.022,-0.42,-0.15,-0.33,-0.022,-0.25]); c.restore(); P.w(1); return P; };
    P.triq=function(x,y,s,rot){ c.save(); c.translate(x,y); c.rotate(rot||0); c.scale(s,s); c.lineWidth=c.lineWidth/s; P.rot(3,function(){ c.beginPath(); c.moveTo(0,0.12); c.quadraticCurveTo(-0.6,-0.32,0,-0.94); c.quadraticCurveTo(0.6,-0.32,0,0.12); c.stroke(); }); c.restore(); return P; };
    return P; };
  var raw0=ZBrand._raw;
  ZBrand._raw=function(c,S,L,style){ if(S.gen!==2)return raw0(c,S,L,style); var passes=ZBrand.STYLES[style||S.style]||ZBrand.STYLES.bevel, M=c.getTransform();
    passes.forEach(function(p){ var tmp=ZBrand.mk(c.canvas.width,c.canvas.height), q=tmp.getContext('2d'), col=p[0]>=0?ZBrand.mix(S.col,'#ffffff',p[0]):ZBrand.mix(S.col,'#000000',-p[0]); q.setTransform(M); q.lineJoin='round'; q.lineCap='round'; q.translate(p[2],p[3]); q.strokeStyle=col; q.fillStyle=col; var P=ZBrand.P(q,L,p[1]); P.w(1); S.draw(P,L);
      c.save(); c.setTransform(1,0,0,1,0,0); c.drawImage(tmp,0,0); c.restore(); }); };
  var T=ZBrand.TEAL, base=function(id){ return ZBrand.SYMBOLS.find(function(s){ return s.id===id&&s.gen===1; }); };
  var S2=function(id,name,from,lvl,style,desc,big,small){ var B=from&&base(from); ZBrand.SYMBOLS.push({id:id,name:name,col:T,style:style,desc:desc,gen:2,from:from,lvl:lvl,draw:function(P,L){ if(L>=3)big(P); else if(small)small(P,L); else B.draw(P,L); }}); };
  // frames
  var F={ runes:function(P,r,h,n,seed){ P.w(0.45).ci(0,0,r-h/2-0.025).ci(0,0,r+h/2+0.025); P.w(0.6).band(ZBrand.ring(r),n,h*0.74,seed); P.w(1); },
    braid:function(P,r,m,amp){ P.w(0.4).ci(0,0,r-amp-0.05).ci(0,0,r+amp+0.05); P.w(0.8).braid(ZBrand.ring(r),m,amp); P.w(1); },
    key:function(P,r,n,h){ P.w(0.5).meander(ZBrand.ring(r),n,h); P.w(1); },
    rays:function(P,r,n){ P.w(0.4).ticks(r,r+0.08,n); P.ticks(r,r+0.17,n/2); P.w(1); },
    dots:function(P,r,n,s){ for(var i=0;i<n;i++){ var a=i/n*PI*2; P.fc(Math.cos(a)*r,Math.sin(a)*r,s||0.022); } } };
  var star8=function(P,r,ri,rot){ var a=[]; for(var i=0;i<8;i++){ var an=i/8*PI*2-PI/2+(rot||0), rr=i%2?ri:r; a.push(Math.cos(an)*rr,Math.sin(an)*rr); } P.ln(a,true); };
  var inC=function(P,x,y,s,f){ P.c.save(); P.c.translate(x,y); P.c.scale(s,s); f(); P.c.restore(); };

  // ── 1 · WORLD TREE ──
  S2('tree_a','World Tree · Elaborate','world_tree','A','neon','A branching tree whose every bough forks again, in a ring of runes.',function(P){ inC(P,0,0.06,1.02,function(){ P.ftree(6); }); P.w(1.1).ci(0,0,0.98); F.runes(P,1.17,0.2,20,1); P.w(0.45).ticks(1.31,1.37,40); F.dots(P,1.45,20,0.02); });
  S2('tree_b','World Tree · Knotwork','world_tree','B','bevel','The tree inside a braided knot ring, light radiating outward.',function(P){ inC(P,0,0.06,1.02,function(){ P.ftree(6); }); P.w(1).ci(0,0,0.98); F.braid(P,1.2,28,0.085); F.rays(P,1.37,48); });
  S2('tree_c','World Tree · Fractal','world_tree','C','neon','As above, so below: a deep fractal crown mirrored by fractal roots, inside key and rune borders.',function(P){ inC(P,0,-0.02,0.98,function(){ P.ftree(7,4); }); P.w(0.8).ci(0,0,0.96); F.key(P,1.08,30,0.06); F.runes(P,1.29,0.18,24,2); F.dots(P,1.46,24); });
  // ── 2 · COMPASS ──
  var compassCore=function(P){ P.w(1.1); star8(P,0.98,0.24); P.w(0.8); star8(P,0.62,0.19,PI/4); P.w(0.6); star8(P,0.36,0.11); P.ln([0,-0.98,0,0.98]).ln([-0.98,0,0.98,0]); P.w(0.8).ci(0,0,0.15); P.w(0.5).ci(0,0,0.5); P.rot(4,function(){ P.fp([0,-0.86,0.04,-0.78,0,-0.7,-0.04,-0.78]); }); };
  S2('compass_a','Realms Compass · Elaborate','compass','A','bevel','Three stars layered into one compass rose, the four realms marked in a rune ring.',function(P){ compassCore(P); F.runes(P,1.18,0.2,24,3); P.w(0.5).ticks(1.31,1.38,48); });
  S2('compass_b','Realms Compass · Knotwork','compass','B','gilded','The compass rose held in a braided ring with a small star on every diagonal.',function(P){ compassCore(P); F.braid(P,1.2,24,0.085); P.rot(4,function(){ P.star(0,-1.44,0.07,4,0.35); },PI/4); F.rays(P,1.36,32); });
  S2('compass_c','Realms Compass · Fractal','compass','C','neon','Every point of the star carries a smaller star, which carries a smaller one again.',function(P){ var fs=function(r,d){ P.w(0.35+0.3*d); star8(P,r,r*0.22); if(d>0)P.rot(4,function(){ inC(P,0,-r*1.0,1,function(){ fs(r*0.38,d-1); }); }); if(d>1)P.rot(4,function(){ inC(P,0,-r*0.5,1,function(){ fs(r*0.2,d-2); }); },PI/4); }; inC(P,0,0,0.62,function(){ fs(1,3); }); P.w(0.6).ci(0,0,1.02); F.key(P,1.14,32,0.06); F.dots(P,1.32,32); });
  // ── 3 · FOUR SPIRITS ──
  var drop=function(P,s){ P.qd([0,-0.96*s,0.36*s,-0.56*s,0,-0.22*s,-0.36*s,-0.56*s,0,-0.96*s]); };
  var clover=function(P){ P.w(1.2).rot(4,function(i){ drop(P,1); P.w(0.5); inC(P,0,-0.59,0.62,function(){ P.c.translate(0,0.59); drop(P,1); }); P.w(0.6); if(i===0)P.ln([0,-0.42,0,-0.72]).ln([-0.07,-0.56,0,-0.63,0.07,-0.56]); else if(i===1)P.qd([-0.1,-0.56,-0.05,-0.63,0,-0.56,0.05,-0.49,0.1,-0.56]); else if(i===2)P.ln([0,-0.68,0.08,-0.5,-0.08,-0.5],true); else P.qd([0,-0.72,0.1,-0.56,0,-0.46,-0.1,-0.56,0,-0.72]); P.w(1.2); }); P.w(1).ci(0,0,0.6); P.ln([0,-0.17,0.17,0,0,0.17,-0.17,0],true); P.fc(0,0,0.045); };
  S2('spirits_a','Four Spirits · Elaborate','four_spirits','A','bevel','Leaf, wave, stone and flame around one heart, a small knot between each pair.',function(P){ clover(P); P.w(0.6).rot(4,function(){ P.triq(0,-0.82,0.13); },PI/4); F.runes(P,1.18,0.2,20,5); });
  S2('spirits_b','Four Spirits · Knotwork','four_spirits','B','neon','The four spirits bound by a braided ring.',function(P){ clover(P); P.w(0.6).rot(4,function(){ P.triq(0,-0.82,0.13); },PI/4); F.braid(P,1.2,28,0.085); F.dots(P,1.4,28); });
  S2('spirits_c','Four Spirits · Fractal','four_spirits','C','neon','Inside each spirit, four smaller spirits — and inside those, four more.',function(P){ var fc=function(d){ P.w(0.4+0.4*d).rot(4,function(){ drop(P,1); }); if(d>0)P.rot(4,function(){ inC(P,0,-0.58,0.3,function(){ fc(d-1); }); }); else P.fc(0,0,0.12); }; fc(3); P.w(0.8).ci(0,0,0.6).ci(0,0,1.04); F.key(P,1.16,32,0.06); F.rays(P,1.3,32); });
  // ── 4 · REALM PEAKS ──
  var peaks=function(P){ P.w(1).ln([-0.62,0.3,-0.24,-0.24,-0.02,0.04,0.26,-0.46,0.64,0.3]); P.w(0.5).ln([-0.24,-0.24,-0.2,0.0,-0.3,0.3]).ln([0.26,-0.46,0.3,-0.1,0.18,0.3]).ln([0.2,-0.36,0.26,-0.3,0.32,-0.36]).ln([-0.28,-0.16,-0.24,-0.11,-0.2,-0.16]); P.w(0.8).ci(-0.32,-0.52,0.1); inC(P,-0.32,-0.52,1,function(){ P.w(0.4).ticks(0.14,0.2,10); }); P.w(0.7).ln([-0.7,0.3,0.7,0.3]); for(var i=0;i<3;i++){ var y=0.44+i*0.13, w=0.5-i*0.14; P.qd([-w,y,-w/2,y-0.06,0,y,w/2,y+0.06,w,y]); } };
  S2('peaks_a','Realm Peaks · Elaborate','realm_peak','A','gilded','Mountain, volcano, sun and sea in a double diamond, runes along every side and at every corner.',function(P){ P.w(1.2).ln([0,-0.98,0.98,0,0,0.98,-0.98,0],true); P.w(0.5).ln([0,-0.86,0.86,0,0,0.86,-0.86,0],true); peaks(P); P.w(0.5).ln([0,-1.26,1.26,0,0,1.26,-1.26,0],true); P.w(0.6).rot(4,function(){ for(var k=0;k<5;k++)P.rune(-0.4+k*0.2,-0.795,0.12,k*2+1); },PI/4); P.w(0.9).rot(4,function(i){ P.rune(0,-1.5,0.2,i+1); }); P.rot(4,function(){ P.star(0,-1.12,0.06,4,0.35); },PI/4); });
  S2('peaks_b','Realm Peaks · Knotwork','realm_peak','B','bevel','The land of Zeldara framed by key borders and a braided ring.',function(P){ P.w(1).ln([0,-0.9,0.9,0,0,0.9,-0.9,0],true); inC(P,0,0,0.9,function(){ peaks(P); }); P.w(0.5).rot(4,function(){ P.meander(ZBrand.seg(-0.56,-0.5,0.5,-0.56-0.0),9,0.05); },PI/4); F.braid(P,1.26,28,0.08); F.dots(P,1.44,28); });
  S2('peaks_c','Realm Peaks · Fractal','realm_peak','C','neon','A mountain range where every ridge carries smaller ridges, and those carry smaller ones again.',function(P){ var koch=function(a,x0,y0,x1,y1,d,h){ if(d===0){ a.push(x1,y1); return; } var dx=(x1-x0)/3, dy=(y1-y0)/3, ax=x0+dx, ay=y0+dy, bx=x0+2*dx, by=y0+2*dy, mx=(x0+x1)/2+dy*h*1.5, my=(y0+y1)/2-dx*h*1.5; koch(a,x0,y0,ax,ay,d-1,h); koch(a,ax,ay,mx,my,d-1,h); koch(a,mx,my,bx,by,d-1,h); koch(a,bx,by,x1,y1,d-1,h); };
    [[-0.74,0.24,0.74,0.24,4,0.62,0.5],[-0.6,0.24,0.5,0.24,3,0.34,0.8]].forEach(function(r){ var a=[r[0],r[1]]; koch(a,r[0],r[1],r[2],r[3],r[4],r[5]); P.w(r[6]).ln(a); }); P.w(0.7).ln([-0.76,0.24,0.76,0.24]); P.w(0.7).ci(-0.46,-0.38,0.09); P.c.save(); P.c.translate(-0.46,-0.38); P.w(0.4).ticks(0.13,0.19,10); P.c.restore();
    for(var i=0;i<3;i++){ var y=0.38+i*0.13, w=0.5-i*0.14; P.w(0.6).qd([-w,y,-w/2,y-0.05,0,y,w/2,y+0.05,w,y]); } P.w(1.1).ln([0,-0.98,0.98,0,0,0.98,-0.98,0],true); F.key(P,1.16,32,0.06); P.w(0.8).rot(4,function(i){ P.rune(0,-1.38,0.16,i+1); },PI/4); P.rot(4,function(){ P.fc(0,-1.36,0.03); }); });
  // ── 5 · SHIELD KNOT ──
  var loop=function(P,s){ P.qd([0.16*s,-0.16*s,0.16*s,-0.9*s,0.56*s,-0.9*s,0.9*s,-0.9*s,0.9*s,-0.56*s,0.9*s,-0.16*s,0.16*s,-0.16*s]); };
  var knot=function(P){ P.w(1.2).rot(4,function(){ loop(P,1); P.w(0.5); inC(P,0.56,-0.56,0.6,function(){ P.c.translate(-0.56,0.56); loop(P,1); }); P.w(1.2); }); P.w(1).ci(0,0,0.5); P.w(0.8).ln([0,-0.5,0.5,0,0,0.5,-0.5,0],true); P.w(0.5).ci(0,0,0.36); P.fc(0,0,0.06); P.rot(4,function(){ P.fc(0.56,-0.56,0.05); }); };
  S2('knot_a','Shield Knot · Elaborate','shield_knot','A','bevel','The four-cornered ward with a second line running inside every loop.',function(P){ knot(P); F.runes(P,1.2,0.2,20,6); });
  S2('knot_b','Shield Knot · Knotwork','shield_knot','B','gilded','The ward inside a braided ring, small knots guarding the four sides.',function(P){ inC(P,0,0,0.92,function(){ knot(P); }); F.braid(P,1.2,28,0.085); P.w(0.6).rot(4,function(){ P.triq(0,-1.46,0.1); }); F.rays(P,1.36,32); });
  S2('knot_c','Shield Knot · Fractal','shield_knot','C','neon','Each loop of the knot holds a smaller knot, and so on down.',function(P){ var fk=function(d){ P.w(0.4+0.35*d).rot(4,function(){ loop(P,1); }); P.ci(0,0,0.5*(d?1:0.6)); if(d>0)P.rot(4,function(){ inC(P,0.56,-0.56,0.27,function(){ fk(d-1); }); }); }; fk(3); P.w(0.7).ci(0,0,1.04); F.key(P,1.17,32,0.06); F.dots(P,1.34,32); });
  // ── 6 · TRIQUETRA ──
  var triq2=function(P,s){ P.w(1.3).triq(0,0,s); P.w(0.5).triq(0,-0.06*s,s*0.8); P.w(1); };
  S2('triq_a','Triquetra · Elaborate','triquetra','A','bevel','The three-cornered knot laid over the world tree.',function(P){ inC(P,0,0.1,0.95,function(){ P.ftree(4); }); P.c.save(); P.c.globalCompositeOperation='destination-out'; P.w(3.4).triq(0,0,0.86); P.c.restore(); triq2(P,0.86); P.w(1).ci(0,0,0.45); P.w(1).ci(0,0,0.98); F.runes(P,1.17,0.2,20,7); });
  S2('triq_b','Triquetra · Knotwork','triquetra','B','gilded','The knot in a rune band tied with three smaller knots, like a serpent ring.',function(P){ triq2(P,0.9); P.w(1).ci(0,0,0.5); F.runes(P,1.14,0.2,21,8); P.rot(3,function(){ P.c.save(); P.c.globalCompositeOperation='destination-out'; P.c.beginPath(); P.c.arc(0,1.14,0.2,0,PI*2); P.c.fill(); P.c.restore(); P.w(0.8).ci(0,1.14,0.19); P.w(0.6).triq(0,1.15,0.14); }); F.braid(P,1.4,36,0.05); });
  S2('triq_c','Triquetra · Fractal','triquetra','C','neon','A knot of knots: each leaf holds a smaller triquetra.',function(P){ var ft=function(d){ P.w(0.4+0.35*d).triq(0,0,1); if(d>0){ P.rot(3,function(){ inC(P,0,-0.5,0.36,function(){ ft(d-1); }); }); } }; inC(P,0,0.04,0.98,function(){ ft(3); }); P.w(0.8).ci(0,0,1.02); F.key(P,1.14,30,0.06); F.rays(P,1.28,30); });
  // ── 7 · WAYFINDER ──
  var staves=function(P){ P.rot(8,function(i){ P.w(1.1).ln([0,-0.16,0,-0.9]).w(0.9); var k=i%4; if(k===0){ P.ln([-0.15,-0.74,0,-0.9,0.15,-0.74]); P.ln([-0.1,-0.5,0.1,-0.5]).ln([-0.1,-0.6,0.1,-0.6]); } else if(k===1){ P.ln([-0.13,-0.6,0.13,-0.6]).ln([-0.13,-0.74,0.13,-0.74]).ln([-0.13,-0.88,0.13,-0.88]); P.ln([-0.13,-0.88,-0.13,-0.8]).ln([0.13,-0.88,0.13,-0.8]); } else if(k===2){ P.ci(0,-0.76,0.09); P.ar(0,-0.48,0.1,PI,PI*2); P.ln([-0.12,-0.9,0.12,-0.9]); } else { P.ar(0,-0.9,0.13,0,PI); P.ln([-0.1,-0.62,0,-0.52,0.1,-0.62]); P.ln([-0.12,-0.36,0.12,-0.36]); } }); P.w(1).ci(0,0,0.16); P.w(0.5).ci(0,0,0.28); };
  S2('way_a','Wayfinder · Elaborate','wayfinder','A','neon','Eight staves, each with its own sign, inside a heavy ring of runes.',function(P){ inC(P,0,0,0.98,function(){ staves(P); }); P.w(1.1).ci(0,0,0.98); F.runes(P,1.2,0.24,24,9); P.w(1.1).ci(0,0,1.42); });
  S2('way_b','Wayfinder · Knotwork','wayfinder','B','bevel','The stave compass ringed by runes and a braided border.',function(P){ inC(P,0,0,0.92,function(){ staves(P); }); F.runes(P,1.08,0.18,24,9); F.braid(P,1.32,32,0.075); F.dots(P,1.5,32,0.018); });
  S2('way_c','Wayfinder · Fractal','wayfinder','C','neon','Every stave forks into three, and each of those into three again.',function(P){ var fs=function(len,d){ P.w(0.35+0.3*d).ln([0,0,0,-len]); if(d>0){ [-0.62,0,0.62].forEach(function(a){ P.c.save(); P.c.translate(0,-len); P.c.rotate(a); fs(len*(a?0.42:0.5),d-1); P.c.restore(); }); } else P.fc(0,-len,0.012); }; P.rot(8,function(){ inC(P,0,-0.14,1,function(){ fs(0.4,3); }); }); P.w(1).ci(0,0,0.14); P.w(0.7).ci(0,0,1.02); F.key(P,1.14,32,0.06); F.runes(P,1.34,0.16,28,4); });
  // ── 8 · WINGED BLADE ──
  var blade=function(P,runes){ P.w(0.9).ln([-0.06,-0.5,-0.06,0.7,0,0.98,0.06,0.7,0.06,-0.5]); P.w(0.4).ln([0,-0.46,0,0.6]); P.w(1.2).qd([-0.34,-0.44,-0.2,-0.54,0,-0.5,0.2,-0.54,0.34,-0.44]); P.fc(-0.36,-0.43,0.045); P.fc(0.36,-0.43,0.045); P.w(0.9).ln([-0.035,-0.52,-0.035,-0.8]).ln([0.035,-0.52,0.035,-0.8]); P.w(0.5); for(var i=0;i<4;i++)P.ln([-0.04,-0.58-i*0.06,0.04,-0.61-i*0.06]); P.w(1).ci(0,-0.88,0.08); P.fc(0,-0.88,0.03); if(runes){ P.w(0.5); for(var r=0;r<5;r++)P.rune(0,-0.3+r*0.2,0.11,r*3+2); } };
  var wings=function(P,n,barbs,wk){ wk=wk||1; P.mir(function(){ for(var k=0;k<n;k++){ var x0=0.12,y0=-0.42+k*0.055,cx=0.5+k*0.04,cy=-0.52+k*0.05,x1=1.12-k*0.11,y1=-1.0+k*0.16; P.w((0.95-k*0.05)*wk).qd([x0,y0,cx,cy,x1,y1]); if(barbs)for(var b=1;b<7;b++){ var t=b/7, m=1-t, px=m*m*x0+2*m*t*cx+t*t*x1, py=m*m*y0+2*m*t*cy+t*t*y1; P.w(0.3).ln([px,py,px+0.05,py+0.07+t*0.05]); } } P.w(0.8*wk).qd([0.12,-0.44,0.6,-0.7,1.12,-1.0]); }); };
  var haloWings=function(P,n,barbs){ P.c.save(); P.c.globalCompositeOperation='destination-out'; wings(P,n,false,3.4); P.w(4).ln([0,-0.95,0,0.98]); P.c.restore(); wings(P,n,barbs); };
  S2('blade_a','Winged Blade · Elaborate','winged_blade','A','bevel','A hero\'s sword with a wrapped grip and seven-feathered spirit wings.',function(P){ P.w(0.5).ci(0,0,1.2); F.runes(P,1.33,0.17,26,2); inC(P,0,0.08,0.95,function(){ haloWings(P,7); blade(P); }); });
  S2('blade_b','Winged Blade · Knotwork','winged_blade','B','gilded','The winged sword before a braided ring, a knot at the crossguard.',function(P){ F.braid(P,1.2,28,0.08); F.rays(P,1.36,40); inC(P,0,0.08,1.0,function(){ haloWings(P,7); blade(P); P.w(0.6).triq(0,-0.28,0.1); }); });
  S2('blade_c','Winged Blade · Fractal','winged_blade','C','neon','Every feather carries its own smaller feathers; runes run down the blade.',function(P){ P.w(0.6).ci(0,0,1.2); F.key(P,1.31,36,0.055); F.dots(P,1.47,36,0.016); inC(P,0,0.08,0.95,function(){ haloWings(P,8,true); blade(P,true); }); });

  // ── 8 NEW ──
  S2('serpent_ring','World Serpent','','N','bevel','A knot-bodied serpent-dragon circling the world tree, its tail in its jaws.',function(P){ inC(P,0,0.06,0.92,function(){ P.ftree(5); }); var f=ZBrand.arc(0,0,1.14,-PI/2+0.42,-PI/2+PI*2-0.12); P.w(0.45).rail(f,-0.14).rail(f,0.14); P.w(0.85).braid(f,30,0.09); P.dragon(0.26,-1.13,0.26,0.18,true); P.w(0.5).ci(0,0,0.92); F.dots(P,1.4,36,0.016); },
    function(P,L){ P.w(1.6).ar(0,0,0.86,-PI/2+0.5,-PI/2+PI*2-0.1); P.w(1); P.fp([0.1,-1.02,0.44,-0.9,0.2,-0.66]); base('world_tree').draw(ZBrand.P(P.c,L,0.75),1); });
  S2('tree_triquetra','Tree & Triquetra','','N','gilded','The world tree with the three-cornered knot over its heart, bound in a rune band with three knots.',function(P){ inC(P,0,0.08,1.02,function(){ P.ftree(6); }); P.c.save(); P.c.globalCompositeOperation='destination-out'; P.w(3.4).triq(0,-0.1,0.5); P.c.restore(); P.w(1.2).triq(0,-0.1,0.5); P.w(0.9).ci(0,-0.1,0.26); P.w(1).ci(0,0,0.98); F.runes(P,1.16,0.2,21,3); P.rot(3,function(){ P.c.save(); P.c.globalCompositeOperation='destination-out'; P.c.beginPath(); P.c.arc(0,-1.16,0.22,0,PI*2); P.c.fill(); P.c.restore(); P.c.save(); P.c.translate(0,-1.16); P.w(0.8).braid(ZBrand.ring(0.15,0),6,0.05); P.c.restore(); },0); F.dots(P,1.42,30,0.016); },
    function(P,L){ base('world_tree').draw(P,1); P.w(0.9).triq(0,-0.05,0.55); if(L>=2)P.w(1).ci(0,0,1.02); });
  S2('twin_dragons','Twin Dragons','','N','bevel','The wayfinder in its rune ring, guarded by two dragons whose braided necks rise to meet above it.',function(P){ inC(P,0,0.12,0.7,function(){ staves(P); }); P.c.save(); P.c.translate(0,0.12); F.runes(P,0.82,0.16,22,5); P.c.restore(); P.mir(function(){ var f=ZBrand.arc(0,0.12,1.2,PI*0.62,-PI*0.3); P.w(0.45).rail(f,-0.12).rail(f,0.12); P.w(0.8).braid(f,17,0.075); P.dragon(0.4,-1.04,0.33,-0.28,true); }); P.w(0.8).triq(0,1.32,0.16,PI); },
    function(P,L){ base('wayfinder').draw(P,L); });
  S2('crossed_axes','Crossed Axes','','N','gilded','Two war axes crossed behind the shield knot.',function(P){ P.axe(0,0.16,2.3,-0.66,true); P.axe(0,0.16,2.3,0.66); P.c.save(); P.c.translate(0,0.16); P.c.save(); P.c.globalCompositeOperation='destination-out'; P.c.beginPath(); P.c.arc(0,0,0.74,0,PI*2); P.c.fill(); P.c.restore(); inC(P,0,0,0.44,function(){ knot(P); }); P.w(0.9).ci(0,0,0.5); P.w(0.7).braid(ZBrand.ring(0.61),18,0.05); P.w(0.5).ci(0,0,0.71); P.c.restore(); },
    function(P,L){ P.w(1.2).ln([-0.7,0.8,0.5,-0.8]).ln([0.7,0.8,-0.5,-0.8]); P.fp([0.5,-0.8,0.9,-0.86,0.86,-0.3,0.62,-0.5]); P.fp([-0.5,-0.8,-0.9,-0.86,-0.86,-0.3,-0.62,-0.5]); if(L>=2){ P.c.save(); P.c.globalCompositeOperation='destination-out'; P.c.beginPath(); P.c.arc(0,0.1,0.36,0,PI*2); P.c.fill(); P.c.restore(); P.w(1).ci(0,0.1,0.34); P.ln([0,-0.1,0.2,0.1,0,0.3,-0.2,0.1],true); } });
  S2('rune_pillar','Rune Pillar','','N','neon','A tall waystone: the tree in a ring of runes above a pillar of key borders, spear-tipped above and below.',function(P){ inC(P,0,0.07,0.86,function(){
    inC(P,0,-0.56,0.5,function(){ P.ftree(6,3); P.w(1.6).ci(0,0,0.98); F.runes(P,1.2,0.22,18,2); F.key(P,1.44,24,0.07); });
    P.w(0.9).braid(ZBrand.seg(0,0.22,0,1.0),10,0.06);
    P.mir(function(){ P.w(0.6).meander(ZBrand.seg(0.44,0.26,0.44,1.02),8,0.05); P.w(0.8).rune(0.23,0.42,0.13,1).rune(0.23,0.64,0.13,4).rune(0.23,0.86,0.13,6); });
    P.w(1).ln([-0.22,-1.34,0,-1.72,0.22,-1.34]); P.w(0.6).ln([-0.1,-1.38,0,-1.56,0.1,-1.38]);
    P.w(1).ln([-0.52,1.08,0.52,1.08]).ln([-0.3,1.08,0,1.56,0.3,1.08]); P.w(0.6).ln([-0.17,1.14,0,1.4,0.17,1.14]); }); },
    function(P,L){ inC(P,0,-0.3,0.55,function(){ base('world_tree').draw(P,1); P.w(1.4).ci(0,0,1.02); }); P.w(1).ln([-0.34,0.3,-0.34,0.7,0,1.0,0.34,0.7,0.34,0.3]); });
  S2('realm_tree','Tree on the Waystone','','N','bevel','The world tree growing from a rune-carved waystone, a knot at its root, key borders at its sides.',function(P){ inC(P,0,-0.04,1.12,function(){ P.ftree(6,1); }); P.c.save(); P.c.globalCompositeOperation='destination-out'; P.c.fillRect(-0.07,0.0,0.14,0.42); P.c.restore(); P.w(0.7).ln([-0.07,-0.02,-0.07,0.44]).ln([0.07,-0.02,0.07,0.44]); P.w(0.5).rune(0,0.08,0.09,5).rune(0,0.21,0.09,2).rune(0,0.34,0.09,6);
    P.mir(function(){ P.w(0.5).meander(ZBrand.seg(1.14,-0.2,1.14,0.44),6,0.045); }); P.w(0.9).ln([-1.2,0.46,-0.6,0.46,0,1.2,0.6,0.46,1.2,0.46]); P.w(0.5).ln([-0.4,0.54,0,1.02,0.4,0.54],true); P.w(0.7).triq(0,0.74,0.13,PI); P.mir(function(){ P.w(0.8).rune(0.86,0.62,0.14,3).rune(1.06,0.62,0.14,6); }); P.w(0.5).ln([-1.2,0.78,-0.74,0.78]).ln([1.2,0.78,0.74,0.78]); },
    function(P,L){ base('world_tree').draw(P,1); P.w(0.9).ln([-1,0.5,-0.6,0,-0.36,0.5]).ln([1,0.5,0.6,0,0.36,0.5]); });
  S2('knot_dragon','Knot-Winged Dragon','','N','bevel','A dragon rising with wings spread: braided wing-arms, a knotted body and a spear-tip tail.',function(P){ P.mir(function(){ var g=function(u){ var x=0.14+1.2*Math.sin(u*PI*0.5), y=-0.1-1.05*u*u-0.1*u, dx=1.2*Math.cos(u*PI*0.5)*PI*0.5, dy=-2.1*u-0.1, l=Math.hypot(dx,dy)||1; return [x,y,-dy/l,dx/l]; };
      P.w(0.45).rail(g,-0.08).rail(g,0.08); P.w(0.8).braid(g,14,0.05); var E=[[0.2,0.5]];
      for(var k=0;k<5;k++){ var q=g(0.22+k*0.19), ex=q[0]+0.06-k*0.04, ey=q[1]+0.98-k*0.1; E.push([ex,ey]); P.w(0.9-k*0.08).qd([q[0],q[1]+0.07,q[0]+0.14,(q[1]+ey)/2,ex,ey]); }
      var tip=g(1); E.push([tip[0],tip[1]]); P.w(0.7); for(var e=0;e<E.length-1;e++){ var a=E[e], b=E[e+1]; P.qd([a[0],a[1],(a[0]+b[0])/2-0.02,Math.min(a[1],b[1])-0.2,b[0],b[1]]); } P.fp([tip[0],tip[1]-0.14,tip[0]+0.06,tip[1]+0.02,tip[0]-0.06,tip[1]+0.02]); });
    P.w(0.85).braid(ZBrand.seg(0,-0.34,0,0.9),10,0.085); P.w(0.9).ln([0,0.9,0,1.22]); P.fp([0,1.48,0.11,1.2,-0.11,1.2]); P.w(0.6).ln([-0.18,1.1,0,1.2,0.18,1.1]);
    P.w(0.9).qd([0.06,-0.34,0.22,-0.62,0.1,-0.84]); P.qd([-0.07,-0.34,0.08,-0.62,-0.04,-0.8]); P.dragon(-0.2,-0.98,0.3,0.12,true); },
    function(P,L){ P.mir(function(){ P.w(1.2).qd([0.1,0,0.9,-0.1,1.1,-0.95]); P.w(0.9).qd([0.5,-0.1,0.6,0.3,0.5,0.7]); if(L>=2)P.qd([0.8,-0.3,0.95,0.2,0.9,0.5]); }); P.w(1.2).ln([0,-0.5,0,0.9]); P.fp([0,1.1,0.1,0.86,-0.1,0.86]); P.fp([-0.34,-0.7,0.06,-0.86,0.08,-0.5,-0.1,-0.56]); });
  S2('realm_hammer','Hammer of the Realms','','N','gilded','A war hammer filled with knotwork, the four-realms star above it.',function(P){ P.w(1.2).ln([-0.16,-0.66,0.16,-0.66,0.16,0.3,0.84,0.3,0.84,0.84,0.4,0.84,0,1.18,-0.4,0.84,-0.84,0.84,-0.84,0.3,-0.16,0.3],true); P.w(0.5).ln([-0.09,-0.58,0.09,-0.58,0.09,0.38,0.76,0.38,0.76,0.76,0.36,0.76,0,1.06,-0.36,0.76,-0.76,0.76,-0.76,0.38,-0.09,0.38],true);
    P.w(0.7).braid(ZBrand.seg(0,-0.52,0,0.34),10,0.045); P.w(0.8).triq(0,0.66,0.2); P.mir(function(){ P.w(0.6).braid(ZBrand.ring(0.13,0),6,0.04); P.c.save(); P.c.translate(0.54,0.57); P.w(0.6).braid(ZBrand.ring(0.12,0),6,0.04); P.c.restore(); });
    inC(P,0,-1.06,0.34,function(){ P.w(1.4); star8(P,0.98,0.24); P.w(1.2).ci(0,0,0.16); P.w(1).ci(0,0,1.12); P.w(1.2).band(ZBrand.ring(1.34),14,0.24,3); P.w(1).ci(0,0,1.56); }); P.mir(function(){ P.w(0.5).meander(ZBrand.seg(1.0,0.3,1.0,0.86),5,0.04); }); },
    function(P,L){ P.w(1.2).ln([-0.16,-0.9,0.16,-0.9,0.16,0.1,0.8,0.1,0.8,0.62,0.36,0.62,0,0.96,-0.36,0.62,-0.8,0.62,-0.8,0.1,-0.16,0.1],true); if(L>=2){ P.w(0.8).triq(0,0.42,0.2); P.ln([0,-0.8,0,0]); } });
})();

// ═══════════ shared: draw a finish (several passes), each pass on its own layer so erasing works ═══════════
ZBrand.passes=function(w,h,style,col,setup,draw){ var out=ZBrand.mk(w,h), c=out.getContext('2d'); (ZBrand.STYLES[style]||ZBrand.STYLES.bevel).forEach(function(p){ var tmp=ZBrand.mk(w,h), q=tmp.getContext('2d'), cc=p[0]>=0?ZBrand.mix(col,'#ffffff',p[0]):ZBrand.mix(col,'#000000',-p[0]); setup(q); q.lineJoin='round'; q.lineCap='round'; q.translate(p[2],p[3]); q.strokeStyle=cc; q.fillStyle=cc; var P=ZBrand.P(q,3,p[1]); P.w(1); draw(P,q,p); c.drawImage(tmp,0,0); }); return out; };
// one line of lettering in a finish pass. Units: 1 = cap height H. Returns {w, xs (left edge of each letter), ws}
ZBrand.text=function(q,p,str,font,wt,sz,tr,cx,cy,o){ o=o||{}; var f=sz/100, n=str.length, ws=[], wd=0, i; q.save(); q.font=wt+' 100px '+font; q.textBaseline='alphabetic'; q.textAlign='left';
  for(i=0;i<n;i++){ var m=o.adv&&o.adv[i]!==undefined?o.adv[i]/f:q.measureText(str[i]).width; ws.push(m); wd+=m+(i<n-1?tr/f:0); }
  var xs=[], x=-wd/2; for(i=0;i<n;i++){ xs.push(cx+x*f); x+=ws[i]+tr/f; }
  if(!o.dry){ for(i=0;i<n;i++){ if(o.skip&&o.skip[i])continue; q.save(); var xc=xs[i]+ws[i]*f/2;
      if(o.arc){ q.translate(cx,cy+o.arc); q.rotate((xc-cx)/o.arc); q.translate(0,-o.arc); } else q.translate(xc,cy);
      q.scale(f,f); ZBrand.glyph(q,p,str[i],-ws[i]/2,35); q.restore(); } }
  q.restore(); return {w:wd*f,xs:xs,ws:ws.map(function(v){ return v*f; })}; };
ZBrand.glyph=function(q,p,ch,x,y){ if(p[1]>1.05){ q.lineWidth=5*(p[1]-1)*3; q.lineJoin='round'; q.strokeText(ch,x,y); q.fillText(ch,x,y); }
  else if(p[1]<0.5){ q.globalAlpha=0.5; q.lineWidth=1.3; q.strokeText(ch,x,y); }
  else { var g=q.createLinearGradient(0,y-72,0,y+4); g.addColorStop(0,'#fff3c0'); g.addColorStop(0.45,'#f2c14e'); g.addColorStop(1,'#b47a1e'); q.fillStyle=p.grad===false?q.fillStyle:g; q.fillText(ch,x,y); } };

// ═══════════ WORDMARKS, round 11 — all gold, built on Engraved Capitals and Highland Wide, with war axes ═══════════
(function(){ var PI=Math.PI, G=ZBrand.GOLD, FE='"Cinzel Decorative","Cinzel",Georgia,serif', FH='"Marcellus SC","Palatino Linotype",serif', FC='"Cinzel",Georgia,serif', Z='ZELDARA';
  var W2=function(id,name,desc,o){ ZBrand.WORDS.push(Object.assign({id:id,name:name,col:G,style:'gilded',desc:desc,gen:2,kind:'custom'},o)); };
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  var dia=function(P,x,y,r){ P.fp([x,y-r,x+r,y,x,y+r,x-r,y]); };
  var rule=function(P,x0,x1,y,mid){ P.ln([x0,y,x1,y]); dia(P,x0,y,0.05); dia(P,x1,y,0.05); if(mid)dia(P,(x0+x1)/2,y,0.09); };
  var runes=function(P,x0,x1,y,h,seed){ var n=Math.max(3,Math.round((x1-x0)/(h*0.95))); for(var i=0;i<n;i++)P.rune(x0+(x1-x0)*(i+0.5)/n,y,h,i*3+(seed||1)); };
  W2('axe_crest','Crossed-Axe Crest','Engraved capitals under two crossed war axes, with a rune band beneath.',{oy:0.35,paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FE,'700',1.32,0.12,0,0.2), w=m.w/2;
      P.axe(0,-1.3,1.7,-0.72,true); P.axe(0,-1.3,1.7,0.72); erase(q,function(){ q.beginPath(); q.arc(0,-1.3,0.27,0,PI*2); q.fill(); }); P.w(0.9).ci(0,-1.3,0.22); P.w(0.6).triq(0,-1.29,0.15);
      P.w(0.7); rule(P,-w,-1.05,-0.78); rule(P,1.05,w,-0.78); P.w(0.7).ln([-w,0.98,w,0.98]).ln([-w,1.5,w,1.5]); P.w(0.6); runes(P,-w+0.1,w-0.1,1.24,0.3,1); }});
  W2('axe_l','Axe for an L','Heavy capitals where a war axe stands in for the L: the haft is the stroke, the blade is the foot.',{oy:0.55,paint:function(P,q,p){ var adv=[]; adv[2]=1.08; var m=ZBrand.text(q,p,Z,FC,'900',1.4,0.13,0,0,{adv:adv,skip:{2:1}}), w=m.w/2;
      P.axe(m.xs[2]+0.14,-0.6,1.8,PI,true); P.w(0.7); rule(P,-w,w,0.92,true); P.w(0.5).ln([-w*0.6,1.08,w*0.6,1.08]); }});
  W2('great_axe','Great Axe Underline','Wide Highland capitals resting on a long war axe, runes carved beneath its haft.',{oy:-0.45,paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FH,'400',1.22,0.34,0,-0.1), w=m.w/2, xr=w+0.55, y=0.92;
      P.axe(xr-0.25,y,1.9,PI/2,false); P.w(0.9).ln([-w-0.3,y-0.042,xr-1.2,y-0.042]).ln([-w-0.3,y+0.042,xr-1.2,y+0.042]); P.w(0.5); for(var i=0;i<7;i++){ var x=-w-0.2+i*0.11; P.ln([x,y-0.06,x+0.05,y+0.06]); } P.w(0.9).ci(-w-0.42,y,0.1); P.w(0.5); for(var k=0;k<3;k++){ var bx=-w*0.2+k*w*0.4; P.ln([bx,y-0.07,bx,y+0.07]).ln([bx+0.07,y-0.07,bx+0.07,y+0.07]); }
      P.w(0.55); runes(P,-w+0.1,xr-1.7,y+0.42,0.26,2); P.w(0.6).ln([-w,-0.92,w,-0.92]); dia(P,0,-0.92,0.08); }});
  W2('twin_axes','Twin Axes','Engraved capitals guarded by an upright war axe on each side.',{paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FE,'700',1.3,0.12,0,0), w=m.w/2;
      P.axe(-w-0.7,0.02,2.5,0,true); P.axe(w+0.7,0.02,2.5,0,false); P.w(0.7); rule(P,-w+0.1,w-0.1,-0.86,true); rule(P,-w+0.1,w-0.1,0.86,true); P.w(0.45).ln([-w*0.7,-1.0,w*0.7,-1.0]).ln([-w*0.7,1.0,w*0.7,1.0]); }});
  W2('dragon_rule','Dragon Lines','Highland capitals between two braided lines; the upper one ends in dragon heads.',{paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FH,'400',1.22,0.34,0,0), w=m.w/2, f=ZBrand.seg(-w+0.2,-0.95,w-0.2,-0.95), g=ZBrand.seg(-w-0.2,0.95,w+0.2,0.95);
      P.w(0.4).rail(f,-0.12,2).rail(f,0.12,2).rail(g,-0.12,2).rail(g,0.12,2); P.w(0.75).braid(f,Math.round(w*7),0.065).braid(g,Math.round(w*7.4),0.065); P.dragon(w+0.14,-1.0,0.34,-0.1,false); P.dragon(-w-0.14,-1.0,0.34,0.1,true);
      P.w(0.8); [-1,1].forEach(function(s){ P.ln([s*(w+0.2),0.83,s*(w+0.5),0.95,s*(w+0.2),1.07],true); }); }});
  W2('key_bands','Key-Border Bands','Highland capitals between two angular key borders, like a carved lintel.',{paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FH,'400',1.22,0.34,0,0), w=m.w/2+0.2, n=Math.round(w*2/0.36);
      P.w(0.6).meander(ZBrand.seg(-w,-0.98,w,-0.98),n,0.11).meander(ZBrand.seg(w,0.98,-w,0.98),n,0.11); P.w(0.8); [-1,1].forEach(function(s){ P.ln([s*w,-1.09,s*w,-0.87]).ln([s*w,1.09,s*w,0.87]); dia(P,s*(w+0.22),-0.98,0.09); dia(P,s*(w+0.22),0.98,0.09); P.axe(s*(w+0.75),0,1.5,0,s<0); }); }});
  W2('knot_plaque','Knotwork Plaque','Engraved capitals in a braided knot border, crossed axes set into the top.',{oy:0.2,paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FE,'700',1.24,0.12,0,0.05), w=m.w/2+0.55, t=-1.0, b=1.1, mx=Math.round(w*2/0.3), my=Math.round((b-t)/0.3);
      [[-w,t,w,t,mx],[w,t,w,b,my],[w,b,-w,b,mx],[-w,b,-w,t,my]].forEach(function(r){ var f=ZBrand.seg(r[0],r[1],r[2],r[3]); P.w(0.4).rail(f,-0.13,2).rail(f,0.13,2); P.w(0.75).braid(f,r[4],0.07); });
      [[-w,t],[w,t],[w,b],[-w,b]].forEach(function(c){ erase(q,function(){ q.fillRect(c[0]-0.17,c[1]-0.17,0.34,0.34); }); P.w(0.7).ln([c[0]-0.15,c[1]-0.15,c[0]+0.15,c[1]-0.15,c[0]+0.15,c[1]+0.15,c[0]-0.15,c[1]+0.15],true); dia(P,c[0],c[1],0.07); });
      erase(q,function(){ q.beginPath(); q.arc(0,t,0.62,0,PI*2); q.fill(); }); P.axe(0,t,1.25,-0.75,true); P.axe(0,t,1.25,0.75); }});
  W2('tree_axes','Tree & Axes','The world tree in a ring above the name, a war axe laid out to either side.',{oy:0.75,paint:function(P,q,p){ var m=ZBrand.text(q,p,Z,FE,'700',1.3,0.12,0,0.2), w=m.w/2;
      q.save(); q.translate(0,-1.4); q.scale(0.62,0.62); P.ftree(5); P.w(1.5).ci(0,0.02,1.0); P.w(0.9).band(ZBrand.ring(1.2),16,0.22,2); P.w(1.2).ci(0,0.02,1.4); q.restore(); P.w(1);
      P.axe(-2.25,-1.4,2.4,-PI/2,false); P.axe(2.25,-1.4,2.4,PI/2,true); P.w(0.7); rule(P,-w,w,0.98,true); }});
  W2('arc_crest','Arched Crest','The name set on an arch over two crossed axes, like a clan crest.',{oy:-0.6,paint:function(P,q,p){ var R=4.6, m=ZBrand.text(q,p,Z,FC,'700',1.25,0.2,0,-0.2,{arc:R}), a=m.w/2/R+0.06, cy=-0.2+R;
      P.w(0.7).ar(0,cy,R+0.78,-PI/2-a,-PI/2+a).ar(0,cy,R-0.74,-PI/2-a,-PI/2+a); P.w(0.45).ar(0,cy,R+0.9,-PI/2-a,-PI/2+a);
      [-1,1].forEach(function(s){ var x=Math.sin(s*a), y=-Math.cos(a); P.w(0.7).ln([x*(R-0.74),cy+y*(R-0.74),x*(R+0.9),cy+y*(R+0.9)]); });
      P.axe(0,1.6,1.7,-0.8,true); P.axe(0,1.6,1.7,0.8); erase(q,function(){ q.beginPath(); q.arc(0,1.6,0.3,0,PI*2); q.fill(); }); P.w(0.9).ci(0,1.6,0.25); P.w(0.6).triq(0,1.61,0.17); }});
  W2('ring_z','Ringed Z','A great Z in a knot ring over crossed axes, the rest of the name in engraved capitals beside it.',{paint:function(P,q,p){ var m=ZBrand.text(q,p,'ELDARA',FE,'700',1.2,0.12,0,0,{dry:true}), zx=-m.w/2-0.25, tx=0.95;
      P.axe(zx,0,2.9,-0.7,true); P.axe(zx,0,2.9,0.7); erase(q,function(){ q.beginPath(); q.arc(zx,0,1.2,0,PI*2); q.fill(); }); ZBrand.text(q,p,'Z',FC,'900',1.75,0,zx,0);
      P.w(0.45).ci(zx,0,0.9).ci(zx,0,1.14); q.save(); q.translate(zx,0); P.w(0.8).braid(ZBrand.ring(1.02),22,0.065); q.restore();
      var e=ZBrand.text(q,p,'ELDARA',FE,'700',1.2,0.12,tx,-0.1), x0=tx-e.w/2, x1=tx+e.w/2; P.w(0.7).ln([x0,0.7,x1,0.7]).ln([x0,1.14,x1,1.14]); P.w(0.55); runes(P,x0+0.1,x1-0.1,0.92,0.26,4); }});
  var wl0=ZBrand.wordLayers;
  ZBrand.wordLayers=function(D,H){ if(D.gen!==2)return wl0(D,H); var fk=document.fonts?['700 20px "Cinzel Decorative"','20px "Marcellus SC"','900 20px Cinzel'].map(function(f){ return document.fonts.check(f)?1:0; }).join(''):'', k='w_'+D.id+'_'+Math.round(H)+'_'+fk, o=ZBrand.cache[k]; if(o)return o;
    var w=Math.ceil(H*12.4), h=Math.ceil(H*5.6), main=ZBrand.passes(w,h,D.style,D.col,function(q){ q.translate(w/2,h/2+(D.oy||0)*H); q.scale(H,H); },function(P,q,p){ D.paint(P,q,p); });
    var glow=ZBrand.mk(w,h), g=glow.getContext('2d'); g.shadowColor=D.col; g.shadowBlur=Math.max(3,H*0.3); g.drawImage(main,0,0); g.shadowBlur=Math.max(5,H*0.7); g.globalAlpha=0.6; g.drawImage(main,0,0);
    return ZBrand.cache[k]={main:main,glow:glow,w:w,h:h}; };
})();

// ═══════════ HOME PAGES, round 11 — six looks that combine Kris's three picks ═══════════
// Shared: black page, aurora across the top (Northern Crown), glowing rune columns down the sides
// (Rune Columns), a teal rune frame (Rune Frame), knotwork borders on the two buttons, and the
// wordmark lettering (Cinzel) on the buttons and story line. They differ in the carved background.
(function(){ var PI=Math.PI, T=ZBrand.TEAL, G=ZBrand.GOLD, FC='"Cinzel",Georgia,serif', FH='"Marcellus SC","Palatino Linotype",serif';
  var rnd=function(s){ s=(s*9301+49297)%233280; return function(){ s=(s*9301+49297)%233280; return s/233280; }; };
  var H2=function(id,name,desc,o){ ZBrand.HOMES.push(Object.assign({id:id,name:name,desc:desc,gen:2,acc:T},o)); };
  var stars=function(c,W,H,t,n,seed){ var R=rnd(seed); for(var i=0;i<n;i++){ var x=R()*W, y=R()*H, ph=R()*6.3, sz=R()<0.08?1.6:0.9; c.globalAlpha=0.2+0.5*(0.5+0.5*Math.sin(t*(0.6+R())+ph)); c.fillStyle='#fff'; c.fillRect(x,y,sz*H/540,sz*H/540); } c.globalAlpha=1; };
  var aurora=function(c,W,H,t,A){ var st=Math.max(3,Math.ceil(W/240)); c.save(); c.globalCompositeOperation='lighter'; A.cols.forEach(function(col,b){ for(var x=0;x<W;x+=st){ var q=x/W*960, y0=H*A.y+Math.sin(q*0.011+t*0.22+b*1.7)*H*0.06+Math.sin(q*0.027-t*0.13+b)*H*0.03, hh=H*A.h*(0.55+0.45*Math.sin(q*0.017+t*0.3+b*2.1)), al=A.a*(0.35+0.65*Math.pow(0.5+0.5*Math.sin(q*0.021-t*0.35+b*1.3),2))/A.cols.length*1.6;
        var g=c.createLinearGradient(0,y0,0,y0+hh); g.addColorStop(0,ZBrand.rgba(col,0)); g.addColorStop(0.18,ZBrand.rgba(col,al)); g.addColorStop(1,ZBrand.rgba(col,0)); c.fillStyle=g; c.fillRect(x,y0,st,hh); } }); c.restore(); };
  var shoot=function(c,W,H,t,per){ var n=Math.floor(t/per), u=(t-n*per)/1.1; if(u>=1)return; var Q=rnd(n*13+5), x0=W*(0.15+Q()*0.7), y0=H*(0.05+Q()*0.3), dx=W*0.28*(Q()<0.5?-1:1), dy=H*0.2, hx=x0+dx*u, hy=y0+dy*u, g=c.createLinearGradient(hx,hy,hx-dx*0.22,hy-dy*0.22); g.addColorStop(0,'rgba(255,255,255,'+(0.9*(1-u))+')'); g.addColorStop(1,'rgba(255,255,255,0)'); c.strokeStyle=g; c.lineWidth=1.6*H/540; c.beginPath(); c.moveTo(hx,hy); c.lineTo(hx-dx*0.22,hy-dy*0.22); c.stroke(); };
  var litRune=function(c,x,y,h,i,rot,on,u){ c.save(); c.strokeStyle=on>0.5?ZBrand.mix(T,'#ffffff',(on-0.5)*0.9):T; c.globalAlpha=0.16+0.84*on; c.lineCap='round'; if(on>0.25){ c.shadowColor=T; c.shadowBlur=u*0.7*on; } var P=ZBrand.P(c,3,1); c.lineWidth=h*0.11; P.rune(x,y,h,i,rot); c.restore(); };
  // ── carved pieces (drawn once into a cached layer; units: page height = 20) ──
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  var braidRect=function(P,x0,y0,x1,y1,amp,sp,corner){ var q=P.c; [[x0,y0,x1,y0],[x1,y0,x1,y1],[x1,y1,x0,y1],[x0,y1,x0,y0]].forEach(function(r){ var f=ZBrand.seg(r[0],r[1],r[2],r[3]), m=Math.max(4,Math.round(Math.hypot(r[2]-r[0],r[3]-r[1])/sp)); P.w(0.5).rail(f,-amp*1.9,2).rail(f,amp*1.9,2); P.w(0.9).braid(f,m,amp); });
    [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach(function(k){ var d=amp*2.6; erase(q,function(){ q.fillRect(k[0]-d,k[1]-d,d*2,d*2); }); P.w(0.8).ln([k[0]-d,k[1]-d,k[0]+d,k[1]-d,k[0]+d,k[1]+d,k[0]-d,k[1]+d],true); if(corner==='knot')P.w(0.5).triq(k[0],k[1]+d*0.1,d*0.7); else P.fp([k[0],k[1]-d*0.5,k[0]+d*0.5,k[1],k[0],k[1]+d*0.5,k[0]-d*0.5,k[1]]); }); };
  var keyRect=function(P,x0,y0,x1,y1,h,sp){ [[x0,y0,x1,y0],[x1,y0,x1,y1],[x1,y1,x0,y1],[x0,y1,x0,y0]].forEach(function(r){ var L=Math.hypot(r[2]-r[0],r[3]-r[1]), f=ZBrand.seg(r[0]+(r[2]-r[0])*h*1.6/L,r[1]+(r[3]-r[1])*h*1.6/L,r[2]-(r[2]-r[0])*h*1.6/L,r[3]-(r[3]-r[1])*h*1.6/L); P.w(0.6).meander(f,Math.max(3,Math.round(L/sp)),h); });
    [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach(function(k){ P.w(0.7).ln([k[0]-h,k[1]-h,k[0]+h,k[1]-h,k[0]+h,k[1]+h,k[0]-h,k[1]+h],true); P.fc(k[0],k[1],h*0.4); }); };
  var lineRect=function(P,x0,y0,x1,y1){ P.w(0.9).ln([x0,y0,x1,y0,x1,y1,x0,y1],true); P.w(0.45).ln([x0+0.14,y0+0.14,x1-0.14,y0+0.14,x1-0.14,y1-0.14,x0+0.14,y1-0.14],true); [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach(function(k){ erase(P.c,function(){ P.c.fillRect(k[0]-0.2,k[1]-0.2,0.4,0.4); }); P.w(0.5).triq(k[0],k[1]+0.03,0.2); }); };
  var pillar=function(P,x,y0,y1,w,kind){ var q=P.c; if(kind==='key'){ P.w(0.55).meander(ZBrand.seg(x-w/2,y0,x-w/2,y1),Math.round((y1-y0)/0.5),0.13).meander(ZBrand.seg(x+w/2,y1,x+w/2,y0),Math.round((y1-y0)/0.5),0.13); }
      else if(kind==='braid'){ [-1,1].forEach(function(s){ var f=ZBrand.seg(x+s*w/2,y0,x+s*w/2,y1); P.w(0.4).rail(f,-0.17,2).rail(f,0.17,2); P.w(0.8).braid(f,Math.round((y1-y0)/0.42),0.09); }); }
      else { P.w(0.7).ln([x-w/2,y0,x-w/2,y1]).ln([x+w/2,y0,x+w/2,y1]); P.w(0.35).ln([x-w/2-0.14,y0+0.3,x-w/2-0.14,y1-0.3]).ln([x+w/2+0.14,y0+0.3,x+w/2+0.14,y1-0.3]); }
    var e=w/2+(kind==='line'?0:0.2); [[y0,-1],[y1,1]].forEach(function(k){ var y=k[0], s=k[1]; P.w(0.8).ln([x-e,y,x+e,y]).ln([x-e,y,x,y+s*e*1.5,x+e,y]); P.w(0.45).ln([x-e*0.55,y+s*0.12,x,y+s*e*0.95,x+e*0.55,y+s*0.12]); P.fc(x,y+s*e*1.5+s*0.28,0.07); }); };
  var BW=9.6, BH=1.9, BX=5.5;
  var fitK=function(Wu){ return Math.max(0.5,Math.min(1,(Wu-10.4)/2/(BX+BW/2))); };
  var buttons=function(P,cx,y,kind,k){ [cx-BX*k,cx+BX*k].forEach(function(bx){ var x0=bx-BW*k/2, x1=bx+BW*k/2, y0=y-BH/2, y1=y+BH/2; if(kind==='key')keyRect(P,x0,y0,x1,y1,0.15,0.52); else if(kind==='line')lineRect(P,x0,y0,x1,y1); else braidRect(P,x0,y0,x1,y1,0.1,0.44,kind==='knot'?'knot':''); }); };
  // the carved layer for one look, cached per size
  var carved=function(cfg,W,H){ var fk=document.fonts?(document.fonts.check('700 20px Cinzel')?1:0):1, k='h2_'+cfg.id+'_'+W+'_'+H+'_'+fk, o=ZBrand.cache[k]; if(o)return o; var u=H/20, Wu=W/u, cx=Wu/2, bk=fitK(Wu);
    var main=ZBrand.passes(W,H,'neon',T,function(q){ q.scale(u,u); },function(P){ cfg.carve(P,Wu,cx); buttons(P,cx,cfg.by||14.8,cfg.btn,bk); });
    var c=main.getContext('2d'); c.save(); c.scale(u,u);
    // button fill + gold lettering in the wordmark face, story line
    [cx-BX*bk,cx+BX*bk].forEach(function(bx,i){ c.fillStyle=ZBrand.rgba(T,0.07); c.globalCompositeOperation='destination-over'; c.fillRect(bx-BW*bk/2,(cfg.by||14.8)-BH/2,BW*bk,BH); c.globalCompositeOperation='source-over';
      [[-0.9,1.7,0,0],[0,1,0,0]].forEach(function(p){ c.save(); c.fillStyle=c.strokeStyle=p[0]<0?'#1a1204':G; ZBrand.text(c,p,i?'RETURNING PLAYER':'NEW GAME',FC,'700',0.7*bk,0.09*bk,bx,(cfg.by||14.8)+0.02); c.restore(); }); });
    c.fillStyle='rgba(200,214,226,.78)'; c.font='400 0.62px '+FH; c.textAlign='center'; c.textBaseline='middle'; c.save(); c.translate(cx,(cfg.by||14.8)+2.75); c.scale(0.01*Math.min(1,(Wu-9)/24),0.01*Math.min(1,(Wu-9)/24)); c.font='400 62px '+FH; c.fillText('Four realms. One awakening. Wake the waystones, befriend the spirits,',0,0); c.fillText('and face the Volcano Lord.',0,92); c.restore(); c.restore();
    var glow=ZBrand.mk(W,H), g=glow.getContext('2d'); g.shadowColor=T; g.shadowBlur=u*0.5; g.drawImage(main,0,0);
    var keys=Object.keys(ZBrand.cache).filter(function(x){ return x.indexOf('h2_')===0; }); if(keys.length>8)delete ZBrand.cache[keys[0]]; return ZBrand.cache[k]={main:main,glow:glow}; };
  // ── the six looks ──
  var cols=function(x,y0,y1,n,h){ return {x:x,y0:y0,y1:y1,n:n,h:h}; };
  H2('crown_columns','Crown & Columns','Aurora crown above; two carved pillars of glowing runes with spear tips; a thin rune frame; braided knot borders on the buttons.',{aur:{cols:['#3dffa0','#30c8ff'],y:0.02,h:0.3,a:0.5},stars:70,shoot:10,btn:'braid',frame:{m:0.8,n:[30,14]},
    columns:function(Wu){ return [cols(3.1,3.4,16.6,11,0.82),cols(Wu-3.1,3.4,16.6,11,0.82)]; },
    carve:function(P,Wu,cx){ pillar(P,3.1,2.6,17.4,1.5,'line'); pillar(P,Wu-3.1,2.6,17.4,1.5,'line'); }});
  H2('knot_frame','Knotwork Frame','The whole page in a braided knot border with knots at the corners; rune columns just inside it; a faint aurora above.',{aur:{cols:['#3dffa0','#30c8ff'],y:0.04,h:0.26,a:0.38},stars:50,shoot:14,btn:'knot',
    columns:function(Wu){ return [cols(2.5,3.2,16.8,10,0.86),cols(Wu-2.5,3.2,16.8,10,0.86)]; },
    carve:function(P,Wu,cx){ braidRect(P,0.9,0.9,Wu-0.9,19.1,0.12,0.56,'knot'); P.w(0.4).ln([3.6,2.4,3.6,17.6]).ln([Wu-3.6,2.4,Wu-3.6,17.6]); }});
  H2('meander_gate','Key-Border Gate','A carved gate: two key-pattern pillars and a lintel of runes across the top, the aurora showing through; key borders on the buttons.',{aur:{cols:['#3dffa0','#30c8ff','#7a6cff'],y:0.06,h:0.3,a:0.45},stars:60,shoot:12,btn:'key',by:14.9,sr:0.118,ly:0.325,
    columns:function(Wu){ return [cols(3.0,4.6,16.2,9,0.86),cols(Wu-3.0,4.6,16.2,9,0.86)]; }, lintel:function(Wu){ return {y:1.55,x0:3.2,x1:Wu-3.2,n:30,h:0.62}; },
    carve:function(P,Wu,cx){ pillar(P,3.0,3.7,17.1,1.5,'key'); pillar(P,Wu-3.0,3.7,17.1,1.5,'key'); P.w(0.55).meander(ZBrand.seg(1.6,0.85,Wu-1.6,0.85),Math.round((Wu-3.2)/0.5),0.13).meander(ZBrand.seg(Wu-1.6,2.25,1.6,2.25),Math.round((Wu-3.2)/0.5),0.13); P.w(0.8).ln([1.6,0.6,1.6,2.5]).ln([Wu-1.6,0.6,Wu-1.6,2.5]); }});
  H2('tree_veil','World Tree Veil','A great fractal tree, very faint, behind everything; a ring of runes turning slowly round the logo; plain glowing rune columns; aurora above.',{aur:{cols:['#3dffa0','#30c8ff'],y:0.0,h:0.36,a:0.42},stars:60,shoot:11,btn:'braid',ring:2,veil:0.28,sr:0.132,
    columns:function(Wu){ return [cols(2.2,2.4,17.6,12,0.8),cols(Wu-2.2,2.4,17.6,12,0.8)]; },
    carve:function(P,Wu,cx){ P.w(0.35).ln([3.1,1.6,3.1,18.4]).ln([Wu-3.1,1.6,Wu-3.1,18.4]).ln([1.3,1.6,1.3,18.4]).ln([Wu-1.3,1.6,Wu-1.3,18.4]); },
    back:function(P,Wu,cx){ P.c.save(); P.c.translate(cx,9.6); P.c.scale(13.5,13.5); P.c.lineWidth*=0.1; var w0=P.w; P.w=function(m){ P.c.lineWidth=0.0042*m; return P; }; P.ftree(7,4); P.w=w0; P.c.restore(); }});
  H2('serpent_ring','Serpent Ring','A knot-bodied serpent circles the logo; teal runes frame the page and light in turn; slim rune columns; aurora above.',{aur:{cols:['#3dffa0','#30c8ff'],y:0.02,h:0.28,a:0.42},stars:60,shoot:13,btn:'knot',frame:{m:0.8,n:[32,15]},sr:0.105,
    columns:function(Wu){ return [cols(3.3,4.2,15.8,9,0.84),cols(Wu-3.3,4.2,15.8,9,0.84)]; },
    carve:function(P,Wu,cx){ var cy=5.5, f=ZBrand.arc(cx,cy,4.1,-PI/2+0.36,-PI/2+PI*2-0.1); P.w(0.45).rail(f,-0.3).rail(f,0.3); P.w(0.9).braid(f,46,0.17); P.dragon(cx+0.95,cy-4.05,0.85,0.16,true); pillar(P,3.3,3.5,16.5,1.4,'braid'); pillar(P,Wu-3.3,3.5,16.5,1.4,'braid'); }});
  H2('quiet_runes','Quiet Runes','The calmest: a thin aurora, glowing rune columns, a hairline frame with a knot at each corner, and fine double-line buttons.',{aur:{cols:['#3dffa0','#30c8ff'],y:0.03,h:0.2,a:0.3},stars:36,shoot:18,btn:'line',
    columns:function(Wu){ return [cols(2.4,3.0,17.0,10,0.9),cols(Wu-2.4,3.0,17.0,10,0.9)]; },
    carve:function(P,Wu,cx){ lineRect(P,1.0,1.0,Wu-1.0,19.0); }});
  var home0=ZBrand.home;
  ZBrand.home=function(c,cfg,W,H,t,o){ if(cfg.gen!==2)return home0(c,cfg,W,H,t,o); o=o||{}; var u=H/20, Wu=W/u, cx=W/2, cy=H*(cfg.ly||0.275), SR=H*(cfg.sr||0.138), i;
    c.fillStyle='#000'; c.fillRect(0,0,W,H); stars(c,W,H,t,cfg.stars,cfg.id.length*7+3); if(cfg.aur)aurora(c,W,H,t,cfg.aur); if(cfg.shoot)shoot(c,W,H,t,cfg.shoot);
    if(cfg.back){ var bk='h2b_'+cfg.id+'_'+W+'_'+H, B=ZBrand.cache[bk]; if(!B){ B=ZBrand.cache[bk]=ZBrand.mk(W,H); var q=B.getContext('2d'); q.scale(u,u); q.strokeStyle=T; q.fillStyle=T; q.lineCap='round'; cfg.back(ZBrand.P(q,3,1),Wu,Wu/2); } c.save(); c.globalAlpha=(cfg.veil||0.2)*(0.75+0.25*Math.sin(t*0.4)); c.drawImage(B,0,0); c.restore(); }
    var gl=c.createRadialGradient(cx,cy,0,cx,cy,SR*2.8); gl.addColorStop(0,ZBrand.rgba(T,0.1+0.05*Math.sin(t*0.7))); gl.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=gl; c.fillRect(0,0,W,H);
    var L=carved(cfg,W,H); c.save(); c.globalCompositeOperation='lighter'; c.globalAlpha=0.3+0.25*Math.sin(t*0.8); c.drawImage(L.glow,0,0); c.restore(); c.drawImage(L.main,0,0);
    // glowing rune columns: a light travels down them
    cfg.columns(Wu).forEach(function(C,s){ for(i=0;i<C.n;i++){ var on=Math.pow(0.5+0.5*Math.sin(t*0.9-i*0.6+s*2),6); litRune(c,C.x*u,(C.y0+(C.y1-C.y0)*i/(C.n-1))*u,C.h*u,i*5+s*3,0,on,u); } });
    if(cfg.lintel){ var Lt=cfg.lintel(Wu); for(i=0;i<Lt.n;i++){ var on2=Math.pow(0.5+0.5*Math.sin(t*0.7-Math.abs(i-(Lt.n-1)/2)*0.5),6); litRune(c,(Lt.x0+(Lt.x1-Lt.x0)*i/(Lt.n-1))*u,Lt.y*u,Lt.h*u,i*3+1,0,on2,u); } }
    // teal rune frame, lighting in turn
    if(cfg.frame){ var m=cfg.frame.m*u, nx=cfg.frame.n[0], ny=cfg.frame.n[1], k=0, put=function(x,y){ var on3=Math.pow(0.5+0.5*Math.sin(t*0.6-k*0.29),10); litRune(c,x,y,u*0.5,k*3,0,on3*0.9,u); k++; };
      for(i=0;i<nx;i++)put(W*(i+0.5)/nx,m); for(i=0;i<ny;i++)put(W-m,H*(i+0.5)/ny); for(i=nx-1;i>=0;i--)put(W*(i+0.5)/nx,H-m); for(i=ny-1;i>=0;i--)put(m,H*(i+0.5)/ny); }
    if(cfg.ring){ var nr=20, rr=SR*1.82; for(i=0;i<nr;i++){ var a=i/nr*PI*2+t*0.05, on4=Math.pow(0.5+0.5*Math.sin(t*0.8-i*0.39),8); litRune(c,cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,SR*0.2,i*3,a+PI/2,on4*0.85,u); } }
    ZBrand.symbol(c,o.sym||'tree_b',cx,cy,SR,3,t); ZBrand.word(c,o.word||'twin_axes',cx,H*0.575,H*0.058,t); };
})();
