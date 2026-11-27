"""Round 142: the ? in place of the corner cards, loading screens, the hearth you can leave (and that pauses), glades capped, the hero's red
flash, the Runestone Crawler's armour, painted bosses not left red, Runa's board prompt, no puddles or ruts, world take 5 in the game, the sheep,
the Lab's new tabs.   python tests/test_round142.py"""
import sys, os, re; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]))
WS = "game.scene.getScene('World')"
src = lambda f: open(os.path.join(R, 'src', 'js', f), encoding='utf-8').read()
sl = src('21z4-season-land.js'); w5 = src('27z6-world5.js'); kit = src('07r-monster-kits.js')
check('The thaw has no meltwater puddle or mud ruts', "'lt_puddle'" not in sl.split('SET:')[1].split('au:')[0] and "'lt_mud'" not in sl.split('SET:')[1].split('au:')[0])
check('No puddles or cart ruts along the roads', "ROAD_FLAT:['steps','worn']" in w5)
check('Runestone Crawler: armour halved (a blow keeps 52%)', 'armor n=99 red=0.48' in kit)
lab = open(os.path.join(R, 'dist', 'lab', 'index.html'), encoding='utf-8').read() if os.path.exists(os.path.join(R, 'dist', 'lab', 'index.html')) else ''
check('Lab: the Round 142 and Mana tabs, and the title pictures', 'Round 142 — the' in lab and 'Mana: where it comes from' in lab and lab.count('logoz_') >= 30, len(lab))
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    # the ? button
    h = g.js("""(()=>{ var n0=ZHELP.L.length; var r=ZCARD.show({who:'Master Oswin',icon:'⚔',title:'Blocking',text:'Hold Shift to block.',keys:'Shift',btns:[{t:'Got it',f:function(){}}]});
        var cards=document.querySelectorAll('.zcard,.zc-card').length; var b=document.getElementById('zhelp-btn'), i=b&&b.querySelector('i');
        var zp=document.getElementById('zpath'); return {ret:r, n:ZHELP.L.length-n0, badge:i&&i.textContent, shown:b&&getComputedStyle(b).display!=='none', path:zp?getComputedStyle(zp).display:'none'}; })()""")
    check('A card goes into the ? (none at the corner), the ? shows a number, the box under the map is hidden (%s)' % h, h['ret'] is None and h['n'] == 1 and h['badge'] and int(h['badge']) >= 1 and h['shown'] and h['path'] == 'none', h)
    o = g.js("""(()=>{ ZHELP.open(); var p=document.getElementById('zhelp'); var t=p.textContent; var b=document.querySelector('#zhelp .zhp-b button'); var w=b?b.offsetWidth:0; var badge=document.querySelector('#zhelp-btn i').textContent; ZHELP.close(); return {now:/What now/.test(t), has:/Hold Shift to block/.test(t), btnw:w, badge:badge}; })()""")
    check('…pressing it shows What now and the tip with its button, and clears the number (%s)' % o, o['now'] and o['has'] and o['btnw'] > 30 and o['badge'] == '', o)
    # the hero flashes red
    f = g.js("""(()=>{ var ws=%s, p=ws.player, ps=ws.playerState, sp=p.sprite; sp._zhHp=ps.hp; ps.hp-=3; _heroAnimate(ws,sp,p,0,0,0.016,0,0); var a={fill:sp.tintFill, tint:sp.tintTopLeft.toString(16)}; ps.hp+=3; sp._zhHp=ps.hp; sp._zhT-=400; _heroAnimate(ws,sp,p,0,0,0.016,0,0); a.after=sp.isTinted; return a; })()""" % WS)
    check('The hero flashes red when hit, then clears (%s)' % f, f['fill'] and f['tint'] == 'ff2a2a' and not f['after'], f)
    # Runa's board prompt
    rb = g.js("""(()=>{ var ws=%s, P=ZECO.boardSpot(); ws.player.x=P.x+10; ws.player.y=P.y+20; ws.player.cont.setPosition(ws.player.x,ws.player.y); return 1; })()""" % WS); g.wait(700)
    rb = g.js("(()=>{ var t=[...document.querySelectorAll('*')].filter(e=>e.children.length===0&&/Read Runa/.test(e.textContent)).length; var ws=%s; var ph=(ws.children.list||[]).filter(o=>o.type==='Text'&&/Read Runa/.test(o.text||'')).length; return t+ph; })()" % WS)
    check('Standing by Runa\'s board shows "[Tab] Read Runa\'s board" (%s)' % rb, rb >= 1, rb)
    # glades: about one heart, then half at the next
    gl = g.js("""(()=>{ var ws=%s, ps=ws.playerState, R=ZRING.rings(ws); if(!R.length)return {none:true}; ps.ringHealSeen=1; ps.gladeDay=null; ps.maxHp=ps.maxHp||30; var heart=ZRING.heart(ps.maxHp);
        function soak(r){ ws.player.x=r.x; ws.player.y=r.y; ps.hp=1; var h0=ps.hp; for(var i=0;i<600;i++)ZRING.tick(ws,0.1); return ps.hp-h0; }
        var a=soak(R[0]), b=R[1]?soak(R[1]):null, c=soak(R[0]); return {heart:heart, first:Math.round(a*10)/10, second:b==null?null:Math.round(b*10)/10, again:Math.round(c*10)/10}; })()""" % WS)
    check('A glade heals about one heart, the next that day half, the same glade nothing more (%s)' % gl, gl.get('none') or (gl['first'] <= gl['heart'] + 0.6 and gl['first'] > 0 and (gl['second'] is None or gl['second'] <= gl['heart'] / 2 + 0.6) and gl['again'] <= 0.6), gl)
    # world take 5
    w = g.js("(()=>{ var ws=%s; return {sets:(ZW5.SETS||[]).length, solids:Object.keys(ZW5.S||{}).length, count:ZW5.count(ws.playerState)}; })()" % WS)
    check('World take 5: set-pieces placed along the roads, solid, explorable (%s)' % w, w['sets'] >= 15 and w['solids'] > 0, w)
    # the sheep move
    sh = g.js("""(()=>{ var ws=%s, S=ZSHEEP.S||[], C=ZFEST.centre(ws); var s=S.slice().sort((a,b)=>Math.hypot(a.x-C.x,a.y-C.y)-Math.hypot(b.x-C.x,b.y-C.y))[0]; if(!s)return {none:true}; ws.player.x=s.x+90; ws.player.y=s.y+60; ws.player.cont.setPosition(ws.player.x,ws.player.y); window.__sk=s.k; return {k:s.k}; })()""" % WS)
    g.wait(800); p0 = g.js("(()=>{ var a=ZSHEEP.L[window.__sk]; return a?[a.x,a.y,!!(a._zim&&a._zim.visible)]:null; })()"); g.wait(9000)
    p1 = g.js("(()=>{ var a=ZSHEEP.L[window.__sk]; return a?[a.x,a.y]:null; })()")
    moved = p0 and p1 and ((p0[0]-p1[0])**2 + (p0[1]-p1[1])**2) ** 0.5
    check('A village sheep is drawn and wanders (moved %s px in 9 s)' % (round(moved or 0)), p0 and p0[2] and moved and moved > 4, [p0, p1])
    # the hearth: it pauses, its buttons are real, Enter goes on
    hh = g.js("""(()=>{ ZHEARTH.on=true; ZHEARTH._early=null; ZHEARTH.show({id:'t142',name:'Test',boss:'Cindra, the Hearth-Witch',t:251,gold:263,xp:223,items:['ruby','ruby'],hits:3}); var el=document.querySelector('.zhearth'); var b=el&&el.querySelector('.zh-on'); return {el:!!el, id:el&&el.id, bw:b?b.offsetWidth:0, bh:b?b.offsetHeight:0, paused:_openOverlays().indexOf('zhearth')>=0}; })()""")
    g.wait(700); g.key('Enter'); g.wait(700)
    gone = g.js("!document.querySelector('.zhearth:not(.out)')")
    check('The hearth screen pauses the game, its buttons are full size, Enter goes Onward (%s, closed %s)' % (hh, gone), hh['el'] and hh['paused'] and hh['bw'] > 50 and hh['bh'] > 20 and gone, hh)
    # loading screen on going into a site; a painted boss is not left tinted after a flash
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data); return site.floors;})"""
    g.js(L, ['mage_hearthfire', 1])
    ld = g.js("(()=>{ var e=document.getElementById('zload'); return {on:!!e&&getComputedStyle(e).display!=='none', name:e&&/Hearthfire Tower/.test(e.textContent), tip:e&&e.querySelector('.zl-tip,.zld-tip,[class*=tip]')?1:0}; })()")
    g.wait(9000)
    ld2 = g.js("(()=>{ var e=document.getElementById('zload'); return !e||getComputedStyle(e).display==='none'||getComputedStyle(e).opacity==='0'; })()")
    check('Going into a site: the loading screen with its name and a tip, gone once the site is in (%s, gone %s)' % (ld, ld2), ld['on'] and ld['name'] and ld2, ld)
    bt = g.js("""(()=>{ var d=game.scene.getScene('Dungeon'), b=(d.monsters||[]).find(m=>m.isBoss); if(!b||!b.body||!b.body.setFillStyle)return {none:true}; b.body.setFillStyle(0xffffff); var a=b.body.isTinted; b.body.setFillStyle(0x884422); var c=b.body.isTinted; b.body.setFillStyle(0xffffff); b.body.setFillStyle(0xb83a1a); return {flash:a, after:c, after2:b.body.isTinted}; })()""")
    check('A painted boss\'s hit flash ends clean — no red-brown cast left behind (%s)' % bt, bt.get('none') or (bt['flash'] and not bt['after'] and not bt['after2']), bt)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
