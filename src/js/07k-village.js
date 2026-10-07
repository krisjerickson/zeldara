// ═══════════════════════════════════════════════════════════════════════
// ║ VILLAGE STYLES (Phase 3) — four looks for the home village, each in five
// ║ growth stages. The village grows as craftsmen are freed:
// ║   1 Start · 2 Bram (Wetlands open): builder's yard, stone bridge, paved
// ║   streets · 3 Mira (Highlands): workshop + windmill, lamp posts ·
// ║   4 Dunn (Ashlands): forge hall, statue, iron fences · 5 Vela (all four):
// ║   sky dock, banners, festival lights, flower beds.
// ║ Built with the world engine (07f) so it matches the rest of the world.
// ═══════════════════════════════════════════════════════════════════════
var VILLAGE_STYLES=[
  {id:'market',name:'Lakeshore Market Town',tagline:'Timber-framed houses around a cobbled market square',
   blurb:'Cream plaster and dark timber houses with red and blue roofs, a cobbled market square with a rune fountain and striped stalls, and a pier out onto Mirror Lake.',
   ground:['#5f9a45','#7cb45a'], street:['#a89c86','#bcb09a'], wall:'timber', roofs:['#a8452e','#3d5f9a','#8a5a2a','#6a3a5a'], trees:'round', treeCol:'#3f7a3a', fence:'wood'},
  {id:'runestone',name:'Runestone Hamlet',tagline:'Round stone cottages around a standing-stone green',
   blurb:'Round cottages of grey stone with thatched cone roofs, dry-stone walls and sheep pens. The square is a green ringed by runic standing stones around the great waystone; ley lines glow between them at night.',
   ground:['#6b8a4a','#86a05a'], street:['#9a9486','#aea896'], wall:'round', roofs:['#b8964a','#a88a44','#c4a25a'], trees:'round', treeCol:'#4a7a3a', fence:'stone'},
  {id:'grove',name:'Elder Grove Village',tagline:'Wooden halls among giant trees and lantern paths',
   blurb:'Warm wooden halls with green-shingled roofs nestled among giant old trees, lantern-lit dirt paths, flower gardens and a great tree at the centre with a rune shrine. Boardwalks run out over the lake.',
   ground:['#4f8a3e','#6aa452'], street:['#9a8660','#aa9670'], wall:'wood', roofs:['#3f6a3a','#4f7a44','#5a4a7a'], trees:'giant', treeCol:'#2f6a2a', fence:'hedge'},
  {id:'harbor',name:'Walled Harbor Town',tagline:'Stone streets inside walls, towers and a harbour',
   blurb:'A snug stone town with slate roofs inside a low curtain wall with round towers and a gatehouse. Cobbled streets lead down to a stone quay where boats tie up on Mirror Lake.',
   ground:['#5a8a48','#6e9a56'], street:['#9a9486','#b0aa9a'], wall:'stone', roofs:['#4a5060','#5a5a6a','#3e4656'], trees:'pine', treeCol:'#2f5a34', fence:'stone'}
];
var VILLAGE_STAGES=['Start','Bram freed: Wetlands open','Mira freed: Highlands open','Dunn freed: Ashlands open','Vela freed: the whole world'];

