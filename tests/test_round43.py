"""Round 43 — Kris's Terrain pieces picks are on; everything that moves or sways has its animation frames ordered (wave 43, 7 sheets,
84 frames) and played when they are in; every piece can be walked over: the tall ones stand up (depth-sorted, the hero passes behind
them and they turn see-through), the small ones lie on the ground; plants sway in the wind; how many / how grouped / how mixed /
how varied / how much wind / how many creatures are settings (ZWE.LOOK) with options in the Lab's Terrain pieces tab.
Run: python tests/test_round43.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:520] if info != '' else ''), flush=True)

JOB = """(async (a)=>{ var ws=game.scene.getScene('World'), wd=ws.wd, j=wpChunkJob(wd,a[0],a[1]), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); }
  var o=j.out, live={}, tall={}, feats=0; (o.live||[]).forEach(function(L){ live[L.id]=(live[L.id]||0)+1; }); o.sprites.forEach(function(s){ if(s.zed)tall[s.zed]=(tall[s.zed]||0)+1; });
  return {live:live, nlive:(o.live||[]).length, tall:tall, ntall:Object.keys(tall).reduce(function(a,k){ return a+tall[k]; },0), liveTall:(o.live||[]).filter(function(L){ return L.tall; }).length,
    badTall:Object.keys(tall).filter(function(k){ return !ZWE.TALL[k]; }), badLive:Object.keys(live).filter(function(k){ return !ZWE.ANIM[k]; }), zfx:o.zfx?Object.keys(o.zfx):[], err:Object.keys(WP_ERR)}; })"""

with game(new=True, painted=True, query='?scenery=fake') as g:
    g.wait(2500)
    r = g.js("""(()=>{ var S=ZSCN.SHEETS.filter(function(s){ return s.wave===43; }), ids=[].concat.apply([],S.map(function(s){ return s.items.map(function(i){ return i[0]; }); })), bases={};
      S.forEach(function(s){ s.items.forEach(function(i){ bases[i[5].grp]=(bases[i[5].grp]||0)+1; }); });
      var need=Object.keys(ZWE.ANIM).map(function(k){ return ZWE.ANIM[k]; }).concat(Object.keys(ZWE.CRITANIM).map(function(k){ return ZWE.CRITANIM[k]; }));
      return {sheets:S.length, n:ids.length, uniq:new Set(ids).size, bases:Object.keys(bases).length, counts:Object.keys(bases).map(function(b){ return bases[b]; }), missing:need.filter(function(b){ return !bases[b]; }),
        frames:need.map(function(b){ return ZWE.frames(b); }), refs:S.every(function(s){ return s.refs&&s.refs.length; }), body:ZSCN.body(S[4]).indexOf('Each ROW is ONE subject')>0}; })()""")
    check('Wave 43: seven sheets of animation frames (%d frames, %d moving things), every swaying piece and creature has 3 or 4 frames, each sheet sent with the earlier edge sheets as references' % (r['n'], r['bases']),
          r['sheets'] == 7 and r['n'] == 84 and r['uniq'] == 84 and r['missing'] == [] and set(r['counts']) <= {3, 4} and min(r['frames']) >= 3 and r['refs'] and r['body'], r)
    r = g.js("({lake:ZWE.PICK.lake.feat, sea:ZWE.PICK.sea.feat, marsh:ZWE.PICK.marsh.feat, lava:ZWE.PICK.lava.feat, cliff:ZWE.PICK.cliff.feat, snow:ZWE.PICK.snow.feat, fx:[ZWE.fx('lake','fish'),ZWE.fx('sea','crabs'),ZWE.fx('sea','gulls'),ZWE.fx('marsh','frogs'),ZWE.fx('marsh','fireflies'),ZWE.fx('cliff','birds'),ZWE.fx('lake','dragonflies'),ZWE.fx('lake','butterflies')]})")
    check("Kris's picks are on: every feature card but lake puddles and snow ripples, and all eight creatures",
          r['lake'] == ['logs', 'flowers', 'stones', 'bramble', 'icefloe'] and r['sea'] == ['shells', 'wrack', 'marram', 'sandripples'] and r['marsh'] == ['logs', 'toadstools', 'duckweed', 'mudcracks']
          and r['lava'] == ['obsidian', 'sulphur', 'basalt', 'lavaplate', 'vents'] and r['cliff'] == ['moss', 'alpine', 'rubble'] and r['snow'] == ['icicles', 'pines', 'puddles', 'reedsdry'] and all(r['fx']), r)
    lake = g.js(JOB, [21, 16]); marsh = g.js(JOB, [21, 18]); cliff = g.js(JOB, [19, 15])
    check('Chunks paint without errors; tall pieces become depth-sorted sprites (lake %d, marsh %d, mountain %d) and swaying ones their own moving images (%d, %d, %d)' % (lake['ntall'], marsh['ntall'], cliff['ntall'], lake['nlive'], marsh['nlive'], cliff['nlive']),
          all(o['err'] == [] and o['badTall'] == [] and o['badLive'] == [] for o in (lake, marsh, cliff)) and marsh['ntall'] > 0 and marsh['nlive'] > 0 and lake['liveTall'] > 0, [lake, marsh, cliff])
    # mounted around the hero: depth, sway, see-through, creature frames
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), p=ws.player; p.x=21800; p.y=17400; p.cont.setPosition(p.x,p.y); if(p.body&&p.body.reset)p.body.reset(p.x,p.y); ws.cameras.main.centerOn(p.x,p.y);
      ws._wr.chunks.forEach(function(ch){ ws._wrUnmount(ch); }); ws._wr.chunks.clear(); ws._updateChunks(false); await new Promise(r=>setTimeout(r,9000));
      var live=[], tall=[], an=0; ws._wr.chunks.forEach(function(ch){ (ch.live||[]).forEach(function(im){ live.push(im); }); (ch.tall||[]).forEach(function(im){ tall.push(im); }); ch.objs.forEach(function(o){ if(o._zfx&&o.texture&&/^zan_/.test(o.texture.key))an++; }); });
      var f0=live.map(function(im){ return im.frame.name+'|'+im.angle.toFixed(2); }); await new Promise(r=>setTimeout(r,900)); var moved=live.filter(function(im,i){ return im.frame.name+'|'+im.angle.toFixed(2)!==f0[i]; }).length;
      var flat=live.filter(function(im){ return im.depth===-6; }).length, sorted=tall.filter(function(im){ return Math.abs(im.depth-WR_DEPTH(im.y))<1e-6; }).length;
      var T=tall.filter(function(im){ return im._zh>20; })[0], o={n:live.length,moved:moved,flat:flat,tall:tall.length,sorted:sorted,anims:an,err:Object.keys(WP_ERR)};
      if(T){ p.x=T.x; p.y=T.y-8; p.cont.setPosition(p.x,p.y); await new Promise(r=>setTimeout(r,700)); o.behind=T.alpha; o.heroUnder=WR_DEPTH(p.y)<T.depth;
        p.y=T.y+24; p.cont.setPosition(p.x,p.y); await new Promise(r=>setTimeout(r,700)); o.front=T.alpha; o.heroOver=WR_DEPTH(p.y)>T.depth;
        o.free=ws.physics&&ws.physics.overlapRect?ws.physics.overlapRect(T.x-4,T.y-10,8,8,false,true).length===0:true; }
      return o; })()""")
    check('Mounted: %d swaying images (%d moved within a second, %d lie under the hero), %d standing pieces sorted by their foot (%d), creatures playing their frames (%d emitters)' % (r['n'], r['moved'], r['flat'], r['tall'], r['sorted'], r['anims']),
          r['n'] > 0 and r['moved'] >= r['n'] * 0.5 and r['flat'] > 0 and r['tall'] > 0 and r['sorted'] == r['tall'] and r['anims'] >= 1 and r['err'] == [], r)
    check('Walking behind a standing piece the hero is drawn under it and it turns see-through (%.2f); in front of it he is drawn over it and it is solid again (%.2f)' % (r.get('behind', -1), r.get('front', -1)),
          r.get('heroUnder') and r.get('heroOver') and abs(r.get('behind', 0) - 0.5) < 0.05 and r.get('front') == 1 and r.get('free'), r)
    # the settings
    r = g.js("""(async ()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, L0=JSON.parse(JSON.stringify(ZWE.LOOK)), run=async function(look){ Object.assign(ZWE.LOOK,L0,look); var j=wpChunkJob(wd,21,18), n=0; while(!j.step(30)&&n<4000){ n++; await new Promise(r=>setTimeout(r,5)); }
        var o=j.out, ids={}; (o.live||[]).concat(o.sprites.filter(function(s){ return s.zed; }).map(function(s){ return {id:s.zed}; })).forEach(function(q){ ids[q.id]=(ids[q.id]||0)+1; }); return {n:Object.keys(ids).reduce(function(a,k){ return a+ids[k]; },0), kinds:Object.keys(ids).length, live:(o.live||[]).length}; };
      var o={sparse:await run({dens:0.5}), wild:await run({dens:2}), still:await run({sway:0}), names:Object.keys(ZWE.LOOKS)}; Object.assign(ZWE.LOOK,L0); return o; })()""")
    check('The look settings work: sparse %d pieces, overgrown %d; with the wind still nothing sways (%d)' % (r['sparse']['n'], r['wild']['n'], r['still']['live']),
          r['wild']['n'] > r['sparse']['n'] * 1.5 and r['still']['live'] == 0 and r['names'] == ['dens', 'clump', 'vary', 'size', 'sway', 'crit'], r)
    GAME_LOOK = g.js("ZWE.LOOK")
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No page errors', errs == [], errs[:4])

