"""Round 128 — EMOJIS AND ICONS, PAINTED (Kris: "look into all the places we are still using emojis or icons, and make proposals of how to
replace these with painted images").
  1. scans the game's source (src/js) for emoji and symbol glyphs, by part of the game;
  2. adds what a player actually sees (r128_icons_runtime.json: a painted run that opened every pause tab, the shop and the journal) and the
     items without a painted icon (r128_icons_items.json);
  3. says, for each part, which glyphs already have a painted icon (only the wiring is missing) and which need new paintings;
  4. writes the new icon sheets (src/js/07zt21-art-r128-icons.js, wave 129) and the list sprites/requests/r128_icons.txt.
Run:  python tools/world/r128_icons.py   (r128_plan.py calls data())"""
import os, re, json, glob, collections
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
EMO = re.compile('[\U0001F300-\U0001FAFF☀-➿⬀-⯿←-⇿■-◿\U0001F000-\U0001F2FF⌀-⏿]')
TYPO = set('→←↔↩↻↺⇒⇄⇶➜➶▸▶◀▲▼▽△●○◉◎◆◇■□▦▤◐✦✧★☆✓✔✗✕✖')   # typography: arrows, dots, ticks, stars

# glyph → a painted icon that already exists (ZScn ids)
HAVE = {'🗺': 'ui_map', '🎒': 'ui_inventory', '📖': 'ui_tome', '🔊': 'ui_sound_on', '🔇': 'ui_sound_off', '🔧': 'ui_dev', '✕': 'ui_close', '✖': 'ui_close',
        '❓': 'ui_help', '❔': 'ui_help', '🐎': 'ui_mount', '🔑': 'ui_key', '🗝': 'ui_key', '🔒': 'ui_lock', '🔐': 'ui_lock', '💰': 'ui_gold', '🪙': 'ui_gold', '❤': 'ui_heart', '♥': 'ui_heart',
        '⭐': 'ui_xp', '📜': 'ui_quests', '🏹': 'ui_ranged', '🛡': 'ui_defend', '🧪': 'ui_potion', '🍞': 'ui_food', '🍖': 'ui_food', '🔮': 'ui_spell', '🐾': 'ui_familiar',
        '💥': 'ui_special', '🗼': 'mk_tower', '⚓': 'mk_harbor', '🎈': 'mk_skyport', '🌋': 'mk_volcano', '🏰': 'mk_castle', '⛺': 'mk_camp', '🏘': 'mk_village', '🔷': 'mk_waystone',
        '🏠': 'mk_home', '🏡': 'mk_home', '🛒': 'mk_shop', '🍺': 'mk_tavern', '⚒': 'mk_forge', '💀': 'mk_boss', '🌉': 'mk_bridge', '⚔': 'ui_attack', '🔥': 'el_fire', '💧': 'el_water',
        '🌿': 'el_grass', '🌱': 'el_grass', '🪨': 'el_earth', '⛰': 'el_earth', '⚡': 'el_storm', '🌑': 'el_shadow', '❄': 'st_icon_freeze', '☠': 'st_icon_poison', '🎯': 'st_icon_mark'}

# glyph → a NEW painted icon (ordered below)
NEW = {'✨': 'ui_skills', '📚': 'ui_lore', '🎮': 'ui_controls', '💾': 'ui_save', '⛶': 'ui_fullscreen', '☰': 'ui_menu', '🗑': 'ui_delete', '⚠': 'ui_warn', '⚙': 'ui_settings',
       '⏸': 'ui_pause', '✋': 'ui_interact', '🤸': 'ui_roll', '⌨': 'ui_keyboard', '👆': 'ui_touch', '◉': 'ui_dot_on', '○': 'ui_dot_off', '✓': 'ui_done', '✔': 'ui_done',
       '🚫': 'ui_no', '⏳': 'ui_time', '🌟': 'ui_star', '📍': 'mk_pin', '🕳': 'mk_well', '🧭': 'mk_compass', '★': 'q_star_on', '☆': 'q_star_off', '🦌': 'q_hunt', '🧩': 'q_puzzle',
       '💬': 'q_talk', '🎁': 'q_gift', '🎉': 'q_party', '📦': 'q_crate', '🏛': 'rm_hall', '🚪': 'rm_gate', '💤': 'sh_sleep', '🍶': 'sh_mead', '🪵': 'sh_wood', '📋': 'sh_board',
       '🏆': 'sh_trophy', '▲': 'sh_better', '▽': 'sh_worse', '▼': 'sh_worse', '🚶': 'sh_walk', '⛵': 'sh_ship', '⛓': 'rm_chain', '👁': 'rm_eye', '🪜': 'rm_ladder', '🌳': 'rm_tree',
       '🌈': 'rm_rainbow', '🧵': 'rm_thread', '📯': 'rm_horn', '✂': 'rm_shears', '🌅': 'rm_dawn', '☀': 'ss_su', '🍂': 'ss_au', '🌸': 'ss_bl'}

