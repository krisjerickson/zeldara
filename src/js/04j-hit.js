// ═══════════════════════════════════════════════════════════════════════
// ║ 04j-hit.js — ZHit: the ONE place the hero's damage on a monster is worked out (round 37).
// ║ Before this the sum was written out in five places (sword in the world, sword in dungeons, arrows twice,
// ║ spells and familiars) and each one subtracted the monster's defence. Now every one of them calls ZHit.dmg:
// ║   1. defence is a SHARE, the same shape as the hero's armor:  raw × 100 / (100 + MK × defence)
// ║   2. the element step (ZEL.tier): ▲▲ Bane · ▲ Weak · ▽ Resists · ▽▽ Warded — bosses get the gentle steps
// ║   3. a ring or amulet of that element adds its share
// ║   4. the element's own effect may land (burn, slow, root, stagger, arc, drain)
// ║ Familiars (Kris: "make sure familiars don't get much stronger"): a familiar's hit is never higher than the
// ║ old subtract rule would have made it, a weakness gives it only ×1.2, and a resistance costs it in full.
// ║ The other way round — a monster hitting the hero — ZHit.taken cuts the hit by the hero's resistance to the
// ║ monster's element (armor pieces, set gems, draughts; never more than half).
// ═══════════════════════════════════════════════════════════════════════
var ZHit={
  MK:1.5,                    // how much a point of monster defence counts (the hero's armor uses 1–2 by difficulty)
  last:null,                 // {t, el, kind} of the most recent hit (tests, UI)
  _ps:function(){ try{ var ws=(typeof _heroWS==='function')?_heroWS():null; return ws&&ws.playerState; }catch(e){ return null; } },
  _eq:function(ps,slot){ var id=ps&&ps.equip&&ps.equip[slot]; return id?ITEMS[id]:null; },
  SLOTS:['lHand','rHand','mWeapon','body','shield','head','feet','pants','gauntlets','neck','back','ring1','ring2','ring3','ring4','ring5','ring6','ring7','ring8','ring9','ring10'],
  pct:function(raw,def){ return raw*100/(100+ZHit.MK*Math.max(0,def||0)); },
  defOf:function(mon){ return (mon.monDef!==undefined?mon.monDef:(mon.def&&mon.def.def))||0; },
  // what the hero strikes with: {els, add} — add is the weapon's element number, joined to every hit that carries it
  hero:function(kind,o){ var ps=ZHit._ps(), els=[], add=0; o=o||{}; if(!ps)return {els:els,add:0};
    if(kind==='melee'){ var w=ZHit._eq(ps,'lHand'), g=ZHit._eq(ps,'gauntlets'); if(w&&w.el){ els=w.el==='all'?'all':w.el.slice(); add=w.elementDmg||0; }
      if(g&&g.el){ if(els!=='all'&&!els.length){ els=g.el.slice(); add+=g.elementDmg||0; } else if(els==='all'||els.indexOf(g.el[0])>=0)add+=g.elementDmg||0; } }      // element gauntlets lend their element to a plain blade
    else if(kind==='ranged'){ var b=ZHit._eq(ps,'rHand'); if(b&&b.el){ els=b.el==='all'?'all':b.el.slice(); add=b.elementDmg||0; } var ae=ZEL.AMMO[o.sub]; if(ae&&els!=='all'&&els.indexOf(ae)<0&&els.length<2)els.push(ae); }
    else if(kind==='spell'){ var e=o.spell?ZEL.SPELL[o.spell]:null; if(e)els=[e]; }
    return {els:els,add:add}; },
  // shares from the gear: resistances, element power, spell power
  sums:function(ps){ ps=ps||ZHit._ps(); var res={}, pow={}, sp=0; if(!ps)return {res:res,pow:pow,spell:0};
    ZHit.SLOTS.forEach(function(s){ var it=ZHit._eq(ps,s); if(!it)return; var k;
      if(it.res)for(k in it.res)res[k]=(res[k]||0)+it.res[k]; if(it.elPow)for(k in it.elPow)pow[k]=(pow[k]||0)+it.elPow[k]; if(it.spellPow)sp+=it.spellPow; });
    ZEL.LIST.forEach(function(e){ if(typeof _heroBuffActive==='function'&&_heroBuffActive(ps,'res_'+e))res[e]=(res[e]||0)+0.30; if(res[e]>ZEL.RES_CAP)res[e]=ZEL.RES_CAP; });
    sp+=Math.max(0,(ps.level||1)-1)*0.03;
    return {res:res,pow:pow,spell:sp}; },
  // a spell's power: tome × staff × (level and mage gear) × (the staff's own element)
  spellPow:function(ps,tome,spellMult){ var S=ZHit.sums(ps), m=(spellMult||1)*(1+S.spell), st=ZHit._eq(ps,'mWeapon'), e=tome&&ZEL.SPELL[tome.spellId];
    if(st&&st.el&&e&&(st.el==='all'||st.el.indexOf(e)>=0))m*=1+ZEL.STAFF_POW;
    return Math.round(Math.max(5,(tome&&tome.atk)||12)*m); },
  // ── the hit ──  kind: 'melee' | 'ranged' | 'spell' | 'familiar' | 'skill'.  o: {el, sub, spell, pure, noProc, rnd}
  dmg:function(scene,mon,raw,kind,o){ o=o||{}; if(!mon)return 0; var H=o.el!==undefined?{els:o.el==='all'?'all':ZEL.els(o.el),add:0}:ZHit.hero(kind==='skill'?'melee':kind,o);
    var def=o.pure?0:ZHit.defOf(mon), d=ZHit.pct(raw+H.add,def);
    if(kind==='familiar'){ d=Math.min(d,Math.max(1,raw-def+1)); }
    var mel=ZEL.mon(mon), boss=ZEL.monBoss(mon), t=ZEL.tier(H.els,mel,boss), be=ZEL.bestEl(H.els,mel);
    if(kind==='familiar'&&t<0&&mon.kit&&mon.kit.def&&mon.kit.def.some(function(D){ return D.name==='resist'&&(D.p.el||'fire')===be; }))t=0;   // its kit already cuts this familiar (07rb) — not twice
    d*=ZEL.mult(t,kind,boss);
    if(be&&kind!=='familiar'){ var S=ZHit.sums(); if(S.pow[be])d*=1+S.pow[be]; }
    d=Math.max(1,Math.round(d)); ZHit.last={t:t,el:be,kind:kind,els:H.els};
    if(t)ZHit.mark(scene,mon,t,be);
    if(kind==='ranged'&&ZEL.AMMO[o.sub]){ if(t>-2)ZHit.proc(scene,mon,ZEL.AMMO[o.sub],d,2); }      // an element arrow always does its work (burn, slow, root, arc) — in every scene
    else if(!o.noProc&&be&&kind!=='familiar'&&kind!=='spell'&&t>-2)ZHit.proc(scene,mon,be,d,t);
    return d; },
  // the step mark beside the damage number; the first of each kind is explained once
  mark:function(scene,mon,t,el){ var T=ZEL.TIER[String(t)]; if(!T||!scene)return; var now=Date.now(); if(mon._zmT&&now-mon._zmT<450)return; mon._zmT=now;
    var col=t>0?((ZEL.E[el]||{}).col||'#ffe080'):'#9aa4b4', r=(mon.def&&mon.def.r)||10;
    try{ if(typeof _heroFloat==='function')_heroFloat(scene,mon.x+14,mon.y-r-24,T.mark+(t===2||t===-2?' '+T.n:''),col); }catch(e){}
    var ps=ZHit._ps(); if(ps){ ps.seenEl=ps.seenEl||{}; var k=t>0?'weak':'res'; if(!ps.seenEl[k]){ ps.seenEl[k]=1;
      try{ if(typeof showNotif==='function')showNotif(t>0?'▲ Weak! '+ZEL.E[el].n+' is strong against this foe — see Elements in the Tome':'▽ Resists. This foe shrugs off '+(ZEL.E[el]?ZEL.E[el].n.toLowerCase():'that')+' — try another element (Tome: Elements)',t>0?'#ffe080':'#b8c4d8'); }catch(e){} } } },
  // each element's own effect on a sword or arrow hit: one in four, always on a Bane
  proc:function(scene,mon,el,d,t){ if(mon.dead)return; if(!(t>=2||Math.random()<ZEL.PROC))return; var boss=!!(mon.isBoss||(mon.def&&mon.def.boss));
    try{
      if(el==='fire'&&typeof _heroBurn==='function')_heroBurn(mon,3,Math.max(1,Math.round(d*0.12)));
      else if(el==='water'&&typeof _heroSlow==='function')_heroSlow(scene,mon,2,0.5);
      else if(el==='grass'&&typeof _heroHold==='function'&&!boss)_heroHold(scene,mon,0.7);
      else if(el==='earth'&&typeof _heroHold==='function'&&!boss)_heroHold(scene,mon,0.45);
      else if(el==='storm'&&typeof _heroChain==='function'){ var L=scene.worldMonsters||scene.monsters||[]; _heroChain(scene,mon,1,Math.max(1,Math.round(d*0.4)),L); }
      else if(el==='shadow'){ var ps=ZHit._ps(); if(ps&&ps.hp>0&&ps.hp<ps.maxHp){ var h=Math.max(1,Math.round(d*0.06)); ps.hp=Math.min(ps.maxHp,ps.hp+h); } }
    }catch(e){} },
  // an axe staggers what it hits (not bosses); called by the two sword sites
  axe:function(scene,mon){ var ps=ZHit._ps(), w=ZHit._eq(ps,'lHand'); if(!w||w.cls!=='axe'||mon.dead||mon.isBoss||(mon.def&&mon.def.boss))return; try{ if(typeof _heroHold==='function')_heroHold(scene,mon,0.3); }catch(e){} },
  swing:function(){ var ps=ZHit._ps(), w=ZHit._eq(ps,'lHand'); return w&&w.cls==='axe'?{t:0.62,reach:14}:{t:0.45,reach:0}; },
  // ── a monster's hit on the hero: cut by the resistance to the monster's element (its better one) ──
  taken:function(dmg,mon,ps){ if(!mon||!(dmg>0))return dmg; var E=ZEL.mon(mon); if(!E.length)return dmg; var S=ZHit.sums(ps), r=1; E.forEach(function(e){ r=Math.min(r,S.res[e]||0); }); if(r>=1)r=0;
    return r>0?Math.max(1,Math.round(dmg*(1-r))):dmg; },
  // what a tonic, an antidote or a draught does besides healing; returns the words for the notice ('' = nothing extra)
  useFx:function(ps,item){ var L=[]; if(!ps||!item)return '';
    if(item.buff&&typeof _heroBuffApply==='function'){ _heroBuffApply(ps,item.buff,120000); L.push({atkUp:'+25% ATK',defUp:'+25% DEF',spdUp:'+25% Speed'}[item.buff]+' for 2 min'); }
    if(item.ward&&typeof _heroBuffApply==='function'){ _heroBuffApply(ps,'res_'+item.ward,120000); L.push('+30% '+ZEL.E[item.ward].n.toLowerCase()+' resistance for 2 min'); }
    if(item.cure){ try{ game.scene.getScenes(true).forEach(function(sc){ var S=sc._mxs; if(S){ S.poisonT=0; S.slowT=0; S.rootT=0; } if(sc._burnTime){ sc._burnTime=0; if(sc._showFireOverlay)sc._showFireOverlay(false); } }); }catch(e){} L.push('poison, burning and slow ended'); }
    return L.join(' · '); },
  // how long a status lasts on the hero
  stDur:function(st,dur,ps){ var e=ZEL.ST_EL[st]; if(!e)return dur; var S=ZHit.sums(ps); return dur*(1-(S.res[e]||0)); }
};
