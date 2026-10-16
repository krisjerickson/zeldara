// ═══════════════════════════════════════════════════════════════════════
// ║ 16b-forge-sites.js — round 55: the Forges of Muspelheim, remade (docs/28-spirit-saga.md §5; Kris: "let's try the four forge challenges and
// ║ bosses as you suggest in the spirit saga").
// ║ Each forge is now three floors:
// ║   Floor 1 — its old challenge (the Ember Maze, the Steam Climb, the Slag Puzzle, the Ash Escape). Its chest no longer holds the key: it opens the
// ║             way down into the forge.
// ║   Floor 2 — the spirit galleries: a mine of rock and lava, monsters of the Ashlands, and five spirits chained at the rock faces, digging.
// ║   Floor 3 — the hearth hall: five more spirits, the FORGE-MASTER (three phases, fought where it stands — warded by Muspelheim: ×0.35 from every
// ║             element, ×2 from Sovereign) and, once it falls, the forge's HEARTH.
// ║ [Tab] by a chained spirit breaks its chains (it thanks you and rises away; ps.forgeFreed keeps them). [Tab] at the hearth with the realm's Soulglass
// ║ Lattice (Sólveig) and Hearth Tray (Mira) makes its HEARTGLASS; without them the hearth says what is missing and where it comes from.
// ║ The forge's key — the way to the next forge — now comes from the forge-master's portal chest.
// ═══════════════════════════════════════════════════════════════════════
var ZFORGE={ on:true,
  F:{ volcano_n:{k:'ember',q:1,name:'Ember Forge',scene:'VolcanoMaze',boss:'forge_glodr'},
      volcano_e:{k:'cinder',q:2,name:'Cinder Forge',scene:'VolcanoBulletHell',boss:'forge_eisa'},
      volcano_s:{k:'slag',q:3,name:'Slag Forge',scene:'VolcanoPuzzle',boss:'forge_gjallr'},
      volcano_w:{k:'ash',q:4,name:'Ash Forge',scene:'VolcanoEscape',boss:'forge_eimyrja'} },
  byK:function(k){ for(var id in ZFORGE.F)if(ZFORGE.F[id].k===k)return Object.assign({vid:id},ZFORGE.F[id]); return null; },
  // round 60 (Kris: "dropping challenges, but have 4 levels for each mini volcano, and come up with new monsters for the volcanos"): the old challenge
  // scenes are gone — each forge is FOUR painted floors: the Mouth, the Spirit Galleries, the Deep Workings, the Hearth Hall (the forge-master)
  FLOORS:4, HALLS:['The Mouth','The Spirit Galleries','The Deep Workings','The Hearth Hall'],
  MONS:{ember:['bellows_imp','coalback'],cinder:['scald_wraith','quench_golem'],slag:['slag_crawler','ore_hurler'],ash:['chain_jailer','ash_banshee']},
  KEYNAME:{volcano_n:'Ember Key',volcano_e:'Magma Key',volcano_s:'Obsidian Key',volcano_w:'Ashfire Key'},
  site:function(vid){ var F=ZFORGE.F[vid]; return {id:'forge_'+F.k,type:'dungeon',section:4,design:'forge_'+F.k,forge:vid,name:F.name,floors:ZFORGE.FLOORS}; },
  // from the world straight into the forge's first floor
  enter:function(ws,vid,floor){ var F=ZFORGE.F[vid]; if(!F)return false; document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    if(game.scene.isPaused('World'))game.scene.resume('World'); game.scene.sleep('World'); if(game.scene.isActive('Dungeon')||game.scene.isPaused('Dungeon'))game.scene.stop('Dungeon');
    game.scene.start('Dungeon',{site:ZFORGE.site(vid),floor:floor||0,maxFloors:ZFORGE.FLOORS,worldScene:ws,theme:'volcano',forgeKey:_volcanoKeyForSection(F.q),forgeKeyName:ZFORGE.KEYNAME[vid]}); return true; },
  of:function(scene){ var s=scene&&(scene._site||scene.site); return s&&s.forge?Object.assign({vid:s.forge},ZFORGE.F[s.forge]):null; },
  PER:5,
  // ── floor 1 → the Dungeon ──
  descend:function(vscene){ var ws=vscene.worldScene, F=ZFORGE.F[vscene.site&&vscene.site.id]; if(!F)return false; var key=vscene.sys.settings.key;
    document.getElementById('hud').style.display='none'; document.getElementById('dungeon-hud').style.display='block';
    var data={site:ZFORGE.site(vscene.site.id),floor:1,maxFloors:ZFORGE.FLOORS,worldScene:ws,theme:'volcano',forgeKey:vscene.keyId,forgeKeyName:vscene.keyName};
    game.scene.stop(key); if(game.scene.isPaused('World'))game.scene.resume('World'); game.scene.sleep('World'); if(game.scene.getScene('Dungeon')&&game.scene.isActive('Dungeon'))game.scene.stop('Dungeon'); game.scene.start('Dungeon',data);      // the World sleeps (as for any site); the Dungeon runs
    showNotif('⬇ Down into the '+F.name+' — the spirit galleries.','#ffb070'); return true; },
  // ── the chained spirits ──
  spiritsFor:function(F,floor){ var L=typeof ZSPIRIT40!=='undefined'?ZSPIRIT40:[], base=((F.q%4))*10, out=[]; for(var i=0;i<ZFORGE.PER;i++){ var r=L[(base+(floor-1)*5+i)%40]; out.push({id:F.k+'_f'+floor+'_'+i,pic:r?r[0]:null,name:r?r[1]:'A spirit'}); } return out; },
  placeSpirits:function(sc){ sc._forgeSp=[]; var F=ZFORGE.of(sc); if(!F||sc.floor<1||sc.floor>2)return; /* the galleries and the workings: five each */ var ps=sc.worldScene.playerState, freed=(ps.forgeFreed||[]), R=rngOf(9100+F.q*31+sc.floor), en=sc.stairsUpTile||{x:0,y:0}, bx=sc.bossChestTile, list=ZFORGE.spiritsFor(F,sc.floor), placed=[];
    for(var t=0;t<4000&&placed.length<list.length;t++){ var x=R.i(3,DW-4), y=R.i(3,DH-4); if(sc.dtiles[y][x]!==DNG.FLOOR||(sc._labReach&&!sc._labReach[y*DW+x]))continue; if(Math.hypot(x-en.x,y-en.y)<7)continue; if(bx&&Math.hypot(x-bx.x,y-bx.y)<5)continue;
      if(placed.some(function(p){ return Math.hypot(p.x-x,p.y-y)<9; }))continue; placed.push({x:x,y:y}); }
    sc._forgeSp=[]; placed.forEach(function(p,i){ var S=list[i], px=p.x*TILE+TILE/2, py=p.y*TILE+TILE/2, done=freed.indexOf(S.id)>=0; var o={type:'forge_spirit',sid:S.id,name:S.name,x:px,y:py,opened:done};
      if(!done){ var id='sp_u_'+S.pic+'_bound', vis=typeof ZSPM!=='undefined'?ZSPM.make(sc,id,px,py+10,'bound',{depth:py+20}):null; if(vis)vis.setDepth(py/1e4+5); o.vis=vis;
        var ch=sc.add.graphics().setDepth(py/1e4+4.9); ch.lineStyle(2,0x3a3a40,1); ch.beginPath(); ch.moveTo(px+6,py+10); ch.lineTo(px+30,py+16); ch.strokePath(); ch.fillStyle(0x2a2a30,1).fillRect(px+28,py+8,6,12); o.chain=ch;
        o.lbl=domText(sc,px,py-60,'⛓ '+S.name,{fontSize:'9px',color:'#9fe8ff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5).setDepth(9000); }
      sc.interactables.push(o); sc._forgeSp.push(o); }); },
  freeSpirit:function(sc,o){ var ps=sc.worldScene.playerState; o.opened=true; ps.forgeFreed=ps.forgeFreed||[]; if(ps.forgeFreed.indexOf(o.sid)<0)ps.forgeFreed.push(o.sid);
    if(o.chain){ var ch=o.chain; sc.tweens.add({targets:ch,alpha:0,duration:400,onComplete:function(){ ch.destroy(); }}); } if(o.lbl)o.lbl.destroy();
    if(o.vis){ var v=o.vis; sc.tweens.add({targets:v,y:v.y-90,alpha:0,duration:2200,ease:'Sine.in',onComplete:function(){ v.destroy(); }}); }
    for(var i=0;i<10;i++){ var s=sc.add.circle(o.x,o.y,2,0x9fe8ff,1).setDepth(9000); sc.tweens.add({targets:s,x:o.x+(Math.random()-0.5)*60,y:o.y-30-Math.random()*60,alpha:0,duration:900,onComplete:function(){ this.targets[0].destroy(); }}); }
    var F=ZFORGE.of(sc), mine=ps.forgeFreed.filter(function(x){ return x.indexOf(F.k+'_')===0; }).length;
    showNotif('⛓ '+o.name+'\'s chains break! "Thank you, '+heroName(ps)+'." — '+mine+' / '+(ZFORGE.PER*2)+' spirits of the '+F.name+' free','#9fe8ff'); },
  // ── the hearth ──
  heartOf:function(q){ return 'heartglass_'+q; },
  placeHearth:function(sc){ var F=ZFORGE.of(sc); if(!F||!sc.isLastFloor||!sc.bossChestTile)return; var b=sc.bossChestTile, hx=null, hy=null;
    for(var r=2;r<6&&hx===null;r++)for(var a=0;a<12&&hx===null;a++){ var x=Math.round(b.x+Math.cos(a/12*Math.PI*2)*r), y=Math.round(b.y+Math.sin(a/12*Math.PI*2)*r); if((sc.dtiles[y]||[])[x]===DNG.FLOOR&&(!sc._labReach||sc._labReach[y*DW+x])){ hx=x; hy=y; } }
    if(hx===null)return; var px=hx*TILE+TILE/2, py=hy*TILE+TILE/2, o={type:'forge_hearth',x:px,y:py,opened:false};
    var Z=typeof _scn==='function'?_scn():null, im=Z&&Z.has&&Z.has('ff_hearth_'+F.k)?Z.image(sc,'ff_hearth_'+F.k,px,py+12,Z.K,py/1e4+5):null;
    if(!im){ var g=sc.add.graphics().setDepth(py/1e4+5); g.fillStyle(0x2a2220,1).fillEllipse(px,py+8,64,26); g.fillStyle(0x4a3a30,1).fillRect(px-26,py-22,52,30); g.fillStyle(0xff7030,0.9).fillEllipse(px,py-6,38,14); g.fillStyle(0xffe080,0.8).fillEllipse(px,py-8,20,7); im=g;
      sc.tweens.add({targets:g,alpha:0.85,duration:600,yoyo:true,repeat:-1}); }
    if(im&&im.displayHeight&&!im.fillStyle)ZFORGE.alive(sc,F.k,im);
    o.vis=im; sc.interactables.push(o); sc._forgeHearth=o; },
  // round 56 (Kris's Saga-art notes: "we need to make the fire moving" — Ember, Slag; "we need to make the steam moving" — Cinder, Ash): the painted
  // hearth gets living fire or steam from its mouth. MOUTH: where it comes out, as a fraction of the picture (left, top); kind; colours.
  MOUTH:{ember:[0.6,0.36,'fire',[0x7aff60,0xc8ff90,0xffffff]],slag:[0.5,0.62,'fire',[0xff8020,0xffc040,0xfff0a0]],cinder:[0.4,0.4,'steam',[0xe8f6ff,0xbfe4ff]],ash:[0.5,0.42,'steam',[0xb0a8a8,0xd8d0d0,0xff6030]]},
  alive:function(sc,k,im){ var M=ZFORGE.MOUTH[k]; if(!M)return; var W=im.displayWidth, H=im.displayHeight, x0=im.x-W*im.originX, y0=im.y-H*im.originY, mx=x0+W*M[0], my=y0+H*M[1], d=im.depth+0.001, fire=M[2]==='fire', C=M[3], n=0;
    var glow=sc.add.circle(mx,my+4,W*(fire?0.2:0.14),C[0],fire?0.28:0.12).setDepth(d).setBlendMode(Phaser.BlendModes.ADD);
    sc.tweens.add({targets:glow,alpha:{from:fire?0.18:0.08,to:fire?0.38:0.18},scale:{from:0.92,to:1.08},duration:180+Math.random()*140,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    sc.time.addEvent({delay:fire?70:150,loop:true,callback:function(){ if(n>(fire?26:16))return; n++; var c=C[Math.floor(Math.random()*C.length)], ember=!fire&&c===0xff6030;
      var r=fire?3+Math.random()*4:4+Math.random()*4, p=sc.add.circle(mx+(Math.random()-0.5)*W*(fire?0.22:0.18),my,r,c,fire?0.85:(ember?0.9:0.32)).setDepth(d+(fire?0.001:0.002));
      if(fire||ember)p.setBlendMode(Phaser.BlendModes.ADD);
      sc.tweens.add({targets:p,y:my-(fire?24+Math.random()*26:46+Math.random()*40),x:p.x+(Math.random()-0.5)*(fire?10:30),scale:fire?0.2:2.6+Math.random(),alpha:0,duration:fire?480+Math.random()*320:1500+Math.random()*900,ease:fire?'Quad.out':'Sine.out',onComplete:function(){ p.destroy(); n--; }}); }}); },
  hearth:function(sc){ var F=ZFORGE.of(sc), ps=sc.worldScene.playerState, inv=ps.inventory||(ps.inventory=[]), lat='soulglass_lattice_'+F.q, tray='hearth_tray_'+F.q, hg=ZFORGE.heartOf(F.q);
    if(!sc._bossDefeated){ showNotif('🔥 The hearth roars behind the forge-master — beat it first.','#ffb070'); return; }
    if(inv.indexOf(hg)>=0){ showNotif('✨ You already carry the '+ITEMS[hg].name+'.','#fff2b0'); return; }
    var hasL=inv.indexOf(lat)>=0, hasT=inv.indexOf(tray)>=0;
    if(!hasL||!hasT){ showNotif('🔥 The hearth of the '+F.name+' needs '+(!hasT?'the '+ITEMS[tray].name+' (Mira makes it from the '+(['','Sea-silver','Bog-iron','Fire-bronze','Rime-steel'][F.q])+' and the realm\'s soul gem)':'')+(!hasL&&!hasT?' and ':'')+(!hasL?'the '+ITEMS[lat].name+' (Sólveig fuses it from six shards of the realm\'s freed spirits)':'')+'.','#ffb070'); return; }
    inv.splice(inv.indexOf(lat),1); inv.splice(inv.indexOf(tray),1); inv.push(hg); if(typeof Tome!=='undefined'&&Tome.see)try{ Tome.see('item',hg); }catch(e){}
    sc.cameras.main.flash(700,255,240,200); var o=sc._forgeHearth; if(o){ for(var i=0;i<24;i++){ var s=sc.add.circle(o.x,o.y-10,2.5,i%2?0x9fe8ff:0xffe080,1).setDepth(9000); sc.tweens.add({targets:s,x:o.x+(Math.random()-0.5)*120,y:o.y-40-Math.random()*90,alpha:0,duration:1400,onComplete:function(){ this.targets[0].destroy(); }}); } }
    showNotif('✨ The tray glows white, the lattice turns to light — the '+ITEMS[hg].name+'! (Four of them, and the Sovereign staff, become the Lodestar in Muspelheim.)','#fff2b0');
    if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('a heartglass'); }catch(e){} },
  // ── the forge-master's chest: the key to the next forge ──
  claim:function(sc){ var F=ZFORGE.of(sc), ps=sc.worldScene.playerState, key=sc._initData.forgeKey||_volcanoKeyForSection(F.q), kn=sc._initData.forgeKeyName||(ITEMS[key]&&ITEMS[key].name)||'the key';
    ps.inventory=ps.inventory||[]; if(ps.inventory.indexOf(key)<0)ps.inventory.push(key); ps.forgesDone=ps.forgesDone||[]; if(ps.forgesDone.indexOf(F.vid)<0)ps.forgesDone.push(F.vid);
    ZLoot.site(sc,ps,4); showNotif('🗝 '+kn+' — the way to the next forge. '+(ps.inventory.indexOf(ZFORGE.heartOf(F.q))<0?'(The hearth still waits for its lattice and tray.)':''),'#ffd070');
    if(sc.worldScene._save)sc.worldScene._save(); var self=sc; setTimeout(function(){ if(self.sys&&self.sys.displayList)self._exitToWorld(); },1600); }
};

// ── the forge-masters: three phases each, fought where they stand ──
(function(){ if(typeof MDEFS==='undefined'||typeof BOSS_PHASES==='undefined'||typeof CH!=='function')return;
  var M=function(id,name,col,hp){ MDEFS[id]={name:name,icon:'🔥',hp:hp,atk:30,def:12,xp:700,gMin:220,gMax:300,sec:4,color:col,r:24,spd:40,moveType:'normal',atkType:'stomp',boss:true,lvMin:19,lvMax:20,sovWard:true}; };
  M('forge_glodr','Brokk, the Bellows-Wyrm',0xd04010,900); M('forge_eisa','Hissa, the Quench-Hag',0x4080b0,820); M('forge_gjallr','Krag, the Slag Troll',0x704030,1000); M('forge_eimyrja','Sinda, the Chainmistress',0x902020,860);
  var mk=function(key,form,phases){ BOSS_PHASES[key]={q:4,forge:true,phases:phases}; phases.forEach(function(P,i){ P.form=form+'_'+(i+1); P.rid='bp_'+key+'_'+(i+1); var C=CHAR_BY_ID[form], D=typeof BA!=='undefined'&&BA.of(P.form);      // round 56: a painted-boss form per phase (07zz-boss-forge.js, Kris's Lab pick)
    MON_BY_ID[P.rid]={id:P.rid,name:(D&&D.name)||C.name,q:4,seg:'boss',role:'boss',tier:5,spec:C.spec,tags:[],chId:D?P.form:undefined}; MX.KITS[P.rid]=P.kit; }); };
  mk('forge_glodr','fm_glodr',[
    {hp:1,sc:2.4,introT:'Brokk uncoils from the forge-fire!',kit:'lumber | breath r=150 cone=0.65 col=#ff6030 st=burn m=1.1 cd=3 | sweep r=62 arc=3.2 m=1.2 cd=2.6',ev:[{k:'marks',every:6,n:3,rad:24,col:'#ff8040',say:'Sparks rain from the bellows!'}]},
    {hp:1.1,sc:2.5,introT:'Brokk burrows into the coals — the floor will burst!',kit:'burrow | slam r=70 zone=burn zt=4 m=1.2 cd=3.2 | lob n=3 rad=30 t=1 zone=burn zt=3 col=#ff7030 m=0.8 cd=3.4',ev:[{k:'geyser',every:5,n:3,rad:34,st:'burn',col:'#ff6020',say:'Lava geysers rise under you!'}]},
    {hp:1.2,sc:2.7,introT:'The bellows burst — the whole hall breathes fire!',kit:'chase | breath r=170 cone=0.8 col=#ff5020 st=burn m=1.3 cd=2.2 | ring spd=150 max=220 gap=1 col=#ff8040 st=burn m=0.8 cd=3.5',ev:[{k:'wave',every:7,col:'#ff6a20',say:'A wave of fire rolls across the hall!'}]}]);
  mk('forge_eisa','fm_eisa',[
    {hp:1,sc:2.2,introT:'Hissa rises from the quench pool!',kit:'kite range=190 | shoot p=orb n=3 sp=0.3 homing=1 spd=150 m=0.6 cd=2.4 | cloud at=player rad=70 st=slow v=2 dur=4 cd=5',ev:[{k:'marks',every:6,n:2,rad:26,col:'#bfe8ff',say:'Steam jets hiss up!'}]},
    {hp:1.1,sc:2.3,introT:'Hissa floods the hall — islands of rock in scalding water!',kit:'blink every=2.6 d=150 | lob n=4 rad=46 t=1 zone=slip zt=7 col=#bfe8ff m=0.3 cd=5 | beam wind=1 len=320 w=10 col=#9fe0ff m=1 cd=4',ev:[{k:'wave',every:7,col:'#60b0ff',say:'Scalding water surges across the floor!'}]},
    {hp:1.2,sc:2.5,introT:'Hissa boils it all — stay in the dry!',kit:'kite range=170 | ring spd=140 max=200 gap=1 col=#ffffff st=burn m=0.8 cd=4 | drain r=160 m=0.3 dur=2.5 col=#9fe0ff cd=6',ev:[{k:'geyser',every:5,n:3,rad:36,st:'burn',col:'#e0f4ff',say:'The water boils up!'}]}]);
  mk('forge_gjallr','fm_gjallr',[
    {hp:1,sc:2.5,introT:'Krag lumbers out of the crucible!',kit:'lumber | slam r=70 zone=burn zt=4 m=1.2 cd=3.2 | sweep r=62 arc=3.2 m=1.2 cd=2.6',ev:[{k:'marks',every:6,n:3,rad:24,col:'#ff9040',say:'Slag pours from the crucible!'}]},
    {hp:1.1,sc:2.6,introT:'Krag hurls molten boulders and shakes ore loose!',kit:'charge wind=0.6 mult=3.4 stun=1 kb=60 | lob n=2 rad=34 t=1 zone=burn zt=4 col=#ff7030 m=0.8 cd=2.8',ev:[{k:'marks',every:5,n:4,rad:22,col:'#c8a878',say:'Ore crashes from the roof!'}]},
    {hp:1.2,sc:2.8,bars:[{k:'plate',f:0.35,at:1}],introT:'Krag armours himself in cooling slag — break the shell!',kit:'lumber | slam r=80 zone=burn zt=4 m=1.4 cd=2.8 | ring spd=130 max=190 gap=1 col=#ff8040 st=burn m=0.7 cd=5',ev:[{k:'geyser',every:6,n:2,rad:34,st:'burn',col:'#ff7030',say:'The slag floor cracks!'}]}]);
  mk('forge_eimyrja','fm_eimyrja',[
    {hp:1,sc:2.3,introT:'Sinda rises from the chain throne!',kit:'kite range=170 | pull r=190 keep=30 m=0.4 cd=5 | lunge r=110 m=1.1 cd=3',ev:[{k:'marks',every:6,n:3,rad:24,col:'#ff5030',say:'Burning chains whip down!'}]},
    {hp:1.1,sc:2.4,introT:'Sinda chains the hall into lanes!',kit:'blink every=3.2 d=150 | beam wind=0.8 len=320 w=10 col=#ff6040 m=0.9 cd=3 | pull r=190 keep=26 m=0.5 cd=4',ev:[{k:'rift',every:7,say:'The chains drag you in!'}]},
    {hp:1.2,sc:2.6,bars:[{k:'ward',f:0.3,at:1}],introT:'Sinda wraps herself in chained spirits — free them with your magic!',kit:'chase | sweep r=70 arc=3.2 m=1.3 cd=2.4 | pull r=200 keep=26 m=0.5 cd=3.5 | shoot p=orb n=4 sp=0.25 spd=200 m=0.5 cd=2.6',ev:[{k:'marks',every:5,n:3,rad:26,col:'#ff7040',say:'Chains fall like rain!'}]}]);
})();

// ── the forge floors: winding mine galleries over lava (07zx ZSP layouts) ──
(function(){ if(typeof ZSP==='undefined')return; var kinds=['ember','cinder','slag','ash'];
  kinds.forEach(function(k,ki){ ZSP.T['forge_'+k]={n:'The '+k[0].toUpperCase()+k.slice(1)+' Forge',d:'Mine galleries over a lake of fire; the forge-master\'s hearth hall at the bottom.',liq:'lava',arena:[19,15],gen:function(c,fi,nf){ var R=c.R; c.fill(3);
      var P=[], x=6, y=R.i(10,c.H-11), n=10+R.i(0,3);
      for(var j=0;j<n;j++){ P.push([x,y]); var r=R.i(4,6); c.disc(x,y,r,1); if(R.chance(0.5))c.disc(x+R.i(-3,3),y+R.i(-3,3),r-2,5); for(var pp=0;pp<2;pp++)if(R.chance(0.55))c.set(x+R.i(-r+2,r-2),y+R.i(-r+2,r-2),6);
        x+=R.i(6,9); y+=R.i(-10,10)+(ki%2?3:-3); if(x>c.W-8)x=R.i(8,Math.round(c.W*0.35)); y=Math.max(7,Math.min(c.H-8,y)); }
      for(var j2=1;j2<n;j2++)c.line(P[j2-1][0],P[j2-1][1],P[j2][0],P[j2][1],1,R.chance(0.3)?4:2,3);
      for(var s=0;s<7;s++){ var b=P[R.i(0,n-1)], sx=Math.max(5,Math.min(c.W-6,b[0]+R.i(-11,11))), sy=Math.max(5,Math.min(c.H-6,b[1]+R.i(-11,11))); c.disc(sx,sy,R.i(2,4),1); c.line(b[0],b[1],sx,sy,1,2,3); } }}; });
  // the site records the painter reads (palette, element, void)
  var z0=ZSP.zsdSite; ZSP.zsdSite=function(id){ var m=/^forge_(ember|cinder|slag|ash)$/.exec(id||''); if(m){ var F=ZFORGE.byK(m[1]); return {id:id,type:'ember',name:F.name,q:4,floors:ZFORGE.FLOORS,el:'fire',pal:typeof ZSD!=='undefined'&&ZSD.basePal?ZSD.basePal('ember',null,'fire'):null}; } return z0.apply(ZSP,arguments); };
})();

// ── the items: the four Heartglasses ──
(function(){ if(typeof ITEMS==='undefined')return; var F=['','Ember','Cinder','Slag','Ash'], R=['','Grasslands','Wetlands','Highlands','Ashlands'];
  for(var q=1;q<=4;q++)ITEMS['heartglass_'+q]={name:F[q]+' Heartglass',icon:'💎',slot:'key',sell:0,tomeHint:'Made at the hearth of the '+F[q]+' Forge from the '+F[q]+' Soulglass Lattice laid in the '+F[q]+' Hearth Tray',desc:'The '+R[q]+'\' freed light, given its true form in the heart of the '+F[q]+' Forge. Four Heartglasses and the Sovereign staff become the Lodestar at Muspelheim\'s great hearth.'}; })();

// ── hooks: floor 1 (the old challenge) leads down; the Dungeon learns the forge ──
setTimeout(function(){
  ['VolcanoMazeScene','VolcanoBulletHellScene','VolcanoPuzzleScene','VolcanoEscapeScene'].forEach(function(cn){ var C; try{ C=eval(cn); }catch(e){ return; } if(!C||!C.prototype)return; var P=C.prototype;
    var g0=P._grantKey; if(g0)P._grantKey=function(){ var ps=this.worldScene.playerState, had=(ps.inventory||[]).indexOf(this.keyId)>=0, forge=ZFORGE.on&&this.site&&ZFORGE.F[this.site.id]&&!had;
      var r=g0.apply(this,arguments); if(forge){ var i=ps.inventory.indexOf(this.keyId); if(i>=0)ps.inventory.splice(i,1); this._forgeDown=true; showNotif('🔥 The chest holds no key — a rune-plate. The way down into the forge opens: back to the door!','#ffb070'); if(this.hintTxt)this.hintTxt.setText('The way down is open — TAB on the 🚪 door.'); if(this.worldScene._emitUI)this.worldScene._emitUI(); } return r; };
    var e0=P._exitToWorld; if(e0)P._exitToWorld=function(){ if(this._forgeDown&&ZFORGE.descend(this))return; return e0.apply(this,arguments); }; });
  if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var i0=D.init; D.init=function(d){ var r=i0.apply(this,arguments); this._forge=!!(d&&d.site&&d.site.forge); return r; };
  var gb=D._getBossKey; D._getBossKey=function(){ var F=ZFORGE.of(this); return F?F.boss:gb.apply(this,arguments); };
  // the forge-master: phase 1 from its phase table too (warded), so all three phases run in place
  var sm=D._spawnMonster; D._spawnMonster=function(key,x,y,isBoss,mult){ var F=ZFORGE.of(this); if(F&&key===F.boss&&isBoss){ var L=BossPhases.spawn(this,key,1,x,y,mult||1); L.forEach(function(m){ m.sovWard=true; }); if(L[0])showNotif('🔥 '+L[0].def.name+' guards the hearth of the '+F.name+'! (Warded by Muspelheim — Sovereign bites deep.)','#ffb070'); return L[0]||null; } var m=sm.apply(this,arguments); return m; };
  var ob=D._onBossDefeated; D._onBossDefeated=function(mon){ var F=ZFORGE.of(this); if(!F)return ob.apply(this,arguments); var self=this, key=F.boss, ph=this._bossPhase||1;
    var alive=(this._bossGroup||[]).filter(function(m){ return !m.dead&&m!==mon; }); if(alive.length)return;
    if(ph<BossPhases.count(key)){ var P=BOSS_PHASES[key].phases[ph]; this.cameras.main.flash(500,255,200,150); this.cameras.main.shake(600,0.01); showNotif('⚡ '+P.introT,'#ffb060'); var x=mon.x, y=mon.y;
      setTimeout(function(){ if(!self.sys||!self.monsters||!self.sys.displayList)return; var L=BossPhases.spawn(self,key,ph+1,x,y,1); L.forEach(function(m){ m.sovWard=true; }); },1100); return; }
    BossPhases.hud(this,false); if(typeof BossMoments!=='undefined')try{ BossMoments.finale(this,mon); }catch(e){} this._bossDefeated=true;
    var bc=this.interactables.find(function(i){ return i.type==='boss_chest'; }); if(bc)bc.locked=false; if(this._portalOpen)this._portalOpen();
    showNotif('🏆 '+mon.def.name+' falls! The hearth of the '+F.name+' blazes open — and the portal chest holds the key.','#ffdd44'); };
  var bi=D._buildInteractables; D._buildInteractables=function(){ var r=bi.apply(this,arguments); if(this._forge){ try{ ZFORGE.placeSpirits(this); if(this.floor>=1&&!this.isLastFloor&&typeof ZGANG!=='undefined')ZGANG.place(this,2); ZFORGE.placeHearth(this); showNotif('🔥 The '+ZFORGE.of(this).name+' — '+ZFORGE.HALLS[this.floor]+' ('+(this.floor+1)+' / '+ZFORGE.FLOORS+')','#ffb070'); }catch(e){ console.warn('forge',e); } } return r; };
  var it=D._interact; D._interact=function(){ var self=this; if(this._forge){ var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
      if(near&&near.type==='forge_spirit'){ ZFORGE.freeSpirit(this,near); return; } if(near&&near.type==='forge_hearth'){ ZFORGE.hearth(this); return; }
      if(near&&near.type==='stairs_up'&&this.floor===0){ this._exitToWorld(null); return; } } return it.apply(this,arguments); };
  var up=D._updateInteractPrompt; D._updateInteractPrompt=function(){ var r=up.apply(this,arguments), self=this; if(!this._forge||!this.interactPrompt)return r;
    var near=this.interactables.find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; }); if(!near)return r;
    if(near.type==='forge_spirit')this.interactPrompt.setText('[Tab] Break '+near.name+'\'s chains').setPosition(this.px,this.py-52).setVisible(true);
    else if(near.type==='forge_hearth')this.interactPrompt.setText(this._bossDefeated?'[Tab] The hearth — lay the lattice in its tray':'The hearth (beat the forge-master)').setPosition(this.px,this.py-52).setVisible(true);
    else if(near.type==='stairs_up'&&this.floor===0)this.interactPrompt.setText('[Tab] Climb out of the forge').setPosition(this.px,this.py-52).setVisible(true);
    return r; };
  var oc=D._openBossChest; D._openBossChest=function(){ if(this._forge)return ZFORGE.claim(this); return oc.apply(this,arguments); };
  // round 60: the forge's own monsters — its two (55 %), the other forges' (20 %), the Ashlands' dungeon roster (25 %); the Mouth is theirs alone
  var rs=D._spawnRosterMonster; D._spawnRosterMonster=function(mx,my){ var F=ZFORGE.of(this); if(!F||!ZFORGE.MONS[F.k])return rs.apply(this,arguments);
    var r=Math.random(), own=ZFORGE.MONS[F.k], all=[].concat.apply([],Object.keys(ZFORGE.MONS).map(function(k){ return ZFORGE.MONS[k]; })), id=null;
    if(r<0.55||this.floor===0)id=own[Math.floor(Math.random()*own.length)]; else if(r<0.75)id=all[Math.floor(Math.random()*all.length)];
    if(!id||!MON_BY_ID[id])return rs.apply(this,arguments); var mon=MX.spawn(this,id,mx,my,{q:4}); if(mon){ mon.isBoss=false; mon.maxHp=Math.round(mon.maxHp*1.35); mon.hp=mon.maxHp; if(mon._hp!==undefined)mon._hp=mon.maxHp; this.monsters.push(mon); } return mon; };
},0);

// ── the journal: each open forge — its spirits freed, its Heartglass, its key ──
(function(){ if(typeof ZROLL==='undefined'||!ZROLL.questHTML)return; var q0=ZROLL.questHTML;
  ZROLL.questHTML=function(ps){ var h=q0.apply(ZROLL,arguments); if(!ps||typeof _finalQuestUnlocked!=='function'||!_finalQuestUnlocked(ps))return h;
    var g='<div class="qgrp" style="border:1px solid rgba(255,140,60,.4);background:rgba(60,20,10,.25);margin-bottom:14px"><div class="qgrp-hdr" style="color:#ffb070">🔥 The Forges of Muspelheim</div>';
    Object.keys(ZFORGE.F).forEach(function(vid){ var F=ZFORGE.F[vid], fr=(ps.forgeFreed||[]).filter(function(x){ return x.indexOf(F.k+'_')===0; }).length, hg=(ps.inventory||[]).indexOf('heartglass_'+F.q)>=0, done=(ps.forgesDone||[]).indexOf(vid)>=0;
      g+='<div class="qitem '+(done&&hg?'qdone':'')+'"><div class="qico">'+['','🌿','💧','⛰','🔥'][F.q]+'</div><div class="qinf"><div class="qtit">'+F.name+(done?' ✓':'')+'</div><div class="qdesc">Spirits freed '+fr+' / '+(ZFORGE.PER*2)+' · Heartglass '+(hg?'✓':'— lattice + tray at its hearth')+' · '+(done?'key won':'the forge-master waits on the fourth floor')+'</div></div></div>'; });
    return h+g+'</div>'; }; })();

// ── round 60: the world's forge door goes straight into the painted forge (the old challenge scenes are no longer used) ──
setTimeout(function(){ if(typeof WorldScene==='undefined')return; var W=WorldScene.prototype, en0=W._enterSite; W._enterSite=function(site){
    if(ZFORGE.on&&site&&site.type==='volcano_mini'&&ZFORGE.F[site.id]){ var need=typeof _forgeNeeds==='function'?_forgeNeeds(site.id):null;
      if(need&&(this.playerState.inventory||[]).indexOf(need)<0){ var prevId=VOLC_ORDER[VOLC_ORDER.indexOf(site.id)-1]; (this._showNotif?this._showNotif.bind(this):showNotif)('🔒 '+VOLC_NAMES[site.id]+' is sealed — it opens with the '+((ITEMS[need]||{}).name||'key')+' from the '+VOLC_NAMES[prevId]+'.','#ff8844'); return; }
      ZFORGE.enter(this,site.id,0); return; }
    return en0.apply(this,arguments); }; },0);

// ── round 60 (Kris, Saga art: "image is good, but the flames moving needs to be in the image, not with an overlayed drawn art"): no drawn fire or
// steam over the hearths any more — the painted 4-frame loop of each hearth plays in its place (wave 62, fa_hearth_<k>), else the still painting ──
(function(){ if(typeof ZFORGE==='undefined')return; ZFORGE.alive=function(sc,k,im){ if(!im||typeof ZWE==='undefined')return; var A=ZWE.animTex(sc,'fa_hearth_'+k); if(!A)return;
    var s=sc.add.sprite(im.x,im.y,A.key,'0').setOrigin(im.originX,im.originY).setDepth(im.depth); s.setDisplaySize(im.displayWidth,im.displayHeight); try{ s.play(A.key); }catch(e){} im.setVisible(false); im._zanim=s; };
  if(typeof ZWE!=='undefined'){ ZWE.LOOP=ZWE.LOOP||{}; ['ember','cinder','slag','ash','great'].forEach(function(k){ ZWE.LOOP['fa_hearth_'+k]=6; }); }
  if(typeof ZGREEN!=='undefined')ZGREEN.REMAKE.guard=1; })();
