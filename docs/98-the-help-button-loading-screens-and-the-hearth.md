# 98 — The ? button, loading screens, the hearth, and world take 5 (round 142)

## Kris's notes this round
- The corner cards ("notifications down at the bottom right") are too much: they lag and distract. Take them out. Put a **?** at the top right with a number for unread things. Do a deep analysis so nothing important lives only there.
- Adventure sites are slow to load. Make an awesome loading screen, unique to each site, with tips (including how to restart).
- The end-of-site screen can't be left. It doesn't pause the game, and it should. It can also cover the load back to the overworld. Paint ~6 frames so the fire and the candles flicker.
- Glades heal too much. Cap them at about one heart, once a game day each, and halve for each further glade that day.
- Mana analysis: max-mana sources and spell costs, with rebalance proposals as a Lab tab.
- The hero should flash red when hit. Halve the Runestone Crawler's armour. Cindra is "always red".
- Remove the puddle and the "tire tracks" (mud ruts). Runa's board needs a [Tab] prompt. The sheep still don't move. The new title logos go into the Lab.
- World revamp 5 feedback (see below). "We completed all the NPC lines" — not yet (see below).

## The ? (27z7-help.js, ZHELP)
- `ZCARD.show` now feeds `ZHELP.add`. No card appears on screen. The drill counter (`zc-drill`) is the one exception and stays on screen.
- The box under the minimap (`#zpath`) is hidden. Its words are the panel's **What now**.
- Button: top right; on touch screens it sits beside the top bar. A red badge shows the unread count and pings once when something new arrives. **H** toggles the panel and **Esc** closes it.
- The panel lists What now first, then New, then Earlier. Each card keeps its buttons.
- CSS classes are `zhp-*`. The HUD already uses `.zh-*`, so the panel had to avoid it (the same clash broke the hearth; see below).

### Where each important thing lives now
| Used to pop up | Now |
|---|---|
| Next step (`#zpath`): first walk, Saga step, followed side quest | ? → What now, plus the minimap's gold arrow and the journal (Q) |
| First fight: the call to the pen, how to fight, the win | Oswin speaks in the dialogue box (the game waits). Mid-fight, a short line floats over the hero. |
| A new Saga (New Game+) | The dialogue box ("The Saga Retold") |
| Lessons (ZLESOFT) | The ?, with its keys. **Proposal (Lab):** Oswin speaks block, roll and potions once. |
| "Lost?" hints, "While you slept", forge rules, carving lore, gold-ring hint | The ? |
| Drill counter | Stays on screen |
| Saga card | Only at the very end |

## Loading screens (27z8-loading.js, ZLOADS)
- The screen wraps `ScenePlugin.launch/start/restart` and `game.scene.start` for these keys: Dungeon, Sky, and Volcano*.
- It is a full-screen `#zload` with:
  - `load_<site.id>` once painted;
  - otherwise the realm's vista with the site's entrance painting;
  - `load_sky` / `load_muspelheim` for the sky port and the volcano trials.
- On top: the gold name, the realm, "Floor N of M", a rune spinner and one of 29 tips.
- It shows for at least 1.6 s and hides on the scene's `create` event. A 12 s safety timeout also hides it.
- Requests: **r142_load**, 38 wide paintings. Made by `tools/world/r142_art.py`, which writes `07zt37-art-r142.js`.

## The hearth (21z2-wave2.js, ZHEARTH)
- **Bug:** `21w-hud102.js` styles `.zh-b` as a 16×26 ribbon. The hearth's button row used the same class, so the buttons collapsed into the little mark. The row is now `.zhh-b`.
- The overlay gets `id="zhearth"` and is in `PAUSE_OVERLAYS` (and so is `zdusk`), so the game pauses behind it.
- **Enter, Space or Esc** = Onward. This is ignored for the first 0.5 s.
- **Early show:** `ScenePlugin.wake` is wrapped. When the Dungeon wakes World or Island and the run's guardian has fallen, the tally is computed and shown at once, so the trip back loads behind it. A later `site` event for the same run is skipped (`ZHEARTH._early`).
- Once `hearth_f1..6` are painted (**r142_hearth**, with refs to `sc_e134_hearth`), they crossfade every 170 ms in a slightly irregular order.

## Smaller fixes
- **Glades** (`10zr-ring-heal.js`): `ps.gladeDay = {d, used, n}`.
  - Each glade gives `heart × 0.5^n` once a game day.
  - After that it floats "The glade rests till tomorrow".
  - Tested: 10, then 5, then 0 HP.
