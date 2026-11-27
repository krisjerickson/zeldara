// ═══════════════════════════════════════════════════════════════════════
// ║ 07zt32-flow-fix3.js — round 140 (Kris on the Flow repaints: "Many were not better, sometimes worse … we might need to provide the painted
// ║ images of the Lodestar, or other things to help point in the right direction"). Why the last repaint missed:
// ║  · the change was tacked onto the END of the words, after "Keep it epic … aurora borealis" — the painter read the old scene first;
// ║  · the old panels rode along as references (the freed spirit, the Ash Tyrant under the aurora, the admiral Vela, the feast's children),
// ║    and the painter copied them;
// ║  · the Lodestar's painting was sent only where the words said "Lodestar reference" — the escape, Asgard and Solmyrk frames never got it;
// ║  · near-repeats were given no new camera, so they came back the same.
// ║ Now each frame below is written again: the change FIRST and LAST, the scene in its own words, no aurora where it is underground, a camera
// ║ for each near-repeat, and the references chosen for it — the Lodestar painting, Surtharn's form cut out on its own (sc_ref_surth_pN),
// ║ the villager spirits, a new model sheet for Vela the Norse sky-captain (painted first), and the feast you liked (sc_ref_celebrate_01).
// ║   .\tools\sprites\redo.ps1 -List r140_flow
// ═══════════════════════════════════════════════════════════════════════
var ZFLOW3={ LODE:'the Lodestar — EXACTLY the staff in the Lodestar reference image: a white-gold staff with a twisted shaft and a crystal tip, its head a rune-carved gold ring with six round coloured gems (red, orange, yellow, violet, blue, green) round a large clear glowing lens with a white World Tree inside — not a sword, not a plain stick, not a star on a pole',
  NOSKY:' He is deep UNDERGROUND inside a vast black cavern under the volcano: a basalt roof lost in smoke overhead, lava light from below, rivers of fire. There is NO sky in this picture — no stars, no aurora, no northern lights, no snow, no moon, no mountains or castles outside; above is only the black stone roof. Lit only by lava, embers and glowing runes.',
  SPIRITS:'the spirits are pale glowing VILLAGERS exactly like the spirit reference — ordinary grown-up men and women of the village in Norse work clothes (a grey-bearded miner, a woman with a lantern, an old woman in a shawl), with gentle, tired human faces; NOT skulls, NOT ghosts with fangs or hollow eyes, NOT demons',
  CHAIN:'any chain is ordinary forged iron, links about a finger thick, on wrist shackles — nothing bigger than a man\'s arm',
  F:{} };
