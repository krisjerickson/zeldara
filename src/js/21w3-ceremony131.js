// ═══════════════════════════════════════════════════════════════════════
// ║ 21w3-ceremony131.js — round 131: THE CEREMONIES KRIS PICKED (Lab › First spell & first bow):
// ║  · the mana arc — 'sanctum': when the hero first has a spell, the tome's runes lift off, circle the hero and stream up to the corner;
// ║    the arc BLOOMS out from its centre with a flash ('bloom'), and words name it — the beaten master's fading voice in a tower, the tome's
// ║    own whisper anywhere else. The arc's colour follows how full it is ('fill': teal when full, violet as it empties, drifting).
// ║  · the gold ring — 'flash': the first time it lands on a foe it appears with a golden burst. Then 'teachers': Sergeant Brask (a bow or
// ║    crossbow) or Morwen (a spell) sends for you. At the armoury's yard three straw butts — at Morwen's door three practice wisps — and a
// ║    drill of three steps, ticked as you do them: tap · hold for power · a direction while holding to switch. A crossbow: the butts stand in
// ║    a row and Brask shows the bolt going through. The second teacher keeps it short ("you know this — here is what is different").
// ║    Reward: ten arrows (six darts), or a mana draught. ps.cer = {bow:0 · 1 called · 2 taught, spell:…}.
// ═══════════════════════════════════════════════════════════════════════
if(typeof ZMANA!=='undefined')ZMANA.STYLE='fill';
var ZTEACH={ on:true, L:null, targets:[], R:5*32,
  T:{bow:{who:'Sergeant Brask',id:'npc_armory',b:'armory',ic:'🏹',
      call:'Sergeant Brask wants to see you in the yard by the Armoury — he has straw butts set up.',
      intro:['A bow in your hand at last. Good. Three butts — see them? Watch the gold ring: it sits on whatever you will hit.','Tap Ctrl and loose. Then hold it — feel the string gather, once, twice. Then, still holding, look another way and the ring follows. Go on.'],
      xb:'A crossbow. Heavy. One bolt at a time — but it goes through all three if they stand in a row, and it cracks plate. Same drill: tap, hold, switch.',
      short:'You know the ring from your spells. Same three things with a bow: tap, hold, switch. Show me.',
      done:'Ha! The Varangians would have taken you. Ten arrows, on the house.'},
    spell:{who:'Morwen',id:'npc_apothecary',b:'apothecary',ic:'✨',
      call:'Morwen sends word: come to her apothecary — she wants to see you cast.',
      intro:['So the tower gave you a spell. Let me see your hands … steady enough. Three wisps — see how the gold ring finds one?','Tap X and it flies. Hold it and it gathers — the ring glows brighter, and it costs more mana. Hold, and look another way, and the ring moves with your eyes.'],
      short:'Brask taught you the ring with a bow. A spell is the same: tap, hold — it drinks more mana — and switch. Show me.',
      done:'Good. Here — a mana draught. Shift and P when the arc runs low.'}},
  ps:function(){ try{ var ws=game.scene.getScene('World'); return ws&&ws.playerState; }catch(e){ return null; } },
  cer:function(ps){ return ps.cer||(ps.cer={bow:0,spell:0}); },
  kind:function(ps){ var A=typeof ZAIM129!=='undefined'?ZAIM129.armed():''; return A.indexOf('b')>=0?'bow':A.indexOf('s')>=0?'spell':null; },
  xb:function(ps){ var b=ps.equip&&ps.equip.rHand&&ITEMS[ps.equip.rHand]; return !!(b&&b.cls==='xbow'); },
  bld:function(ws,type){ return (ws.wd&&ws.wd.buildings||[]).find(function(b){ return b.type===type; }); },
  spot:function(ws,k){ var B=ZTEACH.bld(ws,ZTEACH.T[k].b); if(!B)return null; return {x:B.worldX+B.w*32/2,y:B.worldY+B.h*32+40}; },
  // the drill
  start:function(ws,k){ var ps=ws.playerState, T=ZTEACH.T[k], C=ZTEACH.cer(ps), other=k==='bow'?'spell':'bow', sp=ZTEACH.spot(ws,k); if(!sp)return;
    ZTEACH.L={k:k,ws:ws,steps:{tap:0,hold:0,sw:0},xb:k==='bow'&&ZTEACH.xb(ps)}; C[k]=1.5;
    var lines=C[other]===2?[T.short]:T.intro.slice(); if(ZTEACH.L.xb)lines.push(T.xb);
    var say=function(i){ if(i>=lines.length){ ZTEACH.spawn(ws,k,sp); ZTEACH.coach(); return; } if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say(T.who,lines[i],{id:T.id,done:function(){ say(i+1); }}); else say(i+1); };
    say(0); },
  spawn:function(ws,k,sp){ ZTEACH.clear(); var row=ZTEACH.L&&ZTEACH.L.xb, P=row?[[0,-110],[0,-150],[0,-190]]:[[-120,-120],[0,-170],[120,-120]];
    P.forEach(function(o,i){ var t={x:sp.x+o[0],y:sp.y+o[1],hp:9999,maxHp:9999,_hp:9999,def:{r:12,name:k==='bow'?'Straw butt':'Practice wisp'},isTarget:true,dead:false,kind:k,i:i}; t.g=ws.add.graphics().setDepth(6); ZTEACH.targets.push(t); }); },
  clear:function(){ ZTEACH.targets.forEach(function(t){ try{ t.g.destroy(); }catch(e){} t.dead=true; }); ZTEACH.targets=[]; },
  coach:function(){ var L=ZTEACH.L; if(!L||typeof ZCARD==='undefined')return; var S=L.steps, T=ZTEACH.T[L.k], m=function(v){ return v?'✓':'○'; };
    ZCARD.show({who:T.who+'\'s drill',icon:T.ic,text:m(S.tap)+' Tap — '+(L.k==='bow'?'Ctrl':'X')+' at the ringed '+(L.k==='bow'?'butt':'wisp')+'\n'+m(S.hold)+' Hold for full power (×2)\n'+m(S.sw)+' Hold, and press a direction to switch',ms:600000,cls:'zc-les zc-drill',btns:[{t:'Later',f:function(){ ZTEACH.stop(false); }}]}); },
  mark:function(step){ var L=ZTEACH.L; if(!L||L.steps[step])return; L.steps[step]=1; if(typeof ZSFX!=='undefined')try{ ZSFX.play('quest'); }catch(e){}
    if(L.steps.tap&&L.steps.hold&&L.steps.sw)ZTEACH.stop(true); else ZTEACH.coach(); },
  stop:function(done){ var L=ZTEACH.L; if(!L)return; var ws=L.ws, ps=ws.playerState, C=ZTEACH.cer(ps), T=ZTEACH.T[L.k]; ZTEACH.L=null; ZTEACH.clear(); if(typeof ZCARD!=='undefined')ZCARD.close();
    if(!done){ C[L.k]=1; return; } C[L.k]=2;
    if(L.k==='bow'){ ps.ammo=ps.ammo||{}; var a=L.xb?'dart_normal':'arrow_normal'; ps.ammo[a]=(ps.ammo[a]||0)+(L.xb?6:10); } else { ps.inventory=ps.inventory||[]; ps.inventory.push('pot_mana'); }
    if(typeof ZDLG!=='undefined'&&ZDLG.on)ZDLG.say(T.who,L.xb?T.done.replace('Ten arrows','Six darts'):T.done,{id:T.id}); try{ if(ws._save)ws._save(); }catch(e){} },
  // each second: send for you, and start when you come near
  tick:function(){ if(!ZTEACH.on)return; var ps=ZTEACH.ps(); if(!ps)return; var ws=game.scene.getScene('World'); if(!ws||!ws.player||!ws.sys.isActive())return; var C=ZTEACH.cer(ps);
    if(ZTEACH.L){ var sp=ZTEACH.spot(ws,ZTEACH.L.k); if(sp&&Math.hypot(ws.player.x-sp.x,ws.player.y-sp.y)>ZTEACH.R*3)ZTEACH.stop(false); return; }
    if(typeof ZDLG!=='undefined'&&ZDLG.open)return;
    ['bow','spell'].forEach(function(k){ if(C[k]!==1||ZTEACH.L)return; var sp=ZTEACH.spot(ws,k); if(!sp)return; if(Math.hypot(ws.player.x-sp.x,ws.player.y-sp.y)<ZTEACH.R&&ZTEACH.kind(ps)===k)ZTEACH.start(ws,k); }); },
  // every frame: draw the butts / wisps, and an arrow or spell that reaches one stops there
  frame:function(sc){ if(!ZTEACH.targets.length||!ZTEACH.L||sc!==ZTEACH.L.ws)return; var t0=performance.now()/1000;
    ZTEACH.targets.forEach(function(t){ var g=t.g; g.clear();
      if(t.kind==='bow'){ g.fillStyle(0x6a4a2a,1); g.fillRect(t.x-2,t.y+4,4,18); g.fillStyle(0xe8d49a,1); g.fillCircle(t.x,t.y,13); g.lineStyle(3,0xc04040,1); g.strokeCircle(t.x,t.y,9); g.fillStyle(0xc04040,1); g.fillCircle(t.x,t.y,3); }
      else { var p=0.6+0.4*Math.sin(t0*3+t.i); g.fillStyle(0x9ff8f0,0.25*p); g.fillCircle(t.x,t.y,16); g.fillStyle(0xd8fffa,0.9); g.fillCircle(t.x,t.y+Math.sin(t0*2+t.i)*3,6); } });
    (sc._playerProj||[]).forEach(function(pr){ if(!pr||pr.life<=0)return; ZTEACH.targets.forEach(function(t){ if((pr._tk||[]).indexOf(t)>=0)return; if(Math.hypot(pr.x-t.x,pr.y-t.y)<16){ (pr._tk=pr._tk||[]).push(t); if(!(pr.pierceN>0))pr.life=0;
      if(sc._floatText)sc._floatText(t.x,t.y-22,t.kind==='bow'?'thunk!':'✦','#ffe9a8'); } }); }); } };
