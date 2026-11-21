// ═══════════════════════════════════════════════════════════════════════
// ║ 79k5-lab-music-r123.js — round 123 (Kris: "i don't think the music lab has incorporated in my new songs drops and feedback, check this out").
// ║ He was right: the songs he dropped on 11-14 were in the GAME, but the Lab's previews (tools/audio/music_preview.py) were never made again,
// ║ and round 121 joined those stale previews into the two files the Lab played. Now: every preview made again from the game's files, kept in
// ║ the Lab's asset store (audio-only MP4, 2 minutes each — LABMU.URL, from lab/preview/music4/assets.json), the credits taken in, and a
// ║ round-123 note at the top of Music & sound: his three notes, the new pieces, and the two alternates waiting with no place (☆ per alternate).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LABMU==='undefined')return;
  LABMU.URL={"mu_ash_day":"/_blob/cb8384180716fb5aac8c532de3cf82e3","mu_ash_night":"/_blob/35111e634f275a2233c6b9c40e248697","mu_castle":"/_blob/d9008932658158c5c8806e5b76971578","mu_credits":"/_blob/d2557673746477dca85e24fa9abc72d9","mu_dungeon":"/_blob/93e3e6b5a74d4f92849de9af74a4e50c","mu_fight":"/_blob/d3937571811bc98686caaddb89d9a24e","mu_glimmerhall":"/_blob/aa1cc93acb0fefdb74ab5bbf8a54ddfd","mu_glimpse":"/_blob/0c6e109cd42a571eff2b8839adf50c74","mu_grass_day":"/_blob/17a69f807e55dd26d9f598df0f5dbf3e","mu_grass_night":"/_blob/26294629a3a958abdabfe39caeb1598d","mu_green":"/_blob/d6bc894bb1f0d9061b72450f667804e3","mu_high_day":"/_blob/16ce73ecee4f113bfc5f1afa7cd629b5","mu_high_night":"/_blob/69767b50deb9701efc5817486668e5c2","mu_home":"/_blob/6787cbe98d743a3e3a5b62abc28cb5a9","mu_island":"/_blob/ba1a40e95eb6452342f0365ddbaa2390","mu_mage":"/_blob/e788c83933c574393ea27d925b4d78e4","mu_saga_old":"/_blob/f9e736cc8646977dbd35d41c3d02e18e","mu_saga_storm":"/_blob/0868139a7e5cd4ed004be5b0d2197b02","mu_shops":"/_blob/8bfe152e4b7a6701c021fc6c6761dc62","mu_sky":"/_blob/ef78185932277f98396869a8e6dacd85","mu_title":"/_blob/6c424cef52fe138a1eebd144c69b988b","mu_tower":"/_blob/197f5de3b25800d58bd1bc1a0b14d1c9","mu_trial":"/_blob/72b0a42eee8c4c242182647606b497bd","mu_village_day":"/_blob/52b770b0c6cb388c51c0acd5170aa4b7","mu_village_day.b":"/_blob/21b7eecbd643bdf422fb783c64788a3c","mu_village_night":"/_blob/14f3a65faaefd2931dd67e154687cbae","mu_wet_day":"/_blob/5ee2d7bdcac5f8b6406232b99c5fe44c","mu_wet_night":"/_blob/21be2dfcb9dad94d3d2d7dd1bea0b284","mu_castle2":"/_blob/347dd60cb40ff2a734023e66d197a7d0","mu_ash_day2":"/_blob/fe42fb1daee8c827aca9d8f23011a147"};
  LABMU.NEW={mu_ash_day:'your newest take (11-14) — from your note',mu_village_night:'your rewrite — from your note',mu_home:'your new one, alone — from your note',mu_castle:'new',mu_mage:'new',mu_island:'new',mu_trial:'new',mu_sky:'new',mu_fight:'new take',mu_credits:'new — waiting since 11-08, now in'};
  var p0=LABMU.player;
  LABMU.player=function(t){ var take=t[0], u=LABMU.URL[take], nw=LABMU.NEW[take];
    if(!u||LABMU.hosted()||typeof LAB_SET==='undefined'||LAB_SET!=='new')return p0(t).replace('<div class="lmu-p">','<div class="lmu-p">'+(nw?'<span class="lmu-new">NEW</span>':''));
    return '<div class="lmu-p">'+(nw?'<span class="lmu-new" title="'+nw+'">NEW</span>':'')+'<span class="lmu-t">'+(/\.b$/.test(take)?'take 2':'take 1')+' · '+LABMU.mmss(t[1])+'</span><audio controls preload="none" src="'+u+'"></audio></div>'; };
  var T=typeof LAB_TABS!=='undefined'&&LAB_TABS.find(function(x){ return x.id==='audio'; }); if(!T)return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var nm=function(id){ var c=typeof ZAUD!=='undefined'&&ZAUD.all().find(function(q){ return q.id===id; }); return c?c.name:id; };
  var P=function(k){ return (typeof LabApp!=='undefined'&&LabApp.picks[k])||{}; };
  var ALT=[['mu_castle2','mu_castle'],['mu_ash_day2','mu_ash_day']], OPT=[['take2','✓ Use as a 2nd take (the game alternates)'],['instead','⇄ Use instead of today\'s'],['no','✕ Leave it out']];
  var alt=function(a){ var k='audio-alt_'+a[0], v=P(k).verdict, u=LABMU.URL[a[0]];
    return '<div class="lmu-c"><b>'+esc(nm(a[1]))+' — take 2?</b> <code>'+a[0]+'</code><div class="lmu-w">in audio\\incoming since you dropped it, with no place in the game yet</div>'+
      (u?'<div class="lmu-p"><span class="lmu-t">the alternate</span><audio controls preload="none" src="'+u+'"></audio></div>':'')+
      '<div class="lmu-alt" data-k="'+k+'">'+OPT.map(function(o){ return '<button class="vbtn lmu-ab'+(v===o[0]?' on':'')+'" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</div></div>'; };
  var r0=T.render;
  T.render=function(){ var h='<div class="lmu-r123"><b>Round 123 — your new songs and notes are in.</b> They were in the game since 11-14, but this Lab was still playing the old previews. Every player below now plays the game\'s current piece (the first 2 minutes).'+
      '<ul><li><b>Your notes:</b> '+['mu_ash_day','mu_village_night','mu_home'].map(function(id){ return esc(nm(id))+' — '+LABMU.NEW[id].replace(' — from your note',''); }).join(' · ')+'.</li>'+
      '<li><b>New since the last Lab:</b> '+['mu_castle','mu_mage','mu_island','mu_trial','mu_sky','mu_fight'].map(nm).map(esc).join(' · ')+', and <b>'+esc(nm('mu_credits'))+'</b> (it waited in audio\\incoming since 11-08 — now in the game).</li>'+
      '<li><b>Two alternates with no place yet</b> — choose below.</li></ul>'+
      '<div class="lmu-grid">'+ALT.map(alt).join('')+'</div></div>';
    return h+r0.apply(this,arguments); };
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.lmu-ab'); if(!b)return; var s=b.parentNode, k=s.dataset.k, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===b.dataset.v?null:b.dataset.v; LabApp.persist(k);
    [].forEach.call(s.children,function(x){ x.className='vbtn lmu-ab'+(x.dataset.v===p.verdict?' on':''); }); });
  if(typeof LTODO!=='undefined')LTODO.add({id:'music123',label:'♫ Music: two alternates waiting — Castle halls and Ashlands by day, take 2: use, swap or leave out',where:'Music & sound tab, at the top',
    done:function(){ return ALT.every(function(a){ return !!P('audio-alt_'+a[0]).verdict; }); },go:function(){ LTODO.goTo('audio','.lmu-r123',0); }});
  var st=document.createElement('style'); st.textContent='.lmu-r123{margin:8px 0 16px;padding:10px 14px;background:#122016;border:1px solid #3c6a46;border-radius:10px;font:13.5px/1.5 "Segoe UI",sans-serif;color:#d6e8d8}.lmu-r123 ul{margin:6px 0 8px 18px;padding:0}'+
    '.lmu-new{display:inline-block;background:#ffd76a;color:#2a2000;font:700 10px "Segoe UI";border-radius:4px;padding:1px 5px;margin-right:6px;vertical-align:middle}.lmu-alt{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.lmu-ab{font-size:12px;padding:3px 8px;opacity:.8}.lmu-ab.on{opacity:1;background:#1f6a3a;border-color:#8fe8a0;color:#fff}';
  document.head.appendChild(st);
})();
