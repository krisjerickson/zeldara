// ═══════════════════════════════════════════════════════════════════════
// ║ 04i-icons.js — ZIcon: painted icons in the page (round 35).
// ║ The icons are ordered in 07zv-icons.js and arrive through the scenery pipeline (assets/scenery/icons-N.webp, ZScn).
// ║ Every call takes the emoji it replaces: while a sheet is missing (or painted scenery is off) the emoji is shown,
// ║ so sheets can arrive in any order and nothing is ever blank.
// ║   ZIcon.html(id, emoji, em)   an icon as HTML, em = box size in em of the surrounding text (default 1.3)
// ║   ZIcon.item(key, em)         the icon of an item (ITEMS key → ic_<key>)
// ║   ZIcon.of(obj, em)           an item object → its icon; anything else with .icon → that emoji
// ║   ZIcon.hydrate(root)         fills every element marked data-zi="<id>" (its text is the emoji to fall back to)
// ║ Ids: ui_* sl_* tab_* mk_* q_* st_* el_* tm_* orn_* ic_<item>.
// ═══════════════════════════════════════════════════════════════════════
var ZIcon={
  has:function(id){ return typeof ZScn!=='undefined'&&ZScn.has(id); },
  // the CSS that shows icon id in a box of `em` em (null when it is not there)
  css:function(id,em){ if(!ZIcon.has(id))return null; var it=ZScn.META.items[id], img=ZScn.img[it[0]], box=em||1.3, s=box/Math.max(it[3],it[4]), f=function(v){ return (Math.round(v*1000)/1000)+'em'; };
    return 'width:'+f(it[3]*s)+';height:'+f(it[4]*s)+';background:url('+ZIcon._src(img)+') no-repeat -'+f(it[1]*s)+' -'+f(it[2]*s)+' / '+f((img.naturalWidth||img.width)*s)+' '+f((img.naturalHeight||img.height)*s); },
  _src:function(img){ if(img.src)return img.src; if(!img._zurl){ try{ img._zurl=img.toDataURL(); }catch(e){ img._zurl=''; } } return img._zurl; },      // (a stand-in page is a canvas: ?scenery=fake)
  html:function(id,fb,em,cls){ var c=ZIcon.css(id,em), box=em||1.3; if(!c)return '<span class="zi-fb'+(cls?' '+cls:'')+'">'+(fb===undefined||fb===null?'':fb)+'</span>';
    return '<span class="zi-b'+(cls?' '+cls:'')+'" style="width:'+box+'em;height:'+box+'em"><i class="zi" style="'+c+'"></i></span>'; },
  item:function(key,em,cls){ var I=typeof ITEMS!=='undefined'&&ITEMS[key], h=ZIcon.html('ic_'+((I&&I._k)||key),I?I.icon:'?',em,cls);
    // round 40 (a round 37 leftover): a gem-set piece — iron_helm~fire~storm — wears a small coloured gem for each element set in it
    if(typeof key==='string'&&key.indexOf('~')>0&&typeof ZEL!=='undefined'){ var els=key.split('~').slice(1).filter(function(e){ return ZEL.E[e]; }); if(els.length)h='<span class="zi-set" title="Set with '+els.map(function(e){ return ZEL.E[e].n; }).join(' and ')+'">'+h+'<span class="zi-gems">'+els.map(function(e){ return '<i style="background:'+ZEL.E[e].col+'"></i>'; }).join('')+'</span></span>'; }
    return h; },      // (a gem-set piece — iron_helm~fire — shows its base item's icon)
  // a character's small standing picture (mounts, familiars, …) from the one thumbnail sheet of the painted sprites; the emoji when there is none
  char:function(ch,fb,em,cls){ var M=typeof ZAtlas!=='undefined'&&!ZAtlas.off&&ZAtlas.META, A=M&&ZAtlas.A(ch), i=M&&M.thumbs?M.thumbs[A]:undefined, box=em||1.6; if(i===undefined||!M.thumb)return '<span class="zi-fb'+(cls?' '+cls:'')+'">'+(fb||'')+'</span>';
    var n=M.thumb[1], f=function(v){ return (Math.round(v*1000)/1000)+'em'; }; return '<span class="zi-b'+(cls?' '+cls:'')+'" style="width:'+box+'em;height:'+box+'em"><i class="zi" style="width:'+box+'em;height:'+box+'em;background:url('+ZAtlas.BASE+'thumbs.webp) no-repeat -'+f((i%n)*box)+' -'+f(Math.floor(i/n)*box)+' / '+f(n*box)+' auto"></i></span>'; },
  _chOf:function(obj){ var C=ZIcon._chm||(ZIcon._chm=new WeakMap()); if(C.has(obj))return C.get(obj); var r=null, k; if(typeof MOUNTS!=='undefined')for(k in MOUNTS)if(MOUNTS[k]===obj){ r='mt_'+k; break; } if(!r&&typeof FAMILIARS!=='undefined')for(k in FAMILIARS)if(FAMILIARS[k]===obj){ r=k; break; } try{ C.set(obj,r); }catch(e){} return r; },
  of:function(obj,em,cls){ if(!obj)return ''; if(obj._k)return ZIcon.item(obj._k,em,cls); if(typeof obj==='object'){ var ch=obj._ch||ZIcon._chOf(obj); if(ch)return ZIcon.char(ch,obj.icon,em?em*1.25:1.9,cls); } return obj.icon===undefined?'':ZIcon.emo(String(obj.icon),em,cls); },
  // an emoji that has a painted icon of the same meaning (quest kinds, menu symbols); any other emoji is returned as it is
  EMO:{'⚔️':'mk_dungeon','🗼':'mk_tower','⚓':'mk_harbor','🎈':'mk_skyport','🌋':'mk_volcano','🏰':'mk_castle','⛺':'mk_camp','🔑':'ui_key','🔒':'ui_lock','💰':'ui_gold','❤️':'ui_heart','⭐':'ui_xp','📜':'ui_quests','🗺️':'ui_map','📖':'ui_tome','🎒':'ui_inventory'},
  emo:function(e,em,cls){ var id=ZIcon.EMO[e]; return id&&ZIcon.has(id)?ZIcon.html(id,e,em,cls):e; },
  hydrate:function(root){ if(typeof document==='undefined')return; (root||document).querySelectorAll('[data-zi]').forEach(function(el){ var id=el.getAttribute('data-zi'); if(el._zi===id+'|'+ZIcon.has(id))return; if(el._zfb===undefined)el._zfb=el.textContent;
      el._zi=id+'|'+ZIcon.has(id); el.innerHTML=ZIcon.html(id,el._zfb,parseFloat(el.getAttribute('data-em'))||undefined); }); },
  // the control bar: the name of each slot moves into a hover tip (Kris: icon + key, name on hover)
  bar:function(){ if(typeof document==='undefined')return; document.querySelectorAll('#action-icon-bar .aib-slot').forEach(function(s){ var l=s.querySelector('.aib-lbl'), t=(l&&l.textContent)||''; if(t&&s.getAttribute('data-tip')!==t)s.setAttribute('data-tip',t); }); ZIcon.hydrate(document.getElementById('action-icon-bar')); }
};
// every item knows its own key (for ZIcon.of)
if(typeof ITEMS!=='undefined')Object.keys(ITEMS).forEach(function(k){ try{ Object.defineProperty(ITEMS[k],'_k',{value:k,enumerable:false}); }catch(e){} });
if(typeof document!=='undefined'){ var _ziGo=function(){ ZIcon.hydrate(); ZIcon.bar(); }; if(typeof ZScn!=='undefined')ZScn.whenReady(_ziGo,15000); setInterval(function(){ try{ ZIcon.bar(); ZIcon.hydrate(); }catch(e){} },900); if(document.readyState!=='loading')setTimeout(_ziGo,0); else document.addEventListener('DOMContentLoaded',_ziGo); }
