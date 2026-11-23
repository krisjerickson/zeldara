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
  // round 129c (Kris: "these are only OK, come up with 20 new combos that use K for the first letter. look to nordic themes for inspiration,
  // but they need to be easy to pronounce, and don't have to be nordic"). Picks: 'names4-<id>' ✓ / ? / ✕ + note; 'names4-fav' {regions:[id]}.
  var K=[
   ['k01','Kaia','Kaedor','KY-a · KAY-dor','Kaedor keeps the rhythm and the "-dor" of Zeldor you liked; Kaia is light and quick.'],
   ['k02','Kelda','Kenrik','KEL-da · KEN-rik','In Old Norse a kelda is a spring of water; Kenrik is a Nordic twist on Henrik.'],
   ['k03','Katla','Korvin','KAT-la · KOR-vin','Katla is an Icelandic volcano (and a dragon in a much-loved Swedish children\'s tale); Korvin means raven, as in Odin\'s ravens.'],
   ['k04','Kara','Karsten','KAR-a · KAR-sten','Kára is a valkyrie in the old poems; Karsten is a common Danish and Norwegian name. Strong and plain.'],
   ['k05','Kira','Kolvar','KEER-a · KOL-var','Kolvar ends like Ingvar and Ivar — Norse without being hard to say.'],
   ['k06','Kenna','Kendor','KEN-a · KEN-dor','The closest echo of each other: Ken-na and Ken-dor. Twins whose names rhyme in the middle.'],
   ['k07','Kaja','Kasper','KY-a · KAS-per','Both everyday names in Denmark and Norway today; Kasper was one of the three wise men.'],
   ['k08','Karin','Kaldrin','KAR-in · KAL-drin','Kaldrin has "kald", cold — a winter-born brother; Karin is the Nordic Katherine.'],
   ['k09','Kyra','Kodran','KY-ra · KOD-ran','Kodran is a man in one of the old Icelandic sagas; Kyra is bright and modern.'],
   ['k10','Kaisa','Kestor','KY-sa · KES-tor','Kaisa is the Finnish Katherine; Kestor ends in "-tor", the Thor sound.'],
   ['k11','Kirsa','Kardor','KEER-sa · KAR-dor','Kirsa comes from the cherry (kirsebær); Kardor is solid, a "-dor" name with weight.'],
   ['k12','Kalla','Kalvar','KAL-a · KAL-var','Matching first halves: Kal-la and Kal-var. Kalla also means "to call" in Swedish.'],
   ['k13','Klara','Kristof','KLAR-a · KRIS-tof','Clear and bright (Klara means "clear"); Kristof is easy everywhere.'],
   ['k14','Kelsa','Kelvor','KEL-sa · KEL-vor','Another matched pair (Kel-sa, Kel-vor) with the "-or" at the end.'],
   ['k15','Katrin','Kordan','KAT-rin · KOR-dan','A classic Nordic sister\'s name with a strong, rolling brother\'s name.'],
   ['k16','Kaya','Kade','KY-a · KADE','The shortest pair: one syllable for him, two for her; quick to say and to shout.'],
   ['k17','Kerra','Korrin','KER-a · KOR-in','Both with a rolled double r; Korrin has a little of the forest (corrie, a mountain hollow).'],
   ['k18','Kaili','Konrad','KY-lee · KON-rad','Konrad (bold counsel) is a long-loved name in the North; Kaili is soft beside it.'],
   ['k19','Kolla','Koldor','KOL-a · KOL-dor','Kolla is an Old Norse woman\'s name; Koldor (from "kol", coal) — a hearth-and-forge brother.'],
   ['k20','Kinna','Kilian','KIN-a · KIL-ee-an','Kinna is a Swedish town and name; Kilian is easy and gentle.']];
  var kcard=function(n){ var k='names4-'+n[0], v=P(k).verdict||'', fav=(P('names4-fav').regions||[])[0];
    return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>'+esc(n[1])+' &amp; '+esc(n[2])+'</b><button class="vbtn nm-fav4'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
      '<div class="nm-say">'+esc(n[3])+'</div><div class="nm-title">The Quests of '+esc(n[1])+' and '+esc(n[2])+'</div><p>'+esc(n[4])+'</p>'+
      '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; };
  // round 129d (Kris: "i like having the first 3 letters be the same, let's iterate off that a bit. keep options for starting with Z, K, X and E,
  // with at least 5 with each of those letters"). Picks: 'names5-<id>' ✓ / ? / ✕ + note; 'names5-fav' {regions:[id]}.
  var R4=[
   ['Z','Z — the start you have now (no "zeld")',[
     ['z1','Zelia','Zelvar','ZEE-lee-a · ZEL-var','Keeps Zelia, the one you like; Zelvar ends like Ingvar. "Zel" is still three letters of Zelda, so a little risk stays.','medium'],
     ['z2','Zaria','Zardor','ZAR-ee-a · ZAR-dor','"Zar" in both; Zardor keeps the Thor-like "-dor". Well away from Zelda.',''],
     ['z3','Zana','Zandor','ZAH-na · ZAN-dor','Soft and strong side by side; the closest in sound to Zeldor without the "ld".',''],
     ['z4','Zola','Zoldor','ZOH-la · ZOLE-dor','Zeldor with an o — the same weight and ending.',''],
     ['z5','Zeva','Zevrin','ZAY-va · ZEV-rin','Lighter and less heroic; a quieter pair.',''],
     ['z6','Zaila','Zaidor','ZY-la · ZY-dor','"Zai" in both, said like "sky" with a Z.','']]],
   ['K','K — Nordic and easy',[
     ['k1','Kaia','Kaidor','KY-a · KY-dor','The pair you liked in round 3, made to share "Kai".',''],
     ['k2','Kelda','Kelvor','KEL-da · KEL-vor','A spring of water (Old Norse kelda) and a "-vor" brother.',''],
     ['k3','Kenna','Kendor','KEN-a · KEN-dor','The clearest match of all: Ken-na and Ken-dor.',''],
     ['k4','Kalla','Kalvar','KAL-a · KAL-var','"Kal" in both; Kalvar ends like Ingvar.',''],
     ['k5','Kolla','Koldor','KOL-a · KOL-dor','Old Norse Kolla; Koldor from "kol", coal — the forge brother.',''],
     ['k6','Kara','Kardor','KAR-a · KAR-dor','Kára the valkyrie; Kardor solid and short.',''],
     ['k7','Kirsa','Kirvan','KEER-sa · KEER-van','Cherry (kirsebær) and a softer, non "-or" brother.','']]],
   ['X','X — said as a Z (as in Xavier), so they keep the sound you like but look new',[
     ['x1','Xana','Xandor','ZAH-na · ZAN-dor','Sounds like Zana and Zandor, looks unlike anything else on a shelf.',''],
     ['x2','Xenia','Xendor','ZEE-nee-a · ZEN-dor','Xenia is a real name (Greek: welcome to the stranger) — fitting for a hero who frees others.',''],
     ['x3','Xyla','Xylor','ZY-la · ZY-lor','Playful and light; the y makes both easy.',''],
     ['x4','Xara','Xarvik','ZAR-a · ZAR-vik','"-vik" is the Norse word for a bay, as in Reykjavík.',''],
     ['x5','Xela','Xelvar','ZEE-la · ZEL-var','Said almost like Zelia and Zelvar; on paper nothing like Zelda, but it sounds near.','medium']]],
   ['E','E — the old poems and the first people',[
     ['e1','Embla','Embor','EM-bla · EM-bor','In the Norse tale of making, Embla is the first woman; Embor sounds like ember. A pair with a story.',''],
     ['e2','Eira','Eirdor','AY-ra · AYR-dor','Eira is close to Eir, the healer; Eirdor keeps the "-dor".',''],
     ['e3','Erla','Erlend','ER-la · ER-lend','Both real Nordic names; Erlend means "from far away".',''],
     ['e4','Elva','Elvor','EL-va · EL-vor','Elva is a river in the old tongues; Elvor flows with it.',''],
     ['e5','Eldra','Eldor','EL-dra · EL-dor','"Eld", fire, in both. (Eldor is already the second half of the Z-logo\'s "Z·eldor", so the logo idea could carry over.)',''],
     ['e6','Elina','Elidor','EL-ee-na · EL-ee-dor','Gentle and lyrical; Elidor is also the title of an old British children\'s novel.','']]]];
  var r4card=function(n){ var k='names5-'+n[0], v=P(k).verdict||'', fav=(P('names5-fav').regions||[])[0];
    return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>'+esc(n[1])+' &amp; '+esc(n[2])+'</b><button class="vbtn nm-fav5'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
      '<div class="nm-say">'+esc(n[3])+'</div><div class="nm-title">The Quests of '+esc(n[1])+' and '+esc(n[2])+'</div><p>'+esc(n[4])+'</p>'+(n[5]?'<p class="nm-risk hi">Close to Zelda: '+esc(n[5])+'</p>':'')+
      '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; };
  // round 129e (Kris: "my favorites are: Eldar and Eldor; Xana and Xandor; Zola and Zoldor. But we aren't quite there yet. iterate off of
  // these for 30 more options. doesn't have to start with the letters i said. i also kinda like the X ones. Can also be 3 syllables for 1 of the
  // names"). Picks: 'names6-<id>' ✓ / ? / ✕ + note; 'names6-fav' {regions:[id]}.
  var R5=[
   ['Fire — from Eldra and Eldor ("eld" is fire in the old Norse tongue)',[
     ['f1','Eldra','Eldoran','EL-dra · EL-do-ran','Your favourite with a three-syllable brother: grander, still easy.',''],
     ['f2','Eldria','Eldor','EL-dree-a · EL-dor','The three syllables go to the sister instead; Eldor stays as you liked it.',''],
     ['f3','Eldwyn','Eldor','ELD-win · EL-dor','"Wyn" means joy in old English — fire and joy.',''],
     ['f4','Eldra','Eldvar','EL-dra · ELD-var','Eldor with a Norse "-var" ending, like Ingvar.',''],
     ['f5','Ilda','Ildor','IL-da · IL-dor','One vowel changed from Eld- to Ild- (in Norwegian, ild is fire too).',''],
     ['f6','Velda','Veldor','VEL-da · VEL-dor','A V instead of the E: the same shape, a stronger start.',''],
     ['f7','Melda','Meldor','MEL-da · MEL-dor','Softer, with an M; the "-dor" kept.',''],
     ['f8','Hilda','Hildor','HIL-da · HIL-dor','Hilda (battle) is old and real; Hildor shares her first three letters.','']]],
   ['X — from Xana and Xandor (said as a Z)',[
     ['x1','Xola','Xoldor','ZOH-la · ZOLE-dor','Zola and Zoldor, written with an X: both of your favourites in one.',''],
     ['x2','Xalia','Xaldor','ZAY-lee-a · ZAL-dor','A three-syllable sister; the shape of Zelia and Zeldor without the "zeld".',''],
     ['x3','Xandra','Xandor','ZAN-dra · ZAN-dor','Xana with a d, so both names share "Xand".',''],
     ['x4','Xanthe','Xandor','ZAN-thee · ZAN-dor','Xanthe is a real Greek name (golden-haired); "Xan" in both.',''],
     ['x5','Xana','Xandoran','ZAH-na · ZAN-do-ran','Your favourite with a three-syllable brother.',''],
     ['x6','Xenna','Xenvar','ZEN-a · ZEN-var','"Xen" in both and a Norse "-var" ending.',''],
     ['x7','Xyra','Xydor','ZY-ra · ZY-dor','Short and bright; the y keeps them easy.',''],
     ['x8','Xaria','Xardor','ZAR-ee-a · ZAR-dor','A three-syllable sister, a weighty brother.',''],
     ['x9','Xira','Xirdor','ZEER-a · ZEER-dor','Light and quick, with the "-dor" kept.',''],
     ['x10','Xilda','Xildor','ZIL-da · ZIL-dor','Said "Zilda", which rhymes with Zelda — close in sound.','medium']]],
   ['Zo- — from Zola and Zoldor',[
     ['z1','Zoldra','Zoldor','ZOLE-dra · ZOLE-dor','Zola and Eldra in one: "Zold" in both. The closest blend of two of your favourites.',''],
     ['z2','Zolina','Zoldor','zoh-LEE-na · ZOLE-dor','A three-syllable sister beside the Zoldor you liked.',''],
     ['z3','Zoela','Zoldor','zoh-EL-a · ZOLE-dor','Another three-syllable sister, softer than Zolina.',''],
     ['z4','Zola','Zoldar','ZOH-la · ZOLE-dar','Zoldor with an "-ar" ending: a little more Norse.',''],
     ['z5','Zolva','Zolvar','ZOLE-va · ZOLE-var','"Zolv" in both and a "-var" brother.',''],
     ['z6','Zona','Zondor','ZOH-na · ZON-dor','The same pattern with an n: round and strong.','']]],
   ['Other letters, the same pattern',[
     ['o1','Kola','Koldor','KOH-la · KOL-dor','Zola and Zoldor with a K; "kol" is coal — the forge twins.',''],
     ['o2','Elora','Elodor','e-LOR-a · EL-o-dor','Both three syllables, flowing; "Elo" in both.',''],
     ['o3','Tola','Toldor','TOH-la · TOLE-dor','Plain and sturdy; the Zola pattern with a T.',''],
     ['o4','Vanna','Vandor','VAN-a · VAN-dor','The Xana pattern with a V: easier to read for some players.',''],
     ['o5','Brenna','Brendor','BREN-a · BREN-dor','A strong start, "Bren" in both.',''],
     ['o6','Isla','Islor','EYE-la · EYE-lor','Isla (island) and an "-or" brother: the twins from the shore.','']]]];
  var r5card=function(n){ var k='names6-'+n[0], v=P(k).verdict||'', fav=(P('names6-fav').regions||[])[0];
    return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>'+esc(n[1])+' &amp; '+esc(n[2])+'</b><button class="vbtn nm-fav6'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
      '<div class="nm-say">'+esc(n[3])+'</div><div class="nm-title">The Quests of '+esc(n[1])+' and '+esc(n[2])+'</div><p>'+esc(n[4])+'</p>'+(n[5]?'<p class="nm-risk hi">Close to Zelda: '+esc(n[5])+'</p>':'')+
      '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; };
  LAB_TABS.push({ id:'names2', name:'The twins\' names — 10 more',
    blurb:'<b>✓ Chosen (round 129): Zola &amp; Zoldor — said ZOH-la and ZOL-dor — now in the game.</b> The rounds below stay for the record. <b>Round 5:</b> thirty more from your favourites</b> — fire names from Eldra and Eldor, ten X pairs from Xana and Xandor, Zo- pairs from Zola and Zoldor, and the same pattern with other letters; some with a three-syllable name. <b>Round 4:</b> the first three letters the same</b> — six starting with Z, seven with K, five with X (said as a Z) and six with E. <b>Round 3:</b> twenty pairs that start with K</b> — Nordic-flavoured, easy to say, none already a name in the game (Kai, Kari and Kettil are, so they were left out). <b>Round 2:</b> Zelia stays, and ten names for the brother without "zeld"</b> — some keep the "-or", a few do not. <b>Round 1</b> below: ten new pairs, as you asked. Each shares its first letter, is easy to say, and the brother\'s name ends like Thor. None clashes with a name already in the game. The last one keeps Zeldor so you can weigh it honestly: the ZELD- start is the part that sits close to Zelda. ✓ the ones you like, ★ your favourite, and I\'ll check the shortlist against the trademark registers and the Steam store (not legal advice — a lawyer should confirm the final choice).',
    designs:N.map(function(n){ return {id:'names2-'+n[0],name:'Names: '+n[1]+' & '+n[2]}; }),
    render:function(){ var fav=(P('names2-fav').regions||[])[0];
      return '<h3 class="nm-sec">Round 5 — thirty more, from your three favourites</h3><p class="nm-note">Your favourites: Eldra &amp; Eldor, Xana &amp; Xandor, Zola &amp; Zoldor. (One note: you wrote "Eldar" — Eldar is the name of Tolkien\'s elves and of a race in Warhammer 40,000, so Eldra, or the forms below, keep clear of that.)</p>'+R5.map(function(g){ return '<h4 class="nm-l">'+esc(g[0])+'</h4><div class="nm-g">'+g[1].map(r5card).join('')+'</div>'; }).join('')+'<h3 class="nm-sec">Round 4 — the first three letters the same: Z, K, X and E</h3>'+R4.map(function(g){ return '<h4 class="nm-l">'+esc(g[1])+'</h4><div class="nm-g">'+g[2].map(r4card).join('')+'</div>'; }).join('')+'<h3 class="nm-sec">Round 3 — twenty pairs that start with K</h3><div class="nm-g">'+K.map(kcard).join('')+'</div><h3 class="nm-sec">Round 2 — Zelia stays: ten brothers without "zeld"</h3><div class="nm-g">'+B.map(bcard).join('')+'</div><h3 class="nm-sec">Round 1 — the ten pairs</h3><div class="nm-g">'+N.map(function(n){ var k='names2-'+n[0], v=P(k).verdict||'', hi=/^HIGH/.test(n[6]);
        return '<div class="nm-c'+(v?' v-'+v:'')+(fav===n[0]?' fav':'')+'"><div class="nm-h"><b>'+esc(n[1])+' &amp; '+esc(n[2])+'</b><button class="vbtn nm-fav'+(fav===n[0]?' on':'')+'" data-c="'+n[0]+'">'+(fav===n[0]?'★ Favourite':'☆ Favourite')+'</button></div>'+
          '<div class="nm-say">'+esc(n[3])+'</div><div class="nm-title">'+esc(n[5])+'</div><p>'+esc(n[4])+'</p><p class="nm-risk'+(hi?' hi':'')+'">Close to anything known: '+esc(n[6])+'</p>'+
          '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ I like it'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg nm-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'+
          '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div>'; }).join('')+'</div>'+
        '<textarea class="wl-n wl-all" data-k="names2-all" placeholder="Anything about the names — a sound you want, a letter, one to mix…">'+esc(P('names2-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'names6',label:'✍ The twins\' names, round 5: thirty more from your favourites — ✓ and ★ a favourite',where:'The twins\' names tab (round 5, at the top)',
    done:function(){ return !!(P('names6-fav').regions||[]).length; },go:function(){ LTODO.goTo('names2','.nm-c',0); }});
  if(typeof LTODO!=='undefined')LTODO.add({id:'names5',label:'✍ The twins\' names, round 4: the first three letters the same (Z, K, X, E) — ✓ and ★ a favourite',where:'The twins\' names tab (round 4, at the top)',
    done:function(){ return !!(P('names5-fav').regions||[]).length; },go:function(){ LTODO.goTo('names2','.nm-c',0); }});
  if(typeof LTODO!=='undefined')LTODO.add({id:'names4',label:'✍ The twins\' names, round 3: twenty pairs starting with K — ✓ the ones you like and ★ a favourite',where:'The twins\' names tab (round 3, at the top)',
    done:function(){ return !!(P('names4-fav').regions||[]).length; },go:function(){ LTODO.goTo('names2','.nm-c',0); }});
  if(typeof LTODO!=='undefined')LTODO.add({id:'names3',label:'✍ Zelia and …: ten names for the brother without "zeld" — ✓ the ones you like and ★ a favourite',where:'The twins\' names tab (round 2, at the top)',
    done:function(){ return !!(P('names3-fav').regions||[]).length; },go:function(){ LTODO.goTo('names2','.nm-c',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('names2')<0)LAB_ACTIVE.unshift('names2');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.nm-fav,.nm-fav3,.nm-fav4,.nm-fav5,.nm-fav6'); if(b){ var k=b.classList.contains('nm-fav6')?'names6-fav':b.classList.contains('nm-fav5')?'names5-fav':b.classList.contains('nm-fav4')?'names4-fav':b.classList.contains('nm-fav3')?'names3-fav':'names2-fav', p=LabApp.picks[k]||(LabApp.picks[k]={}); p.regions=[b.dataset.c]; if(LabApp.persist)LabApp.persist(k); setTimeout(function(){ var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); },0); return; }
    var s=e.target.closest&&e.target.closest('.nm-c .wl-sg'); if(s){ var c=s.closest('.nm-c'); setTimeout(function(){ var p=LabApp.picks[s.parentNode.dataset.k]||{}; c.className='nm-c'+(p.verdict?' v-'+p.verdict:'')+(c.querySelector('.nm-fav.on,.nm-fav3.on,.nm-fav4.on,.nm-fav5.on,.nm-fav6.on')?' fav':''); },0); } });
  var st=document.createElement('style'); st.textContent='.nm-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}.nm-c{background:#0b121c;border:1px solid #243246;border-top:4px solid #7fc8ff;border-radius:10px;padding:10px 12px;font:13px/1.45 "Segoe UI";color:#c8d4e4}.nm-c.v-pick{border-color:#8fe8a0}.nm-c.v-maybe{border-color:#ffd76a}.nm-c.v-cut{border-color:#ff9a8a;opacity:.7}.nm-c.fav{box-shadow:0 0 0 2px #ffd76a}'+
    '.nm-h{display:flex;justify-content:space-between;align-items:center;gap:8px}.nm-h b{font:600 20px "Segoe UI";color:#ffe9a8}.nm-l{font:600 15px "Segoe UI";color:#9fe8ff;margin:10px 0 6px}.nm-note{font:13px "Segoe UI";color:#ffcf9a}.nm-fav.on,.nm-fav3.on,.nm-fav4.on,.nm-fav5.on,.nm-fav6.on{background:#5a4a10;color:#ffe9a8}.nm-sec{font:600 18px "Segoe UI";color:#ffe9a8;margin:14px 0 8px}.nm-say{color:#9fe8ff;font:12px "Segoe UI";letter-spacing:.5px}.nm-title{font:italic 13px Georgia,serif;color:#e8d8b0;margin:2px 0 4px}.nm-c p{margin:4px 0}.nm-risk{color:#8a9ab0;font-size:12px}.nm-risk.hi{color:#ffb0a0}';
  document.head.appendChild(st);
})();
