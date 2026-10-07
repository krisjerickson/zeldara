// ═══════════════════════════════════════════════════════════════════════
// ║ PURPOSE CAMPS (Phase 4b) — two thirds of the world's monsters now
// ║ guard something: a campfire (food pops out), a chest, a healing well,
// ║ a moonwell (mana), a shrine (a 2-minute buff), a rune stone (XP), a
// ║ hunter's rack (arrows) or a nest/hoard (gems). 15 themed camp types per
// ║ quadrant. Beat every guard → a fanfare + confetti and the reward is
// ║ yours. Food, wells, moonwells, shrines and racks come back after ~10
// ║ minutes (new guards); chests, gems and rune stones are one-time.
// ║ The last third of the monsters still roam freely.
// ═══════════════════════════════════════════════════════════════════════
// camp data + prop art live in 07z-camp-art.js (shared with the Design Lab's Monster Camps tab)
function _campLootTex(scene,item){ var a=CAMP_ITEM_ART[item]||'coin', name=Array.isArray(a)?a[0]:a, tint=Array.isArray(a)?a[1]:null, key='loot_'+name+(tint||''); if(scene.textures.exists(key))return key;
  // painted loot (round 31): a 64 px picture shown at half size; gems keep one painted colour
  var Zs=_scn(), zid=Zs&&{meat:'lt_meat',gem:'lt_gem',arrows:'lt_arrows',potion:'lt_potion',coin:'lt_gold',bread:'it_bread',jar:'it_jar'}[name]; if(zid&&Zs.has(zid)){ var zk='lootz_'+name; if(!scene.textures.exists(zk)){ var zc=mkCanvas(64,64), zx=zc.getContext('2d'), zs=Zs.size(zid,0), zf=Math.min(2,52/Math.max(zs.w,zs.h)); softShadow(zx,32,52,zs.w*zf*0.45,4,0.35); Zs.draw(zx,zid,32,54,zs.h*zf); scene.textures.addCanvas(zk,zc); try{ scene.textures.get(zk).setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} } return zk; }
  var G=_msGrid(); CAMP_LOOT_ART[name](G,tint); _msShadeOutline(G); var cv=mkCanvas(32,32), x=cv.getContext('2d'); for(var k=0;k<1024;k++){ if(G.c[k]){ x.fillStyle=G.c[k]; x.fillRect(k%32,(k/32)|0,1,1); } } for(var k2=0;k2<1024;k2++){ if(G.o[k2]){ x.fillStyle=G.o[k2]; x.fillRect(k2%32,(k2/32)|0,1,1); } }
  var tx=scene.textures.addCanvas(key,cv); tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; }

// ── celebration: fanfare + confetti + banner ──
var SFX={ ctx:null, ac:function(){ try{ if(!SFX.ctx){ var C=window.AudioContext||window.webkitAudioContext; if(!C)return null; SFX.ctx=new C(); } if(SFX.ctx.state==='suspended')SFX.ctx.resume(); return SFX.ctx; }catch(e){ return null; } },
  tone:function(f,t0,dur,type,vol){ var a=SFX.ac(); if(!a)return; var o=a.createOscillator(), g=a.createGain(); o.type=type||'triangle'; o.frequency.value=f; g.gain.setValueAtTime(0,a.currentTime+t0); g.gain.linearRampToValueAtTime(vol||0.12,a.currentTime+t0+0.02); g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+t0+dur); o.connect(g); g.connect(a.destination); o.start(a.currentTime+t0); o.stop(a.currentTime+t0+dur+0.05); },
  fanfare:function(){ [[523,0],[659,0.1],[784,0.2],[1047,0.32]].forEach(function(n){ SFX.tone(n[0],n[1],0.35,'triangle',0.11); }); SFX.tone(1568,0.46,0.5,'sine',0.06); SFX.tone(784,0.46,0.6,'square',0.025); },
  pickup:function(){ SFX.tone(880,0,0.12,'sine',0.07); SFX.tone(1320,0.06,0.14,'sine',0.05); } };
