"""Round 129: the boss plan in the game — Kris's ranked lists (and the suggested ones he accepted) for 97 phases, cut by difficulty;
today's kit attacks, bars, events and allies he left out make way; 69 kinds of new element, each a pattern that runs, lands on a careless
hero, stays in the arena and cleans up; weak points, shields and wardens change the damage the boss takes; only magic blinks.
python tests/test_round129.py   (after python tools/world/boss_plan2_game.py and node build.mjs)"""
import sys, os, json, re
sys.path.insert(0, os.path.dirname(__file__))
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:700]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = json.loads(open(os.path.join(R, 'src', 'js', '09bx-0-boss-plan2-data.js'), encoding='utf-8').read().split('var BP2D=', 1)[1].rstrip().rstrip(';'))
L = json.loads(open(os.path.join(R, 'lab', 'src', 'js', '79y2-0-bossplan2-data.js'), encoding='utf-8').read().split('var LBPLAN2=', 1)[1].rstrip().rstrip(';'))
PK = json.load(open(os.path.join(R, 'tools', 'world', 'boss_picks129.json'), encoding='utf-8'))
S = D['slots']
check('Every phase of every boss has its plan in the game (%d)' % len(S), len(S) == sum(b['n'] for b in L['bosses']) == 97)
check('Difficulty follows the scheme Kris chose: Hearthside ½, Wayfarer 70 %%, Shieldbearer 85 %%, Ragnarök all (%s)' % D['f'], D['scheme'] == 'share' and D['f'] == [0.5, 0.7, 0.85, 1.0] and D['min'] == 2)
# Kris's own order is kept, element for element
bad = []
for b in L['bosses']:
    for i, P in enumerate(b['phases']):
        k = '%s_p%d' % (b['id'], i + 1)
        if k not in PK['phases']: continue
        E = S['musp_g%d' % (i + 1) if b['id'] == 'musp' else P['slot']]
        want = [('n', next(p for p in P['new'] if p['id'] == x)['t']) if x.startswith('n') else ('t', next(t for t in P['today'] if t['id'] == x)['k']) for x in PK['phases'][k]]
        want = [w for w in want if w[1] not in ('move', 'hp')]
        got = [('n', e[1]) if e[0] == 'n' else ('t', {'s': 'sig', 'd': 'stand', 'b': 'bar', 'e': 'event', 'k': 'kit'}[e[0]]) for e in E['r']]
        if want != got: bad.append((k, want, got))
check('The %d phases Kris ranked keep his elements in his order' % len(PK['phases']), len(PK['phases']) == 39 and not bad, bad[:2])
kinds = sorted({e[1] for E in S.values() for e in E['r'] if e[0] == 'n'})
src = open(os.path.join(R, 'src', 'js', '09bx-boss-plan2.js'), encoding='utf-8').read()
missing = [k for k in kinds if not re.search(r'\n  %s:function' % k, src) and not re.search(r'MOD:\{[^}]*\b%s:1' % k, src)]
check('Every one of the %d new kinds has its pattern in the game (weak points and the beat change the rules for the others)' % len(kinds), len(kinds) == 69 and not missing, missing)
check('Nothing needs a ceiling, ropes from above or a world past the walls', not ({'climb', 'ropes'} & set(kinds)))
check('Today\'s kit attacks Kris left out make way (%d), and allies where he left them out' % sum(len(E.get('kd', [])) for E in S.values()),
      sum(len(E.get('kd', [])) for E in S.values()) > 150 and any(E.get('ad') for E in S.values()))
check('Only bosses with magic blink; the others leap, stomp, charge, dive, burrow, drift or swoop',
      all(E['mv'] != 'blink' for E in S.values() if E['b'] in ('goblin_king', 'rock_dragon', 'iron_sentinel', 'lava_titan', 'q4_b')))

# ── sound previews: the take lists and the sound files belong together (round 129) ──
import subprocess
SJ = json.load(open(os.path.join(R, 'lab', 'preview', 'audio', 's84.json')))['items']
off = []
for k in sorted({k for v in SJ.values() for k in v}):
    end = max(v[k][0] + v[k][1] for v in SJ.values() if k in v)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(R, 'lab', 'preview', 'audio', 's84_%s.mp3' % k)], capture_output=True, text=True).stdout or 0)
    if end > d + 0.3 or d - end > 3: off.append((k, round(end, 1), round(d, 1)))
check('Sound previews: every take list fits its sound file (the Lab played other sounds when they did not)', not off, off)
check('Sound effects Lab refuses a file that does not match its list', "throw new Error('stale')" in open(os.path.join(R, 'lab', 'src', 'js', '79m3-lab-sfx103.js'), encoding='utf-8').read())

from harness import game
LAUNCH = """(([typ,sec,ph,dif])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true; ps.difficulty=dif;
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec); var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon',bossPhase:ph||1});})"""
READY = "(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"
def until(g, expr, ms=45000):
    import time; t = time.time()
    while (time.time() - t) * 1000 < ms:
        if g.js(expr): return True
        g.wait(300)
    return False
