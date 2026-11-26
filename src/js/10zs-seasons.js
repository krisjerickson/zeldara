// ═══════════════════════════════════════════════════════════════════════
// ║ 10zs-seasons.js — round 115: THE SEASONS (Kris ✓ holistic, without the twins' winter mantle; doc 69, Lab "Seasons: the cost").
// ║ Kris's order: a long mild winter before the game (the opening) → a mild spring as you set out (the Grasslands) → summer when the
// ║ Wetlands open → autumn with the Highlands → a mild winter with the Ashlands → the real spring when Freya is free. "make the winter not
// ║ overly snowy". The season is worked out from your progress (nothing new in the save but the seasons you have seen).
// ║ What turns, today (code — the painted seasonal pictures replace it as they come in, wave by wave):
// ║  · the ground: each green kind of ground (grass, meadow, moss, heath, marsh, crops, soil) takes the season's colour (WK_REG _a/_b), in
// ║    the main thread and in the painting workers alike; the painted ground marks swap to their seasonal sheet when it is in
// ║  · trees, bushes, flowers and edge pieces: their painted seasonal picture (<id>_sp/_au/_wi) when it is in, else the painted one tinted
// ║  · the air: petals and pollen, fireflies on summer nights, falling leaves, frost glitter and a rare thin flurry (never a snowstorm)
// ║  · the turn: a banner, a mark by the little map, Elder Runa's lesson (21t); the world repaints once
// ║  · each season's paintings load only when it comes (pages seas_<s>-N, textures *_<s>)
// ║ Round 127 (Kris: separate the first spring from Freya's): sp is THE THAW — muted, its own paintings (_th) — and bl, Freya's spring, takes
// ║ the lush spring paintings (_sp). Requests: 07zt19.
// ║ Switch: ZSEASON.on. ?season=au (sp su au wi bl) forces one, for looking.
// ═══════════════════════════════════════════════════════════════════════
var ZSEASON={ on:true, cur:'su', force:null, _t:0, loaded:{},
  S:{sp:{n:'The thaw',ic:'🌱',col:'#c8dcb0',art:'th',ban:['The thaw','The first spring in twenty-eight years — grey snow in the shadows, buds on the birches, the first birds back.']},
     su:{n:'Summer',ic:'☀️',col:'#ffe27a',art:null,ban:['Summer','The Silverrun runs clear, and the nights are warm.']},
     au:{n:'Autumn',ic:'🍂',col:'#ffb46a',art:'au',ban:['Autumn','The leaves turn gold along the Highlands\' road.']},
     wi:{n:'Winter',ic:'❄️',col:'#d8ecff',art:'wi',ban:['Winter','A mild one — frost on the grass and bright, low sun.']},
     bl:{n:'Freya\'s spring',ic:'🌸',col:'#ffd0e4',art:'sp',ban:['Freya\'s spring','The land bursts into flower — blossom runs out along the soul-lines.']}},
  ORDER:['sp','su','au','wi','bl'],
  // which season your progress is in: the realm furthest open, and Freya's spring once the spirits are home
  of:function(ps){ if(ZSEASON.force)return ZSEASON.force; if(!ps)return 'sp'; if(ps.spiritsHome)return 'bl'; var u=ps.unlockedSections||[1], m=Math.max.apply(null,u.concat([1])); return ['sp','sp','su','au','wi'][Math.min(4,m)]||'wi'; },
  // ── the ground's colour ──
  VEGK:{grass:1,meadow:1,verge:1,land:1,turf:1,green:1,isle:1,wild:1,vgrass:1,vgreen:1,garden:1,moss:1,heath:1,heather:1,marsh:1,crop:1,soil:1,vsoil:1},
  // [hue shift (degrees), saturation ×, lightness +, blue +]: spring fresh and light, autumn gold, winter pale and frosted (no white-out)
  G:{sp:[14,0.62,0.01,5],au:[-52,1.0,-0.02,-6],wi:[-8,0.42,0.07,7],bl:[6,1.08,0.03,0]},      /* winter: frost, not snow (Kris: "not overly snowy") */
  grade:function(c,s){ var g=ZSEASON.G[s]; if(!g||!c)return c; var r=c[0]/255, gg=c[1]/255, b=c[2]/255, mx=Math.max(r,gg,b), mn=Math.min(r,gg,b), h=0, sa=0, l=(mx+mn)/2, d=mx-mn;
    if(d){ sa=l>0.5?d/(2-mx-mn):d/(mx+mn); h=mx===r?(gg-b)/d+(gg<b?6:0):mx===gg?(b-r)/d+2:(r-gg)/d+4; h*=60; }
    h=(h+g[0]+360)%360; sa=Math.max(0,Math.min(1,sa*g[1])); l=Math.max(0,Math.min(1,l+g[2]));
    var q=l<0.5?l*(1+sa):l+sa-l*sa, p=2*l-q, f=function(t){ t=(t+1)%1; return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p; }, H=h/360;
    var out=[f(H+1/3)*255,f(H)*255,f(H-1/3)*255]; out[2]=Math.min(255,out[2]+g[3]); if(g[3]<0){ out[0]=Math.min(255,out[0]-g[3]*0.6); }
    return out.map(function(v){ return Math.max(0,Math.min(255,Math.round(v))); }); },
  kinds:function(){ if(typeof WK_REG==='undefined')return; var s=ZSEASON.on?ZSEASON.cur:'su';
    WK_REG.list.forEach(function(k){ if(!ZSEASON.VEGK[k.id])return; if(!k._a0){ k._a0=k._a; k._b0=k._b; }
      k._a=s==='su'?k._a0:ZSEASON.grade(k._a0,s); k._b=s==='su'?k._b0:ZSEASON.grade(k._b0,s); k._avg=null; });
    if(typeof WP_KT!=='undefined'&&WP_KT&&typeof _wpKindTables==='function'){ WP_KT=null; _wpKindTables(); } },      /* the painter's colour tables (05c) are made again from them, at once (a chunk being painted still needs one) */
  // ── trees, bushes, flowers, edge pieces: their seasonal painting when it is in, else tinted ──
  VEGID:/^(tr_(round|blossom|willow|mangrove_a|cypress|pine_a|pine_b|drowned)|pl_(bush|bush_berry|bush_flower|flowers|tuft|tallgrass|fern|reeds|cattails|lilypad|heather|vine|wheat|corn|crop|hedge|topiary|trellis)|ed_(tuft_a|tuft_b|reeds|cattails|cliff_grass|log_mossy|rock_mossy|wildflowers|iris|ivy|moss_patch|clover|fern|bramble|heather|dune_grass|alpine_flowers|lily))/,
  F:{sp:'saturate(0.62) sepia(0.12) hue-rotate(8deg) brightness(1.0)',au:'sepia(0.4) hue-rotate(-34deg) saturate(1.3) brightness(0.97)',wi:'saturate(0.42) brightness(1.09) contrast(0.95)',bl:'saturate(1.1) brightness(1.03)'},
  /* round 129 (Kris, Lab › The five seasons, autumn: "we need to make sure that no evergreen trees and shrubs turn orange"): in autumn the evergreens keep their summer green */
  EVER:/^(pl_(hedge|topiary)|ed_(ivy|moss_patch))/,      /* round 131: the pines and mangroves were painted again green (07zt24) — the autumn pieces are used now */
  item:function(id){ var s=ZSEASON.cur; if(!ZSEASON.on||s==='su'||/_(sp|au|wi|th)$/.test(id))return null; if(s==='au'&&ZSEASON.EVER.test(id))return null; var A=ZSEASON.S[s].art;
    if(A&&typeof ZScn!=='undefined'&&ZScn.has(id+'_'+A))return {id:id+'_'+A};      /* round 118: anything with a seasonal painting uses it (wave S2: the village's buildings and props) */
    if(!ZSEASON.VEGID.test(id))return null; return {id:id,f:ZSEASON.F[s]}; },
  // the painted ground marks: the seasonal sheet's when it is in
  TEX:/^tx_(grass|grass_wild|grass_village|moss|heath|marsh|dirt|mud|soil)$/,
  tex:function(id){ var A=ZSEASON.on&&ZSEASON.S[ZSEASON.cur]&&ZSEASON.S[ZSEASON.cur].art; if(!A||!ZSEASON.TEX.test(id)||typeof ZScn==='undefined')return id; var a=id+'_'+A; return ZScn.timg[a]?a:id; },
  set:function(s){ if(!ZSEASON.S[s])s='su'; ZSEASON.cur=s; ZSEASON.kinds(); },
  // ── this season's paintings, loaded only when it comes ──
  loadArt:function(after){ var A=ZSEASON.S[ZSEASON.cur]&&ZSEASON.S[ZSEASON.cur].art; if(!A||typeof ZScn==='undefined'||typeof Image==='undefined'||ZSEASON.loaded[A]){ if(after)after(false); return; } ZSEASON.loaded[A]=1;
    var M=ZScn.META, L=[], n=0; (M.pages||[]).forEach(function(p){ if(p.indexOf('seas_'+A+'-')===0)L.push([ZScn.img,p,ZScn.BASE+p+'.webp']); }); Object.keys(M.tex||{}).forEach(function(t){ if(new RegExp('_'+A+'$').test(t))L.push([ZScn.timg,t,ZScn.BASE+M.tex[t].file]); });
    if(!L.length){ if(after)after(false); return; }
    L.forEach(function(e){ var im=new Image(); im.onload=function(){ e[0][e[1]]=im; if(++n===L.length&&after)after(true); }; im.onerror=function(){ if(++n===L.length&&after)after(true); }; im.src=e[2]; }); },
  // ── the world repaints once (as when late scenery arrives, 10c) ──
  repaint:function(ws){ try{ if(!ws||!ws._wr||typeof ZScn==='undefined')return; if(ws.wd)ws.wd.baseVer=(ws.wd.baseVer||0)+1;      /* the little map and the world map redraw their colours (21-ui _wmBase) */
      ZScn._lateV=(ZScn._lateV||0)+1; ZScn._sc={}; ZScn._scq=[]; ZScn._pat={}; if(typeof _WPC!=='undefined')_WPC={};
      if(typeof ZWP!=='undefined'&&ZWP.sendImgs)ZWP.sendImgs(); var K=[]; ws._wr.chunks.forEach(function(c,k){ K.push(k); }); if(ws._wr.parked)ws._wr.parked.forEach(function(c,k){ K.push(k); });
      /* round 116: a chunk still being painted, or painted but not yet shown, would come out in the old season (a green strip at the edge in autumn): paint those again too */
      ws._wr.jobs.forEach(function(J,k){ if(K.indexOf(k)<0)K.push(k); }); (ws._wr.ready||[]).forEach(function(R){ if(K.indexOf(R.key)<0)K.push(R.key); }); if(ws._wr.ready)ws._wr.ready.length=0;
      K.forEach(function(k){ var p=k.split('_'); ws._refreshChunkAt(+p[0]*WCH,+p[1]*WCH); }); ZSEASON._rn=K.length; }catch(e){ console.warn('season repaint',e); } },
  // the world starts in its season (before the first chunk is painted: WorldScene.create calls this)
  init:function(ws){ var ps=ws&&ws.playerState; ZSEASON.set(ZSEASON.of(ps)); if(ps){ var Sn=ps.seasonsSeen||(ps.seasonsSeen=[]); if(Sn.indexOf(ZSEASON.cur)<0)Sn.push(ZSEASON.cur); }
    ZSEASON.loadArt(function(got){ if(got)ZSEASON.repaint(ws); }); ZSEASON.hud(); },
  turn:function(ws,s){ var ps=ws.playerState, was=ZSEASON.cur; ZSEASON.set(s); var Sn=ps.seasonsSeen||(ps.seasonsSeen=[]), first=Sn.indexOf(s)<0; if(first)Sn.push(s);
    ZSEASON.repaint(ws); ZSEASON.loadArt(function(got){ if(got)ZSEASON.repaint(ws); }); ZSEASON.hud(); ZSEASON.air(ws,true);
    if(first&&was&&typeof ZJOUR!=='undefined'&&ZJOUR.banner){ var B=ZSEASON.S[s].ban; ZJOUR.banner(ZSEASON.S[s].ic+' '+B[0],B[1]); } },
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  tick:function(){ try{ if(!ZSEASON.on)return; var ws=ZSEASON.ws(); if(!ws||!ws.playerState||!ws.player||!ws._wr)return; var s=ZSEASON.of(ws.playerState);
      if(s!==ZSEASON.cur)ZSEASON.turn(ws,s); ZSEASON.air(ws); ZSEASON.hud(); }catch(e){ if(!ZSEASON._e){ ZSEASON._e=1; console.warn('seasons',e); } } },
  // ── the mark by the little map ──
  hud:function(){ if(typeof document==='undefined'||!document.getElementById)return; var host=document.getElementById('minimap-hud'); if(!host)return; var el=document.getElementById('zseason');
    if(!el){ el=document.createElement('div'); el.id='zseason'; el.style.cssText='position:absolute;left:6px;top:6px;font:600 11px "Segoe UI",sans-serif;padding:1px 7px;border-radius:9px;background:rgba(5,8,15,.62);pointer-events:none;letter-spacing:.02em'; host.appendChild(el); }
    var S=ZSEASON.S[ZSEASON.cur]; if(el._s!==ZSEASON.cur){ el._s=ZSEASON.cur; el.textContent=S.ic+' '+S.n; el.style.color=S.col; } el.style.display=ZSEASON.on?'':'none'; },
  // ── the air: what drifts past in each season ──
  tex2:function(sc){ var mk=function(k,w,h,f){ if(sc.textures.exists(k))return; var c=document.createElement('canvas'); c.width=w; c.height=h; f(c.getContext('2d')); sc.textures.addCanvas(k,c); };
    mk('zs_petal',10,8,function(x){ x.fillStyle='#ffd6e6'; x.beginPath(); x.ellipse(5,4,4.5,2.6,0.4,0,Math.PI*2); x.fill(); x.fillStyle='rgba(255,255,255,.7)'; x.beginPath(); x.ellipse(4,3.4,2,1.1,0.4,0,Math.PI*2); x.fill(); });
    mk('zs_leaf',12,8,function(x){ x.fillStyle='#ffffff'; x.beginPath(); x.moveTo(1,4); x.quadraticCurveTo(6,-1,11,4); x.quadraticCurveTo(6,9,1,4); x.fill(); x.strokeStyle='rgba(0,0,0,.25)'; x.beginPath(); x.moveTo(2,4); x.lineTo(10,4); x.stroke(); });
    mk('zs_flake',6,6,function(x){ var g=x.createRadialGradient(3,3,0,3,3,3); g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(1,'rgba(255,255,255,0)'); x.fillStyle=g; x.fillRect(0,0,6,6); }); },
  AIR:{sp:{tex:'zs_flake',freq:1500,tint:[0xe8ece0,0xd8dccc,0xf0f0e8],grav:6,speedX:[-10,-3],life:8000,scale:[0.5,0.8]},      /* round 127: the thaw — a few drifting catkin seeds, no petals yet */
       su:{tex:'dot',freq:900,tint:[0xfff6a0,0xc8ff90],grav:-4,speedX:[-6,6],life:5000,scale:[0.5,0.9],night:true,add:true},
       au:{tex:'zs_leaf',freq:260,tint:[0xe8a030,0xd06a20,0xb84a1c,0xf0c040,0x9a5a28],grav:22,speedX:[-24,-8],life:7000,scale:[0.8,1.3],spin:true},
       wi:{tex:'zs_flake',freq:1600,tint:[0xffffff,0xe8f4ff],grav:16,speedX:[-10,-2],life:8000,scale:[0.5,0.9]},
       bl:{tex:'zs_petal',freq:200,tint:[0xffd6e6,0xffffff,0xfff0a8,0xe8c8ff],grav:10,speedX:[-16,-4],life:8000,scale:[0.8,1.3]}},
  air:function(ws,remake){ if(!ws||!ws.add||typeof ws.add.particles!=='function')return; var s=ZSEASON.cur, A=ZSEASON.AIR[s];
    var night=typeof ZTWIN!=='undefined'&&ZTWIN.night?ZTWIN.night(ws):false, want=ZSEASON.on&&A&&(!A.night||night)&&!(ws.wd&&ws.wd.islKey);
    if(ws._zsAir&&(remake||!want||ws._zsAir._s!==s)){ try{ ws._zsAir.destroy(); }catch(e){} ws._zsAir=null; }
    if(!want||ws._zsAir)return; ZSEASON.tex2(ws); if(!ws.textures.exists(A.tex))return; var cam=ws.cameras.main;
    try{ var e=ws.add.particles(0,0,A.tex,{emitZone:{type:'random',source:{getRandomPoint:function(p){ var v=cam.worldView; p.x=v.x+Math.random()*(v.width+200)-40; p.y=v.y-20+Math.random()*(A.night?v.height:v.height*0.35); return p; }}},
        lifespan:A.life,frequency:A.freq,quantity:1,speedX:{min:A.speedX[0],max:A.speedX[1]},speedY:{min:4,max:14},gravityY:A.grav,scale:{min:A.scale[0],max:A.scale[1]},rotate:A.spin?{min:0,max:360}:0,
        alpha:A.night?{start:0.9,end:0,ease:'Sine.easeIn'}:{start:0.95,end:0},tint:A.tint,blendMode:A.add?'ADD':'NORMAL'});
      e.setDepth(9000); e._s=s; ws._zsAir=e; ws.events.once('shutdown',function(){ ws._zsAir=null; }); }catch(er){ if(!ZSEASON._ea){ ZSEASON._ea=1; console.warn('season air',er); } } }
};
// ?season=au — for looking at a season without playing to it
try{ var _zsq=typeof location!=='undefined'&&/[?&]season=(sp|su|au|wi|bl)/.exec(location.search); if(_zsq)ZSEASON.force=_zsq[1]; }catch(e){}
// the hooks: trees and plants drawn in their season; ground marks from the seasonal sheet
if(typeof ZScn!=='undefined'){
  (function(){ var d0=ZScn.draw; ZScn.draw=function(ctx,id,cx,fy,h,o){ var m=ZSEASON.item(id); if(!m)return d0.apply(ZScn,arguments);
      if(m.f&&ctx&&('filter' in ctx)){ ctx.save(); ctx.filter=m.f; try{ return d0.call(ZScn,ctx,m.id,cx,fy,h,o); }finally{ ctx.restore(); } } return d0.call(ZScn,ctx,m.id,cx,fy,h,o); };
    var t0=ZScn.tile; ZScn.tile=function(id,px){ return t0.call(ZScn,ZSEASON.tex(id),px); }; })();
}
// a kind of ground registered after the season was set takes its colour too
if(typeof _wkReg==='function'){ (function(){ var r0=_wkReg; _wkReg=function(k){ var fresh=k._gi===undefined, i=r0(k); if(fresh&&ZSEASON.VEGK[k.id]&&ZSEASON.cur!=='su'&&ZSEASON.on){ k._a0=k._a; k._b0=k._b; k._a=ZSEASON.grade(k._a0,ZSEASON.cur); k._b=ZSEASON.grade(k._b0,ZSEASON.cur); } return i; }; })(); }
if(typeof ZWP_IN_WORKER==='undefined')setInterval(ZSEASON.tick,1500);