// ── Building painter (3/4 view): walls, roof, door, windows, chimney, sign ──
function villBuilding(g,W,H,o,R){
  var bw=o.w*LT, depth=Math.round(o.h*LT*0.55), wallH=o.wallH||46, x0=(W-bw)/2, base=H-6, wt=base-wallH, style=o.style, roof=o.roof||'#8a4a2e';
  softShadow(g,W/2,base+2,bw/2+10,12,0.4);
  if(style==='round'){
    var cx=W/2, rw=bw/2-2;
    var gw=g.createLinearGradient(cx-rw,0,cx+rw,0); gw.addColorStop(0,'#6e6c66'); gw.addColorStop(0.45,'#a8a49a'); gw.addColorStop(1,'#5a5852');
    g.fillStyle=gw; g.beginPath(); g.moveTo(cx-rw,wt); g.lineTo(cx-rw,base-6); g.quadraticCurveTo(cx,base+8,cx+rw,base-6); g.lineTo(cx+rw,wt); g.closePath(); g.fill();
    g.fillStyle='rgba(0,0,0,.2)'; for(var yy=wt+8;yy<base;yy+=9)for(var xx=cx-rw+((yy/9)%2)*7;xx<cx+rw;xx+=14)g.fillRect(xx,yy,1.5,8);
    for(var y2=wt+8;y2<base;y2+=9){ g.fillStyle='rgba(0,0,0,.18)'; g.fillRect(cx-rw,y2,rw*2,1.2); }
    var rh=o.roofH||(52+o.w*6); var gr=g.createLinearGradient(cx-rw,0,cx+rw,0); gr.addColorStop(0,shade(roof,-0.25)); gr.addColorStop(0.5,shade(roof,0.12)); gr.addColorStop(1,shade(roof,-0.35));
    g.fillStyle=gr; g.beginPath(); g.moveTo(cx-rw-8,wt+6); g.quadraticCurveTo(cx,wt+18,cx+rw+8,wt+6); g.lineTo(cx,wt-rh); g.closePath(); g.fill();
    g.strokeStyle=rgba(shade(roof,-0.4),0.5); g.lineWidth=1; for(var i=0;i<9;i++){ var a=i/8; g.beginPath(); g.moveTo(cx,wt-rh+4); g.lineTo(cx-rw-6+a*(rw*2+12),wt+8+Math.sin(a*Math.PI)*8); g.stroke(); }
    _villDoor(g,cx,base-4,o); _villWindow(g,cx-rw*0.55,wt+14,o); _villWindow(g,cx+rw*0.55,wt+14,o);
    if(o.chimney){ g.fillStyle='#6a625a'; g.fillRect(cx+rw*0.3,wt-rh*0.6,9,rh*0.4); }
    return;
  }
  // front wall
  var wallCol={timber:'#e6dcc4',stone:'#a8a296',wood:'#8a6440'}[style]||'#d8cbb0';
  var gw2=g.createLinearGradient(0,wt,0,base); gw2.addColorStop(0,shade(wallCol,0.06)); gw2.addColorStop(1,shade(wallCol,-0.18)); g.fillStyle=gw2; g.fillRect(x0,wt,bw,wallH);
  if(style==='timber'){ g.fillStyle='#4a3424'; g.fillRect(x0,wt,bw,4); g.fillRect(x0,base-5,bw,5); for(var bx=x0;bx<=x0+bw-5;bx+=Math.max(26,bw/Math.round(bw/30)))g.fillRect(bx,wt,5,wallH);
    g.strokeStyle='#4a3424'; g.lineWidth=3; for(var bx2=x0+8;bx2<x0+bw-20;bx2+=60){ g.beginPath(); g.moveTo(bx2,wt+4); g.lineTo(bx2+16,wt+wallH*0.5); g.stroke(); } }
  else if(style==='stone'){ g.fillStyle='rgba(0,0,0,.18)'; for(var sy=wt;sy<base;sy+=9){ g.fillRect(x0,sy,bw,1.2); for(var sx=x0+((sy/9)%2)*8;sx<x0+bw;sx+=16)g.fillRect(sx,sy,1.2,9); } g.fillStyle='rgba(255,255,255,.08)'; g.fillRect(x0,wt,bw,2); }
  else if(style==='wood'){ g.fillStyle='rgba(0,0,0,.22)'; for(var py=wt+6;py<base;py+=7)g.fillRect(x0,py,bw,1.5); g.fillStyle='#5a3e24'; g.fillRect(x0,wt,4,wallH); g.fillRect(x0+bw-4,wt,4,wallH); }
  // roof (side gable, seen from the front-top)
  var rh2=depth+(o.roofH||26), ov=8;
  var gr2=g.createLinearGradient(0,wt-rh2,0,wt); gr2.addColorStop(0,shade(roof,0.18)); gr2.addColorStop(1,shade(roof,-0.22));
  g.fillStyle=gr2; g.beginPath(); g.moveTo(x0-ov,wt+4); g.lineTo(x0+10,wt-rh2); g.lineTo(x0+bw-10,wt-rh2); g.lineTo(x0+bw+ov,wt+4); g.closePath(); g.fill();
  g.strokeStyle=rgba(shade(roof,-0.45),0.45); g.lineWidth=1; for(var ry=wt-rh2+7;ry<wt+2;ry+=7){ var tt=(ry-(wt-rh2))/(rh2+4); g.beginPath(); g.moveTo(x0+10-(18*tt),ry); g.lineTo(x0+bw-10+(18*tt),ry); g.stroke(); }
  var rp=o.roofPat;
  if(rp==='tile'||rp==='shingle'){ for(var ry2=wt-rh2+6,row=0;ry2<wt+2;ry2+=rp==='tile'?6:7,row++){ var tt2=(ry2-(wt-rh2))/(rh2+4), xa=x0+10-18*tt2, xb=x0+bw-10+18*tt2;
      g.fillStyle=rgba(shade(roof,rp==='tile'?-0.4:-0.35),0.55); for(var sx2=xa+(row%2)*5;sx2<xb-4;sx2+=10){ g.beginPath(); g.arc(sx2+5,ry2,5,0,Math.PI); g.fill(); }
      g.fillStyle=rgba(shade(roof,0.25),0.35); for(var sx3=xa+(row%2)*5;sx3<xb-4;sx3+=10)g.fillRect(sx3+3,ry2+1,4,1); } }
  else if(rp==='thatch'){ g.strokeStyle=rgba(shade(roof,-0.35),0.5); g.lineWidth=1; for(var tx2=x0-6;tx2<x0+bw+6;tx2+=3){ g.beginPath(); g.moveTo(tx2+(W/2-tx2)*0.12,wt-rh2+4); g.lineTo(tx2,wt+4); g.stroke(); }
    g.fillStyle=shade(roof,-0.3); for(var fx=x0-ov;fx<x0+bw+ov;fx+=4)g.fillRect(fx,wt+2,3,3+((fx/4)%2)*2); }
  if(o.wall==='slate'||style==='stone'){ g.strokeStyle=rgba(shade(roof,-0.5),0.35); for(var rx=x0;rx<x0+bw;rx+=10){ g.beginPath(); g.moveTo(rx,wt-rh2+2); g.lineTo(rx+(rx-W/2)*0.08,wt+2); g.stroke(); } }
  g.fillStyle=shade(roof,-0.35); g.fillRect(x0+8,wt-rh2-3,bw-16,5); g.fillStyle='rgba(0,0,0,.25)'; g.fillRect(x0-ov,wt+2,bw+ov*2,3);
  if(o.chimney){ var chx=x0+bw*0.72; g.fillStyle=style==='wood'?'#6a5a4a':'#8a7e70'; g.fillRect(chx,wt-rh2-18,12,26); g.fillStyle='rgba(0,0,0,.3)'; g.fillRect(chx,wt-rh2-18,12,3); }
  // door + windows
  var dx=o.doorX!==undefined?x0+o.doorX*LT+LT/2:W/2; _villDoor(g,dx,base,o);
  var nwin=Math.max(1,Math.floor(bw/40)); for(var wi=0;wi<nwin;wi++){ var wx=x0+(wi+0.5)*bw/nwin; if(Math.abs(wx-dx)<18)continue; _villWindow(g,wx,wt+12,o); }
  if(o.sign){ g.fillStyle='#4a3424'; g.fillRect(dx+16,wt+8,14,2); g.fillStyle=o.sign; rr(g,dx+18,wt+10,16,12,2); g.fill(); g.strokeStyle='rgba(0,0,0,.4)'; g.stroke(); }
  if(o.awning){ for(var ai=0;ai<bw;ai+=12){ g.fillStyle=(ai/12)%2?o.awning:'#f4ecd8'; g.beginPath(); g.moveTo(x0+ai,wt+wallH*0.42); g.lineTo(x0+ai+12,wt+wallH*0.42); g.lineTo(x0+ai+12,wt+wallH*0.42+8); g.quadraticCurveTo(x0+ai+6,wt+wallH*0.42+13,x0+ai,wt+wallH*0.42+8); g.fill(); } }
}
function _villDoor(g,x,base,o){ g.fillStyle='#2a1a10'; g.beginPath(); g.moveTo(x-9,base); g.lineTo(x-9,base-22); g.quadraticCurveTo(x,base-32,x+9,base-22); g.lineTo(x+9,base); g.fill(); g.fillStyle=o.doorCol||'#6a4226'; g.beginPath(); g.moveTo(x-7,base); g.lineTo(x-7,base-21); g.quadraticCurveTo(x,base-29,x+7,base-21); g.lineTo(x+7,base); g.fill(); g.fillStyle='#e0c060'; g.fillRect(x+3,base-12,2,2); }
function _villWindow(g,x,y,o){ g.fillStyle='#3a2a1a'; g.fillRect(x-8,y-1,16,15); g.fillStyle=o.lit===false?'#4a5a6a':'#ffd98a'; g.fillRect(x-6,y+1,12,11); g.fillStyle='#3a2a1a'; g.fillRect(x-0.75,y+1,1.5,11); g.fillRect(x-6,y+6,12,1.5); if(o.flowers){ g.fillStyle='#5a3a22'; g.fillRect(x-9,y+13,18,4); g.fillStyle='#ff8ab0'; for(var i=0;i<4;i++){ g.beginPath(); g.arc(x-6+i*4,y+12,2,0,Math.PI*2); g.fill(); } } }

