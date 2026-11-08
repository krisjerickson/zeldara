# 51 — One cut-scene at a time (round 95)

Kris: "you can end up having same time when multiple cut scenes trigger … releasing the first soul in the wetlands, with both freeing soul video and the wetlands past video triggering … only get 1 video at a time … the wetlands video should queue as soon as you walk over a bridge to the wetlands for the first time … rethink about this for other video triggers as well … the pop-up for freeing the first soul triggered before the video cutscene … video should come first, and then the pop-up."

## What changed (src/js/16x-story-queue.js, ZSQ)

**The story queue.** Every saga cut-scene goes through one queue. That covers the opening, each realm's old disaster, the first spirit, the four builders' crossings, the gate, the two lights, the Lodestar, the tattoo and the World Tree.

A cut-scene plays at once if the moment is calm. Otherwise it waits in `ps.sagaQ`, which is kept in the save, and plays at the next calm moment. Calm means all of these:

- no cut-scene is up, and none ended in the last 40 s (`ZSQ.GAP`)
- no menu or pop-up is open
- you are in the overworld, not a tower, dungeon or island
- no fight is near you
- no soul-line is being drawn and the Bifröst is not rising

**The realms' old disasters** play the first time you set foot in each realm (`ps.realmsEntered`). They no longer come with that realm's first freed spirit:

- the Wetlands: the Black Tide
- the Highlands: the Stone-Fall
- the Ashlands: the Ash Night

The Grasslands' Long Quiet stays at its tenth freed spirit. You start in the Grasslands, and the opening has just told the storm.

**The first spirit freed** now plays in this order:

1. its cut-scene (the chains falling away)
2. the spirit's thanks pop-up and its Soulglass shard
3. its soul-line being drawn into the land

The freeing itself waits for the cut-scene to end.

## Every trigger, rethought

| Cut-scene | When it plays now | Can it collide? |
|---|---|---|
| Opening | A new game, after the first moment in the world | No. It waits if a pop-up is open. |
| First spirit | The first bindstone guardian falls; the cut-scene comes before the pop-up | No, because no realm disaster comes with it any more. |
| Black Tide, Stone-Fall, Ash Night | First steps into the Wetlands, Highlands or Ashlands | Queued if a builder's crossing has just played. |
| Long Quiet | The Grasslands' tenth freed spirit | It used to compete with the 20th and 30th; the queue now separates them. |
| Gate, two lights | 20th and 30th freed spirit | Queued 40 s apart. |
| Builders' crossings | Back in the overworld after freeing the builder | Two at once (the sandbox) now play 40 s apart. |
| Lodestar | Staff in hand | Queued. |
| Tattoo, then World Tree | After the end, all forty spirits | These used to play back to back; now 40 s apart. |
| Boss forms, Asgard arrival, feast hall, ending | Where they happen | Not queued, because each is one scene told in parts. |

## Switches

- `ZSQ.on = false` brings back the old behaviour.
- `ZSQ.GAP` sets the calm time in milliseconds.
- The test suites keep `ZCUT` off, so the queue never runs there.

## Tests

`tests/test_round95.py` (12 checks):

- the first spirit's cut-scene comes before its pop-up and before it is freed
- no Black Tide follows the soul-line
- the first steps into the Wetlands play the Black Tide
- the Highlands right after wait in the queue, keep waiting while a menu is open, and play once the moment is calm
- each plays once, and a request within 40 s of another cut-scene is queued

Three older tests were updated for the new rules:

- `test_round68b`: the Ash Night no longer comes from a trace.
- `test_round73b`: the first-spirit hook is now ZSQ.
- `test_round82`: Vela's crossing is tested at a calm moment.
