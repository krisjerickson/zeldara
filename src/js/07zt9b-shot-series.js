// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt9b-shot-series.js — round 112: FROM VIDEOS TO SHOT SERIES (Kris: "video are still very difficult to make well … Instead of videos,
// ║ let's turn each current image into a series of 3-10 different images, and we'll request these via openAI API like we did for the
// ║ previous images … try and still create cinematic effects, where possible … Start with your top 10 ideas to try").
// ║  · Each story frame (07zt6 ZSB) becomes a short run of shots cut from the SAME moment — an establishing wide, a macro insert, an
// ║    extreme close-up on the eyes, a reaction, a low-angle hero shot… — that the game plays like a film: each shot held 1.2–2.5 s with
// ║    one camera move (push, pull, pan, tilt, crane, orbit, shake) and a cut between shots (hard cut, white or red flash, whip, dissolve,
// ║    dip to black).
// ║  · ZSS.TOP: the first series (round 112: ten, 63 shots; round 112d: Kris's cut — nine, 3 shots each, 26 pictures). Each shot is ONE picture: sheet sc_ss_<scene>_<nn>_<k> (+ _m when the hero is in it —
// ║    Kris: Zeldor first, Zeldara once the look is right). Its first reference is the story frame it is cut from, so the place, the
// ║    light and the people stay the same; only the camera changes.
// ║  · ZSS.PLAN: the rule that breaks every other frame into a series (the Lab's Shot series tab shows all 259 frames with their plan).
// ║  · Shot fields: [who, lens, what we see, cut in, camera move, crop] — who 'h' (Zeldor) or 0 (no hero); crop [cx, cy, zoom] on the
// ║    story frame, for the Lab's rough animatic until the pictures are in.
// ║ Wave 112. List for the painter: sprites/requests/r112.txt (.\tools\sprites\redo.ps1 -List r112).
// ═══════════════════════════════════════════════════════════════════════
var ZSS={ WAVE:112,
  LENS:{wide:'Establishing wide',xwide:'Extreme wide',med:'Medium',two:'Two-shot',ots:'Over the shoulder',close:'Close-up',ecu:'Extreme close-up',macro:'Macro insert',insert:'Insert',low:'Low angle',high:'High angle',top:'Straight down',react:'Reaction',track:'Tracking',bullet:'Frozen moment',sil:'Silhouette',pov:'Point of view'},
  CUT:{fade:'fade in',cut:'hard cut',flash:'white flash',flashred:'red flash',flashblue:'blue flash',whip:'whip pan',dissolve:'dissolve',dip:'dip to black'},
  MOVE:{push:'slow push-in',pull:'pull back',panL:'pan left',panR:'pan right',tiltU:'tilt up',tiltD:'tilt down',crane:'crane up',orbit:'slow orbit',shake:'camera shake',hold:'hold still',track:'track along'},
  TOP:[], SHEETS:[] };
