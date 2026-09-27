// ═══════════════════════════════════════════════════════════════════════
// ║ TOWER SELECTOR (Phase 2 · C3 look + C2 floor plans)
// ║ Floors are laid out like a house: mostly rooms with open space, short
// ║ hallways, furniture you walk around. 3 hand-made floor plans; every
// ║ style re-furnishes them with its own look. No monsters.
// ═══════════════════════════════════════════════════════════════════════

// ── Floor plans (interior coordinates; the builder adds walls + a 2-tile exterior band)
// rooms: {x,y,w,h,type,shape?}  carve: extra floor rects (halls, doors)  entry: [x,y] door on the south wall
var TOWER_PLANS={
  grand:{ w:36,h:26, name:'Grand floor (9 rooms around an atrium)',
    rooms:[
      {x:1,y:1,w:10,h:9,type:'library'},{x:12,y:1,w:12,h:6,type:'study'},{x:25,y:1,w:10,h:9,type:'bedroom'},
      {x:1,y:11,w:10,h:6,type:'gallery'},{x:12,y:8,w:12,h:10,type:'atrium'},{x:25,y:11,w:10,h:6,type:'dining'},
      {x:1,y:18,w:10,h:7,type:'chapel'},{x:12,y:19,w:12,h:6,type:'hall'},{x:25,y:18,w:10,h:7,type:'music'}],
    carve:[[11,4,1,2],[24,4,1,2],[17,7,2,1],[11,13,1,2],[24,13,1,2],[5,10,2,1],[29,10,2,1],[5,17,2,1],[29,17,2,1],[17,18,2,1],[11,21,1,2],[24,21,1,2]],
    entry:[17,25], stairs:[18,3] },
  gallery:{ w:38,h:24, name:'Long hall (rooms off a central gallery)',
    rooms:[
      {x:1,y:1,w:8,h:9,type:'library'},{x:10,y:1,w:9,h:9,type:'bedroom'},{x:20,y:1,w:8,h:9,type:'study'},{x:29,y:1,w:8,h:9,type:'music'},
      {x:1,y:11,w:36,h:2,type:'corridor'},
      {x:1,y:14,w:11,h:9,type:'dining'},{x:13,y:14,w:12,h:9,type:'atrium'},{x:26,y:14,w:11,h:9,type:'conservatory'}],
    carve:[[4,10,2,1],[14,10,2,1],[23,10,2,1],[32,10,2,1],[6,13,2,1],[18,13,2,1],[31,13,2,1],[9,5,1,2],[28,5,1,2]],
    entry:[18,23], stairs:[23,3] },
  rotunda:{ w:36,h:28, name:'Rotunda (round hall with wings)',
    rooms:[
      {x:9,y:5,w:18,h:18,type:'rotunda',shape:'circle'},
      {x:1,y:1,w:9,h:8,type:'library'},{x:26,y:1,w:9,h:8,type:'bedroom'},
      {x:1,y:19,w:9,h:8,type:'dining'},{x:26,y:19,w:9,h:8,type:'study'},
      {x:13,y:1,w:10,h:3,type:'chapel'},
      {x:1,y:10,w:6,h:8,type:'gallery'},{x:29,y:10,w:6,h:8,type:'conservatory'},
      {x:14,y:24,w:8,h:3,type:'hall'}],
    carve:[[17,4,2,2],[7,13,3,2],[26,13,3,2],[17,22,2,2],[5,9,2,1],[30,9,2,1],[5,18,2,1],[30,18,2,1],[10,4,3,1],[23,4,3,1],[10,23,1,1],[25,23,1,1],[10,20,2,1],[24,20,2,1],[10,6,2,1],[24,6,2,1]],
    entry:[17,27], stairs:[18,2] },
};

var ROOM_NOTES={
  library:'Library — tall shelves, a reading table, a lectern.', study:'Study — desk, map table, candles.',
  bedroom:'Bedroom — canopy bed, wardrobe, nightstands.', gallery:'Gallery — statues and paintings of the tower’s history.',
  atrium:'Atrium — the heart of the floor, open and bright.', dining:'Dining hall — long table and chandelier.',
  chapel:'Shrine — altar, benches, candles.', hall:'Entrance hall — you arrive here from the floor below.',
  music:'Music room — harp and piano.', corridor:'Gallery walk — the long hall that joins every room.',
  conservatory:'Conservatory — glass garden with planters.', rotunda:'Rotunda — a round hall under the dome.'
};

