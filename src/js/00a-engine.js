// ═══════════════════════════════════════════════════════════════════════
// ║ ENGINE SWITCH (round 18). The game runs on Phaser 3.60 (default) or on
// ║ Phaser 4 (build with `node build.mjs --engine=4`, or open the page with
// ║ ?engine=4). The few calls that differ between the two go through ZENG so
// ║ the rest of the code stays the same on both:
// ║   ZENG.tintFill(o,col)  solid-colour flash   (v3 setTintFill · v4 tint mode FILL)
// ║   ZENG.tint(o,col)      normal tint, also undoes a flash
// ║   ZENG.mask(o,img,key)  alpha mask from a texture (v3 BitmapMask · v4 Mask filter)
// ║   ZENG.rtDone(rt)       v4 render textures buffer their draws until render()
// ║   ZENG.config(cfg)      per-version game config (v4: roundPixels is off by default)
// ═══════════════════════════════════════════════════════════════════════
var ZENG={ ver:(typeof Phaser!=='undefined'&&Phaser.VERSION)||'0', major:parseInt((typeof Phaser!=='undefined'&&Phaser.VERSION)||'3',10)||3,
  get v4(){ return ZENG.major>=4; },
  tintFill:function(o,col){ if(!o)return o; if(ZENG.v4){ o.setTint(col); if(o.setTintMode)o.setTintMode(Phaser.TintModes.FILL); } else o.setTintFill(col); return o; },
  tint:function(o,col){ if(!o)return o; if(ZENG.v4&&o.setTintMode)o.setTintMode(Phaser.TintModes.MULTIPLY); o.setTint(col); return o; },
  mask:function(o,img,key){ if(ZENG.v4){ try{ o.enableFilters(); o._zmask=o.filters.internal.addMask(img,false,undefined,'world'); }catch(e){ console.error('mask',e); } } else o.setMask(img.createBitmapMask()); return o; },
  rtDone:function(rt){ if(ZENG.v4&&rt&&rt.render)rt.render(); return rt; },
  config:function(cfg){ if(ZENG.v4){ cfg.render=cfg.render||{}; if(cfg.render.roundPixels===undefined&&cfg.roundPixels===undefined)cfg.render.roundPixels=true; } return cfg; }
};
