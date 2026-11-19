// ═══════════════════════════════════════════════════════════════════════
// ║ 21t2-calm-boxes.js — round 117: NO TEXT BOX IN THE MIDDLE OF A FIGHT.
// ║ Kris: "we are still having text boxes come up while you are in the middle of a battle, and need to make it so it doesn't interrupt when you
// ║ are in a battle". The lessons already waited for a calm moment (21t ZLES.calm); everything else that opens a box on its own did not — a
// ║ freed spirit's thanks while the Binder's guards still swing, a villager's line, a quest's news.
// ║ Now any box that opens by itself (the dialogue box, ZDLG, and the spirits' and fairies' talk window, ZSPIRIT.talk) waits while you fight:
// ║ hurt in the last 6 s, or a monster hunting you within 12 tiles, or in a sky-port or volcano battle. It opens, in order, once it is calm.
// ║ A box you asked for — Tab, E, Enter or a click in the last moment — opens at once, fight or not. The death pop-up keeps its own rule.
// ═══════════════════════════════════════════════════════════════════════
var ZCALMBOX={ held:[], userT:0, USER_MS:900,
  fighting:function(){ try{ if(typeof game==='undefined'||!game.scene)return false;
      var act=game.scene.getScenes(true).map(function(s){ return s.sys.settings.key; });
      if(act.some(function(k){ return k==='Sky'||/^Volcano|^Musp|Forge/.test(k); }))return true;
      if(typeof ZLES==='undefined'||!ZLES.calm)return false; var sc=ZLES.scene&&ZLES.scene(), ws=game.scene.getScene('World');
      return !ZLES.calm(sc,ws&&ws.playerState); }catch(e){ return false; } },
  asked:function(){ return Date.now()-ZCALMBOX.userT<ZCALMBOX.USER_MS; },
  hold:function(fn,args){ ZCALMBOX.held.push([fn,args]); ZCALMBOX.arm(); },
  arm:function(){ if(ZCALMBOX._iv)return; ZCALMBOX._iv=setInterval(function(){ if(!ZCALMBOX.held.length){ clearInterval(ZCALMBOX._iv); ZCALMBOX._iv=null; return; }
      if(ZCALMBOX.fighting())return; if(typeof ZDeath!=='undefined'&&ZDeath.busy)return; if(typeof ZDLG!=='undefined'&&ZDLG.open)return;
      var fs=document.getElementById('fairy-talk'); if(fs&&fs.style.display!=='none'&&fs.isConnected)return;
      var h=ZCALMBOX.held.shift(); try{ h[0].apply(null,h[1]); }catch(e){ console.warn('calm box',e); } },700); }
};
(function(){ if(typeof window==='undefined')return;
  var mark=function(e){ var k=e&&e.key; if(!e||e.type==='mousedown'||k==='Tab'||k==='e'||k==='E'||k==='Enter')ZCALMBOX.userT=Date.now(); };
  window.addEventListener('keydown',mark,true); window.addEventListener('mousedown',mark,true);
  window.addEventListener('load',function(){
    if(typeof ZDLG!=='undefined'&&ZDLG.say){ var s0=ZDLG.say; ZDLG.say=function(name,text,opt){ opt=opt||{};
        if(!ZDLG.open&&!opt.now&&!ZCALMBOX.asked()&&ZCALMBOX.fighting()){ ZCALMBOX.hold(function(){ return ZDLG.say(name,text,opt); },[]); return true; }
        return s0.apply(ZDLG,arguments); }; }
    if(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.talk){ var t0=ZSPIRIT.talk; ZSPIRIT.talk=function(){ var a=arguments;
        if(!ZCALMBOX.asked()&&ZCALMBOX.fighting()){ ZCALMBOX.hold(function(){ return t0.apply(ZSPIRIT,a); },[]); return; }
        return t0.apply(ZSPIRIT,a); }; }
  });
})();
