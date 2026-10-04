// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 18 — SPRITE LIBRARY tab. Everything that needs a painted sprite, read
// ║ live from the game data through ZSPR (src/js/07zs-sprites.js):
// ║   Guide      totals, how the process works, the style, the hero mapping
// ║              (weapon → animation, skill → animation) and the pilot requests
// ║   one chip per group: every character with its stand-in, the moves it must
// ║              show, its sheets and the ChatGPT request for each (Copy button)
// ║ "☆ Looks right" + notes are saved as 'sprlib-<character id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ LBR.TABS.push('sprlib');
  var SL={ grp:'guide',
    GROUPS:[['guide','Guide'],['hero','Heroes'],['rider','Hero on mounts'],['mount','Mounts'],['m1','Grasslands monsters'],['m2','Wetlands monsters'],['m3','Highlands monsters'],['m4','Ashlands monsters'],
            ['boss','Bosses'],['npc','NPCs'],['familiar','Familiars'],['fairy','Fairies'],['animal','Animals'],['vehicle','Vehicles']],
    inGroup:function(e,g){ return /^m\d$/.test(g)?(e.group==='monster'&&e.q===+g[1]):e.group===g; },
    esc:function(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); },
    reqOf:function(id){ if(!SL._req){ SL._req={}; ZSPR.requests().forEach(function(q){ SL._req[q.id]=q; }); } return SL._req[id]; },
    have:function(id){ return typeof ZSPR_INCOMING!=='undefined'&&ZSPR_INCOMING.indexOf(id)>=0; },
    faceTxt:function(e){ var F=e.facings; return F[0]==='x'?'side, front and back in one sheet':F.length>1?'front, side and back (humanoid)':F[0]==='f'?'front'+(e.walker?' + a walking sheet':''):'one 3/4 view, mirrored for left'; },
    copy:function(text){ var done=function(){ LabApp.toast('Request copied — paste it into ChatGPT'); };
      var fb=function(){ var ta=document.createElement('textarea'); ta.value=text; ta.style.cssText='position:fixed;left:-9999px;top:0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ LabApp.toast('Could not copy — open the request and select the text'); } ta.remove(); };
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,fb); else fb(); },
    // the stand-in the game shows today
    thumbSrc:function(e,cb){ try{
        if(e.group==='hero'){ var im=new Image(); im.onload=function(){ cb(e.hero==='f'&&typeof _heroRecolour==='function'?_heroRecolour(im):im); }; im.src=HERO_WALK_FRAMES_FRONT[0]; return; }
        if(e.group==='monster'){ var R=MON_BY_ID[e.id]; return cb(R&&msFrames(R.spec)[0]); }
        if(e.group==='npc'||e.group==='mount'){ var C=CHAR_BY_ID[e.id]; return cb(C&&chFrames(C)[0]); }
        if(e.group==='rider'){ var M=CHAR_BY_ID['mt_'+e.mount]; return cb(M&&chFrames(M)[0]); }
        if(e.group==='boss'){ var D=BOSS_ART[e.id+'.'+(BOSS_PICK[e.id]||'a')]; return cb(D&&BA.thumbs(D,72)[0]); }
        if(e.group==='familiar'){ return cb(spiritFrames(SPIRIT_BY_ID[FAMILIAR_PICK[e.el]])[0]); }
        if(e.group==='fairy'){ if(e.monarch){ var id=e.id.replace('monarch_',''); return cb(monarchFrames(FAIRY_MONARCH_BY_ID[id])[0]); } return cb(fairyFrames(FAIRY_BY_ID[e.id.replace('fairy_','')])[0]); }
      }catch(err){} cb(null); },
    paintThumbs:function(){ document.querySelectorAll('.sl-cv').forEach(function(cv){ if(cv._done)return; cv._done=true; var e=ZSPR.all().find(function(x){ return x.id===cv.dataset.id; }), c=cv.getContext('2d'); if(!e)return;
        SL.thumbSrc(e,function(src){ c.clearRect(0,0,72,72); if(!src||!src.width){ c.fillStyle='#22304e'; c.fillRect(0,0,72,72); c.fillStyle='#8fa2c4'; c.font='11px sans-serif'; c.textAlign='center'; c.fillText('no stand-in',36,40); return; }
          c.imageSmoothingEnabled=src.width>120; var s=Math.min(68/src.width,68/src.height); c.drawImage(src,(72-src.width*s)/2,70-src.height*s,src.width*s,src.height*s); }); }); },
    prev:function(id){ return typeof ZSPR_PREVIEW!=='undefined'&&ZSPR_PREVIEW[id]; },
    // a received sheet: the image as it came, the cut frames, and the frames at game size next to today's hero
    received:function(id,title){ var P=SL.prev(id); if(!P)return '';
      return '<div class="sl-rcv" data-rcv="'+id+'"><div class="sl-rcv-h"><b>'+SL.esc(title||id)+'</b> <span class="sl-got">received</span> <span class="sl-meta">'+P.n+' poses found · cut to '+P.cell[0]+' × '+P.cell[1]+' px cells</span></div>'+
        '<div class="sl-rcv-b"><figure><img src="'+P.sheet+'" alt=""><figcaption>The sheet as it came (background removed)</figcaption></figure>'+
        '<figure><canvas class="sl-game" width="900" height="310" data-id="'+id+'"></canvas><figcaption>In the game: today\'s hero (left of each pair) and the new frames, on grass and on dungeon stone, at today\'s size and at 1.5×</figcaption></figure></div></div>'; },
    paintGame:function(){ document.querySelectorAll('.sl-game').forEach(function(cv){ if(cv._done)return; cv._done=true; var P=SL.prev(cv.dataset.id), c=cv.getContext('2d'), W=cv.width, H=cv.height; if(!P)return;
        var fr=new Image(), old=new Image(), n=0, go=function(){ if(++n<2)return;
          c.fillStyle='#6f9a52'; c.fillRect(0,0,W/2,H); c.fillStyle='rgba(60,100,40,.35)'; for(var i=0;i<60;i++)c.fillRect((i*97)%(W/2),(i*53)%H,2,5); c.fillStyle='#1b1d26'; c.fillRect(W/2,0,W/2,H);
          c.strokeStyle='rgba(255,255,255,.05)'; for(i=0;i<12;i++)c.strokeRect(W/2+(i%6)*74+4,Math.floor(i/6)*150+6,70,144);
          var cw=P.cell[0], ch=P.cell[1], k=Math.min(P.n,3), z=2;   // drawn at 2× so it can be judged on screen
          [[42,'today\'s size (42 px tall)'],[63,'1.5× (63 px tall)']].forEach(function(S,row){ [0,W/2].forEach(function(ox){ var y=row?H-16:126, x=ox+48;
              c.imageSmoothingEnabled=false; var oh=42*z*(S[0]/42), ow=oh*old.width/old.height; c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x,y,ow*0.36,5,0,0,7); c.fill(); c.drawImage(old,x-ow/2,y-oh,ow,oh);
              c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; var nh=S[0]*z, nw=nh*cw/ch; for(var f=0;f<k;f++){ var fx=x+92+f*(nw+18); c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(fx,y,nw*0.3,5,0,0,7); c.fill(); c.drawImage(fr,f*cw,0,cw,ch,fx-nw/2,y-nh,nw,nh); }
              c.fillStyle='rgba(255,255,255,.6)'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='left'; if(ox===0)c.fillText(S[1],8,row?150:14); }); }); };
        fr.onload=go; old.onload=go; fr.src=P.frames; old.src=HERO_WALK_FRAMES_FRONT[0]; }); },
    girlCard:function(k){ var G=ZSPR.HERO.GIRL_LOOKS[k], id='hero_f.model_'+k, on=LBR.picked('sprlib',id), p=LabApp.picks['sprlib-'+id]||{};
      return '<article class="br-card sl-card'+(on?' on':'')+'" data-tab="sprlib" data-id="'+id+'"><div class="sl-head"><div><b>Look '+k.toUpperCase()+' · '+SL.esc(G.name)+'</b><span class="sl-sub">'+SL.esc(G.tag)+'</span><p>'+SL.esc(G.look)+'</p></div></div>'+
        '<ul class="sl-sheets"><li class="sl-sh" data-sheet="'+id+'"><b>Model sheet</b> <span class="sl-meta">front, side, back · attach the boy, the centaur and the boy\'s model sheet · save as <code>'+id+'.png</code></span><span class="sl-btns"><button class="vbtn sl-copy">Copy request</button><button class="vbtn sl-show">Show</button></span><pre class="sl-pre" hidden></pre></li></ul>'+
        SL.received(id,'Look '+k.toUpperCase())+
        '<div class="br-t"><div class="br-act"><button class="vbtn br-pick" aria-pressed="'+on+'">'+(on?'★ Looks right':'☆ Looks right')+'</button></div><textarea class="mn-notes br-notes" rows="1" placeholder="Notes (keep the braid from A, the mantle from B …)">'+SL.esc(p.notes||'')+'</textarea></div></article>'; },
    sheetRow:function(e,sh){ var got=SL.have(sh.id); return '<li class="sl-sh" data-sheet="'+sh.id+'"><span class="sl-tier sl-'+(sh.tier||'core')+'">'+(sh.tier||'core')+'</span> <b>'+SL.esc(sh.title)+'</b> <span class="sl-meta">'+
        (sh.facing&&sh.facing!=='x'?ZSPR.FACE[sh.facing]+' · ':'')+sh.poses.length+' poses · '+sh.cols+' × '+sh.rows+(got?' · <span class="sl-got">received</span>':'')+'</span>'+
        '<span class="sl-btns"><button class="vbtn sl-copy">Copy request</button><button class="vbtn sl-show">Show</button></span><pre class="sl-pre" hidden></pre></li>'; },
    card:function(e){ var p=LabApp.picks['sprlib-'+e.id]||{}, on=LBR.picked('sprlib',e.id);
      return '<article class="br-card sl-card'+(on?' on':'')+'" data-tab="sprlib" data-id="'+e.id+'"><div class="sl-head"><canvas class="sl-cv" width="72" height="72" data-id="'+e.id+'"></canvas><div><b>'+SL.esc(e.name)+'</b><span class="sl-sub">'+SL.esc(e.sub)+' · '+SL.faceTxt(e)+(e.scale&&e.group!=='hero'?' · '+e.scale+'× hero height':'')+'</span>'+
        '<p>'+SL.esc(String(e.look||'').replace(/^the hero (boy|girl)[^:]*: /,''))+'</p></div></div>'+
        '<div class="sl-moves">'+e.anims.map(function(a){ return '<span class="sl-mv" title="'+SL.esc(a.why||'')+'">'+SL.esc(a.label)+' ×'+a.n+(a.why&&!a.hero?' <i>'+SL.esc(a.why.length>34?a.why.slice(0,32)+'…':a.why)+'</i>':'')+'</span>'; }).join('')+'</div>'+
        (e.unknown&&e.unknown.length?'<p class="sl-warn">No animation mapped for: '+SL.esc(e.unknown.join(', '))+'</p>':'')+
        (e.inSheet&&!e.sheets.length?'<p class="sl-on">Painted on shared sheet <code>'+e.inSheet+'</code>, position '+e.sheetPos+'.</p>':'')+
        '<ul class="sl-sheets">'+e.sheets.map(function(sh){ return SL.sheetRow(e,sh); }).join('')+'</ul>'+
        '<div class="br-t"><div class="br-act"><button class="vbtn br-pick" aria-pressed="'+on+'">'+(on?'★ Looks right':'☆ Looks right')+'</button></div>'+
        '<textarea class="mn-notes br-notes" rows="1" placeholder="Notes (missing move, wrong look, change the request)…">'+SL.esc(p.notes||'')+'</textarea></div></article>'; },
    guide:function(){ var S=ZSPR.stats(), H=ZSPR.HERO, G=S.byGroup, names={hero:'Heroes',rider:'Hero on mounts',monster:'Monsters',boss:'Bosses, forms, elites',npc:'NPCs',mount:'Mounts',familiar:'Familiars',fairy:'Fairies and monarchs',animal:'Animals',vehicle:'Vehicles'};
      var tot='<table class="sl-tab"><tr><th>Group</th><th>Characters</th><th>Core sheets</th><th>Extra sheets</th><th>Poses</th></tr>'+Object.keys(G).map(function(k){ return '<tr><td>'+names[k]+'</td><td>'+G[k].chars+'</td><td>'+G[k].core+'</td><td>'+(G[k].sheets-G[k].core)+'</td><td>'+G[k].poses+'</td></tr>'; }).join('')+
        '<tr class="sl-sum"><td>Total</td><td>'+S.chars+'</td><td>'+S.core+'</td><td>'+(S.sheets-S.core)+'</td><td>'+S.poses+'</td></tr></table>';
      var items=Object.keys(ITEMS).filter(function(k){ return H.weaponClass(k); }), byC={}; items.forEach(function(k){ var c=H.weaponClass(k); (byC[c]=byC[c]||[]).push(ITEMS[k].name||k); });
      var wtab='<table class="sl-tab"><tr><th>Weapon class</th><th>Animation</th><th>Frames</th><th>Items that use it</th></tr>'+Object.keys(H.WCLASS).map(function(c){ var W=H.WCLASS[c], A=H.ANIMS[W.anim]; return '<tr><td>'+W.label+'</td><td><code>'+W.anim+'</code></td><td>'+A.n+' × 3 facings</td><td>'+(c==='hand'?'Spells cast with no staff or wand equipped':SL.esc((byC[c]||[]).join(', ')))+'</td></tr>'; }).join('')+'</table>';
      var stab='<table class="sl-tab"><tr><th>Skill</th><th>Animation</th><th>Frames</th><th>Drawn</th></tr>'+Object.keys(H.SKILL_ANIM).map(function(k){ var a=H.SKILL_ANIM[k], A=H.ANIMS[a]; return '<tr><td>'+SL.esc((ITEMS[k]&&ITEMS[k].name)||k)+'</td><td><code>'+a+'</code></td><td>'+A.n+'</td><td>'+(A.d?'once (side view)':'front, side, back')+'</td></tr>'; }).join('')+'</table>';
      var atab='<table class="sl-tab"><tr><th>What you do</th><th>Animation</th><th>Stand-in today</th></tr>'+[['Stand / walk / Shift-run','idle, walk, run'],['Space: melee attack','melee_sword or melee_axe (by the weapon in hand)'],['Ctrl: ranged attack','ranged_bow or ranged_xbow (by the weapon in hand)'],['X: cast a spell','magic_staff, magic_wand or magic_hand (by what is equipped)'],['Shift: shield','block'],['Z: skill','see the skill table'],['Hit / defeated','hurt, death'],['Potion / food / level up / campfire','drink, eat, cheer, rest']]
          .map(function(r){ var first=r[1].split(/[ ,]/)[0], lg=H.LEGACY[first]; return '<tr><td>'+r[0]+'</td><td><code>'+r[1]+'</code></td><td>'+(lg?'the old "'+lg+'" frames':'none yet (keeps the last pose)')+'</td></tr>'; }).join('')+'</table>';
      var pilot='<ul class="sl-sheets">'+ZSPR.PILOT.map(function(id){ var q=SL.reqOf(id); if(!q)return ''; return '<li class="sl-sh" data-sheet="'+id+'"><b>'+SL.esc(q.name)+'</b> — '+SL.esc(q.title)+' <span class="sl-meta">'+q.poses.length+' poses · attach: '+q.refs.map(function(r){ return r.replace('style_hero','the boy').replace('style_centaur','the centaur'); }).join(', ')+(SL.have(id)?' · <span class="sl-got">received</span>':'')+'</span><span class="sl-btns"><button class="vbtn sl-copy">Copy request</button><button class="vbtn sl-show">Show</button></span><pre class="sl-pre" hidden></pre></li>'; }).join('')+'</ul>';
      var got=(typeof ZSPR_PREVIEW!=='undefined'?Object.keys(ZSPR_PREVIEW):[]).filter(function(id){ return !/^hero_f\.model_/.test(id); });
      return (got.length?LBR.sec('Received so far',got.length+' sheet'+(got.length===1?'':'s')+' cut into frames')+got.map(function(id){ var q=SL.reqOf(id); return SL.received(id,q?q.name+' — '+q.title:id); }).join(''):'')+
        (ZSPR.HERO.GIRL_LOCKED?LBR.sec('The girl: look '+ZSPR.HERO.GIRL_PICK.toUpperCase()+' · '+ZSPR.HERO.GIRL_LOOKS[ZSPR.HERO.GIRL_PICK].name+' is locked','her other sheets are built on this model sheet')+'<p class="sl-p">'+SL.esc(ZSPR.HERO.GIRL_LOOKS[ZSPR.HERO.GIRL_PICK].look)+'</p>'
          :LBR.sec('The girl: three looks to compare','all with long braided auburn hair; generate each, then press ☆ Looks right on the one to keep')+
        '<p class="sl-p">Each look changes more than the hair: the silhouette, the cape and the outfit. Attach the two references <b>and the boy\'s model sheet</b> (<code>sprites/incoming/hero_m.model.png</code>) so she matches his size and style. You can mix features in the note box.</p>'+
        '<div class="br-grid sl-grid">'+Object.keys(ZSPR.HERO.GIRL_LOOKS).map(SL.girlCard).join('')+'</div>')+
        LBR.sec('What is in the library',S.chars+' characters · '+S.core+' core sheets · '+(S.sheets-S.core)+' extra sheets')+
        '<p class="sl-p">Every character in the game is listed here with the moves it must be able to show. The list is read from the game data, so it changes when the game does. <b>Core</b> sheets replace today\'s stand-ins (idle, movement, main attack, hurt). <b>Extra</b> sheets add second attacks, special moves and boss phase changes; they are a second pass. Kit moves with no animation mapped: <b>'+(S.unknown.length?S.unknown.length:'none')+'</b>.</p>'+tot+
        LBR.sec('How the requests are fed','pilot by hand, then a script')+
        '<ol class="sl-p"><li><b>Pilot (by hand, 12 requests, listed below; 2 are done).</b> In ChatGPT start an image chat, attach the two reference images, press <b>Copy request</b>, paste, generate. Save each result as <code>sprites/incoming/&lt;request id&gt;.png</code>. Do the hero model sheets first; later requests attach them.</li>'+
        '<li><b>Review.</b> Tell Claude the pilot is in. Claude cuts the sheets into frames, shows them here next to the stand-ins, and adjusts the style text if anything drifts.</li>'+
        '<li><b>Script (the rest).</b> On your PC: <code>node tools/sprites/generate.mjs --wave 1</code> with your own OpenAI API key, at medium quality. It sends each request with its reference images, saves into <code>sprites/incoming/</code>, skips what is already there, and can be stopped and restarted.</li>'+
        '<li><b>Intake.</b> <code>python tools/sprites/intake.py</code> removes the background, finds each pose, lines the feet up and packs the atlases the game loads.</li></ol>'+
        LBR.sec('The style every request asks for','from your two references')+
        '<div class="sl-refs"><figure><img src="'+SPR_REF.style_hero+'" alt="Hero reference"><figcaption>Reference 1 · the boy (now the male hero)</figcaption></figure><figure><img src="'+SPR_REF.style_centaur+'" alt="Centaur reference"><figcaption>Reference 2 · the centaur</figcaption></figure><div><p class="sl-p">'+SL.esc(ZSPR.STYLE)+'</p><p class="sl-p">'+SL.esc(ZSPR.RULES)+'</p></div></div>'+
        LBR.sec('Hero mapping: weapons','which animation each weapon plays')+wtab+
        LBR.sec('Hero mapping: skills','rolling is the Roll skill; nothing new was added to the game')+stab+
        LBR.sec('Hero mapping: actions','what plays today and what will play')+atab+
        LBR.sec('Pilot requests','do these by hand first')+pilot; },
    render:function(){ setTimeout(function(){ SL.paintThumbs(); SL.paintGame(); },0); var all=ZSPR.all();
      var chips='<div class="lab-groups">'+SL.GROUPS.map(function(g){ var n=g[0]==='guide'?0:all.filter(function(e){ return SL.inGroup(e,g[0]); }).length, ok=g[0]==='guide'?0:all.filter(function(e){ return SL.inGroup(e,g[0])&&LBR.picked('sprlib',e.id); }).length;
          return '<button class="lab-grp sl-grp" data-sl="'+g[0]+'" aria-pressed="'+(g[0]===SL.grp)+'">'+g[1]+(n?' <span class="n">'+ok+' / '+n+'</span>':'')+'</button>'; }).join('')+'</div>';
      if(SL.grp==='guide')return chips+SL.guide();
      var L=all.filter(function(e){ return SL.inGroup(e,SL.grp); }), subs=[]; L.forEach(function(e){ if(subs.indexOf(e.sub)<0)subs.push(e.sub); });
      return chips+subs.map(function(sub){ var M=L.filter(function(e){ return e.sub===sub; }); return LBR.sec(sub,M.length+' character'+(M.length===1?'':'s')+' · '+M.reduce(function(a,e){ return a+e.sheets.length; },0)+' sheets')+'<div class="br-grid sl-grid">'+M.map(SL.card).join('')+'</div>'; }).join(''); }
  };
  window.LabSprLib=SL;
  // "Looks right" wording on this tab's cards (the shared refresh writes "Pick")
  var r0=LBR.refresh; LBR.refresh=function(){ r0.apply(this,arguments); document.querySelectorAll('.sl-card').forEach(function(a){ var b=a.querySelector('.br-pick'), on=b.getAttribute('aria-pressed')==='true'; b.textContent=on?'★ Looks right':'☆ Looks right'; }); };
  document.addEventListener('click',function(e){ var t=e.target; if(!t.closest)return;
    var g=t.closest('.sl-grp'); if(g){ e.stopPropagation(); SL.grp=g.dataset.sl; LabApp.renderGrid(); window.scrollTo(0,0); return; }
    var li=t.closest('.sl-sh'); if(!li)return; var q=SL.reqOf(li.dataset.sheet); if(!q)return;
    if(t.closest('.sl-copy')){ SL.copy(ZSPR.full(q,false)); }
    else if(t.closest('.sl-show')){ var pre=li.querySelector('.sl-pre'); if(pre.hidden){ pre.textContent='Attach: '+q.refs.join(', ')+'\nSave as: sprites/incoming/'+q.id+'.png\n\n'+ZSPR.full(q,false); pre.hidden=false; t.closest('.sl-show').textContent='Hide'; } else { pre.hidden=true; t.closest('.sl-show').textContent='Show'; } } },true);
  var st=document.createElement('style'); st.textContent=
    '.sl-grid{grid-template-columns:repeat(auto-fill,minmax(440px,1fr))}.sl-card{padding:0}.sl-head{display:flex;gap:12px;padding:12px 12px 4px;align-items:flex-start}.sl-head b{font-weight:500;font-size:1rem;display:block}.sl-head p{margin:4px 0 0;color:var(--muted);font-size:.83rem;line-height:1.35}'+
    '.sl-cv{width:72px;height:72px;flex:none;background:#0a0f1c;border:1px solid var(--soft);border-radius:8px;image-rendering:pixelated}.sl-sub{display:block;color:var(--faint);font-size:.76rem;margin-top:2px}'+
    '.sl-moves{display:flex;flex-wrap:wrap;gap:5px;padding:6px 12px}.sl-mv{font-size:.74rem;border:1px solid var(--line);border-radius:999px;padding:2px 9px;color:var(--text);white-space:nowrap}.sl-mv i{color:var(--faint);font-style:normal;margin-left:4px}'+
    '.sl-sheets{list-style:none;margin:4px 0 0;padding:0 12px;display:flex;flex-direction:column;gap:6px}.sl-sh{font-size:.82rem;border-top:1px solid var(--soft);padding-top:6px}.sl-sh b{font-weight:500}.sl-meta{color:var(--faint);font-size:.76rem}'+
    '.sl-btns{float:right;display:flex;gap:6px}.sl-btns .vbtn{padding:2px 9px;font-size:.76rem}.sl-tier{font-family:var(--mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.06em;padding:1px 6px;border-radius:4px}.sl-core{background:rgba(63,230,242,.14);color:#7fe9f2}.sl-extra{background:rgba(240,192,96,.14);color:var(--maybe)}'+
    '.sl-rcv{border:1px solid var(--soft);border-radius:12px;background:var(--surface);padding:12px;margin:0 0 14px}.sl-card .sl-rcv{margin:8px 12px 0;background:#0e1424}.sl-rcv-h{margin-bottom:8px;font-size:.9rem}.sl-rcv-h b{font-weight:500}.sl-rcv-b{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}.sl-rcv-b figure{margin:0;flex:1 1 420px;min-width:260px}.sl-rcv-b img,.sl-rcv-b canvas{max-width:100%;height:auto;display:block;border-radius:8px;background:repeating-conic-gradient(#1b2236 0 25%,#232c44 0 50%) 0 0/20px 20px}.sl-rcv-b figcaption{color:var(--faint);font-size:.75rem;margin-top:4px}'+
    '.sl-on{color:var(--muted);font-size:.8rem;padding:0 12px;margin:4px 0}.sl-got{color:var(--pick)}.sl-pre{clear:both;white-space:pre-wrap;font-family:var(--mono);font-size:.74rem;line-height:1.45;background:#0a0f1c;border:1px solid var(--soft);border-radius:8px;padding:10px;margin:8px 0 2px;color:#c9d4ea;max-height:340px;overflow:auto}'+
    '.sl-warn{color:var(--no);font-size:.8rem;padding:0 12px;margin:2px 0}.sl-p{color:var(--muted);max-width:1040px;line-height:1.55;margin:0 0 12px}.sl-p li{margin-bottom:6px}.sl-p code,.sl-tab code{font-size:.82em}'+
    '.sl-tab{border-collapse:collapse;margin:0 0 6px;font-size:.84rem;max-width:1040px;width:100%}.sl-tab th,.sl-tab td{text-align:left;padding:5px 12px 5px 0;border-bottom:1px solid var(--soft);vertical-align:top}.sl-tab th{color:var(--faint);font-weight:500;font-size:.76rem}.sl-sum td{font-weight:600;border-top:1px solid var(--line)}'+
    '.sl-refs{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-bottom:8px}.sl-refs figure{margin:0}.sl-refs img{width:200px;height:200px;border-radius:10px;border:1px solid var(--soft);display:block}.sl-refs figcaption{color:var(--faint);font-size:.76rem;margin-top:4px}.sl-refs>div{flex:1;min-width:280px}'+
    '@media (max-width:520px){.sl-grid{grid-template-columns:1fr}.sl-btns{float:none;margin-top:4px}}';
  document.head.appendChild(st);
  LAB_TABS.push({ id:'sprlib', name:'Sprite Library', blurb:'<b>The full survey of every character that needs a painted sprite</b>, with the moves each one must show and the ChatGPT request for every sheet. Start with <b>Guide</b>: totals, how the requests are fed, the style, and the hero mapping (which animation each weapon and skill plays). Then open a group. Each card shows today\'s stand-in, the moves, and the sheets; <b>Copy request</b> puts the full request on your clipboard. Press <b>☆ Looks right</b> on a character when its list is complete, or write what is missing in the note box.',
    designs:ZSPR.all().map(function(e){ return {id:e.id,name:e.name}; }),
    render:function(){ return SL.render(); } });
})();
