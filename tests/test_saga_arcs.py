"""Round 72 — the health check's playthrough: every button of the sandbox's Spirit saga (nine arcs, from the bindstones to the credits and
free roam), pressed in order. Each must run without a script error and leave the game playable (a play scene running, or a cut-scene /
talk / pop-up showing that a click or Esc closes). Run: python tests/test_saga_arcs.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:300] if info != '' else ''), flush=True)
CLOSE = """(()=>{ for(var i=0;i<6;i++){ var z=document.getElementById('zcut'); if(z)z.click(); var p=document.getElementById('zcine-panel'); if(p)p.click(); }
  try{ if(typeof FairyTalk!=='undefined')FairyTalk.close(); }catch(e){} try{ if(typeof ZLS!=='undefined'&&ZLS._credEnd&&document.getElementById('zls-credits'))ZLS._credEnd(); }catch(e){}
  try{ (_openOverlays()||[]).forEach(function(id){ var el=document.getElementById(id); if(el)el.style.display='none'; }); _pauseSync(); }catch(e){} })()"""
STATE = """(()=>{ var act=game.scene.getScenes(true).map(function(s){ return s.sys.settings.key; }); return {act:act, play:act.some(function(k){ return /World|Dungeon|Volcano|FeastHall|Island|Sky|Building/.test(k); }), ov:_openOverlays()}; })()"""
with game(new=True) as g:
    g.wait(3500)
    g.js("(()=>{ var ws=game.scene.getScene('World'); ws.playerState.godMode=true; if(typeof sbUnlockAll==='function')sbUnlockAll(); })()"); g.wait(1500)
    arcs = g.js("SBSAGA.ARCS().map(function(A){ return {n:A.n,name:A.name,rows:A.rows.map(function(r){ return {l:r.l,b:r.b.map(function(b){ return {t:b.t,todo:!!b.todo}; })}; })}; })")
    total = 0
    for ai, A in enumerate(arcs):
        bad = []; n = 0
        for ri, R in enumerate(A['rows']):
            for bi, B in enumerate(R['b']):
                if B['todo']: continue
                e0 = len(g.errs); n += 1; total += 1
                try:
                    g.js("(()=>{ var A=SBSAGA.ARCS()[%d], b=A.rows[%d].b[%d]; b.f(); })()" % (ai, ri, bi))
                except Exception as ex:
                    bad.append('%s %s: %s' % (R['l'], B['t'], str(ex)[:120])); continue
                g.wait(4500); g.js(CLOSE); g.wait(1200); g.js(CLOSE); g.wait(500)
                st = g.js(STATE)
                if not st['play']: g.wait(5000); g.js(CLOSE); g.wait(800); st = g.js(STATE)      # a site still loading
                errs = [e for e in g.errs[e0:] if 'favicon' not in e and 'GL Driver' not in e]
                if errs or not st['play']: bad.append('%s %s: %s %s' % (R['l'], B['t'], st['act'], errs[:2]))
        check('Arc %s %s — %d buttons, each runs and leaves the game playable' % (A['n'], A['name'], n), not bad, bad[:4])
    print('%d buttons pressed' % total)
print('\n%d / %d passed' % (sum(res), len(res)))
