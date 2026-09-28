// ═══════════════════════════════════════════════════════════════════════
// ║ VILLAGE → GAME WORLD: stamps villagePlan(stage) (07l) onto the world
// ║ around (CENTER_X, CENTER_Y): ground kinds, walkable/blocked tiles, props,
// ║ landmarks and ley lines. Re-run whenever a craftsman is freed; the
// ║ enterable buildings keep their tiles (doors) at every stage.
// ═══════════════════════════════════════════════════════════════════════
var VILLAGE_RMAX=48;
function villageStageOf(ps){ return Math.min(5,1+((ps&&ps.rescued)||[]).length); }
function villageApply(wd,stage){
  _wkInit();
  var W=WORLD_W, cx=CENTER_X, cy=CENTER_Y, RM=VILLAGE_RMAX, G=function(k){ return _wkReg(k); };
  if(!wd._vbase){   // first time: remember the land under the village, clear wild dressing there
    var cells=[]; for(var dy=-RM;dy<=RM;dy++)for(var dx=-RM;dx<=RM;dx++){ if(Math.hypot(dx+0.5,dy+0.5)>RM)continue; var x=cx+dx, y=cy+dy, k=y*W+x; cells.push([dx,dy,wd.tiles[y][x],wd.kind[k]]); }
    wd._vbase=cells;
    wd.props=wd.props.filter(function(p){ return Math.hypot(p.x+p.w/2-cx,p.y+p.h/2-cy)>RM+1; });
    if(wd.lines){ var keep=[]; for(var i=0;i<wd.lines.length;i+=3){ if(Math.hypot(wd.lines[i]-cx,wd.lines[i+1]-cy)>RM-2)keep.push(wd.lines[i],wd.lines[i+1],wd.lines[i+2]); } wd.lines=new Float32Array(keep); }
  }
  // restore the base, then build this stage
  var baseT={}; wd._vbase.forEach(function(c){ var x=cx+c[0], y=cy+c[1]; wd.tiles[y][x]=c[2]; wd.kind[y*W+x]=c[3]; baseT[c[0]+','+c[1]]=c; });
  var coreSet={}; VILLAGE_CORE.forEach(function(b){ for(var j=0;j<b.h;j++)for(var i=0;i<b.w;i++)coreSet[(b.dx+i)+','+(b.dy+j)]=1; });
  var okCls=function(c){ return c===WM.VILLAGE||c===WM.LAND||c===WM.ROAD||c===WM.BEACH||c===WM.BRIDGE; };
  var ok=function(dx,dy){ if(Math.hypot(dx+0.5,dy+0.5)>RM)return false; var b=baseT[dx+','+dy]; if(!b)return false; if(coreSet[dx+','+dy])return false;
    return okCls(wd.cls[(cy+dy)*W+cx+dx]); };
  var water=function(dx,dy){ if(Math.hypot(dx+0.5,dy+0.5)>RM)return false; return wd.cls[(cy+dy)*W+cx+dx]===WM.LAKE; };
  var plan=villagePlan(stage,ok,water), vg=G(WSK.vgrass);
  wd._vbase.forEach(function(c){ var dx=c[0], dy=c[1], d=Math.hypot(dx+0.5,dy+0.5); if(d>plan.disk)return; var x=cx+dx, y=cy+dy, k=y*W+x;
    if(coreSet[dx+','+dy]){ wd.kind[k]=vg; return; }
    if(!okCls(wd.cls[k]))return; wd.kind[k]=vg; wd.tiles[y][x]=T.VILLAGE_FLOOR; });
  Object.keys(plan.kinds).forEach(function(key){ var q=key.split(','), dx=+q[0], dy=+q[1]; if(Math.hypot(dx+0.5,dy+0.5)>plan.disk+0.5||coreSet[key])return; var x=cx+dx, y=cy+dy, k=y*W+x; if(!okCls(wd.cls[k]))return;
    var kid=plan.kinds[key]; if(kid==='vpier')return; var K=kid==='vgrass'?WSK.vgrass:(VR_KINDS[kid]||WSK.vgrass); wd.kind[k]=G(K); if(kid==='vstreet'||kid==='vlane'||kid==='vpave')wd.tiles[y][x]=T.PATH; });
  (plan.walk||[]).forEach(function(q){ var x=cx+q[0], y=cy+q[1]; if(Math.hypot(q[0]+0.5,q[1]+0.5)>RM)return; wd.tiles[y][x]=T.BRIDGE; wd.kind[y*W+x]=G(VR_KINDS.vpier); });
  plan.solid.forEach(function(q){ if(coreSet[q[0]+','+q[1]])return; var x=cx+q[0], y=cy+q[1]; if(Math.hypot(q[0]+0.5,q[1]+0.5)>RM)return; wd.tiles[y][x]=T.PROP; });
  // props, landmarks, ley lines
  wd.props=wd.props.filter(function(p){ return !p.vill; });
  plan.props.forEach(function(p){ wd.props.push({prop:p.prop,x:cx+p.x,y:cy+p.y,w:p.w,h:p.h,o:p.o,zi:-1,vill:true}); });
  var byChunk={}; wd.props.forEach(function(p){ var c0=Math.floor((p.x-2)/WCH), c1=Math.floor((p.x+p.w+1)/WCH), r0=Math.floor((p.y-2)/WCH), r1=Math.floor((p.y+p.h+1)/WCH);
    for(var yy=r0;yy<=r1;yy++)for(var xx=c0;xx<=c1;xx++){ var key=xx+'_'+yy; (byChunk[key]=byChunk[key]||[]).push(p); } });
  wd.propsByChunk=byChunk;
  wd.landmarks=(wd.landmarks||[]).filter(function(L){ return !L.vill; });
  plan.landmarks.forEach(function(L){ wd.landmarks.push({x:(cx+L.x)*LT,y:(cy+L.y)*LT,w:L.w*LT,h:L.h*LT,text:L.text,zone:'village',vill:true}); });
  wd.ley=(wd.ley||[]).filter(function(L){ return !L.vill; });
  plan.ley.forEach(function(L){ var pts=L.pts.map(function(p){ return [cx+p[0],cy+p[1]]; }), xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
    wd.ley.push({pts:pts,col:L.col,vill:true,bx0:Math.min.apply(null,xs),bx1:Math.max.apply(null,xs),by0:Math.min.apply(null,ys),by1:Math.max.apply(null,ys)}); });
  VILLAGE_RADIUS=Math.max(26,plan.disk-2);
  wd.villageStage=plan.stage; wd.villageBuildings=plan.houses; wd.baseVer=(wd.baseVer||0)+1;
  var keys=[]; for(var ry=Math.floor((cy-RM-2)/WCH);ry<=Math.floor((cy+RM+2)/WCH);ry++)for(var rx=Math.floor((cx-RM-2)/WCH);rx<=Math.floor((cx+RM+2)/WCH);rx++)keys.push([rx,ry]);
  return keys;
}
