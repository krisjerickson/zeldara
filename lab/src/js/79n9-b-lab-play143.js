// ═══════════════════════════════════════════════════════════════════════
// ║ 79n9-b-lab-play143.js — round 143 (Kris: "a full playability, latency and pop-up analysis … a deep analysis of all the notifications …
// ║ an entire playability analysis … a proposal about keeping or removing skyports … the spirit glass shards, metals and glass pieces …
// ║ the sandbox … a visuals analysis … consider latency within these analyses").
// ║ One tab, nine parts, each with its findings (numbers measured in the game this round, estimates marked) and proposals to ✓.
// ║ Picks: play143-<id> (pick|maybe|cut, notes), play143-all.   The write-up: docs/99.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Do it'],['maybe','?'],['cut','✕']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+(ph||'Note…')+'">'; };
  var tbl=function(head,rows){ return '<table class="r40-t"><tr>'+head.map(function(x){ return '<th>'+x+'</th>'; }).join('')+'</tr>'+rows.map(function(r){ return '<tr>'+r.map(function(c){ return '<td>'+c+'</td>'; }).join('')+'</tr>'; }).join('')+'</table>'; };
  var props=function(L){ return L.map(function(p){ var k='play143-'+p[0]; return '<div class="r40-p"><div><b>'+p[1]+'</b>'+(p[3]?' <small class="mv40-ask">'+p[3]+'</small>':'')+' — '+p[2]+'</div><div class="w4-a">'+tag(k)+note(k)+'</div></div>'; }).join(''); };
  var sec=function(t,body){ return '<div class="w4-c"><h3>'+t+'</h3>'+body+'</div>'; };

  // ── 1. every way the game talks to you ──
  var STYLES=[['💬 Dialogue box (rune stone, portrait)','Someone speaks to you: villagers on Tab, story beats, Oswin\'s teaching, fairies and spirits','<b>Yes</b>','26 direct calls + every "Name: “…”" line said face to face + every villager Tab','The one you want for almost everything'],
    ['📢 Top line (toasts, top centre)','Everything else: rules, refusals, status, confirmations','No','<b>450</b> calls in 70 files (+53 in the sandbox). 254 short, 109 medium, <b>87 longer than 14 words</b> — all shown for 2.5 s','Too much rides on it; long ones can\'t be read in 2.5 s'],
    ['🎒 Loot ribbon (left, above the bar)','Gold, items, food picked up','No','Every loot line (3.2 s, 5 at most)','Good — glanceable'],
    ['🗨 Bubble by the hero','A short NPC line (≤ 12 words) that came as a top line','No','Any "Name: “…”" line not face to face','Was the second voice at once — now only in fights and sites'],
    ['🛒 Shopkeeper bubble (top)','A shopkeeper\'s aside when a shop window opens','The shop pauses','5 calls','Fine — but not over a dialogue (fixed)'],
    ['✨ Floating text over heads','Damage numbers, "dizzy", boss words, status words, +❤','No','≈ 190 calls (_floatText 89, _heroFloat 26, A.float 28, boss lines 45)','Right for fights — keep short'],
    ['❓ The ? panel','Lessons, hints, "Lost?", lore — the old corner cards','No (opens on H)','13 sources','New in round 142'],
    ['🖼 Full-screen scenes','Cut-scenes, the mage scene, ceremonies, banners, the hearth, the recap, letters, fair games, echoes, the shelf, the loom, photo mode','Cut-scenes, forge rules, hearth: yes · <b>the other 11: no</b>','17 overlays + cut-scenes','The ones that don\'t pause leave the world running behind them'],
    ['🗂 Menus and shops','Map, journal, pack, camp, mounts, Tome, Training, sound, controls, every shop','Yes','19 panels','Fine'],
    ['🏷 [Tab] tags','"[Tab] Read Runa\'s board" etc. over the thing','No','Every interactable','Fine — the right amount'],
    ['🧭 Minimap arrow','Where your current quest is','No','1','Fine']];
  var COLL=[['A villager\'s short line as a bubble by the hero while someone else is in the dialogue box','Two speakers at once','<b>Fixed this round</b>: one voice at a time — the bubble waits its turn in the box'],
    ['A shopkeeper\'s bubble over a dialogue','Two speakers at once','<b>Fixed</b>: no shop bubble while the box is open'],
    ['A top line arriving while the dialogue box is up (a quest done, a loot line)','The eye has to choose','Proposal T3: top lines wait while the box is open, then show'],
    ['Toasts at the top while a boss\'s name and health bar are there','They cover the boss bar','Proposal T4: in a boss fight, toasts sit under the bar and only warnings show'],
    ['A ceremony\'s pointer and a dialogue at once (first spell, first mount)','Two things to read','Proposal P2: ceremonies wait for the dialogue to close'],
    ['The hearth screen and a level-up / quest line from the same moment','A line behind a pause screen','Proposal T3 covers it (lines wait while a pause screen is up)']];
  var LONG=[['The four forges\' rules (Ember, Cinder, Clinker, Ash) — 10 lines, e.g. "The Ash Forge — the spirits toil here for Surtharn. Break their chains: freed toilers follow you, and three at your side open the spirit door."','Brokkr (the forge-master) says each the first time, in the dialogue box'],
    ['"A new hall of glass rises on the village green — the Glimmerhall. Sólveig the Glasswright has come."','Sólveig, in the dialogue box, the next time you are in the village'],
    ['"The horse is yours! It waits outside the village by the stables — press M out there to ride."','Hana, in the dialogue box'],
    ['The last saga\'s directions ("golden doors stand open … [Tab] at the doors", "Odin and Freya go ahead to the rune circle …")','Odin and Freya say them'],
    ['Asgard\'s citadel rules (8 long lines)','Spoken in the dialogue box by whoever leads you in (not a god — they aren\'t free yet), before each floor'],
    ['Potions readied/thrown, ammo switched, Trial-realm themes','Shorter words on the top line (they are confirmations)'],
    ['"… not yet implemented!" (a site type with no scene)','Should never show — a bug if it does']];
  // ── 2. pauses ──
  var PAUSE=[['Dialogue box','Yes','Right — someone is talking to you'],['Menus, shops, Training, sound, controls','Yes','Right'],['Cut-scenes, forge rules, death, hearth, dusk, focus lost','Yes','Right'],
    ['The recap, letters, fair games, echo runs\' screens, shelf, loom, photo mode, share card, the mage scene, ceremonies','<b>No</b>','Should pause — the world runs on behind a full screen (proposal P1)'],
    ['Loading screen','The site is loading anyway','Waits at least 1.6 s even when the site is in after 0.5 s (proposal L2)'],
    ['The ? panel','No','Proposal P3: pause while it is open (it covers part of the screen and you are reading)']];
  var FRICT=[['Tab does six things','Talk, read a board, waystone, explore a set-piece, enter a door, advance a dialogue. The [Tab] tag shows which — but two close together (the board and the waystone, Pia and the crypt) still fight.','The nearest wins today. Proposal F1: the tag shows the one Tab will do; two within a step of each other get a little offset so both tags show'],
    ['Space is attack and "next" in the dialogue','A dialogue that closes as you mash Space can swallow the first swing (a 250 ms guard is there).','Keep the guard; proposal F2: the box shows "Space ▸" so it is clear'],
    ['People who walk up and talk to you','The fair greeter, Oswin in the first walk, the first-fight words. Good once; tiresome if repeated.','Already once each. Proposal F3: a rule — nobody starts a conversation while a foe hunts you or within 20 s of the last one'],
    ['The first ten minutes','An estimated 25 dialogue pages before your first real fight (the walk, Runa, Oswin, the chest, the first win) — each a pause.','Proposal F4: merge short lines from the same speaker into one page; hold Space to fast-forward the text'],
    ['A hearth screen after every boss','Once per site; it now covers the trip back. Fine.','—'],
    ['Many small rules','See the rules check below — a few say different things in different places.','Fixed the two loading tips; proposal F5 for the rest']];
  var RULES=[['Healing','Bed: full · Glade: ≈1 heart, once a game day each, halving · Potions: at once · Food: slowly · Mael: lines only','Consistent'],
    ['Dying','The death screen says "a quarter of your strength"; an old line (round 45) set full health; 10% of your gold dropped where you fell (walk back for it)','<b>Check</b>: which is true in play today? One rule, everywhere (proposal F5)'],
    ['Mana','50 + 3/level, 4/s at rest, 1.5/s in a fight, spells cost ×2 since round 102','See the Mana tab'],
    ['Foes','Shields take part of each blow and turn slowly; a dodge keeps half; "immune" is a quarter; armour as numbers','Consistent since round 140'],
    ['Sites','Cleared stays cleared; a site you left fills up again after a while','The two loading tips disagreed — fixed (only what is certain stays)'],
    ['Days','Day = sleep in your bed; seasons turn with the roads you open; fairs three days; glades once a day','Consistent'],
    ['Level caps','5 / 10 / 15 / 20 by the realm\'s builder freed','Shown as "Lv n / cap"']];
  // ── 3. latency (measured this round, headless Chromium on the build server — real machines differ; marked) ──
  var LAT=[['Download at start','248 pictures, <b>82.7 MB</b>, all requested in the first second (every scenery page but the seasons\')','Measured'],
    ['…of which never needed at start','Logo candidates 14 MB (24 pages — the Lab\'s choices, only one is the title), cut-scene loops (gloop) 3.7 MB, story frames 5.7 MB, effects 4.9 MB, Asgard 1.6 MB, Surtharn 1.2 MB','Measured'],
    ['Page-load finished','16.7 s on the build server, from a local disk (a home connection adds the download time: 83 MB at 50 Mbit/s ≈ 13 s more)','Measured + estimate'],
    ['Memory','JS heap 133 MB in the village; 178 → 208 textures after one site. Each 2048-pixel page decodes to 16 MB: if all 180 are decoded ≈ 2.9 GB','Measured + estimate'],
    ['Going into a site','0.46 s (Hearthfire), 0.51 s (Sunken Courtyard), 1.19 s (Silverwood Palace) until the floor is ready — the loading screen then waits until 1.6 s','Measured'],
    ['Timers','85 repeating timers in 62 files (some every 50–250 ms) run beside the game loop, even while paused','Counted'],
    ['On screen','1,304 objects in the World scene standing in the village; 872 page elements','Measured'],
    ['Frame time','Not meaningful on the build server (software drawing). The F9 readout on your PC gives the real numbers.','—']];
  var VIS=[['vis_far','The far lands and skylines in the game','far_1..5 behind the coasts, sky_* fading in near the borders: one wide picture each, moving at a third of the ground\'s speed. Then the videos you asked for, recorded from the game.','1 picture on screen; tiny'],
    ['vis_light','Pools of light at night','A soft glow (one shared picture, added light) at every lamp, window and brazier near you — the village at night becomes warm pools in the dark.','≈ 20–40 small sprites near you'],
    ['vis_cloud','Cloud shadows drifting','One big soft shadow picture sliding slowly over the ground by day.','1 sprite'],
    ['vis_weather','Weather by season','Rain in the thaw, snow in winter, falling leaves in autumn, petals in spring: pooled particles near the camera, fewer on a slow machine.','≤ 120 particles'],
    ['vis_water','Water that moves','The water textures slide slowly and glint; the sea sparkles at the coast.','No new pictures'],
    ['vis_dust','Footstep dust and splashes','A puff under the feet on paths, a splash in shallow water, for the hero and the mount.','Pooled, ≤ 10'],
    ['vis_dawn','Dawn and dusk light','A warm or blue tint over the whole view as the day turns (one overlay), god-rays at dawn in the forests.','1 overlay'],
    ['vis_grade','A look for each realm','A gentle colour grade per realm (Gildenmark golden, Fernheim misty green, Cragland cool, Cinderheim ember).','1 overlay'],
    ['vis_boss','Boss arenas lit','A ring of light round the arena, the boss lit from below by its element, a darker edge.','2 sprites'],
    ['vis_life','More life on the ground','The painted birds, frogs, fish and butterflies already exist; more of them near water and woods, scattering when you pass.','Already pooled']];
  var SKY=[['sky_keep','Keep them, as they are','An optional arcade siege at four ports (4 waves + a guardian); all four give the Sky Eagle mount and a Sovereign piece; the shot shop.','No work. They stay a side-game that most players won\'t find until Cinderheim (the journal lists them only then).'],
    ['sky_vela','Keep them, made Vela\'s (recommended)','Vela opens them when she is freed (as now). Each siege shorter (3 waves, ≈ 2–3 minutes). A defended port becomes a sky dock: from any defended dock, fly to any other (a painted flight, the realms passing below). The Sky Eagle and the Sovereign piece stay as the rewards for all four. The shot shop folds into the siege\'s own power-ups.','Gives them a purpose in the story and the world (travel, a view of the land); a little work; no new paintings needed (the sky sheets exist).'],
    ['sky_cut','Remove them','The four ports, the Sky scene and the shot shop go; the Sky Eagle comes from Vela, the Sovereign bow from the fourth castle.','Less to maintain and test; the game is a little smaller; the sky paintings are unused.']];
  var GLASS=[['1 · Free spirits at bindstones','Each freed spirit gives a shard of its realm. Journal: "Free 6 spirits of Gildenmark (n / 6)". A lesson the first time.','Where the bindstones are isn\'t on the map until you\'ve seen them. The lesson now sits in the ? (round 142).'],
    ['2 · Sólveig fuses six into a lattice','The Glimmerhall rises after a harbour quest; the journal step; a lesson.','Its arrival is a 2.5 s top line — easy to miss. Nothing tells you when you have six.'],
    ['3 · A soul gem from each boss dungeon','The journal names it ("…and Grovesoul, which Mira needs").','Fine.'],
    ['4 · An island metal from each island\'s trader','The journal\'s tray step names the metal and the island.','How to reach the islands (the harbour, Quill) is not said there. The traders\' metals cost a lot.'],
    ['5 · Mira\'s workshop opens with any island castle cleared','Journal: "Clear any island castle — it opens Mira\'s workshop".','A hidden gate: a player can have the gem and the metal and not know why Mira won\'t make a tray.'],
    ['6 · Mira makes the hearth tray (metal + gem)','Journal step per realm.','Doesn\'t show which half you already have.'],
    ['7 · Tray + lattice → Heartglass at each forge\'s hearth','Journal step per forge.','Fine once you are in the forges.'],
    ['8 · Lodestar: four Heartglasses + the Sovereign staff (6,000 g)','Journal step; a lesson ("start saving").','6,000 g is a wall if you learn it late — the first lesson says it, but it is now in the ?.']];
  var SAND=[['sb_start','The opening in pieces','Jump to: after the first walk · the first fight · the first fair · the first night — each with the right state set.'],
    ['sb_day','The calendar','Set the day, the season and a fair (to see each fair\'s greeter, games and dressing); set the time of day.'],
    ['sb_lodestar','The Lodestar path','Give n shards of a realm, a lattice, a gem, a metal, a tray, a Heartglass — each one button — and open the Glimmerhall and the workshop.'],
    ['sb_isles','Islands and harbours','Teleport to each harbour and each island (and its castle and trader).'],
    ['sb_lm','The landmarks','Teleport to each crossing (Bram\'s bridge, Mira\'s lift, Dunn\'s bridge, Vela\'s pass) and to any set-piece; reset "explored".'],
    ['sb_ui','Every screen once','Show: the hearth, the loading screen of any site, each ceremony, each cut-scene, the death screen, the ? with sample tips, the dialogue box for any villager (read all their lines).'],
    ['sb_stats','Set, not just add','Set level, gold, health, mana, spells known, difficulty to an exact value.'],
    ['sb_mon','Any monster or boss here','Spawn any monster or boss by name; jump a boss to its next phase.'],
    ['sb_crypt','The crypt and New Game+','Give echo runes; open the crypt\'s stages; start the Saga Retold.'],
    ['sb_snap','Save points','Take a snapshot of the game and go back to it with one click (for trying the same moment again).'],
    ['sb_perf','A performance report','One button: download size so far, memory, textures, objects, frame times — for checking latency on your PC.']];
  var REC=[['L1','Load the paintings when they are needed, not all at start','Load at start only what the village and the open realms use (an estimated 15–20 MB of the 83 MB); fetch a family of pictures when its realm, site or scene comes near; drop the Lab-only logo candidates from the game (−14 MB). Estimated: the game playable 3–4× sooner on a home connection, and far less memory.','biggest win'],
    ['L2','Loading screen: as long as the load, not 1.6 s','Show it at once, hide it as soon as the site is in (keep a 0.3 s fade). Measured loads are 0.46–1.19 s, so most entries get 0.5–1 s faster.',''],
    ['L3','One timer instead of 85','Move the repeating timers onto the game\'s own clock, skipped while paused or when the tab is hidden.',''],
    ['L4','Fewer objects far from the camera','Hide (not just draw off-screen) decorations more than a screen away, as world take 5 already does.',''],
    ['T1','People speak in the dialogue box; the top line is for you, not for them','Done this round for NPC lines out of a fight (one voice at a time, any length). The rest below.','done'],
    ['T2','Long rules and story become speech','The 10 forge rules, the Glimmerhall, the horse, the last saga and the citadel (table above) said by Brokkr, Sólveig, Hana, Odin and Freya (after the end) in the dialogue box.',''],
    ['T3','Top lines wait for pause screens','While the dialogue box, the hearth or a menu is up, top lines queue and show after (in order, merged when alike).',''],
    ['T4','Top lines know about bosses','In a boss fight: top lines below the boss bar, warnings only; the rest wait.',''],
    ['T5','Time to read','A top line stays 1.8 s + 0.3 s a word (up to 8 s); at most three at once; colour by kind (gold progress, red warning, white note).',''],
    ['T6','When a brief top line is right','(a) a confirmation of what you did (saved, bought, equipped, ammo); (b) a small refusal ("Not enough gold"); (c) a cry in a fight or inside a site (a freed builder, a boss) — better as words over the speaker; (d) loot on the left. Everything else: the dialogue box, the ? or a [Tab] tag.',''],
    ['P1','Every full screen pauses','The recap, letters, fair games, echo screens, shelf, loom, photo mode, share card, mage scene and ceremonies pause the world like the others.',''],
    ['P2','One screen at a time','Ceremonies, banners and the hearth wait for the dialogue box (and each other).',''],
    ['P3','The ? pauses while open','',''],
    ['F1','Tab: always the thing its tag shows','',''],
    ['F3','Nobody starts a conversation in a fight, or within 20 s of the last','',''],
    ['F4','Fewer, fuller pages in the first ten minutes; hold Space to fast-forward','',''],
    ['F5','One rule, said the same everywhere','Death\'s penalty, sites refilling, healing — checked against the code and every place that tells you.',''],
    ['G1','The Lodestar path page','In the journal (and the Tome): one row per realm — shards n/6 → lattice → gem → metal → tray → Heartglass — each with "where next" and a map pin.',''],
    ['G2','People call you over for the Lodestar','Sólveig when you carry six shards of a realm; Mira when you have a gem and its metal (or tells you why she can\'t yet: "clear a castle on the islands — my workshop needs the tools"); Quill when the tray step needs an island.',''],
    ['G3','Bindstones on the map once heard of','A freed spirit tells you where the next one in its realm is (a pin on the map).',''],
    ['G4','The Lodestar\'s lessons spoken, not in the ?','The lessons about shards, the Glimmerhall, trays and the 6,000 g are said by Sólveig, Mira and Morwen when they become true.','']];
  LAB_TABS.push({ id:'play143', name:'Playability, latency & pop-ups',
    blurb:'<b>Round 143 — the whole game looked at for how it plays, how it waits, and how it talks to you.</b> Nine parts: the ways the game talks to you and where two collided; pause or a brief line; every top-line notice; what pauses and where it rubs; the rules side by side; latency (measured this round); sky ports; the Lodestar path; the sandbox; visuals that cost little. ✓ the proposals. <i>Numbers marked "measured" come from the game on the build server (headless Chromium); real machines differ, so the frame times are left to the F9 readout on your PC.</i>',
    designs:[{id:'play143',name:'Playability, latency & pop-ups'}],
    render:function(){ var h='';
      h+=sec('The short version',
        '<ol class="w4-p"><li><b>Latency:</b> the game downloads <b>83 MB of pictures in its first second</b>, most of them not needed yet (14 MB are the Lab\'s logo choices). Loading them when needed is the biggest win in the game (L1). The loading screen also waits longer than the sites take to load (L2).</li>'+
        '<li><b>People talking:</b> two voices could show at once (a bubble and the dialogue box). Fixed: one voice at a time, and out of a fight every NPC line is now said in the dialogue box, as you asked.</li>'+
        '<li><b>The top line carries too much:</b> 450 notices, 87 of them too long to read in their 2.5 s — including the forge rules and the Glimmerhall\'s arrival. Those become speech; the top line keeps only quick confirmations and refusals (T2–T6).</li>'+
        '<li><b>Eleven full screens don\'t pause</b> (recap, letters, fair games …) — they should (P1).</li>'+
        '<li><b>The Lodestar path</b> is in the journal, but its hardest steps (the castle that opens Mira\'s workshop, where the islands are, the 6,000 g) are easy to miss — one page and people calling you over (G1–G4).</li>'+
        '<li><b>Sky ports:</b> keep them, as Vela\'s sky docks — shorter sieges that open flights between the ports.</li>'+
        '<li><b>Sandbox:</b> eleven additions, most of all the Lodestar path, the calendar and "every screen once".</li>'+
        '<li><b>Visuals:</b> ten additions that cost almost nothing to draw — far lands, light pools at night, cloud shadows, weather, moving water.</li></ol>');
      h+=sec('1 · Every way the game talks to you',tbl(['Style','What it\'s for','Pauses?','How much','Verdict'],STYLES)+
        '<h4 style="margin:10px 0 4px">Where two things spoke at once</h4>'+tbl(['When','The problem','Now'],COLL));
      h+=sec('2 · The pause dialogue or a brief line?','<p class="w4-p">Your rule: almost everything is the NPC talking to you in the dialogue box, with the game paused. In the game now: <b>out of a fight, every NPC line is spoken in the box</b>, short or long. A brief line still makes sense in four places only (T6): a confirmation of what you just did, a small refusal, a cry in the middle of a fight or a site (where a pause would break the fight — better as words over the speaker), and loot on the left.</p>'+
        '<h4 style="margin:10px 0 4px">Long top lines that should be speech</h4>'+tbl(['Today (a 2.5 s top line)','Proposal'],LONG));
      h+=sec('3 · Every notice, by kind',tbl(['Kind','How many','Example','Recommendation'],[
        ['Status and notes','299','"🔷 You are here", "💨 You heave on the bellows — the channel drains for ten breaths. Cross!"','Short ones stay; long ones become speech or a [Tab] tag on the thing'],
        ['Warnings and refusals','52','"Not enough gold!", "🔥 The heat is too much — you are burning! Find a quench trough …"','Stay, in red, longer for long ones; in a boss fight, the only ones shown'],
        ['Loot and rewards','34','"🍖 Roast Meat added to inventory! (+40 HP when eaten)"','The left ribbon (already)'],
        ['How-to','28','"🔷 Stand at a waystone and press [Tab] to travel from it"','Said once by a person, then in the ?'],
        ['Progress','27','"📜 Quests are taken at the Adventurers\' Guild in the village."','The person who gives it says it; the journal keeps it'],
        ['System','7','"💾 Game saved"','Stay — short, out of the way'],
        ['Sandbox','53','"🗺️ Full map revealed"','Stay']])+'<p class="w4-p">Counted from the code (each call\'s first words); "status" is everything that matched no other kind.</p>');
      h+=sec('4 · What pauses, and where it rubs',tbl(['Screen','Pauses the game?','Verdict'],PAUSE)+'<h4 style="margin:10px 0 4px">Friction</h4>'+tbl(['Where','What happens','Proposal'],FRICT));
      h+=sec('5 · The rules, side by side',tbl(['Rule','What the game does','Check'],RULES));
      h+=sec('6 · Latency (measured this round)',tbl(['What','Number','How we know'],LAT));
      h+=sec('7 · Sky ports: keep or remove?','<p class="w4-p">Today: four ports (one per realm), each an arcade siege — the realm\'s flyers march and drop bombs, cloud bunkers, a galleon, four waves and a sky guardian. Rewards: gold, a shot-upgrade shop, the Sky Eagle mount and a Sovereign piece for all four. They open with Vela (Cinderheim) and the journal only mentions them then. The Sky scene loads its own pictures only when you go in, so they cost no latency until used.</p>'+
        SKY.map(function(s){ var k='play143-'+s[0]; return '<div class="r40-p"><div><b>'+s[1]+'</b> — '+s[2]+' <i style="color:#9fb0c4">'+s[3]+'</i></div><div class="w4-a">'+tag(k)+note(k)+'</div></div>'; }).join(''));
      h+=sec('8 · Spirit glass, metals and trays: the Lodestar path',tbl(['Step','What tells you now','The gap'],GLASS)+props(REC.filter(function(r){ return /^G/.test(r[0]); })));
      h+=sec('9 · The sandbox: what\'s missing','<p class="w4-p">Today: the Site Lab (any site, any floor), the Spirit Saga jumps (nine arcs), teleports to each realm and the volcanoes, give-all buttons, god mode, night/day, the element test, the forge kit, performance readout, the full bot.</p>'+props(SAND.map(function(s){ return [s[0],s[1],s[2]]; })));
      h+=sec('10 · Visuals that cost little',props(VIS.map(function(v){ return [v[0],v[1],v[2],v[3]]; })));
      h+=sec('All the proposals',props(REC.filter(function(r){ return !/^G/.test(r[0]); }).map(function(r){ return [r[0],r[0]+' · '+r[1],r[2]||'',r[3]]; })));
      return h+'<textarea class="wl-n wl-all" data-k="play143-all" placeholder="Anything else from the analysis…">'+esc(P('play143-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'play143',label:'🔎 Playability, latency & pop-ups: ✓ the proposals (and keep or remove the sky ports)',where:'Playability, latency & pop-ups tab',done:function(){ return ['L1','T2','P1','G1','sky_keep','sky_vela','sky_cut'].filter(function(k){ return !!P('play143-'+k).verdict; }).length>=4; },go:function(){ LTODO.goTo('play143',null,0); }});
})();
