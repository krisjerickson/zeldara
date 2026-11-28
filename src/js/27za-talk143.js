// ═══════════════════════════════════════════════════════════════════════
// ║ 27za-talk143.js — round 143 (Kris: "having 2 places where the NPC pops up dialogue at the same time … I want almost everything to be the
// ║ pause dialogue that shows the NPC talking to you").
// ║ ZTALK — one voice at a time, and people speak in the dialogue box:
// ║  · while the dialogue box is open, the little speech bubble by the hero (#zbub) and the shopkeeper's bubble (#zvoice-bub) are hidden,
// ║    and a line that would have been a bubble waits its turn in the box instead;
// ║  · out of a fight (the World or a building, no foe hunting you), an NPC's line goes to the dialogue box however short it is — the bubble
// ║    stays only for a cry in a fight, inside a site, or a shopkeeper's aside over an open shop window (doc 99, "when a brief line is right").
// ║ Switch: ZTALK.on; ZTALK.ALL (false = the old "long lines only").
// ═══════════════════════════════════════════════════════════════════════
var ZTALK={ on:true, ALL:true,
  calm:function(){ try{ var sc=typeof _activePlayScene==='function'&&_activePlayScene(false), k=sc&&sc.sys.settings.key; if(k!=='World'&&k!=='Building')return false;
      if(typeof ZR140!=='undefined'&&ZR140.calm&&!ZR140.calm())return false;
      var ws=game.scene.getScene('World'), P=ws&&ws.player; if(k==='World'&&P&&(ws.worldMonsters||[]).some(function(m){ return !m.dead&&(m._m?m._m.aggro:m.state==='chase')&&Math.hypot(m.x-P.x,m.y-P.y)<TILE*12; }))return false;
      return true; }catch(e){ return false; } },
  hide:function(){ ['zbub','zvoice-bub'].forEach(function(id){ var b=document.getElementById(id); if(b){ b.className=b.className.replace(/\bon\b/g,'').trim(); b.classList&&b.classList.remove('on'); } }); } };
if(typeof ZMSG!=='undefined'){ var _zt_say=ZMSG.say; ZMSG.say=function(name,text,col){ if(!ZTALK.on)return _zt_say.apply(this,arguments);
    try{ if(typeof ZDLG!=='undefined'&&ZDLG.on&&(ZDLG.open||(ZTALK.ALL&&ZTALK.calm()))){ ZDLG.say(name,text,{}); return; } }catch(e){} return _zt_say.apply(this,arguments); }; }
if(typeof ZVOICE!=='undefined'){ var _zt_bub=ZVOICE.bubble; ZVOICE.bubble=function(){ if(ZTALK.on&&typeof ZDLG!=='undefined'&&ZDLG.open)return; return _zt_bub.apply(this,arguments); }; }
if(typeof ZDLG!=='undefined'){ var _zt_dsay=ZDLG.say; ZDLG.say=function(){ if(ZTALK.on)try{ ZTALK.hide(); }catch(e){} return _zt_dsay.apply(this,arguments); }; }