function campCelebrate(scene,x,y,title,sub){
  SFX.fanfare();
  var cols=[0xffd040,0xff6080,0x60e0ff,0x80ff80,0xc080ff,0xffffff];
  if(scene.textures.exists('dot')){ var em=scene.add.particles(x,y-10,'dot',{speed:{min:80,max:220},angle:{min:200,max:340},gravityY:260,lifespan:{min:700,max:1300},scale:{start:1.1,end:0.3},tint:cols,emitting:false}).setDepth(WR_DEPTH(y)+2); em.explode(60); scene.time.delayedCall(1600,function(){ em.destroy(); }); }
  for(var i=0;i<3;i++){ (function(i){ var c=scene.add.circle(x,y,6,0xffe080,0).setStrokeStyle(3,0xffe080,0.9).setDepth(WR_DEPTH(y)+2); scene.tweens.add({targets:c,radius:70+i*30,alpha:0,duration:700+i*200,delay:i*120,onComplete:function(){ c.destroy(); }}); })(i); }
  var b=document.getElementById('camp-banner'); if(!b){ b=document.createElement('div'); b.id='camp-banner'; (document.getElementById('app')||document.body).appendChild(b); }
  b.innerHTML='<div class="cb-t">✨ '+title+' ✨</div><div class="cb-s">'+(sub||'')+'</div>'; b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); clearTimeout(b._t); b._t=setTimeout(function(){ b.classList.remove('on'); },3200);
}

