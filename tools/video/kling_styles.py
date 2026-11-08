"""Round 92: FIVE WAYS TO PROMPT KLING, TEN FIRST TRIES (Kris: "i'm still not set on the cutscenes … you may have started to shorten the
prompts, but Kling can take a very long prompt. Study video game cut scenes and what make especially good ones, and come up with 5 very
different types of prompts … come up with 10 different initial ideas for me to choose 5 from to put into Kling. I still think we should feed it
all the images … but we might want to open up their algorithm a bit more"). Doc 48.

The five styles differ in how much they let Kling invent (the "freedom dial"), how they cut, and how long the prompt is:
  living    Living Painting      freedom 1/5  each picture IS the shot, brought to life (parallax, weather, breath); slow dissolves
  director  Director's Cut       freedom 3/5  the pictures are key frames; Kling adds coverage (wides, close-ups, reactions) between them
  onetake   One-Take Journey     freedom 3/5  no cuts: one camera flight that passes through every picture as a waypoint
  rhythm    Rhythm Montage       freedom 2/5  trailer-style beat cuts at ~115 BPM, punch-ins, speed ramps, the last picture held longest
  poem      Mythic Visual Poem   freedom 5/5  the pictures are inspiration and character references; feeling leads, transitions are dreamlike
Every style feeds Kling ALL of the scene's pictures (image1.png … in order). The words of the story are NOT in the video: the game shows them
(under the video, or on black text cards between shots — Lab → Cut-scene styles). Kling's sound is never used.

  python tools/video/kling_styles.py          → video_requests/S01_… S10_ (pictures, PROMPT.txt, SAVE AS …) and the Lab's list
                                                (lab/src/js/79o0-cutstyles-data.js). Pictures come from sprites/storyboards (as kling.py).
"""
import os, sys, json, re, shutil
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SB = os.path.join(ROOT, 'sprites', 'storyboards'); OUT = os.path.join(ROOT, 'video_requests')
J = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json'), encoding='utf-8'))
SC = {s['id']: s for s in J['scenes']}
LONG = 20      # seconds (the cheaper Kling model); every picture is used, each gets LONG / pictures
fs = lambda x: ('%.1f' % x).rstrip('0').rstrip('.')

WORLD = ('THE WORLD: Runeheim, a hand-painted Norse-inspired fantasy realm — timber longhouses, carved runestones, lakes, fjords and fire-mountains, '
         'under aurora borealis and shooting stars. Rich storybook illustration: painterly brushwork, deep colour, glowing neon rune-blue magic. '
         'Every frame must look like these paintings moving — the same painted style, the same faces, hair, clothes and colours as in the pictures.')
KEEP = ('KEEP OUT: anything modern (umbrellas, glasses, phones, guns, cars, street lamps, zips, modern clothes), any text, letters, captions, subtitles, '
        'logos or watermarks, photorealism or a plastic 3D-render look, people or creatures who are not in the pictures, changed faces or costumes, '
        'extra fingers or limbs, warped faces, flicker, sudden changes of art style. No speech or lip-sync; the sound will be replaced.')

STYLES = [
 dict(id='living', name='Living Painting', free=1, like='the painted prologue of a mythic RPG (Elden Ring\'s opening), Ken Burns documentaries, 2.5D parallax intros',
      best='lore, memories, quiet and sad moments, anything narrated — and the safest way to keep the pictures exactly',
      cut='one picture per shot, long soft cross-dissolves', text='text cards between shots, or the line under the picture',
      how='Each picture IS the shot. Kling may only bring it to life: parallax layers, weather, light, breath and small gestures. Nothing is re-staged.'),
 dict(id='director', name='Director\'s Cut', free=3, like='story cinematics of narrative games (The Witcher 3, God of War, Final Fantasy) — shot-reverse-shot, cutting on action',
      best='scenes with people doing things together: building, finding, talking, deciding',
      cut='3–6 cuts per picture: wide → medium → close-up → reaction', text='the line under the picture, or one card at the start',
      how='The pictures are the key frames and the visual bible. Kling adds coverage of the same people in the same places between them.'),
 dict(id='onetake', name='One-Take Journey', free=3, like='the single unbroken camera of God of War (2018), Journey\'s flights, drone shots through a world',
      best='travelling between places and between worlds: the sky opening, rising to Asgard, crossing the Bifröst',
      cut='no cuts at all — one continuous camera flight', text='one card before, one after (nothing should interrupt the flight)',
      how='The pictures are waypoints. The camera arrives at each, settles so the frame matches it, then flies on through spaces Kling invents to join them.'),
 dict(id='rhythm', name='Rhythm Montage', free=2, like='epic game trailers and boss intros (Diablo, Hades\' boss title cards), music-video cutting',
      best='boss reveals, battles, escapes — energy and spectacle',
      cut='hard cuts on the beat (every 0.5–1 s), punch-ins, speed ramps, impact frames; the last picture held longest', text='the boss\'s name as a title card at the end',
      how='The pictures are the story order and the shots to cut between; Kling may repeat, punch in on details and re-frame them, but never invent new places.'),
 dict(id='poem', name='Mythic Visual Poem', free=5, like='Journey, Ori and the Blind Forest\'s wordless prologue, Studio Ghibli dream sequences',
      best='the big emotional and mythic moments: births, the gods, the end of the story',
      cut='flowing, dreamlike transformations rather than cuts', text='text cards at a slow reading pace (they carry the words; the video carries the feeling)',
      how='The pictures are inspiration and references for how the characters, places and colours look. Kling may interpret, combine and transform them; it must end on the last picture.'),
 # round 92b (Kris: "Instead of 10 different styles for different videos, I want 10 different styles to consider for 1 single video"): five more,
 # each a framing device or a way of treating time — so the one video can be tried ten ways
 dict(id='flames', name='Visions in the Fire', free=3, like='a skald\'s tale by the hearth; prologues told in smoke and embers (The Witcher\'s and Hellblade\'s fire-lit visions)',
      best='legends and the long-ago — the story told as if remembered around a fire',
      cut='each picture rises out of the flames and smoke, plays, then burns back into embers that become the next', text='the line under the picture, fading in fragments',
      how='A hearth fire frames the tale. Each picture forms out of the fire and smoke, comes alive, and burns away into the next. No people are added.'),
 dict(id='tapestry', name='The Woven Saga', free=3, like='a Norse saga tapestry coming alive; the camera tracking along an embroidered cloth (title sequences of historical epics)',
      best='history and lore told as a record of the realm',
      cut='a slow track along the cloth; each woven panel melts into the living painting, then weaves back into thread', text='the line under the picture, or woven into the border (not readable letters)',
      how='Each picture is first a panel of a long woven saga-cloth; its threads glow and it melts into the moving painting, then weaves back as the camera tracks on.'),
 dict(id='storybook', name='The Rune-Bound Book', free=2, like='storybook openings (Disney\'s classic book prologues, Fable), pop-up books',
      best='the opening and the ending — the feeling of a tale being read',
      cut='page turns; each page\'s painting rises into pop-up depth and moves', text='the line under the picture (never written on the page)',
      how='Each picture is painted on a page of an ancient book. The page comes alive with pop-up parallax depth, then turns to the next picture.'),
 dict(id='runestone', name='The Carved Runestone', free=3, like='carved-relief title sequences; God of War\'s murals; Norse picture stones (the Gotland stones)',
      best='myths of the gods and the ancient past',
      cut='each picture emerges from glowing carved stone, comes alive in full colour, then hardens back into carving', text='text cards or the line under the picture',
      how='Each picture first appears as a relief carved in a tall runestone, lit by neon rune-blue light, then softens into the painted scene in motion and back into stone.'),
 dict(id='frozen', name='Frozen Moments', free=3, like='bullet-time and time-stop shots; Final Fantasy\'s frozen battle moments; tableau vivant',
      best='turning points — the instant everything changes',
      cut='each picture is a moment frozen in time that the camera moves through in 3D; then time snaps forward to the next', text='the line under the picture, one fragment per frozen moment',
      how='Each picture is one instant with time stopped — rain, embers, sparks and spirits hanging in the air — and the camera moves through it in 3D; then time lurches forward.'),
 # round 92c (Kris: "options where each of the images is inspiration only, and there is a continuous story going throughout … not necessarily using the
 # images directly and in the order. focus on creating the story line for kling to follow")
 dict(id='story', name='Story-Led', free=4, like='story-first cinematics: a continuous tale with cause and effect, the art direction taken from a mood board',
      best='when the story should flow as one — the pictures guide the look, the storyline guides what happens',
      cut='whatever the story needs — one flowing scene or a few linked shots', text='the line under the picture, fading in fragments',
      how='The pictures are inspiration only — a mood board for the world, characters, places and light. Kling follows a written storyline, beat by beat; it need not show any picture as it is, or in order.'),
 # round 96 (Kris: "the new kling prompts were mostly a waste, except for this one: Rhythm Montage … we still have something happen within a single
 # image that shouldn't … I really liked the person zoom-ins in the director's cut … way too much interpretation that fully changed the story. We really
 # need to reinforce that each image should be its own mini scene, with specific things that are told to be done in the scene, and for those things to
 # only happen in the scene"): SCENE-LOCKED — every picture is a sealed mini-scene with its own short list of actions; four ways to cut them
 dict(id='lock_rhythm', name='Scene-Locked Rhythm', free=1, lock=True, like='the Rhythm Montage you liked, with every picture sealed as its own mini-scene',
      best='the opening and any lore montage — strong motion, beat cuts, nothing leaking between pictures',
      cut='hard cuts on the beat; inside each picture 2–3 quick cuts (wide → punch-in → wide) that never leave that picture', text='the line under the picture',
      how='Six sealed mini-scenes. Each has its own numbered actions and its own "never here" list; punch-ins and beat cuts stay inside the picture.'),
 dict(id='lock_faces', name='Scene-Locked Faces', free=1, lock=True, like='the person zoom-ins you liked in the Director\'s Cut, on the locked scenes',
      best='scenes with people in them — the feeling lands on a face',
      cut='one shot per picture: the action plays wide, then the camera pushes in to a face or hands from that same picture; hard cut', text='the line under the picture',
      how='Each scene plays its actions, then pushes in on the person the moment belongs to (a named face from the picture) as they react. No new people.'),
 dict(id='lock_shots', name='The Locked Shot List', free=1, lock=True, like='a storyboard artist\'s shot list — start frame, action, end frame — the most literal of the four',
      best='testing how exactly Kling will follow orders; a baseline for every other scene',
      cut='one unbroken shot per picture, then a hard cut; no cuts inside a picture', text='the line under the picture',
      how='Each scene is written as START (the picture) → ACTION (numbered, in order) → END FRAME (what it looks like at the cut). One camera move only.'),
 dict(id='lock_two', name='Wide, Then Close', free=1, lock=True, like='classic two-shot coverage: the wide establishes, the insert lands the moment (game cut-scenes, TV drama)',
      best='moments that hinge on one detail — a door meeting, a hand on a shawl, a rune flaring',
      cut='exactly two shots per picture: the picture wide with its action, then a cut-in close-up of the one detail in that same picture', text='the line under the picture',
      how='Shot A: the picture as painted, its actions playing. Shot B: a close-up of the key detail already in that picture as the action lands. Then a hard cut.'),
]
SBY = {s['id']: s for s in STYLES}

