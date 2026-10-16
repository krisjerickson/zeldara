// ═══════════════════════════════════════════════════════════════════════
// ║ 16e-asgard.js — round 59: ASGARD COMES DOWN, the pier notch, the BIFRÖST and GODSBANE (docs/28 §7).
// ║  · The descent (a cut-scene in the engine): a ring of light opens over Mirror Lake and Asgard settles into the water — a walled island of
// ║    white stone and gold filling most of the lake (wave 3: "Asgard covering ~80 % of the lake"), a ring of open water round it, towers on
// ║    its walls and a citadel of spires in the middle (drawn stand-ins until Kris picks in the Lab — wave 61). Then Mira calls you to the pier.
// ║  · The pier notch: the end of the village pier. Set the Lodestar in it: the freed spirits come from the Green and line up along the ley
// ║    line to the pier, the staff's beam melts a road through Asgard's wall, and the BIFRÖST runs from the pier to the gate, shimmering.
// ║  · The spirits teach the staff its one spell, GODSBANE (Kris, Oct 15 card: "its own button"): [V] (or the ✦ slot on the action bar), only with
// ║    the Lodestar in hand, a beam of white-gold light — Sovereign, ×2 against Asgard's wards (and later Grímnir's weak point) — 20 s to recover.
// ║  · Inside the walls: the citadel's door is sealed until round 60 (the four floors and Grímnir). The ending (Kris, Oct 15): at the rune circle
// ║    in the heart of liberated Asgard the Lodestar casts Godsbane into the sky and remakes the Bifröst into heaven.
// ║ State: ps.asgardDown, ps.bifrost, ps.godsbane. The ground is re-carved from these on every load (ZASG.watch).
// ═══════════════════════════════════════════════════════════════════════
var ZASG={ on:true, LAKE:{x:600,y:600}, CD:20,
  kinds:function(){ if(ZASG._K)return ZASG._K; if(typeof WK!=='function'||typeof _wkReg!=='function')return null;
    var K=ZASG._K={g:WK('plaza','#e6e0ce','#f4efe0',{pattern:'asgslab',flat:true}),w:WK('bwall','#ece6d6','#f6f2e6',{solid:true,wall:{top:'#f8f0da',face:'#cdbd92'}}),b:WK('plaza','#e8dcff','#fff4d8',{pattern:'slab',flat:true})};
    _wkReg(K.g); _wkReg(K.w); _wkReg(K.b); return K; },
  water:function(t){ return t===T.DEEP_WATER||t===T.SHALLOW_WATER||t===T.LILY||t===T.REED; },
  // the island: lake water at least 6 tiles from any shore, within 56 tiles of the lake's middle; its rim is the wall
  plan:function(ws){ var wd=ws.wd; if(wd._asgPlan)return wd._asgPlan; var X0=ZASG.LAKE.x-80, Y0=ZASG.LAKE.y-80, N=160, sd=new Int16Array(N*N).fill(-1), q=[], h=0, tiles=wd.tiles;
    for(var y=0;y<N;y++)for(var x=0;x<N;x++){ var t=(tiles[Y0+y]||[])[X0+x]; if(t===undefined||!ZASG.water(t)){ sd[y*N+x]=0; q.push(y*N+x); } }
    while(h<q.length){ var k=q[h++], kx=k%N, ky=(k/N)|0; for(var d=0;d<4;d++){ var xx=kx+(d===0?1:d===1?-1:0), yy=ky+(d===2?1:d===3?-1:0); if(xx<0||yy<0||xx>=N||yy>=N)continue; var n=yy*N+xx; if(sd[n]<0){ sd[n]=sd[k]+1; q.push(n); } } }
    var isl={}, cells=[], cx=0, cy=0; for(var i=0;i<N*N;i++){ var X=X0+i%N, Y=Y0+((i/N)|0); if(sd[i]>=6&&Math.hypot(X-ZASG.LAKE.x,Y-ZASG.LAKE.y)<=56){ isl[Y*WORLD_W+X]=1; cells.push([X,Y]); cx+=X; cy+=Y; } }
    // keep the biggest piece only
    var seen={}, best=[]; cells.forEach(function(c){ var k0=c[1]*WORLD_W+c[0]; if(seen[k0])return; var part=[], st=[c]; seen[k0]=1; while(st.length){ var p=st.pop(); part.push(p); [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var kk=(p[1]+o[1])*WORLD_W+p[0]+o[0]; if(isl[kk]&&!seen[kk]){ seen[kk]=1; st.push([p[0]+o[0],p[1]+o[1]]); } }); } if(part.length>best.length)best=part; });
    isl={}; cx=0; cy=0; best.forEach(function(c){ isl[c[1]*WORLD_W+c[0]]=1; cx+=c[0]; cy+=c[1]; }); cx=Math.round(cx/Math.max(1,best.length)); cy=Math.round(cy/Math.max(1,best.length));
    var rim=[], inner=[]; best.forEach(function(c){ var edge=false; for(var j=-1;j<=1&&!edge;j++)for(var i2=-1;i2<=1;i2++){ if(!isl[(c[1]+j)*WORLD_W+c[0]+i2]){ edge=true; break; } } (edge?rim:inner).push(c); });
    // the gate: the rim cell nearest the pier's end; the Bifröst runs from the pier to it
    var pe=ZASG.pierEnd(), gate=null, gd=1e9; if(pe)rim.forEach(function(c){ var dd=Math.hypot(c[0]-pe[0],c[1]-pe[1]); if(dd<gd){ gd=dd; gate=c; } });
    return (wd._asgPlan={isl:isl,cells:best,rim:rim,inner:inner,cx:cx,cy:cy,gate:gate,n:best.length}); },
  pierEnd:function(){ var e=typeof VR_EXTRA!=='undefined'&&VR_EXTRA.pierEnd; return e?[CENTER_X+e[0],CENTER_Y+e[1]]:null; },
  put:function(wd,x,y,t,k,changed){ if(!wd.tiles[y])return; wd.tiles[y][x]=t; if(wd.kind&&k)wd.kind[y*WORLD_W+x]=k._gi; changed.push([x,y]); },
  // the island on the lake (quiet: on load, no show)
  carve:function(ws){ var wd=ws.wd; if(wd._asgDone)return; var K=ZASG.kinds(), P=ZASG.plan(ws), ch=[]; if(!K||!P.n)return;
    P.inner.forEach(function(c){ ZASG.put(wd,c[0],c[1],T.STONE_FLOOR,K.g,ch); }); P.rim.forEach(function(c){ ZASG.put(wd,c[0],c[1],T.BUILDING_WALL,K.w,ch); });
    ZASG.lots(ws).forEach(function(L){ for(var y=L.y-L.d+1;y<=L.y;y++)for(var x=L.x-L.hw;x<=L.x+L.hw;x++)if(P.isl[y*WORLD_W+x])ZASG.put(wd,x,y,T.BUILDING_WALL,K.w,ch); });      // round 61: the citadel and the two halls are solid
    wd._asgDone=true; wd.baseVer=(wd.baseVer||0)+1; ZESC.refresh(ws,ch); ZASG.dress(ws); },
  // ── round 61: Kris's picks (Lab, Oct 16) — asgA_wall, asgA_gate, both towers (asgA_tower, asgC_tower), asg_keep_a "can be the central citadel",
  //    asg_keep_b and asg_keep_c "should use as extra buildings in asgard", the world-tree circle asg_circle_c, the cream rune-paving tx_asg_b ──
  KEEP:'asg_keep_a', HALLS:['asg_keep_b','asg_keep_c'], CIRCLE:'asg_circle_c', WALL:'asgA_wall', GATE:'asgA_gate', TOWERS:['asgA_tower','asgC_tower'], BIF:'bif_b', NOTCH:'notch_c',
  // where the buildings stand: the citadel in the middle, a hall on each side (moved in until they sit well inside the walls)
  lots:function(ws){ var P=ZASG.plan(ws); if(P._lots)return P._lots; var L=[{id:ZASG.KEEP,x:P.cx,y:P.cy,hw:3,d:3,m:1.3}], ok=function(x,y,hw,d){ for(var yy=y-d-4;yy<=y+4;yy++)for(var xx=x-hw-3;xx<=x+hw+3;xx++)if(!P.isl[yy*WORLD_W+xx])return false; return true; };
    [-1,1].forEach(function(sd,i){ for(var off=17;off>=9;off--){ var x=P.cx+sd*off, y=P.cy+2; if(ok(x,y,2,3)){ L.push({id:ZASG.HALLS[i],x:x,y:y,hw:2,d:3,m:1.05}); break; } } });
    return (P._lots=L); },
  // the heart of Asgard: the rune circle in front of the citadel (the ending, round 62+)
  // a painted piece laid flat (the whole picture, centred — ZScn.image cuts below the anchor)
  flat:function(ws,id,x,y,m){ var Z=typeof _scn==='function'?_scn():null; if(!Z||!Z.has||!Z.has(id))return null; var S=Z.size(id,0), h=S.h*m, Q=Z.size(id,h), key='zsf_'+id+'_'+Math.round(h), RS=Z.RES||1, W=Math.ceil(Q.w)+4, H=Math.ceil(Q.h)+4;
    if(!ws.textures.exists(key)){ var c=document.createElement('canvas'); c.width=W*RS; c.height=H*RS; var g=c.getContext('2d'); g.scale(RS,RS); Z.draw(g,id,Q.ax+2,Q.ay+2,h,{}); var t=ws.textures.addCanvas(key,c); try{ t.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} }
    return ws.add.image(x,y,key).setOrigin(0.5,0.5).setScale(1/RS); },
  heart:function(ws){ var P=ZASG.plan(ws); return {x:P.cx*TILE+16,y:(P.cy+7)*TILE+16}; },
  dress:function(ws){ if(ws._asgDress)ws._asgDress.forEach(function(o){ if(o&&o.destroy)o.destroy(); }); var P=ZASG.plan(ws), L=ws._asgDress=[], Z=typeof _scn==='function'?_scn():null, has=function(id){ return Z&&Z.has&&Z.has(id); }, D=function(y){ return typeof WR_DEPTH==='function'?WR_DEPTH(y):y; };
    var tower=function(x,y,s){ var px=x*TILE+16, py=y*TILE+28, g=ws.add.graphics().setDepth(D(py)); s=s||1;
      g.fillStyle(0x000000,0.22).fillEllipse(px,py,30*s,10*s); g.fillStyle(0xf2ecdc,1).fillRect(px-11*s,py-70*s,22*s,70*s); g.fillStyle(0xd8ccb0,1).fillRect(px+3*s,py-70*s,8*s,70*s);
      g.fillStyle(0xe8c048,1).fillTriangle(px-14*s,py-70*s,px+14*s,py-70*s,px,py-112*s); g.fillStyle(0xc8a030,1).fillTriangle(px,py-70*s,px+14*s,py-70*s,px,py-112*s); g.fillStyle(0xfff0a0,1).fillCircle(px,py-114*s,2.5*s); g.fillStyle(0x6a8ab0,1).fillRect(px-3*s,py-50*s,6*s,10*s); L.push(g); };
    var put=function(id,x,y,m,o){ var im=Z.image(ws,id,x,y,m,D(y),o); if(im)L.push(im); return im; };
    if(!has(ZASG.WALL)){ P.rim.forEach(function(c,i){ if(i%17===0)tower(c[0],c[1],1); }); }
    else { // the walls: round the rim, evenly spaced; where the rim runs up and down, towers (a wall seen end-on would look wrong)
      var gx=P.gate?P.gate[0]*TILE+16:-1e9, gy=P.gate?P.gate[1]*TILE+16:-1e9, cx0=P.cx*TILE+16, cy0=P.cy*TILE+16;
      var R=P.rim.map(function(c){ var x=c[0]*TILE+16, y=c[1]*TILE+16; return {x:x,y:y,a:Math.atan2(y-cy0,x-cx0),d:Math.hypot(x-cx0,y-cy0)}; }).sort(function(a,b){ return a.a-b.a||b.d-a.d; });
      var pick=[], last=null, first=null, step=150; R.forEach(function(q){ if(last&&Math.hypot(q.x-last.x,q.y-last.y)<step)return; if(first&&Math.hypot(q.x-first.x,q.y-first.y)<step*0.7)return; pick.push(q); last=q; if(!first)first=q; });
      pick.forEach(function(q,i){ if(Math.hypot(q.x-gx,q.y-gy)<TILE*3.6)return; var side=Math.abs(Math.cos(q.a))>0.72, foot=q.y+16;
        if(side||i%3===2)put(ZASG.TOWERS[(i>>1)%2],q.x,foot,side?0.95:1.05); else put(ZASG.WALL,q.x,foot,1); });
      if(P.gate&&has(ZASG.GATE))put(ZASG.GATE,gx,gy+16,1.15); }
    // the citadel and the two halls
    ZASG.lots(ws).forEach(function(Lt,i){ var x=Lt.x*TILE+16, y=(Lt.y+1)*TILE; if(Lt.id&&has(Lt.id))put(Lt.id,x,y,Lt.m*(Z.K||1));
      else if(i===0){ [[-3,1,1.1],[3,1,1.1],[-1.5,-1,1.4],[1.5,-1,1.4],[0,0,2.1]].forEach(function(q){ tower(Lt.x+q[0],Lt.y+q[1],q[2]); }); var g=ws.add.graphics().setDepth(D(y)); g.fillStyle(0xe8c048,1).fillRoundedRect(x-14,y-22,28,34,{tl:14,tr:14,bl:0,br:0}); L.push(g); } });
    // the rune circle at the heart (flat on the ground)
    var H=ZASG.heart(ws), ci=ZASG.flat(ws,ZASG.CIRCLE,H.x,H.y,1.7); if(ci){ ci.setDepth(-2.6); L.push(ci); }
    var cx=P.cx*TILE+16, cy=P.cy*TILE+16, glow=ws.add.circle(cx,cy-60,110,0xfff2c0,0.12).setDepth(9000).setBlendMode(Phaser.BlendModes.ADD); ws.tweens.add({targets:glow,alpha:{from:0.05,to:0.14},duration:2400,yoyo:true,repeat:-1}); L.push(glow);
    ZASG.notchVis(ws); if(ws.playerState&&ws.playerState.bifrost)ZASG.rainbow(ws); },
  // ── the descent (after Muspelheim sinks) ──
  descend:function(ws){ var ps=ws.playerState, cam=ws.cameras.main, lx=ZASG.LAKE.x*TILE, ly=ZASG.LAKE.y*TILE; if(typeof ZCINE!=='undefined')ZCINE.bars(true); cam.stopFollow(); cam.pan(lx,ly,2200,'Sine.easeInOut');
    ws.time.delayedCall(2300,function(){ ZCINE.panel(ZASG.panelOf('sky'),'A ring of golden light opens in the sky over Mirror Lake…',4200,function(){ showNotif('✨ A ring of golden light opens in the sky over Mirror Lake…','#fff2b0');
      var ring=ws.add.circle(lx,ly-260,20,0xfff4c8,0.9).setDepth(9500).setBlendMode(Phaser.BlendModes.ADD); ws.tweens.add({targets:ring,scale:22,alpha:0.25,duration:2200,ease:'Sine.out'});
      for(var i=0;i<14;i++){ var r=ws.add.rectangle(lx+(i-7)*70,ly-200,14,800,0xfff0b0,0.0).setDepth(9400).setBlendMode(Phaser.BlendModes.ADD).setAngle((i-7)*2); ws.tweens.add({targets:r,alpha:0.22,duration:1200,delay:600+i*60,yoyo:true,hold:1600,onComplete:function(){ this.targets[0].destroy(); }}); }
      ws.time.delayedCall(2600,function(){ cam.flash(1200,255,250,230); cam.shake(1200,0.008); ps.asgardDown=1; ZASG.carve(ws); showNotif('🏰 ASGARD has come down onto Mirror Lake — a walled island of white stone and gold.','#fff2b0'); ring.destroy();
        ws.time.delayedCall(3200,function(){ ZCINE.panel(ZASG.panelOf('lake'),'Asgard rests upon Mirror Lake.',4200,function(){ cam.startFollow(ws.player.cont,true,.1,.1); if(typeof ZCINE!=='undefined')ZCINE.bars(false); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('Asgard comes down'); }catch(e){}
          if(typeof ZSPIRIT!=='undefined')ZSPIRIT.talk('Mira the Mechanic','#ffd890','Did you SEE that?! A whole city, sat down on the lake like a duck! And not a door on the near side…<br><br>But listen — when I built the village pier, my grandmother made me cut a <b>notch</b> at its very end. "For a staff that will come one day," she said. I thought she was teasing me. Go to the <b>end of the pier</b>, '+heroName(ps)+'. Bring that staff of yours.',[{t:'To the pier'}],typeof ZMIRA!=='undefined'&&ZMIRA._draw?ZMIRA._draw():null); }); }); }); }); }); },
  // the story panels Kris picked (the combined sky panel, option C, once painted — A until then)
  PANELS:{sink:['pn_musp_sink_a'],sky:['pn_asg_sky_c','pn_asg_sky_a'],lake:['pn_asg_lake_a']},
  panelOf:function(k){ var R=(typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}; return (ZASG.PANELS[k]||[]).find(function(id){ return R[id]; })||null; },
  // ── the pier notch ──
  notchAt:function(){ var e=ZASG.pierEnd(); return e?{x:e[0]*TILE+16,y:e[1]*TILE+16}:null; },
  notchVis:function(ws){ if(ws._asgNotch){ ws._asgNotch.destroy(); ws._asgNotch=null; } var N=ZASG.notchAt(); if(!N||!(ws.playerState&&ws.playerState.asgardDown))return; var Z=typeof _scn==='function'?_scn():null, id=ZASG.NOTCH;
    if(id&&Z&&Z.has&&Z.has(id)){ ws._asgNotch=Z.image(ws,id,N.x,N.y+10,Z.K,WR_DEPTH(N.y)); return; }
    var g=ws._asgNotch=ws.add.graphics().setDepth(WR_DEPTH(N.y+8)); g.fillStyle(0x000000,0.25).fillEllipse(N.x,N.y+10,22,7); g.fillStyle(0x6a4a2a,1).fillRect(N.x-7,N.y-26,14,36); g.fillStyle(0x4a321a,1).fillRect(N.x-3,N.y-26,6,10); g.lineStyle(1,0x9fe8ff,0.8).strokeRect(N.x-7,N.y-12,14,4); },
  check:function(ws){ var ps=ws.playerState, N=ZASG.notchAt(); if(!ps||!ps.asgardDown||!N||!ws.player)return false; var d=Math.hypot(ws.player.x-N.x,ws.player.y-N.y); if(d>TILE*1.8){ if(ws._interactPrompt&&ws._interactPrompt._zsp==='notch'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
    var has=ZASG.hasStaff(ps), t=ps.bifrost?'The notch — the Bifröst stands':has?'[Tab] Set the Lodestar in the notch':'The notch at the end of the pier (it waits for the Lodestar)';
    if(!ws._interactPrompt||ws._interactPrompt._zsp!=='notch'||ws._interactPrompt._zt!==t){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,N.x,N.y-44,t,{fontSize:'10px',color:'#fff2b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='notch'; ws._interactPrompt._zt=t; }
    if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB)){ if(ps.bifrost)showNotif('🌈 The Bifröst shines from the notch to Asgard\'s gate.','#fff2b0'); else if(has)ZASG.bifrost(ws); else showNotif('The notch is shaped for a staff — the Lodestar, made at Muspelheim\'s great hearth.','#fff2b0'); }
    return true; },
  hasStaff:function(ps){ return (ps.inventory||[]).indexOf('lodestar')>=0||(ps.equip&&ps.equip.mWeapon==='lodestar'); },
  // ── the Bifröst ──
  bifrost:function(ws){ var ps=ws.playerState, P=ZASG.plan(ws), N=ZASG.notchAt(), cam=ws.cameras.main; if(!P.gate||!N||ws._bifBusy)return; ws._bifBusy=true; if(typeof ZCINE!=='undefined')ZCINE.bars(true);
    var Z=typeof _scn==='function'?_scn():null, st=Z&&Z.has&&Z.has('ls2_c')?Z.image(ws,'ls2_c',N.x,N.y-6,Z.K*0.7,WR_DEPTH(N.y)+1):null; if(st){ st.setOrigin(0.5,1); st.setAlpha(0); ws.tweens.add({targets:st,alpha:1,duration:600}); }
    showNotif('🌟 The Lodestar settles into the notch. Far away on the Green, the spirits look up…','#fff2b0');
    // the spirits come from the Green and line up along the ley line to the pier
    var c={x:CENTER_X*TILE+16,y:CENTER_Y*TILE+16}, freed=(ps.spiritsFreed||[]).slice(0,40), shr=typeof ZSPIRIT!=='undefined'?ZSPIRIT.shrines(ws):[], sp=[], n=Math.max(8,freed.length);
    for(var i=0;i<n;i++){ var s=freed[i]&&shr.find(function(q){ return q.id===freed[i]; }), id=s&&ZSPIRIT.uniqueId(s,'free'), u=(i+1)/(n+1), tx=c.x+(N.x-c.x)*u, ty=c.y+(N.y-c.y)*u+((i%2)?10:-10);
      var o=id&&typeof ZSPM!=='undefined'?ZSPM.make(ws,id,c.x+(Math.random()-0.5)*120,c.y+(Math.random()-0.5)*80,'free',{depth:WR_DEPTH(ty)}):null; if(!o)o=ws.add.circle(c.x,c.y,6,0x9fe8ff,0.85).setBlendMode(Phaser.BlendModes.ADD).setDepth(WR_DEPTH(ty));
      o.setAlpha(0); ws.tweens.add({targets:o,alpha:0.95,duration:600,delay:i*40}); if(o._m)ZSPM.goTo(o,tx,ty,140); else ws.tweens.add({targets:o,x:tx,y:ty,duration:2600,delay:i*40}); sp.push(o); }
    var ley=ws.add.graphics().setDepth(-3).setBlendMode(Phaser.BlendModes.ADD); ley.lineStyle(6,0x6fe3f5,0.0).lineBetween(c.x,c.y,N.x,N.y); ws.tweens.addCounter({from:0,to:1,duration:2600,onUpdate:function(tw){ ley.clear(); ley.lineStyle(6,0x6fe3f5,0.5*tw.getValue()).lineBetween(c.x,c.y,N.x,N.y); }});
    ws.time.delayedCall(3600,function(){ // the beam melts the wall
      var gx=P.gate[0]*TILE+16, gy=P.gate[1]*TILE+16, beam=ws.add.graphics().setDepth(9500).setBlendMode(Phaser.BlendModes.ADD); cam.pan(gx,gy,1400,'Sine.easeInOut');
      ws.tweens.addCounter({from:0,to:1,duration:1800,onUpdate:function(tw){ var v=tw.getValue(), ex=N.x+(gx-N.x)*Math.min(1,v*1.6), ey=N.y-30+(gy-N.y+30)*Math.min(1,v*1.6); beam.clear(); beam.lineStyle(16,0xfff4c8,0.35).lineBetween(N.x,N.y-30,ex,ey); beam.lineStyle(6,0xffffff,0.9).lineBetween(N.x,N.y-30,ex,ey); }});
      ws.time.delayedCall(1500,function(){ cam.flash(900,255,250,220); cam.shake(900,0.01); showNotif('🌈 The beam melts a road through Asgard\'s wall — the BIFRÖST!','#fff2b0'); ZASG.road(ws,true);
        ws.tweens.add({targets:beam,alpha:0,duration:1400,onComplete:function(){ beam.destroy(); }});
        ws.time.delayedCall(2600,function(){ cam.pan(N.x,N.y,1200,'Sine.easeInOut'); ws.time.delayedCall(1300,function(){
          ZSPIRIT.talk('The spirits of Runeheim','#9fe8ff','We have waited so long at the edge of the light. You broke our chains, you broke the Tyrant\'s fire — and now the road stands.<br><br>The staff remembers the way home, but it needs a word to wake it. Take it from us: <b>GODSBANE</b>. Speak it with the Lodestar in your hand, and the light will answer. Behind those walls, Grímnir has shut the gate of heaven. Open it for us.<br><br><span style="color:#fff2b0">✦ Godsbane — press <b>V</b> (or the ✦ slot) with the Lodestar in your hand.</span>',[{t:'Godsbane',f:function(){ ZASG.learn(ws,sp,ley,st); }}],ZASG.face(ws)); }); }); }); }); },
  // the spirits' face in the dialog: the first freed spirit's own picture
  face:function(ws){ var ps=ws.playerState, shr=typeof ZSPIRIT!=='undefined'?ZSPIRIT.shrines(ws):[], id=null; (ps.spiritsFreed||[]).some(function(f){ var s=shr.find(function(q){ return q.id===f; }); id=s&&ZSPIRIT.uniqueId(s,'free'); return !!id; });
    if(!id&&typeof ZSPIRIT40!=='undefined'&&ZSPIRIT40[0])id='sp_u_'+ZSPIRIT40[0][0]+'_free'; return typeof ZTALK!=='undefined'&&id?ZTALK.scn(id,ZSPIRIT._drawSpirit?ZSPIRIT._drawSpirit(true):null):null; },
  learn:function(ws,sp,ley,st){ var ps=ws.playerState; ps.godsbane=1; ps.bifrost=1; ws._bifBusy=false; ws.cameras.main.startFollow(ws.player.cont,true,.1,.1); if(typeof ZCINE!=='undefined')ZCINE.bars(false); ZGODS.slot();
    showNotif('✦ You learned GODSBANE — [V] with the Lodestar in hand.','#fff2b0'); if(typeof ZSAVE!=='undefined')try{ ZSAVE.auto('the Bifröst'); }catch(e){}
    (sp||[]).forEach(function(o,i){ ws.time.delayedCall(800+i*60,function(){ if(o&&o.scene)ws.tweens.add({targets:o,alpha:0,duration:1600,onComplete:function(){ o.destroy(); }}); }); }); if(ley)ws.tweens.add({targets:ley,alpha:0,duration:2400,onComplete:function(){ ley.destroy(); }}); if(st)ws.tweens.add({targets:st,alpha:0,duration:1600,onComplete:function(){ st.destroy(); }}); if(ws._emitUI)ws._emitUI(); },
  // the road: from the pier's end to the gate, three wide; the gate opens (show: tile by tile)
  road:function(ws,show){ var wd=ws.wd, P=ZASG.plan(ws), N=ZASG.pierEnd(), K=ZASG.kinds(); if(!P.gate||!N||!K||wd._bifDone)return; var ch=[], x0=N[0], y0=N[1], x1=P.gate[0], y1=P.gate[1], L=Math.hypot(x1-x0,y1-y0), n=Math.ceil(L*2), px=-(y1-y0)/(L||1), py=(x1-x0)/(L||1);
    for(var i=1;i<=n;i++){ var bx=x0+(x1-x0)*i/n, by=y0+(y1-y0)*i/n; for(var w=-1;w<=1;w++){ var x=Math.round(bx+px*w), y=Math.round(by+py*w), t=(wd.tiles[y]||[])[x]; if(t===undefined)continue; if(ZASG.water(t)||t===T.BUILDING_WALL||t===T.BEACH||t===T.SAND)ZASG.put(wd,x,y,T.BRIDGE,K.b,ch); } }
    for(var j=-2;j<=2;j++)for(var k=-2;k<=2;k++){ var gx=x1+k, gy=y1+j; if(P.isl[gy*WORLD_W+gx]&&wd.tiles[gy]&&wd.tiles[gy][gx]===T.BUILDING_WALL&&Math.hypot(k,j)<=1.6)ZASG.put(wd,gx,gy,T.STONE_FLOOR,K.g,ch); }
    wd._bifDone=true; wd._bifCells=ch.slice(); wd.baseVer=(wd.baseVer||0)+1; ZESC.refresh(ws,ch); ZASG.rainbow(ws); },
  // the shimmer over the Bifröst (bands of colour drifting along it)
  // (no containers here: the World scene's camera does not draw a container's children — round 61 found the round 59 bands never showed)
  rainbow:function(ws){ if(ws._bifRb){ ws._bifRb.destroy(); ws._bifRb=null; } var N=ZASG.pierEnd(), P=ZASG.plan(ws); if(!N||!P.gate)return; var x0=N[0]*TILE+16, y0=N[1]*TILE+16, x1=P.gate[0]*TILE+16, y1=P.gate[1]*TILE+16, L=Math.hypot(x1-x0,y1-y0), a=Math.atan2(y1-y0,x1-x0);
    var Z=typeof _scn==='function'?_scn():null, list=[], cols=[0xff6060,0xffa040,0xffe060,0x60e080,0x60a0ff,0xb070ff], nx=-Math.sin(a), ny=Math.cos(a), mx=(x0+x1)/2, my=(y0+y1)/2, painted=!!(Z&&Z.has&&Z.has(ZASG.BIF));
    ws._bifRb={list:list,destroy:function(){ list.forEach(function(o){ if(o&&o.scene){ ws.tweens.killTweensOf(o); o.destroy(); } }); list.length=0; }};
    if(painted){ var m=1.25, seg=Z.size(ZASG.BIF,0).h*m*0.9, n=Math.max(1,Math.ceil(L/seg));
      for(var i=0;i<n;i++){ var u=(i+0.5)/n, im=ZASG.flat(ws,ZASG.BIF,x0+(x1-x0)*u,y0+(y1-y0)*u,m); if(!im)break; im.setRotation(a+Math.PI/2).setDepth(-3.4); list.push(im); } }
    cols.forEach(function(c,i){ var o=(i-2.5)*(painted?10:14), r=ws.add.rectangle(mx+nx*o,my+ny*o,L,painted?10:14,c,painted?0.10:0.5).setRotation(a).setDepth(-3.3).setBlendMode(Phaser.BlendModes.ADD); list.push(r);
      ws.tweens.add({targets:r,alpha:painted?{from:0.04,to:0.16}:{from:0.35,to:0.65},duration:900+i*130,yoyo:true,repeat:-1}); }); },
  // ── on every load: re-carve what has happened ──
  watch:function(){ try{ if(typeof game==='undefined'||!game.scene)return; var ws=game.scene.getScene('World'); if(!ws||!ws.wd||!ws.playerState||!ws.sys||!ws.sys.isActive())return; var ps=ws.playerState, wd=ws.wd;
      if(ps.muspSunk&&!wd._muspSunk&&(wd._volcCarved||wd._volcSpawned))ZESC.sinkTerrain(ws);
      if(ps.asgardDown&&!wd._asgDone)ZASG.carve(ws); if(ps.bifrost&&wd._asgDone&&!wd._bifDone)ZASG.road(ws,false);
      if(ps.asgardDown&&!ws._asgDress)ZASG.dress(ws); ZGODS.slot(); }catch(e){ if(!ZASG._err){ ZASG._err=1; console.warn('asgard',e); } } },
  // inside the walls: the citadel's door (sealed until round 60)
  citadel:function(ws){ var ps=ws.playerState; if(!ps||!ps.asgardDown||!ws.player)return false; var P=ZASG.plan(ws), dx=P.cx*TILE+16, dy=P.cy*TILE+16+TILE*1.5, d=Math.hypot(ws.player.x-dx,ws.player.y-dy); if(d>TILE*2.2){ if(ws._interactPrompt&&ws._interactPrompt._zsp==='citadel'){ ws._interactPrompt.destroy(); ws._interactPrompt=null; } return false; }
    if(!ws._interactPrompt||ws._interactPrompt._zsp!=='citadel'){ if(ws._interactPrompt)ws._interactPrompt.destroy(); ws._interactPrompt=domText(ws,dx,dy-60,'The citadel of Asgard — [Tab]',{fontSize:'10px',color:'#fff2b0',fontFamily:'Segoe UI',stroke:'#000',strokeThickness:3,align:'center'}).setOrigin(.5,1).setDepth(20); ws._interactPrompt._zsp='citadel'; }
    if(Phaser.Input.Keyboard.JustDown(ws.keys.TAB))showNotif('🏛 The golden doors of the citadel are sealed by Grímnir, the Masked King. (Asgard\'s four floors and Grímnir come in round 60.)','#fff2b0'); return true; }
};
setInterval(ZASG.watch,1000);
// round 61: the cream rune-paving inside the walls (tx_asg_b — the slab pattern if it is not painted)
(function(){ if(typeof WPATTERN!=='undefined'&&!WPATTERN.asgslab)WPATTERN.asgslab=WPATTERN.slab; if(typeof ZScn!=='undefined'&&ZScn.GROUND_PAT){ ZScn.GROUND_PAT.asgslab='tx_asg_b'; if(ZScn.TEXA)ZScn.TEXA.tx_asg_b=[0.95,1.1]; } })();
// round 61: a story panel — a painting fills the screen between the letterbox bars, fades in, holds, fades out (a click or a key skips it)
if(typeof ZCINE!=='undefined')ZCINE.panel=function(id,cap,ms,cb){ var R=(typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}, done=false, fin=function(){ if(done)return; done=true; document.removeEventListener('keydown',key,true); el.style.opacity='0'; setTimeout(function(){ el.remove(); },700); if(cb)cb(); }, key=function(){ fin(); };
  if(!id||!R[id]||typeof document==='undefined'){ if(cb)cb(); return; } var base=(typeof ZScn!=='undefined'&&ZScn.BASE)||'assets/scenery/';
  var el=document.createElement('div'); el.id='zcine-panel'; ['top','bot'].forEach(function(k){ var b=document.getElementById('zcine-'+k); if(b)b.style.zIndex='9995'; }); el.style.cssText='position:fixed;inset:0;z-index:9990;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .7s ease;cursor:pointer';
  el.innerHTML='<img src="'+base+R[id]+'" style="max-width:100%;max-height:100%;object-fit:contain"><div style="position:absolute;left:0;right:0;bottom:13vh;text-align:center;font:italic 600 20px Georgia,serif;color:#fff4d8;text-shadow:0 2px 6px #000">'+(cap||'')+'</div>';
  document.body.appendChild(el); el.onclick=fin; ZCINE._panel=id; requestAnimationFrame(function(){ el.style.opacity='1'; }); setTimeout(function(){ document.addEventListener('keydown',key,true); },400); setTimeout(fin,ms||4200); };

// ── GODSBANE: the Lodestar's one spell ──
var ZGODS={
  ready:function(ps){ return Math.max(0,((ps&&ps._gbUntil)||0)-Date.now()); },
  cast:function(scene){ var ws=typeof _heroWS==='function'?_heroWS():null, ps=ws&&ws.playerState; if(!ps||!scene)return;
    if(!ps.godsbane){ return; } if(!(ps.equip&&ps.equip.mWeapon==='lodestar')){ showNotif('✦ Godsbane answers only the Lodestar — take it in hand (Inventory → magic weapon).','#fff2b0'); return; }
    var key=scene.sys.settings.key; if(key==='Building'||key==='Sky'){ showNotif('✦ Not here.','#fff2b0'); return; }
    var left=ZGODS.ready(ps); if(left>0){ showNotif('✦ The Lodestar is still gathering light — '+Math.ceil(left/1000)+' s','#c8bfa0'); return; }
    ps._gbUntil=Date.now()+ZASG.CD*1000; var c=_heroCtx(scene), ang=_heroDirAngle(c.dir), len=440, wdt=36, nx=Math.cos(ang), ny=Math.sin(ang);
    var S=typeof ZHit!=='undefined'&&ZHit.sums?ZHit.sums(ps):{spell:0}, I=ITEMS.lodestar||{atk:40,spellMult:2.6}, raw=Math.round((I.atk||40)*(I.spellMult||2.6)*(1+(S.spell||0))*1.6);
    var g=scene.add.graphics().setDepth(9000).setBlendMode(Phaser.BlendModes.ADD), ex=c.x+nx*len, ey=c.y+ny*len;
    g.lineStyle(wdt*1.6,0xfff0b0,0.28).lineBetween(c.x,c.y-10,ex,ey-10); g.lineStyle(wdt,0xfff8e0,0.6).lineBetween(c.x,c.y-10,ex,ey-10); g.lineStyle(8,0xffffff,1).lineBetween(c.x,c.y-10,ex,ey-10);
    scene.tweens.add({targets:g,alpha:0,duration:650,onComplete:function(){ g.destroy(); }}); try{ scene.cameras.main.flash(220,255,250,220); scene.cameras.main.shake(260,0.006); }catch(e){}
    for(var i=0;i<16;i++){ var u=Math.random(), s=scene.add.circle(c.x+nx*len*u,c.y+ny*len*u-10,3,[0xffffff,0xfff0a0,0x9fe8ff][i%3],1).setDepth(9001); scene.tweens.add({targets:s,y:s.y-30-Math.random()*30,alpha:0,duration:700,onComplete:function(){ this.targets[0].destroy(); }}); }
    if(typeof _heroFloat==='function')_heroFloat(scene,c.x,c.y-40,'✦ GODSBANE','#fff2b0');
    var hit=0; ZGODS.lastDmg=0; (c.monsters||[]).forEach(function(m){ if(!m||m.dead)return; var px=m.x-c.x, py=m.y-c.y, along=px*nx+py*ny, across=Math.abs(-px*ny+py*nx), r=(m.def&&m.def.r)||10; if(along<-10||along>len+r||across>wdt/2+r)return;
      ZHit._gb=true; try{ ZGODS.lastDmg+=_heroHitMonster(scene,m,raw*(m.godsbaneWeak?3:1),{src:'skill',col:'#fff2b0',suffix:' ✦'})||0; } finally{ ZHit._gb=false; } hit++; });
    ZGODS.slot(); if(ws._emitUI)ws._emitUI(); return hit; },
  // the ✦ slot on the action bar (shown once learned), its cooldown
  slot:function(){ if(typeof document==='undefined')return; var ws=typeof _heroWS==='function'?_heroWS():null, ps=ws&&ws.playerState, bar=document.getElementById('action-icon-bar'); if(!bar)return; var el=document.getElementById('action-gods-slot');
    if(!ps||!ps.godsbane){ if(el)el.style.display='none'; return; }
    if(!el){ el=document.createElement('div'); el.className='aib-slot'; el.id='action-gods-slot'; el.title='Godsbane — the Lodestar\'s spell (only with the Lodestar in hand)'; el.onclick=function(){ var sc=typeof _activePlayScene==='function'?_activePlayScene(false):null; if(sc)ZGODS.cast(sc); };
      el.innerHTML='<div class="aib-key">V</div><div class="aib-ico" style="font-size:22px;color:#fff2b0;text-shadow:0 0 8px #ffe080">✦</div><div class="aib-lbl">Godsbane</div><div id="gods-cd" style="font-size:9px;color:#fff2b0;margin-top:1px"></div>'; bar.appendChild(el); }
    el.style.display=''; var l=ZGODS.ready(ps), cd=document.getElementById('gods-cd'); if(cd)cd.textContent=l>0?Math.ceil(l/1000)+'s':(ps.equip&&ps.equip.mWeapon==='lodestar'?'ready':'needs the Lodestar'); el.style.opacity=l>0||!(ps.equip&&ps.equip.mWeapon==='lodestar')?0.55:1; } };
setInterval(function(){ try{ ZGODS.slot(); }catch(e){} },500);
if(typeof document!=='undefined')document.addEventListener('keydown',function(e){ if((e.key||'').toLowerCase()!=='v'||e.repeat)return; if(typeof _isTyping==='function'&&_isTyping())return; if(typeof game==='undefined'||!game.scene||game.scene.isActive('Title'))return;
  if((typeof _PAUSE!=='undefined'&&_PAUSE.active)||(typeof _openOverlays==='function'&&_openOverlays().length))return; var sc=typeof _activePlayScene==='function'?_activePlayScene(false):null; if(!sc)return; var ws=typeof _heroWS==='function'?_heroWS():null; if(!ws||!ws.playerState||!ws.playerState.godsbane)return; e.preventDefault(); ZGODS.cast(sc); });
// Godsbane strikes as Sovereign (22f: ×2 against the wards of Muspelheim and Asgard)
setTimeout(function(){ if(typeof ZHit==='undefined')return; var h0=ZHit.hero; ZHit.hero=function(kind,o){ var H=h0.apply(ZHit,arguments); if(ZHit._gb){ H.els=[]; H.sov=true; } return H; };
  if(typeof WorldScene!=='undefined'){ var c0=WorldScene.prototype._checkInteraction; WorldScene.prototype._checkInteraction=function(){ if(ZASG.on&&(ZASG.check(this)||ZASG.citadel(this)))return; return c0.apply(this,arguments); }; } },0);
