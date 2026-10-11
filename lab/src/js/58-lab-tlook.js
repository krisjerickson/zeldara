// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 43 — TERRAIN PIECES tab, new first section: how the pieces are used (TPLOOK).
// ║ Kris (Oct 9): "come up with design lab options for how these should be used for me to pick from for options in terms of density and
// ║ variety, but generally use your judgement for how dense and dispersed. All of these features you should be able to walk over, but if
// ║ they are larger it should look like you move behind them, with smaller features you walk on top of."
// ║ Six rows of options — how many, how grouped, how mixed, how varied in size, how much they sway, how many creatures. Each card is a
// ║ moving preview drawn with the painted pieces, with a hero walking along the shore (behind the tall pieces, over the small ones).
// ║ The game's settings are 05d ZWE.LOOK / ZWE.LOOKS (same keys); the recommended card in each row is what the game does now.
// ║ Picks: 'tpieces-look_<row>_<option>' (one per row: picking one clears the others in its row).
// ═══════════════════════════════════════════════════════════════════════
var TPLOOK=(function(){ if(typeof LBR==='undefined')return null;
  var ROWS=[
    ['dens','How many',[['sparse','Sparse','A few accents; most of the edge is plain ground.',0.5],['natural','Natural','About what you see in nature: plenty, but the ground still shows. In the game now.',0.85,1],['lush','Lush','Thick along the water and banks.',1.4],['wild','Overgrown','Edges crowded with growth — the most life, the busiest look.',2]]],
    ['clump','How they are spread',[['even','Even scatter','Spread evenly along every edge.',0],['clusters','Clusters','Groups of pieces with open stretches between them. In the game now.',0.7,1],['groves','Big groves','Large thick patches and long bare stretches.',1]]],
    ['vary','How mixed',[['one','One kind per stretch','Each stretch of shore has one main kind (a reed bed, then a run of stones…).','one'],['mixed','Mixed','A main kind per stretch with others among it. In the game now.','mixed',1],['all','Everything mixed','Every kind everywhere, evenly.','all']]],
    ['size','Size',[['same','All one size','Every piece at its painted size.',0],['some','A little variation','Up to 15 % bigger or smaller. In the game now.',0.15,1],['lots','Lots of variation','Up to 30 % bigger or smaller.',0.3]]],
    ['sway','Wind',[['still','Still','Plants stand still; only creatures, water and particles move.',0],['gentle','Gentle sway','A soft breeze rolls through the grass and reeds. In the game now.',1,1],['breezy','Breezy','Stronger sway with gusts passing through.',2]]],
    ['crit','Creatures',[['few','Few','Now and then.',0.5],['some','Some','Regularly, without crowding. In the game now.',1,1],['many','Many','Lots of life everywhere.',2]]]];
  var PLACES={lake:'Lake shore',marsh:'Marsh',sea:'Beach',cliff:'Mountain foot',lava:'Lava',snow:'Snow line'};
  // ground: [land, other side, other is liquid]; pieces: [id, zone (w water, e edge on land, l land), rate, tall, sway°]
  var SC={lake:{g:['#74b058','#2a6f92',1],p:[['ed_reeds','w',0.5,1,4],['ed_cattails','w',0.4,1,4],['ed_iris','w',0.3,1,4],['ed_stepping_stones','w',0.25],['ed_lily','w',0.25],['ed_log_fallen','e',0.12,1],['ed_log_mossy','e',0.1,1],['ed_rock_mossy','e',0.18,1],['ed_tuft_a','e',0.6,0,5],['ed_tuft_b','e',0.5,0,5],['ed_wildflowers','l',0.35,0,6],['ed_clover','l',0.25],['ed_bramble','l',0.12,1]],cr:['ed_dragonfly','ed_butterfly']},
    marsh:{g:['#6a583e','#4a7e68',1],p:[['ed_reeds','w',0.5,1,4],['ed_cattails','w',0.5,1,4],['ed_duckweed','w',0.4],['ed_lily','w',0.3],['ed_log_rotting','e',0.15,1],['ed_log_mossy','e',0.1,1],['ed_toadstools','e',0.3,1],['ed_fern','e',0.35,1,3],['ed_mud_clods','e',0.3],['ed_cracked_mud','l',0.2],['ed_tuft_a','l',0.3,0,5]],cr:['ed_frog','ed_firefly','ed_dragonfly']},
    sea:{g:['#e4d4a2','#16487c',1],p:[['ed_shore_rock','w',0.3,1],['ed_foam','w',0.3],['ed_shells','e',0.4],['ed_tide_pool','e',0.25],['ed_wrack','e',0.3],['ed_pebbles','e',0.3],['ed_driftwood','e',0.15],['ed_sand_ripples','l',0.3],['ed_dune_grass','l',0.35,1,5]],cr:['ed_crab','ed_gull']},
    cliff:{g:['#9aaa70','#8c8478',0],p:[['ed_talus_a','w',0.35,1],['ed_talus_b','w',0.3,1],['ed_foot_boulder','w',0.25,1],['ed_lichen_rock','e',0.25],['ed_moss_patch','e',0.25],['ed_alpine_flowers','l',0.4,0,6],['ed_heather','l',0.35,1],['ed_tuft_dry','l',0.4,0,5]],cr:['ed_crow','ed_leaf_autumn']},
    lava:{g:['#3c2a24','#ff9a30',1],p:[['ed_lava_plate','w',0.35],['ed_lava_bubble','w',0.25],['ed_basalt','e',0.25,1],['ed_obsidian','e',0.3,1],['ed_ember_rocks','e',0.3,1],['ed_sulphur','l',0.25,1],['ed_steam_vent','l',0.15,1],['ed_crust_shards','l',0.3],['ed_ash_heap','l',0.2]],cr:[]},
    snow:{g:['#f4f8fb','#9aaa70',0],p:[['ed_reeds_dry','w',0.35,1,4],['ed_frozen_puddle','w',0.2],['ed_snow_drift','e',0.4],['ed_ice_shards','e',0.25,1],['ed_snow_rock','e',0.25,1],['ed_snow_pine','l',0.3,1],['ed_tuft_dry','w',0.3,0,5]],cr:['ed_crow']}};
  var place='lake', IMG=null, cache={};
  var get=function(r){ var row=ROWS.filter(function(R){ return R[0]===r; })[0], ch=row[2].filter(function(o){ return LBR.picked('tpieces','look_'+r+'_'+o[0]); })[0]||row[2].filter(function(o){ return o[4]; })[0]; return ch; };
  var look=function(over){ var o={}; ROWS.forEach(function(R){ o[R[0]]=get(R[0])[3]; }); if(over)o[over[0]]=over[1]; return o; };
  // a small value noise (the game uses its own; the shape of the result is what matters here)
  var hsh=function(x,y,s){ var n=(x*374761393+y*668265263+(s||0)*1442695041)|0; n=(n^(n>>>13))*1274126177|0; return ((n^(n>>>16))>>>0)/4294967296; };
  var vn=function(x,y,s){ var X=Math.floor(x), Y=Math.floor(y), fx=x-X, fy=y-Y, u=fx*fx*(3-2*fx), v=fy*fy*(3-2*fy); var a=hsh(X,Y,s), b=hsh(X+1,Y,s), c=hsh(X,Y+1,s), d=hsh(X+1,Y+1,s); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; };
  // the edge between land (above) and the other side (below), y at x, for a W×H preview
  var edgeY=function(x,W,H){ return H*0.56+Math.sin(x/W*6.1+0.7)*H*0.07+Math.sin(x/W*15.3)*H*0.025; };
  // where the pieces go, for one setting: [{id,x,y,h,tall,sw,r}] sorted by foot
  var layout=function(L,W,H){ var key=place+JSON.stringify(L)+W, c=cache[key]; if(c)return c; var S=SC[place], out=[], used={};
    for(var y=8;y<H;y+=4)for(var x=4;x<W-4;x+=4){ var ey=edgeY(x,W,H), d=y-ey, zone=d>0&&d<30?'w':d<=0&&d>-22?'e':d<=-22&&d>-78?'l':null; if(!zone)continue;
      var h0=hsh(x,y,3), cl=L.clump?(1-L.clump)+L.clump*2.2*Math.pow(Math.max(0,Math.min(1,(vn(x/52,y/52,9)-0.3)/0.45)),2)*(3-2*Math.max(0,Math.min(1,(vn(x/52,y/52,9)-0.3)/0.45))):1;
      var cand=S.p.filter(function(p){ return p[1]===zone; }); if(!cand.length)continue; var nf=function(p,i){ return vn(x/150+i*3.7,y/150-i*1.3,17); };
      var best=null, bv=-1; cand.forEach(function(p,i){ var v=nf(p,i); if(v>bv){ bv=v; best=p; } });
      var wts=cand.map(function(p,i){ var v=nf(p,i); return p[2]*(L.vary==='all'?1:L.vary==='one'?(p===best?1.6:0.04):0.25+2.2*v*v); }), tot=wts.reduce(function(a,b){ return a+b; },0)*0.022*L.dens*cl;
      if(h0>=tot)continue; var acc=0, pick=null; for(var i=0;i<cand.length;i++){ acc+=wts[i]*0.022*L.dens*cl; if(h0<acc){ pick=cand[i]; break; } } if(!pick)continue;
      var R=TP_ITEMS[pick[0]]; if(!R)continue; var g0=Math.max(18,R[2]*0.32)/Math.sqrt(L.dens), gk=Math.floor(x/g0)+'_'+Math.floor(y/g0); if(used[gk])continue; used[gk]=1;
      var r=hsh(x,y,5); out.push({id:pick[0],x:x,y:y,h:R[3]*0.5*0.75*(1+L.size*(2*r-1)),w:R[2]*0.5*0.75*(1+L.size*(2*r-1)),tall:!!pick[3],sw:pick[4]||0,r:r}); }
    out.sort(function(a,b){ return a.y-b.y; }); if(Object.keys(cache).length>80)cache={}; return (cache[key]=out); };
  var hero=function(c,x,y,a){ c.save(); c.globalAlpha=a; c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x,y,11,4,0,0,6.3); c.fill();
    c.fillStyle='#1c1622'; c.fillRect(x-8,y-30,16,26); c.fillStyle='#2f9e8e'; c.fillRect(x-7,y-29,14,22); c.fillStyle='#6a4a2c'; c.fillRect(x-7,y-9,5,8); c.fillRect(x+2,y-9,5,8);
    c.fillStyle='#1c1622'; c.beginPath(); c.arc(x,y-38,10,0,6.3); c.fill(); c.fillStyle='#f0c8a0'; c.beginPath(); c.arc(x,y-38,8.5,0,6.3); c.fill(); c.fillStyle='#c0682a'; c.beginPath(); c.arc(x,y-42,8.5,Math.PI,0); c.fill(); c.restore(); };
  var draw=function(cv,c,W,H,t,id){ var m=/^look_(\w+?)_(\w+)$/.exec(id); if(!m)return; var row=ROWS.filter(function(R){ return R[0]===m[1]; })[0], opt=row&&row[2].filter(function(o){ return o[0]===m[2]; })[0]; if(!opt)return;
    var sc=Math.min(W/400,H/225); c.save(); c.scale(sc,sc); W=W/sc; H=H/sc; var S=SC[place], L=look([m[1],opt[3]]), G=S.g;
    c.fillStyle=G[0]; c.fillRect(0,0,W,H); c.fillStyle=G[1]; c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=6)c.lineTo(x,edgeY(x,W,H)); c.lineTo(W,H); c.closePath(); c.fill();
    c.strokeStyle='rgba(20,16,10,.5)'; c.lineWidth=2.5; c.beginPath(); for(x=0;x<=W;x+=6)c[x?'lineTo':'moveTo'](x,edgeY(x,W,H)); c.stroke(); if(G[2]){ c.strokeStyle='rgba(255,255,255,'+(0.35+0.2*Math.sin(t*1.6))+')'; c.lineWidth=2; c.beginPath(); for(x=0;x<=W;x+=6)c[x?'lineTo':'moveTo'](x,edgeY(x,W,H)+3+Math.sin(t*1.6)*1.5); c.stroke(); }
    if(!IMG||!IMG.complete||!IMG.naturalWidth){ c.restore(); return; }
    var P=layout(L,W,H), hx=((t*26)%(W+60))-30, hy=edgeY(hx,W,H)-12, drawn=false, amp=L.sway>=2?1.9:1;
    var one=function(p){ var R=TP_ITEMS[p.id], hid=false; c.save(); c.globalAlpha=hid?0.5:1; c.translate(p.x,p.y);
      if(L.sway&&p.sw){ var w=0.65*Math.sin(t*1.6+p.x*0.012*4+p.y*0.005*4+p.r*0.8)+0.35*Math.sin(t*0.55+p.x*0.016); if(L.sway>=2)w+=0.6*Math.pow(Math.max(0,Math.sin(t*0.4+p.x*0.012)),3); c.rotate(w*amp*p.sw*Math.PI/180); }
      c.drawImage(IMG,R[0],R[1],R[2],R[3],-p.w/2,-p.h,p.w,p.h); c.restore(); };
    P.forEach(function(p){ if(!drawn&&p.y>hy){ hero(c,hx,hy,1); drawn=true; } one(p); }); if(!drawn)hero(c,hx,hy,1);
    // creatures: how many depends on the row's setting
    var nc=Math.round(3*L.crit); for(var i=0;i<nc&&S.cr.length;i++){ var cid=S.cr[i%S.cr.length], R=TP_ITEMS[cid]; if(!R)continue; var ph=i*2.3, cx=((t*(14+i*5)+i*97)%(W+40))-20, cy=(cid==='ed_gull'||cid==='ed_crow')?30+i*17+Math.sin(t+ph)*6:edgeY(cx,W,H)+(cid==='ed_crab'||cid==='ed_frog'?-6:-34)+Math.sin(t*3+ph)*6, k=0.5*0.8;
      if(cid==='ed_firefly'){ var gg=c.createRadialGradient(cx,cy,0,cx,cy,14); gg.addColorStop(0,'rgba(220,255,140,.5)'); gg.addColorStop(1,'rgba(220,255,140,0)'); c.fillStyle=gg; c.beginPath(); c.arc(cx,cy,14,0,6.3); c.fill(); }
      // wings: flyers face their way and beat their wings (narrowed and widened, as the game does until the painted frames are in)
      var fly={ed_gull:[0.55,5],ed_crow:[0.55,7],ed_butterfly:[0.22,16],ed_dragonfly:[0.82,45],ed_firefly:[0.6,12]}[cid], ax=fly?0.22+0.78*Math.abs(Math.cos(t*fly[1]+ph)):1; if(fly)ax=fly[0]+(1-fly[0])*Math.abs(Math.cos(t*fly[1]+ph));
      c.save(); c.translate(cx,cy); if(fly)c.rotate(Math.PI/2+Math.sin(t*1.7+ph)*(cid==='ed_butterfly'?0.5:0.15)); c.scale(ax,1); c.drawImage(IMG,R[0],R[1],R[2],R[3],-R[2]*k/2,-R[3]*k/2,R[2]*k,R[3]*k); c.restore(); }
    c.restore(); };
  var html=function(){ if(!IMG){ IMG=new Image(); IMG.onerror=function(){ if(!IMG._b){ IMG._b=1; IMG.src='../assets/scenery/edges-0.webp'; } }; IMG.src='edges-0.webp'; }
    var j=0; return '<div class="tl-places">Show: '+Object.keys(PLACES).map(function(p){ return '<button class="vbtn tl-pl'+(p===place?' on':'')+'" data-p="'+p+'">'+PLACES[p]+'</button>'; }).join('')+'</div>'+
      ROWS.map(function(R){ var cur=get(R[0]); return '<h4 class="tl-row">'+R[1]+'<span>'+(R[2].some(function(o){ return LBR.picked('tpieces','look_'+R[0]+'_'+o[0]); })?'your pick: '+cur[1]:'not picked yet — the game uses '+cur[1])+'</span></h4><div class="br-grid tl-grid">'+
        R[2].map(function(o){ return LBR.card('tpieces',{id:'look_'+R[0]+'_'+o[0],name:o[1],desc:o[2]},j++,400,225,o[4]?'<span class="bb-m" style="color:#7fe0a0;border-color:#7fe0a0">recommended</span>':''); }).join('')+'</div>'; }).join(''); };
  // picking a card clears the other cards of its row (this runs after the card's own ☆ Pick handler, 53-lab-brand)
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.br-pick'), a=b&&b.closest('.br-card'); if(!a||a.dataset.tab!=='tpieces')return; var m=/^look_(\w+?)_(\w+)$/.exec(a.dataset.id); if(!m)return;
    if(LBR.picked('tpieces',a.dataset.id)){ var row=ROWS.filter(function(R){ return R[0]===m[1]; })[0]; row[2].forEach(function(o){ var k='tpieces-look_'+m[1]+'_'+o[0]; if(o[0]!==m[2]&&LBR.picked('tpieces','look_'+m[1]+'_'+o[0])){ LabApp.picks[k].verdict=null; LabApp.persist(k); } }); }
    LBR.refresh(); cache={}; document.querySelectorAll('.tl-row').forEach(function(h,i){ var R=ROWS[i], cur=get(R[0]); h.querySelector('span').textContent=R[2].some(function(o){ return LBR.picked('tpieces','look_'+R[0]+'_'+o[0]); })?'your pick: '+cur[1]:'not picked yet — the game uses '+cur[1]; }); });
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.tl-pl'); if(!b)return; place=b.dataset.p; cache={}; document.querySelectorAll('.tl-pl').forEach(function(x){ x.classList.toggle('on',x.dataset.p===place); }); });
  (function(){ var st=document.createElement('style'); st.textContent='.tl-places{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0 4px;color:#9fb3cc}.tl-pl.on{border-color:var(--pick);color:var(--pick)}.tl-row{margin:16px 0 6px;color:#cfe0f4}.tl-row span{margin-left:12px;font-weight:400;font-size:12px;color:#8fa6c2}.tl-grid{grid-template-columns:repeat(auto-fill,minmax(330px,1fr))}'; document.head.appendChild(st); })();
  return {ROWS:ROWS,SC:SC,html:html,draw:draw,layout:layout,look:look,get:get,setPlace:function(p){ place=p; cache={}; }};
})();
(function(){ if(!TPLOOK||!LBR.drawers.tpieces)return; var d0=LBR.drawers.tpieces;
  LBR.drawers.tpieces=function(cv,c,W,H,t,full,id){ if(/^look_/.test(id))return TPLOOK.draw(cv,c,W,H,t,id); return d0.apply(this,arguments); }; })();
