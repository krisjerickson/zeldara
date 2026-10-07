// ═══ SW Highlands ══════════════════════════════════════════════════════
WPROP.geode=function(c,ctx,x,y,w,h,o){ var R=c.R, col=o.col||'#c080ff'; addSprite(c.m,x+w/2,y+h,70,70,function(g,W,H){ g.fillStyle='#5a5060'; g.beginPath(); g.ellipse(W/2,H-24,28,20,0,0,Math.PI*2); g.fill(); g.fillStyle='#2a2030'; g.beginPath(); g.ellipse(W/2,H-24,20,13,0,0,Math.PI*2); g.fill(); for(var i=0;i<14;i++){ var a=i/14*Math.PI*2, r=8+R.f()*8; g.fillStyle=R.chance(0.5)?col:shade(col,0.4); g.beginPath(); g.moveTo(W/2+Math.cos(a)*18,H-24+Math.sin(a)*11); g.lineTo(W/2+Math.cos(a+0.12)*(18-r),H-24+Math.sin(a+0.12)*(11-r*0.6)); g.lineTo(W/2+Math.cos(a-0.12)*(18-r),H-24+Math.sin(a-0.12)*(11-r*0.6)); g.fill(); } }); addLight(c.m,x+w/2,y+h-24,90,col,0.5,{pulse:0.3,period:2000+R.i(0,1500)}); };
WPROP.dwarfdoor=function(c,ctx,x,y,w,h,o){ var R=c.R, rc=o.rune||'#ffc860'; addSprite(c.m,x+w/2,y+h-2,60,80,function(g,W,H){ g.fillStyle='#3a3230'; g.beginPath(); g.moveTo(8,H); g.lineTo(8,H-46); g.quadraticCurveTo(W/2,H-76,W-8,H-46); g.lineTo(W-8,H); g.fill(); g.fillStyle='#5a4a3a'; g.beginPath(); g.moveTo(14,H); g.lineTo(14,H-44); g.quadraticCurveTo(W/2,H-68,W-14,H-44); g.lineTo(W-14,H); g.fill(); g.fillStyle='#8a7a5a'; g.fillRect(W/2-1,H-60,2,60); g.fillRect(14,H-30,W-28,3); drawRune(g,W/2,H-50,14,rc,R.i(0,9)); drawRune(g,20,H-20,9,rc,R.i(0,9)); drawRune(g,W-20,H-20,9,rc,R.i(0,9)); }); addLight(c.m,x+w/2,y+h-40,80,rc,0.42,{react:true,rune:true}); };
WPROP.brazier=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,30,50,function(g,W,H){ g.fillStyle='#3a3230'; g.fillRect(W/2-2,H-26,4,22); g.fillStyle='#5a4a3a'; g.beginPath(); g.moveTo(W/2-10,H-30); g.lineTo(W/2+10,H-30); g.lineTo(W/2+6,H-22); g.lineTo(W/2-6,H-22); g.fill(); g.fillStyle='#ffb040'; g.beginPath(); g.ellipse(W/2,H-34,6,8,0,0,Math.PI*2); g.fill(); g.fillStyle='#fff0a0'; g.beginPath(); g.ellipse(W/2,H-33,3,4,0,0,Math.PI*2); g.fill(); }); addLight(c.m,x+w/2,y+h-34,110,'#ffb060',0.45,{flicker:0.35}); };
WPROP.harp=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,60,110,function(g,W,H){ softShadow(g,W/2,H-4,18,5,0.35); g.strokeStyle='#8a6a44'; g.lineWidth=5; g.lineCap='round'; g.beginPath(); g.moveTo(10,H-6); g.lineTo(10,H-96); g.quadraticCurveTo(W/2,H-110,W-10,H-70); g.lineTo(W-10,H-6); g.stroke(); g.strokeStyle='rgba(230,240,255,.85)'; g.lineWidth=1; for(var i=0;i<7;i++){ var xx=16+i*(W-32)/6; g.beginPath(); g.moveTo(xx,H-8); g.lineTo(xx,H-100+i*4); g.stroke(); } drawRune(g,W/2,H-100,10,'#bff4ff',R.i(0,9)); }); addLight(c.m,x+w/2,y+h-60,60,'#bff4ff',0.3,{react:true,rune:true}); };
WPROP.chess=function(c,ctx,x,y,w,h,o){ var col=o.dark?'#3a3440':'#e8e2d4', sh=shade(col,-0.25), kind=o.piece||'pawn'; addSprite(c.m,x+w/2,y+h,w+30,160,function(g,W,H){ softShadow(g,W/2,H-6,W/2-12,9,0.4); g.fillStyle=col; var bx=W/2; g.fillRect(bx-26,H-22,52,16); g.fillStyle=sh; g.fillRect(bx-26,H-10,52,4); g.fillStyle=col;
  if(kind==='pawn'){ g.beginPath(); g.moveTo(bx-16,H-22); g.lineTo(bx-8,H-70); g.lineTo(bx+8,H-70); g.lineTo(bx+16,H-22); g.fill(); g.beginPath(); g.arc(bx,H-82,16,0,Math.PI*2); g.fill(); }
  else if(kind==='rook'){ g.fillRect(bx-16,H-100,32,80); g.fillRect(bx-22,H-112,44,14); g.fillStyle=o.dark?'#2a2430':'#cfc8b8'; for(var i=0;i<3;i++)g.fillRect(bx-18+i*14,H-120,8,10); }
  else { g.beginPath(); g.moveTo(bx-18,H-22); g.lineTo(bx-10,H-110); g.lineTo(bx+10,H-110); g.lineTo(bx+18,H-22); g.fill(); g.fillRect(bx-16,H-118,32,10); g.fillRect(bx-3,H-146,6,28); g.fillRect(bx-11,H-138,22,6); }
  g.fillStyle='rgba(255,255,255,.18)'; g.fillRect(bx-10,H-100,5,70); drawRune(g,bx,H-40,12,o.rune||'#6fe3f5',c.R.i(0,9)); }); addLight(c.m,x+w/2,y+h-40,60,o.rune||'#6fe3f5',0.3,{react:true,rune:true}); };
