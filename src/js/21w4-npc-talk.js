// ═══════════════════════════════════════════════════════════════════════
// ║ 21w4-npc-talk.js — round 133: THE FAIRIES SPEAK (Kris's picks, Lab › Backstories for everyone else: "the woven into 40 spirits for when the
// ║ fairy is there with the bound spirit, but then after you free it, you should be able to go back to the fairy and talk to it … create the full
// ║ backstory as in A, keepers of the stones, but then also make some additional unique storylines, like B, each fairy, a little life").
// ║ Each waystone fairy keeps two of the forty spirits (src/npcs/, built by tools/voices/build_npcs.py into ZNPC). Tab at a fairy:
// ║  · with no lesson for you right now, she talks — about her two while they are bound ('before'), about them once they are free ('after'),
// ║    about her own little life ('life'), and about the land as it heals ('stage N', only in that part of the story);
// ║  · with a lesson under way, her lesson as before, and "And you?" for a line of her own.
// ║ Lines do not repeat until she has said them all (ps.npcHeard). Switch: ZNPCT.on.
// ═══════════════════════════════════════════════════════════════════════
var ZNPCT={ on:true,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  fairy:function(f){ if(typeof ZNPC==='undefined')return null; for(var k in ZNPC){ var n=ZNPC[k]; if(n.group==='fairies'&&n.realm===f.q&&n.fairy===f.i)return k; } return null; },
  stage:function(ps){ if(ps.spiritsHome)return 5; var u=ps.unlockedSections||[1]; return Math.max.apply(null,u.concat([1])); },
  // is each of her spirits still bound? (a spirit's shrine is in ws.wd._shrines; freed ones are in ps.spiritsFreed)
  bound:function(ws,ps,names){ var S=(typeof ZSPIRIT!=='undefined'&&ZSPIRIT.shrines)?ZSPIRIT.shrines(ws):((ws.wd&&ws.wd._shrines)||[]); var free=ps.spiritsFreed||[];
    return names.filter(function(nm){ var s=S.find(function(x){ return x.spirit===nm; }); return !(s&&free.indexOf(s.id)>=0); }); },
  // the next line: pools by where the story is; never the same line twice until all of them are heard
  line:function(ws,k){ var ps=ws.playerState, n=ZNPC[k], L=n.lines||{}, st=ZNPCT.stage(ps), still=ZNPCT.bound(ws,ps,n.spirits||[]), pools=[];
    if(still.length)pools.push(['before',3]); if(still.length<(n.spirits||[]).length)pools.push(['after',3]);
    pools.push(['life',2]); if(L['stage'+st])pools.push(['stage'+st,3]);
    var H=(ps.npcHeard||(ps.npcHeard={}))[k]||(ps.npcHeard[k]=[]), cand=[];
    pools.forEach(function(p){ (L[p[0]]||[]).forEach(function(t,i){ var id=p[0]+i; if(H.indexOf(id)<0)for(var w=0;w<p[1];w++)cand.push([id,t]); }); });
    if(!cand.length){ ps.npcHeard[k]=H=[]; pools.forEach(function(p){ (L[p[0]]||[]).forEach(function(t,i){ cand.push([p[0]+i,t]); }); }); }
    if(!cand.length)return null; var c=cand[Math.floor(Math.random()*cand.length)]; H.push(c[0]); return c[1]; },
  esc:function(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); },
  talk:function(ws,f,k){ var t=ZNPCT.line(ws,k); if(!t)return false; FairyTalk.show(f,ZNPCT.esc(t),[{t:'Tell me more',f:function(){ ZNPCT.talk(ws,f,k); }},{t:'Bye!'}]); return true; } };
