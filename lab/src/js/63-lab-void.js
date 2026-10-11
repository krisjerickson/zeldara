// ═══════════════════════════════════════════════════════════════════════
// ║ EMPTY SPACE tab — round 46 proposed six ideas; round 47 builds his picks into the game (07zy2 ZVOID).
// ║ Kris (round 47): "The 1 additional thing empty spaces i'm not seeing is just filling it with terrain similar to where the adventure site is.
// ║ Let's do a mix of standard terrain outside the walls of the adventure site mixed with the choices made." Card: by floor — ground floors and
// ║ castles stand in the world's terrain; underground floors are cut from rock, hang over an abyss or float in lava; upper tower floors float in
// ║ the site's element. Each card is a real floor as the game paints it, the fill drifting as in the game. Picks/notes: 'void-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSP==='undefined'||typeof ZVOID==='undefined')return; LBR.TABS.push('void');
  var CASES=[['terrain','Ground floors and castles — the world round the site','The site\'s own terrain all round the walls, with its trees, rocks and plants (in the game, the ground of the region the site stands in).','castle_q2_c',0,3],
    ['rock','Underground — cut out of the rock','Strata, cracks, pale roots and ore glints; now and then a burrowing creature pops up (a painted set is ordered).','crystal_grotto',0,6],
    ['abyss','Chasm sites — a deep drop','Your pick, reworked: three banks of fog drift at different depths and speeds over a far-down dark, so the drop has depth as you move.','spiral_chasm',0,6],
    ['lava','Lava sites — a sea of fire','Your "epic" pick: molten lava with cooling crust plates; lava gargoyles rise and sink now and then (a painted set is ordered).','lava_archipelago',0,8],
    ['up_lava','Upper floors, fire towers — lava below','Fire towers\' upper floors float over the lava sea.','mage_ember_observatory',1,3],
    ['deep','Upper floors, water — the deep sea','Dark water with slow swells; fins and tentacles break the surface now and then.','frost_cathedral',1,6],
    ['clouds','Upper floors, earth — a sea of clouds','Billowing cloud tops far below, a second layer drifting faster (painted clouds and far peaks are ordered).','sky_cloister',1,6],
    ['storm','Upper floors, storm — storm clouds','Dark rolling cloud with flashes of lightning.','mage_conductor',1,3],
    ['stars','Upper floors, shadow — the starry void','Stars, nebula glow and aurora bands; shooting stars cross now and then (the milky way, nebulae and aurora are ordered painted).','mage_rift_tower',1,3],
    ['canopy','Upper floors, grass — a sea of treetops','The forest canopy far below the tower\'s windows.','silverwood',1,5],
    ['frame','Framing — the camera keeps to the floor','In every site the camera now stops a few tiles past the floor\'s edge and a soft vignette darkens the corners, so far less of the outside shows at once.','crystal_grotto',0,6]];
  var MC={}; function build(id,f,nf){ var k=id+'|'+f; if(MC[k]!==undefined)return MC[k]; var m=null; try{ m=ZSP.build({zsp:{id:id,floor:f,floors:nf}}); }catch(e){ m=null; } return (MC[k]=m); }
  LBR.drawers.void=function(cv,c,W,H,t,full,id){ var C=CASES.find(function(x){ return x[0]===id; }); if(!C)return; var m=build(C[3],C[4],C[5]); c.fillStyle='#000'; c.fillRect(0,0,W,H); if(!m||!m.zvoid){ c.fillStyle='#ff9a8a'; c.font='12px sans-serif'; c.fillText('could not be built',10,20); return; }
    var LT0=typeof LT!=='undefined'?LT:32, b=m._zbox||[0,0,m.w-1,m.h-1], pad=id==='frame'?2:6, bw=b[2]-b[0]+1+2*pad, bh=b[3]-b[1]+1+2*pad, s=Math.min(W/bw,H/bh), ox=(W-bw*s)/2-(b[0]-pad)*s, oy=(H-bh*s)/2-(b[1]-pad)*s, k=s/LT0;
    ZVOID.drawUnder(c,m,0,0,s,t||0,W,H);
    if(m.zvoid.k==='terrain'){ var Z=typeof _scn==='function'?_scn():null; if(Z)ZVOID.decorList(m,m.zvoid).forEach(function(d){ c.save(); c.translate(ox+d[1]*k,oy+d[2]*k); if(d[4])c.scale(-1,1); Z.draw(c,d[0],0,0,d[3]*k); c.restore(); }); }
    if(m.base&&m.base.width)c.drawImage(m.base,ox,oy,m.w*s,m.h*s);
    if(m.sprites)m.sprites.slice().sort(function(a,b2){ return (a.y+(a.canvas?a.canvas.height:0))-(b2.y+(b2.canvas?b2.canvas.height:0)); }).forEach(function(sp){ var cv2=sp.canvas; if(cv2&&cv2.width>1)try{ c.drawImage(cv2,ox+sp.x*k,oy+sp.y*k,cv2.width*k,cv2.height*k); }catch(e){} });
    if(id==='frame'){ var vg=c.createRadialGradient(W/2,H/2,Math.min(W,H)*0.3,W/2,H/2,Math.max(W,H)*0.62); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(0.7,'rgba(0,0,0,.25)'); vg.addColorStop(1,'rgba(0,0,0,.7)'); c.fillStyle=vg; c.fillRect(0,0,W,H); }
    c.fillStyle='rgba(0,0,0,.55)'; c.fillRect(6,H-22,W*0.7,16); c.fillStyle='#e8f0fa'; c.font='11px "Segoe UI",sans-serif'; c.textAlign='left'; c.fillText((ZSP.T[C[3]]?ZSP.T[C[3]].n:C[3])+' · floor '+(C[4]+1),10,H-10); };
  LAB_TABS.push({ id:'void', name:'Empty space',
    blurb:'<b>Round 47 — the empty space, filled, by floor (in the game now).</b> Your card: ground floors and castles stand in the world\'s own terrain; underground floors are cut from rock, hang over an abyss (chasm sites) or float in lava; the upper floors of towers float in the site\'s element. Framing keeps the camera to the floor. Each card is a real floor as the game paints it. Painted pictures for all of these (rock and critters, gargoyles and sea creatures, fog banks, clouds and peaks, the night sky) are ordered — wave 50. ☆ Pick what works; notes for what doesn\'t.',
    designs:CASES.map(function(C){ return {id:C[0],name:C[1]}; }),
    render:function(){ setTimeout(LBR.bind,0); return LBR.sec('By floor','what fills the space round each kind of floor')+'<div class="br-grid br-wide">'+CASES.map(function(C,i){ return LBR.card('void',{id:C[0],name:C[1],desc:C[2]},i,560,360,''); }).join('')+'</div>'; } });
})();
