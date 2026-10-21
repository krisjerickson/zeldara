"""Round 72 — Kris's answer O1 (P1, doc 33): the worker painter (05c2-world-paint-worker.js). The ground chunks painted in a Web Worker
must be the same pictures as those painted on the main thread (pixel for pixel), with the same props, lights and particles — and the
main thread must spend far less time per frame while the hero travels. Run: python tests/test_worker_paint.py"""
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from harness import game
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('  ' + str(info)[:600] if info != '' else ''), flush=True)
COMPARE = r"""async ([keys,scnOff])=>{ const so=ZScn.off; ZScn.off=scnOff; _WPC={}; ZScn._sc={}; ZScn._scq=[]; ZScn._pat={};      /* the cached pattern tiles were made with the other setting */
  const run=async(job)=>{ for(let i=0;i<40000;i++){ if(job.step(30))return job.out; await new Promise(r=>setTimeout(r,4)); } return null; };
  const px=(cv)=>{ const c=document.createElement('canvas'); c.width=cv.width; c.height=cv.height; const g=c.getContext('2d'); g.drawImage(cv,0,0); return g.getImageData(0,0,c.width,c.height).data; };
  const diff=(a,b)=>{ if(!a&&!b)return {n:0,max:0,mean:0,big:0}; if(!a||!b||a.width!==b.width||a.height!==b.height)return {n:-1,max:999,why:'size '+(a&&a.width)+'x'+(a&&a.height)+' / '+(b&&b.width)+'x'+(b&&b.height)}; const A=px(a),B=px(b); let n=0,mx=0,sum=0,big=0; for(let i=0;i<A.length;i+=4){ let d=Math.max(Math.abs(A[i]-B[i]),Math.abs(A[i+1]-B[i+1]),Math.abs(A[i+2]-B[i+2]),Math.abs(A[i+3]-B[i+3])); if(d){ n++; if(d>mx)mx=d; sum+=d; if(d>64)big++; } } return {n:n,max:mx,of:A.length/4,mean:sum/(A.length/4),big:big/(A.length/4)}; };
  const spk=(s)=>[Math.round(s.x),Math.round(s.y),s.ap&&s.ap.join(','),s.aw,s.ah,s.depth,!!s.flat,s.res||1,!!s.zed,s.ox,s.oy,!!s.bob,s.spin||0].join('|');
  const lk=(L)=>[Math.round(L.x),Math.round(L.y),L.r,L.col,L.a].join('|');
  const ws=game.scene.getScene('World'), wd=ws.wd, out=[];
  for(const k of keys){ const [cx,cy]=k.split('_').map(Number);
    const tA=performance.now(); const A=await run(_wpChunkJob0(wd,cx,cy)); const ta=performance.now()-tA;
    const tB=performance.now(); const B=await run(ZWP.job(wd,cx,cy)); const tb=performance.now()-tB;
    if(!A||!B){ out.push({k:k,err:'no out '+!!A+' '+!!B}); continue; }
    const r={k:k, ground:diff(A.canvas,B.canvas), atlas:diff(A.atlas,B.atlas), lava:diff(A.lavaMask,B.lavaMask), ley:diff(A.ley,B.ley),
      sp:[A.sprites.length,B.sprites.length], spSame:A.sprites.map(spk).join(';')===B.sprites.map(spk).join(';'),
      li:[A.lights.length,B.lights.length], liSame:A.lights.map(lk).join(';')===B.lights.map(lk).join(';'),
      pa:[(A.particles||[]).length,(B.particles||[]).length], live:[(A.live||[]).length,(B.live||[]).length], lc:[(A.lavaCells||[]).length,(B.lavaCells||[]).length],
      sh:[(A.shafts||[]).length,(B.shafts||[]).length], ms:[Math.round(ta),Math.round(tb)]};
    out.push(r); }
  ZScn.off=so; return out; }"""
