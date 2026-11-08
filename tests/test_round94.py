"""Round 94: the hosted build (dist/) carries ONE copy of the game's files — Vercel Hobby keeps ~6 deployments inside 10 GB.
Run after `node build.mjs`:   python3 tests/test_round94.py"""
import os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')); D = lambda *a: os.path.join(ROOT, 'dist', *a)
ok = 0
def check(c, msg):
    global ok
    print(('  ok  ' if c else '  FAIL ') + msg); ok += bool(c)
    if not c: sys.exit(1)
html = open(D('play', 'index.html'), encoding='utf-8').read()
check('var ZAUDIO_EXT="mp3"' in html, '/play plays the .mp3 takes only')
for v in '34':
    p = open(D('play' + v, 'index.html'), encoding='utf-8').read()
    check(len(p) < 2000 and "engine=%s" % v in p and '/play/?' in p, '/play%s is a small page that forwards to /play/?engine=%s' % (v, v))
    check(not os.path.isdir(D('play' + v, 'assets')) or not os.listdir(D('play' + v, 'assets')), '/play%s carries no second copy of the assets' % v)
au = os.listdir(D('play', 'assets', 'audio')) if os.path.isdir(D('play', 'assets', 'audio')) else []
check(not [f for f in au if f.endswith('.ogg')], 'no .ogg twins are shipped')
check('mu_home.mp3' not in au, 'mu_home take 1 (unused since round 92) is not shipped')
src = open(os.path.join(ROOT, 'build.mjs'), encoding='utf-8').read()
check("for (const v of ['', '3', '4']) copyDir" not in src, 'build.mjs copies the assets once')
tot = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(D()) for f in fs if '%slab%spreview%s' % (os.sep, os.sep, os.sep) not in os.path.join(r, f))
check(tot < 700e6, 'dist/ without lab/preview is %.0f MB (under 700 MB)' % (tot / 1e6))
print('%d checks passed' % ok)
