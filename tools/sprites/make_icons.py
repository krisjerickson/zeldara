"""Writes src/js/07zv-icons.js: the icon sheets (controls, menus, one icon per item) added to the scenery manifest.
Reads the items from src/js/03-data.js (through node). Run again after adding items:  python tools/sprites/make_icons.py
The UI lists below are the place to edit names and looks; item looks come from the item's name and slot."""
import json, re, os, subprocess
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
NODE = r"""const fs=require('fs');let s=fs.readFileSync(process.argv[1],'utf8');const key=process.argv[2];const i=s.indexOf(key);const o=key[key.length-1],c=o=='{'?'}':']';let d=0,j=i+key.length-1;for(;j<s.length;j++){if(s[j]==o)d++;else if(s[j]==c){d--;if(d==0)break;}}
process.stdout.write(JSON.stringify(eval('('+s.slice(i+key.length-1,j+1)+')')));"""
def _lit(f, key): return json.loads(subprocess.run(['node', '-e', NODE, os.path.join(ROOT, 'src', 'js', f), key], capture_output=True, text=True, check=True).stdout)
I = _lit('03-data.js', 'var ITEMS={')                 # the items of rounds 1–35: their sheets (waves 34–36) must never change
I2 = _lit('03b-elements.js', 'var ITEMS_R37={')       # round 37: new items, on their own sheets (wave 37)
UI2 = _lit('03b-elements.js', 'var ICONS_R37=[')
NOUN = {'lHand': 'melee weapon', 'rHand': 'ranged weapon', 'mWeapon': 'magic weapon', 'body': 'body armor (the torso piece on its own, no person)', 'shield': 'shield', 'head': 'headgear on its own',
        'pants': 'leg armor on its own', 'gauntlets': 'pair of gauntlets', 'feet': 'pair of boots', 'neck': 'amulet on a chain', 'back': 'cloak on its own, hanging open', 'ring': 'finger ring',
        'gem': 'gem or treasure', 'key': 'ornate key', 'ammo': 'ammunition', 'use': 'potion bottle', 'food': 'food', 'spell': 'spell emblem', 'special': 'skill emblem', 'material': 'material', 'misc': 'item'}
HINT = [('volcano lord', 'a massive blade of black rock with rivers of glowing lava'), ('absolute zero', 'a blade of pure pale-blue ice with a white glow'), ('thunder god', 'a golden blade crackling with white lightning'), ('woodcutter', 'a steel axe head on a wooden haft'),
        ('elemental sovereign', 'a blade in three parts of fire, ice and lightning, glowing'),
        ('flame', 'wreathed in orange flame'), ('fire', 'glowing orange with small flames'), ('inferno', 'burning deep red-orange'), ('magma', 'black rock with glowing lava cracks'), ('ember', 'glowing ember-orange'), ('phoenix', 'fiery red-gold feathers'),
        ('permafrost', 'dark blue ice with white rime'), ('frost', 'icy pale blue with frost crystals'), ('glacier', 'thick blue-white ice'), ('cold', 'tipped with pale-blue ice'), ('blizzard', 'a swirl of snow and ice'), ('ice', 'pale-blue ice'),
        ('thunder', 'crackling with yellow-white lightning'), ('storm', 'storm-grey with small lightning arcs'), ('cyclone', 'wrapped in a swirl of wind and sparks'), ('lightning', 'a bright forked lightning bolt'),
        ('dragon', 'red dragon scale with gold trim'), ('shadow', 'violet-black with wisps of shadow'), ('arcane', 'deep violet with glowing cyan runes'), ('sky', 'white and gold with a pale-blue glow'), ('celestial', 'white-gold with tiny stars'),
        ('sea', 'sea-green with shells and coral'), ('pearl', 'with a large glowing pearl'), ('bone', 'made of pale bone'), ('obsidian', 'glossy black volcanic glass'), ('jade', 'green jade'), ('ruby', 'with a red ruby'), ('sapphire', 'with a blue sapphire'),
        ('emerald', 'with a green emerald'), ('iron', 'grey iron'), ('plate', 'polished steel plate'), ('chain', 'steel chain links'), ('leather', 'brown leather'), ('axe', 'a steel axe head on a wooden haft'), ('wooden', 'plain wood'), ('wood_', 'plain wood'), ('bronze', 'bronze'), ('copper', 'copper'), ('silver', 'silver'),
        ('heat', 'with a glowing red seeker tip'), ('mage', 'blue cloth with gold stars'), ('battle', 'heavy steel with red trim'), ('ranger', 'forest green'), ('swift', 'light, with small wing shapes'), ('elven', 'elegant pale wood with leaf carvings'),
        ('moon', 'a pale glowing crescent shard'), ('void', 'a violet-black sphere of nothing'), ('poison', 'a sickly green cloud'), ('tidal', 'a curling blue wave'), ('thorn', 'green thorny vines'), ('stone', 'grey jagged stone spikes'),
        ('spirit', 'a pale ghostly wisp with a red thread'), ('starfall', 'falling golden stars')]
