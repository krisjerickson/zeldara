# 61 — Round 110: Master Oswin meets you on the Green; the opening's sword is wooden

## Oswin leads you to his guild (21v-first-walk.js)

Kris: "at the very beginning, you should start with master oswin, but he's not at the village center. Make him be there at the beginning and then lead you to his guild hall as part of the tutorial."

- **From the first moment of a new game**, Master Oswin stands on the Green beside you, with his name over his head. He is there even while the opening plays.
- **After the opening, Oswin greets you**, not your twin. He mentions that your twin is already at the library. His second line offers "I know how to play — skip the lessons".
- **The steps**, each one done to go on, with its words in the line under the little map:
  1. walk
  2. three sword swings
  3. open the map (his guild is marked)
  4. **follow Master Oswin**: he walks you to the guild door himself
- **The walk:** he takes the shortest walkable way to the door.
  - If you fall more than about 5 tiles behind, he stops and waits; he goes on once you are within 3. Every few seconds while he waits, a note says he is waiting for you.
  - The gold arrow points at him.
  - Tab near him on the way repeats what to do.
- **At the door** he says *"Here we are — my guild hall. In you come: Tab at the door."* and goes in ahead of you. Inside, his usual welcome and his two 50 g tasks follow, then Elder Runa at the Runestone, as before.
- **"Skip the lessons"** skips the walking, swinging and map. He still walks you to the guild.
- **Mid-tutorial saves:** a save made during the tutorial puts him back on the Green; if you were following him, he leads again.

Switch: `ZWALK.on`. The walk speed and the wait and go-on distances are `ZWALK.SPD`, `ZWALK.WAIT` and `ZWALK.GO`.

## The wooden sword in the opening

Kris: "you only start with the wooden sword, so the intro videos should have a wooden sword, not the metal one. let's also change the initial images to show this, so that kling doesn't get confused."

**The story frames** (07zt6) now ask for "a plain wooden practice sword (pale carved wood with a simple leather-wrapped grip — NOT a metal blade)" in three frames:

- frame 10, "Sixteen winters on" (the twin practising)
- frame 11, "The choice" (Elder Runa hands over the pack and the sword)
- frame 12, "The send-off" (the wooden sword at the hip, no metal sword anywhere)

To paint the five pictures again:

```
.\tools\sprites\redo.ps1 -List r110
```

- **Kling (opening, part 2):** the actions now say the plain WOODEN practice sword, and the AVOID line adds "Never a metal, steel or glowing sword: the hero's only sword here is a plain wooden practice sword". Other scenes keep their swords.
- **Prompts already rewritten:** `01_opening_zeldara_p2` and `01_opening_zeldor_p2`.
- **Still to do:** once the new pictures are in, they go into those two folders (`image4.png`–`image6.png`). The first part (`01_opening_both_p1`) has no sword in it and stays done.

## Tests

- `tests/test_round110.py` (8): the story frames and the redo list; the Kling prompt (wooden in the opening, untouched in Surtharn's); Oswin on the Green from the first moment; Oswin greets you; he walks you to the door and goes in; he waits when you fall behind.
- `tests/test_round100.py` and `test_round107.py` updated (Oswin greets you, then "follow").
