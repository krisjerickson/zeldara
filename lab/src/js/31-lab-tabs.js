// Lab tabs for the shared tower/cavern builders (src/js/07b, 07c).
LAB_TABS.push({
  id:'towers', name:'Towers',
  regionLabel:'Use this look for which tower?',
  blurb:'<b>10 tower looks</b>, all light, white and blue with windows and glass (Rivendell × Hyrule Castle), each on a house-style floor plan: mostly rooms, short halls, furniture to walk around. No monsters. Mark <b>Pick / Maybe / No</b>, and tag the tower(s) each look should be used for (you chose one look per tower).',
  designs:TOWER_STYLES.map(function(S){ return { id:S.id, name:S.name, tagline:S.tagline, blurb:S.blurb, facts:S.facts, seed:S.seed, build:function(seed){ return buildTower(S,S.plan,seed); } }; })
});

LAB_TABS.push({
  id:'dungeons', name:'Dungeons', regionLabel:'Best suited to which region?',
  blurb:'<b>10 Open Cavern layouts</b> for the new second dungeon type: wide open floors with obstacles to walk around. You chose a 50/50 mix with the classic rooms-and-corridors dungeons. The dark and your torch light preview dungeon lighting (idea H14). <span class="ring"></span> rings mark monster spawns (about 2× a classic floor). The red portal is where the guardian would stand. Tag regions if a layout fits one best.',
  designs:DUNGEON_DESIGNS.map(function(D){ return { id:D.id, name:D.name, tagline:D.tagline, blurb:D.blurb, seed:D.seed,
    facts:null, build:function(seed){ var m=buildCavern(D,seed); this.facts=['About <b>'+m.stats.spawns+'</b> monster spawns (classic floors have 7–15)','Walkable area: '+m.stats.open+' tiles']; return m; } }; })
});
LAB_TABS.push({ id:'world', name:'World', lazy:true, groups:LAB_REGIONS.map(function(R){return {k:R.k,n:R.n};}),
  blurb:'<b>World quadrants</b>: 10 walkable designs per quadrant (60 × 60 tiles each). You chose to <b>pick 2–3 per quadrant</b>; they become sub-zones blended with soft borders, so no two parts of a region look alike. Runes pulse and brighten as you walk near; ley lines link landmarks. Press <b>N</b> for night, <b>Tab</b> near a landmark for its story.',
  empty:'Loading…', designs:[] });
LAB_TABS.push({ id:'sprites', name:'Sprites', blurb:'<b>Sprite gallery</b>: 5 options per character, matched to your hero.', empty:'Starting with the pilot: 6 characters × 5 options. The prompts and style guide are ready. Once you save the generated images into <code>sprites/incoming/</code>, they show up here to pick from.', designs:[] });

// Island castles (src/js/07t-castles.js) — 12 looks, 3 per quadrant, already chosen and in the game.
LAB_TABS.push({ id:'castles', name:'Castles', groups:[1,2,3,4].map(function(q){ return {k:q,n:WM_REGION_NAMES[q]}; }),
  blurb:'<b>12 island castles, revamped</b> — dark stone keeps lit by torches, braziers and stained glass, no longer like the towers. Every floor has its own castle plan: <b>gatehouse</b> (barracks, armoury, statue hall), <b>great hall</b> (feast tables, a hearth you could stand in, banners), <b>round chapel</b> (rose window, mosaic, saints, crypt) and the <b>throne room</b> (dais, royal carpet, lines of knights\' armour) where the warden waits. Each castle keeps its own colours and heraldry. <b>Mark any floor you want changed.</b> (The game adds darkness and torchlight on top of what you see here.)',
  designs:(function(){ var L=[]; CASTLE_STYLES.forEach(function(S){ var C=CASTLE_ISLANDS[Object.keys(CASTLE_ISLANDS).find(function(k){ return CASTLE_ISLANDS[k].castle===S.id; })], W=C&&CHAR_BY_ID[C.warden], T=C&&CHAR_BY_ID[C.teacher], FP=S.floorPlans?S.floorPlans(C?C.floors:3):[S.plan];
    FP.forEach(function(plan,fi){ var last=fi===FP.length-1; L.push({ id:S.id+'__'+fi, name:S.name+' · floor '+(fi+1)+' — '+TOWER_PLANS[plan].name.replace(/ \(.*$/,''), group:S.q, tagline:S.tagline, blurb:S.blurb+' <b>This floor:</b> '+TOWER_PLANS[plan].name+'.', seed:S.seed+fi*17,
      facts:(S.facts||[]).concat(C?['Island: '+C.name+' · '+C.floors+' floors'+(last?' · the warden waits here':''),'Warden: '+(W?W.name:'?'),'Captive: '+(T?T.name+' — '+T.doing.split(' — ')[0].toLowerCase():'?')]:[]),
      build:function(seed){ return buildTower(S,plan,seed,{last:last}); } }); }); }); return L; })() });

// Boss arenas (src/js/07u-boss-arenas.js) — where phases 2+ of the ★ guardians are fought.
LAB_TABS.push({ id:'arenas', name:'Boss Arenas',
  blurb:'<b>20 boss arenas</b> for the multi-phase ★ guardians: phase 1 is fought on the site\'s top floor, every later phase moves to one of these (with its own hazards and events). Already in the game — mark any you want changed.',
  designs:Object.keys(BOSS_ARENAS).map(function(k){ var D=BOSS_ARENAS[k]; return { id:k, name:D.name, tagline:D.tagline, blurb:D.blurb, seed:D.seed, facts:null,
    build:function(seed){ return buildCavern(D,seed); } }; }) });

// Village interiors (src/js/07v-interiors.js) — every building, painted in the tower style.
LAB_TABS.push({ id:'interiors', name:'Interiors',
  blurb:'<b>12 village interiors</b>, repainted in the same lit style as the towers. Each room is themed to its building and keeper (the bar and kegs for Rolf, the forge hearth for Garrick, cauldron and potion shelves for Morwen…). Already in the game — mark any you want changed.',
  designs:INTERIOR_TYPES.map(function(t,i){ var T=INTERIOR_THEMES[t]; return { id:t, name:T.name, tagline:T.blurb.split('.')[0], blurb:T.blurb, seed:100+i, facts:['Walls: '+T.wall+' · floor: '+T.floor,'Keeper: '+(T.npc&&typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[T.npc]?CHAR_BY_ID[T.npc].name:'—')],
    build:function(){ return buildInterior(t); } }; }) });
