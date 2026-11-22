"""Round 128 — PLAYABILITY AND ENGAGEMENT: the evidence, the seven theses and the 40 proposals (Kris: "a full 'playability and engagement'
analysis … reducing friction and improving gameplay … retention and engagement … similar games … psychological literature … make the game
more engaging and want you to share with others … overarching theses … holistic proposals … Cap this at 40 new proposals").
Read by tools/world/r128_plan.py, which writes the Lab's data (lab/src/js/79z-0-r128-data.js)."""

SRC = {
    'ga26': ['GameAnalytics — mobile and PC benchmarks 2026', ''],
    'crazy': ['CrazyGames — developer requirements (load, size, session)', ''],
    'poki': ['Poki — web games audience report 2026', 'https://poki.com/'],
    'duo': ['Duolingo — streaks and streak freezes (company blog)', ''],
    'lally': ['Lally et al. 2010, How are habits formed — one missed day does not break habit', 'https://doi.org/10.1002/ejsp.674'],
    'sdt': ['Ryan, Rigby & Przybylski 2006 — the motivational pull of video games (competence, autonomy, relatedness)', 'https://doi.org/10.1007/s11031-006-9051-8'],
    'endow': ['Nunes & Drèze 2006 — the endowed progress effect (34 % vs 19 %)', 'https://doi.org/10.1086/500480'],
    'peak': ['Gutwin et al., CHI 2016 — peak-end effects on game replay choice', 'https://doi.org/10.1145/2858036.2858419'],
    'qf': ['Quantic Foundry — 12 gamer motivations in 6 clusters', 'https://quanticfoundry.com/gamer-motivation-model/'],
    'wordle': ['Wordle — the spoiler-free share grid and the daily cadence', 'https://www.nytimes.com/games/wordle/'],
    'botw': ['Breath of the Wild — the triangle rule, visible points of interest (GMTK / Nintendo GDC 2017)', ''],
    'celeste': ['Celeste — Assist Mode', 'https://celestegame.fandom.com/wiki/Assist_Mode'],
    'hades': ['Hades — narrative rewards for dying; a house that remembers', 'https://www.supergiantgames.com/games/hades/'],
    'pogo': ['Pokémon GO — live events, weekly cadence, play together outdoors', 'https://pokemongolive.com/'],
    'souls': ['Dark Souls / Death Stranding / Journey — ambient, asynchronous play with strangers', 'https://en.wikipedia.org/wiki/Asynchronous_multiplayer'],
    'zagal': ['Zagal, Björk & Lewis 2013 — Dark patterns in the design of games', ''],
    'roblox': ['Roblox — onboarding guidance for experiences', ''],
    'zeig': ['Zeigarnik effect — unfinished tasks are remembered (and pull you back)', 'https://en.wikipedia.org/wiki/Zeigarnik_effect'],
}

BENCH = [
    ['Mobile day-1 return', 'top quarter of games > 30 %, top tenth ≈ 40 %', 'ga26'],
    ['Mobile day-7 return', 'median under 4 %', 'ga26'],
    ['Mobile day-30 return', 'median ≈ 0.7 %', 'ga26'],
    ['PC session length', 'median ≈ 18 minutes', 'ga26'],
    ['Web game load', 'under 10 s; first download under 20 MB; sessions of 10 min or more', 'crazy'],
    ['Web players who quit a game for slow loading', '46 %', 'poki'],
    ['Web players who later bought a game after playing it in the browser', '62 %', 'poki'],
    ['A 7-day streak', '3.6 × more likely to finish the course (Duolingo)', 'duo'],
    ['A head start on a goal', '34 % finish vs 19 % without (two of ten stamps given)', 'endow'],
    ['A high ending', 'players chose to replay 18 vs 6 when the session ended on a peak', 'peak'],
]

