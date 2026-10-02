// ═══════════════════════════════════════════════════════════════════════
// ║ FAMILIARS v3 — elemental spirit familiars (Phase 4c)
// ║ One familiar per quadrant (its island dungeon): grass, water, earth, fire.
// ║ The look comes from the design Kris picked (FAMILIAR_PICK, 07w). Each
// ║ starts with 1 skill and learns up to 5 more from its quadrant's fairies
// ║ (level 1 → 6). Round 6: a familiar uses its basic attack plus ONE chosen
// ║ special (ps.famSpecial[fid], picked in its info card; default = newest);
// ║ both auto-cast and grow with the familiar's level and yours.
// ║ Familiars need line of sight, can be staggered by slams/sweeps/breath/
// ║ shrieks/gusts/nets and knocked out (8–15 s), banished by some casters,
// ║ silenced by null auras; their hits are source 'familiar' (07rb counters). Active familiars: 1, +1 for each
// ║ Fairy King (Wetlands, Highlands, Ashlands) → up to 4 at once.
// ║ Movement: "hover" spirits circle above you, "follow" spirits walk behind.
// ═══════════════════════════════════════════════════════════════════════
var FAM_BY_EL={grass:'fam_grass',water:'fam_water',earth:'fam_earth',fire:'fam_fire'}, FAM_EL={fam_grass:'grass',fam_water:'water',fam_earth:'earth',fam_fire:'fire'};
var FAM_BY_SEC={1:'fam_grass',2:'fam_water',3:'fam_earth',4:'fam_fire'};
var FAM_ICON={grass:'🌿',water:'💧',earth:'🪨',fire:'🔥'};
Object.keys(SPIRIT_ELEMENTS).forEach(function(k){ SPIRIT_ELEMENTS[k].key=k; });
// every familiar hit is source 'familiar' (monster counters in 07rb): kind proj | area, element, which familiar
function _famHit(scene,fid,E,S,m,dmg,o){ return _heroHitMonster(scene,m,dmg,Object.assign({src:'familiar',el:E.key,fk:S.kind==='proj'?'proj':'area',fid:fid},o||{})); }
// (skills: FAM_SKILLS in 07w-spirits.js, shared with the Lab)
// ── data: the 4 familiars (names/looks follow the Lab pick) ──
Object.keys(FAMILIARS).forEach(function(k){ delete FAMILIARS[k]; });
function _famDesign(fid){ var el=FAM_EL[fid]; return SPIRIT_BY_ID[FAMILIAR_PICK[el]]||SPIRIT_DESIGNS.find(function(D){ return D.el===el; }); }
['grass','water','earth','fire'].forEach(function(el){ var fid=FAM_BY_EL[el], E=SPIRIT_ELEMENTS[el];
  Object.defineProperty(FAMILIARS,fid,{enumerable:true,configurable:true,get:function(){ var D=_famDesign(fid); return {n:D.name,icon:FAM_ICON[el],sec:E.q,el:el,design:D.id,desc:D.tagline+' — '+E.name+' spirit'}; }}); });
function _famLevel(ps,fid){ return Math.max(1,Math.min(6,((ps&&ps.famLevels)||{})[fid]||1)); }
function _famSkills(ps,fid){ return FAM_SKILLS[FAM_EL[fid]].slice(0,_famLevel(ps,fid)); }
// ── the chosen special (round 6) ──
function _famSpecialIdx(ps,fid){ var L=_famLevel(ps,fid); if(L<2)return -1; var s=((ps&&ps.famSpecial)||{})[fid]; if(typeof s!=='number'||s<1||s>=L)s=L-1; return s; }
function _famActiveSkills(ps,fid){ var all=FAM_SKILLS[FAM_EL[fid]], out=[{S:all[0],i:0}], si=_famSpecialIdx(ps,fid); if(si>0)out.push({S:all[si],i:si}); return out; }
window._setFamSpecial=function(fid,i){ var ws=_heroWS(); if(!ws)return; var ps=ws.playerState; if(!ps.famSpecial)ps.famSpecial={}; if(i<1||i>=_famLevel(ps,fid))return; ps.famSpecial[fid]=i;
  if(ps._famWard&&FAM_SKILLS[FAM_EL[fid]][i].kind!=='ward')delete ps._famWard[fid];
  showNotif(FAMILIARS[fid].icon+' '+FAMILIARS[fid].n+' will use '+FAM_SKILLS[FAM_EL[fid]][i].name,'#cfe8ff'); if(document.getElementById('familiar-info-modal')&&document.getElementById('familiar-info-modal').style.display==='flex')showFamiliarInfo(fid); if(ws._emitUI)ws._emitUI(); };
