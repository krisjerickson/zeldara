// ═══════════════════════════════════════════════════════════════════════
// ║ CHARACTERS (Phase 4) — pixel stand-ins for every NPC, mount, familiar
// ║ and boss, built like the monster roster (07m): a small spec → 32×32
// ║ frames. ChatGPT sprites can replace them later (same ids).
// ║   NPCs    : plan 'person' — skin, hair, clothes, hats, tools, 4 frames
// ║             (0/1 idle · 2/3 their trade: pour, hammer, wave, sew …)
// ║   mounts  : side view (4 walk frames) + front + back (2 each)
// ║   familiars / bosses: monster plans (+ fish, swirl, kraken), bosses
// ║             drawn bigger in game with an aura
// ═══════════════════════════════════════════════════════════════════════

// ── NPC body plan ─────────────────────────────────────────────────────
// pal: [shirt, trousers/robe, accent, eye, skin, hair]
MS_PLANS.person=function(G,P,F,o){
  var H=function(f){ return _msHas(F,f); };
  var kid=H('child'), dw=H('dwarf'), big=H('big');
  var x=16+o.lx, y=o.dy+(kid?6:dw?3:0), sh=P[0], dk=P[1], ac=P[2], sk=P[4]||'#f0c8a0', hr=P[5]||'#5a3a20';
  var bw=dw||big?10:kid?6:8, bx=x-bw/2, ty=kid?16:14, th=kid?6:dw?8:9;
  if(H('cape'))G.r(bx-1,ty,bw+2,13,shade(ac,-0.2));
  // legs / robe
  if(H('robe')||H('dress')){ G.tri(bx-2,29,bx+bw+2,29,x,ty+2,dk); G.r(bx-2,27,bw+4,2,dk); if(H('dress'))G.r(bx,ty+th-1,bw,1,ac); }
  else { var lh=kid?4:dw?4:6, ly=ty+th; G.r(x-3,ly+(o.step?1:0),2,lh-(o.step?1:0),dk); G.r(x+1,ly+(o.step?0:1),2,lh-(o.step?0:1),dk);
    G.r(x-3,ly+lh-1,2,1,'#3a2a1a'); G.r(x+1,ly+lh-1,2,1,'#3a2a1a'); }
  // torso
  G.r(bx,ty,bw,th,sh);
  if(H('vest'))G.r(bx,ty,2,th,ac),G.r(bx+bw-2,ty,2,th,ac);
  if(H('apron')){ G.r(x-3,ty+2,6,th+(H('robe')?6:3),'#ece2cc'); G.r(x-3,ty+2,6,1,'#c8b898'); }
  if(H('leather'))G.r(x-3,ty+1,6,th+2,'#7a5030');
  if(H('armor')){ G.r(bx,ty,bw,th-2,'#9aa0aa'); G.r(bx,ty,bw,1,'#c8ccd4'); }
  if(H('belt'))G.r(bx,ty+th-3,bw,1,ac);
  if(H('sash'))G.l(bx,ty,bx+bw-1,ty+th-2,ac);
  if(H('chains')){ G.ol(bx-2,ty+4,bx+bw+1,ty+4,'#a8a8b0'); G.ol(bx-2,ty+6,bx+bw+1,ty+6,'#8a8a92'); }
  // arms: left idle, right does the job (atk 1 = wind-up, 2 = action)
  var an=o.anim, a1=o.atk===1, a2=o.atk===2;
  G.r(bx-2,ty+1,2,6,sh); G.p(bx-2,ty+7,sk);
  var rx=bx+bw, ry=ty+1+(a1&&an!=='pour'?-3:0);
  if(an==='wave'&&o.atk){ G.r(rx,ty-4+(a2?1:0),2,6,sh); G.p(rx+(a2?1:0),ty-5,sk); }
  else { G.r(rx,ry,2,6,sh); G.p(rx,ry+6,sk); }
  var hx=rx+1, hy=ry+6;
  // head, hair, face
  var hy0=ty-5, hrx=kid?3.5:4;
  G.e(x,hy0,hrx,4,sk);
  if(!H('bald')&&!H('hood')&&!H('helmet')){
    G.r(x-4,hy0-4,9,3,hr);
    if(H('long')){ G.r(x-5,hy0-2,2,8,hr); G.r(x+4,hy0-2,2,8,hr); }
    else { G.p(x-4,hy0-1,hr); G.p(x+4,hy0-1,hr); }
    if(H('bun'))G.e(x,hy0-5,2,2,hr);
    if(H('braids')){ G.r(x-5,hy0,1,7,hr); G.r(x+5,hy0,1,7,hr); G.p(x-5,hy0+7,ac); G.p(x+5,hy0+7,ac); }
    if(H('pony'))G.r(x-6,hy0-2,2,5,hr);
  }
  if(H('beard'))G.tri(x-4,hy0+1,x+4,hy0+1,x,hy0+(dw?9:7),H('grey')?'#dcd8d0':hr);
  if(H('moustache'))G.r(x-2,hy0+2,5,1,H('grey')?'#dcd8d0':hr);
  // hats
  if(H('chefhat')){ G.e(x,hy0-6,4,3,'#f4f0e8'); G.r(x-3,hy0-4,7,2,'#f4f0e8'); }
  if(H('cap'))G.r(x-4,hy0-5,9,2,ac),G.r(x+2,hy0-3,4,1,ac);
  if(H('tricorn')){ G.tri(x-7,hy0-3,x+7,hy0-3,x,hy0-8,'#2a2226'); G.p(x,hy0-6,ac); }
  if(H('wizard')){ G.tri(x-6,hy0-3,x+6,hy0-3,x+3,hy0-11,dk); G.r(x-6,hy0-4,13,2,dk); G.op(x+2,hy0-8,ac); G.op(x-2,hy0-5,ac); }
  if(H('hood')){ G.e(x,hy0-1,5,5,dk); G.e(x+1,hy0+1,3,3,sk); }
  if(H('helmet')){ G.r(x-4,hy0-5,9,4,'#8a8e96'); G.r(x-4,hy0-1,1,3,'#8a8e96'); G.r(x+4,hy0-1,1,3,'#8a8e96'); G.p(x,hy0-6,ac); }
  if(H('scarf'))G.r(x-4,hy0-5,9,3,ac),G.p(x-5,hy0-2,ac);
  if(H('straw')){ G.r(x-7,hy0-3,15,1,'#e0c070'); G.r(x-4,hy0-6,9,3,'#e0c070'); G.r(x-4,hy0-4,9,1,ac); }
  if(H('bandana'))G.r(x-4,hy0-4,9,2,ac),G.p(x+5,hy0-3,ac);
  if(H('crown')){ G.r(x-3,hy0-6,7,2,'#e8c040'); G.p(x-3,hy0-7,'#e8c040'); G.p(x,hy0-7,'#e8c040'); G.p(x+3,hy0-7,'#e8c040'); }
  if(H('goggles')){ G.r(x-3,hy0-1,7,2,'#6a4a2a'); G.op(x-2,hy0-1,'#9fe0ff'); G.op(x+2,hy0-1,'#9fe0ff'); }
  if(H('feather'))G.l(x+3,hy0-5,x+7,hy0-10,ac);
  if(!H('goggles')){ G.op(x-1,hy0,P[3]); G.op(x+2,hy0,P[3]); }
  if(H('rosy')){ G.op(x-3,hy0+2,'rgba(230,120,120,.55)'); G.op(x+3,hy0+2,'rgba(230,120,120,.55)'); }
  // tools in the right hand
  var sw=a2?1:0;
  if(H('mug')){ G.r(hx-1+sw,hy-2,3,3,'#c89040'); G.op(hx-1+sw,hy-3,'#fff4d0'); if(an==='pour'&&a2){ G.ol(hx+2,hy-1,hx+4,hy+4,'#e8b040'); } }
  if(H('hammer')){ var hh=a2?4:a1?-6:0; G.l(hx,hy,hx+2,hy-6+hh,'#6a4a2a'); G.r(hx,hy-8+hh,5,3,'#8a8e96'); if(a2)G.op(hx+5,hy+1,'#ffd070'); }
  if(H('scroll')){ G.r(hx-1,hy-3,4,5,'#efe4c4'); G.r(hx-1,hy-3,4,1,'#b89868'); }
  if(H('quill'))G.ol(hx+1,hy-1,hx+4,hy-6,'#f4f4f4');
  if(H('scissors')){ G.ol(hx,hy-1,hx+3+sw,hy-4,'#dfe6ee'); G.ol(hx,hy-1,hx+3,hy-2+sw,'#dfe6ee'); }
  if(H('gem')){ G.oe(hx+1,hy-2,1.5,1.5,ac); if(a2)G.op(hx+3,hy-4,'#ffffff'); }
  if(H('potion')){ G.r(hx,hy-3,3,4,rgba(ac,0.9)); G.r(hx+1,hy-4,1,1,'#d8d0c0'); if(a2)G.op(hx+1,hy-6,shade(ac,0.5)); }
  if(H('bread')){ G.e(hx+1,hy-1,2.5,1.5,'#d8a050'); }
  if(H('rod')){ G.l(hx,hy,hx+6,hy-9-(a2?2:0),'#8a6a3a'); G.ol(hx+6,hy-9-(a2?2:0),hx+7,hy+2,'rgba(230,230,230,.8)'); }
  if(H('broom')){ G.l(hx,hy-4,hx+1,hy+6,'#8a6a3a'); G.r(hx-1+(a2?1:0),hy+6,4,2,'#d8b860'); }
  if(H('spyglass'))G.l(hx,hy,hx+4,hy-4-(a1||a2?2:0),'#c8a040');
  if(H('wrench')){ G.l(hx,hy,hx+3,hy-5,'#a8acb4'); G.p(hx+4,hy-6,'#a8acb4'); G.p(hx+2,hy-6,'#a8acb4'); }
  if(H('sword'))G.l(hx,hy,hx+(a2?6:2),hy-(a2?1:7),'#dfe6ee');
  if(H('spear'))G.l(hx,hy+5,hx+2,hy-10,'#9a8a70'),G.p(hx+2,hy-11,'#dfe6ee');
  if(H('pitchfork')){ G.l(hx,hy+5,hx+1,hy-9,'#8a6a3a'); G.p(hx-1,hy-10,'#a8acb4'); G.p(hx+1,hy-10,'#a8acb4'); G.p(hx+3,hy-10,'#a8acb4'); }
  if(H('lamp')){ G.l(hx,hy,hx,hy-9,'#3a3026'); G.oe(hx,hy-10,1.5,1.8,a2?'#ffe8a0':'#ffc060'); }
  if(H('staff')){ G.l(hx+1,hy+8,hx+1,hy-10,'#6a4a2a'); G.oe(hx+1,hy-11,1.4,1.4,ac); }
  if(H('ball'))G.e(hx+1+(a2?2:0),hy-1-(a2?4:0),1.5,1.5,ac);
  if(H('key'))G.op(hx+1,hy-1,'#e8c040'),G.op(hx+2,hy-1,'#e8c040');
  if(H('book'))G.r(bx-4,ty+3,4,4,ac);
  if(H('sack'))G.e(bx-3,ty+7,3,3,'#b89868');
  if(H('parrot')){ G.e(bx,ty-1,1.5,1.5,'#e04030'); G.p(bx+1,ty-1,'#ffd040'); }
  if(H('shield'))G.r(bx-4,ty+1,3,6,ac);
};
MS_FX.pour=function(G,P){ G.op(24,22,'rgba(255,220,140,.8)'); };
MS_FX.hammer=function(G,P){ for(var i=0;i<5;i++)G.op(20+i*2,20-(i%2)*2,i%2?'#ffd070':'#ffffff'); };
MS_FX.wave=function(G,P){ G.op(25,6,'rgba(255,255,255,.7)'); G.op(26,8,'rgba(255,255,255,.5)'); };
MS_FX.sparkle=function(G,P){ for(var i=0;i<4;i++){ var an=i/4*Math.PI*2; G.op(22+Math.cos(an)*3,12+Math.sin(an)*3,'#ffffff'); } };