def q(s): return s.replace('\\', '').replace("'", "\\'")
def slot_of(it): return it.get('slot') or it.get('type') or 'misc'
def look(k, it):
    slot = slot_of(it); n = it['name']; low = (n + ' ' + k).lower(); h = next((t for key, t in HINT if key in low), '')
    d = re.sub(r'\s+', ' ', it.get('desc', '')).strip()
    if slot in ('spell', 'special'): return NOUN[slot] + ': one bold symbol that shows "' + n + '"' + (' — ' + h if h else '') + (' (' + d[:70] + ')' if d else '')
    return NOUN.get(slot, 'item') + (', ' + h if h else '')
ITEM_SHEETS = [('sc_ic_melee', 34, 'Item icons — swords, axes and other melee weapons', ['lHand'], 5, 5), ('sc_ic_ranged', 34, 'Item icons — bows, staffs, arrows and darts', ['rHand', 'mWeapon', 'ammo'], 5, 4),
               ('sc_ic_armor', 35, 'Item icons — body armor and shields', ['body', 'shield'], 5, 5), ('sc_ic_headlegs', 35, 'Item icons — headgear and leg armor', ['head', 'pants'], 5, 4),
               ('sc_ic_handsfeet', 35, 'Item icons — gauntlets and boots', ['gauntlets', 'feet'], 5, 4), ('sc_ic_neckback', 35, 'Item icons — amulets and cloaks', ['neck', 'back'], 5, 5),
               ('sc_ic_treasure', 36, 'Item icons — rings, gems, keys and materials', ['ring', 'gem', 'key', 'material', 'misc'], 5, 5), ('sc_ic_potions', 36, 'Item icons — potions and tonics', ['use'], 5, 3),
               ('sc_ic_food', 36, 'Item icons — food and drink', ['food'], 4, 3), ('sc_ic_spells', 36, 'Spell emblems (shown on the spell slot and in the tome)', ['spell'], 4, 4),
               ('sc_ic_skills', 36, 'Skill emblems (special attacks)', ['special'], 4, 3)]
