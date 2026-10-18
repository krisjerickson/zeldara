// ═══════════════════════════════════════════════════════════════════════
// ║ 75-lab-todo.js — round 65c: "⭐ Waiting for your picks" — a button beside the tabs so a decision is never missed.
// ║ Kris (Oct 18): "i'm not sure if i'm finding solmyrk picks. lets create a new button in the lab so i don't miss these".
// ║  · The button shows how many open decisions there are and glows while any are left; click it for the list.
// ║  · Each line says what to pick and where; "Go →" opens that tab and scrolls to it, with a short gold flash.
// ║  · Ticked off by itself once picked (✓); when everything is picked the button says so and stops glowing.
// ║ To add a decision: LTODO.add({id, label, where, done:function(){…}, go:function(){…}}).
// ═══════════════════════════════════════════════════════════════════════
var LTODO={ L:[],
  add:function(o){ LTODO.L=LTODO.L.filter(function(x){ return x.id!==o.id; }); LTODO.L.push(o); },
  open:function(){ return LTODO.L.filter(function(o){ try{ return !o.done(); }catch(e){ return true; } }); },
  // open a tab, wait for it to draw, scroll to the element and flash it
  goTo:function(tab,sel,i){ var A=LabApp; if(A.tab!==tab){ A.tab=tab; A.idx=0; if(document.body.classList.contains('walking')&&A.close)A.close(); A.renderGrid(); }
    var n=0, f=function(){ var L=document.querySelectorAll(sel), el=L[i||0]; if(!el){ if(n++<30)setTimeout(f,100); return; }
      el.scrollIntoView({behavior:'smooth',block:'start'}); el.classList.remove('todo-flash'); void el.offsetWidth; el.classList.add('todo-flash'); }; setTimeout(f,60); },
  btn:function(){ var o=LTODO.open(), n=o.length; return '<button id="lab-todo-btn" class="lab-todo'+(n?' hot':'')+'" aria-haspopup="true" title="Decisions waiting for you">⭐ '+(n?'Waiting for your picks <b>'+n+'</b>':'All picked ✓')+'</button>'; },
  pop:function(){ var old=document.getElementById('lab-todo-pop'); if(old){ old.remove(); return; }
    var b=document.getElementById('lab-todo-btn'); if(!b)return; var r=b.getBoundingClientRect(), el=document.createElement('div'); el.id='lab-todo-pop';
    el.style.cssText='position:fixed;z-index:9999;top:'+Math.round(r.bottom+6)+'px;left:'+Math.round(Math.max(8,Math.min(r.left,innerWidth-388)))+'px';
    el.innerHTML='<h4>Decisions waiting for you</h4>'+LTODO.L.map(function(o,i){ var d=false; try{ d=o.done(); }catch(e){}
      return '<div class="todo-row'+(d?' done':'')+'"><span class="todo-tick">'+(d?'✓':'○')+'</span><span class="todo-txt"><b>'+o.label+'</b><small>'+o.where+'</small></span><button class="vbtn todo-go" data-i="'+i+'">Go →</button></div>'; }).join('')+
      (LTODO.L.length?'':'<p class="todo-none">Nothing waiting right now.</p>');
    document.body.appendChild(el);
    el.onclick=function(e){ var g=e.target.closest('.todo-go'); if(!g)return; var o=LTODO.L[+g.dataset.i]; el.remove(); try{ o.go(); }catch(err){ console.warn('todo',err); } };
    setTimeout(function(){ var off=function(e){ if(!el.contains(e.target)&&e.target.id!=='lab-todo-btn'){ el.remove(); document.removeEventListener('mousedown',off,true); } }; document.addEventListener('mousedown',off,true); },0); }
};
// ── Solmyrk's three forms (Bosses tab → 👑 Solmyrk, at the top) ──
if(typeof LSOL!=='undefined')LSOL.PH.forEach(function(P,i){ LTODO.add({ id:'sol'+i, label:'👑 Solmyrk — '+P[1].replace(/ \(.*\)$/,''), where:'Bosses tab → Solmyrk remade (top) · '+P[3].length+' painted options',
  done:function(){ return typeof LBB!=='undefined'&&LBB.pickOf(P[0])!==null; }, go:function(){ LTODO.goTo('bosses','.sol-ph',i); } }); });
// the button sits after the tabs; it refreshes whenever the tabs do, and after any "Choose this"
(function(){ if(typeof LabApp==='undefined')return; var rt=LabApp.renderTabs;
  LabApp.renderTabs=function(){ var r=rt.apply(this,arguments), el=document.getElementById('lab-tabs'); if(el){ var o=document.getElementById('lab-todo-btn'); if(o)o.remove(); el.insertAdjacentHTML('afterbegin',LTODO.btn()); document.getElementById('lab-todo-btn').onclick=LTODO.pop; } return r; };
  document.addEventListener('click',function(e){ if(e.target.closest('.bb-pick,.vbtn'))setTimeout(function(){ try{ LabApp.renderTabs(); }catch(err){} },80); });
  var st=document.createElement('style'); st.textContent='.lab-todo{font:inherit;font-size:14px;padding:6px 12px;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--muted);cursor:pointer}'+
    '.lab-todo.hot{color:#1a1206;background:linear-gradient(180deg,#ffe28a,#f2b84b);border-color:#ffe28a;font-weight:600;animation:todoGlow 1.8s ease-in-out infinite}.lab-todo b{display:inline-block;min-width:1.4em;margin-left:4px;padding:0 5px;border-radius:9px;background:#1a1206;color:#ffe28a;text-align:center}'+
    '@keyframes todoGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,214,110,.55)}50%{box-shadow:0 0 0 6px rgba(255,214,110,0)}}'+
    '#lab-todo-pop{width:380px;max-width:calc(100vw - 16px);background:#0d1420;border:1px solid #ffe28a;border-radius:12px;padding:10px 12px;box-shadow:0 12px 40px rgba(0,0,0,.6);color:#dfe8f4}#lab-todo-pop h4{margin:0 0 8px;font-size:14px;color:#ffe28a}'+
    '.todo-row{display:flex;align-items:center;gap:8px;padding:6px 0;border-top:1px solid rgba(255,255,255,.08)}.todo-row.done{opacity:.55}.todo-tick{width:1.2em;color:#ffe28a}.todo-row.done .todo-tick{color:var(--pick,#7fd89a)}.todo-txt{flex:1;display:flex;flex-direction:column}.todo-txt small{color:#8b98ad;font-size:12px}.todo-go{white-space:nowrap}.todo-none{color:#8b98ad;margin:4px 0}'+
    '.sol-ph,.sol-wrap{scroll-margin-top:210px}.todo-flash{animation:todoFlash 1.6s ease-out 1}@keyframes todoFlash{0%{background:rgba(255,214,110,.45)}100%{background:transparent}}';
  document.head.appendChild(st); })();
