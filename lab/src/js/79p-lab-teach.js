// ═══════════════════════════════════════════════════════════════════════
// ║ 79p-lab-teach.js — round 98: TEACHING THE GAME AND THE QUESTS (Kris: "we need to make some sort of tutorial and better guidance for what
// ║ you need to do within the game … Do the review and ask me basic questions first, and then for any options we need to choose from, let's
// ║ also build out a section in the lab"). Doc 52.
// ║ Answered first (docs/08 › Round 98): Oswin of the guild guides; the Training list is a pause-panel tab (it replaces Controls); "Accept" goes
// ║ (the journal tracks everything; one quest can be tracked); the first minutes are a short guided walk + lesson cards, skippable.
// ║ The options here: how a lesson looks · when lessons pause · the first minutes (three scripts) · Oswin's voice · the journal · tracking a
// ║ quest · the path line on the screen · extras · every lesson (keep / cut / change) · the quest texts (before → after).
// ║ Picks: 'teach-<group>_<id>' (one per group, except extras and lessons), 'teach-les_<n>' (verdict pick/cut/change cycles), notes on each.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var K=function(g,id){ return 'teach-'+g+'_'+id; };
  // ── the groups to choose from (one each) ──
  var KEYS='<span class="tk-k">Shift</span>';
  var G={
   look:{t:'How a lesson looks',s:'☆ one (or note a mix)',o:[
     ['forge','The forge card','The rules pop-up you already know from the forges: the game pauses, a painted picture beside 2–4 numbered steps, the keys (and the touch buttons on a phone), "Got it" and "Don\'t show lessons".',
      '<div class="tm tm-forge"><div class="tm-pic">🛡</div><div><b>The shield</b><ol><li>Hold '+KEYS+' to raise it.</li><li>Blocked hits do a quarter of the damage — sometimes none.</li><li>You walk slowly while it is up.</li></ol><div class="tm-btns"><span>Got it</span><span class="o">Don\'t show lessons</span></div></div></div>'],
     ['rune','Oswin speaks it','The lesson in the rune-stone dialogue box (round 84), in Oswin\'s voice and with his face, typed at talking pace — the game pauses. Feels like the world teaching you, not a menu.',
      '<div class="tm tm-rune"><div class="tm-face">🧙</div><div><b>Master Oswin</b><p>"Hold <span class="tk-k">Shift</span> and your shield takes the blow — most of it, anyway. You\'ll walk like a cart in mud while it\'s up, mind."</p><span class="tm-next">Space ▸</span></div></div>'],
     ['corner','The corner scroll','Slides in at the top right without pausing, stays about 10 s, a click opens the full lesson. Never interrupts a fight — easy to miss.',
      '<div class="tm tm-corner"><div class="tm-scroll"><b>🛡 New: the shield</b><p>Hold <span class="tk-k">Shift</span> to block. Click for more.</p></div></div>'],
     ['point','Point at it','A glowing arrow points at the thing itself (the HUD button, the waystone, the Binder) with one line beside it; no pause. Best for "where", weakest for "how".',
      '<div class="tm tm-point"><div class="tm-thing">🗿</div><div class="tm-arrow">➜</div><div class="tm-tip"><b>A waystone.</b> Tab to wake it — then travel between any you have woken.</div></div>']]},
   gold:{t:'Your first 100 gold — two 50 g tasks from Oswin',s:'☆ two (you start with 0 g; the village shop sells the Iron Sword 40 g and the Wood Shield 25 g — 100 g leaves a potion\'s worth over)',o:[
     ['plot','Goblins in the vegetable plot','<b>Tob the Farmer</b>\'s rows by the north gate are being raided: drive off the 5 goblins (they come back each night until you do). Close to home, short. <b>Teaches:</b> attacking, the first hits, the shield prompt. Paid by Oswin on your return: 50 g.',''],
     ['waystone','Wake the old waystone','"The waystone on the Grasslands road has slept twenty winters." Walk to it, <b>Tab</b> to wake it, and come back by <b>travelling</b> from it to the village stone. No fighting. <b>Teaches:</b> the map pin, waystones and travel. 50 g.',''],
     ['camp','The camp on the east road','A goblin camp sits on the road east of the village (the nearest of the purpose camps). Beat its guards — its chest holds Oswin\'s 50 g (he "lost" it to them). <b>Teaches:</b> camps, chests, that monsters guard things.',''],
     ['net','The fisher\'s net','<b>Old Nell the Fisher</b> at the pier lost her net to the far shore of the lake; two skeletons stand over it. Bring it back. <b>Teaches:</b> following a pin, Tab to pick things up, a ranged foe. 50 g.',''],
     ['pins','Pia\'s pins pay as well','The Tumbler\'s Lesson (by the Rime Spire) gives 50 g on top of the roll — "I juggle for jarls; take it." Further out and a little harder. <b>Teaches:</b> the roll.',''],
     ['bounty','Oswin\'s goblin bounty','5 g a goblin, up to 10 (50 g), anywhere in the Grasslands — the board counts them for you. The freest: fight where you like. <b>Teaches:</b> little new; good for players who just want to go.','']]},
   pause:{t:'When lessons pause the game',s:'☆ one',o:[
     ['big','Big ones pause, small ones don\'t','Systems (sites, forges, spirits, the hearth) pause with the full card; small things (a key, a shop) use the corner scroll.',''],
     ['always','Every lesson pauses','Clear and calm; more interruptions.',''],
     ['never','None pause','Nothing stops play; lessons wait in the Training list. Easy to miss things.','']]},
   first:{t:'The first minutes — the guided walk',s:'☆ one script (about 2 minutes, every step done to go on; "I know how to play" skips it)',o:[
     ['twin','Your twin walks you out','You wake in the Home. Your twin (who stays to study the sagas): "The whole village is waiting — come on!" → <b>move</b> to the door → <b>Tab</b> to open it → on the Green a straw target: <b>attack</b> it (Space) → "Oswin at the guild has been asking for you" → the map opens once, the guild pinned (📍), <b>Q</b> shown → walking in, Oswin takes over.',''],
     ['oswin','Oswin\'s letter','A sealed note on the Home table ("Come to the guild — O."). <b>Tab</b> to read it → <b>move</b> to the door → on the way two prompts (the map, <b>Q</b>) → at the guild Oswin teaches attack and the shield on his practice dummies in the yard, then gives your first tasks.',''],
     ['runa','Elder Runa at the Runestone','You step out of the Home onto the Green; Elder Runa by the Runestone: "The lake gave you to us. Let\'s see what you can do." → <b>attack</b> the training posts → <b>Tab</b> the Runestone (it hums) → "Go to Oswin — he keeps the roads" → map + <b>Q</b> → the guild.','']]},
   voice:{t:'Oswin\'s voice — his first words to you',s:'☆ one tone',o:[
     ['scholar','The stern scholar','"So the lake\'s foundling finally comes to my door. Sit. Every road out of this village is shut by something — a tower, a dungeon, a thing in the dark. I keep the list. You will clear it. Start small: Pia the tumbler lost her pins by the Rime Spire, and the Elven Library to the north-east has three floors of trouble. Come back when you\'ve done either, and I\'ll tell you what\'s next."',''],
     ['warm','The warm grandfather','"There you are! Twenty winters I waited for someone to fill this ledger. Come, come — look here. Pia\'s lost her juggling pins near the Rime Spire, poor thing, and the Elven Library\'s got goblins in the stacks. Help them, and come tell me how it went. I\'ll always know what\'s next."',''],
     ['dry','The dry wit','"Ah. The hero. You\'re shorter than the sagas will say. Here — the guild\'s list of everything that wants killing, finding or fixing. Today: an acrobat\'s pins, a library full of goblins. Tomorrow: the end of the world, probably. Off you go."','']]},
   journal:{t:'The quest journal',s:'☆ one layout (Map & Quests → 📜)',o:[
     ['saga','The Saga + Side quests','Two parts. <b>The Saga</b>: the main road as numbered steps, the one you are on lit, the next two shown, the rest as "???" until you reach them. <b>Side quests</b>: grouped (Islands · Castles · Mage towers · Sky ports · Fairies · the Dragon), each with a SIDE badge; those that feed the Saga say so.',
      '<div class="tj"><div class="tj-col"><h5>The Saga</h5><p class="d">✓ 1 · Unseal the Grasslands\' boss (3 / 3)</p><p class="d">✓ 2 · Free Bram in Silverwood Palace</p><p class="a">▶ 3 · Defeat the Sunken Courtyard\'s guardian</p><p>4 · Free 6 Grasslands spirits (2 / 6)</p><p class="q">5 · ???</p></div><div class="tj-col"><h5>Side quests</h5><p><i>SIDE</i> ⚓ Corsair Isle — a familiar; its trader sells sea-silver (Mira needs it)</p><p><i>SIDE</i> 🏰 Sunflower Château — Petal Step</p><p><i>SIDE</i> 🔮 Rime Spire — Frost spell</p></div></div>'],
     ['realm','Chapters by realm','One chapter per realm (Grasslands, Wetlands…), then The Forges, Muspelheim, Asgard. In each: the main steps first, then that realm\'s side quests with SIDE badges. Closest to today\'s journal.',
      '<div class="tj"><div class="tj-col"><h5>🌿 The Grasslands</h5><p class="d">✓ Unseal the boss (3 / 3)</p><p class="a">▶ Silverwood Palace — free Bram</p><p>Sunken Courtyard — the alligator, the Grovesoul</p><p>Spirits 2 / 6 for the lattice</p><p><i>SIDE</i> Corsair Isle · Sunflower Château · Rime Spire · Sky port</p></div></div>'],
     ['now','Now · Next · Later','Only three blocks: <b>Now</b> (the tracked quest, big), <b>Next</b> (the next three main steps), <b>Later & side</b> (a folded list). The calmest, the least to read.',
      '<div class="tj"><div class="tj-col"><h5>Now</h5><p class="a">▶ Defeat the Sunken Courtyard\'s guardian — 41 tiles SE 📍</p><h5>Next</h5><p>Free 4 more Grasslands spirits · Sólveig\'s lattice · the Wetlands</p><h5>Later & side ▸</h5></div></div>']]},
   track:{t:'Tracking a quest (one at a time, chosen in the journal)',s:'☆ one',o:[
     ['compass','A compass at the top','A thin compass strip along the top of the screen; the tracked quest is a gold marker on it, with its distance.',''],
     ['edge','An arrow at the screen\'s edge','When the quest is off screen, a gold arrow sits at the edge pointing to it; on screen, a pin floats over it.',''],
     ['mini','On the minimap','A gold arrow on the minimap\'s rim (the minimap you already have); nothing else on the screen.',''],
     ['none','Pins only','No compass; the map\'s numbered pins are enough.','']]},
   path:{t:'"Next on your path" outside the map',s:'☆ one',o:[
     ['hud','A line under the minimap','One short line, always there ("Free 4 more Grasslands spirits"); a click opens the map at it.',''],
     ['toast','A banner when it changes','When a step is done: "✓ Bram is free — next: the Sunken Courtyard", for a few seconds; nothing on screen otherwise.',''],
     ['map','Only in the map','As today.','']]}
  };
  // ── extras (any) ──
  var EX=[['level','Suggested level on each pin','red when you are under it (the realms\' caps 5 / 10 / 15 / 20)'],
    ['banner','A "quest complete" banner','what it opened: "the Wetlands are open", "Mira\'s workshop is open"…'],
    ['rumour','Oswin\'s rumours mark the map','a faint ring where a castle isle or mage tower lies, until you find it'],
    ['showme','"Show me" in the Training list','a short demo or the place lit on the map'],
    ['diff','More lessons on Hearthside','Ragnarök shows only the systems; Hearthside also repeats a reminder if you seem stuck'],
    ['stuck','"Stuck?" from Oswin','if nothing on the main road has moved for 20 minutes of play, Oswin\'s next visit (or the twin) gives a stronger hint']];
  // ── the lessons (doc 52 §4) ──
  var LES=[['Moving, attacking, Tab','the first steps after the opening','the guided walk'],['The pause panel, the map, "Next on your path"','leaving the Home the first time','card + the map opens once'],
    ['The guild and quests','entering the guild','Oswin speaks'],['Shops, gold, selling','the first shop','card'],['Resting and the tavern cup','low health in the village / the tavern','card'],
    ['The shield (Shift)','the first hard hit','card'],['Bow, ammo, change ammo (Ctrl, C)','buying the first bow','card'],['Monsters guard camps','the first camp near you','card'],
    ['Treasure sites unseal the boss','the first adventure site door','card'],['Inside a site: fog, stairs, the chase, the mob at the stairs','the first floor','card (like the forge rules)'],
    ['Potions and food (P, O)','the first potion or food picked up','card'],['Levels and the realm\'s cap','the first level-up / reaching a cap','card'],['Death and its cost','the first death','a line on the death pop-up'],
    ['The roll (Alt)','Pia\'s lesson done','card + a short practice'],['Elements: weak and resist','the first weak or resisted hit','card (replaces the toast)'],['Waystones and travel','the first waystone','card'],
    ['Bindstones and spirits','the first Binder','card'],['The Glimmerhall and lattices','the first Soulglass shard','Sólveig'],['Familiars (N) and the fairies','the first familiar','card + the first fairy'],
    ['Digging (G)','the first fairy errand','card'],['Skills (Z)','the first castle','card'],['Spells and mana (X, Shift+P)','the first spell','card'],['Mounts (M) and crossing terrain','the first mount','card'],
    ['Mira\'s trays: metal + soul gem','the first castle cleared','Mira'],['The forge tree, the jeweller, the apothecary','entering each the first time','card'],['The boss ward (fight close)','the first boss','card (replaces the toast)'],
    ['Sky ports','the first sky port','card'],['The forges: heat, the hearth, Heartglass','the first forge','the forge rules (they join the list)'],['The great hearth: the staff + four Heartglasses','the forges rising','Oswin + the twin'],
    ['Godsbane (V)','your twin\'s lesson','card'],['The Bifröst and Asgard','Asgard comes down','the twin']];
  var LV=[[null,'·'],['pick','✓ Keep'],['change','✎ Change'],['cut','✕ Cut']];
  // ── the quest texts (doc 52 §6): before → after ──
  var QT=[['Section 1: Grasslands','The Grasslands'],
    ['Tower Rescue — "free the captive craftsman. Reward: next region + 2 rings."','Free Bram — "Climb Silverwood Palace and free Bram the Builder; his bridge opens the Wetlands. Also: 2 rings, and the village grows."'],
    ['Dungeon Crawl — "Reward: mount + gold."','The Sunken Courtyard — "Defeat its guardian: the alligator (crosses the Wetlands\' water) and the Grovesoul — the great spirit\'s gem Mira needs."'],
    ['Island Expedition — "Reward: a familiar."','SIDE · Corsair Isle — "A familiar. The island\'s trader sells sea-silver, which Mira needs for the Grasslands tray."'],
    ['Sky Exploration — "Reward: pick a weapon, sky mount or gem."','SIDE · The sky port — (the reward to be checked against what the sky port gives now: fliers; all four → the Sky Eagle)'],
    ['(the path ends) "Muspelheim, the Spirit Saga and beyond — see the Quest journal"','Each step named to the end: "The Cinder Forge — its hearth needs the Wetlands lattice and tray" · "The apothecary\'s Sovereign staff (6,000 g) — the great hearth needs it" · "Set the Lodestar in the pier\'s notch" …'],
    ['The Tumbler\'s Lesson (journal only)','Oswin\'s first task, pinned on the map near the Rime Spire']];
  var cardHTML=function(g,o){ var k=K(g,o[0]), on=V(k)==='pick';
    return '<article class="tc'+(on?' on':'')+'"><b>'+o[1]+'</b><p>'+o[2]+'</p>'+(o[3]?'<div class="tc-m">'+o[3]+'</div>':'')+'<div class="tc-a"><button class="vbtn tc-pk" data-g="'+g+'" data-id="'+o[0]+'" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button></div>'+
      '<textarea class="mn-notes tc-n" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></article>'; };
  var grp=function(g){ var D=G[g]; return LBR.sec(D.t,D.s)+'<div class="tc-grid'+(g==='first'||g==='voice'?' wide':'')+'">'+D.o.map(function(o){ return cardHTML(g,o); }).join('')+'</div>'; };
  var lesRow=function(L,i){ var k='teach-les_'+(i+1), v=V(k), lab=(LV.find(function(x){ return x[0]===v; })||LV[0])[1];
    return '<tr class="tl-'+(v||'x')+'"><td>'+(i+1)+'</td><td><b>'+esc(L[0])+'</b></td><td>'+esc(L[1])+'</td><td>'+esc(L[2])+'</td><td><button class="vbtn tl-v" data-k="'+k+'">'+lab+'</button></td><td><input class="tl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; };
  var answered='<div class="ta"><b>Answered first (docs/08 › Round 98):</b> <span>🧙 Master Oswin of the guild guides you</span><span>📚 a <b>Training</b> tab in the pause panel (it replaces Controls)</span><span>✕ "Accept" goes — the journal tracks every quest; you can track one</span><span>🚶 a short guided walk + lesson cards, skippable</span></div>';
  LAB_TABS.push({ id:'teach', name:'Training & quests',
    blurb:'<b>Round 98 — teaching the game, and the quests that carry you.</b> New at the top: <b>your first 100 gold</b> — ☆ two of Oswin\'s 50 g tasks (sword + shield). The review is doc 52 (what the game asks of you, what teaches today, what is missing, every quest checked). Your four answers are in; below are the choices left: how a lesson looks, the first minutes, Oswin\'s voice, the journal, tracking — and every lesson and quest text to keep, change or cut.',
    designs:[].concat.apply([],Object.keys(G).map(function(g){ return G[g].o.map(function(o){ return {id:g+'_'+o[0],name:G[g].t+': '+o[1]}; }); })).concat(EX.map(function(x){ return {id:'ex_'+x[0],name:'Extra: '+x[1]}; })).concat(LES.map(function(L,i){ return {id:'les_'+(i+1),name:'Lesson '+(i+1)+': '+L[0]}; })).concat([{id:'qt_all',name:'The quest texts'}]),
    render:function(){ var nEx=EX.filter(function(x){ return V(K('ex',x[0]))==='pick'; }).length;
      return answered+grp('gold')+grp('look')+grp('pause')+grp('first')+grp('voice')+grp('journal')+grp('track')+grp('path')+
        LBR.sec('Extras','☆ any ('+nEx+' picked)')+'<div class="tc-grid">'+EX.map(function(x){ return cardHTML('ex',[x[0],x[1],x[2],'']); }).join('')+'</div>'+
        LBR.sec('Every lesson — when it is taught and how','click the button to cycle ✓ Keep · ✎ Change · ✕ Cut; a note says what to change (doc 52 §4)')+
        '<table class="tl"><thead><tr><th>#</th><th>Lesson</th><th>Taught when</th><th>How</th><th></th><th></th></tr></thead><tbody>'+LES.map(lesRow).join('')+'</tbody></table>'+
        LBR.sec('The quest texts — before → after','the journal, the map\'s path line and the side-quest badges (doc 52 §6)')+
        '<table class="tq"><tbody>'+QT.map(function(q){ return '<tr><td>'+esc(q[0])+'</td><td>→</td><td>'+esc(q[1])+'</td></tr>'; }).join('')+'</tbody></table>'+
        (function(){ var k=K('qt','all'), on=V(k)==='pick'; return '<div class="tc-a"><button class="vbtn tc-pk" data-g="qt" data-id="all" aria-pressed="'+on+'">'+(on?'★ Approved':'☆ Approve these')+'</button></div><textarea class="mn-notes tc-n" data-k="'+k+'" rows="2" placeholder="Notes on the quest texts…">'+esc(P(k).notes||'')+'</textarea>'; })(); } });
  var single=function(g){ return g!=='ex'&&g!=='qt'&&g!=='gold'; };
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.tc-pk'); if(b){ var g=b.dataset.g, id=b.dataset.id, k=K(g,id), was=V(k)==='pick';
      if(single(g)&&G[g])G[g].o.forEach(function(o){ var k2=K(g,o[0]); if(k2!==k&&V(k2)==='pick'){ LabApp.picks[k2].verdict=null; LabApp.persist(k2); } });
      var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=was?null:'pick'; LabApp.persist(k);
      document.querySelectorAll('.tc-pk').forEach(function(x){ var on=V(K(x.dataset.g,x.dataset.id))==='pick'; x.setAttribute('aria-pressed',String(on)); x.textContent=on?(x.dataset.g==='qt'?'★ Approved':'★ Picked'):(x.dataset.g==='qt'?'☆ Approve these':'☆ Pick'); var c=x.closest('.tc'); if(c)c.classList.toggle('on',on); }); return; }
    var lv=e.target.closest&&e.target.closest('.tl-v'); if(lv){ var k3=lv.dataset.k, cur=V(k3), i=LV.findIndex(function(x){ return x[0]===cur; }), nx=LV[(i+1)%LV.length];
      var p3=LabApp.picks[k3]=LabApp.picks[k3]||{}; p3.verdict=nx[0]; LabApp.persist(k3); lv.textContent=nx[1]; lv.closest('tr').className='tl-'+(nx[0]||'x'); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.tc-n,.tl-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent=
    '.ta{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;padding:10px 14px;margin:4px 0 14px;border:1px solid #2a5a3a;border-radius:10px;background:rgba(40,90,60,.12);color:#cfe8d6;font:13px/1.5 "Segoe UI",sans-serif}.ta b{color:#9ff0b0}'+
    '.tc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:12px;margin:6px 0 18px}.tc-grid.wide{grid-template-columns:repeat(auto-fill,minmax(360px,1fr))}'+
    '.tc{background:#0d1420;border:1px solid #24364e;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:6px}.tc.on{border-color:#7fe08a;box-shadow:0 0 0 1px #7fe08a inset}.tc>b{color:#e8f0fa;font:600 15px "Segoe UI",sans-serif}.tc p{color:#a9bbcf;font:13px/1.5 "Segoe UI",sans-serif;margin:0}'+
    '.tc-a{display:flex;gap:8px;margin-top:auto}.tc-pk[aria-pressed="true"]{background:#2a5a3a;border-color:#7fe08a}.tc-n{width:100%}'+
    '.tc-m{background:linear-gradient(160deg,#1b2a1a,#0b1210 60%,#13202a);border-radius:8px;padding:12px;min-height:110px;position:relative;overflow:hidden}'+
    '.tm{color:#f2e8cc;font:13px/1.45 Georgia,serif}.tm b{font:600 14px "Segoe UI",sans-serif;color:#ffe6a8}.tm ol{margin:4px 0 6px 18px;padding:0}'+
    '.tm-forge{display:flex;gap:10px;background:rgba(10,8,6,.88);border:1px solid #b08a40;border-radius:8px;padding:10px}.tm-pic{font-size:42px;line-height:1;align-self:center}.tm-btns span{display:inline-block;margin-right:8px;padding:2px 8px;border:1px solid #b08a40;border-radius:6px;font:12px "Segoe UI"}.tm-btns .o{opacity:.6}'+
    '.tm-rune{display:flex;gap:10px;align-items:flex-start;margin-top:30px;background:rgba(14,22,30,.92);border:1px solid #6fe3f5;border-radius:10px;padding:8px 10px;box-shadow:0 0 14px rgba(111,227,245,.25)}.tm-face{font-size:36px}.tm-rune p{margin:2px 0}.tm-next{float:right;font:11px "Segoe UI";color:#6fe3f5}'+
    '.tm-corner .tm-scroll{position:absolute;top:8px;right:8px;width:62%;background:rgba(40,30,16,.92);border:1px solid #c8a060;border-radius:8px;padding:8px 10px}.tm-corner p{margin:2px 0}'+
    '.tm-point{display:flex;align-items:center;gap:6px;height:100%}.tm-thing{font-size:46px}.tm-arrow{font-size:30px;color:#ffe066;text-shadow:0 0 10px #ffd000;transform:rotate(180deg)}.tm-tip{background:rgba(10,10,10,.85);border:1px solid #ffe066;border-radius:8px;padding:6px 8px}'+
    '.tk-k{display:inline-block;padding:0 6px;border:1px solid #c8b080;border-bottom-width:2px;border-radius:4px;font:600 11px "Segoe UI";color:#fff}'+
    '.tj{display:flex;gap:10px;font:12px/1.4 "Segoe UI",sans-serif;color:#d8e2ee}.tj-col{flex:1;background:rgba(8,12,18,.85);border:1px solid #33465e;border-radius:8px;padding:6px 8px}.tj h5{margin:2px 0 4px;color:#ffe6a8;font:600 12px "Segoe UI"}.tj p{margin:2px 0}.tj .d{opacity:.55}.tj .a{color:#fff35a}.tj .q{opacity:.4}.tj i{font-style:normal;font-size:10px;padding:0 4px;border:1px solid #8aa0b8;border-radius:4px;color:#8aa0b8;margin-right:4px}'+
    '.tl,.tq{width:100%;max-width:1200px;border-collapse:collapse;margin:6px 0 18px;font:13px/1.4 "Segoe UI",sans-serif;color:#c8d6e6}.tl th{text-align:left;color:#8aa0b8;font-weight:600;padding:4px 6px;border-bottom:1px solid #24364e}.tl td,.tq td{padding:5px 6px;border-bottom:1px solid #18243a;vertical-align:top}'+
    '.tl-pick td{background:rgba(60,140,80,.10)}.tl-change td{background:rgba(200,160,40,.10)}.tl-cut td{background:rgba(180,60,60,.12);text-decoration:line-through;text-decoration-color:rgba(255,120,120,.5)}.tl-cut td:nth-child(5),.tl-cut td:nth-child(6){text-decoration:none}'+
    '.tl-n{width:100%;background:#0a111b;border:1px solid #24364e;border-radius:6px;color:#dfe8f2;padding:3px 6px}.tl-v{min-width:92px}.tq td:first-child{color:#8aa0b8;width:42%}.tq td:nth-child(2){width:24px;color:#6fe3f5}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('teach');
  var picked=function(g){ return G[g].o.some(function(o){ return V(K(g,o[0]))==='pick'; }); };
  if(typeof LTODO!=='undefined'){
    LTODO.add({id:'teachlook',label:'📚 Training & quests: how lessons look, when they pause, the first minutes, Oswin\'s voice',where:'Training & quests tab · top',done:function(){ return ['look','pause','first','voice'].every(picked); },go:function(){ LTODO.goTo('teach','.tc-grid',1); }});
    LTODO.add({id:'teachgold',label:'💰 Your first 100 gold: ☆ two of Oswin\'s 50 g tasks',where:'Training & quests tab · top',done:function(){ return G.gold.o.filter(function(o){ return V(K('gold',o[0]))==='pick'; }).length>=2; },go:function(){ LTODO.goTo('teach','.tc-grid',0); }});
    LTODO.add({id:'teachjournal',label:'📜 Training & quests: the journal, tracking, the path line',where:'Training & quests tab · middle',done:function(){ return ['journal','track','path'].every(picked); },go:function(){ LTODO.goTo('teach','.tc-grid',5); }});
    LTODO.add({id:'teachles',label:'✓ Training & quests: the 31 lessons and the quest texts (keep · change · cut)',where:'Training & quests tab · bottom',done:function(){ return LES.every(function(L,i){ return !!V('teach-les_'+(i+1)); })&&!!V(K('qt','all')); },go:function(){ LTODO.goTo('teach','.tl',0); }}); }
})();