// ── Builder ────────────────────────────────────────────────────────────
var TB={OUT:0,WALL:1,FLOOR:2,WIN:3,GLASS:4,DOOR:5};
// opts: {mirror:bool, shuffle:bool, last:bool}  (the game varies floors with these)
var TOWER_SHUFFLE_TYPES=['library','study','bedroom','gallery','dining','chapel','music','conservatory'];
function towerPlanVariant(P, opts, R){
  if(!opts||(!opts.mirror&&!opts.shuffle))return P;
  var Q=JSON.parse(JSON.stringify(P));
  if(opts.mirror){
    Q.rooms.forEach(function(r){ r.x=P.w-r.x-r.w; });
    Q.carve.forEach(function(c){ c[0]=P.w-c[0]-c[2]; });
    Q.entry=[P.w-P.entry[0]-2,P.entry[1]]; Q.stairs=[P.w-1-P.stairs[0],P.stairs[1]];
  }
  if(opts.shuffle){
    var idx=[]; Q.rooms.forEach(function(r,i){ if(TOWER_SHUFFLE_TYPES.indexOf(r.type)>=0)idx.push(i); });
    var types=idx.map(function(i){return Q.rooms[i].type;});
    for(var k=types.length-1;k>0;k--){ var j=Math.floor(R.f()*(k+1)); var t=types[k]; types[k]=types[j]; types[j]=t; }
    idx.forEach(function(i,n){ Q.rooms[i].type=types[n]; });
  }
  return Q;
}
function buildTower(S, planId, seed, opts){
  opts=opts||{};
  var R=rngOf(seed*977+planId.length*31), P=towerPlanVariant(TOWER_PLANS[planId],opts,R), pad=2;
  var W=P.w+pad*2, H=P.h+pad*2, m=newMap(W,H);
  var cell=new Uint8Array(W*H), room=new Int16Array(W*H).fill(-1);
  var at=function(x,y){return (x<0||y<0||x>=W||y>=H)?TB.OUT:cell[y*W+x];};
  var set=function(x,y,v){ if(x>=0&&y>=0&&x<W&&y<H)cell[y*W+x]=v; };
  // building shell = walls
  for(var y=pad;y<pad+P.h;y++)for(var x=pad;x<pad+P.w;x++)set(x,y,TB.WALL);
  // rooms
  P.rooms.forEach(function(r,ri){
    for(var yy=0;yy<r.h;yy++)for(var xx=0;xx<r.w;xx++){
      if(r.shape==='circle'){ var cx=(r.w-1)/2, cy=(r.h-1)/2; if(Math.hypot((xx-cx)/(r.w/2),(yy-cy)/(r.h/2))>0.98)continue; }
      var X=r.x+xx+pad, Y=r.y+yy+pad; set(X,Y,TB.FLOOR); room[Y*W+X]=ri;
    }
  });
  P.carve.forEach(function(c){ for(var yy=0;yy<c[3];yy++)for(var xx=0;xx<c[2];xx++){ var X=c[0]+xx+pad,Y=c[1]+yy+pad; if(at(X,Y)===TB.WALL)set(X,Y,TB.DOOR); } });
  var ex=P.entry[0]+pad, ey=P.entry[1]+pad; set(ex,ey,TB.DOOR); set(ex+1,ey,TB.DOOR);
  var isOpen=function(x,y){var v=at(x,y);return v===TB.FLOOR||v===TB.DOOR;};
  // windows on outer walls
  for(var y2=0;y2<H;y2++)for(var x2=0;x2<W;x2++){
    if(at(x2,y2)!==TB.WALL)continue;
    var outer=(at(x2-1,y2)===TB.OUT||at(x2+1,y2)===TB.OUT||at(x2,y2-1)===TB.OUT||at(x2,y2+1)===TB.OUT);
    if(!outer)continue;
    var inside=isOpen(x2,y2+1)||isOpen(x2,y2-1)||isOpen(x2-1,y2)||isOpen(x2+1,y2);
    if(!inside)continue;
    var along=(at(x2,y2-1)===TB.OUT||at(x2,y2+1)===TB.OUT)?x2:y2;
    if(along%S.windowEvery===0&&!(isOpen(x2-1,y2)&&isOpen(x2+1,y2)))set(x2,y2,TB.WIN);
  }
  // interior glass partitions (per room pair)
  var pairGlass={};
  for(var y3=0;y3<H;y3++)for(var x3=0;x3<W;x3++){
    if(at(x3,y3)!==TB.WALL)continue;
    var a=-1,b=-1;
    if(isOpen(x3,y3-1)&&isOpen(x3,y3+1)){a=room[(y3-1)*W+x3];b=room[(y3+1)*W+x3];}
    else if(isOpen(x3-1,y3)&&isOpen(x3+1,y3)){a=room[y3*W+x3-1];b=room[y3*W+x3+1];}
    if(a<0||b<0||a===b)continue;
    var key=Math.min(a,b)+'_'+Math.max(a,b);
    if(pairGlass[key]===undefined)pairGlass[key]=R.chance(S.glass||0);
    if(pairGlass[key]&&!(at(x3-1,y3)===TB.DOOR||at(x3+1,y3)===TB.DOOR||at(x3,y3-1)===TB.DOOR||at(x3,y3+1)===TB.DOOR))set(x3,y3,TB.GLASS);
  }
  for(var i=0;i<W*H;i++)m.solid[i]=(cell[i]===TB.FLOOR||cell[i]===TB.DOOR)?0:1;
  m.spawn={x:(ex+1)*LT, y:(ey-1)*LT+LT-4};
  m.bg=S.pal.outside||'#9cc6e8';
  // ── furniture plan (solid cells decided before painting) ──
  var items=[];   // {type,x,y,w,h,room}
  var occupied=new Uint8Array(W*H);
  var reachOK=function(){
    var seen=floodReach(m,Math.floor(m.spawn.x/LT),Math.floor(m.spawn.y/LT)), n=0, open=0;
    for(var k=0;k<W*H;k++){ if(!m.solid[k]){ open++; if(seen[k])n++; } }
    return n===open;
  };
  var nearDoor=function(x,y){ for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){ if(at(x+dx,y+dy)===TB.DOOR)return true; } return false; };
  // Keep the stairs (and the cells around them) free of furniture so the way up is always walkable.
  var stX=P.stairs[0]+pad, stY=P.stairs[1]+pad;
  var nearStairs=function(x,y){ return Math.abs(x-stX)<=1&&Math.abs(y-stY)<=1; };
  var tryPlace=function(type,x,y,w,h,ri,solid){
    var flat=solid===false;
    for(var yy=0;yy<h;yy++)for(var xx=0;xx<w;xx++){ var X=x+xx,Y=y+yy; if(at(X,Y)!==TB.FLOOR||room[Y*W+X]!==ri)return false; if(nearStairs(X,Y))return false; if(!flat&&(occupied[Y*W+X]||nearDoor(X,Y)))return false; }
    if(flat){ items.push({type:type,x:x,y:y,w:w,h:h,room:ri,solid:false}); return true; }
    if(solid!==false){
      for(var yy2=0;yy2<h;yy2++)for(var xx2=0;xx2<w;xx2++)m.solid[(y+yy2)*W+x+xx2]=1;
      if(!reachOK()){ for(var yy3=0;yy3<h;yy3++)for(var xx3=0;xx3<w;xx3++)m.solid[(y+yy3)*W+x+xx3]=0; return false; }
    }
    for(var yy4=0;yy4<h;yy4++)for(var xx4=0;xx4<w;xx4++)occupied[(y+yy4)*W+x+xx4]=1;
    items.push({type:type,x:x,y:y,w:w,h:h,room:ri,solid:solid!==false}); return true;
  };
  P.rooms.forEach(function(r,ri){
    var rx=r.x+pad, ry=r.y+pad, rw=r.w, rh=r.h, cx=rx+Math.floor(rw/2), cy=ry+Math.floor(rh/2);
    var alongNorth=function(type,w,h,step,solid){ for(var x=rx+1;x+w<=rx+rw-1;x+=step){ if(at(x,ry-1)===TB.WALL||at(x,ry-1)===TB.WIN)tryPlace(type,x,ry,w,h,ri,solid); } };
    var corners=function(type){ [[rx,ry],[rx+rw-1,ry],[rx,ry+rh-1],[rx+rw-1,ry+rh-1]].forEach(function(c){ tryPlace(type,c[0],c[1],1,1,ri); }); };
    var rug=function(w,h){ tryPlace('rug',cx-Math.floor(w/2),cy-Math.floor(h/2),w,h,ri,false); };
    switch(r.type){
      case 'library': alongNorth('bookshelf',2,1,2); rug(4,3); tryPlace('table',cx-1,cy,2,1,ri); tryPlace('chair',cx-2,cy,1,1,ri); tryPlace('chair',cx+1,cy,1,1,ri); tryPlace('lectern',rx+1,ry+rh-2,1,1,ri); corners('plant'); break;
      case 'study': tryPlace('desk',cx-1,ry+1,2,1,ri); tryPlace('chair',cx,ry+2,1,1,ri); tryPlace('bookshelf',rx+1,ry,2,1,ri); tryPlace('globe',rx+rw-2,ry+1,1,1,ri); tryPlace('maptable',cx-1,ry+rh-2,3,1,ri); tryPlace('candelabra',rx,ry+rh-1,1,1,ri); break;
      case 'bedroom': tryPlace('bed',cx-1,ry,2,3,ri); tryPlace('nightstand',cx-2,ry,1,1,ri); tryPlace('nightstand',cx+1,ry,1,1,ri); tryPlace('wardrobe',rx,ry,2,1,ri); rug(3,2); tryPlace('chair',rx+rw-2,ry+rh-2,1,1,ri); tryPlace('plant',rx+rw-1,ry,1,1,ri); break;
      case 'dining': var tl=Math.min(6,rw-4); tryPlace('longtable',cx-Math.floor(tl/2),cy-1,tl,2,ri); for(var c1=0;c1<tl;c1+=2){ tryPlace('chair',cx-Math.floor(tl/2)+c1,cy-2,1,1,ri); tryPlace('chair',cx-Math.floor(tl/2)+c1,cy+1,1,1,ri);} alongNorth('sideboard',2,1,4); items.push({type:'chandelier',x:cx,y:cy,w:0,h:0,room:ri,solid:false}); break;
      case 'chapel': tryPlace('altar',cx-1,ry,2,1,ri); for(var pr=ry+2;pr<ry+rh-1;pr+=2){ tryPlace('pew',rx+1,pr,Math.max(2,Math.floor(rw/2)-2),1,ri); tryPlace('pew',cx+1,pr,Math.max(2,Math.floor(rw/2)-2),1,ri);} tryPlace('candelabra',cx-2,ry,1,1,ri); tryPlace('candelabra',cx+1,ry,1,1,ri); break;
      case 'gallery': for(var gx=rx+1;gx<rx+rw-1;gx+=3){ tryPlace('statue',gx,ry,1,1,ri); tryPlace('statue',gx,ry+rh-1,1,1,ri);} tryPlace('bench',cx-1,cy,2,1,ri); break;
      case 'music': tryPlace('piano',rx+1,ry+1,3,2,ri); tryPlace('harp',rx+rw-2,ry+1,1,1,ri); rug(4,3); tryPlace('chair',cx,cy+1,1,1,ri); tryPlace('chair',cx-2,cy+1,1,1,ri); corners('plant'); break;
      case 'conservatory': for(var py=ry+1;py<ry+rh-1;py+=3)for(var px=rx+1;px<rx+rw-1;px+=3)tryPlace(R.chance(0.35)?'tree':'planter',px,py,1,1,ri); tryPlace('pool',cx-1,cy,2,2,ri); break;
      case 'hall': tryPlace('runner',cx-1,ry,2,rh,ri,false); tryPlace('statue',cx-3,ry,1,1,ri); tryPlace('statue',cx+2,ry,1,1,ri); tryPlace('bench',rx+1,cy,2,1,ri); tryPlace('bench',rx+rw-3,cy,2,1,ri); corners('plant'); break;
      case 'corridor': for(var hx=rx+2;hx<rx+rw-2;hx+=6)tryPlace('plant',hx,ry,1,1,ri); tryPlace('runner',rx,ry+1,rw,1,ri,false); break;
      case 'atrium': case 'rotunda':
        var cs=S.center||'fountain', sz=cs==='orrery'||cs==='pool'?4:3;
        tryPlace('center_'+cs,cx-Math.floor(sz/2),cy-Math.floor(sz/2),sz,sz,ri);
        [[rx+1,ry+1],[rx+rw-2,ry+1],[rx+1,ry+rh-2],[rx+rw-2,ry+rh-2]].forEach(function(c){ tryPlace(S.pillar||'pillar',c[0],c[1],1,1,ri); });
        tryPlace('bench',cx-1,ry+rh-2,2,1,ri); tryPlace('bench',cx-1,ry+1,2,1,ri);
        break;
    }
  });
  // stairs up (walkable marker)
  var st=P.stairs; if(!opts.last)items.push({type:'stairs',x:st[0]+pad,y:st[1]+pad,w:1,h:1,solid:false,room:-1});
  m.site={entry:{x:ex,y:ey}, exit:{x:st[0]+pad,y:st[1]+pad}};
  // ── paint ──
  var cv=mkCanvas(W*LT,H*LT), ctx=cv.getContext('2d');
  S.paintExterior(ctx,W,H,m,R);
  var roomType=function(x,y){ var ri=room[y*W+x]; return ri>=0?P.rooms[ri].type:'hall'; };
  for(var y4=0;y4<H;y4++)for(var x4=0;x4<W;x4++){
    var v=at(x4,y4); if(v===TB.OUT)continue;
    if(v===TB.FLOOR||v===TB.DOOR||v===TB.GLASS){
      var rt=v===TB.GLASS?'hall':(v===TB.DOOR?(roomType(x4,y4-1)||'hall'):roomType(x4,y4));
      S.floor(ctx,x4*LT,y4*LT,x4,y4,rt,R);
      if(v===TB.DOOR){ ctx.fillStyle=rgba(S.pal.trim,0.55); ctx.fillRect(x4*LT,y4*LT+LT/2-2,LT,4); }
    }
  }
  // room-level floor accents (medallions etc.)
  P.rooms.forEach(function(r){ if(S.roomAccent)S.roomAccent(ctx,(r.x+pad)*LT,(r.y+pad)*LT,r.w*LT,r.h*LT,r.type,R,r); });
  // ambient occlusion under walls
  for(var y5=0;y5<H;y5++)for(var x5=0;x5<W;x5++){
    var v5=at(x5,y5); if(v5!==TB.FLOOR&&v5!==TB.DOOR)continue;
    if(at(x5,y5-1)===TB.WALL||at(x5,y5-1)===TB.WIN){ var g=ctx.createLinearGradient(0,y5*LT,0,y5*LT+14); g.addColorStop(0,'rgba(0,0,0,'+(S.ao||0.22)+')'); g.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=g; ctx.fillRect(x5*LT,y5*LT,LT,14); }
    if(at(x5-1,y5)===TB.WALL||at(x5-1,y5)===TB.WIN){ var g2=ctx.createLinearGradient(x5*LT,0,x5*LT+8,0); g2.addColorStop(0,'rgba(0,0,0,'+((S.ao||0.22)*0.6)+')'); g2.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=g2; ctx.fillRect(x5*LT,y5*LT,8,LT); }
  }
  // flat furniture (rugs, runners, pools…) before walls & tall pieces
  items.forEach(function(it){ if(TOWER_FLAT[it.type])TOWER_FLAT[it.type](ctx,it.x*LT,it.y*LT,it.w*LT,it.h*LT,S,R); });
  // walls, windows, glass
  for(var y6=0;y6<H;y6++)for(var x6=0;x6<W;x6++){
    var v6=at(x6,y6); if(v6!==TB.WALL&&v6!==TB.WIN&&v6!==TB.GLASS)continue;
    var faceVisible=isOpen(x6,y6+1);
    var outN=at(x6,y6-1)===TB.OUT, outS=at(x6,y6+1)===TB.OUT, outW=at(x6-1,y6)===TB.OUT, outE=at(x6+1,y6)===TB.OUT;
    if(v6===TB.GLASS)towerGlass(ctx,x6*LT,y6*LT,S,faceVisible);
    else towerWall(ctx,x6*LT,y6*LT,S,faceVisible,v6===TB.WIN,{n:outN,s:outS,w:outW,e:outE},R,m);
  }
  // crisp edges where walls meet walkable floor (reads as solid mass in 3/4 view)
  ctx.lineWidth=2; ctx.strokeStyle=rgba(shade(S.pal.wallFace,-0.55),0.55);
  for(var y7=0;y7<H;y7++)for(var x7=0;x7<W;x7++){
    var v7=at(x7,y7); if(v7!==TB.WALL&&v7!==TB.WIN)continue;
    var px7=x7*LT, py7=y7*LT; ctx.beginPath();
    if(isOpen(x7,y7+1)){ctx.moveTo(px7,py7+LT);ctx.lineTo(px7+LT,py7+LT);}
    if(isOpen(x7,y7-1)){ctx.moveTo(px7,py7+1);ctx.lineTo(px7+LT,py7+1);}
    if(isOpen(x7-1,y7)){ctx.moveTo(px7+1,py7);ctx.lineTo(px7+1,py7+LT);}
    if(isOpen(x7+1,y7)){ctx.moveTo(px7+LT-1,py7);ctx.lineTo(px7+LT-1,py7+LT);}
    ctx.stroke();
  }
  // tall / raised furniture become sprites
  items.forEach(function(it){
    var fn=TOWER_TALL[it.type]; if(!fn)return;
    fn(m,it.x*LT,it.y*LT,it.w*LT,it.h*LT,S,R);
  });
  // labels
  P.rooms.forEach(function(r){ addLabel(m,r.x+pad,r.y+pad,r.w,r.h,ROOM_NOTES[r.type]||r.type); });
  items.forEach(function(it){ if(TOWER_LABEL[it.type])addLabel(m,it.x,it.y,Math.max(1,it.w),Math.max(1,it.h),TOWER_LABEL[it.type](S)); });
  if(S.extra)S.extra(m,ctx,W,H,R,{cell:cell,room:room,at:at,items:items,pad:pad,plan:P});
  if(S.particles)S.particles.forEach(function(p){ m.particles.push(Object.assign({area:{x:pad*LT,y:pad*LT,w:P.w*LT,h:P.h*LT}},p)); });
  m.base=cv;
  m.stats={rooms:P.rooms.length,plan:P.name};
  return m;
}

