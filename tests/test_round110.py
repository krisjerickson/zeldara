"""Round 110: Master Oswin meets you on the Green and walks you to his guild; the opening's sword is a wooden one.
  Kris: "at the very beginning, you should start with master oswin, but he's not at the village center. Make him be there at the
  beginning and then lead you to his guild hall as part of the tutorial" — "you only start with the wooden sword, so the intro videos
  should have a wooden sword, not the metal one".
python tests/test_round110.py   (after node build.mjs)"""
import sys, os, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SB = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'storyboards.json')))
op = [sc for sc in SB['scenes'] if sc['id'] == 'opening'][0]
txt = {b['n']: b['m'] + ' ' + b['f'] for b in op['beats']}
check('The opening\'s frames 10–12 ask for a plain wooden practice sword, never a metal one', all('wooden practice sword' in txt[n] for n in (10, 11, 12)), {n: txt[n][:160] for n in (10, 11, 12)})
r110 = open(os.path.join(ROOT, 'sprites', 'requests', 'r110.txt')).read()
check('…and those five pictures are ordered again (r110)', all(i in r110 for i in ('sc_sb_opening_10', 'sc_sb_opening_11_m', 'sc_sb_opening_11_f', 'sc_sb_opening_12_m', 'sc_sb_opening_12_f')), r110)
sys.path.insert(0, os.path.join(ROOT, 'tools', 'video'))
KP = os.path.join(ROOT, 'tools', 'video', 'kling.py'); kling = type(sys)('kling'); kling.__dict__['__file__'] = KP
exec(compile(open(KP, encoding='utf-8').read().split('\nos.makedirs(OUT')[0], KP, 'exec'), kling.__dict__)      # its functions only — the folders are not written
sc = [x for x in kling.J['scenes'] if x['id'] == 'opening'][0]
p = kling.prompt(sc, sc['beats'][6:], 'zeldara', 2, 2)
check('The opening\'s Kling prompt says the sword is wooden, and never metal', 'WOODEN practice sword' in p and 'Never a metal' in p, p[-400:])
q = [x for x in kling.J['scenes'] if x['id'] == 'surt1'][0]
check('…other scenes keep their swords', 'Never a metal' not in kling.prompt(q, q['beats'][:6], 'zeldara', 1, 1))
WS = "game.scene.getScene('World')"
S = "(()=>{ var ws=%s, ps=ws.playerState, O=ZWALK._ow; return {walk:ps.walk, ow:!!O, d:O?Math.round(Math.hypot(O.x-ws.player.x,O.y-ws.player.y)):null, cut:ZCUT.isOpen(), who:ZDLG.cur?document.querySelector('#zdlg .zd-name')&&document.querySelector('#zdlg .zd-name').textContent:null}; })()" % WS
with game(painted=True, real=True) as g:
    g.js("(()=>{ var s0=ZWALK.spawn; window._owAt=null; ZWALK.spawn=function(ws){ if(!ZWALK._ow&&!window._owAt){ var W=ws._wr, need=ws._wrNeeded?ws._wrNeeded():[]; window._owAt={late:Date.now()-(ZWALK._born||Date.now())>24000, ready:need.every(function(n){ if(!n.vis)return true; var c=W&&W.chunks.get(n.key); return !!c&&!(c.pend&&c.pend.length); })}; } return s0.apply(this,arguments); }; })()")
    for i in range(30):
        g.wait(700); a = g.js(S)
        if a['ow']: break
    at = g.js("window._owAt")
    check('A new game: Master Oswin waits on the Green beside you, appearing only once the Green is drawn (%s, %s)' % (a, at), a['ow'] and a['d'] is not None and a['d'] < 260 and at and (at['ready'] or at['late']), (a, at))      # the safety: never more than 25 s (the headless browser paints slowly under the opening)
    g.js("(()=>{ var b=document.querySelector('#'+ZCUT.ID+' .zcut-skip'); if(b)b.click(); })()")
    for i in range(20):
        g.wait(1000); b = g.js(S)
        if b['walk']: break
    check('After the opening, it is Oswin who greets you (%s)' % b, b['walk'] == 'hi' and b['who'] and 'Oswin' in b['who'], b)
    g.js("(()=>{ var ws=%s; for(var k=0;k<4&&ZDLG.cur;k++)ZDLG.cur.close(); ws.playerState.walk='attack'; ZWALK._hits=0; ws.worldAtkTimer=0; })()" % WS)
    for _ in range(3): g.js("(()=>{ var ws=%s; ws.worldAtkTimer=0; ws._worldAttack(); })()" % WS); g.wait(200)
    g.wait(900); h = g.js(S)
    check('Three swings (however you swing): Oswin answers and starts leading you (%s)' % h, h['walk'] == 'follow' and h['who'] and 'Oswin' in h['who'], h)
    g.js("(()=>{ var ws=%s; ZDLG.cur&&ZDLG.cur.close(); ZDLG.cur&&ZDLG.cur.close(); ZWALK.go(ws,'follow'); ZWALK.SPD=900; })()" % WS)
    for i in range(40):
        g.wait(500)
        c = g.js("(()=>{ var ws=%s, O=ZWALK._ow; if(ZDLG.cur)ZDLG.cur.close(); if(O){ ws.player.x=O.x-20; ws.player.y=O.y+10; } return {walk:ws.playerState.walk, ow:!!O, i:O&&O.i, n:O&&O.path&&O.path.length, tgt:ZWALK.target(ws)&&ZWALK.target(ws).t}; })()" % WS)
        if c['walk'] != 'follow': break
    d = g.js("(()=>{ var ws=%s, dr=ZWALK.door(ws); return {walk:ws.playerState.walk, ow:!!ZWALK._ow, dd:Math.round(Math.hypot(ws.player.x-dr.x,ws.player.y-dr.y))}; })()" % WS)
    check('He walks you to the guild door and goes in ahead: Tab at the door (%s)' % d, d['walk'] == 'guild' and not d['ow'] and d['dd'] < 120, d)
    e = g.js("(()=>{ var ws=%s; ZWALK.go(ws,'follow'); ZWALK._fsaid=1; var O=ZWALK.spawn(ws); O.path=[{x:O.x+400,y:O.y}]; O.i=0; ws.player.x=O.x+TILE*9; ws.player.y=O.y; var x0=O.x; return x0; })()" % WS)
    g.wait(1500)
    f = g.js("(()=>{ var O=ZWALK._ow; return {moved:Math.round(O.x)-%d, wait:!!O.wait}; })()" % e)
    check('…and waits when you fall behind (%s)' % f, f['wait'] and abs(f['moved']) < 5, f)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
