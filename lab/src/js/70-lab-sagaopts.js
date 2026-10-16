// ═══════════════════════════════════════════════════════════════════════
// ║ ROUND 59 — the "Asgard" option tab (scenery wave 61, tools\sprites\round59.ps1):
// ║  "Asgard" — "Lab options first": the walls, towers and gate, the citadel, the ground, the Bifröst, the pier notch, the rune circle at the
// ║    heart of Asgard where the ending happens, and the three story panels of the collapse and the descent.
// ║ Until a sheet is painted each card shows its description.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof LBR==='undefined')return;
  if(typeof LAB_ACTIVE!=='undefined'){ LAB_ACTIVE.unshift('asgard'); }
  var M=(typeof ZSCN_META!=='undefined'&&ZSCN_META)||{items:{}}, IMG={}, tried={};
  var load=function(key,a,b){ if(IMG[key]||tried[key])return IMG[key]; tried[key]=1; var im=new Image(); im.onload=function(){ IMG[key]=im; }; im.onerror=function(){ if(!im._b&&b){ im._b=1; im.src=b; } }; im.src=a; return null; };
  var draw=function(c,id,cx,foot,h,mw){ var it=M.items[id]; if(!it){ var T=M.tex&&M.tex[id]; if(!T)return false; var ti=load('t:'+id,'assets/scenery/'+T.file,'../assets/scenery/'+T.file); if(!ti)return false; var sz=Math.min(h,mw)*0.9; c.drawImage(ti,cx-sz/2,foot-sz,sz,sz); return true; } var im=load(it[0],'assets/scenery/'+it[0]+'.webp','../assets/scenery/'+it[0]+'.webp'); if(!im)return false; var s=Math.min(h/it[4],mw/it[3],2.6); c.imageSmoothingEnabled=true; c.imageSmoothingQuality='high'; c.drawImage(im,it[1],it[2],it[3],it[4],cx-it[3]*s/2,foot-it[4]*s,it[3]*s,it[4]*s); return true; };
  var room=function(c,id,W,H){ var r=M.rooms&&M.rooms[id]; if(!r)return false; var im=load('r:'+id,'assets/scenery/'+r,'../assets/scenery/'+r); if(!im)return false; var s=Math.min(W/im.width,H/im.height); c.drawImage(im,(W-im.width*s)/2,(H-im.height*s)/2,im.width*s,im.height*s); return true; };
  var wrap=function(c,txt,x,y,mw,lh){ var w=txt.split(' '), line=''; w.forEach(function(word){ var t=line?line+' '+word:word; if(c.measureText(t).width>mw&&line){ c.fillText(line,x,y); y+=lh; line=word; } else line=t; }); if(line)c.fillText(line,x,y); };
  var mk=function(tab,name,bg,glow,SEC,blurb){ var BY={}; SEC.forEach(function(S){ S.L.forEach(function(x){ BY[x[0]]={S:S,x:x}; }); }); LBR.TABS.push(tab);
    LBR.drawers[tab]=function(cv,c,W,H,t,full,id){ var D=BY[id]; if(!D)return; t=t||0; var g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,bg[0]); g.addColorStop(1,bg[1]); c.fillStyle=g; c.fillRect(0,0,W,H);
      var gl=c.createRadialGradient(W/2,H-20,8,W/2,H-20,W*0.5); gl.addColorStop(0,'rgba('+glow+','+(0.22+0.06*Math.sin(t*1.6))+')'); gl.addColorStop(1,'rgba('+glow+',0)'); c.fillStyle=gl; c.fillRect(0,0,W,H);
      if(D.S.panel?room(c,D.x[0],W,H):draw(c,D.x[0],W/2,H-12,H*0.86,W*0.9))return;
      c.fillStyle='#f4ecd8'; c.font='600 15px "Segoe UI",sans-serif'; c.textAlign='center'; c.fillText(D.x[1],W/2,H*0.3); c.fillStyle='#b8c4d0'; c.font='12px "Segoe UI",sans-serif'; wrap(c,D.x[2],W/2,H*0.3+24,W*0.82,16);
      c.fillStyle='#7a8a98'; c.font='11px "Segoe UI",sans-serif'; c.fillText('waiting for the painted sheet · tools\\sprites\\round59.ps1',W/2,H-16); };
    LAB_TABS.push({ id:tab, name:name, blurb:blurb, designs:Object.keys(BY).map(function(k){ return {id:k,name:BY[k].x[1]}; }),
      render:function(){ setTimeout(LBR.bind,0); var n=0; return SEC.map(function(S){ return LBR.sec(S.t,S.s)+'<div class="br-grid">'+S.L.map(function(x){ return LBR.card(tab,{id:x[0],name:x[1],desc:x[2]},n++,S.panel?480:360,S.panel?320:270,''); }).join('')+'</div>'; }).join(''); } }); };

  mk('asgard','Asgard',['#141820','#2a2a34'],'255,236,180',[
    {t:'🏰 Asgard on the lake — walls, towers, gate',s:'pick one style (A, B or C) · white, cream and gold; it covers most of Mirror Lake',L:[
      ['asgA_wall','A · wall','white stone, gold-capped battlements'],['asgA_tower','A · tower','white, a tall gold spire'],['asgA_gate','A · great gate','white arch, golden doors'],
      ['asgB_wall','B · wall','cream marble, a gilded frieze'],['asgB_tower','B · tower','slender, a gilded dome'],['asgB_gate','B · great gate','marble gatehouse, gold portcullis'],
      ['asgC_wall','C · wall','pale granite, gold rune-bands'],['asgC_tower','C · tower','square, gold-tiled roof, raven vane'],['asgC_gate','C · great gate','granite, two great gold shield-bosses']]},
    {t:'✨ The citadel',s:'pick one · rises in the middle; the four floors of Asgard are inside',L:[
      ['asg_keep_a','Citadel of spires','white towers round one great gold spire'],['asg_keep_b','Hall of shields','a long marble hall roofed with gold shields, like Valhöll'],['asg_keep_c','Tree-crowned keep','a round keep under a tree of light']]},
    {t:'⬜ The ground inside the walls',s:'pick one',L:[
      ['tx_asg_a','White marble flags','white flagstones, thin gold seams'],['tx_asg_b','Cream rune-paving','cream stone, faint gold runes'],['tx_asg_c','Cloud-moss paving','pale stones, white moss, tiny gold flowers']]},
    {t:'🌈 The Bifröst',s:'pick one · from the village pier to Asgard\'s gate',L:[
      ['bif_a','Rainbow light','solid bands of rainbow light'],['bif_b','Crystal and rainbow','crystal slabs, a rainbow inside, gold rails'],['bif_c','Rune-lit stone','white stone glowing with rainbow runes']]},
    {t:'⚓ The pier notch',s:'pick one · where the Lodestar is set to call the Bifröst',L:[
      ['notch_a','Carved post','an old oak post, a staff-shaped notch'],['notch_b','Rune stone','a standing stone with a staff slot'],['notch_c','Iron cradle','an iron cradle ringed with rune-plates']]},
    {t:'🔆 The rune circle at Asgard\'s heart',s:'pick one · your ending: the Lodestar raised here, Godsbane cast into the sky, the Bifröst remade into heaven',L:[
      ['asg_circle_a','Gold ring of runes','white marble, rings of gold runes'],['asg_circle_b','Standing stones of light','eight white stones with gold tips'],['asg_circle_c','World-tree mosaic','the world tree in white, cream and gold']]},
    {t:'🎞 Story panels',s:'pick one of each pair · shown in the cut-scenes',panel:true,L:[
      ['pn_musp_sink_a','Muspelheim sinks — A','from the shore at dusk, the hero watching'],['pn_musp_sink_b','Muspelheim sinks — B','from high above, a ring of steam'],
      ['pn_asg_sky_a','Asgard opens in the sky — A','a ring of golden light, the city lowering at night'],['pn_asg_sky_b','Asgard opens in the sky — B','a white-gold tear in the dawn sky'],
      ['pn_asg_lake_a','Asgard on the lake — A','resting on the water, the pier pointing at its gate'],['pn_asg_lake_b','Asgard on the lake — B','from above, a walled city filling the lake']]}],
    '<b>Round 59 — Asgard and the Bifröst, options first.</b> After Muspelheim sinks, Asgard comes down onto Mirror Lake as a walled island of white and gold. Pick a style for its walls, the citadel, the ground, the Bifröst, the pier notch, the rune circle where the ending happens, and the story panels. Until the paintings are in, the game draws stand-ins.');
})();
