# 69 — The seasons, end to end, with the cost (round 114e)

Kris: *"i want a full analysis and cost analysis before making this major change … Create 3 different levels … limited, balanced, and holistic … numbers of new sheets and estimated API costs for each option."* Pick a level in the Lab tab **Seasons: the cost**.

Prices are averages measured from 4,168 paintings (`sprites/incoming/_log.jsonl`, medium quality, list token prices): a scenery sheet $0.048, a character sheet $0.038, a story frame or backdrop $0.078, a shot $0.069. Redos +25 %.

## The order of the year

| When | Season | How it looks |
|---|---|---|
| Before the game (the Long Quiet) | A long, mild, grey winter | Frost on the grass, bare trees (the evergreens stay green), low sun, breath in the air. At most a dusting on roofs and fence-tops. Lakes open, roads clear. The opening — your intro video — should show this. |
| The game begins | A mild spring (the Grasslands) | Cool and fresh: buds and first blossom, new grass through the old, birds back. The first walk is the first spring morning in thirty-six years. |
| Bram's bridge opens the Wetlands | Summer | Deep green, long light, warm nights, fireflies over the marsh. Closest to the world as it is painted today. |
| Mira's lift opens the Highlands | Autumn | Gold and red trees, falling leaves, the harvest in, morning mist. |
| Dunn's bridge opens the Ashlands | Winter (mild again) | Frost and bare branches, grey-blue skies, a thin flurry now and then; ash and frost together in the west. Never drifts. |
| Freya is free | The real spring | Full bloom along the soul-lines, lambs and bees, the first cradles. (After the end: it stays spring — or, in the holistic level, the year keeps turning.) |

**Winter, kept mild:**

- Frost, not snow: pale, rimed grass; no snowdrifts; roads and paths stay clear.
- Bare deciduous trees; pines and spruces stay green, a little frost on their tips.
- Roofs: a light frosting on the high edges only.
- Lakes and the sea stay open; a thin rim of frost on the shore.
- Breath clouds over the hero and the villagers; low, warm sun; long blue shadows.
- A thin flurry now and then (a few flakes, never a blizzard).

## The three levels

| Level | New pictures | Scenery | Characters | Frames & backdrops | Shots | Cost (with redos) | With two takes each | Work | Hosting |
|---|---|---|---|---|---|---|---|---|---|
| Limited — colour and weather | 31 | 16 | 0 | 15 | 0 | $2.42 | $4.85 | 1–2 rounds | +13 MB |
| Balanced — a changing world | 407 | 49 | 22 | 156 | 180 | $34.72 | $69.44 | 4–6 rounds | +200 MB |
| Holistic — every corner | 661 | 124 | 152 | 205 | 180 | $50.17 | $100.34 | 10–14 rounds | +360 MB |

### Limited — colour and weather

The season shows in the land's colour, the light, the weather and the trees; a short beat in five existing cut-scenes tells the turn.

- Trees: autumn and winter versions (4 sheets × 2): **8** scenery sheets
- Bushes and flowers: autumn and winter (3 × 2): **6** scenery sheets
- Seasonal particles (petals, fireflies, leaves, frost, breath): **1** scenery sheets
- Season marks for the HUD, seasonal food icons: **1** scenery sheets
- Season beats added to five existing moments (2 frames × 5, both twins where the hero shows): **15** story frames & backdrops

- **Music & ambience:** None.
- **Words:** 170 seasonal lines (no API cost).
- **Code:** Colour grading of the ground and small pieces, light and sky tints, particles, map colours, the season worked out from progress, a world repaint on the turn, the HUD mark, the lesson.
- **The waiting shots:** All 1,434 waiting shots can run now (no frames are repainted).
- **How it feels:** You notice the turn — green to gold to bare — but the buildings, the village and the cut-scenes look the same as today.

### Balanced — a changing world

The overworld and the village are painted for each season, the festivals are dressed, the turn has its own cut-scenes, and the cut-scenes set outdoors match their season.

