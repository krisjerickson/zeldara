// ═══════════════════════════════════════════════════════════════════════
// ║ 10p-roll.js — the Roll, a basic move of its own (round 45).
// ║ Kris (Oct 10): "we want to add in a roll basic skill, used by pressing "function" or "fn" button … This had been a "skill", but we want it to be
// ║ its own separate thing instead of a skill. Undo wiring this up as a skill and getting a skill from the island castles. Instead, there should be a
// ║ very early quest to be able to get the roll ability. Have an NPC outside of the first mage tower that helps teach you this skill, and come up with
// ║ some quest narrative for this." The Fn key never reaches a web page, so (answered) the roll is on Alt.
// ║   • ZROLL.go(scene): a quick dodge-roll the way you are moving (or facing): 3 tiles in a quarter second, untouchable while rolling, 1.85 s (round 46) to
// ║     catch your breath. Works in the overworld, on the islands and in every tower and dungeon.
// ║   • The quest — "The Tumbler's Lesson": Tumbler Pia, a travelling acrobat, is camped outside the Rime Spire (the first mage tower). The Rime
// ║     Witch's frost-imps blew her juggling pins all over the meadow; bring back the three pins and she teaches you to roll ("on the ice, the ones
// ║     who stand still are the ones who fall"). It shows in the quest list from the start of the game.
// ║   • Old saves that bought or were taught the Roll skill learn the roll at once; the skill is gone from shops and from the Sunflower Château,
// ║     whose teacher now teaches Petal Step (03-data / 07t / 10-scene-world).
// ═══════════════════════════════════════════════════════════════════════
var ZROLL={ CD:1.85,      // round 46 (Kris: "we need to have a longer cool-down for it" → card: 0.75 s added to the 1.1 s)
  DIST:3, T:0.26, IFR:0.55, PINS:3, NPC:'tc_roll', NAME:'Tumbler Pia',
  ps:function(){ var ws=game&&game.scene&&game.scene.getScene('World'); return ws&&ws.playerState; },
  can:function(ps){ return !!(ps&&ps.canRoll); },
  // the roll itself
  go:function(sc){ var ps=ZROLL.ps(); if(!sc||!ps)return; var key=sc.sys.settings.key;
    if(!ZROLL.can(ps)){ if(!ZROLL._toldT||Date.now()-ZROLL._toldT>4000){ ZROLL._toldT=Date.now(); showNotif('🤸 You don\'t know how to roll yet — '+ZROLL.NAME+', camped outside the Rime Spire, could teach you.','#ffd8a0'); } return; }
    if((ZROLL._cdUntil||0)>Date.now())return; if(ps.mount&&_isOverworld(sc))return;      // no rolling in the saddle
    var dun=key==='Dungeon', W=_isOverworld(sc), k=sc.keys||{}, dx=0, dy=0;
    if(k.A&&k.A.isDown||k.LEFT&&k.LEFT.isDown)dx-=1; if(k.D&&k.D.isDown||k.RIGHT&&k.RIGHT.isDown)dx+=1; if(k.W&&k.W.isDown||k.UP&&k.UP.isDown)dy-=1; if(k.S&&k.S.isDown||k.DOWN&&k.DOWN.isDown)dy+=1;
    var dir=dun?sc.pdir:(sc.player&&sc.player.dir); if(!dx&&!dy){ dx=dir==='left'?-1:dir==='right'?1:0; dy=dir==='up'?-1:dir==='down'||!dir?1:0; }
    var l=Math.hypot(dx,dy)||1; dx/=l; dy/=l;
    var get=function(){ return dun?[sc.px,sc.py]:[sc.player.x,sc.player.y]; }, set=function(x,y){ if(dun){ sc.px=x; sc.py=y; sc.pCont.setPosition(x,y); } else { sc.player.x=x; sc.player.y=y; sc.player.cont.setPosition(x,y); } },
      ok=function(x,y){ return dun?sc._canGoD(x,y):sc._canGo(x,y,null); };
    if(W)sc.worldIFrames=Math.max(sc.worldIFrames||0,ZROLL.IFR); else sc.playerIFrames=Math.max(sc.playerIFrames||0,ZROLL.IFR);
    ZROLL._cdUntil=Date.now()+ZROLL.CD*1000; ZROLL._ui();
    var st=dun?sc.pWalkSt:sc.player; if(st&&typeof ZSPR!=='undefined'){ try{ st.castAnim=ZSPR.HERO.animFor(ps,'skill','sp_roll'); st.cast=st.castT=ZROLL.T+0.08; }catch(e){} }
    var p0=get(), dist=TILE*ZROLL.DIST, steps=12, i=0;
    sc.time.addEvent({delay:ZROLL.T*1000/steps,repeat:steps-1,callback:function(){ i++; var q=get(), e=dist/steps, nx=q[0]+dx*e, ny=q[1]+dy*e;
      if(ok(nx,q[1]))q[0]=nx; if(ok(q[0],ny))q[1]=ny; set(q[0],q[1]);
      if(i%2===0){ var tr=sc.add.circle(q[0],q[1]+8,7,0xc8e8ff,0.45).setDepth(dun?9.9:WR_DEPTH(q[1])-0.001); sc.tweens.add({targets:tr,alpha:0,scale:0.4,duration:260,onComplete:function(){ tr.destroy(); }}); } }});
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('whoosh'); }catch(e){} },
  // the HUD: a small roll badge with its cooldown (Alt)
  _ui:function(){ var el=document.getElementById('roll-badge'); if(!el)return; var ps=ZROLL.ps(); el.style.display=ZROLL.can(ps)?'':'none'; var left=Math.max(0,((ZROLL._cdUntil||0)-Date.now())/1000);
    var cd=el.querySelector('.cd'); if(cd){ cd.style.height=(left/ZROLL.CD*100)+'%'; } if(left>0)setTimeout(ZROLL._ui,60); },
  // ── the quest ──
  site:function(ws){ return (ws.wd&&ws.wd.sites||[]).find(function(s){ return s.mage==='rime_spire'; })||null; },
  spot:function(ws){ var s=ZROLL.site(ws); if(!s)return null; var x=(s.tx+1.5)*TILE, y=(s.ty+3)*TILE+TILE*2.5; for(var r=0;r<6;r++)for(var a=0;a<8;a++){ var nx=x+Math.cos(a*0.785)*r*TILE+TILE*3, ny=y+Math.sin(a*0.785)*r*TILE; if(ws._canGo(nx,ny,null))return {x:nx,y:ny}; } return {x:x+TILE*3,y:y}; },
  build:function(ws){ var ps=ws.playerState; if(!ps||ZROLL._built===ws.wd)return; ZROLL._built=ws.wd; ZROLL.clear(ws);
    if(!ps.rollQ)ps.rollQ=ps.canRoll?2:0;
    if(ps.equip&&ps.equip.special==='sp_roll'){ ps.equip.special=null; ps.canRoll=true; ps.rollQ=2; }      // old saves: the Roll skill becomes the roll
    if((ps.inventory||[]).indexOf('sp_roll')>=0){ ps.inventory=ps.inventory.filter(function(x){ return x!=='sp_roll'; }); ps.canRoll=true; ps.rollQ=2; }
    var P=ZROLL.spot(ws); if(!P)return; var R=typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[ZROLL.NPC], im=null;
    if(R&&typeof CHX!=='undefined'){ try{ im=CHX.sprite(ws,ZROLL.NPC,P.x,P.y,1.45,{depth:WR_DEPTH(P.y),face:false}); }catch(e){ im=null; } }
    if(!im)im=ws.add.text(P.x,P.y,'🤸',{fontSize:'26px'}).setOrigin(0.5,1).setDepth(WR_DEPTH(P.y));
    ZROLL.npc={x:P.x,y:P.y,im:im};
    // her three pins, blown across the meadow (only while the quest is on)
    var R2=rngOf(4242), pins=[]; if(ps.rollQ<2){ for(var k=0;k<ZROLL.PINS;k++){ var got=(ps.rollPins||[]).indexOf(k)>=0; if(got)continue; for(var t=0;t<60;t++){ var a=R2.f()*Math.PI*2, d=TILE*(7+R2.f()*9), x=P.x+Math.cos(a)*d, y=P.y+Math.sin(a)*d; if(ws._canGo(x,y,null)){ var pin=ws.add.text(x,y,'🎳',{fontSize:'16px'}).setOrigin(0.5,1).setDepth(WR_DEPTH(y)).setVisible(ps.rollQ===1); ws.tweens.add({targets:pin,y:y-4,duration:800,yoyo:true,repeat:-1,ease:'Sine.inOut'}); pins.push({k:k,x:x,y:y,im:pin}); break; } } } }
    ZROLL.pins=pins; },
  clear:function(ws){ if(ZROLL.npc&&ZROLL.npc.im&&ZROLL.npc.im.scene)ZROLL.npc.im.destroy(); (ZROLL.pins||[]).forEach(function(p){ if(p.im&&p.im.scene)p.im.destroy(); }); ZROLL.npc=null; ZROLL.pins=[]; if(ZROLL._lbl){ ZROLL._lbl.destroy(); ZROLL._lbl=null; } },
  LINES:{
    meet:'"Oh! A traveller who isn\'t a frost-imp, thank the stars. I\'m Pia — tumbler, juggler, and, as of this morning, very cross. The Rime Witch\'s imps blew all three of my juggling pins across the meadow. Bring them back and I\'ll teach you the one trick that keeps you alive near that tower: how to roll."',
    wait:'"Three pins — red stripes, you can\'t miss them. They can\'t have rolled far… well. Further than you\'d think."',
    done:'"My pins! Right — tuck your chin, drop your shoulder, and go. On the ice, the ones who stand still are the ones who fall. Press Alt to roll, the way you\'re running — nothing can touch you while you tumble."',
    after:'"Roll through it, not away from it! The witch\'s lances can\'t hit what isn\'t there."'},
  talk:function(ws){ var ps=ws.playerState;
    if(ps.rollQ===0){ ps.rollQ=1; ps.rollPins=[]; (ZROLL.pins||[]).forEach(function(p){ p.im.setVisible(true); }); ZROLL.say(ZROLL.LINES.meet); showNotif('📜 New quest: The Tumbler\'s Lesson — find Pia\'s 3 juggling pins','#ffe9a8'); }
    else if(ps.rollQ===1){ if((ps.rollPins||[]).length>=ZROLL.PINS){ ps.rollQ=2; ps.canRoll=true; ZROLL.say(ZROLL.LINES.done); showNotif('🤸 You learned to ROLL — press Alt','#88ffcc'); ZROLL._ui(); if(ws._save)ws._save(); }
      else ZROLL.say(ZROLL.LINES.wait+' ('+(ps.rollPins||[]).length+' / '+ZROLL.PINS+')'); }
    else ZROLL.say(ZROLL.LINES.after);
    if(ws._emitUI)ws._emitUI(); },
  say:function(t){ showNotif('🤸 '+ZROLL.NAME+': '+t,'#ffe0c0'); },
  // every frame in the World: the talk prompt and picking up pins
  tick:function(ws){ if(!ws.player||!ws.wd)return; if(ZROLL._built!==ws.wd)ZROLL.build(ws); var ps=ws.playerState, N=ZROLL.npc; if(!N)return; var px=ws.player.x, py=ws.player.y, near=Math.hypot(px-N.x,py-N.y)<TILE*1.8;
    if(near&&!ZROLL._lbl){ ZROLL._lbl=domText(ws,N.x,N.y-62,'[Tab] Talk to '+ZROLL.NAME,{fontSize:'10px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); }
    else if(!near&&ZROLL._lbl){ ZROLL._lbl.destroy(); ZROLL._lbl=null; }
    if(near&&ws.keys&&ws.keys.TAB&&Phaser.Input.Keyboard.JustDown(ws.keys.TAB))ZROLL.talk(ws);
    if(ps.rollQ===1)(ZROLL.pins||[]).forEach(function(p){ if(p.got||Math.hypot(px-p.x,py-p.y)>TILE)return; p.got=true; p.im.destroy(); ps.rollPins=(ps.rollPins||[]).concat([p.k]); showNotif('🎳 A juggling pin! ('+ps.rollPins.length+' / '+ZROLL.PINS+')'+(ps.rollPins.length>=ZROLL.PINS?' — back to Pia!':''),'#ffe9a8'); }); },
  // the quest list entry
  questHTML:function(ps){ if(!ps||ps.rollQ===2)return ''; var n=(ps.rollPins||[]).length;
    return '<div class="qgrp" style="border:1px solid rgba(255,200,120,.4);background:rgba(60,40,10,.25);margin-bottom:12px"><div class="qgrp-hdr" style="color:#ffd8a0">🤸 The Tumbler\'s Lesson</div><div class="qitem qact"><div class="qico">🎳</div><div class="qinf"><div class="qtit">'+(ps.rollQ===1?'Find Pia\'s juggling pins ('+n+' / '+ZROLL.PINS+')':'Meet the tumbler outside the Rime Spire')+'</div><div class="qdesc">'+(ps.rollQ===1?(n>=ZROLL.PINS?'Bring the pins back to Pia.':'The frost-imps scattered them across the meadow round the Rime Spire.'):'A travelling acrobat is camped by the first mage tower in the Grasslands. She knows a trick for staying alive near the Rime Witch.')+' Reward: the <b>Roll</b> (Alt).</div></div><span class="qbadge">EARLY</span></div></div>'; }
};
