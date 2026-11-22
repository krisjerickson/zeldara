// ═══════════════════════════════════════════════════════════════════════
// ║ 79x3-lab-worldlook3.js — round 128: THE WORLD, REVAMPED — TAKE 3 (Kris: "the world revamped feedbacks are in, as well as the image
// ║ requests. Let's still update into a take 3 for this … before we put into the game"). Every option on real painted screenshots, now
// ║ with the r127 paintings (tools/world/world_looks3.py → lab/preview/worldlook3, served from the asset store through R128A).
// ║ Picks: 'worldlook3-<id>' {verdict pick|maybe|cut, regions:[the variant chosen], notes}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var I=function(n){ var p='preview/worldlook3/'+n+'.jpg'; return (typeof R128A!=='undefined'&&R128A[p])||p; };
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; };
  // id, title, your take-2 note, what changed, [[image, caption, variant id or '']]
  var O=[
   ['landmarks','Landmarks, painted','"we should order these, but i still need to see it first before we add in"','The six landmark paintings came in. Each is shown where it stands in the world, at the game\'s scale, with the hero and monsters still in front.',
     [['lm_bram_bridge_a','Today — the Silverrun',''],['lm_bram_bridge_b','Bram\'s bridge over the Silverrun','bram'],['lm_mira_lift_b','Mira\'s lift up the Scarp','mira'],['lm_dunn_bridge_b','Dunn\'s iron bridge over the chasm','dunn'],['lm_vela_pass_b','Vela\'s pass through the Ember Wall','vela'],['lm_world_tree_b','The World Tree stone on the Green','tree'],['lm_great_scar_b','The edge of the Great Scar','scar']],'many'],
   ['vistas','Vistas, painted','"we should order these, but i still need to see it first before we add in"','The four vista paintings came in. Standing at the spot, the camera eases up and the far view rises above the play field (middle), then holds (right).',
     [['vista_silverrun_a','Today — the Waystone Road\'s bend',''],['vista_silverrun_c','Easing into the Silverrun valley',''],['vista_silverrun_b','The Silverrun valley','silverrun'],['vista_scar_c','Easing into the Great Scar',''],['vista_scar_b','The Great Scar','scar'],['vista_ember_b','The Ember Wall','ember'],['vista_lilies_b','The lily lakes','lilies']],'many'],
   ['sites','Grand site exteriors, painted','✓ "try this out, but don\'t put in yet"','The eight exteriors came in. Silverwood Palace is shown at its own door; all eight together below it.',
     [['sites_a','Today — Silverwood Palace',''],['sites_b','Its new exterior',''],['sites_all','All eight exteriors','']],''],
   ['frames','Flourish frames for cinematic moments','"we should order these, but i still need to see it first before we add in"','The four frames came in, shown over a framed moment on the Green. Pick the one (or ones) you like.',
     [['frame_a','Today — no frame',''],['frame_tapestry','The tapestry','tapestry'],['frame_stage','The puppet stage','stage'],['frame_saga','The illuminated saga','saga'],['frame_runestone','The runestones','runestone']],'many'],
   ['aurora_water','The aurora in the water — four ways','"i like the aurora reflecting in the water! but it looks a little odd as is currently, come up with a few more proposals"','Four new ways, all on the river at night: a soft sheen (no shapes), broken ripples of light, the painted reflection laid on the water as light, and the band in the sky mirrored in the water.',
     [['auw_a','Today — the river at night',''],['auw_soft','1 · A soft sheen','soft'],['auw_ripple','2 · Ripples of light','ripple'],['auw_painted','3 · The painted reflection','painted'],['auw_skymirror','4 · Sky and water together','skymirror']],'one'],
   ['aurora_more','The aurora crown and the sky band, painted','✓ crown · ✓ vista','The painted crown over the Green and the band across the sky.',
     [['auc_a','Today — the Green at night',''],['auc_b','The crown of light over the Green',''],['aub_a','Today — the Grasslands at night',''],['aub_b','The aurora band in the sky','']],''],
   ['night','Night, keeping the light around everyone','"the main thing that needs to be kept from today is the light around the hero and other NPCs and monsters"','Today\'s pools of light around the hero, the villagers, the monsters and the lanterns are kept exactly; outside them the night is moonlit rather than black. The third picture adds a faint moon-rim to everyone.',
     [['night_village_a','Today — the village',''],['night_village_b','Moonlit, today\'s light kept','b'],['night_village_c','… and a moon-rim on everyone','c'],['night_field_a','Today — a field with monsters',''],['night_field_b','Moonlit, today\'s light kept','b'],['night_field_c','… and a moon-rim','c'],['night_wet_a','Today — the Wetlands',''],['night_wet_b','Moonlit, today\'s light kept','b']],'one'],
   ['shadow','Shadows by height, touching the ground','"remade this proposal considering heights and geometry … some objects that are touching the ground, like a waypoint, don\'t have the shadow touching the ground … We might need to just take this out"','Remade by geometry: flat things (puddles, rugs, stepping stones — wider than tall and low) get no shadow; standing things get one that starts exactly where they touch the ground. Two ways: (b) only a soft contact shadow under each standing thing; (c) the contact shadow and a cast shadow whose length follows the thing\'s height. Or ✕ to leave shadows out.',
     [['shadow_village_a','Today — the village',''],['shadow_village_b','Contact shadows only','contact'],['shadow_village_c','Contact + cast by height','cast'],['shadow_grass_a','Today — the Grasslands',''],['shadow_grass_b','Contact only','contact'],['shadow_grass_c','Contact + cast','cast'],['shadow_field_b','A field — contact only','contact'],['shadow_field_c','A field — contact + cast','cast']],'one'],
   ['water','Water, with the painted pieces','✓','Lilies, glints, fish rings, ducks on the water; reeds, driftwood, a heron and a rock in the current on the shore — the new paintings.',
     [['water_a','Today',''],['water_b','With the painted water pieces','']],''],
   ['ground','The ground, with the painted pieces','✓','A few new painted pieces on open ground — moss, clover, pebbles, white flowers, mushrooms, a fern, twigs — not littered.',
     [['ground_grass_a','Today — the Grasslands',''],['ground_grass_b','With the painted ground pieces',''],['ground_village_a','Today — the village',''],['ground_village_b','With the painted pieces','']],''],
   ['air','The air of each realm, painted','✓','Painted motes: pollen and seeds in the Grasslands, mist and spores in the Wetlands, embers and ash in the Ashlands (fewer in a fight, as you asked).',
     [['air_grass_a','Today — the Grasslands',''],['air_grass_b','Pollen, seeds, fireflies',''],['air_ash_a','Today — the Ashlands',''],['air_ash_b','Embers, ash, sparks',''],['air_wet_b','The Wetlands — mist and spores','']],''],
   ['lights','Pools of light at night','(ordered in round 127)','The painted light pools came out as solid discs with rims, not soft light (see the third picture). Proposal: let the game draw them as soft light under each lantern and window (the middle picture) — free, and exactly the right shape. The paintings are not used.',
     [['lights_a','Today — the village at night',''],['lights_b','Drawn by the game as soft light','drawn'],['lights_c','The painted pools as they came','painted']],'one']];
  var card=function(o){ var k='worldlook3-'+o[0], p=P(k), v=p.verdict||'', ch=p.regions||[], mode=o[5];
    var h='<div class="w3-o'+(v?' v-'+v:'')+'" id="w3-'+o[0]+'"><div class="w3-h"><h4>'+esc(o[1])+'</h4></div><p class="w3-q"><b>Your note on take 2:</b> '+esc(o[2])+'</p><p class="w3-t">'+esc(o[3])+'</p><div class="w3-g">'+
      o[4].map(function(x){ var on=x[2]&&ch.indexOf(x[2])>=0, sel=!!(x[2]&&mode);
        return '<figure class="w3-f'+(on?' on':'')+(sel?' sel':'')+'"'+(sel?' data-k="'+k+'" data-c="'+x[2]+'" data-m="'+mode+'"':'')+'><img src="'+I(x[0])+'" alt="" loading="lazy"><figcaption>'+(sel?(on?'✓ ':'○ '):'')+esc(x[1])+'</figcaption></figure>'; }).join('')+'</div>'+
      (mode?'<p class="w3-hint">'+(mode==='one'?'Click the picture you want.':'Click every one you want in the game.')+'</p>':'')+
      '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Put it in'],['maybe','? Another take'],['cut','✕ Leave it out']].map(function(b){ return '<button class="vbtn wl-sg w3-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(p.notes||'')+'" placeholder="Your note on '+esc(o[1].toLowerCase())+'…"></div>'; return h; };
  LAB_TABS.push({ id:'worldlook3', name:'The world, revamped 3',
    blurb:'<b>Round 128 — take 3.</b> Your take-2 notes, answered, on real painted screenshots — and the paintings you ordered are in: landmarks, vistas, site exteriors, flourish frames, the aurora, water, ground and air pieces. The aurora in the water has four new ways, night keeps today\'s light around everyone, and shadows are remade by height and touching the ground. Your take-2 ✓ for the colour grade and the dusk light stand; they go in with the rest once you are happy here.',
    designs:O.map(function(o){ return {id:o[0],name:'World 3: '+o[1]}; }),
    render:function(){ return O.map(card).join('')+'<textarea class="wl-n wl-all" data-k="worldlook3-all" placeholder="Anything about the world as a whole…">'+esc(P('worldlook3-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'worldlook3',label:'🗺 The world, revamped 3: see the new paintings in the game and choose what goes in',where:'The world, revamped 3 tab',
    done:function(){ return O.every(function(o){ return !!P('worldlook3-'+o[0]).verdict; }); },go:function(){ LTODO.goTo('worldlook3','.w3-o',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('worldlook3')<0)LAB_ACTIVE.unshift('worldlook3');
  document.addEventListener('click',function(e){ var f=e.target.closest&&e.target.closest('.w3-f.sel'); if(f){ var k=f.dataset.k, c=f.dataset.c, p=LabApp.picks[k]=LabApp.picks[k]||{}, R=(p.regions||[]).slice(), j=R.indexOf(c);
      if(f.dataset.m==='one')R=j>=0?[]:[c]; else { if(j>=0)R.splice(j,1); else R.push(c); }
      p.regions=R; if(R.length&&!p.verdict)p.verdict='pick'; LabApp.persist(k);
      var box=f.closest('.w3-o'); [].forEach.call(box.querySelectorAll('.w3-f.sel'),function(x){ var on=R.indexOf(x.dataset.c)>=0; x.classList.toggle('on',on); var fc=x.querySelector('figcaption'); fc.textContent=(on?'✓ ':'○ ')+fc.textContent.replace(/^[✓○] /,''); });
      if(p.verdict){ box.className='w3-o v-'+p.verdict; [].forEach.call(box.querySelectorAll('.wl-sg'),function(b){ b.className='vbtn wl-sg'+(b.dataset.v===p.verdict?' on '+p.verdict:''); }); } return; }
    var b=e.target.closest&&e.target.closest('.w3-o .wl-sg'); if(b){ var o=b.closest('.w3-o'); setTimeout(function(){ var p=LabApp.picks[b.parentNode.dataset.k]||{}; o.className='w3-o'+(p.verdict?' v-'+p.verdict:''); },0); } });
  var st=document.createElement('style'); st.textContent='.w3-o{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px 12px;margin:0 0 14px}.w3-o.v-pick{border-color:#3f7a52}.w3-o.v-cut{opacity:.65}.w3-h h4{margin:0 0 4px;color:#ffe9a8;font:600 17px Georgia,serif}'+
    '.w3-q{font:12.5px/1.5 "Segoe UI";color:#ffd7a8;margin:0 0 4px}.w3-t{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:0 0 8px}.w3-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px}.w3-f{margin:0;background:#101a28;border:2px solid #243246;border-radius:8px;overflow:hidden}'+
    '.w3-f img{width:100%;display:block;aspect-ratio:16/9;object-fit:cover}.w3-f figcaption{font:12px "Segoe UI";color:#b8c6d8;padding:4px 8px}.w3-f.sel{cursor:pointer}.w3-f.sel:hover{border-color:#5a7a9a}.w3-f.on{border-color:#8fe8a0}.w3-f.on figcaption{color:#e8fff0}.w3-hint{font:12px "Segoe UI";color:#7f90a8;margin:4px 0}';
  document.head.appendChild(st);
})();
