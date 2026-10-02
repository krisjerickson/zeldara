// ═══════════════════════════════════════════════════════════════════════
// ║ ZELDARA BRAND, round 12 (third pass):
// ║  • 20 more logos (gen 3), all teal, dense, no fractals: 9 after the nine
// ║    pictures Kris sent (our own drawings of each picture's layout and motifs,
// ║    nothing traced) + 11 that build on Crossed Axes and his other picks.
// ║  • ZBrand.TIER2: the logos Kris picked so far — kept as second-tier marks.
// ║  • The winning wordmark (Ringed Z) in 10 different typefaces.
// ║  • The picked home page (World Tree Veil) reworked for the new logo / font.
// ═══════════════════════════════════════════════════════════════════════
ZBrand.TIER2=['crossed_axes','blade_b','way_b','tree_c','world_tree','compass','four_spirits','realm_peak','shield_knot','triquetra','wayfinder','winged_blade'];
(function(){ var PI=Math.PI, T=ZBrand.TEAL, K=ZBrand.K, F=K.F, inC=K.inC;
  var S3=function(id,name,grp,style,desc,small,big){ ZBrand.SYMBOLS.push({id:id,name:name,col:T,style:style,desc:desc,gen:3,grp:grp,draw:function(P,L){ if(L>=3)big(P); else if(typeof small==='string')ZBrand.byId(small).draw(P,L); else small(P,L); }}); };
  var erase=function(P,f){ P.c.save(); P.c.globalCompositeOperation='destination-out'; f(); P.c.restore(); };
  var hole=function(P,x,y,r){ erase(P,function(){ P.c.beginPath(); P.c.arc(x,y,r,0,PI*2); P.c.fill(); }); };
  var at=function(P,x,y,f){ P.c.save(); P.c.translate(x,y); f(); P.c.restore(); };
  // a dragon head set on the end of a path, facing the way the path runs
  var headAt=function(P,f,s){ var p=f(1), q=f(0.96), d=Math.atan2(p[1]-q[1],p[0]-q[0]), x=p[0]+Math.cos(d)*s*0.85, y=p[1]+Math.sin(d)*s*0.85; if(Math.cos(d)<0)P.dragon(x,y,s,d-PI,true); else P.dragon(x,y,s,d,false); };
  var neck=function(P,f,m,amp,hs){ P.w(0.45).rail(f,-amp*1.7).rail(f,amp*1.7); P.w(0.8).braid(f,m,amp); if(hs)headAt(P,f,hs); };
  var raven=function(P,x,y,s,flip){ P.w(1); var b=P.c.lineWidth/s; P.c.save(); P.c.translate(x,y); P.c.scale(s*(flip?-1:1),s); P.c.lineWidth=b*0.8;
    P.qd([-0.95,0.75,-1.0,-0.2,-0.4,-0.6,0.1,-0.78,0.5,-0.42,0.9,-0.2,1.35,0.08]); P.qd([1.35,0.08,0.8,0.08,0.45,0.12,0.3,0.4,-0.1,0.8]); P.c.lineWidth=b*0.45; P.ln([0.45,0.12,1.0,0.0]); for(var i=0;i<4;i++)P.qd([-0.75+i*0.2,-0.1+i*0.02,-0.7+i*0.2,0.3,-0.55+i*0.2,0.7]); P.c.beginPath(); P.c.arc(0.3,-0.3,0.09,0,PI*2); P.c.fill(); P.c.restore(); P.w(1); };
  var sunring=function(P,r0,r1,n){ P.w(0.7).ci(0,0,r0); for(var i=0;i<n;i++){ var a=i/n*PI*2, b=(i+1)/n*PI*2, m=(a+b)/2; P.qd([Math.cos(a)*r0,Math.sin(a)*r0,Math.cos(a)*r1,Math.sin(a)*r1,Math.cos(m)*r1,Math.sin(m)*r1,Math.cos(b)*r1,Math.sin(b)*r1,Math.cos(b)*r0,Math.sin(b)*r0]); } };
  var shield=function(P,r){ P.w(1.1).ci(0,0,r); P.w(0.5).ci(0,0,r*0.86); P.w(0.6).band(ZBrand.ring(r*0.93),18,r*0.1,2); P.w(0.5).rot(8,function(){ P.ln([0,-r*0.3,0,-r*0.86]); }); P.w(1).ci(0,0,r*0.3); P.w(0.6).ci(0,0,r*0.19); P.fc(0,0,r*0.07); P.rot(8,function(){ P.fc(0,-r*0.6,r*0.035); },PI/8); };
  var dblaxe=function(P,x,y,len,rot){ P.axe(x,y,len,rot,false); P.axe(x,y,len,rot,true); };
  var axes=function(P,cy,len,ang){ P.axe(0,cy,len,-ang,true); P.axe(0,cy,len,ang); };
  var spear=function(P,y,w,h,s){ P.w(0.9).ln([-w,y,0,y+s*h,w,y]); P.w(0.5).ln([-w*0.62,y+s*0.02,0,y+s*h*0.68,w*0.62,y+s*0.02]).ln([-w*0.28,y+s*0.02,0,y+s*h*0.34,w*0.28,y+s*0.02]); };
  var rtri=function(r,k){ return function(u){ var a=-PI/2+u*PI*2, R=r*(1+k*Math.cos(3*(a+PI/2))), b=a+0.002, R2=r*(1+k*Math.cos(3*(b+PI/2))), x=Math.cos(a)*R, y=Math.sin(a)*R, dx=Math.cos(b)*R2-x, dy=Math.sin(b)*R2-y, l=Math.hypot(dx,dy)||1; return [x,y,dy/l,-dx/l]; }; };
  var sub=function(g,t0,t1){ return function(u){ var t=t0+(t1-t0)*u, p=g(t), q=g(t+0.001), dx=q[0]-p[0], dy=q[1]-p[1], l=Math.hypot(dx,dy)||1; return [p[0],p[1],-dy/l,dx/l]; }; };
  var treeMed=function(P,depth,ring){ P.ftree(depth); P.w(1.3).ci(0,0,1.0); if(ring==='braid'){ F.braid(P,1.2,26,0.085); } else if(ring==='runes'){ F.runes(P,1.18,0.2,20,1); } };
  var knotMed=function(P,r){ hole(P,0,0,r*1.18); inC(P,0,0,r*0.72,function(){ K.knot(P); }); P.w(0.9).ci(0,0,r*0.8); P.w(0.7).braid(ZBrand.ring(r*0.98),18,r*0.08); P.w(0.5).ci(0,0,r*1.14); };

  // ══════ NINE AFTER THE PICTURES ══════
  S3('totem_tree','Tree Totem','img','neon','After picture 1: the tree in a rune ring crowns a carved pillar — rune columns, key borders, a braided trunk running down to its roots, spear tips above and below, light rays behind.','world_tree',function(P){ inC(P,0,-0.02,0.86,function(){
    at(P,0,-0.66,function(){ P.w(0.4).ticks(0.84,0.98,40); P.ticks(0.84,1.08,10); inC(P,0,0,0.5,function(){ P.ftree(5,2); P.w(1.6).ci(0,0,0.98); F.runes(P,1.2,0.22,18,2); F.key(P,1.46,26,0.07); }); });
    spear(P,-1.5,0.3,0.36,-1);
    hole(P,0,0.62,0.001); erase(P,function(){ P.c.fillRect(-0.08,0.1,0.16,0.3); });
    P.w(0.9).braid(ZBrand.seg(0,-0.14,0,1.06),14,0.07);
    P.mir(function(){ P.w(0.6).meander(ZBrand.seg(0.56,0.24,0.56,1.1),9,0.055); P.w(0.5).ln([0.4,0.2,0.4,1.14]).ln([0.16,0.24,0.16,1.1]); P.w(0.8); for(var i=0;i<5;i++)P.rune(0.28,0.33+i*0.17,0.12,i*3+1); P.w(0.6).qd([0.05,1.06,0.2,1.2,0.42,1.22]).qd([0.03,1.1,0.1,1.3,0.26,1.36]); });
    P.w(0.9).ln([-0.66,0.2,0.66,0.2]).ln([-0.66,1.14,0.66,1.14]); spear(P,1.24,0.56,0.56,1); P.fc(0,-1.94,0.03); P.fc(0,1.9,0.03); }); });
  S3('tree_gate','Tree in the Gate','img','bevel','After picture 2: a great tree with a rune-carved trunk between two key-pattern pillars, mountains behind it, set on a shield of chevrons.','world_tree',function(P){ inC(P,0,-0.06,0.95,function(){
    P.mir(function(){ P.w(0.6).ln([0.1,0.52,0.3,0.24,0.44,0.38,0.62,0.08,0.84,0.52]); P.w(0.35).ln([0.62,0.08,0.6,0.3,0.68,0.52]).ln([0.3,0.24,0.28,0.4]); });
    inC(P,0,-0.3,1.12,function(){ P.ftree(6,1); });
    erase(P,function(){ P.c.fillRect(-0.1,-0.3,0.2,0.84); }); P.w(0.8).ln([-0.1,-0.32,-0.1,0.54]).ln([0.1,-0.32,0.1,0.54]); P.w(0.6); for(var i=0;i<5;i++){ var y=-0.2+i*0.165; P.ln([0,y-0.075,0.07,y,0,y+0.075,-0.07,y],true); }
    P.mir(function(){ P.w(0.6).meander(ZBrand.seg(0.98,-0.42,0.98,0.54),10,0.06); P.w(0.8).ln([0.88,-0.46,1.08,-0.46]).ln([0.9,-0.46,0.98,-0.6,1.06,-0.46]); });
    P.w(1).ln([-1.12,0.56,1.12,0.56]); P.w(0.5).ln([-1.12,0.63,1.12,0.63]);
    P.w(1).ln([-0.92,0.7,0.92,0.7,0.92,0.96,0,1.56,-0.92,0.96],true); P.w(0.55).meander(ZBrand.seg(-0.78,0.83,0.78,0.83),15,0.06); P.w(0.5).ln([-0.74,1.0,0,1.42,0.74,1.0]).ln([-0.5,1.0,0,1.28,0.5,1.0]); P.w(0.7).triq(0,1.08,0.1,PI); }); });
  S3('tree_ravens','Tree & Ravens','img','bevel','After picture 3: the tree in a knot ring above two ravens, a braided body with feathered sides, and a knot roundel at the foot.','world_tree',function(P){ inC(P,0,0,0.92,function(){
    P.mir(function(){ for(var k=0;k<6;k++){ var y=0.0+k*0.14; P.w(0.8-k*0.05).qd([0.16,y,0.5-k*0.02,y+0.1,0.74-k*0.08,y+0.56]); } });
    P.w(0.5).ln([-0.2,-0.2,-0.2,0.86]).ln([0.2,-0.2,0.2,0.86]); P.w(0.9).braid(ZBrand.seg(0,-0.22,0,0.88),12,0.1);
    at(P,0,-0.82,function(){ hole(P,0,0,0.74); inC(P,0,0,0.5,function(){ treeMed(P,5,'braid'); P.w(0.8).ticks(1.36,1.5,28); }); });
    raven(P,0.6,-0.02,0.27,false); raven(P,-0.6,-0.02,0.27,true);
    at(P,0,1.22,function(){ hole(P,0,0,0.42); P.w(1).ci(0,0,0.38); P.w(0.7).braid(ZBrand.ring(0.28),10,0.05); P.w(0.8).triq(0,0.02,0.17); }); }); });
  S3('dragon_rise','Rising Dragon','img','bevel','After picture 4: a dragon rising with its wings swept up into a crescent — braided wing-arms, ribbed membranes, a knotted body and a spear-tip tail.','knot_dragon',function(P){ ZBrand.byId('knot_dragon').draw(P,3);
    P.mir(function(){ var g=function(u){ var x=0.14+1.2*Math.sin(u*PI*0.5), y=-0.1-1.05*u*u-0.1*u; return [x,y]; }; for(var k=0;k<5;k++){ var q=g(0.31+k*0.19); P.w(0.4).qd([q[0],q[1]+0.1,q[0]+0.06,q[1]+0.4,q[0]-0.02-k*0.03,q[1]+0.62-k*0.07]); } P.w(0.6).ln([0.1,1.02,0.26,0.92]).ln([0.1,0.9,0.24,0.8]); });
    hole(P,0,0.12,0.2); P.w(0.9).ci(0,0.12,0.18); P.w(0.7).triq(0,0.13,0.12); });
  S3('serpent_coil','Coiled Serpent','img','bevel','After picture 5: a knot-bodied serpent wound through three loops, horned head raised, tail ending in a spear point.','wyrm_ring',function(P){ P.c.save(); P.c.translate(0,0.1); P.c.rotate(-PI*2/3); P.c.scale(0.9,0.9);
    var g=function(t){ return [(Math.sin(t)+2*Math.sin(2*t))*0.4,(Math.cos(t)-2*Math.cos(2*t))*0.4]; }, t0=PI/3+0.34, t1=PI/3+PI*2-0.3, n=16;
    for(var i=0;i<n;i++){ var a=t0+(t1-t0)*i/n, b=t0+(t1-t0)*(i+1)/n, f=sub(g,a,b+0.012); erase(P,function(){ P.c.lineCap='butt'; P.w(7.5).rail(sub(g,a+0.02,b-0.005),0,10); }); P.w(0.5).rail(f,-0.12,10).rail(f,0.12,10); P.w(0.85).braid(f,5,0.06); }
    headAt(P,sub(g,t1-0.2,t1),0.38);
    var s=sub(g,t0,t0+0.05)(0), d=Math.atan2(-s[2],s[3]); P.c.save(); P.c.translate(s[0],s[1]); P.c.rotate(d+PI); P.fp([0.34,0,0.02,0.14,0.02,-0.14]); P.w(0.6).ln([-0.06,0.17,0.06,0,-0.06,-0.17]); P.c.restore(); P.c.restore(); });
  S3('tri_tree','Triquetra Tree','img','bevel','After picture 6: the three-cornered knot over the world tree, bound in a three-sided rune band with a knot at each corner.','triquetra',function(P){ inC(P,0,0.1,0.92,function(){
    inC(P,0,0.12,0.84,function(){ P.ftree(6); }); erase(P,function(){ P.w(3.6).triq(0,0.02,0.66); }); P.w(1.4).triq(0,0.02,0.66); P.w(0.5).triq(0,-0.02,0.52); P.w(1).ci(0,0.02,0.33);
    var f=rtri(1.24,0.13), fi=rtri(1.12,0.13), fo=rtri(1.36,0.13); P.w(0.7).rail(fi,0,90).rail(fo,0,90); P.w(0.65).band(f,33,0.15,1);
    P.rot(3,function(){ at(P,0,-1.4,function(){ hole(P,0,0,0.25); P.w(0.9).ci(0,0,0.22); P.w(0.7).braid(ZBrand.ring(0.14,0),6,0.045); }); });
    P.rot(3,function(){ P.fc(0,-1.5,0.03); },PI/3); P.w(0.45).rail(rtri(1.47,0.13),0,90); }); });
  S3('sword_dragons','Sword & Dragons','img','bevel','After picture 7: an upright sword behind a sun medallion, two dragons on braided necks at its sides, two war axes crossed below.','winged_blade',function(P){ inC(P,0,0.02,0.9,function(){
    P.axe(0,0.42,2.0,PI-1.0,true); P.axe(0,0.42,2.0,PI+1.0,false);
    P.mir(function(){ var f=ZBrand.arc(0.3,-0.2,0.72,1.0,-1.2); erase(P,function(){ P.w(6).rail(f,0,24); }); neck(P,f,12,0.07,0.3); });
    erase(P,function(){ P.c.fillRect(-0.12,-1.5,0.24,2.9); }); inC(P,0,0.0,1.42,function(){ K.blade(P,true); });
    at(P,0,0.06,function(){ hole(P,0,0,0.62); sunring(P,0.46,0.58,16); inC(P,0,0,0.42,function(){ K.compassCore(P); }); P.w(0.9).ci(0,0,0.44); }); }); });
  S3('way_hammer','Wayfinder Hammer','img','gilded','After picture 8: the wayfinder in its rune ring set on a great hammer filled with knotwork, braided knots at its shoulders.','realm_hammer',function(P){ inC(P,0,0.04,0.94,function(){
    P.w(1.2).ln([-0.2,-0.4,0.2,-0.4,0.2,0.3,0.9,0.3,0.9,0.9,0.44,0.9,0,1.3,-0.44,0.9,-0.9,0.9,-0.9,0.3,-0.2,0.3],true); P.w(0.5).ln([-0.12,-0.36,0.12,-0.36,0.12,0.38,0.82,0.38,0.82,0.82,0.4,0.82,0,1.18,-0.4,0.82,-0.82,0.82,-0.82,0.38,-0.12,0.38],true);
    P.w(0.75).braid(ZBrand.seg(0,-0.34,0,0.38),8,0.055); P.w(0.9).triq(0,0.74,0.24); P.mir(function(){ at(P,0.56,0.6,function(){ P.w(0.7).braid(ZBrand.ring(0.13,0),6,0.045); P.fc(0,0,0.03); }); P.w(0.55).meander(ZBrand.seg(1.06,0.32,1.06,0.9),5,0.045); P.w(0.5).ln([0.26,0.45,0.36,0.45]).ln([0.26,0.75,0.36,0.75]); });
    P.mir(function(){ neck(P,ZBrand.arc(0.2,-0.02,0.62,0.5,-0.75),9,0.06,0); });
    at(P,0,-0.92,function(){ hole(P,0,0,0.66); inC(P,0,0,0.44,function(){ K.staves(P); }); P.w(1).ci(0,0,0.46); F.runes(P,0.55,0.1,20,3); }); P.fc(0,1.42,0.035); }); });
  S3('way_axes','Wayfinder & Axes','img','bevel','After picture 9: the wayfinder in a rune ring watched by two dragons, two war axes crossed beneath it over a knot boss, a braided tail below.','wayfinder',function(P){ inC(P,0,0.0,0.88,function(){
    P.w(0.5).ln([-0.09,0.9,-0.09,1.4]).ln([0.09,0.9,0.09,1.4]); P.w(0.85).braid(ZBrand.seg(0,0.9,0,1.42),6,0.05); P.fp([0,1.7,0.13,1.42,-0.13,1.42]);
    axes(P,0.62,2.15,0.74);
    P.mir(function(){ neck(P,ZBrand.arc(0,-0.74,0.82,PI*0.42,-PI*0.3),13,0.06,0.27); });
    at(P,0,0.62,function(){ hole(P,0,0,0.42); P.w(1).ci(0,0,0.38); P.w(0.7).braid(ZBrand.ring(0.28),10,0.045); P.w(0.9).triq(0,0.02,0.17); });
    at(P,0,-0.74,function(){ hole(P,0,0,0.74); inC(P,0,0,0.5,function(){ K.staves(P); }); P.w(1).ci(0,0,0.52); F.runes(P,0.63,0.12,22,5); }); }); });

  // ══════ ELEVEN THAT BUILD ON CROSSED AXES AND THE OTHER PICKS ══════
  S3('axes_tree','Axes & World Tree','pick','gilded','Crossed Axes with the world tree in the shield: the tree in a braided ring, two war axes behind it.','crossed_axes',function(P){ axes(P,0.16,2.35,0.66); at(P,0,0.16,function(){ hole(P,0,0,0.9); inC(P,0,0.02,0.6,function(){ P.ftree(5); }); P.w(1).ci(0,0,0.62); P.w(0.75).braid(ZBrand.ring(0.74),22,0.055); P.w(0.5).ci(0,0,0.86); }); });
  S3('axes_way','Axes & Wayfinder','pick','bevel','Crossed Axes with the wayfinder in the shield, ringed by runes and a braid.','crossed_axes',function(P){ axes(P,0.16,2.35,0.66); at(P,0,0.16,function(){ hole(P,0,0,0.96); inC(P,0,0,0.5,function(){ K.staves(P); }); P.w(0.9).ci(0,0,0.52); F.runes(P,0.62,0.11,20,4); P.w(0.75).braid(ZBrand.ring(0.82),24,0.05); P.w(0.5).ci(0,0,0.92); }); });
  S3('axes_blade','Axes & Winged Blade','pick','gilded','Crossed Axes with the winged sword set upright through a rune-ringed shield.','crossed_axes',function(P){ inC(P,0,0.06,0.9,function(){ axes(P,0.16,2.35,0.66); at(P,0,0.16,function(){ hole(P,0,0,0.74); P.w(0.9).ci(0,0,0.5); F.runes(P,0.6,0.11,18,3); P.w(0.5).ci(0,0,0.7); });
    inC(P,0,0.1,1.28,function(){ erase(P,function(){ K.wings(P,6,false,3.2); P.w(5).ln([0,-0.95,0,1.0]); }); K.wings(P,6); K.blade(P,true); }); }); });
  S3('axes_dragons','Axes & Twin Dragons','pick','bevel','Crossed Axes guarded by two dragons whose braided necks rise over the shield to meet at the top.','crossed_axes',function(P){ inC(P,0,0.2,0.84,function(){ axes(P,0.16,2.35,0.66);
    P.mir(function(){ var f=ZBrand.arc(0,0.16,0.98,-PI*0.03,-PI*0.37); erase(P,function(){ P.w(7).rail(f,0,20); }); neck(P,f,8,0.07,0.34); });
    at(P,0,0.16,function(){ knotMed(P,0.62); }); }); });
  S3('axes_serpent','Axes & Serpent Ring','pick','gilded','Crossed Axes with the shield knot circled by a knot-bodied serpent biting its tail.','crossed_axes',function(P){ axes(P,0.16,2.35,0.66); at(P,0,0.16,function(){ hole(P,0,0,0.98); inC(P,0,0,0.46,function(){ K.knot(P); }); P.w(0.9).ci(0,0,0.52);
    var f=ZBrand.arc(0,0,0.76,-PI/2+0.5,-PI/2+PI*2-0.12); P.w(0.5).rail(f,-0.13).rail(f,0.13); P.w(0.85).braid(f,24,0.07); P.dragon(0.2,-0.76,0.22,0.16,true); }); });
  S3('axes_crown','Axes in the Rune Crown','pick','bevel','Crossed Axes and the shield knot set inside a full crown of runes, a key border and rays.','crossed_axes',function(P){ inC(P,0,0.03,0.74,function(){ axes(P,0.16,2.35,0.66); at(P,0,0.16,function(){ knotMed(P,0.62); }); }); P.w(0.8).ci(0,0,1.06); F.runes(P,1.2,0.17,26,2); F.key(P,1.38,40,0.045); P.w(0.5).ticks(1.46,1.54,40); });
  S3('blade_tree','Winged Blade & Tree','pick','gilded','The winged sword over the world tree in its braided ring.','winged_blade',function(P){ inC(P,0,0.12,0.72,function(){ treeMed(P,6,'braid'); P.w(0.6).ticks(1.36,1.5,36); });
    inC(P,0,0.08,1.12,function(){ erase(P,function(){ K.wings(P,7,false,3.4); P.w(5).ln([0,-0.95,0,1.0]); }); K.wings(P,7); K.blade(P,true); }); });
  S3('way_compass','Wayfinder Compass','pick','bevel','The wayfinder in its rune and knot rings, laid over the four-realms compass star.','wayfinder',function(P){ P.w(1.1); K.star8(P,1.52,0.34); P.w(0.5); K.star8(P,1.36,0.28); P.w(0.8); K.star8(P,1.26,0.3,PI/4); hole(P,0,0,1.12);
    inC(P,0,0,0.72,function(){ K.staves(P); }); P.w(0.9).ci(0,0,0.74); F.runes(P,0.86,0.13,24,9); P.w(0.8).braid(ZBrand.ring(1.02),30,0.055); P.w(0.5).ci(0,0,1.1); P.rot(4,function(){ P.fc(0,-1.36,0.035); }); });
  S3('shield_arms','Shield & Arms','pick','gilded','A round rune-rimmed shield over a sword and two crossed war axes.','crossed_axes',function(P){ inC(P,0,0.05,0.92,function(){ axes(P,0.1,2.5,0.7); erase(P,function(){ P.c.fillRect(-0.11,-1.6,0.22,3.2); }); inC(P,0,0.1,1.5,function(){ K.blade(P); });
    at(P,0,0.1,function(){ hole(P,0,0,0.8); shield(P,0.74); hole(P,0,0,0.25); inC(P,0,0,0.19,function(){ K.knot(P); }); P.w(0.9).ci(0,0,0.23); }); }); });
  S3('winged_axe','Winged War Axe','pick','bevel','A double-bitted war axe borne on spirit wings, standing in a braided ring.','winged_blade',function(P){ F.braid(P,1.24,30,0.075); F.rays(P,1.38,40);
    inC(P,0,0.86,0.96,function(){ K.wings(P,7); });
    erase(P,function(){ P.c.fillRect(-0.08,-1.3,0.16,2.5); }); dblaxe(P,0,-0.02,2.0,0); P.w(0.8).triq(0,0.52,0.1); });
  S3('axe_compass','Axe Compass','pick','neon','The world tree in rune and key rings, with a war axe set at each of the four compass points.','compass',function(P){ P.rot(4,function(){ dblaxe(P,0,-1.02,0.98,0); }); hole(P,0,0,1.0);
    inC(P,0,0.04,0.6,function(){ P.ftree(6); }); P.w(1).ci(0,0,0.6); F.runes(P,0.72,0.12,20,6); F.key(P,0.88,28,0.045); P.w(0.6).rot(4,function(){ P.triq(0,-1.22,0.11); },PI/4); P.rot(4,function(){ P.fc(0,-1.06,0.03); },PI/4); });
})();