// ── knock-outs + stagger (round 6) ──
var FAM_ST={};
function _famSt(fid){ return FAM_ST[fid]||(FAM_ST[fid]={stag:0,ko:0}); }
function _famQuad(scene){ var k=scene.sys.settings.key; if(k==='Dungeon')return scene.siteSection||2; var c=_heroCtx(scene); if((k==='World'||k==='Island')&&typeof getTileSection==='function')return getTileSection(Math.floor(c.x/TILE),Math.floor(c.y/TILE))||1; return 2; }
function _famKO(scene,fid,t,why){ var st=_famSt(fid); if(st.ko>0)return; st.ko=t||(8+(_famQuad(scene)-1)*7/3); st.stag=0; var v=scene._famVisuals&&scene._famVisuals[fid], f=FAMILIARS[fid];
  if(v&&f){ _heroFloat(scene,v.x,v.y-30,'💫 '+f.n+' '+(why||'knocked out')+' ('+Math.round(st.ko)+' s)','#d8b8ff'); _famRing(scene,v.x,v.y,40,'#b080ff',400); } }
function _famStaggerOne(scene,fid,amt,why){ var st=_famSt(fid); if(st.ko>0)return; st.stag+=amt; var v=scene._famVisuals&&scene._famVisuals[fid];
  if(st.stag>=100)_famKO(scene,fid,0,why==='net'?'caught in a net':'knocked out'); else if(v){ _heroFloat(scene,v.x,v.y-24,'dazed','#d8c8ff'); v._daze=0.35; } }
function _famStaggerAt(scene,x,y,r,amt,why){ var V=scene._famVisuals; if(!V)return; Object.keys(V).forEach(function(fid){ var v=V[fid]; if(v&&v.active&&Math.hypot(v.x-x,v.y-y)<=r)_famStaggerOne(scene,fid,amt,why); }); }
MX.famStaggerAt=_famStaggerAt; MX.famKO=_famKO;
MX.onFamReflect=function(scene,fid,mon){ if(scene&&fid)_famStaggerOne(scene,fid,60,'mirror'); };
MX.famNetAt=function(scene,x,y){ var V=scene._famVisuals, hit=false; if(!V)return false; Object.keys(V).forEach(function(fid){ var v=V[fid]; if(!hit&&v&&v.active&&_famSt(fid).ko<=0&&Math.hypot(v.x-x,v.y-y)<16){ hit=true; _famStaggerOne(scene,fid,100,'net'); } }); return hit; };
MX.famNear=function(scene,x,y,r){ var V=scene._famVisuals, best=null, bd=r; if(!V)return null; Object.keys(V).forEach(function(fid){ var v=V[fid]; if(!v||!v.active||_famSt(fid).ko>0)return; var d=Math.hypot(v.x-x,v.y-y); if(d<bd&&_heroLOS(scene,x,y,v.x,v.y)){ bd=d; best={fid:fid,x:v.x,y:v.y}; } }); return best; };
function _famMult(ps,fid){ return (1+0.12*(((ps&&ps.level)||1)-1))*(1+0.15*(_famLevel(ps,fid)-1)); }
function _maxFamiliarSlots(ps){ return Math.min(4,1+((ps&&ps.fairyKings)||[]).length); }
var FAM_SLOTS=['familiar','familiar2','familiar3','familiar4'];
function _heroActiveFamiliars(ps){ var out=[], max=_maxFamiliarSlots(ps); for(var i=0;i<max;i++){ var f=ps[FAM_SLOTS[i]]; if(f&&FAM_EL[f]&&out.indexOf(f)<0&&(ps.ownedFamiliars||[]).indexOf(f)>=0)out.push(f); } return out; }
// round 9 (Kris): each extra active familiar hits softer — by slot: 100 / 60 / 40 / 25% (all four ≈ 2.25× one)
var FAM_SLOT_DMG=[1,0.6,0.4,0.25];
function _famSlotK(ps,fid){ var i=_heroActiveFamiliars(ps).indexOf(fid); return i<0?1:FAM_SLOT_DMG[Math.min(i,FAM_SLOT_DMG.length-1)]; }
function _heroFamiliarActive(ps,fid){ return !!ps&&_heroActiveFamiliars(ps).indexOf(fid)>=0; }
function _familiarDamage(fid,ps){ var s=FAM_SKILLS[FAM_EL[fid]][0]; return Math.round(s.dmg*_famMult(ps,fid)*_famSlotK(ps,fid)); }
function _toggleFamiliar(fid){ var ws=_heroWS(); if(!ws)return; var ps=ws.playerState, max=_maxFamiliarSlots(ps);
  for(var i=0;i<4;i++){ if(ps[FAM_SLOTS[i]]===fid){ ps[FAM_SLOTS[i]]=null; ws._emitUI(); return; } }
  for(var j=0;j<max;j++){ if(!ps[FAM_SLOTS[j]]){ ps[FAM_SLOTS[j]]=fid; ws._emitUI(); return; } }
  ps.familiar=fid; ws._emitUI(); }
