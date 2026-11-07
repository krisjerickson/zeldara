"""Round 91 — the painted boss attacks in the fights (09bc + 09bb), and the sandbox teaches the roll. Run: python tests/test_round91.py [shots]"""
import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
SHOTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tests', '_shots91') if 'shots' in sys.argv else None
if SHOTS: os.makedirs(SHOTS, exist_ok=True)
LAUNCH = """(([typ,sec,ph])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true;
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec); var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon',bossPhase:ph||1});})"""
READY = "(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"
def until(g, expr, ms=60000):
    t = time.time()
    while (time.time() - t) * 1000 < ms:
        if g.js(expr): return True
        g.wait(300)
    return False
# start a pattern and step it to a fraction of its length; count the painted pieces showing
START = """(([name,frac])=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), ps=S.worldScene.playerState; ps.godMode=true; S._introT=0;
  if(!m._bp)BossPat.init(S,m); var B=m._bp; B.t=999; B.busy=0; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun;
  S.px=m.x+150; S.py=m.y+40; S.pCont.setPosition(S.px,S.py); if(!BossPat._tick0){ BossPat._tick0=BossPat.tick; BossPat.tick=function(){}; } var act=BossPat.run(S,m,name,B); if(!act)return {err:'no act'};
  var T=act.dur*frac, t=0; while(t<T&&S._bpAct.length){ BossPat._tick0(S,0.05); t+=0.05; }
  var vis=S.children.list.filter(o=>o.texture&&/^zbfx_/.test(o.texture.key)&&o.visible&&o.alpha>0.02);
  return {n:vis.length, keys:[...new Set(vis.map(o=>o.texture.key.replace(/^zbfx_bfx_/,'')))].slice(0,6), fam:BossPat.famFor({S:S,m:m,B:B,theme:(name.split(':')[1]||''),col:B.col})}; })"""
FINISH = """(()=>{ var S=game.scene.getScene('Dungeon'); if(BossPat._tick0){ BossPat.tick=BossPat._tick0; BossPat._tick0=null; } var k=0; while(S._bpAct.length&&k<600){ BossPat.tick(S,0.05); k++; } var left=S._bpAct.length; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun;
  return {left:left, stray:S.children.list.filter(o=>o.texture&&/^zbfx_/.test(o.texture.key)&&o.active&&!/patch|impact/.test(o.texture.key)).length}; })()"""
with game(painted=True, w=1280, h=720) as g:
    g.wait(4000)
    g.js(LAUNCH + '(["dungeon",3,1])'); ok = until(g, READY); g.wait(1500)
    check('A boss dungeon opens with painted scenery on', ok and g.js("ZScn.has('bfx_stone_mark')&&ZScn.has('bfx_surt_ring')"))
    fams = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead), B=m._bp||(BossPat.init(S,m),m._bp), f=function(th,def){ return BossPat.famFor({S:S,m:def?{def:def}:m,B:def?{}:B,theme:th,col:'#ff7030'}); };
      return {own:f(''), fire:f('fire'), frost:f('frost'), surt:f('',{id:'boss_volcano_lord',name:'Surtharn, the Volcano Lord'}), sol:f('',{id:'grim_1',name:'Solmyrk, the Black Sun'})}; })()""")
    check('The family: theme first, the boss\'s own otherwise; Surtharn and Solmyrk their own (%s)' % fams, fams == {'own': 'stone', 'fire': 'ember', 'frost': 'frost', 'surt': 'surt', 'sol': 'sol'}, fams)
    seen = {}; bad = []
    for name, frac in [('rain:rock', 0.3), ('rain:fire', 0.45), ('wall:fire', 0.7), ('burst', 0.8), ('spin', 0.7), ('floor:lava', 0.6), ('burrow', 0.85), ('quake', 0.5), ('combo', 0.5), ('strafe:fire', 0.6), ('eclipse', 0.5), ('mirror', 0.9)]:
        r = g.js(START + '(["%s",%s])' % (name, frac)); seen[name] = r
        if SHOTS: g.shot(os.path.join(SHOTS, name.replace(':', '_') + '.png'))
        f = g.js(FINISH)
        if f['left'] or f['stray']: bad.append((name, f))
    none = [k for k, v in seen.items() if not v.get('n')]
    check('Every area attack shows painted pieces, not flat shapes (%s)' % {k: v.get('n') for k, v in seen.items()}, not none, none)
    check('Their pieces are the right ones (%s)' % {k: v.get('keys') for k, v in seen.items()}, any(k.startswith('ember_') for k in seen['rain:fire']['keys']) and any('stone_mark' in k for k in seen['rain:rock']['keys']) and any('band' in k for k in seen['wall:fire']['keys']) and any('beam' in k for k in seen['burst']['keys']) and any('patch' in k for k in seen['floor:lava']['keys']) and any('ring' in k for k in seen['quake']['keys']), seen)
    check('Every attack ends and leaves no painted pieces behind', not bad, bad)
    g.js("(()=>{ var S=game.scene.getScene('Dungeon'); S.scene.stop(); var ws=game.scene.getScene('World'); ws.scene.wake('World'); })()"); g.wait(800)
    r = g.js("(()=>{ var ps=game.scene.getScene('World').playerState; ps.canRoll=false; ps.rollQ=1; var a=ZROLL.can(ps); sbLearnRoll(); var b=ZROLL.can(ps)&&ps.rollQ===2; ps.canRoll=false; ps.rollQ=0; sbAllSkills(); var c=ZROLL.can(ps); ps.canRoll=false; sbCompleteQuests(); var d=ZROLL.can(ps)&&ALL_MAIN_QUESTS.every(q=>ps.completedQuests.includes(q)); sbAllSpells(); var e=ps.inventory.filter(k=>ITEMS[k]&&ITEMS[k].slot==='spell').length; var f=ps.inventory.indexOf('sp_roll')<0; return [a,b,c,d,e,f]; })()")
    check('Sandbox: "Learn the Roll" teaches it; All Special Skills and Complete All Quests do too; Give All Spells works (%s)' % r, r[:4] == [False, True, True, True] and r[4] >= 10 and r[5], r)
    check('No script errors', not g.errs, g.errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
