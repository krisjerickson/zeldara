// ═══════════════════════════════════════════════════════════════════════
// ║ MULTI-PHASE QUADRANT BOSSES (Phase 4b)
// ║ The ★ dungeon + tower guardians fight in phases: phase 1 on the site's
// ║ last floor (their original attacks), then each defeat sends the fight
// ║ to a new arena where the boss returns in an evolved form with new
// ║ moves, more health, and (from the Wetlands on) extra kinds of health:
// ║   ✨ ward  — only spells (and familiars) break it
// ║   🏹 guard — only arrows break it
// ║   🛡 plate — only melee blows break it
// ║ (other attacks still chip it at 15%, so you can never get stuck).
// ║ Phases: Grasslands 2 · Wetlands 3 · Highlands 4 · Ashlands 5.
// ║ Summons from the Wetlands on; Highlands + Ashlands finales bring
// ║ several bosses at once. Arenas have their own hazards and events.
// ═══════════════════════════════════════════════════════════════════════

// (arena designs live in 07u-boss-arenas.js so the Design Lab can show them)
// ── the phases ──
// bars: {k:'ward'|'guard'|'plate', f: share of HP, at: shows when HP ≤ at (1 = from the start)}
// ev: arena events {k:'marks'|'geyser'|'wind'|'wave'|'rift', every:s, n, rad, col, st}
var BOSS_BAR_INFO={ward:{n:'Ward',ic:'✨',col:'#c080ff',only:['spell','familiar'],hint:'Use spells!'},guard:{n:'Guard',ic:'🏹',col:'#ffd060',only:['ranged'],hint:'Use arrows!'},plate:{n:'Plate',ic:'🛡',col:'#a8b0c0',only:['melee'],hint:'Use your sword!'}};
var BOSS_PHASES={
  goblin_king:{q:1,phases:[null,
    {form:'bf_goblin_king_2',arena:'throne_warren',hp:1.1,intro:'The Goblin King crashes through the floor into his Throne Warren — and returns as the GOBLIN WARLORD!',
     kit:'charge wind=0.6 mult=3.4 stun=1 kb=60 | sweep r=62 arc=3.2 m=1.2 cd=2.6 | lob rad=30 t=1 zone=burn zt=3 col=#ff7030 m=0.8 cd=3.4 | lunge r=110 m=1.1 cd=3',ev:[{k:'marks',every:6,n:3,rad:22,col:'#c8a878',say:'The crowd throws rocks!'}]}]},
  dark_warlock:{q:1,phases:[null,
    {form:'bf_dark_warlock_2',arena:'moon_canopy',hp:1.1,intro:'The Dark Warlock rips open a moon-gate — the HEXLORD WARLOCK waits in the canopy!',
     kit:'blink every=2.6 d=150 | shoot p=orb n=3 sp=0.3 homing=1 spd=150 m=0.6 cd=2.4 | beam wind=1 len=320 w=10 col=#ff60ff m=1 cd=4 | ring spd=140 max=200 gap=1 col=#c080ff m=0.8 cd=5',ev:[{k:'marks',every:5,n:2,rad:26,col:'#d0c8ff',say:'Moonbeams strike!'}]}]},
  swamp_witch:{q:2,phases:[null,
    {form:'bf_swamp_witch_2',arena:'sunken_grotto',hp:1.15,bars:[{k:'ward',f:0.35,at:1}],intro:'The Swamp Witch sinks into the mire — the BOG HAG rises in the Sunken Grotto!',
     kit:'kite range=190 | cloud at=player rad=70 st=poison v=2 dur=4 cd=5 | lob n=2 rad=30 t=1 zone=poison zt=4 col=#80e060 m=0.8 cd=3 | summon id=glowfrog n=2 max=3 cd=10',ev:[{k:'geyser',every:6,n:2,rad:34,st:'poison',col:'#8ad040',say:'Mud geysers bubble up!'}]},
    {form:'bf_swamp_witch_3',arena:'cauldron_pit',hp:1.3,sc:2.6,bars:[{k:'ward',f:0.3,at:1},{k:'guard',f:0.3,at:0.5}],intro:'The hag dives into her cauldron — the MIRE MATRIARCH bursts out!',
     kit:'leap every=1.6 d=110 | pull r=190 keep=26 m=0.5 cd=4 | drain r=160 m=0.3 dur=2.5 col=#80e060 cd=6 | slam r=70 zone=poison zt=4 m=1.1 cd=3.2 | summon id=leech_swarm n=2 max=3 cd=11',ev:[{k:'lob',every:5,n:3,rad:32,st:'poison',col:'#a0ff60',say:'The cauldron boils over!'}]}]},
  storm_mage:{q:2,phases:[null,
    {form:'bf_storm_mage_2',arena:'cathedral_roof',hp:1.15,bars:[{k:'guard',f:0.35,at:1}],intro:'The Storm Mage bursts through the roof — the TEMPEST MAGE commands the rooftop!',
     kit:'kite range=200 | beam wind=0.8 len=340 w=10 col=#fff080 m=1 cd=2.6 | gust r=180 dist=120 m=0.4 cd=4 | shoot p=spark n=3 sp=0.25 spd=260 m=0.6 cd=2.2 | summon id=storm_heron n=1 max=2 cd=10',ev:[{k:'marks',every:4,n:3,rad:24,col:'#fff080',say:'Lightning strikes the roof!'}]},
    {form:'bf_storm_mage_3',arena:'storm_eye',hp:1.3,sc:2.4,bars:[{k:'ward',f:0.3,at:1},{k:'guard',f:0.25,at:0.5}],intro:'The mage dissolves into the storm itself — the STORM AVATAR!',
     kit:'hover | ring spd=170 max=260 gap=1 col=#fff080 m=0.9 cd=3 | strike still=1.2 col=#ffff80 m=1 | beam wind=1 len=360 w=12 col=#c8e0ff m=1.1 cd=3.6 | summon id=cloud_sylph n=2 max=3 cd=11',ev:[{k:'wind',every:7,dist:90,say:'The storm wind howls!'},{k:'marks',every:5,n:4,rad:22,col:'#fff080'}]}]},
  rock_dragon:{q:3,phases:[null,
    {form:'bf_rock_dragon_2',arena:'geode_hollow',hp:1.15,bars:[{k:'plate',f:0.35,at:1}],intro:'The Rock Dragon plunges into the earth — the CRYSTAL DRAKE glows in the Geode Hollow!',
     kit:'chase | breath r=130 cone=0.6 col=#80e0ff st=slow v=0.35 m=1 cd=2.8 | shoot p=shard n=5 sp=0.22 ric=1 spd=260 m=0.5 cd=2.6 | summon id=crystal_golemling n=2 max=3 cd=10',ev:[{k:'marks',every:5,n:3,rad:24,col:'#80e0ff',say:'Crystal shards fall!'}]},
    {form:'bf_rock_dragon_3',arena:'chasm_bridge',hp:1.25,bars:[{k:'plate',f:0.3,at:1},{k:'ward',f:0.25,at:0.5}],intro:'The mountain shakes — the EARTHSHAKER WYRM blocks the chasm bridge!',
     kit:'lumber | slam r=80 m=1.3 kb=80 cd=3 | charge wind=0.6 mult=3.4 stun=1 kb=60 | lob n=3 rad=30 t=1.1 col=#9a8a78 m=1 cd=3.4 | summon id=craglings n=1 max=2 cd=12',ev:[{k:'marks',every:4,n:4,rad:26,col:'#c8b090',say:'Rocks fall from the ceiling!'}]},
    {form:'bf_rock_dragon_4',arena:'dragon_summit',hp:1.35,sc:2.6,bars:[{k:'guard',f:0.25,at:1},{k:'plate',f:0.25,at:0.6},{k:'ward',f:0.25,at:0.3}],allies:[{form:'bf_drakeling',n:2,hp:0.35,kit:'flit | lunge r=130 spd=520 m=1 cd=2.6 fly=1 | shoot p=shard spd=260 m=0.5 cd=2.4'}],intro:'The MOUNTAIN TYRANT takes the summit — and its drakelings dive in!',
     kit:'chase | breath r=150 cone=0.65 col=#ff6030 st=burn m=1.2 cd=3 | lob n=4 rad=34 t=1.3 zone=lava zt=4 col=#ff8030 m=1.1 cd=4 | sweep r=70 arc=3.6 m=1.2 cd=3',ev:[{k:'marks',every:5,n:5,rad:30,col:'#ff8030',zone:'burn',say:'Meteors rain down!'}]}]},
  iron_sentinel:{q:3,phases:[null,
    {form:'bf_iron_sentinel_2',arena:'gear_hall',hp:1.15,bars:[{k:'plate',f:0.35,at:1}],intro:'The Iron Sentinel drops into the Gear Hall and rebuilds itself as the SIEGE SENTINEL!',
     kit:'lumber | slam r=76 m=1.3 cd=2.8 | lob n=3 rad=30 t=1.1 col=#9a8a78 zone=burn zt=3 m=0.9 cd=3.4 | summon id=clockwork_owl n=2 max=3 cd=11',ev:[{k:'geyser',every:5,n:3,rad:30,st:'burn',col:'#e0e0e0',say:'Steam vents blast!'}]},
    {form:'bf_iron_sentinel_3',arena:'observatory_dome',hp:1.25,sc:2.5,bars:[{k:'plate',f:0.3,at:1},{k:'guard',f:0.25,at:0.5}],intro:'Star-lenses slide into place — the COLOSSUS ENGINE awakens under the dome!',
     kit:'still | beam wind=1 len=360 w=12 col=#80e0ff m=1.1 cd=2.4 | pull r=220 keep=60 m=0.3 cd=5 | ring spd=160 max=240 gap=1 col=#9fe8ff m=0.9 cd=3.6 | summon id=sentry_orb n=2 max=3 cd=11',ev:[{k:'marks',every:5,n:4,rad:24,col:'#fff4c0',say:'Starlight focuses!'}]},
    {form:'bf_iron_sentinel_4',arena:'star_forge',hp:1.35,sc:2.4,bars:[{k:'plate',f:0.25,at:1},{k:'guard',f:0.25,at:0.6},{k:'ward',f:0.25,at:0.3}],allies:[{form:'bf_forge_guardian',n:2,hp:0.35,kit:'lumber | slam r=66 m=1.3 zone=burn zt=2 cd=3 | armor n=3 red=0.6'}],intro:'In the Star Forge, SENTINEL PRIME ignites — with two Forge Guardians!',
     kit:'charge wind=0.6 mult=3.4 stun=1 kb=60 | beam wind=0.9 len=380 w=12 col=#ff4020 m=1.2 cd=3 | wall dur=6 col=#8a8e96 cd=8 | shoot p=bolt n=4 sp=0.2 spd=300 m=0.6 cd=2.6',ev:[{k:'lob',every:5,n:4,rad:30,st:'burn',col:'#ffe070',say:'Molten star-metal splashes!'}]}]},
  lava_titan:{q:4,phases:[null,
    {form:'bf_lava_titan_2',arena:'crust_field',hp:1.1,bars:[{k:'plate',f:0.35,at:1}],intro:'The Lava Titan melts into the lava sea — the MAGMA TITAN rises from the crust!',
     kit:'lumber | slam r=80 zone=lava zt=4 m=1.3 cd=3 | lob n=3 rad=32 t=1 zone=lava zt=4 col=#ff6a20 m=1 cd=3.2 | summon id=magma_vent n=1 max=3 cd=9',ev:[{k:'geyser',every:5,n:3,rad:34,st:'burn',col:'#ff6a20',say:'The crust cracks — lava bursts up!'}]},
    {form:'bf_lava_titan_3',arena:'lava_falls',hp:1.2,sc:2.4,bars:[{k:'plate',f:0.3,at:1},{k:'guard',f:0.25,at:0.5}],intro:'Cooled to black glass, the OBSIDIAN COLOSSUS stands on the lava falls!',
     kit:'lumber | shoot p=glass n=7 sp=0.18 spd=260 m=0.5 cd=2.4 | slam r=76 m=1.3 cd=3 | reflect | summon id=charred_zombies n=2 max=4 cd=10',ev:[{k:'wave',every:7,col:'#ff6a20',say:'A lava wave pours down the terrace!'}]},
    {form:'bf_lava_titan_4',arena:'caldera_rim',hp:1.3,sc:2.4,bars:[{k:'ward',f:0.22,at:1},{k:'plate',f:0.22,at:0.66},{k:'guard',f:0.22,at:0.33}],intro:'The MOLTEN BEHEMOTH charges round the caldera rim!',
     kit:'charge wind=0.6 mult=3.4 stun=1 kb=60 | aura r=56 m=0.35 st=burn t=2 | marks n=6 rad=26 delay=1.3 seq=0.15 spread=180 col=#ff8040 zone=burn m=1 cd=4 | summon id=cinder_hounds n=2 max=3 cd=10',ev:[{k:'geyser',every:5,n:4,rad:32,st:'burn',col:'#ff6a20',say:'Lava geysers erupt!'}]},
    {form:'bf_lava_titan_5',arena:'volcano_heart',hp:1.4,sc:2.8,bars:[{k:'ward',f:0.25,at:1},{k:'guard',f:0.25,at:0.6},{k:'plate',f:0.25,at:0.3}],allies:[{form:'bf_lava_titan_2',n:2,hp:0.3,kit:'lumber | slam r=70 zone=lava zt=3 m=1.2 cd=3.2 | armor n=3 red=0.6'}],intro:'At the HEART OF THE VOLCANO, the titan\'s core beats — and two Magma Titans rise to guard it!',
     kit:'hover | ring spd=160 max=260 gap=1 col=#ff7030 st=burn m=1 cd=3 | lob n=5 rad=34 t=1.3 zone=lava zt=4 col=#ff8030 m=1.1 cd=4 | beam wind=1 len=360 w=14 col=#ffb040 m=1.2 cd=4.5 | summon id=imp_bombardier n=2 max=3 cd=12',ev:[{k:'marks',every:4,n:5,rad:30,col:'#ff8030',zone:'lava',say:'Meteors!'},{k:'geyser',every:6,n:3,rad:32,st:'burn',col:'#ff6a20'}]}]},
  shadow_lord:{q:4,phases:[null,
    {form:'bf_shadow_lord_2',arena:'shattered_sanctum',hp:1.1,bars:[{k:'ward',f:0.35,at:1}],intro:'The Shadow Lord melts into the dark — the UMBRAL LORD stalks the Shattered Sanctum!',
     kit:'blink every=2.4 d=140 | cloud at=player rad=80 st=blind dur=3 cd=6 | shoot p=orb homing=1 spd=160 m=0.7 cd=2.2 | drain r=170 m=0.3 dur=2.5 col=#c040ff cd=6 | summon id=smoke_wraith n=1 max=2 cd=10',ev:[{k:'geyser',every:6,n:3,rad:36,st:'blind',col:'#303040',say:'Shadow pools spread!'}]},
    {form:'bf_shadow_lord_3',arena:'mirror_hall',hp:1.2,bars:[{k:'plate',f:0.3,at:1},{k:'guard',f:0.25,at:0.5}],intro:'The ECLIPSE KNIGHT steps out of the mirrors!',
     kit:'chase s=1.15 | melee n=3 m=0.9 | swap r=240 cd=7 | echo m=0.8 | lunge r=130 m=1.2 cd=3 | summon id=mirror_sprite n=2 max=3 cd=10',ev:[{k:'marks',every:5,n:4,rad:24,col:'#c8d8ff',say:'The mirrors flash!'}]},
    {form:'bf_shadow_lord_4',arena:'starless_void',hp:1.3,sc:2.6,bars:[{k:'ward',f:0.22,at:1},{k:'guard',f:0.22,at:0.66},{k:'plate',f:0.22,at:0.33}],intro:'Everything goes dark — the VOID SOVEREIGN opens its eye!',
     kit:'drift keep=160 | beam wind=0.9 len=380 w=10 col=#c040ff m=1.1 cd=2.6 | beam wind=1.2 len=380 w=10 col=#ff60ff m=1 cd=3.4 | pull r=240 keep=70 m=0.3 cd=5 | summon id=kelp_wraith n=2 max=3 cd=11',ev:[{k:'rift',every:7,say:'A void rift pulls at you!'},{k:'marks',every:5,n:3,rad:26,col:'#c040ff'}]},
    {form:'bf_shadow_lord_5',arena:'dawn_altar',hp:1.4,sc:2.6,bars:[{k:'plate',f:0.25,at:1},{k:'ward',f:0.25,at:0.6},{k:'guard',f:0.25,at:0.3}],allies:[{form:'bf_shadow_twin',n:2,hp:0.3,kit:'blink every=2.2 d=120 | shoot p=orb homing=1 spd=160 m=0.6 cd=2.4 | dodge cd=3'}],intro:'At the DAWN ALTAR the SHADOW LORD ASCENDANT splits into three!',
     kit:'blink every=3 d=150 | ring spd=170 max=260 gap=1 col=#ffe080 m=1 cd=3 | shoot p=orb n=5 sp=0.25 homing=1 spd=160 m=0.6 cd=2.6 | marks n=6 rad=26 delay=1.2 seq=0.12 spread=170 col=#ffe080 m=1 cd=4 | drain r=180 m=0.3 dur=2 col=#ffe080 cd=7',ev:[{k:'marks',every:4,n:4,rad:28,col:'#ffe8a0',say:'Dawn light scorches the altar!'}]}]}
};
// register phase forms as engine monsters (sprite + kit)
(function(){ Object.keys(BOSS_PHASES).forEach(function(k){ var B=BOSS_PHASES[k]; B.phases.forEach(function(P,i){ if(!P)return;
    var reg=function(rid,form,kit){ var C=CHAR_BY_ID[form]; if(!C)return; MON_BY_ID[rid]={id:rid,name:C.name,q:B.q,seg:'boss',role:'boss',tier:5,spec:C.spec,tags:[]}; MX.KITS[rid]=kit; };
    P.rid='bp_'+k+'_'+(i+1); reg(P.rid,P.form,P.kit);
    (P.allies||[]).forEach(function(a,j){ a.rid=P.rid+'_a'+j; reg(a.rid,a.form,a.kit); }); }); }); })();

