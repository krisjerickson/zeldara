// ═══════════════════════════════════════════════════════════════════════
// ║ 79t6-lab-seasart.js — round 116: SEASONS — THE PAINTINGS, as they come in (Kris: "load more of the seasons outcomes into the lab as
// ║ well for me to review as things come in"). Each approved sheet beside its spring, autumn and winter repaints (ZSEAS_PREV, made by
// ║ tools/sprites/season_preview.py), and the world in the game today. Picks 'seasart-<sheet>': ✓ good / ↻ paint again, with a note.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var X=typeof ZSEAS_PREV!=='undefined'&&ZSEAS_PREV.src?ZSEAS_PREV:{sheets:[],src:{}}, HAVE={}; (X.sheets||[]).forEach(function(i){ HAVE[i]=1; });
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var P=function(k){ return LabApp.picks[k]||{}; }, V=function(k){ return P(k).verdict||null; };
  var SN={sp:'Spring',au:'Autumn',wi:'Winter (mild)'}, SRC=[]; Object.keys(X.src).forEach(function(id){ var o=X.src[id]; if(SRC.indexOf(o)<0)SRC.push(o); });
  var title=function(id){ var S=typeof ZSCN!=='undefined'&&ZSCN.SHEETS.find(function(s){ return s.id===id; }); return S?S.title.replace(/ — in .*$/,''):id; };
  var ORIG={}, TH=X.thumb||{}; (X.orig||[]).forEach(function(i){ ORIG[i]=1; }); var img=function(id,cap){ if(TH[id])return '<figure class="sa-f"><img loading="lazy" src="'+TH[id]+'" alt=""><figcaption>'+esc(cap)+'</figcaption></figure>';
    if(/^sc_seas_sp_v/.test(id)&&!X.src[id])return '<figure class="sa-f sa-wait"><div>not asked for — the village keeps its summer look in spring (say if you want one)</div><figcaption>'+esc(cap)+'</figcaption></figure>';
    if(X.orig&&!/^sc_(seas|fest)_/.test(id)&&id!=='ingame'&&!ORIG[id])return '<figure class="sa-f sa-wait"><div>the approved sheet, in the game today</div><figcaption>'+esc(cap)+'</figcaption></figure>'; return HAVE[id]||!/^sc_seas_/.test(id)?'<figure class="sa-f"><img loading="lazy" src="preview/seasart/'+id+'.webp" data-big="'+id+'" alt=""><figcaption>'+esc(cap)+'</figcaption></figure>':'<figure class="sa-f sa-wait"><div>painting…</div><figcaption>'+esc(cap)+'</figcaption></figure>'; };
  (X.fest||[]).forEach(function(i){ HAVE[i]=1; });
  var pick=function(id){ if(!HAVE[id])return ''; var k='seasart-'+id, v=V(k); return '<div class="sa-a"><span class="sa-seg" data-k="'+k+'">'+[['pick','✓ Good'],['cut','↻ Paint again']].map(function(o){ return '<button class="vbtn sa-sg'+(v===o[0]?' on '+o[0]:'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</span><input class="tl-n sa-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="What to change…"></div>'; };
  /* round 122: the village has no spring repaint — show the summer painting the game uses in spring, and let Kris choose to keep it or ask for a spring version */
  var SPV=[]; var springSame=function(o,id){ var k='seasart-'+id, v=V(k), src=TH[o]||('preview/seasart/'+o+'.webp'); if(SPV.indexOf(id)<0)SPV.push(id);
    return '<figure class="sa-f sa-same"><img loading="lazy" src="'+src+'" alt=""><span class="sa-tag">the summer painting</span><figcaption>Spring — the game uses the summer painting</figcaption></figure>'+
      '<div class="sa-a"><span class="sa-seg" data-k="'+k+'">'+[['pick','✓ Keep the summer look'],['cut','🌸 Paint a spring version']].map(function(o2){ return '<button class="vbtn sa-sg'+(v===o2[0]?' on '+o2[0]:'')+'" data-v="'+o2[0]+'">'+o2[1]+'</button>'; }).join('')+'</span><input class="tl-n sa-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="What spring should add (blossom, fresh green…)"></div>'; };
  LAB_TABS.push({ id:'seasart', name:'Seasons: the paintings',
    blurb:'<b>Round 122 — the village has no spring repaints: its Spring slot now shows the summer painting the game uses in spring. Keep that look, or ask for a spring version (blossom, fresh green) with a note.</b> <b>Round 120 — wave S2 is in: the village\'s buildings and props in autumn and mild winter, and the festivals (dressings, set-pieces, food) further down.</b> <b>Round 116 — the seasons\' paintings, as they come in.</b> Each approved sheet of the world beside its spring, autumn and mild-winter repaint (the same items in the same places — only the season changes). ✓ the good ones; ↻ with a note for any to paint again. Click a picture to see it large. They are in the game now (the last row); anything not yet repainted is tinted from its summer picture.',
    designs:Object.keys(X.src).concat(['sc_seas_air','sc_seas_icons'],X.fest||[]).map(function(id){ return {id:id,name:id}; }),
    render:function(){ var n=(X.sheets||[]).length, tot=Object.keys(X.src).length+2;
      var h=LBR.sec('The world, season by season',n+' of '+tot+' sheets painted'+(X.at?' · as of '+esc(X.at):'')+' · ✓ good · ↻ paint again');
      h+=SRC.map(function(o){ return '<div class="sa-row"><h4>'+esc(title(o))+'</h4><div class="sa-g">'+img(o,'Today (summer)')+['sp','au','wi'].map(function(s){ var id='sc_seas_'+s+'_'+o.replace(/^sc_/,''); if(s==='sp'&&/^sc_seas_sp_v/.test(id)&&!X.src[id])return '<div class="sa-c">'+springSame(o,id)+'</div>'; return '<div class="sa-c">'+img(id,SN[s])+pick(id)+'</div>'; }).join('')+'</div></div>'; }).join('');
      if((X.fest||[]).length){ var FN={sc_fest_dress_sp:'Spring festival — the dressings',sc_fest_dress_su:'Midsummer — the dressings',sc_fest_dress_au:'Harvest — the dressings',sc_fest_dress_wi:'Yule — the dressings',sc_fest_dress_bl:'Freya\'s Blessing — the dressings',sc_fest_set_sp:'Spring festival — the set-pieces',sc_fest_set_su:'Midsummer — the set-pieces',sc_fest_set_au:'Harvest — the set-pieces',sc_fest_set_wi:'Yule — the set-pieces',sc_fest_set_bl:'Freya\'s Blessing — the set-pieces',sc_fest_food:'Festival food and keepsakes'};
        h+=LBR.sec('The festivals (wave S2, round 120)','what the village is dressed with for each festival, the Green\'s set-pieces and the food · ✓ good · ↻ paint again');
        h+='<div class="sa-row"><div class="sa-g sa-fest">'+X.fest.map(function(id){ return '<div class="sa-c">'+img(id,FN[id]||id)+pick(id)+'</div>'; }).join('')+'</div></div>'; }
      h+=LBR.sec('The air, and the seasons\' marks and food','new sheets (no original)');
      h+='<div class="sa-row"><div class="sa-g">'+['sc_seas_air','sc_seas_icons'].map(function(id){ return '<div class="sa-c">'+img(id,id==='sc_seas_air'?'What drifts past':'Marks and seasonal food')+pick(id)+'</div>'; }).join('')+'</div></div>';
      h+=LBR.sec('In the game today','spring, summer, autumn, winter — with the paintings above (wave S1). Things not yet repainted are tinted');
      h+='<div class="sa-row"><div class="sa-g sa-one">'+img('ingame','The village in each season, with wave S1 painted in (round 116)')+'</div></div>';
      return h; } });
  document.addEventListener('click',function(e){ var im=e.target.closest&&e.target.closest('.sa-f img'); if(im){ var o=document.getElementById('sa-big'); if(!o){ o=document.createElement('div'); o.id='sa-big'; o.onclick=function(){ o.style.display='none'; }; document.body.appendChild(o); }
      o.innerHTML='<img src="'+im.src+'">'; o.style.display='flex'; return; }
    var sg=e.target.closest&&e.target.closest('.sa-seg .sa-sg'); if(!sg)return; var s=sg.parentNode, k=s.dataset.k, nv=V(k)===sg.dataset.v?null:sg.dataset.v, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=nv; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn sa-sg'+(x.dataset.v===nv?' on '+nv:''); }); });
  document.addEventListener('change',function(e){ var t=e.target.closest&&e.target.closest('.sa-n'); if(!t)return; var p=LabApp.picks[t.dataset.k]=LabApp.picks[t.dataset.k]||{}; p.notes=t.value; LabApp.persist(t.dataset.k); });
  var st=document.createElement('style'); st.textContent='.sa-row{border:1px solid #243246;border-radius:10px;background:#0b121c;padding:8px 10px;margin:8px 0}.sa-row h4{margin:2px 0 6px;color:#ffe9a8;font:600 14px Georgia,serif}'+
    '.sa-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.sa-g.sa-one{grid-template-columns:1fr}.sa-f{margin:0}.sa-f img{width:100%;border-radius:6px;cursor:zoom-in;display:block;background:#222834}.sa-f figcaption{font:600 11.5px "Segoe UI";color:#9fb0c8;margin-top:3px}'+
    '.sa-same{position:relative}.sa-same img{opacity:.6;filter:saturate(.8)}.sa-tag{position:absolute;left:6px;top:6px;background:rgba(8,14,22,.85);border:1px solid #3a4a5e;border-radius:4px;padding:1px 6px;font:600 11px "Segoe UI";color:#cfe0f5}'+
    '.sa-wait div{aspect-ratio:3/2;border:1px dashed #3a4a5e;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#6a7a8e;font:12px "Segoe UI"}.sa-a{display:flex;flex-direction:column;gap:4px;margin-top:4px}'+
    '.sa-sg{padding:2px 8px;font-size:11.5px;opacity:.75}.sa-sg.on{opacity:1}.sa-sg.on.pick{background:#1f6a3a;border-color:#8fe8a0;color:#fff}.sa-sg.on.cut{background:#6a2a2a;border-color:#ff9a8a;color:#fff}.sa-n{width:100%;box-sizing:border-box;font-size:11.5px}'+
    '#sa-big{position:fixed;inset:0;z-index:100100;background:rgba(0,0,0,.88);display:none;align-items:center;justify-content:center;cursor:zoom-out}#sa-big img{max-width:96vw;max-height:94vh;border-radius:8px}'+
    '@media (max-width:800px){.sa-g{grid-template-columns:repeat(2,minmax(0,1fr))}}';
  document.head.appendChild(st);
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('seasart');
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasspring',label:'🌸 Seasons: the village in spring — keep the summer look, or paint a spring version (9 sheets)',where:'Seasons: the paintings tab',
    done:function(){ var L=Object.keys(X.src).filter(function(i){ return /^sc_seas_au_v/.test(i); }).map(function(i){ return i.replace('_au_','_sp_'); }); return L.length>0&&L.every(function(id){ return !!V('seasart-'+id); }); },go:function(){ LTODO.goTo('seasart','.sa-same',0); }});
  if(typeof LTODO!=='undefined')LTODO.add({id:'seasart2',label:'🍂 Seasons wave S2: ✓ or ↻ the village\'s autumn and winter sheets and the festival paintings',where:'Seasons: the paintings tab',
    done:function(){ return (X.sheets||[]).concat(X.fest||[]).length>0&&(X.sheets||[]).concat(X.fest||[]).every(function(id){ return !!V('seasart-'+id); }); },go:function(){ LTODO.goTo('seasart','.sa-row',0); }});
})();
