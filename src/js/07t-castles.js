// ═══════════════════════════════════════════════════════════════════════
// ║ ISLAND CASTLES + TEACHERS (Phase 4b)
// ║ Each quadrant has 4 islands, each reached from its own harbor:
// ║   island A — the familiar dungeon (as before)
// ║   islands B, C, D — a castle. A one-phase warden holds a master
// ║   teacher prisoner; free them and they teach you a special skill
// ║   (Z). Skills are no longer sold in shops. 3 teachers per quadrant
// ║   = 12 skills (10 existing + Time Slow and Meteor Strike), stronger
// ║   skills in later quadrants.
// ║ Castle interiors use the tower builder with 12 castle looks (also in
// ║ the Design Lab's Castles tab).
// ═══════════════════════════════════════════════════════════════════════
TOWER_TALL.center_throne=function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h-6,110,120,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-8,34,10,0.35);
  ctx.fillStyle=shade(p.trim,-0.2); ctx.fillRect(cw/2-34,ch-22,68,16); ctx.fillStyle=p.trim; ctx.fillRect(cw/2-30,ch-30,60,10);
  ctx.fillStyle=p.fabric; rr(ctx,cw/2-18,ch-86,36,60,6); ctx.fill(); ctx.fillStyle=p.metal||p.trim; ctx.fillRect(cw/2-22,ch-92,44,8); [-16,0,16].forEach(function(dx){ ctx.beginPath(); ctx.moveTo(cw/2+dx-5,ch-92); ctx.lineTo(cw/2+dx,ch-104); ctx.lineTo(cw/2+dx+5,ch-92); ctx.fill(); });
  ctx.fillStyle=shade(p.fabric,0.2); ctx.fillRect(cw/2-12,ch-62,24,30); ctx.fillStyle=p.fabric2||'#e0c060'; ctx.fillRect(cw/2-22,ch-58,6,26); ctx.fillRect(cw/2+16,ch-58,6,26); });
  addLight(m,x+w/2,y+h/2,90,p.light||'#ffe0a0',0.35,{pulse:0.2,depth:-4}); };
TOWER_TALL.center_brazier=function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h-8,70,80,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-6,22,7,0.35); ctx.fillStyle=shade(p.metal||'#6a5a4a',-0.2); ctx.fillRect(cw/2-4,ch-34,8,28); ctx.fillStyle=p.metal||'#8a7a6a'; ctx.beginPath(); ctx.ellipse(cw/2,ch-36,22,8,0,0,Math.PI*2); ctx.fill();
  var g=ctx.createRadialGradient(cw/2,ch-48,2,cw/2,ch-48,20); g.addColorStop(0,'#fff0a0'); g.addColorStop(0.5,p.light||'#ffa040'); g.addColorStop(1,'rgba(255,120,40,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(cw/2,ch-48,18,16,0,0,Math.PI*2); ctx.fill(); });
  addLight(m,x+w/2,y+h/2-10,130,p.light||'#ffa040',0.5,{flicker:0.35,depth:-4}); };
TOWER_LABEL.center_throne=function(){ return 'The warden\'s throne.'; };
TOWER_LABEL.center_brazier=function(){ return 'A great brazier — the castle\'s heart-fire.'; };
function extSea(top,bottom){ return function(ctx,W,H,m,R){ var g=ctx.createLinearGradient(0,0,0,H*LT); g.addColorStop(0,top); g.addColorStop(1,bottom); ctx.fillStyle=g; ctx.fillRect(0,0,W*LT,H*LT); ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.lineWidth=1.2; for(var i=0;i<260;i++){ var x=R.f()*W*LT, y=R.f()*H*LT; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+6,y-3,x+12,y); ctx.stroke(); } }; }
function extLava(top,bottom){ return function(ctx,W,H,m,R){ var g=ctx.createLinearGradient(0,0,0,H*LT); g.addColorStop(0,top); g.addColorStop(1,bottom); ctx.fillStyle=g; ctx.fillRect(0,0,W*LT,H*LT); for(var i=0;i<140;i++){ ctx.fillStyle='rgba(255,'+(90+R.f()*90|0)+',30,'+(0.25+R.f()*0.4)+')'; ctx.beginPath(); ctx.ellipse(R.f()*W*LT,R.f()*H*LT,4+R.f()*18,2+R.f()*6,0,0,Math.PI*2); ctx.fill(); } }; }

