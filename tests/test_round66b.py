"""Round 66b — the Lodestar sheets and Asgard's painted roads in; the freed spirits leave the Runestone Green once they have gone home.
Run: python tests/test_round66b.py"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; ZFT.on=false;
      o.fr=['hero_m','hero_f'].map(function(h){ return [ZAtlas.count(h,'magic_lodestar','s'),ZAtlas.count(h,'godsbane','f'),ZAtlas.count(h,'godsbane','b'),ZAtlas.count(h,'lodestar_raise','s'),ZAtlas.count(h,'lodestar_set','s')]; });
      ps.equip.spell='frost_bolt_tome'; ps.equip.mWeapon='lodestar'; ps.mana=999; var seen=[], hk=function(){ seen.push(ws.player.anim); }; ws.events.on('postupdate',hk); _heroCastSpell(ws); await w(2500); ws.events.off('postupdate',hk); o.pose=seen.filter(function(a){ return /^magic_/.test(a||''); })[0]||seen[seen.length-1];      /* headless runs at ~3 fps: the 0.45 s pose may last one frame — every frame's pose is recorded */
      o.tex=['tx_asg_road','tx_asg_rim','tx_asg_plaza'].map(ZROAD.painted); o.med=['asr_med_a','asr_med_d'].map(function(k){ return ZCITY.has(k); });
      ps.spiritsFreed=(ZSPIRIT.shrines(ws)||[]).slice(0,12).map(function(s){ return s.id; }); var c=ZGREEN.center(); ws.player.x=c.x; ws.player.y=c.y+120; ws.player.cont.setPosition(ws.player.x,ws.player.y); await w(2500);
      o.before=ws._zg?Object.keys(ws._zg.sp).length:0; ps.spiritsHome=1; await w(1500); o.after=ws._zg?Object.keys(ws._zg.sp).length:0; return o; })()""" % W)
    check('The hero\'s Lodestar frames are in, boy and girl (spell, Godsbane front/back, raise, set: %s)' % r['fr'], all(all(n > 0 for n in h) for h in r['fr']), r)
    check('A spell with the Lodestar in hand plays its own painted pose (%s)' % r['pose'], r['pose'] == 'magic_lodestar', r)
    check('Asgard\'s roads are painted: paving, rim, ring (%s) and the medallions (%s)' % (r['tex'], r['med']), all(r['tex']) and all(r['med']), r)
    check('Once the spirits have gone home they leave the Runestone Green (%d → %d)' % (r['before'], r['after']), r['before'] > 0 and r['after'] == 0, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
