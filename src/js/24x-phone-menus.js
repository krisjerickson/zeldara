// ═══════════════════════════════════════════════════════════════════════
// ║ 24x-phone-menus.js — round 88: THE MENUS FILL A PHONE (Kris: "Map and quests still needs to be larger as well as tome. inventory should fit
// ║ onto one single screen. we might need to make the hero square smaller, and might need to tile things differently to be more horizontal
// ║ versus vertical. ok if this is different layout for mobile vs. desktop version").
// ║ Phone only (body.zmz-on — a touch screen or a short window); the desktop layout is untouched.
// ║  · Map & Quests, the Inventory (and Skills & Familiars), the Tome: full size (no shrinking), filling the screen under the tab strip.
// ║  · Map: the square map as tall as the screen allows, the quests beside it in a wide, readable column.
// ║  · Inventory: side by side — a small hero framed by his gear on the left, the belt, rings and numbers beside him, the bag, its tabs and the picked item on the right.
// ║    Only the bag scrolls; everything else is on one screen.
// ║  · Tome: its sections in one row that slides sideways; the list and the open page share the rest of the screen.
// ═══════════════════════════════════════════════════════════════════════
var ZPHM={ on:function(){ return typeof document!=='undefined'&&document.body&&document.body.classList.contains('zmz-on'); } };
(function(){ if(typeof document==='undefined')return; var P='body.zmz-on ', M=P+'#modal-map .modal,'+P+'#modal-inventory .modal,'+P+'#modal-tome .modal';
  var st=document.createElement('style'); st.id='zphm-css'; st.textContent=
  // ── the three big menus: full size, the whole screen under the tab strip ──
  P+'.overlay#modal-map,'+P+'.overlay#modal-inventory,'+P+'.overlay#modal-tome{padding:34px 0 0!important;align-items:flex-start!important}'+
  M+'{zoom:1!important;box-sizing:border-box!important;width:calc(100vw - 8px)!important;min-width:0!important;max-width:none!important;height:calc(100vh - 38px)!important;max-height:calc(100vh - 38px)!important;'+
     'margin:0 auto!important;padding:6px 10px 8px!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}'+
  P+'#modal-map .mhdr,'+P+'#modal-inventory .mhdr,'+P+'#modal-tome .mhdr{flex:none;min-height:30px!important;margin-bottom:5px!important;background-size:28px 28px!important;padding-left:36px!important}'+
  P+'#modal-map .mhdr span,'+P+'#modal-inventory .mhdr>span:first-child,'+P+'#modal-tome .mhdr>span:first-child{font-size:16px}'+
  // ── the map: tall square map, wide quest column ──
  P+'.wmap-body{flex:1;min-height:0;gap:12px}'+P+'#wmap-side{flex:1;width:auto;min-width:0;font-size:14px}'+
  P+'#wmap-side .wmq{font-size:14px}'+P+'#wmap-side .wmq-next{font-size:14px}'+P+'#wmap-side h4{font-size:12px}'+P+'.wm-lg{font-size:13px}'+
  P+'.wmap-z,'+P+'.wmap-rl{font-size:13px!important;padding:4px 10px!important}'+
  // ── the inventory: side by side, one screen ──
  P+'#inv-content{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;font-size:14px}'+
  P+'#zquick-row{flex:none;padding:3px 8px!important;margin:0 0 5px!important;min-height:0!important}'+
  P+'.zv{flex:1;min-height:0;flex-direction:row!important;gap:12px}'+
  P+'.zv-left{flex:none;width:min(450px,54vw)!important;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto 1fr;column-gap:10px;align-content:start;min-height:0;overflow-y:auto}'+
  P+'.zv-doll{grid-row:1/4;grid-column:1;grid-template-columns:36px 104px 36px;gap:4px}'+P+'.zv-col{gap:4px}'+
  P+'.zv-doll .zv-slot{width:36px;height:36px}'+P+'.zv-hero{min-height:0!important}'+
  P+'.zv-hero canvas{width:auto!important;height:86%!important;max-width:100%}'+P+'.zv-lv{top:2px;font-size:11px}'+P+'.zv-dais{display:none}'+
  P+'.zv-row{grid-column:2;margin-top:0;gap:3px;flex-wrap:wrap}'+P+'.zv-row .zv-slot.sm{width:30px;height:30px}'+P+'.zv-gap{min-width:2px}'+
  P+'.zv-rings{grid-column:2;margin-top:6px;gap:3px;grid-template-columns:repeat(5,1fr)}'+P+'.zv-rings .zv-slot.sm{height:22px}'+
  P+'.zv-stats{grid-column:2;align-self:start;grid-template-columns:1fr 1fr;gap:2px 8px;margin-top:6px;padding:5px 8px;font-size:11px}'+P+'.zv-st{gap:4px;min-width:0}'+P+'.zv-st b{white-space:nowrap}'+
  P+'.zv-right{min-height:0;gap:6px}'+P+'.zv-tabs{flex:none;flex-wrap:nowrap;overflow-x:auto}'+P+'.zv-tabs .inv-tab-btn{padding:4px 7px}'+
  P+'.zv-grid{flex:1;min-height:0!important;max-height:none!important;grid-template-columns:repeat(auto-fill,50px);grid-auto-rows:50px;gap:6px;padding:6px}'+
  P+'.zv-detail{flex:none;min-height:0;padding:6px 10px;gap:10px}'+P+'.zv-d-ico{width:52px;height:52px}'+P+'.zv-hint{font-size:12px;line-height:1.35}'+
  P+'.zv-d-desc{font-size:12px}'+P+'.zv-d-name{font-size:15px}'+P+'.zv-foot{display:none}'+
  P+'.zv-fams{margin-top:8px}'+
  // ── the tome: one sliding row of sections, the rest for the list and the page ──
  P+'.tome-body{gap:6px}'+P+'#tome-tabs{flex:none;flex-wrap:nowrap!important;overflow-x:auto;padding-bottom:3px;scrollbar-width:thin}'+
  P+'#tome-tabs button{flex:none;white-space:nowrap;font-size:13px;padding:5px 10px}'+
  P+'.tome-main{flex-direction:row!important;gap:10px}'+P+'#tome-grid{flex:1.25}'+P+'#tome-detail{padding:10px 12px}'+
  P+'#tome-detail dl{font-size:13px}'+P+'#tome-detail h3{font-size:18px}';
  document.head.appendChild(st);
})();
// the map's square: on a phone, as tall as the menu allows (it measured a shrunken menu and kept a 280 px floor)
(function(){ if(typeof _wmSizeCanvas!=='function')return; var o=_wmSizeCanvas;
  _wmSizeCanvas=function(){ o.apply(this,arguments); if(!ZPHM.on())return; var cv=document.getElementById('minimap-canvas'), md=document.querySelector('.wmap-modal'); if(!cv||!md)return;
    var hd=md.querySelector('.mhdr'), cs=getComputedStyle(md), mr=md.getBoundingClientRect(), hh=hd?hd.getBoundingClientRect().height+parseFloat(getComputedStyle(hd).marginBottom||0):34;
    var room=mr.height-hh-(parseFloat(cs.paddingTop)||0)-(parseFloat(cs.paddingBottom)||0)-4, side=Math.floor(Math.max(160,Math.min(room,window.innerWidth*0.55)));
    var dpr=Math.min(2,window.devicePixelRatio||1); cv.style.width=side+'px'; cv.style.height=side+'px';
    if(cv.width!==Math.round(side*dpr)){ cv.width=Math.round(side*dpr); cv.height=Math.round(side*dpr); } WMAP.dpr=dpr; WMAP.side=side; };
})();