# ── the ten first tries: a scene (all of its pictures, one hero's version), a style, and the director's notes for it ──
# lines: one per picture (what happens / moves in it). path (onetake): how the camera gets from each picture to the next.
IDEAS = [
 dict(id='quiet_living', scene='quiet', who='all', style='living', title='The Long Quiet as a living painting',
      why='Pure lore told in still moments — the style most likely to keep every picture exactly, with text cards between them.',
      feel='Elegy. A golden past fading into a cold, frightened present; by the end, quiet dread.',
      arc='warm festival gold in the first picture, then dusk amber, then cold blue night with ember-red chains at the end',
      lines=['banners ripple, carts roll slowly, runestones glow and pulse, festival lanterns sway, birds cross the bright sky',
             'wind moves the grass on the hill; on the three horizons the wall of fire flickers, storm clouds churn over the broken mountains, the black river glints',
             'the palisade-builders\' hammers rise and fall slowly, smoke drifts from chimneys, the lake ripples under a dull sky',
             'candlelight trembles, the old couple breathe and the woman\'s hand rests on the empty cradle; the pale aurora ripples beyond the window',
             'the pale rune-blue spirits sway and drift like slow lanterns at the field\'s edge, the grass stirs, dusk deepens',
             'the Binders\' ember chains glow and swing as they climb the palisade, lantern light shakes in the villagers\' hands, mist curls',
             'the ember-red chains pulse like a heartbeat on the bindstones, the chained spirits flicker, the pale aurora ripples overhead']),
 dict(id='truth_living', scene='truth', who='all', style='living', title='The truth about the twins, as tableaux',
      why='The story\'s heart is a conversation of memories — slow, warm tableaux let the words (on cards) do the telling.',
      feel='Tender awe. The warmth of the gods in the feast hall, the memory softer and dreamlike, then wonder.',
      arc='warm gold candle and hearth light in the hall; the three memories in softer, misty, silver-blue painted light; back to gold, then morning light through the open doors',
      lines=['Odin\'s kind hand reaches gently forward, hearth light flickers across the hall, dust glitters in the light',
             'Freya\'s fingers touch the twins\' cheeks, her amber necklace glows and pulses, the twins\' rune-blue eyes brighten slowly',
             'in the soft memory light the orbs close around the two gods; the two tiny sparks between their hands shimmer and breathe',
             'the two sparks fall slowly through rolling storm clouds; far below, lightning flashes and runestones blaze rune-blue',
             'the glowing basket drifts on still Mirror Lake at dawn, ripples spread, the sparks settle into it like falling stars',
             'the twins turn to each other in wonder; above them the two huge gods smile; aurora light washes over the hall',
             'Freya\'s pointing hand, Odin raising Gungnir as its tip flares, the twins\' cloaks swinging as they turn toward the bright doors']),
 dict(id='twinteach_director', scene='twinteach', who='zeldor', style='director', title='Your twin finds the word — directed',
      why='Two people, a book, a discovery: exactly what film coverage (close-ups, reactions, inserts) makes come alive.',
      feel='Urgency becoming wonder, then quiet resolve between two siblings.',
      arc='blue dusk outside; warm amber lamplight in the study; the rune\'s white light flaring and lighting both faces',
      lines=['Zeldor runs up the lane at dusk, Lodestar in hand — tracking shot alongside him, his cloak whipping, then a low angle as he reaches the door',
             'Zeldara looks up from her desk — cut to her face as she sees him, then over her shoulder onto him in the doorway, breathless',
             'she climbs and pulls the huge rune-bound book from the high shelf — insert on her hands sliding it out, dust falling; Zeldor watches holding the staff',
             'the book thumps open on the desk; pages riffle to the last page — insert on the single rune as it begins to glow white; both lean in',
             'close-up, side by side: their faces in the glow, their eyes lighting rune-blue at the same moment — slow push-in',
             'the rune lifts off the page as light and streaks to the Lodestar\'s star, which flares — whip to the staff, then wide as the room fills with light',
             'at the study door Zeldara swings her cloak on and lays a hand on his shoulder; reverse angle past them to the lake where Asgard glows; hold']),
 dict(id='escape_director', scene='escape', who='zeldor', style='director', title='Muspelheim falls — directed as an action scene',
      why='A chase with a clear direction of travel: tracking shots, cutaways to the collapse, and a big wide ending.',
      feel='Breathless escape, then awe and release as the sky clears.',
      arc='furnace orange and red in the tunnels; night blue and erupting orange on the causeway; steam-white, then calm aurora green-blue',
      lines=['Zeldor sprints up the collapsing lava tunnel — tracking from the front, rocks crashing behind; the freed spirits stream after him like a comet\'s tail',
             'he runs past the wall of chained spirits — each chain bursts in a shower of sparks as he passes; quick inserts of chains snapping, spirits pouring out',
             'he bursts out onto the long causeway — wide shot, the volcano erupting behind him, lava arcing across the night sky',
             'low angle on his running feet as the causeway stones crumble into the sea right behind him — cutaway to stones splashing into the dark water',
             'he leaps onto the mainland rocks and turns — slow-motion on his face catching the glow, spirits gathering around him',
             'extreme wide: the black volcano island breaks apart and sinks into a boiling sea in a ring of steam; Zeldor small in the foreground',
             'the steam drifts away over a calm sea; the aurora and shooting stars return; slow crane up from Zeldor to the sky; hold']),
 dict(id='gate_onetake', scene='gate', who='zeldor', style='onetake', title='The sky parts — one shot up to the gate and back',
      why='A glimpse of another world is a journey up and down: one unbroken flight makes it feel like a vision.',
      feel='Wonder turning to unease; a secret seen for one breath, then gone.',
      arc='aurora green and violet over the night hill; blinding gold at the gate; cold white-and-gold in the hall; fading pale sparks; back to night with rune-blue eyes',
      lines=['the aurora parts like a curtain above Zeldor on the hill',
             'the vast golden gate, shut fast, bound with chains of light',
             'the white-and-gold hall beyond the gate; on the high seat the still figure in the golden mask',
             'pale souls rising toward the gate, turning back and drifting down again',
             'tiny sparks of new life at the gate, unable to come down, fading',
             'Zeldor on the hill again as the sky closes, his eyes glowing faintly rune-blue'],
      path=['start on @image1, then rise with Zeldor\'s gaze straight up through the parting aurora, through the clouds and above them',
            'arrive at the golden gate (@image2); drift along its chains of light and slip through the narrow seam where the doors meet',
            'glide down the white-and-gold hall to the masked figure on the high seat (@image3); hold on the mask for a heartbeat',
            'pull back out through the gate and turn to look down: souls rising toward it and turning back (@image4)',
            'follow one falling spark at the gate (@image5) as it fades, and dive down with it through the clouds',
            'land back on the hill behind Zeldor and swing round to his face as the sky closes (@image6); end close on his glowing eyes']),
 dict(id='bifrost_onetake', scene='bifrost', who='zeldor', style='onetake', title='The Bifröst rises — one flight from the pier to the gate',
      why='The bridge itself is a path; the camera can travel it, from the pier to the Green and out across the lake.',
      feel='Mounting, sacred anticipation that bursts into joy.',
      arc='night blue and silver on the lake; the Lodestar\'s white star; rainbow colours spilling across the water; Asgard\'s gold at the end',
      lines=['Zeldor at the end of the wooden pier with the Lodestar, night over Mirror Lake',
             'Zeldor speaks the word and sets the staff in the notch',
             'the village green at night, spirits lining up along the glowing soul-lines toward the pier',
             'the Lodestar\'s star blazing',
             'a bridge of light running out across the lake',
             'spirits floating along both sides of the rainbow bridge like lanterns, the dark lake mirroring its colours',
             'Zeldor stepping from the pier onto the Bifröst toward Asgard\'s golden gate'],
      path=['begin low over the dark water behind Zeldor on the pier (@image1)',
            'circle round to his front as he speaks and sets the staff (@image2); the star kindles',
            'whip up and back over the village roofs to the Green, where the spirits line up along the soul-lines (@image3); follow the lines back down to the pier',
            'rush in to the Lodestar as the star blazes (@image4) — the light fills the frame',
            'burst out of the light flying low along the bridge as it races out across the lake (@image5)',
            'rise beside the bridge among the floating spirits, the lake mirroring every colour (@image6)',
            'come back down behind Zeldor as he steps onto the bridge (@image7); crane up past him toward Asgard\'s golden gate; hold']),
 dict(id='surt1_rhythm', scene='surt1', who='zeldor', style='rhythm', title='Surtharn rises — a boss intro cut to the beat',
      why='Boss intros are spectacle: beat-matched cuts, impacts and a long slow-motion reveal of the giant.',
      feel='Dread building to an explosive, towering reveal; then defiance.',
      arc='dim red cavern, then blinding orange-white light from the cracked throne, then the full furnace glow of the Colossus',
      lines=['chained spirits digging, lava rivers — quick cuts on the beat between hands, chains and pickaxes; sparks fly on every hit',
             'the black throne splits — hard cuts, camera shake, light stabbing out of the crack in flashes',
             'lava wells up through the throne — punch-in, speed ramp as it surges',
             'the giant molten hand slams onto the throne\'s edge — impact frame, shockwave of embers',
             'Surtharn rises roaring with his burning greatsword — slow motion, low angle, the longest hold of the sequence',
             'Zeldor small in the foreground raises his sword — cut on the last beat, then hold on the two of them']),
 dict(id='sol3_rhythm', scene='sol3', who='zeldor', style='rhythm', title='The Storm That Ends the World — the last boss, cut to the beat',
      why='The final form is pure spectacle: shattering, draining light, a storm and an eclipse — a trailer-style barrage.',
      feel='Shock and awe; the light of a whole city stolen; the dark that was always underneath.',
      arc='shattering gold, rivers of golden light pulled into darkness, black storm and lightning, a black eclipse ringed with white fire',
      lines=['the cracked golden helm shatters into spinning shards — impact frame, slow motion on the shards, the black face laughing',
             'rivers of golden light stream into Solmyrk — fast cuts between the streams and his burning wings turning to ash',
             'he swells into a towering black storm — lightning strikes as cut points, punch-ins on the slashes of white light that are his face',
             'the sun goes dark behind him — the eclipse ring flares; speed ramp into slow motion',
             'The Storm That Ends the World in full — the widest, longest, grandest hold',
             'Zeldor tiny below, the Lodestar raised and blazing — last beat, hold']),
 dict(id='opening_poem', scene='opening', who='both', part=1, style='poem', title='The opening as a visual poem',
      why='The same six pictures as the opening you liked, made freer: a chance to compare how much Kling adds when it is let go.',
      feel='Myth and loss, then a single spark of hope at dawn.',
      arc='luminous rune-blue and aurora; gold fading to dark; candle amber; dusk grey-blue; storm black split by rune-blue lightning; pearl dawn with a shooting star',
      lines=['the World Tree of light with souls rising and sparks drifting down into the cradles',
             'the golden gate swinging shut and the World Tree of light going dark',
             'the empty cradles and the old woman by the window',
             'the dead drifting at the edge of the light, a Binder\'s chain in the mist',
             'the storm: lightning striking the runestones so they blaze',
             'dawn: the glowing basket drifting across Mirror Lake']),
 dict(id='orbs_poem', scene='orbs', who='zeldor', style='poem', title='Two lights in the dark, as a dream',
      why='A glimpse of the sleeping gods is already dreamlike — the freest style suits a vision.',
      feel='Hushed mystery, then two hearts far apart feeling the same thing at once.',
      arc='aurora night; dusty pale light in a vast dark hall; two breathing pearl-white lights; a cold gold glint of the mask; aurora and lamplight together at the end',
      lines=['Zeldor by a freed bindstone as the aurora opens again',
             'a vast dark hall of white and gold far above, dust in shafts of light',
             'two great lights floating joined like an infinity sign, breathing slowly',
             'Odin and Freya asleep inside the lights',
             'far across the hall, the figure in the golden mask watching',
             'the twins far apart — Zeldor on the hill, Zeldara at her window — looking up at the same moment']),
]

