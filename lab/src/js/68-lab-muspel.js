// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 56 PREP — "Muspelheim" tab. Kris (Oct 14): Surtharn and the spirit walls as "Lab options first"; halls 1–4 "each its own challenge"; the
// ║ old eight volcano bosses as "mini-bosses in the halls"; the Lodestar from "the Sovereign staff only" and the four Heartglasses.
// ║ Wave 58 (tools/sprites/round56.ps1): six Surtharns, six spirit walls, the four challenge halls' key pieces (A/B), three great hearths, three
// ║ Lodestars and two ash-wardens. ☆ one per section; notes welcome. Until the sheets are painted each card shows its description.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined')return; LBR.TABS.push('muspel');
  var M=(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}, IMG={}, tried={};
  var page=function(pg){ if(IMG[pg]||tried[pg])return IMG[pg]; tried[pg]=1; var im=new Image(); im.onload=function(){ IMG[pg]=im; }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../assets/scenery/'+pg+'.webp'; } }; im.src='assets/scenery/'+pg+'.webp'; return null; };
  var draw=function(c,id,cx,foot,h,mw){ var it=M.items[id]; if(!it)return false; var im=page(it[0]); if(!im)return false; var s=Math.min(h/it[4],mw/it[3],2.6); c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(im,it[1],it[2],it[3],it[4],cx-it[3]*s/2,foot-it[4]*s,it[3]*s,it[4]*s); return true; };
  var SEC=[
    {k:'surt',t:'👹 Surtharn, Tyrant of Muspelheim',s:'pick one · six phases on the fifth floor, warded by everything but Sovereign',L:[
      ['surt_colossus','Molten colossus','cracked black basalt, rivers of lava, a crown of flame, a flaming greatsword'],['surt_forgeking','Forge-king','blackened iron plate, bellows on his back, an anvil-hammer, a beard of embers'],
      ['surt_ashtyrant','Ash tyrant','gaunt, in smouldering ash robes, a mask of molten gold, chains of spirit-light'],['surt_jotun','Horned jötunn','horned, rune-burnt skin, hair of flame, a sword of fire'],
      ['surt_obsidian','Obsidian warlord','jagged obsidian armour, a cage in his chest holding captured spirits'],['surt_volcano','Living volcano','a giant rising out of a mound of magma, his head a smoking crater crown']]},
    {k:'wall',t:'⛓ The spirit walls',s:'pick one · the walls of Surtharn\'s throne cavern, made of the spirits he holds',L:[
      ['sw_relief','Spirits in relief','chained spirits pressed into obsidian like a carving, faces and hands glowing'],['sw_amber','Glass columns','spirits trapped in tall columns of smoky amber glass'],
      ['sw_cage','Cage wall','black iron bars and cages packed with spirit light'],['sw_lanterns','Chains and lanterns','a basalt wall of chains, each ending in a lantern-cage with a spirit'],
      ['sw_channels','Rune channels','spirit light flowing like water through rune channels in basalt'],['sw_lavafall','Spirit lavafall','a curtain of slow lava with spirit silhouettes inside']]},
    {k:'hall',t:'🏔 The four challenge halls',s:'pick A or B for each piece · hall 1 the Chain Lifts, hall 2 the Lava Rafts, hall 3 the Ash-warden Fortress, hall 4 the Falling Bridges',L:[
      ['mh_lift_a','Chain lift — A','a square iron platform on four chains over a lava shaft'],['mh_lift_b','Chain lift — B','a round bronze platform on one great chain and pulley'],
      ['mh_raft_a','Lava raft — A','a basalt raft with glowing cracked edges'],['mh_raft_b','Lava raft — B','an iron raft with a brazier and a dragon prow'],
      ['mh_gate_a','Fortress gate — A','black iron and basalt, spiked, ember braziers, a portcullis'],['mh_gate_b','Fortress gate — B','a dark gatehouse, a molten door, two ash-warden statues'],
      ['mh_bridge_a','Falling bridge — A','basalt slabs on chains over the abyss, some already cracking'],['mh_bridge_b','Falling bridge — B','rope and planks with iron fittings, burning at one end']]},
    {k:'hearth',t:'🔥 The great hearth',s:'pick one · the Sovereign staff and the four Heartglasses go in, the Lodestar comes out',L:[
      ['gh_hearth_a','Iron and gold','a round hearth of black iron and gold, four gem cradles around a staff socket'],['gh_hearth_b','Basalt altar','a stepped altar with a fire pit, four carved hands holding the gems'],
      ['gh_hearth_c','Rune anvil','a huge anvil-shaped forge with four glowing slots in a ring']]},
    {k:'star',t:'⭐ The Lodestar',s:'pick one · the divine staff that leads the spirits home',L:[
      ['ls_staff_a','White-gold star','a white-gold staff topped by a blazing four-gem star'],['ls_staff_b','Spiral of light','dark iron wrapped in spiralling light, four gems round a floating star'],
      ['ls_staff_c','Compass-rose','pale runed wood and silver with a compass-rose head of four gems']]},
    {k:'warden',t:'🛡 Surtharn\'s ash-wardens',s:'pick one · his guards in the halls (the fortress hall is full of them)',L:[
      ['aw_warden_a','Charred soldier','charred black armour, spear and tower shield, ember eyes in a closed helm'],['aw_warden_b','Cinder wraith','living ash in a ragged cloak, a glowing curved blade and a chain whip']]}];
  var BY={}; SEC.forEach(function(S){ S.L.forEach(function(x){ BY[x[0]]={S:S,x:x}; }); });
  var wrap=function(c,txt,x,y,mw,lh){ var w=txt.split(' '), line=''; w.forEach(function(word){ var t=line?line+' '+word:word; if(c.measureText(t).width>mw&&line){ c.fillText(line,x,y); y+=lh; line=word; } else line=t; }); if(line)c.fillText(line,x,y); };
  LBR.drawers.muspel=function(cv,c,W,H,t,full,id){ var D=BY[id]; if(!D)return; t=t||0;
    var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#1a0f0c'); g.addColorStop(1,'#3a1a10'); c.fillStyle=g; c.fillRect(0,0,W,H);
    var gl=c.createRadialGradient(W/2,H-20,8,W/2,H-20,W*0.5); gl.addColorStop(0,'rgba(255,120,40,'+(0.25+0.07*Math.sin(t*2.4))+')'); gl.addColorStop(1,'rgba(255,120,40,0)'); c.fillStyle=gl; c.fillRect(0,0,W,H);
    if(draw(c,D.x[0],W/2,H-12,H*0.86,W*0.9))return;
    c.fillStyle='#ffd2a8'; c.font='600 15px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(D.x[1],W/2,H*0.36); c.fillStyle='#c8a890'; c.font='12px "Segoe UI",sans-serif'; wrap(c,D.x[2],W/2,H*0.36+24,W*0.8,16);
    c.fillStyle='#8a6a58'; c.font='11px "Segoe UI",sans-serif'; c.fillText('waiting for the painted sheet · tools\\sprites\\round56.ps1 (wave 58)',W/2,H-16); };
  LAB_TABS.push({ id:'muspel', name:'Muspelheim',
    blurb:'<b>Round 56 prep — Muspelheim, your picks first.</b> As you chose: halls 1–4 are each their own challenge (the Chain Lifts, the Lava Rafts, the Ash-warden Fortress, the Falling Bridges), with spirits to free along the way and two of the old volcano bosses guarding each hall; the fifth floor is Surtharn\'s throne cavern, walled with spirits; at the great hearth the <b>Sovereign staff</b> and the four Heartglasses become the Lodestar. Star (☆) one option in each section — for the halls, A or B for each piece. The code is being built meanwhile with drawn stand-ins.',
    designs:Object.keys(BY).map(function(k){ return {id:k,name:BY[k].x[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); var n=0; return SEC.map(function(S){ return LBR.sec(S.t,S.s)+'<div class="br-grid">'+S.L.map(function(x){ return LBR.card('muspel',{id:x[0],name:x[1],desc:x[2]},n++,S.k==='surt'||S.k==='wall'?420:360,S.k==='surt'?320:260,''); }).join('')+'</div>'; }).join(''); } });
})();
