// ═══════════════════════════════════════════════════════════════════════
// ║ MONSTER ENGINE (Phase 4) — one engine for the world, dungeons and
// ║ towers. Every roster monster (07m–07q) gets a KIT (07r): a movement
// ║ module, attack modules and defence modules. Scenes plug in through a
// ║ small adapter (MX.A). Projectiles, telegraphs, zones, traps and the
// ║ player's status effects (slow, root, poison, burn, blind, reverse,
// ║ shrink, mark) all live here.
// ═══════════════════════════════════════════════════════════════════════
var MX_PROJ_BLOCK=(typeof SIGHT_BLOCK_TILES!=='undefined')?SIGHT_BLOCK_TILES:new Set([T.ROCK,T.LARGE_BOULDER,T.BUILDING_WALL,T.CLIFF,T.PROP,T.TREE]);   // = the shared sight rule (09-hero-core)
var MON_BY_ID={}; (typeof MON_ROSTER!=='undefined'?MON_ROSTER:[]).forEach(function(R){ MON_BY_ID[R.id]=R; });
var MX={ KITS:(typeof MON_KIT_SRC!=='undefined'?MON_KIT_SRC:{}), log:null,
  // kit string: "move k=v | attack k=v | defence k=v"
  parse:function(s){ var parts=(s||'chase').split('|').map(function(t){ return t.trim(); }).filter(Boolean), out={move:null,atk:[],def:[]};
    parts.forEach(function(t,i){ var w=t.split(/\s+/), mod={name:w[0],p:{}}; w.slice(1).forEach(function(kv){ var q=kv.split('='); var v=q.length>1?q.slice(1).join('='):'1'; mod.p[q[0]]=isNaN(+v)?v:+v; });
      if(i===0&&MX.MOVE[mod.name])out.move=mod; else if(MX.ATK[mod.name])out.atk.push(mod); else if(MX.DEF[mod.name])out.def.push(mod); else if(MX.MOVE[mod.name])out.move=mod; });
    if(!out.move)out.move={name:'chase',p:{}}; return out; },
  kit:function(id){ var k=MX.KITS[id]; if(!k)return null; if(typeof k==='string')k=MX.KITS[id]=MX.parse(k); return k; },
  ev:function(mon,e){ if(MX.log&&mon){ (MX.log[mon.rid]=MX.log[mon.rid]||{})[e]=(MX.log[mon.rid][e]||0)+1; } },
  // ── stats by quadrant (visitors from another quadrant are scaled to local) ──
  stats:function(R,q){ q=q||R.q; var t=R.tier, pl=R.spec.plan;
    var hpF={brute:1.6,golem:1.7,construct:1.5,chesspiece:1.8,turtle:1.5,tree:1.5,drake:1.4,wisp:0.55,bat:0.6,swarm:0.7,small:0.7,book:0.6,orb:0.8,eye:0.8,caster:0.85,plant:0.9}[pl]||1;
    var spd={small:84,bat:90,wisp:70,bird:88,insect:66,spider:70,swarm:62,biped:58,brute:36,golem:30,construct:34,chesspiece:0,serpent:62,eel:60,blob:42,caster:48,plant:0,tree:0,frog:55,crab:52,quad:66,drake:70,turtle:34,book:64,eye:40,orb:30,wraith:56}[pl]; if(spd===undefined)spd=55;
    var lv=[1,8,15,22][q-1]+t-1;
    var hp=Math.round([16,46,88,150][q-1]*(0.75+0.18*t)*hpF*(R.seg==='tow'?0.9:1));
    var atk=Math.round([4,9,14,20][q-1]*(0.85+0.1*t)*(R.seg==='dun'&&R.role==='melee'?1.15:1));
    var df=[0,2,5,8][q-1]+(/armor|shield|shell|columns|crystals|stone/.test(R.spec.feat)?2:0)+(pl==='golem'||pl==='construct'?2:0);
    var r={brute:14,golem:14,construct:13,chesspiece:15,drake:13,turtle:13,tree:13}[pl]||(/small|wisp|bat|book|swarm/.test(pl)?8:10);
    return {lv:lv,hp:hp,atk:atk,def:df,spd:spd,r:r,xp:Math.round(hp*0.7+t*4),gMin:[2,6,10,16][q-1]*t,gMax:[5,12,20,30][q-1]*t};
  },
  // ── sprite texture: 4 frames of the pixel stand-in ──
  tex:function(scene,R){ var key='mx_'+R.id; if(scene.textures.exists(key))return key;
    var fr=msFrames(R.spec), cv=mkCanvas(128,32), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*32,0); });
    var tx=scene.textures.addCanvas(key,cv); for(var i=0;i<4;i++)tx.add(String(i),0,i*32,0,32,32);
    if(tx.setFilter)tx.setFilter(Phaser.Textures.FilterMode.NEAREST); return key; },
  scaleOf:function(R){ var pl=R.spec.plan; return {brute:1.7,golem:1.7,construct:1.6,chesspiece:1.9,drake:1.7,tree:1.7,turtle:1.6,small:1.15,wisp:1.2,bat:1.25,book:1.2,swarm:1.4,eye:1.3,orb:1.3}[pl]||1.45; }
};

// ── scene adapter ─────────────────────────────────────────────────────
MX.A=function(scene){ if(scene._mxA)return scene._mxA; var W=_isOverworld(scene), A={scene:scene,world:W};
  A.p=function(){ return W?{x:scene.player.x,y:scene.player.y}:{x:scene.px,y:scene.py}; };
  A.setP=function(x,y){ if(W){ if(scene._canGo(x,scene.player.y,scene.playerState.mount))scene.player.x=x; if(scene._canGo(scene.player.x,y,scene.playerState.mount))scene.player.y=y; scene.player.cont.setPosition(scene.player.x,scene.player.y); }
    else { if(scene._canGoD(x,scene.py))scene.px=x; if(scene._canGoD(scene.px,y))scene.py=y; scene.pCont.setPosition(scene.px,scene.py); } };
  A.ps=function(){ return W?scene.playerState:scene.worldScene.playerState; };
  A.ifr=function(){ return W?(scene.worldIFrames||0):(scene.playerIFrames||0); };
  A.setIfr=function(v){ if(W)scene.worldIFrames=v; else scene.playerIFrames=v; };
  A.list=function(){ return W?scene.worldMonsters:scene.monsters; };
  A.canGoM=function(x,y,mon,fly){ if(fly){ if(W){ var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE); if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H)return false; return Math.hypot(tx-CENTER_X,ty-CENTER_Y)>=VILLAGE_RADIUS; } return scene._canGoD(x,y); }
    return W?scene._canGoMonster(x,y):scene._canGoD(x,y); };
  A.projOk=function(x,y){ if(!W)return scene._canGoD(x,y); var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE); if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H)return false; var t=scene.tiles[ty]&&scene.tiles[ty][tx]; return !MX_PROJ_BLOCK.has(t); };
  A.isWater=function(x,y){ if(!W)return false; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), t=scene.tiles[ty]&&scene.tiles[ty][tx]; return t===T.SHALLOW_WATER||t===T.DEEP_WATER||t===T.LILY||t===T.REED; };
  A.isLava=function(x,y){ if(!W)return false; var tx=Math.floor(x/TILE), ty=Math.floor(y/TILE), t=scene.tiles[ty]&&scene.tiles[ty][tx]; return t===T.THIN_MAGMA||t===T.DEEP_MAGMA; };
  A.facing=function(){ var d=W?(scene.player.dir||'down'):(scene.pdir||'down'); return {right:[1,0],left:[-1,0],up:[0,-1],down:[0,1]}[d]||[0,1]; };
  A.los=function(x0,y0,x1,y1){ return typeof _heroLOS!=='function'||_heroLOS(scene,x0,y0,x1,y1); };
  A.night=function(){ return W?(scene._night||0):0; };
  A.depth=function(y){ return W?WR_DEPTH(y):(scene._lab?scene._yDepth(y):10); };
  A.float=function(x,y,t,c){ scene._floatText(x,y,t,c); };
  A.god=function(){ return !!A.ps().godMode; };
  A.hurt=function(raw,label,col,noIfr){ var ps=A.ps(); if(ps.godMode||ps.hp<=0)return false; if(!noIfr&&A.ifr()>0)return false; var P=A.p();
    var S=MX.S(scene), df=(W?scene.calcPlayerStats().def:(calcStatsFromState(ps).def||0))||0, dmg=Math.max(1,Math.round(raw)-Math.floor(df*0.6)); if(S.markT>0)dmg=Math.ceil(dmg*1.25);
    if(!noIfr)dmg=W?scene._applyShieldToDmg(dmg):_heroApplyShield(scene,ps,dmg,P.x,P.y); if(dmg<=0){ A.setIfr(0.4); return false; }
    ps.hp=Math.max(0,ps.hp-dmg); if(!noIfr)A.setIfr(0.6); A.float(P.x,P.y-30,'-'+dmg+(label?' '+label:''),col||'#ff4433');
    if(!noIfr){ var fl=document.getElementById('damage-flash'); if(fl){ fl.style.opacity='0.18'; clearTimeout(scene._flashT); scene._flashT=setTimeout(function(){fl.style.opacity='0';},300); } }
    if(W){ scene._homeCastHit=true; scene._emitUI(); if(ps.hp<=0)scene._worldPlayerDied(); } else { if(scene._updateDungeonHUD)scene._updateDungeonHUD(); if(ps.hp<=0)scene._playerDied(); }
    return true; };
  A.kill=function(mon){ mon._hp=0; if(W)scene._worldMonsterDied(mon); else scene._monsterDied(mon); };
  A.spawn=function(rid,x,y,o){ var mon=MX.spawn(scene,rid,x,y,Object.assign({temp:true},o||{})); if(!mon)return null; if(W){ mon.section=getTileSection(Math.floor(x/TILE),Math.floor(y/TILE))||1; mon.respawnTimer=0; } A.list().push(mon); return mon; };
  scene._mxA=A; scene.events.once('shutdown',function(){ scene._mxA=null; scene._mxs=null; scene._mxFx=null; });
  return A; };
