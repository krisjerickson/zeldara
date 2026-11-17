# 65 — Round 113: the villagers' voices and their requests

From Kris's picks in the Lab ("Villagers & side quests").

## Voices (21w-voices.js, ZVOICE)

- **Each villager speaks in the personality Kris picked** (34 of them). Where you hear them:
  - the village folk when you Tab them;
  - the shopkeepers in a bubble at the top of the screen as their window opens;
  - the island folk as you meet them.
  - Your twin's know-it-all lines alternate with the story lines.
- **The arcs** (the lines change with how far the Saga has come):
  - Oswin's troll story grows each realm, then goes quiet about the Ash Night.
  - Benno's arc.
  - Morwen's, remade for the Serkland alchemist as Kris asked.
  - Your twin's.
  - Oswin's lines also follow the Five Tankards.
- **Passing remarks:** walk past a villager and now and then they say something, each at most once a minute.
- **Bram, Dunn and Captain Vela come to live in the village** once freed: Bram on the Green, Dunn by the forge, Vela by the pier.
- **Marks over the folk:** "!" means they have a request for you; "?" means they are waiting for what you bring.

## Requests (21x-npc-quests.js engine, 21x2-npc-quest-list.js)

**25 of Kris's 28 picked requests are built**, each from its villager:

| Who | Request |
|---|---|
| Oswin | the Five Tankards (one keepsake per realm; at the end, choose the Raven-feather cloak or 600 gold) |
| Oswin | Proper Paperwork (a kenning riddle) |
| Benno | Old Mother's Rescue |
| Morwen | Ingredients of Doom |
| Morwen | the Prophecy of the Third Spoon (a riddle) |
| Garrick | Coal |
| Brask | A Letter to Miklagard |
| Mira | the Singing Bird |
| Coral | Hack-Silver |
| Coral | Lost Cargo |
| Sólveig | the Forty-Light Mosaic |
| Rolf | the Mead of Poetry |
| Iva | A Buried Hoard (three verse clues) |
| Quill | Signals in the Dark (a 70-second relay) |
| Hana | the Runaway Foal (a chase) |
| Mael | Herbs |
| Nell | the Ox-Head Bait |
| Holt | the White Stag (tracks) |
| Pell | Sky-Silk |
| Pia | Pin Hunt II |
| Vela | the Lost Spyglass (a riddle) |
| Bram | A Bench on the Green (five logs; the bench appears) |
| Corr | A Poem for Ilsa (choose the line) |
| Greta | the Stuck Wheel (a gear riddle) |
| Tob | Crows and Goblins |

**How they work:**
- **Steps:** fetch things that lie in the world (Tab to take them), give, deliver, visit, chase, beat, relay, follow tracks, choose.
- **Rewards:** gold, food and potions, and sometimes new items: the Raven-feather cloak, Runeloaf, Skald's mead, the brass songbird, the spyglass, Miklagard silk, the sky-silk cape, acrobat's boots, the soulglass charm.
- **Riddles:** ask the giver again for the next hint (each hint costs a tenth of the gold), or ask the villagers who know. A riddle's place shows on the map only once a hint points there.
- **Journal and map:** the journal lists them under "Villagers' requests". ☆ makes one current, and the yellow mark leads to it.
- **When they open:** a request is offered once the first walk and Oswin's first tasks are done, the realm it needs is open, and the people in it are free.

**Next round:**
- the three requests that need mini-games: Runa's hnefatafl, Dunn's forge-off, and the fairy monarchs' feast;
- the dramas: the Bread and the Brew, Letters to the Lighthouse, the Moot, the Smith and the Dwarf;
- the other ✓ ideas: rumour board, raven post, routines, codex, cameo, dailies, the village changing;
- the group voices: fairies, monarchs, teachers, mages, the great spirits, the forty spirits, the hamlet folk.

## Paintings

To make them: `.\tools\sprites\redo.ps1 -List r113`

- `sc_r113_icons`: the new items.
- `sc_r113_finds_a`–`d`: the things you find.
- Until they are in, the finds show as an emoji with a soft glow.

The portraits, props, creatures, story moments and mini-game art come with the rounds that build them.

## Tests

`tests/test_round113.py` (8):
- the data;
- a fetch request start to finish;
- a riddle with hints and its reward cut;
- the journal;
- a choice;
- Bram comes home and Tob's "!";
- passing remarks;
- a delivery riddle.