// ═══════════ WORDMARK: the winner (Ringed Z) in ten typefaces ═══════════
(function(){ var PI=Math.PI, G=ZBrand.GOLD, R0=ZBrand.wordById('ring_z');
  R0.fam='Cinzel Decorative'; R0.wt='700';
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  var runes=function(P,x0,x1,y,h,seed){ var n=Math.max(3,Math.round((x1-x0)/(h*0.95))); for(var i=0;i<n;i++)P.rune(x0+(x1-x0)*(i+0.5)/n,y,h,i*3+(seed||1)); };
  ZBrand.RZ_FONTS=[['rz_uncial','Uncial Antiqua','400','Celtic uncial','Round manuscript letters, as in the old Irish gospel books.',0.1],
    ['rz_meta','Metamorphous','400','Carved fantasy','Wide, chiselled capitals with flared tips.',0.1],
    ['rz_pirata','Pirata One','400','Light blackletter','Tall, narrow gothic letters — a touch of the pirate chart.',0.16],
    ['rz_grenze','Grenze Gotisch','800','Modern gothic','Heavy, sharp-cornered gothic with a modern cut.',0.14],
    ['rz_almendra','Almendra SC','400','Calligraphy','Pen-drawn small capitals with a storybook feel.',0.12],
    ['rz_rocker','New Rocker','400','Heavy fantasy','Thick, spiked letters — the loudest of the set.',0.1],
    ['rz_caesar','Caesar Dressing','400','Rune-cut','Angular strokes that read like carved runes.',0.12],
    ['rz_unicase','Cormorant Unicase','700','Elegant unicase','Fine, high-contrast letters that mix upper and lower shapes.',0.12],
    ['rz_medieval','MedievalSharp','400','Medieval pen','Broad-nib medieval lettering, friendly and readable.',0.12],
    ['rz_marcellus','Marcellus SC','400','Roman inscription','Calm Roman capitals — the Highland Wide face from the first round.',0.16]];
  ZBrand.RZ_FONTS.forEach(function(F){ var font='"'+F[1]+'","Cinzel",Georgia,serif';
    ZBrand.WORDS.push({id:F[0],name:'Ringed Z · '+F[1],col:G,style:'gilded',gen:3,kind:'custom',fam:F[1],wt:F[2],tag:F[3],desc:F[4],paint:function(P,q,p){ var o={norm:true}, m=ZBrand.text(q,p,'ELDARA',font,F[2],1.2,F[5],0,0,{dry:true,norm:true}), zx=-m.w/2-0.25, tx=0.95;
      P.axe(zx,0,2.9,-0.7,true); P.axe(zx,0,2.9,0.7); erase(q,function(){ q.beginPath(); q.arc(zx,0,1.2,0,PI*2); q.fill(); }); ZBrand.text(q,p,'Z',font,F[2],1.7,0,zx,0,o);
      P.w(0.45).ci(zx,0,0.9).ci(zx,0,1.14); q.save(); q.translate(zx,0); P.w(0.8).braid(ZBrand.ring(1.02),22,0.065); q.restore();
      var e=ZBrand.text(q,p,'ELDARA',font,F[2],1.2,F[5],tx,-0.1,o), x0=tx-e.w/2, x1=tx+e.w/2; P.w(0.7).ln([x0,0.7,x1,0.7]).ln([x0,1.14,x1,1.14]); P.w(0.55); runes(P,x0+0.1,x1-0.1,0.92,0.26,4); }}); });
})();

