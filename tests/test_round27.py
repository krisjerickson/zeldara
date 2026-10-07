"""Rounds 27–28 — familiars travel as a pod behind the hero at half size; none overlaps the hero (they may brush each other).
Run: python tests/test_round27.py   (ZELDARA_ENGINE=4 for Phaser 4)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, ENGINE
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:420] if info != '' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False
# The walk is stepped by hand (hero moved 3 px per 1/60 s tick) so the result does not depend on the frame rate of the test browser.
WALK = """(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, S={n:0,worst:0,pair:'',ahead:0,steady:0,max:0,count:0,stack:9,wide:1e9,h:0}, x0=ws.player.x, y0=ws.player.y;
  var legs=%s, x=x0, y=y0;
  legs.forEach(function(L){ for(var t=0;t<L[2];t++){ x+=L[0]*3; y+=L[1]*3; _heroSetPos(ws,x,y); _heroFamiliarsTick(ws,1/60);
    var c=_heroCtx(ws), H=_famHeroBox(ws,c,ps), V=ws._famVisuals||{}, B=[{id:'hero',x:H.x,y:H.y,hw:H.hw,hh:H.hh}];
    _heroActiveFamiliars(ps).forEach(function(f){ var v=V[f]; if(v&&v._px!==undefined)B.push({id:f,x:v._px,y:v._py,hw:v.displayWidth*0.46,hh:v.displayHeight*0.5}); });
    S.n++; S.count=B.length-1;
    for(var j=1;j<B.length;j++){ var a=B[0], b=B[j], o=Math.min((a.hw+b.hw)*0.84-Math.abs(a.x-b.x),(a.hh+b.hh)*0.84-Math.abs(a.y-b.y)); if(o>S.worst){ S.worst=o; S.pair=a.id+'/'+b.id+' leg '+legs.indexOf(L)+' t '+t; } }
    for(var i=1;i<B.length;i++)for(var j=i+1;j<B.length;j++){ var cd=Math.hypot(B[i].x-B[j].x,B[i].y-B[j].y)/(B[i].hw+B[j].hw); if(cd<S.stack)S.stack=cd; }
    S.h=Math.round(B[1]?B[1].hh*2:0);
    if(t>=150&&(L[0]||L[1])){ S.steady++; var lo=1e9, hi=-1e9; for(var k=1;k<B.length;k++){ if((B[k].x-H.x)*L[0]+(B[k].y-H.y)*L[1]>0)S.ahead++; S.max=Math.max(S.max,Math.hypot(B[k].x-H.x,B[k].y-H.y)); var w=-(B[k].x-H.x)*L[1]+(B[k].y-H.y)*L[0]; lo=Math.min(lo,w); hi=Math.max(hi,w); } S.wide=Math.min(S.wide,hi-lo); } } });
  _heroSetPos(ws,x0,y0); return S; })()"""
LEGS = [[1, 0, 200], [0, 1, 200], [-1, 0, 200], [1, 0, 200], [0, -1, 200], [0, 1, 200], [0.7, 0.7, 200], [-0.7, -0.7, 200], [0, 0, 60], [-1, 0, 30], [1, 0, 30], [0, 1, 20], [0, -1, 220]]   # straight reversals, diagonals, standing, jitter
for painted in (True, False):
    tag = 'painted' if painted else 'stand-ins'
    if painted and not os.path.exists(os.path.join(os.path.dirname(__file__), '..', 'assets', 'atlas', 'index.json')): print('SKIP painted: no atlas'); continue
    with game(painted=painted) as g:
        check('World starts (%s)' % tag, to_world(g)); g.wait(1200)
        g.ws("(()=>{ ps.hp=ps.maxHp=99999; ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.fairyKings=[2,3,4]; ps.familiar='fam_grass'; ps.familiar2='fam_water'; ps.familiar3='fam_earth'; ps.familiar4='fam_fire'; ws.worldMonsters.forEach(function(m){ m.x=m.spawnX=-9000; }); })()")
        g.wait(2500); g.js("(()=>{ var ws=game.scene.getScene('World'); _heroSetPos(ws, ws.player.x, ws.player.y); })()"); g.wait(800)
        S = g.js(WALK % json.dumps(LEGS))
        check('Four familiars are out (%s)' % tag, S['count'] == 4, S['count'])
        check('Walking, turning and reversing: no familiar overlaps the hero (%s)' % tag, S['n'] > 1500 and S['worst'] <= 1.0, {k: S[k] for k in ('n', 'worst', 'pair')})
        check('Familiars may brush each other but never stack (centres at least half a body apart) (%s)' % tag, S['stack'] >= 0.5, round(S['stack'], 2))
        check('After walking one way for a while every familiar is behind the hero (%s)' % tag, S['steady'] > 300 and S['ahead'] == 0, {k: S[k] for k in ('steady', 'ahead')})
        check('A pod, not a file: all within 150 px of the hero and spread sideways by more than 25 px (%s)' % tag, 0 < S['max'] < 150 and S['wide'] > 25, [round(S['max']), round(S['wide'])])
        if painted: check('Familiars are about 60 % of their first painted size (round 31: a fifth larger than round 27; 43–54 px, hero 63)', 40 <= S['h'] <= 56, S['h'])
        g.js("(()=>{ var ws=game.scene.getScene('World'); _heroSetPos(ws, ws.player.x+900, ws.player.y+40); })()"); g.wait(900)
        S = g.js(WALK % json.dumps([[0, 0, 5]])); check('After a jump the file re-forms behind the hero without overlap (%s)' % tag, S['worst'] <= 1.0 and S['count'] == 4, {k: S[k] for k in ('worst', 'pair')})
        if painted: g.hold('ArrowRight', 900); g.wait(200); g.shot('/tmp/r27.png')
        check('No page errors (%s)' % tag, not g.errs, g.errs[:2]) if hasattr(g, 'errs') else None
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
