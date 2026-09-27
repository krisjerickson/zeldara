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
