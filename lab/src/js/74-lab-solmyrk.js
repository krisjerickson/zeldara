// ═══════════════════════════════════════════════════════════════════════
// ║ 74-lab-solmyrk.js — round 65: SOLMYRK REMADE, painted options to pick (Bosses tab → 👑 Solmyrk, at the top).
// ║ Kris (Oct 18): phase 1 the golden angel (white angels for inspiration, gold not blue; the bishop robes, the scepter, the one Odin eye, no legs,
// ║ the massive golden helmet; wings longer, taller and faceted, the outfit grander, long, flowing and ethereal); phase 2 the cracked mask (dark
// ║ armour with white wings, the ravens, the golden mask breaking to show the dark demon, black sinuous arms coming out; it pulses light ↔ black);
// ║ phase 3 the shadow ("at least 6 new forms"; "darker … like the void … long binding arms"). Card: "Options first" for all three phases.
// ║ The paintings come from scenery wave 69 (tools\sprites\round66.ps1); until then each card says it is being painted. Phase 2's cards
// ║ cross-fade the radiant and the black version in the fight's beat. Picks: bosses-sol_1 / sol_2 / sol_3.
// ═══════════════════════════════════════════════════════════════════════
var LSOL={
  PH:[['sol_1','Phase 1 — the golden angel','gd_sol_1_',['a','b','c'],['The Gilded Seraph','The High Seat\'s Herald','The Sun-Crowned Allfather']],
      ['sol_2','Phase 2 — the cracked mask (pulses light ↔ black)','gd_sol_2_',['a','b','c'],['Wings of Ash','The Eclipse Mask','The Fallen Allfather']],
      ['sol_3','Phase 3 — the shadow (the final form)','gd_sol_3_',['a','b','c','d','e','f','g','h'],['The Hollow King','The Binding Dark','The Wolf of the Last Night','The Black Sun','The Raven Storm','The Unmasked One','The Shroud','The Fimbul Shade']]],
  intro:function(){ var h='<section class="bb-fam sol-wrap"><h4>Solmyrk remade — pick one for each phase</h4><p class="gn-lead">Your pictures and notes, painted as options (none of your pictures was copied — they were described in words). Phase 1 golden, never blue; phase 2 pulses like the fight; phase 3 has eight. Once you pick, his sprite sheets are ordered from your picks, and the cut-scenes between the phases are painted.</p>';
    LSOL.PH.forEach(function(P){ var pk=LBB.pickOf(P[0]), p=LabApp.picks['bosses-'+P[0]]||{};
      h+='<h5 class="sol-ph">'+P[1]+'</h5><div class="sol-grid">'+P[3].map(function(o,i){ var on=pk===i; return '<article class="sol-card bb-card'+(on?' on':'')+'" data-slot="'+P[0]+'" data-i="'+i+'"><canvas class="sol-cv" width="240" height="'+(P[0]==='sol_1'?360:320)+'" data-id="'+P[2]+o+'" data-ph="'+P[0]+'"></canvas><b>'+P[4][i]+'</b><button class="vbtn bb-pick" data-slot="'+P[0]+'" data-i="'+i+'" aria-pressed="'+on+'">'+(on?'✓ Chosen':'Choose this')+'</button></article>'; }).join('')+'</div>'+
        '<textarea class="mn-notes bb-notes" data-slot="'+P[0]+'" rows="1" placeholder="Notes for this phase (mix two options, what to change)…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea>'; });
    return h+'</section>'; },
  draw:function(cv,t){ var x=cv.getContext('2d'), W=cv.width, H=cv.height, id=cv.dataset.id, ph=cv.dataset.ph, A=LGOD.img(id), B=ph==='sol_2'?LGOD.img(id+'_dk'):null;
    x.save(); x.globalAlpha=1; x.fillStyle=ph==='sol_3'?'#07070c':'#0e1220'; x.fillRect(0,0,W,H);
    var put=function(P,a){ if(!P||a<0.01)return; var r=P.r, k=Math.min((H-16)/r[4],(W-12)/r[3]); x.globalAlpha=a; x.drawImage(P.im,r[1],r[2],r[3],r[4],W/2-r[3]*k/2,H-8-r[4]*k,r[3]*k,r[4]*k); };
    if(A){ if(ph==='sol_1'){ var g=x.createRadialGradient(W/2,H*0.35,4,W/2,H*0.35,W*0.7); g.addColorStop(0,'rgba(255,236,170,.35)'); g.addColorStop(1,'rgba(255,236,170,0)'); x.fillStyle=g; x.fillRect(0,0,W,H); }
      if(B&&typeof ZGOD!=='undefined'){ var lt=ZGOD.light(2,t); put(A,lt); put(B,1-lt); x.globalAlpha=1; x.font='600 10px "Segoe UI",sans-serif'; x.fillStyle=lt>0.5?'#fff2b0':'#c8d0e0'; x.fillText(lt>0.5?'☀ radiant':'● black',8,14); } else put(A,1); }
    else { x.globalAlpha=1; x.fillStyle='#6a7090'; x.font='600 12px "Segoe UI",sans-serif'; x.textAlign='center'; x.fillText('being painted…',W/2,H/2-6); x.font='10px "Segoe UI",sans-serif'; x.fillText('(tools\\sprites\\round66.ps1)',W/2,H/2+12); }
    x.restore(); },
  loop:function(){ if(LSOL._on)return; LSOL._on=true; var f=function(ts){ if(LabApp.tab==='bosses'){ var L=document.querySelectorAll('.sol-cv'); for(var i=0;i<L.length;i++){ var r=L[i].getBoundingClientRect(); if(r.bottom>0&&r.top<innerHeight)LSOL.draw(L[i],ts/1000); } } requestAnimationFrame(f); }; requestAnimationFrame(f); }
};
(function(){ if(typeof LGOD==='undefined')return; var i0=LGOD.intro; LGOD.intro=function(){ LSOL.loop(); return LSOL.intro()+i0.apply(this,arguments); };
  var st=document.createElement('style'); st.textContent='.sol-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin:6px 0}.sol-card{background:var(--ink);border:1px solid var(--line);border-radius:10px;padding:8px;display:flex;flex-direction:column;gap:6px;align-items:center}'+
    '.sol-card.on{border-color:var(--pick);box-shadow:0 0 0 1px var(--pick)}.sol-card b{font-family:var(--display);font-weight:400;font-size:1rem}.sol-cv{width:100%;height:auto;border-radius:8px}.sol-ph{margin:12px 0 2px;font-size:.95rem;color:var(--rune)}';
  document.head.appendChild(st); })();