// ── Walls ──────────────────────────────────────────────────────────────
function towerWall(ctx,x,y,S,face,win,out,R,m){
  var p=S.pal, top=face?9:LT;
  // top face
  var g=ctx.createLinearGradient(x,y,x,y+top); g.addColorStop(0,shade(p.wallTop,0.12)); g.addColorStop(1,p.wallTop);
  ctx.fillStyle=g; ctx.fillRect(x,y,LT,top);
  ctx.fillStyle=rgba(p.trim,0.55); ctx.fillRect(x,y+top-1.5,LT,1.5);
  if(face){
    var fh=LT-top, g2=ctx.createLinearGradient(x,y+top,x,y+LT);
    g2.addColorStop(0,shade(p.wallFace,-0.04)); g2.addColorStop(1,shade(p.wallFace,-0.24));
    ctx.fillStyle=g2; ctx.fillRect(x,y+top,LT,fh);
    // base trim
    ctx.fillStyle=shade(p.trim,-0.1); ctx.fillRect(x,y+LT-3,LT,3);
    if(S.wallDetail)S.wallDetail(ctx,x,y+top,LT,fh,R);
    if(win){
      if(S.windowFace)S.windowFace(ctx,x,y+top,LT,fh,R);
      else towerWindowArch(ctx,x+7,y+top+2,LT-14,fh-6,S);
      // light shaft falling onto the floor below (north-wall windows)
      if(out.n)towerShaft(m,x,y+LT,S,R);
    }
  } else if(win){
    // window seen from above on a side wall: a luminous slit
    var gg=ctx.createLinearGradient(x,y,x+LT,y); gg.addColorStop(0,rgba(S.pal.glassA,0.9)); gg.addColorStop(1,rgba(S.pal.glassB,0.9));
    ctx.fillStyle=gg; if(out.w||out.e)ctx.fillRect(x+LT/2-4,y+4,8,LT-8); else ctx.fillRect(x+4,y+LT/2-4,LT-8,8);
    if(out.w||out.e){ var sx=out.w?x+LT:x-LT*2; addLight(m,out.w?x+LT+20:x-20,y+LT/2,46,S.pal.light,0.22,{depth:-4,noCut:true}); }
  }
}
function towerWindowArch(ctx,x,y,w,h,S){
  var p=S.pal;
  ctx.fillStyle=shade(p.trim,-0.15); rr(ctx,x-2,y-1,w+4,h+2,w/2); ctx.fill();
  var g=ctx.createLinearGradient(x,y,x,y+h); g.addColorStop(0,p.glassA); g.addColorStop(1,p.glassB);
  ctx.fillStyle=g; rr(ctx,x,y,w,h,w/2-1); ctx.fill();
  ctx.strokeStyle=rgba(p.trim,0.9); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x+w/2,y+2); ctx.lineTo(x+w/2,y+h); ctx.moveTo(x,y+h*0.55); ctx.lineTo(x+w,y+h*0.55); ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,0.45)'; ctx.fillRect(x+2,y+4,2,h*0.4);
}
function towerShaft(m,x,y,S,R){
  var len=LT*(3.2+R.f()*1.2), w=LT*1.3, skew=S.shaftSkew===undefined?14:S.shaftSkew;
  var c=mkCanvas(w+Math.abs(skew)+4,len), ctx=c.getContext('2d');
  var g=ctx.createLinearGradient(0,0,0,len); g.addColorStop(0,rgba(S.pal.light,0.8)); g.addColorStop(1,rgba(S.pal.light,0));
  ctx.fillStyle=g; ctx.beginPath(); var o=skew<0?-skew:0;
  ctx.moveTo(o+6,0); ctx.lineTo(o+w-6,0); ctx.lineTo(o+w+skew,len); ctx.lineTo(o+skew,len); ctx.closePath(); ctx.fill();
  m.shafts.push({canvas:c,x:x-2-o+ (LT-w)/2,y:y,a:S.shaftA||0.34,sway:true});
}
function towerGlass(ctx,x,y,S,face){
  var p=S.pal;
  ctx.fillStyle=rgba(p.glassA,0.35); ctx.fillRect(x+2,y,LT-4,LT);
  ctx.fillStyle=rgba('#ffffff',0.5); ctx.fillRect(x+5,y+3,2,LT-10);
  ctx.strokeStyle=rgba(p.trim,0.85); ctx.lineWidth=2; ctx.strokeRect(x+2,y+1,LT-4,LT-2);
  if(face){ ctx.fillStyle=rgba(p.glassB,0.25); ctx.fillRect(x+2,y+LT-8,LT-4,8); }
}

