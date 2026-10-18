// ═══════════════════════════════════════════════════════════════════════
// ║ 16j-forge-rules.js — round 64d: THE RULES OF EACH FORGE TRIAL, READ BEFORE YOU BEGIN; BROKKR'S ANVIL REMADE.
// ║ Kris: "when in the ember forge, the new mechanic for collecting ore is great. however, you need to created a popup that tells you the rules
// ║ that you get to read, and then you click to exit and begin. use the painted images to help you understand what you need to do. also the
// ║ brokkrs anvil strike challenge doesn't seem to be working, and monsters attack you when you do it. so you should have a pop-up that pauses
// ║ the game, explains what to do, and then you have to complete the challenge. you should also have a way to exit, too. check this for the
// ║ other challenges in volcanoes".
// ║  · Entering a forge (its first floor) or each hall of Muspelheim: a pop-up with that place's rules, step by step, each with its painted
// ║    piece (the ore vein, the anvil, the bellows, the cart and switch, a chained toiler, the spirit door, the quench trough, the lifts, the
// ║    rafts, the levers). The game is paused while it is open; "Begin" closes it. "Don't show this again" per place; "? Rules" on the heat
// ║    bar opens it again at any time.
// ║  · BROKKR'S ANVIL: the strokes never landed — Space (attack) and Tab (interact) were taken by the hero before the anvil looked at them, and
// ║    the fight went on around you. Now Tab at the anvil opens a pop-up that PAUSES the game, explains the strokes, and runs the challenge in
// ║    the pop-up itself (Space, Enter or a click to strike); "Leave the anvil" (or Esc) exits at any point without spending ore.
// ║    Loki's fly is swatted with an ordinary attack when it is close.
// ═══════════════════════════════════════════════════════════════════════
var ZFT={ on:true, ID:'modal-forgetrial',
  // a painted piece in a little canvas (an emoji when the picture is not in)
  thumb:function(id,size,emo){ var S=size||88, cv=document.createElement('canvas'); cv.width=S*2; cv.height=S*2; cv.style.width=S+'px'; cv.style.height=S+'px'; cv.className='zft-th';
    var Z=typeof _scn==='function'?_scn():null, x=cv.getContext('2d');
    if(id&&Z&&Z.has&&Z.has(id)){ try{ var z=Z.size(id,0), k=Math.min((S*2-12)/z.w,(S*2-12)/z.h); Z.draw(x,id,S,S*2-6-(S*2-12-z.h*k)/2,z.h*k,{shadow:false}); cv.dataset.painted='1'; return cv; }catch(e){} }
    x.font=Math.round(S*1.05)+'px serif'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(emo||'❔',S,S*1.05); return cv; },
  HEAT:['fr_quench','🔥 <b>Heat</b> fills on every floor — faster the deeper you go and beside lava. Stand by a <b>quench trough</b> or press <b>Tab</b> at it to cool down. Full heat burns 3 % of your health a second. Fire resistance slows it.','💧'],
  RULES:{
    ember:{t:'⚒ The Ember Forge — Brokkr\'s Anvil', lead:'No key lies about here. On every floor you forge the rune-key for the way down yourself.', steps:[
      ['fr_orevein','<b>1 · Mine ore.</b> Glowing ore veins lie along the way — stand by one and press <b>Tab</b>. The forge\'s creatures drop ore too. You need <b>3 ore</b>.','⛏'],
      [null,'<b>2 · Swat Loki\'s fly.</b> It buzzes round the anvil and follows you near it. Attack (<b>Space</b>) when it is close. While it lives, the gold band on the anvil is narrow.','🪰'],
      ['fr_anvil','<b>3 · Forge the key.</b> Press <b>Tab</b> at Brokkr\'s anvil. The game pauses; strike (<b>Space</b>, <b>Enter</b> or click) when the white mark is in the gold band — three strokes.','⚒'],
      [null,'<b>4 · The way down.</b> Three true strokes make a true key. A miss makes a flawed key: it still opens the stairs, but it shatters and the shards burn you.','🗝']]},
    cinder:{t:'🌋 The Cinder Forge — the Lava Tide', lead:'The forge breathes. Lava channels across the way rise and fall.', steps:[
      [null,'<b>1 · Watch the channels.</b> A channel floods for about 6 seconds, then drains for about 5. Standing in it while it is up burns you.','🌊'],
      ['fr_bellows','<b>2 · Pump the bellows.</b> Each channel has great bellows beside it — press <b>Tab</b> to hold that channel drained for ten seconds. Then cross.','💨']]},
    slag:{t:'⛏ The Slag Forge — the Ore-Cart Rails', lead:'Mine rails run through the deep workings.', steps:[
      ['fr_cart','<b>1 · Ride the cart.</b> Press <b>Tab</b> at the ore-cart: it carries you along the rails toward the way down, and nothing can hurt you while it runs.','🛒'],
      ['fr_switch','<b>2 · Throw the switch</b> (Tab) before you ride, and the cart takes the spur to a side gallery with ore and a chest instead.','🔀']]},
    ash:{t:'⛓ The Ash Forge — Free the Toilers', lead:'The spirits toil here for Surtharn. A spirit door seals each way down.', steps:[
      ['sp_u_asa_bound','<b>1 · Break their chains.</b> Stand by a chained toiler and press <b>Tab</b>. A freed toiler follows you.','⛓'],
      ['fr_spiritdoor','<b>2 · Open the spirit door.</b> With three toilers at your side, press <b>Tab</b> at the door over the way down — it melts into light.','🚪']]},
    hearth:{t:'🔥 The Hearth Hall', lead:'The forge-master waits at the hearth.', steps:[
      [null,'<b>The forge-master</b> fights in three phases. It is warded by Muspelheim: every element bites only a third as deep — <b>Sovereign</b> bites twice as deep.','⚔'],
      [null,'When it falls, press <b>Tab</b> at the <b>hearth</b> with the realm\'s Soulglass Lattice and Hearth Tray to make its Heartglass. Its chest holds the key to the next forge.','💎']]},
    musp0:{t:'🌋 Muspelheim — the Chain Lifts', lead:'Rock shelves over a lava shaft.', steps:[
      ['mh_lift_a','<b>1 · Ride the lifts.</b> Iron lifts on chains shuttle across each gap — step on as one arrives and it carries you.','⛓'],
      ['sp_u_bersi_bound','<b>2 · Free the haulers.</b> A chained spirit hauls each lift — press <b>Tab</b> by it to break its chains and the lift locks into a bridge.','✨']]},
    musp1:{t:'🌋 Muspelheim — the Lava Rafts', lead:'A river of fire between two banks and two islands.', steps:[
      ['mh_raft_a','<b>Ride the basalt rafts.</b> They drift from shore to shore — step on when one touches your bank, step off on the far side. The fire burns if you miss.','🪨']]},
    musp2:{t:'🌋 Muspelheim — the Ash-Warden Fortress', lead:'Three walled yards, each gate shut.', steps:[
      ['dg_lever','<b>Pull each lever</b> (Tab) to raise its gate — and every lever sounds the horns and calls the ash-wardens. Be ready to fight.','⚙']]},
    musp3:{t:'🌋 Muspelheim — the Falling Bridges', lead:'Stone islands over the abyss, joined by slab bridges.', steps:[
      [null,'<b>Keep moving.</b> The slabs crack under you and fall behind you — stop on one and you fall back. Fallen bridges knit again after a while.','🌉']]},
    musp4:{t:'👑 Muspelheim — the Throne Cavern', lead:'Surtharn waits on his throne of captured spirits.', steps:[
      [null,'<b>Surtharn</b> fights in six phases, warded: <b>Sovereign</b> bites deep. Once he falls, the great hearth makes the <b>Lodestar</b> from the Sovereign staff and the four Heartglasses.','👑']]}
  },
  MUSP:[null,'<b>Each hall</b>: five chained spirits to free (Tab), and two old volcano bosses guarding the way down — the stairs open when both fall. The <b>Ragnarök track</b> rises with time and alarms: at 3, 6 and 9 the lava rises and fiercer foes walk in.','📯'],
  keyOf:function(sc){ if(!sc)return null; if(sc._asgc||(typeof ZCIT!=='undefined'&&ZCIT.is(sc)))return 'cit'+Math.max(0,Math.min(4,sc.floor||0)); if(sc._musp)return 'musp'+Math.max(0,Math.min(4,sc.floor||0)); var F=typeof ZFORGE!=='undefined'?ZFORGE.of(sc):null; if(!F)return null; if(sc.isLastFloor)return 'hearth'; return F.k; },
  isOpen:function(){ var el=document.getElementById(ZFT.ID); return !!(el&&el.style.display!=='none'); },
  close:function(){ var el=document.getElementById(ZFT.ID); if(el)el.remove(); if(ZFT._raf){ cancelAnimationFrame(ZFT._raf); ZFT._raf=0; } var f=ZFT._onClose; ZFT._onClose=null; ZFT._key=null; if(f)try{ f(); }catch(e){} },
  _shell:function(title,lead){ ZFT.close(); var el=document.createElement('div'); el.id=ZFT.ID; el.className='zft';
    el.innerHTML='<div class="zft-box" role="dialog" aria-modal="true"><h3>'+title+'</h3>'+(lead?'<p class="zft-lead">'+lead+'</p>':'')+'<div class="zft-body"></div><div class="zft-foot"></div></div>'; document.body.appendChild(el); return el; },
  _steps:function(host,steps){ steps.forEach(function(s){ var r=document.createElement('div'); r.className='zft-step'; r.appendChild(ZFT.thumb(s[0],76,s[2])); var p=document.createElement('div'); p.className='zft-tx'; p.innerHTML=s[1]; r.appendChild(p); host.appendChild(r); }); },
  _btn:function(host,label,cls,fn){ var b=document.createElement('button'); b.className='zft-btn '+(cls||''); b.innerHTML=label; b.onclick=function(e){ e.preventDefault(); fn(); }; host.appendChild(b); return b; },
  // the rules of this place (auto on entering, or "? Rules")
  rules:function(sc,key,auto){ key=key||ZFT.keyOf(sc); var R=ZFT.RULES[key]; if(!R)return false; var ps=ZFI.ps(sc)||{};
    if(auto&&ps.zftOff&&ps.zftOff[key])return false;
    var el=ZFT._shell(R.t,R.lead), body=el.querySelector('.zft-body'), foot=el.querySelector('.zft-foot'); ZFT._key=key;
    var st=R.steps.slice(); if(/^musp[0-3]$/.test(key))st.push(ZFT.MUSP); if(/^cit[0-3]$/.test(key)&&ZFT.DOOM)st.push(ZFT.DOOM); if(key!=='musp4'&&key!=='hearth'&&!/^cit/.test(key))st.push(ZFT.HEAT); ZFT._steps(body,st);
    var lab=document.createElement('label'); lab.className='zft-off'; lab.innerHTML='<input type="checkbox"'+(ps.zftOff&&ps.zftOff[key]?' checked':'')+'> Don\'t show this again when I come in (the <b>? Rules</b> button on the heat bar still opens it)'; foot.appendChild(lab);
    lab.querySelector('input').onchange=function(){ ps.zftOff=ps.zftOff||{}; if(this.checked)ps.zftOff[key]=1; else delete ps.zftOff[key]; };
    ZFT._btn(foot,'Begin ▶','zft-go',ZFT.close).focus(); return true; },
  // ══ Brokkr's anvil, in its own paused pop-up ══
  anvil:function(sc){ var ore=sc._zfOre||0, fly=!!(sc._zfFly&&sc._zfFly.alive);
    if(sc._zfKey){ showNotif('⚒ The rune-key is forged — the way down is open.','#ffb070'); return; }
    var el=ZFT._shell('⚒ Brokkr\'s Anvil','Forge this floor\'s rune-key with three hammer strokes. The game waits while you work.'), body=el.querySelector('.zft-body'), foot=el.querySelector('.zft-foot');
    ZFT._steps(body,[['fr_anvil','Strike when the <b>white mark</b> sweeps through the <b>gold band</b> — <b>Space</b>, <b>Enter</b> or click. Three strokes: all three true make a <b>true key</b>; any miss makes a <b>flawed key</b> (it opens the stairs once, then shatters and burns you).','⚒'],
      [fly?null:'fr_orevein',fly?'<b>Loki\'s fly is still buzzing</b> — the gold band is narrow. Leave, swat it (attack when it is close), and come back for a wide band.':'<b>The fly is gone</b> — the gold band is wide.',fly?'🪰':'✅'],
      ['fr_orevein','Ore: <b>'+ore+' / 3</b>'+(ore<3?' — mine the glowing veins along the way (Tab); the forge\'s creatures drop ore too.':' — enough to forge.'),'⛏']]);
    ZFT._btn(foot,'Leave the anvil','zft-out',ZFT.close);
    if(ore<3){ ZFT._btn(foot,'OK','zft-go',ZFT.close).focus(); return; }
    ZFT._btn(foot,'Begin forging ⚒','zft-go',function(){ ZFT._strike(sc,el,fly); }).focus(); },
  _strike:function(sc,el,fly){ var body=el.querySelector('.zft-body'), foot=el.querySelector('.zft-foot'), zone=fly?0.12:0.26, G=ZFT._g={n:0,hits:0,t0:performance.now(),zone:zone,c:0.3+Math.random()*0.4,done:false,lock:0};
    body.innerHTML='<div class="zft-anv"></div><div class="zft-bar"><div class="zft-zone"></div><div class="zft-mark"></div>'+(fly?'<div class="zft-fly">🪰</div>':'')+'</div><div class="zft-pips"><i></i><i></i><i></i></div><div class="zft-msg">Stroke 1 of 3 — Space, Enter or click when the mark is in the gold.</div>';
    body.querySelector('.zft-anv').appendChild(ZFT.thumb('fr_anvil',110,'⚒'));
    foot.innerHTML=''; ZFT._btn(foot,'Leave the anvil (Esc)','zft-out',ZFT.close); ZFT._btn(foot,'Strike! ⚒','zft-go',function(){ ZFT._hit(sc); }).focus();
    body.querySelector('.zft-bar').onclick=function(){ ZFT._hit(sc); };
    var zEl=body.querySelector('.zft-zone'), mEl=body.querySelector('.zft-mark'), fEl=body.querySelector('.zft-fly'); var place=function(){ zEl.style.left=((G.c-G.zone/2)*100)+'%'; zEl.style.width=(G.zone*100)+'%'; }; place(); G.place=place;
    var step=function(now){ if(!document.getElementById(ZFT.ID)||G.done)return; var t=(now-G.t0)/1000; G.u=(Math.sin(t*3.4)+1)/2; mEl.style.left='calc('+(G.u*100)+'% - 3px)';
      if(fEl){ fEl.style.left=(50+Math.sin(t*5.3)*40)+'%'; fEl.style.top=(-14+Math.sin(t*7.1)*8)+'px'; } ZFT._raf=requestAnimationFrame(step); }; ZFT._raf=requestAnimationFrame(step); },
  _hit:function(sc){ var G=ZFT._g, el=document.getElementById(ZFT.ID); if(!G||G.done||!el||performance.now()<G.lock)return; G.lock=performance.now()+260; var u=G.u===undefined?0:G.u, hit=Math.abs(u-G.c)<=G.zone/2; G.n++; if(hit)G.hits++;
    if(typeof ZSFX!=='undefined')try{ ZSFX.play('hit'); }catch(e){} var pip=el.querySelectorAll('.zft-pips i')[G.n-1]; if(pip)pip.className=hit?'ok':'miss';
    var box=el.querySelector('.zft-box'); if(box){ box.classList.remove('zft-shake'); void box.offsetWidth; box.classList.add('zft-shake'); }
    var msg=el.querySelector('.zft-msg'); if(msg)msg.textContent=(hit?'CLANG! A true stroke.':'A glancing stroke…')+(G.n<3?' — stroke '+(G.n+1)+' of 3':'');
    G.c=0.15+Math.random()*0.7; if(G.place)G.place();
    if(G.n>=3){ G.done=true; sc._zfOre=Math.max(0,(sc._zfOre||0)-3); sc._zfKey=G.hits>=3?'true':'flawed';
      if(msg)msg.innerHTML=sc._zfKey==='true'?'⚒ <b>A true rune-key!</b> The way down unlocks.':'⚒ <b>A flawed rune-key</b> — it will open the way once, then shatter and burn you.';
      var foot=el.querySelector('.zft-foot'); foot.innerHTML=''; ZFT._btn(foot,'Take the key ▶','zft-go',ZFT.close).focus();
      showNotif(sc._zfKey==='true'?'⚒ A true rune-key! The way down unlocks.':'⚒ A flawed rune-key — it will open the way once, then shatter.','#ffb070'); } }
};
(function(){ setTimeout(function(){ if(typeof PAUSE_OVERLAYS!=='undefined'&&PAUSE_OVERLAYS.indexOf(ZFT.ID)<0)PAUSE_OVERLAYS.push(ZFT.ID); },0);      /* the list is made by a later file */
  // the pop-up owns the keyboard while it is open: Space / Enter strike or begin, Esc leaves; nothing reaches the game or the menus
  window.addEventListener('keydown',function(e){ if(!ZFT.isOpen())return; var k=e.key; e.stopImmediatePropagation(); if(k==='Tab'||k===' '||k==='Enter'||k==='Escape')e.preventDefault();
    if(k==='Escape'){ ZFT.close(); return; } if(k===' '||k==='Enter'){ if(ZFT._g&&!ZFT._g.done&&document.querySelector('#'+ZFT.ID+' .zft-bar')){ var sc=game.scene.getScene('Dungeon'); ZFT._hit(sc); return; } var b=document.querySelector('#'+ZFT.ID+' .zft-go'); if(b)b.click(); } },true);
  window.addEventListener('keyup',function(e){ if(ZFT.isOpen())e.stopImmediatePropagation(); },true);
  var st=document.createElement('style'); st.textContent='.zft{position:fixed;inset:0;z-index:70;display:flex;align-items:center;justify-content:center;background:rgba(6,3,2,.62)}'+
    '.zft-box{width:min(560px,94vw);max-height:90vh;overflow:auto;background:linear-gradient(#2a160c,#170c07);border:2px solid #ff9040;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.6),0 0 30px rgba(255,120,40,.2);padding:16px 20px;color:#ffe6cc;font:500 14px/1.45 "Segoe UI",sans-serif}'+
    '.zft-box h3{margin:0 0 4px;font:400 21px "Cinzel","Segoe UI",serif;color:#ffcf8a;letter-spacing:.02em}.zft-lead{margin:0 0 10px;color:#e8c8a8}'+
    '.zft-step{display:flex;gap:12px;align-items:center;padding:7px 8px;margin:6px 0;background:rgba(255,150,70,.07);border:1px solid rgba(255,150,70,.22);border-radius:10px}.zft-th{flex:0 0 auto;border-radius:8px;background:radial-gradient(rgba(255,160,80,.16),rgba(0,0,0,0) 70%)}.zft-tx b{color:#ffd79a}'+
    '.zft-foot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:flex-end;margin-top:12px}.zft-off{flex:1 1 100%;font-size:12px;color:#c8a888}.zft-off b{color:#ffcf8a}'+
    '.zft-btn{font:600 14px "Segoe UI",sans-serif;padding:8px 16px;border-radius:9px;cursor:pointer;border:1px solid #ff9040;background:#3a1e10;color:#ffe0c0}.zft-go{background:linear-gradient(#ff9a40,#d0601c);color:#1a0a04;border-color:#ffc080}.zft-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}'+
    '.zft-anv{display:flex;justify-content:center}.zft-bar{position:relative;height:30px;margin:12px 4px 8px;background:#2a1a12;border:1px solid #6a3a20;border-radius:8px;cursor:pointer}.zft-zone{position:absolute;top:0;bottom:0;background:linear-gradient(#ffe08a,#e0a030);opacity:.85;border-radius:4px}'+
    '.zft-mark{position:absolute;top:-4px;bottom:-4px;width:6px;background:#fff;border-radius:3px;box-shadow:0 0 10px #ff8040}.zft-fly{position:absolute;font-size:20px;transform:translateX(-50%);pointer-events:none}'+
    '.zft-pips{display:flex;gap:8px;justify-content:center;margin:4px 0}.zft-pips i{width:14px;height:14px;border-radius:50%;border:2px solid #a06030}.zft-pips i.ok{background:#ffd060;border-color:#ffe0a0}.zft-pips i.miss{background:#5a2a20;border-color:#c04020}'+
    '.zft-msg{text-align:center;min-height:22px;font-weight:600}.zft-shake{animation:zftsh .18s}@keyframes zftsh{0%{transform:translate(0,0)}30%{transform:translate(-3px,2px)}60%{transform:translate(3px,-2px)}100%{transform:translate(0,0)}}'+
    '.zheat-q{pointer-events:auto;cursor:pointer;margin-left:8px;padding:0 6px;border:1px solid rgba(255,160,90,.6);border-radius:8px;background:rgba(40,16,8,.85);color:#ffd0a0;font:600 10px "Segoe UI",sans-serif}';
  document.head.appendChild(st); })();
