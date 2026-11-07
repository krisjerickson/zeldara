"""Round 90b — the blank-ground bug on zeldara.vercel.app (Nov 2026): the scenery index was repacked (the painted boss attacks) without
re-baking the world, so assets/world/world.bin.gz went stale. The page fell back to building the world itself (fine), but the worker
painter still started from the stale file's bytes, its workers could not load the world, and every chunk already handed to them waited
for ever — the ground stayed unpainted. Run: python tests/test_round90b.py"""
import os, sys, gzip, json, struct, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]), flush=True)
src = open(os.path.join(R, 'src', 'js', '05c2-world-paint-worker.js'), encoding='utf-8').read()
check('The workers start only from a world that loaded (not a stale file)', "ZWORLD.state!=='ready'&&!ZWORLD.used" in src)
check('A worker that cannot load the world stops the worker painter', "if(!(m.nk>0)){ ZWP.fail(" in src)
check('A chunk already given to the workers is painted here once they stop', "if(!failed&&ZWP.state!=='ready'){ failed=true;" in src)
out = subprocess.run(['node', 'build.mjs'], cwd=R, capture_output=True, text=True, timeout=600).stdout
check('build.mjs checks the baked world against this build — and it matches', '✓ baked world matches this build' in out, [l for l in out.splitlines() if 'baked' in l or 'STALE' in l])
from harness import game
with game(painted=True, w=1280, h=720) as g:
    g.wait(5000); g.chunks(20000); g.wait(1000)
    st = g.js("(()=>{ var ws=game.scene.getScene('World'); return {z:ZWORLD.state, wp:ZWP.state, chunks:ws._wr.chunks.size, jobs:ws._wr.jobs.size}; })()")
    check('New game: the baked world loads, the workers paint, the ground is there (%s)' % st, st['z'] in ('ready', 'off') and st['chunks'] >= 2 and st['wp'] in ('ready', 'no'), st)
    check('No script errors', not g.errs, g.errs[:3])
print('%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
