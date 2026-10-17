// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 60 — "Potions" tab. Kris: "all the potions need to be rebalanced. some are not the right price, and we need to expand them and allow for
// ║ additional effects, like elemental effects, slow added to spells and other interesting things. come up with suggestions for me to select from
// ║ and then we'll need to make new painted images". Every card is a proposal: ☆ the ones to build (notes welcome — change a number, a name);
// ║ the picked ones are then painted (icons) and stocked at the apothecary.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined')return; if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('potions'); LBR.TABS.push('potions');
  var SEC=[
    {k:'audit',t:'⚖ What is wrong today',s:'for reference — no pick needed',L:[
      ['pa_dupes','Six potions do the same job','Health Potion, Minor Potion and the four Area Potions all just heal a small amount, at muddled prices: the Area 1 Potion costs 12 g for 10 HP, the Minor Potion 12 g for 12 HP, the Health Potion 25 g for 25 HP.','—'],
      ['pa_cheap','The big ones are too cheap, too early','The Mega Potion (80 HP for 100 g) and the Life Flask (45 HP) are sold from the Wetlands, when your health is about 60–70 — one sip refills you completely.','—'],
      ['pa_late','Nothing scales into the endgame','By the Ashlands you have ~200 HP; the best you can buy heals 130. There is no mana potion at all, and nothing changes how you fight.','—']]},
    {k:'heal',t:'❤ Healing, rebalanced (one line per realm)',s:'pick the set you like · the old potions would be retired (any in your pack still work)',L:[
      ['pr_heal_tiers','Four tiers by realm','Minor Healing (Grasslands) 20 HP · 15 g — Healing (Wetlands) 45 HP · 35 g — Greater Healing (Highlands) 90 HP · 75 g — Superior Healing (Ashlands) 150 HP · 130 g.','15–130 g'],
      ['pr_heal_pct','Percent instead','Healing Draught heals 35 % of your max health · 30 g; Greater Draught 60 % · 90 g (Highlands on). Always worth the same, at any level.','30 / 90 g'],
      ['pr_elixir','Elixir and Grand Elixir','Elixir: half your health and cures poison, burning and slow · 140 g (Highlands). Grand Elixir: full health, then 4 HP a second for 10 s · 380 g (Ashlands).','140 / 380 g'],
      ['pr_regen','Troll-blood Tonic','Heals slowly: 5 % of max health a second for 12 s (60 % in all) — cheap but you must survive while it works · 45 g (Wetlands).','45 g']]},
    {k:'mana',t:'💧 Mana (there is none today)',s:'pick any',L:[
      ['pm_mana','Mana Draught / Greater Mana Draught','Restores 40 mana · 25 g; the greater one restores all of it · 90 g (Highlands).','25 / 90 g'],
      ['pm_surge','Arcane Surge','For 10 s your spells cost no mana · 120 g (Highlands).','120 g'],
      ['pm_tea','Runic Tea','Spell cooldowns 30 % shorter for 2 minutes · 70 g (Wetlands).','70 g']]},
    {k:'oil',t:'🧪 Spell oils — add an effect to your spells for 2 minutes',s:'pick any · one oil at a time; drinking another replaces it',L:[
      ['po_frost','Frostbite Oil','Every spell also SLOWS what it hits (−40 % speed, 2 s) · 55 g (Wetlands).','55 g'],
      ['po_ember','Cinder Oil','Every spell also BURNS (a little fire damage for 3 s) · 55 g (Grasslands).','55 g'],
      ['po_venom','Nightshade Oil','Every spell also POISONS (damage over 4 s, stacks to 3) · 60 g (Wetlands).','60 g'],
      ['po_storm','Thunderhead Oil','Every spell ARCS to one more enemy nearby for half damage · 80 g (Highlands).','80 g'],
      ['po_root','Bramble Oil','Every spell ROOTS small foes for 1 s (bosses: a short slow) · 65 g (Grasslands).','65 g'],
      ['po_shade','Gloam Oil','Every spell DRAINS: 10 % of its damage heals you · 90 g (Ashlands).','90 g']]},
    {k:'blade',t:'🗡 Weapon coatings — elemental melee and arrows for 2 minutes',s:'pick any · the element counts for weaknesses (the wheel)',L:[
      ['pw_elemental','A coating per element','Fire, Water, Grass, Earth, Storm and Shadow Coatings: your melee and arrows strike in that element (+15 % damage, and its weakness rules) · 45–70 g by realm.','45–70 g'],
      ['pw_silver','Silvered Edge','Your hits break armour: every 5th hit strips a monster\'s armour and front-guard for 4 s · 85 g (Highlands).','85 g']]},
    {k:'throw',t:'💣 Flasks to throw (a new button: hold the potion key)',s:'pick any',L:[
      ['pt_fire','Fire Flask','Shatters into a pool of fire (burns for 4 s) · 30 g.','30 g'],
      ['pt_frost','Frost Flask','Freezes everything in a circle for 1.5 s (bosses slowed instead) · 45 g.','45 g'],
      ['pt_smoke','Smoke Pellet','Blinds the monsters near you — they lose you for 3 s · 25 g.','25 g'],
      ['pt_thunder','Thunder Flask','A crack of lightning: stuns small foes 1 s, chains to three · 55 g (Highlands).','55 g']]},
    {k:'boon',t:'✨ Boons — longer-lasting tonics',s:'pick any',L:[
      ['pb_giant','Giant\'s Draught','+25 % max health for 3 minutes · 90 g (Highlands).','90 g'],
      ['pb_feather','Featherfoot Tonic','Bog, deep snow and ash no longer slow you; +10 % speed, 3 minutes · 40 g.','40 g'],
      ['pb_owl','Owl-eye Drops','Dark dungeon floors are lit around you; hidden doors glint · 35 g.','35 g'],
      ['pb_fortune','Gilded Tonic','+30 % gold from monsters and chests for 5 minutes · 75 g.','75 g'],
      ['pb_scholar','Scholar\'s Tea','+30 % experience for 5 minutes · 75 g.','75 g'],
      ['pb_familiar','Familiar\'s Treat','Your familiar attacks 40 % faster and heals 30 % · 50 g.','50 g'],
      ['pb_phoenix','Phoenix Draught','If you fall in the next 10 minutes, you rise again at 40 % health (one at a time) · 450 g (Ashlands).','450 g']]},
    {k:'ward',t:'🛡 Element wards (already in the game)',s:'keep as they are, or change',L:[
      ['pd_wards_keep','Keep the six wards','+30 % resistance to one element for 2 minutes · 40–50 g.','40–50 g'],
      ['pd_wards_up','Stronger and longer','+45 % for 3 minutes, priced 60–80 g; a Prismatic Ward (+20 % to all six) · 180 g (Ashlands).','60–180 g']]}];
  var BY={}; SEC.forEach(function(S){ S.L.forEach(function(x){ BY[x[0]]={S:S,x:x}; }); });
  var wrap=function(c,txt,x,y,mw,lh){ var w=txt.split(' '), line=''; w.forEach(function(word){ var t=line?line+' '+word:word; if(c.measureText(t).width>mw&&line){ c.fillText(line,x,y); y+=lh; line=word; } else line=t; }); if(line)c.fillText(line,x,y); return y; };
  var COL={audit:'#c8b8a0',heal:'#ff7080',mana:'#70a8ff',oil:'#b8f070',blade:'#ffc060',throw:'#ff9050',boon:'#f0e080',ward:'#a0c8ff'};
  // round 62 (Kris: "not seeing the painted art potions in the design lab"): each card shows its painted icons (wave 63)
  var ICONS={pr_heal_tiers:['pot_heal1','pot_heal2','pot_heal3','pot_heal4'],pr_elixir:['pot_elixir','pot_grand'],pr_regen:['pot_troll'],pm_mana:['pot_mana','pot_mana2'],pm_surge:['pot_surge'],pm_tea:['pot_tea'],
    po_frost:['oil_frost'],po_ember:['oil_ember'],po_venom:['oil_venom'],po_storm:['oil_storm'],po_root:['oil_root'],po_shade:['oil_shade'],pw_elemental:['coat_fire','coat_water','coat_grass','coat_earth','coat_storm','coat_shadow'],pw_silver:['coat_silver'],
    pt_fire:['flask_fire'],pt_frost:['flask_frost'],pt_smoke:['flask_smoke'],pt_thunder:['flask_thunder'],pb_giant:['boon_giant'],pb_fortune:['boon_gold'],pb_scholar:['boon_xp'],pb_phoenix:['boon_phoenix'],
    pd_wards_up:['ward_fire','ward_water','ward_grass','ward_earth','ward_storm','ward_shadow','ward_prism'],pd_wards_keep:['ward_fire','ward_water','ward_grass']};
  var SM=(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}, IMG={}, tried={};
  var pg=function(p){ if(IMG[p]||tried[p])return IMG[p]; tried[p]=1; var im=new Image(); im.onload=function(){ IMG[p]=im; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/'+p+'.webp'; } }; im.src='assets/scenery/'+p+'.webp'; return null; };
  var icons=function(c,id,x,y,sz){ var L=(ICONS[id]||[]).map(function(k){ return SM.items['ic_'+k]; }).filter(Boolean), n=0; L.forEach(function(it,i){ var im=pg(it[0]); if(!im)return; var s=Math.min(sz/it[3],sz/it[4]); c.drawImage(im,it[1],it[2],it[3],it[4],x+i*(sz+6)+(sz-it[3]*s)/2,y+(sz-it[4]*s)/2,it[3]*s,it[4]*s); n++; }); return L.length; };
  LBR.drawers.potions=function(cv,c,W,H,t,full,id){ var D=BY[id]; if(!D)return; var col=COL[D.S.k]||'#ccc'; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#141824'); g.addColorStop(1,'#1e2230'); c.fillStyle=g; c.fillRect(0,0,W,H);
    // a little flask in the section's colour
    var fx=W-46, fy=26; c.fillStyle='rgba(255,255,255,.08)'; c.beginPath(); c.arc(fx,fy+16,18,0,Math.PI*2); c.fill(); c.fillStyle=col; c.globalAlpha=0.75+0.15*Math.sin((t||0)*2); c.beginPath(); c.arc(fx,fy+18,13,0,Math.PI*2); c.fill(); c.globalAlpha=1; c.fillStyle='#d8d0c0'; c.fillRect(fx-4,fy-2,8,9); c.fillStyle='#8a6a40'; c.fillRect(fx-5,fy-6,10,5);
    c.textAlign='left'; c.fillStyle=col; c.font='600 15px "Segoe UI",sans-serif'; wrap(c,D.x[1],16,30,W-90,18);
    c.fillStyle='#d8dce8'; c.font='12.5px "Segoe UI",sans-serif'; wrap(c,D.x[2],16,74,W-32,17);
    var nI=icons(c,id,14,H-62,44); if(!nI){ c.fillStyle='#7a8494'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(D.S.k==='audit'?'':'(not picked — no painted icon)',16,H-34); }
    c.fillStyle='#ffd860'; c.font='600 12px "Segoe UI",sans-serif'; c.textAlign='right'; c.fillText(D.x[3],W-14,H-14); };
  LAB_TABS.push({ id:'potions', name:'Potions',
    blurb:'<b>Round 60 — the potions, rebalanced and expanded.</b> First what is wrong today; then proposals: healing by realm, mana, spell oils (slow, burn, poison, arcs, roots, drain), weapon coatings (elemental melee and arrows), flasks to throw, longer boons, and the wards. ☆ every one to build, notes to change a number or a name. The picked ones get painted icons and go on the apothecary\'s shelves.',
    designs:Object.keys(BY).filter(function(k){ return BY[k].S.k!=='audit'; }).map(function(k){ return {id:k,name:BY[k].x[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); var n=0; return SEC.map(function(S){ return LBR.sec(S.t,S.s)+'<div class="br-grid">'+S.L.map(function(x){ return LBR.card('potions',{id:x[0],name:x[1],desc:x[3]},n++,380,250,''); }).join('')+'</div>'; }).join(''); } });
})();
