"""Generates the sprite pilot data (lab Sprites tab) and the style bible doc from one source.
Run from the repo root:  python lab/tools/gen_sprites.py   then  node build.mjs"""
import json, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

STYLE = {
 'summary': 'High-detail chibi pixel art: big head, small body (about 2.5 heads tall), large glossy anime eyes, crisp dark outline, soft 3–4 tone cel shading, warm earthy palette, and a signature cyan rim light on the upper edges of hair, cloak and armor. 3/4 top-down view with a soft oval ground shadow.',
 'specs': [
  ('Reference frames', 'Hero walk/attack/bow/horse frames: 64×105 px (attack/bow 96×105). In game the hero is drawn at 25×42.'),
  ('Proportions', 'Head ≈ 40% of total height; hands and boots slightly oversized; readable silhouette at 42 px tall.'),
  ('Outline', '1 px dark outline (very dark brown / near-black), slightly lighter on inner edges.'),
  ('Shading', '3–4 flat tones per material, light from the upper left. No gradients, no blur, no anti-aliased soft edges.'),
  ('Rim light', 'Thin cyan / teal highlight (≈ #6fe3f5) on top edges of hair, shoulders and weapons. This is the key style signature.'),
  ('Palette', 'Warm browns, moss greens, off-white cloth, muted metals; saturated accents only for eyes, magic and gems.'),
  ('View', '3/4 top-down (camera above and in front). Front view for idle concepts; later sheets add side (right-facing, mirrored for left) and back.'),
  ('Shadow', 'Soft grey oval under the feet.'),
  ('Background', 'Solid pure green #00FF00, nothing else, so it can be keyed out cleanly.'),
  ('Scale vs hero', 'Given per character below (1.0 = same height as the hero).'),
 ],
}

PROMPT = ('Use the attached hero sprite as the exact style reference. Create ONE game sprite of {subject}. '
          'Match the reference exactly: high-detail chibi pixel art, same pixel density, about 2.5-head proportions (big head, small body), '
          'crisp 1-pixel dark outline, flat 3–4 tone cel shading lit from the upper left, warm earthy palette, a thin cyan rim light on the upper edges, '
          'and a soft grey oval shadow under the feet. View: 3/4 top-down front view, standing idle, full body, centered. '
          'Size: about {scale} the height of the reference hero. Background: solid flat pure green #00FF00 — no scenery, no text, no border, no extra characters.')

