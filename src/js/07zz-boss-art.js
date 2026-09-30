// ═══════════════════════════════════════════════════════════════════════
// ║ PAINTED BOSSES (round 7) — every boss (guardian phases, allies, castle
// ║ wardens, mage-tower masters, island guardians, volcano bosses, elites)
// ║ gets a layered, painted sprite in the Fairy-Monarch style, growing with
// ║ each phase. Shared by the game (09f-boss-rig.js) and the Design Lab.
// ║
// ║ A design: {id, name, arch, h (world px tall), pal:{a,b,m,g,s,e}, parts…,
// ║            motion, pace, lore}. Painted in UNIT space (feet at 0,0; the
// ║ body is ~100 units tall; y is negative upwards), scaled to h.
// ║ Output per design (cached): {body:[4 canvases], back: canvas, pupil?,
// ║            W,H (canvas px), ox,oy (feet position in the canvas), k (px per unit)}
// ║ Frames: 0 idle, 1 idle (flicker), 2 wind-up, 3 strike.  The back layer
// ║ (aura, cape, wings, rings, banner) is animated separately by the rig.
// ║ Painting happens on first use (a fight) — never at load.
// ═══════════════════════════════════════════════════════════════════════
var BOSS_ART={}, BOSS_ART_LIST=[], BOSS_SLOTS={}, BOSS_SLOT_LIST=[];
// Kris picks one option per boss slot in the Design Lab (Bosses tab); default = option a
var BOSS_PICK={};
var BA={ RES:1.25, cache:{},
  // id 'slot.a' → option a of a slot (the slot id is the CHAR id / elite key the game uses)
  def:function(d){ var m=/^(.*)\.([a-z])$/.exec(d.id); if(m){ d.slot=m[1]; d.opt=m[2]; if(!BOSS_SLOTS[d.slot]){ BOSS_SLOTS[d.slot]=[]; BOSS_SLOT_LIST.push(d.slot); } BOSS_SLOTS[d.slot].push(d); }
    BOSS_ART[d.id]=d; BOSS_ART_LIST.push(d); return d; },
  // units box per archetype: [left, right, top, bottom] around the feet (0,0)
  PIVOT:{orb:-96,golem:-78},
  BOX:{hum:[-78,78,-150,14],drake:[-120,150,-150,14],wyrm:[-86,100,-182,16],golem:[-84,84,-138,14],orb:[-92,92,-176,18],bird:[-110,110,-140,14],kraken:[-96,96,-128,16],toad:[-90,90,-118,14]},
  // ── colour / drawing helpers (x = 2d context in unit space) ──
  lin:function(x,x0,y0,x1,y1,stops){ var g=x.createLinearGradient(x0,y0,x1,y1); stops.forEach(function(s){ g.addColorStop(s[0],s[1]); }); return g; },
  rad:function(x,cx,cy,r0,r1,stops){ var g=x.createRadialGradient(cx,cy,r0,cx,cy,r1); stops.forEach(function(s){ g.addColorStop(s[0],s[1]); }); return g; },
  ol:function(x,w,a){ x.lineJoin='round'; x.lineCap='round'; x.strokeStyle='rgba(12,8,14,'+(a===undefined?0.72:a)+')'; x.lineWidth=w||1.4; x.stroke(); },
  ell:function(x,cx,cy,rx,ry,rot){ x.beginPath(); x.ellipse(cx,cy,Math.max(0.1,rx),Math.max(0.1,ry),rot||0,0,Math.PI*2); },
  poly:function(x,pts,close){ x.beginPath(); pts.forEach(function(p,i){ if(i)x.lineTo(p[0],p[1]); else x.moveTo(p[0],p[1]); }); if(close!==false)x.closePath(); },
  // shaded fill: light from the upper left
  fillSh:function(x,col,x0,y0,x1,y1,amt){ amt=amt===undefined?0.28:amt; x.fillStyle=BA.lin(x,x0,y0,x1,y1,[[0,shade(col,amt)],[0.55,col],[1,shade(col,-amt*1.2)]]); x.fill(); },
  glow:function(x,cx,cy,r,col,a){ x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=BA.rad(x,cx,cy,0,r,[[0,rgba(col,a===undefined?0.9:a)],[0.45,rgba(col,(a===undefined?0.9:a)*0.35)],[1,rgba(col,0)]]); x.fillRect(cx-r,cy-r,r*2,r*2); x.restore(); },
  limb:function(x,x0,y0,x1,y1,w,col,col2){ x.lineCap='round'; x.strokeStyle='rgba(12,8,14,.75)'; x.lineWidth=w+2.4; x.beginPath(); x.moveTo(x0,y0); x.lineTo(x1,y1); x.stroke();
    x.strokeStyle=BA.lin(x,x0-w,y0,x1+w,y1,[[0,shade(col,0.25)],[1,col2||shade(col,-0.25)]]); x.lineWidth=w; x.beginPath(); x.moveTo(x0,y0); x.lineTo(x1,y1); x.stroke(); },
  // anchor points (head / chest / shoulders) recorded while painting, in canvas px, so shared
  // 'signature' elements (07zz-boss-sig.js: crowns, hats, chest stars, rocks …) can sit on any archetype.
  // pr = priority: a rider / fused sorcerer (2) beats the beast (1).
  _A:{}, anc:function(x,name,ax,ay,r,pr){ var m=x.getTransform(), o=BA._A[name]; pr=pr||1; if(o&&o.pr>pr)return; var s=Math.hypot(m.a,m.b); BA._A[name]={x:m.a*ax+m.c*ay+m.e,y:m.b*ax+m.d*ay+m.f,s:s,r:(r||8)*s,pr:pr}; },
  rnd:function(seed){ var s=seed>>>0||1; return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; },
  hash:function(str){ var h=2166136261; for(var i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; },
  // floating particles in the frame (different per frame → flicker)
  motes:function(x,D,f,box){ var kind=D.motes; if(!kind||BA._measure)return; var R=BA.rnd(BA.hash(D.id)+f*97), n=D.moteN||16, col=D.pal.g;
    for(var i=0;i<n;i++){ var px=box[0]+R()*(box[1]-box[0]), py=box[2]*0.9+R()*(-box[2]*0.95), a=0.35+R()*0.55, s=0.8+R()*1.6;
      if(kind==='embers'){ x.fillStyle=rgba(i%3?col:'#ffe0a0',a); x.fillRect(px,py,s,s); }
      else if(kind==='snow'){ x.fillStyle=rgba('#f0f8ff',a); x.beginPath(); x.arc(px,py,s*0.8,0,6.3); x.fill(); }
      else if(kind==='smoke'){ x.fillStyle=rgba(D.pal.b,a*0.35); x.beginPath(); x.arc(px,py,s*3,0,6.3); x.fill(); }
      else if(kind==='sparks'){ x.strokeStyle=rgba(col,a); x.lineWidth=0.8; x.beginPath(); x.moveTo(px,py); x.lineTo(px+3,py+4); x.lineTo(px+1,py+6); x.stroke(); }
      else if(kind==='bubbles'){ x.strokeStyle=rgba(col,a); x.lineWidth=0.7; x.beginPath(); x.arc(px,py,s*1.2,0,6.3); x.stroke(); }
      else if(kind==='leaves'){ x.fillStyle=rgba(i%2?'#7ab04a':'#c8a040',a); BA.ell(x,px,py,s*1.4,s*0.7,i); x.fill(); }
      else if(kind==='runes'){ x.strokeStyle=rgba(col,a); x.lineWidth=0.8; x.beginPath(); x.moveTo(px,py-3); x.lineTo(px,py+3); x.moveTo(px,py-1); x.lineTo(px+2.5,py-3); x.moveTo(px,py+1); x.lineTo(px-2.5,py-1); x.stroke(); }
      else if(kind==='stars'){ BA.glow(x,px,py,s*2.4,i%2?col:'#ffffff',a); }
      else { BA.glow(x,px,py,s*2,col,a); } } },
  // light + rim pass over everything painted so far (source-atop keeps it inside the silhouette)
  lightPass:function(x,box,D){ x.save(); x.globalCompositeOperation='source-atop';
    x.fillStyle=BA.lin(x,box[0],box[2],box[1]*0.3,0,[[0,'rgba(255,245,230,.16)'],[0.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,10,.22)']]); x.fillRect(box[0],box[2],box[1]-box[0],box[3]-box[2]);
    x.fillStyle=BA.lin(x,box[1]*0.25,0,box[1],0,[[0,rgba(D.pal.g,0)],[1,rgba(D.pal.g,D.rim===undefined?0.28:D.rim)]]); x.fillRect(box[0],box[2],box[1]-box[0],box[3]-box[2]); x.restore(); },

  // ── paint one design → {body[4], back, W,H,ox,oy,k} ──
  // solid silhouette height (px) of a canvas — used to make every boss exactly D.h tall
  solidH:function(c){ var d=c.getContext('2d').getImageData(0,0,c.width,c.height).data, w=c.width, top=-1, bot=-1;
    for(var y=0;y<c.height&&top<0;y+=2)for(var x=0;x<w;x+=2)if(d[(y*w+x)*4+3]>215){ top=y; break; }
    for(var y2=c.height-1;y2>=0&&bot<0;y2-=2)for(var x2=0;x2<w;x2+=2)if(d[(y2*w+x2)*4+3]>215){ bot=y2; break; }
    return top<0?0:bot-top; },
  paint:function(D){ if(BA.cache[D.id])return BA.cache[D.id];
    if(D._kfix===undefined){ D._kfix=1; BA._measure=true; var t; try{ t=BA._paint(D); } finally{ BA._measure=false; } var h=BA.solidH(t.body[0]); if(h>8){ D._kfix=Math.max(0.55,Math.min(1.9,D.h*BA.RES/h)); } }   // measured without floating motes
    var out=BA._paint(D); BA.cache[D.id]=out; return out; },
  _paint:function(D){
    var box=(D.box||BA.BOX[D.arch]||BA.BOX.hum).slice(); if(D.sig&&BA.sigPad)BA.sigPad(D,box); var k=D.h/100*BA.RES*(D._kfix||1), pad=4, W=Math.ceil((box[1]-box[0])*k)+pad*2, H=Math.ceil((box[3]-box[2])*k)+pad*2, ox=pad-box[0]*k, oy=pad-box[2]*k;
    var mk=function(){ var c=mkCanvas(W,H), x=c.getContext('2d'); x.translate(ox,oy); x.scale(k,k); return {c:c,x:x}; };
    var A=BA.ARCH[D.arch]||BA.ARCH.hum, out={body:[],back:null,W:W,H:H,ox:ox,oy:oy,k:k,D:D};
    var bk=mk(); if(A.back)A.back(bk.x,D,box); if(D.sig&&BA.sigBack)BA.sigBack(bk.x,D,box); out.back=bk.c;
    for(var f=0;f<4;f++){ var L=mk(); BA._A={}; A.body(L.x,D,f,box); if(D.sig&&BA.sigBody)BA.sigBody(L.x,D,f,box,k); out.body.push(L.c); }
    if(A.pupil){ var pu=mk(); A.pupil(pu.x,D,box); out.pupil=pu.c; }
    return out; },
  // small square frames (Tome, portraits): painted once, then the big canvases are dropped
  thumbs:function(D,sz){ sz=sz||96; var k='_th'+sz; if(D[k])return D[k]; var had=!!BA.cache[D.id], P=BA.paint(D), bx=BA.BOX[D.arch]||BA.BOX.hum;
    var cw=P.W, top=P.oy-D.h*1.12*BA.RES*(D._kfix||1)/(D._kfix||1), hgt=P.oy-Math.max(0,top)+6*BA.RES, side=Math.max(hgt,Math.min(cw,hgt*1.25)), sx=P.ox-side/2, sy=P.oy+6*BA.RES-side;
    D[k]=[0,1,2,3].map(function(f){ var c=mkCanvas(sz,sz), x=c.getContext('2d'); x.drawImage(P.back,sx,sy,side,side,0,0,sz,sz); x.drawImage(P.body[f],sx,sy,side,side,0,0,sz,sz); if(P.pupil)x.drawImage(P.pupil,sx,sy,side,side,0,0,sz,sz); return c; });
    if(!had&&!(typeof BossRig!=='undefined'&&BossRig.keys.indexOf('ba_'+D.id)>=0))delete BA.cache[D.id]; return D[k]; },
  // drop cached canvases (keep the newest n)
  trim:function(keep){ var ids=Object.keys(BA.cache); if(ids.length<=keep)return; ids.slice(0,ids.length-keep).forEach(function(id){ delete BA.cache[id]; }); },
  // one packed canvas: [body0 body1 body2 body3 back (pupil)] — for Phaser textures
  sheet:function(D){ var P=BA.paint(D), n=P.pupil?6:5, c=mkCanvas(P.W*n,P.H), x=c.getContext('2d');
    P.body.forEach(function(b,i){ x.drawImage(b,i*P.W,0); }); x.drawImage(P.back,4*P.W,0); if(P.pupil)x.drawImage(P.pupil,5*P.W,0); return {c:c,P:P,n:n}; },
  // design for a CHAR id / elite key / MON rid
  of:function(id){ if(!id)return null; var L=BOSS_SLOTS[id]; if(L){ var o=BOSS_PICK[id]||'a'; return L.find(function(d){ return d.opt===o; })||L[0]; } return BOSS_ART[id]||null; },

  // ── preview (Lab + Tome): draw the rigged boss into a 2d context at (cx,cy)=feet, scale s, time t ──
  drawPreview:function(ctx,D,cx,cy,s,t,frame,opt){ var P=BA.paint(D), M=BA.MOTION[D.motion]||BA.MOTION.stride; opt=opt||{};
    var st=M.pose(t,opt.moving?1:0.3,D), W=P.W/BA.RES*s, H=P.H/BA.RES*s, dx=cx-P.ox/BA.RES*s, dy=cy-P.oy/BA.RES*s+st.y*s;
    ctx.save(); ctx.globalAlpha=0.3*(st.shadow||1); ctx.fillStyle='#000'; ctx.beginPath(); ctx.ellipse(cx,cy+2*s,D.h*0.28*s*(st.shadow||1),D.h*0.06*s,0,0,Math.PI*2); ctx.fill(); ctx.restore();
    // back layer: flap / rotate around the feet column
    var pv=(BA.PIVOT[D.arch]||0)*(D.h/100)*(D._kfix||1)*s; ctx.save(); ctx.globalAlpha=st.a; ctx.translate(cx,dy+P.oy/BA.RES*s+pv); ctx.rotate(D.orb==='heart'?0:(st.backRot||0)); ctx.translate(0,-pv); ctx.scale(st.flap,st.flapY===undefined?1:st.flapY); ctx.drawImage(P.back,-P.ox/BA.RES*s,-P.oy/BA.RES*s,W,H); ctx.restore();
    if(st.ghost){ ctx.save(); ctx.globalAlpha=st.ghost; ctx.globalCompositeOperation='lighter'; ctx.drawImage(P.body[frame],dx+st.gx*s,dy,W,H); ctx.restore(); }
    ctx.save(); ctx.globalAlpha=st.a; ctx.translate(cx,dy+P.oy/BA.RES*s); ctx.rotate(st.rot||0); ctx.scale(st.sx,st.sy); ctx.drawImage(P.body[frame],-P.ox/BA.RES*s,-P.oy/BA.RES*s,W,H);
    if(P.pupil){ var px=Math.sin(t*0.7)*6*s, py=Math.cos(t*0.9)*3*s; ctx.drawImage(P.pupil,-P.ox/BA.RES*s+px,-P.oy/BA.RES*s+py,W,H); }
    ctx.restore(); },

  // ── motion personalities: how the rig moves each layer (t seconds, mv 0..1 moving) ──
  // pose → {y offset (world px, − up), sx, sy (body scale), rot, flap (back layer x-scale), a (alpha), ghost…}
  MOTION:{
    stride:{ n:'Slow, daunting stride', pace:0.8, step:1.1, shake:0.0022, pose:function(t,mv){ var s=Math.sin(t*3.2); return {y:-Math.abs(s)*2.2*mv, sx:1, sy:1+Math.sin(t*1.6)*0.012, rot:s*0.02*mv, flap:1+Math.sin(t*1.3)*0.03, a:1, backRot:s*0.015*mv}; } },
    lumber:{ n:'Earth-shaking lumber', pace:0.65, step:1.5, shake:0.004, pose:function(t,mv){ var s=Math.sin(t*2.2); return {y:-Math.max(0,s)*3*mv, sx:1+Math.max(0,-s)*0.035*mv, sy:1-Math.max(0,-s)*0.035*mv+Math.sin(t*1.1)*0.01, rot:s*0.03*mv, flap:1, a:1}; } },
    prowl:{ n:'Prowling beast', pace:1, pose:function(t,mv){ var s=Math.sin(t*4.4); return {y:-Math.abs(s)*1.5*mv, sx:1, sy:1+Math.sin(t*1.8)*0.018, rot:Math.sin(t*2.2)*0.015, flap:1+Math.sin(t*1.8)*0.05, a:1}; } },
    hover:{ n:'Hovering, drifting', pace:0.9, pose:function(t){ var s=Math.sin(t*1.7); return {y:-8+s*4, sx:1, sy:1+Math.sin(t*1.7+1)*0.015, rot:Math.sin(t*0.9)*0.02, flap:0.88+Math.sin(t*3.4)*0.1, a:1, shadow:0.8-s*0.08}; } },
    glide:{ n:'Gliding on unseen currents', pace:0.85, pose:function(t){ var s=Math.sin(t*1.3); return {y:-4+s*2.5, sx:1, sy:1+Math.sin(t*1.3+1)*0.012, rot:Math.sin(t*0.7)*0.025, flap:1+Math.sin(t*2)*0.04, a:1, shadow:0.9}; } },
    sway:{ n:'Hobbling, swaying gait', pace:0.9, pose:function(t,mv){ var s=Math.sin(t*2.6); return {y:-Math.abs(s)*2*mv, sx:1, sy:1+Math.sin(t*1.5)*0.015, rot:s*0.06, flap:1, a:1}; } },
    phase:{ n:'Slips between planes (fades, flickers, afterimages)', pace:1.05, veil:true, pose:function(t){ var s=Math.sin(t*1.9), fl=Math.sin(t*23)*Math.sin(t*3.1); return {y:-10+s*3, sx:1, sy:1, rot:Math.sin(t*0.8)*0.03, flap:0.9+Math.sin(t*2.6)*0.08, a:0.62+0.3*(0.5+0.5*Math.sin(t*1.3))-(fl>0.8?0.3:0), ghost:0.25+0.15*Math.sin(t*2.1), gx:Math.sin(t*1.1)*10, shadow:0.6}; } },
    blur:{ n:'Blindingly fast — leaves afterimages', pace:1.3, trail:true, pose:function(t,mv){ var s=Math.sin(t*6); return {y:-Math.abs(s)*1.5*mv, sx:1, sy:1+Math.sin(t*2.4)*0.012, rot:0.04*mv, flap:1+Math.sin(t*3)*0.05, a:1}; } },
    slither:{ n:'Slithering, coiling', pace:1, pose:function(t){ var s=Math.sin(t*2.1); return {y:0, sx:1+s*0.025, sy:1-s*0.02, rot:s*0.05, flap:1, a:1}; } },
    pulse:{ n:'A beating, pulsing core', pace:0.7, pose:function(t){ var b=Math.max(0,Math.sin(t*5.2))*Math.max(0,Math.sin(t*2.6)); return {y:-12+Math.sin(t*1.2)*4, sx:1+b*0.06, sy:1+b*0.06, rot:0, flap:1+b*0.04, a:1, backRot:t*0.3, shadow:0.7}; } },
    still:{ n:'Immovable engine (rings turn)', pace:0.6, pose:function(t){ return {y:0, sx:1, sy:1+Math.sin(t*1.2)*0.006, rot:0, flap:1, a:1, backRot:t*0.25}; } },
    fly:{ n:'Beating wings, swooping', pace:1.15, trail:true, pose:function(t){ var s=Math.sin(t*4.6); return {y:-14+s*5, sx:1, sy:1, rot:Math.sin(t*1.4)*0.04, flap:0.72+0.28*(0.5+0.5*s), a:1, shadow:0.6}; } },
    flit:{ n:'Darting', pace:1.2, pose:function(t){ var s=Math.sin(t*7); return {y:-6+s*3, sx:1, sy:1, rot:0, flap:0.7+0.3*(0.5+0.5*s), a:1, shadow:0.7}; } }
  },
  ARCH:{}
};

// ═══════════════════════ HUMANOID ═══════════════════════
// parts: build, lower, armor, head, gear, horns, beard, weapon, off, cape, wings, extras[], motes, staffTop
BA.hum={
  geo:function(D){ var b=D.build||'normal', g={SW:16,HW:10.5,leg:44,headR:9,neckY:-80,bulk:1,armW:6.4};
    if(b==='brute'){ g.SW=23; g.HW=15; g.leg=36; g.headR=7.5; g.bulk=1.45; g.armW=10; }
    else if(b==='giant'){ g.SW=25; g.HW=15; g.leg=40; g.headR=8; g.bulk=1.5; g.armW=10.5; }
    else if(b==='dwarf'){ g.SW=21; g.HW=15; g.leg=26; g.headR=10.5; g.bulk=1.35; g.armW=8.5; }
    else if(b==='tall'){ g.SW=13; g.HW=8; g.leg=56; g.headR=8; g.bulk=0.85; g.armW=5; }
    else if(b==='lean'){ g.SW=14; g.HW=9; g.leg=46; g.headR=8.5; g.bulk=0.9; g.armW=5.6; }
    else if(b==='broad'){ g.SW=19.5; g.HW=12.5; g.leg=42; g.headR=9; g.bulk=1.18; g.armW=7.8; }
    if(D.headScale)g.headR*=D.headScale; if(D.vtorso){ g.HW*=0.78; }
    var hip=-g.leg; g.hipY=hip; g.shY=hip-(D.build==='dwarf'?30:32)*(b==='brute'||b==='giant'?1.05:1); g.neckY=g.shY-3; g.headY=g.neckY-g.headR+1;
    if(D.lower==='wraith'||D.float){ g.lift=D.float||10; } else g.lift=0;
    return g; },
  // arm angle per frame for the weapon arm (0 = hanging down, + = outward/up)
  armA:function(D,f){ var w=D.weapon||'none', pole=/staff|spear|trident|scythe/.test(w); if(D.cast)return [0.9,0.95,2.3,1.35][f]; if(pole)return [0.32,0.36,0.9,1.25][f]; return [0.38,0.42,2.6,-0.2][f]; },
  wepA:function(D,f){ var w=D.weapon||'none'; if(/staff|spear|trident|scythe/.test(w))return [0.05,0.07,-0.35,0.95][f]; if(/whip/.test(w))return [2.6,2.5,3.6,1.2][f]; if(/lantern|book|orb/.test(w))return [Math.PI,Math.PI,Math.PI,Math.PI][f]; return [0.55,0.6,-0.7,2.1][f]; }
};
BA.ARCH.hum={
  back:function(x,D,box){ var g=BA.hum.geo(D), c=D.pal, lift=g.lift; x.translate(0,-lift);
    // aura
    x.save(); x.fillStyle=BA.rad(x,0,g.shY+10,4,90,[[0,rgba(c.g,0.34)],[0.5,rgba(c.g,0.1)],[1,rgba(c.g,0)]]); x.fillRect(-100,-180,200,200); x.restore();
    if(D.runes){ x.save(); x.strokeStyle=rgba(c.g,0.75); x.lineWidth=1.3; BA.ell(x,0,g.shY-4,44,44); x.stroke(); BA.ell(x,0,g.shY-4,37,37); x.stroke(); for(var r=0;r<12;r++){ var an=r/12*Math.PI*2; x.save(); x.translate(Math.cos(an)*40.5,g.shY-4+Math.sin(an)*40.5); x.rotate(an); x.beginPath(); x.moveTo(0,-2.6); x.lineTo(0,2.6); x.moveTo(0,-1); x.lineTo(1.8,-2.4); x.stroke(); x.restore(); } x.restore(); }
    if(D.banner){ x.save(); x.strokeStyle='#4a3020'; x.lineWidth=2.2; x.beginPath(); x.moveTo(-g.SW*0.6,g.hipY+6); x.lineTo(-g.SW*0.9,g.shY-62); x.stroke(); x.fillStyle=BA.lin(x,-40,g.shY-60,-10,g.shY-10,[[0,D.banner],[1,shade(D.banner,-0.4)]]); x.beginPath(); x.moveTo(-g.SW*0.9,g.shY-60); x.lineTo(-g.SW*0.9-26,g.shY-58); x.lineTo(-g.SW*0.9-22,g.shY-40); x.lineTo(-g.SW*0.9-28,g.shY-22); x.lineTo(-g.SW*0.9,g.shY-26); x.closePath(); x.fill(); BA.ol(x,1);
      x.fillStyle=rgba('#f0e0c0',0.85); BA.ell(x,-g.SW*0.9-13,g.shY-42,4.5,5); x.fill(); x.fillStyle='#201010'; x.fillRect(-g.SW*0.9-15,g.shY-43,1.5,1.5); x.fillRect(-g.SW*0.9-12,g.shY-43,1.5,1.5); x.restore(); }
    // wings
    if(D.wings)BA.wings(x,D,g);
    // cape (behind the body)
    if(D.cape){ var cp=D.cape, cc=D.capeCol||c.b, top=g.shY+1, bot=(D.lower==='wraith'?-4:-1), wide=g.SW+10+(cp==='fur'?4:0);
      x.save(); if(cp==='flame'){ for(var i=0;i<9;i++){ var t=i/8; x.fillStyle=rgba(i%2?c.g:'#ffd070',0.7); x.beginPath(); x.moveTo(-g.SW+t*g.SW*2,top); x.quadraticCurveTo(-wide+t*wide*2+Math.sin(i*2)*6,(top+bot)/2,-wide*1.2+t*wide*2.4,bot-4-Math.abs(Math.sin(i*1.7))*16); x.lineTo(-wide*1.2+t*wide*2.4+6,bot); x.lineTo(-g.SW+t*g.SW*2+4,top); x.fill(); } }
      else { x.beginPath(); x.moveTo(-g.SW+2,top); x.lineTo(g.SW-2,top); x.quadraticCurveTo(wide+2,(top+bot)/2,wide+6,bot);
        if(cp==='tattered'||cp==='rags'){ for(var j=8;j>=0;j--){ var tx=-wide-6+(wide*2+12)*j/8; x.lineTo(tx+4,bot-4-((j*7)%5)*3); x.lineTo(tx,bot+((j*3)%4)); } } else x.lineTo(-wide-6,bot);
        x.quadraticCurveTo(-wide-2,(top+bot)/2,-g.SW+2,top); x.closePath(); BA.fillSh(x,cc,-wide,top,wide,bot,0.18); BA.ol(x,1.4);
        x.strokeStyle=rgba(shade(cc,-0.45),0.6); x.lineWidth=1.1; for(var fo=-2;fo<=2;fo++){ x.beginPath(); x.moveTo(fo*g.SW*0.35,top+4); x.quadraticCurveTo(fo*g.SW*0.5,(top+bot)/2,fo*wide*0.42,bot-3); x.stroke(); }
        if(cp==='fur'){ x.fillStyle=BA.lin(x,0,top-6,0,top+10,[[0,'#e8dcc8'],[1,'#9a8a74']]); x.beginPath(); for(var q=0;q<=12;q++){ var qx=-g.SW-6+(g.SW*2+12)*q/12; x.lineTo(qx,top+(q%2?9:4)); } x.lineTo(g.SW+6,top-5); x.lineTo(-g.SW-6,top-5); x.fill(); } }
      x.restore(); }
    // chains dragging behind
    if(D.chains){ x.save(); x.strokeStyle='#5a5660'; x.lineWidth=1.6; for(var ch=0;ch<3;ch++){ x.beginPath(); for(var l=0;l<12;l++){ var lx=-10+ch*10-l*4.5*(ch===1?0.2:ch-1), ly=g.hipY+10+l*3.6; x.moveTo(lx,ly); BA.ell(x,lx,ly,1.8,1.1,l); } x.stroke(); } x.restore(); }
    x.translate(0,lift); },
  body:function(x,D,f,box){ var g=BA.hum.geo(D), c=D.pal, lift=g.lift+(D.lower==='wraith'||D.float?[0,1.5,-2,1][f]:0);
    x.translate(0,-lift); BA.hum.lower(x,D,g,f); BA.hum.offArm(x,D,g,f); BA.hum.torso(x,D,g,f); BA.hum.head(x,D,g,f); BA.hum.wepArm(x,D,g,f);
    x.translate(0,lift); BA.lightPass(x,box,D); x.translate(0,-lift); BA.hum.fx(x,D,g,f); x.translate(0,lift); BA.motes(x,D,f,box); }
};
BA.wings=function(x,D,g){ var c=D.pal, w=D.wings, wc=D.wingCol||c.b, wc2=D.wingCol2||c.g, cy=g.shY+4, span=D.wingSpan||1;
  var side=function(fn){ [1,-1].forEach(function(s){ x.save(); x.translate(s*g.SW*0.5,cy); x.scale(s*span,span); fn(); x.restore(); }); };
  if(w==='bat'||w==='dragon'){ side(function(){ x.beginPath(); x.moveTo(0,0); x.lineTo(30,-44); x.lineTo(78,-52); x.quadraticCurveTo(70,-30,82,-8); x.quadraticCurveTo(64,-16,60,4); x.quadraticCurveTo(46,-6,40,14); x.quadraticCurveTo(26,2,8,16); x.closePath();
      x.fillStyle=BA.lin(x,0,-50,80,20,[[0,rgba(shade(wc,0.15),0.96)],[1,rgba(shade(wc,-0.35),0.96)]]); x.fill(); BA.ol(x,1.3); x.strokeStyle=rgba(shade(wc,-0.55),0.9); x.lineWidth=2; x.beginPath(); x.moveTo(0,0); x.lineTo(30,-44); x.lineTo(78,-52); x.moveTo(30,-44); x.lineTo(82,-8); x.moveTo(30,-44); x.lineTo(60,4); x.moveTo(30,-44); x.lineTo(40,14); x.stroke(); }); }
  else if(w==='feather'||w==='storm'){ side(function(){ for(var r=0;r<3;r++)for(var k=0;k<7;k++){ var a=-1.7+k*0.2+r*0.08, L=(58+k*6)*(1-r*0.2); x.save(); x.rotate(a); x.fillStyle=BA.lin(x,0,0,L,0,[[0,rgba(r%2?wc2:wc,0.95)],[1,rgba(r%2?wc:wc2,0.85)]]); x.beginPath(); x.moveTo(0,0); x.quadraticCurveTo(L*0.5,-6-r,L,0); x.quadraticCurveTo(L*0.5,4,0,0); x.fill(); x.strokeStyle='rgba(20,20,30,.35)'; x.lineWidth=0.6; x.stroke(); x.restore(); }
      if(w==='storm'){ x.strokeStyle=rgba('#fff8a0',0.9); x.lineWidth=1.3; x.beginPath(); x.moveTo(20,-40); x.lineTo(28,-28); x.lineTo(22,-26); x.lineTo(34,-10); x.stroke(); } }); }
  else if(w==='shadow'){ side(function(){ for(var k=0;k<6;k++){ x.save(); x.rotate(-1.5+k*0.3); var L=70-k*5; x.fillStyle=BA.lin(x,0,0,L,0,[[0,rgba(wc,0.92)],[0.7,rgba(wc,0.5)],[1,rgba(wc,0)]]); x.beginPath(); x.moveTo(0,-3); for(var t=0;t<=8;t++)x.lineTo(L*t/8,-7+Math.sin(t*1.3+k)*4); for(var t2=8;t2>=0;t2--)x.lineTo(L*t2/8,5+Math.sin(t2*1.1+k)*4); x.fill(); x.restore(); } BA.glow(x,40,-26,16,wc2,0.35); }); }
  else if(w==='flame'){ side(function(){ for(var k=0;k<7;k++){ x.save(); x.rotate(-1.6+k*0.3); var L=60+Math.sin(k*1.7)*12; x.fillStyle=BA.lin(x,0,0,L,0,[[0,'rgba(255,70,20,.95)'],[0.6,rgba(wc2,0.85)],[1,'rgba(255,240,170,.3)']]); x.beginPath(); x.moveTo(0,0); x.bezierCurveTo(L*0.4,-12,L*0.7,-4,L,-9); x.bezierCurveTo(L*0.7,6,L*0.4,8,0,4); x.fill(); x.restore(); } }); }
  else if(w==='ice'||w==='crystal'){ side(function(){ [[-1.3,74,11],[-0.75,64,10],[-0.2,52,9],[0.35,38,8]].forEach(function(q){ x.save(); x.rotate(q[0]); x.beginPath(); x.moveTo(2,0); x.lineTo(q[1]*0.4,-q[2]); x.lineTo(q[1],0); x.lineTo(q[1]*0.4,q[2]*0.8); x.closePath(); x.fillStyle=rgba(wc,0.75); x.fill(); x.strokeStyle=rgba(wc2,0.95); x.lineWidth=1.1; x.stroke(); x.fillStyle=rgba('#ffffff',0.35); x.beginPath(); x.moveTo(4,0); x.lineTo(q[1]*0.4,-q[2]*0.8); x.lineTo(q[1]*0.55,0); x.fill(); x.restore(); }); }); }
  else if(w==='moth'){ side(function(){ x.beginPath(); x.moveTo(4,0); x.bezierCurveTo(30,-60,76,-50,74,-10); x.quadraticCurveTo(66,4,72,18); x.bezierCurveTo(56,50,20,44,4,12); x.closePath(); x.fillStyle=BA.lin(x,0,-40,70,20,[[0,wc],[1,wc2]]); x.fill(); BA.ol(x,1.2); BA.ell(x,42,-12,8,8); x.fillStyle=rgba(wc2,0.8); x.fill(); }); }
};
// ── humanoid parts ──
BA.hum.lower=function(x,D,g,f){ var c=D.pal, lo=D.lower||'legs', lc=D.legCol||shade(c.a,-0.25), hy=g.hipY;
  if(lo==='robe'||lo==='wraith'){ var hem=D.hem||(g.HW+13), bot=lo==='wraith'?-2:0, top=hy-4, rc=D.robeCol||c.a;
    x.beginPath(); x.moveTo(-g.HW,top); x.lineTo(g.HW,top); x.quadraticCurveTo(hem*0.8,top*0.4,hem,bot);
    if(lo==='wraith'){ for(var i=10;i>=0;i--){ var tx=-hem+hem*2*i/10; x.lineTo(tx+3,bot-6-((i*5)%4)*3+f%2); x.lineTo(tx,bot+2+((i*3)%3)*3); } } else x.lineTo(-hem,bot);
    x.quadraticCurveTo(-hem*0.8,top*0.4,-g.HW,top); x.closePath();
    x.fillStyle=lo==='wraith'?BA.lin(x,0,top,0,bot+6,[[0,shade(rc,0.1)],[0.65,rgba(rc,0.9)],[1,rgba(rc,0)]]):BA.lin(x,-hem,top,hem,bot,[[0,shade(rc,0.22)],[0.5,rc],[1,shade(rc,-0.35)]]); x.fill(); if(lo!=='wraith')BA.ol(x,1.4);
    x.strokeStyle=rgba(shade(rc,-0.5),0.55); x.lineWidth=1; for(var fo=-2;fo<=2;fo++){ if(!fo)continue; x.beginPath(); x.moveTo(fo*g.HW*0.4,top+6); x.quadraticCurveTo(fo*g.HW*0.6,top*0.45,fo*hem*0.55,bot-2); x.stroke(); }
    if(D.trim&&lo==='robe'){ x.strokeStyle=c.m; x.lineWidth=2; x.beginPath(); x.moveTo(-hem+1,bot-2); x.lineTo(hem-1,bot-2); x.stroke(); }
    if(lo==='wraith'){ BA.glow(x,0,bot-4,hem*0.9,c.g,0.18); }
    return; }
  if(lo==='serpent'){ var sc=D.tailCol||c.a;
    [[-26,-6,30,11],[20,-9,28,11],[-4,-17,26,11]].forEach(function(o,i){ BA.ell(x,o[0],o[1],o[2],o[3]); BA.fillSh(x,sc,o[0]-o[2],o[1]-o[3],o[0]+o[2],o[1]+o[3],0.3); BA.ol(x,1.3);
      x.strokeStyle=rgba(shade(sc,0.4),0.7); x.lineWidth=0.9; for(var s=-3;s<=3;s++){ x.beginPath(); x.arc(o[0]+s*o[2]*0.25,o[1]+o[3]*0.4,o[3]*0.35,Math.PI*1.1,Math.PI*1.9); x.stroke(); } });
    x.beginPath(); x.moveTo(-g.HW,hy); x.lineTo(g.HW,hy); x.lineTo(g.HW+4,-18); x.lineTo(-g.HW-4,-18); x.closePath(); BA.fillSh(x,sc,-12,hy,12,-18,0.25); BA.ol(x,1.2); return; }
  if(lo==='roots'){ var rc2=D.legCol||c.b; for(var r=0;r<7;r++){ var sx=-g.HW+r*(g.HW*2/6), ex=sx*1.9+(r%2?6:-6); x.beginPath(); x.moveTo(sx-4,hy); x.quadraticCurveTo(sx+(r-3)*2,hy*0.4,ex,0); x.lineTo(ex+5,0); x.quadraticCurveTo(sx+(r-3)*2+6,hy*0.4,sx+4,hy); x.closePath(); BA.fillSh(x,rc2,sx-6,hy,sx+6,0,0.25); BA.ol(x,1.1); } return; }
  // legs (two); stance widens on the wind-up
  var st=g.HW*0.55+(f===2?2:0), lw=D.build==='tall'?4.2:6*g.bulk, arm=D.armor;
  [-1,1].forEach(function(s){ var hx=s*st, fx=s*(st+3+(f===3&&s>0?3:0)), kx=(hx+fx)/2+s*1.2, ky=hy*0.5;
    x.beginPath(); x.moveTo(hx-lw*0.72,hy+1); x.lineTo(hx+lw*0.72,hy+1); x.quadraticCurveTo(kx+lw*0.62,ky,fx+lw*0.45,-4); x.lineTo(fx-lw*0.45,-4); x.quadraticCurveTo(kx-lw*0.62,ky,hx-lw*0.72,hy+1); x.closePath(); BA.fillSh(x,lc,hx-lw,hy,hx+lw,0,0.3); BA.ol(x,1.2);
    if(arm==='plate'||arm==='bone'){ BA.ell(x,(hx+fx)/2,hy*0.5,lw*0.62,lw*0.5); BA.fillSh(x,D.pal.m,(hx+fx)/2-lw,hy*0.5-lw,(hx+fx)/2+lw,hy*0.5+lw,0.35); BA.ol(x,1); }
    x.beginPath(); x.moveTo(fx-lw*0.7,-5); x.lineTo(fx+lw*0.8+s*2,-5); x.quadraticCurveTo(fx+lw+s*4,0,fx+lw*0.9+s*4,0.5); x.lineTo(fx-lw*0.8,0.5); x.closePath(); BA.fillSh(x,D.bootCol||shade(lc,-0.45),fx-lw,-6,fx+lw,1,0.3); BA.ol(x,1.1); });
  if(D.lower==='skirt'||D.armor==='plate'||D.armor==='bone'){ var tc=D.armor==='bone'?'#d8d0bc':D.pal.m; for(var tI=-2;tI<=2;tI++){ x.beginPath(); x.moveTo(tI*g.HW*0.42-g.HW*0.22,hy-3); x.lineTo(tI*g.HW*0.42+g.HW*0.22,hy-3); x.lineTo(tI*g.HW*0.46+g.HW*0.2,hy+9); x.lineTo(tI*g.HW*0.46-g.HW*0.2,hy+9); x.closePath(); BA.fillSh(x,tc,tI*g.HW*0.42-5,hy-3,tI*g.HW*0.42+5,hy+9,0.3); BA.ol(x,0.9); } }
};
BA.hum.torso=function(x,D,g,f){ var c=D.pal, ar=D.armor||'robe', tc=D.torsoCol||c.a, top=g.shY, bot=g.hipY+2, sw=g.SW, hw=g.HW, breathe=f===1?0.4:0;
  BA.anc(x,'chest',0,top+(bot-top)*0.3,sw*0.45,2); BA.anc(x,'shL',-sw+2,top+1,sw*0.55,2); BA.anc(x,'shR',sw-2,top+1,sw*0.55,2);
  // body shape (trapezoid with curved sides)
  x.beginPath(); x.moveTo(-sw-breathe,top+2); x.quadraticCurveTo(0,top-3,sw+breathe,top+2); x.quadraticCurveTo(sw+1,(top+bot)/2,hw+1,bot); x.lineTo(-hw-1,bot); x.quadraticCurveTo(-sw-1,(top+bot)/2,-sw-breathe,top+2); x.closePath();
  var base=ar==='shadow'?c.b:ar==='magma'?'#2a1612':tc; BA.fillSh(x,base,-sw,top,sw,bot,0.3); BA.ol(x,1.5);
  var midY=(top+bot)/2;
  if(ar==='plate'||ar==='crystal'){ var pc=ar==='crystal'?c.g:c.m;
    x.beginPath(); x.moveTo(-sw*0.78,top+4); x.quadraticCurveTo(0,top+1,sw*0.78,top+4); x.lineTo(sw*0.62,midY+4); x.quadraticCurveTo(0,midY+10,-sw*0.62,midY+4); x.closePath(); BA.fillSh(x,ar==='crystal'?shade(c.g,-0.1):tc,-sw,top,sw,midY,0.4); BA.ol(x,1.1);
    x.strokeStyle=rgba(shade(tc,0.5),0.7); x.lineWidth=1.1; x.beginPath(); x.moveTo(0,top+3); x.lineTo(0,midY+8); x.stroke();
    for(var ab=0;ab<3;ab++){ x.beginPath(); x.moveTo(-hw*0.9,midY+10+ab*5); x.quadraticCurveTo(0,midY+13+ab*5,hw*0.9,midY+10+ab*5); x.strokeStyle=rgba(pc,0.8); x.lineWidth=1.2; x.stroke(); }
    if(ar==='crystal'){ for(var cr=0;cr<5;cr++){ var cx2=-sw*0.6+cr*sw*0.3, cy2=top+8+(cr%2)*8; x.beginPath(); x.moveTo(cx2,cy2-6); x.lineTo(cx2+3,cy2); x.lineTo(cx2,cy2+5); x.lineTo(cx2-3,cy2); x.closePath(); x.fillStyle=rgba('#ffffff',0.45); x.fill(); } } }
  else if(ar==='robe'||ar==='rags'){ x.fillStyle=rgba(D.trim||c.m,0.9); x.beginPath(); x.moveTo(-6,top); x.lineTo(0,top+16); x.lineTo(6,top); x.lineTo(3.5,top); x.lineTo(0,top+11); x.lineTo(-3.5,top); x.fill();
    x.strokeStyle=rgba(shade(tc,-0.45),0.6); x.lineWidth=1; for(var fo=-1;fo<=1;fo+=2){ x.beginPath(); x.moveTo(fo*sw*0.5,top+6); x.quadraticCurveTo(fo*sw*0.3,midY,fo*hw*0.5,bot-2); x.stroke(); }
    x.fillStyle=D.sash||shade(c.m,-0.1); x.fillRect(-hw-1,bot-8,hw*2+2,4.5); x.strokeStyle='rgba(12,8,14,.6)'; x.lineWidth=0.8; x.strokeRect(-hw-1,bot-8,hw*2+2,4.5);
    if(ar==='rags'){ x.strokeStyle=rgba(shade(tc,-0.6),0.8); x.lineWidth=0.9; for(var p=0;p<6;p++){ x.beginPath(); x.moveTo(-sw*0.7+p*sw*0.28,top+10+(p%3)*6); x.lineTo(-sw*0.7+p*sw*0.28+3,top+14+(p%3)*6); x.stroke(); } } }
  else if(ar==='coat'){ x.fillStyle=D.shirt||'#e8dcc8'; x.beginPath(); x.moveTo(-5,top+1); x.lineTo(5,top+1); x.lineTo(3,midY+4); x.lineTo(-3,midY+4); x.fill();
    x.fillStyle=shade(tc,-0.2); [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(s*5,top+1); x.lineTo(s*12,top+3); x.lineTo(s*4,midY-2); x.closePath(); x.fill(); BA.ol(x,0.8); });
    x.fillStyle=c.m; for(var b=0;b<4;b++){ BA.ell(x,-7,top+10+b*6,1.3,1.3); x.fill(); BA.ell(x,7,top+10+b*6,1.3,1.3); x.fill(); }
    x.fillStyle='#2a1a10'; x.fillRect(-hw-1,bot-8,hw*2+2,4); x.fillStyle=c.m; x.fillRect(-2.5,bot-8.5,5,5); }
  else if(ar==='bone'){ x.strokeStyle='#e8e0cc'; x.lineWidth=2.2; for(var rb=0;rb<5;rb++){ x.beginPath(); x.moveTo(-sw*0.75+rb*0.8,top+7+rb*5); x.quadraticCurveTo(0,top+2+rb*5,sw*0.75-rb*0.8,top+7+rb*5); x.stroke(); } x.lineWidth=3; x.beginPath(); x.moveTo(0,top+3); x.lineTo(0,bot-4); x.stroke(); }
  else if(ar==='bark'){ x.strokeStyle=rgba(shade(tc,-0.55),0.9); x.lineWidth=1.2; for(var bl=0;bl<7;bl++){ x.beginPath(); x.moveTo(-sw+bl*sw*0.33,top+3); x.quadraticCurveTo(-sw+bl*sw*0.33+(bl%2?4:-4),midY,-hw+bl*hw*0.33,bot); x.stroke(); }
    x.fillStyle=rgba('#6aa04a',0.8); [[-sw*0.6,top+6,6,3],[sw*0.5,midY,5,3],[-hw*0.3,bot-6,7,2.5]].forEach(function(m){ BA.ell(x,m[0],m[1],m[2],m[3]); x.fill(); }); }
  else if(ar==='fur'||ar==='leather'){ x.strokeStyle=rgba(shade(tc,-0.5),0.7); x.lineWidth=1; x.beginPath(); x.moveTo(-hw,midY); x.lineTo(hw,midY); x.stroke(); x.fillStyle='#3a2414'; x.fillRect(-hw-1,bot-7,hw*2+2,4); x.fillStyle=c.m; BA.ell(x,0,bot-5,3,2.5); x.fill(); }
  else if(ar==='magma'||ar==='shadow'){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.9); x.lineWidth=1.4; var R=BA.rnd(BA.hash(D.id)); for(var cr2=0;cr2<9;cr2++){ var sx=(R()-0.5)*sw*1.6, sy=top+4+R()*(bot-top-8); x.beginPath(); x.moveTo(sx,sy); x.lineTo(sx+(R()-0.5)*9,sy+4+R()*6); x.lineTo(sx+(R()-0.5)*12,sy+9+R()*6); x.stroke(); } x.restore();
    if(ar==='magma')BA.glow(x,0,midY-4,sw*0.8,c.g,0.45); }
  if(D.vtorso&&(ar==='shadow'||ar==='magma'||ar==='fur'||ar==='leather')){ x.strokeStyle=rgba(shade(base,0.35),0.6); x.lineWidth=1.2; x.beginPath(); x.moveTo(-sw*0.7,top+14); x.quadraticCurveTo(-sw*0.3,top+19,0,top+13); x.quadraticCurveTo(sw*0.3,top+19,sw*0.7,top+14); x.moveTo(0,top+13); x.lineTo(0,bot-6); x.stroke(); }
  if(D.belly){ BA.ell(x,0,bot-10,hw*1.25,11); BA.fillSh(x,D.pal.s||tc,-hw,bot-20,hw,bot,0.3); BA.ol(x,1.2); x.strokeStyle=rgba(shade(D.pal.s||tc,-0.4),0.6); x.lineWidth=0.8; BA.ell(x,0,bot-8,1.5,1.5); x.stroke(); }
  if(D.glowcore){ BA.glow(x,0,top+12,12,c.g,1); x.fillStyle='#fff8e0'; BA.ell(x,0,top+12,2.6,2.6); x.fill(); }
  if(D.thorns){ x.strokeStyle='#3a5a24'; x.lineWidth=1.6; x.beginPath(); for(var t=0;t<24;t++){ var ty=top+t*((bot-top)/24), tx=Math.sin(t*0.9)*sw*0.8; if(t)x.lineTo(tx,ty); else x.moveTo(tx,ty); } x.stroke(); x.fillStyle='#e07080'; for(var t2=0;t2<6;t2++){ BA.ell(x,Math.sin(t2*3.6)*sw*0.7,top+5+t2*6,2.2,2); x.fill(); } }
  if(D.skulls){ for(var sk=0;sk<3;sk++){ var skx=-hw*0.8+sk*hw*0.8, sky=bot-3; BA.ell(x,skx,sky,3,3.2); x.fillStyle='#e8e0cc'; x.fill(); BA.ol(x,0.7); x.fillStyle='#201010'; x.fillRect(skx-1.8,sky-0.8,1.3,1.3); x.fillRect(skx+0.5,sky-0.8,1.3,1.3); } }
  // shoulders / pauldrons
  var pd=D.pauldrons||(ar==='plate'?'plate':ar==='bone'?'bone':ar==='fur'?'fur':null);
  if(pd){ [-1,1].forEach(function(s){ var px=s*(sw-1), py=top+3, pr=g.armW*0.95+(pd==='big'?4:0);
      if(pd==='fur'){ BA.ell(x,px,py,pr*1.2,pr*0.8); BA.fillSh(x,'#c8b8a0',px-pr,py-pr,px+pr,py+pr,0.3); BA.ol(x,1); return; }
      x.beginPath(); x.arc(px,py+2,pr,Math.PI,0); x.lineTo(px+pr*0.9,py+5); x.quadraticCurveTo(px,py+8,px-pr*0.9,py+5); x.closePath(); BA.fillSh(x,pd==='bone'?'#e0d8c4':c.m,px-pr,py-pr,px+pr,py+6,0.4); BA.ol(x,1.1);
      if(D.spikes){ x.fillStyle=shade(c.m,-0.3); for(var sp=-1;sp<=1;sp++){ x.beginPath(); x.moveTo(px+sp*pr*0.55-2,py-pr*0.6); x.lineTo(px+sp*pr*0.8,py-pr-7); x.lineTo(px+sp*pr*0.55+2,py-pr*0.5); x.fill(); } } }); }
};
BA.hum.offArm=function(x,D,g,f){ var c=D.pal, ac=D.armCol||(D.armor==='plate'?c.m:D.torsoCol||c.a), sx=-g.SW+1, sy=g.shY+4, a=[0.3,0.28,0.55,0.15][f], L=g.bulk*20+(D.build==='tall'?6:0);
  var ex=sx-Math.sin(a)*L*0.55, ey=sy+Math.cos(a)*L*0.55, hx=ex+Math.sin(0.2)*L*0.45*(D.off==='shield'?0.3:1), hy=ey+L*0.45;
  if(D.cast){ hx=sx-8; hy=sy+10; ex=sx-6; ey=sy+6; }
  BA.hum.arm(x,D,g,sx,sy,ex,ey,hx,hy,ac);
  BA.ell(x,hx,hy,g.armW*0.55,g.armW*0.55); x.fillStyle=D.gloves||D.pal.s||'#c8a080'; x.fill(); BA.ol(x,0.9);
  BA.hum.offItem(x,D,g,f,hx,hy); };
// an arm: plain limbs, or a bell sleeve for robes
BA.hum.arm=function(x,D,g,sx,sy,ex,ey,hx,hy,ac){ var sl=D.sleeves!==undefined?D.sleeves:/robe|rags/.test(D.armor||'robe');
  if(!sl){ BA.limb(x,sx,sy,ex,ey,g.armW,ac); BA.limb(x,ex,ey,hx,hy,g.armW*0.9,ac); if(D.armor==='plate'){ BA.ell(x,ex,ey,g.armW*0.62,g.armW*0.55); BA.fillSh(x,D.pal.m,ex-g.armW,ey-g.armW,ex+g.armW,ey+g.armW,0.35); BA.ol(x,0.9); } return; }
  var dx=hx-sx, dy=hy-sy, L=Math.hypot(dx,dy)||1, nx=-dy/L, ny=dx/L, w0=g.armW*0.55, w1=g.armW*1.35, cx=hx-dx/L*3, cy=hy-dy/L*3;
  x.beginPath(); x.moveTo(sx+nx*w0,sy+ny*w0); x.quadraticCurveTo(ex+nx*w0*1.4,ey+ny*w0*1.4,cx+nx*w1,cy+ny*w1); x.lineTo(cx-nx*w1,cy-ny*w1); x.quadraticCurveTo(ex-nx*w0*1.2,ey-ny*w0*1.2,sx-nx*w0,sy-ny*w0); x.closePath();
  BA.fillSh(x,ac,sx-w1,sy,hx+w1,hy,0.3); BA.ol(x,1.2); x.strokeStyle=rgba(D.trim||D.pal.m,0.85); x.lineWidth=1.3; x.beginPath(); x.moveTo(cx+nx*w1,cy+ny*w1); x.lineTo(cx-nx*w1,cy-ny*w1); x.stroke(); };
BA.hum.offItem=function(x,D,g,f,hx,hy){ var c=D.pal, o=D.off; if(!o)return;
  if(o==='shield'){ var sw=g.SW*0.95+4, sh=sw*1.35, cx=hx+2, cy=hy-sh*0.25; x.beginPath(); x.moveTo(cx-sw*0.55,cy-sh*0.5); x.lineTo(cx+sw*0.55,cy-sh*0.5); x.quadraticCurveTo(cx+sw*0.6,cy+sh*0.15,cx,cy+sh*0.55); x.quadraticCurveTo(cx-sw*0.6,cy+sh*0.15,cx-sw*0.55,cy-sh*0.5); x.closePath();
    BA.fillSh(x,D.shieldCol||c.b,cx-sw,cy-sh*0.5,cx+sw,cy+sh*0.5,0.35); BA.ol(x,1.6); x.strokeStyle=c.m; x.lineWidth=2; x.stroke();
    var em=D.emblem||'cross'; x.save(); if(em==='eclipse'){ BA.glow(x,cx,cy-2,sw*0.55,'#ffd060',0.9); BA.ell(x,cx,cy-2,sw*0.3,sw*0.3); x.fillStyle='#050308'; x.fill(); }
    else if(em==='rose'){ x.fillStyle='#e05070'; for(var p=0;p<5;p++){ BA.ell(x,cx+Math.cos(p*1.26)*3,cy-2+Math.sin(p*1.26)*3,3,3); x.fill(); } x.fillStyle='#ffd0d8'; BA.ell(x,cx,cy-2,1.6,1.6); x.fill(); }
    else if(em==='flame'){ x.fillStyle=c.g; x.beginPath(); x.moveTo(cx,cy-12); x.quadraticCurveTo(cx+7,cy-2,cx,cy+8); x.quadraticCurveTo(cx-7,cy-2,cx,cy-12); x.fill(); }
    else { x.strokeStyle=c.g; x.lineWidth=2.4; x.beginPath(); x.moveTo(cx,cy-10); x.lineTo(cx,cy+10); x.moveTo(cx-7,cy-3); x.lineTo(cx+7,cy-3); x.stroke(); } x.restore(); return; }
  if(o==='book'){ var bx=hx-2, by=hy-12-(f===1?1:0); x.save(); x.translate(bx,by); x.rotate(-0.2); x.fillStyle='#e8dcc0'; x.beginPath(); x.moveTo(-11,-2); x.quadraticCurveTo(-5,-6,0,-3); x.quadraticCurveTo(5,-6,11,-2); x.lineTo(11,6); x.quadraticCurveTo(5,3,0,6); x.quadraticCurveTo(-5,3,-11,6); x.closePath(); x.fill(); BA.ol(x,1); x.strokeStyle=rgba(c.g,0.9); x.lineWidth=0.7; for(var l=0;l<3;l++){ x.beginPath(); x.moveTo(-8,l*2); x.lineTo(-2,l*2-1); x.moveTo(2,l*2-1); x.lineTo(8,l*2); x.stroke(); } x.restore(); BA.glow(x,bx,by-4,14,c.g,0.5); return; }
  if(o==='orb'){ var oy=hy-10+(f%2?-1:0); BA.glow(x,hx,oy,16,c.g,0.9); BA.ell(x,hx,oy,5,5); x.fillStyle=BA.rad(x,hx-1.5,oy-1.5,0.5,5,[[0,'#ffffff'],[1,c.g]]); x.fill(); return; }
  if(o==='flame'){ var fy=hy-6; BA.glow(x,hx,fy,14,c.g,0.9); x.fillStyle=rgba('#fff0b0',0.95); x.beginPath(); x.moveTo(hx,fy-11-(f%2)*2); x.quadraticCurveTo(hx+6,fy-2,hx,fy+3); x.quadraticCurveTo(hx-6,fy-2,hx,fy-11); x.fill(); return; }
  if(o==='lantern'){ x.strokeStyle='#2a2020'; x.lineWidth=1; x.beginPath(); x.moveTo(hx,hy); x.lineTo(hx,hy+6); x.stroke(); BA.glow(x,hx,hy+12,16,c.g,0.8); x.fillStyle=rgba('#fff0c0',0.95); x.fillRect(hx-3.5,hy+7,7,9); x.fillStyle='#2a2020'; x.fillRect(hx-4.5,hy+6,9,1.6); x.fillRect(hx-4.5,hy+16,9,1.6); return; }
  if(o==='skull'){ BA.ell(x,hx,hy-6,5,5.5); x.fillStyle='#e8e0cc'; x.fill(); BA.ol(x,0.8); BA.glow(x,hx-1.8,hy-6.5,3,c.g,1); BA.glow(x,hx+1.8,hy-6.5,3,c.g,1); return; }
  if(o==='chains'){ x.strokeStyle='#6a6670'; x.lineWidth=1.4; for(var l2=0;l2<9;l2++){ BA.ell(x,hx+Math.sin(l2*0.6)*3,hy+3+l2*4,1.6,2.2,l2%2?0:1.57); x.stroke(); } return; }
  if(o==='shards'){ for(var s=0;s<4;s++){ var an=f*0.4+s*1.57, sxx=hx+Math.cos(an)*10, syy=hy-10+Math.sin(an)*5; x.beginPath(); x.moveTo(sxx,syy-6); x.lineTo(sxx+2.5,syy); x.lineTo(sxx,syy+5); x.lineTo(sxx-2.5,syy); x.closePath(); x.fillStyle=rgba(c.g,0.85); x.fill(); x.strokeStyle='#ffffff'; x.lineWidth=0.6; x.stroke(); } return; }
};
BA.hum.wepArm=function(x,D,g,f){ var c=D.pal, ac=D.armCol||(D.armor==='plate'?c.m:D.torsoCol||c.a), sx=g.SW-1, sy=g.shY+4, a=BA.hum.armA(D,f), L=g.bulk*21+(D.build==='tall'?6:0);
  var ex=sx+Math.sin(a*0.7)*L*0.5, ey=sy+Math.cos(a*0.7)*L*0.5, hx=ex+Math.sin(a)*L*0.5, hy=ey+Math.cos(a)*L*0.5;
  if(D.drill){ BA.limb(x,sx,sy,ex,ey,g.armW,ac); x.save(); x.translate(ex,ey); x.rotate(-a+Math.PI); x.beginPath(); x.moveTo(-g.armW,0); x.lineTo(g.armW,0); x.lineTo(0,-34); x.closePath(); BA.fillSh(x,c.m,-g.armW,-34,g.armW,0,0.4); BA.ol(x,1.2); x.strokeStyle=rgba(shade(c.m,-0.5),0.9); x.lineWidth=1.2; for(var sp=0;sp<5;sp++){ x.beginPath(); x.moveTo(-g.armW*(1-sp*0.2),-sp*6); x.lineTo(g.armW*(1-sp*0.2)*0.8,-sp*6-5); x.stroke(); } x.restore(); return; }
  BA.hum.arm(x,D,g,sx,sy,ex,ey,hx,hy,ac);
  BA.hum.weapon(x,D,g,f,hx,hy,BA.hum.wepA(D,f));
  BA.ell(x,hx,hy,g.armW*0.58,g.armW*0.58); x.fillStyle=D.gloves||D.pal.s||'#c8a080'; x.fill(); BA.ol(x,0.9);
  if(D.cast&&!D.weapon){ BA.glow(x,hx,hy-4,16,c.g,0.9); } };
BA.hum.weapon=function(x,D,g,f,hx,hy,ang){ var w=D.weapon, c=D.pal, wc=D.wepCol||'#d8dce8', gl=D.wepGlow; if(!w||w==='none')return; var s=D.wepScale||1;
  x.save(); x.translate(hx,hy); x.rotate(ang); x.scale(s,s);
  var blade=function(L,W,curve){ x.beginPath(); x.moveTo(-W/2,-2); x.quadraticCurveTo(-W/2+curve,-L*0.55,0,-L); x.quadraticCurveTo(W/2+curve,-L*0.55,W/2,-2); x.closePath(); x.fillStyle=BA.lin(x,-W/2,0,W/2,0,[[0,shade(wc,0.35)],[0.5,wc],[1,shade(wc,-0.35)]]); x.fill(); BA.ol(x,1.1);
    x.strokeStyle=rgba('#ffffff',0.5); x.lineWidth=0.7; x.beginPath(); x.moveTo(0,-4); x.lineTo(0,-L+4); x.stroke(); if(gl){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(gl,0.8); x.lineWidth=2.2; x.beginPath(); x.moveTo(-W/2+0.5,-3); x.quadraticCurveTo(-W/2+curve,-L*0.55,0,-L+1); x.stroke(); x.restore(); } };
  var grip=function(n){ x.fillStyle='#3a2418'; x.fillRect(-1.6,-1,3.2,n); x.fillStyle=c.m; BA.ell(x,0,n,2.2,2.2); x.fill(); };
  if(w==='sword'||w==='greatsword'||w==='rapier'||w==='cutlass'){ var L=w==='greatsword'?62:w==='rapier'?44:w==='cutlass'?34:42, W=w==='greatsword'?8:w==='rapier'?2.4:w==='cutlass'?6:5.2; grip(w==='greatsword'?12:7); blade(L,W,w==='cutlass'?5:0);
    x.fillStyle=c.m; if(w==='rapier'){ x.beginPath(); x.arc(0,-1,5,Math.PI,0); x.fill(); BA.ol(x,0.8); } else { x.fillRect(-(W*1.6+3),-3.5,(W*1.6+3)*2,3.5); x.strokeStyle='rgba(12,8,14,.7)'; x.lineWidth=0.8; x.strokeRect(-(W*1.6+3),-3.5,(W*1.6+3)*2,3.5); } }
  else if(w==='axe'||w==='greataxe'||w==='cleaver'){ var hl=w==='greataxe'?56:w==='cleaver'?18:44; x.fillStyle=BA.lin(x,-2,0,2,0,[[0,'#6a4a30'],[1,'#3a2418']]); x.fillRect(-2,-hl,4,hl+8); x.strokeStyle='rgba(12,8,14,.7)'; x.lineWidth=0.8; x.strokeRect(-2,-hl,4,hl+8);
    if(w==='cleaver'){ x.beginPath(); x.moveTo(-3,-hl+4); x.lineTo(16,-hl-8); x.lineTo(20,-hl+26); x.lineTo(-3,-hl+20); x.closePath(); x.fillStyle=BA.lin(x,0,-hl,20,-hl+20,[[0,shade(wc,0.3)],[1,shade(wc,-0.3)]]); x.fill(); BA.ol(x,1.1); }
    else { var bw=w==='greataxe'?18:13; [1].concat(w==='greataxe'?[-1]:[]).forEach(function(s){ x.beginPath(); x.moveTo(s*2,-hl+2); x.quadraticCurveTo(s*bw*1.2,-hl-bw*0.4,s*bw*1.35,-hl+bw*0.55); x.quadraticCurveTo(s*bw*0.7,-hl+bw*0.9,s*2,-hl+bw*1.05); x.closePath(); x.fillStyle=BA.lin(x,0,-hl,s*bw,-hl+bw,[[0,shade(wc,0.3)],[1,shade(wc,-0.3)]]); x.fill(); BA.ol(x,1.1); if(gl){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(gl,0.8); x.lineWidth=1.6; x.stroke(); x.restore(); } }); } }
  else if(w==='hammer'||w==='club'){ var hl2=w==='club'?40:44; if(w==='club'){ x.beginPath(); x.moveTo(-2.5,6); x.lineTo(2.5,6); x.lineTo(7,-hl2); x.quadraticCurveTo(0,-hl2-8,-7,-hl2); x.closePath(); BA.fillSh(x,D.wepCol||'#7a5a38',-7,-hl2,7,6,0.3); BA.ol(x,1.2); x.fillStyle='#c8c0b0'; for(var sp2=0;sp2<6;sp2++){ var sy2=-hl2+4+sp2*5, sx2=(sp2%2?1:-1)*(5.5-sp2*0.4); x.beginPath(); x.moveTo(sx2,sy2-1.5); x.lineTo(sx2+(sx2>0?4:-4),sy2); x.lineTo(sx2,sy2+1.5); x.fill(); } }
    else { x.fillStyle='#4a3020'; x.fillRect(-2,-hl2,4,hl2+8); x.beginPath(); x.rect(-13,-hl2-10,26,15); BA.fillSh(x,wc,-13,-hl2-10,13,-hl2+5,0.35); BA.ol(x,1.3); if(gl){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(gl,0.95); x.lineWidth=1; x.beginPath(); x.moveTo(-8,-hl2-6); x.lineTo(-4,-hl2+1); x.moveTo(-1,-hl2-6); x.lineTo(2,-hl2+1); x.lineTo(5,-hl2-6); x.stroke(); x.restore(); BA.glow(x,0,-hl2-2,18,gl,0.35); } } }
  else if(w==='staff'||w==='spear'||w==='trident'||w==='scythe'){ var top=-52, sc2=D.staffCol||'#6a4a30'; x.strokeStyle='rgba(12,8,14,.7)'; x.lineWidth=4.4; x.beginPath(); x.moveTo(0,40); x.lineTo(0,top); x.stroke(); x.strokeStyle=BA.lin(x,-2,0,2,0,[[0,shade(sc2,0.3)],[1,shade(sc2,-0.3)]]); x.lineWidth=2.8; x.beginPath(); x.moveTo(0,40); x.lineTo(0,top); x.stroke();
    if(w==='spear'){ x.beginPath(); x.moveTo(-3.5,top); x.lineTo(0,top-16); x.lineTo(3.5,top); x.closePath(); BA.fillSh(x,wc,-4,top-16,4,top,0.3); BA.ol(x,1); }
    else if(w==='trident'){ x.strokeStyle=wc; x.lineWidth=2.2; x.beginPath(); x.moveTo(-8,top-14); x.lineTo(-8,top); x.lineTo(8,top); x.lineTo(8,top-14); x.moveTo(0,top); x.lineTo(0,top-18); x.stroke(); }
    else if(w==='scythe'){ x.beginPath(); x.moveTo(0,top); x.quadraticCurveTo(-26,top-10,-36,top+14); x.quadraticCurveTo(-22,top-2,0,top+5); x.closePath(); BA.fillSh(x,wc,-36,top-10,0,top+14,0.35); BA.ol(x,1.1); }
    else { var tp=D.staffTop||'orb', ty=top-5; if(tp==='crystal'){ x.beginPath(); x.moveTo(0,ty-14); x.lineTo(5,ty-3); x.lineTo(0,ty+5); x.lineTo(-5,ty-3); x.closePath(); x.fillStyle=rgba(c.g,0.9); x.fill(); BA.ol(x,0.9); BA.glow(x,0,ty-4,18,c.g,0.8); }
      else if(tp==='skull'){ BA.ell(x,0,ty-2,5,5.5); x.fillStyle='#e8e0cc'; x.fill(); BA.ol(x,0.8); BA.glow(x,-1.8,ty-2.5,3,c.g,1); BA.glow(x,1.8,ty-2.5,3,c.g,1); }
      else if(tp==='crescent'){ x.fillStyle=c.m; x.beginPath(); x.arc(0,ty-4,8,Math.PI*0.2,Math.PI*1.8,false); x.arc(3,ty-4,6,Math.PI*1.75,Math.PI*0.25,true); x.fill(); BA.glow(x,0,ty-4,14,c.g,0.6); }
      else if(tp==='flame'){ BA.glow(x,0,ty-4,16,c.g,0.9); x.fillStyle=rgba('#fff0b0',0.95); x.beginPath(); x.moveTo(0,ty-16-(f%2)*2); x.quadraticCurveTo(6,ty-4,0,ty+1); x.quadraticCurveTo(-6,ty-4,0,ty-16); x.fill(); }
      else if(tp==='lightning'){ BA.glow(x,0,ty-4,18,c.g,0.9); x.strokeStyle='#ffffff'; x.lineWidth=1.4; x.beginPath(); x.moveTo(-2,ty-16); x.lineTo(3,ty-8); x.lineTo(-2,ty-6); x.lineTo(3,ty+2); x.stroke(); }
      else if(tp==='branch'){ x.strokeStyle=sc2; x.lineWidth=2; x.beginPath(); x.moveTo(0,top); x.lineTo(-7,top-12); x.moveTo(0,top); x.lineTo(6,top-14); x.moveTo(-3,top-6); x.lineTo(-10,top-6); x.stroke(); x.fillStyle='#7ab04a'; [[-7,-12],[6,-14],[-10,-6]].forEach(function(p){ BA.ell(x,p[0],top+p[1],2.6,1.6,0.6); x.fill(); }); BA.glow(x,0,top-8,12,c.g,0.5); }
      else if(tp==='astrolabe'){ x.strokeStyle=c.m; x.lineWidth=1.2; BA.ell(x,0,ty-6,9,9); x.stroke(); BA.ell(x,0,ty-6,9,3.5,0.5); x.stroke(); BA.ell(x,0,ty-6,3.5,9,0.5); x.stroke(); BA.glow(x,0,ty-6,10,c.g,0.9); }
      else { BA.glow(x,0,ty-4,16,c.g,0.9); BA.ell(x,0,ty-4,5,5); x.fillStyle=BA.rad(x,-1.5,ty-5.5,0.5,5,[[0,'#ffffff'],[1,c.g]]); x.fill(); } } }
  else if(w==='whip'){ x.fillStyle='#2a1a14'; x.fillRect(-1.5,-2,3,10); x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(gl||c.g,0.9); x.lineWidth=2.6; x.beginPath(); x.moveTo(0,-2); x.bezierCurveTo(10,-30,-24,-46,-6,-72); x.stroke(); x.strokeStyle=rgba('#fff0b0',0.7); x.lineWidth=1; x.stroke(); x.restore(); }
  else if(w==='flail'||w==='millstone'){ x.fillStyle='#4a3020'; x.fillRect(-2,-16,4,24); x.strokeStyle='#6a6670'; x.lineWidth=1.3; for(var l3=0;l3<6;l3++){ BA.ell(x,0,-18-l3*4,1.6,2.2); x.stroke(); }
    if(w==='millstone'){ BA.ell(x,0,-50,14,14); BA.fillSh(x,'#a09888',-14,-64,14,-36,0.35); BA.ol(x,1.3); BA.ell(x,0,-50,3.5,3.5); x.fillStyle='#3a3430'; x.fill(); } else { BA.ell(x,0,-48,8,8); BA.fillSh(x,wc,-8,-56,8,-40,0.35); BA.ol(x,1.1); x.fillStyle=shade(wc,-0.3); for(var sp3=0;sp3<8;sp3++){ var an3=sp3*0.785; x.beginPath(); x.moveTo(Math.cos(an3)*7,-48+Math.sin(an3)*7); x.lineTo(Math.cos(an3)*12,-48+Math.sin(an3)*12); x.lineTo(Math.cos(an3+0.2)*7,-48+Math.sin(an3+0.2)*7); x.fill(); } } }
  else if(w==='wand'){ x.fillStyle='#2a1a14'; x.fillRect(-1.1,-18,2.2,22); BA.glow(x,0,-20,10,c.g,0.9); }
  x.restore(); };
BA.hum.head=function(x,D,g,f){ var c=D.pal, h=D.head||'face', hy=g.headY, r=g.headR, sk=c.s||'#d8b090', eye=c.e||c.g;
  var eyes=function(y,dx,sz,col){ BA.glow(x,-dx,y,sz*2.6,col,0.9); BA.glow(x,dx,y,sz*2.6,col,0.9); x.fillStyle='#ffffff'; BA.ell(x,-dx,y,sz*0.5,sz*0.4); x.fill(); BA.ell(x,dx,y,sz*0.5,sz*0.4); x.fill(); };
  // neck
  if(h!=='wraith'&&h!=='hood'&&h!=='void'){ x.fillStyle=shade(sk,-0.2); x.fillRect(-r*0.35,hy+r*0.6,r*0.7,g.neckY-hy-r*0.4+3); }
  if(h==='face'||h==='dwarf'||h==='frost'||h==='vampire'||h==='goblin'||h==='ogre'){
    var hr=h==='goblin'?r*1.18:r;
    if(h==='goblin'){ [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(s*hr*0.7,hy-2); x.lineTo(s*hr*2.1,hy-7); x.lineTo(s*hr*0.9,hy+3); x.closePath(); BA.fillSh(x,sk,s*hr,hy-7,s*hr*2,hy+3,0.25); BA.ol(x,1); }); }
    BA.ell(x,0,hy,hr*0.9,hr*(h==='ogre'?0.85:1)); x.fillStyle=BA.rad(x,-hr*0.3,hy-hr*0.3,1,hr*1.3,[[0,shade(sk,0.25)],[1,shade(sk,-0.3)]]); x.fill(); BA.ol(x,1.2);
    if(h==='ogre'){ x.fillStyle=shade(sk,-0.3); x.fillRect(-hr*0.7,hy-hr*0.35,hr*1.4,2.2); }
    var ey=hy-(h==='ogre'?1:1.5); if(D.eyesGlow){ eyes(ey,hr*0.36,2,eye); } else { x.fillStyle='#1a1418'; BA.ell(x,-hr*0.34,ey,1.1,1.3); x.fill(); BA.ell(x,hr*0.34,ey,1.1,1.3); x.fill(); x.strokeStyle=shade(sk,-0.5); x.lineWidth=1; x.beginPath(); x.moveTo(-hr*0.55,ey-2.5); x.lineTo(-hr*0.15,ey-1.8); x.moveTo(hr*0.55,ey-2.5); x.lineTo(hr*0.15,ey-1.8); x.stroke(); }
    if(h==='goblin'){ x.fillStyle=shade(sk,-0.15); BA.ell(x,0,hy+1.5,2.4,3.2); x.fill(); x.fillStyle='#f0e8d0'; [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(s*3,hy+5); x.lineTo(s*4.5,hy+1); x.lineTo(s*5.5,hy+5.5); x.fill(); }); x.strokeStyle='#3a1a14'; x.lineWidth=1; x.beginPath(); x.moveTo(-5,hy+6); x.quadraticCurveTo(0,hy+8,5,hy+6); x.stroke(); x.fillStyle=rgba(shade(sk,-0.35),0.7); [[-4,hy-4],[5,hy+1],[-6,hy+3]].forEach(function(w){ BA.ell(x,w[0],w[1],1,1); x.fill(); }); }
    if(h==='ogre'){ x.fillStyle='#f0e8d0'; [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(s*2.5,hy+4); x.lineTo(s*3.5,hy-0.5); x.lineTo(s*4.8,hy+4); x.fill(); }); }
    if(h==='vampire'){ x.fillStyle=D.hairCol||'#1a1018'; x.beginPath(); x.arc(0,hy-1,r*0.95,Math.PI*1.02,Math.PI*1.98); x.lineTo(r*0.9,hy+6); x.lineTo(r*0.6,hy-2); x.lineTo(-r*0.6,hy-2); x.lineTo(-r*0.9,hy+6); x.closePath(); x.fill(); x.fillStyle='#8a1020'; x.fillRect(-1.5,hy+4.5,3,1); }
    if(D.beard){ var bc=D.beardCol||'#e8e8f0', bl=D.beard==='long'?22:D.beard==='braid'?20:D.beard==='tentacle'?20:12; x.beginPath(); x.moveTo(-hr*0.85,hy+1); x.quadraticCurveTo(-hr*0.9,hy+bl*0.6,-2,hy+bl); x.lineTo(2,hy+bl); x.quadraticCurveTo(hr*0.9,hy+bl*0.6,hr*0.85,hy+1); x.quadraticCurveTo(0,hy+6,-hr*0.85,hy+1); x.closePath(); BA.fillSh(x,bc,-hr,hy,hr,hy+bl,0.3); BA.ol(x,1);
      x.strokeStyle=rgba(shade(bc,-0.35),0.7); x.lineWidth=0.8; for(var bs=-2;bs<=2;bs++){ x.beginPath(); x.moveTo(bs*2.5,hy+5); x.quadraticCurveTo(bs*3,hy+bl*0.6,bs*1.2,hy+bl-2); x.stroke(); }
      if(D.beard==='braid'){ x.fillStyle=c.m; BA.ell(x,-3,hy+bl-3,1.8,1.4); x.fill(); BA.ell(x,3,hy+bl-3,1.8,1.4); x.fill(); }
      if(D.beard==='tentacle'){ x.strokeStyle=bc; x.lineWidth=2; for(var tn=-2;tn<=2;tn++){ x.beginPath(); x.moveTo(tn*3,hy+bl-4); x.quadraticCurveTo(tn*6,hy+bl+6,tn*3+(tn%2?4:-4),hy+bl+10); x.stroke(); } }
      if(D.beard==='icicle'){ x.fillStyle=rgba('#e0f4ff',0.9); for(var ic=-3;ic<=3;ic++){ x.beginPath(); x.moveTo(ic*2.4-1.2,hy+bl-4); x.lineTo(ic*2.4+1.2,hy+bl-4); x.lineTo(ic*2.4,hy+bl+4+Math.abs(ic)); x.fill(); } } }
    if(D.moustache){ x.fillStyle=D.beardCol||'#6a4a2a'; [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(0,hy+3); x.quadraticCurveTo(s*5,hy+1,s*9,hy+0.5); x.quadraticCurveTo(s*6,hy+4.5,0,hy+4); x.fill(); }); }
    if(D.eyepatch){ x.fillStyle='#101010'; BA.ell(x,-hr*0.34,hy-1.5,2.4,2.2); x.fill(); x.strokeStyle='#101010'; x.lineWidth=0.8; x.beginPath(); x.moveTo(-hr,hy-4); x.lineTo(hr,hy-1); x.stroke(); }
  }
  else if(h==='helm'||h==='greathelm'||h==='hornhelm'){ var hc=D.helmCol||c.m; x.beginPath(); x.moveTo(-r,hy+r*0.9); x.lineTo(-r*1.05,hy-r*0.3); x.quadraticCurveTo(-r,hy-r*1.2,0,hy-r*1.25); x.quadraticCurveTo(r,hy-r*1.2,r*1.05,hy-r*0.3); x.lineTo(r,hy+r*0.9); x.quadraticCurveTo(0,hy+r*1.2,-r,hy+r*0.9); x.closePath(); BA.fillSh(x,hc,-r,hy-r,r,hy+r,0.4); BA.ol(x,1.3);
    x.fillStyle='#08060a'; x.fillRect(-r*0.75,hy-1.8,r*1.5,2.6); x.fillRect(-0.9,hy-1.8,1.8,r*0.8); BA.glow(x,-r*0.35,hy-0.6,4.5,eye,0.95); BA.glow(x,r*0.35,hy-0.6,4.5,eye,0.95);
    x.strokeStyle=rgba(shade(hc,0.5),0.8); x.lineWidth=0.9; x.beginPath(); x.moveTo(0,hy-r*1.2); x.lineTo(0,hy-3); x.stroke();
    if(D.plume){ x.fillStyle=BA.lin(x,0,hy-r*2.4,0,hy-r,[[0,shade(D.plume,0.3)],[1,D.plume]]); x.beginPath(); x.moveTo(-2,hy-r*1.1); x.quadraticCurveTo(-4,hy-r*2.6,-16,hy-r*2.3); x.quadraticCurveTo(-8,hy-r*1.8,2,hy-r*1.1); x.fill(); } }
  else if(h==='hood'||h==='void'||h==='wraith'||h==='lich'||h==='skull'||h==='demon'||h==='plague'||h==='mask'){
    if(h==='hood'||h==='void'||h==='plague'){ var hc2=D.hoodCol||c.a; x.beginPath(); x.moveTo(-r*1.3,hy+r*1.1); x.quadraticCurveTo(-r*1.45,hy-r*0.6,0,hy-r*1.6-(D.pointHood?8:0)); x.quadraticCurveTo(r*1.45,hy-r*0.6,r*1.3,hy+r*1.1); x.quadraticCurveTo(0,hy+r*0.5,-r*1.3,hy+r*1.1); x.closePath(); BA.fillSh(x,hc2,-r*1.3,hy-r*1.5,r*1.3,hy+r,0.3); BA.ol(x,1.3);
      BA.ell(x,0,hy+1,r*0.75,r*0.85); x.fillStyle=h==='void'?BA.rad(x,0,hy,1,r,[[0,'#2a1050'],[1,'#05020a']]):'#0a070c'; x.fill();
      if(h==='void'){ var R=BA.rnd(7+f); for(var st=0;st<9;st++){ x.fillStyle=rgba('#ffffff',0.4+R()*0.6); x.fillRect(-r*0.5+R()*r,hy-r*0.5+R()*r*1.2,0.8,0.8); } }
      if(h==='plague'){ x.beginPath(); x.moveTo(-r*0.5,hy-1); x.lineTo(r*0.5,hy-1); x.lineTo(0,hy+r*1.7); x.closePath(); BA.fillSh(x,D.maskCol||'#d8c8a0',-r*0.5,hy,r*0.5,hy+r*1.7,0.3); BA.ol(x,1); eyes(hy-2,r*0.34,2,eye); }
      else eyes(hy,r*0.33,2.2,eye); }
    else if(h==='skull'||h==='lich'){ BA.ell(x,0,hy-1,r*0.85,r*0.95); BA.fillSh(x,'#e4dcc8',-r,hy-r,r,hy+r,0.3); BA.ol(x,1.2); x.fillStyle='#e4dcc8'; x.fillRect(-r*0.5,hy+r*0.5,r,r*0.45); BA.ol(x,0.8);
      x.fillStyle='#0a0608'; BA.ell(x,-r*0.34,hy-1,r*0.24,r*0.28); x.fill(); BA.ell(x,r*0.34,hy-1,r*0.24,r*0.28); x.fill(); BA.glow(x,-r*0.34,hy-1,5,eye,1); BA.glow(x,r*0.34,hy-1,5,eye,1);
      x.strokeStyle='#3a3028'; x.lineWidth=0.7; for(var tt=-2;tt<=2;tt++){ x.beginPath(); x.moveTo(tt*r*0.18,hy+r*0.5); x.lineTo(tt*r*0.18,hy+r*0.9); x.stroke(); } }
    else if(h==='wraith'){ BA.ell(x,0,hy+1,r*0.9,r*1.05); x.fillStyle=BA.rad(x,0,hy,1,r*1.1,[[0,'#000000'],[0.8,rgba(c.b,0.9)],[1,rgba(c.b,0)]]); x.fill(); eyes(hy,r*0.34,2.3,eye); }
    else if(h==='demon'){ BA.ell(x,0,hy,r*0.95,r*1.05); x.fillStyle=BA.rad(x,0,hy-2,1,r*1.1,[[0,shade(c.b,0.15)],[1,'#050304']]); x.fill(); BA.ol(x,1.2);
      x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=rgba(c.g,0.9); x.beginPath(); x.moveTo(-r*0.6,hy-2); x.lineTo(-r*0.15,hy); x.lineTo(-r*0.55,hy+1); x.closePath(); x.fill(); x.beginPath(); x.moveTo(r*0.6,hy-2); x.lineTo(r*0.15,hy); x.lineTo(r*0.55,hy+1); x.closePath(); x.fill(); x.beginPath(); x.moveTo(-r*0.4,hy+r*0.45); x.lineTo(r*0.4,hy+r*0.45); x.lineTo(0,hy+r*0.8); x.closePath(); x.fill(); x.restore(); BA.glow(x,0,hy,r*1.6,c.g,0.35); }
    else if(h==='mask'){ BA.ell(x,0,hy,r*0.95,r*1.1); BA.fillSh(x,D.maskCol||'#b08050',-r,hy-r,r,hy+r,0.35); BA.ol(x,1.2); x.strokeStyle=c.m; x.lineWidth=1.6; x.beginPath(); x.moveTo(-r*0.8,hy+2); x.lineTo(r*0.8,hy+2); x.moveTo(0,hy-r); x.lineTo(0,hy+r); x.stroke(); x.fillStyle='#08060a'; BA.ell(x,-r*0.38,hy-1.5,2.3,1.6); x.fill(); BA.ell(x,r*0.38,hy-1.5,2.3,1.6); x.fill(); BA.glow(x,-r*0.38,hy-1.5,3.5,eye,0.9); BA.glow(x,r*0.38,hy-1.5,3.5,eye,0.9); }
  }
  else if(h==='bird'){ BA.ell(x,0,hy,r*0.95,r); BA.fillSh(x,D.featherCol||c.a,-r,hy-r,r,hy+r,0.3); BA.ol(x,1.2); x.beginPath(); x.moveTo(r*0.2,hy-1); x.quadraticCurveTo(r*1.8,hy+1,r*1.2,hy+6); x.lineTo(r*0.2,hy+3); x.closePath(); BA.fillSh(x,c.m,0,hy,r*1.6,hy+6,0.3); BA.ol(x,1); eyes(hy-2,r*0.35,1.8,eye); }
  // headgear
  var hg=D.gear, top=hy-r*(h==='hood'||h==='void'?1.5:1.05); BA.anc(x,'head',0,top,r,2);
  if(D.horns){ var hn=D.horns, hc3=D.hornCol||'#e0d8c0'; [-1,1].forEach(function(s){ x.beginPath();
      if(hn==='ram'){ x.moveTo(s*r*0.6,hy-r*0.6); x.bezierCurveTo(s*r*2.2,hy-r*1.6,s*r*2.4,hy+r*0.4,s*r*1.2,hy+r*0.3); x.bezierCurveTo(s*r*1.9,hy-r*0.1,s*r*1.6,hy-r*0.9,s*r*0.8,hy-r*0.2); }
      else if(hn==='antler'){ x.strokeStyle=hc3; x.lineWidth=2; x.moveTo(s*r*0.5,hy-r*0.8); x.lineTo(s*r*1.3,hy-r*2.1); x.lineTo(s*r*2.2,hy-r*2.8); x.moveTo(s*r*1.3,hy-r*2.1); x.lineTo(s*r*1.1,hy-r*3); x.moveTo(s*r*1.8,hy-r*2.5); x.lineTo(s*r*2.5,hy-r*2.2); x.stroke(); return; }
      else if(hn==='bull'||hn==='norse'){ x.moveTo(s*r*0.8,hy-r*0.5); x.quadraticCurveTo(s*r*2.4,hy-r*0.8,s*r*2.2,hy-r*(hn==='norse'?2.4:2)); x.quadraticCurveTo(s*r*1.8,hy-r*1.1,s*r*0.8,hy-r*0.1); }
      else { x.moveTo(s*r*0.45,hy-r*0.8); x.quadraticCurveTo(s*r*1.1,hy-r*2,s*r*1.9,hy-r*(hn==='demon'?3.4:2.6)); x.quadraticCurveTo(s*r*0.9,hy-r*1.7,s*r*0.9,hy-r*0.4); }
      x.closePath(); x.fillStyle=BA.lin(x,s*r*0.5,hy,s*r*2,hy-r*3,[[0,shade(hc3,-0.3)],[1,shade(hc3,0.3)]]); x.fill(); BA.ol(x,1.1); }); }
  if(hg==='crown'||hg==='spikecrown'||hg==='bonecrown'||hg==='icecrown'){ var cc=hg==='bonecrown'?'#e8e0cc':hg==='icecrown'?'#d8f4ff':(D.crownCol||'#e8c040'), n=hg==='spikecrown'?5:4, cw=r*0.95;
    x.beginPath(); x.moveTo(-cw,top+3); for(var k=0;k<=n*2;k++){ var kx=-cw+cw*2*k/(n*2), ky=top+3-(k%2?(hg==='spikecrown'||hg==='icecrown'?10:6):0); x.lineTo(kx,ky); } x.lineTo(cw,top+6); x.lineTo(-cw,top+6); x.closePath(); BA.fillSh(x,cc,-cw,top-8,cw,top+6,0.35); BA.ol(x,1);
    if(hg==='crown'){ x.fillStyle='#e03040'; BA.ell(x,0,top+1.5,1.6,1.6); x.fill(); } if(hg==='icecrown')BA.glow(x,0,top-2,12,'#c0f0ff',0.5); }
  else if(hg==='runecrown'){ for(var rc=0;rc<7;rc++){ var an=rc/7*Math.PI*2+f*0.2, rx=Math.cos(an)*r*1.3, ry=top-4+Math.sin(an)*3; BA.glow(x,rx,ry,4,c.g,0.9); x.strokeStyle='#ffffff'; x.lineWidth=0.7; x.beginPath(); x.moveTo(rx,ry-2.5); x.lineTo(rx,ry+2.5); x.moveTo(rx,ry-1); x.lineTo(rx+1.6,ry-2.4); x.stroke(); } }
  else if(hg==='dawncrown'){ for(var dr=0;dr<11;dr++){ var da=Math.PI+dr/10*Math.PI; x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(dr%2?'#fff0a0':'#ffb040',0.95); x.lineWidth=2; x.beginPath(); x.moveTo(Math.cos(da)*r*0.9,hy-2+Math.sin(da)*r*0.9); x.lineTo(Math.cos(da)*r*(dr%2?1.9:2.4),hy-2+Math.sin(da)*r*(dr%2?1.9:2.4)); x.stroke(); x.restore(); } }
  else if(hg==='wizard'||hg==='witch'){ var hc4=D.hatCol||c.a, droop=hg==='witch'?1:0; x.beginPath(); x.moveTo(-r*1.7,top+4); x.quadraticCurveTo(0,top+7,r*1.7,top+4); x.quadraticCurveTo(0,top-1,-r*1.7,top+4); x.fill(); x.fillStyle=hc4; x.fill(); BA.ol(x,1.1);
    x.beginPath(); x.moveTo(-r*0.95,top+3); x.quadraticCurveTo(-r*0.3,top-14,droop?r*1.6:r*0.3,top-24-(droop?-6:4)); x.quadraticCurveTo(r*0.4,top-10,r*0.95,top+3); x.closePath(); BA.fillSh(x,hc4,-r,top-24,r,top+3,0.3); BA.ol(x,1.1); x.fillStyle=D.hatBand||c.m; x.fillRect(-r*0.9,top-1,r*1.8,2.6);
    if(D.hatStars){ BA.glow(x,-2,top-9,3,c.g,1); BA.glow(x,3,top-15,2.4,c.g,1); } }
  else if(hg==='tricorn'){ x.beginPath(); x.moveTo(-r*1.8,top+3); x.quadraticCurveTo(-r*1.2,top-8,0,top-6); x.quadraticCurveTo(r*1.2,top-8,r*1.8,top+3); x.quadraticCurveTo(0,top+7,-r*1.8,top+3); x.closePath(); BA.fillSh(x,D.hatCol||'#1a1418',-r*1.8,top-8,r*1.8,top+6,0.3); BA.ol(x,1.1); x.strokeStyle=c.m; x.lineWidth=1.1; x.stroke(); x.fillStyle='#f0e8d0'; BA.ell(x,0,top-1,2.3,2); x.fill(); }
  else if(hg==='plumed'){ x.beginPath(); x.moveTo(-r*1.6,top+4); x.quadraticCurveTo(0,top-9,r*1.6,top+4); x.closePath(); BA.fillSh(x,D.hatCol||c.a,-r*1.6,top-8,r*1.6,top+4,0.3); BA.ol(x,1); x.fillStyle=BA.lin(x,0,top-18,0,top,[[0,'#fff8e0'],[1,c.g]]); x.beginPath(); x.moveTo(r*0.3,top-1); x.quadraticCurveTo(r*2.5,top-16,r*3,top-2); x.quadraticCurveTo(r*2,top-8,r*0.3,top-1); x.fill(); }
  else if(hg==='mitre'){ x.beginPath(); x.moveTo(-r*0.85,top+4); x.lineTo(-r*0.7,top-12); x.lineTo(0,top-20); x.lineTo(r*0.7,top-12); x.lineTo(r*0.85,top+4); x.closePath(); BA.fillSh(x,D.hatCol||c.a,-r,top-20,r,top+4,0.3); BA.ol(x,1.1); x.strokeStyle=c.m; x.lineWidth=1.4; x.beginPath(); x.moveTo(0,top-19); x.lineTo(0,top+3); x.stroke(); if(D.mitreFlame){ BA.glow(x,0,top-18,12,c.g,0.9); x.fillStyle=rgba('#fff0b0',0.9); x.beginPath(); x.moveTo(0,top-30-(f%2)*2); x.quadraticCurveTo(5,top-20,0,top-16); x.quadraticCurveTo(-5,top-20,0,top-30); x.fill(); } }
  else if(hg==='halo'){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba('#fff4c0',0.95); x.lineWidth=2.2; BA.ell(x,0,top-6,r*1.15,r*0.36); x.stroke(); x.restore(); }
  else if(hg==='sunhalo'){ for(var sr=0;sr<16;sr++){ var sa=sr/16*Math.PI*2; x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(sr%2?'#fff0a0':'#ffb040',0.85); x.lineWidth=1.6; x.beginPath(); x.moveTo(Math.cos(sa)*r*1.25,hy+Math.sin(sa)*r*1.25); x.lineTo(Math.cos(sa)*r*(sr%2?1.8:2.2),hy+Math.sin(sa)*r*(sr%2?1.8:2.2)); x.stroke(); x.restore(); } }
  else if(hg==='lotus'){ [-6,-2,2,6].forEach(function(dx,i){ x.save(); x.translate(dx,top-1); x.rotate(dx*0.08); x.beginPath(); x.moveTo(0,2); x.quadraticCurveTo(-3.5,-5,0,-10); x.quadraticCurveTo(3.5,-5,0,2); x.fillStyle=i%2?'#ffffff':'#ffb0d8'; x.fill(); BA.ol(x,0.6); x.restore(); }); }
  else if(hg==='reeds'){ x.strokeStyle='#8aa04a'; x.lineWidth=1.4; for(var re=-3;re<=3;re++){ x.beginPath(); x.moveTo(re*2.4,top+3); x.quadraticCurveTo(re*3,top-8,re*4.5,top-14-(re%2?3:0)); x.stroke(); } x.fillStyle='#6a4a2a'; [-3,1,3].forEach(function(re){ BA.ell(x,re*4.3,top-13,1.3,3); x.fill(); }); }
  else if(hg==='coral'){ x.strokeStyle='#ff8870'; x.lineWidth=2; x.beginPath(); for(var cr=-2;cr<=2;cr++){ x.moveTo(cr*3.5,top+2); x.lineTo(cr*5,top-9); x.moveTo(cr*4.4,top-5); x.lineTo(cr*4.4+(cr>0?3:-3),top-11); } x.stroke(); }
  if(D.hair&&h!=='hood'){ x.fillStyle=D.hairCol||'#e0e0e0'; x.beginPath(); x.moveTo(-r*0.9,hy-r*0.6); x.quadraticCurveTo(-r*1.6,hy+r*0.8,-r*1.3,hy+r*2.4); x.lineTo(-r*0.6,hy+r*0.6); x.closePath(); x.fill(); x.beginPath(); x.moveTo(r*0.9,hy-r*0.6); x.quadraticCurveTo(r*1.6,hy+r*0.8,r*1.3,hy+r*2.4); x.lineTo(r*0.6,hy+r*0.6); x.closePath(); x.fill();
    if(D.hair==='wild'){ x.strokeStyle=rgba(c.g,0.9); x.lineWidth=0.9; for(var hw2=0;hw2<5;hw2++){ x.beginPath(); x.moveTo(-r+hw2*r*0.5,hy-r); x.lineTo(-r*1.3+hw2*r*0.6,hy-r*1.8); x.lineTo(-r+hw2*r*0.55,hy-r*2.2); x.stroke(); } } }
  if(D.parrot){ var px2=g.SW+2, py2=g.shY-6; BA.ell(x,px2,py2,4,5.5); BA.fillSh(x,'#e03020',px2-4,py2-5,px2+4,py2+5,0.3); BA.ol(x,0.8); x.fillStyle='#3080e0'; BA.ell(x,px2+1,py2+3,2.6,3.6,-0.3); x.fill(); x.fillStyle='#f0c040'; x.beginPath(); x.moveTo(px2+3,py2-3); x.lineTo(px2+7,py2-2); x.lineTo(px2+3,py2); x.fill(); x.fillStyle='#101010'; x.fillRect(px2+1,py2-3,1,1); }
};
BA.hum.fx=function(x,D,g,f){ var c=D.pal; if(D.flameHead){ var hy=g.headY-g.headR; for(var i=0;i<5;i++){ x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=rgba(i%2?c.g:'#ffe0a0',0.55); x.beginPath(); var bx=(i-2)*4; x.moveTo(bx-4,hy+4); x.quadraticCurveTo(bx-2,hy-10-((i+f)%3)*4,bx,hy-16-((i*3+f)%4)*3); x.quadraticCurveTo(bx+3,hy-8,bx+4,hy+4); x.fill(); x.restore(); } }
  if(D.floatStones){ for(var s=0;s<4;s++){ var an=s*1.57+f*0.3, sx=Math.cos(an)*(g.SW+16), sy=g.shY-6+Math.sin(an)*8; BA.ell(x,sx,sy,5,4); BA.fillSh(x,'#8a8070',sx-5,sy-4,sx+5,sy+4,0.35); BA.ol(x,0.9); BA.glow(x,sx,sy+3,7,c.g,0.3); } }
  if(D.planets){ for(var p=0;p<4;p++){ var pa=p*1.57+f*0.25, px=Math.cos(pa)*(g.SW+20), py=g.shY-10+Math.sin(pa)*10; BA.glow(x,px,py,8,['#ff9060','#80c0ff','#ffe080','#c080ff'][p],0.8); BA.ell(x,px,py,2.6,2.6); x.fillStyle=['#ff9060','#80c0ff','#ffe080','#c080ff'][p]; x.fill(); } }
  if(D.pages){ for(var pg=0;pg<4;pg++){ var pa2=pg*1.57+f*0.35, qx=Math.cos(pa2)*(g.SW+14), qy=g.shY-4+Math.sin(pa2)*7; x.save(); x.translate(qx,qy); x.rotate(pa2); x.fillStyle='#f4ecd8'; x.fillRect(-4,-5,8,10); BA.ol(x,0.6); x.fillStyle=rgba(c.g,0.8); x.fillRect(-2.5,-3,5,0.8); x.fillRect(-2.5,-1,5,0.8); x.fillRect(-2.5,1,4,0.8); x.restore(); } }
  if(D.lightning){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba('#fff8c0',0.9); x.lineWidth=1.2; var R=BA.rnd(BA.hash(D.id)+f*13); for(var l=0;l<3;l++){ var lx=(R()-0.5)*g.SW*3, ly=g.shY-10+R()*20; x.beginPath(); x.moveTo(lx,ly); x.lineTo(lx+(R()-0.5)*8,ly+6); x.lineTo(lx+(R()-0.5)*6,ly+12); x.lineTo(lx+(R()-0.5)*10,ly+19); x.stroke(); } x.restore(); }
};

