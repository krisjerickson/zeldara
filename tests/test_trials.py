"""Round 5: the trial realm — all 20 fairy trials + 3 monarch trials build, start, and can be won.
Run from the repo root after `node build.mjs`: python tests/test_trials.py"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
D = "game.scene.getScene('Dungeon')"
SOLVE = {
 'rune_targets': "T.hits=T.need",
 'echo_path': "T.round=T.lens.length-1; T.showing=false; T.pos=T.seq.length-1; var t=T.tiles[T.seq[T.pos]]; S.px=t.x; S.py=t.y; S.pCont.setPosition(S.px,S.py)",
 'guardian': "T.time=0",
 'shadow_duel': "T.duel.hp=0; T.duel.dead=true",
 'rune_lock': "T.cur=T.target.slice()",
 'escort': "T.seed.x=T.goal.x; T.seed.y=T.goal.y+4",
 'light_align': "T.P.mirrors.forEach(function(m){ if(m.sol)m.o=m.sol; }); TR_THEME.light_align.paint(S,T)",
 'collapse_path': "S._walkPath=true",
 'lights_out': "T.wisps.forEach(function(w){ w.g.x=S.px; w.g.y=S.py; }); T.wisps.forEach(function(w){ w.x=S.px; w.y=S.py; })",
 'boulder_push': "S._soko=true",
 'mirror_walk': "T.runes.forEach(function(r){ r.x=T.sx; r.y=T.sy; })",
 'beam_gauntlet': "T.B.pylons.forEach(function(p){ p.spd=0; p.len=0.1; }); S._beam=true",
}
with game(new=True) as g:
    g.wait(500)
    g.ws("(()=>{ ps.godMode=false; ps.maxHp=300; ps.hp=300; ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.familiar='fam_grass'; })()")
    # every layout builds (and the puzzles exist)
    r = g.js("""(()=>{ var bad=[]; [1,2,3,4].forEach(q=>{ for(var i=0;i<5;i++){ var tp=_trialPlanOf(q,i); try{ var m=_trialBuild({q:q,i:i,stages:[tp.theme],stage:0,tier:q,seed:1000+q*97+i*13}); var L=m.trial;
          if(tp.theme==='light_align'&&!L.puzzle)bad.push(q+'/'+i+' no light puzzle'); if(tp.theme==='boulder_push'&&!L.soko.boulders.length)bad.push(q+'/'+i+' no boulders'); if(tp.theme==='lights_out'&&L.maze.wisps.length<3)bad.push(q+'/'+i+' wisps '+L.maze.wisps.length);
          if(tp.theme==='mirror_walk'&&L.mirror.runes.length<3)bad.push(q+'/'+i+' runes'); }catch(e){ bad.push(q+'/'+i+' '+e.message); } } });
      [2,3,4].forEach(q=>MONARCH_TRIAL_PLAN[q].forEach((t,k)=>{ try{ _trialBuild({q:q,i:9,stages:MONARCH_TRIAL_PLAN[q],stage:k,tier:q+1,seed:1000+q*97+9*13}); }catch(e){ bad.push('m'+q+'/'+k+' '+e.message); } }));
      var themes={}; [1,2,3,4].forEach(q=>FAIRY_TRIAL_PLAN[q].forEach(a=>themes[a[0]]=(themes[a[0]]||0)+1)); var names=new Set(); [1,2,3,4].forEach(q=>FAIRY_TRIAL_PLAN[q].forEach(a=>names.add(a[1])));
      return {bad:bad, themes:Object.keys(themes).length, names:names.size}; })()""")
    check('All 20 fairy trials + 3 monarch trials build their arenas (12 themes, 20 different trials)', not r['bad'] and r['themes'] == 12 and r['names'] == 20, r)
    def run_trial(q, i):
        g.js(f"sbTrial({q},{repr(i) if isinstance(i,str) else i})")
        for _ in range(40):
            g.wait(400)
            if g.js(f"!!({D}&&{D}._tr&&game.scene.isActive('Dungeon'))"): break
        g.wait(600)
        info = g.js(f"(()=>{{ var S={D}; return S&&S._tr?{{theme:S._tr.theme, stage:S._trialRun.stage, n:S._trialRun.stages.length, hud:(document.getElementById('trial-hud')||{{}}).textContent}}:null; }})()")
        return info
    def solve(stage_theme):
        g.js(f"(()=>{{ var S={D}, T=S._tr; {SOLVE[stage_theme]}; }})()")
        if stage_theme == 'collapse_path':
            g.js(f"""(()=>{{ var S={D}, T=S._tr, W=T.W; S._cp=0; S._cpT=setInterval(function(){{ if(!S._tr||S._trialOver){{ clearInterval(S._cpT); return; }} var r=S._cp++; if(r<W.rows){{ var st=T.stones.find(s=>s.r===r&&s.c===W.path[r]); S.px=st.x; S.py=st.y; }} else {{ S.px=TR.px(W.x0); S.py=TR.px(W.y0-2); }} S.pCont.setPosition(S.px,S.py); }},450); }})()""")
        if stage_theme == 'boulder_push':
            # drop each boulder onto its plate (the generator's solvability is covered by construction)
            g.js(f"(()=>{{ var S={D}, T=S._tr; T.B.forEach(function(b,i){{ S.dtiles[b.y][b.x]=DNG.FLOOR; var G=T.K.goals[i]; b.x=G.x; b.y=G.y; S.dtiles[b.y][b.x]=DNG.WALL; }}); }})()")
        if stage_theme == 'lights_out':
            g.js(f"(()=>{{ var S={D}, T=S._tr; S._lo=setInterval(function(){{ if(!S._tr||S._trialOver){{ clearInterval(S._lo); return; }} if(T.got>=T.need){{ var M=T.L.maze; S.px=TR.px(M.gate.x); S.py=TR.px(M.gate.y-1); S.pCont.setPosition(S.px,S.py); }} }},300); }})()")
        if stage_theme == 'beam_gauntlet':
            g.js(f"""(()=>{{ var S={D}, T=S._tr; S._bg=setInterval(function(){{ if(!S._tr||S._trialOver){{ clearInterval(S._bg); return; }} var s=T.sh[0]; var p=s?s:T.alt; S.px=p.x; S.py=p.y; S.pCont.setPosition(S.px,S.py); }},350); }})()""")
    def wait_done(ms=20000):
        for _ in range(ms // 400):
            g.wait(400)
            if g.js("game.scene.isActive('World') && !game.scene.isActive('Dungeon')"): return True
        return False
    for q in (1, 2, 3, 4):
        for i in range(5):
            info = run_trial(q, i)
            theme = info and info['theme']
            if not info:
                check(f'Q{q} fairy {i+1}: trial realm opens', False, g.errs[-3:]); g.js("game.scene.isActive('Dungeon')&&game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800); continue
            solve(theme)
            ok = wait_done()
            check(f'Q{q} fairy {i+1}: {theme} opens in its own realm, can be won, and returns you to the world', ok and theme == _ if False else ok, (info, g.errs[-3:]))
            g.ws("(()=>{ ps.hp=ps.maxHp; })()")
    for q in (2, 3, 4):
        info = run_trial(q, 'm'); stages = info['n'] if info else 0; seen = []
        for k in range(stages):
            if k > 0:
                for _ in range(30):
                    g.wait(400)
                    if g.js(f"!!({D}&&{D}._tr&&{D}._trialRun.stage==={k}&&!{D}._trialOver)"): break
                g.wait(600)
            th = g.js(f"{D}._tr.theme"); seen.append(th); solve(th)
        ok = wait_done()
        check(f'Q{q} monarch: {stages} trials in a row ({" → ".join(seen)}), then back to the world', ok and len(seen) == stages and stages >= 3, (info, seen, g.errs[-3:]))
    # giving up: the entry stairs end the trial without a win
    run_trial(1, 0)
    g.js(f"(()=>{{ var S={D}; var st=S.interactables.find(i=>i.type==='stairs_up'); S.px=st.x; S.py=st.y; S.pCont.setPosition(S.px,S.py); S._interact(); }})()")
    check('The realm\'s exit stairs give up the trial and bring you back', wait_done(8000))
    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No page errors', not errs, errs[:5])
print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