UI = [('sc_ic_ui_1', 33, 1, 'Control-bar and menu icons', 5, 5, [
    ('ui_attack', 'Attack', 'two crossed swords'), ('ui_ranged', 'Ranged', 'a drawn bow with an arrow'), ('ui_ammo', 'Ammo', 'a leather quiver full of arrows'), ('ui_defend', 'Defend', 'a round shield with a teal rune'), ('ui_potion', 'Potion', 'a round red potion bottle with a cork'),
    ('ui_food', 'Food', 'a loaf of bread and a wedge of cheese'), ('ui_spell', 'Spell', 'an open spellbook with a bright cyan spark rising from it'), ('ui_mount', 'Mount', 'a horse head in profile with a bridle'), ('ui_familiar', 'Familiar', 'a small glowing spirit wisp with two eyes and a leaf'), ('ui_special', 'Special attack', 'a fist inside a burst of golden lightning'),
    ('ui_map', 'Map', 'a half-unrolled parchment map with a red X'), ('ui_quests', 'Quests', 'a scroll with a red wax seal'), ('ui_inventory', 'Inventory', 'a leather backpack with a bedroll'), ('ui_tome', 'Tome', 'a thick leather-bound book with a glowing teal rune on the cover'), ('ui_help', 'Help', 'a small standing stone carved with a glowing question mark'),
    ('ui_sound_on', 'Sound on', 'a curved horn with three sound waves'), ('ui_sound_off', 'Sound off', 'the same curved horn crossed by a red slash'), ('ui_dev', 'Tools', 'a wrench crossed with a hammer'), ('ui_heart', 'Health', 'a glossy red heart'), ('ui_mana', 'Mana', 'a glowing blue water drop'),
    ('ui_xp', 'Experience', 'a golden five-pointed star'), ('ui_gold', 'Gold', 'a small pile of gold coins'), ('ui_key', 'Key', 'an old iron key'), ('ui_lock', 'Locked', 'a closed iron padlock'), ('ui_close', 'Close', 'a bold X made of two crossed stone bars')]),
    ('sc_ic_ui_2', 33, 0, 'Empty gear-slot symbols and inventory tabs — the first 14 are EMPTY-SLOT symbols: each one a simple flat dark slate-blue silhouette of the item with a thin teal outline, no other colours, no detail', 5, 5, [
    ('sl_back', 'Empty cloak slot', 'silhouette of a cloak'), ('sl_head', 'Empty helmet slot', 'silhouette of a helmet'), ('sl_body', 'Empty armor slot', 'silhouette of a chest plate'), ('sl_shield', 'Empty shield slot', 'silhouette of a shield'), ('sl_gauntlets', 'Empty gauntlets slot', 'silhouette of a glove'),
    ('sl_rHand', 'Empty ranged slot', 'silhouette of a bow'), ('sl_pants', 'Empty leg slot', 'silhouette of leg armor'), ('sl_neck', 'Empty amulet slot', 'silhouette of an amulet on a chain'), ('sl_feet', 'Empty boots slot', 'silhouette of a boot'), ('sl_special', 'Empty skill slot', 'silhouette of a lightning burst'),
    ('sl_lHand', 'Empty melee slot', 'silhouette of a sword'), ('sl_spell', 'Empty spell slot', 'silhouette of an open book'), ('sl_mWeapon', 'Empty magic-weapon slot', 'silhouette of a staff'), ('sl_ring', 'Empty ring slot', 'silhouette of a finger ring'),
    ('tab_equip', 'Equipped tab', 'the head and shoulders of a suit of armor, full colour'), ('tab_weapons', 'Weapons tab', 'a sword and an axe crossed, full colour'), ('tab_armor', 'Armor tab', 'a steel chest plate, full colour'), ('tab_accessories', 'Accessories tab', 'a ring and an amulet, full colour'), ('tab_ammo', 'Ammo tab', 'three arrows tied in a bundle, full colour'),
    ('tab_food', 'Food tab', 'a roast drumstick, full colour'), ('tab_gems', 'Gems tab', 'three cut gems: red, blue, green'), ('tab_potions', 'Potions tab', 'three small bottles: red, blue, green'), ('tab_all', 'All items tab', 'an open treasure chest'), ('tab_sell', 'Sell', 'a hand dropping a gold coin'), ('tab_buy', 'Buy', 'a small coin purse')]),
    ('sc_ic_ui_3', 33, 0, 'Map markers and quest icons', 5, 5, [
    ('mk_village', 'Village', 'a cluster of three tiny cottages'), ('mk_dungeon', 'Dungeon', 'a dark cave mouth in rock'), ('mk_tower', 'Tower', 'a tall stone tower'), ('mk_mage', 'Mage tower', 'a crooked spire with a glowing orb on top'), ('mk_castle', 'Castle', 'a castle keep with two turrets and a flag'),
    ('mk_camp', 'Monster camp', 'a tent with a campfire'), ('mk_harbor', 'Harbor', 'an anchor'), ('mk_skyport', 'Sky port', 'a hot-air balloon'), ('mk_waystone', 'Waystone', 'a tall obelisk with glowing cyan runes'), ('mk_volcano', 'Volcano', 'an erupting volcano'),
    ('mk_henge', 'Fairy henge', 'a ring of small standing stones with a sparkle'), ('mk_boss', 'Boss', 'a horned skull'), ('mk_hero', 'You are here', 'a teal arrowhead pointing up'), ('mk_shop', 'Shop', 'a market stall awning'), ('mk_tavern', 'Tavern', 'a foaming tankard'),
    ('mk_forge', 'Forge', 'an anvil with a hammer'), ('mk_home', 'Home', 'a round cottage with a blue roof'), ('mk_bridge', 'Bridge', 'a small arched stone bridge'), ('q_main', 'Main quest', 'a golden exclamation mark on a shield'), ('q_side', 'Side quest', 'a silver exclamation mark'),
    ('q_done', 'Quest done', 'a green check mark in a laurel ring'), ('q_locked', 'Quest locked', 'a scroll wrapped in a chain'), ('q_bounty', 'Bounty', 'a wanted poster with a monster face'), ('q_fairy', 'Fairy quest', 'a tiny fairy with glowing wings'), ('q_reward', 'Reward', 'an open treasure chest full of gold')]),
    ('sc_ic_ui_4', 33, 0, 'Status effects, elements and tome chapters', 5, 5, [
    ('st_atk', 'Attack up', 'a red sword with an up arrow'), ('st_def', 'Defense up', 'a blue shield with an up arrow'), ('st_speed', 'Speed up', 'a winged boot'), ('st_regen', 'Regeneration', 'a green heart with a plus'), ('st_poison', 'Poisoned', 'a green skull-shaped droplet'),
    ('st_burn', 'Burning', 'a small orange flame'), ('st_slow', 'Slowed', 'a snail'), ('st_freeze', 'Frozen', 'a blue snowflake crystal'), ('st_blind', 'Blinded', 'an eye crossed by a slash'), ('st_stun', 'Stunned', 'three yellow stars in a ring'),
    ('st_shield', 'Shielded', 'a glowing teal bubble'), ('st_haste', 'Time slow', 'an hourglass with glowing sand'), ('el_grass', 'Grass element', 'a green leaf as a round badge'), ('el_water', 'Water element', 'a blue wave as a round badge'), ('el_earth', 'Earth element', 'a brown mountain as a round badge'),
    ('el_fire', 'Fire element', 'a red flame as a round badge'), ('tm_monsters', 'Monsters chapter', 'a snarling goblin face'), ('tm_bosses', 'Bosses chapter', 'a crowned horned skull'), ('tm_familiars', 'Familiars chapter', 'a small spirit creature curled up'), ('tm_mounts', 'Mounts chapter', 'a saddle'),
    ('tm_spells', 'Spells chapter', 'a wand trailing stars'), ('tm_skills', 'Skills chapter', 'a clenched fist with a spark'), ('tm_places', 'Places chapter', 'a compass rose'), ('tm_lore', 'Lore chapter', 'a quill and an ink pot'), ('ui_levelup', 'Level up', 'a golden up-arrow with a starburst')]),
    ('sc_ic_orn', 33, 0, 'Panel ornaments — carved dark stone inlaid with glowing teal runes and thin gold edges; each drawn flat, straight from the front', 3, 2, [
    ('orn_corner', 'Corner flourish', 'an L-shaped corner piece of carved stone knotwork, for the top-left corner of a panel'), ('orn_divider', 'Divider', 'a long thin horizontal bar of knotwork with a small teal gem in the middle'), ('orn_banner', 'Header banner', 'a wide dark-green cloth ribbon banner with forked ends and a gold edge, blank'),
    ('orn_medallion', 'Medallion', 'a round stone ring frame with runes round it, empty in the middle'), ('orn_arrow', 'Arrow', 'a small carved stone arrowhead pointing right'), ('orn_plate', 'Name plate', 'a small blank brass plate with two rivets')])]
