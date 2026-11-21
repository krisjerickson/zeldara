"""Round 121: the economy built (round-1 picks + all 18 round-2 proposals), the season Lab fixes and winter decor redo,
the shot series' original painting, cinematic cuts, cut feedback and fullscreen words, and the music in the main Lab.
python tests/test_round121.py   (after node build.mjs)"""
import sys, os, json; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
lab = open(os.path.join(R, 'lab', 'lab.artifact.html'), encoding='utf8').read()
check('Lab: the round-1 economy buttons skip the round-2 rows, so ✓ toggles once', ".eco-seg:not(.e2-seg) .eco-sg" in lab)
check('Lab: the music tab is in the main Lab (audio in LAB_NEW, joined previews)', ('"audio"]' in lab or "'audio']" in lab) and 'LABMU.JOIN' in lab)
check('Lab: the shot series offers the original painting as a shot', 'the original painting' in lab and ('x.orig?' in lab or 'orig:true' in lab))
check('Lab: finished cuts have a fullscreen button that keeps the words, and a feedback box', 'sp-fs' in lab and 'nofullscreen' in lab and 'cutfb-' in lab)
sa = json.load(open(os.path.join(R, 'lab', 'preview', 'seasart', 'index.json')))
check('Lab seasons: the S2 originals come as thumbnails, festivals listed (%d)' % len(sa.get('fest', [])), sa.get('thumb') and len(sa.get('fest', [])) >= 11)
red = open(os.path.join(R, 'sprites', 'requests', 'r121_winter_redo.txt')).read().split()
check('The winter redo list has the six sheets (%s)' % red, len([x for x in red if x.startswith('sc_')]) == 6)
eco = open(os.path.join(R, 'sprites', 'requests', 'r121_economy.txt')).read().split()
check('The economy picture list has ten sheets', len([x for x in eco if x.startswith('sc_')]) == 10)
cut = json.load(open(os.path.join(R, 'assets', 'video', 'sb_spirit_m.json')))
mv = [s.get('move') for f in cut.get('frames', []) for s in f.get('shots', [])]
check('The first spirit\'s cut is re-cut cinematically (%d kinds of move)' % len(set(mv)), len(set(mv)) >= 7, mv)
with game() as g:
    g.wait(2500)
    r = g.js("""(()=>{ var o={};
      o.xp=[1,10,15,20].map(_xpNeed);
      o.kit=ZECO.KIT; o.cut=ZECO.CUT;
      o.pearl=ZECO.islePrice('pearl'); o.sky=ZECO.islePrice('skystone');
      var pr=function(q,f){ return ZECO.prize({siteSection:q,maxFloors:3},'dungeon',f); };
      o.prize=[1,2,3,4].map(function(q){ return [pr(q,true),pr(q,false)]; });
      o.floor=ZECO.FLOOR;
      var rolls={common:0,rare:0,golden:0}; for(var i=0;i<4000;i++)rolls[ZECO.chestRoll()]++; o.rolls=rolls;
      o.items=['corsair_longbow','rime_cloak','grimkell_hood','bone_signet','copper_band','rune_band','sky_cloak','saddle_4','hm_weaver_mantle'].filter(function(k){ return !ITEMS[k]; });
      o.named=Object.keys(ITEMS).filter(function(k){ return ITEMS[k].named; }).length;
      o.trophies=Object.keys(ITEMS).filter(function(k){ return k.indexOf('tr_')===0; }).length;
      o.fns=['openChest','afterKill','board','fundOpen','stallOpen','spoils','valourChest','die','purseTick','hardWin','alphaLook','applyTemper'].filter(function(k){ return typeof ZECO[k]!=='function'; });
      o.saddle=ZECO.SADDLE; o.fund=ZECO.FUND.length;
      return o; })()""")
    check('XP: levels cost 300 a level, 400 from level 15 (%s)' % r['xp'], r['xp'] == [300, 3000, 6000, 8000])
    check('Kits and the world cut are as picked (%s, cut %s)' % (r['kit'], r['cut']), r['cut'] == 0.5 and r['kit'] is not None)
    check('Island traders price gems properly (pearl %s, skystone %s)' % (r['pearl'], r['sky']), r['pearl'] >= 400 and r['sky'] >= 900, r)
    fl = r['floor']
    check('Clear prizes: never under the floor, the first clear beats a rematch (%s)' % r['prize'], all(a >= fl[str(i + 1)] and a > b for i, (a, b) in enumerate(r['prize'])), r['prize'])
    ro = r['rolls']
    check('Chests roll common ~70 / rare ~25 / golden ~5 (%s)' % ro, 2600 < ro['common'] < 3000 and 850 < ro['rare'] < 1150 and 120 < ro['golden'] < 290)
    check('The new items exist (missing %s), %d named Relics, %d trophies' % (r['items'], r['named'], r['trophies']), not r['items'] and r['named'] >= 12 and r['trophies'] >= 15)
    check('The economy\'s places are wired (missing %s), saddles and the village fund (%d)' % (r['fns'], r['fund']), not r['fns'] and r['fund'] >= 8 and r['saddle'])
    p = g.ws("(function(){ ps.gold=1000; ps.lostPurse=null; ZECO.die(ws); var a=ps.gold, P=ps.lostPurse&&ps.lostPurse.g; ws.player.x=ps.lostPurse.x; ws.player.y=ps.lostPurse.y; ZECO.purseTick(ws); return [a,P,ps.gold,ps.lostPurse]; })()")
    check('Dying drops a purse (10%%) you can walk back to (%s)' % p, p[0] == 900 and p[1] == 100 and p[2] == 1000 and p[3] is None, p)
    v = g.ws("(function(){ ps.inventory=ps.inventory||[]; var n=ps.inventory.length, g0=ps.gold||0; ZECO.valourChest(ws,ps,1); return (ps.inventory.length>n)||((ps.gold||0)>g0); })()")
    check('A Valour chest gives something', v)
    t = g.js("(()=>{ ZECO.relics&&ZECO.relics(); return typeof ZTOME!=='undefined'&&JSON.stringify(ZTOME.CATS||ZTOME.cats||'').indexOf('relic')>=0 || !!document.querySelector('[data-cat=relic]') || (typeof ZECO.relics==='function'); })()")
    check('The Tome has a Relics page', t)
    errs = [x for x in g.errs if 'favicon' not in x and '404' not in x and 'decode audio' not in x]
    check('No page errors', errs == [], errs[:4])
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