// ═══════════════════════ QUADRUPEDS: dragon · wolf/warg · behemoth (optional rider) ═══════════════════════
// faces right (the rig flips it). kind: D.beast = 'dragon'|'wolf'|'behemoth'
BA.ARCH.drake={
  back:function(x,D,box){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-56,6,110,[[0,rgba(c.g,0.3)],[0.55,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-150,240,170); x.restore();
    if(D.wings){ var wc=D.wingCol||c.b, sp=D.wingSpan||1; x.save(); x.translate(18,-70); x.scale(sp,sp);
      [[-0.35,0.7,shade(wc,-0.35)],[0,1,wc]].forEach(function(w){ x.save(); x.rotate(w[0]); x.scale(w[1],w[1]); x.beginPath(); x.moveTo(0,0); x.lineTo(-18,-58); x.lineTo(-6,-96); x.quadraticCurveTo(-24,-70,-50,-78); x.quadraticCurveTo(-40,-58,-70,-52); x.quadraticCurveTo(-52,-36,-78,-22); x.quadraticCurveTo(-46,-18,-34,6); x.quadraticCurveTo(-16,-4,0,8); x.closePath();
        x.fillStyle=BA.lin(x,0,-90,-70,0,[[0,rgba(shade(w[2],0.2),0.97)],[1,rgba(shade(w[2],-0.3),0.95)]]); x.fill(); BA.ol(x,1.4);
        x.strokeStyle=rgba(shade(w[2],-0.6),0.95); x.lineWidth=2.4; x.beginPath(); x.moveTo(0,0); x.lineTo(-18,-58); x.lineTo(-6,-96); x.moveTo(-18,-58); x.lineTo(-50,-78); x.moveTo(-18,-58); x.lineTo(-70,-52); x.moveTo(-18,-58); x.lineTo(-78,-22); x.moveTo(-18,-58); x.lineTo(-34,6); x.stroke();
        if(D.wingGlow){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.6); x.lineWidth=1; x.stroke(); x.restore(); } x.restore(); });
      x.restore(); } },
  body:function(x,D,f,box){ var c=D.pal, kind=D.beast||'dragon', bk=D.bulk||1, col=c.a, dark=c.b, belly=D.bellyCol||shade(c.a,0.35);
    var bx=0, by=-50*bk, rx=46*bk, ry=24*bk, lift=[0,-1,-2,1][f];
    var leg=function(lx,near,step,hind){ var lc=near?col:shade(col,-0.38), w=(kind==='wolf'?9:kind==='behemoth'?14:12)*bk, ty=by+ry*0.25, dir=hind?1:-1;
      var kx=lx+dir*w*0.9+step*0.5, ky=by+ry+6*bk, hx2=lx-dir*w*0.5+step, hy2=-w*1.1, px=lx+step*1.4+w*0.2, py=-3;
      BA.ell(x,lx,ty+4*bk,w*1.25,ry*0.8,dir*0.25); BA.fillSh(x,lc,lx-w,ty-ry*0.6,lx+w,ty+ry,0.3); BA.ol(x,1.3);
      x.lineCap='round'; x.strokeStyle='rgba(12,8,14,.78)'; x.lineWidth=w*1.15+2.4; x.beginPath(); x.moveTo(lx,ty+8*bk); x.lineTo(kx,ky); x.lineTo(hx2,hy2); x.lineTo(px,py); x.stroke();
      x.strokeStyle=BA.lin(x,lx-w,ty,lx+w,0,[[0,shade(lc,0.18)],[1,shade(lc,-0.3)]]); x.lineWidth=w*1.15; x.stroke(); x.lineWidth=w*0.8; x.beginPath(); x.moveTo(hx2,hy2); x.lineTo(px,py); x.stroke();
      x.fillStyle=kind==='wolf'?shade(lc,-0.2):shade(dark,0.1); BA.ell(x,px+3,-3,w*0.95,4.2); x.fill(); BA.ol(x,1);
      x.fillStyle='#f0e8d8'; for(var k=0;k<3;k++){ x.beginPath(); x.moveTo(px+w*0.3+k*3,-2); x.lineTo(px+w*0.55+k*3+2,1); x.lineTo(px+w*0.2+k*3,0.5); x.fill(); } };
    var st=[0,2,-3,5][f];
    // far legs + tail
    leg(-rx*0.55,false,-st,true); leg(rx*0.55,false,st,false);
    var tl=kind==='wolf'?60:kind==='behemoth'?40:90, tb=kind==='wolf'?11:9;
    x.beginPath(); x.moveTo(-rx*0.8,by-ry*0.4); x.bezierCurveTo(-rx-tl*0.5,by-ry*(kind==='wolf'?1.4:0.8),-rx-tl*0.8,by+ry*1.2+([0,3,-4,2][f]),-rx-tl,by+ry*0.6); x.bezierCurveTo(-rx-tl*0.7,by+ry*0.8,-rx-tl*0.4,by+ry*0.3,-rx*0.8,by+ry*0.4); x.closePath();
    if(kind==='wolf'){ x.lineWidth=0.01; } BA.fillSh(x,kind==='wolf'?shade(col,-0.1):col,-rx-tl,by-ry,-rx*0.8,by+ry,0.3); BA.ol(x,1.3);
    if(kind==='dragon'&&D.tailSpike!==false){ x.fillStyle=shade(dark,0.1); x.beginPath(); x.moveTo(-rx-tl+4,by+ry*0.55); x.lineTo(-rx-tl-10,by+ry*0.2); x.lineTo(-rx-tl-4,by+ry*0.9); x.fill(); }
    // body
    BA.anc(x,'chest',rx*0.45,by+ry*0.05,ry*0.55,1); BA.anc(x,'shL',-rx*0.35,by-ry*0.85,ry*0.55,1); BA.anc(x,'shR',rx*0.3,by-ry*0.9,ry*0.55,1);
    BA.ell(x,bx,by,rx,ry); BA.fillSh(x,col,-rx,by-ry,rx,by+ry,0.32); BA.ol(x,1.6);
    x.save(); BA.ell(x,bx,by,rx,ry); x.clip(); x.fillStyle=belly; BA.ell(x,bx+4,by+ry*0.75,rx*0.85,ry*0.5); x.fill();
    if(kind==='dragon'||kind==='behemoth'){ x.strokeStyle=rgba(shade(belly,-0.35),0.7); x.lineWidth=1; for(var p=-4;p<=4;p++){ x.beginPath(); x.moveTo(bx+p*rx*0.18,by+ry*0.35); x.lineTo(bx+p*rx*0.18+2,by+ry); x.stroke(); } }
    if(kind==='wolf'){ x.strokeStyle=rgba(shade(col,-0.45),0.6); x.lineWidth=1; for(var fr=0;fr<18;fr++){ var fx=-rx+fr*rx*0.11, fy=by-ry*0.6+(fr%3)*6; x.beginPath(); x.moveTo(fx,fy); x.quadraticCurveTo(fx+3,fy+4,fx+1,fy+9); x.stroke(); } }
    if(D.cracks){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.9); x.lineWidth=1.5; var R=BA.rnd(BA.hash(D.id)); for(var cr=0;cr<10;cr++){ var sx=(R()-0.5)*rx*1.6, sy=by+(R()-0.5)*ry*1.4; x.beginPath(); x.moveTo(sx,sy); x.lineTo(sx+(R()-0.5)*14,sy+R()*9); x.lineTo(sx+(R()-0.5)*16,sy+8+R()*8); x.stroke(); } x.restore(); }
    x.restore();
    // spines / crystals / mane along the back
    var nSp=D.spines===false?0:9; for(var s=0;s<nSp;s++){ var t=s/(nSp-1), sx2=-rx*0.8+t*rx*1.4, sy2=by-Math.sqrt(Math.max(0,1-Math.pow(sx2/rx,2)))*ry;
      if(D.crystals){ x.beginPath(); x.moveTo(sx2-4,sy2+2); x.lineTo(sx2,sy2-12-(s%3)*5); x.lineTo(sx2+4,sy2+2); x.closePath(); x.fillStyle=rgba(c.g,0.85); x.fill(); x.strokeStyle='#ffffff'; x.lineWidth=0.7; x.stroke(); BA.glow(x,sx2,sy2-4,8,c.g,0.35); }
      else if(kind==='wolf'){ x.beginPath(); x.moveTo(sx2-5,sy2+3); x.quadraticCurveTo(sx2-2,sy2-9-(s%2)*3,sx2+4,sy2-6); x.lineTo(sx2+3,sy2+3); x.closePath(); x.fillStyle=shade(col,-0.25-(s%2)*0.1); x.fill(); }
      else { x.beginPath(); x.moveTo(sx2-3.5,sy2+2); x.lineTo(sx2+1,sy2-9-(s%2)*3); x.lineTo(sx2+4,sy2+2); x.closePath(); x.fillStyle=shade(dark,0.15); x.fill(); BA.ol(x,0.8); } }
    // rider (a small humanoid in the saddle)
    if(D.rider){ var R0=Object.assign({pal:c,id:D.id+'_r',build:'normal'},D.rider), g=BA.hum.geo(R0); x.save(); x.translate(-rx*0.1,by-ry*0.7); x.scale(D.riderScale||0.82,D.riderScale||0.82); x.translate(0,-g.hipY);
      BA.hum.offArm(x,R0,g,f); BA.hum.torso(x,R0,g,f); BA.hum.head(x,R0,g,f); BA.hum.wepArm(x,R0,g,f); x.restore();
      x.fillStyle=D.saddleCol||'#5a3020'; BA.ell(x,-rx*0.1,by-ry*0.72,16,6); x.fill(); BA.ol(x,1); }
    // near legs
    leg(-rx*0.45,true,st,true); leg(rx*0.62,true,-st,false);
    // neck + head (wind-up raises it, strike lunges)
    var hp=[[0,0],[1,-1],[-10,-12],[14,6]][f], nx0=rx*0.62, ny0=by-ry*0.35, hx, hy, hs=(D.headSize||1)*bk;
    if(kind==='dragon'){ hx=rx+30*hs+hp[0]; hy=by-48*hs+hp[1]; x.beginPath(); x.moveTo(nx0-12,ny0-8); x.bezierCurveTo(nx0+10,ny0-30,hx-18,hy+20,hx-8,hy+4); x.lineTo(hx+2,hy+12); x.bezierCurveTo(hx-8,hy+30,nx0+20,ny0+10,nx0+6,ny0+14); x.closePath(); BA.fillSh(x,col,nx0-10,hy,hx,ny0+14,0.3); BA.ol(x,1.5);
      x.strokeStyle=rgba(belly,0.8); x.lineWidth=5; x.beginPath(); x.moveTo(nx0+8,ny0+8); x.bezierCurveTo(nx0+20,ny0-6,hx-10,hy+26,hx-2,hy+12); x.stroke(); }
    else { hx=rx+18*hs+hp[0]; hy=by-18*hs+hp[1]; x.beginPath(); x.moveTo(nx0-12,ny0-14); x.quadraticCurveTo(hx-8,hy-16,hx,hy); x.lineTo(hx-2,hy+14); x.quadraticCurveTo(nx0+10,ny0+16,nx0,ny0+14); x.closePath(); BA.fillSh(x,col,nx0,hy-10,hx,ny0+14,0.3); BA.ol(x,1.5);
      if(kind==='wolf'){ x.fillStyle=shade(col,-0.15); for(var mn=0;mn<7;mn++){ x.beginPath(); x.moveTo(nx0-10+mn*5,ny0-10-mn*2); x.lineTo(nx0-18+mn*5,ny0-26-mn*2+(mn%2)*4); x.lineTo(nx0-4+mn*5,ny0-12-mn*2); x.fill(); } } }
    BA.drakeHead(x,D,f,hx,hy,hs,kind);
    BA.lightPass(x,box,D); if(f===3&&D.breath)BA.glow(x,hx+40*hs,hy+8,34*hs,D.breath,0.75); BA.motes(x,D,f,box); }
};
BA.drakeHead=function(x,D,f,hx,hy,hs,kind){ var c=D.pal, col=c.a, open=f===3?1:f===2?0.35:0.1, L=(kind==='wolf'?30:kind==='behemoth'?26:34)*hs, H=(kind==='behemoth'?20:15)*hs;
  x.save(); x.translate(hx,hy); BA.anc(x,'head',L*0.22,-H*0.85,H*0.8,1);
  // horns / ears (behind)
  var hc=D.hornCol||'#e0d8c0';
  if(kind==='wolf'){ x.beginPath(); x.moveTo(-4*hs,-H*0.6); x.lineTo(-2*hs,-H*1.8); x.lineTo(6*hs,-H*0.7); x.closePath(); BA.fillSh(x,shade(col,-0.1),-4,-H*1.8,6,-H*0.6,0.3); BA.ol(x,1.1); }
  else { x.beginPath(); x.moveTo(-6*hs,-H*0.5); x.quadraticCurveTo(-26*hs,-H*1.4,-30*hs,-H*(kind==='behemoth'?0.2:2.1)); x.quadraticCurveTo(-18*hs,-H*1.1,-2*hs,-H*0.1); x.closePath(); x.fillStyle=BA.lin(x,0,0,-30*hs,-H*2,[[0,shade(hc,-0.3)],[1,shade(hc,0.3)]]); x.fill(); BA.ol(x,1.1);
    if(kind==='behemoth'){ x.beginPath(); x.moveTo(2*hs,-H*0.6); x.quadraticCurveTo(10*hs,-H*1.6,-4*hs,-H*2.2); x.quadraticCurveTo(14*hs,-H*1.8,10*hs,-H*0.4); x.closePath(); x.fillStyle=hc; x.fill(); BA.ol(x,1); } }
  // lower jaw (opens)
  x.save(); x.rotate(open*0.42); x.beginPath(); x.moveTo(-4*hs,H*0.15); x.lineTo(L*0.95,H*0.25); x.lineTo(L*0.9,H*0.55); x.quadraticCurveTo(L*0.3,H*0.9,-6*hs,H*0.7); x.closePath(); BA.fillSh(x,shade(col,-0.1),0,0,L,H,0.3); BA.ol(x,1.2);
  x.fillStyle='#f4ecd8'; for(var t=0;t<5;t++){ x.beginPath(); x.moveTo(L*0.25+t*L*0.14,H*0.28); x.lineTo(L*0.3+t*L*0.14,H*0.05); x.lineTo(L*0.35+t*L*0.14,H*0.28); x.fill(); } x.restore();
  if(open>0.5){ x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=BA.rad(x,L*0.5,H*0.35,1,L*0.6,[[0,rgba(D.breath||c.g,0.95)],[1,rgba(D.breath||c.g,0)]]); x.fillRect(-4,-H,L*1.4,H*2); x.restore(); }
  // skull + snout
  x.beginPath(); x.moveTo(-8*hs,-H*0.7); x.quadraticCurveTo(L*0.3,-H*0.95,L,-H*0.15); x.quadraticCurveTo(L*1.05,H*0.2,L*0.92,H*0.3); x.lineTo(-6*hs,H*0.35); x.quadraticCurveTo(-12*hs,0,-8*hs,-H*0.7); x.closePath(); BA.fillSh(x,col,-8,-H,L,H*0.3,0.35); BA.ol(x,1.4);
  x.fillStyle='#f4ecd8'; for(var u=0;u<4;u++){ x.beginPath(); x.moveTo(L*0.35+u*L*0.15,H*0.28); x.lineTo(L*0.4+u*L*0.15,H*0.52); x.lineTo(L*0.45+u*L*0.15,H*0.28); x.fill(); }
  x.fillStyle='#1a1010'; BA.ell(x,L*0.88,-H*0.12,1.6*hs,1.1*hs); x.fill();
  // brow ridge + eye
  x.strokeStyle=rgba(shade(col,-0.5),0.9); x.lineWidth=2*hs; x.beginPath(); x.moveTo(L*0.1,-H*0.55); x.lineTo(L*0.42,-H*0.35); x.stroke();
  BA.glow(x,L*0.32,-H*0.3,8*hs,c.e||c.g,1); x.fillStyle='#fffbe0'; BA.ell(x,L*0.32,-H*0.3,2.2*hs,1.4*hs); x.fill(); x.fillStyle='#200808'; x.fillRect(L*0.32-0.5,-H*0.3-1.3*hs,1,2.6*hs);
  if(kind==='wolf'){ x.strokeStyle=rgba(shade(col,-0.5),0.6); x.lineWidth=0.9; for(var fz=0;fz<5;fz++){ x.beginPath(); x.moveTo(-6+fz*3,-H*0.5+fz); x.lineTo(-10+fz*3,-H*0.1+fz); x.stroke(); } }
  x.restore(); };