ITEM_SHEETS2 = [('sc_ic_melee2', 37, 'Item icons — axes, mauls and two-element blades (round 37)', ['lHand'], 5, 4), ('sc_ic_ranged2', 37, 'Item icons — crossbows, staffs, arrows and darts (round 37)', ['rHand', 'mWeapon', 'ammo'], 5, 5),
                ('sc_ic_misc2', 37, 'Item icons — gems, draughts, the Sovereign armor, and five menu symbols (round 37)', ['gem', 'ring', 'use', 'shield', 'body', 'head', 'pants', 'gauntlets', 'feet', 'neck', 'back'], 5, 5)]
NOUN2 = dict(NOUN); NOUN2.update({'lHand': 'melee weapon', 'rHand': 'ranged weapon'})
def look2(k, it):
    slot = slot_of(it); cls = it.get('cls'); noun = 'battle axe or maul' if cls == 'axe' else 'crossbow' if cls == 'xbow' else NOUN2.get(slot, 'item')
    return noun + ': ' + it.get('pic', it['name'])
rows = []; n = 0
for sid, wave, pilot, title, c, r, items in UI:
    assert len(items) <= c * r, (sid, len(items)); n += len(items)
    rows.append("    {id:'%s',wave:%d,%sfam:'icons',kind:'icon',cols:%d,rows:%d,size:'%s',title:'%s',items:[\n      %s]}" % (sid, wave, 'pilot:1,' if pilot else '', c, r, '1024x1024' if c == r else '1536x1024', q(title),
                ",".join("['%s','%s','%s',%d,48]" % (a, q(b), q(cc), 96 if a.startswith('orn_') else 48) for a, b, cc in items)))
