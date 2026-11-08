// ═══════════════════════════════════════════════════════════════════════
// ║ 21t-lessons.js — round 100: THE LESSONS AND THE TRAINING TAB (doc 52; Kris's picks, Lab → Training & quests).
// ║  · 31 lessons, each taught the first time it matters (the triggers below), in Master Oswin's voice (the stern scholar), in the rune-stone
// ║    dialogue box — the game pauses for every one (pick: "every lesson pauses"). Under the words: "Don't show lessons" (Kris: "make sure to
// ║    also have the option for 'don't show lessons' … and have a place in the pause tabs to re-enable lessons").
// ║  · Every lesson taught (or met with lessons off) goes into the TRAINING tab of the pause panel (it replaces Controls): the lessons you have
// ║    met, the ones still to come as ??? with where they are taught, every key (keyboard and touch), "Show lessons as they come" on/off, and
// ║    the old Controls page (difficulty, save, main menu) one click away.
// ║  · Difficulty (extra "More lessons on Hearthside"): Ragnarök shows only the big systems (the rest go quietly into Training); Hearthside
// ║    also repeats "Next on your path" as a reminder when the road has not moved for a while (21u ZOSW.stuck).
// ║  · An old save: everything it has already done counts as taught (quietly) — no flood of lessons.
// ║ Switch: ZLES.on (the test suites turn it off; tests/harness.py).
// ═══════════════════════════════════════════════════════════════════════
var ZLES={ on:true, NAME:'Master Oswin', ID:'npc_guild',
  // id, title, keys (keyboard · touch), big (shown on Ragnarök too), when (for the ??? hint), the words
  L:[
   ['move','Moving, attacking and Tab','WASD / arrows · ⚔ Space · Tab — touch: the stick, ⚔, ✋',1,'the first steps after the opening','Walk with W A S D or the arrows. Space swings your sword. Tab does everything else — talk, open, enter, take. On a phone: the stick on the left, ⚔ and ✋ on the right.'],
   ['map','The pause panel, the map and the path','Esc · Q map · B map — touch: ☰',1,'leaving your Home the first time','Esc opens the pause panel: the map, your pack, the Tome, this Training. Q opens the map. Under the little map in the corner stands the next step on your path — follow it when in doubt.'],
   ['guild','The guild and your quests','Q · the journal (📜)',1,'entering the guild','Every quest you hear of is written in your journal by itself — the Saga in order, the side quests below it. Choose one to track and an arrow on the little map points the way.'],
   ['shop','Shops, gold and selling','Tab at the keeper',0,'the first shop you walk into','Shops buy what you no longer need and sell what you do. The village shop keeps an iron sword and a wood shield — a beginner\'s first coin goes there.'],
   ['rest','Resting and the tavern','Tab at the bed · the tavern keeper',0,'resting or the tavern the first time','Sleep at your Home to mend for nothing. The tavern fills a cup that heals and lends you strength for a while.'],
   ['shield','The shield','Shift (hold) — touch: 🛡 (hold)',1,'the first hard blow you take','Hold Shift and your shield takes the blow — most of it, sometimes all. You walk like a cart in mud while it is up. No shield in your hand, no block.'],
   ['bow','The bow and its arrows','Ctrl shoot · C change arrows — touch: 🏹',0,'your first bow','Ctrl looses an arrow; C changes which arrows you nock. Arrows are bought at the armoury — a bow without them is a stick.'],
   ['camp','Camps','—',0,'the first camp you come near','Two of every three monsters guard something: a fire, a chest, a well, a shrine. Beat every guard and it is yours. Food and wells come back; chests do not.'],
   ['sites','Treasure sites and the boss','Tab at the door',1,'the first adventure site you reach','Each realm\'s boss tower and boss dungeon stay sealed until its three treasure sites are cleared. The path under your map counts them.'],
   ['inside','Inside a site','Tab at the stairs',1,'your first floor below ground','Below ground the dark hides the rooms until you walk them. Find the stairs down. Monsters give chase — and if too many crowd the stairs, they will not let you pass. Thin them first.'],
   ['potion','Potions and food','P drink · O eat — touch: ≡ More',0,'your first potion or food','P drinks the potion you carry, O eats your food. Food heals slowly over time; a potion at once.'],
   ['level','Levels and the realm\'s cap','—',0,'your first level',"Each fight teaches you. But every realm holds you back at its cap — five, ten, fifteen, twenty — until its master builder is free and the next realm opens."],
   ['death','Death and its price','—',1,'the first time you fall','Fall and you wake in the village with a quarter of your health, and a tenth of your gold gone. Nothing else is lost.'],
   ['roll','The roll','Alt — touch: 🤸',1,'learning it from Pia','Alt throws you three paces the way you are moving. Nothing touches you while you tumble — then you need a breath before the next.'],
   ['elements','Elements: weak and resist','the Tome → Elements',1,'your first weak or resisted blow','Water beats fire, fire beats grass, grass beats earth, earth beats water; storm and shadow bite each other. Hit a weakness and the number flares; hit a resistance and it fades. The Tome shows each beast\'s.'],
   ['waystone','Waystones and travel','Tab at a waystone',1,'Elder Runa shows you','Tab wakes a waystone. From any waystone you can travel to every one you have woken — the village stone is always awake.'],
   ['binder','Bindstones and spirits','—',1,'your first Binder','The dead of Runeheim are chained to bindstones. Beat the Binder and the spirit goes free — and leaves you a shard of soulglass.'],
   ['glimmer','The Glimmerhall and lattices','Tab at Sólveig',1,'your first shard of soulglass','Six shards of one realm make its lattice. Sólveig the Glasswright fuses them in the Glimmerhall, when it stands on the Green. The forges will need all four.'],
   ['familiar','Familiars and the fairies','N choose — touch: ≡ More',0,'your first familiar','N chooses which familiar fights beside you. The fairies by the waystones teach it new skills, one errand at a time.'],
   ['dig','Digging','G (outdoors)',0,'the fairies\' errands','G digs where you stand. The fairies hide what they want under rune spaces — the Tome\'s quest page and the sparkles show where.'],
   ['skill','Skills','Z — touch: 💥',0,'your first skill','Z uses your special skill. The masters held in the island castles teach them — one each.'],
   ['spell','Spells and mana','X cast · Shift+P mana — touch: ✨',0,'your first spell','X casts the spell in your tome. Spells drink mana; it comes back on its own, or from a mana draught (Shift and P).'],
   ['mount','Mounts and crossing','M — touch: ≡ More',0,'your first mount','M gets you on or off. Each boss dungeon\'s mount crosses the ground of the next realm — swamp, scree, ash. Choose which one at the stables.'],
   ['mira','Mira\'s hearth trays','Tab at Mira',1,'Mira\'s workshop opening','Mira forges a hearth tray for each realm from two things: the realm\'s metal, sold by the trader on its familiar island, and its soul gem, which the boss dungeon\'s great spirit gives you. The forges will need all four.'],
   ['crafts','The forge, the jeweller, the apothecary','Tab at the keeper',0,'the first of them you walk into','The blacksmith forges weapons up a tree of tiers — more opens as the realms open. The jeweller sets gems. The apothecary sells potions and works staffs up to the Sovereign staff.'],
   ['ward','Bosses ward off spells from afar','—',1,'your first boss','Bosses shrug off much of what you cast from far away. Fight them close.'],
   ['sky','Sky ports','Tab at the sky port',0,'your first sky port','Captain Vela\'s sky ports send you up to defend a city in the clouds, wave after wave. Win and the port\'s flying mount is yours.'],
   ['forges','The forges','? Rules on the heat bar',1,'the forges rising','Four forges rise off the coasts, each opening the next. Heat climbs as you go down — cool it at the troughs. At each forge\'s hearth, the realm\'s lattice in its tray becomes its Heartglass.'],
   ['hearth','The great hearth','—',1,'your first forge won','At Muspelheim\'s great hearth you will need the Sovereign staff from the apothecary — six thousand gold, start saving — and all four Heartglasses. Together they make the Lodestar.'],
   ['godsbane','Godsbane','V — touch: ✦',1,'your twin finds the word','V speaks Godsbane through the Lodestar. Only it can break what the false god made.'],
   ['asgard','The Bifröst and Asgard','Tab at the notch',1,'Asgard coming down','Asgard rests on the lake now. The Lodestar fits the notch at the end of the pier — once it knows its word.']],
  ps:function(){ try{ var ws=game.scene.getScene('World'); return ws&&ws.playerState; }catch(e){ return null; } },
  seen:function(ps){ return ps.lessons||(ps.lessons={}); },
  byId:function(id){ return ZLES.L.find(function(x){ return x[0]===id; }); },
  off:function(ps){ return !ZLES.on||!!(ps&&ps.lessonsOff); },
  // mark as taught; show it unless lessons are off (or it is small and this is Ragnarök)
  teach:function(id,quiet){ var ps=ZLES.ps(), L=ZLES.byId(id); if(!ps||!L)return false; var S=ZLES.seen(ps); if(S[id])return false; S[id]=Date.now();
    if(quiet||ZLES.off(ps)||(+ps.difficulty===3&&!L[3])||typeof ZDLG==='undefined'||!ZDLG.on)return false;
    ZDLG.say(ZLES.NAME,L[5],{id:ZLES.ID,icon:'📜',extra:[{t:'Got it',f:function(){}},{t:'Don\'t show lessons',f:function(){ ps.lessonsOff=1; showNotif('📚 Lessons off — turn them back on in the pause panel → Training.','#cfe8ff'); }}]});
    return true; },
  // ── the triggers, every ~0.8 s ──
  _hp:null, _t:0,
  scene:function(){ try{ var a=game.scene.getScenes(true).filter(function(s){ return ['World','Dungeon','Building','Island','Sky'].indexOf(s.sys.settings.key)>=0; }); return a[a.length-1]||null; }catch(e){ return null; } },
  tick:function(){ try{ if(!ZLES.on||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'), ps=ws&&ws.playerState; if(!ps||!ws.player)return;
    if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; if(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())return;
    var S=ZLES.seen(ps), has=function(fn){ return (ps.inventory||[]).some(function(i){ var I=ITEMS[i]; return I&&fn(i,I); }); }, T=function(id,c){ if(!S[id]&&c)ZLES.teach(id); };
    // an old save: what it has done counts as taught, quietly
    if(!ps._lesInit){ ps._lesInit=1; if(!ws._newGame){ ZLES.L.forEach(function(L){ if(ZLES.cond(L[0],ws,ps))S[L[0]]=S[L[0]]||1; }); ['move','map','guild','shop','rest','camp','sites'].forEach(function(id){ if((ps.level||1)>1)S[id]=S[id]||1; }); } return; }
    var sc=ZLES.scene(), key=sc&&sc.sys.settings.key, B=key==='Building'?sc.building:null;
    // a hard blow: a quarter of your health in one go
    var hp=ps.hp, mx=ps.maxHp||30; if(ZLES._hp!==null&&ZLES._hp-hp>=mx*0.22&&hp>0)T('shield',1); ZLES._hp=hp;
    if(B){ T('shop',/^(shop|armory|clothing|merchant)$/.test(B.type)); T('rest',/^(tavern|house)$/.test(B.type)); T('crafts',/^(forge|jeweler|apothecary)$/.test(B.type)); }
    if(key==='Dungeon'&&sc._ready)T('inside',1); if(key==='Sky')T('sky',1);
    ZLES.L.forEach(function(L){ if(!S[L[0]]&&ZLES.auto[L[0]]&&ZLES.cond(L[0],ws,ps,sc))T(L[0],1); });
    if(S.familiar&&!S.dig&&Date.now()-S.familiar>90000)T('dig',1);
  }catch(e){ if(!ZLES._err){ ZLES._err=1; console.warn('lessons',e); } } },
  auto:{bow:1,camp:1,sites:1,potion:1,level:1,roll:1,elements:1,binder:1,glimmer:1,familiar:1,skill:1,spell:1,mount:1,mira:1,ward:1,forges:1,hearth:1,godsbane:1,asgard:1,death:1,waystone:1},
  cond:function(id,ws,ps){ var inv=ps.inventory||[], has=function(fn){ return inv.some(function(i){ var I=ITEMS[i]; return I&&fn(i,I); }); }, P=ws&&ws.player, near=function(x,y,r){ return P&&Math.hypot(P.x-x,P.y-y)<r*TILE; };
    switch(id){
      case 'move': case 'map': case 'guild': return (ps.level||1)>1;
      case 'bow': return !!(ps.equip&&ps.equip.rHand)||has(function(i,I){ return I.slot==='rHand'; });
      case 'camp': return (ws._camps||[]).some(function(C){ return C.state==='guarded'&&near(C.x,C.y,9); });
      case 'sites': return (ws.sites||[]).some(function(s){ return (s.bonus||s.boss)&&near(s.tx*TILE+TILE*1.5,s.ty*TILE+TILE*1.5,5); });
      case 'potion': return has(function(i,I){ return I.slot==='use'||I.slot==='food'||/food/.test(I.slot||''); });
      case 'level': return (ps.level||1)>=2;
      case 'death': return !!ZLES._died;
      case 'roll': return !!ps.canRoll;
      case 'elements': return !!(ps.seenEl&&(ps.seenEl.weak||ps.seenEl.res));
      case 'ward': return !!(ps.seenEl&&ps.seenEl.ward);
      case 'waystone': return (ps.activatedWaystones||[]).length>1;
      case 'binder': return (ws.worldMonsters||[]).some(function(m){ return m&&!m.dead&&m._binder&&near(m.x,m.y,10); })||(ps.spiritsFreed||[]).length>0;
      case 'glimmer': return has(function(i){ return /^soulglass_\d/.test(i); })||(ps.spiritsFreed||[]).length>0;
      case 'familiar': return (ps.ownedFamiliars||[]).length>0;
      case 'skill': return (ps.castlesDone||[]).length>0||(ps.skills||[]).length>0;
      case 'spell': return !!(ps.equip&&ps.equip.spell);
      case 'mount': return (ps.ownedMounts||[]).length>0;
      case 'mira': return typeof ZMIRA!=='undefined'&&ZMIRA.open(ps);
      case 'forges': return typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps);
      case 'hearth': return (ps.forgesDone||[]).length>=1;
      case 'godsbane': return !!ps.godsbane;
      case 'asgard': return !!ps.asgardDown;
      case 'shield': case 'shop': case 'rest': case 'crafts': case 'inside': case 'sky': case 'dig': return (ps.level||1)>3;
    } return false; },
  // ── the Training tab ──
  KEYS:[['Move','W A S D / arrows','the stick'],['Attack','Space','⚔'],['Talk · open · enter · take','Tab','✋'],['Shield (hold)','Shift','🛡'],['Roll','Alt','🤸'],['Bow','Ctrl','🏹'],['Change arrows','C','—'],
    ['Spell','X','✨'],['Skill','Z','💥'],['Godsbane','V','✦'],['Potion · mana · throw a flask','P · Shift+P · hold P','≡ More'],['Food','O','≡ More'],['Mount','M','≡ More'],['Familiar','N','≡ More'],['Dig','G','—'],
    ['Map & quests','Q · B','🗺'],['Inventory','I','🎒'],['Tome','T','📖'],['Pause panel','Esc','☰']],
  panel:function(){ var o=document.getElementById('modal-training'); if(!o){ o=document.createElement('div'); o.className='overlay'; o.id='modal-training'; o.style.display='none'; o.onclick=function(){ o.style.display='none'; if(typeof ZPAUSE!=='undefined')ZPAUSE.sync(); }; document.body.appendChild(o); }
    var ps=ZLES.ps()||{}, S=ZLES.seen(ps), sel=ZLES._sel&&S[ZLES._sel]?ZLES._sel:(ZLES.L.find(function(L){ return S[L[0]]; })||[null])[0], esc=function(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;'); };
    var n=ZLES.L.filter(function(L){ return S[L[0]]; }).length, cur=ZLES.byId(sel);
    o.innerHTML='<div class="modal ztr" onclick="event.stopPropagation()"><div class="mhdr"><h2>📚 Training</h2><span class="ztr-n">'+n+' / '+ZLES.L.length+' lessons</span></div>'+
      '<div class="ztr-top"><label><input type="checkbox" class="ztr-on"'+(ps.lessonsOff?'':' checked')+'> <b>Show lessons as they come</b> <small>(Master Oswin, the game paused)</small></label><button class="ztr-ctl">⚙ Difficulty · save · main menu</button></div>'+
      '<div class="ztr-body"><div class="ztr-list">'+ZLES.L.map(function(L,i){ var on=!!S[L[0]]; return '<button class="ztr-i'+(on?'':' q')+(L[0]===sel?' sel':'')+'" data-l="'+L[0]+'"'+(on?'':' disabled')+'><span>'+(i+1)+'</span>'+(on?esc(L[1]):'??? <small>'+esc(L[4])+'</small>')+'</button>'; }).join('')+
      '<button class="ztr-i'+(sel==='keys'?' sel':'')+'" data-l="keys"><span>⌨</span>All keys</button></div>'+
      '<div class="ztr-d">'+(ZLES._sel==='keys'||!cur?'<h3>All keys</h3><table class="ztr-k"><tr><th></th><th>Keyboard</th><th>Touch</th></tr>'+ZLES.KEYS.map(function(k){ return '<tr><td>'+k[0]+'</td><td><b>'+k[1]+'</b></td><td>'+k[2]+'</td></tr>'; }).join('')+'</table>':
        '<h3>'+esc(cur[1])+'</h3><div class="ztr-say"><b>Master Oswin:</b> “'+esc(cur[5])+'”</div><div class="ztr-keys">'+esc(cur[2])+'</div><div class="ztr-when">Taught: '+esc(cur[4])+'</div>')+'</div></div></div>';
    o.querySelectorAll('.ztr-i').forEach(function(b){ b.onclick=function(){ ZLES._sel=b.dataset.l; ZLES.panel(); }; });
    o.querySelector('.ztr-on').onchange=function(e){ ps.lessonsOff=e.target.checked?0:1; };
    o.querySelector('.ztr-ctl').onclick=function(){ o.style.display='none'; if(typeof toggleModal==='function')toggleModal('controls'); if(typeof ZDiff!=='undefined'&&ZDiff.render)ZDiff.render(); if(typeof ZPAUSE!=='undefined')ZPAUSE.sync(); };
    o.style.display='flex'; if(typeof ZPAUSE!=='undefined')ZPAUSE.sync(); },
  css:function(){ var st=document.createElement('style'); st.textContent=
    '.ztr{width:min(980px,94vw);max-height:86vh;display:flex;flex-direction:column}.ztr .mhdr{display:flex;align-items:center;gap:12px}.ztr-n{color:#9fb0c8;font:13px "Segoe UI"}'+
    '.ztr-top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:6px 4px 10px;border-bottom:1px solid rgba(255,255,255,.1);color:#dfe8f2;font:14px "Segoe UI"}.ztr-top small{color:#9fb0c8}'+
    '.ztr-ctl{font:600 12px "Segoe UI";padding:5px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.3);background:rgba(20,28,40,.8);color:#dfe8f2;cursor:pointer}'+
    '.ztr-body{display:flex;gap:14px;min-height:0;flex:1;overflow:hidden;padding-top:10px}.ztr-list{width:300px;overflow:auto;display:flex;flex-direction:column;gap:3px;flex:none}'+
    '.ztr-i{text-align:left;font:13px/1.3 "Segoe UI";padding:6px 8px;border-radius:7px;border:1px solid transparent;background:rgba(255,255,255,.04);color:#e8f0fa;cursor:pointer}.ztr-i span{display:inline-block;width:24px;color:#6fe3f5}.ztr-i.sel{border-color:#6fe3f5;background:rgba(111,227,245,.12)}'+
    '.ztr-i.q{color:#7d8a9a;cursor:default}.ztr-i.q small{display:block;margin-left:24px;color:#66727f}.ztr-d{flex:1;overflow:auto;color:#e7f0fa;font:15px/1.55 "Segoe UI"}.ztr-d h3{margin:2px 0 10px;color:#ffe6a8;font:600 20px "Cinzel",Georgia,serif}'+
    '.ztr-say{background:linear-gradient(180deg,#1f2a36,#0e151d);border:2px solid #6fe3f5;border-radius:10px;padding:12px 14px;margin-bottom:10px}.ztr-keys{color:#9ff0ff;font:600 14px "Segoe UI";margin:6px 0}.ztr-when{color:#9fb0c8;font-size:13px}'+
    '.ztr-k{border-collapse:collapse;width:100%}.ztr-k td,.ztr-k th{padding:5px 8px;border-bottom:1px solid rgba(255,255,255,.08);text-align:left}.ztr-k th{color:#9fb0c8;font-weight:600}'+
    '@media (max-width:700px){.ztr-body{flex-direction:column}.ztr-list{width:auto;max-height:34vh}}';
    document.head.appendChild(st); }
};
setTimeout(function(){
  ZLES.css();
  if(typeof PAUSE_OVERLAYS!=='undefined'&&PAUSE_OVERLAYS.indexOf('modal-training')<0)PAUSE_OVERLAYS.push('modal-training');
  if(typeof _closeAllOverlays==='function'){ var ca0=_closeAllOverlays; _closeAllOverlays=function(){ var r=ca0.apply(this,arguments); var t=document.getElementById('modal-training'); if(t)t.style.display='none'; return r; }; }      /* Esc and Resume close the Training tab too */
  // the Training tab takes Controls' place in the pause panel
  if(typeof ZPAUSE!=='undefined'){ var i=ZPAUSE.TABS.findIndex(function(t){ return t.id==='controls'; }); var T={id:'training',ic:'📚',n:'Training',el:['modal-training','modal-controls'],open:function(){ ZLES.panel(); }}; if(i>=0)ZPAUSE.TABS.splice(i,1,T); else ZPAUSE.TABS.push(T); }
  // the first death: taught after the death pop-up closes
  if(typeof ZDeath!=='undefined'&&ZDeath.run){ var d0=ZDeath.run; ZDeath.run=function(){ ZLES._died=1; return d0.apply(this,arguments); }; }
},0);
setInterval(ZLES.tick,800);