var VB_PAINTED={tavern:'vb_tavern',shop:'vb_shop',house:'vb_house_round',forge:'vb_forge',guild:'vb_guild',stables:'vb_stables',armory:'vb_armory',clothing:'vb_clothing',jeweler:'vb_jeweler',apothecary:'vb_apothecary',merchant:'vb_bakery'};
// a plain house by its drawn style and width (the wider picture from 5 tiles)
function _vbHouse(Zs,o,w){ var wide=w>=LT*5, L=o.style==='round'?['vh_round','vb_house_round']:o.style==='wood'?['vh_wood']:o.style==='stone'?[wide?'vh_stone_b':'vh_stone','vh_stone']:o.roofPat==='thatch'?[wide?'vh_thatch_b':'vh_thatch','vh_thatch']:[wide?'vh_timber_b':'vh_timber_a','vh_timber_a'];
  for(var i=0;i<L.length;i++)if(Zs.has(L[i]))return L[i]; return null; }
WPROP.vbuild=function(c,ctx,x,y,w,h,o){ var R=c.R;
  // painted buildings (round 30): the six of the pilot, and the plain round cottages; sized by the footprint's width (+ eaves, as drawn before)
  var Zs=_scn(), bid=Zs&&(o.pid&&Zs.has(o.pid)?o.pid:VB_PAINTED[o.core]||(!o.core?_vbHouse(Zs,o,w):null));
  if(bid&&Zs.sprite(c.m,bid,x+w/2,y+h,0,{w:(w+20)*Zs.KB,shw:0.5,sha:0.42})){ if(o.lit!==false)addLight(c.m,x+w/2,y+h-34,60,'#ffc870',0.28,{flicker:0.2}); return; }
  addSprite(c.m,x+w/2,y+h,w+40,h+170,function(g,W,H){ villBuilding(g,W,H,Object.assign({w:w/LT,h:h/LT},o),R); });
  if(o.lit!==false){ if((o.nl||2)>=2){ addLight(c.m,x+w/2-18,y+h-36,46,'#ffc870',0.3,{flicker:0.2}); addLight(c.m,x+w/2+18,y+h-36,46,'#ffc870',0.3,{flicker:0.2}); } else addLight(c.m,x+w/2,y+h-34,54,'#ffc870',0.3,{flicker:0.2}); }
  if(o.smoke&&o.chimney){ var wallH=o.wallH||46, sx, sy;   // chimney smoke (the grove village's smokestacks)
    if(o.style==='round'){ var rh=o.roofH||(52+(w/LT)*6); sx=x+w/2+(w/2-2)*0.3+4; sy=y+h-6-wallH-rh*0.6; }
    else { var rh2=Math.round(h*0.55)+(o.roofH||26); sx=x+w*0.72+6; sy=y+h-6-wallH-rh2-18; }
    wParticlesAt(c,sx-4,sy-4,8,4,{tints:['#d8d4cc','#b8b4ac','#e8e4dc'],freq:260,vy:{min:-26,max:-12},vx:{min:4,max:12},scale:{start:0.6,end:2.4},alpha:{start:0.45,end:0},life:{min:2600,max:4200},blend:false,depth:6500}); } };
