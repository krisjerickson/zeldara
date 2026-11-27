# 96 · Round 140: Kris's play notes, the shop freeze, and the pop-ups' last emojis

## The seventeen play notes
| # | Note | Done |
|---|---|---|
| 1 | Rolling foes look wrong and spin choppily | They now spin round their middle (not their feet), smoothly, by the distance rolled. A stuck white flash is cleared. No new frames needed. |
| 2 | Minimap arrow points down when moving right | Right is 0, and `0 || down` fell through. Fixed. |
| 3 | "Tonight" in the welcome back | Now "Three things to do next" and "Rest for now". |
| 4 | Name your save; show where you are | ✎ Name on each save; each save shows where you stood. |
| 5 | Full screen; the Windows key | ⛶ on the bar. In full screen the Windows key and Esc stay in the game (hold Esc to leave). The click that starts or continues a game goes back into full screen if you used it last time. |
| 6 | Arrows faster than the hero | Twice as fast (760), reaching a little further. |
| 7 | Spell cooldowns | A third of what they were; mana is the limit. |
| 8 | Aim at animals | The gold ring finds deer, boar and other game when no foe is in range. |
| 9 | Longer reach; shot foes come for you | The ring reaches 480 (bow) and 420 (spells). A foe hit from afar chases you for 6 s, then walks home. |
| 10 | A double of the hero in Cinderheim | Not found on foot or on the lava unicorn. Needs a screenshot or the place. |
| 11 | A roll cooldown | Its own slot (ALT) with the cooldown draining. |
| 12 | Pause when the browser loses focus | A "Paused — click to keep playing" veil; the sound stops too. |
| 13 | Hits pause a rolling foe | A blow glances off for half; holds don't stop it. Rolls are about half as long (1.5 s, two bounces). |
| 14 | Shield foes take no damage and always turn | A shield takes at least 40 %. It turns slower in front, waits longer, then turns slowly once you are behind. |
| 15 | Foes dodge sword hits | A dodge is now a graze: half damage, never a miss. The same for the "tiny" miss. |
| 16 | Boss teleport tell | Its ghost appears where it lands, with a ring, a light and a line, for 0.85 s (was 0.45). |
| 17 | "Wake at the door of …" didn't work | The door button stands apart from the village button. It waits for the world to be running, then puts you at the door and holds you there. |

## The notes that came after
- **Tilda froze the game.** Her shop window read a `wood` count that was removed rounds ago. The error happened inside the game loop, and the loop never ran again. Fixed. Also, any fault in one frame no longer stops the game (the loop carries on and shows a short notice).
- **Runa.** During the first walk, Tab opened her bounty board, because the board and the waystone beside her took the key. Now a villager with story business is answered first. Any villager you stand closer to than a door is answered before the door.
- **Oswin.** Villager chatter waits while the first walk is on. Oswin's tall tales only come when he has nothing new to tell.
- **The guild hall.** The Saga Loom button is gone. Room names now sit at the top of the room. The home's Trophy shelf button is on the right edge.
- **Banners.** Kris's 18 ✓ are in the rotation (9 and 13 ✗).
- **The village ground.**
  - No season pieces in the village.
  - The boat being tarred is beside the pier, and solid.
  - Outside the village, no pieces on roads. Upright pieces are solid at their foot; flat pieces can be walked over.
  - The vegetable beds are solid.
- **The crypt of echoes.**
  - It is now 150 px tall and solid.
  - Its window is opaque, with the picture as a header.
  - Lab: three ways for it to be its own growing hall.
- **Planter beds** are solid. There are no more Tome pop-ups. Full health always shows full hearts. The side-quest arrow shows the paces left.
- **Overlaps.** Checked in the world, the home, the guild and a shop. Room names and the day chip were moved.
- **Sound.**
  - Nothing plays while the tab is hidden or the game is paused for focus.
  - Effects and ambience are 20 % quieter by default, and once for saved settings.
- **The title** says NEW PLAYER (in the game and on the home page).
- **Gods unnamed.** Two lines named Odin before he is freed. Both are fixed.

## The pop-ups' emojis (`27z4-emoji.js`)
- Every pop-up, notice, card and menu is watched.
- **194 emojis** are swapped for painted icons we already have.
- **124 more** have no painting yet. In a sentence they are dropped. Where one stands alone (as the whole button), it stays until painted.
- **Painting request:** `r140_icons`, 5 sheets, ids `em_<codepoints>`. Each icon appears as soon as its sheet is in. The source is `tools/world/r140_icons.py`.

## The feast
- **The song:** we already have **mu_celebration**.
- **The Lab:** a mixer plays the song and any crowd take (31 takes) together. Kris sets the balance and ✓ "Use this mix".

## Lab → Round 140
- What was fixed.
- The feast mixer.
- The ground pieces' rules.
- The crypt as its own hall: grow it as a long hall, a round chamber, or a deeper stair, with five stages.
- Hygge, studied, and seven shop and interior proposals.
- Twelve places for the painted logos. The title keeps the one Ringed Z.
- The play-through sweep, and the emoji list.

