"""Round 106: shorter big sites, no aiming without mana / while recharging, bosses come for you (walk + blink), a still camera in the boss
arena, fairies always answer Tab, the waystone list scrolls, Lab › Site backdrops.   python tests/test_round106.py   (after node build.mjs)"""
import sys, os, re; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"; D = "game.scene.getScene('Dungeon')"
with game(w=1280, h=720) as g:
    g.wait(2500)
    f = g.js("(()=>{ var o={}; _slCatalog().forEach(gr=>gr.sites.forEach(s=>{ o[s.id]=s.floors; })); var w={}; %s.wd.sites.forEach(s=>{ if(s.id)w[s.id]=s.floors; }); return {lab:o, world:w}; })()" % WS)
    want = {'s3_dungeon': 4, 's4_b_boulder_field': 4, 's2_b_crystal_grotto': 4, 's2_b_root_hollow': 3, 's3_b_pillared_hall': 4, 's4_dungeon': 6, 'isl_castle_q4_c': 3, 'mage_monolith': 3, 's1_tower': 5}
    got = {k: f['lab'].get(k) for k in want}
    check('The biggest sites are shorter (%s)' % got, got == want, got)
    check('…and the world agrees (s3_dungeon %s, mage_monolith %s)' % (f['world'].get('s3_dungeon'), f['world'].get('mage_monolith')), f['world'].get('s3_dungeon') == 4 and f['world'].get('mage_monolith') == 3, f['world'])
    # aiming needs mana and a ready spell
    g.js("(()=>{ var ws=%s, ps=ws.playerState; var t=Object.keys(ITEMS).find(k=>ITEMS[k].spellId==='frost_bolt'); ps.inventory.push(t); ps.equip.spell=t; ZAIM.on=true; ZDRAW.on=true; })()" % WS)
    a = g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.mana=2; ZAIM.cur=null; ZAIM.press(ws,{}); var n=!!ZAIM.cur; ps.mana=ps.maxMana; ws._spellCd=3; ZAIM.press(ws,{}); var c=!!ZAIM.cur; ws._spellCd=0; ZAIM.press(ws,{}); var ok=!!ZAIM.cur; ZAIM.clear('t'); return {nomana:n, cd:c, ok:ok}; })()" % WS)
    check('X: no rune circle without the mana or while recharging (it says so); with both, it shows (%s)' % a, not a['nomana'] and not a['cd'] and a['ok'], a)
    b = g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.inventory.push('short_bow'); ps.equip.rHand='short_bow'; ps.ammo={}; ZDRAW.cur=null; ZDRAW.start(ws,{}); return !!ZDRAW.cur; })()" % WS)
    check('Ctrl: no draw without arrows (%s)' % b, not b, b)
    # fairies answer Tab anywhere near their circle, again and again
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.ownedFamiliars=['fam_grass']; ps.familiar='fam_grass'; ps.famLevels={fam_grass:1}; var f=ws._fairies[0]; window._f=f; var hx=f.home&&f.home.ws?f.home.x*TILE+16:f.x, hy=f.home&&f.home.ws?f.home.y*TILE+16:f.y; ws.player.x=hx+60; ws.player.y=hy+20; ws.player.cont&&ws.player.cont.setPosition(ws.player.x,ws.player.y); })()" % WS)
    g.wait(1500); n = 0
    for i in range(3):
        g.key('Tab', 80); g.wait(500)
        o = g.js("(()=>{ var el=document.getElementById('fairy-talk'); return !!el&&el.style.display!=='none'; })()")
        n += 1 if o else 0
        if o: g.js("document.querySelector('#fairy-talk .ft-btns button').click()")
        g.wait(1100)
    check('Fairies: Tab talks every time near her circle, not only when she flits past (%d of 3)' % n, n == 3, n)
    g.js("openWorldMap({travelFrom:'ws_village'})"); g.wait(800)
    s = g.js("(()=>{ var sd=document.getElementById('wmap-side'); return {mh:sd.style.maxHeight, oy:getComputedStyle(sd).overflowY}; })()")
    check('Waystone list: it scrolls inside the map\'s height (%s)' % s, s['mh'].endswith('px') and s['oy'] == 'auto', s)
    g.js("ZPAUSE.resume&&ZPAUSE.resume(); closeModal('map')"); g.wait(300)
    # healing wells: every second floor, off the path, a quarter to a half of your health (8 hearts at most), then dry
    g.js("(()=>{ var ws=%s; var site=ws.wd.sites.find(s=>s.type==='tower'&&s.section===1); window._ws1=site; ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:0,maxFloors:site.floors,worldScene:ws,theme:'tower'}); })()" % WS)
    g.wait(4500)
    w0 = g.js("!!%s._hwell" % D)
    g.js("(()=>{ var d=%s; d.scene.restart(Object.assign({},d._initData,{floor:1,floorStates:{},arriveAt:null})); })()" % D); g.wait(4500)
    w = g.js("(()=>{ var d=%s, w=d._hwell, ps=d.worldScene.playerState; if(!w)return null; ps.maxHp=400; ps.hp=40; HWELL.heal(d,w); var a=ps.hp-40; ps.hp=60; HWELL.heal(d,w); var near=(d.interactables||[]).filter(i=>i.type==='heal_well').length; return {off:w.off, a:a, again:ps.hp-60, dry:w.opened, n:near, per:ZHUD.hearts(400).per}; })()" % D)
    check('Healing wells: none on floor 1, one on floor 2, off the path (%s tiles) (%s)' % (w and w['off'], w0), not w0 and w and w['n'] == 1 and w['off'] >= 2, (w0, w))
    check('…it restores a quarter to a half of your health but no more than 8 hearts, then runs dry (%s)' % w, w and 100 <= w['a'] <= min(200, 8 * w['per']) and w['again'] == 0 and w['dry'], w)
    g.js("(()=>{ var d=%s; d.scene.stop(); var ws=%s; ws.scene.wake('World'); })()" % (D, WS)); g.wait(1200)
    # dying: only the rune pop-up — a lesson box under it is closed, and its own keys work
    dz = g.js("(async()=>{ ZDeath.auto=false; ZDLG.say('Master Oswin','A lesson that should not be under the death pop-up.',{}); var a=!!ZDLG.open; var done=false; ZDeath.busy=true; ZDeath.show(ZDeath.look(),{area:'here',foe:'a goblin',gold:3},function(){ done=true; ZDeath.busy=false; }); var b=!!ZDLG.open; ZDLG.say('Master Oswin','and nothing new appears',{}); var c=!!ZDLG.open; await new Promise(r=>setTimeout(r,800)); window.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter'})); await new Promise(r=>setTimeout(r,100)); var m=document.getElementById('modal-death'); return {a:a,b:b,c:c,done:done,shown:m&&m.style.display}; })()")
    check('Dying: the lesson box under the rune pop-up is closed, nothing new opens over it, and Enter closes it (%s)' % dz, dz['a'] and not dz['b'] and not dz['c'] and dz['done'] and dz['shown'] == 'none', dz)
    g.js("ZDeath.auto=true; if(ZDLG.cur){ ZDLG._q=[]; ZDLG.cur.close(); }"); g.wait(1500); g.js("if(ZDLG.cur){ ZDLG._q=[]; ZDLG.cur.close(); }")
    # bosses come for you
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.godMode=true; BMOVE.on=true; BCAM.on=true; BCAM.T=0; var site=ws.wd.sites.find(s=>s.type==='dungeon'&&s.section===1); ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:site.floors-1,maxFloors:site.floors,worldScene:ws,theme:'dungeon'}); })()" % WS)
    g.wait(5000)
    cam0 = g.js("(()=>{ var d=%s, c=d.cameras.main; return {follow:!!c._follow, z:c.zoom}; })()" % D)
    g.js("(()=>{ var d=%s, b=d.monsters.find(m=>m.isBoss); var B=BCAM.box(d); window._bx=B; d.px=B.cx; d.py=B.cy+TILE*2; d.pCont.setPosition(d.px,d.py); if(b._m)b._m.aggro=true; else { b._bmm=b._bmm||{invuln:0}; b._bmm.aggro=true; } })()" % D)
    g.wait(2500)
    cam1 = g.js("(()=>{ var d=%s, c=d.cameras.main, B=window._bx, v=c.worldView; var inView=B.cx-B.w/2>=v.x-2&&B.cx+B.w/2<=v.right+2&&B.cy-B.h/2>=v.y-2&&B.cy+B.h/2<=v.bottom+2; window._s0=[c.scrollX,c.scrollY]; d.px+=TILE*2; d.pCont.setPosition(d.px,d.py); return {follow:!!c._follow, z:Math.round(c.zoom*100)/100, inView:inView, on:d._bcOn, mode:d._bcMode, w:B.w, h:B.h}; })()" % D)
    g.wait(800)
    still = g.js("(()=>{ var c=%s.cameras.main; return Math.round(Math.hypot(c.scrollX-window._s0[0],c.scrollY-window._s0[1])); })()" % D)
    check('Boss arena: the camera stops following, shows the whole arena and stays still as you move (%s, moved %s px)' % (cam1, still), cam0['follow'] and cam1['on'] and ((cam1['mode'] == 'still' and not cam1['follow'] and cam1['inView'] and still < 3) or cam1['mode'] == 'follow'), (cam1, still))
    t = g.js("(()=>{ var d=%s, b=d.monsters.find(m=>m.isBoss); var x0=d.px, y0=d.py; var pos=null, cands=[]; for(var r=8;r>=5;r--)for(var a=0;a<16;a++){ var x=b.x+Math.cos(a/16*6.283)*r*TILE, y=b.y+Math.sin(a/16*6.283)*r*TILE; if(d._canGoD(x,y)&&MX.sees(MX.A(d),b,x,y))cands.push([x,y]); } if(cands.length){ d.px=cands[0][0]; d.py=cands[0][1]; d.pCont.setPosition(d.px,d.py); } window._bd0=Math.hypot(b.x-d.px,b.y-d.py); window._bev=0; return {n:cands.length, d0:Math.round(window._bd0)}; })()" % D)
    g.js("(()=>{ var ev0=MX.ev; window._bevs=[]; MX.ev=function(m,k){ if(k==='mv_bossblink')window._bevs.push(1); return ev0.apply(this,arguments); }; })()")
    g.wait(8000)
    m = g.js("(()=>{ var d=%s, b=d.monsters.find(m=>m.isBoss&&!m.dead); return {d1:Math.round(Math.hypot(b.x-d.px,b.y-d.py)), blinks:window._bevs.length}; })()" % D)
    check('Bosses come for you: from %s px away it closed in or blinked next to you within 8 s (%s)' % (t['d0'], m), t['n'] > 0 and (m['d1'] < t['d0'] - 60 or m['blinks'] > 0), (t, m))
    g.js("(()=>{ var d=%s; d.px=d.stairsUpTile?d.stairsUpTile.x*TILE+16:d.px; d.py=d.stairsUpTile?d.stairsUpTile.y*TILE+16:d.py; d.pCont.setPosition(d.px,d.py); })()" % D); g.wait(1500)
    cam2 = g.js("(()=>{ var c=%s.cameras.main; return {follow:!!c._follow, on:%s._bcOn}; })()" % (D, D))
    check('…leave the arena and the camera follows you again (%s)' % cam2, cam2['follow'] and not cam2['on'], cam2)
    check('No page errors', not [e for e in g.errs if '404' not in e and 'decode' not in e], g.errs[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('backdrop','.bd-t',0)"); pg.wait_for_timeout(1200)
    r = pg.evaluate("({img:document.querySelectorAll('.bd-shots img').length, rows:document.querySelectorAll('.bd-t tr').length, todo:LTODO.open().map(o=>o.id)})")
    check('Lab → Site backdrops: eight floors as they look, seven fixes to ✓ / ✎ / ✕ (%s)' % r, r['img'] == 8 and r['rows'] == 7 and 'backdrop' in r['todo'] and 'invorg' in r['todo'], r)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
