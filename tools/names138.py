"""Round 138 — Kris's names (Lab › Names): the four realms (his own: Gildenmark, Fernheim, Cragland, Cinderheim), the village (Mirrowby), the
little-map labels, the 40 lands, 16 islands, 13 sites, the mage towers and masters, the Slag Forge. Player-facing text only: the painting and
music requests keep their words. A land keeps its old name as `was` (monsters still choose their land by its old words).
    python tools/names138.py          (safe to run twice)"""
import os, re, glob
R = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REALM = [('Grasslands', 'Gildenmark', 'Grassland', 'Gildenmark', 'Grasslander', 'Gildenmarker'),
         ('Wetlands', 'Fernheim', 'Wetland', 'Fernheim', 'Wetlander', 'Fernheimer'),
         ('Highlands', 'Cragland', 'Highland', 'Cragland', 'Highlander', 'Craglander'),
         ('Ashlands', 'Cinderheim', 'Ashland', 'Cinderheim', 'Ashlander', 'Cinderheimer')]
ZONES = {'Fairy-Ring Meadows': 'Ringmeadow', 'Runic Standing Stones': 'The Whispering Stones', 'Windmill Hills': 'Millwind Downs', 'Firefly River Valley': 'Glimmerdale',
 'Moss-covered Giant Bones': 'The Sleeping Giant', 'Blossom Orchard Terraces': 'Applestair', 'Sunken Amphitheatre Ruins': "Singer's Bowl", 'Floating-Rock Meadow': 'Driftstone Meadow',
 'Crystal-tipped Tallgrass': 'Glintgrass', 'Waystone Ancient Road': 'Waystone Road',
 'Bioluminescent Mangroves': 'The Glowroots', 'Lantern Lily Marsh': 'Lanternmere', 'Drowned Village Rooftops': 'Drowned Reedhaven', 'Willow Cathedral': 'The Willow Hall',
 'Glow-Frog Pools': 'Frogsong Pools', 'Misty Stilt Walkways': 'Stiltwalk', 'Sunken Temple Spires': 'The Drowned Bells', 'Wisp Cattail Maze': 'The Wispmaze', 'Rune Stepping Stones': 'Runeford',
 'Giant Turtle-Shell Isles': 'The Shellbacks', 'Runic Mesas': 'The Rune Tables', 'Crystal Geode Canyons': 'Glittergorge', 'Dwarven Stair-cut Cliffs': 'The Dwarrow Stair',
 'Wind-harp Ridges': 'Harpwind Ridge', 'Petrified Forest': 'Stonewood', 'Glacier-veined Peaks': 'The Bluevein Peaks', 'Golem Graveyard': 'The Sleeping Golems',
 'Terraced Herder Slopes': "Shepherd's Stair", 'Starfall Crater Field': 'Starfall', 'Obsidian Glass Fields': 'Glassmoor', 'Ash-snow Dead Forest': 'Greysnow Wood',
 'Magma Rune Channels': 'The Burning Runes', 'Basalt Column Forest': 'The Pillarwood', 'Burned Cathedral Ruins': 'The Burned Hall', 'Sulfur Geyser Flats': 'Brimstone Flats',
 'Dragon Skeleton Valley': 'Wyrmbone Vale', 'Ember-flower Fields': 'Emberbloom', 'Chained Floating Rocks': 'The Tethered Stones', 'Smouldering Forge-city Ruins': 'The Ruins of Askvald'}
ISLES = {'Meadow Cove': 'Clovercove', 'Twin-Hill Isle': 'Twohill', 'Fae Forest Isle': 'Fairholt', 'Mangrove Isle': 'Tangle Isle', 'Sunken Ruin Isle': 'Halfdrown', 'Turtle-Back Isle': 'Old Shell',
 'Crag Spire': 'Ravencrag', 'Crystal Cove': 'Glimmer Cove', 'Snowcap Isle': 'Whitecap', 'Ember Caldera': 'The Firebowl', 'Obsidian Shore': 'Blackglass Shore', 'Forge Rock': 'Anvil Rock'}
