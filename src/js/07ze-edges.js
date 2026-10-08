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
  // where the close-up looks: the window (fw × fh, as shares of the picture) with the most edge in it
  focus:function(scene,fw,fh){ var key='f_'+scene; if(ZEdge.cache[key])return ZEdge.cache[key]; var F=ZEdge.field(scene,16,true), w=Math.round(F.SW*fw), h=Math.round(F.SH*fh), best=[0.3,0.3], bn=-1;
    for(var y=4;y+h<F.SH-4;y+=6)for(var x=4;x+w<F.SW-4;x+=6){ var n=0, kinds={}; for(var yy=y;yy<y+h;yy+=2)for(var xx=x;xx<x+w;xx+=2){ var i=yy*F.SW+xx; if(F.d[i]<=1.5)n++; kinds[F.kb[i]]=1; } n*=1+0.35*(Object.keys(kinds).length-1); if(n>bn){ bn=n; best=[x/F.SW,y/F.SH]; } }
    return (ZEdge.cache[key]=best); },
  // one picture: scene × style at W×H
  // o: {noPieces:true} leave the pieces off (the moving cards draw them every frame, swaying) · {grain:true} fine sand grains
  render:function(scene,style,W,H,o){ o=o||{}; var key='r_'+scene+'_'+style+'_'+W+'x'+H+(o.noPieces?'_np':'')+(o.grain?'_gr':''); if(ZEdge.cache[key])return ZEdge.cache[key];
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
        else if(style==='ink'||style==='inkdress'){
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
    if(o.grain){ var Z=W/SW, oi=oc.getImageData(0,0,W,H), op=oi.data; for(var yy=0;yy<H;yy++)for(var xx=0;xx<W;xx++){ var si=Math.min(SH-1,Math.floor(yy/Z))*SW+Math.min(SW-1,Math.floor(xx/Z)); if(K[kb[si]].n!=='sand')continue;
        var hh=ZEdge._hash(xx,yy,21), gq=(hh-0.5)*16, oo=(yy*W+xx)*4; if(hh>0.985)gq=-34; else if(hh<0.012)gq=26; op[oo]+=gq; op[oo+1]+=gq*0.92; op[oo+2]+=gq*0.8; } oc.putImageData(oi,0,0); }      // fine sand grains (Kris: "more granular sand")
    if((style==='dress'||style==='inkdress')&&!o.noPieces)ZEdge._dress(oc,F,W/SW,scene);
    return (ZEdge.cache[key]=out); },
  // small pieces along the edges (stand-ins for painted pieces), drawn back to front
  _dress:function(c,F,z,scene,tm){ var SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, K=ZEdge.K, L=F._dl, x, y, mv=tm!==undefined;
    if(!L){ L=F._dl=[];
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
    L.sort(function(a,b){ return a[0]-b[0]; }); } var ink='#1c1610';
    L.forEach(function(p){ var X=p[1]*z, Y=p[0]*z, h=p[3], r1=ZEdge._hash(p[1],p[0],5), s=z/3; c.save(); c.translate(X,Y); c.lineJoin='round'; c.lineCap='round';
      if(mv){ if(p[2]==='tuft'||p[2]==='reed')c.rotate(Math.sin(tm*(p[2]==='reed'?1.1:1.7)+r1*20+p[1]*0.05)*(p[2]==='reed'?0.09:0.14)); else if(p[2]==='lily')c.translate(0,Math.sin(tm*1.3+r1*30)*1.2*s); }      // the pieces sway and bob
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

// ═══ Round 39 — moving ground. Kris (Oct 8): "i still don't like how these look. An old zeldara version had moving
// ═══ backgrounds, with flowing lava and lapping water and waves … Use my selections and this suggestion to come up
// ═══ with 5 more options per each terrain interface type."
// His picks: lake and beach — the clean ink line WITH the pieces ("use the clean line, but add in the images"), the
// beach with finer sand; mountain edge, marsh, lava and snow line — layered + pieces. Every moving card starts from
// that pick and adds one kind of movement. The old version (quests-of-zeldara-v3, WorldScene.renderTileAnimations)
// drew a shimmer line drifting across each water tile, a warm pulse on lava and two swaying grass blades per tile;
// the "Old Zeldara" card of each place redraws that on top of the pick, for comparison.
// ZEdge.frame(c, place, moveId, t, W, H, cv) draws one frame: the still picture (cached), a moving layer worked out
// on the sample field (lapping, waves, ripples, flow), moving pieces drawn over it (particles), then the pieces.
ZEdge.BASE={lake:'inkdress',beach:'inkdress',cliff:'dress',marsh:'dress',lava:'dress',snow:'dress'};
ZEdge.MOVE={
  lake:[{id:'m1',name:'Lapping shore',      fx:['lap'],                 desc:'Your pick, and the water breathes: a foam line creeps up the shore and draws back, leaving the bank darker for a moment. Reeds and tufts sway.'},
        {id:'m2',name:'Shimmering ripples', fx:['ripple','sparkle'],    desc:'Light ripples run across the whole lake and the sun glints on them. The shore stays still and clean.'},
        {id:'m3',name:'Sky in the water',   fx:['lap','sky'],           desc:'Gentle lapping, and slow cloud reflections drift over the water — the lake mirrors the sky.'},
        {id:'m4',name:'Rain rings',         fx:['rings','lap'],         desc:'Drops or fish break the surface: rings open and fade all over the lake, with soft lapping at the edge.'},
        {id:'m5',name:'Old Zeldara shimmer',fx:['retro'],               desc:'What the old version did, on top of your pick: a thin bright line drifting across each water tile and grass blades swaying.'}],
  beach:[{id:'m1',name:'Rolling waves',     fx:['waves'],               desc:'Wave crests roll in from the open sea and break into foam on the sand, one after another.'},
        {id:'m2',name:'Lapping tide',       fx:['lap'],                 desc:'Calmer water: the foam runs up the beach and slides back, leaving wet sand that dries.'},
        {id:'m3',name:'Sunlit sea',         fx:['waves','ripple','sparkle'], desc:'Rolling waves with light glinting on the sea between them.'},
        {id:'m4',name:'Surf and spray',     fx:['waves','spray'],       desc:'Stronger surf: the breaking waves throw up white spray along the beach.'},
        {id:'m5',name:'Old Zeldara shimmer',fx:['retro'],               desc:'What the old version did, on top of your pick: a drifting bright line per water tile.'}],
  marsh:[{id:'m1',name:'Bubbling bog',      fx:['lap','bubbles'],       desc:'Soft lapping round the mud banks and bubbles rising and popping in the pools.'},
        {id:'m2',name:'Rain on the marsh',  fx:['rings','ripple'],      desc:'Rings open all over the pools and the water ripples; lily pads bob.'},
        {id:'m3',name:'Drifting fog',       fx:['fog','lap'],           desc:'Low fog drifts slowly over the marsh, thinning and thickening.'},
        {id:'m4',name:'Fireflies at dusk',  fx:['dusk','fireflies','ripple'], desc:'The light drops a little and fireflies wander over the water and reeds.'},
        {id:'m5',name:'Old Zeldara shimmer',fx:['retro'],               desc:'What the old version did, on top of your pick: drifting shimmer lines on the water, swaying grass.'}],
  lava:[{id:'m1',name:'Flowing crust',      fx:['flow'],                desc:'The lava moves: dark plates of crust drift downstream with bright seams between them.'},
        {id:'m2',name:'Molten river',       fx:['flow','glow'],         desc:'Bright streaks race along the stream and the banks glow and fade with it.'},
        {id:'m3',name:'Bubbling pool',      fx:['lavabubbles','glow'],  desc:'Thick bubbles swell and burst on the lava; the crust beside it glows.'},
        {id:'m4',name:'Embers rising',      fx:['flow','embers'],       desc:'Flowing lava with sparks and embers lifting off it into the air.'},
        {id:'m5',name:'Old Zeldara pulse',  fx:['retro'],               desc:'What the old version did, on top of your pick: a slow warm pulse over each lava tile.'}],
  cliff:[{id:'m1',name:'Cloud shadows',     fx:['clouds'],              desc:'Shadows of clouds sweep slowly over the mountain, cliff and grass alike.'},
        {id:'m2',name:'Falling stones',     fx:['pebbles','windgrass'], desc:'Now and then a stone drops down the cliff face and puffs dust at the foot; the grass moves in the wind.'},
        {id:'m3',name:'Mist at the foot',   fx:['mist'],                desc:'A soft mist breathes along the foot of the cliffs.'},
        {id:'m4',name:'Wind in the grass',  fx:['windgrass','clouds'],  desc:'Waves of wind run through the highland grass under passing cloud shadows.'},
        {id:'m5',name:'Old Zeldara sway',   fx:['retro'],               desc:'What the old version did, on top of your pick: two grass blades swaying in every grass tile.'}],
  snow:[{id:'m1',name:'Falling snow',       fx:['snow'],                desc:'Snow falls over everything, near flakes faster than far ones.'},
        {id:'m2',name:'Blowing snow',       fx:['spindrift'],           desc:'Gusts lift snow off the drifts and blow it across the edge onto the rock and grass.'},
        {id:'m3',name:'Glittering snow',    fx:['glitter'],             desc:'The snowfield glitters in the sun; the edge stays still.'},
        {id:'m4',name:'Mountain weather',   fx:['snow','clouds','windgrass'], desc:'Light snow, cloud shadows and wind in the grass below the snow line.'},
        {id:'m5',name:'Old Zeldara sway',   fx:['retro'],               desc:'What the old version did, on top of your pick: swaying grass blades.'}]
};
// sample lists per place, worked out once
ZEdge._prepMove=function(scene){ var F=ZEdge.field(scene,16,true); if(F._mv)return F; var K=ZEdge.K, SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, M={wat:[],lav:[],wet:[],sno:[],grs:[],nearLav:[],wallTop:[],wallFoot:[]};
  for(var y=0;y<SH;y++)for(var x=0;x<SW;x++){ var i=y*SW+x, k=K[kb[i]], e=K[EK[i]], d=D[i];
    if(k.liq&&!k.hot)M.wat.push(i); else if(k.hot)M.lav.push(i);
    else { if(d<12&&e.liq&&!e.hot)M.wet.push(i); if(d<10&&e.hot)M.nearLav.push(i); if(k.n==='snow')M.sno.push(i); if(k.n==='grass'||k.n==='highgrass')M.grs.push(i);
      if(k.wall&&y<SH-1&&!K[kb[i+SW]].wall)M.wallFoot.push(i); if(k.wall&&y>0&&!K[kb[i-SW]].wall)M.wallTop.push(i); } }
  // how far each water sample is from the nearest land (its own distance field: D is to the nearest OTHER kind, which may be other water)
  var wd=new Float32Array(SW*SH); for(i=0;i<wd.length;i++)wd[i]=99; var isW=function(j){ return K[kb[j]].liq; };
  for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; if(!isW(i))continue; if((x>0&&!isW(i-1))||(x<SW-1&&!isW(i+1))||(y>0&&!isW(i-SW))||(y<SH-1&&!isW(i+SW)))wd[i]=1; }
  var rl=function(i,j,c){ if(isW(i)&&wd[j]+c<wd[i])wd[i]=wd[j]+c; };
  for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; if(x>0)rl(i,i-1,1); if(y>0)rl(i,i-SW,1); if(x>0&&y>0)rl(i,i-SW-1,1.41); if(x<SW-1&&y>0)rl(i,i-SW+1,1.41); }
  for(y=SH-1;y>=0;y--)for(x=SW-1;x>=0;x--){ i=y*SW+x; if(x<SW-1)rl(i,i+1,1); if(y<SH-1)rl(i,i+SW,1); if(x<SW-1&&y<SH-1)rl(i,i+SW+1,1.41); if(x>0&&y<SH-1)rl(i,i+SW-1,1.41); }
  M.wd=wd; F._mv=M; return F; };
// one frame of a moving card
ZEdge.frame=function(c,scene,mid,t,W,H,cv){ var B=ZEdge.BASE[scene], MV=(ZEdge.MOVE[scene]||[]).find(function(m){ return m.id===mid; }); if(!MV)return; var fx={}; MV.fx.forEach(function(f){ fx[f]=1; });
  var base=ZEdge.render(scene,B,W,H,{noPieces:true,grain:scene==='beach'}); c.imageSmoothingEnabled=true; c.drawImage(base,0,0,W,H);
  var F=ZEdge._prepMove(scene), M=F._mv, SW=F.SW, SH=F.SH, z=W/SW, N=F.N, V=F.V, K=ZEdge.K, kb=F.kb, D=F.d, h=ZEdge._hash, i, n, x, y;
  // ── the moving layer, worked out per sample ──
  var ov=cv._zov; if(!ov||ov.width!==SW){ ov=cv._zov=document.createElement('canvas'); ov.width=SW; ov.height=SH; ov._c=ov.getContext('2d'); ov._im=ov._c.createImageData(SW,SH); }
  var P=ov._im.data; P.fill(0); var put=function(i,r,g,b,a){ if(a<=0)return; var o=i*4, a0=P[o+3]/255, a1=a>1?1:a, ao=a1+a0*(1-a1); if(ao<=0)return; P[o]=(r*a1+P[o]*a0*(1-a1))/ao; P[o+1]=(g*a1+P[o+1]*a0*(1-a1))/ao; P[o+2]=(b*a1+P[o+2]*a0*(1-a1))/ao; P[o+3]=ao*255; };
  if(fx.lap||fx.waves){ var wd=M.wd;
    M.wat.forEach(function(i){ var x=i%SW, y=(i/SW)|0, d=wd[i]; if(d>16)return; var ph=t*1.35+N(x*0.07,y*0.07)*6.3;
      if(fx.lap){ var reach=1.3+2.2*(0.5+0.5*Math.sin(ph)); if(d<reach){ var a=0.88*Math.pow(1-d/reach,0.45); put(i,250,253,255,a); } else if(d<reach+1.6)put(i,230,245,250,0.28*(1-(d-reach)/1.6)); }
      if(fx.waves){ var P2=9, sp=fx.spray?4.6:3.4, q=((d+t*sp+N(x*0.035,y*0.035)*3.5)%P2+P2)%P2, fade=Math.max(0,1-d/22);
          if(q<1.8){ var band=1-q/1.8, a2=band*(d<3.5?0.95:0.6*fade); put(i,d<3.5?255:215,d<3.5?255:236,d<3.5?255:248,a2); } else if(q<4)put(i,4,20,48,0.2*fade*(1-(q-1.8)/2.2));
        if(d<2.2){ var br=0.55+0.4*Math.sin(t*2.1+N(x*0.1,y*0.1)*8); put(i,255,255,255,br*0.8); } } });
    M.wet.forEach(function(i){ var x=i%SW, y=(i/SW)|0, d=D[i]; var ph=t*1.35+N(x*0.07,y*0.07)*6.3-0.9, reach=fx.waves?2.6:1.2+2.4*(0.5+0.5*Math.sin(ph)); if(d<reach)put(i,40,32,20,0.22*(1-d/reach)); }); }
  if(fx.ripple||fx.sparkle||fx.sky||fx.retro){ M.wat.forEach(function(i){ var x=i%SW, y=(i/SW)|0;
      if(fx.ripple){ var v=Math.sin(x*0.42+t*1.8+N(x*0.05,y*0.05)*5)*Math.sin(y*0.62-t*1.3+V(x*0.05,y*0.05)*5); if(v>0.78)put(i,235,250,255,(v-0.78)*1.9); }
      if(fx.sparkle&&h(x,y,Math.floor(t*4))>0.9965)put(i,255,255,255,1);
      if(fx.sky){ var cl=N((x-t*5)*0.025,(y+t*1.2)*0.04); if(cl>0.55)put(i,225,240,250,Math.min(0.32,(cl-0.55)*1.4)); }
      if(fx.retro){ var tx=(x/16)|0, ty=(y/16)|0, wv=Math.sin(t*0.8+tx*0.3+ty*0.2)*0.5+0.5, sy=ty*16+2+Math.floor(wv*12), xx=x%16; if(y===sy&&xx>=2&&xx<14)put(i,160,232,255,0.55); } }); }
  if(fx.retro){ M.lav.forEach(function(i){ var x=i%SW, y=(i/SW)|0, tx=(x/16)|0, ty=(y/16)|0, ph=h(tx,ty,4), pu=Math.sin(t*1.1+ph*6.28)*0.5+0.5; put(i,255,96,40,0.12+pu*0.25); }); }
  if(fx.flow){ M.lav.forEach(function(i){ var x=i%SW, y=(i/SW)|0, nn=N((x-t*6)*0.16,y*0.2+Math.sin(x*0.05)*0.5)*0.75+V((x-t*6)*0.4,y*0.4)*0.25;
      if(!fx.glow){ if(nn>0.62)put(i,52,24,16,Math.min(0.62,(nn-0.62)*5)); else if(nn>0.57)put(i,255,214,96,(0.62-nn<0.025?1:0.5)*0.6); }
      if(fx.glow){ var sk=N((x-t*16)*0.03,y*0.32); if(sk>0.6)put(i,255,248,190,Math.min(0.75,(sk-0.6)*4)); else if(sk<0.3)put(i,200,60,20,(0.3-sk)*1.2); } }); }
  if(fx.glow){ var gp=0.5+0.5*Math.sin(t*2.2); M.nearLav.forEach(function(i){ var x=i%SW, y=(i/SW)|0, d=D[i]; if(d>7)return; var a=(0.14+0.16*Math.sin(t*2.2+N(x*0.06,y*0.06)*6))*(1-d/7); put(i,255,120,40,a); }); M.lav.forEach(function(i){ put(i,255,220,120,0.08+0.1*gp); }); }
  if(fx.windgrass){ M.grs.forEach(function(i){ var x=i%SW, y=(i/SW)|0, w=Math.sin((x*0.6+y*0.35)*0.16-t*2.4+N(x*0.03,y*0.03)*3)*(0.55+0.45*N(x*0.05+t*0.3,y*0.05)); if(w>0.45)put(i,226,238,180,(w-0.45)*0.5); }); }
  if(fx.glitter){ M.sno.forEach(function(i){ var x=i%SW, y=(i/SW)|0, q=h(x,y,Math.floor(t*3+h(x,y,9)*3)); if(q>0.993)put(i,255,255,255,1); else if(q>0.985)put(i,200,230,255,0.6); }); }
  if(fx.clouds){ for(i=0;i<SW*SH;i+=1){ var x=i%SW, y=(i/SW)|0, cl=N((x-t*9)*0.012,(y-t*3)*0.02); if(cl>0.46)put(i,14,20,34,Math.min(0.26,(cl-0.46)*1.3)); } }
  if(fx.mist){ M.wallFoot.forEach(function(i){ var x=i%SW, y=(i/SW)|0; for(var q=-3;q<20;q++){ var yy=y+q; if(yy<0||yy>=SH)continue; var j=yy*SW+x, pt=N((x-t*5)*0.045,yy*0.09+t*0.15), a=(0.4+0.15*Math.sin(t*0.8+x*0.04))*Math.sin(Math.PI*(q+3)/23)*Math.min(1,Math.max(0,pt*1.8-0.3)); put(j,234,238,242,a); } }); }
  if(fx.fog){ for(i=0;i<SW*SH;i+=1){ var x=i%SW, y=(i/SW)|0, fg=N((x-t*4)*0.02,(y+t*0.8)*0.035)*0.7+V((x+t*2.5)*0.05,y*0.06)*0.3; if(fg>0.5)put(i,232,238,236,Math.min(0.42,(fg-0.5)*1.5)); } }
  if(fx.dusk){ for(i=0;i<SW*SH;i+=1){ var o=i*4, a0=P[o+3]/255; if(a0<0.01){ P[o]=30; P[o+1]=24; P[o+2]=60; P[o+3]=70; } } }
  ov._c.putImageData(ov._im,0,0); c.drawImage(ov,0,0,W,H);
  // ── moving pieces drawn over it ──
  var R=function(k,s){ return h(k,s||1,77); }, wat=M.wat, lav=M.lav;
  if(fx.rings&&wat.length){ for(n=0;n<18;n++){ var per=2.4+R(n,2)*1.6, cyc=Math.floor((t+R(n,3)*per)/per), u=((t+R(n,3)*per)%per)/per, j=wat[Math.floor(h(n,cyc,5)*wat.length)], X=(j%SW)*z, Y=((j/SW)|0)*z, rr=(3+u*26)*z/3;
      c.strokeStyle='rgba(235,248,255,'+(0.7*(1-u))+')'; c.lineWidth=1.3; c.beginPath(); c.ellipse(X,Y,rr,rr*0.55,0,0,6.3); c.stroke(); if(u>0.25){ c.strokeStyle='rgba(235,248,255,'+(0.45*(1-u))+')'; c.beginPath(); c.ellipse(X,Y,rr*0.55,rr*0.3,0,0,6.3); c.stroke(); } } }
  if(fx.bubbles&&wat.length){ for(n=0;n<18;n++){ var per2=1.8+R(n,4)*1.5, cy2=Math.floor((t+R(n,5)*per2)/per2), u2=((t+R(n,5)*per2)%per2)/per2, j2=wat[Math.floor(h(n,cy2,6)*wat.length)], X2=(j2%SW)*z, Y2=((j2/SW)|0)*z;
      if(u2<0.85){ var br2=(2+u2*4.5)*z/3; c.fillStyle='rgba(200,220,190,.55)'; c.beginPath(); c.arc(X2,Y2,br2,0,6.3); c.fill(); c.strokeStyle='rgba(40,50,30,.55)'; c.lineWidth=1; c.stroke(); c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.arc(X2-br2*0.35,Y2-br2*0.35,br2*0.3,0,6.3); c.fill(); }
      else { var ru=(u2-0.85)/0.15; c.strokeStyle='rgba(220,235,210,'+(0.7*(1-ru))+')'; c.beginPath(); c.ellipse(X2,Y2,(4+ru*7)*z/3,(2+ru*3.5)*z/3,0,0,6.3); c.stroke(); } } }
  if(fx.lavabubbles&&lav.length){ for(n=0;n<16;n++){ var per3=1.4+R(n,7)*1.4, cy3=Math.floor((t+R(n,8)*per3)/per3), u3=((t+R(n,8)*per3)%per3)/per3, j3=lav[Math.floor(h(n,cy3,9)*lav.length)], X3=(j3%SW)*z, Y3=((j3/SW)|0)*z;
      if(u3<0.8){ var b3=(1.5+u3*4.5)*z/3; c.fillStyle='rgba(255,170,60,.9)'; c.beginPath(); c.arc(X3,Y3,b3,0,6.3); c.fill(); c.strokeStyle='rgba(90,20,10,.8)'; c.lineWidth=1.2; c.stroke(); c.fillStyle='rgba(255,245,190,.85)'; c.beginPath(); c.arc(X3-b3*0.3,Y3-b3*0.35,b3*0.35,0,6.3); c.fill(); }
      else { var ru3=(u3-0.8)/0.2; for(var s3=0;s3<5;s3++){ var a3=s3/5*6.28; c.fillStyle='rgba(255,200,80,'+(1-ru3)+')'; c.beginPath(); c.arc(X3+Math.cos(a3)*ru3*10*z/3,Y3+Math.sin(a3)*ru3*6*z/3-ru3*4,1.6*z/3,0,6.3); c.fill(); } } } }
  if(fx.embers&&lav.length){ c.save(); c.globalCompositeOperation='lighter'; for(n=0;n<40;n++){ var per4=2.5+R(n,10)*2, u4=((t+R(n,11)*per4)%per4)/per4, cy4=Math.floor((t+R(n,11)*per4)/per4), j4=lav[Math.floor(h(n,cy4,12)*lav.length)], X4=(j4%SW)*z+Math.sin(t*3+n)*6*u4, Y4=((j4/SW)|0)*z-u4*60*z/3;
      c.fillStyle='rgba(255,'+Math.round(200-u4*120)+',60,'+(1-u4)+')'; c.beginPath(); c.arc(X4,Y4,(1.6-u4)*z/2,0,6.3); c.fill(); } c.restore(); }
  if(fx.spray&&M.wet.length){ for(n=0;n<30;n++){ var per5=1.2+R(n,13)*0.8, u5=((t+R(n,14)*per5)%per5)/per5, cy5=Math.floor((t+R(n,14)*per5)/per5), j5=M.wet[Math.floor(h(n,cy5,15)*M.wet.length)]; if(D[j5]>2)continue; var X5=(j5%SW)*z+(R(n,16)-0.5)*20*u5, Y5=((j5/SW)|0)*z-Math.sin(u5*3.14)*18*z/3;
      c.fillStyle='rgba(255,255,255,'+(0.85*(1-u5))+')'; c.beginPath(); c.arc(X5,Y5,(1.2+R(n,17)*1.4)*z/3,0,6.3); c.fill(); } }
  if(fx.fireflies){ c.save(); c.globalCompositeOperation='lighter'; for(n=0;n<18;n++){ var X6=(R(n,18)*W+Math.sin(t*0.6+n*1.7)*30+Math.sin(t*1.7+n)*8+W)%W, Y6=(R(n,19)*H+Math.cos(t*0.5+n*2.3)*24+H)%H, a6=0.5+0.5*Math.sin(t*3+n*2.1);
      var g6=c.createRadialGradient(X6,Y6,0,X6,Y6,9); g6.addColorStop(0,'rgba(255,250,150,'+(0.9*a6)+')'); g6.addColorStop(1,'rgba(255,240,100,0)'); c.fillStyle=g6; c.beginPath(); c.arc(X6,Y6,9,0,6.3); c.fill(); } c.restore(); }
  if(fx.pebbles&&M.wallTop.length){ for(n=0;n<7;n++){ var per7=3+R(n,20)*3, u7=((t+R(n,21)*per7)%per7)/per7, cy7=Math.floor((t+R(n,21)*per7)/per7), j7=M.wallFoot[Math.floor(h(n,cy7,22)*M.wallFoot.length)]; if(j7===undefined)continue;
      var X7=(j7%SW)*z, Yf=((j7/SW)|0)*z+20*z/3*1.25, Y0=Yf-24*z, fall=Math.min(1,u7*2.2), Y7=Y0+(Yf-Y0)*fall*fall;
      if(u7<0.46){ var rx=X7+Math.sin(u7*20)*1.5, pr=4*z/3; c.fillStyle='#2a221c'; c.beginPath(); c.arc(rx,Y7,pr+1.2,0,6.3); c.fill(); c.fillStyle='#8a7e6e'; c.beginPath(); c.arc(rx,Y7,pr,0,6.3); c.fill(); c.fillStyle='#b0a492'; c.beginPath(); c.arc(rx-pr*0.3,Y7-pr*0.3,pr*0.45,0,6.3); c.fill(); }
      else { var du=(u7-0.46)/0.54; c.fillStyle='rgba(205,195,175,'+(0.6*(1-du))+')'; for(var s7=0;s7<5;s7++){ c.beginPath(); c.arc(X7+(s7-2)*7*du*z,Yf-du*10+Math.abs(s7-2)*2,(4+du*8)*z/3,0,6.3); c.fill(); } } } }
  if(fx.snow||fx.spindrift){ var nS=fx.snow?(fx.clouds?70:120):0; for(n=0;n<nS;n++){ var far=n%3===0, sp8=far?18:34, X8=((R(n,23)*W+t*(far?6:12)+Math.sin(t*0.9+n)*8)%W+W)%W, Y8=((R(n,24)*H+t*sp8)%H+H)%H;
      c.fillStyle='rgba(255,255,255,'+(far?0.55:0.9)+')'; c.beginPath(); c.arc(X8,Y8,far?1.1:1.9,0,6.3); c.fill(); }
    if(fx.spindrift&&M.sno.length){ for(n=0;n<110;n++){ var gust=Math.max(0,Math.sin(t*0.7+R(n,25)*0.8)), per9=1.6+R(n,26), u9=((t+R(n,27)*per9)%per9)/per9, cy9=Math.floor((t+R(n,27)*per9)/per9), j9=M.sno[Math.floor(h(n,cy9,28)*M.sno.length)];
        var X9=(j9%SW)*z+u9*140*(0.4+gust), Y9=((j9/SW)|0)*z+u9*40-Math.sin(u9*3.14)*10, a9=Math.sin(u9*3.14)*(0.4+0.6*gust); c.strokeStyle='rgba(255,255,255,'+a9+')'; c.lineWidth=2; c.lineCap='round'; c.beginPath(); c.moveTo(X9,Y9); c.lineTo(X9-18*(0.4+gust),Y9-4); c.stroke(); } } }
  ZEdge._dress(c,F,z,scene,t);
  if(fx.retro&&M.grs.length){ c.strokeStyle='rgba(136,255,136,.35)'; c.lineWidth=1; for(var ty=0;ty<ZEdge.TH;ty++)for(var tx=0;tx<ZEdge.TW;tx++){ var ci=(ty*16+8)*SW+tx*16+8, kk=K[kb[ci]]; if(kk.n!=='grass'&&kk.n!=='highgrass')continue;
      var seed=((tx*73856093)^(ty*19349663))>>>0, ph9=(seed%1000)/1000, dx1=Math.sin(t*1.4+ph9*6.28)*1.2, dx2=Math.cos(t*1.1+ph9*4.71)*1.0, k3=W/(ZEdge.TW*32);
      c.beginPath(); c.moveTo((tx*32+8+dx1)*k3,(ty*32+12)*k3); c.lineTo((tx*32+8+dx1)*k3,(ty*32+20)*k3); c.moveTo((tx*32+22+dx2)*k3,(ty*32+14)*k3); c.lineTo((tx*32+22+dx2)*k3,(ty*32+21)*k3); c.stroke(); } }
};
