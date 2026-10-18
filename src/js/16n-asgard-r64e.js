// ═══════════════════════════════════════════════════════════════════════
// ║ 16n-asgard-r64e.js — round 64e: ASGARD, PLAYED THROUGH (Kris, late Oct 18).
// ║  · "i'm on floor 3 of the citadel of asgard, and new monsters keep autospawning, and i can't progress. make sure we don't have autospawns
// ║    the stall progress": every wave that walks in on its own (the Ragnarök marks, Gjallarhorn's alarm, a fate cut wrong) only fills the
// ║    floor up to a few foes awake at a time (ZCIT.CAP) — never more piling in while you are held up.
// ║  · "now i'm stuck on the left side of level 3, and can't walk across the bridge" (he "didn't know to cut" the thread): each hall opens with
// ║    its rules (16j, with the painted pieces); every golden thread glows and says what Tab does; the one on your island promises a bridge.
// ║  · "godsbane should also be very effective against all of the monsters in asgard": Godsbane strikes three times as hard at Asgard's own
// ║    (the einherjar, the wardens — and anything in the citadel), as it did before only at Solmyrk's last form.
// ║  · "when important things happen in asgard and instructions come up, these need to be popups that you click out of after you've read
// ║    everything. and add in images" (card: every instruction): learning Godsbane, the first steps into Asgard, Solmyrk's light and black,
// ║    each mark of the Ragnarök track, the citadel's door, the rune circle at the heart — a paused pop-up with the painted pieces.
// ═══════════════════════════════════════════════════════════════════════
var ZAP={ on:true,
  // a paused pop-up with pictures (the forge-rules window, 16j)
  info:function(title,lead,steps,btn,cb){ if(typeof ZFT==='undefined')return false; var el=ZFT._shell(title,lead), body=el.querySelector('.zft-body'), foot=el.querySelector('.zft-foot'); ZFT._steps(body,steps||[]);
    ZFT._onClose=cb||null; ZFT._btn(foot,btn||'Got it ▶','zft-go',ZFT.close).focus(); return true; },
  // which notices become pop-ups: the notice's start → the pop-up
  NOTES:[
    {re:/^✦ You learned GODSBANE/, f:function(){ return ['✦ Godsbane — the Lodestar\'s spell','The spirits of Runeheim taught the Lodestar its one spell.',[
      ['ls2_c','<b>Cast it with V</b> (or the ✦ slot on the action bar) — only with the <b>Lodestar in hand</b> (Inventory → magic weapon). A beam of white-gold light runs ahead of you.','🌟'],
      ['ar_lens','<b>Against Asgard</b> it strikes three times as hard: the einherjar, the wardens, everything of the false god\'s. It shatters Heimdall\'s lenses for good.','✦'],
      ['gd_grim_1_d_dk','<b>Against Solmyrk</b> it tears the light off him — he turns black and open to your blows.','👑'],
      [null,'It takes <b>20 seconds</b> to gather light again.','⏳']]]; } },
    {re:/While Solmyrk blazes with light/, f:function(){ return ['👑 Solmyrk, the Black Sun','Corrupted Odin swings between blinding light and a black that drinks it.',[
      ['gd_grim_1_d','<b>☀ Radiant</b> — white light pours out of him: he is <b>shielded</b>, your blows do nothing.','☀'],
      ['gd_grim_1_d_dk','<b>● Black</b> — the hall darkens, his one eye burns: <b>strike now!</b>','●'],
      ['ls2_c','<b>Godsbane (V)</b> tears the light off him at once — black and open for 4 seconds.','✦'],
      [null,'Three forms: the first mostly light, the second even, the last mostly black.','⚔']]]; } },
    {re:/^❄ RAGNARÖK DRAWS NEAR/, f:function(m){ var n=(m.match(/\((\d+) \/ 10\)/)||[])[1]; return ['❄ Ragnarök draws near ('+(n||'?')+' / 10)','The track at the top fills with time, and jumps at every alarm.',[
      [null,'<b>Fimbulwinter</b> frosts the halls — you move a little slower with each mark (3, 6 and 9).','❄'],
      [null,'A few <b>einherjar walk in</b> — never more than the hall can hold.','⚔'],
      [null,'Leave the citadel and the track resets.','🚪']]]; } },
    {re:/^🏛 The golden doors of the citadel/, f:function(m){ return ['🏛 The Citadel of Asgard',m.replace(/^🏛 /,''),[['asg_keep_a','Five floors: Heimdall\'s Watch, Valhöll, the Hall of the Norns, Yggdrasil, and Solmyrk\'s throne.','🏛']]]; } },
    {re:/^🌟 The circle waits for the Lodestar/, f:function(){ return ['🌟 The Heart of Asgard','The world-tree rune circle at the heart of the city.',[['asg_circle_c','When Solmyrk has fallen, stand in the circle with the <b>Lodestar</b> and press <b>Tab</b>.','🌟']]]; } }
  ],
  // the first steps into the city: follow the golden roads
  enterPop:function(ws){ var ps=ws.playerState; if(ps._asgIn||typeof ZASG==='undefined')return; ps._asgIn=1;
    ZAP.info('🏰 Asgard','The city of the gods, come down onto Mirror Lake — and held by the false god.',[
      [ZASG.GATE||'asgA_gate','<b>Follow the golden roads</b> — every one leads to the heart of the city.','🛣'],
      [ZASG.CIRCLE||'asg_circle_c','At the heart: the <b>world-tree rune circle</b>, under the column of light, before the citadel.','🌟'],
      [ZASG.KEEP||'asg_keep_a','The <b>Citadel</b> behind it: five floors to Solmyrk\'s throne. Tab at its golden doors.','🏛'],
      ['ls2_c','<b>Godsbane (V)</b> strikes Asgard\'s foes three times as hard.','✦']]); }
};
(function(){
  // ── autospawns never pile up: at most CAP foes awake on a citadel floor ──
  setTimeout(function(){ if(typeof ZCIT==='undefined')return; ZCIT.CAP=ZCIT.CAP||5;
    var a0=ZCIT.around; ZCIT.around=function(sc,n,ids,r0){ var alive=(sc&&sc.monsters||[]).filter(function(m){ return m&&!m.dead&&m.hp>0; }).length, room=Math.max(0,ZCIT.CAP-alive); if(room<=0)return []; return a0.call(this,sc,Math.min(n,room),ids,r0); };
    // the Norns' threads: each glows and says what Tab does; the one on your island promises the bridge
    var n0=ZCIT.norns; ZCIT.norns=function(sc,H){ var r=n0.apply(this,arguments), C=sc._cit; (C&&C.threads||[]).forEach(function(o){ var t=o.eff==='span0'?'✂ [Tab] Cut the thread — a golden bridge!':'✂ [Tab] Cut the golden thread';
        o.lbl=ZFI.label(sc,o.x,o.y-62,t,'#ffe890'); o.lblT=t; var gl=sc.add.circle(o.x,o.y-30,26,0xffe080,0.22).setDepth(o.y/1e4+5.05).setBlendMode(Phaser.BlendModes.ADD); sc.tweens.add({targets:gl,scale:{from:0.8,to:1.35},alpha:{from:0.12,to:0.32},duration:900,yoyo:true,repeat:-1}); o.glow=gl; }); return r; };
    var c0=ZCIT.cut; ZCIT.cut=function(sc,o){ if(o.lbl){ o.lbl.destroy(); o.lbl=null; } if(o.glow){ sc.tweens.killTweensOf(o.glow); o.glow.destroy(); o.glow=null; } return c0.apply(this,arguments); };
  },0);
  // ── Godsbane: three times as hard at Asgard's own ──
  ZAP.asgMon=function(scene,m){ if(!m||m.isBoss)return false; var id=(m.rid||(m.def&&m.def.id)||'')+''; return /^(einherjar_|gjallar_|asg_|valk)/.test(id)||!!(scene&&typeof ZCIT!=='undefined'&&ZCIT.is(scene)); };
  setTimeout(function(){ if(typeof _heroHitMonster!=='function'||typeof ZGODS==='undefined')return; var h0=_heroHitMonster;
    _heroHitMonster=function(scene,m,dmg,opts){ if(typeof ZHit!=='undefined'&&ZHit._gb&&ZAP.asgMon(scene,m)&&!m.godsbaneWeak)dmg*=3; return h0.apply(this,arguments); }; },0);
  // ── the notices that matter become pop-ups ──
  setTimeout(function(){ if(typeof showNotif!=='function')return; var s0=showNotif;
    showNotif=function(msg,col){ try{ if(ZAP.on&&typeof ZFT!=='undefined'&&ZFT.on&&!ZFT.isOpen()){ for(var i=0;i<ZAP.NOTES.length;i++){ var N=ZAP.NOTES[i]; if(N.re.test(String(msg))){ var a=N.f(String(msg)); if(ZAP.info(a[0],a[1],a[2]))return; } } } }catch(e){} return s0.apply(this,arguments); }; },0);
  // ── the first steps onto Asgard's island ──
  setInterval(function(){ try{ if(!ZAP.on||typeof ZFT==='undefined'||!ZFT.on||ZFT.isOpen()||typeof game==='undefined')return; var ws=game.scene.getScene('World'); if(!ws||!ws.player||!ws.playerState||!ws.sys.isActive()||!ws.playerState.bifrost||ws.playerState._asgIn)return;
      var P=ZASG.plan(ws), k=Math.floor(ws.player.y/TILE)*WORLD_W+Math.floor(ws.player.x/TILE); if(P.isl[k])ZAP.enterPop(ws); }catch(e){} },700);
})();
// the citadel's halls: their rules (16j shows them on each floor, and "? Rules" on the Ragnarök track)
(function(){ if(typeof ZFT==='undefined')return;
  ZFT.DOOM=[null,'<b>The Ragnarök track</b> (top of the screen) fills with time and jumps at every alarm. At 3, 6 and 9 Fimbulwinter slows you and a few einherjar walk in. <b>Godsbane (V)</b> strikes Asgard\'s foes three times as hard.','📯'];
  Object.assign(ZFT.RULES,{
    cit0:{t:'👁 The Citadel — Heimdall\'s Watch',lead:'The watchman\'s lenses sweep the hall with rainbow light.',steps:[
      ['ar_lens','<b>Keep out of the beams.</b> Caught in one, Gjallarhorn sounds: wardens come and the Ragnarök track jumps.','👁'],
      ['ar_pillar','<b>Pillars hide you</b> — time the sweeps and slip from one to the next. A Smoke Pellet blinds the lenses for a while.','🏛'],
      ['ls2_c','<b>Godsbane (V)</b> shatters a lens for good — aim it along the hall.','✦'],
      [null,'Find the <b>stairs up</b> on the far side.','🪜']]},
    cit1:{t:'🔥 The Citadel — Valhöll',lead:'The hall of the fallen warriors.',steps:[
      ['ar_brazier','<b>The horn-braziers</b> keep the einherjar rising again after they fall. Stand by a brazier and press <b>Tab</b> to put it out.','🔥'],
      [null,'With every brazier dark, <b>the fallen stay down</b>. Then take the stairs up.','⚔']]},
    cit2:{t:'🧵 The Citadel — the Hall of the Norns',lead:'Three islands over the sky, tied together by golden threads.',steps:[
      ['ar_thread','<b>Cut a thread</b>: stand by its post and press <b>Tab</b>. The one on the first island spins a <b>golden bridge</b> across the sky to the next island.','✂'],
      [null,'Each other thread does one thing: a <b>bridge</b> on to the last island, a <b>loom-wall</b> that unravels to show the Norns\' gift — or <b>einherjar wake</b>.','🌉'],
      ['ls2_c','A wrong cut? With the Lodestar, <b>R rewinds</b> the last cut (three times on this floor).','⏳'],
      ['ar_norns','The way up is on the far island.','🪜']]},
    cit3:{t:'🌳 The Citadel — Yggdrasil',lead:'The World Tree grows up through the citadel.',steps:[
      ['ar_yggbranch','<b>Climb</b> the trunk and its branches to the top.','🌳'],
      ['ar_grimtooth','<b>Grimtooth</b> gnaws at the roots: his rot climbs after you, and burns. Keep above it.','🐉'],
      ['ar_rat_1','<b>Catch Ratatoskr</b>, the squirrel running the trunk — he scampers you up a hidden way.','🐿']]},
    cit4:{t:'👑 The Citadel — the Throne of Solmyrk',lead:'Corrupted Odin waits on the high seat.',steps:[
      ['gd_grim_1_d','<b>☀ Radiant</b>: he is shielded — your blows do nothing.','☀'],
      ['gd_grim_1_d_dk','<b>● Black</b>: the hall darkens, his eye burns — strike!','●'],
      ['ls2_c','<b>Godsbane (V)</b> forces him black for 4 seconds. Three forms; the last is mostly black.','✦']]}
  });
  // "? Rules" on the Ragnarök track
  setTimeout(function(){ if(typeof ZDOOM==='undefined')return;
    // (the track's html is rebuilt when it changes: keep the button)
    var h1=ZDOOM.hud; ZDOOM.hud=function(sc){ var r=h1.apply(this,arguments), el=document.getElementById('zdoom'); if(el&&!el.querySelector('.zheat-q')&&el.firstChild){ var b=document.createElement('span'); b.className='zheat-q'; b.textContent='? Rules'; b.onclick=function(){ try{ var s=game.scene.getScene('Dungeon'); if(s)ZFT.rules(s,null,false); }catch(e){} }; el.firstChild.appendChild(b); } return r; }; },0);
})();
