// ═══════════════════════════════════════════════════════════════════════
// ║ 79x2-lab-worldlook2.js — round 127: THE WORLD, REVAMPED — round two (Kris's picks on all fifteen: "None of it should be implemented yet,
// ║ as all of it has comments that needs to be addressed. Address all of these, also give me sheets to order so we can get visuals of these
// ║ before we choose … the current images for 'today' and 'proposed' do not have the sprites in them and don't look like the game!").
// ║ Every picture is now the real game, painted (tools/world/world_shots.py), and the mock-ups change only the layer each idea touches
// ║ (tools/world/world_looks2.py). Each option: Kris's note, what changed, today ↔ proposed, the paintings ordered for it (07zt20, r127_world).
// ║ Picks: 'worldlook2-<id>' ✓ / ? / ✕ + note; the sprite lab: 'worldlook2-spr' {regions:[variant]}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var I=function(n){ return 'preview/worldlook2/'+n+'.jpg'; };
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var Q=function(k){ try{ return (LabApp.picks['worldlook-'+k]||{}).notes||''; }catch(e){ return ''; } };
  // [today, proposed, caption]
  var O=[
   {g:'Light and colour',id:'grade',name:'Realm colour grades — three-quarters strength, ground only',was:'grade',
    did:'Now at 75 % of round 124\'s strength. It touches only the natural ground (grass, earth, moss, sand) — every sprite, building, tree and painted piece (the rune circles, laid stone) keeps exactly its own colour. The second lab Kris asked for, adjusting the sprites themselves over the new ground, is just below.',
    cmp:[['grade_grass_a','grade_grass_b','Grasslands'],['grade_village_a','grade_village_b','The village'],['grade_wet_a','grade_wet_b','Wetlands'],['grade_high_a','grade_high_b','Highlands'],['grade_ash_a','grade_ash_b','Ashlands']],art:'none (code)'},
   {g:'Light and colour',id:'shadow',name:'Painted shadows — from each sprite\'s own shape',was:'shadow',
    did:'Each painted sprite is checked: if its painting already carries a shadow (most trees, bushes and the characters do — the ground under them is the same colour, only darker), it is left alone. The rest — waystones, obelisks, signs, plants, rocks, buildings without one — cast a shadow from their own painted outline, flattened away from a sun at the upper left. In these shots: Grasslands 15 cast, 9 already shaded; the village 8 cast; a field 17 cast, 4 already shaded.',
    cmp:[['shadow_grass_a','shadow_grass_b','Grasslands'],['shadow_village_a','shadow_village_b','The village'],['shadow_field_a','shadow_field_b','A field with monsters']],art:'none (code)'},
   {g:'Light and colour',id:'dusk',name:'Golden hour — much more subtle',was:'dusk',
    did:'Two strengths, both gentler than round 124: a breath of warm light from a low sun on the left, the far side a little cooler. The sprites take only half of the tint, so they keep their own colours.',
    cmp:[['dusk_village_a','dusk_village_soft','Soft (45 %) — the village'],['dusk_village_a','dusk_village_more','A little more (70 %) — the village'],['dusk_grass_a','dusk_grass_soft','Soft — Grasslands']],art:'none (code)'},
   {g:'Light and colour',id:'night',name:'Night of lanterns and runes — toned down, sprites clear',was:'night',
    did:'"Today" is the game\'s own night. Proposed sits between: a moonlit blue, not black; the light the game already lets through kept; lanterns and lit windows glow warm, runes glow blue; and the hero, villagers and monsters stay clear and readable with a faint moon-rim.',
    cmp:[['night_village_a','night_village_b','The village'],['night_grass_a','night_grass_b','Grasslands'],['night_wet_a','night_wet_b','Wetlands']],art:'light pools (sc_wl_lights, 1 sheet)'},
   {g:'Light and colour',id:'aurora_water',name:'The aurora, re-proposed: (a) only in the water',was:'aurora',
    did:'The aurora is in the sky, which you never see — so it shows only where the sky would: reflected in lakes and rivers on clear nights, a slow wavering green and violet.',
    cmp:[['aurora_water_a','aurora_water_b','A river at night']],art:'aurora pieces (sc_wl_aurora)'},
   {g:'Light and colour',id:'aurora_ribbon',name:'The aurora, re-proposed: (b) a faint ribbon over the land',was:'aurora',
    did:'One narrow, faint ribbon of its light drifting slowly over the ground at night — once in a while, not a wash over the screen.',
    cmp:[['aurora_ground_a','aurora_ground_b','Grasslands at night']],art:'aurora pieces (sc_wl_aurora)'},
   {g:'Light and colour',id:'aurora_crown',name:'The aurora, re-proposed: (c) a crown over the Green on festival nights',was:'aurora',
    did:'Only on festival nights and after a spirit is freed: a crown of aurora light rises over the Runestone Green. A rare moment, tied to the story.',
    cmp:[['aurora_green_a','aurora_green_b','The Runestone Green at night']],art:'aurora pieces (sc_wl_aurora)'},
   {g:'Light and colour',id:'aurora_vista',name:'The aurora, re-proposed: (d) in the sky of the vistas',was:'aurora',
    did:'Where the world does show the sky — the vista moments below — the night vistas carry the aurora, painted.',cmp:[],art:'the Lantern Lilies vista (sc_wl_vista_lilies) and the sky band (sc_wl_aurora)'},
   {g:'Air',id:'air',name:'Living air — in gusts, and thin in a fight',was:'air',
    did:'Most of the time only a few motes drift (calm). Every 25–40 s a gust passes for 6–10 s and the air fills, then thins again. In a fight it falls to a quarter, and it never crosses a boss\'s attack telegraphs. Each realm its own: pollen and fireflies, mist and wisps, snow glitter, embers and ash.',
    cmp:[['air_grass_a','air_grass_calm','Calm — between gusts'],['air_grass_a','air_grass_gust','A gust passing'],['air_field_a','air_field_fight','In a fight — a quarter as much'],['air_ash_a','air_ash_gust','Ashlands — a gust of embers']],art:'the realms\' air (sc_wl_air, 1 sheet)'},
   {g:'Water and ground',id:'water',name:'Deep, living water — with the painted pieces',was:'water',
    did:'Tried with the game\'s own painted pieces: lily pads and lilies on the water, foam at a rock, a fish, reeds and cattails along the shore. A sheet of new water pieces is ordered (lilies in flower, stepping stones, small falls, a heron, ducks) so the next round can show more.',
    cmp:[['water_a','water_b','The Silverrun by Lakeside Bridge']],art:'water pieces (sc_wl_water, 1 sheet)'},
   {g:'Water and ground',id:'ground',name:'Richer ground — rebalanced',was:'ground',
    did:'You are right that the ground already has painted plants and edge pieces — they are in "today". This only adds a few soft patches of moss, clover, pebbles and wildflowers, about one per third of a screen, on open grass, never on paths or under things. A sheet of new small pieces is ordered for variety.',
    cmp:[['ground_grass_a','ground_grass_b','Grasslands'],['ground_village_a','ground_village_b','The village']],art:'ground pieces (sc_wl_ground, 1 sheet)'},
   {g:'Places and set-pieces',id:'landmark',name:'Landmarks from the cut-scenes — paintings ordered',was:'landmark',
    did:'No mock-up this time: the six landmarks are ordered as paintings (Bram\'s bridge, Mira\'s lift, Dunn\'s iron bridge, Vela\'s pass, the World Tree stone, the edge of the Great Scar), so the next Lab can show them in the world before anything goes in.',cmp:[['water_a','water_a','Today: Lakeside Bridge, where Bram\'s bridge would stand']],art:'3 sheets (sc_wl_landmarks_1–3)'},
   {g:'Places and set-pieces',id:'vista',name:'Vista moments — new paintings to match the land',was:'vista',
    did:'Four vistas ordered, each painted from the spot you stand on, so its foreground matches the ground there and the camera can ease from play into it: the Silverrun valley, the Great Scar, the Ember Wall, the Lantern Lilies at night.',cmp:[['air_grass_a','air_grass_a','Today: by the Firefly River — one of the spots']],art:'4 paintings (sc_wl_vista_*)'},
   {g:'Places and set-pieces',id:'sites',name:'Adventure sites worthy of their stories — tried out, not in',was:'sites',
    did:'"Today" now shows the painted exterior the game really has. The try-out uses the game\'s own painted banners and a beam of light from a site you have not yet conquered. Grand exteriors for the eight boss sites are ordered.',
    cmp:[['sites_a','sites_b','Silverwood Palace']],art:'2 sheets (sc_wl_sites_1–2)'},
   {g:'Places and set-pieces',id:'cine',name:'Cinematic moments in play — framed, with flourish frames',was:'cine',
    did:'The camera eases in to frame the moment well (the subject on a third, the letterbox in). Four flourish-frame designs are ordered, after the 2026 Ocarina of Time remake\'s ornate, puppet-show look and its tapestry-framed opening: a woven tapestry border, a carved puppet-stage arch with a drawn-back curtain, illuminated saga corners, and four glowing runestones. They would frame only a few moments: arriving at a landmark, a spirit freed, a site conquered.',
    cmp:[['cine_a','cine_b','Framing the Green (the frame painting comes next)']],art:'4 frames (sc_wl_frame_*)'}];
  var DROP=[['clouds','Cloud shadows and sun shafts','"since you can\'t see the sky, this would get too confusing on why the ground is changing colors" — dropped.'],
    ['depth','Painterly depth','dropped.'],['restore','The land remembers','"this already exists in the game" — the rune lines painted as spirits are freed; dropped.']];
  var SPR=[['a','As painted (no change)'],['b','A touch richer (+12 % colour, +6 % contrast)'],['c','The realm\'s light falls on them (a slight split tone)'],['d','A soft dark rim, so they read on any ground']];
  var cmp=function(c){ var same=c[0]===c[1]; return '<figure class="w2-f"><div class="wl-cmp">'+(same?'<img src="'+I(c[0])+'" alt="">':'<img src="'+I(c[1])+'" alt=""><div class="wl-top"><img src="'+I(c[0])+'" alt=""></div><input class="wl-rng" type="range" min="0" max="100" value="50"><span class="wl-l">today</span><span class="wl-r">proposed</span>')+'</div><figcaption>'+esc(c[2])+'</figcaption></figure>'; };
  var seg=function(k){ var v=V(k); return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Yes'],['maybe','? Maybe'],['cut','✕ No']].map(function(o){ return '<button class="vbtn wl-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  LAB_TABS.push({ id:'worldlook2', name:'The world, revamped 2',
    blurb:'<b>Round 127 — every note answered, on the real game.</b> Round 124\'s pictures were taken with the painted sprites and scenery switched off (the test harness\'s stand-in mode) while the scenery index was still the damaged one — that is why they did not look like the game. Every picture here is the game as you play it, painted, with the HUD hidden; each mock-up changes only the layer its idea touches. Nothing goes in yet. ✓ / ? / ✕ each again, and the paintings it needs are ordered (<code>.\\tools\\sprites\\paint.ps1 -List r127_world</code>) so we can see them before choosing.',
    designs:O.map(function(o){ return {id:o.id,name:'World 2: '+o.name}; }),
    render:function(){ var h='', grp=null;
      O.forEach(function(o){ if(o.g!==grp){ grp=o.g; h+=LBR.sec(esc(grp),O.filter(function(x){ return x.g===grp; }).length+' options'); }
        var k='worldlook2-'+o.id, note=Q(o.was);
        h+='<div class="wl-opt w2-opt'+(V(k)?' v-'+V(k):'')+'"><div class="wl-d"><h4>'+esc(o.name)+'</h4>'+(note?'<p class="w2-note">Your note: “'+esc(note)+'”</p>':'')+'<p>'+esc(o.did)+'</p><div class="wl-cost"><span>Paintings <b>'+esc(o.art)+'</b></span></div>'+seg(k)+'<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'+
          '<div class="w2-imgs">'+o.cmp.map(cmp).join('')+'</div></div>';
        if(o.id==='grade'){ var sp=P('worldlook2-spr').regions||[];
          h+='<div class="wl-opt w2-opt w2-spr"><div class="wl-d"><h4>The second lab — the sprites on the new ground</h4><p>All four on the graded ground (75 %). Pick the one you like — or none, and keep them as painted.</p></div><div class="w2-sg">'+
            ['village','field'].map(function(pl){ return SPR.map(function(s,i){ var on=sp.indexOf(i)>=0; return '<figure class="w2-sp'+(on?' on':'')+'" data-i="'+i+'"><img src="'+I('spr_'+pl+'_'+s[0])+'" alt=""><figcaption>'+(on?'✓ ':'')+esc(s[1])+'</figcaption></figure>'; }).join(''); }).join('')+'</div></div>'; } });
      h+=LBR.sec('Dropped, as you said','');
      h+='<ul class="w2-drop">'+DROP.map(function(d){ return '<li><b>'+esc(d[1])+'</b> — '+esc(d[2])+'</li>'; }).join('')+'</ul>';
      h+='<textarea class="wl-n wl-all" data-k="worldlook2-all" placeholder="Anything else…">'+esc(P('worldlook2-all').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'worldlook2',label:'🌄 The world, revamped 2: your notes answered on real game pictures — ✓ / ? / ✕ again, and pick a sprite look',where:'The world, revamped 2 tab',
    done:function(){ return O.every(function(o){ return !!V('worldlook2-'+o.id); }); },go:function(){ LTODO.goTo('worldlook2','.w2-opt',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('worldlook2')<0)LAB_ACTIVE.unshift('worldlook2');
  document.addEventListener('click',function(e){ var f=e.target.closest&&e.target.closest('.w2-sp'); if(!f)return; var k='worldlook2-spr', p=LabApp.picks[k]=LabApp.picks[k]||{}, i=+f.dataset.i;
    p.regions=(p.regions||[])[0]===i?[]:[i]; p.verdict=p.regions.length?'pick':null; LabApp.persist(k);
    [].forEach.call(document.querySelectorAll('.w2-sp'),function(x){ var on=p.regions.indexOf(+x.dataset.i)>=0; x.classList.toggle('on',on); var c=x.querySelector('figcaption'); c.textContent=(on?'✓ ':'')+SPR[+x.dataset.i][1]; }); });
  var st=document.createElement('style'); st.textContent='.w2-opt{grid-template-columns:minmax(0,0.8fr) minmax(0,1.6fr)!important}.w2-imgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px}.w2-f{margin:0}.w2-f figcaption{font:12px "Segoe UI";color:#8a9ab0;margin-top:3px}'+
    '.w2-note{color:#ffd76a!important;font-style:italic}.w2-sg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.w2-sp{margin:0;cursor:pointer;border:2px solid transparent;border-radius:8px;overflow:hidden;background:#000}.w2-sp img{width:100%;display:block}.w2-sp.on{border-color:#8fe8a0}.w2-sp figcaption{font:12px "Segoe UI";color:#c8d4e4;padding:4px 6px;background:#0b121c}'+
    '.w2-drop{font:13px/1.5 "Segoe UI";color:#a8b8cc}@media (max-width:860px){.w2-opt{grid-template-columns:1fr!important}.w2-sg{grid-template-columns:1fr 1fr}}';
  document.head.appendChild(st);
})();
