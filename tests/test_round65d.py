"""Round 65d — Solmyrk from Kris's picks: the Gilded Seraph, the Cracked Seraph (phase 1's helm, cracked — Kris's note), the Hollow King;
his sheets ordered again (sprite wave 7.95) with the picked paintings as references, and his cut-scene panels (scenery wave 72).
Run: python tests/test_round65d.py"""
import sys, os, json, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
ROOT = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
Q = {q['id']: q for q in json.load(open(os.path.join(ROOT, 'sprites/requests/requests.json')))['requests'] if q['id'].startswith('grim_')}
check('Nine sheets for Solmyrk in wave 7.95 (%d)' % len(Q), len(Q) == 9 and all(q['wave'] == 7.95 for q in Q.values()))
check('Each form\'s first sheet carries its picked painting (%s)' % [Q[k]['refs'][2:] for k in ('grim_1.core.s', 'grim_2.core.s', 'grim_3.core.s')],
      'sol_ref_1' in Q['grim_1.core.s']['refs'] and {'sol_ref_2', 'sol_ref_2d'} <= set(Q['grim_2.core.s']['refs']) and 'sol_ref_3' in Q['grim_3.core.s']['refs'])
b1, b2, b3 = Q['grim_1.core.s']['body'], Q['grim_2.core.s']['body'], Q['grim_3.core.s']['body']
check('Phase 1 the Gilded Seraph: gold, never blue, no legs, one eye, four wings, the scepter', 'Gilded Seraph' in b1 and 'No blue' in b1 and 'NO LEGS' in b1 and 'ONE glowing eye-slit' in b1 and 'TWO pairs of huge golden wings' in b1 and 'scepter' in b1)
check('Phase 2 wears phase 1\'s crested helm, cracked (Kris: "a cracked and more exposed version of the first one")', 'SAME tall pointed golden helm' in b2 and 'CRACKED' in b2 and 'ravens' in b2 and 'shadow' in b2)
check('Phase 3 the Hollow King: the void, four binding arms, not an insect, painted dark', 'Hollow King' in b3 and 'FOUR long thin black arms' in b3 and 'NOT an insect' in b3 and 'never paint him dark' not in b3)
S = [q for q in json.load(open(os.path.join(ROOT, 'sprites/requests/scenery.json')))['requests'] if q.get('wave') == 72]
okn = all(len(re.findall(r'Reference image (\d+)', q['body'])) == len(q['refs']) - 2 and max(map(int, re.findall(r'Reference image (\d+)', q['body']))) == len(q['refs']) for q in S)
check('Scenery wave 72: his intro and his two changes, two panels each (%s), each reference numbered right' % [q['id'] for q in S], [q['id'] for q in S] == ['sc_pn_sol_0', 'sc_pn_sol_12_a', 'sc_pn_sol_12_b', 'sc_pn_sol_23_a', 'sc_pn_sol_23_b'] and okn)
ps = open(os.path.join(ROOT, 'tools/sprites/round68.ps1')).read()
check('round68.ps1 keeps the old sheets (renamed, never deleted) and sends waves 72 and 7.95', 'r64.png' in ps and 'Remove-Item' not in ps and '--wave 72' in ps and ps.count('--wave 7.95 --tier all --concurrency') == 3)
with game(new=True) as g:
    g.wait(3000)
    r = g.js("""(()=>{ var o={}; o.n=['grim_1','grim_2','grim_3'].map(function(s){ return BA.of(s).name; }); o.pk=ZSOL.PICK;
      try{ o.th=['grim_1','grim_2','grim_3'].map(function(s){ var t=BA.thumbs(BA.of(s),160); var c=t&&t[0]?t[0]:t; return !!(c&&c.width); }); }catch(e){ o.err=String(e); }
      o.intro=!!ZCUT.SETS.grimnir_1; return o; })()""")
    check('The game knows his picked forms (%s) and still draws them until the sheets come (%s)' % (r['n'], r.get('th')), r['n'] == ['Solmyrk, the Gilded Seraph', 'Solmyrk, the Cracked Seraph', 'Solmyrk, the Hollow King'] and r.get('th') == [True, True, True] and r['intro'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:3])
print('\n%d / %d passed' % (sum(res), len(res)))
