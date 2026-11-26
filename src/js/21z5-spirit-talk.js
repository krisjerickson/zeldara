// ═══════════════════════════════════════════════════════════════════════
// ║ 21z5-spirit-talk.js — round 136: THE FREED SPIRITS TALK (Kris's pick for the forty spirits, A: "five lines each, from their own realm's
// ║ lost towns … OK that they know people from the village, but they usually came from a different quadrant and the lost cities from there").
// ║ The freed gather on the Runestone Green (10w). Stand by the Green's stone and [Tab]: one of the spirits you have freed comes over and talks
// ║ — about their town, their trade, the dark years, the fairy who kept them, what they will do when their line takes them home. Lines are
// ║ in src/npcs/spirits-*.md (built by tools/voices/build_npcs.py into ZNPC, keys sp_<name>); none repeats until each has said all five.
// ║ Switch: ZSPT.on.
// ═══════════════════════════════════════════════════════════════════════
var ZSPT={ on:true, R:3.4,
  freed:function(ws){ var ps=ws.playerState, S=typeof ZSPIRIT!=='undefined'&&ZSPIRIT.shrines?ZSPIRIT.shrines(ws):((ws.wd&&ws.wd._shrines)||[]), F=ps.spiritsFreed||[];
    return S.filter(function(s){ return F.indexOf(s.id)>=0&&typeof ZNPC!=='undefined'&&ZNPC['sp_'+String(s.spirit).toLowerCase()]; }).map(function(s){ return 'sp_'+String(s.spirit).toLowerCase(); }); },
  // whose turn: someone with lines left, the most recently freed first now and then
  pick:function(ws){ var L=ZSPT.freed(ws); if(!L.length)return null; var H=ws.playerState.npcHeard||(ws.playerState.npcHeard={});
    var left=L.filter(function(k){ return (H[k]||[]).length<(((ZNPC[k].lines||{}).life)||[]).length; }); if(!left.length){ L.forEach(function(k){ H[k]=[]; }); left=L; }
    return Math.random()<0.4?left[left.length-1]:left[Math.floor(Math.random()*left.length)]; },
  line:function(ws,k){ var H=ws.playerState.npcHeard||(ws.playerState.npcHeard={}), h=H[k]||(H[k]=[]), L=(ZNPC[k].lines||{}).life||[];
    for(var i=0;i<L.length;i++)if(h.indexOf('life'+i)<0){ h.push('life'+i); return L[i]; } return L[0]; },
  talk:function(){ var ws=Z2.ws(); if(!ws)return; var k=ZSPT.pick(ws); if(!k)return; var n=ZNPC[k], t=ZSPT.line(ws,k), esc=function(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
    var html='<i style="color:#cdeff8">'+esc(t)+'</i>';
    if(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.talk)ZSPIRIT.talk(n.who,ZSPIRIT.COL,html,[{t:'Someone else',f:function(){ ZSPT.talk(); }},{t:'Goodbye'}],ZSPIRIT._drawSpirit?ZSPIRIT._drawSpirit(true):null);
    else if(typeof showNotif==='function')showNotif('👻 '+n.who+': '+t,'#cdeff8'); },
  tick:function(){ if(!ZSPT.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World')||ws.wd&&ws.wd.islKey)return;
    var C=ZFEST.centre(ws), near=Z3.near(ws,C.x,C.y,TILE*ZSPT.R), busy=(ws._villageNPCs||[]).some(function(n){ return Math.hypot(ws.player.x-n.x,ws.player.y-n.y)<TILE*2; });
    if(near&&!busy&&!Z3.tab&&ZSPT.freed(ws).length){ Z3.prompt(ws,'spt',C.x,C.y-70,'[Tab] Talk with the freed spirits'); Z3.tab=ZSPT.talk; } else Z3.hide(ws,'spt'); } };
if(typeof Z3!=='undefined')(Z3.more||(Z3.more=[])).push(ZSPT.tick);
