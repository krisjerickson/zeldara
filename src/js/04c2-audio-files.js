// ═══════════════════════════════════════════════════════════════════════
// ║ 04c2-audio-files.js — round 72 (doc 32 §3.5; Kris's answer O2: "build it now"): THE SOUND ENGINE for the made files.
// ║ The files come from Suno (music) and ElevenLabs (ambience, effects) through tools/audio/intake_audio.py into assets/audio/ with an
// ║ index (assets/audio/index.json). Until a sound's file is there, everything stays as it is today: the code-made sounds of 04c (ZSFX).
// ║  · Buses under ZSFX's master: music, ambience, effects — volumes in the 🔊 panel (right-click or long-press 🔊; a click still mutes).
// ║  · Music streams (an <audio> element into Web Audio — a two-minute piece decoded would take ~40 MB on a phone); a loop is joined by a
// ║    second element started at the loop point with a short crossfade. Cues crossfade in 2 s (a fight comes in fast and leaves slowly).
// ║  · Ambience and effects are decoded (small): ambience loops sample-exact; effects alternate their takes with ±5 % pitch.
// ║  · The director (once a second) picks the music and the ambience from where you are: the title, the village by day or night, each
// ║    realm, the sites, fights and bosses, the forges, Muspelheim, the escape, Asgard, the feast hall, the green land after the end.
// ║  · ZSFX.play / SFX.pickup / SFX.fanfare / ZSFX.music use the files when they exist (procedural otherwise). Stingers on a few moments.
// ║ Switch: ZAUDIO.on (?audio=off turns the files off).
// ═══════════════════════════════════════════════════════════════════════
var ZAUDIO={ on:true, BASE:'assets/audio/', idx:null, buf:{}, loading:{}, mus:null, amb:null, cue:null, ambCue:null, vol:{music:0.8,amb:0.7,sfx:0.9}, bus:null, _var:{},
  // the procedural names (04c, 10h) → the files that replace them
  MAP:{hit:'sfx_sword_hit',swing:'sfx_sword_swing',roar:'sfx_boss_roar',boom:'sfx_boss_slam',stomp:'sfx_boss_stomp',warp:'sfx_summon',hurt:'sfx_hurt',card:'sfx_boss_phase',victory:'st_boss_down',pickup:'sfx_pickup',fanfare:'sfx_camp'},
  // when a cue has no file yet, the next one that has
  FALL:{mu_village_night:'mu_village_day',mu_grass_night:'mu_grass_day',mu_wet_night:'mu_wet_day',mu_high_night:'mu_high_day',mu_ash_night:'mu_ash_day',mu_green:'mu_village_day',mu_home:'mu_village_day',mu_shops:'mu_village_day',mu_glimmerhall:'mu_shops',
    mu_tower:'mu_dungeon',mu_castle:'mu_dungeon',mu_mage:'mu_tower',mu_island:'mu_dungeon',mu_trial:'mu_tower',mu_sky:'mu_island',mu_boss_mage:'mu_boss',mu_boss_realm:'mu_boss',mu_muspelheim:'mu_forges',mu_citadel:'mu_asgard',mu_feast_hall:'mu_asgard',
    am_meadow_night:'am_meadow_day',am_village:'am_meadow_day',am_tower:'am_cave',am_castle:'am_cave',am_asgard:'am_highwind',am_sky:'am_highwind',am_sea:'am_lake',am_orbs:'am_asgard'},
  ext:function(){ if(ZAUDIO._ext)return ZAUDIO._ext; var a=document.createElement('audio'); return (ZAUDIO._ext=a.canPlayType&&a.canPlayType('audio/ogg; codecs="vorbis"')?'ogg':'mp3'); },
  has:function(id){ return !!(ZAUDIO.idx&&ZAUDIO.idx[id]&&ZAUDIO.idx[id].files&&ZAUDIO.idx[id].files.length); },
  pick:function(id){ var n=0; while(id&&!ZAUDIO.has(id)&&n++<4)id=ZAUDIO.FALL[id]; return id&&ZAUDIO.has(id)?id:null; },
  url:function(f){ return ZAUDIO.BASE+f.base+'.'+ZAUDIO.ext(); },
  load:function(){ try{ if(/[?&]audio=off/.test(location.search)){ ZAUDIO.on=false; return; } var v=JSON.parse(localStorage.getItem('zeldara_vol')||'null'); if(v)Object.assign(ZAUDIO.vol,v); }catch(e){}
    if(typeof ZAUDIO_INDEX!=='undefined'&&ZAUDIO_INDEX){ ZAUDIO.idx=ZAUDIO_INDEX; return; }      /* the build puts the index in the page (none yet: no request at all) */
    if(!/[?&]audio=fetch/.test(location.search)||typeof fetch!=='function')return; fetch(ZAUDIO.BASE+'index.json').then(function(r){ return r.ok?r.json():null; }).then(function(j){ if(j&&typeof j==='object')ZAUDIO.idx=j; }).catch(function(){}); },
  ctx:function(){ var a=typeof ZSFX!=='undefined'&&ZSFX._unlocked?ZSFX.ac():null; if(!a)return null; if(!ZAUDIO.bus){ ZAUDIO.bus={}; ['music','amb','sfx'].forEach(function(k){ var g=a.createGain(); g.gain.value=ZAUDIO.vol[k]; g.connect(ZSFX.out); ZAUDIO.bus[k]=g; }); } return a; },
  setVol:function(k,v){ ZAUDIO.vol[k]=Math.max(0,Math.min(1,v)); if(ZAUDIO.bus&&ZAUDIO.bus[k])ZAUDIO.bus[k].gain.value=ZAUDIO.vol[k]; try{ localStorage.setItem('zeldara_vol',JSON.stringify(ZAUDIO.vol)); }catch(e){} },
  // decoded buffers (ambience, effects, stingers)
  buffer:function(f,cb){ var u=ZAUDIO.url(f), a=ZAUDIO.ctx(); if(!a)return null; if(ZAUDIO.buf[u])return ZAUDIO.buf[u]; if(ZAUDIO.loading[u])return null; ZAUDIO.loading[u]=1;
    fetch(u).then(function(r){ return r.arrayBuffer(); }).then(function(b){ return new Promise(function(res,rej){ a.decodeAudioData(b,res,rej); }); }).then(function(d){ ZAUDIO.buf[u]=d; delete ZAUDIO.loading[u]; if(cb)cb(d); }).catch(function(){ delete ZAUDIO.loading[u]; }); return null; },
  // an effect or stinger: true when a file played it
  play:function(id,o){ o=o||{}; if(!ZAUDIO.on||!ZAUDIO.has(id)||(typeof ZSFX!=='undefined'&&ZSFX.muted))return false; var a=ZAUDIO.ctx(); if(!a)return false; var F=ZAUDIO.idx[id].files, k=(ZAUDIO._var[id]=((ZAUDIO._var[id]||0)+1)%F.length), f=F[k], d=ZAUDIO.buffer(f);
    if(!d){ F.forEach(function(x){ ZAUDIO.buffer(x); }); return false; }      /* the first time: all its takes are fetched now, the procedural sound plays this once */
    var s=a.createBufferSource(), g=a.createGain(); s.buffer=d; s.playbackRate.value=o.pitch||(0.95+Math.random()*0.1); g.gain.value=o.vol||1; s.connect(g); g.connect(ZAUDIO.bus[ZAUDIO.idx[id].kind==='sting'?'music':'sfx']); s.start();
    if(ZAUDIO.idx[id].kind==='sting')ZAUDIO.duck(d.duration); return true; },
  duck:function(sec){ var g=ZAUDIO.bus&&ZAUDIO.bus.music, a=ZAUDIO.ctx(); if(!g||!a||!ZAUDIO.mus)return; var t=a.currentTime; g.gain.cancelScheduledValues(t); g.gain.setTargetAtTime(ZAUDIO.vol.music*0.35,t,0.08); g.gain.setTargetAtTime(ZAUDIO.vol.music,t+sec,0.6); },
  // ── music: a streamed piece, looped by two elements taking turns ──
  _el:function(f){ var e=new Audio(); e.src=ZAUDIO.url(f); e.preload='auto'; e.crossOrigin='anonymous'; return e; },
  music:function(id,fade){ var a=ZAUDIO.ctx(); if(!a)return; var want=ZAUDIO.pick(id); if(want===ZAUDIO.cue)return; ZAUDIO.cue=want; var old=ZAUDIO.mus; ZAUDIO.mus=null; fade=fade||2;
    if(old)ZAUDIO._stop(old,fade); if(!want)return;
    var E=ZAUDIO.idx[want], f=E.files[0], g=a.createGain(); g.gain.value=0.0001; g.connect(ZAUDIO.bus.music);
    var M={id:want,f:f,g:g,loop:E.loop,els:[],cur:0,t:null};
    var start=function(i,at){ var e=M.els[i]||(M.els[i]=ZAUDIO._el(f)); if(!e._n){ try{ e._n=a.createMediaElementSource(e); e._g=a.createGain(); e._n.connect(e._g); e._g.connect(g); }catch(x){} } e.currentTime=at||0; if(e._g)e._g.gain.value=1; var p=e.play(); if(p&&p.catch)p.catch(function(){}); M.cur=i; };
    start(0,0); g.gain.setTargetAtTime(1,a.currentTime,fade/3);
    // the loop: shortly before loopEnd the other element starts at loopStart and the two cross over in 30 ms
    if(M.loop)M.t=setInterval(function(){ if(ZAUDIO.mus!==M)return; var e=M.els[M.cur]; if(!e||e.paused)return; var le=f.le||e.duration; if(le&&e.currentTime>=le-0.06){ var o=M.cur, n=1-o; start(n,f.ls||0); var eo=M.els[o]; if(eo&&eo._g){ eo._g.gain.setTargetAtTime(0,a.currentTime,0.01); setTimeout(function(){ try{ eo.pause(); }catch(x){} },120); } else { try{ eo.pause(); }catch(x){} } } },20);
    ZAUDIO.mus=M; },
  _stop:function(M,fade){ var a=ZAUDIO.ctx(); if(M.t)clearInterval(M.t); try{ M.g.gain.setTargetAtTime(0.0001,a.currentTime,(fade||2)/3); }catch(e){} setTimeout(function(){ M.els.forEach(function(e){ try{ e.pause(); }catch(x){} }); try{ M.g.disconnect(); }catch(x){} },(fade||2)*1000+400); },
  // ── ambience: one decoded loop at a time, crossfaded ──
  ambience:function(id){ var a=ZAUDIO.ctx(); if(!a)return; var want=ZAUDIO.pick(id); if(want===ZAUDIO.ambCue&&(!want||ZAUDIO.amb))return; var f=want&&ZAUDIO.idx[want].files[0], d=f&&ZAUDIO.buffer(f);
    if(want&&!d)return;      /* still on its way — next tick */
    ZAUDIO.ambCue=want; var old=ZAUDIO.amb; ZAUDIO.amb=null; if(old){ old.g.gain.setTargetAtTime(0.0001,a.currentTime,0.8); setTimeout(function(){ try{ old.s.stop(); }catch(x){} },3500); } if(!want)return;
    var s=a.createBufferSource(), g=a.createGain(); s.buffer=d; s.loop=true; if(f.le){ s.loopStart=f.ls||0; s.loopEnd=f.le; } g.gain.value=0.0001; s.connect(g); g.connect(ZAUDIO.bus.amb); s.start(); g.gain.setTargetAtTime(1,a.currentTime,0.8); ZAUDIO.amb={s:s,g:g,id:want}; },
  // ── the director ──
  realmCue:['mu_grass','mu_grass','mu_wet','mu_high','mu_ash'], realmAmb:['am_meadow','am_meadow','am_marsh','am_highwind','am_ash'],
  decide:function(){ if(typeof game==='undefined'||!game.scene)return null; var S=game.scene, act=function(k){ return S.isActive(k); };
    if(act('Title')||act('Boot'))return {m:'mu_title',a:null};
    if(act('FeastHall')){ var fh=S.getScene('FeastHall'), ps0=fh&&fh.worldScene&&fh.worldScene.playerState; return {m:ps0&&ps0.godsFree?'mu_gods_free':'mu_feast_hall',a:'am_orbs'}; }
    if(act('VolcanoEscape'))return {m:'mu_escape',a:'am_forge'}; if(act('VolcanoBossRush')||act('VolcanoMaze')||act('VolcanoBulletHell')||act('VolcanoPuzzle'))return {m:'mu_forges',a:'am_forge'};
    if(act('Sky'))return {m:'mu_sky',a:'am_sky'};
    if(act('Building')){ var B=S.getScene('Building'), ty=(B&&B.building&&B.building.type)||''; return {m:/home/.test(ty)?'mu_home':/glimmer/.test(ty)?'mu_glimmerhall':'mu_shops',a:null}; }
    if(act('Dungeon')){ var D=S.getScene('Dungeon'), bossOn=(D._bossGroup||[]).some(function(m){ return m&&!m.dead&&Math.hypot(m.x-D.px,m.y-D.py)<520; })||(D.monsters||[]).some(function(m){ return m&&m.isBoss&&!m.dead&&Math.hypot(m.x-D.px,m.y-D.py)<520; });
      if(D._asgc)return {m:bossOn?'mu_solmyrk':'mu_citadel',a:'am_asgard'}; if(D._musp)return {m:bossOn?'mu_surtharn':'mu_muspelheim',a:'am_forge'};
      if(typeof ZFORGE!=='undefined'&&ZFORGE.of&&ZFORGE.of(D))return {m:bossOn?'mu_boss':'mu_forges',a:'am_forge'};
      if(bossOn)return {m:D._mage?'mu_boss_mage':D._castle?'mu_boss':(D._bossKey&&typeof BossPhases!=='undefined'&&BossPhases.count(D._bossKey)>1)?'mu_boss_realm':'mu_boss',a:'am_cave'};
      if(D._trialRun)return {m:'mu_trial',a:null}; if(D._mage)return {m:'mu_mage',a:'am_tower'}; if(D._castle)return {m:'mu_castle',a:'am_castle'};
      if(D._isIsland)return {m:'mu_island',a:'am_sea'}; var tw=D.siteType==='tower'||D._theme==='tower_island'; return {m:tw?'mu_tower':'mu_dungeon',a:tw?'am_tower':'am_cave'}; }
    if(act('Island'))return {m:'mu_island',a:'am_sea'};
    var ws=S.getScene('World'); if(!ws||!ws.player||!act('World'))return null; var ps=ws.playerState||{}, x=ws.player.x, y=ws.player.y, night=(ws._night||0)>0.5;
    if(ps.muspEsc===1||ps.muspEsc===2)return {m:'mu_escape',a:'am_forge'};
    var fight=(ws.worldMonsters||[]).some(function(m){ return m&&!m.dead&&m._engT&&Date.now()-m._engT<5000&&Math.hypot(m.x-x,m.y-y)<420; });
    if(fight){ ZAUDIO._fightT=Date.now(); } if(fight||Date.now()-(ZAUDIO._fightT||0)<4000)return {m:'mu_fight',a:null,fast:true};
    if(ps.asgardDown&&!ps.spiritsHome&&typeof ZASG!=='undefined'){ try{ var P=ZASG.plan(ws); if(P.isl[Math.floor(y/TILE)*WORLD_W+Math.floor(x/TILE)])return {m:'mu_asgard',a:'am_asgard'}; }catch(e){} }
    if(typeof _inVillagePx==='function'&&_inVillagePx(x,y,4))return {m:ps.spiritsHome?'mu_green':night?'mu_village_night':'mu_village_day',a:night?'am_meadow_night':'am_village'};
    var q=typeof getTileSection==='function'?getTileSection(Math.floor(x/TILE),Math.floor(y/TILE))||1:1;
    return {m:ZAUDIO.realmCue[q]+(night?'_night':'_day'),a:ZAUDIO.realmAmb[q]==='am_meadow'?(night?'am_meadow_night':'am_meadow_day'):ZAUDIO.realmAmb[q]}; },
  tick:function(){ try{ if(!ZAUDIO.on||!ZAUDIO.idx||(typeof ZSFX!=='undefined'&&(ZSFX.muted||!ZSFX._unlocked)))return; if(typeof _anyModalOpen==='function'&&_anyModalOpen()&&!(typeof game!=='undefined'&&game.scene.isActive('Title')))return;
      var d=ZAUDIO.decide(); if(!d)return; ZAUDIO.music(d.m,d.fast?0.6:2); ZAUDIO.ambience(d.a); }catch(e){ if(!ZAUDIO._err){ ZAUDIO._err=1; console.warn('audio',e); } } },
  // the 🔊 panel: right-click or long-press the button
  panel:function(){ var el=document.getElementById('zaud-panel'); if(el){ el.remove(); return; } el=document.createElement('div'); el.id='zaud-panel';
    el.style.cssText='position:fixed;right:16px;bottom:120px;z-index:330;background:rgba(8,12,20,.94);border:1px solid rgba(255,242,176,.4);border-radius:10px;padding:10px 14px;color:#e8eef8;font:13px "Segoe UI",sans-serif;min-width:220px';
    el.innerHTML='<b style="color:#fff2b0">Sound</b>'+[['music','Music'],['amb','Ambience'],['sfx','Effects']].map(function(k){ return '<label style="display:flex;align-items:center;gap:8px;margin-top:8px">'+k[1]+'<input type="range" min="0" max="100" value="'+Math.round(ZAUDIO.vol[k[0]]*100)+'" data-k="'+k[0]+'" style="flex:1"></label>'; }).join('')+
      '<div style="margin-top:8px;color:#8aa0b8;font-size:11px">'+(ZAUDIO.idx?Object.keys(ZAUDIO.idx).length+' sound files in':'No sound files yet — the game\'s own sounds play')+'</div>';
    el.querySelectorAll('input').forEach(function(i){ i.oninput=function(){ ZAUDIO.setVol(i.dataset.k,i.value/100); }; }); document.body.appendChild(el);
    setTimeout(function(){ document.addEventListener('pointerdown',function off(e){ if(!el.contains(e.target)&&e.target.id!=='mute-btn'){ el.remove(); document.removeEventListener('pointerdown',off,true); } },true); },0); }
};
ZAUDIO.load(); setInterval(ZAUDIO.tick,1000);
// the sound rests while the tab is hidden (phones especially) and comes back with it
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('visibilitychange',function(){ try{ var a=typeof ZSFX!=='undefined'&&ZSFX.ctx; if(document.hidden){ if(a&&a.state==='running')a.suspend(); if(ZAUDIO.mus)ZAUDIO.mus.els.forEach(function(e){ if(!e.paused){ e._zhid=1; e.pause(); } }); }
  else { if(a&&a.state==='suspended'&&ZSFX._unlocked)a.resume(); if(ZAUDIO.mus)ZAUDIO.mus.els.forEach(function(e){ if(e._zhid){ e._zhid=0; var p=e.play(); if(p&&p.catch)p.catch(function(){}); } }); } }catch(e){} });
