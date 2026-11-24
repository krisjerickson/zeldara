// ═══════════════════════════════════════════════════════════════════════
// ║ 79z5-lab-tracker.js — round 129: THE CHECKLIST (Kris: "it would also be nice to have a place in the lab where we have a checklist of
// ║ everything we've talked about, with feedback on if it still needs input, has been completed and put in the game, and other related
// ║ details, and numbers of inputs still needed, as well as a place for me to leave feedback" … "also having a condensed summary of what
// ║ was implemented for anything completed").
// ║ One row per thing we have talked about, grouped by area. Status: 🟡 needs your input · 🔵 decided, Claude builds next · 🟣 waiting on
// ║ something outside (a PC run, a lawyer, a video service) · 🟢 in the game · ⚪ later / not now / cut. "Needs you" rows count their open
// ║ inputs live from the Lab's own asks (LTODO) where they can; a done row has a short "what's in the game". Each row has a note box
// ║ ('trk-<id>'), and there is one box for anything else ('trk-general').
// ║ To update: edit TRK below (st, did, ask, need) each round — the Lab revision adds what was finished.
// ═══════════════════════════════════════════════════════════════════════
var TRK=[
 {a:'combat',ic:'⚔️',n:'Combat, aiming & controls',items:[
  {id:'aim',n:'Aiming made simple — soft lock-on + hold to charge',st:'done',doc:88,r:129,did:'A gold ring sits on the best foe ahead (in range, in sight). Tap Ctrl (bow) or X (spell) to shoot it; hold to charge ×1.5 at 0.4 s, ×2 at 0.8 s (a charged spell costs +25 % / +50 % mana). A direction while holding jumps the ring to the best foe that way; the hero stands still. The old "X twice" rune circle is gone.'},
  {id:'aimrule',n:'Choose who auto-aim picks, in the game\'s Controls',st:'done',doc:88,r:129,did:'❓ Controls → "Auto-aim": ⚠ most dangerous (default) · 💪 strongest · 🩸 weakest · 📍 nearest · 🔁 the last one I hit. Saved with the game.'},
  {id:'xbow',n:'Bow vs crossbow — option A, "pierce"',st:'done',doc:88,r:129,did:'Bow: the quick one (≈0.45 s). Crossbow: one heavy bolt (+35 %), 1.2 s reload, goes through every foe in a line and breaks plate as well as a guard. Darts cost 1.5× and come 6 / 3 to a bundle.'},
  {id:'bossplan2',n:'Boss fights, phase by phase',st:'done',doc:86,r:129,did:'Each boss phase has its own damage rule, attacks and painted props (braziers, pillars, anvil, bones, totem) from your picks. Limit: the beat is a steady 100 BPM, not yet tied to the boss music.'},
  {id:'arena',n:'Area attacks stay inside the boss arena',st:'done',doc:82,r:127,did:'Boss area attacks are clipped to the arena; no hits from off-screen.'},
  {id:'chip',n:'No chipping bosses from afar · invisible walls, pulls and safe zones',st:'done',doc:'39 · 41',did:'Bosses heal / shield against out-of-arena chip damage; pulls and safe zones at the arena edge.'},
  {id:'rhythm',n:'Combat rhythm (weave, follow-up shot) · slow-turning shield foes',st:'done',doc:'55 · 74',did:'Rune-weave and follow-up shots reward timing; shield monsters turn slowly so you can flank them.'},
  {id:'diff',n:'Difficulty levels',st:'done',doc:17,did:'Four levels on the new-game screen and in ❓ Controls.'},
  {id:'ringgate',n:'The gold ring only with a bow, crossbow or spell in hand',st:'done',r:130,did:'No ring until a ranged weapon or spell is equipped; the first time, a short line explains tap · hold · switch (the stand-in until your ceremony pick).'},
  {id:'ceremony',n:'Ceremonies: the mana arc and the gold ring — who teaches, where, and the looks',st:'you',tab:'ceremony',todo:['ceremony'],need:5,ask:'Pick the way for each, the shimmer, and how the arc and ring first appear.'},
  {id:'remap',n:'Controls page with key remapping',st:'next',doc:88,ask:'',did:'',note:'Wave 1 of "Playing and coming back".'},
  {id:'pad',n:'Gamepad ("zelda" layout) + full Steam Deck coverage',st:'next',doc:88,note:'Wave 3.'},
  {id:'coop',n:'Couch co-op (full, with the rebalance)',st:'later',doc:88,note:'After wave 3.'}]},
 {a:'engage',ic:'🔁',n:'Playing and coming back',items:[
  {id:'engage2',n:'Your picks on the 40 proposals',st:'done',doc:88,r:129,did:'Decided and written up: wave plan, what is cut (assist, raven), not now (tells, three paths, twin near), maybe (the village grows — six looks, never gating forging or services).'},
  {id:'w1built',n:'Wave 1, built: safety saves, soft lessons, the stuck hint, site times, the morning line, our promise, one-step new game',st:'done',doc:89,r:130,did:'A quiet safety save every minute and when the tab hides or closes (Continue takes the newer). Most lessons are a card under the little map — only five still pause. Ten minutes lost → Oswin offers a hint (once; three steps). The map and site doors show ≈ minutes and your own time. Waking in bed: one line of what is waiting. "Our promise" on the title. New game: name, hero and difficulty on one form.'},
  {id:'wave1',n:'Wave 1, still to build: the Controls page with remapping, the opt-in play log, the fast first load',st:'next',doc:88},
  {id:'wave2',n:'Wave 2 — death story, challenge codes, share cards, photo mode, letters + "where you were" card, map stamps, the Tome book, rest at the hearth, game-day counter + festival days, first win',st:'later',doc:88},
  {id:'wave3',n:'Wave 3 — festivals, home trophies, loom, saga night, secrets, stream-ready, gamepad, crypt / new game+, landmark passes, light bonds, the village\'s six looks',st:'later',doc:88},
  {id:'cutengage',n:'Cut or not now: assist mode, the raven; tells, three paths (maybe a skill tree later), twin near',st:'cut',doc:88}]},
 {a:'world',ic:'🗺️',n:'The world & scenery',items:[
  {id:'wl3in',n:'World revamped 3 — your ✓ picks into the game',st:'next',tab:'worldlook3',doc:85,note:'Air, ground, water, grand site exteriors, moonlit night (today\'s light kept), contact shadows, the take-2 colour grade and dusk. Cut: more aurora, lights.'},
  {id:'wl3t4',n:'World revamped 3 — take 4 for the four still open',st:'next',tab:'worldlook3',need:4,note:'Soft aurora on water that never covers sprites (e.g. the south bridge) · "saga" frames shown as little in-game videos · landmarks as the passages between quadrants (Mira, Vela, Dunn, Scar) · vistas as scene previews (Silverrun, Scar, Ember, Lilies). Claude makes these, then you pick.'},
  {id:'icons',n:'The last 65 emojis / icons wired in',st:'next',doc:85,note:'Painted and in the index; not yet used in the menus.'},
  {id:'scenery',n:'Painted scenery restored · site backdrops · boss arenas, wells, shorter sites',st:'done',doc:'57 · 60 · 80',did:'Painted scenery back everywhere (and a rule so it cannot vanish again); seven backdrop fixes; boss arenas and wells; shorter adventure sites.'},
  {id:'mapmarks',n:'Quest marks, camps and the current quest on the map',st:'done',doc:'62 · 64',did:'Map shows quests, camps and a "current quest"; fairy rings heal.'}]},
 {a:'seasons',ic:'🌸',n:'Seasons & festivals',items:[
  {id:'seasonsall',n:'All the seasons & festivals — ✓ or ↻ every group of paintings',st:'you',tab:'seasonsall',todo:['seasonsall'],live:'seasonsall',ask:'Open each season, look at each group full-screen, ✓ or ↻ with a note.'},
  {id:'seasredo',n:'Seasons repainted where you asked (↻): autumn colour variety + green pines, thaw seedlings, harvested winter fields',st:'wait',tab:'seasonsall',need:1,ask:'On the PC: .\\tools\\sprites\\redo.ps1 -List r130_seasons_redo (9 sheets), then tell me they are in.'},
  {id:'seasturn',n:'The seasons turn as the realms are freed',st:'done',doc:'70 · 82',did:'The thaw → summer → harvest → Yule → Freya\'s spring, by realms freed (no clock). Trees, plants, village, props and land repainted per season; evergreens stay green in autumn.'},
  {id:'manahide',n:'The mana arc hidden until your first spell, then it shimmers',st:'done',r:130,did:'No mana arc until you have a spell; the first time it draws itself in, glows and a pointer explains it (stand-in until your ceremony pick). The arc\'s colours now drift slowly along it.'},
  {id:'seasprops',n:'Thaw and spring village props repainted; spring festival set 2',st:'done',doc:87,r:129,did:'Repaints in (wave 131); the pole, crowns and cart moved to their own sheet.'},
  {id:'seasland',n:'Season land placement + a game-day counter for festival days',st:'later',note:'Festival = the first 3 in-game days of a new season (wave 2).'}]},
 {a:'story',ic:'📜',n:'Story, villagers & cut-scenes',items:[
  {id:'serpick',n:'Shot series — keep 2–3 shots a frame and their order',st:'you',tab:'serpick',todo:['serpick']},
  {id:'cutfb',n:'The final cuts — ✓ or ↻ each finished cut-scene',st:'you',tab:'serpick',todo:['cutfb']},
  {id:'cutlook2',n:'Cut-scene looks — ★ one of Saga + three new looks, per cut-scene',st:'you',tab:'cutlook',todo:['cutlook2'],need:5},
  {id:'vidcompare',n:'Kling vs Flow — make the Flow takes of three shots, then pick the way forward',st:'wait',tab:'vidcompare',todo:['vidcompare'],ask:'Run the Flow takes on the PC, then pick in the tab.'},
  {id:'flowfold',n:'Flow remake folders and prompts for the Kling clips',st:'later',doc:81},
  {id:'sagalines',n:'Villager saga lines (the woven saga in their words)',st:'later',doc:'67 · 69'},
  {id:'villagers',n:'Villagers: voices, requests, backstories, saga arcs',st:'done',doc:'65 · 66 · 67 · 73',did:'Each villager has a voice, side requests and a backstory; the woven saga and five more sagas picked.'},
  {id:'opening',n:'The opening: Oswin on the Green, the wooden sword, the first walk',st:'done',doc:'61 · 62',did:'Oswin leads you to his guild; the first sword is wooden; first-walk fixes.'}]},
 {a:'sound',ic:'🔊',n:'Sound & music',items:[
  {id:'sfx103',n:'Sound effects — pick, remake or approve',st:'you',tab:'sfxpick',todo:['sfx103'],live:'sfx103',ask:'Re-listen: the previews now match the files.'},
  {id:'sfxfix',n:'Sound-effect picks restored',st:'done',doc:87,r:129,did:'Every ★ traced to your own clicks; 12 effects put back to what you chose; the preview mix-up fixed (the Lab now refuses a preview that doesn\'t match its file).'},
  {id:'music121',n:'Music — 43 cues: ☆ to keep or make, notes on any to change',st:'you',tab:'audio',todo:['music121'],need:43},
  {id:'music123',n:'Music — two alternates (Castle halls, Ashlands by day) + four Skirmish prompts',st:'you',tab:'audio',todo:['music123'],need:6}]},
 {a:'econ',ic:'🪙',n:'Economy, items & shops',items:[
  {id:'economy',n:'The economy, built',st:'done',doc:'74 · 75 · 76',did:'Prices, rewards and forging rebalanced phase by phase; finding and buying items reworked.'},
  {id:'shops',n:'Shops show your gold; buy several without the window closing; inventory sub-tabs',st:'done',doc:'60 · 63'}]},
 {a:'release',ic:'🏷️',n:'Name, release & the law',items:[
  {id:'name',n:'The name: The Quests of Zola and Zoldor (ZOH-la · ZOL-dor)',st:'done',r:129,did:'Renamed throughout the game, site and logo (Z·OLA AND Z·OLDOR). Save files and internal ids kept.'},
  {id:'tm',n:'Trademark search for the title and "Zoldor"',st:'wait',ask:'A lawyer\'s search before anything public.',doc:84},
  {id:'lic',n:'Licences: Suno songs from the free plan; Kling\'s commercial terms',st:'wait',doc:84,ask:'Upgrade / re-make where needed before release.'},
  {id:'release',n:'Release plan: free first chapter (web, itch.io) → Steam $14.99 with a Next Fest demo',st:'later',doc:84}]},
 {a:'lab',ic:'🧪',n:'The Lab & tools',items:[
  {id:'labclean',n:'Lab tidied: only tabs that need you are buttons; the rest in the drop-down',st:'done',r:129,did:'"Archived & earlier rounds" holds every finished tab.'},
  {id:'tracker',n:'This checklist',st:'done',r:129,did:'Every topic with its status, open inputs, what was built, and a note box.'},
  {id:'saview',n:'Full-screen viewer for the seasons pictures',st:'done',r:129,did:'Fit / 100 / 200 / 300 %, wheel zoom, drag, ← → and Esc, with the pick bar in the viewer.'},
  {id:'paintkey',n:'Painting scripts ask again when the API key has expired',st:'done',r:129,did:'paint.ps1 / redo.ps1 take -NewKey and re-prompt on a 401.'}]}
];
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return (typeof LabApp!=='undefined'&&LabApp.picks[k])||{}; };
  var ST={you:['🟡','Needs your input','#ffd76a'],next:['🔵','Decided — Claude builds next','#7fc8ff'],wait:['🟣','Waiting on something outside','#c9a0ff'],done:['🟢','In the game','#8fe8a0'],later:['⚪','Later (planned)','#9aa8b8'],cut:['⚪','Not now / cut','#7a8898']};
  // live counts from the Lab's own asks
  var LIVE={ seasonsall:function(){ if(typeof LSALL==='undefined')return null; var n=0; LSALL.seasons.forEach(function(x){ x.groups.forEach(function(G){ if(!P('seasonsall-'+x.s+'-'+G.g).verdict)n++; }); }); return n; },
    sfx103:function(){ try{ return window.SFX103?SFX103.counts().pick:null; }catch(e){ return null; } } };
  var open=function(it){ if(!it.todo||typeof LTODO==='undefined')return null; var O=LTODO.open().map(function(o){ return o.id; }), L=LTODO.L.map(function(o){ return o.id; });
    var known=it.todo.filter(function(t){ return L.indexOf(t)>=0; }); if(!known.length)return null; return known.filter(function(t){ return O.indexOf(t)>=0; }).length; };
  var state=function(it){ var o=open(it); if((it.st==='you'||it.st==='wait')&&o===0)return 'answered'; return it.st; };
  var inputs=function(it){ var l=it.live&&LIVE[it.live]?LIVE[it.live]():null; if(l!=null)return l; var o=open(it); if(o===0)return 0; return it.need||(o!=null?o:(it.st==='you'?1:0)); };
  var filt='all';
  LAB_TABS.push({ id:'tracker', name:'📋 Checklist — everything we\'ve talked about',
    blurb:'<b>Everything we\'ve talked about, in one list.</b> 🟡 needs your input · 🔵 decided, Claude builds next · 🟣 waiting on something outside · 🟢 in the game (with what was built) · ⚪ later or not now. The open-input numbers are live from your picks. Leave a note on any row, or in the box at the bottom.',
    designs:[{id:'tracker',name:'Checklist'}],
    render:function(){ var all=[]; TRK.forEach(function(A){ A.items.forEach(function(it){ all.push(it); }); });
      var cnt={you:0,next:0,wait:0,done:0,later:0}, need=0; all.forEach(function(it){ var s=state(it); if(s==='answered')s='next'; if(s==='cut')s='later'; cnt[s]=(cnt[s]||0)+1; if(it.st==='you'||it.st==='wait')need+=inputs(it); });
      var h='<div class="tk-sum">'+[['you',cnt.you+' need you',need+' inputs'],['next',cnt.next+' building next',''],['wait',cnt.wait+' waiting outside',''],['done',cnt.done+' in the game',''],['later',cnt.later+' later / not now','']].map(function(c){ return '<button class="tk-f'+(filt===c[0]?' on':'')+'" data-f="'+c[0]+'" style="--c:'+ST[c[0]][2]+'"><b>'+ST[c[0]][0]+' '+c[1]+'</b>'+(c[2]?'<small>'+c[2]+' still needed</small>':'')+'</button>'; }).join('')+
        '<button class="tk-f'+(filt==='all'?' on':'')+'" data-f="all" style="--c:#c8d4e4"><b>All '+all.length+'</b></button></div>';
      TRK.forEach(function(A){ var rows=A.items.filter(function(it){ var s=state(it); if(s==='answered')s='next'; if(s==='cut')s='later'; return filt==='all'||filt===s; }); if(!rows.length)return;
        h+='<h3 class="tk-a">'+A.ic+' '+esc(A.n)+'</h3>';
        rows.forEach(function(it){ var s=state(it), S=s==='answered'?['✅','Answered — Claude builds next','#7fc8ff']:ST[s], n=(it.st==='you'||it.st==='wait')?inputs(it):0, nn=P('trk-'+it.id).notes||'';
          h+='<div class="tk-r" style="--c:'+S[2]+'"><div class="tk-h"><span class="tk-st">'+S[0]+' '+S[1]+'</span>'+(n?'<span class="tk-n">'+n+' input'+(n>1?'s':'')+' needed</span>':'')+'<b class="tk-t">'+esc(it.n)+'</b>'+
            (it.tab&&LAB_TABS.some(function(t){ return t.id===it.tab; })?'<button class="tk-go" data-t="'+it.tab+'">Open →</button>':'')+'</div>'+
            (it.did?'<div class="tk-did">✔ <b>In the game:</b> '+esc(it.did)+'</div>':'')+(it.ask?'<div class="tk-ask">👉 '+esc(it.ask)+'</div>':'')+(it.note?'<div class="tk-note">'+esc(it.note)+'</div>':'')+
            '<div class="tk-m">'+(it.doc?'docs/'+esc(it.doc):'')+(it.r?' · round '+it.r:'')+'</div>'+
            '<textarea class="wl-n tk-in" data-k="trk-'+it.id+'" rows="1" placeholder="Your feedback on this…">'+esc(nn)+'</textarea></div>'; }); });
      h+='<h3 class="tk-a">✍️ Anything else — missing from this list, or a new idea</h3><textarea class="wl-n tk-in tk-big" data-k="trk-general" rows="4" placeholder="Anything we talked about that isn\'t here, or anything new…">'+esc(P('trk-general').notes||'')+'</textarea>';
      return h; } });
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('tracker')<0)LAB_ACTIVE.unshift('tracker');
  document.addEventListener('click',function(e){ var f=e.target.closest&&e.target.closest('.tk-f'); if(f){ filt=f.dataset.f; var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); return; }
    var g=e.target.closest&&e.target.closest('.tk-go'); if(g&&typeof LTODO!=='undefined'){ LTODO.goTo(g.dataset.t,'body',0); window.scrollTo(0,0); } });
  document.addEventListener('input',function(e){ var t=e.target; if(t&&t.classList&&t.classList.contains('tk-in')){ t.style.height='auto'; t.style.height=Math.min(400,t.scrollHeight+2)+'px'; } });
  var st=document.createElement('style'); st.textContent='.tk-sum{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 14px}.tk-f{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:8px 12px;border-radius:10px;border:1px solid #2a3a4e;border-left:5px solid var(--c);background:#0b121c;color:#e8eef6;cursor:pointer;font:13px "Segoe UI"}.tk-f.on{background:#16263a;box-shadow:0 0 0 2px var(--c)}.tk-f small{color:#ffd76a;font-size:11.5px}'+
    '.tk-a{font:600 17px "Segoe UI";color:#ffe9a8;margin:18px 0 8px}.tk-r{background:#0b121c;border:1px solid #243246;border-left:5px solid var(--c);border-radius:10px;padding:8px 12px;margin:0 0 8px}'+
    '.tk-h{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.tk-st{font:600 11.5px "Segoe UI";color:var(--c);white-space:nowrap}.tk-n{font:600 11.5px "Segoe UI";background:#5a4a14;color:#ffe9a8;border-radius:9px;padding:1px 8px}.tk-t{font:600 14px "Segoe UI";color:#e8eef6;flex:1;min-width:220px}'+
    '.tk-go{padding:3px 10px;font-size:12px}.tk-did{font:13px/1.45 "Segoe UI";color:#b8e8c4;margin:5px 0 0}.tk-ask{font:13px/1.45 "Segoe UI";color:#ffe9a8;margin:5px 0 0}.tk-note{font:13px/1.45 "Segoe UI";color:#c8d4e4;margin:5px 0 0}.tk-m{font:11px "Segoe UI";color:#7a8898;margin:4px 0 0}'+
    '.tk-in{width:100%;box-sizing:border-box;margin-top:6px;font:12.5px "Segoe UI";resize:vertical;min-height:30px}.tk-big{min-height:90px}';
  document.head.appendChild(st);
})();
