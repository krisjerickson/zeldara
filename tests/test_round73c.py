"""Round 73b — the cut-scene clips made by hand (Kris: "we have few enough videos we don't need to use an api, i can hand place the requests"):
the Lab's queue (Cut-scene clips), the first frames (tools/video/frames.py) and the intake from Downloads (intake_video.py).
Run: python tests/test_round73c.py"""
import os, sys, re, json
from playwright.sync_api import sync_playwright
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); PH = os.path.join(R, 'tests', '.phaser', 'package', 'dist', 'phaser.min.js')
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:500] if info != '' else ''), flush=True)
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]); pg = b.new_page(viewport={"width": 1400, "height": 1000}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.route(re.compile(r".*(cdnjs|jsdelivr).*phaser.*"), lambda r: r.fulfill(path=PH, content_type="application/javascript") if os.path.exists(PH) else r.abort())
    pg.route(re.compile(r".*fonts.*"), lambda r: r.abort())
    def sv(r):
        u = r.request.url.split('t.test/', 1)[1].split('?')[0]; f = os.path.join(R, u)
        if os.path.isfile(f): r.fulfill(path=f)
        else: r.fulfill(status=404, body='')
    pg.route("http://t.test/**", sv); pg.goto("http://t.test/lab/index.html?tabs=all"); pg.wait_for_timeout(2500)
    pg.evaluate("LTODO.goTo('clips','.br-grid',0)"); pg.wait_for_timeout(2000); pg.evaluate("document.querySelector('canvas.br-cv[data-id=\"pn_saga_basket\"]').scrollIntoView()"); pg.wait_for_timeout(2500)
    t = pg.evaluate("""(()=>{ var cards=document.querySelectorAll('canvas.br-cv[data-tab="clips"]'), pr=document.querySelectorAll('textarea[data-au^="vc_"][data-au$="_p"]'), ng=document.querySelectorAll('textarea[data-au^="vc_"][data-au$="_n"]');
      var todo=LTODO.open().map(function(o){ return o.id; }); var c=document.querySelector('canvas.br-cv[data-tab="clips"][data-id="pn_saga_basket"]'), px=null; c.scrollIntoView();
      try{ var d=c.getContext('2d').getImageData(c.width/2,c.height/2,1,1).data; px=[d[0],d[1],d[2]]; }catch(e){}
      return {cards:cards.length, prompts:pr.length, negs:ng.length, firstPrompt:pr[0]&&pr[0].value.slice(0,40), todo:todo.indexOf('clips')>=0, px:px, files:Array.from(document.querySelectorAll('code')).filter(function(x){ return /\.mp4$/.test(x.textContent); }).length}; })()""")
    check('Lab -> Cut-scene clips: %d clips, each with its first frame, the file name, the prompt and the negative prompt with Copy buttons' % t['cards'], t['cards'] == 22 and t['prompts'] == 22 and t['negs'] == 22 and t['files'] == 22 and t['firstPrompt'].startswith('Animate this exact painting'), t)
    check('"Make the pilot" waits in Waiting for your picks', t['todo'], t)
    check('A painted panel shows as the first frame (not blank)', t['px'] and sum(t['px']) > 30, t['px'])
    check('No Lab errors', not errs, errs[:3])
    b.close()
# the first frames and the intake (tools/video), no app needed
import subprocess, tempfile, shutil
r = subprocess.run([sys.executable, os.path.join(R, 'tools', 'video', 'frames.py'), '--wave', '3'], capture_output=True, text=True)
fr = os.path.join(R, 'sprites', 'video_frames'); ok = os.path.isfile(os.path.join(fr, 'pn_saga_basket.png'))
if ok:
    from PIL import Image
    w, h = Image.open(os.path.join(fr, 'pn_saga_basket.png')).size; txt = open(os.path.join(fr, 'pn_saga_basket.txt'), encoding='utf-8').read()
check('frames.py: the first frames at 16:9 with the words beside them', ok and abs(w / h - 16 / 9) < 0.01 and 'SAVE AS  pn_saga_basket.mp4' in txt and 'the opening' in txt, r.stdout[-300:])
shutil.rmtree(fr, ignore_errors=True)
if shutil.which('ffmpeg'):
    D = tempfile.mkdtemp(); V = os.path.join(R, 'assets', 'video'); had = os.path.isdir(V)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'lavfi', '-i', 'testsrc=size=320x180:rate=24', '-t', '1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', os.path.join(D, 'kling_pn_saga_basket_77.mp4')])
    shutil.copy(os.path.join(D, 'kling_pn_saga_basket_77.mp4'), os.path.join(D, 'download.mp4'))
    r = subprocess.run([sys.executable, os.path.join(R, 'tools', 'video', 'intake_video.py'), '--from', D, '--ask'], input='1\n', capture_output=True, text=True)
    got = sorted(os.listdir(V)) if os.path.isdir(V) else []
    check('intake_video.py: a download named with the clip id is matched; another new video is asked about (%s)' % got, 'pn_saga_basket.mp4' in got and len(got) == 2, r.stdout[-400:])
    for f in got: os.remove(os.path.join(V, f))
    if not had: shutil.rmtree(V, ignore_errors=True)
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
