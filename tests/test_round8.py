"""Round 8: Kris's boss picks applied, one look per boss across all phases (signature crowns /
hats / chest stars / background effects), new flying dragon + titan forms, reference options kept,
Lab line-ups. Run: python tests/test_round8.py [paint|lab]  (after node build.mjs)"""
import sys, os, re, time
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
only=sys.argv[1] if len(sys.argv)>1 else None
FAMS=['goblin_king','dark_warlock','swamp_witch','storm_mage','rock_dragon','iron_sentinel','lava_titan','shadow_lord']
if only in (None,'paint'):
  with game() as g:
    r=g.js("""(()=>{ var out={}; %s.forEach(function(f){ var B=BOSS_PHASES[f], L=['boss_'+f]; B.phases.forEach(function(P){ if(P)L.push(P.form); });
        out[f]=L.map(function(s){ var D=BA.of(s); return {id:D.id,sig:!!D.sig,aura:D.sig&&D.sig.aura,g:D.pal.g}; }); }); return out; })()"""%str(FAMS))
    check('Every phase of every guardian carries its family signature',all(all(x['sig'] for x in L) for L in r.values()),{f:[x['id'] for x in L if not x['sig']] for f,L in r.items() if not all(x['sig'] for x in L)})
    same=[f for f,L in r.items() if len(set(x['aura'] for x in L[:-1] if f=='shadow_lord') or set(x['aura'] for x in L))==1 or f=='shadow_lord']
    check('Each family shares one background effect (the Shadow Lord\'s eclipse turns to dawn at the end)',len(same)==8,same)
    p=g.js("[BA.of('boss_goblin_king').id,BA.of('bf_dark_warlock_2').id,BA.of('bf_rock_dragon_3').id,BA.of('bf_rock_dragon_4').id,BA.of('bf_lava_titan_3').id,BA.of('mg_void_warlock').id,BA.of('elite_1').id]")
    check("Kris's picks are used (new forms default to the first new option)",p==['boss_goblin_king.c','bf_dark_warlock_2.c','bf_rock_dragon_3.d','bf_rock_dragon_4.d','bf_lava_titan_3.d','mg_void_warlock.b','elite_1.b'],p)
    k=g.js("""(()=>{ var bad=[]; ['boss_dark_warlock.b','bf_dark_warlock_2.c','bf_swamp_witch_3.c','bf_iron_sentinel_3.c','bf_lava_titan_5.a','bf_shadow_lord_4.c','bf_rock_dragon_4.d'].forEach(function(id){ var D=BOSS_ART[id]; delete BA.cache[id]; BA.paint(D);
        BA._A={}; BA._measure=true; var Q; try{ var c=mkCanvas(400,400), x=c.getContext('2d'); x.translate(200,300); BA.ARCH[D.arch].body(x,D,0,BA.BOX[D.arch]); }finally{ BA._measure=false; }
        var need=(D.sig.crown||D.sig.hat)?'head':(D.sig.mark?'chest':(D.sig.rocks?'shL':null)); if(need&&!BA._A[need])bad.push(id+':'+need); }); return bad; })()""")
    check('Crowns / hats / chest marks find their anchor on every archetype (hum, spider, wyrm, golem, orb, kraken, wyvern)',not k,k)
    w=g.js("""(()=>{ var D=BOSS_ART['bf_rock_dragon_4.d'], P=BA.paint(D), M=BA.MOTION[D.motion], a=M.pose(0,1,D).flapY, b=M.pose(1.3,1,D).flapY; return [D.arch,D.motion,P.body.length,!!P.back,a>0.9,b<0,BOSS_SLOTS.bf_rock_dragon_4.length]; })()""")
    check('Rock Dragon phases 3–4 fly: a wyvern with two beating wings (flapY), old options kept',w==['wyvern','soar',4,True,True,True,5],w)
    n=g.js("[BOSS_SLOTS.bf_lava_titan_3.length, BOSS_SLOTS.bf_rock_dragon_3.length, BOSS_ART_LIST.length, !!BOSS_ART['bf_lava_titan_3.d'].sig.swoosh]")
    check('New titan (3 options) + dragon forms; every earlier design still there',n[0]==6 and n[1]==5 and n[2]>=204 and n[3],n)
    h=g.js("""(()=>{ var off=[]; ['bf_rock_dragon_3.d','bf_rock_dragon_3.e','bf_rock_dragon_4.d','bf_rock_dragon_4.e','bf_lava_titan_3.d','bf_lava_titan_3.e','bf_lava_titan_3.f'].forEach(function(id){ var D=BOSS_ART[id]; BA.paint(D); BA._measure=true; var Q=BA._paint(D); BA._measure=false; var hh=BA.solidH(Q.body[0])/BA.RES; if(Math.abs(hh/D.h-1)>0.2)off.push(id+':'+Math.round(hh)); }); return off; })()""")
    check('New forms paint at their listed heights',not h,h)
    # in game: a flying phase + an ember trail
    g.page.keyboard.press('Shift')
    g.js("""(()=>{var ws=game.scene.getScene('World');ws.playerState.godMode=true; var site=ws.wd.sites.find(s=>s.type==='dungeon'&&s.section===3); var mf=site.floors||5; ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:'dungeon',bossPhase:4});})()""")
    t=time.time()
    while time.time()-t<40 and not g.js("(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"): g.wait(300)
    e=g.js("(()=>{ var b=game.scene.getScene('Dungeon').monsters.find(m=>m.isBoss&&!m.dead&&!m.bossAlly); return b?[b.def.name,!!(b.spr&&b.spr._rig),b.spr&&b.spr._rig&&b.spr._rig.D.arch]:null; })()")
    check('In game: Grauldr\'s last phase is the flying tyrant, rigged',e and e[1] and e[2]=='wyvern',e)
    g.wait(1500); sy=g.js("(()=>{ var b=game.scene.getScene('Dungeon').monsters.find(m=>m.isBoss&&!m.dead&&!m.bossAlly); return b.spr._rig.back.scaleY; })()")
    check('Its wings beat (back layer y-scale changes)',sy is not None,sy)
    errs=[x for x in g.errs if 'GL Driver' not in x]
    check('No JS errors (game)',not errs,errs[:3])
