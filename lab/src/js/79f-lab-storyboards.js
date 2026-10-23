// ═══════════════════════════════════════════════════════════════════════
// ║ 79f-lab-storyboards.js — round 79: STORY CUT-SCENES (Kris: "propose both story lines as well as develop images for about 6-12
// ║ different parts of the story being told … Start with proposals for each of the different images for each cut scene"). The list is
// ║ ZSB in src/js/07zt6-storyboards.js (doc 35). Per cut-scene: when it plays, the story line, and a card showing its frames (painted
// ║ ones once round 79's pictures are in; numbered stand-ins until then) — ☆ the story line, or a note to change it; below, every
// ║ frame with what it shows and its caption. Picks: 'storyb-<scene>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZSB==='undefined')return; LBR.TABS.push('storyb');
  var IMG={}, WCOL={85:'#7fe08a',86:'#ffd27a',87:'#6fe3f5',88:'#ff8a6a',89:'#c8a8ff'};
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var load=function(id){ var src='assets/scenery/rooms/'+id+'.webp'; if(IMG[id])return IMG[id]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } else im._dead=1; }; im.src=src; IMG[id]=im; return im; };
  var painted=function(id){ var R=(typeof ZSCN_META!=='undefined'&&ZSCN_META.rooms)||{}; return !!R[id]; };
  var WHO={0:'',h:'you',o:'you + your twin',t:'both twins'};
  // a contact sheet of the scene's frames: the painted picture (the Zeldor version) or a numbered stand-in with the frame's title
  var draw=function(cv,c,W,H,t,full,id){ var sc=ZSB.SCENES.find(function(s){ return s.id===id; }); if(!sc)return; var B=sc.beats, n=B.length, cols=n>9?4:3, rows=Math.ceil(n/cols), cw=W/cols, ch=H/rows;
    c.fillStyle='#05070b'; c.fillRect(0,0,W,H);
    B.forEach(function(b,i){ var x=(i%cols)*cw, y=Math.floor(i/cols)*ch, pid=b.ids[0], ok=painted(pid), im=ok?load(pid):null;
      if(im&&im.complete&&im.naturalWidth)c.drawImage(im,x+2,y+2,cw-4,ch-4);
      else { var g=c.createLinearGradient(x,y,x,y+ch); g.addColorStop(0,'#101a2a'); g.addColorStop(1,'#070b12'); c.fillStyle=g; c.fillRect(x+2,y+2,cw-4,ch-4);
        c.strokeStyle='rgba(111,227,245,'+(0.25+0.15*Math.sin(t*1.5+i))+')'; c.lineWidth=1; c.strokeRect(x+6.5,y+6.5,cw-13,ch-13);
        c.fillStyle='#cfdbea'; c.font='600 '+Math.round(ch/9)+'px Georgia,serif'; c.textAlign='center'; var words=b.title.split(' '), lines=[''], mw=cw-24;
        words.forEach(function(w){ var tl=lines[lines.length-1]+(lines[lines.length-1]?' ':'')+w; if(c.measureText(tl).width>mw&&lines[lines.length-1])lines.push(w); else lines[lines.length-1]=tl; });
        lines.slice(0,3).forEach(function(l,k){ c.fillText(l,x+cw/2,y+ch/2+(k-(Math.min(3,lines.length)-1)/2)*ch/7.5); }); }
      c.fillStyle='rgba(5,8,14,.8)'; c.fillRect(x+2,y+2,30,22); c.fillStyle=WCOL[sc.wave]||'#fff'; c.font='700 13px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(String(b.n),x+17,y+18);
      if(b.who&&b.who!=='0'){ c.fillStyle='rgba(5,8,14,.75)'; c.font='11px "Segoe UI",sans-serif'; var tw=c.measureText(WHO[b.who]).width+10; c.fillRect(x+cw-tw-4,y+4,tw,16); c.fillStyle='#9fe8ff'; c.textAlign='right'; c.fillText(WHO[b.who],x+cw-9,y+16); } }); };
  LBR.drawers.storyb=draw;
  var n=0, cardOf=function(D,w,h){ return LBR.card('storyb',D,n++,w,h,''); };
  var table=function(sc){ return '<table class="au-t sb-t"><thead><tr><th>#</th><th>Who</th><th>The picture</th><th>The line under it</th></tr></thead><tbody>'+sc.beats.map(function(b){
      return '<tr><td><b>'+b.n+'</b></td><td>'+(WHO[b.who]||'—')+(b.ids.length>1?'<br><span class="sb-v">2 versions</span>':'')+'</td><td><b>'+esc(b.title)+'</b><br>'+esc(b.desc.replace(/\{H\}/g,'you').replace(/\{O\}/g,'your twin').replace(/\{T\}/g,'the twins').replace(/\{K\}/g,'the little twins'))+'</td><td class="sb-cap">'+esc(b.cap)+'</td></tr>'; }).join('')+'</tbody></table>'; };
  var GROUPS=[[85,'The first spirit and the four builders'],[86,'The opening and the four realms\' falls'],[87,'The glimpses, the Lodestar, Muspelheim, Asgard, Godsbane and the Bifröst'],[88,'Surtharn\'s and Solmyrk\'s forms'],[89,'The feast hall to the World Tree']];
  var total=function(){ return ZSB.SCENES.reduce(function(a,s){ return a+s.beats.reduce(function(x,b){ return x+b.ids.length; },0); },0); };
  var LEGEND=function(){ return '<div class="sm-legend"><b>Story cut-scenes — many pictures each (round 79).</b> Every cut-scene told as a short montage: <b>'+ZSB.SCENES.length+' cut-scenes</b>, <b>'+ZSB.SCENES.reduce(function(a,s){ return a+s.beats.length; },0)+' frames</b> of 4–12 each, '+
    'a short line under each. Frames with the twin you play come in a Zeldor and a Zeldara version, so <b>'+total()+' pictures</b> in five waves. Each picture is one mini scene; the video app turns the scene\'s pictures into one montage clip. '+
    'Every request keeps the game\'s look and adds your epic touch — neon rune-glow, the northern lights, the odd shooting star. ☆ a story line if it is right; a note to change any frame (say its number). Then <code>.\\tools\\sprites\\round79.ps1</code> sends the pictures.</div>'; };
  LAB_TABS.push({ id:'storyb', name:'Story cut-scenes',
    blurb:'<b>Round 79 — every cut-scene as a story in 4–12 pictures.</b> The story line, when it plays, and each frame with its caption. ☆ the story lines you are happy with; notes to change them.',
    designs:ZSB.SCENES.map(function(s){ return {id:s.id,name:s.name}; }),
    render:function(){ setTimeout(LBR.bind,0); n=0;
      return LEGEND()+GROUPS.map(function(G){ var L=ZSB.SCENES.filter(function(s){ return s.wave===G[0]; });
        return LBR.sec(G[1],'wave '+G[0]+' · '+L.length+' cut-scenes')+L.map(function(sc){
          return '<div class="br-grid sm-one">'+cardOf({id:sc.id,name:sc.name+' — '+sc.beats.length+' frames',desc:'<b>Plays:</b> '+esc(sc.plays)+'<br><b>The story:</b> '+esc(sc.story)},1280,Math.round(sc.beats.length>9?1280*0.42:1280*0.5))+'</div>'+table(sc); }).join(''); }).join(''); } });
  var st=document.createElement('style'); st.textContent='.sb-t td{font-size:12px}.sb-cap{color:#fff4d8;font-style:italic;font-family:Georgia,serif;max-width:320px}.sb-v{color:#9fe8ff;font-size:11px}';
  document.head.appendChild(st);
  if(typeof LTODO!=='undefined')LTODO.add({id:'storyb',label:'🎞 Story cut-scenes — read the '+ZSB.SCENES.length+' story lines and their frames',where:'Story cut-scenes tab · ☆ each story line or note changes (frame numbers)',done:function(){ return ZSB.SCENES.every(function(s){ return LBR.picked('storyb',s.id)||((LabApp.picks['storyb-'+s.id]||{}).notes||'').trim(); }); },go:function(){ LTODO.goTo('storyb','.br-grid',0); }});
})();