## Music pace (Kris's picks)
- **Slowed:** 11 songs, to 92 % or 85 %.
- **Remade calmer:** 6 songs — Asgard fallen, Cinderheim by day, the feast hall, home, the mage towers and Fernheim by night.
- **Kept:** the title.
- All of this is next round.

## For Kris to run
```
.\tools\sprites\paint.ps1 -List r140_icons
```

## Round 140c: the Flow feedback, the crypt, and the later play notes
### The Flow lab (`07zt32-flow-fix3.js`, list `r140_flow`, 59 pictures)
Why the repaints missed:
- The change was buried at the end of a long prompt. It now opens each prompt as "MOST IMPORTANT" and closes it again.
- Old panel references pulled the old mistakes back. They are replaced by the right references.
- The Lodestar shots never got Kris's Lodestar painting. Now every one gets `lodestar_ref`.
- Underground Surtharn shots carried the aurora-sky line. They are now underground with no sky, each with its phase (`sc_ref_surth_p1..6`, cut from `sc_surth_phases`).
- Vela's own sheet is the admiral. A new sky-captain sheet (`sc_vela_ref_140`) is painted first and used.
- Several shots used the same camera. Each now has its own.
- The feast keeps the picture Kris liked (`sc_ref_celebrate_01`), with grown-ups only.
- 23 caption notes are in.

### The crypt of echoes (Lab tab, list `r140_crypt`, 7 sheets)
Three ways it can grow: the long hall, the round chamber, the deeper stair. Each is painted full and as a five-stage strip. The door on the Green is painted at six stages.

### What should move (Lab tab) and the bars (Lab tab), list `r140_motion`
- Asked now:
  - Oswin's walk (`ZSPR.WALKERS`). He is the only one who walks without walking frames.
  - The sheep and the lamb as animals (`ZSHEEP`: they graze and amble round their spots once painted).
  - Both cauldrons bubbling (`ZMOVE` plays any `mv_<id>_1..4` loop in place of its still).
  - Six painted bar frames.
- Thirty more stills are listed, each as a painted loop or a code effect, for Kris to ✓.

### Play notes
| Note | Done |
|---|---|
| Waystone too close to Runa's board | The board stood on the waystone's own tile. It now stands 7+ tiles away, off the square. |
| Walking up to the crypt or a wall puts you behind it | The hero is sorted by the feet (+12), not the middle. The crypt's depth and foot are fixed too. |
| Can't tap Pia on phones | A tap on her talks to her. The crypt keeps 7 tiles from her camp. |
| Outline offset on phones | Under the zoomed camera the outline is cut by drawing, not by a mask. |
| Oswin's lines at the top during the instructions | They wait for the first walk and the first fight to be over, and never show over a dialogue or a card. |
| Journal: can't choose quests | The journal's box swallowed the click. ☆ Make current answers again (capture). |
| The wolf at the sheep pen doesn't show | The lamb was painted huge and stood on it. The lamb is now lamb-sized and the wolf comes from a little way off. |
| A sheep following you | After the fight the lamb runs back into its pen and stays. |
| Pop-ups in battle; the saga card | Lessons, hints and hooks wait until a fight has been over for 4 s, then come one at a time. There are no saga-card offers except at the very end. |
| The thaw fair too soon; a pixel seedling | The first festival waits for the first win plus a cleared site (or day 3). Its pieces stand off the square, by the houses. The bobbing emoji sign is gone. |
| Wreaths and banners in odd places on the houses | No wreath or step piece on the ground. Each house gets a banner and a lantern at its front corners. |
| Mana in the inventory before a spell | Mana shows only once you have a spell. |

### For Kris to run
```
.\tools\sprites\redo.ps1 -List r140_flow
.\tools\sprites\paint.ps1 -List r140_crypt
.\tools\sprites\paint.ps1 -List r140_motion
```

### Paintings in (r140_crypt, r140_motion)
- **Characters:** cut and packed into the atlases. Oswin walks; the sheep and the lamb are animals that graze and amble.
- **Scenery:** cut and packed. Both cauldrons play their bubbling loops (ZMOVE). The six bar frames and the crypt paintings are in the Lab.
- **Lab:** the crypt tab, the bars tab and "What should move" now show the paintings. The cauldrons and walks are shown animated.

### The fair greeter (`ZFAIR`, Lab: The fair greeter)
- **When:** the first time you come into the village after a fair begins, once per fair, and never during a fight, a story scene or the first walk.
- **What happens:**
  - The greeter finds a way round the houses to you (`ZWALK.route`).
  - They say three lines: what this fair is, the three games at the board, and the ribbon.
  - Then they walk back to the board and stand there while the fair lasts.
- **The same at all five fairs;** only the first line and the closing remark change per fair.
- **Who:** Marta the Cart Vendor for now. She brings her cart for every fair, even before she lives in the village. Every villager has walking frames, so any of them needs no new paintings.
- **Proposed for Kris to pick:** Runa, Tob, Fenwick, or a new travelling fair-crier (2 new sheets).