// migrate old familiars (firefly, wind sprite, sea sprite, storm hawk, frost wisp)
var FAM_OLD={firefly:'fam_grass',wind_sprite:'fam_grass',sea_sprite:'fam_water',storm_hawk:'fam_earth',frost_wisp:'fam_fire'};
function _famMigrate(d){ var own=[]; (d.ownedFamiliars||[]).forEach(function(f){ var n=FAM_OLD[f]||f; if(FAM_EL[n]&&own.indexOf(n)<0)own.push(n); });
  (d.completedIslands||[]).forEach(function(sec){ var n=FAM_BY_SEC[sec]; if(n&&own.indexOf(n)<0)own.push(n); });
  d.ownedFamiliars=own; FAM_SLOTS.forEach(function(k){ var f=d[k]; d[k]=f?(FAM_OLD[f]||f):null; if(d[k]&&!FAM_EL[d[k]])d[k]=null; });
  if(!d.familiar&&own.length)d.familiar=own[0]; if(!d.famLevels)d.famLevels={}; if(!Array.isArray(d.fairyKings))d.fairyKings=[]; if(!d.fairyQuests)d.fairyQuests={}; return d; }

// ── textures ──
function _famTex(scene,D){ var key='spirit_'+D.id; if(scene.textures.exists(key))return key; var fr=spiritFrames(D), cv=mkCanvas(448,112), x=cv.getContext('2d'); fr.forEach(function(f,i){ x.drawImage(f,i*112,0); });
  var t=scene.textures.addCanvas(key,cv); for(var i=0;i<4;i++)t.add(String(i),0,i*112,0,112,112); return key; }
function _famDepth(scene,y,hover){ var k=scene.sys.settings.key; if(k==='World'||k==='Island'||k==='Dungeon')return hover?12.65:10+y/100000+0.000005; return 21; }

