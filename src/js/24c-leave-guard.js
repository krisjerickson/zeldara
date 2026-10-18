// ═══════════════════════════════════════════════════════════════════════
// ║ 24c-leave-guard.js — round 64d: DON'T LEAVE THE GAME BY ACCIDENT.
// ║ Kris: "i'm sometimes clicked a button while playing that brings me to a different website, and it interrupts the game. if possible, let's
// ║ lock other buttons not part of gameplay when you are playing so you don't accidentally loose the game and your progress".
// ║ The game page itself has no links away; what leaves it is the browser's own back/forward — the mouse's side buttons, and Alt + ← / →
// ║ (Alt is the roll key and the arrows walk, so Alt + ← is easy to hit), the keyboard's Back key — and links in the page around the game.
// ║ While a game is being played (not on the title screen):
// ║  · the mouse's back / forward buttons, Alt + ← / →, Browser Back / Forward keys and Backspace outside a text box do nothing;
// ║  · any link (on the page, or a later one) opens in a new tab instead of replacing the game;
// ║  · if the page is about to be left anyway (closing the tab, typing an address), the game saves first and the browser asks "Leave site?".
// ║ Switch: ZLEAVE.on (Dev: ZLEAVE.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZLEAVE={ on:true,
  playing:function(){ try{ return ZLEAVE.on&&typeof game!=='undefined'&&game.scene&&!game.scene.isActive('Title')&&!game.scene.isActive('Boot')&&!!game.scene.getScene('World')&&!!game.scene.getScene('World').playerState; }catch(e){ return false; } },
  save:function(){ try{ if(typeof ZSAVE!=='undefined'&&ZSAVE.write)ZSAVE.write(); }catch(e){} },
  typing:function(e){ var t=e.target; return !!(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))); }
};
(function(){
  // the browser's back and forward
  window.addEventListener('keydown',function(e){ if(!ZLEAVE.playing())return; var k=e.key;
    if((e.altKey&&(k==='ArrowLeft'||k==='ArrowRight'||k==='Left'||k==='Right'))||k==='BrowserBack'||k==='BrowserForward'||(k==='Backspace'&&!ZLEAVE.typing(e)))e.preventDefault(); },true);
  ['mouseup','mousedown','auxclick','pointerup'].forEach(function(t){ window.addEventListener(t,function(e){ if((e.button===3||e.button===4)&&ZLEAVE.playing()){ e.preventDefault(); e.stopPropagation(); } },true); });
  // a back step that still gets through (a gesture, a browser button): stay on the game
  try{ if(history&&history.pushState){ var armed=false; setInterval(function(){ if(!armed&&ZLEAVE.playing()){ armed=true; try{ history.pushState({zg:1},''); }catch(e){} } },1500);
      window.addEventListener('popstate',function(){ if(ZLEAVE.playing()){ try{ history.pushState({zg:1},''); }catch(e){} if(typeof showNotif==='function')showNotif('🔒 The game stays open — use the menu to quit.','#9fd0ff'); } }); } }catch(e){}
  // links open in a new tab while playing
  document.addEventListener('click',function(e){ if(!ZLEAVE.playing())return; var a=e.target&&e.target.closest&&e.target.closest('a[href]'); if(!a||a.hasAttribute('download')||/^(blob:|data:|#|javascript:)/i.test(a.getAttribute('href')||''))return; if(a.target!=='_blank'){ e.preventDefault(); try{ window.open(a.href,'_blank','noopener'); }catch(err){} } },true);
  // leaving anyway: save, and let the browser ask
  window.addEventListener('beforeunload',function(e){ if(!ZLEAVE.playing()||ZLEAVE._reloading)return; ZLEAVE.save(); e.preventDefault(); e.returnValue=''; return ''; });
  window.addEventListener('pagehide',function(){ if(ZLEAVE.playing())ZLEAVE.save(); });
})();
