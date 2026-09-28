// ═══════════════════════════════════════════════════════════════════════
// ║ SPIRIT FAMILIARS + FAIRIES (Phase 4c) — shared by the game and the Lab
// ║ Familiars are glowing elemental spirits (patronus-like): a bright core,
// ║ a translucent body, a luminous rim and drifting motes. 3 designs per
// ║ element; Kris picks one per element in the Lab (FAMILIAR_PICK holds the
// ║ current choice). Each quadrant's island gives its element's familiar:
// ║   Grasslands = grass · Wetlands = water · Highlands = earth · Ashlands = fire
// ║ Fairies (10 designs per quadrant, pick one each) live around runestones
// ║ and teach the familiar its skills.
// ═══════════════════════════════════════════════════════════════════════
var SPIRIT_ELEMENTS={
  grass:{q:1,name:'Grass',col:'#8dffa0',deep:'#2f9a58',core:'#f0fff0',mote:'#c8ffb0'},
  water:{q:2,name:'Water',col:'#80dcff',deep:'#2a78c8',core:'#f0fbff',mote:'#c0f0ff'},
  earth:{q:3,name:'Earth',col:'#f0b870',deep:'#8a5a2a',core:'#fff4e0',mote:'#ffd8a0'},
  fire: {q:4,name:'Fire', col:'#ffa050',deep:'#d0381a',core:'#fff6d0',mote:'#ffd070'}
};
var SPIRIT_DESIGNS=[
  {id:'grove_elder',el:'grass',name:'Grove Elder',body:'tree',move:'follow',sz:1.15,tagline:'A walking spirit tree',blurb:'An ancient tree-spirit that strides behind you on root-legs, leaves of light drifting from its crown.'},
  {id:'thornback_stag',el:'grass',name:'Thornback Stag',body:'stag',move:'follow',sz:1.1,tagline:'A great stag with vine antlers',blurb:'A proud stag of green light, its antlers woven from flowering vines. It trots at your heel and lowers its antlers to charge.'},
  {id:'bloom_moth',el:'grass',name:'Bloom Moth',body:'moth',move:'hover',sz:1,tagline:'A luminous moth of petals',blurb:'A huge moth whose wings are living petals. It flutters around you and scatters glowing pollen.'},
  {id:'tide_serpent',el:'water',name:'Tide Serpent',body:'serpent',move:'hover',sz:1.1,tagline:'A sea dragon that swims through the air',blurb:'A long water-dragon with fin crests that coils through the air around you as if it were the sea.'},
  {id:'sky_whale',el:'water',name:'Spirit Whale',body:'whale',move:'hover',sz:1.05,tagline:'A small sky-whale of moonlit water',blurb:'A gentle whale of glowing water that glides above you, trailing bubbles of light and singing softly.'},
  {id:'mist_kitsune',el:'water',name:'Mist Kitsune',body:'fox',move:'follow',sz:1,tagline:'A fox with tails of flowing water',blurb:'A nimble fox-spirit with three tails of running water. It darts along behind you, leaving ripples in the air.'},
  {id:'stone_colossus',el:'earth',name:'Stone Colossus',body:'golem',move:'follow',sz:1.15,tagline:'A walking mountain of amber light',blurb:'A broad earth-spirit of glowing stone and crystal veins that thuds along behind you and shakes the ground.'},
  {id:'canyon_tortoise',el:'earth',name:'Canyon Tortoise',body:'tortoise',move:'follow',sz:1.1,tagline:'An ancient tortoise carrying a mesa',blurb:'A slow, wise tortoise-spirit whose shell is a tiny glowing mesa with crystal peaks.'},
  {id:'dust_griffin',el:'earth',name:'Dust Griffin',body:'griffin',move:'hover',sz:1.05,tagline:'A griffin of sand and sunstone',blurb:'An eagle-lion of swirling golden dust that circles above you and dives at your foes.'},
  {id:'ember_dragon',el:'fire',name:'Ember Dragon',body:'dragon',move:'hover',sz:1.15,tagline:'A young dragon made of flame',blurb:'A dragon of pure fire with glowing wings, circling you and breathing embers.'},
  {id:'phoenix',el:'fire',name:'Phoenix',body:'phoenix',move:'hover',sz:1.1,tagline:'The firebird reborn',blurb:'A phoenix of gold and crimson flame with a long trailing tail of sparks.'},
  {id:'cinder_wolf',el:'fire',name:'Cinder Wolf',body:'wolf',move:'follow',sz:1.05,tagline:'A wolf with a mane of fire',blurb:'A lean wolf-spirit whose mane and tail are living flames; it runs at your side, leaving burning paw-prints.'}
];
var SPIRIT_BY_ID={}; SPIRIT_DESIGNS.forEach(function(D){ SPIRIT_BY_ID[D.id]=D; });
// current pick per element (Kris chooses in the Lab; the game reads this)
var FAMILIAR_PICK={grass:'grove_elder',water:'tide_serpent',earth:'stone_colossus',fire:'ember_dragon'};

