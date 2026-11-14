"""Round 103: the round-102 paintings in the game, combat rhythm, digging gone, the sound picks in the game and the new Sound effects tab (doc 55).
python tests/test_round103.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:400]))
WS = "game.scene.getScene('World')"
D = "game.scene.getScene('Dungeon')"
with game(painted=True, w=1280, h=720) as g:
    g.wait(3000)
    ids = ['hud_heart_full', 'hud_banner', 'hud_bossbar_frame', 'hud_monbar_frame', 'st_icon_freeze', 'so_ice', 'aim_rune', 'aim_reticle', 'en_portal_sealed', 'en_vault_open', 'gate_closed', 'sl_ribbon', 'sk_city_1', 'sk_cloudbank_2', 'sk_bomb']
    miss = g.js("%s.filter(i=>!ZScn.has(i))" % json.dumps(ids))
    check('The round-102 paintings are in (%d pieces checked)' % len(ids), not miss, miss)
    h = g.js("(()=>{ var h=document.getElementById('zhud'); return {pic:h.querySelectorAll('.zh-h.pic').length, ban:h.querySelectorAll('.zh-b.pic').length, bw:h.querySelector('.zh-b')?h.querySelector('.zh-b').offsetWidth:0}; })()")
    check('HUD: painted hearts and banners, the banners a little bigger (%s)' % h, h['pic'] >= 3 and h['ban'] >= 2 and h['bw'] >= 16, h)
    t = g.js("(()=>{ var ws=%s, ps=ws.playerState, S=ZSPIRIT.shrines(ws); var s=S[0]; ps.spiritsFreed=[s.id]; ps.slSeen=[s.id]; ws.player.x=s.tx*TILE+200; ws.player.y=s.ty*TILE; return 1; })()" % WS)
    g.wait(1500)
    tm = g.js("(()=>{ var ws=%s; ws._zslC&&Object.keys(ws._zslC.m).forEach(function(k){ ws._zslC.m[k].sig=''; }); var t=performance.now(); ZSLW.chunks(ws); ZSLW.chunks(ws); return Math.round(performance.now()-t); })()" % WS)
    check('Soul-lines: the painted ribbon is laid along the vein, two chunks in %d ms (it hung once)' % tm, tm < 1500, tm)
    fl = g.js("!!ZScn.detail('tx_dng_floor',128,1.25)&&!!ZScn.detail('tx_dng_wall',64,1.2)")
    check('The dungeon floor and wall paintings are ready for the caverns (the trial)', fl)
    # combat rhythm
    g.js("(()=>{ var ws=%s, ps=ws.playerState; ps.lessons=ps.lessons||{}; ['r_sword','r_parry','r_follow','r_axe','r_counter','r_weave','r_together'].forEach(k=>ps.lessons[k]=1); ps.godMode=true; ps.equip.lHand='iron_sword'; var site=ws.wd.sites.find(s=>s.type==='dungeon'&&s.section===1); ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:0,maxFloors:site.floors,worldScene:ws,theme:'dungeon'}); })()" % WS)
    g.wait(5000)
    g.js("(()=>{ var d=%s; d.monsters.forEach(m=>{ if(!m.dead){ m.x+=2000; } }); var m=d.monsters.find(m=>!m.dead&&!m.isBoss); m.x=d.px+26; m.y=d.py; m.hp=m.maxHp=99999; window._rm=m; var pin=function(){ m.x=d.px+26; m.y=d.py; if(m.cont)m.cont.setPosition(m.x,m.y); }; window._rpin=setInterval(pin,16); d.pdir='right'; })()" % D)
    g.wait(300)
    def swing():
        return g.js("(()=>{ var d=%s; d.playerAtkTimer=0; d._playerAttack(); var C=ZRHY.S.cur; return C?{m:C.m,tag:C.tag,hit:C.hit,step:ZRHY.S.step}:null; })()" % D)
    def beat():      # round 104: swing on the beat, timed inside the page (a fixed wait was flaky in a slow browser)
        return g.js("(async()=>{ var d=%s; var w=ZRHY.win(); await new Promise(r=>setTimeout(r,Math.max(0,(w[0]+0.06-ZRHY.now())*1000))); d.playerAtkTimer=0; d._playerAttack(); var C=ZRHY.S.cur; return C?{m:C.m,tag:C.tag,hit:C.hit,step:ZRHY.S.step}:null; })()" % D)
    g.js("ZRHY.SW.sword=[0,0.7]")      # the test browser draws a frame every ~0.2 s: a wider beat so the timing is the page's, not the test's
    a = swing(); b = beat(); c = beat()
    g.js("ZRHY.SW.sword=[0,0.28]")
    check('Sword combo: on the beat the 2nd swing ×1.2, the 3rd a finisher ×1.6 (%s · %s · %s)' % (a, b, c), a and a['hit'] and a['m'] == 1 and b['m'] == 1.2 and abs(c['m'] - 1.6) < 1e-6 and 'finisher' in c['tag'], (a, b, c))
    g.wait(900); a = swing(); g.wait(200); g.page.keyboard.press(' '); g.wait(360); b = g.js("ZRHY.S.early")
    g.wait(20); b2 = swing()
    check('Pressing early breaks the chain (%s, next %s)' % (b, b2), b and b2['m'] == 1, b2)
    g.wait(900); a = swing(); g.wait(1500); b = swing()
    check('Missing the beat starts again (%s)' % b, b['m'] == 1, b)
    g.wait(900); r = g.js("(()=>{ var d=%s, ps=d.worldScene.playerState; d._shielding=true; ZRHY.S.blockT0=ZRHY.now(); var x=_heroApplyShield(d,ps,20,d.px,d.py); var crit=ZRHY.S.crit; d._shielding=false; return {dmg:x, crit:crit}; })()" % D)
    g.wait(200); c = swing()
    check('Perfect block: the blow does nothing, the next swing is a sure critical ×2 (%s, %s)' % (r, c), r['dmg'] == 0 and r['crit'] and c['m'] == 2, (r, c))
    g.wait(900); g.js("ZRHY.S.rollT=ZRHY.now()-0.3"); c = swing()
    check('Roll-counter: a swing just after a roll ×1.5 (%s)' % c, abs(c['m'] - 1.5) < 1e-6 and 'counter' in c['tag'], c)
    t = g.js("(()=>{ var d=%s, m=window._rm, S=ZRHY.S; S.meleeMon=m; S.meleeT=ZRHY.now(); var a=ZRHY.familiar(d,m,100); S.famMon=m; S.famT=ZRHY.now(); S.cur=null; var b=ZRHY.melee(d,m,100); return [a,b]; })()" % D)
    check('Together!: familiar and hero on the same foe within half a second — both +20 %% (%s)' % t, t == [120, 120], t)
    f = g.js("(()=>{ var m=window._rm; ZSTAT.put(%s,m,'freeze',3,{}); return ZRHY.held(m); })()" % D)
    sh = g.js("(()=>{ var d=%s, ws=d.worldScene, ps=ws.playerState; var bow=Object.keys(ITEMS).find(k=>ITEMS[k].slot==='rHand'&&ITEMS[k].cls!=='xbow'); ps.equip.rHand=bow; ps.ammo=ps.ammo||{}; var am=Object.keys(ITEMS).find(k=>ITEMS[k].slot==='ammo'); ps.ammo[am]=20; ps.equip.ammo=am; ps.activeAmmo=am; ZRHY.lastShot=0; ZDRAW.shoot(d,2,window._rm); return {z:ZRHY.lastShot}; })()" % D)
    check('Follow-up shot: a full draw at a frozen foe ×2 ×1.5 (held %s, %s)' % (f, sh), f and abs((sh['z'] or 0) - 3) < 1e-6, (f, sh))
    w = g.js("(()=>{ var d=%s, ws=d.worldScene, ps=ws.playerState; var tome=Object.keys(ITEMS).find(k=>ITEMS[k].spellId==='frost_bolt'); ps.equip.spell=tome; ps.mana=ps.maxMana=200; _heroSpellCdUntil=0; ZRHY.S.finT=ZRHY.now(); ZRHY.S.finMon=window._rm; ZAIM.log=[]; ZAIM.press(d,{}); return {log:ZAIM.log.slice(), weave:ZRHY.now()-ZRHY.S.weaveT<1, armed:!!ZAIM.cur, sp:ZRHY.spell(d,window._rm,100)}; })()" % D)
    check('Rune-weave: X within a second of a finisher casts at once (no aiming), +25 %% (%s)' % w, w['weave'] and not w['armed'] and any('fire' in x for x in w['log']) and w['sp'] == 125, w)
    g.js("(()=>{ var ps=%s.worldScene.playerState; ps.lessons.r_sword=0; })()" % D); g.wait(900); a = swing(); g.wait(560); b = swing()
    check('Not taught yet: no combo (%s)' % b, b['m'] == 1, b)
    g.js("clearInterval(window._rpin)")
    L = g.js("({sw:ZLES.byId('r_sword')&&ZLES.byId('r_sword')[6], ax:ZLES.byId('r_axe')&&ZLES.byId('r_axe')[6], dig:!!ZLES.byId('dig'), n:ZLES.L.filter(l=>/^r_/.test(l[0])).length})")
    check('Each teacher teaches their own (armoury, blacksmith, Pia, the tower master, the fairy) — 7 lessons, digging\'s gone (%s)' % L, L['sw'] == 'npc_armory' and L['ax'] == 'npc_forge' and not L['dig'] and L['n'] == 7, L)
    g.js("(()=>{ var d=%s; d.scene.stop(); var ws=%s; ws.scene.wake('World'); })()" % (D, WS)); g.wait(1500)
    # the sky port: the city along the bottom, painted cloud banks that wear
    g.js("(()=>{ var ws=%s; ws.playerState.unlockedSections=[1,2,3,4]; SKY.noBrief=true; var s=ws.wd.sites.find(x=>x.type==='skyport'&&x.section===1); ws._enterSite(s); })()" % WS)
    g.wait(3000); g.js("(()=>{ var b=[...document.querySelectorAll('button')].find(x=>/launch|begin|start|defend|fly/i.test(x.textContent)&&x.offsetParent&&!x.classList.contains('sb-go')); if(b)b.click(); })()")
    g.wait(3000)
    s = g.js("(()=>{ var S=game.scene.getScene('Sky'); var city=S.children.list.filter(o=>o.texture&&/sk_city/.test(o.texture.key)); var hh=city.length?Math.max.apply(null,city.map(o=>o.displayHeight)):0; var bk=S.banks||[]; var b0=bk[0]; var cells=S.bunkers.filter(c=>c.bank===b0); cells.slice(0,8).forEach(c=>{ c.hp=0; c.vis.setVisible(false); }); S._bankWear(b0); return {city:city.length, h:Math.round(hh), H:S.H, banks:bk.length, st:b0&&b0._st, key:b0&&b0.texture.key}; })()")
    check('Sky port: the painted city is a strip along the bottom (%s)' % s, s['city'] >= 2 and s['h'] <= s['H'] * 0.3, s)
    check('…four painted cloud banks, torn when worn down', s['banks'] == 4 and s['st'] == 1, s)
    check('No page errors', not [e for e in g.errs if '404' not in e and 'decode' not in e], g.errs[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript") if os.path.exists(PH) else r.abort())
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('sfxpick','#s103',0)"); pg.wait_for_timeout(1500)
    r = pg.evaluate("""(()=>{ var g=[].slice.call(document.querySelectorAll('.s103-grp')).map(d=>d.dataset.g+':'+d.querySelectorAll('.s103-r').length); var n=SFX103.counts();
      return {g:g, n:n, tot:SFX103.IDS.length, chips:document.querySelectorAll('.s103-chip').length, old:!!document.querySelector('.s103-old'), sb:SFX103.game('sfx_beast_bite'), ins:SFX103.game('sfx_insect')}; })()""")
    check('Lab → Sound effects: one table in five groups, every effect in one (%s)' % r['g'], r['chips'] == 5 and sum(r['n'].values()) == r['tot'] and r['old'], r)
    check('…the Lab picks are in the game now: beast bite plays %s, insect %s' % (r['sb'], r['ins']), sorted(r['sb']) == ['l5', 'w4'] and sorted(r['ins']) == ['cur', 'w4'], r)
    rm = pg.evaluate("""(()=>{ var tr=document.querySelector('.s103-r'); var id=tr.dataset.id; tr.querySelector('.s103-re').click(); var a=SFX103.st(id), v=(LabApp.picks['sfxre-'+id]||{}).verdict; tr.querySelector('.s103-re').click(); return {a:a,v:v,b:SFX103.st(id)}; })()""")
    check('↻ Remake all marks an effect for five brand-new takes, and again clears it (%s)' % rm, rm['a'] == 're' and rm['v'] == 'remake' and rm['b'] != 're', rm)
    sv7 = pg.evaluate("""(()=>{ var tr=[].slice.call(document.querySelectorAll('.s103-r')).find(t=>t.querySelectorAll('.s103-v').length>=5); var id=tr.dataset.id, before=SFX103.mine(id).slice(); tr.querySelectorAll('.s103-v').forEach(function(b){ if(b.getAttribute('aria-pressed')!=='true')b.click(); }); var n=SFX103.mine(id).length, st=SFX103.st(id); LabApp.picks['sfx93-'+id].verdict=before.join('+'); return {n:n, st:st}; })()""")
    check('More than three ★ are kept (up to seven), and a change reads "goes in next round" (%s)' % sv7, sv7['n'] >= 4 and sv7['st'] in ('next', 'game'), sv7)
    td = pg.evaluate("LTODO.open().map(o=>o.id)")
    check('Waiting for your picks: the finished combos ask and the old sound ask are gone (%s)' % td, 'combos' not in td and 'sfx93' not in td, td)
    check('No Lab script errors', not errs, errs[:3])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
