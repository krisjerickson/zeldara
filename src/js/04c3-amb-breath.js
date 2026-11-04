// ═══════════════════════════════════════════════════════════════════════
// ║ 04c3-amb-breath.js — round 86c: THE AMBIENCE COMES AND GOES (Kris: "We also have ongoing sound effects, i think it's crickets, that doesn't
// ║ stop. It's OK to have sound effects like this, but they should come in and out, not be constant").
// ║ Every ambience loop now breathes: it plays for a while (25–50 s), fades out over a few seconds, rests (15–35 s), and fades back in — each
// ║ time for a different, random length, so it never settles into a rhythm. The living sounds (night crickets, birds, the marsh's frogs, the
// ║ village) fall silent in the rests; the weather and the places (wind, sea, rain, a cave, a forge, Asgard, the sky) only sink to a murmur.
// ║ Switch: ZAMB.on. Numbers: ZAMB.ON / OFF (seconds), ZAMB.FADE (time constant), ZAMB.LOW.
// ═══════════════════════════════════════════════════════════════════════
var ZAMB={ on:true, ON:[25,50], OFF:[15,35], FADE:1.6,
  LIVING:{am_meadow_day:1,am_meadow_night:1,am_marsh:1,am_village:1,am_lake:1},      // these go quiet; the rest dip to LOW
  LOW:0.3,
  rnd:function(r){ return r[0]+Math.random()*(r[1]-r[0]); },
  tick:function(){ if(typeof ZAUDIO==='undefined')return; var A=ZAUDIO.amb, a=A&&A.g&&A.g.context; if(!A||!a)return; var now=Date.now();
    if(!ZAMB.on){ if(A._zq){ A._zq=0; A.g.gain.setTargetAtTime(1,a.currentTime,ZAMB.FADE); } return; }
    if(!A._zn){ A._zn=now+ZAMB.rnd(ZAMB.ON)*1000; A._zq=0; return; }      // a new loop: let it play first
    if(now<A._zn)return;
    var low=ZAMB.LIVING[ZAUDIO.ambCue]?0.0001:ZAMB.LOW;
    if(!A._zq){ A._zq=1; A.g.gain.setTargetAtTime(low,a.currentTime,ZAMB.FADE); A._zn=now+ZAMB.rnd(ZAMB.OFF)*1000; }
    else { A._zq=0; A.g.gain.setTargetAtTime(1,a.currentTime,ZAMB.FADE*1.4); A._zn=now+ZAMB.rnd(ZAMB.ON)*1000; } }
};
setInterval(function(){ try{ ZAMB.tick(); }catch(e){} },500);