WPROP.fountain=function(c,ctx,x,y,w,h,o){ var cx=x+w/2, cy=y+h/2, rc=o.rune||'#6fe3f5';
  var Zs=_scn(); if(Zs&&Zs.sprite(c.m,'vp_fountain',cx,cy+h/2.4+2,0,{w:w*1.04*Zs.K,shw:0.5})){ addLight(c.m,cx,cy-10,90,rc,0.35,{react:true,rune:true}); return; }
  ctx.fillStyle='#8a8478'; ctx.beginPath(); ctx.ellipse(cx,cy,w/2,h/2.4,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#b8b2a4'; ctx.beginPath(); ctx.ellipse(cx,cy-3,w/2-3,h/2.4-3,0,0,Math.PI*2); ctx.fill();
  var gw=ctx.createRadialGradient(cx,cy,2,cx,cy,w/2); gw.addColorStop(0,'#6ad0e8'); gw.addColorStop(1,'#2a7aa0'); ctx.fillStyle=gw; ctx.beginPath(); ctx.ellipse(cx,cy-2,w/2-8,h/2.4-8,0,0,Math.PI*2); ctx.fill();
  addSprite(c.m,cx,cy+6,40,70,function(g,W,H){ g.fillStyle='#a8a296'; g.fillRect(W/2-5,H-50,10,46); g.fillStyle='#c4beb0'; g.beginPath(); g.ellipse(W/2,H-50,14,5,0,0,Math.PI*2); g.fill(); drawRune(g,W/2,H-28,10,rc,3); g.fillStyle='rgba(200,240,255,.7)'; for(var i=0;i<6;i++){ g.fillRect(W/2-12+i*5,H-50+Math.abs(i-2.5)*4,1.5,10); } });
  addLight(c.m,cx,cy-10,90,rc,0.35,{react:true,rune:true}); };
WPROP.well=function(c,ctx,x,y,w,h,o){ var Zs=_scn(); if(Zs&&Zs.sprite(c.m,'vp_well',x+w/2,y+h,70*Zs.K))return; addSprite(c.m,x+w/2,y+h,70,80,function(g,W,H){ softShadow(g,W/2,H-6,24,6,0.4); g.fillStyle='#8a8478'; g.beginPath(); g.ellipse(W/2,H-14,22,9,0,0,Math.PI*2); g.fill(); g.fillStyle='#2a3a4a'; g.beginPath(); g.ellipse(W/2,H-16,16,6,0,0,Math.PI*2); g.fill(); g.fillStyle='#5a3a22'; g.fillRect(W/2-20,H-56,4,42); g.fillRect(W/2+16,H-56,4,42); g.fillStyle='#8a4a2e'; g.beginPath(); g.moveTo(W/2-28,H-50); g.lineTo(W/2,H-72); g.lineTo(W/2+28,H-50); g.fill(); }); };
WPROP.stall=function(c,ctx,x,y,w,h,o){ var col=o.col||c.R.pick(['#c84a3a','#3a7ac8','#e0a030','#4a9a5a']); addSprite(c.m,x+w/2,y+h,w+20,90,function(g,W,H){ softShadow(g,W/2,H-4,W/2-8,6,0.35); g.fillStyle='#6a4a2e'; g.fillRect(8,H-44,4,40); g.fillRect(W-12,H-44,4,40); g.fillStyle='#8a6440'; g.fillRect(6,H-22,W-12,10);
  var goods=['#e05050','#f0c040','#80c050','#e08030','#b070d0']; for(var i=0;i<(W-20)/7;i++){ g.fillStyle=goods[i%5]; g.beginPath(); g.arc(12+i*7,H-24,3,0,Math.PI*2); g.fill(); }
  for(var s=0;s<W-8;s+=10){ g.fillStyle=(s/10)%2?col:'#f4ecd8'; g.beginPath(); g.moveTo(4+s,H-56); g.lineTo(14+s,H-56); g.lineTo(14+s,H-46); g.quadraticCurveTo(9+s,H-41,4+s,H-46); g.fill(); } g.fillStyle=shade(col,-0.2); g.fillRect(4,H-60,W-8,5); }); };
WPROP.lamppost=function(c,ctx,x,y,w,h,o){ var Zs=_scn(); if(Zs&&Zs.sprite(c.m,'vp_lamppost',x+w/2,y+h,88*Zs.K,{shw:0.3})){ addLight(c.m,x+w/2,y+h-76*Zs.K,90,'#ffd27a',0.45,{flicker:0.15}); return; } addSprite(c.m,x+w/2,y+h,24,90,function(g,W,H){ g.fillStyle='#2a2a30'; g.fillRect(W/2-2,H-74,4,70); g.fillRect(W/2-6,H-6,12,4); g.fillStyle='#3a3a42'; g.fillRect(W/2-7,H-86,14,12); g.fillStyle='#ffe08a'; g.fillRect(W/2-5,H-84,10,8); }); addLight(c.m,x+w/2,y+h-80,90,'#ffd27a',0.45,{flicker:0.15}); };
WPROP.statue=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,60,130,function(g,W,H){ softShadow(g,W/2,H-6,24,7,0.4); g.fillStyle='#8a8478'; g.fillRect(W/2-18,H-30,36,26); g.fillStyle='#a8a296'; g.fillRect(W/2-20,H-34,40,6);
  g.fillStyle='#9a9a92'; g.beginPath(); g.moveTo(W/2-10,H-34); g.lineTo(W/2-8,H-80); g.lineTo(W/2+8,H-80); g.lineTo(W/2+10,H-34); g.fill(); g.beginPath(); g.arc(W/2,H-90,9,0,Math.PI*2); g.fill(); g.fillRect(W/2+8,H-78,4,50); g.fillStyle='#c0c0c8'; g.fillRect(W/2+9,H-112,2,38); drawRune(g,W/2,H-18,10,'#ffc860',5); }); addLight(c.m,x+w/2,y+h-18,50,'#ffc860',0.3,{react:true,rune:true}); };
