// ═══════════════════════════════════════════════════════════════════════
// ║ 79z3-lab-aim.js — round 129: AIMING, SHOOTING AND CASTING, MADE SIMPLE (Kris: "we need to remake the projectile and spell casting
// ║ mechanics, as we made this too complicated. I am thinking of slight controls where you click spell or projectile and then a direction
// ║ after this, and then it auto aims at the strongest enemy in that direction, in range, and with line-of sight. you also have a place in
// ║ game controls to choose which enemy it auto-targets, for instance the weakest if you want. Come up with 5 proposals … I'm also worried
// ║ that having both bow, with arrows, and cross-bow, with darts, is too complicated and not helpful. Make additional proposals of how to make
// ║ this difference meaningful as well as a proposal for removing crossbows and just doing bow and arrow").
// ║ Today (09s-combat102): the bow is Ctrl held to draw (a reticle shrinks over 0.8 s; tap ×1, half ×1.5, full ×2); a spell is X twice (the
// ║ first shows a rune circle on the foe nearest ahead, the movement keys slide it, the second casts). Crossbows: slower (0.95 s), +15 %,
// ║ the dart passes through one foe; darts cost more than arrows and come in the same four kinds.
// ║ Picks: 'aim-scheme' {regions:[proposal]}, 'aim-<proposal>' ✓/?/✕ + note; 'aim-prio' {regions:[default target rule]}; 'aim-xbow'
// ║ {regions:[choice]} + note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return (typeof LabApp!=='undefined'&&LabApp.picks[k])||{}; };
  // a top-down sketch: the hero, the cone of the direction pressed, foes (size = strength), the one chosen ringed, a wall that blocks sight
  var sketch=function(o){ var s='<svg viewBox="0 0 360 220" class="am-svg"><rect width="360" height="220" rx="10" fill="#14201a"/>', hx=70, hy=150;
    if(o.cone)s+='<path d="M'+hx+','+hy+' L'+(hx+250*Math.cos(o.cone-0.5))+','+(hy+250*Math.sin(o.cone-0.5))+' A250,250 0 0,1 '+(hx+250*Math.cos(o.cone+0.5))+','+(hy+250*Math.sin(o.cone+0.5))+' Z" fill="#ffd76a" opacity=".13" stroke="#ffd76a" stroke-opacity=".5"/>';
    if(o.line)s+='<line x1="'+hx+'" y1="'+hy+'" x2="'+o.line[0]+'" y2="'+o.line[1]+'" stroke="#7fc8ff" stroke-width="2" stroke-dasharray="6 5"/>';
    s+='<rect x="205" y="40" width="14" height="60" fill="#5a6070"/><text x="212" y="35" text-anchor="middle" class="am-s">wall</text>';
    [[260,70,9,'blocked'],[180,90,7,''],[250,150,12,''],[300,190,5,''],[150,40,10,'']].forEach(function(f,i){ var pick=o.pick===i; s+='<circle cx="'+f[0]+'" cy="'+f[1]+'" r="'+f[2]+'" fill="'+(f[3]?'#6a4a4a':'#c05050')+'"/>'+(pick?'<circle cx="'+f[0]+'" cy="'+f[1]+'" r="'+(f[2]+8)+'" fill="none" stroke="#ffd76a" stroke-width="3"/>':'')+(f[3]?'<text x="'+f[0]+'" y="'+(f[1]-14)+'" text-anchor="middle" class="am-s">no sight</text>':''); });
    if(o.shot)s+='<path d="M'+hx+','+hy+' Q'+((hx+o.shot[0])/2)+','+((hy+o.shot[1])/2-(o.arc||0))+' '+o.shot[0]+','+o.shot[1]+'" stroke="#fff" stroke-width="2.5" fill="none"/>';
    s+='<circle cx="'+hx+'" cy="'+hy+'" r="9" fill="#46e0c8" stroke="#fff" stroke-width="2"/><text x="'+hx+'" y="'+(hy+26)+'" text-anchor="middle" class="am-s">you</text>';
    if(o.tag)s+='<text x="12" y="20" class="am-t">'+esc(o.tag)+'</text>'; return s+'</svg>'; };
  var S=[
   {id:'press_dir',n:'1 · Press, then point (your idea)',tag:'Ctrl (or X) … then → : shoots the strongest in that direction',
    how:['Press the bow key (Ctrl) or the spell key (X). The hero raises the bow or the staff; nothing is spent yet.','Then press a direction (a movement key, the left stick or the D-pad). The shot goes at once at the foe your target rule picks (strongest by default) inside a 60° cone that way, in range and in sight.','No foe there? It flies straight that way (a spell lands at its full range).','Press the bow key twice quickly to shoot at your current target without choosing a direction.'],
    good:'Two quick presses, no holding, works the same on keys, a pad and touch. You choose the direction; the game does the aiming.',bad:'One extra press before every shot; in a hurry the hero stands still for that moment.',pic:{cone:-0.35,pick:2,shot:[250,150]}},
   {id:'soft_lock',n:'2 · Soft lock-on',tag:'a gold ring is always on the best foe ahead — tap to shoot it',
    how:['While foes are near, a small gold ring sits on the one your target rule picks in front of you (in range, in sight).','Tap Ctrl or X: it shoots or casts at the ringed foe. Nothing to aim.','To change foe, press a direction while holding the key: the ring jumps to the best foe that way.'],
    good:'The fastest: one tap. You always see who will be hit before you shoot.',bad:'A ring on screen most of the time; in a crowd it may jump more than you like.',pic:{cone:-0.35,pick:2,shot:[250,150]}},
   {id:'facing',n:'3 · Shoot where you face',tag:'tap: the best foe in the direction you are walking or facing',
    how:['No second step at all: tap Ctrl or X and it goes at the best foe in a 60° cone in the direction the hero faces (the way you last walked).','Turning to face a foe is the aiming.'],
    good:'Simplest to learn — exactly like the sword.',bad:'To shoot behind you, you must turn first; a little less control in a crowd.',pic:{cone:0,pick:2,shot:[250,150]}},
   {id:'charge',n:'4 · Hold to draw, point to choose',tag:'hold Ctrl, press → to choose the side, let go to shoot',
    how:['Keeps today\'s draw (a quick shot ×1, half a draw ×1.5, a full draw a sure critical ×2) but drops the reticle you had to steer.','While holding, a direction picks the cone and the target rule picks the foe in it; letting go shoots it. Spells: hold X to gather power the same way (×1.5 at half, ×2 when full, for more mana).'],
    good:'Keeps the skill and the reward of the draw, with none of the steering.',bad:'Holding and pressing a direction at once is harder on touch screens.',pic:{cone:-0.35,pick:2,shot:[250,150]}},
   {id:'free_aim',n:'5 · Free aim with a gentle pull',tag:'aim with the mouse or the right stick; the shot bends a little toward a foe near the line',
    how:['Aim freely with the mouse (keyboard) or the right stick (pad); Ctrl or X shoots that way.','An aim assist bends the shot gently toward a foe close to your line (strength set in the controls: off, light, strong).','The target rule decides which foe gets the pull when two are close.'],
    good:'The most control for players who like to aim; familiar from twin-stick games.',bad:'Needs the mouse or a second stick: two hands busy, not great on a laptop trackpad or touch.',pic:{line:[300,110],pick:2,shot:[250,150],arc:0}}];
  var PRIO=[['strongest','The strongest (most health left)','your idea — the big threat first'],['weakest','The weakest','finish off the wounded, thin the pack fast'],['nearest','The nearest','whatever is closest in that direction'],['danger','The most dangerous','bosses and elites first, then archers and casters, then the rest'],['last','The one you last hit','keep working on the same foe']];
  var XB=[
   {id:'pierce',n:'A · Bow for speed, crossbow for one heavy bolt',d:['Bow: quick shots (about three a second) and the draw for a critical; arrows bounce off armour and plate.','Crossbow: one bolt, then a 1.2 s reload — but the bolt goes through every foe in a line and is the only shot that breaks a 🛡 plate or a guard; darts are rarer and dearer.','So the bow is for packs and moving foes, the crossbow for armoured and lined-up ones.']},
   {id:'arc',n:'B · The bow arcs, the crossbow flies straight',d:['Arrows fly in an arc: they go over low walls, fences and other foes (so a foe behind cover can be hit) but land a little slower.','Bolts fly dead straight and far, twice the range, and need clear sight.','So the bow is for cover and crowds, the crossbow for long lines and snipers.']},
   {id:'tools',n:'C · Arrows are elements, darts are tools',d:['Arrows keep the four kinds (normal, cold, fire, homing).','Darts become tools instead of the same four again: a rope dart that pulls a small foe to you, a net dart that holds a foe in place, a spike dart that breaks a shield, a smoke dart that blinds.','So you carry both: the bow for damage, the crossbow for control.']},
   {id:'remove',n:'D · Remove crossbows — the bow only',d:['Crossbows leave the shops and the forge; every crossbow you own becomes the matching bow (Light → Hunting bow, Bone → a Bone Longbow, Heavy → a Great Longbow, the elemental ones → elemental longbows) with the same strength.','Darts turn into arrows of the same kind, one for one; any gold difference is refunded.','The two-hand slot, shop lists, the forge, lessons and the Tome lose one item family; the paintings of crossbows are kept for camps and foes.','Simplest by far, and with proposal 1–4 above the bow alone covers every need.']}];
  var tag=function(k,v){ return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Yes'],['maybe','? Maybe'],['cut','✕ No']].map(function(b){ return '<button class="vbtn wl-sg am-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var radio=function(k,list,cur){ return '<div class="am-r" data-k="'+k+'">'+list.map(function(o){ return '<button class="vbtn am-op'+(cur===o[0]?' on':'')+'" data-c="'+o[0]+'">'+(cur===o[0]?'● ':'○ ')+esc(o[1])+'</button>'; }).join('')+'</div>'; };
  LAB_TABS.push({ id:'aim', name:'Aiming, shooting & casting',
    blurb:'<b>Round 129 — simpler shooting and casting.</b> Today the bow is a held draw with a reticle and a spell is "X twice" with a rune circle you steer. Here are <b>five ways</b> to make it simple (the first is yours), the <b>target rule</b> you could set in the controls, and <b>four proposals for bow and crossbow</b> — three ways to make them really different, and one to remove crossbows. Choose one way, ✓ / ? / ✕ each, and leave notes.',
    designs:S.map(function(x){ return {id:'aim-'+x.id,name:'Aiming: '+x.n}; }),
    render:function(){ var cur=(P('aim-scheme').regions||[])[0], h='<h3 class="am-sec">Five ways to shoot and cast — choose the one to build</h3>';
      h+=radio('aim-scheme',S.map(function(x){ return [x.id,x.n]; }),cur);
      S.forEach(function(x){ var k='aim-'+x.id, v=P(k).verdict||'';
        h+='<div class="am-c'+(v?' v-'+v:'')+(cur===x.id?' chosen':'')+'"><div class="am-g"><div>'+sketch(Object.assign({tag:x.tag},x.pic))+'</div><div><h4>'+esc(x.n)+'</h4><ul>'+x.how.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul><p class="am-pro">👍 '+esc(x.good)+'</p><p class="am-con">👎 '+esc(x.bad)+'</p>'+tag(k,v)+'<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note…"></div></div></div>'; });
      h+='<h3 class="am-sec">Who it aims at — a setting in the controls</h3><p class="am-p">Every way above uses one rule to choose the foe: only foes in range and in sight (never through a wall), inside the direction you chose; ties go to the nearest. In Training › Controls you pick the rule; which should be the default?</p>'+
        radio('aim-prio',PRIO.map(function(p){ return [p[0],p[1]+' — '+p[2]]; }),(P('aim-prio').regions||[])[0])+'<input class="tl-n wl-n" data-k="aim-prio" value="'+esc(P('aim-prio').notes||'')+'" placeholder="Your note on the target rule…">';
      h+='<h3 class="am-sec">Bow and crossbow — make them different, or keep only the bow</h3>'+radio('aim-xbow',XB.map(function(x){ return [x.id,x.n]; }),(P('aim-xbow').regions||[])[0])+'<div class="am-x">'+XB.map(function(x){ return '<div class="am-xc"><b>'+esc(x.n)+'</b><ul>'+x.d.map(function(t){ return '<li>'+esc(t)+'</li>'; }).join('')+'</ul></div>'; }).join('')+'</div>'+
        '<input class="tl-n wl-n" data-k="aim-xbow" value="'+esc(P('aim-xbow').notes||'')+'" placeholder="Your note on bows and crossbows…">';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'aim',label:'🏹 Aiming, shooting & casting: choose one of five ways, the target rule, and bow vs crossbow',where:'Aiming, shooting & casting tab',
    done:function(){ return !!(P('aim-scheme').regions||[]).length&&!!(P('aim-xbow').regions||[]).length; },go:function(){ LTODO.goTo('aim','.am-r',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('aim')<0)LAB_ACTIVE.unshift('aim');
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.am-op'); if(b){ var k=b.parentNode.dataset.k, p=LabApp.picks[k]||(LabApp.picks[k]={}); p.regions=[b.dataset.c]; if(LabApp.persist)LabApp.persist(k); setTimeout(function(){ var y=window.scrollY; LabApp.renderGrid(true); window.scrollTo(0,y); },0); return; }
    var s=e.target.closest&&e.target.closest('.am-c .wl-sg'); if(s){ var c=s.closest('.am-c'); setTimeout(function(){ var p=LabApp.picks[s.parentNode.dataset.k]||{}; c.className='am-c'+(p.verdict?' v-'+p.verdict:'')+(c.classList.contains('chosen')?' chosen':''); },0); } });
  var st=document.createElement('style'); st.textContent='.am-sec{font:600 18px "Segoe UI";color:#ffe9a8;margin:18px 0 8px}.am-p{font:13px/1.5 "Segoe UI";color:#c8d4e4}.am-r{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 10px}.am-op.on{background:#2a4a6a;color:#fff;border-color:#7fc8ff}'+
    '.am-c{background:#0b121c;border:1px solid #243246;border-left:5px solid #7fc8ff;border-radius:10px;padding:10px;margin:0 0 12px}.am-c.chosen{box-shadow:0 0 0 2px #ffd76a}.am-c.v-pick{border-color:#8fe8a0}.am-c.v-maybe{border-color:#ffd76a}.am-c.v-cut{border-color:#ff9a8a}'+
    '.am-g{display:grid;grid-template-columns:minmax(0,360px) minmax(0,1fr);gap:14px}.am-g h4{margin:0 0 4px;font:600 16px "Segoe UI";color:#ffe9a8}.am-g ul{font:13px/1.5 "Segoe UI";color:#c8d4e4;padding-left:18px;margin:4px 0}.am-pro{font:13px "Segoe UI";color:#8fe8a0;margin:4px 0}.am-con{font:13px "Segoe UI";color:#ffb0a0;margin:4px 0 8px}'+
    '.am-svg{width:100%;border-radius:8px}.am-s{font:10px "Segoe UI";fill:#c8d4e4}.am-t{font:11px "Segoe UI";fill:#ffe9a8}.am-x{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin:6px 0}.am-xc{background:#0b121c;border:1px solid #243246;border-radius:10px;padding:8px 12px;font:13px/1.5 "Segoe UI";color:#c8d4e4}.am-xc b{color:#ffe9a8}.am-xc ul{padding-left:18px;margin:4px 0}'+
    '@media (max-width:900px){.am-g{grid-template-columns:1fr}}';
  document.head.appendChild(st);
})();
