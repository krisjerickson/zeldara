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

def frames(I):
    sc = SC[I['scene']]; B = sc['beats']
    if I.get('part'):      # the same split as kling.py (6 at most)
        n = len(B); k = (n + 5) // 6; base, extra = divmod(n, k); i = 0; P = []
        for p in range(k): m = base + (1 if p < extra else 0); P.append(B[i:i + m]); i += m
        B = P[I['part'] - 1]
    return B

def prompt(I):
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
        P = ['STYLE — RHYTHM MONTAGE. An epic boss-intro montage of %s seconds, 16:9, cut like a game trailer to medieval midcore EDM at about 115 BPM. '
             'Use all %d pictures (%s) in this order for the story; you may cut back to them, punch in on details and re-frame them, but never invent new places '
             'or new characters. About %s seconds of the montage belongs to each picture.' % (tot, n, ims, fs(t)),
             '', WORLD, '',
             'CUTTING: hard cuts on the beat, a cut every one or two beats (about every 0.5 to 1 second); quick punch-in zooms; speed ramps from fast to slow motion '
             'at the big moments; impact frames; camera shake on every hit; lightning flashes, ember bursts and shattering light as cut points.',
             'SHAPE: three movements — a tense build (the first pictures), a rising barrage (the middle pictures), and the reveal: the boss in slow motion, towering, '
             'the widest and longest hold of the montage. The last picture lands on the final beat and holds.',
             'LIGHT AND COLOUR: %s.' % I['arc'], 'FEELING: %s' % I['feel'], '', 'THE BEATS:']
        P += ['@image%d — %s: %s.' % (i + 1, b['title'], L[i]) for i, b in enumerate(B)]
        P += ['', KEEP]
    else:      # poem
        P = ['A wordless, mythic visual poem, %s seconds, 16:9, in the hand-painted storybook style of these pictures. Use the %d pictures (%s) as inspiration '
             'and as the reference for how the characters, places and colours look — roughly in this order, about %s seconds each. You are free to interpret, '
             're-frame, combine and transform them, and to invent dreamlike, symbolic transitions: sparks becoming stars, an aurora pouring like a river of light, '
             'a closing door folding into darkness, a hand opening into a sunrise. Let the feeling lead.' % (tot, n, ims, fs(t)),
             '', 'FEELING: %s' % I['feel'], 'LIGHT AND COLOUR: %s.' % I['arc'], '',
             'THE IMAGES, AS MOMENTS: ' + '; '.join('%s (@image%d)' % (L[i], i + 1) for i in range(n)) + '.',
             '', 'Slow, flowing, graceful motion; light and magic glowing neon rune-blue; aurora and shooting stars. End on @image%d, held still.' % n,
             '', 'Keep the faces, hair and clothes of the people in the pictures, and the painted style. Keep out: ' + KEEP.split(': ', 1)[1]]
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
    js = ('// made by tools/video/kling_styles.py (round 92, doc 48) — do not edit by hand\nvar ZCUTSTY=' +
          json.dumps({'styles': STYLES, 'ideas': L}, ensure_ascii=False) + ';\n')
    open(os.path.join(ROOT, 'lab', 'src', 'js', '79o0-cutstyles-data.js'), 'w', encoding='utf-8').write(js)
    if os.path.isdir(OUT):
        open(os.path.join(OUT, 'S00 - README styles.txt'), 'w', encoding='utf-8').write(
            'TEN FIRST TRIES - FIVE WAYS TO PROMPT KLING (round 92, doc 48; Lab -> Cut-scene styles)\n\n'
            'Pick the five you want in the Lab (star them), then for each of those folders:\n'
            '  1. Kling -> Video -> Keyframes (as before). Upload image1.png ... in order - every picture is used.\n'
            '  2. Paste PROMPT.txt (these are long on purpose - the whole prompt goes in).\n'
            '  3. 20 seconds, 16:9. Download and drop the video into the same folder (any name).\n'
            '  4. .\\tools\\video\\video1.ps1 -Intake   - Claude then puts them side by side in the Lab.\n\n' +
            '\n'.join('S%02d_%s   %s  (%s)' % (x['k'], x['id'], x['title'], SBY[x['style']]['name']) for x in L) + '\n')
    print('\n%d picture(s) linked -> %s' % (made, OUT))

if __name__ == '__main__': main()
