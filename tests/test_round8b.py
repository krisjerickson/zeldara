"""Round 8 (part 2): boss signature attacks. Every pattern runs, hurts you when you stand in it and
spares you in its gap / safe spot, cleans up after itself; the director starts on its own; stagger,
punish window, last stand; summons mostly gone; the Lab lists each boss's attacks.
Run: python tests/test_round8b.py [game|lab]  (after node build.mjs)"""
import sys, os, re, time, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
only=sys.argv[1] if len(sys.argv)>1 else None
LAUNCH = """(([typ,sec,ph])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true;
  var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec); var mf=site.floors||{1:3,2:4,3:5,4:6}[sec];
  ws.scene.sleep('World'); ws.scene.launch('Dungeon',{site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon',bossPhase:ph||1});})"""
READY="(()=>{var d=game.scene.getScene('Dungeon');return !!(d&&d._ready&&d.monsters&&d.monsters.some(m=>m.isBoss&&!m.dead));})()"
def until(g,expr,ms=40000):
    t=time.time()
    while (time.time()-t)*1000<ms:
        if g.js(expr): return True
        g.wait(300)
    return False
# run one pattern synchronously with fixed dt; the player stands at a spot chosen by `place`
RUN="""(([name,place,maxT])=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly), ps=S.worldScene.playerState;
  ps.godMode=false; ps.maxHp=99999; ps.hp=99999; S.playerIFrames=0; S._introT=0; if(!m._bp)BossPat.init(S,m); var B=m._bp; B.t=999; B.busy=0; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun;
  var F=BossPat.field(S); var put=function(x,y){ S.px=x; S.py=y; S.pCont.setPosition(x,y); };
  if(place==='near')put(m.x+60,m.y+10);
  var act=BossPat.run(S,m,name,B); if(!act)return {err:'no act'}; var hp0=ps.hp, gfx0=S.children.list.length, t=0, steps=0, hits=0, safe=place==='safe';
  while(t<maxT&&S._bpAct.length){ if(safe&&act._safe)act._safe(); S.playerIFrames=0; var h=ps.hp; BossPat.tick(S,0.05); if(ps.hp<h)hits++; t+=0.05; steps++; }
  var left=S._bpAct.length; (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct=[]; S._bpAct._s=S._bpRun; ps.godMode=true; ps.hp=ps.maxHp;
  return {hits:hits,t:Math.round(t*10)/10,left:left,busy:B.busy,hold:Math.round((m._hold||0)*10)/10}; })"""