// ── familiar plans ────────────────────────────────────────────────────
MS_PLANS.fish=function(G,P,F,o){ var x=15+o.lx, y=o.dy*2, b=P[0], d=P[1], a=P[2], t=o.step?2:-2;
  G.tri(x-7,16+y,x-12,11+y+t,x-12,21+y-t,a); G.e(x,16+y,7,5,b); G.e(x+1,18+y,5,2,shade(b,0.25));
  G.tri(x-2,11+y,x+2,7+y,x+4,12+y,a); if(_msHas(F,'bubble'))G.oe(x+10,10+y-(o.step?1:0),2,2,'rgba(200,240,255,.8)',true);
  if(_msHas(F,'spines'))for(var i=0;i<4;i++)G.p(x-4+i*3,11+y,a);
  G.op(x+4,15+y,P[3]); G.op(x+5,15+y,'#101010');
};
MS_PLANS.swirl=function(G,P,F,o){ var x=16+o.lx, y=o.dy*2, ph=o.step?0.6:0;
  for(var i=0;i<26;i++){ var t=i/26*Math.PI*3.2+ph, r=2+i*0.38; G.op(x+Math.cos(t)*r,15+y+Math.sin(t)*r*0.7,i%4?P[1]:P[2]); }
  G.e(x,15+y,2.5,2.5,P[0]); G.op(x-1,14+y,P[3]); G.op(x+1,14+y,P[3]);
  if(_msHas(F,'leaves'))for(var j=0;j<3;j++)G.op(x-9+j*9,6+y+(j%2)*3,'#8ad060');
};
MS_PLANS.kraken=function(G,P,F,o){ var x=16+o.lx, y=o.dy, b=P[0], d=P[1], a=P[2];
  for(var t=0;t<6;t++){ var sx=x-9+t*3.5, w=(o.step?1:-1)*((t%2)?1:-1); G.l(sx,20+y,sx+w*2,25+y,b); G.l(sx+w*2,25+y,sx-w,29,b); G.op(sx+w*2,26+y,a); }
  G.e(x,13+y,8,8,b); G.e(x,10+y,6,4,shade(b,0.15)); for(var i=0;i<3;i++)G.op(x-5+i*5,16+y,rgba(a,0.9));
  G.op(x-3,12+y,P[3]); G.op(x+3,12+y,P[3]); if(o.atk===2)G.oe(x,13+y,11,11,rgba(a,0.5),true);
};