// ═══════════════════════ SPIDER (optionally with a sorcerer fused to its front) ═══════════════════════
BA.ARCH.spider={
  back:function(x,D){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-50,6,110,[[0,rgba(c.g,0.3)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-150,240,170); x.restore();
    if(D.web){ x.save(); x.strokeStyle=rgba('#e8e8f0',0.35); x.lineWidth=0.8; for(var s=0;s<10;s++){ var a=Math.PI+s/9*Math.PI; x.beginPath(); x.moveTo(0,-70); x.lineTo(Math.cos(a)*105,-70+Math.sin(a)*80); x.stroke(); } for(var r=1;r<=5;r++){ x.beginPath(); for(var s2=0;s2<=9;s2++){ var a2=Math.PI+s2/9*Math.PI; x.lineTo(Math.cos(a2)*r*20,-70+Math.sin(a2)*r*15); } x.stroke(); } x.restore(); } },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, bk=D.bulk||1, lg=[0,2,-4,4][f];
    var legs=function(front){ for(var i=0;i<4;i++){ [-1,1].forEach(function(s){ if((i<2)!==front)return; var base=-38*bk, ax=s*(10+i*6)*bk, ay=base+(i-1.5)*5, kx=s*(52+i*10)*bk, ky=base-38*bk-((i+f)%2?lg:-lg)-(i===0?8:0), fx=s*(70+i*8)*bk, fy=-2+(i%2)*2;
        var lc=front?col:shade(col,-0.35); x.lineCap='round'; x.strokeStyle='rgba(10,6,10,.8)'; x.lineWidth=7*bk; x.beginPath(); x.moveTo(ax,ay); x.quadraticCurveTo(kx*0.8,ky,kx,ky); x.lineTo(fx,fy); x.stroke();
        x.strokeStyle=BA.lin(x,ax,ay,fx,fy,[[0,shade(lc,0.2)],[1,shade(lc,-0.3)]]); x.lineWidth=4.8*bk; x.stroke(); if(D.legBands){ x.strokeStyle=rgba(c.g,0.7); x.lineWidth=5*bk; x.setLineDash([2,9]); x.stroke(); x.setLineDash([]); } }); } };
    legs(false);
    // abdomen with markings
    var ax=0, ay=-58*bk; BA.ell(x,ax-4,ay-6,44*bk,36*bk); BA.fillSh(x,col,ax-48,ay-42,ax+40,ay+30,0.3); BA.ol(x,1.6);
    x.save(); BA.ell(x,ax-4,ay-6,44*bk,36*bk); x.clip(); x.strokeStyle=rgba(shade(col,-0.4),0.6); x.lineWidth=1.2; for(var h=0;h<12;h++){ x.beginPath(); x.moveTo(ax-48+h*8,ay-44); x.quadraticCurveTo(ax-44+h*8,ay-6,ax-50+h*8,ay+32); x.stroke(); } x.restore();
    x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=rgba(c.g,0.85); var mk=D.mark||'runes';
    if(mk==='hourglass'){ x.beginPath(); x.moveTo(ax-10,ay-26); x.lineTo(ax+6,ay-26); x.lineTo(ax-2,ay-10); x.lineTo(ax+6,ay+6); x.lineTo(ax-10,ay+6); x.lineTo(ax-2,ay-10); x.closePath(); x.fill(); }
    else { x.strokeStyle=rgba(c.g,0.9); x.lineWidth=1.6; [[-18,-20],[0,-30],[14,-14],[-6,-4],[-24,0]].forEach(function(p){ x.beginPath(); x.moveTo(ax+p[0],ay+p[1]-5); x.lineTo(ax+p[0],ay+p[1]+5); x.moveTo(ax+p[0],ay+p[1]-2); x.lineTo(ax+p[0]+4,ay+p[1]-5); x.moveTo(ax+p[0],ay+p[1]+1); x.lineTo(ax+p[0]-4,ay+p[1]-2); x.stroke(); }); }
    x.restore();
    // cephalothorax + eyes + fangs
    var cx=0, cy=-34*bk; BA.anc(x,'head',ax-4,ay-40*bk,14*bk,1); BA.anc(x,'chest',ax-4,ay-10,20*bk,1); BA.ell(x,cx,cy,26*bk,18*bk); BA.fillSh(x,shade(col,0.05),cx-26,cy-18,cx+26,cy+18,0.35); BA.ol(x,1.5);
    if(!D.sorcerer){ [[-8,-8],[8,-8],[-14,-3],[14,-3],[-4,-12],[4,-12],[-10,2],[10,2]].forEach(function(e,i){ BA.glow(x,cx+e[0]*bk,cy+e[1]*bk,(i<2?7:4.5)*bk,c.e||c.g,1); x.fillStyle='#fff'; BA.ell(x,cx+e[0]*bk,cy+e[1]*bk,(i<2?1.6:1)*bk,(i<2?1.6:1)*bk); x.fill(); }); }
    var fo=f===3?5:f===2?-2:0; [-1,1].forEach(function(s){ x.beginPath(); x.moveTo(cx+s*6*bk,cy+10*bk); x.quadraticCurveTo(cx+s*(12+fo)*bk,cy+22*bk,cx+s*(4+fo*0.5)*bk,cy+30*bk); x.lineTo(cx+s*2*bk,cy+14*bk); x.closePath(); BA.fillSh(x,shade(col,-0.2),cx-12,cy+10,cx+12,cy+30,0.3); BA.ol(x,1); });
    legs(true);
    // the sorcerer fused to the spider's front
    if(D.sorcerer){ var R0=Object.assign({pal:c,id:D.id+'_s'},D.sorcerer), g=BA.hum.geo(R0); x.save(); x.translate(0,cy-4*bk); x.scale(0.8*bk,0.8*bk); x.translate(0,-g.hipY);
      BA.hum.offArm(x,R0,g,f); BA.hum.torso(x,R0,g,f); BA.hum.head(x,R0,g,f); BA.hum.wepArm(x,R0,g,f); x.restore(); }
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};

// ═══════════════════════ SERPENT / WYRM rising from the ground ═══════════════════════
BA.ARCH.wyrm={
  back:function(x,D){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-70,6,110,[[0,rgba(c.g,0.3)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-170,240,190); x.restore();
    if(D.hood){ var hc=D.hoodCol||c.a; x.save(); x.translate(8,-118); x.beginPath(); x.moveTo(0,-26); x.bezierCurveTo(-40,-30,-44,22,-10,40); x.lineTo(10,40); x.bezierCurveTo(44,22,40,-30,0,-26); x.closePath(); BA.fillSh(x,hc,-44,-30,44,40,0.3); BA.ol(x,1.4);
      x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.8); x.lineWidth=2; for(var i=0;i<3;i++){ BA.ell(x,-18+i*18,4,4,6); x.stroke(); } x.restore(); x.restore(); } },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, belly=D.bellyCol||shade(c.a,0.35), bk=D.bulk||1, sw=[0,3,-6,10][f];
    // ground: cracked hole
    x.save(); x.fillStyle=BA.rad(x,0,-4,4,70,[[0,rgba(D.holeCol||'#0a0604',0.95)],[1,rgba('#000000',0)]]); BA.ell(x,0,-4,64*bk,14); x.fill(); if(D.holeGlow){ x.globalCompositeOperation='lighter'; BA.ell(x,0,-4,50*bk,9); x.fillStyle=rgba(D.holeGlow,0.55); x.fill(); } x.restore();
    // coils behind
    [[-40,-14,22,11],[38,-12,20,10]].forEach(function(o){ BA.ell(x,o[0]*bk,o[1],o[2]*bk,o[3]*bk); BA.fillSh(x,shade(col,-0.15),o[0]*bk-o[2],o[1]-o[3],o[0]*bk+o[2],o[1]+o[3],0.3); BA.ol(x,1.3); });
    // rising body: stack of segments along an S-curve
    var pts=[]; for(var i=0;i<=24;i++){ var t=i/24, y=-10-t*120*bk, xx=Math.sin(t*3.1+0.4)*28*bk*(1-t*0.3)+t*sw; pts.push([xx,y,(1-t*0.55)*20*bk]); }
    for(var j=0;j<pts.length;j++){ var p=pts[j]; BA.ell(x,p[0],p[1],p[2],p[2]*0.9); x.fillStyle=BA.lin(x,p[0]-p[2],0,p[0]+p[2],0,[[0,shade(col,0.28)],[0.55,col],[1,shade(col,-0.4)]]); x.fill(); }
    x.save(); x.strokeStyle='rgba(12,8,14,.6)'; x.lineWidth=1.4; x.beginPath(); pts.forEach(function(p,i){ if(i)x.lineTo(p[0]-p[2],p[1]); else x.moveTo(p[0]-p[2],p[1]); }); x.stroke(); x.beginPath(); pts.forEach(function(p,i){ if(i)x.lineTo(p[0]+p[2],p[1]); else x.moveTo(p[0]+p[2],p[1]); }); x.stroke(); x.restore();
    // belly scales on the front
    x.strokeStyle=rgba(shade(belly,-0.25),0.9); x.fillStyle=belly; for(var b=1;b<pts.length-3;b+=2){ var q=pts[b]; BA.ell(x,q[0]+q[2]*0.25,q[1],q[2]*0.45,q[2]*0.32); x.fill(); x.lineWidth=0.8; x.stroke(); }
    // spines / crystals / lava
    for(var s=2;s<pts.length-2;s+=2){ var r=pts[s]; if(D.crystals){ x.beginPath(); x.moveTo(r[0]-r[2]-2,r[1]+3); x.lineTo(r[0]-r[2]-12,r[1]-6); x.lineTo(r[0]-r[2]+1,r[1]-3); x.closePath(); x.fillStyle=rgba(c.g,0.85); x.fill(); }
      else if(D.cracks){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.8); x.lineWidth=1.3; x.beginPath(); x.moveTo(r[0]-r[2]*0.5,r[1]); x.lineTo(r[0],r[1]+3); x.lineTo(r[0]+r[2]*0.4,r[1]-2); x.stroke(); x.restore(); }
      else { x.beginPath(); x.moveTo(r[0]-r[2]+1,r[1]+3); x.lineTo(r[0]-r[2]-8,r[1]-4); x.lineTo(r[0]-r[2]+2,r[1]-3); x.closePath(); x.fillStyle=shade(c.b,0.1); x.fill(); } }
    if(D.moss){ x.fillStyle=rgba('#5a8a3a',0.85); [3,8,13,17].forEach(function(i){ var m=pts[i]; BA.ell(x,m[0]-m[2]*0.4,m[1]-m[2]*0.5,m[2]*0.5,m[2]*0.25); x.fill(); }); }
    // head
    BA.anc(x,'chest',pts[9][0],pts[9][1],pts[9][2]*0.6,1); BA.anc(x,'shL',pts[14][0]-pts[14][2]*0.6,pts[14][1],pts[14][2]*0.6,1); BA.anc(x,'shR',pts[7][0]+pts[7][2]*0.6,pts[7][1],pts[7][2]*0.6,1);
    var H=pts[pts.length-1], hx=H[0]+4, hy=H[1]-6, hs=(D.headSize||1)*bk; var ang=[0,0.02,-0.25,0.3][f];
    x.save(); x.translate(hx,hy); x.rotate(ang); BA.drakeHead(x,D,f,0,0,hs*0.9,D.headKind||'dragon'); x.restore();
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};