// ── spirit painter: 4 frames of 112×112, drawn around (56,60) facing right ──
function _spGlowFill(x,E,cx,cy,r){ var g=x.createRadialGradient(cx,cy,r*0.08,cx,cy,r); g.addColorStop(0,rgba(E.core,0.8)); g.addColorStop(0.4,rgba(E.col,0.55)); g.addColorStop(1,rgba(E.deep,0.18)); return g; }
function _spShape(x,E,cx,cy,r,draw){ x.save(); x.beginPath(); draw(x); x.closePath(); x.shadowColor=E.col; x.shadowBlur=14; x.fillStyle=_spGlowFill(x,E,cx,cy,r); x.fill(); x.shadowBlur=0; x.lineWidth=1.6; x.strokeStyle=rgba(E.core,0.85); x.stroke(); x.restore(); }
function _spEll(x,E,cx,cy,rx,ry,rot){ _spShape(x,E,cx,cy,Math.max(rx,ry),function(c){ c.ellipse(cx,cy,rx,ry,rot||0,0,Math.PI*2); }); }
function _spPoly(x,E,pts,cx,cy,r){ _spShape(x,E,cx,cy,r,function(c){ c.moveTo(pts[0][0],pts[0][1]); for(var i=1;i<pts.length;i++){ var p=pts[i]; if(p.length===4)c.quadraticCurveTo(p[0],p[1],p[2],p[3]); else c.lineTo(p[0],p[1]); } }); }
function _spLine(x,E,pts,w,a){ x.save(); x.shadowColor=E.col; x.shadowBlur=8; x.strokeStyle=rgba(E.core,a||0.9); x.lineWidth=w; x.lineCap='round'; x.lineJoin='round'; x.beginPath(); x.moveTo(pts[0][0],pts[0][1]); for(var i=1;i<pts.length;i++){ var p=pts[i]; if(p.length===4)x.quadraticCurveTo(p[0],p[1],p[2],p[3]); else x.lineTo(p[0],p[1]); } x.stroke(); x.restore(); }
function _spEye(x,cx,cy,r){ x.save(); x.shadowColor='#ffffff'; x.shadowBlur=6; x.fillStyle='#ffffff'; x.beginPath(); x.arc(cx,cy,r||1.8,0,Math.PI*2); x.fill(); x.restore(); }
function _spMotes(x,E,f,n,cx,cy,spread){ for(var i=0;i<n;i++){ var a=i*2.39+f*0.5, d=(i*7%spread)+6; x.fillStyle=rgba(i%3?E.mote:E.core,0.55+0.35*((i+f)%2)); x.beginPath(); x.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d*0.8,(i%4?1.1:1.8),0,Math.PI*2); x.fill(); } }
var SPIRIT_BODIES={
  tree:function(x,E,f){ var sw=[0,2,0,-2][f];
    _spPoly(x,E,[[48,96],[46,70],[40,64],[47,62],[50,52],[62,52],[65,62],[72,64],[66,70],[64,96],[60,96],[58,74],[54,74],[52,96]],56,74,26);
    _spEll(x,E,56+sw*0.5,34,26,20); _spEll(x,E,40+sw,42,14,11); _spEll(x,E,72+sw,42,14,11); _spEll(x,E,56+sw,20,14,11);
    _spLine(x,E,[[48,96],[40,102+(f%2)*2]],3,0.7); _spLine(x,E,[[64,96],[72,102-(f%2)*2]],3,0.7);
    _spLine(x,E,[[56,70],[56,48],[46,38]],1.5,0.6); _spLine(x,E,[[56,56],[66,40]],1.5,0.6);
    _spEye(x,52,62,1.8); _spEye(x,60,62,1.8); for(var i=0;i<5;i++){ x.fillStyle=rgba(E.mote,0.8); x.beginPath(); x.ellipse(36+i*9+sw,58+((i*13+f*5)%30),2.2,1.2,0.6,0,Math.PI*2); x.fill(); } },
  stag:function(x,E,f){ var l=[[0,0],[3,-3],[0,0],[-3,3]][f];
    _spEll(x,E,52,64,22,12); _spPoly(x,E,[[66,58],[74,40],[82,38],[88,44],[84,48],[76,50],[72,64]],76,50,18);
    [[36,70,l[0]],[44,72,l[1]],[60,72,l[1]],[68,70,l[0]]].forEach(function(g){ _spLine(x,E,[[g[0],g[1]],[g[0]+g[2],96]],3.2,0.85); });
    _spLine(x,E,[[78,38],[74,24],[66,16]],2.4); _spLine(x,E,[[75,28],[82,18],[88,14]],2); _spLine(x,E,[[74,24],[70,12]],1.8); _spLine(x,E,[[82,38],[92,26],[98,24]],2.2); _spLine(x,E,[[92,26],[94,16]],1.8);
    [[66,16],[88,14],[98,24],[70,12]].forEach(function(p){ x.fillStyle=rgba('#ffb0e0',0.9); x.beginPath(); x.arc(p[0],p[1],2.2,0,Math.PI*2); x.fill(); });
    _spLine(x,E,[[30,60],[24,56+(f%2)*3]],2.5,0.7); _spEye(x,82,42,1.6); },
  moth:function(x,E,f){ var w=[1,0.75,0.45,0.75][f];
    _spPoly(x,E,[[56,58],[20,30+(1-w)*18],[14,48],[26,62],[56,62]],36,50,26); _spPoly(x,E,[[56,58],[92,30+(1-w)*18],[98,48],[86,62],[56,62]],76,50,26);
    _spPoly(x,E,[[56,62],[28,68],[24,84*w+60*(1-w)],[40,82],[56,66]],42,72,18); _spPoly(x,E,[[56,62],[84,68],[88,84*w+60*(1-w)],[72,82],[56,66]],70,72,18);
    _spEll(x,E,56,62,5,14); _spLine(x,E,[[54,48],[46,36]],1.3); _spLine(x,E,[[58,48],[66,36]],1.3);
    [[34,46],[78,46],[38,74],[74,74]].forEach(function(p){ x.fillStyle=rgba('#ffe0f0',0.7); x.beginPath(); x.arc(p[0],p[1],3.2*w+1,0,Math.PI*2); x.fill(); }); _spEye(x,54,52,1.2); _spEye(x,58,52,1.2); },
  serpent:function(x,E,f){ var ph=f*Math.PI/2, pts=[]; for(var i=0;i<=10;i++){ var t=i/10; pts.push([14+t*74,62+Math.sin(t*Math.PI*2.2+ph)*13*(1-t*0.4)]); }
    for(var j=0;j<pts.length-1;j++){ var r=4+j*0.9; _spEll(x,E,pts[j][0],pts[j][1],r+2,r); }
    var h=pts[10]; _spPoly(x,E,[[h[0]-4,h[1]-8],[h[0]+14,h[1]-4],[h[0]+18,h[1]+2],[h[0]+6,h[1]+6],[h[0]-4,h[1]+6]],h[0]+6,h[1],14);
    _spPoly(x,E,[[h[0]-2,h[1]-7],[h[0]-10,h[1]-20],[h[0]+4,h[1]-9]],h[0]-3,h[1]-12,9); for(var k=2;k<9;k+=2){ var p=pts[k]; _spPoly(x,E,[[p[0]-3,p[1]-5],[p[0]-1,p[1]-14],[p[0]+4,p[1]-5]],p[0],p[1]-9,6); }
    _spLine(x,E,[[h[0]+14,h[1]+2],[h[0]+26,h[1]+6+(f%2)*3]],1.2,0.7); _spEye(x,h[0]+8,h[1]-2,1.8); },
  whale:function(x,E,f){ var t=[0,3,0,-3][f];
    _spPoly(x,E,[[14,56+t],[26,52],[40,44],[62,42],[84,48],[96,58],[88,70],[64,76],[38,74],[24,64]],58,58,36);
    _spPoly(x,E,[[16,56+t],[4,44+t*2],[10,58],[4,70-t*2],[16,62]],12,58,12); _spPoly(x,E,[[60,72],[52,86],[68,76]],60,78,10);
    x.strokeStyle=rgba(E.core,0.35); x.lineWidth=1; for(var i=0;i<4;i++){ x.beginPath(); x.moveTo(52+i*8,66); x.lineTo(56+i*8,74); x.stroke(); }
    for(var b=0;b<4;b++){ x.strokeStyle=rgba(E.core,0.7); x.beginPath(); x.arc(70+b*5,36-b*6-(f*2)%6,2+b*0.6,0,Math.PI*2); x.stroke(); } _spEye(x,84,56,1.8); },
  fox:function(x,E,f){ var l=[[0,0],[3,-3],[0,0],[-3,3]][f];
    _spEll(x,E,54,66,18,10); _spPoly(x,E,[[66,60],[76,50],[88,52],[94,58],[84,62],[74,68]],80,58,14); _spPoly(x,E,[[74,52],[76,40],[82,50]],77,47,6); _spPoly(x,E,[[80,51],[86,40],[88,53]],84,47,6);
    [[42,72,l[0]],[48,74,l[1]],[60,74,l[1]],[66,72,l[0]]].forEach(function(g){ _spLine(x,E,[[g[0],g[1]],[g[0]+g[2],94]],2.6,0.85); });
    for(var t=0;t<3;t++){ var a=-0.9+t*0.45+Math.sin(f*1.6+t)*0.12; _spPoly(x,E,[[38,62],[38+Math.cos(Math.PI+a)*18,62+Math.sin(Math.PI+a)*18-6],[38+Math.cos(Math.PI+a)*34,62+Math.sin(Math.PI+a)*34-10],[40+Math.cos(Math.PI+a)*20,64+Math.sin(Math.PI+a)*20]],28,54,18); }
    _spEye(x,86,56,1.6); },
  golem:function(x,E,f){ var s=[0,1,0,-1][f];
    _spPoly(x,E,[[38,40],[74,40],[80,56],[76,76],[36,76],[32,56]],56,58,26); _spPoly(x,E,[[46,24],[66,24],[70,38],[42,38]],56,31,14);
    _spPoly(x,E,[[30,42],[20,48],[18,72+s],[28,74+s],[32,56]],25,58,14); _spPoly(x,E,[[82,42],[92,48],[94,72-s],[84,74-s],[80,56]],87,58,14);
    _spPoly(x,E,[[40,76],[38,96+s],[52,96+s],[52,76]],46,86,11); _spPoly(x,E,[[60,76],[60,96-s],[74,96-s],[72,76]],66,86,11);
    x.strokeStyle=rgba('#fff0c0',0.8); x.lineWidth=1.4; x.beginPath(); x.moveTo(46,46); x.lineTo(56,58); x.lineTo(50,70); x.moveTo(66,48); x.lineTo(58,60); x.stroke();
    [[48,32],[64,32]].forEach(function(p){ _spEye(x,p[0],p[1],2.2); }); _spPoly(x,E,[[54,18],[58,8],[62,20]],58,14,6); },
  tortoise:function(x,E,f){ var l=[0,2,0,-2][f];
    _spEll(x,E,52,72,32,14); _spPoly(x,E,[[24,70],[30,52],[42,44],[50,34],[58,42],[66,36],[76,50],[82,70]],52,56,30);
    _spPoly(x,E,[[48,36],[52,22],[56,36]],52,30,8); _spPoly(x,E,[[62,40],[66,28],[70,42]],66,35,7);
    _spPoly(x,E,[[82,66],[92,60],[100,64],[98,72],[86,74]],92,67,10);
    [[28,80,-l],[44,84,l],[62,84,-l],[76,80,l]].forEach(function(g){ _spEll(x,E,g[0]+g[2],g[1]+6,5,5); });
    x.strokeStyle=rgba(E.core,0.4); x.lineWidth=1; x.beginPath(); x.moveTo(34,62); x.lineTo(70,62); x.moveTo(52,46); x.lineTo(52,70); x.stroke(); _spEye(x,94,64,1.6); },
  griffin:function(x,E,f){ var w=[1,0.6,0.2,0.6][f];
    _spPoly(x,E,[[52,58],[22,30+(1-w)*30],[12,40+(1-w)*20],[28,56],[48,64]],32,50,24); _spPoly(x,E,[[60,56],[88,26+(1-w)*30],[98,36+(1-w)*20],[82,54],[64,64]],80,48,24);
    _spEll(x,E,56,64,18,10); _spPoly(x,E,[[70,58],[80,48],[90,50],[98,56],[88,58],[80,64]],84,55,12);
    _spLine(x,E,[[38,64],[24,70],[18,64]],2.4); _spLine(x,E,[[48,72],[46,86]],2.4); _spLine(x,E,[[62,72],[64,86]],2.4); _spEye(x,86,53,1.6); },
  dragon:function(x,E,f){ var w=[1,0.6,0.25,0.6][f];
    _spPoly(x,E,[[48,54],[28,22+(1-w)*28],[14,26+(1-w)*18],[22,42],[10,50],[30,54],[44,62]],30,44,26);
    _spPoly(x,E,[[60,52],[76,20+(1-w)*28],[92,22+(1-w)*18],[86,40],[98,46],[78,54],[64,62]],80,42,26);
    _spEll(x,E,54,62,18,11); _spPoly(x,E,[[66,56],[76,42],[86,40],[96,46],[90,50],[80,52],[74,62]],82,48,14);
    _spPoly(x,E,[[82,40],[86,30],[88,40]],85,36,5); _spPoly(x,E,[[38,64],[24,70],[12,64],[4,70],[16,74],[30,72]],20,68,16);
    _spLine(x,E,[[48,70],[46,84]],2.6); _spLine(x,E,[[60,70],[62,84]],2.6); x.fillStyle=rgba('#fff0a0',0.9); x.beginPath(); x.arc(99,48+(f%2),2.5,0,Math.PI*2); x.fill(); _spEye(x,88,45,1.7); },
  phoenix:function(x,E,f){ var w=[1,0.65,0.3,0.65][f];
    _spPoly(x,E,[[52,54],[24,26+(1-w)*28],[10,30+(1-w)*20],[20,44],[14,54],[36,58],[48,62]],30,46,26);
    _spPoly(x,E,[[60,54],[84,26+(1-w)*28],[98,30+(1-w)*20],[90,44],[96,54],[74,58],[62,62]],78,46,26);
    _spEll(x,E,56,60,10,13); _spEll(x,E,60,44,7,7); _spPoly(x,E,[[66,43],[74,45],[66,47]],69,45,5);
    for(var t=0;t<3;t++)_spPoly(x,E,[[52+t*4,70],[40+t*8,98+Math.sin(f+t)*3],[48+t*8,96],[56+t*4,72]],50+t*6,84,16);
    _spPoly(x,E,[[58,38],[56,26],[62,32],[64,22],[66,34]],61,31,8); _spEye(x,62,43,1.5); },
  wolf:function(x,E,f){ var l=[[0,0],[4,-4],[0,0],[-4,4]][f];
    _spEll(x,E,52,64,22,11); _spPoly(x,E,[[68,58],[78,48],[92,50],[98,58],[88,62],[76,70]],84,58,16); _spPoly(x,E,[[76,50],[78,38],[84,49]],80,45,6); _spPoly(x,E,[[82,49],[88,38],[90,51]],86,45,6);
    [[38,70,l[0]],[46,72,l[1]],[58,72,l[1]],[66,70,l[0]]].forEach(function(g){ _spLine(x,E,[[g[0],g[1]],[g[0]+g[2],94]],3,0.85); });
    _spPoly(x,E,[[62,54],[66,40+(f%2)*2],[70,50],[74,38-(f%2)*2],[76,52]],70,48,10);
    _spPoly(x,E,[[32,60],[18,52+Math.sin(f)*4],[8,40+Math.cos(f)*4],[16,56],[30,66]],20,54,16); _spEye(x,90,54,1.6); }
};
function spiritFrames(D){ if(D._fr)return D._fr; var E=SPIRIT_ELEMENTS[D.el];
  D._fr=[0,1,2,3].map(function(f){ var c=mkCanvas(112,112), x=c.getContext('2d');
    var g=x.createRadialGradient(56,58,4,56,58,54); g.addColorStop(0,rgba(E.col,0.28)); g.addColorStop(1,rgba(E.col,0)); x.fillStyle=g; x.fillRect(0,0,112,112);
    // flowing wisps streaming out behind the spirit (patronus trail)
    x.save(); x.globalCompositeOperation='lighter'; for(var w=0;w<5;w++){ var y0=48+w*6, ph=f*0.8+w; x.strokeStyle=rgba(w%2?E.col:E.mote,0.22+0.06*(w%3)); x.lineWidth=2.5-w*0.3; x.lineCap='round';
      x.beginPath(); x.moveTo(44,y0); x.bezierCurveTo(30,y0+Math.sin(ph)*8,20,y0-Math.cos(ph)*8,4+w*2,y0+Math.sin(ph+1)*6); x.stroke(); } x.restore();
    x.globalCompositeOperation='lighter'; (SPIRIT_BODIES[D.body]||SPIRIT_BODIES.fox)(x,E,f); x.globalCompositeOperation='source-over';
    _spMotes(x,E,f,14,56,60,44); return c; });
  return D._fr; }

