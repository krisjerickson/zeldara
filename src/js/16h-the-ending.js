// ═══════════════════════════════════════════════════════════════════════
// ║ 16h-the-ending.js — round 63: THE SPIRITS GO HOME (doc 28 §7, decided Oct 15).
// ║ Kris: "at the rune circle in the heart of liberated Asgard … use the lodestar to cast godsbane into the sky and remake the bifrost into heaven
// ║ to liberate the spirits" — and keep the celebrating group scenes for this moment. Once Grímnir has fallen, stand in the world-tree circle at
// ║ Asgard's heart with the Lodestar: [Tab] raises it. A column of white-gold light climbs into the sky, the Bifröst bends up out of the circle into
// ║ heaven, and the spirits — the forty, celebrating now, the group scenes, the fairy kings and your familiars — rise along it and are gone home.
// ║ Story panels between (Lab options first — Kris's card; wave 65): Godsbane into the sky, the Bifröst remade into heaven, the spirits going
// ║ home, the village at dawn. Until his picks are painted the panels are skipped and the scene plays in the engine alone.
// ║ Credits are PAUSED (Kris, Oct 17: "we're going to have another ending for the game after the spirits are released, so let's pause credits
// ║ building for now, but remember we will come back to this") — after the ending you play on (ps.spiritsHome).
// ═══════════════════════════════════════════════════════════════════════
var ZEND={ on:true, R:TILE*2.4,
  PANELS:{cast:['pn_end_cast_a','pn_end_cast_b'],bifrost:['pn_end_bif_a','pn_end_bif_b'],home:['pn_end_home_a','pn_end_home_b'],dawn:['pn_end_dawn_a','pn_end_dawn_b']},
  // Kris's pick in the Lab ('asgard' tab, the ending panels) — else the first painted one — else none
  panel:function(k){ var R=(typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}, L=ZEND.PANELS[k]||[], P=ZEND.PICK&&ZEND.PICK[k]; if(P&&R[P])return P; return L.find(function(id){ return R[id]; })||null; },
  PICK:{},
  ready:function(ps){ return !!(ps&&ps.grimnirDown&&!ps.spiritsHome); },
  check:function(ws){ var ps=ws.playerState; if(!ZEND.on||!ZEND.ready(ps)||!ws.player||ws._endBusy)return false; var H=ZASG.heart(ws), d=Math.hypot(ws.player.x-H.x,ws.player.y-H.y);
    if(d>ZEND.R){ if(ws._interactPrompt&&ws._interactPrompt._zsp==='end'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
    var has=ZASG.hasStaff(ps), t=has?'[Tab] Raise the Lodestar — cast Godsbane into the sky':'The rune circle at Asgard\'s heart (bring the Lodestar)';
    if(!ws._interactPrompt||ws._interactPrompt._zsp!=='end'||ws._interactPrompt._zt!==t){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,H.x,H.y-70,t,{fontSize:'11px',color:'#fff2b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='end'; ws._interactPrompt._zt=t; }
    if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB)){ if(has)ZEND.play(ws); else showNotif('🌟 The circle waits for the Lodestar.','#fff2b0'); } return true; },
  // ── the scene ──
  play:function(ws){ var ps=ws.playerState, H=ZASG.heart(ws), cam=ws.cameras.main, L=[]; ws._endBusy=true; if(ws._interactPrompt){ ws._interactPrompt.destroy(); ws._interactPrompt=null; }
    if(typeof ZCINE!=='undefined')ZCINE.bars(true); cam.stopFollow(); cam.pan(H.x,H.y-80,1400,'Sine.easeInOut'); ws.player.x=H.x; ws.player.y=H.y+10; ZEND._t0=Date.now();
    var at=function(ms,f){ ws.time.delayedCall(ms,function(){ try{ f(); }catch(e){ console.warn('ending',e); } }); };
    var panel=function(k,cap,next){ if(typeof ZCINE!=='undefined'&&ZCINE.panel)ZCINE.panel(ZEND.panel(k),cap,4600,next); else next(); };
    showNotif('🌟 You raise the Lodestar over the world-tree circle…','#fff2b0');
    at(1600,function(){ panel('cast','The Lodestar wakes — Godsbane, cast into the sky.',function(){
      // the beam: a column of white-gold light into the sky
      var beam=ws.add.graphics().setDepth(9500).setBlendMode(Phaser.BlendModes.ADD); L.push(beam); var h=0;
      ws.tweens.addCounter({from:0,to:1,duration:1800,ease:'Sine.in',onUpdate:function(tw){ h=tw.getValue(); beam.clear(); [[60,0.16],[30,0.3],[10,0.9]].forEach(function(q){ beam.fillStyle(0xfff4c8,q[1]).fillRect(H.x-q[0]/2,H.y-20-1400*h,q[0],1400*h); }); }});
      try{ cam.flash(800,255,250,230); cam.shake(900,0.008); }catch(e){} if(typeof _heroFloat==='function')_heroFloat(ws,H.x,H.y-60,'✦ GODSBANE','#fff2b0');
      at(2200,function(){ // the Bifröst remade: rainbow arcs bend up out of the circle into heaven
        var rb=ws.add.graphics().setDepth(9400).setBlendMode(Phaser.BlendModes.ADD); L.push(rb); var cols=[0xff6060,0xffa040,0xffe060,0x60e080,0x60a0ff,0xb070ff];
        ws.tweens.addCounter({from:0,to:1,duration:2600,onUpdate:function(tw){ var v=tw.getValue(); rb.clear(); cols.forEach(function(c,i){ rb.lineStyle(10,c,0.45); rb.beginPath(); for(var s=0;s<=40*v;s++){ var u=s/40, x=H.x+Math.sin(u*Math.PI*0.9)*(220-i*12), y=H.y-20-u*900; if(s)rb.lineTo(x,y); else rb.moveTo(x,y); } rb.strokePath(); }); }});
        showNotif('🌈 The Bifröst bends up out of the circle — into heaven!','#fff2b0');
        at(2800,function(){ panel('bifrost','The Bifröst is remade — a road into heaven.',function(){ ZEND.rise(ws,H,L); at(7200,function(){ panel('home','The spirits of Runeheim go home.',function(){ panel('dawn','Dawn over the village.',function(){ ZEND.finish(ws,L); }); }); }); }); }); }); }); }); },
  // the spirits rise: the forty (celebrating now), the group scenes, the fairy kings, your familiars
  rise:function(ws,H,L){ var ps=ws.playerState, freed=(ps.spiritsFreed||[]).slice(), shr=typeof ZSPIRIT!=='undefined'&&ZSPIRIT.shrines?ZSPIRIT.shrines(ws):[], n=0, Z=typeof _scn==='function'?_scn():null;
    var up=function(o,delay,dx){ if(!o)return; L.push(o); o.setAlpha&&o.setAlpha(0); ws.tweens.add({targets:o,alpha:1,duration:500,delay:delay}); ws.tweens.add({targets:o,y:o.y-900,x:o.x+(dx||0),delay:delay+400,duration:5200,ease:'Sine.in'}); ws.tweens.add({targets:o,alpha:0,delay:delay+4600,duration:1000}); };
    // the forty (each as itself, the freed form — they celebrate now)
    for(var i=0;i<40;i++){ var s=freed[i]&&shr.find(function(q){ return q.id===freed[i]; }), id=s&&ZSPIRIT.uniqueId?ZSPIRIT.uniqueId(s,'free'):null;
      if(!id&&typeof ZSPIRIT40!=='undefined'&&ZSPIRIT40[i])id='sp_u_'+ZSPIRIT40[i][0]+'_free'; var a=i/40*Math.PI*2, r=80+(i%3)*30, x=H.x+Math.cos(a)*r, y=H.y+Math.sin(a)*r*0.5;
      var o=id&&typeof ZSPM!=='undefined'?ZSPM.make(ws,id,x,y,'free',{depth:9300}):null; if(!o)o=ws.add.circle(x,y,6,0x9fe8ff,0.85).setBlendMode(Phaser.BlendModes.ADD).setDepth(9300); up(o,i*90,(Math.random()-0.5)*80); n++; }
    // the celebrating group scenes kept for this
    ['sp_grp_ring','sp_grp_choir','sp_grp_procession','sp_grp_spiral','sp_grp_family','sp_grp_fire'].forEach(function(gid,i){ if(!(Z&&Z.has&&Z.has(gid)))return; var a=i/6*Math.PI*2+0.3, x=H.x+Math.cos(a)*260, y=H.y+Math.sin(a)*150; up(Z.image(ws,gid,x,y,Z.K*0.9,9290),1200+i*260,(H.x-x)*0.6); });
    // the four fairy kings and your familiars follow
    if(typeof ZAtlas!=='undefined'&&typeof FAIRY_PICK!=='undefined')[1,2,3,4].forEach(function(q){ var ch='fairy_'+FAIRY_PICK[q]; if(!ZAtlas.has||!ZAtlas.has(ch))return; try{ var im=ZAtlas.image?ZAtlas.image(ws,ch,H.x-150+q*60,H.y+120):null; if(im){ im.setDepth(9310); up(im,2600+q*200,0); } }catch(e){} });
    (ws._familiars||ws.familiars||[]).forEach(function(f,i){ var v=f&&(f.cont||f.vis||f.sprite); if(v&&v.scene)ws.tweens.add({targets:v,alpha:0.4,duration:1200,delay:3200+i*200,yoyo:true}); });
    showNotif('✨ The spirits of Runeheim rise along the Bifröst — singing, free at last.','#bfefff'); ZEND.count=n; },
  finish:function(ws,L){ var ps=ws.playerState; ps.spiritsHome=1; ps.endingAt=Date.now(); L.forEach(function(o){ if(o&&o.scene)ws.tweens.add({targets:o,alpha:0,duration:800,onComplete:function(){ o.destroy(); }}); });
    if(typeof ZCINE!=='undefined')ZCINE.bars(false); ws.cameras.main.startFollow(ws.player.cont,true,.1,.1); ws._endBusy=false; if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('the spirits go home'); }catch(e){}
    showNotif('🌅 The spirits are home. Runeheim is quiet, and the light stays. (Your journey goes on.)','#fff2b0'); if(ws._emitUI)ws._emitUI(); }
};
setTimeout(function(){ if(typeof WorldScene==='undefined')return; var c0=WorldScene.prototype._checkInteraction; WorldScene.prototype._checkInteraction=function(){ if(ZEND.on&&ZEND.check(this))return; return c0.apply(this,arguments); }; },0);