- Seasonal grounds (10 grounds × spring, autumn, winter = 30 tiles): **5** scenery sheets
- Trees: spring, autumn, winter (4 × 3): **12** scenery sheets
- Bushes and flowers: spring, autumn, winter (3 × 3): **9** scenery sheets
- Edge pieces (tufts, reeds, flowers): autumn and winter (6 × 2): **12** scenery sheets
- Village seasonal dressing (one sheet a season): **4** scenery sheets
- Festival set-dressing on the Green (spring feast, midsummer, harvest, Yule): **4** scenery sheets
- Particles (2), season marks and seasonal food (1): **3** scenery sheets
- Five season cut-scenes (6 frames each, both twins where the hero shows): **45** story frames & backdrops
- The eight outdoor cut-scenes repainted in their season (74 frames, both twins): **111** story frames & backdrops
- Shot series for the five new cut-scenes (30 frames × 6 to choose from): **180** shots (cut-scene series)
- Winter clothes for the 11 outdoor villagers (2 sheets each): **22** character sheets

- **Music & ambience:** Suno: 8 village tracks + 5 stings (one Pro month, about $10). ElevenLabs: 16 ambience loops, about 26,000 credits (inside a $22 Creator month).
- **Words:** About 510 seasonal lines and the festival talk.
- **Code:** Everything in limited, plus seasonal pictures in the world painter (loaded per season), the village dressing, outfits that swap, the five cut-scenes in the story queue, music and ambience by season, seasonal food, the Tome page.
- **The waiting shots:** Run the 1,014 shots that show no season now; hold the 420 for the eight outdoor cut-scenes until their frames are repainted (they are already in the plan — no extra cost).
- **How it feels:** The world, the village and the story agree with each other at every season; the festivals feel like events.

### Holistic — every corner

Balanced, plus every outdoor building and prop, the site backdrops, the islands, interiors, two outfits for the outdoor villagers, the title screen, weather events, seasonal forage, music for each realm in each season, and the year still turning after the end.

- Everything in balanced: scenery: **49** scenery sheets
- Village buildings repainted: autumn and winter (14 × 2): **28** scenery sheets
- Village props, camps (4 + 4 sheets × 2): **16** scenery sheets
- Rocks, bridges, waystones, site entrances: winter (5 + 3 + 2 + 9): **19** scenery sheets
- Frost-ash grounds, the four islands, interior decorations, weather, forage: **12** scenery sheets
- Everything in balanced: frames: **156** story frames & backdrops
- Site backdrops in three seasons (15 × 3): **45** story frames & backdrops
- Title screen and home page per season: **4** story frames & backdrops
- Everything in balanced: shots: **180** shots (cut-scene series)
- Outdoor villagers: autumn and winter clothes (11 × 2 × 2): **44** character sheets
- Optional: a winter mantle for both twins (2 × 54 sheets): **108** character sheets

- **Music & ambience:** Suno: 29 tracks (two months is safer, about $20). ElevenLabs: 24 loops, about 38,000 credits (one Creator month).
- **Words:** About 850 lines with festival and weather talk.
- **Code:** Everything in balanced, plus weather events, forage, the seasons cycling after the end, seasonal title screens, interiors.
- **The waiting shots:** As balanced.
- **How it feels:** Nothing in the overworld or the village looks out of season. The heaviest to make, review and maintain.
- Without the twins' winter mantle: 108 fewer sheets (553 in all), about $5 less ($45), and far less risk.

## Recommendation

