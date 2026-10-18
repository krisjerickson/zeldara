"""Round 65 — a pop-up whenever a volcano or Asgard challenge starts (every forge floor, the collapse, the causeway, every citadel hall);
cut-scenes when Solmyrk and Surtharn change form (placeholders until painted); Solmyrk remade as painted options (wave 69) to pick in the
Lab; Surtharn's cut-scene panels ordered (wave 70); the painted shots, rubble and Asgard city (waves 67–68) in the game.
Run: python tests/test_round65.py"""
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
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; ZFT.on=true;
      var pop=function(){ var el=document.getElementById('modal-forgetrial'); var t=el?el.querySelector('h3').textContent:''; var p=isGamePaused(); if(el)el.querySelector('.zft-go').click(); return [t,p]; };
      ZFORGE.enter(ws,'volcano_e',1); await w(6500); o.forge1=pop(); await w(500);
      ZFORGE.enter(ws,'volcano_e',3); await w(6500); o.hearth=pop(); await w(500);
      ZMUSP.enter(ws,2); await w(6500); o.musp=pop(); await w(500);
      ZCIT.enter(ws,3); await w(6500); o.cit=pop(); await w(500);
      ZESC.freeze=true; ZESC.begin(ws,true); await w(6500); o.esc=pop(); await w(500); var D=game.scene.getScene('Dungeon'); D._exitToWorld(null); ps.muspEsc=0; await w(1500); ZESC.freeze=false;
      ps._zpCw=0; try{ ZESC.causeway(ws); }catch(e){} await w(600); o.cw=pop(); if(ws._cw&&ws._cw.g){ ws._cw.g.destroy(); ws._cw=null; } await w(400);
      return o; })()""" % W)
    check('Every forge floor opens with its challenge (Cinder, floor 2: %s; the hearth hall: %s), the game paused' % (r['forge1'][0], r['hearth'][0]), 'Cinder' in r['forge1'][0] and r['forge1'][1] and 'Hearth' in r['hearth'][0], r)
    check('Muspelheim\'s halls, the citadel\'s halls, the collapse and the sinking causeway too (%s / %s / %s / %s)' % (r['musp'][0], r['cit'][0], r['esc'][0], r['cw'][0]),
          'Muspelheim' in r['musp'][0] and 'Yggdrasil' in r['cit'][0] and 'falls' in r['esc'][0] and 'causeway' in r['cw'][0] and all(r[k][1] for k in ('musp', 'cit', 'esc', 'cw')), r)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; ZFT.on=false; ZCUT.on=true; ZCIT.enter(ws,4); await w(8000); var D=game.scene.getScene('Dungeon');
      var m=(D._bossGroup||[]).find(function(b){ return !b.dead; }); o.form=m&&m._gform; (D._bossGroup||[]).forEach(function(b){ b.dead=true; b.hp=0; }); D._onBossDefeated(m); await w(2600);
      var el=document.getElementById('zcut'); o.cut=!!el; o.paused=isGamePaused(); o.img=el?(el.querySelector('.zcut-img').src||'').slice(0,22):''; o.cap=el?el.querySelector('.zcut-cap').textContent:'';
      if(el)el.click(); await w(800); el=document.getElementById('zcut'); o.second=el?el.querySelector('.zcut-cap').textContent:''; if(el)el.querySelector('.zcut-skip').click(); await w(1200); o.closed=!document.getElementById('zcut')&&!isGamePaused();
      var m2=(D._bossGroup||[]).find(function(b){ return !b.dead; }); o.form2=m2&&m2._gform; D._exitToWorld(null); await w(1500);
      ZCUT.play('surtharn',4); await w(1500); var e2=document.getElementById('zcut'); o.surt=e2?e2.querySelector('.zcut-cap').textContent:''; if(e2)e2.querySelector('.zcut-skip').click(); await w(900); ZCUT.on=false; return o; })()""" % W)
    check('Solmyrk changes form behind a cut-scene: the game pauses, a placeholder panel plays (%s…) with its line ("%s"), then the next (“%s”); Skip ends it and form %s fights on' % (r['img'], r['cap'], r['second'], r.get('form2')),
          r['form'] == 1 and r['cut'] and r['paused'] and r['img'].startswith('data:image') and r['cap'] and r['second'] and r['second'] != r['cap'] and r['closed'] and r.get('form2') == 2, r)
    check('Surtharn\'s changes have their cut-scenes too ("%s")' % r['surt'], 'Jötunn' in r['surt'], r)
    r = g.js("""(()=>{ var D=game.scene.getScene('World'), o={}; var a=ZShot.make(D,'bolt:#c040ff',100,100,0,10), b=ZShot.make(D,'fireball',100,100,0,10); o.bolt=a&&a._zpj; o.fire=b&&b._zpj; o.tint=a&&a.tintTopLeft; if(a)a.destroy(); if(b)b.destroy(); o.orb=ZShot.mxKind('orb','#c040ff');
      o.city=['asc_longhouse','asc_meadhall','asc_statue_thor','asc_lamp'].map(function(id){ return ZCITY.has(id); }); o.rubble=['es_rubble_a','es_rock_fall'].map(function(id){ return ZCITY.has(id); }); return o; })()""")
    check('The painted monster shots are in (a bolt tinted its colour, a fireball; the orb flies as an orb: %s)' % r['orb'], r['bolt'] == 'pj_bolt' and r['fire'] == 'pj_fireball' and r['orb'].startswith('orb:'), r)
    check('Asgard\'s painted buildings, statues and lamps, and the collapse\'s painted rubble are in (%s, %s)' % (r['city'], r['rubble']), all(r['city']) and all(r['rubble']), r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])

S = json.load(open(os.path.join(ROOT, 'sprites/requests/scenery.json')))
L69 = [q for q in S['requests'] if q.get('wave') == 69]; L70 = [q for q in S['requests'] if q.get('wave') == 70]
n69 = {q['id']: len(q['items']) for q in L69}
txt = ' '.join(q['body'] for q in L69)
check('Ordered (scenery wave 69): Solmyrk\'s options — phase 1 ×3, phase 2 ×3 radiant + black, phase 3 ×8 (%s); golden not blue, no legs, the one eye, the binding arms' % n69,
      n69 == {'sc_gd_sol_1': 3, 'sc_gd_sol_2': 6, 'sc_gd_sol_3a': 4, 'sc_gd_sol_3b': 4} and 'NO blue' in txt and 'NO LEGS' in txt and 'ONE glowing eye' in txt and 'BINDING ARMS' in txt)
check('Ordered (scenery wave 70): Surtharn\'s five cut-scene panels (%d); round66.ps1 sends waves 69 and 70' % len(L70), len(L70) == 5 and '69,70' in open(os.path.join(ROOT, 'tools/sprites/round66.ps1')).read())
lab = open(os.path.join(ROOT, 'lab/index.html'), encoding='utf-8').read()
check('The Lab: Solmyrk\'s options to pick, one per phase, at the top of the Solmyrk group', 'LSOL' in lab and 'gd_sol_3_' in lab and 'bosses-' in lab)
print('\n%d / %d passed' % (sum(res), len(res)))
