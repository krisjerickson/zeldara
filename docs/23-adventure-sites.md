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