// ═══════════════════════ GOLEM / CONSTRUCT ═══════════════════════
BA.ARCH.golem={
  back:function(x,D){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-70,6,110,[[0,rgba(c.g,0.3)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-160,240,180); x.restore();
    if(D.rings){ x.save(); x.translate(0,-78); [[62,20,0.3],[54,54,0],[70,16,-0.5]].forEach(function(r,i){ x.strokeStyle=rgba(i===1?c.m:c.g,0.85); x.lineWidth=2.4; BA.ell(x,0,0,r[0],r[1],r[2]); x.stroke(); for(var k=0;k<6;k++){ var a=k/6*Math.PI*2; x.save(); x.rotate(r[2]); BA.glow(x,Math.cos(a)*r[0],Math.sin(a)*r[1],5,c.g,0.9); x.restore(); } }); x.restore(); }
    if(D.runes){ x.save(); x.strokeStyle=rgba(c.g,0.7); x.lineWidth=1.4; BA.ell(x,0,-92,50,50); x.stroke(); for(var q=0;q<10;q++){ var an=q/10*Math.PI*2; x.save(); x.translate(Math.cos(an)*50,-92+Math.sin(an)*50); x.rotate(an); x.beginPath(); x.moveTo(0,-3); x.lineTo(0,3); x.moveTo(0,-1); x.lineTo(2,-3); x.stroke(); x.restore(); } x.restore(); } },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, mt=D.mat||'stone', bk=D.bulk||1, sw=44*bk, top=-112*bk, hip=-40*bk, armA=[0,0.04,-0.5,0.35][f];
    var slab=function(pts,cl,sh){ BA.poly(x,pts); BA.fillSh(x,cl,-sw,top,sw,0,sh||0.35); BA.ol(x,1.5); };
    // legs
    [-1,1].forEach(function(s){ slab([[s*10*bk,hip],[s*30*bk,hip],[s*32*bk,-4],[s*8*bk,-4]],shade(col,-0.15)); x.fillStyle=shade(col,-0.3); x.fillRect(Math.min(s*6*bk,s*34*bk),-8,28*bk,8); BA.ol(x,1); });
    // torso
    slab([[-sw,top+14*bk],[-sw*0.7,top],[sw*0.7,top],[sw,top+14*bk],[sw*0.72,hip],[-sw*0.72,hip]],col,0.4);
    x.save(); BA.poly(x,[[-sw,top+14*bk],[-sw*0.7,top],[sw*0.7,top],[sw,top+14*bk],[sw*0.72,hip],[-sw*0.72,hip]]); x.clip();
    var R=BA.rnd(BA.hash(D.id));
    if(mt==='iron'||mt==='gold'){ x.strokeStyle=rgba(shade(col,-0.5),0.9); x.lineWidth=1.3; for(var pl=0;pl<4;pl++){ x.beginPath(); x.moveTo(-sw,top+22*bk+pl*16*bk); x.lineTo(sw,top+22*bk+pl*16*bk); x.stroke(); } x.fillStyle=shade(col,0.4); for(var rv=0;rv<22;rv++){ BA.ell(x,-sw+6+(rv%11)*sw*0.18,top+18*bk+Math.floor(rv/11)*48*bk,1.4,1.4); x.fill(); } }
    else if(mt==='obsidian'){ for(var sh=0;sh<14;sh++){ var sx=(R()-0.5)*sw*2, sy=top+R()*(hip-top); BA.poly(x,[[sx,sy],[sx+8+R()*8,sy+4],[sx+2,sy+12+R()*10]]); x.fillStyle=rgba(sh%2?'#ffffff':c.g,sh%2?0.15:0.35); x.fill(); } }
    else { for(var st=0;st<16;st++){ var bx=(R()-0.5)*sw*2, by=top+R()*(hip-top); x.strokeStyle=rgba(shade(col,-0.5),0.7); x.lineWidth=1.1; x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+(R()-0.5)*14,by+R()*10); x.stroke(); } }
    if(mt==='magma'||D.cracks){ x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.9); x.lineWidth=1.8; for(var cr=0;cr<12;cr++){ var cx=(R()-0.5)*sw*1.8, cy=top+R()*(hip-top); x.beginPath(); x.moveTo(cx,cy); x.lineTo(cx+(R()-0.5)*16,cy+6+R()*8); x.lineTo(cx+(R()-0.5)*18,cy+14+R()*10); x.stroke(); } x.globalCompositeOperation='source-over'; }
    if(D.moss){ x.fillStyle=rgba('#5a8a3a',0.85); for(var m=0;m<6;m++){ BA.ell(x,(R()-0.5)*sw*1.6,top+4+R()*20,8,3.5); x.fill(); } }
    x.restore();
    if(D.core!==false){ BA.glow(x,0,top+36*bk,22*bk,c.g,1); BA.ell(x,0,top+36*bk,7*bk,7*bk); x.fillStyle=BA.rad(x,-2,top+34*bk,1,7*bk,[[0,'#ffffff'],[1,c.g]]); x.fill(); BA.ol(x,1.1); }
    if(D.runeLines){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.85); x.lineWidth=1.4; x.beginPath(); x.moveTo(-sw*0.5,top+20*bk); x.lineTo(-sw*0.2,top+36*bk); x.lineTo(-sw*0.5,top+56*bk); x.moveTo(sw*0.5,top+20*bk); x.lineTo(sw*0.2,top+36*bk); x.lineTo(sw*0.5,top+56*bk); x.stroke(); x.restore(); }
    if(D.vents){ [-1,1].forEach(function(s){ x.fillStyle='#1a1414'; x.fillRect(s*sw*0.55-5,top+62*bk,10,12); for(var v=0;v<3;v++){ x.fillStyle=rgba('#ffffff',0.25-v*0.07); BA.ell(x,s*sw*0.55,top+58*bk-v*9,6+v*3,4+v*2); x.fill(); } }); }
    // head sunk between the shoulders
    var hy=top-2*bk; if(D.head==='helm'){ BA.poly(x,[[-12*bk,hy+6],[-13*bk,hy-12*bk],[0,hy-18*bk],[13*bk,hy-12*bk],[12*bk,hy+6]]); BA.fillSh(x,c.m,-13,hy-18,13,hy+6,0.4); BA.ol(x,1.3); x.fillStyle='#08060a'; x.fillRect(-8*bk,hy-6*bk,16*bk,3); BA.glow(x,0,hy-5*bk,10*bk,c.e||c.g,1); }
    else { BA.poly(x,[[-11*bk,hy+6],[-10*bk,hy-14*bk],[10*bk,hy-14*bk],[11*bk,hy+6]]); BA.fillSh(x,shade(col,0.05),-11,hy-14,11,hy+6,0.4); BA.ol(x,1.3); BA.glow(x,-4*bk,hy-5*bk,6*bk,c.e||c.g,1); BA.glow(x,4*bk,hy-5*bk,6*bk,c.e||c.g,1); }
    BA.anc(x,'head',0,hy-14*bk,11*bk,1); BA.anc(x,'chest',0,top+36*bk,9*bk,1); BA.anc(x,'shL',-(sw+2),top+6*bk,15*bk,1); BA.anc(x,'shR',sw+2,top+6*bk,15*bk,1);
    if(D.crown){ x.fillStyle=D.crown; BA.poly(x,[[-10*bk,hy-13*bk],[-9*bk,hy-24*bk],[-4*bk,hy-16*bk],[0,hy-27*bk],[4*bk,hy-16*bk],[9*bk,hy-24*bk],[10*bk,hy-13*bk]]); x.fill(); BA.ol(x,1); }
    if(D.horns){ [-1,1].forEach(function(s){ BA.poly(x,[[s*9*bk,hy-10*bk],[s*26*bk,hy-30*bk],[s*14*bk,hy-6*bk]]); BA.fillSh(x,D.hornCol||'#2a2020',s*9,hy-30,s*26,hy,0.3); BA.ol(x,1); }); }
    // shoulders + arms + fists
    [-1,1].forEach(function(s){ var a=s>0?armA:-armA*0.3, shx=s*(sw+2), shy=top+16*bk, L=64*bk, fx=shx+Math.sin(s*0.12+a*s)*L*0.3*s, fy=shy+Math.cos(a)*L;
      if(s>0&&f===2){ fy=shy-20*bk; fx=shx+18*bk; } if(s>0&&f===3){ fy=shy+L*0.95; fx=shx+22*bk; }
      x.beginPath(); x.moveTo(shx-s*12*bk,shy-8*bk); x.lineTo(shx+s*16*bk,shy-6*bk); x.lineTo(fx+s*13*bk,fy-6*bk); x.lineTo(fx-s*11*bk,fy-6*bk); x.closePath(); BA.fillSh(x,shade(col,-0.05),shx-16,shy,fx+16,fy,0.35); BA.ol(x,1.4);
      BA.ell(x,shx+s*2*bk,shy-2*bk,17*bk,13*bk); BA.fillSh(x,D.pauldron||shade(col,0.1),shx-18,shy-16,shx+18,shy+10,0.4); BA.ol(x,1.4);
      if(D.shoulderCrystals){ for(var k=0;k<3;k++){ BA.poly(x,[[shx+s*(k*6-6)*bk,shy-10*bk],[shx+s*(k*6-3)*bk,shy-(28+k*6)*bk],[shx+s*k*6*bk,shy-10*bk]]); x.fillStyle=rgba(c.g,0.85); x.fill(); x.strokeStyle='#fff'; x.lineWidth=0.6; x.stroke(); } }
      if(s>0&&D.weapon==='hammer'){ x.save(); x.translate(fx,fy); x.rotate(f===2?-2.4:f===3?0.4:-0.2); x.fillStyle='#3a3030'; x.fillRect(-2.5*bk,-52*bk,5*bk,56*bk); BA.poly(x,[[-18*bk,-66*bk],[18*bk,-66*bk],[18*bk,-46*bk],[-18*bk,-46*bk]]); BA.fillSh(x,c.m,-18,-66,18,-46,0.4); BA.ol(x,1.3); x.restore(); }
      if(s>0&&D.weapon==='drill'){ x.save(); x.translate(fx,fy); x.rotate(f===3?-1.2:-0.4); BA.poly(x,[[-12*bk,0],[12*bk,0],[0,40*bk]]); BA.fillSh(x,c.m,-12,0,12,40,0.4); BA.ol(x,1.2); x.restore(); }
      else if(s>0&&D.weapon==='chains'){ x.strokeStyle='#6a6670'; x.lineWidth=1.6; for(var l=0;l<10;l++){ BA.ell(x,fx+l*3*bk,fy+6+l*4*bk,2,2.6,l%2?0:1.57); x.stroke(); } }
      BA.ell(x,fx,fy,13*bk,11*bk); BA.fillSh(x,shade(col,-0.1),fx-13,fy-11,fx+13,fy+11,0.4); BA.ol(x,1.4); if(mt==='magma'||D.fistGlow)BA.glow(x,fx,fy,12*bk,c.g,0.55); });
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};