setTimeout(function(){ if(typeof ZFI==='undefined'||typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  // the anvil opens the paused pop-up (the old strike bar read keys the hero had already used)
  ZFI.forge=function(sc){ ZFT.anvil(sc); }; ZFI.forgeTick=function(){};
  // Loki's fly is swatted by an ordinary attack when it is close
  var pa=D._playerAttack; if(pa)D._playerAttack=function(){ var F=this._zfFly; if(F&&F.alive&&F.c&&Math.hypot(F.c.x-this.px,F.c.y-this.py)<70){ F.alive=false; var c=F.c, s=this; this.tweens.add({targets:c,alpha:0,scale:0.2,duration:300,onComplete:function(){ c.destroy(); }}); if(this._floatText)this._floatText(c.x,c.y-10,'Swat! Loki\'s fly flees','#c8f0a0'); } return pa.apply(this,arguments); };
  // the rules when you come in: a forge's first floor (and its hearth hall), and every hall of Muspelheim
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments), self=this; if(!ZFT.on||!(ZFI.hot(this)||this._asgc||(typeof ZCIT!=='undefined'&&ZCIT.is(this))))return r; var key=ZFT.keyOf(this), fl=this.floor;
    if(key&&(this._musp||/^cit/.test(key)||fl===0||this.isLastFloor)){ setTimeout(function(){ try{ if(self.sys&&self.sys.isActive()&&self.floor===fl&&!self._playerDead&&!ZFT.isOpen())ZFT.rules(self,key,true); }catch(e){} },900); }
    return r; };
  // "? Rules" on the heat bar
  var hh=ZFI.heatHud; ZFI.heatHud=function(sc){ var r=hh.apply(this,arguments), el=document.getElementById('zheat'); if(el&&!el.querySelector('.zheat-q')){ var d=el.firstChild, b=document.createElement('span'); b.className='zheat-q'; b.textContent='? Rules'; b.title='The rules of this place';
      b.onclick=function(){ try{ var s=game.scene.getScene('Dungeon'); if(s&&ZFI.hot(s))ZFT.rules(s,null,false); }catch(e){} }; if(d)d.appendChild(b); } return r; };
  var ex=D._exitToWorld; if(ex)D._exitToWorld=function(){ ZFT.close(); return ex.apply(this,arguments); };
},0);
// ══ round 64d (Kris: "when using the forges in the volcanos, you should have a full popup that pauses the game to tell you if you have the right
// items, or if you still need to do things. you can show the painted images of the different items that you have and progress towards having
// all of them"): a forge's HEARTH and Muspelheim's GREAT HEARTH open a paused pop-up — each thing it needs with its painted picture, ✓ or what
// is still missing (and how far along you are), what it makes, and "Forge" once everything is there ══
ZFT.ico=function(id,emo){ try{ if(typeof ZIcon!=='undefined'&&id&&(ZIcon.has('ic_'+id)||(id==='lodestar'&&ZIcon.has('ls2_c'))))return id==='lodestar'&&!ZIcon.has('ic_lodestar')?ZIcon.html('ls2_c','🌟',3.2,'zft-ic'):ZIcon.item(id,3.2,'zft-ic'); }catch(e){} return '<span class="zft-emo">'+(emo||'❔')+'</span>'; };
ZFT.row=function(ok,ic,name,sub){ return '<div class="zft-need '+(ok?'ok':'no')+'"><div class="zft-nic">'+ic+'</div><div class="zft-ntx"><b>'+name+'</b>'+(sub?'<div class="zft-sub">'+sub+'</div>':'')+'</div><div class="zft-nok">'+(ok?'✓':'✗')+'</div></div>'; };
ZFT.bar=function(n,N){ var p=Math.max(0,Math.min(1,n/N)); return '<div class="zft-pb"><i style="width:'+Math.round(p*100)+'%"></i><span>'+n+' / '+N+'</span></div>'; };
ZFT.hearth=function(sc,musp,go){ var ps=sc.worldScene.playerState, inv=ps.inventory||(ps.inventory=[]), has=function(id){ return inv.indexOf(id)>=0||(ps.equip&&ps.equip.mWeapon===id); }, nm=function(id){ return (ITEMS[id]&&ITEMS[id].name)||id; }, h='', ready=true, made, title, lead;
  var boss=!!sc._bossDefeated; if(!boss)ready=false;
  if(musp){ title='🔥 The Great Hearth of Muspelheim'; made='lodestar'; lead='The Sovereign staff drinks four Heartglasses here and becomes THE LODESTAR.';
    h+=ZFT.row(boss,'<span class="zft-emo">👑</span>','Surtharn beaten',boss?'The great hearth is open.':'He stands before the hearth — beat him first.');
    var st=has('sov_staff'); if(!st)ready=false; h+=ZFT.row(st,ZFT.ico('sov_staff','🪄'),nm('sov_staff'),st?'You carry it.':'Won from all sixteen mage towers (or forged once the forges rise).');
    var hg=[1,2,3,4].filter(function(q){ return has('heartglass_'+q); }).length; if(hg<4)ready=false;
    h+=ZFT.row(hg>=4,'<span class="zft-row4">'+[1,2,3,4].map(function(q){ return '<span class="'+(has('heartglass_'+q)?'got':'miss')+'">'+ZFT.ico('heartglass_'+q,'💎')+'</span>'; }).join('')+'</span>','The four Heartglasses',ZFT.bar(hg,4)+'One from each forge\'s hearth.');
    if(has('lodestar')){ ready=false; lead='🌟 The Lodestar is already yours.'; } }
  else { var F=ZFORGE.of(sc), q=F.q, lat='soulglass_lattice_'+q, tray='hearth_tray_'+q, hgid=ZFORGE.heartOf(q); made=hgid; title='🔥 The Hearth of the '+F.name; lead='Lay the realm\'s Soulglass Lattice in its Hearth Tray here, and the hearth gives it its true form: the '+nm(hgid)+'.';
    h+=ZFT.row(boss,'<span class="zft-emo">⚔</span>','The forge-master beaten',boss?'The hearth blazes open.':'It guards the hearth — beat it first.');
    var hl=has(lat), need=(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.NEED)||6, sh=inv.filter(function(i){ return i==='soulglass_'+q; }).length, fr=typeof ZSPIRIT!=='undefined'&&ZSPIRIT.count?ZSPIRIT.count(ps,q):0; if(!hl)ready=false;
    h+=ZFT.row(hl,ZFT.ico(lat,'🔷'),nm(lat),hl?'You carry it.':ZFT.bar(Math.min(sh,need),need)+'Soulglass shards held ('+fr+' / 10 spirits of the realm freed) — Sólveig fuses six in the Glimmerhall.');
    var ht=has(tray); if(!ht)ready=false; var M=typeof ZMIRA!=='undefined'?ZMIRA:null, met=M?M.METAL[q]:null, gem=M?M.GEM[q]:null;
    h+=ZFT.row(ht,ZFT.ico(tray,'🛡'),nm(tray),ht?'You carry it.':'Mira casts it from the realm\'s metal and soul gem:'+(M?'<div class="zft-parts">'+[met,gem].map(function(id){ var g=has(id); return '<span class="'+(g?'got':'miss')+'">'+ZFT.ico(id,'◆')+' '+nm(id)+(g?' ✓':' ✗')+'</span>'; }).join('')+'</div>':''));
    if(has(hgid)){ ready=false; lead='✨ You already carry the '+nm(hgid)+'.'; } }
  var el=ZFT._shell(title,lead), body=el.querySelector('.zft-body'), foot=el.querySelector('.zft-foot');
  body.innerHTML='<div class="zft-needs">'+h+'</div><div class="zft-makes">'+ZFT.ico(made,musp?'🌟':'💎')+'<div>Makes: <b>'+nm(made)+'</b>'+(ready?'<div class="zft-sub" style="color:#b8f0b0">Everything is here.</div>':'')+'</div></div>';
  ZFT._btn(foot,ready?'Not now':'Close','zft-out',ZFT.close);
  if(ready)ZFT._btn(foot,musp?'Forge the Lodestar 🌟':'Forge the Heartglass 💎','zft-go',function(){ ZFT.close(); setTimeout(function(){ try{ go(sc); }catch(e){ console.warn('hearth',e); } },60); }).focus();
  else foot.querySelector('.zft-out').classList.add('zft-go'); };
