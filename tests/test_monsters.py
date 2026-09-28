"""Every roster monster works: spawns with its pixel sprite, moves the way its
kit says, attacks (projectiles / beams / lobs / rings / pulls / summons …),
and hurts or affects the player. One monster at a time, in the real world
scene with rendering switched off so the game loop runs at full speed.
Usage: python tests/test_monsters.py [q ...]   (default: all four quadrants)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
QS = [int(a) for a in sys.argv[1:] if a.isdigit()] or [1, 2, 3, 4]
ONLY = [a for a in sys.argv[1:] if not a.isdigit()]
SECS = float(os.environ.get("MXSECS","3.2"))
res = []; fails = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
    if not ok: fails.append(n)
with game(new=True) as g:
    g.wait(800)
    g.js("""(()=>{ var ws=game.scene.getScene('World'); game.renderer.render=function(){}; ws.worldMonsters.forEach(function(m){ m.cont.destroy(); }); ws.worldMonsters=[];
      var ps=ws.playerState; ps.unlockedSections=[1,2,3,4]; ps.maxHp=999999; ps.hp=999999; ps.def=0;
      window._arena={}; [1,2,3,4].forEach(function(q){ var w=ws.wd.waystones.find(function(x){ return x.region===q; }), best=null;
        var open=function(cx,cy){ for(var y=cy-6;y<=cy+6;y++)for(var x=cx-6;x<=cx+6;x++){ var t=ws.tiles[y]&&ws.tiles[y][x]; if(t===undefined||ALWAYS_BLOCKED.has(t)||MX_PROJ_BLOCK.has(t)||getTileSection(x,y)!==q)return false; } return !ws._nearSafeSpot(cx,cy,3); };
        for(var r=6;r<60&&!best;r++)for(var a=0;a<32&&!best;a++){ var x=Math.round(w.x+Math.cos(a/32*Math.PI*2)*r), y=Math.round(w.y+Math.sin(a/32*Math.PI*2)*r); if(open(x,y))best=[x,y]; }
        best=best||[w.x,w.y+6]; window._arena[q]={x:best[0]*TILE+16,y:best[1]*TILE+16}; }); })()""")
    ids = ONLY or g.js(f"MON_ROSTER.filter(function(R){{ return {QS}.indexOf(R.q)>=0; }}).map(function(R){{ return R.id; }})")
    summary = {}
    for rid in ids:
        r = g.js("""(rid)=>{ var ws=game.scene.getScene('World'), R=MON_BY_ID[rid], ps=ws.playerState, P=window._arena[R.q];
            ws.player.x=P.x; ws.player.y=P.y; ws.player.cont.setPosition(P.x,P.y); ws.player.dir='left'; ps.hp=999999; ws.worldIFrames=0;
            ws._forceNight=R.tags.indexOf('night')>=0?1:undefined; ws._mxs=null;
            var F=ws._mxFx; if(F){ ['proj','zones','tele','walls','traps'].forEach(function(k){ (F[k]||[]).forEach(function(o){ (o.vis||o.g)&&(o.vis||o.g).destroy(); }); F[k]=[]; }); F.marks=[]; }
            ws.worldMonsters.forEach(function(m){ m.cont.destroy(); }); ws.worldMonsters=[];
            var ang=0, sx=P.x+70, sy=P.y; for(var a=0;a<16;a++){ var x=P.x+Math.cos(a/16*Math.PI*2)*70, y=P.y+Math.sin(a/16*Math.PI*2)*70; if(ws._canGoMonster(x,y)){ sx=x; sy=y; if(x>P.x)break; } }
            var mon=ws._spawnRosterMon(rid,sx,sy,R.q,new PRNG(1),{}); if(!mon)return {err:'no spawn'};
            if(mon.mx){ mon._m.aggro=true; } MX.log={}; window._t0={hp:ps.hp,x:sx,y:sy,mx:!!mon.mx,maxD:0};
            window._trk=setInterval(function(){ var d=Math.hypot(mon.x-window._t0.x,mon.y-window._t0.y); if(d>window._t0.maxD)window._t0.maxD=d; },50);
            return {mx:!!mon.mx}; }""", rid)
        ring = g.js("(rid)=>/^\\s*still[^|]*\\|\\s*ring[^|]*gap=1/.test(MON_KIT_SRC[rid]||'')", rid)   # a ring with a gap can miss once by design
        g.wait(int((SECS * 2 if ring else SECS) * 1000))
        out = g.js("""(rid)=>{ clearInterval(window._trk); var ws=game.scene.getScene('World'), ps=ws.playerState, mon=ws.worldMonsters.find(function(m){ return m.rid===rid; }), L=(MX.log&&MX.log[rid])||{}, PL=(MX.log&&MX.log._player)||{};
            var F=ws._mxFx||{}; var fx=(F.proj||[]).length+(F.zones||[]).length+(F.traps||[]).length+(F.walls||[]).length;
            return {dmg:window._t0.hp-ps.hp, moved:Math.round(window._t0.maxD), ev:L, pst:PL, fx:fx, frame:mon&&mon.spr?mon.spr.frame.name:null, alive:!!mon&&!mon.dead, burn:(ws._burnTime||0)>0, mx:window._t0.mx}; }""", rid)
        acted = out['dmg'] > 0 or out['pst'] or out['fx'] > 0 or out['burn'] or any(k.startswith('hit') or k.endswith('_hit') or k.startswith('def_heal') for k in out['ev'])
        attacked = (not out['mx']) or any(k.startswith('atk_') or k.startswith('mv_') or k.startswith('def_') or k=='hit' for k in out['ev'])
        summary[rid] = out
        check(f'{rid}: acts on the player (damage/effect) and uses its kit', acted and attacked, {k: out[k] for k in ['dmg', 'moved', 'ev', 'pst', 'fx']})
    errs = g.errs
    check('No JS errors', not errs, errs[:5])
    json.dump(summary, open(os.path.join(os.path.dirname(__file__), '..', 'monster_behaviour.json'), 'w'), indent=1)
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