MS_PLANS.firefly=function(G,P,F,o){ MS_PLANS.insect(G,P,F,o); G.oe(10+o.lx,20+o.dy,5,4.5,rgba(P[2],o.step?0.55:0.8)); G.oe(10+o.lx,20+o.dy,8,7,rgba(P[2],0.18)); };
// ── mounts: side view + front + back ──────────────────────────────────
// spec: {kind: quad|gator|bird|glider|serpent, pal:[body,dark,accent,eye], feat}
// frames: side 0-3 (walk / flap), front 4-5, back 6-7
function _mtPaintSide(G,S,f){ var P=S.pal, F=','+(S.feat||'')+',', H=function(q){ return _msHas(F,q); }, b=P[0], d=P[1], a=P[2], st=f%2, y=(f===1||f===3)?-1:0, wu=(f===1||f===3)?6:-2;
  if(S.kind==='quad'){ var lg=function(px,ph,up){ G.r(px,21+y+(ph?1:0),2,7-(ph?1:0),d); G.r(px,27+y,2,1,H('hooves')?'#2a2226':d); };
    var k=f%4; lg(6,k===0||k===2?0:1); lg(9,k===1||k===3?0:1); lg(20,k===1||k===3?0:1); lg(23,k===0||k===2?0:1);
    if(H('wings'))G.tri(12,15+y,4,3+y+wu,18,14+y,shade(a,0.1));
    G.e(15,17+y,10,5,b); if(H('belly'))G.e(15,19+y,7,2.5,shade(b,0.2));
    if(H('saddle')){ G.r(12,12+y,7,3,'#7a4a28'); G.r(11,14+y,9,1,'#5a3418'); }
    var low=H('lowhead'), hy2=low?15:8;
    if(low){ G.e(24,15+y,4,4,b); G.e(28,16+y,3.5,3,b); G.r(29,17+y,3,2,shade(b,-0.12)); G.tri(26,12+y,27,9+y,28,12+y,b); }
    else { G.tri(20,16+y,25,6+y,27,13+y,b); G.e(26,8+y,3,2.5,b); G.r(27,8+y,4,3,b); G.r(29,10+y,2,1,shade(b,-0.2)); G.tri(24,6+y,25,3+y,26,6+y,b); }
    if(H('mane'))for(var i=0;i<6;i++)G.r(19+i,13-i+y,1,2,d);
    if(H('flamemane'))for(var j=0;j<6;j++)G.op(20+j,12-j+y-(st?1:0),j%2?'#ffb040':'#ff6020');
    if(H('horn'))G.l(27,5+y,30,0+y,'#ffe0a0');
    if(H('tusks')){ G.op(30,18+y,'#fff4e0'); G.op(30,17+y,'#fff4e0'); }
    if(H('bristles'))for(var k2=0;k2<6;k2++)G.p(9+k2*2,12+y,d);
    if(H('spikes'))for(var s=0;s<5;s++)G.tri(8+s*3,13+y,9+s*3,9+y,10+s*3,13+y,a);
    if(H('horns')){ G.l(26,5+y,24,1+y,'#e8dcc0'); G.l(28,5+y,28,1+y,'#e8dcc0'); }
    G.l(5,15+y,1,H('tailup')?9+y:20+y,H('flamemane')?'#ff8030':d);
    if(H('lavacracks'))for(var c=0;c<4;c++)G.op(9+c*4,18+y+(c%2),'#ff9030');
    G.op(low?28:27,low?15+y:7+y,P[3]);
  }
  if(S.kind==='gator'){ var sw=(f%2)?1:-1; G.e(14,21+y,11,4,b); G.tri(3,21+y,-1,19+y+sw,4,23+y,b);
    G.r(22,20+y,9,3,b); G.r(22,23+y,8,1,shade(b,0.3)); for(var t=0;t<4;t++)G.p(23+t*2,23+y,'#fff4e0');
    for(var r=0;r<6;r++)G.p(6+r*3,17+y,d); G.r(7,24+y+(st?1:0),2,3,d); G.r(19,24+y+(st?0:1),2,3,d);
    if(H('saddle')){ G.r(11,15+y,7,3,'#7a4a28'); } G.op(24,19+y,P[3]); if(H('water')){ G.or(0,27,32,1,'rgba(120,200,255,.55)'); } }
  if(S.kind==='bird'){ G.tri(14,15+y,4,5+y+wu,18,16+y,d); G.e(15,17+y,8,5,b); G.tri(7,17+y,1,14+y,6,20+y,d);
    G.e(24,11+y,3.5,3,b); G.tri(27,11+y,31,13+y,27,14+y,a); if(H('crest'))G.tri(22,8+y,24,3+y,25,8+y,a);
    if(H('flames'))for(var fl=0;fl<6;fl++)G.op(3+fl*2,20+y+(fl%2),fl%2?'#ffd060':'#ff6020');
    if(H('saddle'))G.r(13,12+y,6,2,'#7a4a28');
    G.tri(14,15+y,9,3+y+wu,20,15+y,shade(d,0.2)); G.l(15,22+y,15,25+y,'#d8c080'); G.l(18,22+y,18,25+y,'#d8c080'); G.op(25,10+y,P[3]); }
  if(S.kind==='glider'){ G.tri(2,15+y,30,15+y,16,9+y+(st?1:0),a); G.r(4,15+y,24,1,d); G.l(16,15+y,16,22+y,'#8a6a3a');
    G.r(12,22+y,9,2,'#8a6a3a'); for(var g=0;g<4;g++)G.op(5+g*7,14+y,'rgba(255,255,255,.7)'); if(st)G.op(1,17,'rgba(255,255,255,.5)'); }
  if(S.kind==='serpent'){ for(var i2=0;i2<24;i2++){ var yy=19+Math.round(Math.sin((i2+f*1.5)*0.45)*3)+y; G.r(3+i2,yy,1,4,b); if(i2%3===0)G.op(3+i2,yy+1,a); }
    G.e(28,15+y,3.5,3,b); G.op(29,14+y,P[3]); if(H('wings'))G.tri(12,17+y,6,6+y+wu,18,17+y,shade(d,0.2)); if(H('smoke'))for(var sm=0;sm<4;sm++)G.op(2+sm*3,14+y-(sm%2),rgba(a,0.6)); }
  if(S.kind==='drake'){ S=Object.assign({},S,{kind:'quad',feat:(S.feat||'')+',wings,spikes,horns,tailup'}); _mtPaintSide(G,S,f); }
}
function _mtPaintFront(G,S,f,back){ var P=S.pal, F=','+(S.feat||'')+',', H=function(q){ return _msHas(F,q); }, b=P[0], d=P[1], a=P[2], y=f?-1:0, wu=f?5:-2, kd=S.kind==='drake'?'quad':S.kind;
  if(kd==='quad'||kd==='gator'){ var wide=kd==='gator';
    if(H('wings')||S.kind==='drake'){ G.tri(12,15+y,1,6+y+wu,10,20+y,shade(a,0.1)); G.tri(20,15+y,31,6+y+wu,22,20+y,shade(a,0.1)); }
    G.r(12-(f?0:1),21+y,3,7,d); G.r(17+(f?0:1),21+y,3,7,d);
    G.e(16,18+y,wide?9:6,5,b);
    if(H('saddle'))G.r(12,12+y,8,3,'#7a4a28');
    if(!back){ G.e(16,11+y,wide?6:4,4,b); G.r(14,13+y,5,3,shade(b,-0.1)); G.op(14,10+y,P[3]); G.op(18,10+y,P[3]);
      if(H('horn'))G.l(16,7+y,16,2+y,'#ffe0a0'); if(H('horns')||S.kind==='drake'){ G.l(13,8+y,11,4+y,'#e8dcc0'); G.l(19,8+y,21,4+y,'#e8dcc0'); }
      if(H('tusks')){ G.op(13,14+y,'#fff4e0'); G.op(19,14+y,'#fff4e0'); } if(H('mane')||H('flamemane'))G.r(14,7+y,5,2,H('flamemane')?'#ff8030':d); }
    else { G.l(16,20+y,16,27+y+(f?-1:0),H('flamemane')?'#ff8030':d); if(H('mane')||H('flamemane'))G.r(14,9+y,5,3,H('flamemane')?'#ff8030':d); }
    if(H('lavacracks'))for(var c=0;c<3;c++)G.op(12+c*4,18+y,'#ff9030');
  }
  if(kd==='bird'){ G.tri(15,14+y,1,8+y+wu,12,20+y,d); G.tri(17,14+y,31,8+y+wu,20,20+y,d); G.e(16,17+y,5,6,b);
    if(!back){ G.e(16,10+y,3,3,b); G.tri(15,12+y,17,12+y,16,15+y,a); G.op(15,9+y,P[3]); G.op(17,9+y,P[3]); } else G.tri(13,22+y,19,22+y,16,28+y,d);
    if(H('flames'))for(var fl=0;fl<5;fl++)G.op(12+fl*2,24+y,fl%2?'#ffd060':'#ff6020'); if(H('saddle'))G.r(13,13+y,6,2,'#7a4a28'); }
  if(kd==='glider'){ G.tri(1,16+y,31,16+y,16,12+y,a); G.r(2,16+y,28,1,d); G.l(16,16+y,16,24+y,'#8a6a3a'); G.r(12,24+y,9,2,'#8a6a3a'); }
  if(kd==='serpent'){ G.e(16,24+y,9,3,b); G.e(16,19+y,6,3,b); G.e(16,14+y,4,3,b); if(!back){ G.e(16,9+y,4,3,b); G.op(14,8+y,P[3]); G.op(18,8+y,P[3]); }
    if(H('wings')){ G.tri(12,16+y,2,8+y+wu,11,20+y,shade(d,0.2)); G.tri(20,16+y,30,8+y+wu,21,20+y,shade(d,0.2)); } }
}
function mtFrames(S){ if(S._fr)return S._fr; S._fr=[0,1,2,3,4,5,6,7].map(function(i){ var G=_msGrid();
    if(i<4)_mtPaintSide(G,S,i); else _mtPaintFront(G,S,i%2,i>=6); _msShadeOutline(G);
    var cv=mkCanvas(32,32), x=cv.getContext('2d'); x.fillStyle='rgba(0,0,0,.28)'; x.beginPath(); x.ellipse(16,29.5,11,2,0,0,Math.PI*2); x.fill();
    for(var k=0;k<1024;k++){ if(G.c[k]){ x.fillStyle=G.c[k]; x.fillRect(k%32,(k/32)|0,1,1); } }
    for(var k2=0;k2<1024;k2++){ if(G.o[k2]){ x.fillStyle=G.o[k2]; x.fillRect(k2%32,(k2/32)|0,1,1); } }
    return cv; });
  return S._fr; }

