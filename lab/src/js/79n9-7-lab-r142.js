// ═══════════════════════════════════════════════════════════════════════
// ║ 79n9-7-lab-r142.js — round 142: the "?" in place of the corner cards (and where each important thing went), loading screens, the
// ║ hearth, world take 5 in the game, the NPC lines (where they really stand), and the new requests. Picks: r142-<k>, r142-all.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Good'],['maybe','?'],['cut','✕']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+(ph||'Note…')+'">'; };
  // what used to pop up at the bottom right, and where it lives now
  var NOTE=[['The box under the little map (your next step: the first walk, the Saga step, the side quest you follow)','Hidden. The ? opens on <b>What now</b> with the same words; the gold arrow on the little map still points the way; the journal (Q) holds the Saga.','important — kept in two places'],
    ['First fight: "Shake it off", "Watch the crouch", the cheer when you win','Master Oswin says them in the dialogue box (the game waits); mid-fight, a short word floats over your head instead of a card.','important — moved to the dialogue box'],
    ['A new Saga begins (after the end)','The dialogue box: "The Saga Retold".','important — moved to the dialogue box'],
    ['Lessons (ZLESOFT: block, roll, aim ring, potions, mounts, familiars …)','Into the ? with a number on it, the lesson\'s keys shown. The ones a new player must not miss (the first walk, the first fight) are spoken by Oswin. <b>Proposal:</b> the next most vital ones — block, roll and drinking a potion — also spoken by Oswin, once, when you are not fighting (✓ below).','important for new players — proposal'],
    ['"Lost?" hints when you wander a long time','The ? (with its number). The What-now line answers the same question.','helpful — the ?'],
    ['"While you slept" (what changed overnight)','The ? — and the morning ceremony already says the big ones.','helpful — the ?'],
    ['Forge rules in Muspelheim (ride the cart, mind the bellows …)','The ? (with its number, the moment you arrive in the forge).','helpful — the ?'],
    ['A carving\'s lore, the gold-ring hint','The ?','nice to have — the ?'],
    ['A drill\'s counter (Training)','Stays on screen while you drill — it is the drill.','kept'],
    ['The saga card ("share this")','Only at the very end (round 140c), as a button on the end screen and the hearth screen.','kept, rare']];
  var LINES=[['Villagers (34)','3 to 10 lines each — Oswin, Benno and Morwen have 10; Tilda 5, Runa 7','Your plan was ~50 each across the saga and the seasons: about 1,670 still to write'],
    ['Fairies (20)','19 to 41 each','To 40 each: about 300 to write'],
    ['Mages (16)','1 line each','To 40 each: about 620'],
    ['Spirits (40)','5 each','Enough for now (they are freed one at a time)'],
    ['Not started','Monarchs, the pact and the fairy feast · familiars · the great spirits · castles · the Binders (Surtharn\'s gift, your note) · island traders','From your npcs2 notes (Nov 25) — all still open']];
  var REQ=[['r142_hearth','The hearth in six frames — the fire and the candles flicker on the end-of-site screen','6 paintings (each the hearth picture again, only the flames different)'],
    ['r142_load','A loading painting for every adventure site (36), the sky port and Muspelheim','38 wide paintings — until each is in, the loading screen uses the realm\'s vista with the site\'s own entrance painting'],
    ['r142_wr5',"World take 5: Vela's pass as a clear road, Bram's and Dunn's bridges twice as wide, the Scar's cliffs, and riding Mira's lift",'4 landmark sheets + 4 lift-ride sheets (Zoldor and Zola, on foot and on horseback, 6 frames each)']];
  LAB_TABS.push({ id:'r142', name:'Round 142',
    blurb:'<b>Round 142 — the "?" button, loading screens, the hearth, world take 5, and the NPC lines.</b> ✓ what plays well; notes for anything to change.',
    designs:[{id:'r142',name:'Round 142'}],
    render:function(){ var h='';
      h+='<div class="w4-c"><h3>The ? at the top right (no more cards at the bottom right)</h3><p class="w4-p">Every card that used to slide in at the bottom right now goes into the <b>?</b> at the top right; a red number on it counts the new ones, and it pulses once when one arrives. Press it (or H) to read: <b>What now</b> first, then the new tips, then the earlier ones, each with its buttons. Nothing pops up over a fight any more. On a phone it sits beside the top bar.</p>'+
        '<table class="r40-t"><tr><th>What used to pop up</th><th>Where it is now</th><th>How much it matters</th></tr>'+NOTE.map(function(n){ return '<tr><td>'+n[0]+'</td><td>'+n[1]+'</td><td><small>'+n[2]+'</small></td></tr>'; }).join('')+'</table>'+
        '<div class="w4-a">'+tag('r142-help')+note('r142-help')+'</div><p class="w4-p"><b>Proposal:</b> block, roll and potions spoken by Oswin once (not only in the ?).</p><div class="w4-a">'+tag('r142-oswin')+note('r142-oswin')+'</div></div>';
      h+='<div class="w4-c"><h3>Loading screens</h3><p class="w4-p">Going into any adventure site, the sky port or Muspelheim, a full-screen loading painting comes up while it loads: the site\'s name in gold, its realm and floor, a turning rune ring, and a tip (29 of them, including how to start over and how saves work). It stays at least 1.6 s so you can read it. Until a site\'s own painting is in (r142_load), it shows the realm\'s vista with the site\'s entrance painting.</p><div class="w4-a">'+tag('r142-load')+note('r142-load')+'</div></div>';
      h+='<div class="w4-c"><h3>The end of a site (the hearth)</h3><p class="w4-p">You could not leave it: the HUD\'s own style squeezed its buttons into a tiny ribbon (the little mark at its bottom left). Fixed. It now pauses the game, comes up the moment you walk out after the guardian falls (so the way back loads behind it), and Enter, Space or Esc carry you Onward. Once the six frames are in (r142_hearth) the fire and the candles flicker.</p><div class="w4-a">'+tag('r142-hearth')+note('r142-hearth')+'</div></div>';
      h+='<div class="w4-c"><h3>Also this round</h3><ul class="w4-p">'+
        '<li>Glades heal at most about one heart, once a game day each; every further glade that day heals half as much ("The glade rests till tomorrow").</li>'+
        '<li>The hero flashes red for a blink when hit (like the white flash on foes).</li>'+
        '<li>The Runestone Crawler\'s armour halved: a blow keeps 52% (was 5%).</li>'+
        '<li>Cindra (and any painted boss) no longer stays red after a spell hits her: the old stand-in colour handed back after the white flash left a red cast for good. She only changes colour for her own moves now.</li>'+
        '<li>Runa\'s board shows "[Tab] Read Runa\'s board" when you stand by it.</li>'+
        '<li>The meltwater puddle and the mud ruts are gone from the thaw; no puddles or cart ruts along the roads either.</li>'+
        '<li>The sheep roam further and graze less long.</li>'+
        '<li>World take 5 in the game: the set-pieces at road bends (Tab to explore once: 25% an ambush of 1–3, else gold, food or an animal; no sheep hamlet in Cragland), the little scenes, the road dressing, the water dressing in Fernheim, forest belts along the coast; tall pieces turn see-through when you walk behind them.</li>'+
        '<li>The new title logos and buttons are in the Title tab (76 pictures).</li></ul></div>';
      h+='<div class="w4-c"><h3>The NPC lines — where they really stand</h3><p class="w4-p">Not done yet. The backstories and arcs are written (and your npcs2 notes are in), but the lines people say are still the short sets:</p><table class="r40-t"><tr><th>Who</th><th>Lines now</th><th>To go</th></tr>'+LINES.map(function(l){ return '<tr><td><b>'+l[0]+'</b></td><td>'+esc(l[1])+'</td><td>'+esc(l[2])+'</td></tr>'; }).join('')+'</table><p class="w4-p">✓ to have them written in batches (villagers first, a realm at a time, each batch here for your review).</p><div class="w4-a">'+tag('r142-lines')+note('r142-lines','Which first?')+'</div></div>';
      h+='<div class="w4-c"><h3>New requests</h3><table class="r40-t"><tr><th>List</th><th>What</th><th>Size</th></tr>'+REQ.map(function(r){ return '<tr><td><code>'+r[0]+'</code></td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>'; }).join('')+'</table><p class="w4-p"><code>.\\tools\\sprites\\paint.ps1 -List r142_hearth</code> · <code>-List r142_load</code> · <code>-List r142_wr5</code></p></div>';
      return h+'<textarea class="wl-n wl-all" data-k="r142-all" placeholder="Anything else from this round…">'+esc(P('r142-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'r142',label:'❓ Round 142: the ? button, loading screens, the hearth, the NPC lines',where:'Round 142 tab',done:function(){ return ['help','load','hearth','lines'].every(function(k){ return !!P('r142-'+k).verdict; }); },go:function(){ LTODO.goTo('r142',null,0); }});
})();
