// ═══════════════════════════════════════════════════════════════════════
// ║ 79h-lab-dialogue.js — round 84: PICK THE DIALOGUE BOX (Kris: "i also want 10 options in the lab to choose from for how these text
// ║ boxes and dialogue comes out"). The ten looks of 07zdlg-dialogue.js (ZDLG.STYLES), each playing a villager's two-page speech the way
// ║ it plays in the game — typed out at talking pace with its own babble, ▶ to hear it again, click the box (or Space) for the next page.
// ║ ☆ the one for the game. Picks: 'dialogue-<style id>'.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined'||typeof ZDLG==='undefined')return;
  var SAMPLE={name:'Elder Runa',text:'The Runestone has stood here since before the lake had a name. It hums when heroes pass — and lately, child, it has not stopped humming. Go carefully out there. The Binders do not sleep, and neither, it seems, do you.'};
  var key=function(id){ return 'dialogue-'+id; }, picked=function(){ var s=ZDLG.STYLES.find(function(S){ var p=LabApp.picks[key(S.id)]; return p&&p.verdict==='pick'; }); return s?s.id:null; };
  var fonts=function(){ if(document.getElementById('zdlg-fonts'))return; var l=document.createElement('link'); l.id='zdlg-fonts'; l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Marcellus+SC&family=Alegreya+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400&family=Cinzel+Decorative:wght@700&family=Cinzel:wght@700;900&family=Uncial+Antiqua&family=Pirata+One&display=swap'; document.head.appendChild(l); };
  var live={};
  var play=function(id){ var host=document.querySelector('.dlg-stage[data-id="'+id+'"]'); if(!host)return; if(live[id])try{ live[id].close(); }catch(e){} host.querySelectorAll('[class^="zd-s-"]').forEach(function(n){ n.remove(); });
    live[id]=ZDLG.render(host,{style:id,name:SAMPLE.name,text:SAMPLE.text,icon:'ᚱ',onClose:function(){ live[id]=null; setTimeout(function(){ if(host.isConnected&&!live[id])play(id); },900); }}); };
  var card=function(S,i){ var p=picked()===S.id;
    return '<div class="dlg-card'+(p?' picked':'')+'" data-id="'+S.id+'"><div class="dlg-head"><b>'+(i+1)+' · '+S.name+'</b><span>'+S.cps+' letters a second · '+S.voice+' voice</span></div>'+
      '<div class="dlg-view"><div class="dlg-stage" data-id="'+S.id+'"></div></div>'+
      '<div class="dlg-desc">'+S.desc+'</div><div class="dlg-btns"><button class="vbtn dlg-play" data-id="'+S.id+'">▶ Play again</button><button class="vbtn dlg-pick" data-id="'+S.id+'" aria-pressed="'+p+'">'+(p?'★ In the game':'☆ Pick this one')+'</button></div></div>'; };
  var css='<style>.dlg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(560px,1fr));gap:18px;margin:12px 0 30px}'+
    '.dlg-card{background:#121a24;border:1px solid #2b3a4a;border-radius:12px;padding:12px}.dlg-card.picked{border-color:#f2c14e;box-shadow:0 0 0 2px rgba(242,193,78,.35)}'+
    '.dlg-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;color:#e8eef8;margin-bottom:8px}.dlg-head span{color:#8aa0b8;font-size:12px}'+
    '.dlg-view{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:8px;background:radial-gradient(ellipse at 50% 30%,#6d9a52,#3e6a32 60%,#22401d)}'+
    '.dlg-stage{position:absolute;left:0;top:0;width:1280px;height:720px;transform-origin:0 0}'+
    '.dlg-desc{color:#b8c6d8;font-size:13px;margin:8px 0}.dlg-btns{display:flex;gap:8px}</style>';
  var fit=function(){ document.querySelectorAll('.dlg-view').forEach(function(v){ var st=v.querySelector('.dlg-stage'); if(st)st.style.transform='scale('+(v.clientWidth/1280)+')'; }); };
  LAB_TABS.push({ id:'dialogue', name:'Dialogue boxes',
    blurb:'<b>Round 84 — the dialogue box.</b> When you [Tab] to talk to someone, their words now come up in a box: typed out at the pace of someone talking, a soft "talking" sound in the speaker\'s own pitch, Space (or a click) for the next page and Close at the end — and the game waits while they talk. Here are ten looks for it, each playing a villager\'s two-page speech the way the game will. ☆ the one you want; until then the game uses the first (Rune-stone).',
    designs:ZDLG.STYLES.map(function(S){ return {id:S.id,name:S.name}; }),
    render:function(){ fonts(); setTimeout(function(){ fit(); ZDLG.STYLES.forEach(function(S){ play(S.id); }); },60);
      return css+(typeof LBR!=='undefined'?LBR.sec('Ten dialogue boxes','▶ to hear one again · click a box for its next page · ☆ the one for the game'):'')+'<div class="dlg-grid">'+ZDLG.STYLES.map(card).join('')+'</div>'; } });
  window.addEventListener('resize',fit);
  document.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.dlg-play'); if(b){ play(b.dataset.id); return; }
    var p=e.target.closest&&e.target.closest('.dlg-pick'); if(p){ var id=p.dataset.id, was=picked()===id;
      ZDLG.STYLES.forEach(function(S){ var k=key(S.id); if(LabApp.picks[k]&&LabApp.picks[k].verdict==='pick'){ LabApp.picks[k].verdict=null; LabApp.persist(k); } });
      if(!was){ var k=key(id); LabApp.picks[k]=LabApp.picks[k]||{}; LabApp.picks[k].verdict='pick'; LabApp.persist(k); }
      document.querySelectorAll('.dlg-card').forEach(function(c){ var on=!was&&c.dataset.id===id; c.classList.toggle('picked',on); var bb=c.querySelector('.dlg-pick'); bb.setAttribute('aria-pressed',String(on)); bb.textContent=on?'★ In the game':'☆ Pick this one'; }); } });
  if(typeof LAB_ACTIVE!=='undefined')LAB_ACTIVE.unshift('dialogue');
  if(typeof LTODO!=='undefined')LTODO.add({id:'dialogue',label:'💬 Pick the dialogue box (one of ten)',where:'Dialogue boxes tab · ☆ one',done:function(){ return !!picked(); },go:function(){ LTODO.goTo('dialogue','.dlg-grid',0); }});
})();
