// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-brand6.js — round 70b: A BETTER FONT FOR ZELDARA (the Lab's Fonts tab, 79b-lab-zfonts.js).
// ║ Kris: "we still need to get a better font for zeldara, including for the intro screen … create a variety of ~12 different updated
// ║ zeldara and zeldor intro panels with a variety of different fonts inspired by the attached … create entire alphabets … propose places
// ║ for the font to be used throughout the game. It's also OK to have 2 fonts, 1 which is an elaborate version of the other" — then:
// ║ "let's do 12 sets of fonts to choose from".
// ║ Twelve typefaces (SIL Open Font License), each in two versions in his One Great Z (answer F1): PLAIN — the face alone in the gilded gold;
// ║ ELABORATE — the same face with its style's flourishes and its own colour (F2). The ringed Z over crossed axes stays only on the Norse
// ║ sets, the uncials and the blackletters (F3). The faces load in the Lab only (52c-lab-fonts-r70.js); the game gets the one he picks.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZBrand==='undefined'||!ZBrand.text||!ZBrand.WORDS)return;
  var PI=Math.PI, G=ZBrand.GOLD;
  var COPPER=['#ffd6b8','#dc7a40','#7a3416'], RUBY=['#ffb4a8','#e2442f','#781410'], IVORY=['#ffffff','#f3e9d4','#b29d76'], ROSE=['#ffc4d6','#f2557f','#86163e'],
      PERI=['#dcdeff','#8389ff','#2c3090'], CREAM=['#fffdf6','#f6ebd6','#c4ab84'], TEAL='#63f2dc', SAPH='#5b8cff', CORAL='#ff8a5c', RED='#d8342a';
  // the twelve sets: id, name, family, weight, case of the names, Norse (ring + axes), the style of its flourishes, the elaborate colour,
  // the elaborate face (if not the same), what it was drawn from, what it is good for
  var S=ZBrand.FONTSETS=[
    {id:'uncial',name:'Runeheim Uncial',fam:'Uncial Antiqua',wt:'400',lc:true,norse:true,orn:'uncial',gc:COPPER,tr:0.06,small:false,
      insp:'the Celtic uncial with thick-and-thin strokes and the broad-pen alphabet in copper ink',
      idea:'Round Celtic uncials, one case. Elaborate: the letters in copper ink, long hairline pen tails off the Z and the last letters, diamond dots, the ringed Z over the axes.'},
    {id:'eagle',name:'Scribe\'s Hand',fam:'Eagle Lake',wt:'400',lc:true,norse:true,orn:'uncial',zc:RUBY,tr:0.02,small:false,
      insp:'the broad-pen copper alphabet and the pointed "Viking" uncial',
      idea:'A calligrapher\'s broad pen, slanted and lively. Elaborate: the great Z rubricated in red like a manuscript initial, red pen-dots round its ring, hairline tails.'},
    {id:'macondo',name:'Skald Swash',fam:'Macondo',wt:'400',famE:'Macondo Swash Caps',lc:true,lcE:false,norse:true,orn:'uncial',ring:TEAL,tr:0.04,small:true,
      insp:'the pointed "Viking" uncial with its diamond dots',
      idea:'A friendly uncial-flavoured hand that stays readable small. Elaborate: its swash capitals (ELDARA in curling caps), the Z\'s ring in soul-line teal.'},
    {id:'italiana',name:'Soulful Deco',fam:'Italiana',wt:'400',lc:false,orn:'deco',gc:IVORY,tr:0.16,small:true,
      insp:'the thin high-contrast deco capitals with small ornaments (the soulful font)',
      idea:'Tall thin deco capitals, widely spaced. Elaborate: ivory letters with the ornaments set into them — a sparkle in the D, mountains in the O, a pointer in the R, a long double rule from the L, a hairline beside the last R.'},
    {id:'poiret',name:'Northern Line',fam:'Poiret One',wt:'400',lc:false,orn:'deco',oc:TEAL,tr:0.14,small:true,
      insp:'the thin deco capitals with small ornaments',
      idea:'Geometric hairline capitals — the lightest of the twelve. Elaborate: the same ornaments in glowing teal, like soul-light caught in the letters.'},
    {id:'playfair',name:'Fjord Serif',fam:'Playfair Display',wt:'400',lc:true,orn:'curl',bc:SAPH,tr:0.03,small:true,
      insp:'the high-contrast serif with curled swashes and ball ends',
      idea:'A high-contrast book serif with ball ends. Elaborate: a curling swash from the Z\'s crown, a long tapering stroke under eldor, a curl off the last a — sapphire balls at their ends.'},
    {id:'cormorant',name:'Saga Garamond',fam:'Cormorant Garamond',wt:'500',lc:true,orn:'curl',gc:IVORY,tr:0.03,small:true,
      insp:'the high-contrast serif with curled swashes',
      idea:'A light, elegant old-style serif — reads like a printed saga. Elaborate: ivory letters with gold curls and swashes.'},
    {id:'yeseva',name:'Midsummer Loops',fam:'Yeseva One',wt:'400',lc:true,orn:'loop',gc:CREAM,tr:0.02,small:false,
      insp:'the heavy display serif with big looping swashes',
      idea:'A bold display serif with quirky curves. Elaborate: cream letters, big looping swashes off the Z, the last a and under eldor, in gold.'},
    {id:'abril',name:'Hall Banner',fam:'Abril Fatface',wt:'400',lc:true,orn:'loop',lc2:CORAL,tr:0.02,small:false,
      insp:'the heavy didone with looping swashes',
      idea:'The heaviest face — a great-hall banner. Elaborate: gold letters with coral loops.'},
    {id:'caveat',name:'Dala Brush',fam:'Caveat Brush',wt:'400',lc:true,orn:'dala',gc:CREAM,tr:0.03,small:true,
      insp:'the hand-painted Swedish folk-art brush sign with its painted flower',
      idea:'Hand-painted brush letters, warm and homely. Elaborate: cream letters on a red painted brush stroke, with dala-painted flowers (blue petals, red hearts, green leaves).'},
    {id:'grenze',name:'Rose Gothic',fam:'Grenze Gotisch',wt:'600',lc:true,norse:true,orn:'black',gc:ROSE,tr:0.03,small:false,
      insp:'the decorated blackletter with dotted strokes and curled hairlines',
      idea:'A readable blackletter. Elaborate: rose-red letters with dots set into every thick stroke, hairline curls, the ringed Z over the axes in gold.'},
    {id:'cook',name:'Winter Gothic',fam:'UnifrakturCook',wt:'700',lc:true,norse:true,orn:'black',gc:PERI,tr:0.03,small:false,
      insp:'the decorated blackletter in blue with dotted strokes',
      idea:'A heavy, old blackletter. Elaborate: winter-blue letters dotted through, hairline curls, the ringed Z in gold.'}];
  ZBrand.FZ=[];
  // coloured letters: a gradient like the gold one (ZBrand.glyph) in the colour set on the pass (p.gc)
  var g0=ZBrand.glyph; ZBrand.glyph=function(q,p,ch,x,y){ if(p.gc&&!(p[1]>1.05)&&!(p[1]<0.5)){ var g=q.createLinearGradient(0,y-72,0,y+4); g.addColorStop(0,p.gc[0]); g.addColorStop(0.45,p.gc[1]); g.addColorStop(1,p.gc[2]); q.fillStyle=g; q.fillText(ch,x,y); return; } return g0(q,p,ch,x,y); };
  var CP=function(p,gc){ if(!gc)return p; var a=p.slice(); a.gc=gc; return a; };
  var main=function(p){ return !(p[1]>1.05)&&!(p[1]<0.5); };
  var erase=function(q,f){ q.save(); q.globalCompositeOperation='destination-out'; f(); q.restore(); };
  // a filled shape in the pass: outlined in the dark passes, coloured in the main one, a faint line in the highlight
  var shape=function(q,p,path,col){ q.save(); q.beginPath(); path(); if(p[1]>1.05){ q.lineWidth=0.15*(p[1]-1); q.lineJoin='round'; q.stroke(); q.fill(); } else if(p[1]<0.5){ q.globalAlpha=0.45; q.lineWidth=0.012; q.stroke(); } else { if(col)q.fillStyle=col; q.fill(); } q.restore(); };
  // a pen stroke of varying width along points [[x,y]…], width w(u)
  var rib=function(q,p,pts,w,col){ var n=pts.length, L=[], R=[]; for(var i=0;i<n;i++){ var a=pts[Math.max(0,i-1)], b=pts[Math.min(n-1,i+1)], dx=b[0]-a[0], dy=b[1]-a[1], l=Math.hypot(dx,dy)||1, h=w(i/(n-1))/2; L.push([pts[i][0]-dy/l*h,pts[i][1]+dx/l*h]); R.push([pts[i][0]+dy/l*h,pts[i][1]-dx/l*h]); }
    shape(q,p,function(){ q.moveTo(L[0][0],L[0][1]); for(var i=1;i<n;i++)q.lineTo(L[i][0],L[i][1]); for(i=n-1;i>=0;i--)q.lineTo(R[i][0],R[i][1]); q.closePath(); },col); };
  var ball=function(q,p,x,y,r,col){ shape(q,p,function(){ q.arc(x,y,r,0,PI*2); },col); };
  // cubic Bézier chain [x0,y0, c1x,c1y,c2x,c2y,x1,y1, …] → points
  var bz=function(a,n){ n=n||24; var out=[[a[0],a[1]]]; for(var i=2;i+5<a.length;i+=6){ var x0=out[out.length-1][0], y0=out[out.length-1][1]; for(var k=1;k<=n;k++){ var t=k/n, u=1-t; out.push([u*u*u*x0+3*u*u*t*a[i]+3*u*t*t*a[i+2]+t*t*t*a[i+4],u*u*u*y0+3*u*u*t*a[i+1]+3*u*t*t*a[i+3]+t*t*t*a[i+5]]); } } return out; };
  // a spiral that carries on from the end of pts, turning dir (+1 clockwise), shrinking to a ball
  var spiral=function(pts,r0,turns,dir){ var e=pts[pts.length-1], f=pts[pts.length-2], ta=Math.atan2(e[1]-f[1],e[0]-f[0]), ca=ta-dir*PI/2, cx=e[0]+Math.cos(ca)*r0, cy=e[1]+Math.sin(ca)*r0, a0=ca+PI, n=Math.round(40*turns);
    for(var i=1;i<=n;i++){ var t=i/n, a=a0+dir*t*turns*PI*2, r=r0*(1-0.72*t); pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]); } return pts; };
  var swell=function(w0,wm,w1){ return function(u){ return w0+(w1-w0)*u+wm*Math.pow(Math.sin(PI*u),0.8); }; };
  var curl=function(q,p,pts,wm,col,bcol){ rib(q,p,pts,swell(0.012,wm,0.03),col); var e=pts[pts.length-1]; ball(q,p,e[0],e[1],wm*0.62,bcol||col); };
  var dia=function(q,p,x,y,r,col){ shape(q,p,function(){ q.moveTo(x,y-r); q.lineTo(x+r*0.7,y); q.lineTo(x,y+r); q.lineTo(x-r*0.7,y); q.closePath(); },col); };
  var star4=function(q,p,x,y,r,col){ shape(q,p,function(){ for(var i=0;i<8;i++){ var a=i/8*PI*2-PI/2, rr=i%2?r*0.2:r; q[i?'lineTo':'moveTo'](x+Math.cos(a)*rr,y+Math.sin(a)*rr); } q.closePath(); },col); };
  var tear=function(q,p,x,y,a,L,w,col){ var tx=x+Math.cos(a)*L, ty=y+Math.sin(a)*L, nx=-Math.sin(a)*w, ny=Math.cos(a)*w, mx=x+Math.cos(a)*L*0.55, my=y+Math.sin(a)*L*0.55;
    shape(q,p,function(){ q.moveTo(x,y); q.quadraticCurveTo(mx+nx,my+ny,tx,ty); q.quadraticCurveTo(mx-nx,my-ny,x,y); q.closePath(); },col); };
  // punch dots into the thick strokes of what draw() paints (the blackletter's dotted strokes): the dark pass below shows through
  var dots=function(q,draw,gap,r){ var c=q.canvas, M=q.getTransform(), k=Math.hypot(M.a,M.b), cv=ZBrand.mk(c.width,c.height), t=cv.getContext('2d'); t.setTransform(M); draw(t);
    var W=c.width, H=c.height, d=t.getImageData(0,0,W,H).data, g=Math.max(3,gap*k), rr=Math.max(0.9,r*k), ch=rr*1.15+0.5, at=function(x,y){ x=x|0; y=y|0; return x>=0&&y>=0&&x<W&&y<H&&d[(y*W+x)*4+3]>140; };
    q.save(); q.setTransform(1,0,0,1,0,0); q.globalCompositeOperation='destination-out'; q.beginPath();
    for(var y=g/2,row=0;y<H;y+=g*0.87,row++)for(var x=(row%2)*g/2;x<W;x+=g){ if(!at(x,y))continue; var ok=true; for(var a=0;a<8&&ok;a++)if(!at(x+Math.cos(a*PI/4)*ch,y+Math.sin(a*PI/4)*ch))ok=false; if(ok){ q.moveTo(x+rr,y); q.arc(x,y,rr,0,PI*2); } }
    q.fill(); q.restore(); };

  // ── One Great Z in a set's face ─────────────────────────────────────────────
  var build=function(D,E){ var fam=E&&D.famE||D.fam, F='"'+fam+'",Georgia,serif', wt=D.wt, lc=E&&D.lcE!==undefined?D.lcE:D.lc;
    var T=function(q,p,s,sz,x,y){ return ZBrand.text(q,p,s,F,wt,sz,D.tr*sz,x,y,{norm:true}); };
    var Wx=function(q,s,sz){ return ZBrand.text(q,[0,1,0,0],s,F,wt,sz,D.tr*sz,0,0,{norm:true,dry:true}).w; };
    var front=function(q,p,s,sz,x,y){ var pe=p.slice(); pe[1]=Math.max(p[1],1.5); erase(q,function(){ T(q,pe,s,sz,x,y); }); return T(q,p,s,sz,x,y); };
    var t1=lc?'eldara':'ELDARA', t2=lc?'eldor':'ELDOR', qo=lc?'The Quests of':'THE QUESTS OF', an=lc?'and':'AND';
    return function(P,q,p){ var s=1.35, sz=1.0, wa=Wx(q,t1,sz), wo=Wx(q,t2,sz), zs=D.norse?1.7*s:3.25, wz=Wx(q,'Z',zs), zx, x0, L;
      if(D.norse){ zx=0; x0=zx+1.35; L=zx-2.25; } else { zx=0; x0=zx+wz/2+0.1; L=zx-wz/2; }
      var R=x0+Math.max(wa,wo), dx=-(L+R)/2+(E&&D.orn==='dala'?-0.35:0); q.save(); q.translate(dx,0);
      var pl=E?CP(p,D.gc):p, y1=-0.78, y2=0.92, A, O;
      // behind: the dala's red brush stroke under the names
      if(E&&D.orn==='dala'){ rib(q,p,bz([x0-0.5,1.58,x0+0.8,1.38,x0+2.4,1.62,x0+Math.max(wa,wo)+0.6,1.36]),swell(0.05,0.2,0.02),RED); }
      // the great Z
      if(D.norse){ P.axe(zx,0,2.9*s,-0.7,true); P.axe(zx,0,2.9*s,0.7); erase(q,function(){ q.beginPath(); q.arc(zx,0,1.2*s,0,PI*2); q.fill(); });
        var zp=E&&D.zc?CP(p,D.zc):pl; T(q,zp,'Z',1.7*s,zx,0);
        q.save(); if(E&&D.ring&&main(p))q.strokeStyle=D.ring; P.w(0.45).ci(zx,0,0.9*s).ci(zx,0,1.14*s); q.translate(zx,0); P.w(0.8).braid(ZBrand.ring(1.02*s),22,0.065*s); q.restore();
        if(E&&D.zc){ for(var i=0;i<28;i++){ var a=i/28*PI*2; ball(q,p,zx+Math.cos(a)*1.3*s,Math.sin(a)*1.3*s,0.035,D.zc[1]); } } }
      else T(q,pl,'Z',zs,zx,0.07);
      A=front(q,pl,t1,sz,x0+wa/2,y1); O=front(q,pl,t2,sz,x0+wo/2,y2); A.x0=x0+wa/2-A.w/2; O.x0=x0+wo/2-O.w/2;
      if(E&&D.orn==='black'&&main(p))dots(q,function(t){ T(t,[0,1,0,0],t1,sz,x0+wa/2,y1); T(t,[0,1,0,0],t2,sz,x0+wo/2,y2); if(!D.norse)T(t,[0,1,0,0],'Z',zs,zx,0.07); },0.1,0.03);
      // THE QUESTS OF, small over the first name, ruled to its end; AND between the rules
      var qs=0.34, qw=Wx(q,qo,qs), qx=x0+0.1; T(q,p,qo,qs,qx+qw/2,-1.62); P.w(0.45).ln([qx+qw+0.22,-1.62,x0+wa,-1.62]); P.fc(x0+wa+0.08,-1.62,0.05);
      P.w(0.6).ln([x0,-0.12,x0+wa,-0.12]).ln([x0,0.24,x0+wa,0.24]); T(q,p,an,0.26,x0+wa*0.5,0.06);
      if(E)ORN[D.orn](P,q,p,D,{zx:zx,zs:zs,wz:wz,x0:x0,wa:wa,wo:wo,A:A,O:O,y1:y1,y2:y2,s:s,lc:lc});
      q.restore(); }; };
  // ── the flourishes of each style (elaborate only) ──────────────────────────
  var lx=function(M,i){ return M.xs[i]+M.ws[i]/2; };
  var ORN={
    uncial:function(P,q,p,D,o){ var c=D.zc?D.zc[1]:G, ea=o.x0+o.wa, eo=o.x0+o.wo;
      // long hairline pen tails: off the Z's foot to the left, off the end of each name
      rib(q,p,bz([o.zx-0.5,1.05,o.zx-1.2,1.35,o.zx-2.0,1.25,o.zx-2.6,0.95]),swell(0.07,0,0.004),c);
      rib(q,p,bz([ea-0.05,-0.45,ea+0.35,-0.35,ea+0.8,-0.55,ea+1.15,-0.95]),swell(0.06,0,0.004),c);
      rib(q,p,bz([eo-0.05,1.25,eo+0.45,1.42,eo+1.0,1.32,eo+1.35,1.0]),swell(0.06,0,0.004),c);
      [[o.x0-0.18,-0.12],[o.x0+o.wa+0.18,-0.12],[o.x0-0.18,0.24],[o.x0+o.wa+0.18,0.24]].forEach(function(d){ dia(q,p,d[0],d[1],0.07,c); });
      for(var i=0;i<3;i++)dia(q,p,o.x0+o.wa*0.5+(i-1)*0.22,-1.98,0.05+(i===1?0.03:0),c); },
    deco:function(P,q,p,D,o){ var c=D.oc||G, A=o.A, O=o.O, y1=o.y1, y2=o.y2;
      star4(q,p,lx(A,2),y1+0.02,0.17,c);                                        // a sparkle in the D
      var mx=lx(O,3), my=y2+0.06; q.save(); if(main(p))q.strokeStyle=c; P.w(0.5).ln([mx-0.2,my+0.07,mx-0.09,my-0.06,mx-0.01,my+0.03,mx+0.08,my-0.07,mx+0.2,my+0.07]); q.restore();   // mountains in the O
      var rx=O.xs[4]+O.ws[4]*0.36, ry=y2-0.17; shape(q,p,function(){ q.moveTo(rx-0.04,ry-0.06); q.lineTo(rx+0.07,ry); q.lineTo(rx-0.04,ry+0.06); q.closePath(); },c);   // a pointer in the R
      q.save(); if(main(p))q.strokeStyle=c; var lf=A.xs[1]+0.03; P.w(0.45).ln([lf,y1+0.44,A.xs[3]+A.ws[3],y1+0.44]).ln([lf+0.12,y1+0.52,A.xs[2]+A.ws[2]*0.6,y1+0.52]);   // the double rule from the L
      var ex=O.xs[4]+O.ws[4]+0.14; P.w(0.4).ln([ex,y2-0.42,ex,y2+0.62]); var ax=A.xs[5]+A.ws[5]*0.25; P.w(0.4).ln([ax,y1+0.12,ax+A.ws[5]*0.9+0.35,y1+0.12]); q.restore();
      star4(q,p,o.x0+o.wa+0.45,-1.62,0.12,c); star4(q,p,o.zx-o.wz*0.62,0.9,0.1,c); },
    curl:function(P,q,p,D,o){ var c=G, bc=D.bc||G, A=o.A, O=o.O, ea=A.xs[A.xs.length-1]+A.ws[A.ws.length-1], eo=O.x0+O.w, zt=0.07-o.zs*0.35, zl=o.zx-o.wz*0.45;
      curl(q,p,spiral(bz([zl+0.25,zt+0.04,zl-0.25,zt-0.35,zl-0.9,zt-0.2,zl-1.0,zt+0.35]),0.32,1.1,-1),0.09,c,bc);      // from the Z's crown, curling back
      curl(q,p,spiral(bz([ea-0.12,o.y1+0.3,ea+0.3,o.y1+0.4,ea+0.65,o.y1+0.1,ea+0.6,o.y1-0.35]),0.2,1.0,-1),0.07,c,bc);  // off the last a
      var zb=o.zx+o.wz*0.4; rib(q,p,bz([zb,1.24,zb+0.8,1.5,eo-0.6,1.48,eo+0.5,1.3]),swell(0.08,0.02,0.006),c); ball(q,p,eo+0.52,1.29,0.03,bc); },  // a long stroke under eldor
    loop:function(P,q,p,D,o){ var c=D.lc2||G, A=o.A, O=o.O, lxx=lx(A,1), top=o.y1-0.38, ea=A.xs[A.xs.length-1]+A.ws[A.ws.length-1], zl=o.zx-o.wz*0.35, zt=0.07-o.zs*0.35;
      var eo=O.x0+O.w; curl(q,p,bz([eo-0.15,o.y2+0.3,eo+0.5,o.y2+0.55,eo+0.3,o.y2+1.15,eo-0.3,o.y2+0.85,eo-0.6,o.y2+0.6,eo-0.2,o.y2+0.4,eo-1.6,o.y2+0.62]),0.09,c);   // a loop down from the end of eldor, running back under it
      curl(q,p,bz([ea-0.1,o.y1+0.32,ea+0.6,o.y1+0.45,ea+0.75,o.y1-0.35,ea+0.3,o.y1-0.25,ea-0.05,o.y1-0.15,ea+0.5,o.y1-0.9,ea+1.0,o.y1-0.85]),0.1,c);   // and off the last a
      curl(q,p,bz([zl+0.1,zt+0.05,zl-0.5,zt-0.3,zl-0.4,zt+0.6,zl-0.9,zt+0.4,zl-1.3,zt+0.2,zl-1.1,zt-0.4,zl-0.7,zt-0.5]),0.1,c); },   // and from the Z
    dala:function(P,q,p,D,o){ var fx=o.x0+o.wa+0.75, fy=-1.05, k=0.85;
      var flower=function(x,y,s,a){ [-0.6,0.6].forEach(function(d){ tear(q,p,x,y,a+PI/2+d*1.6,0.75*s,0.22*s,'#3f9a4a'); });
        for(var i=0;i<5;i++)tear(q,p,x,y,a-PI/2+(i-2)*0.55,0.62*s,0.2*s,'#4fa8e8');
        if(main(p)){ q.save(); q.strokeStyle='#183a6a'; q.lineWidth=0.02*s; for(i=0;i<5;i++){ var b=a-PI/2+(i-2)*0.55; q.beginPath(); q.moveTo(x+Math.cos(b)*0.12*s,y+Math.sin(b)*0.12*s); q.lineTo(x+Math.cos(b)*0.45*s,y+Math.sin(b)*0.45*s); q.stroke(); } q.restore(); }
        ball(q,p,x,y-0.02*s,0.17*s,'#e8b030'); ball(q,p,x,y-0.02*s,0.1*s,RED); };
      flower(fx,fy,k,0.2); flower(o.zx-o.wz*0.55,1.25,0.6,-0.5); tear(q,p,fx-0.5,fy+0.35,PI*0.9,0.55,0.12,'#3f9a4a'); tear(q,p,fx+0.45,fy+0.4,0.1,0.5,0.12,'#3f9a4a');
      [[o.x0+o.wa*0.3,-1.95],[o.x0+o.wa*0.62,-1.98]].forEach(function(d){ ball(q,p,d[0],d[1],0.06,RED); }); },
    black:function(P,q,p,D,o){ var A=o.A, ea=A.x0+A.w, eo=o.O.x0+o.O.w;
      curl(q,p,spiral(bz([ea+0.05,o.y1+0.2,ea+0.35,o.y1+0.1,ea+0.5,o.y1-0.3,ea+0.35,o.y1-0.55]),0.13,1.2,-1),0.035,G);
      curl(q,p,spiral(bz([eo+0.05,o.y2+0.25,eo+0.4,o.y2+0.35,eo+0.6,o.y2,eo+0.45,o.y2-0.3]),0.13,1.2,-1),0.035,G);
      curl(q,p,spiral(bz([o.x0-0.05,-1.62,o.x0-0.3,-1.75,o.x0-0.55,-1.6,o.x0-0.5,-1.4]),0.09,1.1,1),0.03,G);
      for(var i=0;i<5;i++)dia(q,p,o.x0+o.wa*(0.1+i*0.2),0.06,0.04,G); } };
  // the 24 wordmarks: fz_<set>_p (plain) and fz_<set>_e (elaborate)
  S.forEach(function(D){ [false,true].forEach(function(E){ var id='fz_'+D.id+(E?'_e':'_p');
    ZBrand.WORDS.push({id:id,name:D.name+(E?' · elaborate':' · plain'),col:G,style:'gilded',gen:4,kind:'custom',fam:E&&D.famE||D.fam,wt:D.wt,tall:true,set:D.id,elab:E,desc:D.idea,paint:build(D,E)}); ZBrand.FZ.push(id); }); });
  // an alphabet in a set's face, through the gilded passes (the elaborate one coloured, the blackletter dotted) — for the Lab
  ZBrand.fontAlphabet=function(D,E,H,rows){ var fam=E&&D.famE||D.fam, F='"'+fam+'",Georgia,serif', w=Math.ceil(H*15), h=Math.ceil(H*(rows.length*1.25+0.6));
    return ZBrand.passes(w,h,'gilded',G,function(q){ q.translate(w/2,H*0.95); q.scale(H,H); },function(P,q,p){ var pl=E?CP(p,D.gc||(D.zc)):p;
      rows.forEach(function(r,i){ ZBrand.text(q,pl,r,F,D.wt,1,D.tr+0.06,0,i*1.25,{norm:true}); });
      if(E&&D.orn==='black'&&main(p))dots(q,function(t){ rows.forEach(function(r,i){ ZBrand.text(t,[0,1,0,0],r,F,D.wt,1,D.tr+0.06,0,i*1.25,{norm:true}); }); },0.1,0.03); }); };
})();