// player status for a scene
MX.S=function(scene){ return scene._mxs||(scene._mxs={slowT:0,slowP:0,rootT:0,poisonT:0,poisonD:0,poisonAcc:0,blindT:0,revT:0,shrinkT:0,markT:0,frogT:0,still:0,lastP:null}); };
MX.status=function(A,st,dur,val){ if(!st)return; var S=MX.S(A.scene), P=A.p(); dur=dur||2;
  if(st==='slow'){ S.slowT=Math.max(S.slowT,dur); S.slowP=Math.max(S.slowT>0?S.slowP:0,val||0.4); A.float(P.x,P.y-44,'Slowed','#88ccff'); }
  else if(st==='root'||st==='freeze'){ S.rootT=Math.max(S.rootT,st==='freeze'?Math.min(dur,1.2):dur); A.float(P.x,P.y-44,st==='freeze'?'Frozen!':'Rooted!',st==='freeze'?'#a0e0ff':'#a0d070'); }
  else if(st==='poison'){ S.poisonT=Math.max(S.poisonT,dur); S.poisonD=Math.max(S.poisonD,val||1); A.float(P.x,P.y-44,'Poisoned','#90e060'); }
  else if(st==='burn'){ if(A.world){ A.scene._burnTime=Math.max(A.scene._burnTime||0,dur); A.scene._showFireOverlay&&A.scene._showFireOverlay(true); } else { S.poisonT=Math.max(S.poisonT,dur); S.poisonD=Math.max(S.poisonD,val||1); } A.float(P.x,P.y-44,'🔥 Burning','#ff8844'); }
  else if(st==='blind'||st==='dim'){ S.blindT=Math.max(S.blindT,dur); A.float(P.x,P.y-44,'Blinded','#9a9ab0'); }
  else if(st==='reverse'||st==='charm'){ S.revT=Math.max(S.revT,dur); A.float(P.x,P.y-44,'Charmed! (controls reversed)','#e0a8ff'); }
  else if(st==='shrink'){ S.shrinkT=Math.max(S.shrinkT,dur); A.float(P.x,P.y-44,'Shrunk! (-30% damage)','#ff90d0'); }
  else if(st==='mark'){ S.markT=Math.max(S.markT,dur); A.float(P.x,P.y-44,'Marked! (+25% damage taken)','#ffb060'); }
  else if(st==='frog'){ S.frogT=Math.max(S.frogT,dur); A.float(P.x,P.y-44,'🐸 Ribbit!','#80e060'); }
  else if(st==='sleep'||st==='drowsy'){ S.slowT=Math.max(S.slowT,dur); S.slowP=Math.max(S.slowP,0.3); A.float(P.x,P.y-44,'Drowsy…','#b0a0ff'); }
  else if(st==='steal'){ var ps=A.ps(), g=Math.min(ps.gold,val||10); ps.gold-=g; if(g)A.float(P.x,P.y-44,'-'+g+'g stolen!','#ffd700'); return g; }
  MX.ev({rid:'_player'},'st_'+st); };
// movement modifiers the scenes apply to the player
MX.moveMods=function(scene){ var S=scene._mxs; if(!S)return {mult:1,rev:false}; var m=1;
  if(S.rootT>0)m=0; else { if(S.slowT>0)m*=1-S.slowP; if(S.frogT>0)m*=0.6; }
  return {mult:m,rev:S.revT>0}; };
MX.blocked=function(scene,x,y){ var fx=scene._mxFx; if(!fx||!fx.walls.length)return false; for(var i=0;i<fx.walls.length;i++){ var w=fx.walls[i]; if(Math.abs(x-w.x)<w.w/2+6&&Math.abs(y-w.y)<w.h/2+6)return true; } return false; };
MX.dmgOut=function(scene){ var S=scene._mxs; return S&&S.shrinkT>0?0.7:1; };

