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
  pop:function(row,n){ var p=document.createElement('span'); p.className='zvit-up'; p.textContent='+'+n; row.appendChild(p); setTimeout(function(){ p.remove(); },1300); },
  tick:function(){ if(!ZVIT.on)return; var v=ZVIT.el(); if(!v){ ZVIT.last=null; return; } var ps=ZVIT.ps(); if(!ps)return;
    var hp=Math.max(0,Math.round(ps.hp||0)), mh=ps.maxHp||1, mp=Math.floor(ps.mana||0), mm=ps.maxMana||0, R=v.querySelectorAll('.zvit-r');
    R[0].querySelector('b').style.width=Math.min(100,hp/mh*100)+'%'; R[0].querySelector('em').textContent=hp+' / '+mh;
    R[1].style.display=mm>0?'':'none'; if(mm>0){ R[1].querySelector('b').style.width=Math.min(100,mp/mm*100)+'%'; R[1].querySelector('em').textContent=mp+' / '+mm; }
    var L=ZVIT.last; if(L){ if(hp>L.hp)ZVIT.pop(R[0],hp-L.hp); if(mm>0&&mp>L.mp+1)ZVIT.pop(R[1],mp-L.mp); } ZVIT.last={hp:hp,mp:mp}; } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ ZVIT.tick(); }catch(e){} },150);
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zvit{position:sticky;top:-4px;z-index:3;display:flex;gap:14px;flex-wrap:wrap;margin:2px 0 8px;padding:6px 10px;border-radius:10px;background:rgba(10,14,24,.95);border:1px solid rgba(255,226,122,.25)}'+
  '.zvit-r{position:relative;flex:1;min-width:180px;display:flex;align-items:center;gap:6px;font:600 13px "Segoe UI";color:#e8eef6}.zvit-r i{flex:1;height:12px;border-radius:6px;background:rgba(255,255,255,.08);overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,.5)}'+
  '.zvit-r b{display:block;height:100%;transition:width .35s ease-out}.zvit-hp b{background:linear-gradient(90deg,#c0392b,#ff6b5a)}.zvit-mp b{background:linear-gradient(90deg,#1e6fd0,#6fe3f5)}.zvit-r em{font-style:normal;min-width:70px;text-align:right}'+
  '.zvit-up{position:absolute;right:76px;top:-4px;font:700 14px "Segoe UI";color:#9fffb0;text-shadow:0 1px 3px #000;animation:zvitUp 1.3s ease-out forwards;pointer-events:none}.zvit-mp .zvit-up{color:#9fe8ff}@keyframes zvitUp{to{transform:translateY(-18px);opacity:0}}';
  document.head.appendChild(st); })();
