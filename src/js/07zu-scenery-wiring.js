// ═══════════════════════════════════════════════════════════════════════
// ║ 07zu-scenery-wiring.js — painted pictures for the world's props (round 31).
// ║ Each rule says which painted object (07zt ZSCN ids) stands in for a drawn prop and how big: as tall as the
// ║ drawing was (h), as wide as its tiles (w), or its designed size (neither). A rule returns null to keep the
// ║ drawing (wrong colour, no picture of that variant). When the picture is not there — its sheet has not been
// ║ painted, or painted scenery is off — the old painter runs unchanged. The Design Lab has no ZScn: nothing changes there.
// ║ Trees, rocks, crystals, standing stones, lanterns, village buildings, fountain, well, lamp post, town wall and
// ║ garden beds are wired inside their own painters (07f, 07k, 07l).
// ═══════════════════════════════════════════════════════════════════════
var SCN_RULES={
  // ruins and landmarks
  column:function(o){ return o.broken?{id:'ru_column_broken',h:74}:{id:'ru_column',h:112}; },
  wall:function(o,w){ return {id:o.char?'ru_wall_charred':'ru_wall',w:w+8,light:o.rune?[0,-30,56,o.rune,0.35,{react:true,rune:true}]:null}; },
  rib:function(o){ return {id:'lm_rib',h:122*(o.s||1)}; },
  skull:function(o){ return {id:'lm_skull',w:102*(o.s||1.4),light:o.eye?[-12*(o.s||1.4),-36*(o.s||1.4),34,o.eye,0.5,{pulse:0.4}]:null}; },
  hut:function(o,w){ return {id:o.stilts?'hb_hut_stilts':'hb_hut',w:w+18,light:o.lit!==false?[0,-30,50,'#ffc870',0.3,{flicker:0.2}]:null}; },
  block:function(){ return {id:'ru_block',h:44}; },
  arch:function(o,w){ return {id:'en_arch',w:w+18}; },
  roof:function(o,w){ return {id:'ru_roof',w:w+10}; },
  spire:function(o,w){ return {id:'ru_spire',h:(o.ht||150)+6,light:[0,-(o.ht||150)*0.6,60,o.rune||'#6fffe0',0.35,{react:true,rune:true}]}; },
  dwarfdoor:function(o){ return {id:'en_dwarf_door',h:76,light:[0,-36,56,o.rune||'#ffc860',0.35,{react:true,rune:true}]}; },
  brazier:function(){ return {id:'lm_brazier',h:48,light:[0,-36,90,'#ffa040',0.5,{flicker:0.35}]}; },
  harp:function(){ return {id:'lm_harp',h:104}; },
  chess:function(o){ var p=o.piece||'pawn', id={pawn:'lm_chess_pawn',rook:'lm_chess_rook',king:'lm_chess_king',knight:'lm_chess_knight'}[p], dark={rook:1,knight:1}[p]?true:false; return id&&(!!o.dark===dark)?{id:id,h:{pawn:96,rook:126,king:150,knight:134}[p]}:null; },
  golem:function(o,w){ return {id:'lm_golem',w:w+36,light:[0,-34,60,o.rune||'#ffb060',0.35,{react:true,rune:true}]}; },
  chimney:function(){ return {id:'lm_chimney',h:170}; },
  turtlehead:function(){ return {id:'lm_turtle',h:54,shadow:false}; },
  frog:function(){ return {id:'lm_frog',h:16,dy:-8}; },
  // rocks
  geode:function(o){ return {id:'rk_geode',h:58,light:[0,-22,70,o.col||'#c080ff',0.4,{pulse:0.3}]}; },
  starcore:function(){ return {id:'rk_starcore',h:62,light:[0,-24,110,'#bfe8ff',0.5,{pulse:0.35}]}; },
  shard:function(o,w,h,R){ return {id:R.chance(0.35)?'rk_shard_b':'rk_shard',h:70}; },
  basalt:function(o,w){ return w>LT?{id:'rk_basalt_a',w:w+24}:{id:'rk_basalt_b',w:w+26}; },
  geyser:function(o,w,h){ return {id:'rk_geyser',flat:true,w:w,fy:h*0.86}; },
  // plants
  bush:function(o,w,h,R){ var c=_scnRGB(o.col||'#3e6e36'); if(!(c[1]>c[0]&&c[1]>c[2]))return null; return {id:o.glow?'pl_bush_glow':o.berries?'pl_bush_berry':R.chance(0.22)?'pl_bush_flower':'pl_bush',w:w+18,light:o.glow?[0,-14,50,o.glow===true?'#6fe3f5':o.glow,0.3,{pulse:0.3}]:null}; },
  reeds:function(o,w){ return {id:o.wisp?'pl_wispreeds':o.cattail||o.cattails?'pl_cattails':'pl_reeds',h:64,shadow:false,light:o.wisp?[0,-56,60,'#9fdcff',0.4,{pulse:0.4}]:null}; },
  lanternlily:function(o){ return {id:'pl_lanternlily',h:66,shadow:false,light:[0,-52,80,o.col||'#ffd27a',0.45,{pulse:0.3}]}; },
  curtain:function(o,w){ return {id:'pl_curtain',w:w+10,shadow:false}; },
  emberflower:function(o,w,h){ return {id:'pl_emberflower_b',flat:true,w:Math.min(w,60),fy:h*0.8}; },
  lilypad:function(o,w,h){ return {id:'pl_lilypad',flat:true,w:Math.min(w-4,52),fy:h*0.75}; },
  pebbles:function(o,w,h){ return o.cols?null:{id:'rk_pebbles',flat:true,w:Math.min(w,38),fy:h*0.8}; },
  glass:function(o,w,h){ return {id:'ru_glass',flat:true,w:Math.min(w,58),fy:h*0.8}; },
  // village and harbor
  statue:function(){ return {id:'vb_statue',h:124,light:[0,-18,50,'#ffc860',0.3,{react:true,rune:true}]}; },
  anvil:function(){ return {id:'vp_anvil',h:38}; },
  banner:function(o,w,h,R){ return {id:R.pick(['vp_banner_red','vp_banner_teal','vp_banner_gold']),h:104}; },
  stall:function(o,w){ return {id:'vp_market_stall',w:w+18}; },
  cart:function(o,w,h,R){ return {id:R.pick(['vp_cart_hay','vp_cart_veg','vp_cart_barrels']),w:w+22}; },
  tower:function(o,w){ return {id:'vb_turret',w:w+26}; },
  boathouse:function(o,w){ return {id:'vb_boathouse',w:w+28,light:[0,-30,60,'#6fe3f5',0.3,{react:true,rune:true}]}; },
  stilthouse:function(o,w){ return {id:'vb_lake_house',w:w+36,light:[0,-70,54,'#ffc870',0.3,{flicker:0.2}]}; },
  lighthouse:function(){ return {id:'vb_lighthouse',h:224,light:[0,-200,170,'#ffe8a0',0.55,{pulse:0.4,period:2600}]}; },
  boat:function(o,w){ return {id:'vp_boat',w:w+8,shadow:false}; },
  boatv:function(o,w){ return {id:o.sail?'vp_boat_sail':'vp_boat',w:w+8,shadow:false}; }
};
// rows of joined pieces
var SCN_ROWS={
  fence:function(o){ return {wood:'vp_fence_wood',stone:'vp_fence_stone',hedge:'vp_fence_hedge',iron:'vp_fence_iron'}[o.kind||'wood']; },
  rail:function(o){ return o.stone?'bp_rail_stone':'bp_rail_wood'; }
};
(function(){ if(typeof WPROP==='undefined')return;
  Object.keys(SCN_RULES).forEach(function(key){ var old=WPROP[key], rule=SCN_RULES[key]; if(!old)return;
    WPROP[key]=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn();
      if(Zs){ var S=null; try{ S=rule(o||{},w,h,c.R,Zs); }catch(e){ S=null; }
        if(S&&Zs.has(S.id)){ var cx=x+w/2+(S.dx||0), fy=y+h+(S.dy||0), Z;
          if(S.flat)Z=Zs.draw(ctx,S.id,cx,y+(S.fy!==undefined?S.fy:h),0,{w:S.w});
          else Z=S.w?Zs.sprite(c.m,S.id,cx,fy,0,{w:S.w*Zs.K,shadow:S.shadow,sp:S.sp}):S.h?Zs.sprite(c.m,S.id,cx,fy,S.h*Zs.K,{shadow:S.shadow,sp:S.sp}):Zs.fit(c.m,S.id,cx,fy,0,{shadow:S.shadow,sp:S.sp});
          if(Z){ if(S.light)addLight(c.m,cx+S.light[0],fy+S.light[1]*Zs.K,S.light[2],S.light[3],S.light[4],S.light[5]); return; } } }
      return old.apply(this,arguments); }; });
  Object.keys(SCN_ROWS).forEach(function(key){ var old=WPROP[key], rule=SCN_ROWS[key]; if(!old)return;
    WPROP[key]=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(), id=Zs&&rule(o||{}); if(id&&Zs.row(c.m,id,x,y+h,w))return; return old.apply(this,arguments); }; });
  // flowers: a few painted clumps where the dots were (only the default mixed colours; zones with their own flower colours keep their dots)
  var oldF=WPROP.flowers; if(oldF)WPROP.flowers=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(), ids=['pl_flowers_red','pl_flowers_yellow','pl_flowers_blue','pl_flowers_white'];
    if(Zs&&!(o&&o.cols)&&Zs.has(ids[0])){ var n=Math.max(1,Math.round(((o&&o.n)||14)*w/LT/7)); for(var i=0;i<n;i++)Zs.draw(ctx,c.R.pick(ids),x+6+c.R.f()*(w-12),y+10+c.R.f()*(h-12),0,{w:22}); return; }
    return oldF.apply(this,arguments); };
  var oldT=WPROP.tuft; if(oldT)WPROP.tuft=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(); if(Zs&&Zs.has('pl_tuft')&&!(o&&o.col)){ Zs.draw(ctx,'pl_tuft',x+w/2,y+h-4,0,{w:Math.min(w-4,26)}); return; } return oldT.apply(this,arguments); };
  // windmill: the painted body, and the painted sails turning on its hub
  var oldW=WPROP.windmill; if(oldW)WPROP.windmill=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(), m=c.m; if(Zs&&Zs.has('vb_windmill')&&Zs.has('vb_windmill_sails')){ var Z=Zs.sprite(m,'vb_windmill',x+w/2,y+h,0,{w:(w+30)*Zs.KB});
      var hub=y+h-Z.h*0.78, S=Zs.size('vb_windmill_sails',0,{w:Z.w*1.5}), RS=Zs.RES, D=Math.ceil(Math.max(S.w,S.h))+4; addSprite(m,x+w/2,hub,D*RS,D*RS,function(g){ g.scale(RS,RS); Zs.draw(g,'vb_windmill_sails',D/2+(S.ax-S.w/2),D/2+S.h/2,0,{w:S.w}); });
      var sp=m.sprites[m.sprites.length-1]; sp.res=RS; sp.ox=0.5; sp.oy=0.5; sp.spin=9000+c.R.i(0,4000); sp.depth=y+h+1; addLight(m,x+w/2,y+h-100,50,(o&&o.rune)||'#6fe3f5',0.3,{react:true,rune:true}); return; }
    return oldW.apply(this,arguments); };
  // kite, floating rock, sky dock: the painted piece keeps the bobbing and the height of the drawn one
  var oldK=WPROP.kite; if(oldK)WPROP.kite=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(), gx=x+w/2, gy=y+h; if(Zs&&Zs.has('lm_kite')){ ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(gx,gy); ctx.quadraticCurveTo(gx+30,gy-60,gx+46,gy-120); ctx.stroke(); ctx.fillStyle='#5a3a26'; ctx.fillRect(gx-2,gy-6,4,6);
      Zs.sprite(c.m,'lm_kite',gx+46,gy-100,58*Zs.K,{shadow:false,sp:{depth:8000,bob:8}}); addLight(c.m,gx+46,gy-130,40,'#bff4ff',0.3,{react:true,rune:true,depth:8001}); return; } return oldK.apply(this,arguments); };
  var oldR=WPROP.floatrock; if(oldR)WPROP.floatrock=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(), id=(o&&o.tree)?'lm_floatrock_tree':'lm_floatrock'; if(Zs&&Zs.has(id)&&!(o&&o.chain)){ var alt=(o&&o.alt)||110; softShadow(ctx,x+w/2,y+h/2,w*0.55,h*0.3,0.28);
      Zs.sprite(c.m,id,x+w/2,y+h/2-alt+40,0,{w:(w+36)*Zs.K,shadow:false,sp:{depth:8000,bob:6+c.R.i(0,5)}}); addLight(c.m,x+w/2,y+h/2-alt+30,60,(o&&o.rune)||'#9ff0ff',0.35,{react:true,rune:true,depth:8001}); return; } return oldR.apply(this,arguments); };
  var oldB=WPROP.balloondock; if(oldB)WPROP.balloondock=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(); if(Zs&&Zs.has('vb_sky_dock')&&Zs.has('vb_balloon')){ Zs.sprite(c.m,'vb_sky_dock',x+w/2,y+h,0,{w:(w+40)*Zs.KB}); Zs.sprite(c.m,'vb_balloon',x+w/2+10,y+h-60,108*Zs.K,{shadow:false,sp:{depth:8000,bob:8}}); return; } return oldB.apply(this,arguments); };
  // fairy rings: painted toadstools round the drawn ring
  var oldM=WPROP.mushring; if(oldM)WPROP.mushring=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(); if(!(Zs&&Zs.has('rn_toadstool')))return oldM.apply(this,arguments); o=o||{}; var cx=x+w/2, cy=y+h/2, r=Math.min(w,h)/2-6, n=o.n||12, col=o.col||'#e8a6ff';
    ctx.strokeStyle=rgba('#1e3a1c',0.35); ctx.lineWidth=6; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); if(o.rune&&typeof runeRing==='function')runeRing(ctx,cx,cy,r*0.62,o.rune,c.R,8);
    for(var i=0;i<n;i++){ var a=i/n*Math.PI*2; Zs.sprite(c.m,(i%3===1&&Zs.has('rn_toadstool_b'))?'rn_toadstool_b':'rn_toadstool',cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.9+8,(26+c.R.f()*8)*Zs.K,{shw:0.3}); }
    addLight(c.m,cx,cy,r*1.4,o.rune||col,0.3,{react:true,rune:true,depth:-4}); };
  // rune circles (not the Runestone Green) and floor runes: flat pictures on the ground
  var oldG=WPROP.runeglyph; if(oldG)WPROP.runeglyph=function(c,ctx,x,y,w,h,o,P){ var Zs=_scn(); o=o||{}; if(Zs&&Zs.has('rn_glyph_a')&&!o.col){ Zs.draw(ctx,'rn_glyph_a',x+w/2,y+h/2,0,{w:(o.size||18)*1.9}); addLight(c.m,x+w/2,y+h/2,o.r||48,'#6fe3f5',0.33,{react:true,rune:true,depth:-4}); return; } return oldG.apply(this,arguments); };
})();
// ── towers, castles and mage towers: furnishings (the painters are TOWER_FLAT / TOWER_TALL in 07b, 07ta, 07zm) ──
var TWR_PZ={bookshelf:'tf_bookshelf',wardrobe:'tf_wardrobe',lectern:'tf_lectern',globe:'tf_globe',candelabra:'tf_candelabra',statue:'tf_statue',pillar:'tf_pillar',telescope:'tf_telescope',
  plant:'tf_plant',planter:'tf_planter',tree:'tf_tree',whitetree:'tf_whitetree',harp:'tf_harp',piano:'tf_piano',chandelier:'tf_chandelier',crystalpillar:'tf_crystalpillar',
  center_fountain:'tf_c_fountain',center_crystal:'tf_c_crystal',center_tree:'tf_c_tree',center_orrery:'tf_c_orrery',
  table:'tf_table',longtable:'tf_longtable',desk:'tf_desk',maptable:'tf_maptable',sideboard:'tf_sideboard',bench:'tf_bench',pew:'tf_pew',chair:'tf_chair',nightstand:'tf_nightstand',bed:'tf_bed',altar:'tf_altar',
  hearth:'cf_hearth',great_torch:'cf_torch',pillar_massive:'cf_pillar',armor_stand:'cf_armor',weapon_rack:'cf_weapons',shield_rack:'cf_shields',great_sword:'cf_sword',barrel:'cf_barrel',
  statue_knight:'cf_knight',statue_dragon:'cf_dragon',statue_saint:'cf_saint',throne_big:'cf_throne',sarcophagus:'cf_sarcophagus',banquet:'cf_banquet',bench_long:'cf_bench',
  cauldron:'mf_cauldron',potion_shelf:'mf_potion_shelf',alchemy_table:'mf_alchemy',herb_rack:'mf_herb_rack',floating_books:'mf_books',floating_rock:'mf_floatrock',pylon:'mf_pylon',crystal_cluster:'mf_crystals',
  crystal_ball:'mf_orb',cage:'mf_cage',gear_wall:'mf_gears',hourglass:'mf_hourglass',magic_mirror:'mf_mirror',bone_pile:'mf_bones',soulfire:'mf_soulfire',rune_anvil:'mf_anvil',
  fish_tank:'mf_tank',mushrooms_big:'mf_mushrooms',curtain:'mf_curtain',puppet:'mf_puppet',void_crack:'mf_void'};
