// ═══════════════════════════════════════════════════════════════════════
// ║ 22c2-inv-vitals.js — round 137 (Kris: "When in inventory, you need to be able to see your health and mana, so you know how much you are
// ║ healing and how much you still need to use potions and food").
// ║ The inventory opens with two bars across its top — health and mana, with numbers — that move as you eat and drink, and a little
// ║ "+12" rises from the bar each time something heals you. (The numbers in the stats under your gear stay as they were.)
// ║ Switch: ZVIT.on.
// ═══════════════════════════════════════════════════════════════════════
var ZVIT={ on:true, last:null,
  ps:function(){ try{ var ws=game.scene.getScene('World'); return ws&&ws.playerState; }catch(e){ return null; } },
  el:function(){ var m=document.getElementById('modal-inventory'); if(!m||m.style.display==='none')return null; var box=m.querySelector('.modal')||m.firstElementChild; if(!box)return null;
    var v=document.getElementById('zvit'); if(!v){ v=document.createElement('div'); v.id='zvit';
      v.innerHTML='<div class="zvit-r zvit-hp"><span>❤️</span><i><b></b></i><em></em></div><div class="zvit-r zvit-mp"><span>💧</span><i><b></b></i><em></em></div>';
      var hd=box.querySelector('.mhdr'); if(hd&&hd.nextSibling)box.insertBefore(v,hd.nextSibling); else box.insertBefore(v,box.firstChild); }
    return v; },
  spell:function(ps){ return !!(ps.equip&&ps.equip.spell)||(ps.spellsLearned||[]).length>0; },
  pop:function(row,n){ var p=document.createElement('span'); p.className='zvit-up'; p.textContent='+'+n; row.appendChild(p); setTimeout(function(){ p.remove(); },1300); },
  tick:function(){ if(!ZVIT.on)return; var v=ZVIT.el(); if(!v){ ZVIT.last=null; return; } var ps=ZVIT.ps(); if(!ps)return;
    var hp=Math.max(0,Math.round(ps.hp||0)), mh=ps.maxHp||1, mp=Math.floor(ps.mana||0), mm=ps.maxMana||0, R=v.querySelectorAll('.zvit-r');
    R[0].querySelector('b').style.width=Math.min(100,hp/mh*100)+'%'; R[0].querySelector('em').textContent=hp+' / '+mh;
    if(!ZVIT.spell(ps))mm=0;      /* round 140c (Kris: "don't show mana until you have a spell") */
    R[1].style.display=mm>0?'':'none'; if(mm>0){ R[1].querySelector('b').style.width=Math.min(100,mp/mm*100)+'%'; R[1].querySelector('em').textContent=mp+' / '+mm; }
    var L=ZVIT.last; if(L){ if(hp>L.hp)ZVIT.pop(R[0],hp-L.hp); if(mm>0&&mp>L.mp+1)ZVIT.pop(R[1],mp-L.mp); } ZVIT.last={hp:hp,mp:mp}; } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZVIT.tick(); }catch(e){} },150);
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zvit{position:sticky;top:-4px;z-index:3;display:flex;gap:14px;flex-wrap:wrap;margin:2px 0 8px;padding:6px 10px;border-radius:10px;background:rgba(10,14,24,.95);border:1px solid rgba(255,226,122,.25)}'+
  '.zvit-r{position:relative;flex:1;min-width:180px;display:flex;align-items:center;gap:6px;font:600 13px "Segoe UI";color:#e8eef6}.zvit-r i{flex:1;height:12px;border-radius:6px;background:rgba(255,255,255,.08);overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,.5)}'+
  '.zvit-r b{display:block;height:100%;transition:width .35s ease-out}.zvit-hp b{background:linear-gradient(90deg,#c0392b,#ff6b5a)}.zvit-mp b{background:linear-gradient(90deg,#1e6fd0,#6fe3f5)}.zvit-r em{font-style:normal;min-width:70px;text-align:right}'+
  '.zvit-up{position:absolute;right:76px;top:-4px;font:700 14px "Segoe UI";color:#9fffb0;text-shadow:0 1px 3px #000;animation:zvitUp 1.3s ease-out forwards;pointer-events:none}.zvit-mp .zvit-up{color:#9fe8ff}@keyframes zvitUp{to{transform:translateY(-18px);opacity:0}}';
  document.head.appendChild(st); })();
// ── round 140c (Kris ✓ "World Tree roots" in the Lab, and: "the numbers need to be easier to see"): the two bars sit in the painted roots frame —
// the colour fills the frame's slot, the heart and the drop sit in its round socket, and the numbers are big, white and outlined, right on the bar.
// ZVIT.LOOK: the painted frame (bar_<look>); the plain bars stay until its painting has loaded.
ZVIT.LOOK='roots';
ZVIT.frame=function(v){ if(!v||v._zfr)return; var u=typeof ZHUD!=='undefined'&&ZHUD.pic?ZHUD.pic('bar_'+ZVIT.LOOK):null; if(!u)return; v._zfr=1; v.classList.add('zvit-pt');
  [].forEach.call(v.querySelectorAll('.zvit-r'),function(r){ r.style.backgroundImage='url("'+u+'")'; }); };
(function(){ var t0=ZVIT.tick; ZVIT.tick=function(){ t0.apply(ZVIT,arguments); try{ ZVIT.frame(document.getElementById('zvit')); }catch(e){} }; })();
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zvit.zvit-pt{gap:10px 18px;padding:4px 10px}#zvit.zvit-pt .zvit-r{flex:1 1 280px;max-width:380px;min-width:240px;aspect-ratio:299/120;display:block;background:center/100% 100% no-repeat;gap:0}'+
  '#zvit.zvit-pt .zvit-r i{position:absolute;left:26.1%;top:44.2%;width:59.5%;height:19.2%;border-radius:8px;background:rgba(0,0,0,.55);box-shadow:inset 0 2px 3px rgba(0,0,0,.7)}'+
  '#zvit.zvit-pt .zvit-r b{border-radius:8px;box-shadow:inset 0 3px 2px rgba(255,255,255,.35)}'+
  '#zvit.zvit-pt .zvit-r>span{position:absolute;left:13.7%;top:51.5%;transform:translate(-50%,-50%);font-size:min(22px,6.2vw);line-height:1}'+
  '#zvit.zvit-pt .zvit-r em{position:absolute;left:26.1%;top:44.2%;width:59.5%;height:19.2%;display:flex;align-items:center;justify-content:center;min-width:0;text-align:center;font:800 16px "Segoe UI",sans-serif;color:#fff;letter-spacing:.3px;'+
    'text-shadow:0 0 3px #000,0 0 3px #000,1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000;pointer-events:none}'+
  '#zvit.zvit-pt .zvit-up{right:6%;top:8%}';
  document.head.appendChild(st); })();