// ── the roster ────────────────────────────────────────────────────────
// CH(cat, id, name, spec, where, look, doing, extra)
//   cat: npc · mount · familiar · boss      spec: [plan, anim, 'pal', 'feat'] (mount: [kind, 'pal', 'feat'])
var CHAR_ROSTER=[], CHAR_BY_ID={};
function CH(cat,sub,id,name,spr,where,look,doing,extra){
  var spec=cat==='mount'?{mount:true,kind:spr[0],pal:spr[1].split(','),feat:spr[2]||''}:{plan:spr[0],anim:spr[1],pal:spr[2].split(','),feat:spr[3]||''};
  var R={cat:cat,sub:sub,id:id,name:name,spec:spec,where:where,look:look,doing:doing,extra:extra||''}; CHAR_ROSTER.push(R); CHAR_BY_ID[id]=R; return R; }
function chFrames(R){ return R.spec.mount?mtFrames(R.spec):msFrames(R.spec); }

// ── NPCs · village shops (building interiors) ──
CH('npc','Village shops','npc_tavern','Rolf the Bartender',['person','pour','#8a4a2a,#3a2a20,#e8b040,#201810,#e8b890,#6a3a1a','apron,beard,moustache,mug,rosy,big'],
  'The Tavern','Barrel-chested, ginger beard, rolled sleeves, a leather apron and a foaming mug.','Polishes a mug, then pours a frothy ale when you walk up.');