My recommendation: Balanced. It delivers what you asked for — buildings, scenery and cut-scenes that show the season, and cut-scenes that tell the turn — for about $35 in pictures (with redos) and a $10 + $22 month of music and ambience. Limited is cheap but leaves the village and the story looking like summer all year. Holistic adds about $15 more in pictures but more than doubles the work and your review (661 pictures, 553 without the twins' mantle), mostly for things seen briefly (site entrances, backdrops, rocks); its riskiest part, the twins' winter mantle, I would leave out in any case.

## The shots waiting now

Either way: of the 1,434 shots waiting, 1,014 show no season (the past, the sky, under the mountain, indoors, after the end) and can run now — r114_now. The other 420 (the first spirit, Bram, Mira, Dunn, Vela, Asgard coming down, the Bifröst, home) are in r114_after_seasons: run them now for limited, or after their frames are repainted for balanced or holistic. For scale, the 1,434 shots are about $99 on their own.

## The woven saga's own art (any level, even without seasons) — 16 pictures, $1.26

- Festival games: hnefatafl board, forge-off anvil, flyting cards, the monarchs' feast table: 4 scenery sheets
- The Red Gold: coins, Zahir's strongbox and book; the saga book's pages: 2 scenery sheets
- The Mending (tempered): the mended well and doorframe, the bench, boats and stalls: 2 scenery sheets
- One painted moment per chapter (Rolf's second cup, Benno's loaf, Mira's tiny lift, Corr leaving the gate, the twentieth shawl): 8 story frames & backdrops

## Everything a season touches

| Where | What changes | Limited | Balanced | Holistic |
|---|---|---|---|---|
| The ground | Grass, meadow, moss, heath, marsh, soil and mud take the season's colour. | colour-graded in code | painted seasonal grounds (10 grounds × 3 seasons) | painted, plus frost-ash grounds in the west |
| Trees and bushes | Blossom, deep green, gold and red, bare. | trees and bushes for autumn and winter | trees, bushes and flowers for spring, autumn and winter | as balanced |
| Small ground pieces | Tufts, reeds, flowers along the edges. | colour-graded | autumn and winter edge pieces | as balanced |
| Village buildings | Roofs, eaves, window boxes. | — | seasonal dressing laid on top (blossom boxes, garlands, leaf piles, a light frost on roof edges, Yule lights) | each building repainted for autumn and winter |
| The Green and the village props | The Runestone, the well, fences, carts, stalls. | — | in the dressing sheets | props repainted for autumn and winter |
| Festivals | The woven saga's spring feast, midsummer, harvest fires, Yule, the real spring feast. | — | set-dressing for each festival on the Green | as balanced, plus festival lights at night |
| Light and sky | Day and night colours, sun height, fog. | code | code | code, plus weather events (spring showers, summer storms, autumn fog, frosty mornings) |
| Weather and creatures | Petals and pollen, fireflies, butterflies, falling leaves, frost glitter, breath, a thin flurry. | one painted particle sheet + code | two sheets + code | three sheets + code |
| Water | Lakes, marsh, sea. | unchanged | a frosted shore rim in winter | as balanced |
| The little map and the world map | Their colours follow the ground. | code | code | code |
| Camps, rocks, bridges, waystones, site entrances | Their outsides in the overworld. | — | — | repainted for winter (and autumn where it shows) |
| Adventure-site backdrops | The landscape behind a site's floors. | — | — | 15 backdrops × 3 seasons |
| The four islands | Their grounds and trees. | — | — | seasonal variants |
| Interiors | Homes, the tavern, the guild. | — | — | seasonal decorations (Yule greens, harvest sheaves, spring flowers) |
| Villagers | The ones who stand outdoors (11: Runa, Nell, Corr, Marta, Tob, Greta, Hesk, Fenwick, Bram, Dunn, Vela). | — | winter clothes (cloak and scarf) | autumn and winter clothes |
| The hero | Your twin's look. | breath in the cold (code) | as limited | an optional winter mantle for both twins (54 sheets each — the biggest single cost, and the riskiest for keeping them on-model) |
| New cut-scenes | The year turning. | 2 frames added to five existing moments (the first walk, Bram's bridge, Mira's lift, Dunn's bridge, Freya's vines) | five short season cut-scenes (6 frames each) with their shot series | as balanced |
| Existing cut-scenes | The eight set in today's overworld (the first spirit, Bram, Mira, Dunn, Vela, Asgard coming down, the Bifröst, home) show summer greens. | left as they are | repainted in their season (74 frames, both twins) | as balanced |
| Music | The village's day and night themes; stings for the turn. | — | village day and night in each season (8) + 5 stings — Suno, by hand | plus each realm's day theme in each season (16 more) |
| Ambience | Birdsong, insects, wind in dry leaves, winter hush. | — | 16 loops (meadow, village, lake, wood × 4) — ElevenLabs | 24 loops (each realm too) |
| Villagers' words | Seasonal lines, festival talk. | 1 seasonal line each per season (170) | 3 each per season (~510) + festival talk | ~850 + weather talk |
| Shops and food | Seasonal food (honey cakes, berries, apples, mulled mead). | — | 4 seasonal foods at Benno's and Tilda's | plus seasonal forage at camps (berries, mushrooms, frost-herbs) |
| Teaching and the journal | "The year turns" (Elder Runa); a season mark by the clock; a Tome page. | lesson + mark | lesson + mark + Tome page | as balanced |
| After the end | What the seasons do once Freya's spring has come. | stays spring | stays spring | the year keeps turning, one season per in-game week |
| The title screen and home page | Their background. | — | — | one per season, following your save |
| Save and old saves | Which season you are in. | worked out from your progress (nothing new saved); an old save simply opens in its season | same | same |
| Under the hood | Painting and memory. | the world repaints once when the season turns | seasonal pictures loaded only for the season you are in | same; the most to load |
| Docs, the Lab and tests | The Saga and style docs, Lab review tabs, tests. | yes | yes | yes |

## What does not change

- Inside the adventure sites, castles and mage towers; boss arenas and trial realms.
- Muspelheim, the four forges, the sky ports and Asgard (above the weather).
- The monsters (each realm keeps its own).
- The Highlands' peaks keep the snow they already have; the Ashlands' lava keeps its glow.

## The villagers' saga, woven (Kris's picks, round 114e)

Your ✓: The Homecomings, The Turning of the Year, The Red Gold and The Saga of the Last Village, with the Mending tempered (the freed builders' fixing only). They run side by side as five strands; each chapter is one season and one realm.

| Chapter | Season | The Homecomings | The Turning of the Year | The Red Gold | The Saga of the Last Village | The Mending (tempered) |
|---|---|---|---|---|---|---|
| Prologue — The Long Winter | The stuck winter (mild, grey) | The empty chairs: Rolf's two cups, Tob's empty hives, Pell's folded shawl. | The Grey Yule nobody enjoys; the first bud opens on the Green the morning you go. | Tilda's key on its nail; Garrick refuses the well-chain; Morwen locks her back room. | Your twin reads the first line of the saga. | — |
| Chapter 1 — The First Spring | Mild spring | Hallveig, Ketil, Geir, Eyvind and Dagny, Jorunn, Asa, Frida come home. | The spring feast; hnefatafl against Runa. | Red coins in a Binder's purse; Iva: "It was poured, not dug." | Versions: everyone's story disagrees; Bram corrects them. | Bram: the well, the doorframe, the bench. |
| Chapter 2 — High Summer | Summer | The drowned come up: Yrsa, Magni, Liv, Oddny, Nanna, Torvi. | Midsummer: the taste-off, Benno against Morwen. | Sigrid's memory: "Some of us took it." The moot on the Green. | The skalds' contest; Vigdis's saga with its torn page. | The river trade: Marta, Coral's boats, Hesk's boat, Mira's workshop. |
| Chapter 3 — The Harvest | Autumn | The mountain's answer: Ingrid, Bodil, Joreid, Hakon, Dalla; Oswin tells the true Ash Night. | Harvest fires: the forge-off, and Rolf's flyting. | Dunn's grudge-book names "the silver tongue"; Morwen tells what she read. | The builders' chapter, with diagrams. | Garrick and Dunn at one anvil. |
| Chapter 4 — Yule | Winter (mild) | Thora, Njal, Mord, Alfhild; the Ravens remembered — five tankards stand. | Yule and Winter Nights: the monarchs' feast. | Tilda's key opens Zahir's strongbox; Morwen brews the Counter-Verse. | Letters from far away; your twin finds the word. | Vela's lanterns over the Green. |
| Chapter 5 — Freya's Spring | The real spring | Every one of them home: the farewell at the Bifröst; the twentieth shawl worn at last. | The real spring feast: honey cakes, the first cry, Odin's jokes at the bar. | Paid in full: the red gold melted into the hamlets' bells. | The missing verse, read under the World Tree. | The new roads and the hamlets. |

The Mending is tempered: only the freed builders' fixing stays (Bram's well, doorframe and bench; the river trade; Garrick and Dunn at one anvil; Vela's lanterns; the new roads). Removed: the siege, the broken and empty houses, and defending against the Binders.
