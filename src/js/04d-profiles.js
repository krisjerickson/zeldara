// ═══════════════════════════════════════════════════════════════════════
// ║ PLAYER PROFILES + SAVE SLOTS (hosting prep, Oct 2026)
// ║ Up to ~10 players, mostly each on their own device, so saves stay in the
// ║ browser (no database): New Game asks for your name; "Returning player"
// ║ lists the names on this device; each name has 3 save slots. A save can
// ║ be exported as a file / code and imported on another device (backup).
// ║
// ║ Storage goes through ZSave.store ({get,set,remove,keys}) — today the
// ║ browser's localStorage. A cloud store (Supabase) can replace it later
// ║ without touching the game: see docs "07-hosting-and-saves.md".
// ║ Keys: zeldara_profiles = {v:1, players:[{id,name,created,last}], last:id}
// ║       zeldara_save_<playerId>_<slot> = one game (the same JSON as before)
// ║ The old single save (qoz_v2) is moved into "Player 1", slot 1, once.
// ═══════════════════════════════════════════════════════════════════════
var ZSave={ SLOTS:3, MAX_PLAYERS:20, PKEY:'zeldara_profiles', LEGACY:'qoz_v2', current:null,
  store:{ get:function(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set:function(k,v){ try{ localStorage.setItem(k,v); return true; }catch(e){ return false; } },
    remove:function(k){ try{ localStorage.removeItem(k); }catch(e){} },
    keys:function(){ var out=[]; try{ for(var i=0;i<localStorage.length;i++)out.push(localStorage.key(i)); }catch(e){} return out; } },
  // ── profiles ──
  load:function(){ var d=null; try{ d=JSON.parse(ZSave.store.get(ZSave.PKEY)||'null'); }catch(e){} if(!d||!Array.isArray(d.players))d={v:1,players:[],last:null}; return d; },
  saveProfiles:function(d){ ZSave.store.set(ZSave.PKEY,JSON.stringify(d)); },
  players:function(){ var d=ZSave.load(); return d.players.slice().sort(function(a,b){ return (b.last||0)-(a.last||0); }); },
  byName:function(name){ var n=String(name||'').trim().toLowerCase(); return ZSave.load().players.find(function(p){ return p.name.toLowerCase()===n; })||null; },
  cleanName:function(name){ return String(name||'').replace(/[<>"'`\\]/g,'').replace(/\s+/g,' ').trim().slice(0,16); },
  addPlayer:function(name){ name=ZSave.cleanName(name); if(!name)return {err:'Please type a name.'}; var d=ZSave.load();
    if(d.players.some(function(p){ return p.name.toLowerCase()===name.toLowerCase(); }))return {err:'That name is already here — pick it under Returning player.'};
    if(d.players.length>=ZSave.MAX_PLAYERS)return {err:'This device already has '+ZSave.MAX_PLAYERS+' players.'};
    var p={id:'p'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36),name:name,created:Date.now(),last:Date.now()}; d.players.push(p); ZSave.saveProfiles(d); return {player:p}; },
  renamePlayer:function(id,name){ name=ZSave.cleanName(name); var d=ZSave.load(), p=d.players.find(function(q){ return q.id===id; }); if(!p||!name)return false;
    if(d.players.some(function(q){ return q.id!==id&&q.name.toLowerCase()===name.toLowerCase(); }))return false; p.name=name; ZSave.saveProfiles(d); return true; },
  deletePlayer:function(id){ var d=ZSave.load(); d.players=d.players.filter(function(p){ return p.id!==id; }); if(d.last===id)d.last=null; ZSave.saveProfiles(d); for(var s=1;s<=ZSave.SLOTS;s++)ZSave.store.remove(ZSave.slotKey(id,s)); },
  touch:function(id){ var d=ZSave.load(), p=d.players.find(function(q){ return q.id===id; }); if(p){ p.last=Date.now(); d.last=id; ZSave.saveProfiles(d); } },
  // ── slots ──
  slotKey:function(id,slot){ return 'zeldara_save_'+id+'_'+slot; },
  // the key the game reads/writes right now (falls back to the old single save when nothing is chosen)
  key:function(){ var c=ZSave.current; return c?ZSave.slotKey(c.pid,c.slot):ZSave.LEGACY; },
  read:function(){ return ZSave.store.get(ZSave.key()); },
  write:function(json){ var ok=ZSave.store.set(ZSave.key(),json); if(!ok&&!ZSave._warned){ ZSave._warned=true; if(typeof showNotif==='function')showNotif('⚠ Could not save — browser storage is full. Export a save and delete old slots.','#ff8866'); } return ok; },
  clearCurrent:function(){ ZSave.store.remove(ZSave.key()); },
  info:function(id,slot){ var raw=ZSave.store.get(ZSave.slotKey(id,slot)); if(!raw)return null; try{ var s=JSON.parse(raw); return {level:s.level||1,gold:s.gold||0,hp:s.hp,maxHp:s.maxHp,saved:s._savedAt||null,kb:Math.round(raw.length/1024),quests:(s.completedQuests||[]).length}; }catch(e){ return {broken:true}; } },
  choose:function(pid,slot){ ZSave.current={pid:pid,slot:slot}; try{ sessionStorage.setItem('zeldara_current',JSON.stringify(ZSave.current)); }catch(e){} ZSave.touch(pid); },
  currentPlayer:function(){ var c=ZSave.current; if(!c)return null; return ZSave.load().players.find(function(p){ return p.id===c.pid; })||null; },
  // the one-time move of the old single save into a profile
  migrateLegacy:function(){ var raw=ZSave.store.get(ZSave.LEGACY); if(!raw)return null; var d=ZSave.load(); if(d.migrated)return null;
    var p=d.players[0]; if(!p){ var r=ZSave.addPlayer('Player 1'); p=r.player; d=ZSave.load(); }
    var k=ZSave.slotKey(p.id,1); if(!ZSave.store.get(k)&&ZSave.store.set(k,raw)){ d.migrated=true; ZSave.saveProfiles(d); ZSave.store.set(ZSave.LEGACY+'_moved',raw); ZSave.store.remove(ZSave.LEGACY); return p; } return null; },
  // ── export / import (a file, or a code to paste) ──
  exportCode:function(pid,slot){ var raw=ZSave.store.get(ZSave.slotKey(pid,slot)); if(!raw)return null; var p=ZSave.load().players.find(function(q){ return q.id===pid; });
    var pack=JSON.stringify({z:'zeldara-save',v:1,name:p&&p.name,slot:slot,at:Date.now(),data:raw}); return 'ZLD1:'+btoa(unescape(encodeURIComponent(pack))); },
  parseCode:function(code){ try{ code=String(code||'').trim(); if(code.indexOf('ZLD1:')!==0)return null; var pack=JSON.parse(decodeURIComponent(escape(atob(code.slice(5))))); if(pack.z!=='zeldara-save'||typeof pack.data!=='string')return null; JSON.parse(pack.data); return pack; }catch(e){ return null; } },
  importCode:function(pid,slot,code){ var pack=ZSave.parseCode(code); if(!pack)return false; return ZSave.store.set(ZSave.slotKey(pid,slot),pack.data); },
  download:function(pid,slot){ var code=ZSave.exportCode(pid,slot); if(!code)return false; var p=ZSave.load().players.find(function(q){ return q.id===pid; }), a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([code],{type:'text/plain'})); a.download='zeldara-'+((p&&p.name)||'save').replace(/[^a-z0-9]+/gi,'_')+'-slot'+slot+'.zsave'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },500); return true; }
};
// keep the chosen player/slot across a page reload (graphics reset) within this tab
try{ var _zc=JSON.parse(sessionStorage.getItem('zeldara_current')||'null'); if(_zc&&_zc.pid)ZSave.current=_zc; }catch(e){}