- **Hero hit flash** (`27z9-hurt-flash.js`, ZHURT): wraps `_heroAnimate`. When HP drops, the hero is solid red (`0xff2a2a`) for 70 ms, then a red cast until 180 ms. Uses ZENG, so it works on both engines.
- **Runestone Crawler:** `armor n=99 red=0.48`, so a blow keeps 52% (it was 5%).
- **Cindra red:**
  - Cause: a spell hit's white flash is undone with `setFillStyle(def.color || 0x884422)`. On a painted rig body (`10k-boss-rig.js`) that colour became a permanent multiply tint, a red-brown cast.
  - Fix: a colour within 600 ms of a white flash, or the 0x884422 default, now clears the tint. A boss's own deliberate tints still apply.
- **Thaw:** `lt_puddle` and `lt_mud` are out of `ZSLAND.SET.sp`. World 5 road dressing is down to stepping stones and worn edges (no puddles or cart ruts).
- **Runa's board:** shows "[Tab] Read Runa's board" within 2.2 tiles.
- **Sheep:**
  - Cause: they were ticked from `_heroStatusTick`, which runs only a few times a second with a single frame's dt, so they crept about 1 px a second.
  - Fix: they now tick from `WorldScene.update` every frame. Tested: 64 px in 9 s.
- **World take 5 bug:** `ZW5` had two `clear` functions, and the second overrode the patch test, so no set-pieces were ever placed. The patch test is renamed `ZW5.patch`. 23 set-pieces are now placed.
- **Title pictures:** the 76 title pictures are in the Lab's Title tab (`VTITLE140`).

## World revamp 5: Kris's feedback, and what was asked
- **Picked:** banners (except 09 and 13), edges, forests, roads, scar, vignettes, water, lift cage, set-pieces 1, 2 and 4.
- **Set 3:** maybe — drop the sheep hamlet (done).
- **Exploring set-pieces:** Tab once each. 25% chance of an ambush of 1–3 monsters; otherwise gold, food or an animal. In the game now.
- **Landmarks:**
  - Vela: "confused how you move across it", and it needs to be much wider.
  - Bram and Dunn: wider, spanning the whole river or lava.
  - Mira: realign the roads, cliff barriers that read as a massive cliff, and the lift ride.
  - Asked as **r142_wr5** (`tools/world/r142_wr5.py` → `07zt38-art-r142-wr5.js`):
    - `lm4_vela` (a plain paved road through an open gate);
    - `lm4_bram` and `lm4_dunn` (twice as wide);
    - `sc_wl_cliffs` (6 cliff pieces);
    - `sc_lift_ride_{m,f,m_horse,f_horse}` (6 frames each; refs are the hero models and the riding sheets).
- **Far backdrops (far_1..5) and skylines (sky_*):** Kris wants little videos of them in use. **Not made this round.** Next: build them in the game (beyond the coast, and along the top near the borders) and record the videos from the game itself.
- **Next in code:** bridges fitted to the land (bridge_fit), the lift roads, and the Vela pass matched to the new painting.

## Mana (Lab tab `mana142`)
- **Today:**
  - Pool: 50 + 3 a level. That is 62, 77, 92 and 107 at the realm caps.
  - Gear: 7 pieces add max mana (best outfit +55, three of the seven island-only).
  - Regen: 4/s at rest, 1.5/s in a fight, plus up to 2.5/s from gear.
  - Spells cost 16–68 (round 102 doubled them).
- **Result:** a realm's dearest spell is about 2 casts on arrival, then one per 20–45 s of fighting. Starfall is 1.6 casts at the cap.
- **Ten proposals:**
  - +5 a level;
  - a mana rune per mage tower;
  - more caster gear with mana;
  - fight regen 2.5/s;
  - spell-blade (+2 mana a hit);
  - places that refill;
  - moon-mana;
  - fairy blessing;
  - costs ×1.5;
  - a potion that fills half the pool.
- **Recommended:** level growth, runes, gear, fight regen, places.
- The tab has a calculator. Estimates are labelled as such.

## NPC lines — not finished
| Group | Lines now | Remaining |
|---|---|---|
| Villagers (34) | 3–10 each | ~1,670 to reach ~50 each |
| Fairies (20) | 19–41 each | ~300 to reach 40 each |
| Mages (16) | 1 each | ~620 to reach 40 each |
| Spirits (40) | 5 each | — |
| Monarchs, pact, fairy feast, familiars, great spirits, castles, Binders (power from Surtharn), island traders | not started | all |

Offered in the Lab: write them in batches, villagers first, a realm at a time.

## Requests
```
.\tools\sprites\paint.ps1 -List r142_hearth
.\tools\sprites\paint.ps1 -List r142_load
.\tools\sprites\paint.ps1 -List r142_wr5
.\tools\sprites\paint.ps1 -Ids crafts_4.core.f      (Vela's figure — redo.ps1 now sends characters too)
```

## Tests
- `tests/test_round142.py`: 14 checks.
- `tests/test_round140.py`: 58 checks. Updated for first-fight words now being in the dialogue box and lessons going to the ?.
