// ═══════════════════════════════════════════════════════════════════════
// ║ Round 14: the logos at work in the game (Kris).
// ║  • The main logo (World Tree): village plaza floor (07f/07l), title, loading
// ║    screen, browser-tab icon, and the Tome / Inventory / Controls / Mounts windows.
// ║  • Second tier, each with a job:
// ║      way_b        waystone travel map header, waystone awakening + arrival flash
// ║      way_compass  compass rose on the world map (and its header)
// ║      crossed_axes boss title cards, Victory banner, forge / armoury windows, dungeon HUD
// ║      axes_serpent emblem beside the boss health bar, the Volcano quest line
// ║      axes_tree    player / save-slot dialog, the Guild and Quest Journal windows
// ║      blade_b      Level-up and new-skill / new-spell banners
// ║      serpent_coil the "you fell" banner, harbour / ferry windows, setting sail
// ║ ZLogo.url(id,px) → PNG data URL · ZLogo.banner(id,title,sub) → a brief centre banner
// ║ ZLogo.flash(scene,id,x,y) → a glowing mark in the world.
// ═══════════════════════════════════════════════════════════════════════
var ZLogo={ _u:{}, on:typeof ZBrand!=='undefined'&&!!ZBrand.LOGO,
  // a logo as an image. The main logo uses its own small sizes; the others are drawn in full and scaled down so each stays recognisable.
  url:function(id,px){ var k=id+'_'+px; if(ZLogo._u[k])return ZLogo._u[k]; try{ var S=ZBrand.byId(id), main=id===ZBrand.LOGO, R, L, src;
      if(main){ R=px<40?px/2/1.3:px/2/1.55; L=px>=150?3:px>=64?2:1; src=ZBrand.layers(S,R,L); }
      else { R=Math.max(60,px/2/1.62); src=ZBrand.layers(S,R,3); }
      var cv=ZBrand.mk(px,px), c=cv.getContext('2d'), k2=main?1:(px/2/1.62)/R, d=src.sz*k2; c.imageSmoothingQuality='high'; c.globalAlpha=0.7; c.drawImage(src.glow,px/2-d/2,px/2-d/2,d,d); c.globalAlpha=1; c.drawImage(src.main,px/2-d/2,px/2-d/2,d,d);
      return ZLogo._u[k]=cv.toDataURL('image/png'); }catch(e){ return ''; } },
  img:function(id,px,style){ return '<img class="zlogo" alt="" width="'+px+'" height="'+px+'" src="'+ZLogo.url(id,px*2)+'"'+(style?' style="'+style+'"':'')+'>'; },
  // a short banner in the upper middle of the screen: emblem, title, one line. Does not pause or block anything.
  banner:function(id,title,sub,ms){ if(!ZLogo.on||typeof document==='undefined')return; var now=Date.now(); if(ZLogo._last&&ZLogo._last.id===id&&ZLogo._last.t===title&&now-ZLogo._last.at<1500)return; ZLogo._last={id:id,t:title,at:now};
    var el=document.getElementById('zl-banner'); if(!el){ el=document.createElement('div'); el.id='zl-banner'; (document.getElementById('app')||document.body).appendChild(el); }
    el.innerHTML=ZLogo.img(id,104)+'<div class="zb-t"></div><div class="zb-s"></div>'; el.querySelector('.zb-t').textContent=title||''; el.querySelector('.zb-s').textContent=sub||'';
    el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); clearTimeout(el._t); el._t=setTimeout(function(){ el.classList.remove('on'); },ms||2400); },
  tex:function(scene,id){ var key='zl_'+id; if(!scene.textures.exists(key)){ var S=ZBrand.byId(id), L=ZBrand.layers(S,72,3), cv=ZBrand.mk(L.sz,L.sz), c=cv.getContext('2d'); c.drawImage(L.glow,0,0); c.drawImage(L.main,0,0); scene.textures.addCanvas(key,cv); } return key; },
  flash:function(scene,id,x,y,o){ if(!ZLogo.on||!scene||!scene.add)return; try{ o=o||{}; var im=scene.add.image(x,y,ZLogo.tex(scene,id)).setBlendMode(Phaser.BlendModes.ADD).setDepth(o.depth||9).setScale(o.s0||0.35).setAlpha(0.95);
      scene.tweens.add({targets:im,scale:o.s1||1.25,alpha:0,duration:o.ms||1100,ease:'Cubic.easeOut',onComplete:function(){ im.destroy(); }}); }catch(e){} },
  // which emblem a window gets, from its title
  forTitle:function(t){ t=String(t||''); if(/forge|armou?r|blacksmith|weapon|smith/i.test(t))return 'crossed_axes'; if(/guild|quest/i.test(t))return 'axes_tree'; if(/harbo|ferry|dock|boat|island|sail|trader/i.test(t))return 'serpent_coil'; if(/waystone|travel/i.test(t))return 'way_b'; if(/map/i.test(t))return 'way_compass'; return ZBrand.LOGO; },
  mark:function(hdr,id){ if(!hdr||hdr._zl===id)return; hdr._zl=id; hdr.classList.add('zl-hdr'); hdr.style.backgroundImage='url('+ZLogo.url(id,84)+')'; },
  headers:function(){ document.querySelectorAll('.mhdr').forEach(function(h){ var s=h.querySelector('span')||h; ZLogo.mark(h,ZLogo.forTitle(s.textContent)); }); },
  init:function(){ if(!ZLogo.on||ZLogo._init||typeof document==='undefined')return; ZLogo._init=true;
    var st=document.createElement('style'); st.textContent=
      '.mhdr.zl-hdr{background-repeat:no-repeat;background-position:0 40%;background-size:42px 42px;padding-left:52px;min-height:44px}'+
      '#zl-banner{position:absolute;left:50%;top:13%;transform:translate(-50%,-8px);z-index:130;pointer-events:none;opacity:0;text-align:center;transition:opacity .45s,transform .45s;filter:drop-shadow(0 2px 10px rgba(0,0,0,.8))}'+
      '#zl-banner.on{opacity:1;transform:translate(-50%,0)}#zl-banner img{display:block;margin:0 auto 2px}'+
      '#zl-banner .zb-t{font-family:var(--zf-title);font-weight:700;font-size:30px;letter-spacing:.06em;background:linear-gradient(#fff3c0,#f2c14e 45%,#b47a1e);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:.6px rgba(40,26,4,.55)}'+
      '#zl-banner .zb-s{font-family:var(--zf-label);font-size:15px;color:#cfe6e2;letter-spacing:.05em;margin-top:2px;text-shadow:0 1px 3px #000}'+
      '#boss-hud::before{content:"";position:absolute;left:-58px;top:50%;width:52px;height:52px;transform:translateY(-50%);background:url('+ZLogo.url('axes_serpent',104)+') center/contain no-repeat}'+
      '#volcano-quest .vq-title::before{content:"";display:inline-block;width:26px;height:26px;margin-right:6px;vertical-align:-7px;background:url('+ZLogo.url('axes_serpent',64)+') center/contain no-repeat}'+
      '#dng-title::before{content:"";display:inline-block;width:24px;height:24px;margin-right:6px;vertical-align:-6px;background:url('+ZLogo.url('crossed_axes',64)+') center/contain no-repeat}'+
      '#zp-modal h2{background:url('+ZLogo.url('axes_tree',96)+') left center/46px 46px no-repeat;padding-left:56px;min-height:46px;display:flex;align-items:center}'+
      '#boss-card .bc-in img.zlogo{display:block;margin:0 auto 4px}'+
      '@media (max-width:700px){#boss-hud::before{display:none}}';
    document.head.appendChild(st);
    ZLogo._cmp=new Image(); ZLogo._cmp.src=ZLogo.url('way_compass',220);   // ready before the map first opens
    ZLogo.headers(); new MutationObserver(function(){ clearTimeout(ZLogo._ht); ZLogo._ht=setTimeout(ZLogo.headers,30); }).observe(document.body,{subtree:true,childList:true,characterData:true}); }
};
(function(){ if(!ZLogo.on)return;
  if(typeof document!=='undefined'){ if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ZLogo.init); else ZLogo.init(); }
  // boss title card + victory
  if(typeof BossMoments!=='undefined'){ var c0=BossMoments.card, f0=BossMoments.finale;
    BossMoments.card=function(){ c0.apply(this,arguments); var el=document.getElementById('boss-card'), inn=el&&el.querySelector('.bc-in'); if(inn)inn.insertAdjacentHTML('afterbegin',ZLogo.img('crossed_axes',64)); };
    BossMoments.finale=function(S,mon){ f0.apply(this,arguments); var nm=mon&&mon.def&&mon.def.name||''; if(S&&S.time)S.time.delayedCall(1500,function(){ ZLogo.banner('crossed_axes','Victory',nm.replace(/ \(Rematch\)$/,''),3000); }); }; }
  // compass rose on the world map
  if(typeof _wmDrawView==='function'){ var d0=_wmDrawView; _wmDrawView=function(ctx,W,H,ws,view,o){ var r=d0.apply(this,arguments); try{ if(o&&o.full){ var s=Math.round(Math.min(W,H)*0.17), im=ZLogo._cmp||(ZLogo._cmp=new Image()); if(!im.src)im.src=ZLogo.url('way_compass',220); if(im.complete&&im.naturalWidth){ ctx.save(); ctx.globalAlpha=0.9; ctx.drawImage(im,8,H-s-8,s,s); ctx.restore(); } } }catch(e){} return r; }; }
  // waystones: awakening, arrival; the ferry
  if(typeof WorldScene!=='undefined'){ var P=WorldScene.prototype, a0=P._activateWaystone, r0=P._arriveAtWaystone, s0=P._sailTo;
    P._activateWaystone=function(w){ var was=(this.playerState.activatedWaystones||[]).indexOf(w.id)>=0; a0.apply(this,arguments); if(!was){ ZLogo.flash(this,'way_b',w.x*TILE+TILE/2,w.y*TILE-6,{s0:0.3,s1:1.5,ms:1400}); ZLogo.banner('way_b',w.name.replace(' Waystone',''),'Waystone awakened'); } };
    P._arriveAtWaystone=function(to){ r0.apply(this,arguments); ZLogo.flash(this,'way_b',to.x*TILE+TILE/2,to.y*TILE-6,{s0:0.5,s1:1.3,ms:900}); };
    P._sailTo=function(key){ var isl=null; try{ var site=this.wd.sites.find(function(s){ return s.type==='harbor'&&(s.section+(s.isle||'a'))===key; }); isl=site&&(site.name||''); }catch(e){} var r=s0.apply(this,arguments); ZLogo.banner('serpent_coil','Setting sail',isl||'',2600); return r; }; }
})();