Object.assign(WorldScene.prototype,{
  _campTex(kind,tint){ var key='camp_'+kind+(tint?'_'+tint.slice(1):''); if(this.textures.exists(key))return key;
    // painted camp props (round 30): three 128 px frames like the drawn ones (0, 1 = in use; 2 = spent: fire out, chest open, the others dimmed)
    var Zs=_scn(), pid='cp_'+kind; if(Zs&&!tint&&Zs.has(pid)){ var F=128, pc=mkCanvas(F*3,F), px=pc.getContext('2d'), sz=Zs.size(pid,0), k=Math.min(F*0.94/sz.h,F*0.96/sz.w), alt={campfire:'cp_campfire_out',chest:'cp_chest_open'}[kind];
      for(var fi=0;fi<3;fi++){ var use=fi===2&&alt&&Zs.has(alt)?alt:pid, s2=Zs.size(use,0); if(fi===2&&use===pid){ px.save(); px.filter='grayscale(0.7) brightness(0.72)'; }
        softShadow(px,fi*F+F/2,F*0.9-2,F*0.3,F*0.06,0.38); Zs.draw(px,use,fi*F+F/2,F*0.9,s2.h*k); if(fi===2&&use===pid)px.restore(); }
      var pt=this.textures.addCanvas(key,pc); for(var pf=0;pf<3;pf++)pt.add(String(pf),0,pf*F,0,F,F); try{ pt.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; }
    var fr=_campPropFrames(kind,tint), cv=mkCanvas(96,32), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*32,0); });
    var tx=this.textures.addCanvas(key,cv); for(var i=0;i<3;i++)tx.add(String(i),0,i*32,0,32,32); tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; },
  // build every camp (two thirds of the monsters); returns guards per region
  _initCamps(rng){ var self=this, wd=this.wd, ps=this.playerState, done=(ps.campsDone=ps.campsDone||{});
    this._camps=[]; var guards={1:0,2:0,3:0,4:0};
    for(var sec=1;sec<=4;sec++){ var types=CAMP_TYPES[sec], want=33, made=0, tries=0;
      while(made<want&&tries++<3000){ var pc=self._randLand(rng,sec); if(!pc)continue; var tx=pc.tx, ty=pc.ty;
        if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+16||self._nearSafeSpot(tx,ty,14))continue;
        if(self._camps.some(function(c){ return Math.hypot(c.tx-tx,c.ty-ty)<16; }))continue;
        var ok=true; for(var yy=-2;yy<=2&&ok;yy++)for(var xx=-2;xx<=2;xx++){ var t=self.tiles[ty+yy]&&self.tiles[ty+yy][tx+xx]; if(t===undefined||ALWAYS_BLOCKED.has(t)||getTileSection(tx+xx,ty+yy)!==sec){ ok=false; break; } }
        if(!ok)continue;
        var T0=types[made%types.length], id='c'+sec+'_'+made; this._makeCamp(sec,tx,ty,T0,id,rng,guards); made++; } }
    return guards; },
  // one camp: its prop, glow and 3–5 guards from the quadrant roster (also used by the islands, 13)
  _makeCamp(sec,tx,ty,T0,id,rng,guards){
    var x=tx*TILE+TILE/2, y=ty*TILE+TILE/2, self=this, done=(this.playerState.campsDone=this.playerState.campsDone||{});
        var C={id:id,T:T0,sec:sec,tx:tx,ty:ty,x:x,y:y,guards:[],state:'guarded',loot:[],t:0};
        C.spr=this.add.image(x,y+14,this._campTex(T0.prop,T0.tint),'0').setOrigin(0.5,0.9).setDepth(WR_DEPTH(y)); C.spr.setScale(1.7*32/C.spr.frame.width*(C.spr.frame.width>32&&_scn()?_scn().K:1));   // painted props are 128 px frames (04h)
        if(/campfire|lantern|moonwell|well|obelisk|shrine|cauldron|crystal|totem/.test(T0.prop)&&CHX.glow(this)){ C.glow=this.add.image(x,y+2,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(T0.tint||(T0.prop==='campfire'?'#ff9040':'#ffe8a0'))).setAlpha(0.45).setScale(T0.prop==='campfire'?1.1:0.8).setDepth(WR_DEPTH(y)-0.001); C.glow._base={x:x,y:y,r:70,a:0.45,noCut:false}; }
        if(done[id]){ C.state='spent'; if(C.spr)C.spr.setFrame('2'); if(C.glow)C.glow.setVisible(false); this._camps.push(C); return C; }
        var n=Math.max(2,Math.min(7,3+Math.floor(rng.next()*3)+ZDiff.cur().guards)); for(var i=0;i<n;i++){ var a=i/n*Math.PI*2+rng.next()*0.4, gx=x+Math.cos(a)*(42+rng.next()*14), gy=y+Math.sin(a)*(30+rng.next()*10);
          if(!self._canGoMonster(gx,gy)){ gx=x+Math.cos(a)*24; gy=y+Math.sin(a)*18; }
          var pick=null; for(var k=0;k<8&&(!pick||MON_LEGACY[pick.R.id]);k++)pick=monPick(rng,sec,'main');
          if(!pick||MON_LEGACY[pick.R.id])continue;
          var mon=this._spawnRosterMon(pick.R.id,gx,gy,sec,rng,{alpha:i===0&&n>=ZDiff.cur().alphaAt}); if(!mon)continue;
          mon.campId=id; mon.leashR=80; mon.campHome={x:x,y:y,r:TILE*8,leash:90}; C.guards.push(mon); if(guards)guards[sec]=(guards[sec]||0)+1; }
    this._camps.push(C); return C; },
  _campGuardDied(mon){ var C=this._camps&&this._camps.find(function(c){ return c.id===mon.campId; }); if(!C||C.state!=='guarded')return;
    if(C.guards.some(function(g){ return !g.dead; })){ var left=C.guards.filter(function(g){ return !g.dead; }).length; if(left<=2)this._floatText(C.x,C.y-40,left+' guard'+(left>1?'s':'')+' left','#ffe9a8'); return; }
    this._campCleared(C); },
  _campCleared(C){ var R=C.T.r, self=this, ps=this.playerState, q=C.sec; C.state='open'; C.clearedAt=Date.now();
    if(typeof Tome!=='undefined')Tome.see('place','camp_'+C.T.id);
    var sub={food:'Food is up for grabs!',chest:'The chest is unguarded — [Tab] to open it',well:'The spring is free — [Tab] to drink and heal',mana:'The waters are free — [Tab] to restore mana',buff:'The shrine is free — [Tab] for its blessing',xp:'The stone is free — [Tab] to read its runes',ammo:'Arrows lie ready to collect!',gems:'Gems glitter where the guards stood!'}[R.k];
    campCelebrate(this,C.x,C.y,C.T.name+' cleared!',sub);
    if(R.k==='food'){ for(var i=0;i<(R.n||3);i++)this._campDrop(C,R.items[i%R.items.length],'item'); }
    if(R.k==='ammo')this._campDrop(C,R.id,'ammo',R.qty);
    if(R.k==='gems'){ for(var j=0;j<(R.n||1);j++)this._campDrop(C,R.items[j%R.items.length],'item'); if(R.gold)this._campDrop(C,'coin','gold',R.gold[0]+Math.floor(Math.random()*(R.gold[1]-R.gold[0]+1))); ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; }
    if(C.spr&&(R.k==='chest'||R.k==='well'||R.k==='mana'||R.k==='buff'||R.k==='xp'))C.spr.setFrame('1'); },
  _campDrop(C,item,kind,qty){ var a=Math.random()*Math.PI*2, d=22+Math.random()*26, x=C.x+Math.cos(a)*d, y=C.y+Math.sin(a)*d*0.7+8;
    var lk=_campLootTex(this,item), im=this.add.image(C.x,C.y,lk).setScale(lk.indexOf('lootz_')===0?0.65:1.3).setDepth(WR_DEPTH(y)+0.01), self=this;
    this.tweens.add({targets:im,x:x,duration:500,ease:'Sine.out'}); this.tweens.add({targets:im,y:{from:C.y-10,to:y},duration:500,ease:'Bounce.out'});
    var gl=this.textures.exists('glow')?this.add.image(x,y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xfff0a0).setAlpha(0.35).setScale(0.35).setDepth(WR_DEPTH(y)):null;
    if(gl)this.tweens.add({targets:gl,alpha:0.12,duration:700,yoyo:true,repeat:-1});
    C.loot.push({im:im,gl:gl,x:x,y:y,item:item,kind:kind,qty:qty||1,born:Date.now()}); },
  _campTick(dt){ if(!this._camps||!this.player)return; var self=this, px=this.player.x, py=this.player.y, ps=this.playerState, near=null, nearLoot=null, inFire=null;
    this._campT=(this._campT||0)+dt;
    this._camps.forEach(function(C){ var d=Math.hypot(px-C.x,py-C.y);
      if(d<900&&C.spr&&C.state!=='spent'&&/campfire|lantern|moonwell|obelisk|crystal|totem|cauldron/.test(C.T.prop)){ var f=Math.floor(self._campT*4+C.x)%2; if(C.state==='guarded'||C.T.prop==='campfire'||C.T.prop==='lantern')C.spr.setFrame(String(f)); }
      // a lit campfire burns you (unless you ride the Lava Unicorn or a dragon)
      if(C.T.prop==='campfire'&&C.state!=='spent'&&Math.hypot(px-C.x,py-(C.y+8))<20)inFire=C;
      // pick-ups: walk over them
      for(var i=C.loot.length-1;i>=0;i--){ var L=C.loot[i]; if(Date.now()-L.born<600)continue; if(Math.hypot(px-L.x,py-L.y)<26){ self._campCollect(C,L); C.loot.splice(i,1); } }
      if(C.state==='open'&&d<TILE*1.8&&/chest|well|mana|buff|xp/.test(C.T.r.k))near=C;
      if(C.state!=='guarded'&&C.loot.length&&d<TILE*4&&(!nearLoot||d<nearLoot._d)){ nearLoot=C; C._d=d; }
      // respawn food / wells / shrines / racks after a while (when you're far away)
      if((C.state==='open'||C.state==='used')&&C.T.r.k!=='chest'&&C.T.r.k!=='gems'&&C.T.r.k!=='xp'&&Date.now()-C.clearedAt>CAMP_RESPAWN_S*1000&&d>TILE*30)self._campRespawn(C); });
    this._fireTick(dt,!!inFire&&!_fireSafeMount(ps));
    // [Tab] at an open chest / well / shrine / stone — or to scoop up everything a cleared camp dropped
    if(!near&&nearLoot){ var nL=nearLoot.loot.length; if(!this._campPrompt||this._campPrompt._c!==nearLoot||this._campPrompt._n!==nL){ if(this._campPrompt)this._campPrompt.destroy();
        this._campPrompt=domText(this,nearLoot.x,nearLoot.y-46,'[Tab] Collect loot ('+nL+')',{fontSize:'10px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); this._campPrompt._c=nearLoot; this._campPrompt._n=nL; }
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB)){ var CL=nearLoot; CL.loot.slice().forEach(function(L){ self._campCollect(CL,L); }); CL.loot=[]; if(this._campPrompt){ this._campPrompt.destroy(); this._campPrompt=null; } } }
    else if(near){ if(!this._campPrompt||this._campPrompt._c!==near||this._campPrompt._n!==undefined){ if(this._campPrompt)this._campPrompt.destroy(); var verb={chest:'Open chest',well:'Drink (heal)',mana:'Drink (mana)',buff:'Receive blessing',xp:'Read the runes'}[near.T.r.k];
        this._campPrompt=domText(this,near.x,near.y-46,'[Tab] '+verb,{fontSize:'10px',color:'#ffe9a8',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3}).setOrigin(.5,1).setDepth(20); this._campPrompt._c=near; }
      if(Phaser.Input.Keyboard.JustDown(this.keys.TAB))this._campUse(near); }
    else if(this._campPrompt){ this._campPrompt.destroy(); this._campPrompt=null; } },
  // campfire burn: 5% max HP per second while in the flames, then the 3 s burn (10-scene-world)
  _fireTick(dt,on){ var ps=this.playerState, p=this.player; if(!on){ this._fireAcc=0; this._inFire=false; return; } if(ps.godMode||ps.hp<=0)return;
    if(!this._inFire){ this._inFire=true; this._fireAcc=1; showNotif('🔥 The campfire burns you! (the Lava Unicorn or a dragon mount keeps you safe)','#ff9060'); }
    this._burnTime=3; this._fireAcc+=dt; if(this._fireAcc<1)return; this._fireAcc-=1;
    var d=Math.max(2,Math.round(ps.maxHp*0.05)); ps.hp=Math.max(0,ps.hp-d); this._floatText(p.x,p.y-28,'-'+d+' 🔥','#ff6a20');
    var fl=document.getElementById('damage-flash'); if(fl){ fl.style.opacity='0.18'; clearTimeout(this._flashT); this._flashT=setTimeout(function(){ fl.style.opacity='0'; },280); }
    this._emitUI(); if(ps.hp<=0)this._worldPlayerDied(); },
  _campCollect(C,L){ var ps=this.playerState; SFX.pickup(); if(L.gl)L.gl.destroy(); var im=L.im; this.tweens.add({targets:im,y:im.y-24,alpha:0,duration:350,onComplete:function(){ im.destroy(); }});
    if(L.kind==='gold'){ ps.gold+=L.qty; this._floatText(L.x,L.y-20,'+'+L.qty+'g','#ffd700'); }
    else if(L.kind==='ammo'){ ps.ammo=ps.ammo||{}; ps.ammo[L.item]=(ps.ammo[L.item]||0)+L.qty; this._floatText(L.x,L.y-20,'+'+L.qty+' '+(ITEMS[L.item]?ITEMS[L.item].name:L.item),'#ffe9a8'); }
    else { ps.inventory=ps.inventory||[]; ps.inventory.push(L.item); var I=ITEMS[L.item]; this._floatText(L.x,L.y-20,'+ '+(I?I.name:L.item),'#ffe9a8'); if(typeof Tome!=='undefined')Tome.see('item',L.item); }
    this._emitUI(); },
  _campUse(C){ var R=C.T.r, ps=this.playerState, q=C.sec; SFX.pickup();
    if(R.k==='chest'){ var g=R.gold[0]+Math.floor(Math.random()*(R.gold[1]-R.gold[0]+1)); ps.gold+=g; this._floatText(C.x,C.y-44,'+'+g+'g','#ffd700');
      var it=R.items[Math.floor(Math.random()*R.items.length)], it2=R.items[Math.floor(Math.random()*R.items.length)]; this._campDrop(C,it,ITEMS[it]&&ITEMS[it].type==='ammo'?'ammo':'item',ITEMS[it]&&ITEMS[it].qty); if(it2!==it)this._campDrop(C,it2,ITEMS[it2]&&ITEMS[it2].type==='ammo'?'ammo':'item',ITEMS[it2]&&ITEMS[it2].qty);
      ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; C.state='spent'; if(C.spr)C.spr.setFrame('2'); showNotif('💰 '+C.T.name+': '+g+' gold and treasure!','#ffd700'); }
    else if(R.k==='well'){ ps.hp=ps.maxHp; this._floatText(C.x,C.y-44,'Fully healed!','#80ff90'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='mana'){ ps.mana=ps.maxMana; this._floatText(C.x,C.y-44,'Mana restored!','#9fc8ff'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='buff'){ _heroBuffApply(ps,R.b,120000); this._floatText(C.x,C.y-44,{atkUp:'ATK +25%',defUp:'DEF +25%',spdUp:'SPD +25%'}[R.b]+' for 2 min','#ffe8a0'); C.state='used'; if(C.glow)C.glow.setAlpha(0.15); }
    else if(R.k==='xp'){ var xp=R.xp; ps.xp+=xp; this._floatText(C.x,C.y-44,'+'+xp+' XP — ancient knowledge','#aaddff'); this._checkLevelUp(ps); ps.campsDone=ps.campsDone||{}; ps.campsDone[C.id]=1; C.state='spent'; if(C.spr)C.spr.setFrame('2'); if(C.glow)C.glow.setVisible(false); }
    if(this._campPrompt){ this._campPrompt.destroy(); this._campPrompt=null; } this._emitUI(); },
  _campRespawn(C){ var self=this; C.state='guarded'; C.clearedAt=0; if(C.spr)C.spr.setFrame('0'); if(C.glow)C.glow.setVisible(true).setAlpha(0.45);
    C.loot.forEach(function(L){ L.im.destroy(); if(L.gl)L.gl.destroy(); }); C.loot=[];
    C.guards.forEach(function(m){ m.dead=false; if(m.mx)MX.reset(m); m.hp=m.maxHp; m.x=m.spawnX; m.y=m.spawnY; m.cont.setPosition(m.x,m.y).setAlpha(1).setScale(1); if(m.hpFill)m.hpFill.displayWidth=28; }); }
});
