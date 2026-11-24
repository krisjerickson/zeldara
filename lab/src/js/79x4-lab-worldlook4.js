// ═══════════════════════════════════════════════════════════════════════
// ║ 79x4-lab-worldlook4.js — round 131: THE WORLD, REVAMPED — TAKE 4 (Kris: "i also don't think i've seen an updated the world revamped
// ║ after my feedback"). The four he left at "maybe" in take 3, remade from his notes (tools/world/world_looks4.py), with clips where he
// ║ asked to see them move; and the ✓ ones, with where each stands on its way into the game.
// ║ Picks: 'worldlook4-<id>' {verdict pick|maybe|cut, regions:[variant], notes}; 'worldlook4-all'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var U=function(n){ var p='preview/worldlook4/'+n; return (typeof VWL4!=='undefined'&&VWL4[n])||p; };
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; };
  var pic=function(n,cap,v,k){ var cur=(P(k).regions||[]); return '<figure class="w4-f'+(v&&cur.indexOf(v)>=0?' on':'')+'">'+(/\.mp4$/.test(n)?'<video src="'+U(n)+'" controls loop muted playsinline preload="metadata" poster="'+U(n.replace('.mp4','.jpg'))+'"></video>':'<img src="'+U(n)+'" alt="" loading="lazy" class="w4-zoom">')+
    '<figcaption>'+esc(cap)+(v?' <button class="vbtn w4-v'+(cur.indexOf(v)>=0?' on':'')+'" data-k="'+k+'" data-v="'+v+'">'+(cur.indexOf(v)>=0?'✓ this one':'☆ this one')+'</button>':'')+'</figcaption></figure>'; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Into the game'],['maybe','? Again'],['cut','✕ Leave out']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var O=[
   ['aurora_water','Aurora in the water — soft, never over a sprite','"this is good, but i see the effect going over the southern bridge sprite, and the aurora should not go over sprites"',
     'The sheen now lies only on open water: it stops at every bridge, prop, plant and person (in the game it is drawn on the water layer itself, under everything that stands on it). The clip shows it breathing slowly.',
     [['auw4_a.jpg','Today at night',''],['auw4_soft.jpg','Soft sheen — the bridge and the hero untouched','soft'],['auw4_soft.mp4','… moving (5 s)','']]],
   ['frames','Saga frames — three moments in the game','"this is still a cool idea, but i need to see little videos of what this will look like in the game"',
     'The saga frame is kept for the big beats only, never for ordinary play. The camera eases in a little, the frame fades in with a line of the saga, holds for about two seconds, then fades away. Play the clips:',
     [['frame4_realm.mp4','Entering a new realm','realm'],['frame4_freed.mp4','A craftsman freed','freed'],['frame4_site.mp4','A treasure site cleared','site']]],
   ['landmarks','Landmarks — each one IS the passage between two realms','"these need to be the passages from one quadrant to another … Reposition these, or remake as needed for them to connect the different quadrants"',
     'Each border has three crossings; the landmark becomes the middle one (the old gatehouse goes), and the builder who opens it is the one who built it. Left: today. Silverrun has no landmark you picked — Bram\'s bridge is shown so every border has one.',
     [['lm4_silverrun_2_a.jpg','Today — Millrace Bridge (Silverrun: Grasslands ↔ Wetlands)',''],['lm4_silverrun_2_bram_bridge.jpg','Bram\'s bridge as the Millrace crossing','bram'],
      ['lm4_scarp_2_a.jpg','Today — the Scar Lift (Great Scar: Wetlands ↔ Highlands)',''],['lm4_scarp_2_mira_lift.jpg','Mira\'s lift as the Scar crossing','mira'],['lm4_scarp_2_great_scar.jpg','… or the edge of the Great Scar there','scar'],
      ['lm4_chasm_2_a.jpg','Today — the Chasm Iron Bridge (Cinder Chasm: Highlands ↔ Ashlands)',''],['lm4_chasm_2_dunn_bridge.jpg','Dunn\'s iron bridge as the Chasm crossing','dunn'],
      ['lm4_ember_2_a.jpg','Today — the Ember Pass (Ember Wall: Ashlands ↔ Grasslands)',''],['lm4_ember_2_vela_pass.jpg','Vela\'s pass as the Ember crossing','vela']]],
   ['vistas','Vistas — the scenes themselves','"i would like to see what these scenes look like before putting in, right now hard to gauge if it looks tacky or cool"',
     'Each painting whole, then a clip of the moment in the game: at the lookout the camera lifts and the far view rises over the play field, holds, and you walk on.',
     [['vista4_silverrun_whole.jpg','The Silverrun valley','silverrun'],['vista4_silverrun.mp4','… easing into it',''],['vista4_scar_whole.jpg','The Great Scar','scar'],['vista4_scar.mp4','… easing into it',''],
      ['vista4_ember_whole.jpg','The Ember Wall','ember'],['vista4_ember.mp4','… easing into it',''],['vista4_lilies_whole.jpg','The lantern lilies','lilies'],['vista4_lilies.mp4','… easing into it','']]]];
  var DONE=[['air','The seasons\' air (drifting petals, leaves, motes)'],['ground','The painted ground pieces'],['water','The painted water pieces'],['sites','The grand site exteriors'],['night','Night: moonlit, today\'s light kept round everyone (b)'],['shadow','Shadows: contact only, by geometry'],['grade','The take-2 colour grade and dusk']];
  LAB_TABS.push({ id:'worldlook4', name:'The world, revamped 4',
    blurb:'<b>Round 131 — take 4.</b> The four you left at "maybe", remade from your notes: the aurora never over a sprite; the saga frames and the vistas as <b>clips</b>; the landmarks standing <b>at the passages</b> between the realms. ✓ what should go in, ? for another try, with a note.',
    designs:[{id:'worldlook4',name:'The world, revamped 4'}],
    render:function(){ var h='<div class="w4-in"><b>Your ✓ from take 3 — on their way into the game (next):</b> '+DONE.map(function(d){ return '<span class="w4-chip">'+esc(d[1])+'</span>'; }).join('')+'</div>';
      O.forEach(function(o){ var k='worldlook4-'+o[0]; h+='<div class="w4-c"><h3>'+esc(o[1])+'</h3><p class="w4-q">You: '+esc(o[2])+'</p><p class="w4-p">'+esc(o[3])+'</p><div class="w4-g">'+o[4].map(function(x){ return pic(x[0],x[1],x[2],k); }).join('')+'</div>'+
        '<div class="w4-a">'+tag(k)+'<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div></div>'; });
      return h+'<textarea class="wl-n wl-all" data-k="worldlook4-all" placeholder="Anything about the world as a whole…">'+esc(P('worldlook4-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'worldlook4',label:'🗺 The world, revamped 4: the aurora, the saga frames and vistas as clips, the landmarks at the passages',where:'The world, revamped 4 tab',
    done:function(){ return O.every(function(o){ return !!P('worldlook4-'+o[0]).verdict; }); },go:function(){ LTODO.goTo('worldlook4','.w4-c',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('worldlook4')<0)LAB_ACTIVE.unshift('worldlook4');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.w4-v'); if(!b)return; var k=b.dataset.k, p=LabApp.picks[k]||(LabApp.picks[k]={}), R=p.regions||(p.regions=[]), i=R.indexOf(b.dataset.v); if(i>=0)R.splice(i,1); else R.push(b.dataset.v); if(LabApp.persist)LabApp.persist(k); var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); });
  var st=document.createElement('style'); st.textContent='.w4-in{background:#0d1a12;border:1px solid #2a5a3a;border-radius:10px;padding:8px 12px;margin:6px 0 12px;font:13px/1.6 "Segoe UI";color:#c8e8d0}.w4-chip{display:inline-block;margin:2px 4px;padding:1px 8px;border-radius:9px;background:#1f3a2a;color:#b8f0c8;font-size:12px}'+
    '.w4-c{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:10px 12px;margin:0 0 14px}.w4-c h3{margin:0 0 4px;font:600 17px "Segoe UI";color:#ffe9a8}.w4-q{font:italic 13px "Segoe UI";color:#ffcf9a;margin:2px 0}.w4-p{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:4px 0 8px}'+
    '.w4-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:10px}.w4-f{margin:0}.w4-f img,.w4-f video{width:100%;border-radius:8px;display:block;background:#000}.w4-f.on img,.w4-f.on video{box-shadow:0 0 0 3px #ffd76a}.w4-f figcaption{font:12.5px "Segoe UI";color:#c8d4e4;margin-top:4px}.w4-v{padding:2px 8px;font-size:12px;margin-left:6px}.w4-v.on{background:#5a4a14;color:#fff}'+
    '.w4-a{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px}.w4-a .wl-n{flex:1;min-width:260px}';
  document.head.appendChild(st);
})();
