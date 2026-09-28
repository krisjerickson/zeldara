// ═══════════════════════════════════════════════════════════════════════
// ║ WHO SPAWNS WHERE (Phase 4): 80% this quadrant + this segment · 15%
// ║ this quadrant, another segment · 5% visitors from another quadrant
// ║ (scaled to the local level). Mainland monsters favour their terrain
// ║ (the roster's T: tags), some only come out at night, packs have an alpha.
// ═══════════════════════════════════════════════════════════════════════
var MON_SEG_OF=function(R){ return R.seg; };
// roster ids for a quadrant + segment
function monPool(q,seg){ return MON_ROSTER.filter(function(R){ return R.q===q&&R.seg===seg; }); }
// pick a roster monster by the 80/15/5 rule; weight(R) biases the choice (terrain)
function monPick(rng,q,seg,weight){ var r=rng.next(), pool, visitor=false;
  if(r<0.80)pool=monPool(q,seg);
  else if(r<0.95)pool=MON_ROSTER.filter(function(R){ return R.q===q&&R.seg!==seg; });
  else { var qs=[1,2,3,4].filter(function(x){ return x!==q; }), oq=qs[Math.floor(rng.next()*qs.length)]; pool=monPool(oq,seg); visitor=true; }
  var ws=pool.map(function(R){ return weight?weight(R):1; }), tot=ws.reduce(function(a,b){return a+b;},0), x=rng.next()*tot;
  for(var i=0;i<pool.length;i++){ x-=ws[i]; if(x<=0)return {R:pool[i],visitor:visitor}; } return {R:pool[pool.length-1],visitor:visitor}; }
// terrain affinity: roster T: tag words vs the zone's name + nearby water/lava
var MON_TERRAIN_WORDS={water:/water|pool|pond|river|shallow|marsh|bog|lake|lil|shore/,lava:/lava|magma|crust|volcano/};
function monTerrainWeight(R,zoneName,nearWater,nearLava){ var t=(R.tags.find(function(x){ return x.indexOf('T:')===0; })||'').slice(2).toLowerCase(); if(!t)return 1;
  var w=1, zn=(zoneName||'').toLowerCase(); t.split(/[,;]| and /).forEach(function(part){ part=part.trim(); if(!part)return; var words=part.split(/\s+/).filter(function(x){ return x.length>3; });
    if(words.some(function(wd){ return zn.indexOf(wd.replace(/s$/,''))>=0; }))w+=6; });
  if(MON_TERRAIN_WORDS.water.test(t))w*=nearWater?4:0.35; if(MON_TERRAIN_WORDS.lava.test(t))w*=nearLava?4:0.5; if(/everywhere/.test(t))w+=1; return w; }
// legacy monsters (their own game code) wear their pixel sprite too
function monLegacyBody(scene,rid,def){ var R=MON_BY_ID[rid]; if(!R||!scene.textures)return null; var sc=MX.scaleOf(R), spr=scene.add.image(0,4,MX.tex(scene,R),'0').setOrigin(0.5,0.85).setScale(sc), col=def.color;
  spr.setFillStyle=function(c){ if(c===0xffffff)this.setTintFill(0xffffff); else if(c===undefined||c===col)this.clearTint(); else this.setTint(c); return this; }; return spr; }