RUN = """(([name,maxT])=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), ps=S.worldScene.playerState;
  ps.godMode=false; ps.maxHp=99999; ps.hp=99999; S.playerIFrames=0; S._introT=0; if(!m._bp)BossPat.init(S,m); var B=m._bp; B.t=999; B.busy=0; B.p2w=0; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun;
  var put=function(x,y){ S.px=x; S.py=y; S.pCont.setPosition(x,y); }; var p=BARENA.near(S,m.x+70,m.y+20); put(p[0],p[1]);
  var n0=S.children.list.length, act=BossPat.run(S,m,name,B); if(!act)return {err:'no act'}; var t=0, hits=0, out=0;
  while(t<maxT&&S._bpAct.length){ S.playerIFrames=0; var h=ps.hp; BossPat.tick(S,0.05); MX.tickScene(S,0.05); if(ps.hp<h)hits++; t+=0.05; if(!BARENA.in(S,S.px,S.py))out++; }
  var left=S._bpAct.length; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun;
  var F=MX.fx(MX.A(S)); F.proj.forEach(o=>o.vis&&o.vis.destroy()); F.proj.length=0; F.zones.forEach(z=>z.vis&&z.vis.scene&&z.vis.destroy()); F.zones.length=0;
  (S.monsters||[]).forEach(k=>{ if(k._bp2kid&&!k.dead){ try{ MX.A(S).kill(k); }catch(e){} } }); m._hold=0; m.x=m._okX||m.x; m.y=m._okY||m.y; if(m.cont)m.cont.setAlpha(1);
  for(var k2=0;k2<8;k2++)MX.tickScene(S,0.5); ps.godMode=true; ps.hp=ps.maxHp; window._n0=n0; return {hits:hits,t:Math.round(t*10)/10,left:left,busy:B.busy}; })"""
STRAY = "(()=>{ var S=game.scene.getScene('Dungeon'); return S.children.list.slice(window._n0).filter(o=>o.type==='Graphics'&&o.commandBuffer&&o.commandBuffer.length).length; })()"
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500); g.js(LAUNCH + '(["dungeon",2,2,1])'); until(g, READY); g.wait(1500)
    a = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly); S._introT=0; if(!m._bp)BossPat.init(S,m); var B=m._bp, E=B.p2;
      return {slot:BossPat.slotOf(m), plan:!!E, list:B.list, keep:B.p2keep&&B.p2keep.length, n:E&&E.r.length, kit:m.kit.atk.map(k=>k.name), kd:E&&E.kd, bars:(m.bars||[]).map(b=>b.k), allies:S.monsters.filter(x=>x.bossAlly).length,
        lv:[0,1,2,3].map(function(l){ S.worldScene.playerState.difficulty=l; return BP2.keep(E).length; }) }; })()""")
    g.js("game.scene.getScene('Dungeon').worldScene.playerState.difficulty=1")
    check('A boss form wakes with its plan: its attacks are the kept list, cut for Wayfarer (%s)' % a, a['plan'] and a['keep'] == max(2, -(-a['n'] * 7 // 10)) and any(x.startswith('p2_') for x in a['list']))
    check('Harder levels play more of the list (Hearthside %d · Wayfarer %d · Shieldbearer %d · Ragnarök %d of %d)' % (tuple(a['lv']) + (a['n'],)), a['lv'] == sorted(a['lv']) and a['lv'][3] == a['n'] and a['lv'][0] < a['lv'][3])
    check('The kit attacks Kris left out are gone from the boss (%s → %s)' % (a['kd'], a['kit']), not a['kd'] or all(t.split(' ')[0] not in a['kit'] or a['kit'].count(t.split(' ')[0]) < 2 for t in a['kd']))
    bad, hit, stray = [], {}, []
    for k in kinds:
        r = g.js(RUN + '(["p2_%s:water",%d])' % (k, 32 if k in ('wardens', 'event', 'use', 'stance') else 14))
        if r.get('err') == 'no act':
            hit[k] = 'n/a'; continue
        hit[k] = r.get('hits')
        if r.get('err') or r['busy'] != 0 or (r['left'] != 0 and k not in ('wardens',)): bad.append((k, r))
        g.wait(1300); r['stray'] = g.js(STRAY)
        if r['stray'] > 2: stray.append((k, r['stray']))
    check('All %d new kinds run to the end and free the boss again' % len(kinds), not bad, bad[:4])
    check('They clean up after themselves (no stray drawings)', not stray, stray[:6])
    landed = [k for k, v in hit.items() if isinstance(v, int) and v > 0]
    check('Most land on a hero who stands still next to the boss (%d of %d)' % (len(landed), len(kinds)), len(landed) >= 40, sorted(k for k, v in hit.items() if not (isinstance(v, int) and v > 0)))
    dm = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), B=m._bp; var hit=function(){ var h=m._hp; MX._src='melee'; m.hp=m._hp-100; MX._src=null; var d=h-m._hp; m._hp=h; return Math.round(d); };
      var bars=m.bars; m.bars=null; B.p2w=0; m._p2guard=m._p2st=m._p2ward=null; m._p2mist=false; var base=hit(); B.p2w=2; var weak=hit(); B.p2w=0; m._p2ward=function(d){ return d*0.25; }; var ward=hit(); m._p2ward=null; m.bars=bars; return [base,weak,ward]; })()""")
    check('A weak point makes it take more; its wardens\' shield makes it take less (%s)' % dm, dm[1] > dm[0] > dm[2] > 0)
    mv = g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly); return [m._p2plan&&m._p2plan.mv, BP2.travel(MX.A(S),m)]; })()""")
    check('It travels its own way (%s)' % mv, mv[0] and (mv[1] or mv[0] == 'blink'))
    errs = [e for e in g.errs if 'bp2' in e.lower() or '09bx' in e]
    check('No errors from the boss plan', not errs, errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
