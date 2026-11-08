"""Round 85 — one pause panel (24p ZPAUSE), map and quests in one (21q ZQMAP), Begin Quest (04d), the chase and the mob at the door (16y ZRUSH).
Run: python tests/test_round85.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with game(painted=False) as g:
    g.wait(2500)
    r = g.js("""(()=>{ var out={}; ZPAUSE.go('inventory'); out.inv=ZPAUSE.cur(); out.invDrawn=!!document.querySelector('#inv-content .zv'); out.strip=getComputedStyle(document.getElementById('zpause')).display; out.paused=isGamePaused();
      ZPAUSE.go('map'); out.map=ZPAUSE.cur(); out.mapOpen=document.getElementById('modal-map').style.display!=='none'; out.invClosed=document.getElementById('modal-inventory').style.display==='none';
      ZPAUSE.go('skills'); out.skills=ZPAUSE.cur(); ZPAUSE.go('sound'); out.sound=ZPAUSE.cur(); out.sliders=document.querySelectorAll('#modal-sound input[type=range]').length;
      ZPAUSE.go(ZPAUSE.tab('training')?'training':'controls'); out.controls=ZPAUSE.cur();      /* round 100: Training takes Controls' place */ ZPAUSE.go('tome'); out.tome=ZPAUSE.cur(); ZPAUSE.go('mounts'); out.mounts=ZPAUSE.cur(); ZPAUSE.go('dev'); out.dev=ZPAUSE.cur();
      out.tabs=[...document.querySelectorAll('#zpause .zpz-t')].map(b=>b.dataset.t); ZPAUSE.resume(); out.after=ZPAUSE.cur(); out.save=typeof doSaveGame==='function'&&typeof doReturnToTitle==='function';
      out.questsBtn=[...document.querySelectorAll('#action-bar button')].filter(b=>/Quests/.test(b.textContent)&&b.style.display!=='none').length; return out; })()""")
    g.js("ZPAUSE.go('inventory')"); g.wait(700)
    r['paused'] = g.js("isGamePaused()"); g.js("ZPAUSE.resume()"); g.wait(600)
    r2 = g.js("(()=>({paused:isGamePaused(), strip:getComputedStyle(document.getElementById('zpause')).display}))()")
    check('Every tab opens its screen in the one panel, the strip shows, the game is paused (%s)' % r['tabs'], r['inv'] == 'inventory' and r['invDrawn'] and r['strip'] == 'flex' and r['paused'] and r['map'] == 'map' and r['mapOpen'] and r['invClosed'] and r['skills'] == 'skills' and r['sound'] == 'sound' and r['controls'] in ('controls', 'training') and r['tome'] == 'tome' and r['mounts'] == 'mounts' and r['dev'] == 'dev', r)
    check('Resume closes it and the game runs on; Save Game and Main Menu exist; no separate Quests icon', r['after'] is None and not r2['paused'] and r2['strip'] == 'none' and r['save'] and r['questsBtn'] == 0, [r, r2])
    check('The Sound tab: all sound + music, ambience and effects, each with a level', r['sliders'] == 4, r)
    s = g.js("""(()=>{ ZPAUSE.go('sound'); var c=document.querySelector('#modal-sound input[data-on=music]'); c.checked=false; c.onchange(); var off=ZAUDIO.vol.music; c=document.querySelector('#modal-sound input[data-on=music]'); c.checked=true; c.onchange(); var on=ZAUDIO.vol.music; ZPAUSE.resume(); return {off:off,on:on}; })()""")
    check('Music off and on again keeps its level (%s)' % s, s['off'] == 0 and s['on'] > 0.1, s)
    q = g.ws("""(()=>{ var ps=ws.playerState; ps.activeQuest='s1_tower'; ZQMAP._c=null; var L=ZQMAP.list(ws), N=ZQMAP.next(ws), S=ZQMAP.siteOf(ws.wd,'s1_tower'); openWorldMap(); var side=document.getElementById('wm-quests'); var h=side?side.textContent:''; closeModal('map');
      return {n:L.length, act:L[0]&&L[0].act, actBoss:!!(S&&S.boss&&!S.mage), next:N&&N.t, side:!!side, pins:L.every(q=>q.n>0&&isFinite(q.tx)), h:h.slice(0,160)}; })()""")
    check('Map & Quests: the guild quest first, numbered pins, and the next step on the path (%s)' % q.get('next'), q['n'] >= 2 and q['act'] and q['actBoss'] and q['next'] and q['side'] and q['pins'], q)
    e = g.js("""(()=>{ var ev=new KeyboardEvent('keydown',{key:'Escape',bubbles:true}); document.dispatchEvent(ev); var a=ZPAUSE.cur(); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); return {open:a, closed:ZPAUSE.cur()}; })()""")
    check('Esc with nothing open opens the panel; Esc again resumes (%s)' % e, e['open'] is not None and e['closed'] is None, e)
    # the mob at the door
    m = g.js("""(()=>{ var cfg=ZRUSH.LV; var ps=game.scene.getScene('World').playerState, d0=ps.difficulty; var out={};
      [0,1,2,3].forEach(function(L){ ps.difficulty=L; var c=ZRUSH.cfg(); out[L]=[c.chase,c.boost,c.mob]; }); ps.difficulty=d0;
      var S={stairsDownTile:{x:10,y:10},monsters:[]}; for(var i=0;i<4;i++)S.monsters.push({x:10*TILE+16+i*20,y:10*TILE+16,_m:{aggro:true},cont:{visible:true,alpha:1},def:{}}); ps.difficulty=2; var b4=!!ZRUSH.blocked(S); var all=S.monsters.slice(); S.monsters=all.slice(0,2); var b2=!!ZRUSH.blocked(S); S.monsters=all; S.monsters[3]._m.aggro=false; var b3=!!ZRUSH.blocked(S); ps.difficulty=0; S.monsters[3]._m.aggro=true; var bh=!!ZRUSH.blocked(S); ps.difficulty=d0;
      return {cfg:out, b4:b4, b2:b2, b3:b3, bh:bh}; })()""")
    check('The mob at the door: 4 after you block the stairs at Shieldbearer, 2 never, one not after you does not count, never at Hearthside', m['b4'] and not m['b2'] and not m['b3'] and not m['bh'], m)
    check('The chase table (%s)' % m['cfg'], m['cfg']['0'] == [0, 1, 99] and m['cfg']['3'][0] == 12 and m['cfg']['3'][2] == 3, m)
print('%d / %d passed' % (sum(res), len(res)))
