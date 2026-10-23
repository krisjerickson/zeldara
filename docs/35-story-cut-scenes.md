# 35 — Story cut-scenes in pictures (round 79)

Kris: "the videos are coming along, but we need to make them tell the story a bit more … For all of the cutscene, propose both story lines as well as develop images for about 6-12 different parts of the story being told. We'll then feed all of these into the video generator to make a multi image cut scene … Start with proposals for each of the different images for each cut scene as well as develop the requests for the images i can send for processing". Also: "keep the epic theme going … glowing runes and overall neon glow themes, aurora borealis effects, possibly shooting stars. The current images are great, don't change these."

**Decided (docs/08 › Open questions › Round 79):**

- S1: both hero versions.
- S2: every cut-scene, the boss forms too.
- S3: one montage clip per cut-scene, a mini scene per picture, up to 12.
- S4: a short line per beat.

**The numbers:** 33 cut-scenes, 254 frames and 352 pictures (frames with the twin you play come in a Zeldor and a Zeldara version). They go in five waves, 85–89; send them with `.\tools\sprites\round79.ps1` (or `.\tools\sprites\round79.ps1 -Wave 85` to start with one).

**Source:** `src/js/07zt6-storyboards.js` (ZSB). The Lab shows the same list in the **Story cut-scenes** tab: ☆ a story line, or leave a note with frame numbers to change it.

**Every request** keeps the game's look (the panel style references, the character and model sheets) and adds Kris's epic touch: neon rune-glow, the northern lights at night and dusk, now and then a shooting star. No old picture is changed.

**Making the montages (round 79b):**

