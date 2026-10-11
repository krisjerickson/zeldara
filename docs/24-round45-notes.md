# 24 · Round 45 notes — "no effect", performance, sky ports, sites, How it all fits

Written for Kris, Oct 10–11. This doc covers the analysis he asked for in round 45 and the decisions behind the larger changes. The changelog (06, [397]–[426]) has the file-by-file list.

## 1. "No effect" — where it comes up, and what to do about it

**What changed already.** Kris answered the card with **25% damage**. A hit that used to do nothing now does a quarter (`MX.SHRUG = 0.25`, `09-monster-engine.js`). The monster says "shrugs it off", and the first time per monster and attack kind a hint names what works instead (`MX.shrugHint`). The Tome's label changed from "Immune to" to "Resists".

**Where it comes up.** Eighteen roster monsters carry an immunity (`immune k=…` in `07r-monster-kits.js`):

| Immune to | Monsters | Pattern |
|---|---|---|
| Melee (11) | Kite Rider, Glowworm, Wind Sylph, Will-o'-Wisp, Moon Moth Mage, Rain Spirit, Storm Heron, Cloud Sylph, Aurora Spirit, Flame Kite, Flame Djinn | Almost all fly, orbit or are spirits |
| Ranged (5) | Scarecrow Warden, Mangrove Strangler, Fog Phantom, Salamander Wyrmling, Magma Vent | Rooted things, or a body that arrows pass through |
| Fire (2) | Pyromancer, Salamander Sage | Fire casters |

Every realm has at least two melee-immune monsters. In the Grasslands the player may still only carry the wooden sword and a short bow.

**Suggestions** (nothing built yet; pick any):

1. **Airborne, not immune.** Kite Rider, Storm Heron, Wind Sylph, Cloud Sylph and Flame Kite: an arrow, dart or spell knocks them down for 3 s, and while grounded melee does full damage. The player learns to shoot then strike, instead of standing there at 25%. *Effort: medium.*
2. **Ethereal spirits.** Will-o'-Wisp, Rain Spirit, Aurora Spirit and Moon Moth Mage keep the 25% from steel, but their element's weakness hits at full (or Bane) strength, even from a sword gem. This ties the immunity into the element wheel. *Effort: small.*
3. **Fire casters → Warded.** Pyromancer and Salamander Sage use the element tier "Warded" (×0.35, shown as ▽▽) instead of a separate immunity, so there is one system for elements. *Effort: small.*
4. **Ranged-immune from the front only.** Scarecrow Warden, Fog Phantom and Mangrove Strangler: arrows fired from behind or the side hit fully. This rewards circling. *Effort: medium.*
5. **A visible tell.** A faint icon over the monster (a crossed sword or a crossed bow) for the first few seconds after it shrugs off a hit. *Effort: small.*
6. **First-realm safety.** Any Grasslands melee-immune monster is never placed where a new player meets it before the first bow is sold. *Effort: small.*

## 2. Performance — Kris's F9 readout (village)

**His numbers:** 49–60 fps, 335–431 draw calls, 891–1029 objects.

**What we found:** the scene kept every object it had ever made: painted terrain pieces, critters, lights, camp props and village props. Phaser drew all of them every frame, even those far off-screen. Lights also sat on many depths, so they could not batch.

**What was done:**

- **Off-screen culling** (`WR_CULL`, `10c-world-render.js`). Every 6 frames, any object more than ~160 px outside the view is hidden from the camera (`cameraFilter`). Graphics, emitters and layers are left alone. In the test village scene, 605 of 681 off-screen objects are now skipped, and measured draw calls in a test walk dropped from 186 to under 10.
- **All glows on one layer** (`WR_LIGHT_D = 10.9`) so they batch into one draw.

**What to check next:** press F9 in the village again and copy the last 10 s. If fps is still below 60, the next steps are items 4–6 of doc 22: one shared texture for terrain pieces, keeping village chunks cached, and a "lighter" setting.

## 3. Sky ports — rebuilt as a painted "space invaders" flight

Kris: "you don't pause in the real world when entering them … the graphics are bad … even more like space invaders with additional skills … leverage the old designs."

- **The world now sleeps** while you fly (`_sleepWorld`). Time and monsters stop.
- **Painted art** (wave 47):
  - four realm backdrops (`sk_bg_1..4`)
  - galleons and wingmen (`sk_galleon_*`, `sk_drone`)
  - a cloud bunker (`sk_bunker`)
  - six power-ups (`sk_pu_tri / rapid / wing / shield / bomb / heal`)
  - painted floating islands, docks and balloon
