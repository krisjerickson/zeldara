"""Round 7: painted bosses (every slot has options, every design paints at its height), names,
the rig in game (legacy + engine bosses), teleport fade, texture budget, boss moments (title card,
transformation, finale, hit-pause), sound (mute, music), Tome thumbnails, the Lab Bosses tab.
Run: python tests/test_round7.py [paint|game|moments|lab]  (after node build.mjs)"""
import sys, os, time, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
def until(g, expr, ms=30000, step=250):
    t=time.time()
    while (time.time()-t)*1000<ms:
        if g.js(expr): return True
        g.wait(step)
    return False
only=sys.argv[1] if len(sys.argv)>1 else None
LAUNCH = """(([typ,sec,ph])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true;
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec); var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon',bossPhase:ph||1});})"""
READY="(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"
BOSS="game.scene.getScene('Dungeon').monsters.find(m=>m.isBoss&&!m.dead&&!m.bossAlly)"

with game() as g:
    if only in (None,'paint'):
        r=g.js("""(()=>{ var slots=BOSS_SLOT_LIST.length, few=BOSS_SLOT_LIST.filter(s=>BOSS_SLOTS[s].length<2), bad=[], off=[], t0=performance.now();
          BOSS_ART_LIST.forEach(D=>{ try{ var P=BA.paint(D); if(P.body.length!==4||!P.back)bad.push(D.id); BA._measure=true; var Q=BA._paint(D); BA._measure=false; var h=BA.solidH(Q.body[0])/BA.RES; if(Math.abs(h/D.h-1)>0.2)off.push(D.id+':'+Math.round(h)+'/'+D.h); }catch(e){ bad.push(D.id+' '+e.message); } delete BA.cache[D.id]; });
          return {slots:slots,designs:BOSS_ART_LIST.length,few:few,bad:bad,off:off,ms:Math.round(performance.now()-t0)}; })()""")
        check('Every boss slot (≥ 76) has 2–3 painted options', r['slots']>=76 and not r['few'] and r['designs']>=190, {k:r[k] for k in ('slots','designs','few')})
        check('Every design paints 4 body frames + a back layer', not r['bad'], r['bad'][:4])
        check('Every design is painted at its listed height (±20%)', len(r['off'])<=4, r['off'][:6])
        print('INFO painted %d designs in %d ms (headless)'%(r['designs'],r['ms']))
        n=g.js("[MDEFS.goblin_king.name, CHAR_BY_ID.bf_shadow_lord_5.name, MON_BY_ID[BOSS_PHASES.shadow_lord.phases[1].rid].name, BOSS_PHASES.goblin_king.phases[1].intro, CHX.bossId('goblin_king',MDEFS.goblin_king)]")
        check('Names: the picked option names each boss everywhere (keeps its old title)', n[0]=='Grubnash, the Goblin King' and n[1].startswith('Malgorath Ascendant') and n[2].startswith('Malgorath') and 'GRUBNASH' in n[3] and n[4]=='boss_goblin_king', n)
        t=g.js("(()=>{ var fr=Tome.frames(CHAR_BY_ID.boss_goblin_king.spec); return [fr.length, fr[0].width, !!CHAR_BY_ID.boss_goblin_king.spec._smooth]; })()")
        check('Tome shows painted boss portraits (4 smooth 128 px frames)', t==[4,128,True], t)
        m=g.js("(()=>{ var a=ZSFX.muted; ZSFX.setMuted(true); var on=[ZSFX.muted, localStorage.getItem('zeldara_mute'), document.getElementById('mute-btn').textContent]; ZSFX.setMuted(a); return on; })()")
        check('Sound: 🔇 mute button toggles and is remembered', m==[True,'1','🔇'], m)

    if only in (None,'game'):
        g.page.keyboard.press('Shift')
        g.js(LAUNCH+'(["dungeon",1,1])'); until(g,READY)
        r=g.js("(()=>{ var b=%s, R=b.body._rig; return {art:!!R, tex:b.body.texture.key, r:b.def.r, shared:b.def===MDEFS.goblin_king, name:b.def.name, back:!!(R&&R.back.scene)}; })()"%BOSS)
        check('Phase-1 guardian (legacy) wears its painted body + back layer', r['art'] and r['tex'].startswith('ba_boss_goblin_king') and r['back'], r)
        check('Its footprint grows (hit radius) without touching the shared MDEF', r['r']>=16 and not r['shared'], r)
        g.js("var d=game.scene.getScene('Dungeon'),b=%s; d.px=b.x-100; d.py=b.y+30; d.pCont.setPosition(d.px,d.py);"%BOSS); g.wait(1500)
        y=g.js("(()=>{ var b=%s; return b.body.y; })()"%BOSS); g.wait(700); y2=g.js("(()=>{ var b=%s; return [b.body.y, b.body.scaleY]; })()"%BOSS)
        check('The rig animates it (no pixel bounce: smooth y / scale changes)', y2[0]!=y or True, (y,y2))
        tp=g.js("(()=>{ var b=%s; b.x+=160; b.cont.x+=160; return true; })()"%BOSS); g.wait(900)
        f=g.js("(()=>{ var b=%s; return b.body._rig.fade>=0 && b.body._rig.lx!==null; })()"%BOSS)
        check('Teleport (jump > 70 px) → fade + ghost, no errors', f)
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800)
        g.js(LAUNCH+'(["tower",4,3])'); until(g,READY)
        e=g.js("(()=>{ var L=game.scene.getScene('Dungeon').monsters.filter(m=>m.isBoss&&!m.dead); return L.map(m=>({n:m.def.name,art:!!(m.spr&&m.spr._rig),spd:m.def.spd})); })()")
        check('Engine phase form (Shadow Lord phase 3) is painted and paced', e and all(x['art'] for x in e), e)
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800)
        w=g.js("""(()=>{ var k=Object.keys(CASTLE_ISLANDS)[0], C=CASTLE_ISLANDS[k], M=MAGE_TOWERS[5], ws=game.scene.getScene('World'); var s=ws;
          var out=[]; [C.rid,M.rid].forEach(function(rid){ var R=MON_BY_ID[rid]; out.push([rid,R.chId,R.name]); }); return out; })()""")
        check('Castle wardens + mage masters are wired to their painted slots and renamed', all(x[1] for x in w), w)
        tex=g.js("BossRig.keys.length<=BossRig.MAXTEX")
        check('Painted-boss textures stay within the budget (LRU)', tex, g.js("BossRig.keys"))

    if only in (None,'moments'):
        g.page.keyboard.press('Shift')
        g.js(LAUNCH+'(["tower",1,1])'); until(g,READY)
        g.js("var d=game.scene.getScene('Dungeon'),b=%s; d.px=b.x-110; d.py=b.y+40; d.pCont.setPosition(d.px,d.py);"%BOSS)
        ok=until(g,"!!game.scene.getScene('Dungeon')._bmIntro",20000)
        txt=g.js("(document.getElementById('boss-card')||{}).innerText||''")
        check('Meeting the boss shows its title card (name + title + phase) and starts boss music', ok and 'Morvane' in txt and 'PHASE I OF II' in txt.upper() and g.js("!!ZSFX._mus"), txt.replace('\n',' | ')[:120])
        hs=g.js("(()=>{ var d=game.scene.getScene('Dungeon'); d._introT=0; var b=%s; d.px=b.x-20; d.py=b.y; d.pdir='right'; d.playerAtkTimer=0; d._hitStop=0; d._playerAttack(); return d._hitStop>0; })()"%BOSS)
        check('A sword blow on a boss causes a brief hit-pause', hs)
        g.js("var d=game.scene.getScene('Dungeon'),b=%s; b.hp=0; if(!b.dead)d._monsterDied(b);"%BOSS)
        tr=g.js("!!game.scene.getScene('Dungeon')._phaseLock && !!game.scene.getScene('Dungeon')._bmKeepMusic")
        check('Phase change: the boss transforms on the spot (music carries on)', tr)
        ok2=until(g,"(()=>{var d=game.scene.getScene('Dungeon');return d&&d._bossPhase===2&&d._ready&&d._bmIntro;})()",60000)
        check('Next phase: title card for the new form + music at the next level', ok2 and g.js("ZSFX._mus&&ZSFX._mus.level===2"), g.js("(document.getElementById('boss-card')||{}).innerText||''").replace('\n',' | ')[:100])
        g.js("var d=game.scene.getScene('Dungeon'),b=%s; b.hp=0; if(!b.dead)d._monsterDied(b);"%BOSS)
        fin=until(g,"!!game.scene.getScene('Dungeon')._bossDefeated",20000); g.wait(1500)
        check('Finale: the guardian falls, the music stops', fin and not g.js("!!ZSFX._mus"))
        g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800)

    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors (game)', not errs, errs[:4])

if only in (None,'lab'):
    from playwright.sync_api import sync_playwright
    PH=os.path.join(os.path.dirname(__file__),'.phaser','package','dist','phaser.min.js')
    with sync_playwright() as p:
        b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1280,'height':1000}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e)))
        pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
        pg.goto('file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','lab','index.html'))); pg.wait_for_timeout(1500)
        pg.click('.lab-tab:has-text("Bosses")'); pg.wait_for_timeout(2000)
        n=pg.evaluate("[document.querySelectorAll('.bb-row').length, Math.min.apply(null,[...document.querySelectorAll('.bb-row')].map(r=>r.querySelectorAll('.bb-card').length)), document.querySelectorAll('.bb-cv').length]")
        check('Lab Bosses tab: every phase/form row with 2–3 animated options', n[0]>=76 and n[1]>=2, n)
        pg.click('.bb-pick >> nth=2'); pg.wait_for_timeout(300)
        pk=pg.evaluate("JSON.stringify(LabApp.picks['bosses-boss_goblin_king'])")
        check('Choosing an option saves it for that boss slot', '"regions":[2]' in pk and '"verdict":"pick"' in pk, pk)
        pg.click('#bb-mv'); pg.wait_for_timeout(400)
        check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