// ═══════════ the title-screen menus (DOM, over the Phaser title) ═══════════
var ZProfilesUI={
  el:null,
  open:function(html){ var el=ZProfilesUI.el; if(!el){ el=ZProfilesUI.el=document.createElement('div'); el.id='zp-modal'; (document.getElementById('app')||document.body).appendChild(el); ZProfilesUI.css(); }
    el.innerHTML='<div class="zp-box">'+html+'</div>'; el.style.display='flex'; var inp=el.querySelector('input[autofocus]'); if(inp)setTimeout(function(){ inp.focus(); },30); },
  close:function(){ if(ZProfilesUI.el)ZProfilesUI.el.style.display='none'; },
  isOpen:function(){ return !!(ZProfilesUI.el&&ZProfilesUI.el.style.display==='flex'); },
  esc:function(s){ return String(s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); },
  ago:function(t){ if(!t)return ''; var m=Math.round((Date.now()-t)/60000); return m<1?'just now':m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':Math.round(m/1440)+' days ago'; },
  slotLine:function(I){ if(!I)return '<span class="zp-empty">Empty</span>'; if(I.broken)return '<span class="zp-empty">Unreadable save</span>'; return '<b>Level '+I.level+'</b> · '+I.gold+' gold'+(I.saved?' · saved '+ZProfilesUI.ago(I.saved):''); },
  // NEW GAME: your name, then a slot
  newGame:function(start,err,val){ ZProfilesUI.open('<h2>New game</h2><p>What\'s your name, adventurer?</p>'+
      '<input id="zp-name" maxlength="16" autofocus placeholder="Your name" value="'+ZProfilesUI.esc(val||'')+'">'+(err?'<p class="zp-err">'+ZProfilesUI.esc(err)+'</p>':'')+
      '<div class="zp-row"><button class="zp-btn zp-go" id="zp-next">Next →</button><button class="zp-btn" id="zp-cancel">Cancel</button></div>');
    var go=function(){ var v=document.getElementById('zp-name').value, ex=ZSave.byName(v);
      if(ex){ ZProfilesUI.slots(ex,start,true); return; }
      var r=ZSave.addPlayer(v); if(r.err)return ZProfilesUI.newGame(start,r.err,v); ZProfilesUI.slots(r.player,start,true); };
    document.getElementById('zp-next').onclick=go; document.getElementById('zp-name').onkeydown=function(e){ e.stopPropagation(); if(e.key==='Enter')go(); if(e.key==='Escape')ZProfilesUI.close(); };
    document.getElementById('zp-cancel').onclick=ZProfilesUI.close; },
  // NEW GAME, last step (round 18): choose your hero — boy or girl. The girl is a recoloured stand-in until her sprites are painted.
  pickHero:function(p,go,back){ ZProfilesUI.open('<h2>Choose your hero</h2><p>'+ZProfilesUI.esc(p.name)+', who will you play?</p><div class="zp-heroes">'+
      [['m','The boy','Spiky brown hair'],['f','The girl','Auburn hair, wine-red cape (stand-in art for now)']].map(function(h){ return '<button class="zp-hero" data-h="'+h[0]+'"><canvas width="100" height="168"></canvas><b>'+h[1]+'</b><small>'+h[2]+'</small></button>'; }).join('')+
      '</div><p class="zp-note">Both play the same. You can\'t change this later in the same save.</p><div class="zp-row"><button class="zp-btn" id="zp-hback">Back</button></div>');
    var E=ZProfilesUI.el; E.querySelectorAll('.zp-hero').forEach(function(b){ var cv=b.querySelector('canvas'), c=cv.getContext('2d'), img=new Image(); c.imageSmoothingEnabled=false;
      img.onload=function(){ var src=b.dataset.h==='f'&&typeof _heroRecolour==='function'?_heroRecolour(img):img; c.clearRect(0,0,100,168); c.imageSmoothingEnabled=true; var sc=Math.min(100/src.width,160/src.height); c.drawImage(src,(100-src.width*sc)/2,164-src.height*sc,src.width*sc,src.height*sc); };
      if(typeof HERO_WALK_FRAMES_FRONT!=='undefined')img.src=HERO_WALK_FRAMES_FRONT[0];
      b.onclick=function(){ go(b.dataset.h); }; });
    document.getElementById('zp-hback').onclick=back; },
  // RETURNING PLAYER: pick your name
  returning:function(start){ var L=ZSave.players(); if(!L.length)return ZProfilesUI.newGame(start);
    ZProfilesUI.open('<h2>Returning player</h2><p>Who\'s playing?</p><div class="zp-list">'+L.map(function(p){ var n=0; for(var s=1;s<=ZSave.SLOTS;s++)if(ZSave.info(p.id,s))n++;
        return '<button class="zp-pl" data-id="'+p.id+'"><b>'+ZProfilesUI.esc(p.name)+'</b><small>'+n+' save'+(n===1?'':'s')+' · last played '+ZProfilesUI.ago(p.last)+'</small></button>'; }).join('')+'</div>'+
      '<div class="zp-row"><button class="zp-btn" id="zp-cancel">Back</button></div>');
    ZProfilesUI.el.querySelectorAll('.zp-pl').forEach(function(b){ b.onclick=function(){ var p=ZSave.load().players.find(function(q){ return q.id===b.dataset.id; }); ZProfilesUI.slots(p,start,false); }; });
    document.getElementById('zp-cancel').onclick=ZProfilesUI.close; },
  // a player's 3 slots: play / new / export / import / delete
  slots:function(p,start,isNew,msg){ var rows=''; for(var s=1;s<=ZSave.SLOTS;s++){ var I=ZSave.info(p.id,s);
      rows+='<div class="zp-slot"><div class="zp-sl"><b>Slot '+s+'</b>'+ZProfilesUI.slotLine(I)+'</div><div class="zp-act">'+
        (I&&!I.broken?'<button class="zp-btn zp-go" data-a="play" data-s="'+s+'">Continue</button>':'')+
        '<button class="zp-btn'+(I?'':' zp-go')+'" data-a="new" data-s="'+s+'">'+(I?'New game here':'Start new game')+'</button>'+
        (I&&!I.broken?'<button class="zp-btn zp-sm" data-a="export" data-s="'+s+'" title="Download this save as a file (backup / another device)">⤓ Export</button>':'')+
        '<button class="zp-btn zp-sm" data-a="import" data-s="'+s+'" title="Load a .zsave file or code into this slot">⤒ Import</button>'+
        (I?'<button class="zp-btn zp-sm zp-del" data-a="del" data-s="'+s+'">🗑</button>':'')+'</div></div>'; }
    ZProfilesUI.open('<h2>'+ZProfilesUI.esc(p.name)+(isNew?' — pick a save slot':'')+'</h2>'+(msg?'<p class="zp-ok">'+ZProfilesUI.esc(msg)+'</p>':'')+rows+
      '<div class="zp-row"><button class="zp-btn" id="zp-back">Back</button><span class="zp-sp"></span><button class="zp-btn zp-sm" id="zp-ren">Rename</button><button class="zp-btn zp-sm zp-del" id="zp-delp">Remove player</button></div>'+
      '<div id="zp-exp" style="display:none"><p>A <b>.zsave</b> file was downloaded. If no download appeared, copy this code instead and keep it somewhere safe:</p><textarea id="zp-xcode" rows="3" readonly></textarea></div>'+
      '<div id="zp-imp" style="display:none"><p>Choose a <b>.zsave</b> file or paste a save code:</p><input type="file" id="zp-file" accept=".zsave,.txt"><textarea id="zp-code" rows="3" placeholder="ZLD1:…"></textarea><div class="zp-row"><button class="zp-btn zp-go" id="zp-impgo">Import</button></div></div>');
    var E=ZProfilesUI.el, impSlot=0;
    E.querySelectorAll('[data-a]').forEach(function(b){ b.onclick=function(){ var s=+b.dataset.s, a=b.dataset.a, I=ZSave.info(p.id,s);
        if(a==='play'){ ZSave.choose(p.id,s); ZProfilesUI.close(); start(false); }
        else if(a==='new'){ if(I&&b.dataset.sure!=='1'){ b.dataset.sure='1'; b.textContent='Overwrite? Click again'; return; } ZProfilesUI.pickHero(p,function(h){ ZSave.pendingHero=h; ZSave.choose(p.id,s); ZSave.clearCurrent(); ZProfilesUI.close(); start(true); },function(){ ZProfilesUI.slots(p,start,isNew); }); }
        else if(a==='export'){ ZSave.download(p.id,s); var x=document.getElementById('zp-exp'); x.style.display='block'; var ta=x.querySelector('textarea'); ta.value=ZSave.exportCode(p.id,s); ta.onkeydown=function(e){ e.stopPropagation(); }; ta.focus(); ta.select(); }
        else if(a==='import'){ impSlot=s; document.getElementById('zp-imp').style.display='block'; }
        else if(a==='del'){ if(b.dataset.sure!=='1'){ b.dataset.sure='1'; b.textContent='Delete?'; return; } ZSave.store.remove(ZSave.slotKey(p.id,s)); ZProfilesUI.slots(p,start,false,'Slot '+s+' deleted.'); } }; });
    var doImp=function(code){ if(ZSave.importCode(p.id,impSlot,code))ZProfilesUI.slots(p,start,false,'Imported into slot '+impSlot+'.'); else alert('That is not a Zeldara save code/file.'); };
    document.getElementById('zp-impgo').onclick=function(){ var f=document.getElementById('zp-file').files[0]; if(f){ f.text().then(doImp); } else doImp(document.getElementById('zp-code').value); };
    document.getElementById('zp-code').onkeydown=function(e){ e.stopPropagation(); };
    document.getElementById('zp-back').onclick=function(){ ZSave.players().length>1||!isNew?ZProfilesUI.returning(start):ZProfilesUI.close(); };
    document.getElementById('zp-ren').onclick=function(){ var n=prompt('New name for '+p.name+':',p.name); if(n&&ZSave.renamePlayer(p.id,n)){ p=ZSave.load().players.find(function(q){ return q.id===p.id; }); ZProfilesUI.slots(p,start,false,'Renamed.'); } };
    document.getElementById('zp-delp').onclick=function(){ var b=this; if(b.dataset.sure!=='1'){ b.dataset.sure='1'; b.textContent='Remove '+p.name+' and all 3 saves?'; return; } ZSave.deletePlayer(p.id); ZProfilesUI.returning(start); }; },
  css:function(){ var st=document.createElement('style'); st.textContent=
    '#zp-modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(4,6,14,.72);z-index:9000;font-family:"Segoe UI",system-ui,sans-serif}'+
    '.zp-box{background:#0d1424;border:1px solid #2a4a6a;border-radius:14px;padding:20px 22px;width:min(560px,92vw);max-height:86vh;overflow:auto;color:#dfe8f4;box-shadow:0 10px 40px rgba(0,0,0,.6)}'+
    '.zp-heroes{display:flex;gap:14px;justify-content:center;margin:14px 0 8px;flex-wrap:wrap}.zp-hero{display:flex;flex-direction:column;align-items:center;gap:4px;background:#111c30;border:1px solid #2a4a6a;border-radius:12px;padding:12px 18px 14px;color:#dfe8f4;cursor:pointer;min-width:150px;font:inherit}.zp-hero:hover,.zp-hero:focus{border-color:#3fe6f2;box-shadow:0 0 18px rgba(63,230,242,.35);outline:none}.zp-hero b{font-size:16px;color:#3fe6f2}.zp-hero small{color:#9fb4cc;font-size:12px}.zp-note{font-size:12px!important;text-align:center}'+
    '.zp-box h2{margin:0 0 6px;color:#00f5ff;font-size:20px}.zp-box p{margin:6px 0;color:#9fb4cc;font-size:13px}.zp-err{color:#ff9a8a!important}.zp-ok{color:#7fe0a8!important}'+
    '#zp-exp{margin-top:12px;border-top:1px solid #1e3550;padding-top:8px}#zp-xcode{width:100%;box-sizing:border-box;background:#070b16;border:1px solid #2a4a6a;color:#fff;border-radius:8px;padding:8px;font-size:12px;font-family:monospace}#zp-name,#zp-code{width:100%;box-sizing:border-box;background:#070b16;border:1px solid #2a4a6a;color:#fff;border-radius:8px;padding:10px 12px;font-size:16px;margin:6px 0}#zp-code{font-size:12px;font-family:monospace}'+
    '.zp-row{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap}.zp-sp{flex:1}'+
    '.zp-btn{background:rgba(68,136,204,.14);border:1px solid #4488cc;color:#cfe4ff;border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit}.zp-btn:hover{background:rgba(68,136,204,.3)}'+
    '.zp-go{background:rgba(0,204,136,.16);border-color:#00cc88;color:#b8ffe4}.zp-sm{padding:6px 10px;font-size:12px}.zp-del{border-color:#a05050;color:#ffb0a0;background:rgba(160,80,80,.12)}'+
    '.zp-list{display:flex;flex-direction:column;gap:6px;margin-top:8px}.zp-pl{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#0a1020;border:1px solid #24405e;border-radius:9px;padding:10px 12px;color:#e8f0fa;cursor:pointer;font-family:inherit;font-size:15px;text-align:left}.zp-pl:hover{border-color:#00f5ff}.zp-pl small{color:#7f95ad;font-size:11px}'+
    '.zp-slot{display:flex;justify-content:space-between;gap:10px;align-items:center;border:1px solid #1e3550;border-radius:10px;padding:10px 12px;margin-top:8px;background:#0a1020;flex-wrap:wrap}.zp-sl{display:flex;flex-direction:column;gap:2px;font-size:13px}.zp-sl b{color:#fff}.zp-empty{color:#62788f}.zp-act{display:flex;gap:6px;flex-wrap:wrap}'+
    '#zp-imp{margin-top:12px;border-top:1px solid #1e3550;padding-top:8px}';
    document.head.appendChild(st); }
};
