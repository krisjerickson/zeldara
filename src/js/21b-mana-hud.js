// ═══════════════════════════════════════════════════════════════════════
// ║ 21b-mana-hud.js — round 47 (Kris: "mana bar needs to be shown once you have your first spell. And the mana bar should show in all worlds").
// ║ The mana row of the HUD is hidden until you own a spell (a tome, or a spell learned at a mage tower), and it is kept up to date in every
// ║ scene — adventure sites, islands, buildings, sky ports — not only when the overworld redraws the HUD.
// ═══════════════════════════════════════════════════════════════════════
var ZMANA={ always:true,      // round 49 (Kris's card): always on the HUD, in every world
  has:function(ps){ if(!ps)return false; if((ps.spellsLearned||[]).length)return true; if(ps.equip&&ps.equip.spell)return true; return (ps.inventory||[]).some(function(id){ var I=ITEMS[id]; return !!(I&&I.spellId); }); },
  row:function(){ var b=document.getElementById('mana-bar'); return b?b.closest('.srow'):null; },
  tick:function(){ try{ var ws=typeof game!=='undefined'&&game.scene&&game.scene.getScene('World'), ps=ws&&ws.playerState; if(!ps)return; var on=ZMANA.always||ZMANA.has(ps), r=ZMANA.row(); if(r&&r.style.display!==(on?'':'none'))r.style.display=on?'':'none'; if(!on)return;
      var mana=Math.floor(ps.mana||0), mx=ps.maxMana||50; _hudW('mana-bar','width',Math.min(100,mana/mx*100)+'%'); _hudW('mana-val','text',mana+'/'+mx);
      ZMANA.site(ps,mana,mx); }catch(e){} },
  // round 51 (Kris: "when in adventure sites and the large volcano, you don't see your mana bar anymore … have the mana bar as well horizontal
  // across most of the screen, in between the health and experience bars"): the wide bars across the top of the site HUD. The volcano
  // scenes show that HUD but never drew it, so its health, experience and gold are kept up to date here as well.
  site:function(ps,mana,mx){ var H=document.getElementById('dungeon-hud'); if(!H||H.style.display==='none'||getComputedStyle(H).display==='none')return;
    var set=function(id,k,v){ var e=document.getElementById(id); if(!e)return; if(k==='w'){ if(e.style.width!==v)e.style.width=v; } else if(k==='bg'){ if(e.style.background!==v)e.style.background=v; } else if(e.textContent!==v)e.textContent=v; };
    set('dng-mana-bar','w',Math.min(100,mana/mx*100)+'%'); set('dng-mana-txt','t',mana+'/'+mx);
    var dng=game.scene.isActive('Dungeon'); if(dng)return;      // the Dungeon draws its own health, experience and gold
    var hp=Math.max(0,Math.round(ps.hp||0)), mh=ps.maxHp||30, hpPct=Math.min(100,hp/mh*100); set('dng-hp-bar','w',hpPct+'%'); set('dng-hp-bar','bg',hpPct>60?'#44ff88':hpPct>30?'#ffaa00':'#ff3322'); set('dng-hp-txt','t',hp+'/'+mh);
    var xpPct=Math.min(100,((ps.xp||0)/((ps.level||1)*100))*100); set('dng-xp-bar','w',xpPct+'%'); set('dng-lv-txt','t','Lv '+(ps.level||1)+' ('+Math.floor(xpPct)+'%)'); set('dng-gold-txt','t','💰 '+(ps.gold||0)+'g');
    var key=['VolcanoMaze','VolcanoBulletHell','VolcanoPuzzle','VolcanoEscape','VolcanoBossRush'].find(function(k){ return game.scene.isActive(k); });
    if(key){ var sc=game.scene.getScene(key), nm=sc&&sc.site&&typeof VOLC_NAMES!=='undefined'?VOLC_NAMES[sc.site.id]:null; set('dng-title','t',key==='VolcanoBossRush'?'🌋 Muspelheim':'🔥 '+(nm||'The forge')); } } };
if(typeof setInterval!=='undefined'&&typeof document!=='undefined')setInterval(ZMANA.tick,200);
