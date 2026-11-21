#!/usr/bin/env python3
"""Round 127: REAL GAME SCREENSHOTS for the Lab's world and season mock-ups (Kris: "the current images for 'today' and 'proposed' do not
have the sprites in them and don't look like the game! … figure out what went wrong the first time on this, and fix it").

What went wrong in round 124: the screenshots were taken with the test harness's default game(), which switches the painted sprites and
the painted scenery OFF (ZAtlas.off / ZScn.off — the stand-in mode the test suites run in), and the scenery index was the damaged one from
round 120. So "today" showed stand-in trees and a pixel-era tower. This script always runs the game PAINTED (game(painted=True)), checks
that the painted pages really loaded before it shoots (it stops if not), and hides only the HUD.

For each place it saves layers, so a mock-up can change one layer and leave the others exactly as painted:
    <place>_F.png   the game as you see it (HUD hidden)
    <place>_P.png   without the actors (hero, villagers, monsters, animals)      → actors = F − P
    <place>_G.png   the ground only (no props, no actors, no effects)          → props  = P − G
    <place>_N.png   the same place at night (the game's own night)
and a few in-game prototypes (shadows from each painted sprite's own shape, painted moss/clover/pebble pieces, painted water pieces).
    python tools/world/world_shots.py OUTDIR [place ...]        (after node build.mjs; the cloud copy must have every painted page)
"""
import sys, os, json, time
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tests'))
from harness import game

OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/wshots'
ONLY = sys.argv[2:]
os.makedirs(OUT, exist_ok=True)
WS = "game.scene.getScene('World')"
W, H = 1280, 720
# place: (how to find it, unlocked realms → its season, what to put in front)
PLACES = {
    'village': ("ws.wd.spawnX-260, ws.wd.spawnY-300", [1], None),
    'grass':   ("wst('ws_firefly_river',0,4)", [1], None),
    'field':   ("wst('ws_giant_bones',0,3)", [1], 'mons'),
    'wet':     ("wst('ws_lantern_lilies',0,3)", [1, 2], None),
    'high':    ("wst('ws_dwarven_stairs',0,3)", [1, 2, 3], None),
    'ash':     ("wst('ws_emberflower_fields',0,3)", [1, 2, 3, 4], None),
    'site':    ("site('s1_tower',0,7)", [1], None),
    'water':   ("gate('gate_silverrun_1',0,-3)", [1], None),
}
HIDE_CSS = "body > *:not(#app){visibility:hidden !important} #app > *:not(#phaser-root):not(#world-labels):not(#world-fog-canvas):not(#ambient-layer){visibility:hidden !important} .wlbl.site{visibility:hidden !important}"
HELP = """window.__W={ ws:function(){ return %s; },
  wst:function(id,dx,dy){ var w=this.ws().wd.waystones.find(function(x){ return x.id===id; }); return [(w.x+dx)*TILE+16,(w.y+dy)*TILE+16]; },
  site:function(id,dx,dy){ var s=this.ws().wd.sites.find(function(x){ return x.id===id; }); return [(s.tx+dx)*TILE+16,(s.ty+dy)*TILE+16]; },
  gate:function(id,dx,dy){ var g=this.ws().wd.gates.find(function(x){ return x.id===id; }); return [(g.x+dx)*TILE+16,(g.y+dy)*TILE+16]; },
  actors:function(){ var ws=this.ws(), L=[ws.player&&ws.player.cont]; (ws.worldMonsters||[]).forEach(function(m){ if(m&&m.cont)L.push(m.cont); });
    (ws._villageNPCs||[]).forEach(function(n){ if(n&&n.cont)L.push(n.cont); else if(n&&n.spr)L.push(n.spr); else if(n&&n.setVisible)L.push(n); });
    Object.keys(ws).forEach(function(k){ if(/^_fam(Visuals)?$/.test(k)&&Array.isArray(ws[k]))ws[k].forEach(function(v){ if(v&&v.setVisible)L.push(v); else if(v&&v.cont)L.push(v.cont); }); });
    ws.children.list.forEach(function(o){ var k=o.texture&&o.texture.key||''; if(/^(zan|zcrit)/.test(k))L.push(o); });
    return L.filter(Boolean); },
  ground:function(o){ var k=o.texture&&o.texture.key||''; return o.type==='Image'&&/^w[rc]/.test(k)&&o.depth<0; },
  vis:{}, hideActors:function(on){ var self=this; this.actors().forEach(function(o){ if(on){ if(o._wsv===undefined)o._wsv=o.visible; o.setVisible(false); } else if(o._wsv!==undefined){ o.setVisible(o._wsv); o._wsv=undefined; } }); },
  groundOnly:function(on){ var self=this, ws=this.ws(); ws.children.list.forEach(function(o){ if(self.ground(o))return; if(on){ if(o._wsg===undefined)o._wsg=o.visible; if(o.setVisible)o.setVisible(false); } else if(o._wsg!==undefined){ o.setVisible(o._wsg); o._wsg=undefined; } }); }
};""" % WS


