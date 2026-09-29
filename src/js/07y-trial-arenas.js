// ═══════════════════════════════════════════════════════════════════════
// ║ TRIAL REALM — data + arena builders (round 5). Shared with the Design
// ║ Lab's "Familiar Trials" tab; the running trials live in 12b.
// ═══════════════════════════════════════════════════════════════════════
var FAIRY_NAMES={1:['Pip','Bramble','Clover','Wren','Sorrel'],2:['Lily','Marsh','Ripple','Nixie','Fenna'],3:['Flint','Aster','Quartz','Heather','Tor'],4:['Ember','Cinder','Ashe','Soot','Pyra']};
var TRIAL_THEMES={
  rune_targets:{name:'Rune Target Practice',icon:'🎯',text:'Glowing rune stars pop up around the arena. Lead your familiar (or run) to each one before it fades.'},
  echo_path:{name:'Echo Path',icon:'🎼',text:'Rune tiles light up in a sequence. Walk them in the same order — each round is longer.'},
  guardian:{name:'Guard the Runestone',icon:'🛡️',text:'Shadow wisps rush the runestone in the middle. Keep them off it until the time runs out.'},
  rune_lock:{name:'Rune Lock',icon:'🔐',text:'Turn the rune stones ([Tab]) until their symbols match the pattern your familiar draws above the altar. Later locks link the stones together and hide the pattern.'},
  escort:{name:'Escort the Seedling',icon:'🌱',text:'A glowing seedling walks to the far altar. Monsters want to eat it — protect it all the way.'},
  shadow_duel:{name:'Shadow Duel',icon:'👤',text:'A shadow copy of your familiar steps out of the stones. Beat it with your familiar\'s help.'},
  light_align:{name:'Runic Light Alignment',icon:'🔦',text:'A beam of light shines out of the runestone. Turn the rune mirrors ([Tab]) so the beam hits every rune target.'},
  collapse_path:{name:'Collapsing Runic Path',icon:'🌉',text:'Read the order of symbols on the tall rune spire, then cross the walkway stepping only on those symbols, row by row. Wrong stones drop away — and every stone crumbles if you stand on it too long.'},
  lights_out:{name:'Lights-Out Labyrinth',icon:'🌑',text:'A pitch-dark maze lit only by you and your familiar. Find the lost wisps, then the gate opens.'},
  boulder_push:{name:'Rune Boulder Push',icon:'🪨',text:'Push the rune boulders onto the glowing plates. They can\'t be pulled — if you get stuck, use the reset rune.'},
  mirror_walk:{name:'Mirror Walk',icon:'🪞',text:'Beyond the glass wall your shadow copies every step, mirrored. Steer it onto the runes on its side — and keep it out of the rune-fire.'},
  beam_gauntlet:{name:'Beam Gauntlet',icon:'⚡',text:'Rune pylons sweep beams of light across the path. Collect the shards and reach the altar without getting caught.'}
};
// [theme, trial name] for fairy 1…5 of each quadrant — every fairy has her own trial
var FAIRY_TRIAL_PLAN={
  1:[['rune_targets','Sunlit Stars'],['echo_path','The Meadow Echo'],['light_align','First Light'],['escort','The Seedling\'s Walk'],['guardian','Guard the Old Stone']],
  2:[['collapse_path','The Sinking Stepstones'],['mirror_walk','The Reflecting Pool'],['rune_lock','The Drowned Lock'],['boulder_push','Lily-Stone Push'],['rune_targets','Moonlit Targets']],
  3:[['beam_gauntlet','The Ridge of Beams'],['light_align','The Crystal Prism'],['lights_out','The Dark Mine'],['echo_path','The Harp Echo'],['shadow_duel','Shadow on the Peak']],
  4:[['collapse_path','The Cinder Bridge'],['boulder_push','Obsidian Push'],['mirror_walk','The Ember Mirror'],['beam_gauntlet','The Forge Beams'],['lights_out','The Ashen Labyrinth']]
};
var MONARCH_TRIAL_PLAN={2:['guardian','rune_lock','shadow_duel'],3:['light_align','escort','shadow_duel'],4:['collapse_path','beam_gauntlet','shadow_duel']};
function _trialPlanOf(q,i){ var a=(FAIRY_TRIAL_PLAN[q]||[])[i]||['rune_targets','Trial']; return {theme:a[0],name:a[1],tier:q}; }
var TRIAL_PAL={
  1:{floorA:'#5c7a4c',floorB:'#6c8c56',floorC:'#3a5030',rockTop:'#86987c',rockFace:'#4c5c46',void:'#06100c',glow:'#b8ffb0',rune:'#9cffc8'},
  2:{floorA:'#3c6068',floorB:'#487280',floorC:'#22383e',rockTop:'#5c7c88',rockFace:'#34505a',void:'#030a12',glow:'#90f0ff',rune:'#a0f0ff'},
  3:{floorA:'#585472',floorB:'#666284',floorC:'#34304a',rockTop:'#7c7698',rockFace:'#4a4462',void:'#07050d',glow:'#d8b8ff',rune:'#e0c8ff'},
  4:{floorA:'#4c3634',floorB:'#5c423e',floorC:'#2a1c1a',rockTop:'#5c4642',rockFace:'#3a2a28',void:'#120504',glow:'#ffb070',rune:'#ffc890'}
};
var TRIAL_GLYPHS=['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ'];

