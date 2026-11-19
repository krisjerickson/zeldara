# 72 — Kris's six fixes, the shot picker, and the seasons' festivals (round 117)

## The fixes
| # | Kris | What was wrong | Done |
|---|---|---|---|
| 1 | "remove boss healing. it's too powerful" | Three things healed a boss: its *drain* attack healed it by the damage dealt, the *regen* defence restored 2 % a second, and a healer nearby topped it up. *Revive* also brought a boss back at half health. | `MX.bossy(mon)` (09-monster-engine). A boss never mends: no regen, no drain-heal, no healer's touch, no second rising. A boss's drain still hurts you. |
| 2 | "finding fisher net didn't give me the gold" | Nell's net talk was set by Oswin's tick. The tick waits while a story cut-scene is due, so Nell kept her ordinary lines, and the 50 gold never came. | `21w-voices.js`: while the net is out or in your hands, talking to Nell goes straight to `ZOSW.nell`, which pays 50 gold. |
| 3 | "skyport boss is too difficult. it also does not show up … new sprites" | The guardian used a mount's riding pictures. They were loaded once and never shown, so it was invisible. Its fans were 5 / 7 shots every 1.4 / 0.9 s, and it had 276+ health. | Each realm has a named guardian: the Gale Roc, the Mist Heron-Wyrm, the Thunder Gryphon and the Ember Wyvern. Until its painting is in, the realm's biggest flyer stands in, drawn large and tinted. Health is now 100 + 45 per realm + 3 per level (148 at the start; was 276). Fans are now 3 / 5 shots every 1.9 / 1.3 s, slower and with wider gaps. A sky bomb takes 12 % of its health. |
| — | new sprites | — | `07zt16-art-r117.js`: `sc_sky_guard_1…4`, three frames each (wings up, wings down, enraged), seen from below. `.\tools\sprites\paint.ps1 -List r117_sky` (4 sheets ≈ $0.19). A sheet can now give its own `view`. |
| 4 | "skyport battles don't allow you to use the sky bombs" | The game's key handler (24-pause-input) marked X and Alt as handled, and Phaser ignores keys already marked. So the sky bomb and the roll never fired. | That handler now leaves every key to the sky port while it is on. The port also hands up fresh bombs (at least 2) when the guardian arrives. |
| 5 | "elven library … go back and forth lots of times" | Round 47 filled each quarter with rows of shelves that snaked: one gap, at alternate ends. | `07zx4-site-plans-r117.js`: four reading rooms, each with a door three wide on both of its aisle walls. Inside are freestanding bookcases 3–4 long in staggered rows, with lanes between them both ways. Each room has a centrepiece (a ring of shelves, a map table or a reading pit). The aisles are open, and the rotunda is kept. |
| 6 | "text boxes come up while you are in the middle of a battle" | Only the lessons waited for a calm moment. | `21t2-calm-boxes.js`: any box that opens by itself waits while you fight. That covers the dialogue box and the spirits' and fairies' talk window. You are fighting if you were hurt in the last 6 s, if a monster is hunting you within 12 tiles, or if you are in a sky port or the volcano. The boxes then open in order once it is calm. A box you ask for (Tab, E, Enter, a click) opens at once. |

Tests:
- `test_round117` (10 checks).
- Updated tests: `test_round47` (bookcases, not stacks), `test_round102` (the spirit's thanks comes from a Tab), `test_round114b` (the lessons ask is retired).
- `test_round45`, `test_round103` and `test_round115` pass.
- `bake_world`: same world.
- `test_round101`'s emoji check finds no canvas text in the world at all (the text is HTML now). This is not from this round.

## All the pictures are in
- `r116_rest` is complete: 93 shots, plus Sólveig's two sheets.
- **19 more strips** were made: gate 6, the orbs, credits 4 and the World Tree. All 330 strips are now in the Lab.
- **Sólveig the Glasswright** was cut (idle, talk, work and walking) and packed into the village atlas. The Glimmerhall already draws her from it.

## Shot series — pick (new Lab tab)
- **Choosing a cut-scene:** each cut-scene has a chip along the top, showing frames picked out of frames.
- **Each frame:** the story picture is on the left, with its painted shots beside it, large.
  - Click a shot to keep it; kept shots carry their place in the cut (1, 2, 3…).
  - ◀ ▶ move a kept shot earlier or later. 🔍 shows a shot full size.
  - Each frame has a note field.
- **Below the frames:** *the cut, in order*. **▶ Play my cut** plays it full screen with its words.
- **How picks are saved:** in `series-<scene>_<nn>` as `keep:k,k,…`, now in the order the shots play. A frame from round 112's first cut shows that cut until you change it.
- The old review in "Shot series" points to the new tab.

## Seasons: decorations and festivals (new Lab tab, for review)
**Decorating the buildings:**
- **A · dressings over the buildings** (recommended first): painted pieces set at each building's door, ridge, windows and eaves. There is one sheet per season, plus lanterns and candles: 5 sheets ≈ $0.24.
- **B · seasonal repaints:** already in Holistic (28 sheets).

**The five festivals, in Kris's order of the year:**

| Festival | When | Cost |
|---|---|---|
| The Blossom Feast (Sumarmál) | spring | 2 sheets + 6 frames ≈ $0.56 |
| Midsummer Fires (Miðsumar) | summer | 2 sheets + 6 frames ≈ $0.56 |
| The Harvest Fires and Winter Nights | autumn; candles on the Runestone for the freed spirits | 2 sheets + 6 frames ≈ $0.56 |
| Yule (Jól) | the mild winter; straw goats, evergreen, lantern strings, only a light frost | 2 sheets + 6 frames ≈ $0.56 |
| Freya's Spring | the first-cry feast | 1 sheet ≈ $0.05 |

Each festival has its decorations, its activities and its paintings. **The small things:**
- festival clothes;
- four Suno pieces;
- festival food with small buffs;
- lit festival nights;
- when a festival runs (three days after the season turns, announced by Runa, waiting if you are fighting).

All of it comes to about 15 sheets and 24 frames ≈ $2.60.

## Kris next
- `.\tools\sprites\paint.ps1 -List r117_sky` paints the four sky guardians.
- Lab: Shot series — pick, Seasons: decorations & festivals, Five more sagas, Seasons: the paintings.