# the parts of the game (file patterns → part); dev-only tools are listed but not proposed
PARTS = [
 ('menus', 'Pause panel, menus, saving and sound', ['24p-pause-panel', '21c-save', '04c-audio', '24w-readable', '04d-profiles', '24c-leave-guard', '27z-audio-hooks', '06-scene-title'],
  'The pause tabs, the save button, the menu and sound buttons still print emoji (🗺 🎒 ✨ 🐎 📖 📚 🔊 🔧 💾 ☰).', 'Wire the tabs to the painted ui_* icons that exist; paint the five missing (skills, lore, controls, save, menu).'),
 ('hud', 'The HUD (season, page dots, mana, minimap)', ['10zs-seasons', '21b-mana-hud', '04j-hit', '20-game-config'],
  'The season chip is an emoji (🌱 ☀ 🍂 ❄ 🌸); the page dots are ◉ ○.', 'A painted emblem for each of the five seasons (the thaw, summer, first harvest, happy Yule, Freya\'s spring) and amber / slate bead dots.'),
 ('map', 'World map, quest list and travel', ['21q-quest-map', '21q2-journal', '21q3-current-quest', '10b-world-travel', '07e-world-map', '10w-seal-ward', '10v-forges-world'],
  'The quest list uses ★ ☆ ▲ ◆ 📍 💰 🗼; the map side list 🔒 🗺.', 'Painted quest stars (tracked / not), a map pin, a well and a compass; wire the rest to the mk_* markers that exist.'),
 ('msgs', 'Pop-up messages and talk', ['22z-msgs102', '10zz-talk', '21u-oswin', '21w-voices', '10g-characters', '10zk-kids-world', '10zt-twin', '16u-twin-godsbane', '16v-twin-library', '21x-npc-quests', '07zdlg-dialogue'],
  'Gold, gifts, parcels, crafting and "talk" messages start with emoji (💰 🎁 🎉 📦 ⚒ 💬 ✓).', 'Paint gift, celebration, parcel, talk and done icons; item messages show the item\'s own painted icon.'),
 ('elements', 'Elements and status', ['03b-elements', '09s-combat102', '26b-tome-elements', '09-hero-core', '09-monster-engine', '12d-heal-wells', '10zr-ring-heal'],
  'The inventory\'s element row and status texts use 🔥 💧 🌿 🪨 ⚡ 🌑 ❄ ☠.', 'All of these already have painted el_* / st_icon_* icons — wiring only.'),
 ('items', 'Items without a painted icon', ['03-data', '03c-arms-r45', '22c-inventory', '22m-economy', '09h-loot', '09h2-rare-loot', '09i-sovereign'],
  '125 of 487 items show their emoji today — every one of them (45 economy pieces, 76 Alpha trophies, 4 saddles) was ordered in round 121 (sc_eco_icons_1–9), and Kris has painted them.', 'Take the nine painted sheets in (this round\'s intake); nothing new to paint.'),
 ('potions', 'Potions and the apothecary', ['22h-potions', '22g-apothecary'],
  'Brews and ingredients are emoji (🧪 🍵 ⚗ 💣 🌈 …).', 'Brews show the painted potion icons by colour; ingredients join the trophy / material sheet.'),
 ('shops', 'Shops, inns, camps and the economy places', ['22-ui-shops', '22m2-economy-places', '22k-shop-gold', '10h-world-camps', '22e-quick', '10j-world-mounts'],
  'Shop rows use 🍺 💤 🍶 🪵 🚶 🏆 📋 ▲ ▼.', 'Paint sleep, mead, firewood, notice board, trophy, better / worse and on-foot; wire shop / tavern / forge to the mk_* markers.'),
 ('lessons', 'Lessons, controls and touch', ['21t-lessons', '24t-touch', '24v-click-touch', '21v-first-walk', '10p-roll'],
  'Lesson lines and the touch buttons use ⚔ ✋ 🤸 📚 ☰ ⌨ 👆 ⏸.', 'Paint interact, roll, keyboard, touch, pause; the gamepad prompts come with proposal "Any controller".'),
 ('tome', 'The Tome', ['26-tome', '26c-tome-arms', '26d-tome-fits', '26e-tome-skills'],
  'Tome tabs fall back to ✦ 💥; chapter lists use ★ ✨ 🗺 🧑 🐾 👹.', 'Wire chapters to the tm_* icons; the two missing tabs get their own.'),
 ('fairies', 'Fairy rings, villager requests and keepsakes', ['10i-world-fairies', '21x2-npc-quest-list', '23b-sandbox-saga'],
  'Villager requests and fairy treasures name things with emoji (🪶 🍯 🎳 🔭 🧵 🧂 🌰 🫧 🏮 …).', 'Most fairy treasures are painted (fo_*); villager request items join the material sheet.'),
 ('realms', 'Volcano, sky, islands, forges, Muspelheim and Asgard', ['16-scenes-volcano', '15-scene-sky', '13-scene-island', '16j-forge-rules', '16f-forge-ideas', '16b-forge-sites', '16c-muspelheim', '16d-escape',
                                                                   '16e-asgard', '16g-asgard-citadel', '16n-asgard-r64e', '16h-the-ending', '16i-grimnir-pulse', '16o-asgard-city', '16s-the-last-saga', '16t-after-the-end', '16y-site-rush', '16p-cutscenes'],
  'Rush lists name foes with emoji faces (💀 😈 👻 🐊 🦅 …); forge and Asgard screens use ⚒ ⛓ 🏛 ⏳ 👁 🪜 🌈 📯 🧵.', 'Foes show their own painted faces (the sprite thumbnails already exist); paint a set of realm symbols (hall, gate, chain, eye, ladder, tree, bridge, rainbow, thread, horn, shears, dawn).'),
 ('sites', 'Adventure sites, castles, towers and trials', ['12-scene-dungeon', '12b-trial-realm', '07y-trial-arenas', '07zm-mage-towers', '09c-castles', '09e-mage-towers', '07d-site-roster', '07b-site-towers', '07c-site-caverns', '09b-boss-phases', '09bb-boss-patterns', '07zz-boss-attacks', '09d-familiars', '09g-hero-skills', '10x-mira', '10-scene-world', '11-scene-building', '21c-death', '21-ui'],
  'Site doors, chest messages, boss tells and the death screen print emoji (🚪 💎 🏆 📖 🔮 ⚠ 💀 …).', 'Wire to the existing ui_* / mk_* / el_*; boss tells move to the painted tell marks of the boss plan.'),
 ('dev', 'Developer tools (not for players)', ['23-sandbox', '25-site-lab', '04i-perf', '07zau', '07zt', '07zv', '07zx', '07s-char', '04i-icons', '04-helpers', '04g-difficulty', '05', '07n-', '07zsl', '07zy3', '07zz-brand5', '09t-rhythm', '09u', '22d-forge', '22f-forge-stages', '10d-world-art', '10zsl', '02-hero-api', '10zs'],
  'The Dev panel, the site lab, the music lab and code comments.', 'Leave as they are.'),
]

