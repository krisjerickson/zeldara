// ═══════════════════════════════════════════════════════════════════════
// ║ 24w-readable.js — round 86c: POP-UPS YOU CAN READ (Kris: "both for mobile and desktop site, the pop-ups for stores and elsewhere are a bit
// ║ difficult to read, and a bit small text and images. Let's rebalance this, especially for the mobile version").
// ║  · Shops (camp, village shops, the apothecary, the forge), the quick-pick pop-ups, the tavern, item lists: bigger names, descriptions in a
// ║    lighter colour at a readable size, bigger item pictures, bigger Buy / Use buttons, a wider shop window.
// ║  · Phone: the menus were shrunk to fit (×0.67) — now they keep a readable size (×0.85 or more), fill the screen's width and scroll.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof document==='undefined')return; var st=document.createElement('style'); st.id='zread-css'; st.textContent=
  // ── the shops ──
  '#modal-camp .modal{width:min(920px,94vw)!important;max-width:94vw!important}'+
  '#modal-camp .shop-item{gap:14px;padding:11px 14px;margin-bottom:8px}'+
  '#modal-camp .shop-item .si-icon{font-size:30px;min-width:44px;text-align:center;zoom:1.35}'+
  '#modal-camp .shop-item .si-name{font-size:17px;color:#f0f4fa}'+
  '#modal-camp .shop-item .si-desc{font-size:14px;color:#b9c8d8;margin-top:4px;line-height:1.35}'+
  '#modal-camp .shop-item .si-buy{font-size:15px;padding:8px 18px;border-radius:7px}'+
  '#modal-camp .modal p,#modal-camp .modal .si-note{font-size:14px;color:#aebccc}'+
  // ── item lists, quick picks, the tavern, the sky port, a familiar's card ──
  '.item-row .ir-icon,.ir-icon{font-size:24px;width:34px;zoom:1.25}.item-row .ir-name,.ir-name{font-size:15px;color:#e4ecf6}.item-row .ir-stat,.ir-stat{font-size:13px;color:#a8c4e8}'+
  '.ir-equip,.item-row .ir-equip{font-size:13px;padding:6px 12px}.sp-row{padding:10px 12px;font-size:14px}'+
  '#quick-pick-popup{font-size:14px;min-width:300px}#quick-pick-popup div[style*="font-size:9px"],#quick-pick-popup div[style*="font-size:10px"],#quick-pick-popup div[style*="font-size:11px"]{font-size:13px!important}'+
  '#tavern-menu-overlay,#skyport-shop-overlay,#familiar-info-modal{font-size:15px}'+
  // ── every menu: a slightly bigger base size, lighter grey notes ──
  '.overlay>.modal{font-size:15px}.overlay>.modal .wm-note,.overlay>.modal small{color:#aebccc}'+
  // ── the phone: readable, not shrunk ──
  'body.zmz-on #modal-camp .modal,body.zmz-on #modal-inventory .modal,body.zmz-on #modal-tome .modal{width:calc(100vw / var(--zmz,.85) - 16px)!important;max-width:none!important;min-width:0!important}'+
  'body.zmz-on #quick-pick-popup{zoom:1!important;max-height:calc(100vh - 20px);overflow:auto}'+
  'body.game-paused #zpz-menu{display:none!important}';      /* the ☰ hides under a shop or any pause (the "Paused" tag sat on it) */
  document.head.appendChild(st);
})();
