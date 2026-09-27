// Fill the World tab with the 40 quadrant designs (35–38 files).
(function(){
  var t=LAB_TABS.find(function(x){return x.id==='world';}); if(!t)return;
  t.designs=WORLD_DESIGNS.slice().sort(function(a,b){return a.quad-b.quad;}).map(function(Z){
    return { id:Z.id, name:Z.name, tagline:Z.tagline, blurb:Z.blurb, seed:Z.seed, group:Z.quad, facts:null,
      build:function(seed){ var m=buildWorld(Z,seed); this.facts=['Landmark + '+m.stats.runes+' rune lights · '+m.stats.props+' props','Walkable: '+m.stats.open+' of 3600 tiles']; return m; } };
  });
})();