# the Lab: section 1 of the Terrain pieces tab
from playwright.sync_api import sync_playwright
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
html = open(os.path.join(R, 'lab', 'index.html'), encoding='utf-8').read()
def serve(rq):
    u = rq.request.url
    if u.endswith('.webp'): rq.fulfill(path=os.path.join(R, 'assets', 'scenery', os.path.basename(u)), content_type='image/webp')
    else: rq.fulfill(body=html, content_type='text/html')
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={'width': 1400, 'height': 1000}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=os.environ.get('PHASER_JS', os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')), content_type="application/javascript"))
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort()); pg.route("http://lab.test/**", serve)
    pg.goto('http://lab.test/'); pg.wait_for_timeout(2500); pg.click('.lab-tab[data-tab="tpieces"]'); pg.wait_for_timeout(2500)
    r = pg.evaluate("""()=>{ var cards=document.querySelectorAll('.br-card[data-id^="look_"]'), rec=document.querySelectorAll('.br-card[data-id^="look_"] .bb-m').length;
      var px=0, cv=document.querySelector('.br-card[data-id="look_dens_natural"] canvas'), d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data; for(var i=3;i<d.length;i+=4*97)if(d[i])px++;
      document.querySelector('.br-card[data-id="look_sway_breezy"] .br-pick').click(); document.querySelector('.br-card[data-id="look_sway_still"] .br-pick').click();
      var picked=['still','gentle','breezy'].filter(function(o){ return LBR.picked('tpieces','look_sway_'+o); }); document.querySelector('.br-card[data-id="look_sway_still"] .br-pick').click();
      var rv={}; TPLOOK.ROWS.forEach(function(R){ rv[R[0]]=R[2].filter(function(o){ return o[4]; })[0][3]; });
      return {cards:cards.length, rec:rec, drawn:px>50, picked:picked, places:document.querySelectorAll('.tl-pl').length, rv:rv}; }""")
    check('Lab: six rows of options (%d moving previews, one recommended per row = the game now), one pick per row, six places to preview' % r['cards'],
          r['cards'] == 19 and r['rec'] == 6 and r['rv'] == GAME_LOOK and r['drawn'] and r['picked'] == ['still'] and r['places'] == 6 and errs == [], [r, errs[:3]])
    b.close()

print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