# today — what the game already does well, and where it rubs (the audit)
TODAY = [
    ['good', 'A painted, hand-made world with a real story, seasons, villagers with arcs and a twin', 'relatedness and wonder are already the game\'s strongest pull'],
    ['good', 'Four difficulty levels (Hearthside … Ragnarök) and a Training tab; lessons can be turned off', 'competence is respected'],
    ['good', 'The first minutes are taught by doing (your twin walks you out)', 'onboarding by play, not by reading'],
    ['rub', 'Saving is manual (round 47); it saves itself only at milestones', 'a closed tab or a crash can cost up to a whole site of play; the fear of losing progress shortens sessions'],
    ['rub', 'The first load is the whole game: ≈ 390 MB of art, music and film (doc 50)', 'web players leave before the title screen; portals ask for under 20 MB to start'],
    ['rub', '31 lessons each pause the game in the rune-stone box', 'every pause is a small exit door in the first hour'],
    ['rub', 'Death costs 10 % of your gold and sends you to the village at a quarter health', 'loss without meaning; Hades turns the same moment into story'],
    ['rub', 'No gamepad support; touch exists', 'Steam Deck and couch players expect a controller'],
    ['rub', 'Nothing to share: no photo mode, no share card, no second player', 'nobody hears about the game from a player'],
    ['rub', 'No way to know how long a site takes before going in', 'players cannot fit play to the evening they have'],
    ['rub', 'Nothing tells us where players stop (no play data at all)', 'every change is a guess'],
]

THESES = [
    {'id': 'door', 'n': 'Lower the door', 'ic': '🚪', 'col': '#7fd0ff',
     'claim': 'The cheapest player to keep is the one lost before minute one. Start in seconds, play on anything, never ask twice.',
     'why': 'Web: 46 % have quit a game for slow loading; portals want under 20 MB to start and under 10 s to play. The first load today is the whole game.', 'src': ['poki', 'crazy']},
    {'id': 'win', 'n': 'Competence first', 'ic': '⚔️', 'col': '#ffb86a',
     'claim': 'The first hour should feel like getting good, not being told. A win, a find and a thank-you inside five minutes.',
     'why': 'Competence and autonomy predict enjoyment and wanting to play again (self-determination studies of games); Breath of the Wild\'s plateau teaches by situation.', 'src': ['sdt', 'botw', 'roblox']},
    {'id': 'evening', 'n': 'Respect the evening', 'ic': '🕯️', 'col': '#ffe08a',
     'claim': 'Every sitting has a shape: a clear goal, about 20 minutes, a high ending and a reason to come back — and nothing is ever lost.',
     'why': 'PC sessions centre on ≈ 18 min; ending on a peak triples the wish to replay; an unfinished thread pulls people back (Zeigarnik).', 'src': ['ga26', 'peak', 'zeig']},
    {'id': 'world', 'n': 'A world that reads itself', 'ic': '🧭', 'col': '#8fe8a0',
     'claim': 'You should always see something worth walking to. Landmarks pull, the map remembers, one thread is lit at a time.',
     'why': 'The triangle rule and visible points of interest drive exploration without lists; autonomy needs a readable choice.', 'src': ['botw', 'sdt']},
    {'id': 'hearth', 'n': 'A village that remembers you', 'ic': '🏡', 'col': '#ff9ec0',
     'claim': 'The village is the engine. Every return shows change, someone noticed what you did, and even dying tells you something.',
     'why': 'Relatedness predicts hours played; Hades makes every death and return a conversation.', 'src': ['sdt', 'hades']},
    {'id': 'rhythm', 'n': 'A rhythm, never a leash', 'ic': '🌙', 'col': '#c8a8ff',
     'claim': 'Reasons to come back (seasons, a daily rune, letters) — but missing a day costs nothing, and nothing is for sale that wins.',
     'why': 'Forgiving streaks work (freezes help; one missed day does not break a habit); dark patterns (energy timers, loot boxes, fear of missing out) buy days and lose trust.', 'src': ['duo', 'lally', 'zagal']},
    {'id': 'share', 'n': 'Made to be shared', 'ic': '🪶', 'col': '#a8f0e8',
     'claim': 'Every peak should leave something to show: a painting, a card, a challenge code, a second controller for someone you love.',
     'why': 'Wordle spread on a spoiler-free grid; Pokémon GO on playing together; Journey and Souls on strangers\' small kindnesses.', 'src': ['wordle', 'pogo', 'souls']},
]

