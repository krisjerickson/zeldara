// ═══════════════════════════════════════════════════════════════════════
// ║ MAP tab — review the new 1200 × 1200 island before it goes in the game
// ═══════════════════════════════════════════════════════════════════════
var LabMap={ M:null, img:null, zoom:1, show:{zones:true,labels:true,sites:true,ways:true} };
LAB_TABS.splice(LAB_TABS.findIndex(function(t){return t.id==='world';})+1,0,{
  id:'map', name:'World Map', designs:[],
  blurb:'<b>The new island</b> (1200 × 1200 tiles, 4× today): a rugged coast with bays, fjords, capes and islets. Four regions meet at <b>Mirror Lake</b>, split by natural borders: the Silverrun river, the Great Scarp, the Cinder Chasm and the Ember Wall. You cross three of them where a freed craftsman builds the way (⛩). Each region holds its 10 designs as sub-zones. <b>Hover</b> to see a zone, <b>click</b> to walk its sample. Notes on the layout go in the box below.',
  render:function(){
    setTimeout(LabMap.draw,30);
    var p=LabApp.picks['map-layout']||{};
    return '<div class="map-bar"><span class="map-lg">'+
      [['#e9c46a','Village'],['#6fe3f5','Waystone (fast travel)'],['#ffd24a','★ Boss site'],['#c8b8ff','Tower / dungeon'],['#ff9a60','Gate'],['#ff5a2a','Endgame volcano (hidden)']].map(function(l){ return '<i style="background:'+l[0]+'"></i>'+l[1]; }).join('')+'</span>'+
      '<span class="map-tg">'+['zones','labels','sites','ways'].map(function(k){ return '<button class="map-t" data-t="'+k+'" aria-pressed="'+LabMap.show[k]+'">'+({zones:'Zone borders',labels:'Names',sites:'Sites',ways:'Waystones'})[k]+'</button>'; }).join('')+
      '<button class="map-z" data-z="1">Fit</button><button class="map-z" data-z="2">2×</button><button class="map-z" data-z="3">3×</button></span></div>'+
      '<div id="map-wrap"><canvas id="map-cv" width="1200" height="1200"></canvas><div id="map-tip"></div></div>'+
      '<div class="map-notes"><div class="sec-l">Notes on the map layout</div><textarea id="map-notes" placeholder="Move a zone, change a border, add a lake…">'+(p.notes||'').replace(/</g,'&lt;')+'</textarea></div>';
  }
});
LabMap.build=function(){
  if(LabMap.M)return LabMap.M;
  var t0=performance.now(); LabMap.M=buildWorldMap(12345); LabMap.ms=Math.round(performance.now()-t0);
  var M=LabMap.M, W=M.W, H=M.H, c=mkCanvas(W,H), g=c.getContext('2d'), im=g.createImageData(W,H), d=im.data;
  var zc=WMAP_ZONES.map(function(z){ var D=WORLD_DESIGNS.find(function(q){return q.id===z.id;}); var a=hexToRgb(D?D.ground.a:'#6a8a4a'), b=hexToRgb(D?(D.ground.b||D.ground.a):'#6a8a4a'); return [a,b]; });
  var nz=vnoise(77);
  var C={}; C[WM.SHALLOW]=[70,140,170]; C[WM.BEACH]=[222,206,150]; C[WM.LAKE]=[40,100,150]; C[WM.RIVER]=[52,120,170]; C[WM.CLIFF]=[70,62,58]; C[WM.CHASM]=[235,100,30]; C[WM.RIDGE]=[60,48,44]; C[WM.ROAD]=[196,178,140]; C[WM.BRIDGE]=[140,100,60]; C[WM.VILLAGE]=[233,196,106]; C[WM.PEAK]=[120,116,112]; C[WM.GATE]=[255,154,96];
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){ var i=y*W+x, cl=M.cls[i], col;
    if(cl===WM.OCEAN){ var cd=Math.min(1,M.coastDist[i]/140); col=[18-cd*10,58-cd*30,110-cd*40]; }
    else if(cl===WM.LAND){ var z=M.zone[i], pr=z<255?zc[z]:[[110,140,80],[120,150,90]], tt=nz(x/30,y/30); col=[pr[0][0]+(pr[1][0]-pr[0][0])*tt,pr[0][1]+(pr[1][1]-pr[0][1])*tt,pr[0][2]+(pr[1][2]-pr[0][2])*tt];
      var hs=(M.height[i-W-1]||0)-(M.height[i+W+1]||0); var f=1+hs*9; col=[col[0]*f,col[1]*f,col[2]*f]; }
    else col=C[cl]||[255,0,255];
    var k=i*4; d[k]=col[0]; d[k+1]=col[1]; d[k+2]=col[2]; d[k+3]=255; }
  g.putImageData(im,0,0);
  LabMap.base=c; return M;
};
LabMap.draw=function(){
  var cv=document.getElementById('map-cv'); if(!cv)return;
  var M=LabMap.build(), g=cv.getContext('2d'), W=M.W, H=M.H, sh=LabMap.show;
  g.drawImage(LabMap.base,0,0);
  if(sh.zones){ g.fillStyle='rgba(255,255,255,.35)'; for(var y=1;y<H;y+=1)for(var x=1;x<W;x+=1){ var i=y*W+x, z=M.zone[i]; if(z===255)continue; if((M.zone[i-1]!==z&&M.zone[i-1]!==255)||(M.zone[i-W]!==z&&M.zone[i-W]!==255))g.fillRect(x,y,1,1); } }
  g.textAlign='center'; g.textBaseline='middle';
  if(sh.labels){ g.font='600 13px sans-serif'; WMAP_ZONES.forEach(function(z){ var n=_wmZoneName(z.id); g.lineWidth=3; g.strokeStyle='rgba(0,0,0,.75)'; g.strokeText(n,z.x,z.y-12); g.fillStyle='#fff'; g.fillText(n,z.x,z.y-12); });
    g.font='700 22px serif'; [['GRASSLANDS',900,60],['WETLANDS',880,1150],['HIGHLANDS',250,1160],['ASHLANDS',260,60]].forEach(function(q){ g.lineWidth=4; g.strokeStyle='rgba(0,0,0,.7)'; g.strokeText(q[0],q[1],q[2]); g.fillStyle='rgba(255,240,200,.95)'; g.fillText(q[0],q[1],q[2]); });
    g.font='600 12px sans-serif'; [['Silverrun',820,M.armY(820)-14],['Great Scarp',M.armX(900)+50,900],['Cinder Chasm',300,M.armY(300)+16],['Ember Wall',M.armX(300)+44,300],['Mirror Lake',600,600]].forEach(function(q){ g.lineWidth=3; g.strokeStyle='rgba(0,0,0,.8)'; g.strokeText(q[0],q[1],q[2]); g.fillStyle='#bfe8ff'; g.fillText(q[0],q[1],q[2]); }); }
  // village
  g.fillStyle='#e9c46a'; g.strokeStyle='#000'; g.lineWidth=2; g.beginPath(); g.arc(M.village.x,M.village.y,9,0,Math.PI*2); g.fill(); g.stroke();
  if(sh.labels){ g.font='700 13px sans-serif'; g.lineWidth=3; g.strokeText('Village',M.village.x,M.village.y+20); g.fillStyle='#ffe9a8'; g.fillText('Village',M.village.x,M.village.y+20); }
  // gates
  M.gates.forEach(function(G){ g.fillStyle='#ff9a60'; g.strokeStyle='#000'; g.lineWidth=2; g.beginPath(); g.moveTo(G.x,G.y-10); g.lineTo(G.x+9,G.y); g.lineTo(G.x,G.y+10); g.lineTo(G.x-9,G.y); g.closePath(); g.fill(); g.stroke();
    if(sh.labels){ g.font='600 11px sans-serif'; g.lineWidth=3; g.strokeText(G.name,G.x,G.y+20); g.fillStyle='#ffd0b0'; g.fillText(G.name,G.x,G.y+20); } });
  if(sh.sites)M.sites.forEach(function(S){ var col=S.boss?'#ffd24a':S.kind==='tower'||S.kind==='dungeon'?'#c8b8ff':'#ffffff', ic={tower:'🗼',dungeon:'⚔',camp:'⛺',harbor:'⚓',skyport:'🎈'}[S.kind];
    g.fillStyle='rgba(0,0,0,.6)'; g.beginPath(); g.arc(S.x,S.y,9,0,Math.PI*2); g.fill(); g.strokeStyle=col; g.lineWidth=2; g.stroke(); g.font='11px serif'; g.fillStyle='#fff'; g.fillText(ic,S.x,S.y+1); });
  if(sh.ways)M.waystones.forEach(function(Wy){ g.save(); g.shadowColor='#6fe3f5'; g.shadowBlur=8; g.fillStyle='#6fe3f5'; g.fillRect(Wy.x-4,Wy.y-8,8,16); g.restore(); g.strokeStyle='#003040'; g.lineWidth=1.5; g.strokeRect(Wy.x-4,Wy.y-8,8,16); });
  M.volcanoes.forEach(function(V){ g.fillStyle='rgba(255,90,42,.8)'; g.beginPath(); g.moveTo(V.x,V.y-10); g.lineTo(V.x+10,V.y+8); g.lineTo(V.x-10,V.y+8); g.closePath(); g.fill(); });
  LabMap.applyZoom();
};
LabMap.applyZoom=function(){ var cv=document.getElementById('map-cv'), wrap=document.getElementById('map-wrap'); if(!cv||!wrap)return; var fit=Math.min(wrap.clientWidth||1100,1100); cv.style.width=(fit*LabMap.zoom)+'px'; };
document.addEventListener('click',function(e){
  var tb=e.target.closest('.map-t'); if(tb){ LabMap.show[tb.dataset.t]=!LabMap.show[tb.dataset.t]; tb.setAttribute('aria-pressed',LabMap.show[tb.dataset.t]); LabMap.draw(); return; }
  var zb=e.target.closest('.map-z'); if(zb){ LabMap.zoom=+zb.dataset.z; LabMap.applyZoom(); return; }
  if(e.target.id==='map-cv'&&LabMap._hoverZone){ var zid=LabMap._hoverZone, wt=LAB_TABS.find(function(t){return t.id==='world';}), idx=wt.designs.findIndex(function(d){return d.id===zid;}); if(idx>=0){ LabApp.tab='world'; LabApp.groups.world=wt.designs[idx].group; LabApp.renderGrid(); LabApp.open(idx); } }
});
document.addEventListener('mousemove',function(e){
  if(e.target.id!=='map-cv'||!LabMap.M){ return; }
  var cv=e.target, r=cv.getBoundingClientRect(), x=Math.floor((e.clientX-r.left)/r.width*1200), y=Math.floor((e.clientY-r.top)/r.height*1200), M=LabMap.M, i=y*M.W+x, tip=document.getElementById('map-tip');
  var z=M.zone[i], cl=M.cls[i], rg=M.region[i], txt='';
  var cname={0:'Open sea',1:'Shallows',2:'Beach',4:'Lake',5:'River',6:'Cliff (Great Scarp)',7:'Lava chasm',8:'Ember Wall ridge',9:'Road',10:'Bridge',11:'Village',12:'Mountain',13:'Gate'}[cl];
  LabMap._hoverZone=null;
  if(z!==255&&(cl===WM.LAND||cl===WM.ROAD||cl===WM.PEAK||cl===WM.BEACH)){ var zid=WMAP_ZONES[z].id; LabMap._hoverZone=zid; txt='<b>'+_wmZoneName(zid)+'</b> · '+WM_REGION_NAMES[rg]+(cl!==WM.LAND?' · '+cname:'')+'<br><span>click to walk the sample</span>'; }
  else txt=cname||WM_REGION_NAMES[rg];
  tip.innerHTML=txt; tip.style.left=(e.clientX-r.left+14)+'px'; tip.style.top=(e.clientY-r.top+14)+'px'; tip.style.display='block';
  cv.style.cursor=LabMap._hoverZone?'pointer':'default';
});
document.addEventListener('input',function(e){ if(e.target.id!=='map-notes')return; var k='map-layout', p=LabApp.picks[k]=LabApp.picks[k]||{}; p.notes=e.target.value; LabApp.saveState('Typing…'); LabApp.persist(k,900); });
