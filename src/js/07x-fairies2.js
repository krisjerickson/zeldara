// ═══════════════════════════════════════════════════════════════════════
// ║ FAIRIES v2 (round 5) — 15 new looks per quadrant, every fairy in a
// ║ quadrant looks different, and the Fairy Monarchs are tall, angel-like
// ║ winged beings (3 to choose from in the Wetlands, Highlands, Ashlands).
// ║ Shared with the Design Lab (Fairies + Fairy Monarchs tabs).
// ║ • A v2 design is a recipe: body · wings · hair/hat · held item · aura ·
// ║   colours. fairyFrames() paints any design (the 40 classic looks keep
// ║   their original painter).
// ║ • FAIRY_PICK[q] = the 5 looks used in quadrant q (fairy 1…5, in order);
// ║   FAIRY_MONARCH_PICK[q] = the monarch look (q = 2, 3, 4).
// ═══════════════════════════════════════════════════════════════════════
// recipe: [id, name, body, wings, head, item, aura, skin, main, wing, hair, glow, animal?, look]
var FAIRY_V2=[
 // ── Grasslands ──
 ['bumble_rider','Bumble Rider','rider','dragonfly','acorn','wand','pollen','#f4d0b0','#6a9a3a','#e8f4ff','#7a4a20','#ffe060','bee','A tiny fairy boy in an acorn cap riding a fat, fuzzy bumblebee.'],
 ['dandelion_drifter','Dandelion Drifter','pixie','feather','puff','none','seeds','#f8e0d0','#f4f0d8','#ffffff','#fffff0','#fff8c0',null,'White dandelion-puff hair and downy feather wings; seeds drift off her as she floats.'],
 ['ladybug_knight','Ladybug Knight','knight','beetle','helm','sword','sparks','#f4d0b0','#d02a20','#e04030','#202020','#ff8060',null,'A fearless knight in red-and-black spotted armour, ladybug wing-cases on his back.'],
 ['buttercup_belle','Buttercup Belle','flower','butterfly','flowercrown','none','petals','#f8dcc4','#ffd830','#ffe890','#e8a040','#fff060',null,'Wears an upside-down buttercup as a dress, with lemon butterfly wings.'],
 ['mossbeard_sage','Mossbeard','sage','leaf','beard','staff','leaves','#e8c8a8','#4a7a3a','#8ac860','#e8e8d8','#b0ff90',null,'An ancient fairy sage in a moss robe, beard to his toes, leaning on a sprouting staff.'],
 ['snail_courier','Snail Courier','rider','butterfly','hood','lantern','drops','#f4d0b0','#b07a40','#a0d0ff','#5a3a20','#ffe8a0','snail','Delivers fairy letters by snail — slowly, but it always arrives.'],
 ['clover_imp','Clover Imp','imp','leaf','horns','none','leaves','#8ad070','#3a8a3a','#6ad060','#2a5a2a','#b0ff80',null,'A green, grinning imp with clover-leaf horns and a curly tail.'],
 ['pinwheel_sprite','Pinwheel Sprite','pixie','petal','bun','pinwheel','sparks','#f8dcc4','#60a0ff','#ffd0f0','#ff9040','#c0e0ff',null,'Her pinwheel spins by itself; she follows the windmills\' breeze.'],
 ['honeydrop_orb','Honeydrop','orb','dragonfly','none','none','drops','#ffd060','#ffb020','#fff4c0','#ffb020','#ffd060',null,'A drop of glowing honey with a sleepy face and humming bee wings.'],
 ['hedgehog_rider','Hedgehog Rider','rider','leaf','bob','none','leaves','#f4d0b0','#8a6a4a','#b0e080','#3a2a1a','#ffe0a0','hedgehog','A shy fairy on a hedgehog who rolls into a ball at loud noises.'],
 ['lark_singer','Lark Singer','pixie','feather','long','flute','notes','#f8dcc4','#b08a5a','#e8d0a0','#6a4a2a','#fff0c0',null,'Brown lark-feather wings; her flute can wake a whole meadow.'],
 ['luna_moth_fae','Luna Moth Fae','pixie','moth','antennae','none','stars','#f0e8e0','#a0e0b0','#c8f0c0','#406040','#d0ffe0',null,'Pale green moth wings with moon eye-spots; she only dances at dusk.'],
 ['poppy_bard','Poppy Bard','pixie','butterfly','flowercrown','lute','petals','#f8dcc4','#e03040','#ff8080','#4a2020','#ffb0b0',null,'A red-dressed bard with a tiny lute, singing the meadow\'s old songs.'],
 ['thistle_warden','Thistle Warden','knight','bat','spiky','sword','sparks','#e8d0e0','#8a4ab0','#c090e0','#d0a0ff','#e0b0ff',null,'Purple thistle armour, spiky hair and a needle-sharp blade.'],
 ['glowworm_lamplighter','Lamplighter','rider','dragonfly','hood','lantern','sparks','#f4d0b0','#3a6a4a','#e0fff0','#2a3a2a','#c0ff60','glowworm','Rides a glowing caterpillar through the grass, lighting the paths at night.'],
 // ── Wetlands ──
 ['frog_prince_fae','Frog Prince','rider','dragonfly','tiara','none','bubbles','#f4d0b0','#50a050','#c0fff0','#e8c040','#a0ff90','frog','A crowned fairy prince on his loyal frog steed.'],
 ['lotus_maiden','Lotus Maiden','flower','petal','long','none','drops','#f8e4e0','#ff90c0','#ffd0e8','#80c0a0','#ffc0e0',null,'Blooms from a pink lotus; her hair flows like water.'],
 ['jelly_drifter','Jelly Drifter','jelly','none','none','none','bubbles','#c0f0ff','#60d0e0','#ffffff','#60d0e0','#80f0ff',null,'A glowing jellyfish-fairy that swims through the air, trailing tentacles.'],
 ['heron_quill','Heron Quill','pixie','feather','long','staff','drops','#f4dcc8','#c8d0d8','#ffffff','#304050','#d0e8ff',null,'Tall and graceful, with grey heron wings and a reed spear.'],
 ['mere_mermaid','Mere Mermaid','mermaid','fin','long','shellhorn','bubbles','#f4dcc8','#30b0a0','#90f0e0','#e06030','#80fff0',null,'A little mermaid-fairy with fin-wings, blowing a conch.'],
 ['mangrove_imp','Mangrove Imp','imp','leaf','horns','none','drops','#8a9a60','#4a6a3a','#6a9a4a','#3a2a1a','#a0e080',null,'Root-horned and mud-footed; he knows every channel in the mangroves.'],
 ['dragonfly_lancer','Dragonfly Lancer','knight','dragonfly','helm','sword','sparks','#f4d0b0','#2a9a9a','#a0fff0','#1a3a3a','#80ffe0',null,'Teal-armoured lancer with four shimmering dragonfly wings.'],
 ['bubble_orb','Bubble Orb','orb','bubble','none','none','bubbles','#a0e0ff','#80c8ff','#ffffff','#80c8ff','#c0f0ff',null,'A giggling spark of light inside a soap bubble.'],
 ['willow_weeper','Willow Weeper','sage','leaf','willow','none','drops','#e8d8c8','#5a8a60','#90d0a0','#8ac070','#b0ffc0',null,'Long willow-leaf hair sweeps the water; she sighs gentle rain.'],
 ['newt_rider','Newt Rider','rider','fin','bob','wand','bubbles','#f4d0b0','#ff8040','#ffd0a0','#6a2a10','#ffb080','salamander','Rides an orange spotted newt from pool to pool.'],
 ['cattail_piper','Cattail Piper','pixie','moth','hood','flute','notes','#e8d0b0','#8a6a3a','#d8c090','#4a3a20','#ffe0a0',null,'Plays a cattail pipe; the frogs sing along.'],
 ['moonpool_wisp','Moonpool Wisp','wisp','none','none','none','stars','#e0f0ff','#a0c0ff','#ffffff','#c0d8ff','#d0e8ff',null,'A silver wisp that rises from moonlit pools.'],
 ['kingfisher_scout','Kingfisher Scout','pixie','feather','spiky','bow','sparks','#f4d0b0','#2080d0','#40a0ff','#ff8030','#80c8ff',null,'Electric-blue feather wings and a tiny bow; never misses.'],
 ['turtle_rider','Turtle Rider','rider','petal','bun','none','bubbles','#f4d0b0','#3a8a5a','#c0f0d0','#5a3a2a','#a0ffc0','turtle','An old soul riding an even older turtle.'],
 ['fog_lantern','Fog Lantern','wisp','moth','none','lantern','mist','#d0d8e0','#8898a8','#c8d0d8','#8898a8','#ffe8a0',null,'A wisp of fog carrying a lantern — follow it home, not away.'],
 // ── Highlands ──
 ['quartz_knight','Quartz Knight','knight','crystal','helm','sword','sparks','#f0e0e8','#c0b0ff','#e8e0ff','#806ab0','#e0d0ff',null,'Faceted crystal armour and wings that ring like glass.'],
 ['goat_rider','Goat Rider','rider','feather','hood','none','snow','#f4d0b0','#c8a878','#f0e8d8','#5a3a20','#fff0d0','goat','Scales cliffs on a sure-footed mountain goat.'],
 ['edelweiss_sprite','Edelweiss Sprite','flower','petal','flowercrown','none','snow','#f8e8e0','#f4f4f0','#ffffff','#e0c080','#ffffff',null,'A star-white edelweiss fairy that grows only on the highest ledges.'],
 ['snow_owl_sage','Snow Owl Sage','sage','feather','beard','book','snow','#f0e0d0','#e8eef4','#ffffff','#ffffff','#e0f0ff',null,'Wise and white-feathered; reads star-charts by the light of her book.'],
 ['aurora_dancer','Aurora Dancer','pixie','petal','long','ribbon','stars','#f8e0e0','#60e0c0','#c080ff','#4060c0','#a0ffe0',null,'Twirls ribbons of northern lights across the night sky.'],
 ['geode_golemite','Geodling','crystal','crystal','none','none','sparks','#d0b0ff','#8a50d0','#e0c0ff','#8a50d0','#d0a0ff',null,'A little amethyst golem-fairy — hard outside, sparkly inside.'],
 ['frost_moth','Frost Moth','pixie','moth','antennae','none','snow','#e8f0f8','#a0d0ff','#e0f4ff','#80a8d0','#d0f0ff',null,'Ice-blue moth wings rimed with frost.'],
 ['miner_imp','Miner Imp','imp','bat','minerhelm','pickaxe','sparks','#c8a080','#6a5a4a','#8a7a6a','#2a2020','#ffd080',null,'A soot-faced imp with a candle-helmet, always digging for gems.'],
 ['harp_sylph','Harp Sylph','pixie','feather','bun','harp','notes','#f8e8e0','#e0e8ff','#ffffff','#e0c060','#fff4d0',null,'Plays the wind-harps; the ridges hum her tunes.'],
 ['thunder_imp','Thunder Imp','imp','bat','spiky','none','sparks','#e8e0a0','#f0d030','#fff080','#403010','#fff060',null,'Crackles with static; his hair stands straight up.'],
 ['lichen_hermit','Lichen Hermit','sage','leaf','hood','staff','leaves','#d8c8b0','#8a9a80','#b0c098','#c0c0b0','#d0e0c0',null,'Grey-green and patient as the rocks he lives on.'],
 ['star_orb','Star Orb','orb','crystal','none','none','stars','#fff0c0','#ffe080','#ffffff','#ffe080','#fff4c0',null,'A fallen star, still warm, with crystal wings.'],
 ['eagle_knight','Eagle Knight','knight','feather','helm','staff','sparks','#f4d0b0','#8a6a4a','#c8a070','#e8d8c0','#ffe0a0',null,'Brown eagle wings and a long spear; guards the high passes.'],
 ['icicle_wisp','Icicle Wisp','wisp','crystal','none','none','snow','#e0f8ff','#a0e8ff','#ffffff','#c0f0ff','#e0ffff',null,'A shard of living ice that chimes when it moves.'],
 ['beetle_rider','Beetle Rider','rider','butterfly','acorn','sword','sparks','#f4d0b0','#3a4a6a','#a0c0ff','#2a2030','#a0c8ff','beetle','Charges into battle on a shiny stag beetle.'],
 // ── Ashlands ──
 ['ember_newt_rider','Ember-Newt Rider','rider','flame','spiky','none','embers','#f4c0a0','#e04020','#ffb040','#ff6020','#ff9040','salamander','Rides a red fire-salamander through the ember fields.'],
 ['ember_imp','Ember Imp','imp','bat','horns','none','embers','#e05030','#a02010','#ff6040','#301010','#ff8040',null,'A red, grinning imp who snacks on hot coals.'],
 ['obsidian_knight','Obsidian Knight','knight','crystal','helm','sword','embers','#c0a0a0','#1a1418','#402830','#100808','#ff6030',null,'Black-glass armour cracked with glowing lava veins.'],
 ['phoenix_pixie','Phoenix Pixie','pixie','flame','flamehair','none','embers','#f8d0b0','#ff8020','#ffd040','#ff5010','#ffb040',null,'Hair and wings of living flame; she is reborn every dawn.'],
 ['ash_sage','Ash Sage','sage','moth','hood','staff','ash','#c8b8b0','#6a6060','#a09890','#e0d8d0','#ff9060',null,'A grey-robed sage whose staff holds a never-dying ember.'],
 ['cinder_orb','Cinder Orb','orb','flame','none','none','embers','#ff9040','#ff5010','#ffd060','#ff5010','#ff9040',null,'A floating coal with a cheeky grin and flame wings.'],
 ['magma_jelly','Magma Jelly','jelly','none','none','none','embers','#ffb060','#ff6020','#ffe0a0','#ff6020','#ffa040',null,'A lava-jellyfish that drifts on the heat above the channels.'],
 ['smoke_sprite','Smoke Sprite','wisp','bat','none','none','ash','#606068','#404048','#707078','#404048','#ff8040',null,'Curling black smoke with two bright ember eyes.'],
 ['firefly_lampbearer','Firefly Lampbearer','pixie','dragonfly','bob','lantern','sparks','#f4d0b0','#6a4a3a','#fff0c0','#3a2010','#ffe040',null,'Carries a firefly lantern across the ash at night.'],
 ['sulfur_bloom','Sulfur Bloom','flower','crystal','flowercrown','none','sparks','#fff4a0','#f0e040','#fff8c0','#c0a020','#fff060',null,'A fizzy yellow flower-fairy grown from a sulfur crystal.'],
 ['bat_rider','Bat Rider','rider','none','hood','sword','ash','#e0c0b0','#4a3040','#6a5060','#2a1020','#ff8060','bat','Flies a leathery ash-bat over the burned cathedral.'],
 ['forge_gnome','Forge Gnome','imp','feather','minerhelm','hammer','embers','#e0b090','#8a4a2a','#c07040','#e0e0e0','#ffa040',null,'A bearded forge-gnome fairy with a glowing hammer.'],
 ['ashmoth_queen','Ashmoth','pixie','moth','antennae','none','ash','#e0d0c8','#a09088','#e0a070','#5a4a40','#ff9060',null,'Wide ash-grey moth wings edged in glowing orange.'],
 ['lava_crystal','Lava Crystal','crystal','crystal','none','none','embers','#ffb070','#e06020','#ffc080','#e06020','#ff8040',null,'A shard of cooled lava with a molten heart.'],
 ['cinder_bard','Cinder Bard','pixie','flame','bun','lute','notes','#f4c8a8','#c03020','#ff8030','#301010','#ffa060',null,'Plays a lute strung with fire; the embers dance.']
].map(function(a,i){ return {id:a[0],name:a[1],body:a[2],wings:a[3],head:a[4],item:a[5],aura:a[6],skin:a[7],col:a[8],col2:a[9],hair:a[10],glow:a[11],animal:a[12],look:a[13],q:1+Math.floor(i/15),v2:true}; });
FAIRY_V2.forEach(function(F){ FAIRY_DESIGNS.push(F); FAIRY_BY_ID[F.id]=F; });
FAIRY_DESIGNS.forEach(function(F){ if(!F.v2)F.classic=true; });