// ── per-frame driver (all scenes) ──
function _heroFamiliarsTick(scene,dt){
  var c=_heroCtx(scene), ps=c.ps; if(!ps)return;
  var fams=_heroActiveFamiliars(ps);
  if(!scene._famVisuals)scene._famVisuals={}; if(!scene._famTimers)scene._famTimers={};
  Object.keys(scene._famVisuals).forEach(function(f){ if(fams.indexOf(f)<0){ var v=scene._famVisuals[f]; if(v){ if(v._halo)v._halo.destroy(); if(v._em)v._em.destroy(); v.destroy(); } delete scene._famVisuals[f]; } });
  // hero trail for "follow" spirits
  var tr=scene._famTrail||(scene._famTrail=[]); var lt=tr[tr.length-1]; if(lt&&Math.hypot(lt.x-c.x,lt.y-c.y)>160){ tr.length=0; lt=null; } if(!lt||Math.hypot(lt.x-c.x,lt.y-c.y)>3){ tr.push({x:c.x,y:c.y}); if(tr.length>80)tr.shift(); }
  var nFollow=0, nHover=0;
  // monsters with a null aura (07rb) silence familiars near them
  var nullers=fams.length?(c.monsters||[]).filter(function(m){ if(m.dead||!m.kit)return false; if(m.kit._null===undefined){ var D=m.kit.def.find(function(d){ return d.name==='nullaura'; }); m.kit._null=D?(D.p.r||130):0; } return m.kit._null>0; }):[];
  fams.forEach(function(fid,i){ var D=_famDesign(fid), E=SPIRIT_ELEMENTS[D.el], v=scene._famVisuals[fid];
    if(!v||!v.active){ var key=_famTex(scene,D); v=scene.add.image(c.x,c.y,key,'0').setScale(0.5*(D.sz||1)).setAlpha(0.92);
      if(!scene.textures.exists('glow')&&typeof CHX!=='undefined')CHX.glow(scene);
      v._halo=scene.add.image(c.x,c.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(E.col)).setAlpha(0.35).setScale(0.75);
      if(scene.textures.exists('dot')){ v._em=scene.add.particles(0,0,'dot',{follow:v,lifespan:900,speed:{min:4,max:18},scale:{start:0.45,end:0},alpha:{start:0.8,end:0},tint:[hexNum(E.col),hexNum(E.mote),0xffffff],frequency:70,blendMode:'ADD'}); }
      v.x=c.x; v.y=c.y; v._t=Math.random()*6; scene._famVisuals[fid]=v; }
    v._t+=dt; var hover=D.move==='hover', tx, ty;
    if(hover){ var a=v._t*1.2+nHover*Math.PI; tx=c.x+Math.cos(a)*34; ty=c.y-30+Math.sin(a)*10+Math.sin(v._t*3)*3; nHover++; }
    else { var back=Math.min(tr.length-1,10+nFollow*9), p=tr[tr.length-1-back]||{x:c.x,y:c.y}; tx=p.x-(back<10?20:0); ty=p.y+2; nFollow++; }
    if(Math.hypot(tx-v.x,ty-v.y)>260){ v.x=tx; v.y=ty; } var dx=tx-v.x, dy=ty-v.y; v.x+=dx*Math.min(1,dt*(hover?5:7)); v.y+=dy*Math.min(1,dt*(hover?5:7));
    if(Math.abs(dx)>1.5)v.setFlipX(dx<0); else if(!hover)v.setFlipX(c.x<v.x);
    v.setFrame(String(Math.floor(v._t*(hover?7:6))%4)); v.setDepth(_famDepth(scene,v.y,hover));
    v._halo.setPosition(v.x,v.y).setDepth(_famDepth(scene,v.y,true)-0.001).setScale(0.7+0.08*Math.sin(v._t*3));
    if(v._em)v._em.setDepth(_famDepth(scene,v.y,true)-0.002);
    // knocked out / dazed / silenced
    var st=_famSt(fid); if(st.stag>0)st.stag=Math.max(0,st.stag-12*dt);
    if(st.ko>0){ st.ko-=dt; v.setAlpha(0.28).setTint(0x9080b0); v._halo.setAlpha(0.08); v.setAngle(Math.sin(v._t*4)*25); if(st.ko<=0){ v.setAlpha(0.92).clearTint().setAngle(0); _heroFloat(scene,v.x,v.y-26,'✨ '+FAMILIARS[fid].n+' is back!','#cfe8ff'); } return; }
    if(v._daze>0){ v._daze-=dt; return; }
    var nul=nullers.find(function(m){ return Math.hypot(m.x-v.x,m.y-v.y)<m.kit._null; });
    if(nul){ v.setAlpha(0.55); if(!v._nulSay||v._t-v._nulSay>3){ v._nulSay=v._t; _heroFloat(scene,v.x,v.y-24,'silenced','#b0b0c8'); } return; } else v.setAlpha(0.92);
    // skills: the basic attack + the chosen special
    var T=scene._famTimers[fid]||(scene._famTimers[fid]={}), mult=_famMult(ps,fid)*_famSlotK(ps,fid);   // heals don't use mult
    _famActiveSkills(ps,fid).forEach(function(o){ var S=o.S, si=o.i; if(T[si]===undefined)T[si]=Math.min(1.2+(si?0.7:0),S.cd); T[si]-=dt; if(T[si]>0)return;
      var ok=_famCast(scene,fid,S,v,c,ps,mult,E); T[si]=ok?S.cd*(1-0.04*(_famLevel(ps,fid)-1)):0.35; if(ok&&S.kind!=='aura'){ v._halo.setAlpha(0.8); scene.tweens.add({targets:v._halo,alpha:0.35,duration:400}); } });
  });
  _famWardTick(scene,c,ps,dt);
  _famHudTick(scene,fams,ps,dt);
}
function _famNearest(c,mons,from,range,scene){ var b=null,bd=range; mons.forEach(function(m){ if(m.dead||m._m&&m._m.hidden)return; var d=_hbD(m,from.x,from.y); if(d<bd&&_heroLOS(scene,from.x,from.y,m.x,m.y)&&_heroLOS(scene,c.x,c.y,m.x,m.y)){bd=d;b=m;} }); return b; }
function _famFx(scene,m,S,E,mult){ if(m.dead)return; var f=S.fx;
  if(f==='root'||f==='freeze'||f==='stun'){ var hd=_heroHold(scene,m,S.t||1); if(hd>0&&typeof _heroSlow==='function')_heroSlow(scene,m,hd,0.05); }
  else if(f==='slow')_heroSlow(scene,m,S.t||2,0.6);
  else if(f==='burn'||f==='poison')_heroBurn(m,S.t||3,Math.max(1,S.dmg*mult*0.3),E.key);
  else if(f==='knock'||f==='push'){ var a=Math.atan2(m.y-scene._famOy,m.x-scene._famOx); for(var st=0,mv=0;mv<(f==='push'?80:45);mv+=6){ var nx=m.x+Math.cos(a)*6, ny=m.y+Math.sin(a)*6; if(!_heroMonsterCanStand(scene,nx,ny))break; m.x=nx; m.y=ny; } if(m.cont)m.cont.setPosition(m.x,m.y); m._lastX=m.x; m._lastY=m.y; }
  else if(f==='pull'){ var d=Math.hypot(scene._famOx-m.x,scene._famOy-m.y)||1, k=Math.min(60,d-24)/d; if(k>0){ var nx2=m.x+(scene._famOx-m.x)*k, ny2=m.y+(scene._famOy-m.y)*k; if(_heroMonsterCanStand(scene,nx2,ny2)){ m.x=nx2; m.y=ny2; if(m.cont)m.cont.setPosition(m.x,m.y); m._lastX=m.x; m._lastY=m.y; } } } }
