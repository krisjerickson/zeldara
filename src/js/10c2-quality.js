// ═══════════════════════════════════════════════════════════════════════
// ║ 10c2-quality.js — round 72 (Kris, N2: "speed on phones"; the latency deep dive, doc 33).
// ║ The measurement (doc 33 §2): on a phone-speed CPU the game's own frame takes 50–70 ms in the realms, and more than half of it is the
// ║ ground being painted and handed to the graphics chip (_updateChunks, _wrMount). Two settings, picked by the screen:
// ║   full  — computers and big tablets: as before.
// ║   phone — touch screens up to 900 px on the short side: the painted ground is uploaded at half size and shown at full (a quarter of
// ║           the upload and of the graphics memory, a little softer up close); the painter takes smaller slices of each frame; fewer
// ║           finished chunks are kept parked on the graphics chip (6, not 14); the edge pass and the ground fills work in smaller slices.
// ║ ?quality=full / ?quality=phone or ZQUAL.set('full'|'phone'|'auto') (kept in this browser) override the choice.
// ═══════════════════════════════════════════════════════════════════════
var ZQUAL={ mode:'full', budget:[6,14], ground:1,
  auto:function(){ try{ var small=Math.min(screen.width||9999,screen.height||9999)<=900, coarse=!!(window.matchMedia&&matchMedia('(pointer: coarse)').matches); return small&&coarse?'phone':'full'; }catch(e){ return 'full'; } },
  pick:function(){ var m=null; try{ var q=/[?&]quality=(full|phone)/.exec(location.search); if(q)m=q[1]; else m=localStorage.getItem('zeldara_quality'); }catch(e){} if(m!=='full'&&m!=='phone')m=ZQUAL.auto(); return m; },
  apply:function(m){ ZQUAL.mode=m; var ph=m==='phone'; ZQUAL.budget=ph?[3,8]:[6,14]; ZQUAL.ground=ph?0.5:1; if(typeof WR_PARK!=='undefined')WR_PARK=ph?6:14; if(typeof ZWE!=='undefined')ZWE.ROWS=ph?12:40; if(typeof WP_BAND!=='undefined')WP_BAND=ph?6:8; },
  set:function(m){ try{ if(m==='auto')localStorage.removeItem('zeldara_quality'); else localStorage.setItem('zeldara_quality',m); }catch(e){} ZQUAL.apply(m==='auto'?ZQUAL.auto():m); return ZQUAL.mode; },
  // a canvas at the ground's scale for the upload (null = as it is)
  small:function(cv){ var k=ZQUAL.ground; if(!cv||k>=1||!cv.width||typeof document==='undefined')return null; var w=Math.max(1,Math.round(cv.width*k)), h=Math.max(1,Math.round(cv.height*k)), c=document.createElement('canvas'); c.width=w; c.height=h;
    var g=c.getContext('2d'); g.imageSmoothingEnabled=true; g.imageSmoothingQuality='medium'; g.drawImage(cv,0,0,w,h); cv.width=1; cv.height=1; return {cv:c,k:1/k}; }
};
ZQUAL.apply(ZQUAL.pick());
