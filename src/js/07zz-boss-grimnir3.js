// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-boss-grimnir3.js — round 65d: SOLMYRK FROM KRIS'S PICKS (Lab → Bosses → Solmyrk remade, Oct 18 night).
// ║  · Phase 1 — The Gilded Seraph (gd_sol_1_a).
// ║  · Phase 2 — Wings of Ash (gd_sol_2_a): "this is good, but make the mask more similar to the previous one, just making it a cracked
// ║    and more exposed version of the first one" — so phase 2 wears phase 1's tall crested helm, cracked open on the dark beneath.
// ║  · Phase 3 — The Hollow King (gd_sol_3_a).
// ║ His three picked forms take the place of the round-64 looks in the game (the same slots grim_1 / grim_2 / grim_3, so the fight, the
// ║ pulse and the cut-scenes stay as they are). Their sheets (sprite wave 7.95, front / side / back) are ordered again with the picked
// ║ painting of each form riding along as a reference (sol_ref_1 / 2 / 2d / 3 — cut from scenery wave 69; tools\sprites\round68.ps1).
// ║ The pulse stays in all three (Kris: "All three, as now"): phases 1–2 are painted radiant and the game turns them black; phase 3 is
// ║ painted as the void and the game flares the old light through it.
// ═══════════════════════════════════════════════════════════════════════
var ZSOL={
  PICK:{grim_1:'gd_sol_1_a',grim_2:'gd_sol_2_a',grim_3:'gd_sol_3_a'},
  F:{
    grim_1:{name:'Solmyrk, the Gilded Seraph',h:184,pal:'#fbf3dc,#2a2418,#e8b84a,#fff0b0,#efe2c8,#fff8e0',
      god:{lower:'robe',mantle:'wolf',head:'mask',crown:'spears',halo:'runes',wings:'rays',weapon:'staff',
        txt:'a tall pointed golden helm with a high central crest-spike and a narrow visor with ONE glowing eye-slit (the other eye sealed); a thick cream fur collar; layered ivory-and-gold bishop robes, long, grand and flowing, the panels embroidered with gold rune-knots and ending in long points (NO LEGS — he hovers); TWO pairs of huge golden wings with crisp, faceted feathers — tall upper wings rising far above his head and long lower wings sweeping down past his robes; a thin gold ring halo behind his head; in his right hand a tall gold scepter crowned with a spiked sun-star around a glowing white orb; the left hand open, offering light'},
      lore:'Phase 1 — the Gilded Seraph: the god everyone in Asgard was told he is. A floating golden angel-king in Norse bishop\'s robes, all gold, ivory and white light — never blue.',
      paint:'Paint him RADIANT in every pose — gold, ivory and white, glowing, light pouring off him (the game turns him pure black on its own, so never paint him dark). No blue anywhere. He FLOATS a little above the ground and never walks: his robes end in long points, no legs or feet. Keep the ONE glowing eye-slit, the crested helm, the halo, the four wings and the sun-star scepter identical in every pose and view.'},
    grim_2:{name:'Solmyrk, the Cracked Seraph',h:184,pal:'#f2e8d0,#121018,#e0b048,#fff4d0,#e4d6bc,#ffffff',
      god:{lower:'tendril',mantle:'wolf',head:'split',crown:'spears',halo:'runes',wings:'tattered',weapon:'staff',ravens:1,
        txt:'the SAME tall pointed golden helm with the high central crest-spike as his first form, but CRACKED: a jagged split runs down it and pieces have broken away, showing a black demon face underneath with ONE burning white eye; his cream fur mantle and ivory-gold robes are scorched black at the edges and the hem dissolves into gold fire and black smoke (NO LEGS — he hovers); his wings are torn — cream feathers on top, black ash-feathers beneath; long black sinuous clawed arms of shadow reach out from under his robes; two black ravens circle his shoulders; the same sun-star scepter, its staff now wound with a black tendril'},
      lore:'Phase 2 — the Cracked Seraph: the mask of the Allfather is breaking, and the dark demon underneath shows through. Half radiant god, half the black beneath.',
      paint:'Paint him as the radiant half of his pulse — gold, ivory and white with the black showing only where the helm is cracked, in the scorched edges, the torn under-feathers and the shadow-arms (the game turns him pure black on its own). He FLOATS; no legs or feet. Keep the cracked crested helm, the one white eye, the wings, the ravens, the shadow-arms and the scepter identical in every pose and view.'},
    grim_3:{name:'Solmyrk, the Hollow King',h:196,pal:'#3a3448,#06060a,#6a5a80,#bff4ff,#2a2636,#ffffff',
      god:{lower:'tendril',mantle:'storm',head:'void',crown:'spikes',armor:'dark',
        txt:'no robe and no legs: a towering shape of living void-black smoke whose body pours down into one long trailing wisp of shadow; a head that is a narrow black mask-shape with a split of white light for its ONE eye, under a tall jagged black crown of spikes; FOUR long thin black arms ending in hooked claws, reaching out to bind; thin teal and violet rim-light along every edge, otherwise deep black'},
      lore:'Phase 3 — the Hollow King: what is left when the mask is gone. The void that was always underneath, deep shadowy nothingness with long binding arms.',
      paint:'Paint him as the VOID in every pose: deep black smoke with thin teal and violet rim-light and the one white-glowing eye (the game flares the old light through him on its own). NOT an insect. He floats; no legs or feet. Keep the crown, the eye, the four arms and the trailing smoke identical in every pose and view.'}
  },
  apply:function(){ if(typeof BOSS_SLOTS==='undefined'||typeof BOSS_PICK==='undefined')return;
    Object.keys(ZSOL.F).forEach(function(slot){ var D=(BOSS_SLOTS[slot]||[]).find(function(d){ return d.opt===BOSS_PICK[slot]; }); if(!D)return; var F=ZSOL.F[slot], p=F.pal.split(',');
      D.name=F.name; D.h=F.h; D.lore=F.lore; D.paint=F.paint; D.god=Object.assign({},F.god); D.pal={a:p[0],b:p[1],m:p[2],g:p[3],s:p[4],e:p[5]}; D.solPick=ZSOL.PICK[slot]; D.r65d=true; }); }
};
ZSOL.apply();
