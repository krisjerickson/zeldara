"""Round 15: the picked shot looks in the game (Heavy Bodkin arrows, Solid Elements spells, Real Things monster
shots), the plaza logo as wide as the ring of standing stones, and where a game begins.
Run: python tests/test_round15.py  (after node build.mjs)"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
with game(new=True) as g:
    g.wait(800)
    r=g.ws("{p:[ws.player.x/TILE,ws.player.y/TILE], c:[CENTER_X+0.5,CENTER_Y+0.5], pick:ZProj.PICK}")
    check('A new game begins in the middle of the rune circle', abs(r['p'][0]-r['c'][0])<0.6 and abs(r['p'][1]-r['c'][1])<0.6, r)
    check('Picked looks: Heavy Bodkin, Solid Elements, Real Things', r['pick']=={'arrow':'ar_bodkin','spell':'sp_solid','shot':'en_real'}, r['pick'])
    # the plaza logo reaches the standing stones (7.4 tiles): teal lines well outside the old 3.5-tile circle
    g.js("""(()=>{ var ws=game.scene.getScene('World'), z=ws.cameras.main.zoom, R=Math.round(6.4*TILE*z), cx=Math.round(game.scale.width/2), cy=Math.round(game.scale.height/2); game.renderer.snapshotArea(cx-R,cy-12,2*R,24,function(img){ var c=document.createElement('canvas'); c.width=2*R; c.height=24; var q=c.getContext('2d'); q.drawImage(img,0,0); var d=q.getImageData(0,0,2*R,24).data, far=0, edge=Math.round(4.6*TILE*z); for(var y=0;y<24;y++)for(var x=0;x<2*R;x++){ var i=(y*2*R+x)*4; if(Math.abs(x-R)>edge&&d[i+1]>215&&d[i+2]>200&&d[i+1]-d[i]>20)far++; } window._far=far; }); })()""")
    g.wait(700); far=g.js("window._far")
    check('The plaza logo is as wide as the ring of standing stones (its lines reach past 4.6 tiles from the centre)', far is not None and far>60, far)
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), p=ws.player, o={};
      ws._monProj=[]; ws._spawnMonProj({x:p.x+200,y:p.y},p.x,p.y,'arrow',5); ws._spawnMonProj({x:p.x+200,y:p.y+40},p.x,p.y,'bog_flame',5); o.mon=ws._monProj.map(function(q){ return q.vis._zs; });
      var a=ZShot.make(ws,ZShot.ammoKind('arrow_normal','normal'),p.x,p.y-60,0,15), r0=a.rotation; a.setPosition(a.x,a.y+10); o.arrow=[a._zs,a.texture.key,+(a.rotation-r0).toFixed(2),a.frame.name!==undefined,a.scaleX];
      var n0=ws.children.list.length; a.destroy(); o.spark=ws.children.list.length-n0;   // image removed, sparks added
      o.kinds=[ZShot.ammoKind('dart_fire','fire'),ZShot.spellKind(SPELL_DATA.fireball,'fireball'),ZShot.spellKind(SPELL_DATA.chain_lightning,'chain_lightning'),ZShot.spellKind(SPELL_DATA.stone_spikes,'stone_spikes'),ZShot.mxKind('rock'),ZShot.mxKind('web','#e8e8e8'),ZShot.mxKind('fire')];
      o.all=Object.keys(SPELL_DATA).filter(function(k){ return SPELL_DATA[k].proj; }).map(function(k){ var kind=ZShot.spellKind(SPELL_DATA[k],k); return ZProj.SPELLK.indexOf(kind)>=0; });
      ws._monProj.forEach(function(q){ q.vis._gone=true; q.vis.destroy(); }); ws._monProj=[]; return o; })()""")
    check('Monster shots in the world are pictures now (arrow → bone arrow, bog flame → spit)', r['mon']==['bone_arrow','spit'], r['mon'])
    check('An arrow turns to face the way it flies, is drawn at half scale from 2× frames, and sparks when it ends', r['arrow'][0]=='arrow' and abs(r['arrow'][2]-1.57)<0.05 and r['arrow'][4]==0.5 and r['spark']>=3, [r['arrow'],r['spark']])
    check('Ammo, spells and monster shots map to the right pictures; every spell with a projectile has its own shape', r['kinds']==['dart_fire','fireball','lightning','stone_spikes','rock','spit:#e8e8e8','fireball'] and all(r['all']) and len(r['all'])>=11, [r['kinds'],r['all']])
    # continue: a saved game resumes where it was saved
    g.js("(()=>{ var ws=game.scene.getScene('World'); ws.player.x+=TILE*6; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws._save(); })()"); g.wait(200)
    g.js("game.scene.getScene('World').scene.start('Boot',{newGame:false})")
    for _ in range(60):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): break
    g.wait(500); r=g.ws("[ws.player.x/TILE-CENTER_X-0.5]")
    check('A continued game resumes where it was saved (6 tiles east of the centre)', abs(r[0]-6)<0.2, r)
    check('No JS errors', not g.errs, g.errs[:3])
print('%d/%d passed'%(sum(res),len(res)))
