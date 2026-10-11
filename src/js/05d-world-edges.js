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
  // Round 41 (Kris, Oct 9: "picks are in for the terrain") — his round 40 cards, added on top:
  //   lake  Damp bank (wet) + Logs and mossy rocks          beach Turquoise shallows (terrace) + Wet-sand shine (sheen, foamdrift)
  //   cliff Grass lip (overhang) + Falling leaves           marsh Lush banks (tint) + Will-o'-wisps ("great") + Rotting logs ("great")
  //   lava  Glowing cracks (crackle) + Pulsing cracks       snow  Frosted grass (tint)
  // blend: '' or a list of the round 40 Lab blends (dither soft stipple wet outline2 terrace overhang tint crackle); land-against-land
  // edges carry both the mountain's grass lip and the snow line's frost. feat: static features drawn with the pieces.
  // Round 43 (Kris, Oct 9: "i picked most of the terrain features") — his Lab "Terrain pieces" picks: every feature and creature card except
  // lake puddles and snow ripples. Ice floes only on water that borders snow; steam rises from the vents.
  PICK:{ land:{style:'layers',blend:['overhang','tint']},
         lake:{style:'ink',blend:['wet'],fx:['lap','rings','dragonflies','fish','butterflies'],feat:['logs','flowers','stones','bramble','icefloe']},
         sea:{style:'ink',blend:['terrace'],fx:['waves','spray','sheen','foamdrift','crabs','gulls'],feat:['shells','wrack','marram','sandripples']},
         marsh:{style:'layers',blend:['tint'],fx:['lap','fog','wisps','frogs','fireflies'],feat:['logs','toadstools','duckweed','mudcracks']},
         lava:{style:'layers',blend:['crackle'],fx:['embers','cracks'],feat:['obsidian','sulphur','basalt','lavaplate','vents']},
         cliff:{fx:['mist','leaves','birds'],feat:['moss','alpine','rubble']}, snow:{fx:['glitter'],feat:['icicles','pines','puddles','reedsdry']} },
  pieces:true, grain:true, motion:true, NF:16, T:4,
  // S: field samples per tile with the new edges (the old look keeps 12). 16 = exactly 2 px a sample on a 32 px tile, so the edges scale cleanly;
  // 14 (2.29 px) and 12 (2.67 px) show steps. 16 costs about a third more paint time than the old look (round 40 measurement). Try others: ?edgeS=14.
  S:(function(){ try{ var m=/[?&]edgeS=(\d+)/.exec(location.search); if(m&&+m[1]>=8&&+m[1]<=20)return +m[1]; }catch(e){} return 16; })(),
  BL:{'':0,dither:1,soft:2,stipple:3,wet:4,outline2:5,terrace:6,overhang:7,tint:8,crackle:9},
  CLS:['land','lake','sea','marsh','lava'],
  // the plain settings the painter (worker) gets
  field:function(){ var P=ZWE.PICK; return {st:ZWE.CLS.map(function(c){ return P[c].style==='ink'?1:2; }),bl:ZWE.CLS.map(function(c){ var b=P[c].blend||[], m=0; (Array.isArray(b)?b:[b]).forEach(function(n){ if(ZWE.BL[n])m|=1<<ZWE.BL[n]; }); return m; })}; },      // bl: a bit per blend
  feat:function(place,f){ var p=ZWE.PICK[place]; return !!(p&&p.feat&&p.feat.indexOf(f)>=0); },
  // round 42: the painted creature for a moving effect, as a game texture (null = the code-drawn particle)
  CRIT:{leaves:['ed_leaf_autumn','ed_leaf_red','ed_leaf_green'],wisps:['ed_wisp'],crabs:['ed_crab'],gulls:['ed_gull'],birds:['ed_crow'],dragonflies:['ed_dragonfly'],fish:['ed_fish'],frogs:['ed_frog'],butterflies:['ed_butterfly'],fireflies:['ed_firefly'],steam:['ed_steam_vent']},
  critTex:function(scene,f){ var Z=_scn(); if(!Z||!ZWE.CRIT[f])return []; var out=[]; ZWE.CRIT[f].forEach(function(id){ if(!Z.has(id))return; try{ var T=Z.texture(scene,id,0,{shadow:false}); if(T&&T.key)out.push(T.key); }catch(e){} }); return out; },
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
      st.step=0.5; return false; }
    if(st.step===0.5){ if(ZWE._cells(D,out,cx,cy,MG,KL))st.step=1; return false; }      // round 46 (lag): the grain and the moving cells in separate steps
    if(st.step===1){ if(!ZWE.motion||!st.flip){ st.step=2; return true; } var F=st.flip, k1=Math.min(ZWE.NF,F.k+1); /* round 44 (lag): one flipbook frame a step */ for(;F.k<k1;F.k++)ZWE._frame(D,F,F.k); if(F.k>=ZWE.NF){ F.g.putImageData(F.im,0,0); out.flip={canvas:F.cv,nf:ZWE.NF,L:F.L,T:ZWE.T,bb:F.bb}; st.step=2; return true; } return false; }
    return true; },
  // where things move (inner chunk only, world px) and whether this chunk needs a flipbook
  _cells:function(D,out,cx,cy,MG,KL){ var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, dist=D.dist, ek=D.ek, a0=MG*S, a1=SW-MG*S, sp=LT/S, ox=D.tx0*LT, oy=D.ty0*LT;
    // round 46 (lag): resumable — a slice of rows per call (the whole scan was one long frame); returns true when done
    var Z=D._zc||(D._zc={y:a0,ly:0,C:{medge:[],rings:[],spray:[],fog:[],mist:[],glitter:[],embers:[],wisps:[],leaves:[],wet:[],edge:[],deep:[],bank:[],air:[],meadow:[]},needFlip:false,crk:null,stage:0});
    var C=Z.C, needFlip=Z.needFlip, H=ZWE._hash, crk=Z.crk, N=_wpNoise(), wantCrk=ZWE.fx('lava','cracks');
    if(Z.stage===2)return ZWE._flipRows(D,Z);
    if(Z.stage===0){ var yEnd=Math.min(a1,Z.y+40);
    for(var y=Z.y;y<yEnd;y++)for(var x=a0;x<a1;x++){ var i=y*SW+x, k=kb[i], cl=KT.cls[k], e=ek[i], dl=dist[i]===255?99:dist[i]/8*16/S, h=H(x+D.tx0*S,y+D.ty0*S,17), X=ox+(x+0.5)*sp, Y=oy+(y+0.5)*sp;
      if(cl===1||cl===3){ if(dl<16&&!KT.liquid[e])needFlip=true; if(dl>3&&h<0.02)(cl===1?C.rings:C.fog).push([X,Y]); if(cl===3&&h<0.004)C.rings.push([X,Y]); if(cl===3&&dl>2&&h>0.985)C.wisps.push([X,Y]); }
      else if(cl===2){ if(dl<24&&!KT.liquid[e])needFlip=true; if(dl<2.5&&!KT.liquid[e]&&h<0.25)C.spray.push([X,Y]); }
      else if(cl===4){ if(h<0.03)C.embers.push([X,Y]); }
      else if(KT.land[k]===3){ if(h<0.05)C.glitter.push([X,Y]); }
      else if(KT.land[k]===4&&KT.cls[e]===3&&dl<10&&h<0.02)C.fog.push([X,Y]);
      if(KT.land[k]===1&&(KT.wall[e]||KT.land[e]===5)&&dl<14&&h>0.97)C.leaves.push([X,Y]);      // round 41: leaves blow over the grass below cliffs and scree
      if(wantCrk&&KT.land[k]===6&&KT.cls[e]===4&&dl<12){ var fx=D.tx0+(x+0.5)/S, fy=D.ty0+(y+0.5)/S, cq=Math.abs(N.v(fx*3.2,fy*3.2)-0.5), w2=0.03*(1-dl/12)+0.008;      // round 41: the glowing cracks, again, to pulse
        if(cq<w2){ if(!crk){ crk=mkCanvas(a1-a0,a1-a0); crk._im=crk.getContext('2d').createImageData(a1-a0,a1-a0); } var o4=((y-a0)*(a1-a0)+(x-a0))*4, P=crk._im.data, am=1-dl/12; P[o4]=255; P[o4+1]=150+80*am; P[o4+2]=60; P[o4+3]=255*Math.min(1,0.4+am); } }
      if(KT.wall[k]&&y<SW-1&&!KT.wall[kb[i+SW]]&&!KT.liquid[kb[i+SW]]&&h<0.35)C.mist.push([X,Y+LT*0.7]);
      // round 42: where the creatures of the Lab's moving cards may appear (used when a place has them in ZWE.PICK[place].fx)
      var lk=KT.land[k], h2=H(x+D.tx0*S,y+D.ty0*S,29);
      if(lk===2&&KT.cls[e]===2&&dl<5&&h2<0.05)C.wet.push([X,Y]); if((cl===1||cl===3)&&!KT.liquid[e]&&dl<8&&h2<0.03)C.edge.push([X,Y]); if(cl===1&&dl>4&&h2<0.01)C.deep.push([X,Y]);
      if((lk===4||lk===1)&&KT.cls[e]===3&&dl<3&&h2<0.05)C.bank.push([X,Y]); if(h2>0.9995)C.air.push([X,Y]); if(cl===2)C._sea=1; if(KT.wall[k])C._cliff=1; if(cl===3&&!KT.liquid[e]&&dl<8&&h2<0.03)C.medge.push([X,Y]); if(lk===1&&KT.cls[e]===1&&dl<14&&h2<0.01)C.meadow.push([X,Y]); }
    Z.y=yEnd; Z.needFlip=needFlip; Z.crk=crk; if(yEnd<a1)return false; Z.stage=1; return false; }
    var cap=function(L,n){ if(L.length<=n)return L; var o=[], st=L.length/n; for(var q=0;q<n;q++)o.push(L[Math.floor(q*st)]); return o; };
    var F={}; if(ZWE.fx('lake','rings')&&C.rings.length)F.rings=cap(C.rings,400); if(ZWE.fx('sea','spray')&&C.spray.length)F.spray=cap(C.spray,400); if(ZWE.fx('marsh','fog')&&C.fog.length>20)F.fog=cap(C.fog,300);
    if(ZWE.fx('cliff','mist')&&C.mist.length>8)F.mist=cap(C.mist,300); if(ZWE.fx('snow','glitter')&&C.glitter.length)F.glitter=cap(C.glitter,500); if(ZWE.fx('lava','embers')&&C.embers.length)F.embers=cap(C.embers,300);
    if(ZWE.fx('marsh','wisps')&&C.wisps.length)F.wisps=cap(C.wisps,120);
    var CR={crabs:['sea','wet'],gulls:['sea','air'],dragonflies:['lake','edge'],fish:['lake','deep'],butterflies:['lake','meadow'],frogs:['marsh','bank'],fireflies:['marsh','medge'],birds:['cliff','air']};
    Object.keys(CR).forEach(function(f){ var q=CR[f]; if((f==='gulls'&&!C._sea)||(f==='birds'&&!C._cliff))return; if((ZWE.fx(q[0],f)||(f==='dragonflies'&&ZWE.fx('marsh',f)))&&C[q[1]].length)F[f]=cap(C[q[1]],200); }); if(ZWE.fx('cliff','leaves')&&C.leaves.length>6)F.leaves=cap(C.leaves,200);
    out.zfx=Object.keys(F).length?F:null;
    if(crk){ crk.getContext('2d').putImageData(crk._im,0,0); delete crk._im; out.cracks=crk; }
    if(needFlip&&ZWE.motion&&(ZWE.fx('lake','lap')||ZWE.fx('sea','waves')||ZWE.fx('marsh','lap'))){ var L=WCH*S/2;
      Z.F={L:L,pn:new Float32Array(L*L),kind:new Uint8Array(L*L),dd:new Float32Array(L*L),n1:new Float32Array(L*L),n2:new Float32Array(L*L),foam:ZWE.fx('sea','foamdrift'),a0:a0}; Z.stage=2; return false; }
    return true; },
  // round 46: the moving-water set-up, a slice of rows per call
  _flipRows:function(D,Z){ var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, dist=D.dist, ek=D.ek, N=_wpNoise(), Q=Z.F, L=Q.L, a0=Q.a0, pn=Q.pn, kind=Q.kind, dd=Q.dd, n1=Q.n1, n2=Q.n2, foam=Q.foam, lyEnd=Math.min(L,Z.ly+48);
      for(var ly=Z.ly;ly<lyEnd;ly++)for(var lx=0;lx<L;lx++){ var sx=a0+lx*2, sy=a0+ly*2, si=sy*SW+sx, kk=kb[si], cc=KT.cls[kk], ee=ek[si], dl2=dist[si]===255?99:dist[si]/8*16/S, li=ly*L+lx, wx=D.tx0+sx/S, wy=D.ty0+sy/S;
        pn[li]=N.c(wx*0.45,wy*0.45)*6.3; dd[li]=dl2; if(foam&&cc===2&&dl2<26){ n1[li]=N.c(wx*0.38,wy*0.38)*0.7+N.v(wx*1.2,wy*1.2)*0.3; n2[li]=N.c(wx*0.38+17,wy*0.38+5)*0.7+N.v(wx*1.2+9,wy*1.2)*0.3; }
        if((cc===1&&ZWE.fx('lake','lap'))||(cc===3&&ZWE.fx('marsh','lap'))){ if(!KT.liquid[ee]&&dl2<6)kind[li]=1; }
        else if(cc===2&&ZWE.fx('sea','waves')){ if(!KT.liquid[ee]&&dl2<24)kind[li]=2; }
        else if(cc===0&&!KT.wall[kk]&&KT.liquid[ee]&&KT.cls[ee]!==4&&dl2<12)kind[li]=KT.cls[ee]===2?4:3; }      // 3: wet ground beside lapping water, 4: beside the sea
      Z.ly=lyEnd; if(lyEnd<L)return false;
      var cv=mkCanvas(L*ZWE.NF,L), g=cv.getContext('2d'), im=g.createImageData(L*ZWE.NF,L);
      var bx0=L, by0=L, bx1=-1, by1=-1; for(var q=0;q<L*L;q++){ if(!kind[q])continue; var qx=q%L, qy=(q/L)|0; if(qx<bx0)bx0=qx; if(qx>bx1)bx1=qx; if(qy<by0)by0=qy; if(qy>by1)by1=qy; }      // only the part that moves is mounted (less to draw each frame)
      if(bx1>=0)D._zwe.flip={k:0,L:L,cv:cv,g:g,im:im,pn:pn,kind:kind,dd:dd,n1:n1,n2:n2,foam:foam,sheen:ZWE.fx('sea','sheen'),bb:[Math.max(0,bx0-2),Math.max(0,by0-2),Math.min(L-1,bx1+2),Math.min(L-1,by1+2)]}; Z.stage=3; return true; },
  // one flipbook frame (k of NF; the loop is T seconds): the Lab's lapping and rolling waves, made to repeat
  _frame:function(D,F,k){ var L=F.L, P=F.im.data, W=L*ZWE.NF, u=k/ZWE.NF, tw=u*Math.PI*2, kind=F.kind, dd=F.dd, pn=F.pn;
    for(var i=0;i<L*L;i++){ var t=kind[i]; if(!t)continue; var d=dd[i], ph=pn[i], R=0, G=0, B=0, A=0;
      var put=function(r,g,b,a){ if(a<=0)return; if(a>1)a=1; var ao=a+A*(1-a); if(ao<=0)return; R=(r*a+R*A*(1-a))/ao; G=(g*a+G*A*(1-a))/ao; B=(b*a+B*A*(1-a))/ao; A=ao; };
      if(t===1){ var reach=1.3+2.2*(0.5+0.5*Math.sin(tw+ph)); if(d<reach)put(250,253,255,0.88*Math.pow(1-d/reach,0.45)); else if(d<reach+1.6)put(230,245,250,0.28*(1-(d-reach)/1.6)); }
      else if(t===2){ var P2=9, q=((d+u*P2*2+ph*0.55)%P2+P2)%P2, fade=Math.max(0,1-d/22);
        if(q<1.8){ var band=1-q/1.8; put(d<3.5?255:215,d<3.5?255:236,d<3.5?255:248,band*(d<3.5?0.95:0.6*fade)); } else if(q<4)put(4,20,48,0.2*fade*(1-(q-1.8)/2.2));
        if(d<2.2)put(255,255,255,(0.55+0.4*Math.sin(tw*2+ph*1.3))*0.8);
        if(F.foam&&d<26){ var cw=0.5+0.5*Math.cos(tw), wv=F.n1[i]*cw+F.n2[i]*(1-cw); if(wv>0.62)put(245,250,255,Math.min(0.6,(wv-0.62)*5)*(1-d/26)); } }      // round 41: patches of foam come and go on the sea
      else if(t===3){ var r2=1.2+2.4*(0.5+0.5*Math.sin(tw+ph-0.9)); if(d<r2)put(40,32,20,0.22*(1-d/r2)); }
      else if(t===4){ if(d<2.6)put(40,32,20,0.22*(1-d/2.6)); if(F.sheen&&d<9){ var q4=((d-u*9*2-ph*0.55)%9+9)%9, a4=q4>4?Math.sin((q4-4)/5*Math.PI):0; if(a4>0)put(215,238,255,a4*0.7*(1-d/9)); } }      // round 41: the wet sand shines as each wave pulls back
      if(A>0){ var o=((i/L|0)*W+k*L+(i%L))*4; P[o]=R; P[o+1]=G; P[o+2]=B; P[o+3]=A*255; } } },
  // the pieces along the edges: painted ones when the sheets are in, else drawn in code
  // how big a painted piece is drawn (share of its painted size) — round 41, after the sheets came in
  PSIZE:{tuft:0.7,dry:0.7,reed:0.75,lily:0.7,pebble:0.7,drift_wood:0.75,mud:0.7,shell:0.6,boulder:0.65,drift:0.7,ember:0.65,shard:0.7,ice:0.6,ash:0.7,shore_rock:0.65,foam:0.7,cliff_grass:0.8,snow_lip:0.8,roots:0.7},
  PDENS:{tuft:0.35,dry:0.35,reed:0.45,lily:0.3,pebble:0.5,boulder:0.45,ember:0.3,drift:0.6,shard:0.5,mud:0.6,ice:0.6},      // share of the places a painted piece is kept (round 41, first look in the world)
  CODEONLY:{ash:1,shore_rock:1,foam:1,cliff_grass:1,snow_lip:1,roots:1},      // these exist only as painted pieces
  PAINT:{ash:['ed_ash_heap'],shore_rock:['ed_shore_rock'],foam:['ed_foam'],cliff_grass:['ed_cliff_grass'],snow_lip:['ed_snow_lip'],roots:['ed_roots','ed_bank'],tuft:['ed_tuft_a','ed_tuft_b'],dry:['ed_tuft_dry'],reed:['ed_reeds','ed_cattails'],lily:['ed_lily'],pebble:['ed_pebbles'],drift_wood:['ed_driftwood'],mud:['ed_mud_clods'],shell:['ed_shells'],boulder:['ed_foot_boulder','ed_talus_a','ed_talus_b'],drift:['ed_snow_drift'],ember:['ed_ember_rocks'],shard:['ed_crust_shards'],ice:['ed_ice_shards']},
  painted:function(ty,r){ var Z=_scn(); if(!Z||!ZWE.PAINT[ty])return null; return Z.pick(ZWE.PAINT[ty],r); },
  // round 43 (Kris, Oct 9: "All of these features you should be able to walk over, but if they are larger it should look like you move behind them, with smaller
  // features you walk on top of ... use your judgement for how dense and dispersed"). Nothing here blocks walking. Each painted piece is now one of:
  //   • TALL — a depth-sorted sprite (the hero passes behind it when he is above its foot, in front of it when below): logs, rocks, reeds, saplings, basalt…
  //   • swaying (ANIM) — a sprite of its own that moves in the wind: its painted frames (wave 43) when they are in, until then the plant leans as one piece;
  //     tall ones are depth-sorted, small ones (tufts, flowers) lie under the hero
  //   • everything else — painted flat into the ground (pebbles, shells, duckweed, puddles, ripples, cracked mud…), walked over
  // LOOK: how many, how grouped, how mixed, how varied in size, how much they sway, how many creatures — my defaults; the Lab's Terrain pieces tab offers the rest.
  // round 46 (Kris: "We should reduce the amount of terrain pieces regardless as they are now so many that they are distracting" → card: to about a
  // third, the edges of water and cliffs favoured): along the edges 0.85 → 0.38, in the open ground 0.21 (inDens), creatures halved.
  LOOK:{dens:0.38,inDens:0.21,clump:0.7,vary:'mixed',size:0.15,sway:1,crit:0.5},
  LOOKS:{dens:{sparse:0.5,natural:0.85,lush:1.4,wild:2},clump:{even:0,clusters:0.7,groves:1},vary:{one:'one',mixed:'mixed',all:'all'},size:{same:0,some:0.15,lots:0.3},sway:{still:0,gentle:1,breezy:2},crit:{few:0.5,some:1,many:2}},
  TALL:{ed_log_fallen:1,ed_log_mossy:1,ed_log_rotting:1,ed_rock_mossy:1,ed_iris:1,ed_dune_grass:1,ed_reeds:1,ed_cattails:1,ed_reeds_dry:1,ed_snow_pine:1,ed_basalt:1,ed_steam_vent:1,ed_foot_boulder:1,ed_talus_a:1,ed_talus_b:1,
    ed_obsidian:1,ed_sulphur:1,ed_snow_rock:1,ed_shore_rock:1,ed_ice_shards:1,ed_bramble:1,ed_toadstools:1,ed_fern:1,ed_heather:1,ed_ember_rocks:1},
  // the animation of a painted piece (wave 43 sheets: <base>_1 … _N); SWAYCODE: may lean as one piece until its frames are in (not the ivy: it hangs from its top)
  ANIM:{ed_reeds:'an_reeds',ed_cattails:'an_cattails',ed_iris:'an_iris',ed_reeds_dry:'an_reeds_dry',ed_dune_grass:'an_dune_grass',ed_tuft_a:'an_tuft_a',ed_tuft_b:'an_tuft_b',ed_tuft_dry:'an_tuft_dry',
    ed_wildflowers:'an_wildflowers',ed_alpine_flowers:'an_alpine_flowers',ed_fern:'an_fern',ed_ivy:'an_ivy',ed_steam_vent:'an_steam_vent',ed_lava_bubble:'an_lava_bubble'},
  SWAYCODE:{ed_reeds:4,ed_cattails:4,ed_iris:4,ed_reeds_dry:4,ed_dune_grass:5,ed_tuft_a:5,ed_tuft_b:5,ed_tuft_dry:5,ed_wildflowers:6,ed_alpine_flowers:6,ed_fern:3},      // degrees of lean at "gentle"
  LOOP:{an_steam_vent:5,an_lava_bubble:3},      // these loop through their frames (frames a second) instead of following the wind
  // the creatures' frames
  CRITANIM:{crabs:'an_crab',frogs:'an_frog',fish:'an_fish',gulls:'an_gull',birds:'an_crow',dragonflies:'an_dragonfly',butterflies:'an_butterfly',wisps:'an_wisp',fireflies:'an_firefly',leaves:'an_leaf'},
  CRITFPS:{crabs:8,frogs:5,fish:4.5,gulls:6,birds:7,dragonflies:20,butterflies:10,wisps:6,fireflies:3,leaves:6},
  frames:function(base){ var Z=_scn(); if(!Z||!base)return 0; var n=0; while(n<8&&Z.has(base+'_'+(n+1)))n++; return n; },
  // the frames of an animation as one game texture (frames '0'…'n-1', lined up on their standing point); null until they are painted
  animTex:function(scene,base){ var n=ZWE.frames(base); if(n<2)return null; var key='zan_'+base; if(scene.textures.exists(key))return scene._zan&&scene._zan[key];
    var RS=ZScn.RES, Z=[], l=0, r=0, u=0, dn=0; for(var i=0;i<n;i++){ var z=ZScn.size(base+'_'+(i+1),0); Z.push(z); l=Math.max(l,z.ax); r=Math.max(r,z.w-z.ax); u=Math.max(u,z.ay); dn=Math.max(dn,z.h-z.ay); }
    var W=Math.ceil(l+r)+2, Hh=Math.ceil(u+dn)+2, c=document.createElement('canvas'); c.width=W*RS*n; c.height=Hh*RS; var g=c.getContext('2d'); g.scale(RS,RS);
    for(i=0;i<n;i++)ZScn.draw(g,base+'_'+(i+1),i*W+1+l,1+u,Z[i].h); var t=scene.textures.addCanvas(key,c); for(i=0;i<n;i++)t.add(String(i),0,i*W*RS,0,W*RS,Hh*RS); try{ t.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){}
    var o={key:key,n:n,ox:(1+l)/W,oy:(1+u)/Hh,h:Z[0].h,w:Z[0].w,fh:Hh,scale:1/RS}; (scene._zan||(scene._zan={}))[key]=o;
    if(scene.anims&&!scene.anims.exists(key)){ var cf=Object.keys(ZWE.CRITANIM).filter(function(f){ return ZWE.CRITANIM[f]===base; })[0]; try{ scene.anims.create({key:key,frames:scene.anims.generateFrameNames(key,{start:0,end:n-1}),frameRate:(cf&&ZWE.CRITFPS[cf])||ZWE.LOOP[base]||6,repeat:-1}); }catch(e){} }
    return o; },
  pieces:function(D,ctx,KL,out){ if(!ZWE.pieces||typeof ZEdge==='undefined')return; var KT=D.KT||WP_KT, S=D.S, SW=D.SW, kb=D.kb, dist=D.dist, ek=D.ek, sp=LT/S, H=ZWE._hash, A=(16/S)*(16/S), L=[], LK=ZWE.LOOK, N=_wpNoise(), dens=LK.dens||1, dIn=LK.inDens||dens, cl=LK.clump||0;
    // clusters: a slow noise over the world makes groups with open ground between them (same in every chunk)
    var clump=function(wx,wy){ if(!cl)return 1; var n=N.v(wx/S*0.11+31.7,wy/S*0.11+5.3); n=Math.max(0,Math.min(1,(n-0.3)/0.45)); return (1-cl)+cl*2.2*n*n*(3-2*n); };
    var NOIN=ZWE._noIn(KL), IC={};      // round 43: features in the open ground too (Kris: "OK for the terrain features to be in the bulk of the terrain as well")
    // round 46 (lag): the scan is resumable — 60 rows a call; false = call again
    var PZ=D._zpc||(D._zpc={y:2,L:[]}); L=PZ.L; var yEnd=Math.min(SW-2,PZ.y+60);
    for(var y=PZ.y;y<yEnd;y++)for(var x=2;x<SW-2;x++){ var i=y*SW+x, far=dist[i]===255||dist[i]/8*16/S>14;
      if(far){ if((x&3)||(y&3))continue; var k0=kb[i]; if(NOIN[k0]||KT.road[k0]||KT.pat[k0]||KT.wall[k0])continue; var ic=IC[k0]; if(ic===undefined)ic=IC[k0]=ZWE._intC(KT,k0);
        if(!ic)continue; var wx0=x+Math.round(D.tx0*S), wy0=y+Math.round(D.ty0*S), hi=H(wx0,wy0,31)/A; if(hi>0.05*dIn*(1+cl*1.3))continue;
        var qi=dIn*clump(wx0,wy0), toti=0, wi=[]; for(var j0=0;j0<ic.length;j0++){ wi[j0]=ic[j0][3]*ZWE._vary(ic[j0][0],wx0/S,wy0/S,ic)*qi; toti+=wi[j0]; }
        if(hi<toti){ var ac0=0; for(j0=0;j0<ic.length;j0++){ ac0+=wi[j0]; if(hi<ac0){ var c0=ic[j0]; if(c0[1]==='piece')L.push([y,x,c0[0],hi*A]); else L.push([y,x,'F',hi*A,c0[0],c0[1],c0[2],1]); break; } } }
        continue; }
      var k=kb[i], e=ek[i], d=dist[i]/8*16/S, wx=x+Math.round(D.tx0*S), wy=y+Math.round(D.ty0*S), h=H(wx,wy,11)/A, lk=KT.land[k], ce=KT.cls[e], le=KT.land[e];
      if(KT.road[k]||KT.pat[k]||KT.road[e]||KT.pat[e])continue; var cq=-1, Q=function(){ if(cq<0)cq=dens*clump(wx,wy); return cq; };
      if(lk===1&&!KT.wall[e]&&d<=2&&h<(KT.liquid[e]||le===2?0.06:0.022)*Q())L.push([y,x,le===5||le===3?'dry':'tuft',h*A]);
      else if((KT.cls[k]===1||KT.cls[k]===3)&&!KT.liquid[e]&&d>=2&&d<=4&&h<0.02*Q())L.push([y,x,'reed',h*A]);
      else if(KT.cls[k]===3&&d>=4&&d<=9&&h<0.006*Q())L.push([y,x,'lily',h*A]);
      else if((lk===2||lk===4||lk===5)&&KT.liquid[e]&&ce!==4&&d>=2&&d<=6&&h<0.022*Q())L.push([y,x,lk===4&&h<0.008?'mud':lk===2&&ce===2&&h<0.004?'drift_wood':'pebble',h*A]);
      else if(lk===2&&ce===2&&d>=3&&d<=5&&h>1/A-0.008)L.push([y,x,'shell',h*A]);
      else if(!KT.wall[k]&&!KT.liquid[k]&&d<=3&&h<0.03*Q()&&y>2&&KT.wall[kb[(y-2)*SW+x]])L.push([y,x,'boulder',h*A]);
      else if(lk===5&&d<=2&&h<0.012*Q())L.push([y,x,'boulder',h*A*0.5]);
      else if(lk===3&&!KT.wall[e]&&d<=1&&h<0.06)L.push([y,x,KT.liquid[e]&&h<0.02?'ice':'drift',h*A]);
      else if(lk===6&&ce===4&&d<=3&&h<0.03*Q())L.push([y,x,'ember',h*A]);
      else if(lk===6&&le===6&&d<=2&&h<0.02*Q())L.push([y,x,'shard',h*A]);
      else if(lk===6&&ce===4&&d>3&&d<=6&&h<0.008)L.push([y,x,'ash',h*A]);
      if(KT.liquid[k]&&!KT.liquid[e]&&ce!==4&&KT.cls[k]!==4&&d>=2&&d<=4&&h>1/A-0.003)L.push([y,x,'shore_rock',h*A]);
      if(KT.cls[k]===2&&!KT.liquid[e]&&d<=1.5&&h>1/A-0.01)L.push([y,x,'foam',h*A]);
      if(lk===1&&y<SW-3&&KT.wall[kb[(y+2)*SW+x]]&&!KT.wall[kb[(y-1)*SW+x]]&&h<0.03)L.push([y,x,'cliff_grass',h*A]);      // grass hanging over a cliff top
      if(lk===3&&y<SW-3&&KT.wall[kb[(y+2)*SW+x]]&&h<0.03)L.push([y,x,'snow_lip',h*A]);
      if((lk===1||lk===4)&&!KT.liquid[k]&&KT.cls[e]===1&&d>=1&&d<=3&&h<0.004)L.push([y,x,'roots',h*A]);
      // the features of the Lab cards Kris picked (ZWE.PICK[place].feat): every one that may stand here is a candidate; LOOK decides how many and which
      var hf=H(wx,wy,23)/A; if(hf<0.6*dens*(1+cl*1.3)){ var cand=ZWE._featC(KT,kb,SW,x,y,k,e,d,lk,ce,le);
        if(cand){ var q=Q(), tot=0, wt=[], tx=wx/S, ty=wy/S; for(var j=0;j<cand.length;j++){ wt[j]=cand[j][3]*ZWE._vary(cand[j][0],tx,ty,cand)*q; tot+=wt[j]; }
          if(hf<tot){ var acc=0; for(j=0;j<cand.length;j++){ acc+=wt[j]; if(hf<acc){ L.push([y,x,'F',h*A,cand[j][0],cand[j][1],cand[j][2]]); break; } } } } } }
    PZ.y=yEnd; if(yEnd<SW-2)return false;
    L.sort(function(a,b){ return a[0]-b[0]; });
    var used={}, ox=D.tx0*LT, oy=D.ty0*LT, feats=[], X0=out?(out.cx*WCH-D.tx0)*LT:-1e9, Y0=out?(out.cy*WCH-D.ty0)*LT:-1e9, IW=WCH*LT;      // painted pieces are bigger: keep them apart (on a world grid, so neighbouring chunks agree)
    var mine=function(X,Y){ return X>=X0&&X<X0+IW&&Y>=Y0&&Y<Y0+IW; };
    // one painted piece: flat into the ground, a depth-sorted sprite, or a swaying sprite (see TALL / ANIM above). foot = where it stands. false = not painted
    var put=function(id,X,foot,h,r){ h*=1+(LK.size||0)*(2*r-1); var an=ZWE.ANIM[id], tall=ZWE.TALL[id], sway=out&&(LK.sway||0)>0&&an&&(ZWE.SWAYCODE[id]||ZWE.frames(an)>1);
      if(out&&(sway||tall)){ if(!mine(X,foot))return true;      // the chunk it stands in shows it
        if(sway){ (out.live||(out.live=[])).push({id:id,an:an,x:X+ox,y:foot+oy,h:h,tall:!!tall,r:r}); return true; }
        var n0=out.sprites.length; if(ZScn.sprite({sprites:out.sprites},id,X,foot,h,{shw:0.4,sha:0.3,sp:{zed:id}})){ for(var q=n0;q<out.sprites.length;q++){ out.sprites[q].x+=ox; out.sprites[q].y+=oy; } return true; } return false; }
      return !!ZScn.draw(ctx,id,X,foot,h); };
    L.forEach(function(p){ var X=p[1]*sp, Y=p[0]*sp, r1=H(p[1]+Math.round(D.tx0*S),p[0]+Math.round(D.ty0*S),5);
      if(p[2]==='F'){ var g0=(ZWE.FSP[p[4]]||64)*(p[7]?1.6:1)/Math.sqrt(dens), lc=p[4]+Math.floor((X+ox)/g0)+'_'+Math.floor((Y+oy)/g0); if(used[lc])return; used[lc]=1; feats.push(p); return; }      // features: drawn last, over the small pieces, one per grid cell
      var id=ZWE.painted(p[2],r1); if(id&&H(p[1]+Math.round(D.tx0*S),p[0]+Math.round(D.ty0*S),9)>(ZWE.PDENS[p[2]]||1))return;      // painted pieces are bigger, so fewer of them
      if(id){ var cell=Math.floor((X+ox)/40)+'_'+Math.floor((Y+oy)/40); if(used[cell])return; used[cell]=1; var Zs=ZScn.size(id,0); if(Zs&&put(id,X,Y+4,Zs.h*(ZWE.PSIZE[p[2]]||0.8),H(p[1],p[0],13)))return; }
      if(ZWE.CODEONLY[p[2]])return;      // a painted-only piece (no stand-in drawn in code)
      var ty=p[2]==='dry'?'tuft':p[2]==='drift_wood'||p[2]==='mud'?'pebble':p[2]==='ice'?'drift':p[2];
      ZEdge._piece(ctx,ty,X,Y,p[3],r1,0.8,p[2]==='dry'?'cliff':'lake',undefined,p[1]); });
    feats.forEach(function(p){ var X=p[1]*sp, Y=p[0]*sp, r1=H(p[1]+Math.round(D.tx0*S),p[0]+Math.round(D.ty0*S),7), ft=p[4], pl=p[5], vr=p[6], Z=_scn();
      if(ft==='vents'&&out&&mine(X,Y)){ out.zfx=out.zfx||{}; (out.zfx.steam=out.zfx.steam||[]).push([X+ox,Y+oy-14]); }      // steam rises from the vents
      var ids=ZWE.FEATPAINT[ft+(vr?'_'+vr:'')+'@'+pl]||ZWE.FEATPAINT[ft+(vr?'_'+vr:'')]||ZWE.FEATPAINT[ft], id=Z&&ids?Z.pick(ids,r1):null;
      if(id){ var Zs=ZScn.size(id,0); if(Zs&&put(id,X,Y+4,Zs.h*(ZWE.FSIZE[ft]||0.75),H(p[1],p[0],19)))return; }
      ZEdge._featPiece(ctx,ft,[p[1],p[0],p[3],vr],X,Y,r1,ft==='logs'?1.3:1,pl); }); return true; },
  // round 43: the features that may stand in the open ground of a kind (away from any edge) — [[feature, place, variant, rate], …] or null.
  // 'piece' entries are the small edge pieces (tufts, lily pads, drifts). Only what Kris picked (ZWE.PICK). Rates are per sample on a quarter-tile grid.
  INTERIOR:{ land:{1:[['flowers','lake',0,0.0035],['bramble','lake',0,0.0008],['logs','lake','rock',0.0004],['tuft','piece',0,0.006]],2:[['shells','sea',0,0.0015],['sandripples','sea',0,0.0015]],
      3:[['icicles','snow','rock',0.001],['pines','snow',0,0.0015],['drift','piece',0,0.002]],4:[['toadstools','marsh',0,0.002],['mudcracks','marsh',0,0.0015],['logs','marsh',0,0.0003]],
      5:[['rubble','cliff',0,0.002],['alpine','cliff',0,0.003]],6:[['obsidian','lava',0,0.002],['sulphur','lava',0,0.0015],['basalt','lava',0,0.001],['vents','lava',0,0.0006]]},
    cls:{3:[['duckweed','marsh',0,0.01],['lily','piece',0,0.004]]} },
  _intC:function(KT,k){ var I=ZWE.INTERIOR, L=(KT.cls[k]&&I.cls[KT.cls[k]])||(!KT.liquid[k]&&I.land[KT.land[k]])||null; if(!L)return null;
    var o=L.filter(function(c){ return c[1]==='piece'||ZWE.feat(c[1],c[0]==='lavabubble'?'lavaplate':c[0]); }); return o.length?o:null; },
  // kinds with no loose features in their open ground: villages, gardens, fields, paved squares
  _noIn:function(KL){ if(ZWE._ni&&ZWE._ni.length===KL.length)return ZWE._ni; var a=new Uint8Array(KL.length); KL.forEach(function(K,i){ if(/^(v[a-z]|garden|plaza|square|street|crop|soil|floor|path|trail)/.test(K.id||''))a[i]=1; }); return (ZWE._ni=a); },
  // how much of each candidate feature a stretch of edge gets (LOOK.vary): one — a single kind per stretch; mixed — a main kind with others among it; all — even
  _fo:function(f){ var n=0; for(var i=0;i<f.length;i++)n=(n*31+f.charCodeAt(i))%997; return n*0.37; },
  _vary:function(f,tx,ty,cand){ var m=ZWE.LOOK.vary; if(m==='all')return 1; var N=_wpNoise(), nf=function(g){ var o=ZWE._fo(g); return N.c(tx*0.07+o,ty*0.07-o*0.6); };
    if(m==='one'){ var best=null, bv=-1; cand.forEach(function(c){ var v=nf(c[0]); if(v>bv){ bv=v; best=c[0]; } }); return f===best?1.6:0.04; }
    var v=nf(f); return 0.25+2.2*v*v; },
  // round 43: the static features that may stand at a sample — [[feature, place, variant, rate], …] or null (rate: the share of samples it takes at density 1)
  _featC:function(KT,kb,SW,x,y,k,e,d,lk,ce,le){ var cl=KT.cls[k], wat=KT.liquid[k]&&cl!==4;
    var place=cl===3||(lk===4&&ce===3)||ce===3?'marsh':cl===1||ce===1?'lake':cl===2||ce===2?'sea':cl===4||ce===4||lk===6?'lava':lk===3||le===3?'snow':(KT.wall[k]||KT.wall[e]||lk===5||le===5)?'cliff':null;
    if(!place)return null; var P=ZWE.PICK[place]; if(!P||!P.feat||!P.feat.length)return null; var o=[], has=function(f){ return P.feat.indexOf(f)>=0; }, add=function(f,v,r){ o.push([f,place,v,r]); };
    if(has('logs')){ if((wat&&!KT.liquid[e]&&d>=1&&d<=3)||(lk===4&&KT.liquid[e]&&d<=2))add('logs',0,0.0016); else if(place==='lake'&&lk===1&&KT.liquid[e]&&d>=3&&d<=6)add('logs','rock',0.003); }
    if(has('flowers')&&lk===1&&KT.liquid[e]&&d>=2&&d<=9){ if(d<=3)add('flowers','iris',0.01); else add('flowers',0,0.03); }      // irises only at the water's edge
    if(has('stones')&&wat&&!KT.liquid[e]&&d>=2&&d<=6)add('stones',0,0.012);
    if(has('shells')&&lk===2&&ce===2&&d>=2&&d<=10)add('shells',0,0.012);
    if(has('wrack')&&lk===2&&ce===2&&d>=6&&d<=8)add('wrack',0,0.09);
    if(has('marram')&&lk===2&&le===1&&d<=8)add('marram',0,0.03);
    if(has('moss')&&KT.wall[k]){ for(var q=1;q<=20;q++){ var yq=y+q; if(yq>=SW)break; if(!KT.wall[kb[yq*SW+x]]){ if(q<=12)add('moss',q,0.02); break; } } }
    if(has('alpine')&&lk===1&&d<=14)add('alpine',0,0.02);
    if(has('rubble')&&!KT.wall[k]&&!KT.liquid[k]&&y>3&&KT.wall[kb[(y-3)*SW+x]]&&d<=6)add('rubble',0,0.12);
    if(has('toadstools')&&lk===4&&d>=1&&d<=5)add('toadstools',0,0.01);
    if(has('duckweed')&&wat&&d<=7)add('duckweed',0,0.22);
    if(has('obsidian')&&lk===6&&d<=8)add('obsidian',0,0.012);
    if(has('sulphur')&&lk===6&&d<=10)add('sulphur',0,0.008);
    if(has('basalt')&&lk===6&&ce===4&&d>=1&&d<=7)add('basalt',0,0.03);
    if(has('icicles')){ if(KT.wall[k]&&y<SW-1&&!KT.wall[kb[(y+1)*SW+x]])add('icicles','ice',0.5); else if(lk===3&&d>=3)add('icicles','rock',0.004); }
    if(has('pines')&&lk===1&&(le===3||le===5)&&d>=2&&d<=9)add('pines',0,0.012);
    if(has('puddles')&&(lk===1||lk===5)&&(le===3||le===5))add('puddles',0,0.004);
    if(has('sandripples')&&lk===2&&d>=6)add('sandripples',0,0.004);
    if(has('snowripples')&&lk===3&&d>=4)add('snowripples',0,0.003);
    if(has('mudcracks')&&lk===4&&d>=3)add('mudcracks',0,0.004);
    if(has('puddle')&&(lk===1||lk===4)&&KT.liquid[e]&&d>=4&&d<=10)add('puddle',0,0.003);
    if(has('reedsdry')&&lk===3&&KT.liquid[e]&&d<=3)add('reedsdry',0,0.02);
    if(has('bramble')&&lk===1&&d>=3&&d<=10)add('bramble',0,0.004);
    if(has('icefloe')&&wat&&d>=3&&d<=8&&(le===3||KT.land[e]===3))add('icefloe',0,0.01);      // floes only on water that borders snow
    if(has('vents')&&lk===6&&ce===4&&d>=2&&d<=8)add('vents',0,0.004);
    if(has('lavaplate')&&cl===4&&d>3){ add('lavaplate',0,0.0018); add('lavabubble',0,0.0012); }
    return o.length?o:null; },
  // round 42: the painted pictures of the features (wave 42 sheets) — ids per feature, optionally per variant and place
  FEATPAINT:{'logs@lake':['ed_log_fallen','ed_log_mossy'],'logs@marsh':['ed_log_rotting','ed_log_mossy'],logs:['ed_log_fallen'],logs_rock:['ed_rock_mossy'],flowers:['ed_wildflowers','ed_clover'],flowers_iris:['ed_iris'],stones:['ed_stepping_stones'],
    shells:['ed_tide_pool','ed_shells'],wrack:['ed_wrack'],marram:['ed_dune_grass'],moss:['ed_ivy','ed_moss_patch'],alpine:['ed_alpine_flowers','ed_heather','ed_lichen_rock'],rubble:['ed_talus_b','ed_talus_a'],toadstools:['ed_toadstools','ed_fern'],
    duckweed:['ed_duckweed'],obsidian:['ed_obsidian'],sulphur:['ed_sulphur'],basalt:['ed_basalt'],icicles_ice:['ed_icicles'],icicles_rock:['ed_snow_rock'],pines:['ed_snow_pine'],puddles:['ed_frozen_puddle'],sandripples:['ed_sand_ripples'],snowripples:['ed_snow_ripples'],mudcracks:['ed_cracked_mud'],puddle:['ed_puddle'],reedsdry:['ed_reeds_dry'],bramble:['ed_bramble'],icefloe:['ed_ice_floe'],lavaplate:['ed_lava_plate'],vents:['ed_steam_vent'],lavabubble:['ed_lava_bubble']},
  FSP:{logs:150,flowers:48,stones:72,shells:60,wrack:120,marram:64,moss:72,alpine:56,rubble:90,toadstools:64,duckweed:64,obsidian:64,sulphur:64,basalt:110,icicles:80,pines:96,puddles:140,sandripples:140,snowripples:140,mudcracks:120,puddle:140,reedsdry:64,bramble:110,icefloe:110,lavaplate:110,vents:140,lavabubble:110},      // spacing grid (world px) per feature
  FSIZE:{logs:0.85,flowers:0.7,stones:0.75,shells:0.7,wrack:0.75,marram:0.75,moss:0.8,alpine:0.7,rubble:0.7,toadstools:0.7,duckweed:0.8,obsidian:0.7,sulphur:0.7,basalt:0.75,icicles:0.8,pines:0.85,puddles:0.75},
};
// Dev panel: "Terrain edges: new / old"
function sbEdges(){ try{ localStorage.setItem('zeldara_edges',ZWE.on?'old':'new'); }catch(e){} _sbReload('Terrain edges: '+(ZWE.on?'old look':'new (your Lab picks)')); }
function sbEdgesInit(){ if(typeof document==='undefined')return; var b=document.getElementById('sb-edges'); if(b)b.textContent='🌊 Terrain edges: '+(ZWE.on?'new (Lab picks)':'old look'); }
