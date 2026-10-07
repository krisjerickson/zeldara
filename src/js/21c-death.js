// ═══════════════════════════════════════════════════════════════════════
// ║ 21c-death.js — the hero's death: what happens on screen while he falls, a pop-up that tells what
// ║ happened and what it cost, and a button to rise again (round 33).
// ║ Ten designs for Kris to choose from (ZDEATH.LOOKS). The chosen one is ZDeath.pick (saved in the browser as
// ║ zeldara_death; Dev panel → "Death screen"). Until he chooses, design 1 is used.
// ║ The rules of dying are unchanged (10 % of the gold, wake in the village at 25 % health): the penalty is
// ║ applied by the scene as before, and this file only shows it. Flow:
// ║   ZDeath.run(scene, info, apply)   1. the dying effect over the scene (about 1.3 s; the game holds still)
// ║                                    2. apply() — the scene's own penalty and move to the village
// ║                                    3. the pop-up; the game stays paused (PAUSE_OVERLAYS) until the button
// ║   info: {area, foe}  — where he fell and who struck last (ps._lastFoe, set by the monster engine)
// ║ ZDeath.auto=true (the test harness) skips the effect and the pop-up: apply() runs at once, as before round 33.
// ║ ZDeath.preview(n) shows design n with made-up numbers and takes nothing.
// ═══════════════════════════════════════════════════════════════════════
var ZDEATH={
  // fx: what the screen does while he falls — tint (CSS filter on the game), veil (colour that closes in), bits (what drifts), shake, zoom
  // title / lines / gold / wake / btn: the words. {area} {foe} {gold} {fam} {name} {n} are filled in. gold0 is used when nothing was lost.
  LOOKS:[
    {id:'green', name:'The Green calls you home', mood:'gentle, magical',
      fx:{tint:'saturate(.55) brightness(.8) hue-rotate(-12deg)', veil:'#0a3a3a', bits:'motes', col:'#6fe3f5'},
      title:'The Green calls you home', sub:'You fell in {area}',
      lines:['{foe_cap} struck true, and the world went quiet.','But the old tree on the Runestone Green keeps a root in every hero. It drew your spirit back along the ley lines, and set you down where your journey began.'],
      gold:'The crossing has a price: {gold} gold scattered on the wind.', gold0:'Your purse was empty — the Green asked nothing.', wake:'You wake on the Green, sore and at a quarter of your strength.', btn:'Rise again'},
    {id:'classic', name:'You have fallen', mood:'classic, serious',
      fx:{tint:'grayscale(.9) brightness(.6)', veil:'#200404', bits:'ash', col:'#ff5544', shake:1},
      title:'You have fallen', sub:'{area_cap}',
      lines:['{foe_cap} was too strong this time.','The villagers found you at dusk and carried you home on a door.'],
      gold:'Lost on the road: {gold} gold.', gold0:'You had no gold to lose.', wake:'Health restored to 25 %.', btn:'Revive'},
    {id:'fairy', name:"The fairy's bargain", mood:'playful',
      fx:{tint:'saturate(1.2) brightness(.85) hue-rotate(40deg)', veil:'#2a1040', bits:'sparkles', col:'#ffb0f0'},
      title:"A fairy's bargain", sub:'She found you in {area}',
      lines:['"Oh dear. Oh DEAR. {foe_cap} made a proper mess of you, didn\'t it?"','A fairy no bigger than your thumb sat on your nose, tutting. "I can fly you home. It is not free. Fairies have expenses."'],
      gold:'She took {gold} gold, counted it twice, and kept the shiniest coin for luck.', gold0:'She shook your empty purse, sighed, and flew you home anyway. "You owe me."', wake:'You wake in the village with glitter in your hair.', btn:'Pay the toll and wake'},
    {id:'familiar', name:"The familiar's vigil", mood:'warm',
      fx:{tint:'grayscale(.6) brightness(.75) sepia(.25)', veil:'#1a1408', bits:'motes', col:'#ffd27a'},
      title:'{fam_cap} would not leave you', sub:'You fell in {area}',
      lines:['When {foe} left you for dead, {fam} did not.','It tugged at your sleeve, then your collar, and when that did not work it went for help — all the way to the village and back, without stopping once.'],
      gold:'Somewhere on the way home {gold} gold slipped out of your pack. {fam_cap} looks very sorry about it.', gold0:'Your purse was already empty. {fam_cap} checked.', wake:'You wake by the well, a small warm weight asleep on your chest.', btn:'Get up'},
    {id:'tavern', name:'A tavern tale', mood:'funny, told by Rolf',
      fx:{tint:'sepia(.7) brightness(.7)', veil:'#1c0e04', bits:'none', col:'#e0a040'},
      title:'"So there you were…"', sub:'as told by Rolf, at the tavern',
      lines:['"…flat on your back in {area}, with {foe} standing over you, and what do you do? You faint. Magnificent."','"Two farmhands and a goat got you home. The goat did most of the work."'],
      gold:'"They say {gold} gold fell out of your pockets on the way. Nobody has seen it since. Nobody is looking very hard."', gold0:'"Nothing in your pockets but lint, they tell me. Even the goat was embarrassed."', wake:'"Drink this. You look like a quarter of a hero."', btn:'Back on your feet'},
    {id:'rune', name:'The rune of return', mood:'solemn, carved in stone',
      fx:{tint:'brightness(.55) contrast(1.2)', veil:'#04101a', bits:'runes', col:'#6fe3f5', zoom:1},
      title:'ᚱ  The rune of return  ᚱ', sub:'Spent in {area}',
      lines:['Every hero of Zeldara carries one rune that cannot be seen.','When {foe} struck the last blow it burned bright, broke, and carried you home. It will grow back. It always does.'],
      gold:'Its price is paid in gold: {gold}.', gold0:'It asked for gold and found none. It carried you all the same.', wake:'You stand on the Runestone Green at a quarter of your strength.', btn:'Trace the rune'},
    {id:'chronicle', name:'A page of the chronicle', mood:'storybook',
      fx:{tint:'sepia(.85) brightness(.85)', veil:'#2a2010', bits:'none', col:'#c8a868'},
      title:'Chapter the Next', sub:'in which the hero is soundly beaten',
      lines:['It was in {area} that our hero met {foe}, and it must be written that the meeting went badly.','The chroniclers disagree on whether there was screaming. They agree on the running, and on how it ended.'],
      gold:'Lost in the retreat: {gold} gold pieces, one boot (later recovered), and some dignity (not).', gold0:'Lost in the retreat: one boot (later recovered) and some dignity (not). The purse was empty already.', wake:'The hero woke in the village, level {n}, a quarter mended, and wiser.', btn:'Turn the page'},
    {id:'ragnarok', name:"Ragnarök's shadow", mood:'fierce',
      fx:{tint:'contrast(1.4) saturate(1.5) brightness(.6) hue-rotate(-20deg)', veil:'#300000', bits:'embers', col:'#ff6020', shake:2, crack:1},
      title:'DEFEATED', sub:'{foe_cap} stands over you',
      lines:['{area_cap} has claimed stronger heroes than you.','Not today. Not while there is breath to drag yourself home.'],
      gold:'{gold} gold lies in the dirt behind you. Leave it. Come back for blood.', gold0:'You have nothing left to lose but the fight.', wake:'A quarter of your strength remains. It will have to be enough.', btn:'Defy death'},
    {id:'spirit', name:'The spirit walk', mood:'calm, ghostly',
      fx:{tint:'grayscale(1) brightness(.8) sepia(.4) hue-rotate(170deg) saturate(2)', veil:'#061428', bits:'wisps', col:'#9fd0ff', zoom:1},
      title:'The spirit walk', sub:'Your body lies in {area}',
      lines:['For a while you were lighter than air. You saw {foe} turn away, the trees from above, the rivers like silver thread.','Something kind took your hand and walked you home.'],
      gold:'Spirits carry no coin: {gold} gold stayed behind.', gold0:'Spirits carry no coin, and you had none to leave.', wake:'Your body is waiting on the Green, a quarter mended.', btn:'Return to your body'},
    {id:'healer', name:"The healer's bill", mood:'funny, an itemised bill',
      fx:{tint:'brightness(.7) saturate(.7)', veil:'#101810', bits:'none', col:'#80d090'},
      title:"Morwen's Apothecary — your bill", sub:'Patient brought in from {area}',
      lines:['Injuries: several. Cause: {foe}. Advice: stop doing that.'],
      bill:[['Bandages, a great many',0.3],['One (1) foul-tasting potion',0.35],['Carrying you up the stairs',0.2],['Listening to you groan',0.15]],
      gold:'Total: {gold} gold. Paid in full from your purse while you slept.', gold0:'Total: nothing. You had nothing. Morwen has written your name in the book.', wake:'Discharged at 25 % health, against medical advice.', btn:'Pay and go'}
  ]
};
var ZDeath={
  auto:false, busy:false,
  pick:(function(){ try{ var v=parseInt(localStorage.getItem('zeldara_death'),10); return v>=1&&v<=10?v:1; }catch(e){ return 1; } })(),
  set:function(n){ ZDeath.pick=Math.max(1,Math.min(ZDEATH.LOOKS.length,n|0)); try{ localStorage.setItem('zeldara_death',String(ZDeath.pick)); }catch(e){} },
  look:function(n){ return ZDEATH.LOOKS[(n||ZDeath.pick)-1]||ZDEATH.LOOKS[0]; },
  _cap:function(s){ s=String(s||''); return s.charAt(0).toUpperCase()+s.slice(1); },
  // the words of one design with this death's facts filled in
  text:function(L,I){ var foe=I.foe?('the '+I.foe).replace(/^the (the|a|an) /i,'the '):'the dark', fam=I.fam||'a stray village dog', M={area:I.area||'battle',foe:foe,gold:String(I.gold||0),fam:fam,n:String(I.level||1)};
    M.area_cap=ZDeath._cap(M.area); M.foe_cap=ZDeath._cap(M.foe); M.fam_cap=ZDeath._cap(M.fam);
    var f=function(s){ return String(s||'').replace(/\{([a-z_]+)\}/g,function(_,k){ return M[k]!==undefined?M[k]:''; }); };
    return {title:f(L.title),sub:f(L.sub),lines:(L.lines||[]).map(f),gold:f(I.gold>0?L.gold:L.gold0),wake:f(L.wake),btn:f(L.btn),
      bill:L.bill&&I.gold>0?(function(){ var left=I.gold; return L.bill.map(function(b,i){ var v=i===L.bill.length-1?left:Math.round(I.gold*b[1]); left-=v; return [b[0],v]; }); })():null}; },
  _css:function(){ if(document.getElementById('zdeath-css'))return; var st=document.createElement('style'); st.id='zdeath-css'; st.textContent=
    '#zdeath-fx{position:fixed;inset:0;z-index:900;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.1s ease-in}'+
    '#zdeath-fx.on{opacity:1}#zdeath-fx .veil{position:absolute;inset:0}#zdeath-fx .bit{position:absolute;bottom:-20px;border-radius:50%;animation:zdRise linear infinite}'+
    '#zdeath-fx .bit.fall{bottom:auto;top:-20px;animation-name:zdFall}#zdeath-fx .bit.rune{border-radius:0;background:none!important;font:700 20px serif;text-shadow:0 0 8px currentColor}'+
    '#zdeath-fx .crack{position:absolute;inset:0;background:linear-gradient(115deg,transparent 49.6%,rgba(255,220,200,.75) 49.8%,transparent 50.2%),linear-gradient(62deg,transparent 39.7%,rgba(255,220,200,.55) 39.9%,transparent 40.2%),linear-gradient(170deg,transparent 60.6%,rgba(255,220,200,.5) 60.8%,transparent 61.1%);animation:zdCrack .5s steps(3) both}'+
    '@keyframes zdRise{from{transform:translate(0,0);opacity:0}15%{opacity:.9}to{transform:translate(var(--dx),-110vh);opacity:0}}@keyframes zdFall{from{transform:translate(0,0);opacity:0}15%{opacity:.8}to{transform:translate(var(--dx),110vh);opacity:0}}@keyframes zdCrack{from{opacity:0;transform:scale(1.4)}to{opacity:1;transform:scale(1)}}'+
    '#modal-death{position:fixed;inset:0;z-index:950;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.35);font-family:var(--zf-label,"Segoe UI",sans-serif)}'+
    '#modal-death .zd{position:relative;width:min(560px,92vw);max-height:90vh;overflow:auto;padding:26px 30px 22px;border-radius:14px;color:#e8f0e8;text-align:center;animation:zdIn .7s cubic-bezier(.2,.9,.3,1.1) both;'+
      'background:linear-gradient(180deg,#0e1f1a,#07120f);border:2px solid #0a0c0a;box-shadow:0 0 0 1px var(--zc),inset 2px 2px 0 rgba(63,230,242,.28),inset -2px -2px 0 rgba(192,75,224,.25),0 18px 60px rgba(0,0,0,.75),0 0 80px -20px var(--zc)}'+
    '@keyframes zdIn{from{opacity:0;transform:translateY(26px) scale(.94)}to{opacity:1;transform:none}}'+
    '#modal-death .zd-ico{font-size:40px;line-height:1;margin-bottom:6px;filter:drop-shadow(0 0 12px var(--zc))}'+
    '#modal-death h2{font-family:var(--zf-title,Georgia,serif);font-size:27px;letter-spacing:.06em;margin:0 0 4px;color:var(--zc);text-shadow:0 0 18px var(--zc),0 2px 0 #000}'+
    '#modal-death .zd-sub{font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.65;margin-bottom:16px}'+
    '#modal-death p{font-size:14.5px;line-height:1.55;margin:0 0 10px;color:#d6e2d8}'+
    '#modal-death .zd-gold{margin:14px auto 8px;padding:10px 14px;border-radius:8px;background:rgba(0,0,0,.35);border:1px solid rgba(255,215,0,.35);color:#ffe9a8;font-size:14px}'+
    '#modal-death .zd-gold b{color:#ffd700;font-size:17px}#modal-death .zd-wake{font-size:12.5px;color:#9fe0b0;margin:6px 0 18px}'+
    '#modal-death table{margin:4px auto 10px;border-collapse:collapse;font-size:13.5px;min-width:70%}#modal-death td{padding:3px 8px;border-bottom:1px dashed rgba(255,255,255,.18);text-align:left}#modal-death td:last-child{text-align:right;color:#ffe9a8}'+
    '#modal-death button{font-family:var(--zf-head,inherit);font-size:17px;letter-spacing:.08em;padding:11px 34px;border-radius:9px;cursor:pointer;color:#06140f;background:linear-gradient(180deg,#fff,var(--zc));border:2px solid #06140f;box-shadow:0 0 0 1px var(--zc),0 0 26px -4px var(--zc);animation:zdPulse 1.6s ease-in-out infinite}'+
    '#modal-death button:hover{filter:brightness(1.15)}@keyframes zdPulse{50%{box-shadow:0 0 0 1px var(--zc),0 0 40px 2px var(--zc)}}'+
    '#modal-death .zd-n{position:absolute;top:8px;right:12px;font-size:10px;opacity:.45;letter-spacing:.1em}'+
    // each design's own dress
    '#modal-death .zd.classic{background:linear-gradient(180deg,#1c0808,#0a0303);border-radius:4px}#modal-death .zd.classic h2{font-size:34px;letter-spacing:.2em;text-transform:uppercase}'+
    '#modal-death .zd.fairy{background:radial-gradient(circle at 50% 0,#3a1850,#150a22 70%);border-radius:28px}#modal-death .zd.fairy p{font-style:italic}'+
    '#modal-death .zd.familiar{background:linear-gradient(180deg,#2a2010,#120c06)}'+
    '#modal-death .zd.tavern,#modal-death .zd.chronicle{background:linear-gradient(180deg,#e8d8b0,#c8b080);color:#3a2812;border-color:#3a2812;box-shadow:0 0 0 1px #8a6a3a,inset 0 0 50px rgba(120,80,30,.35),0 18px 60px rgba(0,0,0,.75)}'+
    '#modal-death .zd.tavern p,#modal-death .zd.chronicle p{color:#3a2812;font-family:Georgia,serif;font-size:15.5px}#modal-death .zd.tavern h2,#modal-death .zd.chronicle h2{color:#6a2a10;text-shadow:none}'+
    '#modal-death .zd.tavern .zd-gold,#modal-death .zd.chronicle .zd-gold{background:rgba(90,50,10,.12);border-color:#8a6a3a;color:#4a2a08}#modal-death .zd.tavern .zd-gold b,#modal-death .zd.chronicle .zd-gold b{color:#8a3a00}'+
    '#modal-death .zd.tavern .zd-wake,#modal-death .zd.chronicle .zd-wake{color:#2a5a2a}#modal-death .zd.tavern button,#modal-death .zd.chronicle button{background:linear-gradient(180deg,#8a4a1a,#5a2a0a);color:#f8e8c0;border-color:#2a1404;animation:none;box-shadow:0 3px 0 #2a1404}'+
    '#modal-death .zd.chronicle p:first-of-type::first-letter{font-size:44px;float:left;line-height:.9;padding:4px 6px 0 0;color:#8a2a10;font-family:var(--zf-title,Georgia,serif)}#modal-death .zd.chronicle{text-align:left}#modal-death .zd.chronicle h2,#modal-death .zd.chronicle .zd-sub,#modal-death .zd.chronicle .zd-ico{text-align:center}#modal-death .zd.chronicle button{display:block;margin:0 auto}'+
    '#modal-death .zd.rune{background:linear-gradient(180deg,#2a3038,#12161c);border-radius:2px;clip-path:polygon(14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px),0 14px)}#modal-death .zd.rune h2{letter-spacing:.14em}'+
    '#modal-death .zd.ragnarok{background:linear-gradient(180deg,#2a0606,#0a0000);border-radius:0;transform:rotate(-.6deg)}#modal-death .zd.ragnarok h2{font-size:48px;letter-spacing:.24em;color:#ff5030}#modal-death .zd.ragnarok button{background:linear-gradient(180deg,#ffb060,#d02000);color:#fff;text-shadow:0 1px 0 #400}'+
    '#modal-death .zd.spirit{background:linear-gradient(180deg,rgba(20,40,80,.82),rgba(6,14,34,.9));backdrop-filter:blur(4px);border-radius:40px 40px 14px 14px}#modal-death .zd.spirit p{color:#cfe2ff}'+
    '#modal-death .zd.healer{background:#f4f0e4;color:#22301e;border-radius:3px;border-color:#22301e;font-family:"Courier New",monospace;box-shadow:0 18px 60px rgba(0,0,0,.75);transform:rotate(.8deg)}#modal-death .zd.healer p{color:#22301e;font-family:inherit}#modal-death .zd.healer h2{color:#22301e;text-shadow:none;font-family:inherit;font-size:20px;border-bottom:2px solid #22301e;padding-bottom:8px}'+
    '#modal-death .zd.healer td{border-color:#22301e55}#modal-death .zd.healer td:last-child{color:#22301e}#modal-death .zd.healer .zd-gold{background:none;border:2px solid #a02020;color:#a02020;transform:rotate(-2deg);font-weight:700}#modal-death .zd.healer .zd-gold b{color:#a02020}#modal-death .zd.healer .zd-wake{color:#2a5a2a}#modal-death .zd.healer button{background:#22301e;color:#f4f0e4;animation:none;box-shadow:none;font-family:inherit}';
    document.head.appendChild(st); },
  _ICO:{green:'🌳',classic:'💀',fairy:'🧚',familiar:'🐾',tavern:'🍺',rune:'ᚱ',chronicle:'📖',ragnarok:'⚔️',spirit:'👻',healer:'🧪'},
  // 1. the dying effect over the whole game
  fx:function(L,scene){ ZDeath._css(); ZDeath.fxOff(); var F=L.fx||{}, host=document.createElement('div'); host.id='zdeath-fx';
    var veil=document.createElement('div'); veil.className='veil'; veil.style.background='radial-gradient(ellipse at 50% 50%,transparent 18%,'+(F.veil||'#000')+' 92%)'; host.appendChild(veil);
    if(F.crack){ var ck=document.createElement('div'); ck.className='crack'; host.appendChild(ck); }
    var kind=F.bits||'motes', n=kind==='none'?0:kind==='runes'?16:34, RUN='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊ';
    for(var i=0;i<n;i++){ var b=document.createElement('div'), sz=kind==='embers'?3+Math.random()*4:kind==='ash'?2+Math.random()*4:kind==='wisps'?10+Math.random()*16:4+Math.random()*6; b.className='bit'+(kind==='ash'?' fall':'')+(kind==='runes'?' rune':'');
      b.style.left=(Math.random()*100)+'%'; b.style.setProperty('--dx',((Math.random()-0.5)*160)+'px'); b.style.animationDuration=(2.2+Math.random()*3)+'s'; b.style.animationDelay=(-Math.random()*3)+'s';
      if(kind==='runes'){ b.textContent=RUN.charAt(i%RUN.length); b.style.color=F.col||'#6fe3f5'; } else { b.style.width=b.style.height=sz+'px'; b.style.background=kind==='ash'?'rgba(200,200,200,.6)':(F.col||'#fff'); b.style.boxShadow=kind==='ash'?'none':'0 0 '+(sz*2)+'px '+(F.col||'#fff'); if(kind==='wisps')b.style.opacity='.35'; if(kind==='sparkles')b.style.clipPath='polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)'; }
      host.appendChild(b); }
    document.body.appendChild(host); var cv=document.querySelector('#game-container canvas')||document.querySelector('canvas'); if(cv){ cv.style.transition='filter 1.1s ease-in'; cv.style.filter=F.tint||'grayscale(.8) brightness(.6)'; }
    requestAnimationFrame(function(){ host.classList.add('on'); });
    try{ if(scene&&scene.cameras&&scene.cameras.main){ var cam=scene.cameras.main; if(F.shake)cam.shake(F.shake>1?700:350,F.shake>1?0.014:0.007); cam.flash(220,255,F.shake?60:230,F.shake?40:230); if(F.zoom&&scene.tweens){ var z0=cam.zoom; scene.tweens.add({targets:cam,zoom:z0*1.12,duration:1200,ease:'Sine.inOut',onComplete:function(){ cam.setZoom(z0); }}); } }
      var hs=scene&&scene._zHeroSpr; if(hs&&hs.active&&scene.tweens){ hs._zdA=hs.alpha; hs._zdR=hs.angle; scene.tweens.add({targets:hs,angle:L.id==='spirit'||L.id==='green'?0:90,alpha:L.id==='spirit'||L.id==='green'||L.id==='rune'?0.15:0.75,duration:900,ease:'Quad.in'}); }
      if(typeof ZSFX!=='undefined')ZSFX.play(F.shake?'boom':'warp',{big:1.2}); }catch(e){} },
  fxOff:function(scene){ var h=document.getElementById('zdeath-fx'); if(h)h.remove(); var cv=document.querySelector('#game-container canvas')||document.querySelector('canvas'); if(cv){ cv.style.transition='filter .6s ease-out'; cv.style.filter=''; }
    try{ var hs=scene&&scene._zHeroSpr; if(hs&&hs.active&&hs._zdA!==undefined){ hs.setAlpha(hs._zdA).setAngle(hs._zdR||0); delete hs._zdA; } }catch(e){} },
  // 3. the pop-up
  show:function(L,I,done){ ZDeath._css(); var T=ZDeath.text(L,I), el=document.getElementById('modal-death'); if(!el){ el=document.createElement('div'); el.id='modal-death'; document.body.appendChild(el); }
    var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }, gold=esc(T.gold).replace(/(\d+) gold/,'<b>$1</b> gold').replace(/gold: (\d+)/,'gold: <b>$1</b>');
    el.innerHTML='<div class="zd '+L.id+'" style="--zc:'+((L.fx&&L.fx.col)||'#6fe3f5')+'">'+(I.preview?'<div class="zd-n">DESIGN '+I.preview+' OF '+ZDEATH.LOOKS.length+' · PREVIEW</div>':'')+
      '<div class="zd-ico">'+(ZDeath._ICO[L.id]||'💀')+'</div><h2>'+esc(T.title)+'</h2><div class="zd-sub">'+esc(T.sub)+'</div>'+T.lines.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('')+
      (T.bill?'<table>'+T.bill.map(function(b){ return '<tr><td>'+esc(b[0])+'</td><td>'+b[1]+' g</td></tr>'; }).join('')+'</table>':'')+
      '<div class="zd-gold">'+gold+'</div><div class="zd-wake">'+esc(T.wake)+'</div><button id="zdeath-btn">'+esc(T.btn)+'</button></div>';
    el.style.display='flex'; var btn=document.getElementById('zdeath-btn'), fin=false, go=function(){ if(fin)return; fin=true; el.style.display='none'; el.innerHTML=''; document.removeEventListener('keydown',key,true); done&&done(); },
      key=function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.stopPropagation(); if(Date.now()-t0>600)go(); } }, t0=Date.now();
    btn.onclick=go; document.addEventListener('keydown',key,true); try{ btn.focus(); }catch(e){} },
  // the whole flow. apply() = the scene's own penalty and move; it returns (or sets ZDeath._lost to) the gold taken
  run:function(scene,info,apply){ var ps=(typeof _heroWS==='function'&&_heroWS()&&_heroWS().playerState)||{};
    if(ZDeath.auto||typeof document==='undefined'){ apply(); return; } if(ZDeath.busy)return; ZDeath.busy=true;
    var L=ZDeath.look(), g0=ps.gold||0, I={area:info&&info.area,foe:(info&&info.foe)||ps._lastFoe,level:ps.level,fam:ZDeath._fam(ps)};
    ZDeath.fx(L,scene); ZDeath._hold=true;
    setTimeout(function(){ try{ apply(); }catch(e){ if(typeof console!=='undefined')console.error(e); } I.gold=Math.max(0,g0-(ps.gold||0));
      ZDeath.show(L,I,function(){ ZDeath._hold=false; ZDeath.busy=false; ZDeath.fxOff(scene); try{ var ws=_heroWS(); if(ws&&ws.cameras&&ws.cameras.main)ws.cameras.main.flash(500,200,255,240); if(typeof ZSFX!=='undefined')ZSFX.play('warp'); }catch(e){} }); },1300); },
  _fam:function(ps){ try{ var f=ps.familiar; return f&&typeof FAMILIARS!=='undefined'&&FAMILIARS[f]?FAMILIARS[f].n:null; }catch(e){ return null; } },
  // Dev panel: look at a design without dying
  preview:function(n){ if(ZDeath.busy)return; ZDeath.busy=true; var L=ZDeath.look(n||ZDeath.pick), ws=typeof _heroWS==='function'&&_heroWS(), ps=(ws&&ws.playerState)||{}, sc=null;
    try{ sc=game.scene.getScenes(true).filter(function(s){ return s.sys.settings.key!=='Title'; })[0]; }catch(e){}
    ZDeath.fx(L,sc); setTimeout(function(){ ZDeath.show(L,{area:'the Whispering Barrow',foe:'Goblin King',gold:84,level:ps.level||7,fam:ZDeath._fam(ps)||'Sprig',preview:n||ZDeath.pick},function(){ ZDeath.busy=false; ZDeath.fxOff(sc); }); },1300); }
};
// Dev panel buttons
function sbDeathPick(){ ZDeath.set(ZDeath.pick%ZDEATH.LOOKS.length+1); sbDeathInit(); }
function sbDeathPreview(){ if(typeof closeModal==='function'){ closeModal('sandbox'); } setTimeout(function(){ ZDeath.preview(ZDeath.pick); },250); }
function sbDeathInit(){ var b=typeof document!=='undefined'&&document.getElementById('sb-death'); if(b)b.textContent='💀 Death screen: '+ZDeath.pick+' — '+ZDeath.look().name; }
if(typeof document!=='undefined')setTimeout(sbDeathInit,0);
