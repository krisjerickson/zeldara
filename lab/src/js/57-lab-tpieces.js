// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 42 — TERRAIN PIECES tab: the 72 painted edge pieces (waves 38 and 42) as they came in, and Kris's say on them.
// ║ Kris (Oct 9): "create a section in design lab for me to provide any feedback or clarify what you need through questions
// ║ and options". Sections: (1) the pieces of his picks, now painted — right or not; (2) everything else that is ready in
// ║ the game but switched off — ☆ Pick = switch it on there (05d ZWE.PICK[place].feat / .fx); (3) the round 38 pieces
// ║ already in use — size and amount; (4) questions; (5) anything else. Picks are saved as 'tpieces-<id>'.
// ║ The pictures come from the atlas page edges-0.webp (published beside the Lab; locally ../assets/scenery/).
// ═══════════════════════════════════════════════════════════════════════
var TP_ITEMS={"ed_cattails":[2,2,110,135],"ed_ivy":[114,2,129,120],"ed_steam_vent":[245,2,115,120],"ed_reeds":[362,2,100,116],"ed_basalt":[464,2,106,112],"ed_snow_pine":[572,2,100,111],"ed_foot_boulder":[674,2,123,108],"ed_reeds_dry":[799,2,100,108],"ed_iris":[901,2,110,105],"ed_dune_grass":[1013,2,114,104],"ed_talus_b":[1129,2,155,88],"ed_tide_pool":[1286,2,107,88],"ed_icicles":[1395,2,114,88],"ed_obsidian":[1511,2,92,88],"ed_sulphur":[1605,2,82,88],"ed_rock_mossy":[1689,2,102,84],"ed_shore_rock":[1793,2,107,80],"ed_ice_shards":[1902,2,96,80],"ed_log_fallen":[2,139,117,80],"ed_log_mossy":[121,139,96,80],"ed_log_rotting":[219,139,126,80],"ed_snow_rock":[347,139,94,80],"ed_fern":[443,139,98,80],"ed_talus_a":[543,139,102,76],"ed_roots":[647,139,96,76],"ed_toadstools":[745,139,75,76],"ed_tuft_b":[822,139,100,72],"ed_bank":[924,139,100,72],"ed_stepping_stones":[1026,139,108,72],"ed_lava_plate":[1136,139,92,72],"ed_cracked_mud":[1230,139,92,72],"ed_sand_ripples":[1324,139,96,72],"ed_snow_ripples":[1422,139,96,72],"ed_bramble":[1520,139,84,72],"ed_ember_rocks":[1606,139,88,68],"ed_wildflowers":[1696,139,76,68],"ed_heather":[1774,139,85,68],"ed_wisp":[1861,139,47,68],"ed_ice_floe":[1910,139,93,68],"ed_snow_lip":[2,221,96,64],"ed_alpine_flowers":[100,221,80,64],"ed_frozen_puddle":[182,221,91,64],"ed_lichen_rock":[275,221,89,64],"ed_tuft_a":[366,221,78,60],"ed_tuft_dry":[446,221,84,60],"ed_lily":[532,221,88,60],"ed_driftwood":[622,221,79,60],"ed_crust_shards":[703,221,84,60],"ed_duckweed":[789,221,83,60],"ed_moss_patch":[874,221,91,60],"ed_lava_bubble":[967,221,86,60],"ed_puddle":[1055,221,84,60],"ed_cliff_grass":[1141,221,84,56],"ed_snow_drift":[1227,221,92,56],"ed_wrack":[1321,221,110,56],"ed_dragonfly":[1433,221,80,54],"ed_mud_clods":[1515,221,78,52],"ed_ash_heap":[1595,221,91,52],"ed_clover":[1688,221,65,52],"ed_pebbles":[1755,221,112,48],"ed_shells":[1869,221,56,48],"ed_fish":[1927,221,43,48],"ed_gull":[2,287,81,48],"ed_crab":[85,287,53,44],"ed_frog":[140,287,57,44],"ed_crow":[199,287,62,44],"ed_butterfly":[263,287,64,44],"ed_foam":[329,287,74,40],"ed_firefly":[405,287,31,36],"ed_leaf_autumn":[438,287,38,36],"ed_leaf_red":[478,287,32,36],"ed_leaf_green":[512,287,23,32]};      // id → [x, y, w, h] on edges-0.webp (from assets/scenery/index.json, round 42)
(function(){ if(typeof LBR==='undefined')return; LBR.TABS.push('tpieces');
  var CW=480, CH=270, IMG=new Image(), ok=false; IMG.onload=function(){ ok=true; }; IMG.onerror=function(){ if(!IMG._b){ IMG._b=1; IMG.src='../assets/scenery/edges-0.webp'; } }; IMG.src='edges-0.webp';
  // ground for each place: [land colour, other colour, other is water?]
  var GROUND={lake:['#74b058','#2a6f92',1],sea:['#e4d4a2','#16487c',1],marsh:['#6a583e','#4a7e68',1],cliff:['#9aaa70','#8c8478',0],lava:['#3c2a24','#ff9a30',1],snow:['#f4f8fb','#9aaa70',0]};
  var PN={lake:'Lake shore',sea:'Beach',marsh:'Marsh',cliff:'Mountain edge',lava:'Lava',snow:'Snow line'};
  // the cards: id, place, title, pieces, where it goes in the world, kind (pick = already in; feat/fx = can be switched on; used = round 38 piece in use)
  var A=[['lake_logs','lake','Logs and mossy rocks — your pick',['ed_log_fallen','ed_log_mossy','ed_rock_mossy'],'A fallen or mossy log at the water now and then, a mossy rock on the bank. In the game now.','pick'],
    ['marsh_logs','marsh','Rotting logs — your pick',['ed_log_rotting','ed_log_mossy'],'Old logs on the mud and half sunk in the pools. In the game now.','pick'],
    ['cliff_leaves','cliff','Falling leaves — your pick',['ed_leaf_autumn','ed_leaf_red','ed_leaf_green'],'Leaves blowing over the grass below cliffs, now painted. In the game now.','pick'],
    ['marsh_wisps','marsh','Will-o\'-wisps — your pick',['ed_wisp'],'The painted wisp drifts inside the soft glow you liked. In the game now.','pick']];
  var B=[['lake_flowers','lake','Wildflowers',['ed_wildflowers','ed_clover','ed_iris'],'Small flowers in the grass near the water; irises at the edge.','feat'],
    ['lake_stones','lake','Stepping stones',['ed_stepping_stones'],'Flat stones in the shallows along the shore.','feat'],
    ['lake_puddle','lake','Puddles',['ed_puddle'],'A rain puddle here and there on the grass and mud near water.','feat'],
    ['lake_bramble','lake','Brambles',['ed_bramble'],'Low bramble bushes on the meadow near lakes.','feat'],
    ['lake_icefloe','lake','Ice floes',['ed_ice_floe'],'Small floes on the water (best for lakes in the snow).','feat'],
    ['lake_dragonflies','lake','Dragonflies',['ed_dragonfly'],'Dragonflies darting along lake and marsh edges.','fx'],
    ['lake_fish','lake','Jumping fish',['ed_fish'],'A fish leaping out of the lake now and then.','fx'],
    ['lake_butterflies','lake','Butterflies',['ed_butterfly'],'Butterflies over the meadows by the water.','fx'],
    ['sea_shells','sea','Shells and tide pools',['ed_tide_pool','ed_shells'],'Shells, starfish and little rock pools on the beach.','feat'],
    ['sea_wrack','sea','Seaweed wrack',['ed_wrack'],'A line of seaweed and driftwood at the high-water mark.','feat'],
    ['sea_marram','sea','Dune grass',['ed_dune_grass'],'Tall dune grass where the sand meets the meadow.','feat'],
    ['sea_sandripples','sea','Sand ripples',['ed_sand_ripples'],'Wind ripples on the open sand.','feat'],
    ['sea_crabs','sea','Crabs',['ed_crab'],'Crabs scuttling on the wet sand.','fx'],
    ['sea_gulls','sea','Gulls',['ed_gull'],'Gulls gliding over beaches and the sea.','fx'],
    ['marsh_toadstools','marsh','Toadstools and ferns',['ed_toadstools','ed_fern'],'On the mud banks.','feat'],
    ['marsh_duckweed','marsh','Duckweed',['ed_duckweed'],'Bright green patches on the pools near the banks.','feat'],
    ['marsh_mudcracks','marsh','Cracked mud',['ed_cracked_mud'],'Dry cracked patches on the mud.','feat'],
    ['marsh_frogs','marsh','Frogs',['ed_frog'],'Frogs hopping on the banks.','fx'],
    ['marsh_fireflies','marsh','Fireflies',['ed_firefly'],'Fireflies over the marsh.','fx'],
    ['cliff_moss','cliff','Ivy and moss',['ed_ivy','ed_moss_patch'],'Ivy hanging on cliff faces, moss on the stone.','feat'],
    ['cliff_alpine','cliff','Mountain flowers and heather',['ed_alpine_flowers','ed_heather','ed_lichen_rock'],'In the highland grass near rocks.','feat'],
    ['cliff_rubble','cliff','Rubble fans',['ed_talus_b','ed_talus_a'],'Broken stone spread out from cliff feet (more of it than now).','feat'],
    ['cliff_birds','cliff','Crows',['ed_crow'],'Crows wheeling over the mountains.','fx'],
    ['lava_obsidian','lava','Obsidian shards',['ed_obsidian'],'On the crust near lava.','feat'],
    ['lava_sulphur','lava','Sulphur crystals',['ed_sulphur'],'On the ash.','feat'],
    ['lava_basalt','lava','Basalt columns',['ed_basalt'],'On the crust beside the lava.','feat'],
    ['lava_lavaplate','lava','Floating crust and bubbles',['ed_lava_plate','ed_lava_bubble'],'On the lava itself.','feat'],
    ['lava_vents','lava','Steam vents',['ed_steam_vent'],'Glowing vents on the crust.','feat'],
    ['snow_icicles','snow','Icicles and snowy rocks',['ed_icicles','ed_snow_rock'],'Icicles under rock edges, rocks poking through snow.','feat'],
    ['snow_pines','snow','Snowy saplings',['ed_snow_pine'],'Along the snow line.','feat'],
    ['snow_puddles','snow','Frozen puddles',['ed_frozen_puddle'],'On the grass and scree near snow.','feat'],
    ['snow_snowripples','snow','Snow ripples',['ed_snow_ripples'],'Wind ridges on the snowfield.','feat'],
    ['snow_reedsdry','snow','Dry winter reeds',['ed_reeds_dry'],'Frosted reeds at frozen water.','feat']];
  var C=[['used_tufts','lake','Grass tufts',['ed_tuft_a','ed_tuft_b','ed_tuft_dry'],'Along grass edges everywhere.','used'],
    ['used_water','lake','Reeds, cattails, lily pads',['ed_reeds','ed_cattails','ed_lily'],'In lake and marsh shallows.','used'],
    ['used_shore','sea','Shore pieces',['ed_pebbles','ed_shells','ed_driftwood','ed_shore_rock','ed_foam'],'Sand and shallows.','used'],
    ['used_banks','lake','Banks and roots',['ed_bank','ed_roots','ed_mud_clods'],'Lake banks and mud.','used'],
    ['used_cliff','cliff','Cliff pieces',['ed_foot_boulder','ed_talus_a','ed_cliff_grass'],'Cliff feet and tops.','used'],
    ['used_snow','snow','Snow pieces',['ed_snow_drift','ed_snow_lip','ed_ice_shards'],'Snow edges.','used'],
    ['used_fire','lava','Fire pieces',['ed_ember_rocks','ed_crust_shards','ed_ash_heap'],'Crust and ash by lava.','used']];
  var ALL=A.concat(B,C), BY={}; ALL.forEach(function(c){ BY[c[0]]=c; });
  var CRE={ed_crab:1,ed_dragonfly:1,ed_fish:1,ed_frog:1,ed_gull:1,ed_crow:1,ed_butterfly:1,ed_wisp:1,ed_firefly:1,ed_leaf_autumn:1,ed_leaf_red:1,ed_leaf_green:1};
  LBR.drawers.tpieces=function(cv,c,W,H,t,full,id){ var D=BY[id]; if(!D)return; var anim=D[3].some(function(p){ return CRE[p]; }); if(!anim&&ok&&cv._done===id+W&&!full)return;
    var G=GROUND[D[1]]; c.fillStyle=G[0]; c.fillRect(0,0,W,H); c.fillStyle=G[1]; c.beginPath(); c.moveTo(W*0.62,0); c.bezierCurveTo(W*0.55,H*0.35,W*0.9,H*0.55,W*0.8,H); c.lineTo(W,H); c.lineTo(W,0); c.closePath(); c.fill();
    c.strokeStyle='rgba(20,16,10,.55)'; c.lineWidth=3; c.beginPath(); c.moveTo(W*0.62,0); c.bezierCurveTo(W*0.55,H*0.35,W*0.9,H*0.55,W*0.8,H); c.stroke(); if(G[2]){ c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=2; c.stroke(); }
    if(!ok){ c.fillStyle='#000a'; c.fillRect(0,H/2-14,W,28); c.fillStyle='#fff'; c.font='13px sans-serif'; c.textAlign='center'; c.fillText('loading the painted pieces…',W/2,H/2+5); return; }
    var P=D[3], n=P.length, s=Math.min(1.25,(W*0.92/n)/90)*(W/CW), gap=W/(n+1);
    P.forEach(function(pid,i){ var R=TP_ITEMS[pid]; if(!R)return; var w=R[2], h=R[3], k=Math.min(s*1.0,(H*0.62)/h), X=gap*(i+1), Y=H*0.74, dy=CRE[pid]?Math.sin(t*3+i*1.7)*5*k:0, dx=CRE[pid]?Math.cos(t*1.3+i)*6*k:0;
      c.fillStyle='rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(X,Y,w*k*0.42,6*k,0,0,6.3); c.fill();
      if(pid==='ed_wisp'||pid==='ed_firefly'){ var g=c.createRadialGradient(X+dx,Y-h*k/2+dy,0,X+dx,Y-h*k/2+dy,h*k); g.addColorStop(0,'rgba(160,255,230,.35)'); g.addColorStop(1,'rgba(160,255,230,0)'); c.fillStyle=g; c.beginPath(); c.arc(X+dx,Y-h*k/2+dy,h*k,0,6.3); c.fill(); }
      c.imageSmoothingEnabled=true; c.drawImage(IMG,R[0],R[1],w,h,X-w*k/2+dx,Y-h*k+dy,w*k,h*k); });
    c.fillStyle='rgba(0,0,0,.55)'; c.fillRect(8,8,c.measureText(PN[D[1]]).width+18,20); c.fillStyle='#fff'; c.font='12px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(PN[D[1]],16,22);
    if(!anim&&!full)cv._done=id+W; };
  // questions: one choice each, saved as tpieces-q_<id> (verdict 'pick', choice)
  var Q=[['amount','How many painted pieces along the edges?',['Fewer','About as now','More']],
    ['size','How big should the painted pieces be?',['Smaller','About as now','Bigger']],
    ['block','Should the big pieces (logs, rocks, basalt, saplings) block walking?',['Yes — walk around them','No — walk through, as now']],
    ['creatures','The creatures (crabs, gulls, dragonflies, fish, frogs, fireflies, crows):',['Switch them all on','Only the ones I pick below','None for now']],
    ['labcards','Should the Lab\'s Terrain edges cards show these painted pieces instead of the drawn stand-ins?',['Yes','No need']]];
  var qh=function(){ return '<div class="tq-wrap">'+Q.map(function(q){ var p=LabApp.picks['tpieces-q_'+q[0]]||{}; return '<div class="tq"><b>'+q[1]+'</b><div class="tq-row">'+q[2].map(function(o){ return '<button class="vbtn tq-opt'+(p.choice===o?' on':'')+'" data-q="'+q[0]+'" data-o="'+o.replace(/"/g,'&quot;')+'">'+(p.choice===o?'● ':'○ ')+o+'</button>'; }).join('')+'</div></div>'; }).join('')+'</div>'; };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.tq-opt'); if(!b)return; var k='tpieces-q_'+b.dataset.q, p=LabApp.picks[k]=LabApp.picks[k]||{}, o=b.dataset.o; p.choice=p.choice===o?null:o; p.verdict=p.choice?'pick':null; p.title=(Q.find(function(q){ return q[0]===b.dataset.q; })||[])[1]; LabApp.persist(k);
    var w=b.closest('.tq-wrap'); if(w)w.outerHTML=qh(); });
  document.addEventListener('input',function(e){ if(e.target.id!=='tp-feedback')return; var k='tpieces-feedback', p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=e.target.value; p.verdict=e.target.value?'note':null; LabApp.saveState('Typing…'); LabApp.persist(k,900); });
  (function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent='.tq-wrap{display:grid;gap:10px;margin:8px 0 18px}.tq{padding:10px 14px;border:1px solid #2c3e5a;border-radius:8px;background:#0c1626}.tq b{display:block;margin-bottom:6px}.tq-row{display:flex;flex-wrap:wrap;gap:8px}.tq-opt.on{border-color:var(--pick);color:var(--pick);background:rgba(127,216,154,.14)}#tp-feedback{width:100%;min-height:110px;margin:6px 0 20px;box-sizing:border-box}'; document.head.appendChild(st); })();
  var KC={pick:'#7fe0a0',feat:'#ffd07f',fx:'#7fb8ff',used:'#c8c8c8'}, KN={pick:'your pick — in the game',feat:'ready — off',fx:'moves — off',used:'in the game since round 41'};
  var card=function(D,j){ return LBR.card('tpieces',{id:D[0],name:D[2],desc:D[4]},j,CW,CH,'<span class="bb-m" style="color:'+KC[D[5]]+';border-color:'+KC[D[5]]+'">'+KN[D[5]]+'</span>'); };
  LAB_TABS.push({ id:'tpieces', name:'Terrain pieces',
    blurb:'<b>The painted terrain pieces — and what I need from you.</b> All 72 pieces from the two rounds of edge sheets are cut and in the game\'s pictures. <b>1.</b> Your picks, now painted: ☆ Pick if they look right, or say what to change in the note. <b>2.</b> Everything else is ready in the game but <b>switched off</b>, so the world shows only what you chose: ☆ Pick any you want switched on. <b>3.</b> The pieces already along the edges: ☆ Pick to keep as they are, or note size or amount. <b>4.</b> A few questions. <b>5.</b> Anything else, in your own words.',
    designs:ALL.map(function(D){ return {id:D[0],name:D[2]}; }),
    render:function(){ setTimeout(LBR.bind,0); var places=['lake','sea','marsh','cliff','lava','snow'], fb=(LabApp.picks['tpieces-feedback']||{}).notes||'';
      return LBR.sec('1. Your picks, now painted','in the game')+'<div class="br-grid br-wide">'+A.map(card).join('')+'</div>'+
        LBR.sec('2. Ready, switched off','☆ Pick = switch it on in the game')+places.map(function(pl){ var L=B.filter(function(D){ return D[1]===pl; }); return L.length?'<h4 class="tp-pl" style="margin:14px 0 4px;color:#cfe0f4">'+PN[pl]+'</h4><div class="br-grid br-wide">'+L.map(card).join('')+'</div>':''; }).join('')+
        LBR.sec('3. Already along the edges','☆ Pick = keep as is; note size or amount')+'<div class="br-grid br-wide">'+C.map(card).join('')+'</div>'+
        LBR.sec('4. Questions','one choice each')+qh()+
        LBR.sec('5. Anything else','your words — saved as you type')+'<textarea id="tp-feedback" class="mn-notes" placeholder="Anything about the terrain, edges, pieces or creatures…">'+fb.replace(/</g,'&lt;')+'</textarea>'; } });
})();