(function(){ if(typeof WorldScene==='undefined'||!WorldScene.prototype._talkFairy)return;
  var t0=WorldScene.prototype._talkFairy;
  WorldScene.prototype._talkFairy=function(f){ var self=this, k=ZNPCT.on?ZNPCT.fairy(f):null; if(!k)return t0.apply(this,arguments);
    var st=this._fairyState?this._fairyState(f):{k:'chat'};
    if((st.k==='chat'||st.k==='done')&&ZNPCT.talk(this,f,k))return;
    // a lesson under way: her lesson as before, and one more button for a word of her own
    var sh=FairyTalk.show; FairyTalk.show=function(ff,html,btns){ btns=(btns||[]).concat([{t:'And you?',f:function(){ ZNPCT.talk(self,f,k); }}]); return sh.call(FairyTalk,ff,html,btns); };
    try{ return t0.apply(this,arguments); } finally{ FairyTalk.show=sh; } };
})();
// ── round 133: the mage-tower masters — after the fight, a scene of who they were (Kris ✓ A, "hermits who stopped waiting") ──
var ZMSCENE={ on:true,
  show:function(k){ var n=typeof ZNPC!=='undefined'&&ZNPC[k]; if(!n||!ZMSCENE.on||typeof document==='undefined')return false; var L=(n.lines&&n.lines.after)||[], pic=n.scene&&typeof ZHUD!=='undefined'&&ZHUD.pic?ZHUD.pic(n.scene):null;
    var d=document.createElement('div'); d.className='zmage-scene'; d.innerHTML=(pic?'<img src="'+pic+'" alt="">':'<div class="zms-np"></div>')+'<div class="zms-cap"><small>'+ZNPCT.esc(n.who)+' — before the dark</small><p>«'+ZNPCT.esc(L[0]||'')+'»</p><button>Continue</button></div>';
    (document.getElementById('app')||document.body).appendChild(d); var close=function(){ d.classList.add('out'); setTimeout(function(){ d.remove(); },500); document.removeEventListener('keydown',kd,true); };
    var kd=function(e){ if(e.key===' '||e.key==='Enter'||e.key==='Escape'){ e.preventDefault(); e.stopPropagation(); close(); } };
    d.querySelector('button').onclick=close; setTimeout(function(){ document.addEventListener('keydown',kd,true); },600); return true; } };
(function(){ if(typeof MageRun==='undefined'||!MageRun.learn||typeof MAGE_TOWERS==='undefined')return;
  var l0=MageRun.learn; MageRun.learn=function(ps,tome,quiet){ var r=l0.apply(MageRun,arguments); try{ var M=MAGE_TOWERS.find(function(m){ return (m.spell||m[3])===tome; }); if(M&&!quiet)ZMSCENE.show('mg_'+(M.key||M[0])); }catch(e){} return r; };
  // the first spell's mana ceremony waits until the scene is closed
  if(typeof ZCER!=='undefined'){ var m0=ZCER.mana; ZCER.mana=function(ps){ if(document.querySelector('.zmage-scene'))return; return m0.apply(ZCER,arguments); }; }
  var st=document.createElement('style'); st.textContent='.zmage-scene{position:fixed;inset:0;z-index:130;background:#05070c;display:flex;align-items:center;justify-content:center;animation:zcpIn .6s ease-out;transition:opacity .5s}.zmage-scene.out{opacity:0}'+
    '.zmage-scene img{max-width:100%;max-height:100%;object-fit:contain;animation:zmsKen 14s ease-out both}@keyframes zmsKen{from{transform:scale(1.06)}to{transform:none}}.zms-np{position:absolute;inset:0;background:radial-gradient(ellipse at center,#2a2030,#05070c)}'+
    '.zms-cap{position:absolute;left:50%;bottom:6%;transform:translateX(-50%);max-width:760px;text-align:center;color:#f0e8d8;text-shadow:0 2px 8px #000}.zms-cap small{font:13px "Segoe UI";color:#c8b8e8;letter-spacing:.06em}.zms-cap p{font:italic 21px/1.45 Georgia,serif;margin:6px 0 12px}'+
    '.zms-cap button{padding:6px 18px;border-radius:8px;border:1px solid rgba(255,226,122,.5);background:rgba(40,30,10,.7);color:#ffe9a8;font:600 14px "Segoe UI";cursor:pointer}';
  document.head.appendChild(st);
})();