var TWR_PZ_FLAT={stairs:'tf_stairs',pool:'tf_c_pool',rug:'tf_rug',runner:'tf_runner',royal_carpet:'tf_royal_carpet',mosaic:'tf_mosaic',dais:'tf_dais',center_starmap:'tf_c_starmap',center_pool:'tf_c_pool',rune_circle:'tf_rune_circle',starmap_floor:'mf_starmap',stage_floor:'mf_stage'};
var TWR_PZ_HANG={chandelier:1,floating_books:1,floating_rock:1,cage:1};      // hang or float: placed where the drawn one was, keeping its bobbing
var TWR_PZ_LONG={longtable:1,banquet:1,pew:1,bench:1,bench_long:1,weapon_rack:1,shield_rack:1,sideboard:1,bookshelf:1,potion_shelf:1,herb_rack:1,gear_wall:1,fish_tank:1,hearth:1,altar:1};      // stretched along their tiles when those are wider than the picture
function _twrPainted(m,it,S,R){ var Zs=_scn(); if(!Zs)return false; var x=it.x*LT, y=it.y*LT, w=it.w*LT, h=it.h*LT, fid=TWR_PZ_FLAT[it.type], id=TWR_PZ[it.type], flat=fid&&Zs.has(fid); if(!flat&&!(id&&Zs.has(id)))return false;
  // the old painter runs once into a throw-away map: its lights (hearth glow, torch flicker) and its sprite's place and bobbing are kept
  var fake={sprites:[],lights:[],shafts:[],particles:[],labels:[]}, tall=TOWER_TALL[it.type]; if(tall){ try{ tall(fake,x,y,w,h,S,R); }catch(e){} } var fs=fake.sprites[0], ok;
  if(flat)ok=Zs.rect(m,fid,x+2,y+2,w-4,h-4);
  else { var cx=x+w/2, fy=y+h, o={shw:0.36,sp:{}}, nat=Zs.size(id,0); if(TWR_PZ_HANG[it.type]&&fs){ cx=fs.x; fy=fs.y; o.shadow=false; } if(fs){ if(fs.bob)o.sp.bob=fs.bob; if(fs.depth!==undefined)o.sp.depth=fs.depth; }
    if(TWR_PZ_LONG[it.type]&&w>nat.w*Zs.K*1.15){ o.stretch=w/(nat.w*Zs.K); o.shw=0.46; ok=Zs.sprite(m,id,cx,fy,nat.h*Zs.K,o); } else ok=Zs.fit(m,id,cx,fy,w+14,o); }
  if(!ok)return false; fake.lights.forEach(function(l){ m.lights.push(l); }); it._pz=true; return true; }

