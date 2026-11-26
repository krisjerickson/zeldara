// ═══════════════════════════════════════════════════════════════════════
// ║ 21z7-respawn.js — round 137 (Kris: "If you die in an adventure site, or muspelheim or asgard, you should have the option of coming back at
// ║ the entrance to the site or going all the way back to the village").
// ║ A fall inside any site (a tower, a dungeon, a mage's spire, a forge, Muspelheim, Asgard, an island's den) now ends with two buttons:
// ║   · the usual one — wake in the village, as before;
// ║   · "Wake at the door of <the site>" — the same small cost, but you stand again outside the place you went in, ready to try again.
// ║ How: the overworld spot you last stood on before a site took over is kept (the site's door); after the fall's usual steps, that choice
// ║ walks you back there. A fall in the open world still wakes you in the village.   Switch: ZRESP.on.
// ═══════════════════════════════════════════════════════════════════════
var ZRESP={ on:true, door:null, name:null,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  // where you stood the moment the world fell asleep for a site
  tick:function(){ try{ var ws=ZRESP.ws(); if(!ws||!ws.player||!ws.sys)return; if(game.scene.isActive('World')){ ZRESP._p={x:ws.player.x,y:ws.player.y,island:!!(ws.wd&&ws.wd.islKey)}; ZRESP.inSite=false; return; }
      if(!ZRESP.inSite&&ZRESP._p){ ZRESP.inSite=true; ZRESP.door=ZRESP._p; ZRESP.name=ZRESP.siteName(); } }catch(e){} },
  siteName:function(){ try{ var D=game.scene.getScene('Dungeon'); if(D&&game.scene.isActive('Dungeon')){ var s=D._site||D.site; return (s&&s.name)||'the site'; }
      var V={VolcanoBossRush:'Muspelheim',VolcanoMaze:'Muspelheim',VolcanoBulletHell:'Muspelheim',VolcanoPuzzle:'Muspelheim',VolcanoEscape:'Muspelheim',Sky:'the sky port',Island:'the island'};
      for(var k in V)if(game.scene.isActive(k))return V[k]; }catch(e){} return 'the site'; },
  // the fall happened inside a site?
  wantChoice:function(){ return ZRESP.on&&ZRESP.inSite&&!!ZRESP.door&&!ZRESP.door.island; },
  back:function(){ var ws=ZRESP.ws(), d=ZRESP.door; if(!ws||!ws.player||!d)return; var x=d.x, y=d.y+TILE*1.2;
    ws.player.x=x; ws.player.y=y; if(ws.player.cont)ws.player.cont.setPosition(x,y); try{ ws.cameras.main.centerOn(x,y); }catch(e){}
    if(typeof showNotif==='function')showNotif('🚪 You wake at the door of '+(ZRESP.name||'the site')+' — a quarter mended. Ready when you are.','#bff8ff'); }
};
(function(){ if(typeof ZDeath==='undefined'||!ZDeath.show)return;
  var r0=ZDeath.run; ZDeath.run=function(scene){ ZRESP._choice=ZRESP.wantChoice()&&scene&&scene.sys&&scene.sys.settings.key!=='World'; return r0.apply(ZDeath,arguments); };
  var s0=ZDeath.show; ZDeath.show=function(L,I,done){ var pick=null, d2=function(){ var r=done&&done.apply(this,arguments); if(pick==='door')setTimeout(ZRESP.back,60); return r; };
    var r=s0.call(ZDeath,L,I,d2);
    try{ if(ZRESP._choice&&!I.preview){ var b=document.getElementById('zdeath-btn'); if(b){ var b2=document.createElement('button'); b2.id='zdeath-door'; b2.className='zd-door'; b2.textContent='Wake at the door of '+(ZRESP.name||'the site');
        b.textContent='Wake in the village'; b.insertAdjacentElement('afterend',b2); b2.onclick=function(){ pick='door'; b.click(); };
        if(!document.getElementById('zresp-css')){ var st=document.createElement('style'); st.id='zresp-css'; st.textContent='#modal-death .zd-door{margin-left:10px;animation:none!important;filter:saturate(.7)}#modal-death .zd-door:hover{filter:none}'; document.head.appendChild(st); } } } }catch(e){}
    return r; };
})();
if(typeof setInterval!=='undefined')setInterval(ZRESP.tick,300);
