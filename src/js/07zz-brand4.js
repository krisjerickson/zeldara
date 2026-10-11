// ═══════════════════════════════════════════════════════════════════════
// ║ 07zz-brand4.js — round 46: the E of ZELDARA.
// ║ Kris: "the top of the E in Zeldara is too small. There are three horizontal lines in the E, with the top one that should be as long as the
// ║ bottom one. Let's fix the overall Zeldara to have this, and propose new designs, as needed".
// ║ The wordmark's letters are the typeface's own (Cinzel Decorative draws its E with a short top arm). ZBrand.glyph now lengthens the arms of an
// ║ E by drawing the arm again, shifted along itself and clipped to the arm's rows — so the tip, the serif and the gold all stay the typeface's own.
// ║ ZBrand.E_STYLE: 'top' (the top arm as long as the bottom one — the game's default now), 'equal' (the middle arm too), 'font' (the typeface
// ║ unchanged). The Lab's "The E" tab shows the fix beside the old E and four other typefaces of the Ringed Z.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZBrand==='undefined'||!ZBrand.glyph)return;
  ZBrand.E_STYLE='top'; ZBrand._eM={};
  ZBrand.WORDMARK='rz_medieval';      // round 47: Kris picked the Ringed Z in MedievalSharp (Lab logoe-medieval), with the E's top arm drawn out
  ZBrand.setE=function(st){ ZBrand.E_STYLE=st; if(ZBrand.cache)Object.keys(ZBrand.cache).forEach(function(k){ if(/^w_/.test(k))delete ZBrand.cache[k]; }); };      // the wordmarks are cached as pictures
  // the arms of an E in this font, measured once from its pixels (glyph units: 100 px type, baseline at y)
  ZBrand.eMetrics=function(font){ if(ZBrand._eM[font]!==undefined)return ZBrand._eM[font]; if(typeof document==='undefined')return null;
    try{ if(document.fonts&&document.fonts.check&&!document.fonts.check(font))return null; }catch(e){}
    var c=document.createElement('canvas'); c.width=160; c.height=150; var g=c.getContext('2d'); g.font=font; g.textBaseline='alphabetic'; g.textAlign='left'; g.fillStyle='#000'; g.fillText('E',20,120);
    var d=g.getImageData(0,0,160,150).data, W=160, rows=[], y0=-1, y1=-1; for(var y=0;y<150;y++){ var r=-1, l=-1; for(var x=0;x<W;x++)if(d[(y*W+x)*4+3]>100){ if(l<0)l=x; r=x; } rows.push([l,r]); if(r>=0){ if(y0<0)y0=y; y1=y; } }
    if(y0<0)return (ZBrand._eM[font]=null); var hgt=y1-y0, mid=Math.round(y0+hgt*0.5), stem=1e9; for(var y2=Math.round(y0+hgt*0.3);y2<=Math.round(y0+hgt*0.4);y2++)if(rows[y2][1]>=0)stem=Math.min(stem,rows[y2][1]); for(var y3=Math.round(y0+hgt*0.6);y3<=Math.round(y0+hgt*0.7);y3++)if(rows[y3][1]>=0)stem=Math.min(stem,rows[y3][1]);
    var band=function(from,dir,lim){ var a=-1, b=-1, xr=-1; for(var y=from;dir>0?y<=lim:y>=lim;y+=dir){ if(rows[y][1]>stem+3){ if(a<0)a=y; b=y; xr=Math.max(xr,rows[y][1]); } else if(a>=0)break; } return a<0?null:{a:Math.min(a,b),b:Math.max(a,b),x:xr}; };
    var top=band(y0,1,mid), bot=band(y1,-1,mid), md=null; for(var y4=Math.round(y0+hgt*0.38);y4<=Math.round(y0+hgt*0.62);y4++)if(rows[y4][1]>stem+3){ md=band(y4,1,y1); break; }
    var o=top&&bot?{stem:stem-20,top:{y0:top.a-120,y1:top.b-120,x:top.x-20},mid:md?{y0:md.a-120,y1:md.b-120,x:md.x-20}:null,bot:{y0:bot.a-120,y1:bot.b-120,x:bot.x-20}}:null;
    return (ZBrand._eM[font]=o); };
  // lengthen one arm without seams: the E is drawn with the arm's outer part cut away (A); the arm's body (between the bracket by the stem and the
  // serif at its tip) is drawn again stretched sideways to the new length (B — the body has only lengthwise edges, so stretching it shows no join);
  // the tip with its serif is drawn again at the new end (C)
  var stretch=function(q,draw,x,y,arm,to,stem,orig){ var dx=to-arm.x; if(dx<1.5)return false; var M=4, top=y+arm.y0-M, ht=arm.y1-arm.y0+2*M, tip=9, s0=stem+Math.max(4,(arm.x-tip-stem)*0.45), e0=arm.x-tip, sx=(e0+dx-s0)/Math.max(1,e0-s0);
    q.save(); q.beginPath(); q.rect(x-200,y-200,600,400); q.rect(x+s0,top,arm.x-s0+20,ht); q.clip('evenodd'); orig(); q.restore();
    q.save(); q.beginPath(); q.rect(x+s0,top,e0+dx-s0+0.4,ht); q.clip(); q.translate(x+s0,0); q.scale(sx,1); q.translate(-(x+s0),0); draw(x,y); q.restore();
    q.save(); q.beginPath(); q.rect(x+e0+dx,top,tip+20,ht); q.clip(); draw(x+dx,y); q.restore(); return true; };
  var _glyph=ZBrand.glyph;
  ZBrand.glyph=function(q,p,ch,x,y){ if(ch!=='E'||ZBrand.E_STYLE==='font')return _glyph.apply(ZBrand,arguments); var M=ZBrand.eMetrics(q.font); if(!M)return _glyph.apply(ZBrand,arguments);
    var draw=function(xx,yy){ q.save(); _glyph.call(ZBrand,q,p,'E',xx,yy); q.restore(); };
    if(ZBrand.E_STYLE==='equal'&&M.mid){ // both arms: cut both away from the original, then re-lay each
      var M2=4; q.save(); q.beginPath(); q.rect(x-200,y-200,600,400); [M.top,M.mid].forEach(function(a){ var s0=M.stem+Math.max(4,(a.x-9-M.stem)*0.45); q.rect(x+s0,y+a.y0-M2,a.x-s0+20,a.y1-a.y0+2*M2); }); q.clip('evenodd'); draw(x,y); q.restore();
      [M.top,M.mid].forEach(function(a){ stretch(q,draw,x,y,a,M.bot.x,M.stem,function(){}); }); return; }
    var to=M.bot.x+Math.max(2,(M.bot.x-M.stem)*0.12);      // round 47: a touch past the foot — a drooping serif reads shorter than a flared foot (Kris: "the top line of the E is still shorter")
    if(!stretch(q,draw,x,y,M.top,to,M.stem,function(){ draw(x,y); }))draw(x,y); };
  // fonts arrive late: forget measurements taken before (none are kept for a font that was not ready) and redraw the title's cached wordmark once
  try{ if(typeof document!=='undefined'&&document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ ZBrand._eM={}; if(ZBrand.cache)Object.keys(ZBrand.cache).forEach(function(k){ if(/^w_/.test(k))delete ZBrand.cache[k]; }); }); }catch(e){}
})();
