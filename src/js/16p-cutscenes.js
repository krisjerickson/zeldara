// ═══════════════════════════════════════════════════════════════════════
// ║ 16p-cutscenes.js — round 65: CUT-SCENES WHEN A FINAL BOSS CHANGES FORM (Solmyrk and Surtharn).
// ║ Kris: "we need to develop cut scenes for how solmyrk transitions, starting with placeholder images. we should also do cut-scenes for
// ║ sutharns different forms as well" — card: "Painted panels" (the fight pauses, letterbox bars, 2–3 painted story panels with a line each,
// ║ then the new form appears).
// ║  · When a phase falls and the next form rises, the game pauses and its panels play: each fades in, holds about 3½ s with its line, and a
// ║    click, Space or Enter goes on; "Skip ▶▶" (or Esc) ends it. Then the fight goes on with the new form.
// ║  · Painted panels: Surtharn's five (scenery wave 70, tools\sprites\round66.ps1); Solmyrk's four come once his three forms are picked.
// ║    Until a panel is painted, a placeholder is drawn in its place: the boss's colours, the new form's own painted figure (or its drawn
// ║    stand-in) rising out of light or fire, its name and the line.
// ║ Round 65b: an intro too — one panel as Surtharn and as Solmyrk first rise (once a visit; the rules pop-up waits for it).
// ║ Switch: ZCUT.on (Dev: ZCUT.on=false); the test suites keep it off (tests/harness.py).
// ═══════════════════════════════════════════════════════════════════════
var ZCUT={ on:true, ID:'zcut', HOLD:3600, seen:{},
  SETS:{
    grimnir_1:[['pn_sol_0','On the high seat of Asgard a god of gold unfolds his wings — Solmyrk, the Black Sun.']],      // round 65b: the intros (Kris: "Yes, an intro too")
    surtharn_1:[['pn_surt_1','The throne of Muspelheim splits open — Surtharn, the Molten Colossus, rises from the fire!']],
    grimnir_2:[['pn_sol_12_a','The golden mask splits — black light pours out of the crack.'],['pn_sol_12_b','Behind the Allfather\'s face, something else is looking out.']],
    grimnir_3:[['pn_sol_23_a','The mask shatters. All the light of Asgard drains into him…'],['pn_sol_23_b','…and what is left is the dark that was always underneath.']],
    surtharn_2:[['pn_surt_2','The greatsword melts into a hammer — the Forge-king!']],
    surtharn_3:[['pn_surt_3','He bursts into ash — the Ash Tyrant drives the bound spirits before him!']],
    surtharn_4:[['pn_surt_4','Horns tear from his brow — the Horned Jötunn lights the Sword of Flame!']],
    surtharn_5:[['pn_surt_5','He climbs from the lava in black glass — the Obsidian Warlord!']],
    surtharn_6:[['pn_surt_6','The last ember — Surtharn becomes the volcano itself!']] },
  LOOK:{ grimnir:{bg:['#2a2410','#050407'],glow:'rgba(255,236,170,',sub:'#fff2b0'}, surtharn:{bg:['#3a0c04','#0a0302'],glow:'rgba(255,120,40,',sub:'#ffc080'} },
  isOpen:function(){ return !!document.getElementById(ZCUT.ID); },
  painted:function(id){ var R=(typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}; return R[id]?((typeof ZScn!=='undefined'&&ZScn.BASE)||'assets/scenery/')+R[id]:null; },
  // a placeholder panel: the boss's colours, the new form rising out of the light, its name and the line
  placeholder:function(boss,ph,i,cap,cb){ var W=1280, H=720, cv=document.createElement('canvas'); cv.width=W; cv.height=H; var x=cv.getContext('2d'), L=ZCUT.LOOK[boss]||ZCUT.LOOK.surtharn, dark=boss==='grimnir'&&ph===3;
    var g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,dark?'#08080d':L.bg[0]); g.addColorStop(1,L.bg[1]); x.fillStyle=g; x.fillRect(0,0,W,H);
    var r=x.createRadialGradient(W/2,H*0.5,10,W/2,H*0.5,H*0.75); r.addColorStop(0,dark?'rgba(0,0,0,0.9)':L.glow+'0.55)'); r.addColorStop(0.5,dark?'rgba(30,30,50,0.4)':L.glow+'0.12)'); r.addColorStop(1,'rgba(0,0,0,0)'); x.fillStyle=r; x.fillRect(0,0,W,H);
    for(var k=0;k<28;k++){ var a=k/28*Math.PI*2+i, len=H*(0.55+0.3*Math.sin(k*1.7)); x.strokeStyle=dark?'rgba(200,210,255,0.05)':L.glow+'0.10)'; x.lineWidth=10+8*Math.sin(k); x.beginPath(); x.moveTo(W/2,H*0.5); x.lineTo(W/2+Math.cos(a)*len,H*0.5+Math.sin(a)*len); x.stroke(); }
    var P=(typeof BOSS_PHASES!=='undefined'&&BOSS_PHASES[boss]&&BOSS_PHASES[boss].phases[ph-1])||{}, form=P.form, nm=(MON_BY_ID[P.rid]&&MON_BY_ID[P.rid].name)||'';
    var finish=function(fig){ if(fig){ var s=Math.min((H*0.78)/fig.height,(W*0.5)/fig.width); x.save(); x.shadowColor=dark?'#000':L.sub; x.shadowBlur=40; x.globalAlpha=0.95; x.drawImage(fig,W/2-fig.width*s/2,H*0.88-fig.height*s,fig.width*s,fig.height*s); x.restore(); }
      x.textAlign='center'; x.fillStyle=L.sub; x.font='700 44px Georgia,serif'; x.shadowColor='#000'; x.shadowBlur=12; x.fillText(nm.replace(/^[^,]*, /,'').toUpperCase(),W/2,78);
      x.font='italic 14px Georgia,serif'; x.fillStyle='rgba(255,255,255,0.4)'; x.textAlign='right'; x.fillText('placeholder — the painted panel comes later',W-16,24); cb(cv.toDataURL('image/jpeg',0.85)); };
    try{ if(form&&typeof ZAtlas!=='undefined'&&ZAtlas.has&&ZAtlas.has(form)){ ZAtlas.thumbs(form,520,1,function(T){ finish(T&&T[0]?T[0]:null); }); return; }
      if(form&&typeof BA!=='undefined'&&BA.of){ var D=BA.of(form); if(D){ var th=BA.thumbs(D,420); finish(th&&th[0]?th[0]:(th&&th.width?th:null)); return; } } }catch(e){}
    finish(null); },
  play:function(boss,ph,done){ var S=ZCUT.SETS[boss+'_'+ph]; if(!ZCUT.on||!S||ZCUT.isOpen()){ if(done)done(); return false; }
    var el=document.createElement('div'); el.id=ZCUT.ID; el.style.cssText='position:fixed;inset:0;z-index:9990;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .5s ease;cursor:pointer';
    el.innerHTML='<div class="zcut-bar" style="position:absolute;left:0;right:0;top:0;height:11vh;background:#000;z-index:2"></div><div class="zcut-bar" style="position:absolute;left:0;right:0;bottom:0;height:11vh;background:#000;z-index:2"></div>'+
      '<img class="zcut-img" style="max-width:100%;max-height:78vh;object-fit:contain;opacity:0;transition:opacity .6s ease">'+
      '<div class="zcut-cap" style="position:absolute;left:0;right:0;bottom:13vh;text-align:center;font:italic 600 22px Georgia,serif;color:#fff4d8;text-shadow:0 2px 8px #000;z-index:3;padding:0 6vw"></div>'+
      '<button class="zcut-skip" style="position:absolute;right:18px;bottom:3vh;z-index:4;font:600 13px Segoe UI,sans-serif;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);background:rgba(20,20,26,.7);color:#eee;cursor:pointer">Skip ▶▶</button>';
    document.body.appendChild(el); var img=el.querySelector('.zcut-img'), cap=el.querySelector('.zcut-cap'), i=-1, timer=null, ended=false;
    var end=function(){ if(ended)return; ended=true; el.id='zcut-closing'; clearTimeout(timer); document.removeEventListener('keydown',key,true); el.style.opacity='0'; setTimeout(function(){ el.remove(); if(done)done(); },500); };
    var next=function(){ clearTimeout(timer); i++; if(i>=S.length){ end(); return; } var id=S[i][0], line=S[i][1]; img.style.opacity='0'; cap.textContent='';
      var show=function(src){ if(ended)return; img.onload=function(){ img.style.opacity='1'; cap.textContent=line; }; img.src=src; timer=setTimeout(next,ZCUT.HOLD); };
      var v=el.querySelector('.zcut-vid'), vsrc=typeof ZVID!=='undefined'&&ZVID.src(id); if(v){ try{ v.pause(); }catch(e){} v.style.opacity='0'; }
      if(vsrc){ if(!v){ v=document.createElement('video'); v.className='zcut-vid'; v.playsInline=true; v.setAttribute('playsinline',''); v.preload='auto'; v.style.cssText=img.style.cssText; el.insertBefore(v,img); }      /* round 73: the clip in place of the still (07zvc) */
        v.muted=!ZVID.sound; v.style.display=''; img.style.display='none'; var ok=false;
        v.onloadeddata=function(){ if(ended||ok)return; ok=true; v.style.opacity='1'; cap.textContent=line; try{ var pp=v.play(); if(pp&&pp.catch)pp.catch(function(){}); }catch(e){} timer=setTimeout(next,Math.max(ZCUT.HOLD,(v.duration||8)*1000+1200)); };
        v.onerror=function(){ if(ok||ended)return; ok=true; v.style.display='none'; img.style.display=''; var s2=ZCUT.painted(id); if(s2)show(s2); else ZCUT.placeholder(boss,ph,i,line,show); };
        v.src=vsrc; return; }
      if(v)v.style.display='none'; img.style.display='';
      var src=ZCUT.painted(id); if(src)show(src); else ZCUT.placeholder(boss,ph,i,line,show); };
    var key=function(e){ if(!ZCUT.isOpen())return; e.preventDefault(); e.stopImmediatePropagation(); if(e.key==='Escape')end(); else if(e.key===' '||e.key==='Enter')next(); };
    document.addEventListener('keydown',key,true); el.querySelector('.zcut-skip').onclick=function(e){ e.stopPropagation(); end(); }; el.onclick=function(){ next(); };
    requestAnimationFrame(function(){ el.style.opacity='1'; }); next(); return true; }
};
setTimeout(function(){
  if(typeof PAUSE_OVERLAYS!=='undefined'&&PAUSE_OVERLAYS.indexOf(ZCUT.ID)<0)PAUSE_OVERLAYS.push(ZCUT.ID);      // the fight waits while it plays
  if(typeof BossPhases==='undefined')return; var s0=BossPhases.spawn;
  BossPhases.spawn=function(scene,key,phase,x,y,mult){ var L=s0.apply(this,arguments); try{ if(ZCUT.SETS[key+'_'+phase]&&scene&&!scene._inspect&&L&&L.length){
      if(phase>1)ZCUT.play(key,phase);
      else if(!ZCUT.seen[key]){ ZCUT.seen[key]=1; setTimeout(function(){ if(scene.sys&&scene.sys.isActive())ZCUT.play(key,1); },700); } }      // the intro: once a visit to the game, not on every retry
    }catch(e){ console.warn('cut-scene',e); } return L; };
},0);
