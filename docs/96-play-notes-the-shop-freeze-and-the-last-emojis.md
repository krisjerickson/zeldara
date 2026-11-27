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
