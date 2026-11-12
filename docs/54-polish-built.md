# 54 — Round 102: the Painted & polish picks built, the guide's first fixes, combos proposed

Kris's picks are from Lab › Painted & polish (every section) and Lab › Mechanics guide. Round 101's survey is doc 53.

## 1. Built — in the game now

### HUD (21w-hud102.js)

- **One panel** (`#zhud`) at the top-left in the world, buildings, islands, adventure sites and forges. It shows:
  - **teal soul-hearts**: 1 per 10 health, emptying in quarters; past 200 health each heart is worth more
  - the **aurora mana arc**, which grows longer with the pool
  - **banners**: level ×100 xp to the next level, split over 2 banners at level 1 up to 6 at level 16+; full at the realm's cap
  - gold
- The old bars (`#stats-panel`, the site HUD's `#dng-bars` / gold box) are hidden, and the floor title sits under the new panel.
- The sky port keeps its ship line, since that change was not picked.
- **Mana grows 3 a level** (50 → 107 at level 20) in `calcPlayerStats`.
- Painted pieces (sheet `sc_r102_hud`) replace the CSS hearts and banners when they are in.

### Bars

- **Monster and world-boss bars** have a gilt frame and a pale damage trail (`ZBAR`). The painted frame `hud_monbar_frame` is used once it is in.
- **The boss bar** (09b) has a knotwork frame, a damage trail, and notches where the extra bars wake. The painted `hud_bossbar_frame` replaces the frame once it is in.

### Spells (09s ZSPELL102)

- Every spell costs **mana ×2**, has a **cool-down ×3** (at least 2.5 s) and **power ×2.5** (`ZHit.spellPow`).
- The old per-spell slow, root, stun, drain and knock-back are replaced by the status effects below.

### Status effects (09s ZSTAT)

Every spell leaves one effect. Each effect is timed and none is permanent; casting again refreshes the time but never stacks past its cap.

| Spell | Effect | Bosses | Shrug it off | Hit harder |
|---|---|---|---|---|
| Frost | Freeze 1.5 s | great: slowed instead · elite: half | water-type: half the time | fire-type: 2.5 s |
| Ice shards | Chill 3 s; 3 chills within 4 s freeze | slowed 20 %, never frozen | water-type | fire-type: 2 chills freeze |
| Fire | Burn 4 s (a quarter of the hit again) | 2 s | fire-type | grass-type: 6 s |
| Meteor | Burn + knock-down | no knock-down | fire-type | grass-type: 6 s |
| Lightning | Shock: stun 0.5 s (Thunder Step 1.5 s) + the next hit +25 % | the bonus only | storm-type | water-type and soaked foes: stun ×2 |
| Poison | Poison, 8 s at most | half damage | earth- and shadow-type | — |
| Arcane | Mark: the next hit within 4 s is critical | the same | — | — |
| Thorns | Rooted 2 s | great: none · elite: 1 s | fire-type, fliers | earth-type: 3 s |
| Tidal wave | Soaked 5 s + knock-back | no knock-back | water-type | fire-type: 8 s and its blows −20 % |
| Stone spikes | Earth-bound 2 s; fliers brought down 3 s | flying bosses down 1.5 s, others none | earth-type | water-type: 3 s · storm fliers: 4 s |
| Void | Hex: defence −30 % for 5 s | −15 % | shadow-type | storm-type: −45 % |
| Spirit drain | Drained: heals you 30 % of the hit; its blows −20 % for 4 s | its blows −10 % | shadow-type: no healing | — |
| Starfall | Starstruck: dazed 2 s | none | storm-type | shadow-type: 3 s |

- Holds use the round-6 guard: diminishing returns, and **4 s** before the same hold can land again (was 3 s).
- **Shown as:** a tint, plus a small icon over the head whose ring drains as the effect runs out. The painted overlays (`so_*`) and painted icons (`st_icon_*`) are used once they are in.

### X twice (09s ZAIM, 24-pause-input)

1. The first X shows a rune circle where the spell will land, locked on the foe nearest ahead. No mana is spent yet.
2. While the circle shows, the movement keys slide it and the hero stands still.
3. X again casts there. Holding X keeps the circle; let go and it stays 2.5 s.
4. Space or Esc puts it away.
5. Both casters (the world's and every site's) cast at the circle: projectiles home on its foe; Meteor, Starfall and Blizzard land on it.

### Arrows (09s ZDRAW)

- **Hold Ctrl** to draw: a reticle shrinks on the target over 0.8 s.
- Let go to shoot. The damage depends on the draw:
  - a quick tap: ×1
  - half a draw: ×1.5
  - a full draw: a sure critical ×2
- The arrow flies at the reticle's foe.
- **Half the arrows that miss are found again.**

### Messages (22z-msgs102.js)

- **Loot and gold** slide in as ribbons at the left above the hotbar, with the painted item icon.
- Warnings stay at the top centre.
- **An NPC line** that came as a toast is said in a bubble when it is up to 12 words. A longer one goes in the dialogue box; in a fight or a site it stays a bubble, because round 85 says a cry there never pauses the game.
- Face-to-face lines in the village still open the box (07zdlg).

### Other changes

- **Spirits and fairies talk in the dialogue box**: painted face, typed, their buttons as choices. Talks with a table (Mira's trays) keep the old box.
- **Load screen**: "The runestones are waking…", "The spirits are listening…" and "Painting the land… n / m" in rune lettering, under a thin teal bar. The four-quadrant line is gone.
- **Sky ports**:
  - hold Space to keep firing; double-tap Space for the charged shot
  - your shots pass through your own clouds
  - hit boxes 75 %, with a faint aim line
  - a bomb that lands costs the port 10, and a red streak shows it coming
  - a formation reaching the port costs 60 and is pushed back up (was 120 and the wave gone)
  - the lowest flier dives now and then
  - three waves, then the guardian
  - a briefing card the first time
  - the painted city, cloud banks, bolts and bomb are used once they are in
- **Exit portals** (12-scene-dungeon): until the sealed portal and vault paintings are in, the sealed portal is the open-portal painting `en_portal`, darkened and red, and it turns bright when the guardian falls.
- **Boss attacks**:
  - the painted pieces lie just under the boss and the hero (depth 9.4; the eclipse darkness stays on top)
  - the safe share rises from 30 % to 36 %
  - a safe column or wall gap only counts where the hero can stand. One that falls on a wall, on lava or outside the arena is moved to standable ground, and more are opened until the share is met (the Lava Archipelago)
- **Boss hurtbox**: a boss is hit anywhere on the lower part of its painted sprite as it is drawn on screen, so a big boss has a big hurtbox and a small one a small hurtbox.
- **Bridge gates**: the painted gate is used once it is in.

### Asked for during the round

- **"/" opens the inventory** and pauses the game. Food and potions can be eaten or drunk from it ("Eat now" / "Drink now", or double-click).
- **Spells and Skills are two inventory tabs** (they were one, "Spells & skills"). The pause panel's "Skills & Familiars" opens Skills.
- **The Tome**:
  - a **Skills** chapter: what each skill does, its cool-down and where it is taught
  - a **Glass road** page in "How it all fits": shards → lattice → metal → soul gem → tray → Heartglass, then the staff → the Lodestar
  - painted element icons on the realm headers, and painted art for Brokk and the forge masters
- **Shield-wall Dwarves**: blows from the front now get 30 % through (they blocked everything). Behind them is still full damage.
- **Painted art**: the hidden caches (the Wetlands chest) and the exit portals.
- **Site Lab**: the thumbnails stop being drawn once the Lab is closed or a floor is launched. Before, they kept building floors behind the launch, and switching tabs queued the same site more than once. Kris saw the tab stall and Chrome offer to kill it. That stall did not happen in the test browser, so this change may not be the whole answer.

### The Mechanics guide picks (round 102)

- mana grows with level, spells, status effects, aimed arrows and the new HUD (above)
- **Pia** now camps 1.5 screen-heights north of the village (the journal and the hint say so)
- **gear comparison** in the shops: ▲ green / ▼ red against what you wear in that slot
- **"Your mounts"** on the map's legend, and the Tome says in words what each mount crosses
- **Oswin names the Sovereign staff** once the volcanoes have woken, and not before: won from all sixteen mage towers, or the apothecary's upgrade (Arcane staff + 2 ruby, 2 sapphire, 2 emerald, a skystone, 6,000 gold)
- **A realm card** on the map. It starts empty: a line appears only once you have found one of its kind (a treasure site cleared, a spirit freed, a key mount won), then shows for every open realm.

## 2. Ordered — paintings (`.\tools\sprites\redo.ps1 -List r102`)

There are ten sheets, all in 07zt10-art-r102.js:

| Sheet | What it holds |
|---|---|
| gate | the bridge gate, closed and open |
| lines | the rune-line ribbon and 3 node-stones |
| skyline | the four sky-port cities |
| skyfx | 3 cloud banks, 2 bolts, the bomb |
| status | 8 overlays |
| icons | 12 status icons |
| aim | the rune circle, the reticle |
| hud | hearts, banners, the bar frames, the mana frame |
| portal | the sealed exit, the vault sealed and open |
| dfloor | the dungeon floor-and-wall trial |

The code uses each painting as soon as it is in, except two that need tuning by eye once they arrive:

- the rune-line ribbon
- the dungeon floor trial

## 3. Next — proposed or waiting

- **Combat rhythm** (Lab › Mechanics guide, bottom). Kris: "sword and axe swings having combos when doing the timing right … propose some additional mechanic like this, including a place to teach this". Eight proposals:
  - sword combo (×1.2, then a ×1.6 finisher)
  - axe rhythm (×1.8 cleave)
  - perfect block
  - roll-counter
  - charged swing
  - rune-weave (a spell after a finisher +25 %)
  - "Together!" with your familiar
  - follow-up shot on a held foe

  Three places to teach them:
  - a Training Yard with Sigrún and a dummy
  - each teacher teaching their own
  - cards only
- **Digging.** Kris: "I don't think there is actually a good reason for digging anymore". It is tied only to:
  - the 20 fairy lessons (one buried object each)
  - the three Fairy Kings (three treasures each)
  - the Fairy Trowel, the G key and Training lesson 20

  The proposal is to take it out: the objects lie in the open at the same glowing spots and walking over one picks it up. This waits for ✓ in the Lab.
- **The guide in the game** (Kris ✎: "the world and the saga … plenty of hints … but not the full story revealed"): a "How it works" page in Training. Its world and saga entries give hints only. Next round.
- **One familiar screen** (✓): slots, skills and the fairy trials together. Next round.
- **Lab**: "Waiting for your picks" now drops every finished ask: the boss attacks, every Painted & polish section, the sky ports and the guide improvements.
