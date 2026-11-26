// ═══════════════════════════════════════════════════════════════════════
// ║ 21u-oswin.js — round 100: MASTER OSWIN SPEAKS (doc 52; Kris's picks: Oswin guides, "the stern scholar", drop "Accept"; first 100 gold:
// ║ "The camp on the east road" + "The fisher's net"; extras: Oswin's rumours on the map, "Stuck?" from Oswin, more help on Hearthside).
// ║  · [Tab] at Oswin in the guild: he speaks in the dialogue box, then the journal opens. First visit: who he is and your first two tasks,
// ║    50 g each — enough for the village shop's Iron Sword (40 g) and Wood Shield (25 g), with a potion's worth over. Later visits: the next
// ║    step of the Saga, and a rumour of something you have not found yet (a castle isle, a mage tower, the island) — a faint ring on the map.
// ║  · Oswin's purse: the nearest camp with a chest east of the village; beat its guards and its chest holds his 50 g.
// ║  · Old Nell's net: snagged on the far shore of Mirror Lake, two skeletons standing over it; [Tab] to take it, back to Old Nell at the pier
// ║    for 50 g.
// ║  · Stuck: when the Saga has not moved for 20 minutes of play, Oswin's next words are a stronger hint (where, which way, how far); on
// ║    Hearthside the line under the little map also flashes a reminder every 5 minutes.
// ║ ps.tq = {camp:0 none · 1 given · 3 paid, net:0 · 1 given · 2 in hand · 3 paid, campId, netAt}; ps.rumours = [site ids]; ps.oswin = visits.
// ║ Switch: ZOSW.on.
// ═══════════════════════════════════════════════════════════════════════
var ZOSW={ on:true, NAME:'Master Oswin', ID:'npc_guild', PAY:50,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  tq:function(ps){ return ps.tq||(ps.tq={camp:0,net:0}); },
  dir:function(ws,x,y){ var a=Math.atan2(y-ws.player.y,x-ws.player.x); return ['east','south-east','south','south-west','west','north-west','north','north-east'][((Math.round(a/(Math.PI/4))%8)+8)%8]; },
  // ── the first visit (the stern scholar) and every visit after ──
  talk:function(ws){ var ps=ws.playerState, T=ZOSW.tq(ps), L=[]; ps.oswin=(ps.oswin||0)+1;
    if(typeof ZLES!=='undefined')ZLES.teach('guild',true);
    if(ps.oswin===1&&!T.camp&&!T.net){ ZOSW.give(ws);
      L.push('Sit, sit — my knees have done their walking for today. Now, to business. Every road out of this village is shut by something — a tower, a dungeon, a thing in the dark. I keep the list. You will clear it.');      /* round 137 (Kris: "Oswin says at last the hero has come to my guild hall after he\'s been talking to you for awhile"): he walked you here himself */
      L.push('But not with a wooden blade. Start small, and earn your steel: '+(function(){ var C=ZOSW.camp(ws); return C?'the '+C.T.name+', a camp on the road east of the village':'a camp on the road east of the village'; })()+' — its guards took my purse, fifty gold, and it sits in their chest. Beat every guard (some hide until you come close), then Tab at the chest. Keep the gold.');
      L.push('And Old Nell at the pier lost her net to the lake\'s far shore. Two skeletons stand over it. Bring it to her; she will pay you fifty more. The village shop has an iron sword for forty — and a potion or two for the road. Spend it there.');      /* round 137: the shield comes from the wolf at the sheep pen (21v2), so no shield to buy */
      L.push('Everything I tell you is written in your journal. Come back when you are done, and I will tell you what is next. But first — Elder Runa wants you at the Runestone on the Green.'); }      /* round 137: the next step, said where it happens */
    else { if(T.camp===1||T.net&&T.net<3)L.push(ZOSW.remind(ws));
      var N=typeof ZQMAP!=='undefined'?ZQMAP.next(ws):null; if(N&&!(T.camp===1||T.net&&T.net<3))L.push('What is next: '+N.t.charAt(0).toLowerCase()+N.t.slice(1)+'.');
      if(ZOSW.stuck(ws)){ var tg=typeof ZJOUR!=='undefined'?ZJOUR.target(ws):null; if(tg)L.push('You have been circling. Listen: '+tg.t+' — '+Math.round(Math.hypot(tg.x-ws.player.x,tg.y-ws.player.y)/TILE)+' paces to the '+ZOSW.dir(ws,tg.x,tg.y)+'. The gold arrow on your little map points there.'); ps.pathT=0; }
      /* round 102 (Kris ✓ "say early what the end needs … only once you reveal the volcanos"): when the forges rise, Oswin names the staff the great hearth needs */
      if(typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps)&&!ps.oswinStaff&&(ps.inventory||[]).indexOf('sov_staff')<0&&!(ps.equip&&ps.equip.mWeapon==='sov_staff')){ ps.oswinStaff=true;
        L.push('The volcanoes have woken — so hear what the old sagas say. The great hearth under Muspelheim takes four Heartglasses and the Sovereign staff. The staff goes to whoever beats all sixteen mage-tower masters — or the apothecary can work an Arcane staff up into one, for six thousand gold and a fistful of gems. Choose your road, and start putting gold aside.'); }
      var R=ZOSW.rumour(ws); if(R)L.push(R);
      if(!L.length)L.push('The list is shorter than it was. Keep going.'); }
    var say=function(i){ if(i>=L.length){ ZOSW.journal(ws); return; } ZDLG.say(ZOSW.NAME,L[i],{id:ZOSW.ID,icon:'📜',done:function(){ say(i+1); }}); };
    if(typeof ZDLG!=='undefined'&&ZDLG.on)say(0); else { showNotif('📜 '+L.join(' '),'#ffdd44'); ZOSW.journal(ws); } },
  journal:function(ws){ var ps=ws.playerState; if(typeof renderQuestList==='function')renderQuestList(ps.unlockedSections,ps.completedQuests,ps.activeQuest,ws); if(typeof toggleModal==='function'){ var e=document.getElementById('modal-quests'); if(!e||e.style.display==='none')toggleModal('quests'); } },
  remind:function(ws){ var T=ZOSW.tq(ws.playerState), a=[]; if(T.camp===1)a.push('my purse is still in that camp to the east'+(function(){ var C=ZOSW.camp(ws); return C?' — the '+C.T.name:''; })()); if(T.net===1)a.push('Old Nell\'s net still lies on the far shore'); if(T.net===2)a.push('you have Nell\'s net — take it to her at the pier');
    return a.length?'Well? '+a.join('; and ').replace(/^./,function(c){ return c.toUpperCase(); })+'.':''; },
  // ── the two tasks ──
  give:function(ws){ var ps=ws.playerState, T=ZOSW.tq(ps); T.camp=1; T.net=1; var C=ZOSW.camp(ws); if(C)T.campId=C.id; ZOSW.netSpot(ws); ps.tracked='tq:camp'; },
  camp:function(ws){ var T=ZOSW.tq(ws.playerState), all=ws._camps||[]; if(T.campId){ var c=all.find(function(C){ return C.id===T.campId; }); if(c&&(c.T.r.k==='chest'||T.camp!==1||c.state!=='guarded'))return c; }      /* round 108: a save whose camp has no chest (the camps were re-dealt) is given the nearest one with a chest */
    var G0=all.filter(function(C){ return C.sec===1&&C.state==='guarded'; }), G1=G0.filter(function(C){ return C.T.r.k==='chest'; }), G=G1.length?G1:G0, E=G.filter(function(C){ return C.tx>CENTER_X; }),      /* round 108: a camp with a chest (his purse is in one) */
    P=(E.length?E:G).slice().sort(function(a,b){ return Math.hypot(a.tx-CENTER_X,a.ty-CENTER_Y)-Math.hypot(b.tx-CENTER_X,b.ty-CENTER_Y); }); var R=P[0]||null; if(R&&T.camp===1)T.campId=R.id; return R; },
  // the net: on the shore of Mirror Lake, the side farthest from the village
  // round 110 (Kris: "the beginning quest of finding the fisher's net is not currently possible, as the skeleton dog standing over it is in
  // the highlands, and stuck there"): the net lies on a shore of Mirror Lake you can WALK to from the village without leaving the
  // Gildenmark — found by walking out from the Green over open ground of the village and Gildenmark only; the farthest such shore.
  // A save whose net lay somewhere else gets the new place.
  reach:function(ws){ if(ws._tqReach&&ws._tqReach.wd===ws.wd)return ws._tqReach; var W=WORLD_W, H=WORLD_H, seen=new Uint8Array(W*H), q=[CENTER_Y*W+CENTER_X], shore=[], L=(typeof ZASG!=='undefined'&&ZASG.LAKE)||{x:600,y:600}, tl=ws.tiles||ws.wd.tiles;
    var ok=function(x,y){ if(x<1||y<1||x>=W-1||y>=H-1)return false; if(Math.hypot(x-CENTER_X,y-CENTER_Y)>150)return false; var sc=getTileSection(x,y)||0; if(sc!==0&&sc!==1)return false; return !ws._canGo||ws._canGo(x*TILE+16,y*TILE+16,null); };
    var wet=function(x,y){ var t=tl[y]&&tl[y][x]; return t===T.SHALLOW_WATER||t===T.DEEP_WATER; };
    seen[q[0]]=1; for(var i=0;i<q.length;i++){ var c=q[i], x=c%W, y=(c/W)|0;
      if((wet(x+1,y)||wet(x-1,y)||wet(x,y+1)||wet(x,y-1))&&Math.hypot(x-L.x,y-L.y)<75)shore.push(c);
      [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var nx=x+o[0], ny=y+o[1], k=ny*W+nx; if(seen[k]||!ok(nx,ny))return; seen[k]=1; q.push(k); }); }
    ws._tqReach={wd:ws.wd,seen:seen,shore:shore}; return ws._tqReach; },
  netOk:function(ws,N){ try{ var R=ZOSW.reach(ws), tx=Math.floor(N.x/TILE), ty=Math.floor(N.y/TILE); return !!R.seen[ty*WORLD_W+tx]; }catch(e){ return true; } },
  netSpot:function(ws){ var T=ZOSW.tq(ws.playerState); if(T.netAt&&ZOSW.netOk(ws,T.netAt))return T.netAt;
    var R=ZOSW.reach(ws), best=null, bd=-1; R.shore.forEach(function(c){ var x=c%WORLD_W, y=(c/WORLD_W)|0, d=Math.hypot(x-CENTER_X,y-CENTER_Y); if(d>bd&&d>14){ bd=d; best={x:x*TILE+16,y:y*TILE+16}; } });
    if(T.netAt&&ws._tqNet){ try{ ws._tqNet.destroy(); }catch(e){} ws._tqNet=null; (ws._tqNetG||[]).forEach(function(m){ if(m&&!m.dead){ m.dead=true; try{ m.cont.destroy(); }catch(e){} } }); ws._tqNetG=[]; }
    T.netAt=best||{x:(CENTER_X+30)*TILE,y:(CENTER_Y+20)*TILE}; return T.netAt; },
  target:function(ws,which){ var ps=ws.playerState, T=ZOSW.tq(ps);
    if((!which||which==='camp')&&T.camp===1){ var C=ZOSW.camp(ws); if(C)return {x:C.x,y:C.y,t:'Oswin\'s purse — the '+C.T.name+' east of the village'}; }
    if((!which||which==='net')&&T.net===1){ var N=ZOSW.netSpot(ws); return {x:N.x,y:N.y,t:'Old Nell\'s net — the lake\'s far shore'}; }
    if((!which||which==='net')&&T.net===2){ var F=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_fisher'; }); if(F)return {x:F.x,y:F.y,t:'Old Nell at the pier'}; }
    return null; },
  next:function(ws){ var T=ZOSW.tq(ws.playerState); if(!ws.playerState.oswin&&!T.camp)return {t:'Visit Master Oswin at the Adventurers\' Guild in the village'};
    var tg=ZOSW.target(ws); return tg?{t:tg.t}:null; },
  tick:function(){ try{ if(!ZOSW.on)return; var ws=ZOSW.ws(); if(!ws||!ws.playerState||!ws.player||!ws.sys.isActive()||ws.wd&&ws.wd.islKey)return; var ps=ws.playerState, T=ZOSW.tq(ps); if(typeof ZSQ!=='undefined'&&ZSQ.hold(ps))return;      /* round 107: a story cut-scene due goes first */
    // play time since the Saga last moved (for "stuck")
    var c=typeof ZJOUR!=='undefined'?ZJOUR.current(ws):null, id=c?c.id:''; if(ps._pathId!==id){ ps._pathId=id; ps.pathT=0; } else if(!(typeof isGamePaused==='function'&&isGamePaused()))ps.pathT=(ps.pathT||0)+1;
    if(+ps.difficulty===0&&ps.pathT>0&&ps.pathT%300===0&&ZOSW.stuck(ws)){ var N=typeof ZQMAP!=='undefined'?ZQMAP.next(ws):null; if(N)showNotif('📜 Oswin\'s reminder — '+N.t,'#ffe27a'); }
    // the net: its skeletons when you come near, [Tab] to take it
    if(T.net===1){ var N2=ZOSW.netSpot(ws), d=Math.hypot(ws.player.x-N2.x,ws.player.y-N2.y);
      if(!ws._tqNet&&d<TILE*22)ZOSW.netMake(ws,N2);
      var guards=(ws._tqNetG||[]).filter(function(m){ return m&&!m.dead; });
      if(ws._tqNet&&d<TILE*1.6){ if(!ws._tqNetP){ ws._tqNetP=domText(ws,N2.x,N2.y-36,guards.length?'The skeletons stand over it':'[Tab] Take Old Nell\'s net',{fontSize:'10px',color:'#ffff88',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); } }
      else if(ws._tqNetP){ ws._tqNetP.destroy(); ws._tqNetP=null; } }
    // Old Nell takes it back
    var F=(ws._villageNPCs||[]).find(function(n){ return n.id==='vf_fisher'; }); if(F&&!F._tq){ F._tq=1; F.talk=function(sc){ ZOSW.nell(ws); }; }
  }catch(e){ if(!ZOSW._err){ ZOSW._err=1; console.warn('oswin',e); } } },
  // the net itself: painted (07zt13 pc_fish_net) once in, drawn until then — a heap of knotted net with cork floats (it was a 🕸 emoji)
  netImage:function(ws,N){ var Zs=typeof _scn==='function'?_scn():null, zt=Zs&&Zs.has&&Zs.has('pc_fish_net')&&Zs.texture(ws,'pc_fish_net',44), im;
    if(zt)im=ws.add.image(N.x,N.y+10,zt.key).setOrigin(0.5,1).setScale(zt.scale);
    else { if(!ws.textures.exists('zosw_net')){ var c=mkCanvas(64,44), g=c.getContext('2d'); g.fillStyle='rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(32,38,28,6,0,0,Math.PI*2); g.fill();
        g.fillStyle='#8a7350'; g.beginPath(); g.moveTo(6,36); g.quadraticCurveTo(10,14,30,10); g.quadraticCurveTo(54,12,58,36); g.closePath(); g.fill();
        g.save(); g.clip(); g.strokeStyle='#d8c8a0'; g.lineWidth=1.2; for(var k=-60;k<80;k+=7){ g.beginPath(); g.moveTo(k,44); g.lineTo(k+40,0); g.stroke(); g.beginPath(); g.moveTo(k,0); g.lineTo(k+40,44); g.stroke(); } g.restore();
        g.strokeStyle='#4a3a20'; g.lineWidth=1.5; g.beginPath(); g.moveTo(6,36); g.quadraticCurveTo(10,14,30,10); g.quadraticCurveTo(54,12,58,36); g.stroke();
        [[14,26],[30,16],[46,22],[24,33],[50,33]].forEach(function(f){ g.fillStyle='#e0a040'; g.beginPath(); g.ellipse(f[0],f[1],4,3,0,0,Math.PI*2); g.fill(); g.strokeStyle='#6a4a1a'; g.lineWidth=1; g.stroke(); });
        ws.textures.addCanvas('zosw_net',c); } im=ws.add.image(N.x,N.y+10,'zosw_net').setOrigin(0.5,1).setScale(0.9); }
    return im.setDepth(WR_DEPTH(N.y)); },
  netMake:function(ws,N){ try{ var im=ZOSW.netImage(ws,N); ws._tqNet=im; ws.events.once('shutdown',function(){ ws._tqNet=null; ws._tqNetG=null; ws._tqNetP=null; });
      var pool=(typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).filter(function(R){ return R.q===1&&typeof MX!=='undefined'&&MX.kit(R.id)&&!(typeof MON_LEGACY!=='undefined'&&MON_LEGACY[R.id]); }), bones=pool.filter(function(R){ return /skelet|bone|barrow|wight|crypt|grave/.test(R.id); }), id=((bones.length?bones:pool)[0]||{}).id; ws._tqNetG=[]; if(!id)return;      /* Gildenmark's own skeletons (those the monster engine knows) */
      [[-60,-20],[56,24]].forEach(function(o){ var gx=N.x+o[0], gy=N.y+o[1]; for(var t=0;t<16&&ws._canGo&&!ws._canGo(gx,gy,null);t++){ var a=t*0.9; gx=N.x+Math.cos(a)*(40+t*4); gy=N.y+Math.sin(a)*(30+t*3); }      /* round 110: on ground you can reach */
        var m=typeof MX!=='undefined'?MX.spawn(ws,id,gx,gy,{q:1,temp:true}):null; if(m){ m.section=1; m._guard=true; ws.worldMonsters.push(m); ws._tqNetG.push(m); } }); }catch(e){ console.warn('net',e); } },
  take:function(ws){ var T=ZOSW.tq(ws.playerState); if(T.net!==1||!ws._tqNet)return false; var N=ZOSW.netSpot(ws); if(Math.hypot(ws.player.x-N.x,ws.player.y-N.y)>TILE*1.6)return false;
    if((ws._tqNetG||[]).some(function(m){ return m&&!m.dead; })){ showNotif('💀 The skeletons stand over the net — beat them first.','#ffcc88'); return true; }
    T.net=2; ws._tqNet.destroy(); ws._tqNet=null; if(ws._tqNetP){ ws._tqNetP.destroy(); ws._tqNetP=null; } showNotif('🕸 You take Old Nell\'s net — back to the pier with it.','#cfe8ff'); if(ws.playerState.tracked==='tq:net'||!ws.playerState.tracked)ws.playerState.tracked='tq:net'; return true; },
  nell:function(ws){ var ps=ws.playerState, T=ZOSW.tq(ps), line;
    if(T.net===2){ T.net=3; ps.gold=(ps.gold||0)+ZOSW.PAY; line='My net! Twenty years it\'s fed this village, and I thought it gone. Here — fifty gold, and don\'t argue. Oswin sent a good one.'; if(ws._emitUI)ws._emitUI(); }
    else if(T.net===1)line='Oswin told you, then? My net\'s on the far shore — the bones walk there at dusk. Mind them.';
    else line='The lake gives when it wants to. Patience, dear.';
    if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say('Old Nell the Fisher',line,{id:'vf_fisher'}); else showNotif('Old Nell: "'+line+'"','#cfe8ff'); },
  campDone:function(ws,C){ var ps=ws.playerState, T=ZOSW.tq(ps); if(T.camp!==1||!C||C.id!==T.campId)return; T.camp=3; ps.gold=(ps.gold||0)+ZOSW.PAY; showNotif('💰 Oswin\'s purse — 50 gold, his to give and now yours.','#ffd700'); if(ps.tracked==='tq:camp')ps.tracked=T.net&&T.net<3?'tq:net':null; if(ws._emitUI)ws._emitUI(); },
  // ── stuck: 20 minutes of play without the Saga moving ──
  stuck:function(ws){ return (ws.playerState.pathT||0)>=1200; },
  // ── rumours: one thing you have not found, in a realm you can reach ──
  rumour:function(ws){ var ps=ws.playerState, wd=ws.wd||{}, ul=ps.unlockedSections||[1], R=ps.rumours||(ps.rumours=[]), ex=function(S){ return typeof _wmExplored!=='function'||_wmExplored(ps,S.tx+1.5,S.ty+1.5); };
    var C=(wd.sites||[]).filter(function(s){ return ul.indexOf(s.section)>=0&&R.indexOf(s.id)<0&&!ex(s)&&((s.type==='harbor')||s.mage); }); if(!C.length)return null;
    var S=C[(ps.oswin*7)%C.length]; R.push(S.id); var k=S.castle?'a castle isle, a master caged at its top':S.mage?'a mage tower, a master of spells at its top':'the harbour, and an island beyond it',
      a=Math.atan2(S.ty-CENTER_Y,S.tx-CENTER_X), d=['east','south-east','south','south-west','west','north-west','north','north-east'][((Math.round(a/(Math.PI/4))%8)+8)%8];
    return 'They say there is '+k+', off to the '+d+' in '+(typeof ZJOUR!=='undefined'?ZJOUR.RN[S.section]:'the realm')+'. I have marked it on your map — roughly.'; },
  rings:function(ctx,cw,ch,ws,v){ var ps=ws.playerState, R=ps.rumours||[], wd=ws.wd||{}; if(!R.length)return; var sc=cw/v.w;
    R.forEach(function(id,i){ var S=(wd.sites||[]).find(function(s){ return s.id===id; }); if(!S)return; if(typeof _wmExplored==='function'&&_wmExplored(ps,S.tx+1.5,S.ty+1.5))return;
      var h=(id.length*97+i*31)%360, ox=Math.cos(h)*5, oy=Math.sin(h)*5, x=(S.tx+1.5+ox-v.x)*sc, y=(S.ty+1.5+oy-v.y)*sc, r=12*sc;
      ctx.save(); ctx.strokeStyle='rgba(255,224,120,.55)'; ctx.setLineDash([6,5]); ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,Math.max(10,r),0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle='rgba(255,236,160,.85)'; ctx.font='700 11px "Segoe UI"'; ctx.textAlign='center'; ctx.fillText('rumour',x,y-Math.max(10,r)-4); ctx.restore(); }); }
};
setTimeout(function(){
  // Oswin speaks at the guild (the quest list opens after his words)
  if(typeof BuildingScene!=='undefined'){ var B=BuildingScene.prototype, ni0=B._npcInteract; B._npcInteract=function(){ var t=this.building&&this.building.type;
      if(ZOSW.on&&(t==='guild'||t==='quest_board')&&this.worldScene){ ZOSW.talk(this.worldScene); return; } return ni0.apply(this,arguments); }; }
  // Oswin's purse comes out of the camp's chest
  if(typeof WorldScene!=='undefined'){ var W=WorldScene.prototype, cc0=W._campCleared; if(cc0)W._campCleared=function(C){ var r=cc0.apply(this,arguments); try{ ZOSW.campDone(this,C); }catch(e){} return r; }; }
  // [Tab] at the net
  document.addEventListener('keydown',function(e){ if(e.key!=='Tab'||!ZOSW.on)return; if(typeof _anyModalOpen==='function'&&_anyModalOpen())return; var ws=ZOSW.ws(); if(ws&&ws.player&&ws.sys.isActive()&&ZOSW.take(ws)){ e.preventDefault(); e.stopImmediatePropagation(); } },true);
},0);
setInterval(ZOSW.tick,1000);
