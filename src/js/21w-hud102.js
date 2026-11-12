// ═══════════════════════════════════════════════════════════════════════
// ║ 21w-hud102.js — round 102: THE NEW HUD (Kris's Lab picks, round 101: teal soul-hearts, the aurora mana arc, the banners; "These should
// ║ also build up with level, so you get more hearts with more health, and your experience counter should need to fill more banners. Similar
// ║ for mana amount"; answered: top-left, the same in every scene that is not paused).
// ║  • Health: one teal heart per 10 health (two rows of ten, then each heart is worth more), emptying in quarters from the right.
// ║  • Mana:   an aurora arc whose length grows with the pool (the pool grows 3 a level — 10-scene-world.js calcPlayerStats).
// ║  • Experience: banners that fill from the bottom; level ×100 to the next level, split over 2 banners at level 1 up to 6 at 16+.
// ║ One panel (#zhud) at the top-left in the world, buildings, islands, adventure sites and forges; the old bars (#stats-panel, the site
// ║ HUD's #dng-bars) are hidden and the site's floor title sits under it. Painted pieces (sheet sc_r102_hud, 07zt10) are used once they
// ║ are in; until then the hearts, arc and banners are drawn in CSS.
// ═══════════════════════════════════════════════════════════════════════
var ZHUD={ on:true, _sig:'', _pics:{},
  hearts:function(maxHp){ var per=maxHp>200?Math.ceil(maxHp/20/5)*5:10; return {per:per,n:Math.max(1,Math.ceil(maxHp/per))}; },
  banners:function(level){ return Math.min(6,2+Math.floor((level||1)/4)); },
  manaW:function(mx){ return Math.round(90+Math.min(160,mx*1.2)); },
  // a painted piece as an image URL (cut once from its scenery page)
  pic:function(id){ if(ZHUD._pics[id]!==undefined)return ZHUD._pics[id]; if(typeof ZScn==='undefined'||!ZScn.has||!ZScn.has(id))return null;
    try{ var it=ZScn.META.items[id], im=ZScn.img[it[0]], c=document.createElement('canvas'); c.width=it[3]; c.height=it[4]; c.getContext('2d').drawImage(im,it[1],it[2],it[3],it[4],0,0,it[3],it[4]); ZHUD._pics[id]=c.toDataURL(); }catch(e){ ZHUD._pics[id]=null; }
    return ZHUD._pics[id]; },
  el:function(){ var h=document.getElementById('zhud'); if(h)return h; h=document.createElement('div'); h.id='zhud';
    h.innerHTML='<div class="zh-hearts"></div><div class="zh-mana"><i></i><b></b></div><div class="zh-xp"><span class="zh-lv"></span><span class="zh-bn"></span></div><div class="zh-gold"></div>';
    document.body.appendChild(h); return h; },
  visible:function(){ var H=document.getElementById('hud'), D=document.getElementById('dungeon-hud'); var on=function(e){ return e&&e.style.display!=='none'&&getComputedStyle(e).display!=='none'; };
    if(typeof game!=='undefined'&&game.scene&&game.scene.isActive&&game.scene.isActive('Sky'))return false;      /* the sky port keeps its ship line (not picked to change) */
    return on(H)||on(D); },
  render:function(ps){ var h=ZHUD.el(), vis=ZHUD.visible(); if(h.style.display!==(vis?'':'none'))h.style.display=vis?'':'none'; document.body.classList.toggle('zhud-on',vis); if(!vis||!ps)return;
    var hp=Math.max(0,Math.round(ps.hp||0)), mh=Math.max(1,ps.maxHp||30), mana=Math.floor(ps.mana||0), mm=ps.maxMana||50, lv=ps.level||1, xp=ps.xp||0, gold=ps.gold||0,
      ul=ps.unlockedSections, cap=ul&&ul.length?(Math.max.apply(null,ul)>=4?20:Math.max.apply(null,ul)>=3?15:Math.max.apply(null,ul)>=2?10:5):5,
      pf=ZHUD.pic('hud_heart_full'), pe=ZHUD.pic('hud_heart_empty'), sig=[hp,mh,mana,mm,lv,xp,gold,cap,!!pf].join('|');
    if(sig===ZHUD._sig)return; ZHUD._sig=sig;
    var H=ZHUD.hearts(mh), s='';
    for(var i=0;i<H.n;i++){ var f=Math.max(0,Math.min(1,(hp-i*H.per)/H.per)); f=Math.floor(f*4)/4;
      s+='<span class="zh-h'+(pf?' pic':'')+(f<=0?' empty':'')+'"'+(pe?' style="background-image:url('+pe+')"':'')+'><i style="width:'+(f*100)+'%'+(pf?';background-image:url('+pf+')':'')+'"></i></span>'; }
    var hh=h.querySelector('.zh-hearts'); hh.innerHTML=s; hh.title=hp+' / '+mh+' health'+(H.per>10?' — each heart '+H.per:''); hh.dataset.n=H.n;
    var M=h.querySelector('.zh-mana'); M.style.width=ZHUD.manaW(mm)+'px'; M.querySelector('i').style.width=Math.min(100,mana/mm*100)+'%'; M.querySelector('b').textContent=mana+' / '+mm; M.title='Mana '+mana+' / '+mm;
    var nb=ZHUD.banners(lv), need=lv*100, capped=lv>=cap, bs='', mb=ZHUD.pic('hud_banner'), me=ZHUD.pic('hud_banner_empty');
    for(var k=0;k<nb;k++){ var ff=capped?1:Math.max(0,Math.min(1,xp/need*nb-k)); bs+='<span class="zh-b'+(mb?' pic':'')+'"'+(me?' style="background-image:url('+me+')"':'')+'><i style="height:'+Math.round(ff*100)+'%'+(mb?';background-image:url('+mb+')':'')+'"></i></span>'; }
    h.querySelector('.zh-bn').innerHTML=bs; h.querySelector('.zh-lv').textContent='Lv '+lv+(capped?' · cap':''); h.querySelector('.zh-xp').title=capped?'Level '+lv+' — the realm\'s cap; free the next builder to rise further':xp+' / '+need+' xp to level '+(lv+1);
    h.querySelector('.zh-gold').textContent=gold+'g';
    try{ document.documentElement.style.setProperty('--zhud-h',(h.offsetHeight+18)+'px'); }catch(e){} },
  tick:function(){ if(!ZHUD.on)return; try{ var ws=typeof game!=='undefined'&&game.scene&&game.scene.getScene('World'); ZHUD.render(ws&&ws.playerState); var bh=document.getElementById('boss-hud'), bf=bh&&bh.style.display!=='none'&&ZHUD.pic('hud_bossbar_frame'); if(bf&&!bh.classList.contains('zbh-pic')){ bh.style.setProperty('--zbh-frame','url('+bf+')'); bh.classList.add('zbh-pic'); } }catch(e){} }
};
if(typeof document!=='undefined'&&typeof setInterval!=='undefined'){ setInterval(ZHUD.tick,120);
  var _zhSt=document.createElement('style'); _zhSt.textContent=
    '#zhud{position:absolute;top:10px;left:10px;z-index:101;pointer-events:auto;display:flex;flex-direction:column;gap:5px;padding:8px 10px 7px;background:linear-gradient(180deg,rgba(6,16,22,.82),rgba(6,16,22,.62));border:1px solid rgba(79,240,224,.28);border-radius:10px;box-shadow:0 0 14px rgba(79,240,224,.12);font:600 11px "Segoe UI",sans-serif;color:#cfe8ee;max-width:236px}'+
    'body.zhud-on #stats-panel{display:none!important}body.zhud-on #dng-bars,body.zhud-on #dng-gold-box{display:none!important}body.zhud-on #dng-top{top:var(--zhud-h,104px)!important}'+
    '.zh-hearts{display:flex;flex-wrap:wrap;gap:2px;max-width:214px}.zh-h{position:relative;width:19px;height:17px;clip-path:path("M9.5 16.5 L1.6 8.3 A4.3 4.3 0 0 1 9.5 3.2 A4.3 4.3 0 0 1 17.4 8.3 Z");background:rgba(79,240,224,.16)}'+
    '.zh-h i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(160deg,#b8fff6,#4ff0e0 45%,#14a8a0);box-shadow:0 0 8px #4ff0e0}.zh-h.empty{background:rgba(79,240,224,.10)}'+
    '.zh-h.pic{clip-path:none;background-size:100% 100%;background-color:transparent}.zh-h.pic i{background-size:19px 17px;background-repeat:no-repeat;box-shadow:none;overflow:hidden}'+
    '.zh-mana{position:relative;height:11px;border-radius:30px 30px 5px 5px;background:#10202c;border:1px solid rgba(140,170,255,.35);overflow:hidden;transition:width .4s}.zh-mana i{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#4ff0a0,#4fb8ff 45%,#9f6fff);box-shadow:0 0 10px #6f9fff;transition:width .25s}'+
    '.zh-mana b{position:absolute;right:6px;top:-1px;font:600 9px "Segoe UI";color:#e6f0ff;text-shadow:0 0 3px #000}'+
    '.zh-xp{display:flex;align-items:center;gap:6px}.zh-lv{color:#ffe6a8;font:700 11px Georgia,serif;white-space:nowrap}.zh-bn{display:flex;gap:3px}'+
    '.zh-b{position:relative;width:13px;height:21px;background:#1c2432;clip-path:polygon(0 0,100% 0,100% 100%,50% 80%,0 100%)}.zh-b i{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#ffe066,#ffb020);box-shadow:0 0 6px #ffc030}'+
    '.zh-b.pic{clip-path:none;background-size:100% 100%;background-color:transparent}.zh-b.pic i{background-size:13px 21px;background-position:bottom;box-shadow:none}'+
    '.zh-gold{color:#ffd700;font:600 11px "Segoe UI"}body.ztouch-on #zhud{transform:scale(.72);transform-origin:top left}';
  document.head.appendChild(_zhSt); }
