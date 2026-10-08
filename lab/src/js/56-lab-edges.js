// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 38 — TERRAIN EDGES tab: where two kinds of ground meet. Six places (lake shore, beach, mountain edge,
// ║ marsh, lava, snow line), each drawn in five edge styles. ☆ Pick one per place (they can differ), or one for all.
// ║ Picks are saved as 'edges-<place>_<style>'. Art: src/js/07ze-edges.js (ZEdge). Nothing changes in the game
// ║ until Kris picks.
// ║ ROUND 39 — "Moving — built on your picks": five moving cards per place ('edges-<place>_m1'…'_m5'), each one Kris's
// ║ pick (lake and beach: clean line + pieces, finer sand on the beach; the rest: layered + pieces) plus one kind of
// ║ movement, drawn every frame by ZEdge.frame. The round 38 still cards stay below with his picks starred.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZEdge==='undefined')return; LBR.TABS.push('edges');
  var CW=768, CH=432;
  LBR.drawers.edges=function(cv,c,W,H,t,full,id){ var p=id.split('_'), sc=p[0], st=p[1];
    if(/^m\d$/.test(st)){ var w0=full?Math.min(W,Math.round(H*16/9)):W, h0=Math.round(w0*9/16); if(full){ c.fillStyle='#000'; c.fillRect(0,0,W,H); }
      try{ c.save(); c.translate((W-w0)/2,(H-h0)/2); ZEdge.frame(c,sc,st,t,w0,h0,cv); c.restore(); }catch(e){ c.restore(); c.fillStyle='#300'; c.fillRect(0,0,W,H); c.fillStyle='#fff'; c.fillText(String(e),10,20); } return; }
    if(cv._done===id+W+'x'+H&&!full)return;      // a still picture: paint it once
    var w=full?Math.min(W,Math.round(H*16/9)):W, h=Math.round(w*9/16), im;
    try{ im=ZEdge.render(sc,st,full?1536:CW,full?864:CH); }catch(e){ c.fillStyle='#300'; c.fillRect(0,0,W,H); c.fillStyle='#fff'; c.fillText(String(e),10,20); return; }
    c.fillStyle='#000'; c.fillRect(0,0,W,H); c.imageSmoothingEnabled=true; c.drawImage(im,(W-w)/2,(H-h)/2,w,h);
    if(!full){ cv._done=id+W+'x'+H;
      // a 2× close-up of the middle of the edge, so the line itself can be judged
      var sw=112, sh=84, dw=sw*1.9, dh=sh*1.9, fo=ZEdge.focus(sc,sw/CW,sh/CH), zx=fo[0], zy=fo[1]; if(zx>0.55&&zy>0.4){ zx=Math.min(zx,0.5); }
      c.save(); c.imageSmoothingEnabled=true; c.drawImage(im,zx*CW,zy*CH,sw,sh,W-dw-10,H-dh-10,dw,dh); c.strokeStyle='#fff'; c.lineWidth=2; c.strokeRect(W-dw-10,H-dh-10,dw,dh); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1; c.strokeRect(zx*W,zy*H,sw,sh);
      c.fillStyle='rgba(0,0,0,.6)'; c.fillRect(W-dw-10,H-dh-26,64,16); c.fillStyle='#fff'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='left'; c.fillText('close-up',W-dw-6,H-dh-14); c.restore(); } };
  var D=function(sc,st){ return {id:sc.id+'_'+st.id,name:st.name,desc:st.desc}; };
  LAB_TABS.push({ id:'edges', name:'Terrain edges',
    blurb:'<b>Where two kinds of ground meet.</b> Lake shores, beaches and cliff edges are the roughest part of the world today. Below are six places, each drawn five ways: as the game draws it <b>today</b>, then four ways to do it better. Every picture is drawn by the same kind of painter the game uses, so what you pick can be built. The small box in the corner of each card is a close-up of the edge. <b>☆ Pick</b> one per place — they may differ (for instance layered shores for water, a clean ink line for paths) — and use the note box for mixes. The last style places small pieces along the edge; here they are drawn in code, in the game they would be <b>painted pieces</b> from an edge sheet. Nothing changes in the game until you pick.',
    designs:[].concat.apply([],ZEdge.SCENES.map(function(sc){ return ZEdge.STYLES.map(function(st){ return {id:sc.id+'_'+st.id,name:sc.name+' — '+st.name}; }).concat(ZEdge.MOVE[sc.id].map(function(M){ return {id:sc.id+'_'+M.id,name:sc.name+' — '+M.name+' (moving)'}; })); })),
    render:function(){ setTimeout(LBR.bind,0); var n=0, BN={inkdress:'clean line + pieces',dress:'layered + pieces'};
      var mov='<div class="lab-note" style="margin:6px 0 14px;padding:10px 14px;border:1px solid #2c4a6a;border-radius:8px;background:#0c1626"><b>Round 39 — moving ground.</b> Built on your picks: lake shore and beach use the <b>clean line with the pieces</b> (finer sand on the beach), the other four the <b>layered edge with the pieces</b>. Each card adds one kind of movement — lapping, waves, ripples, flowing lava, weather — and the last card of each place redraws what the <b>old Zeldara</b> did (a shimmer line drifting across each water tile, a warm pulse on lava, swaying grass blades) on top of your pick, to compare. Reeds and tufts sway in all of them. ☆ Pick the one you like per place; notes welcome (\u201cslower\u201d, \u201cwaves + sparkle\u201d).</div>'+
        ZEdge.SCENES.map(function(sc){ var m=0; return LBR.sec(sc.name+' — moving','built on your pick: '+BN[ZEdge.BASE[sc.id]]+(sc.id==='beach'?', finer sand':''))+'<div class="br-grid br-wide">'+ZEdge.MOVE[sc.id].map(function(M){ return LBR.card('edges',{id:sc.id+'_'+M.id,name:M.name,desc:M.desc},(m++),CW,CH,'<span class="bb-m">moves</span>'); }).join('')+'</div>'; }).join('');
      return mov+LBR.sec('Still pictures (round 38)','your picks are starred')+ZEdge.SCENES.map(function(sc){ return LBR.sec(sc.name,sc.sub)+'<div class="br-grid br-wide">'+ZEdge.STYLES.map(function(st){ return LBR.card('edges',D(sc,st),(n++)%5,CW,CH,st.id==='today'?'<span class="bb-m">as it is now</span>':st.id==='dress'?'<span class="bb-m">needs a painted edge sheet</span>':''); }).join('')+'</div>'; }).join(''); } });
})();