// the five looks per quadrant (Kris's Lab picks first, then new designs) — fairy 1…5 in order
FAIRY_PICK={1:['clover_pixie','rune_pixie','bumble_rider','lark_singer','ladybug_knight'],
            2:['rain_sprite','lotus_maiden','frog_prince_fae','jelly_drifter','kingfisher_scout'],
            3:['geode_sprite','snow_owl_sage','quartz_knight','aurora_dancer','goat_rider'],
            4:['phoenix_pixie','ember_newt_rider','obsidian_knight','cinder_orb','ashmoth_queen']};
function _fairyLook(q,i){ var L=FAIRY_PICK[q]||[]; return FAIRY_BY_ID[L[i]]||FAIRY_BY_ID[L[0]]||FAIRY_DESIGNS.find(function(F){ return F.q===q; }); }

// ── v2 painter: 4 frames of 64×64, fairy centred near (32,34) ──
var _FV2={
  wing:function(x,F,type,flap,f){ var c=F.col2, o=F.col, g=F.glow;
    var side=function(fn){ [1,-1].forEach(function(s){ x.save(); x.translate(32,30); x.scale(s*flap,1); fn(s); x.restore(); }); };
    var fill=function(col,a){ x.fillStyle=rgba(col,a); x.fill(); };
    var line=function(col,a,w){ x.strokeStyle=rgba(col,a); x.lineWidth=w||0.8; x.stroke(); };
    x.save(); x.shadowColor=g; x.shadowBlur=6;
    if(type==='butterfly')side(function(){ x.beginPath(); x.moveTo(1,0); x.bezierCurveTo(8,-18,24,-20,22,-6); x.bezierCurveTo(20,0,8,2,1,1); fill(c,0.85); line(o,0.9,1);
        x.beginPath(); x.moveTo(1,2); x.bezierCurveTo(10,4,18,14,11,17); x.bezierCurveTo(6,18,2,10,1,3); fill(shade(c,-0.12),0.85); line(o,0.9,1);
        x.beginPath(); x.arc(14,-8,3,0,Math.PI*2); fill(o,0.75); x.beginPath(); x.arc(14,-8,1.4,0,Math.PI*2); fill('#ffffff',0.9); });
    else if(type==='dragonfly')side(function(){ [[-0.35,19,4.2],[0.25,16,3.6]].forEach(function(w){ x.save(); x.rotate(w[0]); x.beginPath(); x.ellipse(w[1]/2+1,0,w[1]/2+1,w[2],0,0,Math.PI*2); fill(c,0.45); line('#ffffff',0.8,0.7);
        x.beginPath(); x.moveTo(2,0); x.lineTo(w[1],0); line('#ffffff',0.5,0.5); for(var v=4;v<w[1];v+=3){ x.beginPath(); x.moveTo(v,-w[2]*0.8); x.lineTo(v+1,w[2]*0.8); line('#ffffff',0.25,0.4); } x.restore(); }); });
    else if(type==='moth')side(function(){ x.beginPath(); x.moveTo(1,-1); x.bezierCurveTo(10,-16,26,-14,24,-2); x.lineTo(20,4); x.bezierCurveTo(16,14,6,14,1,4); x.closePath(); fill(c,0.9); line(shade(c,-0.3),0.9,1);
        x.beginPath(); x.arc(14,-3,4,0,Math.PI*2); fill(o,0.6); x.beginPath(); x.arc(14,-3,1.8,0,Math.PI*2); fill('#202020',0.7);
        for(var e=0;e<6;e++){ x.beginPath(); x.arc(4+e*3.6,-10+Math.abs(e-2.5)*0.8+ (e>3?4:0),1.1,0,Math.PI*2); fill('#ffffff',0.35); } });
    else if(type==='leaf')side(function(){ x.save(); x.rotate(-0.5); x.beginPath(); x.moveTo(1,0); x.quadraticCurveTo(12,-10,24,0); x.quadraticCurveTo(12,10,1,0); fill(c,0.9); line(shade(c,-0.35),0.9,1); x.beginPath(); x.moveTo(2,0); x.lineTo(22,0); line(shade(c,-0.35),0.8,0.8); for(var v=6;v<20;v+=4){ x.beginPath(); x.moveTo(v,0); x.lineTo(v+3,-4); x.moveTo(v,0); x.lineTo(v+3,4); line(shade(c,-0.3),0.6,0.6); } x.restore();
        x.save(); x.rotate(0.55); x.beginPath(); x.moveTo(1,0); x.quadraticCurveTo(9,-6,16,0); x.quadraticCurveTo(9,6,1,0); fill(shade(c,-0.1),0.9); line(shade(c,-0.35),0.8,0.8); x.restore(); });
    else if(type==='petal')side(function(){ [-0.9,-0.3,0.3].forEach(function(a,i){ x.save(); x.rotate(a); x.beginPath(); x.moveTo(1,0); x.bezierCurveTo(8,-7,18,-6,20,0); x.bezierCurveTo(18,6,8,7,1,0); fill(i%2?c:shade(c,0.12),0.85); line(o,0.6,0.7); x.restore(); }); });
    else if(type==='feather')side(function(){ for(var k=0;k<5;k++){ x.save(); x.rotate(-0.95+k*0.32); x.beginPath(); x.moveTo(1,0); x.quadraticCurveTo(12,-4-k*0.3,22-k*1.5,0); x.quadraticCurveTo(12,3,1,0); fill(k%2?c:shade(c,-0.08),0.95); line(shade(c,-0.35),0.7,0.6); x.beginPath(); x.moveTo(2,0); x.lineTo(20-k*1.5,0); line(shade(c,-0.4),0.5,0.4); x.restore(); } });
    else if(type==='crystal')side(function(){ [[-0.7,20],[-0.15,16],[0.45,12]].forEach(function(w,i){ x.save(); x.rotate(w[0]); x.beginPath(); x.moveTo(1,0); x.lineTo(w[1]*0.45,-4); x.lineTo(w[1],0); x.lineTo(w[1]*0.45,4); x.closePath(); fill(c,0.75); line('#ffffff',0.9,0.8); x.beginPath(); x.moveTo(2,0); x.lineTo(w[1]*0.45,-3); x.lineTo(w[1]*0.7,0); fill('#ffffff',0.35); x.restore(); }); });
    else if(type==='bat')side(function(){ x.beginPath(); x.moveTo(1,-2); x.lineTo(10,-12); x.lineTo(22,-10); x.quadraticCurveTo(20,-4,23,2); x.quadraticCurveTo(17,1,16,6); x.quadraticCurveTo(11,3,8,8); x.quadraticCurveTo(5,3,1,4); x.closePath(); fill(c,0.92); line(shade(c,-0.4),0.9,0.9);
        x.beginPath(); x.moveTo(2,-1); x.lineTo(10,-12); x.moveTo(3,0); x.lineTo(16,4); x.moveTo(3,1); x.lineTo(9,7); line(shade(c,-0.45),0.8,0.8); });
    else if(type==='flame')side(function(s){ var fl=Math.sin(f*1.6+s)*2; x.beginPath(); x.moveTo(1,2); x.bezierCurveTo(6,-4,8,-14+fl,16,-20); x.bezierCurveTo(14,-12,20,-12,24,-14-fl); x.bezierCurveTo(20,-4,24,-2,26,0); x.bezierCurveTo(18,4,10,8,1,4); x.closePath();
        var gr=x.createLinearGradient(0,4,20,-18); gr.addColorStop(0,rgba(o,0.95)); gr.addColorStop(0.6,rgba(c,0.9)); gr.addColorStop(1,rgba('#fff4c0',0.8)); x.fillStyle=gr; x.fill(); });
    else if(type==='bubble')side(function(){ [[10,-6,8],[18,2,5],[7,8,4]].forEach(function(b){ x.beginPath(); x.arc(b[0],b[1],b[2],0,Math.PI*2); fill(c,0.25); line('#ffffff',0.85,0.8); x.beginPath(); x.arc(b[0]-b[2]*0.35,b[1]-b[2]*0.35,b[2]*0.25,0,Math.PI*2); fill('#ffffff',0.8); }); });
    else if(type==='fin')side(function(){ x.beginPath(); x.moveTo(1,0); x.bezierCurveTo(8,-14,20,-16,24,-10); x.quadraticCurveTo(18,-2,22,6); x.bezierCurveTo(14,8,6,6,1,3); x.closePath(); fill(c,0.7); line(o,0.9,0.9); for(var r=0;r<5;r++){ x.beginPath(); x.moveTo(2,1); x.lineTo(22-r,-10+r*4); line(o,0.5,0.6); } });
    else if(type==='beetle')side(function(){ x.save(); x.rotate(0.35); x.beginPath(); x.ellipse(9,-2,10,6.5,-0.2,0,Math.PI*2); fill(o,0.98); line('#200808',0.9,0.9); [[7,-4],[12,0],[5,1]].forEach(function(p){ x.beginPath(); x.arc(p[0],p[1],1.6,0,Math.PI*2); fill('#1a1010',0.95); }); x.restore();
        x.beginPath(); x.ellipse(14,-12,9,3.5,-0.6,0,Math.PI*2); fill('#f0f8ff',0.35); line('#ffffff',0.6,0.6); });
    x.restore(); },
  animal:function(x,F,f,cy){ var a=F.animal, bob=[0,1,0,-1][f], c=F.col;
    var el=function(ex,ey,rx,ry,col,rot){ x.beginPath(); x.ellipse(ex,ey,rx,ry,rot||0,0,Math.PI*2); x.fillStyle=col; x.fill(); };
    var eye=function(ex,ey){ el(ex,ey,1.4,1.4,'#101010'); el(ex+0.4,ey-0.4,0.5,0.5,'#ffffff'); };
    var by=cy+10;
    if(a==='bee'){ [[-0.6,1],[0.6,-1]].forEach(function(w){ x.save(); x.translate(32+w[1]*2,by-6); x.rotate(w[0]+Math.sin(f*2)*0.3); el(0,-5,4,7,rgba('#e8f4ff',0.55)); x.restore(); });
      el(32,by,11,7,'#ffcc20'); x.fillStyle='#2a1a10'; [-4,1,6].forEach(function(s){ x.fillRect(32+s-1,by-6.5,2.5,13); }); el(21,by-1,5,5,'#2a1a10'); eye(19.5,by-2); x.fillStyle='#2a1a10'; x.beginPath(); x.moveTo(43,by); x.lineTo(47,by+1); x.lineTo(43,by+2); x.fill(); }
    else if(a==='snail'){ el(32,by+3,14,3.5,'#c0a080'); el(20,by,3.5,4,'#c0a080'); x.strokeStyle='#8a6a4a'; x.lineWidth=1; x.beginPath(); x.moveTo(19,by-3); x.lineTo(17,by-8); x.moveTo(21,by-3); x.lineTo(22,by-8); x.stroke(); eye(17,by-8); eye(22,by-8);
      el(35,by-3,9,8,'#d08a40'); x.strokeStyle='#8a4a1a'; x.lineWidth=1.3; x.beginPath(); for(var t=0;t<14;t++){ var r=8-t*0.5, an=t*0.9; x.lineTo(35+Math.cos(an)*r,by-3+Math.sin(an)*r*0.95); } x.stroke(); }
    else if(a==='hedgehog'){ el(32,by+1,13,7,'#6a4a30'); x.fillStyle='#4a3020'; for(var s=0;s<12;s++){ var an2=Math.PI+s/11*Math.PI; x.beginPath(); x.moveTo(32+Math.cos(an2)*9,by+1+Math.sin(an2)*5); x.lineTo(32+Math.cos(an2)*16,by+1+Math.sin(an2)*10); x.lineTo(32+Math.cos(an2+0.14)*9,by+1+Math.sin(an2+0.14)*5); x.fill(); }
      el(20,by+2,5,4,'#e0c0a0'); el(16,by+2,1.6,1.4,'#201010'); eye(20,by); }
    else if(a==='glowworm'){ for(var k=5;k>=0;k--){ el(22+k*4.5,by+Math.sin(f+k)*1.2,4.2,4,k===0?'#b0ff60':mix('#60c040','#b0ff60',k/5)); } el(46,by,4,4,'#fffff0'); x.save(); x.globalCompositeOperation='lighter'; el(46,by,7,7,rgba('#e0ff80',0.4)); x.restore(); eye(21,by-1); x.strokeStyle='#3a6a20'; x.beginPath(); x.moveTo(20,by-3); x.lineTo(18,by-8); x.stroke(); }
    else if(a==='frog'){ el(32,by+1,12,8,'#50a050'); el(24,by-5,4,4,'#50a050'); el(38,by-5,4,4,'#50a050'); eye(24,by-5); eye(38,by-5); el(32,by+4,8,3,'#c0e0a0'); x.strokeStyle='#206020'; x.lineWidth=1; x.beginPath(); x.moveTo(26,by+1); x.quadraticCurveTo(32,by+4,38,by+1); x.stroke(); el(20,by+7,5,2.5,'#409040'); el(44,by+7,5,2.5,'#409040'); }
    else if(a==='salamander'){ var sc=F.id==='newt_rider'?'#ff8040':'#e03020'; x.strokeStyle=sc; x.lineWidth=5; x.lineCap='round'; x.beginPath(); x.moveTo(44,by+1); x.quadraticCurveTo(52,by-2+Math.sin(f)*2,56,by+4); x.stroke(); el(32,by+1,13,5.5,sc); el(19,by,5,4.5,sc); eye(18,by-1.5);
      x.fillStyle=F.id==='newt_rider'?'#301008':'#ffd040'; [[26,by-1],[31,by+2],[36,by-1],[40,by+1]].forEach(function(p){ x.beginPath(); x.arc(p[0],p[1],1.3,0,Math.PI*2); x.fill(); }); [[24,by+5],[40,by+5]].forEach(function(p){ el(p[0],p[1],2.5,2,sc); }); }
    else if(a==='turtle'){ el(32,by+3,14,4,'#6a8a50'); el(18,by+1,4.5,3.5,'#8aa870'); eye(17,by); el(32,by-2,12,8,'#4a7a3a'); x.strokeStyle='#2a4a20'; x.lineWidth=1; [[28,by-4],[36,by-4],[32,by+1]].forEach(function(p){ x.beginPath(); for(var h=0;h<6;h++){ var an3=h/6*Math.PI*2; x.lineTo(p[0]+Math.cos(an3)*3,p[1]+Math.sin(an3)*2.4); } x.closePath(); x.stroke(); }); }
    else if(a==='goat'){ el(32,by,12,6.5,'#e8e0d0'); [[24,by+5],[28,by+6],[36,by+6],[40,by+5]].forEach(function(p){ x.fillStyle='#8a7a6a'; x.fillRect(p[0]-1,p[1],2.2,6); }); el(19,by-4,4.5,5,'#e8e0d0'); eye(18,by-5); x.strokeStyle='#8a7050'; x.lineWidth=1.6; x.beginPath(); x.arc(21,by-9,4,Math.PI,Math.PI*1.9); x.stroke(); el(17,by+1,2,3,'#e8e0d0'); }
    else if(a==='beetle'){ el(32,by,12,7,'#2a3a5a'); x.strokeStyle='#8090c0'; x.lineWidth=0.8; x.beginPath(); x.moveTo(32,by-7); x.lineTo(32,by+7); x.stroke(); el(20,by,4.5,4,'#1a2440'); x.strokeStyle='#3a4a6a'; x.lineWidth=1.8; x.beginPath(); x.moveTo(18,by-2); x.quadraticCurveTo(12,by-8,14,by-11); x.moveTo(18,by+1); x.quadraticCurveTo(11,by-3,12,by-6); x.stroke(); el(28,by-3,3,1.4,rgba('#ffffff',0.4),-0.3); }
    else if(a==='bat'){ [[-1],[1]].forEach(function(s){ x.save(); x.translate(32,by-2); x.scale(s[0],1); x.beginPath(); x.moveTo(3,0); x.lineTo(12,-6+Math.sin(f*1.6)*4); x.lineTo(20,-3+Math.sin(f*1.6)*4); x.quadraticCurveTo(16,2,14,6); x.quadraticCurveTo(9,3,3,5); x.closePath(); x.fillStyle='#4a3040'; x.fill(); x.restore(); });
      el(32,by,6,5,'#5a4050'); eye(30,by-1); eye(34,by-1); x.fillStyle='#5a4050'; x.beginPath(); x.moveTo(28,by-4); x.lineTo(28,by-9); x.lineTo(30.5,by-5); x.moveTo(36,by-4); x.lineTo(36,by-9); x.lineTo(33.5,by-5); x.fill(); } },
  paint:function(F,f){ var c=mkCanvas(64,64), x=c.getContext('2d'), bob=[0,-1,-2,-1][f], flap=[1,0.7,0.35,0.7][f], cy=33+bob, cx=32, B=F.body, rider=B==='rider';
    var el=function(ex,ey,rx,ry,col,rot){ x.beginPath(); x.ellipse(ex,ey,rx,ry,rot||0,0,Math.PI*2); x.fillStyle=col; x.fill(); };
    // glow
    var gg=x.createRadialGradient(cx,cy,1,cx,cy,30); gg.addColorStop(0,rgba(F.glow,0.45)); gg.addColorStop(1,rgba(F.glow,0)); x.fillStyle=gg; x.fillRect(0,0,64,64);
    if(rider){ x.save(); x.translate(0,4); _FV2.animal(x,F,f,cy+2); x.restore(); }
    // the fairy (riders sit smaller, up on the animal)
    x.save(); if(rider){ x.translate(cx,cy-3); x.scale(0.78,0.78); x.translate(-cx,-cy-2); }
    if(F.wings!=='none')_FV2.wing(x,F,F.wings,flap,f);
    var hy=cy-9, sk=F.skin, col=F.col;
    // body
    if(B==='pixie'||rider){ x.fillStyle=col; x.beginPath(); x.moveTo(cx-2.5,cy-4); x.lineTo(cx+2.5,cy-4); x.lineTo(cx+6,cy+8); x.quadraticCurveTo(cx,cy+10,cx-6,cy+8); x.closePath(); x.fill(); x.fillStyle=shade(col,-0.2); x.fillRect(cx-2.5,cy-1,5,1.2); el(cx-1.8,cy+10.5,1,2.2,sk); el(cx+1.8,cy+10.5,1,2.2,sk); }
    else if(B==='knight'){ x.fillStyle=shade(col,-0.1); x.fillRect(cx-4.5,cy-5,9,10); x.fillStyle=col; x.fillRect(cx-4,cy-5,8,4); x.fillStyle=rgba('#ffffff',0.35); x.fillRect(cx-3,cy-4,2,6); x.fillStyle=shade(col,-0.35); x.fillRect(cx-3.5,cy+5,3,6); x.fillRect(cx+0.5,cy+5,3,6);
      if(F.id==='ladybug_knight'||F.id==='obsidian_knight'){ x.fillStyle=F.id==='obsidian_knight'?'#ff6030':'#101010'; [[cx-2,cy-2],[cx+2,cy+1]].forEach(function(p){ x.beginPath(); x.arc(p[0],p[1],1.1,0,Math.PI*2); x.fill(); }); }
      el(cx-8,cy+1,4,5,shade(col,0.05)); x.strokeStyle=shade(col,-0.4); x.lineWidth=0.8; x.beginPath(); x.ellipse(cx-8,cy+1,4,5,0,0,Math.PI*2); x.stroke(); }
    else if(B==='sage'){ var rg=x.createLinearGradient(0,cy-5,0,cy+14); rg.addColorStop(0,col); rg.addColorStop(1,shade(col,-0.3)); x.fillStyle=rg; x.beginPath(); x.moveTo(cx-3,cy-5); x.lineTo(cx+3,cy-5); x.lineTo(cx+8,cy+13); x.lineTo(cx-8,cy+13); x.closePath(); x.fill(); x.strokeStyle=shade(col,0.2); x.lineWidth=0.7; x.beginPath(); x.moveTo(cx,cy-3); x.lineTo(cx,cy+13); x.stroke(); }
    else if(B==='imp'){ el(cx,cy+2,7,7,col); el(cx,cy+4,4.5,4,shade(col,0.2)); el(cx-3,cy+9.5,2,1.5,shade(col,-0.2)); el(cx+3,cy+9.5,2,1.5,shade(col,-0.2)); x.strokeStyle=col; x.lineWidth=1.3; x.beginPath(); x.moveTo(cx+6,cy+5); x.quadraticCurveTo(cx+13,cy+8,cx+12,cy+1); x.stroke(); x.fillStyle=col; x.beginPath(); x.moveTo(cx+12,cy+1); x.lineTo(cx+14,cy-1); x.lineTo(cx+10.5,cy); x.fill(); hy=cy-7; }
    else if(B==='orb'){ var og=x.createRadialGradient(cx-3,cy-3,1,cx,cy,11); og.addColorStop(0,'#ffffff'); og.addColorStop(0.35,col); og.addColorStop(1,shade(col,-0.35)); x.fillStyle=og; x.beginPath(); x.arc(cx,cy,10,0,Math.PI*2); x.fill(); hy=null;
      el(cx-3.5,cy-1,1.5,2,'#2a1a20'); el(cx+3.5,cy-1,1.5,2,'#2a1a20'); el(cx-3,cy-1.7,0.6,0.6,'#ffffff'); el(cx+4,cy-1.7,0.6,0.6,'#ffffff'); x.strokeStyle='#2a1a20'; x.lineWidth=0.9; x.beginPath(); x.arc(cx,cy+2,2.4,0.2,Math.PI-0.2); x.stroke(); el(cx-6,cy+2,1.8,1,rgba('#ff6080',0.5)); el(cx+6,cy+2,1.8,1,rgba('#ff6080',0.5));
      if(F.wings==='bubble'){ x.strokeStyle=rgba('#ffffff',0.7); x.lineWidth=1; x.beginPath(); x.arc(cx,cy,15,0,Math.PI*2); x.stroke(); el(cx-7,cy-8,2.2,1.4,rgba('#ffffff',0.7),-0.6); } }
    else if(B==='mermaid'){ x.fillStyle=col; x.beginPath(); x.moveTo(cx-4,cy-4); x.lineTo(cx+4,cy-4); x.quadraticCurveTo(cx+6,cy+6,cx+2,cy+11); x.quadraticCurveTo(cx+6,cy+14+Math.sin(f)*1.5,cx+9,cy+14); x.lineTo(cx+4,cy+16); x.lineTo(cx-1,cy+13); x.quadraticCurveTo(cx-6,cy+4,cx-4,cy-4); x.fill();
      x.strokeStyle=shade(col,0.25); x.lineWidth=0.6; for(var sc=0;sc<4;sc++){ x.beginPath(); x.arc(cx,cy-1+sc*3,2.5,0.2,Math.PI-0.2); x.stroke(); } el(cx,cy-3.5,4,2.4,sk); }
    else if(B==='flower'){ [[-7,0.9],[7,-0.9],[-4,0.4],[4,-0.4],[0,0]].forEach(function(p,i){ x.save(); x.translate(cx+p[0]*0.6,cy+2); x.rotate(p[1]); x.beginPath(); x.moveTo(0,-5); x.quadraticCurveTo(6,4,0,11); x.quadraticCurveTo(-6,4,0,-5); x.fillStyle=i%2?col:shade(col,-0.08); x.fill(); x.strokeStyle=shade(col,-0.3); x.lineWidth=0.5; x.stroke(); x.restore(); });
      x.fillStyle=sk; x.fillRect(cx-2,cy-5,4,5); x.fillStyle='#60a040'; x.fillRect(cx-2.5,cy-2,5,1.5); }
    else if(B==='jelly'){ x.strokeStyle=rgba(F.col2,0.8); x.lineWidth=1.2; for(var t=0;t<6;t++){ x.beginPath(); var tx0=cx-7+t*2.8; x.moveTo(tx0,cy+2); for(var s2=1;s2<=6;s2++)x.lineTo(tx0+Math.sin(f*1.5+s2+t)*1.8,cy+2+s2*2.4); x.stroke(); }
      var jg=x.createRadialGradient(cx,cy-4,1,cx,cy-1,12); jg.addColorStop(0,'#ffffff'); jg.addColorStop(0.4,rgba(col,0.9)); jg.addColorStop(1,rgba(shade(col,-0.3),0.8)); x.fillStyle=jg; x.beginPath(); x.moveTo(cx-11,cy+2); x.bezierCurveTo(cx-11,cy-14,cx+11,cy-14,cx+11,cy+2); x.quadraticCurveTo(cx+5,cy,cx,cy+3); x.quadraticCurveTo(cx-5,cy,cx-11,cy+2); x.fill();
      el(cx-3.5,cy-4,1.3,1.8,'#1a2030'); el(cx+3.5,cy-4,1.3,1.8,'#1a2030'); x.strokeStyle='#1a2030'; x.lineWidth=0.8; x.beginPath(); x.arc(cx,cy-1.5,1.8,0.3,Math.PI-0.3); x.stroke(); hy=null; }
    else if(B==='wisp'){ var wg=x.createLinearGradient(0,cy-12,0,cy+14); wg.addColorStop(0,rgba(col,0.95)); wg.addColorStop(1,rgba(col,0)); x.fillStyle=wg; x.beginPath(); x.moveTo(cx,cy-13); x.bezierCurveTo(cx+11,cy-6,cx+9,cy+6,cx+2+Math.sin(f*1.5)*3,cy+15); x.bezierCurveTo(cx-2,cy+8,cx-10,cy+6,cx-9,cy-3); x.quadraticCurveTo(cx-6,cy-10,cx,cy-13); x.fill();
      var ec=F.id==='smoke_sprite'?'#ff8030':'#ffffff'; el(cx-3,cy-3,1.8,2.4,ec); el(cx+3,cy-3,1.8,2.4,ec); if(ec==='#ffffff'){ el(cx-3,cy-3,0.9,1.3,'#203040'); el(cx+3,cy-3,0.9,1.3,'#203040'); } hy=null; }
    else if(B==='crystal'){ var kg=x.createLinearGradient(cx-8,cy-8,cx+8,cy+10); kg.addColorStop(0,shade(col,0.35)); kg.addColorStop(0.5,col); kg.addColorStop(1,shade(col,-0.35)); x.fillStyle=kg; x.beginPath(); x.moveTo(cx,cy-12); x.lineTo(cx+8,cy-2); x.lineTo(cx+5,cy+11); x.lineTo(cx-5,cy+11); x.lineTo(cx-8,cy-2); x.closePath(); x.fill();
      x.strokeStyle=rgba('#ffffff',0.7); x.lineWidth=0.7; x.beginPath(); x.moveTo(cx,cy-12); x.lineTo(cx,cy+11); x.moveTo(cx-8,cy-2); x.lineTo(cx+8,cy-2); x.stroke(); x.fillStyle=rgba('#ffffff',0.45); x.beginPath(); x.moveTo(cx,cy-11); x.lineTo(cx-6,cy-2); x.lineTo(cx,cy-2); x.fill();
      el(cx-2.8,cy+2,1.3,1.7,'#201030'); el(cx+2.8,cy+2,1.3,1.7,'#201030'); if(F.id==='lava_crystal'){ x.save(); x.globalCompositeOperation='lighter'; el(cx,cy+5,4,3,rgba('#ffc040',0.6)); x.restore(); } hy=null; }
    // arms (humanoid bodies)
    if(hy!==null&&B!=='imp'){ x.strokeStyle=B==='knight'?shade(col,-0.1):sk; x.lineWidth=1.6; x.lineCap='round'; x.beginPath(); x.moveTo(cx-3,cy-3); x.lineTo(cx-6,cy+3); x.moveTo(cx+3,cy-3); x.lineTo(cx+7,cy+1); x.stroke(); }
    // head
    if(hy!==null){ var hr=B==='imp'?5.2:4.6; el(cx,hy,hr,hr,sk); el(cx-1.8,hy+0.3,1,1.3,'#2a1a2a'); el(cx+1.8,hy+0.3,1,1.3,'#2a1a2a'); el(cx-1.5,hy-0.1,0.4,0.4,'#ffffff'); el(cx+2.1,hy-0.1,0.4,0.4,'#ffffff'); el(cx-3,hy+2,1.2,0.7,rgba('#ff7080',0.45)); el(cx+3,hy+2,1.2,0.7,rgba('#ff7080',0.45));
      if(B==='imp'){ x.strokeStyle='#2a1010'; x.lineWidth=0.8; x.beginPath(); x.arc(cx,hy+1.8,2,0.1,Math.PI-0.1); x.stroke(); }
      _FV2.head(x,F,cx,hy,hr,f); }
    _FV2.item(x,F,cx,cy,f);
    x.restore();
    _FV2.aura(x,F,f);
    return c; },
  head:function(x,F,cx,hy,hr,f){ var h=F.hair, H=F.head;
    var el=function(ex,ey,rx,ry,col,rot){ x.beginPath(); x.ellipse(ex,ey,rx,ry,rot||0,0,Math.PI*2); x.fillStyle=col; x.fill(); };
    if(H==='bob'){ x.fillStyle=h; x.beginPath(); x.arc(cx,hy-1,hr+0.8,Math.PI*0.9,Math.PI*2.1); x.lineTo(cx+hr+0.8,hy+3); x.lineTo(cx+hr-1,hy+3); x.lineTo(cx+hr-1,hy-1); x.lineTo(cx-hr+1,hy-1); x.lineTo(cx-hr+1,hy+3); x.lineTo(cx-hr-0.8,hy+3); x.closePath(); x.fill(); }
    else if(H==='long'||H==='willow'){ x.fillStyle=h; x.beginPath(); x.arc(cx,hy-1,hr+1,Math.PI,0); x.lineTo(cx+hr+1.5,hy+(H==='willow'?14:10)); x.lineTo(cx+hr-1.5,hy+3); x.lineTo(cx+hr-1.5,hy-1.5); x.lineTo(cx-hr+1.5,hy-1.5); x.lineTo(cx-hr+1.5,hy+3); x.lineTo(cx-hr-1.5,hy+(H==='willow'?14:10)); x.closePath(); x.fill();
      if(H==='willow'){ x.strokeStyle=shade(h,-0.25); x.lineWidth=0.6; for(var w=-2;w<=2;w++){ x.beginPath(); x.moveTo(cx+w*2,hy-2); x.lineTo(cx+w*2.6,hy+12); x.stroke(); } } }
    else if(H==='bun'){ x.fillStyle=h; x.beginPath(); x.arc(cx,hy-1,hr+0.6,Math.PI,0); x.fill(); el(cx,hy-hr-2,2.6,2.4,h); }
    else if(H==='spiky'){ x.fillStyle=h; for(var s=-2;s<=2;s++){ x.beginPath(); x.moveTo(cx+s*2-1.6,hy-2); x.lineTo(cx+s*2.6,hy-hr-4-(2-Math.abs(s))); x.lineTo(cx+s*2+1.6,hy-2); x.fill(); } x.beginPath(); x.arc(cx,hy-1,hr,Math.PI,0); x.fill(); }
    else if(H==='flamehair'){ var fl=[0,1,2,1][f]; var gr=x.createLinearGradient(0,hy,0,hy-12); gr.addColorStop(0,'#ff5010'); gr.addColorStop(0.6,'#ffb030'); gr.addColorStop(1,'#fff0a0'); x.fillStyle=gr; x.beginPath(); x.moveTo(cx-hr-1,hy); x.quadraticCurveTo(cx-hr,hy-8,cx-2,hy-12-fl); x.quadraticCurveTo(cx,hy-7,cx+2,hy-13+fl); x.quadraticCurveTo(cx+hr,hy-7,cx+hr+1,hy); x.closePath(); x.fill(); }
    else if(H==='puff'){ x.fillStyle=rgba(h,0.9); for(var p=0;p<9;p++){ var an=Math.PI+p/8*Math.PI; el(cx+Math.cos(an)*(hr+1.5),hy-1+Math.sin(an)*(hr+2),2.4,2.4,rgba('#ffffff',0.85)); } x.strokeStyle=rgba('#ffffff',0.6); x.lineWidth=0.5; for(var q=0;q<8;q++){ var a2=q/8*Math.PI*2; x.beginPath(); x.moveTo(cx,hy-3); x.lineTo(cx+Math.cos(a2)*(hr+5),hy-3+Math.sin(a2)*(hr+4)); x.stroke(); } }
    else if(H==='acorn'){ x.fillStyle='#8a5a2a'; x.beginPath(); x.arc(cx,hy-1.2,hr+1,Math.PI,0); x.fill(); x.strokeStyle='#5a3a1a'; x.lineWidth=0.5; for(var r=-3;r<=3;r+=1.5){ x.beginPath(); x.moveTo(cx+r,hy-1.2); x.lineTo(cx+r*0.6,hy-hr-1.5); x.stroke(); } x.fillStyle='#5a3a1a'; x.fillRect(cx-0.6,hy-hr-4,1.2,3); }
    else if(H==='hood'){ x.fillStyle=F.col; x.beginPath(); x.arc(cx,hy,hr+1.4,Math.PI*0.85,Math.PI*2.15); x.lineTo(cx+2,hy-hr-5); x.closePath(); x.fill(); x.fillStyle=shade(F.col,-0.25); x.beginPath(); x.arc(cx,hy+0.4,hr-0.4,Math.PI*1.05,Math.PI*1.95); x.fill(); }
    else if(H==='horns'){ x.fillStyle=F.id==='clover_imp'?'#40a040':(F.id==='mangrove_imp'?'#6a4a2a':'#301010'); [[-1],[1]].forEach(function(s){ x.beginPath(); x.moveTo(cx+s[0]*2.5,hy-hr+1); x.quadraticCurveTo(cx+s[0]*6,hy-hr-2,cx+s[0]*5,hy-hr-6); x.lineTo(cx+s[0]*3.6,hy-hr); x.fill(); }); }
    else if(H==='antennae'){ x.strokeStyle=shade(F.col2,-0.2); x.lineWidth=0.8; [[-1],[1]].forEach(function(s){ x.beginPath(); x.moveTo(cx+s[0]*1.5,hy-hr+1); x.quadraticCurveTo(cx+s[0]*5,hy-hr-5,cx+s[0]*6,hy-hr-2); x.stroke(); for(var k=0;k<4;k++){ x.beginPath(); x.moveTo(cx+s[0]*(2.5+k),hy-hr-2-k*0.4); x.lineTo(cx+s[0]*(3+k),hy-hr-4); x.stroke(); } }); x.fillStyle=F.hair; x.beginPath(); x.arc(cx,hy-1,hr+0.4,Math.PI,0); x.fill(); }
    else if(H==='helm'){ x.fillStyle=shade(F.col,-0.05); x.beginPath(); x.arc(cx,hy-0.5,hr+1.2,Math.PI*0.95,Math.PI*2.05); x.fill(); x.fillStyle=rgba('#ffffff',0.35); x.fillRect(cx-3,hy-hr,2,2); x.fillStyle=F.glow; x.beginPath(); x.moveTo(cx,hy-hr-1); x.quadraticCurveTo(cx+5,hy-hr-6,cx+8,hy-hr-3); x.quadraticCurveTo(cx+4,hy-hr-2,cx,hy-hr-1); x.fill(); }
    else if(H==='minerhelm'){ x.fillStyle='#c8a040'; x.beginPath(); x.arc(cx,hy-0.5,hr+1.2,Math.PI,0); x.fill(); x.fillRect(cx-hr-2,hy-1,2*hr+4,1.4); x.fillStyle='#fff4d0'; x.fillRect(cx-0.8,hy-hr-4,1.6,3); x.save(); x.globalCompositeOperation='lighter'; el(cx,hy-hr-5,3,3,rgba('#ffd060',0.7)); x.restore(); if(F.id==='forge_gnome'){ x.fillStyle=F.hair; x.beginPath(); x.moveTo(cx-hr,hy+1); x.quadraticCurveTo(cx,hy+11,cx+hr,hy+1); x.fill(); } }
    else if(H==='beard'){ x.fillStyle=F.hair; x.beginPath(); x.arc(cx,hy-1,hr+0.6,Math.PI,0); x.fill(); x.beginPath(); x.moveTo(cx-hr,hy+1); x.quadraticCurveTo(cx-2,hy+13,cx,hy+15); x.quadraticCurveTo(cx+2,hy+13,cx+hr,hy+1); x.quadraticCurveTo(cx,hy+3,cx-hr,hy+1); x.fill(); x.fillStyle=shade(F.hair,-0.15); x.fillRect(cx-2.5,hy+1.6,5,0.9); }
    else if(H==='tiara'){ x.fillStyle=F.hair; x.beginPath(); x.arc(cx,hy-1,hr+0.5,Math.PI,0); x.fill(); x.fillStyle='#ffd84a'; x.beginPath(); x.moveTo(cx-4,hy-hr+0.5); x.lineTo(cx-3,hy-hr-3); x.lineTo(cx-1.5,hy-hr-1); x.lineTo(cx,hy-hr-4); x.lineTo(cx+1.5,hy-hr-1); x.lineTo(cx+3,hy-hr-3); x.lineTo(cx+4,hy-hr+0.5); x.closePath(); x.fill(); }
    else if(H==='flowercrown'){ x.fillStyle=F.hair; x.beginPath(); x.arc(cx,hy-1,hr+0.6,Math.PI,0); x.lineTo(cx+hr+0.6,hy+4); x.lineTo(cx+hr-1,hy+4); x.lineTo(cx+hr-1,hy-1); x.lineTo(cx-hr+1,hy-1); x.lineTo(cx-hr+1,hy+4); x.lineTo(cx-hr-0.6,hy+4); x.closePath(); x.fill();
      [-4,-1.5,1.5,4].forEach(function(dx,i){ el(cx+dx,hy-hr+0.4-(i%3?0.6:0),1.6,1.6,i%2?F.col:F.col2); el(cx+dx,hy-hr+0.4-(i%3?0.6:0),0.6,0.6,'#fff080'); }); }
    else if(H==='mushcap'){ x.fillStyle=F.col; x.beginPath(); x.ellipse(cx,hy-2,hr+4,hr,0,Math.PI,0); x.fill(); }
  },
  item:function(x,F,cx,cy,f){ var I=F.item, hx=cx+7.5, hyy=cy+1;
    var el=function(ex,ey,rx,ry,col){ x.beginPath(); x.ellipse(ex,ey,rx,ry,0,0,Math.PI*2); x.fillStyle=col; x.fill(); };
    if(I==='wand'){ x.strokeStyle='#8a5a2a'; x.lineWidth=1; x.beginPath(); x.moveTo(hx,hyy); x.lineTo(hx+4,hyy-7); x.stroke(); x.save(); x.globalCompositeOperation='lighter'; el(hx+4,hyy-7.5,2.4+(f%2),2.4+(f%2),rgba(F.glow,0.9)); x.restore(); el(hx+4,hyy-7.5,1,1,'#ffffff'); }
    else if(I==='staff'){ x.strokeStyle='#7a5a3a'; x.lineWidth=1.3; x.beginPath(); x.moveTo(hx,hyy+11); x.lineTo(hx+1,hyy-12); x.stroke(); x.save(); x.globalCompositeOperation='lighter'; el(hx+1,hyy-13,3,3,rgba(F.glow,0.85)); x.restore(); el(hx+1,hyy-13,1.2,1.2,'#ffffff'); }
    else if(I==='sword'){ x.strokeStyle='#e8f0ff'; x.lineWidth=1.4; x.beginPath(); x.moveTo(hx,hyy); x.lineTo(hx+6,hyy-9); x.stroke(); x.strokeStyle='#8a6a2a'; x.lineWidth=1.2; x.beginPath(); x.moveTo(hx-1.5,hyy-1.5); x.lineTo(hx+1.5,hyy+1.5); x.stroke(); }
    else if(I==='hammer'){ x.strokeStyle='#6a4a2a'; x.lineWidth=1.2; x.beginPath(); x.moveTo(hx,hyy+2); x.lineTo(hx+4,hyy-7); x.stroke(); x.fillStyle='#8a8a90'; x.save(); x.translate(hx+4,hyy-7); x.rotate(0.4); x.fillRect(-3,-2,6,3.5); x.restore(); x.save(); x.globalCompositeOperation='lighter'; el(hx+4,hyy-7,3,3,rgba('#ff9040',0.5)); x.restore(); }
    else if(I==='pickaxe'){ x.strokeStyle='#6a4a2a'; x.lineWidth=1.1; x.beginPath(); x.moveTo(hx,hyy+2); x.lineTo(hx+3,hyy-8); x.stroke(); x.strokeStyle='#a0a0a8'; x.lineWidth=1.4; x.beginPath(); x.moveTo(hx-2,hyy-6); x.quadraticCurveTo(hx+3,hyy-10,hx+8,hyy-6); x.stroke(); }
    else if(I==='lantern'){ x.strokeStyle='#3a3030'; x.lineWidth=0.8; x.beginPath(); x.moveTo(hx,hyy); x.lineTo(hx+1,hyy+3); x.stroke(); x.fillStyle='#3a3030'; x.fillRect(hx-2,hyy+3,6,1); x.fillRect(hx-2,hyy+9,6,1); x.save(); x.globalCompositeOperation='lighter'; el(hx+1,hyy+6.5,5,5,rgba('#ffd060',0.6)); x.restore(); x.fillStyle='#fff0a0'; x.fillRect(hx-1,hyy+4,4,5); }
    else if(I==='flute'){ x.strokeStyle='#c8a060'; x.lineWidth=1.3; x.beginPath(); x.moveTo(cx+1,cy-5); x.lineTo(cx+10,cy-3); x.stroke(); }
    else if(I==='lute'){ el(hx+1,hyy+2,3,3.6,'#b07a3a'); el(hx+1,hyy+2,1,1,'#3a2010'); x.strokeStyle='#6a4a2a'; x.lineWidth=1; x.beginPath(); x.moveTo(hx+1,hyy-1); x.lineTo(hx+5,hyy-8); x.stroke(); }
    else if(I==='harp'){ x.strokeStyle='#e0c060'; x.lineWidth=1.2; x.beginPath(); x.moveTo(hx,hyy+5); x.quadraticCurveTo(hx+1,hyy-6,hx+7,hyy-6); x.lineTo(hx+6,hyy+5); x.closePath(); x.stroke(); x.strokeStyle=rgba('#ffffff',0.7); x.lineWidth=0.4; for(var s=1;s<4;s++){ x.beginPath(); x.moveTo(hx+s*1.6,hyy-4); x.lineTo(hx+s*1.6,hyy+5); x.stroke(); } }
    else if(I==='bow'){ x.strokeStyle='#8a5a2a'; x.lineWidth=1.1; x.beginPath(); x.arc(hx-1,hyy-2,7,-1.1,1.1); x.stroke(); x.strokeStyle=rgba('#ffffff',0.8); x.lineWidth=0.4; x.beginPath(); x.moveTo(hx-1+Math.cos(-1.1)*7,hyy-2+Math.sin(-1.1)*7); x.lineTo(hx-1+Math.cos(1.1)*7,hyy-2+Math.sin(1.1)*7); x.stroke(); }
    else if(I==='book'){ x.fillStyle='#6a3a8a'; x.fillRect(hx-3,hyy-2,7,5); x.fillStyle='#f0e8d0'; x.fillRect(hx-2.5,hyy-1.5,6,4); x.save(); x.globalCompositeOperation='lighter'; el(hx+0.5,hyy-3,4,3,rgba('#c0e0ff',0.5)); x.restore(); }
    else if(I==='shellhorn'){ x.fillStyle='#f0d0c0'; x.beginPath(); x.moveTo(cx+2,cy-5); x.lineTo(cx+10,cy-8); x.lineTo(cx+10,cy-2); x.closePath(); x.fill(); x.strokeStyle='#c09080'; x.lineWidth=0.5; x.stroke(); }
    else if(I==='pinwheel'){ x.strokeStyle='#8a6a4a'; x.lineWidth=0.9; x.beginPath(); x.moveTo(hx,hyy+3); x.lineTo(hx+2,hyy-8); x.stroke(); x.save(); x.translate(hx+2,hyy-9); x.rotate(f*0.8); ['#ff6080','#60c0ff','#ffe060','#80e080'].forEach(function(c,i){ x.rotate(Math.PI/2); x.beginPath(); x.moveTo(0,0); x.lineTo(5,-1); x.lineTo(3,3); x.closePath(); x.fillStyle=c; x.fill(); }); x.restore(); }
    else if(I==='ribbon'){ x.strokeStyle=rgba(F.col2,0.85); x.lineWidth=1.4; x.beginPath(); x.moveTo(hx,hyy); for(var k=1;k<=6;k++)x.lineTo(hx+k*2.4,hyy-6+Math.sin(f*1.4+k)*3); x.stroke(); x.strokeStyle=rgba(F.col,0.85); x.beginPath(); x.moveTo(cx-6,cy+3); for(var k2=1;k2<=6;k2++)x.lineTo(cx-6-k2*2.2,cy+2+Math.sin(f*1.4+k2+1)*3); x.stroke(); }
  },
  aura:function(x,F,f){ var A=F.aura, g=F.glow; var R=function(i){ var v=Math.sin(i*127.1+f*0.0+i*i*3.7)*43758.5453; return v-Math.floor(v); };
    for(var i=0;i<8;i++){ var px=6+R(i)*52, py=((6+R(i+20)*52)-f*3-i)%64; if(py<0)py+=64; var a=0.35+0.5*R(i+40);
      if(A==='pollen'||A==='sparks'){ x.fillStyle=rgba(A==='pollen'?'#ffe060':g,a); x.fillRect(px,py,1.4,1.4); }
      else if(A==='seeds'){ x.strokeStyle=rgba('#ffffff',a); x.lineWidth=0.5; x.beginPath(); x.moveTo(px,py); x.lineTo(px,py+3); x.moveTo(px-1.5,py-1); x.lineTo(px+1.5,py+1); x.moveTo(px+1.5,py-1); x.lineTo(px-1.5,py+1); x.stroke(); }
      else if(A==='petals'||A==='leaves'){ x.fillStyle=rgba(A==='petals'?F.col2:'#70c050',a); x.beginPath(); x.ellipse(px,py,1.8,0.9,i+f*0.3,0,Math.PI*2); x.fill(); }
      else if(A==='bubbles'){ x.strokeStyle=rgba('#ffffff',a); x.lineWidth=0.5; x.beginPath(); x.arc(px,py,1+R(i+60)*1.6,0,Math.PI*2); x.stroke(); }
      else if(A==='drops'){ x.fillStyle=rgba(g,a); x.beginPath(); x.moveTo(px,py-1.6); x.quadraticCurveTo(px+1.2,py+0.5,px,py+1); x.quadraticCurveTo(px-1.2,py+0.5,px,py-1.6); x.fill(); }
      else if(A==='snow'){ x.fillStyle=rgba('#ffffff',a); x.fillRect(px-0.8,py,1.6,0.5); x.fillRect(px,py-0.8,0.5,1.6); }
      else if(A==='embers'){ x.fillStyle=rgba(i%2?'#ffb040':'#ff6020',a); x.fillRect(px,63-py,1.3,1.3); }
      else if(A==='ash'){ x.fillStyle=rgba('#b0a8a0',a*0.8); x.fillRect(px,py,1.3,1); }
      else if(A==='stars'||A==='runes'){ x.fillStyle=rgba(g,a); x.beginPath(); for(var s=0;s<4;s++){ var an=s*Math.PI/2+f*0.2; x.lineTo(px+Math.cos(an)*2,py+Math.sin(an)*2); x.lineTo(px+Math.cos(an+Math.PI/4)*0.6,py+Math.sin(an+Math.PI/4)*0.6); } x.fill(); }
      else if(A==='notes'){ if(i%2)continue; x.fillStyle=rgba(g,a); x.beginPath(); x.ellipse(px,py+2,1.3,1,-0.4,0,Math.PI*2); x.fill(); x.fillRect(px+0.9,py-2.5,0.5,4.5); }
      else if(A==='mist'){ x.fillStyle=rgba('#e0e8f0',0.12); x.beginPath(); x.arc(px,py,4,0,Math.PI*2); x.fill(); } } }
};
// every fairy look paints through here (classic designs keep the original painter)
var _fairyFramesClassic=fairyFrames;
fairyFrames=function(F){ if(!F)return _fairyFramesClassic(FAIRY_DESIGNS[0]); if(!F.v2)return _fairyFramesClassic(F); if(F._fr)return F._fr; F._fr=[0,1,2,3].map(function(f){ return _FV2.paint(F,f); }); return F._fr; };

