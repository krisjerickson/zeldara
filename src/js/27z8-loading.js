// ═══════════════════════════════════════════════════════════════════════
// ║ 27z8-loading.js — round 142 (Kris: "when we go into adventure sites, it takes awhile to load. we need to create an awesome looking loading
// ║ screen, unique to each adventure site. I'm thinking kind of like you made for the intro screen for when you resume your game. this is also
// ║ a great place for having tips be shown, during loading screens, including for restarting the game").
// ║ ZLOADS: the moment you step into a site (a tower, a dungeon, a mage tower, a castle, a forge, Muspelheim, a sky port, and each new floor) a
// ║ full-screen card covers the wait: the site's own painting (load_<site id>, painted per site — r142_load), until then the site's painted
// ║ entrance over its realm's vista; its name in gold, the realm and the floor; a turning ring of runes; and a tip. It fades away once the
// ║ site is built (never sooner than ZLOADS.MIN ms, so a tip can be read). Switch: ZLOADS.on.
// ═══════════════════════════════════════════════════════════════════════
var ZLOADS={ on:true, MIN:1600, KEYS:{Dungeon:1,Sky:1,VolcanoMaze:1,VolcanoBulletHell:1,VolcanoPuzzle:1,VolcanoEscape:1,VolcanoBossRush:1}, _i:Math.floor(Math.random()*997),
  VISTA:{1:'wl_vista_silverrun',2:'wl_vista_lilies',3:'wl_vista_scar',4:'wl_vista_ember'},
  TIPS:[
    'Your game saves itself as you go. To start over, choose NEW PLAYER on the title — your saves stay safe under RETURNING PLAYER.',
    'Each player has three save slots. A new slot is a fresh start without losing the others.',
    'Fall in a site and you wake in the village with a quarter of your health. Walk back in — the floors you cleared stay cleared.',
    'A cleared site stays cleared. Fall in battle and you can come back to it with fresh foes.',
    'Away from a site for a while? It fills up again — a good place to come back to for gold and practice.',
    'Esc opens the pause panel: the map, your pack, the Tome, Training, and saving.',
    'Hold Shift and your shield takes the blow. A shield foe turns slowly — get behind it.',
    'Alt rolls you three paces. Nothing touches you while you tumble.',
    'The gold ring marks the foe you will hit. Hold the attack to charge it; press a direction while holding to switch.',
    'Below ground, the dark hides the rooms until you walk them. Find the stairs down.',
    'Monsters give chase — if too many come, lead them to a doorway and fight them one at a time.',
    'Water beats fire, fire beats grass, grass beats earth, earth beats water. The Tome shows each foe\'s weakness.',
    'P drinks a potion at once; O eats food, which heals slowly. Your own bed heals everything.',
    'Every realm holds you at its level cap until its master builder is free. Bram, Mira, Dunn and Vela open the way.',
    'Treasure sites unseal their realm\'s boss tower and boss dungeon — clear all three.',
    'Camps guard something: a fire, a chest, a well, a shrine. Beat every guard and it is yours.',
    'Familiars fight beside you. N chooses which; the fairies by the waystones teach them new tricks.',
    'Waystones carry you to any waystone you have woken. The village stone is always open.',
    'Lost? Press ? at the top right: your next step, and every tip you have been given.',
    'The journal (Q) holds the Saga in order and every side quest. ☆ Make current points the gold arrow at it.',
    'Bindstones chain the dead. Beat the Binder and the spirit goes free — with a shard of soulglass for you.',
    'Six shards of one realm make its lattice. Sólveig fuses them in the Glimmerhall.',
    'Mira forges a hearth tray for each realm from the realm\'s metal and its boss dungeon\'s core.',
    'Sold the wrong thing? The shopkeeper keeps it a while — buy it back from the same shop.',
    'A full health bar shows full hearts. Lose two hearts and Oswin will remind you about your bed.',
    'Sleep in your bed and the day moves on — the seasons turn with the roads you open.',
    'Festivals come with the seasons: three days of games on the Green, and a ribbon to keep.',
    'After the end, the Saga can be told again — your Tome, runes and trophies come with you, and the world grows teeth.',
    'Full screen (⛶) keeps the Windows key and Esc in the game. Hold Esc to leave full screen.'],
  tip:function(){ ZLOADS._i=(ZLOADS._i+1)%ZLOADS.TIPS.length; return ZLOADS.TIPS[ZLOADS._i]; },
  pic:function(id){ try{ return id&&typeof ZHUD!=='undefined'&&ZHUD.pic?ZHUD.pic(id):null; }catch(e){ return null; } },
  art:function(site,data,key){ var S=site||{}, own=ZLOADS.pic('load_'+S.id)||(key==='Sky'?ZLOADS.pic('load_sky'):/^Volcano/.test(key||'')?ZLOADS.pic('load_muspelheim'):null), ent=null;
    try{ if(S.castle&&typeof _wsCastleId==='function')ent=_wsCastleId(S); if(!ent&&typeof _wsPaintedId==='function')ent=_wsPaintedId(S,S.section||1); if(!ent&&S.type==='dungeon')ent=S.boss?'en_dng_boss':'en_dng_'+(S.section||1); }catch(e){}
    if(!ent&&data&&data.theme==='volcano')ent='en_muspelheim';
    return {own:own, ent:ZLOADS.pic(ent), vista:ZLOADS.pic(ZLOADS.VISTA[S.section]||'wl_vista_silverrun')}; },
  show:function(key,data){ if(!ZLOADS.on||typeof document==='undefined')return; data=data||{}; var site=data.site||{}, A=ZLOADS.art(site,data,key), E=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); };
    var el=document.getElementById('zload'); if(!el){ el=document.createElement('div'); el.id='zload'; (document.getElementById('app')||document.body).appendChild(el); }
    var realm=typeof SECTION_NAMES!=='undefined'&&SECTION_NAMES[site.section]||'', fl=data.maxFloors?'Floor '+((data.floor||0)+1)+' of '+data.maxFloors:'';
    var name=site.name||(key==='Sky'?'The sky port':key.indexOf('Volcano')===0?'The forge':'');
    el.innerHTML='<div class="zl-bg" style="background-image:url(\''+(A.own||A.vista||'')+'\')"></div>'+(!A.own&&A.ent?'<img class="zl-ent" src="'+A.ent+'" alt="">':'')+'<div class="zl-aur"></div><div class="zl-vig"></div>'+
      '<div class="zl-txt"><div class="zl-realm">'+E(realm)+'</div><div class="zl-name">'+E(name)+'</div>'+(fl?'<div class="zl-fl">'+E(fl)+'</div>':'')+'</div>'+
      '<div class="zl-ring"><span>ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ</span></div><div class="zl-tip"><b>ᛉ Tip</b> '+E(ZLOADS.tip())+'</div>';
    el.classList.remove('out'); el.style.display='block'; ZLOADS._t0=Date.now(); ZLOADS._key=key; clearTimeout(ZLOADS._safe); ZLOADS._safe=setTimeout(ZLOADS.hide,12000);
    try{ var sc=game.scene.getScene(key); if(sc&&sc.events){ var done=function(){ var w=Math.max(250,ZLOADS.MIN-(Date.now()-ZLOADS._t0)); setTimeout(ZLOADS.hide,w); }; sc.events.once('create',done); } }catch(e){} },
  hide:function(){ var el=document.getElementById('zload'); if(!el||el.style.display==='none')return; el.classList.add('out'); clearTimeout(ZLOADS._safe); setTimeout(function(){ if(el.classList.contains('out'))el.style.display='none'; },520); } };