FRAME = {
 'flames': dict(intro='The tale is told as visions in a hearth fire, as if remembered around the fire on a winter night.',
   device='the video opens close on a crackling hearth fire in the dark. Each picture rises out of the flames and smoke — first as shapes in the fire, then the full painted scene, alive and moving — and fills the screen.',
   trans='each scene burns away at its edges into embers and smoke, and the embers swirl and become the next picture. Firelight flickers across every scene.',
   camera='a slow push into the fire at the start; inside each vision a gentle drift; at each change, a swirl of rising sparks.',
   end='End as the last vision holds, then the fire crackles low around its edges.', keep='No people beside the fire, no storyteller — only the visions.'),
 'tapestry': dict(intro='The tale is a long woven saga-cloth hanging in a dim timber hall, coming alive panel by panel.',
   device='each picture is first seen as a panel woven into a long Norse tapestry with knotwork borders, in the same colours as the painting. Its threads glow rune-blue, the weave softens, and it becomes the full painted scene, alive and moving.',
   trans='the living scene weaves itself back into thread, and the camera tracks sideways along the cloth to the next panel, which comes alive in turn.',
   camera='a steady sideways track along the tapestry; a slow push-in as each panel comes alive.',
   end='End on the last panel alive, held, the cloth\'s border glowing around it.', keep='No readable letters on the cloth — knotwork and rune shapes only.'),
 'storybook': dict(intro='The tale is read from an ancient rune-bound book lying open on a table in candlelight.',
   device='each picture is painted across the open pages of the book. The painting rises off the page in pop-up parallax depth — foreground, middle and sky in layers — and comes alive and moves.',
   trans='the page turns by itself on a breath of wind and glowing dust, revealing the next painted picture, which rises in turn.',
   camera='begin above the open book, push down into the page as it comes alive, pull back slightly as the page turns.',
   end='End on the last page alive, then the candlelight flickers across it.', keep='No readable writing on the pages.'),
 'runestone': dict(intro='The tale is carved on a tall ancient runestone that wakes, picture by picture, with neon rune-blue light.',
   device='each picture first appears as a deep relief carved into grey stone, its lines glowing rune-blue. Light floods into the carving and it softens into the full painted scene in colour, alive and moving.',
   trans='the scene hardens back into carved stone, the glow runs along the carved knotwork to the next carving below it, and that one wakes.',
   camera='a slow tilt down the face of the runestone from carving to carving; a push-in as each one wakes.',
   end='End on the last picture alive, then its edges settle back into glowing carved stone.', keep='Runes are decoration only — no readable words.'),
 'frozen': dict(intro='The tale is told in frozen instants: in each picture, time has stopped.',
   device='each picture is a single moment with time frozen — rain drops, sparks, embers, snow, spirits, cloth and hair hanging still in the air — and the camera moves through that frozen moment in 3D, past the suspended particles.',
   trans='at the end of each moment, time lurches forward for one heartbeat (everything rushes) and freezes again on the next picture.',
   camera='a slow orbit or dolly through each frozen moment; a sudden whip as time snaps forward.',
   end='End on the last picture frozen, then let time breathe again — one slow, soft movement.', keep=''),
}

