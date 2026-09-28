// ═══════════════════════════════════════════════════════════════════════
// ║ VILLAGE tab — four looks for the home village, each shown at its five
// ║ growth stages (the village grows as each craftsman is freed).
// ═══════════════════════════════════════════════════════════════════════
(function(){
  var at=LAB_TABS.findIndex(function(t){return t.id==='map';});
  var tab={ id:'village', name:'Village', lazy:true,
    groups:[{k:0,n:'Your village (Runestone+)'}].concat(VILLAGE_STYLES.map(function(S,i){ return {k:i+1,n:S.name}; })),
    blurb:'<b>Pick a look for the home village.</b> Four styles, each shown at its <b>five growth stages</b>: the village grows every time you free a craftsman — Bram paves the streets and bridges the creek, Mira adds her workshop, windmill and street lamps, Dunn his forge hall and a statue, and Vela a sky dock with banners and festival lights. Mark the style you like with <b>Pick</b> (any stage card) and add notes, e.g. mixing parts of two styles.',
    designs:[] };
  for(var st0=1;st0<=5;st0++)(function(st){ var pl=villagePlan(st);
    tab.designs.push({ id:'runestone_plus_'+st, name:'Runestone Hamlet+ — '+['I','II','III','IV','V'][st-1], group:0, tagline:'Stage '+st+': '+VILLAGE_STAGES[st-1]+' · '+pl.houses+' buildings',
      blurb:'<b>Your pick</b>: the Runestone Hamlet with houses, carts, windmills, walls & turrets, lanterns, chimney smoke, fountains, harbour-stone streets and vegetable gardens from the other villages. It grows outward (radius '+pl.R+' tiles) and gets denser: <b>'+pl.houses+'</b> buildings at this stage (13 → 44).', seed:900+st, facts:null,
      build:function(seed){ var m=buildWorld(villagePlusDesign(st),seed); this.facts=[pl.houses+' buildings · '+m.stats.props+' props · '+m.stats.runes+' rune lights']; return m; } });
  })(st0);
  VILLAGE_STYLES.forEach(function(S,i){ for(var st=1;st<=5;st++)(function(st){
    tab.designs.push({ id:S.id+'_'+st, name:S.name+' — '+['I','II','III','IV','V'][st-1], group:i+1,
      tagline:'Stage '+st+': '+VILLAGE_STAGES[st-1], blurb:S.blurb+'<br><br><b>Stage '+st+'</b> — '+VILLAGE_STAGES[st-1]+'.', seed:500+i*10+st, facts:null,
      build:function(seed){ var m=buildWorld(villageDesign(S,st),seed); this.facts=[m.stats.props+' buildings & props · '+m.stats.runes+' rune lights']; return m; } });
  })(st); });
  LAB_TABS.splice(at>=0?at+1:LAB_TABS.length,0,tab);
})();