function _famRing(scene,x,y,r,col,dur){ var g=scene.add.circle(x,y,8,hexNum(col),0.35).setStrokeStyle(3,hexNum(col),0.9).setDepth(12.6); scene.tweens.add({targets:g,radius:r,alpha:0,duration:dur||450,onComplete:function(){ g.destroy(); }}); }
function _famCast(scene,fid,S,v,c,ps,mult,E){ var mons=c.monsters.filter(function(m){ return !m.dead; }), dmg=(S.dmg||0)*mult; scene._famOx=c.x; scene._famOy=c.y;
  if(S.kind==='proj'){ var t=_famNearest(c,mons,v,S.range,scene); if(!t)return false;
    if(!scene._famProj2)scene._famProj2=[]; var a=Math.atan2(t.y-v.y,t.x-v.x), sp=S.pierce?420:320;
    var dot=scene.add.image(v.x,v.y,'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(hexNum(E.col)).setScale(S.fx==='splash'?0.3:0.2).setDepth(12.7), core=scene.add.circle(v.x,v.y,S.fx==='splash'?5:3,hexNum(E.core),1).setDepth(12.71);
    var hitSet=[];
    scene._famProj2.push({vis:core,glow:dot,x:v.x,y:v.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,tgt:S.pierce?null:t,life:1.4,pierce:!!S.pierce,hitSet:hitSet,
      onHit:function(m){ _famHit(scene,fid,E,S,m,dmg,{col:E.col}); _famFx(scene,m,S,E,mult);
        if(S.fx==='splash'){ _famRing(scene,m.x,m.y,S.rad||70,E.col,350); mons.forEach(function(m2){ if(m2!==m&&!m2.dead&&Math.hypot(m2.x-m.x,m2.y-m.y)<(S.rad||70)&&_heroLOS(scene,m.x,m.y,m2.x,m2.y)){ _famHit(scene,fid,E,{kind:'area'},m2,dmg*0.6,{pure:true,col:E.col}); _heroBurn(m2,3,Math.max(1,dmg*0.15),E.key); } }); } }});
    return true; }
  if(S.kind==='nova'){ var inR=mons.filter(function(m){ return _hbD(m,c.x,c.y)<=S.radius&&_heroLOS(scene,c.x,c.y,_hbP(m,c.x,c.y).x,_hbP(m,c.x,c.y).y,true); }); if(!inR.length&&!S.heal)return false; if(!inR.length&&S.heal&&ps.hp>=ps.maxHp)return false;
    _famRing(scene,c.x,c.y,S.radius,E.col); inR.forEach(function(m){ if(dmg)_famHit(scene,fid,E,S,m,dmg,{col:E.col}); _famFx(scene,m,S,E,mult); });
    if(S.heal)_famHeal(scene,c,ps,S.heal); return true; }
  if(S.kind==='heal'){ if(ps.hp>=ps.maxHp||ps.hp<=0)return false; var n=S.ticks||1, i=0; var tick=function(){ if(ps.hp>0)_famHeal(scene,_heroCtx(scene),ps,S.pct); }; tick();
    if(n>1)scene.time.addEvent({delay:1000,repeat:n-2,callback:tick}); return true; }
  if(S.kind==='ward'){ var st=ps._famWard||(ps._famWard={}); if(st[fid]&&st[fid].ready)return false; st[fid]={ready:true,col:E.col,name:S.name}; _heroFloat(scene,c.x,c.y-36,'✨ '+S.name,E.col); return true; }
  if(S.kind==='rain'){ var ts=mons.filter(function(m){ return _hbD(m,c.x,c.y)<=S.range&&_heroLOS(scene,c.x,c.y,_hbP(m,c.x,c.y).x,_hbP(m,c.x,c.y).y); }); if(!ts.length)return false; ts.sort(function(a,b){ return Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y); });
    for(var k=0;k<S.n;k++){ (function(t2,delay){ var x=t2.x+(k?(Math.random()-0.5)*40:0), y=t2.y+(k?(Math.random()-0.5)*40:0); var rock=scene.add.circle(x-40,y-160,9,hexNum(E.deep),1).setStrokeStyle(2,hexNum(E.col),1).setDepth(12.7);
      scene.tweens.add({targets:rock,x:x,y:y,duration:420,delay:delay,ease:'Quad.easeIn',onComplete:function(){ rock.destroy(); _famRing(scene,x,y,S.rad,E.col,300); if(scene.cameras&&scene.cameras.main)scene.cameras.main.shake(90,0.004);
        _heroCtx(scene).monsters.forEach(function(m){ if(!m.dead&&_hbD(m,x,y)<S.rad&&_heroLOS(scene,x,y,_hbP(m,x,y).x,_hbP(m,x,y).y))_famHit(scene,fid,E,S,m,dmg,{col:E.col}); }); }}); })(ts[k%ts.length],k*140); }
    return true; }
  if(S.kind==='aura'){ var hit=false; mons.forEach(function(m){ if(_hbD(m,c.x,c.y)<=S.radius&&_heroLOS(scene,c.x,c.y,_hbP(m,c.x,c.y).x,_hbP(m,c.x,c.y).y)){ _famHit(scene,fid,E,S,m,dmg,{pure:true,col:E.col,suffix:'🔥'}); hit=true; } }); if(hit)_famRing(scene,c.x,c.y,S.radius,E.col,260); return hit; }
  if(S.kind==='wave'){ var fa=_heroDirAngle(c.dir), tg=_famNearest(c,mons,c,S.len,scene); if(tg)fa=Math.atan2(tg.y-c.y,tg.x-c.x); else return false;
    var wl=S.len; for(var s0=12;s0<S.len;s0+=8){ if(_heroWallAt(scene,c.x+Math.cos(fa)*s0,c.y+Math.sin(fa)*s0)){ wl=s0; break; } }
    var ex=c.x+Math.cos(fa)*wl, ey=c.y+Math.sin(fa)*wl, g=scene.add.graphics().setDepth(12.6); g.lineStyle(S.wid*0.6,hexNum(E.col),0.35); g.lineBetween(c.x,c.y,ex,ey); g.lineStyle(4,hexNum(E.core),0.9); g.lineBetween(c.x,c.y,ex,ey);
    scene.tweens.add({targets:g,alpha:0,duration:420,onComplete:function(){ g.destroy(); }});
    mons.forEach(function(m){ var hq=_hbP(m,c.x+Math.cos(fa)*Math.min(wl,_hbD(m,c.x,c.y)),c.y+Math.sin(fa)*Math.min(wl,_hbD(m,c.x,c.y))), px=hq.x-c.x, py=hq.y-c.y, along=px*Math.cos(fa)+py*Math.sin(fa), side=Math.abs(-px*Math.sin(fa)+py*Math.cos(fa)); if(along>0&&along<wl&&side<S.wid/2+(m._hurtR?6:((m.def&&m.def.r)||10))&&_heroLOS(scene,c.x,c.y,hq.x,hq.y)){ _famHit(scene,fid,E,S,m,dmg,{col:E.col}); _famFx(scene,m,S,E,mult); } });
    return true; }
  if(S.kind==='laststand'){ if(ps.hp<=0||ps.hp>ps.maxHp*S.pct)return false; _famHeal(scene,c,ps,S.pct); _famRing(scene,c.x,c.y,80,E.col); _heroFloat(scene,c.x,c.y-44,'🔥 '+S.name+'!',E.col); return true; }
  return false; }
