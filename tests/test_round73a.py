"""Round 73a — the made ambience and effects in the game (assets/audio from ElevenLabs via tools/audio; 27z-audio-hooks.js). The real files:
the index in the page, the ambience of the place looping, and the hooked moments playing their own sounds. Run: python tests/test_round73a.py"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game() as g:
    r = g.js("({n:ZAUDIO.idx&&Object.keys(ZAUDIO.idx).length, files:ZAUDIO.idx&&Object.values(ZAUDIO.idx).reduce((a,e)=>a+e.files.length,0), hooks:!!ZAHOOK.installed})")
    check('The 71 made sounds (142 takes) are in the page and the hooks are on (%s)' % r, r['n'] == 71 and r['files'] == 142 and r['hooks'], r)
    g.js("window.__played=[]; (function(){ var p=ZAUDIO.play; ZAUDIO.play=function(id){ var x=p.apply(this,arguments); if(x)__played.push(id); return x; }; })()")
    g.key('ArrowRight', 120)
    g.page.wait_for_function("ZAHOOK.warmed&&Object.keys(ZAUDIO.buf).length>=10", timeout=60000); g.wait(1500)
    g.js("ZAUDIO.tick()"); g.page.wait_for_function("!!ZAUDIO.amb", timeout=60000); g.wait(2500)
    a = g.js("({id:ZAUDIO.amb&&ZAUDIO.amb.id, loop:ZAUDIO.amb&&ZAUDIO.amb.s.loop, dur:ZAUDIO.amb&&+ZAUDIO.amb.s.buffer.duration.toFixed(1), ctx:ZSFX.ctx&&ZSFX.ctx.state})")
    check('In the village the meadow ambience loops under everything (%s)' % a, a['id'] in ('am_meadow_day', 'am_meadow_night', 'am_lake') and a['loop'] and a['dur'] > 10, a)
    # the moments
    steps = [
      ('a sword swing', "(()=>{ var ws=game.scene.getScene('World'); ws.player.x=(CENTER_X+40)*TILE; ws.player.y=CENTER_Y*TILE; ws.player.cont.setPosition(ws.player.x,ws.player.y); ZHit.swing(); })()", ['sfx_sword_swing', 'sfx_axe_swing']),
      ('gold coming in', "game.scene.getScene('World').playerState.gold+=25", ['sfx_coin']),
      ('the hero hurt', "(()=>{ var ps=game.scene.getScene('World').playerState; ps.hp=Math.max(2,ps.hp-3); })()", ['sfx_hurt']),
      ('a notice', "showNotif('A test notice','#ffe9a8')", ['sfx_ui_note']),
      ('a refused action', "showNotif('Not enough gold','#ff4444')", ['sfx_ui_error']),
      ('a frost spell', "(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.equip.spell='frost_bolt_tome'; ps.mana=999; ws._spellCd=0; _heroCastSpell(ws); })()", ['sfx_frost']),
      ('a menu opening', "toggleModal('inventory')", ['sfx_ui_open']),
      ('a menu closing', "(()=>{ closeModal('inventory'); try{ _pauseSync(); }catch(e){} })()", ['sfx_ui_close']),
    ]
    for name, js, want in steps:
        g.wait(300); g.js("__played.length=0"); g.js(js)
        try: g.page.wait_for_function("__played.some(function(x){ return %s.indexOf(x)>=0; })" % json.dumps(want), timeout=20000)
        except Exception: pass
        p = g.js("__played.slice()")
        check('%s plays its sound (%s)' % (name.capitalize(), ', '.join(p) or 'nothing'), any(x in p for x in want), p)
    m = g.js("({hushed:typeof ZAUDIO._hush==='number', procOff:true})")
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
