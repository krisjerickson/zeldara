"""Round 143: one voice at a time (and NPC lines in the dialogue box out of a fight), the villagers' new lines, the hearth's six frames, each
site's own loading painting, the Lab's new tabs.   python tests/test_round143.py"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import game
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:600]))
WS = "game.scene.getScene('World')"
lab = open(os.path.join(R, 'lab', 'index.html'), encoding='utf-8').read()
check('Lab: the analysis, the villager lines and the round-142 paintings tabs', 'Playability, latency' in lab and 'Villager lines (batch 1)' in lab and 'Round 142 paintings' in lab)
with game(painted=True, w=1280, h=720) as g:
    g.wait(2500)
    v = g.js("(()=>{ var V=ZVOICE.V, n=0; Object.keys(ZVOICE143).forEach(k=>{ Object.keys(ZVOICE143[k]).forEach(s=>{ n+=ZVOICE143[k][s].length; }); }); return {n:n, tilda:(V.tilda.stage||{})['1'].length, oswin:V.oswin.stage['3'].length, pip1:!!(V.pip.stage||{})['1']}; })()")
    check('The villagers\' new lines are in, by stage; the children only after the end (%s)' % v, v['n'] >= 400 and v['tilda'] >= 3 and v['oswin'] >= 5 and not v['pip1'], v)
    t = g.js("""(()=>{ var ws=%s; ZDLG.on=true; ZTALK.on=true; ZDLG.say('Elder Runa','First words.',{}); ZMSG.say('Tob','Short one.'); var b=document.getElementById('zbub'); var on=!!(b&&/\\bon\\b/.test(b.className)); var q=ZDLG._q.length; for(var i=0;i<6&&ZDLG.cur;i++){ ZDLG._q=[]; ZDLG.cur.close(); } return {bubble:on, queued:q}; })()""" % WS)
    check('While someone speaks in the box, a second line waits its turn (no bubble at the same time) (%s)' % t, not t['bubble'] and t['queued'] >= 1, t)
    c = g.js("""(()=>{ var ws=%s; (ws.worldMonsters||[]).forEach(m=>{ if(m._m)m._m.aggro=false; }); ZMSG.say('Tob','Hello there.'); var o=ZDLG.open; for(var i=0;i<6&&ZDLG.cur;i++){ ZDLG._q=[]; ZDLG.cur.close(); } return {open:o, calm:ZTALK.calm()}; })()""" % WS)
    check('Out of a fight, even a short NPC line is said in the dialogue box (%s)' % c, c['open'], c)
    hf = g.js("""(()=>{ ZHEARTH.on=true; ZHEARTH._early=null; ZHEARTH.show({id:'t143',name:'Test',boss:'Test Boss',t:60,gold:1,xp:1,items:[],hits:0}); var el=document.querySelector('.zhearth'); var n=el?el.querySelectorAll('.zhh-fr img').length:0; var b=el&&el.querySelector('.zh-on'); if(b)b.click(); return n; })()""")
    check('The hearth screen plays its six painted frames (%s)' % hf, hf == 6, hf)
    g.wait(800)
    L = """(([id,floor])=>{var ws=game.scene.getScene('World'); var site=ws.wd.sites.find(s=>s.id===id); ws.playerState.godMode=true;
      var data={site:site,floor:floor,maxFloors:site.floors,worldScene:ws,theme:site.type==='tower'?'tower':'dungeon'};
      if(game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); if(game.scene.isActive('World'))ws.scene.sleep('World'); game.scene.start('Dungeon',data); return 1;})"""
    g.js(L, ['s2_dungeon', 0])
    ld = g.js("(()=>{ var e=document.getElementById('zload'); return e?e.innerHTML.indexOf('load_s2_dungeon')>=0:false; })()")
    check('Going into the Ringmere shows its own loading painting', ld, ld)
print('%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
