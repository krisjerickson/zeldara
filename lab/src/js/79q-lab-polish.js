// ═══════════════════════════════════════════════════════════════════════
// ║ 79q-lab-polish.js — round 101: THE LAST PIXEL ART, POP-UPS, THE HUD, SPELLS, SKY PORTS (doc 53).
// ║ Kris: "a deep dive analysis of all of the outdated pixel art … trial this in the lab first for all places to still update before we push"
// ║ + pop-ups, health / mana / experience ("propose 4 different types for each … make sure there are alternatives that are not [a Zelda copy]"),
// ║ boss bars, spells (stronger, slower, dearer, status effects, X twice to cast), projectiles (aim, head-shots), the load text, sky ports, and
// ║ 15 special Kling shots ("i'll select 5"). Answered first (docs/08 › Round 101): the bars live top-left in every scene; sky ports may be
// ║ reworked; paintings may be ordered once approved here; the mechanics guide is in the Lab now (79q2), the game later.
// ║ Picks: 'pol-<group>_<id>' — one per group, except the painted list, the sky port list and the special shots (any).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LBR==='undefined')return;
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var K=function(g,id){ return 'pol-'+g+'_'+id; };
  var LVL=5;      /* the level slider of the HUD mocks */
  // ── 1. the painted-art survey: [id, place, what shows today, the fix, painting to order, load cost] ──
  var ART=[
   ['gate','The closed bridge gates (Grasslands → Wetlands and every crossing)','Two drawn posts, a red rope and a text sign (Phaser shapes)','A painted rune-gate: two carved posts with a glowing rune-chain across, a hanging plank for the sign; it swings open (2 frames) when the builder is free','1 sheet: gate closed + open, realm tint in code','tiny — one small sheet in the scenery pages'],
   ['lines','The rune-lines (soul-lines) across the land','Neon strokes drawn by code along the path (bright, but flat)','Keep the neon glow (your rule) and paint the ribbon itself: a rune-etched glowing strip stamped along the path, and painted node-stones where the line turns','1 sheet: ribbon tile + 3 node stones','small — stamped into the chunk pictures once, not per frame'],
   ['spirit','The spirits\' thanks (and the fairies\') pop-up','The old talk box (FairyTalk): a plain panel with the portrait','The rune-stone dialogue box everyone else uses (round 84): typed at talking pace, painted face, Space to go on; the Soulglass line becomes a reward row','none — code','none'],
   ['bossfb','Bosses showing their drawn stand-in','The boss rig showed the code-drawn body while its painted pages were not fetched (far away, or slow line)','<b>Fixed now:</b> its pages are fetched as soon as the boss exists and the drawn body never shows','none','—'],
   ['emoji','Emoji under the painted buildings','15 emoji (🍺 ⚒️ 📜 …) drawn under every painted building — hidden, but still made and drawn','<b>Removed now</b> (kept only where a building has no painting)','none','saves 15 text textures'],
   ['late','Drawn stand-ins after a slow load','On a slow line the world starts after 12 s with pages missing; those chunks kept the drawn buildings and trees','<b>Fixed now:</b> when the last page arrives every chunk is made again from the paintings','none','one repaint, once'],
   ['monbar','Monster and world-boss health bars','Two rectangles over the head; 7–8 px name and level text','The new bars (section 4) — painted frame, drawn fill','none (drawn) or 1 small frame sheet','tiny'],
   ['skyline','Sky port: the city along the bottom','Blue-grey blocks with yellow windows (rectangles)','A painted sky-city skyline strip per realm (or one strip, tinted)','1–4 wide strips','small — one picture per sky port'],
   ['clouds','Sky port: the cloud bunkers','White blobs drawn by code','Painted cloud banks in 3 states (whole, torn, wisps)','1 sheet','tiny'],
   ['skyfx','Sky port: shots, bombs, power-ups','Drawn circles and emoji','Painted bolts, enemy bombs and power-up crystals','1 sheet','tiny'],
   ['status','Status effects on monsters (new — section 5)','—','Overlays drawn over any monster without new sprites: ice shell, flames, stone cuffs, vines, sparks, poison bubbles, drips, void motes','1 sheet of 8','tiny'],
   ['reticle','Spell and arrow aim marks (new — sections 5 and 6)','—','A rune circle for spells, a painted reticle for arrows; tinted by element in code','1 sheet','tiny'],
   ['dfloor','Dungeon and tower floors and walls (bulk background)','Pixel tiles (the one big area still pixel)','Painted floor and wall textures per theme, laid like the world\'s painted ground. <b>Trial one theme first</b> and measure the load (each theme adds a texture page)','8 themes × 1 page','medium — trial first'],
   ['toast','Item and loot icons in messages','Emoji (💰 🍖 💎)','The painted item icons the inventory already uses','none — code','none'],
   ['hudico','The HUD (health, mana, experience)','Thin bars with small painted icons','The new HUD (section 3)','depends on the pick','tiny']];
  var AV=[[null,'·'],['pick','✓ Order / do'],['change','✎ Change'],['cut','✕ Skip']];
  // ── 2. pop-ups: where plain text appears today ──
  var POPS=[['Messages (toasts)','439 calls in 67 files','a dark pill, top centre, 2.5 s: loot, gold, warnings, level-ups, quests, NPC lines, saves — all the same look','sorted by kind (below)'],
    ['NPC lines inside toasts','≈21','"🙏 Fairy: “Thank you!…”" in a toast that fades','the dialogue box, or a speech bubble over the speaker'],
    ['Old talk box (FairyTalk)','12 calls, 2 files','spirits\' thanks, fairies','the dialogue box (section 1)'],
    ['Dialogue box (ZDLG)','13 calls, 8 files','villagers, Runa, Oswin, the twin — the good one','keep; more people use it'],
    ['Floating world text','54 domText labels','site names, "[Tab] …" prompts, damage numbers, sky port HUD','prompts keep their look; sky port HUD → the HUD'],
    ['Banners','quest banner, region name, lesson cards','already styled (round 85, 100)','keep'],
    ['Load screen','2 lines','"Generating world…" and the old four-quadrant line','section 7']];
  // ── the groups to choose from ──
  var heart=function(f,col){ return '<span class="pz-hp" style="--c:'+col+'"><i style="width:'+Math.round(f*100)+'%"></i></span>'; };
  var G={
   toast:{t:'Messages — how a toast looks',s:'☆ one; every kind keeps its own colour and icon',o:[
     ['rune','Rune chip','A small slate with a glowing rune edge and the painted icon, top centre, stacked; warnings shake once.','<div class="pzm"><div class="pz-t rune"><b>💰</b> +50 gold</div><div class="pz-t rune warn"><b>⚠</b> Not enough mana — 18 needed</div></div>'],
     ['ribbon','Ribbon at the side','Loot and gold slide in as ribbons at the left above the hotbar (like a loot feed); warnings stay top centre.','<div class="pzm"><div class="pz-feed"><div>💎 Sapphire</div><div>💰 +50 g</div><div>🍖 Roast Meat</div></div><div class="pz-t plain warn" style="margin:0 auto">⚠ Locked — free Bram first</div></div>'],
     ['scroll','Little scrolls','Parchment scrolls that unroll and roll up — warm, storybook; slower to read at a glance.','<div class="pzm"><div class="pz-t scroll">📜 New quest: The Tumbler\'s Lesson</div><div class="pz-t scroll">💰 +50 gold</div></div>'],
     ['split','By kind','Loot → side ribbon · warnings → chip by the hotbar · level-ups and learned skills → a big centre banner for 2 s · quests → the quest banner · NPC lines → a speech bubble over the speaker · saves → a small turning rune in the corner.','<div class="pzm"><div class="pz-big">⭐ Level 6</div><div class="pz-feed"><div>💰 +50 g</div></div><div class="pz-bub">“Thank you, Zeldara!”</div></div>']]},
   speech:{t:'NPC lines that are toasts today',s:'☆ one',o:[
     ['dlg','The dialogue box','Paused, typed, with the face — for anything with story in it.',''],
     ['bubble','A speech bubble','Over the speaker, no pause, 3–4 s — for short thanks and greetings; anything longer opens the dialogue box.',''],
     ['both','Both, by length','Up to ~12 words → bubble; longer → dialogue box.','']]},
   hp:{t:'Health',s:'☆ one — 1 mark per 10 health; more appear as you level',o:[
     ['teal','Teal soul-hearts','Glowing teal hearts that empty from the right in quarters. <i>Closest to Zelda (a row of hearts) — the teal glow and rune etching make them ours.</i>','hp'],
     ['shield','Rune-shields','Small knotwork shields; a hit cracks the last one. <i>Not Zelda.</i>','hp'],
     ['lantern','Ember lanterns','Little lanterns whose flames shrink as you lose health. <i>Not Zelda.</i>','hp'],
     ['vine','Life-vine','One vine that grows a leaf per 10 health; leaves wither as you are hit. <i>Not Zelda.</i>','hp']]},
   mana:{t:'Mana',s:'☆ one — the pool grows by 3 each level (50 → 107 at level 20)',o:[
     ['rune','Glowing rune bar','A neon line with an aurora flowing inside; it grows longer as the pool grows; casting drains it in a bright pulse.','mana'],
     ['vial','Crystal vial','An upright vial that fills; a ring mark every 25 mana; the vial grows taller with the pool.','mana'],
     ['stones','Rune-stones','A row of small stones, one per 10 mana, that light and go dark.','mana'],
     ['aurora','Aurora arc','A curved ribbon of aurora over the health marks.','mana']]},
   xp:{t:'Experience',s:'☆ one — level ×100 to the next level, split over more marks as you climb (2 at level 1 → 6 at level 16+)',o:[
     ['banner','Banners','Little hanging banners that fill from the bottom; more banners hang as you level.','xp'],
     ['ring','Rune ring','A ring round a level medallion fills in segments.','xp'],
     ['scroll','Saga scroll','A scroll that unrolls; each segment a carved band.','xp'],
     ['stars','Star-chain','Stars of a constellation light one by one.','xp']]},
   boss:{t:'4 · Boss health',s:'☆ one (bars for everything, as you said)',o:[
     ['knot','Knotwork bar','Today\'s top bar in a painted knotwork frame, phases as notches, a pale trail where damage just landed.','<div class="pzm dark"><div class="pz-boss knot"><span>Grubnash, the Goblin King</span><div class="b"><i style="width:62%"></i><s style="width:70%"></s><u style="left:50%"></u></div></div></div>'],
     ['slab','Rune-stone slab','A carved stone slab that cracks as the boss weakens; the fill is glowing rune-light.','<div class="pzm dark"><div class="pz-boss slab"><span>Grubnash, the Goblin King</span><div class="b"><i style="width:62%"></i></div></div></div>'],
     ['aurora','Aurora ribbon','A thin aurora ribbon with the name above; calm, very readable.','<div class="pzm dark"><div class="pz-boss aur"><span>Grubnash, the Goblin King</span><div class="b"><i style="width:62%"></i></div></div></div>'],
     ['split','Two sizes','Great bosses: a bar at the bottom of the screen (above the hotbar). Elites and world bosses: a small painted bar over the head. Ordinary monsters: a thin bar only once hurt.','<div class="pzm dark"><div class="pz-mini"><span>Elite · Lv 7</span><i style="width:55%"></i></div><div class="pz-boss knot low"><span>Grubnash</span><div class="b"><i style="width:62%"></i></div></div></div>']]},
   status:{t:'Status effects on monsters — how they show',s:'☆ one; works on every monster without new sprites',o:[
     ['over','Painted overlays','An ice shell over a frozen monster, flames licking a burning one, stone cuffs at the feet of an earth-bound one, vines, sparks, bubbles — one small sheet of 8 paintings.','<div class="pzm dark pz-st"><span class="m">👹<b class="ice"></b></span><span class="m">👹<b class="fire"></b></span><span class="m">👹<b class="stone"></b></span></div>'],
     ['tint','Tint and particles','The monster is tinted (blue, orange, grey, green) and particles rise off it; no paintings needed.','<div class="pzm dark pz-st"><span class="m t1">👹</span><span class="m t2">👹</span><span class="m t3">👹</span></div>'],
     ['icon','Icons over the head','A small painted icon over the head with a draining ring; clearest, least magical.','<div class="pzm dark pz-st"><span class="m">👹<em>❄</em></span><span class="m">👹<em>🔥</em></span><span class="m">👹<em>🪨</em></span></div>'],
     ['mix','Overlays + an icon for long ones','Overlays for freeze / burn / earth-bound / roots, and a small icon for the quiet ones (hex, mark, drain).','']]},
   aim:{t:'Casting — X twice',s:'☆ how the aim is steered (the timing is the same for all three)',o:[
     ['auto','Locks on, Tab-free','Hold X: the rune circle locks on the nearest foe in front of you (or a spot ahead); move to swing it to the next foe. Let go: the circle stays 2.5 s. Press X: cast. Double-tap X: cast at once on the lock.',''],
     ['steer','Steered with the movement keys','Hold X: the circle appears ahead and the movement keys slide it (the hero stands still while you aim). Let go and press X to cast; double-tap casts at once ahead.',''],
     ['mouse','The mouse when there is one','As "locks on" with the keyboard; with a mouse the circle follows the pointer and a click casts.','']]},
   arrow:{t:'Bows and crossbows — aim first, then shoot',s:'☆ one',o:[
     ['steady','Steady draw','Hold Ctrl: the bow draws and a reticle shrinks over 0.8 s (the hero slows). Release when it is small for the best shot. A quick tap shoots at once, loosely.','<div class="pzm dark pz-ret"><span class="r big"></span><span class="r mid"></span><span class="r small"></span></div>'],
     ['pulse','Timing pulse','Hold Ctrl: a ring pulses on the target; release on the bright beat for a head-shot.','<div class="pzm dark pz-ret"><span class="r pulse"></span></div>'],
     ['zone','Pick the zone','Hold Ctrl and press up / down to choose head, body or legs on the locked foe; the head needs a full draw.','<div class="pzm dark pz-zone"><span>head</span><span class="on">body</span><span>legs</span></div>']]},
   zones:{t:'Where an arrow hits',s:'☆ one',o:[
     ['three','Head · body · legs','Head ×2 and a short stagger; body ×1; legs ×0.7 and slowed for 3 s. Bosses: head ×1.5.',''],
     ['two','Weak spot · body','Every monster has one glowing weak spot (head, core, eye…) ×2; the rest ×1.',''],
     ['crit','Draw = crit','No zones; a full draw is a sure critical (×2).','']]},
   load:{t:'The load screen — words and look',s:'☆ one (no spoilers)',o:[
     ['rune','The runestones wake','Lines in the title\'s rune lettering, glowing teal, one after another under a rune progress bar: "The runestones are waking…" · "Painting the land…" · "The spirits are listening…"','<div class="pzm night pz-load"><div class="l1">The runestones are waking…</div><div class="pb"><i style="width:58%"></i></div><div class="l2">Painting the land…</div></div>'],
     ['saga','A line of the story','One quiet line from the opening, changing each load: "Sixteen winters on, the road out of the village is open." · "Ten spirits are bound in every realm."','<div class="pzm night pz-load"><div class="l1">Ten spirits are bound in every realm.</div><div class="pb"><i style="width:58%"></i></div></div>'],
     ['tips','A tip','A Training lesson in one line: "Hold Shift and your shield takes the blow."','<div class="pzm night pz-load"><div class="l3">Tip · Hold <b>Shift</b> and your shield takes the blow.</div><div class="pb"><i style="width:58%"></i></div></div>'],
     ['quiet','Just the circle','The rune circle turning and the bar; no words.','<div class="pzm night pz-load"><div class="ring"></div><div class="pb"><i style="width:58%"></i></div></div>']]}
  };
  // ── spells: today → proposed (stronger, slower, dearer) and the effect each leaves ──
  var SPX={frost_bolt:['Freeze','frozen 1.5 s in an ice shell (bosses: slowed)'],fireball:['Burn','burns for 4 s'],chain_lightning:['Shock','stunned 0.5 s; the next hit +25 %'],flame_nova:['Burn','burns for 4 s'],
    ice_shards:['Chill','slowed; three chills freeze'],void_orb:['Hex','defence −30 % for 5 s'],meteor:['Burn + knock-down',''],thunder_step:['Shock','stunned 1.5 s'],poison_mist:['Poison','poisoned while in the mist and 3 s after'],
    arcane_burst:['Mark','the next hit is critical'],thorn_snare:['Rooted','vines hold it 2 s'],tidal_wave:['Soaked','knocked back; soaked + lightning ×2, soaked + frost freezes'],stone_spikes:['Earth-bound','stone cuffs: rooted 2 s, fliers grounded'],
    blizzard:['Chill → Freeze',''],void_rift:['Hex',''],spirit_drain:['Drained','heals you; its blows weaker 4 s'],starfall:['Starstruck','dazed: it stumbles 2 s']};
  var spellRows=function(){ var D=typeof SPELL_DATA!=='undefined'?SPELL_DATA:{}; return Object.keys(D).map(function(id){ var s=D[id], m2=Math.round(s.manaCost*2), c2=Math.max(2.5,Math.round(s.cooldown*3*10)/10), x=SPX[id]||['—',''];
      return '<tr><td><b>'+esc(s.name)+'</b></td><td>'+s.manaCost+' → <b>'+m2+'</b></td><td>'+s.cooldown+' s → <b>'+c2+' s</b></td><td>×1 → <b>×2.5</b></td><td><b>'+esc(x[0])+'</b>'+(x[1]?' — '+esc(x[1]):'')+'</td></tr>'; }).join(''); };
  // ── sky ports: the review ──
  var SKY=[['fix1','<b>Fixed now:</b> the formation could leave the screen','The galleon that crosses the top was counted as a member of the formation; its missing place stopped the march from turning, so the whole formation drifted off the side (x −388) where nothing could reach it. It now turns at the edges and is held on screen.'],
    ['fix2','<b>Fixed now:</b> turning at the edges','It flipped direction every frame while past an edge; now it turns once per edge and drops a step.'],
    ['hold','Hold Space to keep firing','Today holding fires once (holding charges). Proposed: holding fires steadily; a double-tap of Space fires the charged, piercing shot.'],
    ['through','Your shots pass your own clouds','Your cloud bunkers block your own shots; proposed: they only stop the enemy\'s.'],
    ['hitbox','Bigger hit boxes and a faint aim line','Hit size from 55 % to 75 % of the flier; a faint line up from the ship.'],
    ['city','Kinder city damage','A bomb that lands costs 10 (shown as a red streak first); a formation reaching the city costs 60 and is pushed back up, not 120 and gone.'],
    ['dive','The lowest flier dives now and then','Comes down into reach and back up, instead of hiding at the top.'],
    ['waves','Three waves, then the guardian','Four is long; the guardian stays inside the screen (x 80 … W−80, never above the top).'],
    ['brief','A short briefing card at the start','The Training card style: the keys, what to protect, what the power-ups do.'],
    ['hud','The painted HUD and city','Ship health as hearts (the new HUD), the city bar as a painted rampart; the skyline and clouds painted (section 1).']];
  // ── 15 special Kling shots, each for one picture of one montage ──
  var SHOTS=[['face','Face push-in (the director\'s cut)','spirit · 3 "Its struggle"','A slow push from the wide picture to the spirit\'s tear-streaked face, holding on her eyes as she lifts them.'],
    ['dolly','Dolly-zoom (the floor falls away)','mira · 3 "The Great Scar"','The camera rolls back while the lens zooms in: the hero stays the same size and the Scar behind stretches away — vertigo at the edge.'],
    ['ots','Over-the-shoulder reveal','asgard · 2 "A city in the sky"','From just behind the hero\'s shoulder, out of focus, the focus pulls to the city in the sky.'],
    ['crane','Crane up from a flower','village · 12 "A green Runeheim"','Starts on one flower at the hero\'s feet and rises high until the whole green land fills the frame.'],
    ['whip','Whip-pan','escape · 1 "Run"','A fast whip-pan that catches the hero mid-sprint, the world smeared behind.'],
    ['rack','Rack focus','orbs · 3 "Two lights"','The near rim of the hall sharp, the orbs a blur; the focus slides to the two lights.'],
    ['low','Low angle tilt up','surt1 · 5 "The Molten Colossus"','From the floor at the giant\'s feet the camera tilts all the way up his height to the burning face.'],
    ['orbit','Half orbit','lodestar · 7 "The star wakes"','The camera arcs half way round the staff as the star wakes, light sweeping across the cavern.'],
    ['slowmo','Slow-motion moment','feasthall · 7 "A million shards"','The shards burst, slow almost to a stop mid-air, then rush on at full speed.'],
    ['crash','Crash zoom','surt3 · 4 "The Ash Tyrant"','A sudden fast zoom from the storm into the Tyrant\'s burning eyes.'],
    ['through','Through the surface','worldtree · 5 "Under the water"','The camera plunges through the lake\'s surface and the World Tree\'s light opens below.'],
    ['top','Straight down from above','bifrost · 3 "Along the lines"','A bird\'s-eye view straight down: the rune-lines light across the land like a map.'],
    ['shake','Hand-held tremor','stonefall · 4 "The mountain breaks"','A shaking, hand-held camera as the mountain cracks — dust, stumbling, close.'],
    ['parallax','Deep parallax drift','credits · 2 "Forty stars"','A slow sideways drift where near, middle and far layers slide at different speeds — the stars feel deep.'],
    ['mirror','The lake\'s reflection first','asgard · 4 "On the lake"','Starts on the reflection in Mirror Lake, upside down, and tilts up to the real city above.']];
  // ── the HUD mocks (they grow with the level slider) ──
  var hpMax=function(L){ var h=30; for(var l=2;l<=L;l++)h+=5+Math.floor((l-2)/2); return h; };
  var hudMock=function(kind,id){ var L=LVL, mx=hpMax(L), cur=Math.round(mx*0.73), n=Math.ceil(mx/10), mm=50+3*(L-1), mc=Math.round(mm*0.6), nb=Math.min(6,2+Math.floor(L/4)), xf=0.45;
    if(kind==='hp'){ var out=''; for(var i=0;i<n;i++){ var f=Math.max(0,Math.min(1,(cur-i*10)/10)); out+=id==='teal'?heart(f,'#4ff0e0'):'<span class="pz-'+id+'" data-f="'+(f>=1?'1':f>0?'h':'0')+'"></span>'; } return '<div class="pzm dark"><div class="pz-row'+(id==='vine'?' vine':'')+'">'+out+'</div><small>'+cur+' / '+mx+' health · '+n+' marks at level '+L+'</small></div>'; }
    if(kind==='mana'){ if(id==='stones'){ var s=''; for(var j=0;j<Math.ceil(mm/10);j++)s+='<span class="pz-stone'+(j*10<mc?' on':'')+'"></span>'; return '<div class="pzm dark"><div class="pz-row">'+s+'</div><small>'+mc+' / '+mm+' mana</small></div>'; }
      if(id==='vial')return '<div class="pzm dark"><div class="pz-vial" style="height:'+(40+mm*0.5)+'px"><i style="height:'+Math.round(mc/mm*100)+'%"></i></div><small>'+mc+' / '+mm+' mana</small></div>';
      return '<div class="pzm dark"><div class="pz-mbar '+id+'" style="width:'+(90+mm*1.2)+'px"><i style="width:'+Math.round(mc/mm*100)+'%"></i></div><small>'+mc+' / '+mm+' mana — longer as the pool grows</small></div>'; }
    var b=''; for(var k=0;k<nb;k++){ var ff=Math.max(0,Math.min(1,xf*nb-k)); b+='<span class="pz-x '+id+'"><i style="'+(id==='banner'?'height':'width')+':'+Math.round(ff*100)+'%"></i></span>'; }
    return '<div class="pzm dark"><div class="pz-row">'+(id==='ring'?'<span class="pz-ring" style="--n:'+nb+';--f:'+xf+'">'+L+'</span>':b)+'</div><small>'+nb+' marks to level '+(L+1)+' ('+(L*100)+' xp)</small></div>'; };
  var cardHTML=function(g,o){ var k=K(g,o[0]), on=V(k)==='pick', m=o[3]==='hp'||o[3]==='mana'||o[3]==='xp'?hudMock(o[3],o[0]):o[3];
    return '<article class="tc'+(on?' on':'')+'"><b>'+o[1]+'</b><p>'+o[2]+'</p>'+(m?'<div class="tc-m pz-mock" data-kind="'+(/^(hp|mana|xp)$/.test(o[3])?o[3]:'')+'" data-id="'+o[0]+'">'+m+'</div>':'')+'<div class="tc-a"><button class="vbtn pz-pk" data-g="'+g+'" data-id="'+o[0]+'" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button></div>'+
      '<textarea class="mn-notes pz-n" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></article>'; };
  var grp=function(g){ var D=G[g]; return LBR.sec(D.t,D.s)+'<div class="tc-grid">'+D.o.map(function(o){ return cardHTML(g,o); }).join('')+'</div>'; };
  var cyc=function(k){ var v=V(k), lab=(AV.find(function(x){ return x[0]===v; })||AV[0])[1]; return '<button class="vbtn tl-v pz-cy" data-k="'+k+'">'+lab+'</button>'; };
  var multi=function(g,list,fn){ return list.map(function(x){ var k=K(g,x[0]), on=V(k)==='pick'; return fn(x,k,on); }).join(''); };
  var answered='<div class="ta"><b>Answered first (docs/08 › Round 101):</b> <span>📍 the bars sit top-left in every scene that is not paused</span><span>🎈 sky ports may be reworked</span><span>🎨 paintings are ordered once ✓ here</span><span>📖 the mechanics guide: the Lab now (its own tab), the game later</span></div>';
  var placement='<table class="tl"><thead><tr><th>Scene</th><th>Where health / mana / experience sit today</th><th>Proposed</th></tr></thead><tbody>'+
    [['The world, buildings, islands','top-left panel','top-left — the new HUD'],['Dungeons, towers, forges','the same top-left panel (+ a full-width dungeon bar on some floors)','top-left; the floor name moves under the minimap'],['Sky ports','its own text line at the top-left ("Ship Lv 0 · shot 2 ♥♥♥")','top-left — ship hearts in the new HUD, the wave line top centre'],['Boss fights','top-left + the boss bar at the top centre (the world\'s region name showed under it — <b>fixed now</b>)','top-left + the boss bar (section 4)'],['Cut-scenes, pause, maps','hidden','hidden']].map(function(r){ return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'; }).join('')+'</tbody></table>';
  LAB_TABS.push({ id:'polish', name:'Painted & polish',
    blurb:'<b>Round 101 — the last pixel art, pop-ups, the HUD, spells, arrows, sky ports.</b> Each section is a trial: ☆ pick, ✓ order, or note what to change; nothing reaches the game before you pick. Doc 53 has the full survey. The <b>Mechanics guide</b> is its own tab.',
    designs:[].concat.apply([],Object.keys(G).map(function(g){ return G[g].o.map(function(o){ return {id:g+'_'+o[0],name:G[g].t+': '+o[1]}; }); })).concat(ART.map(function(a){ return {id:'art_'+a[0],name:'Painted: '+a[1]}; })).concat(SKY.map(function(a){ return {id:'sky_'+a[0],name:'Sky port: '+a[0]}; })).concat(SHOTS.map(function(a){ return {id:'shot_'+a[0],name:'Kling shot: '+a[1]}; })).concat([{id:'spells_all',name:'Spells: the new numbers'}]),
    render:function(){ var nShot=SHOTS.filter(function(x){ return V(K('shot',x[0]))==='pick'; }).length;
      return answered+
        LBR.sec('1 · Painted art — every place still drawn','✓ order / do · ✎ change · ✕ skip — the "fixed now" rows are already in')+
        '<table class="tl pz-art"><thead><tr><th>Place</th><th>Today</th><th>Proposed</th><th>To paint</th><th>Load</th><th></th><th></th></tr></thead><tbody>'+
        multi('art',ART,function(a,k){ return '<tr class="tl-'+(V(k)||'x')+'"><td><b>'+a[1]+'</b></td><td>'+a[2]+'</td><td>'+a[3]+'</td><td>'+a[4]+'</td><td>'+a[5]+'</td><td>'+(/^(bossfb|emoji|late)$/.test(a[0])?'<span class="pz-done">in</span>':cyc(k))+'</td><td><input class="tl-n pz-in" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; })+'</tbody></table>'+
        LBR.sec('2 · Pop-ups — where plain text appears','the survey, then the looks')+
        '<table class="tl"><thead><tr><th>Kind</th><th>How many</th><th>Today</th><th>Proposed</th></tr></thead><tbody>'+POPS.map(function(r){ return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>'; }).join('')+'</tbody></table>'+
        grp('toast')+grp('speech')+
        LBR.sec('3 · Health, mana and experience','drag the level: the marks grow as you level')+'<div class="pz-lv">Level <input type="range" id="pz-lv" min="1" max="20" value="'+LVL+'"> <b id="pz-lvn">'+LVL+'</b></div>'+
        grp('hp')+grp('mana')+grp('xp')+LBR.sec('Where the bars sit','top-left in every scene that is not paused (your answer)')+placement+
        grp('boss')+
        LBR.sec('5 · Spells — stronger, slower, dearer','mana ×2 · cool-down ×3 (at least 2.5 s) · power ×2.5 · every spell leaves a mark on the foe')+
        '<table class="tl"><thead><tr><th>Spell</th><th>Mana</th><th>Cool-down</th><th>Power</th><th>What it leaves</th></tr></thead><tbody>'+spellRows()+'</tbody></table>'+
        (function(){ var k=K('spells','all'), on=V(k)==='pick'; return '<div class="tc-a"><button class="vbtn pz-pk" data-g="spells" data-id="all" aria-pressed="'+on+'">'+(on?'★ Approved':'☆ Approve these numbers')+'</button></div><textarea class="mn-notes pz-n" data-k="'+k+'" rows="1" placeholder="Notes on the numbers…">'+esc(P(k).notes||'')+'</textarea>'; })()+
        '<div class="ta pz-x2"><b>X twice to cast (the same in every steering option):</b> <span><b>hold X</b> → the aim mark shows where it lands</span><span><b>let go</b> → the mark stays 2.5 s; <b>press X</b> → cast</span><span><b>double-tap X</b> (two presses inside 0.3 s) → cast at once</span><span>Space, Esc or moving away cancels; no mana is spent until it casts</span></div>'+
        grp('aim')+grp('status')+
        LBR.sec('6 · Arrows and bolts — aim, then shoot','they are dear and a bit rare; half of the missed arrows can be picked up again')+grp('arrow')+grp('zones')+
        LBR.sec('7 · The load screen','today: "Generating world…" and "1200 × 1200 tiles — four regions, twelve crossings, seventeen waystones" in 9 px grey')+grp('load').replace(LBR.sec(G.load.t,G.load.s),'')+
        LBR.sec('8 · Sky ports — the review','✓ do · ✕ skip; a bot played wave 1 before and after the fix: before, 0 hits in 90 s; after, 10 fliers down in about a minute')+
        '<table class="tl"><tbody>'+multi('sky',SKY,function(a,k){ return '<tr class="tl-'+(V(k)||'x')+'"><td style="width:34%">'+a[1]+'</td><td>'+a[2]+'</td><td>'+(/^fix/.test(a[0])?'<span class="pz-done">in</span>':cyc(k))+'</td><td><input class="tl-n pz-in" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Note…"></td></tr>'; })+'</tbody></table>'+
        LBR.sec('9 · Special Kling shots','☆ five ('+nShot+' picked) — each goes into ONE picture of one montage; the rest stay locked shot lists')+
        '<div class="tc-grid">'+multi('shot',SHOTS,function(s,k,on){ return '<article class="tc'+(on?' on':'')+'"><b>'+s[1]+'</b><p class="pz-where">🎬 '+s[2]+'</p><p>'+s[3]+'</p><div class="tc-a"><button class="vbtn pz-pk" data-g="shot" data-id="'+s[0]+'" aria-pressed="'+on+'">'+(on?'★ Picked':'☆ Pick')+'</button></div><textarea class="mn-notes pz-n" data-k="'+k+'" rows="1" placeholder="Notes…">'+esc(P(k).notes||'')+'</textarea></article>'; })+'</div>'; } });
  var single=function(g){ return !!G[g]; };
  var redrawHud=function(){ document.querySelectorAll('.pz-mock').forEach(function(m){ var kd=m.dataset.kind; if(kd==='hp'||kd==='mana'||kd==='xp')m.innerHTML=hudMock(kd,m.dataset.id); }); };
  document.addEventListener('input',function(e){ if(e.target.id!=='pz-lv')return; LVL=+e.target.value; var n=document.getElementById('pz-lvn'); if(n)n.textContent=LVL; redrawHud(); });
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.pz-pk'); if(b){ var g=b.dataset.g, id=b.dataset.id, k=K(g,id), was=V(k)==='pick';
      if(single(g))G[g].o.forEach(function(o){ var k2=K(g,o[0]); if(k2!==k&&V(k2)==='pick'){ LabApp.picks[k2].verdict=null; LabApp.persist(k2); } });
      var p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=was?null:'pick'; LabApp.persist(k);
      document.querySelectorAll('.pz-pk').forEach(function(x){ var on=V(K(x.dataset.g,x.dataset.id))==='pick'; x.setAttribute('aria-pressed',String(on)); x.textContent=on?(x.dataset.g==='spells'?'★ Approved':'★ Picked'):(x.dataset.g==='spells'?'☆ Approve these numbers':'☆ Pick'); var c=x.closest('.tc'); if(c)c.classList.toggle('on',on); }); return; }
    var cv=e.target.closest&&e.target.closest('.pz-cy'); if(cv){ var k3=cv.dataset.k, cur=V(k3), i=AV.findIndex(function(x){ return x[0]===cur; }), nx=AV[(i+1)%AV.length];
      var p3=LabApp.picks[k3]=LabApp.picks[k3]||{}; p3.verdict=nx[0]; LabApp.persist(k3); cv.textContent=nx[1]; cv.closest('tr').className='tl-'+(nx[0]||'x'); } });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.pz-n,.pz-in'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent=
    '.pzm{position:relative;min-height:70px;padding:10px;border-radius:8px;background:linear-gradient(#5f8f4f,#4a7a40);display:flex;flex-direction:column;gap:6px;justify-content:center;font:12px "Segoe UI",sans-serif;color:#e8f0f8}.pzm.dark{background:#0b1220}.pzm.night{background:radial-gradient(ellipse at 50% 120%,#173a4a,#05080f 70%);align-items:center}.pzm small{opacity:.7}'+
    '.pz-t{align-self:center;padding:5px 12px;border-radius:7px;font-weight:600}.pz-t.rune{background:rgba(8,18,26,.92);border:1px solid #4ff0e0;box-shadow:0 0 10px rgba(79,240,224,.35)}.pz-t.warn{border-color:#ffb060;color:#ffd8a8;box-shadow:0 0 10px rgba(255,150,60,.35)}'+
    '.pz-t.plain{background:rgba(0,0,0,.75)}.pz-t.scroll{background:linear-gradient(#f3e3bc,#d9bf86);color:#3a2610;border-radius:3px 3px 10px 10px;border:1px solid #8a6a34}'+
    '.pz-feed{position:absolute;left:8px;bottom:8px;display:flex;flex-direction:column;gap:3px}.pz-feed div{background:linear-gradient(90deg,rgba(8,18,26,.95),rgba(8,18,26,0));border-left:3px solid #ffd060;padding:2px 30px 2px 8px}'+
    '.pz-big{align-self:center;font:700 22px Georgia,serif;color:#ffe9a0;text-shadow:0 0 14px #ffc040}.pz-bub{position:absolute;right:10px;top:8px;background:#fff;color:#223;border-radius:10px;padding:4px 8px}'+
    '.pz-row{display:flex;flex-wrap:wrap;gap:3px;max-width:100%}.pz-hp{width:18px;height:16px;background:rgba(79,240,224,.15);clip-path:path("M9 15 L1.5 7.5 A4 4 0 0 1 9 3 A4 4 0 0 1 16.5 7.5 Z");position:relative}.pz-hp i{position:absolute;inset:0 auto 0 0;background:var(--c);box-shadow:0 0 6px var(--c)}'+
    '.pz-shield{width:14px;height:17px;border-radius:3px 3px 8px 8px;background:#33465e}.pz-shield[data-f="1"]{background:linear-gradient(#9fd0ff,#3a78b8);box-shadow:0 0 6px #6fb8ff}.pz-shield[data-f="h"]{background:linear-gradient(90deg,#6fa8e0 50%,#33465e 50%)}'+
    '.pz-lantern{width:11px;height:18px;border-radius:4px;background:#2a2016;border:1px solid #6a5030}.pz-lantern[data-f="1"]{background:radial-gradient(circle at 50% 60%,#ffd070,#ff8020 45%,#2a2016 70%);box-shadow:0 0 8px #ff9030}.pz-lantern[data-f="h"]{background:radial-gradient(circle at 50% 70%,#ffb050,#2a2016 45%)}'+
    '.pz-row.vine{gap:0;border-bottom:2px solid #3a6a2a}.pz-vine{width:12px;height:12px;border-radius:0 10px 0 10px;background:#2a3a24;margin-right:2px}.pz-vine[data-f="1"]{background:#5fd060;box-shadow:0 0 6px #5fd060}.pz-vine[data-f="h"]{background:#a8a040}'+
    '.pz-mbar{height:9px;border-radius:5px;background:#132030;border:1px solid #2a4a6a;overflow:hidden}.pz-mbar i{display:block;height:100%;background:linear-gradient(90deg,#4f8fff,#9f6fff,#4ff0e0);box-shadow:0 0 10px #6f9fff}.pz-mbar.aurora{border-radius:40px 40px 4px 4px;height:12px}'+
    '.pz-vial{width:22px;border:2px solid #9fd0ff;border-radius:6px 6px 11px 11px;position:relative;overflow:hidden;background:#0d1828}.pz-vial i{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(#9f6fff,#4f8fff);box-shadow:0 0 8px #6f9fff}'+
    '.pz-stone{width:10px;height:13px;border-radius:40%;background:#25303e}.pz-stone.on{background:#6fb8ff;box-shadow:0 0 6px #6fb8ff}'+
    '.pz-x{position:relative;background:#1a2230;overflow:hidden}.pz-x i{position:absolute;left:0;bottom:0;background:linear-gradient(#ffe066,#ffb020)}.pz-x.banner{width:14px;height:24px;clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)}.pz-x.banner i{width:100%}'+
    '.pz-x.scroll{width:28px;height:10px;border-radius:2px}.pz-x.scroll i{height:100%}.pz-x.stars{width:12px;height:12px;clip-path:polygon(50% 0,61% 38%,100% 38%,68% 60%,79% 100%,50% 75%,21% 100%,32% 60%,0 38%,39% 38%)}.pz-x.stars i{width:100%;height:100%}'+
    '.pz-ring{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font:700 13px Georgia;color:#ffe066;background:conic-gradient(#ffc030 calc(var(--f)*360deg),#1a2230 0)}'+
    '.pz-boss{width:92%;align-self:center}.pz-boss span{font:600 12px Georgia;color:#ffe6a8}.pz-boss .b{position:relative;height:12px;background:#200;border-radius:3px;overflow:hidden;margin-top:3px}.pz-boss .b i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(#ff5a4a,#b0201a);z-index:2}.pz-boss .b s{position:absolute;left:0;top:0;bottom:0;background:#f8e0c0;opacity:.6}.pz-boss .b u{position:absolute;top:0;bottom:0;width:2px;background:#ffe6a8;z-index:3}'+
    '.pz-boss.knot .b{border:2px solid #b89a5a;box-shadow:0 0 0 2px #3a2a10}.pz-boss.slab .b{height:16px;border-radius:2px;background:#2a2a30;border:2px solid #6a6a74}.pz-boss.slab .b i{background:linear-gradient(#7ff8ff,#2a9ab8);box-shadow:0 0 10px #4ff0e0}.pz-boss.aur .b{height:6px;border-radius:6px}.pz-boss.aur .b i{background:linear-gradient(90deg,#4ff0a0,#4fb8ff,#b06fff)}.pz-boss.low{margin-top:auto}'+
    '.pz-mini{align-self:center;width:90px;font:10px "Segoe UI";color:#ffd890}.pz-mini i{display:block;height:5px;background:#e04a3a;border:1px solid #b89a5a}'+
    '.pz-st{flex-direction:row;justify-content:space-around}.pz-st .m{font-size:34px;position:relative}.pz-st b{position:absolute;inset:-4px;border-radius:40%}.pz-st .ice{background:rgba(160,220,255,.45);border:2px solid #cfefff}.pz-st .fire{background:linear-gradient(transparent 40%,rgba(255,120,30,.55));}.pz-st .stone{top:auto;height:12px;background:#8a8070;border-radius:3px}'+
    '.pz-st .t1{filter:hue-rotate(160deg) saturate(2)}.pz-st .t2{filter:sepia(1) saturate(4) hue-rotate(-20deg)}.pz-st .t3{filter:grayscale(1)}.pz-st em{position:absolute;top:-14px;left:50%;transform:translateX(-50%);font-size:13px;font-style:normal}'+
    '.pz-ret{flex-direction:row;justify-content:space-around;align-items:center}.pz-ret .r{border:2px solid #ffe066;border-radius:50%;box-shadow:0 0 8px #ffd000}.pz-ret .big{width:44px;height:44px;opacity:.5}.pz-ret .mid{width:28px;height:28px;opacity:.75}.pz-ret .small{width:12px;height:12px}.pz-ret .pulse{width:30px;height:30px;animation:pzp 1s infinite}@keyframes pzp{50%{transform:scale(.5);border-color:#fff}}'+
    '.pz-zone{align-items:center}.pz-zone span{padding:2px 10px;border:1px solid #445;border-radius:5px}.pz-zone .on{border-color:#ffe066;color:#ffe066}'+
    '.pz-load .l1{font:600 17px Georgia,serif;color:#9ff8f0;text-shadow:0 0 12px #4ff0e0}.pz-load .l2{font:12px Georgia;color:#6fb8c8}.pz-load .l3{font:13px "Segoe UI";color:#cfe0ea}.pz-load .pb{width:70%;height:4px;background:#13242e;border-radius:3px}.pz-load .pb i{display:block;height:100%;background:linear-gradient(90deg,#4ff0e0,#9f6fff);box-shadow:0 0 8px #4ff0e0}'+
    '.pz-load .ring{width:38px;height:38px;border-radius:50%;border:2px dashed #4ff0e0;animation:pzr 4s linear infinite;box-shadow:0 0 12px #4ff0e0}@keyframes pzr{to{transform:rotate(360deg)}}'+
    '.pz-lv{margin:4px 0 8px;font:13px "Segoe UI";color:#cfe0ea}.pz-lv input{vertical-align:middle;width:220px}.pz-art td{font-size:12.5px}.pz-art .tl-n{min-width:110px}.pz-done{color:#9ff0b0;font:600 12px "Segoe UI"}.pz-where{color:#9fd0ff;font-size:12px}.pz-x2{margin-top:10px}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('polish');
  var picked=function(g){ return G[g].o.some(function(o){ return V(K(g,o[0]))==='pick'; }); };
  if(typeof LTODO!=='undefined'){
    LTODO.add({id:'polart',label:'🎨 Painted art: ✓ / ✕ each place still drawn',where:'Painted & polish tab · section 1',done:function(){ return ART.every(function(a){ return /^(bossfb|emoji|late)$/.test(a[0])||!!V(K('art',a[0])); }); },go:function(){ LTODO.goTo('polish','.pz-art',0); }});
    LTODO.add({id:'polhud',label:'❤️ Health, mana, experience and boss bars: ☆ one of each',where:'Painted & polish tab · sections 3–4',done:function(){ return ['hp','mana','xp','boss'].every(picked); },go:function(){ LTODO.goTo('polish','#pz-lv',0); }});
    LTODO.add({id:'polpop',label:'💬 Pop-ups: ☆ the toast look and NPC lines',where:'Painted & polish tab · section 2',done:function(){ return ['toast','speech'].every(picked); },go:function(){ LTODO.goTo('polish','.tc-grid',0); }});
    LTODO.add({id:'polspell',label:'✨ Spells and arrows: the numbers, aiming, status effects, hit zones',where:'Painted & polish tab · sections 5–6',done:function(){ return V(K('spells','all'))==='pick'&&['aim','status','arrow','zones'].every(picked); },go:function(){ LTODO.goTo('polish','.pz-x2',0); }});
    LTODO.add({id:'polload',label:'⏳ The load screen: ☆ one',where:'Painted & polish tab · section 7',done:function(){ return picked('load'); },go:function(){ LTODO.goTo('polish','.pz-load',0); }});
    LTODO.add({id:'polsky',label:'🎈 Sky ports: ✓ / ✕ each change',where:'Painted & polish tab · section 8',done:function(){ return SKY.every(function(a){ return /^fix/.test(a[0])||!!V(K('sky',a[0])); }); },go:function(){ LTODO.goTo('polish','.pz-done',0); }});
    LTODO.add({id:'polshots',label:'🎬 Special Kling shots: ☆ five of fifteen',where:'Painted & polish tab · section 9',done:function(){ return SHOTS.filter(function(s){ return V(K('shot',s[0]))==='pick'; }).length>=5; },go:function(){ LTODO.goTo('polish','.pz-where',0); }}); }
})();
