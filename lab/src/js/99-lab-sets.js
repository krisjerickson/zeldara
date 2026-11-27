// ═══════════════════════════════════════════════════════════════════════
// ║ 99-lab-sets.js — round 116: TWO LABS (Kris: "for the lab storage limit, let's split into 2 labs. Half of the older things can go into
// ║ Lab-old, if i ever need to come back to it. the more recent half in the new lab"). One artifact holds at most 256 MB and 511 files, so the new Lab carries no painted pages (assets/scenery): the Library tab (round 81, which draws from them) lives in the old Lab.
// ║ build.mjs writes lab/lab.artifact.html with LAB_SET='new' (the Lab Kris uses, with its picks) and lab/lab-old.artifact.html with
// ║ LAB_SET='old' (the earlier rounds, to look back at). lab/index.html (local, and the tests) has no LAB_SET: every tab.
// ═══════════════════════════════════════════════════════════════════════
var LAB_NEW=['tracker','fair140','motion140','bars140','title140','crypt140','r140','flow138','musicpace','worldlook5','first10','names137','logo137','stingcmp','npcs2','playlog','worldlook4','ceremony','names2','aim','engage2','seasonsall','sfxpick','storyb','teach','polish','guide','invorg','backdrop','npcs','npcarcs','trainrev','seasons','seasart','series','sagas5','serpick','seasdeco','economy','economy2','audio','cutlook','worldlook','seasons5','worldlook3','vidcompare','bossplan2','engage','publish','icons'];
// the tabs with work still open (buttons in the new Lab); the rest of LAB_NEW sit in the drop-down
var LAB_NOW=['tracker','fair140','motion140','bars140','title140','crypt140','r140','flow138','musicpace','worldlook5','npcs2','playlog','sfxpick','audio','serpick','cutlook','vidcompare'];      /* round 129: aim, names and engage2 decided → the drop-down */
(function(){ if(typeof LAB_SET==='undefined'||!LAB_SET||typeof LAB_TABS==='undefined')return;
  var keep=function(t){ return (LAB_NEW.indexOf(t.id)>=0)===(LAB_SET==='new'); }, K=LAB_TABS.filter(keep);
  LAB_TABS.length=0; K.forEach(function(t){ LAB_TABS.push(t); });
  if(typeof LAB_ACTIVE!=='undefined'){ var A=LAB_ACTIVE.filter(function(id){ return LAB_TABS.some(function(t){ return t.id===id; }); }); LAB_ACTIVE.length=0; A.forEach(function(id){ LAB_ACTIVE.push(id); });
    /* round 129 (Kris: "we need to clean up the new lab, with a drop-down for old tabs that we don't need to use anymore, as it's getting
       cluttered"): only the tabs with work still open are buttons; every other tab of the new Lab is in the "Archived & earlier rounds" drop-down */
    if(LAB_SET==='new'){ LAB_ACTIVE.length=0; LAB_NOW.forEach(function(id){ if(LAB_TABS.some(function(t){ return t.id===id; }))LAB_ACTIVE.push(id); }); } }
  if(typeof LTODO!=='undefined'&&LAB_SET==='old')LTODO.L=[];      /* the open asks are all in the new Lab */
  if(LAB_SET==='old'){ var st=document.createElement('style'); st.textContent='#lab-old-note{margin:6px 12px;padding:8px 12px;border:1px dashed #6a7a8a;border-radius:9px;color:#c8d4e4;font:13px "Segoe UI",sans-serif;background:#0d1420}';
    document.head.appendChild(st); var n=document.createElement('div'); n.id='lab-old-note'; n.innerHTML='📁 <b>The Lab — earlier rounds.</b> Everything here was decided and built; it is kept to look back at. Your picks from these rounds are stored with the main Lab (and written into the docs), so they are not shown here. The current work is in the main Lab.';
    var go=function(){ var t=document.getElementById('lab-tabs'); if(t&&t.parentNode)t.parentNode.insertBefore(n,t); }; if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go); else go(); }
})();
