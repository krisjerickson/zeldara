// ═══════════════════════════════════════════════════════════════════════
// ║ 79t5-0-seasons-data.js — round 114e: THE SEASONS, END TO END, WITH THE COST (Lab tab "Seasons: the cost"; doc 69).
// ║ Kris: "i want a full analysis and cost analysis before making this major change. Do and end to end analysis of everything we would need
// ║ to do to introduce the seasons … lots of updated images to show these changes in the buildings, scenery, backgrounds and such. We should
// ║ also have additional cut-scenes that talk about the seasons changing. There may be other places i'm not thinking of … Create 3 different
// ║ levels of implementing this … limited, balanced, and holistic. Include the cost analysis in terms of numbers of new sheets and estimated
// ║ API costs for each option." Order: stuck in winter before the start → a mild spring with the Grasslands → summer (Wetlands) → autumn
// ║ (Highlands) → winter (Ashlands) → spring when Freya is free; "make the winter not overly snowy".
// ║ Prices are the averages measured from sprites/incoming/_log.jsonl (4,168 paintings, medium quality, list token prices):
// ║ a scenery sheet $0.048 · a character sheet $0.038 · a story frame or backdrop $0.078 · a shot $0.069. Redo allowance +25 %.
// ═══════════════════════════════════════════════════════════════════════
var LSEAS={
  PRICE:{scn:0.048,chr:0.038,frm:0.078,sht:0.069}, REDO:1.25,
  PN:{scn:'scenery sheets',chr:'character sheets',frm:'story frames & backdrops',sht:'shots (cut-scene series)'},
  ORDER:[
    ['Before the game (the Long Quiet)','A long, mild, grey winter','Frost on the grass, bare trees (the evergreens stay green), low sun, breath in the air. At most a dusting on roofs and fence-tops. Lakes open, roads clear. The opening — your intro video — should show this.'],
    ['The game begins','A mild spring (the Grasslands)','Cool and fresh: buds and first blossom, new grass through the old, birds back. The first walk is the first spring morning in twenty-eight years.'],
    ['Bram\'s bridge opens the Wetlands','Summer','Deep green, long light, warm nights, fireflies over the marsh. Closest to the world as it is painted today.'],
    ['Mira\'s lift opens the Highlands','Autumn','Gold and red trees, falling leaves, the harvest in, morning mist.'],
    ['Dunn\'s bridge opens the Ashlands','Winter (mild again)','Frost and bare branches, grey-blue skies, a thin flurry now and then; ash and frost together in the west. Never drifts.'],
    ['Freya is free','The real spring','Full bloom along the soul-lines, lambs and bees, the first cradles. (After the end: it stays spring — or, in the holistic level, the year keeps turning.)']],
  WINTER:['Frost, not snow: pale, rimed grass; no snowdrifts; roads and paths stay clear.','Bare deciduous trees; pines and spruces stay green, a little frost on their tips.','Roofs: a light frosting on the high edges only.','Lakes and the sea stay open; a thin rim of frost on the shore.','Breath clouds over the hero and the villagers; low, warm sun; long blue shadows.','A thin flurry now and then (a few flakes, never a blizzard).'],
  // everything a season touches, end to end: [area, what changes, L, B, H] (— = not at that level)
  SYS:[
    ['The ground','Grass, meadow, moss, heath, marsh, soil and mud take the season\'s colour.','colour-graded in code','painted seasonal grounds (10 grounds × 3 seasons)','painted, plus frost-ash grounds in the west'],
    ['Trees and bushes','Blossom, deep green, gold and red, bare.','trees and bushes for autumn and winter','trees, bushes and flowers for spring, autumn and winter','as balanced'],
    ['Small ground pieces','Tufts, reeds, flowers along the edges.','colour-graded','autumn and winter edge pieces','as balanced'],
    ['Village buildings','Roofs, eaves, window boxes.','—','seasonal dressing laid on top (blossom boxes, garlands, leaf piles, a light frost on roof edges, Yule lights)','each building repainted for autumn and winter'],
    ['The Green and the village props','The Runestone, the well, fences, carts, stalls.','—','in the dressing sheets','props repainted for autumn and winter'],
    ['Festivals','The woven saga\'s spring feast, midsummer, harvest fires, Yule, the real spring feast.','—','set-dressing for each festival on the Green','as balanced, plus festival lights at night'],
    ['Light and sky','Day and night colours, sun height, fog.','code','code','code, plus weather events (spring showers, summer storms, autumn fog, frosty mornings)'],
    ['Weather and creatures','Petals and pollen, fireflies, butterflies, falling leaves, frost glitter, breath, a thin flurry.','one painted particle sheet + code','two sheets + code','three sheets + code'],
    ['Water','Lakes, marsh, sea.','unchanged','a frosted shore rim in winter','as balanced'],
    ['The little map and the world map','Their colours follow the ground.','code','code','code'],
    ['Camps, rocks, bridges, waystones, site entrances','Their outsides in the overworld.','—','—','repainted for winter (and autumn where it shows)'],
    ['Adventure-site backdrops','The landscape behind a site\'s floors.','—','—','15 backdrops × 3 seasons'],
    ['The four islands','Their grounds and trees.','—','—','seasonal variants'],
    ['Interiors','Homes, the tavern, the guild.','—','—','seasonal decorations (Yule greens, harvest sheaves, spring flowers)'],
    ['Villagers','The ones who stand outdoors (11: Runa, Nell, Corr, Marta, Tob, Greta, Hesk, Fenwick, Bram, Dunn, Vela).','—','winter clothes (cloak and scarf)','autumn and winter clothes'],
    ['The hero','Your twin\'s look.','breath in the cold (code)','as limited','an optional winter mantle for both twins (54 sheets each — the biggest single cost, and the riskiest for keeping them on-model)'],
    ['New cut-scenes','The year turning.','2 frames added to five existing moments (the first walk, Bram\'s bridge, Mira\'s lift, Dunn\'s bridge, Freya\'s vines)','five short season cut-scenes (6 frames each) with their shot series','as balanced'],
    ['Existing cut-scenes','The eight set in today\'s overworld (the first spirit, Bram, Mira, Dunn, Vela, Asgard coming down, the Bifröst, home) show summer greens.','left as they are','repainted in their season (74 frames, both twins)','as balanced'],
    ['Music','The village\'s day and night themes; stings for the turn.','—','village day and night in each season (8) + 5 stings — Suno, by hand','plus each realm\'s day theme in each season (16 more)'],
    ['Ambience','Birdsong, insects, wind in dry leaves, winter hush.','—','16 loops (meadow, village, lake, wood × 4) — ElevenLabs','24 loops (each realm too)'],
    ['Villagers\' words','Seasonal lines, festival talk.','1 seasonal line each per season (170)','3 each per season (~510) + festival talk','~850 + weather talk'],
    ['Shops and food','Seasonal food (honey cakes, berries, apples, mulled mead).','—','4 seasonal foods at Benno\'s and Tilda\'s','plus seasonal forage at camps (berries, mushrooms, frost-herbs)'],
    ['Teaching and the journal','"The year turns" (Elder Runa); a season mark by the clock; a Tome page.','lesson + mark','lesson + mark + Tome page','as balanced'],
    ['After the end','What the seasons do once Freya\'s spring has come.','stays spring','stays spring','the year keeps turning, one season per in-game week'],
    ['The title screen and home page','Their background.','—','—','one per season, following your save'],
    ['Save and old saves','Which season you are in.','worked out from your progress (nothing new saved); an old save simply opens in its season','same','same'],
    ['Under the hood','Painting and memory.','the world repaints once when the season turns','seasonal pictures loaded only for the season you are in','same; the most to load'],
    ['Docs, the Lab and tests','The Saga and style docs, Lab review tabs, tests.','yes','yes','yes']],
  NOT:['Inside the adventure sites, castles and mage towers; boss arenas and trial realms.','Muspelheim, the four forges, the sky ports and Asgard (above the weather).','The monsters (each realm keeps its own).','The Highlands\' peaks keep the snow they already have; the Ashlands\' lava keeps its glow.'],
  LEVELS:[
    {id:'limited',name:'Limited — colour and weather',pitch:'The season shows in the land\'s colour, the light, the weather and the trees; a short beat in five existing cut-scenes tells the turn.',
     items:[['Trees: autumn and winter versions (4 sheets × 2)','scn',8],['Bushes and flowers: autumn and winter (3 × 2)','scn',6],['Seasonal particles (petals, fireflies, leaves, frost, breath)','scn',1],['Season marks for the HUD, seasonal food icons','scn',1],['Season beats added to five existing moments (2 frames × 5, both twins where the hero shows)','frm',15]],
     audio:'None.',words:'170 seasonal lines (no API cost).',code:'Colour grading of the ground and small pieces, light and sky tints, particles, map colours, the season worked out from progress, a world repaint on the turn, the HUD mark, the lesson.',
     rounds:'1–2 rounds',mb:13,shots:'All 1,434 waiting shots can run now (no frames are repainted).',
     feel:'You notice the turn — green to gold to bare — but the buildings, the village and the cut-scenes look the same as today.'},
    {id:'balanced',name:'Balanced — a changing world',pitch:'The overworld and the village are painted for each season, the festivals are dressed, the turn has its own cut-scenes, and the cut-scenes set outdoors match their season.',
     items:[['Seasonal grounds (10 grounds × spring, autumn, winter = 30 tiles)','scn',5],['Trees: spring, autumn, winter (4 × 3)','scn',12],['Bushes and flowers: spring, autumn, winter (3 × 3)','scn',9],['Edge pieces (tufts, reeds, flowers): autumn and winter (6 × 2)','scn',12],['Village seasonal dressing (one sheet a season)','scn',4],['Festival set-dressing on the Green (spring feast, midsummer, harvest, Yule)','scn',4],['Particles (2), season marks and seasonal food (1)','scn',3],['Five season cut-scenes (6 frames each, both twins where the hero shows)','frm',45],['The eight outdoor cut-scenes repainted in their season (74 frames, both twins)','frm',111],['Shot series for the five new cut-scenes (30 frames × 6 to choose from)','sht',180],['Winter clothes for the 11 outdoor villagers (2 sheets each)','chr',22]],
     audio:'Suno: 8 village tracks + 5 stings (one Pro month, about $10). ElevenLabs: 16 ambience loops, about 26,000 credits (inside a $22 Creator month).',words:'About 510 seasonal lines and the festival talk.',code:'Everything in limited, plus seasonal pictures in the world painter (loaded per season), the village dressing, outfits that swap, the five cut-scenes in the story queue, music and ambience by season, seasonal food, the Tome page.',
     rounds:'4–6 rounds',mb:200,shots:'Run the 1,014 shots that show no season now; hold the 420 for the eight outdoor cut-scenes until their frames are repainted (they are already in the plan — no extra cost).',
     feel:'The world, the village and the story agree with each other at every season; the festivals feel like events.'},
    {id:'holistic',name:'Holistic — every corner',pitch:'Balanced, plus every outdoor building and prop, the site backdrops, the islands, interiors, two outfits for the outdoor villagers, the title screen, weather events, seasonal forage, music for each realm in each season, and the year still turning after the end.',
     items:[['Everything in balanced: scenery','scn',49],['Village buildings repainted: autumn and winter (14 × 2)','scn',28],['Village props, camps (4 + 4 sheets × 2)','scn',16],['Rocks, bridges, waystones, site entrances: winter (5 + 3 + 2 + 9)','scn',19],['Frost-ash grounds, the four islands, interior decorations, weather, forage','scn',12],['Everything in balanced: frames','frm',156],['Site backdrops in three seasons (15 × 3)','frm',45],['Title screen and home page per season','frm',4],['Everything in balanced: shots','sht',180],['Outdoor villagers: autumn and winter clothes (11 × 2 × 2)','chr',44],['Optional: a winter mantle for both twins (2 × 54 sheets)','chr',108]],
     audio:'Suno: 29 tracks (two months is safer, about $20). ElevenLabs: 24 loops, about 38,000 credits (one Creator month).',words:'About 850 lines with festival and weather talk.',code:'Everything in balanced, plus weather events, forage, the seasons cycling after the end, seasonal title screens, interiors.',
     rounds:'10–14 rounds',mb:360,shots:'As balanced.',
     feel:'Nothing in the overworld or the village looks out of season. The heaviest to make, review and maintain.',
     opt:'Without the twins\' winter mantle: 108 fewer sheets (553 in all), about $5 less ($45), and far less risk.'}],
  SAGA:{t:'The woven saga\'s own art (any level, even without seasons)',items:[['Festival games: hnefatafl board, forge-off anvil, flyting cards, the monarchs\' feast table','scn',4],['The Red Gold: coins, Zahir\'s strongbox and book; the saga book\'s pages','scn',2],['The Mending (tempered): the mended well and doorframe, the bench, boats and stalls','scn',2],['One painted moment per chapter (Rolf\'s second cup, Benno\'s loaf, Mira\'s tiny lift, Corr leaving the gate, the twentieth shawl)','frm',8]]},
  REC:'My recommendation: Balanced. It delivers what you asked for — buildings, scenery and cut-scenes that show the season, and cut-scenes that tell the turn — for about $35 in pictures (with redos) and a $10 + $22 month of music and ambience. Limited is cheap but leaves the village and the story looking like summer all year. Holistic adds about $15 more in pictures but more than doubles the work and your review (661 pictures, 553 without the twins\' mantle), mostly for things seen briefly (site entrances, backdrops, rocks); its riskiest part, the twins\' winter mantle, I would leave out in any case.',
  PENDING:'Either way: of the 1,434 shots waiting, 1,014 show no season (the past, the sky, under the mountain, indoors, after the end) and can run now — r114_now. The other 420 (the first spirit, Bram, Mira, Dunn, Vela, Asgard coming down, the Bifröst, home) are in r114_after_seasons: run them now for limited, or after their frames are repainted for balanced or holistic. For scale, the 1,434 shots are about $99 on their own.'
};
LSEAS.total=function(L){ var t={scn:0,chr:0,frm:0,sht:0}, usd=0; L.items.forEach(function(x){ t[x[1]]+=x[2]; usd+=x[2]*LSEAS.PRICE[x[1]]; }); return {n:t, usd:usd, redo:usd*LSEAS.REDO, two:usd*LSEAS.REDO*2}; };
