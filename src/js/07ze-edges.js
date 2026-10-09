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
  render:function(scene,style,W,H,o){ o=o||{}; var key='r_'+scene+'_'+style+'_'+W+'x'+H+(o.noPieces?'_np':'')+(o.grain?'_gr':'')+(o.blend?'_b'+o.blend:'')+(o.feat?'_f'+o.feat.join('+'):''); if(ZEdge.cache[key])return ZEdge.cache[key];
    var BL=o.blend||'', OVR=BL==='dither'||BL==='soft'||BL==='stipple', BY4=ZEdge._bayer;
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
      if(near&&!isFace&&!(OVR&&!k.wall&&!e.wall)){
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
      // ── round 40: other ways of blending one ground into the next (o.blend) ──
      if(BL&&near&&!isFace){ var BY=BY4[(y&3)*4+(x&3)]/16;
        if(OVR&&!k.wall&&!e.wall){
          if(k.liq&&!e.liq){      // the water side
            if(BL==='dither'){ if(d<1.4)m=k.hot?0.9:0.8; else { m=Math.max(0,1-(d-1.4)/6)*0.75; m=BY<m?0.55:0; } }
            else if(BL==='soft'){ m=d<1.2?0.8:Math.pow(Math.max(0,1-d/12),2)*0.75; }
            else m=d<1.4?0.75:((F.V(fx*4,fy*4)*0.6+ZEdge._hash(x,y,5)*0.4)<0.6-d/14?0.5:0);
            r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; }
          else if(!k.liq&&e.liq){      // land beside water or lava
            m=Math.max(0,1-d/7); if(BL==='dither')m=BY<m*0.9?1:0; else if(BL==='stipple')m=(F.V(fx*4,fy*4)*0.6+ZEdge._hash(x,y,7)*0.4)<m?1:0;
            if(e.hot){ f*=1-0.4*m; r+=(255-r)*0.22*m; } else f*=1-0.24*m; }
          else {      // two grounds (or two waters) meeting
            var er=e._a[0]+(e._b[0]-e._a[0])*t, eg=e._a[1]+(e._b[1]-e._a[1])*t, eb=e._a[2]+(e._b[2]-e._a[2])*t;
            if(BL==='dither'){ m=0.5-d/12; m=BY<m?1:0; } else if(BL==='soft')m=Math.max(0,0.5-d/14); else { m=0.55-d/10; m=(F.V(fx*3.6,fy*3.6)*0.65+ZEdge._hash(x,y,8)*0.35)<m?1:0; }
            if(m>0){ r+=(er-r)*m; g+=(eg-g)*m; b+=(eb-b)*m; } } }
        else if(BL==='wet'&&!k.liq&&e.liq&&!e.hot&&!k.wall){ m=Math.pow(Math.max(0,1-d/14),1.2); f*=1-0.38*m; if(k.n==='sand')r*=1-0.08*m; if(d>1.3&&d<2.3)f*=1.12; }
        else if(BL==='outline2'){ if(!k.liq&&e.liq&&!e.hot&&d>=3.2&&d<4.2)f*=0.8; else if(k.liq&&!e.liq&&!k.hot&&d>=4.6&&d<5.6){ m=0.4; r+=(k._s[0]-r)*m; g+=(k._s[1]-g)*m; b+=(k._s[2]-b)*m; } else if(!k.liq&&!e.liq&&!k.wall&&!e.wall&&d>=2.6&&d<3.4)f*=0.86; }
        else if(BL==='terrace'&&k.liq&&!e.liq&&!k.hot){ var bi=Math.floor(d/3); if(bi<5){ m=0.62*(1-bi/5); var tq=scene==='beach'?[70,190,190]:k._s; r+=(tq[0]-r)*m; g+=(tq[1]-g)*m; b+=(tq[2]-b)*m; if(bi>0&&d-bi*3<0.9)f*=1.12; } }
        else if(BL==='overhang'&&!k.liq&&!k.wall&&!e.wall){ var hiK=k.n==='grass'||k.n==='highgrass', hiE=e.n==='grass'||e.n==='highgrass'; if(hiK&&!hiE){ if(d<1.6)f*=1.22; else if(d<2.6)f*=1.08; } else if(!hiK&&hiE&&!e.liq&&d<4)f*=0.62+0.095*d; }
        else if(BL==='tint'&&!k.liq&&!k.wall){ m=Math.max(0,1-d/11);
          if(e.liq&&!e.hot){ g*=1+0.16*m; r*=1-0.12*m; b*=1-0.04*m; }
          else if(e.hot){ f*=1-0.32*m; r*=1+0.14*m; }
          else if(e.n==='snow'&&ZEdge._hash(x,y,9)<m*0.9){ r+=(222-r)*0.55; g+=(234-g)*0.55; b+=(244-b)*0.55; }
          else if(k.n==='snow'&&!e.liq){ b*=1+0.05*m; r*=1-0.05*m; } }
        else if(BL==='crackle'&&!k.liq&&k.n==='crust'&&d<9){ var cq=Math.abs(F.V(fx*3.2,fy*3.2)-0.5), w2=0.024*(1-d/9)+0.006; if(cq<w2){ m=1-d/9; r+=(255-r)*m; g+=(130-g)*m; b+=(40-b)*m*0.5; f=1; } } }
      var o4=i*4; r*=f; g*=f; b*=f; px[o4]=r>255?255:r; px[o4+1]=g>255?255:g; px[o4+2]=b>255?255:b; px[o4+3]=255; }
    c.putImageData(im,0,0);
    var out=document.createElement('canvas'); out.width=W; out.height=H; var oc=out.getContext('2d'); oc.imageSmoothingEnabled=true; oc.imageSmoothingQuality='high'; oc.drawImage(cv,0,0,W,H);
    if(o.grain){ var Z=W/SW, oi=oc.getImageData(0,0,W,H), op=oi.data; for(var yy=0;yy<H;yy++)for(var xx=0;xx<W;xx++){ var si=Math.min(SH-1,Math.floor(yy/Z))*SW+Math.min(SW-1,Math.floor(xx/Z)); if(K[kb[si]].n!=='sand')continue;
        var hh=ZEdge._hash(xx,yy,21), gq=(hh-0.5)*16, oo=(yy*W+xx)*4; if(hh>0.985)gq=-34; else if(hh<0.012)gq=26; op[oo]+=gq; op[oo+1]+=gq*0.92; op[oo+2]+=gq*0.8; } oc.putImageData(oi,0,0); }      // fine sand grains (Kris: "more granular sand")
    if(o.feat)ZEdge._feat(oc,F,W/SW,scene,o.feat);
    if((style==='dress'||style==='inkdress')&&!o.noPieces)ZEdge._dress(oc,F,W/SW,scene);
    return (ZEdge.cache[key]=out); },
  _bayer:[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],
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
    L.forEach(function(p){ ZEdge._piece(c,p[2],p[1]*z,p[0]*z,p[3],ZEdge._hash(p[1],p[0],5),z/3,scene,mv?tm:undefined,p[1]); }); },
  // one piece (round 40: shared with the game's ground painter, 05c) — ty: tuft reed lily pebble shell boulder drift ember shard; s: scale (1 = Lab card)
  _piece:function(c,ty,X,Y,h,r1,s,scene,tm,px0){ var ink='#1c1610', mv=tm!==undefined; c.save(); c.translate(X,Y); c.lineJoin='round'; c.lineCap='round';
      if(mv){ if(ty==='tuft'||ty==='reed')c.rotate(Math.sin(tm*(ty==='reed'?1.1:1.7)+r1*20+px0*0.05)*(ty==='reed'?0.09:0.14)); else if(ty==='lily')c.translate(0,Math.sin(tm*1.3+r1*30)*1.2*s); }      // the pieces sway and bob
      if(ty==='tuft'){ var n=3+Math.floor(r1*3), col=scene==='cliff'||scene==='snow'?['#6f8048','#9fb070']:['#3f7a34','#7fc060']; for(var j=0;j<n;j++){ var a=(-0.9+j/(n-1)*1.8)+(r1-0.5)*0.4, len=(7+r1*6)*s; c.strokeStyle=ink; c.lineWidth=3.2*s; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(Math.sin(a)*len*0.4,-len*0.6,Math.sin(a)*len,-Math.cos(a)*len); c.stroke(); c.strokeStyle=col[j%2]; c.lineWidth=1.7*s; c.stroke(); } }
      else if(ty==='reed'){ for(var j2=0;j2<4;j2++){ var ox=(j2-1.5)*2.4*s, ln=(12+((r1*7+j2*3)%7))*s; c.strokeStyle=ink; c.lineWidth=2.6*s; c.beginPath(); c.moveTo(ox,0); c.lineTo(ox+(j2-1.5)*0.8*s,-ln); c.stroke(); c.strokeStyle='#5f8a3a'; c.lineWidth=1.3*s; c.stroke(); if(j2%2===0){ c.fillStyle=ink; c.beginPath(); c.ellipse(ox+(j2-1.5)*0.8*s,-ln,1.9*s,3.6*s,0,0,6.3); c.fill(); c.fillStyle='#7a4a24'; c.beginPath(); c.ellipse(ox+(j2-1.5)*0.8*s,-ln,1.1*s,2.8*s,0,0,6.3); c.fill(); } } }
      else if(ty==='lily'){ var R=(4.5+r1*3)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,R+1.2*s,(R+1.2*s)*0.6,0,0.35,6.0); c.lineTo(0,0); c.fill(); c.fillStyle='#4f9a48'; c.beginPath(); c.ellipse(0,0,R,R*0.6,0,0.35,6.0); c.lineTo(0,0); c.fill(); if(r1>0.6){ c.fillStyle='#f4d0e0'; c.beginPath(); c.arc(R*0.2,-R*0.2,1.8*s,0,6.3); c.fill(); } }
      else if(ty==='pebble'||ty==='shell'){ var pr=(1.6+r1*2.2)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,pr+0.9*s,(pr+0.9*s)*0.7,0,0,6.3); c.fill(); c.fillStyle=ty==='shell'?'#f4e0d0':['#8a8478','#a8a090','#6e685e'][Math.floor(r1*3)]; c.beginPath(); c.ellipse(0,0,pr,pr*0.7,0,0,6.3); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-pr*0.3,-pr*0.25,pr*0.35,pr*0.2,0,0,6.3); c.fill(); }
      else if(ty==='boulder'){ var br=(4+h*160)*s; if(br>9*s)br=9*s; c.fillStyle='rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(1*s,br*0.5,br*1.1,br*0.4,0,0,6.3); c.fill(); c.fillStyle=ink; c.beginPath(); c.moveTo(-br-1,br*0.4); c.lineTo(-br*0.7,-br*0.7-1); c.lineTo(br*0.3,-br-1); c.lineTo(br+1,-br*0.2); c.lineTo(br*0.8,br*0.5+1); c.closePath(); c.fill();
        c.fillStyle=scene==='lava'?'#4a403c':'#8a7e6e'; c.beginPath(); c.moveTo(-br+1,br*0.3); c.lineTo(-br*0.6,-br*0.6); c.lineTo(br*0.25,-br+1); c.lineTo(br-1,-br*0.15); c.lineTo(br*0.7,br*0.4); c.closePath(); c.fill(); c.fillStyle='rgba(255,255,255,.28)'; c.beginPath(); c.moveTo(-br*0.5,-br*0.5); c.lineTo(br*0.2,-br*0.85); c.lineTo(br*0.1,-br*0.3); c.closePath(); c.fill(); }
      else if(ty==='drift'){ c.fillStyle='rgba(255,255,255,.95)'; c.beginPath(); c.ellipse(0,0,(5+r1*5)*s,(2.5+r1*2)*s,(r1-0.5),0,6.3); c.fill(); c.fillStyle='rgba(150,180,210,.35)'; c.beginPath(); c.ellipse(1*s,1.5*s,(4+r1*4)*s,(1.2+r1)*s,(r1-0.5),0,3.2); c.fill(); }
      else if(ty==='ember'){ c.fillStyle='rgba(255,170,60,.9)'; c.beginPath(); c.arc(0,0,(0.9+r1*1.3)*s,0,6.3); c.fill(); c.fillStyle='rgba(255,120,30,.25)'; c.beginPath(); c.arc(0,0,(3+r1*3)*s,0,6.3); c.fill(); }
      else if(ty==='shard'){ c.fillStyle=ink; c.beginPath(); c.moveTo(-4*s,1*s); c.lineTo(0,-3.5*s); c.lineTo(4.5*s,0.5*s); c.lineTo(1*s,2.5*s); c.closePath(); c.fill(); c.fillStyle='#3a2c28'; c.beginPath(); c.moveTo(-2.8*s,0.6*s); c.lineTo(0,-2.4*s); c.lineTo(3.2*s,0.4*s); c.lineTo(0.8*s,1.6*s); c.closePath(); c.fill(); }
      c.restore(); }
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
ZEdge._prepMove=function(scene){ var F=ZEdge.field(scene,16,true); if(F._mv)return F; var K=ZEdge.K, SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, M={wat:[],lav:[],wet:[],sno:[],grs:[],nearLav:[],wallTop:[],wallFoot:[],crust:[],hotRow:new Uint8Array(SH)};
  for(var y=0;y<SH;y++)for(var x=0;x<SW;x++){ var i=y*SW+x, k=K[kb[i]], e=K[EK[i]], d=D[i];
    if(k.liq&&!k.hot)M.wat.push(i); else if(k.hot){ M.lav.push(i); for(var hr2=Math.max(0,y-6);hr2<=Math.min(SH-1,y+3);hr2++)M.hotRow[hr2]=1; }
    else { if(d<12&&e.liq&&!e.hot)M.wet.push(i); if(d<10&&e.hot)M.nearLav.push(i); if((k.n==='crust'||k.n==='ash')&&d<12&&e.hot)M.crust.push(i); if(k.n==='snow')M.sno.push(i); if(k.n==='grass'||k.n==='highgrass')M.grs.push(i);
      if(k.wall&&y<SH-1&&!K[kb[i+SW]].wall)M.wallFoot.push(i); if(k.wall&&y>0&&!K[kb[i-SW]].wall)M.wallTop.push(i); } }
  // how far each water sample is from the nearest land (its own distance field: D is to the nearest OTHER kind, which may be other water)
  var wd=new Float32Array(SW*SH); for(i=0;i<wd.length;i++)wd[i]=99; var isW=function(j){ return K[kb[j]].liq; };
  for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; if(!isW(i))continue; if((x>0&&!isW(i-1))||(x<SW-1&&!isW(i+1))||(y>0&&!isW(i-SW))||(y<SH-1&&!isW(i+SW)))wd[i]=1; }
  var rl=function(i,j,c){ if(isW(i)&&wd[j]+c<wd[i])wd[i]=wd[j]+c; };
  for(y=0;y<SH;y++)for(x=0;x<SW;x++){ i=y*SW+x; if(x>0)rl(i,i-1,1); if(y>0)rl(i,i-SW,1); if(x>0&&y>0)rl(i,i-SW-1,1.41); if(x<SW-1&&y>0)rl(i,i-SW+1,1.41); }
  for(y=SH-1;y>=0;y--)for(x=SW-1;x>=0;x--){ i=y*SW+x; if(x<SW-1)rl(i,i+1,1); if(y<SH-1)rl(i,i+SW,1); if(x<SW-1&&y<SH-1)rl(i,i+SW+1,1.41); if(x>0&&y<SH-1)rl(i,i+SW-1,1.41); }
  M.wd=wd; F._mv=M; return F; };
