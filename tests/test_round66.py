"""Round 66 — Asgard's golden roads painted (gold-inlaid flagstones, a rune border, rune medallions whose light runs to the heart); the hero's
staff pose in every scene and his Lodestar / Godsbane sheets ordered; Godsbane reaches the edge of the screen; one notification per message
(it pulses instead of stacking); the outline behind a boss; Solmyrk's new sheets and cut-scene panels in.
Run: python tests/test_round66.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
ROOT = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
W = "var w=function(ms){ return new Promise(function(r){ setTimeout(r,ms); }); };"
with game(new=True, painted=True) as g:
    g.wait(4500)
    r = g.js("""(async()=>{ %s var ws=game.scene.getScene('World'), ps=ws.playerState, o={}; ps.godMode=true; ZFT.on=false;
      for(var i=0;i<6;i++)showNotif('Special on cooldown: '+(6-i)+'s remaining','#aaaaaa'); var A=document.getElementById('notif-area'), L=[].filter.call(A.children,function(d){ return /Special on cooldown/.test(d.textContent); });
      o.notes=L.length; o.noteTxt=L[0]&&L[0].textContent; o.pulse=!!(L[0]&&L[0].classList.contains('notif-pulse')); showNotif('Not enough mana! (need 20)','#4466ff'); o.other=[].filter.call(A.children,function(d){ return /mana/.test(d.textContent); }).length;
      ps.equip.spell='frost_bolt_tome'; ps.equip.mWeapon='ember_staff'; ps.mana=999; ps.maxMana=999; ZCIT.enter(ws,1); await w(8000); var D=game.scene.getScene('Dungeon');
      D.monsters.slice().forEach(function(m){ m.dead=true; m.hp=0; if(m.cont)m.cont.destroy(); }); D.monsters.length=0;
      _heroCastSpell(D); await w(120); o.cast=[D.pWalkSt.castAnim, D.pWalkSt.anim];
      ps.equip.mWeapon='lodestar'; if(!ITEMS.lodestar)o.noLodestar=true; ps.mana=999; _heroSpellCdUntil=0; _heroCastSpell(D); await w(120); o.castL=[D.pWalkSt.castAnim, D.pWalkSt.anim];
      ps.godsbane=true; ps._gbUntil=0; ZGODS.cast(D); await w(80); o.gb=[D.pWalkSt.castAnim, D.pWalkSt.anim]; var cam=D.cameras.main, v=cam.worldView; o.reach=Math.round(ZGODS.reach(D,D.px,D.py,1,0)); o.edge=Math.round(v.right-D.px);
      var b=MX.spawn(D,'mgb_rift_tower',D.px,D.py+40,{q:4,temp:true}); b.isBoss=true; D.monsters.push(b); b.hp=b.maxHp=99999; await w(600); if(b._m){ b._m.frozen=true; b._m.aggro=false; } b.atk=0;
      var r=b.cont.getBounds(); D.px=b.x; D.py=b.y-Math.min(60,r.height*0.4); if(D.pCont)D.pCont.setPosition(D.px,D.py); await w(2500);
      var S=D._zol; o.ol=S&&S.rt&&{vis:S.rt.visible,mask:!!S.rt.mask,dep:S.rt.depth,dx:Math.round(S.rt.x+S.rt.width/2-D.px)}; b.dead=true; b.cont.destroy(); D.monsters.length=0; D._exitToWorld(null); await w(1500);
      o.sol=['grim_1','grim_2','grim_3'].map(function(c){ return ZAtlas.has(c)&&ZAtlas.count(c,'idle','s')>0; }); o.pn=['pn_sol_0','pn_sol_12_a','pn_sol_23_b'].map(function(k){ return !!ZCUT.painted(k); });
      SBSAGA.asg('city'); await w(6000); o.road=ZROAD._last; o.layers=(ZROAD._layers||[]).filter(function(C){ return C.scene; }).map(function(C){ return [C.list.length,!!C.mask]; });
      var H=ZASG.heart(ws), RR=ZCITY.RING*TILE; o.inside=0; return o; })()""" % W)
    check('Spamming a message shows ONE notification that takes the new words and pulses (%d shown: "%s")' % (r['notes'], r['noteTxt']), r['notes'] == 1 and '1s' in (r['noteTxt'] or '') and r['pulse'] and r['other'] == 1, r)
    check('A spell in an adventure site plays the staff pose (%s)' % r['cast'], r['cast'][0] == 'magic_staff' and r['cast'][1] == 'magic_staff', r)
    check('With the Lodestar in hand: its own pose, the staff frames until painted (%s); Godsbane its own pose (%s)' % (r['castL'], r['gb']), r['castL'][0] == 'magic_lodestar' and r['castL'][1] in ('magic_staff', 'magic_lodestar') and r['gb'][0] == 'godsbane', r)
    check('Godsbane reaches the edge of the screen (%s px; the edge is %s px away)' % (r['reach'], r['edge']), r['reach'] >= r['edge'] and r['reach'] >= 440, r)
    check('Behind a boss: the whole outline with a see-through hero, above the boss, at the hero (%s)' % r['ol'], r['ol'] and r['ol']['vis'] and r['ol']['dep'] >= 13.2 and abs(r['ol']['dx']) < 30, r)
    check('Solmyrk\'s new sheets are in the atlas (%s) and his cut-scene panels are painted (%s)' % (r['sol'], r['pn']), all(r['sol']) and all(r['pn']), r)
    check('Asgard\'s roads: four roads baked into %s plain tiles (no masks — round 66c), %s medallions' % (r['road'] and r['road'].get('baked'), r['road'] and r['road'].get('meds')), r['road'] and r['road']['paths'] == 4 and r['road']['meds'] >= 12 and r['road']['baked'] > 50 and not r['layers'], r)
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No script errors', not errs, errs[:4])
S = [q for q in json.load(open(os.path.join(ROOT, 'sprites/requests/scenery.json')))['requests'] if q.get('wave') == 73]
check('Ordered (scenery wave 73): the road paving, rim and ring; four rune medallions (%s)' % [q['id'] for q in S], [q['id'] for q in S] == ['sc_asg_road_tex', 'sc_asg_road_med'] and len(S[0]['items']) == 3 and len(S[1]['items']) == 4)
Q = [q for q in json.load(open(os.path.join(ROOT, 'sprites/requests/requests.json')))['requests'] if q['id'].startswith('hero_') and 'lodestar' in q['id']]
check('Ordered: the hero\'s Lodestar sheets, boy and girl (%d), with the Lodestar\'s painting as a reference; Godsbane in front, side and back' % len(Q), len(Q) == 8 and all('lodestar_ref' in q['refs'] for q in Q) and sum(1 for q in Q if '.lodestar.' in q['id']) == 6)
ps = open(os.path.join(ROOT, 'tools/sprites/round69.ps1')).read()
check('round69.ps1 sends wave 73 and the eight hero sheets', '--wave 73' in ps and ps.count('hero_') == 8)
print('\n%d / %d passed' % (sum(res), len(res)))
