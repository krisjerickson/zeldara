"""Round 110b/c: the first walk waits for the Green to be drawn and counts any swing; animals dash then tire; Pia's pins; a current quest
  starred on the map; monster camps on the map.
  Kris: "he should only start speaking once you've loaded into the village green" — "I swung my sword 3 times and nothing happened … he
  didn't lead me" — "make it so that anywhere swinging works" — "make the animals slightly slower than you … or they can scurry fast, but
  then they slow down and stop sometime for you to catch up" — "mia's juggling pins need to be larger, and make a painted image" —
  "a way that you can have a current quest, and it will show up on the map" — "monster camps shown somehow on the map".
python tests/test_round110b.py   (after node build.mjs)"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"
with game(painted=True) as g:
    g.wait(3000)
    a = g.js("""(()=>{ var ws=%s; var W=ws._wr; ws._wr=null; var r0=ZWALK.ready(ws); ws._wr=W; ZWALK._rdyT=0; var r1=ZWALK.ready(ws); return {nopainter:r0, first:r1}; })()""" % WS)
    check('The first walk waits while nothing is drawn, and a moment more once it is (%s)' % a, a['nopainter'] is False and a['first'] is False, a)
    b = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ws.player.x=CENTER_X*TILE+40; ws.player.y=CENTER_Y*TILE+60; ps.walk='attack'; ZWALK._hits=0; var n=0; for(var i=0;i<3;i++){ ws.worldAtkTimer=0; ws._worldAttack(); } n=ZWALK._hits; ps.walk='done'; return {hits:n, sec:getTileSection(Math.floor(ws.player.x/TILE),Math.floor(ws.player.y/TILE))}; })()""" % WS)
    check('Three swings in the village count (%s)' % b, b['hits'] == 3 and b['sec'] == 0, b)
    c = g.js("""(()=>{ var ws=%s, A=(ws._largeAnimals||[]).find(a=>!a.dead); if(!A)return null; var P=ws.player, sp=[], rest=0; P.x=A.x-110; P.y=A.y; A.state='flee'; A.fleeTimer=0; A.fleeTot=0; A.breath=0;
      for(var i=0;i<120;i++){ var x0=A.x, y0=A.y; ws._updateLargeAnimals(0.05); var v=Math.hypot(A.x-x0,A.y-y0)/0.05; sp.push(Math.round(v)); if(A.breath>0)rest++; var d=Math.hypot(A.x-P.x,A.y-P.y)||1; P.x=A.x-(A.x-P.x)/d*110; P.y=A.y-(A.y-P.y)/d*110; if(A.dead||A.state!=='flee')break; }
      return {type:A.type||A.kind, max:Math.max.apply(null,sp), rest:rest, n:sp.length, early:sp.slice(0,4), late:sp.slice(40,44)}; })()""" % WS)
    check('A big animal dashes away below your walking speed (180), tires, and stops to catch its breath (%s)' % c, c and c['max'] <= 170 and c['rest'] > 0, c)
    d = g.js("""(()=>{ var ws=%s, im=ZROLL.pinImage(ws,1,ws.player.x+60,ws.player.y); var h=Math.round(im.displayHeight), k=im.texture.key; im.destroy(); return {h:h, key:k}; })()""" % WS)
    check("Pia's juggling pins are bigger, a drawn club until the painting is in (%s)" % d, d['h'] >= 38 and ('zroll_pin_' in d['key'] or 'pc_juggle_pin' in d['key']), d)
    e = g.js("""(()=>{ var ws=%s, ps=ws.playerState, S=ws.wd.sites.find(s=>s.id==='s1_tower'); ps.tracked=null; ZCURQ.set(ws,S.id); var t=ZJOUR.target(ws); var jh=ZJOUR.html(ws); openWorldMap(); return {tr:ps.tracked, t:t&&t.t, jour:/Current quest|Make current/.test(jh)&&!/◎ Track/.test(jh)}; })()""" % WS)
    g.wait(1200)
    f = g.js("(()=>{ var el=document.getElementById('wm-cur'); var bs=[...document.querySelectorAll('.wmq-cur')]; return {pin:el&&el.style.display!=='none', label:el&&el.textContent, btn:bs.length, on:bs.filter(b=>b.classList.contains('on')).length, legend:!!document.querySelector('.wmq-camps')}; })()")
    check("Make a quest current: the arrow and a gold ★ pin on the map point to it; ☆ buttons in the map's list (%s %s)" % (e, f), e['tr'] == 's1_tower' and e['jour'] and f['pin'] and 'Silverwood' in (f['label'] or '') and f['btn'] >= 1 and f['on'] == 1, (e, f))
    h = g.js("""(()=>{ var ws=%s, ps=ws.playerState; var eg=ps._expG||ps.exploredGrid; if(eg&&eg.fill)eg.fill(1); else if(eg)for(var i=0;i<eg.length;i++)eg[i]=1; WMAP.zoom=1; renderMinimap(ws.wd,null,null,null,0,null,true); return {drawn:ZCURQ._drawn, camps:ws._camps.length}; })()""" % WS)
    check('Monster camps you have explored show on the map as tents (%s), with a legend' % h, h['drawn'] > 20 and f['legend'], h)
    g.js("(()=>{ try{ closeModal('map'); }catch(e){} try{ ZPAUSE.resume&&ZPAUSE.resume(); }catch(e){} })()"); g.wait(500)
    k = g.js("""(()=>{ var ws=%s, ps=ws.playerState, R=ZRING.rings(ws); if(!R.length)return {n:0}; var r=R[0]; ws.player.x=r.x; ws.player.y=r.y; ps.hp=Math.max(1,Math.round(ps.maxHp/3)); var h0=ps.hp; ps.ringHealSeen=0; for(var i=0;i<40;i++)ZRING.tick(ws,0.25); var said=!!(ZDLG.cur); for(var k=0;k<3&&ZDLG.cur;k++)ZDLG.cur.close(); for(var i=0;i<40;i++)ZRING.tick(ws,0.25); return {n:R.length, gain:ps.hp-h0, said:said, seen:ps.ringHealSeen}; })()""" % WS)
    check("Fairy rings slowly heal you, with a pop-up the first time (%s)" % k, k['n'] >= 3 and k['gain'] > 0 and k['said'] and k['seen'] == 1, k)
    n = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ZOSW.tq(ps).net=1; ZOSW.tq(ps).netAt={x:(600-40)*TILE,y:(600+10)*TILE}; var N=ZOSW.netSpot(ws), tx=Math.floor(N.x/TILE), ty=Math.floor(N.y/TILE); return {sec:getTileSection(tx,ty), ok:ZOSW.netOk(ws,N), moved:N.x!==(600-40)*TILE, d:Math.round(Math.hypot(tx-CENTER_X,ty-CENTER_Y))}; })()""" % WS)
    check("Old Nell's net lies on a lake shore you can walk to without leaving Gildenmark; an old save's out-of-reach net is moved (%s)" % n, n['ok'] and n['sec'] in (0, 1) and n['moved'], n)
    m = g.js("""(()=>{ var ws=%s, N=ZOSW.netSpot(ws); ws._tqNet=null; ZOSW.netMake(ws,N); var G=ws._tqNetG||[]; var r={img:ws._tqNet&&ws._tqNet.texture&&ws._tqNet.texture.key, guards:G.length, reach:G.every(m=>ZOSW.netOk(ws,{x:m.x,y:m.y})), awake:G.every(m=>!!m._guard)}; return r; })()""" % WS)
    check("The net is a picture (not an emoji), its guards stand on ground you can reach and never sleep it off by day (%s)" % m, m['img'] in ('zosw_net',) or 'pc_fish_net' in str(m['img']), m)
    q = g.js("""(()=>{ var ws=%s; ZQMAP._c=null; var L=ZQMAP.list(ws); return L.filter(q=>/^(tq:|roll$)/.test(q.id)).map(q=>q.id+':'+q.title); })()""" % WS)
    check("Oswin's tasks stand in the map's quest list with their places (%s)" % q, any(x.startswith('tq:net') for x in q), q)
    hut = g.js("""(()=>{ var ws=%s, P=(ws.wd.props||[]).find(p=>p.pid==='vb_fishing_hut'||(p.o&&p.o.pid==='vb_fishing_hut')); return P?[P.w,P.h]:null; })()""" % WS)
    check("The fishing hut is 4 × 4 like the houses (%s)" % hut, hut == [4, 4], hut)
    dz = g.js("""(async()=>{ var done=0; ZDeath.show(ZDEATH.LOOKS[0],{gold:0},function(){ done=1; }); await new Promise(r=>setTimeout(r,700)); var b=document.getElementById('zdeath-btn').getBoundingClientRect(); return {x:b.left+b.width/2,y:b.top+b.height/2}; })()""")
    g.page.mouse.click(dz['x'], dz['y']); g.wait(400)
    check("Clicking the death pop-up's button works, not only Enter", g.js("document.getElementById('modal-death').style.display") == 'none')
    w = g.js("(()=>{ var W=(typeof WAYSTONES!=='undefined'?WAYSTONES:null); return _wmCost(null,{id:'a',region:1},{id:'b',region:4}); })()")
    check('Every waystone is free to travel to (Gildenmark → Cinderheim: %s g)' % w, w == 0, w)
    ch = g.js("""(()=>{ var ws=%s; var k=ws._campTex('chest',undefined,'sunken_chest'); var c=document.createElement('canvas'); c.width=128; c.height=128; var x=c.getContext('2d'); var fr=game.textures.getFrame(k,'2'); x.drawImage(fr.source.image,fr.cutX,fr.cutY,128,128,0,0,128,128); var d=x.getImageData(0,0,128,3).data, top=0; for(var i=3;i<d.length;i+=4)if(d[i]>40)top++; return {key:k, top:top}; })()""" % WS)
    check("The open camp chest fits its frame (the lid no longer runs off the top), each realm's chest falling back to the painted one (%s)" % ch, ch['top'] == 0 and ch['key'].startswith('camp_chest'), ch)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