// ── Furniture painters ─────────────────────────────────────────────────
// Flat pieces go on the base canvas; tall pieces become depth-sorted sprites.
var TOWER_FLAT={
  rug:function(ctx,x,y,w,h,S){ var p=S.pal; rr(ctx,x+4,y+4,w-8,h-8,6); ctx.fillStyle=p.fabric; ctx.fill(); ctx.strokeStyle=p.fabric2; ctx.lineWidth=3; rr(ctx,x+9,y+9,w-18,h-18,4); ctx.stroke(); ctx.fillStyle=rgba(p.fabric2,0.5); ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2,w/6,h/6,0,0,Math.PI*2); ctx.fill(); },
  runner:function(ctx,x,y,w,h,S){ var p=S.pal; ctx.fillStyle=p.fabric; ctx.fillRect(x+6,y,w-12,h); ctx.fillStyle=p.fabric2; ctx.fillRect(x+8,y,2,h); ctx.fillRect(x+w-10,y,2,h); if(w>h){ ctx.fillStyle=p.fabric; ctx.fillRect(x,y+6,w,h-12); ctx.fillStyle=p.fabric2; ctx.fillRect(x,y+8,w,2); ctx.fillRect(x,y+h-10,w,2);} },
  pool:function(ctx,x,y,w,h,S){ var p=S.pal; rr(ctx,x+2,y+2,w-4,h-4,8); ctx.fillStyle=shade(p.trim,-0.2); ctx.fill(); rr(ctx,x+5,y+5,w-10,h-10,6); var g=ctx.createLinearGradient(x,y,x+w,y+h); g.addColorStop(0,p.water||'#7ec8f0'); g.addColorStop(1,shade(p.water||'#7ec8f0',-0.3)); ctx.fillStyle=g; ctx.fill(); ctx.fillStyle='rgba(255,255,255,.35)'; ctx.fillRect(x+9,y+9,w*0.4,2); },
  stairs:function(ctx,x,y,w,h,S){ var p=S.pal; for(var i=0;i<5;i++){ ctx.fillStyle=shade(p.floorA,-0.05*i-0.05); ctx.fillRect(x+2,y+2+i*5.5,LT-4,5); ctx.fillStyle=rgba('#ffffff',0.25); ctx.fillRect(x+2,y+2+i*5.5,LT-4,1);} ctx.fillStyle=rgba(p.accent,0.9); ctx.font='bold 9px sans-serif'; ctx.textAlign='center'; ctx.fillText('▲',x+LT/2,y+LT-2); },
  table:function(ctx,x,y,w,h,S){ towerTableTop(ctx,x,y,w,h,S,0); },
  longtable:function(ctx,x,y,w,h,S){ towerTableTop(ctx,x,y,w,h,S,1); },
  desk:function(ctx,x,y,w,h,S){ towerTableTop(ctx,x,y,w,h,S,2); },
  maptable:function(ctx,x,y,w,h,S){ towerTableTop(ctx,x,y,w,h,S,3); },
  sideboard:function(ctx,x,y,w,h,S){ towerTableTop(ctx,x,y,w,h,S,4); },
  bench:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-4,w/2,5,0.25); ctx.fillStyle=shade(p.wood,-0.1); ctx.fillRect(x+3,y+10,w-6,10); ctx.fillStyle=p.wood; ctx.fillRect(x+3,y+8,w-6,7); ctx.fillStyle=p.fabric; ctx.fillRect(x+5,y+9,w-10,4); },
  pew:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-4,w/2,5,0.25); ctx.fillStyle=shade(p.wood,-0.25); ctx.fillRect(x+2,y+4,w-4,6); ctx.fillStyle=p.wood; ctx.fillRect(x+2,y+10,w-4,12); ctx.fillStyle=shade(p.wood,0.15); ctx.fillRect(x+2,y+10,w-4,2); },
  chair:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+16,y+26,9,4,0.25); ctx.fillStyle=shade(p.wood,-0.2); ctx.fillRect(x+9,y+6,14,5); ctx.fillStyle=p.wood; rr(ctx,x+9,y+11,14,13,3); ctx.fill(); ctx.fillStyle=p.fabric; rr(ctx,x+11,y+13,10,8,2); ctx.fill(); },
  nightstand:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+16,y+27,10,4,0.25); ctx.fillStyle=p.wood; rr(ctx,x+7,y+10,18,16,2); ctx.fill(); ctx.fillStyle=shade(p.wood,0.18); ctx.fillRect(x+7,y+10,18,4); glowSpot(ctx,x+16,y+10,10,p.light,0.5); ctx.fillStyle=p.light; ctx.beginPath(); ctx.arc(x+16,y+10,3,0,Math.PI*2); ctx.fill(); },
  bed:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-4,w/2,8,0.3); ctx.fillStyle=shade(p.wood,-0.1); rr(ctx,x+3,y+2,w-6,h-4,4); ctx.fill(); ctx.fillStyle=p.wood; ctx.fillRect(x+3,y+2,w-6,10); ctx.fillStyle='#f6f4ee'; rr(ctx,x+7,y+12,w-14,12,4); ctx.fill(); var g=ctx.createLinearGradient(x,y+24,x,y+h); g.addColorStop(0,p.fabric); g.addColorStop(1,shade(p.fabric,-0.2)); ctx.fillStyle=g; rr(ctx,x+5,y+24,w-10,h-30,5); ctx.fill(); ctx.strokeStyle=p.fabric2; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+6,y+34); ctx.lineTo(x+w-6,y+34); ctx.stroke(); },
  altar:function(ctx,x,y,w,h,S){ var p=S.pal; softShadow(ctx,x+w/2,y+h-3,w/2,5,0.3); ctx.fillStyle=shade(p.wallFace,0.1); rr(ctx,x+3,y+8,w-6,20,3); ctx.fill(); ctx.fillStyle=p.fabric; ctx.fillRect(x+w/2-6,y+8,12,20); ctx.fillStyle=p.accent; ctx.beginPath(); ctx.arc(x+w/2,y+6,5,0,Math.PI*2); ctx.fill(); glowSpot(ctx,x+w/2,y+6,20,p.light,0.5); },
  center_fountain:function(ctx,x,y,w,h,S){ var p=S.pal, cx=x+w/2, cy=y+h/2; softShadow(ctx,cx,cy+6,w/2,h/2.4,0.25); ctx.fillStyle=shade(p.trim,-0.1); ctx.beginPath(); ctx.arc(cx,cy,w/2-2,0,Math.PI*2); ctx.fill(); var g=ctx.createRadialGradient(cx,cy,4,cx,cy,w/2-6); g.addColorStop(0,shade(p.water||'#8fd3f5',0.3)); g.addColorStop(1,p.water||'#6bb8e0'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,w/2-6,0,Math.PI*2); ctx.fill(); ctx.fillStyle=p.wallTop; ctx.beginPath(); ctx.arc(cx,cy,8,0,Math.PI*2); ctx.fill(); },
  center_pool:function(ctx,x,y,w,h,S){ TOWER_FLAT.pool(ctx,x,y,w,h,S); },
  center_starmap:function(ctx,x,y,w,h,S,R){ var p=S.pal, cx=x+w/2, cy=y+h/2; ctx.fillStyle='#0c1636'; ctx.beginPath(); ctx.arc(cx,cy,w/2-2,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=p.accent; ctx.lineWidth=2; ctx.stroke(); for(var i=0;i<40;i++){ var a=R.f()*Math.PI*2, r=R.f()*(w/2-6); ctx.fillStyle='rgba(255,255,255,'+(0.4+R.f()*0.6)+')'; ctx.fillRect(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.5,1.5);} ctx.strokeStyle=rgba(p.accent,0.6); ctx.lineWidth=1; ctx.beginPath(); for(var j=0;j<6;j++){ var a2=j/6*Math.PI*2; ctx.lineTo(cx+Math.cos(a2)*w*0.3,cy+Math.sin(a2)*h*0.3);} ctx.closePath(); ctx.stroke(); },
};
function towerTableTop(ctx,x,y,w,h,S,kind){
  var p=S.pal; softShadow(ctx,x+w/2,y+h-2,w/2,7,0.28);
  ctx.fillStyle=shade(p.wood,-0.25); rr(ctx,x+3,y+8,w-6,h-8,3); ctx.fill();
  var g=ctx.createLinearGradient(x,y+4,x,y+h-4); g.addColorStop(0,shade(p.wood,0.15)); g.addColorStop(1,p.wood);
  ctx.fillStyle=g; rr(ctx,x+3,y+4,w-6,h-10,3); ctx.fill();
  if(kind===1){ ctx.fillStyle=p.fabric2; ctx.fillRect(x+6,y+h/2-4,w-12,4); for(var i=x+14;i<x+w-10;i+=28){ ctx.fillStyle='#eef'; ctx.beginPath(); ctx.arc(i,y+h/2-2,3,0,Math.PI*2); ctx.fill(); } }
  if(kind===2){ ctx.fillStyle='#f4f0e2'; ctx.fillRect(x+10,y+8,12,9); ctx.fillStyle=p.accent; ctx.fillRect(x+w-16,y+7,3,8); }
  if(kind===3){ ctx.fillStyle='#e8dcb4'; ctx.fillRect(x+8,y+7,w-16,h-16); ctx.strokeStyle='rgba(90,70,40,.6)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x+12,y+12); ctx.bezierCurveTo(x+w/2,y+6,x+w/2,y+18,x+w-12,y+10); ctx.stroke(); }
  if(kind===4){ ctx.fillStyle=p.fabric2; ctx.fillRect(x+8,y+8,6,6); ctx.fillStyle=p.accent; ctx.fillRect(x+w-14,y+7,5,7); }
}
function towerSpriteBox(m,x,y,w,h,fn){ addSprite(m,x+w/2,y+h,w+8,h+48,function(ctx,cw,ch){ ctx.translate(4,48); fn(ctx,w,h); }); }
var TOWER_TALL={
  bookshelf:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ var top=-34; ctx.fillStyle=shade(p.wood,-0.3); ctx.fillRect(0,top,w,h-top); ctx.fillStyle=p.wood; ctx.fillRect(2,top+2,w-4,h-top-6); var cols=['#7a3b3b','#3b5a7a','#6a7a3b','#8a6a2a','#5a3b7a','#2f6f6f','#c8b27a']; for(var s=0;s<4;s++){ var sy=top+4+s*13; ctx.fillStyle=shade(p.wood,-0.35); ctx.fillRect(3,sy+10,w-6,2); for(var bx=4;bx<w-6;){ var bw=3+(bx*7+s*3)%4, bh=7+(bx+s)%3; ctx.fillStyle=cols[(bx+s*5)%cols.length]; ctx.fillRect(bx,sy+10-bh,bw,bh); bx+=bw+1; } } ctx.fillStyle=shade(p.wood,0.2); ctx.fillRect(0,top,w,3); }); },
  wardrobe:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ var top=-36; ctx.fillStyle=shade(p.wood,-0.2); rr(ctx,0,top,w,h-top,3); ctx.fill(); ctx.fillStyle=p.wood; ctx.fillRect(3,top+4,w/2-4,h-top-8); ctx.fillRect(w/2+1,top+4,w/2-4,h-top-8); ctx.fillStyle=p.accent; ctx.fillRect(w/2-3,top+26,2,6); ctx.fillRect(w/2+1,top+26,2,6); ctx.fillStyle=shade(p.wood,0.2); ctx.fillRect(0,top,w,3); }); },
  lectern:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,10,4,0.3); ctx.fillStyle=shade(p.wood,-0.2); ctx.fillRect(w/2-3,h-26,6,22); ctx.fillStyle=p.wood; ctx.beginPath(); ctx.moveTo(w/2-12,h-24); ctx.lineTo(w/2+12,h-28); ctx.lineTo(w/2+12,h-20); ctx.lineTo(w/2-12,h-16); ctx.fill(); ctx.fillStyle='#f5efd9'; ctx.fillRect(w/2-9,h-25,8,6); ctx.fillRect(w/2+1,h-26,8,6); }); },
  globe:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,9,3,0.3); ctx.fillStyle=p.metal; ctx.fillRect(w/2-2,h-18,4,14); ctx.fillStyle='#5fa0c8'; ctx.beginPath(); ctx.arc(w/2,h-26,10,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#8cbf6a'; ctx.beginPath(); ctx.ellipse(w/2-3,h-28,4,6,0.5,0,Math.PI*2); ctx.fill(); ctx.strokeStyle=p.metal; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(w/2,h-26,12,Math.PI*0.2,Math.PI*1.2); ctx.stroke(); }); },
  candelabra:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,8,3,0.3); ctx.fillStyle=p.metal; ctx.fillRect(w/2-1.5,h-34,3,30); ctx.fillRect(w/2-10,h-32,20,2); [-9,0,9].forEach(function(o){ ctx.fillStyle='#f6f0dc'; ctx.fillRect(w/2+o-1.5,h-40,3,8); ctx.fillStyle='#ffd27a'; ctx.beginPath(); ctx.ellipse(w/2+o,h-43,2,3.5,0,0,Math.PI*2); ctx.fill(); }); }); addLight(m,x+w/2,y+h-42,70,'#ffcf80',0.45,{flicker:0.35,depth:y+h+1}); },
  statue:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,12,4,0.3); ctx.fillStyle=shade(p.statue||p.wallTop,-0.15); ctx.fillRect(w/2-11,h-12,22,10); var g=ctx.createLinearGradient(0,h-52,0,h-12); g.addColorStop(0,shade(p.statue||p.wallTop,0.15)); g.addColorStop(1,shade(p.statue||p.wallTop,-0.1)); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(w/2-7,h-12); ctx.lineTo(w/2-5,h-38); ctx.lineTo(w/2+5,h-38); ctx.lineTo(w/2+7,h-12); ctx.fill(); ctx.beginPath(); ctx.arc(w/2,h-43,6,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.moveTo(w/2+5,h-36); ctx.lineTo(w/2+14,h-50); ctx.lineTo(w/2+12,h-52); ctx.lineTo(w/2+3,h-40); ctx.fill(); }); },
  pillar:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,13,4,0.3); ctx.fillStyle=shade(p.wallTop,-0.12); ctx.fillRect(w/2-12,h-8,24,6); var g=ctx.createLinearGradient(w/2-9,0,w/2+9,0); g.addColorStop(0,shade(p.wallTop,-0.12)); g.addColorStop(0.45,shade(p.wallTop,0.2)); g.addColorStop(1,shade(p.wallTop,-0.2)); ctx.fillStyle=g; ctx.fillRect(w/2-9,h-60,18,52); ctx.fillStyle=rgba(p.trim,0.8); ctx.fillRect(w/2-11,h-64,22,5); for(var i=-6;i<=6;i+=4){ ctx.fillStyle='rgba(0,0,0,.07)'; ctx.fillRect(w/2+i,h-58,1,48);} }); },
  plant:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,9,3,0.3); ctx.fillStyle=p.pot||shade(p.wallFace,-0.15); rr(ctx,w/2-7,h-14,14,11,3); ctx.fill(); for(var i=0;i<9;i++){ var a=-Math.PI/2+(i-4)*0.32; ctx.strokeStyle=i%2?p.plant:shade(p.plant,0.2); ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(w/2,h-13); ctx.quadraticCurveTo(w/2+Math.cos(a)*8,h-22,w/2+Math.cos(a)*14,h-13+Math.sin(a)*22); ctx.stroke(); } }); },
  planter:function(m,x,y,w,h,S){ TOWER_TALL.plant(m,x,y,w,h,S); },
  tree:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,70,90,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-4,16,5,0.3); ctx.fillStyle=p.bark||'#e8e2d4'; ctx.fillRect(cw/2-4,ch-40,8,36); for(var i=0;i<14;i++){ var a=i/14*Math.PI*2; ctx.fillStyle=i%3?p.plant:shade(p.plant,0.25); ctx.beginPath(); ctx.arc(cw/2+Math.cos(a)*16,ch-52+Math.sin(a)*12,11,0,Math.PI*2); ctx.fill(); } ctx.fillStyle=shade(p.plant,0.3); ctx.beginPath(); ctx.arc(cw/2-4,ch-58,10,0,Math.PI*2); ctx.fill(); }); },
  harp:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,9,3,0.3); ctx.strokeStyle=p.accent; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(w/2-8,h-4); ctx.lineTo(w/2-8,h-46); ctx.quadraticCurveTo(w/2+12,h-44,w/2+8,h-8); ctx.closePath(); ctx.stroke(); ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=0.7; for(var i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(w/2-8,h-40+i*6); ctx.lineTo(w/2-6+i*2.4,h-8); ctx.stroke(); } }); },
  piano:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,w/2,6,0.3); ctx.fillStyle=p.pianoCol||'#1b1b22'; ctx.beginPath(); ctx.moveTo(4,h-26); ctx.lineTo(w-4,h-26); ctx.quadraticCurveTo(w,h-4,w/2,h-4); ctx.lineTo(4,h-4); ctx.closePath(); ctx.fill(); ctx.fillStyle='#fdfdfd'; ctx.fillRect(6,h-30,w-12,6); for(var k=8;k<w-8;k+=5){ ctx.fillStyle='#222'; ctx.fillRect(k,h-30,2,3);} ctx.fillStyle=rgba('#ffffff',0.2); ctx.fillRect(8,h-22,w-24,2); }); },
  chandelier:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x*1+LT/2,y+LT*1.2,60,120,function(ctx,cw,ch){ ctx.fillStyle=p.metal; ctx.fillRect(cw/2-1,0,2,40); ctx.beginPath(); ctx.ellipse(cw/2,44,22,6,0,0,Math.PI*2); ctx.strokeStyle=p.metal; ctx.lineWidth=2; ctx.stroke(); for(var i=0;i<6;i++){ var a=i/6*Math.PI*2; ctx.fillStyle='#ffe6a8'; ctx.beginPath(); ctx.arc(cw/2+Math.cos(a)*20,40+Math.sin(a)*5,2.5,0,Math.PI*2); ctx.fill(); } }); m.sprites[m.sprites.length-1].depth=8000; addLight(m,x+LT/2,y-10,120,'#ffe2a0',0.35,{flicker:0.15}); },
  center_crystal:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h-8,w+10,h+80,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-6,w/2-4,10,0.25); var pts=[[0,-96],[-14,-40],[0,-6],[14,-40]]; var g=ctx.createLinearGradient(cw/2-14,0,cw/2+14,0); g.addColorStop(0,rgba(p.glassA,0.95)); g.addColorStop(0.5,'rgba(255,255,255,0.95)'); g.addColorStop(1,rgba(p.glassB,0.95)); ctx.fillStyle=g; ctx.beginPath(); pts.forEach(function(q,i){ ctx[i?'lineTo':'moveTo'](cw/2+q[0],ch+q[1]); }); ctx.closePath(); ctx.fill(); [[-26,-36,-18],[24,-30,-14]].forEach(function(q){ ctx.beginPath(); ctx.moveTo(cw/2+q[0],ch+q[1]); ctx.lineTo(cw/2+q[0]-7,ch-12); ctx.lineTo(cw/2+q[0]+7,ch-12); ctx.closePath(); ctx.fill(); }); }); m.sprites[m.sprites.length-1].bob=4; addLight(m,x+w/2,y+h/2-30,150,p.light,0.55,{pulse:0.35,period:2400}); },
  center_orrery:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h/2+40,120,120,function(ctx,cw,ch){ var cx=cw/2, cy=ch/2-10; ctx.strokeStyle=rgba(p.accent,0.9); ctx.lineWidth=1.5; [18,32,46].forEach(function(r){ ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.45,0,0,Math.PI*2); ctx.stroke(); }); var sg=ctx.createRadialGradient(cx,cy,1,cx,cy,9); sg.addColorStop(0,'#fff8d0'); sg.addColorStop(1,'#f0b040'); ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(cx,cy,8,0,Math.PI*2); ctx.fill(); [['#8fc4ff',18,0.4],['#e0a070',32,2.2],['#a0e0c0',46,4.1]].forEach(function(q){ ctx.fillStyle=q[0]; ctx.beginPath(); ctx.arc(cx+Math.cos(q[2])*q[1],cy+Math.sin(q[2])*q[1]*0.45,4,0,Math.PI*2); ctx.fill(); }); ctx.fillStyle=p.metal; ctx.fillRect(cx-2,cy+6,4,ch-cy-12); }); addLight(m,x+w/2,y+h/2-10,110,'#ffd98a',0.5,{pulse:0.25}); },
  center_tree:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h-4,150,170,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-8,40,12,0.3); var g=ctx.createLinearGradient(cw/2-12,0,cw/2+12,0); g.addColorStop(0,'#d8d4c8'); g.addColorStop(0.5,'#fbfaf5'); g.addColorStop(1,'#cfcabb'); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(cw/2-16,ch-6); ctx.quadraticCurveTo(cw/2-6,ch-60,cw/2-10,ch-100); ctx.lineTo(cw/2+10,ch-100); ctx.quadraticCurveTo(cw/2+6,ch-60,cw/2+16,ch-6); ctx.fill(); for(var i=0;i<26;i++){ var a=i/26*Math.PI*2, r=30+(i*13%20); ctx.fillStyle=i%3?rgba(p.plant,0.9):rgba(shade(p.plant,0.35),0.9); ctx.beginPath(); ctx.arc(cw/2+Math.cos(a)*r*1.3,ch-118+Math.sin(a)*r*0.6,16,0,Math.PI*2); ctx.fill(); } for(var j=0;j<18;j++){ ctx.fillStyle='rgba(255,255,230,.8)'; ctx.fillRect(cw/2-50+(j*37%100),ch-150+(j*23%60),2,2);} }); addLight(m,x+w/2,y-20,160,'#f6ffd8',0.35,{pulse:0.2,period:3000}); },
  center_fountain:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h/2+6,40,60,function(ctx,cw,ch){ ctx.fillStyle=p.wallTop; ctx.fillRect(cw/2-4,ch-40,8,34); ctx.beginPath(); ctx.ellipse(cw/2,ch-40,12,4,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='rgba(200,235,255,.8)'; ctx.lineWidth=1.5; for(var i=-1;i<=1;i+=2){ ctx.beginPath(); ctx.moveTo(cw/2,ch-44); ctx.quadraticCurveTo(cw/2+i*10,ch-58,cw/2+i*16,ch-30); ctx.stroke(); } }); addLight(m,x+w/2,y+h/2,90,p.water||'#9ad8ff',0.3,{pulse:0.3}); },
  center_pool:function(m,x,y,w,h,S){ addLight(m,x+w/2,y+h/2,110,'#bfe8ff',0.35,{pulse:0.25,period:2600}); },
  center_starmap:function(){},
  crystalpillar:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,36,90,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-4,12,4,0.3); var g=ctx.createLinearGradient(cw/2-10,0,cw/2+10,0); g.addColorStop(0,rgba(p.glassA,0.9)); g.addColorStop(0.5,'rgba(255,255,255,.95)'); g.addColorStop(1,rgba(p.glassB,0.9)); ctx.fillStyle=g; ctx.beginPath(); ctx.moveTo(cw/2,ch-84); ctx.lineTo(cw/2+10,ch-66); ctx.lineTo(cw/2+9,ch-6); ctx.lineTo(cw/2-9,ch-6); ctx.lineTo(cw/2-10,ch-66); ctx.closePath(); ctx.fill(); }); addLight(m,x+w/2,y+h-40,60,p.light,0.4,{pulse:0.4,period:1700}); },
  whitetree:function(m,x,y,w,h,S){ var p=S.pal; addSprite(m,x+w/2,y+h,80,110,function(ctx,cw,ch){ softShadow(ctx,cw/2,ch-4,14,5,0.3); ctx.fillStyle='#f4f2ea'; ctx.beginPath(); ctx.moveTo(cw/2-8,ch-4); ctx.quadraticCurveTo(cw/2-2,ch-50,cw/2-6,ch-70); ctx.lineTo(cw/2+6,ch-70); ctx.quadraticCurveTo(cw/2+2,ch-50,cw/2+8,ch-4); ctx.fill(); for(var i=0;i<12;i++){ var a=i/12*Math.PI*2; ctx.fillStyle=i%2?rgba(p.plant,0.9):rgba(shade(p.plant,0.3),0.9); ctx.beginPath(); ctx.arc(cw/2+Math.cos(a)*20,ch-80+Math.sin(a)*10,10,0,Math.PI*2); ctx.fill(); } }); },
  telescope:function(m,x,y,w,h,S){ var p=S.pal; towerSpriteBox(m,x,y,w,h,function(ctx,w,h){ softShadow(ctx,w/2,h-4,10,3,0.3); ctx.strokeStyle=p.metal; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(w/2,h-22); ctx.lineTo(w/2-9,h-3); ctx.moveTo(w/2,h-22); ctx.lineTo(w/2+9,h-3); ctx.moveTo(w/2,h-22); ctx.lineTo(w/2,h-3); ctx.stroke(); ctx.save(); ctx.translate(w/2,h-24); ctx.rotate(-0.7); ctx.fillStyle=p.accent; ctx.fillRect(-4,-22,8,30); ctx.fillStyle=p.metal; ctx.fillRect(-5,-24,10,4); ctx.restore(); }); },
};
var TOWER_LABEL={
  stairs:function(){return 'Stairs up — the next floor of the tower.';},
  center_fountain:function(){return 'Fountain — the centerpiece of this floor.';},
  center_crystal:function(){return 'Moonglass crystal — it hums with light.';},
  center_orrery:function(){return 'Orrery — brass planets turn around a lamp-sun.';},
  center_tree:function(){return 'White tree — living wood grown through the floor.';},
  center_pool:function(){return 'Reflecting pool — the sky moves across it.';},
  center_starmap:function(){return 'Star map — constellations inlaid in the floor.';},
  piano:function(){return 'Piano — elven lacquer, still in tune.';},
  altar:function(){return 'Altar — light gathers here at dawn.';},
};