# the 40 proposals: (id, name, thesis, what it is, what changes in the game, why, new art?, effort S/M/L, what we would measure)
P = [
 # ── lower the door ──
 ('fast_start', 'Start in seconds', 'door', 'Split the game into a small first pack (title, village, first fields: ≈ 15 MB) and stream the rest by region while you play.',
  ['build.mjs: a first pack and region packs', 'the loader shows the title as soon as the first pack is in', 'a quiet "the world is still arriving" note at the edge of unloaded regions'],
  'Portals ask for under 20 MB and under 10 s; 46 % of web players have left a slow game.', '', 'L', 'time to title; share of visitors who reach the first fight'),
 ('play_now', 'Play now, choose later', 'door', 'One button from the title into the game. The hero is chosen inside the opening (which twin wakes first), not on a form.',
  ['the profile form becomes optional', 'the choice of hero moves into the first cut-scene'], 'Every screen before play is a door out.', '', 'S', 'share of new players who reach the first lesson'),
 ('gamepad', 'Any controller, any screen', 'door', 'Full gamepad play (Xbox / PlayStation / Switch pads), remappable keys and the touch controls finished — aimed at Steam Deck "Verified".',
  ['a gamepad layer in the input code', 'button pictures painted for the lessons', 'a remap page in Training'], 'Steam Deck and couch players expect it; the Deck badge is visible on the store.', 'button prompts', 'M', 'share of sessions on a pad'),
 ('assist', 'Assist, without shame', 'door', 'Celeste-style assist options beside the difficulty: game speed 70–100 %, extra hearts, keep your gold on death, gentle aim — named kindly, never punished.',
  ['a new Assist page in the pause panel', 'the options saved per save'], 'Celeste\'s Assist Mode let far more players finish without cheapening the game for anyone else.', '', 'M', 'finish rate by option'),
 ('lessons_soft', 'Lessons that don\'t stop you', 'win', 'Most lessons become a short line under the little map while you keep playing; only five big ones still pause.',
  ['ZLES: "pause" only for the five', 'a soft glow on the key / button being taught'], 'Every pause in the first hour is a small exit door; Breath of the Wild teaches by situation.', '', 'S', 'pauses in the first hour; first-hour quits'),
 ('first_win', 'A win in five minutes', 'win', 'Guarantee that within five minutes you beat something, pick up something shiny and a villager thanks you by name.',
  ['the first walk ends at a small fight (a bramble wolf at the fence)', 'Oswin gives the wooden sword after it, not before'], 'Competence first; endowed progress makes the next goal feel half-done.', '', 'S', 'minutes to first win'),
 # ── respect the evening ──
 ('safe_saves', 'Never lose more than a minute', 'evening', 'Keep the saga book as the ritual save, but the game also keeps a quiet safety save every minute and when the tab closes or hides.',
  ['ZSAVE: a rolling safety save (separate slot)', '"Continue" offers the newer of the two', 'the leave guard no longer needs to warn'], 'The fear of losing progress shortens sessions and stops people starting one.', '', 'S', 'progress lost after a crash (should be ≈ 0)'),
 ('saga_night', 'Last time, in your saga…', 'evening', 'On loading, a painted recap card: where you are, what you did last, and three goals sized to about 20 minutes.',
  ['a recap card over the world on load', 'goals picked from the open quests by size'], 'A clear goal at the start; sessions centre on ≈ 18 min.', 'card frame (the r127 tapestry frame)', 'M', 'session length; share of sessions that finish a goal'),
 ('site_time', 'How long is it?', 'evening', 'Every site on the map shows its usual length (≈ 8 min, ≈ 20 min) and how far in you are.',
  ['the map tip and site door show the time (from our economy timings)'], 'People choose to play when they know it fits the evening.', '', 'S', 'sites started late in the evening that are finished'),
 ('rest_hearth', 'Rest by the hearth', 'evening', 'After a site or a boss, a painted tableau tallies what you won, then offers "Rest by the hearth" — save, see the village at dusk, quit on a high.',
  ['a tally scene after every site', 'quitting from it plays a short dusk vignette'], 'Peak-end: ending on a high makes people want to play again.', 'dusk vignette (from the r127 vistas)', 'S', 'sessions that end at a tally (not a death or a closed tab)'),
 ('next_hook', 'Something left unfinished', 'evening', 'When you rest, one line of what is waiting: "Mira says the lift is almost done…" — and it is true next time.',
  ['a line picked from the next quest or the next season'], 'An open thread pulls people back (Zeigarnik).', '', 'S', 'return within 3 days'),
 # ── a world that reads itself ──
 ('landmarks', 'Something worth walking to', 'world', 'Tall, unique landmarks in each region (the World Tree stone, Mira\'s lift, the bridges) visible from far away, each one a goal.',
  ['the r127 landmark paintings placed in the world', 'the camera pulls back a little on open ground'], 'Breath of the Wild\'s triangle rule: hills hide, landmarks pull.', 'landmarks (ordered in r127)', 'M', 'distance walked off the main road'),
 ('map_stamps', 'A map that remembers', 'world', 'The map fills in as you see it (waystones reveal a region from above) and you can drop painted stamps: chest, danger, return later.',
  ['fog on the map until seen', 'eight stamp kinds you place yourself'], 'Autonomy: your own notes make your own route.', 'stamps (8)', 'M', 'stamps placed; waystones found'),
 ('raven_thread', 'Follow the raven', 'world', 'Track one quest at a time; a raven flies ahead along the way and waits at turns. Everything else lives in the journal.',
  ['a "tracked" quest (one)', 'a raven sprite that flies the path and lands near the goal'], 'One lit thread instead of a list; fewer "where do I go?" quits.', 'raven (flying, landing)', 'M', 'time lost between quest steps'),
 ('secrets', 'Little secrets everywhere', 'world', 'Small hidden things every minute or so of walking — lost runes, huldra stones, a fox that leads somewhere — counted in the Tome.',
  ['about 120 secrets across the regions', 'a Tome page with the count per region'], 'Curiosity rewarded often keeps exploration alive (the Korok idea, made Norse).', 'secret props (12 kinds)', 'M', 'secrets found per hour'),
 ('stuck_help', 'A hint when you\'re stuck', 'world', 'If nothing progresses for ten minutes, your twin or the raven offers a hint — once, and you can say no.',
  ['a stuck detector (no quest step, no new place)', 'three levels of hint per quest step'], 'Quiet frustration is the most common silent quit.', '', 'S', 'quits after a long stall'),
 # ── competence & mastery ──
 ('tells', 'Every attack tells you first', 'win', 'One language for boss tells across the game: colour and sound by the r127 themes (red sweep, gold shot, violet area…), and a "how you did" card after each fight.',
  ['tell colours and sounds from the boss plan themes', 'a fight card: dodges, hits taken, time'], 'Fair difficulty is learnable difficulty.', '', 'M', 'deaths per boss; retries before a win'),
 ('echo_hall', 'The Hall of Echoes', 'win', 'Beaten bosses can be fought again in a hall of echoes for bronze, silver and gold runes (gold: no hit).',
  ['a hall in Asgard\'s city (or the village crypt) with a door per boss', 'medals in the Tome'], 'Mastery players replay for mastery (Cuphead, Hades); a goal after the ending.', 'hall + medal runes', 'M', 'rematches per player'),
 ('three_paths', 'Three ways to fight', 'win', 'Shieldmaiden, ranger and rune-caster as clear styles: each gets a signature move, gear leans to one, and you can change at the hearth for free.',
  ['three signature moves', 'gear tags by style', 'free change of style at home'], 'Autonomy: your own way to be good.', 'signature move effects', 'L', 'spread of styles; style changes'),
 ('death_story', 'Dying tells you something', 'hearth', 'Death keeps its small cost but gives back a story morsel: who found you, a villager\'s word, a page of lore. Your lost gold waits where you fell.',
  ['a "who found you" line after each death', 'a pouch at the death spot holding the lost gold'], 'Hades turned dying into the story; loss with meaning is loss you accept.', 'lost pouch', 'M', 'quits within a minute of dying'),
 # ── a village that remembers you ──
 ('village_grows', 'The village grows with you', 'hearth', 'Each saga you finish changes the village you see: new houses, a mill, lanterns, a market day, children after the celebration.',
  ['village stages tied to the story', 'painted additions per stage'], 'Visible change is the strongest reason to come home.', 'village stages', 'L', 'visits home per hour'),
 ('bonds', 'Friends in the village', 'hearth', 'Bonds with six villagers that grow by talking, small gifts and their own quests, each with two painted scenes.',
  ['a bond level per villager', 'gift likes and dislikes', 'twelve bond scenes'], 'Relatedness predicts hours played (Stardew\'s heart events).', 'bond scenes (12)', 'M', 'gifts given; bond scenes seen'),
 ('twin_near', 'Your twin is never far', 'hearth', 'The other twin comments on what you did, waits at the hearth, leaves notes on the table and sometimes fights beside you.',
  ['twin lines for big moments', 'notes at home', 'an ally twin in some fights'], 'The game\'s heart is the twins; let it be felt every day.', 'twin poses', 'M', 'twin lines heard'),
 ('letters', 'Letters while you were away', 'rhythm', 'When you come back after a day or more, villagers have left letters on the table — news, thanks, a small gift.',
  ['letters written from what you did last', 'one small gift per letter'], 'A warm welcome back instead of a punishment for leaving.', 'letter seals', 'S', 'return after a long absence'),
 ('home_trophies', 'A home of your own', 'hearth', 'Your house fills with trophies from bosses and keepsakes from quests that you place yourself.',
  ['trophy spots in the house', 'placing and moving pieces'], 'Mastery made visible; something to show.', 'trophies (from boss art)', 'M', 'trophies placed'),
 # ── a rhythm, never a leash ──
 ('festivals', 'The seasons as a calendar', 'rhythm', 'The five seasons each bring a festival week with its own small games and rewards; festivals come back every year, so nothing is ever missed for good.',
  ['festival boards', 'three small games per festival', 'season rewards (cosmetic)'], 'A reason to return with no fear of missing out.', 'festival games', 'M', 'festival days played'),
 ('rested', 'Well rested', 'rhythm', 'After time away, your first half hour gives double experience and gold — coming back is rewarded, being away is not punished.',
  ['a rested bar beside the experience bar'], 'Forgiveness keeps habits; punishment breaks them.', '', 'S', 'return rate after 3+ days'),
 ('daily_rune', 'The daily rune', 'rhythm', 'A three-to-five-minute rune trial each day, the same for everyone, with a spoiler-free share grid; misses cost nothing.',
  ['a trial built from a daily seed', 'a painted share grid (runes, not spoilers)'], 'Wordle\'s daily ritual and share grid.', 'grid runes', 'M', 'daily players; shares'),
 ('tome_book', 'The Tome as a collection', 'rhythm', 'Every Tome chapter shows how full it is, with painted stickers to collect; it starts a little filled, so the first pages are already yours.',
  ['completion per chapter', 'stickers for firsts'], 'Endowed progress: a head start makes finishing likelier (34 % vs 19 %).', 'stickers', 'S', 'Tome completion'),
 ('ngplus', 'The saga retold', 'rhythm', 'After the end, start again in Freya\'s spring with the bosses remade (the boss plan\'s extra moves) and your Tome kept.',
  ['a new game plus with harder fights and new lines'], 'A second life for players who loved it.', '', 'L', 'new game plus starts'),
 ('loom', 'The Saga Loom (new)', 'rhythm', 'A great loom in the village weaves a painted tapestry panel for every saga you finish — your whole journey on one wall, and a picture to share.',
  ['the loom in the longhouse', 'a tapestry panel per saga'], 'Progress you can see and show; a new mechanic and a new image.', 'tapestry panels (≈ 24)', 'M', 'loom visits; tapestry shares'),
 # ── made to be shared ──
 ('photo_mode', 'Photo mode', 'share', 'Pause and frame a painting: hide the HUD, pick a flourish frame (r127), a season grade, a pose, and save it.',
  ['a photo mode in the pause panel', 'frames and grades from round 127', 'a small title mark in the corner'], 'Beautiful games are shared as pictures; this is the game\'s best advertisement.', 'frames (ordered in r127)', 'M', 'photos saved'),
 ('share_cards', 'Saga cards', 'share', 'At the peaks (a boss falls, a festival, the ending) a painted card with what you did — no spoilers — to save or share.',
  ['cards drawn on a canvas', 'one button: copy or share'], 'Spoiler-free sharing spread Wordle.', 'card frames', 'M', 'cards shared'),
 ('challenge_codes', 'Challenge a friend', 'share', 'A boss echo or trial with a code; your friend plays the same and sees your time.',
  ['codes for echoes and trials', 'a friend\'s best time shown'], 'A direct reason to send the game to someone.', '', 'M', 'codes made; codes played'),
 ('couch_coop', 'Two twins, two players', 'share', 'Local co-op: a second player joins as the other twin, drop in and out.',
  ['a second hero in the world and in sites', 'the camera follows both', 'shared loot'], 'The game is about twins; families and friends play together — the strongest sharing of all.', 'twin co-op poses', 'L', 'co-op sessions'),
 ('helper_mode', 'The helper\'s seat', 'share', 'A second player (a child, a parent) plays the raven or the familiar: points, carries a light, helps a little.',
  ['a simple second input that moves the raven', 'small helps (light, pick-ups)'], 'Mario Galaxy\'s co-star: everyone can play.', 'raven (from raven_thread)', 'M', 'helper sessions'),
 ('rune_notes', 'Runes from other travellers', 'share', 'Players leave short runes of help at places ("treasure ahead", "beware the left") from a fixed list; others see a few of them.',
  ['a small server', 'phrases from a list (no free text)', 'reporting and hiding'], 'Souls and Death Stranding\'s quiet kindness between strangers.', 'rune marks', 'L', 'notes left; notes rated helpful'),
 ('stream_ready', 'Streamer-ready', 'share', 'A streamer mode (no names shown, music safe to stream — we own it) and moments built to be clipped.',
  ['a streamer toggle', 'a note on the store page'], 'Streams are how small games are found.', '', 'S', 'streams found'),
 # ── honest measurement and fair play ──
 ('playtest_data', 'Know where players stop', 'evening', 'Opt-in, anonymous play data: where sessions end, deaths per boss, time per site — nothing personal, off by default for children.',
  ['an opt-in at first start', 'a tiny log sender', 'a Lab page with the charts'], 'Every proposal here is a guess until we see where people stop.', '', 'M', 'the funnel itself'),
 ('fair_pledge', 'A fair-play pledge', 'rhythm', 'A short pledge on the title and the store page: no loot boxes, no energy timers, nothing for sale that wins, no punishment for a missed day.',
  ['a page in the About section', 'the same words on the store page'], 'Trust is a reason to buy; dark patterns are a reason to leave a review.', '', 'S', 'store page conversion'),
]

