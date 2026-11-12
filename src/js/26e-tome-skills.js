// ═══════════════════════════════════════════════════════════════════════
// ║ 26e-tome-skills.js — round 102 (Kris: "in the tome, there should also be a place to learn about the skills"): a Skills chapter beside
// ║ Spells. Every special skill (Z): what it does, its cool-down, where it is taught (the castle isles' teachers) or sold, and the tip. A skill
// ║ counts as found once you own it (the same entry as in Items); the rest wait as "?" with where to look.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof Tome==='undefined'||typeof TOME_CATS==='undefined'||typeof ITEMS==='undefined')return;
  var at=TOME_CATS.findIndex(function(c){ return c.k==='spell'; }); TOME_CATS.splice(at+1,0,{k:'skill',n:'Skills',i:'💥'});
  var SK=function(){ return Object.keys(ITEMS).filter(function(k){ var I=ITEMS[k]; return I&&I.slot==='special'&&k!=='sp_roll'&&k.indexOf('~')<0; }); };
  var l0=Tome.list; Tome.list=function(cat){ return cat==='skill'?SK():l0.apply(Tome,arguments); };
  var e0=Tome.entry; Tome.entry=function(cat,id){ if(cat!=='skill')return e0.apply(Tome,arguments); var I=ITEMS[id]; if(!I)return null; var base=e0.call(Tome,'item',id)||{};
    var C=typeof CASTLE_BY_SKILL!=='undefined'&&CASTLE_BY_SKILL[id]&&CASTLE_ISLANDS[CASTLE_BY_SKILL[id]], T=C&&typeof CHAR_BY_ID!=='undefined'&&CHAR_BY_ID[C.teacher];
    var where=C?'Taught by '+(T?T.name:'the teacher')+' at '+(C.name||'a castle isle')+' — clear its warden':(I.buy?'Sold at the armory ('+I.buy+' g)':'Won on the road');
    return {name:I.name,icon:I.icon,sub:'Skill · Z · cool-down '+(I.cd||'?')+' s',hint:where,lines:[['What it does',String(I.desc||'').replace(/^Z:\s*/,'')],['Cool-down',(I.cd||'?')+' s — the Z button shows it draining'],['Where',where],['Tip','One skill at a time: choose it in the inventory (Special), then press Z. Skills work out in the world and in the adventure sites.']].concat(base.lines?[]:[])}; };
  var p0=Tome.pic; Tome.pic=function(cat,id,e,em){ return cat==='skill'?(typeof ZIcon!=='undefined'&&ITEMS[id]?ZIcon.item(id,em):((e&&e.icon)||'•')):p0.apply(Tome,arguments); };
  var q0=Tome.qOf; Tome.qOf=function(cat,id,e){ return cat==='skill'?q0.call(Tome,'item',id,e):q0.apply(Tome,arguments); };
  var s0=Tome.sync; Tome.sync=function(){ var r=s0.apply(Tome,arguments); try{ var b=Tome.book(); if(b){ b.skill=b.skill||{}; SK().forEach(function(id){ if(b.item&&b.item[id]&&!b.skill[id])b.skill[id]=b.item[id]; }); } }catch(e){} return r; };
})();
