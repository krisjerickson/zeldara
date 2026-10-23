# The Saga of Zeldara and Zeldor — story context for agents

> **What this file is.** The full, canonical story of the game *The Quests of Zeldara and Zeldor*. It is meant as the complete context for an AI agent that writes prompts, scripts, captions or cut-scene clips for the game. Its companion file `zeldara-style.md` covers how everything looks, sounds and reads.
>
> **Source of truth.** This file follows the game's story map (`src/js/07zst-saga-story.js`, the Lab tab "The saga, end to end"), which Kris has reviewed. If something here conflicts with an older note, this file wins. Last updated: round 73 (Oct 2026).

---

## 1. The story in one paragraph

Runeheim is a Norse fantasy land of four realms around a great lake. The dead of Runeheim used to rise along the World Tree to the gods, and new souls came down the same road into every newborn. Thirty-six winters ago a false god, **Solmyrk**, wearing a golden mask, trapped **Odin** and **Freya** in two orbs of their own light. He sat on Odin's high seat and shut Asgard's gate, so no soul could rise and none came down. His ally **Surtharn**, the fire giant of **Muspelheim**, caught the wandering dead and chained them to bindstones to dig for him, and he broke three of the four realms one by one. Twenty years without a child passed in the last village. Then, on the night of a terrible storm, two babes with glowing rune-blue eyes drifted out of **Mirror Lake** in a floating basket: **Zeldara** and **Zeldor**.

Now about sixteen, one twin goes out into Runeheim and the other stays home to study the old sagas. The one who goes out frees the bound spirits, and each freed spirit's line of light draws part of a great World Tree across the land. They reopen the realms, break Surtharn's forges and Muspelheim itself, and forge the **Lodestar**. The twin at home finds the Lodestar's one word, **Godsbane**. Together the twins unmask Solmyrk, free Odin and Freya, and learn the truth: the twins are the gods' last gift, two sparks of their own light sent down in the storm. The gods lead the spirits home. Runeheim turns green, the monsters fade, and children are born again.

---

## 2. Canon at a glance (never contradict these)

- **The world** is **Runeheim**. **Muspelheim** is only Surtharn's fire realm (a volcano island off the Ashlands' west coast). **Asgard** is the gods' city in the sky.
- **The heroes** are twins, **Zeldara** (the girl) and **Zeldor** (the boy). They are the **same age (about 16) and the same height**. The player chooses one; **the other stays in the village** and studies the old sagas the whole game.
- **Solmyrk, the Black Sun**, is an **impostor**, not a corrupted Odin. He is "a thing of stolen light" wearing Odin's stolen face as a golden mask, and under the light there is only dark. In code and old notes he is sometimes still called *Grímnir*.
- **Odin and Freya** are good, warm and wise. They are **never golden or masked**; that look belongs only to Solmyrk.
- **Surtharn, Tyrant of Muspelheim**, is the fire giant. He made a pact with Solmyrk: fire took the land, false light took the sky.
- **The word "spirit"** means only the trapped souls of the dead. The elemental companions are **familiars**, never spirits.
- **There are forty bound spirits**, ten per realm, each chained to a **bindstone** and guarded by a **Binder**.
- **The twins' gift:** they read runes no one else can, and runestones and gems light up for them. *Why* is the game's big secret, revealed only in the feast hall.
- **The Lodestar** is the one divine staff in the game. **Godsbane** is its one spell. **The other twin teaches the word**; the spirits do not.
- **The World Tree** is carved into the **Runestone Green** at the village's heart. The forty soul-lines draw the same tree across the whole land, "like a tattoo". After the end, with all forty spirits free, it **shines under Mirror Lake** and stays there.

---

## 3. The world

### 3.1 The land of Runeheim

