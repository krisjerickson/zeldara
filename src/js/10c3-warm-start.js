// ═══════════════════════════════════════════════════════════════════════
// ║ 10c3-warm-start.js — round 72 (Kris, L1: "when starting the game, load entire first screen instead of having a laggy start once it shows
// ║ game has loaded (currently this is an issue), and make sure that any immediate movement does not produce lag").
// ║ When the World opens (a new game or a loaded one) a curtain stays over it — the wordmark and "Preparing Runeheim…" with a bar — until
// ║ the first screen is truly ready:
// ║   · every ground chunk on screen AND the ring around it is painted and on the graphics chip (so the first steps in any direction need
// ║     no painting); the painter gets the whole frame while the curtain is down;
// ║   · the ground patterns of the nearby kinds are made (the warm-ahead ring);
// ║   · the painted sheets in flight (the hero, the villagers) have arrived, and the monsters near you are awake (labels, textures);
// ║   · and a few frames in a row run smoothly.
// ║ Then it fades. At most 30 s, whatever happens. Keys pressed under the curtain do nothing. ZWARM.on=false turns it off (the old start).
// ═══════════════════════════════════════════════════════════════════════
var ZWARM={ on:true, MAX:30000, MARGIN:360, el:null,
  show:function(){ if(typeof document==='undefined')return; var el=ZWARM.el; if(!el){ el=ZWARM.el=document.createElement('div'); el.id='zwarm';
      el.innerHTML='<div class="zw-in"><div class="zw-t">Preparing Runeheim…</div><div class="zw-bar"><i></i></div><div class="zw-s">painting the land around you</div></div>';
      var st=document.createElement('style'); st.textContent='#zwarm{position:fixed;inset:0;z-index:400;background:#05070b;display:flex;align-items:center;justify-content:center;transition:opacity .45s ease;font-family:var(--zf-label,"Segoe UI"),Georgia,serif}'+
        '#zwarm .zw-in{text-align:center;color:#fff2b0}#zwarm .zw-t{font-size:24px;letter-spacing:.06em;margin-bottom:14px}#zwarm .zw-bar{width:300px;height:6px;border:1px solid rgba(0,245,255,.6);border-radius:4px;overflow:hidden;margin:0 auto}'+
        '#zwarm .zw-bar i{display:block;height:100%;width:0;background:#00f5ff;transition:width .25s}#zwarm .zw-s{margin-top:10px;font:12px "Segoe UI",sans-serif;color:#6688aa}';
      document.head.appendChild(st); document.body.appendChild(el); }
    el.style.display='flex'; el.style.opacity='1'; },
  bar:function(f,txt){ if(!ZWARM.el)return; var i=ZWARM.el.querySelector('.zw-bar i'), s=ZWARM.el.querySelector('.zw-s'); if(i)i.style.width=Math.round(Math.max(0,Math.min(1,f))*100)+'%'; if(s&&txt)s.textContent=txt; },
  hide:function(){ var el=ZWARM.el; if(!el)return; el.style.opacity='0'; setTimeout(function(){ if(el.style.opacity==='0')el.style.display='none'; },500); },
  // start: called as the World scene is created
  begin:function(ws){ if(!ZWARM.on||!ws||ws._warm)return; ws._warm={t0:Date.now(),smooth:0,last:0}; ZWARM.show(); ZWARM._q=typeof ZQUAL!=='undefined'?ZQUAL.budget:null; if(ZWARM._q)ZQUAL.budget=[150,150];
    try{ ws.cameras.main.setVisible(false); }catch(e){} },      /* nothing is drawn under the curtain, so every frame goes to painting */
  done:function(ws,why){ if(!ws._warm)return; var W=ws._warm; ws._warm=null; ws._warmed={ms:Date.now()-W.t0,why:why}; try{ ws.cameras.main.setVisible(true); }catch(e){} if(typeof ZQUAL!=='undefined'&&ZWARM._q)ZQUAL.budget=ZWARM._q; ZWARM.hide(); },
  // every frame while the curtain is down: is the first screen ready?
  tick:function(ws,dt){ var W=ws._warm; if(!W)return; var R=ws._wr; if(Date.now()-W.t0>ZWARM.MAX)return ZWARM.done(ws,'time');
    var cam=ws.cameras.main, cs=WCH*TILE, dw=cam.width/cam.zoom, dh=cam.height/cam.zoom, vx=cam.scrollX+(cam.width-dw)/2, vy=cam.scrollY+(cam.height-dh)/2, M=ZWARM.MARGIN;
    // the chunks on screen, and those within MARGIN px of its edges — the first seconds of walking in any direction (the rest stream in behind)
    var need=(ws._wrNeeded?ws._wrNeeded():[]).filter(function(n){ return n.vis||!((n.cx+1)*cs<vx-M||n.cx*cs>vx+dw+M||(n.cy+1)*cs<vy-M||n.cy*cs>vy+dh+M); }), have=0; need.forEach(function(n){ if(R&&R.chunks&&R.chunks.has(n.key))have++; });
    var ground=need.length&&have===need.length;
    var pats=true; try{ if(typeof _wpPatKindsIn==='function'){ var cx=Math.floor(ws.player.x/(WCH*TILE)), cy=Math.floor(ws.player.y/(WCH*TILE)), L=_wpPatKindsIn(ws.wd,cx-2,cy-2,cx+2,cy+2); if(L.length){ pats=false; _wpPatTile(L[0]); } } }catch(e){}
    var sheets=true; try{ if(typeof ZAtlas!=='undefined'&&!ZAtlas.off)sheets=!Object.keys(ZAtlas.st).some(function(p){ return ZAtlas.st[p]==='loading'; }); }catch(e){}
    var woke=0; (ws.worldMonsters||[]).forEach(function(m){ if(m&&m._lazyVis&&woke<6&&Math.abs(m.x-ws.player.x)<1400&&Math.abs(m.y-ws.player.y)<1000){ try{ ws._monWake(m); }catch(e){} woke++; } });
    // round 72d: with the worker painter (05c2) the chunks just beyond arrive moments later — let them land under the curtain too, so the first steps mount nothing
    var flight=true; try{ if(typeof ZWP!=='undefined'&&ZWP.active(ws.wd)&&R)flight=!R.jobs.size&&!(R.ready&&R.ready.length); }catch(e){}
    var steady=dt<45; W.smooth=ground&&pats&&sheets&&flight&&!woke&&steady?W.smooth+1:0;
    ZWARM.bar(need.length?have/need.length*0.85+(pats?0.05:0)+(sheets?0.05:0)+Math.min(0.05,W.smooth*0.01):0, ground?(sheets?'almost there':'bringing the people'):'painting the land around you');
    if(W.smooth>=6)ZWARM.done(ws,'ready'); }
};
// a watch that does not depend on the World running: a story panel, a talk or a menu shows over everything (the curtain steps aside while
// it is open — the world is paused under it anyway); and the time limit holds even if the World never updates
setInterval(function(){ try{ if(!ZWARM.el||typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws._warm){ return; }
    if(Date.now()-ws._warm.t0>ZWARM.MAX){ ZWARM.done(ws,'time'); return; }
    var over=(typeof _anyModalOpen==='function'&&_anyModalOpen())||(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())||!!document.getElementById('zcine-panel');
    ZWARM.el.style.display=over?'none':'flex'; }catch(e){} },150);
setTimeout(function(){ if(typeof WorldScene==='undefined')return; var P=WorldScene.prototype, c0=P.create, u0=P.update, m0=P._movePlayer;
  P.create=function(){ var r=c0.apply(this,arguments); try{ if(this.sys.settings.key==='World')ZWARM.begin(this); }catch(e){} return r; };
  P.update=function(t,d){ var r=u0.apply(this,arguments); if(this._warm)try{ ZWARM.tick(this,d); }catch(e){ ZWARM.done(this,'error'); } return r; };
  if(m0)P._movePlayer=function(){ if(this._warm)return; return m0.apply(this,arguments); };      // nothing moves under the curtain
},0);
