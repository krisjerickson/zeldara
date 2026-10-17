// ═══ round 62: the einherjar and the Gjallar Warden — their kits (roster in 07q6-roster-asgard.js) ═══
MKIT('einherjar_berserker','charge wind=0.6 mult=2.8 stun=0.6 kb=60 | sweep r=62 arc=2.8 m=1.15 cd=2.4 | enrage');
MKIT('einherjar_shieldmaiden','guard r=160 | front red=0.7 | lunge r=110 m=1.1 cd=3');
MKIT('einherjar_archer','kite range=210 | shoot p=arrow n=1 spd=280 m=0.8 cd=1.8 | shoot p=arrow n=3 sp=0.25 spd=240 m=0.6 cd=4.5');
MKIT('gjallar_warden','lumber | ring spd=120 max=170 gap=1 col=#fff0b0 m=0.5 cd=5 | slam r=66 m=1.3 cd=3 | armor n=99 red=0.5');
if(typeof MON_EL!=='undefined')Object.assign(MON_EL,{einherjar_berserker:['storm','shadow'],einherjar_shieldmaiden:['earth','storm'],einherjar_archer:['storm','water'],gjallar_warden:['earth','storm']});
