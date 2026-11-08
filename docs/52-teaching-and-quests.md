# 52 — Teaching the game, and the quests that carry you through it (round 98 review)

Kris (Nov 8):

> "we need to make some sort of tutorial and better guidance for what you need to do within the game. Do a deep dive on the entire game, what we need to teach, when we should teach it and how. Consider a new tab in the 'inventory' that is 'training' or learnings where you can review these. Also do a deep dive on our quests, how you get the quests, how NPCs direct you to the quests … review of all quests … making sure these all still make sense, work and help you progress through the game, with side-quests being indicated as such. Remind me, too, of what mechanisms we currently have related to all this, and make new recommendations of how to approach. Do the review and ask me basic questions first, and then for any options … build out a section in the lab."

This is the review, read from the code as it stands after round 97. The basic questions are at the end. The options will go into the Lab once those are answered.

## 1. What the game asks of a player, in order

Everything below is something the player has to know, find or do. Mark: **needed** = on the road to the ending · *side* = optional.

**The first minutes (the village):**
- Movement, attack, Tab to interact.
- Choosing a difficulty.
- The guild, the shops, resting at Home or the tavern.
- The map and quests, the inventory, saving (it is automatic).

**Each realm, the same loop four times** (Grasslands → Wetlands → Highlands → Ashlands; level caps 5 / 10 / 15 / 20):

- **needed** Clear the realm's 3 **treasure sites**: towers and dungeons with an elite guard, a treasure vault and a relic. They unseal the realm's ★ boss tower and ★ boss dungeon.
- **needed** The **★ boss tower** frees the master builder: Bram, Mira, Dunn or Vela. His crossing opens the next realm, and the village grows a stage.
- **needed** The **★ boss dungeon** gives a mount that crosses the next realm's terrain. Its freed great spirit gives the realm's **soul gem**.
- **needed (since round 52–55)** Free at least **6 of the realm's 10 bound spirits** at the bindstones (beat each Binder). Each gives a Soulglass shard.
- **needed** Bring 6 shards to Sólveig in the Glimmerhall, who fuses them into the realm's **lattice**. The Glimmerhall rises once the first familiar island is won.
- *side, but its pieces are needed* The **harbour → familiar island** gives a familiar. The island trader sells the realm's **metal**, which is needed for Mira's tray.
- *side, but one is needed* The **castle isles**: 12 skills (Z). The first castle cleared anywhere opens **Mira's workshop**, and her **hearth trays** need a metal and a soul gem.
- *side*:
  - the **mage towers** (16 spells, X)
  - the **sky port** (fliers; all four give the Sky Eagle)
  - the **fairies** (20 trials that teach familiar skills)
  - the **Fairy Kings** (3, each a familiar slot)
  - **digging** (G)
  - the **camps** (food, wells, shrines, chests)
  - the **forge tree** at the blacksmith
  - the **jeweller**, the **apothecary**

**Early side quest:** *The Tumbler's Lesson* (Pia, outside the Rime Spire) teaches the **Roll** (Alt).

**The forges (all 4 boss towers and 4 boss dungeons done):** the four forges rise and open in turn (Ember → Cinder → Slag → Ash). Each forge has:

- floor 1, its trial (each place's rules pop up)
- floor 2, the spirit galleries
- floor 3, the forge-master, warded so that only Sovereign bites hard
- its **hearth**, where Lattice + Tray make the realm's **Heartglass**
- its key, which opens the next forge

**Muspelheim:** the four keys open it, and Surtharn has six forms. At the great hearth, the **Sovereign staff** and **all four Heartglasses** make the **Lodestar**. The staff comes from the apothecary's staff line, 6,000 gold plus gems, and only once the forges rise. Then comes the escape.

**Asgard:**

1. It comes down on Mirror Lake.
2. Your twin in the library finds the word (Godsbane, V).
3. You set the Lodestar in the pier's notch, and the Bifröst rises.
4. In the citadel, Solmyrk has three forms.
5. The feast hall, then the truth.
6. The spirits go home: the village changes, the celebration, the credits.
7. **After the end:** the World Tree under the lake (all 40 spirits), the hamlets, the children.

**The Dragon:** all 16 "main quests" (4 towers, 4 dungeons, 4 harbours, 4 sky ports).

## 2. What teaches and guides today (the mechanisms we have)

| Mechanism | Where | What it does well | What it misses |
|---|---|---|---|
| **Controls reference** | pause panel → Controls | one list of keys | Static, and missing the roll (Alt), dig (G), change ammo (C), Tome (T), Godsbane (V), Shift+P mana, hold P to throw a flask. Nobody opens it. |
| **The forge rules pop-ups** (16j) | each forge floor and Muspelheim hall | **The best teaching we have.** It pauses, steps through the rules with the painted pieces, has "Begin", "Don't show this again", and "? Rules" to read again. | only in the forges |
| **One-time notices** (`ps.seenEl`) | weak / resist / boss ward / Muspelheim ward | just in time | A toast that fades in 3 s, so easy to miss; can't be read again |
| **NPC dialogue boxes** (ZDLG, round 84) | everyone who talks | paced, paused, painted face | Nobody uses them to *guide*. The village folk say colour lines, and Elder Runa and the twin say lore. |
| **The guild** (Master Oswin) | village | the quest list opens there; "Accept" only works there | **Oswin never speaks.** Tab opens the list. **Accepting changes nothing**: every quest completes whether accepted or not, and "accepting" only lights a pin. |
| **Map & Quests** (21q, round 85) | pause panel, Q / B | "Next on your path" with 📍, numbered pins, distance and direction | The path stops at "the next forge awaits", then says "see the Quest journal". It never mentions the spirits, the lattices, Mira's trays, the island metals or the Sovereign staff, all of which are **needed** for the Lodestar. The roll quest isn't pinned. |
| **The quest journal** | Map & Quests → 📜 | everything in one place, per realm | Headed "Section 1: Grasslands". Sixteen generic quests ("Dungeon Crawl" ×4, "Tower Rescue" ×4…), none marked side or main. Castles and mage towers are listed but fairies and spirits aren't. The forge and Muspelheim blocks only appear late. |
| **The Tome** (T) | pause panel | monsters, mounts, familiars, spells, items, places, characters, quests (fairy objects), Elements, Forge tree, **Paths** (the tech tree: realms, castles, mage towers, fairy skills) | It's a reference, not a teacher. "Paths" is the closest thing to a progress map, and it's three clicks deep. |
| **Interaction prompts** | "[Tab] …" over things | clear | only once you are next to the thing |
| **Locked-thing messages** | "🔒 sealed — it opens with …", the hearth says what's missing | honest | only when you bump into the lock |
| **The cut-scenes** (ZSQ queue) | story moments | the *why* | they never say *what to do next* |
| **Death pop-up** | on death | says what it cost | — |
| **Touch controls** | phone / tablet | every button labelled | — |

## 3. What is wrong (the findings)

1. **No first minutes.** After the opening you stand in the village with nothing telling you the keys, where the guild is, or what to do first. Doc 07 flagged this in September; it was never built.
2. **The guild is a menu, not a place of guidance.** Oswin is painted but silent. "Accept" is a ritual with no effect, and only one quest can be "active".
3. **The real road is hidden.** The ending needs, in order: 24+ spirits → 4 lattices; a castle → Mira's workshop; 4 island metals and 4 soul gems → 4 trays; 4 Heartglasses; the Sovereign staff from the apothecary at 6,000 gold. The path line and the journal never tell you any of it. You find out at the great hearth.
4. **Main and side aren't told apart.** Harbours and sky ports read like main quests (the Dragon needs them) but the story doesn't. Yet the islands are *partly* needed for their metals, which nobody says.
5. **The roll quest is easy to miss.** It only shows in the journal (you found this in round 91).
6. **Teaching is toast-deep.** The few one-time tips vanish in seconds and can't be read again. The forge pop-ups are the only lessons you can review.
7. **The Controls page is out of date** (seven keys missing).
8. **Smaller problems in the quest texts:**
   - Sky Exploration says "pick a weapon, sky mount or gem". To check against what the sky port gives now (fliers; the Sky Eagle for all four).
   - "Tower Rescue … free the captive craftsman" should name him (Bram…).
   - "Dungeon Crawl … mount + gold" should say it's the mount that crosses the next realm, and now also the soul gem.

## 4. What to teach, when, and how — the lesson list

**Ways of teaching** (from the best game tutorials, and from our own forge pop-ups that worked):

- **Show, then let them do.** One short card with a painted picture, then the thing itself. No walls of text.
- **Just in time.** Teach a thing the first time it matters, never all at the start.
- **Can be read again.** Every lesson goes into the Training list the moment it is taught.
- **Never blocks an expert.** Lessons can be turned off ("I know how to play"), and Hearthside can show more of them than Ragnarök.

| # | Lesson | When it is taught (the trigger) | How |
|---|---|---|---|
| 1 | Moving, attacking, Tab | the first steps after the opening | the twin walks you out of Home: three prompts in a row, each done to move on |
| 2 | The pause panel, the map, "Next on your path" | the first time you leave the Home | card + the map opens on its own once, with the 📍 lit |
| 3 | The guild and quests | entering the guild | Oswin speaks (ZDLG) and gives your first task |
| 4 | Shops, gold, selling | entering any shop the first time | card |
| 5 | Resting and the tavern cup | low health in the village / the tavern | card |
| 6 | The shield (Shift) | the first time you are hit hard | card |
| 7 | Bow, ammo, change ammo (Ctrl, C) | buying your first bow | card |
| 8 | Monsters guard camps | the first camp you come near | card |
| 9 | Treasure sites unseal the boss | the first adventure site door | card |
| 10 | Inside a site: fog, stairs, the chase, the mob at the stairs | the first floor | card (like the forge rules) |
| 11 | Potions and food (P, O) | the first potion / food picked up | card |
| 12 | Levels and the realm's cap | the first level-up / reaching a cap | card |
| 13 | Death and its cost | the first death | the death pop-up adds a "what to do" line |
| 14 | The roll (Alt) | Pia's lesson, done | card, then a short practice |
| 15 | Elements, weak / resist | the first weak or resisted hit | card (replaces the toast); links to the Tome's Elements |
| 16 | Waystones and travel | the first waystone | card |
| 17 | Bindstones and spirits | the first Binder | card |
| 18 | The Glimmerhall and lattices | the first shard | Sólveig, in her own words |
| 19 | Familiars (N) and the fairies | the first familiar | card + the first fairy's lines |
| 20 | Digging (G) | the first fairy errand | card |
| 21 | Skills (Z) | the first castle | card |
| 22 | Spells and mana (X, Shift+P) | the first mage tower / first spell | card |
| 23 | Mounts (M) and crossing terrain | the first mount | card |
| 24 | Mira's trays: metal + soul gem | the first castle cleared | Mira, in her own words |
| 25 | The blacksmith's forge tree, the jeweller, the apothecary | entering each the first time | card |
| 26 | The boss ward (fight close) | the first boss | card (replaces the toast) |
| 27 | Sky ports | the first sky port | card |
| 28 | The forges: heat, the hearth, Heartglass | the first forge | the forge rules we have (they join the list) |
| 29 | The great hearth: staff + four Heartglasses | the forges rising | Oswin's next task, and the twin |
| 30 | Godsbane (V) | your twin's lesson | card |
| 31 | The Bifröst and Asgard | Asgard down | the twin |

## 5. The Training tab (your idea)

A page you can open any time listing every lesson you have been taught. Each shows its picture, its steps, the keys (and the touch buttons on a phone), and "Show me", which plays a short demo or highlights the thing on the map where it makes sense. Lessons not yet met show as ??? with a hint ("taught when you first meet a Binder"), like the Tome. There's a switch for "Show lessons as they come / Only in the Training list".

**Where it lives** is the first question. Your idea is the inventory. Other homes are a tab in the pause panel next to Controls (replacing the static Controls page, since every key would be in a lesson), or a chapter of the Tome.

## 6. The quests — how you get them, and the full review

**How you get quests today:**

- **The guild:** the 16 realm quests. Accepting only marks one with a pin.
- **NPCs:** Pia (roll), the fairies (familiar skills), Sólveig (lattices), Mira (trays), the twin (Godsbane), plus the forges' and Muspelheim's own pop-ups.
- **Finding things:** castles, mage towers, camps, bindstones, the treasure sites (pinned on the map once seen).
- **The story:** cut-scenes and locked doors.

**Every quest, checked:**

| Quest | Type | Got from | Works? | Makes sense? | To change |
|---|---|---|---|---|---|
| Treasure sites ×12 (3 per realm) | **main** | found / map pins | yes | yes | name them as the first step in the journal ("Unseal the boss: 2 / 3") |
| ★ Boss tower ×4 (Tower Rescue) | **main** | guild | yes | yes | name the builder and what his crossing opens |
| ★ Boss dungeon ×4 (Dungeon Crawl) | **main** | guild | yes | yes | say mount + **soul gem** (needed later) |
| Harbour → familiar island ×4 (Island Expedition) | side (but its **metal** is needed) | guild | yes | partly | mark side; add "the island trader sells the realm's metal (Mira needs it)" |
| Sky port ×4 (Sky Exploration) | side (Dragon / Sky Eagle) | guild | yes | reward text outdated? | mark side; fix the reward text |
| Castle isles ×12 (skills) | side (the first one is **needed**: Mira's workshop) | found | yes | yes | mark side; the first castle's line says it opens Mira's workshop |
| Mage towers ×16 (spells) | side | found | yes | yes | mark side |
| The Tumbler's Lesson (roll) | side, early | journal only | yes | yes | Oswin's first task, pinned on the map |
| Fairy errands ×20 + trials | side | the fairies | yes | yes | into the journal per realm (now Tome only) |
| Fairy Kings ×3 | side | the henges | yes | yes | into the journal |
| Bindstone spirits (40; 6 per realm needed) | **main** | found | yes | yes | its own journal block, "6 / 10 — 4 to go for the lattice" |
| Lattices ×4 (Sólveig) | **main** | Sólveig | yes | yes | journal + path line |
| Hearth trays ×4 (Mira) | **main** | Mira (after a castle) | yes | hidden | journal + path line; say where each metal and gem comes from |
| Sovereign staff (apothecary, 6,000 g) | **main** | the apothecary | yes | **hidden until the great hearth** | path line once the forges rise; a warning early that it is expensive |
| The four forges + Heartglass | **main** | they rise | yes | yes | path line names the next forge and what its hearth needs |
| Muspelheim (Surtharn) | **main** | 4 keys | yes | yes | — |
| Lodestar → escape → Asgard → Godsbane → Bifröst → Solmyrk → feast hall → home | **main** | the story | yes | yes | the path line follows each step (now "see the journal") |
| All 40 spirits → the World Tree | side, after the end | — | yes | yes | journal after the end |
| Dragon (all 16) | side | — | yes | yes | journal: a "Dragon" line that counts |
| Camps (food, wells, shrines…) | side (repeatable) | found | yes | yes | not quests: a lesson, not a journal entry |

## 7. Recommendations (how I would approach it)

1. **One mentor voice for "what next".** Make **Master Oswin** speak:
   - Your first visit: who he is, plus your first two tasks (the Tumbler's pins and the first treasure site).
   - Every later visit: the next main step and one rumour of something side in an open realm.
   - Keep the twin for the story and the lore.
2. **Drop "Accept".** The journal tracks every quest by itself. The guild becomes where you **hear** about them, so Oswin's tasks appear in the journal as he says them. Optional extra: one chosen quest stays **tracked** (gold pin, compass on the HUD).
3. **A full "Next on your path".** It runs to the very end and names every needed piece: spirits, lattices, trays, metals, gems, the staff, each forge, Muspelheim and each Asgard step.
4. **Main and side, everywhere.** The journal gets two parts: *The Saga* (main, numbered in order) and *Side quests* (grouped: Islands, Castles, Mage towers, Sky ports, Fairies, the Dragon). Side quests carry a SIDE badge. Side quests that feed the main road say so ("its metal is needed for the Wetlands tray").
5. **Lessons as cards, reviewable in a Training tab.** Use the forge pop-up style everywhere: painted picture, short steps, keys for keyboard *and* touch. Taught just in time; on by default; "I know how to play" turns them off. The first minutes are taught by doing, with the twin walking you out of Home.
6. **Fix the Controls page now** (the seven missing keys). Later it becomes the Training tab's "All keys" page.
7. **Optional, for the Lab:**
   - a compass arrow on the HUD pointing to the tracked quest
   - suggested level on each pin (red when you're under)
   - a "quest complete" banner that shows what it opened
   - Oswin's rumours marking a rough area on the map

## 8. Basic questions (asked now; the options follow in the Lab)

Answered (docs/08 › Round 98): **Q1 Master Oswin** · **Q2 a Training tab in the pause panel** (replacing Controls) · **Q3 drop Accept** (one quest can be tracked) · **Q4 both, skippable**. The options left are in the Lab → Training & quests. The questions were:
- **Q1 Who guides:** Oswin of the guild, the twin, Elder Runa, or a new mentor?
- **Q2 Where the Training tab lives:** the inventory, the pause panel, or the Tome?
- **Q3 Accepting quests:** drop it (the journal tracks everything; the guild is where you hear about them), keep it with a real reason (one tracked quest with a compass), or keep it as it is?
- **Q4 The first minutes:** a guided walk-through (taught by doing), cards as things come up, or both? Can players skip it?

## 9. Your first 100 gold (Kris, Nov 8: "an easy way to get our first 100 gold, with two 50g early quests for a sword and a shield")

You start with 0 gold and the wooden sword. The village shop sells the **Iron Sword (40 g)** and the **Wood Shield (25 g)**; 100 gold buys both with a potion's worth over (25 g). Goblins drop 3–8 g, so today the first sword takes about ten fights.

Proposed: Oswin's first visit hands out two 50 g tasks; paying them is his reason to send you to the shop (lesson 4 follows when you have the gold). Six candidates — ☆ two in the Lab (Training & quests, top):

| Task | Giver | What you do | Teaches |
|---|---|---|---|
| Goblins in the vegetable plot | Tob the Farmer, via Oswin | drive off 5 goblins by the north gate | attacking, the shield prompt |
| Wake the old waystone | Oswin | Tab the waystone on the Grasslands road, travel back | the map pin, waystones, travel (no fighting) |
| The camp on the east road | Oswin | beat the nearest camp's guards; its chest holds the 50 g | camps and chests |
| The fisher's net | Old Nell the Fisher | fetch her net from the far shore (two skeletons) | following a pin, Tab to pick up, a ranged foe |
| Pia's pins pay as well | Pia | the Tumbler's Lesson also gives 50 g | the roll |
| Oswin's goblin bounty | Oswin | 5 g a goblin, up to 10 | nothing new — the freest |

My suggestion: **the vegetable plot + the waystone** — one fight close to home and one trip with no fighting, about ten minutes together; then the shop, then Pia and the first treasure site as Oswin's next tasks.

## 10. Built (round 100) — from the Lab picks

**The picks:**

| Choice | Picked |
|---|---|
| First 100 gold | the camp on the east road + the fisher's net |
| How a lesson looks | Oswin speaks it, in the dialogue box, with "Don't show lessons" and a way back on in the pause panel |
| When lessons pause | every lesson pauses |
| The first minutes | your twin walks you out (Kris's note: "after coming out of Oswin's shop, elder runa should show you the runestones") |
| Oswin's voice | the stern scholar |
| The journal | the Saga + Side quests |
| Tracking | on the minimap |
| The path | a line under the minimap |
| Extras | banner, suggested level, rumours, "Stuck?" from Oswin, more help on Hearthside (all but "Show me") |
| Lessons and quest texts | all 31 lessons kept; the quest texts approved |

**The new files:**

- **`21t-lessons.js` (ZLES)** — the 31 lessons and their triggers.
  - Oswin speaks each in the dialogue box, the game paused, with "Got it" and "Don't show lessons".
  - Ragnarök shows only the big ones.
  - An old save counts what it has already done as taught.
  - The **Training** tab replaces Controls in the pause panel. It lists every lesson (??? until met), All keys (keyboard and touch), "Show lessons as they come", and a button to the old Controls page (difficulty, save, main menu).
- **`21q2-journal.js` (ZJOUR)** — the journal and the path.
  - **The Saga:** 37 steps to the end. Done steps are ✓, the current one is lit, the next two are shown, the rest are ???.
  - **Side quests:** grouped (Oswin's first tasks, Islands, Castle isles, Mage towers, Sky ports, Fairies, the Dragon, After the end), each with a SIDE badge.
  - No more Accept; ◎ Track on any quest instead.
  - A gold arrow on the little map's rim points to what is tracked (or to the Saga's next step), with its distance.
  - "Next on your path" runs to the end and sits under the little map.
  - A banner appears when a Saga step is done, saying what is next.
  - The suggested level shows on pins and quests.
- **`21u-oswin.js` (ZOSW)** — Oswin and the two starter tasks.
  - Oswin speaks at the guild, then the journal opens. On the first visit he gives the two 50 g tasks. On later visits he gives the next step, a rumour (a faint ring on the map), and a stronger hint if the Saga hasn't moved for 20 minutes of play. On Hearthside a reminder also comes every 5 minutes.
  - **Oswin's purse:** the nearest camp east of the village; its chest pays 50 g.
  - **Old Nell's net:** on the lake's far shore with two skeletons; Tab to take it, and Nell pays 50 g.
- **`21v-first-walk.js` (ZWALK)** — the first minutes on a new game.
  1. Your twin speaks, with "I know how to play — skip the lessons".
  2. Walk.
  3. Swing three times.
  4. Open the map.
  5. Go to the guild, where Oswin speaks.
  6. Coming out, Elder Runa shows you the Runestone and the waystones.
- **ZDLG** takes small buttons under the words (`extra`).
- **Tests:** `tests/test_round100.py` (22). `test_round85` was updated for the Training tab. The older suites keep all four new switches off (`tests/harness.py`).