(function(){ var st=document.createElement('style'); st.textContent='.zft-need{display:flex;align-items:center;gap:12px;padding:8px 10px;margin:6px 0;border-radius:10px;border:1px solid rgba(255,150,70,.25);background:rgba(255,150,70,.06)}.zft-need.ok{border-color:rgba(130,230,140,.45);background:rgba(90,200,110,.08)}'+
  '.zft-nic{flex:0 0 auto;min-width:64px;display:flex;justify-content:center;align-items:center}.zft-ntx{flex:1}.zft-nok{font-size:22px;font-weight:700;color:#ff7050}.zft-need.ok .zft-nok{color:#8ff09a}.zft-sub{font-size:12.5px;color:#e0c0a0;margin-top:2px}'+
  '.zft-emo{font-size:38px;line-height:1}.zft-row4{display:grid;grid-template-columns:repeat(2,auto);gap:2px}.zft-row4 .zi,.zft-row4 .zft-emo{transform:scale(.62)}.zft-row4>span,.zft-parts>span{display:inline-flex;align-items:center;gap:4px}'+
  '.miss{opacity:.35;filter:grayscale(1)}.zft-parts{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}.zft-parts .zi,.zft-parts .zft-emo{transform:scale(.55);transform-origin:center}.zft-parts .miss{opacity:.55}'+
  '.zft-pb{position:relative;height:12px;margin:4px 0;background:#2a1a12;border:1px solid #6a3a20;border-radius:6px;overflow:hidden}.zft-pb i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#9fe8ff,#5ab0ff)}.zft-pb span{position:relative;font-size:10px;padding-left:6px;color:#fff}'+
  '.zft-makes{display:flex;align-items:center;gap:12px;margin-top:10px;padding:8px 10px;border-top:1px solid rgba(255,150,70,.3)}';
  document.head.appendChild(st); })();
setTimeout(function(){
  if(typeof ZFORGE!=='undefined'&&ZFORGE.hearth){ var h0=ZFORGE.hearth; ZFORGE.hearth=function(sc){ if(!ZFT.on||ZFT.noHearthPop)return h0.apply(this,arguments); ZFT.hearth(sc,false,h0); }; }
  if(typeof ZMUSP!=='undefined'&&ZMUSP.hearth){ var m0=ZMUSP.hearth; ZMUSP.hearth=function(sc){ if(!ZFT.on||ZFT.noHearthPop)return m0.apply(this,arguments); ZFT.hearth(sc,true,m0); }; }
},0);
