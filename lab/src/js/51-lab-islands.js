// Round 6: Ember Cave (the Highlands familiar island's dungeon, src/js/07cb-ember-caves.js)
LAB_TABS.push({ id:'embercave', name:'Ember Cave',
  blurb:'<b>Ember Cave, rebuilt.</b> The old side-view cave is gone; the Highlands familiar island\'s adventure is now a normal <b>4-floor island dungeon</b> (Lava Colossus on the last floor, gives the Earth familiar). <b>Pick one</b> of these three looks — until you do, the game uses <i>Magma Rivers</i>. Lava is solid (you walk the bridges); red rings mark monster spawns.',
  designs:EMBER_CAVE_DESIGNS.map(function(D){ return { id:D.id, name:D.name, tagline:D.tagline, blurb:D.blurb, seed:D.seed, facts:null,
    build:function(seed){ var m=buildCavern(D,seed); this.facts=['About <b>'+m.stats.spawns+'</b> monster spawns per floor','Walkable area: '+m.stats.open+' tiles','Used for: 🦇 Ember Cave (Highlands familiar island) · 4 floors']; return m; } }; }) });

// Round 6: the 16 harbor islands on the overworld pipeline (src/js/07jb-island-designs.js)
LAB_TABS.push({ id:'islands', name:'Islands', groups:[1,2,3,4].map(function(q){ return {k:q,n:WM_REGION_NAMES[q]}; }),
  regionLabel:'Use this look for which island?',
  regionList:[1,2,3,4].reduce(function(L,q){ return L.concat(['a','b','c','d'].map(function(h){ var nm=h==='a'?ISL_FAM_NAMES[q]+' (familiar)':((typeof CASTLE_ISLANDS!=='undefined'&&CASTLE_ISLANDS['q'+q+'_'+h])||{}).name||('Castle isle '+h); return {k:q+h,n:nm}; })); },[]),
  blurb:'<b>16 harbor islands, rebuilt with the overworld\'s look</b> — same terrain painter, props, runes, day and night as the mainland. <b>4 looks per quadrant</b>; tag which island(s) each look is for (a = the familiar island, b/c/d = the castle islands). Every island has the dock (south), the village with the trader and healing well, a waystone, two monster camps (west and east) and the adventure entrance up north. Walk it with WASD; press N for night.',
  designs:ISLAND_DESIGNS.map(function(Z){ return { id:Z.id, name:Z.name, tagline:Z.tagline, blurb:Z.blurb, seed:Z.seed, group:Z.quad, facts:null,
    build:function(seed){ var m=buildWorld(Z,seed); this.facts=['Used by default for: '+Object.keys(ISLAND_PICK).filter(function(k){ return ISLAND_PICK[k]===Z.id; }).join(', '),'Walkable: '+m.stats.open+' tiles · '+m.stats.props+' props']; return m; } }; }) });