# chunks of every kind of ground: the village, roads and shops, each realm, lakes and coasts, lava, ley lines, walls
PICK = r"""(()=>{ const wd=game.scene.getScene('World').wd, KL=WK_REG.list, n=Math.ceil(WORLD_W/WCH), want={}, out=[];
  const add=(k,why)=>{ if(!want[k]){ want[k]=why; out.push(k); } };
  add(Math.floor(CENTER_X/WCH)+'_'+Math.floor(CENTER_Y/WCH),'village'); add((Math.floor(CENTER_X/WCH)+1)+'_'+Math.floor(CENTER_Y/WCH),'village edge');
  const tests=[['lava',k=>k.lava],['deep water',k=>k.liquid&&k.solid],['pattern',k=>!!k.pattern],['wall',k=>k.wall&&!k.wall.noFace]];
  for(const [why,f] of tests){ let found=0; for(let cy=2;cy<n-2&&found<1;cy+=3)for(let cx=2;cx<n-2&&found<1;cx+=5){ const t=wd.kind[(cy*WCH+16)*WORLD_W+cx*WCH+16]; if(KL[t]&&f(KL[t])&&!want[cx+'_'+cy]){ add(cx+'_'+cy,why); found++; } } }
  for(const L of (wd.ley||[]).slice(0,1)){ const p=L.pts[Math.floor(L.pts.length/2)]; add(Math.floor(p[0]/WCH)+'_'+Math.floor(p[1]/WCH),'ley line'); }
  [[0.25,0.25],[0.75,0.75]].forEach(q=>add(Math.floor(q[0]*n)+'_'+Math.floor(q[1]*n),'realm'));
  return out.map(k=>[k,want[k]]); })()"""