# ── round 92b: ONE video, ten styles — the opening's first part (the six pictures of the video Kris liked); Kris: "more like 40 seconds in total" ──
OPEN = dict(scene='opening', who='both', part=1,
  feel='Myth and loss — the cycle of souls broken, the long silence, the dread at the edge of the light — then the storm, and a single spark of hope at dawn.',
  arc='luminous rune-blue and aurora; gold fading to dark; candle amber; dusk grey-blue; storm black split by rune-blue lightning; pearl-pink dawn with a shooting star',
  slow='LENGTH: the game will show this video slowed to about 40 seconds, so make every movement clear, full and complete — energetic, never sluggish.',
  lines=['the World Tree of light pulses up into the aurora, souls of light drift upward along it, small sparks float down into the village, the lake shimmers',
         'the great golden gate swings shut with a heavy boom of light; the World Tree below dims and goes dark; the aurora fades',
         'candlelight trembles over the empty cradles; the old woman breathes, her hand tightening on the folded birth-shawl; the pale aurora ripples beyond the window',
         'the pale rune-blue spirits sway at the field\'s edge; the villagers at the palisade shift uneasily; a Binder\'s chain glints and drags in the mist',
         'rain lashes; lightning strikes the tall runestone and its rune blazes neon rune-blue; more runestones light up across the plain one after another',
         'dawn: the glowing basket drifts across calm Mirror Lake, ripples spreading; the babes stir under the blanket; the last aurora fades as a shooting star crosses the sky'])
ONE = [dict(OPEN, id='o_' + st, style=st, title=t) for st, t in [
  ('living', 'Living Painting — each picture brought gently to life'), ('director', 'Director\'s Cut — coverage around each picture'),
  ('onetake', 'One-Take Journey — one flight from the World Tree to the basket'), ('rhythm', 'Rhythm Montage — the storm cut to the beat'),
  ('poem', 'Mythic Visual Poem — let it dream'), ('flames', 'Visions in the Fire — the tale in a hearth fire'),
  ('tapestry', 'The Woven Saga — a tapestry coming alive'), ('storybook', 'The Rune-Bound Book — pages that come alive'),
  ('runestone', 'The Carved Runestone — carvings that wake'), ('frozen', 'Frozen Moments — time stopped in each picture')]]
