# 23 — Adventure sites redesign (round 44)

*Oct 10. Kris: "towers, dungeons and other adventure sites are too small and too much of a repeated layout. Each adventure site should have a very unique and special layout, as well as the coloration. Let's go back through and make a new redesign of adventure sites for me to choose from in the lab. Also look at ways to create and paint these to look better for me to choose from."*
*His answers (question card): all site types at once · a design per individual site · compare both painting approaches · "should be between 2-3X bigger. Also, the stairs up and down should be in different places on the floors so you need to explore to figure out where these are, and sometimes it might be a bit of a maze, especially in the dungeons".*

## What is built

- **`src/js/07zw-site-designs.js` — ZSD**, a layout generator shared by the Lab and (once picked) the game.
  - `ZSD.sites()` — 53 sites: 10 towers, 10 dungeons (the site roster), 16 mage towers, 12 island castles, 4 island crypts, the Ember Cave.
  - `ZSD.design(site, opt)` — three options per site (159 designs, 717 floors). Each option is a different layout family, has its own colours and has a map for every floor.
- **Layout families:**
  - towers — rings, four wings, spiral, halls, twin halls over a gulf, galleries and bridges
  - dungeons — labyrinth, caves, catacombs, flooded halls, islands and bridges, ring and sunken hub
  - mage towers — spiral, rings, five-pointed star, crystal lattice, twin halls
  - castles — keep and bailey, four wings, halls, galleries
  - crypts — caves, flooded, catacombs, labyrinth
  - Ember Cave — islands, caves, labyrinth
- **Colours:** option 1 keeps the site's own palette, option 2 is deeper and moodier, option 3 is a bold twist on its element.
- **Size:** floors are 2.2–2.5× the old floor area. Towers are 48 × 42, dungeons 80 × 60, mage towers 44 × 44, castles 68 × 54, crypts 66 × 50 and the Ember Cave 82 × 60 tiles.
- **Stairs:**
  - You arrive exactly above where you left the floor below; a landing is made if the spot was water or wall.
  - The way on is in the farthest tenth of the floor, measured by walking distance.
  - Every floor is joined into one piece: crumbs are walled up, patches are linked by passages or bridges.
  - `test_round44.py` checks all 717 floors.
- **Lab tab "Adventure sites"** (`lab/src/js/59-lab-asites.js`):
  - Pick a site from the chips. Its three options draw every floor, marked ▲ arrive, ▼ the way on, ★ treasure or boss.
  - There is one ☆ Pick per site (`asites-<site>__<opt>`), "Next site ▶", and a count of sites picked.
  - Section 2 compares three ways to paint the sites (`asites-appr_*`): tile sets + props, whole painted rooms (pilot ordered: `.\tools\sprites\rooms.ps1`, wave 45, three rooms), and a hybrid of tile sets plus big painted centrepieces.

## Next, after Kris picks

1. Replace the old floor builders (07b towers, 07c caverns, 07ta castles, 07zm mage towers, island crypts, Ember Cave) with the picked ZSD design per site. This means dressing the grid with each site's furniture, monsters, chests and boss room, and keeping the old builders as a fallback.
2. Paint the picked approach: order tile sets per site look (and centrepieces for the hybrid), or more whole rooms if the pilot wins.

## Round 45 — the picks are in the game

- Kris's picks (Lab `asites-*`, 52 with notes) are built in `07zx-site-plans.js` (ZSP) and painted in `07zy-site-paint.js` (ZSPP), using the hybrid approach.
- Every last floor has a boss arena. Each floor has secrets: hidden doors with a draught, and a treasure room.
- Where a pick repeated another site's design type, the site keeps its own original layout instead (`ZSP.OLD`, 25 sites). Old towers are built 1.5× larger.
- The Ember Isle is stacked: the Ember Cave on its upper floors, the Ember Crypt below.
- Review every site floor by floor in Lab → **Site review**. Details are in doc 24 §4.

## Round 46 — the site review

- **Old layouts once per type** (`07zx2-site-plans-r46.js` `ZSP.OLD`): only sunken_courtyard, castle_q1_b and mage_rime_spire keep an old layout. castle_q1_b gets more rooms and harder stairs; Rime Spire's first stairs are harder to find (`ZSP.HARD_OLD`, `towerHarder` in `07b-site-towers.js`).
- **His changes**: Conductor and Frozen Belfry are larger mazes; Ember Observatory is larger with six clusters; Drowned Lighthouse is an archipelago of six rings; Lightning Rod has more rooms and its stairs down behind a hidden door (`ZSP.hideDown`); Monolith is six blocks in a zigzag joined by hallways (92×64), progressing up and across; Castle q4_b hints at the stairs at the end of each arm.
- **"This is bad, use previous"**: observatory, hyrule_keep, sky_cloister, mire_tower, dawn_sanctum, rootspire, castle_q2_b, bone_pit and boulder_field are rebuilt as mixes — the earlier picked layout as the frame, filled with pieces of the new designs he liked (orrery hubs, ward keep with wings, cloister islands, mire caves, sunburst halls, root labyrinth ring, lotus pond court, bone field and chasm, boulder rings). The others on that list use their earlier picked layout from the round 45 lab.
- **Old interiors reused** (`ZSPP.furnish`): every built floor gets an entry hall (runner, statues or plants) and up to nine furnished rooms of different kinds (library, dining room, chapel, gallery, music room, conservatory, atrium, study), painted with the old tower recipes.
- **Liked designs to replicate**: isle_1 ("should be used for some of the dungeons"), pillared_hall and spiral_chasm ("replicate elsewhere") — queued for the next round, after his Empty space pick.
- **Empty space**: six ideas in the Lab tab of that name — carved rock, open sky, a deep abyss, the site's element all round, a night sky with aurora, and tight framing. His picks decide what fills the black.
