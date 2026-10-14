// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-brand5.js — round 53: the new name, THE QUESTS OF ZELDARA AND ZELDOR.
// ║ Kris: "I want to rename the game to "The Quests of Zeldara and Zeldor". Lets use the same font as before, but we need to remake the title
// ║ page … Come up with 10 options in the lab for me to choose from, but generally "The Quests of" should be small font, with "Zeldara" and
// ║ Zeldor" being large and having additional visual elements like the axes."
// ║ Ten wordmarks in his chosen face (MedievalSharp, the E's top arm drawn out, 07zz-brand4), all built from the Ringed Z's parts: the Z in a
// ║ braided ring over crossed bearded axes, engraved rules and rune bands. Each is a gen-3 'custom' wordmark (ZBrand.WORDS) with tall:true —
// ║ the title page then sets the logo smaller and higher to make room (ZBrand.home below). ZBrand.WORDMARK is the first until Kris picks.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZBrand==='undefined'||!ZBrand.text||!ZBrand.WORDS)return;
  var PI=Math.PI, G=ZBrand.GOLD, F='"MedievalSharp","Cinzel",Georgia,serif', WT='400';
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  var runes=function(P,x0,x1,y,h,seed){ var n=Math.max(3,Math.round((x1-x0)/(h*0.95))); for(var i=0;i<n;i++)P.rune(x0+(x1-x0)*(i+0.5)/n,y,h,i*3+(seed||1)); };
  // lettering in the chosen face: every face at the same capital height (norm), tracking in proportion to the size
  var T=function(q,p,s,sz,x,y,o){ return ZBrand.text(q,p,s,F,WT,sz,0.1*sz,x,y,Object.assign({norm:true},o||{})); };
  var W=function(q,p,s,sz){ return T(q,p,s,sz,0,0,{dry:true}).w; };
  // the letters stand in front of whatever is behind them (axes, rings): cut a thick outline of them first
  var front=function(q,p,s,sz,x,y,o){ var pe=p.slice(); pe[1]=Math.max(p[1],1.5); erase(q,function(){ T(q,pe,s,sz,x,y,o); }); return T(q,p,s,sz,x,y,o); };
  // two bearded axes crossed at (x,y)
  var axes=function(P,x,y,len,ang){ ang=ang===undefined?0.7:ang; P.axe(x,y,len,-ang,true); P.axe(x,y,len,ang); };
  // the Ringed Z: a great Z in a braided ring (s: 1 = the size in the old ZELDARA)
  var ringZ=function(P,q,p,x,y,s,withAxes){ if(withAxes!==false)axes(P,x,y,2.9*s);
    erase(q,function(){ q.beginPath(); q.arc(x,y,1.2*s,0,PI*2); q.fill(); }); T(q,p,'Z',1.7*s,x,y);
    P.w(0.45).ci(x,y,0.9*s).ci(x,y,1.14*s); q.save(); q.translate(x,y); P.w(0.8).braid(ZBrand.ring(1.02*s),22,0.065*s); q.restore(); };
  // a name led by its Ringed Z: zx is the ring's centre; the rest follows; returns its right end
  var name=function(P,q,p,rest,zx,y,s,o){ o=o||{}; ringZ(P,q,p,zx,y,s,o.axes); var sz=1.2*s, w=W(q,p,rest,sz), tx=zx+1.2*s+w/2; front(q,p,rest,sz,tx,y-0.1*s);
    if(o.rule!==false){ var x0=tx-w/2, x1=tx+w/2; P.w(0.6).ln([x0,y+0.68*s,x1,y+0.68*s]); if(o.runes){ P.w(0.5); runes(P,x0+0.1,x1-0.1,y+0.88*s,0.22*s,o.seed||4); P.w(0.6).ln([x0,y+1.08*s,x1,y+1.08*s]); } }
    return tx+w/2; };
  var nameW=function(q,p,rest,s){ return 1.2*s+W(q,p,rest,1.2*s); };     // from the ring's centre to the end of the name
  // a small line between rules: ── THE QUESTS OF ──
  var caption=function(P,q,p,txt,x,y,sz,spread){ var w=T(q,p,txt,sz,x,y).w, g=0.25, L=spread||1.6; P.w(0.5).ln([x-w/2-g-L,y,x-w/2-g,y]).ln([x+w/2+g,y,x+w/2+g+L,y]); P.fc(x-w/2-g-L-0.1,y,0.06).fc(x+w/2+g+L+0.1,y,0.06); return w; };
  // the joining word: a small AND set on a knot diamond, or a triquetra
  var joinAnd=function(P,q,p,x,y,sz){ var w=W(q,p,'AND',sz); P.w(0.45).ln([x-w/2-0.35,y,x-w/2-0.15,y-0.15,x-w/2+0.05,y]); P.ln([x+w/2+0.35,y,x+w/2+0.15,y-0.15,x+w/2-0.05,y]); T(q,p,'AND',sz,x,y); };
  var mk=function(id,nm,desc,paint,o){ ZBrand.WORDS.push(Object.assign({id:id,name:nm,col:G,style:'gilded',gen:3,kind:'custom',fam:'MedievalSharp',wt:WT,tall:true,desc:desc,paint:paint},o||{})); };
  ZBrand.QZ=[];
  var Q=function(id,nm,desc,paint,o){ mk(id,nm,desc,paint,o); ZBrand.QZ.push(id); };

  // 1 ── Twin Rings: both names led by their own Ringed Z, the rings one above the other
  Q('qz_twin','Twin Rings','Each name led by its own Ringed Z over crossed axes, the two rings one above the other; THE QUESTS OF small between rules above, AND between the names.',function(P,q,p){
    var s=0.74, wa=nameW(q,p,'ELDARA',s), zx=-wa/2+0.5; caption(P,q,p,'THE QUESTS OF',0.15,-2.5,0.4,1.4);
    name(P,q,p,'ELDARA',zx,-1.25,s,{rule:true}); joinAnd(P,q,p,zx+1.2*s+W(q,p,'ELDARA',1.2*s)/2,0.1,0.32); name(P,q,p,'ELDOR',zx,1.42,s,{rule:true}); });
  // 2 ── One Great Z: a single ringed Z serves both names
  Q('qz_shared','One Great Z','One great Ringed Z over crossed axes serves both names: ELDARA beside its top, ELDOR beside its foot, AND between them on a rune band.',function(P,q,p){
    var s=1.35, zx=-2.25; caption(P,q,p,'THE QUESTS OF',0.4,-2.45,0.42,1.6); ringZ(P,q,p,zx,0,s);
    var sz=1.0, wa=W(q,p,'ELDARA',sz), wo=W(q,p,'ELDOR',sz), x0=zx+1.35; front(q,p,'ELDARA',sz,x0+wa/2,-0.78); front(q,p,'ELDOR',sz,x0+wo/2,0.92);
    P.w(0.6).ln([x0,-0.12,x0+wa,-0.12]).ln([x0,0.24,x0+wa,0.24]); T(q,p,'AND',0.26,x0+wa*0.5,0.06); });
  // 3 ── Side by Side: one line, the axes crossed between the names
  Q('qz_line','Side by Side','ZELDARA and ZELDOR on one line, crossed axes and a knot ring between them holding a triquetra; THE QUESTS OF above, a rune band below.',function(P,q,p){
    var sz=0.8, wa=W(q,p,'ZELDARA',sz), wo=W(q,p,'ZELDOR',sz), gap=1.9, tot=wa+gap+wo, xa=-tot/2+wa/2, xo=tot/2-wo/2, xc=-tot/2+wa+gap/2;
    caption(P,q,p,'THE QUESTS OF',0,-1.55,0.44,2.4); axes(P,xc,0.05,2.6,0.62); erase(q,function(){ q.beginPath(); q.arc(xc,0.05,0.62,0,PI*2); q.fill(); });
    P.w(0.5).ci(xc,0.05,0.56); q.save(); q.translate(xc,0.05); P.w(0.7).braid(ZBrand.ring(0.5),14,0.05); q.restore(); P.w(0.6).triq(xc,0.07,0.36);
    front(q,p,'ZELDARA',sz,xa,0); front(q,p,'ZELDOR',sz,xo,0); var x0=-tot/2, x1=tot/2; P.w(0.6).ln([x0,0.75,x1,0.75]); P.w(0.5); runes(P,x0+0.1,x1-0.1,0.98,0.24,7); P.w(0.6).ln([x0,1.21,x1,1.21]); });
  // 4 ── The Great X: both names centred, two long axes crossed behind them both
  Q('qz_cross','The Great X','Both names centred, one above the other, two long bearded axes crossed behind them in a great X; a knot ring at the crossing holds a small AND.',function(P,q,p){
    var sz=1.05; caption(P,q,p,'THE QUESTS OF',0,-2.5,0.4,1.3); axes(P,0,0.12,4.2,0.95); erase(q,function(){ q.beginPath(); q.arc(0,0.12,0.5,0,PI*2); q.fill(); });
    P.w(0.5).ci(0,0.12,0.44); q.save(); q.translate(0,0.12); P.w(0.7).braid(ZBrand.ring(0.39),12,0.045); q.restore(); T(q,p,'AND',0.2,0,0.12);
    front(q,p,'ZELDARA',sz,0,-1.2); front(q,p,'ZELDOR',sz,0,1.45); });
  // 5 ── The Shield: a round Viking shield behind the names
  Q('qz_shield','The Shield','A round Viking shield with a braided rim and a boss behind the names, two axes crossed behind the shield; THE QUESTS OF curves along its top.',function(P,q,p){
    var R=2.45; axes(P,0,0,6.4,0.78); erase(q,function(){ q.beginPath(); q.arc(0,0,R+0.12,0,PI*2); q.fill(); });
    P.w(0.6).ci(0,0,R).ci(0,0,R-0.42); q.save(); P.w(0.85).braid(ZBrand.ring(R-0.21),36,0.08); q.restore(); P.w(0.3); for(var i=0;i<8;i++){ var a=i/8*PI*2+PI/8; P.ln([Math.cos(a)*0.5,Math.sin(a)*0.5,Math.cos(a)*(R-0.5),Math.sin(a)*(R-0.5)]); }
    erase(q,function(){ q.fillRect(-R,-1.62,R*2,3.1); }); T(q,p,'THE QUESTS OF',0.34,0,-1.3);
    front(q,p,'ZELDARA',0.95,0,-0.42); T(q,p,'AND',0.24,0,0.42); front(q,p,'ZELDOR',0.95,0,1.06); P.w(0.5).ln([-R+0.15,-1.62,R-0.15,-1.62]).ln([-R+0.15,1.48,R-0.15,1.48]); });
  // 6 ── The Seal: names arched round a central ring
  Q('qz_seal','The Seal','A round seal: ZELDARA arched over the top, ZELDOR arched beneath, crossed axes in the middle ring; THE QUESTS OF across the centre.',function(P,q,p){
    var R=1.95; P.w(0.55).ci(0,0,R+0.62).ci(0,0,R-0.55); axes(P,0,0,2.6,0.75); erase(q,function(){ q.fillRect(-1.25,-0.24,2.5,0.48); }); T(q,p,'THE QUESTS OF',0.3,0,0);
    erase(q,function(){ q.beginPath(); q.arc(0,0,R+0.52,PI*1.12,PI*1.88); q.arc(0,0,R-0.45,PI*1.88,PI*1.12,true); q.fill(); q.beginPath(); q.arc(0,0,R+0.52,PI*0.12,PI*0.88); q.arc(0,0,R-0.45,PI*0.88,PI*0.12,true); q.fill(); });
    T(q,p,'ZELDARA',0.9,0,-R,{arc:R}); T(q,p,'ZELDOR',0.9,0,R+0.06,{arc:-R});
    [0,PI].forEach(function(a){ P.fc(Math.cos(a)*R,Math.sin(a)*R,0.12); P.w(0.5).triq(Math.cos(a)*(R+0.02),0.02,0.22); }); });
  // 7 ── Staggered: the girl's name high and left, the boy's low and right, an axe each
  Q('qz_stagger','Staggered','ZELDARA high on the left, ZELDOR low on the right, each led by its Ringed Z with a single axe; AND between them; THE QUESTS OF above the first.',function(P,q,p){
    var s=0.78, za=-3.05, zo=-0.85; caption(P,q,p,'THE QUESTS OF',za+2.4,-2.4,0.4,1.0);
    P.axe(za,-1.05,2.7,-0.55,true); name(P,q,p,'ELDARA',za,-1.05,s,{axes:false,rule:true}); P.axe(zo,1.15,2.7,0.55); name(P,q,p,'ELDOR',zo,1.15,s,{axes:false,rule:true}); T(q,p,'AND',0.3,za+0.4,0.62); });
  // 8 ── Knot Frame: the names inside a braided frame, axes at the corners
  Q('qz_knot','Knot Frame','The names inside a braided knot frame, crossed axes at its two upper corners; THE QUESTS OF breaks the top of the frame.',function(P,q,p){
    var x0=-3.9, x1=3.9, y0=-1.65, y1=1.95; [[x0,y0],[x1,y0]].forEach(function(c){ axes(P,c[0],c[1],1.7,0.75); });
    var cw=W(q,p,'THE QUESTS OF',0.4)+0.6; [[x0,y0,-cw/2,y0],[cw/2,y0,x1,y0],[x1,y0,x1,y1],[x1,y1,x0,y1],[x0,y1,x0,y0]].forEach(function(s){ P.w(0.4).rail(ZBrand.seg(s[0],s[1],s[2],s[3]),-0.11).rail(ZBrand.seg(s[0],s[1],s[2],s[3]),0.11); P.w(0.75).braid(ZBrand.seg(s[0],s[1],s[2],s[3]),Math.max(4,Math.round(Math.hypot(s[2]-s[0],s[3]-s[1])*2.2)),0.07); });
    erase(q,function(){ [[x0,y0],[x1,y0]].forEach(function(c){ q.beginPath(); q.arc(c[0],c[1],0.32,0,PI*2); q.fill(); }); }); [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach(function(c){ P.w(0.6).ci(c[0],c[1],0.26); P.fc(c[0],c[1],0.08); });
    T(q,p,'THE QUESTS OF',0.4,0,y0); T(q,p,'ZELDARA',1.0,0,-0.6); T(q,p,'AND',0.26,0,0.38); T(q,p,'ZELDOR',1.0,0,1.25); });
  // 9 ── Runestone: the names carved in a standing stone, a rune band down its edge, axes crossed above
  Q('qz_stone','Runestone','The names carved into the face of a standing runestone, a rune band along its edge and two axes crossed over its crown.',function(P,q,p){
    var w=3.7, top=-1.5, bot=2.3; axes(P,0,top-0.3,1.9,0.7); erase(q,function(){ q.beginPath(); q.moveTo(-w,bot); q.lineTo(-w,top+0.9); q.quadraticCurveTo(-w,top-0.05,0,top-0.15); q.quadraticCurveTo(w,top-0.05,w,top+0.9); q.lineTo(w,bot); q.closePath(); q.fill(); });
    var edge=function(o){ q.beginPath(); q.moveTo(-w+o,bot); q.lineTo(-w+o,top+0.9); q.quadraticCurveTo(-w+o,top-0.05+o,0,top-0.15+o); q.quadraticCurveTo(w-o,top-0.05+o,w-o,top+0.9); q.lineTo(w-o,bot); q.stroke(); };
    P.w(0.7); edge(0); P.w(0.45); edge(0.42); P.w(0.5); for(var i=0;i<8;i++){ P.rune(-w+0.21,top+1.1+i*0.36,0.22,i*3+2); P.rune(w-0.21,top+1.1+i*0.36,0.22,i*3+5); }
    P.w(0.6).ln([-w,bot,w,bot]); T(q,p,'THE QUESTS OF',0.36,0,-0.85); T(q,p,'ZELDARA',0.92,0,0.0); T(q,p,'AND',0.24,0,0.8); T(q,p,'ZELDOR',0.92,0,1.58); });
  // 10 ── Dragon Prows: each name between two dragon-headed prows, like a longship
  Q('qz_prow','Longship','Each name rides a longship hull with dragon-headed prows; crossed axes stand between the two ships; THE QUESTS OF above.',function(P,q,p){
    var sz=1.0, wa=W(q,p,'ZELDARA',sz), wo=W(q,p,'ZELDOR',sz), hull=function(y,w){ P.w(0.7).qd([-w/2-0.6,y-0.55,-w/2-0.2,y+0.35,0,y+0.38,w/2+0.2,y+0.35,w/2+0.6,y-0.55]); P.w(0.45).qd([-w/2-0.3,y-0.1,0,y+0.62,w/2+0.3,y-0.1]); P.dragon(w/2+0.6,y-0.75,0.42,-0.5); P.dragon(-w/2-0.6,y-0.75,0.42,0.5,true); };
    caption(P,q,p,'THE QUESTS OF',0,-2.55,0.38,1.4); hull(-1.05,wa); hull(1.7,wo); axes(P,-1.1,0.32,1.05,0.8); axes(P,1.1,0.32,1.05,0.8); T(q,p,'AND',0.26,0,0.3);
    front(q,p,'ZELDARA',sz,0,-1.48); front(q,p,'ZELDOR',sz,0,1.27); });

  ZBrand.WORDMARK='qz_shared';      // round 54: Kris picked One Great Z (Lab → "The new name")
  // the title page: a tall wordmark (three lines) gets the room it needs — the logo smaller and higher, the name a little higher
  var home1=ZBrand.home;
  ZBrand.home=function(c,cfg,W,H,t,o){ o=o||{}; var WD=ZBrand.wordById(o.word||(cfg.gen>=3?(ZBrand.WORDMARK||'ring_z'):'twin_axes')); if(!WD.tall||!(cfg.gen>=2))return home1(c,cfg,W,H,t,o);
    var cfg2=Object.assign({},cfg,{ly:0.16,sr:0.085}); var sw=ZBrand.word, nar=W/(H/20)<16;
    ZBrand.word=function(ctx,id,cx,cy,Hh,tt,al){ ZBrand.word=sw; return sw(ctx,id,cx,H*(nar?0.46:0.475),Math.min(H*0.062,W/11),tt,al); };
    try{ return home1(c,cfg2,W,H,t,o); } finally { ZBrand.word=sw; } };
  // the story line under the buttons
  ZBrand.TAGLINE=['Four realms, one land. Free the bound spirits, break the Forges of Muspelheim,','and bring Runeheim\'s dead home to the light.'];
})();
