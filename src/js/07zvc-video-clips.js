// ═══════════════════════════════════════════════════════════════════════
// ║ 07zvc-video-clips.js — round 73 (answer C1: "Short AI video clips"): the cut-scene panels brought to life. Each painted panel
// ║ (assets/scenery/rooms/<id>.webp) is the FIRST FRAME of a short clip; the text here only says how it moves. Made by
// ║ tools/video/clips.py (Kris's key, read in the window — see docs/34), taken in by tools/video/intake_video.py into assets/video/,
// ║ and played by the cut-scene player (16p ZCUT) in place of the still picture; with no clip the picture shows as before.
// ║  ZVCLIP.DEF   — what every clip keeps (the painting, the faces, no text, one shot)
// ║  ZVCLIP.CLIPS — id → how it moves; WAVES — the order they are made in (wave 1 is the pilot: judge the look before paying for more)
// ║  ZVID         — the player's side: which clips are in (ZVIDEO_INDEX, put in the page by build.mjs)
// ═══════════════════════════════════════════════════════════════════════
var ZVCLIP={
  DEF:'Animate this exact painting as one continuous cinematic shot of about 8 seconds. Keep the painted style, colours, lighting and composition of the image; the characters keep exactly the same faces, clothes and proportions. Gentle, slow camera movement; natural motion of cloth, hair, mist, fire and light. No text, no captions, no logos, no camera cuts, no new characters. ',
  CLIPS:{
    // ── round 73: the moments Kris asked for ──
    pn_forges_lodestar:'The camera slowly pushes in toward the anvil. The four glowing heart-glasses circle once around the staff and pour streams of green, blue, amber and red light into the star on its crown; the star flares brilliant white, sparks burst outward, lava glows brighter in the rivers below.',
    pn_binders_free:'The glowing chains snap and burst apart from the bindstone, links flying outward in slow motion; the pale spirit rises gently out of the stone toward the sky, eyes closed and at peace, the ember sparks fading; the dark shape in the mist slinks away.',
    pn_lines_life:'The camera glides slowly forward along the glowing line of light; as the light passes, fresh green grass and small white flowers spring up along it and the faint path brightens; the dawn ahead grows warmer.',
    pn_build_bram:'Bram lifts his hammer in triumph; the first travellers and the cart roll across the new bridge; the river flows and glitters in the sunrise; the heron rises from the reeds and flies away.',
    pn_build_mira:'Mira pulls the great brass lever; the gears turn and the chains run; the wooden cage-lift begins to climb the cliff face, the lantern swinging; mist drifts below.',
    pn_build_dunn:'Dunn swings his hammer down on the last glowing rivet; a burst of sparks; the iron bridge settles with a deep shudder; the lava glows and smoke drifts across the orange sky.',
    pn_twin_teach_m:'The twin at the desk traces the glowing rune on the page with a finger; the rune glows brighter and the star on the Lodestar answers with the same light; candle flames flicker, dust motes drift.',
    pn_twin_teach_f:'The twin at the desk traces the glowing rune on the page with a finger; the rune glows brighter and the star on the Lodestar answers with the same light; candle flames flicker, dust motes drift.',
    pn_fh_cast_twins:'The beam of white-gold light from the twins grows stronger and rises into the place where the two orbs meet; cracks of light spread across the orbs; the gods inside stir.',
    pn_world_tree:'A very slow descent toward the lake; the glowing World Tree under the water pulses gently, light flowing along its roots and branches like breath; ripples cross the glassy surface; village lights twinkle.',
    pn_saga_orbs:'A slow push-in toward the two orbs; the pale light inside them breathes slowly; the golden chains of light shimmer; the twins stand still, their cloaks stirring.',
    // ── the opening (the saga, act 0) ──
    pn_saga_storm_b:'Lightning flashes across the storm clouds, rain sweeps across the lake, the waves heave; a very slow push-in.',
    pn_saga_basket:'The basket rocks gently on the water as the storm calms, the clouds parting a little; the glow around it pulses softly.',
    pn_saga_sendoff:'The villagers wave; cloaks and banners stir in the wind; the morning light grows; a slow pull-back.',
    // ── the realms' old disasters ──
    pn_saga_ashnight_b:'Ash falls and embers drift; the fires glow and flicker; smoke rolls across the sky.',
    pn_saga_stonefall_b:'Rocks tumble and dust billows down the mountainside; a slow shake of the camera.',
    pn_saga_blacktide_b:'The black water surges and swirls; mist creeps over the marsh; lightning in the distance.',
    // ── the feast hall and the end ──
    pn_fh_shards:'The orbs burst into glittering shards that drift and spin slowly through the golden light.',
    pn_fh_gods:'Odin and Freya stand free and look up; the light around them settles; the raven ruffles its feathers; the falcon-feather cloak stirs.',
    pn_end_gods_lead:'The gods walk slowly forward along the bright road; the light grows; cloaks flow.',
    pn_cel_feast:'The villagers feast and laugh; lanterns sway; firelight flickers; the camera drifts slowly along the tables.',
    pn_cel_children:'The children run and play in the sunlight; grass and flowers sway; a slow, warm drift.'
  },
  // the order to make them in — wave 1 is the pilot (5 clips): judge the look before paying for more
  WAVES:{1:['pn_forges_lodestar','pn_binders_free','pn_build_bram','pn_fh_cast_twins','pn_world_tree'],
         2:['pn_lines_life','pn_build_mira','pn_build_dunn','pn_twin_teach_m','pn_twin_teach_f','pn_saga_orbs'],
         3:['pn_saga_storm_b','pn_saga_basket','pn_saga_sendoff','pn_saga_ashnight_b','pn_saga_stonefall_b','pn_saga_blacktide_b','pn_fh_shards','pn_fh_gods','pn_end_gods_lead','pn_cel_feast','pn_cel_children']},
  // where each one plays (for the Lab and the doc): the cut-scene set that shows the panel
  WHERE:{pn_forges_lodestar:'the moment the Lodestar is first made at the great hearth (when it first comes into your hands)',
    pn_binders_free:'the first spirit you free (then the line of light)', pn_lines_life:'the first spirit you free, after the chains fall',
    pn_build_bram:'freeing Bram — the Silverrun bridge', pn_build_mira:'freeing Mira — the lift up the Great Scar', pn_build_dunn:'freeing Dunn — the Cinder Chasm bridge',
    pn_twin_teach_m:'the twin\'s lesson — Godsbane (you play Zeldor)', pn_twin_teach_f:'the twin\'s lesson — Godsbane (you play Zeldara)',
    pn_fh_cast_twins:'the feast hall — the twins cast Godsbane together', pn_world_tree:'all forty spirits free, after the end',
    pn_saga_orbs:'the thirtieth spirit — a glimpse of the orbs', pn_saga_storm_b:'the opening — the storm', pn_saga_basket:'the opening — the basket on the lake',
    pn_saga_sendoff:'the opening — the village sends you out', pn_saga_ashnight_b:'the Ashlands\' first freed spirit — the Ash Night',
    pn_saga_stonefall_b:'the Highlands\' first freed spirit — the Stone-Fall', pn_saga_blacktide_b:'the Wetlands\' first freed spirit — the Black Tide',
    pn_fh_shards:'the feast hall — the orbs burst', pn_fh_gods:'the feast hall — Odin and Freya free', pn_end_gods_lead:'the gods lead you home',
    pn_cel_feast:'the celebration — the feast', pn_cel_children:'the celebration — the children'},
  // round 73b (Kris: "we have few enough videos we don't need to use an api, i can hand place the requests"): made by hand in a video app —
  // the first frame from tools/video/frames.py (sprites\video_frames\<id>.png), the words from the Lab (Cut-scene clips), the download
  // renamed <id>.mp4 or matched by tools/video/intake_video.py. NEG: for the apps with a "negative prompt" box.
  NEG:'text, captions, subtitles, logos, watermark, extra people, new characters, face changes, distorted hands, camera cuts, scene change, photorealism, 3D render look, style change, flicker',
  request:function(id){ var m=ZVCLIP.CLIPS[id]; return m?ZVCLIP.DEF+m:null; },
  all:function(){ var out=[]; Object.keys(ZVCLIP.WAVES).forEach(function(w){ ZVCLIP.WAVES[w].forEach(function(id){ out.push({id:id,wave:+w,request:ZVCLIP.request(id),frame:'assets/scenery/rooms/'+id+'.webp',where:ZVCLIP.WHERE[id]||'',neg:ZVCLIP.NEG,motion:ZVCLIP.CLIPS[id]}); }); }); return out; }
};
// the player's side (16p): a clip for this panel, if it is in
var ZVID={ on:true, sound:false,
  src:function(id){ if(!ZVID.on)return null; try{ if(/[?&]video=0\b/.test(location.search))return null; }catch(e){} var I=typeof ZVIDEO_INDEX!=='undefined'&&ZVIDEO_INDEX; return I&&I[id]?'assets/video/'+I[id]:null; }
};