// ═══════════════════════ ORB: great eye · burning heart · storm cloud ═══════════════════════
BA.ARCH.orb={
  back:function(x,D){ var c=D.pal, cy=-96; x.save(); x.fillStyle=BA.rad(x,0,cy,8,120,[[0,rgba(c.g,0.45)],[0.5,rgba(c.g,0.12)],[1,rgba(c.g,0)]]); x.fillRect(-130,-200,260,220); x.restore();
    x.save(); x.translate(0,cy); if(D.ring!==false){ x.strokeStyle=rgba(c.m,0.85); x.lineWidth=2; BA.ell(x,0,0,78,78); x.stroke(); x.lineWidth=1; BA.ell(x,0,0,70,70); x.stroke(); for(var r=0;r<16;r++){ var an=r/16*Math.PI*2; x.save(); x.rotate(an); x.translate(74,0); x.strokeStyle=rgba(c.g,0.95); x.lineWidth=1.3; x.beginPath(); x.moveTo(-3,0); x.lineTo(3,0); x.moveTo(0,-3); x.lineTo(2,1); x.stroke(); x.restore(); } }
    if(D.orb==='heart'){ [-1,1].forEach(function(s){ for(var k=0;k<4;k++){ var y0=-40+k*20; x.beginPath(); x.moveTo(0,y0-6); x.bezierCurveTo(s*40,y0-26,s*72,y0+4,s*(52-k*6),y0+34); x.strokeStyle='rgba(12,8,10,.9)'; x.lineWidth=9; x.stroke(); x.strokeStyle='#2a2024'; x.lineWidth=6; x.stroke(); x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.55); x.lineWidth=1.2; x.stroke(); x.restore(); } }); x.fillStyle='#2a2024'; x.fillRect(-4,-52,8,100); }
    x.restore(); },
  body:function(x,D,f,box){ var c=D.pal, cy=-96+[0,1,-3,2][f], R=D.orbR||40; BA.anc(x,'head',0,cy-R*0.98,R*0.5,1); BA.anc(x,'chest',0,cy,R*0.4,1);
    if(D.orb==='storm'){ var Rn=BA.rnd(BA.hash(D.id)+f); for(var i=0;i<26;i++){ var a=Rn()*Math.PI*2, d=Rn()*R*0.95, px=Math.cos(a)*d*1.3, py=cy+Math.sin(a)*d*0.85, r=R*(0.35+Rn()*0.35); BA.ell(x,px,py,r,r*0.85); x.fillStyle=BA.rad(x,px-r*0.3,py-r*0.4,1,r,[[0,shade(c.a,0.3)],[0.7,c.a],[1,shade(c.a,-0.3)]]); x.fill(); }
      // cloud arms
      [-1,1].forEach(function(s){ for(var k=0;k<6;k++){ var t=k/5, ax=s*(R*1.1+t*38), ay=cy+10+t*(f===2?-40:f===3?34:18); BA.ell(x,ax,ay,14-t*6,11-t*5); x.fillStyle=shade(c.a,-0.1*t); x.fill(); } });
      BA.glow(x,0,cy-4,R*1.1,c.g,0.75); x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=rgba('#ffffff',0.95); BA.ell(x,-10,cy-10,4,2.6); x.fill(); BA.ell(x,10,cy-10,4,2.6); x.fill(); x.fillStyle=rgba(c.g,0.9); x.beginPath(); x.moveTo(-12,cy+6); x.quadraticCurveTo(0,cy+14+(f===3?6:0),12,cy+6); x.quadraticCurveTo(0,cy+10,-12,cy+6); x.fill(); x.restore();
      x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba('#fff8c0',0.95); x.lineWidth=2; for(var b=0;b<3;b++){ var bx=(Rn()-0.5)*R*2, by=cy+R*0.6; x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+(Rn()-0.5)*14,by+14); x.lineTo(bx+(Rn()-0.5)*10,by+26); x.lineTo(bx+(Rn()-0.5)*16,by+44+Rn()*20); x.stroke(); } x.restore();
      BA.motes(x,D,f,box); return; }
    // tendrils / flames below
    for(var t=0;t<7;t++){ var tx=(t-3)*R*0.28, sw=Math.sin(t*1.7+f*0.9)*10; x.beginPath(); x.moveTo(tx-6,cy+R*0.6); x.bezierCurveTo(tx+sw,cy+R*1.2,tx-sw,cy+R*1.6,tx+sw*0.5,cy+R*1.9+(t%3)*8); x.lineTo(tx+6,cy+R*0.6); x.closePath();
      x.fillStyle=D.orb==='heart'?BA.lin(x,0,cy+R*0.5,0,cy+R*2,[[0,rgba(c.g,0.95)],[1,rgba('#ffe070',0)]]):BA.lin(x,0,cy+R*0.5,0,cy+R*2,[[0,rgba(c.a,0.95)],[1,rgba(c.b,0)]]); x.fill(); }
    // corona
    x.save(); x.globalCompositeOperation='lighter'; for(var k=0;k<14;k++){ var a2=k/14*Math.PI*2+f*0.1, L=R*(1.25+((k+f)%3)*0.12); x.fillStyle=rgba(k%2?c.g:shade(c.g,0.4),0.55); x.beginPath(); x.moveTo(Math.cos(a2-0.12)*R*0.9,cy+Math.sin(a2-0.12)*R*0.9); x.lineTo(Math.cos(a2)*L,cy+Math.sin(a2)*L); x.lineTo(Math.cos(a2+0.12)*R*0.9,cy+Math.sin(a2+0.12)*R*0.9); x.fill(); } x.restore();
    if(D.orb==='heart'){ x.beginPath(); x.moveTo(0,cy+R*0.95); x.bezierCurveTo(-R*1.3,cy+R*0.1,-R*0.9,cy-R*1.05,0,cy-R*0.45); x.bezierCurveTo(R*0.9,cy-R*1.05,R*1.3,cy+R*0.1,0,cy+R*0.95); x.closePath(); x.fillStyle=BA.rad(x,-R*0.2,cy-R*0.2,2,R*1.2,[[0,'#fff0a0'],[0.35,c.g],[0.8,c.a],[1,c.b]]); x.fill(); BA.ol(x,2);
      x.strokeStyle=rgba('#2a0a04',0.8); x.lineWidth=2.2; x.beginPath(); x.moveTo(-R*0.5,cy-R*0.3); x.quadraticCurveTo(-R*0.1,cy+R*0.1,-R*0.3,cy+R*0.6); x.moveTo(R*0.4,cy-R*0.4); x.quadraticCurveTo(R*0.1,cy,R*0.25,cy+R*0.5); x.stroke();
      BA.glow(x,0,cy,R*0.9,c.g,0.4); }
    else { // the eye
      BA.ell(x,0,cy,R*1.25,R*0.95); x.fillStyle=BA.rad(x,-R*0.3,cy-R*0.3,2,R*1.3,[[0,'#f8f0e8'],[0.6,'#d8c8c0'],[1,'#6a5058']]); x.fill(); BA.ol(x,2);
      x.strokeStyle=rgba('#a02030',0.6); x.lineWidth=0.9; var Rv=BA.rnd(BA.hash(D.id)); for(var v=0;v<12;v++){ var va=Rv()*Math.PI*2; x.beginPath(); x.moveTo(Math.cos(va)*R*1.15,cy+Math.sin(va)*R*0.88); x.quadraticCurveTo(Math.cos(va+0.3)*R*0.9,cy+Math.sin(va+0.3)*R*0.7,Math.cos(va)*R*0.62,cy+Math.sin(va)*R*0.5); x.stroke(); }
      // eyelids of flame (the lids narrow on the wind-up)
      var lid=[0.08,0.12,0.42,0][f]; x.save(); BA.ell(x,0,cy,R*1.25,R*0.95); x.clip(); x.fillStyle=BA.lin(x,0,cy-R,0,cy,[[0,c.b],[1,shade(c.b,0.25)]]); x.beginPath(); x.moveTo(-R*1.4,cy-R*1.1); x.lineTo(R*1.4,cy-R*1.1); x.lineTo(R*1.4,cy-R*(0.95-lid*1.9)); x.quadraticCurveTo(0,cy-R*(1.25-lid*2.6),-R*1.4,cy-R*(0.95-lid*1.9)); x.closePath(); x.fill(); x.restore();
      x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.9); x.lineWidth=2.4; BA.ell(x,0,cy,R*1.28,R*0.98); x.stroke(); x.restore(); }
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); },
  // the pupil/iris on its own layer so the rig can make it follow the player
  pupil:function(x,D){ if(D.orb==='heart'||D.orb==='storm')return; var c=D.pal, cy=-96, R=D.orbR||40;
    BA.glow(x,0,cy,R*0.75,c.g,0.9); BA.ell(x,0,cy,R*0.5,R*0.5); x.fillStyle=BA.rad(x,0,cy,2,R*0.5,[[0,shade(c.g,0.5)],[0.5,c.g],[1,shade(c.g,-0.5)]]); x.fill(); BA.ol(x,1.4);
    x.fillStyle='#050208'; BA.ell(x,0,cy,R*0.09,R*0.4); x.fill(); x.fillStyle='rgba(255,255,255,.85)'; BA.ell(x,-R*0.18,cy-R*0.2,R*0.07,R*0.05); x.fill(); }
};