A round land of four realms around **Mirror Lake**, ringed by sea. Its **soul-lines** (the World Tree's boughs) will one day become the roads between the realms.

| Realm | Where | Its land | How it fell |
|---|---|---|---|
| **The Grasslands** | north-east | Green meadows, wildflowers, standing runestones, farms, the last village | It never fell. It was the last realm left, and it went through **the Long Quiet**. |
| **The Wetlands** | south-east | Marsh, reeds, the wide **Silverrun** river, mist and mills | **The Black Tide** (about year 8). The Silverrun rose black from the south, the marshes drank the villages, and the river became a wall. |
| **The Highlands** | south-west | Mountains, cliffs, mines, snow and waterfalls | **The Stone-Fall** (about year 3). The mines dug deeper after "a voice in the stone", the mountains broke and **the Great Scar** tore open. |
| **The Ashlands** | north-west | Ash-grey plains, lava channels, smoky orange skies | **The Ash Night** (year 0, the night the gate shut). Fire and ash fell, **the Ember Wall** rose against the Grasslands and **the Cinder Chasm** split from the Highlands. The people perished and their souls were bound to dig. |

**The four barriers** were the Ember Wall, the Great Scar, the Silverrun and the Cinder Chasm. Four master builders, taken by Surtharn's wardens, reopen them when the twin frees them:

| Builder | Crossing | Look |
|---|---|---|
| **Bram the Builder** | raises the bridge over the Silverrun (Grasslands ↔ Wetlands) | A stocky, bearded man in a flat cap with a leather work-vest and a big hammer |
| **Mira the Mechanic** | builds the cage-lift up the Great Scar to the Highlands. Later her workshop in the village makes the hearth trays for the forges. | A young woman with wild red hair, brass goggles, overalls and a tool belt |
| **Dunn** | builds the iron bridge over the Cinder Chasm to the Ashlands | A dwarf forger with a big red beard, a leather apron and a hammer |
| **Vela** | builds the passes through the Ember Wall | — |

### 3.2 The village and Mirror Lake

- **The last village** sits on the shore of Mirror Lake, at the centre of Runeheim.
- **The Runestone Green** is its heart. On it stands the oldest stone with the World Tree carved into it, and freed spirits gather there in rings.
- Places in the village:
  - **the Home**, where the other twin lives and studies;
  - **the Glimmerhall**, the glass-domed hall of **Sólveig the Glasswright**, with rune-etched panes that glow light blue;
  - **Mira's workshop**;
  - **the harbour and pier**, whose end has the **notch** where the Lodestar is set.
- Village people:
  - **Elder Runa** keeps the old lore;
  - **Pip and Wren** are village children who are away until the end, then among the first children of the new age;
  - the shopkeepers.
- **Mirror Lake** is where the twins' basket came from. After Muspelheim falls, Asgard comes down and rests on the lake. After the end it sinks, leaving only its golden spires above the water.

### 3.3 Muspelheim and the forges

- **Muspelheim** is Surtharn's black volcano island off the Ashlands' west coast. Its deep halls are full of chained spirits, digging. Its **great hearth** is where the Lodestar is made.
- **The four Forges of Muspelheim** rise from the sea on walled causeways. They are taken in order, and each forge-master holds the key to the next:
  1. **Ember Forge**, with **Brokk the Bellows-Wyrm**
  2. **Cinder Forge**, with **Hissa the Quench-Hag**
  3. **Slag Forge**, with **Krag the Slag Troll**
  4. **Ash Forge**, with **Sinda the Chainmistress**
- **The forges were built to melt the gods' light into chains.** Mira: "We'll melt it back."

### 3.4 Asgard

- **Asgard** is a white-and-gold walled city of spires. It came down from the sky onto Mirror Lake as an island.
- **The Bifröst** is a bridge of light. It runs from the pier's notch to Asgard's gate, and later from the heart of Asgard up into heaven.
- Inside Asgard:
  - **the citadel**, whose throne hall holds Odin's stolen high seat;
  - **the feast hall of the gods** behind the high seat: dusty tables, two empty high seats, and the two joined orbs;
  - **the rune circle** at Asgard's heart.
- **Valhalla** is for the warriors who fell; **Fólkvangr** (Freya's field) is for everyone else.

### 3.5 Things that matter

| Thing | What it is |
|---|---|
| **Bindstone** | A tall dark runestone with a spirit chained to it by ember-glowing black chains. Its **Binder** (a chain-keeper of fire) guards it. |
| **Soul-line** | The line of rune-blue light that runs out of a bindstone into the land when its spirit is freed. Forty of them draw the World Tree. Where the light runs, grass and paths will one day follow. |
| **Soulglass** | Shards from freed spirits, made by the Glasswright into a lattice for each realm, then fused at a forge's hearth into a **Heartglass**. |
| **The four soul gems** | Given by the great spirit each realm's cruellest Binder held: **Grovesoul** (green, Grasslands), **Tidesoul** (sea-blue, Wetlands), **Stonesoul** (amber, Highlands) and **Embersoul** (red, Ashlands). |
| **Hearth tray** | Mira's metal tray that holds the glass in the forge's heat |
| **The Lodestar** | A tall staff of silver and gold. Its crown is a ring set with four gems (green, blue, amber, red) around a blazing white star. Its name means the guiding star that leads the spirits home. |
| **Godsbane** | The Lodestar's one word and spell. It frees gods and wakes the Bifröst. |

---

## 4. The people

### 4.1 The twins

- **Zeldor** (the boy) has spiky, tousled brown hair streaked with teal, big teal eyes and a moss-green hooded short cape.
- **Zeldara** (the girl) has long auburn braids with silver clasps, a braided headband with a small glowing teal gem at her brow, big teal eyes and a short teal-green mantle with a pale fur collar.
- Both are young teenagers of the same age and height, in cream tunics, leather belts and big boots.
- When they were found, their eyes glowed rune-blue. Goat's milk "put the light out — or hid it."
- **The one who goes out** (the player) is a fighter, rune-reader and spirit-freer.
- **The one who stays** keeps the village going, reads the old sagas all game and pieces the story together ("The line it left — I've seen that pattern before…"). Once the Lodestar is whole, this twin finds and teaches **Godsbane**, then comes to Asgard and casts it with the player in the feast hall.
- Story art often has two versions, one for each choice of player. In those, the hero in the foreground is the twin you play.

### 4.2 The gods

- **Odin, the Allfather**
  - Looks: very tall and broad, with a long silver-white beard braided with small gold rings. One eye is under a plain dark leather patch and the other glows soft rune-blue. He wears a wide-brimmed grey traveller's hat, a deep blue cloak lined with grey wolf fur, a mail shirt, the spear **Gungnir**, and a black raven on his shoulder.
  - Manner: kind, wise and weary.
  - His magic: **blue-white lightning**.
- **Freya, the Lady of the Fields**
  - Looks: tall and radiant, with warm golden-brown skin and long red-gold hair in loose braids woven with white and yellow flowers. She wears a green-and-gold gown, a cloak of brown-and-gold **falcon feathers**, the glowing amber necklace **Brísingamen**, and green-vine bracelets.
  - Manner: warm, strong and joyful.
  - Her magic: **green vines and spring flowers**.
- For thirty-six winters they slept inside two great orbs of their own light, joined like an **infinity sign**.

### 4.3 The enemies

**Solmyrk, the Black Sun** is the false god on Odin's high seat. He fights in three forms:

1. **The Allfather's Mask**: a radiant figure in gold and white, with a golden mask, light-wings and a crown of spikes.
2. **The Cracked Mask**: the golden mask split down the middle, one half radiant god and the other a black void. His light-wings are torn and the tears show darkness. Gungnir, stolen, still shines.
3. **The Storm That Ends the World**: almost all black. A colossal storm-figure with a mantle of thunderheads, wings of cloud and white lightning, and a pale one-eyed mask, with an eclipsed sun behind him.

His theme is **stolen light over darkness**. In his panels, "the golden mask splits — black light pours out" and "behind the Allfather's face, something else is looking out."

**Surtharn, Tyrant of Muspelheim** is the fire giant on a burning throne. He fights in six forms:

1. **the Molten Colossus**, with a burning greatsword;
2. **the Forge-king**, whose sword melts into a hammer and who wears an anvil-crown;
3. **the Ash Tyrant**, trailing chains of spirit-light;
4. **the Horned Jötunn**, with the **Sword of Flame**;
5. **the Obsidian Warlord**, in black glass armour with a molten heart;
6. **the Living Volcano**.

His boast: "The bright one gave me the land for the sky. Every gem of Runeheim is mine by right!"

His other servants:

- **the Binders**, chain-keepers of fire who catch the wandering dead;
- **the ash-wardens**;
- **the forge-masters**: Brokk, Hissa, Krag and Sinda;
- the monsters of each realm, which fade into motes of light at the end.

### 4.4 The spirits

- There are forty, ten per realm.
- **Look:** friendly, small, translucent human figures glowing light rune-blue. They are villagers, miners, skalds, mothers and farmers of every age.
- **When trapped,** they are chained, toiling and slumped. **When freed,** they rise, relaxed and floating, and drift home to gather on the Green.
- Each one says **one memory** when freed. Together the memories tell the history in pieces. Examples:
  - Asa: "I wove twenty birth-shawls that no child ever wore."
  - Dagny: "The night of the storm I saw it from my stone: two little lights on the water, going home."
  - Arnor: "The miners said the stone was singing. They dug toward it. So did the mountain."
  - Unn: "Muspelheim and Asgard are tied. Break the fire and the sky will fall to you."
  - Kolbein: "The one on the high seat has one eye too. But his eye has never seen anything."
- **Hildr of the Long Barrow** was the first queen of the Grasslands and the greatest spirit its cruellest Binder held. She gives the twin **Grovesoul**. Each realm has one such great spirit.

### 4.5 Others

- **Fairies:** twenty of them, five per realm, plus **the fairy monarchs**, angelic and old. The monarchs remember the gods without ever naming them. The Grasslands monarch says: "The one with the spear and the one with the falcon cloak laughed with us."
- **Familiars:** four elemental companions (fire, water, nature/grass, earth). They go with the spirits into legend at the end.
- **After the end:**
  - forty hamlet folk, one kin per spirit, each with a trade;
  - twenty-four children born as the cycle turns again;
  - newborns in the midwives' cradles.

---

## 5. Timeline (years from the night the gate shut)

| Year | Event |
|---|---|
| before | **The cycle of souls.** The dead rise along the World Tree to Asgard (Valhalla for the fallen, Fólkvangr for the rest), and new souls come down it into every newborn. |
| 0 | **The gate shuts.** Solmyrk, in a golden mask, traps Odin and Freya in two orbs, takes the high seat and Odin's names, and shuts the gate. The same night is **the Ash Night**: Surtharn wakes, the Ashlands burn, the Ember Wall rises and the Cinder Chasm opens. The Binders start chaining the dead to dig. |
| ~3 | **The Stone-Fall.** The Highlands break and the Great Scar opens. |
| ~8 | **The Black Tide.** The Wetlands drown and the Silverrun becomes a wall. Only the Grasslands are left. |
| 0–20 | **The Long Quiet.** No child is born alive in the last village. The Grasslands' dead drift at the edge of the light, and lately the Binders come over the walls for them too. |
| ~20 | **The storm and the basket.** Lightning strikes runestone after runestone across the Grasslands. At dawn a floating basket drifts out of Mirror Lake with two babes whose eyes glow rune-blue. |
| ~36 | **Now.** The twins are about sixteen. One goes out and the other stays. The game begins. |

---

## 6. The saga, act by act

Each beat below gives **the truth**, what stays a **mystery** and until when, and the **moments** that show it. The moments are cut-scene panels (ids in `code`) or hints from characters.

### Act I — The Quiet (the world and the twins: the opening)

1. **The cycle of souls.** The dead rose along the World Tree to the gods, and new souls came down it. This is told as old lore; that the road is blocked comes later. *Elder Runa:* "The tree on the Green is the road the dead walk home. Lately… it has been quiet."
2. **The Long Quiet.** Twenty winters without a child.
   - Opening panel `pn_saga_cradles`: "In the last village the cradles stood empty. No child had been born alive in a lifetime."
3. **The storm and the basket.** WHO sent it and WHY the lightning struck the stones stay a mystery until the feast hall.
   - Opening panels `pn_saga_storm_b` and `pn_saga_basket`: "Then came the worst storm anyone remembered — and the lightning struck the runestones, one after another."
4. **The twins and their gift.** Raised on goat's milk and old songs, they read runes no one else can, and stones light for them. WHY stays a mystery.
   - Panels `pn_saga_raised` and `pn_saga_eyes`: "They read runes no one else could, and the old stones woke for them."
5. **One goes, one stays.** The village sends one twin out. The other stays, studies the old sagas all game, and is the one who finds the Lodestar's word.
   - Panel `pn_saga_sendoff`: "One twin goes out into Runeheim; the other stays to keep the village."
   - *The twin at home:* "I'll keep the village going — you bring them home. Come back and tell me everything you find."

### Act II — The Bindings (the spirits in chains and how the realms fell)

6. **The bound spirits.** With the gate shut the dead had nowhere to go. Surtharn's Binders chain them to bindstones, forty across the four realms. That the Binders serve Surtharn is only hinted at first and is plain by Muspelheim.
   - **The first spirit freed:** `pn_binders_free`, "The chains fall away — and for the first time in years, a soul of Runeheim is free."
7. **The soul-lines.** Each freed spirit's line traces into the land, and together the forty draw the World Tree. What the drawing is *for* stays open until the fortieth.
   - **After the first spirit:** `pn_lines_life`, "Its soul-line runs out into the land… and where the light runs, life may one day follow."
   - *The twin at home, at twenty freed:* "Bring me the map. The lines… they're drawing something. Something that wants to be finished."
8. **The Ash Night.** Played with the Ashlands' **first** freed spirit: `pn_saga_ashnight_b`, "The night Asgard's gate shut, fire fell on the Ashlands and the Ember Wall rose."
9. **The Stone-Fall.** Played with the Highlands' **first** freed spirit: `pn_saga_stonefall_b`, "Three years on, the Highlands dug too deep for a voice in the stone — and the mountains broke."
10. **The Black Tide.** Played with the Wetlands' **first** freed spirit: `pn_saga_blacktide_b`, "Then the Black Tide: the Silverrun rose black, and the marshes drank the villages."
    - The Grasslands' panel, **The Long Quiet** (`pn_saga_quiet_b`), plays with that realm's **tenth** freed spirit: "Only the Grasslands were left — and the Long Quiet, when the dead drifted at the edge of the light."
11. **The barriers and the builders.** One cut-scene per builder freed:
    - `pn_build_bram`: "Bram raises the Silverrun bridge — for the first time in years, the Grasslands and the Wetlands touch again."
    - `pn_build_mira`: "Mira's lift climbs the Great Scar — the road to the Highlands is open."
    - `pn_build_dunn`: "Dunn drives the last rivet into his iron bridge — across the Cinder Chasm lie the Ashlands."
12. **The bargain of fire and false light.** Surtharn and the one on the high seat made a pact. It is only hinted until Muspelheim, and the false god's face stays hidden until the citadel. *Ashlands fairy monarch:* "Fire and false light made a bargain. One took the land, the other the sky. Neither keeps a promise."

### Act III — The Hidden Sky (the shut gate and the gods' prison)

13. **The gate shut: a mask on the high seat.** Shown at **the twentieth spirit** as a glimpse, `pn_saga_gate`: "High above, a golden gate had shut. On Odin's high seat sat someone in a golden mask." That he is an impostor stays half-hidden until the citadel.
14. **The gods in their prison.** Shown at **the thirtieth spirit** as a glimpse, `pn_saga_orbs`: "In a dark hall far above, two great lights float side by side, asleep — and something in a golden mask keeps watch." The figures are shown but not named until the feast hall. In the art, the twins stand in the foreground, the same size.
15. **The World Tree complete.** This comes **after the end, with all forty spirits free**:
    - the whole tattoo seen from high above (`pn_saga_tattoo`), then
    - **the World Tree glowing under Mirror Lake** (`pn_world_tree`): "And under Mirror Lake, where the twins were found, the World Tree shines — whole at last."
    - Its light stays in the lake.

### Act IV — Fire (the forges, Muspelheim and the Lodestar)

16. **The forges and the Lodestar.** The Heartglasses and the staff are fused at Muspelheim's great hearth.
    - `pn_forges_lodestar`: "At Muspelheim's great hearth the four heart-glasses pour their light into the staff — the Lodestar is made." It plays the moment the Lodestar is first made.
17. **Surtharn falls; Asgard comes down.**
    - Surtharn's phase panels: `pn_surt_1` to `pn_surt_6`.
    - Muspelheim collapses and sinks (`pn_musp_sink_a`/`_b`), and the twin escapes with the spirits.
    - With the fire broken, Asgard opens in the sky (`pn_asg_sky_c`, `pn_asg_sky_a`) and comes down onto Mirror Lake (`pn_asg_lake_a`).
18. **Godsbane and the Bifröst.**
    - With the Lodestar in hand, the twin goes home. The other twin has found the word in the oldest saga, the one nobody could read (`pn_twin_teach_m`/`_f`): "I've been reading these texts since the day you left. Say it with me: GODSBANE."
    - Set in the pier's notch, the Lodestar raises the Bifröst to Asgard's gate, and the spirits bless the road.

### Act V — Asgard (the false god, the feast hall and the truth)

19. **The false god unmasked.** In the citadel's throne hall the masked one rises (`pn_sol_0`): "On the high seat of Asgard a god of gold unfolds his wings — Solmyrk, the Black Sun." His mask splits (`pn_sol_12_a`/`_b`) and then shatters (`pn_sol_23_a`/`_b`): "…and what is left is the dark that was always underneath."
20. **The feast hall.** The citadel shakes (`pn_fh_crumble`) and golden doors open behind the high seat (`pn_fh_doors_m`/`_f`). Inside are dusty tables, two empty high seats, and two great orbs floating joined like an infinity sign (`pn_fh_orbs`). Voices come from inside them, and the Lodestar trembles.
21. **The gods freed.**
    - The other twin walks in beside the player, and **both twins cast Godsbane together** into the centre where the two lights meet (`pn_fh_cast_twins`).
    - The orbs burst into a million shards of light (`pn_fh_shards`), and Odin and Freya stand free (`pn_fh_gods`).
22. **The truth about the twins.** This is the game's big secret, and nothing before it gives it away. Panel `pn_fh_truth_m`/`_f`. The gods' six lines:
    1. Odin: "You came. Thirty-six winters we slept in our own light — and still you came."
    2. Freya: "Do you know why the runestones light for you? Why your eyes shone on the lake?"
    3. Odin: "The night the false one took us, we had one breath of light left. We spent it on you — two sparks, one for each of you."
    4. Freya: "We sent you down in the storm. The lightning woke the runestones, so that one day they would wake for you."
    5. Odin: "You are our last gift to Runeheim. And you have given it back to us."
    6. Freya: "Come. The spirits have waited long enough. Meet us at the heart of the city — and bring the Lodestar."

### Act VI — Home (the spirits go home and Runeheim turns green)

23. **The spirits go home.**
    - At the rune circle, Godsbane into the sky remakes the Bifröst into heaven (`pn_end_cast_a`/`_b`, `pn_end_bif_a`/`_b`).
    - Odin and Freya lead the spirits up it (`pn_end_gods_lead`): the warriors to Valhalla and the rest to Fólkvangr. The familiars and fairy monarchs go with them, into legend.
    - The farewell (`pn_end_farewell`). *Freya:* "Valhalla for the brave, Fólkvangr for the rest — and every one of them home." *Odin:* "Go to your village. We will follow."
24. **Lightning and vines.** Back on the Green:
    - *Odin:* "Runeheim! Look up." His blue lightning wakes every runestone at once (`pn_vil_lightning`).
    - *Freya:* "And now… the spring." She kneels, and green vines run out of her hands along the soul-lines (`pn_vil_vines`).
    - The lines of light become roads of grass and stone.
25. **Runeheim changed**, in five panels:
    - the land green (`pn_vil_green`);
    - the forges sinking into the sea (`pn_vil_forges`);
    - Asgard settling into Mirror Lake, with only its golden spires above the water (`pn_vil_asgard`);
    - the monsters fading into motes of light (`pn_vil_monsters`);
    - people walking out on the new roads to build homes in every realm (`pn_vil_paths`).
26. **Children again.** The village celebrates the twins (`pn_cel_feast`), time passes (`pn_cel_time`), and children are born again (`pn_cel_children`): "And children were born again in Runeheim." Pip and Wren are among the first. A child in a hamlet says: "We play twins. I always have to be Zeldor…"
27. **The credits, and after.**
    - The credits roll over the night lake, naming the forty spirits (`pn_credits`).
    - The last picture is the twins on a hill over a green Runeheim (`pn_after`): "Runeheim is green again. Your journey goes on."
    - Free roam follows. Every hamlet has its kin and children, Asgard's spires stand in the lake, and once all forty spirits are free the World Tree shines under the water.

---

## 7. Who tells the story (voices)

The story is never told in one long speech. It arrives **in pieces, out of order**:

- **The freed spirits** each give one memory, often a single sentence that is sad, plain and specific.
- **Elder Runa** speaks old lore, half-remembered from grandmothers.
- **The other twin** offers curious deductions, warm and teasing. They are the scholar, and over the game they become the one who knows.
- **The builders** are practical and proud. Each has one line about how their barrier rose.
- **The fairy monarchs** speak in riddles and **never name the gods**.
- **Cut-scene captions** are short, past or present tense, one or two sentences, like lines from a saga. They often use "—" for a turn: "The chains fall away — and for the first time in years, a soul of Runeheim is free."

**Mystery discipline:** until the feast hall, never say *why* the twins have their gift, who sent the basket, or that the masked one is an impostor. The gods are not named until they are freed.

---

## 8. The cut-scene moments, in game order (for clip makers)

| # | When it plays | Panel id | The moment |
|---|---|---|---|
| 1 | New game | `pn_saga_cradles` | Empty cradles in the last village |
| 2 | New game | `pn_saga_storm_b` | Lightning strikes the runestones in the storm |
| 3 | New game | `pn_saga_basket` | The glowing basket on Mirror Lake at dawn |
| 4 | New game | `pn_saga_raised` | The village raises the twins |
| 5 | New game | `pn_saga_eyes` | Their eyes glow; runes wake for them |
| 6 | New game | `pn_saga_sendoff` | The send-off at the gate |
| 7 | First spirit freed | `pn_binders_free`, then `pn_lines_life` | The chains break; the line of light brings life |
| 8 | A realm's first freed spirit (the Grasslands: its tenth) | `pn_saga_ashnight_b` / `stonefall_b` / `blacktide_b` / `quiet_b` | That realm's old disaster |
| 9 | Each builder freed | `pn_build_bram` / `_mira` / `_dunn` | A crossing reopens |
| 10 | 20th spirit | `pn_saga_gate` | Glimpse: the shut gate, the mask on the high seat |
| 11 | 30th spirit | `pn_saga_orbs` | Glimpse: the two orbs, the twins looking up |
| 12 | Surtharn's fight | `pn_surt_1`–`6` | His six forms |
| 13 | The Lodestar made | `pn_forges_lodestar` | The Heartglasses pour into the staff |
| 14 | Muspelheim falls | `pn_musp_sink_a`/`_b` | The volcano sinks |
| 15 | After the escape | `pn_asg_sky_c`, `pn_asg_lake_a` | Asgard opens in the sky and comes down onto the lake |
| 16 | The Lodestar in hand, home | `pn_twin_teach_m`/`_f` | The other twin teaches GODSBANE |
| 17 | Solmyrk's fight | `pn_sol_0`, `pn_sol_12_a`/`_b`, `pn_sol_23_a`/`_b` | The Black Sun; the mask splits; the dark underneath |
| 18 | Solmyrk falls | `pn_fh_crumble`, `pn_fh_doors_m`/`_f`, `pn_fh_orbs` | The citadel shakes; the feast hall; the orbs |
| 19 | The cast | `pn_fh_cast_twins` | Both twins cast Godsbane together |
| 20 | The gods freed | `pn_fh_shards`, `pn_fh_gods`, `pn_fh_truth_m`/`_f` | Shards; Odin and Freya; the truth |
| 21 | The rune circle | `pn_end_cast_a`/`_b`, `pn_end_bif_a`/`_b`, `pn_end_gods_lead`, `pn_end_farewell` | The Bifröst to heaven; the spirits go home |
| 22 | The village | `pn_vil_lightning`, `pn_vil_vines`, `pn_vil_green`, `pn_vil_forges`, `pn_vil_asgard`, `pn_vil_monsters`, `pn_vil_paths` | Lightning, vines, the land changed |
| 23 | Celebration | `pn_cel_feast`, `pn_cel_time`, `pn_cel_children` | The feast; time passing; children again |
| 24 | Credits | `pn_credits`, `pn_after` | The night lake; the twins on the hill |
| 25 | After the end, all 40 | `pn_saga_tattoo`, `pn_world_tree` | The whole tattoo; the World Tree under the lake |

Panels with a hero in front come in a Zeldor (`_m`) and a Zeldara (`_f`) version; the game shows the twin you play.

---

## 9. Themes

- **The cycle of life restored.** Death, rest and rebirth are one road, and the game is about clearing that road.
- **Hope against a long quiet.** The village had stopped hoping, and two foundlings brought hope back.
- **Two halves, together.** One twin goes and one stays. Neither wins alone: the doer frees the land, the scholar finds the word, and both cast the spell.
- **Stolen light versus true light.** Gold and masks mean the false god; warm rune-blue and living green mean the true gods and the land.
- **Bonds and chains.** Chains, bindstones and forges that melt light into chains, answered by soul-lines, roads and bridges rebuilt.
- **Gifts given back.** The gods gave the twins, and the twins give Runeheim back to them.