// the procedural sounds give way to files that exist
setTimeout(function(){ if(typeof ZSFX!=='undefined'){ var p0=ZSFX.play, m0=ZSFX.music;
    ZSFX.play=function(name,o){ var id=ZAUDIO.MAP[name]; if(id&&ZAUDIO.play(id,{vol:o&&o.big?Math.min(1.4,0.8+o.big*0.3):1}))return; return p0.apply(this,arguments); };
    ZSFX.music=function(){ if(ZAUDIO.on&&ZAUDIO.idx&&(ZAUDIO.pick('mu_boss')||ZAUDIO.pick('mu_boss_realm')))return; return m0.apply(this,arguments); }; }
  if(typeof SFX!=='undefined'){ ['pickup','fanfare'].forEach(function(k){ var f=SFX[k]; if(typeof f==='function')SFX[k]=function(){ if(ZAUDIO.play(ZAUDIO.MAP[k]))return; return f.apply(this,arguments); }; }); }
  // stingers on a few moments
  if(typeof _completeQuest==='function'){ var cq=_completeQuest; _completeQuest=function(){ var r=cq.apply(this,arguments); ZAUDIO.play('st_quest'); return r; }; }
  if(typeof DungeonScene!=='undefined'){ var ob=DungeonScene.prototype._onBossDefeated; if(ob)DungeonScene.prototype._onBossDefeated=function(){ var r=ob.apply(this,arguments); if(this._bossDefeated)ZAUDIO.play('st_boss_down'); return r; }; }
  var mb=document.getElementById('mute-btn'); if(mb){ mb.addEventListener('contextmenu',function(e){ e.preventDefault(); ZAUDIO.panel(); }); var lt=null; mb.addEventListener('pointerdown',function(){ lt=setTimeout(function(){ lt=null; ZAUDIO.panel(); },550); }); mb.addEventListener('pointerup',function(){ if(lt)clearTimeout(lt); }); mb.title='Sound on/off — right-click (or hold) for the volumes'; }
},0);
