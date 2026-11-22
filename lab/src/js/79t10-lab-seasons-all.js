// ═══════════════════════════════════════════════════════════════════════
// ║ 79t10-lab-seasons-all.js — round 129: ALL THE SEASONS AND FESTIVALS, TOGETHER (Kris: "i still don't see new requests or updates for the 5
// ║ seasons as well as the festivals. let's create a new place in the lab where i can see all of the seasons and festival imagery together and
// ║ provide any comments and feedback, making sure to organize for all 5 of the seasons we show").
// ║ Five sections (the thaw · summer · the harvest · Yule · Freya's spring), each: the game in that season now, then group by group (trees,
// ║ plants, shores and ground, the village's buildings, its props, the land dressed for the season, the festival) every painting cut from its
// ║ sheet, what each sheet is (in · partly in · ordered · new this round), ✓ / ↻ and a note. Then what all seasons share (the air, the icons).
// ║ Data: tools/world/seasons_all.py (LSALL). Pictures: lab/preview/seasonsall (asset store, VSALL).
// ║ Picks: 'seasonsall-<season>-<group>' {verdict pick|redo, notes}; 'seasonsall-<season>' and 'seasonsall-all' {notes}.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof LSALL==='undefined')return;
  var I=function(n){ var p='preview/seasonsall/'+n+'.jpg'; return (typeof VSALL!=='undefined'&&VSALL[p])||p; };
  var J=function(n){ var p='preview/seasons5b/'+n+'.jpg'; return (typeof R128A!=='undefined'&&R128A[p])||p; };
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var ST={in:['✓ painted','#8fe8a0'],part:['partly painted','#ffd76a'],ordered:['ordered — not painted yet','#9ab0c8'],new:['★ new request this round','#ffb0e0'],none:['not ordered','#888']};
  var chip=function(x){ var s=ST[x.state]||ST.none; return '<span class="sa-chip" style="--c:'+s[1]+'" title="'+esc(x.title)+'">'+esc(x.id.replace(/^sc_/,''))+' · '+x.got+'/'+x.n+' · '+s[0]+'</span>'; };
  var group=function(sk,G,col){ var k='seasonsall-'+sk+'-'+G.g, v=V(k), todo=G.sheets.some(function(x){ return x.state==='new'||x.state==='ordered'||x.state==='part'; });
    return '<div class="sa-g'+(v?' v-'+v:'')+'" style="--c:'+col+'"><div class="sa-gh"><b>'+esc(G.n)+'</b><small>'+G.n_in+' of '+G.n_all+' painted'+(todo?' · more on the way':'')+'</small></div>'+
      '<div class="sa-chips">'+G.sheets.map(chip).join('')+'</div>'+(G.ev&&G.ev.length?'<p class="sa-ev">🌲 Evergreens keep their summer green in autumn now (they had been painted orange): '+esc(G.ev.join(', '))+'.</p>':'')+
      '<a href="'+I(G.img)+'" target="_blank" rel="noopener"><img class="sa-img" src="'+I(G.img)+'" alt="" loading="lazy"></a>'+
      '<div class="sa-f"><span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Good'],['redo','↻ Needs work']].map(function(o){ return '<button class="vbtn wl-sg sa-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span>'+
      '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="Your note on '+esc(G.n.toLowerCase())+' — which piece, what to change…"></div></div>'; };
  LAB_TABS.push({ id:'seasonsall', name:'All the seasons & festivals',
    blurb:'<b>Round 129 — everything for the five seasons in one place.</b> Each season shows the game in it now, then every painting group by group — the trees, the plants, the shores and ground, the village\'s buildings and its props, the land dressed for the season, and the festival at the doors and on the Green — with what is painted, what is still ordered and what is new this round. ✓ or ↻ any group and leave a note on the piece. <b>New this round</b> (<code>.\\tools\\sprites\\paint.ps1 -List r129_seasons</code>): the village props in the thaw and in Freya\'s spring (until now both showed summer\'s), and the three Blossom Feast pieces that never came out of their sheet. Autumn\'s evergreens now stay green in the game.',
    designs:LSALL.seasons.map(function(x){ return {id:x.s,name:'Seasons & festivals: '+x.name}; }),
    render:function(){ var h='<div class="sa-nav">'+LSALL.seasons.map(function(x){ return '<button class="vbtn sa-go" data-s="'+x.s+'" style="--c:'+x.col+'">'+x.ic+' '+esc(x.name.split(' — ')[0])+'</button>'; }).join('')+'<button class="vbtn sa-go" data-s="shared">✨ Shared by all</button></div>';
      LSALL.seasons.forEach(function(x){ h+='<div class="sa-s" id="sa-'+x.s+'" style="--c:'+x.col+'"><h3>'+x.ic+' '+esc(x.name)+'</h3><p class="sa-story">'+esc(x.story)+'</p>'+
        '<div class="sa-shots">'+x.shots.map(function(n){ return '<figure><img src="'+J(n)+'" alt="" loading="lazy"><figcaption>'+(n.indexOf('land_')===0?'With the land pieces — ':'The game now — ')+(/village/.test(n)?'the village':'the Grasslands')+'</figcaption></figure>'; }).join('')+'</div>'+
        x.groups.map(function(G){ return group(x.s,G,x.col); }).join('')+
        '<textarea class="wl-n sa-sn" data-k="seasonsall-'+x.s+'" placeholder="Anything about '+esc(x.name.split(' — ')[0].toLowerCase())+' as a whole…">'+esc(P('seasonsall-'+x.s).notes||'')+'</textarea></div>'; });
      h+='<div class="sa-s" id="sa-shared" style="--c:#c8d4e4"><h3>✨ Shared by all five</h3>'+LSALL.shared.map(function(G){ return group('shared',G,'#c8d4e4'); }).join('')+'</div>';
      h+='<textarea class="wl-n wl-all" data-k="seasonsall-all" placeholder="Anything about the seasons and festivals as a whole…">'+esc(P('seasonsall-all').notes||'')+'</textarea>';
      return h; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasonsall',label:'🌸 All the seasons & festivals: ✓ or ↻ every group of paintings, season by season, with notes',where:'All the seasons & festivals tab',
    done:function(){ return LSALL.seasons.every(function(x){ return x.groups.every(function(G){ return !!V('seasonsall-'+x.s+'-'+G.g); }); }); },go:function(){ LTODO.goTo('seasonsall','.sa-g',0); }});
  if(typeof LAB_ACTIVE!=='undefined'&&LAB_ACTIVE.indexOf('seasonsall')<0)LAB_ACTIVE.unshift('seasonsall');
  document.addEventListener('click',function(e){ var g=e.target.closest&&e.target.closest('.sa-go'); if(g){ var el=document.getElementById('sa-'+g.dataset.s); if(el)el.scrollIntoView({behavior:'smooth',block:'start'}); return; }
    var b=e.target.closest&&e.target.closest('.sa-g .wl-sg'); if(!b)return; var f=b.closest('.sa-g'); setTimeout(function(){ var p=LabApp.picks[b.parentNode.dataset.k]||{}; f.className='sa-g'+(p.verdict?' v-'+p.verdict:''); },0); });
  var st=document.createElement('style'); st.textContent='.sa-nav{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;gap:6px;padding:6px 0;background:#070b12}.sa-go{border-left:4px solid var(--c)}'+
    '.sa-s{border-top:4px solid var(--c);margin:14px 0 22px;padding-top:6px;scroll-margin-top:52px}.sa-s h3{margin:4px 0;color:#ffe9a8;font:600 20px "Segoe UI"}.sa-story{font:italic 13px/1.45 "Segoe UI";color:#c8d4e4;margin:0 0 8px}'+
    '.sa-shots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:0 0 10px}.sa-shots figure{margin:0}.sa-shots img{width:100%;border-radius:6px;display:block}.sa-shots figcaption{font:11px "Segoe UI";color:#8a9ab0}'+
    '.sa-g{background:#0b121c;border:1px solid #243246;border-left:5px solid var(--c);border-radius:10px;padding:8px 10px;margin:0 0 10px}.sa-g.v-pick{border-color:#8fe8a0}.sa-g.v-redo{border-color:#ff9a6a}'+
    '.sa-gh{display:flex;gap:10px;align-items:baseline}.sa-gh b{color:#ffe9a8;font:600 15px "Segoe UI"}.sa-gh small{color:#8a9ab0;font:12px "Segoe UI"}'+
    '.sa-chips{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}.sa-chip{font:11px "Segoe UI";color:#dfe8f4;border:1px solid var(--c);border-radius:9px;padding:1px 7px}.sa-ev{font:12px "Segoe UI";color:#ffcf9a;margin:2px 0}'+
    '.sa-img{width:100%;border-radius:6px;display:block;margin:4px 0;background:#222}.sa-f{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.sa-f .wl-n{flex:1;min-width:240px}.sa-sg.on.redo{background:#6a3f1f;color:#fff}.sa-sn{width:100%;min-height:44px}'+
    '@media (max-width:900px){.sa-shots{grid-template-columns:repeat(2,1fr)}}';
  document.head.appendChild(st);
})();
