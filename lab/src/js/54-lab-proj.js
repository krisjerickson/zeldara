// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 14 — PROJECTILES tab: arrows & bolts (6 looks), spells (5), monster
// ║ shots (4). Every card plays the shots flying across grass and across a dark
// ║ dungeon floor, at game size and enlarged. ☆ Pick one per group (or more,
// ║ with notes). Picks are saved as 'proj-<id>'. Art: src/js/07zx-projectiles.js.
// ═══════════════════════════════════════════════════════════════════════
(function(){ LBR.TABS.push('proj');
  var KINDS={arrow:[['arrow','Arrow'],['arrow_cold','Cold'],['arrow_fire','Fire'],['arrow_heat','Seeking'],['dart','Dart']],
             spell:[['frost_bolt','Frost bolt'],['fireball','Fireball'],['lightning','Lightning'],['ice_shards','Ice shards'],['void_orb','Void orb']],
             shot:[['rock','Rock'],['spit','Spit'],['bone_arrow','Bone arrow'],['dark_bolt','Dark bolt']]};
  var fam=function(S){ return ZProj.ARROWS.indexOf(S)>=0?'arrow':ZProj.SPELLS.indexOf(S)>=0?'spell':'shot'; };
  LBR.drawers.proj=function(cv,c,W,H,t,full,id){ var S=ZProj.byId(id), F=fam(S), K=KINDS[F], n=K.length, half=Math.round(W*0.56), i;
    // two grounds: grass (left, game size ×2) and dungeon stone (right, enlarged ×3.2)
    c.fillStyle='#6f9a52'; c.fillRect(0,0,half,H); c.fillStyle='rgba(60,100,40,.35)'; for(i=0;i<70;i++){ c.fillRect((i*97)%half,(i*53)%H,2,5); }
    c.fillStyle='#1b1d26'; c.fillRect(half,0,W-half,H); c.strokeStyle='rgba(255,255,255,.05)'; for(i=0;i<8;i++){ c.strokeRect(half+((i%3)*70)+10,Math.floor(i/3)*80+10,66,76); }
    c.fillStyle='rgba(255,255,255,.55)'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='left'; c.fillText('in the field · game size ×2',8,14); c.fillStyle='rgba(255,255,255,.4)'; c.fillText('enlarged, on dungeon stone',half+8,14);
    var lane=(H-30)/n;
    K.forEach(function(k,li){ var y=26+lane*(li+0.5), per=1.5+(F==='spell'&&k[0]==='void_orb'?1.3:0)+(F==='shot'?0.4:0), u=((t+li*0.37)/per)%1, x0=30, x1=half-34, x=x0+(x1-x0)*u, arc=(S.arc||0)*(F==='arrow'?1:0)+(k[0]==='rock'||k[0]==='spit'?16:0), z=arc*Math.sin(Math.PI*u)*2, slope=Math.atan2(-arc*2*Math.PI*Math.cos(Math.PI*u),(x1-x0));
      c.fillStyle='rgba(255,255,255,.75)'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText(k[1],6,y+lane*0.42);
      // shadow on the ground
      if(S.shadow||k[0]==='rock'||k[0]==='spit'){ c.fillStyle='rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(x,y+10,13-z*0.08,3.2,0,0,Math.PI*2); c.fill(); }
      // a missed arrow stuck in the ground at the end of its flight
      if(S.stick&&u>0.9){ c.save(); c.translate(x1+10,y+6); c.rotate(0.9); c.scale(2,2); c.globalAlpha=1-(u-0.9)*4; ZProj.draw(c,k[0],Object.assign({},S,{pixel:false}),0); c.restore(); }
      var pts=[]; for(var h=0;h<16;h++){ var uu=u-h*0.012; if(uu<0)break; pts.push([(x0+(x1-x0)*uu-x)/2,(-(arc*Math.sin(Math.PI*uu)*2)+z)/2]); }
      c.save(); c.translate(x,y-z); c.scale(2,2); if(F==='arrow')ZProj.trail(c,k[0],S,pts,t); c.rotate(slope); ZProj.draw(c,k[0],S,t); c.restore();
      if(S.spark&&u>0.95){ c.save(); c.globalCompositeOperation='lighter'; c.strokeStyle='rgba(255,230,160,'+(1-(u-0.95)*20)+')'; c.lineWidth=1.5; for(var s=0;s<6;s++){ var a=s/6*Math.PI*2, r=(u-0.95)*260; c.beginPath(); c.moveTo(x1+Math.cos(a)*r*0.4,y+Math.sin(a)*r*0.4); c.lineTo(x1+Math.cos(a)*r,y+Math.sin(a)*r); c.stroke(); } c.restore(); }
      // enlarged, hovering in place on the dark floor
      var ex=half+(W-half)*((li%2)?0.7:0.32), ey=26+lane*(li+0.5); c.save(); c.translate(ex,ey); c.scale(3.2,3.2); if(F==='arrow')ZProj.trail(c,k[0],S,[[0,0],[-3,0],[-6,0],[-9,0],[-12,0],[-15,0],[-18,0],[-21,0],[-24,0],[-27,0]],t); ZProj.draw(c,k[0],S,t); c.restore(); }); };
  var grid=function(L){ return '<div class="br-grid br-wide">'+L.map(function(S,i){ return LBR.card('proj',S,i,760,fam(S)==='shot'?330:400,''); }).join('')+'</div>'; };
  LAB_TABS.push({ id:'proj', name:'Projectiles', blurb:'<b>Arrows, bolts, spells and monster shots, redrawn to look more real.</b> Today every shot in the game is a plain coloured dot. Each card shows one look for a whole group, flying across grass at game size on the left and enlarged on dark dungeon stone on the right. There are <b>6 looks for arrows and crossbow darts</b> (normal, cold, fire, seeking), <b>5 for spells</b> and <b>4 for monster shots</b>. <b>☆ Pick</b> one in each group (you can mix: add a note such as "this arrow, but the speed lines from the second"). Nothing changes in the game until you pick.',
    designs:ZProj.ARROWS.concat(ZProj.SPELLS,ZProj.SHOTS).map(function(S){ return {id:S.id,name:S.name}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('Arrows and crossbow darts','6 looks')+grid(ZProj.ARROWS)+LBR.sec('Spells','5 looks')+grid(ZProj.SPELLS)+LBR.sec('Monster shots','4 looks')+grid(ZProj.SHOTS); } });
})();
