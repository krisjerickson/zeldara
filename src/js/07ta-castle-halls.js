// ═══════════════════════════════════════════════════════════════════════
// ║ CASTLE HALLS (round 5) — the island castles are no longer bright
// ║ towers: dark stone keeps lit by torches and braziers, with castle
// ║ floor plans of their own:
// ║   gatehouse · great hall (feast tables, hearth) · round chapel
// ║   (stained glass, mosaic, saints) · armoury · sculpture gallery ·
// ║   crypt · throne room (dais, royal carpet, knights' armour).
// ║ Banners, torches and shields hang on the walls; epic stone knights,
// ║ dragons and saints stand in the halls. Every castle keeps its own
// ║ colours, heraldry and weather.
// ═══════════════════════════════════════════════════════════════════════
// ── floor plans (interior tiles; the builder adds a 2-tile margin) ──
Object.assign(TOWER_PLANS,{
  castle_gate:{ w:36,h:25, name:'Gatehouse (barracks, armoury, statue hall)',
    rooms:[{x:1,y:1,w:10,h:11,type:'barracks'},{x:12,y:1,w:12,h:11,type:'sculpture'},{x:25,y:1,w:10,h:11,type:'armory'},
           {x:1,y:13,w:8,h:11,type:'cellar'},{x:10,y:13,w:16,h:11,type:'gatehouse'},{x:27,y:13,w:8,h:11,type:'trophy'}],
    carve:[[11,5,1,2],[24,5,1,2],[17,12,2,1],[4,12,2,1],[30,12,2,1],[9,17,1,2],[26,17,1,2]],
    entry:[17,24], stairs:[18,3] },
  castle_hall:{ w:38,h:27, name:'Great hall (feast tables and a great hearth)',
    rooms:[{x:1,y:1,w:6,h:11,type:'kitchen'},{x:1,y:13,w:6,h:12,type:'chapel'},{x:8,y:1,w:22,h:19,type:'greathall'},
           {x:31,y:1,w:6,h:11,type:'armory'},{x:31,y:13,w:6,h:12,type:'barracks'},{x:13,y:21,w:12,h:5,type:'hall'}],
    carve:[[7,5,1,2],[7,16,1,2],[30,5,1,2],[30,16,1,2],[18,20,2,1]],
    entry:[18,26], stairs:[27,3] },
  castle_chapel:{ w:36,h:27, name:'Round chapel (stained glass and saints)',
    rooms:[{x:9,y:1,w:18,h:19,type:'roundchapel',shape:'circle'},
           {x:1,y:1,w:7,h:11,type:'library'},{x:28,y:1,w:7,h:11,type:'reliquary'},{x:1,y:13,w:7,h:12,type:'crypt'},{x:28,y:13,w:7,h:12,type:'sculpture'},
           {x:13,y:21,w:10,h:5,type:'hall'}],
    carve:[[8,9,2,2],[26,9,2,2],[17,20,2,1],[4,12,2,1],[31,12,2,1],[8,22,5,1],[23,22,5,1]],
    entry:[17,26], stairs:[18,17] },
  castle_throne:{ w:36,h:27, name:'Throne room (dais, carpet and knights)',
    rooms:[{x:1,y:1,w:6,h:20,type:'sculpture'},{x:8,y:1,w:20,h:20,type:'throneroom'},{x:29,y:1,w:6,h:20,type:'trophy'},{x:12,y:22,w:12,h:4,type:'hall'}],
    carve:[[7,8,1,2],[7,15,1,2],[28,8,1,2],[28,15,1,2],[17,21,2,1]],
    entry:[17,26], stairs:[18,6] }
});
Object.assign(ROOM_NOTES,{ gatehouse:'Gatehouse — the castle\'s entrance hall, guarded by stone knights.', barracks:'Barracks — bunks, weapon racks and the guards\' table.', armory:'Armoury — racks of swords, axes and shields, suits of armour.',
  sculpture:'Statue gallery — epic stone knights and dragons.', cellar:'Cellar — barrels and casks.', trophy:'Trophy hall — shields, banners and a great sword.', kitchen:'Kitchen — a roaring hearth and the cooks\' tables.',
  greathall:'Great hall — long feast tables under the banners, a hearth you could stand in.', roundchapel:'Round chapel — stained glass, a rose mosaic and carved saints.', reliquary:'Reliquary — relics on altars, candles everywhere.',
  crypt:'Crypt — stone coffins of the castle\'s old lords.', throneroom:'Throne room — a royal carpet leads to the warden\'s throne.' });
var CASTLE_FLOORS={1:['castle_throne'],2:['castle_hall','castle_throne'],3:['castle_hall','castle_chapel','castle_throne'],4:['castle_gate','castle_hall','castle_chapel','castle_throne'],5:['castle_gate','castle_hall','castle_chapel','castle_hall','castle_throne']};

