// ═══════════════════════════════════════════════════════════════════════
// ║ 04g-difficulty.js — the four difficulty levels (round 28, Kris).
// ║ Hearthside · Wayfarer · Shieldbearer · Ragnarök. Wayfarer is the game as it was balanced before (every factor 1).
// ║ What changes (Kris's choice): tougher bosses, faster and smarter bosses, tougher and more monsters.
// ║ NOT changed: healing, potions, the death penalty.
// ║ One table (ZDIFF); every number below can be tuned here. Stored per save as ps.difficulty (0–3; missing = 1).
// ║ Factors are applied when a monster is spawned (ZDiff.stats / ZDiff.f); ZDiff.set() rescales the living world monsters.
// ═══════════════════════════════════════════════════════════════════════
var ZDIFF=[
  {id:'hearthside',name:'Hearthside',icon:'🔥',tag:'A tale told by the fire',text:'Gentler foes, smaller packs and slower bosses with long warnings. For a first journey.',
   bossHp:0.75,bossDmg:0.8,tele:1.25,every:1.25,speed:0.9,waves:0,stand:0.15,stag:0.8, monHp:0.8,monDmg:0.8,count:0.8,guards:-1,alphaAt:9,kin:0,reward:1},
  {id:'wayfarer',name:'Wayfarer',icon:'🧭',tag:'The road as it was meant to be walked',text:'The balanced journey: the game as it has played until now.',
   bossHp:1,bossDmg:1,tele:1,every:1,speed:1,waves:0,stand:0.15,stag:1, monHp:1,monDmg:1,count:1,guards:0,alphaAt:5,kin:0,reward:1},
  {id:'shieldbearer',name:'Shieldbearer',icon:'🛡️',tag:'For proven warriors',text:'Bosses have half again the health, warn less and strike sooner. Monsters are tougher and come in bigger packs.',
   bossHp:1.5,bossDmg:1.25,tele:0.85,every:0.85,speed:1.1,waves:0,stand:0.2,stag:1.15, monHp:1.3,monDmg:1.2,count:1.25,guards:1,alphaAt:4,kin:1,reward:1.15},
  {id:'ragnarok',name:'Ragnarök',icon:'🌋',tag:'The twilight of the realms',text:'Bosses have more than twice the health, barely warn, add an extra wave to their attacks and make their last stand early. Monsters hit hard and swarm.',
   bossHp:2.2,bossDmg:1.5,tele:0.7,every:0.7,speed:1.2,waves:1,stand:0.3,stag:1.3, monHp:1.7,monDmg:1.45,count:1.5,guards:2,alphaAt:3,kin:2,reward:1.3}
];
var ZDiff={
  ps:function(){ try{ var ws=typeof _heroWS==='function'?_heroWS():null; return ws&&ws.playerState; }catch(e){ return null; } },
  lv:function(ps){ ps=ps||ZDiff.ps(); var d=ps&&ps.difficulty; return (d===0||d===1||d===2||d===3)?d:1; },
  cur:function(ps){ return ZDIFF[ZDiff.lv(ps)]; },
  // health and damage factors for a boss or a monster at the current level
  f:function(boss){ var D=ZDiff.cur(); return boss?{h:D.bossHp,a:D.bossDmg,r:D.reward,boss:true}:{h:D.monHp,a:D.monDmg,r:D.reward,boss:false}; },
  // scale a stats object ({hp, atk, xp, gMin, gMax}) in place; returns the factors used (kept on the monster as _dz)
  stats:function(s,boss){ var F=ZDiff.f(boss); if(F.h!==1&&s.hp!==undefined)s.hp=Math.max(1,Math.round(s.hp*F.h)); if(F.a!==1&&s.atk!==undefined)s.atk=Math.max(1,Math.round(s.atk*F.a));
    if(F.r!==1){ if(s.xp!==undefined)s.xp=Math.round(s.xp*F.r); if(s.gMin!==undefined)s.gMin=Math.round(s.gMin*F.r); if(s.gMax!==undefined)s.gMax=Math.round(s.gMax*F.r); } return F; },
  // how many: monsters on a dungeon floor, roamers in a region …
  n:function(x){ var c=ZDiff.cur().count; return c===1?x:Math.max(1,Math.round(x*c)); },
  // the boss attack ramp of a quadrant (07zz BOSS_RAMP) at the current level: shorter warnings, less time between attacks, faster moves, more waves, harder to stagger
  _rc:{}, ramp:function(q){ var R=BOSS_RAMP[q]||BOSS_RAMP[1], L=ZDiff.lv(); if(L===1)return R; var k=L+'_'+q, C=ZDiff._rc[k]; if(C)return C; var D=ZDIFF[L];
    return (ZDiff._rc[k]=Object.assign({},R,{tele:R.tele*D.tele,every:R.every*D.every,speed:R.speed*D.speed,waves:R.waves+D.waves,stag:Math.max(3,Math.round(R.stag*D.stag)),punish:R.punish*D.tele})); },
  // change the level in the middle of a game: only in the open world; living world monsters are rescaled at once
  set:function(lv){ var ws=typeof _heroWS==='function'?_heroWS():null, ps=ws&&ws.playerState; if(!ps||!ZDIFF[lv])return false; var old=ZDiff.lv(ps); if(old===lv)return true;
    var busy=['Dungeon','Building','VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape','VolcanoBossRush','Sky'].some(function(k){ try{ return game.scene.isActive(k); }catch(e){ return false; } });
    if(busy||(typeof TrialRealm!=='undefined'&&TrialRealm.active&&TrialRealm.active())){ if(typeof showNotif==='function')showNotif('Change the difficulty out in the open world, not inside a site.','#ffcc88'); return false; }
    ps.difficulty=lv; var n=0;
    ['World','Island'].forEach(function(k){ var sc=null; try{ sc=game.scene.getScene(k); }catch(e){} (sc&&sc.worldMonsters||[]).forEach(function(m){ var Z=m._dz; if(!Z)return; var F=ZDiff.f(Z.boss), rh=F.h/Z.h, ra=F.a/Z.a; n++;
        m.maxHp=Math.max(1,Math.round(m.maxHp*rh)); if(m.mx)m._hp=Math.max(m._hp>0?1:0,Math.round(m._hp*rh)); else m.hp=Math.max(m.hp>0?1:0,Math.round(m.hp*rh));
        if(m.monAtk!==undefined)m.monAtk=Math.max(1,Math.round(m.monAtk*ra)); if(m.def&&Z.own){ m.def.atk=Math.max(1,Math.round(m.def.atk*ra)); if(m.def.hp!==undefined)m.def.hp=Math.round(m.def.hp*rh); }
        m._dz={h:F.h,a:F.a,boss:Z.boss,own:Z.own}; }); });
    try{ if(ws._save)ws._save(); }catch(e){}
    if(typeof showNotif==='function')showNotif(ZDIFF[lv].icon+' Difficulty: '+ZDIFF[lv].name+' — '+ZDIFF[lv].tag+'. Pack sizes change the next time the game loads.','#ffe9a8');
    ZDiff.render(); return true; },
  // the four buttons (new game screen and the ❓ panel)
  html:function(sel){ return '<div class="zdiff-row">'+ZDIFF.map(function(D,i){ return '<button type="button" class="zdiff-b'+(i===sel?' on':'')+'" data-d="'+i+'"><span>'+D.icon+'</span><b>'+D.name+'</b><small>'+D.tag+'</small></button>'; }).join('')+'</div><div class="zdiff-t">'+ZDIFF[sel].text+'</div>'; },
  render:function(){ var el=document.getElementById('zdiff-box'); if(!el)return; var ps=ZDiff.ps(); if(!ps){ el.innerHTML=''; return; }
    el.innerHTML='<div class="zdiff-h">Difficulty</div>'+ZDiff.html(ZDiff.lv(ps)); el.querySelectorAll('.zdiff-b').forEach(function(b){ b.onclick=function(){ ZDiff.set(+b.dataset.d); }; }); }
};
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style');
  st.textContent='.zdiff-row{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0}.zdiff-b{display:flex;flex-direction:column;align-items:center;gap:2px;padding:7px 4px;border-radius:8px;border:1px solid #3a4a5a;background:#18222c;color:#cfe0ee;cursor:pointer;font-family:inherit}'+
    '.zdiff-b span{font-size:18px;line-height:1}.zdiff-b b{font-size:12px}.zdiff-b small{font-size:9px;color:#8aa0b4;line-height:1.2;text-align:center}.zdiff-b:hover{border-color:#6ab}.zdiff-b.on{border-color:#3fe6f2;background:#12343c;box-shadow:0 0 0 1px #3fe6f2 inset}.zdiff-b.on b{color:#bff8ff}'+
    '.zdiff-t{font-size:11px;color:#9ab;min-height:28px;margin-bottom:8px;text-align:center}.zdiff-h{font-size:12px;font-weight:600;color:#88aacc;margin-bottom:2px}@media(max-width:520px){.zdiff-row{grid-template-columns:repeat(2,1fr)}}';
  (document.head||document.documentElement).appendChild(st); })();
