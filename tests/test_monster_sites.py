"""Dungeons and towers spawn the new roster by the 80/15/5 rule (dungeon:
melee + ranged · tower: magic), with pixel sprites, and those monsters fight
(projectiles / effects reach the player). Mainland pods follow the rule too."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
LAUNCH = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id);
  var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
  if(game.scene.isActive('Dungeon')){game.scene.getScene('Dungeon').scene.restart(data);return;}
  if(game.scene.isActive('World'))ws.scene.sleep('World'); ws.scene.launch('Dungeon',data);})"""
with game(new=True) as g:
    g.wait(800)
    w = g.js("""(()=>{ var ws=game.scene.getScene('World'), c={seg:{},q:{},n:0}; ws.worldMonsters.forEach(function(m){ var R=MON_BY_ID[m.rid]; if(!R)return; c.n++; c.seg[R.seg]=(c.seg[R.seg]||0)+1; c.q[m.section===R.q?'home':'visitor']=(c.q[m.section===R.q?'home':'visitor']||0)+1; }); return c; })()""")
    main = w['seg'].get('main', 0) / w['n']; vis = w['q'].get('visitor', 0) / w['n']
    check('Mainland: mostly mainland monsters of the region, a few from other segments and quadrants', 0.75 <= main <= 0.95 and 0.01 <= vis <= 0.1, w)
    ids = g.js("game.scene.getScene('World').wd.sites.filter(s=>(s.type==='tower'||s.type==='dungeon')).map(s=>[s.id,s.type,s.sec||getTileSection(s.tx,s.ty)])")
    seen = {'dungeon': {}, 'tower': {}}
    for sid, typ, sec in [x for x in ids if x[2] in (2, 3)][:4]:
        g.js(LAUNCH + "(%s)" % json.dumps([sid, 0])); g.wait(2500)
        r = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'); if(!d||!d.monsters)return null; var out={segs:{},mx:0,spr:0,n:0,rq:{}}; d.monsters.forEach(function(m){ if(m.isBoss)return; out.n++; var R=MON_BY_ID[m.rid]; if(R){ out.segs[R.seg+(R.seg==='dun'?'/'+R.role:'')]=(out.segs[R.seg+(R.seg==='dun'?'/'+R.role:'')]||0)+1; out.rq[R.q]=(out.rq[R.q]||0)+1; } if(m.mx)out.mx++; if(m.body&&m.body.texture&&/^mx_/.test(m.body.texture.key))out.spr++; }); return out; })()""")
        if not r: continue
        for k, v in r['segs'].items(): seen[typ][k] = seen[typ].get(k, 0) + v
        check(f'{typ} {sid}: roster monsters with pixel sprites', r['n'] > 0 and r['spr'] == r['n'], r)
        # let one fight: move the player next to the nearest non-boss monster and watch
        g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), ps=d.worldScene.playerState; ps.maxHp=99999; ps.hp=99999; var m=d.monsters.filter(x=>!x.isBoss&&!x.dead).sort(function(a,b){ return Math.hypot(a.x-d.px,a.y-d.py)-Math.hypot(b.x-d.px,b.y-d.py); })[0]; if(!m)return; window._dm=m; d.px=m.x-50; d.py=m.y; if(!d._canGoD(d.px,d.py)){ d.px=m.x; d.py=m.y+40; } d.pCont.setPosition(d.px,d.py); window._dhp=ps.hp; MX.log={}; })()""")
        g.wait(4000)
        f = g.js("(()=>{ var d=game.scene.getScene('Dungeon'); return {dmg:window._dhp-d.worldScene.playerState.hp, rid:window._dm&&window._dm.rid, ev:window._dm&&MX.log[window._dm.rid]}; })()")
        check(f'{typ} {sid}: its monsters attack the player', f['dmg'] > 0 or (f['ev'] and any(k.startswith('atk_') for k in f['ev'])), f)
    g.js("(()=>{ var d=game.scene.getScene('Dungeon'); if(d)d.scene.stop(); var ws=game.scene.getScene('World'); ws.scene.wake('World'); })()")
    check('Dungeons are melee + ranged, towers are magic (mostly)', sum(v for k, v in seen['dungeon'].items() if k.startswith('dun')) >= sum(seen['dungeon'].values()) * 0.6 and seen['tower'].get('tow', 0) >= sum(seen['tower'].values()) * 0.6, seen)
    check('No JS errors', not g.errs, g.errs[:4])
print('%d/%d' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
