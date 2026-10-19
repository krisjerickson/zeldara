// ═══════════════════════════════════════════════════════════════════════
// ║ 77-lab-soulstyle.js — round 68: SOUL-LINES, Lab round B — the line up close, in the world (doc 30 §2).
// ║ Kris picked the World-Tree (round A). Card: try all four line styles in the world — knot band, rune vein, mote stitch, carved groove.
// ║  · Each card shows the same patch of land round one zone's rune, at the game's own scale (32 px a tile), painted with the game's ground
// ║    textures, with the World-Tree's soul-lines through it in that style. A small figure shows the hero's size.
// ║  · Pick the realm (Grasslands, Wetlands, Highlands, Ashlands), day or night, and ▶ Free the spirit: its piece traces out from the
// ║    bindstone while the view eases back and returns (Kris's card: trace + camera pull-back).
// ═══════════════════════════════════════════════════════════════════════
var LSS=(function(){ if(typeof LBR==='undefined'||typeof LSL==='undefined'||!LSL)return null;
  var S={ q:1, night:false, litT:0, WT:44, HT:28, MG:9, ground:{}, win:{}, tex:{}, img:{} }, TAU=Math.PI*2, TS=32;
  var load=function(src){ if(S.img[src])return S.img[src]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } }; im.src=src; S.img[src]=im; return im; };
  var TEX=function(id){ return load('assets/scenery/tex/'+id+'.webp'); };
  var LANDT={1:'tx_grass',2:'tx_marsh',3:'tx_heath',4:'tx_ash'};
  var CLS=function(cl,rg){ var W=WM; if(cl===W.LAND)return LANDT[rg]||'tx_grass'; if(cl===W.ROAD)return 'tx_dirt'; if(cl===W.LAKE||cl===W.RIVER||cl===W.SHALLOW)return 'tx_water'; if(cl===W.OCEAN)return 'tx_water_deep';
    if(cl===W.BEACH)return 'tx_sand'; if(cl===W.CLIFF||cl===W.RIDGE||cl===W.PEAK)return 'tx_rock'; if(cl===W.CHASM)return 'tx_lava'; if(cl===W.VILLAGE)return 'tx_grass_village'; if(cl===W.BRIDGE)return 'tx_planks'; if(cl===W.GATE)return 'tx_cobble'; return 'tx_grass'; };
  // the window: in each realm, the zone whose patch carries the most soul-line
  S.window=function(q){ if(S.win[q])return S.win[q]; var D=LSL.build('sl_tree'), G=D.G, best=null, bl=-1;
    G.Z.filter(function(z){ return z.r===q; }).forEach(function(z){ var x0=z.x-S.WT/2, y0=z.y-S.HT/2, L=0; D.St.forEach(function(s){ for(var i=1;i<s.pts.length;i++){ var p=s.pts[i]; if(p.x>x0&&p.x<x0+S.WT&&p.y>y0&&p.y<y0+S.HT)L+=Math.hypot(p.x-s.pts[i-1].x,p.y-s.pts[i-1].y); } }); if(L>bl){ bl=L; best=z; } });
    return (S.win[q]={z:best,x0:Math.round(best.x-S.WT/2),y0:Math.round(best.y-S.HT/2)}); };
  // the ground of a window, painted once (full game scale)
  S.paintGround=function(q){ var w=S.window(q), key=q, M=LSL.geo().M; if(S.ground[key]&&S.ground[key]._ok)return S.ground[key];
    var cv=S.ground[key]||document.createElement('canvas'); var GW=S.WT+2*S.MG, GH=S.HT+2*S.MG; cv.width=GW*TS; cv.height=GH*TS; var c=cv.getContext('2d'), ok=true;      // a margin round the window, so the pull-back never shows the edge
    for(var ty=0;ty<GH;ty++)for(var tx=0;tx<GW;tx++){ var X=w.x0-S.MG+tx, Y=w.y0-S.MG+ty, i=Y*M.W+X, id=CLS(M.cls[i],M.region[i]), im=TEX(id);
      if(im.complete&&im.naturalWidth){ var u=((X%4)+4)%4*64, v=((Y%4)+4)%4*64; c.drawImage(im,u,v,64,64,tx*TS,ty*TS,TS,TS); } else { ok=false; c.fillStyle='#4a6a3a'; c.fillRect(tx*TS,ty*TS,TS,TS); } }
    c.save(); c.globalAlpha=0.28; c.imageSmoothingEnabled=true; c.drawImage(LabMap.base,w.x0-S.MG,w.y0-S.MG,GW,GH,0,0,cv.width,cv.height); c.restore();      // the map's own colours, softly
    cv._ok=ok; S.ground[key]=cv; return cv; };
  // ── the four line styles (k = pixels per tile) ──
  var strokeSet=function(c,D,w,k,ox,oy,ok,width,style,useGap){ c.strokeStyle=style; c.lineWidth=width; c.lineCap='round'; c.lineJoin='round';
    D.St.forEach(function(s){ var on=false; c.beginPath(); for(var i=0;i<s.pts.length;i++){ var p=s.pts[i]; if(ok(s,i)&&!(useGap&&s.gap[i])){ var x=ox+(p.x-w.x0)*k, y=oy+(p.y-w.y0)*k; if(on)c.lineTo(x,y); else { c.moveTo(x,y); on=true; } } else on=false; } c.stroke(); }); };
  var walk=function(D,w,ok,every,fn){ D.St.forEach(function(s){ var acc=0, sAll=0; for(var i=1;i<s.pts.length;i++){ var a=s.pts[i-1], b=s.pts[i], d=Math.hypot(b.x-a.x,b.y-a.y); if(!ok(s,i)){ acc=0; sAll+=d; continue; }
      while(acc<=d){ var u=d?acc/d:0, x=a.x+(b.x-a.x)*u, y=a.y+(b.y-a.y)*u; if(x>w.x0-S.MG-2&&x<w.x0+S.WT+S.MG+2&&y>w.y0-S.MG-2&&y<w.y0+S.HT+S.MG+2)fn(x,y,Math.atan2(b.y-a.y,b.x-a.x),sAll+acc,s,i); acc+=every; } acc-=d; sAll+=d; } }); };
  var rune=function(c,x,y,a,r,t){ c.save(); c.translate(x,y); c.rotate(a); c.beginPath(); var k=t%4; if(k===0){ c.moveTo(0,-r); c.lineTo(0,r); c.moveTo(0,-r*0.4); c.lineTo(r*0.7,-r); }
      else if(k===1){ c.moveTo(-r*0.6,r); c.lineTo(0,-r); c.lineTo(r*0.6,r); } else if(k===2){ c.moveTo(0,-r); c.lineTo(0,r); c.moveTo(0,-r); c.lineTo(r*0.7,-r*0.3); c.lineTo(0,r*0.3); } else { c.moveTo(-r*0.6,-r*0.8); c.lineTo(r*0.6,r*0.8); c.moveTo(r*0.6,-r*0.8); c.lineTo(-r*0.6,r*0.8); } c.stroke(); c.restore(); };
  var STY={
    band:function(c,D,w,k,ox,oy,ok,t,nt){ var g=nt?1:0.6; strokeSet(c,D,w,k,ox,oy,ok,2.8*k,'rgba(111,227,245,'+(0.14*g+0.06)+')',true); strokeSet(c,D,w,k,ox,oy,ok,1.9*k,'rgba(4,16,24,.75)',true);
      strokeSet(c,D,w,k,ox,oy,ok,1.5*k,'#6fe3f5',true); strokeSet(c,D,w,k,ox,oy,ok,0.62*k,'rgba(10,46,58,.92)',true); strokeSet(c,D,w,k,ox,oy,ok,0.12*k,'rgba(200,250,255,'+(0.4+0.3*Math.sin(t*2))+')',true); },
    vein:function(c,D,w,k,ox,oy,ok,t,nt){ strokeSet(c,D,w,k,ox,oy,ok,1.3*k,'rgba(111,227,245,'+(nt?0.22:0.12)+')',true); c.save(); c.shadowColor='#6fe3f5'; c.shadowBlur=nt?14:8; strokeSet(c,D,w,k,ox,oy,ok,0.26*k,'#d8fbff',true); c.restore();
      c.strokeStyle='#8ff0ff'; c.lineWidth=Math.max(1.2,0.09*k); var n=0; walk(D,w,ok,2.6,function(x,y,a,s){ var side=(n++%2?1:-1)*0.62, px=ox+(x-w.x0)*k-Math.sin(a)*side*k, py=oy+(y-w.y0)*k+Math.cos(a)*side*k; rune(c,px,py,a+Math.PI/2,0.24*k,n); }); },
    stitch:function(c,D,w,k,ox,oy,ok,t,nt){ c.save(); walk(D,w,ok,0.62,function(x,y,a,s){ var b=Math.max(0,Math.sin(s*0.75-t*3.2)), al=0.35+0.65*b*b, px=ox+(x-w.x0)*k, py=oy+(y-w.y0)*k, r=(0.1+0.07*b)*k;
        var gr=c.createRadialGradient(px,py,0,px,py,r*3.4); gr.addColorStop(0,'rgba(220,252,255,'+al+')'); gr.addColorStop(0.35,'rgba(111,227,245,'+(al*0.6)+')'); gr.addColorStop(1,'rgba(111,227,245,0)'); c.fillStyle=gr; c.beginPath(); c.arc(px,py,r*3.4,0,TAU); c.fill(); }); c.restore(); },
    groove:function(c,D,w,k,ox,oy,ok,t,nt){ var pl=0.65+0.35*Math.sin(t*1.8); c.save(); c.translate(0.08*k,0.1*k); strokeSet(c,D,w,k,ox,oy,ok,1.35*k,'rgba(255,248,230,.18)',true); c.restore();
      strokeSet(c,D,w,k,ox,oy,ok,1.3*k,'rgba(30,22,16,.62)',true); strokeSet(c,D,w,k,ox,oy,ok,0.95*k,'rgba(14,10,8,.82)',true);
      c.save(); c.shadowColor='#6fe3f5'; c.shadowBlur=(nt?16:9)*pl; strokeSet(c,D,w,k,ox,oy,ok,0.36*k,'rgba(111,227,245,'+(0.55+0.45*pl)+')',true); c.restore(); strokeSet(c,D,w,k,ox,oy,ok,0.12*k,'rgba(225,253,255,'+(0.5*pl)+')',true); } };
  var CARDS=[
    {id:'ls_band',st:'band',name:'Knot band',desc:'A ribbon of rune-blue light about two tiles wide — two bright edges and a dark core, like carved knotwork — weaving over and under where it crosses.'},
    {id:'ls_vein',st:'vein',name:'Rune vein',desc:'One bright vein of light with small runes stamped along both sides, like the rune border round the old stones.'},
    {id:'ls_stitch',st:'stitch',name:'Mote stitch',desc:'A dotted line of light motes; a slow wave of brightness runs along it, so the land seems to breathe.'},
    {id:'ls_groove',st:'groove',name:'Carved groove',desc:'A groove cut into the ground with light glowing inside it, pulsing softly; by day it reads as carved stone, by night it shines.'}];
  S.draw=function(cv,c,W,H,t,full,id){ var C=CARDS.find(function(x){ return x.id===id; }); if(!C)return; var w=S.window(S.q), D=LSL.build('sl_tree'), G=D.G, z=w.z, gnd=S.paintGround(S.q);
    var age=(performance.now()-S.litT)/1000, tr=S.litT&&age<4.2, zf=tr?1-0.24*Math.sin(Math.min(1,age/3.6)*Math.PI):1;      // the view eases back while it traces
    var k0=Math.min(W/(S.WT*TS),H/(S.HT*TS))*TS, k=k0*zf, cx=W/2, cy=H/2, ox=cx-(z.x-w.x0)*k, oy=cy-(z.y-w.y0)*k;
    c.fillStyle='#05080c'; c.fillRect(0,0,W,H); c.drawImage(gnd,ox-S.MG*k,oy-S.MG*k,(S.WT+2*S.MG)*k,(S.HT+2*S.MG)*k);
    if(S.night){ c.fillStyle='rgba(6,10,30,.62)'; c.fillRect(0,0,W,H); }
    var own=z.i, f=tr?Math.min(1,age/3)*26:1e9;
    var ok=function(s,i){ var o=s.owner[i]; if(o!==own)return o!==undefined; var p=s.pts[i]; return Math.hypot(p.x-z.x,p.y-z.y)<=f; };
    c.save(); STY[C.st](c,D,w,k,ox,oy,ok,t,S.night); c.restore();
    // the bindstone (freed) at the rune, and the hero for scale
    var Z=typeof ZSCN_META!=='undefined'&&ZSCN_META.items, it=Z&&Z.sp_bindstone_free, bx=ox+(z.x-w.x0)*k, by=oy+(z.y-w.y0)*k;
    if(it){ var pg=load('assets/scenery/'+it[0]+'.webp'); if(pg.complete&&pg.naturalWidth){ var hh=2.6*k, ww=hh*it[3]/it[4]; c.drawImage(pg,it[1],it[2],it[3],it[4],bx-ww/2,by-hh*0.82,ww,hh); } }
    else { c.fillStyle='#8a8e96'; c.beginPath(); c.moveTo(bx-0.5*k,by+0.4*k); c.lineTo(bx-0.35*k,by-1.5*k); c.lineTo(bx+0.35*k,by-1.6*k); c.lineTo(bx+0.5*k,by+0.4*k); c.fill(); }
    if(tr&&age<3.2){ c.strokeStyle='rgba(255,255,255,'+(0.8*(1-age/3.2))+')'; c.lineWidth=2; c.beginPath(); c.arc(bx,by,(0.5+age*1.6)*k,0,TAU); c.stroke(); }
    var hx=bx+3.2*k, hy=by+2.2*k; c.fillStyle='rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(hx,hy,0.42*k,0.15*k,0,0,TAU); c.fill(); c.fillStyle='#3a8a4a'; c.fillRect(hx-0.3*k,hy-0.95*k,0.6*k,0.75*k); c.fillStyle='#f0c8a0'; c.beginPath(); c.arc(hx,hy-1.12*k,0.26*k,0,TAU); c.fill(); c.fillStyle='#7a4a24'; c.fillRect(hx-0.28*k,hy-1.4*k,0.56*k,0.16*k);
    c.fillStyle='rgba(3,10,18,.7)'; c.fillRect(8,8,full?380:300,full?34:26); c.fillStyle='#bff6ff'; c.font=(full?15:12)+'px "Segoe UI",sans-serif'; c.textAlign='left';
    c.fillText(['','Grasslands','Wetlands','Highlands','Ashlands'][S.q]+' · '+(typeof _wmZoneName==='function'?_wmZoneName(z.id):z.id)+(S.night?' · night':' · day'),16,full?30:25); };
  LBR.drawers.soulstyle=S.draw;
  S.bind=function(){ document.querySelectorAll('.ss-q').forEach(function(b){ b.onclick=function(){ S.q=+b.dataset.q; S.litT=0; document.querySelectorAll('.ss-q').forEach(function(x){ x.setAttribute('aria-pressed',String(x===b)); }); }; });
    var n=document.getElementById('ss-night'); if(n)n.onchange=function(){ S.night=n.checked; }; var f=document.getElementById('ss-free'); if(f)f.onclick=function(){ S.litT=performance.now(); }; };
  LAB_TABS.push({ id:'soulstyle', name:'Soul-lines up close',
    blurb:'<b>Round 68 — the line up close (Lab round B).</b> You picked <b>the World-Tree</b>. Here is how its soul-lines could look on the ground, at the game\'s own scale, on the game\'s own ground textures, round one zone\'s rune (the little figure is the hero\'s size). Four styles, as you asked: knot band, rune vein, mote stitch, carved groove. Switch realm and day/night, and press <b>▶ Free the spirit</b> to watch its piece trace out from the bindstone while the view eases back. ☆ the style(s) to keep (mixing is fine — e.g. a band by day that glows at night) and note what to change.',
    designs:CARDS.map(function(d){ return {id:d.id,name:d.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); S.bind(); },0);
      return '<div class="sl-bar">'+[1,2,3,4].map(function(q){ return '<button class="vbtn ss-q" data-q="'+q+'" aria-pressed="'+(S.q===q)+'">'+['','🌿 Grasslands','💧 Wetlands','⛰ Highlands','🔥 Ashlands'][q]+'</button>'; }).join('')+
        '<label><input type="checkbox" id="ss-night"'+(S.night?' checked':'')+'> night</label><button class="vbtn" id="ss-free">▶ Free the spirit</button></div>'+
        LBR.sec('Four ways to draw the line','pick any · ⛶ for full screen')+'<div class="br-grid sl-grid">'+CARDS.map(function(d,i){ return LBR.card('soulstyle',d,i,640,420,''); }).join('')+'</div>'; } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('soulstyle'); LBR.TABS.push('soulstyle');
  var st=document.createElement('style'); st.textContent='.ss-q[aria-pressed="true"]{border-color:var(--pick);color:var(--pick)}'; document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'soulstyle',label:'✦ Soul-lines — pick the line\'s look up close',where:'Soul-lines up close tab · 4 styles in the world',done:function(){ return CARDS.some(function(d){ return LBR.picked('soulstyle',d.id); }); },go:function(){ LTODO.goTo('soulstyle','.sl-bar',0); }});
  return S; })();
