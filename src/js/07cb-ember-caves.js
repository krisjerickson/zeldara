// ═══════════════════════════════════════════════════════════════════════
// ║ EMBER CAVE (round 6) — the Highlands familiar island's adventure used to
// ║ be the old side-view Cave scene. It is now a normal 4-floor island
// ║ dungeon built by the shared cavern builder (07c). Three looks to pick
// ║ from in the Design Lab ("Ember Cave" tab); EMBER_CAVE_PICK is used.
// ═══════════════════════════════════════════════════════════════════════
var EMBER_CAVE_PICK='ember_magma_rivers';
function _emberLava(ctx,c,nz){ var A=hexToRgb('#ff5a10'),B=hexToRgb('#ffc848'),C=hexToRgb('#7a1200'); paintHazardField(ctx,c,function(x,y){ var n=nz(x*0.35,y*0.35), n2=nz(x*1.3+9,y*1.3+9), t=Math.min(1,Math.max(0,n*1.3-0.15)); var col=[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t]; if(n2<0.28){ var k=(0.28-n2)*3; col=[col[0]+(C[0]-col[0])*k,col[1]+(C[1]-col[1])*k,col[2]+(C[2]-col[2])*k]; } return col; }); }
function _emberGlow(c,n,col){ var m=c.m; for(var i=0;i<n;i++){ var x=c.R.i(2,c.W-3),y=c.R.i(2,c.H-3); if(c.hazard[y*c.W+x])addLight(m,x*LT+16,y*LT+16,150,col||'#ff6a20',0.35,{pulse:0.25,period:2000+i*90,depth:-4,cut:0.8}); } }
var EMBER_EMBERS=[{tints:['#ffb040','#ff6020'],freq:45,scale:{start:0.5,end:0},alpha:{start:1,end:0},vy:{min:-40,max:-15},vx:{min:-8,max:8},life:{min:1500,max:3000}}];
var EMBER_CAVE_DESIGNS=[
  { id:'ember_magma_rivers', name:'Magma Rivers', seed:41, tagline:'Rivers of lava crossed by basalt bridges',
    blurb:'A wide volcanic cave split by two slow rivers of lava. Stepping-stone bridges of black basalt cross them; hexagonal basalt columns and glowing vents break up the floor. Bats of ember light swirl up from the rivers.',
    density:40, fill:0.36, iters:4, dark:0.62,
    hazards:function(c){ var W=c.W,H=c.H,R=c.R,hz=c.hazard;
      [0.34,0.68].forEach(function(f,ri){ var y0=Math.round(H*f), ph=R.f()*6;
        for(var x=0;x<W;x++){ var yc=y0+Math.round(Math.sin(x*0.18+ph)*2.4); for(var y=yc-2;y<=yc+2;y++)if(y>1&&y<H-2&&!c.g[y*W+x])hz[y*W+x]=1; }
        for(var bx=5+ri*5;bx<W-3;bx+=13){ for(var y2=y0-6;y2<=y0+6;y2++)for(var dx=0;dx<2;dx++){ var k=y2*W+bx+dx; if(y2>0&&y2<H)hz[k]=0; } } }); },
    paintHazards:_emberLava,
    pal:{floorA:'#332826',floorB:'#43332e',floorC:'#1a1210',rockTop:'#4a3a34',rockFace:'#2a1e1a',void:'#140400',darkCol:'#160400'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if(R.chance(0.08)){ ctx.strokeStyle='rgba(255,110,40,.45)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(px+R.f()*32,py+R.f()*32); ctx.lineTo(px+R.f()*32,py+R.f()*32); ctx.stroke(); } },
    obstacles:function(c){ for(var i=0;i<34;i++){ var p=c.randomOpen(); if(p)c.place('basalt',p.x,p.y,1,1,{n:c.R.i(2,4)}); } for(var j=0;j<8;j++){ var q=c.randomOpen(); if(q)c.place('vent',q.x,q.y,1,1); } },
    draw:{ basalt:function(m,ctx,x,y,w,h,R,o){ addSprite(m,x+w/2,y+h,44,78,function(c,cw,ch){ softShadow(c,cw/2,ch-4,14,4,0.45); for(var i=0;i<o.n;i++){ var ox=(i-(o.n-1)/2)*9, hh=30+R.f()*34; c.fillStyle='#2a2226'; c.fillRect(cw/2+ox-4,ch-4-hh,9,hh); c.fillStyle='#4a3e44'; c.fillRect(cw/2+ox-4,ch-4-hh,9,3); c.fillStyle='rgba(255,120,50,.25)'; c.fillRect(cw/2+ox+3,ch-4-hh*0.6,1,hh*0.5); } }); },
      vent:function(m,ctx,x,y,w,h,R){ ctx.fillStyle='#1a1010'; ctx.beginPath(); ctx.ellipse(x+16,y+18,11,7,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,120,40,.8)'; ctx.beginPath(); ctx.ellipse(x+16,y+18,6,3.5,0,0,Math.PI*2); ctx.fill(); addLight(m,x+16,y+18,80,'#ff7a30',0.4,{flicker:0.5,depth:-4}); } },
    extra:function(c){ _emberGlow(c,34); },
    particles:EMBER_EMBERS },
  { id:'ember_crystal_forge', name:'Ember Crystal Forge', seed:43, tagline:'An old dwarf forge grown over with fire crystals',
    blurb:'An abandoned dwarven forge deep in the mountain: anvils, cold bellows and chain hoists stand among clusters of glowing red-gold fire crystals. Small lava pools still feed the forges; the crystals are cover.',
    density:40, fill:0.4, iters:5, dark:0.66,
    hazards:function(c){ var W=c.W,H=c.H,R=c.R,hz=c.hazard; for(var i=0;i<9;i++){ var px=R.i(6,W-7), py=R.i(6,H-10), r=R.i(1,3); for(var y=py-r;y<=py+r;y++)for(var x=px-r-1;x<=px+r+1;x++){ if(Math.hypot((x-px)*0.8,y-py)<=r+0.3&&!c.g[y*W+x])hz[y*W+x]=1; } } },
    paintHazards:_emberLava,
    pal:{floorA:'#3a302a',floorB:'#4a3e34',floorC:'#1e1814',rockTop:'#554538',rockFace:'#33281e',void:'#100804',darkCol:'#120600'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if((tx*7+ty*3)%11===0){ ctx.strokeStyle='rgba(0,0,0,.22)'; ctx.strokeRect(px+1,py+1,LT-2,LT-2); } },
    obstacles:function(c){ for(var i=0;i<30;i++){ var p=c.randomOpen(); if(p)c.place('fcrystal',p.x,p.y,1,1,{col:c.R.pick(['#ff7a30','#ffb040','#ff4a3a','#ffd070'])}); } for(var j=0;j<10;j++){ var q=c.randomOpen(); if(q)c.place(c.R.pick(['anvil','hoist']),q.x,q.y,1,1); } },
    draw:{ fcrystal:function(m,ctx,x,y,w,h,R,o){ addSprite(m,x+w/2,y+h,50,80,function(c,cw,ch){ softShadow(c,cw/2,ch-4,14,4,0.4); for(var i=0;i<4;i++){ var ox=(i-1.5)*7, hh=22+R.f()*30; var g=c.createLinearGradient(cw/2+ox-5,0,cw/2+ox+5,0); g.addColorStop(0,shade(o.col,-0.35)); g.addColorStop(0.5,shade(o.col,0.35)); g.addColorStop(1,shade(o.col,-0.2)); c.fillStyle=g; c.beginPath(); c.moveTo(cw/2+ox-5,ch-4); c.lineTo(cw/2+ox,ch-4-hh); c.lineTo(cw/2+ox+5,ch-4); c.fill(); } }); addLight(m,x+16,y+16,90,o.col,0.4,{pulse:0.3,period:1800+R.i(0,900),depth:-4}); },
      anvil:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,44,40,function(c,cw,ch){ softShadow(c,cw/2,ch-4,14,4,0.4); c.fillStyle='#2e2e34'; c.fillRect(cw/2-6,ch-18,12,14); c.fillStyle='#4a4a52'; c.fillRect(cw/2-15,ch-26,28,8); c.beginPath(); c.moveTo(cw/2+13,ch-26); c.lineTo(cw/2+20,ch-24); c.lineTo(cw/2+13,ch-20); c.fill(); }); },
      hoist:function(m,ctx,x,y,w,h,R){ addSprite(m,x+w/2,y+h,40,96,function(c,cw,ch){ softShadow(c,cw/2,ch-4,12,4,0.4); c.fillStyle='#4a3424'; c.fillRect(cw/2-12,ch-90,4,86); c.fillRect(cw/2+8,ch-90,4,86); c.fillRect(cw/2-12,ch-92,24,5); c.strokeStyle='#8a8a90'; c.lineWidth=1.5; for(var i=0;i<9;i++){ c.beginPath(); c.ellipse(cw/2,ch-84+i*6,2,3,0,0,Math.PI*2); c.stroke(); } c.fillStyle='#5a5a62'; c.fillRect(cw/2-5,ch-30,10,8); }); } },
    extra:function(c){ _emberGlow(c,20,'#ff8a30'); },
    particles:[{tints:['#ffd070','#ff7a30'],freq:70,scale:{start:0.35,end:0},alpha:{start:0.9,end:0},vy:{min:-26,max:-8},vx:{min:-6,max:6},life:{min:1400,max:2600}}] },
  { id:'ember_obsidian_depths', name:'Obsidian Depths', seed:47, tagline:'Glassy black spires over veins of fire',
    blurb:'The deepest caves: floors of black volcanic glass cracked with veins of fire, and forests of tall obsidian spires that split the space into lanes. Steam and sparks rise from the cracks; everything reflects the red glow.',
    density:40, fill:0.34, iters:4, shape:'round', dark:0.72,
    hazards:function(c){ var W=c.W,H=c.H,R=c.R,hz=c.hazard; for(var i=0;i<5;i++){ var x=R.i(5,W-6), y=R.i(5,H-8), a=R.f()*6; for(var s=0;s<16;s++){ x+=Math.round(Math.cos(a)); y+=Math.round(Math.sin(a)); a+=(R.f()-0.5)*0.9; if(x<3||y<3||x>=W-3||y>=H-4)break; if(!c.g[y*W+x])hz[y*W+x]=1; } } },
    paintHazards:_emberLava,
    pal:{floorA:'#1e1a22',floorB:'#2a2430',floorC:'#0e0a12',rockTop:'#342c3c',rockFace:'#1c1622',void:'#0c0206',darkCol:'#0e0306'},
    floorDeco:function(ctx,px,py,tx,ty,R){ if(R.chance(0.14)){ ctx.strokeStyle='rgba(255,90,40,.5)'; ctx.lineWidth=1; ctx.beginPath(); var x0=px+R.f()*32,y0=py+R.f()*32; ctx.moveTo(x0,y0); ctx.lineTo(x0+(R.f()-0.5)*20,y0+(R.f()-0.5)*20); ctx.stroke(); } if(R.chance(0.05)){ ctx.fillStyle='rgba(255,255,255,.07)'; ctx.fillRect(px+R.f()*20,py+R.f()*20,10,3); } },
    obstacles:function(c){ for(var i=0;i<40;i++){ var p=c.randomOpen(); if(p){ var big=c.R.chance(0.3); c.place('spire',p.x,p.y,1,1,{big:big}); } } },
    draw:{ spire:function(m,ctx,x,y,w,h,R,o){ var s=o.big?1.5:1; addSprite(m,x+w/2,y+h,46*s,100*s,function(c,cw,ch){ softShadow(c,cw/2,ch-4,13*s,4*s,0.45); var hh=(56+R.f()*30)*s; c.fillStyle='#120e16'; c.beginPath(); c.moveTo(cw/2-11*s,ch-4); c.lineTo(cw/2-3*s,ch-4-hh); c.lineTo(cw/2+2*s,ch-4-hh*0.8); c.lineTo(cw/2+11*s,ch-4); c.fill(); c.strokeStyle='rgba(255,255,255,.18)'; c.lineWidth=1; c.beginPath(); c.moveTo(cw/2-5*s,ch-8); c.lineTo(cw/2-2*s,ch-4-hh*0.9); c.stroke(); c.strokeStyle='rgba(255,90,40,.55)'; c.beginPath(); c.moveTo(cw/2+4*s,ch-6); c.lineTo(cw/2+2*s,ch-4-hh*0.45); c.stroke(); }); } },
    extra:function(c){ _emberGlow(c,26,'#ff4a20'); },
    particles:[{tints:['#ff7040','#ffffff'],freq:90,scale:{start:0.3,end:0},alpha:{start:0.7,end:0},vy:{min:-30,max:-12},vx:{min:-6,max:6},life:{min:1500,max:2800}}] }
];
var EMBER_CAVE_BY_ID={}; EMBER_CAVE_DESIGNS.forEach(function(D){ EMBER_CAVE_BY_ID[D.id]=D; });