# ═══ the new icons (wave 129) ═══ [id, name, look]
SHEETS = [
 ('sc_ic_r128_menu', 'Menu, control and HUD icons (round 128)', 5, 5, [
  ['ui_skills', 'Skills & familiars', 'a small standing runestone with one glowing teal rune and three sparks rising from it'],
  ['ui_lore', 'Lore', 'two stacked leather-bound saga books with a woven bookmark and a brass clasp'],
  ['ui_controls', 'Controls', 'a carved oak game pad with four small round rune-stone buttons'],
  ['ui_save', 'Save', 'an open saga book with a goose quill standing in a horn of ink'],
  ['ui_fullscreen', 'Full screen', 'four carved bronze corner brackets pointing outward'],
  ['ui_menu', 'Menu', 'three short horizontal bars of carved dark wood stacked, with brass nail heads'],
  ['ui_delete', 'Delete', 'a cracked slate tablet with a red scratch across it'],
  ['ui_warn', 'Warning', 'a small round shield painted red with a single upright white spike above a white dot'],
  ['ui_settings', 'Settings', 'a bronze cog wheel with rune-carved teeth'],
  ['ui_pause', 'Pause', 'two upright carved wooden posts side by side'],
  ['ui_play', 'Play', 'a carved bronze arrowhead pointing right'],
  ['ui_interact', 'Interact', 'an open hand in a leather gauntlet, palm forward'],
  ['ui_roll', 'Roll', 'a curling swoosh of dust and wind turning in a circle'],
  ['ui_keyboard', 'Keyboard', 'a small wooden board with three rows of square rune-keys'],
  ['ui_touch', 'Touch', 'a gloved fingertip touching a ripple of teal light'],
  ['ui_dot_on', 'Page marker (here)', 'a round amber bead glowing warmly'],
  ['ui_dot_off', 'Page marker', 'a plain round dark slate bead with a thin teal rim'],
  ['ui_done', 'Done', 'a green tick carved into a small round wooden token'],
  ['ui_no', 'Not allowed', 'a round iron token with a red bar across it'],
  ['ui_star', 'Rare / new', 'a small bright four-pointed spark star in white gold'],
  ['ui_time', 'Time', 'a small hourglass of bone and brass with golden sand'],
  ['ui_photo', 'Photo mode', 'a small carved wooden picture frame with a tiny painted landscape inside'],
  ['ui_share', 'Share', 'a black raven in flight carrying a sealed letter'],
  ['ui_coop', 'Two players', 'two small round shields overlapping, one teal and one amber'],
  ['ui_assist', 'Assist', 'a warm open hand holding a small glowing heart'],
 ]),
 ('sc_ic_r128_seasons', 'The five seasons, the map and the quests (round 128)', 5, 4, [
  ['ss_th', 'The thaw', 'a single white snowdrop flower pushing up through melting snow and wet dark earth, muted colours'],
  ['ss_su', 'Summer', 'a golden sun disc carved with knotwork, its short rays like spear tips'],
  ['ss_au', 'First harvest', 'a bound sheaf of golden barley tied with red yarn — the last sheaf'],
  ['ss_wi', 'Happy Yule', 'a small straw Yule goat tied with red ribbon, a sprig of fir behind it'],
  ['ss_bl', 'Freya\'s spring', 'a round wreath of white wood anemones and yellow cowslips with one falcon feather tucked in'],
  ['mk_pin', 'Map pin', 'a carved wooden map pin with a small red cloth flag'],
  ['mk_well', 'Well / pit', 'a dark round stone-rimmed pit opening seen from above'],
  ['mk_compass', 'Compass', 'a brass compass rose with four rune-tipped points'],
  ['q_star_on', 'Tracked quest', 'a gold five-pointed star of hammered metal, glowing faintly'],
  ['q_star_off', 'Quest', 'a hollow outline star of dark iron'],
  ['q_track', 'Follow', 'a single black raven feather with a teal glint'],
  ['q_hunt', 'Hunt', 'a pair of deer antlers'],
  ['q_puzzle', 'Puzzle', 'four square stone tiles with carved runes fitted together'],
  ['q_talk', 'Talk', 'a small unrolled speech-scroll with a curl at the bottom'],
  ['q_gift', 'Gift', 'a bundle wrapped in linen, tied with twine and a sprig of heather'],
  ['q_party', 'Celebration', 'a burst of colourful festival ribbons and small sparks'],
  ['q_crate', 'Parcel', 'a small wooden crate bound with rope'],
  ['q_craft', 'Crafted', 'a small anvil with a hammer resting on it and a few sparks'],
  ['rm_hall', 'Hall', 'the golden gable of a Norse hall with crossed carved dragon-head bargeboards'],
  ['rm_gate', 'Door', 'a round-topped carved oak door with iron hinges in a stone arch'],
 ]),
 ('sc_ic_r128_places', 'Shops, inns and the realms\' symbols (round 128)', 5, 4, [
  ['sh_sleep', 'Sleep', 'a small wooden bed with a wool blanket and a crescent moon above it'],
  ['sh_mead', 'Mead', 'a curved drinking horn with a silver rim, golden mead at the top'],
  ['sh_wood', 'Firewood', 'two split birch logs crossed'],
  ['sh_board', 'Notice board', 'a small wooden notice board with three pinned parchments'],
  ['sh_trophy', 'Trophy', 'a silver-rimmed drinking-horn trophy on a small wooden stand'],
  ['sh_better', 'Better', 'a green upward arrowhead carved in pale stone'],
  ['sh_worse', 'Worse', 'a red downward arrowhead carved in pale stone'],
  ['sh_walk', 'On foot', 'a pair of worn leather boots on a dirt path'],
  ['sh_ship', 'Ship', 'a small longship with a striped red and white sail'],
  ['rm_chain', 'Bound', 'a short length of black iron chain, one broken ring glowing'],
  ['rm_eye', 'Watcher', 'a single carved eye rune glowing teal on a grey stone'],
  ['rm_ladder', 'Climb', 'a short wooden ladder'],
  ['rm_tree', 'The great tree', 'a small glowing ash tree with roots spreading wide'],
  ['rm_rainbow', 'The bridge of light', 'a short arc of rainbow light over white clouds'],
  ['rm_thread', 'Thread of fate', 'a wooden spindle wound with glowing golden thread'],
  ['rm_horn', 'The great horn', 'a great curved horn bound in gold bands'],
  ['rm_shears', 'Cut thread', 'a pair of old iron shears'],
  ['rm_dawn', 'Dawn', 'a sun rising over a line of dark mountains'],
  ['rm_forge', 'Forge', 'an anvil standing in a bed of orange flame'],
  ['rm_crown', 'Fire crown', 'a black iron crown with flames rising from its points'],
 ]),
]
TROPHY_KIND = {'fang': 'trk_fang', 'pelt': 'trk_pelt', 'seed-pod': 'trk_seedpod', 'mote': 'trk_mote', 'tail': 'trk_tail', 'carapace': 'trk_carapace', 'core-stone': 'trk_core', 'crest': 'trk_crest',
               'gel': 'trk_gel', 'scale': 'trk_scale', 'tusk': 'trk_tusk', 'shroud': 'trk_shroud', 'claw': 'trk_claw', 'heartwood': 'trk_heartwood', 'horn': 'trk_horn', 'crown': 'trk_crown',
               'charm': 'trk_charm', 'shell': 'trk_shell', 'wing': 'trk_wing'}