// ── Floor patterns ─────────────────────────────────────────────────────
var FLOORS={
  marble:function(ctx,x,y,tx,ty,base,vein,R){ var big=((tx>>1)+(ty>>1))%2; ctx.fillStyle=big?base:shade(base,-0.05); ctx.fillRect(x,y,LT,LT); ctx.strokeStyle=rgba(vein,0.25); ctx.lineWidth=1; if((tx*7+ty*3)%5===0){ ctx.beginPath(); ctx.moveTo(x+R.f()*LT,y); ctx.bezierCurveTo(x+R.f()*LT,y+10,x+R.f()*LT,y+22,x+R.f()*LT,y+LT); ctx.stroke(); } if(tx%2===0){ctx.fillStyle=rgba(vein,0.18);ctx.fillRect(x,y,1,LT);} if(ty%2===0){ctx.fillStyle=rgba(vein,0.18);ctx.fillRect(x,y,LT,1);} },
  checker:function(ctx,x,y,tx,ty,a,b){ ctx.fillStyle=(tx+ty)%2?a:b; ctx.fillRect(x,y,LT,LT); ctx.fillStyle='rgba(255,255,255,.12)'; ctx.fillRect(x,y,LT,1); ctx.fillStyle='rgba(0,0,0,.06)'; ctx.fillRect(x,y+LT-1,LT,1); },
  planks:function(ctx,x,y,tx,ty,a,b,R){ for(var i=0;i<4;i++){ var yy=y+i*8; ctx.fillStyle=((ty*4+i)*5+tx*3)%7<3?a:shade(a,-0.04); ctx.fillRect(x,yy,LT,8); ctx.fillStyle=rgba(b,0.35); ctx.fillRect(x,yy+7,LT,1); if((tx+i+ty)%3===0){ctx.fillRect(x+((ty*11+i*7)%28),yy,1,8);} } },
  herring:function(ctx,x,y,tx,ty,a,b){ ctx.fillStyle=a; ctx.fillRect(x,y,LT,LT); ctx.strokeStyle=rgba(b,0.4); ctx.lineWidth=1; for(var i=-LT;i<LT*2;i+=8){ ctx.beginPath(); if((tx+ty)%2){ctx.moveTo(x+i,y);ctx.lineTo(x+i+LT,y+LT);} else {ctx.moveTo(x+i+LT,y);ctx.lineTo(x+i,y+LT);} ctx.stroke(); } },
  hex:function(ctx,x,y,tx,ty,a,b,R){ ctx.fillStyle=a; ctx.fillRect(x,y,LT,LT); var g=ctx.createRadialGradient(x+16,y+16,2,x+16,y+16,22); g.addColorStop(0,rgba('#ffffff',0.35)); g.addColorStop(1,rgba(b,0.15)); ctx.fillStyle=g; ctx.beginPath(); for(var i=0;i<6;i++){ var an=Math.PI/6+i*Math.PI/3; ctx.lineTo(x+16+Math.cos(an)*15,y+16+Math.sin(an)*15);} ctx.closePath(); ctx.fill(); ctx.strokeStyle=rgba(b,0.5); ctx.stroke(); },
  slab:function(ctx,x,y,tx,ty,a,b,R){ ctx.fillStyle=((tx*13+ty*7)%3===0)?shade(a,-0.04):a; ctx.fillRect(x,y,LT,LT); ctx.strokeStyle=rgba(b,0.3); ctx.lineWidth=1; ctx.strokeRect(x+0.5,y+0.5,LT-1,LT-1); if(R.chance(0.08)){ ctx.fillStyle=rgba(b,0.2); ctx.fillRect(x+R.i(4,24),y+R.i(4,24),3,1);} },
  stars:function(ctx,x,y,tx,ty,a,b,R){ ctx.fillStyle=a; ctx.fillRect(x,y,LT,LT); for(var i=0;i<3;i++){ ctx.fillStyle='rgba(255,255,255,'+(0.3+R.f()*0.6)+')'; ctx.fillRect(x+R.f()*LT,y+R.f()*LT,1.3,1.3);} ctx.fillStyle=rgba(b,0.25); ctx.fillRect(x,y,LT,1); ctx.fillRect(x,y,1,LT); },
  ice:function(ctx,x,y,tx,ty,a,b,R){ var g=ctx.createLinearGradient(x,y,x+LT,y+LT); g.addColorStop(0,shade(a,0.12)); g.addColorStop(1,a); ctx.fillStyle=g; ctx.fillRect(x,y,LT,LT); ctx.strokeStyle=rgba('#ffffff',0.5); ctx.lineWidth=0.8; if(R.chance(0.35)){ ctx.beginPath(); ctx.moveTo(x+R.f()*LT,y+R.f()*LT); ctx.lineTo(x+R.f()*LT,y+R.f()*LT); ctx.lineTo(x+R.f()*LT,y+R.f()*LT); ctx.stroke(); } ctx.strokeStyle=rgba(b,0.25); ctx.strokeRect(x+0.5,y+0.5,LT-1,LT-1); },
};