function _famHeal(scene,c,ps,pct){ var h=Math.max(1,Math.round(ps.maxHp*pct)); ps.hp=Math.min(ps.maxHp,ps.hp+h); _heroFloat(scene,c.x,c.y-30,'+'+h+' HP','#80ff90'); var ws=_heroWS(); if(ws&&ws._emitUI)ws._emitUI(); }
// wards: refund the next hit
function _famWardTick(scene,c,ps,dt){ var st=ps._famWard; if(!st){ ps._famLastHp=ps.hp; return; } var ready=Object.keys(st).filter(function(k){ return st[k]&&st[k].ready&&_heroFamiliarActive(ps,k)&&_famSt(k).ko<=0&&_famActiveSkills(ps,k).some(function(o){ return o.S.kind==='ward'; }); });
  if(ready.length&&ps._famLastHp!==undefined&&ps.hp<ps._famLastHp&&ps.hp>0&&!ps.godMode){ var lost=ps._famLastHp-ps.hp; ps.hp=ps._famLastHp; var w=st[ready[0]]; w.ready=false; _heroFloat(scene,c.x,c.y-36,'🛡 '+w.name+' blocked '+lost,w.col); }
  ps._famLastHp=ps.hp;
  if(ready.length){ var col=st[ready[0]].col; if(!scene._famBubble||!scene._famBubble.active)scene._famBubble=scene.add.circle(c.x,c.y-12,22,hexNum(col),0.1).setStrokeStyle(1.5,hexNum(col),0.7).setDepth(12.6); scene._famBubble.setPosition(c.x,c.y-12).setAlpha(0.7+0.3*Math.sin(Date.now()/300)); }
  else if(scene._famBubble){ scene._famBubble.destroy(); scene._famBubble=null; } }