CH('npc','Village shops','npc_shop','Tilda the Merchant',['person','wave','#3a8a9a,#2a4a5a,#e8c060,#201810,#f0c8a0,#8a5a2a','bun,vest,sack,scarf'],
  'The General Shop','A brisk trader in a teal vest and head-scarf, a bulging coin sack on her hip.','Waves you in and pats the sack of goods.');
CH('npc','Village shops','npc_forge','Garrick the Blacksmith',['person','hammer','#5a4a40,#2a2220,#ff9030,#201810,#d8a078,#2a1a10','bald,beard,leather,hammer,big'],
  'The Forge','Bald and broad, soot on his cheeks, a heavy leather apron and a smith\'s hammer.','Strikes the anvil — sparks fly on every blow.');
CH('npc','Village shops','npc_guild','Master Oswin',['person','read','#5a3a7a,#2a1a3a,#e8c040,#201810,#e8c0a0,#c8c8c8','robe,grey,beard,scroll,quill'],
  'The Guild','An old scholar in a violet robe with a long grey beard, scroll and quill in hand.','Unrolls a scroll and scribbles your next bounty.');
CH('npc','Village shops','npc_stables','Hana the Stable Master',['person','wave','#8a6a3a,#3a4a2a,#c84030,#201810,#e8b890,#3a2a1a','straw,braids,pitchfork'],
  'The Stables','A cheerful rancher in a straw hat and braids, leaning on a pitchfork.','Tips her hat and points you to the horses.');
CH('npc','Village shops','npc_armory','Sergeant Brask',['person','wave','#9aa0aa,#3a3a44,#c83030,#201810,#d8a888,#4a3a2a','armor,helmet,moustache,spear,shield'],
  'The Armory','A retired soldier in dented plate, a red plume and a spear held at attention.','Stamps the spear and salutes.');
CH('npc','Village shops','npc_clothing','Pell the Tailor',['person','sew','#c86a8a,#4a3a5a,#ffe0a0,#201810,#f0c8a0,#2a2a2a','long,sash,scissors,rosy'],
  'The Clothing shop','A slender tailor in a rose coat with a gold sash and measuring tape.','Snips the air with bright scissors.');
CH('npc','Village shops','npc_jeweler','Iva the Jeweler',['person','polish','#2a5a6a,#1a2a3a,#60e0ff,#201810,#f0d0b0,#e8d8a0','long,goggles,gem'],
  'The Jeweler','Blonde, brass loupe-goggles pushed over her eyes, a glowing gem between her fingers.','Holds the gem to the light — it sparkles.');
CH('npc','Village shops','npc_apothecary','Morwen the Sorcerer',['person','stir','#3a2a5a,#1a1a2a,#b070ff,#c0a0ff,#e0d0e0,#1a1a2a','wizard,robe,potion,long'],
  'The Sorcerer\'s Apothecary','A tall sorceress in a starry pointed hat, violet robe and a bubbling potion.','Swirls the potion; purple sparks rise.');
CH('npc','Village shops','npc_merchant','Benno the Baker',['person','knead','#f0e8d8,#8a6a4a,#d8a050,#201810,#f0c8a0,#8a5a2a','chefhat,apron,bread,rosy,big'],
  'The Merchant (bakery & food)','Round-cheeked, flour on his apron, a tall chef\'s hat and a fresh loaf.','Kneads and lifts a warm loaf.');

// ── NPCs · the four craftsmen (freed from the towers) ──
CH('npc','Craftsmen','crafts_1','Bram the Builder',['person','hammer','#c89040,#4a3a2a,#e8e0c0,#201810,#e8b890,#6a4a2a','cap,beard,belt,hammer,big'],
  'Grasslands tower (captive) → village square','A big-shouldered builder in a canvas cap, tool belt and mallet.','Taps a peg with his mallet — raised the Wetlands bridge.');
CH('npc','Craftsmen','crafts_2','Mira the Mechanic',['person','wave','#4a6a8a,#2a3a4a,#e8a030,#201810,#f0c8a0,#c84a20','pony,goggles,wrench,belt'],
  'Wetlands tower (captive) → village square','A red-haired tinkerer with brass goggles and a big wrench, grease on her sleeves.','Spins the wrench and gives a thumbs-up — built the Highland lift.');
CH('npc','Craftsmen','crafts_3','Dunn the Dwarf Forger',['person','hammer','#7a3a2a,#3a2a20,#ff9030,#201810,#d8a078,#b86a2a','dwarf,beard,braids,leather,hammer'],
  'Highlands tower (captive) → village square','A stout dwarf with a braided copper beard, forge apron and a war hammer.','Swings the hammer overhead — forged the iron bridge to the Ashlands.');
CH('npc','Craftsmen','crafts_4','Captain Vela',['person','look','#2a4a7a,#1a2a3a,#e8c040,#201810,#e8c0a0,#1a1a1a','tricorn,feather,cape,spyglass,long'],
  'Ashlands tower (captive) → village square','A sky captain in a navy coat, feathered tricorn and cape, spyglass ready.','Scans the horizon with her spyglass — commands the sky ports.');