def norm(g): return g.replace('️', '')


def scan():
    per = {}
    for f in sorted(glob.glob(os.path.join(R, 'src', 'js', '*.js'))):
        b = os.path.basename(f)
        if '01-sprite-data' in b: continue
        s = re.sub(r'^\s*//.*$', '', open(f, encoding='utf-8').read(), flags=re.M)
        c = collections.Counter(EMO.findall(s))
        if c: per[b] = c
    return per


def part_of(b):
    for p in PARTS:
        if any(b.startswith(x) for x in p[2]): return p[0]
    return 'sites'


def data():
    per = scan(); parts = {p[0]: {'id': p[0], 'n': p[1], 'today': p[3], 'prop': p[4], 'files': [], 'uses': 0, 'g': collections.Counter()} for p in PARTS}
    for b, c in per.items():
        P = parts[part_of(b)]; P['files'].append(b); P['uses'] += sum(c.values()); P['g'].update(c)
    new_ids = {it[0] for sh in SHEETS for it in sh[4]}
    assert set(NEW.values()) <= new_ids, set(NEW.values()) - new_ids
    out = []
    for p in PARTS:
        P = parts[p[0]]; gl = [norm(g) for g, _ in P['g'].most_common()]
        seen, G = set(), []
        for g in gl:
            if g in seen: continue
            seen.add(g); G.append(g)
        wire = [[g, HAVE[g]] for g in G if g in HAVE]; new = [[g, NEW[g]] for g in G if g in NEW and g not in HAVE]
        typo = [g for g in G if g in TYPO and g not in HAVE and g not in NEW]
        rest = [g for g in G if g not in HAVE and g not in NEW and g not in TYPO]
        out.append({'id': p[0], 'n': p[1], 'today': p[3], 'prop': p[4], 'files': P['files'], 'uses': P['uses'], 'glyphs': G[:60], 'wire': wire, 'new': new, 'typo': typo, 'rest': rest[:40], 'dev': p[0] == 'dev'})
    rt = json.load(open(os.path.join(R, 'tools', 'world', 'r128_icons_runtime.json'), encoding='utf-8'))
    seen_rt = sorted({norm(k.split('|')[0]) for v in rt.values() for k in v if k != 'ERR'})
    it = json.load(open(os.path.join(R, 'tools', 'world', 'r128_icons_items.json'), encoding='utf-8'))
    tro = [m for m in it['miss'] if m[0].startswith('tr_')]
    kinds = collections.Counter(next((k for k in TROPHY_KIND if m[1].lower().endswith(k)), '?') for m in tro)
    assert '?' not in kinds, [m for m in tro if not any(m[1].lower().endswith(k) for k in TROPHY_KIND)]
    total = sum(p['uses'] for p in out if not p['dev'])
    return {'parts': out, 'runtime': seen_rt, 'items': {'n': it['n'], 'ok': it['ok'], 'miss': len(it['miss']), 'ordered122': 45, 'trophies': len(tro), 'kinds': dict(kinds), 'saddles': 4, 'eco_painted': 9},
            'sheets': [{'id': s[0], 'title': s[1], 'items': s[4]} for s in SHEETS], 'total': total, 'new_n': len(new_ids)}