// ── fairies: 10 designs per quadrant ──
var FAIRY_DESIGNS=[
  // Grasslands
  ['clover_pixie','Clover Pixie','#8dff8a','#ffe060','leaf','A tiny pixie with four-leaf clover wings and a dandelion hat.'],
  ['bluebell_sprite','Bluebell Sprite','#a0b8ff','#e8e0ff','bell','Wears a bluebell flower as a skirt; rings softly when she flies.'],
  ['thistle_imp','Thistle Imp','#d090ff','#90d070','spiky','A cheeky purple imp with thistle-down hair and moth wings.'],
  ['honey_fae','Honey Fae','#ffd060','#fff0b0','round','A round honey-gold fae with bee-striped wings, trailing sweet light.'],
  ['dew_wisp','Dewdrop Wisp','#b0fff0','#ffffff','drop','A fairy inside a floating dewdrop that glints like glass.'],
  ['acorn_knight','Acorn Knight','#c8a060','#80c050','helm','A brave little knight in an acorn-cap helmet with grass-blade sword.'],
  ['poppy_dancer','Poppy Dancer','#ff6070','#ffd0d0','petal','Twirls in a red poppy dress, scattering petals.'],
  ['meadow_moth','Meadow Moth-fae','#f0e0a0','#a0d080','moth','A soft moth-winged fae with feathery antennae.'],
  ['sunbeam_sylph','Sunbeam Sylph','#fff080','#ffffff','star','Made of a slanting sunbeam; hard to look straight at.'],
  ['rune_pixie','Rune Pixie','#80ffd0','#c0fff0','rune','Glowing runes circle her; she guards the old waystones.'],
  // Wetlands
  ['lily_nymph','Lily Nymph','#f0a0d0','#a0e0c0','petal','Rides a lotus petal; her hair is a waterfall.'],
  ['glowfrog_fae','Glowfrog Fae','#80ff90','#e0ff80','round','A frog-riding fairy with a lantern of swamp light.'],
  ['mist_maiden','Mist Maiden','#c0e0ff','#ffffff','mist','Half made of fog; fades in and out as she speaks.'],
  ['reed_piper','Reed Piper','#a0c070','#e0f0a0','leaf','Plays a reed flute that makes ripples in the air.'],
  ['bubble_sprite','Bubble Sprite','#90e0ff','#ffffff','drop','Lives inside a big soap-bubble that never pops.'],
  ['dragonfly_fae','Dragonfly Fae','#60e0e0','#a0ffb0','moth','Four long dragonfly wings, iridescent teal.'],
  ['moon_lantern','Moon Lantern','#e0e8ff','#ffe8a0','bell','Carries a paper moon lantern across the marsh.'],
  ['kelp_wisp','Kelp Wisp','#50c090','#b0ffd0','spiky','Streaming kelp-ribbon hair that floats as if underwater.'],
  ['pearl_fae','Pearl Fae','#f8f0ff','#c0e0ff','star','Wings of mother-of-pearl, shimmering pink and blue.'],
  ['rain_sprite','Rain Sprite','#80b0ff','#d0e8ff','rune','Brings a tiny rain cloud wherever she goes.'],
  // Highlands
  ['crystal_pixie','Crystal Pixie','#c0a0ff','#ffffff','star','Wings of faceted crystal that throw rainbows.'],
  ['snowflake_fae','Snowflake Fae','#e0f4ff','#ffffff','spiky','Each wing is a perfect snowflake; she leaves frost.'],
  ['ember_moth','Hearth Moth','#ffb060','#fff0c0','moth','A warm moth-fae who keeps the herders\' fires lit.'],
  ['bellflower_sprite','Heather Sprite','#c080e0','#f0d0ff','bell','Wears heather and sings to the mountain goats.'],
  ['gem_gnome_fae','Gem Gnome-fae','#e0a040','#80e0ff','helm','A gnome-fairy in a gem-studded cap, pick-axe in hand.'],
  ['wind_harp_fae','Wind-harp Fae','#a0ffe0','#ffffff','mist','Her wings hum like the wind-harps on the ridges.'],
  ['starfall_sprite','Starfall Sprite','#fff0a0','#a0c0ff','star','Fell from the sky as a shooting star and stayed.'],
  ['moss_hermit','Moss Hermit','#90b070','#d0e0a0','leaf','An old mossy fairy with a lichen beard and walking stick.'],
  ['aurora_fae','Aurora Fae','#80ffc0','#c080ff','rune','Trails ribbons of northern lights.'],
  ['geode_sprite','Geode Sprite','#a060e0','#e0c0ff','round','Lives in a split geode that opens like a clam.'],
  // Ashlands
  ['cinder_pixie','Cinder Pixie','#ff8040','#ffd060','spiky','Hair of flickering flame, wings of cooling ash.'],
  ['obsidian_fae','Obsidian Fae','#302838','#ff6040','star','Wings of black glass with glowing lava veins.'],
  ['ash_moth','Ash Moth-fae','#b8b0a8','#ff9060','moth','Grey ash-wings that glow orange at the edges.'],
  ['salamander_rider','Salamander Rider','#ff6030','#ffe080','round','Rides a tiny salamander through the embers.'],
  ['smoke_wisp','Smoke Wisp','#a0a0b0','#ffe0c0','mist','Made of curling smoke with two bright ember eyes.'],
  ['phoenix_chick','Phoenix Chick-fae','#ffc040','#ff5020','petal','A fairy who hatched from a phoenix egg; very proud.'],
  ['lava_lantern','Lava Lantern','#ff7030','#fff0a0','bell','Carries a lantern of molten rock.'],
  ['sulfur_sprite','Sulfur Sprite','#f0e040','#fff8b0','drop','Yellow, fizzy and smells faintly of eggs; very friendly.'],
  ['ember_knight','Ember Knight','#d05030','#ffc060','helm','A tiny knight in blackened armour with a flame sword.'],
  ['rune_flame','Rune Flame','#ff9060','#ffe0a0','rune','Burning runes orbit her; she guards the ember channels.']
].map(function(a,i){ return {id:a[0],name:a[1],col:a[2],col2:a[3],style:a[4],look:a[5],q:1+Math.floor(i/10)}; });
var FAIRY_BY_ID={}; FAIRY_DESIGNS.forEach(function(F){ FAIRY_BY_ID[F.id]=F; });
var FAIRY_PICK={1:'clover_pixie',2:'lily_nymph',3:'crystal_pixie',4:'cinder_pixie'};
function fairyFrames(F){ if(F._fr)return F._fr;
  F._fr=[0,1,2,3].map(function(f){ var c=mkCanvas(48,48), x=c.getContext('2d'), cx=24, cy=24+[0,-1,-2,-1][f], w=[1,0.7,0.35,0.7][f];
    var g=x.createRadialGradient(cx,cy,1,cx,cy,22); g.addColorStop(0,rgba(F.col,0.5)); g.addColorStop(1,rgba(F.col,0)); x.fillStyle=g; x.fillRect(0,0,48,48);
    // wings
    x.save(); x.globalAlpha=0.7; x.fillStyle=rgba(F.col2,0.75); x.strokeStyle=rgba('#ffffff',0.8); x.lineWidth=0.8;
    var wing=function(sx,top){ x.beginPath(); x.ellipse(cx+sx*6*w,cy-(top?5:-1),(top?9:6)*w+1.5,top?5:3.5,sx*(top?-0.5:0.4),0,Math.PI*2); x.fill(); x.stroke(); };
    if(F.style==='moth'){ x.beginPath(); x.moveTo(cx,cy-2); x.lineTo(cx-14*w,cy-10); x.lineTo(cx-12*w,cy+4); x.closePath(); x.moveTo(cx,cy-2); x.lineTo(cx+14*w,cy-10); x.lineTo(cx+12*w,cy+4); x.closePath(); x.fill(); x.stroke(); }
    else { wing(-1,true); wing(1,true); wing(-1,false); wing(1,false); } x.restore();
    // body
    x.fillStyle=F.col; x.beginPath(); x.ellipse(cx,cy+3,3,5,0,0,Math.PI*2); x.fill();
    if(F.style==='bell'||F.style==='petal'){ x.fillStyle=F.col2; x.beginPath(); x.moveTo(cx-5,cy+8); x.quadraticCurveTo(cx,cy-1,cx+5,cy+8); x.closePath(); x.fill(); }
    x.fillStyle='#ffe8d8'; x.beginPath(); x.arc(cx,cy-3,3,0,Math.PI*2); x.fill();
    if(F.style==='helm'){ x.fillStyle=F.col; x.beginPath(); x.arc(cx,cy-4,3.4,Math.PI,0); x.fill(); }
    else if(F.style==='spiky'){ x.fillStyle=F.col; for(var s=-2;s<=2;s++){ x.beginPath(); x.moveTo(cx+s*1.5-1,cy-5); x.lineTo(cx+s*2,cy-9-Math.abs(s)*0.5); x.lineTo(cx+s*1.5+1,cy-5); x.fill(); } }
    else if(F.style==='leaf'){ x.fillStyle='#70c050'; x.beginPath(); x.ellipse(cx+1,cy-7,3,1.6,-0.4,0,Math.PI*2); x.fill(); }
    else { x.fillStyle=F.col; x.fillRect(cx-3,cy-6,6,2); }
    x.fillStyle='#2a1a3a'; x.fillRect(cx-1.5,cy-3.5,1,1); x.fillRect(cx+0.5,cy-3.5,1,1);
    if(F.style==='drop'){ x.strokeStyle=rgba('#ffffff',0.6); x.lineWidth=1; x.beginPath(); x.arc(cx,cy,11,0,Math.PI*2); x.stroke(); }
    if(F.style==='rune'){ x.fillStyle=F.col2; for(var r=0;r<5;r++){ var a=r*1.26+f*0.4; x.fillRect(cx+Math.cos(a)*13-1,cy+Math.sin(a)*9-1,2,3); } }
    if(F.style==='star'){ x.fillStyle='#ffffff'; for(var st=0;st<4;st++){ var a2=st*1.57+f*0.3; x.fillRect(cx+Math.cos(a2)*12,cy+Math.sin(a2)*12,1.5,1.5); } }
    if(F.style==='mist'){ x.fillStyle=rgba(F.col2,0.35); for(var m=0;m<4;m++){ x.beginPath(); x.arc(cx-6+m*4,cy+10+(m%2)*2,3,0,Math.PI*2); x.fill(); } }
    for(var k=0;k<5;k++){ x.fillStyle=rgba('#ffffff',0.8); x.fillRect(cx-10+((k*9+f*3)%20),cy+8+((k*5+f*2)%10),1,1); }
    return c; });
  return F._fr; }
