"""Round 134: the engagement waves — keys and pads, the play log, game days and festivals, the death story, letters and the recap,
map stamps, the Tome's collection, the hearth, photo mode, saga cards, challenge codes, trophies, the loom, secrets, the crypt of echoes,
the saga retold, bonds, the saga frame and the aurora on the water.
python tests/test_round134.py   (after node build.mjs)"""
import sys, os, re, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
from playwright.sync_api import sync_playwright
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]))
WS = "game.scene.getScene('World')"
ON = "['ZEV','ZRECAP','ZLETTER','ZHEARTH','ZFEST','ZSECRET','ZBANNER','ZECHO','ZBOND','ZDSTORY','ZAURORA','ZSHARE','ZSTAMP','ZBOOK','ZDAY','ZNGP'].forEach(function(k){ if(window[k])window[k].on=true; });"
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    g.js(ON)
    # ── keys ──
    k = g.js("""(()=>{ ZKEYS.map={attack:'KeyJ'}; var got=[]; var h=function(e){ if(e._zk)got.push(e.type+':'+e.key); }; document.addEventListener('keydown',h,true); document.addEventListener('keyup',h,true);
      window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyJ',key:'j',bubbles:true})); window.dispatchEvent(new KeyboardEvent('keyup',{code:'KeyJ',key:'j',bubbles:true}));
      var sw=0; var h2=function(e){ if(e.code==='Space'&&!e._zk)sw++; }; document.addEventListener('keydown',h2,true); window.dispatchEvent(new KeyboardEvent('keydown',{code:'Space',key:' ',bubbles:true}));
      document.removeEventListener('keydown',h,true); document.removeEventListener('keyup',h,true); document.removeEventListener('keydown',h2,true); ZKEYS.map={}; return {got:got, sw:sw}; })()""")
    check('A moved key: J now attacks (the game sees Space), and Space alone no longer does (%s)' % k, k['got'] == ['keydown: ', 'keyup: '] and k['sw'] == 0, k)
    c = g.js("""(()=>{ toggleModal('controls'); return new Promise(r=>setTimeout(()=>{ var b=document.getElementById('zkeys-box'); r({rows:b?b.querySelectorAll('.zk-b').length:0, pad:b&&b.textContent.indexOf('Steam Deck')>=0, log:!!document.getElementById('zk-plog'), stream:!!document.getElementById('zk-stream')}); closeModal('controls'); },700)); })()""")
    check('The Controls page: every key and pad button can be moved, the Steam Deck note, streamer mode and the play log (%s)' % c, c['rows'] >= 22 + 16 and c['pad'] and c['log'] and c['stream'], c)
    p = g.js("""(()=>{ ZPAD.used=1; ZPAD.lastUse=Date.now(); var w=ZPAD.words('[Space] attack · [Tab] talk · Shift defend'); ZPAD.used=0; return {w:w, x:ZPAD.bind(2), a:ZPAD.bind(0), b:ZPAD.bind(1)}; })()""")
    check('The pad: Zelda layout (X attack, A talk, B roll) and lessons speak in pad buttons (%s)' % p, p['x'] == 'attack' and p['a'] == 'talk' and p['b'] == 'roll' and 'X' in p['w'] and 'A' in p['w'] and 'LT' in p['w'], p)
    s = g.js("(()=>{ ZSTREAM.set(true); var on=document.body.classList.contains('zstream'); ZSTREAM.set(false); return {on:on, off:!document.body.classList.contains('zstream')}; })()")
    check('Streamer mode hides names, and comes off again', s['on'] and s['off'], s)
    l = g.js("""(()=>{ localStorage.removeItem('zeldara_playlog'); ZPLOG.add('x',{}); var n0=ZPLOG.get().length; ZPLOG.set(true); ZPLOG.add('death',{boss:'Goblin King'}); var L=ZPLOG.get(); ZPLOG.set(false); var t=JSON.parse(ZPLOG.text()); return {n0:n0, n:L.length, k:L.map(e=>e.k), t:t.log.length}; })()""")
    check('The play log is off until chosen, then keeps entries locally and exports them (%s)' % l, l['n0'] == 0 and 'death' in l['k'] and l['t'] == l['n'], l)
    # ── days and festivals ──
    d = g.js("""(()=>{ var ps=%s.playerState; ps.gday=4.2; ps.seasNow='sp'; ps.seasStart=0; ZDAY.tick(); var a={day:ZDAY.day(ps), fest:ZDAY.fest(ps)}; ps.slept=(ps.slept||0)+1; ZDAY.tick(); a.after=ps.gday;
      ps.seasNow='xx'; ps.seasStart=0; ZDAY.tick(); a.s=ps.seasNow; a.start=ps.seasStart; a.f2=ZDAY.fest(ps); a.chip=(document.getElementById('zday')||{}).textContent; return a; })()""" % WS)
    check('Game days: day 5 is past the thaw\'s festival; sleeping moves to the next morning; a new season starts its three festival days (%s)' % d, d['day'] == 5 and d['fest'] is None and d['after'] == 5 and d['start'] == 5 and d['f2'] == d['s'] and 'Day' in (d['chip'] or ''), d)
    f = g.js("""(()=>{ var ws=%s; ZFEST.tick(); return new Promise(r=>setTimeout(()=>{ var n=(ws._zfest||[]).length; var B=ws._zfestBoard; ws.player.x=B.x; ws.player.y=B.y+10; ZFEST.tick(); var tab=!!Z3.tab; ZFEST.open(ws.playerState.seasNow); var ui=document.querySelector('.zfest-ui'); var g3=ui&&ui.querySelectorAll('.zf-g').length; ui&&ui.remove(); r({n:n, tab:tab, g3:g3}); },400)); })()""" % WS)
    check('A festival dresses the Green with its painted pieces and a games board you can Tab (%s)' % f, f['n'] >= 3 and f['tab'] and f['g3'] == 3, f)
    m = g.js("""(()=>{ var ps=%s.playerState, s=ps.seasNow; ZFEST.memory(s); var ui=document.querySelector('.zfest-ui'), B=[...ui.querySelectorAll('.zf-mem button')], txt=B.map(b=>b.textContent);
      var pairs={}; txt.forEach((t,i)=>{ (pairs[t]=pairs[t]||[]).push(i); }); var order=Object.values(pairs);
      return new Promise(r=>{ var i=0; var step=()=>{ if(i>=order.length){ setTimeout(()=>r({rib:!!(ps.ribbons||{})[s], best:(ps.festBest||{})[s+'_memory']}),900); return; } B[order[i][0]].click(); B[order[i][1]].click(); i++; setTimeout(step,60); }; step(); }); })()""" % WS)
    check('Rune memory: six pairs in six turns win the festival ribbon and a best score (%s)' % m, m['rib'] and m['best'] == 6, m)
    # ── death story ──
    t = g.js("""(()=>{ var ps=%s.playerState; ps.deathHeard=[]; var T=ZDeath.text(ZDeath.look(),{area:'Gildenmark',foe:'wolf',gold:12,level:3}); return {n:T.lines.length, last:T.lines[T.lines.length-1], wake:T.wake}; })()""" % WS)
    check('Dying tells you something (who found you, a word, lore) and the purse waits where you fell (%s)' % t, t['n'] >= 3 and len(t['last']) > 30 and 'purse' in t['wake'], t)
    # ── letters and recap ──
    lt = g.js("""(()=>{ var ps=%s.playerState; ps.recent=[{k:'boss',txt:'defeated the Goblin King'},{k:'spirit',txt:'freed a bound spirit (3 of 40)'}]; ps.letters=[]; var n=ZLETTER.write(ps); var g0=ps.gold||0, i0=(ps.inventory||[]).length;
      ZLETTER.open(); var el=document.querySelector('.zletters'), txt=el&&el.textContent; el&&el.remove(); return {n:n, txt:(txt||'').slice(0,300), got:(ps.gold||0)>g0||(ps.inventory||[]).length>i0, left:ps.letters.length}; })()""" % WS)
    check('Letters while you were away: written from what you did, each with a small gift (%s)' % lt, lt['n'] == 2 and 'Goblin King' in lt['txt'] and lt['got'] and lt['left'] == 0, lt)
    rc = g.js("""(()=>{ var ws=%s; ZRECAP.show(ws,3*3600000); var el=document.querySelector('.zrecap'); var r={h:el&&el.querySelector('h2').textContent, g:el?el.querySelectorAll('.zr-g li').length:0, did:el?el.querySelectorAll('.zr-did li').length:0}; el&&el.remove(); return r; })()""" % WS)
    check('"Last time, in your saga…": where you are, what you did, up to three goals (%s)' % rc, rc['h'] and 'Last time' in rc['h'] and rc['g'] >= 1 and rc['did'] >= 1, rc)
    # ── map stamps ──
    st = g.js("""(()=>{ var ws=%s, ps=ws.playerState; ps.stamps=[]; openWorldMap(); var bar=document.querySelector('.zstamp-bar'); bar.querySelector('[data-st="chest"]').click(); var cv=document.getElementById('minimap-canvas'), r=cv.getBoundingClientRect();
      cv.dispatchEvent(new MouseEvent('click',{clientX:r.left+r.width/2,clientY:r.top+r.height/2,bubbles:true})); var n=ps.stamps.length; cv.dispatchEvent(new MouseEvent('click',{clientX:r.left+r.width/2,clientY:r.top+r.height/2,bubbles:true}));
      var n2=ps.stamps.length; bar.querySelector('[data-st="chest"]').click(); closeModal('map'); var EG=ps.exploredGrid, w={x:300,y:300}, i=Math.floor(w.y/EXP_SCALE)*EXP_W+Math.floor(w.x/EXP_SCALE); EG[i]=0; ZSTAMP.reveal(ws,w); return {bar:bar.querySelectorAll('[data-st]').length, n:n, n2:n2, rev:EG[i]}; })()""" % WS)
    check('Map stamps: eight kinds, a click places one and a second lifts it; a waystone reveals the land round it (%s)' % st, st['bar'] == 9 and st['n'] == 1 and st['n2'] == 0 and st['rev'] == 1, st)
    # ── Tome collection ──
    tb = g.js("""(()=>{ ZBOOK.tick(); Tome.open(); Tome.ui.cat='book'; Tome.render(); var g=document.getElementById('tome-grid'); var r={st:g.querySelectorAll('.zbk-s').length, on:g.querySelectorAll('.zbk-s.on').length, ch:g.querySelectorAll('.zbk-r').length, tab:!!document.querySelector('[data-tcat="book"]')}; Tome.ui.cat='monster'; closeModal('tome'); return r; })()""")
    check('The Tome\'s Collection: chapters filled, stickers (a few already yours), secrets per realm (%s)' % tb, tb['tab'] and tb['st'] >= 25 and tb['on'] >= 2 and tb['ch'] >= 8, tb)
    # ── hearth ──
    h = g.js("""(()=>{ ZHEARTH.show({name:'Mossy Tower',boss:null,t:312,gold:80,xp:40,items:['bread','bread'],hits:0}); var el=document.querySelector('.zhearth'), r={txt:el&&el.textContent.slice(0,240), b:el?el.querySelectorAll('button').length:0}; el&&el.querySelector('.zh-on').click(); return r; })()""")
    check('After a site: the tally, then Onward or Rest by the hearth (%s)' % h, h['txt'] and '5:12' in h['txt'] and '+80' in h['txt'] and 'Bread ×2' in h['txt'] and h['b'] >= 2, h)
    # ── photo ──
    ph = g.js("""(()=>{ ZPHOTO.open(); return new Promise(r=>setTimeout(()=>{ var a={bar:!!document.querySelector('.zphoto-bar'), hid:document.body.classList.contains('zphoto'), fr:document.querySelectorAll('.zph-f option').length}; ZPHOTO.close(); a.closed=!document.querySelector('.zphoto-bar')&&!document.body.classList.contains('zphoto'); a.tab=ZPAUSE.TABS.some(t=>t.id==='photo'); r(a); },300)); })()""")
    check('Photo mode: the HUD hides, frames to choose, and it closes clean; Photo is a pause tab (%s)' % ph, ph['bar'] and ph['hid'] and ph['fr'] >= 2 and ph['closed'] and ph['tab'], ph)
    sc = g.js("""(()=>new Promise(r=>ZSHARE.draw({kind:'boss',title:'Zola defeated the Goblin King',sub:'Day 4'},function(c){ r({w:c.width,h:c.height}); })))()""")
    check('A saga card is drawn 1200×630 (%s)' % sc, sc['w'] == 1200 and sc['h'] == 630, sc)
    cd = g.js("(()=>{ var c=ZCODE.make(5,102,3), r=ZCODE.read(c), bad=ZCODE.read(c.slice(0,-1)+(c.slice(-1)==='A'?'B':'A')); return {c:c, r:r, bad:bad}; })()")
    check('Challenge codes read back (and a mistyped one does not) (%s)' % cd, cd['r'] == {'bi': 5, 'secs': 102, 'medal': 3} and cd['bad'] is None, cd)
    # ── trophies, loom ──
    tr = g.js("""(()=>{ var ps=%s.playerState; ps.bossSites={s1_tower:'Goblin King'}; ps.ribbons={sp:1}; ps.trophySpots={}; ZTROPHY.open(); var el=document.querySelector('.zshelf'); el.querySelector('.zt-sp[data-i="2"]').click(); var picks=el.querySelectorAll('.zt-pick [data-k]').length; el.querySelector('.zt-pick [data-k="boss:s1_tower"]').click();
      var placed=ps.trophySpots[2]; el.querySelector('.zt-sp[data-i="5"]').click(); el.querySelector('.zt-pick [data-k="boss:s1_tower"]').click(); var moved=[ps.trophySpots[2],ps.trophySpots[5]]; el.remove(); ZLOOM.open(); var lm=document.querySelector('.zloom'), panels=lm.querySelectorAll('.zlm-p').length; lm.remove(); return {picks:picks, placed:placed, moved:moved, panels:panels}; })()""" % WS)
    check('The trophy shelf: pieces placed and moved; the Saga Loom shows its five panels (%s)' % tr, tr['picks'] >= 2 and tr['placed'] == 'boss:s1_tower' and tr['moved'] == [None, 'boss:s1_tower'] and tr['panels'] == 5, tr)
    # ── secrets ──
    se = g.js("""(()=>{ var ws=%s, ps=ws.playerState, L=ZSECRET.list(ws), by={}; L.forEach(s=>by[s.q]=(by[s.q]||0)+1); ps.secrets={}; var s=L.find(x=>x.k==='purse'), g0=ps.gold||0; ws.player.x=s.x; ws.player.y=s.y; ZSECRET.tick(); return {n:L.length, by:by, got:!!ps.secrets[s.id], gold:(ps.gold||0)-g0}; })()""" % WS)
    check('120 secrets, 30 a realm; walking onto one takes it (%s)' % se, se['n'] == 120 and se['by'] == {'1': 30, '2': 30, '3': 30, '4': 30} and se['got'] and se['gold'] == 40, se)
    # ── crypt ──
    cr = g.js("""(()=>{ var ws=%s, P=ZECHO.spot(ws); ZECHO.tick(); ws.player.x=P.x; ws.player.y=P.y; ZECHO.tick(); var tab=!!Z3.tab; ZECHO.open(); var el=document.querySelector('.zecho-ui'), r={tab:tab, rows:el.querySelectorAll('.ze-r').length, code:!!el.querySelector('.ze-in'), built:!!ws._zcryptO}; el.remove(); return r; })()""" % WS)
    check('The crypt of echoes stands by the Green: Tab opens it, beaten guardians listed, a code box (%s)' % cr, cr['tab'] and cr['rows'] == 1 and cr['code'] and cr['built'], cr)
    ec = g.js("""(()=>{ var ws=%s, ps=ws.playerState, s=ZECHO.allBossSites(ws)[0]; ps.bossSites={}; ps.bossSites[s]='Guardian'; ps.medals={}; ZECHO.cur={k:s,name:'Guardian'}; var g0=ps.gold||0; ZECHO.done({t:95,hits:0}); var el=document.querySelector('.zhearth'), code=el&&el.querySelector('.ze-cd').textContent; el&&el.remove();
      return {m:ps.medals[s], best:(ps.echoBest||{})[s], gold:(ps.gold||0)-g0, code:code, rd:ZCODE.read(code)}; })()""" % WS)
    check('An echo beaten without a hit: a gold rune, the time kept, a challenge code (%s)' % ec, ec['m'] == 3 and ec['best'] == 95 and ec['gold'] == 80 and ec['rd'] and ec['rd']['secs'] == 95, ec)
    ng = g.js("""(()=>{ var ps={ngp:2}; var K=ZNGP.K(ps), m={maxHp:100,hp:100}; return {K:K}; })()""")
    check('The saga retold: foes stronger each time round (%s)' % ng, ng['K']['mon'] > 1.5 and ng['K']['boss'] > ng['K']['mon'], ng)
    # ── bonds ──
    bd = g.js("""(()=>{ var ps=%s.playerState; ps.bonds={}; ps.bondHeard={}; ps.bondDay={}; ps.gday=10; ZVOICE.say('benno','Hello!'); ZVOICE.say('benno','Again!'); var h1=ZBOND.hearts(ps,'benno'), p1=ps.bonds.benno; ps.bonds.benno=6; var L=ZBOND.line(ps,'benno'), L2=ZBOND.line(ps,'benno'), L3=ZBOND.line(ps,'benno');
      try{ ZDLG._q=[]; if(ZDLG.cur)ZDLG.cur.close(); }catch(e){} return {p1:p1, h:ZBOND.hearts(ps,'benno'), L:L, L2:L2, L3:L3}; })()""" % WS)
    check('Bonds: one heart-point a day for talking; two hearts unlock two of their own lines, in order (%s)' % bd, bd['p1'] == 1 and bd['h'] == 2 and 'sailor' in (bd['L'] or '') and 'Old Mother' in (bd['L2'] or '') and bd['L3'] is None, bd)
    # ── banner and aurora ──
    bn = g.js("""(()=>{ ZBANNER.show('Fernheim','a new realm opens'); var el=document.querySelector('.zbanner'); return {el:!!el, img:!!(el&&el.querySelector('img'))}; })()""")
    check('The saga frame at a big beat (the thin illuminated frame for now) (%s)' % bn, bn['el'] and bn['img'], bn)
    au = g.js("""(()=>{ var ws=%s; ws._night=0.9; ZAURORA.draw(ws); var g=ws._zauG; return {g:!!g, d:g&&g.depth, n:g&&g.commandBuffer?g.commandBuffer.length:-1}; })()""" % WS)
    check('Aurora in the water: drawn on the water layer, below every prop and person (depth %s)' % au, au['g'] and au['d'] < 10, au)
    E = [x for x in g.errs if 'Failed to load resource' not in x and 'decode audio' not in x]
    check('No game errors', not E, E[:3])
