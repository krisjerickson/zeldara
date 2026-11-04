// ═══════════════════════════════════════════════════════════════════════
// ║ 79k-lab-music-in.js — round 88: YOUR MUSIC, LINKED IN THE LAB (Kris: "update the lab with my music picks in there. i'm running out of
// ║ suno credits, so use all ones i've dumped in the folder so far, and link these to the lab").
// ║ Every Suno piece taken into the game gets a player: at the top of Music & sound ("Your music — in the game") and on its cue's card.
// ║ The Lab plays a 2-minute preview (lab/preview/music/<take>.mp3, made by tools/audio/music_preview.py); on the hosted Lab
// ║ (zeldara.vercel.app/lab) a link plays the whole piece from the game's own files. Two takes of one cue: the game alternates them.
// ║ LABMU.IN is written by tools/audio/music_preview.py from assets/audio/index.json — {cue: [[take, seconds], …]}.
// ═══════════════════════════════════════════════════════════════════════
var LABMU={ IN:{},
  mmss:function(s){ s=Math.round(s||0); return Math.floor(s/60)+':'+('0'+s%60).slice(-2); },
  hosted:function(){ return /vercel\.app$|localhost$/.test(location.hostname); },
  player:function(t){ var take=t[0], secs=t[1], lbl=/\.b$/.test(take)?'take 2':'take 1';
    return '<div class="lmu-p"><span class="lmu-t">'+lbl+' · '+LABMU.mmss(secs)+'</span><audio controls preload="none" src="'+(LABMU.hosted()?'../play/assets/audio/'+take+'.mp3':'preview/music/'+take+'.mp3')+'"></audio>'+'</div>'; },      /* hosted: the whole piece from the game's files (the Lab's previews are not in git) */

  card:function(id){ var T=LABMU.IN[id]; if(!T)return '<div class="lmu-none">Not made yet — the Suno words are below.</div>';
    return '<div class="lmu-in">✓ In the game'+(T.length>1?' — '+T.length+' takes, the game alternates them':'')+T.map(LABMU.player).join('')+'</div>'; },
  section:function(MU){ var ids=MU.map(function(q){ return q.id; }).filter(function(id){ return LABMU.IN[id]; }), left=MU.filter(function(q){ return !LABMU.IN[q.id]&&/^mu_/.test(q.id); });
    if(!ids.length)return '';
    var nm={}; MU.forEach(function(q){ nm[q.id]=q; });
    return LBR.sec('Your music — in the game',ids.length+' pieces · '+(LABMU.hosted()?'the whole pieces, from the game':'previews of the first 2 minutes'))+
      '<div class="lmu-grid">'+ids.map(function(id){ var q=nm[id]; return '<div class="lmu-c"><b>'+q.name+'</b> <code>'+id+'</code><div class="lmu-w">'+q.where+'</div>'+LABMU.IN[id].map(LABMU.player).join('')+'</div>'; }).join('')+'</div>'+
      '<div class="lmu-left"><b>Still to make ('+left.length+'):</b> '+left.map(function(q){ return q.name; }).join(' · ')+'.</div>'; }
};
(function(){ var st=document.createElement('style'); st.textContent=
  '.lmu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px;margin:8px 0 18px}'+
  '.lmu-c{background:#101a28;border:1px solid #24364e;border-radius:8px;padding:10px 12px;font:13px/1.4 "Segoe UI",sans-serif;color:#cfdbea}.lmu-c code{color:#8aa0b8;font-size:11px}'+
  '.lmu-w{color:#8aa0b8;font-size:12px;margin:2px 0 6px}.lmu-p{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:5px}.lmu-p audio{height:32px;flex:1;min-width:200px}'+
  '.lmu-t{font-size:11px;color:#8aa0b8;min-width:78px}.lmu-full{font-size:12px;color:#9fe0ff}.lmu-in{background:rgba(60,160,90,.12);border:1px solid rgba(90,200,120,.35);border-radius:6px;padding:6px 8px;margin-bottom:6px;color:#bfeccc;font:600 12px "Segoe UI",sans-serif}'+
  '.lmu-none{color:#8aa0b8;font:12px "Segoe UI",sans-serif;margin-bottom:4px}.lmu-left{color:#8aa0b8;font:12.5px/1.5 "Segoe UI",sans-serif;margin:0 0 20px}';
  document.head.appendChild(st); })();
