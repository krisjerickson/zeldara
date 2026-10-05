"""Round 26 — sizes by body, anchors at the feet, no pixel sprites in play, bosses / animals / skiff / Tome painted.
Needs assets/atlas/ (python tools/sprites/intake.py --atlas on the PC).   Run: python tests/test_round26.py   (ZELDARA_ENGINE=4 for Phaser 4)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, ENGINE
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:420] if info != '' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False
ix = os.path.join(R, 'assets', 'atlas', 'index.json')
if not os.path.exists(ix): print('SKIP: no assets/atlas/index.json'); sys.exit(0)
A = json.load(open(ix)); C = A['chars']; F = A['frames']
check('Atlas: every character has a body height and an ink size', all(c.get('h0', 0) > 0 and c.get('a0', 0) > 0 for c in C.values()), len(C))
check('Atlas: every frame cell is a square of its character\'s body height (feet at the bottom centre)', all(f[5] == f[6] == max(8, C[n.split('/')[0]]['h0']) for n, f in F.items()))
sw = [n for n, f in F.items() if '/melee' in n and f[7] + f[3] > f[5] + 4]
check('Atlas: ink may reach outside the cell (a swing does not shrink or shift the body)', len(sw) > 20, len(sw))
check('Atlas: all page files are present, bosses included', all(os.path.exists(os.path.join(R, 'assets', 'atlas', p + '.webp')) for p in A['pages']), len(A['pages']))
S = json.load(open(os.path.join(R, 'sprites', 'requests', 'sizes.json')))
mon = [v['h'] for c, v in S.items() if c in C and not c.startswith(('boss', 'bf_', 'cw_', 'mg_', 'elite', 'ride_', 'mt_', 'hero', 'fairy', 'monarch', 'animal', 'veh', 'fam_', 'vf_', 'npc_', 'tc_', 'crafts', 'isl_'))]
check('Sizes: hero 63 px; rider + mount 1.3 × and a lone mount 1.05 × the hero; monsters between 25 and 100 px', S['hero_m']['h'] == 63 and 80 <= S['ride_m_horse']['h'] <= 84 and 64 <= S['mt_horse']['h'] <= 68 and min(mon) >= 25 and max(mon) <= 100, [S['ride_m_horse'], S['mt_horse'], min(mon), max(mon)])

with game(painted=True) as g:
    check('World starts', to_world(g)); g.wait(1500); g.ws("(ps.hp=ps.maxHp=99999,1)")
    r = g.ws("""(()=>{ var P=ws.player, seen={}, n=0, out=[]; ws.worldMonsters.forEach(function(m){ if(n>=7||m.dead||seen[m.rid]||!m.rid||!ZAtlas.has(m.rid))return; seen[m.rid]=1; var a=n/7*6.28; m.x=m.spawnX=P.x+Math.cos(a)*160; m.y=m.spawnY=P.y+Math.sin(a)*115; m.cont.setPosition(m.x,m.y); n++; out.push(m.rid); });
      var b=ws.worldMonsters.find(function(m){ var s=m.body||m.spr; return s&&s._rig; }); if(b){ b.x=P.x-250; b.y=P.y-150; b.cont.setPosition(b.x,b.y); out.push('BOSS'); }
      (ws._largeAnimals||[]).slice(0,2).forEach(function(a,i){ a.x=P.x+120+i*80; a.y=P.y+170; }); return out; })()""")
    g.wait(3500)
    M = g.ws("ws.worldMonsters.filter(m=>m._za&&m.rid).map(m=>{var s=m.spr||m.body;return {id:m._zch,k:s.texture.key,f:s.frame.name,h:Math.round(s.scaleX*ZAtlas.META.chars[ZAtlas.A(m._zch)].h0)}})")
    check('Monsters wear painted frames at the size the rule gives', len(M) >= 5 and all(m['k'].startswith('za_') and abs(m['h'] - S[m['id']]['h']) <= max(3, S[m['id']]['h'] * 0.25) for m in M if m['id'] in S), M[:4])
    B = g.ws("ws.worldMonsters.filter(m=>{var s=m.body||m.spr;return s&&s._rig&&m._za}).map(m=>{var s=m.body||m.spr,R=s._rig;return {id:m._zch,k:s.texture.key,zk:s._zk,dh:R.D.h,h0:ZAtlas.META.chars[m._zch].h0,back:!!(R.back&&R.back.visible),pupil:!!(R.pupil&&R.pupil.visible)}})")
    check('A world boss wears its painted frames; back layer and pupil are put away', len(B) >= 1 and all(b['k'].startswith('za_') and not b['back'] and not b['pupil'] for b in B), B[:2])
    check('Boss size: body = the designed height, as far above the hero as before (63/39 × D.h)', all(abs(b['zk'] * b['h0'] - b['dh'] * 63 / g.js("ZAtlas.heroPix().h")) < 3 for b in B), [(b['id'], round(b['zk'] * b['h0']), b['dh']) for b in B])
    # the boss keeps its body size whatever frame shows: scale is constant and the cell is the body square
    sc = []
    for _ in range(6): g.wait(250); sc.append(g.ws("(()=>{var m=ws.worldMonsters.find(m=>{var s=m.body||m.spr;return s&&s._rig&&m._za}); var s=m.body||m.spr; return [s.frame.name, +(s._zk).toFixed(4), s.frame.realHeight]})()"))
    check('Boss: one scale and one cell size across frames', len(set((x[1], x[2]) for x in sc)) == 1, sc[:3])
    an = g.js("ZAtlas._an.filter(i=>i.visible).map(i=>i.frame.name+':'+Math.round(i.displayHeight))")
    check('Animals are painted pictures (not shapes)', len(an) >= 1 and all(a.startswith('animal_') for a in an), an)
    px = g.js("""(()=>{ var bad=[], P=game.scene.getScene('World').player, walk=function(L,vis,px,py){ L.forEach(function(o){ var v=vis&&o.visible!==false; if(o.list)return walk(o.list,v,o.x,o.y); if(!v||!o.texture||!o.frame||Math.hypot((px||0)+o.x-P.x,(py||0)+o.y-P.y)>900)return; var k=o.texture.key; if(/^(mx_(?!_lazy)|ch_|spirit_|fairy_|fairymonarch_|hero_|heroF_)/.test(k)||(/^ba_/.test(k)&&/^\\d+$/.test(o.frame.name)))bad.push(k+':'+o.frame.name); }); }; walk(game.scene.getScene('World').children.list,true); return bad; })()""")
    check('No visible pixel character sprite within 900 px of the hero', len(px) == 0, px[:8])
    g.ws("(ps.mount='horse',1)"); g.page.keyboard.down('d'); g.wait(700)
    for _ in range(20):
        if g.js("ZAtlas.ready('ride_m_horse')"): break
        g.wait(250)
    g.wait(300); rd = g.ws("({f:ws.player.sprite.frame.name,h:Math.round(ws.player.sprite.scaleX*ZAtlas.META.chars.ride_m_horse.h0),mv:!!(ws.player.mountSpr&&ws.player.mountSpr.visible)})"); g.page.keyboard.up('d')
    check('Riding: painted rider + mount, 1.3 × the hero (82 px), no pixel mount', rd['f'].startswith('ride_m_horse/') and 80 <= rd['h'] <= 84 and not rd['mv'], rd)
    g.ws("(ps.mount=null,1)"); g.wait(300)
    g.js("Tome.open()"); g.wait(400); g.js("(Tome.ui.cat='monster',Tome.render())"); g.wait(2500)
    tm = g.js("(()=>{ var cv=document.querySelector('#tome-grid canvas[data-spr]'), d=cv.getContext('2d').getImageData(0,0,48,48).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i]>20)n++; return [n, Object.keys(ZAtlas._t1||{}).length]; })()")
    check('Tome pictures are drawn from the painted frames', tm[0] > 150 and tm[1] >= 20, tm); g.js("closeModal('tome')")
    g.js("ZAtlas.setOff(true)"); g.wait(900); off = g.ws("[ws.player.sprite.texture.key, ws.worldMonsters.filter(m=>m._za&&!m.dead&&Math.hypot(m.x-ws.player.x,m.y-ws.player.y)<700).length]")
    check('Dev switch off: pixel sprites come back', not off[0].startswith('za_') and off[1] == 0, off); g.js("ZAtlas.setOff(false)"); g.wait(500)
    check('No JS errors (engine %s)' % ENGINE, not g.errs, g.errs[:4])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
