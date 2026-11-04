# 43 — The story told straight; the menus fill a phone (rounds 87–88)

## Round 87 — the hero choice and the story read end to end
Kris: "the intro screen selecting zeldara and zeldor is no longer thematic, referring to upbringings not in alignment with the storyline. Suggest updates to this, and check throughout the game for any narrative inconsistencies."
Answers (docs/08 › Round 87): N1 A · foundlings; N2 fix all as proposed; N3 Pip & Wren born after; N4 the World Tree only after the end.

### Before → after
| Where | Before | After |
|---|---|---|
| Hero cards (04d) | "A shieldmaiden's daughter…" / "A woodcutter's son…" | "Found in the storm-basket on Mirror Lake. The old runes wake for her." / "Found beside her on the same dawn tide. The old stones answer his hand." |
| Hero-select note (04d) | "Both play the same. You can't change this later in the same save." | "The twin you don't choose stays home to study the old sagas. You can't change this later in this save." |
| Home page blurb and meta (site/app) | "…befriend the spirits, and face the Volcano Lord." | "Four realms, one broken land. Free the spirits and unravel the fragmented past to liberate Runeheim." |
| Fallback taglines (07zz-brand, -brand2) | "…and face the Volcano Lord." | the canvas tagline |
| Godsbane pop-up (16n) | "The spirits of Runeheim taught the Lodestar its one spell." | "{Twin} found it in the oldest saga — the Lodestar's one word." |
| Godsbane pop-up / Asgard (16n) | "the false god" ×2; "The impostor waits… behind Odin's stolen mask." | "the one in the golden mask"; "On Odin's high seat, the one in the golden mask waits." |
| The pier (16n) | "…and teaches you Godsbane." | "…once you speak the word your twin found: Godsbane." |
| Spirits' fallback (16e) | "Take it from us: GODSBANE." | "…the word {twin} found in the old texts: GODSBANE." |
| Journal (21-ui) | "(Final Quest)" | "(the road to Asgard)" |
| Spirits (10w) | "dig for the Tyrant of Muspelheim" | "dig for the fire under the ash" |
| Children (10zk) | "there were hardly any children in the hamlets" | "there were no children at all. Not one. …Then us." |
| Opening caption (07zt6) | "the twins were grown" | "the twins were nearly grown" |
| Celebration caption (07zt6, 07zst) | "I always have to be Zeldor…" | "I always have to be {O}…" (the other twin) |
| Pip and Wren (07s) | "The village green (stage 2+)" / "Near the carts (stage 3+)" | "The village green (after the end)" — born after; never seen or named before the celebration |
| Fairies (07y) | two fairies named Pip and Wren | Primrose and Linnet (the names belong to the first babies) |
| Tome: Volcano Lord (07s) | "Volcano Lord" · "Volcano boss rush" | "Surtharn, Tyrant of Muspelheim" · "The throne of Muspelheim", six forms (id `boss_volcano_lord` kept) |
| Tome: Solmyrk (07zz-boss-grimnir) | "An impostor on Odin's high seat…", "…the Wanderer and his ravens…" | "A god of gold on Odin's high seat, behind a one-eyed golden mask, with wings of light." · "spears of light; then the cracked mask, half light, half dark; at last the storm that ends the world." |
| Tome: Odin, Freya (07zg, 26) | the painter's prompt | a short description (a Tome-only field; the prompt is kept for the painter) |
| Familiar (07w) | "A broad earth-spirit of glowing stone" | "A broad familiar of glowing stone" |
| Glimmerhall (10z) | "lamps of captured spirit light" | "lamps of soulglass light" |
| Hild (07zh) | "This one I wore — the first." | "My daughter wore the first." |
| Sword (03, 07zv, 09i) | "Volcano Lord" | "Muspel Blade" (id `volcano_lord` kept); "Defeat Surtharn in Muspelheim" |
| Muspelheim arena (09, 16) | "the Volcano Lord's arena", "Muspelheim — the Volcano Lord", "The Volcano Lord remains…" | "Surtharn's throne", "Muspelheim — Surtharn", "Surtharn remains…" |

### The World Tree only after the end
`ZTGB.ended(ps, ws)` (16u): the ending is done when the credits have rolled (`ps.creditsSeen`), or a save loaded already past the ending (older saves never set that flag). The whole-tree panel (`tattoo`) and the World Tree cut-scene play only then, with all 40 spirits free; freed before the end, they wait for the first check after the credits (16r, 16u).

Left as they are: the Lab's boss design names, and the old boss-rush notes in code comments.

