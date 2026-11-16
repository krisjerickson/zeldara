// ═══════════════════════════════════════════════════════════════════════
// ║ 22k-shop-gold.js — round 111 (Kris: "when buying things in village stores and elsewhere, it should be very obvious how much gold you
// ║ have, and how much gold things cost. make a banner at the top for how much gold you have that scrolls down with you, and make the costs
// ║ larger, bold and colored. Also, you should be able to buy multiple things at a time without the screen with items closing").
// ║  · Every shop window (the village stores, the merchant's buy and sell, the camp shop, the island traders, the forge) opens with a gold
// ║    banner — "💰 Your gold: 1,240" — that stays at the top while you scroll; it flashes and shows −120 when you spend, +45 when you sell.
// ║  · Every price is large, bold and gold (red when you cannot afford it, green for what you would get selling).
// ║  · Buying or selling no longer closes the window: it is drawn again in place, at the same scroll, so you can buy one thing after another.
// ║ ZSHOP.on: the switch.
// ═══════════════════════════════════════════════════════════════════════
var ZSHOP={ on:true, last:null, gold:null,
  ws:function(){ try{ return game.scene.getScene('World'); }catch(e){ return null; } },
  ps:function(){ var w=ZSHOP.ws(); return w&&w.playerState; },
  open:function(){ var m=document.getElementById('modal-camp'); return !!(m&&m.style.display!=='none'); },
  box:function(){ var c=document.getElementById('camp-content'); return c&&c.parentNode; },
  fmt:function(n){ return String(Math.round(n||0)).replace(/\B(?=(\d{3})+(?!\d))/g,','); },
  // the window drawn again where it was (no closing, the same scroll)
  refresh:function(){ var L=ZSHOP.last; if(!L||!ZSHOP.open()){ if(typeof closeModal==='function'&&!L)closeModal('camp'); return; } var B=ZSHOP.box(), y=B?B.scrollTop:0, t0=window.toggleModal;
    window.toggleModal=function(id){ if(id!=='camp')return t0.apply(this,arguments); };
    try{ L.fn.apply(null,L.args); }catch(e){ console.warn('shop refresh',e); } finally{ window.toggleModal=t0; }
    if(B)B.scrollTop=y; ZSHOP.dress(); },
  // the banner, the prices
  dress:function(){ if(!ZSHOP.on)return; var c=document.getElementById('camp-content'), ps=ZSHOP.ps(); if(!c||!ps)return; var g=ps.gold||0;
    var bar=c.querySelector('.shop-goldbar'); if(!bar){ bar=document.createElement('div'); bar.className='shop-goldbar'; bar.innerHTML='<span class="sg-ic">💰</span><span class="sg-l">Your gold</span><b class="sg-n"></b><i class="sg-d"></i>'; c.insertBefore(bar,c.firstChild); }
    var n=bar.querySelector('.sg-n'), d=bar.querySelector('.sg-d'); n.textContent=ZSHOP.fmt(g);
    if(ZSHOP.gold!==null&&ZSHOP.gold!==g){ var dv=g-ZSHOP.gold; d.textContent=(dv>0?'+':'−')+ZSHOP.fmt(Math.abs(dv)); d.className='sg-d '+(dv>0?'up':'dn'); bar.classList.remove('flash'); void bar.offsetWidth; bar.classList.add('flash'); }
    ZSHOP.gold=g;
    // the old small "You have …g" line at the foot goes (the banner says it)
    Array.prototype.forEach.call(c.querySelectorAll('p'),function(p){ if(/^\s*You have\b/.test(p.textContent)&&!p._zs){ p._zs=1; p.style.display='none'; } });
    // prices: "120g" / "120 g" in a row's description, and on Buy buttons
    Array.prototype.forEach.call(c.querySelectorAll('.si-desc, .si-buy, .zf-cost, .fg-cost'),function(el){ if(el._zsp)return; el._zsp=1; ZSHOP.price(el,g); });
    // affordability can change after a purchase: recolour every price
    Array.prototype.forEach.call(c.querySelectorAll('.si-price'),function(sp){ if(sp.classList.contains('sell'))return; var v=+sp.dataset.v||0; sp.classList.toggle('poor',v>g); }); },
  price:function(el,g){ var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:function(n){ var p=n.parentNode; return p&&p.closest&&(p.closest('.si-price')||p.closest('.shop-goldbar')||p.closest('button'))&&!(p.closest('button')&&el.classList&&el.classList.contains('si-buy'))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT; }}), L=[], t; while((t=w.nextNode()))L.push(t);
    L.forEach(function(tn){ var s=tn.nodeValue, re=/(\d[\d,]*)\s?g\b/g; if(!re.test(s))return; re.lastIndex=0; var sell=/sell|worth|=/i.test(s)||/sell/i.test(el.textContent)&&el.classList.contains('si-buy')===false&&/Sell value|Worth/.test(el.textContent);
      var f=document.createDocumentFragment(), i=0, m; while((m=re.exec(s))){ f.appendChild(document.createTextNode(s.slice(i,m.index))); var v=+m[1].replace(/,/g,''), b=document.createElement('b'); b.className='si-price'+(sell?' sell':v>g?' poor':''); b.dataset.v=v; b.textContent=ZSHOP.fmt(v)+' g'; f.appendChild(b); i=m.index+m[0].length; }
      f.appendChild(document.createTextNode(s.slice(i))); tn.parentNode.replaceChild(f,tn); }); },
  // the other shop windows — the stables, the tavern's menu, the sky port's shop: the same banner and prices
  OTHER:['mounts-content','tavern-menu-overlay','skyport-shop-overlay'],
  dressOther:function(){ var ps=ZSHOP.ps(); if(!ps)return; ZSHOP.OTHER.forEach(function(id){ var el=document.getElementById(id); if(!el||el.offsetParent===null)return; var g=ps.gold||0;
      var host=id==='mounts-content'?el:(el.firstElementChild||el), bar=host.querySelector(':scope > .shop-goldbar');
      if(!bar){ bar=document.createElement('div'); bar.className='shop-goldbar sg-other'; bar.innerHTML='<span class="sg-ic">💰</span><span class="sg-l">Your gold</span><b class="sg-n"></b><i class="sg-d"></i>'; host.insertBefore(bar,host.firstChild); }
      var n=bar.querySelector('.sg-n'), d=bar.querySelector('.sg-d'), og=+(bar.dataset.g||g); n.textContent=ZSHOP.fmt(g); if(og!==g){ d.textContent=(g>og?'+':'−')+ZSHOP.fmt(Math.abs(g-og)); d.className='sg-d '+(g>og?'up':'dn'); bar.classList.remove('flash'); void bar.offsetWidth; bar.classList.add('flash'); } bar.dataset.g=g;
      ZSHOP.price(host,g); Array.prototype.forEach.call(host.querySelectorAll('.si-price'),function(sp){ if(!sp.classList.contains('sell'))sp.classList.toggle('poor',(+sp.dataset.v||0)>g); }); }); },
  css:function(){ if(document.getElementById('zshop-css'))return; var st=document.createElement('style'); st.id='zshop-css';
    st.textContent='.shop-goldbar{position:sticky;top:-20px;z-index:5;display:flex;align-items:center;gap:8px;margin:-6px -6px 12px;padding:9px 14px;border-radius:9px;background:linear-gradient(180deg,#3a2a08,#241804);border:1px solid #c9a03a;box-shadow:0 3px 12px rgba(0,0,0,.6),inset 0 0 12px rgba(255,200,80,.15)}'+
      '.shop-goldbar .sg-ic{font-size:22px}.shop-goldbar .sg-l{font:600 13px "Segoe UI",sans-serif;color:#e8d8a8;letter-spacing:.04em;text-transform:uppercase}.shop-goldbar .sg-n{margin-left:auto;font:800 24px/1 "Segoe UI",sans-serif;color:#ffd84a;text-shadow:0 0 10px rgba(255,200,60,.55),0 2px 0 #000}'+
      '.shop-goldbar .sg-d{font:800 14px "Segoe UI",sans-serif;font-style:normal;opacity:0;min-width:48px;text-align:right}.shop-goldbar .sg-d.dn{color:#ff7a6a}.shop-goldbar .sg-d.up{color:#8af08a}.shop-goldbar.flash .sg-d{animation:sgD 1.6s ease-out}.shop-goldbar.flash .sg-n{animation:sgN .6s ease-out}'+
      '@keyframes sgD{0%{opacity:1;transform:translateY(0)}70%{opacity:1}100%{opacity:0;transform:translateY(-10px)}}@keyframes sgN{30%{transform:scale(1.18)}}'+
      '.si-price{display:inline-block;font:800 15px "Segoe UI",sans-serif;color:#ffd84a;text-shadow:0 1px 0 #000,0 0 8px rgba(255,200,60,.35);padding:0 2px;white-space:nowrap}.si-price.poor{color:#ff6a5a;text-shadow:0 1px 0 #000}.si-price.sell{color:#8af08a}'+
      '.si-buy .si-price{font-size:13px;color:inherit;text-shadow:none}.shop-goldbar.sg-other{top:0;margin:0 0 10px}';
    document.head.appendChild(st); }
};
(function(){
  ZSHOP.css();
  // remember which window is open, so it can be drawn again after a purchase
  var wrap=function(name){ var f0=window[name]; if(typeof f0!=='function')return; window[name]=function(){ ZSHOP.last={fn:window[name],args:Array.prototype.slice.call(arguments)}; var r=f0.apply(this,arguments); try{ ZSHOP.dress(); }catch(e){} return r; }; };
  ['openBuildingShop','openCampModal','openIslandShop','openForgeModal'].forEach(wrap);
  // buying and selling keep the window open
  var keep=function(name){ var f0=window[name]; if(typeof f0!=='function')return; window[name]=function(){ var was=ZSHOP.open(), c0=window.closeModal; if(was)window.closeModal=function(id){ if(id!=='camp')return c0.apply(this,arguments); };
      var r; try{ r=f0.apply(this,arguments); } finally{ window.closeModal=c0; } if(was){ if(!ZSHOP.open()){ var m=document.getElementById('modal-camp'); if(m)m.style.display='flex'; } ZSHOP.refresh(); } return r; }; };
  ['_buyItem','_sellWood','_sellGem','_merchantSellItem','_merchantSellMarked','_merchantToggle','_buyAmmoN','_craftItem'].forEach(keep);
  // anything else that redraws the window (the apothecary's extras, the forge's tree) gets the banner too
  var c=document.getElementById('camp-content'); if(c&&typeof MutationObserver!=='undefined'){ var busy=false; new MutationObserver(function(){ if(busy)return; busy=true; try{ ZSHOP.dress(); }catch(e){} busy=false; }).observe(c,{childList:true}); }
  setInterval(function(){ try{ ZSHOP.dressOther(); }catch(e){} if(ZSHOP.open()){ var ps=ZSHOP.ps(); if(ps&&ps.gold!==ZSHOP.gold)ZSHOP.dress(); } else ZSHOP.gold=null; },400);
})();
