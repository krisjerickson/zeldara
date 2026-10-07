// ═══════════════════════════════════════════════════════════════════════
// ║ WORLD ART (Phase 3) — the structures that sit on the Lab-painted world,
// ║ drawn in the same style (3/4 view, soft shadows, rune glows):
// ║ towers, dungeon entrances, camps, harbors, sky ports, volcano doors and
// ║ waystones. Textures are cached per look; each returns its main image.
// ═══════════════════════════════════════════════════════════════════════
var WS_REGION_TINT={1:{roof:'#3d5f9a',stone:'#b8b2a4',rune:'#6fe3f5'},2:{roof:'#2f6e66',stone:'#9aa296',rune:'#7fffd8'},3:{roof:'#8a4a2e',stone:'#b0a490',rune:'#ffc860'},4:{roof:'#3a2a2a',stone:'#6a605a',rune:'#ff8a40'}};
function _wsTex(scene,key,w,h,draw){ if(!scene.textures.exists(key)){ var c=mkCanvas(w,h); draw(c.getContext('2d'),w,h,rngOf(_wpHash(key.length,w,h))); scene.textures.addCanvas(key,c); } return key; }
function _wsGlow(scene,x,y,r,col,a,o){ if(!scene.textures.exists('glow')&&scene._wrInit)scene._wrInit(); var im=scene.add.image(x,y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(col)).setAlpha(a).setScale(r/64).setDepth(o&&o.depth!==undefined?o.depth:WR_DEPTH(y)+0.001);
  (scene._glowObjs=scene._glowObjs||[]).push(im);
  if(o&&o.flicker)scene.tweens.add({targets:im,alpha:a*0.55,duration:140+Math.random()*120,yoyo:true,repeat:-1});
  else if(o&&o.pulse)scene.tweens.add({targets:im,alpha:a*0.5,scale:(r/64)*0.85,duration:1600,yoyo:true,repeat:-1,ease:'Sine.inOut'});
  return im; }
