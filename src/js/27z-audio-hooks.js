// ═══════════════════════════════════════════════════════════════════════
// ║ 27z-audio-hooks.js — round 73 (Kris: "audio is in!"): the made ambience and effects (ElevenLabs, 71 sounds × 2 takes, doc 32) hooked
// ║ to the moments the game already knows. Each hook wraps an existing function and only plays a sound — the game's own behaviour is
// ║ untouched (every wrapper calls the original first and returns its result). A sound with no file stays silent or keeps the old
// ║ code-made sound (04c ZSFX). The procedural sound that a moment already made gives way to its file (ZAUDIO.MAP in 04c2) and is hushed
// ║ for a moment when a file plays over it, so nothing doubles.
// ║ Runs last (setTimeout after every file's own patches) so it wraps the final functions.
// ═══════════════════════════════════════════════════════════════════════
var ZAHOOK={ on:true, last:{}, GAP:{sfx_ui_note:1200,sfx_ui_click:120,sfx_coin:150,sfx_hurt:250,sfx_mon_hit:90,sfx_page:500,sfx_ui_open:200,sfx_ui_close:200,sfx_pickup:150,sfx_gem:150,sfx_sword_swing:120,sfx_axe_swing:120,sfx_spit:150,sfx_arrow_hit:80},
  // play a made sound; o.hush: hush the procedural sound for that many ms
  s:function(id,o){ if(!ZAHOOK.on||typeof ZAUDIO==='undefined')return false; var now=Date.now(), g=ZAHOOK.GAP[id]||60; if(now-(ZAHOOK.last[id]||0)<g)return false; ZAHOOK.last[id]=now;
    var sf=typeof ZAUD!=='undefined'&&ZAUD.SOFT&&ZAUD.SOFT[id]; if(sf&&!(ZAUDIO.idx&&ZAUDIO.idx[id]&&ZAUDIO.idx[id].eth))o=Object.assign({},sf,o||{});      /* round 80: softer and muffled until the ethereal take is picked */
    var ok=ZAUDIO.play(id,o); if(ok&&o&&o.hush)ZAUDIO._hush=now+o.hush; return ok; },
  // round 80: a sound of its own if it is in, else the old one
  pick:function(id,alt){ return typeof ZAUDIO!=='undefined'&&ZAUDIO.has&&ZAUDIO.has(id)?id:alt; },
  wrap:function(obj,name,after,before){ if(!obj||typeof obj[name]!=='function')return false; var f0=obj[name];
    obj[name]=function(){ var pre; try{ if(before)pre=before.apply(this,arguments); }catch(e){} var r=f0.apply(this,arguments); try{ after.call(this,r,arguments,pre); }catch(e){} return r; }; return true; },
  wrapG:function(name,after,before){ if(typeof window[name]!=='function')return false; var f0=window[name];
    window[name]=function(){ var pre; try{ if(before)pre=before.apply(this,arguments); }catch(e){} var r=f0.apply(this,arguments); try{ after.call(this,r,arguments,pre); }catch(e){} return r; }; return true; },
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  ps:function(){ var w=ZAHOOK.ws(); return w&&w.playerState; },
  axe:function(){ try{ return typeof ZHit!=='undefined'&&ZHit.isAxe&&ZHit.isAxe(); }catch(e){ return false; } },
  // the spell's sound by its element (doc 32: frost, water, fire, lightning, nature, earth, light)
  SPELLS:{frost_bolt:'sfx_frost',ice_shards:'sfx_frost',blizzard:'sfx_frost',tidal_wave:'sfx_water',fireball:'sfx_fire',flame_nova:'sfx_fire',meteor:'sfx_fire',chain_lightning:'sfx_lightning',thunder_step:'sfx_lightning',starfall:'sfx_lightning',
    thorn_snare:'sfx_nature',poison_mist:'sfx_nature',stone_spikes:'sfx_earth',arcane_burst:'sfx_light',void_orb:'sfx_light',void_rift:'sfx_light',spirit_drain:'sfx_light'},
  spellSfx:function(id){ if(typeof ZAUDIO!=='undefined'&&ZAUDIO.has&&ZAUDIO.has('sfx_sp_'+id))return 'sfx_sp_'+id;      /* round 80: the spell's own sound */ var s=ZAHOOK.SPELLS[id]; if(s)return s; var el=typeof ZEL!=='undefined'&&ZEL.SPELL&&ZEL.SPELL[id]; return {fire:'sfx_fire',water:'sfx_water',grass:'sfx_nature',earth:'sfx_earth',storm:'sfx_lightning'}[el]||'sfx_light'; },
  install:function(){
    var H=ZAHOOK, s=H.s, W=typeof WorldScene!=='undefined'?WorldScene.prototype:null, D=typeof DungeonScene!=='undefined'?DungeonScene.prototype:null;
    // ── the procedural names the game already calls (04c): files where they exist; the silent ones get theirs ──
    if(typeof ZSFX!=='undefined'){ var p0=ZSFX.play; ZSFX.play=function(name,o){ if(typeof ZAUDIO!=='undefined'&&Date.now()<(ZAUDIO._hush||0))return;
        var id={whoosh:'sfx_roll',potion:'sfx_drink',levelup:'sfx_ui_buy'}[name]; if(name==='swing')id=H.axe()?'sfx_axe_swing':'sfx_sword_swing'; if(name==='hit')id=H.axe()?'sfx_axe_hit':'sfx_sword_hit';
        if(id&&s(id))return; return p0.apply(this,arguments); }; }
    // ── the hero ──
    if(typeof ZHit!=='undefined'){
      H.wrap(ZHit,'swing',function(r){ if(r)s(r.axe?'sfx_axe_swing':'sfx_sword_swing',{hush:150}); });
      H.wrap(ZHit,'axe',function(r,a){ var m=a[1]; if(m&&!m._sndT||m&&Date.now()-m._sndT>80){ if(m)m._sndT=Date.now(); s(H.axe()?'sfx_axe_hit':'sfx_sword_hit',{hush:120}); } });
      H.wrap(ZHit,'dmg',function(r,a){ var k=a[3]; if(k==='ranged')s('sfx_arrow_hit'); else if(k==='spell'||k==='skill'||k==='familiar')s('sfx_mon_hit'); }); }
    if(typeof ZShot!=='undefined')H.wrap(ZShot,'ammoKind',function(){ s('sfx_bow_shot'); });
    if(typeof ZDeath!=='undefined')H.wrap(ZDeath,'run',function(){ s('sfx_fall',{hush:600}); });
    if(W)H.wrap(W,'_applyShieldToDmg',function(r,a){ if(this._shielding&&r<a[0])s('sfx_block',{hush:150}); });
    H.wrapG('_heroApplyShield',function(r,a){ var sc=a[0]; if(sc&&sc._shielding&&r<a[2])s('sfx_block',{hush:150}); });
    H.wrapG('_useItem',function(r,a,pre){ if(pre&&pre.use&&(H.ps().inventory||[]).length<pre.n)s(pre.food?'sfx_pickup':'sfx_drink'); },function(idx){ var ps=H.ps(), it=ps&&ITEMS[(ps.inventory||[])[idx]]; return it?{use:it.slot==='use'||it.slot==='food',food:it.slot==='food',n:(ps.inventory||[]).length}:null; });
    // spells: the element's sound when it went off; "no mana" when it could not
    var cdOf=function(sc){ var k=sc&&sc.sys&&sc.sys.settings.key; return (k==='World'||k==='Island')?(sc._spellCd||0):(typeof _heroSpellCdUntil!=='undefined'?_heroSpellCdUntil:0); };
    H.wrapG('_heroCastSpell',function(r,a,pre){ if(!pre)return; var cd=cdOf(a[0]); if(cd!==pre.cd&&cd>0)s(H.spellSfx(pre.id),{hush:200}); else if(pre.poor)s('sfx_nomana'); },
      function(sc){ var ps=H.ps(), t=ps&&ps.equip&&ps.equip.spell&&ITEMS[ps.equip.spell]; if(!t||!t.spellId)return null; var sp=typeof SPELL_DATA!=='undefined'&&SPELL_DATA[t.spellId];
        return {id:t.spellId, poor:!!(sp&&(ps.mana||0)<sp.manaCost), cd:cdOf(sc)}; });
    if(typeof ZGODS!=='undefined')H.wrap(ZGODS,'cast',function(r,a,pre){ var ps=H.ps(); if(ps&&ps._gbUntil!==pre)s('sfx_godsbane',{hush:400}); },function(){ var ps=H.ps(); return ps&&ps._gbUntil; });
    if(W)H.wrap(W,'_callMount',function(r){ if(r)s('sfx_whistle'); });
    // ── monsters and bosses ──
    if(typeof ZAtlas!=='undefined')H.wrap(ZAtlas,'died',function(){ s('sfx_mon_die'); });
    if(typeof MX!=='undefined'){ H.wrap(MX,'proj',function(){ s('sfx_spit'); }); H.wrap(MX,'ev',function(r,a){ if(a[1]==='bar_break')s('sfx_shield_break',{hush:300}); }); }
    if(typeof BossPhases!=='undefined')H.wrap(BossPhases,'spawn',function(r,a){ if(a[2]>1)s('sfx_boss_phase'); });
    if(typeof BossMoments!=='undefined')H.wrap(BossMoments,'finale',function(){ s('sfx_boss_fall'); });
    if(typeof BossPat!=='undefined')H.wrap(BossPat,'lastStand',function(){ s('sfx_boss_charge'); });
    // ── the world: chests, doors, waystones, loot ──
    if(D){ H.wrap(D,'_openChest',function(){ s('sfx_chest'); }); H.wrap(D,'_openBossChest',function(){ s('sfx_chest'); }); }
    H.wrapG('_openCache',function(){ s('sfx_chest'); });
    if(W)H.wrap(W,'_campUse',function(r,a){ var C=a[0]; if(C&&C.T&&C.T.r&&C.T.r.k==='chest')s('sfx_chest'); });
    [W,typeof IslandScene!=='undefined'?IslandScene.prototype:null].forEach(function(P){ if(!P)return; if(Object.prototype.hasOwnProperty.call(P,'_enterBuilding'))H.wrap(P,'_enterBuilding',function(){ s('sfx_door'); });
      if(Object.prototype.hasOwnProperty.call(P,'_enterSite'))H.wrap(P,'_enterSite',function(){ if(this.sys&&this.sys.isSleeping&&this.sys.isSleeping())s('sfx_door'); }); });
    H.wrapG('_activateWaystone',function(){ s('sfx_waystone'); });
    H.wrapG('_travelTo',function(r,a,pre){ var w=H.ws(); if(w&&w.player&&pre&&Math.hypot(w.player.x-pre[0],w.player.y-pre[1])>200)s('sfx_travel'); },function(){ var w=H.ws(); return w&&w.player?[w.player.x,w.player.y]:null; });
    if(typeof ZLoot!=='undefined')H.wrap(ZLoot,'give',function(r,a){ var it=typeof ITEMS!=='undefined'&&ITEMS[a[1]]; s(it&&(it.slot==='gem'||/^soulglass_|shard|gem/.test(a[1]))?'sfx_gem':'sfx_pickup'); });
    // ── menus ──
    H.wrapG('_pauseAll',function(r,a,pre){ if(!pre&&_PAUSE.active)s('sfx_ui_open'); },function(){ return _PAUSE.active; });
    H.wrapG('_resumeAll',function(r,a,pre){ if(pre&&!_PAUSE.active)s('sfx_ui_close'); },function(){ return _PAUSE.active; });
    H.wrapG('showNotif',function(r,a){ var col=String(a[1]||'').toLowerCase(), msg=String(a[0]||''); if(/^#(ff4444|ff8844|aaaaaa)$/.test(col)||/^(🚫|🔒)|Not enough|^No /.test(msg))s('sfx_ui_error'); else s('sfx_ui_note'); });
    document.addEventListener('pointerdown',function(e){ var b=e.target&&e.target.closest&&e.target.closest('button,.abtn,.vbtn,.tab-btn'); if(b&&b.id!=='mute-btn')s('sfx_ui_click'); },true);
    // ── the saga's moments ──
    if(typeof ZSPIRIT!=='undefined')H.wrap(ZSPIRIT,'free',function(r,a,pre){ if(pre)s('sfx_spirit_free',{hush:800}); },function(ws,sp){ var ps=ws&&ws.playerState; return !!(sp&&ps&&(ps.spiritsFreed||[]).indexOf(sp.id)<0); });
    if(typeof ZSLW!=='undefined')H.wrap(ZSLW,'trace',function(r,a,pre){ var ws=a[0]; if(ws&&ws._zslT&&ws._zslT!==pre){ s('sfx_rune_wake',{hush:600}); setTimeout(function(){ s('sfx_line_trace'); },400); } },function(ws){ return ws&&ws._zslT; });
    if(typeof ZASG!=='undefined'){ H.wrap(ZASG,'bifrost',function(r,a,pre){ if(!pre)s('sfx_lodestar',{hush:500}); },function(ws){ return ws&&ws._bifBusy; }); H.wrap(ZASG,'road',function(r,a){ if(a[1]===true)s('sfx_bifrost',{hush:500}); }); }
    if(typeof ZEND!=='undefined')H.wrap(ZEND,'play',function(){ s('sfx_lodestar',{hush:500}); setTimeout(function(){ s('sfx_bifrost'); },3800); });
    if(typeof FeastHallScene!=='undefined'){ var F=FeastHallScene.prototype; H.wrap(F,'_cast',function(){ s('sfx_godsbane',{hush:500}); }); H.wrap(F,'_burst',function(){ s('sfx_orbs_burst',{hush:800}); }); }
    if(typeof ZFEAST!=='undefined')H.wrap(ZFEAST,'door',function(r,a,pre){ if(!pre)s('sfx_great_door'); },function(sc){ return sc&&sc._fhDoor; });
    if(typeof ZLS!=='undefined'){ H.wrap(ZLS,'play',function(r,a){ if(a[1]==='fh_crumble')setTimeout(function(){ s('sfx_crumble',{hush:800}); },2600); }); H.wrap(ZLS,'bolt',function(){ s('sfx_thunder',{hush:500}); }); H.wrap(ZLS,'vines',function(){ s('sfx_vines'); }); }
    if(typeof ZCUT!=='undefined')H.wrap(ZCUT,'painted',function(r){ try{ if(ZCUT.isOpen&&ZCUT.isOpen())s('sfx_page'); }catch(e){} });
    // gold in: a coin when the purse grows (not while a shop or chest window is open — those play their own); gold out in a shop: the till
    if(typeof game!=='undefined'&&game.events)game.events.on('poststep',function(){ var ps=H.ps(); if(!ps)return; var g=ps.gold||0, hp=ps.hp||0;
      if(H._g!==undefined&&g!==H._g&&H._ps===ps){ if(g>H._g&&!_PAUSE.active)s('sfx_coin'); else if(g<H._g&&_PAUSE.active)s('sfx_ui_buy'); }
      if(H._hp!==undefined&&H._ps===ps&&hp<H._hp&&hp>0)s('sfx_hurt');
      var mt=ps.mount||null; if(H._ps===ps&&mt&&mt!==H._mt&&H.pick('sfx_mt_'+mt,null))s('sfx_mt_'+mt);      /* round 80: the animal's own call as you climb on */
      H._g=g; H._hp=hp; H._ps=ps; H._mt=mt; });
    // round 80: each skill its own sound (Kris: "skills should also have their own sounds"), once it is in; else the old whoosh
    if(typeof ZSKILL!=='undefined')H.wrap(ZSKILL,'use',function(r,a,pre){ if(pre&&ZSKILL.cdUntil!==pre.cd){ var id=pre.id; if(id)s(H.pick('sfx_sk_'+id,'sfx_skill')); } },
      function(){ var ws=H.ws(), ps=ws&&ws.playerState, it=ps&&typeof ITEMS!=='undefined'&&ps.equip&&ITEMS[ps.equip.special]; return {cd:ZSKILL.cdUntil, id:it&&it.skillId}; });
    // the everyday effects are fetched once the sound unlocks, so the first swing already has its file (the rest arrive on first use)
    var warm=function(){ if(typeof ZAUDIO==='undefined'||!ZAUDIO.idx||!ZSFX._unlocked)return; var phone=typeof ZQUAL!=='undefined'&&ZQUAL.mode==='phone'; (phone?H.WARM:Object.keys(ZAUDIO.idx).filter(function(k){ return ZAUDIO.idx[k].kind==='sfx'; })).forEach(function(id){      /* a computer fetches every effect (≈ 20 MB decoded); a phone the everyday ones */ var E=ZAUDIO.idx[id]; if(E)E.files.forEach(function(f){ ZAUDIO.buffer(f); }); }); H.warmed=true; };
    var tw=setInterval(function(){ if(H.warmed){ clearInterval(tw); return; } warm(); },1500);
    H.installed=true; },
  WARM:['sfx_sword_swing','sfx_sword_hit','sfx_axe_swing','sfx_axe_hit','sfx_bow_shot','sfx_arrow_hit','sfx_hurt','sfx_mon_hit','sfx_mon_die','sfx_coin','sfx_pickup','sfx_ui_click','sfx_ui_open','sfx_ui_close','sfx_ui_note','sfx_roll','sfx_spit','sfx_door']
};
setTimeout(function(){ setTimeout(function(){ try{ ZAHOOK.install(); }catch(e){ console.warn('audio hooks',e); } },0); },0);