for sid, wave, title, slots, c, r in ITEM_SHEETS:
    items = [(k, it) for s in slots for k, it in I.items() if slot_of(it) == s]; assert len(items) <= c * r, (sid, len(items)); n += len(items)
    rows.append("    {id:'%s',wave:%d,fam:'icons',kind:'icon',cols:%d,rows:%d,size:'%s',title:'%s',items:[\n      %s]}" % (sid, wave, c, r, '1024x1024' if c == r else '1536x1024', q(title),
                ",".join("['ic_%s','%s','%s',48,48]" % (k, q(it['name']), q(look(k, it))) for k, it in items)))
for sid, wave, title, slots, c, r in ITEM_SHEETS2:
    items = [(k, it) for s_ in slots for k, it in I2.items() if slot_of(it) == s_]; extra = UI2 if sid == 'sc_ic_misc2' else []
    assert len(items) + len(extra) <= c * r, (sid, len(items) + len(extra)); n += len(items) + len(extra)
    rows.append("    {id:'%s',wave:%d,fam:'icons',kind:'icon',cols:%d,rows:%d,size:'%s',title:'%s',items:[\n      %s]}" % (sid, wave, c, r, '1024x1024' if c == r else '1536x1024', q(title),
                ",".join(["['ic_%s','%s','%s',48,48]" % (k, q(it['name']), q(look2(k, it))) for k, it in items] + ["['%s','%s','%s',48,48]" % (a, q(b), q(cc)) for a, b, cc in extra])))
js = """// ═══════════════════════════════════════════════════════════════════════
// ║ 07zv-icons.js — painted icons for the controls, the menus and every item (round 32).
// ║ MADE BY tools/sprites/make_icons.py — edit the lists there and run it again; do not edit this file by hand.
// ║ The sheets join the scenery manifest (ZSCN, 07zt) as family 'icons', kind 'icon', waves 33–36, so they travel the same
// ║ road: build.mjs → sprites/requests/scenery.json → tools/sprites/icons.ps1 (generate.mjs --set scenery --wave 33,34,35,36)
// ║ → tools/sprites/intake_scenery.py → assets/scenery/icons-N.webp. The game shows them through ZIcon (04i-icons.js).
// ║ Ids: ui_* controls and HUD, sl_* empty gear slots, tab_* inventory tabs, mk_* map markers, q_* quests, st_* status,
// ║ el_* elements, tm_* tome chapters, orn_* panel ornaments, ic_<item key> one per item in ITEMS (03-data.js).
// ║ Kris (Oct 7): every menu; frames drawn in code, icons painted; one icon per item.
// ═══════════════════════════════════════════════════════════════════════
(function(){ if(typeof ZSCN==='undefined')return;
  ZSCN.WAVES[33]='Icons: controls, gear slots, map, status'; ZSCN.WAVES[34]='Icons: weapons'; ZSCN.WAVES[35]='Icons: armor and accessories'; ZSCN.WAVES[36]='Icons: treasure, potions, food, spells, skills'; ZSCN.WAVES[37]='Icons: round 37 — axes, crossbows, staffs, gems, the Sovereign set';
  ZSCN.VIEW.icon='View: each one is a game icon — a single object drawn large, front-on with a slight three-quarter tilt, as on an inventory tile. Bold and simple so it still reads at 32 pixels: one clear silhouette, few details. No background plate, no circle or square behind it, no frame, no drop shadow. Items of the same kind must each have their own clearly different shape and colours, so no two icons on the sheet could be mistaken for each other.';
  ZSCN.SHEETS=ZSCN.SHEETS.concat([
""" + ",\n".join(rows) + """
  ]);
})();
"""
open(os.path.join(ROOT, 'src', 'js', '07zv-icons.js'), 'w', encoding='utf-8').write(js)
print('07zv-icons.js: %d sheets, %d icons (%d + %d items)' % (len(rows), n, len(I), len(I2)))