(function(){ if(typeof ZAIM129==='undefined')return;
  // the butts and wisps are targets for the ring while the drill runs
  var pk0=ZAIM129.pick; ZAIM129.pick=function(sc,ang,half,rng,rule){ if(!ZTEACH.L||!ZTEACH.targets.length)return pk0.apply(ZAIM129,arguments); var c=_heroCtx(sc), best=null, bs=1e9;
    ZTEACH.targets.forEach(function(t){ var dx=t.x-c.x, dy=t.y-c.y, d=Math.hypot(dx,dy); if(d>rng)return; var da=Math.atan2(dy,dx)-ang; while(da>Math.PI)da-=Math.PI*2; while(da<-Math.PI)da+=Math.PI*2; if(Math.abs(da)>half&&d>36)return; var s=d+Math.abs(da)*60; if(s<bs){ bs=s; best=t; } });
    return best||pk0.apply(ZAIM129,arguments); };
  // the drill's steps, as they happen
  var rt0=ZAIM129.retarget; ZAIM129.retarget=function(sc,cur){ var m0=cur.mon; rt0.apply(ZAIM129,arguments); if(ZTEACH.L&&cur.mon&&cur.mon.isTarget&&cur.mon!==m0)cur._sw=1; };
  var sh0=ZDRAW.shoot; ZDRAW.shoot=function(sc,mult,mon){ var C=ZDRAW._lastCur; var r=sh0.apply(ZDRAW,arguments); if(ZTEACH.L&&ZTEACH.L.k==='bow'&&mon&&mon.isTarget){ if(mult>=2)ZTEACH.mark('hold'); else ZTEACH.mark('tap'); if(C&&C._sw)ZTEACH.mark('sw'); } return r; };
  var rl0=ZDRAW.release; ZDRAW.release=function(){ ZDRAW._lastCur=ZDRAW.cur; return rl0.apply(ZDRAW,arguments); };
  var fi0=ZAIM.fire; ZAIM.fire=function(sc){ var C=ZAIM.cur; if(ZTEACH.L&&ZTEACH.L.k==='spell'&&C&&C.mon&&C.mon.isTarget){ if(ZAIM129.spellMult>=2)ZTEACH.mark('hold'); else if(ZAIM129.spellMult<=1)ZTEACH.mark('tap'); if(C._sw)ZTEACH.mark('sw'); } return fi0.apply(ZAIM,arguments); };
  if(typeof _heroStatusTick==='function'){ var st0=_heroStatusTick; _heroStatusTick=function(sc,dt){ st0(sc,dt); try{ ZTEACH.frame(sc); }catch(e){} }; }
})();
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZTEACH.tick(); }catch(e){} },1000);
(function(){ if(typeof ZCER==='undefined'||typeof document==='undefined')return;
  // ── the mana arc: runes from the tome to the corner, then the bloom ──
  ZCER.mana=function(ps){ if(ps.manaShown)return; ps.manaShown=true; var M=document.querySelector('#zhud .zh-mana'); if(!M)return; M.classList.add('zm-wait');
    var sc=null; try{ sc=typeof _activePlayScene==='function'?_activePlayScene(false):game.scene.getScene('World'); }catch(e){}
    var cv=document.querySelector('#phaser-root canvas')||document.querySelector('canvas'), cr=cv?cv.getBoundingClientRect():{left:0,top:0,width:innerWidth,height:innerHeight}, hx=cr.left+cr.width/2, hy=cr.top+cr.height/2;
    try{ var c=_heroCtx(sc), cam=sc.cameras.main, zx=cr.width/cam.width; hx=cr.left+(c.x-cam.worldView.x)*cam.zoom*zx; hy=cr.top+(c.y-cam.worldView.y)*cam.zoom*zx; }catch(e){}
    var inTower=false; try{ inTower=!!(sc&&sc.sys.settings.key==='Dungeon'&&sc.site&&sc.site.mage); }catch(e){}
    var dim=document.createElement('div'); dim.className='zcer-dim'; document.body.appendChild(dim);
    var R=[], G='ᚠᚢᚦᚨᚱᚲᛉᛟ'.split(''); G.forEach(function(ch){ var s=document.createElement('span'); s.className='zcer-rune'; s.textContent=ch; document.body.appendChild(s); R.push(s); });
    var tr=M.getBoundingClientRect(), tx=tr.left+tr.width/2||60, ty=tr.top+tr.height/2||40; if(!tr.width){ var Z=document.getElementById('zhud'); if(Z){ var zr=Z.getBoundingClientRect(); tx=zr.left+110; ty=zr.top+38; } }
    var t0=performance.now(), D1=1100, D2=900;
    var step=function(){ var t=performance.now()-t0; R.forEach(function(s,i){ var a=i/R.length*Math.PI*2+t/400, x, y, o=1;
        if(t<D1){ var rr=30+t/D1*30; x=hx+Math.cos(a)*rr; y=hy+Math.sin(a)*rr*0.7-t/D1*20; o=Math.min(1,t/300); }
        else { var u=Math.min(1,(t-D1-i*40)/D2); u=u<0?0:u*u*(3-2*u); var sx=hx+Math.cos(a)*60, sy=hy+Math.sin(a)*42-20; x=sx+(tx-sx)*u; y=sy+(ty-sy)*u-Math.sin(u*Math.PI)*80; o=1-u*0.3; }
        s.style.transform='translate('+Math.round(x)+'px,'+Math.round(y)+'px)'; s.style.opacity=o; });
      if(t<D1+D2+R.length*40)requestAnimationFrame(step); else bloom(); };
    var bloom=function(){ R.forEach(function(s){ s.remove(); }); M.classList.remove('zm-wait','zm-hide'); M.classList.add('zm-bloom'); if(typeof ZSFX!=='undefined')try{ ZSFX.play('quest'); }catch(e){}
      var cap=document.createElement('div'); cap.className='zcer-cap'; cap.innerHTML='<i>«Your well of mana. Spend it on the spell — and it fills again, as breath does.»</i><small>— '+(inTower?'the master\'s fading voice':'the tome, as its runes wake')+'</small>'; document.body.appendChild(cap);
      setTimeout(function(){ M.classList.remove('zm-bloom'); cap.classList.add('out'); dim.classList.add('out'); ZCER.point(M,'✨ Your mana — this arc. Teal when full, violet as it runs low. It fills again as you go; a mana draught (Shift+P) fills it at once.'); },3800);
      setTimeout(function(){ cap.remove(); dim.remove(); },4700); try{ var ws=_heroWS(); if(ws&&ws._save)ws._save(); }catch(e){} };
    requestAnimationFrame(step); };
  // ── the ring: a golden flash the first time, then the teacher sends for you ──
  var rg0=ZCER.ring; ZCER.ring=function(ps){ if(ps.aimSeen)return; ps.aimSeen=true; var n=0, iv=setInterval(function(){ n++; var m=ZAIM129.lock, sc=ZAIM129.lockSc; if(m&&sc&&sc.add&&!m.dead){ clearInterval(iv);
        try{ var r=((m.def&&m.def.r)||10)+8, g=sc.add.ellipse(m.x,m.y+r*0.55,r*2.2,r,0xffe066,0.0).setStrokeStyle(4,0xffe066,1).setDepth(19).setScale(2.4).setAlpha(0); sc.tweens.add({targets:g,scale:1,alpha:1,duration:420,ease:'Back.easeOut',onComplete:function(){ sc.tweens.add({targets:g,alpha:0,duration:500,delay:200,onComplete:function(){ g.destroy(); }}); }});
          var f=sc.add.circle(m.x,m.y,r*1.6,0xfff4b0,0.55).setDepth(19); sc.tweens.add({targets:f,scale:2,alpha:0,duration:500,onComplete:function(){ f.destroy(); }}); if(typeof ZSFX!=='undefined')ZSFX.play('quest'); }catch(e){}
        var k=ZTEACH.kind(ps), C=ZTEACH.cer(ps); if(k&&!C[k]){ C[k]=1; if(typeof ZCARD!=='undefined')ZCARD.show({who:ZTEACH.T[k].who,icon:ZTEACH.T[k].ic,title:'The gold ring',text:'The gold ring marks the foe you will hit. '+ZTEACH.T[k].call,cls:'zc-hint'}); }
        try{ var ws=_heroWS(); if(ws&&ws._save)ws._save(); }catch(e){} }
      else if(n>40)clearInterval(iv); },250); };
  // a second weapon kind later (a spell after a bow, or a bow after a spell): its teacher sends for you too
  setInterval(function(){ try{ var ps=ZTEACH.ps(); if(!ps||!ps.aimSeen||!ZTEACH.on)return; var k=ZTEACH.kind(ps), C=ZTEACH.cer(ps); if(k&&!C[k]){ C[k]=1; if(typeof ZCARD!=='undefined')ZCARD.show({who:ZTEACH.T[k].who,icon:ZTEACH.T[k].ic,text:ZTEACH.T[k].call,cls:'zc-hint'}); } }catch(e){} },3000);
  var st=document.createElement('style'); st.textContent=
    '.zcer-dim{position:fixed;inset:0;z-index:115;background:radial-gradient(ellipse at center,rgba(4,8,20,.35),rgba(4,8,20,.7));pointer-events:none;animation:zcpIn .5s ease-out;transition:opacity .8s}.zcer-dim.out{opacity:0}'+
    '.zcer-rune{position:fixed;left:0;top:0;z-index:121;font:22px serif;color:#bfffe8;text-shadow:0 0 8px #4ff0c0,0 0 18px #6f9fff;pointer-events:none;margin:-12px 0 0 -8px}'+
    '.zcer-cap{position:fixed;left:50%;top:58%;transform:translate(-50%,-50%);z-index:121;text-align:center;color:#e6f0ff;pointer-events:none;animation:zcpIn .8s ease-out;transition:opacity .8s;max-width:560px}.zcer-cap i{display:block;font:italic 20px Georgia,serif;text-shadow:0 0 10px #000}.zcer-cap small{display:block;margin-top:6px;font:13px "Segoe UI";color:#9ab0c8}.zcer-cap.out{opacity:0}'+
    '#zhud .zh-mana.zm-wait{display:none!important}#zhud .zh-mana.zm-bloom{animation:zmBloom 1.3s cubic-bezier(.2,1.4,.4,1) both,zmGlow 1.2s ease-in-out 1.3s 2;transform-origin:center}@keyframes zmBloom{from{transform:scaleX(.05);box-shadow:0 0 30px 10px #fff}to{transform:none}}@keyframes zmGlow{50%{box-shadow:0 0 18px 4px #9fd0ff;border-color:#e6f4ff}}'+
    '.zc-drill .zc-t{white-space:pre-line}';
  document.head.appendChild(st);
})();