// ── HUD: one chip per active familiar — its special, cooldown, knocked-out / silenced state ──
function _famHudTick(scene,fams,ps,dt){ scene._famHudT=(scene._famHudT||0)-dt; if(scene._famHudT>0)return; scene._famHudT=0.2;
  var el=document.getElementById('fam-hud'); if(!el){ el=document.createElement('div'); el.id='fam-hud'; document.body.appendChild(el); }
  if(!fams.length){ if(el.innerHTML)el.innerHTML=''; el.style.display='none'; return; } el.style.display='flex';
  el.innerHTML=fams.map(function(fid){ var f=FAMILIARS[fid], D=_famDesign(fid), E=SPIRIT_ELEMENTS[D.el], st=_famSt(fid), si=_famSpecialIdx(ps,fid), S=si>0?FAM_SKILLS[D.el][si]:null, T=(scene._famTimers&&scene._famTimers[fid])||{}, v=scene._famVisuals&&scene._famVisuals[fid];
    var cd=S?Math.max(0,T[si]||0):0, pct=S?Math.min(1,cd/S.cd):0, state=st.ko>0?'<em class="ko">💫 '+Math.ceil(st.ko)+'s</em>':(v&&v.alpha<0.6?'<em>silenced</em>':(S?(cd>0.05?'<em>'+cd.toFixed(1)+'s</em>':'<em class="ok">ready</em>'):'<em>basic only</em>'));
    return '<div class="fh'+(st.ko>0?' out':'')+'" style="border-color:'+E.col+'" title="'+f.n+(S?' — special: '+S.name+' (change it in the familiar card, N → ⓘ)':'')+(_famSlotK(ps,fid)<1?' — slot '+(_heroActiveFamiliars(ps).indexOf(fid)+1)+': hits at '+Math.round(_famSlotK(ps,fid)*100)+'% (each extra familiar hits softer)':'')+'" onclick="showFamiliarInfo(\''+fid+'\')"><span class="ic">'+f.icon+'</span><span class="tx"><b>'+(S?S.name:f.n)+(_famSlotK(ps,fid)<1?' <small style="opacity:.7">'+Math.round(_famSlotK(ps,fid)*100)+'%</small>':'')+'</b>'+state+'</span><i style="width:'+Math.round((1-pct)*100)+'%;background:'+E.col+'"></i></div>'; }).join(''); }
function _heroSeaSprite(){}   // (old Sea Sprite passive — now the water spirit's Tide Ward)
// projectiles (pierce + follow)
function _heroFamProjTick(scene,dt){ if(!scene._famProj2||!scene._famProj2.length)return; var mons=_heroCtx(scene).monsters;
  scene._famProj2=scene._famProj2.filter(function(p){ p.life-=dt; var kill=function(){ p.vis.destroy(); p.glow.destroy(); return false; };
    if(p.life<=0||!p.vis.active)return kill();
    if(p.tgt&&!p.tgt.dead){ var a=Math.atan2(p.tgt.y-p.y,p.tgt.x-p.x), sp=Math.hypot(p.vx,p.vy); p.vx=Math.cos(a)*sp; p.vy=Math.sin(a)*sp; }
    p.x+=p.vx*dt; p.y+=p.vy*dt; p.vis.setPosition(p.x,p.y); p.glow.setPosition(p.x,p.y);
    if(_heroWallAt(scene,p.x,p.y))return kill();
    if(p.pierce){ mons.forEach(function(m){ if(m.dead||p.hitSet.indexOf(m)>=0)return; if(_hbHit(m,p.x,p.y,8)){ p.hitSet.push(m); p.onHit(m); } }); return true; }
    if(p.tgt&&!p.tgt.dead&&Math.hypot(p.tgt.x-p.x,p.tgt.y-p.y)<((p.tgt.def&&p.tgt.def.r)||10)+6){ p.onHit(p.tgt); return kill(); }
    if(p.tgt&&p.tgt.dead)return kill();
    return true; }); }