// ── NPCs · village folk (appear as the village grows) ──
CH('npc','Village folk','vf_elder','Elder Runa',['person','wave','#5a7a5a,#2a3a2a,#60e0d0,#201810,#e8c8b0,#e8e4dc','robe,long,grey,staff'],
  'By the runestone (stage 1+)','The village elder: silver hair to her waist, green robe, a staff with a glowing rune.','Leans on her staff; the rune pulses when you pass.','Tells the story of the Runestone Green.');
CH('npc','Village folk','vf_farmer','Tob the Farmer',['person','dig','#6a8a3a,#5a4a2a,#e0c070,#201810,#e0b080,#6a4a2a','straw,pitchfork,belt'],
  'The vegetable gardens (stage 1+)','Sun-browned farmer in a straw hat, green smock and pitchfork.','Turns the soil in the tidy garden rows.');
CH('npc','Village folk','vf_fisher','Old Nell the Fisher',['person','fish','#3a6a8a,#2a3a4a,#e8e0c0,#201810,#e8c0a0,#c8c8c8','scarf,rod,grey'],
  'On the pier (stage 1+)','A weathered fisherwoman in a blue oilskin and head-scarf, rod over the water.','Casts the line and waits for a bite.');
CH('npc','Village folk','vf_kid1','Pip',['person','play','#e0a030,#3a4a6a,#ff6040,#201810,#f0c8a0,#8a5a2a','child,ball,rosy'],
  'The village green (stage 2+)','A small kid in a mustard shirt, bouncing a red ball.','Tosses the ball and chases it round the fountain.');
CH('npc','Village folk','vf_boatwright','Hesk the Boatwright',['person','hammer','#6a5a4a,#3a2a20,#c8a060,#201810,#d8a888,#2a2a2a','bandana,leather,hammer,beard'],
  'The boathouse (stage 2+)','A wiry boat builder in a red bandana and leather apron.','Hammers planks on a hull.');
CH('npc','Village folk','vf_guard','Watchman Corr',['person','stand','#4a5a7a,#2a2a3a,#e8c040,#201810,#e0b890,#3a2a1a','armor,helmet,spear,shield'],
  'At the gates (stage 3+)','A gate guard in blue livery and a steel cap, spear upright.','Stands watch; salutes when you pass the gate.');
CH('npc','Village folk','vf_miller','Greta the Miller',['person','carry','#e8dcc0,#6a5a4a,#c8a060,#201810,#f0c8a0,#c8a060','scarf,sack,apron'],
  'By the windmill (stage 2+)','Flour-dusted miller in a pale dress and scarf, a sack over her shoulder.','Hauls sacks of flour from the mill.');
CH('npc','Village folk','vf_kid2','Wren',['person','play','#60a0e0,#4a3a5a,#ffe060,#201810,#e8c0a0,#1a1a1a','child,pony,rosy'],
  'Near the carts (stage 3+)','A quick kid with a black ponytail and a sky-blue tunic.','Skips between the market carts.');
CH('npc','Village folk','vf_vendor','Marta the Cart Vendor',['person','wave','#c84030,#4a3a2a,#e8e0c0,#201810,#f0c8a0,#6a3a1a','bun,apron,bread'],
  'The market carts (stage 3+)','A vendor in a red dress and white apron holding up fresh produce.','Calls out the day\'s prices.');
CH('npc','Village folk','vf_lamplighter','Old Fenwick',['person','light','#3a3a4a,#2a2a30,#ffc060,#201810,#e8c0a0,#c8c8c8','cap,grey,beard,lamp'],
  'The lamp-posts at dusk (stage 4+)','A stooped lamplighter in a grey coat carrying a long lighting pole.','Walks the streets at dusk lighting each lantern.');
CH('npc','Village folk','vf_keeper','Ilsa the Lighthouse Keeper',['person','look','#2a3a5a,#1a2a3a,#ffe080,#201810,#e8c0a0,#6a3a1a','cap,long,spyglass,cape'],
  'The lighthouse (stage 5)','A lighthouse keeper in a navy pea-coat, cap and spyglass.','Watches the lake for boats.');

// ── NPCs · harbor islands ──
CH('npc','Harbor islands','isl_harbor','Harbormaster Quill',['person','wave','#2a4a6a,#1a2a3a,#e8c040,#201810,#d8a888,#8a8a8a','tricorn,grey,moustache,key'],
  'Every island harbor','A grizzled harbormaster in a navy coat and tricorn, keys to the ferry on his belt.','Rings you back to the mainland ferry.');
CH('npc','Harbor islands','isl_trader','Coral the Island Trader',['person','wave','#e07050,#3a5a5a,#60d0c0,#201810,#c8906a,#1a1a1a','scarf,long,sack,parrot'],
  'Every island shop','A sun-browned trader with a coral scarf and a parrot on her shoulder.','Shows off exotic wares; the parrot squawks.');
CH('npc','Harbor islands','isl_well','Sister Mael',['person','heal','#e8e4dc,#8a9aa0,#60e090,#201810,#f0d0b0,#c8a060','hood,robe,potion'],
  'Every island healing well','A healer in white hooded robes with a vial of green well-water.','Blesses the well; green motes rise and heal you.');
CH('npc','Harbor islands','isl_guide','Ranger Holt',['person','point','#4a6a3a,#3a3a2a,#e8c060,#201810,#d8a888,#4a2a1a','hood,belt,spear'],
  'Island dungeon entrances','A hooded island ranger in moss green, leaning on a spear by the dungeon mouth.','Points the way into the guardian\'s dungeon.');

// ── mounts ──
CH('mount','Stables','mt_horse','Horse',['quad','#8a5a3a,#4a2a1a,#e8e0d0,#101010','mane,hooves,saddle'],
  'Bought at the stables (200 g)','A bay horse with a dark mane and a leather saddle (keeps its hand-painted rider sprite in the game).','Trots; mane and tail sway.');
CH('mount','Key mounts','mt_alligator','Alligator',['gator','#4a7a3a,#2a4a20,#e0d890,#e8d040','saddle,water'],
  'Grasslands boss dungeon','A broad swamp gator with a ridged back and a small saddle behind the head.','Paddles with a swishing tail; swims water and marsh at full speed.');
