"""Round 128: what every boss does TODAY, phase by phase, read from the running game (BOSS_PHASES, the signature attacks, castle and tower kits,
the difficulty table). Writes tools/world/boss_today.json for boss_plan2.py.   python tools/world/boss_today.py  (after node build.mjs)"""
import sys,json,os
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,os.path.join(H,'..','..','tests'))
from harness import game
with game(w=900,h=600) as g:
    g.wait(3000)
    r=g.js(r"""(()=>{ var o={}; var cp=x=>JSON.parse(JSON.stringify(x,(k,v)=>typeof v==='function'?undefined:v));
      o.phases={}; Object.keys(BOSS_PHASES).forEach(k=>{ o.phases[k]=cp(BOSS_PHASES[k]); });
      o.info=cp(BOSS_ATK_INFO); o.attacks=typeof BOSS_ATTACKS!=='undefined'?cp(BOSS_ATTACKS):null;
      o.castles=typeof CASTLE_ISLANDS!=='undefined'?cp(CASTLE_ISLANDS):null; o.mages=typeof MAGE_TOWERS!=='undefined'?cp(MAGE_TOWERS):null;
      o.forge=typeof FORGE_FAMS!=='undefined'?cp(FORGE_FAMS):null; o.asg=typeof ASGARD_FAMS!=='undefined'?cp(ASGARD_FAMS):null;
      o.vr=CHAR_ROSTER.filter(R=>R.cat==='boss').map(R=>({id:R.id,sub:R.sub,where:R.where,doing:R.doing}));
      o.mdefs={}; Object.keys(MDEFS).forEach(k=>{ var M=MDEFS[k]; if(M.boss||/boss|elite|warden|mg_|cw_|isl/.test(k))o.mdefs[k]={name:M.name,hp:M.hp,atk:M.atk,def:M.def,el:M.el||M.element||null,atkType:M.atkType,moveType:M.moveType,kit:M.kit||null,res:M.res||M.resist||null,sovWard:M.sovWard||null,sec:M.sec}; });
      o.desc={}; var slots=new Set(); Object.keys(BOSS_SLOTS||{}).forEach(s=>slots.add(s)); slots.forEach(s=>{ try{ var d=BossAtk.describe(s); if(d)o.desc[s]=d; }catch(e){} });
      o.bars=cp(BOSS_BAR_INFO); o.diff=typeof ZDIFF!=='undefined'?cp(ZDIFF):null;
      return o; })()""")
json.dump(r,open(os.path.join(H,'boss_today.json'),'w'),ensure_ascii=False,indent=1)
print({k:(len(v) if hasattr(v,'__len__') else v) for k,v in r.items()})
print(list(r['phases'].keys()))
