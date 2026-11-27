"""Round 140c (Kris ✓ every row of "What should move" in the Lab): the painted 4-frame loops for the stills that should move. Each row of a sheet
is one subject from its picture, four times, as a living loop; in the game ZMOVE (src/js/27z5-motion.js) plays mv_<id>_1..4 in the picture's place.
The rest of the list moves in code (ZMOVE.CODE: the kite, the boats, the harp, glowing plants and wisps, bees, chimney smoke, the crypt runes).
Writes src/js/07zt35-art-r141-motion.js and sprites/requests/r141_motion.txt.     python tools/world/r141_motion.py
Then: .\\tools\\sprites\\paint.ps1 -List r141_motion"""
import json, os
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
S = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))
IT = {}
for s in S['requests']:
    for it in s['items']: IT[it['id']] = (s['id'], it.get('w') or 60, it.get('h') or 60, it.get('name') or it['id'])
LOOP = ('Animation frames — each ROW is ONE subject shown FOUR times, read left to right, as a 4-frame living loop that runs round smoothly '
        '(frame 4 leads back into frame 1). Copy each subject EXACTLY from its picture in the reference sheets: the SAME design, size, colours and '
        'place in every frame, the same camera and scale; each frame alone and centred in its cell on a transparent background. ')
FIRE = ['the flames low and leaning a little left', 'the flames rising, a flicker to the right, a few sparks', 'the flames at their tallest and brightest, sparks lifting', 'the flames settling and leaning right, embers glowing']
WATER = ['water spilling from the top in an even sheet, ripples spreading in the basin', 'the spill thickening, a splash rising where it lands', 'the splash at its highest, droplets catching the light', 'the splash falling back, the ripples widening']
CLOTH = ['the cloth hanging almost still, a gentle fold', 'a breeze lifting it, a ripple running along it', 'the ripple at its fullest, the cloth billowing out', 'the ripple passing, the cloth falling back']
SUBJ = [  # id, what moves (the rest stays perfectly still), frames
    ('if_forgehearth', 'the fire in the coals', FIRE), ('if_crucible', 'the molten glow and the fire beneath', FIRE), ('if_oven', 'the fire inside the oven mouth', FIRE),
    ('vp_door_torch', 'the torch flame', FIRE), ('lm_brazier', 'the fire in the bowl', FIRE), ('fd_night_torch', 'the torch flame', FIRE), ('fd_night_brazier', 'the fire in the bowl', FIRE),
    ('fs_su_fire_on', 'the bonfire\'s flames and sparks', FIRE),
    ('it_candle', 'the candle flame', ['the flame small and upright', 'the flame stretching taller', 'the flame bending left', 'the flame bending right']),
    ('vp_fountain', 'the water', WATER), ('tf_c_fountain', 'the water', WATER), ('sp_coral_fountain', 'the water', WATER),
    ('sp_frozen_fountain', 'the light glinting over the ice and a few snowflakes', ['a glint at the top of the ice', 'the glint sliding down the frozen spill', 'the glint at the basin, a snowflake falling', 'the ice dim, a snowflake landing']),
    ('vp_banner_red', 'the banner cloth', CLOTH), ('vp_banner_teal', 'the banner cloth', CLOTH), ('vp_banner_gold', 'the banner cloth', CLOTH), ('cp_banner', 'the banner cloth', CLOTH),
    ('fs_bl_banner', 'the banners\' cloth', CLOTH), ('iw_banner', 'the banner cloth', CLOTH), ('vp_laundry', 'the washing on the line', CLOTH),
    ('fs_bl_pole', 'the ribbons and garlands', ['the ribbons hanging, the garlands still', 'the ribbons lifting and streaming to the right', 'the ribbons streaming out round the pole', 'the ribbons falling back, swinging left']),
    ('iw_bellows', 'the bellows', ['the bellows open wide, full of air', 'the bellows half pressed', 'the bellows pressed flat, a puff of air and sparks at the nozzle', 'the bellows opening again']),
    ('if_spinning', 'the wheel', ['the wheel with its spokes at one angle', 'the wheel turned a quarter of a spoke on', 'the wheel turned half a spoke on, the thread running', 'the wheel turned three quarters of a spoke on']),
    ('fs_su_wheel', 'the wheel\'s straw and ribbons', ['the wheel upright, the ribbons hanging', 'the ribbons lifting, the straw glinting', 'the ribbons streaming out', 'the ribbons falling back']),
    ('if_crystalball', 'the mist inside the ball', ['the mist curled to the left inside the glass', 'the mist swirling upward', 'the mist curled to the right, a faint light in it', 'the mist sinking and settling']),
    ('en_portal', 'the swirling light in the portal', ['the swirl turned a little, bright at the top', 'the swirl turned on, bright at the right', 'the swirl turned on, bright at the bottom', 'the swirl turned on, bright at the left'])]
sheets = []
for i in range(0, len(SUBJ), 2):
    pair = SUBJ[i:i + 2]; refs = []
    seq = []
    for sid, moves, fr in pair:
        src, w, h, nm = IT[sid]
        if src not in refs: refs.append(src)
        seq.append(['mv_' + sid, nm + ' — moving', nm.lower() + ' from the reference sheet — only ' + moves + ' move; everything else stays perfectly still', 'base', w, h, fr])
    sheets.append({'id': 'sc_mv141_%02d' % (i // 2 + 1), 'wave': 141, 'fam': 'anim', 'kind': 'obj', 'cols': 4, 'rows': len(pair), 'size': '1536x1024', 'anim': 1, 'refs': refs,
                   'title': LOOP + 'Only the parts named in each row move.', 'seq': seq})
js = ('// 07zt35-art-r141-motion.js — round 140c: the painted loops for the stills Kris ✓ in "What should move" (made by tools/world/r141_motion.py — edit there).\n'
      '//   .\\tools\\sprites\\paint.ps1 -List r141_motion      in the game: ZMOVE (27z5-motion.js) plays mv_<id>_1..4 in each picture\'s place\n'
      '(function(){ if(typeof ZSCN==="undefined")return; ZSCN.WAVES[141]=ZSCN.WAVES[141]||"Round 141"; ZSCN.SHEETS=ZSCN.SHEETS.concat(' +
      json.dumps(sheets, ensure_ascii=False) + '); if(ZSCN.expand)ZSCN.expand(); })();\n')
open(os.path.join(R, 'src', 'js', '07zt35-art-r141-motion.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(R, 'sprites', 'requests', 'r141_motion.txt'), 'w', encoding='utf-8').write('\n'.join(s['id'] for s in sheets) + '\n')
print(len(sheets), 'sheets,', len(SUBJ), 'loops')