// village dressing (round 31): small painted pieces the plan sets beside houses, on the plaza and by the harbour. There is no drawn version: without the picture nothing is shown.
if(typeof WPROP!=='undefined')WPROP.vdress=function(c,ctx,x,y,w,h,o){ var Zs=_scn(); if(Zs&&o&&o.id)Zs.fit(c.m,o.id,x+w/2,y+h-2,w+22,{shw:0.36}); };

// tower, castle and mage-tower floors (07b FLOORS): the tile's own colour with the painted texture's marks, lined up across tiles
(function(){ if(typeof FLOORS==='undefined')return; var MAP={marble:'tx_f_marble',planks:'tx_f_planks',herring:'tx_f_herring',hex:'tx_hex',slab:'tx_f_flag',ice:'tx_ice'};
  Object.keys(MAP).forEach(function(k){ var old=FLOORS[k]; if(!old)return; FLOORS[k]=function(ctx,x,y,tx,ty,a,b,R){ var Zs=_scn(), d=Zs&&Zs.timg[MAP[k]]&&Zs.detail(MAP[k],96,1.1); if(!d)return old.apply(this,arguments);
    ctx.fillStyle=a; ctx.fillRect(x,y,LT,LT); ctx.save(); ctx.globalCompositeOperation='overlay'; ctx.drawImage(d,((tx*LT)%96+96)%96,((ty*LT)%96+96)%96,LT,LT,x,y,LT,LT); ctx.restore(); }; });
})();
