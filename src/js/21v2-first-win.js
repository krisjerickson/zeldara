// ═══════════════════════════════════════════════════════════════════════
// ║ 21v2-first-win.js — round 132: THE FIRST WIN (Kris's pick in "Playing and coming back 2", first_win 'as'; and: "i also played last
// ║ night and didn't see the shield mini quest at the beginning and the reward" — it was planned for wave 2 and had not been built).
// ║  · As the first walk ends (Runa's lesson done), a cry from the sheep pen east of the Green: a young bramble wolf has a lamb cornered.
// ║  · The wolf is weak (three hits), slow and soft-biting. Master Oswin runs up behind you and talks you through it: swing — and roll
// ║    when it crouches. If it lands two bites he steps in and drives it off: you cannot lose this fight.
// ║  · The reward: Oswin hands you your first shield (a Wood Shield, put on at once) — "You stood your ground — now learn to hold it." The
// ║    shield lesson follows on a second, even weaker wolf. Then the lamb follows you back to the Green, and lives there.
// ║ ps.firstWin: 1 called · 2 fighting · 3 the shield lesson · 4 done.  Only on a game that has no shield yet. Switch: ZFWIN.on.
// ═══════════════════════════════════════════════════════════════════════
var ZFWIN={ on:true, PEN:{tx:715,ty:529}, W:null, lamb:null,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  pen:function(ws){ var P=(ws.wd&&ws.wd.props||[]).filter(function(o){ return o.vill&&o.prop==='fence'&&o.o&&o.o.kind==='stone'; })[0]; var t=P?{tx:P.x+P.w/2,ty:P.y+2}:ZFWIN.PEN; return {x:t.tx*TILE,y:t.ty*TILE}; },
  hasShield:function(ps){ return !!(ps.equip&&ps.equip.shield)||(ps.inventory||[]).some(function(id){ return ITEMS[id]&&ITEMS[id].slot==='shield'; }); },
  card:function(t,btn){ if(typeof ZCARD!=='undefined')ZCARD.show({who:'Master Oswin',icon:'⚔',text:t,cls:'zc-hint',ms:14000,btns:btn}); else if(typeof showNotif==='function')showNotif('Master Oswin: '+t,'#ffe9a8'); },
  // the young wolf: weak, slow, soft-biting; it falls on the third hit
  wolf:function(ws,x,y,hits){ var m=MX.spawn(ws,'bramble_wolf',x,y,{q:1,name:'Young bramble wolf',temp:true}); if(!m)return null; m.maxHp=m.hp=999; m._fwHits=0; m._fwNeed=hits; m._fwHp=999; m._noLoot=true;
    m.monAtk=Math.max(1,Math.round((m.monAtk||3)*0.35)); if(m.def){ m.def=Object.assign({},m.def,{atk:Math.max(1,Math.round((m.def.atk||3)*0.35)),spd:Math.round((m.def.spd||70)*0.6)}); }
    if(ws.worldMonsters&&ws.worldMonsters.indexOf(m)<0)ws.worldMonsters.push(m); return m; },
  // a hit landed: the bar drops a third (or a half) each time, whatever the blow — true if that was the last
  hit:function(m){ if(m.dead||!(m.hp<m._fwHp))return false; m._fwHits++; m._fwHp=m.hp=Math.max(1,Math.round(999*(1-m._fwHits/m._fwNeed))); return m._fwHits>=m._fwNeed; },
  kill:function(ws,m){ if(!m||m.dead)return; m.hp=0; try{ if(ws._worldMonsterDied)ws._worldMonsterDied(m); else m.dead=true; }catch(e){ m.dead=true; } },
  lambAt:function(ws,x,y){ if(ZFWIN.lamb&&ZFWIN.lamb.active)return ZFWIN.lamb; var T=null; try{ T=typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has('pr_sheep_lamb')&&ZScn.texture(ws,'pr_sheep_lamb',30); }catch(e){ T=null; }
    ZFWIN.lamb=T?ws.add.image(x,y,T.key).setOrigin(0.5,0.85):ws.add.ellipse(x,y,22,15,0xf4f0e6); ZFWIN.lamb.setDepth(5); return ZFWIN.lamb; },
  tick:function(){ try{ if(!ZFWIN.on)return; var ws=ZFWIN.ws(), ps=ws&&ws.playerState; if(!ps||!ws.player||!ws.sys.isActive())return;
    if(ps.firstWin===undefined){ if(ps.walk!=='done'||!ps.oswin||ZFWIN.hasShield(ps)){ if(ps.walk==='done'&&ZFWIN.hasShield(ps))ps.firstWin=0; return; }
      if(typeof ZDLG!=='undefined'&&ZDLG.open)return; ps.firstWin=1; ZFWIN.card('Hear that? The sheep pen, east of the Green — a wolf at the lambs! Go — I am right behind you.'); return; }
    if(ps.firstWin===4&&ps.lamb&&!(ZFWIN.lamb&&ZFWIN.lamb.active)){ ZFWIN.lambAt(ws,CENTER_X*TILE+70,CENTER_Y*TILE+60); return; }
    var P=ZFWIN.pen(ws), d=Math.hypot(ws.player.x-P.x,ws.player.y-P.y), W=ZFWIN.W;
    if(ps.firstWin===1&&d<TILE*9){ ps.firstWin=2; var L=ZFWIN.lambAt(ws,P.x+TILE*6,P.y+TILE*3); W=ZFWIN.W={m:ZFWIN.wolf(ws,L.x+70,L.y-10,3),hp0:ps.hp,bites:0,t0:Date.now()};
      ZFWIN.card('A young one — it is more scared than you are. Swing (Space) when it comes close — and roll away (Alt) when it crouches to leap. Three good hits will send it off.'); return; }
    if(ps.firstWin===2&&W&&W.m){ var m=W.m; if(m.dead){ ZFWIN.won(ws,false); return; } if(ZFWIN.hit(m)){ ZFWIN.kill(ws,m); ZFWIN.won(ws,false); return; }
      if(ps.hp<W.hp0){ W.bites++; if(W.bites===1)ZFWIN.card('Shake it off! Watch for the crouch — then roll.'); if(W.bites>=2){ ZFWIN.kill(ws,m); if(ws._floatText)ws._floatText(m.x,m.y-30,'Oswin drives it off!','#ffe9a8'); ZFWIN.won(ws,true); return; } }
      W.hp0=ps.hp; if(ps.hp<=Math.max(1,ps.maxHp*0.25))ps.hp=Math.round(ps.maxHp*0.25); return; }
    if(ps.firstWin===3&&W&&W.m){ var m2=W.m; if(m2.dead||ZFWIN.hit(m2)){ ZFWIN.kill(ws,m2); ZFWIN.done(ws); return; }
      if(ps.hp<=Math.max(1,ps.maxHp*0.25))ps.hp=Math.round(ps.maxHp*0.25); if(Date.now()-W.t0>45000){ ZFWIN.kill(ws,m2); ZFWIN.done(ws); } return; }
    if(ps.firstWin===1&&!ZFWIN._arrowT){ ZFWIN._arrowT=1; } }catch(e){ if(!ZFWIN._err){ ZFWIN._err=1; console.warn('first win',e); } } },
  won:function(ws,helped){ var ps=ws.playerState; ps.firstWin=3; ZFWIN.W=null;      /* the second wolf comes in 2.5 s */ ps.inventory=ps.inventory||[]; if(!ps.equip.shield)ps.equip.shield='wood_shield'; else ps.inventory.push('wood_shield'); try{ ws.calcPlayerStats(); }catch(e){}
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('quest'); }catch(e){} if(typeof showNotif==='function')showNotif('🛡️ Master Oswin gives you a Wood Shield (+3 DEF) — it is on your arm.','#ffe9a8');
    ZFWIN.card((helped?'There — off it goes. ':'Ha! Look at it run. ')+'You stood your ground. Now learn to hold it: here, your first shield. Another is creeping up — hold Shift and let it bite the wood, then answer.');
    setTimeout(function(){ try{ var L=ZFWIN.lamb||{x:ws.player.x+60,y:ws.player.y}; ZFWIN.W={m:ZFWIN.wolf(ws,L.x+90,L.y+30,2),hp0:ps.hp,t0:Date.now()}; if(typeof ZLES!=='undefined')ZLES.teach('shield'); }catch(e){} },2500); },
  done:function(ws){ var ps=ws.playerState; ps.firstWin=4; ps.lamb=1; ZFWIN.W=null; ZFWIN.card('Good. The wood takes the bite, you give it back. And look — the lamb is safe back in its pen, thanks to you.');
    try{ if(ws._save)ws._save(); }catch(e){} },
  // the lamb trots after you until you are back on the Green, then stays there
  frame:function(sc){ var L=ZFWIN.lamb; if(!L||!L.active||L.scene!==sc)return; var ps=sc.playerState; if(!ps)return; var tx, ty;
    if(ps.firstWin===4&&Math.hypot(L.x/TILE-CENTER_X,L.y/TILE-CENTER_Y)<7){ L._home=1; }
    if(L._home){ var t=Date.now()/1000; L.x+=Math.sin(t*0.7)*0.15; return; }
    if(ps.firstWin>=3){ tx=sc.player.x-26; ty=sc.player.y+14; var dx=tx-L.x, dy=ty-L.y, d=Math.hypot(dx,dy); if(d>30){ var s=Math.min(d,d>200?6:2.6); L.x+=dx/d*s; L.y+=dy/d*s; if(L.setFlipX)L.setFlipX(dx<0); } L.setDepth(sc.player.depth?sc.player.depth-1:5); } } };