WPROP.fence=function(c,ctx,x,y,w,h,o){ var kind=o.kind||'wood'; addSprite(c.m,x+w/2,y+h,w+6,40,function(g,W,H){ if(kind==='stone'){ for(var i=0;i<w;i+=10){ g.fillStyle=shade('#8a8478',(c.R.f()-0.5)*0.3); rr(g,3+i,H-18-c.R.f()*3,11,14,4); g.fill(); } g.fillStyle='rgba(0,0,0,.25)'; g.fillRect(3,H-6,w,3); }
  else if(kind==='hedge'){ for(var j=0;j<w;j+=9){ var gr=g.createRadialGradient(5+j,H-16,1,6+j,H-14,11); gr.addColorStop(0,'#5a9a48'); gr.addColorStop(1,'#2f6a2a'); g.fillStyle=gr; g.beginPath(); g.arc(6+j,H-14,10,0,Math.PI*2); g.fill(); } }
  else if(kind==='iron'){ g.fillStyle='#2a2a30'; g.fillRect(3,H-24,w,2); g.fillRect(3,H-10,w,2); for(var k=0;k<w;k+=6){ g.fillRect(3+k,H-28,2,24); g.beginPath(); g.moveTo(2+k,H-28); g.lineTo(4+k,H-33); g.lineTo(6+k,H-28); g.fill(); } }
  else { g.fillStyle='#8a6440'; g.fillRect(3,H-20,w,3); g.fillRect(3,H-11,w,3); for(var p=0;p<=w;p+=16)g.fillRect(3+p,H-26,4,22); } }); };
