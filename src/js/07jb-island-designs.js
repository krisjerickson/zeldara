// ═══════════════════════════════════════════════════════════════════════
// ║ ISLAND DESIGNS (round 6) — the 16 harbor islands are now built with the
// ║ overworld's Lab pipeline (the same kinds, props, runes and painter as
// ║ the mainland) instead of the old tile painter. 4 looks per quadrant to
// ║ pick from in the Design Lab ("Islands" tab); ISLAND_PICK maps each
// ║ island (harbor a = familiar island, b/c/d = castle islands) to a look.
// ║ Every design is 96 × 96 tiles of sea with the island in the middle and
// ║ the same anchors, so the game can place the dock, the village (trader,
// ║ healing well), the waystone, two monster camps and the adventure
// ║ entrance (dungeon / tower / castle gate) on any of them:
// ═══════════════════════════════════════════════════════════════════════
var ISL_ANCH={dock:[48,90],village:[48,77],trader:[43,76],well:[53,77],guide:[48,73],waystone:[38,79],adv:[48,19],camps:[[23,45],[73,47]]};
var ISL_SEA=WK('sea','#0f3764','#16487c',{solid:true,liquid:true,shore:'#d8eef4',sc:0.04,deco:WDECO.ripple('#ffffff')});
var ISL_PIER=WK('pier','#8a6a44','#9a7a50',{pattern:'planks',vert:true,flat:true});
var ISL_PLAZA=function(a,b){ return WK('plaza',a||'#b4ac98',b||'#c6beaa',{pattern:'slab',flat:true}); };
var ISL_SHALLOW=function(a,b){ return WK('shallow',a||'#2f7896',b||'#3f8aa6',{liquid:true,shore:'#e8f6f0',sc:0.1,deco:WDECO.ripple('#e8fbff')}); };
var ISL_SAND=function(a,b){ return WK('sand',a||'#d4c28c',b||'#e4d4a2',{sc:0.25,deco:WDECO.dots([shade(a||'#d4c28c',-0.12),shade(b||'#e4d4a2',0.1)],0.35)}); };
// island body: sea → shallows → beach → land (lobes = [cx,cy,rx,ry,jitter]); then the fixed anchors
function _islShape(c,o){ var land=o.land||'land', lobes=o.lobes||[[48,50,34,37,0.5]], W=c.W, H=c.H;
  // one smooth coastline: the nearest lobe edge, bent by low-frequency noise (no speckled beaches)
  var lo=vnoise(c.R.i(1,99999)), hi=vnoise(c.R.i(1,99999)), rough=o.rough===undefined?1:o.rough;
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){ var best=9;
    lobes.forEach(function(L){ var d=Math.hypot((x-L[0])/L[2],(y-L[1])/L[3]); if(d<best)best=d; });
    var e=best+((lo(x*0.06,y*0.06)-0.5)*0.34+(hi(x*0.18,y*0.18)-0.5)*0.07)*rough;   // < 1 = land
    var r0=Math.max(lobes[0][2],lobes[0][3]);
    if(e<1)c.set(x,y,land); else if(e<1+2.8/r0)c.set(x,y,'sand'); else if(e<1+6.5/r0+(hi(x*0.1+7,y*0.1)-0.5)*0.05)c.set(x,y,'shallow'); }
  if(o.inner)o.inner(c);
  // anchors: land under the village, the adventure clearing, the camps, and winding paths joining them
  c.blob(land,48,76,11,0.15,['sea','shallow'],7); c.blob('sand',48,85,6,0.1,['sea','shallow',land],3);
  c.blob(land,48,20,8,0.15,null,6); ISL_ANCH.camps.forEach(function(p){ c.blob(land,p[0],p[1],6,0.15,null,5); });
  var j=function(v){ return v+c.R.i(-3,3); };
  c.line('path',[[48,73],[j(44),66],[j(51),58],[j(45),49],[j(51),39],[j(45),30],[48,23]],1.9,7); c.line('path',[[j(47),56],[j(38),54],[j(30),49],[23,46]],1.6,6); c.line('path',[[j(49),48],[j(58),51],[j(66),47],[73,47]],1.6,6);
  c.blob('plaza',48,77,5.5,0.1,null,3.5); c.blob('plaza',48,20,4,0.1,null,3); c.blob('plaza',38,79,1.8,0.05,null,1.6);
  c.rect('pier',47,84,3,8); }