// ── spawning ──────────────────────────────────────────────────────────
MX.spawn=function(scene,rid,x,y,o){ o=o||{}; var R=MON_BY_ID[rid]; if(!R)return null; var kit=MX.kit(rid); if(!kit)return null;
  var q=o.q||R.q, s=MX.stats(R,q), sc=MX.scaleOf(R)*(o.scale||1), A=MX.A(scene);
  if(o.stats)Object.assign(s,o.stats);
  if(o.hpMult){ s.hp=Math.round(s.hp*o.hpMult); } if(o.alpha){ s.hp=Math.round(s.hp*1.6); s.atk=Math.round(s.atk*1.3); sc*=1.2; }
  var cont=scene.add.container(x,y).setDepth(A.depth(y));
  var shadow=scene.add.ellipse(0,s.r*0.9+2,s.r*2.3,7,0x000000,.3);
  var lazy=!!(o.lazy&&typeof monLazyTex==='function');   // perf: name label + texture made on first wake (10f _monWake)
  var spr=scene.add.image(0,4,lazy?monLazyTex(scene):MX.tex(scene,R),'0').setOrigin(0.5,0.85).setScale(sc); if(lazy)spr._lazyR=R;
  var hpBg=scene.add.rectangle(0,-(32*sc*0.8+6),28,4,0x000000,.7), hpFill=scene.add.rectangle(-14,-(32*sc*0.8+6),28,4,0xff3333).setOrigin(0,.5);
  var lvCol=s.lv>=15?'#ff4444':s.lv>=10?'#ff8844':s.lv>=5?'#ffdd44':'#88ff88';
  var nameY=-(32*sc*0.8+14), nameS=(o.alpha?'Alpha ':'')+(o.name||R.name)+' Lv.'+s.lv;
  var nameT=lazy?null:scene.add.text(0,nameY,nameS,{fontSize:'7px',color:'#ffffff',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5); if(nameT)nameT.setColor(lvCol);
  cont.add(nameT?[shadow,spr,hpBg,hpFill,nameT]:[shadow,spr,hpBg,hpFill]);
  var col=parseInt(R.spec.pal[0].slice(1),16);
  spr.setFillStyle=function(c){ if(c===0xffffff)ZENG.tintFill(this,0xffffff); else if(c===undefined||c===col)this.clearTint(); else ZENG.tint(this,c); return this; };
  var mon={mx:true,rid:rid,R:R,kit:kit,cont:cont,body:spr,spr:spr,hpFill:hpFill,hpBg:hpBg,nameT:nameT,type:'mx_'+rid,
    def:{name:o.name||R.name,icon:'',r:s.r,color:col,xp:s.xp,gMin:s.gMin,gMax:s.gMax,atk:s.atk,def:s.def,spd:s.spd,sec:q,hp:s.hp,atkType:'mx',moveType:'mx'},
    maxHp:s.hp,_hp:s.hp,x:x,y:y,spawnX:x,spawnY:y,level:s.lv,monAtk:s.atk,monDef:s.def,dead:false,state:'wander',atkTimer:0,respawnTimer:0,
    temp:!!o.temp,alpha:!!o.alpha,tags:R.tags,_m:null,_scene:scene,_lazyVis:lazy?{name:[nameY,nameS,lvCol]}:null};
  Object.defineProperty(mon,'hp',{get:function(){ return this._hp; },set:function(v){ MX.onHp(this,v); },configurable:true,enumerable:true});
  MX.reset(mon); return mon; };
MX.reset=function(mon){ var k=mon.kit, m=mon._m={t:Math.random()*3,cd:{},busy:null,face:0,hidden:false,invuln:0,aggro:false,hurtT:0,frameT:0,strikeT:0,stunT:0,armor:0,revived:false,down:0,dodgeCd:0,hits:[],enraged:false,flee:false,children:[],vis:true};
  k.def.forEach(function(d){ if(d.name==='armor')m.armor=d.p.n||3; if(d.name==='spiritward')m.sward=d.p.n||3; });
  var mv=k.move.name; if(mv==='ambush'||mv==='disguise'||mv==='perch'||mv==='burrow'){ m.hidden=mv!=='perch'; m.lurk=true; }
  if(mv==='swim')m.sub=true;
  mon._hp=mon.maxHp; if(mon.cont){ mon.cont.setAlpha(1).setScale(1); } mon.hpFill&&(mon.hpFill.displayWidth=28); };

// ── damage taken (all scene damage code goes through mon.hp -= dmg) ──
MX.onHp=function(mon,v){ var m=mon._m, old=mon._hp, d=old-v; if(!m||d<=0){ mon._hp=Math.min(mon.maxHp,v); return; }
  var sc=mon._scene, A=sc&&sc._mxA, P=A?A.p():{x:mon.x,y:mon.y}, dist=Math.hypot(P.x-mon.x,P.y-mon.y), kind=MX._src||(dist<95?'melee':'ranged'), say=function(t,c){ if(A&&(m._sayT||0)<=0){ A.float(mon.x,mon.y-mon.def.r-18,t,c||'#bfe6ff'); m._sayT=0.5; } };
  m.hurtT=4; m.aggro=true; m.lastHit=kind;
  if(m.hidden||m.invuln>0||m.down>0){ d=0; say(m.hidden?'hidden':'immune'); }
  var defs=mon.kit.def;
  for(var i=0;i<defs.length&&d>0;i++){ var D=defs[i], p=D.p;
    // ── familiar counters (07rb) ──
    if(D.name==='spiritward'&&m.sward>0){ if(kind==='familiar'){ d=0; say('spirit ward','#c8b0ff'); MX.ev(mon,'def_spiritward'); continue; } if(kind==='melee'){ m.sward--; say(m.sward>0?'ward cracks ('+m.sward+')':'spirit ward shatters!','#c8b0ff'); if(m.sward<=0&&A)MX.fxRing(A,mon.x,mon.y,30,'#c8b0ff'); } continue; }
    if(D.name==='mirror'&&kind==='familiar'&&MX._famK==='proj'){ d=0; say('mirrored!','#e0f0ff'); if(MX.onFamReflect)MX.onFamReflect(sc,MX._famId,mon); MX.ev(mon,'def_mirror'); continue; }
    if(D.name==='resist'&&kind==='familiar'&&MX._famEl===(p.el||'fire')){ d*=1-(p.red===undefined?0.75:p.red); say('resists','#e0d0a0'); continue; }
    if(D.name==='front'){ var a=Math.atan2(P.y-mon.y,P.x-mon.x), df=Math.abs(Math.atan2(Math.sin(a-m.face),Math.cos(a-m.face))); if(df<(p.arc||1.1)){ d*= (1-(p.red===undefined?1:p.red)); say(p.red<1?'glancing':'blocked!','#e0e0e0'); MX.ev(mon,'def_front'); } }
    else if(D.name==='reflect'&&kind==='ranged'){ d=0; say('reflected!','#c0f0ff'); MX.ev(mon,'def_reflect'); }
    else if(D.name==='immune'&&p.k===kind){ d=0; say(kind==='melee'?'no effect':'no effect'); }
    else if(D.name==='armor'&&m.armor>0){ m.armor--; d*=1-(p.red||0.7); say(m.armor>0?'armor ('+m.armor+')':'armor breaks!','#ffd080'); if(m.armor<=0)MX.ev(mon,'def_armor_break'); }
    else if(D.name==='dodge'&&m.dodgeCd<=0){ m.dodgeCd=p.cd||4; d=0; say('dodged!','#ffffff'); MX.ev(mon,'def_dodge'); }
    else if(D.name==='tiny'&&Math.random()<(p.c||0.25)){ d=0; say('missed','#ffffff'); }
    else if(D.name==='thorns'&&kind==='melee'&&A){ A.hurt(p.d||1,'thorns','#c0e070',true); MX.ev(mon,'def_thorns'); }
    else if(D.name==='bubble'){ var now=m.t; m.hits=m.hits.filter(function(h){ return now-h<1.5; }); m.hits.push(now); if(m.hits.length>=(p.n||3)){ m.invuln=p.t||2; m.hits=[]; say('shielded!','#9fe8ff'); MX.ev(mon,'def_bubble'); } }
    else if(D.name==='weak'&&p.k===kind){ d*=p.m||2; }
  }
  if(d>0&&sc)d*=MX.dmgOut(sc);
  if(d>0&&mon.bars&&MX._barHit)d=MX._barHit(mon,d,kind,say);
  d=Math.round(d*10)/10; var nv=old-d;
  if(nv<=0){ var rv=defs.find(function(D){ return D.name==='revive'; });
    if(rv&&!m.revived){ m.revived=true; m.down=rv.p.t||5; mon._hp=1; mon.cont.setAlpha(0.55); say('…it will rise again','#e0d8c0'); MX.ev(mon,'def_revive_down'); return; } }
  mon._hp=nv;
  if(mon._hp>0){ defs.forEach(function(D){ if(D.name==='enrage'&&!m.enraged&&mon._hp<mon.maxHp*0.5){ m.enraged=true; say('ENRAGED!','#ff6040'); MX.ev(mon,'def_enrage'); } if(D.name==='flee'&&mon._hp<mon.maxHp*0.25){ m.flee=true; } }); }
  else if(sc&&A) MX.onDeath(A,mon);
};
MX.onDeath=function(A,mon){ var defs=mon.kit.def, P=A.p();
  defs.forEach(function(D){ var p=D.p;
    if(D.name==='split'){ if(mon.noSplit||(mon._m&&mon._m.noSplit))return;   // split children never split again — they just die
      for(var i=0;i<(p.n||2);i++){ var c=A.spawn(p.id||mon.rid,mon.x+(i-0.5)*20,mon.y+6,{q:mon.def.sec,hpMult:p.hp||0.4,scale:p.sc||0.75}); if(c){ c._m.aggro=true; c._m.noSplit=true; c.noSplit=true; } } MX.ev(mon,'def_split'); }
    else if(D.name==='explode'){ MX.fxRing(A,mon.x,mon.y,p.r||50,p.col||'#ff9040'); if(Math.hypot(P.x-mon.x,P.y-mon.y)<(p.r||50)&&MX.sees(A,mon,P.x,P.y)){ A.hurt(mon.def.atk*(p.m||0.8),'BOOM','#ff9040',false); if(p.st)MX.status(A,p.st,p.t||3); } if(p.zone)MX.zone(A,{x:mon.x,y:mon.y,r:p.r||50,t:p.zt||3,st:p.zone,col:p.col}); MX.ev(mon,'def_explode'); }
  }); };

// ── main per-monster tick ─────────────────────────────────────────────
MX.tick=function(scene,mon,dt){ var A=MX.A(scene), m=mon._m, k=mon.kit, P=A.p(), dx=P.x-mon.x, dy=P.y-mon.y, dist=Math.hypot(dx,dy);
  m.t+=dt; m._sayT=(m._sayT||0)-dt; m.dodgeCd-=dt; if(m.invuln>0)m.invuln-=dt; m.hurtT-=dt;
  for(var c in m.cd)m.cd[c]-=dt;
  // night-only monsters sleep by day
  if(mon.tags&&mon.tags.indexOf('night')>=0&&A.world&&A.night()<0.35&&!m.aggro){ mon.cont.setVisible(false); m.hidden=true; m.nightHide=true; return; }
  if(m.nightHide){ m.nightHide=false; m.hidden=false; }
  mon.cont.setVisible(true);
  if(dist<280&&typeof Tome!=='undefined'&&!m.hidden)Tome.see('monster',mon.rid);
  // revive window: stand on the bone pile to finish it
  if(m.down>0){ m.down-=dt; if(mon._za){ try{ ZAtlas.mon(A.scene,mon,m,dt,dx,dy); }catch(e){} } else { mon.spr.setFrame('0'); mon.spr.setAngle(90); } if(dist<20){ mon.spr.setAngle(0); A.float(mon.x,mon.y-20,'crushed!','#e0d8c0'); A.kill(mon); MX.ev(mon,'def_revive_crushed'); return; }
    if(m.down<=0){ mon.spr.setAngle(0); mon.cont.setAlpha(1); mon._hp=Math.round(mon.maxHp*0.5); A.float(mon.x,mon.y-24,'it rises!','#ffe0a0'); MX.ev(mon,'def_revived'); } return; }
  if(m.stunT>0){ m.stunT-=dt; mon.spr.setAngle(Math.sin(m.t*20)*8); MX.anim(A,mon,m,dt,dx); return; } else mon.spr.setAngle(0);
  // aggro
  var aggroR=(k.move.p.aggro||(mon.R.seg==='main'?230:260))+(m.enraged?60:0);
  if(dist<aggroR||m.hurtT>0)m.aggro=true; else if(dist>420)m.aggro=false;
  if(A.world&&getTileSection(Math.floor(P.x/TILE),Math.floor(P.y/TILE))===0)m.aggro=false;   // the village is safe
  // camp guards stay with their treasure: they give up the chase when you (or they) leave the camp, and walk back to it
  var home=mon.campHome, goHome=false; if(home){ var hd=Math.hypot(mon.x-home.x,mon.y-home.y), pd=Math.hypot(P.x-home.x,P.y-home.y); if(hd>home.r||(pd>home.r+60&&m.hurtT<=0))m.aggro=false; goHome=!m.aggro&&hd>home.leash; }
  var spd=(k.move.p.spd||mon.def.spd)*(m.enraged?1.4:1)*(mon._slow>0?0.5:1)*(m.armorOff?1.3:1); if(mon._slow>0)mon._slow-=dt;
  // movement
  // shooters keep their distance: a monster whose attacks are all ranged backs away when you close in
  if(k._ranged===undefined){ var RG={shoot:1,lob:1,beam:1,breath:1,ring:1,marks:1,summon:1,cloud:1,wall:1,echo:1,strike:1,trap:1}, stay={still:1,kite:1,burrow:1,perch:1,swim:1,disguise:1,ambush:1,weeping:1,guard:1,rook:1,chessL:1,orbit:1};
    k._ranged=k.atk.length>0&&k.atk.some(function(a){ return a.name==='shoot'||a.name==='lob'||a.name==='beam'||a.name==='breath'; })&&k.atk.every(function(a){ return RG[a.name]; })&&!stay[k.move.name]; }
  var _los=null, sees=function(){ if(_los===null)_los=dist<14||MX.sees(A,mon,P.x,P.y); return _los; };
  var backOff=k._ranged&&m.aggro&&!mon.isBoss&&!m.hidden&&dist<(k.move.p.keep||140)&&(!m.busy||m.busy.moveOk)&&sees();   // no sight → close in instead
  if(goHome&&(!m.busy||m.busy.moveOk)){ MX.step(A,mon,Math.atan2(home.y-mon.y,home.x-mon.x),spd*0.9,dt); }
  else if(backOff){ MX.step(A,mon,Math.atan2(-dy,-dx),spd*0.9,dt); }
  else if(!m.busy||m.busy.moveOk){ if(m.flee&&m.aggro){ MX.step(A,mon,Math.atan2(-dy,-dx),spd*1.2,dt); }
    else (MX.MOVE[k.move.name]||MX.MOVE.chase)(A,mon,m,P,dist,dt,spd,k.move.p); }
  // face the player (shield monsters turn slowly)
  var want=Math.atan2(dy,dx), turn=k.def.some(function(D){ return D.name==='front'; })?1.8:12, dd=Math.atan2(Math.sin(want-m.face),Math.cos(want-m.face)); m.face+=Math.max(-turn*dt,Math.min(turn*dt,dd));
  // attacks
  if(m.busy){ MX.runAtk(A,mon,m,P,dist,dt); }
  else if(m.aggro&&!m.hidden&&!(A.world&&getTileSection(Math.floor(P.x/TILE),Math.floor(P.y/TILE))===0)){ for(var i=0;i<k.atk.length;i++){ var a=k.atk[i], AT=MX.ATK[a.name], key=a.name+i; if((m.cd[key]||0)>0)continue;
      if((AT.want?AT.want(A,mon,m,P,dist,a.p):dist<=(a.p.r||(AT.range||40)))&&(MX.NO_LOS[a.name]||sees())){ m.busy={a:a,key:key,t:0,phase:'wind',wind:a.p.wind!==undefined?a.p.wind:(AT.wind||0.3),moveOk:!!AT.moveOk}; if(AT.start)AT.start(A,mon,m,P,a.p); MX.ev(mon,'atk_'+a.name); break; } } }
  // passive defences
  k.def.forEach(function(D){ var p=D.p;
    if(D.name==='regen'){ var onT=!p.on||(p.on==='water'&&A.isWater(mon.x,mon.y+8))||(p.on==='lava'&&A.isLava(mon.x,mon.y+8))||(p.on==='mud'); if(onT&&mon._hp<mon.maxHp){ mon._hp=Math.min(mon.maxHp,mon._hp+(p.r||1)*dt*mon.maxHp*0.02); } }
    if(D.name==='aura'&&dist<(p.r||40)&&sees()){ m.auraT=(m.auraT||0)-dt; if(m.auraT<=0){ m.auraT=1; A.hurt(mon.def.atk*(p.m||0.25),'',p.col||'#ff9060',true); if(p.st)MX.status(A,p.st,p.t||2,p.v); MX.ev(mon,'def_aura'); } }
    if(D.name==='lure'&&m.aggro&&!m.hidden&&dist<(p.r||160)&&dist>30&&sees()){ var l=dist||1; MX.push(A,-dx/l,-dy/l,(p.str||2)*dt*14); m.lureT=(m.lureT===undefined?1:m.lureT)+dt; if(m.lureT>=1){ m.lureT=0; A.float(P.x,P.y-40,'drawn in…','#c0f0ff'); MX.ev(mon,'hit'); MX.ev(mon,'def_lure'); } }
    if(D.name==='heal'){ m.healT=(m.healT||0)-dt; if(m.healT<=0){ m.healT=p.cd||4; A.list().forEach(function(o){ if(o!==mon&&!o.dead&&Math.hypot(o.x-mon.x,o.y-mon.y)<(p.r||160)&&o.hp<o.maxHp){ o._hp=Math.min(o.maxHp,o._hp+o.maxHp*(p.a||0.2)); MX.fxRing(A,o.x,o.y,18,'#ffe070'); MX.ev(mon,'def_heal'); } }); } }
  });
  MX.anim(A,mon,m,dt,dx);
};
MX.anim=function(A,mon,m,dt,dx){ var f; if(m.busy)f=m.busy.phase==='wind'?'2':'3'; else if(m.strikeT>0){ m.strikeT-=dt; f='3'; } else f=(Math.floor(m.t*2.6)%2)?'1':'0';
  var _za=false; if(typeof ZAtlas!=='undefined'){ try{ _za=ZAtlas.mon(A.scene,mon,m,dt,dx,A.p().y-mon.y); }catch(e){ if(!ZAtlas._warnM){ ZAtlas._warnM=true; console.error('painted monster',mon.rid,e); } } }
  if(!_za&&mon.spr.frame.name!==f)mon.spr.setFrame(f); if(Math.abs(dx)>4)mon.spr.setFlipX(dx<0);
  mon.cont.setPosition(mon.x,mon.y); mon.cont.setDepth(A.depth(mon.y));
  if(mon._lazyVis&&A.scene._monWake)A.scene._monWake(mon);
  var hid=m.hidden, show=!hid&&!m.lurk; mon.hpBg.setVisible(show); mon.hpFill.setVisible(show); if(mon.nameT)mon.nameT.setVisible(show);
  mon.spr.setAlpha(m.sub?0.3:hid?(mon.kit.move.name==='disguise'?1:0.14):1); mon.hpFill.displayWidth=28*Math.max(0,mon._hp/mon.maxHp); };
MX._try=function(A,mon,ang,spd,dt,fly){ var nx=mon.x+Math.cos(ang)*spd*dt, ny=mon.y+Math.sin(ang)*spd*dt, n=0;
  if(A.canGoM(nx,mon.y,mon,fly)){ mon.x=nx; n++; } if(A.canGoM(mon.x,ny,mon,fly)){ mon.y=ny; n++; } return n; };
// move; if something is in the way, steer round it (charges/rolls pass noSteer to feel the wall)
MX.step=function(A,mon,ang,spd,dt,fly,noSteer){ var x0=mon.x, y0=mon.y, n=MX._try(A,mon,ang,spd,dt,fly); if(n===2||noSteer)return n<2;
  var prog=Math.hypot(mon.x-x0,mon.y-y0), m=mon._m; if(prog>spd*dt*0.6)return false;
  mon.x=x0; mon.y=y0; var side=(m&&m.side)||1, tries=[0.7,1.3,1.9,2.5];
  for(var i=0;i<tries.length;i++)for(var j=0;j<2;j++){ var sg=j?-side:side; if(MX._try(A,mon,ang+sg*tries[i],spd,dt,fly)===2){ if(m)m.side=sg; return false; } mon.x=x0; mon.y=y0; }
  MX._try(A,mon,ang,spd,dt,fly); return true; };
MX.wander=function(A,mon,m,dt,spd,fly){ m.wt=(m.wt||0)-dt; if(m.wt<=0){ m.wt=2+Math.random()*3; var back=Math.hypot(mon.x-mon.spawnX,mon.y-mon.spawnY)>(mon.leashR||180); m.wa=back?Math.atan2(mon.spawnY-mon.y,mon.spawnX-mon.x):Math.random()*Math.PI*2; m.ws=Math.random()<0.3?0:spd*0.35; }
  if(m.ws&&MX.step(A,mon,m.wa,m.ws,dt,fly))m.wa+=Math.PI*0.7; };

// ── movement modules ──────────────────────────────────────────────────
MX.MOVE={
  chase:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd); if(d>(p.stop||mon.def.r+12))MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*(p.s||1),dt); },
  lumber:function(A,mon,m,P,d,dt,spd,p){ MX.MOVE.chase(A,mon,m,P,d,dt,spd*0.6,p); },
  hover:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd,true); if(d>mon.def.r+10)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd,dt,true); },
  drift:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd*0.6,true); var a=Math.atan2(P.y-mon.y,P.x-mon.x)+Math.sin(m.t*1.7)*0.8; if(d>(p.keep||60))MX.step(A,mon,a,spd*0.6,dt,true); },
  still:function(A,mon,m,P,d,dt,spd,p){},
  guard:function(A,mon,m,P,d,dt,spd,p){ var far=Math.hypot(mon.x-mon.spawnX,mon.y-mon.spawnY)>(p.r||140); if(!m.aggro||far)return MX.step(A,mon,Math.atan2(mon.spawnY-mon.y,mon.spawnX-mon.x),spd*0.6,dt); MX.MOVE.chase(A,mon,m,P,d,dt,spd,p); },
  pulse:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd); m.pt=(m.pt||0)-dt; if(m.pt<=0){ m.pt=0.9+Math.random()*0.6; m.pon=!m.pon; } var a=Math.atan2(P.y-mon.y,P.x-mon.x); if(m.pon)MX.step(A,mon,a,spd*2.1,dt); else if(d<90)MX.step(A,mon,a+Math.PI,spd*1.2,dt); },
  zigzag:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd); m.zt=(m.zt||0)-dt; if(m.zt<=0){ m.zt=0.45; m.zd=(m.zd||1)*-1; } var a=Math.atan2(P.y-mon.y,P.x-mon.x); MX.step(A,mon,a+m.zd*0.9,spd*1.1,dt); },
  flit:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd,true); m.ft=(m.ft||0)-dt; if(m.ft<=0){ m.ft=0.25+Math.random()*0.35; m.fa=Math.atan2(P.y-mon.y,P.x-mon.x)+(Math.random()-0.5)*2.6; } MX.step(A,mon,m.fa,spd*1.3,dt,true); },
  kite:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd,p.fly); var R=p.range||150, a=Math.atan2(P.y-mon.y,P.x-mon.x);
    if(d<R-35)MX.step(A,mon,a+Math.PI,spd*0.9,dt,p.fly); else if(d>R+45)MX.step(A,mon,a,spd,dt,p.fly); else { m.sT=(m.sT||0)-dt; if(m.sT<=0){ m.sT=1+Math.random(); m.sD=(m.sD||1)*-1; } MX.step(A,mon,a+m.sD*Math.PI/2,spd*0.55,dt,p.fly); } },
  orbit:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd,true); m.oa=(m.oa===undefined?Math.atan2(mon.y-P.y,mon.x-P.x):m.oa)+dt*spd/(p.r||150); var tx=P.x+Math.cos(m.oa)*(p.r||150), ty=P.y+Math.sin(m.oa)*(p.r||150); MX.step(A,mon,Math.atan2(ty-mon.y,tx-mon.x),spd*1.3,dt,true); },
  charge:function(A,mon,m,P,d,dt,spd,p){ // paws the ground, then dashes in a straight line; stunned if it hits something
    if(m.ch){ var c=m.ch; c.t+=dt; if(c.ph==='paw'){ mon.spr.x=Math.sin(c.t*40)*1.5; if(c.t>=(p.wind||1)){ c.ph='go'; c.t=0; mon.spr.x=0; if(c.g)c.g.destroy(); } return; }
      var hit=MX.step(A,mon,c.a,spd*(p.mult||4.2),dt,false,true); var P2=A.p();
      if(!c.hit&&Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+16){ c.hit=true; A.hurt(mon.def.atk*(p.m||1.3),'','#ff5533'); MX.push(A,Math.cos(c.a),Math.sin(c.a),p.kb||70); MX.ev(mon,'mv_charge_hit'); }
      if(hit){ m.ch=null; m.stunT=p.stun||2; A.float(mon.x,mon.y-mon.def.r-14,'stunned!','#ffe070'); MX.ev(mon,'mv_charge_stun'); m.cd.charge=2.5; return; }
      if(c.t>(p.dur||1.1)){ m.ch=null; m.cd.charge=p.cd||2.5; } return; }
    if(!m.aggro)return MX.wander(A,mon,m,dt,spd);
    if((m.cd.charge||0)<=0&&d<(p.r||240)){ var a=Math.atan2(P.y-mon.y,P.x-mon.x); m.ch={ph:'paw',t:0,a:a,g:MX.tele.line(A,mon.x,mon.y,a,(p.r||240),'#ff4040',p.wind||1)}; MX.ev(mon,'mv_charge'); return; }
    if(d>70)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*0.6,dt); },
  burrow:function(A,mon,m,P,d,dt,spd,p){ // travels underground; pops up next to you
    if(m.hidden){ m.lurk=true; if(!m.aggro)return MX.wander(A,mon,m,dt,spd*0.8); var a=Math.atan2(P.y-mon.y,P.x-mon.x); MX.step(A,mon,a,spd*1.1,dt);
      m.dirtT=(m.dirtT||0)-dt; if(m.dirtT<=0){ m.dirtT=0.12; MX.fxDot(A,mon.x,mon.y+6,'#6a4a2a',0.6); }
      if(d<(p.near||34)){ m.hidden=false; m.lurk=false; m.up=p.pop||1.8; MX.fxRing(A,mon.x,mon.y+4,20,'#8a6a44'); MX.ev(mon,'mv_burrow_pop'); } return; }
    m.up-=dt; if(m.up<=0&&!m.busy){ m.hidden=true; MX.fxRing(A,mon.x,mon.y+4,16,'#6a4a2a'); } },
  ambush:function(A,mon,m,P,d,dt,spd,p){ if(m.hidden){ if(d<(p.r||90)||m.hurtT>0){ m.hidden=false; m.lurk=false; MX.fxRing(A,mon.x,mon.y,24,'#ffffff'); A.float(mon.x,mon.y-26,'!','#ff6040'); MX.ev(mon,'mv_ambush_reveal'); } return; }
    (MX.MOVE[p.then]||MX.MOVE.chase)(A,mon,m,P,d,dt,spd,p); },
  disguise:function(A,mon,m,P,d,dt,spd,p){ MX.MOVE.ambush(A,mon,m,P,d,dt,spd,Object.assign({r:p.r||80},p)); },
  perch:function(A,mon,m,P,d,dt,spd,p){ // stone on its perch; swoops when you pass below, then flies back
    if(!m.sw){ m.invuln=0.2; mon.spr.setTint(0x9a9a9a); if(m.aggro&&d<(p.r||130)&&(m.cd.sw||0)<=0){ m.sw={ph:'dive',t:0,tx:P.x,ty:P.y}; mon.spr.clearTint(); m.lurk=false; MX.ev(mon,'mv_perch_swoop'); } return; }
    var s=m.sw; s.t+=dt;
    if(s.ph==='dive'){ var a=Math.atan2(s.ty-mon.y,s.tx-mon.x); MX.step(A,mon,a,spd*3,dt,true); var P2=A.p(); if(Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+14){ A.hurt(mon.def.atk*1.2,'','#ff5533'); s.ph='soft'; s.t=0; MX.ev(mon,'mv_perch_hit'); } else if(Math.hypot(s.tx-mon.x,s.ty-mon.y)<8||s.t>1.2){ s.ph='soft'; s.t=0; } }
    else if(s.ph==='soft'){ if(s.t>(p.soft||3)){ s.ph='back'; } }
    else { var b=Math.atan2(mon.spawnY-mon.y,mon.spawnX-mon.x); MX.step(A,mon,b,spd*1.2,dt,true); if(Math.hypot(mon.spawnX-mon.x,mon.spawnY-mon.y)<8){ m.sw=null; m.cd.sw=1.5; } } },
  blink:function(A,mon,m,P,d,dt,spd,p){ if(!m.aggro)return MX.wander(A,mon,m,dt,spd,true); m.bt=(m.bt||1.5)-dt;
    if(m.bt<=0){ m.bt=(p.every||2.6)+Math.random(); for(var i=0;i<8;i++){ var a=Math.random()*Math.PI*2, r=(p.d||110)*(0.7+Math.random()*0.5), x=P.x+Math.cos(a)*r, y=P.y+Math.sin(a)*r; if(A.canGoM(x,y,mon)){ MX.fxRing(A,mon.x,mon.y,16,'#e0c0ff'); mon.x=x; mon.y=y; m.invuln=Math.max(m.invuln,0.25); MX.fxRing(A,x,y,16,'#e0c0ff'); MX.ev(mon,'mv_blink'); break; } } }
    else if(d>80)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*0.4,dt,true); },
  swim:function(A,mon,m,P,d,dt,spd,p){ var isW=p.in==='lava'?A.isLava:A.isWater, inW=isW(mon.x,mon.y+6); if(!inW&&!A.world)return MX.MOVE.chase(A,mon,m,P,d,dt,spd,p);
    if(!inW){ m.sub=false; return MX.MOVE.chase(A,mon,m,P,d,dt,spd,p); }
    if(m.surf>0){ m.surf-=dt; m.sub=false; if(m.surf<=0){ m.sub=true; m.cd.surf=p.rest||1.5; } }
    else { m.sub=true; m.invuln=Math.max(m.invuln,0.1); if(m.aggro&&d<(p.surf||140)&&(m.cd.surf||0)<=0){ m.surf=p.up||2.6; m.sub=false; MX.fxRing(A,mon.x,mon.y,22,'#a0e0ff'); MX.ev(mon,'mv_surface'); } }
    if(!m.aggro)return; var a=Math.atan2(P.y-mon.y,P.x-mon.x), nx=mon.x+Math.cos(a)*spd*dt, ny=mon.y+Math.sin(a)*spd*dt; if(d>mon.def.r+14&&isW(nx,ny+6)){ mon.x=nx; mon.y=ny; } },
  leap:function(A,mon,m,P,d,dt,spd,p){ if(m.lp){ var L=m.lp; L.t+=dt; var u=Math.min(1,L.t/0.5); mon.x=L.x0+(L.x1-L.x0)*u; mon.y=L.y0+(L.y1-L.y0)*u; mon.spr.y=4-Math.sin(u*Math.PI)*22; m.invuln=0.05;
      if(u>=1){ m.lp=null; mon.spr.y=4; var P2=A.p(); if(Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+16){ A.hurt(mon.def.atk,'','#ff5533'); MX.ev(mon,'mv_leap_hit'); } } return; }
    if(!m.aggro)return MX.wander(A,mon,m,dt,spd); m.lt=(m.lt||0)-dt; if(m.lt<=0&&d<260){ m.lt=p.every||1.6; var a=Math.atan2(P.y-mon.y,P.x-mon.x), r=Math.min(d,p.d||90), x1=mon.x+Math.cos(a)*r, y1=mon.y+Math.sin(a)*r; if(A.canGoM(x1,y1,mon)){ m.lp={t:0,x0:mon.x,y0:mon.y,x1:x1,y1:y1}; MX.ev(mon,'mv_leap'); } } },
  chessL:function(A,mon,m,P,d,dt,spd,p){ // moves only like a chess knight, square by square
    if(m.lp){ return MX.MOVE.leap(A,mon,m,P,d,dt,spd,p); } if(!m.aggro)return; m.lt=(m.lt||0)-dt; if(m.lt>0)return; m.lt=p.every||1.3;
    var best=null, bd=1e9; [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(function(o){ var x=mon.x+o[0]*TILE, y=mon.y+o[1]*TILE; if(!A.canGoM(x,y,mon))return; var dd=Math.hypot(P.x-x,P.y-y); if(dd<bd){ bd=dd; best=[x,y]; } });
    if(best){ m.lp={t:0,x0:mon.x,y0:mon.y,x1:best[0],y1:best[1]}; MX.tele.circle(A,best[0],best[1],18,'#ff4040',0.5); MX.ev(mon,'mv_chessL'); } },
  rook:function(A,mon,m,P,d,dt,spd,p){ if(m.rk){ var hit=MX.step(A,mon,m.rk.a,(p.slide||260),dt,false,true); var P2=A.p(); if(Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+14&&!m.rk.h){ m.rk.h=true; A.hurt(mon.def.atk*1.4,'CRUSH','#ff5533'); MX.push(A,Math.cos(m.rk.a),Math.sin(m.rk.a),90); MX.ev(mon,'mv_rook_hit'); }
      if(hit){ m.rk=null; m.stunT=p.stun||3; A.float(mon.x,mon.y-30,'stunned','#ffe070'); MX.ev(mon,'mv_rook_stun'); } return; }
    if(!m.aggro)return; var ax=Math.abs(P.x-mon.x)<18, ay=Math.abs(P.y-mon.y)<18;
    if((ax||ay)&&(m.cd.rook||0)<=0){ m.cd.rook=1.2; m.rk={a:ax?(P.y>mon.y?Math.PI/2:-Math.PI/2):(P.x>mon.x?0:Math.PI)}; MX.ev(mon,'mv_rook'); return; }
    var tx=Math.abs(P.x-mon.x)<Math.abs(P.y-mon.y)?P.x:mon.x, ty=tx===mon.x?P.y:mon.y; MX.step(A,mon,Math.atan2(ty-mon.y,tx-mon.x),spd*0.5+20,dt); },
  weeping:function(A,mon,m,P,d,dt,spd,p){ // only moves while you are not looking at it
    if(!m.aggro)return; var f=A.facing(), vx=(mon.x-P.x)/(d||1), vy=(mon.y-P.y)/(d||1), seen=f[0]*vx+f[1]*vy>0.35;
    if(seen){ m.invuln=0.1; mon.spr.setTint(0xa0a0a8); m.frozen=true; return; } if(m.frozen){ m.frozen=false; mon.spr.clearTint(); MX.ev(mon,'mv_weeping_move'); }
    if(d>mon.def.r+10)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*1.5+30,dt); },
  roll:function(A,mon,m,P,d,dt,spd,p){ if(m.rl){ var R=m.rl; R.t+=dt; m.invuln=0.1; mon.spr.setAngle(R.t*720); if(MX.step(A,mon,R.a,(p.spd||230),dt,false,true)){ R.b++; R.a+=Math.PI*(0.6+Math.random()*0.8); MX.ev(mon,'mv_roll_bounce'); }
      var P2=A.p(); if(Math.hypot(P2.x-mon.x,P2.y-mon.y)<mon.def.r+14&&!R.h){ R.h=true; A.hurt(mon.def.atk*1.2,'','#ff5533'); MX.push(A,Math.cos(R.a),Math.sin(R.a),60); MX.ev(mon,'mv_roll_hit'); }
      if(R.b>=(p.b||3)||R.t>3){ m.rl=null; mon.spr.setAngle(0); m.stunT=p.dizzy||2; A.float(mon.x,mon.y-26,'dizzy','#ffe070'); } return; }
    if(!m.aggro)return MX.wander(A,mon,m,dt,spd); if((m.cd.roll||0)<=0&&d<260){ m.cd.roll=p.cd||3.5; m.rl={t:0,b:0,a:Math.atan2(P.y-mon.y,P.x-mon.x)}; MX.ev(mon,'mv_roll'); } else if(d>60)MX.step(A,mon,Math.atan2(P.y-mon.y,P.x-mon.x),spd*0.5,dt); }
};
MX.MOVE.float=MX.MOVE.drift;
MX.DEF={spiritward:1,mirror:1,nullaura:1,resist:1,lure:1,front:1,reflect:1,immune:1,armor:1,dodge:1,tiny:1,thorns:1,bubble:1,weak:1,revive:1,enrage:1,flee:1,split:1,explode:1,regen:1,aura:1,heal:1};
// ── visuals: telegraphs & small effects ───────────────────────────────
MX.fx=function(A){ var s=A.scene; return s._mxFx||(s._mxFx={proj:[],zones:[],marks:[],tele:[],teth:[],walls:[],traps:[]}); };
MX.col=function(c){ return typeof c==='number'?c:parseInt(String(c||'#ffffff').replace('#',''),16); };
MX.tele={
  line:function(A,x,y,a,len,col,t){ var g=A.scene.add.graphics().setDepth(A.depth(y)+0.2); g.lineStyle(3,MX.col(col),0.55); g.lineBetween(x,y,x+Math.cos(a)*len,y+Math.sin(a)*len); MX.fx(A).tele.push({g:g,t:t||0.8}); return g; },
  circle:function(A,x,y,r,col,t){ var g=A.scene.add.graphics().setDepth(A.depth(y)-0.01); g.fillStyle(MX.col(col),0.22); g.fillCircle(x,y,r); g.lineStyle(2,MX.col(col),0.7); g.strokeCircle(x,y,r); MX.fx(A).tele.push({g:g,t:t||0.8}); return g; },
  cone:function(A,x,y,a,len,half,col,t){ var g=A.scene.add.graphics().setDepth(A.depth(y)+0.2); g.fillStyle(MX.col(col),0.25); g.slice(x,y,len,a-half,a+half,false); g.fillPath(); MX.fx(A).tele.push({g:g,t:t||0.6}); return g; }
};
MX.fxRing=function(A,x,y,r,col){ var c=A.scene.add.circle(x,y,4,MX.col(col),0).setStrokeStyle(3,MX.col(col),0.8).setDepth(A.depth(y)+0.3); A.scene.tweens.add({targets:c,radius:r,alpha:0,duration:420,onComplete:function(){ c.destroy(); }}); };
MX.fxDot=function(A,x,y,col,a){ var c=A.scene.add.circle(x+(Math.random()-0.5)*8,y,2.5,MX.col(col),a||0.8).setDepth(A.depth(y)-0.01); A.scene.tweens.add({targets:c,alpha:0,duration:700,onComplete:function(){ c.destroy(); }}); };
MX.push=function(A,ux,uy,dist){ var n=Math.ceil(dist/6), P=A.p(); for(var i=0;i<n;i++){ var P1=A.p(); A.setP(P1.x+ux*6,P1.y+uy*6); } };
// ── attacks ───────────────────────────────────────────────────────────
// round 6: nobody attacks through walls — sight from the monster to a point
MX.sees=function(A,mon,x,y){ return A.los(mon.x,mon.y-6,x,y-6); };
MX.NO_LOS={summon:1};   // attacks that don't need to see you
MX.runAtk=function(A,mon,m,P,d,dt){ var b=m.busy, AT=MX.ATK[b.a.name]; b.t+=dt;
  if(b.phase==='wind'){ if(b.t>=b.wind){ b.phase='act'; b.t=0; if(AT.fire)AT.fire(A,mon,m,A.p(),b.a.p,b); m.strikeT=0.25; if(!AT.act){ MX.endAtk(m,b); } } return; }
  if(AT.act){ if(AT.act(A,mon,m,A.p(),b.a.p,b,dt))MX.endAtk(m,b); } };
