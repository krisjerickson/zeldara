// ═══════════════════════════════════════════════════════════════════════
// ║ 05d-world-edges.js — ZWE: the terrain edges Kris picked in the Lab, in the real world (round 40).
// ║ Kris (Oct 8): "Implement everything else" → build the edges into the game, whole world at once, with a Dev
// ║ panel switch to compare against the old look; and get ready for the painted edge pieces (wave 38).
// ║ What the world painter (05c) now does when ZWE.on:
// ║   • rounds every outline first (each sample takes the kind most common around it), then measures how far each
// ║     sample is from the next kind (stage 2 of _wpField, in the worker)
// ║   • draws each edge in the style picked for its place (ZWE.PICK): lakes and the sea — the clean ink line;
// ║     marsh, lava, cliffs, snow and land against land — the layered edge; roads and paved ground keep their kerbs
// ║   • ZWE.after: fine sand grain (Kris: "more granular sand"), and the moving water as a short looping flipbook
// ║     (lapping on lakes and marsh, rolling waves on the sea) plus where the moving bits may appear
// ║   • ZWE.pieces: tufts, reeds, lily pads, pebbles, shells, boulders, drifts and embers along the edges — the
// ║     painted pictures from the edge sheets (sc_edge_1/2) when they are there, else drawn in code (ZEdge._piece)
// ║ Mounted and animated by 10c (flipbook + particles: rain rings, spray, fog, mist at cliff feet, glitter, embers).
// ║ To change a place's look after a new Lab pick: edit ZWE.PICK (style, blend, fx). Dev panel: "Terrain edges".
// ═══════════════════════════════════════════════════════════════════════
var ZWE={
  on:(function(){ try{ if(/[?&]edges=old/.test(location.search))return false; return localStorage.getItem('zeldara_edges')!=='old'; }catch(e){ return true; } })(),
  // Kris's Lab picks (rounds 38–39): still — lake/beach clean line + pieces, the rest layered + pieces; moving — lake Rain rings,
  // beach Surf and spray, mountain Mist at the foot, marsh Drifting fog, lava Embers rising, snow Glittering snow.
  // blend: '' or one of the round 40 Lab blends (dither soft stipple wet outline2 terrace overhang tint crackle)
  PICK:{ land:{style:'layers',blend:''}, lake:{style:'ink',blend:'',fx:['lap','rings']}, sea:{style:'ink',blend:'',fx:['waves','spray']},
         marsh:{style:'layers',blend:'',fx:['lap','fog']}, lava:{style:'layers',blend:'',fx:['embers']}, cliff:{fx:['mist']}, snow:{fx:['glitter']} },
  pieces:true, grain:true, motion:true, NF:16, T:4,
  // S: field samples per tile with the new edges (the old look keeps 12). 16 = exactly 2 px a sample on a 32 px tile, so the edges scale cleanly;
  // 14 (2.29 px) and 12 (2.67 px) show steps. 16 costs about a third more paint time than the old look (round 40 measurement). Try others: ?edgeS=14.
  S:(function(){ try{ var m=/[?&]edgeS=(\d+)/.exec(location.search); if(m&&+m[1]>=8&&+m[1]<=20)return +m[1]; }catch(e){} return 16; })(),
  BL:{'':0,dither:1,soft:2,stipple:3,wet:4,outline2:5,terrace:6,overhang:7,tint:8,crackle:9},
  CLS:['land','lake','sea','marsh','lava'],
  // the plain settings the painter (worker) gets
  field:function(){ var P=ZWE.PICK; return {st:ZWE.CLS.map(function(c){ return P[c].style==='ink'?1:2; }),bl:ZWE.CLS.map(function(c){ return ZWE.BL[P[c].blend||'']||0; })}; },
  fx:function(place,f){ var p=ZWE.PICK[place]; return !!(ZWE.motion&&p&&p.fx&&p.fx.indexOf(f)>=0); },
  _hash:function(x,y,s){ var n=(x*374761393+y*668265263+(s||0)*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0)/4294967296; },
  _grainTile:null,
  grainTile:function(){ if(ZWE._grainTile)return ZWE._grainTile; var c=mkCanvas(128,128), g=c.getContext('2d'), im=g.createImageData(128,128), d=im.data;
    for(var i=0;i<128*128;i++){ var h=ZWE._hash(i%128,(i/128)|0,21), o=i*4; if(h>0.985){ d[o]=60; d[o+1]=48; d[o+2]=30; d[o+3]=150; } else if(h<0.012){ d[o]=255; d[o+1]=250; d[o+2]=230; d[o+3]=130; } else { var q=(h-0.5)*2; d[o]=q>0?255:40; d[o+1]=q>0?246:34; d[o+2]=q>0?220:20; d[o+3]=Math.abs(q)*22; } }
    g.putImageData(im,0,0); return (ZWE._grainTile=c); },
  // after the field (called until it returns true): sand grain, then the flipbook frames a few at a time
  after:function(D,ctx,out,cx,cy,MG,KL){ var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, st=D._zwe||(D._zwe={step:0});
    if(st.step===0){ st.step=1;
      if(ZWE.grain){ var any=false; for(var i=0;i<kb.length;i+=7)if(KT.land[kb[i]]===2){ any=true; break; }
        if(any){ var mc=mkCanvas(SW,SW), mx=mc.getContext('2d'), im=mx.createImageData(SW,SW), dd=im.data; for(i=0;i<SW*SW;i++)if(KT.land[kb[i]]===2)dd[i*4+3]=255; mx.putImageData(im,0,0);
          var GW=D.GW, gc=mkCanvas(GW*LT,GW*LT), gg=gc.getContext('2d'); gg.fillStyle=gg.createPattern(ZWE.grainTile(),'repeat'); gg.save(); gg.translate(-((D.tx0*LT)%128),-((D.ty0*LT)%128)); gg.fillRect(0,0,GW*LT+256,GW*LT+256); gg.restore();
          gg.globalCompositeOperation='destination-in'; gg.imageSmoothingEnabled=true; gg.drawImage(mc,0,0,GW*LT,GW*LT); ctx.drawImage(gc,0,0); } }
      ZWE._cells(D,out,cx,cy,MG,KL); return false; }
    if(st.step===1){ if(!ZWE.motion||!st.flip){ st.step=2; return true; } var F=st.flip, k1=Math.min(ZWE.NF,F.k+2); for(;F.k<k1;F.k++)ZWE._frame(D,F,F.k); if(F.k>=ZWE.NF){ F.g.putImageData(F.im,0,0); out.flip={canvas:F.cv,nf:ZWE.NF,L:F.L,T:ZWE.T}; st.step=2; return true; } return false; }
    return true; },
  // where things move (inner chunk only, world px) and whether this chunk needs a flipbook
  _cells:function(D,out,cx,cy,MG,KL){ var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, dist=D.dist, ek=D.ek, a0=MG*S, a1=SW-MG*S, sp=LT/S, ox=D.tx0*LT, oy=D.ty0*LT;
    var C={rings:[],spray:[],fog:[],mist:[],glitter:[],embers:[]}, needFlip=false, H=ZWE._hash;
    for(var y=a0;y<a1;y++)for(var x=a0;x<a1;x++){ var i=y*SW+x, k=kb[i], cl=KT.cls[k], e=ek[i], dl=dist[i]===255?99:dist[i]/8*16/S, h=H(x+D.tx0*S,y+D.ty0*S,17), X=ox+(x+0.5)*sp, Y=oy+(y+0.5)*sp;
      if(cl===1||cl===3){ if(dl<16&&!KT.liquid[e])needFlip=true; if(dl>3&&h<0.02)(cl===1?C.rings:C.fog).push([X,Y]); if(cl===3&&h<0.004)C.rings.push([X,Y]); }
      else if(cl===2){ if(dl<24&&!KT.liquid[e])needFlip=true; if(dl<2.5&&!KT.liquid[e]&&h<0.25)C.spray.push([X,Y]); }
      else if(cl===4){ if(h<0.03)C.embers.push([X,Y]); }
      else if(KT.land[k]===3){ if(h<0.05)C.glitter.push([X,Y]); }
      else if(KT.land[k]===4&&KT.cls[e]===3&&dl<10&&h<0.02)C.fog.push([X,Y]);
      if(KT.wall[k]&&y<SW-1&&!KT.wall[kb[i+SW]]&&!KT.liquid[kb[i+SW]]&&h<0.35)C.mist.push([X,Y+LT*0.7]); }
    var cap=function(L,n){ if(L.length<=n)return L; var o=[], st=L.length/n; for(var q=0;q<n;q++)o.push(L[Math.floor(q*st)]); return o; };
    var F={}; if(ZWE.fx('lake','rings')&&C.rings.length)F.rings=cap(C.rings,400); if(ZWE.fx('sea','spray')&&C.spray.length)F.spray=cap(C.spray,400); if(ZWE.fx('marsh','fog')&&C.fog.length>20)F.fog=cap(C.fog,300);
    if(ZWE.fx('cliff','mist')&&C.mist.length>8)F.mist=cap(C.mist,300); if(ZWE.fx('snow','glitter')&&C.glitter.length)F.glitter=cap(C.glitter,500); if(ZWE.fx('lava','embers')&&C.embers.length)F.embers=cap(C.embers,300);
    out.zfx=Object.keys(F).length?F:null;
    if(needFlip&&ZWE.motion&&(ZWE.fx('lake','lap')||ZWE.fx('sea','waves')||ZWE.fx('marsh','lap'))){ var L=WCH*S/2, cv=mkCanvas(L*ZWE.NF,L), g=cv.getContext('2d'), im=g.createImageData(L*ZWE.NF,L), N=_wpNoise(), pn=new Float32Array(L*L), kind=new Uint8Array(L*L), dd=new Float32Array(L*L);
      for(var ly=0;ly<L;ly++)for(var lx=0;lx<L;lx++){ var sx=a0+lx*2, sy=a0+ly*2, si=sy*SW+sx, kk=kb[si], cc=KT.cls[kk], ee=ek[si], dl2=dist[si]===255?99:dist[si]/8*16/S, li=ly*L+lx, wx=D.tx0+sx/S, wy=D.ty0+sy/S;
        pn[li]=N.c(wx*0.45,wy*0.45)*6.3; dd[li]=dl2;
        if((cc===1&&ZWE.fx('lake','lap'))||(cc===3&&ZWE.fx('marsh','lap'))){ if(!KT.liquid[ee]&&dl2<6)kind[li]=1; }
        else if(cc===2&&ZWE.fx('sea','waves')){ if(!KT.liquid[ee]&&dl2<24)kind[li]=2; }
        else if(cc===0&&!KT.wall[kk]&&KT.liquid[ee]&&KT.cls[ee]!==4&&dl2<12)kind[li]=KT.cls[ee]===2?4:3; }      // 3: wet ground beside lapping water, 4: beside the sea
      D._zwe.flip={k:0,L:L,cv:cv,g:g,im:im,pn:pn,kind:kind,dd:dd}; } },
  // one flipbook frame (k of NF; the loop is T seconds): the Lab's lapping and rolling waves, made to repeat
  _frame:function(D,F,k){ var L=F.L, P=F.im.data, W=L*ZWE.NF, u=k/ZWE.NF, tw=u*Math.PI*2, kind=F.kind, dd=F.dd, pn=F.pn;
    for(var i=0;i<L*L;i++){ var t=kind[i]; if(!t)continue; var d=dd[i], ph=pn[i], R=0, G=0, B=0, A=0;
      var put=function(r,g,b,a){ if(a<=0)return; if(a>1)a=1; var ao=a+A*(1-a); if(ao<=0)return; R=(r*a+R*A*(1-a))/ao; G=(g*a+G*A*(1-a))/ao; B=(b*a+B*A*(1-a))/ao; A=ao; };
      if(t===1){ var reach=1.3+2.2*(0.5+0.5*Math.sin(tw+ph)); if(d<reach)put(250,253,255,0.88*Math.pow(1-d/reach,0.45)); else if(d<reach+1.6)put(230,245,250,0.28*(1-(d-reach)/1.6)); }
      else if(t===2){ var P2=9, q=((d+u*P2*2+ph*0.55)%P2+P2)%P2, fade=Math.max(0,1-d/22);
        if(q<1.8){ var band=1-q/1.8; put(d<3.5?255:215,d<3.5?255:236,d<3.5?255:248,band*(d<3.5?0.95:0.6*fade)); } else if(q<4)put(4,20,48,0.2*fade*(1-(q-1.8)/2.2));
        if(d<2.2)put(255,255,255,(0.55+0.4*Math.sin(tw*2+ph*1.3))*0.8); }
      else if(t===3){ var r2=1.2+2.4*(0.5+0.5*Math.sin(tw+ph-0.9)); if(d<r2)put(40,32,20,0.22*(1-d/r2)); }
      else if(t===4){ if(d<2.6)put(40,32,20,0.22*(1-d/2.6)); }
      if(A>0){ var o=((i/L|0)*W+k*L+(i%L))*4; P[o]=R; P[o+1]=G; P[o+2]=B; P[o+3]=A*255; } } },
  // the pieces along the edges: painted ones when the sheets are in, else drawn in code
  PAINT:{tuft:['ed_tuft_a','ed_tuft_b'],dry:['ed_tuft_dry'],reed:['ed_reeds','ed_cattails'],lily:['ed_lily'],pebble:['ed_pebbles'],drift_wood:['ed_driftwood'],mud:['ed_mud_clods'],shell:['ed_shells'],boulder:['ed_foot_boulder','ed_talus_a'],drift:['ed_snow_drift'],ember:['ed_ember_rocks'],shard:['ed_crust_shards'],ice:['ed_ice_shards']},
  painted:function(ty,r){ var Z=_scn(); if(!Z||!ZWE.PAINT[ty])return null; return Z.pick(ZWE.PAINT[ty],r); },
  pieces:function(D,ctx,KL){ if(!ZWE.pieces||typeof ZEdge==='undefined')return; var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, dist=D.dist, ek=D.ek, sp=LT/S, H=ZWE._hash, A=(16/S)*(16/S), L=[];
    for(var y=2;y<SW-2;y++)for(var x=2;x<SW-2;x++){ var i=y*SW+x; if(dist[i]===255)continue; var k=kb[i], e=ek[i], d=dist[i]/8*16/S, wx=x+Math.round(D.tx0*S), wy=y+Math.round(D.ty0*S), h=H(wx,wy,11)/A, lk=KT.land[k], ce=KT.cls[e], le=KT.land[e];
      if(KT.road[k]||KT.pat[k]||KT.road[e]||KT.pat[e])continue;
      if(lk===1&&!KT.wall[e]&&d<=2&&h<(KT.liquid[e]||le===2?0.06:0.022))L.push([y,x,le===5||le===3?'dry':'tuft',h*A]);
      else if((KT.cls[k]===1||KT.cls[k]===3)&&!KT.liquid[e]&&d>=2&&d<=4&&h<0.02)L.push([y,x,'reed',h*A]);
      else if(KT.cls[k]===3&&d>=4&&d<=9&&h<0.006)L.push([y,x,'lily',h*A]);
      else if((lk===2||lk===4||lk===5)&&KT.liquid[e]&&ce!==4&&d>=2&&d<=6&&h<0.022)L.push([y,x,lk===4&&h<0.008?'mud':lk===2&&ce===2&&h<0.004?'drift_wood':'pebble',h*A]);
      else if(lk===2&&ce===2&&d>=3&&d<=5&&h>1/A-0.008)L.push([y,x,'shell',h*A]);
      else if(!KT.wall[k]&&!KT.liquid[k]&&d<=3&&h<0.03&&y>2&&KT.wall[kb[(y-2)*SW+x]])L.push([y,x,'boulder',h*A]);
      else if(lk===5&&d<=2&&h<0.012)L.push([y,x,'boulder',h*A*0.5]);
      else if(lk===3&&!KT.wall[e]&&d<=1&&h<0.06)L.push([y,x,KT.liquid[e]&&h<0.02?'ice':'drift',h*A]);
      else if(lk===6&&ce===4&&d<=3&&h<0.03)L.push([y,x,'ember',h*A]);
      else if(lk===6&&le===6&&d<=2&&h<0.02)L.push([y,x,'shard',h*A]); }
    L.sort(function(a,b){ return a[0]-b[0]; });
    var used={};      // painted pieces are bigger: keep them apart
    L.forEach(function(p){ var X=p[1]*sp, Y=p[0]*sp, r1=H(p[1]+Math.round(D.tx0*S),p[0]+Math.round(D.ty0*S),5), id=ZWE.painted(p[2],r1);
      if(id){ var cell=Math.floor(X/40)+'_'+Math.floor(Y/40); if(used[cell])return; used[cell]=1; if(ZScn.draw(ctx,id,X,Y+4,0))return; }
      var ty=p[2]==='dry'?'tuft':p[2]==='drift_wood'||p[2]==='mud'?'pebble':p[2]==='ice'?'drift':p[2];
      ZEdge._piece(ctx,ty,X,Y,p[3],r1,0.8,p[2]==='dry'?'cliff':'lake',undefined,p[1]); }); }
};
// Dev panel: "Terrain edges: new / old"
function sbEdges(){ try{ localStorage.setItem('zeldara_edges',ZWE.on?'old':'new'); }catch(e){} _sbReload('Terrain edges: '+(ZWE.on?'old look':'new (your Lab picks)')); }
function sbEdgesInit(){ if(typeof document==='undefined')return; var b=document.getElementById('sb-edges'); if(b)b.textContent='🌊 Terrain edges: '+(ZWE.on?'new (Lab picks)':'old look'); }