// ── arena layouts: return {W,H,g(1=wall),hz(1=chasm),spawn:{x,y},…plan} (tile units) ──
function _trRect(W,H){ var g=new Uint8Array(W*H); for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(x<2||y<2||x>=W-2||y>=H-2)g[y*W+x]=1; return g; }
function _trRound(W,H){ var g=_trRect(W,H), cx=W/2, cy=H/2+0.5, r=Math.min(W,H)/2-2.2; for(var y=0;y<H;y++)for(var x=0;x<W;x++)if(Math.hypot(x+0.5-cx,(y+0.5-cy)*1.12)>r)g[y*W+x]=1; return g; }
var TRIAL_LAYOUT={
  rune_targets:function(R,d){ var W=26,H=22; return {W:W,H:H,g:_trRound(W,H),hz:new Uint8Array(W*H)}; },
  echo_path:function(R,d){ var W=24,H=22; return {W:W,H:H,g:_trRound(W,H),hz:new Uint8Array(W*H)}; },
  guardian:function(R,d){ var W=26,H=22; return {W:W,H:H,g:_trRound(W,H),hz:new Uint8Array(W*H)}; },
  shadow_duel:function(R,d){ var W=28,H=24; return {W:W,H:H,g:_trRound(W,H),hz:new Uint8Array(W*H)}; },
  rune_lock:function(R,d){ var W=24,H=20, g=_trRect(W,H); return {W:W,H:H,g:g,hz:new Uint8Array(W*H)}; },
  escort:function(R,d){ var W=18,H=38+Math.min(4,d)*2, g=_trRect(W,H), rocks=[];
    for(var y=8;y<H-9;y+=5){ var x=R.i(4,W-5); if(Math.abs(x-W/2)<2)x+=x<W/2?-3:3; g[y*W+x]=1; g[y*W+x+1]=1; rocks.push({x:x,y:y}); }
    return {W:W,H:H,g:g,hz:new Uint8Array(W*H),rocks:rocks}; },
  light_align:function(R,d){ var W=24,H=22, g=_trRect(W,H); return {W:W,H:H,g:g,hz:new Uint8Array(W*H),puzzle:_trLightPuzzle(R,d,W,H)}; },
  collapse_path:function(R,d){ var rows=Math.min(13,4+2*d), cols=d>=5?5:d>=4?4:3, W=18, top=3, endH=5, H=top+endH+rows+8, g=_trRect(W,H), hz=new Uint8Array(W*H), x0=Math.floor((W-cols)/2), ry0=top+endH;
    for(var y=ry0;y<ry0+rows;y++)for(var x=2;x<W-2;x++)if(x<x0||x>=x0+cols)hz[y*W+x]=1;
    // path: one stone per row, each step forward or diagonal; symbols unique within a row
    var K=Math.min(TRIAL_GLYPHS.length,6+d), path=[], sym=[], c=R.i(0,cols-1);
    for(var r=0;r<rows;r++){ if(r>0){ var opts=[c-1,c,c+1].filter(function(v){ return v>=0&&v<cols; }); c=opts[R.i(0,opts.length-1)]; } path.push(c); var row=[], used={}; for(var k=0;k<cols;k++){ var s; do{ s=R.i(0,K-1); }while(used[s]); used[s]=1; row.push(s); } sym.push(row); }
    return {W:W,H:H,g:g,hz:hz,walk:{x0:x0,y0:ry0,rows:rows,cols:cols,path:path,sym:sym,spire:{x:W-5,y:H-6}}}; },
  lights_out:function(R,d){ var cw=6+2*Math.min(d,5), ch=4+2*Math.min(d,5), W=2*cw+2, H=2*ch+5, g=new Uint8Array(W*H); for(var i=0;i<W*H;i++)g[i]=1;
    // rows: 0 border · 1 exit pocket · 2 gate · 3…2ch+1 maze cells · 2ch+2…2ch+3 start room · 2ch+4 border
    var cell=function(cx,cy){ return {x:1+2*cx,y:3+2*cy}; }, seen={}, s0=[Math.floor(cw/2),ch-1], st=[s0]; seen[s0[0]+','+s0[1]]=1;
    while(st.length){ var cur=st[st.length-1], a=cell(cur[0],cur[1]); g[a.y*W+a.x]=0;
      var nb=[[1,0],[-1,0],[0,1],[0,-1]].map(function(v){ return [cur[0]+v[0],cur[1]+v[1],v]; }).filter(function(n){ return n[0]>=0&&n[1]>=0&&n[0]<cw&&n[1]<ch&&!seen[n[0]+','+n[1]]; });
      if(!nb.length){ st.pop(); continue; } var n=nb[R.i(0,nb.length-1)]; seen[n[0]+','+n[1]]=1; var b=cell(n[0],n[1]); g[b.y*W+b.x]=0; g[(a.y+n[2][1])*W+a.x+n[2][0]]=0; st.push([n[0],n[1]]); }
    for(var e=0;e<cw*ch*0.1;e++){ var ex=1+2*R.i(0,cw-2)+1, ey=3+2*R.i(0,ch-1); g[ey*W+ex]=0; }   // a few loops
    var sc=cell(s0[0],s0[1]); for(var yy=2*ch+2;yy<=2*ch+3;yy++)for(var xx=Math.max(1,sc.x-2);xx<=Math.min(W-2,sc.x+2);xx++)g[yy*W+xx]=0;
    var top=cell(Math.floor(cw/2),0), gate={x:top.x,y:2}; g[2*W+top.x]=0; g[1*W+top.x]=0; if(top.x>1)g[1*W+top.x-1]=0; if(top.x<W-2)g[1*W+top.x+1]=0;
    var ends=[]; for(var cy=0;cy<ch;cy++)for(var cx=0;cx<cw;cx++){ var q=cell(cx,cy), n2=0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(v){ if(!g[(q.y+v[1])*W+q.x+v[0]])n2++; }); if(n2===1&&!(cx===s0[0]&&cy===s0[1]))ends.push({x:q.x,y:q.y,d:Math.hypot(q.x-sc.x,q.y-sc.y)}); }
    ends.sort(function(a,b){ return b.d-a.d; }); var want=Math.min(3+d,ends.length), wisps=[]; for(var w=0;w<ends.length&&wisps.length<want;w++){ var E=ends[w]; if(wisps.every(function(o){ return Math.hypot(o.x-E.x,o.y-E.y)>5; }))wisps.push(E); }
    return {W:W,H:H,g:g,hz:new Uint8Array(W*H),maze:{gate:gate,wisps:wisps},dark:0.94,heroLight:70}; },
  boulder_push:function(R,d){ return _trSokoban(R,d); },
  mirror_walk:function(R,d){ var W=27,H=18+Math.min(d,4), mid=13, g=_trRect(W,H), hz=new Uint8Array(W*H);
    for(var y=0;y<H;y++)g[y*W+mid]=1;
    for(var x=mid+1;x<W-2;x++)g[(H-3)*W+x]=1;   // the shadow side ends a row higher (keeps the spawn on your side)
    var walls=[], fires=[], runes=[], free=function(x,y){ return x>mid&&x<W-2&&y>1&&y<H-3&&!g[y*W+x]; };
    for(var k=0;k<4+d*2;k++){ var wx=R.i(mid+2,W-4), wy=R.i(3,H-6), horiz=R.chance(0.5), L=R.i(2,4); for(var t=0;t<L;t++){ var X=wx+(horiz?t:0), Y=wy+(horiz?0:t); if(free(X,Y)&&!(X===W-1-11&&Y>=H-5)){ g[Y*W+X]=1; walls.push({x:X,y:Y}); } } }
    for(var f=0;f<3+d*2;f++){ for(var tr=0;tr<40;tr++){ var fx=R.i(mid+2,W-4), fy=R.i(3,H-5); if(free(fx,fy)&&Math.abs(fy-(H-4))>1){ fires.push({x:fx,y:fy}); break; } } }
    // runes: reachable shadow-side cells, spread out
    var reach=_trFlood(g,W,H,W-1-11,H-4,function(x,y){ return x>mid; }); var cand=[]; for(var ry=3;ry<H-4;ry++)for(var rx=mid+2;rx<W-2;rx++)if(reach[ry*W+rx]&&!fires.some(function(o){ return o.x===rx&&o.y===ry; }))cand.push({x:rx,y:ry});
    for(var r=0;r<3+d&&cand.length;r++){ var best=null,bd=-1; for(var c2=0;c2<cand.length;c2++){ var C=cand[c2], dd=Math.min.apply(null,[99].concat(runes.map(function(o){ return Math.hypot(o.x-C.x,o.y-C.y); }))); if(dd>bd+R.f()*1.5){ bd=dd; best=C; } } runes.push(best); cand.splice(cand.indexOf(best),1); }
    return {W:W,H:H,g:g,hz:hz,mirror:{mid:mid,fires:fires,runes:runes}}; },
  beam_gauntlet:function(R,d){ var W=22,H=30+Math.min(d,5)*2, g=_trRect(W,H), pylons=[], shards=[], n=1+Math.min(d,5);
    for(var i=0;i<n;i++){ var y=Math.round(6+(i+0.5)*(H-14)/n), x=i%2?R.i(5,8):R.i(W-9,W-6); pylons.push({x:x,y:y,len:5+Math.min(d,3)*0.6+R.f(),spd:(0.7+0.22*d)*(i%2?-1:1),a:R.f()*6.28}); g[y*W+x]=1; }
    for(var s=0;s<3;s++){ var sy=Math.round(H-9-(s+1)*(H-16)/4), sx=R.i(4,W-5); shards.push({x:sx,y:sy}); }
    return {W:W,H:H,g:g,hz:new Uint8Array(W*H),beam:{pylons:pylons,shards:shards,altar:{x:W>>1,y:4}}}; }
};
function _trFlood(g,W,H,sx,sy,ok){ var s=new Uint8Array(W*H), q=[sy*W+sx]; s[q[0]]=1; for(var i=0;i<q.length;i++){ var c=q[i], x=c%W, y=(c/W)|0; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(v){ var nx=x+v[0], ny=y+v[1], k=ny*W+nx; if(nx<0||ny<0||nx>=W||ny>=H||s[k]||g[k]||(ok&&!ok(nx,ny)))return; s[k]=1; q.push(k); }); } return s; }
// light-alignment puzzle: build a beam path with turns (mirrors), put rune targets on it, add decoys, scramble
function _trLightPuzzle(R,d,W,H){
  for(var att=0;att<200;att++){ var bw=Math.min(12,6+d), bh=Math.min(9,5+d), bx=Math.floor((W-bw)/2), by=4, ey=by+R.i(0,bh-1), used={}, mirrors=[], cells=[];
    var x=bx-1, y=ey, dx=1, dy=0, turns=2+Math.min(d,4), ok=true;
    for(var t=0;t<=turns&&ok;t++){ var run=R.i(2,4); for(var s=0;s<run;s++){ x+=dx; y+=dy; if(x<bx||y<by||x>=bx+bw||y>=by+bh||used[x+','+y]){ ok=false; break; } used[x+','+y]=1; cells.push({x:x,y:y,dx:dx,dy:dy}); }
      if(!ok||t===turns)break; var nd=R.chance(0.5)?[-dy,dx]:[dy,-dx]; if(dx===0)nd=R.chance(0.5)?[1,0]:[-1,0]; else nd=R.chance(0.5)?[0,1]:[0,-1];
      var o=(dx===1&&nd[1]===-1)||(dx===-1&&nd[1]===1)||(dy===-1&&nd[0]===1)||(dy===1&&nd[0]===-1)?'/':'\\';
      var last=cells[cells.length-1]; last.mirror=o; mirrors.push({x:last.x,y:last.y,sol:o}); dx=nd[0]; dy=nd[1]; }
    if(!ok||mirrors.length<turns)continue;
    var straight=cells.filter(function(c){ return !c.mirror; }); if(straight.length<3)continue;
    var nt=Math.min(straight.length,2+Math.ceil(d/2)), targets=[]; for(var k=0;k<nt;k++){ var c=straight.splice(R.i(0,straight.length-1),1)[0]; targets.push({x:c.x,y:c.y}); }
    // decoy mirrors off the path
    for(var dm=0;dm<Math.max(0,d-1);dm++){ for(var tr=0;tr<30;tr++){ var mx=R.i(bx,bx+bw-1), my=R.i(by,by+bh-1); if(!used[mx+','+my]&&!mirrors.some(function(m){ return Math.abs(m.x-mx)+Math.abs(m.y-my)<2; })){ used[mx+','+my]=1; mirrors.push({x:mx,y:my,sol:null}); break; } } }
    mirrors.forEach(function(m){ m.o=R.chance(0.5)?'/':'\\'; }); if(mirrors.every(function(m){ return !m.sol||m.o===m.sol; }))mirrors[0].o=mirrors[0].sol==='/'?'\\':'/';
    return {bx:bx,by:by,bw:bw,bh:bh,emitter:{x:bx-1,y:ey},mirrors:mirrors,targets:targets}; }
  return null; }
