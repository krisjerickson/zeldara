"""Round 55b — the round 55 sheets painted (group loops on the Green, forge hearths, Heartglass icons) and shown in the Lab ("Saga art"), and the
sandbox's Spirit Saga panel: eight arcs of milestone buttons, the built ones taking you there, the planned ones dashed and inert.
Run: python tests/test_round55b.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
ROOT = os.path.join(os.path.dirname(__file__), '..')
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()
CLICK = """(function(arc,row,i){ var A=document.querySelectorAll('#modal-saga .sbs-arc')[arc], R=A.querySelectorAll('.sb-site-row')[row], b=R.querySelectorAll('button')[i]; b.click(); return b.textContent; })"""

with game(new=True, painted=True) as g:
    g.wait(4000)
    r = g.js("""(()=>{ var Z=_scn(), ids=[]; ['ring','family','guard','hearth_tale','reel','sparring','mead_bench','tafl','tag','chaingang','haul','glima','archery','skald','lantern_parade','weaving','roast','knattleikr','rune_carving'].forEach(function(k){ for(var f=1;f<=4;f++)ids.push('gl_'+k+'_'+f); });
      ['ember','cinder','slag','ash'].forEach(function(k){ ids.push('ff_hearth_'+k); }); [1,2,3,4].forEach(function(q){ ids.push('ic_heartglass_'+q); }); return {n:ids.length, miss:ids.filter(function(i){ return !Z.has(i); })}; })()""")
    check('Waves 56–57 are painted and in the game: %d pictures (76 loop frames, 4 hearths, 4 Heartglass icons)' % r['n'], r['n'] == 84 and not r['miss'], r)
    g.js("(()=>{ document.getElementById('sandbox-panel').style.display='block'; document.getElementById('modal-sandbox').style.display='flex'; })()")
    r = g.js("""(()=>{ var b=Array.from(document.querySelectorAll('#sandbox-panel button')).find(function(b){ return /Spirit Saga/.test(b.textContent); }); if(!b)return {btn:false}; b.click();
      var M=document.getElementById('modal-saga'), A=M.querySelectorAll('.sbs-arc'); return {btn:true, shown:M.style.display, arcs:Array.from(A).map(function(a){ return a.querySelector('.sbs-h').textContent.slice(0,40); }),
        built:M.querySelectorAll('button[data-k]:not(.sbs-todo)').length, todo:M.querySelectorAll('button.sbs-todo').length, sandbox:document.getElementById('modal-sandbox').style.display}; })()""")
    check('The sandbox has a Spirit Saga button; it opens eight arcs (%s)' % ' · '.join(r.get('arcs', [])), r['btn'] and r['shown'] == 'flex' and len(r['arcs']) == 8 and r['sandbox'] == 'none', r)
    check('%d milestone buttons wired, %d planned ones drawn dashed' % (r['built'], r['todo']), r['built'] >= 35 and r['todo'] >= 6, r)
    g.shot('/tmp/round55b_saga.png')
    # a planned one does nothing but say so
    r = g.js("(async()=>{ var msg=null, n0=showNotif; showNotif=function(t){ msg=t; return n0.apply(this,arguments); }; document.querySelector('#modal-saga button.sbs-todo').click(); showNotif=n0; return {msg:msg, open:document.getElementById('modal-saga').style.display, scene:game.scene.isActive('World')}; })()")
    check('A planned milestone only says it is not built yet ("%s")' % (r['msg'] or '')[:70], r['msg'] and 'not built yet' in r['msg'] and r['open'] == 'flex', r)
    # III. the Glimmerhall
    g.js("SBSAGA.show()"); g.js(CLICK + "(2,1,1)"); g.wait(8000)
    r = g.js("(()=>{ var ws=game.scene.getScene('World'), D=ZSPIRIT.door(); return {door:!!D, d:D?Math.round(Math.hypot(ws.player.x-D.x,ws.player.y-D.y)):-1, sh:ws.playerState.inventory.filter(function(i){ return i==='soulglass_2'; }).length}; })()")
    check('Ⅲ "6 shards → 2": the Glimmerhall stands, you are at its door with %d Wetlands shards' % r['sh'], r['door'] and 0 <= r['d'] < 80 and r['sh'] >= 6, r)
    # IV. Mira's workshop
    g.js("SBSAGA.show()"); g.js(CLICK + "(3,0,0)"); g.wait(8000)
    r = g.js("(()=>{ var ws=game.scene.getScene('World'), D=ZMIRA.door(); return {door:!!D, d:D?Math.round(Math.hypot(ws.player.x-D.x,ws.player.y-D.y)):-1}; })()")
    check('Ⅳ "Workshop": Mira\'s workshop is built and you are at its door', r['door'] and 0 <= r['d'] < 80, r)
    g.js("SBSAGA.show()"); g.js(CLICK + "(3,3,2)"); g.wait(3000)
    r = g.js("(()=>({tray:game.scene.getScene('World').playerState.inventory.indexOf('hearth_tray_3')>=0}))()")
    check('Ⅳ "Hearth tray 3": the Slag Forge\'s tray is in the pack', r['tray'], r)
    # V. a forge-master's floor directly
    g.js("SBSAGA.show()"); g.js(CLICK + "(4,2,3)"); g.wait(12000)
    r = g.js("(()=>{ var D=game.scene.getScene('Dungeon'), ps=game.scene.getScene('World').playerState; return {run:game.scene.isActive('Dungeon'), forge:D._forge&&ZFORGE.of(D).k, last:D.isLastFloor, boss:D._bossGroup&&D._bossGroup[0]&&D._bossGroup[0].def.name, keyN:ps.inventory.indexOf('volcano_key_n')>=0, title:document.getElementById('dng-title').textContent}; })()")
    check('Ⅴ "Cinder 4 ☠": straight to the forge-master\'s floor ("%s", %s), the Ember key given for the way in' % (r['title'], r['boss']), r['run'] and r['forge'] == 'cinder' and r['last'] and 'Hissa' in (r['boss'] or '') and r['keyN'], r)
    # back out, then I. a bindstone
    g.js("game.scene.getScene('World').playerState.godMode=true"); g.js("SBSAGA.show()"); g.js(CLICK + "(0,0,3)"); g.wait(6000)
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, S=ZSPIRIT.shrines(ws).filter(function(s){ return s.q===4; }), n=S.reduce(function(b,s){ return Math.min(b,Math.hypot(ws.player.x-s.x,ws.player.y-s.y)); },1e9);
      return {world:game.scene.isActive('World'), dng:game.scene.isActive('Dungeon'), near:Math.round(n), open:(ps.unlockedSections||[]).indexOf(4)>=0}; })()""")
    check('Ⅰ "Bindstone 4": out of the forge and beside an Ashlands bindstone (%d px), the realm open' % r['near'], r['world'] and not r['dng'] and r['near'] < 260 and r['open'], r)
    # II. the Green with all forty
    g.js("SBSAGA.show()"); g.js(CLICK + "(1,0,3)"); g.wait(7000)
    r = g.js("(()=>{ var ws=game.scene.getScene('World'), S=ws._zg; return {freed:ws.playerState.spiritsFreed.length, open:document.getElementById('modal-saga').style.display, d:Math.round(Math.hypot(ws.player.x-CENTER_X*TILE,ws.player.y-CENTER_Y*TILE)), live:S?Object.keys(S.sp).length:0, loops:S?S.groups.filter(function(G){ return G.im&&G.im.anims; }).length:0}; })()")
    check('Ⅱ "40": all forty freed, you stand on the Green among them (%d there, %d groups playing their painted loops)' % (r['live'], r['loops']), r['freed'] == 40 and r['open'] == 'none' and r['d'] < 600 and r['live'] == 40, r)
    r = g.js("(()=>{ var W=ZSCN.SHEETS.filter(function(S){ return S.wave===58; }); return {ids:W.map(function(S){ return S.id; }), n:W.reduce(function(a,S){ return a+S.items.length; },0)}; })()")
    check('Wave 58 ordered: four option sheets for Muspelheim (%d options)' % r['n'], len(r['ids']) == 4 and r['n'] == 28, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

check('Round 56 prep: the Lab\'s Muspelheim tab (Surtharn, spirit walls, halls, great hearth, Lodestar, ash-wardens)', re.search(r"id:['\"]muspel", lab) and 'Surtharn, Tyrant of Muspelheim' in lab and 'round56.ps1' in lab)
check('The Lab shows the saga art (the moving groups and the four forges)', re.search(r"id:['\"]sagaart", lab) and 'The four forges' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