SITES = {'Elven Library': 'The Leafbound Library', 'White Keep': 'The Pale Keep', 'Mushroom Forest': 'The Toadstool Deep', 'Frost Cathedral': 'Rimehall', 'Underground Lake Ring': 'The Ringmere',
 'Crystal Grotto': 'Glimmerdeep', 'Bone Pit': 'Bonedeep', 'Rivendell Twilight Hall': 'The Dusk Hall', 'Pillared Hall': 'The Hundred Pillars', 'Lava Archipelago': 'The Molten Isles',
 'Reflecting Hall': 'The Still Hall', 'Boulder Field': 'Tumblestone', 'Spiral Chasm': 'The Winding Deep',
 'The Lightning Rod Tower': 'Stormspike', 'The Ember Observatory': 'The Nova Dome', "Xal\\'zor": 'Vargrim', "Xal'zor": 'Vargrim', 'Gravelord Thane': 'Thane Gravelstone', 'Slag Forge': 'Clinker Forge'}
SKIP = re.compile(r'^(07zt(?!6-)\d|07zt-scenery|07s-char|07zs-|07zv|07zau|07zt9b|07zy-site-paint|07zx|09bx-0|01-sprite)')

def realms(t):
    for pl, new, adj, nadj, dem, ndem in REALM:
        t = re.sub(r'\b(an?) ' + dem + r'\b', lambda m: ('a' if m.group(1) == 'an' else 'a') + ' ' + ndem, t)
        t = re.sub(r'\b' + dem + r's\b', ndem + 's', t); t = re.sub(r'\b' + dem + r'\b', ndem, t)
        t = re.sub(r"\b[Tt]he " + pl + r"'", new + "'s", t); t = re.sub(r'\b' + pl + r"'(?!s)", new + "'s", t)
        t = re.sub(r'\b(?:NE|SE|SW|NW) ' + pl + r'\b', new, t)
        t = re.sub(r'\b[Tt]he ' + pl + r'\b', new, t); t = re.sub(r'\b' + pl + r'\b', new, t)
        t = re.sub(r'\ban ' + adj + r'\b', 'a ' + nadj, t); t = re.sub(r'\b' + adj + r'\b', nadj, t)
        for a, b in (('were', 'was'), ('are', 'is'), ('have', 'has')): t = re.sub(r'\b(' + new + r') ' + a + r'\b', r'\1 ' + b, t)
    return t

def names(t, js):
    for M in (ZONES, ISLES, SITES):
        for a, b in M.items():
            if js and M is ZONES: t = re.sub(r"name:'" + re.escape(a) + "'", "name:'" + b.replace("'", "\\'") + "',was:'" + a + "'", t)
            t = t.replace(a, b.replace("'", "\\'") if js and a in ("Sunken Amphitheatre Ruins", "Terraced Herder Slopes") else b)
    return t

files = [f for f in glob.glob(os.path.join(R, 'src', 'js', '*.js')) if not SKIP.match(os.path.basename(f))]
files += glob.glob(os.path.join(R, 'src', 'npcs', '*.md')) + glob.glob(os.path.join(R, 'src', 'villagers', '*.md')) + [os.path.join(R, 'docs', 'agent-context', 'zeldara-saga.md')]
n = 0
for f in files:
    t0 = open(f, encoding='utf-8').read(); js = f.endswith('.js')
    t = names(realms(t0), js)
    if js:
        t = t.replace("'Slag'", "'Clinker'")
        t = t.replace("const SECTION_NAMES={0:'Village Center',", "const SECTION_NAMES={0:'The Green',").replace("{0:'Village & Mirror Lake',", "{0:'Mirrowby & Mirror Lake',").replace("name:'Village Waystone'", "name:'Mirrowby Waystone'")
    if t != t0: open(f, 'w', encoding='utf-8').write(t); n += 1
print('%d files changed' % n)