// ═══════════════════════ BIRD: roc · phoenix · thunderbird ═══════════════════════
BA.ARCH.bird={
  back:function(x,D){ var c=D.pal, wc=D.wingCol||c.a, wc2=D.wingCol2||c.g, fl=D.bird==='phoenix'; x.save(); x.fillStyle=BA.rad(x,0,-70,6,120,[[0,rgba(c.g,0.35)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-130,-160,260,180); x.restore();
    [1,-1].forEach(function(s){ x.save(); x.translate(s*14,-78); x.scale(s,1);
      for(var r=0;r<3;r++)for(var k=0;k<9;k++){ var a=-2.2+k*0.24+r*0.1, L=(70+k*5)*(1-r*0.22); x.save(); x.rotate(a+Math.PI/2);
        x.fillStyle=fl?BA.lin(x,0,0,L,0,[[0,'rgba(255,90,20,.95)'],[0.6,rgba(wc2,0.9)],[1,'rgba(255,240,170,.4)']]):BA.lin(x,0,0,L,0,[[0,shade(r%2?wc2:wc,0.1)],[1,shade(r%2?wc:wc2,-0.2)]]);
        x.beginPath(); x.moveTo(0,0); x.quadraticCurveTo(L*0.5,-7-r,L,0); x.quadraticCurveTo(L*0.5,5,0,0); x.fill(); if(!fl){ x.strokeStyle='rgba(20,14,10,.4)'; x.lineWidth=0.7; x.stroke(); } x.restore(); }
      if(D.bird==='thunder'){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba('#fff8c0',0.95); x.lineWidth=1.6; x.beginPath(); x.moveTo(30,-50); x.lineTo(44,-30); x.lineTo(36,-28); x.lineTo(56,-4); x.stroke(); x.restore(); }
      x.restore(); }); },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, fl=D.bird==='phoenix', by=-66+[0,-1,-4,2][f];
    // tail fan
    for(var t=0;t<7;t++){ var a=Math.PI/2+(t-3)*0.18, L=48+(t%2)*8; x.save(); x.translate(0,by+20); x.rotate(a-Math.PI/2); x.fillStyle=fl?BA.lin(x,0,0,0,L,[[0,c.g],[1,'rgba(255,230,150,.2)']]):BA.lin(x,0,0,0,L,[[0,col],[1,shade(col,-0.4)]]); x.beginPath(); x.moveTo(-4,0); x.quadraticCurveTo(-7,L*0.6,0,L); x.quadraticCurveTo(7,L*0.6,4,0); x.fill(); if(!fl)BA.ol(x,0.8); x.restore(); }
    // legs + talons
    [-1,1].forEach(function(s){ x.strokeStyle=D.legCol||'#d8b040'; x.lineWidth=4; x.beginPath(); x.moveTo(s*10,by+24); x.lineTo(s*12,-4); x.stroke(); x.strokeStyle='#201810'; x.lineWidth=2; for(var k=-1;k<=1;k++){ x.beginPath(); x.moveTo(s*12,-4); x.quadraticCurveTo(s*12+k*6,-2,s*12+k*9,1); x.stroke(); } });
    // body
    BA.ell(x,0,by,26,36); BA.fillSh(x,col,-26,by-36,26,by+36,0.35); BA.ol(x,1.5);
    x.save(); BA.ell(x,0,by,26,36); x.clip(); x.fillStyle=D.chestCol||shade(col,0.35); BA.ell(x,2,by+8,16,26); x.fill(); x.strokeStyle=rgba(shade(col,-0.4),0.5); x.lineWidth=0.9; for(var fr=0;fr<14;fr++){ x.beginPath(); x.arc(-14+(fr%5)*7,by-10+Math.floor(fr/5)*12,4,0.2,Math.PI-0.2); x.stroke(); } x.restore();
    if(fl){ BA.glow(x,0,by,40,c.g,0.6); }
    // head + beak + crest
    var hy=by-44+[0,0,-4,6][f], hx=[0,0,-3,5][f]; BA.anc(x,'head',hx,hy-13,12,1); BA.anc(x,'chest',0,by,14,1); BA.ell(x,hx,hy,15,14); BA.fillSh(x,D.headCol||col,hx-15,hy-14,hx+15,hy+14,0.35); BA.ol(x,1.4);
    var crest=D.crest||(fl?'flame':'plume'); for(var k2=0;k2<5;k2++){ x.save(); x.translate(hx-4,hy-10); x.rotate(-1.2-k2*0.25); x.fillStyle=crest==='flame'?rgba(k2%2?c.g:'#ffe0a0',0.9):crest==='gold'?'#e8c040':shade(col,0.2); x.beginPath(); x.moveTo(0,-2); x.quadraticCurveTo(14,-8,26-k2*2,-2); x.quadraticCurveTo(14,2,0,2); x.fill(); x.restore(); }
    x.beginPath(); x.moveTo(hx+8,hy-4); x.quadraticCurveTo(hx+30,hy-2,hx+24,hy+12); x.quadraticCurveTo(hx+18,hy+6,hx+8,hy+6); x.closePath(); BA.fillSh(x,D.beakCol||'#e8c040',hx+8,hy-4,hx+28,hy+12,0.35); BA.ol(x,1.1);
    if(f===3){ x.beginPath(); x.moveTo(hx+8,hy+6); x.lineTo(hx+22,hy+14); x.lineTo(hx+8,hy+10); x.fill(); }
    BA.glow(x,hx+5,hy-3,6,c.e||c.g,1); x.fillStyle='#fff'; BA.ell(x,hx+5,hy-3,1.6,1.6); x.fill();
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};

// ═══════════════════════ KRAKEN ═══════════════════════
BA.ARCH.kraken={
  back:function(x,D){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-60,6,110,[[0,rgba(c.g,0.3)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-150,240,170); x.restore();
    for(var t=0;t<4;t++){ var s=t%2?1:-1, a=0.4+t*0.3; BA.krTent(x,D,s*20,-50,s*(70+t*10),-100-t*8,s*(90+t*6),-40+t*10,0,0.7,shade(D.pal.a,-0.3)); } },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, cy=-78+[0,1,-5,3][f];
    for(var t=0;t<6;t++){ var s=t<3?-1:1, k=t%3; var wig=[0,4,-8,10][f]*(k-1); BA.krTent(x,D,s*(10+k*8),cy+28,s*(40+k*22)+wig,cy+46,s*(60+k*18)-wig,-4+k*2,f,1,col); }
    BA.anc(x,'head',0,cy-50,22,1); BA.anc(x,'chest',0,cy-10,14,1); BA.anc(x,'shL',-34,cy-26,14,1); BA.anc(x,'shR',34,cy-26,14,1);
    BA.ell(x,0,cy-6,40,46); BA.fillSh(x,col,-40,cy-52,40,cy+40,0.35); BA.ol(x,1.8);
    x.save(); BA.ell(x,0,cy-6,40,46); x.clip(); x.fillStyle=rgba(shade(col,-0.3),0.5); for(var sp=0;sp<14;sp++){ var R=BA.rnd(sp*31+7); BA.ell(x,(R()-0.5)*70,cy-40+R()*60,3+R()*4,2+R()*3); x.fill(); } x.restore();
    [-1,1].forEach(function(s){ BA.ell(x,s*16,cy+14,10,8); x.fillStyle='#1a0a08'; x.fill(); BA.glow(x,s*16,cy+14,14,c.e||c.g,1); x.fillStyle='#fff8d0'; BA.ell(x,s*16,cy+14,4,2); x.fill(); x.fillStyle='#200804'; x.fillRect(s*16-0.8,cy+11,1.6,6); });
    BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};
BA.krTent=function(x,D,x0,y0,x1,y1,x2,y2,f,a,col){ var c=D.pal; x.save(); x.globalAlpha=a; x.lineCap='round';
  for(var w=18;w>=2;w-=2){ x.strokeStyle=w>14?'rgba(12,6,8,.75)':BA.lin(x,x0,y0,x2,y2,[[0,shade(col,0.2)],[1,shade(col,-0.3)]]); x.lineWidth=w*(w>14?1.05:1); x.beginPath(); x.moveTo(x0,y0); x.bezierCurveTo(x1,y1,(x1+x2)/2,(y1+y2)/2+10,x2,y2); x.stroke(); if(w<=14)break; }
  x.fillStyle=rgba(c.g,0.8); for(var i=1;i<8;i++){ var t=i/8, mt=1-t, px=mt*mt*mt*x0+3*mt*mt*t*x1+3*mt*t*t*(x1+x2)/2+t*t*t*x2, py=mt*mt*mt*y0+3*mt*mt*t*y1+3*mt*t*t*((y1+y2)/2+10)+t*t*t*y2; BA.ell(x,px,py+3,2.4*(1-t*0.6),1.8*(1-t*0.6)); x.fill(); }
  x.restore(); };

// ═══════════════════════ TOAD QUEEN ═══════════════════════
BA.ARCH.toad={
  back:function(x,D){ var c=D.pal; x.save(); x.fillStyle=BA.rad(x,0,-50,6,110,[[0,rgba(c.g,0.3)],[0.6,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-120,-140,240,160); x.restore(); },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, sq=[0,0.02,-0.06,0.08][f], by=-44;
    x.save(); x.translate(0,0); x.scale(1+sq,1-sq);
    // hind legs
    [-1,1].forEach(function(s){ BA.ell(x,s*52,-18,30,20,s*0.3); BA.fillSh(x,shade(col,-0.1),s*52-30,-38,s*52+30,2,0.3); BA.ol(x,1.4); x.fillStyle=shade(col,-0.2); BA.ell(x,s*70,-3,18,5); x.fill(); BA.ol(x,1); });
    // body dome
    BA.ell(x,0,by,66,46); BA.fillSh(x,col,-66,by-46,66,by+46,0.35); BA.ol(x,1.8);
    x.save(); BA.ell(x,0,by,66,46); x.clip(); x.fillStyle=D.bellyCol||shade(col,0.4); BA.ell(x,0,by+30,50,28); x.fill();
    var R=BA.rnd(BA.hash(D.id)); for(var w=0;w<22;w++){ var wx=(R()-0.5)*120, wy=by-40+R()*50; BA.ell(x,wx,wy,2+R()*3.5,2+R()*3); x.fillStyle=rgba(shade(col,-0.35),0.8); x.fill(); if(w%3===0)BA.glow(x,wx,wy,6,c.g,0.6); } x.restore();
    // front legs
    [-1,1].forEach(function(s){ BA.limb(x,s*34,by+14,s*40,-4,12,shade(col,0.05)); x.fillStyle=shade(col,-0.1); BA.ell(x,s*42,-2,12,4); x.fill(); BA.ol(x,1); });
    // mouth (opens on the strike: tongue)
    var mo=f===3?1:f===2?0.3:0; x.beginPath(); x.moveTo(-50,by+6); x.quadraticCurveTo(0,by+20+mo*16,50,by+6); x.strokeStyle='#1a1008'; x.lineWidth=2.4; x.stroke();
    if(mo>0.5){ x.fillStyle='#401018'; x.beginPath(); x.moveTo(-40,by+8); x.quadraticCurveTo(0,by+34,40,by+8); x.quadraticCurveTo(0,by+18,-40,by+8); x.fill(); x.strokeStyle='#e06070'; x.lineWidth=5; x.beginPath(); x.moveTo(0,by+22); x.quadraticCurveTo(24,by+34,56,by+26); x.stroke(); }
    // throat sac glow
    BA.glow(x,0,by+24,30,c.g,0.35+(f%2)*0.1);
    // eyes on top
    [-1,1].forEach(function(s){ BA.ell(x,s*28,by-38,13,12); BA.fillSh(x,col,s*28-13,by-50,s*28+13,by-26,0.35); BA.ol(x,1.3); BA.glow(x,s*28,by-38,12,c.e||c.g,1); x.fillStyle='#fffbd0'; BA.ell(x,s*28,by-38,6,5); x.fill(); x.fillStyle='#100808'; BA.ell(x,s*28,by-38,5,1.4); x.fill(); });
    // crown
    if(D.crown){ x.fillStyle=D.crown; BA.poly(x,[[-18,by-44],[-16,by-60],[-8,by-50],[0,by-66],[8,by-50],[16,by-60],[18,by-44]]); x.fill(); BA.ol(x,1.1); BA.glow(x,0,by-56,8,c.g,0.8); }
    if(D.hat){ x.fillStyle=D.hat; x.beginPath(); x.moveTo(-26,by-44); x.quadraticCurveTo(0,by-40,26,by-44); x.quadraticCurveTo(0,by-50,-26,by-44); x.fill(); x.beginPath(); x.moveTo(-12,by-46); x.quadraticCurveTo(-2,by-70,20,by-76); x.quadraticCurveTo(6,by-62,12,by-46); x.closePath(); x.fill(); BA.ol(x,1); }
    x.restore(); BA.lightPass(x,box,D); BA.motes(x,D,f,box); }
};
BA.BOX.spider=[-110,110,-120,14];

// ═══════════════════════ WYVERN: a great dragon on the wing (round 8) ═══════════════════════
// Faces right, hovers ~70 units above its shadow. Two huge wings on the back layer (the rig
// beats them with flapY around the shoulder), long S-neck, whip tail, legs tucked under.
// parts: bulk, neck (length ×), tail (length ×), crystals, cracks, plates, chestGlow, wingCol,
//        wingGlow, headSize, hornCol, breath
BA.BOX.wyvern=[-214,190,-268,16]; BA.PIVOT.wyvern=-108;
BA.MOTION.soar={ n:'Soaring on great wingbeats', pace:1.1, trail:true, pose:function(t){ var s=Math.sin(t*2.4), c2=Math.cos(t*2.4); return {y:-6+s*6, sx:1, sy:1, rot:Math.sin(t*0.8)*0.035, flap:1, flapY:0.3+0.7*c2, a:1, shadow:0.5+s*0.06}; } };
BA.ARCH.wyvern={
  back:function(x,D){ var c=D.pal, wc=D.wingCol||c.b, bk=D.bulk||1, sp=D.wingSpan||1;
    x.save(); x.fillStyle=BA.rad(x,0,-110,8,150,[[0,rgba(c.g,0.3)],[0.55,rgba(c.g,0.08)],[1,rgba(c.g,0)]]); x.fillRect(-214,-268,404,284); x.restore();
    [[50,-16,0.8,shade(wc,-0.42),-0.5],[24,0,1,wc,0]].forEach(function(w){ x.save(); x.translate(w[0],-108+w[1]); x.rotate(w[4]); x.scale(w[2]*sp*bk,w[2]*sp);
      var wr=[-24,-104], tips=[[-168,-92],[-176,-42],[-146,-4],[-100,14]], root=[-50,6];
      // membrane between the fingers (scalloped trailing edge)
      x.beginPath(); x.moveTo(0,0); x.lineTo(wr[0],wr[1]); x.lineTo(tips[0][0],tips[0][1]);
      for(var i=1;i<tips.length;i++){ var a=tips[i-1], b=tips[i]; x.quadraticCurveTo((a[0]+b[0])/2+8,(a[1]+b[1])/2+4,b[0],b[1]); }
      x.quadraticCurveTo(-70,24,root[0],root[1]); x.quadraticCurveTo(-20,12,0,0); x.closePath();
      x.fillStyle=BA.lin(x,0,-84,-160,10,[[0,rgba(shade(w[3],0.22),0.97)],[0.6,rgba(w[3],0.96)],[1,rgba(shade(w[3],-0.35),0.94)]]); x.fill(); BA.ol(x,1.6);
      // arm + finger bones
      x.lineCap='round'; x.strokeStyle='rgba(12,8,14,.85)'; x.lineWidth=7; x.beginPath(); x.moveTo(0,0); x.lineTo(wr[0],wr[1]); x.stroke(); x.strokeStyle=shade(w[3],0.3); x.lineWidth=4.5; x.stroke();
      tips.forEach(function(t,i){ x.strokeStyle='rgba(12,8,14,.8)'; x.lineWidth=3.4-i*0.4; x.beginPath(); x.moveTo(wr[0],wr[1]); x.quadraticCurveTo((wr[0]+t[0])/2,(wr[1]+t[1])/2-10+i*4,t[0],t[1]); x.stroke(); x.strokeStyle=shade(w[3],0.18); x.lineWidth=2-i*0.25; x.stroke(); });
      if(D.wingGlow){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.55); x.lineWidth=1.1; tips.forEach(function(t,i){ x.beginPath(); x.moveTo(wr[0],wr[1]); x.quadraticCurveTo((wr[0]+t[0])/2,(wr[1]+t[1])/2-10+i*4,t[0],t[1]); x.stroke(); }); x.restore(); }
      // thumb claw at the wrist
      x.fillStyle='#f0e8d8'; x.beginPath(); x.moveTo(wr[0]-2,wr[1]); x.lineTo(wr[0]+6,wr[1]-12); x.lineTo(wr[0]+4,wr[1]+2); x.fill(); BA.ol(x,0.8);
      if(D.crystals){ for(var k=0;k<3;k++){ var cx=wr[0]+6+k*7, cy=wr[1]+10+k*18; x.beginPath(); x.moveTo(cx-3,cy+3); x.lineTo(cx+2,cy-10-k*2); x.lineTo(cx+5,cy+3); x.closePath(); x.fillStyle=rgba(c.g,0.85); x.fill(); x.strokeStyle='#fff'; x.lineWidth=0.6; x.stroke(); } }
      x.restore(); }); },
  body:function(x,D,f,box){ var c=D.pal, col=c.a, dark=c.b, bk=D.bulk||1, belly=D.bellyCol||shade(c.a,0.32), nk=D.neck||1, tl=D.tail||1, hs=(D.headSize||1)*bk;
    var bob=[0,-1,-3,2][f], by=-96+bob;
    var bez=function(P,t){ var m=1-t; return [m*m*m*P[0][0]+3*m*m*t*P[1][0]+3*m*t*t*P[2][0]+t*t*t*P[3][0], m*m*m*P[0][1]+3*m*m*t*P[1][1]+3*m*t*t*P[2][1]+t*t*t*P[3][1]]; };
    var tube=function(P,r0,r1,n,cl,spn){ var pts=[]; for(var i=0;i<=n;i++){ var t=i/n, q=bez(P,t); pts.push([q[0],q[1],r0+(r1-r0)*t]); }
      x.save(); x.lineCap='round'; for(var j=0;j<pts.length-1;j++){ var a=pts[j], b=pts[j+1]; x.strokeStyle='rgba(12,8,14,.8)'; x.lineWidth=a[2]*2+2.4; x.beginPath(); x.moveTo(a[0],a[1]); x.lineTo(b[0],b[1]); x.stroke(); }
      for(var k=0;k<pts.length-1;k++){ var a2=pts[k], b2=pts[k+1]; x.strokeStyle=BA.lin(x,a2[0],a2[1]-a2[2],a2[0],a2[1]+a2[2],[[0,shade(cl,0.22)],[0.55,cl],[1,shade(cl,-0.35)]]); x.lineWidth=a2[2]*2; x.beginPath(); x.moveTo(a2[0],a2[1]); x.lineTo(b2[0],b2[1]); x.stroke(); }
      x.restore(); return pts; };
    // far hind leg (tucked)
    var legT=function(ox,lc){ x.save(); x.lineCap='round'; x.strokeStyle='rgba(12,8,14,.8)'; x.lineWidth=13*bk; x.beginPath(); x.moveTo(-22+ox,by+8); x.lineTo(-30+ox,by+26); x.lineTo(-56+ox,by+30); x.stroke();
      x.strokeStyle=lc; x.lineWidth=10.5*bk; x.stroke(); x.fillStyle='#f0e8d8'; for(var k=0;k<3;k++){ x.beginPath(); x.moveTo(-58+ox,by+26+k*4); x.lineTo(-70+ox,by+29+k*4); x.lineTo(-58+ox,by+31+k*4); x.fill(); } x.restore(); };
    legT(10,shade(col,-0.38));
    // tail: sweeps back and curls, ends in a spade
    var tw=[0,4,-6,8][f], TP=[[-30,by+2],[-80*tl,by+34],[-112*tl,by-26+tw],[-158*tl,by+2+tw]], tp=tube(TP,13*bk,2.5,22,col);
    var te=tp[tp.length-1]; x.beginPath(); x.moveTo(te[0]+4,te[1]); x.lineTo(te[0]-10,te[1]-9); x.lineTo(te[0]-16,te[1]+2); x.lineTo(te[0]-8,te[1]+8); x.closePath(); x.fillStyle=shade(dark,0.1); x.fill(); BA.ol(x,1);
    // torso
    x.save(); x.translate(0,by); x.rotate(-0.1); BA.ell(x,0,0,40*bk,20*bk); BA.fillSh(x,col,-40,-20,40,20,0.32); BA.ol(x,1.7);
    x.save(); BA.ell(x,0,0,40*bk,20*bk); x.clip(); x.fillStyle=belly; BA.ell(x,6,15*bk,34*bk,10*bk); x.fill(); x.strokeStyle=rgba(shade(belly,-0.35),0.7); x.lineWidth=1; for(var p=-5;p<=5;p++){ x.beginPath(); x.moveTo(p*6*bk,6*bk); x.lineTo(p*6*bk+2,20*bk); x.stroke(); }
      if(D.plates){ x.fillStyle=rgba(shade(col,-0.25),0.9); for(var pl=0;pl<5;pl++){ BA.poly(x,[[-30+pl*14,-18],[-22+pl*14,-24],[-14+pl*14,-17],[-22+pl*14,-8]]); x.fill(); BA.ol(x,0.7); } }
      // the furnace in the chest (Smaug's glow): dim idle, blazing on the wind-up
      var cg=D.chestGlow||c.g, ca=[0.35,0.45,1,0.7][f]; x.save(); x.globalCompositeOperation='lighter'; x.fillStyle=BA.rad(x,20*bk,4*bk,1,26*bk,[[0,rgba('#fff4c0',ca*0.9)],[0.35,rgba(cg,ca*0.8)],[1,rgba(cg,0)]]); x.fillRect(-10,-20,50,40);
        x.strokeStyle=rgba(cg,Math.min(1,ca+0.2)); x.lineWidth=1.3; var R=BA.rnd(BA.hash(D.id)); for(var cr=0;cr<9;cr++){ var sx=4+R()*34*bk, sy=-6+R()*18; x.beginPath(); x.moveTo(sx,sy); x.lineTo(sx+(R()-0.5)*10,sy+5+R()*5); x.stroke(); } x.restore();
      if(D.cracks){ x.save(); x.globalCompositeOperation='lighter'; x.strokeStyle=rgba(c.g,0.8); x.lineWidth=1.2; var R2=BA.rnd(BA.hash(D.id)+5); for(var q=0;q<8;q++){ var qx=-36+R2()*50, qy=-12+R2()*20; x.beginPath(); x.moveTo(qx,qy); x.lineTo(qx+(R2()-0.5)*12,qy+6); x.stroke(); } x.restore(); }
    x.restore(); BA.anc(x,'chest',18*bk,2*bk,12*bk,1); BA.anc(x,'shL',-18*bk,-17*bk,11*bk,1); BA.anc(x,'shR',14*bk,-19*bk,11*bk,1); x.restore();
    // near hind leg
    legT(0,col);
    // neck (wind-up pulls back, strike lunges)
    var hp=[[0,0],[1,-1],[-16,-12],[16,10]][f], hx=(96*nk+hp[0])*bk, hy=by-50*nk*bk+hp[1], NP=[[26*bk,by-8],[62*nk*bk,by-4],[58*nk*bk,by-56*nk],[hx-8,hy+6]], np=tube(NP,12*bk,7*bk,18,col);
    x.strokeStyle=rgba(belly,0.75); x.lineWidth=4*bk; x.beginPath(); np.forEach(function(q,i){ var yy=q[1]+q[2]*0.55; if(i)x.lineTo(q[0]+2,yy); else x.moveTo(q[0]+2,yy); }); x.stroke();
    // spines / crystals along back, neck and tail
    var ridge=[]; [np,tp].forEach(function(L,li){ for(var i=2;i<L.length-2;i+=2)ridge.push([L[i][0],L[i][1]-L[i][2],li]); }); for(var bx2=-24;bx2<=24;bx2+=12)ridge.push([bx2*bk,by-20*bk+Math.abs(bx2)*0.12,0]);
    ridge.forEach(function(r,i){ if(D.crystals&&i%2===0){ x.beginPath(); x.moveTo(r[0]-3,r[1]+2); x.lineTo(r[0]-1,r[1]-10-(i%3)*3); x.lineTo(r[0]+3,r[1]+2); x.closePath(); x.fillStyle=rgba(c.g,0.88); x.fill(); x.strokeStyle='#ffffff'; x.lineWidth=0.6; x.stroke(); BA.glow(x,r[0],r[1]-3,6,c.g,0.3); }
      else { x.beginPath(); x.moveTo(r[0]-3,r[1]+2); x.lineTo(r[0]-2,r[1]-7-(i%2)*2); x.lineTo(r[0]+3,r[1]+2); x.closePath(); x.fillStyle=shade(dark,0.15); x.fill(); BA.ol(x,0.7); } });
    BA.drakeHead(x,D,f,hx,hy,hs,'dragon');
    BA.lightPass(x,box,D); if(f===3&&D.breath)BA.glow(x,hx+42*hs,hy+8,36*hs,D.breath,0.8); BA.motes(x,D,f,box); }
};