with game(new=True, query='?wp=1', painted=True) as g:
    g.page.wait_for_function("ZWP.state!=='loading'&&ZWP.state!=='off'", timeout=120000)
    st = g.js("({s:ZWP.state, why:ZWP.why, ms:ZWP.readyMs, n:ZWP.pool.length, errs:ZWP.pool.map(w=>w._errs), nk:ZWP.pool.map(w=>w._nk), main:WK_REG.list.length})")
    check('The worker painter starts from the baked world (%s workers, ready in %s ms, %s kinds)' % (st['n'], st['ms'], st['nk']), st['s'] == 'ready' and st['n'] >= 1, st)
    g.page.wait_for_function("typeof ZScn==='undefined'||ZScn.done||ZScn.off", timeout=120000)
    keys = g.js(PICK)
    print('chunks:', keys, flush=True)
    why = dict(keys)
    # 1. the generated ground (painted scenery off): the very same pixels
    R = g.page.evaluate(COMPARE, [[k for k, _ in keys], True])
    for r in R:
        if r.get('err'): check('chunk %s (%s) painted both ways' % (r['k'], why.get(r['k'])), False, r); continue
        G, A = r['ground'], r['atlas']; same = all(x['max'] <= 64 and x['mean'] < 0.15 for x in (G, A, r['lava'], r['ley']))      # Chrome clips without antialiasing on an OffscreenCanvas: a clipped edge may differ by a few levels
        check('Generated ground, chunk %s (%s): the worker paints the same picture (%s px differ, at most %s levels, mean %.3f; atlas %s px), %d props, %d lights, %d particles, %d swaying pieces — %s ms here, %s ms there' % (
            r['k'], why.get(r['k']), G['n'], G['max'], G['mean'], A['n'], r['sp'][0], r['li'][0], r['pa'][0], r['live'][0], r['ms'][0], r['ms'][1]),
            same and r['spSame'] and r['liSame'] and r['pa'][0] == r['pa'][1] and r['live'][0] == r['live'][1] and r['lc'][0] == r['lc'][1] and r['sh'][0] == r['sh'][1], r)
    # 2. with the painted scenery: the same chunks, props, lights and particles; the painted pictures differ only by the browser's own
    #    smoothing (a page <img> is shrunk with mip-maps, an ImageBitmap without — a difference of a few levels on some edge pixels)
    R = g.page.evaluate(COMPARE, [[k for k, _ in keys], False])
    for r in R:
        if r.get('err'): check('chunk %s (%s) painted both ways' % (r['k'], why.get(r['k'])), False, r); continue
        G, A = r['ground'], r['atlas']
        close = G['n'] >= 0 and A['n'] >= 0 and G['mean'] < 1.5 and G['big'] < 0.002 and A['mean'] < 2.5 and A['big'] < 0.01 and r['lava']['n'] == 0 and r['ley']['n'] == 0
        check('Painted scenery, chunk %s (%s): the same picture to the eye (mean difference %.2f / %.2f levels, %.2f %% / %.2f %% of pixels over 64) and the same %d props, %d lights' % (
            r['k'], why.get(r['k']), G['mean'], A['mean'], G['big'] * 100, A['big'] * 100, r['sp'][0], r['li'][0]),
            close and r['spSame'] and r['liSame'] and r['pa'][0] == r['pa'][1] and r['live'][0] == r['live'][1] and r['lc'][0] == r['lc'][1], r)
    # a chunk changed while the game runs (a felled tree, a tile turned to water) is painted with the change
    r = g.page.evaluate("""async ()=>{ const ws=game.scene.getScene('World'), wd=ws.wd, cx=Math.floor(CENTER_X/WCH)+2, cy=Math.floor(CENTER_Y/WCH), x=cx*WCH+10, y=cy*WCH+10, old=wd.kind[y*WORLD_W+x];
        const sea=WSK.wdeep._gi; for(let dy=0;dy<4;dy++)for(let dx=0;dx<4;dx++)wd.kind[(y+dy)*WORLD_W+x+dx]=sea;
        const run=async(job)=>{ for(let i=0;i<40000;i++){ if(job.step(30))return job.out; await new Promise(r=>setTimeout(r,4)); } return null; };
        const so=ZScn.off; ZScn.off=true; _WPC={}; const A=await run(_wpChunkJob0(wd,cx,cy)), B=await run(ZWP.job(wd,cx,cy)); ZScn.off=so; for(let dy=0;dy<4;dy++)for(let dx=0;dx<4;dx++)wd.kind[(y+dy)*WORLD_W+x+dx]=old;
        const px=(cv)=>{ const c=document.createElement('canvas'); c.width=cv.width; c.height=cv.height; const g=c.getContext('2d'); g.drawImage(cv,0,0); return g.getImageData(0,0,c.width,c.height).data; };
        const a=px(A.canvas), b=px(B.canvas); let n=0; for(let i=0;i<a.length;i+=4)if(a[i]!==b[i]||a[i+1]!==b[i+1]||a[i+2]!==b[i+2])n++; return n; }""")
    check('A tile changed during play (land turned to water) shows in the worker\'s picture too (%s px differ)' % r, r == 0, r)
    # the main thread's time per frame while the hero travels: on the worker vs here
    def travel(mode):
        g.js("ZWP.hold=%s" % ('false' if mode == 'worker' else 'true'))
        g.js("""(()=>{ var ws=game.scene.getScene('World'); window.__p={paint:0,frames:[],mount:0,nm:0,cur:0}; if(!window.__wj0){ window.__wj0=wpChunkJob; wpChunkJob=function(){ var j=__wj0.apply(this,arguments), s=j.step; j.step=function(b){ var a=performance.now(), r=s.call(j,b), d=performance.now()-a; __p.paint+=d; __p.cur+=d; return r; }; return j; };
            var m0=ws._wrMount; ws._wrMount=function(){ var a=performance.now(), r=m0.apply(ws,arguments); __p.mount+=performance.now()-a; __p.nm++; return r; };
            var u0=ws._updateChunks; ws._updateChunks=function(){ __p.cur=0; var r=u0.apply(ws,arguments), cv=ZWP.stats.convPend||0; ZWP.stats.convPend=0; __p.paint+=cv; __p.frames.push(__p.cur+cv); return r; }; } })()""")
        dy = -80 if mode == 'worker' else 80
        for i in range(10):
            g.js("(()=>{ var ws=game.scene.getScene('World'), p=ws.player; p.x=(CENTER_X+%d)*TILE; p.y=(CENTER_Y+%d)*TILE; p.cont.setPosition(p.x,p.y); })()" % (-150 + i * 14, dy))
            g.wait(900)
        g.page.wait_for_function("(()=>{ var ws=game.scene.getScene('World'); return !ws._wr.jobs.size&&!ws._wr.ready.length; })()", timeout=900000)
        return g.js("(()=>{ var L=__p.frames.slice().sort((a,b)=>a-b); return {chunks:__p.nm, paint:__p.paint, perChunk:__p.paint/Math.max(1,__p.nm), mountPer:__p.mount/Math.max(1,__p.nm), p95:L[Math.floor(L.length*0.95)]||0, max:L[L.length-1]||0, frames:L.length, fb:ZWP.stats.fb}; })()")
    W = travel('worker'); M = travel('main')
    print('worker:', W, '\nmain:  ', M, flush=True)
    check('While travelling, the main thread no longer paints: %.1f → %.1f ms of painting per chunk (mounting %.0f / %.0f ms; on this two-core test machine the worker competes with the upload), 95th-percentile frame of painting %.1f → %.1f ms, worst %.0f → %.0f ms (the worst is the first hand-over) (%d / %d chunks)' % (
        M['perChunk'], W['perChunk'], M['mountPer'], W['mountPer'], M['p95'], W['p95'], M['max'], W['max'], M['chunks'], W['chunks']), W['perChunk'] < M['perChunk'] * 0.2 and W['p95'] < M['p95'] and W['chunks'] >= 4 and W['fb'] == 0, [W, M])
    errs = [e for e in g.errs if 'favicon' not in e]
    check('No game script errors', not errs, errs[:4])
print('\n%d/%d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
