"""Round 30 — the scenery pilot in the game: painted buildings, trees, rocks, the Runestone Green, dungeon mouths, camp props,
furniture and ground texture, at the size of what they replace; the drawn scenery stays as the fallback.
Needs assets/scenery/ (python tools/sprites/intake_scenery.py).   Run: python tests/test_round30.py"""
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
ix = os.path.join(R, 'assets', 'scenery', 'index.json')
if not os.path.exists(ix): print('SKIP: no assets/scenery/index.json'); sys.exit(0)
I = json.load(open(ix))
check('Scenery index: objects, pages and ground textures are there', len(I['items']) >= 70 and len(I['pages']) >= 10 and len(I['tex']) >= 6 and all(os.path.exists(os.path.join(R, 'assets', 'scenery', p + '.webp')) for p in I['pages']), [len(I['items']), len(I['pages']), len(I['tex'])])
check('Every object has a standing point inside its picture and a size factor', all(0 <= v[5] <= v[3] and 0 < v[6] <= v[4] + 1 and v[7] > 0 for v in I['items'].values()))
with game(painted=True) as g:
    check('World starts', to_world(g)); g.wait(1500)
    r = g.js("({done:ZScn.done,off:ZScn.off,pages:Object.keys(ZScn.img).length,tex:Object.keys(ZScn.timg).length,K:ZScn.K,KB:ZScn.KB,miss:['vb_tavern','tr_round_a','rk_rock','rn_green','en_dng_1','cp_campfire','if_table','tf_statue','dg_crystal'].filter(function(i){ return !ZScn.has(i); })})")
    check('The painted scenery is loaded before the world is drawn', r['done'] and not r['off'] and r['pages'] == len(I['pages']) and r['tex'] == len(I['tex']) and not r['miss'], r)
    # sizes: a painted object is drawn as tall as asked, a building as wide as its footprint
    r = g.js("(()=>{ var m={sprites:[],lights:[]}; var a=ZScn.sprite(m,'tr_round_a',100,100,131), b=ZScn.sprite(m,'vb_tavern',100,100,0,{w:180}), c=ZScn.fit(m,'if_stool',0,0,40), s=m.sprites; return {tree:a.h,tav:b.w,tavH:b.h,stool:c.h,n:s.length,res:s.every(function(q){ return q.res===2; }),cv:[s[0].canvas.height,s[1].canvas.width]}; })()")
    check('Sizes: a tree asked 131 px tall is 131 px and a tavern asked 180 px wide is 180 px, to the nearest 6 % step (round 31: sizes go in steps so canvases are shared); canvases are twice that for sharpness', abs(r['tree'] - 131) < 131 * 0.035 and abs(r['tav'] - 180) < 180 * 0.035 and 150 < r['tavH'] < 200 and r['res'] and r['cv'][0] >= 262 and r['cv'][1] >= 360, r)
    # the world as mounted around the start: painted objects at half scale, the Runestone Green as a flat decal under everything
    for _ in range(60):
        g.wait(500)
        if g.js("game.scene.getScene('World')._wr.chunks.size>=4"): break
    g.wait(2000)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), o={half:0,flat:0,tall:0,lin:0}; ws.children.list.forEach(function(im){ if(im.type!=='Image'||Math.abs(im.scaleX-0.5)>0.001||!im.texture||im.texture.key.indexOf(ws._wrTag||'wc')!==0)return; o.half++; if(im.depth===-6)o.flat++; if(im.displayHeight>140)o.tall++; }); return o; })()""")
    check('Around the start the world shows painted objects (drawn at 2 ×, shown at half size), buildings and trees among them, and the Runestone Green as a flat decal', r['half'] >= 10 and r['tall'] >= 3 and r['flat'] >= 1, r)
    r = g.js("(()=>{ var ws=game.scene.getScene('World'); var t=ZScn.texture(ws,'en_dng_1',138), k=ws._campTex('campfire',null), f=ws.textures.getFrame(k,'0'); return {dng:t&&[Math.round(t.h),t.scale,ws.textures.exists(t.key)],camp:f.width}; })()")
    check('Dungeon mouths and camp props have painted textures (camp props as 128 px frames)', r['dng'] and r['dng'][0] == 138 and r['dng'][1] == 0.5 and r['dng'][2] and r['camp'] == 128, r)
    check('Ground: grass kinds get a painted texture laid over their own colour', g.js("ZScn.ground('grass')==='tx_grass'&&ZScn.ground('vgreen')==='tx_grass_village'&&!!ZScn.detail('tx_grass',128,1)"))
    # switched off: every call says no, so the painters draw as before
    r = g.js("(()=>{ ZScn.off=true; var m={sprites:[],lights:[]}; var o=[ZScn.has('vb_tavern'),ZScn.sprite(m,'tr_round_a',0,0,100),ZScn.ground('grass'),_scn(),m.sprites.length]; ZScn.off=false; return o; })()")
    check('Switched off, nothing painted is used (the drawn scenery is the fallback)', r == [False, False, None, None, 0], r)
    check('The Dev panel has the scenery switch and the two size buttons', g.js("!!document.getElementById('sb-scenery')&&/100%/.test(document.getElementById('sb-scn-k').textContent)&&/115%/.test(document.getElementById('sb-scn-kb').textContent)"))
    check('No page errors', not g.errs, g.errs[:3])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