CH('mount','Key mounts','mt_boar','Battle Boar',['quad','#6a4a3a,#3a2a20,#c8b8a0,#ff5030','bristles,tusks,saddle,belly,lowhead'],
  'Wetlands boss dungeon','A hulking war boar with bristling back, ivory tusks and red eyes.','Charges with a head-down trot; smashes through boulder fields.');
CH('mount','Key mounts','mt_lava_unicorn','Lava Unicorn',['quad','#3a2a2a,#1a1010,#ff8030,#ffd060','flamemane,horn,hooves,lavacracks,saddle'],
  'Highlands boss dungeon','An obsidian unicorn with a mane of fire, a glowing horn and lava-cracked hide.','Gallops leaving ember sparks; walks on lava crust.');
CH('mount','Key mounts','mt_ash_salamander','Ash Dragon',['drake','#5a4a4a,#2a2020,#ff7030,#ffd060','lavacracks,saddle'],
  'Ashlands boss dungeon','A soot-grey dragon with ember-lit cracks, stubby wings and a curling tail.','Lumbers with wings half-open; crosses every region\'s terrain.');
CH('mount','Legend','mt_dragon','Dragon',['drake','#b83a2a,#6a1a10,#e8c040,#ffe060','belly,saddle'],
  'All 16 quests complete','A crimson dragon with golden horns, belly plates and wide wings.','Wings beat slowly as it flies over all but the sea.');
CH('mount','Legend','mt_sky_eagle','Sky Eagle',['bird','#8a6a4a,#4a3a2a,#e8c040,#101010','crest,saddle'],
  'Sky Port reward','A giant golden-brown eagle with a crested head and a riding saddle.','Glides with wide flaps; flies over everything.');
CH('mount','Sky Port','mt_sky_glider','Sky Glider',['glider','#e8e0d0,#8a6a4a,#60a0e0,#101010',''],
  'Sky Port 1 reward','A blue-and-white canvas glider with a wooden frame and harness.','Rides the wind — the canopy flutters.');
CH('mount','Sky Port','mt_storm_drake','Storm Drake',['drake','#3a5a8a,#1a2a4a,#9fe0ff,#ffffff','saddle'],
  'Sky Port 2 reward','A storm-blue drake with pale lightning veins on its wings.','Crackles as it flies; sparks trail its wingtips.');
CH('mount','Sky Port','mt_ember_phoenix','Ember Phoenix',['bird','#e85020,#8a2010,#ffd060,#fff0a0','flames,crest,saddle'],
  'Sky Port 3 reward','A blazing phoenix — flame-red feathers with a fiery tail.','Leaves a trail of embers; crosses magma.');
CH('mount','Sky Port','mt_void_serpent','Void Serpent',['serpent','#3a2a5a,#1a1030,#c070ff,#ff60ff','wings,smoke'],
  'Sky Port 4 reward','A winged shadow serpent of violet scales trailing purple smoke.','Undulates through the air, fastest of all.');

// ── familiars ──
CH('familiar','Grasslands','fm_firefly','Firefly',['firefly','shoot','#e8d040,#6a5a20,#ffe860,#201810','wings,antennae'],
  'Grasslands island expedition','A plump golden firefly with a glowing abdomen.','Orbits you, then flicks an Ember Spark at the nearest enemy.');
CH('familiar','Grasslands','fm_wind_sprite','Wind Sprite',['swirl','pulse','#c8f0e0,#80c0a0,#ffffff,#205040','leaves'],
  'Grasslands island expedition','A spiralling gust with bright eyes and a few tumbling leaves.','Swirls round you and bursts outward — Gale Burst knocks enemies back.');
CH('familiar','Wetlands','fm_sea_sprite','Sea Sprite',['fish','spit','#60b0e0,#2a5a8a,#9fe0ff,#ffffff','bubble,spines'],
  'Wetlands island expedition','A little puffer-sprite with fin-wings, blowing bubbles.','Spits water darts; a bubble ward blocks one hit every 20 s.');
CH('familiar','Highlands','fm_storm_hawk','Storm Hawk',['bird','shoot','#5a6a8a,#2a3a5a,#9fe0ff,#ffe060','talons'],
  'Highlands island expedition','A slate-blue hawk with lightning-bright eyes.','Dives and calls Chain Lightning that jumps between 3 enemies.');
CH('familiar','Ashlands','fm_frost_wisp','Frost Wisp',['wisp','pulse','#dff4ff,#80b0e0,#9fe0ff,#2050a0','wings'],
  'Ashlands island expedition','A cold blue wisp in a halo of frost crystals.','Pulses a Frost Nova that damages and slows enemies 50%.');

// ── bosses · dungeon guardians ──
CH('boss','Dungeon guardians','boss_goblin_king','Goblin King',['biped','lunge','#3a9a2a,#2a5a1a,#e8c040,#ff4020','crown,cape,club,ears,tusks'],
  'Grasslands ★ dungeon (exit portal)','A fat goblin king with a crooked crown, red cape and spiked club.','Rushes you and throws a fan of arrows (scatter shot).');
CH('boss','Dungeon guardians','boss_swamp_witch','Swamp Witch',['caster','cast','#6a8a4a,#2a3a20,#80ff60,#ffe040','hat,cauldron,staff,beard'],
  'Wetlands ★ dungeon (exit portal)','A crooked bog witch in a moss-green hat with a bubbling cauldron.','Circles you and hurls green bog-flame.');
CH('boss','Dungeon guardians','boss_rock_dragon','Rock Dragon',['drake','breath','#7a7a80,#4a4a50,#ff9040,#ffd040','crystals'],
  'Highlands ★ dungeon (exit portal)','A stone-scaled dragon with crystal spines and a molten throat.','Charges, then sprays a spread of fire.');
CH('boss','Dungeon guardians','boss_lava_titan','Lava Titan',['golem','slam','#5a2a20,#2a1010,#ff7020,#ffe060','glowcore,crystals'],
  'Ashlands ★ dungeon (exit portal)','A towering golem of cooled magma with a blazing core.','Slow; stomps shockwaves around itself.');
// ── bosses · tower guardians ──
CH('boss','Tower guardians','boss_dark_warlock','Dark Warlock',['caster','cast','#4a2a6a,#1a1030,#c070ff,#ff60ff','hood,horns,staff,runes'],
  'Grasslands ★ tower (top floor)','A horned warlock in a violet hood, runes orbiting his staff.','Blinks around the room and fires homing hexes.');
