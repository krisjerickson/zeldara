#!/usr/bin/env python3
"""Round 131: shots at the four passages between the realms (Kris on the landmarks: "these need to be the passages from one quadrant to
another") — the middle gate of each border, its realms open: <gate>_F / _P / _G (as world_shots.py).
    python tools/world/world_shots4.py OUTDIR"""
import sys, os, json
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'world_shots.py'), encoding='utf-8').read()
head = src.split('\nwith game(')[0]
OUTDIR = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots4'
sys.argv = [sys.argv[0], OUTDIR]
exec(compile(head, 'world_shots.py', 'exec'))
GATES = {'gate_silverrun_2': [1, 2], 'gate_scarp_2': [1, 2, 3], 'gate_chasm_2': [1, 2, 3, 4], 'gate_ember_2': [1, 2, 3, 4]}
with game(painted=True, w=W, h=H, lead=True) as g:
    g.wait(3500)
    g.js("(()=>{ var s=document.createElement('style'); s.textContent=%s; document.head.appendChild(s); return 1; })()" % json.dumps(HIDE_CSS))
    g.js(HELP + ";0")
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.maxHp=ps.hp=99999; ps.godMode=true; ws._forceNight=0; if(typeof ZDLG!=='undefined'&&ZDLG.cur)ZDLG.cur.close(); })()" % WS)
    for gid, realms in GATES.items():
        g.js("""(()=>{ var ws=%s, ps=ws.playerState, W=window.__W; ws.scene.resume(); ps.unlockedSections=%s; ps.spiritsHome=0; ZSEASON.tick();
                var p=W.gate('%s',0,0); ws.player.x=p[0]; ws.player.y=p[1]+90; ws.player.cont.setPosition(p[0],p[1]+90); ws._forceNight=0; })()""" % (WS, json.dumps(realms), gid))
        g.wait(1500); settle(g); g.wait(1500); settle(g); g.wait(800)
        g.js("(()=>{ %s.scene.pause(); return 0; })()" % WS); g.wait(300)
        cam = g.js("(()=>{ var c=%s.cameras.main, p=window.__W.gate('%s',0,0); return [Math.round(p[0]-c.worldView.x), Math.round(p[1]-c.worldView.y), c.zoom]; })()" % (WS, gid))
        json.dump(cam, open(os.path.join(OUT, gid + '_cam.json'), 'w'))
        shoot(g, gid + '_F')
        g.js("window.__W.hideActors(true),0"); shoot(g, gid + '_P'); g.js("window.__W.hideActors(false),0")
        g.js("window.__W.groundOnly(true),0"); shoot(g, gid + '_G'); g.js("window.__W.groundOnly(false),0")
        g.js("(()=>{ %s.scene.resume(); return 0; })()" % WS); print('✓', gid, cam, flush=True)