ONE += [dict(OPEN, id='o_story_' + k, style='story', title=t, **x) for k, t, x in [
 ('tale', 'Story-Led: the unbroken tale', dict(
   intro='The whole opening as one unbroken tale, told straight through.',
   story=[(0, 3, 'night over the village by Mirror Lake: the World Tree of rune-blue light rises from the runestone on the green into the aurora; souls of light climb it, and new sparks drift down into the houses — the cycle of souls'),
          (3, 6, 'far above the clouds the golden gate at the top of the tree swings shut; the climbing souls stop, and the tree of light goes dark from the top down, like a candle snuffed'),
          (6, 9, 'the dark settles on the village; years pass in a breath — snow, blossom, harvest, snow over the same nursery — and the cradles stay empty; an old woman by the window folds a birth-shawl she never got to use'),
          (9, 12, 'at the edge of the fields the dead drift, pale and lost, unable to rise; in the mist, chains glint — something is hunting them'),
          (12, 16, 'the worst storm anyone remembers rolls over the plain; lightning strikes the tall runestone and its rune blazes neon blue, and one by one every runestone across the plain lights up in answer'),
          (16, 20, 'the storm breaks into dawn; across the still lake a glowing carved basket drifts toward the village, two newborn babes asleep inside; a shooting star crosses the paling sky')],
   thread='one continuous night-to-dawn journey; each beat causes the next — the gate shuts, so the souls stop, so the cradles stay empty, so the dead drift; the storm answers, and dawn brings the basket.',
   camera='flowing and unhurried — long glides that carry us from one place to the next instead of hard cuts; a held breath before the lightning; a slow descent to the basket at the end.',
   endon='the basket on the shining lake at dawn, the shooting star above it.')),
 ('vigil', 'Story-Led: the old woman\'s twenty winters', dict(
   intro='The opening seen through one witness: the old woman of the village, who has waited twenty winters for a child to be born.',
   story=[(0, 3, 'at her window at night the old woman watches the World Tree of light rise over the village, souls climbing it and sparks drifting down into the houses; she smiles'),
          (3, 6, 'she looks up as, far above the clouds, the golden gate swings shut and the tree of light goes dark; her smile fades'),
          (6, 10, 'the seasons whirl past her window — snow, blossom, harvest, snow — while the nursery\'s cradles stay empty; she folds the birth-shawl and lays it away'),
          (10, 13, 'at dusk she stands at the palisade among the villagers; out at the edge of the fields the pale dead drift, and chains glint in the mist; she pulls her shawl tight'),
          (13, 16, 'the great storm: from her window she sees lightning strike the runestones across the plain, one after another blazing neon blue'),
          (16, 20, 'at dawn she hurries down to the lake shore with the birth-shawl as a glowing carved basket drifts in across the still water; inside sleep two newborn babes; a shooting star crosses the sky as she kneels to them')],
   thread='we stay with the old woman the whole time — her window, her face, her shawl — and see the world change through her eyes; the folded birth-shawl returns at the end.',
   camera='close and intimate: over her shoulder through the window, slow push-ins on her face, the seasons changing in the window glass; at the end a slow pull back from her kneeling at the shore.',
   endon='the old woman kneeling at the water\'s edge with the shawl, the glowing basket before her, dawn and the shooting star above.')),
 ('lake', 'Story-Led: the lake remembers', dict(
   intro='The opening told from Mirror Lake itself: everything is seen on and in its still, mirroring water.',
   story=[(0, 4, 'low over the black mirror of the lake at night: the reflection of the World Tree of light and the aurora; souls of light rise in the reflection and sparks fall like stars into it'),
          (4, 7, 'in the reflection, the golden gate high above swings shut and the tree of light goes dark; the mirror turns black'),
          (7, 10, 'the lake freezes and thaws, freezes and thaws — winters passing — and on the shore the lit windows of the village grow fewer; behind one, empty cradles'),
          (10, 13, 'at dusk pale spirits drift along the shore, their reflections faint in the water; a chain drags through the shallows, rippling the mirror'),
          (13, 16, 'the storm: rain shatters the mirror into a thousand rings; lightning strikes the runestones on the far plain, and their blue fire flashes across the broken water'),
          (16, 20, 'the storm passes and the lake goes still and pearl-bright at dawn; out of the mist a glowing carved basket glides across the mirror, two babes asleep inside, the shooting star reflected beneath it')],
   thread='the camera never leaves the lake; the water is the storyteller — reflection, ice, rain and calm mark each chapter.',
   camera='hovering just above the water the whole time, gliding slowly; tilting up from a reflection to the real thing only at the key moments (the gate, the lightning, the basket).',
   endon='the basket gliding over the still, shining lake, its reflection and the shooting star beneath it.')),
 ('medias', 'Story-Led: begin at the end (in medias res)', dict(
   intro='The opening told the way many great cut-scenes begin: on the mystery first, then how it came to be.',
   story=[(0, 3, 'dawn: a glowing carved basket drifts across the still lake toward the village — who sent it? push in close on it'),
          (3, 6, 'the glow of the basket blooms and carries us back in time: night, the World Tree of light rising from the village into the aurora, souls climbing it, sparks drifting down'),
          (6, 9, 'far above, the golden gate swings shut; the tree of light goes dark; in the village the cradles stand empty and an old woman folds away a birth-shawl'),
          (9, 12, 'the dead drift lost at the edge of the fields; chains glint in the mist'),
          (12, 16, 'the worst storm anyone remembers: lightning strikes the runestones across the plain, each blazing neon blue'),
          (16, 20, 'the lightning flash carries us forward again to the same dawn: the basket reaches the pier, two newborn babes asleep inside, a shooting star crossing the sky')],
   thread='a loop: the basket at dawn is the mystery at the start and the answer at the end; a bloom of light carries us into the past and a lightning flash brings us back.',
   camera='a slow push-in on the basket; a dreamlike transition into the past; the past told in flowing glides; a hard flash-cut back to dawn; a final rise above the pier.',
   endon='the basket at the pier at dawn, the shooting star above.'))]]
ONE += [dict(OPEN, id='o_' + st, style=st, title=t, new=96) for st, t in [
  ('lock_rhythm', 'Scene-Locked Rhythm — the one you liked, every picture sealed'), ('lock_faces', 'Scene-Locked Faces — each scene lands on a face'),
  ('lock_shots', 'The Locked Shot List — start, action, end frame'), ('lock_two', 'Wide, Then Close — the picture, then its one detail')]]
for o in ONE:
    if o['style'] == 'director':
        o['lines'] = ['wide on the village by the lake under the World Tree of light, then a close-up of a soul of light rising past the lens and a spark drifting down toward a cottage roof',
                      'low angle on the golden gate as the doors swing shut — insert on the doors meeting in a flash — then wide as the World Tree below goes dark',
                      'slow dolly past the rows of empty cradles; close-up on the old woman\'s hands on the folded shawl; her face turning to the pale window',
                      'over the shoulders of the villagers at the palisade toward the spirits at the field\'s edge; insert on the Binder\'s chain dragging in the mist',
                      'wide on the dark plain as lightning strikes the runestone — cut close on the rune blazing — whip to the other stones lighting one by one',
                      'dawn: a high wide shot of the basket on the still lake, then a gentle close-up on the babes stirring; tilt up to the shooting star']
    if o['style'] == 'onetake':
        o['path'] = ['begin high in the aurora and descend along the World Tree of light to the village by the lake (@image1)',
                     'turn and rise with one soul of light up the trunk of light, through the clouds, to the golden gate as it swings shut (@image2)',
                     'fall with the fading light down through the clouds and glide in through a lit nursery window (@image3)',
                     'drift out through the door and across the dusk fields to the palisade and the spirits at the edge of the light (@image4)',
                     'rush low over the dark plain into the storm as lightning strikes the runestone (@image5)',
                     'the storm tears open into dawn; glide low over still Mirror Lake to the glowing basket and settle above it (@image6)']
        o['lines'] = [l.split(';')[0] for l in OPEN['lines']]
    if o['style'] == 'rhythm':
        o['kind'] = 'mythic prologue'; o['reveal'] = 'the lightning striking the runestones in slow motion, then the calm of dawn and the basket'
    if o['style'] == 'poem':
        o['lines'] = ['the World Tree of light with souls rising and sparks drifting down into the cradles', 'the golden gate swinging shut and the World Tree of light going dark',
                      'the empty cradles and the old woman by the window', 'the dead drifting at the edge of the light, a Binder\'s chain in the mist',
                      'the storm: lightning striking the runestones so they blaze', 'dawn: the glowing basket drifting across Mirror Lake']

