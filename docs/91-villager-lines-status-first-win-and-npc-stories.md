# 91 — The villagers' lines (status), the first win built, backstories for everyone else, the new sound takes (round 132)

## The villagers' lines — where they stand
Kris asked: "did we get the additional speaking lines after we expanded each of their stories and my request to have a minimum of 40 different things to say for each?"

**Not yet.**
- **Written so far:** the 34 backstories (doc 66, round 114) and the woven saga (rounds 114e and 118).
- **Lines:** only Master Oswin's are written, 168 of his 186, in `src/villagers/oswin.md`. They are **not in the game yet**: `tools/voices/build_voices.py` stops while any villager is short, so `src/js/21w-0-voice-lines.js` has never been made.
- **What the game plays today:** the round-113 lines in `21w-voices.js`, 3–10 per villager.
- **Still to write:** about 1,670 lines for the other 33. The target is three times the number of meetings, and at least 40 each. They run along the saga's strands, the five seasons and the stages of the story.
- **The plan:**
  - write them in batches, the most-met villagers first:
    - Benno, Morwen, the twin, Tilda, Garrick;
    - then Brask, Mira, Coral, Sólveig, Rolf, Iva, Runa;
    - then the rest;
  - wire `build_voices.py` so each batch goes into the game as it is finished, instead of waiting for all 34.

## The first win (Kris: "i … didn't see the shield mini quest at the beginning and the reward")
Kris picked it in "Playing and coming back 2" (first_win, 'as written'). It was planned for wave 2 and **had not been built**. It is built now, in `src/js/21v2-first-win.js` (ZFWIN):
- **The call:** as the first walk ends (after Runa), a cry comes from the sheep pen east of the Green. The line under the little map and the gold arrow point there.
- **The fight:** a young bramble wolf has a lamb cornered. It is weak (three hits), slow and bites softly.
  - Oswin talks you through it: swing, and roll when it crouches.
  - After two bites he drives it off, so **you cannot lose**.
- **The reward:** a Wood Shield, put on at once: "You stood your ground — now learn to hold it."
- **The shield lesson:** it follows on a second, even weaker wolf (two hits).
- **The lamb:** it follows you home and lives on the Green.
- **Who sees it:** only games without a shield yet (`ps.firstWin`). Kris's current save probably has a shield already, so he will see it in a new game.

## Backstories for everyone else (Lab › Backstories for everyone else)
Kris: "we need to expand the backstories for other NPCs. the first thing that comes to mind are the fairies and sprites, but look into all NPCs that don't yet have a deep backstory and make proposals of how to expand these".

**Nine groups** with no deep story yet:
1. the 20 waystone fairies;
2. the fairy monarchs;
3. the four familiars (the spirit beasts);
4. the forty spirits;
5. the four great spirits;
6. the 16 mage-tower masters;
7. the island castles' wardens and teachers;
8. the Binders and the realm bosses;
9. the hamlet folk and the island traders.

Each group has three ways to give it a real story, each with a sample in its voice, plus a choice of how many lines each NPC gets (12, 20 or 40+).

**Name clashes noticed:**
- Cindra is both a mage-tower master and a fairy-monarch design.
- Eldis Emberheart is a great spirit; Eldis was one of the names kept clear of for the title.

## The new sound takes
- `audio8.ps1` made all 158 takes.
- `sfx_preview.py` joined them on the PC.
- In the Lab they play as "New 131·1–5" under Sound effects › "Remake all", from the asset store as webm, because the published-file limit is full.
- "Today" was rejoined to match the 74 effects now in the game.
