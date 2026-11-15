# 59 — Round 108: Oswin's chest opens

Kris: "i defeated the first 3 monsters for the first quest, but i wasn't able to open the chest. is this a bug, or doing it wrong?"

## What was wrong (a bug)

- **Hidden guards.** A camp's chest unlocks only when every guard is beaten. Some guards were night creatures (Bramble Wolf, Dustwing Moth…). By day they are hidden and can't be hit, so the chest stayed shut with nothing left to fight.
  - Oswin's camp in the test world (Bandit Stash) had 4 guards, and 2 of them were asleep and unseen by day.
- **Little warning.** The "N guards left" count showed only at 2 or fewer.
- **Wrong words.** Oswin spoke of a "goblin camp" and a chest, but the camp he pointed to was picked only by distance, so it was not always a goblin camp or one with a chest.

## Now (10h, 21u)

- **No night guards.** No camp is guarded by a night creature.
- **Hiding guards come out.** If only hidden guards are left (ambushers, burrowers, any other lurker), they burst out to fight: *"The last guard bursts out of hiding!"*
- **Count after every kill.** "N guards left" shows after each guard falls.
- **Oswin's camp has a chest.** He sends you to the nearest camp east of the village that has one, and names it: *"the Overturned Merchant Cart, a camp on the road east of the village … Beat every guard (some hide until you come close), then Tab at the chest."* His reminder and the map label name it too.
- **Older saves.** Because the guards changed, the camps were dealt again. A save whose stored camp has no chest now is given the nearest camp with one.
- **The reward is unchanged.** Clearing the camp pays Oswin's 50 g, and Tab at the chest gives its own gold and treasure.

## Test

`tests/test_round108.py`:

- no camp in the world has a night guard (520 guards)
- Oswin's camp has a chest, lies east of the village, and he names it
- an older save is moved to a camp with a chest
- the last hidden guard comes out to fight
- with every guard beaten, Tab opens the chest
