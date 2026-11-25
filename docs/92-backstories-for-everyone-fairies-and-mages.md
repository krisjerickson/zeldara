# 92 — Backstories for everyone else: the fairies speak, the mages remembered (round 133)

## Kris's picks (Lab › Backstories for everyone else)
Lines: **at least 40 each**, as for the villagers.

| Group | Pick | Kris's note |
|---|---|---|
| **Fairies** | C, woven into the forty spirits, with A (Keepers of the Stones) as the full backstory and B (each fairy, a little life) for more | "after you free it, you should be able to go back to the fairy and talk to it" |
| **Monarchs** | A, the Old Courts, plus B, the Monarchs' Pact | "make sure we make the feast we haven't built yet" |
| **Familiars** | A, the realm's own heart | — |
| **Forty spirits** | A, a life in five lines | "make sure that it isn't implied that all of the spirits came from the village … they usually came from a different quadrant and the lost cities from there" |
| **Great spirits** | A, the founders, plus B, the guardians who failed | — |
| **Mages** | A, hermits who stopped waiting | "make sure to make the requests for the scenes for this option" |
| **Castles** | A, the Warden's Bargain | — |
| **Binders** | C, both lightly | "i definitely like A … these binders got some reward from Surtharn to give them power and be able to bind souls" |
| **Hamlets** | — | "i'm confused about the hamlets … the hamlets died once the realms were shut off. they only come back because of Freya and you defeating Surtharn and Solmyrk. I do like the island traders having a backstory" |

**About the hamlets:** in the game they appear only after the end, once the spirits have gone home (10zh). Before that there is nothing of them. The hamlet folk are their returning families. They get no backstories now; the island traders do.

## Built this round
- **Sources:** `src/npcs/*.md`, one file per group, with the shared lore in `_lore-<group>.md`.
  - `tools/voices/build_npcs.py` builds them into `src/js/21w4-0-npc-lines.js` (ZNPC) and `lab/src/js/79z8-0-npc-stories-data.js` (LNPC).
  - It also writes the scene requests.
  - It checks for repeated lines and for a god named before the end.
- **The fairies (`21w4-npc-talk.js`):**
  - **The shared story** (Keepers of the Stones): they tended the waystones "when the stones were young". When the gate shut, each fairy stayed with two of the bound and kept their names and tunes alive.
  - **Each fairy:** a life of her own, two spirits of her realm, and **about 19 lines (half of the 40)**:
    - **Before:** her two, while they are bound.
    - **After:** them, once free.
    - **Life:** herself.
    - **Stage 2–5:** the land healing.
  - **In the game:** Tab a fairy and she talks when she has no lesson for you. Mid-lesson there is "And you?". Lines never repeat until all have been heard.
  - **Where the spirits came from:** the lore puts them in the lost towns of their own realms:
    - **Grasslands:** Fernby, Stonewick, Hollowmere, the Barrow Downs.
    - **Wetlands:** Millbrook, Reedhaven, Hverholm, the Lantern Isles.
    - **Highlands:** Deepdelve, Kettlecrag, Highmark.
    - **Ashlands:** Askvald, Brandhavn, Emberhold.
- **The 16 mage-tower masters:**
  - Each has a backstory: who they were before the dark, and why they shut themselves in with a spell.
  - Each has a **scene after the fight**: a painted panel of who they were, with their words, a slow zoom, and Continue. The first spell's mana ceremony waits until it is closed.
  - **16 paintings ordered:** `.\tools\sprites\paint.ps1 -List r133_scenes`. Until they are painted, the words show on a dark background.

## Next rounds (in this order, between the waves)
1. The fairies to 40 lines each.
2. The fairy monarchs (the Old Courts and the Pact) and the fairy feast.
3. The familiars.
4. The forty spirits (five lines each, from their own realms' lost towns).
5. The great spirits.
6. The castles.
7. The Binders (Surtharn's reward: the power to bind souls).
8. The island traders.
9. The mages' lines to 40.

The villagers' own lines (doc 91) run alongside.