WPROP.golem=function(c,ctx,x,y,w,h,o){ var R=c.R, col=o.col||'#8a8578', rc=o.rune||'#ffb060'; addSprite(c.m,x+w/2,y+h,w+40,h+50,function(g,W,H){ softShadow(g,W/2,H-8,W/2-6,12,0.45); rockBlob(g,W/2-10,H-30,26,col,R); rockBlob(g,W/2+26,H-18,14,shade(col,-0.1),R); rockBlob(g,W/2-40,H-16,12,shade(col,-0.05),R); rockBlob(g,W/2+2,H-60,15,shade(col,0.05),R); g.fillStyle='rgba(95,140,80,.5)'; g.beginPath(); g.ellipse(W/2-14,H-48,16,6,0,0,Math.PI*2); g.fill(); g.fillStyle='#1a1410'; g.fillRect(W/2-2,H-64,5,3); g.fillRect(W/2+6,H-64,5,3); drawRune(g,W/2-10,H-30,16,rc,R.i(0,9)); }); addLight(c.m,x+w/2-10,y+h-30,70,rc,0.4,{react:true,rune:true}); };
WPROP.banner=function(c,ctx,x,y,w,h,o){ var R=c.R, col=R.pick(['#c84a3a','#3a6ac8','#e0b040','#4a9a5a','#8a4ac8']); addSprite(c.m,x+w/2,y+h,50,110,function(g,W,H){ g.fillStyle='#5a4028'; g.fillRect(W/2-2,H-100,4,96); g.fillStyle=col; g.beginPath(); g.moveTo(W/2+2,H-96); g.quadraticCurveTo(W/2+22,H-90,W/2+40,H-94); g.lineTo(W/2+38,H-66); g.quadraticCurveTo(W/2+20,H-62,W/2+2,H-68); g.fill(); drawRune(g,W/2+20,H-80,11,'#fff4d0',R.i(0,9),false); }); };
WPROP.sheep=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h-6,40,30,function(g,W,H){ g.fillStyle='rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(W/2,H-3,12,3,0,0,Math.PI*2); g.fill(); g.fillStyle='#3a3230'; g.fillRect(W/2-8,H-10,3,7); g.fillRect(W/2+5,H-10,3,7); g.fillStyle='#f0ece4'; for(var i=0;i<5;i++){ g.beginPath(); g.arc(W/2-8+i*4,H-14+(i%2)*2,6,0,Math.PI*2); g.fill(); } g.fillStyle='#3a3230'; g.beginPath(); g.ellipse(W/2+13,H-15,4,5,0,0,Math.PI*2); g.fill(); }); };
WPROP.starcore=function(c,ctx,x,y,w,h,o){ var R=c.R; softShadow(ctx,x+w/2,y+h/2,w/2,h/3,0.4); addSprite(c.m,x+w/2,y+h,60,70,function(g,W,H){ var gr=g.createRadialGradient(W/2,H-24,2,W/2,H-20,22); gr.addColorStop(0,'#ffffff'); gr.addColorStop(0.4,'#bfe8ff'); gr.addColorStop(1,'#4a6a9a'); g.fillStyle=gr; g.beginPath(); for(var i=0;i<9;i++){ var a=i/9*Math.PI*2, r=14+R.f()*9; g.lineTo(W/2+Math.cos(a)*r,H-22+Math.sin(a)*r*0.8); } g.closePath(); g.fill(); }); addLight(c.m,x+w/2,y+h-22,120,'#bfe8ff',0.6,{pulse:0.35,period:1600+R.i(0,1000)}); };

var H_ROCK=function(top,face,o){ return WK('rock',shade(face,-0.2),face,Object.assign({solid:true,wall:{top:top,face:face,strata:true}},o||{})); };
WORLD_DESIGNS.push(
{ id:'runic_mesas', quad:3, seed:301, name:'Runic Mesas', tagline:'Red flat-topped mesas carved with runes', runeCol:'#ffb070',
  blurb:'Dry red earth between steep flat-topped mesas. Their banded cliff faces are carved with runes that glow ember-orange as you pass beneath. Scrub bushes and dust devils; a rune circle sits in the widest canyon.',
  ground:WK('earth','#9a5a3a','#b8704a',{sc:0.12,deco:WDECO.dots(['#7a4028','#c88a60'],0.35)}), kinds:[H_ROCK('#c98a5a','#8a4a2a',{wall:{top:'#c98a5a',face:'#8a4a2a',strata:true,runes:0.1}}),WK('mesatop','#c07a4c','#d4905e',{sc:0.15,deco:WDECO.dots(['#a86a40','#e0a070'],0.35)}),WK('rim','#b07046','#b07046',{solid:true,wall:{top:'#b87a4e',face:'#8a4a2a',noFace:true}}),WK('stairs','#b08a64','#b08a64',{deco:WDECO.steps('#c49a70'),flat:true})],
  hills:{sc:0.06,k:0.8},
  layout:function(c){ for(var i=0;i<8;i++)c.blob('mesatop',c.R.i(6,54),c.R.i(5,50),c.R.i(4,8),0.35,undefined,c.R.i(4,7)); c.blob('earth',30,42,7,0.3); c.raise('mesatop','rock','rim'); c.cutStairs('rock','stairs',12); },
  spawnAt:[30,44],
  props:function(c){ c.place('runecircle',27,37,6,6,{solid:false,col:'#ffb070'}); c.landmark(26,36,8,8,'The Sun Circle — at noon the mesa runes all light together.');
    c.scatter('bush',20,{col:'#7a7a3a'}); c.scatter('rock',16,{col:'#a86a4a'}); c.scatter('pebbles',30,{solid:false,claim:false,cols:['#8a4a2a','#c88a60']}); },
  particles:[WPART.dust('#e0b080')] },

{ id:'geode_canyons', quad:3, seed:303, name:'Crystal Geode Canyons', tagline:'Winding canyons lined with split geodes', runeCol:'#c080ff',
  blurb:'Narrow winding canyons between purple-grey rock walls. Split-open geodes line the walls, full of glowing violet and cyan crystal, and loose crystals litter the canyon floor.',
  ground:WK('floor','#6a5a70','#7a6a80',{sc:0.2,deco:WDECO.dots(['#5a4a60','#9a8aa0'],0.35)}), kinds:[H_ROCK('#8a7a96','#5a4a66'),WK('hightop','#7a6c86','#8a7c96',{sc:0.2,deco:WDECO.dots(['#6a5c76','#a898b8'],0.35)}),WK('rim','#7a6c86','#7a6c86',{solid:true,wall:{top:'#8a7c98',face:'#5a4a66',noFace:true}}),WK('stairs','#9a8aa8','#9a8aa8',{deco:WDECO.steps('#a898b8'),flat:true})],
  layout:function(c){ c.rect('hightop',0,0,60,60); var pts=[[0,30],[12,24],[22,34],[34,26],[46,34],[60,28]]; c.line('floor',pts,6.5,8); c.line('floor',[[22,34],[24,48],[30,60]],5.5,6); c.line('floor',[[34,26],[36,12],[30,0]],5.5,6); c.line('floor',[[12,24],[8,8],[20,2]],4.5,6); c.line('floor',[[46,34],[50,50],[40,58]],4.5,6); c.blob('floor',34,26,6,0.3); c.raise('hightop','rock','rim'); c.cutStairs('rock','stairs',14); },
  spawnAt:[28,56],
  props:function(c){ var n=0; for(var t=0;t<3000&&n<30;t++){ var x=c.R.i(1,58),y=c.R.i(1,58); if(c.is(x,y,'floor')&&c.is(x,y-1,'rock')&&!c.occ[y*c.W+x]){ if(c.place('geode',x,y,1,1,{col:c.R.pick(['#c080ff','#80e8ff','#ff90d0'])}))n++; } }
    c.scatter('crystal',12,{col:'#a0d8ff',on:'floor',s:0.7}); var p=c.randomOpen('floor'); c.landmark(31,23,6,6,'The Heart Geode chamber — the canyon widens around a cluster that hums.'); c.place('crystal',34,25,1,1,{col:'#e0b0ff',s:1.8}); [[31,23],[37,23],[31,29],[37,29]].forEach(function(q){ c.place('runeglyph',q[0],q[1],1,1,{solid:false,col:'#e0b0ff'}); }); },
  particles:[WPART.motes('#e0c0ff',130)], nightA:0.55 },

{ id:'dwarven_stairs', quad:3, seed:307, name:'Dwarven Stair-cut Cliffs', tagline:'Cliff terraces cut with stairs and rune doors', runeCol:'#ffc860',
  blurb:'Stepped cliff terraces with broad stairways cut straight into the rock by dwarves. Rune-carved doors are set into the cliff faces, braziers burn beside the stairs, and the runes over each door glow gold.',
  ground:WK('ledge','#7a7064','#8a8074',{sc:0.2,deco:WDECO.cracks('rgba(40,35,30,.5)',0.2)}), kinds:[H_ROCK('#9a8e7e','#6a5e50'),WK('stairs','#a09484','#a09484',{deco:WDECO.steps('#aca090')})],
  layout:function(c){ for(var y=8;y<58;y+=10){ c.rect('rock',0,y,60,3); var gx=c.R.i(6,50); c.rect('stairs',gx,y,4,3); c.rect('stairs',(gx+26)%54+2,y,3,3); } },
  props:function(c){ var doors=0; for(var t=0;t<2000&&doors<7;t++){ var x=c.R.i(2,57),y=c.R.i(2,58); if(c.is(x,y,'ledge')&&c.is(x,y-1,'rock')&&c.is(x+1,y-1,'rock')&&c.place('dwarfdoor',x,y,2,1,{solid:true}))doors++; }
    for(var y2=0;y2<c.H;y2++)for(var x2=0;x2<c.W;x2++){ if(c.is(x2,y2,'stairs')&&c.is(x2-1,y2+3,'ledge')&&c.R.chance(0.3))c.place('brazier',x2-1,y2+3,1,1); }
    c.landmark(20,20,20,20,'The Stairs of Durn — every door here opens to a dwarf hall (the runes say whose).');
    c.scatter('rock',12,{col:'#8a8070'}); c.scatter('pebbles',30,{solid:false,claim:false}); },
  particles:[WPART.dust('#d8c8a8')], nightA:0.6 },

{ id:'windharp_ridges', quad:3, seed:309, name:'Wind-harp Ridges', tagline:'Windswept ridges strung with singing harps', runeCol:'#bff4ff',
  blurb:'High grassy ridges where the wind never stops. Tall wooden wind-harps stand along the crests, strings humming, runes on their frames glowing pale blue. Grass streams sideways in the gusts.',
  ground:WK('grass','#6a8a58','#88a46e',{sc:0.12,deco:WDECO.grass('rgba(60,80,40,.5)',0.45)}), kinds:[H_ROCK('#9a9a90','#6a6a64')],
  hills:{sc:0.05,k:2.2},
  layout:function(c){ for(var i=0;i<5;i++){ var y=6+i*11+c.R.i(-2,2); c.line('rock',[[0,y],[15,y+c.R.i(-3,3)],[30,y+c.R.i(-3,3)],[45,y+c.R.i(-3,3)],[60,y]],1.6,4); var gx=c.R.i(5,55); c.rect('grass',gx,y-3,3,7,'rock'); } },
  props:function(c){ var n=0; for(var t=0;t<3000&&n<14;t++){ var x=c.R.i(1,58),y=c.R.i(1,58); if(c.is(x,y,'grass')&&c.is(x,y-1,'rock')&&c.place('harp',x,y,1,1))n++; }
    c.landmark(28,26,6,6,'The Great Harp — its low note can be heard in the village when storms come.');
    c.scatter('rock',14,{col:'#8a8a80',moss:'#6a8a48'}); c.scatter('tuft',50,{solid:false,claim:false,col:'#7a9a58'}); c.scatter('flowers',20,{solid:false,claim:false,cols:['#ffffff','#c8e0ff']}); },
  particles:[WPART.wind(),WPART.wind()] },

{ id:'petrified_forest', quad:3, seed:311, name:'Petrified Forest', tagline:'A forest turned to stone', runeCol:'#ffd8a0',
  blurb:'A whole forest turned to grey stone, trunks and branches intact. Stone logs lie where they fell, dust drifts through, and in a clearing one tree is still alive, ringed by warm runes.',
  ground:WK('dust','#7a7266','#8e8678',{sc:0.15,deco:WDECO.dots(['#6a6256','#a09888'],0.4)}), kinds:[WK('grass','#5a7a44','#6a8a50',{deco:WDECO.grass('rgba(40,70,30,.5)',0.5)})],
  layout:function(c){ c.blob('grass',30,28,5,0.3); },
  draw:{ log:function(c,ctx,x,y,w,h){ var Zs=_scn(); if(Zs&&Zs.sprite(c.m,'tr_log_stone',x+w/2,y+h-2,0,{w:(w+8)*Zs.K,shw:0.4}))return; softShadow(ctx,x+w/2,y+h-6,w/2,6,0.35); var g=ctx.createLinearGradient(0,y+6,0,y+h-4); g.addColorStop(0,'#a8a298'); g.addColorStop(1,'#6e6a64'); ctx.fillStyle=g; rr(ctx,x+2,y+8,w-4,h-14,8); ctx.fill(); ctx.strokeStyle='rgba(60,58,54,.5)'; for(var i=x+10;i<x+w-6;i+=9){ ctx.beginPath(); ctx.moveTo(i,y+10); ctx.lineTo(i+3,y+h-8); ctx.stroke(); } ctx.fillStyle='#c8c2b6'; ctx.beginPath(); ctx.ellipse(x+w-6,y+h/2,5,(h-14)/2,0,0,Math.PI*2); ctx.fill(); } },
  props:function(c){ c.scatter('tree',55,{kind:'stone',s:1.1,away:[30,28,6]}); c.scatter('log',10,{w:2,h:1}); c.place('runecircle',27,25,7,6,{solid:false,col:'#ffd8a0',claim:false}); c.place('tree',30,27,1,1,{kind:'round',col:'#4a8a3a',col2:'#7ab860',s:1.3}); c.landmark(27,24,7,7,'The Last Living Tree — the runes keep the stone from creeping in.'); c.scatter('rock',10,{col:'#8a8478'}); },
  particles:[WPART.dust('#d8d0c0')] },

{ id:'giants_chessboard', quad:3, seed:313, name:'Giant\'s Chessboard Plateau', tagline:'A huge chessboard with pieces the size of towers', runeCol:'#6fe3f5',
  blurb:'On a high plateau lies a chessboard so big you walk across its squares, with stone pieces taller than houses mid-game. Runes on the pieces glow as you pass; nobody knows who is playing.',
  ground:WK('grass','#6a8a58','#7a9a64',{sc:0.12,deco:WDECO.grass('rgba(50,70,40,.5)',0.35)}), kinds:[WK('light','#d6d0c2','#e6e0d2',{nowarp:true,pattern:'slab',slabSize:96,flat:true}),WK('darksq','#46404c','#58505e',{nowarp:true,pattern:'slab',slabSize:96,flat:true}),H_ROCK('#8a8a80','#5e5e58')],
  layout:function(c){ for(var y=0;y<8;y++)for(var x=0;x<8;x++)c.rect((x+y)%2?'darksq':'light',6+x*6,6+y*6,6,6); c.noise('rock',0.12,0.74,'grass'); },
  spawnAt:[30,57],
  props:function(c){ var layout=[['rook',0,0,1],['king',4,0,1],['pawn',2,1,1],['pawn',5,1,1],['pawn',3,3,1],['rook',7,0,1],['pawn',1,6,0],['pawn',4,4,0],['pawn',6,6,0],['rook',0,7,0],['king',3,7,0],['rook',7,7,0]];
    layout.forEach(function(p){ c.place('chess',6+p[1]*6+2,6+p[2]*6+3,2,2,{piece:p[0],dark:!!p[3]}); }); c.landmark(26,26,8,8,'The board is mid-game. Legend says a move is made each hundred years.'); },
  particles:[WPART.motes('#bff4ff',180)] },

{ id:'glacier_peaks', quad:3, seed:317, name:'Glacier-veined Peaks', tagline:'Snowfields, rock and glowing blue ice veins', runeCol:'#9fe8ff',
  blurb:'High snowfields between grey peaks. Veins of old blue glacier ice run through the ground and rock, glowing from inside, and frosted pines cling to the slopes. Snow falls gently.',
  ground:WK('snow','#dfe7ef','#eef3f8',{sc:0.12,deco:WDECO.dots(['#c8d4e0','#ffffff'],0.3)}), kinds:[H_ROCK('#b8c0c8','#6a727c'),WK('ice','#7ab8e0','#a0d8f4',{sc:0.3,deco:WDECO.glowCracks('#dff8ff',0.35)}),WK('peak','#c8d2dc','#dde6ee',{sc:0.2,deco:WDECO.dots(['#aab6c2','#ffffff'],0.3)}),WK('rim','#b0bac4','#b0bac4',{solid:true,wall:{top:'#c0cad4',face:'#6a727c',noFace:true}}),WK('stairs','#aebcc8','#aebcc8',{deco:WDECO.steps('#c8d6e2'),flat:true})],
  hills:{sc:0.05,k:1.4},
  layout:function(c){ for(var i=0;i<7;i++)c.blob('peak',c.R.i(6,54),c.R.i(5,50),c.R.i(4,7),0.5); c.raise('peak','rock','rim'); c.cutStairs('rock','stairs',10); for(var j=0;j<4;j++)c.line('ice',[[c.R.i(0,60),0],[c.R.i(10,50),30],[c.R.i(0,60),60]],1.8,10,['snow']); },
  props:function(c){ c.scatter('tree',30,{kind:'pine',col:'#3a5a50',col2:'#dfe8ee',on:'snow'}); c.scatter('crystal',8,{col:'#bfe8ff',on:['snow','ice']});
    for(var k=0,n=0;k<60&&n<5;k++){ var p=c.randomOpen(['ice','snow']); if(p&&c.place('stone',p.x,p.y,1,1,{rune:'#9fe8ff',col:'#a8c8e0'})){ if(!n)c.landmark(p.x-1,p.y-1,3,3,'Frozen waystone — the glacier grew around it.'); n++; } } },
  particles:[WPART.snow()], nightA:0.55 },

{ id:'golem_graveyard', quad:3, seed:319, name:'Golem Graveyard', tagline:'Fallen stone golems with sleeping rune cores', runeCol:'#ffb060',
  blurb:'Grassy slopes strewn with the broken bodies of ancient stone golems, overgrown with moss. Each still has a faint rune core in its chest that flickers when you come close, as if about to wake.',
  ground:WK('grass','#5e7a4a','#728e58',{sc:0.12,deco:WDECO.grass('rgba(40,60,30,.5)',0.4)}), kinds:[WK('scar','#7a7064','#8a8074',{sc:0.3,deco:WDECO.dots(['#6a6054','#9a9084'],0.4)})],
  hills:{sc:0.05,k:1.4},
  layout:function(c){ c.noise('scar',0.1,0.64); },
  props:function(c){ for(var i=0;i<10;i++){ var p=c.randomOpen(); if(p)c.place('golem',p.x,p.y,3,2,{col:c.R.pick(['#8a8578','#7a7a70','#9a9080'])}); }
    c.scatter('rock',25,{col:'#8a8478',moss:'#5a8a48'}); c.place('golem',28,24,4,3,{col:'#9a9488',rune:'#ffd080'}); c.landmark(27,23,6,5,'The First Golem — its core still beats, very slowly.'); c.scatter('flowers',20,{solid:false,claim:false,cols:['#ffffff','#fff3a8']}); },
  particles:[WPART.motes('#ffd8a0',180)], nightA:0.6 },

{ id:'herder_terraces', quad:3, seed:323, name:'Terraced Herder Slopes', tagline:'Mountain terraces, huts, sheep and banners', runeCol:'#fff0c0',
  blurb:'Mountain pastures cut into terraces with dry-stone walls. Herders\' huts, flocks of sheep and bright prayer banners with rune stitching snapping in the wind. Friendly and lived-in.',
  ground:WK('grass','#6a9a4a','#86b060',{sc:0.12,deco:WDECO.grass('rgba(50,80,30,.5)',0.35)}), kinds:[H_ROCK('#b0a490','#7a6e5c',{wall:{top:'#b0a490',face:'#7a6e5c',strata:false}}),WK('stairs','#a89c86','#a89c86',{deco:WDECO.steps('#b0a48e')}),WK('path','#9a8a68','#ac9c78',{sc:0.3})],
  hills:{sc:0.05,k:1},
  layout:function(c){ for(var y=9;y<58;y+=12){ for(var x=0;x<c.W;x++)c.set(x,y+Math.round((c.nz(x*0.06,y)-0.5)*4),'rock'); var gx=c.R.i(8,50); for(var d=-3;d<=3;d++)for(var dx=0;dx<3;dx++)if(c.is(gx+dx,y+d,'rock'))c.set(gx+dx,y+d,'stairs'); } c.line('path',[[30,60],[30,0]],2,10,['grass']); },
  props:function(c){ c.scatter('hut',6,{w:3,h:2,roof:'#8a4a32',wall:'#c8b08a'}); c.scatter('sheep',24,{solid:false}); c.scatter('banner',16,{}); c.scatter('flowers',30,{solid:false,claim:false,cols:['#fff3a8','#ffffff','#ffb0c8']});
    var p=c.randomOpen('grass'); if(p){ c.place('runecircle',p.x-1,p.y-1,3,3,{solid:false,col:'#fff0c0',n:6}); c.landmark(p.x-1,p.y-1,3,3,'Shepherd\'s rune — flocks never stray past it.'); } },
  particles:[WPART.petals(['#ffe0a0','#ffffff','#ffb0b0'])] },

{ id:'starfall_crater', quad:3, seed:329, name:'Starfall Crater Field', tagline:'Craters with glowing fallen-star cores', runeCol:'#bfe8ff',
  blurb:'Scorched ground pocked with craters where stars fell. Raised rims circle each bowl, and at the centre the fallen star-metal still glows cold blue-white. Sparkles rise from the biggest crater.',
  ground:WK('scorch','#5a4a40','#6e5c50',{sc:0.15,deco:WDECO.dots(['#3a302a','#8a786a'],0.4)}), kinds:[WK('bowl','#3e3432','#4a3e3a',{sc:0.3,deco:WDECO.cracks('rgba(20,15,15,.5)',0.3)}),H_ROCK('#8a7a6a','#5a4a40',{wall:{top:'#8a7a6a',face:'#5a4a40'}})],
  layout:function(c){ var cr=[[30,26,8],[12,12,4],[48,14,5],[14,46,5],[46,46,6],[8,30,3],[52,32,3]]; cr.forEach(function(q){ c.blob('bowl',q[0],q[1],q[2],0.2); c.ring('rock',q[0],q[1],q[2]+1,1.3); c.rect('scorch',q[0]-1,q[1]+q[2],3,3,'rock'); }); c.cr=cr; },
  spawnAt:[30,52],
  props:function(c){ c.cr.forEach(function(q,i){ c.place('starcore',q[0]-(i?0:1),q[1]-(i?0:1),i?1:2,i?1:2,{}); }); c.landmark(27,23,6,6,'The Great Fall — the star-metal here is still warm to the touch.'); [[26,26],[34,26],[30,22],[30,30]].forEach(function(q){ c.place('runeglyph',q[0],q[1],1,1,{solid:false,any:true,col:'#bfe8ff'}); });
    wParticlesAt(c,22*LT,18*LT,16*LT,16*LT,{col:'#dff4ff',freq:90,vy:{min:-30,max:-10},scale:{start:0.4,end:0},alpha:{start:1,end:0},life:{min:1500,max:3000}}); c.scatter('rock',16,{col:'#6a5a50'}); },
  particles:[WPART.motes('#dff4ff',200)], nightA:0.68 }
);
