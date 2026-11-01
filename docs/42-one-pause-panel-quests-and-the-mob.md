# 42 — Round 85: one pause panel, map and quests in one, the quest path, adventure sites you can't just run through

Kris (Oct 31) asked for: full screen and fewer icons on a phone; ONE paused interface with tabs; the broken links fixed; map and quests in one; a deep dive into the quests; adventure sites balanced so you can't just run past the monsters (chase, the mob at the door, ways to take on the mob, ways to evade it, other tactics); a Begin Quest button; sound on/off and balance. Answers (docs/08 › Round 85): U1 one ☰ icon on a phone · A1 the proposed table · A2 both evasions · B3 boss shapes in the Lab first.

## 1. The one pause panel — built (`24p-pause-panel.js`)

- Any of its screens open → a strip of tabs across the top: **Map & Quests · Inventory · Skills & Familiars · Mounts · Tome · Sound · Controls · Dev**, ✕ Resume. A tab swaps the screen without un-pausing.
- **Desktop:** the icon bar stays; each icon opens its tab (Quests is folded into Map & Quests). Esc with nothing open opens the panel where you left it; Esc in it resumes; Q opens Map & Quests.
- **Phone/tablet:** the icon bar is replaced by one **☰** (top centre) and **⛶ full screen** (Fullscreen API; an iPhone has none for web pages → a note to use Share → Add to Home Screen).
- **Sound tab:** All sound on/off + level; Music, Ambience and Sound effects each on/off with a level (kept per browser). The 🔊 icon opens it; right-click is still all sound on/off.
- **Fixed:** the Inventory icon never drew the pack (an empty or stale screen); Controls' Save Game and Main Menu called functions that did not exist; the quest marker lit every site of the quest's type.
- **Begin Quest** (`04d-profiles.js`): choosing Zeldara/Zeldor only selects; the button (showing the hero and the difficulty) starts — a double-click still starts at once.

## 2. Map and quests in one — built (`21q-quest-map.js`)

The map's side panel opens with **Next on your path** (one line of the main thread, with 📍) and **Your quests**, numbered, the same numbers standing on the map as pins: the guild quest (gold, pulsing); per opened region its boss tower and dungeon (or, while sealed, the treasure sites that unseal them); the harbour, sky port, mage towers and castle isles you have found and not finished. 📍 centres the map; Quest journal opens the full journal.

## 3. The quest deep dive

**How the game carries you today:** per realm (1 Grasslands → 2 Wetlands → 3 Highlands → 4 Ashlands): clear the 3 treasure sites → the ★ boss tower and boss dungeon unseal → the tower frees the master builder, whose crossings open the next realm; the dungeon gives a mount. Harbours (familiars), castle isles (12 skills), sky ports (fliers) and mage towers (16 spells) are optional. Level caps 5 / 10 / 15 / 20. All 4 towers and 4 dungeons raise the four forges (Ember → Cinder → Slag → Ash, each key opening the next) → Muspelheim (Surtharn) → the Spirit Saga, the Lodestar and Godsbane → Asgard's citadel → the ending.

**What's wrong with it:**
1. Only **one quest can be active**, and only taken at the guild — the journal shows the four "main" quests per realm, but the real thread (treasure sites → boss) isn't stated anywhere. *Built:* "Next on your path".
2. **Castles, mage towers, fairy quests and spirit shrines are not in the journal** (they live in the inventory, the Tome, nowhere). *Built (map):* castles and mage towers you have found are on the quest list; *proposed:* fairy quests and spirit shrines join it.
3. **The optional half is invisible until found**, and nothing hints at it. *Proposed:* the guild board gives a rumour per realm ("a castle isle lies off the eastern shore") that marks a rough area on the map.
4. **Level gaps:** the caps can leave a player under-levelled for a realm's boss if they rushed (worse now with the mob rules). *Proposed:* each pin shows a suggested level, red when you are below it.
5. **The forges → Muspelheim → saga stretch** is a single line in the journal. *Proposed:* its own section with each step (which forge is lit, which key you hold, the shrines left).

## 4. Adventure sites — the chase and the mob at the door — built (`16y-site-rush.js`)

| difficulty | chase after it last saw you | speed bursts | the stairs are mobbed at |
|---|---|---|---|
| Hearthside | — | — | never |
| Wayfarer | 8 s | — | 5+ near |
| Shieldbearer | 10 s | +20 % | 4+ near |
| Ragnarök | 12 s | +35 % | 3+ near |

"Near" = within 4½ tiles of the stairs and after you (not bosses, the unseen, the calmed). At 2 or fewer you always push through. While mobbed, a red rune ring pulses round the stairs and Tab there says how many are on you.

## 5. Taking on the mob — proposed (to build next)

- **Axes cleave** (default): every axe swing hits all in a 90° arc in front; the arc widens with the weapon's tier and gems — 120° (tier 2), 180° (tier 3 / a Cleave gem), 270° (forged), 360° (the Sovereign axe or two Cleave gems). Damage beyond the first target ×0.7.
- **Blast heads:** arrows and bolts get a blast radius from ammo (Blast arrows 28 px, Thunder bolts 40 px) and from a Bow gem.
- **Essences** (a new potion class, brewed at the apothecary; 1 at a time, 45 s, 90 s between): *Berserker's Essence* (+60 % cleave arc, +25 % attack speed, −20 % defence), *Wolf-blood Draught* (every kill heals 4 % and +5 % speed, stacking ×5), *Thunder-gut Tonic* (your blows chain a spark to one more foe), *Troll-hide Salve* (−35 % damage taken from behind and the sides).
- **A mob skill — "Ragnarök's Ring"** (cooldown 60 s): a ground slam that knocks everything within 3 tiles back 2 tiles and stuns 1 s — space to breathe or to reach the door.
- The default stays: at Shieldbearer and Ragnarök, a careless hero is overrun.

## 6. Evading the mob — proposed (A2: both)

- **Huldra's Veil** (skill, 75 s; potion, rarer): unseen for 6 s; monsters lose you, search where you were last seen and drift back to their patches (they stop counting at the door). Striking ends it.
- **Myrkr's Eye — "lights out"** (skill, 90 s; potion): the site goes dark for 8 s; your eyes glow blue and you see every monster and wall as a blue outline; monsters cannot see you unless right beside you (1½ tiles).
- **Hiding:** standing behind a pillar, crate or tall prop (out of line of sight) for 1.5 s drops a monster's chase (the chase rule respects sight).
- Combine with roll, blink and the familiar; long cooldowns keep it an adrenaline move, not a free pass.

## 7. Other tactics — proposed

- **Decoy totem** (a tool from the forge): set down, monsters within 5 tiles go for it for 6 s.
- **Doors and gates you close** behind you in built sites: 4 s for the mob to batter through.
- **Bottlenecks:** a corridor fight counts only who can reach you; the mob rule counts the door's ring only.
- **Familiar taunt** (new familiar order): the familiar draws 2 monsters' aggro for 5 s.
- **Fire oil / caltrops** (throwables): a slowing or burning patch across a corridor.

## 8. Boss attack shapes — in the Lab (B3: Lab first)

Twelve animated shapes (Lab › Boss attack shapes; `79j-lab-bossshapes.js`), each measuring live its safe share and places (all ≥ 30 %, in 2+ places or one open area ≥ 40 %): rune rings, runestone checker, islands of safety, spiral arms, cross and saltire, closing jaws, hex comb, falling shadows, shelter from the storm, aurora curtains, heartbeat, mirror halves. Kris ☆s them and notes which bosses get which; then they are wired into `09bb BossPat.PAT`.