(function(){ var F=ZFLOW3.F, L=ZFLOW3.LODE, H=function(k){ return k==='f'?'Zola':'Zoldor'; }, HM=function(k){ return k==='f'?'hero_f.model':'hero_m.model'; };
  var two=function(base,fn){ ['m','f'].forEach(function(k){ F[base+'_'+k]=fn(k); }); };
  // the opening: no chains at all
  // round 140c (Kris on the third try: "there are not chains at all this time in the images"): the chains stay — but at human scale
  F.sc_sb_opening_04={must:'EVERY pale spirit is CHAINED: ordinary forged iron shackles round its wrists and ankles, joined by short iron chains (each link no bigger than a man\'s hand), and from each spirit one chain leads back across the field to the dark hooded Binder who holds the ends — the spirits are clearly prisoners, led like a chain-gang. The chains are human-sized: NO chains in the sky, none between the mountains or the runestones, none bigger than a man\'s arm.',
    desc:'dusk at the edge of Gildenmark\'s fields: pale rune-blue spirits of villagers (gentle glowing grown-ups, bowed and tired, iron shackles on their wrists and ankles) shuffling at the edge of the fields; villagers at a timber palisade watching them in silence; in the mist at the field\'s far edge a dark hooded Binder with a lantern holding the ends of their chains',refs:['sc_pn_saga_quiet_b','sc_vill_core_1','vf_elder.core.f','sc_spirit_opts_a','sc_bindstone_opts_a']};
  // the first spirit: still chained in the distance
  two('sc_sb_spirit_02',function(k){ return {must:'The spirit at the far bindstone is still CHAINED: bent over, swinging her pick, iron shackles on her wrists and a short iron chain to a ring in the stone — she is NOT floating, NOT free, NOT lifting her arms; '+ZFLOW3.CHAIN+'.',
    refs:['style_hero','sc_bindstone_opts_a','sc_spirit_opts_a',HM(k)]}; });
  // the Stone-Fall, frame 1: a calm day before it
  F.sc_sb_stonefall_01={must:'A calm, peaceful working evening — nobody afraid, nobody shouting, every face calm or smiling; nothing is falling: no loose rocks in the air, no rocks in the waterfalls, no cracks, no smoke.',
    desc:'Cragland before the Stone-Fall: a mountain village and its mine mouths at dusk, lanterns lit, miners walking home with picks over their shoulders, full ore carts on rails, snow on the peaks, calm waterfalls',refs:['sc_pn_saga_quiet_b']};
  // Surtharn: underground, his own form for each frame
  var surt=function(id,p,o){ o=o||{}; F[id]={sky:false,must:(o.must||'')+' NO sky: deep underground, no aurora, no northern lights, no stars, no snow.',desc:o.desc,refs:['sc_ref_surth_p'+p].concat(o.refs||[])}; };
  surt('sc_sb_surt1_01',1); surt('sc_sb_surt1_06_m',1,{refs:['hero_m.model']}); surt('sc_sb_surt1_06_f',1,{refs:['hero_f.model']}); surt('sc_sb_surt2_04',2); surt('sc_sb_surt3_02',3); surt('sc_sb_surt4_05',4); surt('sc_sb_surt6_02',6);
  surt('sc_sb_surt3_03',3,{must:'The spirits pulled into the ash are pale glowing ordinary villagers with gentle human faces — no skulls, no fangs, no demon faces.',desc:'pale villager spirits being pulled into a whirling storm of ash and embers by ember-red chains; '+ZFLOW3.SPIRITS,refs:['sc_spirit_opts_a']});
  surt('sc_sb_surt3_04',3,{must:'A WIDE shot from far away and low down: the giant seen whole and small against the vast cavern.',desc:'wide shot from far across the cavern floor: the Ash Tyrant (the giant of grey ash in the reference) striding out of a towering whirling column of ash, thin ribbons of pale light trailing from his hands back to a crowd of chained spirits behind him',refs:['sc_spirit_opts_a']});
  surt('sc_sb_surt3_05',3,{must:'The spirits he holds are pale glowing ordinary villagers with frightened, gentle human faces — NOT skulls, NOT ghosts with fangs, NOT demons. A CLOSE, low camera.',desc:'close, low camera: the Ash Tyrant crouched behind a wall of chained spirits he holds up before him like a shield; '+ZFLOW3.SPIRITS,refs:['sc_spirit_opts_a']});
  surt('sc_sb_surt4_01',3,{must:'NO horns: his brow is bare, cracked stone — the horns have not grown yet.',desc:'the ash swirling upward into a towering column inside the cavern; within it the giant of ash from the reference rising, his head bare and hornless'});
  surt('sc_sb_surt4_02',3,{must:'NO horns: his brow is bare, cracked stone — the horns have not grown yet.',desc:'the hornless giant of ash and fire growing huge, his bare head cracking the black cavern roof, rubble falling around him'});
  surt('sc_sb_surt5_03',5,{must:'A CLOSE-UP of one hand only — no body, no face.',desc:'close-up: a single huge hand of black glass rising out of churning orange lava, molten drops falling from its fingers'});
  surt('sc_sb_surt5_04',5,{must:'A WIDE shot: his whole body, climbing out.',desc:'wide shot: the Obsidian Warlord hauling himself out of the lava lake onto black rock, his whole figure in gleaming black obsidian armour, lava streaming off him'});
  surt('sc_sb_surt5_05',5,{must:'A TIGHT close-up on his chest only.',desc:'tight close-up on his chest: through a cracked window of black glass, his molten heart glowing orange and pulsing, light spilling through the cracks'});
  // the escape: the Lodestar, plainly
  [2,3,5,7].forEach(function(n){ two('sc_sb_escape_0'+n,function(k){ return {must:H(k)+' holds '+L+' — in one hand, held up, large and clearly visible, its lens blazing white.',refs:['style_hero','sc_pn_musp_sink_a','lodestar_ref',HM(k)]}; }); });
  // Asgard: the Lodestar in the notch
  two('sc_sb_asgard_06',function(k){ return {must:'The Lodestar stands upright IN the carved notch at the very end of the pier — its foot slotted into the stone, clearly visible — and its lens is dark and unlit. It is '+L+'.',refs:['style_hero','sc_notch_opts','lodestar_ref',HM(k),'sc_pn_asg_lake_a']}; });
  // Solmyrk 1: the Lodestar raised, no sword
  two('sc_sb_sol1_06',function(k){ return {must:H(k)+' raises '+L+' high in both hands; NO sword in their hands or anywhere in the picture.',refs:['style_hero','sol_ref_1','lodestar_ref',HM(k)]}; });
  // Solmyrk 2: five different cameras
  var sol2=[['A WIDE shot of his whole figure.','wide: the whole Gilded Seraph (as in the reference) reeling in the air as a beam of white light strikes his helm, the white-and-gold throne hall far below'],
    ['An EXTREME close-up: the helm fills the picture.','extreme close-up: the golden helm-mask filling the frame, one bright crack running across it from brow to chin'],
    ['A MEDIUM shot from the front.','medium shot: black light pouring out of the crack in the helm like smoke and shadow, spilling down over his white-and-gold cope'],
    ['Seen from BEHIND and to the side.','from behind and to the side: one of his three pairs of golden wings tearing apart into black smoke and black feathers'],
    ['FRONT view, full figure, split down the middle.','front, full figure: the Cracked Mask — the left half a radiant golden god, the right half a black void with one white star for an eye']];
  sol2.forEach(function(s,i){ F['sc_sb_sol2_0'+(i+1)]={must:s[0],desc:s[1],refs:['sol_ref_2']}; });
  // Solmyrk falls: the Lodestar, and the storm torn open
  two('sc_sb_solfall_01',function(k){ return {must:H(k)+' raises '+L+'; a beam of white star-light shoots from its lens into the chest of the black storm-king.',refs:['style_hero','sol_ref_3','lodestar_ref',HM(k)]}; });
  F.sc_sb_solfall_02={must:'A great white split of light tears straight DOWN through the middle of the black storm, ripping it in two — the two halves pulled apart, white light pouring through the gap.',refs:['sol_ref_3']};
  // the celebration: the picture you liked, without the children
  F.sc_sb_celebrate_01={must:'Paint the same picture as the FIRST reference image — keep its layout, light and look — but every person at the tables is a grown-up or an elder: take out every child (the first child is born later).',refs:['sc_ref_celebrate_01','sc_vill_core_1','hero_m.model','hero_f.model']};
  // Vela: a Norse sky-captain (her new model sheet first, then every frame of her cut-scene)
  ZFLOW3.VELA='Captain Vela as in the Vela reference: a Norse sky-captain — a fur-trimmed sea-cloak over a quilted leather jerkin, a leather flying cap with brass goggles and a raven-feather band, white-blond hair in one thick braid, teal eyes, a bronze spyglass and a coil of rope at her belt; NO tricorn hat, NO naval admiral\'s coat, NO epaulettes, NO lace';
  for(var n=1;n<=9;n++)two('sc_sb_vela_0'+n,function(k){ return {must:'Vela is '+ZFLOW3.VELA.replace(/^Captain Vela as in the Vela reference: /,'')+'.',swapRef:['crafts_4.core.f','sc_vela_ref_140']}; });
})();
(function(){ if(typeof ZSCN==='undefined'||typeof ZSB==='undefined')return; var F=ZFLOW3.F;
  // Vela's new model sheet — painted first; her frames wait for it
  ZSCN.SHEETS.push({id:'sc_vela_ref_140',wave:140,fam:'chars',kind:'flat',cols:1,rows:1,size:'1536x1024',refs:['crafts_4.core.f','style_hero'],title:'Captain Vela — model sheet, the Norse sky-captain (round 140)',
    items:[['vela_ref_140','Captain Vela, Norse sky-captain','A character model sheet of Captain Vela, a grown woman sky-captain, in exactly the bold hand-drawn cartoon style and proportions of the first reference sheet (but a new outfit): '+ZFLOW3.VELA.replace(/^Captain Vela as in the Vela reference: /,'')+'. Four full-body views side by side on a plain dark backdrop: front, three-quarter, side and back, and two small head studies (smiling, determined). No text, no labels, no pixel art.',1536,1024]]});
  ZSCN.SHEETS.forEach(function(S){ var f=F[S.id]; if(!f||!S.items||!S.items[0])return; var it=S.items[0], t=it[2], st=ZSB.STYLE, ep=ZSB.EPIC, cut=t.indexOf(' PAINT IT WITH THIS CHANGE:');
    if(cut>=0)t=t.slice(0,cut); var body=t.indexOf(st)===0?t.slice(st.length):t, ei=body.indexOf(ep), desc=ei>=0?body.slice(0,ei):body, rest=ei>=0?body.slice(ei+ep.length):'';
    if(rest.slice(-ZSB.NO.length)===ZSB.NO)rest=rest.slice(0,-ZSB.NO.length);
    if(f.desc)desc=f.desc; if(f.sky===false)rest=rest;      // the epic line goes; the cavern line comes in its place
    it[2]='MOST IMPORTANT: '+f.must+' — '+st+desc+(f.sky===false?'.'+ZFLOW3.NOSKY:ep)+rest+' Again, the most important thing: '+f.must+ZSB.NO;
    if(f.refs)S.refs=f.refs.slice(0,8);
    if(f.swapRef)S.refs=(S.refs||[]).map(function(r){ return r===f.swapRef[0]?f.swapRef[1]:r; });
    S.r140=true; });
})();