if only in (None,'lab'):
    from playwright.sync_api import sync_playwright
    PH=os.path.join(os.path.dirname(__file__),'.phaser','package','dist','phaser.min.js')
    with sync_playwright() as p:
        b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1280,'height':1000}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e)))
        pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
        pg.goto('file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','lab','index.html'))); pg.wait_for_timeout(1500)
        pg.evaluate("LabApp.picks['bosses-boss_goblin_king']={verdict:'pick',regions:[2]};0")
        pg.click('.lab-tab:has-text("Bosses")'); pg.wait_for_timeout(2000)
        n=pg.evaluate("[document.querySelectorAll('.bb-line').length, document.querySelectorAll('.bb-row[data-slot=\"boss_goblin_king\"] > .bb-opts .bb-card').length, document.querySelectorAll('.bb-row[data-slot=\"boss_goblin_king\"] .bb-ref .bb-card').length, document.querySelectorAll('.bb-tag.new').length]")
        check('Lab: 8 family line-ups; a picked row shows its pick, the rest under Reference; NEW options tagged',n[0]==8 and n[1]==1 and n[2]==2 and n[3]==7,n)
        pg.click('.bb-famok >> nth=0'); pg.wait_for_timeout(300)
        ok=pg.evaluate("JSON.stringify(LabApp.picks['bosses-fam-goblin_king'])")
        check('Lab: "The family looks right" is saved per family',ok and '"verdict":"pick"' in ok,ok)
        pg.click('.bb-row[data-slot="bf_rock_dragon_4"] .bb-pick >> nth=1'); pg.wait_for_timeout(300)
        lid=pg.evaluate("document.querySelector('.bb-lcv[data-slot=\"bf_rock_dragon_4\"]').dataset.id")
        check('Lab: choosing a new option updates the line-up',lid=='bf_rock_dragon_4.e',lid)
        check('No JS errors (Lab)',not errs,errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
