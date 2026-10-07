"""Round 32–33 — icons ordered for every item and control; painted buildings are solid to the edges of their picture; the Site Lab no
longer makes the hero invincible by default (and a badge shows when he is); familiars do not heal while the hero fights; the hero's
death is shown (an effect, a pop-up with the gold lost and a story, a button to rise again) in ten designs.   Run: python tests/test_round33.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:460] if info != '' else ''), flush=True)
J = json.load(open(os.path.join(R, 'sprites', 'requests', 'scenery.json')))
ic = [q for q in J['requests'] if q['fam'] == 'icons']; ids = [i['id'] for q in ic for i in q['items']]
check('Icons: 16 sheets in waves 33–36, the control-bar sheet is the style anchor of the others', len(ic) == 16 and all(q['wave'] in (33, 34, 35, 36) and q['kind'] == 'icon' for q in ic) and all('sc_ic_ui_1' in q['refs'] for q in ic if q['id'] != 'sc_ic_ui_1'), [len(ic)])
with game(painted=True) as g:
    g.wait(2000)
    r = g.js("Object.keys(ITEMS).filter(function(k){ return !ZSCN.items().some(function(i){ return i.id==='ic_'+k; }); })")
    check('Every item in the game has its own icon on order (%d icons in all)' % len(ids), r == [] and len(ids) >= 300, r[:8])
    # buildings
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), L=_vbBlockRects(ws.wd), p=ws.wd.props.filter(function(q){return q.prop==='vbuild'&&q.o.core==='tavern';})[0], foot=(p.y+p.h)*32, cx=(p.x+p.w/2)*32, r=L.filter(function(q){ return Math.abs((q[0]+q[2])/2-cx)<14&&Math.abs(q[3]-foot)<6; })[0];
      ws.player.x=cx; ws.player.y=foot+40; var o={n:L.length,wider:r[0]<p.x*32&&r[2]>(p.x+p.w)*32,side:ws._canGo(r[0]+3,foot-20),beside:ws._canGo(r[0]-18,foot-20),door:ws._canGo(cx,foot+14),behind:ws._canGo(cx,r[1]+12),above:ws._canGo(cx,r[1]-10)};
      ws.player.x=cx; ws.player.y=foot-30; o.out=ws._canGo(cx,foot-26); ws.player.x=cx; ws.player.y=foot+40; ZScn.off=true; o.off=_vbBlockRects(ws.wd).length; ZScn.off=false; return o; })()""")
    check('A painted building is solid to the edges of its picture: not into its side or behind its roof; the door, the ground beside it and above its roof stay free', r['n'] >= 10 and r['wider'] and not r['side'] and r['beside'] and r['door'] and not r['behind'] and r['above'], r)
    check('A hero already standing inside (an old save) can walk out; with painted scenery off there are no such edges', r['out'] and r['off'] == 0, r)
    # sandbox
    r = g.js("({god:SITE_LAB.opts.god,ps:game.scene.getScene('World').playerState.godMode})")
    check('Site Lab: the hero is no longer invincible by default', r == {'god': False, 'ps': False}, r)
    g.js("game.scene.getScene('World').playerState.godMode=true"); g.wait(1600); a = g.js("(function(){ var e=document.getElementById('god-badge'); return !!e&&e.style.display!=='none'; })()")
    g.js("game.scene.getScene('World').playerState.godMode=false"); g.wait(1600); b = g.js("(function(){ var e=document.getElementById('god-badge'); return !!e&&e.style.display!=='none'; })()")
    check('A badge on screen says so whenever the hero is invincible', a and not b, [a, b])
    # familiars do not heal in combat
    r = g.js("""(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, c=_heroCtx(ws), E={col:'#80ff90',key:'grass'}, S={name:'Healing Bloom',kind:'heal',cd:9,pct:0.06}, LS={name:'Rekindle',kind:'laststand',cd:40,pct:0.3}, o={};
      ps.maxHp=100; ps.hp=50; delete ps._cbT; o.calm=_famCast(ws,'fam_grass',S,{x:c.x,y:c.y},c,ps,1,E); o.hpCalm=ps.hp;
      ps.hp=50; _heroCombatMark(ps); o.fight=_famCast(ws,'fam_grass',S,{x:c.x,y:c.y},c,ps,1,E); o.hpFight=ps.hp;
      ps.hp=20; o.lastFight=_famCast(ws,'fam_fire',LS,{x:c.x,y:c.y},c,ps,1,E); ps._cbT=Date.now()-7000; o.lastCalm=_famCast(ws,'fam_fire',LS,{x:c.x,y:c.y},c,ps,1,E); o.hpLast=ps.hp;
      o.in=_heroInCombat(ps); ps.hp=ps.maxHp; return o; })()""")
    check('Familiars heal when all is calm, and not while the hero fights (6 s after his last hit given or taken); the last-stand heal waits too', r['calm'] and r['hpCalm'] == 56 and not r['fight'] and r['hpFight'] == 50 and not r['lastFight'] and r['lastCalm'] and r['hpLast'] == 50 and not r['in'], r)
    # death
    r = g.js("(()=>{ var bad=[]; ZDEATH.LOOKS.forEach(function(L,i){ [84,0].forEach(function(gold){ var T=ZDeath.text(L,{area:'the tower',foe:'Goblin King',gold:gold,level:5,fam:null}); if(!T.title||!T.btn||!T.lines.length||!T.wake||/\\{/.test([T.title,T.sub,T.gold,T.wake,T.btn].concat(T.lines).join(' '))||(gold&&T.gold.indexOf('84')<0)||(!gold&&/\\d+ gold/.test(T.gold)))bad.push((i+1)+'/'+gold); if(gold&&T.bill&&T.bill.reduce(function(s,b){return s+b[1];},0)!==84)bad.push('bill'+(i+1)); }); }); return {n:ZDEATH.LOOKS.length,bad:bad,pick:ZDeath.pick,auto:ZDeath.auto}; })()")
    check('Ten death designs, each with a title, a story, the gold lost (or a line for an empty purse), what you wake with and a button', r['n'] == 10 and r['bad'] == [] and r['pick'] == 6 and r['auto'] is True, r)
    g.js("ZDeath.auto=false")
    a = g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState; ps.gold=500; ps.maxHp=100; ps._lastFoe='Meadow Goblin'; ps.hp=0; ws.player.x+=900; ws._worldPlayerDied(); return {gold:ps.gold,hp:ps.hp,hold:ZDeath._hold,blocked:_gameBlocked(),fx:!!document.getElementById('zdeath-fx'),x:ws.player.x}; })()")
    g.wait(2300)
    b = g.js("(()=>{ var ws=game.scene.getScene('World'), ps=ws.playerState, el=document.getElementById('modal-death'); return {gold:ps.gold,hp:ps.hp,shown:el&&el.style.display==='flex',paused:_PAUSE.active,txt:el?el.textContent:'',home:Math.abs(ws.player.x-(CENTER_X*TILE+TILE/2))<2}; })()")
    g.js("document.getElementById('zdeath-btn').click()"); g.wait(900)
    c = g.js("({shown:document.getElementById('modal-death').style.display,paused:_PAUSE.active,busy:ZDeath.busy,dying:game.scene.getScene('World')._dying,fx:!!document.getElementById('zdeath-fx'),filter:(document.querySelector('canvas').style.filter||'')})")
    check('Dying: first the effect over the screen while the game holds still, nothing taken yet', a['gold'] == 500 and a['hold'] and a['blocked'] and a['fx'], a)
    check('Then the pop-up: 10 % of the gold gone and named with the foe, the hero in the village at 25 % health, the game paused', b['gold'] == 450 and b['hp'] == 25 and b['shown'] and b['paused'] and '50' in b['txt'] and 'eadow' in b['txt'] and b['home'], {k: (v if k != 'txt' else v[:120]) for k, v in b.items()})
    check('The button closes it: the game runs again and the screen is clear', c == {'shown': 'none', 'paused': False, 'busy': False, 'dying': False, 'fx': False, 'filter': ''}, c)
    check('The Dev panel can choose a design and preview it', g.js("(function(){ sbDeathPick(); var t=document.getElementById('sb-death').textContent; ZDeath.set(6); sbDeathInit(); return /Death screen: 7/.test(t); })()"))
    check('No page errors', not g.errs, g.errs[:3])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