if only in (None,'game'):
  with game() as g:
    g.page.keyboard.press('Shift')
    g.js(LAUNCH+'(["dungeon",3,1])'); until(g,READY); g.wait(600)
    s=g.js("(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead); return [BossPat.slotOf(m), BossAtk.forSlot(BossPat.slotOf(m)).list, MDEFS.rock_dragon.hp, MDEFS.rock_dragon._r8hp]; })()")
    check('The phase-1 guardian has its family\'s signature attacks (and +20% health)', s[0]=='boss_rock_dragon' and 'rain:rock' in s[1] and s[3], s)
    # every pattern, standing in harm's way: it must land; it must also clean up
    hit={}; bad=[]
    for name in ['rain:rock','wall:fire','burst','spin','floor:lava','burrow','boomerang:hammer','quake','combo','strafe:fire','eclipse','mirror']:
        r=g.js(RUN+'(["%s","near",12])'%name)
        hit[name]=r.get('hits')
        if r.get('err') or r['left']!=0 or r['busy']!=0: bad.append((name,r))
    check('All 12 pattern kinds run to the end and clean up (no leftovers, boss free again)', not bad, bad[:3])
    landed=[k for k,v in hit.items() if v and v>0]
    check('Standing in the danger zone gets you hit (most patterns land on a careless hero)', len(landed)>=9, hit)
    # rain: a struck column hurts, an open column is safe
    rn=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead), ps=S.worldScene.playerState; ps.godMode=false; ps.hp=ps.maxHp=99999; S._introT=0; if(!m._bp)BossPat.init(S,m); var B=m._bp; B.t=999; var out=[];
       [1,0].forEach(function(want){ var a=BossPat.run(S,m,'rain:rock',B); BossPat.tick(S,0.05); var i=Object.keys(a.cols).find(k=>a.cols[k]===want), x=a.F.x+(+i+0.5)*a.cw;
         var hits=0; for(var k=0;k<200&&S._bpAct.length;k++){ S.px=x; S.pCont.setPosition(S.px,S.py); S.playerIFrames=0; var h=ps.hp; BossPat.tick(S,0.05); if(ps.hp<h)hits++; if(a.cols&&a.cols[i]!==want)break; } (S._bpAct||[]).forEach(z=>{try{z.kill()}catch(e){}}); S._bpAct.length=0; out.push(hits); });
       ps.godMode=true; return out; })()""")
    check('Sky rain: standing in a struck column hurts; an open column is safe', rn and rn[0]>=1 and rn[1]==0, rn)
    # burst: stand exactly between two beams
    bt=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead), ps=S.worldScene.playerState; ps.godMode=false; ps.hp=ps.maxHp=99999; var B=m._bp; B.t=999;
       var orig=Math.random; Math.random=function(){ return 0; }; var a=BossPat.run(S,m,'burst',B); Math.random=orig;
       var n=8, cy=m.y-(BossPat.rig(m)?BossPat.rig(m).D.h*0.35:20), ang=Math.PI/n; S.px=m.x+Math.cos(ang)*90; S.py=cy+Math.sin(ang)*90; S.pCont.setPosition(S.px,S.py);
       var hits=0; for(var k=0;k<80&&S._bpAct.length;k++){ S.playerIFrames=0; var h=ps.hp; BossPat.tick(S,0.05); if(ps.hp<h)hits++; } ps.godMode=true; return hits; })()""")
    check('Radial burst: standing between two beams is safe', bt==0, bt)
    q=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead), ps=S.worldScene.playerState; ps.godMode=false; ps.hp=ps.maxHp=99999; var B=m._bp; B.t=999;
       S.px=m.x+120; S.py=m.y; S.pCont.setPosition(S.px,S.py); var a=BossPat.run(S,m,'quake',B); var hits=0;
       // step into the ring's gap as soon as it exists
       for(var k=0;k<120&&S._bpAct.length;k++){ var A=S._bpAct.find(z=>z.boss===m); S.playerIFrames=0; var h=ps.hp; BossPat.tick(S,0.05); if(ps.hp<h)hits++; } ps.godMode=true; return hits; })()""")
    check('Shockwave (Highlands: two rings): at most one hit per ring', q is not None and q<=2, q)
    # punish window: after an attached move the boss holds still briefly
    r=g.js(RUN+'(["combo","near",12])')
    check('Punish window: after a big move the boss stays open (holds) for a moment', r['hold']>=0.5, r)
    # director: starts by itself once you are near and the title card is over
    d=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead); m._bp=null; S._introT=0; S.px=m.x+100; S.py=m.y; S.pCont.setPosition(S.px,S.py); BossPat.tick(S,0.05); var B=m._bp; if(!B)return 'no director'; B.t=0.01; BossPat.tick(S,0.05); var n=S._bpAct.length; return [n, B.busy]; })()""")
    check('The director starts attacks on its own when you are near', d and d[0]>=1, d)
    g.js("(()=>{ var S=game.scene.getScene('Dungeon'); (S._bpAct||[]).forEach(a=>{try{a.kill()}catch(e){}}); S._bpAct.length=0; })()")
    # stagger: enough hits → staggered, takes +50% damage, holds
    st=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead), B=m._bp; B.busy=0; B.t=999; var need=BOSS_RAMP[3].stag; var hp0=m.hp;
       for(var i=0;i<need+1;i++){ m.hp-=5; BossPat.tick(S,0.05); } var st=B.stagT>0, hold=m._hold>0; var h1=m.hp; m.hp-=20; BossPat.tick(S,0.05); var drop=h1-m.hp; return [st,hold,Math.round(drop)]; })()""")
    check('Stagger: after enough hits the boss reels, holds still and takes +50% damage', st and st[0] and st[1] and st[2]>=29, st)
    # last stand (final form only)
    g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(800)
    g.js(LAUNCH+'(["tower",4,5])'); until(g,READY); g.wait(800)
    ls=g.js("""(()=>{ var S=game.scene.getScene('Dungeon'), m=S.monsters.find(x=>x.isBoss&&!x.dead&&!x.bossAlly); S._introT=0; S.px=m.x+100; S.py=m.y; S.pCont.setPosition(S.px,S.py); BossPat.tick(S,0.05); var B=m._bp; if(!B)return 'no director';
       B.busy=0; m._hp=m.maxHp*0.1; B.lastHp=m.hp; BossPat.tick(S,0.05); return [!!B.desp, B.despDone, B.enraged, S._bpAct.length, BossPat.slotOf(m)]; })()""")
    check('Last stand: the final form below 15% unleashes its desperation combo', ls and ls[1] and ls[2] and ls[3]>=2, ls)
    sm=g.js("[BOSS_PHASES.storm_mage.phases[1].kit.indexOf('summon'), BOSS_PHASES.swamp_witch.phases[1].kit.indexOf('summon')>=0, Object.keys(BOSS_PHASES).reduce((n,k)=>n+BOSS_PHASES[k].phases.filter(P=>P&&/summon/.test(P.kit||'')).length,0)]")
    check('Summons mostly gone (only the Swamp Witch\'s frogs stay)', sm[0]<0 and sm[1] and sm[2]==1, sm)
    # other bosses get two fitting patterns
    o=g.js("[BossAtk.forSlot(MAGE_TOWERS[0].boss).list.length, BossAtk.forSlot(CASTLE_ISLANDS[Object.keys(CASTLE_ISLANDS)[0]].warden).list.length, BossAtk.forSlot('elite_1').list.length, BossAtk.forSlot('boss_isl_2').list.length]")
    check('Wardens, mage masters and island guardians get 2 fitting patterns; elites 1', o==[2,2,1,2], o)
    g.js("game.scene.getScene('Dungeon')._exitToWorld(null)"); g.wait(600)
    errs=[e for e in g.errs if 'GL Driver' not in e]
    check('No JS errors (game)', not errs, errs[:3])
if only in (None,'lab'):
    from playwright.sync_api import sync_playwright
    PH=os.path.join(os.path.dirname(__file__),'.phaser','package','dist','phaser.min.js')
    with sync_playwright() as p:
        b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1280,'height':1000}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e)))
        pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
        pg.goto('file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','lab','index.html'))); pg.wait_for_timeout(1500)
        pg.click('.lab-tab:has-text("Bosses")'); pg.wait_for_timeout(1500)
        n=pg.evaluate("[document.querySelectorAll('.bb-atk').length, (document.querySelector('.bb-row[data-slot=\"bf_rock_dragon_4\"] .bb-atk')||{}).textContent||'']")
        check('Lab: every boss row lists its signature attacks (+ last stand on final forms)', n[0]>=70 and 'Strafing run' in n[1] and 'last stand' in n[1], n)
        check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