1. `.\tools\video\storyboards.ps1` puts the frames in `sprites\storyboards\<cut-scene>\<zeldor|zeldara|all>\`, in order and cropped to 16:9, with `montage.txt` beside them, and opens the folder. Run it again as more pictures arrive.
2. In the video app, attach the folder's pictures in order and paste the VIDEO prompt from `montage.txt`. Save the clip as `<cut-scene>_<who>.mp4` (for example `spirit_zeldor.mp4`).
3. If the app takes fewer pictures at once, make one clip per shot instead, named `<cut-scene>_<who>_<nn>.mp4`.
4. `.\tools\video\video1.ps1 -Intake` takes the montages in, joining the shots where needed, as `assets/video/sb_<cut-scene>_<who>.mp4`.

**Next, once the pictures are in:**

1. The frames go to the video app as one montage clip per cut-scene.
2. The game plays the montage with a line per beat.
3. The frames themselves stay out of the game's files; only the clips ship.


## Wave 85 — the first spirit and the four builders

### The first spirit freed  (`spirit`, 12 frames)

**Plays:** the first spirit you free (then each realm's first spirit can reuse it)  
**The story:** A spirit chained to a bindstone toils without rest. You come close, see how the chains have worn it thin, lay your hand on the stone — your eyes burn rune-blue — and the chains burst. The spirit rises free; lines of light run out from under your feet into the land and the grass follows them; the spirit thanks you and drifts away over the hills to the village, where it waits on the Green, the first to come home.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The toiling spirit** — a pale, translucent spirit of a village woman in a shawl, glowing soft rune-blue, chained to a tall dark bindstone carved with one rune, bound in heavy black-iron chains that glow ember-red where they bite in a misty meadow at dusk, swinging a heavy pick at the rock with slumped shoulders, ember sparks rising; the chains drag at her wrists | Chained to a stone in the fields, a spirit of Runeheim toiled without rest. |
| 2 | you | **You come closer** — you walking through tall dusk grass toward the distant bindstone and its toiling spirit, sword in hand; behind you a dark hunched Binder (a chain-keeper of fire) crumbles into ash and embers | With its Binder gone, you came closer. |
| 3 | you | **Its struggle** — close on the spirit at the bindstone: her tired face, tears of light, the ember-red chains biting her wrists; you kneeling beside her, looking at her with deep concern | You saw how the chains had worn it thin. |
| 4 | you | **The rune on the stone** — you standing before the tall bindstone, reaching toward its single carved rune, which flickers faintly as if it knows you; the chained spirit watching over you's shoulder | The old rune flickered, as if it knew you. |
| 5 | you | **Your hand on the stone** — you's open palm pressed flat on the carved rune; you's eyes blazing bright rune-blue; neon rune-blue light flowing out of the hand into the stone's carved lines and racing along the chains | You laid your hand on the stone — and your eyes burned rune-blue. |
| 6 | you | **The chains break** — the black chains bursting apart in a blast of rune-blue light, glowing links flying outward in slow motion, the bindstone cracking with light; the spirit flinging up her arms; you shielding you's eyes | The chains burst apart. |
| 7 | you | **Free** — the spirit rising from the stone, peaceful, eyes closed, hands open, glowing brighter; you looking up at her from below, the broken chains on the grass | For the first time in years, a soul of Runeheim was free. |
| 8 | you | **Lines beneath your feet** — seen from above: from beneath you's feet, glowing rune-blue lines spread out through the grass like a Norse tattoo, branching and curling; you looking down in wonder | Beneath your feet, lines of light ran out into the land. |
| 9 | you | **Life follows the light** — a single line of light racing away across a grey, withered land toward the horizon; along it fresh green grass and small white flowers spring up; you small in the foreground watching it go | And where the light ran, the land remembered green. |
| 10 | you | **Her thanks** — the spirit floating before you, touching you's forehead with a glowing hand and a soft smile; a small shard of glowing glass drifting down into you's hand | "Thank you. Now I can go home." |
| 11 | you | **Toward the village** — night: the spirit drifting away over rolling hills toward a distant village by a lake, trailing light; you small on the hill watching her go; aurora above | She drifted away over the hills, toward the village. |
| 12 | you + your twin | **Home on the Green** — night on the village green round a tall old runestone carved with a tree: the spirit arriving and settling in a soft ring of light by the stone; your twin and a few villagers looking up at her in wonder | On the Green she waited, glowing — the first to come home. |

### Bram raises the Silverrun bridge  (`bram`, 10 frames)

**Plays:** freeing Bram the Builder (their tower) — then the crossing  
**The story:** You free Bram the Builder from a cage at the top of a tower in the Grasslands, walk with them to the Silverrun, help while they work out the problem and build, and see it finished — and the first people cross.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The cage** — the top of a dark stone tower in the Grasslands at dusk: Bram the Builder (exactly as in the character reference) locked in a black iron cage, gripping the bars; an ash-warden crumbling to ash beside it; you stepping up with a glowing rune-key | At the top of the tower, Surtharn's wardens had caged a builder. |
| 2 | you | **Free** — the cage door swung open; Bram stepping out and stretching, laughing, clapping you on the shoulder with a big hand, his hammer back in his other hand | "Free at last! I'll raise the bridge to the Wetlands." |
| 3 | you | **The river wall** — Bram and you on the bank of the Silverrun: a wide wild river racing dark and fast like a wall of water, the broken stumps of an old bridge, the misty Wetlands on the far side | The Silverrun ran like a wall between the realms. |
| 4 | you | **The plan** — Bram unrolling a big parchment of bridge drawings on a flat rock, its rune marks glowing faintly, pointing across the river with his hammer; you holding down a corner | Bram drew the bridge on parchment, then in the air with his hammer. |
| 5 | you | **Timber and stone** — Bram swinging an axe at a great pine, logs and cut stone piled by the river; you hauling a beam on one shoulder | Timber from the Grasslands, stone from the riverbank. |
| 6 | you | **Runes in the stone** — Bram knee-deep in the river setting a great stone pier, tapping a carved keystone so its rune flares neon blue and the water parts around it; you steadying the stone | Every stone he set, he marked with a rune. |
| 7 | you | **Under the northern lights** — night: the half-built arches over the river lit by lanterns, Bram hammering on a beam, you holding a lantern high; a wide aurora borealis across the sky and a shooting star | They worked through the night under the northern lights. |
| 8 | you | **The keystone** — dawn: Bram and you hauling on ropes and pulleys to lower a great glowing keystone into the top of the central arch | At dawn, the keystone. |
| 9 | you | **The bridge** — sunrise: the finished stone-and-timber bridge arching across the silver river, runes glowing along its rail; Bram raising his hammer in triumph on the bank, you beside him | Bram raises the Silverrun bridge. |
| 10 | you | **The first to cross** — the first travellers and a cart rolling across the new bridge to the green misty Wetlands, a heron rising from the reeds; you walking onto the bridge, Bram waving | For the first time in years, the Grasslands and the Wetlands touch again. |

### Mira's lift up the Great Scar  (`mira`, 10 frames)

**Plays:** freeing Mira the Mechanic (their tower) — then the crossing  
**The story:** You free Mira the Mechanic from a cage at the top of a tower in the Wetlands, walk with them to the Great Scar, help while they work out the problem and build, and see it finished — and the first people cross.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The cage** — a tower on stilts above the misty Wetlands marsh: Mira the Mechanic (exactly as in the character reference) inside an iron cage, already picking the lock with a little wrench; an ash-warden fading to ash; you arriving | In a tower above the marsh, the wardens had caged a mechanic. |
| 2 | you | **Free** — the cage door clanging open; Mira bursting out, goggles pushed up, grinning, holding up a brass gear; you laughing | "Thank you! My lift will carry you up to the Highlands." |
| 3 | you | **The Great Scar** — Mira and you small at the foot of the Great Scar: a towering torn cliff of broken rock with waterfalls pouring down it, rubble below, the Highlands far above in the clouds | The Great Scar: a mountain torn in two. |
| 4 | you | **Measuring** — Mira squinting through a brass telescope at the cliff top, chalk sums scribbled on a rock, you holding a long plumb line in the wind | Mira measured the cliff twice, and the wind three times. |
| 5 | you | **Gears and a rune-heart** — Mira at a workshop cart heaped with gears, chains and a brass winch, sparks flying from her tools as she fits a glowing rune-stone into the engine's heart; you handing her a wrench | Gears, chains — and a rune-stone heart. |
| 6 | you | **The first chain** — Mira and you climbing the cliff face on ropes, carrying the first great chain and a pulley to the top, mist and waterfalls far below | Someone had to carry the first chain to the top. |
| 7 | you | **Lanterns on the cliff** — night: the lift's timber frame climbing the cliff, lit by lanterns, Mira welding with bright sparks high up, you below; an aurora borealis across the sky | By night the cliff glittered with her lanterns. |
| 8 | you | **The lever** — Mira gripping the great brass lever with both hands at the foot of the lift, you beside her, both looking up as the gears begin to turn and the runes on them glow | Then she pulled the lever. |
| 9 | you | **Up the Scar** — the wooden cage-lift climbing the cliff face on chains and turning gears, Mira and you inside looking out at the view, a lantern swinging, mist below | Mira's lift climbs the Great Scar. |
| 10 | you | **The Highlands** — sunrise: Mira and you stepping out of the lift at the top onto the rocky Highlands, snowy peaks ahead, Mira waving her goggles | The road to the Highlands is open. |

### Dunn's iron bridge over the Cinder Chasm  (`dunn`, 10 frames)

**Plays:** freeing Dunn the Dwarf Forger (their tower) — then the crossing  
**The story:** You free Dunn the Dwarf Forger from a cage at the top of a tower in the Highlands, walk with them to the Cinder Chasm, help while they work out the problem and build, and see it finished — and the first people cross.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The cage** — a snowy mountain tower in the Highlands: Dunn the dwarf forger (exactly as in the character reference) rattling the bars of an iron cage; an ash-warden crumbling; you arriving through the snow | High in the mountains, the wardens had caged a dwarf forger. |
| 2 | you | **Free** — Dunn out of the cage, roaring with laughter, lifting his big hammer over his head; you grinning | "Ha! Let me at my anvil — an iron bridge to the Ashlands it is!" |
| 3 | you | **The chasm** — Dunn and you on the edge of the Cinder Chasm: a deep gorge glowing with lava far below, a smoky orange sky, the ash-grey Ashlands on the far side | The Cinder Chasm opened the night the sky went quiet. |
| 4 | you | **A forge on the edge** — Dunn's forge built on the edge of the chasm, bellows roaring, you pumping the bellows, Dunn hammering a glowing iron girder on the anvil | Dunn built a forge on the edge of the chasm. |
| 5 | you | **Runes in the iron** — Dunn carving runes into a red-hot girder; the runes cool to a bright neon rune-blue glow; you watching | Iron for the heat, runes for the holding. |
| 6 | you | **Out over the fire** — a timber crane swinging the first iron girder out over the glowing abyss, Dunn riding the girder with his hammer, you hauling the rope | Beam by beam, out over the fire. |
| 7 | you | **Between lava and aurora** — night: the half-built iron bridge silhouetted over the lava glow, sparks flying from Dunn's hammer, an aurora borealis above | Lava below, the northern lights above. |
| 8 | you | **The last rivet** — Dunn striking the last glowing rivet on the massive black-iron bridge, sparks flying; you holding the rivet tongs | Dunn drives the last rivet. |
| 9 | you | **Across** — the massive black-iron bridge spanning the chasm, runes glowing along it; Dunn and you walking across it toward the Ashlands | Across the Cinder Chasm lie the Ashlands. |
| 10 | you | **The smoke of Muspelheim** — Dunn and you at the far end of the bridge looking out over the ash-grey plains; far to the west, a black volcano smokes over the sea | And beyond them, the smoke of Muspelheim. |

### Vela's passes over the Ember Wall  (`vela`, 9 frames)

**Plays:** freeing Captain Vela (their tower) — then the crossing  
**The story:** You free Captain Vela from a cage at the top of a tower in the Ashlands, walk with them to the Ember Wall, help while they work out the problem and build, and see it finished — and the first people cross.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The cage** — a black tower in the ash-grey Ashlands: Captain Vela (exactly as in the character reference) in an iron cage, a brass compass in her hand; an ash-warden crumbling; you arriving through drifting ash | In a tower in the ash, the wardens had caged a sky captain. |
| 2 | you | **Free** — Vela out of the cage, settling her captain's coat, pointing her compass at the sky with a grin; you beside her | "You found me! The sky ports are yours to command." |
| 3 | you | **The Ember Wall** — Vela and you before the Ember Wall: a long ridge of glowing magma and fire cutting the land, lava cascading down it, the green Grasslands just visible beyond the smoke | The Ember Wall had burned for thirty-six years. |
| 4 | you | **The old ways** — Vela unrolling an old star chart on a rock, her compass glowing, tracing a route over the ridge; you leaning in | Vela knew the old ways over the ridge. |
| 5 | you | **The sky skiff** — a small wooden sky skiff with patched sails and glowing rune-lamps coming down out of the clouds to a rocky landing; Vela hailing it, you beside her | And she knew the winds. |
| 6 | you | **Over the fire** — night: Vela at the helm of the sky skiff with you, sailing over the burning Ember Wall, an aurora borealis and a shooting star above | They sailed over the fire under the northern lights. |
| 7 | you | **Rune-lanterns** — Vela and you dropping glowing rune-lanterns from the skiff onto the wall; where they land, the lava cools to black stone in a widening path, steam rising | Where her rune-lanterns fell, the fire cooled to stone. |
| 8 | you | **The pass** — a road of cooled black stone through the Ember Wall, steam rising, runes glowing along its edges; Vela and you walking it toward the green Grasslands | A pass through the Ember Wall. |
| 9 | you | **The sky port** — the village harbour's new sky port by the lake: the skiff moored at a tall mast with lanterns, Vela waving from the deck, you on the quay | The sky ports are yours to command — all Runeheim is open. |

## Wave 86 — the opening and the four realms' falls

### The opening — the Long Quiet, the storm and the twins  (`opening`, 12 frames)

**Plays:** a new game (replaces the six opening panels)  
**The story:** The dead of Runeheim once rose along the World Tree and new souls came down it. Then the road went quiet: no child was born in the last village for twenty winters, and the Binders came for the dead. On the night of a terrible storm lightning struck the runestones, and at dawn a basket drifted out of Mirror Lake with two babes whose eyes glowed rune-blue. The village raised them; the stones woke for them. Sixteen winters on, one twin goes out into Runeheim and the other stays.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The cycle of souls** — night over a village by a great lake: a vast World Tree of rune-blue light rising from the carved runestone on the village green up into the aurora; souls of light rising along it, small sparks drifting down into the village | Once, the dead rose along the World Tree — and new souls came down it into every cradle. |
| 2 | — | **The road goes quiet** — far above the clouds, a great golden gate swinging shut; the World Tree of light below it fading and going dark; the aurora dimming | Then the road went quiet. |
| 3 | — | **Empty cradles** — a candlelit village nursery with rows of empty wooden cradles; an old woman holding a folded birth-shawl, looking out of a window at a pale aurora | In the last village, the cradles stood empty — twenty winters, and not one child. |
| 4 | — | **The edge of the light** — dusk at the edge of the Grasslands: pale rune-blue spirits drifting at the edge of the fields; villagers at the timber palisade watching; in the mist, a dark Binder's chain glinting | The dead drifted at the edge of the light — and the Binders came for them. |
| 5 | — | **The storm** — the worst storm anyone remembered: lightning striking a tall runestone in the fields so its rune blazes neon rune-blue; more runestones lit across the dark plain under the rain | Then came the worst storm anyone remembered — and the lightning struck the runestones. |
| 6 | — | **The basket** — dawn after the storm: a beautiful carved floating basket glowing softly, drifting across calm Mirror Lake toward the village harbour; the last of the aurora and a shooting star in the pale sky | At dawn, a basket drifted out of Mirror Lake. |
| 7 | — | **Two babes** — on the village pier an old fisher lifting the blanket in the basket: two babes inside, their eyes glowing bright rune-blue; villagers gathering in astonishment | Inside lay two babes, their eyes glowing rune-blue. |
| 8 | both twins | **Raised by the village** — a warm sunny village green: the little twins toddling among goats, an old woman feeding them, an elder playing a lyre and singing to them | The village raised them on goat's milk and old songs. |
| 9 | both twins | **The stones wake** — dusk on the village green: the little twins laying small hands on the tall carved runestone; its runes waking with neon rune-blue light; Elder Runa (as in the reference) staring in wonder | They read runes no one else could — and the old stones woke for them. |
| 10 | both twins | **Sixteen winters on** — inside a glass-domed hall with rune-etched windows glowing blue: the twins — one practising with a sword, the other bent over an old rune tablet; warm light | Sixteen winters on, the twins were grown. |
| 11 | you + your twin | **The choice** — sunrise on the village green by the carved runestone: Elder Runa (as in the reference) holding out a pack and a sword; you taking them; your twin beside them holding an armful of old books | One would go out into Runeheim; the other would stay and keep the village. |
| 12 | you + your twin | **The send-off** — at the village gate at dawn, villagers waving; you walking out along the road toward the wild lands, looking back once; your twin at the gate waving, a book under one arm | And so one twin went out — and the other stayed. |

### The Long Quiet  (`quiet`, 7 frames)

**Plays:** the Grasslands' tenth freed spirit  
**The story:** Once the roads of the Grasslands ran to every realm. One by one the others fell and their walls rose, until only the Grasslands were left; no child was born, the dead drifted at the edge of the light, and lately the Binders came over the walls for them and bindstones began to hum in the fields.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The roads to every realm** — long ago: busy roads leaving the Grasslands toward every horizon, travellers and carts, banners, runestones glowing, a midsummer festival | Once, the roads of the Grasslands ran to every realm. |
| 2 | — | **The walls rise** — from a hill at dusk, three horizons: a wall of fire, broken mountains, a black river | One by one, the other realms fell — and the walls rose. |
| 3 | — | **The last village** — a lonely walled village by a lake, fields gone fallow, a timber palisade being raised | Only the Grasslands were left. |
| 4 | — | **No child** — an old couple sitting by an empty cradle in a quiet house, an aurora pale outside the window | And no child was born. |
| 5 | — | **The dead at the edge** — dusk: pale rune-blue spirits drifting at the edge of the fields, unable to rise | The dead drifted at the edge of the light… |
| 6 | — | **Over the walls** — night: dark hunched Binders with ember-glowing chains climbing over the palisade, dragging pale spirits away; villagers hiding with lanterns | …until the Binders came over the walls for them. |
| 7 | — | **The humming stones** — night: bindstones in the fields with chained spirits, their ember-red chains glowing under a pale aurora | And bindstones began to hum in the fields. |

### The Ash Night  (`ashnight`, 7 frames)

**Plays:** the Ashlands' first freed spirit  
**The story:** The Ashlands were orchards and honey. The night Asgard's gate shut, the sky turned red over Muspelheim; fire and ash fell, the Ember Wall rose in one night and the Cinder Chasm split the earth. By morning the Ashlands were grey, and their souls were bound to dig.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Orchards and honey** — long ago: the Ashlands as warm golden orchards and beehives, little stone villages, a honey cart on the road | Once the Ashlands were orchards and honey. |
| 2 | — | **The sky turns red** — night: over the western sea a black volcano erupting, the whole sky turning red above the orchards; villagers on rooftops staring | The night the gate shut, the sky turned red. |
| 3 | — | **Fire and ash** — fire and ash raining on the villages, people fleeing with lanterns and children | Fire and ash fell on the Ashlands. |
| 4 | — | **The Ember Wall** — a wall of magma bursting up along a ridge, cutting the land in two | The Ember Wall rose in one night. |
| 5 | — | **The Cinder Chasm** — the ground tearing open between the Ashlands and the mountains, lava glowing far below | And the Cinder Chasm split the earth. |
| 6 | — | **Grey morning** — a silent grey morning, ash over everything, the orchards burned | By morning, the Ashlands were grey. |
| 7 | — | **Bound to dig** — Binders leading long lines of chained pale spirits down into glowing mine mouths toward the smoking volcano | Their souls were bound — and made to dig. |

### The Stone-Fall  (`stonefall`, 7 frames)

**Plays:** the Highlands' first freed spirit  
**The story:** The Highlands lived by their mines. Three years after the Ash Night the stone began to sing; the miners were driven deeper toward the voice, the mountains broke and the Great Scar tore open. The miners dig still — for him.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The mines** — Highland mountain villages and mine mouths with lanterns, miners with picks, snowy peaks | The Highlands lived by the mines. |
| 2 | — | **A voice in the stone** — deep in a mine tunnel, miners listening to a glowing vein in the rock that pulses like a heartbeat | Then the stone began to sing. |
| 3 | — | **Deeper** — miners digging feverishly downward toward a glow far below, a foreman urging them on | "Deeper," said the voice. |
| 4 | — | **The mountain breaks** — the snowy peaks cracking apart, an avalanche of rock | So the mountain dug toward them. |
| 5 | — | **The Great Scar** — a vast cliff tearing open across the land, cutting the Highlands away | And the Great Scar tore open. |
| 6 | — | **Silence** — snow falling softly over a ruined mountain village | Three years after the Ash Night, the Highlands fell. |
| 7 | — | **They dig still** — chained pale spirits of miners swinging picks in a glowing cavern, a Binder watching | The miners dig still — for him. |

### The Black Tide  (`blacktide`, 7 frames)

**Plays:** the Wetlands' first freed spirit  
**The story:** The Wetlands were mills and boats on a bright river. Five years after the Stone-Fall the Silverrun ran black from the south; the mill wheels turned backwards, the marshes drank the villages and the river became a wall.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Mills and boats** — Wetland stilt villages and water mills on the bright Silverrun, little boats, herons | The Wetlands were mills and boats on the Silverrun. |
| 2 | — | **The river turns black** — black water creeping up the bright river from the south | Then the Silverrun ran black from the south. |
| 3 | — | **Backwards** — a mill wheel turning backwards, a miller staring at it | The mill wheels turned backwards. |
| 4 | — | **The marsh rises** — the marsh rising and swallowing houses and roads | The marshes drank the villages. |
| 5 | — | **A wall of water** — the river grown wide, wild and dark, bridges swept away | And the river became a wall. |
| 6 | — | **It came up through** — under the black water, ember-red chains pulling pale spirits down | "It came up through." |
| 7 | — | **Mist** — mist over drowned rooftops, a lone heron | Five years after the Stone-Fall, the Wetlands were gone. |

## Wave 87 — the glimpses, the Lodestar, Muspelheim, Asgard, Godsbane, the Bifröst

### A glimpse: the gate shut  (`gate`, 6 frames)

**Plays:** the twentieth spirit freed  
**The story:** Twenty spirits free — and for a moment the sky shows you something: a golden gate shut high above, and on Odin's high seat someone in a golden mask. No soul can rise, and none come down.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The sky parts** — night: you on a hill just after freeing a spirit, looking up as the aurora parts like a curtain | Twenty spirits free — and the sky showed you something. |
| 2 | — | **The gate** — far above the clouds, a vast golden gate shut fast, bound with chains of light | High above, a golden gate had shut. |
| 3 | — | **The mask** — a white-and-gold hall beyond the gate: on a high seat sits a still figure in a golden mask, its face hidden | On Odin's high seat sat someone in a golden mask. |
| 4 | — | **No soul rises** — pale souls rising toward the gate and turning back, drifting down again | No soul could rise… |
| 5 | — | **None come down** — small sparks of new life at the gate, unable to come down, fading | …and none came down. |
| 6 | you | **The sky closes** — you on the hill as the sky closes again, you's eyes glowing faintly rune-blue, resolute | Then the sky closed again. |

### A glimpse: two lights in the dark  (`orbs`, 6 frames)

**Plays:** the thirtieth spirit freed  
**The story:** Thirty spirits free — and the sky opens once more: two great lights float joined in a dark hall far above, sleeping figures inside, and something in a golden mask keeps watch. Far apart, both twins look up at the same moment.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **Once more** — night: you by a freed bindstone looking up as the aurora opens again | Thirty spirits free — and the sky opened once more. |
| 2 | — | **A dark hall** — a vast dark hall of white and gold far above, dust in shafts of pale light | In a dark hall far above… |
| 3 | — | **Two lights** — two great orbs of pale light floating joined like an infinity sign, breathing slowly | …two great lights floated side by side… |
| 4 | — | **Asleep** — inside the orbs, dim and asleep: Odin (the old one-eyed god: silver braided beard, wide grey hat, deep blue wolf-fur cloak, the spear Gungnir, a raven) and Freya (red-gold hair braided with flowers, falcon-feather cloak, glowing amber necklace) | …asleep. |
| 5 | — | **The watcher** — far across the hall, small on a high seat, a figure in a golden mask watching the orbs | And something in a golden mask kept watch. |
| 6 | you + your twin | **Both look up** — split view: on the left you on a hill under the aurora, on the right your twin at a window of a lamplit study full of books — both looking up at the same moment | Far apart, both twins looked up at the same moment. |

### The Lodestar is made  (`lodestar`, 9 frames)

**Plays:** Surtharn falls — the great hearth  
**The story:** Surtharn's last ember goes out. Behind his throne is the great hearth. You lay the staff on the anvil and set the four Heartglasses round it; they rise, pour their light into the staff, and a white star wakes at its crown. You lift the Lodestar — and Muspelheim begins to fall.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The last ember** — the throne cavern of Muspelheim: a giant's fallen molten body cooling to black stone, its last ember fading; you standing, breathing hard | Surtharn's last ember went out. |
| 2 | you | **The great hearth** — behind the fallen throne, a vast forge cavern opening: a huge anvil lit from below by lava, chained spirits watching from the walls; you walking toward it | Behind his throne lay the great hearth. |
| 3 | you | **The staff on the anvil** — you laying a plain silver-and-gold staff on the great anvil | You laid the staff on the anvil… |
| 4 | you | **Four Heartglasses** — you setting four glowing glasses in a ring round the anvil — green, blue, amber and red | …and set the four Heartglasses round it. |
| 5 | you | **They rise** — the four Heartglasses lifting into the air and circling the staff, you stepping back in awe | The glasses rose. |
| 6 | — | **Their light** — streams of green, blue, amber and red light pouring from the four glasses into the staff on the anvil | And poured their light into the staff. |
| 7 | — | **The star wakes** — a blinding white star igniting in the ring at the staff's crown, light blasting across the cavern | A white star woke at its crown. |
| 8 | you | **The Lodestar** — you lifting the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) overhead; light filling the cavern; the chained spirits on the walls looking up as their chains begin to glow | The Lodestar. |
| 9 | you | **Muspelheim shakes** — the cavern trembling, rocks falling, lava surging; you turning to run with the Lodestar | And Muspelheim began to fall. |

### Muspelheim falls  (`escape`, 7 frames)

**Plays:** after the Lodestar is made — the escape  
**The story:** You run up through the collapsing mountain with the spirits behind you, every chain breaking as the Lodestar passes, out along the causeway as it sinks, to the shore — and watch Muspelheim fall into the sea. Then the sky clears.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **Run** — you running up a collapsing lava tunnel holding the glowing Lodestar, freed spirits flying behind like a comet's tail | You ran. |
| 2 | you | **Every chain** — a cavern wall of chained spirits; as you runs past with the Lodestar, every chain bursts and the spirits pour free | Every chain you passed, broke. |
| 3 | you | **The causeway** — night: you bursting out onto a long walled causeway over the sea, the volcano erupting behind | Out onto the causeway. |
| 4 | you | **Sinking behind you** — the causeway crumbling into the sea stone by stone just behind you's running feet | It sank behind you, stone by stone. |
| 5 | you | **The shore** — you on the mainland rocks turning to look back, spirits gathered around | From the shore, you watched. |
| 6 | — | **Into the sea** — the great black volcano island breaking apart and sinking into a boiling sea in a ring of steam | Muspelheim fell into the sea. |
| 7 | you | **The sky clears** — the steam clearing over calm sea; an aurora borealis and shooting stars returning to the night sky; you small on the rocks | And the sky cleared. |

### Asgard comes down  (`asgard`, 6 frames)

**Plays:** after Muspelheim — Asgard on the lake  
**The story:** With the fire broken the sky opens over Mirror Lake. A white-and-gold city appears in a ring of golden light and comes slowly down to rest on the lake, its gate facing the village pier. Your staff fits the notch at the pier's end — but it does not wake.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The sky opens** — night over Mirror Lake and the village on its shore: the clouds parting in a great ring of golden light | With the fire broken, the sky began to open. |
| 2 | — | **A city in the sky** — within the ring, the underside of a white-and-gold city of spires appearing | Asgard. |
| 3 | — | **Coming down** — the city lowering slowly on beams of light; villagers crowding the pier | It came down slowly, as if it were tired. |
| 4 | — | **On the lake** — the city touching the lake; a wave of golden light rolling across the water | And came to rest on Mirror Lake. |
| 5 | you | **The gate and the pier** — dawn: Asgard as a walled island of white and gold, its gate facing the village pier; you at the pier's end holding the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) | Its gate faced the village pier. |
| 6 | you | **The notch** — you kneeling at a carved notch at the very end of the pier, the Lodestar set in it but dark; you puzzled | The staff fit the notch — but it did not wake. |

### Your twin finds the word  (`twinteach`, 7 frames)

**Plays:** the Lodestar in hand — [Tab] by your twin  
**The story:** You run home with the Lodestar. Your twin is where they always are — at the books — and pulls down the oldest saga, the one nobody could read. On its last page is one rune. You read it together, eyes glowing, and the word wakes: GODSBANE. "When you reach the gods, I'll be there."

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **Home** — dusk: you running up the village lane with the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) toward a lamplit house | You ran home with the Lodestar. |
| 2 | you + your twin | **At the books** — a lamplit study crammed with books and scrolls: your twin at the desk looking up as you comes in | Your twin was where they always were — at the books. |
| 3 | you + your twin | **The oldest saga** — your twin pulling a huge, ancient, rune-bound book from a high shelf, eyes wide at the Lodestar; you holding the staff | "The oldest saga — the one nobody could read." |
| 4 | you + your twin | **One rune** — the old book open on the desk: on its last page a single rune that glows the same white as the Lodestar's star; both twins leaning in | On its last page, a single rune. |
| 5 | you + your twin | **Together** — close: the faces of you and your twin side by side over the page, both their eyes glowing rune-blue | You read it together. |
| 6 | you + your twin | **GODSBANE** — the rune lifting off the page as light and flying to the Lodestar's star, which flares; you and your twin lit by it | GODSBANE. |
| 7 | you + your twin | **"I'll be there"** — at the study door: your twin pulling on a cloak, hand on you's shoulder, both looking out toward the lake where Asgard glows | "When you reach the gods, I'll be there." |

### The Bifröst rises  (`bifrost`, 7 frames)

**Plays:** the pier's notch, with the word  
**The story:** At the end of the pier you speak the word and set the staff. On the Green the spirits gather along the lines; the star blazes and a bridge of light runs out across the lake to Asgard's gate, and the spirits bless the road.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The notch waits** — night: you at the end of the pier holding the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) over the carved notch; Asgard glowing across the lake; aurora above | At the end of the pier, the notch waited. |
| 2 | you | **The word** — you setting the staff into the notch, eyes glowing rune-blue, lips speaking | You spoke the word, and set the staff. |
| 3 | — | **Along the lines** — the village green at night: freed spirits lining up along glowing soul-lines that run toward the pier | On the Green, the spirits gathered along the lines. |
| 4 | you | **The star blazes** — the Lodestar's star blazing white in the notch, a beam shooting across the lake; you shielding you's eyes | The star blazed. |
| 5 | — | **A bridge of light** — a bridge of rainbow light building outward across the dark lake toward Asgard's golden gate | And a bridge of light ran out across the lake. |
| 6 | — | **Blessed** — spirits floating along both sides of the rainbow bridge like lanterns | The spirits blessed the road. |
| 7 | you | **To Asgard** — you stepping onto the Bifröst toward the golden gate, the Lodestar in hand | The Bifröst — to Asgard's gate. |

## Wave 88 — Surtharn's and Solmyrk's forms

### Surtharn rises  (`surt1`, 6 frames)

**Plays:** Surtharn's throne — his first form  
**The story:** In the deepest cavern of Muspelheim the chained spirits dig. The black throne cracks, lava pours up, and Surtharn, the Molten Colossus, rises with his burning greatsword.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The deep halls** — the throne cavern of Muspelheim: rivers of lava, chained pale spirits digging at the walls | In the deepest hall of Muspelheim, the spirits dug. |
| 2 | — | **The throne cracks** — a black basalt throne splitting down the middle, light pouring out | The throne of Muspelheim split open. |
| 3 | — | **Lava rises** — lava welling up through the cracked throne | Fire rose from below. |
| 4 | — | **A hand of fire** — a giant hand of molten rock gripping the edge of the throne | A hand of fire took hold. |
| 5 | — | **The Molten Colossus** — Surtharn the fire giant (as in the reference) rising as the Molten Colossus, a burning greatsword in his fist, roaring | Surtharn, the Molten Colossus! |
| 6 | you | **Facing him** — you small in the foreground raising a sword against the towering fire giant | "Every gem of Runeheim is mine by right!" |

### The Forge-king  (`surt2`, 6 frames)

**Plays:** Surtharn's second form  
**The story:** The Colossus drives his greatsword into the floor; it melts and climbs his arms as armour and reforges into a hammer and an anvil-crown — the Forge-king.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Staggered** — Surtharn the fire giant (as in the reference) as the Molten Colossus staggering, his greatsword glowing white-hot | He staggered… |
| 2 | — | **The sword in the floor** — he drives the burning greatsword deep into the cavern floor | …and drove his sword into the floor. |
| 3 | — | **Melting** — the greatsword melting into a pool of molten iron around his feet | The sword melted. |
| 4 | — | **Armour** — the molten iron climbing his arms and hardening into armour plates | The iron climbed him. |
| 5 | — | **Hammer and crown** — the iron reforging into a giant hammer in his hands and an anvil-shaped crown on his head | The Forge-king! |
| 6 | you | **The shockwave** — the Forge-king striking the floor; a ring of fire rolling out; you bracing behind a shield | His hammer rang the cavern. |

### The Ash Tyrant  (`surt3`, 6 frames)

**Plays:** Surtharn's third form  
**The story:** The Forge-king cracks and bursts into a storm of ash; out of it strides the Ash Tyrant, chains of spirit-light trailing from his hands to the bound spirits.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Cracks** — the Forge-king's armour cracking, light spilling from the cracks | The Forge-king cracked… |
| 2 | — | **A storm of ash** — he bursts into a whirling storm of ash and embers | …and burst into ash. |
| 3 | — | **The spirits pulled in** — pale spirits pulled into the ash storm by ember-red chains | The ash took the spirits with it. |
| 4 | — | **The Ash Tyrant** — out of the storm strides the Ash Tyrant, a giant of ash with chains of pale spirit-light trailing from his hands | The Ash Tyrant! |
| 5 | — | **A shield of souls** — the Ash Tyrant holding chained spirits before him like a shield | He hid behind the souls he had chained. |
| 6 | you | **Through the ash** — you pushing forward through the ash storm, eyes glowing rune-blue | You pushed on through the ash. |

### The Horned Jötunn  (`surt4`, 6 frames)

**Plays:** Surtharn's fourth form  
**The story:** The ash swirls up and the giant grows huge; horns burst from his brow and he draws the Sword of Flame.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Rising ash** — the ash swirling upward into a towering column | The ash rose… |
| 2 | — | **Huge** — the giant growing huge, his head cracking the cavern roof | …and he grew. |
| 3 | — | **Horns** — great curling horns bursting from his brow | Horns tore from his brow. |
| 4 | — | **Into the fire** — he plunges his hand into a river of lava | He reached into the fire… |
| 5 | — | **The Sword of Flame** — the Horned Jötunn lifting the blazing Sword of Flame | …and drew the Sword of Flame! |
| 6 | you | **Tiny** — you tiny at his feet, looking up | The Horned Jötunn. |

### The Obsidian Warlord  (`surt5`, 6 frames)

**Plays:** Surtharn's fifth form  
**The story:** The Jötunn falls into the lava; the lava boils, and he climbs out in black obsidian armour with his molten heart glowing behind glass.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The fall** — the Horned Jötunn toppling backward into a lake of lava | He fell into the fire. |
| 2 | — | **Boiling** — the lava lake boiling and churning | The lava boiled. |
| 3 | — | **A black hand** — a hand of black glass rising out of the lava | Something black rose from it. |
| 4 | — | **Obsidian** — he climbs out in gleaming black obsidian armour | He climbed out in black glass. |
| 5 | — | **The molten heart** — close: his molten heart glowing behind a plate of glass in his chest | His molten heart burned behind the glass. |
| 6 | you | **The Obsidian Warlord** — you facing the Obsidian Warlord across the cavern | The Obsidian Warlord! |

### The Living Volcano  (`surt6`, 6 frames)

**Plays:** Surtharn's last form  
**The story:** The obsidian shatters and Surtharn swells into a living volcano; the whole cavern erupts.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **Shattered** — the obsidian armour shattering into black shards | The obsidian shattered. |
| 2 | — | **Swelling** — Surtharn swelling, rock and fire pouring together | He swelled… |
| 3 | — | **Lava from his crown** — lava pouring from his shoulders and crown | …lava poured from his crown… |
| 4 | — | **The cavern erupts** — the whole cavern erupting with fire | …and the cavern erupted. |
| 5 | — | **The volcano itself** — Surtharn has become a living volcano filling the cavern | The last ember — Surtharn becomes the volcano itself! |
| 6 | you | **Amid the fire** — you amid falling rock and fire, raising a weapon | Now — or never. |

### Solmyrk, the Black Sun  (`sol1`, 6 frames)

**Plays:** the citadel's throne hall — his first form  
**The story:** In the white-and-gold throne hall the figure in the golden mask stirs on Odin's high seat, rises, and unfolds wings of light: Solmyrk, the Black Sun.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The throne hall** — the vast white-and-gold throne hall of the citadel of Asgard, columns and tall windows | The throne hall of Asgard. |
| 2 | — | **The high seat** — on the high seat at the end of the hall, a still figure in a golden mask | On Odin's high seat, the masked one waited. |
| 3 | — | **He rises** — the masked figure rising from the high seat | He rose. |
| 4 | — | **Wings of light** — great wings of golden light unfolding from his back | Wings of light unfolded. |
| 5 | — | **Gungnir** — the masked god in gold and white raising a shining spear, a crown of spikes above the golden mask | A god of gold — Solmyrk, the Black Sun. |
| 6 | you | **Before him** — you with the Lodestar standing before the golden figure | You raised the Lodestar. |

### The Cracked Mask  (`sol2`, 6 frames)

**Plays:** Solmyrk's second form  
**The story:** The golden mask cracks; black light pours out of the crack; his wings tear to darkness — behind the Allfather's face something else is looking out.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The blow** — a beam of white light striking the golden mask | The light struck the mask… |
| 2 | — | **A crack** — a crack running down the middle of the golden mask | …and it cracked. |
| 3 | — | **Black light** — black light pouring out of the crack | Black light poured out. |
| 4 | — | **Torn wings** — half his wings tearing into darkness | His wings tore into darkness. |
| 5 | — | **Half and half** — the Cracked Mask: one half radiant god, the other a black void | Behind the Allfather's face, something else is looking out. |
| 6 | you | **Bracing** — you bracing against a wind of black and gold light | You held your ground. |

### The Storm That Ends the World  (`sol3`, 6 frames)

**Plays:** Solmyrk's last form  
**The story:** The mask shatters; all the light of Asgard drains into him; he swells into a storm of thunderheads before an eclipsed sun — the dark that was always underneath.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The mask shatters** — the golden mask shattering into pieces | The mask shattered. |
| 2 | — | **The light drains** — rivers of golden light flowing across the hall into him | All the light of Asgard drained into him… |
| 3 | — | **Storm** — he swells into a towering storm cloud | …and he swelled into storm. |
| 4 | — | **Eclipse** — an eclipsed sun behind him, a white corona | The sun went dark behind him. |
| 5 | — | **The Storm That Ends the World** — a colossal storm figure with wings of cloud and white lightning and a pale one-eyed mask | The Storm That Ends the World! |
| 6 | you | **The Lodestar raised** — you tiny below the storm, raising the glowing Lodestar | And what was left was the dark that had always been underneath. |

## Wave 89 — the feast hall to the World Tree

### The feast hall — the gods freed  (`feasthall`, 12 frames)

**Plays:** Solmyrk falls (through to the gods freed)  
**The story:** Solmyrk's mask lies in pieces and the citadel shakes. Golden doors open behind the high seat onto the dusty feast hall of the gods, where two orbs float joined like an infinity sign. Your twin comes running; together you cast Godsbane into the centre, the orbs crack and burst into a million shards — and Odin and Freya stand free as the hall wakes.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The mask in pieces** — the white-and-gold throne hall: a broken golden mask in pieces on the floor, darkness dissolving into smoke; you standing over it | Solmyrk fell, and his mask lay in pieces. |
| 2 | you | **The citadel shakes** — the hall shaking, dust falling from the columns; behind the high seat a crack of golden light; you turning | The citadel shook. |
| 3 | you | **Golden doors** — tall golden doors behind the high seat swinging open, warm light spilling out; you silhouetted before them | Behind the high seat, golden doors swung open. |
| 4 | you | **The feast hall** — you stepping into a vast dusty feast hall: long tables, cobwebs, banners, two empty high seats | The feast hall of the gods. |
| 5 | you | **The orbs** — two great orbs of light floating joined like an infinity sign above the hall, faint shapes inside; the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) trembling in you's hand | Two great orbs, joined like an infinity sign — and voices inside. |
| 6 | you + your twin | **Your twin comes** — your twin running in through the golden doors to you's side | And your twin came running to your side. |
| 7 | both twins | **Together** — the twins, seen from behind, both raising their hands and the Lodestar toward the orbs, eyes glowing rune-blue | Together, you spoke the word. |
| 8 | both twins | **Into the centre** — one beam of white-gold light rising from the twins into the place where the two orbs meet | Godsbane — into the centre, where the two lights meet. |
| 9 | — | **Cracks** — cracks of light spreading across the two orbs | The orbs cracked… |
| 10 | — | **A million shards** — the orbs bursting into a million glittering shards of light filling the hall | …and burst into a million shards of light. |
| 11 | both twins | **Free** — in the falling light stand Odin (the old one-eyed god: silver braided beard, wide grey hat, deep blue wolf-fur cloak, the spear Gungnir, a raven) and Freya (red-gold hair braided with flowers, falcon-feather cloak, glowing amber necklace); the twins small before them | Odin and Freya — free. |
| 12 | — | **The hall wakes** — the feast hall alive again: dust gone, banners bright, candles lighting themselves along the tables, golden light | And the feast hall woke. |

### The truth about the twins  (`truth`, 7 frames)

**Plays:** after the gods are freed — they talk  
**The story:** Odin and Freya thank the twins and tell them the truth: on the night the false one took them they had one breath of light left, and spent it on two sparks sent down in the storm. The lightning woke the runestones so the stones would wake for them. The twins are the gods' last gift to Runeheim.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | both twins | **You came** — Odin kneeling to the twins' level in the bright feast hall, a big kind hand held out; the twins before him | "You came. Thirty-six winters we slept in our own light — and still you came." |
| 2 | both twins | **Why the stones light** — Freya touching the twins' cheeks, her amber necklace glowing; the twins with their eyes glowing rune-blue | "Do you know why the runestones light for you?" |
| 3 | — | **One breath of light** — a memory, painted softer: Odin and Freya as the orbs close around them, cupping two tiny sparks of light between their hands | "The night the false one took us, we had one breath of light left…" |
| 4 | — | **Down in the storm** — a memory: two tiny sparks falling through storm clouds, lightning striking runestones far below | "We sent you down in the storm." |
| 5 | — | **The basket of light** — a memory: the sparks settling into a glowing basket on Mirror Lake at dawn | "The lightning woke the runestones, so that one day they would wake for you." |
| 6 | both twins | **The last gift** — the twins looking at each other in wonder, their eyes glowing, the gods smiling behind them | "You are our last gift to Runeheim." |
| 7 | both twins | **Bring the Lodestar** — Freya pointing out through the hall's open doors toward the heart of the city; Odin raising Gungnir; the twins turning to go | "Come. The spirits have waited long enough." |

### The spirits go home  (`home`, 10 frames)

**Plays:** the rune circle at Asgard's heart  
**The story:** At the heart of Asgard the twins set the Lodestar and cast Godsbane into the sky. The Bifröst rises into heaven; from every realm the spirits come; Odin and Freya lead them home — the brave to Valhalla, the rest to Fólkvangr — and the familiars and fairy monarchs go with them. "Go to your village. We will follow."

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | both twins | **The rune circle** — a great rune circle at the heart of the white-and-gold city; Odin (the old one-eyed god: silver braided beard, wide grey hat, deep blue wolf-fur cloak, the spear Gungnir, a raven) and Freya (red-gold hair braided with flowers, falcon-feather cloak, glowing amber necklace) and the twins arriving | At the heart of Asgard, the rune circle. |
| 2 | both twins | **The Lodestar set** — the twins together setting the Lodestar (a tall staff of silver and gold crowned by a ring of four gems — green, blue, amber, red — around a blazing white star) upright in the centre of the circle, the runes waking | The Lodestar, set at the heart. |
| 3 | — | **Into the sky** — a pillar of white-gold light shooting from the circle up into the night clouds, an aurora flaring around it | Godsbane — into the sky. |
| 4 | — | **The Bifröst rises** — a spiralling rainbow bridge rising from the city up through the clouds into heaven | The Bifröst rose into heaven. |
| 5 | — | **From every realm** — seen from high above: from every corner of the land, pale spirits rising along glowing soul-lines toward the city | From every realm, the spirits came. |
| 6 | — | **They lead them home** — Odin and Freya walking up the rainbow bridge ahead of a long procession of glowing spirits | Odin and Freya led them home. |
| 7 | — | **Valhalla and Fólkvangr** — high in the clouds the bridge parting: one way to golden halls of warriors, the other to flowering fields in the sky | Valhalla for the brave, Fólkvangr for the rest. |
| 8 | — | **Into legend** — small elemental familiars (fire, water, nature, earth) and three angelic fairy monarchs rising with the spirits | The familiars and the fairy monarchs went with them — into legend. |
| 9 | — | **Farewell** — Freya looking back from the bridge and waving, Odin raising Gungnir | "Go to your village. We will follow." |
| 10 | both twins | **The sky closes** — the twins alone in the rune circle as the bridge fades into a soft aurora and a shooting star | And the sky closed softly behind them. |

### Lightning and vines — Runeheim changed  (`village`, 12 frames)

**Plays:** back at the village after the Bifröst  
**The story:** On the Green, Odin calls "Runeheim! Look up," and blue lightning wakes every runestone at once. Freya kneels — "And now… the spring" — and green vines run out along the soul-lines. The lines become roads of grass and stone; the monsters fade; the forges and Asgard sink; people walk out on the new roads and hamlets rise. Over a green Runeheim, the northern lights.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | both twins | **Home** — dusk on the village green by the carved runestone: the twins among the villagers, the spirits gone, everyone looking up | You came home. |
| 2 | — | **Look up** — Odin in the clouds above the village raising Gungnir, lightning gathering | "Runeheim! Look up." |
| 3 | — | **Every stone at once** — seen from high above: blue-white lightning striking the village runestone, and every runestone across the whole land lighting at once | Every runestone woke at once. |
| 4 | — | **The spring** — Freya kneeling on the village green, both hands on the earth, flowers bursting up around her | "And now… the spring." |
| 5 | — | **The vines run** — green vines with white flowers racing out from the green along the glowing soul-lines in every direction | The spring ran out along the soul-lines. |
| 6 | — | **Roads of grass** — from high above: the lines of light across the land turning into roads of grass and stone, like a tree drawn on the world | The lines of light became roads. |
| 7 | — | **The monsters fade** — monsters across the land fading into drifting motes of light | The monsters faded into light. |
| 8 | — | **The forges sink** — the four forge-towers at sea sinking into the waves in steam | The forges sank into the sea. |
| 9 | — | **Asgard settles** — the white-and-gold city sinking into Mirror Lake until only its golden spires stand above the water | Asgard settled into the lake. |
| 10 | — | **Out on the new roads** — villagers with carts and children walking out along the new grassy roads | People walked out on the new roads. |
| 11 | — | **Hamlets** — small hamlets with houses and gardens rising round runestones across the land | And homes rose in every realm. |
| 12 | — | **A green Runeheim** — night over a green Runeheim, an aurora borealis and shooting stars over the lake and the spires | Runeheim was green again. |

### The celebration — children again  (`celebrate`, 8 frames)

**Plays:** after the land turns green  
**The story:** The village celebrates the twins on the Green under lanterns and the aurora. Time passes; the first newborn cries; Pip and Wren play with the twins; children play at being twins in every hamlet.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | both twins | **The feast** — long tables on the village green under lanterns, villagers raising cups to the twins at the head of the table | The village celebrated the twins. |
| 2 | both twins | **Dancing** — dancing round the carved runestone, Elder Runa with the twins, music, an aurora above | They danced till the stars came out. |
| 3 | — | **Seasons** — the village green through the seasons in one picture: blossom, summer, autumn leaves, snow | Time passed. |
| 4 | — | **The first cry** — a mother holding a newborn in a cosy room, the father laughing, the elder in the doorway in tears | And a child was born. |
| 5 | both twins | **Pip and Wren** — two young village children (as in the references) running to the twins on the green | Pip and Wren, among the first. |
| 6 | — | **Playing twins** — children in a hamlet playing at being the twins with wooden swords and a stick for a staff | "We play twins. I always have to be Zeldor…" |
| 7 | — | **Cradles** — a midwife's workshop with full cradles and smiling families | Every hamlet had its own. |
| 8 | both twins | **From the hill** — the twins sitting on a hill watching children play in the hamlets below at sunset | And children were born again in Runeheim. |

### The credits — and after  (`credits`, 4 frames)

**Plays:** after the celebration  
**The story:** The credits roll over the night lake under forty stars; the twins on a hill over a green Runeheim; then the road goes on.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | — | **The night lake** — Mirror Lake at night reflecting an aurora, forty bright stars above, golden spires in the water | (the credits) |
| 2 | both twins | **Forty stars** — the twins on the pier looking up at the forty stars | Forty spirits, home. |
| 3 | both twins | **The hill** — the twins on a grassy hill at sunrise over a green Runeheim of roads and hamlets | Runeheim is green again. |
| 4 | both twins | **The road on** — the twins walking away together down a grassy road toward the horizon | Your journey goes on. |

### The World Tree under the lake  (`worldtree`, 8 frames)

**Plays:** all forty spirits free, after the end  
**The story:** After the end, the last spirit is freed. Its line races to join the others, and all forty draw one great World Tree across Runeheim. The tree's light flows into Mirror Lake and shines under the water like a tattoo — and stays.

| # | Who | The picture | The line |
|---|---|---|---|
| 1 | you | **The fortieth** — you by a bindstone in a green land as the last spirit rises free | The fortieth spirit, free. |
| 2 | — | **The last line** — its line of light racing across the land to join the others | Its line ran to meet the others. |
| 3 | — | **One tree** — from high above: all the lines of light across Runeheim joining into one great World Tree | Forty lines — one tree. |
| 4 | — | **Into the lake** — the tree's light flowing down into Mirror Lake | Its light flowed into the lake… |
| 5 | — | **Under the water** — Mirror Lake from above at twilight, a vast World Tree of rune-blue and gold light glowing deep under its water | …and shone under the water like a tattoo. |
| 6 | both twins | **On the pier** — the twins on the village pier at night looking down at the glowing tree under the water, an aurora above | Where the twins were found, the World Tree shines. |
| 7 | — | **Boats over light** — small boats with lanterns drifting over the glowing tree | And it stayed. |
| 8 | — | **Whole** — a wide view of the lake, the spires and the glowing tree, shooting stars | Whole at last. |
