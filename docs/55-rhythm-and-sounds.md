# 55 — Round 103: the round-102 paintings in, combat rhythm, digging out, the sound picks in the game

Kris's picks are from Lab › Mechanics guide (combat rhythm, where it is taught, digging) and the 10 paintings he made with `redo.ps1 -List r102`. Round 102 is doc 54.

## 1. The round-102 paintings, in the game

Cut with `tools/sprites/intake_scenery.py` onto one new page, `assets/scenery/r102-0.webp`, plus two ground textures.

| Where | What changed |
|---|---|
| HUD | Painted hearts and banners. The banners are a little bigger (16 × 26). The mana arc keeps its drawn bar: the painted arch frame did not fit a flat bar. |
| Monster bars, boss bar | Painted frames. |
| Status effects | Painted icons over the head (23 px) with the draining ring tighter round them, and the painted overlays (ice, fire, vines…). |
| Aiming | The painted rune circle and reticle. |
| Exit portals | The sealed portal and the vault (sealed / open) paintings. |
| Bridge gates | Painted, closed and open. |
| Soul-lines | The painted rune ribbon is laid along the vein in thin slices that follow each bend, 1.25 tiles wide. The neon core and its glow stay on top. |
| Dungeon floor (the trial) | In the caverns built by code (today the Goblin King's dungeon), the painted flagstones and bricks are laid over each cavern's own colours with "overlay". Each cavern keeps its tint and gains the painted stones. The 214 designed site floors already used painted textures. |
| Sky ports | The city is a strip a quarter of the screen tall along the bottom, repeated, every other copy turned. It had covered the whole sky. Each bunker is one painted cloud bank: whole, then torn below two thirds, then wisps below one third. The bolts and bombs are painted. |

A hang was found and fixed. The first ribbon code could loop for ever on a rounding error, and the soul-line chunks stalled the page.

## 2. Combat rhythm (09t-rhythm.js)

Seven of the eight proposals got ✓; the charged swing got ✕.

| Rhythm | How | Taught by |
|---|---|---|
| Sword combo | After a sword hit, a rune-ring shines round the hero just as the swing recovers (0.28 s). Space in it chains: the 2nd swing ×1.2, the 3rd a wide finisher ×1.6 that knocks back. Pressing early, or missing the beat, starts again. | The armoury keeper |
| Axe rhythm | Two beats (the ring shines 0.36 s). The 2nd swing on the beat is a full-circle cleave ×1.8. | The blacksmith, once you own an axe |
| Perfect block | Raise the shield within 0.2 s of a blow. No damage, the striker staggers 1 s, the next swing is a sure critical ×2. | The armoury keeper |
| Roll-counter | Swing within 0.4 s after a roll: ×1.5 and a 0.5 s stun. | Pia, after the roll |
| Rune-weave | X within 1 s of a sword finisher: the spell is cast at once where the finisher went (no aiming), +25 %. | The first mage tower you win |
| Together! | Your familiar and you hit the same foe within 0.5 s: both hits +20 %, with a spark. | Your first familiar's fairy |
| Follow-up shot | A full-draw arrow at a frozen, rooted, stunned or staggered foe: ×1.5 on top of the draw (×3 in all). | The armoury keeper, once you have a bow |

- Each is a Training lesson (`r_*` in 21t-lessons.js), spoken by its teacher in the dialogue box.
- Each rhythm only works once it has been taught.
- The armoury teaches when you step out of its shop; the blacksmith likewise.
- The bonuses stack: a parry then an on-beat 2nd swing is ×2 × 1.2.
- **Assumption:** the sword's window opens as the swing recovers (0.45 s after the hit) rather than at 0.25 s as proposed. The sword cannot swing again any sooner.

## 3. Digging is gone

- The fairies' and the Fairy Monarchs' objects now lie in the open at the same spots. Each glints gold with its icon floating over it, from 14 tiles away.
- Walking over an object picks it up.
- These are gone:
  - the Fairy Trowel
  - the G key
  - the "Digging" lesson
  - the "Dig here" prompt
  - the Tome's "Press G to dig"
- Old saves keep everything they found.

## 4. The sound picks are in the game

Kris's Lab picks had run far ahead of the game: 115 effects played something other than his ★.

- `tools/audio/pick_sounds.py` put all 115 in.
  - It now takes `--ids` (batches) and `--was` (what the game had before).
  - It keeps "Today" as `<id>.cur.mp3` when it is picked with others.
  - It rotates up to seven takes (variants `.b` … `.g`; `intake_audio.py` reads them too).
- `sprites/requests/sound_picks.json` is the record. `sound_picks_was103.json` is the state before this round.
- **Assumption:** the 19 effects with more than three ★ (sword swing, axe, footsteps, roars…) now rotate through all of them. The cap is raised from three to seven, since Kris kept them all.

## 5. Lab › Sound effects, remade (79m3-lab-sfx103.js)

One table, every effect in one of five groups:

1. **To pick** — no ★ yet
2. **Remake all** — ↻ asks for five brand-new takes; your ★ keep playing until you pick from them
3. **Picked — goes in next round** — your ★ differ from what the game plays
4. **In the game** — the game plays exactly your ★; ✓ Approve when happy
5. **✓ Approved** — folded away

- Chips at the top count each group and jump to it.
- 🎮 marks the takes the game plays now.
- The older tables are folded at the bottom.
- `ZAUD.GAME103` (79m1b) is what the game plays.
- The picks are `sfx93-<id>` (★), `sfxre-<id>` (remake) and `sfxok-<id>` (approve).

Next round: every effect marked ↻ gets new words and five ElevenLabs takes (a new `audio6.ps1`, key by Read-Host). Every "next round" pick goes in with `pick_sounds.py`.

## 6. Also

- Inventory: Spells and Skills are separate tabs (round 102, mid-round).
- Lab: "Waiting for your picks" drops the combos ask and the round-93 sound ask.
