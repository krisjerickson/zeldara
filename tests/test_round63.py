"""Round 63 — the round 62 paintings wired (forge-trial pieces, Asgard's citadel pieces, Ratatoskr running, the einherjar); the Lab's Bosses tab
cleaned up with group buttons (Grímnir first); Godsbane is Grímnir's weak point in his last phase; THE ENDING at the rune circle (the spirits go
home along the Bifröst remade into heaven) with its story panels ordered as Lab options; credits paused (Kris).
Run: python tests/test_round63.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(()=>{ var Z=_scn(); return {props:['fr_anvil','fr_quench','fr_bellows','fr_orevein','fr_cart','fr_switch','fr_spiritdoor','ar_lens','ar_brazier','ar_thread','ar_norns','ar_grimtooth','ar_rat_1','ar_rat_4'].filter(function(k){ return !Z.has(k); }),
      mons:['einherjar_berserker','einherjar_shieldmaiden','einherjar_archer','gjallar_warden'].filter(function(k){ return !ZAtlas.has(k); })}; })()""")
    check('The round 62 paintings are in: every forge-trial and citadel piece, Ratatoskr\'s run, the einherjar and the Gjallar Warden', not r['props'] and not r['mons'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZCIT.enter(ws,3); await w(6000); var D=game.scene.getScene('Dungeon'), R=D._cit.rat, o={anim:!!(R.vis.list[0]&&R.vis.list[0].anims&&R.vis.list[0].anims.isPlaying)};
      ZCIT.enter(ws,4); await w(6500); D=game.scene.getScene('Dungeon'); for(var ph=0;ph<2;ph++){ var b=(D._bossGroup||[]).find(function(m){ return !m.dead; }); if(!b){ await w(1500); b=(D._bossGroup||[]).find(function(m){ return !m.dead; }); } (D._bossGroup||[]).forEach(function(m){ m.dead=true; m.hp=0; }); D._onBossDefeated(b); await w(1600); }
      var last=(D._bossGroup||[]).find(function(m){ return !m.dead; }); o.weak=!!(last&&last.godsbaneWeak); o.name=last&&last.def.name; D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('Ratatoskr runs (the painted loop); Grímnir\'s last phase (%s) has Godsbane for its weak point' % r.get('name'), r['anim'] and r['weak'], r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.asgardDown=1; ps.bifrost=1; ps.grimnirDown=1; if(ps.inventory.indexOf('lodestar')<0)ps.inventory.push('lodestar'); await w(2500);
      var H=ZASG.heart(ws); ws.player.x=H.x+200; ws.player.y=H.y; await w(400); var far=ZEND.check(ws); ws.player.x=H.x; ws.player.y=H.y+10; await w(400); var t=ws._interactPrompt&&ws._interactPrompt._zt;
      ZEND.play(ws); await w(19000); var mid={busy:ws._endBusy, n:ZEND.count}; await w(22000);      /* round 64: the painted story panels now play between */ return {far:far, prompt:t, mid:mid, home:ps.spiritsHome, busy:ws._endBusy, bars:document.getElementById('zcine-top')&&document.getElementById('zcine-top').style.height}; })()""" % W)
    check('The ending: in the world-tree circle at Asgard\'s heart the Lodestar casts Godsbane into the sky ("%s"); the forty spirits rise along the Bifröst into heaven (%s); then you play on' % (r['prompt'], r['mid']['n']),
          not r['far'] and r['prompt'] and 'Godsbane' in r['prompt'] and r['mid']['busy'] and r['mid']['n'] == 40 and r['home'] == 1 and not r['busy'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

req = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'sprites', 'requests', 'scenery.json'), encoding='utf8'))
w65 = [q['id'] for q in req['requests'] if q.get('wave') == 65]
check('Ordered (wave 65): the ending\'s story panels, two options each (%d)' % len(w65), len(w65) == 8)
lab = open(os.path.join(os.path.dirname(__file__), '..', 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: the Bosses tab has group buttons (Grímnir first) and the ending panels are in the Asgard tab', 'bb-nav' in lab and 'bb-go' in lab and 'pn_end_cast_a' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