MX.endAtk=function(m,b){ var AT=MX.ATK[b.a.name]; m.cd[b.key]=b.a.p.cd!==undefined?b.a.p.cd:(AT.cd||1.6); m.busy=null; };
MX.hitP=function(A,mon,p,mult,label,col){ var ok=A.hurt(mon.def.atk*(p.m||mult||1)*(mon._m.enraged?1.3:1),label,col); if(ok){ if(p.st)MX.status(A,p.st,p.t||2.5,p.v); if(p.kb){ var P=A.p(), l=Math.hypot(P.x-mon.x,P.y-mon.y)||1; MX.push(A,(P.x-mon.x)/l,(P.y-mon.y)/l,p.kb); } if(p.steal){ var g=MX.status(A,'steal',0,p.steal); if(g){ mon._m.stolen=(mon._m.stolen||0)+g; mon._m.flee=true; } } MX.ev(mon,'hit'); } return ok; };
MX.proj=function(A,o){ var s=A.scene, g=(typeof ZShot!=='undefined'&&ZShot.make(s,ZShot.mxKind(o.kind,o.col),o.x,o.y,Math.atan2(o.vy||0,o.vx||1),A.depth(o.y)+0.5))||s.add.circle(o.x,o.y,o.r||5,MX.col(o.col||'#ffcc66')).setDepth(A.depth(o.y)+0.5); if(o.glow)g.setStrokeStyle(2,0xffffff,0.6); o.vis=g; o.life=o.life||3; MX.fx(A).proj.push(o); return o; };
MX.zone=function(A,o){ var s=A.scene, g=s.add.circle(o.x,o.y,o.r,MX.col(o.col||({slow:'#88c0ff',poison:'#80e060',burn:'#ff8040',blind:'#303040',sneeze:'#e0c0e0',root:'#80a040',dmg:'#ff6060',lava:'#ff6a20'}[o.st]||'#aaaaaa')),0.28).setDepth(A.depth(o.y)-0.02); o.vis=g; o.tick=0; MX.fx(A).zones.push(o); return o; };
MX.ATK={
  melee:{range:34,wind:0.25,cd:1.3,want:function(A,mon,m,P,d,p){ return d<=(p.r||mon.def.r+22); },start:function(A,mon){ mon.spr.setTint(0xffe0a0); },
    fire:function(A,mon,m,P,p){ mon.spr.clearTint(); var d=Math.hypot(P.x-mon.x,P.y-mon.y); if(d<=(p.r||mon.def.r+22)+10&&MX.sees(A,mon,P.x,P.y)){ var n=p.n||1; MX.hitP(A,mon,p,1); for(var i=1;i<n;i++)(function(i){ A.scene.time.delayedCall(i*220,function(){ var P2=A.p(); if(!mon.dead&&Math.hypot(P2.x-mon.x,P2.y-mon.y)<(p.r||mon.def.r+22)+12){ A.setIfr(0); MX.hitP(A,mon,p,0.7); } }); })(i); } }},
  lunge:{range:90,wind:0.35,cd:2,want:function(A,mon,m,P,d,p){ return d<=(p.r||90)&&d>20; },start:function(A,mon,m,P,p){ m.busy.a0=Math.atan2(P.y-mon.y,P.x-mon.x); MX.tele.line(A,mon.x,mon.y,m.busy.a0,p.r||90,'#ff6040',0.35); },
    act:function(A,mon,m,P,p,b,dt){ MX.step(A,mon,b.a0,(p.spd||420),dt,p.fly,true); if(!b.h&&Math.hypot(P.x-mon.x,P.y-mon.y)<mon.def.r+16){ b.h=true; if(MX.sees(A,mon,P.x,P.y))MX.hitP(A,mon,p,1.2); } return b.t>=(p.dur||0.22); }},
  sweep:{range:60,wind:0.5,cd:2.2,start:function(A,mon,m,P,p){ var a=Math.atan2(P.y-mon.y,P.x-mon.x); m.busy.a0=a; MX.tele.cone(A,mon.x,mon.y,a,p.r||60,(p.arc||2.6)/2,'#ff5030',p.wind||0.5); },
    fire:function(A,mon,m,P,p,b){ var d=Math.hypot(P.x-mon.x,P.y-mon.y), a=Math.atan2(P.y-mon.y,P.x-mon.x), df=Math.abs(Math.atan2(Math.sin(a-b.a0),Math.cos(a-b.a0))); MX.fxRing(A,mon.x,mon.y,p.r||60,'#ffffff'); MX.famStagger(A,mon.x,mon.y,(p.r||60)+16,35,'sweep'); if(d<=(p.r||60)+8&&df<=(p.arc||2.6)/2&&MX.sees(A,mon,P.x,P.y))MX.hitP(A,mon,p,1.1); }},
  slam:{range:70,wind:0.6,cd:3,want:function(A,mon,m,P,d,p){ return d<=(p.r||75)*0.9; },start:function(A,mon,m,P,p){ MX.tele.circle(A,mon.x,mon.y,p.r||75,p.col||'#ff9040',p.wind||0.6); },
    fire:function(A,mon,m,P,p){ MX.fxRing(A,mon.x,mon.y,p.r||75,p.col||'#d8c8a0'); MX.famStagger(A,mon.x,mon.y,(p.r||75)+20,55,'slam'); if(Math.hypot(P.x-mon.x,P.y-mon.y)<=(p.r||75)&&MX.sees(A,mon,P.x,P.y))MX.hitP(A,mon,p,1.1,p.label||'SLAM','#ff8800'); if(p.zone)MX.zone(A,{x:mon.x,y:mon.y,r:p.r||75,t:p.zt||3,st:p.zone,v:p.v}); }},
  shoot:{range:260,wind:0.3,cd:2.2,want:function(A,mon,m,P,d,p){ return d<=(p.r||260)&&d>(p.min||0); },start:function(A,mon){ mon.spr.setTint(0xfff0c0); },
    fire:function(A,mon,m,P,p){ mon.spr.clearTint(); var n=p.n||1, sp=p.sp||0.28, base=Math.atan2(P.y-mon.y,P.x-mon.x), col=p.col||({arrow:'#c8a060',fire:'#ff7030',ice:'#a0e0ff',poison:'#90e050',rock:'#9a8a78',spark:'#fff080',shard:'#c080ff',ink:'#303050',orb:'#e0a8ff',water:'#80c8ff',web:'#e8e8e8',bolt:'#9fd0ff',net:'#d8d0b0',bubble:'#c0f0ff',feather:'#d8b890',glass:'#c080ff',bone:'#e8e0cc',lava:'#ff6a20',dart:'#80ff80'}[p.p]||'#ffcc66');
      for(var i=0;i<n;i++){ var a=base+(n>1?(i-(n-1)/2)*sp:0)+(p.all?i*Math.PI*2/n:0); MX.proj(A,{x:mon.x,y:mon.y-6,vx:Math.cos(a)*(p.spd||240),vy:Math.sin(a)*(p.spd||240),r:p.size||(p.p==='arrow'||p.p==='dart'?3.5:5),col:col,dmg:mon.def.atk*(p.m||0.8)*(m.enraged?1.3:1),st:p.st,stT:p.t,stV:p.v,homing:p.homing,ric:p.ric||0,pierce:p.pierce,life:p.life||2.6,src:mon,glow:p.homing||p.p==='orb',zone:p.zone,zr:p.zr,kb:p.kb,stick:p.stick,net:p.p==='net'||p.p==='web',kind:p.p}); } }},
  lob:{range:260,wind:0.35,cd:2.6,want:function(A,mon,m,P,d,p){ return d<=(p.r||260)&&d>40; },
    fire:function(A,mon,m,P,p){ var n=p.n||1; for(var i=0;i<n;i++){ var tx=P.x+(i?(Math.random()-0.5)*90:0), ty=P.y+(i?(Math.random()-0.5)*90:0), T0=p.ft||p.t||1.0, rad=p.rad||28;
        MX.tele.circle(A,tx,ty,rad,p.col||'#ff5030',T0); var ball=A.scene.add.circle(mon.x,mon.y-10,p.size||6,MX.col(p.col||'#9a8a78')).setDepth(A.depth(ty)+5);
        (function(tx,ty){ A.scene.tweens.add({targets:ball,x:tx,y:ty,duration:T0*1000,ease:'Sine.inOut',onUpdate:function(tw){ ball.setScale(1+Math.sin(tw.progress*Math.PI)*1.2); },onComplete:function(){ ball.destroy(); MX.fxRing(A,tx,ty,rad,p.col||'#c8b090'); var P2=A.p(); if(!mon.dead&&Math.hypot(P2.x-tx,P2.y-ty)<=rad+6)MX.hitP(A,mon,p,1); if(p.zone)MX.zone(A,{x:tx,y:ty,r:p.zr||rad,t:p.zt||3,st:p.zone,v:p.v}); if(p.summon&&!mon.dead&&(!m.summoned||mon.isBoss)){ m.summoned=true; for(var s=0;s<(p.sn||3);s++){ var sc=A.spawn(p.summon,tx+(s-1)*14,ty,{q:mon.def.sec}); if(sc){ sc._m.summoned=true; sc._m.noSplit=true; sc.noSplit=true; sc.temp=true; } } } if(p.obstacle)MX.wall(A,tx,ty,26,26,p.ot||8); }}); })(tx,ty); } }},
  beam:{range:340,wind:1.0,cd:3.4,start:function(A,mon,m,P,p){ var a=Math.atan2(P.y-mon.y,P.x-mon.x); m.busy.a0=a; MX.tele.line(A,mon.x,mon.y-6,a,p.len||340,p.col||'#ff4040',p.wind||1.0); },
    fire:function(A,mon,m,P,p,b){ var L=p.len||340, a=b.a0; for(var s0=10;s0<L;s0+=8){ if(!A.los(mon.x,mon.y-6,mon.x+Math.cos(a)*s0,mon.y-6+Math.sin(a)*s0)){ L=Math.max(10,s0-8); break; } } var ex=mon.x+Math.cos(a)*L, ey=mon.y-6+Math.sin(a)*L, g=A.scene.add.graphics().setDepth(A.depth(mon.y)+2); g.lineStyle(p.w||10,MX.col(p.col||'#ff6060'),0.85); g.lineBetween(mon.x,mon.y-6,ex,ey); g.lineStyle(3,0xffffff,0.9); g.lineBetween(mon.x,mon.y-6,ex,ey); A.scene.tweens.add({targets:g,alpha:0,duration:350,onComplete:function(){ g.destroy(); }});
      var t=Math.max(0,Math.min(1,((P.x-mon.x)*Math.cos(a)+(P.y-mon.y+6)*Math.sin(a))/L)), qx=mon.x+Math.cos(a)*L*t, qy=mon.y-6+Math.sin(a)*L*t; if(Math.hypot(P.x-qx,P.y-qy)<(p.w||10)+10)MX.hitP(A,mon,p,1.3,p.label||'',p.col); }},
  breath:{range:110,wind:0.45,cd:2.8,start:function(A,mon,m,P,p){ var a=Math.atan2(P.y-mon.y,P.x-mon.x); m.busy.a0=a; MX.tele.cone(A,mon.x,mon.y,a,p.r||110,(p.cone||0.55),p.col||'#ff7030',p.wind||0.45); },
    fire:function(A,mon,m,P,p,b){ var a=b.a0; MX.famStagger(A,mon.x+Math.cos(a)*(p.r||110)*0.6,mon.y+Math.sin(a)*(p.r||110)*0.6,(p.r||110)*0.6,40,'breath'); for(var i=0;i<14;i++){ var aa=a+(Math.random()-0.5)*(p.cone||0.55)*2, rr=Math.random()*(p.r||110); MX.fxDot(A,mon.x+Math.cos(aa)*rr,mon.y+Math.sin(aa)*rr,p.col||'#ff9040',0.9); }
      var d=Math.hypot(P.x-mon.x,P.y-mon.y), df=Math.abs(Math.atan2(Math.sin(Math.atan2(P.y-mon.y,P.x-mon.x)-a),Math.cos(Math.atan2(P.y-mon.y,P.x-mon.x)-a))); if(d<=(p.r||110)+8&&df<=(p.cone||0.55)+0.15&&MX.sees(A,mon,P.x,P.y))MX.hitP(A,mon,Object.assign({st:'burn'},p),1.1); }},
  ring:{range:220,wind:0.5,cd:3.5,moveOk:false,fire:function(A,mon,m,P,p,b){ b.R=8; b.gap=Math.random()*Math.PI*2; b.hit=false; b.g=A.scene.add.graphics().setDepth(A.depth(mon.y)+1); b.cx=mon.x; b.cy=mon.y; },
    act:function(A,mon,m,P,p,b,dt){ b.R0=b.R; b.R+=(p.spd||150)*dt; var g=b.g, gw=p.gap?0.9:0; g.clear(); g.lineStyle(6,MX.col(p.col||'#9fe8ff'),0.8); g.beginPath(); g.arc(b.cx,b.cy,b.R,b.gap+gw/2,b.gap+Math.PI*2-gw/2,false); g.strokePath();
      var d=Math.hypot(P.x-b.cx,P.y-b.cy), a=Math.atan2(P.y-b.cy,P.x-b.cx), inGap=gw&&Math.abs(Math.atan2(Math.sin(a-b.gap),Math.cos(a-b.gap)))<gw/2;
      if(!b.hit&&(Math.abs(d-b.R)<9||(d>b.R0&&d<b.R))&&!inGap&&A.los(b.cx,b.cy,P.x,P.y)){ b.hit=true; MX.hitP(A,mon,p,0.9,'','#9fe8ff'); }
      if(!b.fs&&b.R>=60){ b.fs=true; MX.famStagger(A,b.cx,b.cy,(p.max||230),30,'shriek'); } if(b.R>=(p.max||230)){ g.destroy(); return true; } return false; }},
  pull:{range:170,wind:0.45,cd:4,want:function(A,mon,m,P,d,p){ return d<=(p.r||170)&&d>40; },start:function(A,mon,m,P,p){ MX.tele.line(A,mon.x,mon.y,Math.atan2(P.y-mon.y,P.x-mon.x),Math.hypot(P.x-mon.x,P.y-mon.y),p.col||'#ff7090',0.45); },
    fire:function(A,mon,m,P,p){ var d=Math.hypot(P.x-mon.x,P.y-mon.y); if(d>(p.r||170)+20||!MX.sees(A,mon,P.x,P.y))return; var l=d||1, g=A.scene.add.graphics().setDepth(A.depth(mon.y)+1); g.lineStyle(3,MX.col(p.col||'#ff7090'),0.9); g.lineBetween(mon.x,mon.y,P.x,P.y); A.scene.tweens.add({targets:g,alpha:0,duration:300,onComplete:function(){ g.destroy(); }});
      MX.push(A,(mon.x-P.x)/l,(mon.y-P.y)/l,Math.max(0,d-(p.keep||30))); if(p.m!==0)MX.hitP(A,mon,Object.assign({m:0.5},p),0.5,'pulled','#ff90b0'); else MX.ev(mon,'hit'); }},
  gust:{range:150,wind:0.5,cd:3.5,start:function(A,mon,m,P,p){ MX.tele.cone(A,mon.x,mon.y,Math.atan2(P.y-mon.y,P.x-mon.x),p.r||150,0.5,'#e0f4ff',p.wind||0.5); },
    fire:function(A,mon,m,P,p){ var d=Math.hypot(P.x-mon.x,P.y-mon.y); for(var i=0;i<10;i++)MX.fxDot(A,mon.x+(P.x-mon.x)*i/10,mon.y+(P.y-mon.y)*i/10,'#f4f8ff',0.8); MX.famStagger(A,P.x,P.y,90,45,'gust'); if(d<=(p.r||150)&&MX.sees(A,mon,P.x,P.y)){ var l=d||1; MX.push(A,(P.x-mon.x)/l,(P.y-mon.y)/l,p.dist||110); if(p.m)MX.hitP(A,mon,p,p.m); else MX.ev(mon,'hit'); A.float(P.x,P.y-40,'whoosh!','#e0f4ff'); } }},
  grab:{range:32,wind:0.3,cd:3.5,fire:function(A,mon,m,P,p){ if(Math.hypot(P.x-mon.x,P.y-mon.y)<=(p.r||34)+8&&MX.sees(A,mon,P.x,P.y)){ if(MX.hitP(A,mon,p,0.8,'grabbed','#ffb060'))MX.status(A,'root',p.root||1.2); } }},
  summon:{range:260,wind:0.7,cd:9,want:function(A,mon,m,P,d,p){ if(m.summoned&&!mon.isBoss)return false; m.children=m.children.filter(function(c){ return !c.dead; }); return d<=(p.r||260)&&m.children.length<(p.max||4); },start:function(A,mon){ MX.fxRing(A,mon.x,mon.y,26,'#c0a0ff'); },
    fire:function(A,mon,m,P,p){ for(var i=0;i<(p.n||2);i++){ var a=Math.random()*Math.PI*2, x=mon.x+Math.cos(a)*30, y=mon.y+Math.sin(a)*30; if(!A.canGoM(x,y,mon))continue; var c=A.spawn(p.id,x,y,{q:mon.def.sec,hpMult:p.hp||0.6}); m.summoned=true; if(c){ c._m.aggro=true; c._m.summoned=true; c._m.noSplit=true; c.noSplit=true; c.temp=true; m.children.push(c); MX.fxRing(A,x,y,18,'#c0a0ff'); } } }},
  trap:{range:220,wind:0.4,cd:5,fire:function(A,mon,m,P,p){ for(var i=0;i<(p.n||1);i++){ var x=P.x+(i?(Math.random()-0.5)*80:0), y=P.y+(i?(Math.random()-0.5)*80:0), k=p.k||'snare', g=A.scene.add.circle(x,y,9,MX.col(k==='mine'?'#ffd060':k==='rune'?'#9fe8ff':'#8a6a44'),0.55).setStrokeStyle(2,0x000000,0.5).setDepth(A.depth(y)-0.02); MX.fx(A).traps.push({x:x,y:y,k:k,arm:0.6,t:p.life||12,g:g,src:mon,p:p}); } }},
  cloud:{range:200,wind:0.4,cd:5,fire:function(A,mon,m,P,p){ var self=p.at==='self', x=self?mon.x:P.x, y=self?mon.y:P.y; MX.zone(A,{x:x,y:y,r:p.rad||50,t:p.dur||4,st:p.st||'slow',v:p.v,dps:p.dps?mon.def.atk*p.dps:0,src:mon}); }},
  drain:{range:170,wind:0.5,cd:5,moveOk:true,fire:function(A,mon,m,P,p,b){ b.g=A.scene.add.graphics().setDepth(A.depth(mon.y)+1); b.acc=0; },
    act:function(A,mon,m,P,p,b,dt){ var d=Math.hypot(P.x-mon.x,P.y-mon.y); b.g.clear(); if(d>(p.r||170)+30||b.t>(p.dur||3)||!MX.sees(A,mon,P.x,P.y)){ b.g.destroy(); return true; } b.g.lineStyle(3,MX.col(p.col||'#c04060'),0.8); b.g.lineBetween(mon.x,mon.y-6,P.x,P.y-10);
      b.acc+=dt; if(b.acc>=0.5){ b.acc=0; if(A.hurt(mon.def.atk*(p.m||0.25),'drain','#c04060',true)){ mon._hp=Math.min(mon.maxHp,mon._hp+mon.def.atk*(p.m||0.25)); MX.ev(mon,'hit'); } } return false; }},
  strike:{range:320,wind:0,cd:0.5,want:function(A,mon,m,P,d,p){ var S=MX.S(A.scene); return d<=(p.r||320)&&S.still>=(p.still||1.5); },fire:function(A,mon,m,P,p){ var S=MX.S(A.scene); S.still=0; var x=P.x, y=P.y; MX.tele.circle(A,x,y,22,p.col||'#ffff80',0.45); A.scene.time.delayedCall(450,function(){ if(mon.dead)return; var g=A.scene.add.rectangle(x,y-60,4,120,MX.col(p.col||'#ffff80'),0.9).setDepth(A.depth(y)+3); A.scene.tweens.add({targets:g,alpha:0,duration:250,onComplete:function(){ g.destroy(); }}); var P2=A.p(); if(Math.hypot(P2.x-x,P2.y-y)<24)MX.hitP(A,mon,p,1.2,'⚡','#ffff80'); }); }},
  marks:{range:260,wind:0.3,cd:4.5,fire:function(A,mon,m,P,p){ var n=p.n||5; for(var i=0;i<n;i++){ var x=P.x+(i?(Math.random()-0.5)*(p.spread||140):0), y=P.y+(i?(Math.random()-0.5)*(p.spread||140):0); MX.tele.circle(A,x,y,p.rad||22,p.col||'#ff6040',(p.delay||1.2)+i*(p.seq||0));
      (function(x,y,i){ A.scene.time.delayedCall(((p.delay||1.2)+i*(p.seq||0))*1000,function(){ if(mon.dead)return; MX.fxRing(A,x,y,p.rad||22,p.col||'#ff9040'); var P2=A.p(); if(Math.hypot(P2.x-x,P2.y-y)<(p.rad||22)+6){ A.setIfr(0); MX.hitP(A,mon,p,1); } if(p.zone)MX.zone(A,{x:x,y:y,r:p.rad||22,t:p.zt||3,st:p.zone}); }); })(x,y,i); } }},
  swap:{range:220,wind:0.6,cd:6,start:function(A,mon){ MX.fxRing(A,mon.x,mon.y,20,'#ff80ff'); },fire:function(A,mon,m,P,p){ var x=mon.x, y=mon.y; mon.x=P.x; mon.y=P.y; A.setP(x,y); MX.fxRing(A,x,y,20,'#ff80ff'); A.float(x,y-40,'swapped!','#ff80ff'); MX.ev(mon,'hit'); }},
  wall:{range:220,wind:0.6,cd:7,fire:function(A,mon,m,P,p){ var a=Math.atan2(P.y-mon.y,P.x-mon.x)+Math.PI/2; for(var i=-1;i<=1;i++)MX.wall(A,P.x+Math.cos(a)*i*34+(Math.random()-0.5)*6,P.y+Math.sin(a)*i*34-40,30,30,p.dur||6,p.col); MX.ev(mon,'hit'); }},
  echo:{range:200,wind:0.4,cd:2.5,fire:function(A,mon,m,P,p){ if(m.lastHit==='melee'){ var a=Math.atan2(P.y-mon.y,P.x-mon.x); MX.fxRing(A,mon.x,mon.y,40,'#9fe8ff'); if(Math.hypot(P.x-mon.x,P.y-mon.y)<70&&MX.sees(A,mon,P.x,P.y))MX.hitP(A,mon,p,1,'echo','#9fe8ff'); }
      else MX.ATK.shoot.fire(A,mon,m,P,Object.assign({p:'orb',col:'#9fe8ff',homing:0},p)); }}
};
MX.ATK.banish={range:300,wind:0.7,cd:14,want:function(A,mon,m,P,d,p){ return !!(MX.famNear&&MX.famNear(A.scene,mon.x,mon.y,p.r||300)); },
  start:function(A,mon,m,P,p){ var f=MX.famNear(A.scene,mon.x,mon.y,p.r||300); m.busy.fid=f&&f.fid; if(f)MX.tele.line(A,mon.x,mon.y-6,Math.atan2(f.y-mon.y,f.x-mon.x),Math.hypot(f.x-mon.x,f.y-mon.y),'#b060ff',p.wind||0.7); MX.fxRing(A,mon.x,mon.y,24,'#b060ff'); },
  fire:function(A,mon,m,P,p,b){ if(b.fid&&MX.famKO){ MX.famKO(A.scene,b.fid,p.t||12,'banished!'); MX.ev(mon,'hit'); } }};