(function(){ if(typeof ZWALK==='undefined')return;
  // the line under the little map and the gold arrow while the lamb needs you
  var ln0=ZWALK.line; ZWALK.line=function(ws){ var ps=ws&&ws.playerState; if(ZFWIN.on&&ps&&(ps.firstWin===1||ps.firstWin===2))return 'A wolf at the sheep pen — east of the Green. Help the lamb!'; if(ZFWIN.on&&ps&&ps.firstWin===3)return 'Hold Shift — let the shield take the bite, then strike back'; return ln0.apply(ZWALK,arguments); };
  var tg0=ZWALK.target; ZWALK.target=function(ws){ var ps=ws&&ws.playerState; if(ZFWIN.on&&ps&&ps.firstWin===1){ var P=ZFWIN.pen(ws); return {x:P.x+TILE*6,y:P.y+TILE*3,t:'The sheep pen'}; } return tg0.apply(ZWALK,arguments); };
  if(typeof ZJOUR!=='undefined'&&ZJOUR.target){ var jt0=ZJOUR.target; ZJOUR.target=function(ws){ ws=ws||ZFWIN.ws(); var ps=ws&&ws.playerState; if(ZFWIN.on&&ps&&ps.firstWin===1){ var P=ZFWIN.pen(ws); return {x:P.x+TILE*6,y:P.y+TILE*3,t:'Help the lamb at the sheep pen'}; } return jt0.apply(ZJOUR,arguments); }; }
  if(typeof _heroStatusTick==='function'){ var st0=_heroStatusTick; _heroStatusTick=function(sc,dt){ st0(sc,dt); try{ ZFWIN.frame(sc); }catch(e){} }; }
  if(typeof setInterval!=='undefined')setInterval(ZFWIN.tick,400);
})();
