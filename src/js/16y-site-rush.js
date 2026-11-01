// ═══════════════════════════════════════════════════════════════════════
// ║ 16y-site-rush.js — round 85: NO MORE RUNNING STRAIGHT THROUGH AN ADVENTURE SITE (Kris: "adventure sites are too easy to just rush
// ║ through right now, and you don't have to actually fight monsters and instead can just run by them … i don't want to make it impossible
// ║ to go to the next level … without killing all enemies, but i want this mechanic to be more balanced"; A1 answered: the proposed table).
// ║  · THE CHASE — a monster that has seen you keeps after you for a while instead of giving up at the edge of its patch; at Shieldbearer
// ║    and Ragnarök it puts on bursts of speed to catch up when you pull away.
// ║  · THE MOB AT THE DOOR — the stairs down cannot be taken while too many of the monsters that are after you are close by: they crowd the
// ║    door. Bring them down (or lose them) until two or fewer are near and you can push through.
// ║        difficulty      chase                         mobbed when this many are near the stairs
// ║        Hearthside      none (as before)              never
// ║        Wayfarer        8 s after it last saw you     5 or more
// ║        Shieldbearer    10 s, +20 % bursts            4 or more
// ║        Ragnarök        12 s, +35 % bursts            3 or more
// ║    "near" = within 4½ tiles of the stairs and after you (bosses, the unseen and the calmed don't count). Always passable at 2 or fewer.
// ║  · Monsters that lose you (a vanish, a hiding place — round 85's evasion, 16z) drop the chase and stop counting.
// ║ Switch: ZRUSH.on. Numbers: ZRUSH.LV.
// ═══════════════════════════════════════════════════════════════════════
var ZRUSH={ on:true, NEAR:4.5, FREE:2,
  LV:[{chase:0,boost:1,mob:99},{chase:8,boost:1,mob:5},{chase:10,boost:1.2,mob:4},{chase:12,boost:1.35,mob:3}],
  cfg:function(){ var L=typeof ZDiff!=='undefined'?ZDiff.lv():1; return ZRUSH.LV[L]||ZRUSH.LV[1]; },
  lost:function(sc){ return typeof ZSTEALTH!=='undefined'&&ZSTEALTH.hidden(sc); },
  // the monsters after you that crowd the stairs
  mob:function(sc){ var S=sc.stairsDownTile; if(!S||!sc.monsters)return []; var x=S.x*TILE+TILE/2, y=S.y*TILE+TILE/2, R=ZRUSH.NEAR*TILE;
    return sc.monsters.filter(function(m){ if(!m||m.dead||m.isBoss||m.hp<=0||(m._hp!==undefined&&m._hp<=0))return false; var M=m._m; if(M&&(M.hidden||M.sub||!M.aggro))return false; if(!M&&m.state!=='chase')return false; if(m._calm)return false; if(m.cont&&(!m.cont.visible||m.cont.alpha<0.2))return false;
      return Math.hypot(m.x-x,m.y-y)<R; }); },
  blocked:function(sc){ if(!ZRUSH.on||ZRUSH.lost(sc))return null; var c=ZRUSH.cfg(); if(c.mob>=99)return null; var L=ZRUSH.mob(sc); if(L.length>=c.mob&&L.length>ZRUSH.FREE)return L; return null; },
  // a ring of warning round the stairs while they are mobbed
  ring:function(sc,on){ var S=sc.stairsDownTile; if(!S)return; if(!on){ if(sc._rushG){ sc._rushG.destroy(); sc._rushG=null; } return; }
    var g=sc._rushG||(sc._rushG=sc.add.graphics().setDepth(26)), x=S.x*TILE+TILE/2, y=S.y*TILE+TILE/2, t=Date.now()/1000; g.clear(); g.lineStyle(3,0xff4a3a,0.55+0.3*Math.sin(t*6)); g.strokeCircle(x,y,TILE*1.3); g.lineStyle(1,0xffb070,0.5); g.strokeCircle(x,y,ZRUSH.NEAR*TILE); },
  tick:function(sc,dt){ if(!ZRUSH.on||!sc.monsters)return; var c=ZRUSH.cfg(), P={x:sc.px,y:sc.py}, lost=ZRUSH.lost(sc);
    if(c.chase>0)sc.monsters.forEach(function(m){ var M=m&&m._m; if(!M||m.dead||m.isBoss||M.hidden||m._calm)return; var d=Math.hypot(P.x-m.x,P.y-m.y);
      if(lost){ M._chaseT=0; return; }
      if(M.aggro&&d<300&&(d<14||MX.sees(MX.A(sc),m,P.x,P.y)))M._chaseT=c.chase;      // it sees you: the chase is on
      if(M._chaseT>0){ M._chaseT-=dt; if(d<900)M.aggro=true;
        if(c.boost>1&&d>110&&(!M.busy||M.busy.moveOk)&&!(m._slow>0)){ var spd=((m.kit&&m.kit.move&&m.kit.move.p.spd)||m.def.spd||55)*(c.boost-1); MX.step(MX.A(sc),m,Math.atan2(P.y-m.y,P.x-m.x),spd,dt,false); } } });
    var B=sc.stairsDownTile&&Math.hypot(P.x-(sc.stairsDownTile.x*TILE+16),P.y-(sc.stairsDownTile.y*TILE+16))<TILE*8?ZRUSH.blocked(sc):null; ZRUSH.ring(sc,!!B); }
};
(function(){ if(typeof DungeonScene==='undefined')return; var D=DungeonScene.prototype;
  var it=D._interact; D._interact=function(){ var self=this, near=(this.interactables||[]).find(function(i){ return !i.opened&&Math.hypot(self.px-i.x,self.py-i.y)<TILE*1.8; });
    if(near&&near.type==='stairs_down'){ var L=ZRUSH.blocked(this); if(L){ var c=ZRUSH.cfg(); if(typeof showNotif==='function')showNotif('⚔ The mob crowds the stairs — '+L.length+' are after you here. Bring them down to '+ZRUSH.FREE+' (or lose them) to push through.','#ff9a70');
        L.forEach(function(m){ if(self._floatText)self._floatText(m.x,m.y-(m.def&&m.def.r||14)-14,'!','#ff6a50'); }); try{ this.cameras.main.shake(90,0.003); }catch(e){} return; } }
    return it.apply(this,arguments); };
  var up=D.update; D.update=function(t,ms){ var r=up.apply(this,arguments); if(this.monsters&&!(typeof isGamePaused==='function'&&isGamePaused()))try{ ZRUSH.tick(this,Math.min(0.05,ms/1000)); }catch(e){ if(!this._rushErr){ this._rushErr=1; console.warn('site rush',e); } } return r; };
})();
