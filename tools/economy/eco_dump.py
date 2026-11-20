"""Round 119: dump the live economy (items, monsters, sites, camps, quests, recipes) → sprites/requests/economy_dump.json.
python tools/economy/eco_dump.py   (after node build.mjs), then python tools/economy/eco_model.py"""
import sys, os, json; sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tests'))
from harness import game
JS = r"""(()=>{ var ws=game.scene.getScene('World'), wd=ws.wd, ps=ws.playerState, o={};
 var shopOf=function(it){ for(var b in BUILDING_SLOTS){ try{ if(BUILDING_SLOTS[b](it))return b; }catch(e){} } return null; };
 o.items=Object.keys(ITEMS).filter(function(k){ return k.indexOf('~')<0; }).map(function(k){ var it=ITEMS[k];
   return {id:k,name:it.name,slot:it.slot||null,type:it.type||null,buy:it.buy||0,sell:it.sell||0,goldVal:it.goldVal||0,secReq:it.secReq||0,atk:it.atk||0,def:it.def||0,mag:it.mag||it.magic||0,hp:it.hp||it.heal||0,rare:!!(it.rare||it.unique),cls:it.cls||null,shop:shopOf(it),el:it.el||it.gemEl||null,qty:it.qty||0,pot:it.pot?it.pot.g:null}; });
 o.roster=MON_ROSTER.map(function(R){ var s=MX.stats(R); return {id:R.id,name:R.name,q:R.q,seg:R.seg,role:R.role,tier:R.tier,boss:!!R.boss,hp:s.hp,atk:s.atk,def:s.def,xp:s.xp,gMin:s.gMin,gMax:s.gMax,lv:s.lv}; });
 var bySec={}; ws.worldMonsters.forEach(function(m){ var s=m.section||0, B=bySec[s]||(bySec[s]={n:0,hp:0,g:0,xp:0,lv:0,alpha:0,elite:0,boss:0,atk:0}); B.n++; B.hp+=m.def.hp; B.g+=(m.def.gMin+m.def.gMax)/2*0.33; B.xp+=m.def.xp*0.33; B.lv+=m.level||0; B.atk+=m.def.atk; if(m.alpha)B.alpha++; if(m.def.elite)B.elite++; if(m.isBoss||m.def.boss)B.boss++; });
 o.worldMon=bySec;
 o.sites=wd.sites.map(function(s){ return {id:s.id,type:s.type,sec:s.section,boss:!!s.boss,bonus:!!s.bonus,floors:s.floors,name:s.name,castle:s.castle||null,isl:s.island||null}; });
 o.caches=wd.caches.map(function(c){ return c.region; });
 o.camps=(ws._camps||[]).map(function(c){ return {sec:c.sec||c.section||c.q,type:c.type&&c.type.id||c.id||c.tid}; });
 o.campTypes=CAMP_TYPES; o.campRespawn=CAMP_RESPAWN_S;
 o.castles=Object.keys(CASTLE_ISLANDS).map(function(k){ var C=CASTLE_ISLANDS[k]; return {key:k,sec:C.sec,floors:C.floors,name:C.name}; });
 o.mages=MAGE_TOWERS.map(function(M){ return {key:M[0],q:M[1],name:M[2]}; });
 o.quests=(ZNPCQ.LIST||ZNPCQ.Q||[]).map?((ZNPCQ.LIST||ZNPCQ.Q||[]).map(function(q){ return {id:q.id,giver:q.giver,name:q.name,reward:q.reward||null,choice:q.choice?q.choice.map(function(c){return c.rw;}):null,steps:q.steps.map(function(s){ return {k:s.k,each:s.each||null,n:(s.items||[]).length}; }),r:q.realm||q.r||null}; })):Object.keys(ZNPCQ).join(',');
 o.craft=CRAFT_RECIPES; o.apo=ZAPO.CRAFT; o.mounts=MOUNTS; o.bossRewards=BOSS_REWARDS;
 o.ps={gold:ps.gold,atk:ps.atk,maxHp:ps.maxHp,level:ps.level};
 o.mainQuests=Object.keys(MAIN_QUEST_DEFS);
 o.wells=null;
 return o; })()"""
with game() as g:
    g.wait(3500)
    r = g.js(JS)
    json.dump(r, open('sprites/requests/economy_dump.json', 'w'), indent=0, default=str)
    print({k: (len(v) if hasattr(v, '__len__') else v) for k, v in r.items()})
    print('errs', g.errs[:3])
