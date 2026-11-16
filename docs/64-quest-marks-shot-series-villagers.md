# 64 — Round 112: quest marks on the map, shot series instead of videos, and the villagers

## 1. Quest marks (21q2, 21q3, 21v, 21q)

Kris: "whatever side quest you choose is a yellow indicator on the map. it seemed to be stuck at the town center … let's have the main quest be a runic teal indicator on the map as well, but let's get rid of the proximity counter".

- **Two marks, always.**
  - **Yellow** is the side quest you chose (☆ in the journal or the map's list). With nothing chosen, it shows Oswin's open first tasks, and after that nothing.
  - **Runic teal** is the next step of the Saga.
- **On the little map:**
  - a yellow arrow and a teal rune-cut diamond on the rim, with no distance number;
  - a ring in its colour when you are on the spot;
  - when both point to the same place, only the teal one shows.
- **On the big map:**
  - the yellow ★ pin (your side quest);
  - a pulsing teal ᛉ diamond labelled "Saga: …";
  - a legend line under the quest list.
- **The quest list** no longer shows "N tiles": just the direction ("to the NE").
- **Under the little map:** one teal line, "ᛉ Saga: …", and one yellow line, "★ …".
- **Why the mark was stuck on the Green:** Elder Runa's step of the first walk ranked above the quest you chose. If you never spoke to her, the arrow stayed on her by the Runestone.
  - Now the quest you chose comes first. Runa's step only leads when nothing is chosen.
  - Her step also ends by itself once you walk out of the village (40 tiles) or after four minutes. Her waystone lesson then comes as a note.
- **Code:** `ZJOUR.sideT`, `ZJOUR.mainT`, `ZJOUR.mark`, `ZCURQ.mainPin`, `ZWALK.RUNA_FAR` / `RUNA_MS`.

## 2. From videos to shot series (07zt9b, Lab "Shot series")

Kris: "Instead of videos, let's turn each current image into a series of 3-10 different images … try and still create cinematic effects … Start with your top 10".

**The approach: cut, don't invent.**
- Each shot is one picture requested with the story frame as its **first reference**. It keeps the same place, people, clothes, colours and light; only the camera changes.
- The shot types:
  - establishing wide and extreme wide;
  - macro insert;
  - extreme close-up;
  - over the shoulder;
  - reaction;
  - low angle;
  - tracking;
  - frozen moment;
  - silhouette.
- **In the game,** each shot is held 1.2–2.5 s with one camera move: push, pull, pan, tilt, crane, orbit or shake. Shots are joined by a hard cut, a flash (white, red or blue), a whip pan, a dissolve or a dip to black.

**The first ten** (63 pictures, Zeldor only until the look is right):

| # | Frame | Shots | The idea |
|---|---|---|---|
| 1 | opening 5, the storm | 7 | a chain of strikes marching to the village |
| 2 | opening 7, two babes | 6 | the reveal: the blanket, the eyes opening |
| 3 | spirit 5, your hand on the stone | 6 | the touch as ignition |
| 4 | spirit 6, the chains break | 6 | slow motion: macro, burst, frozen links |
| 5 | ashnight 4, the Ember Wall | 6 | time-lapse of the wall rising, then flight |
| 6 | mira 8, the lever | 6 | the machine waking (hands, gears, chains, cage) |
| 7 | lodestar 6, their light | 7 | whip-pans between the four Heartglasses |
| 8 | bifrost 5, a bridge of light | 6 | a skim over the water, a crane up |
| 9 | sol2 2, the crack | 6 | the mask cracking, something looking out |
| 10 | feasthall 7, a million shards | 7 | the burst, frozen shards, the raven, the gods |

- **To make them:** `.\tools\sprites\redo.ps1 -List r112`
- **Then:** `python tools/video/series_preview.py` makes the Lab's strips.
- **The Lab:**
  - each series shows its frame, its shot list, the sheet ids and a ▶ rough animatic, which uses the real shots once they are in;
  - all 34 cut-scenes are broken into their 259 frames, each with its pattern (Impact, Transformation, Building, Journey, Conversation, Reveal, Boss entrance, Memory, Vista).
- **Not yet:** the game does not play the series yet. That comes once the first ten are judged.

## 3. The villagers (Lab "Villagers & side quests")

Kris: "The NPCs need to have more personality …", plus "not all NPCs need to be funny … dark and dismal, straight up rude (but not profane …), super cheery …", and "quests … can also have a riddle-like nature …".

**How meetings are counted:**
- one full playthrough on Normal, from the game's triggers: the talks the story needs, a typical run's shop visits, and the story moments each NPC appears in;
- 41 entries and 169 people (groups such as the 40 spirits count each member);
- 630 meetings, an average of 3.7, so 10× the average is 37.

**The ranking:**
- Above 10× the average: Oswin (62), Benno (44) and Morwen (40).
- Kris chose arcs for the top 6, which adds the twin (30), Tilda (28) and Garrick (26).
- Every one of those six has a five-stage arc through the realms.

**For each NPC:**
- Personality ideas: 3 each for the top 20, 2 for the rest.
  - The tones are deliberately mixed: super cheery, cheerfully rude, dark and dismal, deadpan, eerie, theatrical, tender.
  - Each idea names its source: the Norse world and its contacts (Miklagard and the Varangians, Serkland and Baghdad, the Rus rivers, Ireland, the Sámi, Iceland's Althing, Frisia and Birka, the Khazar steppe, Vinland).
- Which quest they give today: main, side, tutorial or none.
- At least 2 side-quest options, each with its reward, a short description and the art it needs.
  - 17 of them are 🧩 riddles. Ask the giver again for hints, or ask the villagers named in the quest.

**Also in the tab:**
- 8 dramas that run through the game:
  - the Bread and the Brew;
  - the Five Tankards;
  - Letters to the Lighthouse;
  - the Village Moot;
  - the Thief in the Night;
  - the Smith and the Dwarf;
  - Morwen's Chains;
  - the Twins' Saga.
- 14 engagement ideas: hearts and gifts, a riddle hint ladder, passing remarks, the rumour board, raven post, routines, mini-games, portraits, and others.
- 6 art proposals, about 33 sheets in all.

The picks are `npcs-<npc>_i<k>`, `_arc`, `_q<k>`, `npcs-d_*`, `npcs-e_*` and `npcs-a_*`, each ✓ do / ✕ skip with a note. Only the art for what Kris ✓s gets ordered.

## Tests

- **`tests/test_round112.py` (10):**
  - the two marks;
  - Runa no longer outranks the chosen quest, and her step ends when you leave the village;
  - no number on the little map;
  - the teal and yellow pins, the legend and no tile counts;
  - the two lines under the little map;
  - the ten series (63 shots, each cut from its frame);
  - the Lab's two tabs.
- **`test_round100.py` updated:** Runa's talk now happens on the Green.
