// ═══════════════════════════════════════════════════════════════════════
// ║ 79z4-lab-names2.js — round 129: TEN NEW NAMES FOR THE TWINS (Kris, Lab › Releasing the game, the name: "i want more ideas for names
// ║ before we choose something. i like zeldor cause it's like thor at the end. it doesn't need to be actual norse names. and we can't do things
// ║ that are hard to pronounce like scala and sigrun, repropose 10 new combos. And make sure they share the same first letter. Z or K are
// ║ great, but not necessary").
// ║ Each pair: the same first letter, two easy syllables, the brother's name ending in a "-dor" / "-or" that rings like Thor. None is a
// ║ character already in the game (checked against every name in src/js). Not legal advice: before choosing, search the trademark
// ║ registers (USPTO, EUIPO) and the Steam store for the pair and the title.
// ║ Picks: 'names2-<id>' ✓ / ? / ✕ + note; 'names2-fav' {regions:[id]} the favourite.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return (typeof LabApp!=='undefined'&&LabApp.picks[k])||{}; };
  // id, sister, brother, how to say them, the feel, the title, how close to something known
  var N=[
   ['kk','Kaira','Kaldor','KY-ra · KAL-dor','Kaira is soft and bright; Kaldor carries "kald", cold, and the Thor ring at the end.','The Quests of Kaira and Kaldor','low — "Kaldor City" is a small Doctor Who audio series; nothing in games'],
   ['zz','Zaria','Zandor','ZAR-ee-a · ZAN-dor','Keeps the Z you like and the "-dor"; no ZELD- at all, so it no longer sits near Zelda.','The Quests of Zaria and Zandor','low'],
   ['ee','Eira','Eldor','AY-ra · EL-dor','Eira is close to Eir, the Norse healer; Eldor to "eldr", fire — healing and fire, a good pair.','The Quests of Eira and Eldor','low'],
   ['hh','Hilda','Haldor','HIL-da · HAL-dor','Both real Norse names; Haldor (Hallþórr) means "Thor\'s rock" — Thor is literally in it.','The Quests of Hilda and Haldor','low — "Hilda" is also a children\'s comic and show; a common name'],
   ['bb','Brynn','Brandor','BRIN · BRAN-dor','Brynn is short and strong (from brynja, mail-shirt); Brandor has "brand", a sword or a burning log.','The Quests of Brynn and Brandor','low'],
   ['ll','Lyra','Lydor','LEER-a · LY-dor','Musical and light; Lyra is a star (and a name in a well-known novel series, though a common name).','The Quests of Lyra and Lydor','low'],
   ['mm','Mara','Mardor','MAR-a · MAR-dor','Short and easy; in old Norse tales a mara is a night spirit, which gives Mara a little mystery.','The Quests of Mara and Mardor','low'],
   ['ss','Sola','Soldor','SO-la · SOL-dor','Sun names — the twins as the light coming back after the Long Quiet.','The Quests of Sola and Soldor','low'],
   ['nn','Nella','Neldor','NEL-a · NEL-dor','Gentle and easy to say together; Neldor echoes a beech tree in Tolkien\'s older writings, but only faintly.','The Quests of Nella and Neldor','low'],
   ['zk','Zelia','Zeldor','ZEE-lee-a · ZEL-dor','Keeps Zeldor, the one you like, and changes only the sister (Zelia is a real name).','The Quests of Zelia and Zeldor','HIGH — the ZELD- start is still the part that sits nearest "Zelda"; a lawyer would likely advise against it']];
  // round 129b (Kris: "i like zelia. zeldor is still too close to zelda. see if there are other options close to zeldor, but don't have
  // "zeld". also ok to not have "or" at the end, but i still kind of like it. Come up with 10 new options"): Zelia stays; ten brothers.
  // Picks: 'names3-<id>' ✓ / ? / ✕ + note; 'names3-fav' {regions:[id]}.
  var B=[
   ['zethor','Zethor','ZETH-or','Thor is right there at the end — "Ze-thor". The nearest in sound to Zeldor without the "ld".','low — check'],
   ['zeltor','Zeltor','ZEL-tor','The closest to Zeldor in rhythm: only the d becomes a t. "Zel-" still shares three letters with Zelda, but no "zeld".','medium — the "Zel-" start is still a little near'],
   ['zelvar','Zelvar','ZEL-var','A Norse-sounding ending like Ingvar or Ivar; pairs well with Zelia (Zelia and Zelvar).','medium — "Zel-" again'],
   ['zoldor','Zoldor','ZOLE-dor','Zeldor with one vowel changed: the same "-dor" and the same weight, an o instead of an e.','low — check'],
   ['zaldor','Zaldor','ZAL-dor','Zeldor with an a: brighter, and further from Zelda than Zoldor.','low — check'],
   ['zador','Zador','ZAY-dor','Short and strong, two syllables; also a Hungarian family name.','low — check'],
   ['zalor','Zalor','ZAL-or','Keeps the "-or" but drops the d: softer, quick to say.','low — check'],
   ['zorvan','Zorvan','ZOR-van','No "-or" ending (you said it is fine): a darker, harder sound for the brother.','low — check'],
   ['zander','Zander','ZAN-der','A real name (from Alexander), easy everywhere in the world; the plainest choice.','low — a common first name, so nothing to own'],
   ['zarek','Zarek','ZAR-ek','Short and sharp; no "-or". A minor character in a TV series once had the surname.','low — check']];
  var bcard=function(n){ var k='names3-'+n[0], v=P(k).verdict||'', fav=(P('names3-fav').regions||[])[0];
    return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>Zelia &amp; '+esc(n[1])+'</b><button class="vbtn nm-fav3'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
      '<div class="nm-say">ZEE-lee-a · '+esc(n[2])+'</div><div class="nm-title">The Quests of Zelia and '+esc(n[1])+'</div><p>'+esc(n[3])+'</p><p class="nm-risk'+(/^medium/.test(n[4])?' hi':'')+'">Close to anything known: '+esc(n[4])+'</p>'+
      '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; };
  LAB_TABS.push({ id:'names2', name:'The twins\' names — 10 more',
    blurb:'<b>Round 2 (top): Zelia stays, and ten names for the brother without "zeld"</b> — some keep the "-or", a few do not. <b>Round 1</b> below: ten new pairs, as you asked. Each shares its first letter, is easy to say, and the brother\'s name ends like Thor. None clashes with a name already in the game. The last one keeps Zeldor so you can weigh it honestly: the ZELD- start is the part that sits close to Zelda. ✓ the ones you like, ★ your favourite, and I\'ll check the shortlist against the trademark registers and the Steam store (not legal advice — a lawyer should confirm the final choice).',
    designs:N.map(function(n){ return {id:'names2-'+n[0],name:'Names: '+n[1]+' & '+n[2]}; }),
    render:function(){ var fav=(P('names2-fav').regions||[])[0];
      return '<h3 class="nm-sec">Round 2 — Zelia stays: ten brothers without "zeld"</h3><div class="nm-g">'+B.map(bcard).join('')+'</div><h3 class="nm-sec">Round 1 — the ten pairs</h3><div class="nm-g">'+N.map(function(n){ var k='names2-'+n[0], v=P(k).verdict||'', hi=/^HIGH/.test(n[6]);
        return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>'+esc(n[1])+' &amp; '+esc(n[2])+'</b><button class="vbtn nm-fav'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
          '<div class="nm-say">'+esc(n[3])+'</div><div class="nm-title">'+esc(n[5])+'</div><p>'+esc(n[4])+'</p><p class="nm-risk'+(hi?' hi':'')+'">Close to anything known: '+esc(n[6])+'</p>'+
          '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
          '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; }).join('')+'</div>'+
        '<textarea class="wl-n wl-all" data-k="names2-all" placeholder="Anything about the names — a sound you want, a letter, one to mix…">'+esc(P('names2-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'names3',label:'✍ Zelia and …: ten names for the brother without "zeld" — ✓ the ones you like and ★ a favourite',where:'The twins\' names tab (round 2, at the top)',
    done:function(){ return !!(P('names3-fav').regions||[]).length; },go:function(){ LTODO.goTo('names2','.nm-c',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('names2')<0)LAB_ACTIVE.unshift('names2');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.nm-fav,.nm-fav3'); if(b){ var k=b.classList.contains('nm-fav3')?'names3-fav':'names2-fav', p=LabApp.picks[k]||(LabApp.picks[k]={}); p.regions=[b.dataset.c]; if(LabApp.persist)LabApp.persist(k); setTimeout(function(){ var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); },0); return; }
    var s=e.target.closest&&e.target.closest('.nm-c .wl-sg'); if(s){ var c=s.closest('.nm-c'); setTimeout(function(){ var p=LabApp.picks[s.parentNode.dataset.k]||{}; c.className='nm-c'+(p.verdict?' v-'+p.verdict:'')+(c.querySelector('.nm-fav.on,.nm-fav3.on')?' fav':''); },0); } });
  var st=document.createElement('style'); st.textContent='.nm-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}.nm-c{background:#0b121c;border:1px solid #243246;border-top:4px solid #7fc8ff;border-radius:10px;padding:10px 12px;font:13px/1.45 "Segoe UI";color:#c8d4e4}.nm-c.v-pick{border-color:#8fe8a0}.nm-c.v-maybe{border-color:#ffd76a}.nm-c.v-cut{border-color:#ff9a8a;opacity:.7}.nm-c.fav{box-shadow:0 0 0 2px #ffd76a}'+
    '.nm-h{display:flex;justify-content:space-between;align-items:center;gap:8px}.nm-h b{font:600 20px "Segoe UI";color:#ffe9a8}.nm-fav.on,.nm-fav3.on{background:#5a4a10;color:#ffe9a8}.nm-sec{font:600 18px "Segoe UI";color:#ffe9a8;margin:14px 0 8px}.nm-say{color:#9fe8ff;font:12px "Segoe UI";letter-spacing:.5px}.nm-title{font:italic 13px Georgia,serif;color:#e8d8b0;margin:2px 0 4px}.nm-c p{margin:4px 0}.nm-risk{color:#8a9ab0;font-size:12px}.nm-risk.hi{color:#ffb0a0}';
  document.head.appendChild(st);
})();