## Round 88 — the menus fill a phone
Kris: "Map and quests still needs to be larger as well as tome. inventory should fit onto one single screen. we might need to make the hero square smaller, and might need to tile things differently to be more horizontal versus vertical. ok if this is different layout for mobile vs. desktop version."

`src/js/24x-phone-menus.js` (ZPHM), on a phone only (`body.zmz-on`); the desktop layout is unchanged.
- Map & Quests, the Inventory (and Skills & Familiars) and the Tome open at full size, not shrunk, and fill the screen under the tab strip.
- **Map:** the square map is as tall as the screen allows (`_wmSizeCanvas` measures the phone menu: 286 px on an 844×390 phone, 256 px on 740×360). The quests sit beside it in a wide column (~500 px) in 14 px text.
- **Inventory:** laid out side by side on one screen.
  - Left: a small hero (104 px) framed by his gear slots. The belt, rings and stats sit next to him.
  - Right: the bag's tabs in one row, the bag (the only part that scrolls) and the picked item.
- **Tome:** its sections sit in one row that slides sideways. The list and the open page share the rest of the screen side by side.
- Tests: `tests/test_round88.py` (7: two phone sizes and the desktop) and `tests/test_round87.py` (3). `test_round71` was brought up to date (later panel sets; the first-spirit panel comes before the 30th's).

## Round 88b — the new pictures, the music and the sound picks in
### The redone frames
All 138 frames of `redo84` and `redo84b` and the inventory portrait (`sc_hero_portrait`) were painted after two fixes:
- `redo.ps1` used `$list` while its `-List` parameter is `$List`. PowerShell names ignore case, so every id was squashed into one and nothing was sent; the list is `$todo` now.
- The scenery export left out `07zt8` (the portrait), and the sprite export failed on `window.addEventListener` from `07zdlg`. Both are fixed in `build.mjs`.

The 59 montage folders, the Lab sheets and the 18 sheets the game plays from (`assets/story`) were made again, and the portrait was cut (`hero_portrait_m` / `_f`).

### The review (doc 40's rules)
| Scene | Problem | Done |
|---|---|---|
| The Long Quiet 6 | a child-sized figure hiding with the villagers | prompt: adults only, no children |
| The Black Tide 6 | living people chained under the water | prompt: pale, translucent spirits, no living people |
| Asgard comes down 3 (Zeldara) | a child-sized figure on the pier | prompt: adults only, as tall as the hero |
| Bram 4 and 5 | piers and scaffolding already in the river | prompt: nothing in or over the water yet |
| Dunn 2 | gate towers and chains at the chasm edge | prompt: bare cliff edges, no bridgeheads |
| Mira 5 | lift frames by the falls before her first chain | prompt: the cliff is bare rock |
| Vela 1 | arches in front of the Ember Wall | prompt: nothing built in front of it |

`sprites/requests/redo88.txt` (13 pictures): `.\tools\sprites\redo.ps1 -List redo88`.
Minor, left as they are: a few unsure crowd faces (Stone-Fall, village, celebration 1); sky in the Lodestar's cavern (1–2); Runa drawn as a man in celebration 2.

### The video negative prompt
Kris: Kling had people take out umbrellas in the rain. `ZSB.NEG` now also excludes anything from after the Viking age: umbrellas, parasols, modern clothing, glasses, watches, phones, guns, cars, tyres, plastic, zippers, electric lights, street lamps, power lines, paved roads and modern buildings.

### The music
All of Kris's Suno pieces are in the game. There are 13 cues: the title, the two old sagas, the glimpse, the village by day and by night, the hearth, the shops, Glimmerhall, the green again, the Grasslands by day and by night, and the caverns. `mu_home2` and `mu_village_day2` became second takes (`.b`).

`04c2` starts a two-take cue on the other take each time, and the loop hands over to the other take.

In the Lab, Music & sound opens with **Your music — in the game**: a 2-minute preview player per take (`tools/audio/music_preview.py` → `lab/preview/music`, `LABMU.IN` in `79k2`). The same players appear on each cue's card. On the hosted Lab, a link plays the whole piece.

### The sound picks
Kris's 95 picks are in `sprites/requests/sound_picks.json`.
- 73 change the sound; 48 of those rotate two or three takes.
- 22 keep today's take.

They were put in with `pick_sounds.py` and `intake_audio.py`, and each is marked "eth". The old takes are in `audio/replaced_r81`.

### Also picked in the Lab, for the next round
- **Boss shapes:** all 12 were picked. On eight of them Kris noted "50% of the map is too much for the safe zone, especially for harder difficulties". When they are wired in, the safe share scales with difficulty.
- **Dialogue box:** the Rune-stone look.
