# 62 — Round 110b/c: the first walk fixed; a current quest; camps and quests on the map; fairy rings heal; and more

## The first walk (21v)

- **Oswin waits for the Green** (Kris: "the background hasn't yet rendered, and it looks weird"). He appears, and starts speaking, only once the Green is drawn: every painted ground chunk on screen mounted and finished, plus a moment more. The safety cap is 25 s.
- **Every swing counts** (Kris: "I swung my sword 3 times and nothing happened … make it so that anywhere swinging works"). Swings are counted from the swing itself (Space, the ⚔ button, anywhere), not from one key that the village could swallow.
- **Oswin answers each step** and, after the three swings, leads you straight to his guild. The map step is gone; he says Q opens the map any time.

## A current quest (21q3)

Kris: "a way that you can have a current quest, and it will show up on the map like it does for the guild hall".

- **Choosing it:** any quest can be made current with "☆ Make current" in the journal, or ☆ beside it in the big map's quest list. Click again to let it go. With none chosen, the next step of the Saga leads.
- **The gold arrow** on the little map points to it, as it did for the guild hall.
- **On the big map** it is a pulsing gold ★ pin with its name, beside your "You" ring.

## Quests and camps on the map (21q3)

- **Side quests with a place:** Oswin's purse (its camp), Old Nell's net and Tumbler Pia's pins stand in the map's quest list and as numbered pins with the rest. They can be made current like any other.
- **Monster camps** you have explored near show as small tents:
  - red while guarded
  - green once beaten
  - grey once the one-time reward is taken

  Zoomed in, the reward each one guards shows beside it (💰 🍖 💧 🔷 ✨ ᚱ 🏹 💎). A line under the quest list explains the colours.

## Old Nell's net (21u, 09)

Kris: "not currently possible, as the skeleton dog standing over it is in the highlands, and stuck there".

- **Where it lies:** the net is now on a Mirror Lake shore you can walk to from the Green without leaving the Grasslands: the farthest such shore, found by walking out over open ground. A save whose net lay out of reach gets the new place.
- **Its guards** stand on ground you can reach, and never sleep away by day (they were night creatures).
- **The net itself** is a drawn heap of knotted net with cork floats, not the 🕸 emoji. A painted one is ordered.

## Fairy rings heal (10zr)

Kris: "the glowing mushroom rune glades. let's make these slowly heal you, and a pop-up the first time".

- Standing inside a ring of glowing toadstools (the Queen's Ring and the small rings of the Fairy-Ring Meadows, the Glade isle's ring) mends you by about 2.5 % of your health a second.
- The first time, a pop-up from "The fairy ring" explains it. After that, a soft "+n ❤" and a ripple show it working.

## Animals (10-scene-world)

Kris: "make the animals slightly slower than you … or they can scurry fast, but then they slow down and stop sometime for you to catch up".

- **Big animals** (deer, boar, bears…) dash at no more than 166 against your 180, tire to a trot, and after about 2.8 s stop for 1.3–2.2 s to catch their breath.
- **Small animals** dash, tire, then rest and let you come within about a tile before running again. After four dashes they are gone.

## Smaller fixes

- **Death pop-up:** clicking "Trace the rune" works, not only Enter. The pop-up stands on top of everything, and a click anywhere on its button counts.
- **Waystones:** every waystone is free to travel to (`WM_FREE`).
- **Fishing hut:** now 4 × 4 like the houses (it was 3 × 3).
- **Pia's juggling pins:** larger (about knee high), drawn as proper clubs with a soft glint instead of the small 🎳.

## Overworld chests (10h, 10b)

Kris: "chests in the overworld overall should be reviewed and updated, where needed, with painted images".

I reviewed the chests in the overworld: the camp chests and the hidden caches, which use the same painted chest.

- **Fixed:** the open chest's lid ran off the top of its frame. Each picture is now fitted to the frame.
- **Before:** all four realms' chest camps showed the same bandits' chest — the Grasslands' Bandit Stash, the Wetlands' Sunken Chest, the Highlands' Dwarven Strongbox and the Ashlands' Obsidian Coffer.
- **Now:** each realm's camp and hidden cache uses its own chest, closed and open, as soon as the painting is in (`CAMP_CHEST_V`, `CACHE_CHEST_V`). Until then, they keep the painted bandits' chest.

## Ordered paintings

To make both sheets: `.\tools\sprites\redo.ps1 -List r110b`

- `sc_r110_pins`: the three juggling clubs, Old Nell's net (heaped and spread) and a club lying down.
- `sc_r110_chests`: the sunken chest, the dwarven strongbox and the obsidian coffer, each closed and open.

## Sound effects: the three still wrong

The three effects marked ↻ Remake are Starfall, Chain Lightning and Berserker. Their new takes were written in round 104 (five each, `sprites/requests/sfx_remake.json`), but they have not been made yet: there are no `.x1`–`.x5` files in `audio\incoming`, and the Lab says "0 of 5 made · waiting for audio6.ps1".

- **To make them:** `.\tools\audio\audio6.ps1` (15 takes, about 700 credits).
- **New in the Lab:** each of these rows has a 💬 comment box: "If the new takes are still off, say how". The note is saved as `sfxnote-<id>` and used for the next remake.

## Kling: the Mira video (06_mira_zeldara_p1)

**What came out:**

| Time | What played |
|---|---|
| 0–4 s | @image2, not @image1. The ash-warden's ash turned into Zeldara (a morph). |
| 4–8 s | @image3 with the cage door and Mira's gear from @image2 pasted in. |
| 8–12 s | A new cliff, not @image3, collapsing into rubble and a burst of water. |
| 12–16 s | @image4 and @image5 merged into one picture. |
| 16–20 s | @image1, last, with the ash-warden exploding. |

**Why:**

1. **The order:** Kling started on image 2 and ended on image 1, so it most likely took image 1 as the end frame. The order the pictures sit in Kling's upload panel is what counts; the prompt's @image numbers cannot fix that.
2. **The words named the events to avoid** ("no chains, no bursting, NO lift"). Kling has no negative box and reads these as things to show.
3. **The actions invited invention:** "rubble shifts" became a collapse, and "the ash-warden fades to ash" became a morph.
4. **The dolly-zoom on shot 3** made it invent a new scene.
5. **Five pictures in 20 s with about 5,900 characters** is more than it holds apart.

**What to try** (in the folder):

- **`PROMPT_v2.txt`:** about 1,500 characters. Only positive words, small "living painting" motions, simple camera moves, no special camera, and the order stated plainly. Check the upload panel shows the pictures 1→5 before making it.
- **`ONE_SHOT_AT_A_TIME.txt`:** the surest way. Five short clips, each from its one picture, saved as `mira_zeldara_01.mp4`…`05.mp4` in `sprites\video_incoming`. Once part 2's five (06–10) are in as well, the game joins all ten in order. Nothing can then bleed from one picture into another.

Once one of these works, all the folders can be rewritten the same way.

## Tests

- `tests/test_round110b.py` (14): the Green-drawn wait; swings in the village; animals; pins; the current quest; camps; rings; the net; the side quests in the list; the hut; the death click; free waystones; the open chest fits its frame.
- `test_round110.py` updated (the spawn waits for the Green, any swing counts).
- `test_round100.py` updated (three swings → follow).
- `test_waystone_clicks.py` updated (free; Tab from on the stone).