// ── Exteriors ──────────────────────────────────────────────────────────
function extSky(top,bottom,cloudA){ return function(ctx,W,H,m,R){ var g=ctx.createLinearGradient(0,0,0,H*LT); g.addColorStop(0,top); g.addColorStop(1,bottom); ctx.fillStyle=g; ctx.fillRect(0,0,W*LT,H*LT); for(var i=0;i<40;i++){ var cx=R.f()*W*LT, cy=R.f()*H*LT; ctx.fillStyle='rgba(255,255,255,'+(cloudA*(0.4+R.f()*0.6))+')'; for(var j=0;j<5;j++){ ctx.beginPath(); ctx.arc(cx+j*14-28,cy+Math.sin(j)*6,16+R.f()*10,0,Math.PI*2); ctx.fill(); } } }; }
function extNight(top,bottom){ return function(ctx,W,H,m,R){ var g=ctx.createLinearGradient(0,0,0,H*LT); g.addColorStop(0,top); g.addColorStop(1,bottom); ctx.fillStyle=g; ctx.fillRect(0,0,W*LT,H*LT); for(var i=0;i<500;i++){ ctx.fillStyle='rgba(255,255,255,'+(0.2+R.f()*0.8)+')'; var s=R.chance(0.08)?2:1; ctx.fillRect(R.f()*W*LT,R.f()*H*LT,s,s);} }; }
function extGarden(grassA,grassB,water){ return function(ctx,W,H,m,R){ ctx.fillStyle=grassA; ctx.fillRect(0,0,W*LT,H*LT); for(var i=0;i<1800;i++){ ctx.fillStyle=R.chance(0.5)?grassB:shade(grassA,0.1); ctx.fillRect(R.f()*W*LT,R.f()*H*LT,1.5,3);} if(water){ ctx.fillStyle=water; ctx.fillRect(0,0,W*LT,LT*1.4); ctx.fillStyle='rgba(255,255,255,.35)'; for(var k=0;k<60;k++)ctx.fillRect(R.f()*W*LT,R.f()*LT*1.3,8,1); } for(var t=0;t<30;t++){ var tx=R.f()*W*LT, ty=R.chance(0.5)?R.f()*LT*1.8:H*LT-R.f()*LT*1.8; if(R.chance(0.5)){tx=R.chance(0.5)?R.f()*LT*1.8:W*LT-R.f()*LT*1.8; ty=R.f()*H*LT;} softShadow(ctx,tx,ty+8,14,5,0.25); ctx.fillStyle=shade(grassA,-0.25); ctx.beginPath(); ctx.arc(tx,ty,13,0,Math.PI*2); ctx.fill(); ctx.fillStyle=shade(grassA,-0.05); ctx.beginPath(); ctx.arc(tx-3,ty-3,8,0,Math.PI*2); ctx.fill(); } }; }

