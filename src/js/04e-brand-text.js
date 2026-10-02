// ═══════════════════════════════════════════════════════════════════════
// ║ Round 14: text drawn by Phaser (names over things, title cards, banners,
// ║ floating numbers) uses the wordmark's typeface family too. Every call that
// ║ asked for 'Segoe UI' gets Cinzel (bold or 14px and up) or Marcellus SC
// ║ (smaller labels). DOM text is handled in styles.css. Small body text in
// ║ windows stays plain. The faces come from 07zy-brand-fonts.js.
// ═══════════════════════════════════════════════════════════════════════
var ZFONT={ head:'"Cinzel","Marcellus SC",Georgia,serif', label:'"Marcellus SC","Cinzel",Georgia,serif', title:'"Cinzel Decorative","Cinzel",Georgia,serif',
  pick:function(st){ if(!st||st.fontFamily!=='Segoe UI')return st; var px=parseFloat(st.fontSize)||12, bold=/bold/.test(st.fontStyle||''); var o={}; for(var k in st)o[k]=st[k]; o.fontFamily=(bold||px>=14)?ZFONT.head:ZFONT.label; return o; } };
(function(){ if(typeof Phaser==='undefined')return; var F=Phaser.GameObjects.GameObjectFactory.prototype, t0=F.text;
  F.text=function(x,y,text,style){ return t0.call(this,x,y,text,ZFONT.pick(style)); }; })();
