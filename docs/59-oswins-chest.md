# 59 — Round 108: Oswin's chest opens

Kris: "i defeated the first 3 monsters for the first quest, but i wasn't able to open the chest. is this a bug, or doing it wrong?"

## What was wrong (a bug)

- **Hidden guards.** A camp's chest unlocks only when every guard is beaten. Some guards were night creatures (Bramble Wolf, Dustwing Moth…). By day they are hidden and can't be hit, so the chest stayed shut with nothing left to fight.
  - Oswin's camp in the test world (Bandit Stash) had 4 guards, and 2 of them were asleep and unseen by day.
- **Little warning.** The "N guards left" count showed only at 2 or fewer.
- **Wrong words.** Oswin spoke of a "goblin camp" and a chest, but the camp he pointed to was picked only by distance, so it was not always a goblin camp or one with a chest.

## Now (10h, 21u, 09, 09i)

- **No night guards.** No camp is guarded by a night creature. One the old deal would have put there is swapped for a day-awake creature of the same realm, picked without the random numbers, so every camp stays where it was and saves keep their ids. (Oswin's camp is the Bandit Stash again.)
- **Hiding guards come out.** If only hidden guards are left (ambushers, burrowers, any other lurker), they burst out to fight: *"The last guard bursts out of hiding!"*
- **Count after every kill.** "N guards left" shows after each guard falls.
- **Oswin's camp has a chest.** He sends you to the nearest camp east of the village that has one, and names it: *"the Bandit Stash, a camp on the road east of the village … Beat every guard (some hide until you come close), then Tab at the chest."* His reminder and the map label name it too.
- **Older saves.** A save whose stored camp has no chest is given the nearest camp with one.
- **The reward is unchanged.** Clearing the camp pays Oswin's 50 g, and Tab at the chest gives its own gold and treasure.

## The same kind of trap elsewhere (Kris: "any other issues like this … lets make sure to correct wherever this might have happened")

I checked everything that has to be beaten before something else happens: camps, the spirits' Binders, the boss groups and their allies, castle wardens, mage-tower masters, trials, the sky battles and the Muspelheim rush. I looked for night creatures and for monsters that hide (ambush, disguise, perch, burrow).

| Where | What could go wrong | Fix |
|---|---|---|
| **Spirit Binders** | 10 of the 40 Binders are night creatures (Pooka, Bramble Wolf, Echo Phantom, Fog Phantom, Bone Revenant). A Binder only stays visible while it is chasing you. Walk away, or let it be pulled back to its stone, and by day it vanished, so the spirit couldn't be freed until night. | Night creatures never sleep while something waits on them: a Binder, a camp guard or a boss (09 engine). |
| **Sovereign gauntlets** ("Clear every monster camp") | Only chest, gem and rune camps were ever recorded as done. Food, well, mana, shrine and arrow camps never counted, so the piece could never be earned. | Every camp beaten is recorded (`ps.campsCleared`) and counts. Camps an older save beat before this round are not on record and need beating again. |
| Hiding Binders (Runestone Crawler, Reed Stalker, Glacier Wyrm) | They show themselves when you come close or hit them, and burrowers come up next to you. | No change needed. |
| Burrowing boss phases (Glodr phase 2, Muspelheim guardian 3) | They chase you underground and surface beside you. | No change needed. |
| Castle wardens, mage-tower masters | None hide or are night creatures. | — |
| Trials, sky battles, the Muspelheim rush | Their own spawns, never hidden. | — |

## Test

`tests/test_round108.py`:

- no camp in the world has a night guard (530 guards)
- Oswin's camp has a chest, lies east of the village, and he names it
- an older save is moved to a camp with a chest
- the last hidden guard comes out to fight
- with every guard beaten, Tab opens the chest
- the camps are where they were before (c1_16 is the Bandit Stash)
- a food camp beaten counts for the gauntlets
- by day a night creature roams unseen, but a night Binder stays to be fought
