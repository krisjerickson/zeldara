#!/usr/bin/env python3
"""Round 129: ALL THE SEASONS AND FESTIVALS, TOGETHER (Kris: "i still don't see new requests or updates for the 5 seasons as well as the
festivals. let's create a new place in the lab where i can see all of the seasons and festival imagery together and provide any comments and
feedback, making sure to organize for all 5 of the seasons we show").
For each of the five seasons (the thaw · summer · the first true harvest · the first happy Yule · Freya's spring), group by group — trees,
plants, the shore and ground, the village's buildings, its props, the land dressed for the season, the festival at the doors and on the Green —
every painting there is (cut from its sheet), every sheet still ordered, and the new requests of this round.
    python tools/world/seasons_all.py            → lab/src/js/79t10-0-seasons-all-data.js (LSALL)        (anywhere: reads the requests and the index)
    python tools/world/seasons_all.py --sheets   → lab/preview/seasonsall/<season>_<group>.jpg              (on the PC: needs sprites/out/scenery/items)"""
import json, os, sys, re
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
REQ = {q['id']: q for q in json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json'), encoding='utf-8'))['requests']}
IDX = json.load(open(os.path.join(R, 'assets', 'scenery', 'index.json'), encoding='utf-8'))
OUT = os.path.join(R, 'lab', 'preview', 'seasonsall')

SEASONS = [
    ('sp', '🌱', 'The thaw — the first spring', '#b8c8a0', 'th', 'Muted and grey-green: old snow in the shadows, mud and meltwater, catkins and buds, the first birds back. The village is waking, not celebrating.'),
    ('su', '☀️', 'Summer — Midsummer', '#f0c860', '', 'The world as it is painted, at the height of the year; Midsummer Fires on the Green.'),
    ('au', '🍂', 'The first true harvest — Haustblót', '#d88a3a', 'au', 'Gold and rust, hay on the racks, carts heaped, rowan garlands: the first full harvest in a generation. Evergreens stay green.'),
    ('wi', '❄️', 'The first happy Yule — Jól', '#a8c8e8', 'wi', 'A mild winter with hoarfrost, candles in every window, straw goats and stars, spruce at the doors — joy back in the land.'),
    ('bl', '🌸', 'Freya\'s spring — the celebration of life', '#f0a8c8', 'sp', 'Lush: blossom, flower crowns, birch leaves at every door, Valborg fires, wood anemones — the gods come home.'),
]
# the groups, in the order the Lab shows them: (id, name, the summer sheets they are made from)
GROUPS = [
    ('trees', 'Trees', ['sc_trees_1', 'sc_trees_2', 'sc_trees_3']),
    ('plants', 'Plants, flowers and crops', ['sc_plants_1', 'sc_plants_2', 'sc_plants_3']),
    ('edges', 'Shores, edges and the ground', ['sc_edge_1', 'sc_edge_3', 'sc_edge_4', 'sc_edge_6', 'sc_tex_grass', 'sc_tex_earth']),
    ('village', 'The village — buildings and houses', ['sc_vill_core_1', 'sc_vill_core_2', 'sc_vill_houses', 'sc_vill_special_1', 'sc_vill_special_2']),
    ('vprops', 'The village — its props', ['sc_vprops_1', 'sc_vprops_2', 'sc_vprops_3', 'sc_vprops_4']),
    ('land', 'The land dressed for the season', []),
    ('fest', 'The festival — at the doors and on the Green', []),
]
LAND = {'sp': ['sc_land_thaw', 'sc_land_thaw_set'], 'su': [], 'au': ['sc_land_harvest'], 'wi': ['sc_land_yule'], 'bl': ['sc_land_bloom']}
FEST = {s: ['sc_fest_dress_' + s, 'sc_fest_set_' + s] for s in ('sp', 'su', 'au', 'wi', 'bl')}
FEST['bl'].append('sc_fest_set_bl2')
SHARED = [('air', 'The seasons\' air', ['sc_seas_air']), ('icons', 'Season marks, festival food and the year\'s icons', ['sc_seas_icons', 'sc_fest_food', 'sc_ic_r128_seasons'])]
NEW = {'sc_seas_th_vprops_1', 'sc_seas_th_vprops_2', 'sc_seas_th_vprops_3', 'sc_seas_th_vprops_4', 'sc_seas_sp_vprops_1', 'sc_seas_sp_vprops_2',
       'sc_seas_sp_vprops_3', 'sc_seas_sp_vprops_4', 'sc_fest_set_bl2'}        # ordered this round (07zt23)
REDO = {'sc_seas_au_trees_1', 'sc_seas_au_trees_2', 'sc_seas_au_trees_3', 'sc_seas_au_plants_1', 'sc_seas_au_plants_2', 'sc_seas_au_plants_3',
        'sc_seas_th_plants_3', 'sc_seas_th_vprops_3', 'sc_seas_wi_plants_3'}        # round 130: Kris ↻ — painted again (07zt24, redo.ps1 -List r130_seasons_redo)
EVER = re.compile(r'^tr_(pine|mangrove)|^pl_(hedge|topiary)|^ed_(ivy|moss_patch)')


def sid(src, art): return 'sc_seas_%s_%s' % (art, src[3:])


def painted(i): return i in IDX['items'] or i in IDX['tex']


def sheets_for(s, art, g, srcs):
    if g == 'land': return LAND[s]
    if g == 'fest': return FEST[s]
    if s == 'su': return srcs
    return [sid(x, art) for x in srcs]


def sheet_info(k):
    q = REQ.get(k)
    if not q: return {'id': k, 'title': '(not ordered)', 'n': 0, 'got': 0, 'state': 'none', 'items': []}
    its = [{'id': it['id'], 'n': it['name'], 'p': painted(it['id']), 'ev': bool(EVER.match(it['id'])) and k.startswith('sc_seas_au')} for it in q['items']]
    got = sum(1 for x in its if x['p'])
    st = ('redone' if its and got == len(its) else 'redo') if k in REDO else 'in' if its and got == len(its) else ('new' if k in NEW else 'part' if got else 'ordered')
    return {'id': k, 'title': re.sub(r'\. Each piece.*$|Each piece.*$', '', q.get('title', '')).strip(), 'n': len(its), 'got': got, 'state': st, 'wave': q.get('wave'), 'tex': q['kind'] == 'tex', 'items': its}


def data():
    out = {'seasons': [], 'shared': []}
    for s, ic, name, col, art, story in SEASONS:
        G = []
        for g, gname, srcs in GROUPS:
            sh = [sheet_info(k) for k in sheets_for(s, art, g, srcs)]
            if not sh: continue
            G.append({'g': g, 'n': gname, 'sheets': [{k: v for k, v in x.items() if k != 'items'} for x in sh], 'img': '%s_%s' % (s, g),
                      'n_in': sum(x['got'] for x in sh), 'n_all': sum(x['n'] for x in sh), 'ev': [i['n'] for x in sh for i in x['items'] if i.get('ev')]})
        shots = ['season_%s_village' % s, 'season_%s_grass' % s] + (['land_%s_village' % s, 'land_%s_grass' % s] if s != 'su' else [])
        out['seasons'].append({'s': s, 'ic': ic, 'name': name, 'col': col, 'story': story, 'groups': G, 'shots': shots})
    for g, gname, ks in SHARED:
        sh = [sheet_info(k) for k in ks]
        out['shared'].append({'g': g, 'n': gname, 'sheets': [{k: v for k, v in x.items() if k != 'items'} for x in sh], 'img': 'all_%s' % g, 'n_in': sum(x['got'] for x in sh), 'n_all': sum(x['n'] for x in sh)})
    out['new'] = sorted(NEW)
    return out


def contact(name, items, col):
    """One picture of a group: every piece at its own painted size (round 129b: Kris could not judge the small ones), its name under it;
    not painted yet → a dashed box. Small pieces are shown at twice their size (marked ×2)."""
    from PIL import Image, ImageDraw, ImageFont
    def src(it):
        a = os.path.join(R, 'sprites', 'out', 'scenery', 'items', it['id'] + '.png'); b = os.path.join(R, 'assets', 'scenery', 'tex', it['id'] + '.webp')
        return a if os.path.exists(a) else b if os.path.exists(b) else None
    pics = []
    for it in items:
        p = src(it) if it['p'] else None; im = Image.open(p).convert('RGBA') if p else None; up = 1
        if im is not None:
            if max(im.size) < 140: up = 2; im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
            if max(im.size) > 420: im.thumbnail((420, 420), Image.LANCZOS)
        pics.append((it, im, up))
    cw = max([180] + [im.width + 24 for it, im, up in pics if im is not None]); chh = max([150] + [im.height + 20 for it, im, up in pics if im is not None]) + 34
    cols = max(2, min(6, 1900 // cw)); rows = max(1, -(-len(pics) // cols)); W = cw * min(cols, max(1, len(pics))); H = chh * rows + 8
    im0 = Image.new('RGB', (W, H), (34, 38, 32)); d = ImageDraw.Draw(im0)
    try: font = ImageFont.truetype('DejaVuSans.ttf', 15)
    except Exception: font = ImageFont.load_default()
    for k, (it, im, up) in enumerate(pics):
        x, y = (k % cols) * cw, (k // cols) * chh + 4
        d.rounded_rectangle([x + 4, y, x + cw - 4, y + chh - 8], 10, fill=(52, 60, 46) if im is not None else (40, 40, 40), outline=(220, 120, 60) if it.get('ev') else None, width=3)
        if im is not None: im0.paste(im, (x + (cw - im.width) // 2, y + 8 + (chh - 44 - im.height)), im)
        else:
            d.text((x + 24, y + chh // 2 - 20), 'not painted yet', fill=(160, 160, 160), font=font)
        d.text((x + 10, y + chh - 32), (it['n'][:34] + ('  ×2' if up == 2 else '')), fill=(235, 230, 210), font=font)
    im0.save(os.path.join(OUT, name + '.jpg'), quality=88)


def sheets():
    os.makedirs(OUT, exist_ok=True); D = data(); n = 0
    for S in D['seasons']:
        for G in S['groups']:
            its = [i for k in [x['id'] for x in G['sheets']] for i in sheet_info(k)['items']]
            contact(G['img'], its, S['col']); n += 1
    for G in D['shared']:
        contact(G['img'], [i for x in G['sheets'] for i in sheet_info(x['id'])['items']], '#ffffff'); n += 1
    print(n, 'pictures →', OUT)


def write():
    D = data()
    open(os.path.join(R, 'lab', 'src', 'js', '79t10-0-seasons-all-data.js'), 'w', encoding='utf-8').write(
        '// generated by tools/world/seasons_all.py — round 129, all the seasons and festivals together (do not edit by hand)\nvar LSALL=' + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + ';\n')
    for S in D['seasons']:
        print(S['s'], ' · '.join('%s %d/%d' % (G['g'], G['n_in'], G['n_all']) for G in S['groups']))


if __name__ == '__main__':
    sheets() if '--sheets' in sys.argv else write()
