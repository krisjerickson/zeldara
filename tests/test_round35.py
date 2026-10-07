"""Round 35 — painted icons in the page (ZIcon), the framed control bar and HUD, the rebuilt inventory (hero + gear slots + item grid +
detail panel), wardens and masters at 1.5 × a guardian.   Run: python tests/test_round35.py"""
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
R = os.path.join(os.path.dirname(__file__), '..')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:460] if info != '' else ''), flush=True)
I = json.load(open(os.path.join(R, 'assets', 'scenery', 'index.json')))
with game(painted=True) as g:
    g.wait(2500)
    r = g.js("({miss:Object.keys(ITEMS).filter(function(k){ return !ZIcon.has('ic_'+k); }),ui:['ui_attack','ui_ranged','ui_ammo','ui_defend','ui_potion','ui_food','ui_spell','ui_mount','ui_familiar','ui_special','ui_map','ui_quests','ui_inventory','ui_tome','ui_heart','ui_mana','ui_xp','ui_gold','sl_head','sl_ring','tab_all','mk_tower','q_main','st_atk','orn_corner'].filter(function(i){ return !ZIcon.has(i); })})")
    check('Every item and every control has its painted icon (%d objects cut)' % len(I['items']), r['miss'] == [] and r['ui'] == [] and len(I['items']) >= 830, r)
    r = g.js("""(()=>{ var a=ZIcon.item('iron_sword',2), b=ZIcon.of(ITEMS.potion), c=ZIcon.of(MOUNTS.horse), d=ZIcon.html('no_such','🍞'), e=ZIcon.emo('🗼'), f=ZIcon.emo('🦆'); ZScn.off=true; var off=ZIcon.item('iron_sword'); ZScn.off=false; return {a:/class=.zi./.test(a)&&/icons-0\\.webp/.test(a)&&/width:2em/.test(a),b:/icons-0/.test(b),c:/thumbs\\.webp/.test(c),d:d.indexOf('🍞')>=0&&d.indexOf('zi-fb')>=0,e:/icons-0/.test(e),f:f==='🦆',off:off.indexOf(ITEMS.iron_sword.icon)>=0&&off.indexOf('url(')<0}; })()""")
    check('ZIcon: an item, a mount (its sprite thumbnail) and a known symbol are painted; an unknown id or painted scenery off falls back to the emoji', all(r.values()), r)
    r = g.js("""(()=>{ ZIcon.bar(); var S=Array.from(document.querySelectorAll('#action-icon-bar .aib-slot')); return {n:S.length,painted:S.filter(function(s){ return s.querySelector('.aib-ico .zi'); }).length,tips:S.filter(function(s){ return s.getAttribute('data-tip'); }).length,lbl:S.filter(function(s){ var l=s.querySelector('.aib-lbl'); return l&&getComputedStyle(l).display!=='none'; }).length,keys:S.filter(function(s){ return s.querySelector('.aib-key'); }).length,hud:document.querySelectorAll('#stats-panel .sico .zi').length,menu:document.querySelectorAll('#action-bar .zi').length,w:S[0].getBoundingClientRect().width}; })()""")
    check('Control bar: ten framed slots, each a painted icon with its key; the name is a hover tip, not a label; the HUD and the menu buttons carry painted icons too', r['n'] == 10 and r['painted'] == 10 and r['tips'] == 10 and r['lbl'] == 0 and r['keys'] == 10 and r['hud'] == 4 and r['menu'] >= 6 and 44 <= r['w'] <= 60, r)
    # the inventory
    g.js("""(()=>{ var ps=game.scene.getScene('World').playerState; ps.inventory=['iron_sword','long_sword','leather','potion','potion','bread','ruby_ring','short_bow']; ps.equip={lHand:'wooden_sword'}; ps.maxHp=100; ps.hp=40; ZINV.filter='all'; ZINV.sel=null; toggleModal('inventory'); updateInventoryModal(); })()"""); g.wait(1200)
    r = g.js("""(()=>{ var q=function(s){ return document.querySelectorAll('#inv-content '+s).length; }; var t=Array.from(document.querySelectorAll('#inv-content .zv-tile')); var cv=document.getElementById('zv-hero-cv'), px=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data, n=0; for(var i=3;i<px.length;i+=4)if(px[i]>40)n++; return {gear:q('.zv-doll .zv-slot'),low:q('.zv-row .zv-slot'),rings:q('.zv-rings .zv-slot'),tabs:q('.zv-tabs button'),tiles:t.length,stack:t.filter(function(e){ var b=e.querySelector('.zv-n'); return b&&b.textContent==='2'; }).length,up:q('.zv-up'),hero:n,stats:q('.zv-st'),hint:q('.zv-hint'),painted:q('.zv-tile .zi')}; })()""")
    check('Inventory: the hero drawn in the middle, 10 gear slots round him, 3 + 4 below, 10 rings, 9 filter tabs, his numbers; tiles are painted, two potions stack as one tile with "2", better weapons are marked', r['gear'] == 10 and r['low'] == 7 and r['rings'] == 10 and r['tabs'] == 9 and r['tiles'] == 7 and r['stack'] == 1 and r['up'] == 2 and r['hero'] > 3000 and r['stats'] >= 6 and r['hint'] == 1 and r['painted'] == 7, r)
    r = g.js("""(()=>{ var ps=game.scene.getScene('World').playerState, o={}; ZINV.pick('long_sword'); var d=document.querySelector('#inv-content .zv-detail').textContent; o.detail=/Long Sword/.test(d)&&/Instead of Wooden Sword/.test(d)&&/\\+9 ATK/.test(d)&&/Equip/.test(d);
      ZINV.act('long_sword'); o.eq=ps.equip.lHand==='long_sword'&&ps.inventory.indexOf('long_sword')<0&&ps.inventory.indexOf('wooden_sword')>=0;
      ZINV.pickSlot('lHand'); o.filter=ZINV.filter==='weapons'&&document.querySelectorAll('#inv-content .zv-tile').length===3&&/Take off/.test(document.querySelector('#inv-content .zv-detail').textContent);
      ZINV.actSlot('lHand'); o.off=!ps.equip.lHand&&ps.inventory.indexOf('long_sword')>=0;
      ZINV.setFilter('potions'); var hp=ps.hp; ZINV.act('potion'); o.used=ps.hp>hp&&ps.inventory.filter(function(i){ return i==='potion'; }).length===1;
      ZINV.setFilter('accessories'); ZINV.act('ruby_ring'); o.ring=ps.equip.ring1==='ruby_ring'; window._switchInvTab('food'); o.oldTab=ZINV.filter==='food'; window._openSlotPicker2('head'); o.oldPicker=ZINV.sel&&ZINV.sel.slot==='head'&&ZINV.filter==='armor'; return o; })()""")
    check('Inventory actions: selecting shows the comparison with what is worn; equip, take off, drink a potion and wear a ring all work through the same functions as before; clicking a slot filters the grid to what fits', all(r.values()), r)
    g.js("closeModal('inventory')")
    # wardens and masters
    r = g.js("({k:WARDEN_HP,src:[CastleRun.spawnWarden.toString().indexOf('base.hp*WARDEN_HP*mult')>0,Object.keys(MageRun).some(function(k){ return typeof MageRun[k]==='function'&&MageRun[k].toString().indexOf('base.hp*WARDEN_HP*mult')>0; })]})")
    check('Castle wardens and mage-tower masters have 1.5 × the health of their realm\'s guardian (was 4.2 × and 3.75 ×)', r['k'] == 1.5 and r['src'] == [True, True], r)
    check('No page errors', not g.errs, g.errs[:3])
print('%d/%d passed' % (sum(res), len(res))); sys.exit(0 if all(res) else 1)
