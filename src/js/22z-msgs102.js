// ═══════════════════════════════════════════════════════════════════════
// ║ 22z-msgs102.js — round 102: MESSAGES BY KIND, AND THE SPIRITS IN THE DIALOGUE BOX (Kris's Lab picks, round 101 §1–2).
// ║  • Loot and gold slide in as ribbons at the left above the hotbar, each with its painted item icon (✓ "Item and loot icons in
// ║    messages"); warnings and everything else stay where they were, top centre ("Ribbon at the side").
// ║  • An NPC line that came as a toast ("Mira: “…”") is said by the speaker: up to 12 words in a speech bubble for 3.5 s, longer in the
// ║    dialogue box ("Both, by length").
// ║  • The spirits' thanks and the fairies' talk move from the old talk box into the rune-stone dialogue box (✓ "The spirits' thanks (and
// ║    the fairies') pop-up"); their buttons become the box's choices. Talks that show a table (Mira's trays) keep the old box.
// ═══════════════════════════════════════════════════════════════════════
var ZMSG={ on:true, WORDS:12,
  LOOT:/^\s*(💰|🪙|💎|🍖|🎁|🎉|🧪|💍|📦|✨ Found|⚒️ Crafted)|\b(gold and treasure|picked up|added to (your )?inventory|spoils|hidden cache|bought:|found:|obtained|you got|\+\d+\s?g\b)/i,
  NOT:/not enough|can.t|cannot|need|out of|no room|full|locked|too /i,
  SAY:/^(?:[^\sA-Za-z]{1,3}\s)?([A-ZÀ-Ý][A-Za-zÀ-ÿ'’.\- ]{1,30}?)(?:,[^:“"]{0,40}| mumbles in (?:their|his|her) sleep)?:\s*[“"]([^“”"]+)[”"]?\s*$/,
  kind:function(msg){ msg=String(msg||''); var m=ZMSG.SAY.exec(msg); if(m&&!/^(Spoils|Found|Bought|Crafted|Ammo|Difficulty|God Mode|Special on cooldown|Quest)/i.test(m[1]))return {k:'say',name:m[1].trim(),text:m[2].trim()};
    if(ZMSG.LOOT.test(msg)&&!ZMSG.NOT.test(msg))return {k:'loot'}; return {k:'note'}; },
  esc:function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); },
  // the painted icon for what the line is about: an item named in it, else the emoji's painted icon
  icon:function(msg){ try{ if(typeof ITEMS!=='undefined'){ var best=null, bl=0; for(var k in ITEMS){ var I=ITEMS[k]; if(!I||!I.name||I.name.length<=bl)continue; if(msg.indexOf(I.name)>=0){ best=k; bl=I.name.length; } } if(best&&typeof ZIcon!=='undefined')return ZIcon.item(best,1.3); }
      var e=/^\s*(\S+)/.exec(msg); if(e&&typeof ZIcon!=='undefined'&&ZIcon.EMO&&ZIcon.EMO[e[1]]){ var h=ZIcon.emo(e[1],1.3); if(h!==e[1])return h; } }catch(er){} return ''; },
  feed:function(){ var f=document.getElementById('zloot'); if(!f){ f=document.createElement('div'); f.id='zloot'; document.body.appendChild(f); } return f; },
  loot:function(msg,col){ var f=ZMSG.feed(), ic=ZMSG.icon(msg), txt=String(msg); if(ic)txt=txt.replace(/^\s*[^\sA-Za-z0-9+]{1,3}\s*/,'');
    var key=txt.replace(/\d+/g,'#'); for(var i=0;i<f.children.length;i++){ var o=f.children[i]; if(o._k===key&&!o._gone){ o.querySelector('.zl-t').textContent=txt; o.classList.remove('zl-pop'); void o.offsetWidth; o.classList.add('zl-pop'); ZMSG.fade(o); return; } }
    var d=document.createElement('div'); d.className='zl'; d._k=key; d.innerHTML='<span class="zl-i">'+(ic||'')+'</span><span class="zl-t"></span>'; d.querySelector('.zl-t').textContent=txt; if(col)d.style.setProperty('--zl',col); f.appendChild(d);
    while(f.children.length>5)f.removeChild(f.firstChild); ZMSG.fade(d); },
  fade:function(d){ clearTimeout(d._t1); clearTimeout(d._t2); d._t1=setTimeout(function(){ d._gone=true; d.classList.add('zl-out'); d._t2=setTimeout(function(){ if(d.parentNode)d.parentNode.removeChild(d); },450); },3200); },
  // a short line in a bubble over the hero's side of the screen, a long one in the dialogue box
  say:function(name,text,col){ var n=text.split(/\s+/).filter(Boolean).length;
    var sc=typeof _activePlayScene==='function'&&_activePlayScene(false), key=sc&&sc.sys.settings.key, calm=key==='World'||key==='Building';      /* round 85: a cry in a fight or a site never pauses the game */
    if(n>ZMSG.WORDS&&calm&&typeof ZDLG!=='undefined'&&ZDLG.on){ ZDLG.say(name,text,{}); return; }
    var b=document.getElementById('zbub'); if(!b){ b=document.createElement('div'); b.id='zbub'; b.innerHTML='<b></b><span></span>'; document.body.appendChild(b); }
    b.querySelector('b').textContent=name; b.querySelector('span').textContent=text; var p=ZMSG.where(); b.style.left=p.x+'px'; b.style.top=p.y+'px'; b.className='on';
    clearTimeout(b._t); b._t=setTimeout(function(){ b.className=''; },Math.min(9000,3500+Math.max(0,n-ZMSG.WORDS)*280)); },
  where:function(){ try{ var sc=typeof _activePlayScene==='function'&&_activePlayScene(false), c=sc&&_heroCtx(sc), cam=sc.cameras.main, cv=game.canvas.getBoundingClientRect(), k=cv.width/game.scale.width;
      return {x:cv.left+((c.x-cam.worldView.x)*cam.zoom)*k, y:cv.top+((c.y-cam.worldView.y)*cam.zoom)*k-70}; }catch(e){ return {x:innerWidth/2,y:innerHeight*0.4}; } } };