function _trBeamTrace(P){ var pts=[], x=P.emitter.x, y=P.emitter.y, dx=1, dy=0, lit={}, M={}; P.mirrors.forEach(function(m){ M[m.x+','+m.y]=m; }); pts.push({x:x,y:y});
  for(var s=0;s<120;s++){ x+=dx; y+=dy; if(x<P.bx||y<P.by||x>=P.bx+P.bw||y>=P.by+P.bh){ pts.push({x:x-dx*0.5,y:y-dy*0.5}); break; }
    P.targets.forEach(function(t,i){ if(t.x===x&&t.y===y)lit[i]=1; }); var m=M[x+','+y];
    if(m){ pts.push({x:x,y:y}); var ndx,ndy; if(m.o==='/'){ ndx=-dy; ndy=-dx; } else { ndx=dy; ndy=dx; } dx=ndx; dy=ndy; } }
  if(pts.length<2)pts.push({x:x,y:y}); return {pts:pts,lit:lit}; }
// Sokoban by reverse pulls: start solved, pull boulders around, the result is always solvable
function _trSokoban(R,d){ var W=18+Math.min(d,4), H=17+Math.min(d,3), door=Math.floor(W/2);
  for(var att=0;att<200;att++){ var g=_trRect(W,H); for(var x=2;x<W-2;x++)g[(H-6)*W+x]=1; g[(H-6)*W+door-1]=0; g[(H-6)*W+door]=0;   // puzzle room above, start room below, a doorway between
    for(var b=0;b<2+d;b++){ var wx=R.i(4,W-6), wy=R.i(4,H-10); g[wy*W+wx]=1; if(R.chance(0.5))g[wy*W+wx+1]=1; else g[(wy+1)*W+wx]=1; }
    var inRoom=function(x,y){ return x>=3&&x<=W-4&&y>=3&&y<=H-8; }, has=function(B,x,y){ return B.some(function(o){ return o.x===x&&o.y===y; }); };
    var bFree=function(x,y,B){ return inRoom(x,y)&&!g[y*W+x]&&!has(B,x,y); }, pFree=function(x,y,B){ return x>=2&&y>=2&&x<=W-3&&y<=H-3&&!g[y*W+x]&&!has(B,x,y); };
    var nb=Math.min(5,1+d), goals=[]; for(var k=0;k<nb;k++){ for(var tr=0;tr<80;tr++){ var gx=R.i(4,W-5), gy=R.i(4,H-9); var open4=[[1,0],[-1,0],[0,1],[0,-1]].filter(function(v){ return bFree(gx+v[0],gy+v[1],[]); }).length;
        if(bFree(gx,gy,goals)&&open4>=3&&goals.every(function(o){ return Math.abs(o.x-gx)+Math.abs(o.y-gy)>1; })){ goals.push({x:gx,y:gy}); break; } } }
    if(goals.length<nb)continue;
    var B=goals.map(function(o){ return {x:o.x,y:o.y}; }), P={x:door,y:H-7};
    var reach=function(){ var s={}, q=[[P.x,P.y]]; s[P.x+','+P.y]=1; for(var i=0;i<q.length;i++){ var c=q[i]; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(v){ var nx=c[0]+v[0], ny=c[1]+v[1]; if(!s[nx+','+ny]&&pFree(nx,ny,B)){ s[nx+','+ny]=1; q.push([nx,ny]); } }); } return s; };
    var pulls=0, want=10+d*7;
    for(var st=0;st<want*6&&pulls<want;st++){ var rs=reach(), bo=B[R.i(0,B.length-1)], v=[[1,0],[-1,0],[0,1],[0,-1]][R.i(0,3)];
      // pull: the player stands at bo+v and steps back to bo+2v, dragging the boulder into bo+v
      if(!rs[(bo.x+v[0])+','+(bo.y+v[1])])continue; var run=R.i(1,3), moved=0;
      for(var r=0;r<run;r++){ var b1x=bo.x+v[0], b1y=bo.y+v[1], p2x=bo.x+2*v[0], p2y=bo.y+2*v[1]; if(!bFree(b1x,b1y,B.filter(function(o){ return o!==bo; }))||!pFree(p2x,p2y,B))break; bo.x=b1x; bo.y=b1y; P={x:p2x,y:p2y}; moved++; }
      if(moved)pulls++; }
    if(pulls<want*0.6)continue;
    if(B.some(function(o){ return has(goals,o.x,o.y); }))continue;
    if(!reach()[door+','+(H-7)])continue;   // you can walk in from the doorway to where the solution begins
    return {W:W,H:H,g:g,hz:new Uint8Array(W*H),soko:{boulders:B,goals:goals,reset:{x:door+3,y:H-4}}}; }
  return {W:W,H:H,g:_trRect(W,H),hz:new Uint8Array(W*H),soko:{boulders:[],goals:[],reset:{x:3,y:H-4}}}; }
