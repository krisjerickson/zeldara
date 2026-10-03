"""Round 13: the hosted layout — Next.js home page at /, the game at /play, the Lab at /lab — and the in-game title.
Run: python tests/test_site_home.py  (after npm install && node build.mjs)"""
import os, re, sys, subprocess, time, socket
from playwright.sync_api import sync_playwright
res=[]
def check(n,ok,info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ')+n+('  '+str(info) if info else ''), flush=True)
HERE=os.path.dirname(os.path.abspath(__file__)); DIST=os.path.join(HERE,'..','dist'); PH=os.path.join(HERE,'.phaser','package','dist','phaser.min.js')
s=socket.socket(); s.bind(('127.0.0.1',0)); PORT=s.getsockname()[1]; s.close()
srv=subprocess.Popen([sys.executable,'-m','http.server',str(PORT),'--bind','127.0.0.1','-d',DIST],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1.2)
B='http://127.0.0.1:%d'%PORT
SHOT=os.environ.get('SHOT_DIR')
try:
  with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"]); ctx=b.new_context(viewport={'width':1280,'height':720}); pg=ctx.new_page(); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript"))
    check('dist has the home page, the game at /play and the Lab at /lab', all(os.path.exists(os.path.join(DIST,f)) for f in ['index.html','play/index.html','lab/index.html','brand.js']) and 'TitleScene' in open(os.path.join(DIST,'play','index.html'),encoding='utf-8').read() and '_next' in open(os.path.join(DIST,'index.html'),encoding='utf-8').read())
    pg.goto(B+'/'); pg.wait_for_timeout(2500)
    r=pg.evaluate("""(()=>{ var cv=document.querySelector('.home canvas'), c=cv.getContext('2d'), d=c.getImageData(0,0,cv.width,cv.height).data, n=0, teal=0, gold=0; for(var i=0;i<d.length;i+=16){ if(d[i]+d[i+1]+d[i+2]>60)n++; if(d[i+1]>170&&d[i+2]>150&&d[i]<150)teal++; if(d[i]>190&&d[i+1]>140&&d[i+2]<110)gold++; }
      return {title:document.title, brand:!!window.ZBrand&&[ZBrand.LOGO,ZBrand.WORDMARK,ZBrand.HOME], lit:n, teal:teal, gold:gold, links:[...document.querySelectorAll('a.btn')].map(a=>a.getAttribute('href')), h1:document.querySelector('h1').textContent, fonts:[...document.fonts].filter(f=>f.status==='loaded').length}; })()""")
    check('Home page paints the picked brand (World Tree logo in teal, Ringed Z in gold, World Tree Veil)', r['brand']==['tree_c','ring_z','veil_a'] and r['teal']>300 and r['gold']>150 and r['title']=='Zeldara' and r['fonts']>=3, r)
    check('First visit: one button, New Game → /play?start=new', r['links']==['/play?start=new'], r['links'])
    if SHOT: pg.screenshot(path=os.path.join(SHOT,'home_wide.png'))
    box=pg.evaluate("(()=>{ var a=document.querySelector('a.btn').getBoundingClientRect(); return [a.left,a.top,a.width,a.height]; })()")
    lay=pg.evaluate("ZBrand.homeLayout(ZBrand.HOMES.find(h=>h.id===ZBrand.HOME),innerWidth,innerHeight,{btns:['NEW GAME']})[0]")
    check('The link sits exactly over the painted button', abs(box[0]-lay['x'])<1.5 and abs(box[1]-lay['y'])<1.5 and abs(box[2]-lay['w'])<1.5, [box,lay])
    pg.click('a.btn'); pg.wait_for_timeout(5000)
    r=pg.evaluate("({path:location.pathname+location.search, game:typeof game!=='undefined'&&game.scene.isActive('Title'), dlg:!!document.getElementById('zp-name')&&document.getElementById('zp-modal').style.display, hud:getComputedStyle(document.getElementById('hud')).display})")
    check('New Game opens the game at /play with the name dialog already open (and no game HUD on the title)', r['path'].rstrip('/')=='/play' and r['game'] and r['dlg']=='flex' and r['hud']=='none', r)
    pg.fill('#zp-name','Kris'); pg.click('#zp-next'); pg.wait_for_timeout(300)
    pg.evaluate("document.querySelectorAll('.zp-slot')[0].querySelector('[data-a=new]').click()")
    pg.wait_for_timeout(200); pg.evaluate("document.querySelector('.zp-hero[data-h=m]').click()")
    for _ in range(60):
        pg.wait_for_timeout(250)
        if pg.evaluate("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): break
    check('The game starts from there (World running, HUD back)', pg.evaluate("game.scene.isActive('World')&&getComputedStyle(document.getElementById('hud')).display!=='none'"))
    pg.evaluate("game.scene.getScene('World')._save()"); pg.goto(B+'/'); pg.wait_for_timeout(2500)
    links=pg.evaluate("[...document.querySelectorAll('a.btn')].map(a=>a.getAttribute('href'))")
    check('Back on the home page a saved player adds Returning Player', links==['/play?start=new','/play?start=returning'], links)
    if SHOT: pg.screenshot(path=os.path.join(SHOT,'home_two.png'))
    pg.click('a.btn[href="/play?start=returning"]'); pg.wait_for_timeout(5000)
    r=pg.evaluate("({dlg:document.getElementById('zp-modal').style.display, names:[...document.querySelectorAll('.zp-pl b')].map(b=>b.textContent), t:game.scene.getScene('Title').children.list.filter(o=>o.type==='Text').map(o=>o.text), brand:!!game.scene.getScene('Title')._brand})")
    check('Returning Player opens the player list in the game; the title wears the same brand', r['dlg']=='flex' and 'Kris' in r['names'] and r['brand'] and 'NEW GAME' in r['t'] and 'RETURNING PLAYER' in r['t'], r)
    if SHOT: pg.evaluate("ZProfilesUI.close()"); pg.wait_for_timeout(600); pg.screenshot(path=os.path.join(SHOT,'title_two.png'))
    # phone portrait: buttons stack, story line is real text
    ph=ctx.new_page(); ph.set_viewport_size({'width':390,'height':780}); ph.goto(B+'/'); ph.wait_for_timeout(2500)
    r=ph.evaluate("({rects:[...document.querySelectorAll('a.btn')].map(a=>{var q=a.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.width)]}), blurb:getComputedStyle(document.querySelector('p')).position, cls:document.querySelector('p').className})")
    check('Phone: the two buttons stack inside the screen and the story line shows as text', len(r['rects'])==2 and r['rects'][0][0]>=0 and r['rects'][0][0]+r['rects'][0][2]<=390 and r['rects'][1][1]>r['rects'][0][1]+40 and r['cls']=='blurb', r)
    if SHOT: ph.screenshot(path=os.path.join(SHOT,'home_phone.png'))
    lab=ctx.new_page(); lab.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript")); lab.goto(B+'/lab/'); lab.wait_for_timeout(2000)
    check('The Lab still opens at /lab', lab.evaluate("typeof LabApp!=='undefined'&&document.querySelectorAll('.lab-tab').length>10"))
    check('No JS errors', not errs, errs[:3]); b.close()
finally:
    srv.terminate()
print('%d/%d passed'%(sum(res),len(res)))