# ── round 96: SCENE-LOCKED — the opening's six pictures as six sealed mini-scenes (written from the paintings themselves) ──
# see: what is IN the picture (so Kling knows what it may move); do: the only actions, in order; face: the person the push-in lands on;
# close: the one detail for a close-up; endf: the frame at the cut; never: what must NOT happen in THIS picture (it belongs to another one)
LOCK = [
 dict(tag='THE TREE OF SOULS', see='a giant World Tree made of rune-blue light rising behind a carved runestone arch; pale human-shaped souls of light inside its trunk and branches; a crowd of villagers with torches below; an old man in a fur cloak on the left with both arms raised; aurora over a lake and mountains',
      do=['the souls of light float steadily UP the trunk and along the branches and fade into the aurora at the top', 'the old man on the left lifts his arms higher, and the villagers raise their faces to the tree', 'torches flicker, the aurora ripples, the lake shimmers'],
      face='the old man on the left, his face lit blue, looking up in awe', close='souls of light rising inside the glowing trunk', endf='the tree full of rising light, the crowd looking up',
      never='no lightning, no rain, no gate; the runestone arch keeps a steady glow and sends no light anywhere; no souls come down; no falling stars'),
 dict(tag='THE GATE SHUTS', see='a golden gate at the top of a citadel floating on clouds; a golden World Tree in the clouds below it; villagers in fur cloaks on a timber balcony at the bottom of the picture, looking up',
      do=['the two great doors of the golden gate swing shut until they meet — the bright gold line between them narrows and vanishes', 'the golden tree in the clouds dims from the top down and goes dark', 'the villagers on the balcony lower their heads; a hooded woman presses her hands together'],
      face='the hooded woman on the balcony as the light drains from her face', close='the golden doors meeting and the line of light vanishing', endf='the gate closed, the tree in the clouds dark, the people below with heads bowed',
      never='no lightning, no blue tree, no souls of light; nothing flies out of the gate; the citadel does not fall or burn'),
 dict(tag='THE EMPTY CRADLES', see='a candlelit nursery: rows of empty wooden cradles with fur blankets; an old woman with a silver bun and a fur cloak holding a folded white birth-shawl; a window to the aurora and a calmly glowing runestone outside',
      do=['the old woman slowly draws the folded shawl against her chest and lowers her eyes', 'the candle flames tremble and their light wavers over the empty cradles', 'outside the window the aurora ripples softly'],
      face='the old woman\'s lined face, eyes lowered, as she holds the shawl', close='her hands tightening on the folded shawl', endf='the old woman alone with the empty cradles, the shawl held close',
      never='no babies or children anywhere, the cradles stay empty and still, no one else enters; the runestone outside does not flash or pulse; no lightning, no storm'),
 dict(tag='THE EDGE OF THE LIGHT', see='dusk at the edge of the fields; villagers in fur cloaks with spears behind a pointed timber palisade with fire baskets; pale rune-blue ghostly spirits standing in the mist across the fields; heavy dark iron chains hanging between tall rocks with glowing runes',
      do=['the pale spirits drift slowly through the mist, flickering, staying out in the fields', 'the dark chains sway and grind tight, glinting in the dusk', 'the villagers tighten their grip on their spears; the man in front turns his head toward the spirits'],
      face='the bearded man at the palisade, jaw set, watching the spirits', close='the heavy chain links grinding tight', endf='the villagers at the palisade facing the misty fields and the spirits beyond',
      never='no lightning or rain; the chains stay where they hang and do not reach the spirits or the people; no Binders or monsters appear; the spirits do not cross the palisade; the runes keep a steady glow (no light runs from one stone to another)'),
 dict(tag='THE STORM', see='a dark plain in heavy rain; a tall central runestone with a blazing rune; lightning bolts around it; broken rocks in the air; smaller runestones glowing across the plain; villagers on the left watching',
      do=['heavy rain sweeps across the plain', 'a great lightning bolt strikes the tall central runestone and its rune flares blinding neon rune-blue — this is the strike of the whole video', 'at that same instant every smaller runestone on the plain flares together; the villagers flinch and shield their eyes'],
      face='an old woman among the villagers, flinching, her face lit by the blue flash', close='the rune on the central stone blazing as the bolt hits', endf='the central runestone blazing blue in the rain',
      never='the lightning strikes only here, only the central stone; no light travels from stone to stone (they flare at the same moment); no gate, no tree, no basket'),
 dict(tag='THE BASKET AT DAWN', see='dawn over still Mirror Lake; a carved wooden basket with two glowing rune-blue lanterns floating near a timber pier; two newborn babes asleep in it under soft blankets (a boy with a tuft of brown hair, a girl with a tuft of auburn hair); villagers on the pier: an old white-bearded man and a woman in a pink hood; a waterfall, the rising sun, a shooting star',
      do=['the basket glides gently toward the pier, rings of ripples spreading on the still water', 'the babes sleep peacefully; the girl stirs and settles', 'the villagers on the pier lean forward in wonder; the woman presses her hands to her heart', 'one shooting star streaks across the dawn sky'],
      face='the woman in the pink hood, hands to her heart, eyes shining', close='the two sleeping babes in the basket', endf='the basket at the pier in the dawn light, the shooting star above',
      never='no storm, no lightning, no rain; the babes do not wake, cry, grow or change; no other babies; nothing rises out of the basket; the lanterns keep a steady glow'),
]
LOCK_RULES = ('SCENE LOCK — THE MOST IMPORTANT RULES:\n'
  '1. Six separate mini-scenes, one per picture, in order: @image1, @image2, @image3, @image4, @image5, @image6. Each begins exactly on its picture and stays in that place for its whole time. Then a HARD CUT to the next. Never dissolve, blend or morph one picture into another.\n'
  '2. In each scene ONLY the numbered actions written for it happen, in that order. Everything else in the picture stays as painted, alive only in small ways (cloth and hair stirring, flames flickering, mist, aurora rippling).\n'
  '3. Nothing travels between things: no beams, pulses, sparks or streams of light flowing from one object to another, unless an action says so.\n'
  '4. Every event belongs to ONE scene only: the souls rising (scene 1), the gate shutting (2), the empty cradles (3), the chains (4), the lightning (5), the basket and the babes (6). Never show one of them in another scene.\n'
  '5. Do not reinterpret the story. Do not add people, creatures, places or objects that are not in that picture. Same faces, hair, clothes and colours as painted.')

def lock_prompt(I):
    S = SBY[I['style']]; n = len(LOCK); t = LONG / n; v = S['id']
    head = {'lock_rhythm': 'SCENE-LOCKED RHYTHM MONTAGE. An epic, energetic mythic prologue of %s seconds, 16:9, cut like a game trailer to a steady beat of about 115 BPM (medieval midcore EDM). Strong, bold motion in every scene.',
            'lock_faces': 'SCENE-LOCKED, WITH FACES. A cinematic mythic prologue of %s seconds, 16:9. Each scene plays its actions with strong, clear motion, then the camera pushes in to the face of the person the moment belongs to, as they react.',
            'lock_shots': 'THE LOCKED SHOT LIST. A mythic prologue of %s seconds, 16:9, made of six shots that follow this shot list exactly — like a storyboard turned into film. Strong, clear motion; no improvisation.',
            'lock_two': 'WIDE, THEN CLOSE. A cinematic mythic prologue of %s seconds, 16:9. Every scene is exactly two shots: the picture wide with its actions, then a close-up of one detail from that same picture as the action lands.'}[v] % fs(n * t)
    cut = {'lock_rhythm': 'CUTTING: hard cuts on the beat. Inside a scene you may cut 2–3 times on the beat between the full picture and a punch-in on a detail OF THAT SAME PICTURE (never a detail from another picture). Speed-ramp into slow motion on the lightning strike in scene 5. Camera shake only in scene 5.',
           'lock_faces': 'CAMERA: one shot per scene — open on the full picture while the actions play, then a smooth push-in to the named face (or hands) from that picture for the last second. Shallow focus on the face. Hard cut to the next scene.',
           'lock_shots': 'CAMERA: one unbroken shot per scene with ONE simple move (a push-in, a tilt or a slow drift). No cuts inside a scene. Each scene ends on its END FRAME, then a hard cut.',
           'lock_two': 'CUTTING: shot A — the full picture, the actions playing (about two thirds of the scene); shot B — a hard cut to the close-up of the named detail from the same picture as the action finishes (the last third). Then a hard cut to the next scene.'}[v]
    P = [head, I['slow'], '', LOCK_RULES, '',
         'LOOK: the hand-painted Norse fantasy storybook style of the pictures — painterly, deep colour, glowing neon rune-blue magic, aurora borealis.', cut,
         'LIGHT AND COLOUR: %s.' % I['arc'], '', 'THE SCENES:']
    for i, L in enumerate(LOCK):
        a, b = fs(i * t), fs((i + 1) * t); acts = ' '.join('(%d) %s;' % (k + 1, x) for k, x in enumerate(L['do'])).rstrip(';') + '.'
        if v == 'lock_shots':
            P.append('SHOT %d — @image%d, %s–%s s — %s. START: exactly @image%d (%s). ACTION, in order: %s END FRAME: %s. NOT IN THIS SHOT: %s.' % (i + 1, i + 1, a, b, L['tag'], i + 1, L['see'], acts, L['endf'], L['never']))
        else:
            extra = {'lock_rhythm': 'Punch-in on: %s.' % L['close'], 'lock_faces': 'Push in to: %s.' % L['face'], 'lock_two': 'Close-up: %s.' % L['close']}[v]
            P.append('SCENE %d — @image%d, %s–%s s — %s. In the picture: %s. Only these happen: %s %s Never here: %s.' % (i + 1, i + 1, a, b, L['tag'], L['see'], acts, extra, L['never']))
    P += ['', 'End on @image6 at the pier, held for a moment.', '',
          'AVOID (everywhere): any picture shown out of order or skipped; events from one picture appearing in another; morphing between pictures; light or energy flowing between objects; new people or creatures; changed faces, hair or clothes; anything modern (umbrellas, glasses, phones, guns, cars, street lamps); text, letters, captions, logos or watermarks; photorealism or a 3D-render look; extra fingers or limbs; flicker. No speech or lip-sync.']
    return '\n'.join(P) + '\n'