// ── the realm's map (a cavern design fed to buildCavern) ──
function _trialBuild(run){ var st=run.stages[run.stage], d=run.tier, R=rngOf(run.seed*31+run.stage*977), L=TRIAL_LAYOUT[st](R,d), P=TRIAL_PAL[run.q]||TRIAL_PAL[1];
  var D={ id:'trial_'+st, name:TRIAL_THEMES[st].name, seed:run.seed, w:L.W, h:L.H, density:9999, dark:L.dark!==undefined?L.dark:0.25,
    layout:function(){ return L.g.slice(); },
    hazards:function(c){ for(var i=0;i<c.W*c.H;i++)if(L.hz[i])c.hazard[i]=1; },
    paintHazards:function(ctx,c,nz){ paintHazardField(ctx,c,function(x,y){ var n=nz(x*0.4,y*0.4); var A=hexToRgb(P.void), B=hexToRgb(P.glow); var t=Math.max(0,n-0.72)*1.2; return [A[0]+(B[0]-A[0])*t*0.25,A[1]+(B[1]-A[1])*t*0.25,A[2]+(B[2]-A[2])*t*0.25]; }); },
    pal:{floorA:P.floorA,floorB:P.floorB,floorC:P.floorC,rockTop:P.rockTop,rockFace:P.rockFace,void:P.void},
    floorDeco:function(ctx,px,py,tx,ty,R2,n){ if((tx*7+ty*13)%23===0){ ctx.fillStyle=rgba(P.rune,0.22); ctx.font='14px serif'; ctx.fillText(TRIAL_GLYPHS[(tx+ty)%TRIAL_GLYPHS.length],px+9,py+21); } },
    obstacles:function(){}, draw:{},
    extra:function(c){ for(var i=0;i<14;i++){ var x=c.R.i(2,c.W-3), y=c.R.i(2,c.H-3); if(!c.g[y*c.W+x])addLight(c.m,x*LT+16,y*LT+16,90,P.glow,0.14,{pulse:0.3,period:2200+i*120,depth:-4,cut:0.5}); } },
    particles:[{tints:[P.glow,'#ffffff'],freq:150,scale:{start:0.35,end:0},alpha:{start:0.8,end:0},vy:{min:-14,max:-4}}] };
  var m=buildCavern(D,run.seed+run.stage*7,{game:true,last:true});
  if(L.dark!==undefined){ m.trialDark=L.dark; m.heroLight=L.heroLight||70; }
  m.trial=L; return m; }