- **The fight:**
  - A formation of the realm's own painted flyers marches and steps down, with column bombs. A galleon crosses for a bonus.
  - Wave 5 is the realm's Guardian.
- **Skills:**
  - Space shoots (hold to charge)
  - Alt barrel-rolls (a dodge)
  - Shift raises a shield
  - X drops a bomb
- **Rules:** power-ups drop from foes, there are 3 lives, the city below has HP, and combos add to the score. The rewards are as before.
- **Ideas for later:** a boss per realm with its own pattern (the old sky designs' storm, ember and void themes); a two-player co-op wingman; a high-score board in the Tome.

## 4. Adventure sites — new picks and old layouts

- **Painting:** hybrid for all sites. Tile sets in each site's colours, plus big painted set-pieces (16, wave 47: `sp_glacier_heart`, `sp_lava_forge`, `sp_root_heart`, …) placed by the design.
- **Every site has a boss space** on its last floor (`arena`: 17 × 14 tiles with two entrances).
- **Secrets:** each floor of the new designs has shortcuts (hidden doors: a draught near them, stand beside one for a moment to open it) and a treasure room.
- **Variety — Kris's bedtime answer:** "For any new site that I chose that is similar to another i had chose … substitute it with the old adventure site designs. However, towers need to be larger floors overall."
  - Where a pick repeated another site's design type, the site keeps **its own original layout, whole**.
  - That is 25 sites (`ZSP.OLD`, `07zx-site-plans.js`): hyrule_keep, observatory, dawn_sanctum, rivendell, reflecting_hall, moonglass, mushroom_forest, lake_ring, lava_archipelago, sunken_courtyard, bone_pit, boulder_field; mage hearthfire, rootspire, rime_spire, mire_tower, lightning_rod; castles q1_b, q1_c, q1_d, q2_b, q2_d, q3_b, q3_c, q4_c.
  - The other 28 use his picked design.
  - Sunken Courtyard, Bone Pit and Boulder Field keep their open caves, as asked.
  - Two old mage designs repeat (Frost Spire, Storm Rod, Void Rift), so Frozen Belfry, Conductor and Hollow Spire stay new.
- **Old towers are 1.5× larger** (`TOWER_GROW`, `towerGrow`, `07b-site-towers.js`). Every room edge and wall is scaled by one rule, so walls stay 1–2 tiles thick and every door still meets its wall. Every old tower and castle floor the game builds was checked: spawn and stairs reachable, every floor tile reachable.
- **Ember Isle is stacked:** the Ember Cave on its upper floors, the Ember Crypt below.
- **Lab → Site review** (`61-lab-sreview.js`): every site as the game builds it now, floor by floor, OLD ones marked, with ☆ and notes.

## 5. How it all fits — the Tome chapter

Kris picked all six Lab ideas and answered: one chapter with six pages; **found only** (unfound things show as "?", the next step glows); the realm view is also a switch on the B map.

`26d-tome-fits.js` has six pages. Every page uses the game's real data and the player's progress.

| Page | What it shows |
|---|---|
| Stars | A constellation per realm: castle skills, mage spells, familiar lessons, the realm element's forge line, mounts |
| Compass | Six elements; inside, what you carry; outside, the foes met; a red edge where nothing of yours beats them |
| Matchups | Everything you carry × the six elements (Bane / Weak / even / Resists / Warded); click a column for the foes met |
| Realms | The world map with each realm tinted by its element and what each found place gives |
| Journey | Each realm's milestones in order; "you are here" |
| Web | Pick an element: its weapons, spells, familiar, gems, realm, the foes it beats, the guardians who wield it |

## 6. Bows (Kris: "i don't see bows that have the element progressions like crossbows")

- **Element bows:** Longbow + 2 gems of one kind gives the Ember, Tide, Briar, Granite, Thunder or Shade Bow (+21 ATK, +6 element).
- **Warbows:** two element bows + a rare item (+31 ATK, +12 of both elements). They cover the three neighbour pairs the arbalests don't:

  | Warbow | Elements | Rare item |
  |---|---|---|
  | Sunbloom | fire + grass | Phoenix Ember |
  | Squall | water + storm | **Squall Pearl** (new: masters of the Conductor and the Frozen Belfry; water and storm Alphas) |
  | Barrow | earth + shadow | Grave Amber |

- They are in the Forge tree and on the weapon wheel. Icons were painted in wave 48.
