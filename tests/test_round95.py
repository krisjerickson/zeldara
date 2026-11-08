"""Round 95 — one story cut-scene at a time (16x ZSQ): the first spirit's cut-scene before its pop-up, a realm's old disaster on the first
steps into it (not with a freed spirit), and the queue that keeps two from playing back to back.  Run: python tests/test_round95.py"""
import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
def until(g, expr, ms=20000):
    t = time.time()
    while (time.time() - t) * 1000 < ms:
        if g.js(expr): return True
        g.wait(250)
    return False
OPEN = "(()=>!!document.getElementById('zcut'))()"
KEY = "(()=>document.getElementById('zcut')?ZCUT._key:null)()"
TALK = "(()=>{ var e=document.getElementById('fairy-talk'); return !!(e&&e.style.display!=='none'&&e.isConnected); })()"
END = "(()=>{ document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); return true; })()"
with game(painted=True, w=1280, h=720) as g:
    g.wait(4000)
    g.js("(()=>{ ZCUT.on=true; var ps=game.scene.getScene('World').playerState; ps.sagaSeen=['opening']; ps.sagaQ=[]; ps.realmsEntered=[1]; ZSQ.lastEnd=0; ZSQ.t0=1; })()")
    rd = g.js("(()=>({firstfree:ZSAGA.ready('firstfree'),realm2:ZSAGA.ready('realm2'),realm3:ZSAGA.ready('realm3'),gate:ZSAGA.ready('gate')}))()")
    check('The story cut-scenes are painted here (%s)' % rd, rd['firstfree'] and rd['realm2'], rd)
    # ── the first spirit: in the Wetlands (the case Kris met) ──
    s = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.spiritsFreed=[]; ps.shardsGiven=[]; var s=(ws.wd._shrines||[]).find(x=>x.q===2);
      ps.realmsEntered=[1,2,3,4];      /* already walked in: only the freeing is tested here */
      ws.player.x=s.x; ws.player.y=s.y+40; ZSPIRIT.free(ws,s); return {id:s.id, n:ps.spiritsFreed.length}; })()""")
    g.wait(400)
    a = {'open': g.js(OPEN), 'key': g.js(KEY), 'talk': g.js(TALK), 'n': g.js("game.scene.getScene('World').playerState.spiritsFreed.length")}
    check('Freeing the first spirit plays its cut-scene FIRST — no thanks pop-up yet, not freed yet (%s)' % a, a['open'] and str(a['key']).endswith('saga_firstfree') and not a['talk'] and a['n'] == 0, a)
    g.js(END); ok = until(g, TALK, 4000)
    b = {'talk': g.js(TALK), 'n': g.js("game.scene.getScene('World').playerState.spiritsFreed.length"), 'open': g.js(OPEN)}
    check('…then the spirit is freed and its thanks pop-up opens (%s)' % b, ok and b['talk'] and b['n'] == 1 and not b['open'], b)
    g.js("(()=>{ FairyTalk.close(); })()")
    traced = until(g, "(()=>{ var ws=game.scene.getScene('World'); return (ws.playerState.slSeen||[]).indexOf(%r)>=0&&!ws._zslT; })()" % s['id'], 25000)
    g.wait(2500)
    c = {'traced': traced, 'open': g.js(OPEN), 'q': g.js("game.scene.getScene('World').playerState.sagaQ"), 'seen': g.js("game.scene.getScene('World').playerState.sagaSeen")}
    check('…then its soul-line; and the Wetlands\' old disaster does NOT follow it (%s)' % c, traced and not c['open'] and 'realm2' not in c['q'] and 'realm2' not in c['seen'], c)
    # ── the first steps into a realm: its old disaster ──
    g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.realmsEntered=[1]; ZSQ.lastEnd=0; var s=(ws.wd._shrines||[]).find(x=>x.q===1)||{x:CENTER_X*TILE,y:(CENTER_Y-60)*TILE};
      ws.player.x=s.x; ws.player.y=s.y+40; })()""")
    g.wait(1200)
    check('Walking in the Grasslands plays nothing', not g.js(OPEN))
    g.js("""(()=>{ var ws=game.scene.getScene('World'), s=(ws.wd._shrines||[]).find(x=>x.q===2&&getTileSection(Math.floor(x.x/TILE),Math.floor(x.y/TILE))===2); ws.player.x=s.x; ws.player.y=s.y+60; })()""")
    ok = until(g, OPEN, 4000)
    check('The first steps into the Wetlands play the Black Tide (%s)' % g.js(KEY), ok and str(g.js(KEY)).endswith('saga_realm2'), g.js(KEY))
    g.js(END); g.wait(900)
    # ── the queue: a second story cut-scene right after waits for a calm moment ──
    g.js("""(()=>{ var ws=game.scene.getScene('World'), s=(ws.wd._shrines||[]).find(x=>x.q===3&&getTileSection(Math.floor(x.x/TILE),Math.floor(x.y/TILE))===3); ws.player.x=s.x; ws.player.y=s.y+60; })()""")
    g.wait(1500)
    d = {'open': g.js(OPEN), 'q': g.js("game.scene.getScene('World').playerState.sagaQ")}
    check('Stepping into the Highlands right after: the Stone-Fall waits in the queue, nothing plays back to back (%s)' % d, not d['open'] and d['q'] == ['realm3'], d)
    g.js("(()=>{ var e=document.getElementById('modal-map'); toggleModal('map'); ZSQ.lastEnd=Date.now()-ZSQ.GAP-10; })()"); g.wait(1500)
    check('…it still waits while a menu is open', not g.js(OPEN))
    g.js("(()=>{ toggleModal('map'); })()")
    ok = until(g, OPEN, 4000)
    check('…and plays once the moment is calm (%s)' % g.js(KEY), ok and str(g.js(KEY)).endswith('saga_realm3'), g.js(KEY))
    g.js(END); g.wait(900)
    e = g.js("(()=>{ var ps=game.scene.getScene('World').playerState; return {q:ps.sagaQ, seen:ps.sagaSeen, entered:ps.realmsEntered}; })()")
    check('Seen once each, the queue empty, the realms remembered in the save (%s)' % e, not e['q'] and e['seen'].count('realm2') == 1 and e['seen'].count('realm3') == 1 and 2 in e['entered'] and 3 in e['entered'], e)
    f = g.js("(()=>{ ZSQ.lastEnd=Date.now(); var ps=game.scene.getScene('World').playerState; var r=ZSAGA.play(ps,'gate'); return {r:r, q:ps.sagaQ.slice(), open:!!document.getElementById('zcut')}; })()")
    check('A story cut-scene asked for within %d s of another is queued, not stacked (%s)' % (40, f), f['r'] is False and f['q'] == ['gate'] and not f['open'], f)
    g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.sagaQ=[]; ZCUT.on=false; })()")
    E = [e for e in g.errs if '404' not in e and 'decode audio' not in e]      # the cloud copy lacks some sound files
    check('No script errors', not E, E[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
