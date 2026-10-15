// ═══════════════════════════════════════════════════════════════════════
// ║ 22f-forge-stages.js — round 53 (docs/29-forge-gating.md; Kris picked every recommendation on his card).
// ║ Kris: "the blacksmith should only be able to forge weapons when certain stages of the game are unlocked, so you can't get overpowered
// ║ weapons and armor too early."
// ║  · ZForge.lock(ps,id): the smith learns a new heat with every realm that opens (each freed master builder):
// ║      T1 of every lane from the start · T2 and the element crossbows and bows with the Wetlands · T3, the arbalests and warbows with the
// ║      Highlands · T4 and the two-element master-works with the Ashlands · the Elemental Sovereign once the Forges of Muspelheim rise.
// ║    A locked node shows a padlock and what opens it, in the blacksmith's tree and in the Tome's. What you already own stays yours.
// ║  · Ring and amulet element power is capped at +40 % per element (ZEL.POW_CAP) — ten gemmed rings no longer stack to +80 %.
// ║  · Sovereign, the seventh element: the Sovereign pieces and the Elemental Sovereign strike with no element of the six (×1 against every
// ║    ordinary monster) — but whatever is warded by Muspelheim (mon.sovWard: the forge-masters, Surtharn and Asgard, rounds 54–58) takes
// ║    ×2 from Sovereign and ×0.35 from everything else.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZForge==='undefined'||typeof ZEL==='undefined')return;
  var REALM=['','Grasslands','Wetlands','Highlands','Ashlands'];
  // the stage each forged piece needs: 2–4 = that many realms open; 'forges' = the Forges of Muspelheim risen
  var STAGE={}; ZForge.LANES.forEach(function(L){ L.nodes.forEach(function(id,i){ if(i>=2)STAGE[id]=Math.min(4,i); }); });      // T1 (i=1) is open from the start
  ZForge.XBOW.t1.concat(ZForge.BOW.t1).forEach(function(id){ STAGE[id]=2; }); ZForge.XBOW.t2.concat(ZForge.BOW.t2).forEach(function(id){ STAGE[id]=3; });
  ZForge.DUAL.forEach(function(id){ STAGE[id]=4; }); STAGE[ZForge.TOP]='forges';
  ZForge.STAGE=STAGE;
  ZForge.realms=function(ps){ var U=(ps&&ps.unlockedSections)||[1]; return Math.max.apply(null,[1].concat(U)); };
  ZForge.lock=function(ps,id){ var s=STAGE[id]; if(!s||!ps)return null;
    if(s==='forges'){ var ok=typeof _finalQuestUnlocked==='function'&&_finalQuestUnlocked(ps); return ok?null:{short:'when the forges rise',why:'The smith can only work the Sovereign heat once the Forges of Muspelheim have risen (all four boss dungeons and all four master builders\' towers).'}; }
    if(ZForge.realms(ps)>=s)return null; return {short:'when the '+REALM[s]+' open',why:'The smith learns this heat when the '+REALM[s]+' are free — beat the '+REALM[s-1]+'\' boss tower and its master builder teaches it.'}; };
  // the tree: a padlock on locked tiles
  var node0=ZForge.node; ZForge.node=function(ps,id){ var h=node0.apply(ZForge,arguments), L=ZForge.lock(ps,id); if(!L||ZForge.owns(ps,id))return h;
    return h.replace('class="zf-node','class="zf-node zf-lock').replace(/<s>(⚒ ready|forged before)<\/s>/,'').replace(/<\/button>$/,'<s class="zf-lk">🔒 '+L.short+'</s></button>'); };
  var can0=ZForge.can; ZForge.can=function(ps,id){ if(ZForge.lock(ps,id))return false; return can0.apply(ZForge,arguments); };
  var det0=ZForge.detail; ZForge.detail=function(ps,id,canForge){ var h=det0.apply(ZForge,arguments), L=id&&ZForge.lock(ps,id); if(!L||ZForge.owns(ps,id))return h;
    return h.replace(/<button class="forge-btn[^>]*>⚒️ Forge<\/button>/,'<button class="forge-btn disabled-btn" disabled>🔒 Locked</button>')+'<div class="zf-d zf-lockwhy">🔒 '+L.why+'</div>'; };
  // forging itself (the tree's button and the old recipe list)
  var cr0=window._craftItem; if(cr0)window._craftItem=function(id){ var ps=ZForge.ps(), L=ZForge.lock(ps,id); if(L){ if(typeof showNotif==='function')showNotif('🔒 '+L.why,'#ffb070'); return; } return cr0.apply(this,arguments); };
  if(typeof document!=='undefined'){ var st=document.createElement('style'); st.textContent='.zf-node.zf-lock{opacity:.55;filter:grayscale(.6)} .zf-node .zf-lk{color:#ffb070} .zf-lockwhy{color:#ffc890;margin-top:6px}'; document.head.appendChild(st); }
})();

// ── ring and amulet element power: at most +40 % per element ──
(function(){ if(typeof ZHit==='undefined'||typeof ZEL==='undefined')return; ZEL.POW_CAP=0.4;
  var s0=ZHit.sums; ZHit.sums=function(ps){ var S=s0.apply(ZHit,arguments); for(var k in S.pow)if(S.pow[k]>ZEL.POW_CAP)S.pow[k]=ZEL.POW_CAP; return S; };
})();