Object.assign(WorldScene.prototype,{
  _spawnRosterMon(rid,wx,wy,sec,rng,o){ o=o||{}; var R=MON_BY_ID[rid]; if(!R)return null;
    if(MON_LEGACY[rid])return this._spawnLegacyMon(MON_LEGACY[rid],rid,wx,wy,sec,rng,o);
    var mon=MX.spawn(this,rid,wx,wy,{q:sec,alpha:o.alpha}); if(!mon)return null; mon.section=sec; mon.respawnTimer=0; this.worldMonsters.push(mon); return mon; },
  _spawnLegacyMon(key,rid,wx,wy,sec,rng,o){ var base=MDEFS[key]; if(!base)return null; var R=MON_BY_ID[rid]||{tier:2,q:sec};
    var st=MX.stats(R,sec), mdef=Object.assign({},base,{boss:false,name:R.name||base.name,r:Math.min(base.r,13)});
    if(base.boss){ mdef.hp=st.hp; mdef.atk=st.atk; mdef.def=st.def; mdef.xp=st.xp; mdef.gMin=st.gMin; mdef.gMax=st.gMax; }
    var lv=st.lv, hp=base.boss?st.hp:Math.round(Math.max(base.hp,st.hp*0.9)), atk=base.boss?st.atk:Math.max(base.atk,st.atk), df=base.boss?st.def:base.def;
    if(o.alpha){ hp=Math.round(hp*1.6); atk=Math.round(atk*1.3); }
    var cont=this.add.container(wx,wy).setDepth(9), shadow=this.add.ellipse(0,mdef.r+2,mdef.r*2.2,7,0x000000,.3);
    var body=monLegacyBody(this,rid,mdef)||this.add.circle(0,0,mdef.r,mdef.color);
    var hpBg=this.add.rectangle(0,-(mdef.r+22),28,4,0x000000,.7), hpFill=this.add.rectangle(-14,-(mdef.r+22),28,4,0xff3333).setOrigin(0,.5);
    var lvCol=lv>=15?'#ff4444':lv>=10?'#ff8844':lv>=5?'#ffdd44':'#88ff88';
    var nameT=this.add.text(0,-(mdef.r+30),(o.alpha?'Alpha ':'')+mdef.name+' Lv.'+lv,{fontSize:'7px',color:lvCol,fontFamily:'Segoe UI',stroke:'#000',strokeThickness:2}).setOrigin(.5);
    cont.add([shadow,body,hpBg,hpFill,nameT]);
    var mon={cont:cont,body:body,hpFill:hpFill,type:key,rid:rid,def:mdef,hp:hp,maxHp:hp,x:wx,y:wy,spawnX:wx,spawnY:wy,section:sec,dead:false,respawnTimer:0,level:lv,monDef:df,monAtk:atk,state:'wander',atkTimer:0,tags:R.tags||[],_md:{}};
    this.worldMonsters.push(mon); return mon; },
  // replaces the old 2-types-per-region pods
  _spawnRosterPods(){ var self=this, rng=new PRNG(WORLD_SEED+77777), wd=this.wd;
    var campGuards=this._initCamps(new PRNG(WORLD_SEED+55555));   // two thirds guard camps (10h-world-camps.js)
    for(var sec=1;sec<=4;sec++){ var spawned=0, target=Math.max(40,Math.round((campGuards[sec]||0)/2)), guard=0;   // one third roam
      while(spawned<target&&guard++<2000){ var pc=self._randLand(rng,sec); if(!pc)continue;
        var zi=wd.zone[pc.ty*WORLD_W+pc.tx], z=zi===255?null:WMAP_ZONES[zi], zname=z?_wmZoneName(z.id):'';
        var nearW=false, nearL=false; for(var yy=-5;yy<=5&&!(nearW&&nearL);yy+=2)for(var xx=-5;xx<=5;xx+=2){ var t=self.tiles[pc.ty+yy]&&self.tiles[pc.ty+yy][pc.tx+xx]; if(t===T.SHALLOW_WATER||t===T.DEEP_WATER)nearW=true; if(t===T.THIN_MAGMA||t===T.DEEP_MAGMA)nearL=true; }
        var pick=monPick(rng,sec,'main',function(R){ return R.seg==='main'?monTerrainWeight(R,zname,nearW,nearL):1; }), R=pick.R;
        var pack=R.tags.indexOf('pack')>=0, n=pack?3+Math.floor(rng.next()*3):1+Math.floor(rng.next()*2);
        for(var i=0;i<n&&spawned<target;i++){ var tx=pc.tx+Math.floor((rng.next()-0.5)*6), ty=pc.ty+Math.floor((rng.next()-0.5)*6);
          if(tx<0||ty<0||tx>=WORLD_W||ty>=WORLD_H||getTileSection(tx,ty)!==sec)continue;
          var tt=self.tiles[ty][tx], swim=MX.KITS[R.id]&&/^swim/.test(typeof MX.KITS[R.id]==='string'?MX.KITS[R.id]:MX.KITS[R.id].move.name);
          if(ALWAYS_BLOCKED.has(tt)&&!(swim&&(tt===T.DEEP_WATER||tt===T.SHALLOW_WATER||tt===T.DEEP_MAGMA||tt===T.THIN_MAGMA)))continue;
          if(Math.hypot(tx-CENTER_X,ty-CENTER_Y)<VILLAGE_RADIUS+12||self._nearSafeSpot(tx,ty,12))continue;
          if(self._spawnRosterMon(R.id,tx*TILE+TILE/2,ty*TILE+TILE/2,sec,rng,{alpha:pack&&i===0}))spawned++; } } }
  }
});