// ═══════════════════════════════════════════════════════════════════════
// ║ The 10 tower styles
// ═══════════════════════════════════════════════════════════════════════
function towerStyle(o){ return Object.assign({windowEvery:3,glass:0.25,ao:0.2},o); }
var TOWER_STYLES=[
  towerStyle({ id:'rivendell', name:'Rivendell Twilight Hall', plan:'grand', seed:11,
    tagline:'Warm white stone, arched glass, dusk light',
    blurb:'Honey-white stone under an evening sky. Tall arched windows pour amber light across leaf-inlaid floors, lanterns glow in the halls, and leaves drift in through open arches.',
    facts:['Plan: Grand floor (9 rooms around an atrium)','Centerpiece: fountain','Light: amber dusk shafts, lanterns'],
    pal:{outside:'#3b3350',wallTop:'#efe6d2',wallFace:'#e2d6bc',trim:'#c9a86a',floorA:'#f1ead9',floorB:'#d8c9a8',glassA:'#ffd9a0',glassB:'#b98fc9',light:'#ffc98a',wood:'#b58b5e',fabric:'#7a8f6a',fabric2:'#d9c38e',metal:'#b8975c',plant:'#6f8f5a',accent:'#d8b270',water:'#8fc6d8',statue:'#f3ecdc'},
    paintExterior:function(ctx,W,H,m,R){ extSky('#2f2a4a','#d99a7a',0.18)(ctx,W,H,m,R); ctx.fillStyle='rgba(210,235,255,.55)'; for(var i=0;i<3;i++){ var x=(5+i*13)*LT; ctx.fillRect(x,0,10,LT*1.8); } },
    floor:function(ctx,x,y,tx,ty,rt,R){ var p=this.pal; if(rt==='library'||rt==='bedroom'||rt==='study')FLOORS.planks(ctx,x,y,tx,ty,'#d9bf98','#8a6a44',R); else FLOORS.marble(ctx,x,y,tx,ty,p.floorA,'#b59a6a',R); if((tx*3+ty*5)%11===0){ ctx.strokeStyle=rgba('#7f9a60',0.45); ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(x+6,y+26); ctx.quadraticCurveTo(x+16,y+4,x+26,y+26); ctx.stroke(); } },
    center:'fountain', shaftSkew:18, shaftA:0.4,
    particles:[{tex:'leaf',tints:['#d9a55a','#b8c46a','#e08a4a'],freq:500,vx:{min:10,max:25},vy:{min:8,max:18},scale:{start:0.9,end:0.6},alpha:{start:0.9,end:0},life:{min:6000,max:9000},blend:false,rotate:{min:0,max:360},depth:6500},
               {col:'#ffd9a0',freq:180,scale:{start:0.35,end:0},alpha:{start:0.7,end:0}}] }),

  towerStyle({ id:'hyrule_keep', name:'White Keep', plan:'gallery', seed:21, windowEvery:2, glass:0.1,
    tagline:'Limestone, royal blue runners, gold trim',
    blurb:'A royal keep in bright daylight: white limestone checkerboard floors, royal blue runners edged in gold, and banners carrying the winged-sword crest of the realm between tall windows.',
    facts:['Plan: Long hall (rooms off a central gallery)','Centerpiece: fountain','Light: crisp noon shafts'],
    pal:{outside:'#8fc2ea',wallTop:'#f6f4ee',wallFace:'#e9e5da',trim:'#d4af37',floorA:'#f7f5ef',floorB:'#dcd8cc',glassA:'#e6f4ff',glassB:'#9ccbf0',light:'#fff6d8',wood:'#8b6a48',fabric:'#23479a',fabric2:'#e0c060',metal:'#d4af37',plant:'#4f8a4f',accent:'#d4af37',water:'#8fd0f2',statue:'#f2f0ea'},
    paintExterior:extGarden('#6fa35a','#5b8f48','#7cc0e8'),
    floor:function(ctx,x,y,tx,ty,rt,R){ if(rt==='bedroom'||rt==='library')FLOORS.herring(ctx,x,y,tx,ty,'#cfb08a','#8a6a48'); else FLOORS.checker(ctx,x,y,tx,ty,'#f7f5ef','#dedad0'); },
    wallDetail:function(ctx,x,y,w,h,R){ if(((x/LT)|0)%4===1){ ctx.fillStyle='#23479a'; ctx.fillRect(x+9,y+1,14,h-6); ctx.fillStyle='#d4af37'; ctx.fillRect(x+9,y+1,14,2); ctx.beginPath(); ctx.moveTo(x+16,y+5); ctx.lineTo(x+16,y+h-9); ctx.strokeStyle='#e8d38a'; ctx.lineWidth=1.5; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+11,y+8); ctx.lineTo(x+16,y+11); ctx.lineTo(x+21,y+8); ctx.stroke(); ctx.fillStyle='#23479a'; ctx.beginPath(); ctx.moveTo(x+9,y+h-5); ctx.lineTo(x+16,y+h-1); ctx.lineTo(x+23,y+h-5); ctx.fill(); } },
    center:'fountain', shaftSkew:6, shaftA:0.3,
    particles:[{col:'#fff6d8',freq:220,scale:{start:0.3,end:0},alpha:{start:0.6,end:0}}] }),

  towerStyle({ id:'moonglass', name:'Moonglass Spire', plan:'rotunda', seed:31, glass:0.6,
    tagline:'Glowing crystal floors under a night sky',
    blurb:'Pale crystal tiles that glow softly as you walk, silver-blue walls, crystal pillars and a great humming moonglass crystal under the dome. Stars wheel past every window.',
    facts:['Plan: Rotunda (round hall with wings)','Centerpiece: moonglass crystal','Light: floor glow that follows you, crystal pulses'],
    pal:{outside:'#0b1230',wallTop:'#d9e6f5',wallFace:'#b8cce6',trim:'#9fc0e8',floorA:'#cfe0f5',floorB:'#8fb0dc',glassA:'#bfe0ff',glassB:'#6f8fe0',light:'#aee0ff',wood:'#9aa8c8',fabric:'#5a6fb8',fabric2:'#cfe0ff',metal:'#c0d0e8',plant:'#7fb0c8',accent:'#bfe0ff',water:'#9ad0ff',statue:'#e8f0fa'},
    paintExterior:extNight('#050818','#1a2560'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.hex(ctx,x,y,tx,ty,this.pal.floorA,this.pal.floorB,R); },
    windowFace:function(ctx,x,y,w,h,R){ ctx.fillStyle='#0b1230'; rr(ctx,x+6,y+1,w-12,h-5,8); ctx.fill(); for(var i=0;i<6;i++){ctx.fillStyle='#fff';ctx.fillRect(x+8+R.f()*(w-16),y+3+R.f()*(h-9),1,1);} ctx.strokeStyle='#cfe4ff'; ctx.lineWidth=1.5; rr(ctx,x+6,y+1,w-12,h-5,8); ctx.stroke(); },
    center:'crystal', pillar:'crystalpillar', shaftSkew:0, shaftA:0.18, ao:0.15,
    particles:[{col:'#bfe0ff',freq:90,scale:{start:0.45,end:0},alpha:{start:0.9,end:0},vy:{min:-14,max:-4}}],
    extra:function(m){ m.tick=function(scene){ if(!scene._floorGlow){ scene._floorGlow=scene.add.image(0,0,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0xaee0ff).setAlpha(0.35).setScale(1.3).setDepth(-3);} scene._floorGlow.setPosition(scene.hero.x,scene.hero.y); }; } }),

  towerStyle({ id:'elven_library', name:'Elven Library', plan:'grand', seed:41, glass:0.35, windowEvery:4,
    tagline:'Carved white wood, skylights, floating lanterns',
    blurb:'Every room is a reading room. Pale carved-wood floors, shelves in every wing, square skylights dropping pools of light, and paper lanterns that float and bob above the tables.',
    facts:['Plan: Grand floor','Centerpiece: white tree growing through the atrium','Light: skylight pools, floating lanterns'],
    pal:{outside:'#a8c9a0',wallTop:'#f3eee2',wallFace:'#e6dcc6',trim:'#b9a27a',floorA:'#efe3cc',floorB:'#c9b08a',glassA:'#f4fbff',glassB:'#bfe0f0',light:'#fff2cc',wood:'#e2cfa8',fabric:'#6b8fa8',fabric2:'#e8d9b0',metal:'#b9a27a',plant:'#79a86a',accent:'#c8a860',water:'#9fd4e8',statue:'#f5f0e4',bark:'#f0ece0'},
    paintExterior:extGarden('#8fb482','#7aa06e',null),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.planks(ctx,x,y,tx,ty,'#efe3cc','#b89f78',R); },
    roomAccent:function(ctx,x,y,w,h,rt,R){ if(rt==='atrium'||rt==='hall')return; var cx=x+w/2, cy=y+h/2; ctx.fillStyle='rgba(255,250,220,.28)'; ctx.fillRect(cx-LT,cy-LT,LT*2,LT*2); },
    center:'tree', shaftSkew:0, shaftA:0.22,
    particles:[{col:'#fff2cc',freq:260,scale:{start:0.3,end:0},alpha:{start:0.6,end:0}}],
    extra:function(m,ctx,W,H,R,info){ info.plan.rooms.forEach(function(r){ if(r.type==='atrium')return; var cx=(r.x+info.pad+r.w/2)*LT, cy=(r.y+info.pad+r.h/2)*LT; addLight(m,cx,cy,70,'#fff2cc',0.3,{pulse:0.15,depth:-4,noCut:true}); for(var k=0;k<2;k++){ var lx=cx+(k?30:-30), ly=cy-20; addSprite(m,lx,ly+60,18,24,function(c,w,h){ var g=c.createRadialGradient(w/2,10,1,w/2,10,9); g.addColorStop(0,'#fff6d0'); g.addColorStop(1,'#f0c070'); c.fillStyle=g; rr(c,w/2-6,3,12,15,5); c.fill(); c.fillStyle='rgba(120,80,30,.6)'; c.fillRect(w/2-4,17,8,2); }); m.sprites[m.sprites.length-1].bob=6; addLight(m,lx,ly+48,46,'#ffe0a0',0.35,{flicker:0.2}); } }); } }),

  towerStyle({ id:'sky_cloister', name:'Sky Cloister', plan:'gallery', seed:51, windowEvery:1, glass:0,
    tagline:'Open balconies above the clouds',
    blurb:'The outer walls give way to open arches and low balustrades, and the clouds drift right past the floor. White stone, pale blue silk and wind-blown curtains; it feels like standing in the sky.',
    facts:['Plan: Long hall','Every outer wall is an open arch','Animated clouds and drifting light'],
    pal:{outside:'#bfe0ff',wallTop:'#fbfbf8',wallFace:'#eceee8',trim:'#a9c8e8',floorA:'#f8f8f4',floorB:'#dfe6ee',glassA:'#d8eeff',glassB:'#a8d4ff',light:'#ffffff',wood:'#c9b79a',fabric:'#a8c8ea',fabric2:'#ffffff',metal:'#b9c8d8',plant:'#86b88a',accent:'#9fc8f0',water:'#a8dcff',statue:'#fafaf6'},
    paintExterior:extSky('#9ccff5','#e8f6ff',0.55),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#f8f8f4','#b8c8d8',R); },
    windowFace:function(ctx,x,y,w,h,R){ var g=ctx.createLinearGradient(x,y,x,y+h); g.addColorStop(0,'#9ccff5'); g.addColorStop(1,'#e8f6ff'); ctx.fillStyle=g; rr(ctx,x+3,y,w-6,h-3,10); ctx.fill(); ctx.fillStyle='rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(x+10+R.f()*10,y+h-10,5,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#e8ecf0'; ctx.fillRect(x+3,y+h-7,w-6,4); for(var i=x+6;i<x+w-4;i+=5)ctx.fillRect(i,y+h-11,2,5); },
    center:'pool', shaftSkew:10, shaftA:0.25,
    particles:[{col:'#ffffff',freq:400,scale:{start:0.5,end:0},alpha:{start:0.5,end:0},vx:{min:10,max:30}}],
    extra:function(m,ctx,W,H,R){ var clouds=[]; for(var i=0;i<9;i++){ (function(i){ var cy=R.chance(0.5)?R.f()*LT*1.6:(H-2)*LT+R.f()*LT*1.6; addSprite(m,R.f()*W*LT,cy+30,120,40,function(c,w,h){ c.fillStyle='rgba(255,255,255,.85)'; for(var j=0;j<6;j++){ c.beginPath(); c.arc(20+j*16,22+Math.sin(j*1.3)*5,14,0,Math.PI*2); c.fill(); } }); clouds.push(m.sprites.length-1); })(i); }
      m.tick=function(scene,dt){ if(!scene._cloudImgs){ scene._cloudImgs=scene.children.list.filter(function(o){return o.texture&&o.texture.key&&o.texture.key.indexOf('spr_')===0&&o.width===120&&o.height===40;}); } scene._cloudImgs.forEach(function(o,i){ o.x+=dt*(8+i%3*5); if(o.x>W*LT+70)o.x=-70; o.setDepth(scene._ld?scene._ld(9000):9000); }); }; } }),

  towerStyle({ id:'silverwood', name:'Silverwood Palace', plan:'rotunda', seed:61, glass:0.2, windowEvery:3,
    tagline:'Living white trees grown into the walls',
    blurb:'The palace was grown, not built. White-barked trees stand in as pillars, leaf-shaped windows scatter green-gold light, and soft moss inlays run between pale stone slabs.',
    facts:['Plan: Rotunda','Centerpiece: great white tree','Pillars: living silverwood trees'],
    pal:{outside:'#557a4f',wallTop:'#f0efe6',wallFace:'#dcdcc8',trim:'#9fb77a',floorA:'#eeede2',floorB:'#b7c7a0',glassA:'#e8ffcf',glassB:'#9fd08a',light:'#f0ffc8',wood:'#cbbd98',fabric:'#7aa06a',fabric2:'#eef2d8',metal:'#b8b890',plant:'#6f9f58',accent:'#c8d890',water:'#9fd8c8',statue:'#f2f2e8'},
    paintExterior:extGarden('#5f8a52','#4f7a44',null),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.slab(ctx,x,y,tx,ty,'#eeede2','#9fb77a',R); if((tx+ty)%3===0){ ctx.fillStyle='rgba(111,159,88,.35)'; ctx.fillRect(x,y+LT-2,LT,2);} },
    windowFace:function(ctx,x,y,w,h,R){ ctx.fillStyle='#9fb77a'; ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2-1,8,h/2-3,0,0,Math.PI*2); ctx.fill(); var g=ctx.createLinearGradient(x,y,x,y+h); g.addColorStop(0,'#e8ffcf'); g.addColorStop(1,'#9fd08a'); ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2-1,6,h/2-5,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#6f9f58'; ctx.beginPath(); ctx.moveTo(x+w/2,y+4); ctx.lineTo(x+w/2,y+h-6); ctx.stroke(); },
    center:'tree', pillar:'whitetree', shaftSkew:12, shaftA:0.3,
    particles:[{tex:'leaf',tints:['#b8d88a','#e8f0a0','#8fc070'],freq:600,vx:{min:-10,max:10},vy:{min:6,max:14},scale:{start:0.8,end:0.5},alpha:{start:0.9,end:0},life:{min:6000,max:9000},blend:false,rotate:{min:0,max:360},depth:6500},
               {col:'#f0ffc8',freq:300,scale:{start:0.35,end:0},alpha:{start:0.7,end:0}}] }),

  towerStyle({ id:'frost_cathedral', name:'Frost Cathedral', plan:'grand', seed:71, windowEvery:2, glass:0.3,
    tagline:'Ice-blue stone and stained glass',
    blurb:'Cool blue-white stone with a faint frost sheen. Stained-glass windows throw pools of blue, violet and teal light across the floor, chandeliers glitter, and a fine frost mist hangs in the air.',
    facts:['Plan: Grand floor','Centerpiece: moonglass crystal','Light: coloured stained-glass pools'],
    pal:{outside:'#cfe4f4',wallTop:'#eef6fb',wallFace:'#d2e4f0',trim:'#8fb8d8',floorA:'#e4f0f8',floorB:'#a8c8e0',glassA:'#7fb0ff',glassB:'#b07fe0',light:'#bfe0ff',wood:'#a8b8c8',fabric:'#4a6fa8',fabric2:'#d8e8f8',metal:'#c8d8e8',plant:'#7fa8b8',accent:'#8fb8f0',water:'#b8e0ff',statue:'#f0f6fb'},
    paintExterior:extSky('#b8d8f0','#f0f8ff',0.4),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.ice(ctx,x,y,tx,ty,this.pal.floorA,this.pal.floorB,R); },
    windowFace:function(ctx,x,y,w,h,R){ var cols=['#5f8fff','#a06fe0','#4fc8c0','#f0c060','#7fb0ff']; ctx.fillStyle='#6f8fa8'; rr(ctx,x+5,y,w-10,h-3,9); ctx.fill(); for(var i=0;i<6;i++){ ctx.fillStyle=cols[(i+((x/LT)|0))%cols.length]; ctx.fillRect(x+7+(i%2)*(w-14)/2,y+2+Math.floor(i/2)*((h-7)/3),(w-14)/2-1,(h-7)/3-1);} },
    center:'crystal', shaftSkew:8, shaftA:0.32,
    particles:[{col:'#e8f4ff',freq:70,scale:{start:0.4,end:0.1},alpha:{start:0.5,end:0},vy:{min:2,max:10},vx:{min:-4,max:4},life:{min:4000,max:7000}}],
    extra:function(m){ var cols=['#6f8fff','#b07fe0','#4fd0c8']; m.shafts.forEach(function(s,i){ var c=s.canvas, x=c.getContext('2d'); x.globalCompositeOperation='source-atop'; x.fillStyle=cols[i%3]; x.globalAlpha=0.65; x.fillRect(0,0,c.width,c.height); }); } }),

  towerStyle({ id:'observatory', name:'Starlit Observatory', plan:'rotunda', seed:81, glass:0.4, windowEvery:2,
    tagline:'Midnight blue, brass, a star map floor',
    blurb:'An astronomer’s tower: deep blue floors inlaid with twinkling constellations, white stone walls, brass telescopes, and a turning orrery under the dome. Blue and white, but lit by night.',
    facts:['Plan: Rotunda','Centerpiece: brass orrery over a star map','Light: lamp-sun, twinkling floor stars'],
    pal:{outside:'#070b22',wallTop:'#eceff6',wallFace:'#cfd6e8',trim:'#c8a860',floorA:'#1b2856',floorB:'#3a4a88',glassA:'#2a3a88',glassB:'#0b1238',light:'#ffe2a0',wood:'#6a5a4a',fabric:'#2a3a78',fabric2:'#c8a860',metal:'#c8a860',plant:'#5f8fa0',accent:'#e8c878',water:'#5f8fd0',statue:'#e8ecf4',pianoCol:'#e8e4d8'},
    paintExterior:extNight('#03061a','#141c48'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.stars(ctx,x,y,tx,ty,this.pal.floorA,this.pal.floorB,R); },
    roomAccent:function(ctx,x,y,w,h,rt,R){ if(rt==='rotunda'){ TOWER_FLAT.center_starmap(ctx,x+w/2-LT*3,y+h/2-LT*3,LT*6,LT*6,this,R); } },
    center:'orrery', shaftSkew:0, shaftA:0.12,
    particles:[{col:'#ffffff',freq:120,scale:{start:0.3,end:0},alpha:{start:1,end:0},vx:{min:-1,max:1},vy:{min:-1,max:1},life:{min:1200,max:2600}}],
    extra:function(m,ctx,W,H,R,info){ info.plan.rooms.forEach(function(r){ if(r.type==='study'||r.type==='library'){ TOWER_TALL.telescope(m,(r.x+info.pad+r.w-2)*LT,(r.y+info.pad+r.h-2)*LT,LT,LT,TOWER_STYLES_BY_ID.observatory); } }); } }),

  towerStyle({ id:'reflecting_hall', name:'Reflecting Hall', plan:'gallery', seed:91, glass:0.15,
    tagline:'Shallow pools mirroring white pillars',
    blurb:'Long shallow pools run through the halls and mirror the pillars and the sky. White stone and sky blue, with slow ripples of light moving over every surface.',
    facts:['Plan: Long hall','Centerpiece: reflecting pool','Light: rippling water caustics'],
    pal:{outside:'#a8d4f0',wallTop:'#fafaf7',wallFace:'#e8ecef',trim:'#b8d0e0',floorA:'#f5f6f3',floorB:'#d6dde2',glassA:'#e0f2ff',glassB:'#a8d0f0',light:'#e8f8ff',wood:'#c8b8a0',fabric:'#8fb8d8',fabric2:'#f4f8fb',metal:'#b8c8d0',plant:'#7fb08a',accent:'#9fd0f0',water:'#8fd0f5',statue:'#fbfbf8'},
    paintExterior:extGarden('#79a870','#6a9862','#8ccaf0'),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#f5f6f3','#9fb8c8',R); },
    center:'pool', shaftSkew:10, shaftA:0.26,
    extra:function(m,ctx,W,H,R,info){
      // extra pools along the gallery walk
      var ci=info.plan.rooms.findIndex(function(r){return r.type==='corridor';}); if(ci<0)return;
      var r=info.plan.rooms[ci];
      for(var x=r.x+info.pad+3;x<r.x+info.pad+r.w-4;x+=8){ var y=r.y+info.pad; TOWER_FLAT.pool(ctx,x*LT,y*LT+4,LT*3,LT*2-8,this); addLight(m,(x+1.5)*LT,(y+1)*LT,60,'#bfe8ff',0.25,{pulse:0.4,period:1900+x*30,depth:-4,noCut:true}); }
      m.particles.push({col:'#dff4ff',freq:140,scale:{start:0.35,end:0},alpha:{start:0.6,end:0}});
    } }),

  towerStyle({ id:'dawn_sanctum', name:'Dawn Sanctum', plan:'grand', seed:101, windowEvery:2, glass:0.2,
    tagline:'White, pale blue, soft gold at sunrise',
    blurb:'The first light of morning, all the time. White stone with pale blue accents, gold filigree medallions in every room, and strong golden light shafts full of drifting dust motes.',
    facts:['Plan: Grand floor','Centerpiece: fountain','Light: long golden morning shafts'],
    pal:{outside:'#f3d9b0',wallTop:'#fbf8f2',wallFace:'#efe8da',trim:'#e0c070',floorA:'#fbf7ee',floorB:'#e0d4b8',glassA:'#fff0c8',glassB:'#a8d0f0',light:'#ffe7a8',wood:'#c8a878',fabric:'#9fc0e0',fabric2:'#e8c870',metal:'#e0c070',plant:'#86a86a',accent:'#e8c060',water:'#a8d8f0',statue:'#fbf8f2'},
    paintExterior:extSky('#f7c89a','#fbeede',0.35),
    floor:function(ctx,x,y,tx,ty,rt,R){ FLOORS.marble(ctx,x,y,tx,ty,'#fbf7ee','#d8c090',R); },
    roomAccent:function(ctx,x,y,w,h,rt,R){ var cx=x+w/2, cy=y+h/2, r=Math.min(w,h)*0.32; ctx.strokeStyle='rgba(224,192,112,.55)'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke(); ctx.lineWidth=1; for(var i=0;i<12;i++){ var a=i/12*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*r*0.4,cy+Math.sin(a)*r*0.4); ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r); ctx.stroke(); } },
    center:'fountain', shaftSkew:28, shaftA:0.45,
    particles:[{col:'#ffe7a8',freq:60,scale:{start:0.3,end:0},alpha:{start:0.8,end:0},vx:{min:-3,max:3},vy:{min:-3,max:3},life:{min:4000,max:8000}}] }),
];
var TOWER_STYLES_BY_ID={}; TOWER_STYLES.forEach(function(s){TOWER_STYLES_BY_ID[s.id]=s;});