// ── info pop-up + cards ──
function showFamiliarInfo(fid){ var f=FAMILIARS[fid]; if(!f)return; var ws=_heroWS(), ps=ws&&ws.playerState, D=_famDesign(fid), E=SPIRIT_ELEMENTS[D.el], L=_famLevel(ps,fid), mult=_famMult(ps,fid);
  var el=document.getElementById('familiar-info-modal'); if(!el){ el=document.createElement('div'); el.id='familiar-info-modal'; el.className='overlay'; el.style.cssText='display:none;z-index:10010'; el.onclick=function(e){ if(e.target===el)el.style.display='none'; }; document.body.appendChild(el); }
  var owned=ps&&(ps.ownedFamiliars||[]).indexOf(fid)>=0, active=_heroFamiliarActive(ps,fid);
  var spI=_famSpecialIdx(ps,fid);
  var sk=FAM_SKILLS[D.el].map(function(S,i){ var got=i<L, on=i===spI, pick=got&&i>0&&owned?(on?'<button class="fam-pick on" disabled>✔ Special</button>':'<button class="fam-pick" onclick="_setFamSpecial(\''+fid+'\','+i+')">Use as special</button>'):'';
    return '<div class="fam-sk'+(got?' got':'')+(on?' sel':'')+'">'+pick+'<b>'+(i?'Lv '+(i+1):'Basic attack')+' · '+S.name+'</b>'+(S.dmg&&got?' <span>'+Math.round(S.dmg*mult)+' dmg</span>':'')+'<i>'+S.text+'</i>'+(got?(i===0?'<em>Always on</em>':''):'<em>'+(i===L?'Next: ask a '+TOME_QN[E.q]+' fairy':'Learned later from a '+TOME_QN[E.q]+' fairy')+'</em>')+'</div>'; }).join('');
  sk='<div class="fam-note">Your familiar uses its basic attack plus <b>one special</b> — pick which below. Both cast on their own.</div>'+sk;
  el.innerHTML='<div class="modal fam-modal" onclick="event.stopPropagation()"><div class="mhdr"><span>'+f.icon+' '+f.n+' <small style="color:'+E.col+'">Level '+L+' / 6 · '+E.name+' spirit · '+(D.move==='hover'?'hovers around you':'follows behind you')+'</small></span><button class="mcls" onclick="document.getElementById(\'familiar-info-modal\').style.display=\'none\'">✕</button></div>'+
    '<div class="fam-top"><canvas id="fam-info-cv" width="112" height="112"></canvas><p>'+D.blurb+'</p></div>'+sk+
    '<div style="margin-top:8px;font-size:11px;color:'+(active?'#9f9':owned?'#aac':'#776')+'">'+(active?'● Active':owned?'Owned — press N to set it active':'Not found yet — clear the '+TOME_QN[E.q]+' familiar island')+'</div></div>';
  el.style.display='flex'; var cv=document.getElementById('fam-info-cv'); if(cv){ var i2=0, fr=spiritFrames(D), x=cv.getContext('2d'); clearInterval(el._t); el._t=setInterval(function(){ if(!cv.isConnected){ clearInterval(el._t); return; } x.clearRect(0,0,112,112); x.drawImage(fr[i2++%4],0,0); },160); } }
function _familiarCardHTML(fid,ps,onclick,withInfoBtn){ var f=FAMILIARS[fid]; if(!f)return ''; var D=_famDesign(fid), E=SPIRIT_ELEMENTS[D.el], active=_heroFamiliarActive(ps,fid), L=_famLevel(ps,fid), sk=_famSkills(ps,fid);
  return '<div class="sp-row" style="display:block;cursor:pointer;border:1px solid '+(active?'rgba(100,200,100,.45)':'rgba(255,255,255,.06)')+';border-left:3px solid '+E.col+';border-radius:6px;margin-bottom:5px;padding:6px 8px" onclick="'+onclick+'">'+
    '<div style="display:flex;align-items:center;gap:7px"><span style="font-size:18px">'+f.icon+'</span><span style="flex:1"><span style="font-size:12px;font-weight:600;color:#def">'+f.n+'</span> <span style="font-size:10px;color:'+E.col+'">Lv '+L+'</span></span>'+
    (active?'<span style="font-size:9px;color:#9f9">● ACTIVE</span>':'')+(withInfoBtn?'<span title="Details" onclick="event.stopPropagation();showFamiliarInfo(\''+fid+'\')" style="font-size:13px;color:#8cf;padding:0 4px;cursor:pointer">ⓘ</span>':'')+'</div>'+
    '<div style="font-size:10px;color:#88a;margin-top:3px;line-height:1.35">'+sk[0].name+(_famSpecialIdx(ps,fid)>0?' + special: <b style="color:#cde">'+FAM_SKILLS[D.el][_famSpecialIdx(ps,fid)].name+'</b>':'')+(sk.length>2?' <span style="color:#667">('+(sk.length-1)+' specials learned — pick in ⓘ)</span>':'')+'</div></div>'; }
