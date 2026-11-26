# 94 · Rounds 136–137: the spirits speak, the seasons on the land, and your thirteen points

## Round 136 — in the game
- **The forty spirits.** Each freed spirit has a backstory and five lines about their own lost town (Fernby, Stonewick, Hollowmere, Millbrook, Reedhaven, Hverholm, the Lantern Isles, Askvald, Emberhold, Brandhavn). Stand by the Green's stone and press **Tab**: a freed spirit talks, in order, line by line.
- **Stingers or effects — your picks.** Only the fall keeps its stinger (cut to 5 s with a fade). A quest done plays the camp fanfare, a level up the gem chime, a new place the great door. Every other stinger is silent.
- **The seasons on the land.** Each season lays its own painted pieces in a ring round the village (22) and two at every waystone. Festival days dress the village doors (wreath, banner, lantern, step) with torches at night.
- **Sound effects.** 35 effects re-picked from your ★s. The feast is the last to remake — new words (music, voices, mugs); run `.\tools\audio\audio9.ps1`.
- **World revamped 5.** The 20 banners and the four repainted landmarks are now painted in the Lab (today and repainted side by side).

## Round 137 — your thirteen points
| # | Point | State |
|---|---|---|
| 1 | Painted logo — 20 options | Requests ready (`paint.ps1 -List r137_logo`); the **Painted logo** tab shows each on dark and light |
| 2 | The first ten minutes | Fixed Oswin's drift; new **The first ten minutes** tab with every beat and 7 proposals |
| 3 | Steam price $8.88 | Noted (not financial or legal advice) |
| 4 | Flow videos — images and words | **Next round**, on its own |
| 5 | Names | New **Names** tab: four realm sets + a proposal for every place name |
| 6 | Timeline 3 + 3 + 3 + 3 + 16 = 28 | Every line updated |
| 7 | Muspelheim rafts painted, hints brief | Done (hints are one line and do not stop the game) |
| 8 | Spirits one size, painted lava | Done |
| 9 | Health and mana in the inventory | Done |
| 10 | "Each hall" icon painted | Request ready (`paint.ps1 -List r137_musp`) |
| 11 | Lever painted | Done |
| 12 | Dying in a site: door or village | Done |
| 13 | Invisible monsters | Fixed |

### The first ten minutes — what changed
- Oswin no longer greets you in his hall as if you had just arrived ("So the lake's foundling finally comes to my door"). Now: "Sit, sit — my knees have done their walking for today."
- He no longer sends you to buy a wood shield. The wolf fight gives you one a minute later. Now: the iron sword for forty, and a potion or two.
- He ends by sending you to Elder Runa at the Runestone, which matches the line under the little map.
- Proposals to ✓: one voice at a time, fold the map into the walk, the first fight sooner, Runa by doing, a first goal card, fewer words, your twin waves.

### The timeline (canon)
| Year | Event |
|---|---|
| 0 | The gate shuts — the Ash Night |
| 3 | The Stone-Fall |
| 6 | The Black Tide |
| 9 | The Grasslands fall quiet |
| 12 | The storm and the basket |
| 28 | Now; the twins are 16 |

### Names
Four realm sets:
- **A · The Marks** (recommended): Greenmark, Fenmark, Fellmark, Embermark.
- **B · Poetic**: The Gildenmeads, The Drowned Marches, The Giantstair, The Cinderwaste.
- **C · The old tongue**: Vangheim, Myrheim, Fjallheim, Brennheim.
- **D · What befell them**: The Hushed Meadows, The Black Fens, The Broken Fells, The Ember Wastes.

Beyond the realms, there is a proposal for the village (Mirrowby), the little-map labels, all 40 lands (each waystone takes its land's name), 16 islands, 13 sites, 4 mage names, the Slag forge and the over-used words (Ember ×7, Crystal ×5, Cathedral ×3).
- **Rivendell Twilight Hall must change either way.** Rivendell is another author's place.

### Muspelheim
- Rafts, lifts, gates, bridges and the lever use painted pieces where the painting exists.
- The lava channels are painted over.
- Toiling spirits are 52 px (children 40 px); chain gangs are 64 px.

### Dying in a site
In an adventure site, Muspelheim or Asgard, the fall screen offers **Wake at the door of …** beside **Wake in the village**.

### Invisible monsters
- **Cause:** when you came back from a site, monsters that revived after more than 60 seconds away were made active again but stayed at alpha 0 and scale 1.4 from their death fade.
- **Fix:** they now come back whole, visible, at their home spot.

## For Kris to run
- `.\tools\sprites\paint.ps1 -List r137_logo`
- `.\tools\sprites\paint.ps1 -List r137_musp`
- `.\tools\audio\audio9.ps1`
