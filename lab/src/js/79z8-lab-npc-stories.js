// ═══════════════════════════════════════════════════════════════════════
// ║ 79z8-lab-npc-stories.js — round 132: BACKSTORIES FOR EVERYONE ELSE (Kris: "we need to expand the backstories for other NPCs. the first
// ║ thing that comes to mind are the fairies and sprites, but look into all NPCs that don't yet have a deep backstory and make proposals of
// ║ how to expand these"). The 34 villagers have theirs (doc 66). Everyone else who speaks, teaches, gives or fights in the game, group by
// ║ group: who they are today, what the game knows of them, and three ways to give them a real story — with a sample in each group's voice.
// ║ Every proposal keeps the Saga's rules: no god named before freed, nothing on why the twins have their gift, no children before the
// ║ first cry, the Binders never besiege the village.
// ║ Picks: 'npcs2-<group>' {regions:[A|B|C], notes}; 'npcs2-depth' {regions:[how many lines]}; 'npcs2-all'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; };
  // id, icon, group, who (count), what the game has today, [A, B, C] = [name, what it gives, a sample]
  var G=[
   ['fairies','🧚','The waystone fairies','20 fairies, five in each realm (Primrose, Bramble, Clover, Linnet, Sorrel · Lily, Marsh, Ripple, Nixie, Fenna · Flint, Aster, Quartz, Heather, Tor · Ember, Cinder, Ashe, Soot, Pyra), in the four kinds you picked (clover pixie, lily nymph, crystal pixie, cinder pixie).',
     'A look (one line each), a trial each, a name. They teach your familiar its skills — but nobody knows why fairies keep the waystones, or what they did in the thirty-six winters.',
     [['A','The Keepers of the Stones','One shared history and a short tale each. The fairies were set to tend the waystones "when the stones were young"; when the gate shut, the stones went dark and the fairies shrank with them, each into a single flower, puddle, crystal or ember. Your twin\'s first touch on a stone woke the first of them. Each fairy has a one-paragraph tale: what she kept alive alone, what she misses, what she is afraid of.',
       'Sorrel (Grasslands): "Thirty-six winters I slept in a clover. Do you know how small a clover is? I counted its leaves every morning to be sure I was still there. Four. Always four. That is the only reason I am still me."'],
      ['B','Each fairy, a little life','A full backstory for every one of the twenty (about 120 words each), a want and a quirk, and how she changes as her realm heals. Some never slept — Nixie kept the Wetlands\' drowned bells ringing by herself; Ashe hid inside the Ember Wall and has not seen a green thing in her life.',
       'Ashe (Ashlands): "Green? Like … moss? I have read of moss. A skald dropped a book once and I read all of it, nine hundred times. Is it soft? Do not tell me. I want to touch it first."'],
      ['C','Woven into the forty spirits','Each fairy kept watch over one bound spirit near her stone and remembers who they were: she gives you their name and their first memory before you free them, and is there when they rise. The fairy errands become the way the Homecomings saga starts in each realm.',
       'Linnet: "The stone by the old mill holds Asa. She wove the banner over the Green — the one with the hole in it. I sang to her every night so she would not forget the tune she wove to. Bring her home and she will tell you the rest."']]],
   ['monarchs','👑','The fairy monarchs','The three you picked — Nerissa, Queen of the Mere (Wetlands), Cairnwyn, King of the Peaks (Highlands), Pyrrhus, King of the Embers (Ashlands) — and six more designs (Oberyn, Aldmere, Thyra, Hallvard, Vulcara, Cindra).',
     'A title, a look, three trials and a feast you are still to build. No court, no history, no reason they test you.',
     [['A','The Old Courts','Each realm had a fairy court before the gate shut; each monarch held hers together through the Long Quiet in her own way — Nerissa by keeping her court asleep under the mere, Cairnwyn by turning his to crystal so it would last, Pyrrhus by burning bright enough to keep the ash off a single glade. Their trials test whether you are worth waking the rest for.',
       'Nerissa: "My court sleeps under the mere. Every year I wake one, and every year I put them back to bed, because there was nothing to wake them to. Show me there is something now."'],
      ['B','The Monarchs\' Pact','The four courts made a pact the night the gate shut — never to speak of what they saw that night — and each keeps a quarter of the truth. As you win each monarch, the Tome gains their quarter; together they hint at the masked one (never naming a god before he is freed).',
       'Cairnwyn: "I saw the light go out over the lake. I will tell you which way it went. Not what it was. Pyrrhus saw the rest. Ask him — if he is still speaking to me."'],
      ['C','Rivals at the feast','A lighter, funnier take: the monarchs are old rivals; the fairy feast (still to build) is where they finally sit at one table, and their backstories are the grudges you sort out on the way — who stole whose rain, who froze whose river.',
       'Pyrrhus: "Nerissa put out my candles in the year of the long rain. All of them. On my name-day. I have not forgotten and I will not forgive, but I will sit at her table if you make her pass the salt first."']]],
   ['familiars','🦌','The familiars (the spirit beasts)','Four: the Thornback Stag (grass), the Tide Serpent (water), the Stone Colossus (earth), the Phoenix (fire).',
     'Their element, their six skills, the fairies who teach them. Nothing about where they come from or what they are.',
     [['A','The realm\'s own heart','Each familiar is the living spirit of its realm, grown small when the realm went quiet; fighting at your side, it grows (its skills) as the realm heals. A backstory each: the stag ran the meadows before the farms; the serpent is older than the lake; the colossus was a hill once; the phoenix has burned and come back thirty-six times.',
       'The Phoenix (in the Tome): "It has died in the Ash Night and come back every winter since, smaller each time. This is the first winter it came back larger."'],
      ['B','Bonded to a bound spirit','Each familiar was a companion of one of the great spirits (Hildr, Ulfrun, Grimmar, and the Ashlands\' fire-keeper) and comes to you looking for them; when you free that great spirit, the familiar\'s story ends with a reunion — and it stays with you.',
       'The Tide Serpent hums Ulfrun\'s boat-song when you sail. The first time you free her, it sings it back.'],
      ['C','Wordless, but remembered','No talking, no tale told: their story is shown, not said — short painted memories in the Tome that unlock as their skills grow (a moment from the realm long ago, seen through their eyes).','Tome, the Stone Colossus, memory 3: a painting of a stone-cutter laying his hand on a young hill — and the hill opening one eye.']]],
   ['spirits','✨','The forty spirits','Forty named spirits bound to bindstones (Asa, Bersi, Dagny, Eyvind … Yrsa), each with a trade and one memory line said when freed.',
     'One line each. The Homecomings saga (picked) needs more: who waits for them in the village, and what they do once home.',
     [['A','A life in five lines','Each spirit gets five lines: who they were, the night they were taken, who they left behind (a villager), what they want to see again, and their first words on the Green.',
       'Eyvind, fisher: "I was mending the big net when the sky went red. I told Dagny I would be home before the stew went cold. Is it cold? It must be very cold by now."'],
      ['B','Families on the Green','The forty grouped into the village\'s households (Nell\'s Eyvind and Dagny, Rolf\'s Hallveig, Garrick\'s Thora, Benno\'s mother Yrsa …): each household gets a short family saga, and freeing all of a household\'s spirits brings a scene at their door.',
       'At Old Nell\'s door, when Eyvind and Dagny are both home: the net is hung up for the first time in thirty-six winters, and nobody says anything for a long time.'],
      ['C','Spirits with work to do','Once freed, each spirit takes back their trade in a small way (the weaver mends banners, the skald adds verses, the midwife waits) — their backstory comes out over many short visits rather than all at once.','Asa, weaver: "The banner has a hole. I will fix it. It will take me a while; I have to remember how hands work."']]],
   ['great','🌟','The great spirits','Four, freed from the boss dungeons: Hildr of the Long Barrow (the first queen of the Grasslands), Ulfrun the Tide-Singer, Old Grimmar (who carved the first waystone), Eldis Emberheart (the last fire-keeper of the Ashlands).',
     'A name and a half-line; each gives a soul gem. (Note: Eldis was one of the names we kept clear of for the game\'s title — she can stay, or be renamed.)',
     [['A','The founders','The four who made the realms what they were — a queen, a singer, a stone-cutter, a fire-keeper — with a full backstory each and a short scene when freed in which they speak to you as the realm\'s ancestors.',
       'Old Grimmar: "I cut the first waystone with a flint and a song. It took me nine summers. You walked up to one and put your hand on it like it was nothing. Good. That is what I made them for."'],
      ['B','Guardians who failed','Each great spirit tried to hold its realm on the night the gate shut and was taken by the boss you fought; their stories are about guilt and being forgiven by the people they failed — linked to the villagers who lost the most in that realm.','Ulfrun: "I sang the boats home every night for forty years. That night I sang and no boat came. Tell Nell I am sorry. Tell her I kept singing."'],
      ['C','Keepers of the four lattices','They become the voices of the endgame: each speaks at its forge when its Heartglass is made, telling the part of the old Saga only they remember.','Eldis, at the Ash Forge: "Fire was never the enemy. Fire was the hearth. What came out of the wall was fire that had forgotten that."']]],
   ['mages','🔮','The mage-tower masters','Sixteen: Frostwhisper the Rime Witch, Magister Quillon, Cindra the Hearth-Witch, Old Bramblebeard, Glacius, Mother Morrow, Tidelord Marenus, Pyrrhia, Nihilus, Stormhelm, Gravelord Thane, Hiemal, Lady Vesperine, Astraeus … (Cindra shares a name with a fairy monarch design — one should change.)',
     'A look, tricks, a spell. They are fought and beaten; nobody says who they were before or why they guard a spell.',
     [['A','Hermits who stopped waiting','Mages who shut themselves in their towers when the gate closed, each guarding one spell "until someone worthy comes"; thirty-six winters made them strange. Beating them is the test; the spell is the gift; a short scene after the fight shows who they were.',
       'Magister Quillon, after the fight: "My book has been writing the same page for thirty-six years. Look — it has finally turned. Take the spell. I would like to read something new."'],
      ['B','The circle of sixteen','The sixteen were once one circle of mages at the Scriptorium; they split over what to do about the shut gate and each took a tower. Their backstories cross: rivalries, an old love, a betrayal; the last one you beat tells you how the circle broke.',
       'Mother Morrow: "Quillon still thinks I stole his best quill. I did. Tell him it wrote nothing but complaints."'],
      ['C','Bound like the spirits','Some masters were bound to their towers by the Binders, half-willing guardians; beating them frees them as well — they come down to the village afterwards, and Morwen knows several of them.',
       'Frostwhisper, freed: "Morwen? She still makes that terrible tea? Then I am truly home."']]],
   ['castles','🏰','The island castles: wardens and teachers','Twelve castles on twelve isles; each has a warden you fight (the Thorn Knight, the Sun Baron, the Mill Ogre, the Lotus Naga, the Drowned Abbot …) and a master held inside who teaches you a skill.',
     'The warden is a fight; the teacher a skill and a line. No one knows who built the castles, why masters are held there, or who the wardens serve.',
     [['A','The Warden\'s Bargain','Each warden made a bargain with the Binders on the night the gate shut — keep a master locked up, and keep your island; each warden\'s story is the price of that bargain, and each teacher\'s is how they kept their skill sharp in a cell.',
       'The Drowned Abbot: "They promised the water would never take my abbey. It took everything else. I kept my word. Did they keep theirs?"'],
      ['B','Teachers first','The focus on the twelve teachers: each a master of one art (sprint, petal-step, whirlwind, smoke-bomb …), each with a backstory and a short lesson scene when freed; the wardens stay as they are.',
       'The whirlwind master: "Twelve years I practised in a cell three paces wide. You learn to spin very tight."'],
      ['C','A guild of castles','The castles were a chain of schools (one art each); the wardens were its guards gone bad. Freeing them restores the "Twelve Isles" school — teachers visit the village guild afterwards and Oswin knew them all.',
       'Oswin: "The Thorn Knight? Gudrun\'s boy. Taught him to hold a spear myself. Badly, it seems."']]],
   ['binders','⛓️','The Binders (and the realm bosses)','Forty Binders, one at each bindstone, with only a name; the realm bosses (the Goblin King, the Dark Warlock, the Swamp Witch, the Storm Mage, the Rock Dragon …) and Surtharn above them.',
     'A name and a fight. Nothing on who they were, how they came to serve, or what they want.',
     [['A','The Binders were people too','Each Binder was once someone from Runeheim who chose — or was forced — to serve Surtharn; their names connect to the villagers ("that was my cousin"). One line each, and a short story for the ten who matter most. They stay in the wild (the Binders never besiege the village).',
       'Corr, watching a Binder fall: "Bersi the Binder? I went to school with a Bersi. He was afraid of the dark."'],
      ['B','The bosses\' sagas','Leave the forty as they are; give the realm bosses and Surtharn\'s lieutenants full backstories — the Goblin King\'s grudge, the Swamp Witch\'s bargain, the Rock Dragon\'s old pact with the dwarves — told in short scenes before and after each fight.',
       'The Swamp Witch: "I asked for the water to stop rising. That was all. He made it stop. Nobody asked what it cost."'],
      ['C','Both, lightly','Twenty words for every Binder (a Tome entry when beaten) and a page each for the bosses — the cheapest way to make every enemy someone.','Tome, Hrolf the Binder: "A ferryman. Took the coin and stopped asking where the boat went."']]],
   ['hamlets','🏡','The hamlet folk and the island traders','The craft-folk in the hamlets (weaver, shipwright, net-mender, fisher, beekeeper, carver, cooper, tanner …), the traders on the four familiar isles (Corsair, Bog, Ember, Frost), the sky-port folk.',
     'A trade, a look, one line each; the islands\' traders a shop.',
     [['A','A name and a reason','Every hamlet keeper gets a name, a two-line story and why they stayed when the road shut; the four island traders get a full backstory each (they are the only ones who traded across the dead years).',
       'The Bog Isle trader: "Thirty-six winters selling eel-oil to the same three customers. You are the fourth. Do not haggle; I have forgotten how."'],
      ['B','The hamlets as families','Each hamlet is one family across its trades, with a short family saga (a feud, a wedding still waiting for the spring, a lost son among the forty spirits).',
       'The beekeepers of Honeyhill: "The bees left the night the sky went quiet. We kept the hives clean for them anyway. Every spring. Just in case."'],
      ['C','Keep them light','No full stories; three varied lines each instead of one, so they feel alive without new writing weight.','The carver: "You do not carve wood. You find what is in it and let it out. Mostly it is a bear. It is nearly always a bear."']]]];
  var DEPTH=[['12','About 12 lines each (a backstory + a short voice)'],['20','About 20 lines each'],['40','At least 40 lines each, like the villagers']];
  LAB_TABS.push({ id:'npcs2', name:'Backstories for everyone else',
    blurb:'<b>Round 132 — every NPC who is not yet one of the 34 villagers.</b> Group by group: who they are, what the game knows of them today, and three ways to give them a real story, each with a sample in their voice. Pick a way for each group (or mix — say so in the note), and how many lines each should have. The Saga\'s rules hold in every proposal.',
    designs:G.map(function(g){ return {id:'npcs2-'+g[0],name:'Stories: '+g[2]}; }),
    render:function(){ var h='';
      G.forEach(function(g){ var k='npcs2-'+g[0], cur=(P(k).regions||[])[0];
        h+='<div class="ns-c"><h3>'+g[1]+' '+esc(g[2])+'</h3><p class="ns-w"><b>Who:</b> '+esc(g[3])+'</p><p class="ns-w"><b>Today:</b> '+esc(g[4])+'</p><div class="ns-g">'+
          g[5].map(function(o){ return '<div class="ns-o'+(cur===o[0]?' on':'')+'"><h4>'+o[0]+' · '+esc(o[1])+'</h4><p>'+esc(o[2])+'</p><blockquote>'+esc(o[3])+'</blockquote><button class="vbtn am-op'+(cur===o[0]?' on':'')+'" data-c="'+o[0]+'">'+(cur===o[0]?'✓ chosen':'Choose '+o[0])+'</button></div>'; }).join('').replace(/class="vbtn am-op/g,'data-k="'+k+'" class="vbtn ns-pick am-op')+
          '</div><input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note on '+esc(g[2].toLowerCase())+' (mix ways, rename someone, add someone)…"></div>'; });
      var dc=(P('npcs2-depth').regions||[])[0];
      h+='<h3 class="am-sec">📏 How many lines each</h3><div class="am-r" data-k="npcs2-depth">'+DEPTH.map(function(d){ return '<button class="vbtn am-op'+(dc===d[0]?' on':'')+'" data-c="'+d[0]+'">'+(dc===d[0]?'✓ ':'')+esc(d[1])+'</button>'; }).join('')+'</div>'+
        '<textarea class="wl-n tk-in" data-k="npcs2-all" rows="3" placeholder="Anyone I missed, or anything else…">'+esc(P('npcs2-all').notes||'')+'</textarea>';
      return h; } });
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.ns-pick'); if(!b)return; e.stopPropagation(); var k=b.dataset.k, p=LabApp.picks[k]||(LabApp.picks[k]={}); p.regions=[b.dataset.c]; if(LabApp.persist)LabApp.persist(k); var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); },true);
  if(typeof LTODO!=='undefined')LTODO.add({id:'npcs2',label:'📖 Backstories for everyone else: fairies, monarchs, familiars, the forty spirits, great spirits, mages, castles, Binders, hamlet folk',where:'Backstories for everyone else tab',
    done:function(){ return G.every(function(g){ return !!(P('npcs2-'+g[0]).regions||[]).length; })&&!!(P('npcs2-depth').regions||[]).length; },go:function(){ LTODO.goTo('npcs2','.ns-c',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('npcs2')<0)LAB_ACTIVE.unshift('npcs2');
  var st=document.createElement('style'); st.textContent='.ns-c{background:#0b121c;border:1px solid #243246;border-left:5px solid #c9a0ff;border-radius:10px;padding:10px 12px;margin:0 0 14px}.ns-c h3{margin:0 0 6px;font:600 17px "Segoe UI";color:#ffe9a8}.ns-w{font:13px/1.5 "Segoe UI";color:#c8d4e4;margin:2px 0}'+
    '.ns-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;margin:8px 0}.ns-o{background:#101a28;border:1px solid #2a3a4e;border-radius:9px;padding:8px 10px}.ns-o.on{box-shadow:0 0 0 2px #ffd76a}.ns-o h4{margin:0 0 4px;font:600 14px "Segoe UI";color:#e8eef6}.ns-o p{font:12.5px/1.5 "Segoe UI";color:#c8d4e4;margin:0 0 6px}'+
    '.ns-o blockquote{margin:0 0 8px;padding:6px 10px;border-left:3px solid #c9a0ff;background:#161028;font:italic 12.5px/1.5 Georgia,serif;color:#e6dcff}';
  document.head.appendChild(st);
})();