// ── furnishing the castle rooms ──
var TOWER_FURNISH={
  greathall:function(F){ var tl=Math.min(10,F.rw-8), x0=F.rx+3; [F.ry+5,F.ry+11].forEach(function(ty){ if(ty+1>=F.ry+F.rh-1)return; F.tryPlace('banquet',x0,ty,tl,2,F.ri); for(var c=0;c<tl;c+=2){ F.tryPlace('bench_long',x0+c,ty-1,2,1,F.ri,false); F.tryPlace('bench_long',x0+c,ty+2,2,1,F.ri,false); } });
    F.tryPlace('hearth',F.cx-2,F.ry,4,1,F.ri); F.tryPlace('great_torch',F.cx-4,F.ry,1,1,F.ri); F.tryPlace('great_torch',F.cx+3,F.ry,1,1,F.ri);
    for(var y=F.ry+2;y<F.ry+F.rh-2;y+=4){ F.tryPlace('pillar_massive',F.rx+1,y,1,1,F.ri); F.tryPlace('pillar_massive',F.rx+F.rw-2,y,1,1,F.ri); }
    F.tryPlace('royal_carpet',F.cx-1,F.ry+F.rh-4,2,4,F.ri,false); F.items.push({type:'chandelier',x:F.cx-2,y:F.ry+6,w:1,h:1,solid:false,room:F.ri}); F.items.push({type:'chandelier',x:F.cx+2,y:F.ry+12,w:1,h:1,solid:false,room:F.ri}); },
  roundchapel:function(F){ F.tryPlace('mosaic',F.cx-2,F.cy-1,5,5,F.ri,false); F.tryPlace('altar',F.cx-1,F.ry+1,2,1,F.ri); F.tryPlace('statue_saint',F.cx-3,F.ry+1,1,1,F.ri); F.tryPlace('statue_saint',F.cx+2,F.ry+1,1,1,F.ri);
    for(var r=0;r<3;r++){ var y=F.ry+4+r*2; F.tryPlace('pew',F.cx-6,y,3,1,F.ri); F.tryPlace('pew',F.cx+3,y,3,1,F.ri); }
    [[F.cx-6,F.cy+5],[F.cx+5,F.cy+5],[F.cx-7,F.cy],[F.cx+6,F.cy]].forEach(function(c){ F.tryPlace('candelabra',c[0],c[1],1,1,F.ri); }); },
  chapel:function(F){ F.tryPlace('altar',F.cx-1,F.ry,2,1,F.ri); for(var pr=F.ry+2;pr<F.ry+F.rh-1;pr+=2)F.tryPlace('pew',F.rx+1,pr,Math.max(2,F.rw-3),1,F.ri); F.tryPlace('candelabra',F.rx,F.ry,1,1,F.ri); F.tryPlace('candelabra',F.rx+F.rw-1,F.ry,1,1,F.ri); },
  armory:function(F){ F.alongNorth('weapon_rack',2,1,3); for(var y=F.ry+3;y<F.ry+F.rh-1;y+=3){ F.tryPlace('armor_stand',F.rx+1,y,1,1,F.ri); F.tryPlace('armor_stand',F.rx+F.rw-2,y,1,1,F.ri); }
    F.tryPlace('shield_rack',F.cx-1,F.ry+F.rh-2,2,1,F.ri); F.tryPlace('great_torch',F.cx,F.cy,1,1,F.ri); },
  barracks:function(F){ for(var x=F.rx+1;x+1<F.rx+F.rw-1;x+=3)F.tryPlace('bed',x,F.ry,1,2,F.ri); F.tryPlace('longtable',F.cx-1,F.cy+1,3,1,F.ri); F.tryPlace('chair',F.cx-2,F.cy+1,1,1,F.ri); F.tryPlace('chair',F.cx+2,F.cy+1,1,1,F.ri);
    F.tryPlace('weapon_rack',F.rx+1,F.ry+F.rh-1,2,1,F.ri); F.tryPlace('barrel',F.rx+F.rw-2,F.ry+F.rh-2,1,1,F.ri); },
  sculpture:function(F){ var kinds=['statue_knight','statue_dragon','statue_knight']; var k=0; for(var y=F.ry+1;y+1<F.ry+F.rh-1;y+=4){ F.tryPlace(kinds[k++%3],F.rx+(F.rw>7?1:F.rw/2-1|0),y,2,2,F.ri); if(F.rw>7)F.tryPlace(kinds[k++%3],F.rx+F.rw-3,y,2,2,F.ri); }
    F.tryPlace('royal_carpet',F.cx-1,F.ry,2,F.rh,F.ri,false); },
  cellar:function(F){ for(var y=F.ry;y<F.ry+F.rh;y+=2){ F.tryPlace('barrel',F.rx,y,1,1,F.ri); F.tryPlace('barrel',F.rx+F.rw-1,y,1,1,F.ri); } F.tryPlace('table',F.cx-1,F.cy,2,1,F.ri); },
  trophy:function(F){ F.tryPlace('great_sword',F.cx,F.cy-1,1,1,F.ri); for(var y=F.ry+1;y<F.ry+F.rh-1;y+=3){ F.tryPlace('armor_stand',F.rx,y,1,1,F.ri); F.tryPlace('shield_rack',F.rx+F.rw-2,y,2,1,F.ri); } },
  kitchen:function(F){ F.tryPlace('hearth',F.rx+1,F.ry,4,1,F.ri); F.tryPlace('longtable',F.rx+1,F.cy,3,1,F.ri); F.tryPlace('barrel',F.rx,F.ry+F.rh-1,1,1,F.ri); F.tryPlace('barrel',F.rx+F.rw-1,F.ry+F.rh-1,1,1,F.ri); },
  gatehouse:function(F){ F.tryPlace('royal_carpet',F.cx-1,F.ry,2,F.rh,F.ri,false); F.tryPlace('statue_knight',F.cx-4,F.ry+1,2,2,F.ri); F.tryPlace('statue_knight',F.cx+2,F.ry+1,2,2,F.ri);
    F.tryPlace('great_torch',F.cx-3,F.ry+F.rh-2,1,1,F.ri); F.tryPlace('great_torch',F.cx+2,F.ry+F.rh-2,1,1,F.ri); F.tryPlace('armor_stand',F.rx+1,F.cy,1,1,F.ri); F.tryPlace('armor_stand',F.rx+F.rw-2,F.cy,1,1,F.ri); },
  reliquary:function(F){ F.tryPlace('altar',F.cx-1,F.ry,2,1,F.ri); F.tryPlace('statue_saint',F.rx,F.ry+F.rh-2,1,1,F.ri); F.tryPlace('statue_saint',F.rx+F.rw-1,F.ry+F.rh-2,1,1,F.ri); F.corners('candelabra'); F.tryPlace('rug',F.cx-1,F.cy,3,3,F.ri,false); },
  crypt:function(F){ for(var y=F.ry+1;y<F.ry+F.rh-1;y+=3)F.tryPlace('sarcophagus',F.cx-1,y,2,1,F.ri); F.corners('candelabra'); },
  throneroom:function(F){ F.tryPlace('dais',F.cx-3,F.ry,7,4,F.ri,false); F.tryPlace('throne_big',F.cx-1,F.ry,3,2,F.ri); F.tryPlace('great_torch',F.cx-4,F.ry+1,1,1,F.ri); F.tryPlace('great_torch',F.cx+4,F.ry+1,1,1,F.ri);
    F.tryPlace('royal_carpet',F.cx-1,F.ry+4,3,F.rh-4,F.ri,false);
    for(var y=F.ry+7;y<F.ry+F.rh-1;y+=3){ F.tryPlace('armor_stand',F.cx-3,y,1,1,F.ri); F.tryPlace('armor_stand',F.cx+3,y,1,1,F.ri); F.tryPlace('pillar_massive',F.rx+1,y,1,1,F.ri); F.tryPlace('pillar_massive',F.rx+F.rw-2,y,1,1,F.ri); }
    F.tryPlace('statue_knight',F.rx+1,F.ry+1,2,2,F.ri); F.tryPlace('statue_knight',F.rx+F.rw-3,F.ry+1,2,2,F.ri); F.items.push({type:'chandelier',x:F.cx,y:F.ry+10,w:1,h:1,solid:false,room:F.ri}); }
};
// ── flat pieces (painted into the floor) ──
Object.assign(TOWER_FLAT,{
  banquet:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-2,w/2,10,0.4); ctx.fillStyle=shade(p.wood,-0.35); rr(ctx,x+1,y+3,w-2,h-2,4); ctx.fill(); ctx.fillStyle=shade(p.wood,-0.05); rr(ctx,x+2,y+1,w-4,h-6,4); ctx.fill();
    ctx.fillStyle=rgba(p.fabric2||'#e8dcc0',0.85); ctx.fillRect(x+6,y+h/2-7,w-12,10); ctx.fillStyle=rgba(p.fabric||'#8a2a2a',0.9); ctx.fillRect(x+6,y+h/2-7,w-12,2); ctx.fillRect(x+6,y+h/2+1,w-12,2);
    for(var i=0;i<w/LT;i++){ var px=x+16+i*LT; ctx.fillStyle='#d8d4c8'; ctx.beginPath(); ctx.ellipse(px,y+7,6,4,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(px,y+h-12,6,4,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=['#b0602a','#c8a040','#80a040','#a03030'][i%4]; ctx.beginPath(); ctx.ellipse(px,y+7,3.5,2.4,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#c8a860'; ctx.fillRect(px+8,y+h/2-5,3,5); ctx.fillStyle=i%3?'#e8d4a0':'#a0502a';
      if(i%2){ ctx.beginPath(); ctx.ellipse(px,y+h/2-2,7,4,0,0,Math.PI*2); ctx.fill(); } else { ctx.fillStyle='#f0e8c0'; ctx.fillRect(px-1,y+h/2-9,2,6); ctx.fillStyle='#ffd060'; ctx.fillRect(px-1,y+h/2-11,2,2); } } },
  bench_long:function(ctx,x,y,w,h,S){ var p=S.pal; ctx.fillStyle=shade(p.wood,-0.3); ctx.fillRect(x+2,y+12,w-4,9); ctx.fillStyle=shade(p.wood,-0.1); ctx.fillRect(x+2,y+11,w-4,4); },
  royal_carpet:function(ctx,x,y,w,h,S){ var p=S.pal, c=p.carpet||p.fabric||'#8a1a1a'; ctx.fillStyle=shade(c,-0.25); ctx.fillRect(x+3,y,w-6,h); ctx.fillStyle=c; ctx.fillRect(x+6,y,w-12,h); ctx.fillStyle=p.fabric2||'#e0c060'; ctx.fillRect(x+6,y,2,h); ctx.fillRect(x+w-8,y,2,h);
    for(var yy=y+10;yy<y+h;yy+=24){ ctx.save(); ctx.translate(x+w/2,yy); ctx.rotate(Math.PI/4); ctx.fillStyle=rgba(p.fabric2||'#e0c060',0.7); ctx.fillRect(-4,-4,8,8); ctx.restore(); } },
  dais:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-2,w/2,12,0.4); for(var s=0;s<3;s++){ ctx.fillStyle=shade(p.floorA,0.12-s*0.1); rr(ctx,x+s*6,y+s*2,w-s*12,h-s*6,4); ctx.fill(); ctx.strokeStyle=rgba(p.trim,0.8); ctx.lineWidth=1.5; ctx.stroke(); } },
  mosaic:function(ctx,x,y,w,h,S){ var p=S.pal, cx=x+w/2, cy=y+h/2, r=Math.min(w,h)/2-2, cols=p.glassCols||['#c83a3a','#3a6ac8','#e0b040','#3aa060','#8a3ac8'];
    ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip(); ctx.fillStyle=shade(p.floorA,-0.2); ctx.fillRect(x,y,w,h);
    for(var ring=0;ring<4;ring++)for(var k=0;k<12;k++){ var a0=k/12*Math.PI*2+ring*0.26, a1=a0+Math.PI*2/12, r0=r*(ring/4), r1=r*((ring+1)/4); ctx.beginPath(); ctx.arc(cx,cy,r1,a0,a1); ctx.arc(cx,cy,r0,a1,a0,true); ctx.closePath(); ctx.fillStyle=rgba(cols[(k+ring)%cols.length],0.75-ring*0.1); ctx.fill(); ctx.strokeStyle=rgba('#1a1418',0.6); ctx.lineWidth=1; ctx.stroke(); }
    ctx.restore(); ctx.strokeStyle=p.trim; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); }
});
// ── tall pieces (sprites) ──
function _castleSprite(m,x,y,w,h,fn){ addSprite(m,x+w/2,y+h,w+24,h+110,function(ctx,cw,ch){ ctx.translate(12,110); fn(ctx,w,h); }); }
Object.assign(TOWER_TALL,{
  hearth:function(m,x,y,w,h,S){ var p=S.pal; _castleSprite(m,x,y,w,h,function(ctx,w,h){ var s=p.stone||shade(p.wallFace,0.05); softShadow(ctx,w/2,h-2,w/2,6,0.4);
      ctx.fillStyle=shade(s,-0.15); ctx.fillRect(-4,-64,w+8,h+64); ctx.fillStyle=s; for(var r=0;r<6;r++)for(var c=0;c<5;c++){ ctx.fillStyle=shade(s,((r+c)%3-1)*0.06); ctx.fillRect(-4+c*(w+8)/5+(r%2?6:0),-64+r*13,(w+8)/5-2,11); }
      ctx.fillStyle='#120a08'; rr(ctx,w/2-38,-34,76,h+34,18); ctx.fill(); var g=ctx.createRadialGradient(w/2,h-4,4,w/2,h-8,40); g.addColorStop(0,'#fff0a0'); g.addColorStop(0.35,'#ffa030'); g.addColorStop(1,'rgba(255,90,20,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(w/2,h-8,34,26,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#5a3a22'; ctx.fillRect(w/2-26,h-6,52,5); ctx.fillStyle=shade(s,0.15); ctx.fillRect(-10,-70,w+20,8); ctx.fillStyle=p.trim; ctx.fillRect(-10,-62,w+20,2); });
    addLight(m,x+w/2,y+h-4,190,'#ff9a40',0.55,{flicker:0.4,depth:-4}); },
  great_torch:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,40,110,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-4,11,4,0.4); ctx.fillStyle='#2a2626'; ctx.fillRect(cw/2-3,ch-66,6,62); ctx.fillStyle='#3a3434'; ctx.fillRect(cw/2-9,ch-8,18,5); ctx.beginPath(); ctx.moveTo(cw/2-12,ch-70); ctx.lineTo(cw/2+12,ch-70); ctx.lineTo(cw/2+7,ch-60); ctx.lineTo(cw/2-7,ch-60); ctx.fill();
      var g=ctx.createRadialGradient(cw/2,ch-82,2,cw/2,ch-80,18); g.addColorStop(0,'#fffae0'); g.addColorStop(0.35,p.torch||'#ffb040'); g.addColorStop(1,'rgba(255,100,20,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(cw/2-12,ch-70); ctx.quadraticCurveTo(cw/2-12,ch-90,cw/2,ch-104); ctx.quadraticCurveTo(cw/2+12,ch-90,cw/2+12,ch-70); ctx.fill(); });
    addLight(m,x+w/2,y+h-40,170,p.torch||'#ffa040',0.55,{flicker:0.45,depth:-4}); },
  pillar_massive:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,48,140,function(ctx,cw,ch){ var s=p.stone||p.wallTop; softShadow(ctx,cw/2,ch-4,17,5,0.45); ctx.fillStyle=shade(s,-0.3); ctx.fillRect(cw/2-18,ch-14,36,10);
      var g=ctx.createLinearGradient(cw/2-14,0,cw/2+14,0); g.addColorStop(0,shade(s,-0.35)); g.addColorStop(0.45,shade(s,0.1)); g.addColorStop(1,shade(s,-0.45)); ctx.fillStyle=g; ctx.fillRect(cw/2-14,ch-128,28,116);
      for(var r=0;r<7;r++){ ctx.fillStyle=rgba('#000000',0.18); ctx.fillRect(cw/2-14,ch-120+r*16,28,1.5); } ctx.fillStyle=shade(s,-0.2); ctx.fillRect(cw/2-18,ch-136,36,10); ctx.fillStyle=rgba(p.trim,0.8); ctx.fillRect(cw/2-18,ch-127,36,2); }); },
  armor_stand:function(m,x,y,w,h,S){ var p=S.pal, st=p.armor||'#a8acb4'; addSprite(m,x+w/2,y+h,40,84,function(ctx,cw,ch){ var c=cw/2; softShadow(ctx,c,ch-4,11,4,0.4); ctx.fillStyle='#3a2a1e'; ctx.fillRect(c-9,ch-7,18,4);
      var g=ctx.createLinearGradient(c-9,0,c+9,0); g.addColorStop(0,shade(st,-0.35)); g.addColorStop(0.5,shade(st,0.2)); g.addColorStop(1,shade(st,-0.45));
      ctx.fillStyle=g; ctx.fillRect(c-6,ch-30,5,23); ctx.fillRect(c+1,ch-30,5,23); rr(ctx,c-10,ch-56,20,28,5); ctx.fill(); ctx.fillRect(c-15,ch-54,6,20); ctx.fillRect(c+9,ch-54,6,20);
      ctx.beginPath(); ctx.ellipse(c,ch-64,8,9,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#101014'; ctx.fillRect(c-6,ch-66,12,2.5); ctx.fillRect(c-1,ch-66,2,8);
      ctx.fillStyle=p.fabric||'#8a2a2a'; ctx.beginPath(); ctx.moveTo(c,ch-73); ctx.quadraticCurveTo(c+10,ch-82,c+6,ch-66); ctx.fill(); ctx.fillStyle=rgba(p.fabric||'#8a2a2a',0.9); ctx.fillRect(c-9,ch-46,18,5);
      ctx.strokeStyle='#d0d4dc'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(c+15,ch-36); ctx.lineTo(c+15,ch-8); ctx.stroke(); ctx.fillStyle='#8a6a2a'; ctx.fillRect(c+12,ch-38,6,2); }); },
  weapon_rack:function(m,x,y,w,h,S){ var p=S.pal; _castleSprite(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-3,w/2,4,0.35); ctx.fillStyle=shade(p.wood,-0.25); ctx.fillRect(2,-40,4,h+38); ctx.fillRect(w-6,-40,4,h+38); ctx.fillRect(2,-40,w-4,4); ctx.fillRect(2,h-12,w-4,4);
      for(var i=0;i<6;i++){ var wx=10+i*(w-20)/5; if(i%3===0){ ctx.strokeStyle='#d8dce4'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(wx,-34); ctx.lineTo(wx,h-14); ctx.stroke(); ctx.fillStyle='#8a6a2a'; ctx.fillRect(wx-4,h-20,8,3); }
        else if(i%3===1){ ctx.strokeStyle=shade(p.wood,0.1); ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(wx,-30); ctx.lineTo(wx,h-12); ctx.stroke(); ctx.fillStyle='#b8bcc4'; ctx.beginPath(); ctx.moveTo(wx,-30); ctx.quadraticCurveTo(wx+10,-26,wx+9,-14); ctx.lineTo(wx,-16); ctx.fill(); }
        else { ctx.strokeStyle=shade(p.wood,0.1); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(wx,-44); ctx.lineTo(wx,h-12); ctx.stroke(); ctx.fillStyle='#c8ccd4'; ctx.beginPath(); ctx.moveTo(wx,-52); ctx.lineTo(wx+3,-43); ctx.lineTo(wx-3,-43); ctx.fill(); } } }); },
  shield_rack:function(m,x,y,w,h,S){ var p=S.pal; _castleSprite(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-3,w/2,4,0.35); ctx.fillStyle=shade(p.wood,-0.25); ctx.fillRect(0,-8,w,4); ctx.fillRect(2,-8,3,h+6); ctx.fillRect(w-5,-8,3,h+6);
      [[w*0.28,p.fabric||'#8a2a2a'],[w*0.72,p.fabric2||'#c8a040']].forEach(function(sh,i){ var cx=sh[0], cy=-20; ctx.fillStyle=sh[1]; ctx.beginPath(); ctx.moveTo(cx-11,cy-12); ctx.lineTo(cx+11,cy-12); ctx.lineTo(cx+11,cy+2); ctx.quadraticCurveTo(cx+10,cy+14,cx,cy+18); ctx.quadraticCurveTo(cx-10,cy+14,cx-11,cy+2); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#c8ccd4'; ctx.lineWidth=2; ctx.stroke();
        ctx.fillStyle=i?(p.fabric||'#8a2a2a'):(p.fabric2||'#c8a040'); ctx.fillRect(cx-2,cy-10,4,24); ctx.fillRect(cx-9,cy-2,18,4); }); }); },
  great_sword:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,46,140,function(ctx,cw,ch){ var c=cw/2; softShadow(ctx,c,ch-4,15,5,0.45); ctx.fillStyle=shade(p.stone||p.wallTop,-0.2); rr(ctx,c-16,ch-22,32,18,4); ctx.fill(); ctx.fillStyle=shade(p.stone||p.wallTop,0.05); ctx.fillRect(c-12,ch-24,24,4);
      var g=ctx.createLinearGradient(c-5,0,c+5,0); g.addColorStop(0,'#8a9098'); g.addColorStop(0.5,'#f4f8ff'); g.addColorStop(1,'#6a7078'); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(c-5,ch-24); ctx.lineTo(c-5,ch-110); ctx.lineTo(c+5,ch-110); ctx.lineTo(c+5,ch-24); ctx.fill();
      ctx.fillStyle=p.trim; ctx.fillRect(c-17,ch-114,34,6); ctx.fillStyle='#4a3020'; ctx.fillRect(c-3,ch-134,6,20); ctx.fillStyle=p.trim; ctx.beginPath(); ctx.arc(c,ch-136,5,0,Math.PI*2); ctx.fill(); });
    addLight(m,x+w/2,y+h-60,90,p.light||'#ffe0a0',0.3,{pulse:0.3,depth:-4}); },
  statue_knight:function(m,x,y,w,h,S){ var p=S.pal, s=p.statue||'#9a9a9e'; addSprite(m,x+w/2,y+h,w+30,170,function(ctx,cw,ch){ var c=cw/2; softShadow(ctx,c,ch-6,w/2,8,0.45);
      var st=function(v){ return shade(s,v); }; ctx.fillStyle=st(-0.25); ctx.fillRect(c-28,ch-26,56,20); ctx.fillStyle=st(-0.05); ctx.fillRect(c-30,ch-30,60,6); ctx.fillStyle=st(-0.15); ctx.fillRect(c-24,ch-10,48,6);
      var g=ctx.createLinearGradient(c-20,0,c+20,0); g.addColorStop(0,st(-0.3)); g.addColorStop(0.45,st(0.12)); g.addColorStop(1,st(-0.35)); ctx.fillStyle=g;
      ctx.fillRect(c-12,ch-72,10,42); ctx.fillRect(c+2,ch-72,10,42); ctx.beginPath(); ctx.moveTo(c-18,ch-116); ctx.lineTo(c+18,ch-116); ctx.lineTo(c+14,ch-70); ctx.lineTo(c-14,ch-70); ctx.fill();
      ctx.beginPath(); ctx.moveTo(c-18,ch-114); ctx.lineTo(c-24,ch-78); ctx.lineTo(c-14,ch-74); ctx.fill(); ctx.beginPath(); ctx.moveTo(c+18,ch-114); ctx.lineTo(c+22,ch-80); ctx.lineTo(c+12,ch-76); ctx.fill();
      ctx.beginPath(); ctx.ellipse(c,ch-126,10,12,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle=st(-0.5); ctx.fillRect(c-8,ch-128,16,3); ctx.fillRect(c-1.5,ch-128,3,9);
      ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(c-3,ch-138); ctx.lineTo(c+3,ch-138); ctx.lineTo(c+1,ch-150); ctx.fill();
      // the great sword, point down between the feet, hands on the pommel
      ctx.fillStyle=st(0.2); ctx.fillRect(c-3,ch-96,6,62); ctx.fillStyle=st(-0.1); ctx.fillRect(c-12,ch-100,24,5); ctx.fillStyle=st(0.05); ctx.fillRect(c-4,ch-112,8,12); ctx.fillStyle=st(0.15); ctx.beginPath(); ctx.ellipse(c,ch-106,9,6,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=rgba('#000000',0.15); ctx.fillRect(c+8,ch-116,10,82); ctx.fillStyle=rgba(p.moss||'#4a6a3a',p.moss?0.5:0); ctx.fillRect(c-28,ch-28,20,4); }); },
  statue_dragon:function(m,x,y,w,h,S){ var p=S.pal, s=p.statue||'#9a9a9e'; addSprite(m,x+w/2,y+h,w+40,150,function(ctx,cw,ch){ var c=cw/2, st=function(v){ return shade(s,v); }; softShadow(ctx,c,ch-6,w/2+4,8,0.45);
      ctx.fillStyle=st(-0.25); ctx.fillRect(c-30,ch-24,60,18); ctx.fillStyle=st(-0.05); ctx.fillRect(c-32,ch-28,64,6);
      ctx.fillStyle=st(0.05); ctx.beginPath(); ctx.moveTo(c-22,ch-28); ctx.quadraticCurveTo(c-26,ch-70,c-6,ch-86); ctx.quadraticCurveTo(c+4,ch-100,c+2,ch-118); ctx.quadraticCurveTo(c+16,ch-124,c+26,ch-112); ctx.lineTo(c+14,ch-106); ctx.quadraticCurveTo(c+16,ch-84,c+12,ch-70); ctx.quadraticCurveTo(c+22,ch-50,c+20,ch-28); ctx.closePath(); ctx.fill();
      ctx.fillStyle=st(-0.12); ctx.beginPath(); ctx.moveTo(c-4,ch-84); ctx.lineTo(c-40,ch-120); ctx.lineTo(c-36,ch-96); ctx.lineTo(c-44,ch-90); ctx.lineTo(c-30,ch-78); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(c+8,ch-86); ctx.lineTo(c+42,ch-126); ctx.lineTo(c+38,ch-100); ctx.lineTo(c+46,ch-94); ctx.lineTo(c+26,ch-78); ctx.closePath(); ctx.fill();
      ctx.fillStyle=st(0.18); ctx.beginPath(); ctx.moveTo(c+6,ch-120); ctx.lineTo(c+2,ch-132); ctx.lineTo(c+10,ch-122); ctx.fill(); ctx.fillStyle=p.eye||'#ff6040'; ctx.fillRect(c+14,ch-116,3,2); ctx.fillStyle=rgba('#000000',0.15); ctx.fillRect(c+6,ch-70,14,42); }); },
  statue_saint:function(m,x,y,w,h,S){ var p=S.pal, s=p.statue||'#a8a8ac'; addSprite(m,x+w/2,y+h,44,120,function(ctx,cw,ch){ var c=cw/2, st=function(v){ return shade(s,v); }; softShadow(ctx,c,ch-4,12,4,0.4); ctx.fillStyle=st(-0.2); ctx.fillRect(c-13,ch-16,26,12);
      var g=ctx.createLinearGradient(c-12,0,c+12,0); g.addColorStop(0,st(-0.25)); g.addColorStop(0.5,st(0.15)); g.addColorStop(1,st(-0.3)); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(c-8,ch-76); ctx.lineTo(c+8,ch-76); ctx.lineTo(c+12,ch-16); ctx.lineTo(c-12,ch-16); ctx.fill();
      ctx.beginPath(); ctx.ellipse(c,ch-84,6,7,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=rgba(p.light||'#ffe0a0',0.9); ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(c,ch-94,9,3,0,0,Math.PI*2); ctx.stroke(); ctx.fillStyle=st(0.1); ctx.fillRect(c-6,ch-62,12,4); ctx.fillStyle=st(-0.35); ctx.fillRect(c-1,ch-72,2,50); });
    addLight(m,x+w/2,y-40,60,p.light||'#ffe0a0',0.25,{depth:-4}); },
  throne_big:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,w+40,200,function(ctx,cw,ch){ var c=cw/2; softShadow(ctx,c,ch-8,w/2+6,10,0.45); var metal=p.throneMetal||p.trim, fab=p.fabric||'#8a1a1a';
      ctx.fillStyle=shade(metal,-0.3); ctx.fillRect(c-38,ch-176,76,150); ctx.fillStyle=metal; ctx.beginPath(); ctx.moveTo(c-40,ch-176); for(var k=0;k<5;k++){ ctx.lineTo(c-40+k*20+10,ch-(k%2?196:210)); ctx.lineTo(c-40+(k+1)*20,ch-176); } ctx.fill();
      ctx.fillStyle=fab; rr(ctx,c-28,ch-166,56,112,10); ctx.fill(); ctx.fillStyle=shade(fab,0.18); rr(ctx,c-20,ch-156,40,92,8); ctx.fill(); if(p.emblem)_castleEmblem(ctx,p.emblem,c,ch-120,14,p.fabric2||'#e0c060');
      ctx.fillStyle=shade(metal,-0.1); ctx.fillRect(c-46,ch-70,16,42); ctx.fillRect(c+30,ch-70,16,42); ctx.fillStyle=metal; ctx.fillRect(c-48,ch-74,20,6); ctx.fillRect(c+28,ch-74,20,6);
      ctx.fillStyle=shade(fab,-0.1); ctx.fillRect(c-30,ch-54,60,22); ctx.fillStyle=metal; ctx.fillRect(c-34,ch-32,68,8); ctx.fillStyle=shade(metal,-0.35); ctx.fillRect(c-34,ch-24,68,18); ctx.fillStyle=rgba('#ffffff',0.2); ctx.fillRect(c-36,ch-176,4,140); });
    addLight(m,x+w/2,y-20,120,p.light||'#ffd080',0.35,{pulse:0.2,depth:-4}); },
  barrel:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,11,4,0.35); ctx.fillStyle=shade(p.wood,-0.1); rr(ctx,w/2-11,-14,22,h+10,7); ctx.fill(); ctx.fillStyle=shade(p.wood,-0.4); ctx.fillRect(w/2-11,-8,22,2.5); ctx.fillRect(w/2-11,h-12,22,2.5); ctx.fillStyle=shade(p.wood,0.15); ctx.beginPath(); ctx.ellipse(w/2,-14,11,4,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle=shade(p.wood,-0.3); ctx.beginPath(); ctx.ellipse(w/2,-14,7,2.5,0,0,Math.PI*2); ctx.fill(); }); },
  sarcophagus:function(m,x,y,w,h,S){ var p=S.pal, s=p.statue||'#8a8a8e'; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-3,w/2,5,0.4); ctx.fillStyle=shade(s,-0.3); rr(ctx,2,-10,w-4,h+6,4); ctx.fill(); ctx.fillStyle=shade(s,0.05); rr(ctx,4,-16,w-8,h-2,6); ctx.fill();
      ctx.fillStyle=shade(s,0.2); ctx.beginPath(); ctx.ellipse(12,-6,6,6,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(18,-10,w-30,8); ctx.fillStyle=shade(s,-0.1); ctx.fillRect(22,-14,2,16); ctx.fillRect(18,-8,10,2); }); }
});
Object.assign(TOWER_LABEL,{ hearth:function(){ return 'A great hearth — the fire never goes out.'; }, throne_big:function(){ return 'The warden\'s throne.'; }, great_sword:function(){ return 'A giant\'s sword, set in stone.'; }, statue_knight:function(){ return 'A stone knight, taller than three men.'; }, statue_dragon:function(){ return 'A stone dragon rears over the hall.'; } });
// heraldry on banners, shields and thrones
function _castleEmblem(ctx,k,cx,cy,r,col){ ctx.save(); ctx.fillStyle=col; ctx.strokeStyle=col; ctx.lineWidth=Math.max(1.2,r*0.14);
  if(k==='rose'){ for(var i=0;i<5;i++){ var a=i/5*Math.PI*2; ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r*0.45,cy+Math.sin(a)*r*0.45,r*0.42,0,Math.PI*2); ctx.fill(); } ctx.fillStyle='rgba(0,0,0,.25)'; ctx.beginPath(); ctx.arc(cx,cy,r*0.3,0,Math.PI*2); ctx.fill(); }
  else if(k==='sun'){ ctx.beginPath(); ctx.arc(cx,cy,r*0.45,0,Math.PI*2); ctx.fill(); for(var j=0;j<8;j++){ var b=j/8*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx+Math.cos(b)*r*0.55,cy+Math.sin(b)*r*0.55); ctx.lineTo(cx+Math.cos(b)*r,cy+Math.sin(b)*r); ctx.stroke(); } }
  else if(k==='mill'){ for(var m2=0;m2<4;m2++){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(m2*Math.PI/2+0.4); ctx.fillRect(0,-r*0.14,r,r*0.28); ctx.restore(); } }
  else if(k==='lotus'){ [-0.9,-0.45,0,0.45,0.9].forEach(function(a){ ctx.save(); ctx.translate(cx,cy+r*0.4); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(r*0.35,-r*0.6,0,-r*1.05); ctx.quadraticCurveTo(-r*0.35,-r*0.6,0,0); ctx.fill(); ctx.restore(); }); }
  else if(k==='shell'){ ctx.beginPath(); ctx.moveTo(cx,cy+r*0.8); for(var s=0;s<=6;s++){ var c2=Math.PI+s/6*Math.PI; ctx.lineTo(cx+Math.cos(c2)*r*0.9,cy+r*0.2+Math.sin(c2)*r*0.9); } ctx.closePath(); ctx.fill(); }
  else if(k==='tree'){ ctx.fillRect(cx-r*0.1,cy,r*0.2,r*0.9); ctx.beginPath(); ctx.arc(cx,cy-r*0.1,r*0.65,0,Math.PI*2); ctx.fill(); }
  else if(k==='hammer'){ ctx.fillRect(cx-r*0.1,cy-r*0.5,r*0.2,r*1.4); ctx.fillRect(cx-r*0.6,cy-r*0.8,r*1.2,r*0.5); }
  else if(k==='snow'){ for(var f=0;f<3;f++){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(f*Math.PI/3); ctx.beginPath(); ctx.moveTo(0,-r); ctx.lineTo(0,r); ctx.moveTo(-r*0.3,-r*0.7); ctx.lineTo(0,-r*0.45); ctx.lineTo(r*0.3,-r*0.7); ctx.moveTo(-r*0.3,r*0.7); ctx.lineTo(0,r*0.45); ctx.lineTo(r*0.3,r*0.7); ctx.stroke(); ctx.restore(); } }
  else if(k==='eagle'){ ctx.beginPath(); ctx.moveTo(cx,cy-r*0.5); ctx.lineTo(cx-r,cy-r*0.2); ctx.lineTo(cx-r*0.4,cy+r*0.1); ctx.lineTo(cx-r*0.3,cy+r*0.8); ctx.lineTo(cx,cy+r*0.4); ctx.lineTo(cx+r*0.3,cy+r*0.8); ctx.lineTo(cx+r*0.4,cy+r*0.1); ctx.lineTo(cx+r,cy-r*0.2); ctx.closePath(); ctx.fill(); }
  else if(k==='chain'){ for(var c3=0;c3<3;c3++){ ctx.beginPath(); ctx.ellipse(cx,cy-r*0.7+c3*r*0.7,r*0.3,r*0.42,0,0,Math.PI*2); ctx.stroke(); } }
  else if(k==='flame'){ ctx.beginPath(); ctx.moveTo(cx,cy-r); ctx.quadraticCurveTo(cx+r*0.9,cy,cx+r*0.3,cy+r*0.8); ctx.quadraticCurveTo(cx,cy+r*0.4,cx-r*0.3,cy+r*0.8); ctx.quadraticCurveTo(cx-r*0.9,cy,cx,cy-r); ctx.fill(); }
  else if(k==='skull'){ ctx.beginPath(); ctx.arc(cx,cy-r*0.15,r*0.6,0,Math.PI*2); ctx.fill(); ctx.fillRect(cx-r*0.35,cy+r*0.3,r*0.7,r*0.4); ctx.fillStyle='rgba(0,0,0,.6)'; ctx.beginPath(); ctx.arc(cx-r*0.22,cy-r*0.15,r*0.15,0,Math.PI*2); ctx.arc(cx+r*0.22,cy-r*0.15,r*0.15,0,Math.PI*2); ctx.fill(); }
  ctx.restore(); }
