"""Round 113: the villagers' voices and their requests (Kris's picks in the Lab, "Villagers & side quests").
python tests/test_round113.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3000)
    a = g.js("""(()=>{ var bad=[]; ZNPCQ.Q.forEach(q=>{ if(!ZNPCQ.NPC[q.giver])bad.push(q.id+':giver'); var R=[q.reward].concat((q.choice||[]).map(c=>c.rw)).concat(q.steps.map(s=>s.each)).filter(Boolean); R.forEach(r=>(r.items||[]).forEach(x=>{ if(!ITEMS[x[0]])bad.push(q.id+':'+x[0]); })); q.steps.forEach(s=>{ if(s.to&&!ZNPCQ.NPC[s.to])bad.push(q.id+':to '+s.to); }); });
      return {n:ZNPCQ.Q.length, riddles:ZNPCQ.Q.filter(q=>q.riddle).length, choice:ZNPCQ.Q.filter(q=>q.choice).length, bad:bad, voices:Object.keys(ZVOICE.V).length}; })()""")
    check('25 requests from 24 villagers (4 riddles, a reward to choose), every giver, target and reward known; 34 voices (%s)' % a, a['n'] == 25 and a['riddles'] >= 4 and a['choice'] >= 1 and not a['bad'] and a['voices'] == 34, a)
    # set the scene: past the first walk and Oswin's first tasks
    g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.walk='done'; ps.oswin=2; var T=ZOSW.tq(ps); T.camp=3; T.net=3; ZDLG.on=false; ps.gold=0; ps.tracked=null; })()""" % WS)
    b = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var off=ZNPCQ.offers(ws); var r=ZNPCQ.talk(ws,'nell'); var S=ZNPCQ.st(ps,'oxhead'); var T=ZNPCQ.things(ws).filter(t=>t.q.id==='oxhead');
      var P=T[0]&&T[0].P; if(P){ ws.player.x=P.x; ws.player.y=P.y+8; } var took=ZNPCQ.take(ws); var g0=ps.gold; ZNPCQ.talk(ws,'nell'); var S2=ZNPCQ.st(ps,'oxhead');
      return {off:off.indexOf('nell')>=0, talked:r, accepted:!!S, thing:T.length, took:took, done:!!(S2&&S2.done), gold:ps.gold-g0, fish:ps.inventory.filter(i=>i==='grilled_fish').length, tracked:ps.tracked}; })()""" % WS)
    check("A request: Old Nell offers it, the ox skull lies in the world, Tab takes it, she pays (%s)" % b, b['off'] and b['talked'] and b['accepted'] and b['thing'] == 1 and b['took'] and b['done'] and b['gold'] == 100 and b['fish'] >= 3, b)
    c = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZNPCQ.talk(ws,'morwen'); var q=ZNPCQ.BY.spoon, S=ZNPCQ.st(ps,'spoon'); var see0=ZNPCQ.things(ws).filter(t=>t.q.id==='spoon').length;
      ZNPCQ.talk(ws,'morwen'); var see1=ZNPCQ.things(ws).filter(t=>t.q.id==='spoon').length; ZNPCQ.talk(ws,'morwen'); var T=ZNPCQ.things(ws).filter(t=>t.q.id==='spoon'); var see2=T.length;
      ps.tracked='nq:spoon'; var mark=ZJOUR.sideT(ws); ws.player.x=T[0].P.x; ws.player.y=T[0].P.y; var g0=ps.gold; ZNPCQ.take(ws); var S2=ZNPCQ.st(ps,'spoon');
      return {accepted:!!S, see0:see0, see1:see1, see2:see2, hints:S2.h, mark:mark&&mark.t, done:!!S2.done, gold:ps.gold-g0}; })()""" % WS)
    check("A riddle: asking Morwen again gives hints; the place shows only after two; each hint costs a tenth (%s)" % c, c['accepted'] and c['see0'] == 0 and c['see1'] == 0 and c['see2'] == 1 and c['hints'] == 2 and 'stone' in (c['mark'] or '') and c['done'] and c['gold'] == 160, c)
    d = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var J=ZJOUR.html(ws); return {jour:/Villagers' requests/.test(J), rows:(J.match(/Proper Paperwork|The Ox-Head Bait|Prophecy/g)||[]).length}; })()""" % WS)
    check("The journal lists the villagers' requests (%s)" % d, d['jour'] and d['rows'] >= 1, d)
    e = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZNPCQ.talk(ws,'greta'); var S=ZNPCQ.st(ps,'wheel'); ZNPCQ._extra=null; ZNPCQ.talk(ws,'greta'); var X=ZNPCQ._extra; X&&X[1].f(); var h=S.h; ZNPCQ._extra=null; ZNPCQ.talk(ws,'greta'); X=ZNPCQ._extra; X&&X[0].f(); return {opts:X&&X.length, wrongHint:h, step:S.s}; })()""" % WS)
    check("A choice: Greta's gears — a wrong order gives a hint, the right one moves on (%s)" % e, e['opts'] == 3 and e['wrongHint'] == 1 and e['step'] == 1, e)
    f = g.js("""(()=>{ var ws=%s, ps=ws.playerState; (ps.completedQuests=ps.completedQuests||[]).push('s1_tower'); ZVOICE.tick(); var b=ws._zvFolk&&ws._zvFolk.zv_bram; var n=(ws._villageNPCs||[]).find(x=>x.id==='zv_bram');
      ZVOICE.tick(); var tob=(ws._villageNPCs||[]).find(x=>x.id==='vf_farmer'); var mk=ws._zvMk&&ws._zvMk.vf_farmer&&ws._zvMk.vf_farmer.text;
      var lines=['benno','morwen','tilda','oswin','twin'].map(k=>ZVOICE.line(k,ps,k==='twin'||k==='oswin'?'talk':'shop')); return {bram:!!b, talk:!!(n&&n.talk), tobMark:mk, lines:lines.every(Boolean), sample:lines[1]}; })()""" % WS)
    check("Bram comes home once freed and can be talked to; a '!' over Tob, who has a request; the shopkeepers and Oswin have their voices (%s)" % f, f['bram'] and f['talk'] and f['tobMark'] == '!' and f['lines'], f)
    h = g.js("""(()=>{ var ws=%s, ps=ws.playerState, n=(ws._villageNPCs||[]).find(x=>x.id==='vf_farmer'); ZVOICE._lastBark=0; ZVOICE._bark={}; var ft=ws._floatText, said=null; ws._floatText=function(x,y,t){ said=t; }; var tries=0;
      while(!said&&tries<30){ ws.player.x=n.x+TILE*2; ws.player.y=n.y; ZVOICE._lastBark=0; ZVOICE._bark={}; ZVOICE.barks(ws); tries++; } ws._floatText=ft; return {said:said}; })()""" % WS)
    check("Passing remarks: walk by Tob and he says something (%s)" % h, h['said'], h)
    k = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.tracked=null; ps.nq.paperwork={s:0,got:{},h:0,kn:0,in:{}}; var S=ZNPCQ.st(ps,'paperwork'); var w=ZNPCQ.talk(ws,'tob'); var g0=ps.gold; ZNPCQ.talk(ws,'hesk'); var S2=ZNPCQ.st(ps,'paperwork'); return {acc:!!S, wrong:w, step:S2.s, done:!!S2.done}; })()""" % WS)
    check("A delivery riddle: the wrong villager says so; Hesk is right (%s)" % k, k['acc'] and k['wrong'] and (k['done'] or k['step'] >= 1), k)
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
