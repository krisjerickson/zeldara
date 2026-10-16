// ═══ round 60: the forge monsters' kits (roster in 07q5-roster-forges.js) — each its own trick ═══
MKIT('bellows_imp','flit | gust r=150 dist=140 m=0.5 cd=3 | cloud at=player rad=50 st=burn dur=3 cd=5 | tiny c=0.25 | flee');
MKIT('coalback','lumber | aura r=50 m=0.35 st=burn t=2 | armor n=99 red=0.6 | explode r=70 m=0.6 zone=burn zt=4');
MKIT('scald_wraith','drift keep=80 | cloud at=player rad=64 st=burn dur=3 cd=4.5 | shoot p=orb n=3 sp=0.3 spd=170 m=0.5 cd=2.8 | tiny c=0.3 | weak k=fire m=2');
MKIT('quench_golem','lumber | slam r=66 wind=0.6 zone=slip zt=5 m=1.2 cd=3 | front red=0.6 | enrage');
MKIT('slag_crawler','chase s=1.15 | melee m=0.9 | thorns d=1 | split n=2 hp=0.35');
MKIT('ore_hurler','kite range=200 | lob n=3 rad=28 t=1 zone=burn zt=3 col=#ff9040 m=0.7 cd=3 | trap k=snare n=2 cd=6');
MKIT('chain_jailer','guard r=160 | pull r=170 keep=28 m=0.6 cd=4 | sweep r=66 arc=2.4 wind=0.5 m=1.2 cd=2.6 | front red=0.5');
MKIT('ash_banshee','blink every=2.8 d=120 | ring spd=140 max=200 gap=1 col=#ff6040 st=burn m=0.6 cd=3.6 | summon id=ash_moths n=2 max=4 cd=8 | weak k=water m=2');
if(typeof MON_EL!=='undefined')Object.assign(MON_EL,{bellows_imp:['fire'],coalback:['fire','earth'],scald_wraith:['water','fire'],quench_golem:['water','earth'],slag_crawler:['fire','earth'],ore_hurler:['earth','fire'],chain_jailer:['shadow','fire'],ash_banshee:['shadow','fire']});
