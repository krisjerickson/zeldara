"""Round 3: no attacks through walls, shooters keep their distance, summon once, packs stay dead,
spirit familiars (levels, skills, 4 slots), fairies + digging + trials, Fairy Kings, Tome by quadrant.
Run from the repo root after `node build.mjs`: python tests/test_round3.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def until(g, expr, ms=20000):
    for _ in range(ms // 500):
        if g.ws(expr): return True
        g.wait(500)
    return False
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  -> ' + str(info)), flush=True)
TP = "(([x,y])=>{ var ws=game.scene.getScene('World'); ws.player.x=x; ws.player.y=y; ws.player.cont.setPosition(x,y); ws.cameras.main.centerOn(x,y); })"

with game(new=True) as g:
    g.wait(500)
    g.ws("(ps.godMode=true)")
    # stand in the Grasslands (the village is a safe zone: monsters there don't fight)
    g.ws("(()=>{ var w=ws.wd.waystones.find(w=>w.region===1); var p=ws._fairySpot(w.x+6,w.y+6,2); ws.player.x=p.x*TILE+16; ws.player.y=p.y*TILE+16; ws.player.cont.setPosition(ws.player.x,ws.player.y); ws.cameras.main.centerOn(ws.player.x,ws.player.y); })()"); g.wait(800)
    # ── walls block melee ──
    r = g.ws("""(()=>{ var p=ws.player, tx=Math.floor(p.x/TILE), ty=Math.floor(p.y/TILE); ws.pdir='right'; ws.player.dir='right';
      var mon=MX.spawn(ws,'clover_slime',(tx+2)*TILE+16,ty*TILE+16,{q:1}); mon.section=1; ws.worldMonsters.push(mon); mon._m.stunT=5;
      var old=ws.tiles[ty][tx+1]; ws.tiles[ty][tx+1]=T.BUILDING_WALL; var los=_heroLOS(ws,p.x,p.y,mon.x,mon.y); var h0=mon.hp; ws.playerAtkTimer=0; ws._attack&&ws._attack(); var hitWall=mon.hp<h0;
      ws.tiles[ty][tx+1]=old; var los2=_heroLOS(ws,p.x,p.y,mon.x,mon.y); return [los,hitWall,los2]; })()""")
    check('A wall between you and a monster blocks your sword (line of sight)', r[0] is False and r[1] is False and r[2] is True, r)

    # ── shooters back away ──
    r = g.ws("""(()=>{ MON_BY_ID.t_shooter=Object.assign({},MON_BY_ID.goblin_slinger,{id:'t_shooter'}); MX.KITS.t_shooter='chase | shoot p=rock spd=230 m=0.5 cd=1.8';
      var p=ws.player, m=MX.spawn(ws,'t_shooter',p.x+50,p.y,{q:1}); m.section=1; ws.worldMonsters.push(m); m._m.aggro=true; window._sh=m; return Math.round(Math.hypot(m.x-p.x,m.y-p.y)); })()""")
    g.wait(2500)
    d2 = g.ws("Math.round(Math.hypot(window._sh.x-ws.player.x,window._sh.y-ws.player.y))")
    check('Monsters that only shoot back away when you get close', d2 > r + 25, (r, d2))

    # ── summon once ──
    r = g.ws("""(()=>{ var p=ws.player, m=MX.spawn(ws,'apprentice_conjurer',p.x+120,p.y,{q:1}); m.section=1; ws.worldMonsters.push(m); m._m.aggro=true; var AT=MX.ATK.summon, a=m.kit.atk.find(a=>a.name==='summon'), A=MX.A(ws);
      var w1=AT.want(A,m,m._m,{x:p.x,y:p.y},120,a.p); AT.fire(A,m,m._m,{x:p.x,y:p.y},a.p); var kids=m._m.children.slice(); kids.forEach(k=>{ k.hp=0; });
      var w2=AT.want(A,m,m._m,{x:p.x,y:p.y},120,a.p); return [w1,kids.length,w2,kids.every(k=>k._m.summoned)]; })()""")
    check('Summoners call helpers once; when those die no more come', r[0] and r[1] >= 1 and r[2] is False and r[3], r)

    # ── packs stay dead nearby ──
    r = g.ws("""(()=>{ var m=ws.worldMonsters.find(m=>m.mx&&!m.campId&&!m.temp&&!m.dead); ws.player.x=m.spawnX+60; ws.player.y=m.spawnY; ws.player.cont.setPosition(ws.player.x,ws.player.y); m.hp=0; if(!m.dead)ws._worldMonsterDied(m); m.respawnTimer=0; window._pk=m; return !!m.dead; })()""")
    g.wait(1500)
    stay = g.ws("window._pk.dead")
    g.ws("(()=>{ ws.player.x=window._pk.spawnX+TILE*45; ws.player.cont.setPosition(ws.player.x,ws.player.y); window._pk.respawnTimer=0; })()"); g.wait(1500)
    back = g.ws("!window._pk.dead")
    check('Roaming packs stay dead while you are nearby, and return once you leave', r and stay and back, (r, stay, back))

    # ── spirit familiars ──
    r = g.js("""(()=>{ var fids=Object.keys(FAMILIARS); return {fids:fids, els:fids.map(f=>FAMILIARS[f].el), picks:Object.keys(FAMILIAR_PICK).map(k=>SPIRIT_BY_ID[FAMILIAR_PICK[k]].el===k), designs:SPIRIT_DESIGNS.length, per:['grass','water','earth','fire'].map(e=>SPIRIT_DESIGNS.filter(D=>D.el===e).length), skills:Object.keys(FAM_SKILLS).map(k=>FAM_SKILLS[k].length)}; })()""")
    check('4 elemental familiars from 12 spirit designs (3 per element), 6 skills each', r['fids'] == ['fam_grass','fam_water','fam_earth','fam_fire'] and all(r['picks']) and r['per'] == [3,3,3,3] and r['skills'] == [6,6,6,6], r)
    r = g.ws("""(()=>{ var o={ownedFamiliars:['firefly','sea_sprite','storm_hawk'],familiar:'storm_hawk',familiar2:'firefly',completedIslands:[1,2,3]}; _famMigrate(o); return [o.ownedFamiliars.join(), o.familiar, o.familiar2]; })()""")
    check('Old familiars migrate to their element spirits', r == ['fam_grass,fam_water,fam_earth','fam_earth','fam_grass'], r)
    r = g.ws("""(()=>{ ps.ownedFamiliars=['fam_grass','fam_water','fam_earth','fam_fire']; ps.famLevels={fam_grass:1,fam_water:3}; ps.fairyKings=[]; ps.familiar='fam_grass'; ps.familiar2='fam_water'; ps.familiar3='fam_earth'; ps.familiar4='fam_fire';
      var a=_heroActiveFamiliars(ps).length; ps.fairyKings=['k2','k3','k4']; var b=_heroActiveFamiliars(ps).length; return [a,b,_famSkills(ps,'fam_grass').length,_famSkills(ps,'fam_water').length, _famMult(ps,'fam_water')>_famMult(ps,'fam_grass')]; })()""")
    check('1 active familiar, +1 per Fairy King (up to 4); skills unlock by level and scale up', r == [1,4,1,3,True], r)
    g.ws("(()=>{ var p=ws.player, m=MX.spawn(ws,'thistle_hog',p.x+90,p.y,{q:1}); m.section=1; ws.worldMonsters.push(m); m._m.stunT=8; m.maxHp=m._hp=500; window._mm=ws.worldMonsters.filter(m=>!m.dead).map(m=>[m,m.hp]); })()")
    until(g, "window._mm.reduce((a,e)=>a+Math.max(0,e[1]-(e[0].dead?0:e[0].hp)),0)>0")
    r = g.ws("({v:Object.keys(ws._famVisuals||{}), tex:Object.keys(ws._famVisuals||{}).map(k=>ws._famVisuals[k].texture.key), hurt:window._mm.reduce((a,e)=>a+Math.max(0,e[1]-(e[0].dead?0:e[0].hp)),0)})")
    check('Four spirits fly with you (spirit textures) and attack', len(r['v']) == 4 and all(t.startswith('spirit_') for t in r['tex']) and r['hurt'] > 0, r)

    # ── fairies: chat → quest → dig → trial → skill ──
    g.ws("(()=>{ ps.ownedFamiliars=[]; ps.famLevels={}; ps.fairyKings=[]; ps.fairyQuests={}; ps.hasTrowel=false; ps.familiar=ps.familiar2=ps.familiar3=ps.familiar4=null; })()")
    r = g.ws("({f:ws._fairies.length, perQ:[1,2,3,4].map(q=>ws._fairies.filter(f=>f.q===q).length), k:ws._kings.map(k=>k.q), digs:Object.keys(ws._digSpots).length})")
    check('5 fairies per quadrant, Fairy Kings in the Wetlands, Highlands, Ashlands, a dig spot for every object', r['perQ'] == [5,5,5,5] and r['k'] == [2,3,4] and r['digs'] == 29, r)
    g.ws("ws._talkFairy(ws._fairies[0])"); g.wait(300)
    t = g.js("document.querySelector('#fairy-talk .ft-text').textContent")
    check('Before you have the familiar a fairy only chats (and hints at the island)', 'fairy companion' in t and 'island' in t, t[:120])
    g.js("FairyTalk.close()")
    g.ws("(()=>{ ps.ownedFamiliars=['fam_grass']; ps.familiar='fam_grass'; ps.famLevels={fam_grass:1}; })()")
    g.ws("ws._talkFairy(ws._fairies[2])"); g.wait(300)
    t2 = g.js("document.querySelector('#fairy-talk .ft-text').textContent"); g.js("FairyTalk.close()")
    g.ws("ws._talkFairy(ws._fairies[0])"); g.wait(300)
    t = g.js("document.querySelector('#fairy-talk .ft-text').textContent")
    g.js("document.querySelector('#fairy-talk .ft-btns button').click()"); until(g, "!!ps.fairyQuests.q1_f0")
    q = g.ws("JSON.stringify(ps.fairyQuests.q1_f0)")
    check('With the familiar: fairies teach in order; the first asks for an object and gives the trowel', 'first visit' in t2.lower() and 'Silver Acorn' in t and '"st":"seek"' in q and g.ws("ps.hasTrowel===true"), (t2[:80], t[:80], q))
    tq = g.js("Tome.entry('quest','q1_f0').lines.map(l=>l[1]).join(' | ')")
    check('The quest is in the Tome with a strong hint (zone, runes, direction from a waystone, G to dig)', 'Windmill Hills' in tq and 'head' in tq and 'G to dig' in tq, tq[:200])
    D = g.ws("(()=>{ var D=ws._digSpots.silver_acorn; return [D.x*TILE+16,D.y*TILE+16]; })()")
    g.js(TP + "([%d,%d])" % (D[0] + 32 * 6, D[1])); g.wait(500); g.ws("ws._dig()"); g.wait(300)
    miss = g.ws("ps.fairyQuests.q1_f0.got.length")
    g.js(TP + "([%d,%d])" % (D[0] + 12, D[1])); g.wait(900); g.ws("(ws._digCd=0, ws._dig())"); g.wait(400)
    got = g.ws("ps.fairyQuests.q1_f0.got.join()")
    check('Digging (G) away from the spot finds nothing; at the sparkles it finds the object', miss == 0 and got == 'silver_acorn', (miss, got))
    f0 = g.ws("[ws._fairies[0].x,ws._fairies[0].y]")
    g.js(TP + "([%d,%d])" % (f0[0], f0[1] + 40)); g.wait(1200)
    _plan_theme = g.js("_trialPlanOf(1,0).theme")
    D = "game.scene.getScene('Dungeon')"
    def in_realm():
        return until(g, f"!!(game.scene.isActive('Dungeon')&&{D}._tr&&!{D}._trialOver)", 15000)
    def back_in_world():
        return until(g, "game.scene.isActive('World') && !game.scene.isActive('Dungeon')", 15000)
    g.ws("ws._talkFairy(ws._fairies[0])"); g.wait(300); g.js("document.querySelector('#fairy-talk .ft-btns button').click()")
    ok = in_realm(); k = g.js(f"{D}._tr&&{D}._tr.theme")
    ok and g.js(f"TrialRealm.end({D},true)"); back = back_in_world()
    check('Bringing it back sends you to the trial realm; passing it teaches the next skill', ok and k == _plan_theme and back and g.ws("_famLevel(ps,'fam_grass')===2 && ps.fairyQuests.q1_f0.st==='done'"), (k, g.ws("ps.famLevels")))
    # ── Fairy Monarch ──
    g.ws("(()=>{ sbUnlockAll(); ps.ownedFamiliars=['fam_grass','fam_water']; ps.famLevels={fam_grass:2,fam_water:3}; })()")
    K = g.ws("[ws._kings[0].x,ws._kings[0].y]")
    g.js(TP + "([%d,%d])" % (K[0], K[1] + 90)); g.wait(2500)
    g.ws("ws._talkKing(ws._kings[0])"); g.wait(300); g.js("document.querySelector('#fairy-talk .ft-btns button').click()"); until(g, "!!ps.fairyQuests.king2")
    g.ws("(ps.fairyQuests.king2.got=ps.fairyQuests.king2.need.slice())")
    g.ws("ws._talkKing(ws._kings[0])"); g.wait(300); g.js("document.querySelector('#fairy-talk .ft-btns button').click()")
    seen = []
    for _ in range(3):
        if not in_realm(): break
        seen.append(g.js(f"{D}._tr.theme")); g.js(f"TrialRealm.end({D},true)"); g.wait(1500)
    back = back_in_world()
    check('Fairy Monarch: 3 objects, then 3 trials in a row → one more familiar slot', seen == g.js("MONARCH_TRIAL_PLAN[2]") and back and g.ws("ps.fairyKings.join()==='k2'&&_maxFamiliarSlots(ps)===2"), (seen, g.ws("ps.fairyKings")))
    # ── Tome by quadrant ──
    g.key('t', 80); g.wait(500)
    g.js("document.querySelector('[data-tcat=quest]').click()"); g.wait(400)
    r = g.js("({secs:[...document.querySelectorAll('#tome-grid .tome-sec')].map(s=>s.querySelector('h4').textContent.split(' ')[0]), bg:[...document.querySelectorAll('#tome-grid .tome-sec')].map(s=>s.style.background)})")
    check('Tome chapters are grouped by quadrant with their own light colour (Quests chapter added)', r['secs'][:4] == ['Grasslands','Wetlands','Highlands','Ashlands'] and len(set(r['bg'])) == len(r['bg']), r)
    g.js("document.querySelector('[data-tcat=familiar]').click()"); g.wait(400)
    r = g.js("[...document.querySelectorAll('#tome-grid .tome-sec h4')].map(h=>h.textContent)")
    check('Familiars sit in their quadrants in the Tome', len(r) == 4, r)
    g.key('Escape'); g.wait(200)
    errs = [e for e in g.errs if 'GL Driver' not in e]
    check('No page errors', not errs, errs[:5])

print(f'\n{sum(res)}/{len(res)} passed')
sys.exit(0 if all(res) else 1)
