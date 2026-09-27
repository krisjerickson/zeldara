// ═══ NW Ashlands ═══════════════════════════════════════════════════════
var A_LAVA=function(){ return WK('lava','#e0501a','#ffb040',{solid:true,liquid:true,shore:'#3a1a10',sc:0.14,glow:{col:'#ff7a30',a:0.4,every:16,r:130,noCut:true},deco:function(ctx,px,py,R){ if(R.chance(0.25)){ ctx.fillStyle='rgba(255,240,160,.5)'; ctx.beginPath(); ctx.arc(px+R.f()*32,py+R.f()*32,1.5+R.f()*2,0,Math.PI*2); ctx.fill(); } }}); };
WPROP.shard=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,50,80,function(g,W,H){ softShadow(g,W/2,H-4,14,4,0.4); for(var i=0;i<3;i++){ var ox=(i-1)*9, hh=26+R.f()*36; g.fillStyle=i===1?'#161018':'#241c28'; g.beginPath(); g.moveTo(W/2+ox-7,H-4); g.lineTo(W/2+ox+R.f()*6-3,H-4-hh); g.lineTo(W/2+ox+7,H-4); g.fill(); g.strokeStyle='rgba(255,140,70,.75)'; g.lineWidth=1; g.beginPath(); g.moveTo(W/2+ox-3,H-6); g.lineTo(W/2+ox,H-hh); g.stroke(); g.fillStyle='rgba(255,255,255,.25)'; g.fillRect(W/2+ox-2,H-hh*0.8,1.5,hh*0.5); } }); };
WPROP.basalt=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,w+30,h+140,function(g,W,H){ softShadow(g,W/2,H-6,W/2-8,8,0.45); var n=w>LT?5:3; for(var i=0;i<n;i++){ var cx=W/2+(i-(n-1)/2)*13+(R.f()-0.5)*4, hh=40+R.f()*90, r=8; var gr=g.createLinearGradient(cx-r,0,cx+r,0); gr.addColorStop(0,'#4a4550'); gr.addColorStop(0.5,'#2e2a34'); gr.addColorStop(1,'#1c1a22'); g.fillStyle=gr; g.fillRect(cx-r,H-6-hh,2*r,hh); g.fillStyle='#5a5462'; g.beginPath(); for(var k=0;k<6;k++){ var a=k/6*Math.PI*2; g[k?'lineTo':'moveTo'](cx+Math.cos(a)*r,H-6-hh+Math.sin(a)*r*0.45); } g.closePath(); g.fill(); g.strokeStyle='rgba(0,0,0,.35)'; g.beginPath(); g.moveTo(cx-r,H-6-hh); g.lineTo(cx-r,H-6); g.stroke(); if(o.rune&&i===1)drawRune(g,cx,H-6-hh*0.5,10,o.rune,R.i(0,9)); } }); if(o.rune)addLight(c.m,x+w/2,y+h-50,60,o.rune,0.35,{react:true,rune:true}); };
WPROP.geyser=function(c,ctx,x,y,w,h,o){ var cx=x+w/2, cy=y+h/2; ctx.fillStyle='#8a7a3a'; ctx.beginPath(); ctx.ellipse(cx,cy,w/2,h/2.6,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#3a3a2a'; ctx.beginPath(); ctx.ellipse(cx,cy,w/4,h/5,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='rgba(220,210,120,.6)'; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(cx,cy,w/2-3,h/2.6-3,0,0,Math.PI*2); ctx.stroke(); if(o.rune)drawRune(ctx,cx,cy+h/2.6+8,10,o.rune,c.R.i(0,9));
  wParticlesAt(c,cx-10,cy-6,20,6,{col:'#f4f0e0',freq:70,vy:{min:-70,max:-35},vx:{min:-8,max:8},scale:{start:0.8,end:3.2},alpha:{start:0.5,end:0},life:{min:1500,max:2600},blend:false,depth:6500}); if(o.rune)addLight(c.m,cx,cy+h/2.6+8,46,o.rune,0.3,{react:true,rune:true,depth:-4}); };
WPROP.chimney=function(c,ctx,x,y,w,h,o){ var R=c.R; addSprite(c.m,x+w/2,y+h,w+20,180,function(g,W,H){ softShadow(g,W/2,H-4,W/2-6,7,0.4); g.fillStyle='#4a3a34'; g.fillRect(W/2-12,H-150,24,146); for(var i=0;i<14;i++){ g.fillStyle='rgba(0,0,0,.2)'; g.fillRect(W/2-12,H-150+i*11,24,1); g.fillRect(W/2-12+(i%2)*12,H-150+i*11,1,11);} g.fillStyle='#2a1e1a'; g.fillRect(W/2-14,H-156,28,8); g.fillStyle='rgba(255,120,40,.6)'; g.fillRect(W/2-6,H-40,12,14); });
  wParticlesAt(c,x+w/2-10,y+h-158,20,6,{tints:['#6a6260','#8a8280','#4a4442'],freq:160,vy:{min:-30,max:-14},vx:{min:6,max:18},scale:{start:0.8,end:3},alpha:{start:0.5,end:0},life:{min:3000,max:5000},blend:false,depth:6500}); addLight(c.m,x+w/2,y+h-34,60,'#ff8040',0.4,{flicker:0.3}); };
WPROP.anvil=function(c,ctx,x,y,w,h,o){ addSprite(c.m,x+w/2,y+h,50,40,function(g,W,H){ softShadow(g,W/2,H-4,16,4,0.4); g.fillStyle='#3a3a40'; g.fillRect(W/2-8,H-16,16,12); g.fillStyle='#5a5a62'; g.beginPath(); g.moveTo(W/2-18,H-24); g.lineTo(W/2+12,H-24); g.lineTo(W/2+22,H-20); g.lineTo(W/2+12,H-16); g.lineTo(W/2-18,H-16); g.fill(); g.fillStyle='rgba(255,255,255,.2)'; g.fillRect(W/2-18,H-24,30,2); }); };
WPROP.glass=wFlat(function(ctx,x,y,w,h,o,R,c){ var cols=['#ff5a5a','#5a8aff','#ffd24a','#6aff9a','#c86aff']; for(var i=0;i<7;i++){ var col=R.pick(cols); ctx.fillStyle=rgba(col,0.8); ctx.beginPath(); var cx=x+R.f()*w, cy=y+R.f()*h; ctx.moveTo(cx,cy); ctx.lineTo(cx+R.f()*10-5,cy+R.f()*10); ctx.lineTo(cx+R.f()*10,cy+R.f()*8-4); ctx.fill(); } addLight(c.m,x+w/2,y+h/2,50,R.pick(cols),0.3,{pulse:0.4,depth:-4,noCut:true}); });
WPROP.emberflower=wFlat(function(ctx,x,y,w,h,o,R,c){ for(var i=0;i<(o.n||6);i++){ var fx=x+4+R.f()*(w-8), fy=y+4+R.f()*(h-8); ctx.strokeStyle='#3a2a20'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(fx,fy+6); ctx.lineTo(fx,fy); ctx.stroke(); ctx.save(); ctx.shadowColor='#ff7a30'; ctx.shadowBlur=8; ctx.fillStyle=R.pick(['#ff7a30','#ffb040','#ff4a20']); for(var p=0;p<5;p++){ var a=p/5*Math.PI*2; ctx.beginPath(); ctx.ellipse(fx+Math.cos(a)*2.6,fy+Math.sin(a)*2.6,2.2,1.4,a,0,Math.PI*2); ctx.fill(); } ctx.fillStyle='#fff0a0'; ctx.beginPath(); ctx.arc(fx,fy,1.3,0,Math.PI*2); ctx.fill(); ctx.restore(); } if(R.chance(0.4))addLight(c.m,x+w/2,y+h/2,54,'#ff8a40',0.35,{pulse:0.4,period:1500+R.i(0,1500),depth:-4,noCut:true}); });

WORLD_DESIGNS.push(
{ id:'obsidian_glass', quad:4, seed:401, name:'Obsidian Glass Fields', tagline:'Black glass plains cracked with ember veins', runeCol:'#ff8a40',
  blurb:'A plain of glossy black volcanic glass, cracked all over with veins of glowing ember. Obsidian shards jut up like blades, and your reflection follows you across the ground. The runes here burn orange.',
  ground:WK('glass','#15121a','#26202c',{sc:0.2,deco:WDECO.glowCracks('#ff7a30',0.28)}), kinds:[WK('sheen','#2a2432','#3a3244',{sc:0.3,deco:function(ctx,px,py,R){ if(R.chance(0.3)){ ctx.fillStyle='rgba(200,190,230,.18)'; ctx.fillRect(px+R.f()*20,py+R.f()*28,10+R.f()*10,1.5);} }})],
  layout:function(c){ c.noise('sheen',0.12,0.6); },
  props:function(c){ c.scatter('shard',40,{}); c.place('runecircle',27,20,6,6,{solid:false,col:'#ff8a40'}); c.landmark(26,19,8,8,'The Burning Glyph — the cracks here form a rune if you look from above (M).'); c.scatter('rock',10,{col:'#2a2430'}); c.scatter('runeglyph',6,{solid:false,col:'#ff8a40'}); },
  particles:[WPART.embers(160)], nightA:0.55, bg:'#0a0608' },

{ id:'ashsnow_forest', quad:4, seed:403, name:'Ash-snow Dead Forest', tagline:'Grey dead trees under falling ash', runeCol:'#ffb080',
  blurb:'A forest killed long ago by fire. Grey trunks stand in drifts of soft ash, and ash falls like snow. Charred stumps smoulder here and there, and a rune stone warms a small clearing.',
  ground:WK('ash','#8a8680','#a4a09a',{sc:0.12,deco:WDECO.dots(['#6a6660','#c8c4be'],0.4)}), kinds:[WK('char','#3a3432','#4a4442',{sc:0.3,deco:WDECO.glowCracks('#ff8040',0.08)})],
  layout:function(c){ c.noise('char',0.1,0.64); c.blob('ash',30,30,5,0.3); },
  props:function(c){ c.scatter('tree',70,{kind:'ash',trunk:'#3a3432',s:1.1,away:[30,30,5]}); c.scatter('rock',12,{col:'#4a4442'}); c.place('stone',30,28,1,1,{rune:'#ffb080',col:'#5a5452'}); c.scatter('runeglyph',5,{solid:false,col:'#ffb080'}); c.landmark(28,26,5,5,'Hearth-stone — ash never settles within its warmth.'); },
  particles:[WPART.ash(),WPART.embers(400)], nightA:0.6, bg:'#1a1818' },

{ id:'magma_channels', quad:4, seed:407, name:'Magma Rune Channels', tagline:'Lava flowing through channels cut as runes', runeCol:'#ffd080',
  blurb:'Someone cut enormous runes into the basalt plain and let lava fill them. The glowing channels spell out words you can only read from above (press M). Stone bridges cross them.',
  ground:WK('basalt','#2e2a2c','#3a3436',{sc:0.2,deco:WDECO.cracks('rgba(0,0,0,.5)',0.3)}), kinds:[A_LAVA(),WK('bridge','#6a6260','#7a7270',{deco:WDECO.flag('#8a8280','#1a1414')})],
  layout:function(c){ var runes=[[[12,6],[12,26]],[[12,12],[20,6]],[[12,18],[20,12]], [[30,6],[30,26]],[[24,10],[36,22]],[[36,10],[24,22]], [[46,6],[46,26]],[[46,6],[54,14]],[[54,14],[46,20]], [[10,36],[26,52]],[[26,36],[10,52]],[[18,34],[18,54]], [[34,36],[50,36]],[[42,36],[42,54]],[[34,54],[50,54]]];
    runes.forEach(function(s){ c.line('lava',s,1.8,0); }); c.ring('lava',30,44,3,1.4);
    for(var i=0;i<40;i++){ var x=c.R.i(2,57),y=c.R.i(2,57); if(c.is(x,y,'lava')&&c.R.chance(0.5))c.set(x,y,'bridge'); } },
  spawnAt:[30,31],
  props:function(c){ c.scatter('shard',14,{on:'basalt'}); c.scatter('rock',14,{col:'#3a3436',on:'basalt'}); c.place('runecircle',28,27,4,4,{solid:false,col:'#ffd080'}); c.landmark(24,28,12,6,'Press M: the channels spell "HEART OF FIRE" in the old tongue.'); },
  particles:[WPART.embers(70)], nightA:0.5, bg:'#120806' },

{ id:'basalt_forest', quad:4, seed:409, name:'Basalt Column Forest', tagline:'A maze of towering hexagonal basalt columns', runeCol:'#ffb060',
  blurb:'Six-sided basalt columns stand in clusters like a stone forest, some towering, some broken into stepping stumps. Steam curls from vents between them, and a few columns carry burning runes.',
  ground:WK('rock','#3a3638','#484446',{sc:0.2,deco:function(ctx,px,py,R){ ctx.strokeStyle='rgba(0,0,0,.35)'; ctx.lineWidth=1; ctx.beginPath(); var cx=px+16,cy=py+16; for(var i=0;i<6;i++){ var a=i/6*Math.PI*2; ctx[i?'lineTo':'moveTo'](cx+Math.cos(a)*15,cy+Math.sin(a)*15); } ctx.closePath(); ctx.stroke(); }}),
  layout:function(c){},
  props:function(c){ for(var i=0;i<110;i++){ var p=c.randomOpen(); if(p){ var big=c.R.chance(0.3); c.place('basalt',p.x,p.y,big?2:1,1,{rune:c.R.chance(0.1)?'#ffb060':null}); } }
    for(var j=0;j<8;j++){ var q=c.randomOpen(); if(q)c.place('geyser',q.x,q.y,1,1,{solid:false}); } c.landmark(c.sp.x-2,c.sp.y-6,5,5,'The Organ Pipes — the columns hum when the wind blows through.'); },
  particles:[WPART.mist('#b8b0b0')], nightA:0.6, bg:'#141214' },

{ id:'burned_cathedral', quad:4, seed:411, name:'Burned Cathedral Ruins', tagline:'A roofless cathedral of charred stone and glass', runeCol:'#ffd080',
  blurb:'The shell of a great cathedral stands open to the sky, its walls blackened, its pews in charred rows. Shards of stained glass still glow on the floor, and the rune altar at the far end is unbroken.',
  ground:WK('ash','#5a5450','#6a6460',{sc:0.15,deco:WDECO.dots(['#3a3430','#8a8480'],0.4)}), kinds:[WK('nave','#6a605a','#7a706a',{deco:WDECO.flag('#8a807a','#1a1410')}),WK('wallk','#3a3230','#4a4240',{solid:true,wall:{top:'#5a504a',face:'#2a2220',runes:0.05}})],
  layout:function(c){ c.rect('nave',18,6,24,48); c.rect('wallk',17,5,26,1); c.rect('wallk',17,5,1,50); c.rect('wallk',42,5,1,50); for(var i=0;i<8;i++){ var y=c.R.i(8,52); c.set(17,y,'ash'); c.set(42,c.R.i(8,52),'ash'); } c.rect('nave',28,54,4,6); c.rect('ash',28,54,4,1,'wallk'); c.rect('nave',8,26,10,8); c.rect('ash',17,28,1,4); },
  spawnAt:[30,58],
  props:function(c){ for(var y=18;y<50;y+=3){ c.place('wall',20,y,7,1,{col:'#3a2a20',char:true,solid:true}); c.place('wall',33,y,7,1,{col:'#3a2a20',char:true,solid:true}); }
    for(var i=0;i<12;i++){ var p=c.randomOpen('nave'); if(p)c.place('glass',p.x,p.y,1,1,{solid:false,claim:false}); }
    c.place('runecircle',26,7,8,6,{solid:false,col:'#ffd080',n:10}); c.place('stone',29,8,2,1,{rune:'#ffd080',col:'#6a605a',tall:40}); c.landmark(26,6,8,7,'The altar survived the fire untouched. Its runes are warm.');
    c.scatter('tree',20,{kind:'dead',trunk:'#2a2420',on:'ash'}); c.scatter('column',8,{broken:true,col:'#5a504a',on:'ash'}); },
  particles:[WPART.embers(120),WPART.ash()], nightA:0.62, bg:'#140e0c' },

{ id:'sulfur_geysers', quad:4, seed:413, name:'Sulfur Geyser Flats', tagline:'Yellow crust, steaming vents and green pools', runeCol:'#e8ff80',
  blurb:'Flat cracked ground crusted yellow with sulfur, dotted with milky green pools and geysers that puff steam. Rune stones mark the vents that are safe to walk past.',
  ground:WK('crust','#b8a44a','#d0bc5a',{sc:0.14,deco:WDECO.cracks('rgba(90,80,30,.55)',0.45)}), kinds:[WK('grey','#7a766a','#8a867a',{sc:0.2}),WK('pool','#3fa89a','#6ad0b8',{solid:true,liquid:true,shore:'#f0f0c0',sc:0.2,deco:WDECO.ripple('#ffffff')})],
  layout:function(c){ c.noise('grey',0.09,0.6); for(var i=0;i<12;i++)c.blob('pool',c.R.i(4,56),c.R.i(4,56),c.R.i(1,3),0.4); },
  props:function(c){ for(var i=0;i<14;i++){ var p=c.randomOpen(['crust','grey']); if(p)c.place('geyser',p.x,p.y,2,2,{solid:false,rune:c.R.chance(0.4)?'#e8ff80':null}); }
    c.scatter('rock',16,{col:'#9a8a4a'}); c.landmark(c.sp.x-2,c.sp.y-5,5,4,'Steam hides the paths — follow the rune-marked vents.'); },
  particles:[WPART.mist('#f0f0d8')], nightA:0.55, bg:'#1a1808' },

{ id:'dragon_valley', quad:4, seed:417, name:'Dragon Skeleton Valley', tagline:'A valley holding a dragon\'s skeleton', runeCol:'#ff9a60',
  blurb:'A long valley between dark ridges, and lying along it the skeleton of a dragon: spine and ribs you walk under, wing bones fanned across the ash, and a horned skull at the valley head whose eyes still smoulder.',
  ground:WK('ash','#5e5652','#6e6662',{sc:0.13,deco:WDECO.dots(['#3e3632','#8e8682'],0.35)}), kinds:[H_ROCK('#5a4e4a','#2e2624')],
  layout:function(c){ for(var y=0;y<c.H;y++){ var l=10+Math.round((c.nz(0,y*0.1)-0.5)*8), r=50+Math.round((c.nz(9,y*0.1)-0.5)*8); c.rect('rock',0,y,l,1); c.rect('rock',r,y,c.W-r,1); } },
  spawnAt:[30,56],
  props:function(c){ c.place('runecircle',26,9,8,3,{solid:false,col:'#ff9a60',n:10,claim:false}); for(var y=12;y<50;y+=3){ c.place('rock',30,y,1,1,{col:'#d8ccb4'}); if(y<44){ c.place('rib',27,y,1,1,{s:1.5,col:'#d8ccb4'}); c.place('rib',33,y,1,1,{s:1.5,col:'#d8ccb4',flip:true}); } }
    [[20,20,-1],[40,20,1],[18,30,-1],[42,30,1]].forEach(function(w){ for(var k=0;k<4;k++)c.place('rock',w[0]+w[2]*k*2,w[1]+k,1,1,{col:'#cfc2aa'}); });
    c.place('skull',28,6,4,3,{s:2.6,col:'#d8ccb4',eye:'#ff6a30'}); c.landmark(27,5,6,5,'Vorthrax the Old — the valley is named for the dragon, not the other way round.'); c.scatter('shard',10,{on:'ash'}); },
  particles:[WPART.embers(200),WPART.ash()], nightA:0.62, bg:'#140c0a' },

{ id:'emberflower_fields', quad:4, seed:419, name:'Ember-flower Fields', tagline:'Dark fields of glowing ember flowers', runeCol:'#ffb040',
  blurb:'The one gentle place in the Ashlands: rolling dark soil covered in ember flowers that glow like coals. Moths of spark drift between them, and a ring of rune stones guards the oldest patch.',
  ground:WK('soil','#2e2220','#3e2e2a',{sc:0.12,deco:WDECO.dots(['#1e1614','#5a403a'],0.35)}), kinds:[WK('bloom','#4a2a20','#5a3226',{sc:0.2})],
  hills:{sc:0.05,k:1.4},
  layout:function(c){ c.noise('bloom',0.08,0.48); },
  props:function(c){ for(var i=0;i<260;i++){ var x=c.R.i(0,59),y=c.R.i(0,59); if(c.is(x,y,'bloom')&&!c.occ[y*c.W+x])c.place('emberflower',x,y,1,1,{solid:false,claim:false,n:c.R.i(4,8)}); }
    for(var k=0;k<7;k++){ var a=k/7*Math.PI*2; c.place('stone',Math.round(30+Math.cos(a)*5),Math.round(24+Math.sin(a)*5),1,1,{rune:'#ffb040',col:'#4a3a36',tall:40}); } c.landmark(26,20,9,9,'The Hearth Garden — the first ember flowers grew from the dragon\'s last breath.');
    c.scatter('rock',10,{col:'#3a2a26'}); },
  particles:[WPART.embers(110)], nightA:0.66, bg:'#120a08' },

{ id:'chained_rocks', quad:4, seed:421, name:'Chained Floating Rocks', tagline:'Basalt islands and chained rocks over a lava lake', runeCol:'#ffd080',
  blurb:'A lava lake with basalt islands joined by iron-railed bridges. Above it, huge rocks float in the heat haze, each chained to a rune anchor on the islands below so it cannot drift away.',
  ground:A_LAVA(), kinds:[WK('isle','#2e2a2c','#3c3638',{sc:0.2,deco:WDECO.cracks('rgba(0,0,0,.5)',0.3)}),WK('bridge','#4a3a30','#4a3a30',{deco:WDECO.planks('#4a3a30')}),WK('bridgev','#4a3a30','#4a3a30',{deco:WDECO.planks('#4a3a30',true)})],
  layout:function(c){ var isl=[[30,48,5],[14,34,4],[44,32,5],[28,18,5],[50,12,3],[10,12,3]]; isl.forEach(function(q){ c.blob('isle',q[0],q[1],q[2],0.35); });
    [[0,1],[0,2],[1,3],[2,3],[2,4],[1,5]].forEach(function(e){ var a=isl[e[0]],b=isl[e[1]]; c.rect('bridge',Math.min(a[0],b[0]),a[1],Math.abs(a[0]-b[0])+1,1,'lava'); c.rect('bridgev',b[0],Math.min(a[1],b[1]),1,Math.abs(a[1]-b[1])+1,'lava'); }); c.isl=isl; },
  spawnAt:[30,48],
  props:function(c){ c.isl.forEach(function(q,i){ c.place('stone',q[0]+1,q[1]-1,1,1,{rune:'#ffd080',col:'#3a3230',tall:36}); c.place('floatrock',q[0]-3,q[1]-3,4,2,{solid:false,any:true,claim:false,chain:true,alt:130+i*10,rune:'#ffd080'}); });
    c.landmark(26,15,6,6,'The Anchor Isle — cut one chain and its rock would float off forever.'); },
  particles:[WPART.embers(60)], nightA:0.5, bg:'#1a0600' },

{ id:'forge_ruins', quad:4, seed:423, name:'Smouldering Forge-city Ruins', tagline:'A ruined forge city with smoking chimneys', runeCol:'#ff9a50',
  blurb:'The ruins of a city of smiths: paved streets, broken brick halls, anvils left where they stood, and tall chimneys still smoking. Troughs of cooling lava glow in the old workshops, and rune seals mark the forges.',
  ground:WK('street','#5a504a','#6a605a',{sc:0.3,deco:WDECO.flag('#7a706a','#1a1410')}), kinds:[WK('rubble','#4a403a','#5a504a',{sc:0.3,deco:WDECO.dots(['#3a302a','#7a6a5a'],0.5)}),A_LAVA()],
  layout:function(c){ for(var by=2;by<58;by+=14)for(var bx=2;bx<58;bx+=14){ c.rect('rubble',bx,by,10,10); if(c.R.chance(0.7))c.rect('lava',bx+3,by+4,4,1); } },
  props:function(c){ for(var by=2;by<58;by+=14)for(var bx=2;bx<58;bx+=14){ c.place('wall',bx,by,10,1,{col:'#6a3a2a',char:c.R.chance(0.5)}); c.place('wall',bx,by+9,4,1,{col:'#6a3a2a'}); c.place('wall',bx+7,by+9,3,1,{col:'#6a3a2a'}); if(c.R.chance(0.6))c.place('chimney',bx+8,by+2,1,1); c.place('anvil',bx+2,by+6,1,1); if(c.R.chance(0.4))c.place('runeglyph',bx+5,by+7,1,1,{solid:false,col:'#ff9a50'}); }
    c.landmark(16,16,10,10,'The Great Forge — the city\'s heart, where the Dwarf Forger learned his craft.'); },
  particles:[WPART.embers(90),WPART.ash()], nightA:0.6, bg:'#140c08' }
);