WAVES = [
    ['Wave 1 — the friction (two or three rounds)', ['safe_saves', 'play_now', 'lessons_soft', 'first_win', 'site_time', 'rest_hearth', 'next_hook', 'stuck_help', 'assist', 'playtest_data', 'fair_pledge']],
    ['Wave 2 — depth and warmth', ['saga_night', 'tells', 'death_story', 'raven_thread', 'map_stamps', 'landmarks', 'secrets', 'bonds', 'twin_near', 'letters', 'rested', 'tome_book', 'village_grows', 'home_trophies', 'echo_hall', 'three_paths']],
    ['Wave 3 — sharing and release', ['fast_start', 'gamepad', 'photo_mode', 'share_cards', 'challenge_codes', 'daily_rune', 'festivals', 'couch_coop', 'helper_mode', 'loom', 'rune_notes', 'stream_ready', 'ngplus']],
]


def data():
    pr = [{'id': p[0], 'n': p[1], 'th': p[2], 'd': p[3], 'ch': p[4], 'why': p[5], 'art': p[6], 'eff': p[7], 'm': p[8]} for p in P]
    ids = [p['id'] for p in pr]
    assert len(pr) == 40 and len(set(ids)) == 40, len(pr)
    assert sorted(sum((w[1] for w in WAVES), [])) == sorted(ids)
    return {'src': SRC, 'bench': BENCH, 'today': TODAY, 'theses': THESES, 'p': pr, 'waves': WAVES}
