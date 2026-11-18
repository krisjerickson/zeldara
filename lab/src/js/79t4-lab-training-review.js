// ═══════════════════════════════════════════════════════════════════════
// ║ 79t4-lab-training-review.js — round 114: THE MISSING LESSONS. Kris: "do a review of training and tutorials. There can be significant
// ║ mechanics missing that you might not realize unless there's a pop-up that explains it. For instance, sleeping in your bed to fully restore
// ║ your health. This can be a pop-up once you've lost your first 2 hearts. It should also not pop-up until your out of combat. If you die, it
// ║ can be a different pop-up that explains that you can heal by sleeping. Probably master oswin that tells you this. Do a review of any other
// ║ missing mechanics like this and propose how to introduce them."
// ║ The two bed lessons are built (21t-lessons.js); everything else is a proposal from reading the game's own code: what it does, when
// ║ the lesson comes, who says it, and the words. Picks: 'trainrev-<id>' ✓ do / ✎ change / ✕ skip, with a note.
// ═══════════════════════════════════════════════════════════════════════
var LTRAIN={
  BUILT:[
    {id:'bed',t:'Sleeping in your bed',who:'Master Oswin',when:'The first time two of your hearts are gone — and only once the fight is over: nothing has hurt you for six seconds and nothing near is hunting you. Not shown if you have already slept in your bed.',
     say:'You have taken a few knocks. Food mends you slowly and a potion at once — but your own bed mends everything. Go home and Tab at your bed: you wake with every heart and all your mana back, and your saga is saved while you sleep. It costs nothing.',
     was:'Before: "Sleep at your Home to mend for nothing" came up the first time you walked into a house — during the first walk, before you had lost anything, mixed in with the tavern.'},
    {id:'bed_fall',t:'After a fall, go home to bed',who:'Master Oswin',when:'A moment after the death pop-up closes, the first time you fall (out of combat, on the Green). After this one, the first bed lesson is not needed.',
     say:'So you fell. It happens to everyone worth a song — I once fell off a troll. You wake on the Green with only a quarter of your hearts, so do not go straight back out. Walk to your Home and Tab at your bed: sleep, and you wake whole, every heart and all your mana.',
     was:'Before: the death pop-up said you wake at a quarter of your strength, and nothing said how to mend.'},
    {id:'rest',t:'The tavern (now on its own)',who:'Master Oswin',when:'The first time you walk into the tavern.',
     say:'The tavern fills a cup that heals and lends you strength for a while. Rolf will tell you it cures everything. It does not cure Rolf.',
     was:'Before: shared a pop-up with the bed, at the first house.'},
    {id:'calm',t:'Every lesson waits until the fight is over',how:'✓ Built (round 114c — you liked the rule). Before, a lesson pauses the game the moment its trigger happens — a Binder comes near, a camp, your first potion picked up, your first bow — even in the middle of a fight. Now every lesson waits until you are out of combat (the same test the bed uses), except the three that belong in a fight: the shield (on your first hard blow), weak and resist, and bosses warding off spells from afar.'},
    {id:'gap',t:'One lesson at a time, with a breath between',how:'✓ Built (round 114c). Two triggers can land in the same second (a new realm, a Binder, a camp). Now at most one lesson every 20 seconds; the rest wait in a queue (kept in your save) and come in order.'}],
  RULES:[
    {id:'who',t:'Who teaches: each their own',how:'Agreed (you liked the rules) — used as each lesson below is built. Oswin keeps the big ones (saving, the map marks, rumours), and the rest come from whoever would know — Morwen for potions and flasks, Hana for mounts, Garrick for the axe, Quill for the harbours, Corr for the night, Runa for the villagers\' requests, your twin for the Tome. (Or ✕ this and Oswin says them all.)'}],
  // the missing mechanics: what the game does (from its code), when to teach it, who, the words, how big it is
  MISS:[
    {id:'save',pri:1,t:'Saving',sys:'21c-save.js — the game saves itself only when you finish a site, go down a floor, complete a quest, clear a castle or tower, free a craftsman, wake a waystone, learn a spell or familiar skill, or sleep. Walking out of a site and fast travel do not save. Anything else needs the 💾 in your pack or the Tome.',
     when:'The first time the game saves itself (usually your first quest handed in), out of combat.',who:'Master Oswin',
     say:'Your saga writes itself down when something worth a song happens — a site cleared, a floor gone down, a quest done, a waystone woken, a night in your bed. Anything in between, write it yourself: the 💾 in your pack or in the Tome. Walking out of a site does not count, and neither does a waystone ride.',
     why:'Losing an hour of play because you thought it saved is the worst kind of lesson.'},
    {id:'mend',pri:1,t:'All the ways to mend',sys:'Food (slow), potions (at once), your bed (everything), the tavern cup, healing wells at camps (they come back), healing wells in the adventure sites (about one every two floors, once each), the fairy rings (slowly, while you stand in them), Sister Mael\'s wells on the islands.',
     when:'Not a pop-up: a page in the Training tab, "Ways to mend", that opens from the bed lessons ("see all the ways to mend").',who:'— (a Training page)',
     say:'A list with a picture for each: food, potion, bed, tavern, camp well, site well, fairy ring, island well — how much each mends, and whether it comes back.',
     why:'The game has eight ways to heal and teaches two of them.'},
    {id:'quick',pri:1,t:'Equipping your food and potion (O and P)',sys:'22e-quick.js — O eats the food and P drinks the potion you have equipped in your pack; when one runs out the next of the same kind is equipped. Today the lesson just says "P drinks the potion you carry".',
     when:'The first time you carry two different potions or two different foods.',who:'Morwen the Sorcerer (potions) — or Benno if it is food first',
     say:'Two potions in your pack, and you will drink whichever P finds first? Barbaric. Open your pack and set the one you want in the potion slot — P drinks that one, and when it runs out, the next of its kind steps up. The food slot works the same with O. Footnote one: label your bottles.',
     why:'Without it, P drinks the wrong potion at the worst moment.'},
    {id:'flask',pri:2,t:'Flasks to throw, spell oils and blade coatings',sys:'22h-potions.js — hold P to throw a flask (fire pool, frost that freezes 1.5 s, smoke, thunder that stuns and chains to 3); spell oils give your spells an effect for 2 minutes (one oil at a time); coatings do the same for your blade and arrows.',
     when:'The first time you buy or find a flask, an oil or a coating.',who:'Morwen the Sorcerer',
     say:'A flask is not for drinking. Hold P and you throw it — fire, frost, smoke or thunder, where you are facing. An oil goes on your spells and a coating on your blade, two minutes each, one at a time. Do not mix them. I mean it. Footnote three describes what happened when I did.',
     why:'Today a small notice says "hold P to throw it" once; the oils and coatings say nothing.'},
    {id:'spell2',pri:2,t:'Spells: X twice, and they seek',sys:'09s-combat102.js and 10r-spell-seek.js — the first X shows where the spell will land (a rune circle locked on the nearest foe ahead), the second casts it; spells curve towards the strongest foe within a wide cone in front of you.',
     when:'Folded into the spell lesson you already get with your first spell (its words change).',who:'Master Oswin (as now)',
     say:'X once and a rune circle shows where the spell will land — on the nearest foe ahead. X again and it flies. Spells look for the strongest thing in front of you and curve to meet it, so face your real enemy. They drink mana; it comes back on its own, or from a mana draught (Shift and P).',
     why:'The first X doing "nothing" reads as a bug.'},
    {id:'status',pri:2,t:'What spells leave behind',sys:'09s-combat102.js (ZSTAT) — burning, frozen, rooted, stunned, slowed, poisoned, drained, knocked back; every effect is timed, none permanent; bosses shake them off faster.',
     when:'The first time one of your spells leaves an effect on a monster.',who:'The first mage-tower master (or Morwen)',
     say:'See the mark on it? Your spell left something behind — burning, frost, roots, a stun. Each one lasts a few breaths. A frozen or stunned foe cannot move: that is when a full-drawn arrow or a heavy blow does the most. Bosses shake it off faster. The Tome lists every mark.',
     why:'The follow-up shot lesson talks about "frozen, rooted, stunned" before anything has said what those are.'},
    {id:'night',pri:2,t:'Night',sys:'09-monster-engine.js — some monsters (tagged night) only walk after dark; the day turns to night as you play.',
     when:'The first dusk you spend outside the village.',who:'Watchman Corr (at the gate) — or Oswin',
     say:'Sun\'s going down. Some things only walk after dark — you will not have met them by day. Keep to the roads, keep a potion ready, and if you need a rhyme to keep your courage up, I have three hundred. No? Fair.',
     why:'A monster you have never seen appearing at night feels random without it.'},
    {id:'requests',pri:1,t:'The villagers\' requests',sys:'21x-npc-quests.js — a "!" over a villager means a request for you, a "?" means they are waiting for what you bring; riddles: ask again for a hint (each hint trims the reward a little) or ask another villager; they go in your journal under "Villagers\' requests", and you can follow one with the yellow arrow.',
     when:'The first time you come near a villager with a "!".',who:'Elder Runa',
     say:'See the mark over that one\'s head? A "!" means they have something to ask you; a "?" means they are waiting for what you promised. Some of them ask in riddles — ask again for a hint, though each hint costs you a little of the reward, or ask the rest of us. We gossip. Your journal keeps them all.',
     why:'The whole villagers\' system (25 requests) arrived without a word of how it works.'},
    {id:'marks',pri:1,t:'The two marks on your map',sys:'21q2-journal.js — the teal rune diamond is the next step of the Saga; the yellow arrow is the side quest you chose in the journal (Oswin\'s open tasks show in yellow until you choose one). The current map lesson was written before the two marks.',
     when:'The first time you choose a side quest to follow — or as you leave the village after the first walk.',who:'Master Oswin',
     say:'Two marks on your little map. The teal rune is the Saga — where the story goes next. The yellow arrow is whatever side quest you chose in your journal; choose another and the arrow follows it. Lose your way, look for the rune.',
     why:'The marks changed in round 112; the words did not.'},
    {id:'rumour',pri:3,t:'Oswin\'s rumours on the map',sys:'21u-oswin.js — dashed gold rings marked "rumour" on the world map: roughly where something you have not found is; they vanish once you have explored there.',
     when:'The first rumour Oswin gives you (one line added to what he already says).',who:'Master Oswin',
     say:'I have drawn a ring on your map — a dashed one. Roughly there, not exactly. Rumours are like that. Once you have walked it, the ring goes.',
     why:'Small; the rings otherwise look like a bug.'},
    {id:'axe',pri:3,t:'The axe is heavy',sys:'10q-axe.js — an axe swings in 0.9 s (a sword 0.45 s) and you stand still while you swing it; it hits harder. (Felling trees is gone altogether — removed in round 114d.)',
     when:'The first time you hold an axe.',who:'Garrick the Blacksmith',
     say:'An axe. Good. It is heavy: you stand still while you swing it, so swing on purpose — and it bites twice as deep as a sword. Do not let anyone sell you painted pig-iron.',
     why:'Standing still mid-swing feels like a bug if nobody says it is the point.'},
    {id:'mount2',pri:2,t:'Mounts: calling yours, and getting thrown off',sys:'10j-world-mounts.js — attacking throws you off; the mount waits where you left it; M calls it back to you; mounts wait outside the village.',
     when:'Folded into the mount lesson (its words change).',who:'Hana the Stable Master (instead of Oswin)',
     say:'Bramble says: swing a sword from the saddle and you are walking. She waits where you left her — M calls her back, from anywhere outside the village. Mounts do not do villages. Bramble says the cobbles are beneath her.',
     why:'"Where did my mount go?" after the first fight on horseback.'},
    {id:'harbour',pri:2,t:'Harbours and the islands',sys:'10-scene-world.js — Tab at a harbour (⚓) sails to that realm\'s familiar island: the island trader (each realm\'s metal for Mira\'s trays), Sister Mael\'s well, Ranger Holt, the castle isles.',
     when:'The first time you reach a harbour.',who:'Harbormaster Quill',
     say:'Welcome, welcome! Tab at the jetty and a boat takes you across — four islands, one off every realm, each with a trader, a well that mends and a castle with a master in it. And a charming plot of land with sea views, only slightly haunted. We can talk about that later.',
     why:'The islands carry a Saga step (each realm\'s metal) and nothing points you to them.'},
    {id:'camp2',pri:3,t:'What camps guard',sys:'10h-world-camps.js — a campfire (food), a chest, a healing well, a moonwell (mana), a shrine (a 2-minute blessing), a rune stone (experience). Food and wells come back; chests do not.',
     when:'Folded into the camp lesson (its words change).',who:'Master Oswin (as now)',
     say:'Two of every three monsters guard something: a fire with food, a chest, a well that mends, a moonwell for mana, a shrine that blesses you for two minutes, a rune stone that teaches. Beat every guard and it is yours. Fires and wells come back; chests do not.',
     why:'Moonwells, shrines and rune stones are never named.'},
    {id:'wells',pri:3,t:'Healing wells in the sites',sys:'12d-heal-wells.js — about one every two floors, not always easy to find; restores a quarter to a half of your health (at most 8 hearts), then runs dry.',
     when:'Folded into the "inside a site" lesson (one sentence added).',who:'Master Oswin (as now)',
     say:'…Thin them, or slip past. And look for the wells: about one every two floors, tucked away. A drink mends a good part of you — once.',
     why:'They exist to be looked for; nobody knows to look.'},
    {id:'tome',pri:2,t:'The Tome',sys:'26-tome.js — T opens a field guide that fills in as you play: every monster with what it is weak to and how to deal with it, mounts, familiars, spells, items, places and people.',
     when:'The first time you beat a kind of monster you have not met.',who:'Your twin',
     say:'I started a book for you. Don\'t laugh. Everything you meet goes in it — what it is weak to, how to beat it, where it lives. T opens it. I will be checking your spelling.',
     why:'The Tome holds the answers to half the questions the game raises, and it is only in the key list.'},
    {id:'hearts',pri:3,t:'When hearts are worth more',sys:'21w-hud102.js — one heart is 10 health until you have more than 200; then each heart is worth more, so the row stays two rows of ten.',
     when:'The first time your hearts change worth (a small notice, not a pop-up).',who:'— (a notice)',
     say:'💗 You have grown strong enough that each heart now holds more — the same hearts, worth more.',
     why:'Otherwise your hearts seem to shrink after a level.'},
    {id:'diff',pri:3,t:'Difficulty, any time',sys:'04g-difficulty.js and the Training tab — Hearthside, Wayfarer, Shieldbearer, Ragnarök; changeable from the pause panel (Training → ⚙).',
     when:'After your third fall in one realm (a gentle offer, not a pop-up you must read).',who:'Master Oswin',
     say:'No shame in it — if the road is too hard, the pause panel lets you choose an easier one, and back again whenever you like.',
     why:'Players who are stuck rarely know they can change it.'}],
  KEPT:['The shield, the bow, the roll, the elements, waystones, Binders and spirits, the Glimmerhall, familiars, skills, mounts, Mira\'s trays, the forges, the great hearth, Godsbane, Asgard — taught already (the Training tab — 39 lessons with the two new ones).',
    'Fairy rings that heal — their own pop-up (round 110). Sealed regions — the ward curtain and its notice. Sky ports — their briefing. The forges\' heat — the ? Rules.']
};
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var seg=function(k,lab){ var v=V(k); return '<span class="tr-seg" data-k="'+k+'">'+lab.map(function(o){ return '<button class="vbtn tr-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n tr-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+esc(ph||'Note…')+'">'; };
  var DO=[['pick','✓ Do'],['mix','✎ Change'],['cut','✕ Skip']], OK=[['pick','✓ Good'],['mix','✎ Change']];
  var PRI={1:['Important','#ff9a6a'],2:['Useful','#ffd84a'],3:['Small','#9fd0ff']};
  var card=function(x,kind){ var k='trainrev-'+x.id, v=V(k), p=PRI[x.pri]||null;
    return '<div class="tr-c tr-'+(v||'x')+'"><div class="tr-b"><div class="tr-h">'+(p?'<span class="tr-p" style="--c:'+p[1]+'">'+p[0]+'</span>':'')+'<b>'+esc(x.t)+'</b>'+(x.who?'<span class="tr-who">'+esc(x.who)+'</span>':'')+'</div>'+
      (x.sys?'<p class="tr-sys"><b>What the game does:</b> '+esc(x.sys)+'</p>':'')+(x.how?'<p>'+esc(x.how)+'</p>':'')+(x.was?'<p class="tr-sys">'+esc(x.was)+'</p>':'')+
      (x.when?'<p><b>When:</b> '+esc(x.when)+'</p>':'')+(x.say?'<div class="tr-say">“'+esc(x.say)+'”</div>':'')+(x.why?'<p class="tr-why">'+esc(x.why)+'</p>':'')+'</div>'+
      '<div class="tr-a">'+seg(k,kind==='built'?OK:DO)+note(k,kind==='built'?'Change the words or timing…':'Note…')+'</div></div>'; };
  LAB_TABS.push({ id:'trainrev', name:'Missing lessons',
    blurb:'<b>Round 114c — your two rules are built</b> (lessons wait until the fight is over; one at a time, 20 s apart). <b>Round 114 — a review of what the game never explains.</b> The two bed lessons you described are built: after your first two hearts are gone (once the fight is over), and Oswin\'s own version after your first fall. Below them, two rules for all lessons and '+LTRAIN.MISS.length+' mechanics that are in the game but never taught — each with when, who and the words. ✓ to build, ✎ to change, ✕ to skip.',
    designs:LTRAIN.BUILT.concat(LTRAIN.RULES,LTRAIN.MISS).map(function(x){ return {id:x.id,name:x.t}; }),
    render:function(){ var h=LBR.sec('Built — check the words and the timing','the bed lessons from Master Oswin, on every difficulty; and your two rules for every lesson');
      h+=LTRAIN.BUILT.map(function(x){ return card(x,'built'); }).join('');
      h+=LBR.sec('Who teaches','agreed');
      h+=LTRAIN.RULES.map(function(x){ return card(x); }).join('');
      h+=LBR.sec('In the game, never taught','most important first · from reading the game\'s code, file by file');
      h+=LTRAIN.MISS.slice().sort(function(a,b){ return a.pri-b.pri; }).map(function(x){ return card(x); }).join('');
      h+=LBR.sec('Already taught (no change)','for completeness')+'<ul class="tr-kept">'+LTRAIN.KEPT.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul>';
      return h; } });
  document.addEventListener('click',function(e){ var sg=e.target.closest&&e.target.closest('.tr-seg .tr-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn tr-sg'+(x.dataset.v===nv?' on '+nv:''); }); var c=s.closest('.tr-c'); if(c)c.className='tr-c tr-'+(nv||'x'); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.tr-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.tr-c{display:flex;gap:12px;align-items:flex-start;border:1px solid #243246;border-radius:10px;background:#0b121c;padding:10px 12px;margin:8px 0}.tr-c.tr-pick{border-color:#2e7a4a;background:#0c1a14}.tr-c.tr-mix{border-color:#c9a03a}.tr-c.tr-cut{opacity:.5}'+
    '.tr-b{flex:1;font-size:13px;color:#dfe8f2}.tr-b p{margin:4px 0;line-height:1.5}.tr-h{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:15px}.tr-h b{color:#ffe9a8}.tr-who{color:#9fe8ff;font:600 12px "Segoe UI"}.tr-p{font:700 10.5px "Segoe UI";padding:1px 7px;border-radius:9px;border:1px solid var(--c);color:var(--c)}'+
    '.tr-sys{color:#9fb0c8;font-size:12px}.tr-say{background:linear-gradient(180deg,#1f2a36,#0e151d);border:1px solid #6fe3f5;border-radius:9px;padding:8px 12px;margin:6px 0;font:italic 14px/1.5 Georgia,serif;color:#f2ead8}.tr-why{color:#ffd27a;font-size:12px}'+
    '.tr-a{display:flex;flex-direction:column;gap:5px;width:220px;flex:none}.tr-sg{padding:3px 8px;font-size:12px;opacity:.75}.tr-sg.on{opacity:1}.tr-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.tr-sg.on.mix{background:#5a4510;border-color:#ffd84a;color:#fff}.tr-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.tr-n{width:100%;box-sizing:border-box}.tr-kept{font-size:12.5px;color:#c8d4e4}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('trainrev');
  if(typeof LTODO!=='undefined')LTODO.add({id:'trainrev',label:'📚 Missing lessons: check the two bed lessons, then ✓ / ✕ the '+LTRAIN.MISS.length+' proposals',where:'Missing lessons tab',
    done:function(){ return LTRAIN.MISS.every(function(x){ return !!V('trainrev-'+x.id); }); },go:function(){ LTODO.goTo('trainrev','.tr-c',0); }});
})();
