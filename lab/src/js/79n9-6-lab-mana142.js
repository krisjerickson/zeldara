// ═══════════════════════════════════════════════════════════════════════
// ║ 79n9-6-lab-mana142.js — round 142 (Kris: "do an analysis on how you can gain more max mana, including leveling up, items, conditions and
// ║ other. Also consider how much mana it takes to cast spells. do a rebalance analysis with proposals as a lab").
// ║ The tab: where mana comes from today (numbers read from the game, round 142), what every spell costs, how many casts that buys at each
// ║ realm, the proposals (✓ each), and a calculator that shows the casts with the options you turn on. Picks: mana142-<k>, mana142-all.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }, P=function(k){ return LabApp.picks[k]||{}; };
  var tag=function(k){ var v=P(k).verdict; return '<span class="wl-seg" data-k="'+k+'">'+[['pick','✓ Yes'],['maybe','?'],['cut','✕']].map(function(b){ return '<button class="vbtn wl-sg'+(v===b[0]?' on '+b[0]:'')+'" data-v="'+b[0]+'">'+b[1]+'</button>'; }).join('')+'</span>'; };
  var note=function(k,ph){ return '<input class="tl-n wl-n" data-k="'+k+'" value="'+esc(P(k).notes||'')+'" placeholder="'+(ph||'Note…')+'">'; };
  // spells: id, name, cost now (after round 102's ×2), realm of its tome
  var SP=[['frost_bolt','Frost Bolt',16,1],['arcane_burst','Arcane Burst',20,1],['thorn_snare','Thorn Snare',20,1],['fireball','Fireball',30,1],
    ['chain_lightning','Lightning Chain',24,2],['ice_shards','Ice Shards',28,2],['poison_mist','Poison Mist',32,2],['tidal_wave','Tidal Wave',32,2],
    ['void_orb','Void Orb',36,3],['flame_nova','Flame Nova',40,3],['stone_spikes','Stone Spikes',40,3],['thunder_step','Thunder Step',44,3],
    ['spirit_drain','Spirit Drain',44,4],['meteor','Meteor',50,4],['void_rift','Void Rift',52,4],['blizzard','Blizzard',56,4],['starfall','Starfall',68,4]];
  // max-mana gear today: id, name, slot, +max, +regen/s, where
  var GEAR=[['arcane_circlet','Arcane Circlet','head',25,2,'shop, realm 3 (390 g)'],['aurora_circlet','Aurora Circlet','head',20,0.5,'Frost Isle only'],['hm_skald_circlet',"Skald's Circlet",'head',20,0,'a hamlet, realm 4'],
    ['mage_hood','Mage Hood','head',15,1.5,'shop, realm 2 (205 g)'],['arcane_focus','Arcane Focus','neck',20,2,'shop, realm 3 (325 g)'],['lanterneel_amulet','Lantern-eel Amulet','neck',10,0,'Bog Isle only'],
    ['hm_weaver_mantle',"Weaver's Mantle",'back',10,0,'a hamlet, realm 4']];
  var REALM=[[1,'Gildenmark',5,4],[2,'Fernheim',10,9],[3,'Cragland',15,14],[4,'Cinderheim',20,19]];      // realm, name, level cap, a typical level when its spells arrive
  var PROPS=[['lvl','Level growth +5 a level (today +3)','The pool grows with you: 70 at the realm-1 cap, 95 / 120 / 145 at the others (today 62 / 77 / 92 / 107). The plain, always-there fix.'],
    ['runes','A mana rune from every mage tower (+5 max mana each, 16 towers = +80)','Beating a tower\'s mage gives its rune with the tome. Makes the towers the caster\'s road, and rewards finishing them. Shown on the Tome\'s Collection page.'],
    ['gear','Mana on more caster gear','Today only 7 pieces give max mana and three are island-only. Add +10 to the Arcane Cloak, Arcane Leggings, Phoenix Cape and Sapphire Ring, +15 to the Celestial Pendant and the Sovereign Amulet — so a caster outfit reaches about +60–80 by the end.'],
    ['fight','Faster mana in a fight: 1.5 → 2.5 mana a second','Today a Fireball takes 20 s of fighting to earn back and a Starfall 45 s. At 2.5 it is 12 s and 27 s: one cast every few swings, not once a fight.'],
    ['blade','Spell-blade: each melee hit gives +2 mana','Mixes sword and spell: swing to fill up, cast to finish. Caps naturally (you have to be in range to hit).'],
    ['places','Places that refill you','The glades also restore mana once a day (with the same halving rule as the hearts); waking a waystone or using one fills mana; your bed fills both. Standing in a stone circle / ley line doubles mana regen.'],
    ['night','Moon-mana: +25% mana regen at night','A small reason to cast by night and fight by day. Shown as a little moon on the mana bar.'],
    ['fairy','Fairy blessing: +20 max mana for a day after a fairy lesson','The fairies teach familiars today; their blessing would make the visit worth it for spells too.'],
    ['cost','Spell costs down a step (×1.5 instead of round 102\'s ×2)','Every spell cheaper by a quarter: Frost Bolt 12, Fireball 23, Starfall 51. Simple, but it undoes part of the round-102 choice that made spells feel weighty.'],
    ['potion','Mana potion fills half your pool (today a flat 40)','Stays useful when your pool is 150+; the Greater potion still fills all.']];
  var REC=['lvl','runes','gear','fight','places'];
  var calc=function(o){ return REALM.map(function(R){ var L=R[3], base=50+(o.lvl?5:3)*(L-1), runes=o.runes?5*Math.min(16,R[0]*4-2):0, gear=o.gear?[0,0,15,45,70][R[0]]:[0,0,15,45,55][R[0]], fair=o.fairy?20:0, pool=base+runes+gear+fair, sp=SP.filter(function(s){ return s[3]===R[0]; }), k=o.cost?0.75:1, rg=o.fight?2.5:1.5;
      return {R:R, pool:pool, base:base, runes:runes, gear:gear, fair:fair, rows:sp.map(function(s){ var c=Math.round(s[2]*k); return [s[1],c,(pool/c).toFixed(1),Math.round(c/rg)]; })}; }); };
  var state=function(){ var o={}; PROPS.forEach(function(p){ var v=P('mana142-'+p[0]).verdict; o[p[0]]=v==='pick'; }); if(!PROPS.some(function(p){ return P('mana142-'+p[0]).verdict; }))REC.forEach(function(k){ o[k]=true; }); return o; };
  LAB_TABS.push({ id:'mana142', name:'Mana: where it comes from',
    blurb:'<b>Round 142 — the mana rebalance.</b> Where your mana comes from today, what each spell costs, how many casts that is when you reach each realm, and ten proposals to ✓. The calculator at the bottom shows the casts with the proposals you have ✓ (until you pick, it shows the recommended set). <i>The numbers are read from the game as it is today; "a typical level" is an estimate (one under each realm\'s cap).</i>',
    designs:[{id:'mana142',name:'Mana rebalance'}],
    render:function(){ var h='';
      h+='<div class="w4-c"><h3>Where mana comes from today</h3><table class="r40-t"><tr><th>Source</th><th>How much</th><th>Notes</th></tr>'+
        '<tr><td><b>Your level</b></td><td>50 + 3 a level</td><td>62 at the realm-1 cap (Lv 5), 77 at Lv 10, 92 at Lv 15, 107 at Lv 20 (the last cap)</td></tr>'+
        '<tr><td><b>Gear</b></td><td>+10 to +25 a piece, 7 pieces</td><td>Head, neck and back only; three of the seven are island-only. The best outfit: +55 (Arcane Circlet 25, Arcane Focus 20, Weaver\'s Mantle 10)</td></tr>'+
        '<tr><td><b>Regen</b></td><td>4 a second at rest, 1.5 in a fight</td><td>+0.3 to +2 a second from 40-odd pieces of gear, capped at +2.5 in all</td></tr>'+
        '<tr><td><b>Potions</b></td><td>Mana potion 40 (10 g) · Greater: all (80 g) · Surge: free spells 10 s (195 g)</td><td>P drinks the right one</td></tr>'+
        '<tr><td><b>Places</b></td><td>A camp\'s mana well (once) · dying refills it</td><td>Nothing else: no level-up refill, no bed or waystone refill, no conditions</td></tr></table>'+
        '<p class="w4-p"><b>Max-mana gear:</b> '+GEAR.map(function(g){ return esc(g[1])+' (+'+g[3]+(g[4]?', +'+g[4]+'/s':'')+' — '+esc(g[5])+')'; }).join(' · ')+'</p></div>';
      h+='<div class="w4-c"><h3>What spells cost today</h3><p class="w4-p">Round 102 doubled every cost (and tripled cooldowns, then round 140 cut cooldowns to a third again). Casts from a full pool at the realm\'s typical level, and seconds of fighting to earn one cast back:</p><table class="r40-t"><tr><th>Spell</th><th>Realm</th><th>Mana</th><th>Casts at arrival</th><th>Earn back in a fight</th></tr>'+
        SP.map(function(s){ var R=REALM[s[3]-1], pool=50+3*(R[3]-1)+[0,0,15,45,55][s[3]]; return '<tr><td>'+esc(s[1])+'</td><td>'+R[1]+'</td><td>'+s[2]+'</td><td>'+(pool/s[2]).toFixed(1)+' <small>(pool '+pool+')</small></td><td>'+Math.round(s[2]/1.5)+' s</td></tr>'; }).join('')+'</table>'+
        '<p class="w4-p"><b>What this means:</b> a realm\'s dearest spell gives about two casts on arrival and then one every 20–45 s of fighting — spells are a finisher, not a way to fight. The pool grows only 3 a level while the newer spells cost 8–12 more per realm, so it never catches up: Starfall is 1.6 casts even at the cap with good gear. And outside the shop circlet and amulet, there is almost nothing that adds max mana.</p></div>';
      h+='<div class="w4-c"><h3>Proposals</h3>'+PROPS.map(function(p){ var k='mana142-'+p[0]; return '<div class="r40-p"><div><b>'+esc(p[1])+'</b>'+(REC.indexOf(p[0])>=0?' <small class="mv40-ask">recommended</small>':'')+' — '+esc(p[2])+'</div><div class="w4-a">'+tag(k)+note(k)+'</div></div>'; }).join('')+'</div>';
      var o=state(), C=calc(o);
      h+='<div class="w4-c"><h3>The calculator — '+(PROPS.some(function(p){ return P('mana142-'+p[0]).verdict; })?'with your ✓':'with the recommended set')+'</h3><table class="r40-t"><tr><th>Realm</th><th>Pool on arrival</th><th>Spells: mana · casts · earn back</th></tr>'+
        C.map(function(c){ return '<tr><td><b>'+c.R[1]+'</b><br><small>Lv '+c.R[3]+'</small></td><td><b>'+c.pool+'</b><br><small>level '+c.base+(c.runes?' + runes '+c.runes:'')+(c.gear?' + gear '+c.gear:'')+(c.fair?' + blessing '+c.fair:'')+'</small></td><td>'+c.rows.map(function(r){ return esc(r[0])+' '+r[1]+' · <b>'+r[2]+'</b> · '+r[3]+' s'; }).join('<br>')+'</td></tr>'; }).join('')+'</table>'+
        '<p class="w4-p"><i>Estimates: runes assume you have beaten about half the towers you could by then; gear assumes the shop\'s caster pieces. The aim of the recommended set: three or four casts of your newest spell on arrival, and one back every 10–20 s of fighting.</i></p></div>';
      return h+'<textarea class="wl-n wl-all" data-k="mana142-all" placeholder="Anything else about mana and spells…">'+esc(P('mana142-all').notes||'')+'</textarea>'; } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'mana142',label:'💧 Mana: ✓ the proposals for more mana and spell costs',where:'Mana: where it comes from tab',done:function(){ return PROPS.some(function(p){ return !!P('mana142-'+p[0]).verdict; }); },go:function(){ LTODO.goTo('mana142',null,0); }});
})();
