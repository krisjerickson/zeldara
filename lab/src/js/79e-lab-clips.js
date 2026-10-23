// ═══════════════════════════════════════════════════════════════════════
// ║ 79e-lab-clips.js — round 73b: CUT-SCENE CLIPS, the queue for making them by hand (Kris: "we have few enough videos we don't need to
// ║ use an api, i can hand place the requests"; answer C1 — short AI video clips; doc 34). The list is ZVCLIP in src/js/07zvc-video-clips.js.
// ║  · Every clip as a card: its first frame (the painted panel cropped to 16:9, as tools/video/frames.py makes it), where it plays, the
// ║    file name to save, and the words with Copy buttons (the prompt; the negative prompt for apps that have the box).
// ║  · ☆ a clip when it is made and right in the game; a note to redo it.
// ║ Picks: 'clips-<id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined'||typeof ZVCLIP==='undefined')return; LBR.TABS.push('clips');
  var A=ZVCLIP.all(), IMG={}, WN={1:['wave 1 — the pilot','#7fe08a'],2:['wave 2','#ffd27a'],3:['wave 3','#9fb0c8']};
  var esc=function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  var load=function(src){ if(IMG[src])return IMG[src]; var im=new Image(); im.onerror=function(){ if(!im._b){ im._b=1; im.src='../'+src; } else im._dead=1; }; im.src=src; IMG[src]=im; return im; };
  // the first frame: the panel's 16:9 middle (a little above centre), slowly drifting in so the card hints at the motion
  var draw=function(cv,c,W,H,t,full,id){ var C=A.find(function(x){ return x.id===id; }); if(!C)return; var im=load(C.frame);
    c.fillStyle='#05070b'; c.fillRect(0,0,W,H);
    if(im.complete&&im.naturalWidth){ var w=im.naturalWidth, h=im.naturalHeight, th=Math.round(w*9/16), top=th<h?Math.round((h-th)*0.4):0, ch=Math.min(h,th), z=1+0.04*((t/8)%1), sw=w/z, sh=ch/z;
      c.drawImage(im,(w-sw)/2,top+(ch-sh)*0.45,sw,sh,0,0,W,H); }
    else { c.fillStyle='#8aa0b8'; c.font='600 '+Math.round(H/14)+'px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(im._dead?'The panel is not painted yet (round 78)':'loading…',W/2,H/2); }
    var Wv=WN[C.wave]||WN[3]; c.font='600 '+Math.round(H/18)+'px "Segoe UI",sans-serif'; var tw=c.measureText(Wv[0]).width+20; c.fillStyle='rgba(5,8,14,.75)'; c.fillRect(8,8,tw,H/11); c.fillStyle=Wv[1]; c.textAlign='left'; c.fillText(Wv[0],18,8+H/15); };
  LBR.drawers.clips=draw;
  var n=0, cardOf=function(D,w,h){ return LBR.card('clips',D,n++,w,h,''); };
  var field=function(id,k,label,txt,rows){ return '<div class="au-f"><span class="au-l">'+label+'</span><span class="au-req"><textarea readonly rows="'+(rows||2)+'" data-au="vc_'+id+'_'+k+'">'+esc(txt)+'</textarea><button class="vbtn au-copy" data-au="vc_'+id+'_'+k+'">⧉ Copy</button></span></div>'; };
  var desc=function(C){ return '<b>Plays:</b> '+esc(C.where)+'<br><b>First frame:</b> <code>sprites\\video_frames\\'+C.id+'.png</code><br><b>Save the clip as:</b> <code>'+C.id+'.mp4</code>'+
      field(C.id,'p','Prompt (paste it whole)',C.request,4)+field(C.id,'n','Negative prompt (if the app has the box)',C.neg,2); };
  var LEGEND='<div class="sm-legend"><b>Cut-scene clips — made by hand.</b> Each painted panel becomes the first frame of a short clip (about 8 seconds) that plays in its place in the game, '+
    'muted under the music, with its line; with no clip the picture shows as before. <b>'+A.length+' clips</b> in three waves; wave 1 is the pilot — the Lodestar made, the chains falling away, Bram\'s bridge, the twins casting Godsbane, the World Tree under the lake (they wait for round 78\'s pictures).<br>'+
    '<b>1.</b> On your PC: <code>.\\tools\\video\\video1.ps1</code> makes the first frames (16:9) in <code>sprites\\video_frames</code>, a <code>.txt</code> with the words beside each, and opens the folder. '+
    '<b>2.</b> In the video app: the frame as the <i>start image</i>, the prompt below (Copy), 16:9, about 8 seconds; download. '+
    '<b>3.</b> <code>.\\tools\\video\\video1.ps1 -Intake</code> takes them in from your Downloads (a file named with the clip id is matched; for any other new video it asks which clip it is) and builds.<br>'+
    '<b>Which app</b> (prices checked Oct 2026; no review tests paintings, so try the pilot\'s first clip in two and keep the better): '+
    '<b>Kling</b> — Standard about $10/month (660 credits), strong at keeping faces, a start-image and a negative-prompt box, no visible mark on paid plans; '+
    '<b>Google Flow / Gemini</b> (Veo 3.1, Omni Flash) — with Google AI Pro about $20/month, sticks closely to the start image, an invisible SynthID mark; '+
    '<b>Runway</b> — Standard about $15/month. ☆ a clip when it is made and right in the game; a note to redo it.</div>';
  var W1=A.filter(function(C){ return C.wave===1; });
  LAB_TABS.push({ id:'clips', name:'Cut-scene clips',
    blurb:'<b>Round 73b — cut-scene clips, made by hand.</b> Each clip\'s first frame, where it plays, the file name, and the prompt with Copy buttons. ☆ a clip once it is right in the game.',
    designs:A.map(function(C){ return {id:C.id,name:C.id}; }),
    render:function(){ setTimeout(LBR.bind,0); n=0;
      return LEGEND+[1,2,3].map(function(w){ var L=A.filter(function(C){ return C.wave===w; }); return LBR.sec((WN[w]||WN[3])[0].replace(/^w/,'W'),L.length+' clips')+'<div class="br-grid au-grid">'+L.map(function(C){ return cardOf({id:C.id,name:C.where.charAt(0).toUpperCase()+C.where.slice(1),desc:desc(C)},640,360); }).join('')+'</div>'; }).join(''); } });
  if(typeof LTODO!=='undefined')LTODO.add({id:'clips',label:'🎬 Cut-scene clips — make the pilot (5) by hand',where:'Cut-scene clips tab · wave 1 (after round 78\'s pictures)',done:function(){ return W1.every(function(C){ return LBR.picked('clips',C.id); }); },go:function(){ LTODO.goTo('clips','.br-grid',0); }});
})();