CH('boss','Tower guardians','boss_storm_mage','Storm Mage',['caster','beam','#3a5a9a,#1a2a4a,#9fe0ff,#ffffff','hat,beard,staff,runes'],
  'Wetlands ★ tower (top floor)','A white-bearded mage in a storm-blue hat, lightning on his staff.','Strafes and calls lightning bolts.');
CH('boss','Tower guardians','boss_iron_sentinel','Iron Sentinel',['construct','slam','#8a8e96,#4a4e56,#ffb040,#ff4020','rivets,hammer,gears,vents'],
  'Highlands ★ tower (top floor)','A riveted iron colossus with a furnace eye and a piston hammer.','Marches forward and fires scatter bolts.');
CH('boss','Tower guardians','boss_shadow_lord','Shadow Lord',['wraith','cast','#2a1a3a,#0a0610,#b040ff,#ff3050','crown,flames,chains'],
  'Ashlands ★ tower (top floor)','A crowned shadow with violet flames and trailing chains.','Teleports and launches seeking shadow bolts.');
// ── bosses · island guardians ──
CH('boss','Island guardians','boss_isl_1','Pirate Captain',['person','slash','#6a1a1a,#2a1a1a,#e8c040,#201810,#d8a078,#1a1a1a','tricorn,beard,cape,sword,parrot'],
  'Pirate Cave (Grasslands island)','A pirate captain in a crimson coat and tricorn, cutlass drawn, parrot on the shoulder.','Rushes in with cutlass slashes.');
CH('boss','Island guardians','boss_isl_2','Swamp Titan',['brute','slam','#3a5a2a,#1a2a10,#80c040,#ffe040','moss,club,horns'],
  'Bog Grotto (Wetlands island)','A moss-covered troll titan with a log club.','Stomps the ground — shockwave rings.');
CH('boss','Island guardians','boss_isl_3','Lava Colossus',['golem','slam','#6a2a1a,#2a1008,#ff9030,#ffe060','glowcore,columns'],
  'Ember Cave (Highlands island)','A basalt colossus with lava running between its columns.','Heavy stomps that shake the cave.');
CH('boss','Island guardians','boss_isl_4','Frost Lord',['caster','cast','#9ad0f0,#3a5a8a,#dff4ff,#2050c0','crown,staff,beard'],
  'Frost Spire (Ashlands island)','An ice-crowned lord in pale blue robes with a frozen staff.','Teleports and strikes with frost.');
// ── bosses · volcano boss rush ──
CH('boss','Volcano boss rush','boss_vr_ember_wraith','Ember Wraith',['wraith','cast','#5a2a1a,#2a1008,#ff9040,#ffe060','flames'],'Boss rush · wave 2','A hooded wraith of smoke with ember eyes.','Drifts at you in swirling sparks.');
CH('boss','Volcano boss rush','boss_vr_magma_spitter','Magma Spitter',['serpent','spit','#a03a1a,#5a1a0a,#ffb040,#ffe060','hood'],'Boss rush · wave 3','A hooded magma cobra.','Spits globs of lava.');
CH('boss','Volcano boss rush','boss_vr_obsidian_golem','Obsidian Golem',['golem','slam','#2a2226,#141014,#b060ff,#ff60ff','crystals'],'Boss rush · wave 4','A glassy black golem with violet crystal shards.','Slow, crushing slams.');
CH('boss','Volcano boss rush','boss_vr_cinder_phoenix','Cinder Phoenix',['bird','dive','#e86020,#8a2a10,#ffd060,#fff0a0','flames,talons'],'Boss rush · wave 5','A blazing phoenix trailing cinders.','Fast swooping dives.');
CH('boss','Volcano boss rush','boss_vr_lava_wyrm','Lava Wyrm',['eel','lunge','#c83a1a,#6a1a0a,#ffc040,#ffe060','lava'],'Boss rush · wave 6','A long lava wyrm rising from the magma.','Lunges out of the lava.');
CH('boss','Volcano boss rush','boss_vr_ashen_knight','Ashen Knight',['biped','lunge','#5a5050,#2a2424,#ff7030,#ff4020','armor,helmet,sword,shield,cape'],'Boss rush · wave 7','A charred knight in ash-grey plate with an ember-red cape.','Charges with sword lunges.');
CH('boss','Volcano boss rush','boss_vr_pyrokraken','Pyrokraken',['kraken','pulse','#8a2a1a,#4a1008,#ffb040,#ffe060',''],'Boss rush · wave 8','A fire kraken with glowing suckers.','Lashes tentacles in fiery rings.');
CH('boss','Volcano boss rush','boss_vr_inferno_wraith','Inferno Wraith',['wraith','cast','#8a2a1a,#3a0a08,#ff6020,#ffe060','flames,crown,chains'],'Boss rush · wave 9','A crowned wraith wreathed in fire and chains.','Hurls fire and drifts through walls of flame.');
CH('boss','Volcano boss rush','boss_volcano_lord','Volcano Lord',['brute','slam','#4a1a10,#1a0806,#ff6020,#ffe060','horns,spikes,glowcore,crown'],'The volcano summit · final wave','A horned magma giant with a molten core and a crown of spikes.','Slams the ground in rings of fire — the final battle.');

// quick lookups used by the game
var CHAR_NPC_FOR_BUILDING={tavern:'npc_tavern',shop:'npc_shop',forge:'npc_forge',guild:'npc_guild',stables:'npc_stables',armory:'npc_armory',clothing:'npc_clothing',jeweler:'npc_jeweler',apothecary:'npc_apothecary',merchant:'npc_merchant'};
var CHAR_BOSS_FOR_MDEF={goblin_king:'boss_goblin_king',swamp_witch:'boss_swamp_witch',rock_dragon:'boss_rock_dragon',lava_titan:'boss_lava_titan',dark_warlock:'boss_dark_warlock',storm_mage:'boss_storm_mage',iron_sentinel:'boss_iron_sentinel',shadow_lord:'boss_shadow_lord',isl_boss_1:'boss_isl_1',isl_boss_2:'boss_isl_2',isl_boss_3:'boss_isl_3',isl_boss_4:'boss_isl_4'};
var CHAR_BOSS_BY_NAME={}; CHAR_ROSTER.forEach(function(R){ if(R.cat==='boss')CHAR_BOSS_BY_NAME[R.name.toUpperCase()]=R.id; });