(function(){ if(typeof Phaser==='undefined'||!Phaser.Scenes||!Phaser.Scenes.ScenePlugin)return; var SP=Phaser.Scenes.ScenePlugin.prototype;
  ['launch','start','restart'].forEach(function(m){ var f0=SP[m]; if(!f0)return; SP[m]=function(key,data){ try{ var k=m==='restart'?this.key:(typeof key==='string'?key:null); var d=m==='restart'?key:data; if(k&&ZLOADS.KEYS[k])ZLOADS.show(k,d); }catch(e){} return f0.apply(this,arguments); }; });
  if(typeof game!=='undefined'&&game.scene){ var gs0=game.scene.start; game.scene.start=function(key,data){ try{ if(ZLOADS.KEYS[key])ZLOADS.show(key,data); }catch(e){} return gs0.apply(this,arguments); }; }
  else setTimeout(function(){ if(typeof game!=='undefined'&&game.scene&&!game.scene._zl){ game.scene._zl=1; var gs1=game.scene.start; game.scene.start=function(key,data){ try{ if(ZLOADS.KEYS[key])ZLOADS.show(key,data); }catch(e){} return gs1.apply(this,arguments); }; } },0);
})();
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.textContent=
  '#zload{display:none;position:fixed;inset:0;z-index:9000;background:#05070d;overflow:hidden;opacity:1;transition:opacity .5s ease}#zload.out{opacity:0;pointer-events:none}'+
  '#zload .zl-bg{position:absolute;inset:-4%;background:center/cover no-repeat;filter:saturate(1.1) brightness(.62);animation:zlDrift 14s ease-in-out infinite alternate}@keyframes zlDrift{from{transform:scale(1.02) translateX(-1%)}to{transform:scale(1.08) translateX(1%)}}'+
  '#zload .zl-ent{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);height:min(52vh,520px);filter:drop-shadow(0 0 24px rgba(111,227,245,.45)) drop-shadow(0 10px 30px rgba(0,0,0,.7));animation:zlRise 1.4s ease-out}@keyframes zlRise{from{opacity:0;transform:translate(-50%,-46%)}}'+
  '#zload .zl-aur{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 0%,rgba(80,230,200,.22),transparent 55%),radial-gradient(ellipse at 75% 5%,rgba(150,90,255,.2),transparent 50%);mix-blend-mode:screen;animation:zlAur 7s ease-in-out infinite alternate}@keyframes zlAur{to{opacity:.55;transform:translateX(3%)}}'+
  '#zload .zl-vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.75) 100%),linear-gradient(180deg,rgba(0,0,0,.5),transparent 25%,transparent 62%,rgba(0,0,0,.85))}'+
  '#zload .zl-txt{position:absolute;left:0;right:0;top:7vh;text-align:center;text-shadow:0 2px 10px #000}#zload .zl-realm{font:600 clamp(12px,1.6vw,16px) "Cinzel",Georgia,serif;letter-spacing:.3em;text-transform:uppercase;color:#9fe8ff}'+
  '#zload .zl-name{font:700 clamp(28px,4.6vw,58px) "Cinzel Decorative","Cinzel",Georgia,serif;color:#ffe08a;letter-spacing:.04em;margin-top:4px;background:linear-gradient(180deg,#fff3c0,#e8b850 60%,#b07c20);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 2px 6px rgba(0,0,0,.8))}'+
  '#zload .zl-fl{font:600 clamp(12px,1.4vw,15px) "Segoe UI",sans-serif;color:#e8eef6;margin-top:6px;opacity:.9}'+
  '#zload .zl-ring{position:absolute;right:4vw;bottom:5vh;width:74px;height:74px;border-radius:50%;border:2px solid rgba(111,227,245,.55);box-shadow:0 0 18px rgba(111,227,245,.45),inset 0 0 12px rgba(111,227,245,.3);animation:zlSpin 6s linear infinite}'+
  '#zload .zl-ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:14px serif;color:#bff8ff;letter-spacing:1px;text-shadow:0 0 8px #6fe3f5;transform:scale(.62)}@keyframes zlSpin{to{transform:rotate(360deg)}}'+
  '#zload .zl-tip{position:absolute;left:50%;bottom:6vh;transform:translateX(-50%);width:min(760px,78vw);padding:12px 18px;border-radius:12px;background:rgba(6,10,18,.72);border:1px solid rgba(255,226,122,.35);color:#e8eef6;font:clamp(13px,1.4vw,16px)/1.5 "Segoe UI",sans-serif;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.5)}'+
  '#zload .zl-tip b{color:#ffe08a;font-family:"Cinzel",Georgia,serif;margin-right:6px}body.ztouch-on #zload .zl-ring{width:52px;height:52px;bottom:auto;top:3vh;right:3vw}';
  document.head.appendChild(st); })();
