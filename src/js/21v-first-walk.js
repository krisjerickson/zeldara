// ═══════════════════════════════════════════════════════════════════════
// ║ 21v-first-walk.js — round 100: THE FIRST MINUTES (doc 52; Kris's pick "Your twin walks you out", and his note on Elder Runa: "after
// ║ coming out of Oswin's shop, elder runa should show you the runestones").
// ║  After the opening, on a new game, taught by doing — each step done to go on, its words in the line under the little map:
// ║    1. your twin: "The whole village is waiting — Oswin has been asking for you" (with "I know how to play — skip the lessons")
// ║    2. move (WASD / arrows · the stick)            3. swing your sword (Space · ⚔), three times
// ║    4. open the map (Q · 🗺) — the guild is the gold arrow's mark      5. walk to the Adventurers' Guild and Tab at its door → Oswin
// ║    6. coming out: Elder Runa by the Runestone on the Green shows you the runestones — and the waystones you travel by.
// ║  Old saves skip it. Switch: ZWALK.on (the suites turn it off).
// ║ Round 110 (Kris: "at the very beginning, you should start with master oswin, but he's not at the village center. Make him be there at
// ║ the beginning and then lead you to his guild hall as part of the tutorial"): Master Oswin stands by you on the Green when a new game
// ║ begins. HE greets you (no longer your twin), watches you walk and swing, has you open the map, then walks you to his guild — waiting
// ║ when you fall behind — and goes in ahead of you: Tab at the door. "Skip the lessons" skips the walking and swinging, not the walk with him.
// ═══════════════════════════════════════════════════════════════════════
function ZOSW_NAME(){ return typeof ZOSW!=='undefined'&&ZOSW.NAME||'Master Oswin'; }
var ZWALK={ on:true,
  STEPS:{follow:'Follow Master Oswin to his Adventurers\' Guild',move:'Walk — W A S D or the arrow keys (on a phone: the stick on the left)',attack:'Swing your sword — Space (on a phone: ⚔), three times',map:'Open the map — Q (or the 🗺 button) — the guild is marked',
    guild:'Go to the Adventurers\' Guild — Tab at its door',runa:'Elder Runa is waiting for you by the Runestone on the Green'},
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  // round 110b (Kris: "the background hasn't yet rendered, and it looks weird. he should only start speaking once you've loaded into the
  // village green"): the Green is on screen — its painted ground chunks all mounted and drawn — and a moment has passed to take it in
  ready:function(ws){ try{ if(typeof ZScn!=='undefined'&&!ZScn.done&&!ZScn.off)return false; var W=ws._wr; if(!W||!ws._wrNeeded)return false;      /* round 110c: no painter yet = nothing drawn yet */
      var ok=ws._wrNeeded().every(function(n){ if(!n.vis)return true; var c=W.chunks.get(n.key); return !!c&&!(c.pend&&c.pend.length); });
      if(!ok){ ZWALK._rdyT=0; return Date.now()-(ZWALK._born||Date.now())>25000; }      /* never wait more than 25 s */
      if(!ZWALK._rdyT)ZWALK._rdyT=Date.now(); return Date.now()-ZWALK._rdyT>1200; }catch(e){ return true; } },
  line:function(ws){ var ps=ws&&ws.playerState; if(!ZWALK.on||!ps||!ZWALK.STEPS[ps.walk])return null; return ZWALK.STEPS[ps.walk]+(ps.walk==='attack'?' ('+(ZWALK._hits||0)+' / 3)':''); },
  guild:function(ws){ return (ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type==='guild'; })||(ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type==='quest_board'; }); },
  RUNA_FAR:40, RUNA_MS:240000,
  target:function(ws){ var ps=ws.playerState; if(!ZWALK.on||!ps)return null;
    if(ps.walk==='guild'||ps.walk==='map'){ var G=ZWALK.guild(ws); if(G)return {x:G.worldX+Math.floor(G.w/2)*TILE+TILE/2,y:G.worldY+G.h*TILE,t:'The Adventurers\' Guild'}; }
    if(ps.walk==='runa'){ var R=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(R)return {x:R.x,y:R.y,t:'Elder Runa, by the Runestone'}; }
    if(ps.walk==='follow'&&ZWALK._ow)return {x:ZWALK._ow.x,y:ZWALK._ow.y,t:'Master Oswin'};
    return null; },
  go:function(ws,step){ var ps=ws.playerState; ps.walk=step; ZWALK._t=Date.now(); if(step==='move'){ ZWALK._p={x:ws.player.x,y:ws.player.y}; } if(step==='attack')ZWALK._hits=0;
    if(step==='done'){ if(typeof ZJOUR!=='undefined')ZJOUR.banner('You\'re on your way','Oswin\'s tasks are in your journal — the arrow on your little map points the way.'); } },
  done:function(ps){ ps.walk='done'; if(typeof ZLES!=='undefined'){ ['move','map'].forEach(function(id){ ZLES.teach(id,true); }); } },
  tick:function(){ try{ var ws=ZWALK.ws(); if(!ws||!ws.playerState||!ws.player)return; var ps=ws.playerState;
    if(ps.walk===undefined){ if(!ZWALK.on||!ws._newGame){ ps.walk='done'; return; }
      if(!ZWALK._born)ZWALK._born=Date.now(); if(!ZWALK.ready(ws))return;      /* round 110b: nothing until the Green is drawn */
      ZWALK.spawn(ws);      /* round 110: Oswin is on the Green, waiting for you */
      if(Date.now()-ZWALK._born<4000)return; if(typeof ZCUT!=='undefined'&&ZCUT.isOpen&&(ZCUT.isOpen()||document.getElementById('zcut-closing')))return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return;
      if(typeof ZSQ!=='undefined'&&(ZSQ.hold(ps)||(ps.sagaQ&&ps.sagaQ.indexOf('opening')>=0)||Date.now()-ZSQ.lastEnd<1500))return;      /* round 107: the opening first (still to come, playing or just closed) */
      ZWALK.hi(ws); return; }
    if(!ZWALK.on||ps.walk==='done'||!ws.sys.isActive())return;
    if(ZWALK.OW_STEPS.indexOf(ps.walk)>=0)ZWALK.spawn(ws); else ZWALK.unspawn(ws);
    if(ps.walk==='follow'&&!ZWALK._fsaid&&!(typeof _anyModalOpen==='function'&&_anyModalOpen())){ ZWALK._fsaid=1; ZWALK.lead(ws); }
    if(ps.walk==='move'&&ZWALK._p&&Math.hypot(ws.player.x-ZWALK._p.x,ws.player.y-ZWALK._p.y)>TILE*3){ if(typeof ZLES!=='undefined')ZLES.teach('move',true); ZWALK.go(ws,'attack'); ZWALK.say(ws,'Steady on your feet — good. Now show me that sword arm: three swings. (Space, or the ⚔ button.)'); }
    else if(ps.walk==='attack'&&(ZWALK._hits||0)>=3){ if(typeof ZLES!=='undefined')ZLES.teach('map',true); ZWALK.go(ws,'follow'); ZWALK._fsaid=1; ZWALK.lead(ws,true); }      /* round 110b: he answers at once and leads you (Kris: "I swung my sword 3 times and nothing happened … he didn't lead me") */
    else if(ps.walk==='guild'&&ps.oswin)ZWALK.go(ws,'runa');
    if(ps.walk==='runa'){ var R=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(R&&!R._walk){ R._walk=1; R.talk=function(){ ZWALK.runa(ws,R); }; } }
    // round 112 (Kris: the arrow "seemed to be stuck at the town center"): Runa's step no longer waits for ever — walk out of the village
    // (or let four minutes pass) and her lesson comes as a note, the walk ends, and the arrows follow your quests
    if(ps.walk==='runa'){ if(!ZWALK._t)ZWALK._t=Date.now(); var far=Math.hypot(ws.player.x/TILE-CENTER_X,ws.player.y/TILE-CENTER_Y)>ZWALK.RUNA_FAR;
      if(far||Date.now()-ZWALK._t>ZWALK.RUNA_MS){ var R2=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_elder'; }); if(R2&&R2._walk){ R2.talk=null; R2._walk=0; }
        if(typeof ZLES!=='undefined')ZLES.teach('waystone',true); showNotif('ᛟ Elder Runa\'s lesson: lay your hand on a waystone (Tab) to wake it — from any waystone you can travel to every one you have woken.','#b8fff2'); ZWALK.done(ps); ZWALK.go(ws,'done'); } }
  }catch(e){ if(!ZWALK._err){ ZWALK._err=1; console.warn('first walk',e); } } },
  hi:function(ws){ var ps=ws.playerState, O=typeof ZTWIN!=='undefined'?ZTWIN.other(ps):{name:'your twin',ch:null}, H=ps.hero==='f'?'Zola':'Zoldor'; ps.walk='hi'; ZWALK.spawn(ws);
    var L=['There you are, '+H+'! Up at last. I am Master Oswin, keeper of the Adventurers\' Guild — the whole village has waited for this day, and '+O.name+' is already at the library with a pile of old books.',
      'Before I take you to my guild, let me see you stand on your own feet. Walk a little — and then show me that sword arm.'];
    if(typeof ZDLG==='undefined'||!ZDLG.on){ ZWALK.go(ws,'move'); return; }
    var say=function(i){ var last=i===L.length-1; ZDLG.say(ZOSW_NAME(),L[i],{id:'npc_guild',icon:'📜',extra:last?[{t:'I know how to play — skip the lessons',f:function(){ ps.lessonsOff=1; ZWALK._skip=1; }}]:null,
      done:function(){ if(!last)return say(i+1); if(ZWALK._skip){ ZWALK._skip=0; ['move','map'].forEach(function(id){ if(typeof ZLES!=='undefined')ZLES.teach(id,true); }); ZWALK.go(ws,'follow'); return; } ZWALK.go(ws,'move'); }}); };
    say(0); },
  // ── Master Oswin on the Green, and his walk to the guild (round 110) ──
  OW_STEPS:[undefined,'hi','move','attack','map','follow'], SPD:92, WAIT:TILE*5, GO:TILE*3,
  spawn:function(ws){ if(ZWALK._ow&&ZWALK._ow.ws===ws&&ZWALK._ow.im&&ZWALK._ow.im.active)return ZWALK._ow; ZWALK.unspawn(ws);
    var P=ws.player, at=null; for(var r=2;r<8&&!at;r++)for(var a=0;a<12;a++){ var an=a/12*Math.PI*2-0.3, x=P.x+Math.cos(an)*r*TILE*0.8, y=P.y+Math.sin(an)*r*TILE*0.5; if(ws._canGo(x,y,null)){ at={x:x,y:y}; break; } }
    if(!at)at={x:P.x+TILE*2,y:P.y}; var im=typeof CHX!=='undefined'?CHX.sprite(ws,'npc_guild',at.x,at.y+12,1.45):null; if(!im)return null; im.setDepth(WR_DEPTH(at.y)); im.setFlipX(P.x<at.x);
    var tag=typeof domText==='function'?domText(ws,at.x,at.y-44,'Master Oswin',{fontSize:'9px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(0.5).setDepth(WR_DEPTH(at.y)+0.5):null;
    var npc={id:'npc_guild_out',n:'Master Oswin',icon:'💬',x:at.x,y:at.y,line:'',talk:function(){ var w=ws.playerState.walk; ZDLG.say(ZOSW_NAME(),w==='follow'?'This way — the guild hall is just ahead. Keep up!':w==='map'?'Open your map — Q — and you will see my guild marked in gold.':w==='attack'?'Three good swings — Space. Let me see them.':'Walk a little first — W A S D or the arrow keys.',{id:'npc_guild',icon:'📜'}); }};
    (ws._villageNPCs||(ws._villageNPCs=[])).push(npc);
    ZWALK._ow={ws:ws,im:im,tag:tag,npc:npc,x:at.x,y:at.y,path:null,i:0,t:0};
    if(!ws._owHook){ ws._owHook=1; ws.events.on('update',function(t,dt){ try{ ZWALK.step(ws,(dt||16)/1000); }catch(e){} }); ws.events.once('shutdown',function(){ ws._owHook=0; ZWALK._ow=null; }); }
    return ZWALK._ow; },
  unspawn:function(ws){ var O=ZWALK._ow; if(!O)return; try{ O.im.destroy(); }catch(e){} try{ if(O.tag)O.tag.destroy(); }catch(e){} if(O.ws&&O.ws._villageNPCs)O.ws._villageNPCs=O.ws._villageNPCs.filter(function(n){ return n!==O.npc; }); ZWALK._ow=null; },
  door:function(ws){ var G=ZWALK.guild(ws); if(!G)return null; var x=G.worldX+Math.floor(G.w/2)*TILE+TILE/2, y=G.worldY+G.h*TILE+TILE/2; for(var r=0;r<4;r++)for(var dx=-r;dx<=r;dx++){ if(ws._canGo(x+dx*TILE,y+r*TILE,null))return {x:x+dx*TILE,y:y+r*TILE}; } return {x:x,y:y}; },
  // the way to the guild door: a walk over the tiles you can walk on
  route:function(ws,from,to){ var tx0=Math.floor(from.x/TILE), ty0=Math.floor(from.y/TILE), tx1=Math.floor(to.x/TILE), ty1=Math.floor(to.y/TILE), R=Math.max(Math.abs(tx1-tx0),Math.abs(ty1-ty0))+30,
      X0=Math.min(tx0,tx1)-R, Y0=Math.min(ty0,ty1)-R, W=Math.max(tx0,tx1)+R-X0+1, H=Math.max(ty0,ty1)+R-Y0+1, prev=new Int32Array(W*H).fill(-2), q=[(ty0-Y0)*W+(tx0-X0)], goal=(ty1-Y0)*W+(tx1-X0);
    prev[q[0]]=-1; var ok=function(x,y){ return ws._canGo((x+X0)*TILE+TILE/2,(y+Y0)*TILE+TILE/2,null); };
    for(var i=0;i<q.length&&prev[goal]===-2;i++){ var c=q[i], cx=c%W, cy=(c/W)|0; [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(d){ var nx=cx+d[0], ny=cy+d[1]; if(nx<0||ny<0||nx>=W||ny>=H)return; var k=ny*W+nx; if(prev[k]!==-2||!ok(nx,ny))return; if(d[0]&&d[1]&&(!ok(cx+d[0],cy)||!ok(cx,cy+d[1])))return; prev[k]=c; q.push(k); }); }
    if(prev[goal]===-2)return [to]; var out=[]; for(var k=goal;k>=0;k=prev[k])out.push({x:(k%W+X0)*TILE+TILE/2,y:((k/W)|0)*TILE+Y0*TILE+TILE/2}); out.reverse(); out.push(to); return out; },
  lead:function(ws,sw){ var O=ZWALK.spawn(ws), d=ZWALK.door(ws); if(!O||!d)return; O.path=ZWALK.route(ws,{x:O.x,y:O.y},d); O.i=0;
    ZWALK.say(ws,sw?'Ha! A fine arm — that wooden blade will do for now. Come along, I will walk you to my guild hall myself. Stay close! (Q opens your map any time — the guild is the gold mark.)':'Come along, I will walk you to my guild hall myself. Stay close!'); },
  say:function(ws,t){ if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say(ZOSW_NAME(),t,{id:'npc_guild',icon:'📜'}); else showNotif('📜 Master Oswin: '+t,'#ffe9a8'); },
  // each frame: Oswin walks his route, waits when you fall behind, and goes in at the door
  step:function(ws,dt){ var O=ZWALK._ow; if(!O||O.ws!==ws||!O.im||!O.im.active)return; var P=ws.player, ps=ws.playerState, dP=Math.hypot(P.x-O.x,P.y-O.y), moving=false;
    if(ps.walk==='follow'&&O.path&&!(typeof _anyModalOpen==='function'&&_anyModalOpen())){
      if(dP>ZWALK.WAIT)O.wait=true; else if(dP<ZWALK.GO)O.wait=false;
      if(O.wait){ O.t+=dt; if(O.t>6){ O.t=0; showNotif('Master Oswin waits for you — follow him to the guild','#ffe9a8'); } }
      else { var tg=O.path[O.i]; if(tg){ var dx=tg.x-O.x, dy=tg.y-O.y, L=Math.hypot(dx,dy), st=ZWALK.SPD*dt; if(L<=st){ O.x=tg.x; O.y=tg.y; O.i++; } else { O.x+=dx/L*st; O.y+=dy/L*st; O.im.setFlipX(dx<0); } moving=true; }
        else { ZWALK.unspawn(ws); if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say(ZOSW_NAME(),'Here we are — my guild hall. In you come: Tab at the door.',{id:'npc_guild',icon:'📜'}); ZWALK.go(ws,'guild'); return; } } }
    else if(dP<TILE*6)O.im.setFlipX(P.x<O.x);
    var bob=moving?Math.abs(Math.sin(Date.now()/110))*2:0; O.im.setPosition(O.x,O.y+12-bob).setDepth(WR_DEPTH(O.y)); if(O.tag)O.tag.setPosition(O.x,O.y-44-bob); O.npc.x=O.x; O.npc.y=O.y; },
  runa:function(ws,R){ var ps=ws.playerState, H=ps.hero==='f'?'Zola':'Zoldor';
    var L=['There you are, '+H+'. Come — put your hand on the Runestone. It woke for you and your twin the night the lake gave you to us. No one else has ever made it hum.',
      'Out in the land stand smaller stones cut the same way: waystones. Lay your hand on one — Tab — and it wakes. From any waystone you can travel to every one you have woken, and this village stone is always awake.',
      'So go as far as you dare. The stones will bring you home.'];
    var say=function(i){ if(i>=L.length){ if(typeof ZLES!=='undefined')ZLES.teach('waystone',true); R.talk=null; R._walk=0; ZWALK.done(ps); ZWALK.go(ws,'done'); return; } ZDLG.say('Elder Runa',L[i],{id:'vf_elder',done:function(){ say(i+1); }}); };
    if(typeof ZDLG!=='undefined'&&ZDLG.on)say(0); else say(L.length); }
};
// the sword swings and the map (they move the walk on)
// the sword swings (round 110b: counted from the swing itself — Space, the ⚔ button or a click — not from one key)
(function(){ if(typeof WorldScene==='undefined')return; var a0=WorldScene.prototype._worldAttack; WorldScene.prototype._worldAttack=function(){ var ps=this.playerState, can=!(this.worldAtkTimer>0); var r=a0.apply(this,arguments); try{ if(can&&ps&&ps.walk==='attack'){ ZWALK._hits=(ZWALK._hits||0)+1; } }catch(e){} return r; }; })();
setInterval(function(){ var ws=ZWALK.ws(), ps=ws&&ws.playerState; if(ps&&ps.walk==='map'){ var m=document.getElementById('modal-map'); if(m&&m.style.display!=='none'&&m.offsetParent!==null){ if(typeof ZLES!=='undefined')ZLES.teach('map',true); ZWALK.go(ws,'follow'); } } ZWALK.tick(); },500);