// how each theme gets harder, tier 1 (Grasslands) … 5 (Fairy Monarchs)
function _trialScaleText(t,d){ return ({
  rune_targets:(6+2*d)+' stars, each lasts '+Math.max(3.2,7.5-0.8*d).toFixed(1)+' s, '+(60+10*d)+' s',
  echo_path:Math.min(10,5+d)+' tiles, sequences of '+(2+d)+' → '+(4+d),
  guardian:(28+6*d)+' s, wisps every '+Math.max(0.7,2.3-0.28*d).toFixed(1)+' s',
  rune_lock:Math.min(6,2+d)+' stones × '+Math.min(6,3+Math.min(d,3))+' symbols · '+(d>=4?'pattern hidden (peek costs time), stones linked':d===3?'pattern reversed, stones linked':d===2?'pattern flickers':'pattern always shown'),
  escort:'seedling walks '+(34+Math.min(4,d)*2)+' tiles · monsters every '+Math.max(1.3,3.4-0.45*d).toFixed(1)+' s',
  shadow_duel:'shadow familiar with '+Math.min(4,d)+' attack types'+(d>4?' and extra health':''),
  light_align:Math.min(4,d)+2+' turns, '+(2+Math.ceil(d/2))+' rune targets, '+Math.max(0,d-1)+' decoy mirrors',
  collapse_path:Math.min(13,4+2*d)+' rows × '+(d>=5?5:d>=4?4:3)+' stones · stones crack after '+Math.max(1.2,4.2-0.55*d).toFixed(1)+' s',
  lights_out:'maze '+(6+2*Math.min(d,5))+'×'+(4+2*Math.min(d,5))+' rooms · '+(3+d)+' wisps · '+Math.max(0,d-1)+' shades',
  boulder_push:Math.min(5,1+d)+' boulders · '+(10+d*7)+' moves scrambled',
  mirror_walk:(3+d)+' runes · '+(3+d*2)+' rune-fires'+(d>=3?' · '+(d-1)+' roaming sparks':''),
  beam_gauntlet:(1+Math.min(d,5))+' sweeping beams · 3 shards'
})[t]||''; }