// ── round 102: the monsters' bars (Kris ✓ "Monster and world-boss health bars: the new bars — painted frame, drawn fill"): a dark well in a
// thin gilt frame (the painted frame hud_monbar_frame once it is in), the red fill, and a pale trail where damage just landed.
var ZBAR={
  dress:function(scene,m){ var bg=m.hpBg, f=m.hpFill; if(!bg||!f||m._zbar||!bg.scene)return; m._zbar=true;
    try{ bg.setFillStyle(0x0a0608,0.85); if(bg.setStrokeStyle)bg.setStrokeStyle(1,0xc8a860,0.95); f.setFillStyle(0xe8443a);
      var c=f.parentContainer, tr=scene.add.rectangle(f.x,f.y,f.width,f.height,0xffe6c8,0.75).setOrigin(f.originX,f.originY); tr.displayWidth=f.displayWidth; if(c)c.addAt(tr,c.getIndex(f)); else tr.setDepth((f.depth||0)-0.01); m._ztr=tr;
      var T=typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has('hud_monbar_frame')&&ZScn.texture(scene,'hud_monbar_frame',bg.width+8,{shadow:false});
      if(T){ var fr=scene.add.image(bg.x,bg.y,T.key).setDisplaySize(bg.width+8,bg.height+6); if(c)c.add(fr); m._zfr=fr; } }catch(e){} },
  tick:function(scene,dt,mons){ (mons||[]).forEach(function(m){ if(m.dead||!m.hpFill)return; if(!m._zbar)ZBAR.dress(scene,m); var tr=m._ztr; if(!tr||!tr.scene)return;
      var w=m.hpFill.displayWidth, v=m.hpFill.visible; if(tr.visible!==v)tr.setVisible(v); if(m._zfr&&m._zfr.visible!==v)m._zfr.setVisible(v);
      if(tr.displayWidth<w)tr.displayWidth=w; else if(tr.displayWidth>w)tr.displayWidth=Math.max(w,tr.displayWidth-Math.max(6,(tr.displayWidth-w)*2.5)*dt); }); } };
