"""Round 93: the plan for the new sound takes → src/js/07zau7-sfx93.js (ZAUD.MEAN93, ZAUD.KEPT93, ZAUD.LIB93, ZAUD.V93).
Kris: "redo all of the ones i have not chosen, with 5 total to choose from (including already chosen ones), making sure that the sounds are thematic".
  KEPT93  the takes Kris has chosen (round 89's kept takes, or his round-89 Lab picks where he made them)        --picks picks.json (from the Lab)
  LIB93   1 fresh library recording for the effects where the Sonniss library has one that fits and was never offered (tools/audio/lib93.py → .r1)
  V93     the ElevenLabs words for the rest: 5 − kept − library, from tools/audio/sfx93_words.py (each names the real sound first)
                                                                                    python tools/audio/sfx93.py --picks <file>
"""
import os, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import sfx93_words as W
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
A = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'audio.json'), encoding='utf-8'))['cues']
S = [c for c in A if c['kind'] == 'sfx']
P = json.load(open(sys.argv[sys.argv.index('--picks') + 1])) if '--picks' in sys.argv else {}
LIBOK = set(json.load(open(os.path.join(ROOT, 'tools', 'audio', 'lib93_map.json'))).keys()) if os.path.isfile(os.path.join(ROOT, 'tools', 'audio', 'lib93_map.json')) else set()
_INC = os.path.join(ROOT, 'audio', 'incoming')
if os.path.isdir(_INC) and any(f.endswith('.r1.mp3') for f in os.listdir(_INC)): LIBOK = {i for i in LIBOK if os.path.isfile(os.path.join(_INC, i + '.r1.mp3'))}      # on the PC: only the library takes really made
TAIL = ' — game sound effect, clean and clear, no music, no voices'
K, L, V = {}, {}, {}
for c in S:
    i = c['id']; kept = list(c.get('kept89') or [])
    if i in P and P[i] is not None: kept = [x for x in str(P[i]).split('+') if x]
    K[i] = kept; lib = 1 if (i in LIBOK and len(kept) < 5) else 0; L[i] = lib
    n = max(0, 5 - len(kept) - lib); V[i] = [w + TAIL for w in W.W[i][:n]]
js = ('// ═══════════════════════════════════════════════════════════════════════\n'
      '// ║ 07zau7-sfx93.js — round 93 (made by tools/audio/sfx93.py from tools/audio/sfx93_words.py — do not edit by hand).\n'
      '// ║ Kris: "redo all of the ones i have not chosen, with 5 total to choose from … making sure that the sounds are thematic. A lightning spell\n'
      '// ║ should sound like lightning. Starfall should make you think of a shooting star". MEAN93: what each effect stands for; KEPT93: the takes\n'
      '// ║ he chose; LIB93: a fresh library take (.r1); V93: the new ElevenLabs words (.w1 …), each naming the real sound first.\n'
      '// ═══════════════════════════════════════════════════════════════════════\n'
      '(function(){ if(typeof ZAUD==="undefined")return;\n  ZAUD.MEAN93=' + json.dumps(W.MEAN, ensure_ascii=False) + ';\n  ZAUD.KEPT93=' + json.dumps(K) + ';\n  ZAUD.LIB93=' + json.dumps(L) +
      ';\n  ZAUD.V93=' + json.dumps(V, ensure_ascii=False) + ';\n  ZAUD.v93=function(c){ return ZAUD.V93[c.id]||null; };\n})();\n')
open(os.path.join(ROOT, 'src', 'js', '07zau7-sfx93.js'), 'w', encoding='utf-8').write(js)
n = sum(len(v) for v in V.values()); secs = sum(len(V[c['id']]) * max(0.5, c['secs']) for c in S)
print('%d effects · kept %d · library %d · new ElevenLabs takes %d (~%d credits)' % (len(S), sum(len(k) for k in K.values()), sum(L.values()), n, secs * 40))