WPROP.tower=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,w+30,200,function(g,W,H){ softShadow(g,W/2,H-6,W/2,10,0.45); var r=w/2; var gr=g.createLinearGradient(W/2-r,0,W/2+r,0); gr.addColorStop(0,'#6e6a62'); gr.addColorStop(0.5,'#aaa498'); gr.addColorStop(1,'#5a564e'); g.fillStyle=gr; g.fillRect(W/2-r,H-120,r*2,114);
  g.fillStyle='rgba(0,0,0,.18)'; for(var yy=H-116;yy<H-6;yy+=10)g.fillRect(W/2-r,yy,r*2,1.2); g.fillStyle='#8a8478'; for(var m=0;m<5;m++)g.fillRect(W/2-r-4+m*(r*2+8)/5,H-134,(r*2+8)/5-5,14); g.fillStyle='#ffd98a'; g.fillRect(W/2-3,H-90,6,12); g.fillStyle=o.flag||'#c84a3a'; g.fillRect(W/2-1,H-170,2,36); g.beginPath(); g.moveTo(W/2+1,H-170); g.lineTo(W/2+24,H-162); g.lineTo(W/2+1,H-154); g.fill(); }); };
WPROP.balloondock=function(c,ctx,x,y,w,h,o){ var m=c.m; addSprite(m,x+w/2,y+h,w+40,150,function(g,W,H){ softShadow(g,W/2,H-6,W/2-6,9,0.4); g.fillStyle='#6a4a2e'; g.fillRect(W/2-40,H-70,80,10); for(var i=0;i<4;i++)g.fillRect(W/2-38+i*25,H-60,6,56); g.fillStyle='#8a6440'; g.fillRect(W/2-44,H-74,88,6); g.fillStyle='#5a3a22'; g.fillRect(W/2+30,H-140,5,70); });
  addSprite(m,x+w/2,y+h-150,110,110,function(g,W,H){ var gr=g.createRadialGradient(W/2-14,H/2-16,4,W/2,H/2,48); gr.addColorStop(0,'#ffe0b0'); gr.addColorStop(1,'#d0603a'); g.fillStyle=gr; g.beginPath(); g.ellipse(W/2,H/2-6,44,36,0,0,Math.PI*2); g.fill(); g.strokeStyle='rgba(120,40,20,.45)'; g.lineWidth=2; for(var k=-2;k<=2;k++){ g.beginPath(); g.ellipse(W/2,H/2-6,Math.abs(k)*11+2,36,0,0,Math.PI*2); g.stroke(); } g.fillStyle='#7a5030'; g.fillRect(W/2-14,H-16,28,12); drawRune(g,W/2,H/2-6,14,'#fff4d0',2); });
  var sp=m.sprites[m.sprites.length-1]; sp.depth=8000; sp.bob=8; };
