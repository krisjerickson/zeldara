// ═══════════════════════════════════════════════════════════════════════
// ║ 79q2-lab-guide.js — round 101: THE MECHANICS GUIDE (Kris: "do a holistic review of the entire saga and game, and create a place in the lab
// ║ that explains all the mechanics, how things work, where you get them, how to upgrade them, and such. While doing this, look for any and
// ║ all improvement opportunities to recommend"). Answered: the Lab now, the game later (the Tome or the Training tab). Doc 53 §9.
// ║ Every mechanic: keys · how it works · where you get it · how it grows · what could be better. Then the improvements, ✓ / ✎ / ✕ each.
// ║ Picks: 'guide-imp_<id>' (cycle), 'guide-home' (where it goes in the game, one).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  // [group, name, keys, how it works, where you get it, how it grows, improvement]
  var M=[
   ['Moving and fighting','Moving','WASD / arrows','Walk anywhere the land allows; water, swamp, cliffs and lava need a mount.','From the start','Mounts (faster, cross terrain)','—'],
   ['Moving and fighting','Sword (melee)','Space','A swing in front of you.','The village shop (Iron Sword 40 g); Oswin\'s first tasks pay for it','Better blades at the armory and the blacksmith\'s forge tree; rings and gems','Timed combos (proposals at the bottom, round 102)'],
   ['Moving and fighting','Shield','Shift (hold)','Blocked hits do a quarter of the damage; you walk slowly.','The village shop (Wood Shield 25 g)','Stronger shields at the armory','—'],
   ['Moving and fighting','Roll','Alt','A quick dodge; untouchable for a moment.','Tumbler Pia\'s lesson (find her 3 pins near the Rime Spire)','—','Pin Pia\'s quest on the map from the start'],
   ['Moving and fighting','Bow and crossbow','Ctrl · C changes ammo','Shoots the equipped ammo; ammo is bought and found.','Shops; crossbows later','Better bows; special ammo (fire, frost…)','Round 101: aim first, head-shots (Painted & polish §6)'],
   ['Moving and fighting','Levels','—','Experience from monsters and quests; level ×100 xp to the next. Each level: health and attack up.','From the start','Capped per realm: 5 / 10 / 15 / 20 — the cap rises as each realm opens','Show the cap on the XP bar; the new HUD grows with level (§3)'],
   ['Moving and fighting','Elements','—','Each foe is weak to some elements and resists others; weak hits show "▲ Weak!".','Spells, ammo, weapons with an element','More elemental gear','A lesson on the first weak hit (Training)'],
   ['Moving and fighting','Difficulty','Pause panel','Hearthside · Wayfarer · Shieldbearer · Ragnarök — pack sizes, damage, rewards.','The start, changed in the open world','—','—'],
   ['Magic and skills','Spells','X','Cast the equipped spell; costs mana, has a cool-down.','The mage towers (16 spells)','More spells; staffs and rings raise power','Round 101: stronger, slower, X twice to aim, status effects (§5)'],
   ['Magic and skills','Mana','Shift+P drinks a mana potion','Fills by itself slowly; potions fill it fast.','From the start (50)','Today only gear raises it; proposed +3 each level','—'],
   ['Magic and skills','Skills (special)','Z','A strong move with a long cool-down (Whirlwind, Meteor, Second Wind…).','The castle isles (12 skills)','More skills; equip one at a time','Show the cool-down on the hotbar button (it is there) and in the lesson'],
   ['Magic and skills','Godsbane','V','The word your twin finds; needed at the end.','Your twin in the library, once Asgard comes down','—','—'],
   ['Companions and mounts','Familiars','N','A companion that fights beside you; each has an element.','The familiar islands (from the harbours)','Fairy trials teach familiar skills (20); the Fairy Kings add a slot (3)','A familiar screen that shows slots and skills together'],
   ['Companions and mounts','Mounts','M','Ride faster and cross terrain the realm needs (water, swamp, cliffs, lava).','Each realm\'s ★ boss dungeon; the Sky Eagle from all four sky ports; the Dragon from all 16 main quests','—','Say on the map which mount crosses what'],
   ['Items','Potions and food','P · O · hold P to throw','Potions heal or fill mana; food heals over time.','Shops, the apothecary, camps, drops','The apothecary\'s better brews','—'],
   ['Items','Gold','—','Monsters, chests, caches, quests; lost in part when you die.','Everywhere; Oswin\'s first two tasks (50 g each)','—','—'],
   ['Items','Gear: armour, rings, gems','Inventory (I)','Armour for defence, rings and gems for power and elements.','The armory, the jeweller, chests, bosses','The blacksmith\'s forge tree; the Sovereign set','Compare stats on hover (green / red)'],
   ['Items','Digging','G','Dig at marked spots for buried things.','The first fairy errand','—','A sparkle on dig spots once you can dig'],
   ['The world','Waystones and travel','Tab at a waystone','Wake each waystone; travel between woken ones for gold.','Along the roads of every realm','—','—'],
   ['The world','Camps','—','Monster camps hold food, wells, shrines and chests.','Every realm','—','—'],
   ['The world','Treasure sites','Tab at the door','Towers and dungeons with an elite guard, a vault and a relic; three per realm unseal its ★ boss tower and ★ boss dungeon.','Every realm','—','Show "2 / 3 treasure sites" on the realm\'s map'],
   ['The world','Boss towers and builders','—','The ★ boss tower frees the realm\'s builder (Bram, Mira, Dunn, Vela); the builder\'s crossing opens the next realm and the village grows.','Each realm','—','—'],
   ['The world','Sky ports','—','A flying shoot-out over the realm\'s sky city; four waves and a guardian.','One per realm','Ship upgrades at the sky port','Round 101 review (§8)'],
   ['The saga','Bound spirits and Soulglass','Tab at a bindstone','Beat the Binder, free the spirit, get a Soulglass shard; its soul-line runs into the land.','10 per realm (at least 6 needed)','—','Count "spirits freed 4 / 10" on the HUD of the realm'],
   ['The saga','Lattices','—','Sólveig fuses 6 shards into the realm\'s lattice.','The Glimmerhall (after the first familiar island)','—','—'],
   ['The saga','Mira\'s trays','—','A hearth tray from the realm\'s metal (island trader) and soul gem (the boss dungeon\'s great spirit).','Mira\'s workshop (after the first castle)','—','The journal names both halves and where they are'],
   ['The saga','The forges and Heartglass','—','Four forges rise when all boss towers and dungeons are done; each hearth makes a Heartglass from a lattice and a tray.','Ember → Cinder → Slag → Ash','—','—'],
   ['The saga','The Lodestar','—','At Muspelheim\'s great hearth: the Sovereign staff + the four Heartglasses.','Muspelheim; the staff from the apothecary (6,000 g + gems)','—','Tell the player about the 6,000 g long before (Oswin)'],
   ['The saga','Asgard and the end','—','The Bifröst from the pier\'s notch, Solmyrk\'s three forms, the feast hall, the truth, the spirits go home.','After Muspelheim','—','—'],
   ['The saga','After the end','—','The World Tree under the lake (all 40 spirits), the hamlets, the children.','After the credits','—','—'],
   ['Help','Training and the journal','Pause panel · Q / B','31 lessons you can read again; the journal tracks every step; ◎ track one on the map.','From the start','—','Put this guide there too (the game later)']];
  var IMP=[['hud','One HUD in every scene','Health, mana and experience in the same place everywhere, growing with level (Painted & polish §3).'],
    ['manalv','Mana grows with level','+3 mana a level (50 → 107), so stronger spells stay castable.'],
    ['spells','Spells as big moments','Stronger, slower, dearer, aimed (§5) — fewer casts that matter more.'],
    ['status','Status effects and combos','Freeze, burn, earth-bound, soaked + lightning… shown on every monster (§5).'],
    ['arrows','Aimed arrows','Aim first, head-shots, half the missed arrows picked up again (§6).'],
    ['sky','Fair sky ports','The fixes and changes in §8.'],
    ['realm','A realm card on the map','"Treasure sites 2 / 3 · spirits 4 / 10 · builder: free · mount: no" for the realm you are in.'],
    ['mounts','Which mount crosses what','A line on the map legend and in the Tome.'],
    ['staff','Say early what the end needs','Oswin mentions the Sovereign staff\'s 6,000 g in the Ashlands, not at the forges.'],
    ['fam','One familiar screen','Slots, skills and the fairy trials together.'],
    ['compare','Gear comparison','Green / red numbers when you look at gear in shops.'],
    ['dig','Dig spots that sparkle','Once you can dig.'],
    ['pia','Pia on the map','The roll quest pinned from the start (it is the only movement skill).'],
    ['guidegame','This guide in the game','The Training tab gets a "How it works" page with these entries (your answer: later).']];
  var groups=[]; M.forEach(function(m){ if(groups.indexOf(m[0])<0)groups.push(m[0]); });
  // ── round 102 (Kris: "i like the idea of sword and axe swings having combos when doing the timing right, with more damage happening if
  //    timing the combo. propose some additional mechanic like this, including a place to teach this") ──
  var COMBO=[['sword','Sword combo','Three swings in a row. After each hit a small rune-ring flashes on the hero: press Space while it shines (0.25–0.45 s after the hit) and the next swing chains — the 2nd ×1.2, the 3rd a wide finisher ×1.6 that knocks back. Miss the beat and it starts again.','The armory\'s weapons-master'],
    ['axe','Axe rhythm','Slower, two beats. The second swing on the beat is a full-circle cleave ×1.8 that hits everything round you; the window is wider but later (0.4–0.7 s).','The blacksmith, when you first hold an axe'],
    ['parry','Perfect block','Raise the shield (Shift) just as a blow lands (a 0.2 s window): no damage, the attacker staggers 1 s, and your next swing is a sure critical.','The weapons-master'],
    ['counter','Roll-counter','Swing within 0.4 s after a roll: a counter-strike ×1.5 that stuns 0.5 s.','Pia, after her roll lesson'],
    ['charge','Charged swing','Hold Space 0.6 s, let go: a heavy slash ×2 (you stand still while it charges).','A castle teacher'],
    ['weave','Rune-weave','Cast a spell within 1 s of a sword finisher: the spell lands +25 % stronger (and the X-twice aim is skipped — it goes where the finisher went).','The first mage-tower master'],
    ['together','Together!','When your familiar strikes the same foe within 0.5 s of your blow, both hits +20 % and a small shared spark.','The first fairy'],
    ['followup','Follow-up shot','A full-draw arrow on a staggered, frozen or rooted foe: ×1.5 on top of the draw.','The armory, with the first bow']];
  var WHERE=[['yard','A Training Yard in the village','Sigrún the weapons-master and a straw practice dummy in a fenced yard by the armory. She teaches each rhythm when you first need it (a short practice: "chain three on the dummy"), and the Training tab keeps a card for each.'],
    ['teachers','Each teacher teaches their own','The armory for the sword and the parry, the blacksmith for the axe, Pia for the counter, the mage towers for the weave, the fairy for "together" — no new place.'],
    ['cards','Training cards only','A lesson card the first time each can happen (Training tab), no practice.']];
  var DIG='<div class="ta gd-dig"><b>Digging — what it is tied to</b> (your note: "I don\'t think there is actually a good reason for digging anymore"):<span>🧚 the <b>fairy lessons</b> — each of the 20 fairies asks for a buried object before her familiar trial</span><span>👑 the three <b>Fairy Kings</b> — three buried treasures each, before their trial (a familiar slot)</span><span>🪓 the <b>Fairy Trowel</b> you are given for it, the <b>G</b> key, the dig sound and sparkles, Training lesson 20</span><span>Nothing else: no quest, no gold, no story needs it.</span><span><b>Proposed:</b> take digging out — the objects lie in the open at the same glowing spots (a glint in the grass); walking over one picks it up. The trowel, G and lesson 20 go; old saves keep everything they found.</span></div>';

  LAB_TABS.push({ id:'guide', name:'Mechanics guide',
    blurb:'<b>Round 101 — every mechanic in one place.</b> What it does, the keys, where you get it, how it grows, and what could be better. The improvements are at the bottom: ✓ do · ✎ change · ✕ skip. It goes into the game later (Training or the Tome).',
    designs:IMP.map(function(x){ return {id:'imp_'+x[0],name:'Improvement: '+x[1]}; }).concat(COMBO.map(function(x){ return {id:'cmb_'+x[0],name:'Combat rhythm: '+x[1]}; })).concat(WHERE.map(function(x){ return {id:'where_'+x[0],name:'Taught: '+x[1]}; })).concat([{id:'dig_remove',name:'Take digging out'}]),
    render:function(){ return groups.map(function(g){ return LBR.sec(g,M.filter(function(m){ return m[0]===g; }).length+' mechanics')+
        '<table class="tl gd-t"><thead><tr><th>Mechanic</th><th>Keys</th><th>How it works</th><th>Where you get it</th><th>How it grows</th><th>Could be better</th></tr></thead><tbody>'+
        M.filter(function(m){ return m[0]===g; }).map(function(m){ return '<tr><td><b>'+esc(m[1])+'</b></td><td class="gd-k">'+esc(m[2])+'</td><td>'+esc(m[3])+'</td><td>'+esc(m[4])+'</td><td>'+esc(m[5])+'</td><td class="gd-i">'+esc(m[6])+'</td></tr>'; }).join('')+'</tbody></table>'; }).join('')+
      LBR.sec('Combat rhythm — timed combos and more (round 102)','✓ do · ✎ change · ✕ skip each, then ☆ where it is taught')+
      '<table class="tl gd-combo"><tbody>'+COMBO.map(function(x){ var k='guide-cmb_'+x[0], v=V(k);
        return '<tr class="tl-'+(v||'x')+'"><td style="width:18%"><b>'+esc(x[1])+'</b></td><td>'+esc(x[2])+'</td><td style="width:16%;color:#9fd0ff">'+esc(x[3])+'</td><td><span class="pz-seg gd-seg" data-k="'+k+'">'+[['pick','✓ Do'],['change','✎ Change'],['cut','✕ Skip']].map(function(o){ return '<button class="vbtn gd-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span></td><td><input class="tl-n gd-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; }).join('')+'</tbody></table>'+
      '<div class="tc-grid">'+WHERE.map(function(w){ var k='guide-where_'+w[0], on=V(k)==='pick'; return '<article class="tc'+(on?' on':'')+'"><b>'+esc(w[1])+'</b><p>'+esc(w[2])+'</p><div class="tc-a"><button class="vbtn gd-wh" data-id="'+w[0]+'" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button></div></article>'; }).join('')+'</div>'+
      LBR.sec('Digging','what it is tied to, and the proposal (your note on "dig spots that sparkle")')+DIG+
      (function(){ var k='guide-dig_remove', v=V(k); return '<div style="margin:6px 0 14px">Take digging out? <span class="pz-seg gd-seg" data-k="'+k+'">'+[['pick','✓ Take it out'],['change','✎ Change'],['cut','✕ Keep it']].map(function(o){ return '<button class="vbtn gd-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span> <input class="tl-n gd-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…" style="width:40%"></div>'; })()+
      LBR.sec('Improvements I recommend','✓ do · ✎ change · ✕ skip — click again to clear')+
      '<table class="tl gd-imp"><tbody>'+IMP.map(function(x){ var k='guide-imp_'+x[0], v=V(k);
        return '<tr class="tl-'+(v||'x')+'"><td style="width:26%"><b>'+esc(x[1])+'</b></td><td>'+esc(x[2])+'</td><td><span class="pz-seg gd-seg" data-k="'+k+'">'+[['pick','✓ Do'],['change','✎ Change'],['cut','✕ Skip']].map(function(o){ return '<button class="vbtn gd-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span></td><td><input class="tl-n gd-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; }).join('')+'</tbody></table>'; } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.gd-sg'); if(!sg)return; var seg=sg.parentNode, k=seg.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v;      /* round 101b: plain buttons (the shared .tl-v cycle was stepped twice by the Training tab's handler) */
    var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k); [].forEach.call(seg.children,function(b){ b.className='vbtn gd-sg'+(b.dataset.v===nv?' on '+nv:''); }); seg.closest('tr').className='tl-'+(nv||'x'); });
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.gd-wh'); if(!b)return; var id=b.dataset.id, k='guide-where_'+id, was=V(k)==='pick';
    WHERE.forEach(function(w){ var k2='guide-where_'+w[0]; if(k2!==k&&V(k2)==='pick'){ LabApp.picks[k2].verdict=null; LabApp.persist(k2); } }); var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=was?null:'pick'; LabApp.persist(k);
    document.querySelectorAll('.gd-wh').forEach(function(x){ var on=V('guide-where_'+x.dataset.id)==='pick'; x.setAttribute('aria-pressed',String(on)); x.textContent=on?'★ Picked':'☆ Pick'; x.closest('.tc').classList.toggle('on',on); }); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.gd-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.gd-t td{font-size:12.5px}.gd-k{white-space:nowrap;color:#ffe6a8}.gd-i{color:#9fd0ff}.gd-combo td{font-size:12.5px}.gd-dig{margin-top:6px}.pz-seg{display:inline-flex;gap:3px;white-space:nowrap}.gd-sg{padding:4px 8px;font-size:12px;opacity:.75}.gd-sg.on{opacity:1}.gd-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.gd-sg.on.change{background:#6a5a1a;border-color:#ffd870;color:#fff}.gd-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('guide');
  if(typeof LTODO!=='undefined')LTODO.add({id:'combos',label:'⚔ Combat rhythm: ✓ / ✕ the timed combos, ☆ where they are taught · and digging: take it out?',where:'Mechanics guide tab · bottom',done:function(){ return COMBO.every(function(x){ return !!V('guide-cmb_'+x[0]); })&&WHERE.some(function(w){ return V('guide-where_'+w[0])==='pick'; })&&!!V('guide-dig_remove'); },go:function(){ LTODO.goTo('guide','.gd-combo',0); }});
  if(typeof LTODO!=='undefined')LTODO.add({id:'guideimp',label:'📖 Mechanics guide: read it, ✓ / ✕ the improvements',where:'Mechanics guide tab · bottom',done:function(){ return IMP.every(function(x){ return !!V('guide-imp_'+x[0]); }); },go:function(){ LTODO.goTo('guide','.gd-imp',0); }});
})();