// one frame of a moving card
ZEdge.frame=function(c,scene,mid,t,W,H,cv){ var B=ZEdge.BASE[scene], f0=function(m){ return m.id===mid; }, MV=(ZEdge.MOVE[scene]||[]).find(f0), more=false; if(!MV){ MV=(ZEdge.MORE&&ZEdge.MORE[scene]||[]).find(f0); more=!!MV; } if(!MV)return;
  var fx={}; (more?ZEdge.PICKFX[scene].concat(MV.fx||[]):MV.fx).forEach(function(f){ fx[f]=1; });      // round 40 cards: his picked movement + the new thing
  var base=ZEdge.render(scene,B,W,H,{noPieces:true,grain:scene==='beach',blend:MV.blend,feat:MV.feat}); c.imageSmoothingEnabled=true; c.drawImage(base,0,0,W,H);
  var F=ZEdge._prepMove(scene), M=F._mv, SW=F.SW, SH=F.SH, z=W/SW, N=F.N, V=F.V, K=ZEdge.K, kb=F.kb, D=F.d, h=ZEdge._hash, i, n, x, y;
  if(fx.haze){ for(var hy=0;hy<SH;hy++){ if(!M.hotRow[hy])continue; var dx=Math.sin(hy*0.55+t*5)*1.6*z/3+Math.sin(hy*0.21-t*3.1)*0.9*z/3; c.drawImage(base,0,hy*z*H/(SH*z),W,z*H/(SH*z)+0.5,dx,hy*z*H/(SH*z),W,z*H/(SH*z)+0.5); } }
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
  if(fx.caustics){ M.wat.forEach(function(i){ var x=i%SW, y=(i/SW)|0, v=Math.abs(Math.sin(x*0.33+t*1.3+N(x*0.05,y*0.05)*5)+Math.sin(y*0.41-t*1.0+V(x*0.06,y*0.06)*5)+Math.sin((x+y)*0.21+t*0.7)); if(v<0.22&&M.wd[i]>1.5)put(i,220,250,255,(0.22-v)*2.6*Math.min(1,M.wd[i]/5)); }); }
  if(fx.sheen){ M.wet.forEach(function(i){ var x=i%SW, y=(i/SW)|0, d=D[i]; if(d>9)return; var q=((d-t*3.4-N(x*0.035,y*0.035)*3.5)%9+9)%9, a=q>4?Math.sin((q-4)/5*Math.PI):0; if(a>0)put(i,215,238,255,a*0.7*(1-d/9)); }); }
  if(fx.foamdrift){ M.wat.forEach(function(i){ var x=i%SW, y=(i/SW)|0, wv=N((x+t*3)*0.06,(y+t*2)*0.06)*0.7+V(x*0.2,y*0.2)*0.3; if(wv>0.66&&M.wd[i]<26)put(i,245,250,255,Math.min(0.6,(wv-0.66)*5)*(1-M.wd[i]/26)); }); }
  if(fx.cracks){ M.crust.forEach(function(i){ var x=i%SW, y=(i/SW)|0, d=D[i], cq=Math.abs(V(x/16*3.2,y/16*3.2)-0.5), w2=0.03*(1-d/12)+0.008; if(cq<w2){ var pu=0.5+0.5*Math.sin(t*2.4-d*0.5); put(i,255,150+80*pu,60,(0.35+0.6*pu)*(1-d/12)); } }); }
  if(fx.aurora){ M.sno.forEach(function(i){ var x=i%SW, y=(i/SW)|0, band=Math.sin(x*0.03+t*0.4+Math.sin(y*0.05+t*0.3)*1.5)*0.5+0.5, b2=N(x*0.02+t*0.1,y*0.03); if(b2>0.45){ var a=Math.min(0.55,(b2-0.45)*2.2*band); if(band>0.5)put(i,40,220,140,a); else put(i,150,80,240,a); } }); }
  if(fx.windripples){ M.sno.forEach(function(i){ var x=i%SW, y=(i/SW)|0, w=Math.sin((x*0.25+y*0.9)+Math.sin(x*0.07)*2-t*0.8); if(w>0.86)put(i,170,200,225,(w-0.86)*3); else if(w<-0.9)put(i,255,255,255,(-0.9-w)*5); }); }
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
  // ── round 40: things that move about ──
  var AN=function(list,n,s){ return list.length?list[Math.floor(h(n,s,41)*list.length)]:0; };
  if(fx.dragonflies){ var DL=M.wat.filter(function(i){ return M.wd[i]<8; }).concat(M.wet.filter(function(i){ return D[i]<4; })); for(n=0;n<6&&DL.length;n++){ var j=AN(DL,n,1), ax=(j%SW)*z, ay=((j/SW)|0)*z, ph=t*0.9+n*2.1, dart=Math.floor(ph), fr=ph-dart, tx0=Math.sin(dart*2.3+n)*40, ty0=Math.cos(dart*1.7+n)*24, tx1=Math.sin((dart+1)*2.3+n)*40, ty1=Math.cos((dart+1)*1.7+n)*24, e2=fr<0.25?fr/0.25:1, X=ax+tx0+(tx1-tx0)*e2, Y=ay+ty0+(ty1-ty0)*e2-8, an=Math.atan2(ty1-ty0,tx1-tx0);
      c.save(); c.translate(X,Y); c.rotate(an); c.scale(1.5,1.5); c.fillStyle='rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(2,10,6,1.5,0,0,6.3); c.fill(); var fl=Math.sin(t*60+n)>0?1:0.5; c.fillStyle='rgba(220,240,255,'+(0.55*fl)+')'; c.beginPath(); c.ellipse(-1,-4,2,5,0.3,0,6.3); c.ellipse(-1,4,2,5,-0.3,0,6.3); c.ellipse(2,-3.5,1.6,4,-0.3,0,6.3); c.ellipse(2,3.5,1.6,4,0.3,0,6.3); c.fill(); c.strokeStyle='#1c1610'; c.lineWidth=2.6; c.beginPath(); c.moveTo(-8,0); c.lineTo(5,0); c.stroke(); c.strokeStyle=n%2?'#3aa0e0':'#e04a3a'; c.lineWidth=1.4; c.stroke(); c.restore(); } }
  if(fx.fish&&M.wat.length){ var FL=M.wat.filter(function(i){ return M.wd[i]>4; }); for(n=0;n<3&&FL.length;n++){ var pf=3.5+h(n,1,3)*2, uf=((t+h(n,2,3)*pf)%pf)/pf, cf=Math.floor((t+h(n,2,3)*pf)/pf), jf=FL[Math.floor(h(n,cf,4)*FL.length)], X0=(jf%SW)*z, Y0=((jf/SW)|0)*z, dir=h(n,cf,5)<0.5?-1:1;
      if(uf<0.22){ var a0=uf/0.22, XF=X0+dir*(a0-0.5)*26, YF=Y0-Math.sin(a0*Math.PI)*22; c.save(); c.translate(XF,YF); c.rotate(dir*(a0-0.5)*2.4); c.fillStyle='#1c1610'; c.beginPath(); c.ellipse(0,0,7,3.2,0,0,6.3); c.fill(); c.fillStyle='#b8c8d0'; c.beginPath(); c.ellipse(0,0,6,2.3,0,0,6.3); c.fill(); c.fillStyle='#1c1610'; c.beginPath(); c.moveTo(-dir*5,0); c.lineTo(-dir*10,-3.5); c.lineTo(-dir*10,3.5); c.fill(); c.restore(); if(a0<0.15){ c.fillStyle='rgba(255,255,255,.8)'; c.beginPath(); c.arc(X0-dir*13,Y0,3,0,6.3); c.fill(); } }
      else if(uf<0.6){ var ru=(uf-0.22)/0.38, XR=X0+dir*13; c.strokeStyle='rgba(235,248,255,'+(0.8*(1-ru))+')'; c.lineWidth=1.4; c.beginPath(); c.ellipse(XR,Y0,4+ru*18,(4+ru*18)*0.5,0,0,6.3); c.stroke(); if(ru<0.3){ for(var sd=0;sd<5;sd++){ c.fillStyle='rgba(255,255,255,'+(1-ru/0.3)+')'; c.beginPath(); c.arc(XR+(sd-2)*3,Y0-ru*30*Math.sin((sd+1)/6*3.14),1.4,0,6.3); c.fill(); } } } } }
  if(fx.crabs){ var CL=M.wet.filter(function(i){ return D[i]>=1.5&&D[i]<5; }); for(n=0;n<5&&CL.length;n++){ var pc=5+h(n,3,6)*3, uc=((t+h(n,4,6)*pc)%pc)/pc, cc=Math.floor((t+h(n,4,6)*pc)/pc), jc=CL[Math.floor(h(n,cc,7)*CL.length)], walk=uc<0.35?uc/0.35:uc<0.5?1:uc<0.85?1+(uc-0.5)/0.35:2, XC=(jc%SW)*z+(walk<=1?walk:2-walk)*22*(h(n,cc,8)<0.5?-1:1), YC=((jc/SW)|0)*z, leg=Math.sin(t*30)*(uc<0.35||(uc>0.5&&uc<0.85)?1:0);
      c.save(); c.translate(XC,YC); c.fillStyle='rgba(0,0,0,.2)'; c.beginPath(); c.ellipse(0,3,6,2,0,0,6.3); c.fill(); c.strokeStyle='#1c1610'; c.lineWidth=2.2; for(var lg=-1;lg<=1;lg+=2){ for(var lq=0;lq<3;lq++){ c.beginPath(); c.moveTo(lg*3,lq-1); c.lineTo(lg*7,lq*1.5+1+leg*lg*0.8); c.stroke(); } } c.fillStyle='#1c1610'; c.beginPath(); c.ellipse(0,0,5.2,3.8,0,0,6.3); c.fill(); c.fillStyle='#d8482a'; c.beginPath(); c.ellipse(0,0,4.2,2.9,0,0,6.3); c.fill(); c.beginPath(); c.arc(-5,-3,1.8,0,6.3); c.arc(5,-3,1.8,0,6.3); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.arc(-1.3,-2.6,0.9,0,6.3); c.arc(1.3,-2.6,0.9,0,6.3); c.fill(); c.restore(); } }
  if(fx.gulls||fx.birds){ var nb=fx.gulls?4:5; for(n=0;n<nb;n++){ var gx, gy, ga; if(fx.gulls){ gx=((h(n,9,1)*W+t*(28+n*5))%(W+120))-60; gy=h(n,10,1)*H*0.8+Math.sin(t*0.6+n)*14; ga=0; } else { var rad=40+n*14, cx=W*(0.3+0.4*h(n,11,1)), cy=H*(0.25+0.3*h(n,12,1)); ga=t*(0.5+n*0.07)+n; gx=cx+Math.cos(ga)*rad*1.4; gy=cy+Math.sin(ga)*rad*0.7; }
      var fl2=Math.sin(t*(fx.gulls?3:5)+n*2)*3.5, sz=fx.gulls?9:6; c.strokeStyle='rgba(10,20,30,.22)'; c.lineWidth=3; c.beginPath(); c.moveTo(gx+26-sz,gy+40+fl2*0.3); c.quadraticCurveTo(gx+26-sz*0.4,gy+40-fl2,gx+26,gy+40); c.quadraticCurveTo(gx+26+sz*0.4,gy+40-fl2,gx+26+sz,gy+40+fl2*0.3); c.stroke();
      c.strokeStyle='#1c1610'; c.lineWidth=2.6; c.beginPath(); c.moveTo(gx-sz,gy+fl2*0.3); c.quadraticCurveTo(gx-sz*0.4,gy-fl2,gx,gy); c.quadraticCurveTo(gx+sz*0.4,gy-fl2,gx+sz,gy+fl2*0.3); c.stroke(); c.strokeStyle=fx.gulls?'#f4f6f8':'#5a4a3a'; c.lineWidth=1.3; c.stroke(); } }
  if(fx.trickle&&M.wallFoot.length){ var cols=[]; M.wallFoot.forEach(function(i){ var x=i%SW; if(h(x,3,13)<0.03&&!cols.some(function(q){ return Math.abs(q%SW-x)<20; }))cols.push(i); }); cols.slice(0,5).forEach(function(i2,ci){ var X=(i2%SW)*z, Yb=((i2/SW)|0)*z, Yt=Yb-20*z, L2=Yb-Yt;
      c.strokeStyle='rgba(120,170,200,.55)'; c.lineWidth=2.2; c.beginPath(); for(var yy=0;yy<=L2;yy+=3){ var xx=X+Math.sin(yy*0.12+ci)*1.6; if(yy===0)c.moveTo(xx,Yt+yy); else c.lineTo(xx,Yt+yy); } c.stroke();
      for(var dq=0;dq<4;dq++){ var u2=((t*0.9+dq/4+ci*0.13)%1), Yd=Yt+u2*L2; c.fillStyle='rgba(235,250,255,.9)'; c.fillRect(X+Math.sin(u2*L2*0.12+ci)*1.6-1,Yd,2.2,5); }
      c.fillStyle='rgba(60,90,110,.35)'; c.beginPath(); c.ellipse(X,Yb+6,9,3.5,0,0,6.3); c.fill(); var sp2=(t*2+ci)%1; c.strokeStyle='rgba(235,250,255,'+(0.7*(1-sp2))+')'; c.lineWidth=1; c.beginPath(); c.ellipse(X,Yb+6,3+sp2*7,1.5+sp2*3,0,0,6.3); c.stroke(); }); }
  if(fx.leaves){ for(n=0;n<16;n++){ var pl=6+h(n,14,2)*4, ul=((t+h(n,15,2)*pl)%pl)/pl, XL=ul*(W+80)-40, YL=h(n,16,2)*H+Math.sin(t*1.3+n)*20+ul*40, rl2=t*3+n; c.save(); c.translate(XL,YL); c.rotate(rl2); c.scale(1,Math.abs(Math.sin(t*2.2+n))*0.8+0.2); c.fillStyle='#1c1610'; c.beginPath(); c.ellipse(0,0,4.6,2.6,0,0,6.3); c.fill(); c.fillStyle=['#d8902a','#c8582a','#9ab040','#e0b830'][n%4]; c.beginPath(); c.ellipse(0,0,3.8,1.9,0,0,6.3); c.fill(); c.restore(); } }
  if(fx.wisps&&M.wat.length){ c.save(); c.globalCompositeOperation='lighter'; for(n=0;n<7;n++){ var jw=AN(M.wat,n,2), XW=(jw%SW)*z+Math.sin(t*0.5+n*2)*30, YW=((jw/SW)|0)*z+Math.cos(t*0.4+n)*18-14+Math.sin(t*2+n)*3, aw=0.55+0.45*Math.sin(t*1.6+n*1.3);
      var gw=c.createRadialGradient(XW,YW,0,XW,YW,16); gw.addColorStop(0,'rgba(200,255,240,'+aw+')'); gw.addColorStop(0.3,'rgba(90,220,200,'+(0.5*aw)+')'); gw.addColorStop(1,'rgba(40,160,180,0)'); c.fillStyle=gw; c.beginPath(); c.arc(XW,YW,16,0,6.3); c.fill(); } c.restore(); }
  if(fx.frogs){ var FG=M.wet.filter(function(i){ return D[i]>=1&&D[i]<3; }); for(n=0;n<5&&FG.length;n++){ var pg=4+h(n,17,3)*3, ug=((t+h(n,18,3)*pg)%pg)/pg, cg=Math.floor((t+h(n,18,3)*pg)/pg), jg=FG[Math.floor(h(n,cg,19)*FG.length)], XG=(jg%SW)*z, YG=((jg/SW)|0)*z, ow=M.wat.length?M.wat[0]:0;
      var dxg=(h(n,cg,20)-0.5)*30, jumpu=ug<0.75?0:(ug-0.75)/0.25, XJ=XG+dxg*jumpu, YJ=YG-Math.sin(jumpu*Math.PI)*16+jumpu*6;
      if(jumpu<0.98){ c.save(); c.translate(XJ,YJ); c.fillStyle='#1c1610'; c.beginPath(); c.ellipse(0,0,5.4,4,0,0,6.3); c.fill(); c.fillStyle='#5fae3a'; c.beginPath(); c.ellipse(0,0,4.5,3.1,0,0,6.3); c.fill(); c.fillStyle='#1c1610'; c.beginPath(); c.arc(-2,-3,1.7,0,6.3); c.arc(2,-3,1.7,0,6.3); c.fill(); c.fillStyle='#ffe060'; c.beginPath(); c.arc(-2,-3.2,0.9,0,6.3); c.arc(2,-3.2,0.9,0,6.3); c.fill(); c.restore(); }
      if(jumpu>0.9||ug<0.12){ var rr2=ug<0.12?(ug/0.12):0.05; c.strokeStyle='rgba(235,248,255,'+(0.7*(1-rr2))+')'; c.lineWidth=1.2; c.beginPath(); c.ellipse(XG+dxg,YG+6,4+rr2*14,(4+rr2*14)*0.5,0,0,6.3); c.stroke(); } } }
  if(fx.steam&&M.crust.length){ var SL=M.crust.filter(function(i){ return D[i]<3; }); for(n=0;n<12&&SL.length;n++){ var ps2=3+h(n,21,4)*2, us=((t+h(n,22,4)*ps2)%ps2)/ps2, cs=Math.floor((t+h(n,22,4)*ps2)/ps2), js=SL[Math.floor(h(n,cs,23)*SL.length)], XS=(js%SW)*z+Math.sin(us*4+n)*8*us, YS=((js/SW)|0)*z-us*70;
      c.fillStyle='rgba(230,226,220,'+(0.5*Math.sin(us*Math.PI))+')'; c.beginPath(); c.arc(XS,YS,5+us*16,0,6.3); c.fill(); c.fillStyle='rgba(255,255,255,'+(0.25*Math.sin(us*Math.PI))+')'; c.beginPath(); c.arc(XS-3,YS-3,3+us*9,0,6.3); c.fill(); } }
  if(fx.snowlight){ for(n=0;n<40;n++){ var X8=((h(n,23,1)*W+Math.sin(t*0.5+n)*14+t*4)%W+W)%W, Y8=((h(n,24,1)*H+t*14)%H+H)%H; c.fillStyle='rgba(255,255,255,.85)'; c.beginPath(); c.arc(X8,Y8,n%3?1.4:2.2,0,6.3); c.fill(); } }
  ZEdge._dress(c,F,z,scene,t);
  if(fx.retro&&M.grs.length){ c.strokeStyle='rgba(136,255,136,.35)'; c.lineWidth=1; for(var ty=0;ty<ZEdge.TH;ty++)for(var tx=0;tx<ZEdge.TW;tx++){ var ci=(ty*16+8)*SW+tx*16+8, kk=K[kb[ci]]; if(kk.n!=='grass'&&kk.n!=='highgrass')continue;
      var seed=((tx*73856093)^(ty*19349663))>>>0, ph9=(seed%1000)/1000, dx1=Math.sin(t*1.4+ph9*6.28)*1.2, dx2=Math.cos(t*1.1+ph9*4.71)*1.0, k3=W/(ZEdge.TW*32);
      c.beginPath(); c.moveTo((tx*32+8+dx1)*k3,(ty*32+12)*k3); c.lineTo((tx*32+8+dx1)*k3,(ty*32+20)*k3); c.moveTo((tx*32+22+dx2)*k3,(ty*32+14)*k3); c.lineTo((tx*32+22+dx2)*k3,(ty*32+21)*k3); c.stroke(); } }
};

// ═══ Round 40 — ten more per place. Kris (Oct 8): "Some of the more movement based ones are good, but we need more to
// ═══ pick from. use my selections and come up with 10 additional … vary between ways of diffusing and transitioning
// ═══ between the terrains, movement based features, and static features."
// Every new card starts from his picks: the still pick (lake/beach clean line + pieces, finer sand on the beach; the
// rest layered + pieces) AND the moving card he picked (lake Rain rings, beach Surf and spray, mountain Mist at the
// foot, marsh Drifting fog, lava Embers rising, snow Glittering snow). Each adds ONE thing: a way of blending the
// grounds (o.blend in render), something that moves (fx), or something that stays put (feat, drawn into the still).
ZEdge.PICKFX={lake:['rings','lap'],beach:['waves','spray'],cliff:['mist'],marsh:['fog','lap'],lava:['flow','embers'],snow:['glitter']};
ZEdge.PICKNAME={lake:'Rain rings',beach:'Surf and spray',cliff:'Mist at the foot',marsh:'Drifting fog',lava:'Embers rising',snow:'Glittering snow'};
ZEdge.KINDS={blend:'blend',move:'moves',stat:'stays put'};
ZEdge.MORE={
  lake:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'No line at all: the grass, the bank and the shallows break into each other in a fine checker of pixels, the classic pixel-art way of blending.'},
    {id:'n2',kind:'blend',name:'Soft gradient', blend:'soft',    desc:'A long smooth fade: the water lightens over a wide band towards the shore and the bank darkens gently, with no hard edge anywhere.'},
    {id:'n3',kind:'blend',name:'Damp bank',     blend:'wet',     desc:'The clean line, plus a wide band of darker, wet ground around the water with a bright wet rim right at the edge.'},
    {id:'n4',kind:'blend',name:'Echo lines',    blend:'outline2',desc:'The clean line with a second, fainter line inside the water and one on the bank — the ripple-outline look of the old 16-bit Zelda games.'},
    {id:'n5',kind:'move', name:'Sunlit caustics',fx:['caustics'],desc:'A net of moving light plays across the lake floor, as if the sun shone through the ripples.'},
    {id:'n6',kind:'move', name:'Dragonflies',   fx:['dragonflies'],desc:'Dragonflies dart and hover along the shore, wings flickering.'},
    {id:'n7',kind:'move', name:'Jumping fish',  fx:['fish'],    desc:'Now and then a fish leaps out of the lake and drops back with a splash and a ring.'},
    {id:'n8',kind:'stat', name:'Wildflowers',   feat:['flowers'],desc:'Small white, yellow and pink flowers scattered through the grass near the water.'},
    {id:'n9',kind:'stat', name:'Stones in the shallows',feat:['stones'],desc:'Flat stones in the shallow water along the shore, some just breaking the surface.'},
    {id:'n10',kind:'stat',name:'Logs and mossy rocks',feat:['logs'],desc:'A fallen log half in the water and mossy rocks on the bank.'}],
  beach:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'Grass, sand and sea meet in fine pixel checkers instead of lines.'},
    {id:'n2',kind:'blend',name:'Soft gradient', blend:'soft',    desc:'Everything fades: grass into sand, sand into a long pale shallow that darkens out to sea.'},
    {id:'n3',kind:'blend',name:'Wide wet sand', blend:'wet',     desc:'A broad band of darker wet sand above the waterline, as after a high tide.'},
    {id:'n4',kind:'blend',name:'Turquoise shallows',blend:'terrace',desc:'The sea steps down from bright turquoise shallows to deep blue in clear bands, each with a faint light edge.'},
    {id:'n5',kind:'move', name:'Scuttling crabs',fx:['crabs'],  desc:'Little red crabs scuttle sideways along the wet sand, stop, and scuttle on.'},
    {id:'n6',kind:'move', name:'Gulls overhead',fx:['gulls'],   desc:'Gulls glide over the beach; their shadows sweep across sand and sea.'},
    {id:'n7',kind:'move', name:'Wet-sand shine',fx:['sheen','foamdrift'],desc:'As each wave pulls back the wet sand shines like a mirror, and patches of foam drift in on the sea.'},
    {id:'n8',kind:'stat', name:'Shells and starfish',feat:['shells'],desc:'Shells and orange starfish scattered along the sand by the water.'},
    {id:'n9',kind:'stat', name:'Tide line',     feat:['wrack'],  desc:'A line of dark seaweed and bits of driftwood along the high-water mark.'},
    {id:'n10',kind:'stat',name:'Dune grass',    feat:['marram'], desc:'Tall pale dune grass where the sand meets the meadow.'}],
  cliff:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'The scree and the grass meet in pixel checkers; the cliff face stays sharp.'},
    {id:'n2',kind:'blend',name:'Soft gradient', blend:'soft',    desc:'Scree fades smoothly into the grass with no edge line.'},
    {id:'n3',kind:'blend',name:'Grass lip',     blend:'overhang',desc:'The grass ends in a bright lip and throws a short shadow onto the scree below it, so the meadow reads as a step up.'},
    {id:'n4',kind:'blend',name:'Scattered scree',blend:'stipple',desc:'Grit and stones spill out into the grass in uneven clumps instead of stopping at a line.'},
    {id:'n5',kind:'move', name:'Birds circling',fx:['birds'],   desc:'Birds wheel over the mountain; their shadows cross the cliff and the grass.'},
    {id:'n6',kind:'move', name:'Trickling water',fx:['trickle'],desc:'Thin streams of water run down the cliff face and wet the scree at its foot.'},
    {id:'n7',kind:'move', name:'Falling leaves',fx:['leaves'],  desc:'Leaves drift and tumble across the slope on the wind.'},
    {id:'n8',kind:'stat', name:'Moss and ivy',  feat:['moss'],   desc:'Moss patches and hanging ivy on the cliff face.'},
    {id:'n9',kind:'stat', name:'Mountain flowers',feat:['alpine'],desc:'Small blue and white mountain flowers in the highland grass near the rocks.'},
    {id:'n10',kind:'stat',name:'Rubble fans',   feat:['rubble'], desc:'Fans of broken stone spread out from the foot of the cliff.'}],
  marsh:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'Mud, grass and the pools meet in pixel checkers.'},
    {id:'n2',kind:'blend',name:'Soft gradient', blend:'soft',    desc:'Everything fades: mud into grass, shallows into deep water.'},
    {id:'n3',kind:'blend',name:'Soggy ground',  blend:'wet',     desc:'Wide bands of dark, wet mud and grass around every pool.'},
    {id:'n4',kind:'blend',name:'Lush banks',    blend:'tint',    desc:'The grass turns a richer green the nearer it gets to the water.'},
    {id:'n5',kind:'move', name:'Will-o\'-wisps',fx:['wisps'],   desc:'Pale blue-green lights float and bob over the pools.'},
    {id:'n6',kind:'move', name:'Dragonflies',   fx:['dragonflies'],desc:'Dragonflies dart and hover over the water and reeds.'},
    {id:'n7',kind:'move', name:'Frogs',         fx:['frogs'],   desc:'Frogs sit on the banks and pads, and now and then hop into the water with a ring.'},
    {id:'n8',kind:'stat', name:'Toadstools',    feat:['toadstools'],desc:'Clusters of red and brown toadstools on the mud banks.'},
    {id:'n9',kind:'stat', name:'Rotting logs',  feat:['logs'],   desc:'Old logs lying across the mud and half sunk in the pools.'},
    {id:'n10',kind:'stat',name:'Duckweed',      feat:['duckweed'],desc:'Bright green duckweed gathered on the water along the edges.'}],
  lava:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'Ash, crust and the glow of the lava meet in pixel checkers.'},
    {id:'n2',kind:'blend',name:'Soft glow',     blend:'soft',    desc:'The lava\'s light spreads far out over the crust in a smooth gradient.'},
    {id:'n3',kind:'blend',name:'Scorched ground',blend:'tint',   desc:'The ground darkens and reddens the nearer it is to the lava.'},
    {id:'n4',kind:'blend',name:'Glowing cracks',blend:'crackle', desc:'Thin glowing cracks run through the crust near the lava and fade away from it.'},
    {id:'n5',kind:'move', name:'Heat haze',     fx:['haze'],     desc:'The air shimmers over the lava; everything behind it wavers.'},
    {id:'n6',kind:'move', name:'Steam vents',   fx:['steam'],    desc:'Puffs of steam and smoke rise from the crust along the lava.'},
    {id:'n7',kind:'move', name:'Pulsing cracks',fx:['cracks'],   desc:'Cracks in the crust glow brighter and dimmer like a slow heartbeat.'},
    {id:'n8',kind:'stat', name:'Obsidian shards',feat:['obsidian'],desc:'Black glassy shards on the crust with bright glints.'},
    {id:'n9',kind:'stat', name:'Sulphur crystals',feat:['sulphur'],desc:'Yellow sulphur crystals growing on the ash.'},
    {id:'n10',kind:'stat',name:'Basalt columns',feat:['basalt'], desc:'The tops of six-sided basalt columns on the crust beside the lava.'}],
  snow:[
    {id:'n1',kind:'blend',name:'Pixel dither',  blend:'dither',  desc:'Snow, rock and grass meet in pixel checkers.'},
    {id:'n2',kind:'blend',name:'Soft gradient', blend:'soft',    desc:'The snow thins smoothly into the rock and grass.'},
    {id:'n3',kind:'blend',name:'Melting patches',blend:'stipple',desc:'The snow line breaks up into patches and clumps, as in spring.'},
    {id:'n4',kind:'blend',name:'Frosted grass', blend:'tint',    desc:'Grass near the snow is speckled with frost.'},
    {id:'n5',kind:'move', name:'Northern lights',fx:['aurora'],  desc:'Green and violet light ripples slowly over the snow.'},
    {id:'n6',kind:'move', name:'Wind ripples',  fx:['windripples'],desc:'Wind-blown ridges drift slowly across the snowfield.'},
    {id:'n7',kind:'move', name:'Light snowfall',fx:['snowlight'],desc:'A few flakes falling, gentle and slow.'},
    {id:'n8',kind:'stat', name:'Icicles and rocks',feat:['icicles'],desc:'Icicles hang from the rock and stones poke through the snow.'},
    {id:'n9',kind:'stat', name:'Pine saplings', feat:['pines'],  desc:'Small snowy pines along the snow line.'},
    {id:'n10',kind:'stat',name:'Frozen puddles',feat:['puddles'],desc:'Little frozen puddles with pale ice on the grass and rock.'}]
};
// static features: placed once from the field, drawn into the still picture
ZEdge._feat=function(c,F,z,scene,list){ var SW=F.SW, SH=F.SH, kb=F.kb, D=F.d, EK=F.ek, K=ZEdge.K, H=ZEdge._hash, ink='#1c1610', s0=z/3;
  list.forEach(function(ft){ var L=[], x, y;
    for(y=2;y<SH-2;y++)for(x=2;x<SW-2;x++){ var i=y*SW+x, k=K[kb[i]], e=K[EK[i]], d=D[i], h=H(x,y,31+ft.length), gr=k.n==='grass'||k.n==='highgrass', up=y>3&&K[kb[(y-3)*SW+x]].wall, wat=k.liq&&!k.hot;
      if(ft==='flowers'&&gr&&e.liq&&d>=2&&d<=9&&h<0.03)L.push([x,y,h]);
      else if(ft==='stones'&&wat&&!e.liq&&d>=2&&d<=6&&h<0.012)L.push([x,y,h]);
      else if(ft==='logs'&&((wat&&!e.liq&&d>=1&&d<=3)||(k.n==='mud'&&e.liq&&d<=2))&&h<0.0016)L.push([x,y,h]);
      else if(ft==='logs'&&gr&&e.liq&&d>=3&&d<=6&&h<0.003)L.push([x,y,h,'rock']);
      else if(ft==='shells'&&k.n==='sand'&&e.liq&&d>=2&&d<=10&&h<0.012)L.push([x,y,h]);
      else if(ft==='wrack'&&k.n==='sand'&&e.liq&&d>=6&&d<=8&&h<0.09)L.push([x,y,h]);
      else if(ft==='marram'&&k.n==='sand'&&gr===false&&!e.liq&&e.n==='grass'&&d<=8&&h<0.03)L.push([x,y,h]);
      else if(ft==='moss'&&k.wall&&y<SH-1&&h<0.02){ for(var q=1;q<=20;q++){ if(y+q>=SH)break; if(!K[kb[(y+q)*SW+x]].wall){ if(q<=12)L.push([x,y,h,q]); break; } } }
      else if(ft==='alpine'&&gr&&d<=14&&h<0.02)L.push([x,y,h]);
      else if(ft==='rubble'&&!k.wall&&!k.liq&&up&&d<=6&&h<0.12)L.push([x,y,h]);
      else if(ft==='toadstools'&&k.n==='mud'&&d>=1&&d<=5&&h<0.01)L.push([x,y,h]);
      else if(ft==='duckweed'&&wat&&d<=7&&h<0.45&&F.V(x*0.08,y*0.08)>0.5)L.push([x,y,h]);
      else if(ft==='obsidian'&&k.n==='crust'&&d<=8&&h<0.012)L.push([x,y,h]);
      else if(ft==='sulphur'&&k.n==='ash'&&d<=10&&h<0.008)L.push([x,y,h]);
      else if(ft==='basalt'&&k.n==='crust'&&e.hot&&d>=1&&d<=7&&h<0.03)L.push([x,y,h]);
      else if(ft==='icicles'&&k.wall&&y<SH-1&&!K[kb[(y+1)*SW+x]].wall&&h<0.5)L.push([x,y,h,'ice']);
      else if(ft==='icicles'&&k.n==='snow'&&d>=3&&h<0.004)L.push([x,y,h,'rock']);
      else if(ft==='pines'&&gr&&(e.n==='snow'||e.n==='scree')&&d>=2&&d<=9&&h<0.012)L.push([x,y,h]);
      else if(ft==='puddles'&&((gr&&(e.n==='scree'||e.n==='snow')&&d<=10)||k.n==='scree')&&h<0.004)L.push([x,y,h]); }
    L.sort(function(a,b){ return a[1]-b[1]; });
    // keep pieces apart
    var kept=[]; L.forEach(function(p){ var gap=ft==='duckweed'||ft==='wrack'||ft==='rubble'||ft==='icicles'?0:ft==='logs'||ft==='basalt'||ft==='pines'?9:ft==='puddles'?14:4; if(!gap||!kept.some(function(q){ return Math.abs(q[0]-p[0])<gap&&Math.abs(q[1]-p[1])<gap; }))kept.push(p); });
    var s=s0*({shells:1.5,obsidian:1.5,alpine:1.4,rubble:1.4,stones:1.3,duckweed:1.5,flowers:1.2}[ft]||1);
    kept.forEach(function(p){ var X=p[0]*z, Y=p[1]*z, h=p[2], r1=H(p[0],p[1],7); c.save(); c.translate(X,Y); c.lineJoin='round'; c.lineCap='round';
      if(ft==='flowers'){ var col=['#ffffff','#ffe14a','#ff9ac8','#c8a0ff'][Math.floor(r1*4)]; for(var j=0;j<5;j++){ var a=j/5*6.28; c.fillStyle=ink; c.beginPath(); c.arc(Math.cos(a)*1.8*s,Math.sin(a)*1.8*s,1.7*s,0,6.3); c.fill(); } for(j=0;j<5;j++){ a=j/5*6.28; c.fillStyle=col; c.beginPath(); c.arc(Math.cos(a)*1.8*s,Math.sin(a)*1.8*s,1.2*s,0,6.3); c.fill(); } c.fillStyle='#f0a020'; c.beginPath(); c.arc(0,0,1*s,0,6.3); c.fill(); }
      else if(ft==='stones'){ var R=(3+r1*3)*s; c.fillStyle='rgba(0,20,30,.35)'; c.beginPath(); c.ellipse(0,1*s,R*1.25,R*0.7,0,0,6.3); c.fill(); c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,R+0.8*s,R*0.62+0.8*s,r1,0,6.3); c.fill(); c.fillStyle='#8e9488'; c.beginPath(); c.ellipse(0,0,R,R*0.62,r1,0,6.3); c.fill(); c.fillStyle='rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-R*0.25,-R*0.2,R*0.45,R*0.22,r1,0,6.3); c.fill(); c.strokeStyle='rgba(230,248,255,.6)'; c.lineWidth=1; c.beginPath(); c.ellipse(0,0.6*s,R*1.35,R*0.82,0,0.2,2.9); c.stroke(); }
      else if(ft==='logs'&&p[3]==='rock'){ var br=(4+r1*3)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,br+1,br*0.75+1,0,0,6.3); c.fill(); c.fillStyle='#857c70'; c.beginPath(); c.ellipse(0,0,br,br*0.75,0,0,6.3); c.fill(); c.fillStyle='#5f8f3a'; c.beginPath(); c.ellipse(-br*0.15,-br*0.35,br*0.75,br*0.38,0,0,6.3); c.fill(); }
      else if(ft==='logs'){ var ln=(16+r1*10)*s, ang=(r1-0.5)*1.2; c.rotate(ang); c.fillStyle='rgba(0,0,0,.3)'; c.fillRect(-ln/2,1*s,ln,5*s); c.fillStyle=ink; c.beginPath(); c.roundRect?c.roundRect(-ln/2-1,-3.5*s-1,ln+2,7*s+2,3*s):c.rect(-ln/2-1,-3.5*s-1,ln+2,7*s+2); c.fill(); c.fillStyle='#7a5434'; c.fillRect(-ln/2,-3.5*s,ln,7*s); c.fillStyle='#9a6e44'; c.fillRect(-ln/2,-3.5*s,ln,2*s); c.fillStyle='#c8a070'; c.beginPath(); c.ellipse(ln/2,0,2*s,3.5*s,0,0,6.3); c.fill(); c.strokeStyle='#7a5434'; c.lineWidth=0.8; c.beginPath(); c.ellipse(ln/2,0,1*s,2*s,0,0,6.3); c.stroke(); if(scene==='marsh'){ c.fillStyle='#5f8f3a'; c.fillRect(-ln/4,-3.5*s,ln/3,1.6*s); } }
      else if(ft==='shells'){ if(r1<0.3){ c.fillStyle=ink; for(var j2=0;j2<5;j2++){ var a2=j2/5*6.28-1.57; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(a2-0.4)*1.6*s,Math.sin(a2-0.4)*1.6*s); c.lineTo(Math.cos(a2)*4.6*s,Math.sin(a2)*4.6*s); c.lineTo(Math.cos(a2+0.4)*1.6*s,Math.sin(a2+0.4)*1.6*s); c.fill(); } c.fillStyle='#f08a3a'; for(j2=0;j2<5;j2++){ a2=j2/5*6.28-1.57; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(a2-0.35)*1.2*s,Math.sin(a2-0.35)*1.2*s); c.lineTo(Math.cos(a2)*3.8*s,Math.sin(a2)*3.8*s); c.lineTo(Math.cos(a2+0.35)*1.2*s,Math.sin(a2+0.35)*1.2*s); c.fill(); } }
        else { var sr=(2+r1*1.6)*s; c.fillStyle=ink; c.beginPath(); c.moveTo(0,sr*0.7+1); c.arc(0,0,sr+0.8,3.4,6.0); c.closePath(); c.fill(); c.fillStyle=['#f6e4d6','#f0c8b0','#e8e0f0'][Math.floor(r1*3)]; c.beginPath(); c.moveTo(0,sr*0.7); c.arc(0,0,sr,3.4,6.0); c.closePath(); c.fill(); c.strokeStyle='rgba(120,80,60,.5)'; c.lineWidth=0.7; for(var j3=-1;j3<=1;j3++){ c.beginPath(); c.moveTo(0,sr*0.6); c.lineTo(j3*sr*0.6,-sr*0.8); c.stroke(); } } }
      else if(ft==='wrack'){ c.strokeStyle=r1<0.15?'#7a5a3a':'#2e4a26'; c.lineWidth=(r1<0.15?2.2:1.4)*s; c.beginPath(); c.moveTo(-3*s,0); c.quadraticCurveTo(0,(r1-0.5)*4*s,3.5*s,(H(p[0]+1,p[1],3)-0.5)*2*s); c.stroke(); }
      else if(ft==='marram'){ for(var j4=0;j4<6;j4++){ var a4=-0.7+j4/5*1.4+(r1-0.5)*0.3, l4=(9+r1*6)*s; c.strokeStyle=ink; c.lineWidth=2.2*s; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(Math.sin(a4)*l4*0.3,-l4*0.6,Math.sin(a4)*l4*0.8,-Math.cos(a4)*l4); c.stroke(); c.strokeStyle=j4%2?'#c8c890':'#a8b070'; c.lineWidth=1.1*s; c.stroke(); } }
      else if(ft==='moss'){ var q=p[3], hh=Math.min(q,10)*z; c.fillStyle='#4f7a32'; c.beginPath(); c.ellipse(0,0,(3+r1*4)*s,(2+r1*2)*s,0,0,6.3); c.fill(); c.fillStyle='#6f9a44'; c.beginPath(); c.ellipse(-1*s,-0.6*s,(2+r1*2)*s,(1.2+r1)*s,0,0,6.3); c.fill(); if(r1>0.82){ c.strokeStyle='#3f6a2a'; c.lineWidth=0.9*s; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(2*s,hh*0.5,(r1-0.5)*6*s,hh*0.9); c.stroke(); c.fillStyle='#5f9040'; for(var j5=1;j5<5;j5++){ c.beginPath(); c.ellipse((r1-0.5)*6*s*j5/5+(j5%2?1.2:-1.2)*s,hh*0.9*j5/5,1.1*s,0.7*s,j5%2?0.6:-0.6,0,6.3); c.fill(); } } }
      else if(ft==='alpine'){ var col2=r1<0.5?'#7fa8ff':'#ffffff'; c.fillStyle=ink; c.beginPath(); c.arc(0,0,2.4*s,0,6.3); c.fill(); for(var j6=0;j6<4;j6++){ var a6=j6/4*6.28+0.4; c.fillStyle=col2; c.beginPath(); c.arc(Math.cos(a6)*1.2*s,Math.sin(a6)*1.2*s,1.1*s,0,6.3); c.fill(); } c.fillStyle='#ffd040'; c.beginPath(); c.arc(0,0,0.7*s,0,6.3); c.fill(); }
      else if(ft==='rubble'){ var rr=(1.2+r1*2.6)*s; c.fillStyle=ink; c.beginPath(); c.moveTo(-rr-0.7,rr*0.4); c.lineTo(-rr*0.4,-rr-0.7); c.lineTo(rr+0.7,-rr*0.2); c.lineTo(rr*0.5,rr*0.7+0.7); c.closePath(); c.fill(); c.fillStyle=['#8a7e6e','#9a8e7e','#6e6458'][Math.floor(r1*3)]; c.beginPath(); c.moveTo(-rr,rr*0.35); c.lineTo(-rr*0.4,-rr); c.lineTo(rr,-rr*0.2); c.lineTo(rr*0.5,rr*0.6); c.closePath(); c.fill(); }
      else if(ft==='toadstools'){ for(var j7=0;j7<2+Math.floor(r1*3);j7++){ var ox=(j7-1)*4*s+(H(j7,p[0],2)-0.5)*3*s, cr=(2.2+H(j7,p[1],3)*2)*s, st=(3+H(j7,p[1],4)*2)*s; c.fillStyle=ink; c.fillRect(ox-1.3*s,-st,2.6*s,st); c.fillStyle='#efe6d0'; c.fillRect(ox-0.8*s,-st,1.6*s,st); c.fillStyle=ink; c.beginPath(); c.ellipse(ox,-st,cr+0.8,cr*0.7+0.8,0,3.14,6.29); c.fill(); c.fillStyle=r1<0.6?'#d03a2a':'#9a6a3a'; c.beginPath(); c.ellipse(ox,-st,cr,cr*0.7,0,3.14,6.29); c.fill(); if(r1<0.6){ c.fillStyle='#fff'; c.beginPath(); c.arc(ox-cr*0.35,-st-cr*0.35,0.7*s,0,6.3); c.arc(ox+cr*0.3,-st-cr*0.4,0.6*s,0,6.3); c.fill(); } } }
      else if(ft==='duckweed'){ c.fillStyle=r1<0.5?'#7ab84a':'#5f9a3a'; c.beginPath(); c.arc(0,0,(0.8+r1*0.9)*s,0,6.3); c.fill(); }
      else if(ft==='obsidian'){ var ob=(2.5+r1*3)*s; c.rotate(r1*3); c.fillStyle='#000'; c.beginPath(); c.moveTo(-ob,0); c.lineTo(-ob*0.2,-ob*1.1); c.lineTo(ob,-ob*0.2); c.lineTo(ob*0.3,ob*0.6); c.closePath(); c.fill(); c.fillStyle='#1a1424'; c.beginPath(); c.moveTo(-ob*0.8,0); c.lineTo(-ob*0.2,-ob*0.9); c.lineTo(ob*0.8,-ob*0.2); c.lineTo(ob*0.25,ob*0.45); c.closePath(); c.fill(); c.strokeStyle='rgba(200,180,255,.85)'; c.lineWidth=1; c.beginPath(); c.moveTo(-ob*0.4,-ob*0.3); c.lineTo(-ob*0.1,-ob*0.75); c.stroke(); }
      else if(ft==='sulphur'){ for(var j8=0;j8<4;j8++){ var a8=-0.8+j8*0.5+(r1-0.5)*0.4, l8=(3+H(j8,p[0],5)*4)*s; c.save(); c.rotate(a8); c.fillStyle=ink; c.fillRect(-1.4*s,-l8,2.8*s,l8); c.fillStyle=j8%2?'#f0d838':'#d8b820'; c.fillRect(-0.9*s,-l8+0.5,1.8*s,l8-0.5); c.fillStyle='#fff6a0'; c.fillRect(-0.9*s,-l8+0.5,0.7*s,l8*0.6); c.restore(); } }
      else if(ft==='basalt'){ var hr=(4.5+r1*2)*s; c.fillStyle=ink; c.beginPath(); for(var j9=0;j9<6;j9++){ var a9=j9/6*6.28; c.lineTo(Math.cos(a9)*(hr+1),Math.sin(a9)*(hr+1)*0.75); } c.closePath(); c.fill(); c.fillStyle=r1<0.5?'#5e524c':'#6c5e56'; c.beginPath(); for(j9=0;j9<6;j9++){ a9=j9/6*6.28; c.lineTo(Math.cos(a9)*hr,Math.sin(a9)*hr*0.75); } c.closePath(); c.fill(); c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1; c.beginPath(); c.moveTo(-hr*0.9,-hr*0.1); c.lineTo(-hr*0.45,-hr*0.65); c.lineTo(hr*0.45,-hr*0.65); c.stroke(); c.fillStyle='rgba(255,120,40,.3)'; c.beginPath(); c.ellipse(0,hr*0.2,hr*0.4,hr*0.2,0,0,6.3); c.fill(); }
      else if(ft==='icicles'&&p[3]==='ice'){ if(H(p[0],1,9)<0.6){ var il=(3+r1*7)*s; c.fillStyle='rgba(30,50,70,.6)'; c.beginPath(); c.moveTo(-1.4*s,0); c.lineTo(1.4*s,0); c.lineTo(0,il+0.8); c.closePath(); c.fill(); c.fillStyle='#d8f0ff'; c.beginPath(); c.moveTo(-1*s,0); c.lineTo(1*s,0); c.lineTo(0,il); c.closePath(); c.fill(); } }
      else if(ft==='icicles'){ var rk=(3+r1*3)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,rk+1,rk*0.7+1,0,3.14,6.29); c.fill(); c.fillStyle='#7c7468'; c.beginPath(); c.ellipse(0,0,rk,rk*0.7,0,3.14,6.29); c.fill(); c.fillStyle='#f4f8fb'; c.beginPath(); c.ellipse(-rk*0.1,-rk*0.55,rk*0.7,rk*0.25,0,0,6.3); c.fill(); }
      else if(ft==='pines'){ var ph=(10+r1*6)*s; c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(1*s,0,ph*0.4,ph*0.15,0,0,6.3); c.fill(); for(var t9=0;t9<3;t9++){ var w9=ph*(0.42-t9*0.1), y9=-t9*ph*0.28; c.fillStyle=ink; c.beginPath(); c.moveTo(-w9-1,y9+1); c.lineTo(w9+1,y9+1); c.lineTo(0,y9-ph*0.42-1); c.closePath(); c.fill(); c.fillStyle='#2f5a3a'; c.beginPath(); c.moveTo(-w9,y9); c.lineTo(w9,y9); c.lineTo(0,y9-ph*0.42); c.closePath(); c.fill(); c.fillStyle='#f4f8fb'; c.beginPath(); c.moveTo(-w9*0.5,y9-ph*0.2); c.lineTo(w9*0.5,y9-ph*0.2); c.lineTo(0,y9-ph*0.42); c.closePath(); c.fill(); } }
      else if(ft==='puddles'){ var pw=(5+r1*4)*s; c.fillStyle=ink; c.beginPath(); c.ellipse(0,0,pw+1,pw*0.5+1,0,0,6.3); c.fill(); c.fillStyle='#bcdcec'; c.beginPath(); c.ellipse(0,0,pw,pw*0.5,0,0,6.3); c.fill(); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=1; c.beginPath(); c.moveTo(-pw*0.5,-pw*0.1); c.lineTo(-pw*0.1,-pw*0.25); c.moveTo(pw*0.1,pw*0.15); c.lineTo(pw*0.5,0); c.stroke(); }
      c.restore(); }); }); };
