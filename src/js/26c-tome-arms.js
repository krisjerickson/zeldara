// ═══════════════════════════════════════════════════════════════════════
// ║ 26c-tome-arms.js — round 44 (Kris, Oct 10): "the thome should have a new place for crafted weapons. These should be separated by element
// ║ types to help visualize their strengths and weaknesses. I'm thinking of a large circular arrangement of squares for the different weapons,
// ║ with weapons that have multiple in between the different element regions. Also have recommendations in the thome in this section that
// ║ helps you understand how the elements work. Also, rearrange the monsters in the thome to also show what elements they are strong or weak to."
// ║   • a new chapter, "Weapon wheel": the six elements as slices of a big circle, in the order of what beats what (Water → Fire → Grass →
// ║     Earth → Water; Storm ↔ Shadow). Every forged weapon is a square in its element's slice; a two-element weapon sits between its two
// ║     slices (on the line between neighbours, or nearer the middle when they are apart). Weapons with no element (and the Sovereign
// ║     pieces, which carry all six) sit in the middle. Squares you have forged or own are lit. Pick one to read about it.
// ║   • under the wheel: how the elements work, and what to bring where — partly worked out from what you carry now
// ║   • Monsters: a "By element" view — one section per element with what beats it and what it shrugs off, and on every card the
// ║     elements it is weak to (▲)
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof Tome==='undefined'||typeof ZEL==='undefined'||typeof ZForge==='undefined')return;
  TOME_CATS.push({k:'arms',n:'Weapon wheel',i:'⚔️',page:1});
  var A={sel:null};
  var _list=Tome.list; Tome.list=function(cat){ return cat==='arms'?[]:_list.call(Tome,cat); };
  // the order round the circle (screen angles, 0 = right, clockwise): the four that beat each other in a ring, then storm and shadow side by side
  // round 45 (Kris): "No element weapons should be outside of the wheel" · "Arrange weapons that level up in the wheel in a line going towards the
  // middle, with the lowest level on the outside and highest towards the inside. When you click on a weapon that needs a previous weapon to forge it,
  // this should be shown in the wheel with some sort of connecting line, and if multiple weapons are needed, then multiple lines should be shown"
  var ANG={water:-90,fire:-30,grass:30,earth:90,shadow:150,storm:210}, SZ=720, C=360, R=312, RIN=62, SQ=38, ROWY=SZ+30, BOXH=SZ+74;
  var LANE_R={1:290,2:244,3:198,4:152};
  var WSLOT={lHand:1,rHand:1,mWeapon:1};
  function weapons(){ if(A._w)return A._w; var L=Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I&&WSLOT[I.slot]&&k.indexOf('~')<0&&(ZForge.recipe(k)||I.sov); });
    ['iron_sword','crossbow','longbow'].forEach(function(k){ if(ITEMS[k]&&L.indexOf(k)<0)L.unshift(k); }); return (A._w=L); }
  function els(I){ if(I.el==='all')return 'all'; return (I.el||[]).filter(function(e){ return ZEL.E[e]; }); }
  function tier(id){ var t=0; ZForge.LANES.forEach(function(L){ var i=L.nodes.indexOf(id); if(i>=0)t=i; }); if(ZForge.XBOW.t1.indexOf(id)>=0)t=2; if(ZForge.XBOW.t2.indexOf(id)>=0)t=4; if(ZForge.BOW&&ZForge.BOW.t1.indexOf(id)>=0)t=2; if(ZForge.BOW&&ZForge.BOW.t2.indexOf(id)>=0)t=4; return t; }
  function pol(deg,r){ var a=deg*Math.PI/180; return [C+Math.cos(a)*r,C+Math.sin(a)*r]; }
  function gap(a,b){ return Math.abs(((ANG[a]-ANG[b])%360+540)%360-180); }      // 60 = neighbours, 120 = one between, 180 = opposite
  function midAng(a,b){ var d=((ANG[b]-ANG[a])%360+540)%360-180; return ANG[a]+d/2; }
  function layout(){ if(A._lay)return A._lay; var pos={}, byEl={}, duals=[], mid=[], none=[], laneOf={};
    ZForge.LANES.forEach(function(L){ L.nodes.forEach(function(id,i){ if(i>0)laneOf[id]=[L.el[0],i]; }); });
    weapons().forEach(function(id){ var e=els(ITEMS[id]); if(e==='all')mid.push(id); else if(!e.length)none.push(id); else if(e.length===1)(byEl[e[0]]=byEl[e[0]]||[]).push(id); else duals.push(id); });
    // one element: its forging line runs from the rim (first step) to the middle (last step); a crossbow beside the line's start, the element's bow just inside it
    Object.keys(byEl).forEach(function(el){ var extra=0; byEl[el].forEach(function(id){ var ln=laneOf[id];
      if(ln&&ln[0]===el)pos[id]=pol(ANG[el]-9,LANE_R[ln[1]]); else if(ZForge.BOW&&ZForge.BOW.t1.indexOf(id)>=0)pos[id]=pol(ANG[el]+15,LANE_R[2]-14); else { pos[id]=pol(ANG[el]+15+extra*12,LANE_R[1]-extra*40); extra++; } }); });
    // two elements: neighbours on the line between their slices; one slice apart, in the middle ring; opposite, nearest the middle
    var pairs={}; duals.forEach(function(id){ var e=els(ITEMS[id]), key=e.slice().sort().join('+'); (pairs[key]=pairs[key]||[]).push(id); });
    Object.keys(pairs).forEach(function(key){ var e=key.split('+'), g=gap(e[0],e[1]), L=pairs[key].sort(function(a,b){ return (ITEMS[a].slot==='rHand'?0:1)-(ITEMS[b].slot==='rHand'?0:1); }), m=midAng(e[0],e[1]);
      L.forEach(function(id,i){ if(g<=61)pos[id]=pol(m,ITEMS[id].slot==='rHand'?LANE_R[1]:LANE_R[2]-(i-(ITEMS[L[0]].slot==='rHand'?1:0))*46); else if(g<=121)pos[id]=pol(m+(i-(L.length-1)/2)*16,112); else pos[id]=pol(m+(i-(L.length-1)/2)*20,82); }); });
    // all six: the middle
    var SA=[30,90,150,210]; mid.sort(function(a,b){ return a==='elemental_sovereign'?-1:b==='elemental_sovereign'?1:0; }).forEach(function(id,i){ pos[id]=i===0?[C,C]:pol(SA[(i-1)%4]+Math.floor((i-1)/4)*35,50); });
    // no element: a row under the wheel, outside it
    none.forEach(function(id,i){ pos[id]=[C+(i-(none.length-1)/2)*(SQ+14),ROWY]; });
    return (A._lay={pos:pos,byEl:byEl,duals:duals,mid:mid,none:none}); }
  function needsOf(id){ var r=ZForge.recipe(id); return r?Object.keys(r.needs).filter(function(k){ return !!layout().pos[k]; }):[]; }
  function wheelSvg(){ var lay=layout(), s='<svg class="zw-svg" viewBox="0 0 '+SZ+' '+BOXH+'" width="'+SZ+'" height="'+BOXH+'">';
    ZEL.LIST.forEach(function(el){ var E=ZEL.E[el], a0=ANG[el]-30, a1=ANG[el]+30, p0=pol(a0,R), p1=pol(a1,R), q0=pol(a0,RIN), q1=pol(a1,RIN);
      s+='<path d="M'+q0[0]+' '+q0[1]+' L'+p0[0]+' '+p0[1]+' A'+R+' '+R+' 0 0 1 '+p1[0]+' '+p1[1]+' L'+q1[0]+' '+q1[1]+' A'+RIN+' '+RIN+' 0 0 0 '+q0[0]+' '+q0[1]+'Z" fill="'+E.col+'" fill-opacity="'+(A.hl===el?0.34:0.17)+'" stroke="#6a5030" stroke-opacity=".35" stroke-width="1.2"/>';
      var lp=pol(ANG[el],R+22); s+='<text x="'+lp[0]+'" y="'+(lp[1]+4)+'" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="700" fill="#3a2a18">'+E.em+' '+E.n+'</text>'; });
    // rings: first step at the rim, last step at the middle
    [[LANE_R[1],'1st'],[LANE_R[4],'4th']].forEach(function(q){ s+='<circle cx="'+C+'" cy="'+C+'" r="'+q[0]+'" fill="none" stroke="#6a5030" stroke-opacity=".18" stroke-dasharray="3 5"/>'; });
    // each forging line, faint, rim → middle
    ZForge.LANES.forEach(function(L){ var P=L.nodes.slice(1).map(function(id){ return lay.pos[id]; }).filter(Boolean); if(P.length<2)return; s+='<polyline points="'+P.map(function(p){ return p[0]+','+p[1]; }).join(' ')+'" fill="none" stroke="'+ZEL.E[L.el[0]].col+'" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>'; });
    // what beats what: arrows round the outside
    var arrow=function(a,b,two){ var d=((ANG[b]-ANG[a])%360+540)%360-180, s0=ANG[a]+(d>0?12:-12), s1=ANG[b]-(d>0?12:-12), p0=pol(s0,R+6), p1=pol(s1,R+6); return '<path d="M'+p0[0]+' '+p0[1]+' A'+(R+6)+' '+(R+6)+' 0 0 '+(d>0?1:0)+' '+p1[0]+' '+p1[1]+'" fill="none" stroke="#8a6a3a" stroke-width="2.6" marker-end="url(#zwA)"'+(two?' marker-start="url(#zwA)"':'')+'/>'; };
    s+='<defs><marker id="zwA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8a6a3a"/></marker><marker id="zwN" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3a2a18"/></marker></defs>';
    s+=arrow('water','fire')+arrow('fire','grass')+arrow('grass','earth')+arrow('earth','water')+arrow('storm','shadow',true);
    s+='<circle cx="'+C+'" cy="'+C+'" r="'+RIN+'" fill="#f4ecd8" fill-opacity=".7" stroke="#6a5030" stroke-opacity=".35"/>';
    s+='<text x="'+C+'" y="'+(ROWY-SQ/2-8)+'" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="12" fill="#6a5030">no element — outside the wheel</text>';
    // the selected weapon: a line from every weapon it is forged from
    if(A.sel&&lay.pos[A.sel]){ var to=lay.pos[A.sel]; needsOf(A.sel).forEach(function(k){ var fr=lay.pos[k], dx=to[0]-fr[0], dy=to[1]-fr[1], d=Math.hypot(dx,dy)||1, ux=dx/d, uy=dy/d, a=[fr[0]+ux*(SQ/2+2),fr[1]+uy*(SQ/2+2)], b=[to[0]-ux*(SQ/2+4),to[1]-uy*(SQ/2+4)];
      s+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#fff6dc" stroke-width="7" stroke-linecap="round"/><line class="zw-need" x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#3a2a18" stroke-width="3" stroke-linecap="round" marker-end="url(#zwN)"/>'; }); }
    return s+'</svg>'; }
  function page(ps){ var lay=layout(), b=Tome.book()||{item:{}}, need=A.sel?needsOf(A.sel):[], h='<div class="zw"><section class="tome-sec zw-top"><h4>The weapon wheel <span>every weapon the forge can make, by element</span></h4><div class="zw-box" style="width:'+SZ+'px;height:'+BOXH+'px">'+wheelSvg();
    weapons().forEach(function(id){ var p=lay.pos[id]; if(!p)return; var I=ITEMS[id], mine=ZForge.made(ps,id)||ZForge.owns(ps,id), seen=!!(b.item&&b.item[id]), e=els(I), col=e==='all'?'#f4ecd0':e.length?ZEL.E[e[0]].col:'#c8b898', col2=e!=='all'&&e.length>1?ZEL.E[e[1]].col:col;
      h+='<button class="zw-sq'+(mine?' on':'')+(A.sel===id?' sel':'')+(need.indexOf(id)>=0?' need':'')+(seen||mine?'':' unk')+'" data-awp="'+id+'" title="'+(seen||mine?I.name:'Not seen yet')+'" style="left:'+(p[0]-SQ/2)+'px;top:'+(p[1]-SQ/2)+'px;--c1:'+col+';--c2:'+col2+'">'+ZIcon.item(id,1.4)+(mine?'<s>✓</s>':'')+'</button>'; });
    h+='</div><p class="ze-note">Each element\'s forging line runs from the rim (first step) to the middle (last step). Squares between two slices carry both elements; the further two elements are apart on the wheel, the nearer the middle. Lit squares: forged or owned. Pick a square: lines show the weapons it is forged from.</p></section>';
    h+=tips(ps)+'</div>'; return h; }
  // how the elements work — and what it means for what you carry now
  function tips(ps){ var QN=['','Grasslands','Wetlands','Highlands','Ashlands'], hm=typeof ZHit!=='undefined'?ZHit.hero('melee'):{els:[]}, cur=hm&&hm.els&&hm.els!=='all'?hm.els:[], L=[];
    L.push('<b>The circle.</b> Water puts out Fire, Fire burns Grass, Grass splits Earth, Earth dams Water — each beats the next one round. Storm and Shadow beat each other. On the wheel an arrow points from the stronger to the weaker.');
    L.push('<b>Strike what you beat.</b> A weapon is half again as strong against the slice its arrow points to, and its effect (burn, slow, root, stagger, arc, drain) lands more often.');
    L.push('<b>Same element, or the one that beats you:</b> the foe resists — a good deal less damage. Fire on a fire beast does little.');
    L.push('<b>Two elements</b> (the squares between two slices): the weapon strikes with whichever of its two is better against the foe, so one blade covers two kinds of enemy. Against a two-element foe, its weaknesses and resistances add up — look for a Bane (▲▲).');
    L.push('<b>Bosses</b> have one element each, and the right element only helps them a little less than it helps against ordinary foes — level and gear matter more.');
    L.push('<b>Gems</b> from the jeweller set an element into a weapon or armour that has none (up to two). Armour of an element shrugs off that element\'s hits and effects.');
    var bring=[1,2,3,4].map(function(q){ var el=ZEL.LIST.find(function(e){ return ZEL.E[e].realm===q; }); return el?'<li>'+QN[q]+' — mostly '+ZElUI.chip(el)+' foes: bring '+ZEL.weakTo(el).map(function(a){ return ZElUI.chip(a); }).join(' or ')+'</li>':''; }).join('');
    var now=cur.length?'<p class="zw-now">You carry '+ZElUI.chips(cur)+': strong against '+cur.map(function(e){ return ZElUI.chip(ZEL.E[e].beats); }).join('')+'; avoid using it on '+[].concat.apply([],cur.map(function(e){ return ZEL.resists(e); })).filter(function(x,i,a){ return a.indexOf(x)===i; }).map(function(a){ return ZElUI.chip(a); }).join('')+' foes.</p>':'<p class="zw-now">Your weapon has no element: it does the same to everything. Forge one from the wheel to hit weaknesses.</p>';
    return '<section class="tome-sec"><h4>How the elements work</h4><ol class="zw-tips">'+L.map(function(t){ return '<li>'+t+'</li>'; }).join('')+'</ol>'+now+'<h4 style="margin-top:8px">Where to bring what</h4><ul class="zw-bring">'+bring+'<li>Towers, crypts and the sky — Storm and Shadow foes: carry the other one.</li></ul></section>'; }
  function detail(){ if(A.hl&&!A.sel){ var E=ZEL.E[A.hl]; return '<div class="tome-bigic">'+ZIcon.html(E.ic,E.em,1.5)+'</div><h3>'+E.n+'</h3><dl><dt>Beats</dt><dd>'+ZElUI.chip(E.beats)+'</dd><dt>Beaten by</dt><dd>'+ZEL.weakTo(A.hl).map(function(a){ return ZElUI.chip(a); }).join('')+'</dd><dt>Weapons</dt><dd>'+((layout().byEl[A.hl]||[]).map(function(id){ return ITEMS[id].name; }).join(', ')||'—')+'</dd></dl>'; }
    if(!A.sel)return '<p class="tome-empty">Every weapon the forge can make, placed by its element. Pick a square to read about it, or an element on the wheel.</p>';
    var e=Tome.entry('item',A.sel); if(!e)return ''; return '<div class="tome-bigic">'+ZIcon.item(A.sel,1.5)+'</div><h3>'+e.name+'</h3><div class="tome-sub">'+(e.sub||'')+'</div><p class="tome-hint">'+(e.hint||'')+'</p><dl>'+e.lines.map(function(l){ return '<dt>'+l[0]+'</dt><dd>'+l[1]+'</dd>'; }).join('')+'</dl>'+forgeFrom(A.sel); }
  // round 45: what it is forged from, and where the rare part is found
  function forgeFrom(id){ var r=ZForge.recipe(id); if(!r)return ''; var L=Object.keys(r.needs).map(function(k){ var I=ITEMS[k]; if(!I)return ''; var how=(typeof R45_RARE!=='undefined'&&R45_RARE[k]&&R45_RARE[k].how)||(I.rare?'A rare gem: won from guardians and realm bosses, never sold.':'');
      return '<li>'+ZIcon.item(k,1.1)+' '+(r.needs[k]>1?r.needs[k]+'× ':'')+'<b>'+I.name+'</b>'+(how?'<br><small>'+how+'</small>':'')+'</li>'; }).join('');
    return '<h4 style="margin:8px 0 3px">Forged from</h4><ul class="zw-from">'+L+'<li>'+r.gold+' gold</li></ul>'; }

  // ── monsters by element ──
  var monEls=function(id){ return Tome._monEls?Tome._monEls(id):{els:ZEL.ofId(id)}; };
  function monByElement(b,cat){ var ids=Tome.list('monster'), qf=Tome.ui.q, G={}, ORDER=ZEL.LIST.concat(['dual','none']);
    ids.forEach(function(id){ var e=Tome.entry('monster',id); if(!e)return; if(qf&&Tome.qOf('monster',id,e)!==qf)return; var M=monEls(id), k=!M.els.length?'none':M.els.length>1?'dual':M.els[0]; (G[k]=G[k]||[]).push([id,e,M]); });
    var card=function(p){ var id=p[0], e=p[1], got=!!b.monster[id], weak=p[2].els.length?ZEL.LIST.filter(function(a){ return p[2].els.reduce(function(s,d){ return s+ZEL.rel(a,d); },0)>0; }):[];
      var ic=e.spec?'<canvas class="tome-spr'+(got?'':' dark')+(e.spec._cf?' smooth':'')+'" data-spr="'+id+'" width="48" height="48"></canvas>':'<span class="tome-ic'+(got?'':' dark')+'">'+(e.icon||'•')+'</span>';
      return '<button class="tome-card'+(got?'':' locked')+(Tome.ui.sel===id?' sel':'')+'" data-tid="'+id+'">'+ic+'<b>'+(got?e.name:'???')+'</b>'+(got&&weak.length?'<i class="tm-weak" title="Weak to">▲'+weak.map(function(a){ return ZEL.E[a].em; }).join('')+'</i>':'')+'</button>'; };
    return ORDER.map(function(k){ var L=G[k]; if(!L||!L.length)return ''; var n=L.filter(function(p){ return b.monster[p[0]]; }).length, E=ZEL.E[k];
      var head=E?ZElUI.chip(k)+' <span class="tm-vs">▲ weak to '+ZEL.weakTo(k).map(function(a){ return ZElUI.chip(a); }).join('')+' · ▽ resists '+ZEL.resists(k).map(function(a){ return ZElUI.chip(a); }).join('')+'</span>':k==='dual'?'<b>Two elements</b> <span class="tm-vs">weaknesses and resistances add up — each card shows what still wins</span>':'<b>No element</b> <span class="tm-vs">never weak, never resists</span>';
      return '<section class="tome-sec" style="background:'+(E?'linear-gradient(90deg,'+E.col+'66,#efe4c8 60%)':'#e8dcc0')+'"><h4>'+head+' <span>'+n+' / '+L.length+'</span></h4><div class="tome-cards">'+L.map(card).join('')+'</div></section>'; }).join(''); }

  var _render=Tome.render;
  Tome.render=function(){ var cat=Tome.ui.cat;
    if(cat==='monster'&&Tome.ui.mg==='el'){ _render.call(Tome); var b=Tome.book(), grid=document.getElementById('tome-grid'); if(!b||!grid)return; var q=grid.querySelector('.tome-q'), qh=q?q.outerHTML:'';
      grid.innerHTML=qh+monByElement(b)+''; Tome._drawSprites&&Tome._drawSprites(cat); addToggle(grid); tabLabel(); if(typeof ZIcon!=='undefined')ZIcon.hydrate(grid); return; }
    _render.call(Tome); var grid2=document.getElementById('tome-grid'), det=document.getElementById('tome-detail'), tabs=document.getElementById('tome-tabs'); if(!grid2)return;
    tabLabel();
    if(cat==='monster')addToggle(grid2);
    if(cat!=='arms')return; grid2.classList.add('tome-page'); try{ grid2.innerHTML=page(Tome.ps()); det.innerHTML=detail(); var bx=grid2.querySelector('.zw-box'), aw=bx&&bx.parentElement.clientWidth-6; if(bx&&aw>100&&aw<SZ)bx.style.zoom=(aw/SZ).toFixed(3); }catch(err){ grid2.innerHTML='<p class="tome-empty">This page could not be drawn.</p>'; if(typeof console!=='undefined')console.warn('tome arms',err); }
    if(typeof ZIcon!=='undefined'){ ZIcon.hydrate(grid2); ZIcon.hydrate(det); } };
  function tabLabel(){ var bt=document.querySelector('#tome-tabs [data-tcat="arms"]'); if(bt){ bt.innerHTML=ZIcon.html('tm_forge','⚔️',1.35)+' Weapon wheel'; ZIcon.hydrate(bt); } }
  function addToggle(grid){ var q=grid.querySelector('.tome-q'); if(!q||q.querySelector('[data-tmg]'))return; var mg=Tome.ui.mg==='el';
    q.insertAdjacentHTML('beforeend','<span class="tm-mg">Show by <button data-tmg="realm" class="'+(mg?'':'on')+'">realm</button><button data-tmg="el" class="'+(mg?'on':'')+'">element</button></span>'); }
  if(typeof document!=='undefined')document.addEventListener('click',function(e){ if(!e.target.closest||!e.target.closest('#modal-tome'))return; var t;
    if((t=e.target.closest('[data-awp]'))){ A.sel=t.getAttribute('data-awp'); A.hl=null; Tome.render(); }
    else if((t=e.target.closest('[data-tmg]'))){ Tome.ui.mg=t.getAttribute('data-tmg'); Tome.render(); e.stopPropagation(); }
    else if(Tome.ui.cat==='arms'&&(t=e.target.closest('.zw-svg text'))){ var nm=t.textContent.split(' ').pop(); var el=ZEL.LIST.find(function(x){ return ZEL.E[x].n===nm; }); if(el){ A.hl=el; A.sel=null; Tome.render(); } } },true);
  if(typeof document!=='undefined'){ var st=document.createElement('style'); st.textContent=
    '.zw-box{position:relative;margin:4px auto}.zw-svg{position:absolute;left:0;top:0}.zw-svg text{cursor:pointer}'+
    '.zw-sq{position:absolute;box-sizing:border-box;width:38px;height:38px;padding:0;border-radius:7px;border:2px solid var(--c1);background:linear-gradient(135deg,var(--c1) 0 50%,var(--c2) 50% 100%);background-clip:padding-box;box-shadow:0 1px 3px rgba(0,0,0,.35);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:.55}'+
    '.zw-sq::before{content:"";position:absolute;inset:2px;border-radius:5px;background:#f6efdc}.zw-sq>*{position:relative}.zw-sq.on{opacity:1;box-shadow:0 0 0 2px #fff8,0 0 10px var(--c1)}.zw-sq.unk{filter:grayscale(.7) brightness(.85)}.zw-sq.sel{outline:3px solid #3a2a18;opacity:1}.zw-sq.need{outline:3px dashed #3a2a18;opacity:1}.zw-sq s{position:absolute;right:-4px;bottom:-5px;text-decoration:none;font-size:11px;background:#3a8a3a;color:#fff;border-radius:50%;width:15px;height:15px;line-height:15px;text-align:center}'+
    '.zw-tips{margin:4px 0 6px 18px;padding:0;font-size:12px;line-height:1.45}.zw-tips li{margin:3px 0}.zw-now{font-size:12px;margin:6px 0;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,.4)}.zw-bring{margin:2px 0 0 18px;padding:0;font-size:12px}.zw-from{list-style:none;margin:0;padding:0;font-size:12px}.zw-from li{margin:3px 0}.zw-from small{color:#5a4a34}'+
    '.tm-mg{margin-left:auto;font:600 11px "Segoe UI",sans-serif;color:#5a4a34;display:inline-flex;gap:4px;align-items:center}.tm-mg button.on{background:#3a2a18;color:#f4ecd8}.tm-vs{font:500 11px "Segoe UI",sans-serif;color:#4a3a28}.tm-weak{display:block;font-style:normal;font-size:10px;line-height:1;margin-top:1px}';
    document.head.appendChild(st); }
  Tome._arms=A;
})();
