# 60 — Round 109: Kris's Lab picks built (the inventory, the site backdrops)

## Inventory layout (Lab picks: layout A "sub-tabs" + all seven extras) — 22c, 22-ui-shops, styles.css

**Sub-tabs.** Weapons, Armor and Accessories each get a row of chips under the tabs. Each chip shows its count, and empty ones are dimmed.

| Tab | Chips |
|---|---|
| Weapons | All · Swords · Axes · Bows · Crossbows · Staffs |
| Armor | All · Helmets · Body · Legs · Boots · Gloves · Shields |
| Accessories | All · Amulets · Cloaks · Rings |

Clicking a gear slot on the hero opens its tab and its chip.

**The extras** (on the gear tabs and All):

- **Sort menu:** Power (the default), Tier, Element, Newest, Name.
- **Element chips:** 🔥 💧 🌿 🪨 ⚡ 🌑 show only gear of that element. Click again to show everything.
- **▲ Upgrades only:** only what beats what you wear. For rings, it compares against your weakest ring, and an empty ring slot counts as an upgrade.
- **Stacking:** the same item shows once, as "Iron Sword ×3".
- **Tier badges:** I–V on each piece, coloured by tier, also shown beside the name in the detail panel. Tier comes from the realm the piece belongs to, +1 if it is forged; Sovereign pieces are V.
- **🪙 Mark to sell:** a button in the detail panel marks (or unmarks) an item, and the tile gets a gold coin and rim. In sell mode, the merchant then offers **"🪙 Sell all marked — N items for Xg"**, which sells every marked copy you carry. Worn gear is never in the pack, so it is never sold.
- **New-item dot:** a pulsing teal dot on what you picked up since you last looked. It stays while you browse and goes once you close the inventory. An older save starts with everything it holds counted as seen.

Kept in the save: `ps.sellMarks`, `ps.invSeen`.

## Site backdrops (Lab picks: all seven fixes) — 07zy3-site-backdrop.js, hooks in 07zy-site-paint and 07zy2-site-void

| Fix | What it does now |
|---|---|
| **A built edge** | Wherever the floor meets the backdrop, or the dark wall mass beyond it: a stone lip, a rock face hanging below (the site's own stone), and a soft shadow under it. The tile steps' outer corners are rounded off. Over an abyss the face ends in jagged rock with roots. |
| **Backdrop far away** | The clouds, waves, lava, treetops and stars are drawn at a third of their size, darker and slower, with a haze and a darker rim over the backdrop only. The painted drifting clouds and fog shrink with them. |
| **Two moving layers** | Every kind also gets a nearer layer drifting past: cloud wisps, sea spray, embers, leaves, star dust, or mist. |
| **Inside a tower** | The upper floors of towers, mage towers and castles are ringed by the tower's own wall: courses of stone (violet for a mage) with arched windows, and the sky and land far below through them. |
| **Floating islands** | Floors over the stars or an abyss hang as islands, with rock and roots under their edges and small islands drifting far off. |
| **Painted wall caps** | Every wall top gets staggered bricks with light and dark stones, a top highlight and a little moss (the round-103 painted bricks under them where loaded). No more blank white blocks. |
| **Clear floor, plain void** | Over the stars, clouds or a storm, the floor gets solid stone, and the void is darker with a stronger vignette. |

**Paintings: in** (round 109b). They replace the drawn stand-ins:

- The painted faces hang under floor edges, one stone per element. Over an abyss or the stars, the island underside with roots is used instead.
- Wall tops get the painted caps (rough stone, dressed brick, or basalt in the fire realm), tinted toward the site's own stone.
- Tower floors are ringed by the painted tower wall, with violet runed stone for mage towers.
- The round-106 healing wells (stone, frost and basalt; full and spent) are in too.

What was ordered:

- `sc_r109_edges`: the hanging face in six stones, one per element.
- `sc_r109_tower`: the tower's inner wall (plain and mage), a floating island's underside, and three wall caps.

Also fixed in 109b: the painted textures are canvases and must be turned into fill patterns (`ZBD.fp`). Before that, a painted cap filled as a blank block.


**Note:** in dark sites, the exploration fog still hides what you haven't seen. Its square edges are the fog, not the floor.

**Switches:** `ZBD.on`, or `ZBD.OFF.rim` / `far` / `layers` / `tower` / `island` / `caps` / `clear` for one fix.

## Tests

`tests/test_round109.py`, 14 checks:

- the sub-tabs and their counts
- stacking ×3 and tier badges
- sort by power and by name
- the 🔥 chip
- upgrades only
- the new dot (stays while browsing, gone after closing)
- mark to sell, and the merchant's "Sell all marked"
- the armor and accessory chips
- a tower floor (wall ring, the far sea at a third the size, the near layer, the haze)
- the abyss island
- solid stone over the stars
- bricks on wall tops

Older tests updated for the new ×2 stack label, the 10 inventory tabs, and the Lab to-do list (invorg and backdrop retired).