var CASTLE_STYLES=[
  towerStyle({ id:'thornwood_keep', name:'Thornwood Keep', plan:'gallery', seed:111, windowEvery:3, glass:0.15, q:1,
    tagline:'A knights\' keep swallowed by briars and wild roses',
    blurb:'Grey stone halls where thorny briars climb every pillar and wild roses bloom through the cracks. Green light falls through ivy-choked windows; the warden\'s throne sits under a rose canopy.',
    facts:['Plan: Long hall','Centerpiece: throne under roses','Pillars: briar-wrapped'],
    pal:{outside:'#4a6a3a',wallTop:'#bcc0b0',wallFace:'#a0a494',trim:'#6a8a4a',floorA:'#b8b8a8',floorB:'#8a9078',glassA:'#dff0c0',glassB:'#8ac070',light:'#e8ffc0',wood:'#7a5a3a',fabric:'#8a2a3a',fabric2:'#e07080',metal:'#8a8a78',plant:'#4a7a3a',accent:'#e07080',statue:'#c8ccc0'},
    paintExterior:extGarden('#4f7a42','#3f6a34',null),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#b8b8a8','#6a8a4a',R); if(R.chance(0.08)){ ctx.strokeStyle='rgba(74,122,58,.6)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x,y+R.f()*LT); ctx.quadraticCurveTo(x+16,y+R.f()*LT,x+LT,y+R.f()*LT); ctx.stroke(); } },
    center:'throne', shaftSkew:8, shaftA:0.28,
    particles:[{tex:'leaf',tints:['#e07080','#f0a0b0','#6a9a4a'],freq:500,vx:{min:-8,max:8},vy:{min:6,max:14},scale:{start:0.8,end:0.5},alpha:{start:0.9,end:0},life:{min:6000,max:9000},blend:false,rotate:{min:0,max:360},depth:6500}] }),
  towerStyle({ id:'sunflower_chateau', name:'Sunflower Château', plan:'grand', seed:121, windowEvery:2, glass:0.2, q:1,
    tagline:'A sunny country château in gold and white',
    blurb:'Buttercream walls, gold trim and sunflower-yellow tiles. Big windows flood the rooms with warm noon light, and a fountain splashes in the central court.',
    facts:['Plan: Grand floor','Centerpiece: fountain','Light: warm noon shafts'],
    pal:{outside:'#8ab860',wallTop:'#fbf3dc',wallFace:'#efe2bc',trim:'#e0b040',floorA:'#f8e8b0',floorB:'#e8c860',glassA:'#fff4c0',glassB:'#f0d070',light:'#fff0b0',wood:'#b8904a',fabric:'#e0a020',fabric2:'#fff0c0',metal:'#e0b040',plant:'#6aa04a',accent:'#f0c040'},
    paintExterior:extGarden('#8ab860','#7aa850',null),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.checker(ctx,x,y,tx,ty,'#f8e8b0','#f0d080'); },
    center:'fountain', shaftSkew:14, shaftA:0.42,
    particles:[{col:'#fff0b0',freq:200,scale:{start:0.35,end:0},alpha:{start:0.7,end:0}}] }),
  towerStyle({ id:'windmill_bastion', name:'Windmill Bastion', plan:'rotunda', seed:131, windowEvery:3, glass:0.1, q:1,
    tagline:'Timber-and-stone fort around a great mill wheel',
    blurb:'A round bastion of timber beams and fieldstone built around an old mill. Grain sacks, rope and oak everywhere; the mill\'s brass gears turn in the middle of the hall.',
    facts:['Plan: Rotunda','Centerpiece: brass gear orrery','Floors: oak planks'],
    pal:{outside:'#9ac070',wallTop:'#d8c8a8',wallFace:'#b8a07a',trim:'#7a5a34',floorA:'#c8a878',floorB:'#8a6a44',glassA:'#f0e8c8',glassB:'#c8b890',light:'#ffe0a0',wood:'#8a6a44',fabric:'#b04a2a',fabric2:'#e8d8b0',metal:'#c8a040',plant:'#6a9a4a',accent:'#c8a040'},
    paintExterior:extGarden('#9ac070','#8ab060',null),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.planks(ctx,x,y,tx,ty,'#c8a878','#6a4a2a',R); },
    center:'orrery', shaftSkew:6, shaftA:0.3,
    particles:[{col:'#f0e0b0',freq:260,scale:{start:0.4,end:0},alpha:{start:0.5,end:0},vx:{min:6,max:18}}] }),
  towerStyle({ id:'lotus_palace', name:'Lotus Water Palace', plan:'rotunda', seed:141, windowEvery:2, glass:0.35, q:2,
    tagline:'Teal marble halls built over lotus pools',
    blurb:'A palace on stilts over the marsh: teal marble, pink lotus inlays and still reflecting pools with floating lanterns. Water light ripples on every wall.',
    facts:['Plan: Rotunda','Centerpiece: lotus pool','Light: water ripples'],
    pal:{outside:'#1e5a60',wallTop:'#d8f0ec',wallFace:'#b0dcd4',trim:'#e080a8',floorA:'#c8ece4',floorB:'#80c8bc',glassA:'#e0fff8',glassB:'#80d0c8',light:'#c0fff0',wood:'#8a7a6a',fabric:'#e080a8',fabric2:'#fff0f8',metal:'#a8d8d0',plant:'#4aa080',accent:'#f0a0c0',water:'#60c0c8'},
    paintExterior:extSea('#1e5a60','#2a7a78'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#c8ece4','#40a0a0',R); },
    center:'pool', shaftSkew:4, shaftA:0.24,
    particles:[{col:'#c0fff0',freq:160,scale:{start:0.4,end:0},alpha:{start:0.8,end:0},vy:{min:-10,max:-3}}] }),
  towerStyle({ id:'drowned_abbey', name:'The Drowned Abbey', plan:'gallery', seed:151, windowEvery:3, glass:0.2, q:2,
    tagline:'A half-flooded abbey of mossy blue stone',
    blurb:'Cold blue-grey stone slick with moss, puddles on the floor and pale crystals growing from the drowned altar. Shafts of greenish light fall from broken windows.',
    facts:['Plan: Long hall','Centerpiece: drowned crystal','Floors: wet flagstones'],
    pal:{outside:'#1a3a3a',wallTop:'#9ab0b0',wallFace:'#7a9494',trim:'#4a7a6a',floorA:'#8aa4a0',floorB:'#5a7a74',glassA:'#c0f0e0',glassB:'#60b0a0',light:'#a0ffe0',wood:'#5a5a4a',fabric:'#2a5a5a',fabric2:'#a0c8c0',metal:'#7a9a94',plant:'#3a7a4a',accent:'#80e0c0'},
    paintExterior:extSea('#0e2a2e','#1a4a48'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#8aa4a0','#3a5a54',R); if(R.chance(0.1)){ ctx.fillStyle='rgba(120,200,210,.25)'; ctx.beginPath(); ctx.ellipse(x+16,y+16,10,5,0,0,Math.PI*2); ctx.fill(); } },
    center:'crystal', shaftSkew:10, shaftA:0.26,
    particles:[{col:'#a0ffe0',freq:200,scale:{start:0.3,end:0},alpha:{start:0.7,end:0},vy:{min:-6,max:-2}}] }),
  towerStyle({ id:'mangrove_fort', name:'Mangrove Fort', plan:'grand', seed:161, windowEvery:4, glass:0.05, q:2,
    tagline:'A dark-wood fort grown into giant mangrove roots',
    blurb:'Walls of dark lashed timber, rope bridges and hanging lanterns; a giant mangrove grows up through the middle of the fort, glow-moths circling it.',
    facts:['Plan: Grand floor','Centerpiece: great mangrove','Light: hanging lanterns'],
    pal:{outside:'#243a24',wallTop:'#8a7054',wallFace:'#6a5238',trim:'#c8a060',floorA:'#7a5e40',floorB:'#4a3822',glassA:'#f0e0a0',glassB:'#c8a050',light:'#ffd080',wood:'#5a4228',fabric:'#3a6a3a',fabric2:'#c8b890',metal:'#8a7a5a',plant:'#3a6a2a',accent:'#e0c060',bark:'#5a4228'},
    paintExterior:extGarden('#2a4a2a','#1e3a1e','#2a5a4a'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.planks(ctx,x,y,tx,ty,'#7a5e40','#3a2a18',R); },
    center:'tree', shaftSkew:0, shaftA:0.18,
    particles:[{col:'#d0ff90',freq:220,scale:{start:0.4,end:0},alpha:{start:0.9,end:0},vx:{min:-10,max:10},vy:{min:-10,max:10}}] }),
  towerStyle({ id:'dwarven_hold', name:'Dwarven Hold', plan:'grand', seed:171, windowEvery:5, glass:0, q:3,
    tagline:'Granite halls with brass, runes and a forge-fire heart',
    blurb:'Square-cut granite, brass inlays and glowing rune bands. Massive pillars hold up the stone; a great brazier burns in the central hall.',
    facts:['Plan: Grand floor','Centerpiece: great brazier','Floors: rune-cut granite'],
    pal:{outside:'#3a3632',wallTop:'#8a8480',wallFace:'#6a6460',trim:'#c89040',floorA:'#7a7470',floorB:'#5a5450',glassA:'#ffd080',glassB:'#c89040',light:'#ffb050',wood:'#6a4a2a',fabric:'#7a2a1a',fabric2:'#e0b060',metal:'#c89040',plant:'#5a6a4a',accent:'#ffb050'},
    paintExterior:extNight('#1a1816','#2a2622'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#7a7470','#c89040',R); if((tx+ty)%6===0){ ctx.fillStyle='rgba(255,176,80,.35)'; ctx.fillRect(x+12,y+12,8,8); } },
    center:'brazier', shaftSkew:0, shaftA:0.1, ao:0.3,
    particles:[{tints:['#ffb050','#ff8030'],freq:120,scale:{start:0.4,end:0},alpha:{start:1,end:0},vy:{min:-30,max:-10}}] }),
  towerStyle({ id:'glacier_citadel', name:'Glacier Citadel', plan:'rotunda', seed:181, windowEvery:2, glass:0.5, q:3,
    tagline:'A citadel carved out of blue glacier ice',
    blurb:'Walls of clear blue ice with frozen bubbles, frost-white floors and ice pillars; a giant glowing ice crystal hums in the rotunda. Snow drifts through.',
    facts:['Plan: Rotunda','Centerpiece: heart of ice','Floors: frosted ice'],
    pal:{outside:'#a8c8e8',wallTop:'#e8f4ff',wallFace:'#c0dcf4',trim:'#8ab8e0',floorA:'#dceeff',floorB:'#a8cce8',glassA:'#e8f8ff',glassB:'#90c8f0',light:'#c8ecff',wood:'#a8b8c8',fabric:'#4a7ab0',fabric2:'#e8f4ff',metal:'#c0d8f0',plant:'#8ab0c8',accent:'#bfe8ff'},
    paintExterior:extSky('#a8c8e8','#e8f4ff',0.4),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.ice(ctx,x,y,tx,ty,'#dceeff','#a8cce8',R); },
    center:'crystal', pillar:'crystalpillar', shaftSkew:4, shaftA:0.2,
    particles:[{col:'#ffffff',freq:120,scale:{start:0.5,end:0.2},alpha:{start:0.9,end:0},vy:{min:10,max:24},vx:{min:-6,max:6}}] }),
  towerStyle({ id:'eyrie_castle', name:'Eyrie Castle', plan:'gallery', seed:191, windowEvery:1, glass:0, q:3,
    tagline:'A cliff-top castle of open arches and wind',
    blurb:'Perched on a crag, every outer wall is an open arch onto the sky. Feathered banners snap in the wind; a brass sky-orrery turns in the great hall.',
    facts:['Plan: Long hall','Open arches all round','Centerpiece: sky orrery'],
    pal:{outside:'#8ab0d8',wallTop:'#e8e4dc',wallFace:'#d0cabe',trim:'#5a7aa8',floorA:'#e4dfd4',floorB:'#b8b0a0',glassA:'#d8ecff',glassB:'#98c0e8',light:'#ffffff',wood:'#8a7a60',fabric:'#3a5a9a',fabric2:'#f0e8d8',metal:'#c8a860',plant:'#7a9a6a',accent:'#6a90d0'},
    paintExterior:extSky('#6a98d0','#d8ecff',0.5),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.herring(ctx,x,y,tx,ty,'#e4dfd4','#8a8070'); },
    center:'orrery', shaftSkew:12, shaftA:0.3,
    particles:[{col:'#ffffff',freq:300,scale:{start:0.5,end:0},alpha:{start:0.5,end:0},vx:{min:20,max:40}}] }),
  towerStyle({ id:'obsidian_bastille', name:'Obsidian Bastille', plan:'grand', seed:201, windowEvery:4, glass:0.1, q:4,
    tagline:'A prison-fortress of black glass veined with fire',
    blurb:'Polished black obsidian floors that reflect the torches, red iron trim and chained braziers. The warden\'s spiked throne stands over a lava-lit hall.',
    facts:['Plan: Grand floor','Centerpiece: spiked throne','Floors: polished obsidian'],
    pal:{outside:'#1a0806',wallTop:'#3a3034',wallFace:'#2a2226',trim:'#b8301a',floorA:'#2a2428',floorB:'#161214',glassA:'#ff9060',glassB:'#b83010',light:'#ff8040',wood:'#3a2a24',fabric:'#8a1a10',fabric2:'#ff9060',metal:'#6a2a1a',plant:'#4a3a30',accent:'#ff6030'},
    paintExterior:extLava('#1a0806','#3a0a02'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#2a2428','#ff6030',R); },
    center:'throne', shaftSkew:0, shaftA:0.12, ao:0.35,
    particles:[{tints:['#ffb040','#ff6020'],freq:80,scale:{start:0.5,end:0},alpha:{start:1,end:0},vy:{min:-40,max:-15}}] }),
  towerStyle({ id:'ember_sanctum', name:'Ember Sanctum', plan:'rotunda', seed:211, windowEvery:2, glass:0.25, q:4,
    tagline:'An orange-stone fire temple with a burning heart',
    blurb:'Warm orange sandstone, brass fire-bowls and red silk; the temple\'s eternal flame roars in a great brazier under the dome.',
    facts:['Plan: Rotunda','Centerpiece: eternal flame','Light: fire-bowls'],
    pal:{outside:'#3a1a0e',wallTop:'#e0a878',wallFace:'#c88858',trim:'#e0b040',floorA:'#d09868',floorB:'#a86a40',glassA:'#ffd080',glassB:'#e08040',light:'#ffa040',wood:'#7a4a2a',fabric:'#b82a1a',fabric2:'#ffd090',metal:'#d0a040',plant:'#8a6a3a',accent:'#ffb040'},
    paintExterior:extLava('#2a0e06','#4a1a08'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.hex(ctx,x,y,tx,ty,'#d09868','#a86a40',R); },
    center:'brazier', shaftSkew:16, shaftA:0.4,
    particles:[{tints:['#ffd080','#ff8030'],freq:90,scale:{start:0.4,end:0},alpha:{start:1,end:0},vy:{min:-30,max:-10}}] }),
  towerStyle({ id:'bone_throne_keep', name:'Bone Throne Keep', plan:'gallery', seed:221, windowEvery:3, glass:0.05, q:4,
    tagline:'Ash-grey halls decorated with dragon bones',
    blurb:'Ash-grey stone, bone-white trim and ribs of ancient dragons arching over the halls. Grey ash drifts in the air; the warden sits on a throne of bones.',
    facts:['Plan: Long hall','Centerpiece: throne of bones','Floors: ash flagstones'],
    pal:{outside:'#2a2624',wallTop:'#a8a09a',wallFace:'#8a827c',trim:'#e8e0cc',floorA:'#8a847e',floorB:'#5a5450',glassA:'#e0d8c8',glassB:'#a09888',light:'#ffe0b0',wood:'#5a4a40',fabric:'#4a3a3a',fabric2:'#e8e0cc',metal:'#e8e0cc',plant:'#5a5a4a',accent:'#e8e0cc',statue:'#e8e0cc'},
    paintExterior:extNight('#141210','#2a2420'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#8a847e','#3a3430',R); },
    center:'throne', shaftSkew:6, shaftA:0.18,
    particles:[{col:'#b8b0a8',freq:120,scale:{start:0.5,end:0.3},alpha:{start:0.6,end:0},vy:{min:6,max:14},vx:{min:-8,max:8}}] })
];
CASTLE_STYLES.forEach(function(s){ TOWER_STYLES_BY_ID[s.id]=s; });

// ── teachers (captive masters) and castle wardens ──
CH('npc','Castle teachers','tc_sprint','Swift Aldo',['person','wave','#4a9a5a,#2a4a2a,#ffe060,#201810,#e8c0a0,#c8a040','cap,belt,rosy'],'Thornwood Keep (Grasslands island)','A lean courier in green with a feathered cap and winged boots.','Teaches Sprint — run twice as fast for 3 seconds.');
CH('npc','Castle teachers','tc_roll','Tumbler Pia',['person','play','#e07030,#4a3a5a,#ffe060,#201810,#f0c8a0,#6a2a1a','pony,sash,rosy'],'Sunflower Château (Grasslands island)','An acrobat in a bright orange leotard and sash.','Teaches Roll — dash 3 tiles and dodge through danger.');
CH('npc','Castle teachers','tc_whirlwind','Blade-dancer Kestrel',['person','slash','#3a5a8a,#1a2a4a,#c8ccd4,#201810,#e8c0a0,#1a1a1a','long,sword,cape'],'Windmill Bastion (Grasslands island)','A duelist in blue with a long braid and twin blades.','Teaches Whirlwind — spin and strike everything around you.');
CH('npc','Castle teachers','tc_smokebomb','Shade Mistress Nyx',['person','wave','#2a2a3a,#141420,#9a9aa4,#c0a0ff,#d8c0c8,#1a1a2a','hood,sash,book'],'Lotus Water Palace (Wetlands island)','A cloaked spy with violet eyes and a belt of smoke pellets.','Teaches Smoke Bomb — vanish in smoke; enemies lose track of you.');
CH('npc','Castle teachers','tc_shieldbash','Captain Borin',['person','slash','#8a8e96,#3a3a44,#3a6ac8,#201810,#d8a888,#8a5a2a','armor,helmet,beard,shield,sword'],'Drowned Abbey (Wetlands island)','A broad shield-captain in blue-trimmed plate.','Teaches Shield Bash — charge and stun (needs a shield).');
CH('npc','Castle teachers','tc_blink','Seer Ilyana',['person','cast','#6a4ab0,#2a1a5a,#bff6ff,#bff6ff,#f0d8e0,#e8e4dc','wizard,robe,long,staff'],'Mangrove Fort (Wetlands island)','A silver-haired seer in a violet robe, eyes glowing blue.','Teaches Blink — teleport 5 tiles, even through walls.');
CH('npc','Castle teachers','tc_warstomp','Stonefist Grom',['person','hammer','#7a5a3a,#3a2a20,#ffb040,#201810,#c89068,#8a3a1a','dwarf,beard,leather,hammer,bald'],'Dwarven Hold (Highlands island)','A dwarf with stone-grey fists and a red beard.','Teaches War Stomp — a shockwave that stuns everything nearby.');
CH('npc','Castle teachers','tc_secondwind','Healer Maelis',['person','heal','#e8f0f8,#8aa0c0,#80e0a0,#201810,#f0d0c0,#e0c080','hood,robe,potion'],'Glacier Citadel (Highlands island)','A frost-priestess in white and ice-blue.','Teaches Second Wind — instantly restore 30% of your health.');
CH('npc','Castle teachers','tc_berserker','Wild Ulfar',['person','slash','#8a3a2a,#3a2a1a,#e8e0cc,#ff4020,#d8a078,#c8a060','beard,long,leather,axe,big'],'Eyrie Castle (Highlands island)','A wild-haired berserker in a wolf-pelt.','Teaches Berserker — double attack and speed for 5 seconds.');
CH('npc','Castle teachers','tc_phantom','Wraithwalker Seren',['person','cast','#3a3a5a,#1a1a2a,#c0a0ff,#e0d8ff,#c8c0d8,#e8e4ff','hood,robe,lamp'],'Obsidian Bastille (Ashlands island)','A pale walker between worlds carrying a spirit lamp.','Teaches Phantom Veil — pass through enemies, untouchable for 3 seconds.');
CH('npc','Castle teachers','tc_timeslow','Chronomancer Vex',['person','cast','#c8a040,#5a4a20,#9fe8ff,#9fe8ff,#e8c8a0,#2a2a2a','wizard,robe,staff,goggles'],'Ember Sanctum (Ashlands island)','A brass-goggled time-mage in a gold robe covered in clock faces.','Teaches Time Slow — everything around you slows to a crawl.');
CH('npc','Castle teachers','tc_meteor','Starfall Magus Orin',['person','cast','#2a2a6a,#0a0a2a,#ff8040,#ffe060,#d8b090,#e8e4dc','wizard,robe,beard,grey,staff'],'Bone Throne Keep (Ashlands island)','An ancient star-mage in a midnight robe, embers in his beard.','Teaches Meteor Strike — call down a meteor on your target.');
CH('boss','Castle wardens','cw_thorn_knight','The Thorn Knight',['biped','lunge','#4a6a3a,#2a3a20,#e07080,#ff4040','armor,helmet,sword,shield,cape'],'Thornwood Keep','A knight wrapped in living briars.','Charges and slashes; thorns hurt when you hit him up close.');
CH('boss','Castle wardens','cw_sun_baron','Baron Goldcrest',['person','slash','#e0b040,#8a6a20,#fff0a0,#201810,#e8c0a0,#8a5a2a','crown,cape,sword,moustache,big'],'Sunflower Château','A pompous golden baron with a rapier.','Fast rapier combos and a dazzling sun-flash.');
CH('boss','Castle wardens','cw_mill_ogre','The Mill Ogre',['brute','slam','#8a7a5a,#4a3a2a,#c8a060,#ff4020','club,belly,horns'],'Windmill Bastion','A huge ogre who turns the mill by hand.','Heavy slams and thrown grain sacks.');
CH('boss','Castle wardens','cw_lotus_naga','Lotus Naga Queen',['serpent','spit','#40a0a0,#1a5a5a,#f0a0c0,#ffe060','hood,fins'],'Lotus Water Palace','A crowned naga with lotus-pink frills.','Water beams and poison spit from the pools.');
CH('boss','Castle wardens','cw_drowned_abbot','The Drowned Abbot',['caster','cast','#4a6a6a,#1a2a2a,#80e0c0,#c0fff0','hood,book,staff'],'Drowned Abbey','A waterlogged abbot reading from a soaked tome.','Rings of water and summoned drowned monks.');
CH('boss','Castle wardens','cw_mangrove_chief','Mangrove Chieftain',['tree','slam','#5a4228,#3a2a18,#6aa04a,#ffe060','moss'],'Mangrove Fort','A walking mangrove wearing a war-mask.','Root slams and vine pulls.');
CH('boss','Castle wardens','cw_forge_thane','Forge-Thane Bruk',['person','hammer','#6a4a2a,#3a2a1a,#ff9030,#201810,#c89068,#3a2a1a','dwarf,beard,armor,helmet,hammer'],'Dwarven Hold','An armoured dwarf lord with a forge hammer.','Hammer slams that leave burning slag; tough armour.');
CH('boss','Castle wardens','cw_frost_queen','The Frost Queen',['caster','cast','#bfe8ff,#4a7ab0,#ffffff,#2050c0','crown,staff,wings'],'Glacier Citadel','An ice queen with crystalline wings.','Freezing beams and ice walls.');
CH('boss','Castle wardens','cw_roc_lord','Roc Lord Skyrend',['bird','dive','#8a6a4a,#4a3a2a,#e8c040,#ff4020','crest,talons'],'Eyrie Castle','A giant roc wearing a golden crest.','Dives from above and blasts you with wind.');
CH('boss','Castle wardens','cw_obsidian_jailer','The Obsidian Jailer',['construct','slam','#2a2226,#161214,#ff6030,#ff4020','rivets,vents'],'Obsidian Bastille','A black-glass jailer with chain arms.','Chain pulls, slams and reflecting armour.');
CH('boss','Castle wardens','cw_ember_priest','High Priest Ignis',['caster','cast','#b82a1a,#4a0a04,#ffb040,#ffe060','hat,staff,runes'],'Ember Sanctum','A fire priest crowned in flame.','Fire rings, meteors and burning ground.');
CH('boss','Castle wardens','cw_bone_king','The Bone King',['wraith','cast','#e8e0cc,#6a6258,#ff6040,#ff4020','crown,chains'],'Bone Throne Keep','A crowned skeleton-king in chains.','Raises bone minions and hurls cursed skulls.');

// ── the 12 castle islands ──
// kit: engine kit for the warden (one phase); skill: the special taught; en: island monsters (roster ids)
var CASTLE_ISLANDS={
  q1_b:{sec:1,name:'Thornwood Isle',castle:'thornwood_keep',warden:'cw_thorn_knight',teacher:'tc_sprint',skill:'sp_sprint',floors:2,kit:'chase | lunge r=120 m=1.1 cd=2.6 | sweep r=60 arc=2.8 m=1 cd=2.4 | thorns d=2',en:['bramble_wolf','thistle_hog','rose_dryad']},
  q1_c:{sec:1,name:'Sunflower Isle',castle:'sunflower_chateau',warden:'cw_sun_baron',teacher:'tc_roll',skill:'sp_roll',floors:2,kit:'chase s=1.15 | melee n=3 m=0.8 | cloud at=player rad=60 st=blind dur=2 cd=7 | dodge cd=3',en:['bumble_knight','clover_slime','harvest_mantis']},
  q1_d:{sec:1,name:'Millwind Isle',castle:'windmill_bastion',warden:'cw_mill_ogre',teacher:'tc_whirlwind',skill:'sp_whirlwind',floors:2,kit:'lumber | slam r=72 m=1.3 cd=2.8 | lob n=2 rad=30 t=1 col=#d0b880 m=0.9 cd=3.2',en:['hill_gnoll','dung_roller','scarecrow_warden']},
  q2_b:{sec:2,name:'Lotus Isle',castle:'lotus_palace',warden:'cw_lotus_naga',teacher:'tc_smokebomb',skill:'sp_smokebomb',floors:3,kit:'kite range=180 | beam wind=0.9 len=320 w=10 col=#60c0c8 m=1 cd=3 | shoot p=poison n=3 sp=0.25 st=poison t=3 m=0.6 cd=2.4',en:['lily_lurker','glowfrog','heron_knight']},
  q2_c:{sec:2,name:'Abbey Isle',castle:'drowned_abbey',warden:'cw_drowned_abbot',teacher:'tc_shieldbash',skill:'sp_shieldbash',floors:3,kit:'still | ring spd=150 max=230 gap=1 col=#80e0c0 m=0.9 cd=3.2 | summon id=waterlogged_revenant n=2 max=3 cd=10 | shoot p=orb homing=1 spd=150 m=0.6 cd=2.6',en:['waterlogged_revenant','mire_crab','fog_phantom']},
  q2_d:{sec:2,name:'Mangrove Isle',castle:'mangrove_fort',warden:'cw_mangrove_chief',teacher:'tc_blink',skill:'sp_blink',floors:3,kit:'lumber | slam r=70 m=1.2 cd=3 | pull r=180 keep=30 m=0.5 cd=4 | regen r=0.6',en:['mangrove_strangler','reed_stalker','bloodgnats']},
  q3_b:{sec:3,name:'Anvil Isle',castle:'dwarven_hold',warden:'cw_forge_thane',teacher:'tc_warstomp',skill:'sp_war_stomp',floors:3,kit:'chase | slam r=70 zone=burn zt=3 m=1.3 cd=2.8 | melee n=2 m=1 | armor n=4 red=0.6',en:['dwarf_axeman','automaton_miner','crystal_golemling']},
  q3_c:{sec:3,name:'Glacier Isle',castle:'glacier_citadel',warden:'cw_frost_queen',teacher:'tc_secondwind',skill:'sp_secondwind',floors:3,kit:'kite range=190 | beam wind=0.8 len=320 w=10 col=#bfe8ff st=freeze t=1 m=1 cd=3 | wall dur=5 col=#c0e8ff cd=7 | shoot p=ice n=3 sp=0.2 spd=250 st=slow v=0.3 t=2 m=0.6 cd=2.4',en:['frost_wolf','frost_ghoul','icicle_bats']},
  q3_d:{sec:3,name:'Eyrie Isle',castle:'eyrie_castle',warden:'cw_roc_lord',teacher:'tc_berserker',skill:'sp_berserker',floors:3,kit:'orbit r=150 | lunge r=180 spd=560 m=1.2 cd=2.6 fly=1 | gust r=200 dist=120 m=0.4 cd=4',en:['gale_roc','cliff_harpy','crag_ram']},
  q4_b:{sec:4,name:'Obsidian Isle',castle:'obsidian_bastille',warden:'cw_obsidian_jailer',teacher:'tc_phantom',skill:'sp_phantom',floors:4,kit:'lumber | pull r=200 keep=30 m=0.5 cd=3.6 | slam r=72 m=1.4 cd=3 | reflect | armor n=4 red=0.6',en:['obsidian_stalker','chain_warden','basalt_golem']},
  q4_c:{sec:4,name:'Cinder Isle',castle:'ember_sanctum',warden:'cw_ember_priest',teacher:'tc_timeslow',skill:'sp_timeslow',floors:4,kit:'kite range=190 | ring spd=160 max=230 gap=1 col=#ff7030 st=burn m=1 cd=3 | marks n=5 rad=26 delay=1.2 spread=160 col=#ff8040 zone=burn m=1 cd=4',en:['pyre_cultist','cinder_hounds','salamander_warrior']},
  q4_d:{sec:4,name:'Bonefall Isle',castle:'bone_throne_keep',warden:'cw_bone_king',teacher:'tc_meteor',skill:'sp_meteor',floors:4,kit:'drift keep=150 | summon id=charred_zombies n=2 max=4 cd=9 | shoot p=bone n=3 sp=0.25 homing=1 spd=170 m=0.7 cd=2.4 | revive t=4',en:['bone_revenant','charred_zombies','bonepit_ghoul']}
};
var CASTLE_BY_SKILL={}; Object.keys(CASTLE_ISLANDS).forEach(function(k){ var C=CASTLE_ISLANDS[k]; C.key=k; CASTLE_BY_SKILL[C.skill]=k; });
