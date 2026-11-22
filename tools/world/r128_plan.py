"""Round 128 — writes the Lab's data for the three new tabs: lab/src/js/79z-0-r128-data.js (var LR128).
  › Playing and coming back (engage)   — r128_engage.py: evidence, seven theses, 40 proposals, three waves
  › Releasing the game (publish)       — r128_publish.py: routes, fees, prices, the steps, the law, the name, the labels
  › Emojis, painted (icons)            — r128_icons.py: the audit by part of the game, the wiring, the new sheets
Run:  python tools/world/r128_plan.py"""
import os, sys, json
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import r128_engage, r128_publish, r128_icons
R = os.path.join(H, '..', '..')

if __name__ == '__main__':
    r128_icons.write_sheets()
    D = {'engage': r128_engage.data(), 'publish': r128_publish.data(), 'icons': r128_icons.data(),
         'have': json.load(open(os.path.join(H, 'r128_have_icons.json')))}
    js = ('// MADE BY tools/world/r128_plan.py (round 128) — do not edit by hand.\nvar LR128=' + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + ';\n')
    open(os.path.join(R, 'lab', 'src', 'js', '79z-0-r128-data.js'), 'w', encoding='utf-8').write(js)
    print('LR128:', len(js) // 1024, 'KB;', len(D['engage']['p']), 'proposals;', len(D['publish']['routes']), 'routes;', len(D['icons']['parts']), 'parts;', D['icons']['new_n'], 'new icons')
