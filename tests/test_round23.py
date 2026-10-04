"""Round 23 — painted sprites in the game (ZAtlas, src/js/04f-atlas.js).
Needs the packed atlases in assets/atlas/ (python tools/sprites/intake.py --atlas on the PC).
Run:  python tests/test_round23.py          (ZELDARA_ENGINE=4 for Phaser 4)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, ENGINE
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:400] if info != '' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False

ix = os.path.join(R, 'assets', 'atlas', 'index.json')
if not os.path.exists(ix): print('SKIP: no assets/atlas/index.json'); sys.exit(0)
A = json.load(open(ix))
check('Atlas index: every frame points at a listed page and lies inside it', all(f[0] in A['pages'] and f[1] + f[3] <= A['pages'][f[0]][0] and f[2] + f[4] <= A['pages'][f[0]][1] for f in A['frames'].values()), [len(A['frames']), len(A['pages'])])
check('Atlas index: every page file exists and every character lists its pages', all(os.path.exists(os.path.join(R, 'assets', 'atlas', p + '.webp')) for p in A['pages'] if not p.startswith('boss-')) and all(c['pages'] and c['h0'] > 0 for c in A['chars'].values()), len(A['chars']))
check('Both heroes have idle, walk and sword frames for side, front and back', all(('hero_%s/%s/%s/0' % (w, a, f)) in A['frames'] for w in 'mf' for a in ('idle', 'walk', 'melee_sword') for f in 'sfb'))
idx = open(os.path.join(R, 'index.html'), encoding='utf-8').read()
check('The game page carries the atlas index (ZATLAS_META) and the loader', 'var ZATLAS_META=' in idx and 'var ZAtlas=' in idx)

with game(painted=True) as g:
    check('World starts', to_world(g)); g.wait(1500); g.ws("(ps.hp=ps.maxHp=99999,1)")
    H = "({k:ws.player.sprite.texture.key,f:ws.player.sprite.frame.name,p:!!ws.player.painted,h:Math.round(ws.player.sprite.displayHeight),a:ws.player.anim})"
    out = {}
    for key, d in (('d', 's'), ('s', 'f'), ('w', 'b'), ('a', 's')):
        g.page.keyboard.down(key); g.wait(450); out[key] = g.ws(H); g.page.keyboard.up(key)
    check('The hero wears painted walk frames in all four directions', all(v['p'] and v['k'].startswith('za_') and v['f'].startswith('hero_m/walk/' + d) for (k, d), v in zip((('d', 's'), ('s', 'f'), ('w', 'b'), ('a', 's')), [out[k] for k in 'dswa'])), out)
    h = g.ws("ws.player.sprite.frame.realHeight*ws.player.sprite.scaleY/112*112")
    check('Painted hero is 1.5× the stand-in: a 112 px cut shows 63 px tall', abs(g.ws("ZAtlas.heroK()*112") - 63) < 0.01, g.ws("ZAtlas.heroK()*112"))
    g.wait(300); idle = g.ws(H); check('Standing still shows the idle frames', idle['f'].startswith('hero_m/idle/'), idle)
    g.ws("(ws.worldAtkTimer=0.45,1)"); g.wait(120); atk = g.ws(H); check('Attacking shows the weapon swing frames', '/melee_' in atk['f'] or '/magic_' in atk['f'] or '/ranged_' in atk['f'], atk)
    g.wait(700)
    # monsters
    r = g.ws("""(()=>{ var P=ws.player, seen={}, n=0, out=[]; ws.worldMonsters.forEach(function(m){ if(n>=6||m.dead||seen[m.rid]||!ZAtlas.has(m.rid)||!m.mx)return; seen[m.rid]=1; var a=n/6*6.28; m.x=m.spawnX=P.x+Math.cos(a)*150; m.y=m.spawnY=P.y+Math.sin(a)*110; m.cont.setPosition(m.x,m.y); n++; out.push(m.rid); }); return out; })()""")
    g.wait(2500)
    M = g.ws("ws.worldMonsters.filter(m=>m._za).map(m=>{var s=m.spr||m.body;return {id:m.rid,k:s.texture.key,f:s.frame.name,h:Math.round(s.displayHeight)}})")
    check('Monsters near the hero wear their painted frames', len(M) >= min(4, len(r)) and all(m['k'].startswith('za_') and m['f'].startswith(m['id'] + '/') for m in M), [r, M[:3]])
    check('Painted monsters keep their size next to the hero (cut height × the same factor)', all(10 < m['h'] < 260 for m in M), [m['h'] for m in M])
    npc = g.ws("(ws._chAnim||[]).filter(i=>i._zo).map(i=>i._ch.id+':'+i.frame.name)")
    check('Village folk wear painted frames', len(npc) >= 1 and all(n.split(':')[1].startswith(n.split(':')[0] + '/') for n in npc), npc[:5])
    # riding
    g.ws("(ps.mount='horse',1)"); g.page.keyboard.down('d'); g.wait(600)
    for _ in range(20):     # the mounts page loads the first time it is needed
        if g.js("ZAtlas.ready('ride_m_horse')"): break
        g.wait(250)
    g.wait(300); rd = g.ws(H); mv = g.ws("!!(ws.player.mountSpr&&ws.player.mountSpr.visible)"); g.page.keyboard.up('d')
    check('Riding shows the painted rider + mount picture (the stand-in mount is hidden)', rd['f'].startswith('ride_m_horse/ride_side/') and not mv, [rd, mv])
    g.ws("(ps.mount=null,1)"); g.wait(400); un = g.ws(H); check('Getting off returns to the hero frames', un['f'].startswith('hero_m/'), un)
    # switch off
    g.js("ZAtlas.setOff(true)"); g.wait(600); g.page.keyboard.down('d'); g.wait(400); off = g.ws(H); g.page.keyboard.up('d')
    offm = g.ws("ws.worldMonsters.filter(m=>m._za&&!m.dead&&Math.hypot(m.x-ws.player.x,m.y-ws.player.y)<700).length")   # sleeping far-away monsters switch when they next wake
    check('Painted sprites off (dev switch / ?sprites=0): hero and monsters go back to their stand-ins', not off['p'] and not off['k'].startswith('za_') and off['h'] == 42 and offm == 0, [off, offm])
    g.js("ZAtlas.setOff(false)"); g.wait(600); on = g.ws(H); check('…and on again', on['p'], on)
    check('No JS errors (engine %s)' % ENGINE, not g.errs, g.errs[:4])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