(function(){
  var HG='the four heart-shaped Heartglasses exactly as in the Heartglass icon reference (heart-shaped gems of light in thin gold rings: green with a leaf-rune, blue with a wave-rune, amber with a mountain-rune, red with a flame-rune — NOT hourglasses, bottles, vials or round gems)';
  var HEARTH=' — inside the great hearth exactly as in the great-hearth reference: the dark forge cavern deep in the mountain, the huge black anvil on its stepped stone dais lit orange from below by lava, the carved rune-arch with its glowing rune-blue sigil; NO open sky, no aurora';
  var LODE='the Lodestar (exactly as in the Lodestar reference: a white-gold staff with a twisted shaft, its head a rune-carved gold ring holding six small round gems — red, orange, yellow, violet, blue and green — around a large clear glowing lens with a faint World Tree inside)';
  var SOL='Solmyrk in his first form, the Gilded Seraph (copy the reference exactly: three pairs of great golden wings, a full-face golden helm with a single glowing white eye-slit and a tall mitre-like crest, a cope of white and gold, a sun-star scepter, hovering with no legs)';
  var GODS='Odin (the old one-eyed god: silver braided beard, wide grey hat, deep blue wolf-fur cloak, the spear Gungnir, a black raven) and Freya (red-gold hair braided with flowers, falcon-feather cloak, glowing amber necklace) — warm and natural, NOT golden, NOT masked';
  var FOLK='villagers — grown-ups and elders only, a mix of skin tones';
  var T=function(scene,n,why,shots){ ZSS.TOP.push({scene:scene,n:n,why:why,shots:shots}); };

  T('opening',5,'The storm is the moment the whole saga turns on. As one frame it is a single bolt; as a series it becomes a chain of strikes marching across the land to the village — the build-up a still cannot show.',[
   [0,'xwide','night over the Grasslands from a hilltop: a wall of black storm cloud rolling in over rolling fields dotted with tall carved runestones, the aurora above being swallowed by the cloud, the village far off by the lake lit by small lanterns','fade','push',[.5,.45,1]],
   [0,'wide','the first bolt: one huge blue-white lightning bolt strikes a lone runestone far out in the fields; its carved rune flashes neon rune-blue; the grass round it flattened by the blast, rain slanting','flash','shake',[.5,.4,1.4]],
   [0,'wide','a line of runestones running across the fields toward the viewer, lightning striking the second and the third in a row, each stone blazing rune-blue in turn — a chain of strikes marching closer','cut','push',[.45,.5,1.2]],
   [0,'low','close on one weathered runestone as lightning hits its top: a burst of light, sparks and chips of stone, its carved rune glowing white-hot fading to neon blue, rain lashing sideways','flash','shake',[.55,.45,2.2]],
   [0,'react',FOLK+' huddled under a dripping thatched porch at the village edge, faces lit blue-white by the flashes: an old woman clutching her shawl, a bearded man pointing out at the fields','cut','panR',[.2,.6,1.8]],
   [0,'low','the village Runestone on the Green, carved with a great tree, struck by the biggest bolt of all: a pillar of blue-white light from sky to stone, the tree carving blazing neon rune-blue, raindrops frozen in the flash','flash','pull',[.5,.4,1.6]],
   [0,'wide','moments later: the storm moving off, smoke curling from the Runestone, its runes still glowing softly, wet cobbles reflecting the glow, the first grey of dawn behind the mountains','dissolve','pull',[.5,.5,1]]]);
  T('opening',7,'The reveal of the twins. A slow approach, the blanket folded back, and the eyes opening in extreme close-up — the classic reveal, cut against the villagers\' faces.',[
   [0,'insert','close on the woven basket bumping gently against the wooden pier posts in the dawn mist, frost on its rope handle, the blanket inside rising and falling with tiny breaths','fade','push',[.4,.65,2]],
   [0,'ots','over the shoulder of a broad old fisher kneeling on the pier, weathered hands reaching for the basket\'s rim; boots and lanterns of '+FOLK+' gathered behind','cut','panR',[.35,.55,1.4]],
   [0,'close','the blanket folded back by an old hand: two newborn babes side by side, eyes closed, cheeks pink in the cold — a baby boy with a soft tuft of brown hair and a baby girl with a soft tuft of auburn hair — a faint rune-blue glow under their eyelids','cut','push',[.45,.6,2.2]],
   [0,'ecu','extreme close-up of one newborn\'s eyes opening: big teal irises glowing neon rune-blue, tiny runes reflected in them','flashblue','push',[.47,.58,4]],
   [0,'react',FOLK+' leaning in with lanterns, faces lit blue from below by the babes\' glow: wonder, tears, an elder covering her mouth','cut','panL',[.7,.4,1.6]],
   [0,'xwide','the end of the misty pier at sunrise: the small crowd round the basket glowing blue in their midst, Mirror Lake perfectly still, village roofs behind, the last of the aurora fading','dissolve','pull',[.5,.5,1]]]);
  T('spirit',5,'The first time your power wakes — the core of every spirit you will ever free. Inserts and extreme close-ups make the touch feel like ignition.',[
   [0,'macro','macro close-up of the single carved rune on the tall dark bindstone, its grooves flickering faint rune-blue, ember-red chains biting the stone beside it','cut','push',[.6,.4,2.6]],
   ['h','ots','over Zeldor\'s shoulder: his open hand reaching slowly toward the rune, the pale chained spirit woman watching from beside the stone','cut','push',[.45,.5,1.5]],
   ['h','ecu','Zeldor\'s palm pressed flat on the carved rune, fingers spread, the first rune-blue light seeping out between his fingers into the stone\'s grooves','cut','shake',[.55,.4,3]],
   ['h','ecu','extreme close-up of Zeldor\'s eyes as they ignite: his teal irises blazing neon rune-blue, light spilling across his brow and spiky brown hair','flashblue','push',[.3,.35,3.5]],
   [0,'track','rune-blue light racing along the black chain links like fire along a fuse, each link lighting in turn, the ember-red glow pushed back before it','whip','track',[.7,.5,2.2]],
   ['h','low','low angle: Zeldor braced against the towering bindstone with one hand on it, cape flaring, the whole stone lit with neon rune-blue lines, the spirit above him lifting her head, aurora overhead','cut','tiltU',[.5,.5,1.1]]]);
  T('spirit',6,'The chains breaking is pure action. Slowed down into a macro, a burst, a frozen moment and the aftermath, it reads like slow motion in a film.',[
   [0,'macro','macro: one black-iron chain link under strain, a hairline crack of rune-blue light splitting through it, ember sparks flaking off','cut','push',[.6,.45,3]],
   ['h','wide','the burst: every chain exploding outward from the bindstone in a ring of rune-blue light, Zeldor thrown back a step with his arm across his eyes','flash','shake',[.5,.5,1]],
   [0,'bullet','frozen moment: dozens of broken glowing chain links hanging in mid-air round the stone like a halo, each trailing light, the night meadow and aurora behind','cut','orbit',[.55,.4,1.3]],
   [0,'low','low angle on the pale spirit woman flinging up her arms as the last chain falls from her wrist, shawl and hair lifting, light pouring from where the chains were','cut','tiltU',[.55,.3,1.8]],
   ['h','react','close on Zeldor lowering his arm from his eyes, rune-blue glow on his face, mouth open in awe, glowing link fragments drifting past','cut','push',[.3,.55,2.2]],
   [0,'insert','broken chain links falling into dewy grass and cooling from rune-blue to dull black, small white flowers round them','dissolve','tiltD',[.5,.85,2.4]]]);
  T('ashnight',4,'A disaster told as time-lapse: the same ridge in four stages, from a red glow to a wall of fire reaching the clouds — then the people running from it.',[
   [0,'wide','night in the Ashlands\' orchard country before the fall: a ridge of hills beyond a river and an old stone bridge, a faint red glow rising behind the ridge, '+FOLK+' with carts on the road, orchards in blossom','fade','panR',[.5,.5,1]],
   [0,'wide','the ridge splitting: a long glowing crack tearing along the hilltops, jets of fire and smoke bursting up through it, orchard trees black against the light','flashred','shake',[.5,.35,1.3]],
   [0,'low','a wall of fire and molten rock climbing out of the crack, already as tall as the trees, the river reflecting it, sparks raining on the orchards','cut','tiltU',[.5,.4,1.5]],
   [0,'xwide','the Ember Wall towering into the clouds: a cliff of flame and lava from one horizon to the other, the aurora above it turning red','cut','crane',[.5,.4,1]],
   [0,'track',FOLK+' running across the old stone bridge toward the viewer with bundles and a handcart, faces lit orange, ash falling like snow','cut','track',[.4,.6,1.4]],
   [0,'close','close on a bearded man at the end of the bridge looking back over his shoulder, the wall of fire reflected in his eyes','cut','push',[.3,.45,2.6]]]);
  T('mira',8,'The lift is a machine waking. Hands, gears, chains and cage in sequence give the "it works!" beat that the Kling video kept garbling.',[
   [0,'insert','close on Mira the Mechanic\'s gloved hands (exactly as in her character reference) gripping a big brass lever with a rune-stone set in its knob, knuckles tightening','cut','push',[.45,.5,2.4]],
   ['h','two','Mira and Zeldor at the foot of the lift tower on the cliff: Mira with goggles down, braced on the lever; Zeldor beside her holding a lantern; both looking up','cut','hold',[.5,.55,1.2]],
   [0,'macro','macro on the engine: brass gears beginning to turn, the rune-stone heart pulsing neon blue, sparks and steam from the joints','cut','orbit',[.6,.6,2.6]],
   [0,'low','looking straight up the Great Scar\'s torn cliff: chains snapping taut one after another up the rock face, rune-lanterns along them flaring blue in sequence, waterfalls beside','cut','tiltU',[.5,.3,1.4]],
   ['h','low','the lift cage rising off the ground with Zeldor inside gripping the rail, Mira cheering below with a raised wrench, waterfalls behind','cut','crane',[.5,.45,1.3]],
   [0,'xwide','the whole Great Scar at dusk from afar: the tiny glowing lift climbing the cliff on its line of rune-lanterns, the Highlands above in the clouds, aurora overhead','dissolve','pull',[.5,.5,1]]]);
  T('lodestar',6,'Four colours, four realms: a whip-pan from Heartglass to Heartglass, then the top-down spiral and the lens filling with light — the biggest crafting moment in the game.',[
   [0,'insert','close on the green Heartglass with its leaf-rune hovering above the great anvil, a thick stream of green light pouring from it down toward the staff ('+HG+')'+HEARTH,'cut','push',[.3,.35,2.4]],
   [0,'insert','close on the blue Heartglass with its wave-rune, a stream of blue light pouring from it ('+HG+')'+HEARTH,'whip','push',[.45,.3,2.4]],
   [0,'insert','close on the amber Heartglass with its mountain-rune, a stream of amber light pouring from it ('+HG+')'+HEARTH,'whip','push',[.6,.3,2.4]],
   [0,'insert','close on the red Heartglass with its flame-rune, a stream of red light pouring from it ('+HG+')'+HEARTH,'whip','push',[.75,.35,2.4]],
   [0,'top','seen from straight above: '+HG+' circling the anvil, four streams of green, blue, amber and red light spiralling down into the staff lying on it, which glows white along its twisted shaft'+HEARTH,'cut','orbit',[.5,.5,1.2]],
   ['h','react','Zeldor beside the anvil shielding his eyes with one arm, the four colours of light washing over his face and cape'+HEARTH,'cut','push',[.25,.5,2]],
   [0,'ecu','extreme close-up of the staff\'s head as it becomes '+LODE+': the clear lens filling with swirling light of four colours that turns white, a tiny World Tree forming inside it'+HEARTH,'flash','push',[.55,.5,3.4]]]);
  T('bifrost',5,'The bridge of light builds outward — best told as a skim over the water and a crane up to the whole lake, ending on the hero\'s silhouette.',[
   ['h','ots','over Zeldor\'s shoulder at the end of the old wooden pier (weathered planks on posts, never stone): '+LODE+' upright in the carved notch, its lens starting to blaze, Mirror Lake dark and still ahead, Asgard\'s golden gate far off on the water','cut','push',[.4,.5,1.3]],
   [0,'insert','close on the Lodestar\'s blazing lens at the end of the wooden pier: a beam of rainbow light bursting out of it, level, over the water','flash','hold',[.45,.35,2.6]],
   [0,'track','skimming low over the dark water of Mirror Lake: the bridge of rainbow light building forward ahead of the viewer, reflections rippling below, spray lifting','cut','track',[.6,.5,1.6]],
   [0,'xwide','high above Mirror Lake at night: the rainbow bridge arcing from the small wooden village pier across the whole lake to Asgard\'s golden gate, aurora above, the village lanterns tiny','cut','crane',[.5,.5,1]],
   [0,'react','on the shore, pale translucent rune-blue spirits and '+FOLK+' looking up, faces lit in rainbow colours','cut','panR',[.2,.6,1.6]],
   ['h','sil','Zeldor seen from behind as a silhouette at the foot of the bridge of light, the Lodestar glowing beside him, the bridge rising away toward the golden gate','dissolve','push',[.5,.55,1.2]]]);
  T('sol2',2,'The villain\'s mask cracking is a reveal in slow stages: the perfect gold, the blow, the crack, and something looking out from behind it.',[
   [0,'ecu','extreme close-up of the full-face golden helm of '+SOL+': the single glowing white eye-slit, smooth polished gold reflecting the throne hall\'s light','cut','push',[.5,.25,3]],
   [0,'insert','the Lodestar\'s white beam striking the helm\'s brow in a starburst of light, flakes of gold flying ('+SOL+')','flash','shake',[.5,.25,2.4]],
   [0,'macro','macro: a jagged crack racing down the middle of the golden helm, splitting its crest, a thin line of pure black light behind it','cut','push',[.5,.3,3.6]],
   [0,'wide','the whole of '+SOL+' hanging above the high seat, his golden wings flaring in pain, the crack glowing black down his face, shards of golden light falling to the throne-hall floor. His whole figure is in the picture, head to wings','cut','pull',[.5,.45,1]],
   [0,'insert','close on the marble steps of the high seat: shards of the golden mask falling and ringing on the stone, each shard reflecting a sliver of darkness','cut','tiltD',[.5,.85,2.2]],
   [0,'close','behind the half-cracked golden mask: darkness, and a single cold pale eye looking out','dip','push',[.5,.3,3.2]]]);
  T('feasthall',7,'The gods\' release. Cracks, an eye opening, the burst, a million shards frozen in the air, the raven — and their faces at last.',[
   [0,'macro','macro on the glowing surface of one of the two joined orbs: a web of cracks of light spreading across it, Freya\'s sleeping face behind the glow. The feast hall is empty of people','cut','push',[.6,.35,2.6]],
   [0,'ecu','extreme close-up inside the other orb: Odin\'s one eye opening and glowing rune-blue under the brim of his wide grey hat','cut','push',[.35,.35,3.4]],
   [0,'wide','the two joined orbs bursting in the empty feast hall in a blinding explosion of glittering shards of gold and white light','flash','shake',[.5,.4,1]],
   [0,'bullet','frozen moment: a million shards hanging in the air of the empty feast hall, each catching the candle-light and the aurora from the high windows','cut','orbit',[.5,.45,1.2]],
   [0,'insert','Odin\'s black raven bursting out of the light, wings spread wide, shards scattering off its feathers','whip','push',[.35,.3,2.2]],
   [0,'low','low angle: '+GODS+', rising out of the light with arms spread, Freya\'s falcon-feather cloak opening like wings, the shards swirling round them','cut','tiltU',[.5,.4,1.3]],
   [0,'two','close on the faces of '+GODS+', eyes open at last: Odin weary and kind, Freya smiling with tears of light','dissolve','push',[.5,.35,1.9]]]);

  // round 112d (Kris: "this is a good start, but it was too many to have 6 or 7 images, we need to trim down to 3. see my feedbacks"):
  // each series keeps the shots Kris kept in the Lab (the painted ones, so nothing is painted again); the storm series is cut ("we already
  // have a good video"). x.k is a shot's number in the first cut — its picture's id keeps it.
  ZSS.KEEP={opening_07:[1,4,6],spirit_05:[3,4,6],spirit_06:[2,3,5],ashnight_04:[1,5],mira_08:[2,5,6],lodestar_06:[1,6,7],bifrost_05:[1,3,6],sol2_02:[1,3,6],feasthall_07:[1,3,6]};
  ZSS.CUTS={opening_05:'we already have a good video'};
  ZSS.FIRST=ZSS.TOP.map(function(S){ return {scene:S.scene,n:S.n,count:S.shots.length}; });
  ZSS.TOP=ZSS.TOP.filter(function(S){ return !ZSS.CUTS[S.scene+'_'+('0'+S.n).slice(-2)]; }).map(function(S){ var K=ZSS.KEEP[S.scene+'_'+('0'+S.n).slice(-2)]; S.first=S.shots.length;
    S.shots.forEach(function(x,i){ x.k=i+1; }); if(K)S.shots=S.shots.filter(function(x){ return K.indexOf(x.k)>=0; }); return S; });
  // ── the plan for every other frame: a pattern from what the frame shows ──
  ZSS.PAT={
    impact:{n:'Impact',sh:['macro','flash','react'],how:'macro on the thing about to break → the burst on a white flash → a reaction, or the pieces settling'},
    transform:{n:'Transformation',sh:['ecu','low','react'],how:'extreme close-up on the first change → the new form from a low angle → the hero (or a bystander) reacting'},
    build:{n:'Building montage',sh:['insert','wide','xwide'],how:'hands at work → the work growing → the finished thing in its landscape'},
    journey:{n:'Journey',sh:['xwide','track','ots'],how:'where we are (extreme wide) → tracking along with them → over the shoulder at what lies ahead'},
    talk:{n:'Conversation',sh:['two','ots','close'],how:'two-shot → over the shoulder → close on the line that matters'},
    reveal:{n:'Reveal',sh:['ots','ecu','react'],how:'over the shoulder → extreme close-up of the reveal → the faces that see it'},
    boss:{n:'Boss entrance',sh:['sil','ecu','low'],how:'silhouette → extreme close-up on one terrible feature → the full figure from a low angle, the hero tiny before it'},
    memory:{n:'Memory',sh:['xwide','close','insert'],how:'the land as it was → one face → one telling object (warm, slow dissolves)'},
    vista:{n:'Vista',sh:['xwide','pov','sil'],how:'extreme wide → what the hero sees → the hero\'s silhouette against it'}};
  ZSS.PAST={quiet:1,ashnight:1,stonefall:1,blacktide:1,opening:[1,2,3,4,5,6,7],truth:[3,4,5]};
  ZSS.plan=function(sc,b){ var t=(b.title+' '+b.desc+' '+b.cap).toLowerCase(), past=ZSS.PAST[sc.id]===1||(ZSS.PAST[sc.id]||[]).indexOf&&(ZSS.PAST[sc.id]||[]).indexOf(b.n)>=0;
    var k=/burst|break|shatter|explod|erupt|crack|strik|blow|tears? open|comes apart/.test(t)?'impact':/^(surt|sol)\d/.test(sc.id)&&/rise|grow|swell|horn|melt|armour|climb|becomes|unfold|form|volcano itself|obsidian/.test(t)?'transform':
      /^(surt|sol)\d/.test(sc.id)?'boss':/build|forge|rivet|beam|plan|keystone|measur|gear|timber|stone they|anvil|staff on|setting/.test(t)?'build':
      /"|thank|said|speak|spoke|tell|ask/.test(b.cap)?'talk':/ran |run|drift|across|cross|causeway|toward|sail|walk|climb/.test(t)?'journey':past?'memory':/glow|wake|open|reveal|appear|two babes|word|rune/.test(t)?'reveal':'vista';
    var P=ZSS.PAT[k], top=ZSS.TOP.find(function(x){ return x.scene===sc.id&&x.n===b.n; });
    return {k:k,n:P.n,count:top?top.shots.length:P.sh.length,how:P.how,top:top||null}; };

  // ── the paintings: one sheet per shot ──
  ZSS.id=function(s,n,k,who){ return 'sc_ss_'+s+'_'+('0'+n).slice(-2)+'_'+k+(who==='h'?'_m':''); };
  ZSS.parent=function(s,n,anyHero){ var base='sc_sb_'+s+'_'+('0'+n).slice(-2); return anyHero?base+'_m':base; };
  if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[ZSS.WAVE]='Round 112 — shot series: the first story frames as runs of three film shots';
  var STY='a wide cinematic painting in exactly the style, light and finish of the first reference (the story frame this shot is cut from) — the SAME moment, the same place, the same people and clothes, the same colours and light; only the camera has moved. The land of Runeheim, a Norse fantasy world';
  var EPIC=' Keep it epic: where it fits, runes and magic glow with a bright neon rune-blue light, and night skies carry a shimmering aurora borealis.';
  var NO=' No lion, no centaur, no animal companion unless named, no valknut symbol. No text, no letters, no frame, no split panels: ONE picture.';
  ZSS.TOP.forEach(function(S){ var anyH=S.shots.some(function(x){ return x[0]==='h'; }), par=ZSS.parent(S.scene,S.n,anyH), P=ZSCN.SHEETS.find(function(x){ return x.id===par; }), past=ZSS.PAST[S.scene]===1||(ZSS.PAST[S.scene]||[]).indexOf&&(ZSS.PAST[S.scene]||[]).indexOf(S.n)>=0;
    var base=(P&&P.refs||[]).filter(function(r){ return r!=='hero_m.model'&&r!=='hero_f.model'; });
    S.parent=par;
    S.shots.forEach(function(x,i){ var who=x[0], id=ZSS.id(S.scene,S.n,x.k||i+1,who), L=ZSS.LENS[x[1]]||x[1];
      var whoTxt=who==='h'?' Zeldor (the boy hero: spiky tousled brown hair with teal streaks, big teal eyes, a moss-green hooded short cape, cream tunic, big tan boots — exactly as in the hero reference) is in this shot.':
        past?' This happens long before the twins were born: no young hero, no boy in a green cape, no girl with auburn braids anywhere'+(S.scene==='opening'&&S.n>=6?' (the twins appear only as the two newborn babes)':'')+'. No children anywhere apart from those described.':' Neither twin is in this shot — no young hero, no boy in a green cape, no girl with auburn braids; only what is described.';
      var d=STY+'. THE SHOT: '+L+' ('+(ZSS.MOVE[x[4]]||'')+' feel) — '+x[2]+'.'+whoTxt+EPIC+NO;
      var refs=[par].concat(base).slice(0,who==='h'?6:7).concat(who==='h'?['hero_m.model']:[]);
      var sh={id:id,wave:ZSS.WAVE,fam:'series',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',noStyle:true,refs:refs,
        title:'Shot series — '+S.scene+' '+S.n+', shot '+(i+1)+' of '+S.shots.length+': '+L,items:[[id.replace(/^sc_/,''),L,d,1536,1024]],ss:{scene:S.scene,n:S.n,k:i+1,who:who}};
      ZSS.SHEETS.push(sh); ZSCN.SHEETS.push(sh); }); });
  // ── round 113 (Kris: "the 2 or 3 images expansion is good, let's plan for all the new images needed now"): every other story frame
  // gets its three shots, by its pattern (ZSS.PAT) — the camera told in words, the moment from the frame itself (its first reference).
  // Wave 114; one list per cut-scene (sprites/requests/r114_<NN>_<scene>.txt), made a cut-scene at a time. Zeldor first.
  ZSS.CAM={xwide:'an extreme wide view of the whole place from much further back and higher up, the people small in it',wide:'a wide establishing view of the whole scene from further back',
    med:'a medium shot of the main figures from the waist up, closer than the frame',two:'a two-shot: the two main figures together, closer than the frame',ots:'an over-the-shoulder view from just behind the main figure, looking at what they face',
    close:'a close-up of the main figure\'s face, its expression telling the moment',ecu:'an extreme close-up of the single most important detail of the moment — an eye, a hand, the glowing rune or the key object — filling the picture',
    macro:'a macro close-up of the key object of the moment, filling the picture, its texture and glow in sharp detail',insert:'an insert shot of the key object, or the hands at work, close and clear',
    low:'a low angle looking up at the main figure or thing, so it towers over the viewer',react:'a reaction shot: the faces of those who see it, lit by what they see',track:'a tracking view moving alongside the main figures, the scene streaming past',
    flash:'the peak of the action at its most dramatic: the burst of light and motion at full force',bullet:'a frozen moment at the peak of the action, debris and light hanging in the air',sil:'the main figure in silhouette against the brightest light of the scene',
    pov:'the view through the hero\'s eyes: exactly what they are looking at, nobody in front',top:'the scene seen from straight above'};
  ZSS.NOHERO={macro:1,insert:1,pov:1,flash:1,bullet:1};
  ZSS.AUTO=[]; ZSS.AUTO_WAVE=114;
  if(typeof ZSB!=='undefined'&&ZSB.SCENES){ var ORD=['opening','spirit','quiet','bram','blacktide','mira','stonefall','dunn','ashnight','vela','gate','orbs','surt1','surt2','surt3','surt4','surt5','surt6','lodestar','escape','asgard','twinteach','bifrost','sol1','sol2','sol3','solfall','feasthall','truth','home','village','celebrate','credits','worldtree'];
    ZSCN.WAVES[ZSS.AUTO_WAVE]='Round 113 — shot series for every story frame (three shots each, a cut-scene at a time)';
    ZSB.SCENES.slice().sort(function(a,b){ return ORD.indexOf(a.id)-ORD.indexOf(b.id); }).forEach(function(sc){ if(ZSS.CUTS[sc.id+'_00'])return;
      sc.beats.forEach(function(b){ var key=sc.id+'_'+('0'+b.n).slice(-2); if(ZSS.CUTS[key]||ZSS.TOP.some(function(S){ return S.scene===sc.id&&S.n===b.n; }))return;
        var pl=ZSS.plan(sc,b), P=ZSS.PAT[pl.k], hero=b.ids.length>1||b.who==='t', past=ZSS.PAST[sc.id]===1||(ZSS.PAST[sc.id]||[]).indexOf&&(ZSS.PAST[sc.id]||[]).indexOf(b.n)>=0;
        var par=ZSS.parent(sc.id,b.n,b.ids.length>1), PS=ZSCN.SHEETS.find(function(x){ return x.id===par; }), base=(PS&&PS.refs||[]).filter(function(r){ return r!=='hero_m.model'&&r!=='hero_f.model'; });
        var row={scene:sc.id,n:b.n,k:pl.k,parent:par,shots:[]};
        P.sh.slice(0,3).forEach(function(lens,i){ var who=hero&&!ZSS.NOHERO[lens]&&b.ids.length>1?'h':0, id=ZSS.id(sc.id,b.n,i+1,who);
          var gist=String(b.desc||'').replace(/\{H\}/g,'Zeldor').replace(/\{O\}/g,'Zeldara').replace(/\{T\}/g,'the twins').replace(/\{K\}/g,'the little twins');
          var whoTxt=who==='h'?' Zeldor (the boy hero: spiky tousled brown hair with teal streaks, big teal eyes, a moss-green hooded short cape, cream tunic, big tan boots — exactly as in the hero reference) is in this shot.':past?' This happens long before the twins were born: no young hero, no boy in a green cape, no girl with auburn braids anywhere'+(sc.id==='opening'&&b.n>=6?' (the twins appear only as the two newborn babes)':'')+'.':(b.ids.length>1?' Neither twin is in this shot — only what is described.':'');
          var d=STY+'. THE SHOT: '+ZSS.LENS[lens]+' — '+ZSS.CAM[lens]+'. THE MOMENT (as in the first reference): '+gist+'.'+whoTxt+(ZSB.nokids?ZSB.nokids(sc.id,b.n).replace(/^\.\s*/,' '):'')+EPIC+NO;
          var models=b.who==='t'&&!ZSS.NOHERO[lens]?['hero_m.model','hero_f.model']:who==='h'?(b.who==='o'?['hero_m.model','hero_f.model']:['hero_m.model']):[];
          if(b.who==='t'&&!ZSS.NOHERO[lens])whoTxt=' Both twins are in this shot as in the frame: '+ZSB.TWINS+'.'; else if(who==='h'&&b.who==='o')whoTxt+=' Zeldara, his twin, is with him as in the frame (exactly as in her reference).';
          var refs=[par].concat(base).slice(0,8-models.length).concat(models);
          var sh={id:id,wave:ZSS.AUTO_WAVE,fam:'series',kind:'room',panel:true,cols:1,rows:1,size:'1536x1024',noStyle:true,refs:refs,title:'Shot series — '+sc.name+', frame '+b.n+' ('+b.title+'), shot '+(i+1)+' of 3: '+ZSS.LENS[lens],items:[[id.replace(/^sc_/,''),ZSS.LENS[lens],d,1536,1024]],ss:{scene:sc.id,n:b.n,k:i+1,who:who,auto:true}};
          row.shots.push({lens:lens,who:who,id:id}); ZSCN.SHEETS.push(sh); });
        ZSS.AUTO.push(row); }); }); }
  // the request text: cut from the story frame (the first reference), the camera changes, nothing else
  var b0=ZSCN.body; ZSCN.body=function(S){ if(!S||!S.ss)return b0.apply(ZSCN,arguments); var it=S.items[0];
    return 'Create ONE image for a 2D action RPG called The Quests of Zeldara and Zeldor: '+S.title+'.\n'+
      'This is one shot of a short film sequence cut from the FIRST reference image (a story frame). Keep that frame\'s place, people, clothes, colours, light and painted style exactly; change only the camera — its distance, angle and framing — as described. The other references show how the named characters and things look; draw them exactly like that, in the same bold hand-drawn cartoon look, not a photo, not 3D.\n'+
      'Subject: '+it[2]+'\nThe painting fills the whole image edge to edge like a wide film still. No text, no labels, no frame, no UI, no comic panels.'; };
})();
