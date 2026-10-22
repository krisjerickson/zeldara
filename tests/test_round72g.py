"""Round 72g — Kris: "roads should be cleared of obstacles" (05f-road-clear.js, 10zh carve) and "the notification … all 4 keys … should go
away as soon as you enter Muspelheim" (04-helpers, 16c). Run: python tests/test_round72g.py"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
ROADS = r"""(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, W=WORLD_W, H=WORLD_H, KL=WK_REG.list, n=0, bad=[];
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){ var t=wd.tiles[y][x], k=KL[wd.kind[y*W+x]]; if(t===T.PATH||t===T.BRIDGE||(k&&(k.roadish||k.id==='road'||k.id==='path'))){ n++; if(!canPassTile(t)&&bad.length<20)bad.push([x,y,t]); } }
  return {n:n, bad:bad, cut:wd._roadPropsCut, flag:!!wd._roadClear}; })()"""
with game() as g:
    r = g.js(ROADS)
    check('Every road cell of the world can be walked (%d cells; %s solid props that stood on a road taken away)' % (r['n'], r['cut']), r['n'] > 1000 and not r['bad'] and r['flag'], r)
    # the keys notice
    k = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, el=document.getElementById('volcano-quest'); ['volcano_key_n','volcano_key_e','volcano_key_s','volcano_key_w'].forEach(function(id){ if(ps.inventory.indexOf(id)<0)ps.inventory.push(id); }); ['s1_dungeon','s2_dungeon','s3_dungeon','s4_dungeon','s1_tower','s2_tower','s3_tower','s4_tower'].forEach(function(q){ if(ps.completedQuests.indexOf(q)<0)ps.completedQuests.push(q); }); ps.muspEntered=0; ps.muspFreed=0; ps.muspSunk=0; ps.muspEsc=0;
        _updateVolcanoQuestHUD(); var before={show:el.classList.contains('show'), txt:document.getElementById('vq-keys').textContent}; ps.muspEntered=1; _updateVolcanoQuestHUD(); var after=el.classList.contains('show'); ps.muspEntered=0; ps.muspSunk=1; _updateVolcanoQuestHUD(); var old=el.classList.contains('show'); ps.muspSunk=0; return {before:before, after:after, old:old, fin:_finalQuestUnlocked(ps)}; })()""")
    check('"All four keys — the gate of Muspelheim awaits!" shows until you enter Muspelheim, then goes (older saves: once it has fallen) (%s)' % k, k['before']['show'] and 'four keys' in k['before']['txt'] and not k['after'] and not k['old'], k)
    e = g.js("(()=>{ var src=String(ZMUSP.enter); return /muspEntered=1/.test(src); })()")
    check('Entering Muspelheim marks it entered', e, e)
    # after the end: the roads joining the hamlets
    g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.spiritsHome=1; ps.godsFree=1; ps.asgardDown=1; ps.bifrost=1; ps.rescued=(ws.wd.gates||[]).map(function(g){ return g.craftsman; }).filter(function(c,i,a){ return a.indexOf(c)===i; }); ps.unlockedSections=[1,2,3,4]; var ch=_wgApplyGates(ws.wd,ps);      /* the end: every craftsman freed, every crossing built */ if(typeof ZCITY!=='undefined')ws.wd._cityDone=true; })()")
    g.wait(3000)
    g.js("(()=>{ try{ FairyTalk.close(); }catch(e){} var ws=game.scene.getScene('World'); try{ ZASG.carve(ws); ZASG.road(ws,true); }catch(e){} try{ ZAFTER.sinkAsgard(ws); }catch(e){} ws.wd._hamDone=false; ZHAMW.carve(ws); })()")      # the end's changes, at once (talks may pause the world here)
    g.wait(3000)
    a = g.js("""(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, W=WORLD_W, D=ZSLW.data(ws), rw=ZHAMW.ROADW/2, bad=[], wet=0, drawn=0;
      D.roads.forEach(function(r,ri){ r.pts.forEach(function(p,i){ if(r.wet&&r.wet[i])wet++; if(r.cut[i])return; drawn++; for(var y=Math.floor(p.y-rw);y<=p.y+rw;y++)for(var x=Math.floor(p.x-rw);x<=p.x+rw;x++){ if(Math.hypot(x+0.5-p.x,y+0.5-p.y)>rw)continue; if(!canPassTile(wd.tiles[y][x])&&bad.length<20)bad.push([x,y,wd.tiles[y][x],ri]); } }); });
      var x0=712,y0=497, pr=(wd.props||[]).filter(function(p){ return x0>=Math.floor(p.x)-1&&x0<=p.x+(p.w||1)&&y0>=Math.floor(p.y)-1&&y0<=p.y+(p.h||1); }).map(function(p){ return p.prop+'@'+p.x+','+p.y+' '+p.w+'x'+p.h+(p.vill?' vill':''); });
      return {bad:bad, wet:wet, drawn:drawn, at712:pr, sites:(wd.sites||[]).filter(function(S){ return Math.hypot(S.tx-712,S.ty-497)<8; }).map(function(S){ return S.type+':'+S.id; })}; })()""")
    check('After the end, the roads joining the hamlets are clear to walk (%d road points; %d in Mirror Lake left out — Asgard has sunk)' % (a['drawn'], a['wet']), not a['bad'] and a['drawn'] > 500 and a['wet'] > 0, a)
    errs = [x for x in g.errs if 'favicon' not in x]
    check('No game script errors', not errs, errs[:4])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
