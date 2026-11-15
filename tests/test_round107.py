"""Round 107: the story comes first again; sites keep at least four floors.
  The opening of a new game plays before the twin's greeting, even when the soul-lines are slow to start (they used to start it).
  A story cut-scene that is due holds back the lessons, Oswin's hints and the first walk, and plays as soon as the open box closes.
  Floors: the Highlands boss dungeon, Boulder Field and Crystal Grotto keep 4; the Monolith mage tower keeps its 3 (test_round106).
python tests/test_round107.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
S = "(()=>{ var ws=game.scene.getScene('World'), ps=ws&&ws.playerState; return {cut:ZCUT.isOpen(), seen:(ps&&ps.sagaSeen||[]).slice(), q:(ps&&ps.sagaQ||[]).slice(), walk:ps&&ps.walk, dlg:!!(ZDLG.cur), hold:ZSQ.hold(ps)}; })()"
with game(painted=True, real=True) as g:
    g.js("ZSLW.on=false")      # the soul-lines no longer start the opening: the story queue must
    seq = []
    for i in range(24):
        g.wait(1000); s = g.js(S); seq.append(s)
        if s['cut']: break
    s = seq[-1]
    check('A new game: the opening plays, with nothing else first (%s)' % s, s['cut'] and 'opening' in s['seen'] and s['walk'] is None and not s['dlg'], seq[-3:])
    check('…and the tutorial is held while it plays', s['hold'], s)
    g.js("(()=>{ var b=document.querySelector('#'+ZCUT.ID+' .zcut-skip'); if(b)b.click(); })()")
    for i in range(20):
        g.wait(1000); s = g.js(S)
        if s['walk']: break
    check('…then your twin greets you and the first walk begins (%s)' % s, not s['cut'] and s['walk'] in ('hi', 'move') and s['dlg'], s)
    # a cut-scene due, while a lesson box is up: it plays as soon as the box closes, before any other lesson
    g.js("(()=>{ for(var k=0;k<4&&ZDLG.cur;k++)ZDLG.cur.close(); var ws=game.scene.getScene('World'), ps=ws.playerState; ps.walk='done'; ZWALK.on=false; ZSQ.lastEnd=0; ZLES.seen(ps).potion=0; delete ZLES.seen(ps).potion; ZLES.teach('potion'); ps.sagaQ=['realm2']; ps.sagaSeen=ps.sagaSeen.filter(k=>k!=='realm2'); })()")
    g.wait(600)
    a = g.js(S)
    check('A cut-scene due waits behind the open lesson box, and holds the next lessons (%s)' % a, a['dlg'] and not a['cut'] and a['hold'] and a['q'] == ['realm2'], a)
    g.js("ZDLG.cur&&ZDLG.cur.close()")
    for i in range(8):
        g.wait(700); b = g.js(S)
        if b['cut']: break
    check('…the box closed, it plays at once (%s)' % b, b['cut'] and 'realm2' in b['seen'] and not b['dlg'], b)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
