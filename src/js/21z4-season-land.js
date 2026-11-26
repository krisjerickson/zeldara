// ═══════════════════════════════════════════════════════════════════════
// ║ 21z4-season-land.js — round 136: THE SEASONS ON THE LAND (Kris: "all seasons and festivals picks are in" — every group ✓ in the Lab's
// ║ "All the seasons & festivals"). The trees, plants, ground and village already turn with the season (10zs); this places the land's own
// ║ painted pieces (wave 127) and the festival dressings (wave 118):
// ║  · the thaw — old snow in the hollows, meltwater, mud ruts, snowdrops and coltsfoot; the village waking (a boat being tarred, bedding
// ║    aired, the first furrow, seed sacks, pussy-willow, a new birdhouse)
// ║  · autumn — the first true harvest: hay racks, stooks, a heaped wagon, baskets, ale for Yule, the smoking rack, the last sheaf
// ║  · winter — the first happy Yule: the birds' sheaf, snow and ice lanterns, straw stars, the goat, the Yule log, the solstice fire
// ║  · Freya's spring — anemones, lily of the valley, cowslips, flower meadows, fallen blossom, a birch in new leaf, the flower arch, bees
// ║  · summer keeps the land as it is.
// ║    Where: around the Green and the farms (a ring round the village) and a few by every waystone; the same places each time.
// ║  · festival days (21z2 ZDAY) — each house of the village gets its season's dressing at its door: a wreath, a banner, a lantern and the
// ║    step piece; at night torches and braziers along the Green.
// ║ Switch: ZSLAND.on.
// ═══════════════════════════════════════════════════════════════════════
var ZSLAND={ on:true,
  FLAT:{lt_snow_a:1,lt_snow_b:1,lt_puddle:1,lt_mud:1,lt_straw:1,lt_twigs:1,lb_meadow:1,lb_petals:1,lb_anemones:1,ly_spruce:1},
  SET:{sp:['lt_snow_a','lt_snow_b','lt_puddle','lt_mud','lt_coltsfoot','lt_snowdrops','lt_straw','lt_twigs','lt_tar_boat','lt_airing','lt_plough','lt_seed','lt_catkins','lt_birdbox'],
    au:['lh_hesje','lh_hesje_s','lh_stook','lh_rauk','lh_wagon','lh_baskets','lh_barrels','lh_rack','lh_flail','lh_rowan','lh_berries','lh_lastsheaf'],
    wi:['ly_neg','ly_snowlantern','ly_icelantern','ly_spruce','ly_straw_star','ly_goat','ly_torch','ly_sled','ly_log','ly_bonfire','ly_tree','ly_himmeli'],
    bl:['lb_anemones','lb_lily','lb_cowslip','lb_meadow','lb_petals','lb_birch','lb_hawthorn','lb_arch','lb_stone','lb_hive','lb_pole'],su:[]},
  DRESS:['wreath','banner','lantern','step'],
  // the size each piece was painted for (its request), else a modest default
  H:function(id){ if(ZSLAND._H)return ZSLAND._H[id]||48; var M=ZSLAND._H={}; try{ ZSCN.SHEETS.forEach(function(S){ (S.items||[]).forEach(function(it){ if(it&&typeof it[4]==='number')M[it[0]]=it[4]; }); }); }catch(e){} return M[id]||48; },
  has:function(id){ return typeof ZScn!=='undefined'&&ZScn.has&&ZScn.has(id); },
  put:function(ws,L,id,x,y){ if(!ZSLAND.has(id))return null; var o=Z3.img(ws,id,x,y,ZSLAND.H(id)); if(!o)return null; if(ZSLAND.FLAT[id]){ o.setOrigin(0.5,0.5).setDepth(1.02); } L.push(o); return o; },
  clear:function(ws,k){ (ws[k]||[]).forEach(function(o){ try{ o.destroy(); }catch(e){} }); ws[k]=null; },
  land:function(ws,s){ ZSLAND.clear(ws,'_zsl'); ws._zslS=s; var L=ws._zsl=[], P=ZSLAND.SET[s]||[]; if(!P.length)return;
    var C=ZFEST.centre(ws), R=Z3.rng(9001+s.charCodeAt(0)*7+s.charCodeAt(1)), n=0, tries=0;
    while(n<22&&tries<600){ tries++; var a=R()*Math.PI*2, r=(7+R()*20)*TILE, x=C.x+Math.cos(a)*r, y=C.y+Math.sin(a)*r*0.85; if(!Z3.free(ws,x,y))continue;
      if(L.some(function(o){ return Math.hypot(o.x-x,o.y-y)<TILE*3; }))continue; ZSLAND.put(ws,L,P[n%P.length],x,y); n++; }
    (ws.wd&&ws.wd.waystones||[]).forEach(function(w,i){ for(var k=0;k<2;k++){ for(var t=0;t<14;t++){ var a=R()*Math.PI*2, r=(2.5+R()*3)*TILE, x=(w.x+0.5)*TILE+Math.cos(a)*r, y=(w.y+0.5)*TILE+Math.sin(a)*r; if(!Z3.free(ws,x,y))continue; ZSLAND.put(ws,L,P[(i*2+k+3)%P.length],x,y); break; } } }); },
  // festival days: the doors of the village
  dress:function(ws,f){ ZSLAND.clear(ws,'_zsd'); ws._zsdF=f; if(!f)return; var L=ws._zsd=[], B=(ws.wd&&ws.wd.buildings)||[];
    B.forEach(function(b,i){ if(b.worldX==null)return; var dx=b.worldX+b.w*TILE/2, dy=b.worldY+b.h*TILE+TILE*0.6, side=i%2?1:-1;
      var spots=[['wreath',dx+side*TILE*0.9,dy],['banner',dx-side*TILE*1.4,dy+4],['lantern',dx+side*TILE*1.6,dy+2],['step',dx,dy+TILE*0.5]];
      spots.forEach(function(p){ var id='fd_'+f+'_'+p[0]; if(!ZSLAND.has(id))return; for(var k=0;k<4;k++){ var y=p[2]+k*TILE*0.7; if(Z3.free(ws,p[1],y)){ ZSLAND.put(ws,L,id,p[1],y); return; } } }); });      /* just in front of the door: a painted house is solid a little past its footprint */
    var C=ZFEST.centre(ws); for(var k=0;k<8;k++){ var a=k/8*Math.PI*2, x=C.x+Math.cos(a)*4.2*TILE, y=C.y+Math.sin(a)*3.4*TILE; if(Z3.free(ws,x,y)){ var o=ZSLAND.put(ws,L,k%2?'fd_night_torch':'fd_night_brazier',x,y); if(o)o._zNight=1; } } },
  tick:function(){ if(!ZSLAND.on)return; var ws=Z2.ws(); if(!ws||!ws.player||!ws.playerState||!Z2.act('World')||ws.wd&&ws.wd.islKey)return; var ps=ws.playerState;
    // a season's paintings arrive a moment after it turns (10zs loadArt): place again when more of them are in
    var s=typeof ZSEASON!=='undefined'?ZSEASON.cur:null, av=s?(ZSLAND.SET[s]||[]).filter(ZSLAND.has).length:0; if(s&&(ws._zslS!==s||av>(ws._zslA||0))){ ZSLAND.land(ws,s); ws._zslA=av; }
    var f=typeof ZDAY!=='undefined'?ZDAY.fest(ps):null, ad=f?ZSLAND.DRESS.filter(function(k){ return ZSLAND.has('fd_'+f+'_'+k); }).length:0;
    if((f||null)!==(ws._zsdF||null)||ad>(ws._zsdA||0)){ ZSLAND.dress(ws,f); ws._zsdA=ad; }
    if(ws._zsd){ var night=(ws._night||0)>0.3; ws._zsd.forEach(function(o){ if(o._zNight)o.setVisible(night); }); } } };
if(typeof setInterval!=='undefined')setInterval(function(){ try{ if(typeof Z2!=='undefined'&&Z2.playing())ZSLAND.tick(); }catch(e){ if(typeof console!=='undefined')console.warn('season land',e); } },700);