// the fairy king (Wetlands, Highlands, Ashlands) — a crowned fairy three times the size
function fairyKingFrames(q){ var key='_kfr'+q; if(fairyKingFrames[key])return fairyKingFrames[key]; var F=FAIRY_BY_ID[FAIRY_PICK[q]]||FAIRY_DESIGNS[(q-1)*10];
  fairyKingFrames[key]=fairyFrames(F).map(function(fr,i){ var c=mkCanvas(96,104), x=c.getContext('2d'); x.imageSmoothingEnabled=true; x.drawImage(fr,0,8,96,96);
    x.fillStyle='#ffd84a'; x.beginPath(); x.moveTo(38,28); x.lineTo(40,18); x.lineTo(44,24); x.lineTo(48,14); x.lineTo(52,24); x.lineTo(56,18); x.lineTo(58,28); x.closePath(); x.fill(); x.strokeStyle='#fff6c0'; x.lineWidth=1; x.stroke();
    x.fillStyle='#ff5070'; x.beginPath(); x.arc(48,24,1.8,0,Math.PI*2); x.fill(); return c; });
  return fairyKingFrames[key]; }

// ── familiar trial ideas (Kris picks which to use; ★ = playable now) ──
var FAMILIAR_TRIALS=[
  {id:'rune_targets',name:'Rune Target Practice',ok:true,text:'Glowing rune targets pop up around the fairy\'s stone. Lead your familiar close to each one so it strikes it before it fades. Hit 8 in time.'},
  {id:'guardian',name:'Guard the Runestone',ok:true,text:'Shadow wisps pour out of the ground and rush the fairy\'s runestone. You and your familiar keep them off it for 40 seconds.'},
  {id:'echo_path',name:'Echo Path',ok:true,text:'Rune tiles around the stone light up in a sequence. Your familiar shows the order; walk the tiles in the same order (4, then 5, then 6 steps).'},
  {id:'orb_harvest',name:'Element Harvest',ok:true,text:'Orbs of all four elements drift around the circle. Collect the ones that match your familiar\'s element (it glows when one is near) and avoid the others.'},
  {id:'hold_circle',name:'Hold the Circle',ok:true,text:'Stand inside a shrinking rune circle for 30 seconds while monsters close in; your familiar\'s skills have to keep them out.'},
  {id:'shadow_duel',name:'Shadow Duel',ok:true,text:'A shadow copy of your familiar steps out of the stone and fights you both. Beat it (used for the Fairy King\'s trial).'},
  {id:'light_stones',name:'Light the Stones',ok:false,text:'Carry your familiar\'s glow to five dark standing stones around the zone before the light runs out (a race across the map).'},
  {id:'sprite_tag',name:'Catch the Trickster',ok:false,text:'A mischievous sprite blinks from place to place. Get close to it five times — your familiar sniffs out where it will appear next.'},
  {id:'rune_lock',name:'Rune Lock Puzzle',ok:false,text:'Rotate four rune stones so their symbols match the pattern your familiar draws in the air.'},
  {id:'escort',name:'Escort the Seedling',ok:false,text:'A glowing seedling walks slowly to the next rune space; you and your familiar protect it on the way.'}
];
var FAMILIAR_TRIAL_PICK=['rune_targets','echo_path','orb_harvest','guardian','hold_circle'];   // fairy 1…5 of each quadrant