def settle(g, n=40):
    for i in range(n):
        if g.js("(()=>{ var W=%s._wr; return !!W&&W.jobs.size===0&&!(W.ready||[]).length; })()" % WS):
            return True
        g.wait(500)
    return False


def shoot(g, name):
    g.wait(250); t = time.time(); g.page.screenshot(path=os.path.join(OUT, name + '.png'), timeout=60000); print('    shot', name, round(time.time() - t, 1), flush=True)


with game(painted=True, w=W, h=H, lead=True) as g:
    g.wait(3500)
    g.js("(()=>{ var s=document.createElement('style'); s.textContent=%s; document.head.appendChild(s); return 1; })()" % json.dumps(HIDE_CSS)); print('css', flush=True)
    g.js(HELP + ";0")
    st = g.js("(()=>({atlas:typeof ZAtlas!=='undefined'&&!ZAtlas.off, scn:typeof ZScn!=='undefined'&&!ZScn.off, pages:Object.keys(ZScn.META.pages||{}).length, items:Object.keys(ZScn.META.items||{}).length}))()")
    print('painted:', st, flush=True)
    if not (st['atlas'] and st['scn'] and st['pages'] >= 100 and st['items'] >= 2700):
        sys.exit('STOP: the painted art is not all here (the shots would show stand-ins) — %s' % st)
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.maxHp=ps.hp=99999; ps.godMode=true; ws._forceNight=0; if(typeof ZDLG!=='undefined'&&ZDLG.cur)ZDLG.cur.close(); })()" % WS)
    for place, (where, realms, extra) in PLACES.items():
        if ONLY and place not in ONLY: continue
        g.js("""(()=>{ var ws=%s, ps=ws.playerState, W=window.__W, wst=W.wst.bind(W), site=W.site.bind(W), gate=W.gate.bind(W); ws.scene.resume(); ps.unlockedSections=%s; ps.spiritsHome=0; ZSEASON.tick();
                var p=[%s]; if(Array.isArray(p[0]))p=p[0]; ws.player.x=p[0]; ws.player.y=p[1]; ws.player.cont.setPosition(p[0],p[1]); ws._forceNight=0; })()""" % (WS, json.dumps(realms), where))
        print('  at', place, flush=True); g.wait(1500); print('  settled', settle(g), flush=True); g.wait(1500)
        if extra == 'mons':      # a few monsters in front, aggro off, for the battle shots
            g.js("""(()=>{ var ws=%s, A=MX.A(ws), P=A.p(); ['meadow_goblin','barrow_skeleton','clover_slime'].forEach(function(id,i){ var m=A.spawn(id,P.x+110+i*46,P.y-30+i*40,{q:1}); if(m&&m._m)m._m.aggro=false; }); })()""" % WS)
            g.wait(1500)
        print('  settled2', settle(g), flush=True); g.wait(800)
        g.js("(()=>{ %s.scene.pause(); return 0; })()" % WS); g.wait(300); print('  paused', flush=True)
        shoot(g, place + '_F')
        g.js("window.__W.hideActors(true),0"); shoot(g, place + '_P'); g.js("window.__W.hideActors(false),0")
        g.js("window.__W.groundOnly(true),0"); shoot(g, place + '_G'); g.js("window.__W.groundOnly(false),0")
        # night: the game's own night (its dark layer is drawn in the scene's update)
        g.js("(()=>{ var ws=%s; ws._forceNight=1; ws.scene.resume(); })()" % WS); g.wait(900)
        g.js("(()=>{ %s.scene.pause(); return 0; })()" % WS); shoot(g, place + '_N')
        g.js("(()=>{ var ws=%s; ws._forceNight=0; ws.scene.resume(); })()" % WS); g.wait(600)
        print('✓', place, flush=True)
    # the seasons: the village and the Grasslands in all five (Freya's spring = the spirits home)
    if not ONLY or 'seasons' in ONLY:
        for s, realms, home in (('sp', [1], 0), ('su', [1, 2], 0), ('au', [1, 2, 3], 0), ('wi', [1, 2, 3, 4], 0), ('bl', [1, 2, 3, 4], 1)):
            for place, where in (('village', "ws.wd.spawnX-260, ws.wd.spawnY-300"), ('grass', "wst('ws_firefly_river',0,4)")):
                g.js("""(()=>{ var ws=%s, ps=ws.playerState, W=window.__W, wst=W.wst.bind(W); ws.scene.resume(); ps.unlockedSections=%s; ps.spiritsHome=%d; ZSEASON.tick();
                        var p=[%s]; if(Array.isArray(p[0]))p=p[0]; ws.player.x=p[0]; ws.player.y=p[1]; ws.player.cont.setPosition(p[0],p[1]); })()""" % (WS, json.dumps(realms), home, where))
                g.wait(2500); settle(g); g.wait(1800)
                g.js("(()=>{ %s.scene.pause(); return 0; })()" % WS); shoot(g, 'season_%s_%s' % (s, place)); g.js("(()=>{ %s.scene.resume(); return 0; })()" % WS)
                print('✓ season', s, place, g.js("ZSEASON.cur"), flush=True)
print('done →', OUT)
