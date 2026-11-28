// ═══════════════════════════════════════════════════════════════════════
// ║ 79n9-9-lab-lines143.js — round 143: the villagers' lines, batch 1 (412 new lines, by the stage of the saga). One card per villager:
// ║ ✓ the set, or note a line to change (quote it). Picks: lines143-<villager>, lines143-all.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LINES143==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Good'],['maybe','? Some'],['cut','✕ Redo']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+(ph||'Note…')+'">'; };
  var ST={1:'Gildenmark (the start)',2:'Fernheim open',3:'Cragland open',4:'Cinderheim open',5:'After the spirits come home'};
  LAB_TABS.push({ id:'lines143', name:'Villager lines (batch 1)',
    blurb:'<b>Round 143 — the villagers\' lines, batch 1.</b> 412 new lines for all 34 villagers, written for each stage of the saga, so what they say changes as you open each realm and again after the end. Folk who arrive later only speak for the stages they are there; the gods and the children only after the end. Kept: no god named before the end, nothing about the twins\' gift or the basket, the Binders never at the village. In the game now (each new line comes up twice as often as the old ones). ✓ a villager\'s set, or quote a line in the note to change it. <i>Next batches: the fairies to 40 each, the mages to 40 each, then monarchs, familiars, the great spirits, castles, the Binders and the island traders.</i>',
    designs:[{id:'lines143',name:'Villager lines'}],
    render:function(){ var h='', n=0;
      Object.keys(LINES143).forEach(function(k){ var V=LINES143[k], c=0; Object.keys(V.S).forEach(function(s){ c+=V.S[s].length; }); n+=c;
        h+='<div class="w4-c"><h3>'+esc(V.who)+' <small style="color:#9fb0c4">— '+esc(V.pick)+' · '+c+' new</small></h3>'+Object.keys(V.S).map(function(s){ return '<div class="w4-p"><b>'+ST[s]+'</b><ul>'+V.S[s].map(function(t){ return '<li>“'+esc(t)+'”</li>'; }).join('')+'</ul></div>'; }).join('')+
          '<div class="w4-a">'+tag('lines143-'+k)+note('lines143-'+k,'Quote a line to change, or what\'s missing…')+'</div></div>'; });
      return '<p class="w4-p"><b>'+n+'</b> lines.</p>'+h+'<textarea class="wl-n wl-all" data-k="lines143-all" placeholder="Anything about the voices overall…">'+esc(P('lines143-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'lines143',label:'💬 Villager lines batch 1: ✓ or note each villager',where:'Villager lines (batch 1) tab',done:function(){ return Object.keys(LINES143).every(function(k){ return !!P('lines143-'+k).verdict; }); },go:function(){ LTODO.goTo('lines143',null,0); }});
})();
