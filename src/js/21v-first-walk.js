// ═══════════════════════════════════════════════════════════════════════
// ║ 21v-first-walk.js — round 100: THE FIRST MINUTES (doc 52; Kris's pick "Your twin walks you out", and his note on Elder Runa: "after
// ║ coming out of Oswin's shop, elder runa should show you the runestones").
// ║  After the opening, on a new game, taught by doing — each step done to go on, its words in the line under the little map:
// ║    1. your twin: "The whole village is waiting — Oswin has been asking for you" (with "I know how to play — skip the lessons")
// ║    2. move (WASD / arrows · the stick)            3. swing your sword (Space · ⚔), three times
// ║    4. open the map (Q · 🗺) — the guild is the gold arrow's mark      5. walk to the Adventurers' Guild and Tab at its door → Oswin
// ║    6. coming out: Elder Runa by the Runestone on the Green shows you the runestones — and the waystones you travel by.
// ║  Old saves skip it. Switch: ZWALK.on (the suites turn it off).
// ═══════════════════════════════════════════════════════════════════════
var ZWALK={ on:true,
  STEPS:{move:'Walk — W A S D or the arrow keys (on a phone: the stick on the left)',attack:'Swing your sword — Space (on a phone: ⚔), three times',map:'Open the map — Q (or the 🗺 button) — the guild is marked',
    guild:'Go to the Adventurers\' Guild — Tab at its door',runa:'Elder Runa is waiting for you by the Runestone on the Green'},
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  line:function(ws){ var ps=ws&&ws.playerState; if(!ZWALK.on||!ps||!ZWALK.STEPS[ps.walk])return null; return ZWALK.STEPS[ps.walk]+(ps.walk==='attack'?' ('+(ZWALK._hits||0)+' / 3)':''); },
  guild:function(ws){ return (ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type==='guild'; })||(ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type==='quest_board'; }); },
  target:function(ws){ var ps=ws.playerState; if(!ZWALK.on||!ps)return null;
    if(ps.walk==='guild'||ps.walk==='map'){ var G=ZWALK.guild(ws); if(G)return {x:G.worldX+Math.floor(G.w/2)*TILE+TILE/2,y:G.worldY+G.h*TILE,t:'The Adventurers\' Guild'}; }
    if(ps.walk==='runa'){ var R=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(R)return {x:R.x,y:R.y,t:'Elder Runa, by the Runestone'}; }
    return null; },
  go:function(ws,step){ var ps=ws.playerState; ps.walk=step; ZWALK._t=Date.now(); if(step==='move'){ ZWALK._p={x:ws.player.x,y:ws.player.y}; } if(step==='attack')ZWALK._hits=0;
    if(step==='done'){ if(typeof ZJOUR!=='undefined')ZJOUR.banner('You\'re on your way','Oswin\'s tasks are in your journal — the arrow on your little map points the way.'); } },
  done:function(ps){ ps.walk='done'; if(typeof ZLES!=='undefined'){ ['move','map'].forEach(function(id){ ZLES.teach(id,true); }); } },
  tick:function(){ try{ var ws=ZWALK.ws(); if(!ws||!ws.playerState||!ws.player)return; var ps=ws.playerState;
    if(ps.walk===undefined){ if(!ZWALK.on||!ws._newGame){ ps.walk='done'; return; }
      if(Date.now()-(ZWALK._born||(ZWALK._born=Date.now()))<4000)return; if(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&(ZCUT.isOpen()||document.getElementById('zcut-closing')))return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return;
      if(typeof ZSQ!=='undefined'&&ps.sagaQ&&ps.sagaQ.indexOf('opening')>=0)return;      /* the opening still waiting its turn */
      ZWALK.hi(ws); return; }
    if(!ZWALK.on||ps.walk==='done'||!ws.sys.isActive())return;
    if(ps.walk==='move'&&ZWALK._p&&Math.hypot(ws.player.x-ZWALK._p.x,ws.player.y-ZWALK._p.y)>TILE*3){ if(typeof ZLES!=='undefined')ZLES.teach('move',true); ZWALK.go(ws,'attack'); }
    else if(ps.walk==='attack'&&(ZWALK._hits||0)>=3)ZWALK.go(ws,'map');
    else if(ps.walk==='guild'&&ps.oswin)ZWALK.go(ws,'runa');
    if(ps.walk==='runa'){ var R=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(R&&!R._walk){ R._walk=1; R.talk=function(){ ZWALK.runa(ws,R); }; } }
  }catch(e){ if(!ZWALK._err){ ZWALK._err=1; console.warn('first walk',e); } } },
  hi:function(ws){ var ps=ws.playerState, O=typeof ZTWIN!=='undefined'?ZTWIN.other(ps):{name:'your twin',ch:null}, H=ps.hero==='f'?'Zeldara':'Zeldor'; ps.walk='hi';
    var t=H+'! You\'re finally up. The whole village has been waiting — and Master Oswin at the guild has been asking for you since dawn. Go on, stretch your legs. I\'ll be at my books in the library if you need me.';
    if(typeof ZDLG==='undefined'||!ZDLG.on){ ZWALK.go(ws,'move'); return; }
    ZDLG.say(O.name,t,{id:O.ch,extra:[{t:'I know how to play — skip the lessons',f:function(){ ps.lessonsOff=1; ZWALK._skip=1; }}],done:function(){ if(ZWALK._skip){ ZWALK._skip=0; ZWALK.done(ps); return; } ZWALK.go(ws,'move'); }});
    if(ZDLG.cur&&ZDLG.cur.el){} },
  runa:function(ws,R){ var ps=ws.playerState, H=ps.hero==='f'?'Zeldara':'Zeldor';
    var L=['There you are, '+H+'. Come — put your hand on the Runestone. It woke for you and your twin the night the lake gave you to us. No one else has ever made it hum.',
      'Out in the land stand smaller stones cut the same way: waystones. Lay your hand on one — Tab — and it wakes. From any waystone you can travel to every one you have woken, and this village stone is always awake.',
      'So go as far as you dare. The stones will bring you home.'];
    var say=function(i){ if(i>=L.length){ if(typeof ZLES!=='undefined')ZLES.teach('waystone',true); R.talk=null; R._walk=0; ZWALK.done(ps); ZWALK.go(ws,'done'); return; } ZDLG.say('Elder Runa',L[i],{id:'vf_elder',done:function(){ say(i+1); }}); };
    if(typeof ZDLG!=='undefined'&&ZDLG.on)say(0); else say(L.length); }
};
// the sword swings and the map (they move the walk on)
document.addEventListener('keydown',function(e){ var ws=ZWALK.ws(), ps=ws&&ws.playerState; if(!ps||ps.walk!=='attack'||e.key!==' '||e.repeat)return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; ZWALK._hits=(ZWALK._hits||0)+1; });
setInterval(function(){ var ws=ZWALK.ws(), ps=ws&&ws.playerState; if(ps&&ps.walk==='map'){ var m=document.getElementById('modal-map'); if(m&&m.style.display!=='none'&&m.offsetParent!==null){ if(typeof ZLES!=='undefined')ZLES.teach('map',true); ZWALK.go(ws,'guild'); } } ZWALK.tick(); },500);
