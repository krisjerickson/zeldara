"""Round 26 — how large every painted character is drawn in the game → sprites/requests/sizes.json
{character: {"k": scale, "h": body height on screen in px}}. The intake uses it so that no character is stored
smaller than it is shown (python tools/sprites/intake.py reads it when present).
Run from the repo root after node build.mjs:   python tools/sprites/sizes.py"""
import sys, os, json
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, os.path.join(R, 'tests'))
from harness import game
JS = r"""(()=>{ var ws=game.scene.getScene('World'), out={}, M=ZAtlas.META.chars, put=function(ch,k){ if(M[ch]&&k>0)out[ch]={k:+k.toFixed(4),h:Math.round(k*M[ch].h0)}; };
  ['m','f'].forEach(function(w){ put('hero_'+w,ZAtlas.heroK()); });
  MON_ROSTER.forEach(function(R0){ try{ put(R0.id,ZAtlas.kPix(R0.id,ZAtlas.pix(MX.tex(ws,R0),'0'),MX.scaleOf(R0))); }catch(e){} });
  CHAR_ROSTER.forEach(function(C){ try{ if(C.cat==='npc')put(C.id,ZAtlas.kPix(C.id,ZAtlas.pix(CHX.tex(ws,C),'0'),1.45)); else if(C.cat==='mount')put(C.id,ZAtlas.kHeight(C.id,ZAtlas.MOUNT_H*ZAtlas.heroPix().h)); }catch(e){} });
  Object.keys(MOUNTS).forEach(function(m){ ['m','f'].forEach(function(w){ var rc='ride_'+w+'_'+m; if(M[rc])put(rc,ZAtlas.rideK(ws,rc)); }); });
  if(typeof BOSS_SLOT_LIST!=='undefined')BOSS_SLOT_LIST.forEach(function(sl){ try{ var D=BA.of(sl); if(!D||!M[sl])return; put(sl,ZAtlas.kHeight(sl,D.h)); }catch(e){} });
  if(typeof FAMILIAR_PICK!=='undefined')Object.keys(FAMILIAR_PICK).forEach(function(el){ try{ var D=SPIRIT_BY_ID[FAMILIAR_PICK[el]]; put('fam_'+el,ZAtlas.kPix('fam_'+el,ZAtlas.pix(_famTex(ws,D),'0'),0.5*(D.sz||1))); }catch(e){} });
  if(typeof FAIRY_PICK!=='undefined')Object.keys(FAIRY_PICK).forEach(function(q){ (FAIRY_PICK[q]||[]).forEach(function(fid){ try{ var F=FAIRY_BY_ID[fid]; put('fairy_'+fid,ZAtlas.kPix('fairy_'+fid,ZAtlas.pix(_fairyTex(ws,F),'0'),1.15)); }catch(e){} }); });
  if(typeof FAIRY_MONARCH_PICK!=='undefined')Object.keys(FAIRY_MONARCH_PICK).forEach(function(q){ try{ var id='monarch_'+FAIRY_MONARCH_PICK[q]; put(id,ZAtlas.kPix(id,ZAtlas.pix(_kingTex(ws,+q),'0'),1.25)); }catch(e){} });
  Object.keys(ZAtlas.ANIMAL_H).forEach(function(t){ var ch='animal_'+(t==='fire_imp'?'fire_imp_critter':t); put(ch,ZAtlas.kHeight(ch,ZAtlas.ANIMAL_H[t])); });
  var LA=ws._largeAnimalDefs||{}; Object.keys(LA).forEach(function(t){ put('animal_'+t,ZAtlas.kHeight('animal_'+t,1.7*LA[t].r)); });
  ['m','f'].forEach(function(w){ put('veh_'+w+'_sky_ship',ZAtlas.kHeight('veh_'+w+'_sky_ship',44)); });
  return out; })()"""
with game(painted=True) as g:
    for _ in range(80):
        g.wait(250)
        if g.js("!!(game.scene.isActive('World') && game.scene.getScene('World').player)"): break
    g.wait(1200); out = g.js(JS)
json.dump(out, open(os.path.join(R, 'sprites', 'requests', 'sizes.json'), 'w'), indent=0, sort_keys=True)
A = json.load(open(os.path.join(R, 'assets', 'atlas', 'index.json')))['chars']
print('%d of %d painted characters sized' % (len(out), len(A)), '· not sized:', sorted(c for c in A if c not in out)[:12])
