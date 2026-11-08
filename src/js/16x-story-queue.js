// ═══════════════════════════════════════════════════════════════════════
// ║ 16x-story-queue.js — round 95: ONE STORY CUT-SCENE AT A TIME (Kris: "you can end up having same time when multiple cut scenes
// ║ trigger, which then gets kinda long and a little much … releasing the first soul in the wetlands, with both freeing soul video and the
// ║ wetlands past video triggering … only get 1 video at a time").
// ║  · Every saga cut-scene (ZSAGA.play: the opening, each realm's old disaster, the first spirit, the builders' crossings, the gate, the
// ║    two lights, the Lodestar, the tattoo, the World Tree) now goes through a queue. It plays at once when the moment is calm, else it
// ║    waits (ps.sagaQ, kept in the save) and plays at the next calm moment:
// ║      no cut-scene up, none ended in the last ZSQ.GAP (40 s), no menu or pop-up open, in the overworld (not a tower, dungeon or island),
// ║      no fight near you, no soul-line being drawn.
// ║  · Each realm's old disaster (Wetlands — the Black Tide, Highlands — the Stone-Fall, Ashlands — the Ash Night) plays the FIRST time you
// ║    set foot in that realm (over its bridge or pass), no longer with its first freed spirit. The Grasslands' Long Quiet stays at its tenth
// ║    freed spirit (you start in the Grasslands; the opening has just told the storm).
// ║  · The first spirit freed: the cut-scene comes FIRST (the chains falling away), then the spirit's thanks pop-up, then its soul-line.
// ║  · Not queued: the parts of one continuous scene (a boss changing form, the Asgard arrival, the feast hall, the ending) — those are
// ║    one moment told in pieces, and they play where they happen.
// ║ Switch: ZSQ.on (Dev: ZSQ.on=false brings back the old behaviour). The suites keep ZCUT off, so none of this runs there.
// ═══════════════════════════════════════════════════════════════════════
var ZSQ={ on:true, GAP:40000, lastEnd:0, REALMS:[2,3,4],
  ws:function(){ return typeof game!=='undefined'&&game.scene?game.scene.getScene('World'):null; },
  busy:function(){ return !!((typeof ZCUT!=='undefined'&&ZCUT.isOpen&&ZCUT.isOpen())||document.getElementById('zcut-closing')); },
  // the moment is calm enough for a story cut-scene
  calm:function(){ if(!ZSQ.t0||Date.now()-ZSQ.t0<1500)return false;      /* a moment to arrive after the game opens */
    var ws=ZSQ.ws(); if(!ws||!ws.sys||!ws.sys.isActive()||!ws.player||!ws.playerState)return false;
    if(ZSQ.busy()||Date.now()-ZSQ.lastEnd<ZSQ.GAP)return false;
    if(typeof _anyModalOpen==='function'&&_anyModalOpen())return false;
    if(ws._zslT||ws._bifBusy)return false;      /* a soul-line being drawn; the Bifröst rising */
    var x=ws.player.x, y=ws.player.y;
    return !(ws.worldMonsters||[]).some(function(m){ return m&&!m.dead&&m._engT&&Date.now()-m._engT<5000&&Math.hypot(m.x-x,m.y-y)<420; }); },
  queue:function(ps){ return ps.sagaQ||(ps.sagaQ=[]); },
  add:function(ps,k){ var Q=ZSQ.queue(ps); if(Q.indexOf(k)<0)Q.push(k); },
  // play now, past the queue
  now:function(ps,k,done){ ZSQ._now=true; try{ return ZSQ._p0.call(ZSAGA,ps,k,done); } finally{ ZSQ._now=false; } },
  tick:function(){ try{ if(!ZSQ.on||typeof ZSAGA==='undefined')return; if(ZSQ.busy())ZSQ.lastEnd=Date.now();
    var ws=ZSQ.ws(); if(!ws||!ws.sys||!ws.sys.isActive()||!ws.player||!ws.playerState||!ws.playerState.sagaSeen)return; var ps=ws.playerState; if(!ZSQ.t0)ZSQ.t0=Date.now();
    // the first steps into a realm: its old disaster (queued like any other)
    if(typeof getTileSection==='function'&&typeof TILE!=='undefined'){ var q=getTileSection(Math.floor(ws.player.x/TILE),Math.floor(ws.player.y/TILE)), R=ps.realmsEntered||(ps.realmsEntered=[]);
      if(ZSQ.REALMS.indexOf(q)>=0&&R.indexOf(q)<0){ R.push(q); ZSAGA.play(ps,'realm'+q); } }
    var Q=ZSQ.queue(ps), L=ZSAGA.seen(ps);
    while(Q.length&&(L.indexOf(Q[0])>=0||!ZSAGA.ready(Q[0])))Q.shift();      /* already told (or no longer painted): drop it */
    if(Q.length&&ZSQ.calm()){ var k=Q.shift(); ZSQ.now(ps,k); }
  }catch(e){ if(!ZSQ._err){ ZSQ._err=1; console.warn('story queue',e); } } }
};
setTimeout(function(){
  if(typeof ZSAGA==='undefined')return;
  var p0=ZSQ._p0=ZSAGA.play;
  ZSAGA.play=function(ps,k,done){ if(ZSQ._now||!ZSQ.on||!ps||typeof ZCUT==='undefined'||!ZCUT.on||ZSAGA.seen(ps).indexOf(k)>=0||!ZSAGA.ready(k))return p0.apply(this,arguments);
    if(ZSQ.calm()&&!ZSQ.queue(ps).length)return ZSQ.now(ps,k,done);      /* nothing waiting and the moment is calm: now */
    ZSQ.add(ps,k); if(done)done(); return false; };
  // a realm's old disaster no longer comes with a freed spirit's soul-line (it comes on the first steps into the realm)
  var a0=ZSAGA.afterTrace; ZSAGA.afterTrace=function(ws,s){ var ps=ws&&ws.playerState; if(!ZSQ.on||!ps)return a0.apply(this,arguments);
    var L=ZSAGA.seen(ps), add=ZSQ.REALMS.map(function(q){ return 'realm'+q; }).filter(function(k){ return L.indexOf(k)<0; }); add.forEach(function(k){ L.push(k); });
    try{ return a0.apply(this,arguments); } finally{ add.forEach(function(k){ var i=L.indexOf(k); if(i>=0)L.splice(i,1); }); } };
  // the first spirit freed: its cut-scene first, then the thanks pop-up and the soul-line (the freeing itself waits for the cut-scene)
  if(typeof ZSPIRIT!=='undefined'){ var f0=ZSPIRIT.free; ZSPIRIT.free=function(ws,s){ var ps=ws&&ws.playerState, self=this, args=arguments;
      if(ZSQ.on&&!ZSQ._freeing&&ps&&s&&!ZSPIRIT.freed(ps,s.id)&&!(ps.spiritsFreed||[]).length&&typeof ZCUT!=='undefined'&&ZCUT.on&&!ZSQ.busy()&&ZSAGA.seen(ps).indexOf('firstfree')<0&&ZSAGA.ready('firstfree')){
        var did=false, go=function(){ if(did)return; did=true; ZSQ._freeing=false; f0.apply(self,args); };
        ZSQ._freeing=true; ZSQ.now(ps,'firstfree',go); if(!ZSQ.busy())go(); return; }
      return f0.apply(this,arguments); }; }
},0);
setInterval(ZSQ.tick,500);
