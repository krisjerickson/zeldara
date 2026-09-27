// ═══ SE Wetlands ═══════════════════════════════════════════════════════
var W_DEEP=function(a,b){ return WK('deep',a||'#123a44',b||'#1d5460',{solid:true,liquid:true,shore:'#bfe8d8',sc:0.08,deco:WDECO.ripple('#cfefff')}); };
var W_SHALLOW=function(a,b){ return WK('shallow',a||'#3a6a5a',b||'#4a7e68',{liquid:true,shore:'#cfe8c8',sc:0.12,deco:WDECO.ripple('#dff4e8')}); };
var W_MUD=WK('mud','#4a4630','#5a5638',{sc:0.2,deco:WDECO.dots(['#3a3624','#6a6644'],0.35)});
var W_WALK=WK('walk','#7a5e3c','#7a5e3c',{deco:WDECO.planks('#7a5e3c')});
var W_WALKV=WK('walkv','#7a5e3c','#7a5e3c',{deco:WDECO.planks('#7a5e3c',true)});
WPROP.lanternlily=function(c,ctx,x,y,w,h,o){ var R=c.R, col=o.col||'#ffd27a'; addSprite(c.m,x+w/2,y+h,36,70,function(g,W,H){ g.fillStyle='#3f7a3a'; g.beginPath(); g.ellipse(W/2,H-6,14,5,0,0,Math.PI*2); g.fill(); g.strokeStyle='#4f8a44'; g.lineWidth=2.5; g.beginPath(); g.moveTo(W/2,H-6); g.quadraticCurveTo(W/2+8,H-30,W/2,H-46); g.stroke(); var gr=g.createRadialGradient(W/2,H-52,1,W/2,H-50,10); gr.addColorStop(0,'#fffbe0'); gr.addColorStop(1,col); g.fillStyle=gr; g.beginPath(); g.ellipse(W/2,H-50,7,10,0,0,Math.PI*2); g.fill(); g.strokeStyle=shade(col,-0.2); g.lineWidth=1; g.beginPath(); g.moveTo(W/2-6,H-54); g.lineTo(W/2+6,H-54); g.moveTo(W/2-7,H-48); g.lineTo(W/2+7,H-48); g.stroke(); }); addLight(c.m,x+w/2,y+h-50,70,col,0.45,{pulse:0.3,period:1800+R.i(0,1600)}); };
WPROP.frog=function(c,ctx,x,y,w,h,o){ var R=c.R, col=o.col||'#7dff9a'; addSprite(c.m,x+w/2,y+h-8,22,18,function(g,W,H){ g.fillStyle=col; g.beginPath(); g.ellipse(W/2,H-6,7,5,0,0,Math.PI*2); g.fill(); g.fillStyle='#fff'; g.beginPath(); g.arc(W/2-3,H-10,2,0,Math.PI*2); g.arc(W/2+3,H-10,2,0,Math.PI*2); g.fill(); g.fillStyle='#000'; g.fillRect(W/2-3,H-10,1,1); g.fillRect(W/2+3,H-10,1,1); }); c.m.sprites[c.m.sprites.length-1].bob=3; addLight(c.m,x+w/2,y+h-12,36,col,0.55,{pulse:0.6,period:900+R.i(0,1400)}); };
WPROP.roof=function(c,ctx,x,y,w,h,o){ var R=c.R, col=R.pick(['#7a4b32','#6a3f2a','#5a5a6a']); softShadow(ctx,x+w/2,y+h-6,w/2,8,0.3); addSprite(c.m,x+w/2,y+h,w+10,h+60,function(g,W,H){ var bh=H-8; g.fillStyle=col; g.beginPath(); g.moveTo(4,bh); g.lineTo(W/2,bh-h-34); g.lineTo(W-4,bh); g.fill(); g.fillStyle=shade(col,0.18); g.beginPath(); g.moveTo(W/2,bh-h-34); g.lineTo(W-4,bh); g.lineTo(W/2+6,bh); g.fill(); g.strokeStyle='rgba(0,0,0,.25)'; for(var i=1;i<5;i++){ g.beginPath(); g.moveTo(4+i*(W/2-4)/5,bh-i*(h+34)/5); g.lineTo(W-4-i*(W/2-4)/5,bh-i*(h+34)/5); g.stroke(); } if(o.chimney){ g.fillStyle='#6a625a'; g.fillRect(W*0.68,bh-h-20,8,18);} g.fillStyle='rgba(120,170,160,.35)'; g.fillRect(0,bh-2,W,10); }); };
WPROP.spire=function(c,ctx,x,y,w,h,o){ var R=c.R, col=o.col||'#9a9a88', rc=o.rune||'#6fffe0', ht=o.ht||150; softShadow(ctx,x+w/2,y+h-4,w/2,9,0.3); addSprite(c.m,x+w/2,y+h,w+20,ht+30,function(g,W,H){ var gr=g.createLinearGradient(W/2-w/2,0,W/2+w/2,0); gr.addColorStop(0,shade(col,0.1)); gr.addColorStop(1,shade(col,-0.35)); g.fillStyle=gr; g.beginPath(); g.moveTo(W/2-w/2+4,H-6); g.lineTo(W/2-w/4,H-ht+30); g.lineTo(W/2,H-ht); g.lineTo(W/2+w/4,H-ht+30); g.lineTo(W/2+w/2-4,H-6); g.fill(); g.fillStyle='rgba(80,130,90,.55)'; g.fillRect(W/2-w/2+4,H-24,w-8,14); for(var i=0;i<3;i++)drawRune(g,W/2,H-40-i*34,13,rc,R.i(0,9)); g.fillStyle='rgba(20,30,30,.6)'; g.beginPath(); g.arc(W/2,H-ht+50,6,Math.PI,0); g.fillRect(W/2-6,H-ht+50,12,12); g.fill(); }); addLight(c.m,x+w/2,y+h-70,90,rc,0.4,{react:true,rune:true}); };
WPROP.curtain=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,w+10,120,function(g,W,H){ for(var i=0;i<(o.n||14);i++){ var bx=5+R.f()*(W-10), len=40+R.f()*60; g.strokeStyle=R.pick(['rgba(110,160,90,.85)','rgba(90,140,80,.85)','rgba(140,180,110,.8)']); g.lineWidth=2; g.beginPath(); g.moveTo(bx,0); g.quadraticCurveTo(bx+R.f()*6-3,len/2,bx+R.f()*4-2,len); g.stroke(); } }); var sp=c.m.sprites[c.m.sprites.length-1]; sp.depth=8000; sp.y=y+h-40; };
WPROP.boat=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,w+10,40,function(g,W,H){ g.fillStyle='#6a4a2e'; g.beginPath(); g.moveTo(4,H-18); g.lineTo(W-4,H-18); g.lineTo(W-14,H-6); g.lineTo(14,H-6); g.fill(); g.fillStyle='#8a6a44'; g.fillRect(8,H-20,W-16,3); }); };
WPROP.turtlehead=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,70,60,function(g,W,H){ g.fillStyle='#5a7a4a'; g.beginPath(); g.ellipse(W/2,H-20,22,15,0,0,Math.PI*2); g.fill(); g.fillStyle='#4a6a3a'; g.fillRect(W/2-14,H-10,28,8); g.fillStyle='#1a1a10'; g.beginPath(); g.arc(W/2-8,H-24,2.5,0,Math.PI*2); g.arc(W/2+8,H-24,2.5,0,Math.PI*2); g.fill(); g.fillStyle='rgba(255,255,255,.15)'; g.beginPath(); g.ellipse(W/2-4,H-30,10,4,0,0,Math.PI*2); g.fill(); }); };