// ── Sovereign, the seventh element ──
(function(){ if(typeof ZHit==='undefined'||typeof ZEL==='undefined'||typeof ITEMS==='undefined')return;
  ZEL.SOV={n:'Sovereign',col:'#f4ecd0',em:'✦',m:2.0,ward:0.35};
  ZEL.isSov=function(it){ return !!(it&&(it.sov||it===ITEMS.elemental_sovereign)); };
  var item0=ZEL.item; ZEL.item=function(it){ return ZEL.isSov(it)?'sovereign':item0.apply(ZEL,arguments); };
  var name0=ZEL.name; ZEL.name=function(els){ return els==='sovereign'?'Sovereign':name0.apply(ZEL,arguments); };
  if(typeof ZElUI!=='undefined'){ var ch0=ZElUI.chips; ZElUI.chips=function(els){ return els==='sovereign'?'<span class="zel zel-all" style="--zc:#f4ecd0">✦<b>Sovereign</b></span>':ch0.apply(ZElUI,arguments); };
    var ic0=ZElUI.itemChips; ZElUI.itemChips=function(it){ var L=ic0.apply(ZElUI,arguments); if(ZEL.isSov(it))L=L.map(function(c){ return c[0]==='all elements'?['Sovereign · bane of Muspelheim\'s wards','e']:c; }); return L; }; }
  ZEL.warded=function(mon){ return !!(mon&&(mon.sovWard||(mon.def&&mon.def.sovWard))); };
  // what the hero strikes with: a Sovereign weapon carries no element of the six
  var h0=ZHit.hero; ZHit.hero=function(kind,o){ var H=h0.apply(ZHit,arguments), ps=ZHit._ps(); if(!ps)return H;
    var w=kind==='melee'?ZHit._eq(ps,'lHand'):kind==='ranged'?ZHit._eq(ps,'rHand'):null; if(w&&ZEL.isSov(w)){ H.els=[]; H.sov=true; } return H; };
  // the hit: against a Muspelheim ward, Sovereign ×2 and everything else ×0.35; otherwise the usual rules (Sovereign neutral)
  var d0=ZHit.dmg; ZHit.dmg=function(scene,mon,raw,kind,o){ if(!mon||!ZEL.warded(mon))return d0.apply(ZHit,arguments); o=o||{};
    var H=ZHit.hero(kind==='skill'?'melee':kind,o), sov=!!H.sov&&(kind==='melee'||kind==='ranged'||kind==='skill'), def=o.pure?0:ZHit.defOf(mon), d=ZHit.pct(raw+H.add,def)*(sov?ZEL.SOV.m:ZEL.SOV.ward);
    d=Math.max(1,Math.round(d)); ZHit.last={t:sov?2:-2,el:sov?'sovereign':null,kind:kind,els:H.els,sov:sov};
    try{ var now=Date.now(); if(scene&&!(mon._zmT&&now-mon._zmT<450)){ mon._zmT=now; var r=(mon.def&&mon.def.r)||10; if(typeof _heroFloat==='function')_heroFloat(scene,mon.x+14,mon.y-r-24,sov?'✦ Sovereign':'▽▽ Warded',sov?'#fff2b0':'#9aa4b4'); } }catch(e){}
    var ps=ZHit._ps(); if(ps&&!sov){ ps.seenEl=ps.seenEl||{}; if(!ps.seenEl.ward){ ps.seenEl.ward=1; try{ showNotif('▽▽ Warded by Muspelheim — only a Sovereign weapon bites deep here (Tome: Elements)','#b8c4d8'); }catch(e){} } }
    return d; };
  // the pieces say what Sovereign means
  ['elemental_sovereign'].concat(Object.keys(ITEMS).filter(function(k){ return ITEMS[k]&&ITEMS[k].sov; })).forEach(function(k){ var I=ITEMS[k]; if(!I||!I.desc)return;
    I.desc=I.desc.replace(/every element at once/g,'the Sovereign element').replace(/\+(\d+) all elements/,'+$1 Sovereign');
    if(I.slot==='lHand'||I.slot==='rHand')I.desc+=' Sovereign strikes with none of the six elements — but it is the bane of everything Muspelheim has warded: the forge-masters, Surtharn, and Asgard.'; });
})();

// ── round 57: the Sovereign staff at the forge too ──
// Kris (Lab note on the Lodestar): "remind me of where you make the crafted staffs, as i wasn't finding this at the black smith" → card: "Both ways" —
// still won by beating all sixteen mage towers (09i ZSov), and now forgeable once the forges rise, at a high cost, so the Lodestar is never out of reach.
(function(){ if(typeof ZForge==='undefined'||typeof CRAFT_RECIPES==='undefined'||!ITEMS.sov_staff)return;
  if(!ZForge.recipe('sov_staff'))CRAFT_RECIPES.push({result:'sov_staff',needs:{arcane_staff:1,gem_ruby:2,gem_sapphire:2,gem_emerald:2,skystone:1},gold:6000,label:'Sovereign Staff',tier:5,chain:'ultimate'});
  if(ZForge.STAGE)ZForge.STAGE.sov_staff='forges';
  var h0=ZForge.html; if(h0)ZForge.html=function(ps){ var h=h0.apply(ZForge,arguments), lane='<div class="zf-lane"><div class="zf-lh">'+(typeof ZElUI!=='undefined'?ZElUI.chips('all'):'')+'<span>The Sovereign staff</span><em>an Arcane Staff, two each of ruby, sapphire and emerald, and a Skystone — or win all sixteen mage towers</em></div><div class="zf-row">'+ZForge.node(ps,'arcane_staff')+ZForge.arrow+ZForge.node(ps,'sov_staff')+'</div></div>';
    var i=h.lastIndexOf('</div>'); return i>=0?h.slice(0,i)+lane+h.slice(i):h+lane; };
})();