WPROP.boatv=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,w+10,44,function(g,W,H){ g.fillStyle='rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(W/2,H-6,W/2-4,6,0,0,Math.PI*2); g.fill(); g.fillStyle='#6a4a2e'; g.beginPath(); g.moveTo(4,H-20); g.lineTo(W-4,H-20); g.lineTo(W-16,H-6); g.lineTo(16,H-6); g.fill(); g.fillStyle='#8a6a44'; g.fillRect(8,H-22,W-16,3); if(o.sail){ g.fillStyle='#5a3a22'; g.fillRect(W/2-1,H-60,2,40); g.fillStyle='#f0e8d8'; g.beginPath(); g.moveTo(W/2+1,H-58); g.lineTo(W/2+22,H-26); g.lineTo(W/2+1,H-26); g.fill(); } }); };

// ── The village map for a style at a growth stage (1–5) ─────────────────
function villageDesign(S,stage){
  var st=stage||1, K={};
  var ground=WK('grass',S.ground[0],S.ground[1],{sc:0.12,deco:WDECO.grass('rgba(40,80,30,.45)',0.35)});
  var street=st>=2?WK('street',S.street[0],S.street[1],{pattern:S.id==='grove'?'cobble':'flag',grout:shade(S.street[0],-0.5),rim:shade(S.street[0],-0.3),rimW:1,flat:true,moss:true})
                  :WK('street',S.id==='harbor'?'#8a8272':'#9a8660',S.id==='harbor'?'#9a9282':'#aa9670',{sc:0.3,deco:WDECO.dots(['#8a7650','#b8a888'],0.3)});
  var square=WK('square',shade(S.street[0],0.06),shade(S.street[1],0.06),{pattern:S.id==='runestone'?'slab':(st>=2?'cobble':'flag'),grout:shade(S.street[0],-0.5),flat:true});
  if(S.id==='runestone')square=WK('green','#78a058','#90b468',{sc:0.15,deco:WDECO.grass('rgba(60,100,40,.5)',0.4)});
  var water=WK('water','#1d5878','#2a6f92',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.06,deco:WDECO.ripple('#ffffff')});
  var sand=WK('sand','#d4c28c','#e4d4a2',{sc:0.25});
  var pier=WK('pier','#8a6a44','#9a7a50',{pattern:'planks',vert:true,flat:true});
  var quay=WK('quay','#9a9486','#b0aa9a',{pattern:'brick',grout:'#4a463e',flat:true});
  var garden=WK('garden','#6a4a2e','#7a5a38',{sc:0.3,deco:WDECO.dots(['#ff8ab0','#ffd27a','#b890ff','#8ad0ff'],0.8,3)});
  var creek=WK('creek','#2a6f92','#3a86a6',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.1,deco:WDECO.ripple('#ffffff')});
  var bridge=WK('bridge',st>=2?'#a09a8a':'#8a6a44',st>=2?'#b8b2a0':'#9a7a50',{pattern:st>=2?'brick':'planks',grout:'#5a544a',flat:true});
  return { id:'village_'+S.id+'_'+st, quad:0, seed:500+VILLAGE_STYLES.indexOf(S)*10+st, name:S.name+' · Stage '+st, runeCol:'#6fe3f5',
    ground:ground, kinds:[street,square,water,sand,pier,quay,garden,creek,bridge], hills:{sc:0.05,k:0.5}, spawnAt:[36,36],
    layout:function(c){
      c.blob('sand',4,58,22,0.4); c.blob('water',0,62,19,0.35);                       // Mirror Lake to the south-west
      c.line('creek',[[60,8],[48,10],[40,6],[30,4],[20,0]],2.4,3);                     // a creek along the north
      c.blob('square',32,30,S.id==='runestone'?7:6,0.2);
      [[[32,30],[32,2]],[[32,30],[58,30]],[[32,30],[14,48]],[[32,30],[6,30]],[[32,30],[32,58]]].forEach(function(L){ c.line('street',L,st>=2?3:2.4,st>=2?1:3,['grass','sand']); });
      c.rect('bridge',30,1,5,6,['creek']);
      if(S.id==='harbor'){ c.line('quay',[[2,40],[14,44],[22,52],[24,60]],3,1,['sand','grass']); c.rect('pier',8,48,3,8,['water','sand']); c.rect('pier',16,52,3,7,['water','sand']); }
      else { c.rect('pier',11,47,3,10,['water','sand']); if(st>=3)c.rect('pier',4,42,8,3,['water','sand']); }
      if(st>=5||S.id==='grove')[[24,22],[40,22],[24,38],[42,38]].forEach(function(q){ c.blob('garden',q[0],q[1],1.6,0.2,['grass']); });
    },
    props:function(c){
      var R=c.R, roofs=S.roofs, wall=S.wall, P=function(n,x,y,w,h,o){ return c.place(n,x,y,w,h,Object.assign({solid:true},o||{})); };
      var B=function(x,y,w,h,o){ return P('vbuild',x,y,w,h,Object.assign({style:wall,roof:R.pick(roofs),chimney:R.chance(0.6),flowers:st>=5||S.id==='grove'},o)); };
      // core village (matches the game's buildings): tavern, shop, home, forge, guild, stables, armory, clothier, jeweller, apothecary, merchant
      B(20,20,5,3,{roof:roofs[0],sign:'#c84a3a',chimney:true}); B(37,20,4,3,{sign:'#3a7ac8',awning:'#3a7ac8'}); B(14,33,4,3,{}); B(38,35,4,3,{chimney:true,sign:'#6a6a70'});
      B(28,14,5,3,{roof:roofs[1%roofs.length],sign:'#e0c060'}); B(45,26,5,3,{wallH:40,sign:'#8a6440'}); B(8,22,4,3,{sign:'#8a8a90'}); B(22,40,4,3,{sign:'#b070d0',awning:'#b070d0'});
      B(44,40,3,3,{sign:'#40c0d0'}); B(46,14,4,3,{sign:'#60a060'}); B(10,14,4,3,{sign:'#f0c040',awning:'#e0a030'});
      // the square
      if(S.id==='runestone'){ P('runecircle',29,27,7,7,{solid:false,col:'#6fe3f5',n:10}); for(var k=0;k<8;k++){ var a=k/8*Math.PI*2; P('stone',Math.round(32+Math.cos(a)*6),Math.round(30+Math.sin(a)*6),1,1,{rune:'#6fe3f5',tall:44}); } if(st>=3)c.leyLine([[32,30],[20,20],[45,26],[32,30]],'#6fe3f5'); }
      else if(S.id==='grove'){ P('tree',31,28,2,2,{kind:'round',col:'#2f6a2a',col2:'#4f8a3e',s:2.2}); P('runeglyph',30,31,3,1,{solid:false,col:'#9fffc8',size:16}); }
      else P('fountain',30,28,4,4,{rune:'#6fe3f5'});
      P('well',26,34,1,1,{});
      if(S.id==='market'){ var n=st>=4?6:st>=2?4:2; for(var s=0;s<n;s++)P('stall',25+(s%3)*5,23+Math.floor(s/3)*13,3,1,{}); }
      // trees & fences
      c.scatter('tree',S.trees==='giant'?10:14,{kind:S.trees==='pine'?'pine':'round',col:S.treeCol,s:S.trees==='giant'?1.7:1,on:'grass'});
      c.scatter('bush',10,{col:'#3e6e36',berry:st>=5?'#ff9ad8':null,on:'grass'}); c.scatter('flowers',st>=5?45:20,{solid:false,claim:false,on:'grass'});
      P('fence',6,28,6,1,{solid:false,kind:S.fence}); P('fence',48,32,7,1,{solid:false,kind:S.fence});
      if(S.id==='runestone'){ P('fence',48,44,8,1,{solid:false,kind:'stone'}); for(var sh=0;sh<4;sh++)P('sheep',49+sh*2,46,1,1,{solid:false}); }
      if(S.id==='harbor'){ [[3,3],[55,3],[55,55]].forEach(function(q){ P('tower',q[0]-1,q[1]-1,3,3,{flag:'#3a6ac8'}); }); P('fence',6,4,20,1,{solid:false,kind:'stone'}); P('fence',36,4,17,1,{solid:false,kind:'stone'}); P('fence',57,6,1,1,{solid:false,kind:'stone'}); P('boatv',6,54,3,1,{solid:false,any:true,sail:true}); P('boatv',19,56,3,1,{solid:false,any:true}); }
      else P('boatv',14,54,3,1,{solid:false,any:true,sail:st>=3});
      // ── growth by stage ──
      if(st>=2){ B(50,48,5,3,{roof:'#8a6440',sign:'#c89040',chimney:false}); P('pebbles',48,52,4,2,{solid:false}); c.landmark(50,47,5,4,'Bram\'s Builder\'s Yard — he paved the streets and raised the stone bridge over the creek.'); }
      if(st>=3){ P('windmill',52,20,2,2,{rune:'#ffd27a'}); B(48,6,4,3,{roof:'#6a6a70',sign:'#c0c0c8'}); for(var l=0;l<6;l++)P('lamppost',[27,37,27,37,18,46][l],[26,26,34,34,30,30][l],1,1,{solid:false}); c.landmark(48,5,4,4,'Mira\'s Workshop — gears, lamps and the windmill that powers them.'); }
      if(st>=4){ B(4,36,5,3,{style:'stone',roof:'#3a3a40',chimney:true,sign:'#ff8a40'}); P('chimney',9,36,1,2,{}); P('statue',36,30,1,1,{}); P('fence',18,44,8,1,{solid:false,kind:'iron'}); P('anvil',6,40,1,1,{solid:false}); c.landmark(4,35,6,4,'Dunn\'s Forge Hall — the finest steel on the island, and the statue he cast for the square.'); }
      if(st>=5){ P('balloondock',6,6,4,2,{}); for(var b=0;b<6;b++)P('banner',[20,44,24,40,30,34][b],[18,18,44,44,20,40][b],1,1,{solid:false}); for(var f=0;f<10;f++)P('lantern',16+f*3,25+(f%2)*10,1,1,{solid:false,col:R.pick(['#ffd27a','#ff9ab0','#9fe8ff'])}); c.landmark(6,5,4,3,'Vela\'s Sky Dock — balloons to every corner of the world.'); }
      c.landmark(29,27,6,6,'The village square — the heart of '+S.name+'.');
    },
    particles:[WPART.motes('#fff4c8',200)].concat(st>=5?[WPART.petals(['#ffd6e8','#fff3a8','#c8e0ff'])]:[]) };
}