WORLD_DESIGNS.push(
{ id:'glow_mangroves', quad:2, seed:201, name:'Bioluminescent Mangroves', tagline:'Glowing roots over shallow blue water', runeCol:'#4fe0ff',
  blurb:'A mangrove forest standing in warm shallows. The tangled roots glow blue where they touch the water, the mud banks are soft underfoot, and deep channels wind between the trees. Brightest at night.',
  ground:W_MUD, kinds:[W_SHALLOW('#24505a','#2e6470'),W_DEEP('#0c2a38','#15404e')],
  layout:function(c){ c.noise('shallow',0.07,0.42); c.line('deep',[[0,20],[18,26],[30,18],[46,28],[60,24]],3,6); c.line('deep',[[26,60],[30,40],[30,18]],2.4,5); c.blob('mud',30,44,5,0.5); },
  props:function(c){ c.scatter('tree',40,{kind:'mangrove',col:'#2f5a3a',col2:'#4a7a50',trunk:'#4a3a2a',glowRoots:'#4fe0ff',on:['shallow','mud']});
    for(var i=0;i<30;i++){ var p=c.randomOpen('shallow'); if(p&&c.R.chance(0.6))addLight(c.m,p.x*LT+16,p.y*LT+16,40,'#4fe0ff',0.35,{pulse:0.5,period:1400+i*60,depth:-4,noCut:true}); }
    c.place('runecircle',27,41,5,5,{solid:false,col:'#4fe0ff'}); c.landmark(26,40,7,7,'The Tide Shrine — mud-flat runes that glow when the water rises.');
    c.scatter('reeds',18,{on:'mud',solid:false,n:7}); },
  particles:[WPART.motes('#8ff0ff',110)], nightA:0.66 },

{ id:'lantern_lilies', quad:2, seed:203, name:'Lantern Lily Marsh', tagline:'Ponds of lily pads and glowing lantern flowers', runeCol:'#ffd27a',
  blurb:'Wet green marsh broken into ponds covered in lily pads. Lantern lilies rise from the water like paper lamps, and a winding boardwalk takes you across. A rune post stands where the boardwalks meet.',
  ground:WK('marsh','#4a6a3a','#5c7c44',{sc:0.14,deco:WDECO.grass('rgba(40,70,30,.5)',0.4)}), kinds:[W_DEEP('#1c4a44','#276058'),W_WALK,W_WALKV],
  layout:function(c){ for(var i=0;i<9;i++)c.blob('deep',c.R.i(6,54),c.R.i(6,54),c.R.i(3,7),0.6); c.line('walk',[[0,30],[20,30],[20,30]],1.5,0); c.rect('walk',0,30,32,1,'deep'); c.rect('walkv',31,8,1,46,'deep'); c.rect('walk',31,12,26,1,'deep'); },
  props:function(c){ for(var i=0;i<140;i++){ var p=c.randomOpen(); var x=c.R.i(1,58),y=c.R.i(1,58); if(c.is(x,y,'deep')&&!c.occ[y*c.W+x]){ if(c.R.chance(0.2))c.place('lanternlily',x,y,1,1,{solid:false,any:true,col:c.R.pick(['#ffd27a','#ffb0a0','#fff0b0'])}); else c.place('lilypad',x,y,1,1,{solid:false,any:true,claim:false,n:3}); } }
    c.place('stone',32,31,1,1,{any:true,rune:'#ffd27a',tall:50}); c.landmark(30,29,4,4,'Lamplighter\'s post — its rune lights the lilies at dusk.');
    c.scatter('reeds',30,{on:'marsh',solid:false,cattail:true}); c.scatter('tree',10,{kind:'willow',col:'#4f7a44',col2:'#6a9a5a',on:'marsh'}); },
  particles:[WPART.fireflies()], nightA:0.6 },

{ id:'drowned_village', quad:2, seed:207, name:'Drowned Village Rooftops', tagline:'Rooftops and a bell tower above a flooded town', runeCol:'#9fe8d8',
  blurb:'An old village the marsh swallowed. Roofs and chimneys poke out of green water; plank walks and rubble mounds join what is left above the surface. The drowned bell tower still has its rune-bell.',
  ground:WK('rubble','#6a6456','#7a7464',{sc:0.3,deco:WDECO.dots(['#5a5448','#8a8474'],0.5)}), kinds:[W_DEEP('#1e4a46','#2a5e58'),W_WALK,W_WALKV,W_SHALLOW('#3e6660','#4e7870')],
  layout:function(c){ c.rect('deep',0,0,60,60); for(var i=0;i<8;i++)c.blob('rubble',c.R.i(6,54),c.R.i(6,54),c.R.i(2,4),0.6); c.blob('rubble',30,38,4,0.4); c.blob('shallow',30,38,6,0.4,'deep');
    for(var j=0;j<9;j++){ var x=c.R.i(6,52),y=c.R.i(6,52); c.blob('rubble',x,y,1.6,0.2); c.rect('walk',Math.min(x,30),y,Math.abs(30-x)+1,1,'deep'); c.rect('walkv',30,Math.min(y,38),1,Math.abs(38-y)+1,'deep'); } },
  spawnAt:[30,38],
  props:function(c){ c.place('spire',44,14,2,2,{any:true,ht:170,col:'#8a8a7a',rune:'#9fe8d8'}); c.place('runeglyph',30,37,1,1,{solid:false,col:'#9fe8d8'});
    for(var i=0;i<22;i++){ var x=c.R.i(2,55),y=c.R.i(2,56); c.place('roof',x,y,c.R.chance(0.5)?3:2,1,{any:true,chimney:c.R.chance(0.4)}); } c.landmark(43,13,4,4,'The drowned bell tower — on still nights the rune-bell rings under water.');
    c.scatter('boat',5,{any:true,on:'deep',w:2,solid:false}); c.scatter('lantern',8,{on:['rubble','walk','walkv'],col:'#ffe0a0'}); c.scatter('reeds',20,{on:['rubble','shallow'],solid:false}); },
  particles:[WPART.mist('#cfe8e0')], nightA:0.62 },

{ id:'willow_cathedral', quad:2, seed:211, name:'Willow Cathedral', tagline:'A nave of giant willows and moss curtains', runeCol:'#b8ffcf',
  blurb:'Enormous willows grow in two long rows like the pillars of a cathedral, their moss curtains hanging overhead. Light falls in shafts between them onto a soft green aisle that leads to a mossy rune altar.',
  ground:WK('moss','#3f6a3a','#548448',{sc:0.14,deco:WDECO.dots(['#6a9a50','#2f5a2a'],0.4)}), kinds:[WK('aisle','#6a8a58','#7c9c66',{sc:0.3,deco:WDECO.dots(['#fff3a8','#ffffff'],0.25)}),W_SHALLOW('#335a4a','#40705a')],
  layout:function(c){ c.rect('aisle',26,4,8,54); c.noise('shallow',0.1,0.66); },
  spawnAt:[30,54],
  props:function(c){ for(var y=6;y<54;y+=6){ c.place('tree',23,y,1,1,{kind:'willow',col:'#3f6a3a',col2:'#6a9a58',s:1.6}); c.place('tree',36,y,1,1,{kind:'willow',col:'#3f6a3a',col2:'#6a9a58',s:1.6}); c.place('curtain',26,y,8,1,{solid:false,claim:false,n:22}); }
    c.place('runecircle',27,4,6,5,{solid:false,col:'#b8ffcf'}); c.place('rock',29,5,2,1,{col:'#7a8a6a',moss:'#5a8a48',rune:'#b8ffcf'}); c.landmark(26,3,8,6,'The Moss Altar — pilgrims leave a lantern here and walk back through the nave.');
    for(var i=0;i<8;i++){ var sh=mkCanvas(60,200), g=sh.getContext('2d'), gr=g.createLinearGradient(0,0,0,200); gr.addColorStop(0,'rgba(255,250,210,.7)'); gr.addColorStop(1,'rgba(255,250,210,0)'); g.fillStyle=gr; g.beginPath(); g.moveTo(20,0); g.lineTo(40,0); g.lineTo(60,200); g.lineTo(0,200); g.fill(); c.m.shafts.push({canvas:sh,x:(27+c.R.i(0,5))*LT,y:(6+i*6)*LT,a:0.28,sway:true}); }
    c.scatter('tree',26,{kind:'willow',col:'#35603a',col2:'#5a8a50',away:[30,30,9]}); c.scatter('bush',12,{col:'#3a643a'}); },
  particles:[WPART.motes('#e8ffd0',150)] },

{ id:'glowfrog_pools', quad:2, seed:213, name:'Glow-Frog Pools', tagline:'Dozens of little pools and shining frogs', runeCol:'#7dff9a',
  blurb:'Soft marsh ground pocked with small round pools. Frogs that glow green, gold and blue sit on the rims and lily pads, pulsing as they sing. Stepping stones and a frog-shaped rune stone at the biggest pool.',
  ground:WK('marsh','#4e6e3e','#607e48',{sc:0.15,deco:WDECO.grass('rgba(40,70,30,.5)',0.35)}), kinds:[W_DEEP('#1a4a3a','#24604a')],
  layout:function(c){ for(var i=0;i<34;i++)c.blob('deep',c.R.i(3,57),c.R.i(3,57),1.6+c.R.f()*2.2,0.4); c.blob('deep',30,24,4,0.3); },
  props:function(c){ for(var i=0;i<60;i++){ var x=c.R.i(1,58),y=c.R.i(1,58); if(!c.is(x,y,'marsh'))continue; var nearW=[[1,0],[-1,0],[0,1],[0,-1]].some(function(q){return c.is(x+q[0],y+q[1],'deep');}); if(nearW)c.place('frog',x,y,1,1,{solid:false,col:c.R.pick(['#7dff9a','#ffe070','#80d8ff'])}); }
    for(var j=0;j<40;j++){ var x2=c.R.i(1,58),y2=c.R.i(1,58); if(c.is(x2,y2,'deep'))c.place('lilypad',x2,y2,1,1,{solid:false,any:true,claim:false,n:2}); }
    c.place('stone',30,29,1,1,{rune:'#7dff9a',tall:40,col:'#6a7a6a'}); c.landmark(28,27,5,4,'The Frog King\'s stone — every frog in the marsh answers its glow.');
    c.scatter('reeds',30,{solid:false,cattail:true}); c.scatter('rock',10,{col:'#6a7064',moss:'#5a8a48'}); },
  particles:[WPART.fireflies()], nightA:0.66 },

{ id:'stilt_walkways', quad:2, seed:217, name:'Misty Stilt Walkways', tagline:'Plank walks between huts on stilts', runeCol:'#a8e0ff',
  blurb:'A fishing village on stilts over deep water, joined by plank walkways. Mist rolls across the surface, lanterns hang at the corners, and a rune buoy marks the safe channel.',
  ground:W_DEEP('#1a3e4a','#244e5a'), kinds:[W_WALK,W_WALKV,WK('deck','#8a6e4a','#8a6e4a',{deco:WDECO.planks('#8a6e4a')})],
  layout:function(c){ var nodes=[[8,10],[24,8],[42,12],[52,28],[36,30],[18,26],[10,44],[28,48],[46,46]];
    nodes.forEach(function(n){ c.rect('deck',n[0]-2,n[1]-2,5,5); });
    [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[5,6],[6,7],[7,8],[8,3],[4,7]].forEach(function(e){ var a=nodes[e[0]],b=nodes[e[1]]; c.rect('walk',Math.min(a[0],b[0]),a[1],Math.abs(a[0]-b[0])+1,1,'deep'); c.rect('walkv',b[0],Math.min(a[1],b[1]),1,Math.abs(a[1]-b[1])+1,'deep'); }); c.nodes=nodes; },
  spawnAt:[28,48],
  props:function(c){ c.nodes.forEach(function(n,i){ if(i%2===0)c.place('hut',n[0]-1,n[1]-2,3,2,{stilts:true,roof:'#6a4a36',wall:'#a08868'}); c.place('lantern',n[0]+2,n[1]+2,1,1,{col:'#ffe0a0'}); });
    c.place('stone',30,40,1,1,{any:true,rune:'#a8e0ff',tall:34,col:'#7a2a2a'}); c.landmark(29,39,3,3,'Rune buoy — fishermen steer by its light in the mist.');
    c.scatter('boat',4,{any:true,w:2,solid:false,on:'deep'}); },
  particles:[WPART.mist('#e0ecf4'),WPART.mist('#e0ecf4')], nightA:0.6 },

{ id:'sunken_spires', quad:2, seed:219, name:'Sunken Temple Spires', tagline:'Rune spires rising from green shallows', runeCol:'#6fffe0',
  blurb:'The spires of a sunken temple rise out of warm shallows, their runes still glowing. Broken stairs and paving surface in places, and ley lines run spire to spire under the water.',
  ground:W_SHALLOW('#2e5a4e','#3a6c5c'), kinds:[W_DEEP('#123a38','#1a4c48'),WK('paving','#8a8a78','#9a9a88',{deco:WDECO.flag('#aaa896')}),WK('isle','#5a7a4a','#6a8a56',{sc:0.2})],
  layout:function(c){ c.noise('deep',0.08,0.62); for(var i=0;i<6;i++)c.blob('paving',c.R.i(8,52),c.R.i(8,52),c.R.i(2,4),0.5); c.blob('isle',30,46,5,0.5); },
  spawnAt:[30,46],
  props:function(c){ var sp=[[14,14],[44,12],[48,38],[16,40],[30,24]]; sp.forEach(function(q,i){ c.place('spire',q[0],q[1],2,2,{any:true,ht:140+i*14,rune:'#6fffe0'}); });
    c.leyLine([[15,15],[31,25],[45,13]],'#6fffe0'); c.leyLine([[17,41],[31,25],[49,39]],'#6fffe0');
    c.landmark(29,23,4,4,'The High Spire — heart of the sunken temple; all ley lines meet here.');
    c.scatter('column',12,{broken:true,moss:true,col:'#9a9a88',on:['paving','shallow']}); c.scatter('reeds',20,{solid:false,on:['isle','shallow']}); },
  particles:[WPART.motes('#a8fff0',130)], nightA:0.62 },

{ id:'wisp_cattails', quad:2, seed:223, name:'Wisp Cattail Maze', tagline:'Head-high cattails and drifting wisps', runeCol:'#c8e0ff',
  blurb:'Cattails taller than you grow in thick walls, leaving winding lanes through the marsh. Pale wisps drift ahead as if leading you, and rune markers show the way to the clearing in the middle.',
  ground:WK('marsh','#4e6a3c','#5e7a46',{sc:0.15,deco:WDECO.grass('rgba(40,60,30,.5)',0.35)}),
  kinds:[WK('cattail','#5a6a34','#6a7a3c',{solid:true,wall:{top:'#7a8a44',face:'#4a5a2a'},deco:function(ctx,px,py,R){ ctx.strokeStyle='#8a9a4e'; ctx.lineWidth=1.5; for(var i=0;i<5;i++){ var bx=px+R.f()*30; ctx.beginPath(); ctx.moveTo(bx,py+30); ctx.lineTo(bx+R.f()*4-2,py+4); ctx.stroke(); ctx.fillStyle='#6a4428'; ctx.fillRect(bx-1.5,py+2,3,7);} }}),W_SHALLOW('#3a5a48','#466a54')],
  layout:function(c){ c.noise('cattail',0.16,0.52); c.blob('marsh',30,30,6,0.3); c.blob('shallow',30,30,2.5,0.3); for(var i=0;i<5;i++){ var a=i/5*Math.PI*2; c.line('marsh',[[30,30],[30+Math.cos(a)*30,30+Math.sin(a)*30]],2,8); } },
  props:function(c){ for(var y=0;y<c.H;y++)for(var x=0;x<c.W;x++){ if(c.is(x,y,'cattail')&&c.is(x,y+1,'marsh')&&c.R.chance(0.35))c.place('reeds',x,y+1,1,1,{solid:false,cattail:true,n:12,wisp:'#c8e0ff',claim:false}); }
    c.place('runecircle',27,27,7,7,{solid:false,col:'#c8e0ff'}); c.landmark(27,27,7,7,'The Still Pool — where the wisps gather at midnight.');
    for(var k=0;k<8;k++){ var p=c.randomOpen('marsh'); if(p)c.place('runeglyph',p.x,p.y,1,1,{solid:false,col:'#c8e0ff'}); } },
  particles:[{col:'#dfe8ff',freq:260,scale:{start:0.9,end:0.3},alpha:{start:0.8,end:0},vx:{min:-14,max:14},vy:{min:-10,max:6},life:{min:4000,max:7000}}], nightA:0.66 },

{ id:'rune_stepping', quad:2, seed:227, name:'Rune Stepping Stones', tagline:'A lake crossed on glowing rune stones', runeCol:'#7fe8ff',
  blurb:'A still, dark lake. A curving path of flat stepping stones crosses it, each carved with a rune that lights up as you step on it, leading to a tiny island shrine in the middle.',
  ground:WK('shore','#5a7a4a','#6c8c56',{sc:0.14,deco:WDECO.grass('rgba(40,70,30,.5)',0.35)}), kinds:[W_DEEP('#0e2a3a','#163c50'),WK('step','#8a8a86','#9a9a94',{deco:function(ctx,px,py,R){ ctx.fillStyle='#a8a8a2'; ctx.beginPath(); ctx.ellipse(px+16,py+17,13,11,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(px+16,py+22,13,5,0,0,Math.PI); ctx.fill(); }}),WK('sand','#b0a47c','#c2b68a')],
  layout:function(c){ c.blob('deep',30,28,26,0.35,undefined,22); c.blob('sand',30,28,4,0.3); var pts=[[30,58],[26,50],[30,42],[34,36],[30,32]]; for(var i=0;i<pts.length-1;i++){ var a=pts[i],b=pts[i+1]; for(var u=0;u<=1;u+=0.12){ c.set(Math.round(a[0]+(b[0]-a[0])*u),Math.round(a[1]+(b[1]-a[1])*u),'step','deep'); } }
    var p2=[[30,24],[36,16],[44,8],[52,2]]; for(var j=0;j<p2.length-1;j++){ var a2=p2[j],b2=p2[j+1]; for(var u2=0;u2<=1;u2+=0.12)c.set(Math.round(a2[0]+(b2[0]-a2[0])*u2),Math.round(a2[1]+(b2[1]-a2[1])*u2),'step','deep'); } },
  spawnAt:[30,57],
  props:function(c){ for(var y=0;y<c.H;y++)for(var x=0;x<c.W;x++){ if(c.is(x,y,'step'))c.place('runeglyph',x,y,1,1,{solid:false,claim:false,col:'#7fe8ff',size:13,r:40}); }
    c.place('stone',30,27,1,1,{rune:'#7fe8ff',tall:52}); c.landmark(28,25,5,5,'The Lake Shrine — step only on the lit stones.');
    c.scatter('tree',20,{kind:'pine',col:'#2f5a3a',col2:'#3f6e48',on:'shore'}); c.scatter('reeds',20,{on:'shore',solid:false}); },
  particles:[WPART.mist('#dfe8f0')], nightA:0.66 },

{ id:'turtle_isles', quad:2, seed:229, name:'Giant Turtle-Shell Isles', tagline:'Islands that are the backs of sleeping turtles', runeCol:'#9fffc8',
  blurb:'Several round islands in a warm lagoon turn out to be the mossy shells of giant sleeping turtles, joined by sandbars. Their heads rest at the water\'s edge; one ancient shell carries a rune pattern.',
  ground:W_DEEP('#1c5060','#27687a'), kinds:[WK('shell','#6a7a4a','#7c8c56',{sc:0.25,deco:function(ctx,px,py,R,n,x,y){ ctx.strokeStyle='rgba(40,50,25,.45)'; ctx.lineWidth=2; var cx=px+16+(y%2)*16, cy=py+16; ctx.beginPath(); for(var i=0;i<6;i++){ var a=i/6*Math.PI*2; ctx[i?'lineTo':'moveTo'](cx+Math.cos(a)*14,cy+Math.sin(a)*14); } ctx.closePath(); ctx.stroke(); }}),WK('sand','#c8b88a','#d8c89a',{sc:0.3}),W_SHALLOW('#3a7a7a','#4a8a88')],
  layout:function(c){ var isl=[[18,18,8],[42,16,7],[44,42,9],[16,44,7],[30,30,5]]; isl.forEach(function(q){ c.blob('shallow',q[0],q[1],q[2]+2,0.3); c.blob('shell',q[0],q[1],q[2],0.15); }); c.isl=isl;
    [[0,4],[1,4],[2,4],[3,4]].forEach(function(e){ c.line('sand',[[isl[e[0]][0],isl[e[0]][1]],[isl[e[1]][0],isl[e[1]][1]]],2.4,3,['deep','shallow']); }); },
  spawnAt:[30,30],
  props:function(c){ c.isl.forEach(function(q,i){ if(i<4){ var a=Math.atan2(q[1]-30,q[0]-30); c.place('turtlehead',Math.round(q[0]+Math.cos(a)*(q[2]+1)),Math.round(q[1]+Math.sin(a)*(q[2]+1)),1,1,{any:true}); } });
    c.place('runecircle',41,39,7,7,{solid:false,col:'#9fffc8',n:12}); c.landmark(40,38,9,9,'Grandmother Shell — the rune pattern on her back is older than the village.');
    c.scatter('tree',14,{kind:'round',col:'#3f7a4a',on:'shell',s:0.8}); c.scatter('bush',12,{col:'#4a7a44',on:'shell'}); c.scatter('reeds',12,{on:'sand',solid:false}); },
  particles:[WPART.motes('#c8fff0',160)] }
);