function _wsSiteArt(scene,s){
  if(!scene.textures.exists('glow'))scene._wrInit&&scene._wrInit();
  var fx=(s.tx+1.5)*TILE, fy=(s.ty+3)*TILE-2, r=s.section||1, tint=WS_REGION_TINT[r]||WS_REGION_TINT[1], key, img, _zp=null;
  // painted entrances (round 31): one picture per kind of place, with the same glows as the drawn ones; the drawn ones below stay for when a picture is missing
  var Zs=_scn(), zid=Zs&&s.type!=='dungeon'?_wsPaintedId(s,r):null, zi=zid?Zs.image(scene,zid,fx,fy+1,Zs.KB,WR_DEPTH(fy)):null;
  if(zi){ var zh=zi._zh, orb0=s.mage?(((MAGE_STYLE_BY_ID[s.design]||{}).pal||{}).rune||'#c080ff'):null;
    if(s.mage){ _wsGlow(scene,fx,fy-zh*0.93,50,orb0,0.5,{pulse:true}); _wsGlow(scene,fx,fy-30,40,orb0,0.3,{pulse:true}); }
    else if(s.type==='tower'){ _wsGlow(scene,fx,fy-zh*0.28,46,tint.rune,0.35,{pulse:true}); _wsGlow(scene,fx,fy-zh*0.62,34,'#ffd27a',0.25,{flicker:true}); }
    else if(s.type==='camp')_wsGlow(scene,fx+zi._zw*0.27,fy-16,70,'#ffa040',0.45,{flicker:true});
    else if(s.type==='harbor')_wsGlow(scene,fx+zi._zw*0.34,fy-zh*0.62,50,'#ffe08a',0.45,{flicker:true});
    else if(s.type==='skyport'){ var zb=Zs.image(scene,'en_sky_balloon',fx,fy-zh*0.78,Zs.K,WR_DEPTH(fy)+0.001,{shadow:false}); if(zb)scene.tweens.add({targets:zb,y:zb.y-7,duration:1700,yoyo:true,repeat:-1,ease:'Sine.inOut'}); }
    else _wsGlow(scene,fx,fy-30,70,'#ff6a20',0.45,{flicker:true});
    return zi; }
  if(s.mage){
    var MG=MAGE_BY_KEY[s.mage], MS=MAGE_STYLE_BY_ID[s.design]||{pal:{}}, orb=(MS.pal&&MS.pal.rune)||'#c080ff';
    key=_wsTex(scene,'site_mage_'+s.mage,120,260,function(g,W,H,R){
      softShadow(g,W/2,H-8,46,11,0.45); var bx=W/2, top=H-212, st=shade('#6a6078',(r-2)*0.05);
      // a twisting spire: narrowing stone rings, a pointed roof, a floating orb
      for(var i=0;i<7;i++){ var y0=H-10-i*26, w0=34-i*3.2, off=Math.sin(i*0.9)*5; var gr=g.createLinearGradient(bx-w0,0,bx+w0,0); gr.addColorStop(0,shade(st,-0.35)); gr.addColorStop(0.45,shade(st,0.15)); gr.addColorStop(1,shade(st,-0.45)); g.fillStyle=gr; g.beginPath(); g.moveTo(bx-w0+off,y0); g.lineTo(bx-w0+3+off,y0-27); g.lineTo(bx+w0-3+off,y0-27); g.lineTo(bx+w0+off,y0); g.closePath(); g.fill(); g.fillStyle=rgba(orb,0.55); g.fillRect(bx-w0+off,y0-3,w0*2,2); }
      var ry=H-10-7*26; g.fillStyle='#3a2a5a'; g.beginPath(); g.moveTo(bx-16,ry); g.lineTo(bx+4,ry-46); g.lineTo(bx+16,ry); g.fill(); g.fillStyle='#5a4a8a'; g.beginPath(); g.moveTo(bx+4,ry-46); g.lineTo(bx+16,ry); g.lineTo(bx+6,ry); g.fill();
      [[H-70],[H-122],[H-170]].forEach(function(q,j){ g.fillStyle='#140e1e'; rr(g,bx-5+Math.sin(j)*3,q[0],10,15,5); g.fill(); g.fillStyle=rgba(orb,0.9); rr(g,bx-3+Math.sin(j)*3,q[0]+2,6,11,3); g.fill(); });
      g.fillStyle='#2a1e36'; g.beginPath(); g.moveTo(bx-13,H-8); g.lineTo(bx-13,H-34); g.quadraticCurveTo(bx,H-50,bx+13,H-34); g.lineTo(bx+13,H-8); g.fill(); g.fillStyle=rgba(orb,0.35); g.fillRect(bx-10,H-32,20,24);
      var og=g.createRadialGradient(bx+4,ry-62,1,bx+4,ry-62,13); og.addColorStop(0,'#ffffff'); og.addColorStop(0.4,orb); og.addColorStop(1,rgba(orb,0)); g.fillStyle=og; g.beginPath(); g.arc(bx+4,ry-62,13,0,Math.PI*2); g.fill();
      for(var k=0;k<5;k++){ var a=k/5*Math.PI*2; drawRune(g,bx+Math.cos(a)*40,H-120+Math.sin(a)*60,7,orb,R.i(0,9)); } });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx+4,fy-250,50,orb,0.5,{pulse:true}); _wsGlow(scene,fx,fy-30,40,orb,0.3,{pulse:true});
  } else if(s.type==='tower'){
    key=_wsTex(scene,'site_tower_'+r+(s.boss?'_b':''),130,240,function(g,W,H,R){
      softShadow(g,W/2,H-8,54,12,0.45);
      var bx=W/2, top=H-200, bw=40;
      var gr=g.createLinearGradient(bx-bw,0,bx+bw,0); gr.addColorStop(0,shade(tint.stone,-0.35)); gr.addColorStop(0.45,shade(tint.stone,0.12)); gr.addColorStop(1,shade(tint.stone,-0.45));
      g.fillStyle=gr; g.beginPath(); g.moveTo(bx-bw-4,H-8); g.lineTo(bx-bw+2,top+30); g.lineTo(bx+bw-2,top+30); g.lineTo(bx+bw+4,H-8); g.closePath(); g.fill();
      g.fillStyle='rgba(0,0,0,.18)'; for(var y=top+40;y<H-12;y+=12){ g.fillRect(bx-bw+2,y,bw*2-4,1.5); for(var x=bx-bw+6+((y/12)%2)*9;x<bx+bw-4;x+=18)g.fillRect(x,y,1.5,12); }
      g.fillStyle=shade(tint.stone,-0.1); g.fillRect(bx-bw-6,top+24,bw*2+12,10); for(var m=0;m<7;m++)g.fillRect(bx-bw-6+m*14,top+14,8,12);
      g.fillStyle=tint.roof; g.beginPath(); g.moveTo(bx-bw-2,top+16); g.lineTo(bx,top-34); g.lineTo(bx+bw+2,top+16); g.closePath(); g.fill();
      g.fillStyle=shade(tint.roof,0.2); g.beginPath(); g.moveTo(bx,top-34); g.lineTo(bx+bw+2,top+16); g.lineTo(bx+6,top+16); g.closePath(); g.fill();
      [[top+60],[top+100]].forEach(function(q){ g.fillStyle='#1a1410'; rr(g,bx-7,q[0],14,20,6); g.fill(); g.fillStyle='rgba(255,210,120,.85)'; rr(g,bx-5,q[0]+2,10,16,5); g.fill(); });
      g.fillStyle='#2a1e14'; g.beginPath(); g.moveTo(bx-15,H-8); g.lineTo(bx-15,H-40); g.quadraticCurveTo(bx,H-58,bx+15,H-40); g.lineTo(bx+15,H-8); g.fill();
      g.fillStyle='#5a3a22'; g.fillRect(bx-12,H-38,24,30); g.fillStyle='rgba(0,0,0,.35)'; g.fillRect(bx-1,H-38,2,30);
      drawRune(g,bx,H-66,12,tint.rune,R.i(0,9));
      if(s.boss){ g.fillStyle='#5a4028'; g.fillRect(bx-1,top-60,2,28); g.fillStyle='#ffd24a'; g.beginPath(); g.moveTo(bx+1,top-60); g.lineTo(bx+22,top-54); g.lineTo(bx+1,top-47); g.fill(); }
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx,fy-66,46,tint.rune,0.35,{pulse:true}); _wsGlow(scene,fx,fy-150,34,'#ffd27a',0.25,{flicker:true});
  } else if(s.type==='dungeon'&&_scn()&&(_zp=_scn().texture(scene,s.boss&&_scn().has('en_dng_boss')?'en_dng_boss':'en_dng_'+r,(s.boss?158:138)*_scn().K))){
    // painted dungeon mouth (round 30); the drawn one below stays for when the picture is missing
    img=scene.add.image(fx,fy+6,_zp.key).setOrigin(0.5,1).setScale(_zp.scale).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx-_zp.w*0.29,fy-_zp.h*0.44,40,r===2?'#60e0ff':'#ffa040',0.4,{flicker:true}); _wsGlow(scene,fx+_zp.w*0.29,fy-_zp.h*0.44,40,r===2?'#60e0ff':'#ffa040',0.4,{flicker:true}); _wsGlow(scene,fx,fy-_zp.h*0.5,52,tint.rune,0.3,{pulse:true});
  } else if(s.type==='dungeon'){
    key=_wsTex(scene,'site_dungeon_'+r+(s.boss?'_b':''),150,130,function(g,W,H,R){
      softShadow(g,W/2,H-10,64,14,0.45);
      for(var i=0;i<6;i++)rockBlob(g,W/2+(i-2.5)*20,H-30-Math.sin(i/5*Math.PI)*26,22+R.f()*6,shade(tint.stone,-0.25+R.f()*0.1),R);
      g.fillStyle=shade(tint.stone,-0.1); g.beginPath(); g.moveTo(W/2-34,H-8); g.lineTo(W/2-34,H-58); g.quadraticCurveTo(W/2,H-92,W/2+34,H-58); g.lineTo(W/2+34,H-8); g.fill();
      g.fillStyle='#0c0806'; g.beginPath(); g.moveTo(W/2-24,H-8); g.lineTo(W/2-24,H-54); g.quadraticCurveTo(W/2,H-80,W/2+24,H-54); g.lineTo(W/2+24,H-8); g.fill();
      for(var st=0;st<4;st++){ g.fillStyle=shade(tint.stone,-0.3-st*0.12); g.fillRect(W/2-22+st*2,H-10-st*9,44-st*4,5); }
      for(var k=0;k<5;k++){ var a=Math.PI+k/4*Math.PI; drawRune(g,W/2+Math.cos(a)*29,H-56+Math.sin(a)*26,9,tint.rune,R.i(0,9)); }
      [[W/2-44],[W/2+44]].forEach(function(q){ g.fillStyle='#3a2a1c'; g.fillRect(q[0]-2,H-50,4,36); g.fillStyle='#ffb040'; g.beginPath(); g.ellipse(q[0],H-54,4,6,0,0,Math.PI*2); g.fill(); });
      if(s.boss){ g.fillStyle='#ffd24a'; g.font='bold 16px serif'; g.textAlign='center'; g.fillText('★',W/2,H-86); }
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx-44,fy-52,40,'#ffa040',0.4,{flicker:true}); _wsGlow(scene,fx+44,fy-52,40,'#ffa040',0.4,{flicker:true}); _wsGlow(scene,fx,fy-56,52,tint.rune,0.3,{pulse:true});
  } else if(s.type==='camp'){
    key=_wsTex(scene,'site_camp_'+r,140,110,function(g,W,H,R){
      softShadow(g,W/2,H-10,56,12,0.35);
      g.fillStyle='#8a6a44'; g.beginPath(); g.moveTo(W/2-50,H-12); g.lineTo(W/2-18,H-74); g.lineTo(W/2+14,H-12); g.fill();
      g.fillStyle='#a8845a'; g.beginPath(); g.moveTo(W/2-18,H-74); g.lineTo(W/2+14,H-12); g.lineTo(W/2+30,H-14); g.lineTo(W/2-4,H-76); g.fill();
      g.fillStyle='#3a2a1a'; g.beginPath(); g.moveTo(W/2-26,H-12); g.lineTo(W/2-18,H-44); g.lineTo(W/2-10,H-12); g.fill();
      g.fillStyle='#5a4028'; g.fillRect(W/2+22,H-24,30,6); g.fillRect(W/2+4,H-10,26,5);
      g.fillStyle='#4a3a2a'; for(var i=0;i<6;i++){ var a=i/6*Math.PI*2; g.beginPath(); g.ellipse(W/2+38+Math.cos(a)*10,H-14+Math.sin(a)*4,4,2.5,0,0,Math.PI*2); g.fill(); }
      g.fillStyle='#ffb040'; g.beginPath(); g.moveTo(W/2+32,H-14); g.quadraticCurveTo(W/2+38,H-36,W/2+44,H-14); g.fill(); g.fillStyle='#fff0a0'; g.beginPath(); g.moveTo(W/2+35,H-14); g.quadraticCurveTo(W/2+38,H-26,W/2+41,H-14); g.fill();
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx+38,fy-16,70,'#ffa040',0.45,{flicker:true});
  } else if(s.type==='harbor'){
    key=_wsTex(scene,'site_harbor_'+r,130,130,function(g,W,H,R){
      softShadow(g,W/2,H-8,50,10,0.35);
      g.fillStyle='#b8a888'; g.fillRect(W/2-40,H-60,80,52); g.fillStyle='rgba(0,0,0,.15)'; for(var y=H-56;y<H-10;y+=8)g.fillRect(W/2-40,y,80,1);
      g.fillStyle='#3a5a7a'; g.beginPath(); g.moveTo(W/2-48,H-58); g.lineTo(W/2,H-100); g.lineTo(W/2+48,H-58); g.fill(); g.fillStyle=shade('#3a5a7a',0.2); g.beginPath(); g.moveTo(W/2,H-100); g.lineTo(W/2+48,H-58); g.lineTo(W/2+8,H-58); g.fill();
      g.fillStyle='#4a3020'; g.fillRect(W/2-9,H-34,18,26); g.fillStyle='rgba(255,210,120,.85)'; g.fillRect(W/2-30,H-46,12,10); g.fillRect(W/2+18,H-46,12,10);
      g.fillStyle='#2a1a10'; g.fillRect(W/2+44,H-80,3,72); g.fillStyle='#ffe08a'; g.beginPath(); g.arc(W/2+45,H-82,5,0,Math.PI*2); g.fill();
      g.strokeStyle='#e8e0c8'; g.lineWidth=2; g.beginPath(); g.arc(W/2-52,H-28,7,0,Math.PI*2); g.stroke(); g.strokeStyle='#c84a3a'; g.beginPath(); g.arc(W/2-52,H-28,7,0,Math.PI*0.5); g.stroke();
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx+45,fy-82,50,'#ffe08a',0.45,{flicker:true});
  } else if(s.type==='skyport'){
    key=_wsTex(scene,'site_sky_'+r,120,210,function(g,W,H,R){
      softShadow(g,W/2,H-8,44,10,0.35);
      g.fillStyle='#6a4a2e'; g.fillRect(W/2-36,H-26,72,10); g.fillRect(W/2-32,H-16,6,12); g.fillRect(W/2+26,H-16,6,12);
      g.fillStyle='#5a3a22'; g.fillRect(W/2-3,H-150,6,126);
      g.strokeStyle='rgba(60,40,20,.8)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(W/2-30,H-26); g.lineTo(W/2-18,H-150); g.moveTo(W/2+30,H-26); g.lineTo(W/2+18,H-150); g.stroke();
      var gr=g.createRadialGradient(W/2-12,H-186,4,W/2,H-176,40); gr.addColorStop(0,'#ffd0a0'); gr.addColorStop(1,'#c8583a'); g.fillStyle=gr; g.beginPath(); g.ellipse(W/2,H-176,38,30,0,0,Math.PI*2); g.fill();
      g.strokeStyle='rgba(120,40,20,.5)'; g.lineWidth=2; for(var i=-2;i<=2;i++){ g.beginPath(); g.ellipse(W/2,H-176,Math.abs(i)*9+2,30,0,0,Math.PI*2); g.stroke(); }
      g.fillStyle='#7a5030'; g.fillRect(W/2-12,H-148,24,10); drawRune(g,W/2,H-176,14,'#fff4d0',R.i(0,9));
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    scene.tweens.add({targets:img,y:fy-4,duration:1700,yoyo:true,repeat:-1,ease:'Sine.inOut'});
  } else {
    // endgame volcano doors
    key=_wsTex(scene,'site_volc_'+s.type,120,120,function(g,W,H,R){
      softShadow(g,W/2,H-8,50,12,0.45);
      for(var i=0;i<5;i++)rockBlob(g,W/2+(i-2)*20,H-26-Math.sin(i/4*Math.PI)*22,22,'#3a2a26',R);
      g.fillStyle='#1a0c08'; g.beginPath(); g.moveTo(W/2-20,H-8); g.lineTo(W/2-20,H-44); g.quadraticCurveTo(W/2,H-66,W/2+20,H-44); g.lineTo(W/2+20,H-8); g.fill();
      var gr=g.createRadialGradient(W/2,H-24,2,W/2,H-24,26); gr.addColorStop(0,'rgba(255,170,60,.9)'); gr.addColorStop(1,'rgba(255,60,20,0)'); g.fillStyle=gr; g.fillRect(W/2-26,H-60,52,52);
      for(var k=0;k<4;k++){ var a=Math.PI+k/3*Math.PI; drawRune(g,W/2+Math.cos(a)*25,H-44+Math.sin(a)*22,9,'#ff8a40',R.i(0,9)); }
    });
    img=scene.add.image(fx,fy+2,key).setOrigin(0.5,1).setDepth(WR_DEPTH(fy));
    _wsGlow(scene,fx,fy-30,70,'#ff6a20',0.45,{flicker:true});
  }
  return img;
}
var WS_MAGE_PZ=['frost','library','apothecary','grove','storm','witch','tidal','astral','void','runic','crystal','blood','dream','clock','ember','fungal'];
function _wsPaintedId(s,r){ if(s.mage){ var d=String(s.design||''); for(var i=0;i<WS_MAGE_PZ.length;i++)if(d.indexOf(WS_MAGE_PZ[i])>=0)return 'en_mage_'+WS_MAGE_PZ[i]; return null; }
  return s.type==='tower'?(s.boss?'en_twr_boss':'en_twr_'+r):s.type==='camp'?'en_camp':s.type==='harbor'?'en_harbor':s.type==='skyport'?'en_skyport':s.type==='volcano_main'||s.type==='volcano'?'en_volcano_door':s.type==='volcano_mini'?'en_volcano_door_mini':null; }
var WS_CASTLE_PZ=['thornwood','sunflower','windmill','lotus','abbey','mangrove','dwarven','glacier','eyrie','obsidian','ember','bone'];
function _wsCastleId(C){ var d=String((C&&C.castle)||''); for(var i=0;i<WS_CASTLE_PZ.length;i++)if(d.indexOf(WS_CASTLE_PZ[i])>=0)return 'en_castle_'+WS_CASTLE_PZ[i]; return null; }
// Waystone: a tall runic obelisk; runes glow once it's part of the network.
function _wsWaystoneArt(scene,w,on){
  var key=_wsTex(scene,'waystone_'+(on?'on':'off'),60,120,function(g,W,H,R){
    softShadow(g,W/2,H-6,22,6,0.45);
    g.fillStyle='#6a6e74'; g.fillRect(W/2-18,H-16,36,10); g.fillStyle='#8a8e94'; g.fillRect(W/2-18,H-18,36,3);
    var gr=g.createLinearGradient(W/2-12,0,W/2+12,0); gr.addColorStop(0,on?'#9aa6b4':'#6e7680'); gr.addColorStop(0.5,on?'#c4ccd6':'#8a929c'); gr.addColorStop(1,on?'#5e6874':'#464c54');
    g.fillStyle=gr; g.beginPath(); g.moveTo(W/2-12,H-16); g.lineTo(W/2-9,H-96); g.lineTo(W/2,H-110); g.lineTo(W/2+9,H-96); g.lineTo(W/2+12,H-16); g.closePath(); g.fill();
    g.fillStyle='rgba(90,130,70,.45)'; g.fillRect(W/2-12,H-26,24,6);
    for(var i=0;i<3;i++)drawRune(g,W/2,H-86+i*22,12,on?'#6fe3f5':'#3e5a66',(i*3+2)%10,on);
  });
  var x=w.x*TILE+TILE/2, y=w.y*TILE+TILE/2+8, Zs=_scn(), zw=Zs&&Zs.image(scene,on?'rn_waystone_on':'rn_waystone_off',x,y,Zs.K,WR_DEPTH(y)), parts=[zw||scene.add.image(x,y,key).setOrigin(0.5,1).setDepth(WR_DEPTH(y))];
  if(on)parts.push(_wsGlow(scene,x,y-60,70,'#6fe3f5',0.4,{pulse:true}));
  return parts;
}
