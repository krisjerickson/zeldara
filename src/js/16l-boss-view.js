// ═══════════════════════════════════════════════════════════════════════
// ║ 16l-boss-view.js — round 64d: KEEP THE BOSS IN VIEW.
// ║ Kris: "bosses tend to go to the top of the screen and then you can't see them very well as they are covered up by your health mana and
// ║ experience bar … let's have bosses generally not go to the top part of the screen so they don't get cut off by being off screen. this
// ║ doesn't have to be a hard rule, but generally try and center the bosses a bit more".
// ║  · (the hero's bars are now a small panel at the top left — styles.css)
// ║  · THE CAMERA FRAMES THE FIGHT: while a boss is awake and near, the view leans from the hero toward the boss (about 40 % of the way,
// ║    never so far that the hero leaves the middle of the screen), and a little further when the boss's head would sit under the top bar.
// ║  · A SOFT PULL: a boss that is walking about in the top fifth of the view drifts a little downward (it never walks through walls, and a
// ║    boss that stands still is left where it stands).
// ║ Switch: ZBV.on (Dev: ZBV.on=false).
// ═══════════════════════════════════════════════════════════════════════
var ZBV={ on:true, K:0.45, KX:0.24, KY:0.26, TOP:0.17, HERO:0.82, PULL:46, NEAR:760, ZMIN:0.76,
  boss:function(sc,hx,hy){ var L=(sc.sys&&sc.sys.settings.key==='Dungeon')?sc.monsters:(sc.worldMonsters||[]), best=null, bd=ZBV.NEAR;
    for(var i=0;i<(L||[]).length;i++){ var m=L[i]; if(!m||m.dead||m.hp<=0||!m.cont||!m.cont.visible||!(m.isBoss||(m.def&&m.def.boss)))continue; if(m._m&&m._m.aggro===false&&!m._engT)continue; var d=Math.hypot(m.x-hx,m.y-hy); if(d<bd){ bd=d; best=m; } } return best; },
  // the boss's drawn body: centre and top
  body:function(m){ try{ var r=m.cont.getBounds(); if(r.height>8&&r.height<2000)return {cx:r.centerX,cy:r.centerY,top:r.y}; }catch(e){} var h=((m.def&&m.def.r)||30)*3; return {cx:m.x,cy:m.y-h/2,top:m.y-h}; },
  tick:function(sc,hx,hy,dt){ var cam=sc.cameras&&sc.cameras.main; if(!cam)return; var S=sc._zbv||(sc._zbv={ox:0,oy:0}), wx=0, wy=0, m=ZBV.on?ZBV.boss(sc,hx,hy):null;
    S.over=0; if(m){ var zb=S.z0||cam.zoom, W=cam.width/zb, H=cam.height/zb, B=ZBV.body(m), dx=B.cx-hx, dy=B.cy-hy;
      wx=Math.max(-W*ZBV.KX,Math.min(W*ZBV.KX,dx*ZBV.K)); wy=Math.max(-H*ZBV.KY,Math.min(H*ZBV.KY,dy*ZBV.K));
      // the boss's head under the top bar? lean up a little more — while the hero stays clear of the bottom
      var top=B.top-(hy+wy)+H/2, need=H*ZBV.TOP-top; if(need>0){ var room=H*ZBV.HERO-(H/2-wy), e=Math.max(0,Math.min(need,room)); wy-=e; need-=e; }
      var H0=S.z0?cam.height/S.z0:H; S.over=need>0?need/H0:0;
      // the soft pull: a boss walking about high in the view drifts downward
      if(sc.sys.settings.key==='Dungeon'&&top<H*0.2){ var mv=S.lx!==undefined&&Math.hypot(m.x-S.lx,m.y-S.ly)>0.4, busy=m._m&&m._m.busy; if(mv&&!busy&&m.y<hy-40){ var ny=m.y+ZBV.PULL*dt; if(!sc._canGoD||sc._canGoD(m.x,ny)){ m.y=ny; m.cont.setPosition(m.x,m.y); } } }
      S.lx=m.x; S.ly=m.y; }
    var k=Math.min(1,dt*2.6); S.ox+=(wx-S.ox)*k; S.oy+=(wy-S.oy)*k; if(Math.abs(S.ox)<0.3&&Math.abs(S.oy)<0.3&&!m){ S.ox=0; S.oy=0; }
    if(cam.setFollowOffset)cam.setFollowOffset(-S.ox,-S.oy);
    // still cut off at the top (a tall boss far above)? the view eases out a little (to about three quarters), and back in when the fight moves on
    if(S.z0===undefined||(S.zs!==undefined&&Math.abs(cam.zoom-S.zs)>1e-4)){ S.z0=cam.zoom; S.zf=1; }      // someone else set the zoom: that is the base
    var zf=1; if(m&&S.over>0&&sc.sys.settings.key==='Dungeon')zf=Math.max(ZBV.ZMIN,1-S.over); S.zf+=(zf-S.zf)*Math.min(1,dt*2.4); if(Math.abs(S.zf-1)<0.002&&zf===1)S.zf=1; S.zs=S.z0*S.zf; if(Math.abs(cam.zoom-S.zs)>1e-4)cam.setZoom(S.zs); else S.zs=cam.zoom; }
};
setTimeout(function(){
  if(typeof DungeonScene!=='undefined'){ var D=DungeonScene.prototype, u0=D.update; D.update=function(t,ms){ var r=u0.apply(this,arguments); if(this._ready&&!this._playerDead)try{ ZBV.tick(this,this.px,this.py,Math.min(0.1,ms/1000)); }catch(e){ if(!this._zbvErr){ this._zbvErr=1; console.warn('boss view',e); } } return r; }; }
  if(typeof WorldScene!=='undefined'){ var Wp=WorldScene.prototype, w0=Wp.update; Wp.update=function(t,ms){ var r=w0.apply(this,arguments); if(this.player&&this.cameras)try{ ZBV.tick(this,this.player.x,this.player.y,Math.min(0.1,ms/1000)); }catch(e){ if(!this._zbvErr){ this._zbvErr=1; console.warn('boss view',e); } } return r; }; }
},0);
// ══ round 64d (Kris: "when going into the grasslands mini volcano, the village map still showed up for me … both fix this for the sandbox, and make
// sure it's not happening with normal play"): the corner map belongs to the place you are in. While an adventure site, forge or Muspelheim is
// running, a late draw from the sleeping World (its last travel tick, a menu that redraws the World's map) is turned into the site's own map,
// and the site redraws its map every second, so the World's picture can never stay there ══
setTimeout(function(){ if(typeof _drawMinimapHud!=='function')return; var d0=_drawMinimapHud;
  _drawMinimapHud=function(ws,dng){ if(ws&&!dng){ try{ var D=game.scene.getScene('Dungeon'); if(D&&(game.scene.isActive('Dungeon')||game.scene.isPaused('Dungeon'))&&!(ws.sys&&ws.sys.isActive())){ if(D.dtiles&&D._dngFogExplored)return d0(null,D); return; } }catch(e){} } return d0.apply(this,arguments); };
  if(typeof DungeonScene!=='undefined'){ var D=DungeonScene.prototype, u0=D.update; D.update=function(t,ms){ var r=u0.apply(this,arguments); this._mmT=(this._mmT||0)+ms; if(this._mmT>1000&&this.dtiles&&this._dngFogExplored){ this._mmT=0; try{ d0(null,this); }catch(e){} } return r; }; }
},0);