(function(){ if(typeof document==='undefined')return;
  var sn0=showNotif; showNotif=function(msg,col){ if(!ZMSG.on)return sn0(msg,col); var K=ZMSG.kind(msg);
    try{ if(K.k==='say'){ ZMSG.say(K.name,K.text,col); return; } if(K.k==='loot'){ ZMSG.loot(msg,col); return; } }catch(e){} return sn0(msg,col); };
  var st=document.createElement('style'); st.textContent=
    '#zloot{position:absolute;left:14px;bottom:128px;z-index:300;display:flex;flex-direction:column;gap:4px;pointer-events:none}'+
    '.zl{--zl:#ffd060;display:flex;align-items:center;gap:7px;min-width:170px;max-width:340px;padding:4px 36px 4px 8px;background:linear-gradient(90deg,rgba(8,16,24,.94),rgba(8,16,24,.55) 70%,rgba(8,16,24,0));border-left:3px solid var(--zl);color:#f2ecd8;font:600 13px "Segoe UI",sans-serif;text-shadow:0 1px 2px #000;animation:zlin .35s ease}'+
    '.zl-i{display:inline-flex;min-width:18px;justify-content:center}.zl.zl-out{opacity:0;transform:translateX(-24px);transition:all .45s}.zl.zl-pop{animation:zlpop .35s ease}'+
    '@keyframes zlin{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none}}@keyframes zlpop{40%{transform:scale(1.06);filter:brightness(1.5)}}'+
    '#zbub{position:fixed;z-index:310;transform:translate(-50%,-100%) scale(.9);opacity:0;pointer-events:none;max-width:280px;padding:7px 12px 8px;background:#fbf7ec;color:#1f2430;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,.45);font:14px/1.35 Georgia,serif;transition:opacity .2s,transform .2s}'+
    '#zbub.on{opacity:1;transform:translate(-50%,-100%) scale(1)}#zbub b{display:block;font:700 11px "Segoe UI",sans-serif;color:#7a4a10;letter-spacing:.04em;margin-bottom:1px}#zbub:after{content:"";position:absolute;left:50%;bottom:-8px;margin-left:-8px;border:8px solid transparent;border-top-color:#fbf7ec;border-bottom:0}'+
    'body.ztouch-on #zloot{bottom:236px;transform:scale(.85);transform-origin:bottom left}';
  document.head.appendChild(st);
  // the spirits and the fairies in the dialogue box
  setTimeout(function(){ if(typeof ZSPIRIT==='undefined'||!ZSPIRIT.talk)return; var t0=ZSPIRIT.talk;
    ZSPIRIT.talk=function(name,col,html,btns,draw){ var H=String(html||'');
      if(!ZMSG.on||typeof ZDLG==='undefined'||!ZDLG.on||/<table|zt-grid|zt-row|<ul|<img/i.test(H))return t0.apply(ZSPIRIT,arguments);
      var txt=H.replace(/<br\s*\/?>/gi,'\n').replace(/<\/p>\s*<p[^>]*>/gi,'\n\n').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\n{3,}/g,'\n\n').trim();
      var extra=(btns||[]).filter(function(b){ return b&&typeof b.f==='function'; }).map(function(b){ return {t:b.t,f:function(){ try{ b.f(); }catch(e){} }}; });
      var pic=draw?function(x,t){ try{ draw(x,t,96); }catch(e){ return false; } return true; }:null;
      ZDLG.say(String(name||'').replace(/^[^\sA-Za-z]{1,3}\s/,''),txt,{portrait:pic,extra:extra,icon:'✦'}); };
    ZSPIRIT._talk0=t0; },0);
})();