// familiar skills by element (base + 5 fairy lessons)
// skills: [base, lv2 … lv6]. kind: proj | nova | heal | ward | rain | aura | wave | laststand
var FAM_SKILLS={
  grass:[
    {name:'Thorn Dart',kind:'proj',cd:2.4,dmg:7,range:260,fx:'root',t:0.6,text:'Fires a thorn at the nearest enemy; it roots them for a moment.'},
    {name:'Healing Bloom',kind:'heal',cd:9,pct:0.06,text:'A flower of light opens at your feet and heals you 6% of your max health.'},
    {name:'Vine Snare',kind:'nova',cd:8,dmg:6,radius:110,fx:'root',t:2,text:'Vines burst from the ground around you and hold every enemy nearby for 2 s.'},
    {name:'Spore Cloud',kind:'nova',cd:7,dmg:4,radius:95,fx:'poison',t:4,text:'Releases glowing spores that poison enemies around you for 4 s.'},
    {name:'Bark Ward',kind:'ward',cd:18,text:'A shell of living bark blocks the next hit you take (recharges in 18 s).'},
    {name:'Wild Growth',kind:'nova',cd:14,dmg:18,radius:150,fx:'root',t:1.5,heal:0.1,text:'The meadow rises: heavy damage to every enemy around you, roots them, and heals you 10%.'}],
  water:[
    {name:'Water Bolt',kind:'proj',cd:2.2,dmg:7,range:270,fx:'slow',t:2,text:'A bolt of water that slows the target by 40%.'},
    {name:'Tide Ward',kind:'ward',cd:20,text:'A bubble blocks the next hit you take (recharges in 20 s).'},
    {name:'Whirlpool',kind:'nova',cd:8,dmg:6,radius:130,fx:'pull',text:'A whirlpool drags nearby enemies in toward you and hurts them.'},
    {name:'Frost Lance',kind:'proj',cd:5,dmg:12,range:320,fx:'freeze',t:1.2,pierce:true,text:'A lance of ice that pierces a line of enemies and freezes them.'},
    {name:'Rain of Renewal',kind:'heal',cd:22,pct:0.03,ticks:5,text:'Soft rain heals you 3% every second for 5 s.'},
    {name:'Tidal Wave',kind:'wave',cd:13,dmg:20,len:220,wid:70,fx:'push',text:'A great wave rolls out where you face, crushing and pushing back everything in its path.'}],
  earth:[
    {name:'Stone Shard',kind:'proj',cd:2.6,dmg:9,range:240,fx:'knock',text:'Hurls a shard of stone that knocks the target back.'},
    {name:'Stone Skin',kind:'ward',cd:14,text:'Your skin turns to stone: blocks the next hit (recharges in 14 s).'},
    {name:'Quake',kind:'nova',cd:9,dmg:9,radius:115,fx:'stun',t:1.2,text:'Stamps the ground: enemies nearby are stunned.'},
    {name:'Boulder Toss',kind:'rain',cd:7,dmg:16,n:1,rad:55,range:280,text:'Lobs a boulder that smashes a group of enemies.'},
    {name:'Crystal Spikes',kind:'nova',cd:10,dmg:14,radius:140,fx:'slow',t:2,text:'A ring of crystal spikes erupts around you, hurting and slowing enemies.'},
    {name:'Avalanche',kind:'rain',cd:15,dmg:22,n:5,rad:50,range:300,text:'Five boulders thunder down on the enemies around you.'}],
  fire:[
    {name:'Ember Bolt',kind:'proj',cd:2.2,dmg:8,range:260,fx:'burn',t:3,text:'Spits an ember that sets the target on fire.'},
    {name:'Flame Aura',kind:'aura',cd:1,dmg:3,radius:70,text:'Enemies that come close burn every second.'},
    {name:'Fireball',kind:'proj',cd:6,dmg:14,range:300,fx:'splash',rad:70,text:'A fireball that explodes, burning everything around the target.'},
    {name:'Blaze Dash',kind:'wave',cd:9,dmg:14,len:200,wid:40,fx:'burn',text:'Your familiar streaks forward in a line of fire, burning everything it passes.'},
    {name:'Rekindle',kind:'laststand',cd:40,pct:0.3,text:'When you fall below 30% health, flames close your wounds for 30% of your max health (once every 40 s).'},
    {name:'Inferno',kind:'nova',cd:16,dmg:26,radius:170,fx:'burn',t:4,text:'A pillar of fire engulfs everything around you.'}]
};
