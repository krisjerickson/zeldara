"""Round 64 — the bosses re-cut (no pieces of the next pose under a frame; one scale per boss sheet so a boss no longer changes size between
frames); GRÍMNIR MADE A GOD: new god options for each form that pulse between radiant light and black, name options in the Lab, painted
concept options ordered (wave 66); in the fight he is SHIELDED while radiant and OPEN while black, form 1 mostly light, form 2 even,
form 3 mostly black (Kris's cards), and Godsbane tears the light off him.
Run: python tests/test_round64.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
ROOT = os.path.join(os.path.dirname(__file__), '..')

with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(()=>{ var o={}; [1,2,3].forEach(function(f){ var F=ZGOD.FORMS[f], n=0, lt=0; for(var t=0;t<60;t+=0.05){ n++; if(ZGOD.light(f,t)>0.5)lt++; } o[f]=Math.round(lt/n*100); });
      o.gods=['grim_1','grim_2','grim_3'].map(function(s){ return (BOSS_SLOTS[s]||[]).filter(function(D){ return D.arch==='god'; }).length; }); o.pick=['grim_1','grim_2','grim_3'].map(function(s){ return BA.of(s).arch; });
      var D=BA.of('grim_1'); BA.paint(D); o.eye=ZGOD.eye(D); o.names=GRIM_NAMES.length; return o; })()""")
    check('The beat: form 1 is mostly light (%d%%), form 2 even (%d%%), form 3 mostly black (%d%%)' % (r['1'], r['2'], r['3']), r['1'] > 70 and 40 <= r['2'] <= 60 and r['3'] < 30, r)
    check('Three new god options for each form (%s), the game draws a god until Kris picks (%s); ten name options' % (r['gods'], r['pick']), r['gods'] == [3, 3, 3] and r['pick'] == ['god'] * 3 and r['names'] == 10, r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState; ps.godMode=true; ZCIT.enter(ws,4); await w(7000); var D=game.scene.getScene('Dungeon'), o={};
      var m=(D._bossGroup||[]).find(function(b){ return !b.dead; }); if(!m){ await w(2000); m=(D._bossGroup||[]).find(function(b){ return !b.dead; }); } o.form=m&&m._gform;
      m._gp={t:1,force:0}; await w(300); o.shine=m._grimShine; o.hitLight=ZHit.dmg(D,m,200,'melee'); o.vis=!!(D._gpv&&D._gpv.dark&&D._gpv.rays&&D._gpv.eye); o.darkA=D._gpv.dark.alpha;
      m._gp={t:7.6,force:0}; await w(300); o.shine2=m._grimShine; o.hitDark=ZHit.dmg(D,m,200,'melee'); o.darkA2=D._gpv.dark.alpha; o.tint=m.body&&m.body.tintTopLeft;
      m._gp={t:1,force:0}; await w(200); ZGP.force(D); await w(200); o.forced=m._grimShine;
      (D._bossGroup||[]).forEach(function(b){ b.dead=true; b.hp=0; }); D._onBossDefeated(m); await w(2000); var m2=(D._bossGroup||[]).find(function(b){ return !b.dead; }); o.form2=m2&&m2._gform;
      D._exitToWorld(null); await w(1500); return o; })()""" % W)
    check('In the fight: radiant he is shielded (hit %s), black he is open (hit %s); the room darkens only when black (%.2f → %.2f); Godsbane forces him black' % (r.get('hitLight'), r.get('hitDark'), r.get('darkA', 0), r.get('darkA2', 0)),
          r['form'] == 1 and r['shine'] and r['hitLight'] == 0 and not r['shine2'] and r['hitDark'] > 0 and r['vis'] and r['darkA'] < 0.05 and r['darkA2'] > 0.5 and r['forced'] is False, r)
    check('The next form keeps the pulse (form %s)' % r.get('form2'), r.get('form2') == 2, r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

req = json.load(open(os.path.join(ROOT, 'sprites', 'requests', 'scenery.json'), encoding='utf8'))
w66 = [q for q in req['requests'] if q.get('wave') == 66]
check('Ordered (wave 66): painted concept options for each form, radiant and black (%d sheets, %d pictures)' % (len(w66), sum(len(q.get('items', [])) for q in w66)), len(w66) == 3)
lab = open(os.path.join(ROOT, 'lab', 'index.html'), encoding='utf8').read()
check('The Lab: Grímnir\'s names and the pulsing god cards are in the Bosses tab', 'GRIM_NAMES' in lab and 'LGOD' in lab and 'bb-name' in lab)
I = json.load(open(os.path.join(ROOT, 'assets', 'atlas', 'index.json')))
miss = [p for p in I['pages'] if not os.path.exists(os.path.join(ROOT, 'assets', 'atlas', p + '.webp'))]
check('The re-cut boss atlases are all there (%d pages)' % len(I['pages']), not miss, miss)
src = open(os.path.join(ROOT, 'tools', 'sprites', 'intake.py'), encoding='utf8').read()
check('The cutter: loose bits below a pose\'s feet go to the pose underneath; bosses keep one scale per sheet', "below = lambda k" in src and "q['group'] == 'boss'" in src)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
