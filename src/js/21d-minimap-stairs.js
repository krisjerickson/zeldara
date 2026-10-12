// ═══════════════════════════════════════════════════════════════════════
// ║ 21d-minimap-stairs.js — round 49 (Kris: "First dungeon level we tried had not stairs from the first floor to the second floor. Make sure
// ║ all levels of adventure sites all have floor entrances and exits").
// ║ Every floor of every site has its way in and out (checked floor by floor in tests/test_round49.py), but on the big floors the stairs
// ║ can sit far off in the dark. The site minimap now always marks them: a gold ▼ / ▲ for the way on and a pale mark for the way back, from
// ║ the moment you arrive. A way on that the site hides on purpose (Lightning Rod's vault behind a hidden door — Kris asked for its stairs
// ║ to be hard to find) only shows once its door is open.
// ═══════════════════════════════════════════════════════════════════════
var ZSTAIRMM={ on:true,
  hidden:function(d,t){ var m=d._lab, S=m&&m.site&&m.site.secrets, live=d._zspSecrets||[]; if(!S||!t)return false;
    for(var i=0;i<S.length;i++){ var s=S[i]; if(s&&s[2]==='room'&&s[3]&&s[3][0]===t.x&&s[3][1]===t.y&&live[i]&&!live[i].open)return true; } return false; },
  mark:function(ctx,x,y,s,down,col){ ctx.save(); ctx.fillStyle=col; ctx.strokeStyle='#1a1206'; ctx.lineWidth=1.5; ctx.beginPath();
    if(down){ ctx.moveTo(x-s,y-s*0.7); ctx.lineTo(x+s,y-s*0.7); ctx.lineTo(x,y+s*0.8); } else { ctx.moveTo(x-s,y+s*0.7); ctx.lineTo(x+s,y+s*0.7); ctx.lineTo(x,y-s*0.8); }
    ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); },
  draw:function(d){ if(!ZSTAIRMM.on||!d||!d.dtiles||!d._dngFogExplored)return; var cv=document.getElementById('minimap-hud-canvas'); if(!cv)return; var ctx=cv.getContext('2d'), sx=cv.width/DW, sy=cv.height/DH;
    var tw=d.siteType==='tower'||d._theme==='tower_island', on=d.stairsDownTile, back=d.stairsUpTile, P=function(t){ return [(t.x+0.5)*sx,(t.y+0.5)*sy]; };
    if(back){ var b=P(back); ZSTAIRMM.mark(ctx,b[0],b[1],4,tw,'#cfd8e8'); }
    if(on&&!d.isLastFloor&&!ZSTAIRMM.hidden(d,on)){ var a=P(on); ctx.save(); ctx.fillStyle='rgba(255,210,90,0.28)'; ctx.beginPath(); ctx.arc(a[0],a[1],8,0,Math.PI*2); ctx.fill(); ctx.restore(); ZSTAIRMM.mark(ctx,a[0],a[1],5,!tw,'#ffd060'); } } };
(function(){ if(typeof _drawMinimapHud!=='function')return; var f0=_drawMinimapHud; _drawMinimapHud=function(ws,dng){ var r=f0.apply(this,arguments); try{ if(dng)ZSTAIRMM.draw(dng); }catch(e){} return r; }; })();
