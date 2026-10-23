// ═══════════════════════════════════════════════════════════════════════
// ║ 79f-lab-storyboards.js — round 79: STORY CUT-SCENES (Kris: "propose both story lines as well as develop images for about 6-12
// ║ different parts of the story being told"); round 79b (Kris: "can we get these into the design lab so i can easily view them?
// ║ including images, text for below the image and prompts"). The list is ZSB in src/js/07zt6-storyboards.js (doc 35).
// ║ Per cut-scene: when it plays and the story line; a card with all its frames (☆ the story line, or a note); the montage prompt for the
// ║ video app (Copy); then every frame — its picture, the line under it, what it shows, and the picture's own request (Copy).
// ║ Zeldor / Zeldara switch at the top: the frames with the twin you play come in both versions.
// ║ The pictures come from one sheet per montage (lab/preview/storyboards/<scene>_<who>.webp + index.json, made by
// ║ tools/video/storyboards.py; ZSB_SHEETS says which frames each sheet holds) — numbered stand-ins until a frame is in. Picks: 'storyb-<scene>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSB==='undefined')return; LBR.TABS.push('storyb');
  var WCOL={85:'#7fe08a',86:'#ffd27a',87:'#6fe3f5',88:'#ff8a6a',89:'#c8a8ff'}, IX=(typeof ZSB_SHEETS!=='undefined'&&ZSB_SHEETS)||{};
  var VER='zeldor'; try{ VER=localStorage.getItem('zsb_ver')==='zeldara'?'zeldara':'zeldor'; }catch(e){}
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var whoOf=function(sc){ return ZSB.whos(sc).length>1?VER:'all'; };
  var SHEET={}, sheetImg=function(key){ if(SHEET[key])return SHEET[key]; var im=new Image(); im.onload=function(){ redraw(); }; im.onerror=function(){ if(!im._b){ im._b=1; im.src='../lab/preview/storyboards/'+key+'.webp'; } else im._dead=1; }; im.src='preview/storyboards/'+key+'.webp'; SHEET[key]=im; return im; };
  var hasFrame=function(key,n){ var I=IX[key]; return !!(I&&I.n&&I.n.indexOf(n)>=0); };
  var inCount=function(){ var a=0,t=0; ZSB.SCENES.forEach(function(sc){ ZSB.whos(sc).forEach(function(w){ sc.beats.forEach(function(b){ t++; if(hasFrame(sc.id+'_'+w,b.n))a++; }); }); }); return [a,t]; };
  // one frame, from its montage's sheet (or a numbered stand-in)
  var drawFrame=function(c,x,y,w,h,sc,i,who,t){ var b=sc.beats[i], key=sc.id+'_'+who, I=IX[key], im=I&&hasFrame(key,b.n)?sheetImg(key):null;
    if(im&&im.complete&&im.naturalWidth){ var col=i%I.cols, row=Math.floor(i/I.cols); c.drawImage(im,col*I.tw+2,row*I.th+2,I.tw-4,I.th-4,x,y,w,h); return true; }
    var g=c.createLinearGradient(x,y,x,y+h); g.addColorStop(0,'#101a2a'); g.addColorStop(1,'#070b12'); c.fillStyle=g; c.fillRect(x,y,w,h);
    c.strokeStyle='rgba(111,227,245,'+(0.25+0.15*Math.sin((t||0)*1.5+i))+')'; c.lineWidth=1; c.strokeRect(x+4.5,y+4.5,w-9,h-9);
    c.fillStyle='#cfdbea'; c.font='600 '+Math.max(11,Math.round(h/9))+'px Georgia,serif'; c.textAlign='center'; var words=b.title.split(' '), lines=[''], mw=w-20;
    words.forEach(function(wd){ var tl=lines[lines.length-1]+(lines[lines.length-1]?' ':'')+wd; if(c.measureText(tl).width>mw&&lines[lines.length-1])lines.push(wd); else lines[lines.length-1]=tl; });
    lines.slice(0,3).forEach(function(l,k){ c.fillText(l,x+w/2,y+h/2+(k-(Math.min(3,lines.length)-1)/2)*h/7.5); });
    c.fillStyle='#8aa0b8'; c.font=Math.max(9,Math.round(h/16))+'px "Segoe UI",sans-serif'; c.fillText('not painted yet',x+w/2,y+h-12); return false; };
  // the card: all the frames of the scene
  var draw=function(cv,c,W,H,t,full,id){ var sc=ZSB.SCENES.find(function(s){ return s.id===id; }); if(!sc)return; var B=sc.beats, n=B.length, cols=n>9?4:3, rows=Math.ceil(n/cols), cw=W/cols, ch=H/rows, who=whoOf(sc);
    c.fillStyle='#05070b'; c.fillRect(0,0,W,H);
    B.forEach(function(b,i){ var x=(i%cols)*cw, y=Math.floor(i/cols)*ch; drawFrame(c,x+2,y+2,cw-4,ch-4,sc,i,who,t);
      c.fillStyle='rgba(5,8,14,.8)'; c.fillRect(x+2,y+2,30,22); c.fillStyle=WCOL[sc.wave]||'#fff'; c.font='700 13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(String(b.n),x+17,y+18); }); };
  LBR.drawers.storyb=draw;
  // the frames' own canvases (in the frame list) and the big view
  var redraw=function(){ Array.prototype.forEach.call(document.querySelectorAll('canvas.sbf-cv'),function(cv){ var sc=ZSB.SCENES.find(function(s){ return s.id===cv.dataset.sc; }); if(!sc)return; var i=+cv.dataset.i, c=cv.getContext('2d'); c.clearRect(0,0,cv.width,cv.height); drawFrame(c,0,0,cv.width,cv.height,sc,i,whoOf(sc),0); }); };
  var big=function(sc,i){ var o=document.createElement('div'); o.className='sbf-big'; var cv=document.createElement('canvas'), b=sc.beats[i]; cv.width=1280; cv.height=720; drawFrame(cv.getContext('2d'),0,0,1280,720,sc,i,whoOf(sc),0);
    var cap=document.createElement('div'); cap.className='sbf-bigcap'; cap.textContent=b.cap; var hd=document.createElement('div'); hd.className='sbf-bighd'; hd.textContent=sc.name+' · '+b.n+'. '+b.title+(ZSB.whos(sc).length>1?' · '+VER:'')+'   (click or Esc to close; ← → for the next frame)';
    o.appendChild(hd); o.appendChild(cv); o.appendChild(cap); document.body.appendChild(o);
    var close=function(){ o.remove(); document.removeEventListener('keydown',key,true); }, key=function(e){ if(e.key==='Escape'){ e.preventDefault(); close(); } else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); var j=i+(e.key==='ArrowRight'?1:-1); if(j>=0&&j<sc.beats.length){ close(); big(sc,j); } } };
    o.onclick=close; document.addEventListener('keydown',key,true); };
  var copyBox=function(id,label,txt,rows,cls){ return '<details class="sbf-pr '+(cls||'')+'"><summary>'+label+'</summary><span class="au-req"><textarea readonly rows="'+(rows||6)+'" data-au="'+id+'">'+esc(txt)+'</textarea><button class="vbtn au-copy" data-au="'+id+'">⧉ Copy</button></span></details>'; };
  var reqOf=function(id){ var S=typeof ZSCN!=='undefined'&&ZSCN.SHEETS.find(function(x){ return x.id==='sc_'+id; }); if(!S)return ''; try{ return ZSCN.body(S)+'\n'+ZSCN.STYLE; }catch(e){ return S.items[0][2]; } };
  var frames=function(sc){ var ws=ZSB.whos(sc);
    return '<div class="sbf-grid">'+sc.beats.map(function(b,i){ var vers=b.ids.length>1;
      var desc=ws.map(function(w){ return '<p class="sbf-desc'+(ws.length>1?' sbv-'+w:'')+'">'+esc(ZSB.shot(b,w))+'</p>'; }).join('');
      var pr=b.ids.map(function(id,k){ var w=vers?(k?'zeldara':'zeldor'):''; return copyBox('sbp_'+id,'🖼 Picture prompt'+(vers?' ('+(k?'Zeldara':'Zeldor')+')':''),reqOf(id),7,w?'sbv-'+w:''); }).join('');
      return '<div class="sbf"><canvas class="sbf-cv" width="480" height="270" data-sc="'+sc.id+'" data-i="'+i+'" title="Click to see it big"></canvas>'+
        '<div class="sbf-t"><b>'+b.n+'. '+esc(b.title)+'</b>'+(vers?' <span class="sb-v">2 versions</span>':'')+'</div>'+
        '<div class="sbf-cap">“'+esc(b.cap.replace(/^"|"$/g,''))+'”</div>'+desc+pr+'</div>'; }).join('')+'</div>'; };
  var montage=function(sc){ return ZSB.whos(sc).map(function(w){ return copyBox('sbm_'+sc.id+'_'+w,'🎬 Video prompt for the montage'+(w==='all'?'':' ('+w.charAt(0).toUpperCase()+w.slice(1)+')')+' — paste with the '+sc.beats.length+' pictures (sprites\\storyboards\\'+sc.id+'\\'+w+'\\)',ZSB.montage(sc,w),10,w==='all'?'':'sbv-'+w); }).join(''); };
  var GROUPS=[[85,'The first spirit and the four builders'],[86,'The opening and the four realms\' falls'],[87,'The glimpses, the Lodestar, Muspelheim, Asgard, Godsbane and the Bifröst'],[88,'Surtharn\'s and Solmyrk\'s forms'],[89,'The feast hall to the World Tree']];
  var LEGEND=function(){ var k=inCount(); return '<div class="sm-legend"><b>Story cut-scenes — each told in 4–12 pictures (round 79).</b> '+ZSB.SCENES.length+' cut-scenes; <b>'+k[0]+' of '+k[1]+'</b> frames painted so far. '+
    'For each: when it plays and the story line; a card with all its frames (☆ the story line, or a note — say the frame number); the <b>video prompt</b> for the montage (Copy, paste it into the video app with the folder\'s pictures); then every frame — its picture (click for big; ← → to step through), <i>the line under it</i>, what it shows, and the <b>picture prompt</b> it was painted from. '+
    'The pictures for the video app: <code>.\\tools\\video\\storyboards.ps1</code>.</div>'+
    '<div class="sb-ver">Show the frames as played by: <button class="vbtn sbv-btn" data-v="zeldor" aria-pressed="'+(VER==='zeldor')+'">Zeldor</button> <button class="vbtn sbv-btn" data-v="zeldara" aria-pressed="'+(VER==='zeldara')+'">Zeldara</button></div>'; };
  var n=0, cardOf=function(D,w,h){ return LBR.card('storyb',D,n++,w,h,''); };
  LAB_TABS.push({ id:'storyb', name:'Story cut-scenes',
    blurb:'<b>Round 79 — every cut-scene as a story in 4–12 pictures.</b> The pictures, the line under each, the picture prompts and the montage\'s video prompt. ☆ the story lines you are happy with; notes to change them.',
    designs:ZSB.SCENES.map(function(s){ return {id:s.id,name:s.name}; }),
    render:function(){ setTimeout(function(){ LBR.bind(); document.body.classList.toggle('sb-zeldara',VER==='zeldara'); redraw(); },0); n=0;
      return LEGEND()+GROUPS.map(function(G){ var L=ZSB.SCENES.filter(function(s){ return s.wave===G[0]; });
        return LBR.sec(G[1],'wave '+G[0]+' · '+L.length+' cut-scenes')+L.map(function(sc){
          return '<section class="sb-scene" id="sb-'+sc.id+'"><div class="br-grid sm-one">'+cardOf({id:sc.id,name:sc.name+' — '+sc.beats.length+' frames',desc:'<b>Plays:</b> '+esc(sc.plays)+'<br><b>The story:</b> '+esc(sc.story)},1280,Math.round(sc.beats.length>9?1280*0.42:1280*0.5))+'</div>'+
            montage(sc)+frames(sc)+'</section>'; }).join(''); }).join(''); } });
  document.addEventListener('click',function(e){ var v=e.target.closest&&e.target.closest('.sbv-btn'); if(v){ VER=v.dataset.v; try{ localStorage.setItem('zsb_ver',VER); }catch(x){} document.body.classList.toggle('sb-zeldara',VER==='zeldara');
      Array.prototype.forEach.call(document.querySelectorAll('.sbv-btn'),function(b){ b.setAttribute('aria-pressed',String(b.dataset.v===VER)); }); redraw(); return; }
    var cv=e.target.closest&&e.target.closest('canvas.sbf-cv'); if(cv){ var sc=ZSB.SCENES.find(function(s){ return s.id===cv.dataset.sc; }); if(sc)big(sc,+cv.dataset.i); } });
  var st=document.createElement('style'); st.textContent='.sb-v{color:#9fe8ff;font-size:11px;font-weight:400}.sb-ver{margin:6px 0 14px;font:13px "Segoe UI",sans-serif;color:#cfdbea}.sbv-btn[aria-pressed=true]{background:#1d3b52;border-color:#6fe3f5;color:#fff}'+
    'body.sb-zeldara .sbv-zeldor{display:none!important}body:not(.sb-zeldara) .sbv-zeldara{display:none!important}.sb-scene{margin-bottom:34px}'+
    '.sbf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin:10px 0 6px}.sbf{background:#0b111c;border:1px solid #1d2b40;border-radius:10px;padding:8px}'+
    '.sbf-cv{width:100%;height:auto;aspect-ratio:16/9;border-radius:6px;cursor:zoom-in;display:block;background:#05070b}.sbf-t{margin:8px 2px 2px;color:#e8eef8;font:600 14px Georgia,serif}'+
    '.sbf-cap{margin:4px 2px 6px;color:#fff4d8;font:italic 14px/1.4 Georgia,serif}.sbf-desc{margin:4px 2px;color:#9fb0c8;font:12px/1.45 "Segoe UI",sans-serif}'+
    '.sbf-pr{margin:6px 0 0}.sbf-pr summary{cursor:pointer;color:#6fe3f5;font:600 12px "Segoe UI",sans-serif}.sb-scene>.sbf-pr{margin:6px 0}'+
    '.sbf-big{position:fixed;inset:0;z-index:9999;background:rgba(2,4,8,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:zoom-out;padding:16px}'+
    '.sbf-big canvas{max-width:100%;max-height:78vh;width:auto;height:auto;border-radius:8px}.sbf-bigcap{color:#fff4d8;font:italic 20px Georgia,serif;text-align:center;max-width:1100px}.sbf-bighd{color:#8aa0b8;font:13px "Segoe UI",sans-serif}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'storyb',label:'🎞 Story cut-scenes — read the '+ZSB.SCENES.length+' story lines and their frames',where:'Story cut-scenes tab · ☆ each story line or note changes (frame numbers)',done:function(){ return ZSB.SCENES.every(function(s){ return LBR.picked('storyb',s.id)||((LabApp.picks['storyb-'+s.id]||{}).notes||'').trim(); }); },go:function(){ LTODO.goTo('storyb','.br-grid',0); }});
})();
