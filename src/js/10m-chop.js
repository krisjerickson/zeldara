// ═══════════════════════════════════════════════════════════════════════
// ║ 10m-chop.js — chopping trees (round 40; a round 37 leftover: "Tree chopping has never worked").
// ║ The old code looked for ps.equipped (the field is ps.equip) and for T.TREE tiles, but the painted world's trees are
// ║ props (wd.props, prop 'tree' and the zones' own tree kinds) standing on T.PROP tiles. Now:
// ║   • any axe in the main hand (the Woodcutter's Axe and the round 37 axes) fells the tree in front of the hero
// ║   • the tree is gone, a stump is left (painted 'tr_stump' when it is there), the ground under it can be walked on
// ║   • 1–5 wood, as before (ps.wood, at most 99)
// ║   • which trees are down is saved (ps.chopped, the last ZCHOP.MAX; the oldest grow back when the list is full)
// ║ Village trees are left standing (they belong to the village plan).
// ═══════════════════════════════════════════════════════════════════════
var ZCHOP={RX:/tree|pine|palm|birch|oak|willow|mangrove|spruce|fir$|cedar|cypress|baobab/i, MAX:400,
  key:function(p){ return p.x+'_'+p.y+'_'+p.prop; },
  isTree:function(p){ return !!(p&&!p.vill&&ZCHOP.RX.test(p.prop)); },
  canChop:function(ps){ var id=ps&&ps.equip&&ps.equip.lHand, I=id&&ITEMS[id]; return !!(I&&(id==='axe'||I.cls==='axe')); }
};
Object.assign(WorldScene.prototype,{
  // when a game starts or loads: the trees of this save are down, the ones another save felled stand again
  _chopInit(){ var wd=this.wd, ps=this.playerState, self=this; if(!wd||!ps)return; if(!Array.isArray(ps.chopped))ps.chopped=[];
    var want=new Set(ps.chopped); wd._chopped=wd._chopped||new Set(); wd._chopTiles=wd._chopTiles||{};
    Array.from(wd._chopped).forEach(function(k){ if(!want.has(k))self._chopRestore(k); });
    want.forEach(function(k){ if(!wd._chopped.has(k))self._chopApply(k,true); }); },
  _chopProp(key){ var wd=this.wd, a=key.split('_'), x=+a[0], y=+a[1], L=(wd.propsByChunk&&wd.propsByChunk[Math.floor(x/WCH)+'_'+Math.floor(y/WCH)])||wd.props||[];
    for(var i=0;i<L.length;i++){ if(ZCHOP.key(L[i])===key)return L[i]; } return null; },
  _chopApply(key,quiet){ var wd=this.wd, p=this._chopProp(key); if(!p)return false; wd._chopped.add(key); var saved=[], KL=WK_REG.list;
    for(var a=0;a<(p.h||1);a++)for(var b=0;b<(p.w||1);b++){ var X=p.x+b, Y=p.y+a; if(X<0||Y<0||X>=WORLD_W||Y>=WORLD_H)continue; if(wd.tiles[Y][X]!==T.PROP)continue; var k=Y*WORLD_W+X, gt=_wgKindT(KL[wd.kind[k]],wd.region?wd.region[k]:1); if(gt===T.PROP)gt=T.DIRT;
      saved.push([X,Y,T.PROP]); wd.tiles[Y][X]=gt; }
    wd._chopTiles[key]=saved; if(!quiet)this._chopRepaint(p); return true; },
  _chopRestore(key){ var wd=this.wd; (wd._chopTiles[key]||[]).forEach(function(q){ wd.tiles[q[1]][q[0]]=q[2]; }); delete wd._chopTiles[key]; wd._chopped.delete(key); var p=this._chopProp(key); if(p)this._chopRepaint(p); },
  _chopRepaint(p){ if(!this._wr)return; var self=this, seen={}; [[p.x,p.y],[p.x+(p.w||1)-1,p.y+(p.h||1)-1],[p.x,p.y-3]].forEach(function(q){ var k=Math.floor(q[0]/WCH)+'_'+Math.floor(q[1]/WCH); if(seen[k])return; seen[k]=1; if(self._wr.chunks.has(k)||self._wr.jobs.has(k))self._refreshChunkAt(q[0],q[1]); }); },
  // the tree in front of the hero (within about a tile and a half), or null
  _chopFind(px,py,dir){ var wd=this.wd, fx={right:1,left:-1,up:0,down:0}[dir]||0, fy={right:0,left:0,up:-1,down:1}[dir]||0, tx=(px+fx*TILE*0.9)/TILE, ty=(py+fy*TILE*0.9)/TILE, best=null, bd=1.8;
    var cx=Math.floor(tx/WCH), cy=Math.floor(ty/WCH);
    for(var gy=cy-1;gy<=cy+1;gy++)for(var gx=cx-1;gx<=cx+1;gx++){ (wd.propsByChunk&&wd.propsByChunk[gx+'_'+gy]||[]).forEach(function(p){ if(!ZCHOP.isTree(p)||(wd._chopped&&wd._chopped.has(ZCHOP.key(p))))return;
        var mx=p.x+(p.w||1)/2, my=p.y+(p.h||1)-0.5, d=Math.hypot(mx-tx,my-ty); if(d<bd){ bd=d; best=p; } }); }
    return best; },
  // a swing with an axe: fell the tree in front; true when one fell
  _chopTree(px,py,dir){ var ps=this.playerState; if(!ZCHOP.canChop(ps))return false; var p=this._chopFind(px,py,dir); if(!p)return false; var key=ZCHOP.key(p);
    if(!this.wd._chopped)this._chopInit(); this._chopApply(key); ps.chopped=(ps.chopped||[]).filter(function(k){ return k!==key; }); ps.chopped.push(key);
    while(ps.chopped.length>ZCHOP.MAX){ this._chopRestore(ps.chopped.shift()); }      // the oldest stump grows back
    var X=(p.x+(p.w||1)/2)*TILE, Y=(p.y+(p.h||1))*TILE-8, self=this;
    try{ var em=this.add.particles(0,0,'leaf',{speed:{min:30,max:90},angle:{min:200,max:340},gravityY:80,lifespan:{min:600,max:1100},scale:{start:1.2,end:0.4},alpha:{start:1,end:0},tint:[0x5f9a48,0x7fc060,0x9a6a3a],emitting:false}); em.setDepth(WR_DEPTH(Y)+1); em.explode(14,X,Y-30); this.time.delayedCall(1300,function(){ em.destroy(); }); }catch(e){}
    var roll=1+Math.floor(Math.random()*5), space=Math.max(0,99-(ps.wood||0)), got=Math.min(roll,space);
    if(got>0){ ps.wood=(ps.wood||0)+got; this._floatText(px,py-32,'+'+got+' 🪵','#c09050'); showNotif('🪓 Timber! +'+got+' wood  ('+ps.wood+'/99)','#c08040'); this._emitUI(); }
    else showNotif('🪓 Timber! Your wood bag is full (99/99)','#ff8844');
    return true; }
});
// a stump where a felled tree stood (called by the chunk painter, 05c)
function _chopStump(ctx,x,y,w){ var Z=_scn(); if(Z&&Z.draw(ctx,'tr_stump',x,y,0))return; var r=Math.max(7,w*0.22);
  ctx.fillStyle='rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(x+2,y,r*1.3,r*0.5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#1c1610'; ctx.fillRect(x-r-1,y-r*0.9-1,r*2+2,r*0.9+2); ctx.fillStyle='#6a4a2c'; ctx.fillRect(x-r,y-r*0.9,r*2,r*0.9);
  ctx.fillStyle='#1c1610'; ctx.beginPath(); ctx.ellipse(x,y-r*0.9,r+1,r*0.45+1,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#c8a070'; ctx.beginPath(); ctx.ellipse(x,y-r*0.9,r,r*0.45,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#8a6440'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(x,y-r*0.9,r*0.55,r*0.25,0,0,Math.PI*2); ctx.stroke(); }