with sync_playwright() as p:
    PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        r.fulfill(path=f) if os.path.isfile(f) else r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/lab.artifact.html"); pg.wait_for_timeout(3000)
    pg.evaluate("LTODO.goTo('worldlook5','.w4-c',0)"); pg.wait_for_timeout(700)
    c = pg.evaluate("({ban:document.querySelectorAll('.w5-b').length, lm:document.querySelectorAll('.w5-lmp,.w4-c .w4-f').length, v:document.querySelectorAll('.w5-v').length, seg:document.querySelectorAll('.w5-v .wl-seg').length})")
    check('Lab → The world, revamped 5: 20 banners, the 4 landmarks, 9 vista ideas to pick (%s)' % c, c['ban'] == 20 and c['lm'] >= 4 and c['v'] == 9 and c['seg'] == 9, c)
    log = json.dumps({'game': 'zeldara', 'v': 1, 'log': [{'k': 'session', 'place': 'the village'}, {'k': 'death', 'boss': 'Goblin King'}, {'k': 'death', 'boss': 'Goblin King'}, {'k': 'site', 'id': 's1_tower', 't': 420}, {'k': 'end', 'place': 'Gildenmark'}]})
    pg.evaluate("LTODO.goTo('playlog','#pl-in',0)"); pg.wait_for_timeout(700)
    has = pg.evaluate("!!document.getElementById('pl-in')")
    if has:
        pg.fill('#pl-in', log); pg.click('#pl-add'); pg.wait_for_timeout(300)
    pl = pg.evaluate("({has:!!document.getElementById('pl-in'), txt:(document.getElementById('pl-out')||{}).textContent||''})")
    check('Lab → Play log: a pasted log becomes tallies (falls per guardian, minutes per site) (%s)' % pl['txt'][:160], pl['has'] and 'Goblin King' in pl['txt'] and '7 min' in pl['txt'], pl)
    tr = pg.evaluate("(()=>{ var T={}; TRK.forEach(g=>g.items.forEach(i=>T[i.id]=i.st)); return {w1:T.wave1,w2:T.wave2,w3:T.wave3,pad:T.pad,remap:T.remap,wl5:T.wl5}; })()")
    check('The tracker: waves 1–3, the pad and remapping done; take 5 waits for you (%s)' % tr, tr == {'w1': 'done', 'w2': 'done', 'w3': 'done', 'pad': 'done', 'remap': 'done', 'wl5': 'you'}, tr)
    check('No Lab script errors', not errs, errs[:3])
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