PILOT = [
 {'id':'goblin','name':'Goblin','role':'Grasslands monster (swarm, fast, weak)','scale':'0.8×','variants':[
   ('Scrappy scavenger','a small green goblin scavenger with oversized pointed ears, a patched leather vest, a chipped rusty dagger and a sly grin'),
   ('Masked hunter','a lean green goblin hunter wearing a carved bone mask, fur shoulder wrap and holding a short bone-tipped spear'),
   ('Helmeted raider','a stocky green goblin raider in a dented iron pot-helmet and mismatched scrap armor, holding a spiked wooden club'),
   ('Hooded sneak','a hunched green goblin thief in a tattered brown hood, glowing yellow eyes, a coin pouch on its belt and twin small knives'),
   ('Tribal shaman','a wiry green goblin shaman with feathers and beads, face paint, and a crooked staff topped with a softly glowing green crystal'),
 ]},
 {'id':'skeleton','name':'Skeleton','role':'Grasslands monster (ranged archer)','scale':'1.0×','variants':[
   ('Crypt archer','an undead skeleton archer with a cracked skull, glowing blue eye-lights, a worn leather quiver and a simple longbow'),
   ('Rusted soldier','a skeleton soldier in rusted chainmail and a dented kettle helm, holding a short bow and a round wooden buckler on its back'),
   ('Hooded ranger','a skeleton wrapped in a faded green hooded cloak, a bone bow, and faint teal ghost-fire in its eye sockets'),
   ('Royal guard','a skeleton in tarnished gold-trimmed ceremonial armor with a torn crimson sash, holding an ornate recurve bow'),
   ('Mossy wanderer','an old skeleton overgrown with moss and tiny mushrooms, vines through its ribs, carrying a crude branch bow'),
 ]},
 {'id':'blacksmith','name':'Blacksmith','role':'Village NPC (forge)','scale':'1.1×','variants':[
   ('Burly master smith','a burly bearded human blacksmith with rolled sleeves, a scorched leather apron, thick gloves and a heavy hammer over one shoulder'),
   ('Dwarf forgemaster','a short, broad dwarf smith with a braided red beard tucked into his belt, goggles on his forehead and a glowing iron tongs'),
   ('Young apprentice','a cheerful young apprentice smith with soot on her cheeks, a bandana, oversized apron and a small hammer and horseshoe'),
   ('Elven metalworker','a tall calm elf smith with silver hair tied back, a fine blue-grey apron and a delicate engraving hammer'),
   ('Old veteran','a grizzled one-eyed veteran blacksmith with an eyepatch, grey stubble, a chain-mail vest and a war hammer as his tool'),
 ]},
 {'id':'horse','name':'Horse','role':'Stables animal / starter mount','scale':'1.5× tall, side-on 3/4 view','variants':[
   ('Chestnut steed','a sturdy chestnut horse with a dark mane, simple brown leather saddle and bridle, standing in 3/4 side view'),
   ('Dappled grey','a dappled grey horse with a braided white mane, blue saddle cloth with gold trim, standing in 3/4 side view'),
   ('Shaggy pony','a stocky shaggy highland pony with a long fringe over its eyes, saddlebags and a wool blanket, standing in 3/4 side view'),
   ('Elven white','an elegant white horse with a silver-blue flowing mane, leaf-patterned tack and a faint cyan shimmer, standing in 3/4 side view'),
   ('Black warhorse','a powerful black warhorse with feathered hooves, a light leather barding and a red plume, standing in 3/4 side view'),
 ]},
 {'id':'firefly','name':'Firefly','role':'Familiar (Ember Spark: ignites, lights dungeons)','scale':'0.35×, floating','variants':[
   ('Ember beetle','a tiny round firefly familiar with a glowing amber abdomen, little dark wings and big friendly eyes, floating'),
   ('Lantern sprite','a tiny floating sprite shaped like a paper lantern with small moth wings and a warm orange glow inside'),
   ('Flame moth','a small fluffy moth familiar with flame-colored wing tips, a soft golden glow and curled antennae, floating'),
   ('Spark wisp','a tiny teardrop-shaped wisp of warm fire with two bright eyes and trailing sparks, floating'),
   ('Crystal firefly','a tiny firefly with a faceted glowing orange crystal body and translucent wings, floating'),
 ]},
 {'id':'goblin_king','name':'Goblin King','role':'Grasslands dungeon guardian (boss)','scale':'1.5×','variants':[
   ('Crowned brute','a huge muscular green goblin king with a jagged gold crown, a torn red royal cape, fur mantle and a giant spiked club'),
   ('Scheming tyrant','a fat, clever goblin king on short legs with a too-big crown, jeweled rings, a purple robe and a scepter topped with a skull'),
   ('War chief','a scarred goblin war chief in spiked iron armor with a horned crown-helmet, a war banner on his back and a cleaver'),
   ('Mad alchemist king','a goblin king with wild hair under a lopsided crown, bubbling potion flasks on a belt and a glowing green goggle'),
   ('Bone throne lord','a gaunt old goblin king wearing a crown of teeth and bones, a tattered cloak of hides and a staff with a burning green eye'),
 ]},
]

def prompt(ch, desc):
    return PROMPT.format(subject=desc, scale=ch['scale'])

