# 49 — Thematic sound takes: five to choose from for every effect (round 93)

Kris: "for the sound effects, we have a few more OK ones, but they are still largely not very good. Look back into what each sound effect is supposed to be representing, and see if there are any tags in the sound effect libraries i've provided. remind me if we have any libraries missing. And then redo all of the ones i have not chosen, with 5 total to choose from (including already chosen ones), making sure that the sounds are thematic. A lightning spell should sound light lightening. Starfall should make you think of a shooting start, etc"

## What each effect stands for
Every one of the 147 effects now carries a one-line meaning, shown in the Lab (🎯), for example:
- `sfx_lightning`: lightning spells;
- `sfx_sp_starfall`: casting Starfall, stars falling from the sky;
- `sfx_mt_storm_drake`: climbing onto the Storm Drake.

The meanings are written down as `ZAUD.MEAN93`.

**Why the earlier takes missed:** the round-80 "gentle" wording ("a soft crackle of bright sparks … never sharp") and round 89's inventive sources pulled the sounds away from what they represent.

**The new wording** names the real, recognisable sound first: what makes it, on what, and how. The tail is short and drops the old "soft" and "gentle" style words; the prompt influence is 0.85. Some examples:
- **Lightning:** "a lightning bolt striking: a blinding electric crack and a rolling thunder boom".
- **Starfall:** "shooting stars falling from the night sky, a high whistling streak and a sparkling impact".
- **Meteor:** "a meteor falling from the sky, a rising whistle and a massive fiery impact".

## The library and its tags
`tools/audio/lib_catalog.py` reads every recording in `audio\library` in place and writes `audio\library\catalog.json`. For each recording it records:
- its pack and name;
- its UCS category (in 515 of the names);
- the tags inside the file (BWF description, iXML notes, keywords and categories, and RIFF INFO comments and keywords), present in 1,151 of the 1,401 recordings;
- its length.

**What is there:** 1,401 recordings in 418 packs (GDC 2023 and GDC 2024). That is only 2–4 recordings per pack, and most of the magic-flavoured ones (thunder, electricity, the Druid and Dreamcatcher magic, the fireworks launch) were already offered in rounds 84/84c and not picked.

**Fresh, truly thematic finds kept: 12.** Each became one of the five takes (`<id>.r1.mp3`, "Library"):

| Effect | Recording |
|---|---|
| Starfall | a firework whistle (a shooting star) |
| Frost, Ice Shards | ice cracking |
| Coins | a pile of coins |
| The citadel shakes, a boss falls | a building collapsing |
| Slam | a cinematic impact |
| Undead | a zombie groan |
| Tidal Wave | ocean surf |
| Void Orb | a deep pulsing pad |
| Travel | an evolving whoosh |
| Notice | a soft UI chime |

**Rejected: 19 finds** that only matched by pack, for example a typewriter for a page turn, a chainsaw for chopping, and a carnival for the village bell. They are in `_to_delete\lib93_rejected` and out of the map.

## Libraries missing
- **Sonniss GDC 2023, part 7 of 14.** It isn't in `audio\library`. An unfinished 2.1 GB download, "Unconfirmed 375252.crdownload" (Oct 31, 17:39), sits in Downloads and is probably it.
- **Sonniss GDC 2015–2022:** eight years of the free archive (2015–2024, royalty-free, about 160 GB in all, from sonniss.com/gameaudiogdc) that we don't have. They hold far more magic, creature, weapon and foley packs than 2023–2024. With them, `lib_catalog.py` and `lib93.py` can find several fresh library takes per effect.
- There is no GDC 2025 or later bundle in that archive.

## Five to choose from
For every effect:
- the takes Kris kept (round 89's kept takes, or his round-89 picks where he made them, 151 in all) stay;
- fresh library takes are added where one fits (12);
- new ElevenLabs takes fill the rest, up to five in all: **572 takes**, about 26,400 credits.

They are written by `tools/audio/sfx93.py` from `tools/audio/sfx93_words.py` into `src/js/07zau7-sfx93.js` (`ZAUD.KEPT93`, `LIB93`, `V93`).

**To make them:**
```
cd C:\Claude\games\Zeldara-v4
.\tools\audio\audio5.ps1
```
The files arrive as `audio\incoming\<id>.w1–w5.mp3`. The script is safe to run again.

**Lab → Sound effects → Round 93:**
- Each row shows what the effect stands for, the kept takes (★), Library and New 1–5.
- ☆ up to three picks (`sfx93-<id>`), and ✓ Approve.
- It replaces round 89's table.
- `sfx_preview.py` now also knows the kinds w1–w5 and r1, and `pick_sounds.py` takes them.

Test: `tests/test_round93.py` (7); `test_round89b` follows the new table.

## Music (also this round)
- The hearth plays only take 2.
- The village at night has new Suno words: crafty and sneaky (doc 48 / changelog [790]).