def frames(I):
    sc = SC[I['scene']]; B = sc['beats']
    if I.get('part'):      # the same split as kling.py (6 at most)
        n = len(B); k = (n + 5) // 6; base, extra = divmod(n, k); i = 0; P = []
        for p in range(k): m = base + (1 if p < extra else 0); P.append(B[i:i + m]); i += m
        B = P[I['part'] - 1]
    return B

def prompt(I):
    if SBY[I['style']].get('lock'): return lock_prompt(I)
    S = SBY[I['style']]; B = frames(I); n = len(B); t = LONG / n; tot = fs(n * t); ims = ', '.join('@image%d' % (i + 1) for i in range(n))
    L = I['lines']; assert len(L) == n, (I['id'], len(L), n)
    if S['id'] == 'living':
        P = ['STYLE — LIVING PAINTING. A slow, reverent game prologue made of painted tableaux, like the painted opening of a great mythic RPG. '
             'Each of the %d pictures IS one shot, in this order: %s — about %s seconds each, %s seconds in all, 16:9. Keep every picture\'s composition, '
             'characters, faces, clothes and colours exactly; do not reframe, re-stage or redesign anything. Bring each painting gently to life.' % (n, ims, fs(t), tot),
             '', WORLD, '',
             'CAMERA: a slow 2.5D parallax move in every shot — the painting separates into layers (foreground, middle ground, far distance, sky) that drift past '
             'one another as the camera glides: a slow push-in, a slow lateral drift, a slow rise. Never fast, never shaky.',
             'LIFE INSIDE THE PAINTING: natural living motion only — breathing, blinking, hair and cloaks stirring, banners rippling, candle and torch flames flickering, '
             'embers rising, mist rolling, water lapping, aurora curtains rippling, stars twinkling, runes pulsing with neon rune-blue light. People make small gestures '
             'true to their picture (a head turning, a hand tightening, a slow step) — they never leave the frame or start a new action.',
             'TRANSITIONS: long, soft cross-dissolves of about one second; the light carries across (a glow in one picture brightens and melts into the next).',
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE SHOTS:']
        P += ['@image%d (%s–%s s) %s: %s.' % (i + 1, fs(i * t), fs((i + 1) * t), b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', 'Hold the last picture a beat longer, still and quiet, as if the story is waiting for its next line.', '', KEEP]
    elif S['id'] == 'director':
        P = ['STYLE — DIRECTOR\'S CUT. A cinematic story cut-scene with real film grammar, %s seconds, 16:9. The %d pictures (%s) are the KEY FRAMES of the scene '
             'and its visual bible: they define the characters, costumes, places, colours and painted style. Every picture must appear on screen, in this order, '
             'as the moment it shows — about %s seconds of the scene is built around each one.' % (tot, n, ims, fs(t)),
             'Between and around the key frames you are free to add coverage of the SAME characters in the SAME places, as a film editor would: a wider establishing '
             'shot, a close-up on a face, eyes or hands, an over-the-shoulder shot, a reaction shot, an insert of an object. Do not add new characters or new places.',
             '', WORLD, '',
             'CUTTING: cut on action; match cuts; shot-reverse-shot between two characters; keep screen direction consistent; vary shot sizes (wide → medium → '
             'close-up → wide); 3 to 6 cuts around each key frame; a short breath of stillness before the most important moment.',
             'CAMERA: real cinematic lenses and moves — dolly in, tracking alongside, slow handheld for tension, low angle for power, high angle for smallness, '
             'rack focus between faces, shallow depth of field on close-ups.',
             'PERFORMANCE: the characters act — they move with purpose, react with clear emotion, handle objects, look at each other. Faces stay exactly as in the pictures.',
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE SCENE, KEY FRAME BY KEY FRAME:']
        P += ['@image%d — %s: %s.' % (i + 1, b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', 'End on the last key frame, held for a moment.', '', KEEP]
    elif S['id'] == 'onetake':
        path = I['path']
        P = ['STYLE — ONE-TAKE JOURNEY. One continuous, unbroken camera shot of %s seconds, 16:9 — NO CUTS AT ALL, like the single-take cinematics of modern action games. '
             'The %d pictures (%s) are WAYPOINTS on the camera\'s path: the camera arrives at each one in order, settles for a moment so the frame matches the '
             'picture, then flies on to the next — about %s seconds per waypoint. Between waypoints, invent the spaces the camera travels through so the world '
             'feels continuous (clouds, aurora, doorways, water, light), in the same painted style.' % (tot, n, ims, fs(t)),
             '', WORLD, '',
             'CAMERA RHYTHM: glide in, settle on the waypoint, then accelerate through the in-between space and ease into the next waypoint. Smooth, weightless, '
             'confident — a flying camera, never a cut, never a fade.',
             'MOTION IN THE WORLD: aurora curtains rippling, light streaming past the lens, clouds parting, runes and magic glowing neon rune-blue, cloaks and hair moving in the wind.',
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE WAYPOINTS:']
        P += ['@image%d — %s: %s.' % (i + 1, b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', 'THE PATH:'] + ['%d. %s.' % (i + 1, p) for i, p in enumerate(path)] + ['', KEEP]
    elif S['id'] == 'rhythm':
        P = ['STYLE — RHYTHM MONTAGE. An epic ' + I.get('kind', 'boss-intro') + ' montage of %s seconds, 16:9, cut like a game trailer to medieval midcore EDM at about 115 BPM. '
             'Use all %d pictures (%s) in this order for the story; you may cut back to them, punch in on details and re-frame them, but never invent new places '
             'or new characters. About %s seconds of the montage belongs to each picture.' % (tot, n, ims, fs(t)),
             '', WORLD, '',
             'CUTTING: hard cuts on the beat, a cut every one or two beats (about every 0.5 to 1 second); quick punch-in zooms; speed ramps from fast to slow motion '
             'at the big moments; impact frames; camera shake on every hit; lightning flashes, ember bursts and shattering light as cut points.',
             'SHAPE: three movements — a tense build (the first pictures), a rising barrage (the middle pictures), and the reveal: ' + I.get('reveal', 'the boss in slow motion, towering') + ', '
             'the widest and longest hold of the montage. The last picture lands on the final beat and holds.',
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE BEATS:']
        P += ['@image%d — %s: %s.' % (i + 1, b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', KEEP]
    elif S['id'] in FRAME:
        F = FRAME[S['id']]
        P = ['STYLE — %s. %s A story cut-scene of %s seconds, 16:9. Use all %d pictures (%s), in this order, about %s seconds each: every picture must come '
             'fully alive on screen as itself — its characters, faces, clothes, places and colours exactly as painted.' % (S['name'].upper(), F['intro'], tot, n, ims, fs(t)),
             '', WORLD, '', 'THE DEVICE: ' + F['device'], 'THE TRANSITIONS: ' + F['trans'], 'CAMERA: ' + F['camera'],
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE PICTURES:']
        P += ['@image%d — %s: %s.' % (i + 1, b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', F['end'], '', KEEP + ' ' + F.get('keep', '')]
    elif S['id'] == 'story':
        P = ['STORY-LED — THE PICTURES ARE INSPIRATION ONLY. %s A continuous story of %s seconds, 16:9, told as one flowing scene (or a few linked shots) with clear '
             'cause and effect. The %d pictures (%s) are the art direction: they show how Runeheim, its people, places, light and painted style look. Use them freely — '
             'you do not have to show any picture exactly as it is, nor in their order; borrow their characters, places, colours and moments wherever the story needs them.' % (I['intro'], tot, n, ims),
             '', WORLD, '', 'THE STORY — follow it beat by beat:']
        P += ['%s–%s s: %s' % (a, b, x) for a, b, x in I['story']]
        P += ['', 'CONTINUITY: ' + I['thread'], 'CAMERA: ' + I['camera'], 'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'END ON: ' + I['endon'], '', KEEP]
    else:      # poem
        P = ['A wordless, mythic visual poem, %s seconds, 16:9, in the hand-painted storybook style of these pictures. Use the %d pictures (%s) as inspiration '
             'and as the reference for how the characters, places and colours look — roughly in this order, about %s seconds each. You are free to interpret, '
             're-frame, combine and transform them, and to invent dreamlike, symbolic transitions: sparks becoming stars, an aurora pouring like a river of light, '
             'a closing door folding into darkness, a hand opening into a sunrise. Let the feeling lead.' % (tot, n, ims, fs(t)),
             '', 'FEELING: %s' % I['feel'], 'LIGHT AND COLOUR: %s.' % I['arc'], '',
             'THE IMAGES, AS MOMENTS: ' + '; '.join('%s (@image%d)' % (L[i], i + 1) for i in range(n)) + '.',
             '', 'Slow, flowing, graceful motion; light and magic glowing neon rune-blue; aurora and shooting stars. End on @image%d, held still.' % n,
             '', 'Keep the faces, hair and clothes of the people in the pictures, and the painted style. Keep out: ' + KEEP.split(': ', 1)[1]]
    if I.get('slow'): P.insert(1, I['slow'])
    return '\n'.join(P) + '\n'

def main():
    L = []; made = 0
    for k, I in enumerate(IDEAS, 1):
        B = frames(I); S = SBY[I['style']]; pr = prompt(I); name = 'style_%s' % I['id']
        d = os.path.join(OUT, 'S%02d_%s' % (k, I['id'])); src_who = 'zeldor' if I['who'] in ('both', 'zeldor') else I['who']
        srcs = [os.path.join(SB, I['scene'], src_who, '%02d.png' % b['n']) for b in B]
        have = all(os.path.isfile(s) for s in srcs)
        if have:
            os.makedirs(d, exist_ok=True)
            for j, s in enumerate(srcs, 1):
                tgt = os.path.join(d, 'image%d.png' % j)
                if os.path.isfile(tgt) and os.path.getsize(tgt) == os.path.getsize(s): continue
                try: os.link(s, tgt)
                except OSError:
                    with open(s, 'rb') as fa, open(tgt, 'wb') as fb: shutil.copyfileobj(fa, fb, 1 << 20)
                made += 1
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(pr)
            open(os.path.join(d, 'SAVE AS %s.mp4' % name), 'a').close()
        L.append(dict(k=k, id=I['id'], scene=I['scene'], who=I['who'] if I['who'] != 'both' else 'zeldor', part=I.get('part'), style=I['style'], title=I['title'], why=I['why'],
                      frames=[b['n'] for b in B], caps=[b.get('cap', '') for b in B], secs=LONG, prompt=pr, chars=len(pr), folder='S%02d_%s' % (k, I['id']), save=name + '.mp4'))
        print('S%02d  %-22s %-9s %d pictures, %s s each, prompt %d characters%s' % (k, I['id'], I['style'], len(B), fs(LONG / len(B)), len(pr), '' if have else '   (pictures not here)'))
    O = []
    for k, I in enumerate(ONE, 1):
        B = frames(I); pr = prompt(I); name = 'one_%s' % I['id'][2:]; folder = 'O%02d_opening_%s' % (k, I['id'][2:])
        srcs = [os.path.join(SB, I['scene'], 'zeldor', '%02d.png' % b['n']) for b in B]; have = all(os.path.isfile(x) for x in srcs)
        if have:
            d = os.path.join(OUT, folder); os.makedirs(d, exist_ok=True)
            for j, x in enumerate(srcs, 1):
                tgt = os.path.join(d, 'image%d.png' % j)
                if os.path.isfile(tgt) and os.path.getsize(tgt) == os.path.getsize(x): continue
                try: os.link(x, tgt)
                except OSError:
                    with open(x, 'rb') as fa, open(tgt, 'wb') as fb: shutil.copyfileobj(fa, fb, 1 << 20)
                made += 1
            open(os.path.join(d, 'PROMPT.txt'), 'w', encoding='utf-8').write(pr); open(os.path.join(d, 'SAVE AS %s.mp4' % name), 'a').close()
        O.append(dict(k=k, id=I['id'], scene='opening', who='zeldor', part=1, style=I['style'], title=I['title'], why=SBY[I['style']]['best'],
                      frames=[b['n'] for b in B], caps=[b.get('cap', '') for b in B], secs=LONG, prompt=pr, chars=len(pr), folder=folder, save=name + '.mp4', new=I.get('new')))
        print('O%02d  %-22s %d pictures, prompt %d characters%s' % (k, I['style'], len(B), len(pr), '' if have else '   (pictures not here)'))
    js = ('// made by tools/video/kling_styles.py (round 92, doc 48) — do not edit by hand\nvar ZCUTSTY=' +
          json.dumps({'styles': STYLES, 'ideas': L, 'one': O}, ensure_ascii=False) + ';\n')
    open(os.path.join(ROOT, 'lab', 'src', 'js', '79o0-cutstyles-data.js'), 'w', encoding='utf-8').write(js)
    if os.path.isdir(OUT):
        open(os.path.join(OUT, 'S00 - README styles.txt'), 'w', encoding='utf-8').write(
            'ONE VIDEO, TEN STYLES (O01-O10: the opening, part 1) and TEN FIRST TRIES (S01-S10) - round 92, doc 48; Lab -> Cut-scene styles\n\n'
            'Pick the five you want in the Lab (star them), then for each of those folders:\n'
            '  1. Kling -> Video -> Keyframes (as before). Upload image1.png ... in order - every picture is used.\n'
            '  2. Paste PROMPT.txt (these are long on purpose - the whole prompt goes in).\n'
            '  3. 20 seconds, 16:9. Download and drop the video into the same folder (any name).\n'
            '  4. .\\tools\\video\\video1.ps1 -Intake   - Claude then puts them side by side in the Lab.\n\n' +
            '\n'.join('%s   %s' % (x['folder'], x['title']) for x in O) + '\n\n' + '\n'.join('S%02d_%s   %s  (%s)' % (x['k'], x['id'], x['title'], SBY[x['style']]['name']) for x in L) + '\n')
    print('\n%d picture(s) linked -> %s' % (made, OUT))

if __name__ == '__main__': main()