MX.famStagger=function(A,x,y,r,amt,why){ if(MX.famStaggerAt)MX.famStaggerAt(A.scene,x,y,r,amt,why); };
// give one monster extra kit tokens (elites): clone its kit so the others stay as they were
MX.addToKit=function(mon,toks){ if(!mon||!mon.kit)return; var k={move:mon.kit.move,atk:mon.kit.atk.slice(),def:mon.kit.def.slice()}; (toks||[]).forEach(function(t){ var P=MX.parse('still | '+t); k.atk=k.atk.concat(P.atk); k.def=k.def.concat(P.def); P.def.forEach(function(d){ if(d.name==='spiritward'&&mon._m)mon._m.sward=d.p.n||3; }); }); mon.kit=k; };
MX.wall=function(A,x,y,w,h,t,col){ var g=A.scene.add.rectangle(x,y,w,h,MX.col(col||'#b0a090'),0.95).setStrokeStyle(2,0x302820,0.8).setDepth(A.depth(y+h/2)); MX.fx(A).walls.push({x:x,y:y,w:w,h:h,t:t||6,g:g}); };

// ── scene-wide tick: projectiles, zones, traps, telegraphs, statuses ──
MX.tickScene=function(scene,dt){ var A=MX.A(scene), F=MX.fx(A), P=A.p(), S=MX.S(scene);
  // player stood still? (for storm spirits)
  if(S.lastP&&Math.hypot(P.x-S.lastP.x,P.y-S.lastP.y)<3)S.still+=dt; else S.still=0; S.lastP={x:P.x,y:P.y};
  ['slowT','rootT','blindT','revT','shrinkT','markT','frogT'].forEach(function(k){ if(S[k]>0)S[k]-=dt; });
  if(S.poisonT>0){ S.poisonT-=dt; S.poisonAcc+=dt; if(S.poisonAcc>=1){ S.poisonAcc=0; A.hurt(S.poisonD,'poison','#90e060',true); } }
  MX.overlay(scene,S);
  F.proj=F.proj.filter(function(o){ o.life-=dt; if(o.life<=0||!o.vis.active){ o.vis.destroy(); return false; }
    if(o.homing){ var a=Math.atan2(P.y-o.y,P.x-o.x), sp=Math.hypot(o.vx,o.vy), ca=Math.atan2(o.vy,o.vx), da=Math.atan2(Math.sin(a-ca),Math.cos(a-ca)); ca+=Math.max(-2.2*dt,Math.min(2.2*dt,da)); o.vx=Math.cos(ca)*sp; o.vy=Math.sin(ca)*sp; }
    var nx=o.x+o.vx*dt, ny=o.y+o.vy*dt;
    if(!A.projOk(nx,ny)&&!o.fly){ if(o.ric>0){ o.ric--; if(!A.projOk(nx,o.y))o.vx*=-1; if(!A.projOk(o.x,ny))o.vy*=-1; nx=o.x+o.vx*dt; ny=o.y+o.vy*dt; MX.ev(o.src,'proj_ricochet'); } else { if(o.zone)MX.zone(A,{x:o.x,y:o.y,r:o.zr||30,t:3,st:o.zone}); if(o.stick){ MX.fx(A).marks.push({x:o.x,y:o.y,t:o.stick,src:o.src}); } o.vis.destroy(); return false; } }
    o.x=nx; o.y=ny; o.vis.setPosition(o.x,o.y);
    if(o.net&&MX.famNetAt&&MX.famNetAt(scene,o.x,o.y)){ o.vis.destroy(); return false; }   // a net catches a familiar
    if(Math.hypot(P.x-o.x,P.y-(o.y+6))<(o.r||5)+10){ if(A.ifr()<=0){ var ok=A.hurt(o.dmg,'',o.col); if(ok){ if(o.st)MX.status(A,o.st,o.stT||2.5,o.stV); if(o.kb){ var l=Math.hypot(o.vx,o.vy)||1; MX.push(A,o.vx/l,o.vy/l,o.kb); } if(o.zone)MX.zone(A,{x:o.x,y:o.y,r:o.zr||30,t:3,st:o.zone}); MX.ev(o.src,'hit'); MX.ev(o.src,'proj_hit'); } } if(!o.pierce){ o.vis.destroy(); return false; } }
    return true; });
  F.zones=F.zones.filter(function(z){ z.t-=dt; if(z.t<=0){ z.vis.destroy(); return false; } z.vis.setAlpha(0.18+0.1*Math.sin(z.t*6)); var d=Math.hypot(P.x-z.x,P.y-z.y);
    if(d<z.r){ z.tick-=dt; if(z.tick<=0){ z.tick=0.8; if(z.st&&z.st!=='dmg'&&z.st!=='lava')MX.status(A,z.st,1.5,z.v); if(z.dps||z.st==='dmg'||z.st==='lava')A.hurt(z.dps||((z.src&&z.src.def.atk)||5)*0.3,'','#ff7050',true); if(z.src)MX.ev(z.src,'zone_hit'); } } return true; });
  F.traps=F.traps.filter(function(t){ t.t-=dt; t.arm-=dt; if(t.t<=0){ t.g.destroy(); return false; } if(t.arm<=0&&Math.hypot(P.x-t.x,P.y-t.y)<14){ t.g.destroy(); if(t.k==='snare'){ MX.status(A,'root',1.6); A.hurt((t.src?t.src.def.atk:4)*0.5,'snare','#c09060'); } else { MX.fxRing(A,t.x,t.y,40,'#ffd060'); A.hurt((t.src?t.src.def.atk:5)*1.1,'BOOM','#ffd060'); MX.push(A,0,1,40); } if(t.src)MX.ev(t.src,'trap_hit'); return false; } return true; });
  F.marks=F.marks.filter(function(k){ k.t-=dt; if(k.t<=0){ MX.fxRing(A,k.x,k.y,34,'#c080ff'); if(Math.hypot(P.x-k.x,P.y-k.y)<34)A.hurt((k.src?k.src.def.atk:6)*0.8,'shard','#c080ff'); return false; } return true; });
  F.tele=F.tele.filter(function(t){ t.t-=dt; if(t.t<=0){ t.g.destroy(); return false; } return true; });
  F.walls=F.walls.filter(function(w){ w.t-=dt; if(w.t<=0){ w.g.destroy(); return false; } return true; });
  // temporary monsters that died (summons, split children) leave the list
  if(scene.worldMonsters&&A.world)scene.worldMonsters=scene.worldMonsters.filter(function(mn){ if(mn.temp&&mn.dead&&!mn._gone){ mn._gone=true; scene.time.delayedCall(700,function(){ mn.cont.destroy(); }); return false; } return true; });
};
MX.overlay=function(scene,S){ var el=document.getElementById('mx-status'); if(!el){ el=document.createElement('div'); el.id='mx-status'; el.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:30;transition:background .3s'; document.body.appendChild(el); }
  var bl=S.blindT>0, sh=S.shrinkT>0, rv=S.revT>0;
  el.style.background=bl?'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 12%, rgba(5,5,15,.92) 34%)':rv?'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(200,120,255,.22) 100%)':'none';
  var hero=scene.player?scene.player.sprite:scene.pSprite, small=sh||S.frogT>0; if(hero&&hero.setScale){ if(small){ if(hero._mxBase===undefined)hero._mxBase=hero.scaleX; hero.setScale(hero._mxBase*0.7); } else if(hero._mxBase!==undefined){ hero.setScale(hero._mxBase); hero._mxBase=undefined; } } };
