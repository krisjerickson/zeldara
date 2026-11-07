// ═══════════════════════════════════════════════════════════════════════
// ║ 09bc-boss-fx-art.js — round 91: THE PAINTED BOSS ATTACKS, IN THE FIGHTS (Kris: "i was playing against a boss, and we still had the large
// ║ area attacks that were just pixel versions of their attacks. so lets make sure this update actually got into the game").
// ║ Round 90 painted ten families of seven pieces each (07zt9 ZBFX_ART; the sheets are in assets/scenery, items bfx_<family>_<piece>), but
// ║ only the Lab showed them. Now BossPat (09bb) lays them over its shapes:
// ║   sky rain      the danger columns fill with warning sigils, the strikes fall onto them and burst into impacts
// ║   wall          built from the family's wall pieces, laid end to end
// ║   burst / spin  each ray is the family's beam; the mirror images strike with it too
// ║   floor         the deadly half is covered in the family's deadly ground
// ║   burrow        a trail of deadly ground, the sigil where it stops, the impact and the ring when it erupts
// ║   shockwave     the family's ring, with its gap cut out where the gap is
// ║   leaping combo the sigil where each slam lands, then the impact
// ║   strafing run  sigils down the lane; the fire it leaves is deadly ground
// ║   eclipse       sigils, and the strike falling from the dark
// ║ The family: Surtharn and Solmyrk always their own; else the attack's theme (rain:fire → fire and lava …); else the boss's own family
// ║ (BossPat.FAM_OF), its kind (fire, ice, storm …) or its colour. The flat shapes stay only as thin edges (so the safe places read
// ║ exactly), and come back whole wherever a picture isn't there (painted scenery off, or still loading).
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof BossPat==='undefined')return;
  BossPat.FAM_OF={goblin_king:'stone',dark_warlock:'void',swamp_witch:'bog',storm_mage:'storm',rock_dragon:'stone',iron_sentinel:'iron',lava_titan:'ember',shadow_lord:'void'};
  BossPat.KIND_FAM={fire:'ember',ice:'frost',storm:'storm',shadow:'void',earth:'stone',water:'frost',nature:'bog',beast:'stone',arcane:'void'};
  // the family by colour (last resort): hue → family
  BossPat.famByCol=function(col){ var n=MX.col(col), r=(n>>16&255)/255, g=(n>>8&255)/255, b=(n&255)/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn; if(d<0.12)return 'iron';
    var h=mx===r?((g-b)/d+6)%6:mx===g?(b-r)/d+2:(r-g)/d+4; h*=60; return h<40?'ember':h<70?'light':h<160?'bog':h<250?'frost':h<320?'void':'ember'; };
  BossPat.famFor=function(c){ if(typeof ZBFX_ART===('undefined'))return null; var A=ZBFX_ART, m=c.m, sl=BossPat.slotOf(m)||'', who=sl+' '+((m.def&&m.def.id)||'')+' '+((m.def&&m.def.name)||'');
    if(/volcano_lord|surtharn/i.test(who))return 'surt'; if(/^grim_|solmyrk|black sun/i.test(who))return 'sol';
    if(c.theme&&A.THEME[c.theme])return A.THEME[c.theme];
    var B=c.B||{}; if(B._bfx)return B._bfx; var f=B.fam&&BossPat.FAM_OF[B.fam]||null;
    if(!f){ var n={}, best=0; [].concat(B.list||[],B.desp||[]).forEach(function(p){ var th=String(p).split(':')[1], fm=th&&A.THEME[th]; if(fm){ n[fm]=(n[fm]||0)+1; if(n[fm]>best){ best=n[fm]; f=fm; } } }); }
    if(!f&&typeof BA!=='undefined'&&BossAtk.kindOf){ try{ var D=BA.of(sl); if(D)f=BossPat.KIND_FAM[BossAtk.kindOf(D)]||null; }catch(e){} }
    if(!f)f=BossPat.famByCol(c.col||'#a080ff'); B._bfx=f; return f; };
  // one painted piece as a texture (cut from its scenery page once per game)
  BossPat.artKey=function(S,fam,role){ var id='bfx_'+fam+'_'+role; if(typeof ZScn==='undefined'||!ZScn.has(id))return null; var key='zbfx_'+id; if(S.textures.exists(key))return key;
    var it=ZScn.META.items[id], cv=mkCanvas(it[3],it[4]); cv.getContext('2d').drawImage(ZScn.img[it[0]],it[1],it[2],it[3],it[4],0,0,it[3],it[4]);
    var T=S.textures.addCanvas(key,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; };
  // the ring with its gap cut out (the gap is centred on angle 0; the image is turned to the gap)
  BossPat.ringKey=function(S,fam,gapW){ var k0=BossPat.artKey(S,fam,'ring'); if(!k0)return null; var key=k0+'_gap'+Math.round(gapW*100); if(S.textures.exists(key))return key;
    var src=S.textures.get(k0).getSourceImage(), W=src.width, H=src.height, cv=mkCanvas(W,H), x=cv.getContext('2d'); x.drawImage(src,0,0);
    x.globalCompositeOperation='destination-out'; x.beginPath(); x.moveTo(W/2,H/2); x.arc(W/2,H/2,Math.max(W,H),-gapW/2,gapW/2,false); x.closePath(); x.fill();
    var T=S.textures.addCanvas(key,cv); try{ T.setFilter(Phaser.Textures.FilterMode.LINEAR); }catch(e){} return key; };
  // a layer of painted pieces for one attack: begin() each frame, put() each piece, end() hides the rest; kill() at the end. null = not painted
  BossPat.art=function(c,depth){ if(BossPat.ART_OFF)return null; var fam=BossPat.famFor(c), S=c.S; if(!fam||!BossPat.artKey(S,fam,'mark'))return null;
    return { fam:fam, pool:[], n:0, d:depth===undefined?BossPat.D_TELE:depth,
      key:function(role){ return BossPat.artKey(S,fam,role); },
      begin:function(){ this.n=0; },
      put:function(role,x,y,w,h,o){ var k=role.indexOf('zbfx_')===0?role:this.key(role); if(!k)return null; o=o||{}; var im=this.pool[this.n];
        if(!im){ im=S.add.image(x,y,k); this.pool.push(im); } else if(im.texture.key!==k)im.setTexture(k); this.n++;
        im.setVisible(true).setOrigin(o.ox===undefined?0.5:o.ox,o.oy===undefined?0.5:o.oy).setPosition(x,y).setDisplaySize(Math.max(1,w),Math.max(1,h)).setRotation(o.rot||0)
          .setAlpha(o.a===undefined?1:Math.max(0,Math.min(1,o.a))).setDepth(o.d===undefined?this.d:o.d).setBlendMode(o.add?Phaser.BlendModes.ADD:Phaser.BlendModes.NORMAL); return im; },
      // a length of wall pieces from (x0,y0) to (x1,y1), thick px high, laid end to end
      band:function(x0,y0,x1,y1,thick,o){ var L=Math.hypot(x1-x0,y1-y0); if(L<2)return; var seg=thick*1.9, n=Math.max(1,Math.ceil(L/seg)), a=Math.atan2(y1-y0,x1-x0), w=L/n;
        for(var i=0;i<n;i++){ var t=(i+0.5)/n; this.put('band',x0+(x1-x0)*t,y0+(y1-y0)*t,w*1.12,thick,Object.assign({rot:a},o||{})); } },
      // a beam from (x,y) along angle a, len long
      beam:function(x,y,a,len,thick,o){ this.put('beam',x,y,len,thick,Object.assign({rot:a,ox:0,oy:0.5},o||{})); },
      end:function(){ for(var i=this.n;i<this.pool.length;i++)this.pool[i].setVisible(false); },
      kill:function(){ this.pool.forEach(function(im){ try{ im.destroy(); }catch(e){} }); this.pool=[]; } }; };
  // a painted piece that fades out on its own (the deadly ground a strafing run leaves behind)
  BossPat.artFade=function(c,role,x,y,size,life,depth){ var fam=BossPat.famFor(c), k=fam&&BossPat.artKey(c.S,fam,role); if(!k)return null;
    var im=c.S.add.image(x,y,k).setDisplaySize(size,size*c.S.textures.get(k).getSourceImage().height/c.S.textures.get(k).getSourceImage().width).setRotation(Math.random()*6.28).setAlpha(0.9).setDepth(depth===undefined?BossPat.D_TELE-1:depth);
    c.S.tweens.add({targets:im,alpha:0,delay:life*600,duration:life*400,onComplete:function(){ im.destroy(); }}); return im; };
})();
