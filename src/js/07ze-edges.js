// ═══════════════════════════════════════════════════════════════════════
// ║ 07ze-edges.js — ZEdge: where two kinds of ground meet (round 38). Shared by the Lab and the game.
// ║ Kris (Oct 7): "some of the worst visuals are when terrain transitions from one to another, i.e. at lake edges,
// ║ beaches, mountain edges … come up with ideas … turn some of these into options within the lab to choose from".
// ║ This file draws six small test places (lake, beach, mountain edge, marsh, lava, snow line) in five edge styles,
// ║ with the same kind of field the game paints (a noise-warped grid of samples, 05c-world-paint.js):
// ║   today    the game's rules as they are: a one-sample dark line, a two-sample foam band, a flat cliff face
// ║   ink      a clean even outline like the painted sprites, on a finer field (every new style also ROUNDS the outline first)
// ║   feather  no line: the two grounds mix in a stippled band; water fades in and out softly
// ║   layers   bands by distance: foam, shallows, wet sand, a bank lip on the far shore, tall cliff faces with shadow
// ║   dress    layers + small pieces placed along the edge (tufts, reeds, pebbles, boulders) — drawn in code here;
// ║            in the game they would be painted pieces from an edge sheet
// ║ Nothing in the game uses this yet. The Lab's "Terrain edges" tab shows the cards (lab/src/js/56-lab-edges.js).
// ═══════════════════════════════════════════════════════════════════════
var ZEdge={ TW:16, TH:9, cache:{},
  STYLES:[
    {id:'today',  name:'Today',            desc:'How the game draws it now: a thin dark line where two grounds meet, a narrow pale band at the water, a flat face under cliffs. The steps in the line are what you see as rough edges.'},
    {id:'ink',    name:'Clean ink line',   desc:'The same idea, done properly: the outline is rounded first so the tile-sized steps go, then drawn as an even, slightly thicker dark line with a light inner edge, like the outlines of the painted sprites. The cheapest change.'},
    {id:'feather',name:'Feathered blend',  desc:'No outline at all. Grass, sand, mud and rock mix into each other in a stippled band, and water fades from shallow to deep. Soft and natural; reads less like a map.'},
    {id:'layers', name:'Layered shores',   desc:'Edges drawn in bands by distance: foam, pale shallows and darker depths in the water; wet sand; a dark bank lip on the far shore so lakes sit below the land; taller cliff faces with strata, a lit top edge and a shadow at the foot.'},
    {id:'dress',  name:'Layered + pieces', desc:'The layered shores, plus small pieces set along every edge: grass tufts leaning over, reeds and lily pads, pebbles and shells, boulders at the foot of cliffs. Drawn in code here — in the game these would be painted pieces from one edge sheet.'}],
  SCENES:[
    {id:'lake', name:'Lake shore',    sub:'water against grass, and a path across the meadow'},
    {id:'beach',name:'Beach',         sub:'grass, sand and the sea'},
    {id:'cliff',name:'Mountain edge', sub:'cliff, scree and highland grass'},
    {id:'marsh',name:'Marsh',         sub:'mud, shallows, deep pools and grass islands'},
    {id:'lava', name:'Lava',          sub:'ash, cooled crust and a lava stream'},
    {id:'snow', name:'Snow line',     sub:'snow against rock and grass, with a path'}],
  // kinds: a/b colour pair, liq = liquid, wall = stands up (has a face), shore = pale colour at its edge
  K:[ {n:'grass', a:'#5f9a48',b:'#74b058'}, {n:'sand',a:'#d4c28c',b:'#e4d4a2'}, {n:'sea',a:'#0f3764',b:'#16487c',liq:1,shore:'#d8eef4'}, {n:'lake',a:'#1d5878',b:'#2a6f92',liq:1,shore:'#d8f0e8'},
      {n:'shallow',a:'#3a6c66',b:'#4a7e76',liq:1,shore:'#b8dcc8'}, {n:'mud',a:'#5a4a34',b:'#6a583e'}, {n:'scree',a:'#7c7468',b:'#8c8478'}, {n:'cliff',a:'#9a8e7e',b:'#84786a',wall:1,face:'#6a5e50',face2:'#3a3028'},
      {n:'snow',a:'#e2eaf0',b:'#f4f8fb'}, {n:'crust',a:'#2c211e',b:'#3c2a24'}, {n:'lava',a:'#e0541a',b:'#ffb030',liq:1,shore:'#fff0a0',hot:1}, {n:'ash',a:'#4a4240',b:'#5c5452'},
      {n:'path',a:'#b89a6a',b:'#c8ac7c'}, {n:'highgrass',a:'#8a9a62',b:'#9aaa70'}, {n:'deep',a:'#15454a',b:'#1f5a5e',liq:1,shore:'#9cc8b8'} ],
  _prep:function(){ if(ZEdge._ok)return; ZEdge._ok=true; ZEdge.K.forEach(function(k){ k._a=hexToRgb(k.a); k._b=hexToRgb(k.b); if(k.shore)k._s=hexToRgb(k.shore); if(k.face){ k._f=hexToRgb(k.face); k._f2=hexToRgb(k.face2); } }); },
  // which kind is at tile-space point (x,y) of a scene (before the warp)
  kindAt:function(id,x,y,N){ var n=N(x*0.5,y*0.5)-0.5, n2=N(x*1.3+9,y*1.3+4)-0.5, e, d;
    if(id==='lake'){ e=Math.pow((x-8.2)/4.7,2)+Math.pow((y-4.0)/2.5,2)+n*0.5; if(e<1)return 3; if(Math.abs(y-(7.6+Math.sin(x*0.5)*0.35))<0.42)return 12; return 0; }
    if(id==='beach'){ d=x*0.62+y*0.9+n*1.6; if(d>13.2)return 2; if(d>10.4)return 1; return 0; }
    if(id==='cliff'){ d=y+n*1.5+Math.sin(x*0.7)*0.5; if(d<3.1)return 7; if(Math.pow((x-11.6)/1.5,2)+Math.pow((y-6.2)/0.9,2)+n2<0.9)return 7; if(d<4.5)return 6; return 13; }
    if(id==='marsh'){ e=N(x*0.33+3,y*0.33+7)+n2*0.25; if(e<0.33)return 14; if(e<0.47)return 4; if(e<0.62)return 5; return 0; }
    if(id==='lava'){ d=Math.abs(y-(4.4+Math.sin(x*0.55)*1.9+n*0.8)); if(d<0.75)return 10; if(d<1.7)return 9; return 11; }
    if(id==='snow'){ d=x*0.5+y*1.0+n*2.0; if(d<4.6)return 8; if(Math.pow((x-12.2)/1.9,2)+Math.pow((y-2.2)/1.1,2)+n2<0.9)return 7; if(Math.abs(x-(6.5+y*0.55))<0.45&&d>=4.6)return 12; if(d<6.0)return 6; return 13; }
    return 0; },
  _hash:function(x,y,s){ var n=(x*374761393+y*668265263+(s||0)*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0)/4294967296; },
  // the field: kinds per sample, distance (in samples) to the nearest other kind and which kind that is
  // round=true: the outline is rounded first (each sample takes the kind most common around it), which removes the tile-sized steps
  field:function(scene,S,round){ var key=scene+'_'+S+(round?'r':''); if(ZEdge.cache[key])return ZEdge.cache[key]; ZEdge._prep();
    var TW=ZEdge.TW, TH=ZEdge.TH, SW=TW*S, SH=TH*S, kb=new Uint8Array(SW*SH), N=vnoise(4100+scene.length*7+scene.charCodeAt(0)), W1=vnoise(1301), W2=vnoise(1306), K=ZEdge.K, x, y, i;
    for(y=0;y<SH;y++)for(x=0;x<SW;x++){ var fx=(x+0.5)/S, fy=(y+0.5)/S, ku=ZEdge.kindAt(scene,Math.floor(fx)+0.5,Math.floor(fy)+0.5,N);
      var dwx=(W1(fx*0.55,fy*0.55)-0.5)*1.25+(W2(fx*1.9,fy*1.9)-0.5)*0.32, dwy=(W1(fx*0.55+40,fy*0.55+40)-0.5)*1.25+(W2(fx*1.9+17,fy*1.9+17)-0.5)*0.32, wall=K[ku].wall;
      var kw=ZEdge.kindAt(scene,Math.floor(fx+dwx*(wall?0.45:1))+0.5,Math.floor(fy+dwy*(wall?0.45:1))+0.5,N); if(K[kw].wall&&!wall)kw=ZEdge.kindAt(scene,Math.floor(fx+dwx*0.45)+0.5,Math.floor(fy+dwy*0.45)+0.5,N); kb[y*SW+x]=kw; }
    if(round){ var cnt=new Uint16Array(16), R=Math.round(S*0.22); for(var pass=0;pass<2;pass++){ var src=kb.slice(); for(y=0;y<SH;y++)for(x=0;x<SW;x++){ cnt.fill(0); var best=src[y*SW+x], bn=0; for(var yy=y-R;yy<=y+R;yy++){ if(yy<0||yy>=SH)continue; for(var xx=x-R;xx<=x+R;xx++){ if(xx<0||xx>=SW)continue; var kq=src[yy*SW+xx], cn=++cnt[kq]; if(cn>bn){ bn=cn; best=kq; } } } kb[y*SW+x]=best; } } }
    var d=new Float32Array(SW*SH), ek=new Uint8Array(SW*SH), INF=99; for(i=0;i<d.length;i++)d[i]=INF;
    for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; var k=kb[i]; if(x>0&&kb[i-1]!==k){ d[i]=1; ek[i]=kb[i-1]; } else if(x<SW-1&&kb[i+1]!==k){ d[i]=1; ek[i]=kb[i+1]; } else if(y>0&&kb[i-SW]!==k){ d[i]=1; ek[i]=kb[i-SW]; } else if(y<SH-1&&kb[i+SW]!==k){ d[i]=1; ek[i]=kb[i+SW]; } }
    var rel=function(i,j,c){ if(kb[j]===kb[i]&&d[j]+c<d[i]){ d[i]=d[j]+c; ek[i]=ek[j]; } };
    for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; if(x>0)rel(i,i-1,1); if(y>0)rel(i,i-SW,1); if(x>0&&y>0)rel(i,i-SW-1,1.41); if(x<SW-1&&y>0)rel(i,i-SW+1,1.41); }
    for(y=SH-1;y>=0;y--)for(x=SW-1;x>=0;x--){ i=y*SW+x; if(x<SW-1)rel(i,i+1,1); if(y<SH-1)rel(i,i+SW,1); if(x<SW-1&&y<SH-1)rel(i,i+SW+1,1.41); if(x>0&&y<SH-1)rel(i,i+SW-1,1.41); }
    return (ZEdge.cache[key]={S:S,SW:SW,SH:SH,kb:kb,d:d,ek:ek,N:N,C:vnoise(1302),V:vnoise(1303)}); },
  // one picture: scene × style at W×H
  render:function(scene,style,W,H){ var key='r_'+scene+'_'+style+'_'+W+'x'+H; if(ZEdge.cache[key])return ZEdge.cache[key];
    var S=style==='today'?12:16, F=ZEdge.field(scene,S,style!=='today'), SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, K=ZEdge.K, u=S/16, cv=document.createElement('canvas'); cv.width=SW; cv.height=SH; var c=cv.getContext('2d'), im=c.createImageData(SW,SH), px=im.data;
    var lay=style==='layers'||style==='dress', FH=Math.round(S*(lay?1.25:0.75)), x, y;
    var liqBelow=function(x,y){ for(var q=1;q<=Math.round(5*u);q++){ var yy=y+q; if(yy>=SH)return false; if(K[kb[yy*SW+x]].liq)return true; } return false; };
    for(y=0;y<SH;y++)for(x=0;x<SW;x++){ var i=y*SW+x, ki=kb[i], k=K[ki], fx=(x+0.5)/S, fy=(y+0.5)/S, t=F.C(fx*0.22,fy*0.22)*1.15-0.05; t=t<0?0:t>1?1:t;
      var r=k._a[0]+(k._b[0]-k._a[0])*t, g=k._a[1]+(k._b[1]-k._a[1])*t, b=k._a[2]+(k._b[2]-k._a[2])*t, f=1+(F.V(fx*0.9,fy*0.9)-0.5)*0.12, d=D[i]/u, e=K[EK[i]], near=D[i]<90, m, q;
      // ── things that stand up: the face under a cliff, and the shadow at its foot ──
      var isFace=false;
      if(k.wall){ for(q=1;q<=FH;q++){ var yb=y+q; if(yb>=SH)break; if(!K[kb[yb*SW+x]].wall){ var tf=1-q/FH; r=k._f[0]+(k._f2[0]-k._f[0])*tf; g=k._f[1]+(k._f2[1]-k._f[1])*tf; b=k._f[2]+(k._f2[2]-k._f[2])*tf; isFace=true;
            if(lay){ var st=(Math.floor(y/u/3.2+F.V(fx*0.4,7)*2.2))%3===0, crack=F.V(fx*5.5,fy*0.5)>0.8; if(st){ r*=0.8; g*=0.8; b*=0.8; } if(crack){ r*=0.72; g*=0.72; b*=0.72; } if(q>=FH-1){ r*=1.28; g*=1.26; b*=1.2; } }
            else { if((Math.floor(fy*S)+(fx*0.7|0))%5===0){ r*=0.8; g*=0.8; b*=0.8; } if(q===FH){ r*=1.18; g*=1.18; b*=1.18; } } break; } }
        if(!isFace){ var rl=F.V(fx*0.6,fy*0.6)-F.V(fx*0.6+0.3,fy*0.6+0.3); f*=1+rl*1.1; if(lay&&near&&d<2.2&&!e.wall)f*=1.16; } }
      else { var shN=lay?8:3; for(q=1;q<=Math.round(shN*u);q++){ var ya=y-q; if(ya<0)break; if(K[kb[ya*SW+x]].wall){ var sh=lay?0.5+0.5*(q/(shN*u)):0.62+q/u*0.1; r*=sh; g*=sh; b*=sh; break; } } }
      // ── the edge itself ──
      if(near&&!isFace){
        if(style==='today'){
          if(k.liq&&!e.liq&&D[i]<=2){ m=D[i]<=1?0.7:0.35; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; }
          else if(!k.liq&&e.liq&&D[i]<=3)f*=0.72+0.09*D[i];
          else if(D[i]<=1&&!(k.wall&&e.wall))f*=0.64; }
        else if(style==='ink'){
          if(k.liq&&!e.liq){ if(d<1.6)f*=0.5; else if(d<2.6)f*=0.82; else if(d<4.6){ m=0.5; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; } }
          else if(d<1.6)f*=0.52; else if(d<2.6)f*=0.84; else if(!k.liq&&e.liq&&d<5)f*=0.9; }
        else if(style==='feather'){
          if(k.liq&&!e.liq){ m=Math.max(0,1-d/8); m=m*m*0.6; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; }
          else if(!k.liq&&e.liq){ m=Math.max(0,1-d/6); f*=1-0.28*m; }
          else if(!k.liq&&!e.liq&&!k.wall&&!e.wall){ m=0.5-(d-1)/11; if(m>0&&(F.V(fx*3.1,fy*3.1)*0.7+ZEdge._hash(x,y,3)*0.3)<m*1.25){ var tt=t; r=e._a[0]+(e._b[0]-e._a[0])*tt; g=e._a[1]+(e._b[1]-e._a[1])*tt; b=e._a[2]+(e._b[2]-e._a[2])*tt; } } }
        else {      // layers, dress
          if(k.liq&&!e.liq){ var gap=F.V(fx*2.6,fy*2.6)<0.22;
            if(k.hot){ if(d<2.2){ m=0.85; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; } else if(d<5){ m=0.35*(1-(d-2.2)/2.8); r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; } }
            else if(d<1.7&&!gap){ r+=(255-r)*0.86; g+=(255-g)*0.88; b+=(255-b)*0.9; }
            else if(d<5){ m=0.5-(d-1.7)*0.07; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; }
            else if(d<11){ m=0.22*(1-(d-5)/6); r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; }
            if(!k.hot&&d>=5)f*=0.94+Math.min(0.06,(d-5)*0.01); }
          else if(!k.liq&&e.liq){
            if(e.hot){ if(d<5){ m=1-d/5; f*=0.72+0.28*(1-m); r+=(255-r)*0.22*m; g+=(120-g)*0.1*m; } }
            else if(liqBelow(x,y)&&d<4.2&&k.n!=='sand'){ m=d/4.2; r=74+(52-74)*(1-m); g=58+(40-58)*(1-m); b=38+(26-38)*(1-m); if(d>3.2){ r*=1.25; g*=1.25; b*=1.2; } f=1; }      // the bank: a dark lip of earth on the far shore
            else if(d<6){ m=1-d/6; f*=1-0.2*m; if(k.n==='sand'){ r*=1-0.06*m; g*=1-0.04*m; if(d>4.8&&d<5.8){ r*=1.08; g*=1.08; b*=1.1; } } } }
          else if(!k.wall&&!e.wall){ if(d<1.4)f*=0.86; m=0.3-(d-1)/9; if(m>0&&(F.V(fx*3.1,fy*3.1)*0.7+ZEdge._hash(x,y,3)*0.3)<m){ r=e._a[0]+(e._b[0]-e._a[0])*t; g=e._a[1]+(e._b[1]-e._a[1])*t; b=e._a[2]+(e._b[2]-e._a[2])*t; } }
          else if(!k.wall&&e.wall&&d<1.4)f*=0.8; } }
      var o=i*4; r*=f; g*=f; b*=f; px[o]=r>255?255:r; px[o+1]=g>255?255:g; px[o+2]=b>255?255:b; px[o+3]=255; }
    c.putImageData(im,0,0);
    var out=document.createElement('canvas'); out.width=W; out.height=H; var oc=out.getContext('2d'); oc.imageSmoothingEnabled=true; oc.imageSmoothingQuality='high'; oc.drawImage(cv,0,0,W,H);
    if(style==='dress')ZEdge._dress(oc,F,W/SW,scene);
    return (ZEdge.cache[key]=out); },
  // small pieces along the edges (stand-ins for painted pieces), drawn back to front
  _dress:function(c,F,z,scene){ var SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, K=ZEdge.K, L=[], x, y;
    for(y=1;y<SH-1;y++)for(x=1;x<SW-1;x++){ var i=y*SW+x; if(D[i]>90)continue; var k=K[kb[i]], e=K[EK[i]], h=ZEdge._hash(x,y,11), d=D[i];
      if((k.n==='grass'||k.n==='highgrass')&&!e.wall&&d<=2&&h<(e.liq||e.n==='sand'?0.06:0.022))L.push([y,x,'tuft',h]);
      else if((k.n==='lake'||k.n==='shallow')&&!e.liq&&d>=2&&d<=4&&h<0.02)L.push([y,x,'reed',h]);
      else if((k.n==='shallow'||k.n==='deep')&&d>=4&&d<=9&&h<0.006)L.push([y,x,'lily',h]);
      else if((k.n==='sand'||k.n==='mud'||k.n==='scree')&&e.liq&&d>=2&&d<=6&&h<0.022)L.push([y,x,'pebble',h]);
      else if(k.n==='sand'&&e.n==='sea'&&d>=3&&d<=5&&h>0.992)L.push([y,x,'shell',h]);
      else if(!k.wall&&!k.liq&&d<=3&&h<0.03&&y>1&&K[kb[(y-2)*SW+x]].wall)L.push([y,x,'boulder',h]);
      else if(k.n==='scree'&&d<=2&&h<0.012)L.push([y,x,'boulder',h*0.5]);
      else if(k.n==='snow'&&!e.wall&&d<=1&&h<0.06)L.push([y,x,'drift',h]);
      else if((k.n==='crust'||k.n==='ash')&&e.hot&&d<=3&&h<0.03)L.push([y,x,'ember',h]);
      else if(k.n==='ash'&&e.n==='crust'&&d<=2&&h<0.03)L.push([y,x,'shard',h]); }
    L.sort(function(a,b){ return a[0]-b[0]; }); var ink='#1c1610';
    L.forEach(function(p){ var X=p[1]*z, Y=p[0]*z, h=p[3], r1=ZEdge._hash(p[1],p[0],5), s=z/3; c.save(); c.translate(X,Y); c.lineJoin='round'; c.lineCap='round';
      if(p[2]==='tuft'){ var n=3+Math.floor(r1*3), col=scene==='cliff'||scene==='snow'?['#6f8048','#9fb070']:['#3f7a34','#7fc060']; for(var j=0;j<n;j++){ var a=(-0.9+j/(n-1)*1.8)+(r1-0.5)*0.4, len=(7+r1*6)*s; c.strokeStyle=ink; c.lineWidth=3.2*s; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(Math.sin(a)*len*0.4,-len*0.6,Math.sin(a)*len,-Math.cos(a)*len); c.stroke(); c.strokeStyle=col[j%2]; c.lineWidth=1.7*s; c.stroke(); } }
      else if(p[2]==='reed'){ for(var j2=0;j2<4;j2++){ var ox=(j2-1.5)*2.4*s, ln=(12+((r1*7+j2*3)%7))*s; c.strokeStyle=ink; c.lineWidth=2.6*s; c.beginPath(); c.moveTo(ox,0); c.lineTo(ox+(j2-1.5)*0.8*s,-ln); c.stroke(); c.strokeStyle='#5f8a3a'; c.lineWidth=1.3*s; c.stroke(); if(j2%2===0){ c.fillStyle=ink; c.beginPath(); c.ellipse(ox+(j2-1.5)*0.8*s,-ln,1.9*s,3.6*s,0,0,6.3); c.fill(); c.fillStyle='#7a4a24'; c.beginPath(); c.ellipse(ox+(j2-1.5)*0.8*s,-ln,1.1*s,2.8*s,0,0,6.3); c.fill(); } } }
      else if(p[2]==='lily'){ var R=(4.5+r1*3)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,R+1.2*s,(R+1.2*s)*0.6,0,0.35,6.0); c.lineTo(0,0); c.fill(); c.fillStyle='#4f9a48'; c.beginPath(); c.ellipse(0,0,R,R*0.6,0,0.35,6.0); c.lineTo(0,0); c.fill(); if(r1>0.6){ c.fillStyle='#f4d0e0'; c.beginPath(); c.arc(R*0.2,-R*0.2,1.8*s,0,6.3); c.fill(); } }
      else if(p[2]==='pebble'||p[2]==='shell'){ var pr=(1.6+r1*2.2)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,pr+0.9*s,(pr+0.9*s)*0.7,0,0,6.3); c.fill(); c.fillStyle=p[2]==='shell'?'#f4e0d0':['#8a8478','#a8a090','#6e685e'][Math.floor(r1*3)]; c.beginPath(); c.ellipse(0,0,pr,pr*0.7,0,0,6.3); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-pr*0.3,-pr*0.25,pr*0.35,pr*0.2,0,0,6.3); c.fill(); }
      else if(p[2]==='boulder'){ var br=(4+h*160)*s; if(br>9*s)br=9*s; c.fillStyle='rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(1*s,br*0.5,br*1.1,br*0.4,0,0,6.3); c.fill(); c.fillStyle=ink; c.beginPath(); c.moveTo(-br-1,br*0.4); c.lineTo(-br*0.7,-br*0.7-1); c.lineTo(br*0.3,-br-1); c.lineTo(br+1,-br*0.2); c.lineTo(br*0.8,br*0.5+1); c.closePath(); c.fill();
        c.fillStyle=scene==='lava'?'#4a403c':'#8a7e6e'; c.beginPath(); c.moveTo(-br+1,br*0.3); c.lineTo(-br*0.6,-br*0.6); c.lineTo(br*0.25,-br+1); c.lineTo(br-1,-br*0.15); c.lineTo(br*0.7,br*0.4); c.closePath(); c.fill(); c.fillStyle='rgba(255,255,255,.28)'; c.beginPath(); c.moveTo(-br*0.5,-br*0.5); c.lineTo(br*0.2,-br*0.85); c.lineTo(br*0.1,-br*0.3); c.closePath(); c.fill(); }
      else if(p[2]==='drift'){ c.fillStyle='rgba(255,255,255,.95)'; c.beginPath(); c.ellipse(0,0,(5+r1*5)*s,(2.5+r1*2)*s,(r1-0.5),0,6.3); c.fill(); c.fillStyle='rgba(150,180,210,.35)'; c.beginPath(); c.ellipse(1*s,1.5*s,(4+r1*4)*s,(1.2+r1)*s,(r1-0.5),0,3.2); c.fill(); }
      else if(p[2]==='ember'){ c.fillStyle='rgba(255,170,60,.9)'; c.beginPath(); c.arc(0,0,(0.9+r1*1.3)*s,0,6.3); c.fill(); c.fillStyle='rgba(255,120,30,.25)'; c.beginPath(); c.arc(0,0,(3+r1*3)*s,0,6.3); c.fill(); }
      else if(p[2]==='shard'){ c.fillStyle=ink; c.beginPath(); c.moveTo(-4*s,1*s); c.lineTo(0,-3.5*s); c.lineTo(4.5*s,0.5*s); c.lineTo(1*s,2.5*s); c.closePath(); c.fill(); c.fillStyle='#3a2c28'; c.beginPath(); c.moveTo(-2.8*s,0.6*s); c.lineTo(0,-2.4*s); c.lineTo(3.2*s,0.4*s); c.lineTo(0.8*s,1.6*s); c.closePath(); c.fill(); }
      c.restore(); }); }
};
