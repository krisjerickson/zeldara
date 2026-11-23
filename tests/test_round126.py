"""Round 126: cut-scene videos made by script (tools/video/omni.mjs + omni.ps1) — one image-to-video clip per painting through the
Gemini API (Gemini Omni Flash), joined with hard cuts, the way Kris's Bram video was made in Flow. Checks the request it would send
(--dry, no key, nothing sent) on a folder built here from a real Kling PROMPT.txt.
python tests/test_round126.py"""
import sys, os, json, re, subprocess, tempfile, shutil
res = []
def check(n, ok, info=''):
    res.append(bool(ok)); print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else '  ' + str(info)[:500]), flush=True)
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
name = '_t126_' + str(os.getpid()); D = os.path.join(R, 'video_requests', name); os.makedirs(D)
try:
    open(os.path.join(D, 'PROMPT.txt'), 'w', encoding='utf-8').write(
        'LOOK: painterly Norse storybook.\n\n'
        'SHOT 1 — @image1, 0–4 s — THE CAGE. START: exactly @image1 (Bram in a cage; the river far below; with). ACTION, in order: (1) Bram rattles the bars. END FRAME: Zola at the cage. NOT IN THIS SHOT: NO bridge across it at all.\n'
        'SHOT 2 — @image2, 4–8 s — THE AXE. START: exactly @image2 (Bram with an axe). ACTION, in order: (1) Bram swings. SPECIAL CAMERA, this shot only: a slow orbit. END FRAME: chips fly. NOT IN THIS SHOT: no dragons.\n')
    png = bytes.fromhex('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082')
    for i in (1, 2): open(os.path.join(D, 'image%d.png' % i), 'wb').write(png)
    env = dict(os.environ); env.pop('GEMINI_API_KEY', None)
    out = subprocess.run(['node', os.path.join(R, 'tools', 'video', 'omni.mjs'), '--folder', name, '--dry'], capture_output=True, text=True, encoding='utf-8', env=env).stdout
    bodies = [json.loads(m) for m in re.findall(r'^\{\n.*?^\}', out, re.S | re.M)]
    check('Dry run: one request per picture, nothing sent, no key needed (%d)' % len(bodies), len(bodies) == 2, out)
    b = bodies[0]
    check('Request shape: Omni Flash, image to video, 16:9, 4 s, 720p, picture first then words',
          b['model'] == 'gemini-omni-1.2-flash' and b['background'] is True and b['generation_config']['video_config']['task'] == 'image_to_video'
          and b['response_format'] == {'type': 'video', 'aspect_ratio': '16:9', 'duration': '4s', 'resolution': '720p', 'delivery': 'inline'}
          and b['input'][0]['type'] == 'image' and b['input'][1]['type'] == 'text', b)
    t1, t2 = bodies[0]['input'][1]['text'], bodies[1]['input'][1]['text']
    check('Shot words: the painting, the actions in order, the end frame; no dangling "with"', 'Bram rattles the bars' in t1 and 'Zola at the cage' in t1 and 'far below.' in t1 and '; with' not in t1, t1)
    check('The NOT list is never sent as names (a bridge not built yet → open water)', 'NOT IN' not in t1 + t2 and 'bridge' not in t1.lower() and 'open from bank to bank' in t1 and 'dragon' not in t2 and 'open from bank' not in t2, t1)
    check('A shot\'s own camera is used', 'a slow orbit' in t2 and 'a slow orbit' not in t1, t2)
    check('No clips are made and nothing is joined on a dry run', not os.listdir(os.path.join(D, 'clips')) and not [f for f in os.listdir(D) if f.endswith('.mp4')])
    nokey = subprocess.run(['node', os.path.join(R, 'tools', 'video', 'omni.mjs'), '--folder', name], capture_output=True, text=True, encoding='utf-8', env=env).stdout
    check('Without a key it stops and says how to give one', 'omni.ps1' in nokey, nokey)
finally:
    shutil.rmtree(D, ignore_errors=True)
ps = open(os.path.join(R, 'tools', 'video', 'omni.ps1'), encoding='utf-8').read()
check('omni.ps1 asks for the key in the window and never writes it to a file', 'Read-Host' in ps and '$env:GEMINI_API_KEY' in ps and not re.search(r'Set-Content|Out-File|Add-Content|Export-', ps))
print('\n%d / %d passed' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
