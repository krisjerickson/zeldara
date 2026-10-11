// ═══════════════════════════════════════════════════════════════════════
// ║ 10n-critters.js — the terrain's animals as little actors (round 43, Kris: "Animals don't look natural right now, as birds,
// ║ dragonflies, butterflies don't move by flapping wings. Let's get this corrected so they move more natural").
// ║ They were particles flying in straight lines. Now each one has its own way of moving:
// ║   butterfly  flutters along a wandering path, bobbing, and now and then settles to rest with slow wingbeats
// ║   dragonfly  hovers in place with blurred wings, then darts to a new spot and stops dead
// ║   gull       glides in wide curves, a few strong flaps, then glides again; its shadow passes over the ground
// ║   crow       like the gull but flaps more and turns sharper
// ║   crab       scuttles sideways in short bursts, then waits
// ║   frog       sits, then hops in an arc (squashes as it lands)
// ║   fish       leaps out of the lake in an arc, turning nose-down, with a ring where it leaves and where it falls back
// ║ Wings: the painted frames (wave 43, 05d ZWE.animTex) when they are in; until then the picture is narrowed and widened
// ║ (a bird or insect seen from above, its wings coming up and going down). All painted flyers face up (north).
// ║ Where they live: the chunk's lists from 05d _cells (wet sand, lake edge, deep water, banks, meadows, sky). How many: ZWE.LOOK.crit.
// ═══════════════════════════════════════════════════════════════════════
var ZCRIT={
  KINDS:{ butterflies:{id:'ed_butterfly',n:3,fly:1,k:0.8}, dragonflies:{id:'ed_dragonfly',n:3,fly:1,k:0.75}, gulls:{id:'ed_gull',n:1,fly:2,k:0.9}, birds:{id:'ed_crow',n:1,fly:2,k:0.9},
    crabs:{id:'ed_crab',n:3,k:0.9}, frogs:{id:'ed_frog',n:3,k:0.9}, fish:{id:'ed_fish',n:2,k:0.8} },
  R:function(a,b){ return a+Math.random()*(b-a); },
  // the picture of a kind: {key, frames (n), ox, oy, s (scale), fh (frame height, world px)}
  look:function(scene,f){ var K=ZCRIT.KINDS[f], A=typeof ZWE!=='undefined'?ZWE.animTex(scene,ZWE.CRITANIM[f]):null;
    if(A){ var oy=K.fly||f==='fish'?Math.max(0,A.oy-(A.h/2)/A.fh):A.oy; return {key:A.key,n:A.n,ox:A.ox,oy:oy,s:A.scale*K.k,frame:'0'}; }
    var T=ZScn.texture(scene,K.id,0,{shadow:false}); if(!T)return null; var th=scene.textures.get(T.key).getSourceImage().height/ZScn.RES;
    return {key:T.key,n:0,ox:0.5,oy:K.fly||f==='fish'?0.5-2.5/th:(th-5)/th,s:T.scale*K.k,frame:undefined}; },
  shadowTex:function(scene){ if(scene.textures.exists('zcrit_sh'))return 'zcrit_sh'; var c=document.createElement('canvas'); c.width=48; c.height=20; var g=c.getContext('2d'), r=g.createRadialGradient(24,10,0,24,10,22);
    r.addColorStop(0,'rgba(0,0,0,.55)'); r.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=r; g.scale(1,0.42); g.beginPath(); g.arc(24,24,22,0,6.3); g.fill(); scene.textures.addCanvas('zcrit_sh',c); return 'zcrit_sh'; }
};
Object.assign(WorldScene.prototype,{
  // called by _wrMount: the animals of one chunk (o.zfx lists, world px) → objs (destroyed with the chunk); returns the list for the tick
  _zcMount(o,objs){ var Z=o.zfx; if(!Z||typeof ZWE==='undefined')return null; var self=this, L=[], ck=ZWE.LOOK.crit||1, R=ZCRIT.R, sh=ZCRIT.shadowTex(this);
    Object.keys(ZCRIT.KINDS).forEach(function(f){ var pts=Z[f]; if(!pts||!pts.length)return; var K=ZCRIT.KINDS[f], lk=ZCRIT.look(self,f); if(!lk)return;
      var n=Math.max(f==='gulls'||f==='birds'?1:0,Math.round(K.n*ck*Math.min(1,pts.length/6))); if(!n&&Math.random()<K.n*ck/2)n=1;
      for(var i=0;i<n;i++){ var p=pts[(Math.random()*pts.length)|0], c={f:f,K:K,lk:lk,x:p[0],y:p[1],hx:p[0],hy:p[1],z:K.fly===2?R(70,110):K.fly?R(14,24):0,h:R(0,6.28),v:0,st:'go',t:R(0.2,2),ph:R(0,6.28),fl:0,dir:Math.random()<0.5?-1:1,pts:pts};
        c.im=self.add.image(c.x,c.y-c.z,lk.key,lk.frame).setOrigin(lk.ox,lk.oy).setScale(lk.s); if(f==='fish')c.im.setVisible(false);
        if(K.fly){ c.sh=self.add.image(c.x,c.y,sh).setDepth(-6.5).setAlpha(K.fly===2?0.18:0.3).setScale(K.fly===2?1.1:0.45); objs.push(c.sh); }
        c.im.setDepth(K.fly===2?9000:K.fly?WR_DEPTH(c.y+40):WR_DEPTH(c.y)); objs.push(c.im); L.push(c); } });
    return L.length?L:null; },
  // one step for every animal of the mounted chunks
  _zcTick(dt){ if(!this._wr)return; var self=this, t=(this._zcT=(this._zcT||0)+dt), R=ZCRIT.R, cam=this.cameras.main.worldView;
    if(dt>0.1)dt=0.1;
    this._wr.chunks.forEach(function(ch){ if(!ch.crit||ch._off)return; for(var q=0;q<ch.crit.length;q++){ var c=ch.crit[q]; if(c.x<cam.x-300||c.x>cam.right+300||c.y<cam.y-300||c.y>cam.bottom+300)continue; self._zcStep(c,dt,t); } }); },
  _zcStep(c,dt,t){ var R=ZCRIT.R, im=c.im, lk=c.lk, s=lk.s, f=c.f; c.t-=dt;
    var flapTo=function(open){ if(lk.n>1){ var fi=Math.max(0,Math.min(lk.n-1,Math.round((1-open)*(lk.n-1)))); im.setFrame(String(fi)); im.setScale(s); } else im.setScale(s*(0.22+0.78*open),s); };      // open: 1 = wings spread, 0 = wings folded / at the far end of the beat
    var cycle=function(rate){ c.ph+=dt*rate*6.283; if(lk.n>1){ im.setFrame(String(Math.floor(c.ph/6.283*lk.n)%lk.n)); im.setScale(s); return null; } return Math.abs(Math.cos(c.ph/2)); };
    var leash=function(r,turn){ var dx=c.hx-c.x, dy=c.hy-c.y, d=Math.hypot(dx,dy); if(d>r){ var want=Math.atan2(dy,dx), dh=((want-c.h+Math.PI*3)%(Math.PI*2))-Math.PI; c.h+=Math.max(-turn*dt,Math.min(turn*dt,dh)); } };
    if(f==='butterflies'){
      if(c.st==='rest'){ c.z=Math.max(2,c.z-dt*20); var o=0.5+0.5*Math.cos(t*2.2+c.ph); if(lk.n>1){ im.setFrame(String(o>0.5?0:Math.min(lk.n-1,2))); im.setScale(s); } else im.setScale(s*(0.3+0.7*o),s); if(c.t<=0){ c.st='go'; c.t=R(3,7); } }
      else { c.h+=R(-4,4)*dt*1.6; leash(80,3); var sp=26; c.x+=Math.cos(c.h)*sp*dt; c.y+=Math.sin(c.h)*sp*dt; c.z=16+6*Math.sin(t*3.1+c.ph)+3*Math.sin(t*7.3+c.ph); var op=cycle(9); if(op!==null)flapTo(op);
        if(c.t<=0){ if(Math.random()<0.35){ c.st='rest'; c.t=R(1.5,3.5); } else c.t=R(2,5); } }
      im.setRotation(c.h+Math.PI/2+Math.sin(t*5+c.ph)*0.25); }
    else if(f==='dragonflies'){
      if(c.st==='dart'){ var sp2=170; c.x+=Math.cos(c.h)*sp2*dt; c.y+=Math.sin(c.h)*sp2*dt; if(c.t<=0){ c.st='hover'; c.t=R(0.8,2.6); } }
      else { c.x+=Math.sin(t*9+c.ph)*dt*6; c.y+=Math.cos(t*7+c.ph)*dt*5; if(c.t<=0){ var a=Math.random()*6.283, d=R(40,110), tx=c.hx+Math.cos(a)*d*0.6, ty=c.hy+Math.sin(a)*d*0.4; c.h=Math.atan2(ty-c.y,tx-c.x); c.st='dart'; c.t=Math.hypot(tx-c.x,ty-c.y)/170; } }
      c.z=20+2*Math.sin(t*4+c.ph); var op2=cycle(lk.n>1?20:0); if(op2!==null)im.setScale(s*(0.82+0.18*Math.abs(Math.sin(t*60+c.ph))),s); im.setRotation(c.h+Math.PI/2); }
    else if(f==='gulls'||f==='birds'){ var crow=f==='birds';
      c.h+=Math.sin(t*(crow?0.5:0.3)+c.ph)*dt*(crow?0.9:0.55); leash(crow?420:520,0.6); var sp3=crow?62:48; c.x+=Math.cos(c.h)*sp3*dt; c.y+=Math.sin(c.h)*sp3*dt;
      if(c.st==='go'){ c.fl+=dt; var op3=cycle(crow?4.2:3); if(op3!==null)flapTo(op3); if(c.fl>(crow?1.6:1.1)){ c.st='glide'; c.fl=0; } }
      else { c.fl+=dt; if(lk.n>1){ im.setFrame('0'); im.setScale(s); } else im.setScale(s); if(c.fl>(crow?1:R(2,3.5))){ c.st='go'; c.fl=0; c.ph=0; } }
      c.z=(crow?80:95)+8*Math.sin(t*0.7+c.ph); im.setRotation(c.h+Math.PI/2+(c.st==='glide'?Math.sin(t*1.3+c.ph)*0.08:0)); }
    else if(f==='crabs'){
      if(c.st==='go'){ c.x+=c.dir*34*dt; c.y+=Math.sin(t*3+c.ph)*dt*4; var op4=cycle(10); if(op4!==null)im.setScale(s,s*(0.92+0.08*op4)); if(c.t<=0){ c.st='wait'; c.t=R(0.8,2.6); } }
      else { if(lk.n>1)im.setFrame('1'); im.setScale(s); if(c.t<=0){ c.st='go'; c.t=R(0.3,0.9); c.dir=Math.abs(c.x-c.hx)>30?(c.x>c.hx?-1:1):(Math.random()<0.5?-1:1); } }
      im.setDepth(WR_DEPTH(c.y)); }
    else if(f==='frogs'){
      if(c.st==='hop'){ var u=1-c.t/0.45; c.x+=c.dir*70*dt; c.z=Math.sin(Math.min(1,u)*Math.PI)*14; if(lk.n>1)im.setFrame(String(Math.min(lk.n-1,3))); im.setScale(s*(c.dir<0?-1:1)*(lk.n>1?1:0.9),s*(lk.n>1?1:1.12)); if(c.t<=0){ c.st='land'; c.t=0.12; c.z=0; } }
      else if(c.st==='land'){ im.setScale(s*(c.dir<0?-1:1)*1.12,s*0.85); if(c.t<=0){ c.st='wait'; c.t=R(1.5,4.5); } }
      else { var puff=lk.n>1&&Math.sin(t*2+c.ph)>0.92; if(lk.n>1)im.setFrame(c.t<0.2?String(Math.min(lk.n-1,2)):puff?'1':'0'); im.setScale(s*(c.dir<0?-1:1)*(c.t<0.2&&lk.n<2?1.08:1),s*(c.t<0.2&&lk.n<2?0.9:1));
        if(c.t<=0){ c.st='hop'; c.t=0.45; c.dir=Math.abs(c.x-c.hx)>40?(c.x>c.hx?-1:1):(Math.random()<0.5?-1:1); } }
      im.setDepth(WR_DEPTH(c.y)); }
    else if(f==='fish'){
      if(c.st==='leap'){ var u2=1-c.t/0.9; c.x+=c.dir*48*dt; c.z=Math.sin(u2*Math.PI)*28; im.setVisible(true); if(lk.n>1){ im.setFrame(String(Math.min(lk.n-1,Math.floor(u2*lk.n)))); im.setRotation(0); } else im.setRotation(c.dir*(-0.7+1.6*u2));
        im.setScale(s*c.dir,s); if(c.t<=0){ c.st='under'; c.t=R(2.5,7); im.setVisible(false); this._zcRing(c.x,c.y); } }
      else if(c.t<=0){ var p=c.pts[(Math.random()*c.pts.length)|0]; c.x=p[0]; c.y=p[1]; c.dir=Math.random()<0.5?-1:1; c.st='leap'; c.t=0.9; this._zcRing(c.x,c.y); }
      im.setDepth(-3); }
    im.setPosition(c.x,c.y-c.z); if(c.sh)c.sh.setPosition(c.x+(c.K.fly===2?c.z*0.35:3),c.y+(c.K.fly===2?c.z*0.55:2));
    if(c.K.fly===1)im.setDepth(WR_DEPTH(c.y+40)); },
  _zcRing(x,y){ if(!this.textures.exists('zring'))return; var r=this.add.image(x,y,'zring').setDepth(-8.3).setScale(0.15).setAlpha(0.8); this.tweens.add({targets:r,scale:0.9,alpha:0,duration:900,onComplete:function(){ r.destroy(); }}); }
});
