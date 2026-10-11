// ═══════════════════════════════════════════════════════════════════════
// ║ 07zy-site-paint.js — painting a ZSP floor (07zx) the "hybrid" way Kris chose (Oct 10: "let's do hybrid for all the adventure sites"):
// ║ painted tile sets (the ground, wall and liquid textures of the scenery pipeline, recoloured to each site's palette) with painted pieces on
// ║ top — pillars, rocks, furniture and stairs — and one or two big painted set-pieces per floor (a fountain, an orrery, a great tree, a rune
// ║ circle…). The result is the same map model every site scene uses (07-site-art newMap), so the Dungeon scene needs no new code to show it.
// ═══════════════════════════════════════════════════════════════════════
var ZSPP={
  // per element: ground textures (built / natural, second floor), wall texture, liquid, pieces and set-pieces
  EL:{
    grass: {fb:'tx_f_herring',fn:'tx_moss',f2b:'tx_moss',f2n:'tx_grass_wild',wall:'tx_w_stone',rock:'tx_rock',pb:['tf_pillar','tf_plant','tf_planter'],pn:['dg_root','dg_shroom','dg_rock','pl_fern'],
      deco:['tf_plant','tf_planter','pl_flowers_white','pl_fern','tf_bench'],set:['sp_root_heart','sp_mushroom_ring','tf_c_tree','rn_circle','tf_c_fountain','tf_whitetree'],light:'#c8ffb0',part:'#d8ffb8'},
    water: {fb:'tx_f_tiles',fn:'tx_c_cave_wet',f2b:'tx_ice',f2n:'tx_ice',wall:'tx_w_stone',rock:'tx_c_cave',pb:['tf_crystalpillar','tf_pillar','tf_statue'],pn:['dg_stalagmite','dg_crystal','dg_rock','rk_rock_snow'],
      deco:['tf_candelabra','tf_statue','tf_plant','tf_pew'],set:['sp_frozen_fountain','sp_mirror_pool','sp_coral_fountain','sp_lotus_shrine','sp_glacier_heart','tf_c_pool','tf_c_fountain','tf_c_crystal'],light:'#a8e0ff',part:'#d8f4ff'},
    earth: {fb:'tx_slab',fn:'tx_c_cave',f2b:'tx_f_planks',f2n:'tx_scree',wall:'tx_wall_stone',rock:'tx_rock',pb:['cf_pillar','tf_pillar','cf_knight'],pn:['dg_boulder','dg_rock','dg_stalagmite','dg_rubble'],
      deco:['cf_barrel','cf_shields','cf_weapons','cf_bench','cf_armor'],set:['sp_anvil_shrine','sp_crystal_heart','cf_throne','rn_henge_altar','mf_anvil','rn_circle'],light:'#ffd8a0',part:'#e8d0b0'},
    fire:  {fb:'tx_f_flag',fn:'tx_ash',f2b:'tx_char',f2n:'tx_crust',wall:'tx_wall_stone',rock:'tx_c_cave',pb:['cf_pillar','dg_obsidian','cf_brazier'],pn:['dg_obsidian','dg_basalt','dg_vent','rk_lava_rock'],
      deco:['cf_brazier','cf_dragon','cf_weapons','mf_cauldron'],set:['sp_lava_forge','sp_ember_altar','sp_sun_altar','rn_circle_fire','cf_dragon','mf_soulfire','cf_hearth'],light:'#ffb070',part:'#ffb070'},
    storm: {fb:'tx_f_stars',fn:'tx_c_crystal',f2b:'tx_f_marble',f2n:'tx_scree',wall:'tx_w_stone',rock:'tx_rock',pb:['tf_crystalpillar','ar_pillar','mf_pylon'],pn:['dg_fcrystal','dg_crystal','dg_rock','rk_shard'],
      deco:['tf_globe','tf_telescope','tf_lectern','mf_orb','tf_candelabra'],set:['sp_storm_eye','sp_star_globe','tf_c_orrery','tf_c_starmap','mf_floatrock'],light:'#e8e0ff',part:'#fff6b0'},
    shadow:{fb:'tx_f_checker',fn:'tx_c_bone',f2b:'tx_f_stars',f2n:'tx_ash',wall:'tx_w_stone',rock:'tx_c_cave',pb:['ar_pillar','tf_statue','mf_pylon'],pn:['dg_skull','dg_rib','dg_stalagmite','dg_rock'],
      deco:['mf_bones','mf_mirror','mf_cage','tf_candelabra','mf_books'],set:['sp_abyss_well','sp_bone_throne','mf_void','mf_soulfire','ar_mirror'],light:'#c8a8ff',part:'#c8a8ff'}
  },
  // a few sites dress differently from their element
  SITE:{ mushroom_forest:{pn:['dg_shroom','dg_shroom_b','dg_root'],set:['sp_mushroom_ring','rn_toadstool','tf_c_tree']}, castle_q2_d:{pn:['tr_mangrove_a','dg_root'],set:['tr_mangrove_glow']},
    castle_q1_b:{pb:['pl_bush','pl_topiary','pl_hedge_arch'],set:['rn_circle','tf_c_fountain']}, castle_q1_c:{set:['rn_circle','tf_c_tree']}, castle_q2_b:{set:['sp_lotus_shrine','tf_c_pool']},
    elven_library:{pb:['tf_bookshelf'],deco:['tf_lectern','tf_desk','tf_globe','tf_bookshelf'],set:['tf_c_tree','tf_maptable']}, mage_scriptorium:{deco:['mf_books','tf_lectern','tf_desk'],set:['tf_c_starmap']},
    observatory:{set:['tf_c_orrery','tf_telescope']}, mage_astral_spire:{set:['tf_c_starmap','tf_c_orrery']}, bone_pit:{pn:['dg_skull','dg_rib','mf_bones'],set:['sp_bone_throne','sp_abyss_well']},
    boulder_field:{pn:['dg_boulder','dg_rock','dg_rubble','rk_boulder']}, root_hollow:{pn:['dg_root','tr_dead_a']}, castle_q3_b:{set:['sp_lava_forge','sp_anvil_shrine','mf_anvil','cf_hearth']}, frost_cathedral:{deco:['tf_pew','tf_candelabra','tf_statue'],set:['tf_altar','tf_c_crystal']},
    reflecting_hall:{set:['tf_c_pool','ar_mirror']}, mage_conductor:{set:['mf_gears','tf_piano']}, mage_mire_tower:{pn:['pl_cattails','dg_root']}, isle_1:{deco:['vp_barrels','vp_crates','vp_nets'],set:['vp_boat']} },
  th:function(id,el){ var E=ZSPP.EL[el]||ZSPP.EL.earth, S=ZSPP.SITE[id]||{}; return Object.assign({},E,S); },
  has:function(id){ var Z=_scn(); return !!(Z&&Z.has(id)); },
  pick:function(L,R){ var ok=(L||[]).filter(ZSPP.has); return ok.length?ok[R.i(0,ok.length-1)]:null; },
  // ── the painting ──
  paint:function(F,site,opt,fi,nf){ var T=ZSP.T[site.id], built=!!T.built, P=ZSD.palOpt(site.pal,opt,site.el), W=F.w, H=F.h, g=F.g, m=newMap(W,H), R=rngOf(ZSD.seed(site.id)*31+fi*977+5), th=ZSPP.th(site.id,site.el), Z=_scn();
    var liq=T.liq||null, solid=function(v){ return v===0||v===2||v===3||v===6||v===7; }, walk=function(v){ return v===1||v===4||v===5; };
    for(var i=0;i<W*H;i++)m.solid[i]=solid(g[i])?1:0;
    var cv=mkCanvas(W*LT,H*LT), ctx=cv.getContext('2d'), at=function(x,y){ return (x<0||y<0||x>=W||y>=H)?0:g[y*W+x]; };
    ctx.fillStyle=P.void; ctx.fillRect(0,0,W*LT,H*LT);
    var tex=function(id,px){ return Z?Z.pattern(ctx,id,px||128):null; };
    var tint=function(col,a,x,y,w,h){ ctx.save(); ctx.globalCompositeOperation='color'; ctx.globalAlpha=a; ctx.fillStyle=col; ctx.fillRect(x,y,w,h); ctx.restore(); };
    // ground
    var f1=tex(built?th.fb:th.fn,128), f2=tex(built?th.f2b:th.f2n,128), nz=vnoise(ZSD.seed(site.id)+fi);
    for(var y=0;y<H;y++)for(var x=0;x<W;x++){ var v=g[y*W+x], px=x*LT, py=y*LT; if(!(v===1||v===5||v===6||v===7&&false))continue;
      var two=v===5; ctx.fillStyle=two?P.floor2:P.floor; ctx.fillRect(px,py,LT,LT); var pt=two?f2:f1; if(pt){ ctx.save(); ctx.globalAlpha=0.85; ctx.fillStyle=pt; ctx.fillRect(px,py,LT,LT); ctx.restore(); }
      var n=nz(x*0.12,y*0.12); ctx.fillStyle=rgba(n>0.5?'#ffffff':'#000000',Math.abs(n-0.5)*0.16); ctx.fillRect(px,py,LT,LT); }
    // recolour the whole ground layer to the palette in one go (the textures keep their light and shade)
    tint(P.floor,0.42,0,0,W*LT,H*LT);
    // liquid
    var lq=liq==='lava'?tex('tx_lava',128):liq==='water'?tex('tx_water_deep',128):liq==='swamp'?tex('tx_swamp',128):null;
    for(var y2=0;y2<H;y2++)for(var x2=0;x2<W;x2++){ var v2=g[y2*W+x2]; if(v2!==3&&v2!==4)continue; var px2=x2*LT, py2=y2*LT;
      if(liq==='chasm'||liq==='stars'||!liq){ var gg=ctx.createLinearGradient(px2,py2,px2,py2+LT); gg.addColorStop(0,shade(P.void,0.06)); gg.addColorStop(1,P.void); ctx.fillStyle=gg; ctx.fillRect(px2,py2,LT,LT); if(liq==='stars'&&R.chance(0.35)){ ctx.fillStyle=rgba('#ffffff',0.4+R.f()*0.5); ctx.fillRect(px2+R.f()*LT,py2+R.f()*LT,1.5,1.5); }
        if(walk(at(x2,y2-1))&&at(x2,y2-1)!==4){ var dg=ctx.createLinearGradient(0,py2,0,py2+14); dg.addColorStop(0,shade(P.wall,-0.1)); dg.addColorStop(1,rgba(P.void,0)); ctx.fillStyle=dg; ctx.fillRect(px2,py2,LT,14); } }
      else { ctx.fillStyle=liq==='lava'?'#a8300c':liq==='swamp'?'#141c0e':P.liquid; ctx.fillRect(px2,py2,LT,LT); if(lq){ ctx.save(); ctx.globalAlpha=liq==='swamp'?0.5:0.8; ctx.fillStyle=lq; ctx.fillRect(px2,py2,LT,LT); ctx.restore(); } if(liq==='swamp'){ ctx.fillStyle='rgba(10,16,24,.38)'; ctx.fillRect(px2,py2,LT,LT); }
        [[0,-1],[0,1],[-1,0],[1,0]].forEach(function(d){ var a=at(x2+d[0],y2+d[1]); if(walk(a)&&a!==4){ ctx.fillStyle=rgba(liq==='lava'?'#ffd060':'#e8f8ff',liq==='lava'?0.55:0.35); if(d[1])ctx.fillRect(px2,py2+(d[1]<0?0:LT-3),LT,3); else ctx.fillRect(px2+(d[0]<0?0:LT-3),py2,3,LT); } }); }
      if(v2===4){ var pl=tex('tx_planks',96); ctx.fillStyle='#6a4a2c'; ctx.fillRect(px2+2,py2,LT-4,LT); if(pl){ ctx.save(); ctx.globalAlpha=0.9; ctx.fillStyle=pl; ctx.fillRect(px2+2,py2,LT-4,LT); ctx.restore(); }
        var hz=walk(at(x2-1,y2))||walk(at(x2+1,y2)); ctx.fillStyle='#2a1a0e'; if(hz&&!(walk(at(x2,y2-1))&&walk(at(x2,y2+1)))){ ctx.fillRect(px2,py2+2,LT,2); ctx.fillRect(px2,py2+LT-4,LT,2); } else { ctx.fillRect(px2+2,py2,2,LT); ctx.fillRect(px2+LT-4,py2,2,LT); } } }
    if(liq==='lava')for(var k=0;k<W*H*0.02;k++){ var lx=R.i(1,W-2), ly=R.i(1,H-2); if(g[ly*W+lx]===3)m.lights.push({x:lx*LT+16,y:ly*LT+16,r:70,col:'#ff7a30',a:0.32,depth:-1,pulse:0.3,period:1600+R.i(0,900)}); }
    // walls (masonry for built sites, rock for the natural ones); a wall with walkable ground below shows its face
    var wt=tex(built?th.wall:th.rock,96);
    for(var y3=0;y3<H;y3++)for(var x3=0;x3<W;x3++){ var v3=g[y3*W+x3]; if(v3!==2&&v3!==7)continue; var px3=x3*LT, py3=y3*LT, near=false;
      for(var j=-1;j<=1&&!near;j++)for(var i2=-1;i2<=1;i2++){ var a2=at(x3+i2,y3+j); if(walk(a2)||a2===3||a2===6){ near=true; break; } }
      if(!near){ ctx.fillStyle=shade(P.void,0.03); ctx.fillRect(px3,py3,LT,LT); continue; }
      var face=walk(at(x3,y3+1))||at(x3,y3+1)===6, top=face?(built?10:12):LT;
      var tg=ctx.createLinearGradient(px3,py3,px3,py3+top); tg.addColorStop(0,shade(P.wallTop,0.1)); tg.addColorStop(1,P.wallTop); ctx.fillStyle=tg; ctx.fillRect(px3,py3,LT,top);
      if(!built){ for(var q=0;q<3;q++){ ctx.fillStyle=rgba(shade(P.wallTop,R.chance(0.5)?0.22:-0.25),0.55); ctx.fillRect(px3+R.f()*27,py3+R.f()*(top-3),4,2); } }
      if(face){ var fg=ctx.createLinearGradient(px3,py3+top,px3,py3+LT); fg.addColorStop(0,P.wall); fg.addColorStop(1,shade(P.wall,-0.35)); ctx.fillStyle=fg; ctx.fillRect(px3,py3+top,LT,LT-top);
        if(wt){ ctx.save(); ctx.globalAlpha=0.45; ctx.fillStyle=wt; ctx.fillRect(px3,py3+top,LT,LT-top); ctx.restore(); }
        var sg=ctx.createLinearGradient(0,py3+LT,0,py3+LT+10); sg.addColorStop(0,'rgba(0,0,0,.32)'); sg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=sg; ctx.fillRect(px3,py3+LT,LT,10); }
      if(v3===7){ // a hidden door: a hairline crack, a breath of light through it (Kris: "come up with ideas of how to find them")
        ctx.strokeStyle=rgba(shade(P.wallTop,0.45),0.75); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(px3+LT*0.5,py3+2); ctx.lineTo(px3+LT*0.42,py3+LT*0.4); ctx.lineTo(px3+LT*0.56,py3+LT*0.66); ctx.lineTo(px3+LT*0.48,py3+LT-2); ctx.stroke();
        m.lights.push({x:px3+16,y:py3+LT-4,r:26,col:th.light,a:0.18,depth:-1,pulse:0.5,period:2600}); } }
    // crisp edges where walls meet the walkable ground
    ctx.lineWidth=2; ctx.strokeStyle=rgba(shade(P.wall,-0.6),0.85);
    for(var y4=0;y4<H;y4++)for(var x4=0;x4<W;x4++){ var v4=g[y4*W+x4]; if(v4!==2&&v4!==7)continue; var px4=x4*LT, py4=y4*LT; ctx.beginPath();
      if(walk(at(x4,y4+1))){ ctx.moveTo(px4,py4+LT); ctx.lineTo(px4+LT,py4+LT); } if(walk(at(x4,y4-1))){ ctx.moveTo(px4,py4+1); ctx.lineTo(px4+LT,py4+1); } if(walk(at(x4-1,y4))){ ctx.moveTo(px4+1,py4); ctx.lineTo(px4+1,py4+LT); } if(walk(at(x4+1,y4))){ ctx.moveTo(px4+LT-1,py4); ctx.lineTo(px4+LT-1,py4+LT); } ctx.stroke(); }
    m.base=cv; m.bg=P.void;
    // pillars, rocks, hedges (tile 6): painted pieces standing on their tile
    var pl6=built?th.pb:th.pn;
    for(var y5=0;y5<H;y5++)for(var x5=0;x5<W;x5++){ if(g[y5*W+x5]!==6)continue; var id6=ZSPP.pick(pl6,R), cx=x5*LT+16, fy=y5*LT+LT-2;
      if(!(id6&&Z.fit(m,id6,cx,fy,LT*1.4,{shw:0.36}))){ addSprite(m,cx,fy+4,LT+10,LT+26,function(c2,cw,ch){ rockBlob(c2,cw/2,ch-14,11,P.wallTop,R); }); } }
    // stairs
    var up=F.up, dn=F.down, gl=F.goal;
    if(up){ var ux=up[0]*LT, uy=up[1]*LT; if(!(Z&&Z.sprite(m,built&&ZSPP.has('tf_stairs')?'tf_stairs':'dg_stairs_up',ux+LT/2,uy+LT,0,{w:LT*2.4,shadow:false}))){ for(var s1=0;s1<4;s1++){ ctx.fillStyle=shade(P.wallTop,0.1-s1*0.08); ctx.fillRect(ux-6,uy+LT-8-s1*6,LT+12,6); } } }
    if(dn){ var dx2=dn[0]*LT, dy2=dn[1]*LT; if(!(Z&&Z.sprite(m,'dg_stairs_down',dx2+LT/2,dy2+LT-2,0,{w:LT*2.4,shadow:false}))){ for(var s2=0;s2<5;s2++){ ctx.fillStyle=shade(P.floor,-0.15-s2*0.13); ctx.fillRect(dx2-6+s2*2,dy2+2+s2*5.5,LT+12-s2*4,5.5); } }
      m.lights.push({x:dx2+16,y:dy2+12,r:80,col:th.light,a:0.4,depth:-1,pulse:0.35,period:2200}); }
    if(gl&&F.arena){ var A=F.arena, acx=(A[0]+A[2]/2)*LT, acy=(A[1]+A[3]/2)*LT; if(!(Z&&Z.decal(m,site.el==='fire'?'rn_circle_fire':'rn_circle',acx,acy,{w:Math.min(A[2],A[3])*LT*0.7})))glowSpot(ctx,acx,acy,Math.min(A[2],A[3])*LT*0.4,th.light,0.25);
      m.lights.push({x:acx,y:acy,r:Math.min(A[2],A[3])*LT*0.55,col:th.light,a:0.3,depth:-1,pulse:0.25,period:3000}); }
    // furnishing and set-pieces (keep the way open: a piece only stands where the floor stays joined up)
    var occ=new Uint8Array(W*H), reach0=function(){ var s=floodReach(m,up[0],up[1]), n=0, o=0; for(var k=0;k<W*H;k++){ if(!m.solid[k]){ o++; if(s[k])n++; } } return n>=o-2; };
    var clearOf=function(x,y){ var t=[up,dn,gl]; for(var i=0;i<t.length;i++)if(t[i]&&Math.abs(t[i][0]-x)<4&&Math.abs(t[i][1]-y)<4)return false; if(F.arena&&x>=F.arena[0]-1&&y>=F.arena[1]-1&&x<=F.arena[0]+F.arena[2]&&y<=F.arena[1]+F.arena[3])return false; return true; };
    var place=function(x,y,w,h){ for(var j=0;j<h;j++)for(var i=0;i<w;i++){ var k=(y+j)*W+x+i; if(m.solid[k]||occ[k]||g[k]===4)return false; } for(var j2=0;j2<h;j2++)for(var i2=0;i2<w;i2++)m.solid[(y+j2)*W+x+i2]=1; if(!reach0()){ for(var j3=0;j3<h;j3++)for(var i3=0;i3<w;i3++)m.solid[(y+j3)*W+x+i3]=0; return false; } for(var j4=-1;j4<=h;j4++)for(var i4=-1;i4<=w;i4++){ var X=x+i4, Y=y+j4; if(X>=0&&Y>=0&&X<W&&Y<H)occ[Y*W+X]=1; } return true; };
    // set-pieces: in the most open places
    var nSet=W*H>3000?2:1, tries=0, got=0; while(got<nSet&&tries++<400){ var x6=R.i(4,W-6), y6=R.i(4,H-6), ok=true; if(!clearOf(x6,y6))continue; for(var j6=-2;j6<=2&&ok;j6++)for(var i6=-2;i6<=2;i6++)if(!walk(at(x6+i6,y6+j6))||at(x6+i6,y6+j6)===4){ ok=false; break; } if(!ok)continue;
      var sid=ZSPP.pick(th.set,R); if(!sid)break; if(!place(x6-1,y6-1,2,2))continue; var flat=/^rn_circle|^tf_c_pool|^tf_c_starmap/.test(sid);
      if(flat){ for(var j7=0;j7<2;j7++)for(var i7=0;i7<2;i7++)m.solid[(y6-1+j7)*W+x6-1+i7]=0; Z.decal(m,sid,x6*LT,y6*LT,{w:LT*4}); }
      else Z.fit(m,sid,x6*LT,(y6+1)*LT-2,LT*4.2,{shw:0.45}); m.lights.push({x:x6*LT,y:y6*LT-20,r:110,col:th.light,a:0.35,pulse:0.2,period:2800}); got++; }
    // furnishing along the walls (a back wall above, open floor in front)
    var nDeco=Math.round(W*H/150); for(var t=0;t<nDeco*8&&nDeco>0;t++){ var x7=R.i(2,W-3), y7=R.i(2,H-3); if(at(x7,y7)!==1&&at(x7,y7)!==5)continue; if(at(x7,y7-1)!==2||!walk(at(x7,y7+1))||!walk(at(x7-1,y7))||!walk(at(x7+1,y7))||!clearOf(x7,y7))continue;
      var did=ZSPP.pick(th.deco,R); if(!did||!place(x7,y7,1,1))continue; Z.fit(m,did,x7*LT+16,y7*LT+LT-2,LT*1.5,{shw:0.3}); nDeco--; }
    // lights: torches on the walls, glows for the natural sites
    var nL=Math.round(W*H/110); for(var t2=0;t2<nL*6&&nL>0;t2++){ var x8=R.i(2,W-3), y8=R.i(2,H-3); if(at(x8,y8)!==2||!walk(at(x8,y8+1)))continue; if(built&&ZSPP.has('dg_torch'))Z.hang(m,'dg_torch',x8*LT+16,y8*LT+2,14,{depth:y8*LT+LT}); m.lights.push({x:x8*LT+16,y:y8*LT+LT+6,r:built?95:70,col:built?'#ffc880':th.light,a:built?0.42:0.3,flicker:built?0.3:0}); nL--; }
    // drifting motes of the element
    m.particles.push({col:th.part,freq:liq==='lava'?160:240,scale:{start:0.3,end:0},alpha:{start:0.6,end:0},vy:site.el==='fire'?{min:-18,max:-6}:site.el==='water'?{min:4,max:10}:{min:-6,max:6}});
    m.site={entry:{x:up[0],y:up[1]},exit:dn?{x:dn[0],y:dn[1]}:{x:gl[0],y:gl[1]},secrets:F.secrets||[],treasure:F.treasure||null,arena:F.arena||null};
    m.spawn={x:up[0]*LT+LT/2,y:up[1]*LT+LT/2};
    if(!built){ m.dark=site.el==='fire'?0.35:0.5; m.heroLight=240; m.heroLightCol='#ffd8a0'; m.darkCol='#030205'; } else if(site.el==='shadow'||liq==='stars'){ m.dark=0.35; m.heroLight=230; m.heroLightCol='#e0d0ff'; m.darkCol='#05030a'; }
    m.zspFloorCol=P.floor; m.stats={plan:T.n,rooms:0}; m.zsp={id:site.id,name:T.n,floor:fi}; return m; }
};