// the village, the dock and the adventure clearing (shared by every design)
function _islDress(c,o){ o=o||{};
  c.place('hut',40,70,3,2,{roof:o.roof||'#8a4a36',wall:o.wall||'#c8b08a'}); c.place('hut',54,70,3,2,{roof:o.roof2||o.roof||'#6a5a3a',wall:o.wall||'#c8b08a'});
  [[44,79],[52,79],[45,21],[51,21]].forEach(function(q){ c.place('lantern',q[0],q[1],1,1,{col:o.lamp||'#ffe08a'}); });
  c.place('boat',50,88,2,1,{solid:false,any:true}); c.landmark(44,72,9,7,(o.village||'The harbour village')+' — the trader, a healing well and the way home.');
  c.place('runeglyph',47,17,2,1,{solid:false,any:true,col:o.rune||'#6fe3f5',size:14}); }
var ISLAND_DESIGNS=[
  // ═══ Grasslands ═══
  { id:'isl_meadow_cove', quad:1, seed:601, w:96, h:96, name:'Meadow Cove', tagline:'A round green isle of meadows, a pond and an orchard', runeCol:'#9fffc8', spawnAt:ISL_ANCH.village,
    blurb:'A gentle round island: wildflower meadows, an apple orchard on the east side, a reedy pond in the west and sheep on the hills. White sand all round and a little wooden dock in the south.',
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND(),WK('land','#4f8f3e','#6fae52',{sc:0.12,deco:WDECO.grass('rgba(40,90,30,.55)',0.4)}),WK('meadow','#6a9a40','#8ab85a',{sc:0.2,deco:WDECO.dots(['#fff3a8','#ffffff','#ffb0c8'],0.5,2)}),WK('water','#23607f','#3a86a6',{solid:true,liquid:true,shore:'#d8f0e8',sc:0.08,deco:WDECO.ripple('#ffffff')}),ISL_PIER,ISL_PLAZA(),WK_PATH('#948870','#ae9f82')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.noise('meadow',0.09,0.58,'land',1); c.blob('water',26,56,6,0.5,'land',4.5); }}); },
    props:function(c){ _islDress(c,{village:'Cove village'}); for(var i=0;i<14;i++){ var p=c.randomOpen('land'); if(p&&p.x>56&&p.y>30&&p.y<66)c.place('tree',p.x,p.y,1,1,{kind:'blossom',col:'#e8a0c0'}); }
      c.scatter('tree',16,{kind:'round',col:'#3f7a3a',on:'land'}); c.scatter('bush',16,{col:'#4a7a3a',on:['land','meadow']}); c.scatter('sheep',10,{solid:false,on:'meadow'}); c.scatter('reeds',12,{on:'land',solid:false,n:6}); c.scatter('flowers',40,{solid:false,claim:false,on:['meadow','land'],cols:['#fff3a8','#ffffff','#ffb0b0']}); },
    particles:[WPART.petals(['#fff6c8','#ffffff','#ffd0e0'])] },
  { id:'isl_twin_hills', quad:1, seed:603, w:96, h:96, name:'Twin-Hill Isle', tagline:'Two green hills joined by a sandy spit, a windmill on top', runeCol:'#ffd27a', spawnAt:ISL_ANCH.village,
    blurb:'Two round hills rise out of the sea, joined in the middle by a narrow grassy spit. A windmill turns on the western hill, glyph kites fly over the eastern one, and golden crop strips run down the slopes.',
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND(),WK('land','#5f9a45','#86b85a',{sc:0.1,deco:WDECO.grass('rgba(50,100,35,.5)',0.3)}),WK('crop','#c9b35a','#dcc56c',{sc:0.3,deco:function(ctx,px,py){ ctx.fillStyle='rgba(140,110,40,.35)'; for(var i=0;i<LT;i+=6)ctx.fillRect(px,py+i,LT,2); }}),ISL_PIER,ISL_PLAZA(),WK_PATH('#948870','#ae9f82')],
    hills:{sc:0.05,k:2.4},
    layout:function(c){ _islShape(c,{lobes:[[28,42,19,22,0.5],[70,44,19,22,0.5],[48,50,9,14,0.4],[48,76,16,12,0.4],[48,22,12,10,0.4]],inner:function(c){ for(var i=0;i<6;i++){ c.rect('crop',c.R.i(14,72),c.R.i(30,60),c.R.i(6,11),c.R.i(2,4),'land'); } }}); },
    props:function(c){ _islDress(c,{village:'Spit village',roof:'#a05a3a'}); c.place('windmill',25,36,2,2,{rune:'#ffd27a'}); c.landmark(23,34,6,6,'The Hill Mill — its sails never stop, even without wind.');
      for(var k=0;k<5;k++){ var p=c.randomOpen('land'); if(p&&p.x>58)c.place('kite',p.x,p.y,1,1,{solid:false}); }
      c.scatter('tree',12,{kind:'round',col:'#3f7a3a',on:'land'}); c.scatter('bush',12,{col:'#4a7a3a',on:'land'}); c.scatter('flowers',30,{solid:false,claim:false,on:'land',cols:['#fff3a8','#ffffff']}); },
    particles:[WPART.petals(['#fff6c8','#ffffff','#e8f0a0'])] },
  { id:'isl_rune_atoll', quad:1, seed:607, w:96, h:96, name:'Rune Atoll', tagline:'A ring of land around a turquoise lagoon and standing stones', runeCol:'#7fe8ff',
    blurb:'A horseshoe atoll wrapped around a calm turquoise lagoon. Standing stones carved with runes ring the lagoon, joined by faint ley lines, and a stone circle glows on the little islet in the middle.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND(),WK('land','#4a8a5a','#62a472',{sc:0.12,deco:WDECO.grass('rgba(30,80,50,.5)',0.35)}),WK('lagoon','#2ea6b8','#46c0cc',{solid:true,liquid:true,shore:'#effaf4',sc:0.08,deco:WDECO.ripple('#ffffff')}),ISL_PIER,ISL_PLAZA('#a8b0a8','#bcc4bc'),WK_PATH('#8a8a78','#a2a290')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.blob('lagoon',48,47,17,0.5,'land',15); c.blob('land',48,47,4,0.3,'lagoon',3); }}); },
    props:function(c){ _islDress(c,{village:'Atoll village',lamp:'#bff4ff',rune:'#7fe8ff'}); var pts=[]; for(var i=0;i<9;i++){ var a=i/9*Math.PI*2; pts.push([Math.round(48+Math.cos(a)*21),Math.round(47+Math.sin(a)*20)]); }
      pts.forEach(function(q){ c.place('stone',q[0],q[1],1,1,{rune:'#7fe8ff',tall:true}); }); c.leyLine(pts.concat([pts[0]]),'#7fe8ff'); c.place('runecircle',46,45,5,5,{solid:false,col:'#7fe8ff'}); c.landmark(44,43,9,9,'The Lagoon Circle — the stones answer each other at night.');
      c.scatter('tree',10,{kind:'round',col:'#3a7a4a',on:'land'}); c.scatter('bush',14,{col:'#3a6a4a',on:'land'}); c.scatter('flowers',20,{solid:false,claim:false,on:'land',cols:['#c8f0ff','#ffffff']}); },
    particles:[WPART.motes('#bff4ff',160)], nightA:0.5 },
  { id:'isl_fae_forest', quad:1, seed:611, w:96, h:96, name:'Fae Forest Isle', tagline:'A thick old forest full of glowing mushroom rings', runeCol:'#e0a8ff',
    blurb:'Dense old woods cover this island almost to the beach. Paths wind between the trunks to clearings where fairy rings of glowing mushrooms pulse softly, and fireflies drift everywhere once the sun goes down.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND(),WK('land','#3e6e3a','#5a8a4a',{sc:0.12,deco:WDECO.grass('rgba(30,60,25,.55)',0.4)}),WK('moss','#3f7a34','#5c9a44',{deco:WDECO.dots(['#e8b0ff','#b0e0ff'],0.12,2)}),ISL_PIER,ISL_PLAZA(),WK_PATH('#7a6e58','#8e826a')],
    layout:function(c){ _islShape(c,{rough:1.4,lobes:[[48,48,36,38,0.7]],inner:function(c){ c.noise('moss',0.12,0.55,'land',2); }}); },
    props:function(c){ _islDress(c,{village:'Glade village',lamp:'#e8c0ff',rune:'#e0a8ff'}); c.place('mushring',20,30,7,7,{solid:false,n:14,col:'#e8a6ff',rune:'#e0a8ff',claim:true}); c.place('mushring',64,58,6,6,{solid:false,n:12,col:'#a6e8ff',rune:'#a6e8ff',claim:true}); c.landmark(20,30,7,7,'A fairy ring — step inside at night and the mushrooms sing.');
      c.scatter('tree',46,{kind:'round',col:'#2f6a34',on:['land','moss']}); c.scatter('tree',12,{kind:'pine',col:'#2a5a34',on:'land'}); c.scatter('bush',20,{col:'#3a6a34',on:['land','moss']}); c.scatter('flowers',20,{solid:false,claim:false,on:'moss',cols:['#e8b0ff','#b0e0ff']}); },
    particles:[WPART.fireflies({x:10*LT,y:10*LT,w:76*LT,h:70*LT})], nightA:0.55 },
  // ═══ Wetlands ═══
  { id:'isl_mangrove_maze', quad:2, seed:621, w:96, h:96, name:'Mangrove Isle', tagline:'Mangrove islets and wading channels', runeCol:'#9fe8c0',
    blurb:'Less an island than a tangle of mangrove islets: warm shallow channels you can wade through, stilt roots, reeds and lily pads, with the village on the one patch of firm ground by the dock.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#2e6a5e','#3e7e6e'),ISL_SAND('#b8a878','#cabb8c'),WK('land','#3f6a3a','#557e48',{sc:0.14,deco:WDECO.grass('rgba(30,60,30,.5)',0.35)}),WK('marsh','#4a5e3a','#5e724a',{sc:0.2,deco:WDECO.dots(['#3a4e2a','#6a8a4a'],0.3)}),ISL_PIER,ISL_PLAZA('#a09a84','#b4ae98'),WK_PATH('#7a705a','#8e846c')],
    layout:function(c){ _islShape(c,{rough:2,lobes:[[48,50,34,37,0.9]],inner:function(c){ for(var i=0;i<16;i++)c.blob('shallow',c.R.i(18,78),c.R.i(26,70),c.R.i(2,5),0.7,'land'); c.noise('marsh',0.1,0.56,'land',1); }}); },
    props:function(c){ _islDress(c,{village:'Stilt village',roof:'#5a4a36'}); c.scatter('tree',30,{kind:'mangrove',col:'#3f6a3a',on:['land','marsh']}); c.scatter('reeds',30,{on:['marsh','land','sand'],solid:false,n:8}); for(var i=0;i<28;i++){ var p=c.randomOpen(); if(p&&c.is(p.x,p.y,'shallow'))c.place('lilypad',p.x,p.y,1,1,{solid:false,any:true,claim:false,n:3}); } c.scatter('frog',6,{solid:false,on:'marsh'}); },
    particles:[WPART.mist('#dfe8e0'),WPART.fireflies({x:12*LT,y:20*LT,w:72*LT,h:56*LT})], nightA:0.5 },
  { id:'isl_lotus_lagoon', quad:2, seed:623, w:96, h:96, name:'Lotus Lagoon', tagline:'An atoll with a lagoon of lantern lilies', runeCol:'#ffd27a',
    blurb:'A ring of palm-green land around a still lagoon carpeted with giant lotus pads and lantern lilies that glow gold at dusk. Wooden walkways cross the lagoon to a little shrine in the middle.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND('#d8c894','#e8d8a8'),WK('land','#467a4a','#5e925a',{sc:0.12,deco:WDECO.grass('rgba(30,70,35,.5)',0.35)}),WK('lagoon','#2e6a60','#3e8070',{liquid:true,shore:'#dff4e0',sc:0.1,deco:WDECO.ripple('#e8fff0')}),WK('walk','#8a6a44','#9a7a50',{pattern:'planks',flat:true}),ISL_PIER,ISL_PLAZA(),WK_PATH('#8a7e68','#a4967a')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.blob('lagoon',48,46,16,0.5,'land',14); c.rect('walk',32,45,32,2,'lagoon'); c.rect('walk',47,32,2,28,'lagoon'); c.blob('land',48,46,3,0.2,null,2.5); }}); },
    props:function(c){ _islDress(c,{village:'Lagoon village'}); for(var i=0;i<60;i++){ var x=c.R.i(33,63), y=c.R.i(33,60); if(c.is(x,y,'lagoon'))c.place(c.R.chance(0.4)?'lanternlily':'lilypad',x,y,1,1,{solid:false,any:true,claim:false,n:3,col:c.R.pick(['#ffd27a','#ffb0a0','#fff0b0'])}); }
      c.place('arch',47,44,2,2,{col:'#c8b89a',rune:'#ffd27a'}); c.landmark(45,43,6,6,'The Lotus Shrine — lanterns float here on festival nights.'); c.scatter('tree',18,{kind:'willow',col:'#4f8a44',col2:'#7ab860',on:'land'}); c.scatter('reeds',20,{on:['sand','land'],solid:false,n:6}); },
    particles:[WPART.fireflies({x:28*LT,y:28*LT,w:40*LT,h:36*LT})], nightA:0.55 },
  { id:'isl_sunken_ruins', quad:2, seed:627, w:96, h:96, name:'Sunken Ruin Isle', tagline:'A drowned temple half under the tide', runeCol:'#80d8ff',
    blurb:'The sea has taken half of an old temple: broken columns and arches stand in the shallows, mossy steps lead down into the water, and rune glyphs still glow on the flagstones that remain above the tide line.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND('#c8bc98','#dacca8'),WK('land','#4a6a52','#5e7e64',{sc:0.12,deco:WDECO.grass('rgba(30,60,40,.5)',0.3)}),WK('flags','#8a9a92','#9eaea6',{pattern:'flag',grout:'#4a5a52',flat:true,moss:true}),ISL_PIER,ISL_PLAZA('#9aa49e','#aeb8b2'),WK_PATH('#8a8a7e','#a09e92')],
    layout:function(c){ _islShape(c,{lobes:[[48,54,32,32,0.6],[48,26,14,12,0.4]],inner:function(c){ c.blob('shallow',70,30,14,0.6,null,12); c.blob('flags',66,34,10,0.3,['land','shallow','sand'],8); c.blob('flags',30,60,7,0.3,'land',5); }}); },
    props:function(c){ _islDress(c,{village:'Tide village',lamp:'#bfe8ff',rune:'#80d8ff'}); [[60,28],[64,26],[70,28],[74,32],[62,38],[72,40],[76,36]].forEach(function(q,i){ c.place(i%3===2?'arch':'column',q[0],q[1],i%3===2?2:1,i%3===2?2:1,{col:'#b8c4be',rune:'#80d8ff',broken:i%2===0,any:true}); }); c.landmark(60,26,16,14,'The Drowned Temple — at low tide its runes spell a name.');
      c.scatter('column',6,{col:'#b8c4be',broken:true,on:'flags'}); c.scatter('tree',12,{kind:'round',col:'#3a6a4a',on:'land'}); c.scatter('bush',12,{col:'#3a5a44',on:'land'}); c.scatter('reeds',16,{on:['sand','land'],solid:false,n:6}); },
    particles:[WPART.mist('#dfeaf0')] },
  { id:'isl_turtle_back', quad:2, seed:631, w:96, h:96, name:'Turtle-Back Isle', tagline:'An island on the back of a sleeping giant turtle', runeCol:'#9fe8c0',
    blurb:'Look closely and the island is a shell: a hex-patterned dome of mossy scutes, with the head and flippers of an enormous sleeping turtle resting in the shallows. The villagers say it moves a little every century.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND(),WK('land','#4a7a4a','#5e8e5a',{sc:0.12,deco:WDECO.grass('rgba(30,70,35,.5)',0.35)}),WK('shell','#6a7a52','#7e8e64',{pattern:'scute',grout:'#3a4a2a',flat:true}),ISL_PIER,ISL_PLAZA(),WK_PATH('#8a7e68','#a4967a')],
    layout:function(c){ _islShape(c,{lobes:[[48,50,32,34,0.25]],inner:function(c){ c.blob('shell',48,46,20,0.1,'land',22); }}); },
    props:function(c){ _islDress(c,{village:'Shell village'}); c.place('turtlehead',47,12,1,1,{any:true,solid:false}); c.landmark(44,10,8,6,'The turtle\'s head — it breathes out once an hour.'); c.scatter('tree',14,{kind:'round',col:'#3a7a44',on:'land'}); c.scatter('bush',18,{col:'#3a6a3a',on:['land','shell']}); c.scatter('reeds',16,{on:['sand'],solid:false,n:6}); c.scatter('flowers',20,{solid:false,claim:false,on:'shell',cols:['#fff3a8','#c8f0ff']}); },
    particles:[WPART.motes('#c8ffe0',180)] },
  // ═══ Highlands ═══
  { id:'isl_crag_spire', quad:3, seed:641, w:96, h:96, name:'Crag Spire', tagline:'A rocky island rising to a cliff-top plateau', runeCol:'#ffd08a',
    blurb:'Granite crags and pines: the island rises in steps to a high plateau ringed by cliffs, with stairways cut into the rock. Wind tugs at the pines and gulls wheel over the stacks off the north shore.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#2a6a88','#3a7e9a'),ISL_SAND('#a8a08c','#bab29e'),WK('land','#6a7a58','#7e8e6a',{sc:0.14,deco:WDECO.grass('rgba(50,60,40,.5)',0.3)}),WK('high','#7a8a66','#8e9e78',{sc:0.14}),H_ROCK('#9a9a8a','#6e6c62'),WK('cliff','#6a6056','#7a7064',{solid:true,wall:{top:'#8e8272',face:'#5e5244',strata:true}}),WK('rim','#8a8272','#9a9282',{solid:true,wall:{top:'#9a8e7e',noFace:true}}),WK('stairs','#9a8e7e','#aea292',{flat:true,deco:WDECO.steps('#9a8e7e')}),ISL_PIER,ISL_PLAZA('#a8a090','#bab2a2'),WK_PATH('#8a8272','#9e9686')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.blob('high',50,42,15,0.5,'land',12); c.raise('high','cliff','rim'); c.cutStairs('cliff','stairs',3,'high'); for(var i=0;i<6;i++)c.blob('rock',c.R.i(16,80),c.R.i(24,70),c.R.i(1,3),0.5,'land'); }}); },
    props:function(c){ _islDress(c,{village:'Crag village',roof:'#5a5a6a'}); c.scatter('tree',22,{kind:'pine',col:'#2a5a3a',on:['land','high']}); c.scatter('rock',16,{on:['land','high']}); c.place('stone',50,40,1,1,{rune:'#ffd08a',tall:true}); c.landmark(46,36,8,8,'The Crag Top — you can see every harbour of the Highlands from here.'); },
    particles:[WPART.wind()] },
  { id:'isl_crystal_cove', quad:3, seed:643, w:96, h:96, name:'Crystal Cove', tagline:'Geodes and crystal outcrops along a scree shore', runeCol:'#c080ff',
    blurb:'Cracked-open geodes the size of cottages, violet and teal crystal clusters and fields of loose scree. The crystals hum faintly and glow brighter as you walk past.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND('#a89c90','#bab0a4'),WK('land','#7c7468','#8c8478',{sc:0.3,deco:WDECO.dots(['#6e685c','#9a9286'],0.4,3)}),WK('turf','#6a7a58','#7e8e6a',{sc:0.14,deco:WDECO.grass('rgba(50,60,40,.5)',0.3)}),ISL_PIER,ISL_PLAZA('#a09aa8','#b4aebc'),WK_PATH('#8a8290','#9e96a4')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.noise('turf',0.08,0.5,'land',1); }}); },
    props:function(c){ _islDress(c,{village:'Geode village',lamp:'#e0c0ff',rune:'#c080ff'}); for(var i=0;i<8;i++){ var p=c.randomOpen(); if(p)c.place('geode',p.x,p.y,1,1,{col:c.R.pick(['#c080ff','#80e8ff','#ff90d0'])}); } c.scatter('crystal',26,{col:'#c8a0ff',on:['land','turf']}); c.scatter('crystal',14,{col:'#9ff0ff',on:'land'}); c.scatter('rock',12,{on:'land'}); },
    particles:[WPART.motes('#e0c0ff',150)], nightA:0.5 },
  { id:'isl_snowcap', quad:3, seed:647, w:96, h:96, name:'Snowcap Isle', tagline:'A snowy island with a frozen pond and pines', runeCol:'#bfe8ff',
    blurb:'Snow lies deep on this northern island. Dark pines, boulders capped with snow, a frozen pond you can slide across and a ring of ice-rimed standing stones. Snow falls gently all day.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#3a6e8a','#4a829c'),ISL_SAND('#c8ccd0','#dadee2'),WK('land','#e4eaf0','#f4f8fc',{sc:0.2,deco:WDECO.dots(['#c8d4e0','#ffffff'],0.25)}),WK('ice','#a8d0e8','#c0e0f4',{sc:0.1,deco:WDECO.cracks('rgba(255,255,255,.6)',0.3)}),ISL_PIER,ISL_PLAZA('#b0b4bc','#c4c8d0'),WK_PATH('#a8a8b0','#bcbcc4')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.blob('ice',66,58,8,0.4,'land',6); }}); },
    props:function(c){ _islDress(c,{village:'Frost village',roof:'#4a5a7a',lamp:'#cfefff',rune:'#bfe8ff'}); c.scatter('tree',30,{kind:'pine',col:'#2a4a3a',on:'land'}); c.scatter('rock',14,{on:'land'}); [[26,30],[30,26],[34,30],[30,34]].forEach(function(q){ c.place('stone',q[0],q[1],1,1,{rune:'#bfe8ff',tall:true}); }); c.landmark(25,25,11,11,'The Frost Stones — breath freezes into runes here.'); },
    particles:[WPART.snow()] },
  { id:'isl_giants_steps', quad:3, seed:653, w:96, h:96, name:'Giant\'s Steps', tagline:'Basalt terraces and the stone giants who built them', runeCol:'#ffd08a',
    blurb:'Hexagonal basalt columns climb out of the sea in giant steps. Old stone golems lie toppled among them, moss in their joints, runes on their chests still faintly warm.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW(),ISL_SAND('#8a8480','#9c9692'),WK('land','#6a7058','#7e846a',{sc:0.14,deco:WDECO.grass('rgba(40,50,35,.5)',0.3)}),WK('hexes','#5a5a5e','#6e6e72',{pattern:'hex',grout:'#2a2a2e',flat:true}),ISL_PIER,ISL_PLAZA('#8e8e94','#a2a2a8'),WK_PATH('#7a7a7e','#8e8e92')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.blob('hexes',70,34,12,0.5,'land',10); c.blob('hexes',26,62,8,0.5,'land',6); }}); },
    props:function(c){ _islDress(c,{village:'Step village',roof:'#4a4a52'}); for(var i=0;i<4;i++){ var p=c.randomOpen('land'); if(p)c.place('golem',p.x,p.y,3,2,{col:c.R.pick(['#8a8578','#7a7a70','#9a9080'])}); } c.scatter('basalt',18,{on:'hexes'}); c.scatter('tree',10,{kind:'pine',col:'#2a5a3a',on:'land'}); c.scatter('rock',10,{on:'land'}); c.landmark(64,28,12,12,'The Giant\'s Steps — the columns ring like bells when you walk on them.'); },
    particles:[WPART.wind()] },
  // ═══ Ashlands ═══
  { id:'isl_ember_caldera', quad:4, seed:661, w:96, h:96, name:'Ember Caldera', tagline:'A volcanic cone with a lava lake in its crater', runeCol:'#ff9a40',
    blurb:'The island is the rim of a small volcano: black ash slopes rise to a ring of basalt around a glowing lava lake. Sparks drift on the hot wind and the ground is cracked with fire.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#2a4a5a','#3a5a6a'),ISL_SAND('#4a4240','#5c5452'),WK('land','#3a302c','#4a3e38',{sc:0.2,deco:WDECO.glowCracks('#ff6a20',0.18)}),A_LAVA(),WK('basaltrim','#2e2626','#3e3434',{solid:true,wall:{top:'#4a3e3a',face:'#241c1a',strata:true}}),ISL_PIER,ISL_PLAZA('#6a5e58','#7e726c'),WK_PATH('#5a504a','#6e645c')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.ring('basaltrim',58,44,12,3,'land'); c.blob('lava',58,44,10,0.3,'land',10); c.rect('land',57,54,3,4); }}); },
    props:function(c){ _islDress(c,{village:'Ash village',roof:'#3a2a26',wall:'#8a7a6a',lamp:'#ffb060',rune:'#ff9a40'}); c.scatter('basalt',14,{on:'land'}); c.scatter('tree',10,{kind:'dead',col:'#2a2220',on:'land'}); c.scatter('emberflower',10,{solid:false,claim:false,on:'land'}); c.landmark(46,32,24,24,'The Caldera — the lava lake glows through the night.'); },
    particles:[WPART.embers(70),WPART.ash()] },
  { id:'isl_obsidian_shore', quad:4, seed:663, w:96, h:96, name:'Obsidian Shore', tagline:'Black glass beaches and steaming geysers', runeCol:'#ff7a50',
    blurb:'Waves have polished the lava flows into beaches of black volcanic glass. Shards of obsidian stick up like teeth, sulphur geysers hiss and steam, and the rocks glint red in the light.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#24404e','#34505e'),ISL_SAND('#1e1a20','#2e2830'),WK('land','#2c2830','#3c3640',{sc:0.2,deco:WDECO.dots(['#1a161c','#5a5260'],0.3)}),WK('sulfur','#6e6a3e','#7e7a4a',{sc:0.2,deco:WDECO.dots(['#b8b050','#4a4a2a'],0.4)}),ISL_PIER,ISL_PLAZA('#5a5260','#6e6674'),WK_PATH('#4a4450','#5e5864')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.noise('sulfur',0.1,0.68,'land',2); }}); },
    props:function(c){ _islDress(c,{village:'Glass village',roof:'#2a2230',wall:'#7a6e7e',lamp:'#ff9a70',rune:'#ff7a50'}); c.scatter('glass',30,{solid:false,claim:false,on:['land','sand']}); c.scatter('shard',24,{on:'land'}); for(var i=0;i<7;i++){ var p=c.randomOpen('sulfur'); if(p)c.place('geyser',p.x,p.y,1,1,{solid:false}); } c.landmark(30,40,10,10,'The Hissing Field — count to seven between geysers.'); },
    particles:[WPART.ash(),WPART.mist('#e8e0d0')] },
  { id:'isl_charred_grove', quad:4, seed:667, w:96, h:96, name:'Charred Grove', tagline:'A burned forest where ember-flowers bloom', runeCol:'#ffb060',
    blurb:'A forest burned long ago and never died: black trunks stand in grey ash, but ember-flowers bloom in every hollow and the tree hearts still smoulder with a warm orange light.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#2a4a5a','#3a5a6a'),ISL_SAND('#5a5250','#6c6462'),WK('land','#4a4442','#5a5452',{sc:0.2,deco:WDECO.dots(['#3a3432','#7a7270'],0.3)}),WK('char','#2e2826','#3e3634',{sc:0.2,deco:WDECO.glowCracks('#ff8a30',0.12)}),ISL_PIER,ISL_PLAZA('#6a625e','#7e7672'),WK_PATH('#5a524e','#6e6662')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.noise('char',0.1,0.55,'land',1); }}); },
    props:function(c){ _islDress(c,{village:'Cinder village',roof:'#3a2e2a',wall:'#8a7e72',lamp:'#ffb060',rune:'#ffb060'}); c.scatter('tree',34,{kind:'ash',col:'#2a2220',on:['land','char']}); c.scatter('tree',12,{kind:'dead',col:'#2a2220',on:'land'}); c.scatter('emberflower',24,{solid:false,claim:false,on:['char','land']}); c.landmark(20,40,10,10,'The Smouldering Heart — an old oak that has burned for a hundred years.'); },
    particles:[WPART.ash(),WPART.embers(140)] },
  { id:'isl_forge_rock', quad:4, seed:671, w:96, h:96, name:'Forge Rock', tagline:'Ruined forges and lava channels on a black rock', runeCol:'#ff9a40',
    blurb:'Dwarves once worked here: channels cut in the rock still carry lava down to ruined forges with tall chimneys, anvils and cracked quench pools. Banners hang in tatters from the walls.', spawnAt:ISL_ANCH.village,
    ground:ISL_SEA, kinds:[ISL_SHALLOW('#2a4a5a','#3a5a6a'),ISL_SAND('#4a4240','#5c5452'),WK('land','#3e3634','#4e4644',{sc:0.2,deco:WDECO.cracks('rgba(0,0,0,.35)',0.25)}),A_LAVA(),WK('forgefloor','#5a504a','#6e645c',{pattern:'brick',grout:'#1e1612',flat:true}),ISL_PIER,ISL_PLAZA('#6a5e58','#7e726c'),WK_PATH('#5a504a','#6e645c')],
    layout:function(c){ _islShape(c,{inner:function(c){ c.line('lava',[[20,24],[30,36],[28,50],[36,60]],2,3,'land'); c.line('lava',[[76,24],[66,34],[70,48],[62,60]],2,3,'land'); c.rect('land',28,44,3,2); c.rect('land',68,40,3,2); c.blob('forgefloor',30,66,7,0.2,'land',5); c.blob('forgefloor',68,64,7,0.2,'land',5); }}); },
    props:function(c){ _islDress(c,{village:'Forge village',roof:'#3a2a26',wall:'#8a7a6a',lamp:'#ffb060',rune:'#ff9a40'}); [[28,62],[66,60]].forEach(function(q){ c.place('chimney',q[0]+4,q[1],1,1); c.place('anvil',q[0],q[1]+4,1,1); c.place('banner',q[0]+2,q[1]-1,1,1,{col:'#8a2a1a'}); }); c.scatter('basalt',10,{on:'land'}); c.scatter('tree',8,{kind:'dead',col:'#2a2220',on:'land'}); c.landmark(24,58,12,12,'The Old Forge — the lava still runs to its quench pools.'); },
    particles:[WPART.embers(90),WPART.ash()] }
];
var ISL_FAM_NAMES={1:'Corsair Isle',2:'Bog Isle',3:'Ember Isle',4:'Frost Isle'};   // the familiar islands (HARBOR_ISLANDS in 13 has the rest)
var ISLAND_DESIGN_BY_ID={}; ISLAND_DESIGNS.forEach(function(Z){ ISLAND_DESIGN_BY_ID[Z.id]=Z; });
// which look each island uses (Lab picks override). a = the familiar island, b/c/d = castle islands
var ISLAND_PICK={
  '1a':'isl_meadow_cove','1b':'isl_twin_hills','1c':'isl_rune_atoll','1d':'isl_fae_forest',
  '2a':'isl_mangrove_maze','2b':'isl_lotus_lagoon','2c':'isl_sunken_ruins','2d':'isl_turtle_back',
  '3a':'isl_crag_spire','3b':'isl_crystal_cove','3c':'isl_snowcap','3d':'isl_giants_steps',
  '4a':'isl_ember_caldera','4b':'isl_obsidian_shore','4c':'isl_charred_grove','4d':'isl_forge_rock'};