# ── JS for the lab ──
data = {'style': STYLE, 'pilot': [{**c, 'variants': [{'title': t, 'desc': d, 'prompt': prompt(c, d)} for t, d in c['variants']]} for c in PILOT]}
js = """// ═══════════════════════════════════════════════════════════════════════
// ║ SPRITE PILOT (Phase 2 · E1/E2) — GENERATED by gen_sprites.py; edit there.
// ║ 6 characters × 5 concept prompts, matched to the hero's style.
// ═══════════════════════════════════════════════════════════════════════
var SPRITE_PILOT=""" + json.dumps(data, ensure_ascii=False, indent=1) + """;
(function(){
  var tab=LAB_TABS.find(function(t){return t.id==='sprites';});
  tab.blurb='<b>Sprite pilot:</b> 6 characters × 5 concepts, all matched to your hero. For each concept, copy the prompt into ChatGPT together with the hero reference image (<code>assets/hero/walk_frames_front_3.png</code>), then save the result as <code>sprites/incoming/&lt;character&gt;/&lt;character&gt;_v1.png</code> … <code>_v5.png</code>. Claude cleans them up (removes the green background, trims, resizes to the hero\\u2019s scale), and they appear here next to your hero to pick from.';
  tab.render=function(){
    var hero='<div class="sp-hero"><div class="sp-hero-img" style="background-image:url('+HERO_WALK_FRAMES_FRONT[3]+')"></div><div><b>Style reference</b><p>'+SPRITE_PILOT.style.summary+'</p><button class="sp-copy" data-copy="style">Copy style notes</button></div></div>';
    return hero+SPRITE_PILOT.pilot.map(function(c){
      return '<section class="sp-char"><h3>'+c.name+' <span>'+c.role+' · scale '+c.scale+'</span></h3><div class="sp-grid">'+
        c.variants.map(function(v,i){
          var img=(window.SPRITE_INCOMING&&SPRITE_INCOMING[c.id]&&SPRITE_INCOMING[c.id][i])||'';
          var k='sprites-'+c.id+'_v'+(i+1), p=LabApp.picks[k]||{};
          return '<article class="sp-card" data-verdict="'+(p.verdict||'')+'"><div class="sp-img'+(img?'':' empty')+'"'+(img?' style="background-image:url('+img+')"':'')+'>'+(img?'':'<span>v'+(i+1)+' — waiting for image</span>')+'</div>'+
            '<b>v'+(i+1)+' · '+v.title+'</b><p>'+v.desc+'</p>'+
            '<div class="sp-actions"><button class="sp-copy" data-copy="'+c.id+':'+i+'">Copy prompt</button>'+
            ['pick','maybe','no'].map(function(vv){return '<button class="vbtn sp-v" data-sk="'+k+'" data-v="'+vv+'" aria-pressed="'+(p.verdict===vv)+'">'+({pick:'Pick',maybe:'Maybe',no:'No'})[vv]+'</button>';}).join('')+'</div></article>';
        }).join('')+'</div></section>';
    }).join('');
  };
  document.addEventListener('click',function(e){
    var cp=e.target.closest('.sp-copy'); if(cp){ var key=cp.dataset.copy, txt;
      if(key==='style'){ txt=SPRITE_PILOT.style.summary+'\\n'+SPRITE_PILOT.style.specs.map(function(s){return '- '+s[0]+': '+s[1];}).join('\\n'); }
      else { var parts=key.split(':'), ch=SPRITE_PILOT.pilot.find(function(c){return c.id===parts[0];}); txt=ch.variants[+parts[1]].prompt; }
      var done=function(){ cp.textContent='Copied ✓'; setTimeout(function(){cp.textContent=key==='style'?'Copy style notes':'Copy prompt';},1500); };
      try{ navigator.clipboard.writeText(txt).then(done,function(){ LabApp.toast(txt.slice(0,140)+'…'); }); }catch(err){ LabApp.toast('Copy failed — select the text in the docs instead'); }
      return; }
    var sv=e.target.closest('.sp-v'); if(sv){ var k=sv.dataset.sk, p=LabApp.picks[k]=LabApp.picks[k]||{}; p.verdict=p.verdict===sv.dataset.v?null:sv.dataset.v; LabApp.persist(k); LabApp.renderGrid(); }
  });
})();
"""
open(os.path.join(ROOT, 'lab/src/js/33-lab-sprites.js'), 'w', encoding='utf-8').write(js)

# ── Style bible markdown ──
md = ['# 09 — Sprite Style Bible & Pilot Prompts (Phase 2 · E1/E2)', '',
      'Decision E1: **keep the AI-painted hero; every other character is generated in the same style** with ChatGPT image generation (the tool that made the hero), using these prompts. Claude cleans and integrates the results.', '',
      '## The hero style', '', STYLE['summary'], '', '| Aspect | Rule |', '|---|---|']
md += [f'| {a} | {b} |' for a, b in STYLE['specs']]
md += ['', '## How to generate (per image)', '',
       '1. Open ChatGPT, start an image chat, and attach the hero reference `assets/hero/walk_frames_front_3.png` (or a screenshot of the hero from the Design Lab).',
       '2. Paste the prompt for one variant. Generate. If the style drifts, reply: *"Closer to the reference: same pixel size, same outline, same cyan rim light."*',
       '3. Save as `sprites/incoming/<character>/<character>_v<n>.png` (e.g. `sprites/incoming/goblin/goblin_v3.png`).',
       '4. Tell Claude when a batch is in. Claude keys out the green, trims, scales to the hero, and shows all options in the Design Lab → Sprites tab for Pick / Maybe / No.',
       '5. After you pick, Claude writes the follow-up prompts for the full sheet (walk front/side/back, attack, hit, death) of the chosen concept only.', '',
       '## Master prompt template', '', '```', PROMPT.format(subject='{SUBJECT}', scale='{SCALE}'), '```', '',
       '## Pilot: 6 characters × 5 concepts (30 images)', '']
for c in PILOT:
    md += [f'### {c["name"]} — {c["role"]} (scale {c["scale"]})', '']
    for i, (t, d) in enumerate(c['variants']):
        md += [f'**v{i+1} · {t}**', '', '```', prompt(c, d), '```', '']
md += ['## After the pilot', '',
       'Once the style is locked on these 6, the same template covers the remaining ~59 characters in regional waves (Grasslands + village NPCs → Wetlands → Highlands → Ashlands + volcano → islands, sky, mounts, familiars), 5 concepts each.']
open(os.path.join(ROOT, 'docs/09-sprite-style-bible.md'), 'w', encoding='utf-8').write('\n'.join(md) + '\n')
print('generated', sum(len(c['variants']) for c in PILOT), 'prompts')