def write_sheets():
    js = ['// ═══════════════════════════════════════════════════════════════════════',
          '// ║ 07zt21-art-r128-icons.js — round 128: THE LAST EMOJIS, PAINTED (Kris: "look into all the places we are still using emojis or icons,',
          '// ║ and make proposals of how to replace these with painted images"). MADE BY tools/world/r128_icons.py — edit there.',
          '// ║ Three icon sheets (wave 129, family icons, kind icon — the same road as rounds 32–48: ZIcon shows the emoji until the sheet is in).',
          '// ║ Nothing is wired until Kris picks in the Lab (› Emojis, painted).   .\\tools\\sprites\\paint.ps1 -List r128_icons',
          '// ═══════════════════════════════════════════════════════════════════════',
          "(function(){ if(typeof ZSCN==='undefined')return;",
          "  ZSCN.WAVES[129]='Round 128 — the last emojis, painted: menus, seasons, quests, shops, and realm symbols';",
          '  var NO=" Each icon alone, no text, no letters, no numbers, no pixel art.";',
          '  ZSCN.SHEETS=ZSCN.SHEETS.concat([']
    rows = []
    for sid, title, c, r, items in SHEETS:
        size = '1024x1024' if r == c else '1536x1024'
        its = ','.join('[%s,%s,%s,48,48]' % (json.dumps(i[0]), json.dumps(i[1], ensure_ascii=False), json.dumps(i[2] + ', in the game\'s hand-painted Norse storybook style', ensure_ascii=False)) for i in items)
        rows.append("    {id:%s,wave:129,fam:'icons',kind:'icon',cols:%d,rows:%d,size:'%s',refs:['sc_ic_ui_1'],title:%s+NO,items:[%s]}" % (json.dumps(sid), c, r, size, json.dumps(title, ensure_ascii=False), its))
    js.append(',\n'.join(rows)); js.append('  ]);'); js.append('})();'); js.append('')
    open(os.path.join(R, 'src', 'js', '07zt21-art-r128-icons.js'), 'w', encoding='utf-8').write('\n'.join(js))
    open(os.path.join(R, 'sprites', 'requests', 'r128_icons.txt'), 'w').write(
        '# Round 128 — the last emojis, painted (3 icon sheets, wave 129).  .\\tools\\sprites\\paint.ps1 -List r128_icons\n'
        '# (The economy\'s item, trophy and saddle icons — sc_eco_icons_1…9, round 121 — are painted and come in with this round\'s intake.)\n' + '\n'.join(s[0] for s in SHEETS) + '\n')


if __name__ == '__main__':
    write_sheets(); d = data()
    print('new icons', d['new_n'], 'player-facing glyph uses', d['total'], 'seen in a run', len(d['runtime']), d['items'])
    for p in d['parts']: print('%-9s %4d uses  wire %2d  new %2d  typo %2d  rest %2d' % (p['id'], p['uses'], len(p['wire']), len(p['new']), len(p['typo']), len(p['rest'])), ''.join(p['rest'][:30]))
