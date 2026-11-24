// ═══════════════════════════════════════════════════════════════════════
// ║ 21w2-mana-reveal.js — round 130 (Kris: "i would like to not have the mana bar shown until you have your first spell to cast. there
// ║ should be some ceremony and NPC telling you about the mana bar being added and showing you where. it also should glow and shimmer in
// ║ color a bit"; and: "we should only add the rings once you have a ranged weapon, bow, crossbow or spells. Let's also make some ceremony
// ║ around when this gets added and some NPC that helps show you how to target and holding for more power").
// ║  · The mana arc is hidden until the hero has a spell (a tome equipped, carried or learned). The first time: ZCER.mana() — today a short
// ║    reveal (the arc draws itself in, glows, a line points to it); the ceremony Kris picks in Lab › "First spell & first bow" replaces it.
// ║  · The arc shimmers: ZMANA.STYLE — 'drift' (colours flow along it, the default until picked), 'breathe', 'motes', 'fill'.
// ║  · The gold ring (09s3) shows only with a bow, crossbow or spell equipped, and only after its first showing: ZCER.ring().
// ═══════════════════════════════════════════════════════════════════════
var ZMANA={ STYLE:'drift',
  has:function(ps){ if(!ps)return false; if(ps.manaShown)return true; var e=ps.equip||{}; if(e.spell&&ITEMS[e.spell]&&ITEMS[e.spell].spellId)return true; if((ps.spellsLearned||[]).length)return true;
    return (ps.inventory||[]).some(function(id){ var it=ITEMS[id]; return it&&it.spellId; }); } };
var ZCER={ on:true, busy:false,
  // the first spell: the mana arc appears
  mana:function(ps){ if(ps.manaShown)return; ps.manaShown=true; var M=document.querySelector('#zhud .zh-mana'); if(M){ M.classList.remove('zm-hide'); M.classList.add('zm-reveal'); setTimeout(function(){ M.classList.remove('zm-reveal'); },4200); }
    ZCER.point(M,'✨ Your mana has woken — this aurora arc. Spells draw on it, and it fills again as you go.'); try{ var ws=_heroWS(); if(ws&&ws._save)ws._save(); }catch(e){} },
  // the first bow, crossbow or spell in hand: the gold ring
  ring:function(ps){ if(ps.aimSeen)return; ps.aimSeen=true; if(typeof showNotif==='function')showNotif('🎯 The gold ring marks the foe you will hit. Tap Ctrl or X to shoot it — hold for more power (×1.5, ×2) — press a direction while holding to switch foes.','#ffe066');
    try{ var ws=_heroWS(); if(ws&&ws._save)ws._save(); }catch(e){} },
  // a glowing pointer to a piece of the HUD, with a line
  point:function(el,txt){ if(!el||typeof document==='undefined')return; var r=el.getBoundingClientRect(), d=document.createElement('div'); d.className='zcer-pt'; d.innerHTML='<i></i><span>'+txt+'</span>';
    d.style.left=Math.round(r.left)+'px'; d.style.top=Math.round(r.bottom+8)+'px'; document.body.appendChild(d); setTimeout(function(){ d.classList.add('out'); },6500); setTimeout(function(){ d.remove(); },7300); } };
(function(){ if(typeof ZHUD==='undefined'||typeof document==='undefined')return;
  var r0=ZHUD.render; ZHUD.render=function(ps){ r0.apply(ZHUD,arguments); var M=document.querySelector('#zhud .zh-mana'); if(!M||!ps)return; var has=ZMANA.has(ps);
    M.classList.toggle('zm-hide',!has&&!ps.manaShown); ['drift','breathe','motes','fill'].forEach(function(s){ M.classList.toggle('zm-'+s,ZMANA.STYLE===s); });
    if(ZMANA.STYLE==='fill'){ var f=Math.max(0,Math.min(1,(ps.mana||0)/(ps.maxMana||50))); M.style.setProperty('--zmh',Math.round((1-f)*70)+'deg'); }
    if(has&&!ps.manaShown&&ZCER.on&&ZHUD.visible())ZCER.mana(ps); };
  var st=document.createElement('style'); st.textContent=
    '#zhud .zh-mana.zm-hide{display:none}'+
    '#zhud .zh-mana.zm-drift i{background:linear-gradient(90deg,#4ff0a0,#4fb8ff,#9f6fff,#4fb8ff,#4ff0a0);background-size:200% 100%;animation:zmDrift 6s linear infinite}@keyframes zmDrift{to{background-position:-200% 0}}'+
    '#zhud .zh-mana.zm-breathe i{animation:zmBreathe 2.8s ease-in-out infinite}@keyframes zmBreathe{50%{filter:brightness(1.3) saturate(1.2);box-shadow:0 0 16px #8fb8ff}}'+
    '#zhud .zh-mana.zm-motes i::after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#fff 0 1px,transparent 1.6px),radial-gradient(circle,#d8f0ff 0 .8px,transparent 1.3px);background-size:17px 11px,11px 9px;background-position:0 2px,5px 6px;animation:zmMotes 3.5s linear infinite;opacity:.65}@keyframes zmMotes{to{background-position:-34px 2px,-11px 6px}}'+
    '#zhud .zh-mana.zm-fill i{filter:hue-rotate(var(--zmh,0deg));background:linear-gradient(90deg,#4ff0a0,#4fb8ff,#9f6fff,#4fb8ff,#4ff0a0);background-size:200% 100%;animation:zmDrift 8s linear infinite}'+
    '#zhud .zh-mana.zm-reveal{animation:zmIn 1.4s ease-out both,zmGlow 1.2s ease-in-out 1.4s 2}@keyframes zmIn{from{clip-path:inset(0 100% 0 0);box-shadow:0 0 0 #fff}to{clip-path:inset(0 0 0 0)}}@keyframes zmGlow{50%{box-shadow:0 0 18px 4px #9fd0ff;border-color:#e6f4ff}}'+
    '.zcer-pt{position:absolute;z-index:120;display:flex;align-items:flex-start;gap:6px;max-width:300px;pointer-events:none;animation:zcpIn .5s ease-out;transition:opacity .8s}.zcer-pt.out{opacity:0}'+
    '.zcer-pt i{width:14px;height:14px;border-left:2px solid #9fd0ff;border-top:2px solid #9fd0ff;transform:rotate(45deg);margin:4px 2px 0 8px;filter:drop-shadow(0 0 4px #9fd0ff)}'+
    '.zcer-pt span{background:rgba(8,18,30,.92);border:1px solid #6f9fff;border-radius:9px;padding:7px 10px;font:600 12px "Segoe UI";color:#e6f0ff;box-shadow:0 0 14px rgba(111,159,255,.35)}@keyframes zcpIn{from{opacity:0;transform:translateY(-6px)}}';
  document.head.appendChild(st);
  // the ring: only with a ranged weapon or a spell in hand, and only once it has been shown
  if(typeof ZAIM129!=='undefined'){ var a0=ZAIM129.armed; ZAIM129.armed=function(){ var A=a0.apply(ZAIM129,arguments), ps=ZAIM129.ps(); if(A&&ps&&!ps.aimSeen&&ZCER.on)ZCER.ring(ps); return A; }; }
})();
