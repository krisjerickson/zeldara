"""Round 14: logos in the game (plaza floor inlay, second-tier emblems), the wordmark typeface on titles and
labels, and the Projectiles Lab tab.  Run: python tests/test_round14.py  (after node build.mjs)"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
from playwright.sync_api import sync_playwright
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
with game(new=True) as g:
    g.wait(800)
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), cs=function(sel){ var e=document.querySelector(sel); return e?getComputedStyle(e).fontFamily:''; };
      var t=ws.add.text(0,0,'x',{fontSize:'18px',fontFamily:'Segoe UI',fontStyle:'bold'}), t2=ws.add.text(0,0,'x',{fontSize:'10px',fontFamily:'Segoe UI'}), f=[t.style.fontFamily,t2.style.fontFamily]; t.destroy(); t2.destroy();
      return {mhdr:cs('.mhdr'), btn:cs('#hud button')||cs('button'), rname:cs('.rname'), dtx:cs('.dtx'), notif:getComputedStyle(document.getElementById('notif-area')).fontFamily, phaser:f, fonts:[...document.fonts].filter(x=>x.status==='loaded').map(x=>x.family.replace(/['"]/g,'')+x.weight)}; })()""")
    check('Titles use Cinzel Decorative, buttons / region name / world labels Marcellus SC; messages stay plain', 'Cinzel Decorative' in r['mhdr'] and 'Marcellus SC' in r['btn'] and 'Marcellus SC' in r['rname'] and 'Marcellus SC' in r['dtx'] and 'Cinzel' not in r['notif'] and 'Marcellus' not in r['notif'], r)
    check('Text drawn by the game engine follows: big or bold → Cinzel, small → Marcellus SC; the faces are loaded', r['phaser'][0].startswith('"Cinzel"') and r['phaser'][1].startswith('"Marcellus SC"') and len(r['fonts'])>=4, [r['phaser'],r['fonts']])
    # plaza inlay: teal logo lines in the ground texture at the village centre
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), cam=ws.cameras.main; var snap=null; game.renderer.snapshotArea(Math.round(game.scale.width/2-110),Math.round(game.scale.height/2-110),220,220,function(img){ var c=document.createElement('canvas'); c.width=220; c.height=220; var q=c.getContext('2d'); q.drawImage(img,0,0); var d=q.getImageData(0,0,220,220).data, teal=0; for(var i=0;i<d.length;i+=4){ if(d[i+1]>200&&d[i+2]>190&&d[i]<210&&d[i+1]-d[i]>25)teal++; } window._teal=teal; }); return true; })()""")
    g.wait(700); teal=g.js("window._teal")
    check('The village plaza floor at the start carries the glowing logo', teal is not None and teal>900, teal)
    r=g.js("""(()=>{ var out={}; out.urls=['tree_c','crossed_axes','axes_serpent','axes_tree','blade_b','serpent_coil','way_b','way_compass'].map(id=>ZLogo.url(id,84).length>2000);
      ZLogo.banner('blade_b','Level 2','test'); var b=document.getElementById('zl-banner'); out.banner=[b.classList.contains('on'), !!b.querySelector('img'), b.querySelector('.zb-t').textContent];
      openWorldMap({}); out.map=document.querySelector('#modal-map .mhdr').style.backgroundImage.length>100; closeModal('map');
      document.getElementById('camp-title').textContent='⚒ Forge'; ZLogo.headers(); var f=document.querySelector('#modal-camp .mhdr'); out.forge=f._zl;
      document.getElementById('camp-title').textContent='🏛 Adventurers Guild'; ZLogo.headers(); out.guild=f._zl;
      document.getElementById('camp-title').textContent='⚓ Harbour — Ferry'; ZLogo.headers(); out.harbour=f._zl;
      BossMoments.card('Grubnash','the Goblin King','Phase I of III','','#9be36a'); out.card=!!document.querySelector('#boss-card .bc-in img.zlogo'); BossMoments.hideCard();
      out.bosshud=[...document.querySelectorAll('style')].some(function(x){ return x.textContent.indexOf('#boss-hud::before')>=0&&x.textContent.indexOf('data:image/png')>=0; });
      out.inlay=typeof wRuneCircle==='function'&&/logo/.test(wRuneCircle.toString()); return out; })()""")
    check('Every logo renders as an emblem; banner shows emblem + title', all(r['urls']) and r['banner']==[True,True,'Level 2'], r)
    check('Windows get their emblem: map, forge → Crossed Axes, guild → Axes & World Tree, harbour → Coiled Serpent; boss card and boss bar too', r['map'] and r['forge']=='crossed_axes' and r['guild']=='axes_tree' and r['harbour']=='serpent_coil' and r['card'] and r['bosshud'], r)
    # waystone awakening: flash + banner; arrival flash
    r=g.js("""(()=>{ var ws=game.scene.getScene('World'), w=ws.wd.waystones[1], n0=ws.children.list.length; ws._activateWaystone(w); var b=document.getElementById('zl-banner'); return {flash:ws.textures.exists('zl_way_b'), more:ws.children.list.length>n0, t:b.querySelector('.zb-s').textContent}; })()""")
    check('Awakening a waystone shows the Wayfinder mark in the world and a banner', r['flash'] and r['more'] and r['t']=='Waystone awakened', r)
    check('No JS errors (game)', not g.errs, g.errs[:3])
HERE=os.path.dirname(os.path.abspath(__file__)); PH=os.path.join(HERE,'.phaser','package','dist','phaser.min.js')
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); pg=b.new_page(viewport={'width':1280,'height':1000}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*cdnjs.*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    pg.goto('file://'+os.path.join(HERE,'..','lab','index.html')); pg.wait_for_timeout(1500)
    pg.click('.lab-tab:has-text("Projectiles")'); pg.wait_for_timeout(900)
    r=pg.evaluate("""(()=>{ var cards=document.querySelectorAll('.br-card[data-tab=proj]'), bad=[], cv=document.createElement('canvas'); cv.width=120; cv.height=80; var c=cv.getContext('2d');
      [['arrow','arrow_cold','arrow_fire','arrow_heat','dart'],['frost_bolt','fireball','lightning','ice_shards','void_orb'],['rock','spit','bone_arrow','dark_bolt']].forEach(function(K,gi){ [ZProj.ARROWS,ZProj.SPELLS,ZProj.SHOTS][gi].forEach(function(S){ K.forEach(function(k){ c.setTransform(1,0,0,1,0,0); c.clearRect(0,0,120,80); c.translate(60,40); try{ ZProj.draw(c,k,S,1.3); }catch(e){ bad.push(S.id+'/'+k+' '+e.message); return; } var d=c.getImageData(0,0,120,80).data, n=0; for(var i=3;i<d.length;i+=4)if(d[i]>60)n++; if(n<25)bad.push(S.id+'/'+k+' ink '+n); }); }); });
      return {n:cards.length, groups:[ZProj.ARROWS.length,ZProj.SPELLS.length,ZProj.SHOTS.length], bad:bad}; })()""")
    check('Lab Projectiles tab: 6 arrow looks, 5 spell looks, 4 monster-shot looks, every shot draws', r['n']==15 and r['groups']==[6,5,4] and not r['bad'], r)
    pg.evaluate("document.querySelector('.br-card[data-id=ar_longbow] .br-pick').click()"); pg.wait_for_timeout(200)
    check('A projectile pick is saved as proj-<id>', '"verdict":"pick"' in pg.evaluate("JSON.stringify(LabApp.picks['proj-ar_longbow'])"))
    check('No JS errors (Lab)', not errs, errs[:3]); b.close()
print('%d/%d passed'%(sum(res),len(res)))