// ═══ FAIRY MONARCHS — tall angelic beings (Wetlands, Highlands, Ashlands) ═══
// [id, q, name, title, robe, robe2, wings, wingCol, wingCol2, hair, halo, item, glow, look]
var FAIRY_MONARCHS=[
 ['mere_queen',2,'Nerissa','Queen of the Mere','#3aa0b0','#a0f0f0','fin4','#80e0ff','#e0ffff','#f0f8ff','lily','trident','#80f0ff','A queen of living water: four translucent fin-wings, a lily crown and a coral trident. Her robe pours away into mist.'],
 ['lotus_seraph',2,'Oberyn','King of the Lotus','#e090c0','#fff0f8','petal6','#ffc0e0','#fff4fa','#f8e8c0','ring','orb','#ffc0f0','A six-winged seraph of lotus petals, a ring of light above his brow, holding a moon-pearl.'],
 ['heron_warden',2,'Aldmere','Heron King of the Marsh','#6a8aa0','#d0e0e8','feather','#e8eef4','#ffffff','#304050','crown','spear','#c0e0ff','A tall grey-robed king with vast heron wings, a silver crown and a reed spear.'],
 ['crystal_archon',3,'Cairnwyn','King of the Peaks','#8070c0','#e0d8ff','crystal','#c8b8ff','#ffffff','#e8e0ff','gems','sword','#d0c0ff','An archon of amethyst and quartz. His crystal wings ring like bells; a crown of floating gems circles his head.'],
 ['storm_seraph',3,'Thyra','Storm Queen of the Ridges','#5a6a90','#c8d8ff','feather6','#e0e8ff','#fff8c0','#f0f4ff','ring','horn','#fff080','Six storm-grey wings crackling with lightning. She blows a great horn and the wind-harps answer.'],
 ['mountain_oracle',3,'Hallvard','Oracle-King of the Mountain','#7a7a70','#d8d0c0','aurora','#80ffc0','#c080ff','#e0e0e0','crown','staff','#a0ffd0','An ancient king in stone-grey robes whose wings are ribbons of aurora, leaning on a rune-carved staff.'],
 ['phoenix_sovereign',4,'Pyrrhus','King of the Embers','#c03020','#ffd060','flame','#ff8020','#fff0a0','#ffb040','sun','sceptre','#ffa040','The phoenix-king: wings of roaring flame, a sunburst halo and a sceptre with a heart of fire.'],
 ['obsidian_seraph',4,'Vulcara','Obsidian Queen','#201820','#ff6030','glass','#302028','#ff7030','#1a1010','crown','sword','#ff6030','Wings of black volcanic glass veined with lava, a crown of obsidian spikes and a blade of cooling magma.'],
 ['ember_matriarch',4,'Cindra','Ember Mother of the Ash','#6a5a58','#ffb080','moth','#a09088','#ff9050','#e0d8d0','ring','lantern','#ff9060','A calm, towering mother of the ashlands with great ash-moth wings and a lantern that never goes out.']
].map(function(a){ return {id:a[0],q:a[1],name:a[2],title:a[3],robe:a[4],robe2:a[5],wings:a[6],wc:a[7],wc2:a[8],hair:a[9],halo:a[10],item:a[11],glow:a[12],look:a[13],col:a[12],monarch:true}; });
var FAIRY_MONARCH_BY_ID={}; FAIRY_MONARCHS.forEach(function(M){ FAIRY_MONARCH_BY_ID[M.id]=M; });
var FAIRY_MONARCH_PICK={2:'mere_queen',3:'crystal_archon',4:'phoenix_sovereign'};
function _monarchOf(q){ return FAIRY_MONARCH_BY_ID[FAIRY_MONARCH_PICK[q]]||FAIRY_MONARCHS.find(function(M){ return M.q===q; }); }
function monarchFrames(M){ if(M._fr)return M._fr; M._fr=[0,1,2,3].map(function(f){ return _monarchPaint(M,f); }); return M._fr; }
function _monarchPaint(M,f){ var W=184, H=206, c=mkCanvas(W,H), x=c.getContext('2d'), cx=92, bob=[0,-2,-3,-2][f], cy=114+bob, flap=[1,0.9,0.8,0.9][f];
  var el=function(ex,ey,rx,ry,col,rot){ x.beginPath(); x.ellipse(ex,ey,rx,ry,rot||0,0,Math.PI*2); x.fillStyle=col; x.fill(); };
  // light pillar + aura
  var ag=x.createRadialGradient(cx,cy-6,4,cx,cy,82); ag.addColorStop(0,rgba(M.glow,0.5)); ag.addColorStop(0.5,rgba(M.glow,0.14)); ag.addColorStop(1,rgba(M.glow,0)); x.fillStyle=ag; x.fillRect(0,0,W,H);
  var pg=x.createLinearGradient(0,cy+20,0,H); pg.addColorStop(0,rgba(M.glow,0.35)); pg.addColorStop(1,rgba(M.glow,0)); x.fillStyle=pg; x.beginPath(); x.moveTo(cx-18,cy+30); x.lineTo(cx+18,cy+30); x.lineTo(cx+30,H); x.lineTo(cx-30,H); x.fill();
  // wings (behind)
  x.save(); x.shadowColor=M.glow; x.shadowBlur=12;
  var side=function(fn){ [1,-1].forEach(function(s){ x.save(); x.translate(cx,cy-26); x.scale(s*flap,1); fn(s); x.restore(); }); };
  var feather=function(ang,len,wid,colA,colB){ x.save(); x.rotate(ang); var g=x.createLinearGradient(0,0,len,0); g.addColorStop(0,rgba(colA,0.95)); g.addColorStop(1,rgba(colB,0.8)); x.fillStyle=g; x.beginPath(); x.moveTo(0,0); x.quadraticCurveTo(len*0.5,-wid,len,0); x.quadraticCurveTo(len*0.5,wid*0.6,0,0); x.fill(); x.strokeStyle=rgba('#ffffff',0.35); x.lineWidth=0.6; x.beginPath(); x.moveTo(2,0); x.lineTo(len-3,0); x.stroke(); x.restore(); };
  var wingSet=function(rows,base,len){ for(var r=0;r<rows;r++)for(var k=0;k<7;k++){ var a=base+k*0.16+r*0.05, L=len*(0.55+k*0.07)*(1-r*0.18); feather(a,L,5+r,r%2?M.wc2:M.wc,r%2?M.wc:M.wc2); } };
  if(M.wings==='feather'||M.wings==='moth'){ side(function(){ if(M.wings==='moth'){ x.beginPath(); x.moveTo(4,0); x.bezierCurveTo(30,-60,76,-50,74,-10); x.quadraticCurveTo(66,4,72,18); x.bezierCurveTo(56,50,20,44,4,12); x.closePath(); var mg=x.createLinearGradient(0,-40,70,20); mg.addColorStop(0,M.wc); mg.addColorStop(1,M.wc2); x.fillStyle=mg; x.fill(); x.strokeStyle=rgba(M.wc2,0.9); x.lineWidth=2; x.stroke(); el(42,-12,9,9,rgba(M.wc2,0.8)); el(42,-12,4,4,'#201818'); el(38,24,6,6,rgba(M.wc2,0.7)); } else wingSet(2,-1.5,78); }); }
  else if(M.wings==='feather6'){ side(function(){ wingSet(1,-1.9,70); x.translate(0,24); wingSet(1,-0.4,58); x.translate(0,-50); wingSet(1,-2.6,40); });
    x.strokeStyle=rgba('#fff8a0',0.8); x.lineWidth=1.4; for(var b=0;b<3;b++){ var bx=[22,138,120][b]+f*3, by=[40,56,24][b]; x.beginPath(); x.moveTo(bx,by); x.lineTo(bx+4,by+8); x.lineTo(bx-1,by+10); x.lineTo(bx+3,by+18); x.stroke(); } }
  else if(M.wings==='petal6'){ side(function(){ [[-1.4,74],[-0.6,64],[0.3,50]].forEach(function(w,i){ x.save(); x.rotate(w[0]); x.beginPath(); x.moveTo(2,0); x.bezierCurveTo(w[1]*0.3,-20,w[1]*0.8,-18,w[1],0); x.bezierCurveTo(w[1]*0.8,18,w[1]*0.3,20,2,0); var g=x.createLinearGradient(0,0,w[1],0); g.addColorStop(0,M.wc2); g.addColorStop(1,M.wc); x.fillStyle=g; x.globalAlpha=0.9; x.fill(); x.globalAlpha=1; x.strokeStyle=rgba('#ffffff',0.7); x.lineWidth=1; x.stroke(); x.restore(); }); }); }
  else if(M.wings==='fin4'){ side(function(){ [[-0.9,72],[0.2,56]].forEach(function(w){ x.save(); x.rotate(w[0]); x.beginPath(); x.moveTo(2,0); x.bezierCurveTo(w[1]*0.4,-26,w[1],-24,w[1],-8); x.quadraticCurveTo(w[1]*0.8,4,w[1]*0.9,14); x.bezierCurveTo(w[1]*0.5,14,w[1]*0.2,10,2,4); x.closePath(); x.fillStyle=rgba(M.wc,0.5); x.fill(); x.strokeStyle=rgba(M.wc2,0.9); x.lineWidth=1.2; x.stroke(); for(var r=0;r<6;r++){ x.beginPath(); x.moveTo(4,2); x.lineTo(w[1]*(0.95-r*0.02),-18+r*6); x.strokeStyle=rgba(M.wc2,0.4); x.lineWidth=0.8; x.stroke(); } x.restore(); }); }); }
  else if(M.wings==='crystal'||M.wings==='glass'){ side(function(){ [[-1.3,80,12],[-0.7,70,11],[-0.1,58,10],[0.5,42,9]].forEach(function(w){ x.save(); x.rotate(w[0]); x.beginPath(); x.moveTo(2,0); x.lineTo(w[1]*0.4,-w[2]); x.lineTo(w[1],0); x.lineTo(w[1]*0.4,w[2]*0.8); x.closePath(); x.fillStyle=rgba(M.wc,M.wings==='glass'?0.95:0.7); x.fill(); x.strokeStyle=rgba(M.wc2,0.95); x.lineWidth=1.2; x.stroke();
      if(M.wings==='glass'){ x.strokeStyle=rgba('#ff8040',0.9); x.lineWidth=1; x.beginPath(); x.moveTo(6,0); x.lineTo(w[1]*0.35,-3); x.lineTo(w[1]*0.7,2); x.stroke(); } else { x.fillStyle=rgba('#ffffff',0.4); x.beginPath(); x.moveTo(4,0); x.lineTo(w[1]*0.4,-w[2]*0.8); x.lineTo(w[1]*0.55,0); x.fill(); } x.restore(); }); }); }
  else if(M.wings==='flame'){ side(function(s){ for(var k=0;k<6;k++){ var a=-1.6+k*0.36, L=60+Math.sin(k*1.7)*14+Math.sin(f*1.5+k)*5; x.save(); x.rotate(a); var g=x.createLinearGradient(0,0,L,0); g.addColorStop(0,'rgba(255,80,20,.95)'); g.addColorStop(0.6,rgba(M.wc,0.9)); g.addColorStop(1,'rgba(255,240,170,.6)'); x.fillStyle=g; x.beginPath(); x.moveTo(0,0); x.bezierCurveTo(L*0.4,-12,L*0.7,-4,L,-9+Math.sin(f+k)*3); x.bezierCurveTo(L*0.7,6,L*0.4,8,0,4); x.fill(); x.restore(); } }); }
  else if(M.wings==='aurora'){ side(function(){ for(var k=0;k<5;k++){ x.save(); x.rotate(-1.4+k*0.38); var L=74-k*6; var g=x.createLinearGradient(0,0,L,0); g.addColorStop(0,rgba(M.wc,0.85)); g.addColorStop(1,rgba(M.wc2,0.2)); x.fillStyle=g; x.beginPath(); x.moveTo(0,0); for(var t=0;t<=10;t++)x.lineTo(L*t/10,-6+Math.sin(t*0.9+f*0.8+k)*4); for(var t2=10;t2>=0;t2--)x.lineTo(L*t2/10,5+Math.sin(t2*0.9+f*0.8+k)*4); x.fill(); x.restore(); } }); }
  x.restore();
  // long hair falls behind the shoulders
  x.fillStyle=M.hair; x.beginPath(); x.moveTo(cx-9,cy-48); x.quadraticCurveTo(cx-15,cy-34,cx-13,cy-22); x.lineTo(cx+13,cy-22); x.quadraticCurveTo(cx+15,cy-34,cx+9,cy-48); x.fill();
  // robe (flows away into light)
  var rg=x.createLinearGradient(0,cy-36,0,cy+62); rg.addColorStop(0,M.robe); rg.addColorStop(0.7,rgba(M.robe,0.85)); rg.addColorStop(1,rgba(M.robe2,0)); x.fillStyle=rg;
  x.beginPath(); x.moveTo(cx-9,cy-38); x.lineTo(cx+9,cy-38); x.quadraticCurveTo(cx+16,cy-10,cx+26+Math.sin(f)*2,cy+62); x.lineTo(cx-26-Math.sin(f)*2,cy+62); x.quadraticCurveTo(cx-16,cy-10,cx-9,cy-38); x.fill();
  x.strokeStyle=rgba(M.robe2,0.7); x.lineWidth=1.2; x.beginPath(); x.moveTo(cx,cy-36); x.lineTo(cx,cy+54); x.stroke(); for(var fo=-2;fo<=2;fo++){ if(!fo)continue; x.strokeStyle=rgba(shade(M.robe,-0.3),0.5); x.beginPath(); x.moveTo(cx+fo*4,cy-20); x.quadraticCurveTo(cx+fo*7,cy+20,cx+fo*10,cy+56); x.stroke(); }
  x.fillStyle=M.robe2; x.fillRect(cx-10,cy-14,20,3); el(cx,cy-12.5,3,3,M.glow);
  // shoulders + arms
  el(cx-10,cy-34,6,5,shade(M.robe,0.1)); el(cx+10,cy-34,6,5,shade(M.robe,0.1));
  x.strokeStyle=M.robe; x.lineWidth=5; x.lineCap='round'; x.beginPath(); x.moveTo(cx-12,cy-32); x.lineTo(cx-18,cy-12); x.moveTo(cx+12,cy-32); x.lineTo(cx+19,cy-16); x.stroke();
  el(cx-18,cy-10,2.6,2.6,'#f4dcc8'); el(cx+19,cy-15,2.6,2.6,'#f4dcc8');
  // head + hair + face
  var hy=cy-46;
  el(cx,hy,8,9,'#f4dcc8'); x.fillStyle=M.hair; x.beginPath(); x.arc(cx,hy-2,8.6,Math.PI*1.02,Math.PI*1.98); x.fill();
  el(cx-3,hy+1,1.2,1.5,'#2a2030'); el(cx+3,hy+1,1.2,1.5,'#2a2030'); x.save(); x.globalCompositeOperation='lighter'; el(cx-3,hy+1,2.4,2,rgba(M.glow,0.6)); el(cx+3,hy+1,2.4,2,rgba(M.glow,0.6)); x.restore(); x.strokeStyle='#a07060'; x.lineWidth=0.8; x.beginPath(); x.moveTo(cx-1.5,hy+5); x.lineTo(cx+1.5,hy+5); x.stroke();
  // halo / crown
  x.save(); x.shadowColor=M.glow; x.shadowBlur=10;
  if(M.halo==='ring'){ x.strokeStyle=rgba('#fff8d0',0.95); x.lineWidth=2.4; x.beginPath(); x.ellipse(cx,hy-15,11,3.4,0,0,Math.PI*2); x.stroke(); }
  else if(M.halo==='sun'){ for(var r=0;r<16;r++){ var an=r/16*Math.PI*2+f*0.05; x.strokeStyle=rgba(r%2?'#fff0a0':'#ffb040',0.9); x.lineWidth=2; x.beginPath(); x.moveTo(cx+Math.cos(an)*12,hy-2+Math.sin(an)*12); x.lineTo(cx+Math.cos(an)*(r%2?18:22),hy-2+Math.sin(an)*(r%2?18:22)); x.stroke(); } }
  else if(M.halo==='gems'){ for(var gm=0;gm<6;gm++){ var ga=gm/6*Math.PI*2+f*0.25; var gx=cx+Math.cos(ga)*14, gy=hy-12+Math.sin(ga)*4; x.fillStyle=gm%2?'#e0d0ff':'#a080ff'; x.beginPath(); x.moveTo(gx,gy-4); x.lineTo(gx+2.5,gy); x.lineTo(gx,gy+4); x.lineTo(gx-2.5,gy); x.fill(); } }
  else if(M.halo==='lily'){ [-6,-2,2,6].forEach(function(dx,i){ x.save(); x.translate(cx+dx,hy-9); x.rotate(dx*0.08); x.beginPath(); x.moveTo(0,2); x.quadraticCurveTo(-3,-4,0,-8); x.quadraticCurveTo(3,-4,0,2); x.fillStyle=i%2?'#ffffff':'#ffd0f0'; x.fill(); x.restore(); }); }
  else { var cc=M.id==='obsidian_seraph'?'#1a1418':'#ffd84a'; x.fillStyle=cc; x.beginPath(); x.moveTo(cx-8,hy-7); for(var k2=0;k2<5;k2++){ x.lineTo(cx-8+k2*4+2,hy-(k2%2?13:17)); x.lineTo(cx-8+(k2+1)*4,hy-8); } x.closePath(); x.fill(); if(M.id==='obsidian_seraph'){ x.strokeStyle='#ff6030'; x.lineWidth=0.8; x.stroke(); } else { el(cx,hy-10,1.6,1.6,'#ff4060'); } }
  x.restore();
  // held item (right hand)
  var ix=cx+19, iy=cy-15;
  x.save(); x.shadowColor=M.glow; x.shadowBlur=8;
  if(M.item==='trident'||M.item==='spear'){ x.strokeStyle=M.item==='trident'?'#ff8870':'#c8b890'; x.lineWidth=2; x.beginPath(); x.moveTo(ix,iy+46); x.lineTo(ix,iy-40); x.stroke(); if(M.item==='trident'){ x.beginPath(); x.moveTo(ix-6,iy-34); x.lineTo(ix-6,iy-44); x.moveTo(ix+6,iy-34); x.lineTo(ix+6,iy-44); x.moveTo(ix-6,iy-34); x.lineTo(ix+6,iy-34); x.stroke(); } else { x.fillStyle='#e0e8f0'; x.beginPath(); x.moveTo(ix,iy-50); x.lineTo(ix+3,iy-40); x.lineTo(ix-3,iy-40); x.fill(); } }
  else if(M.item==='sword'){ var bl=M.id==='obsidian_seraph'?'#ff7030':'#e8f0ff'; x.strokeStyle=bl; x.lineWidth=3; x.beginPath(); x.moveTo(ix,iy); x.lineTo(ix+4,iy-44); x.stroke(); x.strokeStyle='#c8a040'; x.lineWidth=2; x.beginPath(); x.moveTo(ix-5,iy-3); x.lineTo(ix+5,iy-1); x.stroke(); }
  else if(M.item==='staff'||M.item==='sceptre'){ x.strokeStyle=M.item==='staff'?'#8a7a60':'#d0a040'; x.lineWidth=2.4; x.beginPath(); x.moveTo(ix,iy+(M.item==='staff'?48:14)); x.lineTo(ix,iy-34); x.stroke(); x.save(); x.globalCompositeOperation='lighter'; el(ix,iy-37,6,6,rgba(M.glow,0.8)); x.restore(); el(ix,iy-37,2.5,2.5,'#ffffff'); }
  else if(M.item==='orb'){ x.save(); x.globalCompositeOperation='lighter'; el(ix,iy-4,8,8,rgba(M.glow,0.6)); x.restore(); el(ix,iy-4,4.5,4.5,'#fff8ff'); }
  else if(M.item==='horn'){ x.fillStyle='#e8d8b0'; x.beginPath(); x.moveTo(ix-2,iy); x.quadraticCurveTo(ix+10,iy-6,ix+16,iy-22); x.lineTo(ix+22,iy-18); x.quadraticCurveTo(ix+12,iy-2,ix+2,iy+3); x.fill(); }
  else if(M.item==='lantern'){ x.strokeStyle='#3a3030'; x.lineWidth=1.2; x.beginPath(); x.moveTo(ix,iy); x.lineTo(ix,iy+8); x.stroke(); x.save(); x.globalCompositeOperation='lighter'; el(ix,iy+15,10,10,rgba('#ffb060',0.6)); x.restore(); x.fillStyle='#fff0c0'; x.fillRect(ix-4,iy+9,8,10); x.fillStyle='#3a3030'; x.fillRect(ix-5,iy+8,10,1.6); x.fillRect(ix-5,iy+19,10,1.6); }
  x.restore();
  // motes
  for(var i=0;i<14;i++){ var R=Math.sin(i*91.7)*1000, mx=(R-Math.floor(R))*W, my=(H-((i*37+f*6)%H)); x.fillStyle=rgba(i%2?M.glow:'#ffffff',0.6); x.fillRect(mx,my,1.6,1.6); }
  return c; }
// the monarch replaces the crowned-fairy king in the world and the dialog box
fairyKingFrames=function(q){ return monarchFrames(_monarchOf(q)); };
