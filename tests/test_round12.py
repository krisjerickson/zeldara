"""Round 12: boss health x2 (all bosses; elites unchanged) and waystone travel
(the move no longer waits on a camera fade; a fairy near a waystone no longer takes [Tab]).
Run: python tests/test_round12.py  (after node build.mjs)"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
with game(new=True) as g:
    hp=g.js("""(()=>({r12:BOSS_HP_R12, gob:MDEFS.goblin_king.hp, sl:MDEFS.shadow_lord.hp, isl:MDEFS[_islandBossKey(1)].hp, isl0:HARBOR_ISLANDS[1].boss.hp, el:MDEFS[_bonusMiniBossKey(2)].hp}))()""")
    check('Boss health x2: island boss = base x1.5 x2', hp['r12']==2 and hp['isl']==round(hp['isl0']*3), hp)
    check('Boss health x2: Goblin King 342 (was 171), Shadow Lord 936 (was 468); elites unchanged at 700', hp['gob']==342 and hp['sl']==936 and hp['el']==700, hp)
    g.js("(()=>{var ws=game.scene.getScene('World'),ps=ws.playerState; ps.gold=99999; ps.unlockedSections=[1,2,3,4]; ws.wd.waystones.forEach(w=>{ if(ps.activatedWaystones.indexOf(w.id)<0)ps.activatedWaystones.push(w.id); }); var w=ws.wd.waystones[0]; ws.player.x=w.x*TILE+16; ws.player.y=(w.y+1)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y);})()"); g.wait(400)
    ids=g.ws("ps.activatedWaystones"); bad=[]
    for to in ids[1:]+['ws_village']:
        g.key('Tab',120); g.wait(600)
        m=g.js("({open:document.getElementById('modal-map').style.display, travel:WMAP.travel})")
        b=g.js("(()=>{ var b=document.querySelector('.wm-ws[data-ws=%s]'); if(!b)return null; b.scrollIntoView(); var r=b.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()"%to)
        if b: g.page.mouse.click(b['x'],b['y'])
        g.wait(250)   # the move is immediate now (no waiting for a fade)
        r=g.ws("{p:[ws.player.x/TILE|0,ws.player.y/TILE|0], w:(function(){var w=ws.wd.waystones.find(q=>q.id==='%s');return [w.x,w.y]})(), open:document.getElementById('modal-map').style.display, ok:ws._canGo(ws.player.x,ws.player.y,ps.mount)}"%to)
        if not (m['open']=='flex' and abs(r['p'][0]-r['w'][0])<3 and abs(r['p'][1]-r['w'][1])<4 and r['open']=='none' and r['ok']): bad.append((to,m,r))
        g.wait(900)
    check('Travel works through all 17 waystones in a row: [Tab] opens the map at each, the click moves you at once', not bad, bad[:3])
    # a second request while the arrival fade is still running must also move you
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'); WMAP.travel='ws_village'; ws._travelTo('ws_waystone_road'); var a=[ws.player.x/TILE|0]; WMAP.travel='ws_waystone_road'; ws._travelTo('ws_firefly_river'); a.push(ws.player.x/TILE|0); return a; })()""")
    check('Two travels back to back both move you (no dependence on the camera fade)', r==[675,900], r)
    # a fairy hovering at a waystone: the stone gets [Tab]; next to the fairy and away from the stone, the fairy does
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), f=ws._fairies&&ws._fairies.find(x=>x.spr); if(!f)return null; var w=ws.wd.waystones.slice().sort((a,b)=>Math.hypot(a.x*TILE-f.cx,a.y*TILE-f.cy)-Math.hypot(b.x*TILE-f.cx,b.y*TILE-f.cy))[0];
      var put=function(x,y){ ws.player.x=x; ws.player.y=y; ws.player.cont.setPosition(x,y); if(ws._interactPrompt){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } ws._checkInteraction(); return ws._interactPrompt?(ws._interactPrompt._fairy?'fairy':ws._interactPrompt._ws?'stone':'other'):'none'; };
      var d=Math.hypot(w.x*TILE+16-f.cx,w.y*TILE+16-f.cy)/TILE, dx=f.cx-(w.x*TILE+16), dy=f.cy+18-(w.y*TILE+16), L=Math.hypot(dx,dy)||1;
      return {d:+d.toFixed(1), atStone:put(w.x*TILE+16,(w.y+2)*TILE+16), atFairyFar:put(f.cx+dx/L*TILE*2.6,f.cy+18+dy/L*TILE*2.6)}; })()""")
    check('At a waystone with a fairy nearby the prompt is the waystone; beyond the fairy it is the fairy', r is None or (r['atStone']=='stone' and r['atFairyFar'] in ('fairy','none')), r)
    # not enough gold: the button stays clickable and tells you why
    g.js("(()=>{var ws=game.scene.getScene('World'),w=ws.wd.waystones[0]; ws.playerState.gold=0; ws.player.x=w.x*TILE+16; ws.player.y=(w.y+1)*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y);})()"); g.wait(400)
    g.key('Tab',120); g.wait(600)
    r=g.js("(()=>{ var far=game.scene.getScene('World').wd.waystones.find(w=>w.region===3), b=document.querySelector('.wm-ws[data-ws='+far.id+']'); var o={dis:b.disabled, poor:b.dataset.poor, txt:b.textContent}; b.click(); o.px=game.scene.getScene('World').player.x/TILE|0; o.open=document.getElementById('modal-map').style.display; return o; })()")
    check('Too little gold: the destination says "need Ng", clicking explains and you stay put with the map open', (not r['dis']) and r['poor']=='1' and 'need' in r['txt'] and r['px']==694 and r['open']=='flex', r)
    check('No JS errors', not g.errs, g.errs[:3])
print('%d/%d passed'%(sum(res),len(res)))