// ═══════════ HOME PAGE: the pick (World Tree Veil), reworked for the new logo and typeface ═══════════
(function(){ var H=ZBrand.H, TV=ZBrand.HOMES.find(function(h){ return h.id==='tree_veil'; }), mk=function(id,name,desc,o){ ZBrand.HOMES.push(Object.assign({},TV,{id:id,name:name,desc:desc,gen:3},o)); };
  mk('veil_a','World Tree Veil · as picked','Your pick, unchanged in layout: the faint world tree behind everything, a rune ring turning round the logo, plain glowing rune columns, aurora above. Now with the new logo, the Ringed Z, and button lettering in the chosen typeface.',{});
  mk('veil_b','World Tree Veil · carved columns','The same veil, with the side runes set into carved pillars: braided edges and spear tips above and below, as in the pictures you sent.',{btn:'knot',
    columns:function(Wu){ return [H.cols(2.6,3.4,16.6,11,0.82),H.cols(Wu-2.6,3.4,16.6,11,0.82)]; },
    carve:function(P,Wu,cx){ H.pillar(P,2.6,2.6,17.4,1.5,'braid'); H.pillar(P,Wu-2.6,2.6,17.4,1.5,'braid'); }});
  mk('veil_c','World Tree Veil · knot frame','The veil inside a full braided knot border with a knot at each corner; the rune columns stand just inside it.',{btn:'braid',
    columns:function(Wu){ return [H.cols(2.7,3.2,16.8,10,0.86),H.cols(Wu-2.7,3.2,16.8,10,0.86)]; },
    carve:function(P,Wu,cx){ H.braidRect(P,0.9,0.9,Wu-0.9,19.1,0.12,0.56,'knot'); P.w(0.4).ln([3.8,2.4,3.8,17.6]).ln([Wu-3.8,2.4,Wu-3.8,17.6]); }});
})();
