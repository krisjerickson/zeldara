// ═══════════════════════════════════════════════════════════════════════
// ║ 79m5-lab-stingcmp.js — round 135: STINGERS OR EFFECTS? (Kris: "I am not sold on the stingers, most of these seem bad. make a lab to
// ║ compare sound effects for the moments compared with the stingers"). The twelve stingers he made (two takes for four moments) are NOT in
// ║ the game. For each moment: what plays there today (or the effect that could), each stinger whole, the same stinger cut to the length
// ║ it was asked for (it came back two to three times longer), and the effect and the cut stinger played together.
// ║ Picks: 'stingcmp-<moment>' {verdict fx|st1|st2|both|none|remake, notes}; 'stingcmp-all'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var U=function(k){ return (typeof VSTG!=='undefined'&&VSTG[k])||('preview/stingcmp/'+k+'.webm'); }, L=function(k){ return (typeof VSTG_LEN!=='undefined'&&VSTG_LEN[k])||0; };
  var P=function(k){ return LabApp.picks[k]||{}; };
  // [id, moment, when, today (words), effects that play now, effects that could, stingers, asked length]
  var M=[['spirit','A spirit is freed','a spirit rises from its bindstone','the spirit\'s own rising sound',['sfx_spirit_free'],[],['st_spirit','st_spirit2'],6],
    ['rune','A soul-line lights','a runestone wakes and the light runs along its line','the runestone waking, then the line traced',['sfx_rune_wake','sfx_rune_wake.b','sfx_line_trace','sfx_line_trace.b'],[],['st_rune','st_rune2'],4],
    ['quest','A quest is done','you finish a quest','nothing (only the note) — an effect that could go there:',[],['sfx_camp','sfx_camp.b','sfx_ui_note'],['st_quest','st_quest2'],4],
    ['level','Level up','you go up a level','a small chime made in code with the banner — effects that could go there:',[],['sfx_gem','sfx_lodestar'],['st_level'],3],
    ['boss','A boss falls','the guardian is beaten','the boss\'s fall',['sfx_boss_fall','sfx_boss_fall.b','sfx_boss_fall.c'],[],['st_boss_down','st_boss_down2'],6],
    ['death','You fall','the hero is beaten','the hero falling',['sfx_fall'],[],['st_death'],5],
    ['discover','A new place','you find a new place or site','nothing (only the banner) — effects that could go there:',[],['sfx_great_door','sfx_travel'],['st_discover'],4],
    ['glimpse','A glimpse opens','a saga glimpse begins after a spirit is freed','the page turning as the painting opens',['sfx_page','sfx_page.b'],[],['st_glimpse'],4]];
  var cur=null, stop=function(){ (cur||[]).forEach(function(a){ try{ a.pause(); }catch(e){} }); cur=null; document.querySelectorAll('.sc-b.on').forEach(function(b){ b.classList.remove('on'); }); };
  var play=function(keys,btn){ stop(); cur=keys.map(function(k){ var a=new Audio(U(k)); a.play().catch(function(){}); return a; }); if(btn){ btn.classList.add('on'); var n=0; cur.forEach(function(a){ a.onended=function(){ if(++n>=cur.length&&btn)btn.classList.remove('on'); }; }); } };
  var b=function(keys,label,cls){ return '<button class="vbtn sc-b'+(cls?' '+cls:'')+'" data-p="'+keys.join(',')+'">▶ '+label+'</button>'; };
  var nm=function(k){ return k.replace(/^sfx_/,'').replace(/\.([b-d])$/,' ($1)').replace(/_/g,' '); };
  LAB_TABS.push({ id:'stingcmp', name:'Stingers or effects?',
    blurb:'<b>Round 135 — your twelve stingers, side by side with the effects.</b> You were not sold on them, so none is in the game. Each came back two to three times longer than asked, so each is also shown cut to its planned length with a fade. Pick per moment: the effect alone, a stinger, both together, nothing, or a remake.',
    designs:[{id:'stingcmp',name:'Stingers or effects?'}],
    render:function(){ var h='<div class="w4-in">The five new songs are in the game: the Bifröst, the feast hall, the gods free, the village moment and the celebration. Only the stingers wait here.</div>';
      M.forEach(function(m){ var k='stingcmp-'+m[0], p=P(k), fx=m[4].length?m[4]:m[5], f0=fx[0];
        var opts=[['fx',m[4].length?'✓ The effect alone':'✓ The effect'],['st1','✓ Stinger'+(m[6].length>1?' 1':'')]].concat(m[6].length>1?[['st2','✓ Stinger 2']]:[]).concat([['both','✓ Effect + stinger'],['none','— Nothing'],['remake','↻ Remake the stinger']]);
        h+='<div class="w4-c sc-c"><h3>'+esc(m[1])+' <small>'+esc(m[2])+'</small></h3>'+
          '<div class="sc-r"><span class="sc-l">'+(m[4].length?'Today':'Today')+'</span><span class="sc-t">'+esc(m[3])+'</span>'+fx.map(function(e){ return b([e],nm(e)+' · '+L(e)+' s'); }).join('')+'</div>'+
          m[6].map(function(s,i){ return '<div class="sc-r"><span class="sc-l">Stinger'+(m[6].length>1?' '+(i+1):'')+'</span>'+b([s],'whole · '+L(s)+' s')+b([s+'.cut'],'cut to '+m[7]+' s · '+L(s+'.cut')+' s','sc-cut')+b([f0,s+'.cut'],'with '+nm(f0),'sc-both')+'</div>'; }).join('')+
          '<div class="w4-a"><span class="wl-seg" data-k="'+k+'">'+opts.map(function(o){ return '<button class="vbtn wl-sg'+(p.verdict===o[0]?' on pick':'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span><input class="tl-n wl-n" data-k="'+k+'" value="'+esc(p.notes||'')+'" placeholder="Your note (which effect, what a remake should be)…"></div></div>'; });
      h+='<div class="w4-c sc-c"><h3>Treasure <small>a rare item or a chest</small></h3><p class="w4-p">No stinger came back for this one. Today: the chest opening and the gem.</p><div class="sc-r">'+b(['sfx_chest'],'chest')+b(['sfx_chest.b'],'chest (b)')+b(['sfx_gem'],'gem')+'</div></div>';
      return h+'<textarea class="wl-n wl-all" data-k="stingcmp-all" placeholder="Anything about the stingers as a whole…">'+esc(P('stingcmp-all').notes||'')+'</textarea><button class="vbtn sc-stop">■ Stop</button>'; } });
  document.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.sc-b'); if(t){ e.preventDefault(); if(t.classList.contains('on')){ stop(); return; } play(t.dataset.p.split(','),t); return; } if(e.target.closest&&e.target.closest('.sc-stop'))stop(); });
  if(typeof LTODO!=='undefined')LTODO.add({id:'stingcmp',label:'🔔 Stingers or effects? — pick for each of the eight moments',where:'Stingers or effects? tab',
    done:function(){ return M.every(function(m){ return !!P('stingcmp-'+m[0]).verdict; }); },go:function(){ LTODO.goTo('stingcmp','.sc-c',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('stingcmp')<0)LAB_ACTIVE.unshift('stingcmp');
  var st=document.createElement('style'); st.textContent='.sc-c h3 small{font:400 13px "Segoe UI";color:#9ab0c8;margin-left:6px}.sc-r{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:5px 0}.sc-l{min-width:72px;font:600 12.5px "Segoe UI";color:#ffcf9a}.sc-t{font:12.5px "Segoe UI";color:#c8d4e4;margin-right:4px}'+
    '.sc-b{padding:3px 10px;font-size:12.5px}.sc-b.on{background:#5a4a14;color:#fff}.sc-cut{border-color:#7fd0ff}.sc-both{border-color:#c8a0ff}.sc-stop{margin-top:8px}';
  document.head.appendChild(st);
})();
