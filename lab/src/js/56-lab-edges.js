// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 38 — TERRAIN EDGES tab: where two kinds of ground meet. Six places (lake shore, beach, mountain edge,
// ║ marsh, lava, snow line), each drawn in five edge styles. ☆ Pick one per place (they can differ), or one for all.
// ║ Picks are saved as 'edges-<place>_<style>'. Art: src/js/07ze-edges.js (ZEdge). Nothing changes in the game
// ║ until Kris picks.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZEdge==='undefined')return; LBR.TABS.push('edges');
  var CW=768, CH=432;
  LBR.drawers.edges=function(cv,c,W,H,t,full,id){ var p=id.split('_'), sc=p[0], st=p[1];
    if(cv._done===id+W+'x'+H&&!full)return;      // a still picture: paint it once
    var w=full?Math.min(W,Math.round(H*16/9)):W, h=Math.round(w*9/16), im;
    try{ im=ZEdge.render(sc,st,full?1536:CW,full?864:CH); }catch(e){ c.fillStyle='#300'; c.fillRect(0,0,W,H); c.fillStyle='#fff'; c.fillText(String(e),10,20); return; }
    c.fillStyle='#000'; c.fillRect(0,0,W,H); c.imageSmoothingEnabled=true; c.drawImage(im,(W-w)/2,(H-h)/2,w,h);
    if(!full){ cv._done=id+W+'x'+H;
      // a 2× close-up of the middle of the edge, so the line itself can be judged
      var zx={lake:0.2,beach:0.42,cliff:0.38,marsh:0.5,lava:0.4,snow:0.2}[sc]||0.3, zy={lake:0.1,beach:0.5,cliff:0.2,marsh:0.26,lava:0.36,snow:0.18}[sc]||0.3, sw=112, sh=84, dw=sw*1.9, dh=sh*1.9;
      c.save(); c.imageSmoothingEnabled=true; c.drawImage(im,zx*CW,zy*CH,sw,sh,W-dw-10,H-dh-10,dw,dh); c.strokeStyle='#fff'; c.lineWidth=2; c.strokeRect(W-dw-10,H-dh-10,dw,dh); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=1; c.strokeRect(zx*W,zy*H,sw,sh);
      c.fillStyle='rgba(0,0,0,.6)'; c.fillRect(W-dw-10,H-dh-26,64,16); c.fillStyle='#fff'; c.font='11px "JetBrains Mono",monospace'; c.textAlign='left'; c.fillText('close-up',W-dw-6,H-dh-14); c.restore(); } };
  var D=function(sc,st){ return {id:sc.id+'_'+st.id,name:st.name,desc:st.desc}; };
  LAB_TABS.push({ id:'edges', name:'Terrain edges',
    blurb:'<b>Where two kinds of ground meet.</b> Lake shores, beaches and cliff edges are the roughest part of the world today. Below are six places, each drawn five ways: as the game draws it <b>today</b>, then four ways to do it better. Every picture is drawn by the same kind of painter the game uses, so what you pick can be built. The small box in the corner of each card is a close-up of the edge. <b>☆ Pick</b> one per place — they may differ (for instance layered shores for water, a clean ink line for paths) — and use the note box for mixes. The last style places small pieces along the edge; here they are drawn in code, in the game they would be <b>painted pieces</b> from an edge sheet. Nothing changes in the game until you pick.',
    designs:[].concat.apply([],ZEdge.SCENES.map(function(sc){ return ZEdge.STYLES.map(function(st){ return {id:sc.id+'_'+st.id,name:sc.name+' — '+st.name}; }); })),
    render:function(){ setTimeout(LBR.bind,0); var n=0;
      return ZEdge.SCENES.map(function(sc){ return LBR.sec(sc.name,sc.sub)+'<div class="br-grid br-wide">'+ZEdge.STYLES.map(function(st){ return LBR.card('edges',D(sc,st),(n++)%5,CW,CH,st.id==='today'?'<span class="bb-m">as it is now</span>':st.id==='dress'?'<span class="bb-m">needs a painted edge sheet</span>':''); }).join('')+'</div>'; }).join(''); } });
})();
