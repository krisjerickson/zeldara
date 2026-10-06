"""Round 28 — difficulty levels (Hearthside · Wayfarer · Shieldbearer · Ragnarök) and painted frames with gaps in their numbering.
Run: python tests/test_round28.py   (ZELDARA_ENGINE=4 for Phaser 4)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game, ENGINE
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:420] if info != '' else ''), flush=True)
def to_world(g):
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): return True
    return False
LAUNCH = """(([typ,sec])=>{var ws=game.scene.getScene('World');var ps=ws.playerState; ps.godMode=true; var site=ws.wd.sites.find(s=>s.type===typ&&s.section===sec&&s.boss); var mf=site.floors;
  var d={site:site,floor:mf-1,maxFloors:mf,worldScene:ws,theme:typ==='tower'?'tower':'dungeon'}; if(game.scene.isActive('Dungeon')){game.scene.getScene('Dungeon').scene.restart(d);return;} ws.scene.sleep('World'); ws.scene.launch('Dungeon',d);})"""
BOSS = "(()=>{var d=game.scene.getScene('Dungeon'); var b=d&&d.monsters&&d.monsters.find(m=>m.isBoss&&!m.bossAlly&&!m.eliteKin); return b?{hp:b.maxHp,atk:b.def.atk,n:d.monsters.filter(m=>!m.isBoss).length}:null;})()"

# ── painted frames: numbering with gaps ──
ix = os.path.join(R, 'assets', 'atlas', 'index.json')
with game(painted=os.path.exists(ix)) as g:
    check('World starts', to_world(g)); g.wait(800)
    if os.path.exists(ix):
        r = g.js("""(()=>{ ZAtlas._index(); var F=ZAtlas.META.frames, bad=[], gaps=0, groups=0; Object.keys(ZAtlas._ix).forEach(function(k){ var L=ZAtlas._ix[k], p=k.split('/'); groups++; if(L[L.length-1]!==L.length-1)gaps++;
            if(ZAtlas.count(p[0],p[1],p[2])!==L.length)bad.push(k+' count'); for(var i=-1;i<L.length+2;i++){ var n=ZAtlas.name(p[0],p[1],p[2],i); if(!n||!F[n])bad.push(k+' #'+i); } }); return {groups:groups,gaps:gaps,bad:bad.slice(0,5),nbad:bad.length}; })()""")
        check('Every animation of every character gives a painted frame for every step (%d animations, %d with gaps in their numbering)' % (r['groups'], r['gaps']), r['nbad'] == 0 and r['groups'] > 3000, r['bad'])
    # ── difficulty: table and defaults ──
    r = g.js("({n:ZDIFF.length,names:ZDIFF.map(d=>d.name),lv:ZDiff.lv(),way:['bossHp','bossDmg','tele','every','speed','monHp','monDmg','count','reward'].every(k=>ZDIFF[1][k]===1)&&ZDIFF[1].waves===0&&ZDIFF[1].guards===0&&ZDIFF[1].stand===0.15&&ZDIFF[1].alphaAt===5&&ZDIFF[1].kin===0})")
    check('Four levels: Hearthside, Wayfarer, Shieldbearer, Ragnarök; a game without a choice is Wayfarer and Wayfarer changes nothing', r['n'] == 4 and r['names'] == ['Hearthside', 'Wayfarer', 'Shieldbearer', 'Ragnarök'] and r['lv'] == 1 and r['way'], r)
    r = g.js("[0,1,2,3].map(i=>ZDIFF[i]).map(d=>[d.bossHp,d.bossDmg,d.monHp,d.monDmg,d.count,-d.tele,-d.every])")
    check('Each level is harder than the one before in boss health, boss damage, monster health, monster damage, numbers, warning time and attack pace', all(all(r[i + 1][k] > r[i][k] for k in range(7)) for i in range(3)), r)
    check('The boss ramp at Wayfarer is the table itself; at Ragnarök warnings are shorter, attacks come sooner and bring one more wave',
          g.js("(()=>{ var a=ZDiff.ramp(3)===BOSS_RAMP[3]; var ps=game.scene.getScene('World').playerState; ps.difficulty=3; var R=ZDiff.ramp(3), B=BOSS_RAMP[3]; var ok=R.tele<B.tele&&R.every<B.every&&R.waves===B.waves+1&&R.stag>B.stag&&B.tele===0.95; ps.difficulty=1; return a&&ok&&ZDiff.ramp(3)===BOSS_RAMP[3]; })()"))
    # ── world monsters: spawn stats and live rescale ──
    base = g.ws("(()=>{ var m=ws.worldMonsters.find(m=>m.mx&&!m.dead&&!m.alpha), l=ws.worldMonsters.find(m=>!m.mx&&m.rid&&!m.dead); window._m1=m; window._l1=l; return {n:ws.worldMonsters.length,hp:m.maxHp,atk:m.def.atk,lhp:l?l.maxHp:0,latk:l?l.monAtk:0,boss:ws.worldMonsters.filter(m=>m._dz&&m._dz.boss).map(m=>m.maxHp)}; })()")
    check('World monsters carry their difficulty factors (Wayfarer: 1)', g.ws("ws.worldMonsters.every(m=>m._dz&&m._dz.h===1&&m._dz.a===1)") and len(base['boss']) >= 1, base['boss'])
    ok = g.js("ZDiff.set(3)"); r = g.js("({lv:ZDiff.lv(),hp:_m1.maxHp,cur:_m1.hp,atk:_m1.def.atk,lhp:_l1?_l1.maxHp:0,latk:_l1?_l1.monAtk:0,boss:game.scene.getScene('World').worldMonsters.filter(m=>m._dz&&m._dz.boss).map(m=>m.maxHp)})")
    check('Switching to Ragnarök in the open world rescales living monsters (health ×1.7, damage ×1.45; bosses ×2.2)', ok and r['lv'] == 3 and abs(r['hp'] - base['hp'] * 1.7) <= 1 and r['cur'] == r['hp'] and abs(r['atk'] - base['atk'] * 1.45) <= 1
          and (not base['lhp'] or abs(r['lhp'] - base['lhp'] * 1.7) <= 1) and all(abs(a - b * 2.2) <= 1 for a, b in zip(r['boss'], base['boss'])), [base, r])
    g.js("ZDiff.set(0)"); r = g.js("({hp:_m1.maxHp,atk:_m1.def.atk})")
    check('…and to Hearthside (health ×0.8, damage ×0.8), back to Wayfarer exactly', abs(r['hp'] - base['hp'] * 0.8) <= 1 and abs(r['atk'] - base['atk'] * 0.8) <= 1 and g.js("ZDiff.set(1)") and abs(g.js("_m1.maxHp") - base['hp']) <= 1, r)
    # ── a dungeon boss at each level ──
    hp = {}
    for lv in (1, 0, 2, 3):
        g.ws("(ps.difficulty=%d, 1)" % lv); g.js(LAUNCH, ['dungeon', 1])
        b = None
        for _ in range(40):
            g.wait(300); b = g.js(BOSS)
            if b: break
        hp[lv] = b
    check('Goblin King at Wayfarer has the health it had before (342)', hp[1] and hp[1]['hp'] == 342, hp[1])
    check('Goblin King health by level: ×0.75 / ×1 / ×1.5 / ×2.2; damage ×0.8 / ×1 / ×1.25 / ×1.5', all(hp[k] for k in hp) and all(abs(hp[k]['hp'] - 342 * f) <= 1 for k, f in ((0, 0.75), (2, 1.5), (3, 2.2)))
          and abs(hp[0]['atk'] - hp[1]['atk'] * 0.8) <= 1 and abs(hp[2]['atk'] - hp[1]['atk'] * 1.25) <= 1 and abs(hp[3]['atk'] - hp[1]['atk'] * 1.5) <= 1, hp)
    check('The level cannot be changed inside a site', g.js("ZDiff.set(1)") is False and g.js("ZDiff.lv()") == 3)
    # a regular floor: more monsters at Ragnarök than at Hearthside
    cnt = {}
    for lv in (0, 3):
        g.ws("(ps.difficulty=%d, 1)" % lv)
        g.js("""(()=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.type==='dungeon'&&s.section===2&&s.boss); var d={site:site,floor:1,maxFloors:site.floors,worldScene:ws,theme:'dungeon'}; game.scene.getScene('Dungeon').scene.restart(d);})()""")
        n = 0
        for _ in range(30):
            g.wait(300); n = g.js("(()=>{var d=game.scene.getScene('Dungeon'); return d&&d.monsters&&d.floor===1?d.monsters.filter(m=>!m.isBoss).length:0;})()")
            if n: break
        cnt[lv] = n
    check('A dungeon floor holds more monsters at Ragnarök than at Hearthside', cnt[0] > 0 and cnt[3] >= cnt[0] * 1.5, cnt)
    check('No page errors', not g.errs, g.errs[:3])
    # ── the save keeps the level; the ❓ panel shows the four buttons ──
    g.ws("(ps.difficulty=2, 1)")
    r = g.js("(()=>{ document.querySelector('button[onclick*=\"controls\"]').click(); var b=document.querySelectorAll('#zdiff-box .zdiff-b'); var on=document.querySelector('#zdiff-box .zdiff-b.on b'); var o={n:b.length,on:on&&on.textContent}; closeModal('controls'); return o; })()")
    check('The ❓ panel shows the four levels with the current one marked', r['n'] == 4 and r['on'] == 'Shieldbearer', r)
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
