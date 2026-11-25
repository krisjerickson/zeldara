// ═══════════════════════════════════════════════════════════════════════
// ║ 79z9-lab-playlog.js — round 134: PLAY LOG (wave 1, playtest_data). The game keeps an opt-in, anonymous log in the player's own browser
// ║ (Controls › "Help make the game better"); nothing is sent. A tester copies it or saves it as a file and sends it; paste or open it
// ║ here (several at once) to see where sessions end, which guardians people fall to, and how long each site takes.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LAB_TABS==='undefined')return;
  var esc=function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }, LOGS=[];
  var bars=function(title,rows,unit){ if(!rows.length)return '<h4>'+title+'</h4><p class="pl-none">Nothing yet.</p>'; var mx=Math.max.apply(null,rows.map(function(r){ return r[1]; }));
    return '<h4>'+title+'</h4><table class="pl-t">'+rows.map(function(r){ return '<tr><td>'+esc(r[0])+'</td><td><i style="width:'+Math.max(2,Math.round(r[1]/mx*100))+'%"></i></td><td>'+r[1]+(unit||'')+(r[2]?' <small>'+esc(r[2])+'</small>':'')+'</td></tr>'; }).join('')+'</table>'; };
  var count=function(L,f){ var c={}; L.forEach(function(e){ var k=f(e); if(k)c[k]=(c[k]||0)+1; }); return Object.keys(c).map(function(k){ return [k,c[k]]; }).sort(function(a,b){ return b[1]-a[1]; }); };
  var view=function(){ var L=[]; LOGS.forEach(function(x){ L=L.concat(x.log||[]); }); if(!L.length)return '<p class="pl-none">Paste a log above, or open one or more saved files.</p>';
    var ends=count(L.filter(function(e){ return e.k==='end'; }),function(e){ return e.site?'in a site: '+e.site:(e.place||'?'); }).slice(0,12);
    var deaths=count(L.filter(function(e){ return e.k==='death'; }),function(e){ return e.boss?'⚔ '+e.boss:(e.area||'?'); }).slice(0,14);
    var T={}; L.filter(function(e){ return e.k==='site'; }).forEach(function(e){ (T[e.id]=T[e.id]||[]).push(e.t); }); var times=Object.keys(T).map(function(k){ var a=T[k], m=a.reduce(function(s,x){ return s+x; },0)/a.length; return [k,Math.round(m/6)/10,a.length+' run'+(a.length>1?'s':'')]; }).sort(function(a,b){ return b[1]-a[1]; }).slice(0,16);
    var left=count(L.filter(function(e){ return e.k==='left'; }),function(e){ return e.id; }).slice(0,10);
    var ses=L.filter(function(e){ return e.k==='session'||e.k==='start'; }).length;
    return '<div class="pl-sum">'+LOGS.length+' log'+(LOGS.length===1?'':'s')+' · '+L.length+' entries · '+ses+' sessions · '+L.filter(function(e){ return e.k==='death'; }).length+' falls</div><div class="pl-g">'+bars('Where sessions end',ends)+bars('Falls — by guardian or place',deaths)+bars('Minutes per site (cleared)',times,' min')+bars('Sites left before clearing',left)+'</div>'; };
  LAB_TABS.push({ id:'playlog', name:'Play log',
    blurb:'<b>Round 134 — the play log.</b> Players who tick "Help make the game better" (Controls) keep an anonymous log in their own browser. They send it to you; paste it or open the file here.',
    designs:[{id:'playlog',name:'Play log'}],
    render:function(){ setTimeout(function(){ var t=document.getElementById('pl-in'), f=document.getElementById('pl-file'), o=document.getElementById('pl-out'); if(!t)return;
        var add=function(txt){ try{ var j=JSON.parse(txt); if(j&&j.log){ LOGS.push(j); o.innerHTML=view(); return true; } }catch(e){} return false; };
        document.getElementById('pl-add').onclick=function(){ if(!add(t.value)){ t.value=''; t.placeholder='That did not look like a Zeldara play log — paste the whole of it.'; } else t.value=''; };
        document.getElementById('pl-clear').onclick=function(){ LOGS.length=0; o.innerHTML=view(); };
        f.onchange=function(){ [].forEach.call(f.files,function(fl){ var r=new FileReader(); r.onload=function(){ add(r.result); }; r.readAsText(fl); }); };
        o.innerHTML=view(); },0);
      return '<div class="pl-in"><textarea id="pl-in" placeholder="Paste a play log here (it starts with {&quot;game&quot;:&quot;zeldara&quot;…)"></textarea><div><button class="vbtn" id="pl-add">Add this log</button> <label class="vbtn">Open files… <input type="file" id="pl-file" accept=".json" multiple hidden></label> <button class="vbtn" id="pl-clear">Clear</button></div></div><div id="pl-out"></div>'; } });
  var st=document.createElement('style'); st.textContent='.pl-in textarea{width:100%;min-height:70px;background:#0a0c14;color:#c8d4e4;border:1px solid #2a3a50;border-radius:8px;font:12px monospace}.pl-sum{font:600 14px "Segoe UI";color:#ffe9a8;margin:10px 0}.pl-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:14px}'+
    '.pl-g h4{margin:0 0 6px;font:600 14px "Segoe UI";color:#bff8ff}.pl-t{width:100%;border-collapse:collapse;font:12.5px "Segoe UI";color:#c8d4e4}.pl-t td{padding:2px 4px}.pl-t td:first-child{width:42%}.pl-t i{display:block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3c8ce8,#7fd0ff)}.pl-t small{color:#8aa0b8}.pl-none{color:#8aa0b8;font:13px "Segoe UI"}';
  document.head.appendChild(st);
})();