// stained-glass lancet windows (every castle window)
function _castleWindow(ctx,x,y,w,h,R){ var S=this, p=S.pal, cols=p.glassCols||['#c83a3a','#3a6ac8','#e0b040','#3aa060','#8a3ac8'];
  var wx=x+8, ww=w-16, wy=y+1, wh=h-3; ctx.fillStyle='#141016'; rr(ctx,wx-2,wy-1,ww+4,wh+2,ww/2+1); ctx.fill();
  ctx.save(); rr(ctx,wx,wy,ww,wh,ww/2); ctx.clip(); for(var yy=0;yy<wh;yy+=4)for(var xx=0;xx<ww;xx+=4){ ctx.fillStyle=cols[((xx*7+yy*3+(x/LT|0))>>2)%cols.length]; ctx.fillRect(wx+xx,wy+yy,4,4); }
  ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(wx,wy,ww/2,wh); ctx.restore(); ctx.strokeStyle='#141016'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(wx+ww/2,wy); ctx.lineTo(wx+ww/2,wy+wh); ctx.moveTo(wx,wy+wh*0.5); ctx.lineTo(wx+ww,wy+wh*0.5); ctx.stroke(); }
// wall decor: banners, torches, shields along every room's north wall (+ coloured light pools under the windows)
function _castleExtra(m,ctx,W,H,R,info){ var S=this, p=S.pal, at=info.at, pad=info.pad, P=info.plan;
  P.rooms.forEach(function(r){ var rx=r.x+pad, ry=r.y+pad, k=0, kind=r.type;
    if(kind==='roundchapel'){ var rcx=(rx+r.w/2)*LT; addSprite(m,rcx,ry*LT+6,96,100,function(ctx,cw,ch){ var c=cw/2, cy=ch-52, cols=p.glassCols||['#c83a3a','#3a6ac8','#e0b040']; ctx.fillStyle='#141016'; ctx.beginPath(); ctx.arc(c,cy,44,0,Math.PI*2); ctx.fill();
        for(var ring=0;ring<3;ring++)for(var k2=0;k2<12;k2++){ var a0=k2/12*Math.PI*2, a1=a0+Math.PI/6, r0=10+ring*11, r1=r0+10; ctx.beginPath(); ctx.arc(c,cy,r1,a0+0.03,a1-0.03); ctx.arc(c,cy,r0,a1-0.03,a0+0.03,true); ctx.closePath(); ctx.fillStyle=cols[(k2+ring*2)%cols.length]; ctx.fill(); }
        ctx.fillStyle=p.light||'#ffe0a0'; ctx.beginPath(); ctx.arc(c,cy,8,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=p.trim; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(c,cy,43,0,Math.PI*2); ctx.stroke(); }); m.sprites[m.sprites.length-1].depth=ry*LT-60;
      addLight(m,rcx,ry*LT+LT*2,140,(p.glassCols||['#c0a0ff'])[1],0.3,{pulse:0.2,depth:-4,noCut:false}); }
    for(var x=rx+1;x<rx+r.w-1;x++){ var v=at(x,ry-1); if(v===TB.WIN){ addLight(m,x*LT+LT/2,ry*LT+LT*1.2,70,(p.glassCols||['#c83a3a'])[x%((p.glassCols||[1]).length)],0.22,{depth:-4,noCut:true}); continue; } if(v!==TB.WALL)continue;
      if(info.items.some(function(it){ return it.y===ry&&x>=it.x-1&&x<it.x+it.w+1&&/hearth|throne|weapon_rack|shield_rack/.test(it.type); }))continue;
      k++; var step=kind==='greathall'||kind==='throneroom'?3:4; if(k%step!==1&&step>0)continue;
      var what=(kind==='armory'||kind==='trophy')?((k/step|0)%2?'shield':'torch'):(kind==='roundchapel'||kind==='chapel'||kind==='reliquary')?'candle':((k/step|0)%2?'banner':'torch');
      _castleWallDecor(m,x*LT,ry*LT,what,S,R); } }); }
function _castleWallDecor(m,x,y,what,S,R){ var p=S.pal;
  if(what==='banner'){ addSprite(m,x+LT/2,y+2,34,96,function(ctx,cw,ch){ var c=cw/2; ctx.fillStyle='#3a2a1e'; ctx.fillRect(c-15,4,30,4); var g=ctx.createLinearGradient(c-12,0,c+12,0); g.addColorStop(0,shade(p.fabric,-0.3)); g.addColorStop(0.5,p.fabric); g.addColorStop(1,shade(p.fabric,-0.35));
      ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(c-12,8); ctx.lineTo(c+12,8); ctx.lineTo(c+12,ch-14); ctx.lineTo(c,ch-4); ctx.lineTo(c-12,ch-14); ctx.closePath(); ctx.fill(); ctx.strokeStyle=p.fabric2||'#e0c060'; ctx.lineWidth=1.5; ctx.stroke(); if(p.emblem)_castleEmblem(ctx,p.emblem,c,ch*0.45,8,p.fabric2||'#e0c060'); }); m.sprites[m.sprites.length-1].depth=y-40; }
  else if(what==='torch'){ addSprite(m,x+LT/2,y+2,24,52,function(ctx,cw,ch){ var c=cw/2; ctx.fillStyle='#2a2224'; ctx.fillRect(c-2,ch-22,4,14); ctx.fillRect(c-5,ch-24,10,3); var g=ctx.createRadialGradient(c,ch-30,1,c,ch-29,9); g.addColorStop(0,'#fffae0'); g.addColorStop(0.4,p.torch||'#ffb040'); g.addColorStop(1,'rgba(255,100,20,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(c,ch-31,7,10,0,0,Math.PI*2); ctx.fill(); });
    m.sprites[m.sprites.length-1].depth=y-40; addLight(m,x+LT/2,y+LT*0.4,150,p.torch||'#ffa040',0.5,{flicker:0.4,depth:-4}); }
  else if(what==='shield'){ addSprite(m,x+LT/2,y+2,40,44,function(ctx,cw,ch){ var c=cw/2, cy=ch/2-4; ctx.strokeStyle='#c8ccd4'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(c-16,cy-14); ctx.lineTo(c+16,cy+14); ctx.moveTo(c+16,cy-14); ctx.lineTo(c-16,cy+14); ctx.stroke();
      ctx.fillStyle=p.fabric; ctx.beginPath(); ctx.moveTo(c-10,cy-11); ctx.lineTo(c+10,cy-11); ctx.lineTo(c+10,cy+2); ctx.quadraticCurveTo(c+9,cy+12,c,cy+15); ctx.quadraticCurveTo(c-9,cy+12,c-10,cy+2); ctx.closePath(); ctx.fill(); ctx.strokeStyle=p.fabric2||'#e0c060'; ctx.lineWidth=1.5; ctx.stroke(); if(p.emblem)_castleEmblem(ctx,p.emblem,c,cy+1,6,p.fabric2||'#e0c060'); }); m.sprites[m.sprites.length-1].depth=y-40; }
  else if(what==='candle'){ addSprite(m,x+LT/2,y+2,26,30,function(ctx,cw,ch){ for(var i=0;i<3;i++){ var cx=5+i*8; ctx.fillStyle='#efe6cc'; ctx.fillRect(cx,ch-14+i%2*3,3,10-i%2*3); ctx.fillStyle='#ffd060'; ctx.beginPath(); ctx.ellipse(cx+1.5,ch-16+i%2*3,1.6,3,0,0,Math.PI*2); ctx.fill(); } }); m.sprites[m.sprites.length-1].depth=y-40; addLight(m,x+LT/2,y+LT*0.3,80,'#ffd080',0.3,{flicker:0.25,depth:-4}); } }

// ── the 12 castles, now dark stone keeps (ids, names and quadrants unchanged) ──
var CASTLE_LOOK={
  thornwood_keep:{emblem:'rose',dark:0.38,tagline:'A knights\' keep of mossy grey stone, swallowed by briars',blurb:'Dark grey stone halls where briars climb the pillars and wild roses bloom through the cracks. Green banners with a red rose hang over the feast tables; torchlight and green-tinted stained glass.',
    pal:{outside:'#2a3a24',wallTop:'#6a6e66',wallFace:'#4c5048',trim:'#7a8a5a',floorA:'#56584e',floorB:'#3e4038',stone:'#6a6e64',statue:'#8a8e84',moss:'#4a6a3a',glassA:'#dff0c0',glassB:'#8ac070',glassCols:['#3a8a3a','#c83a4a','#e0c060','#2a5a8a','#6aa04a'],light:'#ffe0a0',torch:'#ffb050',wood:'#5a3e26',fabric:'#2e5a2e',fabric2:'#e07080',carpet:'#6a1a2a',metal:'#8a8a78',plant:'#4a7a3a',accent:'#e07080',armor:'#9a9e94'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#56584e','#2e3a28',R); if(R.chance(0.07)){ ctx.strokeStyle='rgba(74,122,58,.55)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(x,y+R.f()*LT); ctx.quadraticCurveTo(x+16,y+R.f()*LT,x+LT,y+R.f()*LT); ctx.stroke(); } }},
  sunflower_chateau:{emblem:'sun',dark:0.32,tagline:'A golden château of dark honey-coloured stone',blurb:'Honey-dark sandstone halls with gold trim, sunflower banners and warm stained glass. A roaring hearth heats the great hall; knights\' armour lines the throne room.',
    pal:{outside:'#4a5a2a',wallTop:'#8a7658',wallFace:'#6a5a42',trim:'#e0b040',floorA:'#7a6a50',floorB:'#5a4c38',stone:'#8a7a5c',statue:'#b0a080',glassA:'#fff4c0',glassB:'#f0d070',glassCols:['#e0b030','#f08030','#fff0a0','#c85a20','#8ab040'],light:'#fff0b0',torch:'#ffc050',wood:'#6a4a2a',fabric:'#c89020',fabric2:'#fff0c0',carpet:'#8a5a10',metal:'#e0b040',plant:'#6aa04a',accent:'#f0c040',armor:'#c8b890'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.checker(ctx,x,y,tx,ty,'#7a6a50','#5e5040'); }},
  windmill_bastion:{emblem:'mill',dark:0.4,tagline:'A timber-and-fieldstone bastion, dark with oak and smoke',blurb:'Rough fieldstone and blackened oak beams, rope and grain sacks; mill-wheel banners in red and cream. Iron braziers and a huge hearth light the hall.',
    pal:{outside:'#3a4a2a',wallTop:'#7a6c5a',wallFace:'#5a4c3c',trim:'#8a6a3a',floorA:'#5c4a36',floorB:'#3e3226',stone:'#7a6c5a',statue:'#948878',glassA:'#f0e8c8',glassB:'#c8b890',glassCols:['#b04a2a','#e8d8b0','#6a8a3a','#c8a040','#4a6a8a'],light:'#ffe0a0',torch:'#ffb040',wood:'#4a3622',fabric:'#9a3a22',fabric2:'#e8d8b0',carpet:'#6a2a1a',metal:'#8a7a5a',plant:'#6a9a4a',accent:'#c8a040',armor:'#9a9690'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.planks(ctx,x,y,tx,ty,'#5c4a36','#2a2014',R); }},
  lotus_palace:{emblem:'lotus',dark:0.42,tagline:'A dark-teal stone palace over black lotus pools',blurb:'Deep teal stone and pink lotus inlays; lotus banners over the feast tables, pink and teal stained glass, and water light rippling on the walls of the round chapel.',
    pal:{outside:'#0e2a2e',wallTop:'#4a6a6a',wallFace:'#34504e',trim:'#e080a8',floorA:'#3e5a58',floorB:'#2a4240',stone:'#4e6e6c',statue:'#7a9a98',glassA:'#e0fff8',glassB:'#80d0c8',glassCols:['#e080a8','#40a0a0','#fff0f8','#2a6a8a','#a0e0c0'],light:'#c0fff0',torch:'#ffc080',wood:'#4a4038',fabric:'#1e5a5a',fabric2:'#f0a0c0',carpet:'#6a2a4a',metal:'#a8d8d0',plant:'#4aa080',accent:'#f0a0c0',armor:'#8ab0ac'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#3e5a58','#1a3a38',R); }},
  drowned_abbey:{emblem:'shell',dark:0.5,tagline:'A half-flooded abbey of cold, wet blue stone',blurb:'Cold blue-grey stone slick with moss, puddles on the floor, pale candles and faded teal banners. The round chapel\'s stained glass throws green light on the drowned saints.',
    pal:{outside:'#0a1e22',wallTop:'#546a6a',wallFace:'#3c5050',trim:'#4a7a6a',floorA:'#465a58',floorB:'#2e3e3c',stone:'#566c6a',statue:'#7a908e',moss:'#3a6a4a',glassA:'#c0f0e0',glassB:'#60b0a0',glassCols:['#40a080','#2a5a8a','#a0e0c0','#6a8a4a','#c0d8d0'],light:'#a0ffe0',torch:'#ffc890',wood:'#3e3e34',fabric:'#1e4a4a',fabric2:'#a0c8c0',carpet:'#1a3a3a',metal:'#7a9a94',plant:'#3a7a4a',accent:'#80e0c0',armor:'#86a09c'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#465a58','#1e2e2c',R); if(R.chance(0.1)){ ctx.fillStyle='rgba(120,200,210,.2)'; ctx.beginPath(); ctx.ellipse(x+16,y+16,10,5,0,0,Math.PI*2); ctx.fill(); } }},
  mangrove_fort:{emblem:'tree',dark:0.5,tagline:'A dark fort of stone and mangrove timber',blurb:'Black stone footings and dark lashed timber, rope, hanging lanterns and tree banners. Glow-moths drift through the great hall; torches gutter in the damp.',
    pal:{outside:'#14241a',wallTop:'#5a4a3a',wallFace:'#403428',trim:'#c8a060',floorA:'#4a3a2a',floorB:'#302418',stone:'#5a4c3e',statue:'#7a6e5e',moss:'#3a6a2a',glassA:'#f0e0a0',glassB:'#c8a050',glassCols:['#3a6a3a','#c8a050','#6a4a2a','#8ac060','#e0c060'],light:'#ffd080',torch:'#ffc060',wood:'#3a2a18',fabric:'#2a4a2a',fabric2:'#e0c060',carpet:'#4a3a1a',metal:'#8a7a5a',plant:'#3a6a2a',accent:'#e0c060',armor:'#8a8274'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.planks(ctx,x,y,tx,ty,'#4a3a2a','#1a1208',R); }},
  dwarven_hold:{emblem:'hammer',dark:0.45,tagline:'Deep granite halls with brass, runes and forge-fire',blurb:'Square-cut dark granite, brass inlays and glowing rune bands; hammer banners in red and gold, weapon racks and anvils, and a forge-hearth in the great hall.',
    pal:{outside:'#141210',wallTop:'#5a5654',wallFace:'#403c3a',trim:'#c89040',floorA:'#4c4846',floorB:'#34302e',stone:'#5c5856',statue:'#7a7674',glassA:'#ffd080',glassB:'#c89040',glassCols:['#c89040','#a02a1a','#ffd080','#6a4a2a','#e0b060'],light:'#ffb050',torch:'#ffa040',wood:'#4a3220',fabric:'#7a1a10',fabric2:'#e0b060',carpet:'#5a1a10',metal:'#c89040',plant:'#5a6a4a',accent:'#ffb050',armor:'#a09890',throneMetal:'#c89040'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#4c4846','#c89040',R); if((tx+ty)%6===0){ ctx.fillStyle='rgba(255,176,80,.3)'; ctx.fillRect(x+12,y+12,8,8); } }},
  glacier_citadel:{emblem:'snow',dark:0.36,tagline:'A citadel of blue-grey stone locked in glacier ice',blurb:'Blue-grey stone crusted with ice, frozen banners with a white snowflake, ice-blue stained glass and cold braziers. Knights\' armour stands frosted in the halls.',
    pal:{outside:'#4a6a8a',wallTop:'#7a8a9a',wallFace:'#5a6a7a',trim:'#8ab8e0',floorA:'#6a7a8a',floorB:'#4a5a6a',stone:'#7a8a9a',statue:'#a8bccc',glassA:'#e8f8ff',glassB:'#90c8f0',glassCols:['#90c8f0','#e8f8ff','#4a7ab0','#c0e0ff','#2a4a8a'],light:'#c8ecff',torch:'#bfe8ff',wood:'#4a5664',fabric:'#2a4a7a',fabric2:'#e8f4ff',carpet:'#1e3a6a',metal:'#c0d8f0',plant:'#8ab0c8',accent:'#bfe8ff',armor:'#c0ccd8'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.ice(ctx,x,y,tx,ty,'#6a7a8a','#4a5a6a',R); }},
  eyrie_castle:{emblem:'eagle',dark:0.3,tagline:'A cliff-top castle of grey stone, wind and eagles',blurb:'Grey granite and open arches onto the sky, eagle banners snapping in the wind, blue stained glass and statues of griffins and knights along the galleries.',
    pal:{outside:'#4a6a90',wallTop:'#7a7874',wallFace:'#5c5a56',trim:'#5a7aa8',floorA:'#6a6864',floorB:'#4c4a46',stone:'#7c7a76',statue:'#a09e98',glassA:'#d8ecff',glassB:'#98c0e8',glassCols:['#3a5a9a','#d8ecff','#e0c060','#6a90d0','#f0e8d8'],light:'#ffffff',torch:'#ffc070',wood:'#5a4a36',fabric:'#2a4a8a',fabric2:'#f0e8d8',carpet:'#2a3a6a',metal:'#c8a860',plant:'#7a9a6a',accent:'#6a90d0',armor:'#a8acb4'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.herring(ctx,x,y,tx,ty,'#6a6864','#3a3834'); }},
  obsidian_bastille:{emblem:'chain',dark:0.55,tagline:'A prison-fortress of black glass veined with fire',blurb:'Black obsidian floors reflect the torches; red iron trim, chained braziers and blood-red banners. The warden\'s spiked throne stands over a lava-lit hall.',
    pal:{outside:'#1a0806',wallTop:'#3a3034',wallFace:'#2a2226',trim:'#b8301a',floorA:'#2a2428',floorB:'#161214',stone:'#3a3236',statue:'#5a5054',glassA:'#ff9060',glassB:'#b83010',glassCols:['#b83010','#ff9060','#2a2226','#ff6030','#8a1a10'],light:'#ff8040',torch:'#ff8030',wood:'#2a1e1a',fabric:'#7a1a10',fabric2:'#ff9060',carpet:'#5a0a06',metal:'#6a2a1a',plant:'#4a3a30',accent:'#ff6030',armor:'#4a4448',throneMetal:'#3a3034',eye:'#ff6030'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#2a2428','#ff6030',R); }},
  ember_sanctum:{emblem:'flame',dark:0.45,tagline:'A fire temple of dark red stone with a burning heart',blurb:'Dark red-brown stone, brass fire-bowls and flame banners; orange stained glass and a round chapel where the eternal flame burns before the saints.',
    pal:{outside:'#2a0e06',wallTop:'#6a4434',wallFace:'#4c3024',trim:'#e0b040',floorA:'#5a3c2c',floorB:'#3e281c',stone:'#6a4838',statue:'#8a6a58',glassA:'#ffd080',glassB:'#e08040',glassCols:['#e08040','#ffd080','#b82a1a','#ffb040','#6a2a1a'],light:'#ffa040',torch:'#ff9a30',wood:'#4a2a1a',fabric:'#a02010',fabric2:'#ffd090',carpet:'#7a1a0a',metal:'#d0a040',plant:'#8a6a3a',accent:'#ffb040',armor:'#a08070'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.hex(ctx,x,y,tx,ty,'#5a3c2c','#3e281c',R); }},
  bone_throne_keep:{emblem:'skull',dark:0.55,tagline:'Ash-grey halls decorated with dragon bones',blurb:'Ash-grey stone, bone-white trim and ribs of ancient dragons arching over the halls; black banners with a white skull, grey ash drifting in the torchlight.',
    pal:{outside:'#141210',wallTop:'#5a5654',wallFace:'#403c3a',trim:'#e8e0cc',floorA:'#4c4846',floorB:'#302c2a',stone:'#5c5856',statue:'#8a847e',glassA:'#e0d8c8',glassB:'#a09888',glassCols:['#e8e0cc','#6a2020','#302c2a','#a09888','#ff6040'],light:'#ffe0b0',torch:'#ffb070',wood:'#3a2e28',fabric:'#1e1a1a',fabric2:'#e8e0cc',carpet:'#2a1a1a',metal:'#e8e0cc',plant:'#5a5a4a',accent:'#e8e0cc',armor:'#7a7470',throneMetal:'#e8e0cc',eye:'#ff4020'},
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#4c4846','#1a1614',R); }}
};
CASTLE_STYLES.forEach(function(S){ var L=CASTLE_LOOK[S.id]; if(!L)return;
  Object.assign(S,{castle:true,tagline:L.tagline,blurb:L.blurb,dark:L.dark,heroLight:230,darkCol:'#06040a',windowEvery:4,glass:0,shaftA:0.12,ao:0.34,floor:L.floor,windowFace:_castleWindow,extra:_castleExtra,pillar:'pillar_massive',
    pal:Object.assign({},S.pal,L.pal,{emblem:L.emblem}),
    floorPlans:function(n){ return CASTLE_FLOORS[Math.max(1,Math.min(5,n))]; },
    facts:['Floors: '+'gatehouse · great hall · round chapel · throne room','Heraldry: '+L.emblem,'Darkness '+Math.round(L.dark*100)+'% — lit by torches, braziers and stained glass'] });
  S.plan='castle_hall'; });