var BossPhases={
  count:function(key){ var B=BOSS_PHASES[key]; return B?B.phases.length:1; },
  // the arena floor for phase n (≥2): a cavern-builder spec
  arenaSpec:function(key,phase,seed){ var B=BOSS_PHASES[key], P=B&&B.phases[phase-1]; if(!P)return null; return {kind:'dungeon',design:BOSS_ARENAS[P.arena],seed:seed||7,last:true}; },
  // spawn the phase's boss (+ allies) as engine monsters
  spawn:function(scene,key,phase,x,y,mult){ var B=BOSS_PHASES[key], P=B.phases[phase-1], base=MDEFS[key]; if(!P||!base)return [];
    mult=mult||1; var lv=base.lvMax||base.lvMin||5, hp=Math.round(base.hp*P.hp*mult), atk=Math.round(base.atk*(1+0.08*(phase-1))*mult), df=Math.round((base.def||0)*mult);
    var mk=function(rid,px,py,hpv,sc,name){ var mon=MX.spawn(scene,rid,px,py,{q:B.q,stats:{hp:hpv,atk:atk,def:df,lv:lv,xp:Math.round(base.xp*0.8),gMin:base.gMin,gMax:base.gMax,r:Math.max(16,base.r)},scale:sc,name:name});
      if(!mon)return null; mon.isBoss=true; mon._m.aggro=true; mon.bossKey=key; mon.bossPhase=phase; scene.monsters.push(mon); return mon; };
    var boss=mk(P.rid,x,y,hp,(P.sc||2.2)/MX.scaleOf(MON_BY_ID[P.rid]),null), out=boss?[boss]:[];
    if(boss&&P.bars){ boss.bars=P.bars.map(function(b){ var I=BOSS_BAR_INFO[b.k]; return {k:b.k,n:I.n,ic:I.ic,col:I.col,only:I.only,hint:I.hint,at:b.at,max:Math.round(hp*b.f),hp:Math.round(hp*b.f)}; }); }
    (P.allies||[]).forEach(function(a){ for(var i=0;i<a.n;i++){ var an=(i+0.5)/a.n*Math.PI-Math.PI, ax=x+Math.cos(an)*90, ay=y+Math.sin(an)*40+30; if(!scene._canGoD(ax,ay)){ ax=x+(i?60:-60); ay=y+30; } var al=mk(a.rid,ax,ay,Math.round(hp*a.hp),1.6/MX.scaleOf(MON_BY_ID[a.rid]),null); if(al){ al.bossAlly=true; out.push(al); } } });
    scene._bossGroup=out; scene._bossKey=key; scene._bossPhase=phase; scene._bpEv=(P.ev||[]).map(function(e){ return Object.assign({t:e.every*0.6},e); });
    BossPhases.hud(scene,true); return out; },
  // HUD: name, phase pips, HP + extra health bars
  hud:function(scene,show){ var el=document.getElementById('boss-hud'); if(!el){ el=document.createElement('div'); el.id='boss-hud'; (document.getElementById('app')||document.body).appendChild(el); }
    if(!show){ el.style.display='none'; return; } el.style.display='block'; el.classList.toggle('elite',String(scene._bossKey||'').indexOf('elite_')===0); scene.events.once('shutdown',function(){ el.style.display='none'; }); scene.events.once('sleep',function(){ el.style.display='none'; }); },
  hudTick:function(scene){ var el=document.getElementById('boss-hud'); if(!el||el.style.display==='none')return; var L=(scene._bossGroup||[]).filter(function(m){ return m&&!m.dead; }); var key=scene._bossKey, n=BossPhases.count(key), ph=scene._bossPhase||1;
    var boss=(scene._bossGroup||[])[0]; if(!boss){ el.style.display='none'; return; }
    var html='<div class="bh-name">'+boss.def.name+(n>1?'<span class="bh-ph">'+Array.from({length:n},function(_,i){ return '<i class="'+(i<ph?'on':'')+'"></i>'; }).join('')+' Phase '+ph+' / '+n+'</span>':'<span class="bh-ph">'+(String(key).indexOf('elite_')===0?'★ Elite':'Castle warden')+'</span>')+'</div>';
    var bar=function(label,v,max,col,dim){ return '<div class="bh-bar'+(dim?' dim':'')+'"><b style="width:'+Math.max(0,Math.min(100,v/max*100))+'%;background:'+col+'"></b><span>'+label+'</span></div>'; };
    L.forEach(function(m,i){ var pct=m.hp/m.maxHp; if(i>0){ html+=bar(m.def.name,m.hp,m.maxHp,'#e05050'); return; }
      (m.bars||[]).forEach(function(b){ if(b.hp<=0)return; var act=pct<=b.at; html+=bar(b.ic+' '+b.n+(act?' — '+b.hint:' (at '+Math.round(b.at*100)+'% HP)'),b.hp,b.max,b.col,!act); });
      html+=bar('❤ Health',m.hp,m.maxHp,'#ff4a4a'); });
    if(el._last!==html){ el.innerHTML=html; el._last=html; } },
  // Called when a boss-flagged monster dies. Returns true when the fight goes on
  // (allies still up, or the next phase starts); false = the guardian is finally beaten.
  onDefeated:function(scene,mon){ var key=scene._bossKey||mon.bossKey||(mon.def&&mon.def._bossKey)||scene._getBossKey(), n=BossPhases.count(key), ph=scene._bossPhase||1;
    if(n<=1)return false;
    var alive=(scene._bossGroup||[]).filter(function(m){ return !m.dead&&m!==mon; });
    if(alive.length){ showNotif('💥 '+mon.def.name+' falls — '+alive.length+' still fighting!','#ffd080'); return true; }
    if(ph>=n){ BossPhases.hud(scene,false); return false; }
    // next phase: flash, then rebuild the fight in the next arena
    var P=BOSS_PHASES[key].phases[ph]; showNotif('⚡ '+P.intro,'#ffb060'); if(typeof Tome!=='undefined')Tome.see('place','arena_'+P.arena);
    scene.cameras.main.flash(500,255,220,180); scene.cameras.main.shake(700,0.012); scene._phaseLock=true;
    var data=Object.assign({},scene._initData,{bossPhase:ph+1,floorStates:{},arriveAt:null});
    scene.time.delayedCall(1700,function(){ scene.scene.restart(data); });
    return true; },
  // arena events (hazards on a timer)
  tick:function(scene,dt){ if(!scene._bpEv||!scene._bossGroup||scene._phaseLock)return; var A=MX.A(scene), P=A.p(), boss=scene._bossGroup[0]; if(!boss||boss.dead)return;
    BossPhases.hudTick(scene);
    scene._bpEv.forEach(function(e){ e.t-=dt; if(e.t>0)return; e.t=e.every*(0.85+Math.random()*0.3); if(e.say&&!e._said){ e._said=true; showNotif('⚠ '+e.say,'#ffcc88'); }
      var dmg=boss.def.atk*0.8, hitAt=function(x,y,r,col,zone,delay){ MX.tele.circle(A,x,y,r,col,delay); scene.time.delayedCall(delay*1000,function(){ if(boss.dead)return; MX.fxRing(A,x,y,r,col); var Q=A.p(); if(Math.hypot(Q.x-x,Q.y-y)<r+6)A.hurt(dmg,'','#ffb060'); if(zone)MX.zone(A,{x:x,y:y,r:r,t:3,st:zone}); }); };
      if(e.k==='marks'||e.k==='lob'){ for(var i=0;i<(e.n||3);i++){ var x=P.x+(i?(Math.random()-0.5)*220:0), y=P.y+(i?(Math.random()-0.5)*160:0); hitAt(x,y,e.rad||24,e.col||'#ffa060',e.zone||(e.k==='lob'?e.st:null),1.1+i*0.12); } }
      else if(e.k==='geyser'){ for(var j=0;j<(e.n||2);j++){ var gx=P.x+(Math.random()-0.5)*260, gy=P.y+(Math.random()-0.5)*200; if(!scene._canGoD(gx,gy))continue; (function(gx,gy){ MX.tele.circle(A,gx,gy,e.rad||32,e.col||'#ff6a20',1.2); scene.time.delayedCall(1200,function(){ if(boss.dead)return; MX.zone(A,{x:gx,y:gy,r:e.rad||32,t:4,st:e.st||'burn',dps:boss.def.atk*0.15}); var Q=A.p(); if(Math.hypot(Q.x-gx,Q.y-gy)<(e.rad||32))A.hurt(dmg*0.8,'','#ff9050'); }); })(gx,gy); } }
      else if(e.k==='wind'){ var cx=DW*TILE/2, cy=DH*TILE/2, a=Math.atan2(P.y-cy,P.x-cx); for(var w=0;w<12;w++)MX.fxDot(A,P.x-Math.cos(a)*w*10,P.y-Math.sin(a)*w*10,'#e8f0ff',0.8); MX.push(A,Math.cos(a),Math.sin(a),e.dist||80); }
      else if(e.k==='rift'){ var rx=P.x+(Math.random()-0.5)*200, ry=P.y+(Math.random()-0.5)*160; MX.tele.circle(A,rx,ry,40,'#c040ff',0.9); scene.time.delayedCall(900,function(){ if(boss.dead)return; MX.fxRing(A,rx,ry,60,'#c040ff'); var Q=A.p(), l=Math.hypot(rx-Q.x,ry-Q.y)||1; if(l<220)MX.push(A,(rx-Q.x)/l,(ry-Q.y)/l,Math.min(90,l-10)); MX.zone(A,{x:rx,y:ry,r:34,t:3,st:'slow',v:0.4}); }); }
      else if(e.k==='wave'){ var yy=P.y+(Math.random()<0.5?-1:1)*40, x0=2*TILE, x1=(DW-2)*TILE; MX.tele.line(A,x0,yy,0,x1-x0,e.col||'#ff6a20',1.2); var gg=scene.add.rectangle((x0+x1)/2,yy,x1-x0,26,MX.col(e.col||'#ff6a20'),0.18).setDepth(A.depth(yy)); scene.time.delayedCall(1200,function(){ gg.destroy(); if(boss.dead)return; for(var s=0;s<10;s++)MX.fxDot(A,x0+(x1-x0)*s/10,yy,e.col||'#ff6a20',0.9); var Q=A.p(); if(Math.abs(Q.y-yy)<22)A.hurt(dmg*1.1,'lava wave','#ff7030'); }); }
    }); }
};
// extra kinds of health: route damage by source (sword / arrow / spell)
MX._barHit=function(mon,d,kind,say){ var pct=mon._hp/mon.maxHp, B=null; for(var i=0;i<mon.bars.length;i++){ var b=mon.bars[i]; if(b.hp>0&&pct<=b.at){ B=b; break; } } if(!B)return d;
  var ok=B.only.indexOf(kind)>=0, dd=ok?d:d*0.15; B.hp=Math.max(0,B.hp-dd); if(!ok)say(B.hint+' (resisted)','#ffe080'); else say(B.ic+' -'+Math.round(dd),B.col);
  if(B.hp<=0){ say(B.n+' broken!','#ffffff'); MX.ev(mon,'bar_break'); if(mon._scene&&mon._scene.cameras)mon._scene.cameras.main.flash(160,255,255,255); }
  return 0; };
